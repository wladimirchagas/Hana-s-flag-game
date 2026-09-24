#!/usr/bin/env node
// Country Personas — input snapshot generator (playbook step 2).
//
//   node scripts/build-country-persona-inputs.mjs
//
// Writes scripts/data/country-persona-inputs.json: every figure the persona build may use,
// for the app's 195 states, each cell carrying its value and year, and each variable its
// publisher and source URL. The research build (scripts/country-personas/build.py) reads
// ONLY this file, so a build is reproducible from the repository alone.
//
// Two kinds of input:
//   • bundled — re-read from the app's own sourced datasets (countryFacts.ts, wvsResults.json,
//     countryBlocks.ts, nationalFlags.ts, …). This script never edits them.
//   • World Bank World Development Indicators — fetched from the same API that
//     scripts/build-country-facts.mjs uses. For each country the most recent non-null
//     value from FRESHNESS_FLOOR onwards is kept, with its year. Older values are treated
//     as missing (a stale figure is not a current one).
//
// Nothing here is invented or estimated: a figure the source does not publish is absent.
// Which variables BUILD the classification and which only DESCRIBE it is decided by the
// build (85% coverage gate, docs/COUNTRY_PERSONAS_PLAYBOOK.md step 3), not here.
//
// Pew Research Center religion shares and official-language flags are read from bundled files
// (the Pew table verbatim, checked by sha256). Needs Node 22.18+ (imports .ts modules) and
// egress to api.worldbank.org.
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import isoCountries from "i18n-iso-countries";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(ROOT, "scripts/data/country-persona-inputs.json");
const src = (p) => import(new URL(`../src/${p}`, import.meta.url).href);

const FRESHNESS_FLOOR = 2015;
const WB = "https://api.worldbank.org/v2";

// ── World Bank WDI indicators ────────────────────────────────────────────────
// Each is a published WDI series; coverage is measured on fetch, never assumed.
const WDI = [
  ["wb_population", "SP.POP.TOTL", "Population, total", "people"],
  ["wb_gdppc_ppp", "NY.GDP.PCAP.PP.CD", "GDP per capita, PPP (current international $)", "int$"],
  ["wb_gdppc_usd", "NY.GDP.PCAP.CD", "GDP per capita (current US$)", "US$"],
  ["wb_urban", "SP.URB.TOTL.IN.ZS", "Urban population (% of total population)", "%"],
  ["wb_largest_city", "EN.URB.LCTY.UR.ZS", "Population in the largest city (% of urban population)", "%"],
  ["wb_density", "EN.POP.DNST", "Population density (people per sq. km of land area)", "per km²"],
  ["wb_land_area", "AG.LND.TOTL.K2", "Land area (sq. km)", "km²"],
  ["wb_age_0_14", "SP.POP.0014.TO.ZS", "Population ages 0-14 (% of total population)", "%"],
  ["wb_age_65_up", "SP.POP.65UP.TO.ZS", "Population ages 65 and above (% of total population)", "%"],
  ["wb_fertility", "SP.DYN.TFRT.IN", "Fertility rate, total (births per woman)", "births"],
  ["wb_life_expectancy", "SP.DYN.LE00.IN", "Life expectancy at birth, total (years)", "years"],
  ["wb_pop_growth", "SP.POP.GROW", "Population growth (annual %)", "%"],
  ["wb_internet", "IT.NET.USER.ZS", "Individuals using the Internet (% of population)", "%"],
  ["wb_electricity", "EG.ELC.ACCS.ZS", "Access to electricity (% of population)", "%"],
  ["wb_agriculture", "NV.AGR.TOTL.ZS", "Agriculture, forestry, and fishing, value added (% of GDP)", "%"],
  ["wb_industry", "NV.IND.TOTL.ZS", "Industry (including construction), value added (% of GDP)", "%"],
  ["wb_services", "NV.SRV.TOTL.ZS", "Services, value added (% of GDP)", "%"],
  ["wb_trade", "NE.TRD.GNFS.ZS", "Trade (% of GDP)", "%"],
  ["wb_resource_rents", "NY.GDP.TOTL.RT.ZS", "Total natural resources rents (% of GDP)", "%"],
  ["wb_remittances", "BX.TRF.PWKR.DT.GD.ZS", "Personal remittances, received (% of GDP)", "%"],
  ["wb_migrants", "SM.POP.TOTL.ZS", "International migrant stock (% of population)", "%"],
  ["wb_tourist_arrivals", "ST.INT.ARVL", "International tourism, number of arrivals", "arrivals"],
  ["wb_homicide", "VC.IHR.PSRC.P5", "Intentional homicides (per 100,000 people)", "per 100k"],
  ["wb_female_lfp", "SL.TLF.CACT.FE.ZS", "Labor force participation rate, female (% of female population ages 15+) (modeled ILO estimate)", "%"],
  ["wb_co2_pc", "EN.GHG.CO2.PC.CE.AR5", "Carbon dioxide (CO2) emissions excluding LULUCF per capita (t CO2e/capita)", "t"],
  ["wb_military", "MS.MIL.XPND.GD.ZS", "Military expenditure (% of GDP)", "%"],
  ["wb_health_exp", "SH.XPD.CHEX.GD.ZS", "Current health expenditure (% of GDP)", "%"],
  ["wb_tertiary", "SE.TER.ENRR", "School enrollment, tertiary (% gross)", "%"],
  ["wb_gini", "SI.POV.GINI", "Gini index", "index"],
];

