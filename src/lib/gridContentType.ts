/**
 * The Learn-map grid's "Show" selector: whether each tile — and the detail
 * panel's image + explainer — shows the country's national flag (default), its
 * coat of arms, or its passport cover.
 *
 * Lifted out of `FlagGrid` so `LearnPage` owns the choice: the grid and the
 * country detail panel read the SAME value, so clicking a coat-of-arms/passport
 * tile swaps the panel to that symbol too (never the two disagreeing about what
 * is being shown). Only meaningful on the modern world map — historical polities
 * carry no national-symbols data, so consumers force "flag" for past eras.
 */
export type GridContentType = "flag" | "coatofarms" | "passport" | "footballcrest";

export const GRID_CONTENT_TYPE_LABELS: Record<GridContentType, string> = {
  flag: "National flags",
  coatofarms: "Coats of arms",
  passport: "Passports",
  footballcrest: "Football associations",
};

export const GRID_CONTENT_TYPE_ORDER: readonly GridContentType[] = [
  "flag",
  "coatofarms",
  "passport",
  "footballcrest",
];

const STORAGE_KEY = "flagGame.learn.contentType";

export function loadGridContentType(): GridContentType {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s && s in GRID_CONTENT_TYPE_LABELS) return s as GridContentType;
  } catch {
    /* localStorage unavailable — fall through to the default */
  }
  return "flag";
}

export function saveGridContentType(type: GridContentType): void {
  try {
    localStorage.setItem(STORAGE_KEY, type);
  } catch {
    /* ignore — persistence is best-effort */
  }
}
