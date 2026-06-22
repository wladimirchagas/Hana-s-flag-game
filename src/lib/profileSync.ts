/**
 * Bridge between the synchronous localStorage flag stores
 * (`learnedFlags.ts`, `countrySelection.ts`) and the active profile's
 * Firestore document, so a profile's saved & learned flags follow the user
 * across devices.
 *
 * Why a module-level bridge rather than passing the profile down through React:
 * the flag stores are plain synchronous functions called from many places
 * (game logic, not just components). They write localStorage as the immediate
 * source of truth and call into here to (a) push the change up to the active
 * profile in Firestore and (b) announce the change so any mounted UI re-reads.
 *
 * `ProfileContext` owns the lifecycle: it sets the active profile here, and
 * hydrates localStorage from Firestore using the `hydrate*` helpers in the
 * flag stores (which notify but deliberately do NOT push back, avoiding loops).
 */

import { updateProfileFlags } from "./profileStore";

/** Window event fired whenever the saved/learned flag data changes (local edit
 *  or a hydrate from another device). UI re-reads its localStorage-backed
 *  state in response. */
export const FLAG_DATA_EVENT = "flagGame:flagdata";

let activeProfileId: string | null = null;

/** Called by ProfileContext when the active persona changes (null = Guest). */
export function setActiveSyncProfile(id: string | null): void {
  activeProfileId = id;
}

/** Announce that flag data changed so mounted components re-read. */
export function notifyFlagDataChanged(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(FLAG_DATA_EVENT));
  }
}

// Debounce remote writes: learning several flags or reordering a selection in
// quick succession should result in one Firestore write, not a burst.
const DEBOUNCE_MS = 600;
let selectedTimer: ReturnType<typeof setTimeout> | null = null;
let learnedTimer: ReturnType<typeof setTimeout> | null = null;

/** Push the selection up to the active profile (no-op as Guest). */
export function pushSelectedCodes(codes: readonly string[]): void {
  if (!activeProfileId) return;
  const id = activeProfileId;
  const snapshot = [...codes];
  if (selectedTimer) clearTimeout(selectedTimer);
  selectedTimer = setTimeout(() => {
    void updateProfileFlags(id, { selectedCodes: snapshot }).catch((err) =>
      console.warn("Selection sync failed; kept locally.", err),
    );
  }, DEBOUNCE_MS);
}

/** Push the learned set up to the active profile (no-op as Guest). */
export function pushLearnedCodes(codes: readonly string[]): void {
  if (!activeProfileId) return;
  const id = activeProfileId;
  const snapshot = [...codes];
  if (learnedTimer) clearTimeout(learnedTimer);
  learnedTimer = setTimeout(() => {
    void updateProfileFlags(id, { learnedCodes: snapshot }).catch((err) =>
      console.warn("Learned-flags sync failed; kept locally.", err),
    );
  }, DEBOUNCE_MS);
}
