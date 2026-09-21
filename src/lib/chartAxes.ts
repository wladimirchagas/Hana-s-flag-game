/**
 * Extra X/Y axis metrics for the Democracy Index chart — population, GDP,
 * World Cups, Olympics, airlines, tourist arrivals — sourced from the same
 * bundled data the rest of Learn mode already shows (never invented).
 *
 * Democracy / governance indexes stay in `democracyColors.ts`; this module
 * only adds the non-index axes and a unified `ChartAxisKey` for the chart
 * dropdowns. Map colour modes continue to use `DEMOCRACY_INDEX_KEYS` alone.
 */
import type { Country } from "../api/countries";
import { COUNTRY_FACTS } from "../data/countryFacts";
import { COMMERCIAL_AIRLINES } from "../data/commercialAirlines";
import { NATIONAL_FLAGS } from "../data/nationalFlags";
import { TOURISM_LOGOS } from "../data/tourismLogos";
import {
  MENS_WORLD_CUP_TITLES,
  WOMENS_WORLD_CUP_TITLES,
} from "../data/worldCupTitles";
import {
  DEMOCRACY_INDEX_KEYS,
  type DemocracyIndexKey,
  type DemocracyAxisBand,
  democracyChartPoints,
  fitDemocracyAxisDomain,
  formatDemocracyAxisValue,
  getDemocracyAxisBands,
  getDemocracyAxisDomain,
  getDemocracyIndexFor,
  getDemocracyIndexLabel,
} from "./democracyColors";

export type ChartMetricKey =
  | "population"
  | "gdp"
  | "gdp-per-capita"
  | "fifa-mens-world-cups"
  | "fifa-womens-world-cups"
  | "winter-olympic-participations"
  | "winter-olympic-medals"
  | "summer-olympic-participations"
  | "summer-olympic-medals"
  | "commercial-airlines"
  | "annual-visitors";

export type ChartAxisKey = DemocracyIndexKey | ChartMetricKey;

/** Axis picker value — a real metric, or `"none"` for a one-axis chart. */
export type ChartAxisSelection = ChartAxisKey | "none";

export const CHART_AXIS_NONE = "none" as const;

export function isChartAxisNone(
  key: ChartAxisSelection,
): key is typeof CHART_AXIS_NONE {
  return key === CHART_AXIS_NONE;
}

export const CHART_METRIC_KEYS: readonly ChartMetricKey[] = [
  "population",
  "gdp",
  "gdp-per-capita",
  "fifa-mens-world-cups",
  "fifa-womens-world-cups",
  "winter-olympic-participations",
  "winter-olympic-medals",
  "summer-olympic-participations",
  "summer-olympic-medals",
  "commercial-airlines",
  "annual-visitors",
] as const;

/** Axis picker order: every democracy index, then the extra metrics. */
export const CHART_AXIS_KEYS: readonly ChartAxisKey[] = [
  ...DEMOCRACY_INDEX_KEYS,
  ...CHART_METRIC_KEYS,
];

const METRIC_KEY_SET = new Set<string>(CHART_METRIC_KEYS);

export function isChartMetricKey(key: ChartAxisKey): key is ChartMetricKey {
  return METRIC_KEY_SET.has(key);
}

export function isDemocracyAxisKey(key: ChartAxisKey): key is DemocracyIndexKey {
  return !isChartMetricKey(key);
}

/** Population / money / arrivals span orders of magnitude — log axes keep them readable. */
const LOG_METRIC_KEYS = new Set<ChartMetricKey>([
  "population",
  "gdp",
  "gdp-per-capita",
  "annual-visitors",
]);

export function chartAxisUsesLogScale(key: ChartAxisKey): boolean {
  return isChartMetricKey(key) && LOG_METRIC_KEYS.has(key);
}

export function getChartAxisLabel(key: ChartAxisKey): string {
  if (isDemocracyAxisKey(key)) return getDemocracyIndexLabel(key);
  if (key === "population") return "Population";
  if (key === "gdp") return "GDP (USD)";
  if (key === "gdp-per-capita") return "GDP per capita (USD)";
  if (key === "fifa-mens-world-cups") return "FIFA Men's World Cups";
  if (key === "fifa-womens-world-cups") return "FIFA Women's World Cups";
  if (key === "winter-olympic-participations") return "Winter Olympic participations";
  if (key === "winter-olympic-medals") return "Winter Olympic medals";
  if (key === "summer-olympic-participations") return "Summer Olympic participations";
  if (key === "summer-olympic-medals") return "Summer Olympic medals";
  if (key === "commercial-airlines") return "Commercial airlines";
  return "Annual visitors (international tourist arrivals)";
}

