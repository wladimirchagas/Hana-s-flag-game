import {
  COUNTRY_FACTS,
  type DemocracyData,
  type DemocracyIndex,
} from "../data/countryFacts";

export type DemocracyIndexKey =
  | "freedom-house"
  | "v-dem"
  | "economist"
  | "cpi"
  | "perception"
  | "rsf-press"
  | "hdi"
  | "gender-gap"
  | "gpi"
  | "happiness"
  | "gdi";

export type DemocracyMapMode = DemocracyIndexKey | null;

/** Ordered list of every democracy / governance index the map and chart can use.
 *  New indexes land here so the chart axis pickers and map colour modes stay in
 *  sync without a second hand-maintained menu. */
export const DEMOCRACY_INDEX_KEYS: readonly DemocracyIndexKey[] = [
  "freedom-house",
  "v-dem",
  "economist",
  "cpi",
  "perception",
  "rsf-press",
  "hdi",
  "gender-gap",
  "gpi",
  "happiness",
  "gdi",
] as const;

export type DemocracyAxisBand = {
  /** Classification label shown on the axis (e.g. "Flawed democracy"). */
  label: string;
  /** Inclusive lower bound of the score band on the chart axis. */
  min: number;
  /** Inclusive upper bound of the score band on the chart axis. */
  max: number;
};

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

/** Transparency International CPI map score bands (official CPI map legend).
 *  Higher score = less perceived public-sector corruption. Colours run
 *  clean→corrupt (green→yellow→red), matching TI’s published map scale. */
export const CPI_MAP_COLORS: Record<string, string> = {
  "90–100": "#004d1a",
  "80–89": "#1b5e20",
  "70–79": "#43a047",
  "60–69": "#9ccc65",
  "50–59": "#fdd835",
  "40–49": "#fb8c00",
  "30–39": "#f4511e",
  "20–29": "#e53935",
  "10–19": "#c62828",
  "0–9": "#7f0000",
};

export const CPI_BAND_ORDER: readonly string[] = [
  "90–100",
  "80–89",
  "70–79",
  "60–69",
  "50–59",
  "40–49",
  "30–39",
  "20–29",
  "10–19",
  "0–9",
];

// RSF World Press Freedom Index map colours follow the Index methodology bands
// (good / satisfactory / problematic / difficult / very serious).
export const RSF_PRESS_MAP_COLORS: Record<string, string> = {
  Good: "#2e7d32",
  Satisfactory: "#c0ca33",
  Problematic: "#fb8c00",
  Difficult: "#ef6c00",
  "Very serious": "#b71c1c",
};

/** UNDP Human Development Index map colours follow the official hdicode bands
 *  (Very High / High / Medium / Low). Higher development → greener. */
export const HDI_MAP_COLORS: Record<string, string> = {
  "Very High": "#1b5e20",
  High: "#4caf50",
  Medium: "#ff9800",
  Low: "#b71c1c",
};

export const HDI_BAND_ORDER: readonly string[] = [
  "Very High",
  "High",
  "Medium",
  "Low",
];

/** Global Peace Index State of Peace bands (IEP map legend). Lower score =
 *  more peaceful. Colours follow the official Vision of Humanity / IEP map. */
export const GPI_MAP_COLORS: Record<string, string> = {
  "Very High": "#00847f",
  High: "#54c0a9",
  Medium: "#fae28a",
  Low: "#f9ab68",
  "Very Low": "#ed1b24",
};

export const GPI_BAND_ORDER: readonly string[] = [
  "Very High",
  "High",
  "Medium",
  "Low",
  "Very Low",
];

/** World Happiness Report Cantril-ladder score bands (happiest → least).
 *  Bands are 1-point intervals on the published 0–10 life-evaluation scale;
 *  WHR itself does not publish categorical tiers — these exist for the map
 *  and Group-by, matching the CPI score-band pattern. */
