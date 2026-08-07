// Which continent is a historical polity's land ON?
//
// Shared by scripts/build-polity-continents.mjs (which bakes the answer into
// src/data/polityContinents.ts) and scripts/check-era-continents.mjs (which uses it to
// verify the curated region labels). Both must measure the same thing, so the measuring
// lives here rather than being written twice.
//
// The reference geography is `public/countries-50m.json` — the SAME Natural Earth
// topology every map in the app draws, including the historical eras' coastline layer.
// Nothing here invents geography: a polity's continent is read off the bundled basemap.

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { geoContains } from "d3-geo";
import { feature } from "topojson-client";
import isoCountries from "i18n-iso-countries";

const __dirname = dirname(fileURLToPath(import.meta.url));
const R = (p) => resolve(__dirname, p);

/** Not polities — the app's own HistoricalMap excludes these from the grid. */
export const NOT_A_POLITY = new Set(["Antarctica", "1", "true"]);

/**
 * Continent for the non-UN territories Natural Earth draws as their own polygons.
 * CONTINENT_GROUPS covers only the 195 UN states, but a polity's land can sit on
 * Greenland, the Falklands or French Polynesia and must still resolve.
 */
const TERRITORY_CONTINENT = {
  AI: "Americas", AS: "Oceania", AW: "Americas", AX: "Europe", BL: "Americas",
  BM: "Americas", CK: "Oceania", CW: "Americas", EH: "Africa", FK: "Americas",
  FO: "Europe", GG: "Europe", GL: "Americas", GS: "Americas", GU: "Oceania",
  HK: "Asia", HM: "Oceania", IM: "Europe", IO: "Asia", JE: "Europe",
  KY: "Americas", MF: "Americas", MO: "Asia", MP: "Oceania", MS: "Americas",
  NC: "Oceania", NF: "Oceania", NU: "Oceania", PF: "Oceania", PM: "Americas",
  PN: "Oceania", PR: "Americas", SH: "Africa", SX: "Americas", TC: "Americas",
  TF: "Africa", TW: "Asia", VG: "Americas", VI: "Americas", WF: "Oceania",
};

/** Code-less Natural Earth polygons, matched by feature name. */
const NAMED_CONTINENT = {
  Somaliland: "Africa",
  Kosovo: "Europe",
  "N. Cyprus": "Asia",
  "Indian Ocean Ter.": "Oceania",
  "Siachen Glacier": "Asia",
};

/**
 * Countries whose own territory spans continents, so "which country is this point in" is
 * not enough on its own. Each returns the continent for a given [lon, lat].
 *
 * These are continental divides and overseas departments, not political statements:
 * France's Guiana is in the Americas and its Réunion is off Africa however Paris
 * administers them, and Natural Earth draws all of it as one "France" polygon.
 */
const SPLIT_COUNTRY = {
  // Overseas departments drawn inside the metropolitan polygon.
  FR: ([lon, lat]) => (lon < -20 ? "Americas" : lat < 10 ? "Africa" : "Europe"),
  // The Canaries, Ceuta and Melilla sit off / on the African coast.
  ES: ([, lat]) => (lat < 32 ? "Africa" : "Europe"),
  // Hawaii is Polynesian; Alaska and the lower 48 are not.
  US: ([lon, lat]) => (lon < -140 && lat < 30 ? "Oceania" : "Americas"),
  // The Urals; Kaliningrad stays European, Chukotka does not.
  RU: ([lon]) => (lon > 60 || lon < -100 ? "Asia" : "Europe"),
  // The Bosphorus — East Thrace is in Europe.
  TR: ([lon]) => (lon > 29 ? "Asia" : "Europe"),
  // The Ural river.
  KZ: ([lon]) => (lon > 55 ? "Asia" : "Europe"),
  // Only Sinai is in Asia — the Red Sea coast south of it (the Blemmyes' desert, lon 33–37
  // at lat 20–24) is African Egypt, so this needs the latitude as well as the longitude.
  EG: ([lon, lat]) => (lon > 32.9 && lat > 28 ? "Asia" : "Africa"),
  // Western New Guinea is in Oceania, the rest of the archipelago in Asia.
  ID: ([lon]) => (lon > 131 ? "Oceania" : "Asia"),
  // Easter Island / Rapa Nui is in Polynesia.
  CL: ([lon]) => (lon < -95 ? "Oceania" : "Americas"),
};

const { CONTINENT_GROUPS } = await import(R("../../src/lib/continentGroups.ts"));

