#!/usr/bin/env node
/**
 * Validate bundled Global Terrorism Index 2026 data against the committed
 * extract (scripts/data/gti2026Data.mjs / gti-2026.csv).
 *
 * Fails on: wrong rank/score/rankChange, wrong impact band, drift between
 * democracyData.mjs and countryFacts.ts, fabricating entries for codes absent
 * from the official GTI, or UI wiring dropping the index.
 *
 * Run: node scripts/check-gti-data.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DEMOCRACY_DATA } from "./data/democracyData.mjs";
import { GTI_2026_DATA } from "./data/gti2026Data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSV = resolve(__dirname, "data/gti-2026.csv");
const FACTS_TS = resolve(__dirname, "../src/data/countryFacts.ts");

/** IEP Global Terrorism Index map-legend bands (higher score = greater impact). */
function band(score) {
  if (score === 0) return "No Impact";
  if (score < 2) return "Very Low";
  if (score < 4) return "Low";
  if (score < 6) return "Medium";
  if (score < 8) return "High";
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

/** Pull `democracy.gti` out of the generated countryFacts.ts without importing TS. */
function loadFactsGti(src) {
  /** @type {Map<string, object>} */
  const out = new Map();
  const lineRe = /^  ([A-Z]{2}): (\{.*\}),$/gm;
  let m;
  while ((m = lineRe.exec(src))) {
    const code = m[1];
    const obj = JSON.parse(m[2]);
    const gti = obj.democracy?.gti;
    if (gti) out.set(code, gti);
  }
  return out;
}

const csvRows = parseCsv(readFileSync(CSV, "utf8"));
if (csvRows.length !== 161) {
  console.error(`Expected 161 GTI CSV rows, got ${csvRows.length}`);
  process.exit(1);
}

const expected = new Map();
for (const r of csvRows) {
  const code = r.iso.trim().toUpperCase();
  const score = Number(r.score);
  const entry = {
    year: Number(r.year),
    rating: r.rating,
    rank: Number(r.rank),
    rankChange: Number(r.rankChange),
    score,
  };
  if (band(score) !== entry.rating) {
    console.error(`${code}: CSV rating ${entry.rating} ≠ band(${score})=${band(score)}`);
    process.exit(1);
  }
  expected.set(code, entry);
}

const extractKeys = Object.keys(GTI_2026_DATA);
if (extractKeys.length !== 161) {
  console.error(`Expected 161 GTI extract entries, got ${extractKeys.length}`);
  process.exit(1);
}

const factsGti = loadFactsGti(readFileSync(FACTS_TS, "utf8"));
const errors = [];

for (const [code, exp] of expected) {
  const extract = GTI_2026_DATA[code];
  const demo = DEMOCRACY_DATA[code]?.gti;
  const facts = factsGti.get(code);
  if (!extract) errors.push(`${code}: missing from gti2026Data.mjs`);
  if (!demo) errors.push(`${code}: missing gti in democracyData`);
  if (!facts) errors.push(`${code}: missing gti in countryFacts`);
  if (extract && JSON.stringify(extract) !== JSON.stringify(exp)) {
    errors.push(
      `${code}: gti2026Data mismatch\n  got ${JSON.stringify(extract)}\n  exp ${JSON.stringify(exp)}`,
    );
  }
  if (demo && JSON.stringify(demo) !== JSON.stringify(exp)) {
    errors.push(
      `${code}: democracyData mismatch\n  got ${JSON.stringify(demo)}\n  exp ${JSON.stringify(exp)}`,
    );
  }
  if (facts && JSON.stringify(facts) !== JSON.stringify(exp)) {
    errors.push(
      `${code}: countryFacts mismatch\n  got ${JSON.stringify(facts)}\n  exp ${JSON.stringify(exp)}`,
    );
  }
  if (DEMOCRACY_DATA[code]?.freedomHouse?.gti) {
    errors.push(`${code}: gti wrongly nested under freedomHouse`);
  }
}

for (const [code, entry] of Object.entries(DEMOCRACY_DATA)) {
  if (entry.gti && !expected.has(code)) {
    errors.push(`${code}: gti present but not in official GTI extract`);
  }
}
for (const code of factsGti.keys()) {
  if (!expected.has(code)) {
    errors.push(`${code}: countryFacts gti not in official GTI extract`);
  }
}
for (const code of extractKeys) {
  if (!expected.has(code)) {
    errors.push(`${code}: gti2026Data has entry not in CSV`);
  }
}

// Spot-checks from the IEP GTI 2026 Overall Results table.
const spots = [
  ["PK", 1, 8.574, "Very High", 1],
  ["BF", 2, 8.324, "Very High", -1],
  ["NE", 3, 7.816, "High", 2],
  ["NG", 4, 7.792, "High", 2],
  ["CD", 8, 7.171, "High", 4],
  ["CO", 9, 7.116, "High", 5],
  ["US", 28, 4.521, "Medium", 6],
  ["AU", 31, 3.732, "Low", 14],
  ["SE", 46, 1.839, "Very Low", 4],
  ["IS", 97, 0.059, "Very Low", -1],
  ["AL", 100, 0, "No Impact", 1],
  ["PY", 100, 0, "No Impact", -2],
];
for (const [code, rank, score, rating, change] of spots) {
  const e = expected.get(code);
  if (
    !e ||
    e.rank !== rank ||
    e.score !== score ||
    e.rating !== rating ||
    e.rankChange !== change
  ) {
    errors.push(`spot-check failed for ${code}: ${JSON.stringify(e)}`);
  }
}

// Tied ranks must share a rank number (Bosnia/Serbia 65/66 both 0.782 → ranks
// 65 and 66 are consecutive distinct; zero-score countries all share 100).
const zeroScore = [...expected.values()].filter((e) => e.score === 0);
if (zeroScore.length !== 63) {
  // 65 zeros in the full GTI minus Taiwan & Kosovo = 63
  errors.push(`expected 63 No Impact countries, got ${zeroScore.length}`);
}
for (const e of zeroScore) {
  if (e.rank !== 100) errors.push(`${e.rating} zero-score must be rank 100`);
}

// Non-UN GTI territories must stay absent (Kosovo, Taiwan). Palestine IS kept.
for (const code of ["TW", "XK"]) {
  if (DEMOCRACY_DATA[code]?.gti || factsGti.has(code) || GTI_2026_DATA[code]) {
    errors.push(`${code}: non-UN GTI territory must not be bundled`);
  }
}
if (!expected.has("PS") || !GTI_2026_DATA.PS) {
  errors.push("PS (Palestine) must be present in the GTI extract");
}

const uiFiles = [
  ["src/lib/democracyColors.ts", "gti"],
  ["src/components/DemocracyMapControl.tsx", "DEMOCRACY_INDEX_KEYS"],
  ["src/components/DemocracyIndexChart.tsx", "DEMOCRACY_INDEX_KEYS"],
  ["src/components/EntitySummary.tsx", "gti"],
  ["src/components/FlagGrid.tsx", '"gti"'],
];
for (const [rel, needle] of uiFiles) {
  const text = readFileSync(resolve(__dirname, "..", rel), "utf8");
  if (!text.includes(needle)) {
    errors.push(`${rel} no longer references ${needle}`);
  }
}

if (errors.length) {
  console.error(`GTI check FAILED (${errors.length} errors):`);
  for (const e of errors.slice(0, 40)) console.error(" -", e);
  if (errors.length > 40) console.error(` … and ${errors.length - 40} more`);
  process.exit(1);
}

console.log(
  `GTI check OK — ${expected.size} countries match official 2026 extract (rank, score, band, rankChange).`,
);
