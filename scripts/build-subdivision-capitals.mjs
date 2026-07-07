/**
 * Generate src/data/subdivisionCapitals.ts from Wikidata.
 * Run: node scripts/build-subdivision-capitals.mjs
 *
 * WHY THIS EXISTS: the primary city dataset (src/data/cities.ts) sources each
 * subdivision's capital from Natural Earth's populated-places layer, which only
 * tags a capital for the subdivisions NE happens to carry a capital point for.
 * ~1,800 of the app's ~4,170 subdivisions (Slovenia's municipalities, Latvia's,
 * Italy's provinces, Australia's external territories such as Norfolk Island,
 * etc.) get NO capital that way, so the Learn-mode map's capital overlay shows
 * nothing for them.
 *
 * WHY WIKIDATA: it carries an authoritative capital (P36) with the capital
 * city's coordinates (P625), keyed to the ISO 3166-2 code (P300) we already
 * use — the same lineage the population generator relies on. This fills the
 * gap NE leaves, from an authoritative source, exactly as the CLAUDE.md hard
 * rule "City overlay data must be sourced, never fabricated" requires.
 *
 * FALLBACK, NOT OVERRIDE: this file is consumed by src/lib/cityRoles.ts ONLY
 * for subdivisions that have no NE capital in cities.ts — NE (already
 * reconciled against COUNTRY_FACTS) always wins where it has data. So the
 * generator emits a row ONLY for a code that (a) the app actually renders
 * (exists in SUBDIVISION_META), and (b) lacks a `capital` in cities.ts.
 *
 * Requires network egress to query.wikidata.org. One query per country
 * (filtered by the ISO 3166-2 prefix) keeps each request small. The generator
 * only re-formats authoritative source data — it never invents a capital or a
 * coordinate; a subdivision Wikidata has no P36+P625 for is simply left absent,
 * exactly like a fact-sheet row that renders only when present.
 */

import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { CODE_ALIASES } from "./data/wikidata-subdivision-code-aliases.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const META = join(projectRoot, "src", "lib", "subdivisionMeta.ts");
const CITIES = join(projectRoot, "src", "data", "cities.ts");
const OUTPUT = join(projectRoot, "src", "data", "subdivisionCapitals.ts");

const ENDPOINT = "https://query.wikidata.org/sparql";
const USER_AGENT =
  "HanaFlagGame-subdiv-cap/1.0 (https://github.com/wladimirchagas/Hana-s-flag-game)";

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
  return [...readFileSync(META, "utf8").matchAll(/^  "([A-Z]{2})":\s*\{/gm)].map((m) => m[1]);
}

/** Every subdivision code the app renders (excludes ~ and -X# placeholders). */
function appSubdivisionCodes() {
  const codes = new Set();
  for (const m of readFileSync(META, "utf8").matchAll(/code:\s*"([^"]+)"/g)) {
    const code = m[1].trim().toUpperCase();
    if (code.endsWith("~") || /-X\d/.test(code)) continue;
    codes.add(code);
  }
  return codes;
}

/** Subdivision codes that ALREADY have a capital in cities.ts (NE-sourced). */
function codesWithNeCapital() {
  const text = readFileSync(CITIES, "utf8");
  const sec = text.slice(text.indexOf("SUBNATIONAL_CITIES"));
  const have = new Set();
  for (const m of sec.matchAll(/^ {2}"([^"]+)":\s*(\{.*\}),?$/gm)) {
    if (m[2].includes('"capital":')) have.add(m[1].toUpperCase());
  }
  return have;
}

/**
 * Subdivisions whose Wikidata item has a capital (P36) with coordinates but NO
 * P300 (ISO 3166-2 code), so the P300-prefixed country queries can never reach
 * them — mostly external territories modelled in Wikidata without an ISO code.
 * Fetched directly by QID; each QID was confirmed by checking the item's
 * English label/description matches the app's subdivision before use.
 */
const NO_ISO_CODE_QIDS = {
  "AU-NF": "Q31057", // Norfolk Island → Kingston (Australian external territory)
};

/**
 * Keep, per code, the current capital. `wdt:P36` returns only best-rank
 * (current) values, so former capitals with an end-date qualifier are already
 * excluded. If an item still lists more than one, the first is kept and a
 * warning is printed so a genuine ambiguity is never silently resolved.
 */
function collectCapitals(rows, seenWarn) {
  const out = new Map();
  for (const r of rows) {
    const rawCode = r.code?.value;
    if (!rawCode) continue;
    const code = (CODE_ALIASES[rawCode] ?? rawCode).toUpperCase();
    const name = r.capitalLabel?.value?.trim();
    const lon = Number(r.lon?.value);
    const lat = Number(r.lat?.value);
    if (!name || !Number.isFinite(lon) || !Number.isFinite(lat)) continue;
    // A label service that couldn't resolve a name returns the bare QID.
    if (/^Q\d+$/.test(name)) continue;
    const prev = out.get(code);
    if (prev) {
      if (prev.name !== name && seenWarn) {
        console.warn(`  ⚠ ${code}: multiple current capitals (${prev.name}, ${name}) — keeping ${prev.name}`);
      }
      continue;
    }
    out.set(code, { name, lon: round(lon), lat: round(lat) });
  }
  return out;
}

const round = (n) => Math.round(n * 1e4) / 1e4;

async function fetchSubdivisionCapitals(cc) {
  const q = `SELECT ?code ?capital ?capitalLabel ?lon ?lat WHERE {
    ?sub wdt:P300 ?code . FILTER(STRSTARTS(?code, "${cc}-"))
    ?sub wdt:P36 ?capital .
    ?capital p:P625 ?coordStmt . ?coordStmt psv:P625 ?coordNode .
    ?coordNode wikibase:geoLongitude ?lon ; wikibase:geoLatitude ?lat .
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  }`;
  return collectCapitals(await sparql(q), true);
}

