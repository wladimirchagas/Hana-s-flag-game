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
 *   - "bicolor"     Exactly TWO equal fields/bands of different colours.
 *                   Emblems / crescents / stars overlaid on top don't
 *                   disqualify (Algeria, Pakistan, Singapore still count).
 *                   Bahrain / Qatar with serrated edges still count.
 *   - "tricolor"    Exactly THREE equal bands of different colours,
 *                   horizontal or vertical. Emblems on top don't
 *                   disqualify (Mexico, India, Iran, etc.).
 *   - "stripes-h"   At least two HORIZONTAL bands of different colours
 *                   spanning the width of the flag. Diagonally banded
 *                   flags do NOT qualify (Tanzania, Brunei, Seychelles).
 *   - "stripes-v"   At least two VERTICAL bands of different colours
 *                   spanning the height of the flag. A single vertical
 *                   colour bar (e.g. the green hoist on Benin) does NOT
 *                   qualify on its own.
 *   - "stripes-d"   At least one diagonal band cutting across the flag.
 *   - "stars"       One or more pentagrams / 5-point stars / similar.
 *                   The Moroccan pentagram counts as a star.
 *   - "sun"         Sun face / sun rays / sun disc (Argentina, Uruguay,
 *                   Japan with its red disc, North Macedonia, Kazakhstan,
 *                   Bangladesh, Nepal, Niger, Laos, Tunisia).
 *   - "crescent"    Crescent moon (Türkiye-family, Tunisia, Pakistan,
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
 *   - "canton"      Distinct upper-hoist quadrant element — either a
 *                   Union Jack (AU/NZ/FJ/TV), a US-style blue field
 *                   with stars, a single star (Liberia, Togo, Chile,
 *                   DRC), or a cross/crescent in the corner (Greece,
 *                   Tonga, Malta, Malaysia).
 *   - "seal"        Prominent central coat-of-arms / heraldic emblem.
 *                   Spain, Portugal, Mexico, Bolivia, Ecuador, Egypt,
 *                   Iran, Sri Lanka (its lion is animal AND seal), San
 *                   Marino, Slovakia, Slovenia, Vatican, etc. A subtle
 *                   tiny COA on a tricolour (Andorra, Moldova, Serbia)
 *                   still counts when it's the visual focus.
 *   - "animal"      Heraldic or stylised animal — eagles, lions,
 *                   birds. The 2 lions on Spain's COA count; subtle
 *                   creatures on a tiny shield (Croatia, Slovakia) do
 *                   NOT.
 *
 * NOTE: this file has been audited end-to-end (May 2026). Earlier
 * spurious tags were removed (Afghanistan ≠ stars; Cyprus ≠ animal;
 * Samoa ≠ cross; etc.) and Russia / Rwanda / Belarus / many others
 * gained their rightful stripe tags. The Bicolor / Tricolor / Seal /
 * Canton tags were added in a later pass after a review of the
 * flagwizard.net "World in 196 flags" taxonomy.
 */
export type FlagShape =
  | "bicolor"
  | "tricolor"
  | "cross"
  | "crescent"
  | "stars"
  | "sun"
  | "stripes-h"
  | "stripes-v"
  | "stripes-d"
  | "triangle"
  | "canton"
  | "seal"
  | "animal"
  // Aspect-ratio buckets — only the distinctive non-default ratios get
  // an explicit tag. Plain 2:3 (most flags) is intentionally left
  // unlabelled to avoid a 150-entry "2:3" bucket. See README at top.
  | "ratio-square"
  | "ratio-wide"
  | "ratio-irregular";

export const FLAG_SHAPE_LABELS: Readonly<Record<FlagShape, string>> = {
  tricolor:          "Tricolor",
  bicolor:           "Bicolor",
  stars:             "Stars",
  crescent:          "Crescent / Moon",
  sun:               "Sun",
  cross:             "Cross",
  triangle:          "Triangle",
  "stripes-h":       "Horizontal stripes",
  "stripes-v":       "Vertical stripes",
  "stripes-d":       "Diagonal stripes",
  canton:            "Canton",
  seal:              "Seal / Coat of arms",
  animal:            "Animal",
  "ratio-square":    "Ratio: square (1:1)",
  "ratio-wide":      "Ratio: wide (1:2 or wider)",
  "ratio-irregular": "Ratio: non-rectangular",
};

/** Canonical display order used for the "By shape" group headings. */
export const FLAG_SHAPE_ORDER: readonly FlagShape[] = [
  "tricolor",
  "bicolor",
  "stars",
  "crescent",
  "sun",
  "cross",
  "triangle",
  "stripes-h",
  "stripes-v",
  "stripes-d",
  "canton",
  "seal",
  "animal",
  "ratio-square",
  "ratio-wide",
  "ratio-irregular",
];

/** Tags by ISO 3166-1 alpha-2 code. Coverage: all 195 UN-member states. */
export const FLAG_SHAPES: Readonly<Record<string, readonly FlagShape[]>> = {
  // Afghanistan — Taliban Islamic Emirate flag (2021–): white field with
  // black Shahada text. No stars, no other motifs.
  AF: [],
  AL: ["animal"],
  // Algeria — green/white vertical bicolour with red crescent + star.
  DZ: ["bicolor", "crescent", "stars", "stripes-v"],
  // Andorra — vertical tricolour blue/yellow/red with central COA.
  AD: ["tricolor", "stripes-v", "seal"],
  AO: ["bicolor", "stars", "stripes-h"],
  // Antigua & Barbuda — V-shape bands of colour radiating from a
  // central black band. The V is a triangle but the bands aren't
  // horizontal or vertical, so no stripes tags.
  AG: ["sun", "triangle"],
  // Argentina — horizontal tricolour light-blue/white/light-blue with sun.
  AR: ["tricolor", "sun", "stripes-h"],
  // Armenia — horizontal tricolour red/blue/orange.
  AM: ["tricolor", "stripes-h"],
  AU: ["stars", "cross", "canton", "ratio-wide"],
  // Austria — horizontal tricolour red/white/red.
  AT: ["tricolor", "stripes-h"],
  AZ: ["tricolor", "crescent", "stars", "stripes-h"],
  BS: ["triangle", "stripes-h"],
  // Bahrain — red/white vertical bicolour with 5-point serrated edge.
  BH: ["bicolor", "triangle", "stripes-v"],
  // Bangladesh — green field with red disc (sun). Effectively bicolour.
  BD: ["bicolor", "sun"],
  BB: ["tricolor", "stripes-v"],
  BY: ["stripes-h", "ratio-wide"],
  // Belgium — vertical tricolour black/yellow/red.
  BE: ["tricolor", "stripes-v"],
  BZ: ["stripes-h", "seal"],
  BJ: ["stripes-h"],
  BT: ["animal"],
  // Bolivia — horizontal tricolour red/yellow/green with central COA.
  BO: ["tricolor", "stripes-h", "seal", "animal"],
  BA: ["stars", "triangle"],
  BW: ["stripes-h"],
  // Brazil — green field, yellow rhombus, blue celestial globe with stars.
  BR: ["stars", "seal"],
  // Brunei — black + white diagonal stripes on a yellow field, plus
  // the central red COA. Two diagonal bands → "Diagonal stripes".
  BN: ["stripes-d", "seal"],
  // Bulgaria — horizontal tricolour white/green/red.
  BG: ["tricolor", "stripes-h"],
  BF: ["bicolor", "stars", "stripes-h"],
  // Burundi — white saltire (X-cross) dividing red top/bottom and
  // green left/right, plus 3 red stars in a central white disc.
  BI: ["stars", "cross"],
  CV: ["stars", "stripes-h"],
  // Cambodia — horizontal blue/red/blue tricolour with Angkor Wat seal.
  KH: ["tricolor", "stripes-h", "seal"],
  CM: ["tricolor", "stars", "stripes-v"],
  // Canada — vertical red/white/red bands with maple leaf.
  CA: ["tricolor", "stripes-v"],
  // CAR — 4 horizontal bands intersected by 1 vertical red band, plus
  // a yellow star: tagged for both stripe orientations.
  CF: ["stars", "stripes-h", "stripes-v"],
  // Chad — vertical tricolour blue/yellow/red.
  TD: ["tricolor", "stripes-v"],
  CL: ["stars", "stripes-h", "canton"],
  CN: ["stars", "canton"],
  // Colombia — horizontal tricolour yellow/blue/red (Gran Colombia).
  CO: ["tricolor", "stripes-h"],
  KM: ["stars", "crescent", "stripes-h", "triangle"],
  // Republic of the Congo — green / yellow / red diagonal bands
  // running from the upper hoist to the lower fly.
  CG: ["stripes-d"],
  // DR Congo — single yellow diagonal stripe across sky-blue field
  // (plus the yellow star in the canton).
  CD: ["stars", "stripes-d", "canton"],
  // Costa Rica — horizontal pentacolour blue/white/red/white/blue with COA.
  CR: ["stripes-h", "seal"],
  // Côte d'Ivoire — vertical tricolour orange/white/green.
  CI: ["tricolor", "stripes-v"],
  // Croatia — horizontal tricolour red/white/blue with central COA.
  HR: ["tricolor", "stripes-h", "seal"],
  CU: ["stars", "stripes-h", "triangle"],
  // Cyprus — map of the island + olive branches on white. No motif fits
  // our taxonomy, so empty.
  CY: [],
  CZ: ["stripes-h", "triangle"],
  DK: ["cross"],
  DJ: ["triangle", "stars", "stripes-h"],
  DM: ["cross", "stars", "animal"],
  DO: ["cross", "seal"],
  // Ecuador — horizontal tricolour yellow/blue/red (Gran Colombia) with COA.
  EC: ["tricolor", "stripes-h", "seal", "animal"],
  // Egypt — horizontal tricolour red/white/black with Eagle of Saladin.
  EG: ["tricolor", "stripes-h", "seal", "animal"],
  // El Salvador — horizontal blue/white/blue tricolour with central COA.
  SV: ["tricolor", "stripes-h", "seal"],
  // Equatorial Guinea — silk-cotton tree (not an animal) in the COA.
  GQ: ["tricolor", "stripes-h", "seal"],
  ER: ["triangle", "seal"],
  // Estonia — horizontal tricolour blue/black/white.
  EE: ["tricolor", "stripes-h"],
  // Eswatini — shield + spears + plumes, no animal.
  SZ: ["stripes-h", "seal"],
  // Ethiopia — central blue disc with star inside; tagged sun for the
  // disc shape. Horizontal green/yellow/red tricolour beneath.
  ET: ["tricolor", "stripes-h", "stars", "sun", "seal"],
  FJ: ["cross", "animal", "canton", "seal", "ratio-wide"],
  FI: ["cross"],
  // France — vertical tricolour blue/white/red.
  FR: ["tricolor", "stripes-v"],
  // Gabon — horizontal tricolour green/yellow/blue.
  GA: ["tricolor", "stripes-h"],
  GM: ["tricolor", "stripes-h"],
  GE: ["cross"],
  // Germany — horizontal tricolour black/red/yellow.
  DE: ["tricolor", "stripes-h"],
  GH: ["tricolor", "stars", "stripes-h"],
  GR: ["cross", "stripes-h", "canton"],
  GD: ["stars", "triangle", "seal"],
  GT: ["tricolor", "stripes-v", "animal", "seal"],
  // Guinea — vertical tricolour red/yellow/green.
  GN: ["tricolor", "stripes-v"],
  GW: ["stars", "stripes-h"],
  GY: ["triangle"],
  HT: ["bicolor", "stripes-h", "seal"],
  HN: ["stars", "stripes-h"],
  // Hungary — horizontal tricolour red/white/green.
  HU: ["tricolor", "stripes-h"],
  IS: ["cross"],
  // India — horizontal tricolour saffron/white/green with Ashoka chakra.
  IN: ["tricolor", "stripes-h"],
  // Indonesia — red/white horizontal bicolour.
  ID: ["bicolor", "stripes-h"],
  // Iran — horizontal tricolour green/white/red with central emblem.
  IR: ["tricolor", "stripes-h", "seal"],
  // Iraq — horizontal tricolour red/white/black with Takbir.
  IQ: ["tricolor", "stripes-h"],
  // Ireland — vertical tricolour green/white/orange.
  IE: ["tricolor", "stripes-v"],
  IL: ["stars", "stripes-h"],
  // Italy — vertical tricolour green/white/red.
  IT: ["tricolor", "stripes-v"],
  JM: ["cross"],
  // Japan — white field with red sun disc (bicolour with central disc).
  JP: ["bicolor", "sun"],
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
  // Latvia — horizontal tricolour-ish (maroon/white/maroon).
  LV: ["tricolor", "stripes-h"],
  // Lebanon — horizontal red/white/red with cedar; tricolour layout.
  LB: ["tricolor", "stripes-h"],
  LS: ["stripes-h"],
  LR: ["stars", "stripes-h", "canton", "ratio-wide"],
  // Libya — horizontal tricolour red/black/green with crescent + star.
  LY: ["tricolor", "stripes-h", "crescent", "stars"],
  // Liechtenstein — blue/red horizontal bicolour with golden crown.
  LI: ["bicolor", "stripes-h", "seal"],
  // Lithuania — horizontal tricolour yellow/green/red.
  LT: ["tricolor", "stripes-h"],
  // Luxembourg — horizontal tricolour red/white/light-blue.
  LU: ["tricolor", "stripes-h"],
  MG: ["stripes-h"],
  MW: ["sun", "stripes-h"],
  MY: ["crescent", "stars", "stripes-h", "canton"],
  // Maldives — red field with green rectangle and white crescent.
  MV: ["bicolor", "crescent"],
  // Mali — vertical tricolour green/yellow/red.
  ML: ["tricolor", "stripes-v"],
  // Malta — white/red vertical bicolour with George Cross in the canton.
  MT: ["bicolor", "cross", "stripes-v", "canton"],
  // Marshall Islands — orange + white diagonal bands rising from the
  // lower hoist to the upper fly, plus a large white star in the canton.
  MH: ["stars", "stripes-d", "canton"],
  MR: ["crescent", "stars", "stripes-h"],
  MU: ["stripes-h"],
  // Mexico — vertical green/white/red tricolour with eagle COA.
  MX: ["tricolor", "stripes-v", "animal", "seal"],
  FM: ["stars"],
  // Moldova — vertical blue/yellow/red tricolour with central eagle COA.
  MD: ["tricolor", "stripes-v", "animal", "seal"],
  // Monaco — red/white horizontal bicolour.
  MC: ["bicolor", "stripes-h"],
  MN: ["stripes-v"],
  ME: ["animal", "seal"],
  MA: ["stars"], // pentagram counts as a star
  MZ: ["stars", "triangle", "stripes-h"],
  // Myanmar — horizontal tricolour yellow/green/red with star.
  MM: ["tricolor", "stars", "stripes-h"],
  // Namibia — single red diagonal stripe (with white borders)
  // bisecting blue (with sun) and green halves.
  NA: ["sun", "stripes-d"],
  NR: ["stars", "stripes-h"],
  NP: ["sun", "crescent", "triangle", "ratio-irregular"],
  // Netherlands — horizontal tricolour red/white/blue.
  NL: ["tricolor", "stripes-h"],
  NZ: ["stars", "cross", "canton", "ratio-wide"],
  NI: ["stripes-h", "seal"],
  NE: ["sun", "stripes-h"],
  // Nigeria — vertical tricolour green/white/green (technically G/W/G).
  NG: ["stripes-v"],
  MK: ["sun", "ratio-wide"],
  NO: ["cross"],
  OM: ["stripes-h"],
  // Pakistan — green field with white hoist stripe (bicolour) + crescent + star.
  PK: ["bicolor", "crescent", "stars", "stripes-v"],
  PW: ["sun"],
  PA: ["stars"],
  PG: ["stars", "animal", "triangle"],
  PY: ["stripes-h", "seal"],
  // Peru — vertical red/white/red tricolour with COA.
  PE: ["tricolor", "stripes-v", "seal"],
  PH: ["sun", "stars", "triangle", "stripes-h", "ratio-wide"],
  // Poland — white/red horizontal bicolour.
  PL: ["bicolor", "stripes-h"],
  // Portugal — green/red vertical bicolour with central COA.
  PT: ["bicolor", "stripes-v", "seal"],
  // Qatar — maroon/white vertical bicolour with serrated edge.
  QA: ["bicolor", "triangle", "stripes-v", "ratio-wide"],
  // Romania — vertical tricolour blue/yellow/red.
  RO: ["tricolor", "stripes-v"],
  // Russia — white-blue-red horizontal tricolour (1993 design).
  RU: ["tricolor", "stripes-h"],
  // Rwanda — sky-blue / yellow / green horizontal bands with a 24-ray
  // yellow sun in the upper-right.
  RW: ["sun", "stripes-h"],
  // Saint Kitts and Nevis — black diagonal stripe with yellow borders
  // bisecting green / red triangles; 2 white stars on the black band.
  KN: ["stars", "triangle", "stripes-d"],
  LC: ["triangle"],
  VC: ["tricolor", "stripes-v"],
  // Samoa — red field with blue canton containing the Southern Cross.
  // No actual cross emblem and no stripes.
  WS: ["stars", "canton"],
  // San Marino — white/blue horizontal bicolour with central COA.
  SM: ["bicolor", "stripes-h", "seal"],
  ST: ["stars", "stripes-h", "triangle"],
  // Saudi Arabia — Shahada + sword on green. No motifs in our set.
  SA: [],
  SN: ["tricolor", "stars", "stripes-v"],
  // Serbia — horizontal tricolour red/blue/white with COA.
  RS: ["tricolor", "stripes-h", "animal", "seal"],
  // Seychelles — five oblique rays radiating from the lower-hoist
  // corner. Multiple diagonal bands → "Diagonal stripes".
  SC: ["stripes-d"],
  SL: ["tricolor", "stripes-h"],
  // Singapore — red/white horizontal bicolour with crescent + 5 stars.
  SG: ["bicolor", "crescent", "stars", "stripes-h"],
  // Slovakia — horizontal tricolour white/blue/red with COA.
  SK: ["tricolor", "stripes-h", "seal"],
  // Slovenia — horizontal tricolour white/blue/red with COA.
  SI: ["tricolor", "stripes-h", "stars", "seal"],
  // Solomon Islands — yellow diagonal stripe across the field
  // separating dark-blue (upper) and green (lower), plus 5 white
  // stars in the upper-hoist quadrant.
  SB: ["stars", "stripes-d", "canton"],
  SO: ["stars"],
  ZA: ["triangle"],
  SS: ["stars", "stripes-h", "triangle"],
  // Spain — horizontal red/yellow/red with large COA shield (2 lions + castles).
  ES: ["stripes-h", "animal", "seal"],
  LK: ["animal", "stripes-v", "seal"],
  SD: ["triangle", "stripes-h"],
  // Suriname — horizontal pentacolour green/white/red/white/green with star.
  SR: ["stars", "stripes-h"],
  SE: ["cross"],
  CH: ["cross", "ratio-square"],
  // Syria — horizontal tricolour with stars (older 1980 version: red/white/black + 2 stars).
  SY: ["tricolor", "stars", "stripes-h"],
  TJ: ["stars", "stripes-h"],
  // Tanzania — black diagonal band with yellow borders bisecting
  // green and blue triangles. Three diagonal bands → "Diagonal stripes".
  TZ: ["stripes-d"],
  TH: ["stripes-h"],
  TL: ["stars", "triangle"],
  TG: ["stars", "stripes-h", "canton"],
  TO: ["cross", "canton"],
  // Trinidad and Tobago — single black diagonal stripe with white
  // borders on a red field.
  TT: ["stripes-d"],
  TN: ["crescent", "stars", "sun"],
  TR: ["crescent", "stars"],
  TM: ["crescent", "stars", "stripes-v"],
  TV: ["stars", "cross", "canton", "ratio-wide"],
  UG: ["stripes-h", "animal"],
  // Ukraine — blue/yellow horizontal bicolour.
  UA: ["bicolor", "stripes-h"],
  AE: ["stripes-h"],
  GB: ["cross", "ratio-wide"],
  US: ["stars", "stripes-h", "canton", "ratio-wide"],
  // Uruguay — horizontal stripes with sun in the canton.
  UY: ["sun", "stripes-h", "canton"],
  UZ: ["crescent", "stars", "stripes-h"],
  // Vanuatu — no stars; pig-tusk emblem with leaves on a black triangle.
  // The Y-shape divides red/green so technically horizontal-ish bands.
  VU: ["triangle", "stripes-h"],
  // Vatican — yellow/white vertical bicolour with keys + tiara.
  VA: ["bicolor", "stripes-v", "seal", "ratio-square"],
  // Venezuela — horizontal tricolour yellow/blue/red (Gran Colombia) with stars + COA.
  VE: ["tricolor", "stars", "stripes-h", "seal"],
  VN: ["stars"],
  // Yemen — horizontal tricolour red/white/black.
  YE: ["tricolor", "stripes-h"],
  // Zambia — vertical strip of red/black/orange in a corner + eagle.
  // The vertical bands are too narrow / cornered to count as
  // full-flag stripes; tag only the eagle.
  ZM: ["animal"],
  ZW: ["stars", "stripes-h", "animal", "triangle"],
  // UN observer states
  PS: ["stripes-h", "triangle"],
};
