#!/usr/bin/env node
/**
 * Validate bundled RSF World Press Freedom Index 2026 data against the
 * official RSF CSV (scripts/data/rsf-press-freedom-2026.csv).
 *
 * Fails on: wrong rank/score/rankChange, wrong category band, nested field
 * placement, drift between democracyData.mjs and countryFacts.ts, or
 * fabricating entries for codes absent from the official CSV.
 *
 * Run: node scripts/check-rsf-press-freedom.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DEMOCRACY_DATA } from "./data/democracyData.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSV = resolve(__dirname, "data/rsf-press-freedom-2026.csv");
const FACTS_TS = resolve(__dirname, "../src/data/countryFacts.ts");

/** @type {Record<string, string>} ISO 3166-1 alpha-3 → alpha-2 for RSF rows we keep */
const A3_TO_A2 = {
  AFG: "AF", AGO: "AO", ALB: "AL", AND: "AD", ARE: "AE", ARG: "AR", ARM: "AM",
  AUS: "AU", AUT: "AT", AZE: "AZ", BDI: "BI", BEL: "BE", BEN: "BJ", BFA: "BF",
  BGD: "BD", BGR: "BG", BHR: "BH", BIH: "BA", BLR: "BY", BLZ: "BZ", BOL: "BO",
  BRA: "BR", BRN: "BN", BTN: "BT", BWA: "BW", CAF: "CF", CAN: "CA", CHE: "CH",
  CHL: "CL", CHN: "CN", CIV: "CI", CMR: "CM", COD: "CD", COG: "CG", COL: "CO",
  COM: "KM", CPV: "CV", CRI: "CR", CUB: "CU", CYP: "CY", CZE: "CZ", DEU: "DE",
  DJI: "DJ", DNK: "DK", DOM: "DO", DZA: "DZ", ECU: "EC", EGY: "EG", ERI: "ER",
  ESP: "ES", EST: "EE", ETH: "ET", FIN: "FI", FJI: "FJ", FRA: "FR", GAB: "GA",
  GBR: "GB", GEO: "GE", GHA: "GH", GIN: "GN", GMB: "GM", GNB: "GW", GNQ: "GQ",
  GRC: "GR", GTM: "GT", GUY: "GY", HND: "HN", HRV: "HR", HTI: "HT", HUN: "HU",
  IDN: "ID", IND: "IN", IRL: "IE", IRN: "IR", IRQ: "IQ", ISL: "IS", ISR: "IL",
  ITA: "IT", JAM: "JM", JOR: "JO", JPN: "JP", KAZ: "KZ", KEN: "KE", KGZ: "KG",
  KHM: "KH", KOR: "KR", KWT: "KW", LAO: "LA", LBN: "LB", LBR: "LR", LBY: "LY",
  LIE: "LI", LKA: "LK", LSO: "LS", LTU: "LT", LUX: "LU", LVA: "LV", MAR: "MA",
  MDA: "MD", MDG: "MG", MDV: "MV", MEX: "MX", MKD: "MK", MLI: "ML", MLT: "MT",
  MMR: "MM", MNE: "ME", MNG: "MN", MOZ: "MZ", MRT: "MR", MUS: "MU", MWI: "MW",
  MYS: "MY", NAM: "NA", NER: "NE", NGA: "NG", NIC: "NI", NLD: "NL", NOR: "NO",
  NPL: "NP", NZL: "NZ", OMN: "OM", PAK: "PK", PAN: "PA", PER: "PE", PHL: "PH",
  PNG: "PG", POL: "PL", PRK: "KP", PRT: "PT", PRY: "PY", PSE: "PS", QAT: "QA",
  ROU: "RO", RUS: "RU", RWA: "RW", SAU: "SA", SDN: "SD", SEN: "SN", SGP: "SG",
  SLE: "SL", SLV: "SV", SOM: "SO", SRB: "RS", SSD: "SS", SUR: "SR", SVK: "SK",
  SVN: "SI", SWE: "SE", SWZ: "SZ", SYC: "SC", SYR: "SY", TCD: "TD", TGO: "TG",
  THA: "TH", TJK: "TJ", TKM: "TM", TLS: "TL", TON: "TO", TTO: "TT", TUN: "TN",
  TUR: "TR", TZA: "TZ", UGA: "UG", UKR: "UA", URY: "UY", USA: "US", UZB: "UZ",
  VEN: "VE", VNM: "VN", WSM: "WS", YEM: "YE", ZAF: "ZA", ZMB: "ZM", ZWE: "ZW",
};

/** Territories in the RSF CSV that are not UN members in this app — must stay absent. */
const SKIP_A3 = new Set(["CSS", "CTU", "XKX", "HKG", "TWN"]);

