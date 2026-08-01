// Builds src/data/flagAdoptionYears.ts — the year each country's CURRENT flag
// design was adopted.
//
// WHY THIS EXISTS
// The Learn-mode historical eras let a polity whose NAME matches a modern country
// borrow that country's flag (`eraAllowsModernFlagFallback`, 1914 onwards). That is
// right for a flag older than the era — Brazil 1889, Switzerland, most of Latin
// America — and flatly wrong for every flag adopted afterwards. Measured before this
// gate existed: 99 polities in 1914, 140 in 1945 and 115 in 1960 borrowed today's
// flag, including South Africa's 1994 flag shown for 1914, Uganda's 1962 flag for
// 1960, and Bangladesh (1971) in the 1945 map. A plausible flag decades out of period
// is worse than no flag — the same principle as "never show the parent nation's flag
// for a subdivision".
//
// SOURCE
// Wikidata: the country item's flag (P163) and that flag item's inception (P571),
// keyed by ISO 3166-1 alpha-2 (P297). The generator only re-formats authoritative
// data — it never guesses a year. Countries Wikidata has no dated flag for are simply
// absent, and an absent year BLOCKS the fallback (see historicalEras.ts), so a gap is
// a missing flag, never a wrong one.
//
// CURATED OVERRIDES
// P571 on a flag item is sometimes the first hoisting of an ancestor design rather
// than the adoption of the current one, and a few items carry no date at all. Those
// are corrected in ADOPTION_OVERRIDES below, each with a cited reason, exactly like
// the capital-flag and population override tables.
//
// Re-run: node scripts/build-flag-adoption-years.mjs   (needs egress to query.wikidata.org)

import { writeFileSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const R = (p) => resolve(__dirname, p);

/**
 * Hand-verified adoption years. Each entry says WHY Wikidata's P571 is not the year
 * the app needs. "Adopted" means the year the CURRENT design became the national flag.
 */
const ADOPTION_OVERRIDES = {
  // Wikidata dates the design's first use in 1777/1818; the flag the app ships is the
  // 50-star version, official 4 July 1960 after Hawaii's admission.
  // https://en.wikipedia.org/wiki/Flag_of_the_United_States
  US: 1960,
  // The Union Jack in its current form dates from the 1801 Act of Union.
  // https://en.wikipedia.org/wiki/Union_Jack
  GB: 1801,
  // Tricolour restored 1830 (July Revolution) and unbroken since.
  // https://en.wikipedia.org/wiki/Flag_of_France
  FR: 1830,
  // Black-red-gold readopted by the Federal Republic on 23 May 1949.
  // https://en.wikipedia.org/wiki/Flag_of_Germany
  DE: 1949,
  // Maple Leaf proclaimed 15 February 1965, replacing the Canadian Red Ensign.
  // https://en.wikipedia.org/wiki/Flag_of_Canada
  CA: 1965,
  // Post-apartheid flag first flown 27 April 1994.
  // https://en.wikipedia.org/wiki/Flag_of_South_Africa
  ZA: 1994,
  // Hinomaru used from 1870; legally confirmed 1999. 1870 is the year it became the
  // national flag, which is what the era gate needs.
  // https://en.wikipedia.org/wiki/Flag_of_Japan
  JP: 1870,
  // PRC flag adopted 27 September 1949.
  // https://en.wikipedia.org/wiki/Flag_of_China
  CN: 1949,
  // Islamic Republic flag adopted 29 July 1980.
  // https://en.wikipedia.org/wiki/Flag_of_Iran
  IR: 1980,
  // Taliban/Islamic Emirate flag, de facto since August 2021 (the app ships this one).
  // https://en.wikipedia.org/wiki/Flag_of_Afghanistan
  AF: 2021,

  // --- Corrections where P571 is a LATER re-affirmation of an unchanged design ---
  // Blocking a flag that did exist is a missing flag rather than a wrong one, so this
  // direction of error is safe — but where the design's own date is documented, use it.
  //
  // Red replaced orange in the Dutch tricolour during 1597–1660s; the 1937 royal
  // decree (which P571 reports) only re-affirmed the colours after Orangist/fascist
  // groups revived the older Prince's Flag.
  // https://en.wikipedia.org/wiki/Flag_of_the_Netherlands
  NL: 1660,
  // The red-white-light-blue tricolour has been in use since 1845; the 1972 law
  // (Wikidata's date) merely formalised it.
  // https://en.wikipedia.org/wiki/Flag_of_Luxembourg
  LU: 1845,

  // --- Corrections where P571 is an ANCESTOR design, not the current flag ---
  // These are the dangerous direction: an over-old date would let a modern flag show
  // in an era that never saw it.
  //
  // Wikidata dates the green-yellow-red lineage to 1778. The current flag — with the
  // blue disc and gold star emblem — was adopted on 6 February 1996.
  // https://en.wikipedia.org/wiki/Flag_of_Ethiopia
  ET: 1996,
  // Wikidata dates Peter the Great's tricolour to 1696. It was readopted as the flag
  // of the Russian Federation on 22 August 1991 (the USSR flew the red banner from
  // 1922 to 1991, which is what the app's 1945/1960 eras must show).
  // https://en.wikipedia.org/wiki/Flag_of_Russia
  RU: 1991,

  // --- Corrections where P571 is a later STANDARDISATION of an unchanged design ---
  // Same safe direction as NL/LU above: the design the app shows really did fly at
  // these dates, and Wikidata's year is a proportions/shade regulation, not a redesign.
  //
  // The Dannebrog is documented from the 14th century (Gelre Armorial, c. 1340–70) and
  // was recognised as the national flag on 8 May 1625; the 1748 regulation Wikidata
  // dates only fixed its proportions.
  // https://en.wikipedia.org/wiki/Flag_of_Denmark
  DK: 1625,
  // Blue with a yellow Nordic cross is first described in a royal warrant of 19 April
  // 1562; the 1906 flag law standardised the shades.
  // https://en.wikipedia.org/wiki/Flag_of_Sweden
  SE: 1562,
  // The Swiss cross became the federal flag with the 1841/1848 federal state; the 1889
  // act Wikidata dates fixed the cross's geometry.
  // https://en.wikipedia.org/wiki/Flag_of_Switzerland
  CH: 1841,
  // The blue-and-red bicolour with the arms was first used under Pétion in 1806 and
  // flew until 1964; the Duvaliers' black-and-red replaced it 1964–1986, and Wikidata
  // dates that restoration. It is period-correct for 1815, 1880, 1914, 1945 and 1960.
  // https://en.wikipedia.org/wiki/Flag_of_Haiti
  HT: 1806,
  // First adopted 1842; the 2013 revision Wikidata dates only redrew the emblems.
  // https://en.wikipedia.org/wiki/Flag_of_Paraguay
  PY: 1842,
  // The yellow-blue-red tricolour dates to 1811; the 2006 revision added the eighth
  // star. Earlier era maps therefore show a flag differing only in star count.
  // https://en.wikipedia.org/wiki/Flag_of_Venezuela
  VE: 1811,

  // --- Missing from Wikidata entirely ---
  // The Bahamas' aquamarine-gold flag was hoisted at independence, 10 July 1973.
  // https://en.wikipedia.org/wiki/Flag_of_the_Bahamas
  BS: 1973,
};

const SPARQL = `
SELECT ?code ?flag ?inception WHERE {
  ?country wdt:P297 ?code .
  ?country wdt:P163 ?flag .
  OPTIONAL { ?flag wdt:P571 ?inception }
}`;

async function fetchWikidata() {
  const url = new URL("https://query.wikidata.org/sparql");
  url.searchParams.set("query", SPARQL);
  const res = await fetch(url, {
    headers: {
      Accept: "application/sparql-results+json",
      "User-Agent": "hana-flag-game/1.0 (historical-era flag adoption years)",
    },
  });
  if (!res.ok) throw new Error(`Wikidata query failed: ${res.status}`);
  return (await res.json()).results.bindings;
}

const rows = await fetchWikidata();

/** code → earliest inception year Wikidata carries for the country's current flag. */
const years = new Map();
for (const row of rows) {
  const code = row.code?.value?.toUpperCase();
  const inception = row.inception?.value;
  if (!code || !inception) continue;
  // Negative years (BC) and malformed values are ignored rather than guessed at.
  const year = Number(inception.slice(0, 4));
  if (!Number.isFinite(year) || year < 1000) continue;
  // A country can have several flag statements (e.g. a former flag left in place).
  // Take the LATEST — the current design — since the gate asks "is today's flag old
  // enough for this era?".
  const prev = years.get(code);
  if (prev == null || year > prev) years.set(code, year);
}

for (const [code, year] of Object.entries(ADOPTION_OVERRIDES)) years.set(code, year);

// Keep only the codes the app actually knows about.
const selectionSrc = readFileSync(R("../src/lib/countrySelection.ts"), "utf8");
const known = new Set(
  [...selectionSrc.matchAll(/code:\s*"([A-Z]{2})"/g)].map((m) => m[1]),
);
const out = [...years.entries()].filter(([code]) => known.has(code)).sort(([a], [b]) => a.localeCompare(b));

const overridden = new Set(Object.keys(ADOPTION_OVERRIDES));
const body = out
  .map(([code, year]) => `  ${code}: ${year},${overridden.has(code) ? " // curated" : ""}`)
  .join("\n");

writeFileSync(
  R("../src/data/flagAdoptionYears.ts"),
  `// AUTO-GENERATED by scripts/build-flag-adoption-years.mjs — do not edit by hand.
// Re-run: node scripts/build-flag-adoption-years.mjs
//
// Year the country's CURRENT flag design was adopted, from Wikidata (flag P163 →
// inception P571), plus the curated ADOPTION_OVERRIDES in the generator.
//
// Used by the Learn-mode historical eras: a polity may only borrow a modern country's
// flag when that flag already existed at the era's date. A code missing from this map
// BLOCKS the borrow — a missing flag is always better than a flag decades out of
// period. See the "historical eras must never show an anachronistic flag" rule.

export const FLAG_ADOPTION_YEAR: Readonly<Record<string, number>> = {
${body}
};
`,
);

console.log(`wrote ${out.length} adoption years (${known.size} known codes, ${out.length} covered)`);
const missing = [...known].filter((c) => !years.has(c)).sort();
console.log(`no dated flag on Wikidata for ${missing.length}: ${missing.join(" ")}`);
