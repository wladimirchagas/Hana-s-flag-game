import { NATIONAL_FLAGS } from "../data/nationalFlags";

/**
 * Special-status entities shown, grouped, inside a parent country's
 * "National symbols" tab.
 *
 * Many states hold territories with far more autonomy than an ordinary province —
 * their own flags, emblems and (sometimes) passports and constitutional status:
 * China's SARs (Hong Kong, Macau) and Taiwan; the U.S. territories (Puerto Rico,
 * Guam…); the UK's Crown Dependencies and Overseas Territories; the constituent
 * countries of the Danish and Dutch realms; and so on. The tab shows each one's
 * OWN national symbols as a separate, labelled group beside the parent country's.
 *
 * A `disputed` entity additionally carries a "Disputed" badge, because its status
 * is contested (Taiwan; Gibraltar; the Falklands) — used anywhere a status is
 * disputed, per the neutral disputed-territory treatment the rest of the app uses.
 *
 * These entities are NOT standalone countries in the game — they surface only
 * here. The mapping is deliberately data-only: adding a parent (Denmark →
 * Greenland/Faroe, Netherlands → Aruba/Curaçao, New Zealand → Cook Islands, …) is
 * a data change, not a code change.
 */
export type EntityStatus =
  | "sar" // Special Administrative Region (China)
  | "disputed" // contested status (shown with the "Disputed" badge alone)
  | "us-territory"
  | "us-commonwealth"
  | "crown-dependency"
  | "british-overseas-territory"
  | "constituent-country"
  | "associated-state"
  | "autonomous-territory"
  | "overseas-collectivity";

export type SpecialEntity = {
  /** Code whose own national symbols live in NATIONAL_FLAGS (HK, PR, JE, …). */
  code: string;
  /** Display name of the entity. */
  name: string;
  /** Its special status — drives the (neutral) badge on the entity's header. */
  status: EntityStatus;
  /** Also claimed by another state — adds an amber "Disputed" badge beside the
   *  status badge (Gibraltar, the Falklands). `status: "disputed"` already implies
   *  this and needs no flag. */
  disputed?: boolean;
};

export const SPECIAL_ENTITIES: Record<string, readonly SpecialEntity[]> = {
  CN: [
    { code: "HK", name: "Hong Kong", status: "sar" },
    { code: "MO", name: "Macau", status: "sar" },
    { code: "TW", name: "Taiwan", status: "disputed" },
  ],
  US: [
    { code: "PR", name: "Puerto Rico", status: "us-commonwealth" },
    { code: "GU", name: "Guam", status: "us-territory" },
    { code: "VI", name: "U.S. Virgin Islands", status: "us-territory" },
    { code: "AS", name: "American Samoa", status: "us-territory" },
    { code: "MP", name: "Northern Mariana Islands", status: "us-commonwealth" },
  ],
  GB: [
    // Crown Dependencies — self-governing possessions of the Crown, never part of
    // the UK and never colonies (they descend from the Duchy of Normandy / the
    // Kingdom of Mann).
    { code: "JE", name: "Jersey", status: "crown-dependency" },
    { code: "GG", name: "Guernsey", status: "crown-dependency" },
    { code: "IM", name: "Isle of Man", status: "crown-dependency" },
  ],
};

/** The neutral status badge text shown on an entity's group header. */
export const ENTITY_STATUS_LABEL: Record<EntityStatus, string> = {
  sar: "Special Administrative Region",
  disputed: "Disputed",
  "us-territory": "U.S. Territory",
  "us-commonwealth": "U.S. Commonwealth",
  "crown-dependency": "Crown Dependency",
  "british-overseas-territory": "British Overseas Territory",
  "constituent-country": "Constituent country",
  "associated-state": "Associated state",
  "autonomous-territory": "Autonomous territory",
  "overseas-collectivity": "Overseas collectivity",
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
