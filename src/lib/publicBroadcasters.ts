import { PUBLIC_BROADCASTERS } from "../data/publicBroadcasters";
import type { PublicBroadcaster } from "../types/broadcaster";

/**
 * Helpers for public service broadcasters in Learn mode.
 * Single source of truth consumed by:
 * - FlagGrid (when "Public broadcasters" content type is active)
 * - NationalFlagGrid (in Country "National symbols" tab)
 * - LearnPage (for detail widget in both World Map and Country Map views)
 */

export function countriesWithBroadcasterData(): readonly string[] {
  return Object.keys(PUBLIC_BROADCASTERS);
}

export function broadcastersForCountry(countryCode: string): readonly PublicBroadcaster[] {
  return PUBLIC_BROADCASTERS[countryCode.toUpperCase()] ?? [];
}

const broadcasterByIdMap = new Map<string, PublicBroadcaster>();
for (const list of Object.values(PUBLIC_BROADCASTERS)) {
  for (const b of list) {
    broadcasterByIdMap.set(b.id, b);
  }
}

export function broadcasterById(id: string | null | undefined): PublicBroadcaster | null {
  if (!id) return null;
  return broadcasterByIdMap.get(id) ?? null;
}

export function allPublicBroadcasters(): readonly PublicBroadcaster[] {
  const out: PublicBroadcaster[] = [];
  for (const list of Object.values(PUBLIC_BROADCASTERS)) {
    out.push(...list);
  }
  return out;
}

export function totalBroadcasterCount(): number {
  return Object.values(PUBLIC_BROADCASTERS).reduce((acc, list) => acc + list.length, 0);
}
