// Build a bundled, offline-safe country-facts dataset for the Learn-mode
// country widget (src/data/countryFacts.ts).
//
// WHY THIS EXISTS — hard rule (see CLAUDE.md "Country widget information"):
// The Learn-mode panel shows Capital, Official name, Languages and Currencies.
// At runtime these come from restcountries.com, which has a long history of
// outages and is blocked on some networks (it returns HTTP 403 from the
// build/CI environment used here). When that fetch fails the app falls back to
// a locally-built country list — and that list MUST still carry the widget's
// information, otherwise the widget silently loses Capital / Official name /
// Languages / Currencies. Bundling the data locally guarantees the widget is
// always complete, exactly like the "all flag files must be bundled" rule.
//
// Source: mledoze/countries — the authoritative dataset that restcountries.com
// itself is generated from (https://github.com/mledoze/countries). Reachable
// over GitHub raw even when restcountries.com is blocked.
//
// Re-run with:  node scripts/build-country-facts.mjs
//
// This script only RE-FORMATS authoritative source data into a local module.
// It never invents capitals, languages or currencies — if mledoze lacks a
// field for a country, the field is simply omitted (the widget already renders
// only the rows whose data is present).

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../src/data/countryFacts.ts");
const SOURCE =
  "https://raw.githubusercontent.com/mledoze/countries/master/countries.json";

// The 195 UN member + permanent-observer states the game uses. Kept in sync
// with src/lib/unMemberStates.ts (the only codes the widget ever looks up).
const UN_MEMBER_CODES = new Set([
  "AF","AL","DZ","AD","AO","AG","AR","AM","AU","AT","AZ","BS","BH","BD","BB",
  "BY","BE","BZ","BJ","BT","BO","BA","BW","BR","BN","BG","BF","BI","CV","KH",
  "CM","CA","CF","TD","CL","CN","CO","KM","CG","CD","CR","CI","HR","CU","CY",
  "CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","SZ","ET","FJ","FI",
  "FR","GA","GM","GE","DE","GH","GR","GD","GT","GN","GW","GY","HT","HN","HU",
  "IS","IN","ID","IR","IQ","IE","IL","IT","JM","JP","JO","KZ","KE","KI","KP",
  "KR","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MG","MW","MY",
  "MV","ML","MT","MH","MR","MU","MX","FM","MD","MC","MN","ME","MA","MZ","MM",
  "NA","NR","NP","NL","NZ","NI","NE","NG","MK","NO","OM","PK","PW","PA","PG",
  "PY","PE","PH","PL","PT","QA","RO","RU","RW","KN","LC","VC","WS","SM","ST",
  "SA","SN","RS","SC","SL","SG","SK","SI","SB","SO","ZA","SS","ES","LK","SD",
  "SR","SE","CH","SY","TJ","TZ","TH","TL","TG","TO","TT","TN","TR","TM","TV",
  "UG","UA","AE","GB","US","UY","UZ","VU","VE","VN","YE","ZM","ZW","PS","VA",
]);

/**
 * Curated corrections applied on top of the source data, each with a cited
 * reason — the same discipline as CAPITAL_FLAG_SOURCE_OVERRIDES and
 * MANUAL_VERIFIED_POPULATION. These exist because mledoze/countries lags
 * official renamings by months; an override keeps the correction alive across
 * every regen instead of being silently reverted by the next run.
 *
 * This NEVER invents a fact — every entry restates an authoritative source.
 * Delete an entry once upstream carries the same value.
 */
const FACT_OVERRIDES = {
  // Nauru's parliament passed the constitutional amendment on 13 May 2026 and the
  // country notified the UN on 26 June 2026; the UN member-states list now reads
  // "Naoero", formally "Republic of Naoero". ISO 3166-1 alpha-2 remains NR.
  // https://www.un.org/en/about-us/member-states/naoero
  NR: { nameOfficial: "Republic of Naoero" },
};

const res = await fetch(SOURCE);
if (!res.ok) {
  console.error(`Failed to fetch ${SOURCE}: HTTP ${res.status}`);
  process.exit(1);
}
const data = await res.json();

/** @type {Record<string, object>} */
const facts = {};
let count = 0;
for (const c of data) {
  const code = (c.cca2 || "").toUpperCase();
  if (!code || !UN_MEMBER_CODES.has(code)) continue;

  const entry = {};

  const official = c.name?.official?.trim();
  if (official) entry.nameOfficial = official;

  const capital = Array.isArray(c.capital) ? c.capital[0]?.trim() : undefined;
  if (capital) entry.capital = capital;

  if (c.languages && typeof c.languages === "object") {
    const langs = Array.from(
      new Set(Object.values(c.languages).map((l) => String(l).trim()).filter(Boolean)),
    );
    if (langs.length > 0) entry.languages = langs;
  }

  if (c.currencies && typeof c.currencies === "object") {
    const currencies = Object.entries(c.currencies)
      .map(([currCode, info]) => {
        const out = { code: currCode, name: (info?.name ?? "").trim() || currCode };
        if (info?.symbol && String(info.symbol).trim()) out.symbol = String(info.symbol).trim();
        return out;
      })
      .filter((x) => x.name);
    if (currencies.length > 0) entry.currencies = currencies;
  }

  const override = FACT_OVERRIDES[code];
  if (override) Object.assign(entry, override);

  if (Object.keys(entry).length > 0) {
    facts[code] = entry;
    count++;
  }
}

const sortedCodes = Object.keys(facts).sort();
const body = sortedCodes
  .map((code) => `  ${code}: ${JSON.stringify(facts[code])},`)
  .join("\n");

const file = `// AUTO-GENERATED by scripts/build-country-facts.mjs — do not edit by hand.
// Re-run: node scripts/build-country-facts.mjs
//
// Offline-safe bundle of the Learn-mode country widget's information
// (official name, capital, official languages, currencies) for every UN
// member / permanent-observer state. Sourced from mledoze/countries — the
// authoritative dataset restcountries.com is generated from.
//
// HARD RULE (CLAUDE.md "Country widget information"): these fields must stay
// bundled so the widget is complete even when restcountries.com is blocked or
// down. Never reduce or delete this data without approval.

export type CountryFacts = {
  nameOfficial?: string;
  capital?: string;
  languages?: string[];
  currencies?: { code: string; name: string; symbol?: string }[];
};

export const COUNTRY_FACTS: Readonly<Record<string, CountryFacts>> = {
${body}
};
`;

await writeFile(OUT, file, "utf8");
console.log(`Wrote ${count} country-facts entries to ${OUT}`);