// ── Bundled indices (countryFacts.ts) ────────────────────────────────────────
const INDEX_META = {
  freedomHouse: ["Freedom House, Freedom in the World (total score)", "https://freedomhouse.org/countries/freedom-world/scores"],
  vDem: ["V-Dem Liberal Democracy Index", "https://v-dem.net/data/the-v-dem-dataset/"],
  economist: ["Economist Intelligence Unit Democracy Index", "https://www.eiu.com/n/campaigns/democracy-index/"],
  cpi: ["Transparency International Corruption Perceptions Index", "https://www.transparency.org/en/cpi"],
  rsfPress: ["RSF World Press Freedom Index (score)", "https://rsf.org/en/index"],
  hdi: ["UNDP Human Development Index", "https://hdr.undp.org/data-center/human-development-index"],
  gpi: ["Institute for Economics & Peace Global Peace Index (lower = more peaceful)", "https://www.visionofhumanity.org/maps/"],
  happiness: ["World Happiness Report life evaluation", "https://worldhappiness.report/"],
  softPower: ["Brand Finance Global Soft Power Index", "https://brandirectory.com/softpower/"],
  wjpRuleOfLaw: ["World Justice Project Rule of Law Index", "https://worldjusticeproject.org/rule-of-law-index/"],
  etr: ["Institute for Economics & Peace Ecological Threat Report (higher = more threat)", "https://www.visionofhumanity.org/"],
  gti: ["Institute for Economics & Peace Global Terrorism Index (higher = more impact)", "https://www.visionofhumanity.org/maps/global-terrorism-index/"],
  genderGap: ["World Economic Forum Global Gender Gap Index", "https://www.weforum.org/publications/global-gender-gap-report/"],
  perception: ["Alliance of Democracies Democracy Perception Index", "https://www.allianceofdemocracies.org/initiatives/the-copenhagen-democracy-summit/dpi/"],
  gdi: ["Lowy Institute Global Diplomacy Index (posts abroad)", "https://globaldiplomacyindex.lowyinstitute.org/"],
  imdCompetitiveness: ["IMD World Competitiveness Ranking (score)", "https://www.imd.org/centers/wcc/world-competitiveness-center/rankings/world-competitiveness-ranking/"],
  digitalNews: ["Reuters Institute Digital News Report — trust in news (%)", "https://reutersinstitute.politics.ox.ac.uk/digital-news-report"],
};

async function fetchJson(url, tries = 4) {
  for (let i = 0; ; i++) {
    try {
      const r = await fetch(url, { headers: { "User-Agent": "HanaFlagGame/1.0 (country personas build)" } });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.json();
    } catch (e) {
      if (i >= tries - 1) throw new Error(`${url}: ${e.message}`);
      await new Promise((ok) => setTimeout(ok, 2000 * 2 ** i));
    }
  }
}

async function fetchWdi(code) {
  const url = `${WB}/country/all/indicator/${code}?format=json&date=${FRESHNESS_FLOOR}:2026&per_page=20000`;
  const body = await fetchJson(url);
  if (!Array.isArray(body) || !Array.isArray(body[1])) throw new Error(`${code}: unexpected response`);
  const latest = {}; // iso2 → { v, y }
  for (const row of body[1]) {
    const iso2 = row.country?.id;
    if (!iso2 || row.value == null) continue;
    const y = Number(row.date);
    if (!latest[iso2] || y > latest[iso2].y) latest[iso2] = { v: row.value, y };
  }
  return { latest, lastUpdated: body[0]?.lastupdated ?? null };
}

