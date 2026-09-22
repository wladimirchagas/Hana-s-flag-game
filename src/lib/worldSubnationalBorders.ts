/**
 * Lazy loader for the Learn-mode world-map "Sub-national borders" overlay.
 *
 * Fetches every country with a bundled subdivision GeoJSON (the same set
 * `SUBDIVISION_META` covers) and returns a flat feature list. Results are
 * cached for the session so toggling the checkbox on/off is free after the
 * first load. Purely decorative — callers must render with
 * `pointer-events: none` so clicks still hit the country underneath.
 *
 * Antarctica is excluded by construction: `AQ` is not in `SUBDIVISION_META`,
 * and the Antarctic hard rule forbids representing any claim south of 60°S.
 */

import { fetchSubdivisionGeo } from "../api/subdivisions";
import { SUBDIVISION_META } from "./subdivisionMeta";
import type { SubdivisionGeoFeature } from "../types/subdivision";

const COUNTRY_CODES: readonly string[] = Object.keys(SUBDIVISION_META);

/** How many country GeoJSONs to fetch concurrently. */
const CONCURRENCY = 16;

let cached: SubdivisionGeoFeature[] | null = null;
let inflight: Promise<SubdivisionGeoFeature[]> | null = null;

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
  return features;
}

/**
 * Returns every bundled subdivision feature for the world-map overlay.
 * Resolves the same array on every subsequent call (session cache).
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
