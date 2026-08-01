// Geometry / provenance sanity check for the Learn-mode historical era maps
// (public/historical-maps/world_*.geojson).
//
// The era maps are the app's only source of historical borders, and unlike the
// flag pipeline they had no guard at all. Three real defects motivated this script
// (see docs/historical-eras-improvement-plan.md):
//
//   1. world_1850.geojson was NOT an 1850 map — all 450 features were byte-identical
//      to world_1815.geojson, with 12 labels rewritten by a local script. So the
//      "1850" era drew 1815 borders: no Texas (1845), no Oregon (1846), no Mexican
//      Cession (1848), no independent Greece or Belgium. A hand-relabelled map is
//      invented geography — the same class of error as an invented flag. (Fixed: the
//      era is now upstream's real world_1880.)
//   2. world_1300.geojson carried an unnamed feature whose geodesic area was 12.78 sr,
//      larger than the whole sphere (4π ≈ 12.566) — a degenerate ring wound the wrong
//      way. (Fixed by scripts/repair-historical-maps.mjs.)
//   3. Mis-encoded NAMEs reached users verbatim — "M?ori" (1880) and "Monte Alb?n"
//      (600 AD), reported 2026-08-01. NAMEs are the display strings, so a lost
//      diacritic is a user-visible bug. (Fixed by DISPLAY_NAME_FIXES.)
//
// Checks (all mechanical — none of them judge historical accuracy):
//   A. no feature may cover more than half the sphere
//   B. rings must be closed, non-degenerate, and inside [-180,180] × [-90,90]
//   C. no era file may be a relabelled copy of another era file (cross-era
//      geometry duplication above DUPLICATE_LIMIT)
//
// Usage: node scripts/check-historical-maps.mjs   (npm run maps:check)
//
// Runs first in npm run flags:check and in the flag-integrity CI workflow. All three
// defects above are fixed, so this check passes — keep it that way: if it fails, fix
// the map or add the missing display-name entry, never weaken the check.

import { readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { geoArea } from "d3-geo";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MAPS_DIR = resolve(__dirname, "../public/historical-maps");

/** A feature bigger than this (steradians; sphere = 4π ≈ 12.566) is broken. */
const MAX_FEATURE_AREA = 2 * Math.PI;
/**
 * Share of one file's features that may share geometry with another era file.
 *
 * Adjacent upstream era files legitimately share a lot of geometry — a border that
 * did not move between two dates is stored identically, so world_1945 ↔ world_1960
 * share 82% and world_1914 ↔ world_1945 share 58%. What no genuine pair of dated maps
 * ever reaches is 100%: the relabelled world_1850 shares **every** one of its 450
 * features with world_1815. The threshold sits in that gap, well clear of both.
 * Never raise it past a real duplicate — fix the map instead.
 */
const DUPLICATE_LIMIT = 0.98;

const { DISPLAY_NAME_FIXES } = await import(resolve(__dirname, "../src/lib/historicalEras.ts"));

const files = readdirSync(MAPS_DIR).filter((f) => f.endsWith(".geojson")).sort();
const failures = [];
const geometryHashes = new Map(); // file → Set(md5 of geometry)

for (const file of files) {
  const geo = JSON.parse(readFileSync(resolve(MAPS_DIR, file), "utf8"));
  const hashes = new Set();
  let oversized = 0, unclosed = 0, degenerate = 0, outOfRange = 0;

  for (const feature of geo.features) {
    hashes.add(createHash("md5").update(JSON.stringify(feature.geometry)).digest("hex"));

    // D. mis-encoded name that would render as-is in the panel, the flag grid and
    // the map tooltip.
    const name = feature.properties?.NAME;
    if (name && /[?\uFFFD]/.test(name) && !DISPLAY_NAME_FIXES.has(name)) {
      failures.push(
        `${file}: polity NAME "${name}" is mis-encoded and has no DISPLAY_NAME_FIXES entry ` +
          `— it would render to users exactly like that`,
      );
    }

    let area = 0;
    try {
      area = geoArea(feature);
    } catch {
      area = 0;
    }
    if (area > MAX_FEATURE_AREA) {
      oversized++;
      failures.push(
        `${file}: feature "${feature.properties?.NAME ?? "(unnamed)"}" covers ${area.toFixed(2)} sr ` +
          `— more than half the sphere (max ${MAX_FEATURE_AREA.toFixed(2)}); the polygon is broken`,
      );
    }

    const g = feature.geometry;
    if (!g) continue;
    const polygons =
      g.type === "Polygon" ? [g.coordinates] : g.type === "MultiPolygon" ? g.coordinates : [];
    for (const polygon of polygons) {
      for (const ring of polygon) {
        if (ring.length < 4) { degenerate++; continue; }
        const [first, last] = [ring[0], ring[ring.length - 1]];
        if (first[0] !== last[0] || first[1] !== last[1]) unclosed++;
        for (const [lon, lat] of ring) {
          if (!(lon >= -180.001 && lon <= 180.001 && lat >= -90.001 && lat <= 90.001)) {
            outOfRange++;
            break;
          }
        }
      }
    }
  }

  if (unclosed) failures.push(`${file}: ${unclosed} unclosed ring(s)`);
  if (degenerate) failures.push(`${file}: ${degenerate} degenerate ring(s) with fewer than 4 points`);
  if (outOfRange) failures.push(`${file}: ${outOfRange} ring(s) with out-of-range coordinates`);

  geometryHashes.set(file, hashes);
  const flags = [oversized && `${oversized} oversized`, unclosed && `${unclosed} unclosed`]
    .filter(Boolean)
    .join(", ");
  console.log(
    `  ${file.padEnd(24)} ${String(geo.features.length).padStart(4)} features` +
      (flags ? `  ⚠ ${flags}` : ""),
  );
}

// C. cross-era duplication — the "relabelled copy" signature.
const names = [...geometryHashes.keys()];
for (let i = 0; i < names.length; i++) {
  for (let j = i + 1; j < names.length; j++) {
    const a = geometryHashes.get(names[i]);
    const b = geometryHashes.get(names[j]);
    let shared = 0;
    for (const h of a) if (b.has(h)) shared++;
    const ratio = shared / Math.min(a.size, b.size);
    if (ratio > DUPLICATE_LIMIT) {
      failures.push(
        `${names[i]} and ${names[j]} share ${shared} identical geometries ` +
          `(${(100 * ratio).toFixed(0)}% of the smaller file) — one era is a relabelled copy of the ` +
          `other, so its borders are not the borders of its own date`,
      );
    }
  }
}

if (failures.length > 0) {
  console.error(`\n✗ historical-map check found ${failures.length} problem(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("\n✓ historical-map check passed — geometry valid, no era is a copy of another.");
