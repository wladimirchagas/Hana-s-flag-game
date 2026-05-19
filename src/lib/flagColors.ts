/**
 * Curated "dominant colours" tags for modern country flags.
 *
 * Used by the flag-grid's "By colour" grouping. A flag is tagged with
 * every colour that takes up a meaningful share of its surface — a
 * thin pinstripe or a tiny emblem detail isn't enough; a band, a
 * canton, a large emblem field, or the main field colour all qualify.
 *
 * Tagging policy:
 *   - red       Any meaningful red field/band (Indonesia, Switzerland,
 *               USA stripes, China field, …).
 *   - white     White as a major field/band — most tricolours qualify.
 *   - blue      Any meaningful blue. Light-blue / sky-blue also count.
 *   - green     Any meaningful green band/field (Saudi Arabia, Brazil
 *               background, Pakistan, …).
 *   - yellow    Yellow / gold band, large emblem, or field (Vatican,
 *               Brunei, Brazil rhombus, …).
 *   - black     Any meaningful black band/field/symbol (Germany, Egypt,
 *               Estonia, South Africa, …).
 *   - orange    Distinct orange band — Ireland, India saffron, Côte
 *               d'Ivoire, Niger, Bhutan, Netherlands historically; not
 *               counted when it's borderline yellow.
 *   - purple    Vexillologically rare. Currently no UN-member flag
 *               carries purple in a meaningful share. Reserved for
 *               completeness; never tagged today.
 *
 * Multi-tag is the rule — most flags get 2–4 colour tags.
 *
 * Coverage: all 195 UN-member states. Notes about edge cases live
 * inline next to each entry.
 */
export type FlagColor =
  | "red"
  | "white"
  | "blue"
  | "green"
  | "yellow"
  | "black"
  | "orange"
  | "purple";

export const FLAG_COLOR_LABELS: Readonly<Record<FlagColor, string>> = {
  red:    "Red",
  white:  "White",
  blue:   "Blue",
  green:  "Green",
  yellow: "Yellow",
  black:  "Black",
  orange: "Orange",
  purple: "Purple",
};

/** Canonical display order for the "By colour" group headings. */
export const FLAG_COLOR_ORDER: readonly FlagColor[] = [
  "red",
  "blue",
  "green",
  "yellow",
  "white",
  "black",
  "orange",
  "purple",
];

const r = "red" as const;
const w = "white" as const;
const b = "blue" as const;
const g = "green" as const;
const y = "yellow" as const;
const k = "black" as const;
const o = "orange" as const;

