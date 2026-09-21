import { NATIONAL_NEWS_AGENCIES } from "../data/nationalNewsAgencies";
import type {
  NewsAgency,
  NewsAgencyOwnershipKind,
} from "../types/newsAgency";
import { NEWS_AGENCY_OWNERSHIP_LABELS } from "../types/newsAgency";

/**
 * Helpers for national news agencies in Learn mode.
 * Single source of truth consumed by:
 * - FlagGrid (when "National news agencies" content type is active)
 * - NationalFlagGrid (in Country "National symbols" tab)
 * - LearnPage (for detail widget in both World Map and Country Map views)
 */

export type AgencyOwnershipBadge = {
  readonly kind: NewsAgencyOwnershipKind;
  readonly label: string;
};

/**
 * Classify an agency into a short ownership badge (State / Private / …).
 * Explicit `ownershipKind` wins; otherwise `owner.type` is mapped by keyword.
 */
export function agencyOwnershipBadge(agency: NewsAgency): AgencyOwnershipBadge {
  const kind = agency.ownershipKind ?? classifyOwnerType(agency.owner?.type ?? "");
  return { kind, label: NEWS_AGENCY_OWNERSHIP_LABELS[kind] };
}

function classifyOwnerType(type: string): NewsAgencyOwnershipKind {
  const t = type.toLowerCase();
  // Order matters: more specific labels before the broad "state" catch-all.
  if (/\bregional\b|sub-?national|catalan|provincial|state service\b/.test(t) && /\bregional\b|catalan|sub-?national/.test(t)) {
    return "regional";
  }
  if (/\bregional\b/.test(t)) return "regional";
  if (/cooperat|member.?owned|news agency cooperative|not-for-profit news agency cooperative/.test(t)) {
    return "cooperative";
  }
  if (/government ministry|government executive|government information|ministry of/.test(t)) {
    return "government";
  }
  if (/\bofficial\b/.test(t) && !/\bstate\b/.test(t)) return "official";
  if (/\bofficial\b/.test(t) && /\bstate\b/.test(t)) return "state";
  if (/public.?law|public statutory|public service|autonomous public|public news|public-law/.test(t)) {
    return "public";
  }
  if (/private|commercial|publicly traded|media holding|investment holding/.test(t)) {
    return "private";
  }
  if (/independent/.test(t)) return "independent";
  if (/\bstate\b|statutory corporation|federal state|state-owned|state-controlled|state news/.test(t)) {
    return "state";
  }
  if (/non-profit|trust|foundation/.test(t)) return "independent";
  return "private";
}

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
