// Shrinks the Learn-mode historical era maps without changing what they draw.
//
// The upstream GeoJSONs store coordinates at ~14 decimal places — nanometre
// precision for a map that is 960 px wide for 360° of longitude, i.e. 0.375° per
// pixel. Four decimals (~11 m at the equator) is still about 3,750× finer than a
// pixel, so rounding to 4 dp is lossless at every zoom the app offers (max 24×,
// which is still ~0.016°/px) while roughly halving the download.
//
// Also folds in the degenerate-ring repair (see repair-historical-maps.mjs): rings
// that enclose nothing, and features left with no geometry once those rings go.
// One of them — a zero-width sliver in world_1300 — was read by d3-geo as covering
// the entire globe.
//
// This NEVER moves a coordinate meaningfully, merges features, or invents geometry;
// it only drops precision no display can use and rings that draw nothing.
//
// Usage:
//   node scripts/optimize-historical-maps.mjs --check   → report, exit 1 if work remains
//   node scripts/optimize-historical-maps.mjs           → rewrite every file in place
//   node scripts/optimize-historical-maps.mjs world_100 → one file

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { geoArea } from "d3-geo";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MAPS_DIR = resolve(__dirname, "../public/historical-maps");
const checkOnly = process.argv.includes("--check");
const only = process.argv.slice(2).find((a) => !a.startsWith("--")) ?? null;

/** Decimal places kept. 4 dp ≈ 11 m — see the header for why that is lossless here. */
const PRECISION = 4;
const FACTOR = 10 ** PRECISION;

const round = (n) => Math.round(n * FACTOR) / FACTOR;

function planarArea(ring) {
  let sum = 0;
  for (let i = 0, n = ring.length - 1; i < n; i++) {
    sum += ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1];
  }
  return Math.abs(sum) / 2;
}

function isDegenerate(ring) {
  if (ring.length < 4) return true;
  if (new Set(ring.map((p) => `${p[0]},${p[1]}`)).size < 3) return true;
  if (planarArea(ring) < 1e-12) return true;
  // Rounding can collapse a hairline sliver into a ring whose winding reads, on the
  // SPHERE, as everything outside it — d3-geo then reports ~4π and the feature paints
  // over the world. Planar area cannot see this (it is orientation-free), so test the
  // spherical area too and drop anything covering more than half the globe.
  try {
    return geoArea({ type: "Polygon", coordinates: [ring] }) > Math.PI;
  } catch {
    return true;
  }
}

/** Round a ring and drop consecutive duplicate points the rounding creates. */
function roundRing(ring) {
  const out = [];
  for (const [lon, lat] of ring) {
    const p = [round(lon), round(lat)];
    const prev = out[out.length - 1];
    if (!prev || prev[0] !== p[0] || prev[1] !== p[1]) out.push(p);
  }
  // Keep the ring closed after de-duplication.
  const first = out[0];
  const last = out[out.length - 1];
  if (first && last && (first[0] !== last[0] || first[1] !== last[1])) out.push([first[0], first[1]]);
  return out;
}

const files = readdirSync(MAPS_DIR)
  .filter((f) => f.endsWith(".geojson"))
  .filter((f) => (only ? f.includes(only) : true))
  .sort();

let beforeTotal = 0;
let afterTotal = 0;
let pending = 0;

for (const file of files) {
  const path = join(MAPS_DIR, file);
  const before = statSync(path).size;
  const geo = JSON.parse(readFileSync(path, "utf8"));

  let droppedRings = 0;
  for (const feature of geo.features) {
    const g = feature.geometry;
    if (!g) continue;
    const polygons =
      g.type === "Polygon" ? [g.coordinates] : g.type === "MultiPolygon" ? g.coordinates : null;
    if (!polygons) continue;
    const keptPolygons = [];
    for (const polygon of polygons) {
      const rings = [];
      for (const ring of polygon) {
        const rounded = roundRing(ring);
        if (isDegenerate(rounded)) { droppedRings++; continue; }
        rings.push(rounded);
      }
      if (rings.length > 0) keptPolygons.push(rings);
    }
    g.coordinates = g.type === "Polygon" ? (keptPolygons[0] ?? []) : keptPolygons;
  }
  geo.features = geo.features.filter((f) => {
    const g = f.geometry;
    if (!g) return false;
    if (g.type === "Polygon" || g.type === "MultiPolygon") return g.coordinates.length > 0;
    return true;
  });

  const serialized = JSON.stringify(geo);
  const after = Buffer.byteLength(serialized);
  beforeTotal += before;
  afterTotal += after;

  const saved = before - after;
  // A file already optimised re-serialises to within a few bytes of its own size.
  if (saved > before * 0.02) {
    pending++;
    console.log(
      `  ${file.padEnd(24)} ${(before / 1e6).toFixed(1)} MB → ${(after / 1e6).toFixed(1)} MB ` +
        `(${((100 * saved) / before).toFixed(0)}% smaller, ${droppedRings} degenerate ring(s))` +
        `${checkOnly ? "" : " ✓"}`,
    );
    if (!checkOnly) writeFileSync(path, serialized);
  }
}

if (pending === 0) {
  console.log("✓ historical era maps are already optimised.");
  process.exit(0);
}
if (checkOnly) {
  console.error(`\n✗ ${pending} file(s) still un-optimised — run node scripts/optimize-historical-maps.mjs`);
  process.exit(1);
}
console.log(
  `\n✓ ${(beforeTotal / 1e6).toFixed(0)} MB → ${(afterTotal / 1e6).toFixed(0)} MB ` +
    `(${((100 * (beforeTotal - afterTotal)) / beforeTotal).toFixed(0)}% smaller).`,
);
