import { COMMERCIAL_AIRLINES } from "../data/commercialAirlines";
import type { CommercialAirline } from "../types/airline";

/**
 * Helpers for commercial airlines in Learn mode.
 * Single source of truth consumed by:
 * - FlagGrid (when "Commercial airlines" content type is active)
 * - NationalFlagGrid (in Country "National symbols" tab)
 * - LearnPage (for detail widget in both World Map and Country Map views)
 */

export function countriesWithAirlineData(): readonly string[] {
  return Object.keys(COMMERCIAL_AIRLINES);
}

export function airlinesForCountry(countryCode: string): readonly CommercialAirline[] {
  return COMMERCIAL_AIRLINES[countryCode.toUpperCase()] ?? [];
}

const airlineByIdMap = new Map<string, CommercialAirline>();
for (const list of Object.values(COMMERCIAL_AIRLINES)) {
  for (const a of list) {
    airlineByIdMap.set(a.id, a);
  }
}

export function airlineById(id: string | null | undefined): CommercialAirline | null {
  if (!id) return null;
  return airlineByIdMap.get(id) ?? null;
}

export function allCommercialAirlines(): readonly CommercialAirline[] {
  const out: CommercialAirline[] = [];
  for (const list of Object.values(COMMERCIAL_AIRLINES)) {
    out.push(...list);
  }
  return out;
}

export function totalAirlineCount(): number {
  return Object.values(COMMERCIAL_AIRLINES).reduce((acc, list) => acc + list.length, 0);
}
