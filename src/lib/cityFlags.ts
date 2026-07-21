import { subdivisionCapital } from "./cityRoles";
import { capitalFlagPath } from "./capitalInfo";
import { SUBDIVISION_META } from "./subdivisionMeta";
import { DISPUTED_TERRITORY_HIERARCHY } from "./disputedSubdivisions";
import { CITY_TERRITORY_CODES } from "../data/cityTerritories";
import { SHARED_CAPITAL_FLAGS } from "../data/sharedCapitalFlags";

/**
 * City-flag entries for a country's Learn-mode drill-down.
 *
 * A "city flag" here is a capital-city flag — the same authoritative,
 * name-confirmed capital-flag data the "View capital" drill-down shows
 * (`src/lib/capitalInfo.ts` → `capitalFlagPath`, sourced from Wikidata P41 /
 * Wikimedia Commons and pinned to the displayed capital name). Nothing here is
 * fabricated: a subdivision whose capital has no confirmed bundled flag simply
 * produces no entry, exactly like the capital drill-down renders no flag.
 *
 * Each entry is keyed by the subdivision ISO code whose capital it is, so
 * selecting a city flag can drill straight into that subdivision + capital.
 */
export type CityFlagEntry = {
  /** ISO 3166-2 code of the subdivision this capital belongs to. */
  code: string;
  subdivisionName: string;
  capitalName: string;
  /** BASE-relative bundled flag path; resolve with import.meta.env.BASE_URL. */
  flagPath: string;
};

/**
 * Every available capital-city flag for `countryCode`, in subdivision-name
 * order. Hierarchy children (e.g. AR-ML~) are skipped — they fold into their
 * parent subdivision and never stand alone, mirroring the flag grid.
 */
export function countryCityFlags(countryCode: string): CityFlagEntry[] {
  const meta = SUBDIVISION_META[countryCode];
  if (!meta) return [];
  const out: CityFlagEntry[] = [];
  for (const d of meta.divisions) {
    if (d.code in DISPUTED_TERRITORY_HIERARCHY) continue;
    // Skip capitals with no DISTINCT city flag — the "City flags" set is only
    // for flags that differ from the subdivision's own flag:
    //  - a city-territory (Canberra/ACT, Kuala Lumpur, Washington DC …) IS its
    //    own capital, so the capital flag is just the subdivision flag; and
    //  - a shared-flag capital (Brasília, whose flag is the Distrito Federal's;
    //    Zürich city ≡ canton) flies the same image as its subdivision.
    // (These stay accept-both in the GAME; they just aren't distinct city flags.)
    if (CITY_TERRITORY_CODES.has(d.code) || SHARED_CAPITAL_FLAGS.has(d.code)) continue;
    const capital = subdivisionCapital(d.code);
    if (!capital) continue;
    const flagPath = capitalFlagPath(d.code, capital.name);
    if (!flagPath) continue;
    out.push({
      code: d.code,
      subdivisionName: d.name,
      capitalName: capital.name,
      flagPath,
    });
  }
  out.sort((a, b) => a.subdivisionName.localeCompare(b.subdivisionName, "en"));
  return out;
}

/** Count of available capital-city flags for a country. */
export function countryCityFlagCount(countryCode: string): number {
  return countryCityFlags(countryCode).length;
}
