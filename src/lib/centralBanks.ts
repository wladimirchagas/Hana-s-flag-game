import { CENTRAL_BANKS } from "../data/centralBanks";
import type { CentralBank } from "../types/centralBank";

/**
 * Helpers for national central-bank logos in Learn mode.
 * Single source of truth consumed by:
 * - FlagGrid (when "Central banks" content type is active)
 * - LearnPage Finance tab (details widget)
 */

export function countriesWithCentralBankData(): readonly string[] {
  return Object.keys(CENTRAL_BANKS);
}

export function centralBanksForCountry(countryCode: string): readonly CentralBank[] {
  return CENTRAL_BANKS[countryCode.toUpperCase()] ?? [];
}

const centralBankByIdMap = new Map<string, CentralBank>();
for (const list of Object.values(CENTRAL_BANKS)) {
  for (const b of list) {
    centralBankByIdMap.set(b.id, b);
  }
}

export function centralBankById(id: string | null | undefined): CentralBank | null {
  if (!id) return null;
  return centralBankByIdMap.get(id) ?? null;
}

export function allCentralBanks(): readonly CentralBank[] {
  const out: CentralBank[] = [];
  for (const list of Object.values(CENTRAL_BANKS)) {
    out.push(...list);
  }
  return out;
}

export function totalCentralBankCount(): number {
  return Object.values(CENTRAL_BANKS).reduce((acc, list) => acc + list.length, 0);
}
