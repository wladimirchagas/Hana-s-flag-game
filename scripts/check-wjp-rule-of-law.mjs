#!/usr/bin/env node
/**
 * Validate bundled WJP Rule of Law Index 2025 data against the official WJP
 * CSVs (scripts/data/wjp-rule-of-law-2025.csv + 2024 for rankChange) and the
 * committed extract in scripts/data/wjp2025Data.mjs.
 *
 * Fails on: wrong rank/score/rankChange, wrong score band, nested field
 * placement, drift between democracyData.mjs and countryFacts.ts, or
 * fabricating entries for codes absent from the official CSV.
 *
 * Run: node scripts/check-wjp-rule-of-law.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DEMOCRACY_DATA } from "./data/democracyData.mjs";
import {
  WJP_2025_DATA,
  wjpBandFromScore,
} from "./data/wjp2025Data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const CSV_2025 = resolve(__dirname, "data/wjp-rule-of-law-2025.csv");
const CSV_2024 = resolve(__dirname, "data/wjp-rule-of-law-2024.csv");
const FACTS_TS = resolve(ROOT, "src/data/countryFacts.ts");

/** ISO 3166-1 alpha-3 → alpha-2 for WJP rows we keep. */
const A3_TO_A2 = {
  AFG: "AF", AGO: "AO", ALB: "AL", ARE: "AE", ARG: "AR", ARM: "AM", ATG: "AG",
  AUS: "AU", AUT: "AT", AZE: "AZ", BDI: "BI", BEL: "BE", BEN: "BJ", BFA: "BF",
  BGD: "BD", BGR: "BG", BHR: "BH", BHS: "BS", BIH: "BA", BLR: "BY", BLZ: "BZ",
  BOL: "BO", BRA: "BR", BRB: "BB", BRN: "BN", BTN: "BT", BWA: "BW", CAF: "CF",
  CAN: "CA", CHE: "CH", CHL: "CL", CHN: "CN", CIV: "CI", CMR: "CM", COD: "CD",
  COG: "CG", COL: "CO", COM: "KM", CPV: "CV", CRI: "CR", CUB: "CU", CYP: "CY",
  CZE: "CZ", DEU: "DE", DJI: "DJ", DMA: "DM", DNK: "DK", DOM: "DO", DZA: "DZ",
  ECU: "EC", EGY: "EG", ERI: "ER", ESP: "ES", EST: "EE", ETH: "ET", FIN: "FI",
  FJI: "FJ", FRA: "FR", GAB: "GA", GBR: "GB", GEO: "GE", GHA: "GH", GIN: "GN",
  GMB: "GM", GNB: "GW", GNQ: "GQ", GRC: "GR", GRD: "GD", GTM: "GT", GUY: "GY",
  HND: "HN", HRV: "HR", HTI: "HT", HUN: "HU", IDN: "ID", IND: "IN", IRL: "IE",
  IRN: "IR", IRQ: "IQ", ISL: "IS", ISR: "IL", ITA: "IT", JAM: "JM", JOR: "JO",
  JPN: "JP", KAZ: "KZ", KEN: "KE", KGZ: "KG", KHM: "KH", KNA: "KN", KOR: "KR",
  KWT: "KW", LAO: "LA", LBN: "LB", LBR: "LR", LBY: "LY", LCA: "LC", LIE: "LI",
  LKA: "LK", LSO: "LS", LTU: "LT", LUX: "LU", LVA: "LV", MAR: "MA", MDA: "MD",
  MDG: "MG", MDV: "MV", MEX: "MX", MKD: "MK", MLI: "ML", MLT: "MT", MMR: "MM",
  MNE: "ME", MNG: "MN", MOZ: "MZ", MRT: "MR", MUS: "MU", MWI: "MW", MYS: "MY",
  NAM: "NA", NER: "NE", NGA: "NG", NIC: "NI", NLD: "NL", NOR: "NO", NPL: "NP",
  NZL: "NZ", OMN: "OM", PAK: "PK", PAN: "PA", PER: "PE", PHL: "PH", PNG: "PG",
  POL: "PL", PRT: "PT", PRY: "PY", QAT: "QA", ROU: "RO", RUS: "RU", RWA: "RW",
  SAU: "SA", SDN: "SD", SEN: "SN", SGP: "SG", SLE: "SL", SLV: "SV", SOM: "SO",
  SRB: "RS", SSD: "SS", SUR: "SR", SVK: "SK", SVN: "SI", SWE: "SE", SWZ: "SZ",
  SYC: "SC", SYR: "SY", TCD: "TD", TGO: "TG", THA: "TH", TJK: "TJ", TKM: "TM",
  TLS: "TL", TON: "TO", TTO: "TT", TUN: "TN", TUR: "TR", TZA: "TZ", UGA: "UG",
  UKR: "UA", URY: "UY", USA: "US", UZB: "UZ", VCT: "VC", VEN: "VE", VNM: "VN",
  VUT: "VU", WSM: "WS", YEM: "YE", ZAF: "ZA", ZMB: "ZM", ZWE: "ZW",
};

