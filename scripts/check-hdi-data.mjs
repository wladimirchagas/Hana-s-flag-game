#!/usr/bin/env node
/**
 * Validate bundled UNDP Human Development Index (HDR 2025 / HDI 2023) data
 * against the official extract (scripts/data/hdr25-hdi-2023.csv) and the
 * committed HDI_2023_DATA module.
 *
 * Fails on: wrong rank/score/category, nested field placement, drift between
 * democracyData.mjs / countryFacts.ts / hdi2023Data.mjs, fabricating entries
 * for codes absent from the official extract, or dropping the UI wiring.
 *
 * Run: node scripts/check-hdi-data.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DEMOCRACY_DATA } from "./data/democracyData.mjs";
import { HDI_2023_DATA } from "./data/hdi2023Data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSV = resolve(__dirname, "data/hdr25-hdi-2023.csv");
const FACTS_TS = resolve(__dirname, "../src/data/countryFacts.ts");

/** ISO 3166-1 alpha-3 → alpha-2 for ranked HDR rows we keep in the app. */
const A3_TO_A2 = {
  AFG: "AF", ALB: "AL", DZA: "DZ", AND: "AD", AGO: "AO", ATG: "AG", ARG: "AR",
  ARM: "AM", AUS: "AU", AUT: "AT", AZE: "AZ", BHS: "BS", BHR: "BH", BGD: "BD",
  BRB: "BB", BLR: "BY", BEL: "BE", BLZ: "BZ", BEN: "BJ", BTN: "BT", BOL: "BO",
  BIH: "BA", BWA: "BW", BRA: "BR", BRN: "BN", BGR: "BG", BFA: "BF", BDI: "BI",
  CPV: "CV", KHM: "KH", CMR: "CM", CAN: "CA", CAF: "CF", TCD: "TD", CHL: "CL",
  CHN: "CN", COL: "CO", COM: "KM", COG: "CG", COD: "CD", CRI: "CR", CIV: "CI",
  HRV: "HR", CUB: "CU", CYP: "CY", CZE: "CZ", DNK: "DK", DJI: "DJ", DMA: "DM",
  DOM: "DO", ECU: "EC", EGY: "EG", SLV: "SV", GNQ: "GQ", ERI: "ER", EST: "EE",
  SWZ: "SZ", ETH: "ET", FJI: "FJ", FIN: "FI", FRA: "FR", GAB: "GA", GMB: "GM",
  GEO: "GE", DEU: "DE", GHA: "GH", GRC: "GR", GRD: "GD", GTM: "GT", GIN: "GN",
  GNB: "GW", GUY: "GY", HTI: "HT", HND: "HN", HUN: "HU", ISL: "IS", IND: "IN",
  IDN: "ID", IRN: "IR", IRQ: "IQ", IRL: "IE", ISR: "IL", ITA: "IT", JAM: "JM",
  JPN: "JP", JOR: "JO", KAZ: "KZ", KEN: "KE", KIR: "KI", KOR: "KR", KWT: "KW",
  KGZ: "KG", LAO: "LA", LVA: "LV", LBN: "LB", LSO: "LS", LBR: "LR", LBY: "LY",
  LIE: "LI", LTU: "LT", LUX: "LU", MDG: "MG", MWI: "MW", MYS: "MY", MDV: "MV",
  MLI: "ML", MLT: "MT", MHL: "MH", MRT: "MR", MUS: "MU", MEX: "MX", FSM: "FM",
  MDA: "MD", MNG: "MN", MNE: "ME", MAR: "MA", MOZ: "MZ", MMR: "MM", NAM: "NA",
  NRU: "NR", NPL: "NP", NLD: "NL", NZL: "NZ", NIC: "NI", NER: "NE", NGA: "NG",
  MKD: "MK", NOR: "NO", OMN: "OM", PAK: "PK", PLW: "PW", PSE: "PS", PAN: "PA",
  PNG: "PG", PRY: "PY", PER: "PE", PHL: "PH", POL: "PL", PRT: "PT", QAT: "QA",
  ROU: "RO", RUS: "RU", RWA: "RW", KNA: "KN", LCA: "LC", VCT: "VC", WSM: "WS",
  SMR: "SM", STP: "ST", SAU: "SA", SEN: "SN", SRB: "RS", SYC: "SC", SLE: "SL",
  SGP: "SG", SVK: "SK", SVN: "SI", SLB: "SB", SOM: "SO", ZAF: "ZA", SSD: "SS",
  ESP: "ES", LKA: "LK", SDN: "SD", SUR: "SR", SWE: "SE", CHE: "CH", SYR: "SY",
  TJK: "TJ", TZA: "TZ", THA: "TH", TLS: "TL", TGO: "TG", TON: "TO", TTO: "TT",
  TUN: "TN", TUR: "TR", TKM: "TM", TUV: "TV", UGA: "UG", UKR: "UA", ARE: "AE",
  GBR: "GB", USA: "US", URY: "UY", UZB: "UZ", VUT: "VU", VEN: "VE", VNM: "VN",
  YEM: "YE", ZMB: "ZM", ZWE: "ZW",
};

