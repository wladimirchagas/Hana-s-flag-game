// One-off restore pass for the Learn-mode historical era maps.
//
// WHY THIS EXISTS
// ---------------
// A batch of changes to public/historical-maps/*.geojson (#894–#902) set out to make
// historical borders period-accurate. Making a border period-accurate is legitimate.
// REDRAWING THE COASTLINE IS NOT — a landmass ends where the ocean begins, and that
// boundary is the same in 1600 as it is today. Those changes did both, and the
// coastline damage shipped:
//
//   * world_1600 "Spain"    — real geometry (175 vertices, 490,444 km²) was replaced
//     by a hand-drawn 8-vertex octagon covering 815,863 km², +66% too big, spilling
//     across the Pyrenees and into the Bay of Biscay.
//   * world_1600 "Portugal" — replaced by a hand-drawn 6-vertex box, 93,135 → 169,000
//     km², +81% too big. Together these are the rectangular block the owner reported.
//   * world_1600 "Sicily", "Sardinia", "Đại Việt" — deleted outright. The islands and
//     the whole of Vietnam rendered as open ocean.
//   * world_1700 "Korea" — main peninsula ring simplified from 765 to 296 points.
//   * a dozen more polities (Denmark-Norway, Sweden, Tsardom of Muscovy, Blackfoot,
//     Andean hunter-gatherers, central Asian khanates, …) had rings silently
//     resampled or dropped by the same "merge fragmented territories" pass.
//
// Inventing a coastline is the geographic twin of inventing a flag SVG or a
// population figure: a plausible-looking wrong answer, which the repo's hard rules
// forbid everywhere else. This script restores the authoritative upstream geometry.
//
// WHAT IT DOES
// ------------
// For every NAMED polity in every era file it compares the current ring set against
// the pre-damage baseline (git commit BASELINE_REF, the last commit to touch the map
// files before the batch above) and, where they differ, restores the baseline rings.
//
// It deliberately PRESERVES the two genuine improvements from that batch:
//   * one feature per polity — a polity whose parts were split across several
//     features stays merged into a single MultiPolygon;
//   * duplicate and degenerate rings stay dropped (a duplicated ring double-counts
//     area; a ring with < 4 positions or zero area encloses nothing).
// Rings are compared canonically — rotation-, direction- and precision-independent —
// so a pure re-serialisation is correctly seen as "no change" and is left alone.
//
// It never moves a coordinate and never invents one. Every coordinate it writes comes
// from the baseline file, i.e. from upstream.
//
// Usage:
//   node scripts/restore-era-geometry.mjs --check    → report, exit 1 if any drift
//   node scripts/restore-era-geometry.mjs            → rewrite the affected files

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { geoArea } from "d3-geo";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(__dirname, "..");
const MAPS_DIR = resolve(REPO, "public/historical-maps");
const REL = "public/historical-maps";

/**
 * The commit the era maps were imported at — the last to touch them before the
 * coastline damage (#894–#902).
 *
 * DO NOT MOVE THIS TO MAKE A FAILING CHECK PASS. This is the single loophole most
 * likely to be reached for, and doing so is a violation of the "a landmass's outline
 * does not change" hard rule in CLAUDE.md. The baseline records what was IMPORTED; it
 * is not a checkpoint to advance when the data drifts. A failing check means the
 * geometry is wrong — run this script without --check and the drift is undone.
 *
 * It moves for exactly one reason: an owner-approved re-import from a named,
 * authoritative, dated source, whose every affected era has been visually verified in
 * the running app first. See CLAUDE.md for the full gate.
 */
const BASELINE_REF = "5eed8d5";

const checkOnly = process.argv.includes("--check");

const nameOf = (f) => (f.properties?.NAME ?? f.properties?.name ?? "").trim();

/** Planar shoelace area — enough to spot a ring that encloses nothing. */
function planarArea(ring) {
  let sum = 0;
  for (let i = 0, n = ring.length; i < n; i++) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[(i + 1) % n];
    sum += x1 * y2 - x2 * y1;
  }
  return Math.abs(sum) / 2;
}

/** A ring that carries no territory: too few positions, or zero enclosed area. */
function isDegenerate(ring) {
  if (!Array.isArray(ring) || ring.length < 4) return true;
  const distinct = new Set(ring.map(([x, y]) => `${x},${y}`));
  if (distinct.size < 3) return true;
  return planarArea(ring) < 1e-12;
}

