#!/usr/bin/env node
/**
 * Validate bundled IMD World Competitiveness Ranking 2025 data against the
 * committed extract (scripts/data/imd-wcr-2025.csv) and imdWcr2025Data.mjs.
 *
 * Fails on: wrong rank/score/rankChange, wrong score band, nested field
 * placement, drift between imdWcr2025Data.mjs / democracyData.mjs /
 * countryFacts.ts, or fabricating entries for skipped non-UN rows.
 *
 * Run: node scripts/check-imd-wcr.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { IMD_WCR_2025_DATA } from "./data/imdWcr2025Data.mjs";
import { DEMOCRACY_DATA } from "./data/democracyData.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSV = resolve(__dirname, "data/imd-wcr-2025.csv");
const FACTS_TS = resolve(__dirname, "../src/data/countryFacts.ts");

/** Must match scripts/build-imd-wcr.mjs `imdCompetitivenessBand`. */
function imdCompetitivenessBand(score) {
  if (score >= 90) return "90–100";
  if (score >= 80) return "80–89";
  if (score >= 70) return "70–79";
  if (score >= 60) return "60–69";
  if (score >= 50) return "50–59";
  if (score >= 40) return "40–49";
  if (score >= 30) return "30–39";
  if (score >= 20) return "20–29";
  if (score >= 10) return "10–19";
  return "0–9";
}

const NAME_TO_ISO = {
  Switzerland: "CH",
  Singapore: "SG",
  Denmark: "DK",
  UAE: "AE",
  Ireland: "IE",
  Sweden: "SE",
  Qatar: "QA",
  Netherlands: "NL",
  Canada: "CA",
  Norway: "NO",
  USA: "US",
  Finland: "FI",
  Iceland: "IS",
  China: "CN",
  "Saudi Arabia": "SA",
  Australia: "AU",
  Germany: "DE",
  Luxembourg: "LU",
  Lithuania: "LT",
  Bahrain: "BH",
  Malaysia: "MY",
  Belgium: "BE",
  "Czech Republic": "CZ",
  Austria: "AT",
  "Korea Rep.": "KR",
  Oman: "OM",
  "United Kingdom": "GB",
  Thailand: "TH",
  "New Zealand": "NZ",
  France: "FR",
  Estonia: "EE",
  Kazakhstan: "KZ",
  Japan: "JP",
  Kuwait: "KW",
  Portugal: "PT",
  Latvia: "LV",
  Spain: "ES",
  Indonesia: "ID",
  India: "IN",
  Chile: "CL",
  Italy: "IT",
  Cyprus: "CY",
  Slovenia: "SI",
  Jordan: "JO",
  Hungary: "HU",
  Romania: "RO",
  Greece: "GR",
  Philippines: "PH",
  Poland: "PL",
  Croatia: "HR",
  Colombia: "CO",
  Mexico: "MX",
  Kenya: "KE",
  Bulgaria: "BG",
  Brazil: "BR",
  Botswana: "BW",
  Peru: "PE",
  Ghana: "GH",
  Argentina: "AR",
  "Slovak Republic": "SK",
  "South Africa": "ZA",
  Mongolia: "MN",
  Türkiye: "TR",
  Nigeria: "NG",
  Namibia: "NA",
  Venezuela: "VE",
};

const SKIP_NAMES = new Set([
  "Hong Kong SAR",
  "Taiwan (Chinese Taipei)",
  "Puerto Rico",
]);

const errors = [];
function fail(msg) {
  errors.push(msg);
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  return lines.slice(1).map((line) => {
    const m = line.match(/^(\d+),([^,]+),([0-9.]+),(-?\d*)$/);
    if (!m) throw new Error(`Bad CSV row: ${line}`);
    return {
      rank: Number(m[1]),
      economy: m[2],
      score: Number(m[3]),
      rank_change: m[4] === "" ? null : Number(m[4]),
    };
  });
}

function loadFactsImd(src) {
  /** @type {Map<string, object>} */
  const out = new Map();
  const lineRe = /^  ([A-Z]{2}): (\{.*\}),$/gm;
  let m;
  while ((m = lineRe.exec(src))) {
    const code = m[1];
    const obj = JSON.parse(m[2]);
    const imd = obj.democracy?.imdCompetitiveness;
    if (imd) out.set(code, imd);
  }
  return out;
}

const rows = parseCsv(readFileSync(CSV, "utf8"));
if (rows.length !== 69) {
  fail(`Expected 69 CSV rows, got ${rows.length}`);
}

/** @type {Map<string, object>} */
const expected = new Map();
for (const r of rows) {
  if (SKIP_NAMES.has(r.economy)) {
    if (NAME_TO_ISO[r.economy]) {
      fail(`Skipped economy ${r.economy} must not be in NAME_TO_ISO`);
    }
    continue;
  }
  const code = NAME_TO_ISO[r.economy];
  if (!code) {
    fail(`Unmapped economy in CSV: ${r.economy}`);
    continue;
  }
  /** @type {{ year: number, rating: string, rank: number, rankChange?: number, score: number }} */
  const entry = {
    year: 2025,
    rating: imdCompetitivenessBand(r.score),
    rank: r.rank,
    score: r.score,
  };
  if (typeof r.rank_change === "number") entry.rankChange = r.rank_change;
  expected.set(code, entry);
}

