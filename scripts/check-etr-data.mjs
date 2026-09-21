#!/usr/bin/env node
/**
 * Validate bundled IEP Ecological Threat Index (ETR) data against the
 * committed extract (scripts/data/etr2024Data.mjs / etr-2024.csv).
 *
 * Source: Institute for Economics & Peace, Ecological Threat Report 2025,
 * Appendix B — ETR Country Scores, 2024.
 *
 * Fails on: wrong rank/score/band, drift between democracyData.mjs and
 * countryFacts.ts, fabricating entries for codes absent from the extract, or
 * UI wiring dropping the index.
 *
 * Run: node scripts/check-etr-data.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DEMOCRACY_DATA } from "./data/democracyData.mjs";
import { ETR_2024_DATA } from "./data/etr2024Data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSV = resolve(__dirname, "data/etr-2024.csv");
const FACTS_TS = resolve(__dirname, "../src/data/countryFacts.ts");

/** IEP Ecological Threat Report 2025 Appendix A bands. */
function band(score) {
  if (score < 1.6) return "Very Low";
  if (score < 2.2) return "Low";
  if (score < 3.0) return "Medium";
  if (score <= 3.8) return "High";
  return "Very High";
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const cols = line.split(",");
    const row = {};
    headers.forEach((h, i) => {
      row[h] = cols[i];
    });
    return row;
  });
}

function loadFactsEtr(src) {
  /** @type {Map<string, object>} */
  const out = new Map();
  const lineRe = /^  ([A-Z]{2}): (\{.*\}),$/gm;
  let m;
  while ((m = lineRe.exec(src))) {
    const code = m[1];
    const obj = JSON.parse(m[2]);
    const etr = obj.democracy?.etr;
    if (etr) out.set(code, etr);
  }
  return out;
}

function sameEntry(a, b) {
  return (
    a &&
    b &&
    a.year === b.year &&
    a.rating === b.rating &&
    a.rank === b.rank &&
    Number(a.score) === Number(b.score)
  );
}

const csvRows = parseCsv(readFileSync(CSV, "utf8"));
if (csvRows.length !== 170) {
  console.error(`Expected 170 ETR CSV rows, got ${csvRows.length}`);
  process.exit(1);
}

const expected = new Map();
for (const r of csvRows) {
  const code = r.iso2.trim().toUpperCase();
  const score = Number(r.overall);
  const entry = {
    year: 2024,
    rating: r.rating,
    rank: Number(r.rank),
    score,
  };
  if (band(score) !== entry.rating) {
    console.error(`${code}: CSV rating ${entry.rating} ≠ band(${score})=${band(score)}`);
    process.exit(1);
  }
  expected.set(code, entry);
}

const errors = [];
const extractCodes = Object.keys(ETR_2024_DATA).sort();
if (extractCodes.length !== 170) {
  errors.push(`etr2024Data has ${extractCodes.length} codes, expected 170`);
}

for (const [code, exp] of expected) {
  const extract = ETR_2024_DATA[code];
  const demo = DEMOCRACY_DATA[code]?.etr;
  if (!extract) errors.push(`${code}: missing from etr2024Data`);
  else if (!sameEntry(extract, exp)) {
    errors.push(
      `${code}: extract drift\n  got ${JSON.stringify(extract)}\n  exp ${JSON.stringify(exp)}`,
    );
  }
  if (!demo) errors.push(`${code}: missing etr in democracyData`);
  else if (!sameEntry(demo, exp)) {
    errors.push(
      `${code}: democracyData drift\n  got ${JSON.stringify(demo)}\n  exp ${JSON.stringify(exp)}`,
    );
  }
}

const factsEtr = loadFactsEtr(readFileSync(FACTS_TS, "utf8"));
for (const [code, exp] of expected) {
  const facts = factsEtr.get(code);
  if (!facts) errors.push(`${code}: missing etr in countryFacts`);
  else if (!sameEntry(facts, exp)) {
    errors.push(
      `${code}: countryFacts drift\n  got ${JSON.stringify(facts)}\n  exp ${JSON.stringify(exp)}`,
    );
  }
}

for (const [code, entry] of Object.entries(DEMOCRACY_DATA)) {
  if (entry.etr && !expected.has(code)) {
    errors.push(`${code}: democracyData has etr but CSV does not`);
  }
}
for (const code of factsEtr.keys()) {
  if (!expected.has(code)) {
    errors.push(`${code}: countryFacts has etr but CSV does not`);
  }
}

// Table 1.1 — countries with the highest overall ETR scores, 2024 (IEP ETR 2025).
const spots = [
  ["NE", 172, 4.42, "Very High"],
  ["BI", 171, 4.271, "Very High"],
  ["AF", 170, 4.228, "Very High"],
  ["UG", 169, 4.225, "Very High"],
  ["CD", 168, 4.211, "Very High"],
  ["ET", 167, 4.194, "Very High"],
  ["SO", 166, 4.16, "Very High"],
  ["ML", 165, 4.143, "Very High"],
  ["LR", 164, 4.129, "Very High"],
  ["NG", 163, 4.112, "Very High"],
  ["NL", 2, 1.312, "Very Low"],
  ["DE", 3, 1.347, "Very Low"],
  ["AT", 4, 1.351, "Very Low"],
];
for (const [code, rank, score, rating] of spots) {
  const e = expected.get(code);
  if (!e || e.rank !== rank || Number(e.score) !== score || e.rating !== rating) {
    errors.push(`spot-check failed for ${code}: ${JSON.stringify(e)} (expected rank ${rank} score ${score} ${rating})`);
  }
}

const uiFiles = [
  ["src/lib/democracyColors.ts", "etr"],
  ["src/components/DemocracyMapControl.tsx", "DEMOCRACY_INDEX_KEYS"],
  ["src/components/DemocracyIndexChart.tsx", "DEMOCRACY_INDEX_KEYS"],
  ["src/components/EntitySummary.tsx", "etr"],
  ["src/components/FlagGrid.tsx", "etr"],
];
for (const [rel, needle] of uiFiles) {
  const text = readFileSync(resolve(__dirname, "..", rel), "utf8");
  if (!text.includes(needle)) {
    errors.push(`${rel} no longer references ${needle}`);
  }
}

if (errors.length) {
  console.error(`ETR check FAILED (${errors.length} errors):`);
  for (const e of errors.slice(0, 40)) console.error(" -", e);
  if (errors.length > 40) console.error(` … and ${errors.length - 40} more`);
  process.exit(1);
}

console.log(
  `ETR check OK — ${expected.size} countries, scores/ranks/bands match Appendix B, UI wired.`,
);