// ── Load bundled data ────────────────────────────────────────────────────────
const { UN_MEMBER_CODES } = await src("lib/unMemberStates.ts");
const CODES = [...UN_MEMBER_CODES].sort();
const { COUNTRY_FACTS } = await src("data/countryFacts.ts");
const { COUNTRY_BLOCKS } = await src("data/countryBlocks.ts");
const { NATIONAL_FLAGS, NATIONAL_INDEPENDENCE } = await src("data/nationalFlags.ts");
const { WORLD_CUP_RECORDS } = await src("data/worldCupRecords.ts");
const { FLAG_ADOPTION_YEAR } = await src("data/flagAdoptionYears.ts");
const { NATIONAL_CITIES } = await src("data/cities.ts");
const { POLITICAL_PARTIES } = await src("data/politicalParties.ts");
const { COMMERCIAL_AIRLINES } = await src("data/commercialAirlines.ts");
const { NATIONAL_NEWSPAPERS } = await src("data/nationalNewspapers.ts");
const { NATIONAL_NEWS_AGENCIES } = await src("data/nationalNewsAgencies.ts");
const { PUBLIC_BROADCASTERS } = await src("data/publicBroadcasters.ts");
const { CONTINENT_GROUPS, SUBREGION_GROUPS } = await src("lib/continentGroups.ts");
const wvs = (await import(new URL("../src/data/wvsResults.json", import.meta.url).href, { with: { type: "json" } })).default;

const variables = {};
const values = Object.fromEntries(CODES.map((c) => [c, {}]));
const define = (key, meta) => {
  if (variables[key]) throw new Error(`duplicate variable ${key}`);
  variables[key] = meta;
};
const put = (code, key, v, y) => {
  if (v === null || v === undefined || (typeof v === "number" && !Number.isFinite(v))) return;
  values[code][key] = y == null ? { v } : { v, y };
};

// World Bank indicators
for (const [key, code, label, unit] of WDI) {
  const { latest, lastUpdated } = await fetchWdi(code);
  define(key, {
    label, unit, kind: "numeric", publisher: "World Bank, World Development Indicators",
    source: `https://data.worldbank.org/indicator/${code}`, wdiCode: code, lastUpdated,
    note: `Most recent value from ${FRESHNESS_FLOOR} onwards; older values are treated as missing.`,
  });
  for (const c of CODES) if (latest[c]) put(c, key, latest[c].v, latest[c].y);
  process.stdout.write(`  ${key.padEnd(22)} ${code.padEnd(22)} ${CODES.filter((c) => latest[c]).length}/195\n`);
}

// World Bank classification (validation benchmark, never an input)
{
  const [, rows] = await fetchJson(`${WB}/country?format=json&per_page=400`);
  define("wb_income_group", { label: "World Bank income group", kind: "category", role: "benchmark", publisher: "World Bank", source: "https://datahelpdesk.worldbank.org/knowledgebase/articles/906519" });
  define("wb_region", { label: "World Bank region", kind: "category", role: "benchmark", publisher: "World Bank", source: "https://datahelpdesk.worldbank.org/knowledgebase/articles/906519" });
  for (const r of rows) {
    if (!values[r.iso2Code] || r.region?.value === "Aggregates") continue;
    const inc = r.incomeLevel?.value?.trim();
    if (inc && inc !== "Not classified") put(r.iso2Code, "wb_income_group", inc);
    if (r.region?.value) put(r.iso2Code, "wb_region", r.region.value.trim());
  }
}

// Indices (score + publisher's rating category), each with its edition year
for (const [k, [label, source]] of Object.entries(INDEX_META)) {
  define(`idx_${k}`, { label, kind: "numeric", publisher: label.split(" ")[0], source, bundled: "src/data/countryFacts.ts" });
  define(`idx_${k}_rating`, { label: `${label} — rating`, kind: "category", source, bundled: "src/data/countryFacts.ts" });
  for (const c of CODES) {
    const d = COUNTRY_FACTS[c]?.democracy?.[k];
    if (typeof d?.score === "number") put(c, `idx_${k}`, d.score, d.year);
    if (d?.rating) put(c, `idx_${k}_rating`, d.rating, d.year);
  }
}

