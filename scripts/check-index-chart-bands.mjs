#!/usr/bin/env node
/**
 * Index chart bands must always match the score — hard rule (see CLAUDE.md).
 *
 * The Learn-mode chart shades each index axis with its classification bands
 * ("Electoral Democracy", "Free", "60–69", …). A country must always sit inside
 * a band that names ITS OWN category. Owner report (2026-09): Brazil and
 * Malaysia are both V-Dem Electoral Democracies, but the chart put Malaysia
 * (0.35) in an "Electoral Autocracy" band, because V-Dem's category is not a
 * cut of its score and the chart used invented fixed cut-offs. Auditing every
 * index found 102 countries outside their own band, including decade bands
 * that ended at "69" so a 69.9 fell into a gap, and two indexes with no
 * matching bands at all (Soft Power fell through to HDI's; GTI had no
 * "No Impact" band).
 *
 * Fails the build when, for any index:
 *   • a country's score lies in no segment naming its rating;
 *   • a rating has no band at all;
 *   • the drawn segments leave a gap between their first and last edge;
 *   • DemocracyIndexChart stops drawing through democracyAxisBandSegments().
 *
 * Needs Node 22.18+ (imports .ts directly).
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dc = await import(resolve(root, "src/lib/democracyColors.ts"));
const { COUNTRY_FACTS } = await import(resolve(root, "src/data/countryFacts.ts"));

const failures = [];
let checked = 0;

for (const key of dc.DEMOCRACY_INDEX_KEYS) {
  const bands = dc.getDemocracyAxisBands(key);
  const segments = dc.democracyAxisBandSegments(bands);
  const labels = new Set(bands.map((b) => b.label));

  for (let i = 1; i < segments.length; i++) {
    if (segments[i].min !== segments[i - 1].max) {
      failures.push(
        `${key}: gap between "${segments[i - 1].label}" (ends ${segments[i - 1].max}) and "${segments[i].label}" (starts ${segments[i].min})`,
      );
    }
  }

  for (const [code, facts] of Object.entries(COUNTRY_FACTS)) {
    const idx = dc.getDemocracyIndexFor(facts.democracy, key);
    if (!idx || typeof idx.score !== "number") continue;
    checked++;
    if (!labels.has(idx.rating)) {
      failures.push(`${key}: ${code} is rated "${idx.rating}", which has no chart band`);
      continue;
    }
    const home = segments.some(
      (s) => s.min <= idx.score && idx.score <= s.max && s.categories.includes(idx.rating),
    );
    if (!home) {
      failures.push(
        `${key}: ${code} is "${idx.rating}" at ${idx.score}, but no band naming it covers that score`,
      );
    }
  }
}

const chart = readFileSync(resolve(root, "src/components/DemocracyIndexChart.tsx"), "utf8");
if (!chart.includes("democracyAxisBandSegments(")) {
  failures.push(
    "DemocracyIndexChart.tsx no longer draws bands through democracyAxisBandSegments() — overlapping V-Dem / Freedom House bands would render wrongly",
  );
}

if (failures.length) {
  console.error(`✗ index chart bands: ${failures.length} problem(s)`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(
  `✓ index chart bands: ${checked} country scores across ${dc.DEMOCRACY_INDEX_KEYS.length} indexes each sit inside a band naming their own category`,
);
