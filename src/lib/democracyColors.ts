import { COUNTRY_FACTS } from "../data/countryFacts";

export type DemocracyMapMode = "freedom-house" | "v-dem" | "economist" | null;

export type DemocracyLegendItem = {
  label: string;
  color: string;
};

export const FREEDOM_HOUSE_MAP_COLORS: Record<string, string> = {
  "Free": "#2e7d32",
  "Partly Free": "#f57c00",
  "Not Free": "#c62828",
};

export const V_DEM_MAP_COLORS: Record<string, string> = {
  "Liberal Democracy": "#1b5e20",
  "Electoral Democracy": "#4caf50",
  "Electoral Autocracy": "#ff9800",
  "Closed Autocracy": "#b71c1c",
};

export const ECONOMIST_MAP_COLORS: Record<string, string> = {
  "Full democracy": "#1b5e20",
  "Flawed democracy": "#4caf50",
  "Hybrid regime": "#ff9800",
  "Authoritarian": "#b71c1c",
};

export function getDemocracyLegendTitle(mode: DemocracyMapMode): string {
  if (mode === "freedom-house") return "Freedom House";
  if (mode === "v-dem") return "V-Dem Regime Type";
  if (mode === "economist") return "The Economist Index";
  return "";
}

export function getDemocracyLegendItems(mode: DemocracyMapMode): DemocracyLegendItem[] {
  if (mode === "freedom-house") {
    return [
      { label: "Free", color: FREEDOM_HOUSE_MAP_COLORS["Free"] },
      { label: "Partly Free", color: FREEDOM_HOUSE_MAP_COLORS["Partly Free"] },
      { label: "Not Free", color: FREEDOM_HOUSE_MAP_COLORS["Not Free"] },
    ];
  }
  if (mode === "v-dem") {
    return [
      { label: "Liberal Democracy", color: V_DEM_MAP_COLORS["Liberal Democracy"] },
      { label: "Electoral Democracy", color: V_DEM_MAP_COLORS["Electoral Democracy"] },
      { label: "Electoral Autocracy", color: V_DEM_MAP_COLORS["Electoral Autocracy"] },
      { label: "Closed Autocracy", color: V_DEM_MAP_COLORS["Closed Autocracy"] },
    ];
  }
  if (mode === "economist") {
    return [
      { label: "Full democracy", color: ECONOMIST_MAP_COLORS["Full democracy"] },
      { label: "Flawed democracy", color: ECONOMIST_MAP_COLORS["Flawed democracy"] },
      { label: "Hybrid regime", color: ECONOMIST_MAP_COLORS["Hybrid regime"] },
      { label: "Authoritarian", color: ECONOMIST_MAP_COLORS["Authoritarian"] },
    ];
  }
  return [];
}

export function getDemocracyColorOverlay(mode: DemocracyMapMode): Map<string, string> | null {
  if (!mode) return null;
  const overlay = new Map<string, string>();
  for (const [code, facts] of Object.entries(COUNTRY_FACTS)) {
    const demo = facts.democracy;
    if (!demo) continue;
    let rating: string | undefined;
    let colorMap: Record<string, string>;
    if (mode === "freedom-house") {
      rating = demo.freedomHouse?.rating;
      colorMap = FREEDOM_HOUSE_MAP_COLORS;
    } else if (mode === "v-dem") {
      rating = demo.vDem?.rating;
      colorMap = V_DEM_MAP_COLORS;
    } else {
      rating = demo.economist?.rating;
      colorMap = ECONOMIST_MAP_COLORS;
    }
    if (rating && colorMap[rating]) {
      overlay.set(code, colorMap[rating]);
    }
  }
  return overlay;
}
