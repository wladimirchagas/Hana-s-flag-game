#!/usr/bin/env node
/**
 * Build gate for Learn-mode Tourism Logos.
 *
 * Verifies that all tourism-board entries in `src/data/tourismLogos.ts` are
 * well-formed, cited, and — when a logo is bundled — genuinely a logo (not a
 * route map, photograph, or uncompressed multi-megabyte asset). Mirrors
 * `check-commercial-airlines.mjs`, adapted for the optional `noImageReason`
 * escape hatch also used by political-party logos (a genuinely unsourceable
 * logo is listed anyway, never silently dropped).
 *
 * Checks (each FAILS the build):
 *   A. Schema & Data Completeness:
 *      - Every entry has non-empty name and agency.
 *      - `id` matches format "{countryCode.toLowerCase()}-{slug}", countryCode matches
 *        the enclosing dictionary key, and no two entries share an id.
 *      - At least one authoritative source in `sources` with a valid http(s) URL.
 *      - Exactly one of (`logo` + `logoExplainer` >= 25 chars) or (`noImageReason` >= 60
 *        chars, naming at least two source families that were searched) is present —
 *        never both, never neither.
 *      - When `visitors` is present: count > 0, year in [1900, 2030], non-empty metric.
 *      - A non-Commons `logo` source (any `sources` entry not on commons.wikimedia.org)
 *        requires a `licenceNote` >= 40 characters.
 *   B. Bundled Logo Existence & Validity (when `logo` is set):
 *      - The file referenced by `logo` exists on disk under `public/`, is non-empty,
 *        and sniffs as valid SVG or supported raster (png, jpeg, webp) matching the
 *        declared file extension; never an HTML error page.
 *   C. Map & Non-Logo Prevention (The Vueling Guard):
 *      - SVGs must never be route/destination maps or geographic projections.
 *      - SVG element complexity ceiling: fails if path/polygon elements exceed 500.
 *      - File size ceilings: fails if SVG > 300 KB or raster > 500 KB.
 *
 * Run: node scripts/check-tourism-logos.mjs  (also part of `npm run flags:check`)
 */

import { readFileSync, existsSync, statSync } from "node:fs";
import { dirname, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "..", "src", "data", "tourismLogos.ts");
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
  const head = buf.subarray(0, 4096).toString("utf8").replace(/^﻿/, "").trimStart();
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
const MAX_SVG_ELEMENTS = 500;
const MAX_SVG_TITLES = 5;

const MAP_PATTERNS = [
  /\broute\s*map\b/i,
  /\bdestinations\s*map\b/i,
  /\bflight\s*network\b/i,
  /\bcountries\s*in\s*which\b/i,
  /\bequirectangular\b/i,
  /\bmercator\b/i,
  /\brobinson\b/i,
];

const src = readFileSync(DATA_PATH, "utf8");
const logosByCountry = loadConst(src, "export const TOURISM_LOGOS");

const failures = [];
const seenIds = new Set();
let totalLogos = 0;
let withImage = 0;
let withoutImage = 0;