export const continentByCode = new Map();
for (const [continent, codes] of Object.entries(CONTINENT_GROUPS)) {
  for (const code of codes) continentByCode.set(code, continent);
}

const topo = JSON.parse(readFileSync(R("../../public/countries-50m.json"), "utf8"));
const refs = [];
for (const f of feature(topo, topo.objects.countries).features) {
  const name = f.properties?.name;
  if (name === "Antarctica") continue; // never a polity in this game (see the Antarctic rule)
  const code = f.id != null ? isoCountries.numericToAlpha2(String(f.id)) : undefined;
  const flat = continentByCode.get(code) ?? TERRITORY_CONTINENT[code] ?? NAMED_CONTINENT[name];
  const split = code ? SPLIT_COUNTRY[code] : undefined;
  if (!flat && !split) continue;
  const g = f.geometry;
  const polygons =
    g.type === "Polygon" ? [g.coordinates] : g.type === "MultiPolygon" ? g.coordinates : [];
  for (const coordinates of polygons) {
    refs.push({
      flat,
      split,
      geometry: { type: "Polygon", coordinates },
      bbox: bboxOfRing(coordinates[0]),
      anchor: ringMetrics(coordinates[0]).centroid,
    });
  }
}

function bboxOfRing(ring) {
  let minX = 180, minY = 90, maxX = -180, maxY = -90;
  for (const [x, y] of ring) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  return [minX, minY, maxX, maxY];
}

/**
 * Planar |area| and centroid of a ring, in degrees² scaled by cos(lat) so areas are
 * comparable across latitudes.
 *
 * Deliberately NOT d3's geoCentroid/geoArea: those read the ring's winding order, and a
 * backwards-wound ring yields the ANTIPODE — which put Nigeria's Jukun in the Pacific on
 * the first run of this code. The era files come from several upstream sources and their
 * winding is not uniform, so the measure that decides a polity's continent must not
 * depend on it.
 */
export function ringMetrics(ring) {
  let twiceArea = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0, n = ring.length - 1; i < n; i += 1) {
    const [x0, y0] = ring[i];
    const [x1, y1] = ring[i + 1];
    const cross = x0 * y1 - x1 * y0;
    twiceArea += cross;
    cx += (x0 + x1) * cross;
    cy += (y0 + y1) * cross;
  }
  if (twiceArea === 0) {
    let sx = 0;
    let sy = 0;
    for (const [x, y] of ring) {
      sx += x;
      sy += y;
    }
    return { area: 0, centroid: [sx / ring.length, sy / ring.length] };
  }
  const centroid = [cx / (3 * twiceArea), cy / (3 * twiceArea)];
  const area = Math.abs(twiceArea / 2) * Math.cos((centroid[1] * Math.PI) / 180);
  return { area, centroid };
}

// Coarse spatial index over the reference polygons, so a point test looks at a handful of
// candidates instead of all ~1,400. Sampling a polity's interior (below) needs this.
const CELL = 5;
const cellKey = (x, y) => `${Math.floor(x / CELL)},${Math.floor(y / CELL)}`;
const refIndex = new Map();
for (const ref of refs) {
  const [minX, minY, maxX, maxY] = ref.bbox;
  for (let x = Math.floor(minX / CELL); x <= Math.floor(maxX / CELL); x += 1) {
    for (let y = Math.floor(minY / CELL); y <= Math.floor(maxY / CELL); y += 1) {
      const key = `${x},${y}`;
      const list = refIndex.get(key) ?? [];
      list.push(ref);
      refIndex.set(key, list);
    }
  }
}

/** Which continent a point sits on: the polygon containing it, else the nearest one. */
const pointCache = new Map();
export function continentAt(point) {
  const key = `${point[0].toFixed(2)},${point[1].toFixed(2)}`;
  const hit = pointCache.get(key);
  if (hit !== undefined) return hit;
  let answer = null;
  for (const ref of refIndex.get(cellKey(point[0], point[1])) ?? []) {
    const [minX, minY, maxX, maxY] = ref.bbox;
    if (point[0] < minX || point[0] > maxX || point[1] < minY || point[1] > maxY) continue;
    if (geoContains(ref.geometry, point)) {
      answer = ref.split ? ref.split(point) : ref.flat;
      break;
    }
  }
  if (!answer) {
    // A sample can fall just off the coast, or in open water between a polity's islands.
    // Take the nearest landmass rather than dropping it.
    let best = Infinity;
    for (const ref of refs) {
      const dx = ref.anchor[0] - point[0];
      const dy = ref.anchor[1] - point[1];
      const d = dx * dx + dy * dy;
      if (d < best) {
        best = d;
        answer = ref.split ? ref.split(point) : ref.flat;
      }
    }
  }
  pointCache.set(key, answer);
  return answer;
}

