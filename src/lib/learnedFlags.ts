/**
 * Learned-flag progression for Hana's Game mode.
 *
 * Tracks two pieces of state in localStorage:
 *   - `flagGame.lastUnlockOfferedDate` — YYYY-MM-DD (browser-local) of the
 *     last day on which the celebration showed the "learn a new flag" CTA.
 *     The CTA is offered at most once per local calendar day: the first
 *     time the player completes a Hana's Game that day.
 *   - `flagGame.learnedCountryCodes` — alpha-2 codes of flags the user has
 *     "unlocked" via the daily offer. These are merged into the default
 *     Hana's Game selection and badged in Learn-your-flag mode.
 *
 * The daily flag is deterministic — every player on the same local
 * calendar date is offered the same flag (NYT Wordle parity). The pool
 * is the project's curated EASY-difficulty list, which intentionally
 * excludes Israel (currently classified as MODERATE / "hard for now").
 */

import { EASY_CODES } from "./flagDifficulty";

const LAST_OFFERED_KEY = "flagGame.lastUnlockOfferedDate";
const LEARNED_KEY = "flagGame.learnedCountryCodes";

/**
 * Pool of flags eligible to be offered as the daily unlock. Sorted
 * ascending so the rotation is deterministic across deployments —
 * `EASY_CODES` happens to be alphabetised in source today but we don't
 * want the rotation to drift if that ever changes.
 *
 * Coupled to `EASY_CODES`: adding a new easy flag automatically expands
 * the rotation; promoting Israel out of MODERATE would automatically
 * fold it in. Both intended.
 */
const DAILY_FLAG_POOL: readonly string[] = [...EASY_CODES].sort();

/**
 * Local-calendar date key in YYYY-MM-DD form, anchored to the browser's
 * timezone. We compare day keys (not millis) so the boundary is
 * "midnight local" regardless of the player's locale, and so the same
 * device opened twice in one day always sees the same key.
 */
export function getLocalDateKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

export function loadLastUnlockOfferedDate(): string | null {
  try {
    const raw = localStorage.getItem(LAST_OFFERED_KEY);
    return typeof raw === "string" && raw.length > 0 ? raw : null;
  } catch {
    return null;
  }
}

export function saveLastUnlockOfferedDate(dateKey: string): void {
  try {
    localStorage.setItem(LAST_OFFERED_KEY, dateKey);
  } catch {
    // ignore quota / privacy mode errors
  }
}

/**
 * True if the player hasn't yet been offered the daily unlock today —
 * i.e., the stored last-offered date differs from today's local-date key.
 * Caller is responsible for stamping `saveLastUnlockOfferedDate` once the
 * offer is presented so we don't show it twice in the same day.
 */
export function shouldOfferDailyUnlock(now: Date = new Date()): boolean {
  return loadLastUnlockOfferedDate() !== getLocalDateKey(now);
}

export function loadLearnedCodes(): string[] {
  try {
    const raw = localStorage.getItem(LEARNED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((c): c is string => typeof c === "string");
  } catch {
    return [];
  }
}

export function saveLearnedCodes(codes: readonly string[]): void {
  try {
    localStorage.setItem(LEARNED_KEY, JSON.stringify([...codes]));
  } catch {
    // ignore quota / privacy mode errors
  }
}

export function addLearnedCode(code: string): string[] {
  const current = loadLearnedCodes();
  if (current.includes(code)) return current;
  const next = [...current, code];
  saveLearnedCodes(next);
  return next;
}

/**
 * Number of whole UTC days between the Unix epoch and the midnight at
 * the start of `dateKey` (YYYY-MM-DD). Anchored at UTC noon so DST
 * transitions can't flip the integer one day forward / back.
 */
function daysSinceEpoch(dateKey: string): number {
  const [y, m, d] = dateKey.split("-").map(Number);
  return Math.floor(Date.UTC(y!, (m ?? 1) - 1, d ?? 1, 12, 0, 0) / 86_400_000);
}

/**
 * Today's daily flag — same alpha-2 code for every player on the same
 * local calendar date, like NYT Wordle's puzzle-of-the-day. Cycles
 * through `DAILY_FLAG_POOL` deterministically by date so two players
 * who finish their first Hana's Game of the day are offered identical
 * flags, regardless of timezone or game history.
 *
 * Always returns a valid pool entry (the pool is non-empty by
 * construction — `EASY_CODES` ships with the project).
 */
export function getDailyFlagCode(now: Date = new Date()): string {
  const dateKey = getLocalDateKey(now);
  const idx = daysSinceEpoch(dateKey) % DAILY_FLAG_POOL.length;
  return DAILY_FLAG_POOL[idx]!;
}

/** True iff the given alpha-2 code is already in the player's learned list. */
export function isLearned(code: string): boolean {
  return loadLearnedCodes().includes(code);
}
