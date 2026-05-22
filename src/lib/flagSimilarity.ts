/**
 * Flag "similarity" groups — clusters of flags that are frequently
 * confused with each other, based on visual likeness rather than
 * shared historical origin.
 *
 * Unlike the "families" taxonomy (which traces political / ideological
 * lineage), similarity groups are curated from vexillology forums,
 * Reddit r/vexillology, Quora, Britannica, WorldAtlas, World Population
 * Review, Sporcle, FOTW, and the Vexillology Wiki: the flags people
 * consistently say are hardest to tell apart.
 *
 * A flag can belong to multiple similarity groups (e.g. Australia
 * appears in both "near-twins" and "blue-ensign").
 *
 * Groups (in display order):
 *
 *   1. near-twins
 *      The most-discussed "doppelgänger" pairs — flags so close that
 *      even geography buffs mix them up regularly:
 *        • Monaco / Indonesia — both horizontal red-over-white; differ
 *          only in aspect ratio and shade.
 *        • Poland — reversed Monaco/Indonesia (white over red).
 *        • Romania / Chad — virtually identical vertical blue-yellow-red
 *          tricolours; brought to the UN in 2004.
 *        • Andorra / Moldova — same blue-yellow-red with central COA.
 *        • Ireland / Côte d'Ivoire — perfect mirrors (green-white-orange
 *          vs orange-white-green); confused at 2018 IAAF Championships.
 *        • Guinea / Mali / Senegal — near-identical vertical RYG family
 *          (Mali = reversed Guinea; Senegal = Mali + star).
 *        • New Zealand / Australia — near-identical Blue Ensigns;
 *          ranked among the top-5 most confused flag pairs in polls.
 *        • Palestine / Jordan — both black-white-green horizontal with
 *          red hoist triangle; Jordan adds a white star.
 *
 *   2. red-white-black
 *      Arab Liberation Flag palette: red / white / black horizontal
 *      bands (sometimes with a coloured hoist triangle or central
 *      emblem). Egypt, Syria, Iraq, Yemen, and Sudan all share this
 *      base layout and are routinely confused in quizzes.
 *
 *   3. gran-colombia
 *      Yellow-blue-red horizontal tricolour inherited from Simón
 *      Bolívar's Gran Colombia. Colombia, Venezuela, and Ecuador are
 *      identical in stripe order; Bolivia (red-yellow-green) is
 *      regularly confused with the group.
 *
 *   4. nordic-cross
 *      The five Scandinavian flags share an off-centre Nordic cross on
 *      a plain field. Norway vs Iceland (both three-colour crosses,
 *      same palette in opposite arrangement) is a top confusion pair.
 *
 *   5. blue-ensign
 *      British colonial Blue Ensigns: Union Jack in the upper-hoist
 *      canton on a dark-blue field. Australia vs New Zealand is the
 *      flagship confusion; Fiji and Tuvalu round out the group.
 *
 *   6. red-white-blue
 *      The Pan-Slavic white-blue-red palette and its close cousins.
 *      Russia / Netherlands / Luxembourg are nearly identical horizontal
 *      tricolours; France is the same three colours arranged vertically.
 *      Croatia, Slovakia, Slovenia, Serbia, and Czechia add coats of
 *      arms to the same stripe pattern.
 *
 *   7. crescent-star
 *      Flags featuring a crescent moon and one or more stars — the
 *      dominant visual signature of Islamic-heritage flags. Turkey,
 *      Tunisia, Algeria, Pakistan, Libya, Azerbaijan, Turkmenistan,
 *      Uzbekistan, Malaysia, Comoros, Mauritania, Maldives, and
 *      Singapore are regularly lumped together in "which flag?" quizzes.
 *
 *   8. green-yellow-red
 *      The Pan-African palette (sometimes with black) used by dozens of
 *      sub-Saharan states. Burkina Faso, Cameroon, Benin, Togo, Congo,
 *      Guinea, Mali, Senegal, Ghana, Ethiopia, Guinea-Bissau, São Tomé,
 *      and Zimbabwe are routinely confused in flag trivia.
 *
 *   9. stripes-canton
 *      Horizontal red-and-white stripes with a blue upper-hoist canton.
 *      The USA flag's direct descendants: Liberia (founded by freed
 *      American slaves, 11 stripes + single star) and Malaysia
 *      (14 stripes + crescent and star). Discussed as a trio on every
 *      "surprising flag similarities" list.
 *
 *  10. red-white-green
 *      The same three colours — red, white, and green — used in
 *      different orders. Hungary (red-white-green, plain), Iran
 *      (green-white-red, + emblem), Bulgaria (white-green-red), Italy
 *      (green-white-red, vertical), and Mexico (green-white-red,
 *      vertical + large COA) are frequently confused with each other.
 *
 *  11. serrated
 *      Vertical white-and-dark-red bicolours with a serrated / zigzag
 *      border separating the two halves. Bahrain (5 serrated points,
 *      brighter red, 1:2) and Qatar (9 points, dark maroon, 11:28) are
 *      the only two sovereign flags with this distinctive pattern.
 */
