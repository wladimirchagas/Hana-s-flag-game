import type { Continent } from "../api/countries";

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
