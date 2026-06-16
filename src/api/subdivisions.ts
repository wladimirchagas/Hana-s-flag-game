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
  // Northern Ireland — the Ulster Banner (1953–1973) is the most widely used
  // unofficial symbol internationally. Northern Ireland has no designated official
  // devolved flag; hampusborgos/country-flags serves the United Kingdom national flag
  // (Union Jack) for gb-nir, which violates the "never show parent nation's flag" rule.
  // Source: lipis/flag-icons (via our git history at 5a52412); viewBox="0 0 640 320"
  // (2:1 ratio — Crown heraldic banner proportions, corrected from the lipis 640×480
  // source by wrapping content in <g transform="scale(1,0.6667)">).
  "GB-NIR": `${BASE}flags/sub/GB/GB-NIR.svg`,

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
  // GB-SH (Saint Helena, Ascension and Tristan da Cunha) — intentionally has NO
  // override and is SUPPRESSED below. Its real flag is a blue ensign defaced with
  // the St Helena coat of arms, but the only previously-bundled file (sh.svg) was
  // the bare Union Jack — i.e. the parent UK flag — which the parent-flag-collision
  // check now rejects. No correctly-proportioned authoritative source is currently
  // reachable (Wikimedia is network-blocked; hampusborgos/lipis carry the Union
  // Jack for `sh`). Re-bundle the real flag when Wikimedia egress is enabled.
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
  // NEVER generate or approximate flag SVG content — if no authoritative source is accessible,
  // leave the flag absent rather than inventing content. A missing flag is always better than a fake one.
  "FR-GF":  `${BASE}flags/FR-GF.svg`, // green/yellow diagonal with red star; local file
  "FR-MQ":  `${BASE}flags/mq.svg`,    // Martinique serpent flag (lipis/flag-icons); replaces French Tricolour
  "FR-NC":  `${BASE}flags/nc.svg`,    // New Caledonia FLNKS/Kanak flag (lipis/flag-icons); replaces French Tricolour
  // FR-75: Paris. The flag source (amckenna41/iso3166-flags) indexes Paris under the
  // current ISO 3166-2 code "FR-75C" (the Ville de Paris collectivity, 2019), but the
  // game keys Paris by the Natural Earth code "FR-75", so the CDN lookup missed and
  // Paris showed no flag. Bundle the Paris flag locally (armorial banner: blue/red
  // bicolour with the city arms, the ship, and the motto "Fluctuat nec mergitur"),
  // a 1280×854 PNG (3:2) provided directly by the owner. As a metropolitan department,
  // Paris carries NO "(unofficial flag)" label — same as every other French department.
  "FR-75":  `${BASE}flags/sub/FR/FR-75.png`,
  // FR-MF: Saint Martin's own flag — a white field bearing the collectivity's
  // emblem (a brown pelican in flight over a hibiscus, sunrise and a "Saint-Martin"
  // banner). This is the Saint Martin flag, NOT the French Tricolour. Bundled as a
  // 1280×854 PNG (3:2) provided directly by the owner. The lipis/flag-icons and
  // hampusborgos `mf` files are the French Tricolour and must NEVER be used here.
  // (Do NOT revert to the Tricolour, and do NOT re-suppress, without owner approval.)
  "FR-MF":  `${BASE}flags/mf.png`,
  // GP: fonttools/region-flags GP.svg — sourced from Wikimedia Commons
  // (File:Unofficial_flag_of_Guadeloupe_(local).svg, commons/e/e7/). Bundled locally;
  // viewBox "0 0 600 400" (3:2). Replaces the blank Wikimedia URL (wrong filename 0/04/).
  "FR-GP":  `${BASE}flags/gp.svg`,
  // RE: Lö Mahavéli flag (1280×854 PNG, 3:2 ratio). Wikimedia SVG URL was blank on all
  // tested devices (file may not exist or was renamed). PNG bundled directly from user.
  "FR-RE":  `${BASE}flags/re.png`,
  "FR-YT":  "https://upload.wikimedia.org/wikipedia/commons/4/4a/Flag_of_Mayotte_%28local%29.svg",
  "FR-BL":  "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Saint_Barth%C3%A9lemy_(local).svg",
  "FR-PM":  "https://upload.wikimedia.org/wikipedia/commons/7/74/Flag_of_Saint-Pierre_and_Miquelon.svg",
  "FR-WF":  "https://upload.wikimedia.org/wikipedia/commons/d/d2/Flag_of_Wallis_and_Futuna.svg",
};

// Subdivision codes whose CDN flag must be actively suppressed.
// Disputed territories now show their own flag as "(unofficial flag)" rather
// than hiding it entirely, so no codes are suppressed for that reason.
// Codes whose only sourced flag file has a forbidden standardised viewBox
// (640×480, 512×512) are suppressed here until a correctly proportioned
// source is found. The local bad files have been deleted; these entries
// prevent the CDN fallback from serving a wrongly-proportioned substitute.
const SUPPRESSED_SUBDIVISION_FLAGS: ReadonlySet<string> = new Set([
  // Bahrain governorates — no authoritative flag source with correct aspect
  // ratio found; amckenna41/iso3166-flags served 640×480 placeholders.
  "BH-13", "BH-14", "BH-15", "BH-17",
  // Suppressed because every accessible source serves the PARENT NATION'S flag,
  // which must never be shown for a subdivision (see CLAUDE.md, enforced by
  // scripts/check-parent-flag-collision.mjs). No flag is shown — and crucially no
  // "(unofficial flag)" label — until the subdivision's OWN flag can be bundled.
  "GB-SH",  // Saint Helena — bundled file was the bare Union Jack
  // Bulk-downloaded sub/ files that were the parent nation's flag verbatim
  // (caught by check-parent-flag-collision.mjs; the duplicate files were deleted).
  "BA-BRC", // Brčko District — file was the Bosnia & Herzegovina national flag
  "NG-IM",  // Imo State — file was the Nigeria national flag
  "NG-TA",  // Taraba State — file was the Nigeria national flag
]);

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

