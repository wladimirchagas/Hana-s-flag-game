import type { Continent } from "../api/countries";

/** All 195 UN member codes grouped by continent (REST Countries `region`). */
export const CONTINENT_GROUPS: Readonly<Record<Continent, readonly string[]>> = {
  Africa: [
    "DZ", "AO", "BJ", "BW", "BF", "BI", "CV", "CM", "CF", "TD",
    "KM", "CG", "CD", "CI", "DJ", "EG", "GQ", "ER", "SZ", "ET",
    "GA", "GM", "GH", "GN", "GW", "KE", "LS", "LR", "LY", "MG",
    "MW", "ML", "MR", "MU", "MA", "MZ", "NA", "NE", "NG", "RW",
    "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "TZ", "TG",
    "TN", "UG", "ZM", "ZW",
  ],
  Americas: [
    "AG", "AR", "BS", "BB", "BZ", "BO", "BR", "CA", "CL", "CO",
    "CR", "CU", "DM", "DO", "EC", "SV", "GD", "GT", "GY", "HT",
    "HN", "JM", "MX", "NI", "PA", "PY", "PE", "KN", "LC", "VC",
    "SR", "TT", "US", "UY", "VE",
  ],
  Asia: [
    "AF", "AM", "AZ", "BH", "BD", "BT", "BN", "KH", "CN", "CY",
    "TL", "GE", "IN", "ID", "IR", "IQ", "IL", "JP", "JO", "KZ",
    "KP", "KR", "KW", "KG", "LA", "LB", "MY", "MV", "MN", "MM",
    "NP", "OM", "PK", "PH", "PS", "QA", "SA", "SG", "LK", "SY",
    "TJ", "TH", "TM", "TR", "AE", "UZ", "VN", "YE",
  ],
  Europe: [
    "AL", "AD", "AT", "BY", "BE", "BA", "BG", "HR", "CZ", "DK",
    "EE", "FI", "FR", "DE", "GR", "HU", "IS", "IE", "IT", "LV",
    "LI", "LT", "LU", "MT", "MD", "MC", "ME", "NL", "MK", "NO",
    "PL", "PT", "RO", "RU", "SM", "RS", "SK", "SI", "ES", "SE",
    "CH", "UA", "GB", "VA",
  ],
  Oceania: [
    "AU", "FJ", "KI", "MH", "FM", "NR", "NZ", "PW", "PG", "WS",
    "SB", "TO", "TV", "VU",
  ],
};

export const CONTINENT_ORDER: readonly Continent[] = [
  "Africa",
  "Americas",
  "Asia",
  "Europe",
  "Oceania",
];

export type SubregionGroup = {
  label: string;
  continent: Continent;
  codes: readonly string[];
};

/**
 * Sub-regions in display order (continent by continent).
 * Codes match the REST Countries `subregion` field for all 195 UN members.
 */
export const SUBREGION_GROUPS: readonly SubregionGroup[] = [
  // ── Africa ────────────────────────────────────────────────────────────────
  {
    label: "Northern Africa", continent: "Africa",
    codes: ["DZ", "EG", "LY", "MA", "MR", "SD", "TN"],
  },
  {
    label: "Western Africa", continent: "Africa",
    codes: ["BJ", "BF", "CV", "CI", "GM", "GH", "GN", "GW", "LR", "ML", "NE", "NG", "SN", "SL", "TG"],
  },
  {
    label: "Eastern Africa", continent: "Africa",
    codes: ["BI", "KM", "DJ", "ER", "ET", "KE", "MG", "MW", "MU", "MZ", "RW", "SC", "SO", "SS", "TZ", "UG"],
  },
  {
    label: "Middle Africa", continent: "Africa",
    codes: ["AO", "CM", "CF", "TD", "CG", "CD", "GQ", "GA", "ST"],
  },
  {
    label: "Southern Africa", continent: "Africa",
    codes: ["BW", "LS", "NA", "ZA", "SZ", "ZM", "ZW"],
  },
  // ── Americas ──────────────────────────────────────────────────────────────
  {
    label: "North America", continent: "Americas",
    codes: ["CA", "MX", "US"],
  },
  {
    label: "Central America", continent: "Americas",
    codes: ["BZ", "CR", "SV", "GT", "HN", "NI", "PA"],
  },
  {
    label: "Caribbean", continent: "Americas",
    codes: ["AG", "BS", "BB", "CU", "DM", "DO", "GD", "HT", "JM", "KN", "LC", "TT", "VC"],
  },
  {
    label: "South America", continent: "Americas",
    codes: ["AR", "BO", "BR", "CL", "CO", "EC", "GY", "PY", "PE", "SR", "UY", "VE"],
  },
  // ── Asia ──────────────────────────────────────────────────────────────────
  {
    label: "Eastern Asia", continent: "Asia",
    codes: ["CN", "JP", "KP", "KR", "MN"],
  },
  {
    label: "Western Asia", continent: "Asia",
    codes: ["AM", "AZ", "BH", "CY", "GE", "IQ", "IR", "IL", "JO", "KW", "LB", "OM", "PS", "QA", "SA", "SY", "TR", "AE", "YE"],
  },
  {
    label: "Southern Asia", continent: "Asia",
    codes: ["AF", "BD", "BT", "IN", "MV", "NP", "PK", "LK"],
  },
  {
    label: "Southeast Asia", continent: "Asia",
    codes: ["BN", "KH", "TL", "ID", "LA", "MY", "MM", "PH", "SG", "TH", "VN"],
  },
  {
    label: "Central Asia", continent: "Asia",
    codes: ["KZ", "KG", "TJ", "TM", "UZ"],
  },
  // ── Europe ────────────────────────────────────────────────────────────────
  {
    label: "Northern Europe", continent: "Europe",
    codes: ["DK", "EE", "FI", "IS", "IE", "LV", "LT", "NO", "SE", "GB"],
  },
  {
    label: "Western Europe", continent: "Europe",
    codes: ["AT", "BE", "FR", "DE", "LI", "LU", "MC", "NL", "CH"],
  },
  {
    label: "Eastern Europe", continent: "Europe",
    codes: ["BY", "BG", "CZ", "HU", "MD", "PL", "RO", "RU", "SK", "UA"],
  },
  {
    label: "Southern Europe", continent: "Europe",
    codes: ["AL", "AD", "BA", "HR", "GR", "IT", "MK", "MT", "ME", "PT", "SM", "RS", "SI", "ES", "VA"],
  },
  // ── Oceania ───────────────────────────────────────────────────────────────
  {
    label: "Australia & New Zealand", continent: "Oceania",
    codes: ["AU", "NZ"],
  },
  {
    label: "Melanesia", continent: "Oceania",
    codes: ["FJ", "PG", "SB", "VU"],
  },
  {
    label: "Micronesia", continent: "Oceania",
    codes: ["KI", "MH", "FM", "NR", "PW"],
  },
  {
    label: "Polynesia", continent: "Oceania",
    codes: ["WS", "TO", "TV"],
  },
];
