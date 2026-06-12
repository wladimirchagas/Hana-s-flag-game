import type { SubdivisionFeatureCollection, SubdivisionGeoFeature } from "../types/subdivision";
import { subdivisionFlagCdnUrl, hasSubdivisionFlag as hasSubdivisionFlagCdn } from "../lib/subdivisionFlagIndex";
import { TERRITORY_GEO_FOR_PARENT } from "../lib/territoryParentMap";

const BASE = import.meta.env.BASE_URL;

// Local flag overrides (keyed by uppercase ISO 3166-2 code).
// All flags are served from public/flags/ — bundled with the app.
const LOCAL_FLAG_OVERRIDES: Record<string, string> = {
  // CDN source has a spurious red horizontal stripe; corrected locally.
  "BR-RR": `${BASE}flags/BR-RR.svg`,
  "CN-TW":  `${BASE}flags/tw.svg`,
  // Territory flags — bundled in public/flags/ (downloaded by scripts/download-flags.mjs).
  "DK-GL":  `${BASE}flags/gl.svg`,
  "DK-FO":  `${BASE}flags/fo.svg`,
  "GB-FK":  `${BASE}flags/fk.svg`,
  "GB-JE":  `${BASE}flags/je.svg`,
  "GB-GG":  `${BASE}flags/gg.svg`,
  "GB-IM":  `${BASE}flags/im.svg`,
  "GB-GI":  `${BASE}flags/gi.svg`,
  "GB-IO":  `${BASE}flags/io.svg`,
  "GB-GS":  `${BASE}flags/gs.svg`,
  "NZ-CK":  `${BASE}flags/ck.svg`,
  "NZ-NU":  `${BASE}flags/nu.svg`,
  "FI-AX":  `${BASE}flags/ax.svg`,
  "AU-CC":  `${BASE}flags/cc.svg`,
  "ES-GIB~": `${BASE}flags/gi.svg`,
  "TR-NC~":  `${BASE}flags/trnc.svg`,
  // Northern Cyprus under Cyprus — shows TRNC flag; unofficial from Cyprus's perspective.
  "CY-NC~":  `${BASE}flags/trnc.svg`,
  // Western Sahara — Sahrawi flag; unofficial from Morocco's perspective.
  "MA-EH~":  `${BASE}flags/eh.svg`,

  // Populated territories
  "AU-CX":  `${BASE}flags/cx.svg`,
  "AU-NF":  `${BASE}flags/nf.svg`,
  "US-VI":  `${BASE}flags/vi.svg`,
  "US-AS":  `${BASE}flags/as.svg`,
  "US-GU":  `${BASE}flags/gu.svg`,
  "FR-PF":  `${BASE}flags/pf.svg`,
  "FR-NC":  `${BASE}flags/nc.svg`,
  "NZ-TK":  `${BASE}flags/tk.svg`,
  "GB-AI":  `${BASE}flags/ai.svg`,
  "GB-BM":  `${BASE}flags/bm.svg`,
  "GB-VG":  `${BASE}flags/vg.svg`,
  "GB-KY":  `${BASE}flags/ky.svg`,
  "GB-MS":  `${BASE}flags/ms.svg`,
  "GB-SH":  `${BASE}flags/sh.svg`,
  "GB-TC":  `${BASE}flags/tc.svg`,
  "GB-PN":  `${BASE}flags/pn.svg`,

  // Tibet Autonomous Region — Snow Lion Flag (bundled from Wikimedia Commons)
  "CN-XZ":  `${BASE}flags/cn-xz.svg`,

  // India's claimed territories in Pakistan-administered Kashmir — same flags as the PK entries
  "IN-AK~": subdivisionFlagCdnUrl("PK-JK") ?? "",
  "IN-GB~": subdivisionFlagCdnUrl("PK-GB") ?? "",

  // French overseas departments (subdivision CDN uses dept numbers 971-976 instead of ISO codes)
  "FR-GF":  `${BASE}flags/FR-GF.svg`, // custom local diagonal green/yellow flag with red star
  "FR-GP":  `${BASE}flags/gp.svg`,
  "FR-MQ":  `${BASE}flags/mq.svg`,
  "FR-RE":  `${BASE}flags/re.svg`,
  "FR-YT":  `${BASE}flags/yt.svg`,
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
  let extraFeatures: SubdivisionGeoFeature[] = territoryGeos.flatMap((geo, i) => {
    const subdivCode = territoryMappings[i]!.subdivCode;
    return (geo?.features ?? []).map((feat) => ({
      ...feat,
      properties: { ...feat.properties, iso_3166_2: subdivCode, _isTerritory: true },
    }));
  });

  // If the parent country is Ukraine (UA), dynamically load Russia (RU) to copy Crimea/Sevastopol features
  if (code.toUpperCase() === "UA") {
    const ruGeo = await fetchSubdivisionGeo("RU");
    if (ruGeo) {
      const crimeaFeatures = ruGeo.features.filter(
        (feat) =>
          feat.properties.iso_3166_2 === "UA-43" ||
          feat.properties.iso_3166_2 === "UA-40",
      );
      extraFeatures = [...extraFeatures, ...crimeaFeatures];
    }
  }

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

