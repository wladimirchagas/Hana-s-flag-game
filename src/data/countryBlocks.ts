/**
 * International organisation membership for the Learn-mode democracy chart's
 * Membership filter, and for the country fact-sheet Membership row.
 * Membership is UN-member (+ observer) ISO 3166-1 alpha-2 codes only —
 * the chart plots those countries.
 *
 * SOURCED, never from memory. Each block cites the page used to confirm
 * full members as of the dated note. Suspended / associate / partner /
 * observer statuses are excluded unless noted.
 */

export type CountryBlockGroup =
  | "Military & security"
  | "Economic & trade"
  | "Regional organisations"
  | "Political forums";

export type CountryBlock = {
  /** Stable id used as the filter checkbox value. */
  readonly id: string;
  /** Short label shown in the Membership menu and on the country card. */
  readonly label: string;
  readonly group: CountryBlockGroup;
  /** Full UN-member (+ observer) ISO codes. */
  readonly codes: readonly string[];
  /** Authoritative source URL. */
  readonly source: string;
  /** One-line note: what was counted and as-of. */
  readonly note: string;
};

/**
 * Display order: group order below, then the blocks as listed.
 * Groups match the filter popover section headings.
 */
export const COUNTRY_BLOCK_GROUP_ORDER: readonly CountryBlockGroup[] = [
  "Military & security",
  "Economic & trade",
  "Regional organisations",
  "Political forums",
];

