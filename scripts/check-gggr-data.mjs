#!/usr/bin/env node
/**
 * Validate bundled WEF Global Gender Gap Index 2026 data against the
 * committed extract (scripts/data/gggr-2026.csv / gggr2026Data.mjs), itself
 * taken from the official Global Gender Gap Report 2026 PDF TABLE 1.1
 * (https://reports.weforum.org/docs/WEF_GGGR_Report_2026.pdf).
 *
 * Fails on: wrong rank/score/rankChange/band, drift between democracyData.mjs
 * and countryFacts.ts, fabricating entries for codes absent from the extract,
 * or UI wiring dropping the index.
 *
 * Run: node scripts/check-gggr-data.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DEMOCRACY_DATA } from "./data/democracyData.mjs";
import { GGGR_2026_DATA } from "./data/gggr2026Data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const CSV = resolve(__dirname, "data/gggr-2026.csv");
const FACTS_TS = resolve(ROOT, "src/data/countryFacts.ts");

function band(score) {
  const pct = Math.floor(score * 100 + 1e-9);
  const tens = Math.floor(pct / 10) * 10;
  if (tens >= 90) return "90–100";
  if (tens >= 80) return "80–89";
  if (tens >= 70) return "70–79";
  if (tens >= 60) return "60–69";
  if (tens >= 50) return "50–59";
  if (tens >= 40) return "40–49";
  if (tens >= 30) return "30–39";
  if (tens >= 20) return "20–29";
  if (tens >= 10) return "10–19";
  return "0–9";
}

/** Pull `democracy.genderGap` out of countryFacts.ts without importing TS. */
function loadFactsGenderGap(src) {
  /** @type {Map<string, object>} */
  const out = new Map();
  const lineRe = /^  ([A-Z]{2}): (\{.*\}),$/gm;
  let m;
  while ((m = lineRe.exec(src))) {
    const code = m[1];
    const obj = JSON.parse(m[2]);
    const gg = obj.democracy?.genderGap;
    if (gg) out.set(code, gg);
  }
  return out;
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(";");
  return lines.slice(1).map((line) => {
    const cols = line.split(";");
    /** @type {Record<string, string>} */
    const row = {};
    headers.forEach((h, i) => {
      row[h] = cols[i];
    });
    return row;
  });
}

function sameIndex(a, b) {
  if (!a || !b) return false;
  if (a.year !== b.year || a.rating !== b.rating || a.rank !== b.rank) return false;
  if (Number(a.score).toFixed(3) !== Number(b.score).toFixed(3)) return false;
  const ar = a.rankChange;
  const br = b.rankChange;
  if (ar === undefined && br === undefined) return true;
  return ar === br;
}

const rows = parseCsv(readFileSync(CSV, "utf8"));
if (rows.length !== 145) {
  console.error(`Expected 145 GGGR rows, got ${rows.length}`);
  process.exit(1);
}

/** @type {Map<string, object>} */
const expected = new Map();
for (const r of rows) {
  const score = Number(r.score);
  const entry = {
    year: 2026,
    rating: band(score),
    rank: Number(r.rank),
    score: Number(score.toFixed(3)),
  };
  if (r.rank_change === "n/a") {
    // omit
  } else if (r.rank_change === "-") {
    entry.rankChange = 0;
  } else {
    entry.rankChange = Number(r.rank_change);
  }
  if (expected.has(r.iso2)) {
    console.error(`Duplicate iso2 in CSV: ${r.iso2}`);
    process.exit(1);
  }
  expected.set(r.iso2, entry);

  const extract = GGGR_2026_DATA[r.iso2];
  if (!sameIndex(extract, entry)) {
    console.error(
      `${r.iso2}: gggr2026Data.mjs ≠ CSV\n  mjs ${JSON.stringify(extract)}\n  csv ${JSON.stringify(entry)}`,
    );
    process.exit(1);
  }
}

const extractCodes = Object.keys(GGGR_2026_DATA);
if (extractCodes.length !== 145) {
  console.error(`GGGR_2026_DATA has ${extractCodes.length} codes, expected 145`);
  process.exit(1);
}

const factsGg = loadFactsGenderGap(readFileSync(FACTS_TS, "utf8"));
const errors = [];

for (const [code, exp] of expected) {
  const demo = DEMOCRACY_DATA[code]?.genderGap;
  const facts = factsGg.get(code);
  if (!demo) errors.push(`${code}: missing genderGap in democracyData`);
  if (!facts) errors.push(`${code}: missing genderGap in countryFacts`);
  if (demo && !sameIndex(demo, exp)) {
    errors.push(
      `${code}: democracyData mismatch\n  got ${JSON.stringify(demo)}\n  exp ${JSON.stringify(exp)}`,
    );
  }
  if (facts && !sameIndex(facts, exp)) {
    errors.push(
      `${code}: countryFacts mismatch\n  got ${JSON.stringify(facts)}\n  exp ${JSON.stringify(exp)}`,
    );
  }
  if (band(exp.score) !== exp.rating) {
    errors.push(`${code}: rating band ${exp.rating} does not match score ${exp.score}`);
  }
}

for (const [code, entry] of Object.entries(DEMOCRACY_DATA)) {
  if (entry.genderGap && !expected.has(code)) {
    errors.push(`${code}: genderGap present but not in official GGGR extract`);
  }
}
for (const code of factsGg.keys()) {
  if (!expected.has(code)) {
    errors.push(`${code}: countryFacts genderGap not in official GGGR extract`);
  }
}

// Spot-checks against published 2026 report figures (news + TABLE 1.1).
const spots = [
  ["IS", 1, 0.93, "90–100", 0],
  ["FI", 2, 0.872, "80–89", 0],
  ["NO", 3, 0.857, "80–89", 0],
  ["NA", 4, 0.845, "80–89", 4],
  ["US", 47, 0.749, "70–79", -5],
  ["CN", 96, 0.699, "60–69", 7],
  ["IN", 131, 0.645, "60–69", 0],
  ["TD", 145, 0.578, "50–59", 1],
  ["MW", 99, 0.695, "60–69", undefined], // re-enter — no rankChange
  ["QA", 135, 0.638, "60–69", undefined],
];
for (const [code, rank, score, rating, change] of spots) {
  const e = expected.get(code);
  if (
    !e ||
    e.rank !== rank ||
    Number(e.score.toFixed(3)) !== Number(score.toFixed(3)) ||
    e.rating !== rating ||
    e.rankChange !== change
  ) {
    errors.push(`spot-check failed for ${code}: ${JSON.stringify(e)}`);
  }
}

const uiFiles = [
  ["src/lib/democracyColors.ts", "gender-gap"],
  ["src/components/DemocracyMapControl.tsx", "getDemocracyIndexMenuGroups"],
  ["src/components/DemocracyIndexChart.tsx", "getDemocracyIndexMenuGroups"],
  ["src/components/EntitySummary.tsx", "genderGap"],
  ["src/components/FlagGrid.tsx", "gender-gap"],
];
for (const [rel, needle] of uiFiles) {
  const text = readFileSync(resolve(ROOT, rel), "utf8");
  if (!text.includes(needle)) {
    errors.push(`${rel} no longer references ${needle}`);
  }
}

if (errors.length) {
  console.error(`GGGR check FAILED (${errors.length} errors):`);
  for (const e of errors.slice(0, 40)) console.error(" -", e);
  if (errors.length > 40) console.error(` … and ${errors.length - 40} more`);
  process.exit(1);
}

console.log(
  `GGGR check OK — ${expected.size} countries match official 2026 TABLE 1.1 (rank, score, band, rankChange).`,
);
