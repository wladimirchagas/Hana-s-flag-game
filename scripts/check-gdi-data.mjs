#!/usr/bin/env node
/**
 * Validate bundled Lowy Institute Global Diplomacy Index 2024 data against the
 * committed extract (scripts/data/gdi-2024-rankings.json /
 * scripts/data/gdi2024Data.mjs), itself taken from Lowy’s official
 * get_country_data.json for the 2024 Index (data collected Jul–Nov 2023).
 *
 * Fails on: wrong rank/posts/band, drift between gdi2024Data.mjs /
 * democracyData.mjs / countryFacts.ts, fabricating entries for the EU or
 * Taiwan (not UN members in COUNTRY_FACTS), or UI wiring dropping the index.
 *
 * Run: node scripts/check-gdi-data.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { GDI_2024_DATA } from "./data/gdi2024Data.mjs";
import { DEMOCRACY_DATA } from "./data/democracyData.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const RANKINGS = resolve(__dirname, "data/gdi-2024-rankings.json");
const FACTS_TS = resolve(__dirname, "../src/data/countryFacts.ts");

/** Post-count → map / group band (must match gdi2024Data.mjs). */
function gdiBand(posts) {
  if (posts >= 250) return "250+";
  if (posts >= 200) return "200–249";
  if (posts >= 150) return "150–199";
  if (posts >= 100) return "100–149";
  if (posts >= 50) return "50–99";
  return "Below 50";
}

const NAME_TO_ISO = {
  China: "CN",
  "United States": "US",
  Türkiye: "TR",
  Japan: "JP",
  France: "FR",
  Russia: "RU",
  "United Kingdom": "GB",
  Germany: "DE",
  Italy: "IT",
  Brazil: "BR",
  India: "IN",
  Spain: "ES",
  "South Korea": "KR",
  Mexico: "MX",
  Canada: "CA",
  Argentina: "AR",
  Netherlands: "NL",
  Switzerland: "CH",
  Hungary: "HU",
  Poland: "PL",
  Greece: "GR",
  Indonesia: "ID",
  "Saudi Arabia": "SA",
  Portugal: "PT",
  Australia: "AU",
  Chile: "CL",
  Pakistan: "PK",
  Czechia: "CZ",
  Colombia: "CO",
  "South Africa": "ZA",
  Belgium: "BE",
  Israel: "IL",
  Malaysia: "MY",
  Austria: "AT",
  Sweden: "SE",
  Ireland: "IE",
  Thailand: "TH",
  Philippines: "PH",
  Vietnam: "VN",
  Norway: "NO",
  Denmark: "DK",
  Finland: "FI",
  Slovakia: "SK",
  Bangladesh: "BD",
  "New Zealand": "NZ",
  Lithuania: "LT",
  "Sri Lanka": "LK",
  Slovenia: "SI",
  "Costa Rica": "CR",
  Mongolia: "MN",
  Singapore: "SG",
  Estonia: "EE",
  Latvia: "LV",
  Luxembourg: "LU",
  Myanmar: "MM",
  Cambodia: "KH",
  "North Korea": "KP",
  Brunei: "BN",
  Laos: "LA",
  Nepal: "NP",
  "Timor-Leste": "TL",
  Iceland: "IS",
  "Papua New Guinea": "PG",
  Bhutan: "BT",
};

const SKIP_NAMES = new Set(["European Union*", "Taiwan**"]);

function loadFactsGdi(src) {
  /** @type {Map<string, object>} */
  const out = new Map();
  const lineRe = /^  ([A-Z]{2}): (\{.*\}),$/gm;
  let m;
  while ((m = lineRe.exec(src))) {
    const code = m[1];
    const obj = JSON.parse(m[2]);
    const gdi = obj.democracy?.gdi;
    if (gdi) out.set(code, gdi);
  }
  return out;
}

const rankingsDoc = JSON.parse(readFileSync(RANKINGS, "utf8"));
const rankings = rankingsDoc.rankings;
if (!Array.isArray(rankings) || rankings.length !== 66) {
  console.error(`Expected 66 GDI ranking rows, got ${rankings?.length}`);
  process.exit(1);
}

/** @type {Map<string, { year: number, rating: string, rank: number, score: number }>} */
const fromSource = new Map();
const errors = [];

