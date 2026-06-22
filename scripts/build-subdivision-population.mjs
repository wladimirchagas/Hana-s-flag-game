/**
 * Generate src/data/subdivisionPopulation.ts from Wikidata.
 * Run: node scripts/build-subdivision-population.mjs
 *
 * WHY WIKIDATA: it is the only reachable source that carries an authoritative
 * population (P1082) *with a point-in-time qualifier* (P585) and a
 * determination-method qualifier (P459, census vs estimate), keyed to the
 * ISO 3166-2 code (P300) we already use. That gives, for essentially every
 * subdivision the app shows, a population, the year of the figure, and whether
 * it is a census or an estimate — exactly what the Learn-mode panel needs.
 *
 * Requires network egress to query.wikidata.org. The query is run once per
 * country (filtered by the ISO 3166-2 prefix) so each request stays small and
 * never times out. For every code we keep the population statement with the
 * most recent point-in-time; statements with no point-in-time are ignored, so
 * every emitted entry can state its year (no undated figures are shipped).
 *
 * National reference totals (the share denominator's offline fallback) come
 * from the country item's own latest dated P1082.
 *
 * The generator only re-formats authoritative source data — it never invents a
 * figure. A subdivision with no dated Wikidata population is simply omitted,
 * exactly like the country fact-sheet rows that render only when present.
 */

import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const META = join(projectRoot, "src", "lib", "subdivisionMeta.ts");
const OUTPUT = join(projectRoot, "src", "data", "subdivisionPopulation.ts");

const ENDPOINT = "https://query.wikidata.org/sparql";
const USER_AGENT =
  "HanaFlagGame-subdiv-pop/1.0 (https://github.com/wladimirchagas/Hana-s-flag-game)";
const CENSUS_QID = "Q39825"; // "census" (determination method)

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function sparql(query, attempt = 0) {
  const url = `${ENDPOINT}?format=json&query=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, Accept: "application/sparql-results+json" },
    });
    if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    return json.results.bindings;
  } catch (e) {
    if (attempt < 4) {
      const wait = 2000 * 2 ** attempt;
      console.warn(`  retry in ${wait}ms (${e.message})`);
      await sleep(wait);
      return sparql(query, attempt + 1);
    }
    throw e;
  }
}

/** Country codes the app actually shows subdivisions for. */
function countryCodes() {
  const t = readFileSync(META, "utf8");
  return [...t.matchAll(/^  "([A-Z]{2})":\s*\{/gm)].map((m) => m[1]);
}

const yearOf = (iso) => (iso ? Number(iso.slice(0, 4)) : null);

/** Keep, per code, the row with the most recent point-in-time. */
function pickLatest(rows, codeKey, popKey = "pop", dateKey = "date", methodKey = "method") {
  const best = new Map();
  for (const r of rows) {
    const code = r[codeKey]?.value;
    const date = r[dateKey]?.value;
    const pop = Number(r[popKey]?.value);
    if (!code || !date || !Number.isFinite(pop) || pop <= 0) continue; // dated only
    const year = yearOf(date);
    const isCensus = r[methodKey]?.value?.endsWith(CENSUS_QID) ?? false;
    const prev = best.get(code);
    if (!prev || year > prev.year) {
      best.set(code, { population: Math.round(pop), year, basis: isCensus ? "census" : "estimate" });
    }
  }
  return best;
}

async function fetchSubdivisions(cc) {
  const q = `SELECT ?code ?pop ?date ?method WHERE {
    ?item wdt:P300 ?code . FILTER(STRSTARTS(?code, "${cc}-"))
    ?item p:P1082 ?st . ?st ps:P1082 ?pop .
    OPTIONAL { ?st pq:P585 ?date . }
    OPTIONAL { ?st pq:P459 ?method . }
  }`;
  return pickLatest(await sparql(q), "code");
}

async function fetchNational(cc) {
  const q = `SELECT ?c ?pop ?date ?method WHERE {
    ?c wdt:P297 "${cc}" .
    ?c p:P1082 ?st . ?st ps:P1082 ?pop .
    OPTIONAL { ?st pq:P585 ?date . }
    OPTIONAL { ?st pq:P459 ?method . }
  }`;
  const best = pickLatest(await sparql(q), "c");
  // there is at most one country item; return its figure
  return [...best.values()][0] ?? null;
}

/**
 * Some subdivisions (mostly external territories / crown dependencies, e.g.
 * Norfolk Island, the Cayman Islands, the US Virgin Islands) have a dated
 * Wikidata population statement but no P300 (ISO 3166-2 code) property, so
 * the P300-filtered queries above can never find them — not a missing
 * figure, just a missing link in Wikidata. Loading the *previous* run's
 * output as a baseline and only ever adding to it (never dropping a code the
 * new fetch didn't return) means a refresh can't silently regress coverage,
 * matching this project's "never reduce bundled information" rule.
 */
function loadExisting(path, sectionRe, entryRe) {
  const map = new Map();
  let text;
  try {
    text = readFileSync(path, "utf8");
  } catch {
    return map;
  }
  const section = text.match(sectionRe);
  if (!section) return map;
  for (const m of section[1].matchAll(entryRe)) map.set(m[1], m.slice(2));
  return map;
}

function loadExistingSubdivisions() {
  const raw = loadExisting(
    OUTPUT,
    /SUBDIVISION_POPULATION:[^{]*\{([\s\S]*?)\n\};/,
    /"([^"]+)":\s*\{\s*population:\s*(\d+),\s*year:\s*(\d+),\s*basis:\s*"(\w+)"\s*\}/g,
  );
  const out = new Map();
  for (const [code, [pop, year, basis]] of raw) {
    out.set(code, { population: Number(pop), year: Number(year), basis });
  }
  return out;
}

function loadExistingNational() {
  const raw = loadExisting(
    OUTPUT,
    /NATIONAL_REFERENCE_POPULATION[^{]*\{([\s\S]*?)\n\};/,
    /"([^"]+)":\s*(\d+)/g,
  );
  const out = new Map();
  for (const [cc, [pop]] of raw) out.set(cc, Number(pop));
  return out;
}

async function main() {
  const codes = countryCodes();
  const subdivisions = new Map(); // code -> {population, year, basis}
  const national = new Map(); // CC -> population

  for (let i = 0; i < codes.length; i++) {
    const cc = codes[i];
    process.stdout.write(`[${i + 1}/${codes.length}] ${cc} `);
    try {
      const subs = await fetchSubdivisions(cc);
      for (const [k, v] of subs) subdivisions.set(k, v);
      const nat = await fetchNational(cc);
      if (nat) national.set(cc, nat.population);
      console.log(`→ ${subs.size} subdivisions`);
    } catch (e) {
      console.log(`→ FAILED (${e.message})`);
    }
    await sleep(200); // be polite
  }

  // Never let a refresh drop a code the new fetch didn't return — preserve
  // any previously-known figure (e.g. territories Wikidata doesn't tag with
  // P300) instead of silently losing coverage.
  let preserved = 0;
  for (const [code, v] of loadExistingSubdivisions()) {
    if (!subdivisions.has(code)) {
      subdivisions.set(code, v);
      preserved++;
    }
  }
  let preservedNational = 0;
  for (const [cc, pop] of loadExistingNational()) {
    if (!national.has(cc)) {
      national.set(cc, pop);
      preservedNational++;
    }
  }
  if (preserved > 0 || preservedNational > 0) {
    console.log(
      `\nPreserved ${preserved} subdivision(s) and ${preservedNational} national total(s) ` +
        `from the previous run that the new fetch didn't return.`,
    );
  }

  writeOutput(subdivisions, national);
}

