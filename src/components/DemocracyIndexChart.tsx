import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { Country } from "../api/countries";
import {
  COUNTRY_BLOCKS,
  COUNTRY_BLOCK_GROUP_ORDER,
  countryMatchesBlocks,
} from "../data/countryBlocks";
import {
  CHART_AXIS_NONE,
  CHART_METRIC_KEYS,
  type ChartAxisKey,
  type ChartAxisSelection,
  chartAxisPoints,
  chartAxisScaleValue,
  chartAxisUsesLogScale,
  encodeWvsAxisKey,
  fitChartAxisDomain,
  formatChartAxisTick,
  getChartAxisBands,
  getChartAxisDomain,
  getChartAxisLabel,
  getWvsQuestionsByTheme,
  getWvsThemes,
  isChartAxisNone,
  isWvsChartAxis,
  parseWvsAxisKey,
} from "../lib/chartAxes";
import {
  getWvsQuestion,
  wvsOlderSurveyLabel,
} from "../lib/wvsResults";
import { CONTINENT_ORDER, SUBREGION_GROUPS } from "../lib/continentGroups";
import {
  clipDemocracyAxisBands,
  democracyAxisBandSegments,
  clipTrendToDomain,
  countryMatchesIndexRatings,
  democracyIndexRatingOptions,
  democracyOlsTrend,
  getDemocracyIndexLabel,
  getDemocracyIndexMenuGroups,
} from "../lib/democracyColors";
import { normalizeForSearch } from "../lib/searchNormalize";
import { GridImage } from "./GridImage";
import { SearchableSelect, type SelectOption } from "./SearchableSelect";

export type DemocracyIndexChartProps = {
  countries: readonly Country[];
  xKey: ChartAxisSelection;
  yKey: ChartAxisSelection;
  onXKeyChange: (key: ChartAxisSelection) => void;
  onYKeyChange: (key: ChartAxisSelection) => void;
  /** Selected country code (map / dropdown / grid) — blinks on the chart. */
  selectedCode: string | null;
  /** Transient hover from the chart; parent mirrors map hover. */
  hoveredCode: string | null;
  onSelect: (code: string) => void;
  onHover: (code: string | null) => void;
};

const PAD = { top: 16, right: 18, bottom: 82, left: 74 };
const VIEW_W = 960;
const VIEW_H = 500;
const TICK_COUNT = 5;
/** Gap between categorical bars as a fraction of each slot. */
const BAR_GAP_FRAC = 0.22;

/**
 * Value-axis domain for one-axis bar/column charts: grow from the published
 * floor (usually 0) up to the data, so bar length reads as the real score.
 */
function oneAxisValueDomain(
  key: ChartAxisKey,
  scaledValues: readonly number[],
): { min: number; max: number } {
  const fitted = fitChartAxisDomain(scaledValues, key, TICK_COUNT);
  if (scaledValues.length === 0) return fitted;
  if (chartAxisUsesLogScale(key)) return fitted;
  const full = getChartAxisDomain(key);
  const floor = chartAxisScaleValue(key, full.min <= 0 ? 0 : full.min);
  return { min: Math.min(floor, fitted.min), max: fitted.max };
}

/** Select shows `wvs:Q1`; stored key is `wvs:Q1:0+1`. */
function wvsSelectValue(key: ChartAxisSelection): string {
  if (!isWvsChartAxis(key)) return key;
  const sel = parseWvsAxisKey(key);
  return sel ? `wvs:${sel.questionId}` : key;
}

function normalizeAxisPick(raw: string): ChartAxisSelection {
  if (raw === CHART_AXIS_NONE) return CHART_AXIS_NONE;
  if (raw.startsWith("wvs:") && !raw.slice(4).includes(":")) {
    const questionId = raw.slice(4);
    const q = getWvsQuestion(questionId);
    if (!q) return CHART_AXIS_NONE;
    return encodeWvsAxisKey({ questionId, answerIndexes: q.answers.length ? [0] : [] });
  }
  return raw as ChartAxisSelection;
}

function WvsAnswerChecks({
  axisLabel,
  axisKey,
  onChange,
}: {
  axisLabel: string;
  axisKey: ChartAxisSelection;
  onChange: (key: ChartAxisSelection) => void;
}) {
  const sel = parseWvsAxisKey(String(axisKey));
  const q = sel ? getWvsQuestion(sel.questionId) : undefined;
  if (!sel || !q) return null;
  const toggle = (i: number) => {
    const set = new Set(sel.answerIndexes);
    if (set.has(i)) set.delete(i);
    else set.add(i);
    onChange(
      encodeWvsAxisKey({
        questionId: sel.questionId,
        answerIndexes: [...set].sort((a, b) => a - b),
      }),
    );
  };
  return (
    <div
      className="democracy-index-chart__wvs-answers"
      role="group"
      aria-label={`${axisLabel} axis World Values Survey answers`}
    >
      {q.answers.map((label, i) => (
        <label key={`${q.id}-${i}`} className="democracy-index-chart__wvs-answer">
          <input
            type="checkbox"
            checked={sel.answerIndexes.includes(i)}
            onChange={() => toggle(i)}
          />
          <span>{label}</span>
        </label>
      ))}
    </div>
  );
}

