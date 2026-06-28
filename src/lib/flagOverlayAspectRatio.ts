import { FLAG_OVERLAY_ASPECT_RATIOS } from "../data/flagOverlayAspectRatios";

// The aspect ratio (width / height) assumed for any flag not listed in
// FLAG_OVERLAY_ASPECT_RATIOS. 3:2 is the most common real-world flag
// proportion and is the historical default the overlay used for every flag, so
// flags that are genuinely 3:2 (the bulk of them) need no entry, and CDN-only /
// remote (historical-era) flags — which the build-time generator cannot
// measure — fall back to exactly the previous behaviour.
export const DEFAULT_FLAG_OVERLAY_ASPECT_RATIO = 1.5;

/**
 * Returns the real-world aspect ratio (width / height) of the flag at `url`,
 * for sizing flag-overlay <pattern> tiles on the Learn-mode maps.
 *
 * The overlay sizes each tile to this ratio so the flag fills its tile exactly
 * (with preserveAspectRatio="…meet") and the tiling covers the whole landmass
 * — no letterbox gaps, no distortion, no cropping. The lookup key is the file
 * path after "/flags/" (e.g. "au.svg", "sub/MY/MY-13.svg"), matching how
 * flagOverlayAspectRatios.ts is keyed; anything else (remote flagcdn /
 * historical URLs, jsDelivr CDN fallbacks) returns the default.
 *
 * NOTE: this is for the MAP OVERLAY only — it is unrelated to the flag-card
 * aspect-ratio buckets in src/lib/flagAspectRatio.ts.
 */
export function flagOverlayAspectRatio(url: string | null | undefined): number {
  if (!url) return DEFAULT_FLAG_OVERLAY_ASPECT_RATIO;
  const m = /\/flags\/(.+)$/.exec(url);
  if (!m) return DEFAULT_FLAG_OVERLAY_ASPECT_RATIO;
  return FLAG_OVERLAY_ASPECT_RATIOS[m[1]] ?? DEFAULT_FLAG_OVERLAY_ASPECT_RATIO;
}
