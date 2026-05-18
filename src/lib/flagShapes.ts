/**
 * Curated "shapes / motifs" tags for modern country flags.
 *
 * Used by the flag-grid's "By shape" grouping option so a flag can be
 * discovered by what's on it (a moon, a star, a cross, …) rather than
 * just by the country's name or region. A flag with multiple notable
 * motifs is tagged with multiple shapes and shows up under each
 * category — e.g. the Algerian flag is both a *crescent* and a *star*.
 *
 * The set of shape categories is deliberately small (~7) so the
 * groupings stay legible. Ambiguous fine-grained categories (Y-shapes,
 * trapezoids, etc.) collapse into the closest big bucket (triangle).
 *
 * Tagging policy (subjective but consistent):
 *   - "stripes"    Multi-band design with no other dominant emblem
 *                  competing for attention. Plain tricolours / bicolours
 *                  qualify; flags whose stripes are mostly background
 *                  for a central emblem (USA, Mexico, Iran, India,
 *                  Egypt, Greece, Bangladesh…) do too.
 *   - "stars"      One or more pentagrams / 5-point stars / similar
 *                  visible at flag-thumb size.
 *   - "sun"        Sun face / sun rays (Argentina, Uruguay, Japan with
 *                  red disc counted as "sun", Macedonia, Kazakhstan…).
 *   - "crescent"   Crescent moon (Turkey-family, Tunisia, Pakistan,
 *                  Malaysia, Singapore, Mauritania, Algeria, etc.).
 *   - "cross"      Christian / Nordic / saltire crosses (Denmark,
 *                  Sweden, Norway, Finland, Iceland, UK Union Jack,
 *                  Switzerland, Greece, Tonga, Dominica, Dominican
 *                  Republic, Georgia, Jamaica, Malta, plus
 *                  Australia / NZ / Tuvalu / Fiji via their Union
 *                  Jack canton).
 *   - "triangle"   Prominent triangle / chevron — Cuba, Czechia,
 *                  Bahamas, Jordan, Sudan, Eritrea, South Sudan,
 *                  Trinidad, South Africa Y-shape, Djibouti, Guyana,
 *                  Mozambique, Philippines, Saint Lucia, Vanuatu, Nepal
 *                  (the only non-rectangular national flag), etc.
 *   - "animal"    Heraldic or stylised animal — eagles, lions, birds.
 */
export type FlagShape =
  | "cross"
  | "crescent"
  | "stars"
  | "sun"
  | "stripes"
  | "triangle"
  | "animal";

/** Display label per shape tag, ordered by visual prominence. */
export const FLAG_SHAPE_LABELS: Readonly<Record<FlagShape, string>> = {
  stars:    "Stars",
  crescent: "Crescent / Moon",
  sun:      "Sun",
  cross:    "Cross",
  triangle: "Triangle",
  stripes:  "Stripes",
  animal:   "Animal",
};

/** Canonical display order used for the "By shape" group headings. */
export const FLAG_SHAPE_ORDER: readonly FlagShape[] = [
  "stars",
  "crescent",
  "sun",
  "cross",
  "triangle",
  "stripes",
  "animal",
];