export const HAPPINESS_MAP_COLORS: Record<string, string> = {
  "9.0–10": "#004d1a",
  "8.0–8.9": "#1b5e20",
  "7.0–7.9": "#2e7d32",
  "6.0–6.9": "#66bb6a",
  "5.0–5.9": "#c0ca33",
  "4.0–4.9": "#fdd835",
  "3.0–3.9": "#fb8c00",
  "2.0–2.9": "#f4511e",
  "1.0–1.9": "#c62828",
  "0.0–0.9": "#7f0000",
};

export const HAPPINESS_BAND_ORDER: readonly string[] = [
  "9.0–10",
  "8.0–8.9",
  "7.0–7.9",
  "6.0–6.9",
  "5.0–5.9",
  "4.0–4.9",
  "3.0–3.9",
  "2.0–2.9",
  "1.0–1.9",
  "0.0–0.9",
];

/** Lowy Institute Global Diplomacy Index — total diplomatic posts abroad.
 *  Lowy does not publish categorical tiers; these post-count bands exist for
 *  the map and Group-by only (same pattern as WHR / CPI score bands).
 *  Higher posts → greener. */
export const GDI_MAP_COLORS: Record<string, string> = {
  "250+": "#004d1a",
  "200–249": "#1b5e20",
  "150–199": "#43a047",
  "100–149": "#9ccc65",
  "50–99": "#fdd835",
  "Below 50": "#fb8c00",
};

export const GDI_BAND_ORDER: readonly string[] = [
  "250+",
  "200–249",
  "150–199",
  "100–149",
  "50–99",
  "Below 50",
];

/** WEF Global Gender Gap Index map bands — decade of percentage closed
 *  (score×100). Higher = closer to parity. Colours run parity→gap
 *  (green→yellow→red), matching the CPI clean→corrupt convention. */
export const GENDER_GAP_MAP_COLORS: Record<string, string> = {
  "90–100": "#004d1a",
  "80–89": "#1b5e20",
  "70–79": "#43a047",
  "60–69": "#9ccc65",
  "50–59": "#fdd835",
  "40–49": "#fb8c00",
  "30–39": "#f4511e",
  "20–29": "#e53935",
  "10–19": "#c62828",
  "0–9": "#7f0000",
};

export const GENDER_GAP_BAND_ORDER: readonly string[] = [
  "90–100",
  "80–89",
  "70–79",
  "60–69",
  "50–59",
  "40–49",
  "30–39",
  "20–29",
  "10–19",
  "0–9",
];

/** Democracy Perception Index 2026 tiers (±5 / ±15 on Index Score). */
export const PERCEPTION_MAP_COLORS: Record<string, string> = {
  "Very Positive": "#1b5e20",
  Positive: "#4caf50",
  Neutral: "#9e9e9e",
  Negative: "#ff9800",
  "Very Negative": "#b71c1c",
};

export const PERCEPTION_TIER_ORDER: readonly string[] = [
  "Very Positive",
  "Positive",
  "Neutral",
  "Negative",
  "Very Negative",
];

