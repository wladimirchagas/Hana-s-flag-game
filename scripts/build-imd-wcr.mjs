#!/usr/bin/env node
/**
 * Build IMD World Competitiveness Ranking 2025 extracts from the committed CSV
 * (scripts/data/imd-wcr-2025.csv), transcribed from the official IMD World
 * Competitiveness Booklet 2025 ranking table.
 *
 * Writes:
 *   - scripts/data/imdWcr2025Data.mjs
 *   - merges `imdCompetitiveness` into scripts/data/democracyData.mjs
 *
 * Source booklet:
 *   https://www.imd.org/wp-content/uploads/2025/06/Booklet-WCR-2025-v3.pdf
 *   sha256 fd693b1cc736621de75c976d655246fcc20448e819a39fb9e04df54112c7fe2d
 * Ranking tables reprint (same overall ranks/scores):
 *   https://productivitysa.co.za/wp-content/uploads/2025/06/IMD-2025-Ranking-Tables.pdf
 *   sha256 32a333a279311a3bb301061724dd1ec817fa845e41f71f1672d339834367bab7
 *
 * Usage: node scripts/build-imd-wcr.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DEMOCRACY_DATA } from "./data/democracyData.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSV = resolve(__dirname, "data/imd-wcr-2025.csv");
const DATA_OUT = resolve(__dirname, "data/imdWcr2025Data.mjs");
const DEMO_OUT = resolve(__dirname, "data/democracyData.mjs");

/** Official IMD economy name → ISO 3166-1 alpha-2 (UN members only). */
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

/** Non-UN / non-game economies in the IMD table — keep out of COUNTRY_FACTS. */
const SKIP_NAMES = new Set([
  "Hong Kong SAR",
  "Taiwan (Chinese Taipei)",
  "Puerto Rico",
]);

/**
 * Score bands for the map / Group-by (IMD scores are 0–100 chart indices).
 * Same decade bands as CPI; not an official IMD classification.
 */
