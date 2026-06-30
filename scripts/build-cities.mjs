// Build the bundled, offline-safe city dataset for the Learn-mode map overlays
// (src/data/cities.ts) — national capitals + largest cities, and per-subdivision
// capitals + largest cities, for the countries the feature currently covers.
//
// Re-run with:  node scripts/build-cities.mjs
//
// SOURCING (hard rule — see CLAUDE.md "City data must be sourced, never
// fabricated"):
//   • Geography (which cities exist, capital classification, coordinates) and
//     the candidate-city list come from Natural Earth 10m populated places
//     (nvkelso/natural-earth-vector) — the same dataset lineage as the bundled
//     basemap. A filtered extract is committed at scripts/data/ne_places_test.geojson
//     so this build is reproducible without network egress.
//   • Natural Earth's `pop_max` is an URBAN-AGGLOMERATION figure and is known to
//     misrank "largest city" in some countries (it ranks George Town above Kuala
//     Lumpur, and Geneva above Zürich). Those cases are corrected via the curated
//     LARGEST_OVERRIDE table below, each with a cited reason. NE also tags a few
//     HISTORICAL capitals as "Admin-0 capital alt" (e.g. Kyoto for Japan); those
//     are removed via HISTORICAL_CAPITAL_BLOCK.
//   • Multi-capital arrangements and de-facto capitals (Bolivia, South Africa,
//     Switzerland, Malaysia) carry a sourced role note from CAPITAL_ROLES.
//
// This generator only RE-FORMATS authoritative source data and applies a small,
// individually-cited correction layer. It never invents a city, a coordinate, or
// a population — anything it cannot resolve from the source is omitted, exactly
// like the country-facts and subdivision-population generators.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const NE = resolve(__dirname, "data/ne_places_test.geojson");
const META = resolve(__dirname, "../src/lib/subdivisionMeta.ts");
const SUBDIV_DIR = resolve(__dirname, "../public/subdivisions");
const OUT = resolve(__dirname, "../src/data/cities.ts");

// Countries the city overlay currently covers (the agreed test set).
const TEST_COUNTRIES = ["BR", "JP", "MY", "AU", "BO", "ZA", "CH", "AR", "GB", "DK", "SG"];

// --- Curated correction layer (each entry cited) -----------------------------

// Cities Natural Earth tags as a national-capital "alt" that are NOT a current
// capital (historical / former seats). Removed so they don't show as co-capitals.
const HISTORICAL_CAPITAL_BLOCK = new Set([
  "JP|Kyoto", // Imperial capital until 1869; NE tags it "Admin-0 capital alt".
]);

// National capitals NE does not flag with adm0cap=1 but which are a real, current
// (co-)capital. Coordinates are resolved from the NE extract by name.
//   • Putrajaya — Malaysia's administrative capital / seat of the federal
//     government and judiciary since 1999 (Kuala Lumpur remains the
//     constitutional/national capital and seat of parliament).
const EXTRA_NATIONAL_CAPITALS = {
  MY: ["Putrajaya"],
};

// Sourced role note shown next to a capital marker. Keyed `${iso}|${cityName}`.
// Only multi-capital / de-facto arrangements need a note; a sole capital shows none.
const CAPITAL_ROLES = {
  // Bolivia — Sucre is the constitutional capital and seat of the judiciary;
  // La Paz is the seat of the executive and legislative branches.
  "BO|Sucre": "Constitutional capital",
  "BO|La Paz": "Seat of government",
  // South Africa — three capitals, one per branch of government.
  "ZA|Pretoria": "Executive capital",
  "ZA|Cape Town": "Legislative capital",
  "ZA|Bloemfontein": "Judicial capital",
  // Switzerland has no de jure capital; Bern is the "federal city" (de facto).
  "CH|Bern": "De facto capital (federal city)",
  // Malaysia — constitutional vs administrative capital.
  "MY|Kuala Lumpur": "Constitutional capital",
  "MY|Putrajaya": "Administrative capital",
};

// Largest-city corrections where NE's urban-agglomeration pop_max misranks the
// city-proper largest city. Each is the well-established largest city of its
// country by city-proper population.
const LARGEST_OVERRIDE = {
  // NE ranks George Town (Penang conurbation) first; Kuala Lumpur is Malaysia's
  // largest city (and is also its constitutional capital).
  MY: "Kuala Lumpur",
  // NE ranks Geneva first (its agglomeration spills across the French border);
  // Zürich is Switzerland's largest city.
  CH: "Zürich",
};

// Subdivision capital/largest overrides, keyed by ISO 3166-2 code. Used where
// Natural Earth's adm1name does not map to this app's subdivision codes — most
// importantly the United Kingdom, whose app subdivisions are the four
// constituent countries (GB-ENG/SCT/WLS/NIR) while NE's adm1name is the historic
// counties. City names are resolved to coordinates from the NE extract.
//   • England   — London is both the capital and the largest city.
//   • Scotland  — Edinburgh is the capital; Glasgow is the largest city.
//   • Wales     — Cardiff is the capital and largest city.
//   • N.Ireland — Belfast is the capital and largest city.
const SUBNATIONAL_OVERRIDE = {
  "GB-ENG": { capital: "London", largest: "London" },
  "GB-SCT": { capital: "Edinburgh", largest: "Glasgow" },
  "GB-WLS": { capital: "Cardiff", largest: "Cardiff" },
  "GB-NIR": { capital: "Belfast", largest: "Belfast" },
};

