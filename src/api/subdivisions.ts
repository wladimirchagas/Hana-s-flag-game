import { geoArea } from "d3-geo";
import polygonClipping from "polygon-clipping";
import type { SubdivisionFeatureCollection, SubdivisionGeoFeature } from "../types/subdivision";
import { subdivisionFlagCdnUrl, hasSubdivisionFlag as hasSubdivisionFlagCdn } from "../lib/subdivisionFlagIndex";
import { TERRITORY_GEO_FOR_PARENT } from "../lib/territoryParentMap";
import { fetchWithRetry } from "../lib/fetchWithRetry";

const BASE = import.meta.env.BASE_URL;

type Ring = [number, number][];
type Poly = Ring[];

/** polygon-clipping winds rings opposite to the GeoJSON/d3-geo convention; d3's
 *  spherical geoPath reads a backwards-wound polygon as "everything OUTSIDE it"
 *  (area > a hemisphere), filling the whole map minus a hole. Reverse such rings
 *  so the shape fills its own interior. Same fix as the Western Sahara union in
 *  WorldProgressMap. */
function fixWinding(poly: Poly): Poly {
  return geoArea({ type: "Polygon", coordinates: poly } as never) > 2 * Math.PI
    ? poly.map((ring) => ring.slice().reverse() as Ring)
    : poly;
}

/** Every polygon (ring-set) of a Polygon/MultiPolygon geometry. */
function polygonsOf(geometry: unknown): Poly[] {
  const g = geometry as { type?: string; coordinates?: unknown };
  if (g?.type === "Polygon") return [g.coordinates as Poly];
  if (g?.type === "MultiPolygon") return g.coordinates as Poly[];
  return [];
}

/**
 * Dissolve every feature of a merged territory into ONE feature, so a disputed or
 * dependent territory renders as a single unit WITHOUT its internal subdivision
 * borders — Taiwan is one shape under China (not its 21 counties), Kosovo one
 * shape under Serbia (not its 30 municipalities). All features of a territory geo
 * already share one subdivCode (they are one logical unit), so this only removes
 * the internal borders between them; polygon-clipping unions the polygons,
 * dissolving shared edges. Falls back to simple re-tagging if the territory is a
 * single polygon or the union fails.
 */
