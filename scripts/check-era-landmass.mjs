// Coastline check for the Learn-mode historical era maps.
//
// WHY THIS EXISTS
// ---------------
// Borders move between eras. COASTLINES DO NOT. A landmass ends where the ocean
// begins, and that line is the same in 1600 as it is today — so a polity polygon that
// covers open sea was not digitised from a source, it was drawn by hand.
//
// This is the check for the damage reported 2026-08 (#894–#902), where a pass meant to
// make borders period-accurate redrew the coastline instead: world_1600's "Spain" and
// "Portugal" were replaced by hand-drawn 8- and 6-vertex boxes, 66% and 81% too large,
// spilling across the Pyrenees and out into the Bay of Biscay. The existing maps:check
// saw nothing wrong — the boxes were closed, in range and smaller than half the sphere.
//
// WHAT IT CHECKS, AND WHAT IT DELIBERATELY DOES NOT
// -------------------------------------------------
// It flags one thing only: an era polygon claiming cells that are OCEAN in the app's own
// Natural Earth basemap (public/countries-50m.json — the same topology the world map
// draws, so the two can never disagree about where the coast is).
//
// It does NOT flag the reverse — land no polity covers. That is legitimate and common:
// an era map draws polities, and large regions were genuinely unclaimed at many dates
// (the Indus basin in 600, interior India in bc500). Treating "no polity here" as a bug
// would bury a real finding under hundreds of false ones, so this check stays asymmetric:
// claiming the sea is always wrong, leaving land blank often is not.
//
// Findings are reported as CLUSTERS, never single cells. The era maps and Natural Earth
// were digitised independently, so a one- or two-cell disagreement along a coast is
// digitising noise. A hand-drawn box is never two cells.
//
// The exact-geometry guard in scripts/restore-era-geometry.mjs --check is the primary
// defence (it pins every era map to the authoritative upstream import, so any rewrite at
// all fails). This check is the backstop for geometry that has no upstream to compare
// against — a newly added era file, or a re-baselined import.
//
// A sourced exception goes in ALLOWED_CLAIMS with a reason — never raise the thresholds.
//
// Usage: node scripts/check-era-landmass.mjs   (npm run maps:check-landmass)

import { readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { geoContains } from "d3-geo";
import { feature as topoFeature } from "topojson-client";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MAPS_DIR = resolve(__dirname, "../public/historical-maps");
const BASEMAP = resolve(__dirname, "../public/countries-50m.json");

/**
 * Raster resolution in degrees. 0.5° ≈ 55 km at the equator.
 *
 * 1° is NOT fine enough: at that size the fabricated Iberian boxes hid inside the
 * one-cell coastal tolerance and the check passed them. Do not coarsen it.
 */
const GRID_DEG = 0.5;
const LAT_MIN = -58, LAT_MAX = 80;
/**
 * Contiguous cells needed to report, measured against both cases rather than guessed:
 * re-injecting the fabricated world_1600 "Spain"/"Portugal" boxes produces a 27-cell
 * cluster off the Iberian coast, while the authoritative geometry — every era, whole
 * world — never produces a cluster larger than 1 cell. 8 sits in the middle of that gap.
 * Never raise it; a real redrawn coast starts well above it.
 */
const MIN_CLUSTER = 8;

/**
 * Sourced, deliberate exceptions, keyed `"<era>|<lon>,<lat>"`.
 * Add only with a one-line reason. Never add one to silence a redrawn coastline.
 */
const ALLOWED_CLAIMS = new Map([]);

// Fixed precision, so accumulated float error over 0.5° steps can never split one cell
// into two distinct keys (which would break both the land lookup and the clustering).
const key = (lon, lat) => `${lon.toFixed(2)},${lat.toFixed(2)}`;
const snap = (v) => Math.floor(v / GRID_DEG) * GRID_DEG;

function bboxOf(geometry) {
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  JSON.stringify(geometry.coordinates).replace(/\[(-?[\d.eE+-]+),(-?[\d.eE+-]+)\]/g, (m, a, b) => {
    a = +a; b = +b;
    if (a < x0) x0 = a; if (a > x1) x1 = a;
    if (b < y0) y0 = b; if (b > y1) y1 = b;
    return m;
  });
  return [x0, y0, x1, y1];
}

/** Land cells covered by a FeatureCollection, scanning only each feature's own bbox. */
function rasterise(features) {
  const land = new Set();
  for (const f of features) {
    if (!f.geometry) continue;
    const [x0, y0, x1, y1] = bboxOf(f.geometry);
    if (!Number.isFinite(x0)) continue;
    for (let lat = Math.max(snap(y0), LAT_MIN); lat <= Math.min(y1, LAT_MAX); lat += GRID_DEG) {
      const cy = lat + GRID_DEG / 2;
      if (cy < y0 || cy > y1) continue;
      for (let lon = Math.max(snap(x0), -180); lon <= Math.min(x1, 180); lon += GRID_DEG) {
        const cx = lon + GRID_DEG / 2;
        if (cx < x0 || cx > x1) continue;
        const k = key(lon, lat);
        if (land.has(k)) continue;
        if (geoContains(f, [cx, cy])) land.add(k);
      }
    }
  }
  return land;
}

function cluster(keys) {
  const remaining = new Set(keys);
  const out = [];
  for (const start of keys) {
    if (!remaining.has(start)) continue;
    const stack = [start], group = [];
    remaining.delete(start);
    while (stack.length) {
      const k = stack.pop();
      group.push(k);
      const [lo, la] = k.split(",").map(Number);
      for (const [dx, dy] of [[GRID_DEG, 0], [-GRID_DEG, 0], [0, GRID_DEG], [0, -GRID_DEG]]) {
        const n = key(lo + dx, la + dy);
        if (remaining.has(n)) { remaining.delete(n); stack.push(n); }
      }
    }
    out.push(group);
  }
  return out.sort((a, b) => b.length - a.length);
}

function centre(group) {
  let lo = 0, la = 0;
  for (const k of group) { const [a, b] = k.split(",").map(Number); lo += a; la += b; }
  return [lo / group.length + GRID_DEG / 2, la / group.length + GRID_DEG / 2];
}
const fmt = ([lo, la]) =>
  `${Math.abs(la).toFixed(1)}°${la >= 0 ? "N" : "S"} ${Math.abs(lo).toFixed(1)}°${lo >= 0 ? "E" : "W"}`;

// ---- reference coastline: the app's own basemap -------------------------------------
const topo = JSON.parse(readFileSync(BASEMAP, "utf8"));
const land = topoFeature(topo, topo.objects.countries);
console.log(`Reference coastline: Natural Earth 50m (${land.features.length} countries), grid ${GRID_DEG}°.`);
const reference = rasterise(land.features);
// A cell counts as coastal-adjacent if it or any 8-neighbour is land; era polygons may
// legitimately round outward by one cell where the two datasets digitised a coast apart.
const nearLand = new Set(reference);
for (const k of reference) {
  const [lo, la] = k.split(",").map(Number);
  for (let dx = -GRID_DEG; dx <= GRID_DEG; dx += GRID_DEG)
    for (let dy = -GRID_DEG; dy <= GRID_DEG; dy += GRID_DEG) nearLand.add(key(lo + dx, la + dy));
}
console.log(`${reference.size} land cells (${nearLand.size} incl. one-cell coastal tolerance).\n`);

const files = readdirSync(MAPS_DIR).filter((f) => f.endsWith(".geojson")).sort();
const failures = [];
for (const file of files) {
  const era = file.replace("world_", "").replace(".geojson", "");
  const geo = JSON.parse(readFileSync(resolve(MAPS_DIR, file), "utf8"));
  const claimed = rasterise(geo.features);
  const phantom = [...claimed].filter((k) => !nearLand.has(k) && !ALLOWED_CLAIMS.has(`${era}|${k}`));
  const groups = cluster(phantom).filter((g) => g.length >= MIN_CLUSTER);
  if (!groups.length) {
    console.log(`  ${era.padEnd(8)} ok  (${claimed.size} cells claimed, ${phantom.length} isolated off-coast)`);
    continue;
  }
  console.log(`  ${era.padEnd(8)} ⚠  (${claimed.size} cells claimed)`);
  for (const g of groups) {
    failures.push(
      `world_${era}: ${g.length} contiguous cells centred near ${fmt(centre(g))} are claimed as land ` +
        `but are OPEN SEA in the Natural Earth basemap — this polygon was drawn past the coastline`,
    );
  }
}

if (failures.length) {
  console.error(`\n✗ era coastline check FAILED — ${failures.length} problem(s):\n`);
  for (const f of failures) console.error(`  • ${f}`);
  console.error(
    "\nA coastline is the same in every era. Restore the polity's geometry from the authoritative\n" +
      "upstream file (node scripts/restore-era-geometry.mjs) instead of redrawing it, and never\n" +
      "hand-write a polygon. Do not raise MIN_CLUSTER to make this pass.",
  );
  process.exit(1);
}
console.log("\n✓ era coastline check passed — no era polygon reaches past the coast.");