export function imdCompetitivenessBand(score) {
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

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const header = lines[0];
  if (header !== "rank,economy,score,rank_change") {
    throw new Error(`Unexpected CSV header: ${header}`);
  }
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

const rows = parseCsv(readFileSync(CSV, "utf8"));
if (rows.length !== 69) {
  throw new Error(`Expected 69 IMD ranking rows, got ${rows.length}`);
}

/** @type {Record<string, { year: number, rating: string, rank: number, rankChange?: number, score: number }>} */
const IMD = {};
const unmatched = [];
for (const r of rows) {
  if (SKIP_NAMES.has(r.economy)) continue;
  const code = NAME_TO_ISO[r.economy];
  if (!code) {
    unmatched.push(r.economy);
    continue;
  }
  if (IMD[code]) throw new Error(`Duplicate ISO mapping for ${r.economy} → ${code}`);
  /** @type {{ year: number, rating: string, rank: number, rankChange?: number, score: number }} */
  const entry = {
    year: 2025,
    rating: imdCompetitivenessBand(r.score),
    rank: r.rank,
    score: r.score,
  };
  // New 2025 entrants (Oman, Kenya, Namibia) have no prior rank — omit rankChange.
  if (typeof r.rank_change === "number") entry.rankChange = r.rank_change;
  IMD[code] = entry;
}

if (unmatched.length) {
  throw new Error(`Unmapped IMD economies: ${unmatched.join(", ")}`);
}

const expectedMapped = 69 - SKIP_NAMES.size;
if (Object.keys(IMD).length !== expectedMapped) {
  throw new Error(
    `Expected ${expectedMapped} mapped UN members, got ${Object.keys(IMD).length}`,
  );
}

const sortedCodes = Object.keys(IMD).sort();
const nameByCode = Object.fromEntries(
  rows
    .filter((r) => NAME_TO_ISO[r.economy])
    .map((r) => [NAME_TO_ISO[r.economy], r.economy]),
);
const dataBody = sortedCodes
  .map((code) => {
    const e = IMD[code];
    const change =
      typeof e.rankChange === "number" ? `, "rankChange": ${e.rankChange}` : "";
    return `  "${code}": { "year": ${e.year}, "rating": ${JSON.stringify(e.rating)}, "rank": ${e.rank}, "score": ${e.score}${change} }, // ${nameByCode[code]}`;
  })
  .join("\n");

writeFileSync(
  DATA_OUT,
  `// IMD World Competitiveness Ranking 2025 — overall competitiveness score.
// Source booklet: https://www.imd.org/wp-content/uploads/2025/06/Booklet-WCR-2025-v3.pdf
//   sha256 fd693b1cc736621de75c976d655246fcc20448e819a39fb9e04df54112c7fe2d
// Ranking tables reprint (same overall ranks/scores):
//   https://productivitysa.co.za/wp-content/uploads/2025/06/IMD-2025-Ranking-Tables.pdf
//   sha256 32a333a279311a3bb301061724dd1ec817fa845e41f71f1672d339834367bab7
// CSV extract: scripts/data/imd-wcr-2025.csv (69 economies; verbatim ranks/scores).
// score = IMD overall competitiveness index (0–100), generated for charts.
// rating = decade score band for map / Group-by (not an official IMD tier).
// rank = official IMD overall rank (1 = most competitive).
// rankChange = places gained (+) / lost (−) vs 2024; omitted for first-time
//   entrants Oman, Kenya, Namibia (IMD news, June 2025).
//
// Skipped (not UN members in this game): Hong Kong SAR, Taiwan (Chinese Taipei),
// Puerto Rico. Do not invent scores for economies absent from the IMD table.

/**
 * @type {Record<string, { year: number, rating: string, rank: number, rankChange?: number, score: number }>}
 */
export const IMD_WCR_2025_DATA = {
${dataBody}
};
`,
  "utf8",
);

// Merge into DEMOCRACY_DATA (preserve other indices; replace imdCompetitiveness).
const merged = structuredClone(DEMOCRACY_DATA);
for (const code of Object.keys(merged)) {
  if (merged[code]?.imdCompetitiveness) {
    delete merged[code].imdCompetitiveness;
  }
}
for (const [code, entry] of Object.entries(IMD)) {
  merged[code] = { ...(merged[code] || {}), imdCompetitiveness: entry };
}

const newHeader = `// Authoritative democracy / governance / press-freedom / development / gender-gap /
// peace / happiness / diplomacy / rule-of-law / competitiveness rankings and ratings for Freedom
// House, V-Dem, EIU Economist, Transparency International’s Corruption Perceptions
// Index, the Nira Data / Alliance of Democracies Democracy Perception Index, RSF
// World Press Freedom Index, the UNDP Human Development Index, the WEF Global Gender
// Gap Index, the IEP Global Peace Index, the World Happiness Report, the Lowy
// Institute Global Diplomacy Index, the World Justice Project Rule of Law
// Index, and the IMD World Competitiveness Ranking.
// Covers UN member states and permanent observers. Sourced from official publications:
// - Freedom House: Freedom in the World 2026 (scripts/data/fiw-2026.csv, built by scripts/build-fiw.mjs)
// - V-Dem Institute: Democracy Report 2026 / Dataset v16
// - Economist Intelligence Unit (EIU): Democracy Index 2025
// - Transparency International: Corruption Perceptions Index 2025 (CPI2025_Results.xlsx)
// - Nira Data / Alliance of Democracies: Democracy Perception Index 2026 (DPI 2026 PDF Country Appendix)
// - Reporters Without Borders (RSF): World Press Freedom Index 2026
//   Official CSV: scripts/data/rsf-press-freedom-2026.csv
//   (https://rsf.org/sites/default/files/import_classement/2026.csv)
//   Categories from RSF methodology: Good [85–100], Satisfactory [70–85),
//   Problematic [55–70), Difficult [40–55), Very serious [0–40).
// - UNDP Human Development Report 2025: Human Development Index (HDI) 2023
//   Official CSV: scripts/data/hdr25-hdi-2023.csv
//   (from HDR25_Composite_indices_complete_time_series.csv)
//   Categories from UNDP hdicode: Very High (≥0.800), High (0.700–0.799),
//   Medium (0.550–0.699), Low (<0.550).
// - World Economic Forum: Global Gender Gap Report 2025 (Table 1.1)
//   Official extract: scripts/data/gggi-2025.csv / scripts/data/gggi2025Data.mjs
// - Institute for Economics & Peace: Global Peace Index 2026
//   Official extract: scripts/data/gpi-2026.csv / scripts/data/gpi2026Data.mjs
// - World Happiness Report 2026: scripts/data/whr2026-figure-2.1.xlsx
//   (https://files.worldhappiness.report/WHR26_Data_Figure_2.1.xlsx)
//   CSV extract: scripts/data/whr-happiness-2026.csv
//   Year=2025 rows = Gallup World Poll 2023–2025 life-evaluation average (0–10).
// - Lowy Institute: Global Diplomacy Index 2024
//   Official extract: scripts/data/gdi-2024-rankings.json / scripts/data/gdi2024Data.mjs
//   (https://globaldiplomacyindex.lowyinstitute.org/data/2023/get_country_data.json)
//   Score = total diplomatic posts abroad; rating = post-count band for map/Group-by.
// - World Justice Project: Rule of Law Index 2025
//   Official CSVs: scripts/data/wjp-rule-of-law-2025.csv (+ 2024 for rankChange)
//   (https://worldjusticeproject.org/rule-of-law-index/data/2025.csv)
//   Score bands for the map: 0.80–1.00 … 0.00–0.19 on the published 2-dp score.
// - IMD World Competitiveness Ranking 2025
//   Booklet: https://www.imd.org/wp-content/uploads/2025/06/Booklet-WCR-2025-v3.pdf
//   CSV extract: scripts/data/imd-wcr-2025.csv / scripts/data/imdWcr2025Data.mjs

/**
 * @type {Record<string, {
 *   freedomHouse?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   vDem?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   economist?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   cpi?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   perception?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   rsfPress?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   hdi?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   genderGap?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   gpi?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   happiness?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   gdi?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   wjpRuleOfLaw?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   imdCompetitiveness?: { year: number, rating: string, rank: number, rankChange?: number, score?: number }
 * }>}
 */
`;

const demoCodes = Object.keys(merged).sort();
const order = [
  "freedomHouse",
  "vDem",
  "economist",
  "cpi",
  "perception",
  "rsfPress",
  "hdi",
  "genderGap",
  "gpi",
  "happiness",
  "gdi",
  "wjpRuleOfLaw",
  "imdCompetitiveness",
];
const demoBody = demoCodes
  .map((code) => {
    const entry = merged[code];
    const parts = [];
    for (const k of order) {
      if (entry[k]) parts.push(`    "${k}": ${JSON.stringify(entry[k])}`);
    }
    for (const k of Object.keys(entry)) {
      if (!order.includes(k)) parts.push(`    "${k}": ${JSON.stringify(entry[k])}`);
    }
    return `  "${code}": {\n${parts.join(",\n")}\n  }`;
  })
  .join(",\n");

writeFileSync(
  DEMO_OUT,
  `${newHeader}export const DEMOCRACY_DATA = {\n${demoBody}\n};\n`,
  "utf8",
);

console.log(
  `IMD WCR 2025: wrote ${sortedCodes.length} countries (skipped ${SKIP_NAMES.size} non-members); CSV ${rows.length} rows.`,
);
