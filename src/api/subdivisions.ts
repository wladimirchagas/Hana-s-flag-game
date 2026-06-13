import type { SubdivisionFeatureCollection, SubdivisionGeoFeature } from "../types/subdivision";
import { subdivisionFlagCdnUrl, hasSubdivisionFlag as hasSubdivisionFlagCdn } from "../lib/subdivisionFlagIndex";
import { TERRITORY_GEO_FOR_PARENT } from "../lib/territoryParentMap";

const BASE = import.meta.env.BASE_URL;

// Local corrected flag overrides (keyed by uppercase ISO 3166-2 code).
// Use these to replace flags from the CDN that contain errors, or to
// supply flags for territory subdivisions not in the subdivision CDN.
const LOCAL_FLAG_OVERRIDES: Record<string, string> = {
  // CDN source has a spurious red horizontal stripe; corrected locally.
  "BR-RR": `${BASE}flags/BR-RR.svg`,
  "CN-TW":  `${BASE}flags/tw.svg`,
  // Territory flags — bundled locally in public/flags/; the subdivision index
  // doesn't cover these national-level dependency codes.
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
  // Western Sahara — Sahrawi flag; unofficial from Morocco's perspective (Morocco rejects Sahrawi sovereignty).
  "MA-EH~":  `${BASE}flags/eh.svg`,

  // Newly added populated territories
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
  
  // Tibet Autonomous Region — Snow Lion Flag (historical Tibetan flag, unofficial)
  // Source: Wikimedia Commons (Flag_of_Tibet.svg)
  // Tibet Snow Lion flag — the only flag still served externally; it isn't in
  // any GitHub-reachable flag set to bundle from. Loads fine in browsers.
  "CN-XZ":  "https://upload.wikimedia.org/wikipedia/commons/3/3c/Flag_of_Tibet.svg",

  // India's claimed territories in Pakistan-administered Kashmir — same flags as the PK entries
  "IN-AK~": subdivisionFlagCdnUrl("PK-JK") ?? "",
  "IN-GB~": subdivisionFlagCdnUrl("PK-GB") ?? "",

  // French overseas departments (CDN uses department numbers 971-976 instead of ISO codes)
  "FR-GF":  `${BASE}flags/FR-GF.svg`, // Local file — unofficial regional flag (green/yellow diagonal with red star)
  "FR-MQ":  `${BASE}flags/mq.svg`,    // Local file — Martinique's regional serpent flag

  // ── POLICY: show most-used unofficial flag when official flag = national flag ──
  // (Do NOT revert these to the French Tricolour without explicit owner approval.)
  //
  // The territories below have no distinct official flag; their official flag is
  // the French Tricolour.  Per project policy we show the most widely-used
  // local/unofficial regional flag and label it "(unofficial flag)" in the grid
  // (see UNOFFICIAL_SUBDIV_NOTES in src/lib/unofficialSubdivFlags.ts).
  //
  // Sources: Wikimedia Commons (all freely licensed SVGs)
  "FR-GP":  "https://upload.wikimedia.org/wikipedia/commons/0/04/Flag_of_Guadeloupe_%28local%29.svg",
  "FR-RE":  "https://upload.wikimedia.org/wikipedia/commons/f/f8/Flag_of_R%C3%A9union_(Lo_Mahav%C3%A9li).svg",
  "FR-YT":  "https://upload.wikimedia.org/wikipedia/commons/4/4a/Flag_of_Mayotte_%28local%29.svg",
  "FR-BL":  "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Saint_Barth%C3%A9lemy_(local).svg",
  "FR-MF":  "https://upload.wikimedia.org/wikipedia/commons/3/3d/Local_flag_of_the_Collectivity_of_Saint_Martin.svg",
  "FR-PM":  "https://upload.wikimedia.org/wikipedia/commons/7/74/Flag_of_Saint-Pierre_and_Miquelon.svg",
  "FR-WF":  "https://upload.wikimedia.org/wikipedia/commons/d/d2/Flag_of_Wallis_and_Futuna.svg",
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

