// Country Personas pilot: export a country-by-variable matrix from the bundled data.
//
// Research material for docs/COUNTRY_PERSONAS_PLAYBOOK.md (Appendix A). It is NOT a
// generator: nothing in src/ reads its output, and it writes only to the path given.
//
//   node docs/country-personas/pilot-export.mjs /tmp/country-personas-pilot.csv
//
// Needs Node 22.18+ (imports .ts modules with native type stripping).
import { writeFileSync } from "node:fs";

const R = new URL("../../src/", import.meta.url).href;
const imp = (p) => import(R + p);

const { UN_MEMBER_CODES } = await imp("lib/unMemberStates.ts");
const codes = [...UN_MEMBER_CODES].sort();
const { COUNTRY_FACTS } = await imp("data/countryFacts.ts");
const sp = await imp("data/subdivisionPopulation.ts");
const nf = await imp("data/nationalFlags.ts");
const { COUNTRY_BLOCKS } = await imp("data/countryBlocks.ts");
const { COMMERCIAL_AIRLINES } = await imp("data/commercialAirlines.ts");
const { TOURISM_LOGOS } = await imp("data/tourismLogos.ts");
const { WORLD_CUP_RECORDS } = await imp("data/worldCupRecords.ts");
const { FLAG_ADOPTION_YEAR } = await imp("data/flagAdoptionYears.ts");
const { NATIONAL_CITIES } = await imp("data/cities.ts");
const { POLITICAL_PARTIES } = await imp("data/politicalParties.ts");
const { CONTINENT_GROUPS } = await imp("lib/continentGroups.ts");
const wvs = (await import(R + "data/wvsResults.json", { with: { type: "json" } })).default;

const INDEX_KEYS = [
  "freedomHouse", "vDem", "economist", "cpi", "rsfPress", "hdi", "gpi", "happiness", "softPower",
  "wjpRuleOfLaw", "etr", "gti", "genderGap", "perception", "gdi", "imdCompetitiveness", "digitalNews",
];

// Olympic stats are stored as display strings ("1–0–1 (2 total)", "0–0–0 (none)").
const medalTotal = (v) => {
  if (/none/i.test(v)) return 0;
  const m = v.match(/(\d+)\s*[–-]\s*(\d+)\s*[–-]\s*(\d+)/);
  if (m) return +m[1] + +m[2] + +m[3];
  const n = parseInt(v, 10);
  return Number.isNaN(n) ? null : n;
};
const olympic = (c, prefix) => {
  const noc = nf.NATIONAL_FLAGS[c]?.find((f) => f.category === "olympiccommittee");
  const row = noc?.stats?.find((s) => s.label.startsWith(prefix));
  if (!row) return null;
  return prefix.includes("medals") ? medalTotal(row.value) : parseInt(row.value, 10) || 0;
};

const continentOf = {};
for (const [k, arr] of Object.entries(CONTINENT_GROUPS)) for (const c of arr) continentOf[c] = k;

// WVS: % of substantive answers (Don't know / No answer / missing excluded) in the given answer slots.
const questions = Object.fromEntries(wvs.questions.map((q) => [q.id, q]));
const wvsShare = (id, slots, c) => {
  const q = questions[id];
  const v = q?.values?.[c];
  if (!v) return null;
  const dk = q.answers.findIndex((a) => /Don.t know/i.test(a));
  const valid = v.slice(0, dk === -1 ? v.length : dk).reduce((a, b) => a + (b ?? 0), 0);
  const hit = slots.reduce((a, i) => a + (v[i] ?? 0), 0);
  return valid ? (100 * hit) / valid : null;
};

const ln = (x) => (typeof x === "number" && x > 0 ? Math.log(x) : null);

const rows = codes.map((c) => {
  const f = COUNTRY_FACTS[c] ?? {};
  const d = f.democracy ?? {};
  const visitors = TOURISM_LOGOS[c]?.find((e) => typeof e.visitors?.count === "number")?.visitors.count;
  const row = {
    code: c,
    continent: continentOf[c] ?? "",
    lnGdpPc: ln(f.gdpPerCapitaUsd),
    lnPop: ln(sp.NATIONAL_REFERENCE_POPULATION[c]),
    nBlocks: COUNTRY_BLOCKS.filter((b) => b.codes.includes(c)).length,
    nAirlines: COMMERCIAL_AIRLINES[c]?.length ?? null,
    lnVisitors: visitors != null ? Math.log1p(visitors) : null,
    summerMedals: olympic(c, "Summer Olympic medals"),
    summerGames: olympic(c, "Summer Games participated"),
    wcMen: WORLD_CUP_RECORDS[`${c.toLowerCase()}-football-crest`]?.mensAppearances ?? null,
    flagYear: FLAG_ADOPTION_YEAR[c] ?? null,
    indepYear: nf.NATIONAL_INDEPENDENCE[c]?.year ?? null,
    lnLargestCity: ln(NATIONAL_CITIES[c]?.largest?.population),
    absLat: NATIONAL_CITIES[c]?.capitals?.[0]?.lat != null ? Math.abs(NATIONAL_CITIES[c].capitals[0].lat) : null,
    nParties: POLITICAL_PARTIES[c]?.length ?? null,
    wvs_god_very: wvsShare("Q164", [9], c), // "Very important" (10 on the 1–10 scale)
    wvs_homosex_never: wvsShare("Q182", [0], c), // "Never justifiable"
    wvs_trust_most: wvsShare("Q57", [0], c), // "Most people can be trusted"
  };
  for (const k of INDEX_KEYS) row[`i_${k}`] = typeof d[k]?.score === "number" ? d[k].score : null;
  return row;
});

const cols = Object.keys(rows[0]);
writeFileSync(
  process.argv[2],
  [cols.join(","), ...rows.map((r) => cols.map((k) => r[k] ?? "").join(","))].join("\n") + "\n",
);
console.log(`wrote ${rows.length} countries × ${cols.length - 2} variables to ${process.argv[2]}`);