function parseLeadingInt(value: string): number | null {
  const m = value.trim().match(/^(\d+)/);
  return m ? Number(m[1]) : null;
}

/** Total medals from "G–S–B" stats like "22–27–31 (80 total)" or "0–0–0 (none)". */
function parseMedalTotal(value: string): number | null {
  if (/N\/A/i.test(value)) return 0;
  const total = value.match(/\((\d+)\s*total\)/i);
  if (total) return Number(total[1]);
  if (/none/i.test(value)) return 0;
  const parts = value.match(/(\d+)\s*[–-]\s*(\d+)\s*[–-]\s*(\d+)/);
  if (parts) return Number(parts[1]) + Number(parts[2]) + Number(parts[3]);
  return parseLeadingInt(value);
}

function olympicStat(code: string, labelPrefix: string): number | null {
  const flags = NATIONAL_FLAGS[code];
  if (!flags) return null;
  const noc = flags.find(
    (f) => f.category === "olympiccommittee" && f.id === `${code.toLowerCase()}-olympic-committee`,
  );
  const row = noc?.stats?.find((s) => s.label.startsWith(labelPrefix));
  if (!row) return null;
  if (labelPrefix.includes("medals")) return parseMedalTotal(row.value);
  return parseLeadingInt(row.value);
}

function mensWorldCupsForCountry(code: string): number {
  // England's 1966 title is keyed on the home-nation crest id, not GB.
  if (code === "GB") {
    return (
      (MENS_WORLD_CUP_TITLES["GB"] ?? 0) +
      (MENS_WORLD_CUP_TITLES["gb-eng-football-crest"] ?? 0)
    );
  }
  return MENS_WORLD_CUP_TITLES[code] ?? 0;
}

function womensWorldCupsForCountry(code: string): number {
  return WOMENS_WORLD_CUP_TITLES[code] ?? 0;
}

function annualVisitorsForCountry(code: string): number | null {
  const list = TOURISM_LOGOS[code];
  if (!list) return null;
  for (const entry of list) {
    if (typeof entry.visitors?.count === "number" && entry.visitors.count >= 0) {
      return entry.visitors.count;
    }
  }
  return null;
}

export type ChartAxisValue = {
  score: number;
  /** Short label for tooltips (classification or formatted figure). */
  label: string;
};

/**
 * Numeric value for one country on one chart axis, or null when that metric
 * is genuinely unsourceable for the country (same "missing beats wrong" rule).
 */
export function getChartAxisValue(
  code: string,
  key: ChartAxisKey,
  country: Country | undefined,
): ChartAxisValue | null {
  if (isDemocracyAxisKey(key)) {
    const facts = COUNTRY_FACTS[code];
    const idx = getDemocracyIndexFor(facts?.democracy, key);
    if (!idx || typeof idx.score !== "number") return null;
    return { score: idx.score, label: formatDemocracyAxisValue(key, idx) };
  }

  if (key === "population") {
    const pop = country?.population;
    if (typeof pop !== "number" || !(pop > 0)) return null;
    return { score: pop, label: formatCompactNumber(pop) };
  }
  if (key === "gdp") {
    const gdp = country?.gdpUsd ?? COUNTRY_FACTS[code]?.gdpUsd;
    if (typeof gdp !== "number" || !(gdp > 0)) return null;
    return { score: gdp, label: `$${formatCompactNumber(gdp)}` };
  }
  if (key === "gdp-per-capita") {
    const pc = country?.gdpPerCapitaUsd ?? COUNTRY_FACTS[code]?.gdpPerCapitaUsd;
    if (typeof pc !== "number" || !(pc > 0)) return null;
    return { score: pc, label: `$${Math.round(pc).toLocaleString("en-US")}` };
  }
  if (key === "fifa-mens-world-cups") {
    const n = mensWorldCupsForCountry(code);
    return { score: n, label: String(n) };
  }
  if (key === "fifa-womens-world-cups") {
    const n = womensWorldCupsForCountry(code);
    return { score: n, label: String(n) };
  }
  if (key === "winter-olympic-participations") {
    const n = olympicStat(code, "Winter Games participated");
    if (n === null) return null;
    return { score: n, label: String(n) };
  }
  if (key === "winter-olympic-medals") {
    const n = olympicStat(code, "Winter Olympic medals");
    if (n === null) return null;
    return { score: n, label: String(n) };
  }
  if (key === "summer-olympic-participations") {
    const n = olympicStat(code, "Summer Games participated");
    if (n === null) return null;
    return { score: n, label: String(n) };
  }
  if (key === "summer-olympic-medals") {
    const n = olympicStat(code, "Summer Olympic medals");
    if (n === null) return null;
    return { score: n, label: String(n) };
  }
  if (key === "commercial-airlines") {
    const list = COMMERCIAL_AIRLINES[code];
    if (!list) return null;
    const n = list.length;
    return { score: n, label: String(n) };
  }
  // annual-visitors
  const visitors = annualVisitorsForCountry(code);
  if (visitors === null) return null;
  return { score: visitors, label: formatCompactNumber(visitors) };
}