export function getDemocracyLegendTitle(mode: DemocracyMapMode): string {
  if (mode === "freedom-house") return "Freedom House";
  if (mode === "v-dem") return "V-Dem Regime Type";
  if (mode === "economist") return "The Economist Index";
  if (mode === "cpi") return "Corruption Perceptions Index";
  if (mode === "perception") return "Democracy Perception Index";
  if (mode === "rsf-press") return "RSF Press Freedom";
  if (mode === "hdi") return "Human Development Index";
  if (mode === "gender-gap") return "Global Gender Gap Index";
  if (mode === "gpi") return "Global Peace Index";
  if (mode === "happiness") return "World Happiness Report";
  if (mode === "gdi") return "Global Diplomacy Index";
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
  if (mode === "cpi") {
    return CPI_BAND_ORDER.map((label) => ({
      label,
      color: CPI_MAP_COLORS[label],
    }));
  }
  if (mode === "perception") {
    return PERCEPTION_TIER_ORDER.map((label) => ({
      label,
      color: PERCEPTION_MAP_COLORS[label],
    }));
  }
  if (mode === "rsf-press") {
    return [
      { label: "Good", color: RSF_PRESS_MAP_COLORS.Good },
      { label: "Satisfactory", color: RSF_PRESS_MAP_COLORS.Satisfactory },
      { label: "Problematic", color: RSF_PRESS_MAP_COLORS.Problematic },
      { label: "Difficult", color: RSF_PRESS_MAP_COLORS.Difficult },
      { label: "Very serious", color: RSF_PRESS_MAP_COLORS["Very serious"] },
    ];
  }
  if (mode === "hdi") {
    return HDI_BAND_ORDER.map((label) => ({
      label,
      color: HDI_MAP_COLORS[label],
    }));
  }
  if (mode === "gender-gap") {
    return GENDER_GAP_BAND_ORDER.map((label) => ({
      label,
      color: GENDER_GAP_MAP_COLORS[label],
    }));
  }
  if (mode === "gpi") {
    return GPI_BAND_ORDER.map((label) => ({
      label,
      color: GPI_MAP_COLORS[label],
    }));
  }
  if (mode === "happiness") {
    return HAPPINESS_BAND_ORDER.map((label) => ({
      label,
      color: HAPPINESS_MAP_COLORS[label],
    }));
  }
  if (mode === "gdi") {
    return GDI_BAND_ORDER.map((label) => ({
      label,
      color: GDI_MAP_COLORS[label],
    }));
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
    } else if (mode === "economist") {
      rating = demo.economist?.rating;
      colorMap = ECONOMIST_MAP_COLORS;
    } else if (mode === "cpi") {
      rating = demo.cpi?.rating;
      colorMap = CPI_MAP_COLORS;
    } else if (mode === "perception") {
      rating = demo.perception?.rating;
      colorMap = PERCEPTION_MAP_COLORS;
    } else if (mode === "rsf-press") {
      rating = demo.rsfPress?.rating;
      colorMap = RSF_PRESS_MAP_COLORS;
    } else if (mode === "hdi") {
      rating = demo.hdi?.rating;
      colorMap = HDI_MAP_COLORS;
    } else if (mode === "gender-gap") {
      rating = demo.genderGap?.rating;
      colorMap = GENDER_GAP_MAP_COLORS;
    } else if (mode === "gpi") {
      rating = demo.gpi?.rating;
      colorMap = GPI_MAP_COLORS;
    } else if (mode === "happiness") {
      rating = demo.happiness?.rating;
      colorMap = HAPPINESS_MAP_COLORS;
    } else if (mode === "gdi") {
      rating = demo.gdi?.rating;
      colorMap = GDI_MAP_COLORS;
    } else {
      continue;
    }
    if (rating && colorMap[rating]) {
      overlay.set(code, colorMap[rating]);
    }
  }
  return overlay;
}

/** Short menu / axis label for an index key. */
export function getDemocracyIndexLabel(key: DemocracyIndexKey): string {
  if (key === "freedom-house") return "Freedom House rating";
  if (key === "v-dem") return "V-Dem regime type";
  if (key === "economist") return "The Economist Index";
  if (key === "cpi") return "Corruption Perceptions Index";
  if (key === "perception") return "Democracy Perception Index";
  if (key === "rsf-press") return "RSF Press Freedom Index";
  if (key === "hdi") return "Human Development Index";
  if (key === "gender-gap") return "Global Gender Gap Index";
  if (key === "gpi") return "Global Peace Index";
  if (key === "happiness") return "World Happiness Report";
  return "Global Diplomacy Index";
}

/** Pull the index row for a country from bundled facts. */
export function getDemocracyIndexFor(
  democracy: DemocracyData | undefined,
  key: DemocracyIndexKey,
): DemocracyIndex | undefined {
  if (!democracy) return undefined;
  if (key === "freedom-house") return democracy.freedomHouse;
  if (key === "v-dem") return democracy.vDem;
  if (key === "economist") return democracy.economist;
  if (key === "cpi") return democracy.cpi;
  if (key === "perception") return democracy.perception;
  if (key === "rsf-press") return democracy.rsfPress;
  if (key === "hdi") return democracy.hdi;
  if (key === "gender-gap") return democracy.genderGap;
  if (key === "gpi") return democracy.gpi;
  if (key === "happiness") return democracy.happiness;
  return democracy.gdi;
}

