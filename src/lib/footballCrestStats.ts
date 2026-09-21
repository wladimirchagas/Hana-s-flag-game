/**
 * World Cup record rows shown beside a football-association crest.
 *
 * HARD RULE: every footballcrest entry the panel or National symbols widget
 * renders MUST carry these four sourced rows. Call `withFootballCrestStats`
 * (or `footballCrestStats`) — never display a crest without them.
 */
import type { NationalFlag } from "../data/nationalFlags";
import {
  WORLD_CUP_RECORDS,
  type WorldCupRecord,
} from "../data/worldCupRecords";

export const FOOTBALL_CREST_STAT_LABELS = [
  "Men's World Cups participated",
  "Men's World Cup titles",
  "Women's World Cups participated",
  "Women's World Cup titles",
] as const;

export type FootballCrestStat = {
  readonly label: (typeof FOOTBALL_CREST_STAT_LABELS)[number];
  readonly value: string;
};

const EMPTY: WorldCupRecord = {
  mensAppearances: 0,
  mensTitles: 0,
  womensAppearances: 0,
  womensTitles: 0,
};

/** Sourced record for a crest id; zeros when the association has never
 *  qualified / won (honest absence, not a missing row). */
export function worldCupRecordFor(crestId: string): WorldCupRecord {
  return WORLD_CUP_RECORDS[crestId] ?? EMPTY;
}

/** The four World Cup rows for a football-association crest. */
export function footballCrestStats(crestId: string): readonly FootballCrestStat[] {
  const r = worldCupRecordFor(crestId);
  return [
    { label: "Men's World Cups participated", value: String(r.mensAppearances) },
    { label: "Men's World Cup titles", value: String(r.mensTitles) },
    { label: "Women's World Cups participated", value: String(r.womensAppearances) },
    { label: "Women's World Cup titles", value: String(r.womensTitles) },
  ];
}

/**
 * Attach World Cup stats to a footballcrest entry (replacing any other
 * `stats` so the four rows are always present and never dropped). Non-
 * footballcrest entries are returned unchanged.
 */
export function withFootballCrestStats(flag: NationalFlag): NationalFlag {
  if (flag.category !== "footballcrest") return flag;
  return { ...flag, stats: footballCrestStats(flag.id) };
}
