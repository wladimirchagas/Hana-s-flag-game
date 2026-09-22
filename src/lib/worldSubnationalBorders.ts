/**
 * Lazy loader for the Learn-mode world-map "Sub-national borders" overlay.
 *
 * Fetches every country with a bundled subdivision GeoJSON (the same set
 * `SUBDIVISION_META` covers), then builds one MultiLineString of INTERNAL
 * borders per country — each shared edge once, stitched into polylines.
 *
 * Stroking every subdivision polygon draws each shared edge twice; with
 * opposite winding the two dash patterns interleave and look solid. A mesh
 * of unique internal edges keeps dashes visible and drops coastlines (the
 * country layer already draws those solid).
 *
 * One Feature per country (not one giant world mesh) keeps SVG path strings
 * tractable. Results are session-cached.
 *
 * Antarctica is excluded by construction: `AQ` is not in `SUBDIVISION_META`.
 */

import { fetchSubdivisionGeo } from "../api/subdivisions";
import { SUBDIVISION_META } from "./subdivisionMeta";
import type { SubdivisionGeoFeature } from "../types/subdivision";

const COUNTRY_CODES: readonly string[] = Object.keys(SUBDIVISION_META);

/** How many country GeoJSONs to fetch concurrently. */
const CONCURRENCY = 16;

/**
 * Quantise coordinates so nearly-identical vertices from adjacent polygons
 * hash to the same edge key (~110 m at the equator at 3 dp).
 */
const Q = 3;

type LonLat = [number, number];
type Ring = LonLat[];

let cached: SubdivisionGeoFeature[] | null = null;
let inflight: Promise<SubdivisionGeoFeature[]> | null = null;

function ringsOf(geometry: unknown): Ring[] {
  const g = geometry as { type?: string; coordinates?: unknown };
  if (g?.type === "Polygon") {
    return (g.coordinates as Ring[]).slice(0, 1); // outer ring only
  }
  if (g?.type === "MultiPolygon") {
    return (g.coordinates as Ring[][]).map((poly) => poly[0]!).filter(Boolean);
  }
  return [];
}

function qKey(p: LonLat): string {
  return `${p[0].toFixed(Q)},${p[1].toFixed(Q)}`;
}

function edgeKey(a: LonLat, b: LonLat): string {
  const ka = qKey(a);
  const kb = qKey(b);
  return ka < kb ? `${ka}|${kb}` : `${kb}|${ka}`;
}

/**
 * Internal-border mesh for one country: edges that appear on two or more
 * subdivision rings, stitched into continuous polylines where endpoints meet.
 */
function countryInternalMesh(
  countryCode: string,
  features: readonly SubdivisionGeoFeature[],
): SubdivisionGeoFeature | null {
  const counts = new Map<string, number>();
  const coords = new Map<string, [LonLat, LonLat]>();

  for (const f of features) {
    for (const ring of ringsOf(f.geometry)) {
      for (let i = 0; i < ring.length - 1; i++) {
        const a = ring[i]!;
        const b = ring[i + 1]!;
        if (a[0] === b[0] && a[1] === b[1]) continue;
        const key = edgeKey(a, b);
        counts.set(key, (counts.get(key) ?? 0) + 1);
        if (!coords.has(key)) coords.set(key, [a, b]);
      }
    }
  }

  // Adjacency: quantized endpoint → list of undirected edge keys
  const adj = new Map<string, string[]>();
  const internalKeys: string[] = [];
  for (const [key, n] of counts) {
    if (n < 2) continue;
    internalKeys.push(key);
    const pair = coords.get(key);
    if (!pair) continue;
    const ka = qKey(pair[0]);
    const kb = qKey(pair[1]);
    if (!adj.has(ka)) adj.set(ka, []);
    if (!adj.has(kb)) adj.set(kb, []);
    adj.get(ka)!.push(key);
    adj.get(kb)!.push(key);
  }
  if (internalKeys.length === 0) return null;

  const used = new Set<string>();
  const lines: LonLat[][] = [];

  function otherEnd(key: string, from: string): string {
    const pair = coords.get(key)!;
    const ka = qKey(pair[0]);
    return ka === from ? qKey(pair[1]) : ka;
  }

  function pointFor(key: string, endpoint: string): LonLat {
    const pair = coords.get(key)!;
    return qKey(pair[0]) === endpoint ? pair[0] : pair[1];
  }

  function walk(startKey: string): LonLat[] {
    used.add(startKey);
    const startPair = coords.get(startKey)!;
    // Prefer walking from a degree-1 endpoint when the edge is in a chain.
    let left = qKey(startPair[0]);
    let right = qKey(startPair[1]);
    const line: LonLat[] = [startPair[0], startPair[1]];

    // Extend forward from `right`
    let tip = right;
    for (;;) {
      const next = (adj.get(tip) ?? []).find((k) => !used.has(k));
      if (!next) break;
      used.add(next);
      const far = otherEnd(next, tip);
      line.push(pointFor(next, far));
      tip = far;
    }

    // Extend backward from `left`
    tip = left;
    for (;;) {
      const next = (adj.get(tip) ?? []).find((k) => !used.has(k));
      if (!next) break;
      used.add(next);
      const far = otherEnd(next, tip);
      line.unshift(pointFor(next, far));
      tip = far;
    }
    return line;
  }

  for (const key of internalKeys) {
    if (used.has(key)) continue;
    lines.push(walk(key));
  }

  return {
    type: "Feature",
    properties: {
      name: `${countryCode}-subnational-borders`,
      iso_3166_2: countryCode,
    },
    geometry: { type: "MultiLineString", coordinates: lines },
  };
}

async function loadAll(): Promise<SubdivisionGeoFeature[]> {
  const meshes: SubdivisionGeoFeature[] = [];
  for (let i = 0; i < COUNTRY_CODES.length; i += CONCURRENCY) {
    const batch = COUNTRY_CODES.slice(i, i + CONCURRENCY);
    const geos = await Promise.all(batch.map((code) => fetchSubdivisionGeo(code)));
    for (let j = 0; j < batch.length; j++) {
      const code = batch[j]!;
      const geo = geos[j];
      if (!geo || geo.features.length === 0) continue;
      const mesh = countryInternalMesh(code, geo.features);
      if (mesh) meshes.push(mesh);
    }
  }
  return meshes;
}

/**
 * Returns one internal-border mesh Feature per country for the world-map
 * overlay. Resolves the same array on every subsequent call (session cache).
 */
export function loadWorldSubnationalBorders(): Promise<SubdivisionGeoFeature[]> {
  if (cached) return Promise.resolve(cached);
  if (inflight) return inflight;
  inflight = loadAll()
    .then((features) => {
      cached = features;
      inflight = null;
      return features;
    })
    .catch((err) => {
      // Leave uncached so a later toggle can retry after a transient failure.
      inflight = null;
      throw err;
    });
  return inflight;
}