export const COUNTRY_BLOCKS: readonly CountryBlock[] = [
  // ── Military & security ───────────────────────────────────────────────────
  {
    id: "nato",
    label: "NATO",
    group: "Military & security",
    // 32 Allies (Finland 2023, Sweden 2024).
    codes: [
      "AL", "BE", "BG", "CA", "HR", "CZ", "DK", "EE", "FI", "FR",
      "DE", "GR", "HU", "IS", "IT", "LV", "LT", "LU", "ME", "NL",
      "MK", "NO", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "TR",
      "GB", "US",
    ],
    source: "https://www.nato.int/en/about-us/organization/nato-member-countries",
    note: "32 Allies; as of Sweden's accession (2024).",
  },
  {
    id: "anzus",
    label: "ANZUS",
    group: "Military & security",
    codes: ["AU", "NZ", "US"],
    source: "https://en.wikipedia.org/wiki/ANZUS",
    note: "Australia–New Zealand–United States Security Treaty parties.",
  },
  {
    id: "aukus",
    label: "AUKUS",
    group: "Military & security",
    codes: ["AU", "GB", "US"],
    source: "https://en.wikipedia.org/wiki/AUKUS",
    note: "Australia–United Kingdom–United States security partnership.",
  },
  {
    id: "five-eyes",
    label: "Five Eyes",
    group: "Military & security",
    codes: ["AU", "CA", "NZ", "GB", "US"],
    source: "https://en.wikipedia.org/wiki/Five_Eyes",
    note: "UKUSA intelligence-alliance principals.",
  },
  {
    id: "quad",
    label: "Quad",
    group: "Military & security",
    codes: ["AU", "IN", "JP", "US"],
    source: "https://en.wikipedia.org/wiki/Quadrilateral_Security_Dialogue",
    note: "Quadrilateral Security Dialogue members.",
  },
  {
    id: "csto",
    label: "CSTO",
    group: "Military & security",
    codes: ["AM", "BY", "KZ", "KG", "RU", "TJ"],
    source: "https://en.wikipedia.org/wiki/Collective_Security_Treaty_Organization",
    note: "Collective Security Treaty Organization members.",
  },

  // ── Economic & trade ──────────────────────────────────────────────────────
  {
    id: "eu",
    label: "European Union",
    group: "Economic & trade",
    // 27 member states (post-Brexit).
    codes: [
      "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR",
      "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL",
      "PL", "PT", "RO", "SK", "SI", "ES", "SE",
    ],
    source: "https://european-union.europa.eu/principles-countries-history/eu-countries_en",
    note: "27 EU member states; as of post-Brexit membership.",
  },
  {
    id: "oecd",
    label: "OECD",
    group: "Economic & trade",
    // 38 members (Costa Rica joined 2021).
    codes: [
      "AU", "AT", "BE", "CA", "CL", "CO", "CR", "CZ", "DK", "EE",
      "FI", "FR", "DE", "GR", "HU", "IS", "IE", "IL", "IT", "JP",
      "KR", "LV", "LT", "LU", "MX", "NL", "NZ", "NO", "PL", "PT",
      "SK", "SI", "ES", "SE", "CH", "TR", "GB", "US",
    ],
    source: "https://www.oecd.org/en/about/members-partners.html",
    note: "38 OECD members; as of Costa Rica's accession (2021).",
  },
  {
    id: "asean",
    label: "ASEAN",
    group: "Economic & trade",
    // 11 members including Timor-Leste (admitted 2025).
    codes: ["BN", "KH", "ID", "LA", "MY", "MM", "PH", "SG", "TH", "TL", "VN"],
    source: "https://en.wikipedia.org/wiki/ASEAN",
    note: "11 ASEAN members including Timor-Leste (2025).",
  },
  {
    id: "mercosur",
    label: "Mercosur",
    group: "Economic & trade",
    // Full members only; Venezuela suspended since 2016 — omitted.
    codes: ["AR", "BO", "BR", "PY", "UY"],
    source: "https://en.wikipedia.org/wiki/Mercosur",
    note: "Full members (Argentina, Bolivia, Brazil, Paraguay, Uruguay); Venezuela suspended, omitted.",
  },
  {
    id: "brics",
    label: "BRICS",
    group: "Economic & trade",
    // Full members per en.wikipedia (Saudi Arabia invited; not listed as seated full member there).
    codes: ["BR", "RU", "IN", "CN", "ZA", "EG", "ET", "ID", "IR", "AE"],
    source: "https://en.wikipedia.org/wiki/BRICS",
    note: "10 full members (Brazil, Russia, India, China, South Africa, Egypt, Ethiopia, Indonesia, Iran, UAE).",
  },
  {
    id: "opec",
    label: "OPEC",
    group: "Economic & trade",
    // 11 members after Angola (2024) and Gabon (2025) withdrawals.
    codes: ["DZ", "CG", "GQ", "IR", "IQ", "KW", "LY", "NG", "SA", "AE", "VE"],
    source: "https://en.wikipedia.org/wiki/OPEC",
    note: "11 OPEC members; Angola and Gabon withdrawals reflected.",
  },
  {
    id: "usmca",
    label: "USMCA",
    group: "Economic & trade",
    codes: ["US", "MX", "CA"],
    source: "https://en.wikipedia.org/wiki/United_States%E2%80%93Mexico%E2%80%93Canada_Agreement",
    note: "United States–Mexico–Canada Agreement parties.",
  },
  {
    id: "cptpp",
    label: "CPTPP",
    group: "Economic & trade",
    codes: ["AU", "BN", "CA", "CL", "JP", "MY", "MX", "NZ", "PE", "SG", "GB", "VN"],
    source: "https://en.wikipedia.org/wiki/Comprehensive_and_Progressive_Agreement_for_Trans-Pacific_Partnership",
    note: "12 CPTPP parties including the United Kingdom.",
  },
  {
    id: "rcep",
    label: "RCEP",
    group: "Economic & trade",
    codes: [
      "AU", "BN", "KH", "CN", "ID", "JP", "KR", "LA", "MY", "MM",
      "NZ", "PH", "SG", "TH", "VN",
    ],
    source: "https://en.wikipedia.org/wiki/Regional_Comprehensive_Economic_Partnership",
    note: "15 RCEP parties (ASEAN + Australia, China, Japan, Korea, New Zealand).",
  },
  {
    id: "eaeu",
    label: "Eurasian Economic Union",
    group: "Economic & trade",
    codes: ["AM", "BY", "KZ", "KG", "RU"],
    source: "https://en.wikipedia.org/wiki/Eurasian_Economic_Union",
    note: "5 EAEU member states.",
  },
  {
    id: "gcc",
    label: "Gulf Cooperation Council",
    group: "Economic & trade",
    codes: ["BH", "KW", "OM", "QA", "SA", "AE"],
    source: "https://en.wikipedia.org/wiki/Gulf_Cooperation_Council",
    note: "6 GCC member states.",
  },
  {
    id: "pacific-alliance",
    label: "Pacific Alliance",
    group: "Economic & trade",
    codes: ["CL", "CO", "MX", "PE"],
    source: "https://en.wikipedia.org/wiki/Pacific_Alliance",
    note: "4 Pacific Alliance members.",
  },
  {
    id: "andecan",
    label: "Andean Community",
    group: "Economic & trade",
    codes: ["BO", "CO", "EC", "PE"],
    source: "https://en.wikipedia.org/wiki/Andean_Community",
    note: "4 Andean Community members.",
  },

  // ── Regional organisations ────────────────────────────────────────────────
  {
    id: "african-union",
    label: "African Union",
    group: "Regional organisations",
    // All African UN members in this game (SADR is AU member but not a UN state here).
    codes: [
      "DZ", "AO", "BJ", "BW", "BF", "BI", "CV", "CM", "CF", "TD",
      "KM", "CG", "CD", "CI", "DJ", "EG", "GQ", "ER", "SZ", "ET",
      "GA", "GM", "GH", "GN", "GW", "KE", "LS", "LR", "LY", "MG",
      "MW", "ML", "MR", "MU", "MA", "MZ", "NA", "NE", "NG", "RW",
      "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "TZ", "TG",
      "TN", "UG", "ZM", "ZW",
    ],
    source: "https://en.wikipedia.org/wiki/Member_states_of_the_African_Union",
    note: "55 AU members; 54 African UN states shown (SADR omitted — not a UN member in this game).",
  },
  {
    id: "oas",
    label: "Organization of American States",
    group: "Regional organisations",
    codes: [
      "AG", "AR", "BS", "BB", "BZ", "BO", "BR", "CA", "CL", "CO",
      "CR", "CU", "DM", "DO", "EC", "SV", "GD", "GT", "GY", "HT",
      "HN", "JM", "MX", "NI", "PA", "PY", "PE", "KN", "LC", "VC",
      "SR", "TT", "US", "UY", "VE",
    ],
    source: "https://en.wikipedia.org/wiki/Organization_of_American_States",
    note: "Independent OAS states that are UN members in this game (35).",
  },
  {
    id: "arab-league",
    label: "Arab League",
    group: "Regional organisations",
    codes: [
      "DZ", "BH", "KM", "DJ", "EG", "IQ", "JO", "KW", "LB", "LY",
      "MR", "MA", "OM", "PS", "QA", "SA", "SO", "SD", "SY", "TN",
      "AE", "YE",
    ],
    source: "https://en.wikipedia.org/wiki/Arab_League",
    note: "22 Arab League members (incl. Palestine UN observer).",
  },
  {
    id: "caricom",
    label: "CARICOM",
    group: "Regional organisations",
    // Full members that are UN states (Montserrat omitted).
    codes: [
      "AG", "BS", "BB", "BZ", "DM", "GD", "GY", "HT", "JM", "KN",
      "LC", "VC", "SR", "TT",
    ],
    source: "https://en.wikipedia.org/wiki/Caribbean_Community",
    note: "14 CARICOM full members that are UN states (Montserrat omitted).",
  },
  {
    id: "ecowas",
    label: "ECOWAS",
    group: "Regional organisations",
    // 12 members after Mali, Burkina Faso and Niger withdrew (2025).
    codes: [
      "BJ", "CV", "CI", "GM", "GH", "GN", "GW", "LR", "NG", "SN",
      "SL", "TG",
    ],
    source: "https://en.wikipedia.org/wiki/Economic_Community_of_West_African_States",
    note: "12 ECOWAS members after Mali, Burkina Faso and Niger withdrew.",
  },
  {
    id: "sadc",
    label: "SADC",
    group: "Regional organisations",
    codes: [
      "AO", "BW", "KM", "CD", "SZ", "LS", "MG", "MW", "MU", "MZ",
      "NA", "SC", "ZA", "TZ", "ZM", "ZW",
    ],
    source: "https://en.wikipedia.org/wiki/Southern_African_Development_Community",
    note: "16 Southern African Development Community members.",
  },
  {
    id: "pacific-islands-forum",
    label: "Pacific Islands Forum",
    group: "Regional organisations",
    // UN-member Forum members (Cook Islands, Niue, French territories omitted).
    codes: [
      "AU", "FJ", "KI", "MH", "FM", "NR", "NZ", "PW", "PG", "WS",
      "SB", "TO", "TV", "VU",
    ],
    source: "https://en.wikipedia.org/wiki/Pacific_Islands_Forum",
    note: "14 Forum members that are UN states (Cook Islands, Niue, French territories omitted).",
  },
  {
    id: "sco",
    label: "Shanghai Cooperation Organisation",
    group: "Regional organisations",
    codes: ["BY", "CN", "IN", "IR", "KZ", "KG", "PK", "RU", "TJ", "UZ"],
    source: "https://en.wikipedia.org/wiki/Shanghai_Cooperation_Organisation",
    note: "10 SCO member states.",
  },
  {
    id: "commonwealth",
    label: "Commonwealth of Nations",
    group: "Regional organisations",
    codes: [
      "AG", "AU", "BS", "BD", "BB", "BZ", "BW", "BN", "CM", "CA",
      "CY", "DM", "SZ", "FJ", "GA", "GM", "GH", "GD", "GY", "IN",
      "JM", "KE", "KI", "LS", "MW", "MY", "MV", "MT", "MU", "MZ",
      "NA", "NR", "NZ", "NG", "PK", "PG", "RW", "KN", "LC", "VC",
      "WS", "SC", "SL", "SG", "SB", "ZA", "LK", "TZ", "TG", "TO",
      "TT", "TV", "UG", "GB", "VU", "ZM",
    ],
    source: "https://en.wikipedia.org/wiki/Commonwealth_of_Nations",
    note: "56 Commonwealth members that are UN states in this game.",
  },

  // ── Political forums ──────────────────────────────────────────────────────
  {
    id: "g7",
    label: "G7",
    group: "Political forums",
    codes: ["CA", "FR", "DE", "IT", "JP", "GB", "US"],
    source: "https://en.wikipedia.org/wiki/G7",
    note: "7 country members (EU also participates; not a country card).",
  },
  {
    id: "g20",
    label: "G20",
    group: "Political forums",
    // 19 country members; EU and African Union also members but not country cards.
    codes: [
      "AR", "AU", "BR", "CA", "CN", "FR", "DE", "IN", "ID", "IT",
      "JP", "MX", "RU", "SA", "ZA", "KR", "TR", "GB", "US",
    ],
    source: "https://en.wikipedia.org/wiki/G20",
    note: "19 country members (EU and African Union also members; not country cards).",
  },
  {
    id: "apec",
    label: "APEC",
    group: "Political forums",
    // UN-member economies only (Hong Kong, Taiwan omitted — not UN members here).
    codes: [
      "AU", "BN", "CA", "CL", "CN", "ID", "JP", "KR", "MY", "MX",
      "NZ", "PG", "PE", "PH", "RU", "SG", "TH", "US", "VN",
    ],
    source: "https://en.wikipedia.org/wiki/Asia-Pacific_Economic_Cooperation",
    note: "19 APEC economies that are UN members (Hong Kong and Taiwan omitted).",
  },
];

/** Lookup: block id → set of member codes. */
export const COUNTRY_BLOCK_MEMBERS: Readonly<Record<string, ReadonlySet<string>>> =
  Object.fromEntries(
    COUNTRY_BLOCKS.map((b) => [b.id, new Set(b.codes)]),
  );

/** True when `code` belongs to any of the selected membership ids. */
export function countryMatchesBlocks(
  code: string,
  selectedBlockIds: ReadonlySet<string>,
): boolean {
  if (selectedBlockIds.size === 0) return false;
  for (const id of selectedBlockIds) {
    const members = COUNTRY_BLOCK_MEMBERS[id];
    if (members?.has(code)) return true;
  }
  return false;
}

/**
 * Organisations this country is a full member of, in display order
 * (group order, then block order within `COUNTRY_BLOCKS`).
 */
export function membershipsForCountry(code: string): readonly CountryBlock[] {
  return COUNTRY_BLOCKS.filter((b) => COUNTRY_BLOCK_MEMBERS[b.id]?.has(code));
}
