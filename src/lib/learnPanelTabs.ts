/**
 * Learn-mode country information panel tabs.
 *
 * The world-map Show dropdown used to swap the whole panel between unrelated
 * widgets (flag fact-sheet vs airline details vs newspaper…). These tabs keep
 * every category reachable for any selected country, and map Show types onto
 * the tab that owns that content so the two stay in step.
 */
import type { GridContentType } from "./gridContentType";

/** Display order — single-line strip (scrolls horizontally when needed). */
export const LEARN_PANEL_TAB_IDS = [
  "facts",
  "politics",
  "finance",
  "media",
  "travel",
  "sports",
  "indices",
] as const;

export type LearnPanelTabId = (typeof LEARN_PANEL_TAB_IDS)[number];

export const LEARN_PANEL_TAB_LABELS: Record<LearnPanelTabId, string> = {
  // "Overview" — identity + core country rows. Id stays `facts` so Show sync
  // and subdivision drill-in keep a stable key.
  facts: "Overview",
  politics: "Politics",
  finance: "Finance",
  media: "Media",
  travel: "Travel",
  sports: "Sports",
  // "Rankings" — democracy / governance / ratings indices. Id stays `indices`.
  indices: "Rankings",
};

/** Country fact-sheet only — Media/Travel/Sports/Politics live in their own
 *  widgets below when drilled into a country's national-symbols tabs. */
export const LEARN_PANEL_SUBDIVISION_TABS: readonly LearnPanelTabId[] = [
  "facts",
  "finance",
  "indices",
];

/** Which panel tab owns a given world-map Show classification. */
export function panelTabForGridContent(
  type: GridContentType,
): LearnPanelTabId {
  switch (type) {
    case "newspaper":
    case "newsagency":
    case "broadcaster":
      return "media";
    case "airline":
    case "tourismlogo":
    case "passport":
      return "travel";
    case "footballcrest":
    case "olympiccommittee":
      return "sports";
    case "party":
      return "politics";
    // Flag / coat of arms lead Overview (pills switch between them).
    case "flag":
    case "coatofarms":
      return "facts";
  }
}

/** Media / Travel / Sports sub-sections that host a multi-item chooser. */
export type LearnPanelMediaSection = "newspaper" | "newsagency" | "broadcaster";
export type LearnPanelTravelSection = "airline" | "tourismlogo" | "passport";
export type LearnPanelSportsSection = "footballcrest" | "olympiccommittee";

/** National-symbol categories browsed via LearnPanelSymbolBody. */
export type LearnPanelSymbolSection =
  | "passport"
  | LearnPanelSportsSection;

export const LEARN_PANEL_MEDIA_SECTIONS: readonly {
  id: LearnPanelMediaSection;
  label: string;
}[] = [
  { id: "newspaper", label: "Newspapers" },
  { id: "newsagency", label: "News agencies" },
  { id: "broadcaster", label: "Broadcasters" },
];

export const LEARN_PANEL_TRAVEL_SECTIONS: readonly {
  id: LearnPanelTravelSection;
  label: string;
}[] = [
  { id: "airline", label: "Airlines" },
  { id: "tourismlogo", label: "Tourism" },
  { id: "passport", label: "Passports" },
];

export const LEARN_PANEL_SPORTS_SECTIONS: readonly {
  id: LearnPanelSportsSection;
  label: string;
}[] = [
  { id: "footballcrest", label: "Football" },
  { id: "olympiccommittee", label: "Olympics" },
];

export function mediaSectionForGridContent(
  type: GridContentType,
): LearnPanelMediaSection | null {
  if (type === "newspaper" || type === "newsagency" || type === "broadcaster") {
    return type;
  }
  return null;
}

export function travelSectionForGridContent(
  type: GridContentType,
): LearnPanelTravelSection | null {
  if (type === "airline" || type === "tourismlogo" || type === "passport") {
    return type;
  }
  return null;
}

export function sportsSectionForGridContent(
  type: GridContentType,
): LearnPanelSportsSection | null {
  if (type === "footballcrest" || type === "olympiccommittee") return type;
  return null;
}