/**
 * Full published scale for an index — used as a fallback when no points are
 * plotted, and as a hint for tick rounding. Chart axes no longer always span
 * this full range; see `fitDemocracyAxisDomain`.
 */
export function getDemocracyAxisDomain(key: DemocracyIndexKey): { min: number; max: number } {
  if (key === "v-dem" || key === "hdi" || key === "gender-gap") return { min: 0, max: 1 };
  if (key === "economist" || key === "happiness") return { min: 0, max: 10 };
  if (key === "perception") return { min: -40, max: 40 };
  if (key === "gpi") return { min: 1, max: 5 };
  if (key === "gdi") return { min: 0, max: 280 };
  // Freedom House, CPI, RSF — 0–100 scores.
  return { min: 0, max: 100 };
}

/** Nice step size near `rough` (1 / 2 / 5 × 10^n). */
function niceStep(rough: number): number {
  if (!Number.isFinite(rough) || rough <= 0) return 1;
  const exp = Math.floor(Math.log10(rough));
  const base = rough / 10 ** exp;
  // Wilkinson-style breakpoints (< 1.5 / 3 / 7) so a rough of 5.03 does not
  // jump to 10× and leave half the chart empty below the data.
  const nice =
    base < 1.5 ? 1 :
    base < 3 ? 2 :
    base < 7 ? 5 :
    10;
  return nice * 10 ** exp;
}

/**
 * Axis domain fitted to the values actually plotted — not the full published
 * scale. If every Gender Gap score sits above 0.5, the axis starts near 0.5
 * instead of zero. Snaps to nice tick boundaries, and refines the step when a
 * coarse snap would leave a large empty band below (or above) the data.
 */
export function fitDemocracyAxisDomain(
  values: readonly number[],
  key: DemocracyIndexKey,
  tickCount = 5,
): { min: number; max: number } {
  const full = getDemocracyAxisDomain(key);
  if (values.length === 0) return full;

  const dataMin = Math.min(...values);
  const dataMax = Math.max(...values);
  const span = dataMax - dataMin;
  const fullSpan = full.max - full.min || 1;

  if (span <= 0) {
    // Single value (or all identical) — open a small window around it.
    const pad = Math.max(fullSpan * 0.05, Math.abs(dataMin) * 0.05 || 0.05);
    let lo = dataMin - pad;
    let hi = dataMax + pad;
    const step = niceStep((hi - lo) / tickCount);
    let niceMin = Math.floor(lo / step) * step;
    let niceMax = Math.ceil(hi / step) * step;
    if (niceMax <= niceMin) niceMax = niceMin + step;
    niceMin = Math.max(niceMin, full.min);
    niceMax = Math.min(niceMax, full.max);
    return niceMax > niceMin ? { min: niceMin, max: niceMax } : full;
  }

  // Prefer a step that covers the DATA span in ~tickCount intervals. Floor /
  // ceil the data ends onto that step so we do not invent empty space below
  // the lowest score (the Gender Gap / Happiness bug with a coarse step of 2
  // snapping 1.4→0).
  let step = niceStep(span / tickCount);
  let niceMin = Math.floor(dataMin / step) * step;
  let niceMax = Math.ceil(dataMax / step) * step;

  // If flooring dropped more than ~20% of the data span below the lowest
  // point, the step is too coarse — try a finer one so the axis hugs the data.
  if ((dataMin - niceMin) / span > 0.2 || (niceMax - dataMax) / span > 0.2) {
    step = niceStep(span / (tickCount + 2));
    niceMin = Math.floor(dataMin / step) * step;
    niceMax = Math.ceil(dataMax / step) * step;
  }

  // Tiny headroom when a point sits exactly on a tick edge.
  if (dataMin - niceMin < step * 0.02) niceMin -= step;
  if (niceMax - dataMax < step * 0.02) niceMax += step;
  if (niceMax <= niceMin) niceMax = niceMin + step;

  // Floating-point tidy for 0–1 scales (HDI / Gender Gap / V-Dem).
  const decimals = step < 0.01 ? 4 : step < 0.1 ? 3 : step < 1 ? 2 : 1;
  const factor = 10 ** decimals;
  niceMin = Math.round(niceMin * factor) / factor;
  niceMax = Math.round(niceMax * factor) / factor;

  // Never invent scores outside the index's published scale (no negative
  // V-Dem / HDI / Gender Gap; no CPI above 100). The fitted window can still
  // start ABOVE the published floor when the data does — that is the point.
  niceMin = Math.max(niceMin, full.min);
  niceMax = Math.min(niceMax, full.max);
  if (niceMax <= niceMin) return full;

  return { min: niceMin, max: niceMax };
}

