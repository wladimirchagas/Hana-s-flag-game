import {
  POLITICAL_PARTIES,
  POLITICAL_COALITIONS,
  type PoliticalParty,
  type PoliticalCoalition,
} from "../data/politicalParties";
import { PARTY_LEGISLATURES, type CountryLegislature } from "../data/partyLegislatures";
import { GOVERNMENT_TYPES } from "./governmentTypes";

/**
 * Helpers for the Learn-mode "Political parties" grid view and its detail
 * widget — the party-data equivalent of `nationalFlags.ts` / `nationalSymbolImages.ts`.
 * Every consumer (the world-map grid, the country detail panel) reads the SAME
 * lookups here, so they can never disagree about which parties exist for a
 * country or what a specific party card resolves to.
 */

/** Every covered country's sourced parties, keyed by ISO alpha-2. Countries
 *  with no entry simply contribute nothing to the grid (coverage grows via an
 *  ongoing sweep — see CLAUDE.md-style sourcing discipline in politicalParties.ts). */
export function countriesWithPartyData(): readonly string[] {
  return Object.keys(POLITICAL_PARTIES);
}

/** A country's parties, in the order the manifest lists them. Empty when the
 *  country has no covered parties. */
export function partiesForCountry(code: string): readonly PoliticalParty[] {
  return POLITICAL_PARTIES[code] ?? [];
}

const partyByIdMap = new Map<string, PoliticalParty>();
for (const parties of Object.values(POLITICAL_PARTIES)) {
  for (const p of parties) partyByIdMap.set(p.id, p);
}

/** Look a party up by its own stable id (used to restore a grid-card selection). */
export function partyById(id: string | null | undefined): PoliticalParty | null {
  if (!id) return null;
  return partyByIdMap.get(id) ?? null;
}

/** The one national coalition/federation a party belongs to, or null. */
export function coalitionForParty(party: PoliticalParty): PoliticalCoalition | null {
  return party.coalitionId ? (POLITICAL_COALITIONS[party.coalitionId] ?? null) : null;
}

/** Every OTHER member of a party's coalition (excluding the party itself),
 *  resolved to full party objects — used to render "Coalition parties" in the
 *  detail widget. Members with no data (shouldn't happen once sourced) are
 *  skipped rather than shown blank. */
export function coalitionPartners(party: PoliticalParty): readonly PoliticalParty[] {
  const coalition = coalitionForParty(party);
  if (!coalition) return [];
  return coalition.memberPartyIds
    .filter((id) => id !== party.id)
    .map((id) => partyByIdMap.get(id))
    .filter((p): p is PoliticalParty => p != null);
}

/** Every sourced party across every covered country — one card each in the
 *  world-map grid's "Political parties" Show view. */
export function allPoliticalParties(): readonly PoliticalParty[] {
  const out: PoliticalParty[] = [];
  for (const list of Object.values(POLITICAL_PARTIES)) {
    out.push(...list);
  }
  return out;
}

/**
 * True when `label` is an abbreviation (LIB, NDP, UxP), not a readable
 * party name. Grid cards must never show one of these as the main name.
 */
export function isPartyNameAbbreviation(label: string): boolean {
  const trimmed = label.trim();
  if (!trimmed) return true;
  if (/\s/u.test(trimmed) && /\p{Ll}/u.test(trimmed)) return false;
  const letters = [...trimmed].filter((ch) => /\p{L}/u.test(ch));
  if (letters.length === 0) return true;
  const lower = letters.filter((ch) => /\p{Ll}/u.test(ch)).length;
  const upper = letters.filter((ch) => /\p{Lu}/u.test(ch)).length;
  if (lower === 0) return true;
  if (letters.length <= 5 && upper >= lower) return true;
  return false;
}

/**
 * Official local name, plus the sourced English translation when it
 * differs. Never the chamber abbreviation (`shortName` "LIB").
 * `partyCardName` is the plain-text form (sort, tooltip); the grid paints
 * the translation in grey via `PartyCardName`.
 */
