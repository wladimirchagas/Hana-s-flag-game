/**
 * Learned-flag progression for Hana's Game mode.
 *
 * Tracks one piece of state in localStorage:
 *   - `flagGame.learnedCountryCodes` — alpha-2 codes of flags the user has
 *     "unlocked" via the daily offer. These are merged into the default
 *     Hana's Game selection and badged in Learn-your-flag mode.
 *
 * The celebration offers today's flag on every completed Hana's Game.
 * Today's flag is deterministic — every player on the same local
 * calendar date is offered the same flag (NYT Wordle parity). The pool
 * is the project's curated EASY-difficulty list, minus anything that
 * ships in the default Hana's Game starter set (so the daily offer is
 * always a genuinely new flag for a brand-new player) and minus Israel
 * (currently classified as MODERATE / "hard for now").
 */

import { EASY_CODES } from "./flagDifficulty";
import { STARTER_SELECTED_CODES } from "./countrySelection";
import { notifyFlagDataChanged, pushLearnedCodes } from "./profileSync";

const LEARNED_KEY = "flagGame.learnedCountryCodes";

/**
 * Pool of flags eligible to be offered as the daily unlock.
 *
 *  - Source: `EASY_CODES` (project's curated easy-difficulty list).
 *  - Filtered: anything also in `STARTER_SELECTED_CODES` is removed so
 *    the daily offer is never a flag the player already has on day 1.
 *    This is the *only* place that invariant is enforced — adding a
 *    new code to the starter set automatically removes it from the
 *    daily rotation; dropping one from the starter set automatically
 *    folds it back in. Same applies in reverse for EASY_CODES.
 *  - Sorted ascending so the rotation is deterministic across
 *    deployments (every player on the same local calendar date sees
 *    the same flag, NYT-Wordle style).
 *
 * Computed lazily on first call to side-step the
 * learnedFlags ↔ countrySelection import cycle: by the time
 * `getDailyFlagCode` first runs (a user click), both modules have
 * fully initialised their top-level `const`s.
 */
let dailyFlagPoolCache: readonly string[] | null = null;
function getDailyFlagPool(): readonly string[] {
  if (dailyFlagPoolCache) return dailyFlagPoolCache;
  const starter = new Set(STARTER_SELECTED_CODES);
  dailyFlagPoolCache = [...EASY_CODES]
    .filter((c) => !starter.has(c))
    .sort();
  return dailyFlagPoolCache;
}

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

function writeLearnedLocal(codes: readonly string[]): void {
  try {
    localStorage.setItem(LEARNED_KEY, JSON.stringify([...codes]));
  } catch {
    // ignore quota / privacy mode errors
  }
}

/** Save learned codes locally AND sync them up to the active profile. */
export function saveLearnedCodes(codes: readonly string[]): void {
  writeLearnedLocal(codes);
  pushLearnedCodes(codes);
  notifyFlagDataChanged();
}

/**
 * Write learned codes that came DOWN from the active profile (another device).
 * Updates localStorage and notifies the UI, but does NOT push back to Firestore
 * — that would echo the change into an update loop.
 */
export function hydrateLearnedCodes(codes: readonly string[]): void {
  writeLearnedLocal(codes);
  notifyFlagDataChanged();
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
  const pool = getDailyFlagPool();
  const dateKey = getLocalDateKey(now);
  const idx = daysSinceEpoch(dateKey) % pool.length;
  return pool[idx]!;
}

/** True iff the given alpha-2 code is already in the player's learned list. */
export function isLearned(code: string): boolean {
  return loadLearnedCodes().includes(code);
}