/** Ranked in the official CSV but not a game UN member — must stay absent. */
const SKIP_A3 = new Set(["HKG"]);

function category(score) {
  // UNDP Human Development Report cut-offs (HDR technical notes).
  if (score >= 0.8) return "Very High";
  if (score >= 0.7) return "High";
  if (score >= 0.55) return "Medium";
  return "Low";
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    // Country names can contain commas — parse carefully via simple state.
    const cols = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
        continue;
      }
      if (ch === "," && !inQuotes) {
        cols.push(cur);
        cur = "";
        continue;
      }
      cur += ch;
    }
    cols.push(cur);
    const row = {};
    headers.forEach((h, i) => {
      row[h] = cols[i];
    });
    return row;
  });
}

/** Competition rank from a score map (tied scores share min rank; next skips). */
function competitionRanks(scoreByA3) {
  const entries = Object.entries(scoreByA3).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const ranks = {};
  let i = 0;
  while (i < entries.length) {
    const score = entries[i][1];
    let j = i;
    while (j < entries.length && entries[j][1] === score) j++;
    const rank = i + 1;
    for (let k = i; k < j; k++) ranks[entries[k][0]] = rank;
    i = j;
  }
  return ranks;
}

function loadFactsHdi(src) {
  /** @type {Map<string, object>} */
  const out = new Map();
  const lineRe = /^  ([A-Z]{2}): (\{.*\}),$/gm;
  let m;
  while ((m = lineRe.exec(src))) {
    const code = m[1];
    const obj = JSON.parse(m[2]);
    const hdi = obj.democracy?.hdi;
    if (hdi) out.set(code, hdi);
  }
  return out;
}

const rows = parseCsv(readFileSync(CSV, "utf8"));
if (rows.length !== 193) {
  console.error(`Expected 193 ranked HDR rows in slim CSV, got ${rows.length}`);
  process.exit(1);
}

const score2022 = {};
for (const r of rows) {
  if ((r.hdi_2022 || "").trim()) score2022[r.iso3] = Number(r.hdi_2022);
}
const rank2022 = competitionRanks(score2022);

const expected = new Map();
for (const r of rows) {
  const a3 = r.iso3.trim().toUpperCase();
  if (SKIP_A3.has(a3)) continue;
  const a2 = A3_TO_A2[a3];
  if (!a2) {
    console.error(`Unmapped HDR ISO ${a3} (${r.country}) — add mapping or SKIP`);
    process.exit(1);
  }
  const score = Number(r.hdi_2023);
  const rank = Number(r.hdi_rank_2023);
  /** @type {{ year: number, rating: string, rank: number, rankChange?: number, score: number }} */
  const entry = {
    year: 2023,
    rating: r.hdicode,
    rank,
  };
  if (a3 in rank2022) entry.rankChange = rank2022[a3] - rank;
  entry.score = score;
  if (category(score) !== r.hdicode) {
    console.error(`${a3}: hdicode ${r.hdicode} ≠ band for score ${score}`);
    process.exit(1);
  }
  expected.set(a2, entry);
}

