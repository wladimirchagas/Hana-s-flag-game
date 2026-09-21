/**
 * Adaptive neutral plates behind brand logos (newspapers, agencies, airlines,
 * broadcasters, tourism logos, parties, central banks). Many mastheads are dark ink on
 * transparent backgrounds and vanish in dark mode; some are light ink and
 * vanish on cream. The plate is chosen from the logo's own pixels — not from
 * the app theme — so contrast stays correct in both themes.
 *
 * Gold standard (owner, Malaysia party grid 2026-09): the light cream plate
 * used for Amanah / DAP — consistent across the grid, the detail panel and
 * fullscreen. Dark plates are the exception, not a second default.
 *
 * Rules:
 *   1. Transparent ink (The Australian, China Southern, DAP, Amanah) —
 *      opposite of the ink: dark/colourful ink → light plate; pale ink → dark.
 *   2. Solid white/light canvas (NZZ, Courier-Mail, China Daily) — light plate
 *      that matches the canvas (no dark frame / box-in-a-box).
 *   3. Solid near-black tile (Dagens Nyheter) — dark plate that matches the
 *      tile (only true black fields; not chromatic full-bleed marks).
 *   4. Solid chromatic full-bleed (PKR's red/blue flag mark) — light plate,
 *      same gold-standard cream as Amanah. Matching "dark" from mid-tone
 *      edges made PKR charcoal while its neighbours stayed cream.
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
 * Opaque coverage at or above this → the asset carries its own rectangular
 * field (white canvas, black tile, or full-bleed chromatic mark).
 */
const SOLID_OPAQUE_RATIO = 0.85;
/**
 * Edge luminance at or above this → solid light/white canvas → light plate.
 * (NZZ, Courier-Mail, China Daily.)
 */
const SOLID_LIGHT_EDGE = 180;
/**
 * Edge luminance at or below this → solid near-black tile → dark plate.
 * (Dagens Nyheter.) Chromatic full-bleed marks (PKR) sit above this and
 * take the gold-standard light plate instead.
 */
const SOLID_BLACK_EDGE = 45;
/**
 * Content-luminance midpoint for transparent logos (0–255). At or below →
 * light plate (dark ink); above → dark plate (light ink).
 */
const INK_LUMINANCE_CUTOFF = 155;

type Analysis = {
  tone: LogoBackdropTone;
  /**
   * Asset's own field matches the plate (white canvas or black tile) — tighten
   * padding so we don't draw a second frame. Chromatic full-bleed marks that
   * still use the gold-standard light plate leave this false.
   */
  solid: boolean;
};

const analysisCache = new Map<string, Analysis>();

function luminance(r: number, g: number, b: number): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Sample the image and decide plate tone + whether the asset is solid-backed.
 * Failures default to a light plate (the gold-standard cream).
 */
export function analyzeLogoBackdrop(img: HTMLImageElement): Analysis {
  const key = img.currentSrc || img.src;
  if (!key) return { tone: "light", solid: false };
  const cached = analysisCache.get(key);
  if (cached) return cached;

  let result: Analysis = { tone: "light", solid: false };
  try {
    if (!img.naturalWidth || !img.naturalHeight) {
      analysisCache.set(key, result);
      return result;
    }
    const canvas = document.createElement("canvas");
    canvas.width = SAMPLE;
    canvas.height = SAMPLE;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      analysisCache.set(key, result);
      return result;
    }
    ctx.clearRect(0, 0, SAMPLE, SAMPLE);
    ctx.drawImage(img, 0, 0, SAMPLE, SAMPLE);
    const { data } = ctx.getImageData(0, 0, SAMPLE, SAMPLE);

    let opaque = 0;
    let weightedY = 0;
    let weight = 0;
    let edgeY = 0;
    let edgeN = 0;
    const edgeBand = 2;

    for (let y = 0; y < SAMPLE; y++) {
      for (let x = 0; x < SAMPLE; x++) {
        const i = (y * SAMPLE + x) * 4;
        const a = data[i + 3];
        if (a < ALPHA_MIN) continue;
        opaque++;
        const yLum = luminance(data[i], data[i + 1], data[i + 2]);
        const w = a / 255;
        weightedY += yLum * w;
        weight += w;
        const onEdge =
          x < edgeBand ||
          y < edgeBand ||
          x >= SAMPLE - edgeBand ||
          y >= SAMPLE - edgeBand;
        if (onEdge) {
          edgeY += yLum;
          edgeN++;
        }
      }
    }

    const total = SAMPLE * SAMPLE;
    const opaqueRatio = opaque / total;
    const contentAvg = weight > 0 ? weightedY / weight : 0;
    const edgeAvg = edgeN > 0 ? edgeY / edgeN : contentAvg;

    if (opaqueRatio >= SOLID_OPAQUE_RATIO && edgeN > 0) {
      if (edgeAvg >= SOLID_LIGHT_EDGE) {
        // White/light canvas — match it.
        result = { tone: "light", solid: true };
      } else if (edgeAvg <= SOLID_BLACK_EDGE) {
        // Near-black tile only — match it. Do NOT treat mid-tone chromatic
        // edges (PKR) as black fields.
        result = { tone: "dark", solid: true };
      } else {
        // Full-bleed chromatic mark — gold-standard light cream, normal pad.
        result = { tone: "light", solid: false };
      }
    } else if (weight >= 1) {
      // Transparent ink on clear — contrast against the ink.
      result = {
        tone: contentAvg <= INK_LUMINANCE_CUTOFF ? "light" : "dark",
        solid: false,
      };
    }
  } catch {
    result = { tone: "light", solid: false };
  }
  analysisCache.set(key, result);
  return result;
}

/** @deprecated Prefer analyzeLogoBackdrop; kept for any external callers. */
export function analyzeLogoBackdropTone(img: HTMLImageElement): LogoBackdropTone {
  return analyzeLogoBackdrop(img).tone;
}

/**
 * Paint `data-logo-tone` / `data-logo-backing` on the nearest logo surface.
 * Safe to call from `onLoad`.
 */
export function applyLogoBackdropTone(
  img: HTMLImageElement,
  surface?: Element | null,
): LogoBackdropTone {
  const { tone, solid } = analyzeLogoBackdrop(img);
  const el =
    surface ??
    img.closest("[data-logo-surface]") ??
    img.parentElement;
  if (el instanceof HTMLElement) {
    el.dataset.logoTone = tone;
    if (solid) el.dataset.logoBacking = "solid";
    else delete el.dataset.logoBacking;
  }
  return tone;
}

/**
 * Size a fullscreen logo so the plate always wraps the full wordmark.
 * Wide SVGs without width/height attributes can otherwise resolve to a
 * near-square used size, leaving the plate as a narrow tile behind the
 * centre of the logo (China Southern, owner report 2026-09).
 */
export function sizeFullscreenLogo(img: HTMLImageElement): void {
  const nw = img.naturalWidth;
  const nh = img.naturalHeight;
  if (!nw || !nh) return;
  const maxW = Math.min(window.innerWidth * 0.84, 1000);
  const maxH = Math.min(window.innerHeight * 0.72, 780);
  const ratio = nw / nh;
  let w = maxW;
  let h = w / ratio;
  if (h > maxH) {
    h = maxH;
    w = h * ratio;
  }
  img.style.width = `${Math.round(w)}px`;
  img.style.height = `${Math.round(h)}px`;
}
