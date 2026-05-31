/**
 * Learned-flag progression for Hana's Game mode.
 *
 * Tracks two pieces of state in localStorage:
 *   - `flagGame.perfectStreak` — number of consecutive 100%-perfect Hana's
 *     Game completions. Resets to 0 on any imperfect or early-ended game.
 *   - `flagGame.learnedCountryCodes` — alpha-2 codes of flags the user has
 *     "unlocked" via the streak-reward flow. These are merged into the
 *     default Hana's Game selection and badged in Learn-your-flag mode.
 *
 * The unlock pool is a hand-curated priority list of globally well-known
 * flags. United States and Israel are intentionally deprioritised per
 * product spec.
 */

const STREAK_KEY = "flagGame.perfectStreak";
const LEARNED_KEY = "flagGame.learnedCountryCodes";

/**
 * Number of consecutive perfect games required to unlock the next flag.
 * Exposed so the celebration UI can mention the threshold consistently.
 */
export const PERFECT_STREAK_THRESHOLD = 3;

/**
 * Priority order for picking the next "easy" flag to unlock. Iconic,
 * widely-recognised national flags listed first. United States (US) and
 * Israel (IL) are at the very end so they are only offered once the rest
 * have been learned.
 */
const UNLOCK_PRIORITY: readonly string[] = [
  "FR", // France
  "DE", // Germany
  "GB", // United Kingdom
  "IT", // Italy
  "CN", // China
  "ES", // Spain
  "AR", // Argentina
  "KR", // South Korea
  "CH", // Switzerland
  "SE", // Sweden
  "GR", // Greece
  "MX", // Mexico
  "ZA", // South Africa
  "RU", // Russia
  "NL", // Netherlands
  "PT", // Portugal
  "NO", // Norway
  "DK", // Denmark
  "IE", // Ireland
  "EG", // Egypt
  "VA", // Vatican City
  "NP", // Nepal
  "SG", // Singapore
  "SA", // Saudi Arabia
  "ID", // Indonesia
  "TR", // Turkey
  // Deprioritised — only offered after the rest are exhausted.
  "US", // United States
  "IL", // Israel
];

export function loadPerfectStreak(): number {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (raw == null) return 0;
    const n = Number.parseInt(raw, 10);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  } catch {
    return 0;
  }
}

export function savePerfectStreak(streak: number): void {
  try {
    localStorage.setItem(STREAK_KEY, String(Math.max(0, streak)));
  } catch {
    // ignore quota / privacy mode errors
  }
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
 * Pick the next flag to offer the user when they cash in their streak.
 * Walks the curated priority list and returns the first code that is
 * neither already learned nor present in their current Hana's Game pool
 * (so the unlock is always something genuinely new to them).
 *
 * Returns `null` only if every priority-list flag is already known —
 * extremely unlikely in practice.
 */
export function pickNextUnlockCode(
  alreadyKnown: readonly string[],
): string | null {
  const known = new Set(alreadyKnown.map((c) => c.toUpperCase()));
  const learned = new Set(loadLearnedCodes().map((c) => c.toUpperCase()));
  for (const code of UNLOCK_PRIORITY) {
    if (known.has(code) || learned.has(code)) continue;
    return code;
  }
  return null;
}
