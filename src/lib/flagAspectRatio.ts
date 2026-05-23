/**
 * Flag aspect-ratio classification for all 195 UN member states.
 *
 * Every country maps to one bucket. Countries not listed here default
 * to "ratio-2-3" — the standard ratio used by the overwhelming majority
 * of the world's flags (~100+ nations).
 *
 * Approximate ratios (expressed as height : width):
 *   ratio-1-2       1:2  Wide — many Commonwealth / British-influenced nations
 *   ratio-3-5       3:5  Used across Central Europe, the Caribbean, and others
 *   ratio-2-3       2:3  The global standard (default for unlisted entries)
 *   ratio-1-1       1:1  Square — Switzerland and Vatican City only
 *   ratio-irregular      Non-rectangular — Nepal (double-pennon) only
 *   ratio-other          Unusual ratios (Qatar 11:28, Denmark 28:37, etc.)
 */

export type FlagAspectRatio =
  | "ratio-2-3"
  | "ratio-1-2"
  | "ratio-3-5"
  | "ratio-1-1"
  | "ratio-irregular"
  | "ratio-other";

export const FLAG_ASPECT_RATIO_LABELS: Readonly<Record<FlagAspectRatio, string>> = {
  "ratio-2-3":      "2:3 — Standard",
  "ratio-1-2":      "1:2 — Wide",
  "ratio-3-5":      "3:5",
  "ratio-1-1":      "1:1 — Square",
  "ratio-irregular": "Non-rectangular",
  "ratio-other":    "Uncommon ratio",
};

/** Canonical display order — standard first, oddities last. */
export const FLAG_ASPECT_RATIO_ORDER: readonly FlagAspectRatio[] = [
  "ratio-2-3",
  "ratio-1-2",
  "ratio-3-5",
  "ratio-1-1",
  "ratio-irregular",
  "ratio-other",
];

/** Country code → aspect ratio bucket. Omitted codes default to "ratio-2-3". */
export const FLAG_ASPECT_RATIOS: Readonly<Record<string, FlagAspectRatio>> = {
  // ── 1:1  Square ─────────────────────────────────────────────────────────
  CH: "ratio-1-1",
  VA: "ratio-1-1",

  // ── Non-rectangular ─────────────────────────────────────────────────────
  NP: "ratio-irregular",  // double-pennon — the only non-rectangular national flag

  // ── 1:2  Wide ───────────────────────────────────────────────────────────
  AE: "ratio-1-2", AF: "ratio-1-2", AM: "ratio-1-2", AU: "ratio-1-2",
  AZ: "ratio-1-2", BA: "ratio-1-2", BN: "ratio-1-2", BS: "ratio-1-2",
  BY: "ratio-1-2", BZ: "ratio-1-2", CA: "ratio-1-2", CU: "ratio-1-2",
  DM: "ratio-1-2", ER: "ratio-1-2", ET: "ratio-1-2", FJ: "ratio-1-2",
  FM: "ratio-1-2", GB: "ratio-1-2", GW: "ratio-1-2", HN: "ratio-1-2",
  HR: "ratio-1-2", HU: "ratio-1-2", IE: "ratio-1-2", JM: "ratio-1-2",
  JO: "ratio-1-2", KI: "ratio-1-2", KP: "ratio-1-2", KW: "ratio-1-2",
  KZ: "ratio-1-2", LC: "ratio-1-2", LK: "ratio-1-2", LR: "ratio-1-2",
  LV: "ratio-1-2", LY: "ratio-1-2", MD: "ratio-1-2", ME: "ratio-1-2",
  MK: "ratio-1-2", MN: "ratio-1-2", MY: "ratio-1-2", NG: "ratio-1-2",
  NR: "ratio-1-2", NZ: "ratio-1-2", OM: "ratio-1-2", PH: "ratio-1-2",
  PS: "ratio-1-2", SB: "ratio-1-2", SC: "ratio-1-2", SD: "ratio-1-2",
  SI: "ratio-1-2", SS: "ratio-1-2", ST: "ratio-1-2", TJ: "ratio-1-2",
  TL: "ratio-1-2", TO: "ratio-1-2", TV: "ratio-1-2", US: "ratio-1-2",
  UZ: "ratio-1-2", WS: "ratio-1-2", ZW: "ratio-1-2",

  // ── 3:5  ────────────────────────────────────────────────────────────────
  // Includes flags with closely related ratios: 5:8 (Poland, Sweden, Palau)
  BD: "ratio-3-5", BG: "ratio-3-5", BH: "ratio-3-5", CF: "ratio-3-5",
  DE: "ratio-3-5", GD: "ratio-3-5", GT: "ratio-3-5", GY: "ratio-3-5",
  HT: "ratio-3-5", KG: "ratio-3-5", LI: "ratio-3-5", LT: "ratio-3-5",
  LU: "ratio-3-5", NI: "ratio-3-5", PL: "ratio-3-5", PW: "ratio-3-5",
  PY: "ratio-3-5", SE: "ratio-3-5", SV: "ratio-3-5", TG: "ratio-3-5",
  TT: "ratio-3-5", VU: "ratio-3-5",

  // ── Uncommon ratios ─────────────────────────────────────────────────────
  // BE  13:15  (near-square)        MC  4:5   (near-square)
  // NE   6:7   (near-square)        CD  3:4
  // DK  28:37  (close to 3:4)       GA  3:4
  // PG   3:4                        SM  3:4
  // QA  11:28  (very wide — unique)
  BE: "ratio-other", CD: "ratio-other", DK: "ratio-other",
  GA: "ratio-other", MC: "ratio-other", NE: "ratio-other",
  PG: "ratio-other", QA: "ratio-other", SM: "ratio-other",
};
