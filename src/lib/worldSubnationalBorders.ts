/**
 * Loader for the Learn-mode world-map "Sub-national borders" overlay.
 *
 * The mesh is PRECOMPUTED by `scripts/build-world-subnational-borders.mjs`
 * into `public/world-subnational-borders.json` (internal shared edges only,
 * from the same bundled `public/subdivisions/*.json` the rest of the app
 * uses). Toggle cost is one fetch + parse — not ~200 GeoJSON downloads and
 * client-side meshing.
 *
 * Call `prefetchWorldSubnationalBorders()` when the Today map mounts so the
 * file is usually already in cache by the time the user ticks the checkbox.
 *
 * Antarctica is excluded by construction (AQ is not in SUBDIVISION_META).
 */

import { fetchWithRetry } from "./fetchWithRetry";
import type { SubdivisionGeoFeature } from "../types/subdivision";

const BASE = import.meta.env.BASE_URL;
const ASSET_URL = `${BASE}world-subnational-borders.json`;

type FeatureCollection = {
  type: "FeatureCollection";
  features: SubdivisionGeoFeature[];
};

let cached: SubdivisionGeoFeature[] | null = null;
let inflight: Promise<SubdivisionGeoFeature[]> | null = null;

async function fetchMesh(): Promise<SubdivisionGeoFeature[]> {
  const res = await fetchWithRetry(ASSET_URL);
  if (!res.ok) {
    throw new Error(
      `Failed to load world-subnational-borders.json (${res.status})`,
    );
  }
  const data = (await res.json()) as FeatureCollection;
  const features = data.features ?? [];
  if (features.length === 0) {
    throw new Error("world-subnational-borders.json has no features");
  }
  return features;
}

function load(): Promise<SubdivisionGeoFeature[]> {
  if (cached) return Promise.resolve(cached);
  if (inflight) return inflight;
  inflight = fetchMesh()
    .then((features) => {
      cached = features;
      inflight = null;
      return features;
    })
    .catch((err) => {
      // Leave uncached so a later toggle / prefetch can retry.
      inflight = null;
      throw err;
    });
  return inflight;
}

/**
 * Returns the precomputed internal-border mesh features. Session-cached.
 */
export function loadWorldSubnationalBorders(): Promise<SubdivisionGeoFeature[]> {
  return load();
}

/**
 * Kick off the fetch without awaiting — call when the Today world map mounts
 * so the overlay is warm before the user opens the map-view popover.
 */
export function prefetchWorldSubnationalBorders(): void {
  void load().catch(() => {
    // Prefetch failures are silent; the toggle path will surface them.
  });
}
