/**
 * One-off research tool (not part of the build pipeline): for every country
 * with subdivisions missing a dated Wikidata population figure, fetch ALL of
 * that country's P300 codes + English item labels from Wikidata, and match
 * them by normalized name against subdivisionMeta's missing codes. A match
 * means the population data already exists on Wikidata under a *different*
 * ISO 3166-2 code than the one this app uses (e.g. an old-vs-new ISO
 * numbering revision, as found for France's overseas departments and
 * North Macedonia's municipalities) — not missing data, just a key mismatch.
 *
 * Safety: a match is only auto-approved if the normalized name is unique on
 * BOTH sides — i.e. our own meta has exactly one division with that name in
 * that country, AND Wikidata has exactly one P300-coded item with that label
 * in that country. Ambiguous matches (homonyms on either side, e.g. a
 * capital city sharing a name with its surrounding province) are reported
 * separately for manual review instead of being silently applied — blind
 * acceptance has already been found to produce wrong data (Mexico City vs.
 * State of Mexico; Tobago's two regional corporations vs. the whole island).
 *
 * Output: /tmp/all-aliases.json — auto-approved [appCode, wikidataCode, name, country]
 * Output: /tmp/ambiguous-aliases.json — candidates needing manual review, with the reason.
 */
import { readFileSync, writeFileSync } from "fs";

const META = "src/lib/subdivisionMeta.ts";
const POP = "src/data/subdivisionPopulation.ts";
const ENDPOINT = "https://query.wikidata.org/sparql";
const USER_AGENT = "HanaFlagGame-alias-research/1.0";

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
    if (attempt < 3) {
      await sleep(2000 * 2 ** attempt);
      return sparql(query, attempt + 1);
    }
    console.warn(`  FAILED: ${e.message}`);
    return [];
  }
}

function norm(s) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\b(municipality|district|province|region|county|state|department|of|the|city|island|islands|governorate|prefecture|division|department)\b/g, "")
    .replace(/[^a-z]/g, "");
}

function metaDivisionsByCountry() {
  const t = readFileSync(META, "utf8");
  const byCountry = new Map();
  for (const m of t.matchAll(/"([A-Z]{2})":\s*\{\s*countryCode:[^]*?divisions:\s*\[([\s\S]*?)\n\s*\],/g)) {
    const cc = m[1];
    const rows = [...m[2].matchAll(/code:\s*"([A-Z0-9~-]+)",\s*name:\s*"([^"]+)"/g)].map((r) => [r[1], r[2]]);
    byCountry.set(cc, rows);
  }
  return byCountry;
}

function popCodes() {
  const t = readFileSync(POP, "utf8");
  return new Set([...t.matchAll(/"([A-Z0-9~-]+)":\s*\{\s*population/g)].map((m) => m[1]));
}

async function main() {
  const byCountry = metaDivisionsByCountry();
  const haveData = popCodes();
  const countriesWithGaps = [...byCountry.entries()]
    .map(([cc, rows]) => [cc, rows, rows.filter(([code]) => !haveData.has(code) && !code.endsWith("~"))])
    .filter(([, , missing]) => missing.length > 0);

  console.log(`${countriesWithGaps.length} countries with gaps`);
  const approved = [];
  const ambiguous = [];

  for (let i = 0; i < countriesWithGaps.length; i++) {
    const [cc, allRows, missing] = countriesWithGaps[i];
    process.stdout.write(`[${i + 1}/${countriesWithGaps.length}] ${cc} (${missing.length} missing) `);

    // our own meta side: how many divisions share each normalized name?
    const metaNameCounts = new Map();
    for (const [, name] of allRows) {
      const n = norm(name);
      metaNameCounts.set(n, (metaNameCounts.get(n) ?? 0) + 1);
    }

    const q = `SELECT ?code ?itemLabel WHERE {
      ?item wdt:P300 ?code . FILTER(STRSTARTS(?code, "${cc}-"))
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }`;
    const rows = await sparql(q);
    const wdByName = new Map(); // normalized name -> Set of codes
    for (const r of rows) {
      const code = r.code?.value;
      const label = r.itemLabel?.value;
      if (!code || !label) continue;
      const n = norm(label);
      if (!wdByName.has(n)) wdByName.set(n, new Set());
      wdByName.get(n).add(code);
    }

    let found = 0;
    for (const [appCode, name] of missing) {
      const n = norm(name);
      const wdCodes = wdByName.get(n);
      if (!wdCodes || wdCodes.size === 0) continue;
      const candidateCodes = [...wdCodes].filter((c) => c !== appCode && haveData.has(c));
      if (candidateCodes.length === 0) continue;

      const metaAmbiguous = (metaNameCounts.get(n) ?? 0) > 1;
      const wdAmbiguous = candidateCodes.length > 1;
      if (metaAmbiguous || wdAmbiguous) {
        ambiguous.push([
          appCode,
          candidateCodes,
          name,
          cc,
          metaAmbiguous ? "meta-side homonym" : "wikidata-side homonym",
        ]);
      } else {
        approved.push([appCode, candidateCodes[0], name, cc]);
        found++;
      }
    }
    console.log(`→ ${found} approved, ${ambiguous.filter((a) => a[3] === cc).length} ambiguous so far`);
    await sleep(150);
  }

  writeFileSync("/tmp/all-aliases.json", JSON.stringify(approved, null, 1));
  writeFileSync("/tmp/ambiguous-aliases.json", JSON.stringify(ambiguous, null, 1));
  console.log(`\nApproved: ${approved.length}. Ambiguous (manual review): ${ambiguous.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
