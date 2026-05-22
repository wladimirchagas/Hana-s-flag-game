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
 *   1. bwg-red-accent
 *      Palestine, Jordan, and UAE — all horizontal black-white-green
 *      flags with a red element on the hoist side. Palestine and Jordan
 *      use a red triangle; UAE has a solid red vertical stripe.
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
 *   5. arab-palette
 *      The Pan-Arab colour palette: red, white, black, and green in
 *      varying combinations. Egypt, Syria, Iraq, Yemen, and Sudan share
 *      the red/white/black horizontal base; Sudan and Syria add green
 *      accents; Kuwait's horizontal stripes include all four colours.
 *      Routinely confused in quizzes.
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
 *  16. blue-white
 *      Flags whose palette is dominated by light blue and white, with
 *      no other significant colours. Argentina and Uruguay share the
 *      sky-blue / white horizontal band layout; El Salvador, Honduras,
 *      Nicaragua, and Guatemala all derive from the Central American
 *      Federation's blue-white-blue tricolour; Botswana uses light blue,
 *      white, and a thin black band.
 *
 *  17. red-white-cross
 *      Switzerland (white cross centred on a red field), Tonga (red
 *      field with a white canton containing a red cross), and Georgia
 *      (white field with a large red cross and four smaller red crosses)
 *      all feature a bold red-and-white cross as the dominant motif.
 *
 *  18. green-blue
 *      Flags whose field is shared between green and blue with no other
 *      dominant colour. Sierra Leone (green/white/blue horizontal),
 *      Gabon (green/yellow/blue horizontal), and Djibouti (blue/green
 *      halves with a white triangle) are regularly confused in quizzes.
 *
 *  19. hoist-stripe
 *      Flags with a single vertical stripe on the hoist side alongside
 *      horizontal colour bands on the fly. Oman (red hoist stripe +
 *      white/red/green bands), Madagascar (white hoist stripe +
 *      red/green stacked halves), Benin (green hoist stripe + yellow/red
 *      stacked halves), and Lebanon (red/white/red bands + green cedar)
 *      share this distinctive layout.
 *
 *  20. saffron-white-green
 *      India (saffron / white / green horizontal tricolour + blue
 *      Ashoka chakra) and Niger (orange / white / green + orange
 *      central disc) share the same three-colour palette and a central
 *      circular symbol; a commonly cited quiz confusion pair.
 *
 *  21. red-yellow-green-h
 *      Bolivia (red / yellow / green horizontal, + coat of arms) and
 *      Ghana (red / gold / green horizontal + black star) share the
 *      same horizontal red-yellow-green stripe order and are frequently
 *      confused despite the different central symbols.
 *
 *  22. red-field-star
 *      China (red field + five yellow stars) and Vietnam (red field +
 *      single large yellow star) both feature a plain red background
 *      with prominent yellow star(s) — the most-cited "communist flag"
 *      confusion pair in quizzes.
 *
 *  23. serrated
 *      Vertical white-and-dark-red bicolours with a serrated / zigzag
 *      border separating the two halves. Bahrain (5 serrated points,
 *      brighter red, 1:2) and Qatar (9 points, dark maroon, 11:28) are
 *      the only two sovereign flags with this distinctive pattern.
 */
export type FlagSimilarity =
  | "bwg-red-accent"
  | "vertical-byr"
  | "green-white-orange"
  | "red-white-bicolor"
  | "arab-palette"
  | "gran-colombia"
  | "nordic-cross"
  | "blue-ensign"
  | "red-white-blue-h"
  | "green-yellow-red"
  | "stripes-canton"
  | "red-white-green"
  | "red-crescent-star"
  | "blue-white"
  | "red-white-cross"
  | "green-blue"
  | "hoist-stripe"
  | "red-white-red"
  | "blue-stars-stripe"
  | "disc-on-field"
  | "shahada"
  | "saffron-white-green"
  | "red-yellow-green-h"
  | "red-field-star"
  | "serrated";

export const FLAG_SIMILARITY_LABELS: Readonly<Record<FlagSimilarity, string>> =
  {
    "bwg-red-accent":        "Black, White & Green with Red Accent",
    "vertical-byr":      "Vertical Blue-Yellow-Red",
    "green-white-orange": "Green, White & Orange",
    "red-white-bicolor": "Red & White bicolour",
    "arab-palette":   "Arab palette",
    "gran-colombia":     "Gran Colombia palette",
    "nordic-cross":      "Nordic Cross",
    "blue-ensign":       "Blue Ensign",
    "red-white-blue-h":  "Red-White-Blue horizontal",
    "green-yellow-red":  "Green-Yellow-Red",
    "stripes-canton":    "Stripes & Canton",
    "red-white-green":   "Red-White-Green",
    "red-crescent-star": "Red field, crescent & star",
    "blue-white":        "Blue & White",
    "red-white-cross":   "Red & White cross",
    "green-blue":        "Green & Blue",
    "hoist-stripe":      "Vertical hoist stripe",
    "red-white-red":      "Red-White-Red",
    "blue-stars-stripe":  "Blue field with stars & stripe",
    "disc-on-field":      "Plain field with disc",
    "shahada":             "Shahada inscription",
    "saffron-white-green": "Saffron, White & Green",
    "red-yellow-green-h":  "Horizontal Red-Yellow-Green",
    "red-field-star":      "Red field with yellow star",
    "serrated":            "Serrated bicolour",
  };