/** In the WJP sample but not UN members in this app — must stay absent. */
const SKIP_A3 = new Set(["HKG", "XKX"]);

/** Published PDF anchors (rounded score + global rank + YoY rank change). */
const ANCHORS = {
  DK: { rank: 1, score: 0.9, rankChange: 0 },
  NO: { rank: 2, score: 0.89, rankChange: 0 },
  FI: { rank: 3, score: 0.87, rankChange: 0 },
  SE: { rank: 4, score: 0.85, rankChange: 0 },
  NZ: { rank: 5, score: 0.83, rankChange: 1 },
  DE: { rank: 6, score: 0.83, rankChange: -1 },
  US: { rank: 27, score: 0.68, rankChange: -1 },
  DO: { rank: 76, score: 0.5, rankChange: 11 },
  IN: { rank: 86, score: 0.49, rankChange: -6 },
  TN: { rank: 85, score: 0.49, rankChange: -8 },
  VE: { rank: 143, score: 0.26, rankChange: 0 },
  QA: { rank: 41, score: 0.62 }, // new in 2025 — no rankChange
};

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      continue;
    }
    if (ch === ",") {
      row.push(cell);
      cell = "";
      continue;
    }
    if (ch === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }
    if (ch === "\r") continue;
    cell += ch;
  }
  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

function loadYear(path) {
  const rows = parseCsv(readFileSync(path, "utf8").replace(/^\uFEFF/, ""));
  if (rows[0][0] !== "Country") throw new Error(`${path}: expected Country header`);
  if (rows[1][0] !== "Country Code") throw new Error(`${path}: expected Country Code row`);
  if (rows[4][0] !== "WJP Rule of Law Index: Overall Score") {
    throw new Error(`${path}: expected Overall Score row`);
  }
  const countries = rows[0].slice(1);
  const codes = rows[1].slice(1);
  const scores = rows[4].slice(1).map(Number);
  if (countries.length !== codes.length || codes.length !== scores.length) {
    throw new Error(`${path}: column count mismatch`);
  }
  /** @type {Record<string, { name: string, score: number }>} */
  const out = {};
  for (let i = 0; i < codes.length; i++) {
    out[codes[i]] = { name: countries[i], score: scores[i] };
  }
  return out;
}

function competitionRanks(data, codeset) {
  const items = [...(codeset || Object.keys(data))].map((a3) => ({
    a3,
    name: data[a3].name,
    score: data[a3].score,
  }));
  items.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  /** @type {Record<string, number>} */
  const out = {};
  let i = 0;
  while (i < items.length) {
    let j = i;
    while (j < items.length && items[j].score === items[i].score) j++;
    for (let k = i; k < j; k++) out[items[k].a3] = i + 1;
    i = j;
  }
  return out;
}

function loadFactsWjp(src) {
  /** @type {Map<string, object>} */
  const out = new Map();
  const lineRe = /^  ([A-Z]{2}): (\{.*\}),$/gm;
  let m;
  while ((m = lineRe.exec(src))) {
    const code = m[1];
    const obj = JSON.parse(m[2]);
    const wjp = obj.democracy?.wjpRuleOfLaw;
    if (wjp) out.set(code, wjp);
  }
  return out;
}

let failures = 0;
function fail(msg) {
  console.error("FAIL:", msg);
  failures++;
}

const d25 = loadYear(CSV_2025);
const d24 = loadYear(CSV_2024);
if (Object.keys(d25).length !== 143) {
  fail(`Expected 143 WJP 2025 countries, got ${Object.keys(d25).length}`);
}
if (Object.keys(d24).length !== 142) {
  fail(`Expected 142 WJP 2024 countries, got ${Object.keys(d24).length}`);
}

const r25Full = competitionRanks(d25);
const common = new Set(Object.keys(d25).filter((a3) => a3 in d24));
const r25Common = competitionRanks(d25, common);
const r24Common = competitionRanks(d24, common);

/** @type {Map<string, object>} */
const expected = new Map();
for (const [a3, info] of Object.entries(d25)) {
  if (SKIP_A3.has(a3)) continue;
  const a2 = A3_TO_A2[a3];
  if (!a2) {
    fail(`Unmapped WJP ISO ${a3} (${info.name}) — add mapping or SKIP`);
    continue;
  }
  const score = Math.round(info.score * 100) / 100;
  /** @type {{ year: number, rating: string, rank: number, rankChange?: number, score: number }} */
  const entry = {
    year: 2025,
    rating: wjpBandFromScore(score),
    rank: r25Full[a3],
    score,
  };
  if (common.has(a3)) entry.rankChange = r24Common[a3] - r25Common[a3];
  expected.set(a2, entry);
}

if (expected.size !== 141) {
  fail(`Expected 141 bundled WJP countries (143 − HKG − XKX), got ${expected.size}`);
}

