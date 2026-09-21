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

/** Country-level annual visitors (or a sourced note why none exists).
 *  Taken from the first tourism-logo entry that carries either field — the
 *  figure describes the country, not a brand, so Travel shows it above the
 *  Airlines / Tourism sub-tabs. */
export function annualVisitorStatsForCountry(
  countryCode: string,
):
  | { kind: "visitors"; count: number; year: number; metric: string }
  | { kind: "note"; note: string }
  | null {
  for (const entry of tourismLogosForCountry(countryCode)) {
    if (typeof entry.visitors?.count === "number" && entry.visitors.count >= 0) {
      return {
        kind: "visitors",
        count: entry.visitors.count,
        year: entry.visitors.year,
        metric: entry.visitors.metric,
      };
    }
    if (entry.visitorsNote) {
      return { kind: "note", note: entry.visitorsNote };
    }
  }
  return null;
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
