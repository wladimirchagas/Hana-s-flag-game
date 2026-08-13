/**
 * Groups countries by the colour FAMILY of their passport cover, for the flag
 * grid's "By colour" grouping in the Passports view.
 *
 * The world's passports fall into a small set of cover colours — red/burgundy,
 * blue, green and black are the classic four (per the passport-colour taxonomy),
 * with the odd outlier. We classify each country's SOURCED predominant passport
 * colour (src/data/passportColors.ts, extracted from the bundled cover image)
 * into one of those families by hue, with a saturation floor for near-neutral
 * black covers. Nothing here is a stored/curated colour name — the family is
 * derived from the same measured colour the map fills countries with, so the two
 * can never disagree.
 */
import { PASSPORT_COLORS } from "../data/passportColors";

export type PassportColorGroup = "Red" | "Blue" | "Green" | "Black" | "Other";

/** Heading order for the grouped view. */
export const PASSPORT_COLOR_GROUP_ORDER: readonly PassportColorGroup[] = [
  "Red",
  "Blue",
  "Green",
  "Black",
  "Other",
];

function classify(hex: string): PassportColorGroup {
  const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex.trim());
  if (!m) return "Other";
  const r = parseInt(m[1], 16);
  const g = parseInt(m[2], 16);
  const b = parseInt(m[3], 16);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const chroma = max - min;
  // Saturation (HSV). A near-neutral cover — grey through to black — reads as a
  // "black" passport regardless of how dark it is; a very dark but saturated
  // navy (#080818) is still blue, not black.
  const sat = max === 0 ? 0 : chroma / max;
  if (sat < 0.22) return "Black";
  // Hue in degrees.
  let hue: number;
  if (max === r) hue = ((g - b) / chroma) % 6;
  else if (max === g) hue = (b - r) / chroma + 2;
  else hue = (r - g) / chroma + 4;
  hue = hue * 60;
  if (hue < 0) hue += 360;
  if (hue < 40 || hue >= 320) return "Red";
  if (hue >= 80 && hue < 170) return "Green";
  if (hue >= 170 && hue < 290) return "Blue";
  return "Other";
}

/** The passport colour family for a country (from its bundled passport's
 *  predominant colour), or null when the country has no bundled passport. */
export function passportColorGroup(code: string): PassportColorGroup | null {
  const hex = PASSPORT_COLORS[code];
  return hex ? classify(hex) : null;
}
