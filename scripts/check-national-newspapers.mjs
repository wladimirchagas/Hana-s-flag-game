#!/usr/bin/env node
/**
 * Build gate for Learn-mode National Newspapers.
 *
 * Verifies that all national newspaper entries in `src/data/nationalNewspapers.ts`
 * are well-formed, cited, bundled locally, and genuinely logos/mastheads.
 */

import { readFileSync, existsSync, statSync } from "node:fs";
import { dirname, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "..", "src", "data", "nationalNewspapers.ts");
const PUBLIC_DIR = resolve(__dirname, "..", "public");

/** Sniff image magic bytes or SVG text structure */
function sniffImageKind(buf) {
  if (buf.length >= 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return "png";
  }
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return "jpeg";
  }
  if (buf.length >= 12 && buf.subarray(0, 4).toString("latin1") === "RIFF" && buf.subarray(8, 12).toString("latin1") === "WEBP") {
    return "webp";
  }
  const head = buf.subarray(0, 4096).toString("utf8").replace(/^\uFEFF/, "").trimStart();
  const lower = head.toLowerCase();
  if (lower.startsWith("<!doctype html") || lower.startsWith("<html")) return "html";
  const stripped = lower.replace(/^<\?xml[^>]*\?>\s*/, "").replace(/^(<!--[\s\S]*?-->|<!doctype svg[^>]*>|\s)+/, "");
  if (stripped.startsWith("<svg") || lower.includes("<svg")) return "svg";
  if (lower.includes("<html") || lower.includes("<!doctype html")) return "html";
  return null;
}

/** Parse pure JS object literal without needing tsc */
function loadConst(src, marker) {
  const start = src.indexOf(marker);
  if (start < 0) throw new Error(`Could not locate ${marker}`);
  const eq = src.indexOf("= {", start);
  if (eq < 0) throw new Error(`Could not locate literal for ${marker}`);
  const open = src.indexOf("{", eq);
  let depth = 0, i = open, inStr = null;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (c === "\\") { i++; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { inStr = c; continue; }
    if (c === "/" && src[i + 1] === "/") { i = src.indexOf("\n", i); if (i < 0) break; continue; }
    if (c === "{") depth++;
    else if (c === "}") { depth--; if (depth === 0) { i++; break; } }
  }
  const literal = src.slice(open, i);
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return (${literal});`)();
}

const MAX_SVG_SIZE = 300 * 1024;     // 300 KB
const MAX_RASTER_SIZE = 500 * 1024;  // 500 KB

const src = readFileSync(DATA_PATH, "utf8");
const newspapersByCountry = loadConst(src, "export const NATIONAL_NEWSPAPERS");

const failures = [];
const seenIds = new Set();
let totalNewspapers = 0;

for (const [countryKey, list] of Object.entries(newspapersByCountry)) {
  if (!Array.isArray(list)) {
    failures.push(`Country entry ${countryKey} must be an array of newspapers`);
    continue;
  }

  for (const paper of list) {
    totalNewspapers++;
    const ctx = `[${paper.id || "unidentified"}] in ${countryKey}`;

    // 1. Identification
    if (!paper.id || typeof paper.id !== "string") {
      failures.push(`${ctx}: missing or non-string id`);
      continue;
    }
    const expectedPrefix = `${paper.countryCode?.toLowerCase()}-`;
    if (!paper.id.startsWith(expectedPrefix)) {
      failures.push(`${ctx}: id "${paper.id}" must start with "${expectedPrefix}"`);
    }
    if (seenIds.has(paper.id)) {
      failures.push(`${ctx}: duplicate id "${paper.id}"`);
    }
    seenIds.add(paper.id);

    if (paper.countryCode !== countryKey) {
      failures.push(`${ctx}: countryCode "${paper.countryCode}" does not match key "${countryKey}"`);
    }

    // 2. Metadata
    if (!paper.name || typeof paper.name !== "string" || !paper.name.trim()) {
      failures.push(`${ctx}: missing or empty name`);
    }
    if (typeof paper.founded !== "number" || paper.founded < 1500 || paper.founded > 2026) {
      failures.push(`${ctx}: founded year "${paper.founded}" invalid`);
    }
    if (!paper.headquarters || typeof paper.headquarters !== "string") {
      failures.push(`${ctx}: missing or empty headquarters`);
    }
    if (!paper.owner || typeof paper.owner.name !== "string" || typeof paper.owner.type !== "string") {
      failures.push(`${ctx}: missing or incomplete owner (name, type required)`);
    }
    if (!paper.editorialStance || typeof paper.editorialStance !== "string") {
      failures.push(`${ctx}: missing or empty editorialStance`);
    }
    if (!paper.format || typeof paper.format !== "string") {
      failures.push(`${ctx}: missing or empty format`);
    }
    if (!paper.readership || typeof paper.readership.metric !== "string" || typeof paper.readership.source !== "string") {
      failures.push(`${ctx}: missing or incomplete readership (metric and source required)`);
    }

    // 3. Logo existence and validity
    if (!paper.logo || typeof paper.logo !== "string") {
      failures.push(`${ctx}: missing or non-string logo path`);
      continue;
    }
    const cleanRel = paper.logo.replace(/^\//, "");
    const logoAbs = resolve(PUBLIC_DIR, cleanRel);
    if (!existsSync(logoAbs)) {
      failures.push(`${ctx}: bundled logo file not found at ${cleanRel}`);
      continue;
    }

    const st = statSync(logoAbs);
    if (st.size === 0) {
      failures.push(`${ctx}: logo file is 0 bytes`);
      continue;
    }

    const ext = extname(cleanRel).toLowerCase();
    const buf = readFileSync(logoAbs);
    const kind = sniffImageKind(buf);

    if (ext === ".svg") {
      if (st.size > MAX_SVG_SIZE) {
        failures.push(`${ctx}: SVG logo size ${st.size} bytes exceeds ${MAX_SVG_SIZE} byte ceiling`);
      }
      if (kind !== "svg") {
        failures.push(`${ctx}: expected SVG, but content sniffs as "${kind || "unknown"}"`);
      }
    } else if (ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".webp") {
      if (st.size > MAX_RASTER_SIZE) {
        failures.push(`${ctx}: raster logo size ${st.size} bytes exceeds ${MAX_RASTER_SIZE} byte ceiling`);
      }
      const exp = ext === ".jpg" ? "jpeg" : ext.slice(1);
      if (kind !== exp) {
        failures.push(`${ctx}: extension is ${ext} but magic bytes identify as "${kind || "unknown"}"`);
      }
    }

    // 4. Logo explainer
    if (!paper.logoExplainer || typeof paper.logoExplainer !== "string" || paper.logoExplainer.length < 25) {
      failures.push(`${ctx}: logoExplainer must be at least 25 characters`);
    }

    // 5. Sources
    if (!Array.isArray(paper.sources) || paper.sources.length === 0) {
      failures.push(`${ctx}: sources must be a non-empty array`);
    } else {
      for (const s of paper.sources) {
        if (typeof s !== "string" || !s.startsWith("http")) {
          failures.push(`${ctx}: invalid source URL "${s}"`);
        }
      }
    }
  }
}

if (failures.length > 0) {
  console.error(`\nFAILED: Found ${failures.length} issues in national newspapers:`);
  for (const f of failures) {
    console.error(`  ✖ ${f}`);
  }
  process.exit(1);
}

console.log(`Audited ${totalNewspapers} national newspapers across ${Object.keys(newspapersByCountry).length} countries.`);
console.log(`✓ All ${totalNewspapers} national newspaper entries and logos passed integrity checks.`);
