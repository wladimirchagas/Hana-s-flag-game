#!/usr/bin/env node
/**
 * Validate bundled World Happiness Report 2026 data against the committed
 * official extract (scripts/data/whr-happiness-2026.csv), itself sliced from
 * scripts/data/whr2026-figure-2.1.xlsx.
 *
 * Fails on: wrong rank/score/rankChange, wrong score band, nested field
 * placement, drift between whr2026Data.mjs / democracyData.mjs /
 * countryFacts.ts, or fabricating entries for skipped non-UN rows.
 *
 * Run: node scripts/check-whr-happiness.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { WHR_2026_DATA } from "./data/whr2026Data.mjs";
import { DEMOCRACY_DATA } from "./data/democracyData.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSV = resolve(__dirname, "data/whr-happiness-2026.csv");
const XLSX = resolve(__dirname, "data/whr2026-figure-2.1.xlsx");
const FACTS_TS = resolve(__dirname, "../src/data/countryFacts.ts");

const EXPECTED_XLSX_SHA256 =
  "576e382655cec3ae704a0b41cd2c04465b87cd84b7f131a0c4fa26d41f6d8028";

/** Cantril ladder score → map / group band (must match build-whr-happiness.mjs). */
function happinessBand(score) {
  if (score >= 9) return "9.0–10";
  if (score >= 8) return "8.0–8.9";
  if (score >= 7) return "7.0–7.9";
  if (score >= 6) return "6.0–6.9";
  if (score >= 5) return "5.0–5.9";
  if (score >= 4) return "4.0–4.9";
  if (score >= 3) return "3.0–3.9";
  if (score >= 2) return "2.0–2.9";
  if (score >= 1) return "1.0–1.9";
  return "0.0–0.9";
}

/** Official WHR country name → ISO (same table as the builder). */
const NAME_TO_ISO = {
  Afghanistan: "AF",
  Albania: "AL",
  Algeria: "DZ",
  Argentina: "AR",
  Armenia: "AM",
  Australia: "AU",
  Austria: "AT",
  Azerbaijan: "AZ",
  Bahrain: "BH",
  Bangladesh: "BD",
  Belgium: "BE",
  Belize: "BZ",
  Benin: "BJ",
  Bolivia: "BO",
  "Bosnia and Herzegovina": "BA",
  Botswana: "BW",
  Brazil: "BR",
  Bulgaria: "BG",
  "Burkina Faso": "BF",
  Cambodia: "KH",
  Cameroon: "CM",
  Canada: "CA",
  Chad: "TD",
  Chile: "CL",
  China: "CN",
  Colombia: "CO",
  Comoros: "KM",
  Congo: "CG",
  "Costa Rica": "CR",
  Croatia: "HR",
  Cyprus: "CY",
  Czechia: "CZ",
  "Côte d’Ivoire": "CI",
  Denmark: "DK",
  "Dominican Republic": "DO",
  "DR Congo": "CD",
  Ecuador: "EC",
  Egypt: "EG",
  "El Salvador": "SV",
  Estonia: "EE",
  Eswatini: "SZ",
  Ethiopia: "ET",
  Finland: "FI",
  France: "FR",
  Gabon: "GA",
  Gambia: "GM",
  Georgia: "GE",
  Germany: "DE",
  Ghana: "GH",
  Greece: "GR",
  Guatemala: "GT",
  Guinea: "GN",
  Honduras: "HN",
  Hungary: "HU",
  Iceland: "IS",
  India: "IN",
  Indonesia: "ID",
  Iran: "IR",
  Iraq: "IQ",
  Ireland: "IE",
  Israel: "IL",
  Italy: "IT",
  Jamaica: "JM",
  Japan: "JP",
  Jordan: "JO",
  Kazakhstan: "KZ",
  Kenya: "KE",
  Kuwait: "KW",
  Kyrgyzstan: "KG",
  "Lao PDR": "LA",
  Latvia: "LV",
  Lebanon: "LB",
  Lesotho: "LS",
  Liberia: "LR",
  Libya: "LY",
  Lithuania: "LT",
  Luxembourg: "LU",
  Madagascar: "MG",
  Malawi: "MW",
  Malaysia: "MY",
  Mali: "ML",
  Malta: "MT",
  Mauritania: "MR",
  Mauritius: "MU",
  Mexico: "MX",
  Mongolia: "MN",
  Montenegro: "ME",
  Morocco: "MA",
  Mozambique: "MZ",
  Myanmar: "MM",
  Namibia: "NA",
  Nepal: "NP",
  Netherlands: "NL",
  "New Zealand": "NZ",
  Nicaragua: "NI",
  Niger: "NE",
  Nigeria: "NG",
  "North Macedonia": "MK",
  Norway: "NO",
  Oman: "OM",
  Pakistan: "PK",
  Panama: "PA",
  Paraguay: "PY",
  Peru: "PE",
  Philippines: "PH",
  Poland: "PL",
  Portugal: "PT",
  "Republic of Korea": "KR",
  "Republic of Moldova": "MD",
  Romania: "RO",
  "Russian Federation": "RU",
  "Saudi Arabia": "SA",
  Senegal: "SN",
  Serbia: "RS",
  "Sierra Leone": "SL",
  Singapore: "SG",
  Slovakia: "SK",
  Slovenia: "SI",
  Somalia: "SO",
  "South Africa": "ZA",
  Spain: "ES",
  "Sri Lanka": "LK",
  "State of Palestine": "PS",
  Sweden: "SE",
  Switzerland: "CH",
  Tajikistan: "TJ",
  Tanzania: "TZ",
  Thailand: "TH",
  Togo: "TG",
  "Trinidad and Tobago": "TT",
  Tunisia: "TN",
  Türkiye: "TR",
  Uganda: "UG",
  Ukraine: "UA",
  "United Arab Emirates": "AE",
  "United Kingdom": "GB",
  "United States": "US",
  Uruguay: "UY",
  Uzbekistan: "UZ",
  Venezuela: "VE",
  "Viet Nam": "VN",
  Yemen: "YE",
  Zambia: "ZM",
  Zimbabwe: "ZW",
};

