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
 * The unlock pool is a hand-curated priority list of globally well-known
 * flags. United States and Israel are intentionally deprioritised per
 * product spec.
 */

const LAST_OFFERED_KEY = "flagGame.lastUnlockOfferedDate";
const LEARNED_KEY = "flagGame.learnedCountryCodes";

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
 * Pick the next flag to offer the user when they take the daily unlock.
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
