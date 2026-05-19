/**
 * Curated "shapes / motifs" tags for modern country flags.
 *
 * Used by the flag-grid's "By shape" grouping option so a flag can be
 * discovered by what's on it (a moon, a star, a cross, …) rather than
 * just by the country's name or region. A flag with multiple notable
 * motifs is tagged with multiple shapes and shows up under each
 * category — the Algerian flag is both a *crescent* and a *star*;
 * the US flag is both *stars* and *horizontal stripes*.
 *
 * Tagging policy (subjective but consistent):
 *   - "stripes-h"   At least two HORIZONTAL bands of different colours
 *                   spanning the width of the flag. Diagonally banded
 *                   flags do NOT qualify (Tanzania, Brunei, Seychelles).
 *   - "stripes-v"   At least two VERTICAL bands of different colours
 *                   spanning the height of the flag. A single vertical
 *                   colour bar (e.g. the green hoist on Benin) does NOT
 *                   qualify on its own.
 *   - "stars"       One or more pentagrams / 5-point stars / similar.
 *                   The Moroccan pentagram counts as a star.
 *   - "sun"         Sun face / sun rays / sun disc (Argentina, Uruguay,
 *                   Japan with its red disc, North Macedonia, Kazakhstan,
 *                   Bangladesh, Nepal, Niger, Laos, Tunisia).
 *   - "crescent"    Crescent moon (Turkey-family, Tunisia, Pakistan,
 *                   Malaysia, Singapore, Mauritania, Algeria, Libya,
 *                   Maldives, Comoros, Uzbekistan, Turkmenistan,
 *                   Azerbaijan, Nepal).
 *   - "cross"       Christian / Nordic / saltire crosses (the five
 *                   Nordics, Switzerland, Greece, Tonga, Dominica,
 *                   Dominican Rep., Georgia, Jamaica, Malta, Burundi
 *                   for its saltire, plus AU / NZ / Tuvalu / Fiji via
 *                   their Union Jack canton).
 *   - "triangle"    Prominent triangle / chevron — Cuba, Czechia,
 *                   Bahamas, Jordan, Sudan, Eritrea, South Sudan,
 *                   Trinidad's neighbours, South Africa Y-shape,
 *                   Djibouti, Guyana, Mozambique, Philippines,
 *                   Saint Lucia, Vanuatu, Nepal (uniquely non-rectangular).
 *                   The Bahrain / Qatar serrated edge counts (it's a
 *                   row of small triangles). A simple trapezoid like
 *                   Kuwait's does NOT count.
 *   - "animal"      Heraldic or stylised animal — eagles, lions,
 *                   birds. The 2 lions on Spain's COA count; subtle
 *                   creatures on a tiny shield (Croatia, Slovakia) do
 *                   NOT.
 *
 * NOTE: this file has been audited end-to-end (May 2026). Earlier
 * spurious tags were removed (Afghanistan ≠ stars; Cyprus ≠ animal;
 * Samoa ≠ cross; etc.) and Russia / Rwanda / Belarus / many others
 * gained their rightful stripe tags.
 */
export type FlagShape =
  | "cross"
  | "crescent"
  | "stars"
  | "sun"
  | "stripes-h"
  | "stripes-v"
  | "stripes-d"
  | "triangle"
  | "animal";

export const FLAG_SHAPE_LABELS: Readonly<Record<FlagShape, string>> = {
  stars:        "Stars",
  crescent:     "Crescent / Moon",
  sun:          "Sun",
  cross:        "Cross",
  triangle:     "Triangle",
  "stripes-h":  "Horizontal stripes",
  "stripes-v":  "Vertical stripes",
  "stripes-d":  "Diagonal stripes",
  animal:       "Animal",
};

/** Canonical display order used for the "By shape" group headings. */
export const FLAG_SHAPE_ORDER: readonly FlagShape[] = [
  "stars",
  "crescent",
  "sun",
  "cross",
  "triangle",
  "stripes-h",
  "stripes-v",
  "stripes-d",
  "animal",
];