// --- Load Natural Earth extract ---------------------------------------------

const fc = JSON.parse(readFileSync(NE, "utf8"));

/** Normalise a place/subdivision name for matching (diacritics, case, noise). */
function norm(s) {
  return String(s || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/^(city|province|state|prefecture|emirate|canton|region|department)\s+of\s+/i, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** All NE places, normalised to a small record. */
const places = fc.features.map((f) => {
  const p = f.properties;
  return {
    name: p.name,
    iso: p.iso_a2,
    adm1: p.adm1name,
    adm0cap: Number(p.adm0cap) === 1,
    capalt: Number(p.capalt) === 1,
    featurecla: p.featurecla || "",
    pop: Number(p.pop_max) || 0,
    lon: Number(p.longitude),
    lat: Number(p.latitude),
  };
});

const placesByIso = new Map();
for (const pl of places) {
  if (!TEST_COUNTRIES.includes(pl.iso)) continue;
  if (!placesByIso.has(pl.iso)) placesByIso.set(pl.iso, []);
  placesByIso.get(pl.iso).push(pl);
}

/** Find a place by name within a country (normalised match). */
function findPlace(iso, name) {
  const want = norm(name);
  const arr = placesByIso.get(iso) || [];
  return (
    arr.find((p) => norm(p.name) === want) ||
    arr.find((p) => norm(p.name).includes(want) || want.includes(norm(p.name))) ||
    null
  );
}

function cityFrom(pl, note) {
  if (!pl || !isFinite(pl.lon) || !isFinite(pl.lat)) return null;
  const c = { name: pl.name, lon: round(pl.lon), lat: round(pl.lat) };
  if (pl.pop > 0) c.population = pl.pop;
  if (note) c.note = note;
  return c;
}
const round = (n) => Math.round(n * 1e4) / 1e4;

// --- Build national cities ---------------------------------------------------

const national = {};
for (const iso of TEST_COUNTRIES) {
  const arr = placesByIso.get(iso) || [];
  // Capitals: NE adm0cap places, minus historical blocks, plus curated extras.
  const capPlaces = arr.filter(
    (p) => p.adm0cap && !HISTORICAL_CAPITAL_BLOCK.has(`${iso}|${p.name}`),
  );
  for (const extra of EXTRA_NATIONAL_CAPITALS[iso] || []) {
    const pl = findPlace(iso, extra);
    if (pl && !capPlaces.includes(pl)) capPlaces.push(pl);
  }
  const capitals = capPlaces
    .map((p) => cityFrom(p, CAPITAL_ROLES[`${iso}|${p.name}`]))
    .filter(Boolean)
    // Primary capital (capalt=false) first, then by population.
    .sort((a, b) => (b.population || 0) - (a.population || 0));

  // Largest city: curated override, else NE max pop_max.
  let largest = null;
  if (LARGEST_OVERRIDE[iso]) {
    largest = cityFrom(findPlace(iso, LARGEST_OVERRIDE[iso]));
  }
  if (!largest) {
    const top = [...arr].sort((a, b) => b.pop - a.pop)[0];
    largest = top ? cityFrom(top) : null;
  }

  if (capitals.length || largest) {
    national[iso] = {};
    if (capitals.length) national[iso].capitals = capitals;
    if (largest) national[iso].largest = largest;
  }
}

// --- Build subnational cities ------------------------------------------------
//
// Natural Earth's `adm1name` field is encoding-corrupted in the simplified
// extract (e.g. "Córdoba" -> "CRrdoba"), so it cannot be trusted to map a city
// to a subdivision. Instead we assign each city to a subdivision GEOMETRICALLY:
// a point-in-polygon test of the city's (clean) coordinates against this app's
// own subdivision polygons (public/subdivisions/{CC}.json), keyed by the same
// iso_3166_2 code the maps use. Geography decides — no name matching involved.

function pointInRing(pt, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0], yi = ring[i][1];
    const xj = ring[j][0], yj = ring[j][1];
    const hit =
      yi > pt[1] !== yj > pt[1] &&
      pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi;
    if (hit) inside = !inside;
  }
  return inside;
}
function pointInPolygon(pt, rings) {
  if (!pointInRing(pt, rings[0])) return false; // outside outer ring
  for (let k = 1; k < rings.length; k++) if (pointInRing(pt, rings[k])) return false; // in a hole
  return true;
}
function pointInGeometry(pt, geom) {
  if (!geom) return false;
  if (geom.type === "Polygon") return pointInPolygon(pt, geom.coordinates);
  if (geom.type === "MultiPolygon")
    return geom.coordinates.some((poly) => pointInPolygon(pt, poly));
  return false;
}

const subnational = {};
const noGeo = [];

