#!/usr/bin/env node
/**
 * Build gate for Learn-mode Central Banks.
 *
 * Mirrors check-tourism-logos.mjs: schema, logo-or-noImageReason, bundled image
 * sniffing, and the Vueling-style map/oversized-SVG guard.
 *
 * Run: node scripts/check-central-banks.mjs  (also part of `npm run flags:check`)
 */

import { readFileSync, existsSync, statSync } from "node:fs";
import { dirname, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { findUserFacingLeaks } from "./lib/userFacingCopy.mjs";
import {
  isRejectedLogoFilename,
  isRejectedLogoSource,
  isRejectedLogoExplainer,
} from "./lib/centralBankLogoQuality.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "..", "src", "data", "centralBanks.ts");
const PUBLIC_DIR = resolve(__dirname, "..", "public");

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

const MAX_SVG_SIZE = 300 * 1024;
const MAX_RASTER_SIZE = 500 * 1024;
const MAX_SVG_ELEMENTS = 500;
const MAX_SVG_TITLES = 5;

const MAP_PATTERNS = [
  /\broute\s*map\b/i,
  /\bdestinations\s*map\b/i,
  /\bequirectangular\b/i,
  /\bmercator\b/i,
];

const NO_IMAGE_SOURCE_FAMILIES = [
  { re: /wikidata|wikipedia|commons/i, label: "Wikidata/Wikipedia/Commons" },
  { re: /official site|website|www\.|\.gov|\.go\.|\.org|\.bank/i, label: "official site" },
  { re: /no central bank|monetary union|uses the (swiss franc|euro|us dollar|united states dollar)/i, label: "no-own-CB arrangement" },
];

const src = readFileSync(DATA_PATH, "utf8");
const banksByCountry = loadConst(src, "export const CENTRAL_BANKS");

const failures = [];
const seenIds = new Set();
let total = 0;
let withImage = 0;
let withoutImage = 0;

for (const [countryKey, list] of Object.entries(banksByCountry)) {
  if (!Array.isArray(list)) {
    failures.push(`Country entry ${countryKey} must be an array`);
    continue;
  }
  for (const entry of list) {
    total++;
    const ctx = `[${entry.id || "unidentified"}] in ${countryKey}`;

    if (!entry.id || typeof entry.id !== "string") {
      failures.push(`${ctx}: missing or non-string id`);
      continue;
    }
    const expectedPrefix = `${entry.countryCode?.toLowerCase()}-`;
    if (!entry.id.startsWith(expectedPrefix)) {
      failures.push(`${ctx}: id "${entry.id}" must start with "${expectedPrefix}"`);
    }
    if (seenIds.has(entry.id)) failures.push(`${ctx}: duplicate id`);
    seenIds.add(entry.id);

    if (entry.countryCode !== countryKey) {
      failures.push(`${ctx}: countryCode "${entry.countryCode}" does not match key "${countryKey}"`);
    }
    if (!entry.name || typeof entry.name !== "string") {
      failures.push(`${ctx}: missing or empty name`);
    }
    if (!Array.isArray(entry.sources) || entry.sources.length === 0) {
      failures.push(`${ctx}: sources must be a non-empty array`);
    } else {
      for (const s of entry.sources) {
        if (typeof s !== "string" || !/^https?:\/\//i.test(s)) {
          failures.push(`${ctx}: source must be http(s) URL, got ${JSON.stringify(s)}`);
        }
      }
    }

    const hasLogo = typeof entry.logo === "string" && entry.logo.length > 0;
    const hasExplainer = typeof entry.logoExplainer === "string" && entry.logoExplainer.length >= 25;
    const hasReason = typeof entry.noImageReason === "string" && entry.noImageReason.length >= 60;

    if (hasLogo && hasReason) {
      failures.push(`${ctx}: has both logo and noImageReason`);
    } else if (!hasLogo && !hasReason) {
      failures.push(`${ctx}: needs logo+logoExplainer or noImageReason`);
    } else if (hasLogo && !hasExplainer) {
      failures.push(`${ctx}: logo requires logoExplainer (>= 25 chars)`);
    } else if (!hasLogo && hasReason) {
      withoutImage++;
      const leaks = findUserFacingLeaks(entry.noImageReason);
      for (const leak of leaks) {
        failures.push(`${ctx}: noImageReason leaks ${leak.label} (matched ${JSON.stringify(leak.match)})`);
      }
      const families = NO_IMAGE_SOURCE_FAMILIES.filter((f) => f.re.test(entry.noImageReason));
      if (families.length < 1) {
        // Allow a long honest gap that names Wikidata / Commons / no-own-CB in plain language
        if (!/wikidata|commons|no central bank|monetary/i.test(entry.noImageReason)) {
          failures.push(`${ctx}: noImageReason must name researched sources (plain language — no Q/P codes)`);
        }
      }
    } else {
      withImage++;
    }

    if (hasExplainer && isRejectedLogoExplainer(entry.logoExplainer)) {
      failures.push(
        `${ctx}: logoExplainer describes a photo/banknote/building — not a brand mark`,
      );
    }

    if (hasLogo) {
      const rel = entry.logo.replace(/^\//, "");
      const abs = resolve(PUBLIC_DIR, rel);
      if (isRejectedLogoFilename(rel.split("/").pop())) {
        failures.push(
          `${ctx}: logo filename "${rel}" looks like a photo/banknote/building, not a brand mark`,
        );
      }
      for (const s of entry.sources || []) {
        if (isRejectedLogoSource(s)) {
          failures.push(
            `${ctx}: source cites a photo/banknote/building file (${s}) — not a brand mark`,
          );
        }
      }
      if (!existsSync(abs)) {
        failures.push(`${ctx}: logo file missing at public/${rel}`);
      } else {
        const st = statSync(abs);
        if (st.size === 0) failures.push(`${ctx}: logo file empty`);
        const buf = readFileSync(abs);
        const kind = sniffImageKind(buf);
        const ext = extname(abs).toLowerCase().replace(".", "");
        if (!kind || kind === "html") {
          failures.push(`${ctx}: logo bytes are ${kind || "unrecognised"} (not an image)`);
        } else {
          const extOk =
            (kind === "svg" && ext === "svg") ||
            (kind === "png" && ext === "png") ||
            (kind === "jpeg" && (ext === "jpg" || ext === "jpeg")) ||
            (kind === "webp" && ext === "webp");
          if (!extOk) failures.push(`${ctx}: extension .${ext} does not match bytes (${kind})`);
          if (kind === "svg") {
            if (st.size > MAX_SVG_SIZE) failures.push(`${ctx}: SVG too large (${st.size} > ${MAX_SVG_SIZE})`);
            const text = buf.toString("utf8");
            const titles = (text.match(/<title[\s>]/gi) || []).length;
            if (titles > MAX_SVG_TITLES) failures.push(`${ctx}: SVG looks like a map (> ${MAX_SVG_TITLES} <title>)`);
            for (const pat of MAP_PATTERNS) {
              if (pat.test(text)) failures.push(`${ctx}: SVG matches map pattern ${pat}`);
            }
            const els = (text.match(/<(?:path|polygon|polyline)\b/gi) || []).length;
            if (els > MAX_SVG_ELEMENTS) failures.push(`${ctx}: SVG too complex (${els} path-like elements)`);
          } else if (st.size > MAX_RASTER_SIZE) {
            failures.push(`${ctx}: raster too large (${st.size} > ${MAX_RASTER_SIZE})`);
          }
        }
      }

      const nonCommons = (entry.sources || []).some(
        (s) => typeof s === "string" && !/commons\.wikimedia\.org/i.test(s) && /^https?:\/\//i.test(s),
      );
      // licenceNote required when any non-Commons http source is present AND logo is set
      // (bank websites are fine as citations; still record licence for the bundled mark)
      if (hasLogo && (!entry.licenceNote || entry.licenceNote.length < 40)) {
        // Commons-only is OK with a short note, but we always require >= 40 for consistency
        failures.push(`${ctx}: licenceNote (>= 40 chars) required when logo is bundled`);
      }
      void nonCommons;
    }
  }
}

if (total < 190) {
  failures.push(`Expected ~195 UN members, found only ${total} central-bank entries`);
}

if (failures.length) {
  console.error(`central-banks check FAILED (${failures.length}):\n` + failures.map((f) => `  - ${f}`).join("\n"));
  process.exit(1);
}

console.log(
  `Central banks check OK — ${total} entries, ${withImage} with logo, ${withoutImage} with noImageReason.`,
);