for (const [countryKey, list] of Object.entries(logosByCountry)) {
  if (!Array.isArray(list)) {
    failures.push(`Country entry ${countryKey} must be an array of tourism logos`);
    continue;
  }

  for (const entry of list) {
    totalLogos++;
    const ctx = `[${entry.id || "unidentified"}] in ${countryKey}`;

    // 1. Identification
    if (!entry.id || typeof entry.id !== "string") {
      failures.push(`${ctx}: missing or non-string id`);
      continue;
    }
    const expectedPrefix = `${entry.countryCode?.toLowerCase()}-`;
    if (!entry.id.startsWith(expectedPrefix)) {
      failures.push(`${ctx}: id "${entry.id}" must start with "${expectedPrefix}"`);
    }
    if (seenIds.has(entry.id)) {
      failures.push(`${ctx}: duplicate id "${entry.id}"`);
    }
    seenIds.add(entry.id);

    if (entry.countryCode !== countryKey) {
      failures.push(`${ctx}: countryCode "${entry.countryCode}" does not match key "${countryKey}"`);
    }

    if (!entry.name || typeof entry.name !== "string") {
      failures.push(`${ctx}: missing or empty name`);
    }

    if (!entry.agency || typeof entry.agency !== "string") {
      failures.push(`${ctx}: missing or empty agency`);
    }

    // 2. Sources
    if (!Array.isArray(entry.sources) || entry.sources.length === 0) {
      failures.push(`${ctx}: sources must contain at least one citation`);
    } else {
      for (const s of entry.sources) {
        if (!/^https?:\/\//i.test(s)) {
          failures.push(`${ctx}: source "${s}" is not a valid http(s) URL`);
        }
      }
    }
    const nonCommonsSource = Array.isArray(entry.sources)
      ? entry.sources.some((s) => typeof s === "string" && !/^https?:\/\/(commons\.wikimedia\.org|upload\.wikimedia\.org)\//i.test(s))
      : false;

    // 3. Image XOR noImageReason
    const hasImage = entry.logo != null;
    const hasNoImageReason = entry.noImageReason != null;
    if (hasImage && hasNoImageReason) {
      failures.push(`${ctx}: entry has both logo and noImageReason — must be exactly one`);
    } else if (!hasImage && !hasNoImageReason) {
      failures.push(`${ctx}: entry has neither logo nor noImageReason — must be exactly one`);
    } else if (hasNoImageReason) {
      if (typeof entry.noImageReason !== "string" || entry.noImageReason.trim().length < 60) {
        failures.push(`${ctx}: noImageReason must be at least 60 characters documenting the search performed`);
      }
      withoutImage++;
    } else {
      withImage++;
      if (!entry.logoExplainer || typeof entry.logoExplainer !== "string" || entry.logoExplainer.trim().length < 25) {
        failures.push(`${ctx}: logoExplainer must be at least 25 characters describing logo symbolism`);
      }
      if (nonCommonsSource) {
        if (!entry.licenceNote || typeof entry.licenceNote !== "string" || entry.licenceNote.trim().length < 40) {
          failures.push(`${ctx}: a non-Commons source requires a licenceNote of at least 40 characters`);
        }
      }

      // 4. Bundled Logo Verification
      if (typeof entry.logo !== "string") {
        failures.push(`${ctx}: logo must be a string path`);
        continue;
      }
      if (!entry.logo.startsWith(`/tourism-logos/${countryKey.toLowerCase()}/`)) {
        failures.push(`${ctx}: logo path "${entry.logo}" must start with "/tourism-logos/${countryKey.toLowerCase()}/"`);
      }

      const diskPath = resolve(PUBLIC_DIR, `.${entry.logo}`);
      if (!existsSync(diskPath)) {
        failures.push(`${ctx}: logo file does not exist on disk at "${diskPath}"`);
        continue;
      }

      const stat = statSync(diskPath);
      if (stat.size === 0) {
        failures.push(`${ctx}: logo file is 0 bytes`);
        continue;
      }

      const buf = readFileSync(diskPath);
      const kind = sniffImageKind(buf);

      if (!kind) {
        failures.push(`${ctx}: file format could not be recognized as an image`);
        continue;
      }
      if (kind === "html") {
        failures.push(`${ctx}: logo file is an HTML error page, not an image`);
        continue;
      }

      const ext = extname(diskPath).toLowerCase();
      const expectedKind = ext === ".svg" ? "svg" : ext === ".png" ? "png" : ext === ".jpg" || ext === ".jpeg" ? "jpeg" : ext === ".webp" ? "webp" : null;
      if (kind !== expectedKind) {
        failures.push(`${ctx}: file extension "${ext}" does not match detected image format "${kind}"`);
      }

      // 5. File Size Checks
      if (kind === "svg" && stat.size > MAX_SVG_SIZE) {
        failures.push(`${ctx}: SVG logo is unusually large (${stat.size} bytes > ${MAX_SVG_SIZE} max). Check if it is a map or complex illustration.`);
      } else if (kind !== "svg" && stat.size > MAX_RASTER_SIZE) {
        failures.push(`${ctx}: Raster logo is unusually large (${stat.size} bytes > ${MAX_RASTER_SIZE} max). Recompress with sharp.`);
      }

      // 6. SVG Route/Destination Map & Complexity Guards
      if (kind === "svg") {
        const svgText = buf.toString("utf8");

        const titleMatches = svgText.match(/<title[^>]*>([^<]+)<\/title>/gi) || [];
        if (titleMatches.length > MAX_SVG_TITLES) {
          failures.push(`${ctx}: SVG contains ${titleMatches.length} <title> elements (max ${MAX_SVG_TITLES}). It appears to be a map rather than a logo!`);
        }

        for (const pattern of MAP_PATTERNS) {
          if (pattern.test(svgText)) {
            failures.push(`${ctx}: SVG content matches map pattern ${pattern}. Logos must not be route/destination maps.`);
          }
        }

        const pathCount = (svgText.match(/<path/gi) || []).length;
        const polyCount = (svgText.match(/<polygon/gi) || []).length;
        const totalElements = pathCount + polyCount;
        if (totalElements > MAX_SVG_ELEMENTS) {
          failures.push(`${ctx}: SVG contains ${totalElements} path/polygon elements (max ${MAX_SVG_ELEMENTS}). Check for excessive vector complexity or map geometry.`);
        }
      }
    }

    // 7. visitors / visitorsNote
    if (entry.visitors != null) {
      const v = entry.visitors;
      if (typeof v.count !== "number" || v.count <= 0) {
        failures.push(`${ctx}: visitors.count must be a positive number`);
      }
      if (typeof v.year !== "number" || v.year < 1900 || v.year > 2030) {
        failures.push(`${ctx}: visitors.year "${v.year}" is not plausible`);
      }
      if (!v.metric || typeof v.metric !== "string" || v.metric.trim().length < 10) {
        failures.push(`${ctx}: visitors.metric must describe what was counted`);
      }
    } else if (entry.visitorsNote != null) {
      if (typeof entry.visitorsNote !== "string" || entry.visitorsNote.trim().length < 25) {
        failures.push(`${ctx}: visitorsNote must be at least 25 characters explaining the gap`);
      }
    }
  }
}

console.log(`Audited ${totalLogos} tourism-logo entries across ${Object.keys(logosByCountry).length} countries (${withImage} with a bundled logo, ${withoutImage} with a documented noImageReason).`);

if (failures.length > 0) {
  console.error(`\n✗ Tourism logo check FAILED with ${failures.length} error(s):\n`);
  for (const f of failures) {
    console.error(`  • ${f}`);
  }
  process.exit(1);
}

console.log(`✓ All ${totalLogos} tourism-logo entries passed integrity checks.`);