type FilterKind = "continents" | "membership" | "indexes" | null;

/** Continent / sub-continent ids in the nested Continents menu. */
const CONTINENT_ID_PREFIX = "c:";
const SUBCONTINENT_ID_PREFIX = "s:";

function continentFilterId(continent: string): string {
  return CONTINENT_ID_PREFIX + continent;
}
function subcontinentFilterId(label: string): string {
  return SUBCONTINENT_ID_PREFIX + label;
}

/** Match a country against the nested Continents filter (OR within the set). */
function countryMatchesContinentFilter(
  country: Country,
  selected: ReadonlySet<string>,
): boolean {
  if (selected.size === 0) return false;
  if (selected.has(continentFilterId(country.continent))) return true;
  if (country.subregion && selected.has(subcontinentFilterId(country.subregion))) {
    return true;
  }
  return false;
}

function scaleLinear(
  value: number,
  domain: { min: number; max: number },
  range: { min: number; max: number },
): number {
  const t = (value - domain.min) / (domain.max - domain.min || 1);
  return range.min + t * (range.max - range.min);
}

function toggleInSet(prev: ReadonlySet<string>, value: string): Set<string> {
  const next = new Set(prev);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

type FilterOption = {
  id: string;
  label: string;
  group?: string;
  /** Indent under a continent / group heading (sub-continents). */
  nested?: boolean;
  /** Top-level continent row in the nested Continents menu. */
  continentLevel?: boolean;
};

type FilterMenuProps = {
  label: string;
  kind: Exclude<FilterKind, null>;
  openKind: FilterKind;
  onOpen: (kind: FilterKind) => void;
  selected: ReadonlySet<string>;
  options: readonly FilterOption[];
  onToggle: (id: string) => void;
  onClear: () => void;
};

function ChartFilterMenu({
  label,
  kind,
  openKind,
  onOpen,
  selected,
  options,
  onToggle,
  onClear,
}: FilterMenuProps) {
  const open = openKind === kind;
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const count = selected.size;
  const active = count > 0;

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    const focusTimer = window.setTimeout(() => searchRef.current?.focus(), 0);
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // Clear the search first; a second Escape closes the menu.
      if (searchRef.current && searchRef.current.value) {
        setQuery("");
        return;
      }
      onOpen(null);
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onOpen]);

  const visibleOptions = useMemo(() => {
    const q = normalizeForSearch(query.trim());
    if (!q) return options;
    return options.filter(
      (opt) =>
        normalizeForSearch(opt.label).includes(q) ||
        (opt.group != null && normalizeForSearch(opt.group).includes(q)),
    );
  }, [options, query]);

  const grouped = useMemo(() => {
    type Opt = FilterOption;
    const groups: { title: string | null; items: Opt[] }[] = [];
    let current: (typeof groups)[number] | null = null;
    for (const opt of visibleOptions) {
      const title = opt.group ?? null;
      if (!current || current.title !== title) {
        current = { title, items: [] };
        groups.push(current);
      }
      current.items.push(opt);
    }
    return groups;
  }, [visibleOptions]);

  return (
    <div className={`democracy-index-chart__filter democracy-index-chart__filter--${kind}`} ref={ref}>
      <button
        type="button"
        className={
          "democracy-index-chart__filter-btn" +
          (active ? " democracy-index-chart__filter-btn--active" : "") +
          (open ? " democracy-index-chart__filter-btn--open" : "")
        }
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => onOpen(open ? null : kind)}
      >
        <span className="democracy-index-chart__filter-btn-label">
          {label}
          {active ? ` · ${count}` : ""}
        </span>
        <span className="democracy-index-chart__filter-btn-chev" aria-hidden="true">
          {open ? "▴" : "▾"}
        </span>
      </button>
      {open && (
        <div
          className="democracy-index-chart__filter-popover"
          role="dialog"
          aria-label={`Filter by ${label}`}
        >
          <div className="democracy-index-chart__filter-popover-head">
            <span>Highlight any of</span>
            {active && (
              <button
                type="button"
                className="democracy-index-chart__filter-clear"
                onClick={onClear}
              >
                Clear
              </button>
            )}
          </div>
          <div className="democracy-index-chart__filter-search">
            <input
              ref={searchRef}
              type="search"
              className="democracy-index-chart__filter-search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${label.toLowerCase()}…`}
              aria-label={`Search ${label}`}
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          <div className="democracy-index-chart__filter-list">
            {grouped.length === 0 ? (
              <p className="democracy-index-chart__filter-empty">No matches</p>
            ) : (
              grouped.map((g) => (
                <div key={g.title ?? "_"} className="democracy-index-chart__filter-group">
                  {g.title && (
                    <p className="democracy-index-chart__filter-group-title">{g.title}</p>
                  )}
                  {g.items.map((opt) => {
                    const checked = selected.has(opt.id);
                    return (
                      <label
                        key={opt.id}
                        className={
                          "democracy-index-chart__filter-option" +
                          (opt.nested ? " democracy-index-chart__filter-option--nested" : "") +
                          (opt.continentLevel
                            ? " democracy-index-chart__filter-option--continent"
                            : "") +
                          (checked ? " democracy-index-chart__filter-option--on" : "")
                        }
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => onToggle(opt.id)}
                        />
                        <span>{opt.label}</span>
                      </label>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function DemocracyIndexChart({
  countries,
  xKey,
  yKey,
  onXKeyChange,
  onYKeyChange,
  selectedCode,
  hoveredCode,
  onSelect,
  onHover,
}: DemocracyIndexChartProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  // Per-instance id so two charts on one page never share a hatch <pattern>.
  const sharedHatchId = `democracy-index-chart-hatch-${useId().replace(/:/g, "")}`;
  const [tooltip, setTooltip] = useState<{
    code: string;
    name: string;
    xLabel: string;
    yLabel: string;
    left: number;
    top: number;
    below: boolean;
  } | null>(null);

  const [openFilter, setOpenFilter] = useState<FilterKind>(null);
  /** Nested continents + sub-continents (ids prefixed `c:` / `s:`). */
  const [continentFilter, setContinentFilter] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const [membershipFilter, setMembershipFilter] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const [indexFilter, setIndexFilter] = useState<ReadonlySet<string>>(() => new Set());

  const byCode = useMemo(() => {
    const m = new Map<string, Country>();
    for (const c of countries) m.set(c.code, c);
    return m;
  }, [countries]);

  /** One nested menu: each continent, then its sub-continents indented. */
  const continentOptions = useMemo(() => {
    const opts: FilterOption[] = [];
    for (const continent of CONTINENT_ORDER) {
      opts.push({
        id: continentFilterId(continent),
        label: continent,
        continentLevel: true,
      });
      for (const g of SUBREGION_GROUPS) {
        if (g.continent !== continent) continue;
        opts.push({
          id: subcontinentFilterId(g.label),
          label: g.label,
          nested: true,
        });
      }
    }
    return opts;
  }, []);

  const membershipOptions = useMemo(() => {
    const opts: FilterOption[] = [];
    for (const group of COUNTRY_BLOCK_GROUP_ORDER) {
      for (const b of COUNTRY_BLOCKS) {
        if (b.group !== group) continue;
        opts.push({ id: b.id, label: b.label, group });
      }
    }
    return opts;
  }, []);

  const indexOptions = useMemo(() => {
    const opts = democracyIndexRatingOptions();
    return opts.map((o) => ({
      id: o.id,
      label: o.rating,
      group: getDemocracyIndexLabel(o.key),
    }));
  }, []);

  const axisOptions: SelectOption[] = useMemo(() => {
    const opts: SelectOption[] = [
      { value: CHART_AXIS_NONE, label: "None" },
    ];
    for (const group of getDemocracyIndexMenuGroups()) {
      for (const meta of group.indexes) {
        opts.push({
          value: meta.key,
          label: getDemocracyIndexLabel(meta.key),
          secondaryLabel: group.theme.label,
        });
      }
    }
    for (const key of CHART_METRIC_KEYS) {
      opts.push({
        value: key,
        label: getChartAxisLabel(key),
        secondaryLabel: "Country metrics",
      });
    }
    for (const theme of getWvsThemes()) {
      const qs = getWvsQuestionsByTheme(theme.id);
      for (const q of qs) {
        opts.push({
          value: `wvs:${q.id}`,
          label: `${q.id}: ${q.title}`,
          secondaryLabel: `WVS — ${theme.label}`,
        });
      }
    }
    return opts;
  }, []);

  const plot = {
    x0: PAD.left,
    x1: VIEW_W - PAD.right,
    y0: PAD.top,
    y1: VIEW_H - PAD.bottom,
  };

  // Raw scored pairs first — domains fit THESE values, not the full published
  // scale (so a Gender Gap cluster above 0.5 does not leave half the chart empty).
  const xNone = isChartAxisNone(xKey);
  const yNone = isChartAxisNone(yKey);
  const bothAxes = !xNone && !yNone;
  const noAxes = xNone && yNone;
  const activeXKey = xNone ? null : xKey;
  const activeYKey = yNone ? null : yKey;

  const rawPoints = useMemo(
    () => chartAxisPoints(xKey, yKey, countries).filter((p) => byCode.has(p.code)),
    [xKey, yKey, countries, byCode],
  );

  const xDomain = useMemo(() => {
    // Y-only column chart: X is categorical (countries), no metric domain.
    if (!activeXKey) return { min: 0, max: 1 };
    const scaled = rawPoints.map((p) => chartAxisScaleValue(activeXKey, p.x));
    // X-only bar chart: value domain from floor → data.
    if (!activeYKey) return oneAxisValueDomain(activeXKey, scaled);
    return fitChartAxisDomain(scaled, activeXKey, TICK_COUNT);
  }, [rawPoints, activeXKey, activeYKey]);
  const yDomain = useMemo(() => {
    // X-only bar chart: Y is categorical (countries), no metric domain.
    if (!activeYKey) return { min: 0, max: 1 };
    const scaled = rawPoints.map((p) => chartAxisScaleValue(activeYKey, p.y));
    // Y-only column chart: value domain from floor → data.
    if (!activeXKey) return oneAxisValueDomain(activeYKey, scaled);
    return fitChartAxisDomain(scaled, activeYKey, TICK_COUNT);
  }, [rawPoints, activeXKey, activeYKey]);

  // Classification bands only on the scatter (two-axis) view. Drawn as
  // segments so a zone two categories share (V-Dem, Freedom House) is labelled
  // with both, and every country sits inside a band naming its own category.
  const xBands = useMemo(() => {
    if (!activeXKey || !activeYKey) return [];
    return democracyAxisBandSegments(
      clipDemocracyAxisBands(getChartAxisBands(activeXKey), xDomain),
    );
  }, [activeXKey, activeYKey, xDomain]);
  const yBands = useMemo(() => {
    if (!activeXKey || !activeYKey) return [];
    return democracyAxisBandSegments(
      clipDemocracyAxisBands(getChartAxisBands(activeYKey), yDomain),
    );
  }, [activeXKey, activeYKey, yDomain]);

  /** X=None → vertical columns (value on Y). Y=None → horizontal bars (value on X). */
  const columnMode = Boolean(activeYKey && !activeXKey);
  const barMode = Boolean(activeXKey && !activeYKey);
  const oneAxisMode = columnMode || barMode;

  const points = useMemo((): {
    code: string;
    x: number;
    y: number;
    xLabel: string;
    yLabel: string;
    country: Country;
    cx: number;
    cy: number;
    bar?: { x: number; y: number; width: number; height: number };
  }[] => {
    type BarGeom = { x: number; y: number; width: number; height: number };
    type LaidOut = {
      code: string;
      x: number;
      y: number;
      xLabel: string;
      yLabel: string;
      country: Country;
      cx: number;
      cy: number;
      bar?: BarGeom;
    };

    if (activeXKey && activeYKey) {
      return rawPoints.map((p): LaidOut => {
        const country = byCode.get(p.code)!;
        return {
          ...p,
          country,
          cx: scaleLinear(chartAxisScaleValue(activeXKey, p.x), xDomain, {
            min: plot.x0,
            max: plot.x1,
          }),
          cy: scaleLinear(chartAxisScaleValue(activeYKey, p.y), yDomain, {
            min: plot.y1,
            max: plot.y0,
          }),
        };
      });
    }

    // One-axis: categorical bar/column chart — bar length = metric value,
    // countries are ordered slots on the unused axis (sorted high → low).
    const out: LaidOut[] = [];
    if (columnMode && activeYKey) {
      const sorted = [...rawPoints].sort((a, b) => b.y - a.y || a.code.localeCompare(b.code));
      const n = sorted.length;
      const slot = n > 0 ? (plot.x1 - plot.x0) / n : 0;
      const gap = slot * BAR_GAP_FRAC;
      const barW = Math.max(1, slot - gap);
      const baseline = scaleLinear(yDomain.min, yDomain, {
        min: plot.y1,
        max: plot.y0,
      });
      sorted.forEach((p, i) => {
        const tip = scaleLinear(chartAxisScaleValue(activeYKey, p.y), yDomain, {
          min: plot.y1,
          max: plot.y0,
        });
        const x = plot.x0 + i * slot + gap / 2;
        const y = Math.min(tip, baseline);
        const height = Math.abs(baseline - tip);
        out.push({
          code: p.code,
          x: p.x,
          y: p.y,
          xLabel: p.xLabel,
          yLabel: p.yLabel,
          country: byCode.get(p.code)!,
          cx: x + barW / 2,
          cy: tip,
          bar: { x, y, width: barW, height },
        });
      });
      return out;
    }

    if (barMode && activeXKey) {
      const sorted = [...rawPoints].sort((a, b) => b.x - a.x || a.code.localeCompare(b.code));
      const n = sorted.length;
      const slot = n > 0 ? (plot.y1 - plot.y0) / n : 0;
      const gap = slot * BAR_GAP_FRAC;
      const barH = Math.max(1, slot - gap);
      const baseline = scaleLinear(xDomain.min, xDomain, {
        min: plot.x0,
        max: plot.x1,
      });
      sorted.forEach((p, i) => {
        const tip = scaleLinear(chartAxisScaleValue(activeXKey, p.x), xDomain, {
          min: plot.x0,
          max: plot.x1,
        });
        const y = plot.y0 + i * slot + gap / 2;
        const x = Math.min(tip, baseline);
        const width = Math.abs(tip - baseline);
        out.push({
          code: p.code,
          x: p.x,
          y: p.y,
          xLabel: p.xLabel,
          yLabel: p.yLabel,
          country: byCode.get(p.code)!,
          cx: tip,
          cy: y + barH / 2,
          bar: { x, y, width, height: barH },
        });
      });
      return out;
    }

    return out;
  }, [
    rawPoints,
    byCode,
    activeXKey,
    activeYKey,
    columnMode,
    barMode,
    xDomain,
    yDomain,
    plot.x0,
    plot.x1,
    plot.y0,
    plot.y1,
  ]);

  const filtersActive =
    continentFilter.size > 0 || membershipFilter.size > 0 || indexFilter.size > 0;

  /** Selected filter options as removable pills — always visible below the menus. */
  const activeFilterPills = useMemo(() => {
    type Pill = {
      id: string;
      label: string;
      kind: Exclude<FilterKind, null>;
    };
    const pills: Pill[] = [];
    for (const opt of continentOptions) {
      if (!continentFilter.has(opt.id)) continue;
      pills.push({ id: opt.id, label: opt.label, kind: "continents" });
    }
    for (const opt of membershipOptions) {
      if (!membershipFilter.has(opt.id)) continue;
      pills.push({ id: opt.id, label: opt.label, kind: "membership" });
    }
    for (const opt of indexOptions) {
      if (!indexFilter.has(opt.id)) continue;
      // Index ratings share names across indexes ("Free", "High") — qualify them.
      const label = opt.group ? `${opt.group} · ${opt.label}` : opt.label;
      pills.push({ id: opt.id, label, kind: "indexes" });
    }
    return pills;
  }, [
    continentOptions,
    membershipOptions,
    indexOptions,
    continentFilter,
    membershipFilter,
    indexFilter,
  ]);

  const removeFilterPill = (kind: Exclude<FilterKind, null>, id: string) => {
    if (kind === "continents") {
      setContinentFilter((prev) => toggleInSet(prev, id));
    } else if (kind === "membership") {
      setMembershipFilter((prev) => toggleInSet(prev, id));
    } else {
      setIndexFilter((prev) => toggleInSet(prev, id));
    }
  };

  const clearAllFilters = () => {
    setContinentFilter(new Set());
    setMembershipFilter(new Set());
    setIndexFilter(new Set());
  };

  /**
   * Filters are additive (OR) across menus and within each menu.
   * e.g. Africa + ASEAN highlights every African country OR every ASEAN member.
   * An empty menu contributes nothing (does not constrain the others).
   */
  const highlightedCodes = useMemo(() => {
    if (!filtersActive) return null;
    const set = new Set<string>();
    for (const p of points) {
      const c = p.country;
      const matchContinent = countryMatchesContinentFilter(c, continentFilter);
      const matchMembership = countryMatchesBlocks(p.code, membershipFilter);
      const matchIndex =
        indexFilter.size > 0 && countryMatchesIndexRatings(p.code, indexFilter);
      if (matchContinent || matchMembership || matchIndex) set.add(p.code);
    }
    return set;
  }, [filtersActive, points, continentFilter, membershipFilter, indexFilter]);

  const trend = useMemo(() => {
    // OLS needs two scored axes; skip on one-axis strips.
    if (!activeXKey || !activeYKey) return null;
    // OLS on the same scale the markers use (log for population/GDP/…).
    return democracyOlsTrend(
      rawPoints.map((p) => ({
        x: chartAxisScaleValue(activeXKey, p.x),
        y: chartAxisScaleValue(activeYKey, p.y),
      })),
    );
  }, [rawPoints, activeXKey, activeYKey]);
  const trendSegment = useMemo(() => {
    if (!trend) return null;
    const clipped = clipTrendToDomain(trend, xDomain, yDomain);
    if (!clipped) return null;
    return {
      x1: scaleLinear(clipped.x0, xDomain, { min: plot.x0, max: plot.x1 }),
      y1: scaleLinear(clipped.y0, yDomain, { min: plot.y1, max: plot.y0 }),
      x2: scaleLinear(clipped.x1, xDomain, { min: plot.x0, max: plot.x1 }),
      y2: scaleLinear(clipped.y1, yDomain, { min: plot.y1, max: plot.y0 }),
      r2: trend.r2,
      n: trend.n,
    };
  }, [trend, xDomain, yDomain, plot.x0, plot.x1, plot.y0, plot.y1]);

  const xTicks = useMemo(() => {
    if (!activeXKey) return [];
    const ticks: { value: number; x: number }[] = [];
    const span = xDomain.max - xDomain.min;
    for (let i = 0; i <= TICK_COUNT; i++) {
      const value = xDomain.min + (span * i) / TICK_COUNT;
      ticks.push({
        value,
        x: scaleLinear(value, xDomain, { min: plot.x0, max: plot.x1 }),
      });
    }
    return ticks;
  }, [xDomain, plot.x0, plot.x1, activeXKey]);

  const yTicks = useMemo(() => {
    if (!activeYKey) return [];
    const ticks: { value: number; y: number }[] = [];
    const span = yDomain.max - yDomain.min;
    for (let i = 0; i <= TICK_COUNT; i++) {
      const value = yDomain.min + (span * i) / TICK_COUNT;
      ticks.push({
        value,
        y: scaleLinear(value, yDomain, { min: plot.y1, max: plot.y0 }),
      });
    }
    return ticks;
  }, [yDomain, plot.y0, plot.y1, activeYKey]);

  const chartAriaLabel = noAxes
    ? "Democracy index chart — no axis selected"
    : bothAxes && activeXKey && activeYKey
      ? `${getChartAxisLabel(activeYKey)} versus ${getChartAxisLabel(activeXKey)}`
      : activeYKey
        ? getChartAxisLabel(activeYKey)
        : getChartAxisLabel(activeXKey!);

  const activeCode = hoveredCode ?? selectedCode;

  const showTipFor = (code: string, cx: number, cy: number) => {
    const pt = points.find((p) => p.code === code);
    const country = byCode.get(code);
    if (!pt || !country || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const left = (cx / VIEW_W) * rect.width;
    const top = (cy / VIEW_H) * rect.height;
    // A WVS axis may mix in an older survey (South Africa 2013) — date it.
    const olderWvs =
      isWvsChartAxis(activeXKey ?? "") || isWvsChartAxis(activeYKey ?? "")
        ? wvsOlderSurveyLabel(code)
        : null;
    setTooltip({
      code,
      name: olderWvs ? `${country.name} (WVS ${olderWvs})` : country.name,
      xLabel: pt.xLabel,
      yLabel: pt.yLabel,
      left,
      top,
      // Top-third markers flip the tip below so it stays legible.
      below: cy < VIEW_H * 0.28,
    });
  };

  const clearTip = () => setTooltip(null);

  return (
    <section
      className={
        "democracy-index-chart" +
        (oneAxisMode ? " democracy-index-chart--one-axis" : "") +
        (columnMode ? " democracy-index-chart--columns" : "") +
        (barMode ? " democracy-index-chart--bars" : "")
      }
      aria-label="Democracy index chart"
    >
      <div className="democracy-index-chart__axes">
        <div className="democracy-index-chart__axis-pick">
          <span className="democracy-index-chart__axis-pick-label">X axis</span>
          <SearchableSelect
            value={wvsSelectValue(xKey)}
            options={axisOptions}
            onChange={(raw) => onXKeyChange(normalizeAxisPick(raw))}
            ariaLabel="Chart X axis"
            triggerClassName="democracy-index-chart__select"
            popoverWidth={340}
          />
          {isWvsChartAxis(xKey) && (
            <WvsAnswerChecks
              axisLabel="X"
              axisKey={xKey}
              onChange={onXKeyChange}
            />
          )}
        </div>
        <div className="democracy-index-chart__axis-pick">
          <span className="democracy-index-chart__axis-pick-label">Y axis</span>
          <SearchableSelect
            value={wvsSelectValue(yKey)}
            options={axisOptions}
            onChange={(raw) => onYKeyChange(normalizeAxisPick(raw))}
            ariaLabel="Chart Y axis"
            triggerClassName="democracy-index-chart__select"
            popoverWidth={340}
          />
          {isWvsChartAxis(yKey) && (
            <WvsAnswerChecks
              axisLabel="Y"
              axisKey={yKey}
              onChange={onYKeyChange}
            />
          )}
        </div>

        <div className="democracy-index-chart__filters" role="group" aria-label="Highlight countries">
          <ChartFilterMenu
            label="Continents"
            kind="continents"
            openKind={openFilter}
            onOpen={setOpenFilter}
            selected={continentFilter}
            options={continentOptions}
            onToggle={(id) => setContinentFilter((prev) => toggleInSet(prev, id))}
            onClear={() => setContinentFilter(new Set())}
          />
          <ChartFilterMenu
            label="Membership"
            kind="membership"
            openKind={openFilter}
            onOpen={setOpenFilter}
            selected={membershipFilter}
            options={membershipOptions}
            onToggle={(id) => setMembershipFilter((prev) => toggleInSet(prev, id))}
            onClear={() => setMembershipFilter(new Set())}
          />
          <ChartFilterMenu
            label="Indexes"
            kind="indexes"
            openKind={openFilter}
            onOpen={setOpenFilter}
            selected={indexFilter}
            options={indexOptions}
            onToggle={(id) => setIndexFilter((prev) => toggleInSet(prev, id))}
            onClear={() => setIndexFilter(new Set())}
          />
        </div>

        {trendSegment && (
          <p className="democracy-index-chart__trend-note" title="Ordinary least squares linear fit of Y on X across plotted countries">
            Trend: linear (OLS) · R² = {trendSegment.r2.toFixed(2)} · n = {trendSegment.n}
          </p>
        )}
      </div>

      {activeFilterPills.length > 0 && (
        <div
          className="democracy-index-chart__active-filters"
          role="group"
          aria-label="Active highlight filters"
        >
          {activeFilterPills.map((pill) => (
            <button
              key={`${pill.kind}:${pill.id}`}
              type="button"
              className={`democracy-index-chart__active-filter democracy-index-chart__active-filter--${pill.kind}`}
              onClick={() => removeFilterPill(pill.kind, pill.id)}
              aria-label={`Remove filter ${pill.label}`}
              title={`Remove ${pill.label}`}
            >
              <span className="democracy-index-chart__active-filter-label">
                {pill.label}
              </span>
              <span className="democracy-index-chart__active-filter-x" aria-hidden="true">
                ×
              </span>
            </button>
          ))}
          {activeFilterPills.length > 1 && (
            <button
              type="button"
              className="democracy-index-chart__active-filters-clear"
              onClick={clearAllFilters}
            >
              Clear all
            </button>
          )}
        </div>
      )}

      <div className="democracy-index-chart__frame" ref={frameRef}>
        {noAxes ? (
          <p className="democracy-index-chart__empty" role="status">
            Choose at least one axis to plot countries.
          </p>
        ) : (
        <>
        <svg
          className="democracy-index-chart__svg"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={chartAriaLabel}
        >
          <defs>
            <pattern
              id={sharedHatchId}
              width={8}
              height={8}
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line x1={0} y1={0} x2={0} y2={8} className="democracy-index-chart__shared-hatch-line" />
            </pattern>
          </defs>

          {/* Plot background */}
          <rect
            x={plot.x0}
            y={plot.y0}
            width={plot.x1 - plot.x0}
            height={plot.y1 - plot.y0}
            className="democracy-index-chart__plot-bg"
          />

          {/* Soft classification bands (X) */}
          {xBands.map((band, i) => {
            const x0 = scaleLinear(band.min, xDomain, { min: plot.x0, max: plot.x1 });
            const x1 = scaleLinear(band.max, xDomain, { min: plot.x0, max: plot.x1 });
            return (
              <rect
                key={`xb-${i}-${band.label}`}
                fill={band.categories.length > 1 ? `url(#${sharedHatchId})` : undefined}
                x={x0}
                y={plot.y0}
                width={Math.max(0, x1 - x0)}
                height={plot.y1 - plot.y0}
                className={
                  band.categories.length > 1
                    ? "democracy-index-chart__band democracy-index-chart__band--shared"
                    : i % 2 === 0
                      ? "democracy-index-chart__band democracy-index-chart__band--even"
                      : "democracy-index-chart__band democracy-index-chart__band--odd"
                }
              />
            );
          })}

          {/* Soft classification bands (Y) — drawn as horizontal strips */}
          {yBands.map((band, i) => {
            const yHi = scaleLinear(band.max, yDomain, { min: plot.y1, max: plot.y0 });
            const yLo = scaleLinear(band.min, yDomain, { min: plot.y1, max: plot.y0 });
            return (
              <rect
                key={`yb-${i}-${band.label}`}
                fill={band.categories.length > 1 ? `url(#${sharedHatchId})` : undefined}
                x={plot.x0}
                y={yHi}
                width={plot.x1 - plot.x0}
                height={Math.max(0, yLo - yHi)}
                className={
                  band.categories.length > 1
                    ? "democracy-index-chart__band-y democracy-index-chart__band-y--shared"
                    : i % 2 === 0
                      ? "democracy-index-chart__band-y democracy-index-chart__band-y--even"
                      : "democracy-index-chart__band-y democracy-index-chart__band-y--odd"
                }
              />
            );
          })}

          {/* Grid + numeric ticks */}
          {xTicks.map((t) => (
            <g key={`xt-${t.value}`}>
              <line
                x1={t.x}
                y1={plot.y0}
                x2={t.x}
                y2={plot.y1}
                className="democracy-index-chart__grid"
              />
              <text
                x={t.x}
                y={plot.y1 + 14}
                textAnchor="middle"
                className="democracy-index-chart__tick"
              >
                {formatChartAxisTick(activeXKey!, t.value)}
              </text>
            </g>
          ))}
          {yTicks.map((t) => (
            <g key={`yt-${t.value}`}>
              <line
                x1={plot.x0}
                y1={t.y}
                x2={plot.x1}
                y2={t.y}
                className="democracy-index-chart__grid"
              />
              <text
                x={plot.x0 - 8}
                y={t.y + 4}
                textAnchor="end"
                className="democracy-index-chart__tick"
              >
                {formatChartAxisTick(activeYKey!, t.value)}
              </text>
            </g>
          ))}

          {/* Classification labels along X — skip bands too narrow for text. */}
          {xBands.map((band, i) => {
            const x0 = scaleLinear(band.min, xDomain, { min: plot.x0, max: plot.x1 });
            const x1 = scaleLinear(band.max, xDomain, { min: plot.x0, max: plot.x1 });
            if (x1 - x0 < 36) return null;
            const x = (x0 + x1) / 2;
            return (
              <text
                key={`xl-${i}-${band.label}`}
                x={x}
                y={plot.y1 + 36}
                textAnchor="middle"
                className="democracy-index-chart__band-label"
              >
                {band.label}
              </text>
            );
          })}

          {/* Classification labels along Y — horizontal, inside the plot,
              only when the band is tall enough that the label fits. */}
          {yBands.map((band, i) => {
            const yHi = scaleLinear(band.max, yDomain, { min: plot.y1, max: plot.y0 });
            const yLo = scaleLinear(band.min, yDomain, { min: plot.y1, max: plot.y0 });
            const bandH = yLo - yHi;
            if (bandH < 22) return null;
            const y = (yHi + yLo) / 2;
            return (
              <text
                key={`yl-${i}-${band.label}`}
                x={plot.x0 + 8}
                y={y + 4}
                textAnchor="start"
                className="democracy-index-chart__band-label democracy-index-chart__band-label--y"
              >
                {band.label}
              </text>
            );
          })}

          {/* Value bars — one-axis column/bar charts only */}
          {oneAxisMode &&
            points.map((p) => {
              if (!p.bar) return null;
              const isSelected = selectedCode === p.code;
              const isActive = activeCode === p.code;
              const dimmed =
                highlightedCodes !== null &&
                !highlightedCodes.has(p.code) &&
                !isSelected &&
                !isActive;
              return (
                <rect
                  key={`bar-${p.code}`}
                  x={p.bar.x}
                  y={p.bar.y}
                  width={p.bar.width}
                  height={p.bar.height}
                  className={
                    "democracy-index-chart__bar" +
                    (isSelected ? " democracy-index-chart__bar--selected" : "") +
                    (isActive ? " democracy-index-chart__bar--active" : "") +
                    (dimmed ? " democracy-index-chart__bar--dimmed" : "")
                  }
                  pointerEvents="none"
                />
              );
            })}

          {/* Axes — value axis always; category baseline for one-axis charts. */}
          {(activeXKey || columnMode) && (
            <line
              x1={plot.x0}
              y1={plot.y1}
              x2={plot.x1}
              y2={plot.y1}
              className="democracy-index-chart__axis"
            />
          )}
          {(activeYKey || barMode) && (
            <line
              x1={plot.x0}
              y1={plot.y0}
              x2={plot.x0}
              y2={plot.y1}
              className="democracy-index-chart__axis"
            />
          )}

          {/* Axis titles — value axis only in one-axis mode. */}
          {activeXKey && (
            <text
              x={(plot.x0 + plot.x1) / 2}
              y={VIEW_H - 14}
              textAnchor="middle"
              className="democracy-index-chart__axis-title"
            >
              {getChartAxisLabel(activeXKey)}
            </text>
          )}
          {activeYKey && (
            <text
              x={16}
              y={(plot.y0 + plot.y1) / 2}
              textAnchor="middle"
              transform={`rotate(-90 16 ${(plot.y0 + plot.y1) / 2})`}
              className="democracy-index-chart__axis-title democracy-index-chart__axis-title--y"
            >
              {getChartAxisLabel(activeYKey)}
            </text>
          )}

          {/* OLS linear trend — under flags, above bands/grid */}
          {trendSegment && (
            <line
              x1={trendSegment.x1}
              y1={trendSegment.y1}
              x2={trendSegment.x2}
              y2={trendSegment.y2}
              className="democracy-index-chart__trend"
              pointerEvents="none"
            />
          )}
        </svg>

        {/* Flag markers — tip of each bar in one-axis mode; scatter otherwise */}
        <div className="democracy-index-chart__markers" aria-hidden={false}>
          {points.map((p) => {
            const isSelected = selectedCode === p.code;
            const isActive = activeCode === p.code;
            const dimmed =
              highlightedCodes !== null &&
              !highlightedCodes.has(p.code) &&
              !isSelected &&
              !isActive;
            const markerAria = bothAxes
              ? `${p.country.name}: X ${p.xLabel}, Y ${p.yLabel}`
              : activeXKey
                ? `${p.country.name}: ${p.xLabel}`
                : `${p.country.name}: ${p.yLabel}`;
            return (
              <button
                key={p.code}
                type="button"
                className={
                  "democracy-index-chart__marker" +
                  (oneAxisMode ? " democracy-index-chart__marker--bar-tip" : "") +
                  (isSelected ? " democracy-index-chart__marker--selected" : "") +
                  (isActive ? " democracy-index-chart__marker--active" : "") +
                  (dimmed ? " democracy-index-chart__marker--dimmed" : "")
                }
                style={{
                  left: `${(p.cx / VIEW_W) * 100}%`,
                  top: `${(p.cy / VIEW_H) * 100}%`,
                  zIndex: isActive || isSelected ? 3 : dimmed ? 0 : 2,
                }}
                aria-label={markerAria}
                aria-pressed={isSelected}
                onClick={() => onSelect(p.code)}
                onMouseEnter={() => {
                  onHover(p.code);
                  showTipFor(p.code, p.cx, p.cy);
                }}
                onMouseLeave={() => {
                  onHover(null);
                  clearTip();
                }}
                onFocus={() => {
                  onHover(p.code);
                  showTipFor(p.code, p.cx, p.cy);
                }}
                onBlur={() => {
                  onHover(null);
                  clearTip();
                }}
              >
                {isSelected && (
                  <span className="democracy-index-chart__pulse" aria-hidden="true">
                    <span className="democracy-index-chart__pulse-ring" />
                    <span className="democracy-index-chart__pulse-ring democracy-index-chart__pulse-ring--2" />
                  </span>
                )}
                <span className="democracy-index-chart__flag">
                  <GridImage
                    key={p.country.flagSvg}
                    src={p.country.flagSvg}
                    alt=""
                    className="democracy-index-chart__flag-img"
                  />
                </span>
              </button>
            );
          })}
        </div>

        {tooltip && (
          <div
            className={
              "democracy-index-chart__tooltip" +
              (tooltip.below ? " democracy-index-chart__tooltip--below" : "")
            }
            style={{
              left: tooltip.left,
              top: tooltip.top,
            }}
            role="tooltip"
          >
            <strong className="democracy-index-chart__tooltip-name">{tooltip.name}</strong>
            {activeXKey && (
              <span className="democracy-index-chart__tooltip-row">
                {bothAxes && (
                  <span className="democracy-index-chart__tooltip-axis">X</span>
                )}
                {getChartAxisLabel(activeXKey)}: {tooltip.xLabel}
              </span>
            )}
            {activeYKey && (
              <span className="democracy-index-chart__tooltip-row">
                {bothAxes && (
                  <span className="democracy-index-chart__tooltip-axis">Y</span>
                )}
                {getChartAxisLabel(activeYKey)}: {tooltip.yLabel}
              </span>
            )}
          </div>
        )}
        </>
        )}
      </div>
    </section>
  );
}