/** Tags by ISO 3166-1 alpha-2 code. Coverage: all 195 UN-member states. */
export const FLAG_SHAPES: Readonly<Record<string, readonly FlagShape[]>> = {
  AF: ["stars"],
  AL: ["animal"],
  DZ: ["crescent", "stars"],
  AD: ["stripes"],
  AO: ["stars", "stripes"],
  AG: ["sun", "stripes", "triangle"],
  AR: ["sun", "stripes"],
  AM: ["stripes"],
  AU: ["stars", "cross"],
  AT: ["stripes"],
  AZ: ["crescent", "stars", "stripes"],
  BS: ["triangle", "stripes"],
  BH: ["stripes", "triangle"],
  BD: ["sun"],
  BB: ["triangle", "stripes"],
  BY: ["stripes"],
  BE: ["stripes"],
  BZ: ["animal", "stripes"],
  BJ: ["stripes"],
  BT: ["animal"],
  BO: ["stripes", "animal"],
  BA: ["stars", "triangle"],
  BW: ["stripes"],
  BR: ["stars"],
  BN: ["stripes"],
  BG: ["stripes"],
  BF: ["stars", "stripes"],
  BI: ["stars", "cross"],
  CV: ["stars", "stripes"],
  KH: ["stripes"],
  CM: ["stars", "stripes"],
  CA: ["stripes"],
  CF: ["stars", "stripes"],
  TD: ["stripes"],
  CL: ["stars", "stripes"],
  CN: ["stars"],
  CO: ["stripes"],
  KM: ["stars", "crescent", "stripes"],
  CG: ["stripes"],
  CD: ["stars", "stripes"],
  CR: ["stripes"],
  CI: ["stripes"],
  HR: ["stripes", "animal"],
  CU: ["stars", "stripes", "triangle"],
  CY: ["animal"], // (no shape really fits — left mostly empty so it ends up under Other)
  CZ: ["stripes", "triangle"],
  DK: ["cross"],
  DJ: ["triangle", "stars"],
  DM: ["cross", "stars", "animal"],
  DO: ["cross"],
  EC: ["stripes", "animal"],
  EG: ["stripes", "animal"],
  SV: ["stripes"],
  GQ: ["stripes", "animal"],
  ER: ["triangle"],
  EE: ["stripes"],
  SZ: ["animal"],
  ET: ["stripes", "stars"],
  FJ: ["cross", "animal"],
  FI: ["cross"],
  FR: ["stripes"],
  GA: ["stripes"],
  GM: ["stripes"],
  GE: ["cross"],
  DE: ["stripes"],
  GH: ["stars", "stripes"],
  GR: ["cross", "stripes"],
  GD: ["stars", "stripes"],
  GT: ["stripes", "animal"],
  GN: ["stripes"],
  GW: ["stars", "stripes"],
  GY: ["triangle"],
  HT: ["stripes"],
  HN: ["stars", "stripes"],
  HU: ["stripes"],
  IS: ["cross"],
  IN: ["stripes"],
  ID: ["stripes"],
  IR: ["stripes"],
  IQ: ["stripes"],
  IE: ["stripes"],
  IL: ["stars", "stripes"],
  IT: ["stripes"],
  JM: ["cross"],
  JP: ["sun"],
  JO: ["stars", "stripes", "triangle"],
  KZ: ["sun", "animal"],
  KE: ["stripes"],
  KI: ["sun", "animal", "stripes"],
  KP: ["stars", "stripes"],
  KR: ["sun"], // taegeuk acts visually like a sun-disc in the centre
  KW: ["stripes", "triangle"],
  KG: ["sun"],
  LA: ["stripes"],
  LV: ["stripes"],
  LB: ["stripes"],
  LS: ["stripes"],
  LR: ["stars", "stripes"],
  LY: ["stripes", "crescent", "stars"],
  LI: ["stripes"],
  LT: ["stripes"],
  LU: ["stripes"],
  MG: ["stripes"],
  MW: ["sun", "stripes"],
  MY: ["crescent", "stars", "stripes"],
  MV: ["crescent"],
  ML: ["stripes"],
  MT: ["cross"],
  MH: ["stars", "stripes"],
  MR: ["crescent", "stars", "stripes"],
  MU: ["stripes"],
  MX: ["stripes", "animal"],
  FM: ["stars"],
  MD: ["stripes", "animal"],
  MC: ["stripes"],
  MN: ["stripes"],
  ME: ["animal"],
  MA: ["stars", "stripes"], // pentagram counts as a star
  MZ: ["stars", "triangle", "stripes"],
  MM: ["stars", "stripes"],
  NA: ["sun", "stripes"],
  NR: ["stars", "stripes"],
  NP: ["sun", "crescent", "triangle"],
  NL: ["stripes"],
  NZ: ["stars", "cross"],
  NI: ["stripes"],
  NE: ["sun", "stripes"],
  NG: ["stripes"],
  MK: ["sun"],
  NO: ["cross"],
  OM: ["stripes"],
  PK: ["crescent", "stars"],
  PW: ["sun"],
  PA: ["stars"],
  PG: ["stars", "animal", "triangle"],
  PY: ["stripes"],
  PE: ["stripes"],
  PH: ["sun", "stars", "triangle"],
  PL: ["stripes"],
  PT: ["stripes"],
  QA: ["stripes", "triangle"],
  RO: ["stripes"],
  KN: ["stars", "stripes"],
  LC: ["triangle", "stripes"],
  VC: ["stripes"],
  WS: ["stars", "stripes", "cross"],
  SM: ["stripes"],
  ST: ["stars", "stripes"],
  SA: [], // text + sword
  SN: ["stars", "stripes"],
  RS: ["stripes", "animal"],
  SC: ["stripes"],
  SL: ["stripes"],
  SG: ["crescent", "stars", "stripes"],
  SK: ["stripes", "animal"],
  SI: ["stripes", "stars"],
  SB: ["stars", "stripes"],
  SO: ["stars", "stripes"],
  ZA: ["triangle", "stripes"],
  SS: ["stars", "stripes", "triangle"],
  ES: ["stripes", "animal"],
  LK: ["animal", "stripes"],
  SD: ["stripes", "triangle"],
  SR: ["stars", "stripes"],
  SE: ["cross"],
  CH: ["cross"],
  SY: ["stars", "stripes"],
  TJ: ["stars", "stripes"],
  TZ: ["stripes"],
  TH: ["stripes"],
  TL: ["stars", "triangle"],
  TG: ["stars", "stripes"],
  TO: ["cross", "stripes"],
  TT: ["stripes"],
  TN: ["crescent", "stars", "sun"],
  TR: ["crescent", "stars"],
  TM: ["crescent", "stars", "stripes"],
  TV: ["stars", "cross"],
  UG: ["stripes", "animal"],
  UA: ["stripes"],
  AE: ["stripes"],
  GB: ["cross"],
  US: ["stars", "stripes"],
  UY: ["sun", "stripes"],
  UZ: ["crescent", "stars", "stripes"],
  VU: ["stars", "triangle"],
  VA: ["stripes"],
  VE: ["stars", "stripes"],
  VN: ["stars"],
  YE: ["stripes"],
  ZM: ["animal", "stripes"],
  ZW: ["stars", "stripes", "animal", "triangle"],
  // UN observer states
  PS: ["stripes", "triangle"],
};