// Geography (validation / profiling only — never a build input)
const continentOf = {};
for (const [k, arr] of Object.entries(CONTINENT_GROUPS)) for (const c of arr) continentOf[c] = k;
const subregionOf = {};
for (const g of SUBREGION_GROUPS) for (const c of g.codes) subregionOf[c] = g.label;
define("geo_continent", { label: "Continent", kind: "category", role: "benchmark", bundled: "src/lib/continentGroups.ts" });
define("geo_subregion", { label: "Sub-region", kind: "category", role: "benchmark", bundled: "src/lib/continentGroups.ts" });
define("geo_capital_lat", { label: "Capital latitude", kind: "numeric", role: "profile", bundled: "src/data/cities.ts (Natural Earth)" });
for (const c of CODES) {
  put(c, "geo_continent", continentOf[c]);
  put(c, "geo_subregion", subregionOf[c]);
  put(c, "geo_capital_lat", NATIONAL_CITIES[c]?.capitals?.[0]?.lat);
}

// Memberships (31 organisations) — binary descriptors
for (const b of COUNTRY_BLOCKS) {
  const key = `member_${b.label.replace(/[^A-Za-z0-9]+/g, "_").toLowerCase()}`;
  define(key, { label: `Member of ${b.fullName} (${b.abbreviation})`, kind: "binary", group: b.group, source: b.source, bundled: "src/data/countryBlocks.ts" });
  for (const c of CODES) put(c, key, b.codes.includes(c) ? 1 : 0);
}

// Sport
const medalTotal = (v) => {
  if (/none|never/i.test(v)) return 0;
  const m = v.match(/(\d+)\s*[–-]\s*(\d+)\s*[–-]\s*(\d+)/);
  return m ? +m[1] + +m[2] + +m[3] : null;
};
const OLYMPIC = [
  ["sport_summer_games", "Summer Games participated", (v) => parseInt(v, 10)],
  ["sport_winter_games", "Winter Games participated", (v) => parseInt(v, 10)],
  ["sport_summer_medals", "Summer Olympic medals", medalTotal],
  ["sport_winter_medals", "Winter Olympic medals", medalTotal],
];
for (const [key, prefix, parse] of OLYMPIC) {
  define(key, { label: prefix, kind: "numeric", bundled: "src/data/nationalFlags.ts (Olympic committee stats)" });
  for (const c of CODES) {
    const noc = NATIONAL_FLAGS[c]?.find((f) => f.category === "olympiccommittee" && f.id === `${c.toLowerCase()}-olympic-committee`);
    const row = noc?.stats?.find((s) => s.label.startsWith(prefix));
    if (!row) continue;
    const n = parse(row.value);
    if (Number.isFinite(n)) put(c, key, n);
  }
}
for (const [key, field, label] of [
  ["sport_wc_men_apps", "mensAppearances", "Men's World Cup appearances"],
  ["sport_wc_men_titles", "mensTitles", "Men's World Cup titles"],
  ["sport_wc_women_apps", "womensAppearances", "Women's World Cup appearances"],
]) {
  define(key, { label, kind: "numeric", bundled: "src/data/worldCupRecords.ts" });
  for (const c of CODES) put(c, key, WORLD_CUP_RECORDS[`${c.toLowerCase()}-football-crest`]?.[field]);
}

// History and symbols
define("hist_independence_year", { label: "Independence year (sourced record)", kind: "numeric", bundled: "src/data/nationalFlags.ts (NATIONAL_INDEPENDENCE)" });
define("hist_flag_adopted", { label: "Current flag adopted", kind: "numeric", bundled: "src/data/flagAdoptionYears.ts" });
for (const c of CODES) {
  put(c, "hist_independence_year", NATIONAL_INDEPENDENCE[c]?.year);
  put(c, "hist_flag_adopted", FLAG_ADOPTION_YEAR[c]);
}

// Politics: effective number of parliamentary parties (Laakso–Taagepera, seat shares)
define("pol_effective_parties", { label: "Effective number of parties in the legislature (Laakso–Taagepera, by seats)", kind: "numeric", bundled: "src/data/politicalParties.ts" });
for (const c of CODES) {
  const ps = POLITICAL_PARTIES[c];
  const total = ps?.[0]?.seatsTotal;
  if (!ps?.length || !total) continue;
  const hh = ps.reduce((a, p) => a + (p.seats / total) ** 2, 0);
  if (hh > 0) put(c, "pol_effective_parties", Math.round((1 / hh) * 100) / 100);
}

