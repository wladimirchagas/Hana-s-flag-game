/**
 * Era catalogue for the Learn-mode time slider.
 *
 * Two border strategies are supported:
 *  - "modern": render the present-day world-atlas as-is. Used by "Today".
 *  - "spotlight": render the modern world-atlas but GROUP modern countries
 *    into a historical entity (e.g., 15 modern republics → "Soviet Union").
 *    Each group has its own historical name, flag image, and is rendered
 *    as a single coloured region. Modern countries not assigned to any
 *    group keep their modern identity.
 *
 * "spotlight" is honest about its limits: it uses MODERN administrative
 * borders to approximate historical territory. Most useful when an
 * empire mapped cleanly onto whole modern countries (USSR ↔ 15 republics,
 * Yugoslavia ↔ 6 republics, etc.). For empires that split / spanned sub-
 * national boundaries (e.g., Roman Britain — only southern half of modern
 * GB), it's an educational approximation — labelled as such in the UI.
 *
 * Historical flag images live in /public/historical-flags/ and are stored
 * in the repo (no Wikimedia hotlinks).
 */

export type SpotlightGroup = {
  /** Stable id for the historical entity (e.g. "ussr-1990"). */
  id: string;
  /** Display name shown in the dropdown / detail panel. */
  name: string;
  /** Continent label for the panel. */
  continent: string;
  /**
   * Image URL for the entity's flag. Relative to BASE_URL — Vite will
   * resolve under the GitHub Pages subpath.
   */
  flag: string;
  /** Modern ISO-3166-1 alpha-2 codes covered by this entity. */
  modernCodes: readonly string[];
  /** Optional short note about the entity, shown on the detail panel. */
  note?: string;
};

export type BorderStrategy =
  | { kind: "modern" }
  | { kind: "spotlight"; groups: readonly SpotlightGroup[] };

export type Era = {
  /** Stable id (used as React key + URL slug). */
  id: string;
  /** Short label shown on the pill (e.g., "Today", "1990"). */
  label: string;
  /** Year display string (e.g., "117 AD", "~500 BC"). Optional for "Today". */
  year?: string;
  /** One-line educational summary shown under the slider. */
  summary: string;
  /** How to render borders for this era. */
  borders: BorderStrategy;
  /**
   * If true, surface the "borders are simplified for learning" footnote.
   * Set on eras where the spotlight approximation is roughest.
   */
  approximate?: boolean;
};

/* --------------------------------------------------------------------------
 * Era list, oldest → newest. Default selection is the LAST one ("Today").
 * Add more eras here over time — each entry is self-contained.
 * --------------------------------------------------------------------- */

const FLAG = (file: string) => `historical-flags/${file}`;