/** Keep only the part of each classification band that intersects the domain. */
export function clipDemocracyAxisBands(
  bands: readonly DemocracyAxisBand[],
  domain: { min: number; max: number },
): DemocracyAxisBand[] {
  const out: DemocracyAxisBand[] = [];
  for (const band of bands) {
    const min = Math.max(band.min, domain.min);
    const max = Math.min(band.max, domain.max);
    if (max > min) out.push({ label: band.label, min, max });
  }
  return out;
}

/**
 * Classification bands drawn as labelled regions on a chart axis.
 * Boundaries follow each index's published methodology (EIU score cut-offs,
 * TI CPI map bands, DPI ±5/±15 tiers, RSF score bands, FH Free / Partly Free /
 * Not Free thresholds). V-Dem regimes are not a pure EDI cut, so bands use
 * the approximate EDI ranges that separate the four regime types in the
 * bundled data — labels describe the classification, scores place the point.
 */
export function getDemocracyAxisBands(key: DemocracyIndexKey): DemocracyAxisBand[] {
  if (key === "freedom-house") {
    return [
      { label: "Not Free", min: 0, max: 34 },
      { label: "Partly Free", min: 35, max: 69 },
      { label: "Free", min: 70, max: 100 },
    ];
  }
  if (key === "v-dem") {
    return [
      { label: "Closed Autocracy", min: 0, max: 0.25 },
      { label: "Electoral Autocracy", min: 0.25, max: 0.45 },
      { label: "Electoral Democracy", min: 0.45, max: 0.7 },
      { label: "Liberal Democracy", min: 0.7, max: 1 },
    ];
  }
  if (key === "economist") {
    return [
      { label: "Authoritarian", min: 0, max: 4 },
      { label: "Hybrid regime", min: 4, max: 6 },
      { label: "Flawed democracy", min: 6, max: 8 },
      { label: "Full democracy", min: 8, max: 10 },
    ];
  }
  if (key === "cpi") {
    return CPI_BAND_ORDER.map((label) => {
      const [lo, hi] = label.split("–").map(Number);
      return { label, min: lo, max: hi };
    }).reverse(); // low→high for the axis
  }
  if (key === "perception") {
    return [
      { label: "Very Negative", min: -40, max: -15 },
      { label: "Negative", min: -15, max: -5 },
      { label: "Neutral", min: -5, max: 5 },
      { label: "Positive", min: 5, max: 15 },
      { label: "Very Positive", min: 15, max: 40 },
    ];
  }
  if (key === "rsf-press") {
    return [
      { label: "Very serious", min: 0, max: 40 },
      { label: "Difficult", min: 40, max: 55 },
      { label: "Problematic", min: 55, max: 70 },
      { label: "Satisfactory", min: 70, max: 85 },
      { label: "Good", min: 85, max: 100 },
    ];
  }
  if (key === "gender-gap") {
    // Decade bands on the 0–1 parity scale (score×100).
    return GENDER_GAP_BAND_ORDER.map((label) => {
      const [lo, hi] = label.split("–").map(Number);
      return { label, min: lo / 100, max: hi / 100 };
    }).reverse(); // low→high for the axis
  }
  if (key === "gpi") {
    // IEP 2026 State of Peace cutoffs (lower score = more peaceful).
    return [
      { label: "Very High", min: 1, max: 1.435 },
      { label: "High", min: 1.435, max: 1.903 },
      { label: "Medium", min: 1.903, max: 2.333 },
      { label: "Low", min: 2.333, max: 2.882 },
      { label: "Very Low", min: 2.882, max: 5 },
    ];
  }
  if (key === "happiness") {
    return HAPPINESS_BAND_ORDER.map((label) => {
      if (label === "9.0–10") return { label, min: 9, max: 10 };
      const [lo] = label.split("–").map(Number);
      return { label, min: lo, max: lo + 0.9 };
    }).reverse(); // low→high for the axis
  }
  if (key === "gdi") {
    return [
      { label: "Below 50", min: 0, max: 49 },
      { label: "50–99", min: 50, max: 99 },
      { label: "100–149", min: 100, max: 149 },
      { label: "150–199", min: 150, max: 199 },
      { label: "200–249", min: 200, max: 249 },
      { label: "250+", min: 250, max: 280 },
    ];
  }
  // hdi — UNDP cut-offs (Very High ≥0.800, High ≥0.700, Medium ≥0.550).
  return [
    { label: "Low", min: 0, max: 0.55 },
    { label: "Medium", min: 0.55, max: 0.7 },
    { label: "High", min: 0.7, max: 0.8 },
    { label: "Very High", min: 0.8, max: 1 },
  ];
}