// Media and transport curation counts (descriptors only: they measure our curation as
// much as the country)
for (const [key, data, label, bundled] of [
  ["count_airlines", COMMERCIAL_AIRLINES, "Commercial airlines listed", "src/data/commercialAirlines.ts"],
  ["count_newspapers", NATIONAL_NEWSPAPERS, "National newspapers listed", "src/data/nationalNewspapers.ts"],
  ["count_news_agencies", NATIONAL_NEWS_AGENCIES, "National news agencies listed", "src/data/nationalNewsAgencies.ts"],
  ["count_broadcasters", PUBLIC_BROADCASTERS, "Public broadcasters listed", "src/data/publicBroadcasters.ts"],
]) {
  define(key, { label, kind: "numeric", bundled });
  for (const c of CODES) put(c, key, data[c]?.length ?? 0);
}

// World Values Survey: the ten Inglehart–Welzel items, from country answer shares.
// Year = the society's own fieldwork year (South Africa 2013).
const Q = Object.fromEntries(wvs.questions.map((q) => [q.id, q]));
const dist = (id, c, nSub) => {
  const v = Q[id]?.values?.[c];
  if (!v) return null;
  const sub = v.slice(0, nSub).map((x) => x ?? 0);
  const total = sub.reduce((a, b) => a + b, 0);
  return total > 0 ? { sub, total } : null;
};
const share = (id, c, nSub, slots) => {
  const d = dist(id, c, nSub);
  return d ? Math.round((1000 * slots.reduce((a, i) => a + d.sub[i], 0)) / d.total) / 10 : null;
};
const mean10 = (id, c) => {
  const d = dist(id, c, 10);
  return d ? Math.round((100 * d.sub.reduce((a, p, i) => a + (i + 1) * p, 0)) / d.total) / 100 : null;
};
const WVS_ITEMS = [
  ["wvs_god_importance", "Importance of God (mean, 1–10)", (c) => mean10("Q164", c)],
  ["wvs_abortion_justifiable", "Abortion justifiable (mean, 1–10)", (c) => mean10("Q184", c)],
  ["wvs_homosexuality_justifiable", "Homosexuality justifiable (mean, 1–10)", (c) => mean10("Q182", c)],
  ["wvs_very_proud", "Very proud of nationality (%)", (c) => share("Q254", c, 4, [0])],
  ["wvs_respect_authority_good", "Greater respect for authority would be a good thing (%)", (c) => share("Q45", c, 3, [0])],
  ["wvs_happy", "Very or quite happy (%)", (c) => share("Q46", c, 4, [0, 1])],
  ["wvs_trust", "Most people can be trusted (%)", (c) => share("Q57", c, 2, [0])],
  ["wvs_petition_signed", "Have signed a petition (%)", (c) => share("Q209", c, 3, [0])],
  ["wvs_postmaterialist_first", "First national aim: more say or free speech (%)", (c) => share("Q154", c, 4, [1, 3])],
  ["wvs_autonomy", "Child autonomy index: independence + determination − religious faith − obedience (percentage points)", (c) => {
    const s = ["Q8", "Q14", "Q15", "Q17"].map((id) => share(id, c, 2, [0]));
    return s.some((x) => x == null) ? null : Math.round((s[0] + s[1] - s[2] - s[3]) * 10) / 10;
  }],
];
for (const [key, label, fn] of WVS_ITEMS) {
  define(key, { label, kind: "numeric", publisher: "World Values Survey Association", source: "https://www.worldvaluessurvey.org/WVSDocumentationWV7.jsp", bundled: "src/data/wvsResults.json" });
  for (const c of CODES) {
    const soc = wvs.societies[c];
    if (!soc) continue;
    put(c, key, fn(c), soc.year);
  }
}

