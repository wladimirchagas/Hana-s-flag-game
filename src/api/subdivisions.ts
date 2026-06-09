import type { SubdivisionFeatureCollection } from "../types/subdivision";
import { subdivisionFlagCdnUrl, hasSubdivisionFlag as hasSubdivisionFlagCdn } from "../lib/subdivisionFlagIndex";
import { TERRITORY_GEO_FOR_PARENT } from "../lib/territoryParentMap";

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

  // Newly added populated territories
  "AU-CX":  "https://flagcdn.com/cx.svg",
  "AU-NF":  "https://flagcdn.com/nf.svg",
  "US-VI":  "https://flagcdn.com/vi.svg",
  "US-AS":  "https://flagcdn.com/as.svg",
  "US-GU":  "https://flagcdn.com/gu.svg",
  "FR-PF":  "https://flagcdn.com/pf.svg",
  "FR-NC":  "https://flagcdn.com/nc.svg",
  "NZ-TK":  "https://flagcdn.com/tk.svg",
  "GB-AI":  "https://flagcdn.com/ai.svg",
  "GB-BM":  "https://flagcdn.com/bm.svg",
  "GB-VG":  "https://flagcdn.com/vg.svg",
  "GB-KY":  "https://flagcdn.com/ky.svg",
  "GB-MS":  "https://flagcdn.com/ms.svg",
  "GB-SH":  "https://flagcdn.com/sh.svg",
  "GB-TC":  "https://flagcdn.com/tc.svg",
  "GB-PN":  "https://flagcdn.com/pn.svg",
  
  // Tibet Autonomous Region — Snow Lion Flag (historical Tibetan flag, unofficial)
  // Source: Wikimedia Commons (Flag_of_Tibet.svg)
  "CN-XZ":  "https://upload.wikimedia.org/wikipedia/commons/3/3c/Flag_of_Tibet.svg",

  // India's claimed territories in Pakistan-administered Kashmir — same flags as the PK entries
  "IN-AK~": subdivisionFlagCdnUrl("PK-JK") ?? "",
  "IN-GB~": subdivisionFlagCdnUrl("PK-GB") ?? "",

  // French overseas departments (CDN uses department numbers 971-976 instead of ISO codes)
  "FR-GF":  `${BASE}flags/FR-GF.svg`, // Custom local diagonal green/yellow flag with red star
  "FR-GP":  "https://flagcdn.com/gp.svg",
  "FR-MQ":  "https://flagcdn.com/mq.svg",
  "FR-RE":  "https://flagcdn.com/re.svg",
  "FR-YT":  "https://flagcdn.com/yt.svg",
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

export async function fetchMergedSubdivisionGeo(
  code: string,
): Promise<SubdivisionFeatureCollection | null> {
  const territoryMappings = TERRITORY_GEO_FOR_PARENT[code] ?? [];
  const [mainGeo, ...territoryGeos] = await Promise.all([
    fetchSubdivisionGeo(code),
    ...territoryMappings.map((t) => fetchSubdivisionGeo(t.geoCode)),
  ]);
  const extraFeatures = territoryGeos.flatMap((geo, i) => {
    const subdivCode = territoryMappings[i]!.subdivCode;
    return (geo?.features ?? []).map((feat) => ({
      ...feat,
      properties: { ...feat.properties, iso_3166_2: subdivCode, _isTerritory: true },
    }));
  });
  if (!mainGeo && extraFeatures.length === 0) return null;
  const updatedMainFeatures = (mainGeo?.features ?? []).map((feat) => {
    const subdivCode = feat.properties?.iso_3166_2 || "";
    if (["FR-GF", "FR-GP", "FR-MQ", "FR-RE", "FR-YT"].includes(subdivCode)) {
      return {
        ...feat,
        properties: { ...feat.properties, _isTerritory: true },
      };
    }
    return feat;
  });
  return {
    type: "FeatureCollection",
    features: [...updatedMainFeatures, ...extraFeatures],
  };
}

/**
 * Returns the CDN URL for a subdivision flag, or null if none is indexed.
 * Source: amckenna41/iso3166-flags via jsDelivr.
 */
export function subdivisionFlagUrl(isoCode: string): string | null {
  const key = isoCode.toUpperCase().replace(/_/g, "-");
  return LOCAL_FLAG_OVERRIDES[key] ?? subdivisionFlagCdnUrl(isoCode);
}

export function hasSubdivisionFlag(isoCode: string): boolean {
  const key = isoCode.toUpperCase().replace(/_/g, "-");
  return (key in LOCAL_FLAG_OVERRIDES) || hasSubdivisionFlagCdn(isoCode);
}