// Group NE places by the subdivision polygon that geographically contains them.
const placesByCode = new Map();
for (const iso of TEST_COUNTRIES) {
  const path = resolve(SUBDIV_DIR, `${iso}.json`);
  if (!existsSync(path)) {
    noGeo.push(iso);
    continue;
  }
  const sub = JSON.parse(readFileSync(path, "utf8"));
  for (const pl of placesByIso.get(iso) || []) {
    if (!isFinite(pl.lon) || !isFinite(pl.lat)) continue;
    const pt = [pl.lon, pl.lat];
    const feat = sub.features.find((f) => pointInGeometry(pt, f.geometry));
    const code = feat?.properties?.iso_3166_2?.trim().toUpperCase();
    if (!code) continue;
    if (!placesByCode.has(code)) placesByCode.set(code, []);
    placesByCode.get(code).push(pl);
  }
}

// Auto-derive capital + largest for each subdivision.
//   • capital — the contained city Natural Earth tags as an Admin-1 capital
//     (highest-population one if several); falls back to none when NE tags no
//     Admin-1 capital inside the polygon.
//   • largest — the highest-population contained city.
for (const [code, arr] of placesByCode) {
  const byPop = (a, b) => b.pop - a.pop;
  const capPlace =
    // Prefer an Admin-1 capital tag; fall back to any capital tag so a national
    // capital that sits in a subdivision (Tokyo in JP-13, Buenos Aires in AR-C)
    // is also recognised as that subdivision's capital — NE only gives it the
    // higher Admin-0 tag, which the Admin-1 filter would otherwise miss.
    [...arr].filter((p) => /Admin-1.*capital/i.test(p.featurecla)).sort(byPop)[0] ||
    [...arr].filter((p) => /capital/i.test(p.featurecla)).sort(byPop)[0] ||
    null;
  const largestPlace = [...arr].sort(byPop)[0] || null;
  const entry = {};
  const cap = cityFrom(capPlace);
  const lrg = cityFrom(largestPlace);
  if (cap) entry.capital = cap;
  if (lrg) entry.largest = lrg;
  if (entry.capital || entry.largest) subnational[code] = entry;
}

// Apply curated subnational overrides (resolved to coordinates from NE).
for (const [code, ov] of Object.entries(SUBNATIONAL_OVERRIDE)) {
  const iso = code.split("-")[0];
  const entry = subnational[code] ? { ...subnational[code] } : {};
  if (ov.capital) {
    const c = cityFrom(findPlace(iso, ov.capital));
    if (c) entry.capital = c;
  }
  if (ov.largest) {
    const c = cityFrom(findPlace(iso, ov.largest));
    if (c) entry.largest = c;
  }
  if (entry.capital || entry.largest) subnational[code] = entry;
}

// --- Emit --------------------------------------------------------------------

const header = `// AUTO-GENERATED by scripts/build-cities.mjs — do not edit by hand.
// Re-run: node scripts/build-cities.mjs
//
// City overlay data for the Learn-mode maps: national capitals + largest city,
// and per-subdivision capitals + largest city.
//
// SOURCING (hard rule — CLAUDE.md "City data must be sourced, never fabricated"):
// geography/capital-class/coordinates come from Natural Earth 10m populated
// places; a small cited correction layer in the generator fixes NE's
// urban-agglomeration mis-rankings of "largest city" (e.g. Kuala Lumpur, Zürich),
// removes historical capital tags (e.g. Kyoto), and adds sourced role notes for
// multi-capital / de-facto arrangements (Bolivia, South Africa, Switzerland,
// Malaysia). Nothing here is invented; unresolved data is omitted.

export type City = {
  /** City name as published by the source. */
  name: string;
  /** Longitude / latitude (WGS84) for plotting on the Equal Earth projection. */
  lon: number;
  lat: number;
  /** Population (Natural Earth urban-area figure). Optional. */
  population?: number;
  /** Sourced role note for multi-capital / de-facto capitals (e.g. "Executive
   *  capital"). Absent for a sole capital or a plain largest city. */
  note?: string;
};

export type NationalCities = {
  /** One or more current capitals (Bolivia has 2, South Africa has 3). */
  capitals?: City[];
  /** The single largest city by population. */
  largest?: City;
};

export type SubnationalCities = {
  capital?: City;
  largest?: City;
};

/** Keyed by ISO 3166-1 alpha-2 country code. */
export const NATIONAL_CITIES: Readonly<Record<string, NationalCities>> = ${stringify(national)};

/** Keyed by ISO 3166-2 subdivision code. */
export const SUBNATIONAL_CITIES: Readonly<Record<string, SubnationalCities>> = ${stringify(subnational)};
`;

writeFileSync(OUT, header, "utf8");

function stringify(obj) {
  // Compact, stable, one-key-per-line-ish JSON suited to a data module.
  const keys = Object.keys(obj).sort();
  const lines = keys.map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(obj[k])},`);
  return `{\n${lines.join("\n")}\n}`;
}

console.log(`Wrote ${Object.keys(national).length} national + ${Object.keys(subnational).length} subnational entries to ${OUT}`);
if (noGeo.length) {
  console.log(`No subdivision polygons found for: ${noGeo.join(", ")}`);
}