function writeOutput(subdivisions, national) {
  // group subdivision codes by country prefix, sorted
  const byCountry = new Map();
  for (const [code, v] of subdivisions) {
    const cc = code.split("-")[0];
    if (!byCountry.has(cc)) byCountry.set(cc, []);
    byCountry.get(cc).push([code, v]);
  }
  const countries = [...byCountry.keys()].sort();

  let body = "";
  for (const cc of countries) {
    body += `\n  // ── ${cc} ──\n`;
    const rows = byCountry.get(cc).sort((a, b) => b[1].population - a[1].population);
    for (const [code, v] of rows) {
      body += `  ${JSON.stringify(code)}: { population: ${v.population}, year: ${v.year}, basis: ${JSON.stringify(v.basis)} },\n`;
    }
  }

  let natBody = "";
  for (const cc of [...national.keys()].sort()) {
    natBody += `  ${JSON.stringify(cc)}: ${national.get(cc)},\n`;
  }

  const ts = `// Auto-generated by scripts/build-subdivision-population.mjs — DO NOT EDIT MANUALLY
// Source: Wikidata (population P1082 + point-in-time P585 + determination method P459,
// keyed by ISO 3166-2 code P300). Each figure is the most recent *dated* population
// statement for that subdivision, so the Learn-mode panel can always state the year.
//
// To refresh: node scripts/build-subdivision-population.mjs (needs egress to
// query.wikidata.org). The generator only re-formats authoritative source data — it
// never invents a figure; a subdivision with no dated Wikidata population is omitted.

export type SubdivisionPopulation = {
  /** Total resident population of the whole subdivision. */
  population: number;
  /** Reference year of the figure (point-in-time of the Wikidata statement). */
  year: number;
  /** How the figure was produced — shown after the year ("2021 census"). */
  basis: "census" | "estimate";
};

// National totals (latest dated country-level P1082), used purely as the
// denominator when computing a subdivision's share of the national population
// if the live national figure is unavailable. Never shown as "the national
// population" — the country widget owns that, live.
export const NATIONAL_REFERENCE_POPULATION: Record<string, number> = {
${natBody}};

export const SUBDIVISION_POPULATION: Record<string, SubdivisionPopulation> = {
${body}};
`;

  writeFileSync(OUTPUT, ts);
  console.log(`\nWrote ${OUTPUT}`);
  console.log(`  ${subdivisions.size} subdivisions across ${countries.length} countries`);
  console.log(`  ${national.size} national reference totals`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