export function partyCardNameParts(party: PoliticalParty): {
  native: string;
  translation: string | null;
} {
  const native = party.name.trim();
  const en = party.nameEn?.trim();
  const translation = native && en && en !== native ? en : null;
  return { native: native || en || party.shortName.trim(), translation };
}

export function partyCardName(party: PoliticalParty, _countryName?: string): string {
  const { native, translation } = partyCardNameParts(party);
  return translation ? `${native} (${translation})` : native;
}

/** How many parties (across every covered country) the grid will show for the
 *  current "Political parties" view. */
export function totalPartyCount(): number {
  return Object.values(POLITICAL_PARTIES).reduce((n, list) => n + list.length, 0);
}

export type GovernmentCategory = "presidential" | "parliamentary" | "semi-presidential" | "other";

export function getGovernmentCategory(countryCode: string): GovernmentCategory {
  const raw = (GOVERNMENT_TYPES[countryCode] ?? "").toLowerCase();
  if (raw.includes("semi-presidential")) return "semi-presidential";
  if (raw.includes("presidential")) return "presidential";
  if (raw.includes("parliamentary") || raw.includes("constitutional monarchy") || raw.includes("directorial")) return "parliamentary";
  return "other";
}

export interface PartyBadgeItem {
  readonly label: string;
  readonly kind: "power" | "executive" | "legislative";
}

export function legislatureForCountry(code: string): CountryLegislature | null {
  return PARTY_LEGISLATURES[code] ?? null;
}

function chamberShortName(countryCode: string, chamberName: string): string {
  const body = legislatureForCountry(countryCode)?.bodies.find((b) => b.name === chamberName);
  return body?.shortName ?? chamberName;
}

function chamberMajorityBadges(party: PoliticalParty, countryCode: string): PartyBadgeItem[] {
  const legislature = legislatureForCountry(countryCode);
  if (!legislature) return [];
  const cat = getGovernmentCategory(countryCode);
  const out: PartyBadgeItem[] = [];
  for (const c of party.chambers ?? []) {
    if (!c.majority) continue;
    // Westminster already labels the confidence house as "In-power".
    if (cat !== "presidential" && cat !== "semi-presidential" && c.name === legislature.confidenceHouse) {
      continue;
    }
    out.push({ label: chamberShortName(countryCode, c.name), kind: "legislative" });
  }
  return out;
}

function countryHasChamberMajority(countryCode: string): boolean {
  return partiesForCountry(countryCode).some((p) =>
    (p.chambers ?? []).some((c) => c.majority === true),
  );
}

export function partyPowerBadges(party: PoliticalParty, countryCode: string): PartyBadgeItem[] {
  const cat = getGovernmentCategory(countryCode);
  const badges: PartyBadgeItem[] = [];
  const splitLegislature = legislatureForCountry(countryCode) != null;
  const chamberMajorities = countryHasChamberMajority(countryCode);

  // Presidential / semi-presidential: split the two offices.
  // "Exec power" is the party of the HEAD OF GOVERNMENT only.
  // "Leg power" is the governing coalition when no single party holds a
  // chamber majority. Where a party does hold more than half a chamber,
  // that house is labelled by name (House / Senate) instead of a generic
  // Leg badge — so a split Congress can disagree without looking empty.
  // Parliamentary / Westminster systems fuse executive and the confidence
  // house into "In-power", and may still show an upper-house majority.
  if (cat === "presidential" || cat === "semi-presidential") {
    if (party.headOfGovernment) {
      badges.push({ label: "Exec power", kind: "executive" });
    }
    if (splitLegislature && chamberMajorities) {
      badges.push(...chamberMajorityBadges(party, countryCode));
    } else if (party.inPower) {
      badges.push({ label: "Leg power", kind: "legislative" });
    }
  } else {
    if (party.inPower) {
      badges.push({ label: "In-power", kind: "power" });
    }
    if (splitLegislature) {
      badges.push(...chamberMajorityBadges(party, countryCode));
    }
  }

  return badges;
}
