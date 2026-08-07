// A polity's continent is WHERE ITS LAND IS — never who ruled it, and never "Other".
//
// The Learn-mode flag grid groups an era's polities by continent, via `polityContinent()`
// in src/lib/historicalEras.ts. Two ways that went wrong, both reported by the owner with
// screenshots on 2026-08:
//
//   1. WRONG CONTINENT. The continent used to fall back to the country the polity borrows
//      its FLAG from. For a colony routed to its ruling power ("Togoland" → German Empire)
//      that imported the RULER's continent, so the 1914 grid's EUROPE group held Togoland,
//      Kamerun, German South-West Africa, German East Africa, Anglo-Egyptian Sudan,
//      British East Africa, Southern Rhodesia and Spanish Morocco. ("togoland is not in
//      europe. that's a massive issue!")
//
//   2. "OTHER". A polity with no region label, or one whose label `topLevelContinent()`
//      did not recognise, fell into an "Other" heading — an "OTHER (27)" group holding
//      Lagos, Accra, Zululand, Dahomey, Queensland, New South Wales, Fiji, Tonga,
//      Greenland and British Guiana. Every territory is on a continent; "Other" is a
//      classification failure, not a category, and is banned outright.
//
// This check answers the question from the geometry, which cannot be argued with: for
// every polity in every era it works out how the polity's own land splits across the
// continents, and fails if the app files it somewhere that land is not — or nowhere.
//
// The bar for (1) is deliberately "no land there at all", not "most of its land": a
// composite state legitimately spanning continents (the Russian Empire, Denmark with
// Greenland, the Ottomans) may be filed under any continent it actually reaches.
//
// Usage:
//   node scripts/check-era-continents.mjs           → check every era (exit 1 on failure)
//   node scripts/check-era-continents.mjs --report  → print every polity's land split
//   node scripts/check-era-continents.mjs ad1914    → one era

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { continentSplit, polityRings } from "./lib/polity-geography.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const R = (p) => resolve(__dirname, p);

const { ERAS, eraYear, polityContinent, polityDisplayName } = await import(
  R("../src/lib/historicalEras.ts")
);
const { topLevelContinent } = await import(R("../src/lib/flagList.ts"));

/**
 * Some registry labels name a region that genuinely straddles continents, and the grid has
 * to pick ONE heading for it. Those labels are satisfied by land on ANY of the continents
 * they span — the Scythians really are on both sides of the Europe/Asia line, and filing
 * them under either is honest. Every other label must hold land itself.
 *
 * This is not an exemption list for wrong data: a label only belongs here when the region
 * it names is genuinely transcontinental. "Eurasian Steppe" is; "Africa" never will be.
 */
function acceptableContinents(label) {
  const l = (label ?? "").toLowerCase();
  const top = topLevelContinent(label);
  if (top === "Global") return null; // matches anything, by design
  if (l.includes("eurasia")) return new Set(["Europe", "Asia"]);
  if (l.includes("mediterranean")) return new Set(["Europe", "Africa", "Asia"]);
  return new Set([top]);
}

const args = process.argv.slice(2);
const report = args.includes("--report");
const onlyEra = args.find((a) => !a.startsWith("--"));

const wrongContinent = [];
const unclassified = [];
let checked = 0;

for (const era of ERAS) {
  if (!era.dataUrl) continue;
  if (onlyEra && era.id !== onlyEra) continue;
  const geo = JSON.parse(readFileSync(R(`../public/${era.dataUrl}`), "utf8"));

  const rows = [];
  for (const [rawName, rings] of polityRings(geo)) {
    const split = continentSplit(rings);
    if (split.length === 0) continue; // no measurable land — nothing to check against
    checked += 1;
    const label = polityContinent(rawName, era.id);
    const top = topLevelContinent(label);
    const row = {
      era: era.id,
      raw: rawName,
      shown: polityDisplayName(rawName, era.id),
      label,
      top,
      split,
    };
    rows.push(row);

    if (!label || top === "Other") {
      unclassified.push(row);
      continue;
    }
    const ok = acceptableContinents(label);
    if (ok && !split.some((s) => ok.has(s.continent))) wrongContinent.push(row);
  }

  if (report) {
    console.log(`\n=== ${era.id} (${eraYear(era.id)}) — ${rows.length} polities ===`);
    for (const r of rows.sort((a, b) => a.shown.localeCompare(b.shown))) {
      const split = r.split.map((s) => `${s.continent} ${(100 * s.share).toFixed(0)}%`).join(", ");
      console.log(
        `  ${r.shown.slice(0, 34).padEnd(34)} ${String(r.top).padEnd(9)} (${String(r.label ?? "—").slice(0, 26).padEnd(26)})  land: ${split}`,
      );
    }
  }
}

console.log(
  `\ncheck-era-continents: ${checked} polity/era rows — ${wrongContinent.length} on a continent they have no land on, ${unclassified.length} unclassified.`,
);

let failed = false;

if (wrongContinent.length) {
  failed = true;
  console.error("\nWRONG CONTINENT — the grid files these away from their own land:\n");
  for (const f of wrongContinent) {
    const split = f.split.map((s) => `${s.continent} ${(100 * s.share).toFixed(0)}%`).join(", ");
    console.error(
      `  ${f.era}  ${f.shown.padEnd(34)} shown as ${f.top.padEnd(9)} (${String(f.label).padEnd(26)}) — its land is ${split}`,
    );
  }
  console.error(
    "\nA polity's continent is where its land is. Correct its `continent` in\n" +
      "POLITY_REGISTRY / ERA_OVERRIDES — never let it inherit one from the power that\n" +
      "ruled it, and never redraw the map to match a label.",
  );
}

if (unclassified.length) {
  failed = true;
  console.error('\n"OTHER" IS BANNED — every one of these is on a real continent:\n');
  for (const f of unclassified) {
    console.error(
      `  ${f.era}  ${f.shown.padEnd(34)} label ${String(f.label ?? "(none)").padEnd(26)} — its land is ${f.split[0].continent}`,
    );
  }
  console.error(
    "\nEither the region label is one topLevelContinent() does not recognise (give it a\n" +
      "home in classifyRegion() in src/lib/flagList.ts), or the polity has no label at all\n" +
      "(re-run `node scripts/build-polity-continents.mjs`, which measures it from the\n" +
      "polity's own polygons).",
  );
}

if (failed) {
  console.error('\nSee CLAUDE.md, "A polity\'s continent is where its land is".');
  process.exit(1);
}

console.log(
  "check-era-continents: OK — every polity is filed on a real continent its own land is on.",
);
