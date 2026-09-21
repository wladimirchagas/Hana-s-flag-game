#!/usr/bin/env node
/**
 * Build World Happiness Report 2026 extracts from the committed CSV
 * (scripts/data/whr-happiness-2026.csv), itself sliced from the official
 * Figure 2.1 workbook (scripts/data/whr2026-figure-2.1.xlsx).
 *
 * Writes:
 *   - scripts/data/whr2026Data.mjs
 *   - merges `happiness` into scripts/data/democracyData.mjs
 *
 * Source: https://files.worldhappiness.report/WHR26_Data_Figure_2.1.xlsx
 * Report: Helliwell et al. (Eds.), World Happiness Report 2026.
 * CSV Year ranking = Gallup World Poll 2023–2025 three-year average
 * (the figure the 2026 report ranks; workbook Year column = 2025).
 *
 * Usage: node scripts/build-whr-happiness.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DEMOCRACY_DATA } from "./data/democracyData.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSV = resolve(__dirname, "data/whr-happiness-2026.csv");
const DATA_OUT = resolve(__dirname, "data/whr2026Data.mjs");
const DEMO_OUT = resolve(__dirname, "data/democracyData.mjs");

/** Official WHR country name → ISO 3166-1 alpha-2 (UN members + Palestine). */
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
  "Côte d’Ivoire": "CI", // U+2019 apostrophe as in the official workbook
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

/** Territories / non-UN entities in the WHR table — must stay absent. */
const SKIP_NAMES = new Set([
  "Kosovo",
  "Taiwan Province of China",
  "Hong Kong SAR of China",
]);

/** Cantril ladder score → map / group band (1-point bands on the 0–10 scale). */
export function happinessBand(score) {
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

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    // Simple CSV with optional quotes around country.
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

const current = parseCsv(readFileSync(CSV, "utf8"));
if (current.length !== 147) {
  throw new Error(`Expected 147 WHR ranking rows, got ${current.length}`);
}

/** @type {Record<string, { year: number, rating: string, rank: number, rankChange: number, score: number }>} */
const WHR = {};
const unmatched = [];
for (const r of current) {
  if (SKIP_NAMES.has(r.country)) continue;
  const code = NAME_TO_ISO[r.country];
  if (!code) {
    unmatched.push(r.country);
    continue;
  }
  if (WHR[code]) throw new Error(`Duplicate ISO mapping for ${r.country} → ${code}`);
  const rankChange =
    typeof r.rank_2024 === "number" ? r.rank_2024 - r.rank : 0;
  WHR[code] = {
    year: 2026,
    rating: happinessBand(r.score),
    rank: r.rank,
    rankChange,
    score: r.score,
  };
}

if (unmatched.length) {
  throw new Error(`Unmapped WHR countries: ${unmatched.join(", ")}`);
}

const sortedCodes = Object.keys(WHR).sort();
const nameByCode = Object.fromEntries(
  current
    .filter((r) => NAME_TO_ISO[r.country])
    .map((r) => [NAME_TO_ISO[r.country], r.country]),
);
const dataBody = sortedCodes
  .map((code) => {
    const e = WHR[code];
    return `  "${code}": { "year": ${e.year}, "rating": ${JSON.stringify(e.rating)}, "rank": ${e.rank}, "rankChange": ${e.rankChange}, "score": ${e.score} }, // ${nameByCode[code]}`;
  })
  .join("\n");

writeFileSync(
  DATA_OUT,
  `// World Happiness Report 2026 — life-evaluation (Cantril ladder) ranking.
// Source workbook: scripts/data/whr2026-figure-2.1.xlsx
//   https://files.worldhappiness.report/WHR26_Data_Figure_2.1.xlsx
//   (sha256 576e382655cec3ae704a0b41cd2c04465b87cd84b7f131a0c4fa26d41f6d8028)
// CSV extract: scripts/data/whr-happiness-2026.csv (Year=2025 ranking rows)
// Report: Helliwell, J. F., Layard, R., Sachs, J. D., De Neve, J.-E., Aknin, L. B.,
//   & Wang, S. (Eds.). (2026). World Happiness Report 2026. University of Oxford.
// Ranking uses the workbook's Year=2025 rows (Gallup World Poll 2023–2025 average).
// score = Life evaluation (3-year average), 0–10 Cantril ladder.
// rating = 1-point score band for map / Group-by (not an official WHR tier).
// rank = official WHR rank (ties share a rank in the source when scores match).
// rankChange = Rank_2024 − Rank_2025 (positive = rose in the ranking).
//
// Skipped (not UN members in this game): Kosovo, Taiwan Province of China,
// Hong Kong SAR of China. Do not invent scores for countries absent from WHR.

/**
 * @type {Record<string, { year: number, rating: string, rank: number, rankChange: number, score: number }>}
 */
export const WHR_2026_DATA = {
${dataBody}
};
`,
  "utf8",
);

// Merge into DEMOCRACY_DATA (preserve other indices; replace happiness).
const merged = structuredClone(DEMOCRACY_DATA);
for (const code of Object.keys(merged)) {
  if (merged[code]?.happiness) {
    delete merged[code].happiness;
  }
}
for (const [code, entry] of Object.entries(WHR)) {
  merged[code] = { ...(merged[code] || {}), happiness: entry };
}

const newHeader = `// Authoritative democracy / governance / press-freedom / development / gender-gap / happiness rankings and ratings for
// Freedom House, V-Dem, EIU Economist, Transparency International’s Corruption
// Perceptions Index, the Nira Data / Alliance of Democracies Democracy Perception
// Index, RSF World Press Freedom Index, the UNDP Human Development Index, the WEF
// Global Gender Gap Index, and the World Happiness Report.
// Covers UN member states and permanent observers. Sourced from official publications:
// - Freedom House: Freedom in the World 2024
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
// - World Happiness Report 2026: scripts/data/whr2026-figure-2.1.xlsx
//   (https://files.worldhappiness.report/WHR26_Data_Figure_2.1.xlsx)
//   CSV extract: scripts/data/whr-happiness-2026.csv
//   Year=2025 rows = Gallup World Poll 2023–2025 life-evaluation average (0–10).

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
 *   happiness?: { year: number, rating: string, rank: number, rankChange?: number, score?: number }
 * }>}
 */
`;

const demoCodes = Object.keys(merged).sort();
const order = ["freedomHouse", "vDem", "economist", "cpi", "perception", "rsfPress", "hdi", "genderGap", "gpi", "happiness"];
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
  `WHR 2026: wrote ${sortedCodes.length} countries (skipped ${SKIP_NAMES.size} non-members); CSV ${current.length} rows.`,
);