/** Tags by ISO 3166-1 alpha-2 code. */
export const FLAG_COLORS: Readonly<Record<string, readonly FlagColor[]>> = {
  AF: [w, k],                          // White field, black text
  AL: [r, k],                          // Red field, black eagle
  DZ: [g, w, r],
  AD: [b, y, r],
  AO: [r, k, y],
  AG: [r, w, b, y, k],
  AR: [b, w, y],
  AM: [r, b, o],
  AU: [b, w, r],
  AT: [r, w],
  AZ: [b, r, g, w],
  BS: [b, y, k],
  BH: [r, w],
  BD: [g, r],
  BB: [b, y, k],
  BY: [r, g, w],
  BE: [k, y, r],
  BZ: [b, r, w, g, y],
  BJ: [g, y, r],
  BT: [y, o, w],
  BO: [r, y, g],
  BA: [b, y, w],
  BW: [b, w, k],
  BR: [g, y, b, w],
  BN: [y, w, k, r],
  BG: [w, g, r],
  BF: [r, g, y],
  BI: [r, w, g],
  CV: [b, w, r, y],
  KH: [b, r, w],
  CM: [g, r, y],
  CA: [r, w],
  CF: [b, w, g, y, r],
  TD: [b, y, r],
  CL: [w, b, r],
  CN: [r, y],
  CO: [y, b, r],
  KM: [y, w, r, b, g],
  CG: [g, y, r],
  CD: [b, r, y],
  CR: [b, w, r],
  CI: [o, w, g],
  HR: [r, w, b],
  CU: [b, w, r],
  CY: [w, o, g],                       // Island silhouette is orangey
  CZ: [w, r, b],
  DK: [r, w],
  DJ: [b, g, w, r],
  DM: [g, y, k, w, r],
  DO: [b, r, w],
  EC: [y, b, r],
  EG: [r, w, k, y],
  SV: [b, w],
  GQ: [g, w, r, b, y],
  ER: [r, g, b, y],
  EE: [b, k, w],
  SZ: [b, y, r, w, k],
  ET: [g, y, r, b],
  FJ: [b, w, r],
  FI: [w, b],
  FR: [b, w, r],
  GA: [g, y, b],
  GM: [r, b, g, w],
  GE: [w, r],
  DE: [k, r, y],
  GH: [r, y, g, k],
  GR: [b, w],
  GD: [r, y, g],
  GT: [b, w, y, g],
  GN: [r, y, g],
  GW: [r, y, g, k],
  GY: [g, y, r, w, k],
  HT: [b, r, w, g, y],
  HN: [b, w],
  HU: [r, w, g],
  IS: [b, w, r],
  IN: [o, w, g, b],
  ID: [r, w],
  IR: [g, w, r],
  IQ: [r, w, k, g],
  IE: [g, w, o],
  IL: [w, b],
  IT: [g, w, r],
  JM: [g, y, k],
  JP: [w, r],
  JO: [k, w, g, r],
  KZ: [b, y],
  KE: [k, r, g, w],
  KI: [r, y, b, w],
  KP: [b, r, w],
  KR: [w, r, b, k],
  KW: [g, w, r, k],
  KG: [r, y],
  LA: [r, b, w],
  LV: [r, w],
  LB: [r, w, g],
  LS: [b, w, g, k],
  LR: [r, w, b],
  LY: [r, k, g, w],
  LI: [b, r, y],
  LT: [y, g, r],
  LU: [r, w, b],
  MG: [w, r, g],
  MW: [k, r, g],
  MY: [r, w, b, y],
  MV: [r, g, w],
  ML: [g, y, r],
  MT: [w, r],
  MH: [b, w, o],
  MR: [g, y, r],
  MU: [r, b, y, g],
  MX: [g, w, r],
  FM: [b, w],
  MD: [b, y, r],
  MC: [r, w],
  MN: [r, b, y],
  ME: [r, y, k],
  MA: [r, g],
  MZ: [g, w, k, y, r],
  MM: [y, g, r, w],
  NA: [b, r, g, w, y],
  NR: [b, y, w],
  NP: [r, b, w],
  NL: [r, w, b],
  NZ: [b, r, w],
  NI: [b, w, y],
  NE: [o, w, g],
  NG: [g, w],
  MK: [r, y],
  NO: [r, w, b],
  OM: [w, r, g],
  PK: [g, w],
  PW: [b, y],
  PA: [r, w, b],
  PG: [r, k, y, w],
  PY: [r, w, b],
  PE: [r, w],
  PH: [b, r, w, y],
  PL: [w, r],
  PT: [g, r, y, b, w],
  QA: [w, r],                          // Maroon counted as red
  RO: [b, y, r],
  RU: [w, b, r],
  RW: [b, y, g],
  KN: [g, r, y, k, w],
  LC: [b, k, y, w],
  VC: [b, y, g],
  WS: [r, b, w],
  SM: [w, b, y, g],
  ST: [g, y, r, k],
  SA: [g, w],
  SN: [g, y, r],
  RS: [r, b, w, y],
  SC: [b, y, r, w, g],
  SL: [g, w, b],
  SG: [r, w],
  SK: [w, b, r],
  SI: [w, b, r, y],
  SB: [b, y, g, w],
  SO: [b, w],
  ZA: [g, b, y, w, r, k],              // The full six-colour rainbow
  SS: [k, r, g, w, y, b],
  ES: [r, y],
  LK: [y, r, g, o, k],
  SD: [r, w, k, g],
  SR: [g, w, r, y],
  SE: [b, y],
  CH: [r, w],
  SY: [r, w, k, g],
  TJ: [r, w, g, y],
  TZ: [g, y, k, b],
  TH: [r, w, b],
  TL: [r, k, y, w],
  TG: [g, y, r, w],
  TO: [r, w],
  TT: [r, w, k],
  TN: [r, w],
  TR: [r, w],
  TM: [g, w, r],
  TV: [b, w, r, y],
  UG: [k, y, r, w],
  UA: [b, y],
  AE: [r, g, w, k],
  GB: [b, w, r],
  US: [r, w, b],
  UY: [b, w, y],
  UZ: [b, w, g, r],
  VU: [r, g, k, y],
  VA: [y, w, r],
  VE: [y, b, r, w],
  VN: [r, y],
  YE: [r, w, k],
  ZM: [g, r, k, o],
  ZW: [g, y, r, k, w],

  // UN observer states
  PS: [k, w, g, r],
};
