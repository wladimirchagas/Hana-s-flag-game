import type { Continent } from "../api/countries";
import type { SubdivisionMeta } from "../types/subdivision";

export type LeaderboardContinentBreakdown = Array<{
  continent: Continent;
  countriesInContinent: number;
  correct: number;
  wrong: number;
  total: number;
  correctPct: number;
  wrongPct: number;
}>;

export type LeaderboardCountrySnapshot = {
  name: string;
  code: string;
  flagSvg: string;
  continent: Continent;
};

/**
 * Present on runs from a subdivision-based game (Sub-national flags,
 * Disputed & Claimed Territories) — the country-shaped `countriesPlayed` /
 * `GameResultsFlags` path doesn't apply to these, so the lightbox needs this
 * to render the correct map (or no map) and a flags list with images.
 * Flag images are looked up by code at render time (subnationalDivisionFlag /
 * capitalFlagSrc are pure functions of the code), so only the lightweight
 * meta + results are stored here — not flag URLs.
 */
export type LeaderboardSubdivisionGame = {
  /** Set only for a single-country deck (Sub-national mode) — drives which
   *  country's map to fetch and render. Absent for a cross-country deck
   *  (Disputed & Claimed Territories), which shows no map, same as the live
   *  game. */
  countryCode?: string;
  countryName?: string;
  /** Divisions quizzed on their own flag. */
  divisions: SubdivisionMeta[];
  divisionResults: Record<string, "correct" | "wrong">;
  /** Divisions quizzed on their capital city's flag (mixed/capitals-only decks). */
  capitalDivisions?: SubdivisionMeta[];
  capitalResults?: Record<string, "correct" | "wrong">;
};

export type LeaderboardEntry = {
  id: string;
  playerName: string;
  createdAt: number;
  score: number;
  correctCount: number;
  wrongCount: number;
  totalAnswered: number;
  totalFlags: number;
  elapsedMs: number;
  meanAnswerMs: number | null;
  countryResults: Record<string, "correct" | "wrong">;
  countriesPlayed: LeaderboardCountrySnapshot[];
  continentBreakdown: LeaderboardContinentBreakdown;
  /** Identifies the game mode for leaderboard filtering, e.g. "all-195", "quiz-easy", "custom". */
  gameMode?: string;
  /** Set for Sub-national / Disputed-Territories runs — see the type's doc comment. */
  subdivisionGame?: LeaderboardSubdivisionGame;
  /** ID of the profile that scored this run, when played under a profile. */
  profileId?: string;
  /**
   * The profile's mascot avatar token (e.g. "mascot:teal") for showing the
   * player's avatar on the board. Only mascot tokens are stored — uploaded
   * photos are deliberately NOT denormalised into the public leaderboard.
   */
  profileAvatarId?: string;
};

const STORAGE_KEY = "flag-game-leaderboard-v1";
const MAX_ENTRIES = 100;

function sortEntries(a: LeaderboardEntry, b: LeaderboardEntry): number {
  if (b.score !== a.score) return b.score - a.score;
  if (b.correctCount !== a.correctCount) return b.correctCount - a.correctCount;
  if (a.elapsedMs !== b.elapsedMs) return a.elapsedMs - b.elapsedMs;
  return b.createdAt - a.createdAt;
}

export function loadLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as LeaderboardEntry[];
  } catch {
    return [];
  }
}

export function saveLeaderboard(entries: LeaderboardEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    /* ignore quota */
  }
}

export type NewLeaderboardEntry = Omit<LeaderboardEntry, "id" | "createdAt">;

export { sortEntries };

export function addLeaderboardEntry(entry: NewLeaderboardEntry): LeaderboardEntry {
  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
  const full: LeaderboardEntry = {
    ...entry,
    id,
    createdAt: Date.now(),
  };
  const list = [...loadLeaderboard(), full].sort(sortEntries);
  saveLeaderboard(list.slice(0, MAX_ENTRIES));
  return full;
}