/**
 * Canonical key for a ring: the md5 of its SORTED position multiset. Sorting makes
 * the key independent of start vertex, winding direction and serialisation, so two
 * encodings of the same boundary compare equal — while two genuinely different
 * boundaries sharing an identical position multiset is not a case that occurs.
 * (A rotation-normalised key would be exact but is O(n²) on 2,000-point rings.)
 */
function ringKey(ring) {
  const pts = ring.slice(0, -1).map(([x, y]) => `${(+x).toFixed(6)},${(+y).toFixed(6)}`);
  if (!pts.length) return "";
  return createHash("md5").update(pts.sort().join(" ")).digest("hex");
}

/** All polygons of every feature with this NAME, with degenerate/duplicate rings dropped. */
function polygonsFor(geo, name) {
  const seen = new Set();
  const polys = [];
  for (const f of geo.features) {
    if (nameOf(f) !== name) continue;
    const g = f.geometry;
    if (!g) continue;
    const list = g.type === "Polygon" ? [g.coordinates] : g.type === "MultiPolygon" ? g.coordinates : [];
    for (const poly of list) {
      const kept = [];
      for (const ring of poly) {
        if (isDegenerate(ring)) continue;
        const k = ringKey(ring);
        if (seen.has(k)) continue;
        seen.add(k);
        kept.push(ring);
      }
      if (kept.length) polys.push(kept);
    }
  }
  return polys;
}

const keySetOf = (polys) => new Set(polys.flat().map(ringKey));
const sameGeometry = (a, b) => {
  const ka = keySetOf(a), kb = keySetOf(b);
  if (ka.size !== kb.size) return false;
  for (const k of ka) if (!kb.has(k)) return false;
  return true;
};

function areaKm2(polys) {
  if (!polys.length) return 0;
  try {
    return geoArea({ type: "Feature", geometry: { type: "MultiPolygon", coordinates: polys }, properties: {} }) * 6371 * 6371;
  } catch { return 0; }
}

const files = readdirSync(MAPS_DIR).filter((f) => f.endsWith(".geojson")).sort();
const findings = [];
let filesChanged = 0;