export type FlagSimilarity =
  | "near-twins"
  | "red-white-black"
  | "gran-colombia"
  | "nordic-cross"
  | "blue-ensign"
  | "red-white-blue"
  | "crescent-star"
  | "green-yellow-red"
  | "stripes-canton"
  | "red-white-green"
  | "serrated";

export const FLAG_SIMILARITY_LABELS: Readonly<Record<FlagSimilarity, string>> =
  {
    "near-twins":      "Near-twins",
    "red-white-black": "Red-White-Black",
    "gran-colombia":   "Gran Colombia palette",
    "nordic-cross":    "Nordic Cross",
    "blue-ensign":     "Blue Ensign",
    "red-white-blue":  "Red-White-Blue",
    "crescent-star":   "Crescent & Star",
    "green-yellow-red":"Green-Yellow-Red",
    "stripes-canton":  "Stripes & Canton",
    "red-white-green": "Red-White-Green",
    "serrated":        "Serrated bicolour",
  };

/** Canonical display order for the "By similarity" group headings. */
export const FLAG_SIMILARITY_ORDER: readonly FlagSimilarity[] = [
  "near-twins",
  "red-white-black",
  "gran-colombia",
  "nordic-cross",
  "blue-ensign",
  "red-white-blue",
  "crescent-star",
  "green-yellow-red",
  "stripes-canton",
  "red-white-green",
  "serrated",
];

/** Per-country similarity tags. Keyed on ISO 3166-1 alpha-2. */
export const FLAG_SIMILARITIES: Readonly<
  Record<string, readonly FlagSimilarity[]>
