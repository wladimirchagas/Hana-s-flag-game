#!/usr/bin/env node
/**
 * Validate bundled Democracy Perception Index figures against the sourced
 * extract in scripts/data/dpi2026Data.mjs (DPI 2026 Country Appendix).
 *
 * Usage:
 *   node scripts/check-dpi-data.mjs
 *
 * Fails if countryFacts.ts / democracyData.mjs drift from the extract, if a
 * tier does not match the Index Score, or if ranks are not competition-ranked.
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import { DPI_2026_DATA, dpiTierFromScore } from "./data/dpi2026Data.mjs";
import { DEMOCRACY_DATA } from "./data/democracyData.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const factsSrc = readFileSync(resolve(ROOT, "src/data/countryFacts.ts"), "utf8");
const factsBody = factsSrc
  .replace(/^[\s\S]*?export const COUNTRY_FACTS[^=]*=\s*/, "const COUNTRY_FACTS = ")
  .replace(/as const;\s*$/, ";")
  .replace(/:\s*Readonly<Record<string, CountryFacts>>/, "");
const start = factsBody.indexOf("const COUNTRY_FACTS");
const cleaned = factsBody.slice(start).replace(/,\s*\n\};/, "\n};");
const COUNTRY_FACTS = Function(`${cleaned}\nreturn COUNTRY_FACTS;`)();

let failures = 0;
function fail(msg) {
  console.error("FAIL:", msg);
  failures++;
}

const extractCodes = Object.keys(DPI_2026_DATA).sort();
assert.equal(extractCodes.length, 96, "DPI 2026 covers 96 of the game’s UN members (98 surveyed − Taiwan − Puerto Rico)");

for (const code of extractCodes) {
  const src = DPI_2026_DATA[code];
  const demo = DEMOCRACY_DATA[code]?.perception;
  const facts = COUNTRY_FACTS[code]?.democracy?.perception;
  if (!demo) {
    fail(`${code}: missing from DEMOCRACY_DATA`);
    continue;
  }
  if (!facts) {
    fail(`${code}: missing from COUNTRY_FACTS`);
    continue;
  }
  for (const key of ["year", "rating", "rank", "score"]) {
    if (demo[key] !== src[key]) fail(`${code}: democracyData.${key}=${demo[key]} ≠ extract ${src[key]}`);
    if (facts[key] !== src[key]) fail(`${code}: countryFacts.${key}=${facts[key]} ≠ extract ${src[key]}`);
  }
  if (dpiTierFromScore(src.score) !== src.rating) {
    fail(`${code}: rating ${src.rating} does not match score ${src.score}`);
  }
}

for (const [code, entry] of Object.entries(DEMOCRACY_DATA)) {
  if (entry.perception && !DPI_2026_DATA[code]) {
    fail(`${code}: democracyData has perception but extract does not`);
  }
}
for (const [code, entry] of Object.entries(COUNTRY_FACTS)) {
  if (entry.democracy?.perception && !DPI_2026_DATA[code]) {
    fail(`${code}: countryFacts has perception but extract does not`);
  }
}

// Competition ranking on Index Score (higher score = better rank).
const byScore = Object.entries(DPI_2026_DATA).sort((a, b) => {
  if (b[1].score !== a[1].score) return b[1].score - a[1].score;
  return a[0].localeCompare(b[0]);
});
let expectedRank = 1;
let i = 0;
while (i < byScore.length) {
  const score = byScore[i][1].score;
  let j = i;
  while (j < byScore.length && byScore[j][1].score === score) j++;
  for (let k = i; k < j; k++) {
    const [code, row] = byScore[k];
    if (row.rank !== expectedRank) {
      fail(`${code}: rank ${row.rank} ≠ competition rank ${expectedRank} for score ${score}`);
    }
  }
  expectedRank += j - i;
  i = j;
}

// Spot checks against the DPI 2026 Country Appendix / published highlights.
const SPOT = {
  SE: { score: 29, rating: "Very Positive", rank: 1 },
  NO: { score: 23, rating: "Very Positive", rank: 2 },
  IN: { score: 15, rating: "Very Positive", rank: 8 },
  CN: { score: 14, rating: "Positive", rank: 9 },
  US: { score: -1, rating: "Neutral", rank: 36 },
  FR: { score: -20, rating: "Very Negative", rank: 83 },
  KZ: { score: -31, rating: "Very Negative", rank: 96 },
  CD: { score: -5, rating: "Neutral", rank: 49 },
  PA: { score: -15, rating: "Very Negative", rank: 75 },
};
for (const [code, expect] of Object.entries(SPOT)) {
  const got = DPI_2026_DATA[code];
  if (!got) {
    fail(`spot ${code}: missing`);
    continue;
  }
  for (const key of Object.keys(expect)) {
    if (got[key] !== expect[key]) fail(`spot ${code}.${key}=${got[key]} ≠ ${expect[key]}`);
  }
}

// UI wiring must keep reading perception (or the shared DEMOCRACY_INDEX_KEYS
// list that includes it — DemocracyMapControl / DemocracyIndexChart iterate
// that list rather than duplicating each index literal).
const uiFiles = [
  ["src/lib/democracyColors.ts", "perception"],
  ["src/components/DemocracyMapControl.tsx", "getDemocracyIndexMenuGroups"],
  ["src/components/DemocracyIndexChart.tsx", "getDemocracyIndexMenuGroups"],
  ["src/components/EntitySummary.tsx", "perception"],
  ["src/components/FlagGrid.tsx", "perception"],
];
for (const [rel, needle] of uiFiles) {
  const src = readFileSync(resolve(ROOT, rel), "utf8");
  if (!src.includes(needle)) {
    fail(`${rel}: must reference ${needle}`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} DPI validation failure(s)`);
  process.exit(1);
}
console.log(`DPI validation OK — ${extractCodes.length} countries, spot checks passed`);
