import { SUBDIVISION_META } from "./subdivisionMeta";
import { DISPUTED_TERRITORY_HIERARCHY } from "./disputedSubdivisions";
import { hasSubdivisionFlag } from "../api/subdivisions";
import { CAPITAL_FLAGS } from "../data/capitalFlags";
import { CAPITAL_DETAILS } from "../data/capitalDetails";
import { SHARED_CAPITAL_FLAGS } from "../data/sharedCapitalFlags";
import { CITY_TERRITORY_CODES } from "../data/cityTerritories";
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
    // A city-territory is a single city, not the "capital of" a larger unit —
    // it is quizzed only as a division, never as a capital-city question.
    if (CITY_TERRITORY_CODES.has(d.code)) return false;
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
 * Codes counted in BOTH sets whose capital flag is visually the same image as
 * the subdivision's own flag (e.g. Kuala Lumpur). A mixed deck asks these once —
 * as the division question — so the same image never carries two different
 * expected answers. Cities-only decks keep the capital question.
 */
export function sharedFlagCodes(countryCode: string): Set<string> {
  const caps = new Set(getPlayableCapitalSubdivisions(countryCode).map((d) => d.code));
  const out = new Set<string>();
  for (const d of getPlayableSubdivisions(countryCode)) {
    if (caps.has(d.code) && SHARED_CAPITAL_FLAGS.has(d.code)) out.add(d.code);
  }
  return out;
}
