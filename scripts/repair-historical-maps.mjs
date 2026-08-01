// One-off repair pass for the Learn-mode historical era maps.
//
// Removes DEGENERATE rings — rings with fewer than 3 distinct positions, or a
// planar area indistinguishable from zero. They carry no territory, but they are
// not harmless: d3-geo measures ring area on the sphere, so a zero-width sliver
// whose winding runs "the wrong way" is read as covering everything OUTSIDE it,
// i.e. the whole globe. That is exactly what world_1300.geojson contained — a
// 4-point sliver near Zimbabwe (two of its corners identical to 15 decimal
// places) that geoArea reported as 12.78 sr, larger than the sphere itself, and
// which check-historical-maps.mjs flags as a broken polygon.
//
// The repair only ever DELETES rings that enclose nothing. It never moves a
// coordinate, never merges features and never invents geometry — the same
// discipline the flag pipeline applies to its sources.
//
// Usage:
//   node scripts/repair-historical-maps.mjs --check          → report, exit 1 if any found
//   node scripts/repair-historical-maps.mjs                  → rewrite every file in place
//   node scripts/repair-historical-maps.mjs world_1300       → rewrite just one file
//
// Only world_1300 has been repaired so far, because only its sliver produced a
// whole-globe feature. The other ~180 degenerate rings enclose nothing and render
// nothing (the largest is 9e-13 deg², about a hundredth of a square metre), so they
// are left for the coordinate-precision pass in
// docs/historical-eras-improvement-plan.md §4.2, which rewrites every file anyway —
// re-serialising 73 MB of GeoJSON twice would bloat the repository for no gain.

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MAPS_DIR = resolve(__dirname, "../public/historical-maps");
const checkOnly = process.argv.includes("--check");
/** Optional file filter, e.g. "world_1300" — matched as a substring of the filename. */
const only = process.argv.slice(2).find((a) => !a.startsWith("--")) ?? null;

/** Planar shoelace area — good enough to identify a ring that encloses nothing. */
function planarArea(ring) {
  let sum = 0;
  for (let i = 0, n = ring.length - 1; i < n; i++) {
    sum += ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1];
  }
  return Math.abs(sum) / 2;
}

function distinctPositions(ring) {
  return new Set(ring.map((p) => `${p[0]},${p[1]}`)).size;
}

function isDegenerate(ring) {
  return ring.length < 4 || distinctPositions(ring) < 3 || planarArea(ring) < 1e-12;
}

let totalRemoved = 0;
let totalDropped = 0;
const files = readdirSync(MAPS_DIR)
  .filter((f) => f.endsWith(".geojson"))
  .filter((f) => (only ? f.includes(only) : true))
  .sort();

for (const file of files) {
  const path = join(MAPS_DIR, file);
  const geo = JSON.parse(readFileSync(path, "utf8"));
  let removed = 0;

  for (const feature of geo.features) {
    const g = feature.geometry;
    if (!g) continue;
    if (g.type === "Polygon") {
      const kept = g.coordinates.filter((r) => !isDegenerate(r));
      removed += g.coordinates.length - kept.length;
      g.coordinates = kept;
    } else if (g.type === "MultiPolygon") {
      const kept = [];
      for (const polygon of g.coordinates) {
        const rings = polygon.filter((r) => !isDegenerate(r));
        removed += polygon.length - rings.length;
        // A polygon whose OUTER ring was degenerate encloses nothing at all.
        if (rings.length > 0) kept.push(rings);
      }
      g.coordinates = kept;
    }
  }

  // A feature whose every ring was degenerate now has no geometry at all. It can
  // never render or be clicked, so drop it rather than leave an empty husk behind.
  // (In world_1300 this removed 25 features — all of them unnamed artifacts; no
  // named polity lost geometry, so the era's clickable name set is unchanged.)
  const before = geo.features.length;
  geo.features = geo.features.filter((f) => {
    const g = f.geometry;
    if (!g) return false;
    if (g.type === "Polygon" || g.type === "MultiPolygon") return g.coordinates.length > 0;
    return true;
  });
  const droppedFeatures = before - geo.features.length;

  if (removed > 0 || droppedFeatures > 0) {
    totalRemoved += removed;
    totalDropped += droppedFeatures;
    console.log(
      `  ${file}: ${removed} degenerate ring(s), ${droppedFeatures} empty feature(s)` +
        `${checkOnly ? "" : " removed"}`,
    );
    if (!checkOnly) writeFileSync(path, JSON.stringify(geo));
  }
}

if (totalRemoved === 0 && totalDropped === 0) {
  console.log("✓ nothing to repair — no degenerate rings, no empty features.");
  process.exit(0);
}
if (checkOnly) {
  console.error(
    `\n✗ ${totalRemoved} degenerate ring(s) and ${totalDropped} empty feature(s) found — ` +
      `run node scripts/repair-historical-maps.mjs`,
  );
  process.exit(1);
}
console.log(`\n✓ removed ${totalRemoved} degenerate ring(s) and ${totalDropped} empty feature(s).`);
