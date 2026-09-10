import {
  POLITICAL_PARTIES,
  POLITICAL_COALITIONS,
  type PoliticalParty,
  type PoliticalCoalition,
} from "../data/politicalParties";
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

export function partyPowerBadges(party: PoliticalParty, countryCode: string): PartyBadgeItem[] {
  const cat = getGovernmentCategory(countryCode);
  const badges: PartyBadgeItem[] = [];

  if (cat === "presidential") {
    if (party.inExecutive) {
      badges.push({ label: "Hold executive power", kind: "executive" });
    }
    if (party.inPower && !party.inExecutive) {
      badges.push({ label: "Hold legislative power", kind: "legislative" });
    } else if (party.inPower && party.inExecutive) {
      badges.push({ label: "Hold legislative power", kind: "legislative" });
    }
  } else if (cat === "semi-presidential") {
    if (party.inExecutive && party.inPower) {
      badges.push({ label: "Hold executive power", kind: "executive" });
      badges.push({ label: "Hold legislative power", kind: "legislative" });
    } else if (party.inExecutive) {
      badges.push({ label: "Hold executive power", kind: "executive" });
    } else if (party.inPower) {
      badges.push({ label: "Hold legislative power", kind: "legislative" });
    }
  } else if (cat === "parliamentary") {
    if (party.inPower) {
      badges.push({ label: "In-power", kind: "power" });
    }
  } else {
    if (party.inPower) {
      badges.push({ label: "In-power", kind: "power" });
    }
  }

  return badges;
}
