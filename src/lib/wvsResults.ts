/**
 * World Values Survey Wave 7 results — query helpers for the Learn-mode map,
 * chart axes, and country widget. Figures come only from the generated
 * `wvsResults.json` (PDF extract); nothing is invented here.
 */
import raw from "../data/wvsResults.json";
import {
  WVS_RESULTS_SOURCE,
  WVS_THEME_ORDER,
  type WvsThemeId,
} from "../data/wvsResultsMeta";
import {
  INDEX_MAP_PALETTE,
} from "./democracyColors";

export type WvsAnswerPct = number | null;

export type WvsQuestion = {
  id: string;
  title: string;
  prompt: string;
  theme: string;
  answers: string[];
  /** ISO alpha-2 (or GB-NIR) → percentages parallel to `answers`. */
  values: Record<string, WvsAnswerPct[]>;
};

export type WvsSociety = {
  name: string;
  year: number | null;
  wave: number;
  /** Present when figures come from Joint EVS/WVS (France) rather than Wave 7. */
  source?: string;
  note?: string;
};

export type WvsTheme = { id: string; label: string };

type WvsPayload = {
  source: typeof WVS_RESULTS_SOURCE;
  themes: WvsTheme[];
  societies: Record<string, WvsSociety>;
  questions: WvsQuestion[];
};

const DATA = raw as unknown as WvsPayload;

export { WVS_RESULTS_SOURCE, WVS_THEME_ORDER };
export type { WvsThemeId };

export const WVS_WAVE_YEAR_LABEL = WVS_RESULTS_SOURCE.wave_years_label;
export const WVS_PUBLISHER = WVS_RESULTS_SOURCE.publisher;

/** A question plus one or more answer columns to sum (map / chart selection). */
export type WvsSelection = {
  questionId: string;
  /** Indexes into `question.answers` / `values[code]`. */
  answerIndexes: number[];
};

/** Accept map mode objects that also carry `kind: "wvs"`. */
export type WvsSelectionLike = WvsSelection & { kind?: "wvs" };

const questionById = new Map<string, WvsQuestion>();
for (const q of DATA.questions) questionById.set(q.id, q);

const themeLabelById = new Map<string, string>();
for (const t of DATA.themes) themeLabelById.set(t.id, t.label);

export function getWvsThemes(): readonly WvsTheme[] {
  // Preserve generator order (THEME_DEFS + other), drop empty themes.
  const counts = new Map<string, number>();
  for (const q of DATA.questions) {
    counts.set(q.theme, (counts.get(q.theme) || 0) + 1);
  }
  return DATA.themes.filter((t) => (counts.get(t.id) || 0) > 0);
}

export function getWvsQuestionsByTheme(themeId: string): WvsQuestion[] {
  return DATA.questions.filter((q) => q.theme === themeId);
}

export function getWvsQuestion(id: string): WvsQuestion | undefined {
  return questionById.get(id);
}

export function getWvsSociety(code: string): WvsSociety | undefined {
  return DATA.societies[code];
}

export function getAllWvsSocieties(): Readonly<Record<string, WvsSociety>> {
  return DATA.societies;
}

export function getAllWvsQuestions(): readonly WvsQuestion[] {
  return DATA.questions;
}

/**
 * Label form shared with indexes: `{name}, {year} ({publisher})`.
 * Name is the question title (plus selected answers when provided).
 */
export function formatWvsSelectionLabel(sel: WvsSelectionLike | null | undefined): string | null {
  if (!sel) return null;
  const q = questionById.get(sel.questionId);
  if (!q) return null;
  const answers = sel.answerIndexes
    .map((i) => q.answers[i])
    .filter((a): a is string => typeof a === "string" && a.length > 0);
  const name =
    answers.length === 0
      ? q.title
      : answers.length === 1
        ? `${q.title} — ${answers[0]}`
        : `${q.title} — ${answers.join(" + ")}`;
  return `${name}, ${WVS_WAVE_YEAR_LABEL} (${WVS_PUBLISHER})`;
}

/** Short legend / chart tick label for a selection. */
export function formatWvsSelectionShort(sel: WvsSelection): string {
  const q = questionById.get(sel.questionId);
  if (!q) return sel.questionId;
  const answers = sel.answerIndexes
    .map((i) => q.answers[i])
    .filter((a): a is string => typeof a === "string" && a.length > 0);
  if (answers.length === 0) return q.title;
  if (answers.length === 1) return `${q.title}: ${answers[0]}`;
  return `${q.title}: ${answers.join(" + ")}`;
}

/**
 * Sum selected answer percentages for one society. Returns null when the
 * society has no row, or every selected cell is null/missing.
 */
