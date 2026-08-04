// Fills POLITY-ATTRIBUTION gaps in the era maps from the authoritative upstream release.
//
// WHY THIS EXISTS
// ---------------
// The era files are an import of aourednik/historical-basemaps. Our import is an older,
// finer-grained variant: it names more polities than the current upstream release
// (bc500 has "Athens", "Thebes", "Sparta + Corinth", "Macedon + Thracian cities",
// "Epirote tribes" where upstream now carries one "Greek city-states"), but its coverage
// has HOLES — land no feature attributes to anyone.
//
// Those holes are a real defect, and one of them shipped visibly: in 500 BC an
// uncovered band ran from the Adriatic to the Black Sea across the southern Balkans,
// which (before the coastline layer was added) rendered as open sea and made GREECE
// LOOK LIKE AN ISLAND. The band exists because upstream cut the coarse "unmapped land"
// blob back to ~42°N to make room for the Greek polities, but those polities are small,
// high-resolution shapes that do not fill the space cut for them.
//
// WHAT THIS DOES — AND THE ONE THING IT NEVER DOES
// ------------------------------------------------
// For each era it compares our coverage against the CURRENT upstream release and, where
// upstream attributes land that we leave unattributed, it adopts upstream's feature
// **VERBATIM** — every coordinate exactly as upstream publishes it.
//
// It NEVER derives, clips, unions, simplifies, interpolates or invents geometry. There
// is no boolean operation anywhere in this script. An adopted polygon is a byte-for-byte
// copy of an authoritative source's polygon, which is why this is a SOURCED border
// change and not a redrawn one (see the hard rule in CLAUDE.md).
//
// Adopted features are tagged `GAPFILL: 1` and always paint UNDERNEATH the era's own
// polities, so a coarse upstream blob can never steal attribution from the finer polity
// our import already names. Provenance — source URL, upstream content hash, fetch date,
// and the cells each adoption covers — is written to scripts/data/era-gap-fill.json so
// every adopted polygon can be traced to the exact file it came from.
//
// Usage:
//   node scripts/build-era-gap-fill.mjs --dry-run   → report what would be adopted
//   node scripts/build-era-gap-fill.mjs             → apply and rewrite the era files

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { geoContains } from "d3-geo";
import { feature as topoFeature } from "topojson-client";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(__dirname, "..");
const MAPS_DIR = resolve(REPO, "public/historical-maps");
const BASEMAP = resolve(REPO, "public/countries-50m.json");
const CACHE = resolve(REPO, "scripts/data/upstream-eras");
const PROVENANCE = resolve(REPO, "scripts/data/era-gap-fill.json");

/** The authoritative upstream release these maps are imported from. */
const UPSTREAM = "https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson";

const dryRun = process.argv.includes("--dry-run");

/** Raster resolution — same grid the coastline check uses. */
const G = 0.5;
/**
 * An upstream feature is adopted only if it attributes at least this many cells that we
 * leave unattributed. Below this the "gap" is a sliver along a shared border where the
 * two files digitised the same line slightly differently — adopting a whole polygon to
 * cover a two-cell sliver would change attribution far beyond the gap.
 */
const MIN_GAP_CELLS = 8;

const key = (a, b) => `${a.toFixed(2)},${b.toFixed(2)}`;
const snap = (v) => Math.floor(v / G) * G;
const nameOf = (f) => (f.properties?.NAME ?? "").trim();

function bboxOf(g) {
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  JSON.stringify(g.coordinates).replace(/\[(-?[\d.eE+-]+),(-?[\d.eE+-]+)\]/g, (m, a, b) => {
    a = +a; b = +b;
    if (a < x0) x0 = a; if (a > x1) x1 = a; if (b < y0) y0 = b; if (b > y1) y1 = b;
    return m;
  });
  return [x0, y0, x1, y1];
}

/** Cells covered by a set of features. */
function rasterise(feats) {
  const L = new Set();
  for (const f of feats) {
    if (!f.geometry) continue;
    const [x0, y0, x1, y1] = bboxOf(f.geometry);
    if (!Number.isFinite(x0)) continue;
    for (let la = Math.max(snap(y0), -58); la <= Math.min(y1, 80); la += G) {
      const cy = la + G / 2; if (cy < y0 || cy > y1) continue;
      for (let lo = Math.max(snap(x0), -180); lo <= Math.min(x1, 180); lo += G) {
        const cx = lo + G / 2; if (cx < x0 || cx > x1) continue;
        const k = key(lo, la); if (L.has(k)) continue;
        if (geoContains(f, [cx, cy])) L.add(k);
      }
    }
  }
  return L;
}

