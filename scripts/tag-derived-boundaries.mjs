// Tags era-map features whose INTERNAL borders are modern administrative lines.
//
// scripts/split-patchwork.py breaks upstream's lumped polygons (Hausa States, Maya
// city-states, Greek city-states, the Indian mahajanapadas, the Swahili coast, the
// Malay sultanates …) into one feature per real polity by intersecting them with
// **modern geoBoundaries ADM1 boundaries**. Splitting is right — a single "Maya
// city-states" blob is worse than Tikal, Calakmul and Copán as separate clickable
// polities — but the resulting lines are present-day province borders, and the map
// drew them exactly like a sourced historical border.
//
// This adds `"DERIVED": 1` to those features so the map can render them dashed and the
// panel can say the extent is approximate. It changes no geometry and no name; it only
// records how the boundary was produced. ~180 features across 8 eras.
//
// Run: node scripts/tag-derived-boundaries.mjs        (rewrites the era files)
//      node scripts/tag-derived-boundaries.mjs --check

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MAPS_DIR = resolve(__dirname, "../public/historical-maps");
const checkOnly = process.argv.includes("--check");

/** Parse the split definitions out of split-patchwork.py — the single source of truth. */
function derivedNamesByEra() {
  const src = readFileSync(resolve(__dirname, "split-patchwork.py"), "utf8");
  const blocks = [
    ...src.matchAll(/"name":\s*"([^"]+)",\s*"era_files":\s*\[([^\]]+)\][\s\S]*?"mapping":\s*\{([\s\S]*?)\n\s{4,8}\},/g),
  ];
  const byEra = new Map();
  for (const [, , eraList, mapping] of blocks) {
    const eras = [...eraList.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
    const names = new Set([...mapping.matchAll(/\(\s*"([^"]+)"/g)].map((m) => m[1]));
    for (const era of eras) {
      const set = byEra.get(era) ?? new Set();
      for (const n of names) set.add(n);
      byEra.set(era, set);
    }
  }
  return byEra;
}

const byEra = derivedNamesByEra();
let totalTagged = 0;
let pending = 0;

for (const [file, names] of byEra) {
  const path = join(MAPS_DIR, file);
  let geo;
  try {
    geo = JSON.parse(readFileSync(path, "utf8"));
  } catch {
    continue; // era no longer bundled
  }
  let tagged = 0;
  let already = 0;
  for (const feature of geo.features) {
    const name = feature.properties?.NAME;
    if (!name || !names.has(name)) continue;
    if (feature.properties.DERIVED === 1) { already++; continue; }
    feature.properties.DERIVED = 1;
    tagged++;
  }
  if (tagged > 0) {
    pending++;
    totalTagged += tagged;
    console.log(`  ${file}: tagged ${tagged} feature(s) with derived boundaries`);
    if (!checkOnly) writeFileSync(path, JSON.stringify(geo));
  } else if (already > 0) {
    console.log(`  ${file}: ${already} already tagged`);
  }
}

if (pending === 0) {
  console.log("✓ derived-boundary tags are up to date.");
  process.exit(0);
}
if (checkOnly) {
  console.error(`\n✗ ${totalTagged} feature(s) need tagging — run node scripts/tag-derived-boundaries.mjs`);
  process.exit(1);
}
console.log(`\n✓ tagged ${totalTagged} feature(s).`);
