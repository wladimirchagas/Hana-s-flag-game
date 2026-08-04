// Temporal-accuracy check for the Learn-mode historical era maps.
//
// WHY THIS EXISTS
// ---------------
// Every other era guard answers "is the geometry we ship the geometry upstream
// published?" — fidelity to the import. None of them asked the prior question: is the
// IMPORT right for its date? It is not always. The upstream dataset labels the 1945
// subcontinent "India", "Pakistan" and "Bangladesh" although partition was 1947 and
// Bangladesh 1971; it shows one undivided "Vietnam" in 1960 though the country was
// split at the 17th parallel from 1954; it puts "USSR" on the 1920 map two years before
// the union was founded.
//
// A polity on the wrong map is the temporal twin of an anachronistic flag — which this
// repo already gates with check-historical-flag-anachronism.mjs. This is the same idea
// applied to the polities themselves.
//
// HOW IT WORKS
// ------------
// For every era file it takes each polity's raw NAME, applies the era-specific display
// remap (POLITY_NAME_FOR_ERA — the labelling fix that costs no geometry), and checks the
// result against the sourced windows in src/data/polityExistence.ts.
//
// A polity outside its window FAILS unless it is disclosed in ERA_EXTENT_CAVEATS, which
// is the honest escape for cases we cannot fix: where the borders themselves are drawn
// for the wrong date, we do not invent the right ones — the panel says so instead.
//
// COVERAGE IS DELIBERATELY PARTIAL. Only polities present in POLITY_EXISTENCE are
// checked; a name absent from that table is unchecked, never assumed wrong. The table
// covers modern-era states, whose names are unambiguous and whose errors are glaring.
// Ancient polities have contested dates and obscure names that a name-keyed table cannot
// resolve safely — guessing at them would produce false failures, which would get the
// check weakened or deleted. Growing the table is how coverage grows.
//
// Usage: node scripts/check-era-anachronism.mjs   (npm run maps:check-anachronism)

import { readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MAPS_DIR = resolve(__dirname, "../public/historical-maps");

const { POLITY_EXISTENCE, ERA_EXTENT_CAVEATS } = await import(
  resolve(__dirname, "../src/data/polityExistence.ts")
);
const { polityDisplayName } = await import(resolve(__dirname, "../src/lib/historicalEras.ts"));

/** era file stem → the era id the app uses, and the year it represents. */
function eraIdAndYear(stem) {
  if (stem.startsWith("bc")) return [`bc${stem.slice(2)}`, -Number(stem.slice(2))];
  return [`ad${stem}`, Number(stem)];
}

const files = readdirSync(MAPS_DIR).filter((f) => f.endsWith(".geojson")).sort();
const failures = [];
const disclosed = [];
let checked = 0;

for (const file of files) {
  const stem = file.replace("world_", "").replace(".geojson", "");
  const [eraId, year] = eraIdAndYear(stem);
  const geo = JSON.parse(readFileSync(resolve(MAPS_DIR, file), "utf8"));

  const seen = new Set();
  for (const f of geo.features) {
    const raw = (f.properties?.NAME ?? "").trim();
    if (!raw || seen.has(raw)) continue;
    seen.add(raw);

    // The display remap is the no-geometry fix: if the panel already shows the
    // period-correct name, the map is not lying to the user.
    const shown = polityDisplayName(raw, eraId);
    const rec = POLITY_EXISTENCE.get(shown);
    if (!rec) continue; // not in the curated table — unchecked, not wrong
    checked++;

    const caveat = ERA_EXTENT_CAVEATS.get(`${eraId}|${raw}`);
    if (year < rec.from) {
      const msg =
        `${file}: "${shown}"${shown !== raw ? ` (dataset NAME "${raw}")` : ""} appears on the ` +
        `${year < 0 ? `${-year} BC` : year} map but did not exist until ${rec.from} — ${rec.note}`;
      if (caveat) disclosed.push(`${msg}\n      disclosed: ${caveat.actual}`);
      else failures.push(`${msg}\n      source: ${rec.source}`);
    } else if (year > rec.to) {
      const msg =
        `${file}: "${shown}"${shown !== raw ? ` (dataset NAME "${raw}")` : ""} appears on the ` +
        `${year} map but had ceased to exist by ${rec.to} — ${rec.note}`;
      if (caveat) disclosed.push(`${msg}\n      disclosed: ${caveat.actual}`);
      else failures.push(`${msg}\n      source: ${rec.source}`);
    }
  }
}

console.log(
  `Temporal check: ${checked} era/polity pair(s) matched against ${POLITY_EXISTENCE.size} ` +
  `sourced existence window(s).`,
);
if (disclosed.length) {
  console.log(`\n${disclosed.length} known anachronism(s), disclosed in the panel rather than silently shipped:`);
  for (const d of disclosed) console.log(`  • ${d}`);
}

if (failures.length) {
  console.error(`\n✗ era anachronism check FAILED — ${failures.length} undisclosed anachronism(s):\n`);
  for (const f of failures) console.error(`  • ${f}`);
  console.error(
    "\nFix by either:\n" +
      "  (a) adding an era-specific display remap to POLITY_NAME_FOR_ERA in src/lib/historicalEras.ts,\n" +
      "      when the territory is roughly right and only the NAME is wrong for the date — this is a\n" +
      "      labelling change and costs no geometry; or\n" +
      "  (b) adding an ERA_EXTENT_CAVEATS entry in src/data/polityExistence.ts, when the BORDERS are\n" +
      "      also wrong for the date, so the panel discloses it.\n" +
      "NEVER redraw the borders to match the date, and never delete a window to silence a failure —\n" +
      "an invented border is worse than a disclosed inaccuracy.",
  );
  process.exit(1);
}
console.log("\n✓ era anachronism check passed — no undisclosed anachronistic polity.");