> = {
  // ── Near-twins ────────────────────────────────────────────────────────────
  // Monaco / Indonesia: both horizontal red-over-white bicolours
  MC: ["near-twins"],
  ID: ["near-twins"],
  // Poland: reversed (white-over-red) — all three are grouped together
  // on every "similar flags" forum thread.
  PL: ["near-twins"],
  // Romania / Chad: virtually identical vertical blue-yellow-red tricolours
  RO: ["near-twins"],
  TD: ["near-twins"],
  // Andorra / Moldova: same blue-yellow-red vertical layout, differ only
  // in their central coats of arms.
  AD: ["near-twins"],
  MD: ["near-twins"],
  // Ireland / Côte d'Ivoire: perfect mirror images
  IE: ["near-twins"],
  CI: ["near-twins"],
  // Guinea / Mali / Senegal: near-identical vertical green-yellow-red family
  GN: ["near-twins", "green-yellow-red"],
  ML: ["near-twins", "green-yellow-red"],
  SN: ["near-twins", "green-yellow-red"],
  // New Zealand / Australia: near-identical Blue Ensigns
  NZ: ["near-twins", "blue-ensign"],
  AU: ["near-twins", "blue-ensign"],
  // Palestine / Jordan: both horizontal black-white-green + red triangle
  PS: ["near-twins"],
  JO: ["near-twins"],

  // ── Red-White-Black ────────────────────────────────────────────────────────
  // Arab Liberation palette horizontal tricolours
  EG: ["red-white-black"],
  SY: ["red-white-black"],
  IQ: ["red-white-black"],
  YE: ["red-white-black"],
  SD: ["red-white-black"],

  // ── Gran Colombia palette ─────────────────────────────────────────────────
  CO: ["gran-colombia"],
  EC: ["gran-colombia"],
  VE: ["gran-colombia"],
  // Bolivia's red-yellow-green is a classic quiz confusion with the group
  BO: ["gran-colombia"],

  // ── Nordic Cross ───────────────────────────────────────────────────────────
  DK: ["nordic-cross"],
  NO: ["nordic-cross"],
  SE: ["nordic-cross"],
  FI: ["nordic-cross"],
  IS: ["nordic-cross"],

  // ── Blue Ensign ────────────────────────────────────────────────────────────
  // NZ & AU also tagged near-twins above
  FJ: ["blue-ensign"],
  TV: ["blue-ensign"],

  // ── Red-White-Blue ─────────────────────────────────────────────────────────
  // Russia / Netherlands / Luxembourg: nearly identical horizontal tricolours
  RU: ["red-white-blue"],
  NL: ["red-white-blue"],
  LU: ["red-white-blue"],
  // France: same palette arranged vertically — consistently appears on
  // "similar to Netherlands/Russia" lists.
  FR: ["red-white-blue"],
  // Pan-Slavic group sharing the same stripe base
  HR: ["red-white-blue"],
  SK: ["red-white-blue"],
  SI: ["red-white-blue"],
  RS: ["red-white-blue"],
  CZ: ["red-white-blue"],
  // Paraguay: red-white-blue horizontal stripes, added to confusion pool
  PY: ["red-white-blue"],

  // ── Crescent & Star ────────────────────────────────────────────────────────
  TR: ["crescent-star"],
  TN: ["crescent-star"],
  DZ: ["crescent-star"],
  PK: ["crescent-star"],
  LY: ["crescent-star"],
  AZ: ["crescent-star"],
  TM: ["crescent-star"],
  UZ: ["crescent-star"],
  MY: ["crescent-star", "stripes-canton"],
  KM: ["crescent-star"],
  MR: ["crescent-star"],
  MV: ["crescent-star"],
  SG: ["crescent-star"],

  // ── Green-Yellow-Red ──────────────────────────────────────────────────────
  // GN, ML, SN already tagged above; remaining Pan-African states:
  ET: ["green-yellow-red"],
  GH: ["green-yellow-red"],
  CM: ["green-yellow-red"],
  BF: ["green-yellow-red"],
  BJ: ["green-yellow-red"],
  TG: ["green-yellow-red"],
  CG: ["green-yellow-red"],
  GW: ["green-yellow-red"],
  ST: ["green-yellow-red"],
  ZW: ["green-yellow-red"],

  // ── Stripes & Canton ─────────────────────────────────────────────────────
  // Horizontal red-and-white stripes + blue upper-hoist canton
  US: ["stripes-canton"],
  LR: ["stripes-canton"],
  // MY already tagged crescent-star above; adding stripes-canton there

  // ── Red-White-Green ───────────────────────────────────────────────────────
  // Same three colours, different orders / orientations
  HU: ["red-white-green"],
  IR: ["red-white-green"],
  BG: ["red-white-green"],
  // Italy and Mexico share the vertical green-white-red layout (Mexico
  // adds a large COA; both are confused at a distance)
  IT: ["red-white-green"],
  MX: ["red-white-green"],

  // ── Serrated bicolour ─────────────────────────────────────────────────────
  // The only two sovereign flags with a serrated/zigzag white-and-red border
  BH: ["serrated"],
  QA: ["serrated"],
};