// Religion: Pew Research Center, "How the Global Religious Landscape Changed From 2010 to
// 2020" (June 2025). The percentages table of Pew's own dataset zip is bundled VERBATIM under
// scripts/data/ and verified by sha256 here, so a changed or hand-edited file fails loudly.
// Pew estimates cover places with at least 100,000 people, so a dozen microstates (and the
// Vatican) have no figure — they stay missing, never estimated here.
const PEW = {
  file: "scripts/data/pew-religious-composition-2010-2020-percentages.csv",
  sha256: "0634d9ff61bcce57c4e9aecd5fdcdd84e01cd465089b39450fd85527c0351d2f",
  zip: "https://www.pewresearch.org/wp-content/uploads/sites/20/2025/06/Religious-Composition-2010-2020-dataset.zip",
  zipSha256: "39d1cf1b1dec28e22bc5e2a0e9ab958a8afdcdc971a79c175ff49d03e6ce8af6",
  report: "https://www.pewresearch.org/religion/2025/06/09/how-the-global-religious-landscape-changed-from-2010-to-2020/",
  fetched: "2026-09-24",
  year: 2020,
};
{
  const raw = readFileSync(resolve(ROOT, PEW.file));
  const got = createHash("sha256").update(raw).digest("hex");
  if (got !== PEW.sha256) throw new Error(`${PEW.file}: sha256 ${got} does not match the recorded Pew file`);
  const [header, ...lines] = raw.toString("utf8").replace(/^\uFEFF/, "").trim().split(/\r?\n/);
  const cols = header.split(",");
  const at = (name) => {
    const i = cols.indexOf(name);
    if (i < 0) throw new Error(`${PEW.file}: no column ${name}`);
    return i;
  };
  const RELIGIONS = [
    ["rel_christian", "Christians", "Christians (% of population)"],
    ["rel_muslim", "Muslims", "Muslims (% of population)"],
    ["rel_unaffiliated", "Religiously_unaffiliated", "Religiously unaffiliated (% of population)"],
    ["rel_buddhist", "Buddhists", "Buddhists (% of population)"],
    ["rel_hindu", "Hindus", "Hindus (% of population)"],
    ["rel_jewish", "Jews", "Jews (% of population)"],
    ["rel_other", "Other_religions", "Other religions, incl. folk religions (% of population)"],
  ];
  for (const [key, , label] of RELIGIONS) {
    define(key, {
      label, unit: "%", kind: "numeric", publisher: "Pew Research Center", source: PEW.report,
      dataset: PEW.zip, datasetSha256: PEW.zipSha256, bundled: PEW.file, fetched: PEW.fetched,
      note: `${PEW.year} estimates. Pew covers places with at least 100,000 people.`,
    });
  }
  const [iYear, iLevel, iCode] = [at("Year"), at("Level"), at("Countrycode")];
  for (const line of lines) {
    const f = line.split(",");
    if (f[iYear] !== String(PEW.year) || f[iLevel] !== "1") continue;
    const code = isoCountries.numericToAlpha2(f[iCode].padStart(3, "0"))?.toUpperCase();
    if (!code || !values[code]) continue;
    for (const [key, col] of RELIGIONS) put(code, key, Math.round(Number(f[at(col)]) * 100) / 100, PEW.year);
  }
}

// Official languages: the seven languages that are official in five or more of the 195
// states, read from the app's bundled COUNTRY_FACTS (mledoze/countries, the authoritative
// source restcountries is generated from). Binary heritage descriptors.
{
  const LANGS = ["English", "French", "Arabic", "Spanish", "Portuguese", "Russian", "German"];
  for (const lang of LANGS) {
    const key = `lang_${lang.toLowerCase()}`;
    define(key, {
      label: `${lang} is an official language`, kind: "binary", publisher: "mledoze/countries",
      source: "https://github.com/mledoze/countries", bundled: "src/data/countryFacts.ts",
    });
    for (const c of CODES) {
      const langs = COUNTRY_FACTS[c]?.languages;
      if (Array.isArray(langs) && langs.length) put(c, key, langs.includes(lang) ? 1 : 0);
    }
  }
}

// ── Coverage and write ───────────────────────────────────────────────────────
for (const key of Object.keys(variables)) {
  variables[key].coverage = CODES.filter((c) => values[c][key] !== undefined).length;
}
// English short names, read as text from the app's own list (importing the module would
// pull in the profile/Firebase code it sits beside).
const names = {};
for (const m of readFileSync(resolve(ROOT, "src/lib/countrySelection.ts"), "utf8").matchAll(/\{ code: "([A-Z]{2})", name: "([^"]+)" \}/g)) {
  names[m[1]] = m[2];
}
const unnamed = CODES.filter((c) => !names[c]);
if (unnamed.length) throw new Error(`no English name for ${unnamed.join(", ")}`);

const snapshot = {
  generatedBy: "scripts/build-country-persona-inputs.mjs",
  generated: new Date().toISOString().slice(0, 10),
  universe: CODES,
  names: Object.fromEntries(CODES.map((c) => [c, names[c]])),
  freshnessFloor: FRESHNESS_FLOOR,
  variables,
  values,
};
writeFileSync(OUT, JSON.stringify(snapshot, null, 1) + "\n");
console.log(`✓ ${OUT.replace(ROOT + "/", "")} — ${CODES.length} countries × ${Object.keys(variables).length} variables`);