function parseNum(s) {
  return Number(String(s).replace(",", "."));
}

function category(score) {
  // RSF methodology 2026 bands (inclusive lower bound, exclusive upper except 100).
  if (score >= 85) return "Good";
  if (score >= 70) return "Satisfactory";
  if (score >= 55) return "Problematic";
  if (score >= 40) return "Difficult";
  return "Very serious";
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(";");
  return lines.slice(1).map((line) => {
    const cols = line.split(";");
    const row = {};
    headers.forEach((h, i) => {
      row[h] = cols[i];
    });
    return row;
  });
}

/** Pull `democracy.rsfPress` out of the generated countryFacts.ts without importing TS. */
function loadFactsRsfPress(src) {
  /** @type {Map<string, object>} */
  const out = new Map();
  const lineRe = /^  ([A-Z]{2}): (\{.*\}),$/gm;
  let m;
  while ((m = lineRe.exec(src))) {
    const code = m[1];
    const obj = JSON.parse(m[2]);
    const rp = obj.democracy?.rsfPress;
    if (rp) out.set(code, rp);
  }
  return out;
}

const rows = parseCsv(readFileSync(CSV, "utf8"));
if (rows.length !== 180) {
  console.error(`Expected 180 RSF rows, got ${rows.length}`);
  process.exit(1);
}

const expected = new Map();
for (const r of rows) {
  const a3 = r.ISO.trim().toUpperCase();
  if (SKIP_A3.has(a3)) continue;
  const a2 = A3_TO_A2[a3];
  if (!a2) {
    console.error(`Unmapped RSF ISO ${a3} (${r.Country_EN}) — add mapping or SKIP`);
    process.exit(1);
  }
  const score = parseNum(r["Score 2026"]);
  expected.set(a2, {
    year: 2026,
    rating: category(score),
    rank: Number(r.Rank),
    rankChange: Number(r["Rank evolution"] || 0),
    score: Math.round(score * 100) / 100,
  });
}

const factsRsf = loadFactsRsfPress(readFileSync(FACTS_TS, "utf8"));
const errors = [];

for (const [code, exp] of expected) {
  const demo = DEMOCRACY_DATA[code]?.rsfPress;
  const facts = factsRsf.get(code);
  if (!demo) errors.push(`${code}: missing rsfPress in democracyData`);
  if (!facts) errors.push(`${code}: missing rsfPress in countryFacts`);
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
  if (DEMOCRACY_DATA[code]?.freedomHouse?.rsfPress) {
    errors.push(`${code}: rsfPress wrongly nested under freedomHouse`);
  }
}

for (const [code, entry] of Object.entries(DEMOCRACY_DATA)) {
  if (entry.rsfPress && !expected.has(code)) {
    errors.push(`${code}: rsfPress present but not in official RSF CSV mapping`);
  }
}
for (const code of factsRsf.keys()) {
  if (!expected.has(code)) {
    errors.push(`${code}: countryFacts rsfPress not in official RSF CSV mapping`);
  }
}

const spots = [
  ["NO", 1, 92.72, "Good", 0],
  ["NL", 2, 88.92, "Good", 1],
  ["EE", 3, 88.54, "Good", -1],
  ["US", 64, 62.61, "Problematic", -7],
  ["CN", 178, 13.85, "Very serious", 0],
  ["ER", 180, 10.24, "Very serious", 0],
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

if (expected.size !== 175) {
  errors.push(`expected 175 mapped UN members, got ${expected.size}`);
}

const uiFiles = [
  ["src/lib/democracyColors.ts", "rsf-press"],
  // Menu options come from DEMOCRACY_INDEX_KEYS (which includes rsf-press in
  // democracyColors.ts) — require that shared list, not a duplicated literal.
  ["src/components/DemocracyMapControl.tsx", "DEMOCRACY_INDEX_KEYS"],
  ["src/components/DemocracyIndexChart.tsx", "DEMOCRACY_INDEX_KEYS"],
  ["src/components/EntitySummary.tsx", "rsfPress"],
  ["src/components/FlagGrid.tsx", "rsf-press"],
];
for (const [rel, needle] of uiFiles) {
  const text = readFileSync(resolve(__dirname, "..", rel), "utf8");
  if (!text.includes(needle)) {
    errors.push(`${rel} no longer references ${needle}`);
  }
}

if (errors.length) {
  console.error(`RSF press-freedom check FAILED (${errors.length} errors):`);
  for (const e of errors.slice(0, 40)) console.error(" -", e);
  if (errors.length > 40) console.error(` … and ${errors.length - 40} more`);
  process.exit(1);
}

console.log(
  `RSF press-freedom check OK — ${expected.size} countries match official 2026 CSV (rank, score, category, rankChange).`,
);
