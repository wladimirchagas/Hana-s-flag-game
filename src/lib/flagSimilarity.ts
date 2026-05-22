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
 * A flag can belong to multiple similarity groups (e.g. Guinea appears
 * in both "ryg-vertical" and "green-yellow-red").
 *
 * Groups (in display order):
 *
 *   1. near-twins
 *      Palestine / Jordan — both horizontal black-white-green with a
 *      red hoist triangle; Jordan adds a small white star inside.
 *
 *   2. vertical-byr
 *      Vertical Blue-Yellow-Red tricolours: Romania and Chad are
 *      virtually identical (brought to the UN in 2004); Andorra and
 *      Moldova use the same stripe order but add central coats of arms.
 *
 *   3. green-white-orange
 *      Ireland and Côte d'Ivoire are perfect mirror images — green-
 *      white-orange vs orange-white-green. Confused at the 2018 IAAF
 *      World Indoor Championships when officials hung Ireland's flag
 *      for Ivorian winner Murielle Ahoure.
 *
 *   4. red-white-bicolor
 *      Horizontal red-and-white bicolours with no other field colours:
 *      Monaco (red over white), Indonesia (red over white), Poland
 *      (white over red — the mirror), and Singapore (red over white
 *      with a crescent canton). Grouped together on virtually every
 *      "similar flags" list.
 *
 *   5. ryg-vertical
 *      Vertical Red-Yellow-Green (or Green-Yellow-Red) tricolours:
 *      Guinea (red / yellow / green), Mali (green / yellow / red —
 *      the mirror of Guinea), and Senegal (green / yellow / red + star,
 *      virtually identical to Mali). One of the most-cited quiz triplets.
 *
 *   6. red-white-black
 *      Arab Liberation Flag palette: red / white / black horizontal
 *      bands (sometimes with a coloured hoist triangle or central
 *      emblem). Egypt, Syria, Iraq, Yemen, and Sudan all share this
 *      base layout and are routinely confused in quizzes.
 *
 *   7. gran-colombia
 *      Yellow-blue-red horizontal tricolour inherited from Simón
 *      Bolívar's Gran Colombia. Colombia, Venezuela, and Ecuador are
 *      identical in stripe order; Bolivia (red-yellow-green) is
 *      regularly confused with the group.
 *
 *   8. nordic-cross
 *      The five Scandinavian flags share an off-centre Nordic cross on
 *      a plain field. Norway vs Iceland (both three-colour crosses,
 *      same palette in opposite arrangement) is a top confusion pair.
 *
 *   9. blue-ensign
 *      British colonial Blue Ensigns: Union Jack in the upper-hoist
 *      canton on a dark-blue field. Australia vs New Zealand is the
 *      flagship confusion; Fiji and Tuvalu round out the group.
 *
 *  10. red-white-blue-h
 *      Horizontal tricolours combining red, white, and blue stripes.
 *      Russia, Netherlands, and Luxembourg are nearly identical;
 *      Croatia, Slovakia, Slovenia, Serbia, and Paraguay share the same
 *      horizontal stripe pattern with coats of arms on top.
 *
 *  11. crescent-star
 *      Flags featuring a crescent moon and one or more stars — the
 *      dominant visual signature of Islamic-heritage flags. Turkey,
 *      Tunisia, Algeria, Pakistan, Libya, Azerbaijan, Turkmenistan,
 *      Uzbekistan, Malaysia, Comoros, Mauritania, Maldives, and
 *      Singapore are regularly lumped together in "which flag?" quizzes.
 *
 *  12. green-yellow-red
 *      The Pan-African palette (sometimes with black) used by dozens of
 *      sub-Saharan states. Burkina Faso, Cameroon, Benin, Togo, Congo,
 *      Guinea, Mali, Senegal, Ghana, Ethiopia, Guinea-Bissau, São Tomé,
 *      and Zimbabwe are routinely confused in flag trivia.
 *
 *  13. stripes-canton
 *      Horizontal red-and-white stripes with a blue upper-hoist canton.
 *      The USA flag's direct descendants: Liberia (founded by freed
 *      American slaves, 11 stripes + single star) and Malaysia
 *      (14 stripes + crescent and star). Discussed as a trio on every
 *      "surprising flag similarities" list.
 *
 *  14. red-white-green
 *      The same three colours — red, white, and green — used in
 *      different orders. Hungary (red-white-green, plain), Iran
 *      (green-white-red, + emblem), Bulgaria (white-green-red), Italy
 *      (green-white-red, vertical), and Mexico (green-white-red,
 *      vertical + large COA) are frequently confused with each other.
 *
 *  15. red-crescent-star
 *      Turkey and Tunisia both feature a white crescent and star on a
 *      plain red field — Turkey directly, Tunisia inside a white circle.
 *      Among the most commonly mixed-up Islamic-flag pairs in quizzes.
 *
 *  16. serrated
 *      Vertical white-and-dark-red bicolours with a serrated / zigzag
 *      border separating the two halves. Bahrain (5 serrated points,
 *      brighter red, 1:2) and Qatar (9 points, dark maroon, 11:28) are
 *      the only two sovereign flags with this distinctive pattern.
 */
