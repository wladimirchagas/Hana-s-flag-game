/**
 * Flag "families" — groupings based on a shared visual motif or
 * creation-story, used by the flag grid's "By family" filter.
 *
 * These are the most-cited vexillological lineages: groups of flags
 * whose colour scheme / layout / heraldic origin trace to a common
 * inspiration (a revolutionary banner, a colonial ensign, a pan-
 * regional movement, etc.). Same flag can belong to multiple families
 * — South Sudan, for example, blends Pan-African + Pan-Arab cues, and
 * is tagged with both.
 *
 * Categories (in display order):
 *
 *   1. Pan-African
 *      Red / yellow / green (Ethiopia, 1897, never colonised; Marcus
 *      Garvey's red-black-green) — adopted by Ghana in 1957 and by
 *      most newly-independent sub-Saharan states thereafter.
 *
 *   2. Pan-Arab
 *      Black / white / green / red — the 1916 Arab Revolt flag (Hijaz)
 *      and its descendants: Jordan, Palestine, Iraq, Syria, Egypt,
 *      Sudan, Yemen, Kuwait, UAE, Libya.
 *
 *   3. Pan-Slavic
 *      White / blue / red horizontal tricolour — codified at the 1848
 *      Prague Slavic Congress, modelled on the Russian flag. Russia
 *      itself, Serbia, Slovakia, Slovenia, Croatia, Czechia.
 *
 *   4. Nordic Cross
 *      Off-centre Christian cross — Denmark's Dannebrog (13th c.) is
 *      the prototype, copied by Sweden, Norway, Finland, Iceland.
 *
 *   5. Union Jack canton
 *      British colonial blue / red ensign with the Union Jack in the
 *      upper-hoist canton — Australia, New Zealand, Fiji, Tuvalu.
 *
 *   6. Communist heritage
 *      Red field with a revolutionary symbol (star, hammer & sickle).
 *      China, Vietnam, North Korea, Laos. (Cuba is excluded — its flag
 *      predates the 1959 revolution.)
 *
 *   7. Gran Colombia
 *      Yellow / blue / red horizontal tricolour — Francisco de
 *      Miranda's 1806 banner adopted by Simón Bolívar's republic.
 *      Inherited by Colombia, Venezuela, Ecuador.
 *
 *   8. Central American Federation
 *      Blue / white / blue horizontal tricolour — flag of the United
 *      Provinces of Central America (1823–1841), still recognisable
 *      in Honduras, Nicaragua, El Salvador.
 */
export type FlagFamily =
  | "pan-african"
  | "pan-arab"
  | "pan-slavic"
  | "nordic-cross"
  | "british-canton"
  | "communist"
  | "gran-colombia"
  | "central-american-federation";

export const FLAG_FAMILY_LABELS: Readonly<Record<FlagFamily, string>> = {
  "pan-african":                  "Pan-African",
  "pan-arab":                     "Pan-Arab",
  "pan-slavic":                   "Pan-Slavic",
  "nordic-cross":                 "Nordic Cross",
  "british-canton":               "Union Jack canton",
  "communist":                    "Communist heritage",
  "gran-colombia":                "Gran Colombia",
  "central-american-federation":  "Central American Federation",
};

/** Canonical display order for the "By family" group headings. */
export const FLAG_FAMILY_ORDER: readonly FlagFamily[] = [
  "pan-african",
  "pan-arab",
  "pan-slavic",
  "nordic-cross",
  "british-canton",
  "communist",
  "gran-colombia",
  "central-american-federation",
];

/** Per-country family tags. Keyed on ISO 3166-1 alpha-2. */
export const FLAG_FAMILIES: Readonly<Record<string, readonly FlagFamily[]>> = {
  // Pan-African — Ethiopian / Garveyist red-yellow-green (sometimes
  // with black) adopted by post-1957 newly independent states.
  ET: ["pan-african"], // Ethiopia is the source
  GH: ["pan-african"], // Ghana 1957 first non-Ethiopian adopter
  SN: ["pan-african"],
  ML: ["pan-african"],
  GN: ["pan-african"],
  BF: ["pan-african"],
  CM: ["pan-african"],
  TG: ["pan-african"],
  BJ: ["pan-african"],
  CG: ["pan-african"],
  ST: ["pan-african"],
  GW: ["pan-african"],
  ZW: ["pan-african"],
  MZ: ["pan-african"],
  KE: ["pan-african"],
  MW: ["pan-african"],
  KN: ["pan-african"], // Saint Kitts & Nevis (1983) deliberately used pan-African colours

  // Pan-Arab — Hijaz revolt four-colour palette (black/white/green/red).
  JO: ["pan-arab"],
  PS: ["pan-arab"],
  IQ: ["pan-arab"],
  SY: ["pan-arab"],
  EG: ["pan-arab"],
  SD: ["pan-arab"],
  KW: ["pan-arab"],
  YE: ["pan-arab"],
  AE: ["pan-arab"],
  LY: ["pan-arab"],

  // South Sudan blends both lineages (red-black-green pan-African +
  // white/blue Sudanese ensign accents).
  SS: ["pan-african", "pan-arab"],

  // Pan-Slavic — white/blue/red tricolour adopted at 1848 Prague.
  RU: ["pan-slavic"], // Russia is the inspiration source
  RS: ["pan-slavic"],
  SK: ["pan-slavic"],
  SI: ["pan-slavic"],
  HR: ["pan-slavic"],
  CZ: ["pan-slavic"],

  // Nordic Cross.
  DK: ["nordic-cross"], // Dannebrog, the original
  SE: ["nordic-cross"],
  NO: ["nordic-cross"],
  FI: ["nordic-cross"],
  IS: ["nordic-cross"],

  // Union Jack canton — defaced British blue/red ensigns still in use.
  AU: ["british-canton"],
  NZ: ["british-canton"],
  FJ: ["british-canton"],
  TV: ["british-canton"],

  // Communist heritage — red field with revolutionary star / emblem.
  CN: ["communist"],
  VN: ["communist"],
  KP: ["communist"],
  LA: ["communist"],

  // Gran Colombia tricolour (yellow-blue-red horizontal).
  CO: ["gran-colombia"],
  VE: ["gran-colombia"],
  EC: ["gran-colombia"],

  // Central American Federation tricolour (blue-white-blue horizontal).
  HN: ["central-american-federation"],
  NI: ["central-american-federation"],
  SV: ["central-american-federation"],
};
