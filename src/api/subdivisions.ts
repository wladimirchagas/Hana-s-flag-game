import type { SubdivisionFeatureCollection } from "../types/subdivision";

const BASE = import.meta.env.BASE_URL;

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

export function subdivisionFlagUrl(isoCode: string): string {
  // flagcdn.com supports ISO 3166-2 as lowercase with hyphen (e.g. "us-ca")
  return `https://flagcdn.com/${isoCode.toLowerCase()}.svg`;
}

export function subdivisionFlagPngUrl(isoCode: string): string {
  return `https://flagcdn.com/w320/${isoCode.toLowerCase()}.png`;
}