export type FlagSimilarity =
  | "near-twins"
  | "vertical-byr"
  | "green-white-orange"
  | "red-white-bicolor"
  | "ryg-vertical"
  | "red-white-black"
  | "gran-colombia"
  | "nordic-cross"
  | "blue-ensign"
  | "red-white-blue-h"
  | "green-yellow-red"
  | "stripes-canton"
  | "red-white-green"
  | "red-crescent-star"
  | "serrated";

export const FLAG_SIMILARITY_LABELS: Readonly<Record<FlagSimilarity, string>> =
  {
    "near-twins":        "Near-twins",
    "vertical-byr":      "Vertical Blue-Yellow-Red",
    "green-white-orange": "Green, White & Orange",
    "red-white-bicolor": "Red & White bicolour",
    "ryg-vertical":      "Vertical Red-Yellow-Green",
    "red-white-black":   "Red-White-Black",
    "gran-colombia":     "Gran Colombia palette",
    "nordic-cross":      "Nordic Cross",
    "blue-ensign":       "Blue Ensign",
    "red-white-blue-h":  "Red-White-Blue horizontal",
    "green-yellow-red":  "Green-Yellow-Red",
    "stripes-canton":    "Stripes & Canton",
    "red-white-green":   "Red-White-Green",
    "red-crescent-star": "Red field, crescent & star",
    "serrated":          "Serrated bicolour",
  };

/** Canonical display order for the "By similarity" group headings. */
export const FLAG_SIMILARITY_ORDER: readonly FlagSimilarity[] = [
  "near-twins",
  "vertical-byr",
  "green-white-orange",
  "red-white-bicolor",
  "ryg-vertical",
  "red-white-black",
  "gran-colombia",
  "nordic-cross",
  "blue-ensign",
  "red-white-blue-h",
  "green-yellow-red",
  "stripes-canton",
  "red-white-green",
  "red-crescent-star",
  "serrated",
];

/** Per-country similarity tags. Keyed on ISO 3166-1 alpha-2. */
export const FLAG_SIMILARITIES: Readonly<
  Record<string, readonly FlagSimilarity[]>
> = {
  // ── Near-twins ────────────────────────────────────────────────────────────
  // Palestine / Jordan: both horizontal black-white-green + red triangle
  PS: ["near-twins"],
  JO: ["near-twins"],

  // ── Vertical Blue-Yellow-Red ──────────────────────────────────────────────
  // Romania / Chad: virtually identical; Andorra / Moldova add COA
  RO: ["vertical-byr"],
  TD: ["vertical-byr"],
  AD: ["vertical-byr"],
  MD: ["vertical-byr"],

  // ── Green, White & Orange ─────────────────────────────────────────────────
  // Ireland / Côte d'Ivoire: perfect mirror images
  IE: ["green-white-orange"],
  CI: ["green-white-orange"],

  // ── Red & White bicolour ──────────────────────────────────────────────────
  // Horizontal red-and-white with no other field colour
  MC: ["red-white-bicolor"],
  ID: ["red-white-bicolor"],
  PL: ["red-white-bicolor"],
  SG: ["red-white-bicolor"],

  // ── Vertical Red-Yellow-Green ─────────────────────────────────────────────
  // Guinea / Mali / Senegal: near-identical vertical tricolours
  GN: ["ryg-vertical", "green-yellow-red"],
  ML: ["ryg-vertical", "green-yellow-red"],
  SN: ["ryg-vertical", "green-yellow-red"],

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

  // ── Nordic Cross ───────────────────────────────────────────────────────────
  DK: ["nordic-cross"],
  NO: ["nordic-cross"],
  SE: ["nordic-cross"],
  FI: ["nordic-cross"],
  IS: ["nordic-cross"],

  // ── Blue Ensign ────────────────────────────────────────────────────────────
  AU: ["blue-ensign"],
  NZ: ["blue-ensign"],
  FJ: ["blue-ensign"],
  TV: ["blue-ensign"],

  // ── Red-White-Blue horizontal ─────────────────────────────────────────────
  RU: ["red-white-blue-h"],
  NL: ["red-white-blue-h"],
  LU: ["red-white-blue-h"],
  HR: ["red-white-blue-h"],
  SK: ["red-white-blue-h"],
  SI: ["red-white-blue-h"],
  RS: ["red-white-blue-h"],
  PY: ["red-white-blue-h"],

  MY: ["stripes-canton"],

  // ── Green-Yellow-Red ──────────────────────────────────────────────────────
  // GN, ML, SN already tagged ryg-vertical above; remaining Pan-African:
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
  US: ["stripes-canton"],
  LR: ["stripes-canton"],

  // ── Red-White-Green ───────────────────────────────────────────────────────
  HU: ["red-white-green"],
  IR: ["red-white-green"],
  BG: ["red-white-green"],
  IT: ["red-white-green"],
  MX: ["red-white-green"],

  // ── Red field, crescent & star ────────────────────────────────────────────
  TR: ["red-crescent-star"],
  TN: ["red-crescent-star"],

  // ── Serrated bicolour ─────────────────────────────────────────────────────
  BH: ["serrated"],
  QA: ["serrated"],
};
