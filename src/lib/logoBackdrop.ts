/**
 * Adaptive neutral plates behind brand logos (newspapers, agencies, airlines,
 * broadcasters, tourism logos, parties). Many mastheads are dark ink on
 * transparent backgrounds and vanish in dark mode; some are light ink and
 * vanish on cream. The plate is chosen from the logo's own opaque pixels —
 * not from the app theme — so contrast stays correct in both themes.
 *
 * Flags and passport covers are excluded: they are full-bleed rectangles and
 * already carry their own field colours (see CLAUDE.md flag-thumb chrome).
 */
import type { GridContentType } from "./gridContentType";
import {
  MULTI_ITEM_GRID_CONTENT_TYPES,
  type MultiItemGridContentType,
} from "./countryItemChooser";

export type LogoBackdropTone = "light" | "dark";

/** Show modes whose tiles are brand logos (not flags / passports). */
export const LOGO_GRID_CONTENT_TYPES = MULTI_ITEM_GRID_CONTENT_TYPES;

export function gridContentNeedsLogoSurface(
  type: GridContentType,
): type is MultiItemGridContentType {
  return (LOGO_GRID_CONTENT_TYPES as readonly string[]).includes(type);
}

const SAMPLE = 64;
/** Skip near-transparent pixels so the empty field does not skew the average. */
const ALPHA_MIN = 24;
/**
 * Relative-luminance midpoint (0–255). At or below → light plate (dark ink
 * logos); above → dark plate (light / white logos). Biased slightly high so
 * the common black-masthead case gets a light plate.
 */
const LUMINANCE_CUTOFF = 155;

const toneCache = new Map<string, LogoBackdropTone>();

/**
 * Sample the image's opaque pixels and return which neutral plate gives the
 * better contrast. Failures (canvas tainted, empty decode, …) default to
 * "light" — that is the fix for the reported dark-mode black-masthead case.
 */
export function analyzeLogoBackdropTone(img: HTMLImageElement): LogoBackdropTone {
  const key = img.currentSrc || img.src;
  if (!key) return "light";
  const cached = toneCache.get(key);
  if (cached) return cached;

  let tone: LogoBackdropTone = "light";
  try {
    if (!img.naturalWidth || !img.naturalHeight) {
      toneCache.set(key, tone);
      return tone;
    }
    const canvas = document.createElement("canvas");
    canvas.width = SAMPLE;
    canvas.height = SAMPLE;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      toneCache.set(key, tone);
      return tone;
    }
    ctx.clearRect(0, 0, SAMPLE, SAMPLE);
    ctx.drawImage(img, 0, 0, SAMPLE, SAMPLE);
    const { data } = ctx.getImageData(0, 0, SAMPLE, SAMPLE);

    let weightedY = 0;
    let weight = 0;
    for (let i = 0; i < data.length; i += 4) {
      const a = data[i + 3];
      if (a < ALPHA_MIN) continue;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      // Rec. 709 relative luminance; weight by alpha so soft anti-alias edges
      // do not dominate solid ink.
      const y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      const w = a / 255;
      weightedY += y * w;
      weight += w;
    }
    if (weight >= 1) {
      tone = weightedY / weight <= LUMINANCE_CUTOFF ? "light" : "dark";
    }
  } catch {
    tone = "light";
  }
  toneCache.set(key, tone);
  return tone;
}

/**
 * Paint `data-logo-tone` on the nearest logo surface ancestor (or the given
 * element). Safe to call from `onLoad`; no-ops when no surface is found.
 */
export function applyLogoBackdropTone(
  img: HTMLImageElement,
  surface?: Element | null,
): LogoBackdropTone {
  const tone = analyzeLogoBackdropTone(img);
  const el =
    surface ??
    img.closest("[data-logo-surface]") ??
    img.parentElement;
  if (el instanceof HTMLElement) {
    el.dataset.logoTone = tone;
  }
  return tone;
}