/** Canonical display order for the "By similarity" group headings. */
export const FLAG_SIMILARITY_ORDER: readonly FlagSimilarity[] = [
  "bwg-red-accent",
  "vertical-byr",
  "green-white-orange",
  "red-white-bicolor",
  "arab-palette",
  "gran-colombia",
  "nordic-cross",
  "blue-ensign",
  "red-white-blue-h",
  "green-yellow-red",
  "stripes-canton",
  "red-white-green",
  "red-crescent-star",
  "blue-white",
  "red-white-cross",
  "green-blue",
  "hoist-stripe",
  "red-white-red",
  "blue-stars-stripe",
  "disc-on-field",
  "shahada",
  "saffron-white-green",
  "red-yellow-green-h",
  "red-field-star",
  "serrated",
];

/**
 * Optional custom display order for members within a similarity group.
 * When present, flags are shown in this exact sequence instead of
 * the default alphabetical sort. Keyed on FlagSimilarity group id;
 * values are ordered arrays of ISO 3166-1 alpha-2 codes.
 */
export const FLAG_SIMILARITY_MEMBER_ORDER: Partial<
  Record<FlagSimilarity, readonly string[]>
> = {
  "vertical-byr":      ["TD", "RO", "AD", "MD"],
  "red-white-bicolor": ["SG", "ID", "MC", "PL", "MT"],
  "arab-palette":      ["EG", "SY", "IQ", "YE", "SD", "KW"],
  "red-white-blue-h":  ["RU", "NL", "LU", "HR", "SK", "SI", "PY", "RS"],
  "red-white-green":   ["HU", "IR", "BG", "IT", "MX", "GQ"],
  "blue-white":        ["BW", "AR", "HN", "NI", "SV", "UY", "GT"],
};

/** Per-country similarity tags. Keyed on ISO 3166-1 alpha-2. */
export const FLAG_SIMILARITIES: Readonly<
  Record<string, readonly FlagSimilarity[]>
> = {
  // ── Near-twins ────────────────────────────────────────────────────────────
  // Palestine / Jordan / UAE: horizontal black-white-green with red on hoist
  PS: ["bwg-red-accent"],
  JO: ["bwg-red-accent"],
  AE: ["bwg-red-accent"],

  // ── Vertical Blue-Yellow-Red ──────────────────────────────────────────────
  // Chad / Romania first (virtually identical); Andorra / Moldova add COA
  TD: ["vertical-byr"],
  RO: ["vertical-byr"],
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
  MT: ["red-white-bicolor"],

  // ── Red-White-Black ────────────────────────────────────────────────────────
  // Arab Liberation palette horizontal tricolours
  EG: ["arab-palette"],
  SY: ["arab-palette"],
  IQ: ["arab-palette"],
  YE: ["arab-palette"],
  SD: ["arab-palette"],
  KW: ["arab-palette"],

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
  GH: ["green-yellow-red", "red-yellow-green-h"],
  CM: ["green-yellow-red"],
  BF: ["green-yellow-red"],
  BJ: ["green-yellow-red", "hoist-stripe"],
  TG: ["green-yellow-red"],
  CG: ["green-yellow-red"],
  GW: ["green-yellow-red"],
  ST: ["green-yellow-red"],

  // ── Stripes & Canton ─────────────────────────────────────────────────────
  US: ["stripes-canton"],
  LR: ["stripes-canton"],

  // ── Red-White-Green ───────────────────────────────────────────────────────
  HU: ["red-white-green"],
  IR: ["red-white-green"],
  BG: ["red-white-green"],
  IT: ["red-white-green"],
  MX: ["red-white-green"],
  GQ: ["red-white-green"],

  // ── Red field, crescent & star ────────────────────────────────────────────
  TR: ["red-crescent-star"],
  TN: ["red-crescent-star"],

  // ── Blue & White ──────────────────────────────────────────────────────────
  AR: ["blue-white"],
  UY: ["blue-white"],
  SV: ["blue-white"],
  HN: ["blue-white"],
  NI: ["blue-white"],
  GT: ["blue-white"],
  BW: ["blue-white"],

  // ── Green & Blue ──────────────────────────────────────────────────────────
  SL: ["green-blue"],
  GA: ["green-blue"],
  DJ: ["green-blue"],

  // ── Red & White cross ─────────────────────────────────────────────────────
  CH: ["red-white-cross"],
  TO: ["red-white-cross"],
  GE: ["red-white-cross"],

  // ── Vertical hoist stripe ─────────────────────────────────────────────────
  OM: ["hoist-stripe"],
  MG: ["hoist-stripe"],
  LB: ["hoist-stripe"],

  // ── Plain field with disc ─────────────────────────────────────────────────
  JP: ["disc-on-field"],
  PW: ["disc-on-field"],
  BD: ["disc-on-field"],

  // ── Blue field with stars & stripe ───────────────────────────────────────
  NR: ["blue-stars-stripe"],
  MH: ["blue-stars-stripe"],
  CV: ["blue-stars-stripe"],

  // ── Red-White-Red ─────────────────────────────────────────────────────────
  AT: ["red-white-red"],
  LV: ["red-white-red"],

  // ── Shahada inscription ───────────────────────────────────────────────────
  SA: ["shahada"],
  AF: ["shahada"],

  // ── Saffron, White & Green ────────────────────────────────────────────────
  // India / Niger: same palette, same horizontal layout, central disc/circle
  IN: ["saffron-white-green"],
  NE: ["saffron-white-green"],

  // ── Horizontal Red-Yellow-Green ───────────────────────────────────────────
  // Bolivia / Ghana: both horizontal red-yellow(gold)-green tricolours
  BO: ["red-yellow-green-h"],

  // ── Red field with yellow star ────────────────────────────────────────────
  // China / Vietnam: plain red field with prominent yellow star(s)
  CN: ["red-field-star"],
  VN: ["red-field-star"],

  // ── Serrated bicolour ─────────────────────────────────────────────────────
  BH: ["serrated"],
  QA: ["serrated"],
};
