#!/usr/bin/env node
/**
 * Build gate for Learn-mode Commercial Airlines.
 *
 * Verifies that all commercial airline entries in `src/data/commercialAirlines.ts`
 * are well-formed, cited, bundled locally, and genuinely logos (not route maps,
 * aircraft photographs, or uncompressed multi-megabyte assets).
 *
 * Checks (each FAILS the build):
 *   A. Schema & Data Completeness:
 *      - Every entry has non-empty name, iata, founded (> 1900), alliance, hubs (>= 1),
 *        fleet (total > 0, non-empty summary), logo, and logoExplainer (>= 25 chars).
 *      - `id` matches format "{countryCode.toLowerCase()}-{slug}", countryCode matches
 *        the enclosing dictionary key, and no two airlines share an id.
 *      - At least one authoritative source in `sources` with a valid http(s) URL.
 *   B. Bundled Logo Existence & Validity:
 *      - The file referenced by `logo` exists on disk under `public/`.
 *      - File is non-empty (size > 0).
 *      - Image format sniffs as valid SVG or supported raster (png, jpeg, webp) matching
 *        the declared file extension; must never be an HTML error page.
 *   C. Map & Non-Logo Prevention (The Vueling Guard):
 *      - SVGs must never be route/destination maps or geographic projections:
 *        fails if an SVG contains > 5 `<title>` elements (maps contain country borders)
 *        or route map keywords ("route map", "destinations map", "flight network", "countries in which").
 *      - SVG element complexity ceiling: fails if total path/polygon elements exceed 500.
 *      - File size ceilings: fails if SVG > 300 KB or raster > 500 KB (protects against
 *        uncompressed raw dumps and high-res photos).
 *
 * Run: node scripts/check-commercial-airlines.mjs  (also part of `npm run flags:check`)
 */

import { readFileSync, existsSync, statSync } from "node:fs";
import { dirname, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "..", "src", "data", "commercialAirlines.ts");
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
const airlinesByCountry = loadConst(src, "export const COMMERCIAL_AIRLINES");

const failures = [];
const seenIds = new Set();
let totalAirlines = 0;

for (const [countryKey, list] of Object.entries(airlinesByCountry)) {
  if (!Array.isArray(list)) {
    failures.push(`Country entry ${countryKey} must be an array of airlines`);
    continue;
  }

  for (const airline of list) {
    totalAirlines++;
    const ctx = `[${airline.id || "unidentified"}] in ${countryKey}`;

    // 1. Identification
    if (!airline.id || typeof airline.id !== "string") {
      failures.push(`${ctx}: missing or non-string id`);
      continue;
    }
    const expectedPrefix = `${airline.countryCode?.toLowerCase()}-`;
    if (!airline.id.startsWith(expectedPrefix)) {
      failures.push(`${ctx}: id "${airline.id}" must start with "${expectedPrefix}"`);
    }
    if (seenIds.has(airline.id)) {
      failures.push(`${ctx}: duplicate id "${airline.id}"`);
    }
    seenIds.add(airline.id);

    if (airline.countryCode !== countryKey) {
      failures.push(`${ctx}: countryCode "${airline.countryCode}" does not match key "${countryKey}"`);
    }

    if (!airline.name || typeof airline.name !== "string") {
      failures.push(`${ctx}: missing or empty name`);
    }

    if (!airline.iata || typeof airline.iata !== "string") {
      failures.push(`${ctx}: missing or empty IATA code`);
    }

    if (typeof airline.founded !== "number" || airline.founded < 1900 || airline.founded > 2030) {
      failures.push(`${ctx}: invalid founded year "${airline.founded}"`);
    }

    if (!airline.alliance || typeof airline.alliance !== "string") {
      failures.push(`${ctx}: missing alliance`);
    }

    if (!Array.isArray(airline.hubs) || airline.hubs.length === 0) {
      failures.push(`${ctx}: hubs must be a non-empty array of airport names`);
    }

    if (!airline.fleet || typeof airline.fleet.total !== "number" || airline.fleet.total <= 0 || !airline.fleet.summary) {
      failures.push(`${ctx}: fleet must specify total count > 0 and summary string`);
    }

    // 2. Sources & Explanation
    if (!Array.isArray(airline.sources) || airline.sources.length === 0) {
      failures.push(`${ctx}: sources must contain at least one citation`);
    } else {
      for (const s of airline.sources) {
        if (!/^https?:\/\//i.test(s)) {
          failures.push(`${ctx}: source "${s}" is not a valid http(s) URL`);
        }
      }
    }

    if (!airline.logoExplainer || typeof airline.logoExplainer !== "string" || airline.logoExplainer.trim().length < 25) {
      failures.push(`${ctx}: logoExplainer must be at least 25 characters describing logo symbolism`);
    }

    // 3. Bundled Logo Verification
    if (!airline.logo || typeof airline.logo !== "string") {
      failures.push(`${ctx}: missing logo path`);
      continue;
    }
    if (!airline.logo.startsWith(`/airline-logos/${countryKey.toLowerCase()}/`)) {
      failures.push(`${ctx}: logo path "${airline.logo}" must start with "/airline-logos/${countryKey.toLowerCase()}/"`);
    }

    const diskPath = resolve(PUBLIC_DIR, `.${airline.logo}`);
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

    // 4. File Size Checks
    if (kind === "svg" && stat.size > MAX_SVG_SIZE) {
      failures.push(`${ctx}: SVG logo is unusually large (${stat.size} bytes > ${MAX_SVG_SIZE} max). Check if it is a map or complex illustration.`);
    } else if (kind !== "svg" && stat.size > MAX_RASTER_SIZE) {
      failures.push(`${ctx}: Raster logo is unusually large (${stat.size} bytes > ${MAX_RASTER_SIZE} max). Recompress with sharp.`);
    }

    // 5. SVG Route/Destination Map & Complexity Guards
    if (kind === "svg") {
      const svgText = buf.toString("utf8");

      // Multiple title elements indicate a map with country / region paths (the Vueling bug)
      const titleMatches = svgText.match(/<title[^>]*>([^<]+)<\/title>/gi) || [];
      if (titleMatches.length > MAX_SVG_TITLES) {
        failures.push(`${ctx}: SVG contains ${titleMatches.length} <title> elements (max ${MAX_SVG_TITLES}). It appears to be an operating/route map rather than a brand logo!`);
      }

      // Keyword check for map projections and route descriptions
      for (const pattern of MAP_PATTERNS) {
        if (pattern.test(svgText)) {
          failures.push(`${ctx}: SVG content matches map pattern ${pattern}. Logos must not be route/destination maps.`);
        }
      }

      // Element complexity check
      const pathCount = (svgText.match(/<path/gi) || []).length;
      const polyCount = (svgText.match(/<polygon/gi) || []).length;
      const totalElements = pathCount + polyCount;
      if (totalElements > MAX_SVG_ELEMENTS) {
        failures.push(`${ctx}: SVG contains ${totalElements} path/polygon elements (max ${MAX_SVG_ELEMENTS}). Check for excessive vector complexity or map geometry.`);
      }
    }
  }
}

console.log(`Audited ${totalAirlines} commercial airlines across ${Object.keys(airlinesByCountry).length} countries.`);

if (failures.length > 0) {
  console.error(`\n✗ Commercial airline check FAILED with ${failures.length} error(s):\n`);
  for (const f of failures) {
    console.error(`  • ${f}`);
  }
  process.exit(1);
}

console.log(`✓ All ${totalAirlines} commercial airline entries and logos passed integrity checks.`);