/** Format a country's value on one axis for tooltips (classification + score). */
export function formatDemocracyAxisValue(
  key: DemocracyIndexKey,
  idx: DemocracyIndex,
): string {
  const score = idx.score;
  if (typeof score !== "number") return idx.rating;
  if (key === "perception") {
    const signed = score > 0 ? `+${score}` : `${score}`;
    return `${idx.rating} · ${signed}`;
  }
  if (key === "cpi") return `${idx.rating} · score ${score}`;
  if (key === "v-dem") return `${idx.rating} · ${score.toFixed(2)}`;
  if (key === "economist") return `${idx.rating} · ${score.toFixed(2)}`;
  if (key === "rsf-press") return `${idx.rating} · ${score.toFixed(1)}`;
  if (key === "hdi") return `${idx.rating} · ${score.toFixed(3)}`;
  if (key === "gender-gap") return `${idx.rating} · ${score.toFixed(3)}`;
  if (key === "gpi") return `${idx.rating} · ${score.toFixed(3)}`;
  if (key === "happiness") return `${idx.rating} · ${score.toFixed(3)}`;
  if (key === "gdi") return `${idx.rating} · ${score} posts`;
  return `${idx.rating} · ${score}`;
}

/** Every country that has a scored value for both chart axes. */
export function democracyChartPoints(
  xKey: DemocracyIndexKey,
  yKey: DemocracyIndexKey,
): Array<{
  code: string;
  x: number;
  y: number;
  xIndex: DemocracyIndex;
  yIndex: DemocracyIndex;
}> {
  const out: Array<{
    code: string;
    x: number;
    y: number;
    xIndex: DemocracyIndex;
    yIndex: DemocracyIndex;
  }> = [];
  for (const [code, facts] of Object.entries(COUNTRY_FACTS)) {
    const xIndex = getDemocracyIndexFor(facts.democracy, xKey);
    const yIndex = getDemocracyIndexFor(facts.democracy, yKey);
    if (!xIndex || typeof xIndex.score !== "number") continue;
    if (!yIndex || typeof yIndex.score !== "number") continue;
    out.push({ code, x: xIndex.score, y: yIndex.score, xIndex, yIndex });
  }
  return out;
}
