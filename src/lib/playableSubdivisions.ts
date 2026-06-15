import { SUBDIVISION_META } from "./subdivisionMeta";
import { DISPUTED_TERRITORY_HIERARCHY } from "./disputedSubdivisions";
import { hasSubdivisionFlag } from "../api/subdivisions";
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
    if (!hasSubdivisionFlag(d.code) || seen.has(d.code)) return false;
    seen.add(d.code);
    return true;
  });
}

/** Number of flags a country contributes to the Sub-national flags game. */
export function playableSubdivisionFlagCount(countryCode: string): number {
  return getPlayableSubdivisions(countryCode).length;
}
