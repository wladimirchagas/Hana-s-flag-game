/**
 * Learn-mode information panel open/closed preference on large screens.
 * Default is open (today's two-column layout). Mobile / ≤900px ignores this
 * and always shows the panel in the stacked layout.
 */
const STORAGE_KEY = "flagGame.learn.panelOpen";

export function loadLearnPanelOpen(): boolean {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s === "0" || s === "false") return false;
    if (s === "1" || s === "true") return true;
  } catch {
    /* localStorage unavailable */
  }
  return true;
}

export function saveLearnPanelOpen(open: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY, open ? "1" : "0");
  } catch {
    /* ignore — persistence is best-effort */
  }
}
