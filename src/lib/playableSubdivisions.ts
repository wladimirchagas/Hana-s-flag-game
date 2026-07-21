import { SUBDIVISION_META } from "./subdivisionMeta";
import { DISPUTED_TERRITORY_HIERARCHY } from "./disputedSubdivisions";
import { hasSubdivisionFlag } from "../api/subdivisions";
import { CAPITAL_FLAGS } from "../data/capitalFlags";
import { CAPITAL_DETAILS } from "../data/capitalDetails";
import { SHARED_CAPITAL_FLAGS } from "../data/sharedCapitalFlags";
import { CITY_TERRITORY_CODES } from "../data/cityTerritories";
import { capitalFlagDuplicatesSubdivision } from "./capitalInfo";
import type { SubdivisionMeta } from "../types/subdivision";

/**
 * Returns the subdivisions of a country that are actually playable in the
 * Sub-national flags game — i.e. the exact set the game will quiz the user on.
 *
 * A division is playable only if it:
 *   - has a distinct subdivision flag (`hasSubdivisionFlag`),
 *   - is NOT a disputed-territory hierarchy child (its landmass redirects to a
 *     parent subdivision, so it is never a standalone question), and
 *   - has not already been seen (SUBDIVISION_META source data occasionally lists
 *     the same ISO code twice).
 *
 * This MUST stay in lockstep with the filtering in `useSubdivisionGame`, which is
 * why both now call this helper. If they diverge, the count shown in the Flag
 * Master menu will not match the number of flags actually played.
 */
export function getPlayableSubdivisions(countryCode: string): SubdivisionMeta[] {
  const meta = SUBDIVISION_META[countryCode.toUpperCase()];
  if (!meta) return [];
  const seen = new Set<string>();
  return meta.divisions.filter((d) => {
    if (d.code in DISPUTED_TERRITORY_HIERARCHY) return false;
    if (seen.has(d.code)) return false;
    // A city-territory (Kuala Lumpur, Putrajaya, Belgrade…) is a single city, so
    // it belongs ONLY in the division set — never as a "capital of itself"
    // question. Several have their flag only in the capital-flag table (no
    // subdivision-flag file), so accept a capital flag as the entity's flag for
    // them; their flag is resolved by subnationalDivisionFlag().
    const playable = CITY_TERRITORY_CODES.has(d.code)
      ? hasSubdivisionFlag(d.code) || CAPITAL_FLAGS[d.code] != null
      : hasSubdivisionFlag(d.code);
    if (!playable) return false;
    seen.add(d.code);
    return true;
  });
}

/** Number of flags a country contributes to the Sub-national flags game. */
export function playableSubdivisionFlagCount(countryCode: string): number {
  return getPlayableSubdivisions(countryCode).length;
}

/**
 * The subdivisions whose CAPITAL CITY is playable in the capital-flags set —
 * i.e. the exact set of capital-flag questions the game will quiz.
 *
 * A capital is playable only if its subdivision:
 *   - has a bundled capital-city flag (`CAPITAL_FLAGS`) AND a sourced capital
 *     name (`CAPITAL_DETAILS`) to ask for — both come from the same vetted
 *     Wikidata capital, so they can never disagree,
 *   - has a DISTINCT flag — its capital flag is NOT the same image as the
 *     subdivision's own flag. A capital with no distinct flag has nothing to
 *     guess ("guess this capital's flag" would show the subdivision's own flag),
 *     so it is never a capital question: a city-territory (Kuala Lumpur, Canberra
 *     ≡ ACT, Washington DC) is quizzed only as its division, and a shared
 *     coat-of-arms capital (Brasília ≡ Distrito Federal, Zürich city ≡ canton) is
 *     quizzed only as its division too. This mirrors the "City flags" grid
 *     (`countryCityFlags`), which lists distinct-flag capitals only — so the
 *     game, the grid, and the menu count all agree.
 *   - is NOT a disputed-territory hierarchy child, and
 *   - has not already been seen (duplicate ISO codes in the source data).
 *
 * Like `getPlayableSubdivisions`, this is the single source of truth shared by
 * the Flag Master menu count and `useSubdivisionGame` — never duplicate the
 * filter inline, or the menu and the game will drift apart.
 */
export function getPlayableCapitalSubdivisions(countryCode: string): SubdivisionMeta[] {
  const meta = SUBDIVISION_META[countryCode.toUpperCase()];
  if (!meta) return [];
  const seen = new Set<string>();
  return meta.divisions.filter((d) => {
    if (d.code in DISPUTED_TERRITORY_HIERARCHY) return false;
    // No distinct capital flag → never a capital-city question. A city-territory
    // is a single city (quizzed only as a division), and a shared-flag capital
    // flies the same image as its subdivision (also quizzed only as a division).
    // Same predicate the capital panel / chart / grid use, so all four agree.
    if (capitalFlagDuplicatesSubdivision(d.code)) return false;
    if (!CAPITAL_FLAGS[d.code] || !CAPITAL_DETAILS[d.code]?.name || seen.has(d.code)) {
      return false;
    }
    seen.add(d.code);
    return true;
  });
}

/** Number of capital-city flags a country contributes to the game. */
export function playableCapitalFlagCount(countryCode: string): number {
  return getPlayableCapitalSubdivisions(countryCode).length;
}

/** The sourced capital-city name asked for in a capital-flag question. */
export function playableCapitalName(code: string): string | null {
  return CAPITAL_DETAILS[code]?.name ?? null;
}

/**
 * Playable divisions whose capital flies the SAME flag image as the division
 * (e.g. Distrito Federal ≡ Brasília, Zürich canton ≡ city). Such a capital is
 * never a standalone capital question (it has no distinct flag — see
 * `getPlayableCapitalSubdivisions`), so it is asked only as the division. But in
 * a MIXED deck the dropdown offers both the division and the capital as rows, and
 * because the flag on screen belongs to both, EITHER answer is accepted for that
 * division question — this set is what drives that accept-both (and the "also
 * flown by its capital" reveal note). Computed directly from
 * `SHARED_CAPITAL_FLAGS` (gated on a sourced capital name to answer with), NOT
 * from the capital set, which by design no longer contains these codes.
 */
export function sharedFlagCodes(countryCode: string): Set<string> {
  const out = new Set<string>();
  for (const d of getPlayableSubdivisions(countryCode)) {
    if (
      SHARED_CAPITAL_FLAGS.has(d.code) &&
      CAPITAL_FLAGS[d.code] &&
      CAPITAL_DETAILS[d.code]?.name
    ) {
      out.add(d.code);
    }
  }
  return out;
}