const SKIP_NAMES = new Set([
  "Kosovo",
  "Taiwan Province of China",
  "Hong Kong SAR of China",
]);

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  return lines.slice(1).map((line) => {
    const m = line.match(/^(\d+),(?:"([^"]*)"|([^,]*)),([^,]*),([^,]*)$/);
    if (!m) throw new Error(`Bad CSV row: ${line}`);
    return {
      rank: Number(m[1]),
      country: m[2] ?? m[3],
      score: Number(m[4]),
      rank_2024: m[5] === "" ? null : Number(m[5]),
    };
  });
}

function loadFactsHappiness(src) {
  /** @type {Map<string, object>} */
  const out = new Map();
  const lineRe = /^  ([A-Z]{2}): (\{.*\}),$/gm;
  let m;
  while ((m = lineRe.exec(src))) {
    const code = m[1];
    const obj = JSON.parse(m[2]);
    const h = obj.democracy?.happiness;
    if (h) out.set(code, h);
  }
  return out;
}

const xlsxSha = createHash("sha256").update(readFileSync(XLSX)).digest("hex");
if (xlsxSha !== EXPECTED_XLSX_SHA256) {
  console.error(
    `WHR workbook sha256 mismatch:\n  got  ${xlsxSha}\n  want ${EXPECTED_XLSX_SHA256}`,
  );
  process.exit(1);
}

const rows = parseCsv(readFileSync(CSV, "utf8"));
if (rows.length !== 147) {
  console.error(`Expected 147 WHR CSV rows, got ${rows.length}`);
  process.exit(1);
}

/** @type {Map<string, { rank: number, score: number, rankChange: number, rating: string }>} */
const expected = new Map();
for (const r of rows) {
  if (SKIP_NAMES.has(r.country)) continue;
  const code = NAME_TO_ISO[r.country];
  if (!code) {
    console.error(`Unmapped WHR country in CSV: ${r.country}`);
    process.exit(1);
  }
  const rankChange =
    typeof r.rank_2024 === "number" ? r.rank_2024 - r.rank : 0;
  expected.set(code, {
    rank: r.rank,
    score: r.score,
    rankChange,
    rating: happinessBand(r.score),
  });
}

let failures = 0;
function fail(msg) {
  console.error(`FAIL: ${msg}`);
  failures++;
}

if (expected.size !== 144) {
  fail(`Expected 144 mapped countries, got ${expected.size}`);
}

