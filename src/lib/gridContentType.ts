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
export type GridContentType =
  | "flag"
  | "coatofarms"
  | "passport"
  | "footballcrest"
  | "olympiccommittee"
  | "airline"
  | "broadcaster"
  | "tourismlogo"
  | "newsagency"
  | "newspaper"
  | "party"
  | "centralbank";

export const GRID_CONTENT_TYPE_LABELS: Record<GridContentType, string> = {
  flag: "National flags",
  coatofarms: "Coats of arms",
  passport: "Passports",
  footballcrest: "Football associations",
  olympiccommittee: "Olympic committees",
  airline: "Commercial airlines",
  broadcaster: "Public broadcasters",
  tourismlogo: "Tourism logos",
  newsagency: "National news agencies",
  newspaper: "Top newspapers",
  party: "Political parties",
  centralbank: "Central banks",
};

/**
 * Every classification the world-map grid's Show dropdown must offer.
 * Do not drop a type that still has data and UI — `party` was removed once
 * (PR #1268) and must stay here. `scripts/check-grid-content-types.mjs` fails
 * the build if this list loses a required classification.
 */
export const GRID_CONTENT_TYPE_ORDER: readonly GridContentType[] = [
  "flag",
  "coatofarms",
  "passport",
  "footballcrest",
  "olympiccommittee",
  "airline",
  "broadcaster",
  "tourismlogo",
  "newsagency",
  "newspaper",
  "party",
  "centralbank",
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
