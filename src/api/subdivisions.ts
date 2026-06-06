import type { SubdivisionFeatureCollection } from "../types/subdivision";
import { subdivisionFlagCdnUrl, hasSubdivisionFlag } from "../lib/subdivisionFlagIndex";

const BASE = import.meta.env.BASE_URL;

// Local corrected flag overrides (keyed by uppercase ISO 3166-2 code).
// Use these to replace flags from the CDN that contain errors, or to
// supply flags for territory subdivisions not in the subdivision CDN.
const LOCAL_FLAG_OVERRIDES: Record<string, string> = {
  // CDN source has a spurious red horizontal stripe; corrected locally.
  "BR-RR": `${BASE}flags/BR-RR.svg`,
  // Territory flags via flagcdn.com — the subdivision CDN doesn't index these codes.
  "DK-GL":  "https://flagcdn.com/gl.svg",
  "DK-FO":  "https://flagcdn.com/fo.svg",
  "GB-FK":  "https://flagcdn.com/fk.svg",
  "GB-JE":  "https://flagcdn.com/je.svg",
  "GB-GG":  "https://flagcdn.com/gg.svg",
  "GB-IM":  "https://flagcdn.com/im.svg",
  "GB-GI":  "https://flagcdn.com/gi.svg",
  "GB-IO":  "https://flagcdn.com/io.svg",
  "GB-GS":  "https://flagcdn.com/gs.svg",
  "NZ-CK":  "https://flagcdn.com/ck.svg",
  "NZ-NU":  "https://flagcdn.com/nu.svg",
  "FI-AX":  "https://flagcdn.com/ax.svg",
  "AU-CC":  "https://flagcdn.com/cc.svg",
  "ES-GIB~": "https://flagcdn.com/gi.svg",
};

// Cache so we only fetch each country once per session.
const cache = new Map<string, SubdivisionFeatureCollection | null>();

export async function fetchSubdivisionGeo(
  countryCode: string,
): Promise<SubdivisionFeatureCollection | null> {
  const key = countryCode.toUpperCase();
  if (cache.has(key)) return cache.get(key)!;
  try {
    const res = await fetch(`${BASE}subdivisions/${key}.json`);
    if (!res.ok) {
      cache.set(key, null);
      return null;
    }
    const data = (await res.json()) as SubdivisionFeatureCollection;
    cache.set(key, data);
    return data;
  } catch {
    cache.set(key, null);
    return null;
  }
}

/**
 * Returns the CDN URL for a subdivision flag, or null if none is indexed.
 * Source: amckenna41/iso3166-flags via jsDelivr.
 */
export function subdivisionFlagUrl(isoCode: string): string | null {
  const key = isoCode.toUpperCase().replace(/_/g, "-");
  return LOCAL_FLAG_OVERRIDES[key] ?? subdivisionFlagCdnUrl(isoCode);
}

export { hasSubdivisionFlag };
