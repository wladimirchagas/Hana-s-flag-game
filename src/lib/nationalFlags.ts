import { NATIONAL_FLAGS, type NationalFlag } from "../data/nationalFlags";

/**
 * Helpers for the Learn-mode "National flags" tab.
 *
 * The tab, its count badge and the flag widget below the country fact-sheet all
 * read the country's flags through here, so they can never disagree about which
 * flags exist for a country (the same single-source-of-truth discipline as
 * `playableSubdivisions.ts` for the sub-national menu and the game).
 */

/** Every curated national flag for a country, in display order. Empty when none. */
export function countryNationalFlags(countryCode: string): readonly NationalFlag[] {
  return NATIONAL_FLAGS[countryCode] ?? [];
}

/** How many flags the tab will show — the count badge on the tab strip. */
export function nationalFlagCount(countryCode: string): number {
  return countryNationalFlags(countryCode).length;
}

/** Look a flag up by id within a country (used to restore a selection). */
export function findNationalFlag(countryCode: string, id: string | null): NationalFlag | null {
  if (!id) return null;
  return countryNationalFlags(countryCode).find((f) => f.id === id) ?? null;
}

/**
 * The card's year label — for a historical flag this is the "introduced" year the
 * owner asked the grid to carry, and for a flag still flown it reads as a range
 * that is open at the present.
 */
export function flagYearLabel(flag: NationalFlag): string | null {
  // Undated on purpose: no authoritative source gives this flag's adoption year,
  // and this repo never invents one. The card shows the name alone.
  if (flag.from == null) return null;
  if (flag.to == null || flag.to >= 9999) return `${flag.from} – present`;
  if (flag.from === flag.to) return `${flag.from}`;
  return `${flag.from}–${flag.to}`;
}