const extractCodes = Object.keys(WJP_2025_DATA).sort();
if (extractCodes.length !== expected.size) {
  fail(`wjp2025Data.mjs has ${extractCodes.length} codes, expected ${expected.size}`);
}

const factsWjp = loadFactsWjp(readFileSync(FACTS_TS, "utf8"));

for (const [code, src] of expected) {
  const extract = WJP_2025_DATA[code];
  const demo = DEMOCRACY_DATA[code]?.wjpRuleOfLaw;
  const facts = factsWjp.get(code);
  if (!extract) {
    fail(`${code}: missing from WJP_2025_DATA`);
    continue;
  }
  if (!demo) {
    fail(`${code}: missing from DEMOCRACY_DATA`);
    continue;
  }
  if (!facts) {
    fail(`${code}: missing from COUNTRY_FACTS`);
    continue;
  }
  for (const key of ["year", "rating", "rank", "score"]) {
    if (extract[key] !== src[key]) fail(`${code}: extract.${key}=${extract[key]} ≠ ${src[key]}`);
    if (demo[key] !== src[key]) fail(`${code}: democracyData.${key}=${demo[key]} ≠ ${src[key]}`);
    if (facts[key] !== src[key]) fail(`${code}: countryFacts.${key}=${facts[key]} ≠ ${src[key]}`);
  }
  const srcCh = src.rankChange;
  if (srcCh === undefined) {
    if ("rankChange" in extract) fail(`${code}: extract has rankChange but source has none`);
    if ("rankChange" in demo) fail(`${code}: democracyData has rankChange but source has none`);
    if ("rankChange" in facts) fail(`${code}: countryFacts has rankChange but source has none`);
  } else {
    if (extract.rankChange !== srcCh) fail(`${code}: extract.rankChange=${extract.rankChange} ≠ ${srcCh}`);
    if (demo.rankChange !== srcCh) fail(`${code}: democracyData.rankChange=${demo.rankChange} ≠ ${srcCh}`);
    if (facts.rankChange !== srcCh) fail(`${code}: countryFacts.rankChange=${facts.rankChange} ≠ ${srcCh}`);
  }
  if (wjpBandFromScore(src.score) !== src.rating) {
    fail(`${code}: rating band ${src.rating} does not match score ${src.score}`);
  }
}

for (const code of extractCodes) {
  if (!expected.has(code)) fail(`${code}: in extract but not in official CSV mapping`);
}
for (const [code, entry] of Object.entries(DEMOCRACY_DATA)) {
  if (entry.wjpRuleOfLaw && !expected.has(code)) {
    fail(`${code}: fabricated wjpRuleOfLaw in DEMOCRACY_DATA`);
  }
}
for (const [code] of factsWjp) {
  if (!expected.has(code)) fail(`${code}: fabricated wjpRuleOfLaw in COUNTRY_FACTS`);
}

for (const [code, anchor] of Object.entries(ANCHORS)) {
  const got = expected.get(code);
  if (!got) {
    fail(`anchor ${code}: missing`);
    continue;
  }
  if (got.rank !== anchor.rank) fail(`anchor ${code}: rank ${got.rank} ≠ ${anchor.rank}`);
  if (got.score !== anchor.score) fail(`anchor ${code}: score ${got.score} ≠ ${anchor.score}`);
  if ("rankChange" in anchor) {
    if (got.rankChange !== anchor.rankChange) {
      fail(`anchor ${code}: rankChange ${got.rankChange} ≠ ${anchor.rankChange}`);
    }
  } else if ("rankChange" in got) {
    fail(`anchor ${code}: unexpected rankChange ${got.rankChange}`);
  }
}

// UI wiring — the index must stay reachable from the shared democracy menus.
const colorsSrc = readFileSync(resolve(ROOT, "src/lib/democracyColors.ts"), "utf8");
const gridSrc = readFileSync(resolve(ROOT, "src/components/FlagGrid.tsx"), "utf8");
const summarySrc = readFileSync(resolve(ROOT, "src/components/EntitySummary.tsx"), "utf8");
for (const [label, src, needle] of [
  ["democracyColors.ts", colorsSrc, '"wjp-rule-of-law"'],
  ["democracyColors.ts", colorsSrc, "wjpRuleOfLaw"],
  ["FlagGrid.tsx", gridSrc, '"wjp-rule-of-law"'],
  ["FlagGrid.tsx", gridSrc, "wjpRuleOfLaw"],
  ["EntitySummary.tsx", summarySrc, "wjpRuleOfLaw"],
  ["EntitySummary.tsx", summarySrc, "WJP Rule of Law Index"],
]) {
  if (!src.includes(needle)) fail(`${label} no longer references ${needle}`);
}

if (failures > 0) {
  console.error(`\n${failures} failure(s)`);
  process.exit(1);
}
console.log(`OK — WJP Rule of Law Index 2025: ${expected.size} countries validated against official CSVs`);
