import { NATIONAL_NEWSPAPERS } from "../data/nationalNewspapers";
import type { Newspaper } from "../types/newspaper";

/**
 * Helpers for national newspapers in Learn mode.
 * Single source of truth consumed by:
 * - FlagGrid (when "Top newspapers" content type is active)
 * - NationalFlagGrid (in Country "National symbols" tab)
 * - LearnPage (for detail widget in both World Map and Country Map views)
 */

export function countriesWithNewspaperData(): readonly string[] {
  return Object.keys(NATIONAL_NEWSPAPERS);
}

export function newspapersForCountry(countryCode: string): readonly Newspaper[] {
  return NATIONAL_NEWSPAPERS[countryCode.toUpperCase()] ?? [];
}

const newspaperByIdMap = new Map<string, Newspaper>();
for (const list of Object.values(NATIONAL_NEWSPAPERS)) {
  for (const paper of list) {
    newspaperByIdMap.set(paper.id, paper);
  }
}

export function newspaperById(id: string | null | undefined): Newspaper | null {
  if (!id) return null;
  return newspaperByIdMap.get(id) ?? null;
}

export function allNationalNewspapers(): readonly Newspaper[] {
  const out: Newspaper[] = [];
  for (const list of Object.values(NATIONAL_NEWSPAPERS)) {
    out.push(...list);
  }
  return out;
}

export function totalNewspaperCount(): number {
  return Object.values(NATIONAL_NEWSPAPERS).reduce((acc, list) => acc + list.length, 0);
}