/** Even-odd point-in-ring test on the raw lon/lat plane — independent of winding order. */
function pointInRing(ring, x, y) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/**
 * Points spread through a ring's interior, weighted by cos(lat).
 *
 * A polity is not a point: the Russian Empire, the USSR and the Ottoman Empire each draw
 * Europe and Asia inside ONE polygon, so asking only where the polygon's centroid falls
 * says "Asia 100%" and makes filing them under Europe look like an error. Sampling the
 * interior measures how the land actually divides. Small rings (an island, a city-state)
 * fall back to their centroid, which is all their size warrants.
 */
const TARGET_SAMPLES = 120;
function ringSamples(ring) {
  const [minX, minY, maxX, maxY] = bboxOfRing(ring);
  const w = maxX - minX;
  const h = maxY - minY;
  const step = Math.max(0.25, Math.sqrt((w * h) / TARGET_SAMPLES));
  const out = [];
  for (let x = minX + step / 2; x < maxX; x += step) {
    for (let y = minY + step / 2; y < maxY; y += step) {
      if (pointInRing(ring, x, y)) out.push([x, y]);
    }
  }
  if (out.length === 0) out.push(ringMetrics(ring).centroid);
  return out;
}

/** Area-weighted continent split for one polity's outer rings, largest share first. */
export function continentSplit(rings) {
  const byContinent = new Map();
  let total = 0;
  for (const ring of rings) {
    const { area } = ringMetrics(ring);
    if (!(area > 0)) continue;
    const samples = ringSamples(ring);
    // Every sample stands for the same slice of this ring, so weight by the ring's own
    // area — a ring sampled 3 times must not outvote a continent-sized one sampled 120.
    const perSample = area / samples.length;
    for (const point of samples) {
      const c = continentAt(point);
      if (!c) continue;
      byContinent.set(c, (byContinent.get(c) ?? 0) + perSample);
      total += perSample;
    }
  }
  return [...byContinent.entries()]
    .map(([continent, area]) => ({ continent, share: total ? area / total : 0 }))
    .sort((a, b) => b.share - a.share);
}

/**
 * The polity name for a feature — mirrors `polityFeatureName()` in HistoricalMap.tsx,
 * which is what decides the names the flag grid actually shows.
 *
 * It must stay in step with that function: measuring the raw NAME instead missed the
 * upstream features whose NAME is pure whitespace while their own SUBJECTO / PARTOF /
 * ABBREVN holds the real name (1815's Netherlands is `NAME: "       "`, SUBJECTO
 * "United Kingdom of Netherlands"). Those polities DO reach the grid, and one of them
 * reached it with no continent.
 */
function polityFeatureName(f) {
  const direct = (f.properties?.NAME ?? "").trim();
  if (direct) return NOT_A_POLITY.has(direct) ? null : direct;
  for (const alt of [f.properties?.SUBJECTO, f.properties?.PARTOF, f.properties?.ABBREVN]) {
    const v = (alt ?? "").trim();
    if (v && !NOT_A_POLITY.has(v)) return v;
  }
  return null;
}

/** Outer rings of every named polity in one era's GeoJSON, keyed by the name the app shows. */
export function polityRings(geo) {
  const byName = new Map();
  for (const f of geo.features) {
    const name = polityFeatureName(f);
    if (!name) continue;
    // Adopted gap-fill polygons ARE counted. They are painted under the era's own
    // features and never steal attribution from a finer polity (see the sourced-polity-
    // border rule), but they are still where that NAME is drawn — and HistoricalMap emits
    // their names to the flag grid like any other. Five polities exist ONLY as gap-fill
    // ("Maya states", "Hindu states", "Aymara kingdoms", "Andean states and chiefdoms",
    // "Islamic states"), so skipping them left exactly those five in the "Other" heading.
    const g = f.geometry;
    if (!g) continue;
    const list = byName.get(name) ?? [];
    if (g.type === "Polygon") list.push(g.coordinates[0]);
    else if (g.type === "MultiPolygon") for (const poly of g.coordinates) list.push(poly[0]);
    byName.set(name, list);
  }
  return byName;
}