export function formatCompactNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs >= 1e12) return `${(n / 1e12).toFixed(abs >= 1e13 ? 0 : 1)}T`;
  if (abs >= 1e9) return `${(n / 1e9).toFixed(abs >= 1e10 ? 0 : 1)}B`;
  if (abs >= 1e6) return `${(n / 1e6).toFixed(abs >= 1e7 ? 0 : 1)}M`;
  if (abs >= 1e3) return `${(n / 1e3).toFixed(abs >= 1e4 ? 0 : 1)}k`;
  return Math.round(n).toLocaleString("en-US");
}

export function getChartAxisBands(key: ChartAxisKey): DemocracyAxisBand[] {
  if (isDemocracyAxisKey(key)) return getDemocracyAxisBands(key);
  return [];
}

export function getChartAxisDomain(key: ChartAxisKey): { min: number; max: number } {
  if (isDemocracyAxisKey(key)) return getDemocracyAxisDomain(key);
  if (key === "population") return { min: 1, max: 1.5e9 };
  if (key === "gdp") return { min: 1e6, max: 3e13 };
  if (key === "gdp-per-capita") return { min: 100, max: 200_000 };
  if (key === "annual-visitors") return { min: 1, max: 1e8 };
  if (
    key === "fifa-mens-world-cups" ||
    key === "fifa-womens-world-cups"
  ) {
    return { min: 0, max: 8 };
  }
  if (
    key === "winter-olympic-participations" ||
    key === "summer-olympic-participations"
  ) {
    return { min: 0, max: 30 };
  }
  if (key === "winter-olympic-medals" || key === "summer-olympic-medals") {
    return { min: 0, max: 3000 };
  }
  // commercial-airlines
  return { min: 0, max: 40 };
}

/** Map a raw score onto the axis scale (log10 for wide-range metrics). */
export function chartAxisScaleValue(key: ChartAxisKey, score: number): number {
  if (chartAxisUsesLogScale(key)) {
    return Math.log10(Math.max(score, 1e-12));
  }
  return score;
}

export function chartAxisUnscaleValue(key: ChartAxisKey, scaled: number): number {
  if (chartAxisUsesLogScale(key)) return 10 ** scaled;
  return scaled;
}

/**
 * Fit an axis domain to observed values.
 *
 * Callers pass values already mapped through `chartAxisScaleValue` (so log
 * axes arrive as log10 scores). Democracy indexes keep their own fitter.
 */
export function fitChartAxisDomain(
  values: readonly number[],
  key: ChartAxisKey,
  tickCount = 5,
): { min: number; max: number } {
  if (isDemocracyAxisKey(key)) {
    return fitDemocracyAxisDomain(values, key, tickCount);
  }
  const full = getChartAxisDomain(key);
  if (values.length === 0) {
    return chartAxisUsesLogScale(key)
      ? {
          min: chartAxisScaleValue(key, full.min),
          max: chartAxisScaleValue(key, full.max),
        }
      : full;
  }

  if (chartAxisUsesLogScale(key)) {
    // `values` are already log-scaled by the chart — do not log again.
    return fitLogDomain(values, tickCount);
  }

  // Count-like metrics: hug the data, stay within the published floor/ceiling.
  const dataMin = Math.min(...values);
  const dataMax = Math.max(...values);
  let lo = Math.floor(Math.min(dataMin, 0));
  let hi = Math.ceil(Math.max(dataMax, dataMin + 1));
  if (hi <= lo) hi = lo + 1;
  lo = Math.max(lo, full.min);
  hi = Math.min(Math.max(hi, lo + 1), full.max);
  return { min: lo, max: hi };
}