for (const name of SKIP_NAMES) {
  const codeGuess = { "Hong Kong SAR": "HK", "Taiwan (Chinese Taipei)": "TW", "Puerto Rico": "PR" }[
    name
  ];
  if (codeGuess && (IMD_WCR_2025_DATA[codeGuess] || DEMOCRACY_DATA[codeGuess]?.imdCompetitiveness)) {
    fail(`Skipped territory ${name} must not have an imdCompetitiveness entry`);
  }
}

const factsImd = loadFactsImd(readFileSync(FACTS_TS, "utf8"));

for (const [code, exp] of expected) {
  const extract = IMD_WCR_2025_DATA[code];
  const demo = DEMOCRACY_DATA[code]?.imdCompetitiveness;
  const facts = factsImd.get(code);
  if (!extract) fail(`${code}: missing from IMD_WCR_2025_DATA`);
  if (!demo) fail(`${code}: missing democracyData.imdCompetitiveness`);
  if (!facts) fail(`${code}: missing countryFacts.imdCompetitiveness`);
  if (extract && JSON.stringify(extract) !== JSON.stringify(exp)) {
    fail(
      `${code}: imdWcr2025Data mismatch\n  got ${JSON.stringify(extract)}\n  exp ${JSON.stringify(exp)}`,
    );
  }
  if (demo && JSON.stringify(demo) !== JSON.stringify(exp)) {
    fail(
      `${code}: democracyData mismatch\n  got ${JSON.stringify(demo)}\n  exp ${JSON.stringify(exp)}`,
    );
  }
  if (facts && JSON.stringify(facts) !== JSON.stringify(exp)) {
    fail(
      `${code}: countryFacts mismatch\n  got ${JSON.stringify(facts)}\n  exp ${JSON.stringify(exp)}`,
    );
  }
  if (DEMOCRACY_DATA[code]?.freedomHouse?.imdCompetitiveness) {
    fail(`${code}: imdCompetitiveness wrongly nested under freedomHouse`);
  }
}

for (const [code, entry] of Object.entries(DEMOCRACY_DATA)) {
  if (entry.imdCompetitiveness && !expected.has(code)) {
    fail(`${code}: fabricated imdCompetitiveness not in official CSV mapping`);
  }
}
for (const code of Object.keys(IMD_WCR_2025_DATA)) {
  if (!expected.has(code)) {
    fail(`${code}: IMD_WCR_2025_DATA has code not in official extract mapping`);
  }
}
for (const code of factsImd.keys()) {
  if (!expected.has(code)) {
    fail(`${code}: countryFacts imdCompetitiveness not in official extract mapping`);
  }
}

// Spot-checks against the published 2025 overall ranking table.
const spots = [
  ["CH", 1, 100.0, "90–100", 1],
  ["SG", 2, 99.44, "90–100", -1],
  ["DK", 4, 97.51, "90–100", -1],
  ["AE", 5, 96.09, "90–100", 2],
  ["IE", 7, 91.31, "90–100", -3],
  ["CA", 11, 88.73, "80–89", 8],
  ["US", 13, 84.27, "80–89", -1],
  ["CN", 16, 82.13, "80–89", -2],
  ["DE", 19, 78.24, "70–79", 5],
  ["MY", 23, 74.81, "70–79", 11],
  ["AT", 26, 73.55, "70–79", 0],
  ["GB", 29, 71.95, "70–79", -1],
  ["ID", 40, 64.32, "60–69", -13],
  ["IN", 41, 64.19, "60–69", -2],
  ["BR", 58, 46.41, "40–49", 4],
  ["TR", 66, 40.41, "40–49", -13],
  ["NG", 67, 39.73, "30–39", -3],
  ["VE", 69, 25.47, "20–29", -2],
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
    fail(`spot-check failed for ${code}: ${JSON.stringify(e)}`);
  }
}

// First-time 2025 entrants must omit rankChange.
for (const code of ["OM", "KE", "NA"]) {
  const e = expected.get(code);
  if (!e || "rankChange" in e) {
    fail(`${code}: new 2025 entrant must omit rankChange: ${JSON.stringify(e)}`);
  }
}

if (expected.size !== 66) {
  fail(`expected 66 mapped UN members, got ${expected.size}`);
}

const uiFiles = [
  ["src/lib/democracyColors.ts", "imd-competitiveness"],
  ["src/components/DemocracyMapControl.tsx", "DEMOCRACY_INDEX_KEYS"],
  ["src/components/DemocracyIndexChart.tsx", "DEMOCRACY_INDEX_KEYS"],
  ["src/components/EntitySummary.tsx", "imdCompetitiveness"],
  ["src/components/FlagGrid.tsx", '"imd-competitiveness"'],
];
for (const [rel, needle] of uiFiles) {
  const text = readFileSync(resolve(__dirname, "..", rel), "utf8");
  if (!text.includes(needle)) {
    fail(`${rel} no longer references ${needle}`);
  }
}

if (errors.length) {
  console.error(`IMD WCR check FAILED (${errors.length} errors):`);
  for (const e of errors.slice(0, 40)) console.error(" -", e);
  if (errors.length > 40) console.error(` … and ${errors.length - 40} more`);
  process.exit(1);
}

console.log(
  `IMD WCR check OK — ${expected.size} countries match official 2025 ranking extract (rank, score, band, rankChange).`,
);
