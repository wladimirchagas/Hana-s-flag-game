#!/usr/bin/env node
/**
 * Validate bundled Reuters Institute Digital News Report 2026 trust-in-news
 * data against the committed extract (scripts/data/dnr-trust-2026.csv /
 * scripts/data/dnr2026Data.mjs).
 *
 * Fails on: wrong rank/score/band, drift between democracyData.mjs and
 * countryFacts.ts, fabricating entries for Hong Kong / Taiwan, or UI wiring
 * dropping the index.
 *
 * Run: node scripts/check-dnr-trust.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DNR_2026_DATA, dnrTrustBand } from "./data/dnr2026Data.mjs";
import { DEMOCRACY_DATA } from "./data/democracyData.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSV = resolve(__dirname, "data/dnr-trust-2026.csv");
const FACTS_TS = resolve(__dirname, "../src/data/countryFacts.ts");

function loadFactsDigitalNews(src) {
  /** @type {Map<string, object>} */
  const out = new Map();
  const lineRe = /^  ([A-Z]{2}): (\{.*\}),$/gm;
  let m;
  while ((m = lineRe.exec(src))) {
    const code = m[1];
    const obj = JSON.parse(m[2]);
    const dn = obj.democracy?.digitalNews;
    if (dn) out.set(code, dn);
  }
  return out;
}

const csvLines = readFileSync(CSV, "utf8").trim().split(/\r?\n/).slice(1);
/** @type {Map<string, { score: number, rank: number, include: boolean }>} */
const fromCsv = new Map();
let skipped = 0;
for (const line of csvLines) {
  const [iso2, , scoreStr, rankStr, , , include] = line.split(",");
  const score = Number(scoreStr);
  const rank = Number(rankStr);
  const inc = include === "yes";
  fromCsv.set(iso2, { score, rank, include: inc });
  if (!inc) skipped++;
}

if (fromCsv.size !== 48) {
  console.error(`Expected 48 DNR CSV rows (all markets), got ${fromCsv.size}`);
  process.exit(1);
}
if (skipped !== 2) {
  console.error(`Expected exactly 2 skipped markets (HK, TW), got ${skipped}`);
  process.exit(1);
}

const errors = [];
const extractCodes = Object.keys(DNR_2026_DATA).sort();
if (extractCodes.length !== 46) {
  errors.push(`dnr2026Data has ${extractCodes.length} codes, expected 46`);
}

for (const [code, row] of fromCsv) {
  if (!row.include) {
    if (DNR_2026_DATA[code]) {
      errors.push(`${code}: skipped market must not be in dnr2026Data`);
    }
    if (DEMOCRACY_DATA[code]?.digitalNews) {
      errors.push(`${code}: skipped market must not have democracyData.digitalNews`);
    }
    continue;
  }
  const exp = {
    year: 2026,
    rating: dnrTrustBand(row.score),
    rank: row.rank,
    score: row.score,
  };
  const extract = DNR_2026_DATA[code];
  const demo = DEMOCRACY_DATA[code]?.digitalNews;
  if (!extract) errors.push(`${code}: missing from dnr2026Data`);
  else if (JSON.stringify(extract) !== JSON.stringify(exp)) {
    errors.push(
      `${code}: extract drift\n  got ${JSON.stringify(extract)}\n  exp ${JSON.stringify(exp)}`,
    );
  }
  if (!demo) errors.push(`${code}: missing digitalNews in democracyData`);
  else if (JSON.stringify(demo) !== JSON.stringify(exp)) {
    errors.push(
      `${code}: democracyData drift\n  got ${JSON.stringify(demo)}\n  exp ${JSON.stringify(exp)}`,
    );
  }
}

const factsDn = loadFactsDigitalNews(readFileSync(FACTS_TS, "utf8"));
for (const [code, row] of fromCsv) {
  if (!row.include) {
    if (factsDn.has(code)) errors.push(`${code}: skipped market in countryFacts`);
    continue;
  }
  const exp = {
    year: 2026,
    rating: dnrTrustBand(row.score),
    rank: row.rank,
    score: row.score,
  };
  const facts = factsDn.get(code);
  if (!facts) errors.push(`${code}: missing digitalNews in countryFacts`);
  else if (JSON.stringify(facts) !== JSON.stringify(exp)) {
    errors.push(
      `${code}: countryFacts drift\n  got ${JSON.stringify(facts)}\n  exp ${JSON.stringify(exp)}`,
    );
  }
}

for (const [code, entry] of Object.entries(DEMOCRACY_DATA)) {
  if (entry.digitalNews && !fromCsv.get(code)?.include) {
    errors.push(`${code}: democracyData has digitalNews but CSV excludes it`);
  }
}
for (const code of factsDn.keys()) {
  if (!fromCsv.get(code)?.include) {
    errors.push(`${code}: countryFacts has digitalNews but CSV excludes it`);
  }
}

// Competition ranking among all 48 CSV markets must match stored ranks.
const ranked = [...fromCsv.entries()].sort((a, b) => {
  if (b[1].score !== a[1].score) return b[1].score - a[1].score;
  return a[0].localeCompare(b[0]);
});
let expectedRank = 1;
let i = 0;
while (i < ranked.length) {
  const score = ranked[i][1].score;
  let j = i;
  while (j < ranked.length && ranked[j][1].score === score) j++;
  for (let k = i; k < j; k++) {
    const [code, row] = ranked[k];
    if (row.rank !== expectedRank) {
      errors.push(
        `${code}: CSV rank ${row.rank} ≠ competition rank ${expectedRank} for score ${score}`,
      );
    }
  }
  expectedRank += j - i;
  i = j;
}

const spots = [
  ["KE", 1, 68, "60–69%"],
  ["NG", 1, 68, "60–69%"],
  ["FI", 3, 63, "60–69%"],
  ["SE", 6, 52, "50–59%"],
  ["AU", 14, 43, "40–49%"],
  ["US", 40, 25, "20–29%"],
  ["HU", 48, 17, "10–19%"],
];
for (const [code, rank, score, rating] of spots) {
  const e = DNR_2026_DATA[code];
  if (!e || e.rank !== rank || e.score !== score || e.rating !== rating) {
    errors.push(`spot-check failed for ${code}: ${JSON.stringify(e)}`);
  }
}

const uiFiles = [
  ["src/lib/democracyColors.ts", "digital-news"],
  ["src/components/DemocracyMapControl.tsx", "DEMOCRACY_INDEX_KEYS"],
  ["src/components/DemocracyIndexChart.tsx", "DEMOCRACY_INDEX_KEYS"],
  ["src/components/EntitySummary.tsx", "digitalNews"],
  ["src/components/FlagGrid.tsx", "digital-news"],
];
for (const [rel, needle] of uiFiles) {
  const text = readFileSync(resolve(__dirname, "..", rel), "utf8");
  if (!text.includes(needle)) {
    errors.push(`${rel} no longer references ${needle}`);
  }
}

if (errors.length) {
  console.error(`DNR trust check FAILED (${errors.length} errors):`);
  for (const e of errors.slice(0, 40)) console.error(" -", e);
  if (errors.length > 40) console.error(` … and ${errors.length - 40} more`);
  process.exit(1);
}

console.log(
  `DNR trust check OK — ${extractCodes.length} UN markets match Digital News Report 2026 trust-in-news (rank, score, band); HK/TW excluded.`,
);