function dissolveTerritory(
  features: SubdivisionGeoFeature[],
  subdivCode: string,
): SubdivisionGeoFeature[] {
  const retag = (f: SubdivisionGeoFeature): SubdivisionGeoFeature => ({
    ...f,
    properties: { ...f.properties, iso_3166_2: subdivCode, _isTerritory: true },
  });
  const polys = features.flatMap((f) => polygonsOf(f.geometry));
  if (polys.length <= 1) return features.map(retag);
  try {
    const unioned = polygonClipping.union(
      polys[0] as never,
      ...(polys.slice(1) as never[]),
    ) as unknown as Poly[];
    if (!unioned.length) return features.map(retag);
    const name = features[0]?.properties?.name ?? subdivCode;
    return [
      {
        type: "Feature",
        properties: {
          ...features[0]!.properties,
          name,
          iso_3166_2: subdivCode,
          _isTerritory: true,
        },
        geometry: { type: "MultiPolygon", coordinates: unioned.map(fixWinding) },
      },
    ];
  } catch {
    return features.map(retag);
  }
}

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
  // PY-8 (Misiones Department, Paraguay): the bundled amckenna41/iso3166-flags
  // source was a generic red/navy/white placeholder unrelated to the real flag.
  // Replaced with the correct design (yellow/red/white/blue/green horizontal
  // bands, 2:1:4:1:2), provided directly by the owner as a 1280x860 PNG (~3:2),
  // matching the flag shown at https://www.crwflags.com/fotw/images/p/py-08.gif.
  "PY-8": `${BASE}flags/sub/PY/PY-8.png`,

  // ── Disputed / claimed territories — unofficial flags ───────────────────────
  // The claiming nation has no official flag for these territories; we show the
  // territory's own flag labelled "(unofficial flag)" — consistent with how
  // French overseas departments (Réunion, Mayotte, etc.) are handled.
  "CN-TW":  `${BASE}flags/tw.svg`,    // Taiwan ROC flag; PRC does not recognise it
  "MA-EH~": `${BASE}flags/eh.svg`,    // SADR flag; Morocco does not recognise it
  "RS-KM~": `${BASE}flags/xk.svg`,    // Kosovo flag; Serbia does not recognise it
  "SO-SL~": `${BASE}flags/so-sl.svg`,  // Somaliland flag; Somalia does not recognise it
  "CY-NC~": `${BASE}flags/trnc.svg`,  // TRNC flag; Republic of Cyprus does not recognise it
  // Northern Ireland — the Ulster Banner (1953–1973) is the most widely used
  // unofficial symbol internationally. Northern Ireland has no designated official
  // devolved flag; hampusborgos/country-flags serves the United Kingdom national flag
  // (Union Jack) for gb-nir, which violates the "never show parent nation's flag" rule.
  // Source: lipis/flag-icons (via our git history at 5a52412); viewBox="0 0 640 320"
  // (2:1 ratio — Crown heraldic banner proportions, corrected from the lipis 640×480
  // source by wrapping content in <g transform="scale(1,0.6667)">).
  "GB-NIR": `${BASE}flags/sub/GB/GB-NIR.svg`,

  // ── ISO 3166-2 code-alias fixes (same territory, different code) ─────────────
  // Like Paris (FR-75 vs FR-75C): the game keys these subdivisions by the code in
  // the Natural Earth topology, but the flag source bundles the flag under the
  // territory's CURRENT ISO 3166-2 code. Without these aliases the lookup misses
  // and a well-known flag is shown as blank. The target files are already bundled
  // under public/flags/sub/<CC>/ (verified same territory by name); we point the
  // game's code at the existing file.
  "MX-DIF": `${BASE}flags/sub/MX/MX-CMX.png`, // Mexico City: Distrito Federal → Ciudad de México (2016)
  "ZA-GT":  `${BASE}flags/sub/ZA/ZA-GP.png`,  // Gauteng: legacy ZA-GT → ISO ZA-GP
  "ZA-NL":  `${BASE}flags/sub/ZA/ZA-KZN.png`, // KwaZulu-Natal: legacy ZA-NL → ISO ZA-KZN
  "TW-TPQ": `${BASE}flags/sub/TW/TW-NWT.svg`, // New Taipei: legacy TW-TPQ → ISO TW-NWT
  "HU-ED":  `${BASE}flags/sub/HU/HU-ER.svg`,  // Érd: legacy HU-ED → ISO HU-ER
  "TT-RCM": `${BASE}flags/sub/TT/TT-MRC.png`, // Mayaro-Rio Claro: transposed code TT-RCM → ISO TT-MRC

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
  // GB-SH (Saint Helena, Ascension and Tristan da Cunha): the blue ensign defaced
  // with the Saint Helena coat of arms (rocks, sea and a wirebird badge in the
  // fly). hampusborgos/lipis carry the bare Union Jack for `sh` (the parent UK
  // flag) — wrong. Bundled instead from Wikimedia Commons
  // (commons/0/00/Flag_of_Saint_Helena.svg, 1200×600, 2:1 ensign proportions).
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
  "FR-YT":  `${BASE}flags/yt-local.svg`,  // Mayotte local/unofficial flag
  "FR-BL":  `${BASE}flags/bl.svg`,        // Saint Barthélemy local/unofficial flag
  "FR-PM":  `${BASE}flags/pm.svg`,        // Saint Pierre and Miquelon semi-official flag
  "FR-WF":  `${BASE}flags/wf.svg`,        // Wallis and Futuna local/unofficial flag
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
  // Bulk-downloaded sub/ files that were the parent nation's flag verbatim
  // (caught by check-parent-flag-collision.mjs; the duplicate files were deleted).
  "BA-BRC", // Brčko District — file was the Bosnia & Herzegovina national flag
  "NG-IM",  // Imo State — file was the Nigeria national flag
  "NG-TA",  // Taraba State — file was the Nigeria national flag
  // Bulk-downloaded sub/ files that were blank/degraded (caught by
  // scripts/check-flag-image-quality.mjs; the bad files were deleted). No
  // authoritative non-blank source is accessible, so no flag is shown.
  "NG-AD",  // Adamawa State — amckenna41 CDN file was a near-solid green field
            // with no emblem; the only Wikimedia files (SVG + JPG) are also
            // solid-green stubs. A blank flag is wrong — suppress until a real
            // Adamawa flag can be sourced.
  // Portugal's mainland DISTRICTS (PT-01..PT-18) have NO official flag of their
  // own. The bulk source (amckenna41/iso3166-flags) served — and this repo had
  // bundled for PT-01..07 — the district CAPITAL CITY'S municipal gonfalon (e.g.
  // the "CIDADE DE BEJA" city flag for the Beja district). Using a municipality's
  // flag to represent the district is misleading (owner ruling 2026-07: "do not
  // use municipal flags to represent the district"), so every mainland district is
  // suppressed — no flag and no "(unofficial flag)" label. The municipal PNGs that
  // were bundled (PT-01..05) have been deleted. Portugal's two AUTONOMOUS REGIONS,
  // the Azores (PT-20) and Madeira (PT-30), DO have their own official flags and
  // are intentionally NOT suppressed.
  "PT-01", "PT-02", "PT-03", "PT-04", "PT-05", "PT-06", "PT-07", "PT-08", "PT-09",
  "PT-10", "PT-11", "PT-12", "PT-13", "PT-14", "PT-15", "PT-16", "PT-17", "PT-18",
]);

// Cache so we only fetch each country once per session.
const cache = new Map<string, SubdivisionFeatureCollection | null>();

export async function fetchSubdivisionGeo(
  countryCode: string,
): Promise<SubdivisionFeatureCollection | null> {
  const key = countryCode.toUpperCase();
  if (cache.has(key)) return cache.get(key)!;
  try {
    // Retry transient network failures so a single dropped request doesn't blank
    // the subdivision map (same fragility the world map had).
    const res = await fetchWithRetry(`${BASE}subdivisions/${key}.json`);
    if (!res.ok) {
      // A 4xx is a genuine "no subdivision file for this country" — cache the
      // negative result so we don't re-request it every selection.
      cache.set(key, null);
      return null;
    }
    const data = (await res.json()) as SubdivisionFeatureCollection;
    cache.set(key, data);
    return data;
  } catch {
    // Network error after retries: do NOT cache null — leaving it uncached lets
    // a later selection of the same country try again (a poisoned session cache
    // otherwise keeps the map blank for the rest of the session).
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
    // Dissolve each territory to a single feature so a disputed/dependent
    // territory shows as one unit, never subdivided (Taiwan, Kosovo, …).
    return dissolveTerritory(geo?.features ?? [], subdivCode);
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

