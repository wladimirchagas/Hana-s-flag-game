/**
 * Lazy loader for the Learn-mode world-map "Sub-national borders" overlay.
 *
 * Fetches every country with a bundled subdivision GeoJSON (the same set
 * `SUBDIVISION_META` covers), then builds a MultiLineString of INTERNAL
 * borders only — each shared edge once. That matters for two reasons:
 *
 * 1. Stroking every subdivision polygon draws each shared edge twice; with
 *    opposite winding the two dash patterns interleave and look solid.
 * 2. One mesh path is far cheaper to project/render than ~4,300 polygons.
 *
 * Coastline / national-outline edges (count 1) are dropped — the country
 * layer already draws those solid. Results are session-cached.
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

function edgeKey(a: LonLat, b: LonLat): string {
  const a0 = a[0].toFixed(Q);
  const a1 = a[1].toFixed(Q);
  const b0 = b[0].toFixed(Q);
  const b1 = b[1].toFixed(Q);
  // Undirected: smaller endpoint first.
  if (a0 < b0 || (a0 === b0 && a1 < b1)) return `${a0},${a1}|${b0},${b1}`;
  return `${b0},${b1}|${a0},${a1}`;
}

/**
 * Build a single MultiLineString of edges that appear on two or more
 * subdivision rings (internal borders). Exterior/coast edges are omitted.
 */
function internalBorderMesh(
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

  const lines: LonLat[][] = [];
  for (const [key, n] of counts) {
    if (n < 2) continue; // exterior / unmatched — leave to the national stroke
    const pair = coords.get(key);
    if (pair) lines.push(pair);
  }
  if (lines.length === 0) return null;

  return {
    type: "Feature",
    properties: { name: "subnational-borders", iso_3166_2: "" },
    geometry: { type: "MultiLineString", coordinates: lines },
  };
}

async function loadAll(): Promise<SubdivisionGeoFeature[]> {
  const features: SubdivisionGeoFeature[] = [];
  for (let i = 0; i < COUNTRY_CODES.length; i += CONCURRENCY) {
    const batch = COUNTRY_CODES.slice(i, i + CONCURRENCY);
    const geos = await Promise.all(batch.map((code) => fetchSubdivisionGeo(code)));
    for (const geo of geos) {
      if (!geo) continue;
      for (const f of geo.features) features.push(f);
    }
  }
  const mesh = internalBorderMesh(features);
  return mesh ? [mesh] : [];
}

/**
 * Returns the internal-border mesh as a one-feature list for the world-map
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