/** Cells of `cells` that this one feature covers. */
function cellsCovered(f, cells) {
  const out = [];
  if (!f.geometry) return out;
  const [x0, y0, x1, y1] = bboxOf(f.geometry);
  if (!Number.isFinite(x0)) return out;
  for (const k of cells) {
    const [lo, la] = k.split(",").map(Number);
    const cx = lo + G / 2, cy = la + G / 2;
    if (cx < x0 || cx > x1 || cy < y0 || cy > y1) continue;
    if (geoContains(f, [cx, cy])) out.push(k);
  }
  return out;
}

async function upstreamFile(name) {
  mkdirSync(CACHE, { recursive: true });
  const local = resolve(CACHE, name);
  if (existsSync(local)) return readFileSync(local, "utf8");
  const res = await fetch(`${UPSTREAM}/${name}`);
  if (!res.ok) throw new Error(`upstream ${name}: HTTP ${res.status}`);
  const text = await res.text();
  writeFileSync(local, text);
  return text;
}

// ---- reference land -----------------------------------------------------------------
const topo = JSON.parse(readFileSync(BASEMAP, "utf8"));
const land = rasterise(topoFeature(topo, topo.objects.countries).features);
console.log(`Reference land: ${land.size} cells at ${G}°.\n`);

const files = readdirSync(MAPS_DIR).filter((f) => f.endsWith(".geojson")).sort();
const provenance = { generated: new Date().toISOString().slice(0, 10), upstream: UPSTREAM, eras: {} };
let totalAdopted = 0;

for (const file of files) {
  const era = file.replace("world_", "").replace(".geojson", "");
  const ourPath = resolve(MAPS_DIR, file);
  const ours = JSON.parse(readFileSync(ourPath, "utf8"));

  let upText;
  try { upText = await upstreamFile(file); }
  catch (e) { console.log(`  ${era.padEnd(8)} — upstream unavailable (${e.message})`); continue; }
  const up = JSON.parse(upText);
  const hash = createHash("sha256").update(upText).digest("hex").slice(0, 16);

  // Land we leave unattributed. Only real land counts — a gap over sea is not a gap.
  const covered = rasterise(ours.features.filter((f) => !f.properties?.GAPFILL));
  const gaps = new Set([...land].filter((k) => !covered.has(k)));
  if (!gaps.size) { console.log(`  ${era.padEnd(8)} no gaps`); continue; }

  // Which upstream features attribute that land?
  const adopted = [];
  const remaining = new Set(gaps);
  // Largest-first, so one broad upstream polity closes a whole region in one adoption
  // rather than a dozen slivers each pulling in another polygon.
  const upSorted = [...up.features].sort(
    (a, b) => (bboxOf(b.geometry ?? { coordinates: [] })[2] - bboxOf(b.geometry ?? { coordinates: [] })[0]) -
              (bboxOf(a.geometry ?? { coordinates: [] })[2] - bboxOf(a.geometry ?? { coordinates: [] })[0]),
  );
  for (const uf of upSorted) {
    if (!remaining.size) break;
    const name = nameOf(uf);
    if (!name) continue; // unnamed upstream blobs add no attribution
    const hit = cellsCovered(uf, remaining);
    if (hit.length < MIN_GAP_CELLS) continue;
    for (const k of hit) remaining.delete(k);
    adopted.push({ name, cells: hit.length });
    ours.features.push({
      type: "Feature",
      properties: { ...uf.properties, NAME: name, GAPFILL: 1 },
      geometry: uf.geometry, // VERBATIM — never derived
    });
  }

  if (!adopted.length) { console.log(`  ${era.padEnd(8)} ${gaps.size} gap cells, nothing upstream attributes`); continue; }
  totalAdopted += adopted.length;
  const closed = gaps.size - remaining.size;
  console.log(
    `  ${era.padEnd(8)} ${String(gaps.size).padStart(5)} gap cells → closed ${String(closed).padStart(5)}` +
    `  by ${adopted.length} upstream polit${adopted.length === 1 ? "y" : "ies"}: ` +
    adopted.slice(0, 4).map((a) => `${a.name} (${a.cells})`).join(", ") + (adopted.length > 4 ? " …" : ""),
  );
  provenance.eras[era] = { source: `${UPSTREAM}/${file}`, sha256_16: hash, gapCells: gaps.size, closed, adopted };

  if (!dryRun) writeFileSync(ourPath, JSON.stringify(ours));
}

if (!dryRun) {
  writeFileSync(PROVENANCE, JSON.stringify(provenance, null, 2) + "\n");
  console.log(`\nWrote provenance for ${totalAdopted} adopted polities → scripts/data/era-gap-fill.json`);
} else {
  console.log(`\nDry run — ${totalAdopted} polities would be adopted. Re-run without --dry-run to apply.`);
}