for (const file of files) {
  const curPath = resolve(MAPS_DIR, file);
  const cur = JSON.parse(readFileSync(curPath, "utf8"));

  let base;
  try {
    base = JSON.parse(execFileSync("git", ["show", `${BASELINE_REF}:${REL}/${file}`], {
      cwd: REPO, maxBuffer: 1 << 30, encoding: "utf8",
    }));
  } catch {
    continue; // file did not exist at the baseline — nothing to restore against
  }

  // ---- unnamed features -------------------------------------------------------
  // The upstream files carry a few hundred unlabelled polygons (small islands,
  // Greenland, …). They have no NAME to key on, but their property signatures are an
  // identical multiset on both sides and are almost all null, so the whole group can
  // be restored wholesale — per feature, never merged, since they are unrelated
  // landmasses that must stay individually selectable.
  const isUnnamed = (f) => { const n = nameOf(f); return !n || n === "?"; };
  const baseUnnamed = base.features.filter(isUnnamed);
  const curUnnamed = cur.features.filter(isUnnamed);
  const unnamedRings = (feats) => {
    const s = new Set();
    for (const f of feats) {
      const g = f.geometry; if (!g) continue;
      const l = g.type === "Polygon" ? [g.coordinates] : g.type === "MultiPolygon" ? g.coordinates : [];
      for (const p of l) for (const r of p) if (!isDegenerate(r)) s.add(ringKey(r));
    }
    return s;
  };
  let restoreUnnamed = false;
  if (baseUnnamed.length) {
    const bk = unnamedRings(baseUnnamed), ck = unnamedRings(curUnnamed);
    if (bk.size !== ck.size || [...bk].some((k) => !ck.has(k))) restoreUnnamed = true;
  }

  const baseNames = [...new Set(base.features.map(nameOf))].filter((n) => n && n !== "?");
  const restore = new Map(); // name → baseline polygons

  for (const name of baseNames) {
    const bp = polygonsFor(base, name);
    const cp = polygonsFor(cur, name);
    if (!bp.length) continue;
    if (sameGeometry(bp, cp)) continue;
    restore.set(name, bp);
    const bA = areaKm2(bp), cA = areaKm2(cp);
    findings.push({
      file, name,
      baseV: bp.flat().reduce((n, r) => n + r.length, 0),
      curV: cp.flat().reduce((n, r) => n + r.length, 0),
      baseA: bA, curA: cA,
      missing: cp.length === 0,
    });
  }

  if (restoreUnnamed) {
    const bv = baseUnnamed.reduce((n, f) => n + JSON.stringify(f.geometry).split("],[").length, 0);
    findings.push({
      file, name: "(unlabelled polygons)", unnamed: true,
      baseV: bv, curV: bv, baseA: 0, curA: 0, missing: false,
      count: baseUnnamed.length,
    });
  }

  if (!restore.size && !restoreUnnamed) continue;
  filesChanged++;
  if (checkOnly) continue;

  // Rewrite: the first feature carrying a restored NAME keeps its properties and
  // receives the full baseline geometry; any further features with that NAME are
  // dropped (their rings are already folded into the MultiPolygon).
  const emitted = new Set();
  const out = [];
  for (const f of cur.features) {
    const name = nameOf(f);
    if (restoreUnnamed && isUnnamed(f)) continue; // replaced wholesale below
    if (!restore.has(name)) { out.push(f); continue; }
    if (emitted.has(name)) continue;
    emitted.add(name);
    const polys = restore.get(name);
    out.push({
      ...f,
      geometry: polys.length === 1
        ? { type: "Polygon", coordinates: polys[0] }
        : { type: "MultiPolygon", coordinates: polys },
    });
  }
  // Features deleted outright are re-added with their baseline properties.
  for (const [name, polys] of restore) {
    if (emitted.has(name)) continue;
    const src = base.features.find((f) => nameOf(f) === name);
    out.push({
      type: "Feature",
      properties: { ...src.properties },
      geometry: polys.length === 1
        ? { type: "Polygon", coordinates: polys[0] }
        : { type: "MultiPolygon", coordinates: polys },
    });
  }

  // Unlabelled polygons: restored one-for-one from the baseline, degenerate rings
  // dropped, keeping each as its own feature.
  if (restoreUnnamed) {
    for (const f of baseUnnamed) {
      const g = f.geometry;
      if (!g) continue;
      const list = g.type === "Polygon" ? [g.coordinates] : g.type === "MultiPolygon" ? g.coordinates : [];
      const polys = [];
      for (const poly of list) {
        const kept = poly.filter((r) => !isDegenerate(r));
        if (kept.length) polys.push(kept);
      }
      if (!polys.length) continue;
      out.push({
        type: "Feature",
        properties: { ...f.properties },
        geometry: polys.length === 1
          ? { type: "Polygon", coordinates: polys[0] }
          : { type: "MultiPolygon", coordinates: polys },
      });
    }
  }

  cur.features = out;
  writeFileSync(curPath, JSON.stringify(cur));
}

if (!findings.length) {
  console.log("Era geometry matches the authoritative baseline — nothing to restore.");
  process.exit(0);
}

console.log(`${checkOnly ? "DRIFT FROM BASELINE" : "RESTORED FROM BASELINE"} (${BASELINE_REF})\n`);
console.log("era     polity                          vertices        area km²                     ");
for (const f of findings.sort((a, b) => Math.abs(b.baseA - b.curA) - Math.abs(a.baseA - a.curA))) {
  const era = f.file.replace("world_", "").replace(".geojson", "");
  if (f.unnamed) {
    console.log(`${era.padEnd(8)}${f.name.padEnd(32)}${`${f.count} features`.padEnd(16)}rings rewritten upstream-exact`);
    continue;
  }
  const tag = f.missing ? "  ← had been DELETED" : "";
  console.log(
    `${era.padEnd(8)}${f.name.padEnd(32)}${`${f.curV}→${f.baseV}`.padEnd(16)}` +
    `${`${Math.round(f.curA).toLocaleString()}→${Math.round(f.baseA).toLocaleString()}`.padEnd(29)}${tag}`,
  );
}
console.log(`\n${findings.length} polities across ${filesChanged} era file(s).`);
if (checkOnly) {
  console.log("\nRun `node scripts/restore-era-geometry.mjs` to restore the upstream geometry.");
  process.exit(1);
}