function fitLogDomain(
  scaledValues: readonly number[],
  tickCount: number,
): { min: number; max: number } {
  const dataMin = Math.min(...scaledValues);
  const dataMax = Math.max(...scaledValues);
  const span = dataMax - dataMin;
  if (span <= 0) {
    return { min: dataMin - 0.5, max: dataMax + 0.5 };
  }
  const pad = span / Math.max(tickCount, 4);
  return { min: dataMin - pad * 0.15, max: dataMax + pad * 0.15 };
}

export function formatChartAxisTick(key: ChartAxisKey, rawValue: number): string {
  if (isDemocracyAxisKey(key)) {
    if (key === "v-dem") return rawValue.toFixed(1);
    if (key === "hdi" || key === "gender-gap" || key === "gpi" || key === "etr" || key === "gti") {
      return rawValue.toFixed(2);
    }
    if (key === "economist" || key === "happiness") return rawValue.toFixed(1);
    if (key === "perception") return rawValue > 0 ? `+${rawValue}` : `${rawValue}`;
    return `${Math.round(rawValue)}`;
  }
  if (chartAxisUsesLogScale(key)) {
    // Tick positions are stored as scaled log values; unscale for labels.
    const v = chartAxisUnscaleValue(key, rawValue);
    if (key === "gdp" || key === "gdp-per-capita") return `$${formatCompactNumber(v)}`;
    return formatCompactNumber(v);
  }
  return `${Math.round(rawValue)}`;
}

export type ChartPoint = {
  code: string;
  x: number;
  y: number;
  xLabel: string;
  yLabel: string;
};

/**
 * Every country with a scored value on the active axis/axes.
 * `"none"` on one axis yields a one-axis strip (the unused score is 0);
 * both `"none"` yields no points.
 */
export function chartAxisPoints(
  xKey: ChartAxisSelection,
  yKey: ChartAxisSelection,
  countries: readonly Country[],
): ChartPoint[] {
  const xNone = isChartAxisNone(xKey);
  const yNone = isChartAxisNone(yKey);
  if (xNone && yNone) return [];

  // Fast path: both democracy indexes — reuse the existing facts scan.
  if (!xNone && !yNone && isDemocracyAxisKey(xKey) && isDemocracyAxisKey(yKey)) {
    return democracyChartPoints(xKey, yKey).map((p) => ({
      code: p.code,
      x: p.x,
      y: p.y,
      xLabel: formatDemocracyAxisValue(xKey, p.xIndex),
      yLabel: formatDemocracyAxisValue(yKey, p.yIndex),
    }));
  }

  const byCode = new Map<string, Country>();
  for (const c of countries) byCode.set(c.code, c);

  const out: ChartPoint[] = [];
  const codes = new Set<string>([
    ...Object.keys(COUNTRY_FACTS),
    ...countries.map((c) => c.code),
  ]);
  for (const code of codes) {
    const country = byCode.get(code);
    const xv = xNone ? null : getChartAxisValue(code, xKey, country);
    const yv = yNone ? null : getChartAxisValue(code, yKey, country);
    // Two-axis: both required. One-axis: only the active metric.
    if (!xNone && !yNone) {
      if (!xv || !yv) continue;
      out.push({
        code,
        x: xv.score,
        y: yv.score,
        xLabel: xv.label,
        yLabel: yv.label,
      });
      continue;
    }
    if (!xNone) {
      if (!xv) continue;
      out.push({ code, x: xv.score, y: 0, xLabel: xv.label, yLabel: "" });
      continue;
    }
    if (!yv) continue;
    out.push({ code, x: 0, y: yv.score, xLabel: "", yLabel: yv.label });
  }
  return out;
}
