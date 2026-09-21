#!/usr/bin/env node
/**
 * Merge Reuters Institute Digital News Report 2026 trust-in-news scores into
 * scripts/data/democracyData.mjs from the committed extract
 * (scripts/data/dnr2026Data.mjs / scripts/data/dnr-trust-2026.csv).
 *
 * Usage: node scripts/build-dnr-trust.mjs
 *
 * Then regenerate the widget bundle: node scripts/build-country-facts.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DNR_2026_DATA, dnrTrustBand } from "./data/dnr2026Data.mjs";
import { DEMOCRACY_DATA } from "./data/democracyData.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEMO_PATH = resolve(__dirname, "data/democracyData.mjs");
const CSV_PATH = resolve(__dirname, "data/dnr-trust-2026.csv");

// Sanity: every include_in_app=yes CSV row must match DNR_2026_DATA.
const csvLines = readFileSync(CSV_PATH, "utf8").trim().split(/\r?\n/).slice(1);
for (const line of csvLines) {
  const [iso2, , scoreStr, rankStr, , , include] = line.split(",");
  if (include !== "yes") {
    if (DNR_2026_DATA[iso2]) {
      throw new Error(`${iso2}: marked include_in_app=no but present in DNR_2026_DATA`);
    }
    continue;
  }
  const score = Number(scoreStr);
  const rank = Number(rankStr);
  const row = DNR_2026_DATA[iso2];
  if (!row) throw new Error(`${iso2}: missing from DNR_2026_DATA`);
  if (row.score !== score || row.rank !== rank) {
    throw new Error(
      `${iso2}: DNR_2026_DATA score/rank ${row.score}/${row.rank} ≠ CSV ${score}/${rank}`,
    );
  }
  if (row.rating !== dnrTrustBand(score)) {
    throw new Error(`${iso2}: rating ${row.rating} ≠ band for score ${score}`);
  }
}

const merged = structuredClone(DEMOCRACY_DATA);
for (const code of Object.keys(merged)) {
  if (merged[code]?.digitalNews) delete merged[code].digitalNews;
}
for (const [code, entry] of Object.entries(DNR_2026_DATA)) {
  merged[code] = { ...(merged[code] || {}), digitalNews: entry };
}

const header = `// Authoritative democracy / governance / press-freedom / development / gender-gap /
// peace / happiness / diplomacy / rule-of-law / digital-news rankings and ratings for
// Freedom House, V-Dem, EIU Economist, Transparency International’s Corruption
// Perceptions Index, the Nira Data / Alliance of Democracies Democracy Perception
// Index, RSF World Press Freedom Index, the UNDP Human Development Index, the WEF
// Global Gender Gap Index, the Institute for Economics & Peace Global Peace Index,
// the World Happiness Report, the Lowy Institute Global Diplomacy Index, the World
// Justice Project Rule of Law Index, the IMD World Competitiveness Ranking,
// and the Reuters Institute Digital News Report
// (trust in news).
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
//   Official CSVs: scripts/data/wjp-rule-of-law-2025.csv / scripts/data/wjp2025Data.mjs
// - IMD World Competitiveness Ranking 2025
//   Official extract: scripts/data/imd-wcr-2025.csv / scripts/data/imd2025Data.mjs
// - Institute for Economics & Peace: Ecological Threat Report
// - Reuters Institute for the Study of Journalism: Digital News Report 2026
//   Trust in news overall (%), 48 markets; CSV: scripts/data/dnr-trust-2026.csv
//   Per-market pages: https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2026/
//   Hong Kong and Taiwan skipped (not UN members in COUNTRY_FACTS).

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
 *   softPower?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   wjpRuleOfLaw?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   imdCompetitiveness?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   etr?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   digitalNews?: { year: number, rating: string, rank: number, rankChange?: number, score?: number }
 * }>}
 */
`;

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
  "softPower",
  "wjpRuleOfLaw",
  "imdCompetitiveness",
  "etr",
  "digitalNews",
];
const demoCodes = Object.keys(merged).sort();
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
    return `  "${code}": {\n${parts.join(",\n")}\n  },`;
  })
  .join("\n");

writeFileSync(
  DEMO_PATH,
  `${header}\nexport const DEMOCRACY_DATA = {\n${demoBody}\n};\n`,
  "utf8",
);

console.log(
  `Merged digitalNews for ${Object.keys(DNR_2026_DATA).length} countries into ${DEMO_PATH}`,
);
