import { subdivisionFlagUrl } from "../api/subdivisions";
import { capitalFlagSrc } from "./capitalInfo";
import { CITY_TERRITORY_CODES } from "../data/cityTerritories";

/**
 * The flag to show for a subdivision (division) question in the Sub-national
 * flags game.
 *
 * Normally this is the subdivision's own flag. But a city-territory (a
 * subdivision that IS a single city — Belgrade, Chișinău, Seoul…) may carry its
 * flag only in the capital-flag table (no separate subdivision-flag file);
 * because the entity IS the city, that city flag is the correct flag for the
 * division, so we fall back to it. For every non-city-territory the fallback is
 * never used, so a region can never show its capital city's flag.
 */
export function subnationalDivisionFlag(code: string): string | null {
  return (
    subdivisionFlagUrl(code) ??
    (CITY_TERRITORY_CODES.has(code) ? capitalFlagSrc(code) : null)
  );
}
