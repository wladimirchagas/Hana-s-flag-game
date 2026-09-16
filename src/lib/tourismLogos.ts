import { TOURISM_LOGOS } from "../data/tourismLogos";
import type { TourismLogo } from "../types/tourismLogo";

/**
 * Helpers for national tourism-board logos in Learn mode.
 * Single source of truth consumed by:
 * - FlagGrid (when "Tourism logos" content type is active)
 * - NationalFlagGrid (in Country "National symbols" tab)
 * - LearnPage (for detail widget in both World Map and Country Map views)
 */

export function countriesWithTourismLogoData(): readonly string[] {
  return Object.keys(TOURISM_LOGOS);
}

export function tourismLogosForCountry(countryCode: string): readonly TourismLogo[] {
  return TOURISM_LOGOS[countryCode.toUpperCase()] ?? [];
}

const tourismLogoByIdMap = new Map<string, TourismLogo>();
for (const list of Object.values(TOURISM_LOGOS)) {
  for (const t of list) {
    tourismLogoByIdMap.set(t.id, t);
  }
}

export function tourismLogoById(id: string | null | undefined): TourismLogo | null {
  if (!id) return null;
  return tourismLogoByIdMap.get(id) ?? null;
}

export function allTourismLogos(): readonly TourismLogo[] {
  const out: TourismLogo[] = [];
  for (const list of Object.values(TOURISM_LOGOS)) {
    out.push(...list);
  }
  return out;
}

export function totalTourismLogoCount(): number {
  return Object.values(TOURISM_LOGOS).reduce((acc, list) => acc + list.length, 0);
}
