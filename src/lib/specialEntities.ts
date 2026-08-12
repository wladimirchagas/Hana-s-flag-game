import { NATIONAL_FLAGS } from "../data/nationalFlags";

/**
 * Special-status entities shown, grouped, inside a parent country's
 * "National symbols" tab.
 *
 * Hong Kong, Macau and Taiwan have far more autonomy than an ordinary province —
 * their own flags, emblems, passports and (for HK/Macau) a distinct constitutional
 * status — so the tab shows each one's OWN national symbols as a separate group,
 * beside the parent country's. Taiwan additionally carries a "Disputed" badge,
 * because its political status is contested; the same badge is used anywhere an
 * entity's status is disputed.
 *
 * These entities are NOT standalone countries in the game — they surface only
 * here. The mapping is deliberately data-only and general: adding a parent
 * (Serbia → Kosovo, Denmark → Greenland/Faroe, Cyprus → Northern Cyprus,
 * Georgia → Abkhazia/South Ossetia, …) is a data change, not a code change.
 */
export type EntityStatus = "sar" | "disputed" | "autonomous";

export type SpecialEntity = {
  /** Code whose own national symbols live in NATIONAL_FLAGS (HK, MO, TW, …). */
  code: string;
  /** Display name of the entity. */
  name: string;
  /** Its special status — drives the badge on the entity's group header. */
  status: EntityStatus;
};

export const SPECIAL_ENTITIES: Record<string, readonly SpecialEntity[]> = {
  CN: [
    { code: "HK", name: "Hong Kong", status: "sar" },
    { code: "MO", name: "Macau", status: "sar" },
    { code: "TW", name: "Taiwan", status: "disputed" },
  ],
};

/** The badge text shown on an entity's group header. */
export const ENTITY_STATUS_LABEL: Record<EntityStatus, string> = {
  sar: "Special Administrative Region",
  disputed: "Disputed",
  autonomous: "Autonomous region",
};

/** The special-status entities whose symbols are shown under this country (if any). */
export function specialEntitiesOf(countryCode: string): readonly SpecialEntity[] {
  return SPECIAL_ENTITIES[countryCode] ?? [];
}

/**
 * How many national-symbol cards the tab shows in total — the country's own PLUS
 * every special entity grouped under it. This is what the tab's count badge reads,
 * so it can never disagree with what the grid renders.
 */
export function totalNationalFlagCount(countryCode: string): number {
  let n = (NATIONAL_FLAGS[countryCode] ?? []).length;
  for (const e of specialEntitiesOf(countryCode)) {
    n += (NATIONAL_FLAGS[e.code] ?? []).length;
  }
  return n;
}