async function fetchByQid(code, qid) {
  const q = `SELECT ?code ?capital ?capitalLabel ?lon ?lat WHERE {
    BIND("${code}" AS ?code)
    wd:${qid} wdt:P36 ?capital .
    ?capital p:P625 ?coordStmt . ?coordStmt psv:P625 ?coordNode .
    ?coordNode wikibase:geoLongitude ?lon ; wikibase:geoLatitude ?lat .
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  }`;
  return collectCapitals(await sparql(q), false).get(code.toUpperCase()) ?? null;
}

/** Load the previous run's rows so a refresh can never silently drop coverage. */
function loadExisting() {
  const out = new Map();
  let text;
  try {
    text = readFileSync(OUTPUT, "utf8");
  } catch {
    return out;
  }
  const m = text.match(/SUBDIVISION_CAPITALS[^{]*\{([\s\S]*?)\n\};/);
  if (!m) return out;
  for (const e of m[1].matchAll(/"([^"]+)":\s*(\{[^}]*\})/g)) {
    try {
      const v = JSON.parse(e[2]);
      if (v && v.name) out.set(e[1].toUpperCase(), { name: v.name, lon: v.lon, lat: v.lat });
    } catch {
      /* skip malformed */
    }
  }
  return out;
}

async function main() {
  const appCodes = appSubdivisionCodes();
  const covered = codesWithNeCapital();
  // The gap the fallback must fill: rendered subdivisions with no NE capital.
  const gap = (code) => appCodes.has(code) && !covered.has(code);

  const codes = countryCodes();
  const capitals = new Map(); // code -> {name, lon, lat}

  for (let i = 0; i < codes.length; i++) {
    const cc = codes[i];
    process.stdout.write(`[${i + 1}/${codes.length}] ${cc} `);
    try {
      const found = await fetchSubdivisionCapitals(cc);
      let added = 0;
      for (const [code, v] of found) {
        if (gap(code)) {
          capitals.set(code, v);
          added++;
        }
      }
      console.log(`→ ${added} gap capital(s) filled (${found.size} returned)`);
    } catch (e) {
      console.log(`→ FAILED (${e.message})`);
    }
    await sleep(200); // be polite
  }

  console.log("\nFetching capitals with no Wikidata P300 code (by QID)...");
  for (const [code, qid] of Object.entries(NO_ISO_CODE_QIDS)) {
    const CODE = code.toUpperCase();
    if (!gap(CODE)) {
      console.log(`  ${code} (${qid}) → skipped (not a gap)`);
      continue;
    }
    try {
      const v = await fetchByQid(code, qid);
      if (v) {
        capitals.set(CODE, v);
        console.log(`  ${code} (${qid}) → ${v.name} (${v.lon}, ${v.lat})`);
      } else {
        console.log(`  ${code} (${qid}) → no capital+coordinates found`);
      }
    } catch (e) {
      console.log(`  ${code} (${qid}) → FAILED (${e.message})`);
    }
    await sleep(1000);
  }

  // Never let a refresh drop a code the new fetch didn't return (e.g. a
  // transient Wikidata failure) — preserve any previously-known capital.
  let preserved = 0;
  for (const [code, v] of loadExisting()) {
    if (!capitals.has(code) && gap(code)) {
      capitals.set(code, v);
      preserved++;
    }
  }
  if (preserved) console.log(`\nPreserved ${preserved} capital(s) from the previous run.`);

  writeOutput(capitals);
}

function writeOutput(capitals) {
  const byCountry = new Map();
  for (const [code, v] of capitals) {
    const cc = code.split("-")[0];
    if (!byCountry.has(cc)) byCountry.set(cc, []);
    byCountry.get(cc).push([code, v]);
  }
  const countries = [...byCountry.keys()].sort();

  let body = "";
  for (const cc of countries) {
    body += `\n  // ── ${cc} ──\n`;
    for (const [code, v] of byCountry.get(cc).sort((a, b) => a[0].localeCompare(b[0]))) {
      body += `  ${JSON.stringify(code)}: ${JSON.stringify(v)},\n`;
    }
  }

  const ts = `// Auto-generated by scripts/build-subdivision-capitals.mjs — DO NOT EDIT MANUALLY
// Source: Wikidata (capital P36 + its coordinates P625, keyed by ISO 3166-2 code
// P300; a few code-less external territories fetched by QID). This is the FALLBACK
// capital layer for the Learn-mode map overlay: it fills ONLY the subdivisions that
// have no capital in src/data/cities.ts (Natural Earth carries no capital point for
// them). Natural Earth — already reconciled against COUNTRY_FACTS — always wins
// where it has data; see src/lib/cityRoles.ts.
//
// To refresh: node scripts/build-subdivision-capitals.mjs (needs egress to
// query.wikidata.org). The generator only re-formats authoritative source data — it
// never invents a capital or a coordinate; a subdivision Wikidata has no P36+P625
// for is simply omitted.

import type { City } from "./cities";

/** Keyed by ISO 3166-2 subdivision code. Fallback capitals only (see header). */
export const SUBDIVISION_CAPITALS: Readonly<Record<string, City>> = {${body}};
`;

  writeFileSync(OUTPUT, ts);
  console.log(`\nWrote ${OUTPUT}`);
  console.log(`  ${capitals.size} fallback capitals across ${countries.length} countries`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
