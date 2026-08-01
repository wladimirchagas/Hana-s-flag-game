// Coverage tracker for the Learn-mode HISTORICAL ERAS sweep.
//
// Every era except "Today" renders a hand-curated GeoJSON from
// aourednik/historical-basemaps (public/historical-maps/*.geojson). Each
// feature's NAME is what the user clicks; the panel + the "Flags of this era"
// grid are filled from POLITY_REGISTRY / MODERN_NAME_ALIASES / ERA_OVERRIDES in
// src/lib/historicalEras.ts.
//
// A polity is "covered" when the app can show something real about it:
//   flag  — a curated historical-flag image, or an era-legal modern-flag
//           fallback (only 1914+ eras allow that — see
//           eraAllowsModernFlagFallback)
//   note  — the one-line editorial note under the name
//   pop   — the scholarly peak-population estimate
// A polity with NONE of the three renders as a bare name: no flag, no facts.
//
// Usage:
//   node scripts/historical-era-remaining.mjs            → per-era coverage table
//   node scripts/historical-era-remaining.mjs ad1500     → gaps for one era
//   node scripts/historical-era-remaining.mjs --gaps 25  → top-N gaps per era
//
// Area figures are geodesic (d3-geo geoArea, steradians) so the ranking is by
// how much of the map a gap actually occupies — a missing Abbasid Caliphate
// matters more than a missing city-state. Percentages are share of the era's
// total mapped area.
//
// Tracking aid for the sweep, NOT a build gate.

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { geoArea } from "d3-geo";

const __dirname = dirname(fileURLToPath(import.meta.url));
const R = (p) => resolve(__dirname, p);

const {
  ERAS,
  POLITY_REGISTRY,
  MODERN_NAME_ALIASES,
  polityInfo,
  polityModernName,
  eraAllowsModernFlagFallback,
  flagExistedInEra,
} = await import(R("../src/lib/historicalEras.ts"));

// Modern country names, for the 1914+ "NAME matches a modern country" fallback
// the app applies in LearnPage's selectionFromPolityName.
const selectionSrc = readFileSync(R("../src/lib/countrySelection.ts"), "utf8");
const MODERN_NAMES = new Set(
  [...selectionSrc.matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1].toLowerCase()),
);
/** lowercase country name → ISO alpha-2, for the era flag-adoption gate. */
const CODE_BY_NAME = new Map(
  [...selectionSrc.matchAll(/code:\s*"([A-Z]{2})",\s*name:\s*"([^"]+)"/g)].map((m) => [
    m[2].toLowerCase(),
    m[1],
  ]),
);

/** A modern flag may stand in only if it already existed at the era's date. */
function eraLegalModern(modernName, eraId) {
  const code = CODE_BY_NAME.get(modernName.toLowerCase());
  return code != null && flagExistedInEra(code, eraId) ? "modern" : null;
}

/**
 * Mirrors LearnPage's flag resolution: curated → alias/modern (era-gated) →
 * the dataset's SUBJECTO ruler (era-gated).
 */
function resolveFlag(name, eraId, rulers) {
  const info = polityInfo(name, eraId);
  if (info.flag) return "curated";
  if (info.noFlag) return null; // deliberate, sourced "this polity had no flag"
  const allowFallback = eraAllowsModernFlagFallback(eraId);
  const modernName =
    polityModernName(name, eraId) ??
    (allowFallback && MODERN_NAMES.has(name.toLowerCase()) ? name : null);
  if (modernName) {
    const aliasInfo = polityInfo(modernName, eraId);
    if (aliasInfo.flag) return "curated";
    const legal = eraLegalModern(modernName, eraId);
    if (legal) return legal;
  }
  const ruler = rulers?.get(name);
  if (ruler && ruler !== name) {
    const rulerInfo = polityInfo(ruler, eraId);
    if (rulerInfo.flag) return "ruler";
    const legal = eraLegalModern(polityModernName(ruler, eraId) ?? ruler, eraId);
    if (legal) return "ruler";
  }
  return null;
}