for (const row of rankings) {
  const name = row.name;
  if (SKIP_NAMES.has(name)) continue;
  const code = NAME_TO_ISO[name];
  if (!code) {
    errors.push(`Unmapped GDI name ${JSON.stringify(name)}`);
    continue;
  }
  const posts = row.total_posts;
  const rank = row.rank_overall;
  if (typeof posts !== "number" || typeof rank !== "number") {
    errors.push(`${name}: missing posts/rank`);
    continue;
  }
  fromSource.set(code, {
    year: 2024,
    rating: gdiBand(posts),
    rank,
    score: posts,
  });
}

if (fromSource.size !== 64) {
  errors.push(`Expected 64 mapped UN-member GDI rows, got ${fromSource.size}`);
}

const extractCodes = Object.keys(GDI_2024_DATA).sort();
if (extractCodes.length !== 64) {
  errors.push(`gdi2024Data has ${extractCodes.length} codes, expected 64`);
}

for (const code of extractCodes) {
  const extract = GDI_2024_DATA[code];
  const src = fromSource.get(code);
  const demo = DEMOCRACY_DATA[code]?.gdi;
  if (!src) errors.push(`${code}: in gdi2024Data but not in rankings JSON`);
  if (!extract) errors.push(`${code}: missing from gdi2024Data`);
  if (!demo) errors.push(`${code}: missing gdi in democracyData`);
  if (src && extract) {
    const exp = JSON.stringify(src);
    const got = JSON.stringify(extract);
    if (got !== exp) {
      errors.push(`${code}: gdi2024Data drift\n  got ${got}\n  exp ${exp}`);
    }
  }
  if (demo && extract) {
    const exp = JSON.stringify(extract);
    const got = JSON.stringify(demo);
    if (got !== exp) {
      errors.push(
        `${code}: democracyData drift\n  got ${got}\n  exp ${exp}`,
      );
    }
  }
}

for (const code of fromSource.keys()) {
  if (!GDI_2024_DATA[code]) {
    errors.push(`${code}: in rankings JSON but missing from gdi2024Data`);
  }
}

const factsSrc = readFileSync(FACTS_TS, "utf8");
const factsGdi = loadFactsGdi(factsSrc);
for (const code of extractCodes) {
  const facts = factsGdi.get(code);
  const extract = GDI_2024_DATA[code];
  if (!facts) errors.push(`${code}: missing gdi in countryFacts`);
  else if (JSON.stringify(facts) !== JSON.stringify(extract)) {
    errors.push(
      `${code}: countryFacts drift\n  got ${JSON.stringify(facts)}\n  exp ${JSON.stringify(extract)}`,
    );
  }
}
for (const code of factsGdi.keys()) {
  if (!fromSource.has(code)) {
    errors.push(`${code}: countryFacts has gdi but rankings JSON does not`);
  }
}

// Spot-check Key Findings PDF figures (China 274 #1, US 271 #2, Australia 124 #26, Bhutan 10 #66).
const spots = [
  ["CN", 1, 274],
  ["US", 2, 271],
  ["TR", 3, 252],
  ["AU", 26, 124],
  ["BT", 66, 10],
  ["CL", 27, 121],
  ["PK", 27, 121],
];
for (const [code, rank, posts] of spots) {
  const row = GDI_2024_DATA[code];
  if (!row || row.rank !== rank || row.score !== posts) {
    errors.push(
      `Spot-check failed ${code}: expected rank ${rank} / ${posts} posts, got ${JSON.stringify(row)}`,
    );
  }
}

// UI wiring must keep referencing gdi.
const uiFiles = [
  ["src/lib/democracyColors.ts", "gdi"],
  ["src/components/EntitySummary.tsx", "gdi"],
  ["src/components/FlagGrid.tsx", "gdi"],
];
for (const [rel, needle] of uiFiles) {
  const src = readFileSync(resolve(__dirname, "..", rel), "utf8");
  if (!src.includes(needle)) {
    errors.push(`${rel}: missing reference to ${needle}`);
  }
  if (rel.endsWith("democracyColors.ts") && !src.includes('"gdi"')) {
    errors.push(`${rel}: DemocracyIndexKey must include "gdi"`);
  }
  if (rel.endsWith("EntitySummary.tsx") && !src.includes("Global Diplomacy Index")) {
    errors.push(`${rel}: panel label "Global Diplomacy Index" missing`);
  }
  if (rel.endsWith("FlagGrid.tsx") && !src.includes("Global Diplomacy Index")) {
    errors.push(`${rel}: Group-by label "Global Diplomacy Index" missing`);
  }
}

if (errors.length) {
  console.error(`GDI check FAILED (${errors.length} errors):`);
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}

console.log(
  `GDI check OK — ${fromSource.size} countries match Lowy Global Diplomacy Index 2024 (rank, posts, band).`,
);
