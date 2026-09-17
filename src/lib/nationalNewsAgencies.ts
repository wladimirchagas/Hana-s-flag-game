import { NATIONAL_NEWS_AGENCIES } from "../data/nationalNewsAgencies";
import type { NewsAgency } from "../types/newsAgency";

/**
 * Helpers for national news agencies in Learn mode.
 * Single source of truth consumed by:
 * - FlagGrid (when "National news agencies" content type is active)
 * - NationalFlagGrid (in Country "National symbols" tab)
 * - LearnPage (for detail widget in both World Map and Country Map views)
 */

export function countriesWithNewsAgencyData(): readonly string[] {
  return Object.keys(NATIONAL_NEWS_AGENCIES);
}

export function newsAgenciesForCountry(countryCode: string): readonly NewsAgency[] {
  return NATIONAL_NEWS_AGENCIES[countryCode.toUpperCase()] ?? [];
}

const newsAgencyByIdMap = new Map<string, NewsAgency>();
for (const list of Object.values(NATIONAL_NEWS_AGENCIES)) {
  for (const agency of list) {
    newsAgencyByIdMap.set(agency.id, agency);
  }
}

export function newsAgencyById(id: string | null | undefined): NewsAgency | null {
  if (!id) return null;
  return newsAgencyByIdMap.get(id) ?? null;
}

export function allNationalNewsAgencies(): readonly NewsAgency[] {
  const out: NewsAgency[] = [];
  for (const list of Object.values(NATIONAL_NEWS_AGENCIES)) {
    out.push(...list);
  }
  return out;
}

export function totalNewsAgencyCount(): number {
  return Object.values(NATIONAL_NEWS_AGENCIES).reduce((acc, list) => acc + list.length, 0);
}