const args = process.argv.slice(2);
const gapsIdx = args.indexOf("--gaps");
const gapLimit = gapsIdx >= 0 ? Number(args[gapsIdx + 1] ?? 15) : 0;
const onlyEra = args.find((a) => !a.startsWith("--") && a !== String(gapLimit));

const rows = [];
const gapsByEra = new Map();

for (const era of ERAS) {
  if (!era.dataUrl) continue; // "Today" uses the modern world-atlas path
  if (onlyEra && era.id !== onlyEra) continue;
  const geo = JSON.parse(readFileSync(R(`../public/${era.dataUrl}`), "utf8"));

  const byName = new Map();
  const rulers = new Map();
  let unnamedArea = 0;
  let unnamedFeatures = 0;
  for (const feature of geo.features) {
    const name = feature.properties?.NAME ?? null;
    const ruler = feature.properties?.SUBJECTO ?? null;
    if (name && ruler && ruler !== name) rulers.set(name, ruler);
    let area = 0;
    try {
      area = geoArea(feature);
    } catch {
      area = 0;
    }
    if (!name) {
      unnamedArea += area;
      unnamedFeatures++;
      continue;
    }
    const entry = byName.get(name) ?? { area: 0, features: 0 };
    entry.area += area;
    entry.features++;
    byName.set(name, entry);
  }

  const totalArea = [...byName.values()].reduce((s, v) => s + v.area, 0) + unnamedArea;
  const pct = (x) => (totalArea > 0 ? `${((100 * x) / totalArea).toFixed(0)}%` : "—");

  let flagCount = 0, noteCount = 0, popCount = 0, bareCount = 0;
  let flagArea = 0, noteArea = 0, bareArea = 0;
  const gaps = [];
  for (const [name, v] of byName) {
    const info = polityInfo(name, era.id);
    const flag = resolveFlag(name, era.id, rulers);
    const note = Boolean(info.note);
    const pop = typeof info.population === "number";
    if (flag) { flagCount++; flagArea += v.area; }
    if (note) { noteCount++; noteArea += v.area; }
    if (pop) popCount++;
    const bare = !flag && !note && !pop;
    if (bare) { bareCount++; bareArea += v.area; }
    if (!flag || !note || !pop) {
      gaps.push({ name, area: v.area, flag: Boolean(flag), note, pop, noFlag: Boolean(info.noFlag) });
    }
  }
  gaps.sort((a, b) => b.area - a.area);
  gapsByEra.set(era.id, gaps);

  rows.push({
    era: era.id,
    label: era.label,
    polities: byName.size,
    flag: `${flagCount} (${pct(flagArea)})`,
    note: `${noteCount} (${pct(noteArea)})`,
    pop: popCount,
    "bare name only": `${bareCount} (${pct(bareArea)})`,
    "unnamed feats": `${unnamedFeatures} (${pct(unnamedArea)})`,
  });
}

console.log(
  "Historical-era coverage — counts are polities; (%) is share of the era's mapped area.\n" +
    "A 'bare name only' polity shows no flag, no note and no population when clicked.\n",
);
console.table(rows);

const totals = rows.reduce(
  (acc, r) => {
    acc.polities += r.polities;
    acc.bare += Number(r["bare name only"].split(" ")[0]);
    return acc;
  },
  { polities: 0, bare: 0 },
);
console.log(
  `registry entries: ${POLITY_REGISTRY.size} + ${MODERN_NAME_ALIASES.size} aliases | ` +
    `polity slots across eras: ${totals.polities} | bare (no flag/note/pop): ${totals.bare}`,
);

if (gapLimit > 0) {
  for (const [eraId, gaps] of gapsByEra) {
    const top = gaps.slice(0, gapLimit);
    if (top.length === 0) continue;
    console.log(`\n== ${eraId}: top ${top.length} gaps by mapped area ==`);
    for (const g of top) {
      const missing = [
        g.flag ? null : g.noFlag ? "no flag (deliberate)" : "NO FLAG",
        g.note ? null : "no note",
        g.pop ? null : "no population",
      ].filter(Boolean);
      console.log(`  ${g.name.padEnd(44)} ${missing.join(", ")}`);
    }
  }
}