export const ERAS: readonly Era[] = [
  // ----------------------------------------------------------------------
  // 117 AD — Roman Empire at its territorial peak (Trajan).
  // ----------------------------------------------------------------------
  {
    id: "roman-peak",
    label: "117 AD",
    year: "117 AD",
    summary: "The Roman Empire at its greatest extent under Trajan.",
    approximate: true,
    borders: {
      kind: "spotlight",
      groups: [
        {
          id: "roman-empire-117",
          name: "Roman Empire",
          continent: "Europe / Mediterranean",
          flag: FLAG("roman-empire.png"),
          note: "Capital: Rome. Ruled the entire Mediterranean basin.",
          modernCodes: [
            // Western Europe
            "IT", "FR", "ES", "PT", "GB", "BE", "NL", "LU",
            // Central / SE Europe under Rome
            "CH", "AT", "DE", "HU", "SI", "HR", "BA", "RS", "ME", "AL",
            "MK", "BG", "RO", "GR",
            // Anatolia + Levant + Mesopotamia briefly
            "TR", "CY", "SY", "LB", "IL", "PS", "JO",
            // North Africa
            "EG", "LY", "TN", "DZ", "MA",
            // Microstates
            "MC", "SM", "VA", "AD", "MT",
          ],
        },
        {
          id: "parthia-117",
          name: "Parthian Empire",
          continent: "Western Asia",
          flag: FLAG("parthian-empire.png"),
          note: "Rome's great eastern rival; Arsacid dynasty.",
          modernCodes: ["IR", "IQ", "AF", "TM", "AM"],
        },
        // Note: Han China and the Kushan Empire are intentionally NOT
        // listed for this era. Neither polity used a "flag" in the modern
        // sense, and Wikimedia Commons doesn't have a canonical
        // representative image we can use without invention. They could
        // be added later with proper sourcing.
      ],
    },
  },

  // ----------------------------------------------------------------------
  // 1914 — Eve of World War I.
  // ----------------------------------------------------------------------
  {
    id: "ww1-eve",
    label: "1914",
    year: "1914",
    summary: "Europe on the eve of WWI — the age of great empires.",
    approximate: true,
    borders: {
      kind: "spotlight",
      groups: [
        {
          id: "austria-hungary-1914",
          name: "Austria-Hungary",
          continent: "Central Europe",
          flag: FLAG("austria-hungary.png"),
          note: "Dual monarchy of the Habsburgs; capital Vienna / Budapest.",
          modernCodes: ["AT", "HU", "CZ", "SK", "SI", "HR", "BA"],
        },
        {
          id: "ottoman-1914",
          name: "Ottoman Empire",
          continent: "SE Europe / Western Asia",
          flag: FLAG("ottoman-empire.png"),
          note: "Capital: Constantinople. Sultanate ruling Anatolia, Levant, Mesopotamia.",
          modernCodes: ["TR", "SY", "LB", "IL", "PS", "JO", "IQ", "YE"],
        },
        {
          id: "german-empire-1914",
          name: "German Empire",
          continent: "Central Europe",
          flag: FLAG("german-empire.png"),
          note: "Kaiserreich under Wilhelm II.",
          modernCodes: ["DE"],
        },
        {
          id: "russian-empire-1914",
          name: "Russian Empire",
          continent: "Eastern Europe / North Asia",
          flag: FLAG("russian-empire.png"),
          note: "Tsar Nicholas II, on the brink of revolution.",
          modernCodes: [
            "RU", "UA", "BY", "KZ", "UZ", "KG", "TJ", "TM",
            "AZ", "AM", "GE", "MD", "EE", "LV", "LT", "FI",
            "PL",
          ],
        },
      ],
    },
  },

  // ----------------------------------------------------------------------
  // 1990 — End of the Cold War.
  // ----------------------------------------------------------------------
  {
    id: "cold-war-1990",
    label: "1990",
    year: "1990",
    summary: "The Cold War's final year — Soviet Union and Yugoslavia still intact.",
    borders: {
      kind: "spotlight",
      groups: [
        {
          id: "ussr-1990",
          name: "Soviet Union",
          continent: "Eastern Europe / North Asia",
          flag: FLAG("ussr.png"),
          note: "Union of Soviet Socialist Republics, 1922–1991.",
          modernCodes: [
            "RU", "UA", "BY", "KZ", "UZ", "KG", "TJ", "TM",
            "AZ", "AM", "GE", "MD", "EE", "LV", "LT",
          ],
        },
        {
          id: "yugoslavia-1990",
          name: "Yugoslavia",
          continent: "SE Europe",
          flag: FLAG("yugoslavia.png"),
          note: "Socialist Federal Republic of Yugoslavia, 1945–1992.",
          modernCodes: ["RS", "HR", "SI", "BA", "ME", "MK"],
        },
        {
          id: "czechoslovakia-1990",
          name: "Czechoslovakia",
          continent: "Central Europe",
          flag: FLAG("czechoslovakia.png"),
          note: "Federal Republic of Czechs and Slovaks, 1918–1992.",
          modernCodes: ["CZ", "SK"],
        },
      ],
    },
  },

  // ----------------------------------------------------------------------
  // Today — modern world (DEFAULT).
  // ----------------------------------------------------------------------
  {
    id: "today",
    label: "Today",
    summary: "The modern world: 195 UN member states.",
    borders: { kind: "modern" },
  },
];

/** Default selected era when the user lands on /learn. */
export const DEFAULT_ERA_ID: Era["id"] = "today";

export function getEra(id: string): Era {
  return ERAS.find((e) => e.id === id) ?? ERAS[ERAS.length - 1]!;
}
