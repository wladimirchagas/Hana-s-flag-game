#!/usr/bin/env node
/**
 * Validate bundled World Economic Forum Global Gender Gap Index 2025 data
 * against the committed extract (scripts/data/gggi-2025.csv /
 * scripts/data/gggi2025Data.mjs).
 *
 * Fails on: wrong rank/score/band, drift between democracyData.mjs and
 * countryFacts.ts, fabricating entries for codes absent from the extract, or
 * UI wiring dropping the index.
 *
 * Run: node scripts/check-gggi-data.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { GGGI_2025_DATA } from "./data/gggi2025Data.mjs";
import { DEMOCRACY_DATA } from "./data/democracyData.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSV = resolve(__dirname, "data/gggi-2025.csv");
const FACTS_TS = resolve(__dirname, "../src/data/countryFacts.ts");

const A3_TO_A2 = {
  AFG: "AF", AGO: "AO", ALB: "AL", ARE: "AE", ARG: "AR", ARM: "AM", AUS: "AU",
  AUT: "AT", AZE: "AZ", BDI: "BI", BEL: "BE", BEN: "BJ", BFA: "BF", BGD: "BD",
  BGR: "BG", BHR: "BH", BIH: "BA", BLR: "BY", BLZ: "BZ", BOL: "BO", BRA: "BR",
  BRB: "BB", BRN: "BN", BTN: "BT", BWA: "BW", CAN: "CA", CHE: "CH", CHL: "CL",
  CHN: "CN", CIV: "CI", CMR: "CM", COD: "CD", COL: "CO", COM: "KM", CPV: "CV",
  CRI: "CR", CYP: "CY", CZE: "CZ", DEU: "DE", DNK: "DK", DOM: "DO", DZA: "DZ",
  ECU: "EC", EGY: "EG", ESP: "ES", EST: "EE", ETH: "ET", FIN: "FI", FJI: "FJ",
  FRA: "FR", GAB: "GA", GBR: "GB", GEO: "GE", GHA: "GH", GIN: "GN", GMB: "GM",
  GRC: "GR", GTM: "GT", GUY: "GY", HND: "HN", HRV: "HR", HUN: "HU", IDN: "ID",
  IND: "IN", IRL: "IE", IRN: "IR", ISL: "IS", ISR: "IL", ITA: "IT", JAM: "JM",
  JOR: "JO", JPN: "JP", KAZ: "KZ", KEN: "KE", KGZ: "KG", KHM: "KH", KOR: "KR",
  KWT: "KW", LAO: "LA", LBN: "LB", LBR: "LR", LKA: "LK", LSO: "LS", LTU: "LT",
  LUX: "LU", LVA: "LV", MAR: "MA", MDA: "MD", MDG: "MG", MDV: "MV", MEX: "MX",
  MKD: "MK", MLI: "ML", MLT: "MT", MNE: "ME", MNG: "MN", MOZ: "MZ", MUS: "MU",
  MYS: "MY", NAM: "NA", NER: "NE", NGA: "NG", NIC: "NI", NLD: "NL", NOR: "NO",
  NPL: "NP", NZL: "NZ", OMN: "OM", PAK: "PK", PAN: "PA", PER: "PE", PHL: "PH",
  PNG: "PG", POL: "PL", PRT: "PT", PRY: "PY", ROU: "RO", RWA: "RW", SAU: "SA",
  SDN: "SD", SEN: "SN", SGP: "SG", SLE: "SL", SLV: "SV", SRB: "RS", SUR: "SR",
  SVK: "SK", SVN: "SI", SWE: "SE", SWZ: "SZ", TCD: "TD", TGO: "TG", THA: "TH",
  TJK: "TJ", TLS: "TL", TTO: "TT", TUN: "TN", TUR: "TR", TZA: "TZ", UGA: "UG",
  UKR: "UA", URY: "UY", USA: "US", UZB: "UZ", VNM: "VN", VUT: "VU", ZAF: "ZA",
  ZMB: "ZM", ZWE: "ZW",
};

function band(score) {
  if (score >= 0.9) return "90–100%";
  if (score >= 0.8) return "80–89%";
  if (score >= 0.7) return "70–79%";
  if (score >= 0.6) return "60–69%";
  if (score >= 0.5) return "50–59%";
  return "Below 50%";
}

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

const csvLines = readFileSync(CSV, "utf8").trim().split(/\r?\n/).slice(1);
const fromCsv = new Map();
for (const line of csvLines) {
  const [a3, , scoreStr, rankStr] = line.split(",");
  const a2 = A3_TO_A2[a3];
  if (!a2) {
    console.error(`Unmapped GGGI ISO3 ${a3}`);
    process.exit(1);
  }
  const score = Number(scoreStr);
  const rank = Number(rankStr);
  fromCsv.set(a2, {
    year: 2025,
    rating: band(score),
    rank,
    score,
  });
}

if (fromCsv.size !== 148) {
  console.error(`Expected 148 GGGI CSV rows, got ${fromCsv.size}`);
  process.exit(1);
}

const errors = [];
const extractCodes = Object.keys(GGGI_2025_DATA).sort();
if (extractCodes.length !== 148) {
  errors.push(`gggi2025Data has ${extractCodes.length} codes, expected 148`);
}

for (const [code, exp] of fromCsv) {
  const extract = GGGI_2025_DATA[code];
  const demo = DEMOCRACY_DATA[code]?.genderGap;
  if (!extract) errors.push(`${code}: missing from gggi2025Data`);
  else if (JSON.stringify(extract) !== JSON.stringify(exp)) {
    errors.push(
      `${code}: extract drift\n  got ${JSON.stringify(extract)}\n  exp ${JSON.stringify(exp)}`,
    );
  }
  if (!demo) errors.push(`${code}: missing genderGap in democracyData`);
  else if (JSON.stringify(demo) !== JSON.stringify(exp)) {
    errors.push(
      `${code}: democracyData drift\n  got ${JSON.stringify(demo)}\n  exp ${JSON.stringify(exp)}`,
    );
  }
}

const factsGg = loadFactsGenderGap(readFileSync(FACTS_TS, "utf8"));
for (const [code, exp] of fromCsv) {
  const facts = factsGg.get(code);
  if (!facts) errors.push(`${code}: missing genderGap in countryFacts`);
  else if (JSON.stringify(facts) !== JSON.stringify(exp)) {
    errors.push(
      `${code}: countryFacts drift\n  got ${JSON.stringify(facts)}\n  exp ${JSON.stringify(exp)}`,
    );
  }
}

for (const [code, entry] of Object.entries(DEMOCRACY_DATA)) {
  if (entry.genderGap && !fromCsv.has(code)) {
    errors.push(`${code}: democracyData has genderGap but CSV does not`);
  }
}
for (const code of factsGg.keys()) {
  if (!fromCsv.has(code)) {
    errors.push(`${code}: countryFacts has genderGap but CSV does not`);
  }
}

const spots = [
  ["IS", 1, 0.926, "90–100%"],
  ["FI", 2, 0.879, "80–89%"],
  ["NO", 3, 0.863, "80–89%"],
  ["GB", 4, 0.838, "80–89%"],
  ["NZ", 5, 0.827, "80–89%"],
  ["MD", 7, 0.813, "80–89%"],
  ["US", 42, 0.756, "70–79%"],
  ["JP", 118, 0.666, "60–69%"],
  ["PK", 148, 0.567, "50–59%"],
];
for (const [code, rank, score, rating] of spots) {
  const e = fromCsv.get(code);
  if (!e || e.rank !== rank || e.score !== score || e.rating !== rating) {
    errors.push(`spot-check failed for ${code}: ${JSON.stringify(e)}`);
  }
}

const uiFiles = [
  ["src/lib/democracyColors.ts", "gender-gap"],
  ["src/components/DemocracyMapControl.tsx", "DEMOCRACY_INDEX_KEYS"],
  ["src/components/DemocracyIndexChart.tsx", "DEMOCRACY_INDEX_KEYS"],
  ["src/components/EntitySummary.tsx", "genderGap"],
  ["src/components/FlagGrid.tsx", "gender-gap"],
];
for (const [rel, needle] of uiFiles) {
  const text = readFileSync(resolve(__dirname, "..", rel), "utf8");
  if (!text.includes(needle)) {
    errors.push(`${rel} no longer references ${needle}`);
  }
}

if (errors.length) {
  console.error(`GGGI check FAILED (${errors.length} errors):`);
  for (const e of errors.slice(0, 40)) console.error(" -", e);
  if (errors.length > 40) console.error(` … and ${errors.length - 40} more`);
  process.exit(1);
}

console.log(
  `GGGI check OK — ${fromCsv.size} countries match WEF Global Gender Gap Index 2025 (rank, score, band).`,
);
