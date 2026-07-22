import { subdivisionCapital } from "./cityRoles";
import { distinctCapitalFlagPath } from "./capitalInfo";
import { SUBDIVISION_META } from "./subdivisionMeta";
import { DISPUTED_TERRITORY_HIERARCHY } from "./disputedSubdivisions";
import { NATIONAL_CITIES } from "../data/cities";
import { NATIONAL_CAPITAL_FLAGS } from "../data/nationalCapitalFlags";
import { normalizeForSearch } from "./searchNormalize";

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
  /** ISO 3166-2 code of the subdivision this capital belongs to — for a
   *  "national" entry (see below) this is a synthetic, non-selectable-by-code
   *  key (`nat:<country>|<name>`), since the city heads no subdivision. */
  code: string;
  subdivisionName: string;
  capitalName: string;
  /** BASE-relative bundled flag path; resolve with import.meta.env.BASE_URL. */
  flagPath: string;
  /** "subdivision" — this capital IS a subdivision's own capital, selected via
   *  its subdivision code (the original, only kind before national capitals
   *  that head no subdivision were added).
   *  "national" — a NATIONAL capital that heads no subdivision (Ottawa,
   *  Pretoria, Amsterdam …) and isn't already any subdivision's own capital,
   *  sourced from `NATIONAL_CITIES`/`NATIONAL_CAPITAL_FLAGS` — the same data
   *  the hierarchy chart's standalone/extra capital leaf uses. Selected via
   *  `onSelectNational`, not a subdivision code. */
  kind: "subdivision" | "national";
  /** Sourced role note for a "national" entry (e.g. "Executive capital" for a
   *  multi-capital nation); null/undefined for a single-capital nation or a
   *  "subdivision" entry. */
  note?: string | null;
};

/**
 * Every available capital-city flag for `countryCode`, in subdivision-name
 * order. Hierarchy children (e.g. AR-ML~) are skipped — they fold into their
 * parent subdivision and never stand alone, mirroring the flag grid.
 *
 * Also includes the country's NATIONAL capital(s) when they head no
 * subdivision and aren't already covered above — e.g. Ottawa (heads no
 * Canadian province) and Pretoria (Gauteng's national-not-provincial seat) —
 * so a national capital is never silently absent from this grid just because
 * it happens not to be any subdivision's own capital. A capital that IS a
 * subdivision's own capital (Canberra/ACT) or that IS a subdivision itself
 * (Kuala Lumpur, a city-territory) is never duplicated here.
 */
export function countryCityFlags(countryCode: string): CityFlagEntry[] {
  const meta = SUBDIVISION_META[countryCode];
  if (!meta) return [];
  const out: CityFlagEntry[] = [];
  const subdivisionCapitalNames = new Set<string>();
  const subdivisionNameSet = new Set(
    meta.divisions.map((d) => normalizeForSearch(d.name)),
  );
  for (const d of meta.divisions) {
    if (d.code in DISPUTED_TERRITORY_HIERARCHY) continue;
    const capital = subdivisionCapital(d.code);
    if (!capital) continue;
    subdivisionCapitalNames.add(normalizeForSearch(capital.name));
    // The "City flags" set is only DISTINCT capital flags — those that differ from
    // the subdivision's own flag. `distinctCapitalFlagPath` returns null for a
    // city-territory (Canberra/ACT, Kuala Lumpur) or a shared-flag capital
    // (Brasília ≡ Distrito Federal), so they are skipped here exactly as the
    // capital panel and hierarchy chart omit their flags. Single source of truth.
    const flagPath = distinctCapitalFlagPath(d.code, capital.name);
    if (!flagPath) continue;
    out.push({
      code: d.code,
      subdivisionName: d.name,
      capitalName: capital.name,
      flagPath,
      kind: "subdivision",
    });
  }

  for (const cap of NATIONAL_CITIES[countryCode]?.capitals ?? []) {
    const k = normalizeForSearch(cap.name);
    // Already shown above — it IS some subdivision's own capital.
    if (subdivisionCapitalNames.has(k)) continue;
    // A city-territory whose own leaf/flag already represents it (tautological).
    if (subdivisionNameSet.has(k)) continue;
    const flagPath = NATIONAL_CAPITAL_FLAGS[`${countryCode}|${k}`];
    if (!flagPath) continue; // no confirmed municipal flag — never fabricate
    out.push({
      code: `nat:${countryCode}|${k}`,
      subdivisionName: cap.note ?? "National capital",
      capitalName: cap.name,
      flagPath,
      kind: "national",
      note: cap.note ?? null,
    });
  }

  out.sort((a, b) => a.subdivisionName.localeCompare(b.subdivisionName, "en"));
  return out;
}

/** Count of available capital-city flags for a country. */
export function countryCityFlagCount(countryCode: string): number {
  return countryCityFlags(countryCode).length;
}
