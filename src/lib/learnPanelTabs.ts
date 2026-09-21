/**
 * Learn-mode country information panel tabs.
 *
 * The world-map Show dropdown used to swap the whole panel between unrelated
 * widgets (flag fact-sheet vs airline details vs newspaper…). These tabs keep
 * every category reachable for any selected country, and map Show types onto
 * the tab that owns that content so the two stay in step.
 */
import type { GridContentType } from "./gridContentType";

export const LEARN_PANEL_TAB_IDS = [
  "facts",
  "indices",
  "media",
  "travel",
  "politics",
] as const;

export type LearnPanelTabId = (typeof LEARN_PANEL_TAB_IDS)[number];

export const LEARN_PANEL_TAB_LABELS: Record<LearnPanelTabId, string> = {
  // "Overview" — identity + core country rows. Id stays `facts` so Show sync
  // and subdivision drill-in keep a stable key.
  facts: "Overview",
  indices: "Indices",
  media: "Media",
  travel: "Travel",
  politics: "Politics",
};

/** Country fact-sheet only — Media/Travel/Politics live in their own widgets
 *  below when drilled into a country's national-symbols tabs. */
export const LEARN_PANEL_SUBDIVISION_TABS: readonly LearnPanelTabId[] = [
  "facts",
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
      return "travel";
    case "party":
      return "politics";
    // Flags, coats of arms, passports, crests and Olympic logos remain the
    // leading identity image on Overview (and in subdivision drill-in).
    case "flag":
    case "coatofarms":
    case "passport":
    case "footballcrest":
    case "olympiccommittee":
      return "facts";
  }
}

/** Media / Travel sub-sections that host a multi-item chooser. */
export type LearnPanelMediaSection = "newspaper" | "newsagency" | "broadcaster";
export type LearnPanelTravelSection = "airline" | "tourismlogo";

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
  if (type === "airline" || type === "tourismlogo") return type;
  return null;
}