const factsHdi = loadFactsHdi(readFileSync(FACTS_TS, "utf8"));
const errors = [];

for (const [code, exp] of expected) {
  const extract = HDI_2023_DATA[code];
  const demo = DEMOCRACY_DATA[code]?.hdi;
  const facts = factsHdi.get(code);
  if (!extract) errors.push(`${code}: missing from HDI_2023_DATA`);
  if (!demo) errors.push(`${code}: missing hdi in democracyData`);
  if (!facts) errors.push(`${code}: missing hdi in countryFacts`);
  if (extract && JSON.stringify(extract) !== JSON.stringify(exp)) {
    errors.push(
      `${code}: hdi2023Data mismatch\n  got ${JSON.stringify(extract)}\n  exp ${JSON.stringify(exp)}`,
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
  if (DEMOCRACY_DATA[code]?.freedomHouse?.hdi) {
    errors.push(`${code}: hdi wrongly nested under freedomHouse`);
  }
}

for (const [code, entry] of Object.entries(DEMOCRACY_DATA)) {
  if (entry.hdi && !expected.has(code)) {
    errors.push(`${code}: hdi present but not in official HDR extract mapping`);
  }
}
for (const code of Object.keys(HDI_2023_DATA)) {
  if (!expected.has(code)) {
    errors.push(`${code}: HDI_2023_DATA has code not in official extract mapping`);
  }
}
for (const code of factsHdi.keys()) {
  if (!expected.has(code)) {
    errors.push(`${code}: countryFacts hdi not in official HDR extract mapping`);
  }
}

// Spot-checks against published HDR 2025 Table 1 headline figures.
const spots = [
  ["IS", 1, 0.972, "Very High", 2],
  ["NO", 2, 0.97, "Very High", -1],
  ["CH", 2, 0.97, "Very High", 0],
  ["DK", 4, 0.962, "Very High", 0],
  ["US", 17, 0.938, "Very High", 1],
  ["GB", 13, 0.946, "Very High", -2],
  ["CN", 78, 0.797, "High", -4],
  ["BR", 84, 0.786, "High", 2],
  ["IN", 130, 0.685, "Medium", 3],
  ["AF", 181, 0.496, "Low", -1],
  ["SS", 193, 0.388, "Low", -2],
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

// CAF has no hdi_2022 → no rankChange.
const cf = expected.get("CF");
if (!cf || cf.rank !== 191 || cf.score !== 0.414 || "rankChange" in cf) {
  errors.push(`CAF (CF) must omit rankChange: ${JSON.stringify(cf)}`);
}

if (expected.size !== 192) {
  errors.push(`expected 192 mapped UN members, got ${expected.size}`);
}

const uiFiles = [
  ["src/lib/democracyColors.ts", "hdi"],
  ["src/components/DemocracyMapControl.tsx", "DEMOCRACY_INDEX_KEYS"],
  ["src/components/DemocracyIndexChart.tsx", "DEMOCRACY_INDEX_KEYS"],
  ["src/components/EntitySummary.tsx", "formatHdiIndex"],
  ["src/components/FlagGrid.tsx", '"hdi"'],
];
for (const [rel, needle] of uiFiles) {
  const text = readFileSync(resolve(__dirname, "..", rel), "utf8");
  if (!text.includes(needle)) {
    errors.push(`${rel} no longer references ${needle}`);
  }
}

if (errors.length) {
  console.error(`HDI check FAILED (${errors.length} errors):`);
  for (const e of errors.slice(0, 40)) console.error(" -", e);
  if (errors.length > 40) console.error(` … and ${errors.length - 40} more`);
  process.exit(1);
}

console.log(
  `HDI check OK — ${expected.size} countries match official HDR 2025 / HDI 2023 extract (rank, score, category, rankChange).`,
);