export function sumWvsAnswers(
  code: string,
  sel: WvsSelectionLike,
): number | null {
  if (!sel.answerIndexes.length) return null;
  const q = questionById.get(sel.questionId);
  if (!q) return null;
  const row = q.values[code];
  if (!row) return null;
  let sum = 0;
  let any = false;
  for (const i of sel.answerIndexes) {
    const v = row[i];
    if (typeof v === "number" && Number.isFinite(v)) {
      sum += v;
      any = true;
    }
  }
  return any ? round1(sum) : null;
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export type WvsCountryValue = {
  code: string;
  value: number;
};

/** Observed sums across all societies that have data for this selection. */
export function collectWvsValues(sel: WvsSelectionLike): WvsCountryValue[] {
  if (!sel.answerIndexes.length) return [];
  const q = questionById.get(sel.questionId);
  if (!q) return [];
  const out: WvsCountryValue[] = [];
  for (const code of Object.keys(q.values)) {
    // World map tiles use GB; Northern Ireland is survey-only.
    if (code === "GB-NIR") continue;
    const v = sumWvsAnswers(code, sel);
    if (v != null) out.push({ code, value: v });
  }
  return out;
}

export type WvsValueRange = { min: number; max: number };

export function wvsObservedRange(values: readonly WvsCountryValue[]): WvsValueRange | null {
  if (!values.length) return null;
  let min = Infinity;
  let max = -Infinity;
  for (const { value } of values) {
    if (value < min) min = value;
    if (value > max) max = value;
  }
  if (!Number.isFinite(min) || !Number.isFinite(max)) return null;
  return { min, max };
}

/**
 * Continuous sample of INDEX_MAP_PALETTE. `t` is 0 (high / green end) → 1
 * (low / red end). Values outside 0–1 are clamped.
 */
export function indexMapPaletteContinuous(t: number): string {
  const palette = INDEX_MAP_PALETTE as readonly string[];
  const n = palette.length;
  if (n === 0) return "#888888";
  const clamped = Math.min(1, Math.max(0, t));
  if (n === 1) return palette[0]!;
  const pos = clamped * (n - 1);
  const i0 = Math.floor(pos);
  const i1 = Math.min(n - 1, i0 + 1);
  const f = pos - i0;
  if (f < 1e-9) return palette[i0]!;
  return lerpHex(palette[i0]!, palette[i1]!, f);
}

function lerpHex(a: string, b: string, t: number): string {
  const pa = parseHex(a);
  const pb = parseHex(b);
  const r = Math.round(pa.r + (pb.r - pa.r) * t);
  const g = Math.round(pa.g + (pb.g - pa.g) * t);
  const bl = Math.round(pa.b + (pb.b - pa.b) * t);
  return `#${toByte(r)}${toByte(g)}${toByte(bl)}`;
}

function parseHex(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function toByte(n: number): string {
  return Math.max(0, Math.min(255, n)).toString(16).padStart(2, "0");
}

/**
 * Map colour overlay for a WVS selection. Higher observed sum → green end of
 * INDEX_MAP_PALETTE; lower → red. Missing societies are omitted (default land).
 * When every country shares the same sum, they all get the mid palette stop.
 */
export function getWvsColorOverlay(sel: WvsSelectionLike | null): Map<string, string> | null {
  if (!sel || !sel.answerIndexes.length) return null;
  const values = collectWvsValues(sel);
  if (!values.length) return null;
  const range = wvsObservedRange(values);
  if (!range) return null;
  const { min, max } = range;
  const span = max - min;
  const overlay = new Map<string, string>();
  for (const { code, value } of values) {
    const t = span < 1e-9 ? 0.5 : (max - value) / span;
    overlay.set(code, indexMapPaletteContinuous(t));
  }
  return overlay;
}

export type WvsLegendStop = { color: string; label: string };

/** Continuous legend stops for the observed min–max range (high → low). */
export function getWvsLegendStops(sel: WvsSelectionLike | null): WvsLegendStop[] {
  if (!sel || !sel.answerIndexes.length) return [];
  const values = collectWvsValues(sel);
  const range = wvsObservedRange(values);
  if (!range) return [];
  const { min, max } = range;
  if (Math.abs(max - min) < 1e-9) {
    return [{ color: indexMapPaletteContinuous(0.5), label: `${formatPct(max)}%` }];
  }
  const stops = 5;
  const out: WvsLegendStop[] = [];
  for (let i = 0; i < stops; i++) {
    const t = i / (stops - 1); // 0 = high/green … 1 = low/red
    const value = max - t * (max - min);
    out.push({
      color: indexMapPaletteContinuous(t),
      label: `${formatPct(value)}%`,
    });
  }
  return out;
}

function formatPct(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

/** Encode a selection for chart axis keys: `wvs:Q1:0+1`. */
export function encodeWvsAxisKey(sel: WvsSelection): string {
  const idxs = [...new Set(sel.answerIndexes)].filter((i) => i >= 0).sort((a, b) => a - b);
  return `wvs:${sel.questionId}:${idxs.join("+")}`;
}

export function isWvsAxisKey(key: string): boolean {
  return key.startsWith("wvs:");
}

export function parseWvsAxisKey(key: string): WvsSelection | null {
  if (!isWvsAxisKey(key)) return null;
  const body = key.slice(4);
  const colon = body.indexOf(":");
  const questionId = colon < 0 ? body : body.slice(0, colon);
  const rest = colon < 0 ? "" : body.slice(colon + 1);
  if (!questionId || !questionById.has(questionId)) return null;
  const answerIndexes =
    rest === ""
      ? []
      : rest
          .split("+")
          .map((s) => Number(s))
          .filter((n) => Number.isInteger(n) && n >= 0);
  return { questionId, answerIndexes };
}

export function wvsThemeLabel(themeId: string): string {
  return themeLabelById.get(themeId) ?? themeId;
}

/** Per-country answer breakdown for the widget (honest gaps stay null). */
export function getWvsCountryBreakdown(
  code: string,
  questionId: string,
): { answer: string; pct: WvsAnswerPct }[] | null {
  const q = questionById.get(questionId);
  if (!q) return null;
  const row = q.values[code];
  if (!row) return null;
  return q.answers.map((answer, i) => ({ answer, pct: row[i] ?? null }));
}