// Spot-check anchors from the published WHR 2026 ranking.
const anchors = [
  ["FI", 1, 7.764],
  ["IS", 2, 7.54],
  ["DK", 3, 7.539],
  ["CR", 4, 7.439],
  ["AF", 147, 1.446],
];
for (const [code, rank, score] of anchors) {
  const e = expected.get(code);
  if (!e || e.rank !== rank || e.score !== score) {
    fail(`Anchor ${code}: expected rank ${rank} score ${score}, got ${JSON.stringify(e)}`);
  }
}

// Skipped territories must never appear.
for (const name of SKIP_NAMES) {
  const code = NAME_TO_ISO[name];
  if (code && (WHR_2026_DATA[code] || DEMOCRACY_DATA[code]?.happiness)) {
    fail(`Skipped territory ${name} must not have a happiness entry`);
  }
}

for (const [code, exp] of expected) {
  const whr = WHR_2026_DATA[code];
  if (!whr) {
    fail(`${code}: missing from whr2026Data.mjs`);
    continue;
  }
  if (whr.year !== 2026) fail(`${code}: year ${whr.year} ≠ 2026`);
  if (whr.rank !== exp.rank) fail(`${code}: rank ${whr.rank} ≠ ${exp.rank}`);
  if (whr.score !== exp.score) fail(`${code}: score ${whr.score} ≠ ${exp.score}`);
  if (whr.rankChange !== exp.rankChange) {
    fail(`${code}: rankChange ${whr.rankChange} ≠ ${exp.rankChange}`);
  }
  if (whr.rating !== exp.rating) {
    fail(`${code}: rating ${whr.rating} ≠ ${exp.rating}`);
  }

  const demo = DEMOCRACY_DATA[code]?.happiness;
  if (!demo) {
    fail(`${code}: missing democracyData.happiness`);
    continue;
  }
  if (JSON.stringify(demo) !== JSON.stringify(whr)) {
    fail(`${code}: democracyData.happiness drifted from whr2026Data`);
  }
}

for (const code of Object.keys(WHR_2026_DATA)) {
  if (!expected.has(code)) fail(`${code}: in whr2026Data but not in official CSV mapping`);
}

for (const [code, demo] of Object.entries(DEMOCRACY_DATA)) {
  if (demo.happiness && !expected.has(code)) {
    fail(`${code}: fabricated happiness entry not in official CSV`);
  }
}

const facts = loadFactsHappiness(readFileSync(FACTS_TS, "utf8"));
for (const [code, exp] of expected) {
  const f = facts.get(code);
  if (!f) {
    fail(`${code}: missing countryFacts.democracy.happiness`);
    continue;
  }
  const whr = WHR_2026_DATA[code];
  if (JSON.stringify(f) !== JSON.stringify(whr)) {
    fail(`${code}: countryFacts.happiness drifted from whr2026Data`);
  }
}
for (const code of facts.keys()) {
  if (!expected.has(code)) fail(`${code}: countryFacts has happiness not in CSV`);
}

// UI wiring — the key must appear in the shared index list and FlagGrid group modes.
const colorsSrc = readFileSync(resolve(__dirname, "../src/lib/democracyColors.ts"), "utf8");
if (!colorsSrc.includes('"happiness"')) {
  fail('democracyColors.ts must list "happiness" in DEMOCRACY_INDEX_KEYS');
}
const gridSrc = readFileSync(resolve(__dirname, "../src/components/FlagGrid.tsx"), "utf8");
if (!gridSrc.includes('"happiness"') || !gridSrc.includes("getDemocracyIndexLabel")) {
  fail('FlagGrid.tsx must offer happiness group mode via getDemocracyIndexLabel()');
}
const summarySrc = readFileSync(resolve(__dirname, "../src/components/EntitySummary.tsx"), "utf8");
if (
  !summarySrc.includes('getDemocracyIndexLabel("happiness")') ||
  !summarySrc.includes("happiness")
) {
  fail('EntitySummary.tsx must render happiness via getDemocracyIndexLabel("happiness")');
}

if (failures) {
  console.error(`\n${failures} failure(s).`);
  process.exit(1);
}
console.log(
  `OK — World Happiness Report 2026: ${expected.size} countries validated against CSV + workbook sha256.`,
);
