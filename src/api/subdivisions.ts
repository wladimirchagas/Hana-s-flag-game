import type { SubdivisionFeatureCollection, SubdivisionGeoFeature } from "../types/subdivision";
import { subdivisionFlagCdnUrl, hasSubdivisionFlag as hasSubdivisionFlagCdn } from "../lib/subdivisionFlagIndex";
import { TERRITORY_GEO_FOR_PARENT } from "../lib/territoryParentMap";

const BASE = import.meta.env.BASE_URL;

// Local corrected flag overrides (keyed by uppercase ISO 3166-2 code).
// Use these to replace flags from the CDN that contain errors, or to
// supply flags for territory subdivisions not in the subdivision CDN.
//
// DISPUTED-TERRITORY RULE (see CLAUDE.md):
//   When the parent nation has no official flag for a disputed/claimed territory,
//   show the territory's own flag as "(unofficial flag)" — same treatment as
//   France's overseas territories (Réunion, Mayotte, etc.) which lack a distinct
//   official flag and show their local/unofficial flags instead.
//   For standard ISO codes whose CDN flag must be actively suppressed, see
//   SUPPRESSED_SUBDIVISION_FLAGS below.
const LOCAL_FLAG_OVERRIDES: Record<string, string> = {
  // CDN source has a spurious red horizontal stripe; corrected locally.
  "BR-RR": `${BASE}flags/BR-RR.svg`,

  // ── Disputed / claimed territories — unofficial flags ───────────────────────
  // The claiming nation has no official flag for these territories; we show the
  // territory's own flag labelled "(unofficial flag)" — consistent with how
  // French overseas departments (Réunion, Mayotte, etc.) are handled.
  "CN-TW":  `${BASE}flags/tw.svg`,    // Taiwan ROC flag; PRC does not recognise it
  "MA-EH~": `${BASE}flags/eh.svg`,    // SADR flag; Morocco does not recognise it
  "RS-KM~": `${BASE}flags/xk.svg`,    // Kosovo flag; Serbia does not recognise it
  "SO-SL~": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Flag_of_Somaliland.svg",
  "CY-NC~": `${BASE}flags/trnc.svg`,  // TRNC flag; Republic of Cyprus does not recognise it
  // GE-AB (Abkhazia under Georgia) — CDN serves the Abkhazia flag; un-suppressed
  // below so it renders as "(unofficial flag)" under Georgia.
  // ES-GIB~ and AR-ML~ — hidden from Spain's/Argentina's grid via hierarchy; no flag needed.
  // IN-AK~ and IN-GB~ — hidden from India's grid via hierarchy; no flag needed.

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
  // ES-GIB~ (Gibraltar under Spain) — intentionally has NO override.
  // Spain does not recognise a distinct flag for the territory (it claims Gibraltar
  // as part of Cádiz). Also hidden from Spain's grid via DISPUTED_TERRITORY_HIERARCHY.
  "TR-NC~":  `${BASE}flags/trnc.svg`,  // Turkey recognises TRNC — not "unofficial" from Turkey's view

  // Newly added populated territories
  "AU-CX":  `${BASE}flags/cx.svg`,
  "AU-NF":  `${BASE}flags/nf.svg`,
  "US-VI":  `${BASE}flags/vi.svg`,
  "US-AS":  `${BASE}flags/as.svg`,
  "US-GU":  `${BASE}flags/gu.svg`,
  "FR-PF":  `${BASE}flags/pf.svg`,
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
  // Source: github.com/rahul2104/react-country-flag-currency-picker (512×336 SVG)
  "CN-XZ":  `${BASE}flags/cn-xz.svg`,

  // IN-AK~ and IN-GB~ — hidden from India's grid via hierarchy; no flag override needed.

  // ── POLICY: show most-used unofficial flag when official flag = national flag ──
  // (Do NOT revert any of these to the French Tricolour without explicit owner approval.)
  //
  // Rule: if a subdivision has no distinct official flag (its official flag is the
  // same as the parent nation's), show the most widely-used local/unofficial flag
  // and label it "Flag not officially recognised by [Country]".
  //
  // Sources: Wikimedia Commons for complex heraldic SVGs; lipis/flag-icons (GitHub)
  // for mq/nc/mf which have no defined real-world proportions (exempt from viewBox check).
  "FR-GF":  `${BASE}flags/FR-GF.svg`, // green/yellow diagonal with red star; local file
  "FR-MQ":  `${BASE}flags/mq.svg`,    // Martinique serpent flag (lipis/flag-icons); replaces French Tricolour
  "FR-NC":  `${BASE}flags/nc.svg`,    // New Caledonia FLNKS/Kanak flag (lipis/flag-icons); replaces French Tricolour
  "FR-MF":  `${BASE}flags/mf.svg`,    // Saint Martin local flag (lipis/flag-icons)
  "FR-GP":  "https://upload.wikimedia.org/wikipedia/commons/0/04/Flag_of_Guadeloupe_%28local%29.svg",
  "FR-RE":  "https://upload.wikimedia.org/wikipedia/commons/f/f8/Flag_of_R%C3%A9union_(Lo_Mahav%C3%A9li).svg",
  "FR-YT":  "https://upload.wikimedia.org/wikipedia/commons/4/4a/Flag_of_Mayotte_%28local%29.svg",
  "FR-BL":  "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Saint_Barth%C3%A9lemy_(local).svg",
  "FR-PM":  "https://upload.wikimedia.org/wikipedia/commons/7/74/Flag_of_Saint-Pierre_and_Miquelon.svg",
  "FR-WF":  "https://upload.wikimedia.org/wikipedia/commons/d/d2/Flag_of_Wallis_and_Futuna.svg",
};

// Subdivision codes whose CDN flag must be actively suppressed.
// Under the current policy, no codes are suppressed — disputed territories now
// show their own flag as "(unofficial flag)" rather than hiding it entirely.
// Keep this set in place for future overrides if needed.
const SUPPRESSED_SUBDIVISION_FLAGS: ReadonlySet<string> = new Set([]);

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
  if (SUPPRESSED_SUBDIVISION_FLAGS.has(key)) return null;
  return LOCAL_FLAG_OVERRIDES[key] ?? subdivisionFlagCdnUrl(isoCode);
}

export function hasSubdivisionFlag(isoCode: string): boolean {
  const key = isoCode.toUpperCase().replace(/_/g, "-");
  if (SUPPRESSED_SUBDIVISION_FLAGS.has(key)) return false;
  return (key in LOCAL_FLAG_OVERRIDES) || hasSubdivisionFlagCdn(isoCode);
}