/** Tags by ISO 3166-1 alpha-2 code. Coverage: all 195 UN-member states. */
export const FLAG_SHAPES: Readonly<Record<string, readonly FlagShape[]>> = {
  // Afghanistan — Taliban Islamic Emirate flag (2021–): white field with
  // black Shahada text. No stars, no other motifs.
  AF: [],
  AL: ["animal"],
  DZ: ["crescent", "stars", "stripes-v"],
  AD: ["stripes-v"],
  AO: ["stars", "stripes-h"],
  // Antigua & Barbuda — V-shape bands of colour radiating from a
  // central black band. The V is a triangle but the bands aren't
  // horizontal or vertical, so no stripes tags.
  AG: ["sun", "triangle"],
  AR: ["sun", "stripes-h"],
  AM: ["stripes-h"],
  AU: ["stars", "cross"],
  AT: ["stripes-h"],
  AZ: ["crescent", "stars", "stripes-h"],
  BS: ["triangle", "stripes-h"],
  // Bahrain — red field with a vertical white serrated band on the
  // hoist (5 triangular points). Vertical bicolour + triangle pattern.
  BH: ["triangle", "stripes-v"],
  BD: ["sun"],
  BB: ["stripes-v"],
  BY: ["stripes-h"],
  BE: ["stripes-v"],
  BZ: ["stripes-h"],
  BJ: ["stripes-h"],
  BT: ["animal"],
  BO: ["stripes-h", "animal"],
  BA: ["stars", "triangle"],
  BW: ["stripes-h"],
  BR: ["stars"],
  // Brunei — black + white diagonal stripes on a yellow field, plus
  // the central red COA. Two diagonal bands → "Diagonal stripes".
  BN: ["stripes-d"],
  BG: ["stripes-h"],
  BF: ["stars", "stripes-h"],
  // Burundi — white saltire (X-cross) dividing red top/bottom and
  // green left/right, plus 3 red stars in a central white disc.
  BI: ["stars", "cross"],
  CV: ["stars", "stripes-h"],
  KH: ["stripes-h"],
  CM: ["stars", "stripes-v"],
  CA: ["stripes-v"],
  // CAR — 4 horizontal bands intersected by 1 vertical red band, plus
  // a yellow star: tagged for both stripe orientations.
  CF: ["stars", "stripes-h", "stripes-v"],
  TD: ["stripes-v"],
  CL: ["stars", "stripes-h"],
  CN: ["stars"],
  CO: ["stripes-h"],
  KM: ["stars", "crescent", "stripes-h", "triangle"],
  // Republic of the Congo — green / yellow / red diagonal bands
  // running from the upper hoist to the lower fly.
  CG: ["stripes-d"],
  // DR Congo — single yellow diagonal stripe across sky-blue field
  // (plus the yellow star in the canton).
  CD: ["stars", "stripes-d"],
  CR: ["stripes-h"],
  CI: ["stripes-v"],
  HR: ["stripes-h"],
  CU: ["stars", "stripes-h", "triangle"],
  // Cyprus — map of the island + olive branches on white. No motif fits
  // our taxonomy, so empty.
  CY: [],
  CZ: ["stripes-h", "triangle"],
  DK: ["cross"],
  DJ: ["triangle", "stars", "stripes-h"],
  DM: ["cross", "stars", "animal"],
  DO: ["cross"],
  EC: ["stripes-h", "animal"],
  EG: ["stripes-h", "animal"],
  SV: ["stripes-h"],
  // Equatorial Guinea — silk-cotton tree (not an animal) in the COA.
  GQ: ["stripes-h"],
  ER: ["triangle"],
  EE: ["stripes-h"],
  // Eswatini — shield + spears + plumes, no animal.
  SZ: ["stripes-h"],
  // Ethiopia — central blue disc with star inside; tagged sun for the
  // disc shape.
  ET: ["stripes-h", "stars", "sun"],
  FJ: ["cross", "animal"],
  FI: ["cross"],
  FR: ["stripes-v"],
  GA: ["stripes-h"],
  GM: ["stripes-h"],
  GE: ["cross"],
  DE: ["stripes-h"],
  GH: ["stars", "stripes-h"],
  GR: ["cross", "stripes-h"],
  GD: ["stars", "triangle"],
  GT: ["stripes-v", "animal"],
  GN: ["stripes-v"],
  GW: ["stars", "stripes-h"],
  GY: ["triangle"],
  HT: ["stripes-h"],
  HN: ["stars", "stripes-h"],
  HU: ["stripes-h"],
  IS: ["cross"],
  IN: ["stripes-h"],
  ID: ["stripes-h"],
  IR: ["stripes-h"],
  IQ: ["stripes-h"],
  IE: ["stripes-v"],
  IL: ["stars", "stripes-h"],
  IT: ["stripes-v"],
  JM: ["cross"],
  JP: ["sun"],
  JO: ["stars", "stripes-h", "triangle"],
  KZ: ["sun", "animal"],
  KE: ["stripes-h"],
  KI: ["sun", "animal", "stripes-h"],
  KP: ["stars", "stripes-h"],
  // South Korea — taegeuk is a yin-yang, not really a sun; trigrams
  // aren't in our taxonomy. Empty.
  KR: [],
  // Kuwait — the black hoist shape is a trapezoid, not a triangle.
  // Strict reading: just horizontal stripes.
  KW: ["stripes-h"],
  KG: ["sun"],
  LA: ["stripes-h", "sun"],
  LV: ["stripes-h"],
  LB: ["stripes-h"],
  LS: ["stripes-h"],
  LR: ["stars", "stripes-h"],
  LY: ["stripes-h", "crescent", "stars"],
  LI: ["stripes-h"],
  LT: ["stripes-h"],
  LU: ["stripes-h"],
  MG: ["stripes-h"],
  MW: ["sun", "stripes-h"],
  MY: ["crescent", "stars", "stripes-h"],
  MV: ["crescent"],
  ML: ["stripes-v"],
  MT: ["cross", "stripes-v"],
  // Marshall Islands — orange + white diagonal bands rising from the
  // lower hoist to the upper fly, plus a large white star in the canton.
  MH: ["stars", "stripes-d"],
  MR: ["crescent", "stars", "stripes-h"],
  MU: ["stripes-h"],
  MX: ["stripes-v", "animal"],
  FM: ["stars"],
  MD: ["stripes-v", "animal"],
  MC: ["stripes-h"],
  MN: ["stripes-v"],
  ME: ["animal"],
  MA: ["stars"], // pentagram counts as a star
  MZ: ["stars", "triangle", "stripes-h"],
  MM: ["stars", "stripes-h"],
  // Namibia — single red diagonal stripe (with white borders)
  // bisecting blue (with sun) and green halves.
  NA: ["sun", "stripes-d"],
  NR: ["stars", "stripes-h"],
  NP: ["sun", "crescent", "triangle"],
  NL: ["stripes-h"],
  NZ: ["stars", "cross"],
  NI: ["stripes-h"],
  NE: ["sun", "stripes-h"],
  NG: ["stripes-v"],
  MK: ["sun"],
  NO: ["cross"],
  OM: ["stripes-h"],
  PK: ["crescent", "stars", "stripes-v"],
  PW: ["sun"],
  PA: ["stars"],
  PG: ["stars", "animal", "triangle"],
  PY: ["stripes-h"],
  PE: ["stripes-v"],
  PH: ["sun", "stars", "triangle", "stripes-h"],
  PL: ["stripes-h"],
  PT: ["stripes-v"],
  QA: ["triangle", "stripes-v"],
  RO: ["stripes-v"],
  // Russia — white-blue-red horizontal tricolour (1993 design).
  RU: ["stripes-h"],
  // Rwanda — sky-blue / yellow / green horizontal bands with a 24-ray
  // yellow sun in the upper-right.
  RW: ["sun", "stripes-h"],
  // Saint Kitts and Nevis — black diagonal stripe with yellow borders
  // bisecting green / red triangles; 2 white stars on the black band.
  KN: ["stars", "triangle", "stripes-d"],
  LC: ["triangle"],
  VC: ["stripes-v"],
  // Samoa — red field with blue canton containing the Southern Cross.
  // No actual cross emblem and no stripes.
  WS: ["stars"],
  SM: ["stripes-h"],
  ST: ["stars", "stripes-h", "triangle"],
  // Saudi Arabia — Shahada + sword on green. No motifs in our set.
  SA: [],
  SN: ["stars", "stripes-v"],
  RS: ["stripes-h", "animal"],
  // Seychelles — five oblique rays radiating from the lower-hoist
  // corner. Multiple diagonal bands → "Diagonal stripes".
  SC: ["stripes-d"],
  SL: ["stripes-h"],
  SG: ["crescent", "stars", "stripes-h"],
  // Slovakia — double-cross-on-hills COA, no animal.
  SK: ["stripes-h"],
  SI: ["stripes-h", "stars"],
  // Solomon Islands — yellow diagonal stripe across the field
  // separating dark-blue (upper) and green (lower), plus 5 white
  // stars in the upper-hoist quadrant.
  SB: ["stars", "stripes-d"],
  SO: ["stars"],
  ZA: ["triangle"],
  SS: ["stars", "stripes-h", "triangle"],
  // Spain — two lions in the COA shield.
  ES: ["stripes-h", "animal"],
  LK: ["animal", "stripes-v"],
  SD: ["triangle", "stripes-h"],
  SR: ["stars", "stripes-h"],
  SE: ["cross"],
  CH: ["cross"],
  SY: ["stars", "stripes-h"],
  TJ: ["stars", "stripes-h"],
  // Tanzania — black diagonal band with yellow borders bisecting
  // green and blue triangles. Three diagonal bands → "Diagonal stripes".
  TZ: ["stripes-d"],
  TH: ["stripes-h"],
  TL: ["stars", "triangle"],
  TG: ["stars", "stripes-h"],
  TO: ["cross"],
  // Trinidad and Tobago — single black diagonal stripe with white
  // borders on a red field.
  TT: ["stripes-d"],
  TN: ["crescent", "stars", "sun"],
  TR: ["crescent", "stars"],
  TM: ["crescent", "stars", "stripes-v"],
  TV: ["stars", "cross"],
  UG: ["stripes-h", "animal"],
  UA: ["stripes-h"],
  AE: ["stripes-h"],
  GB: ["cross"],
  US: ["stars", "stripes-h"],
  UY: ["sun", "stripes-h"],
  UZ: ["crescent", "stars", "stripes-h"],
  // Vanuatu — no stars; pig-tusk emblem with leaves on a black triangle.
  // The Y-shape divides red/green so technically horizontal-ish bands.
  VU: ["triangle", "stripes-h"],
  VA: ["stripes-v"],
  VE: ["stars", "stripes-h"],
  VN: ["stars"],
  YE: ["stripes-h"],
  // Zambia — vertical strip of red/black/orange in a corner + eagle.
  // The vertical bands are too narrow / cornered to count as
  // full-flag stripes; tag only the eagle.
  ZM: ["animal"],
  ZW: ["stars", "stripes-h", "animal", "triangle"],
  // UN observer states
  PS: ["stripes-h", "triangle"],
};
