/**
 * International organisation membership for the Learn-mode democracy chart's
 * Membership filter, and for the country fact-sheet Membership row.
 * Membership is UN-member (+ observer) ISO 3166-1 alpha-2 codes only —
 * the chart plots those countries.
 *
 * SOURCED, never from memory. Each block cites the page used to confirm
 * full members as of the dated note. Suspended / associate / partner /
 * observer statuses are excluded unless noted.
 *
 * Badge tooltips (Membership row) show `fullName (abbreviation)`, a short
 * `summary`, the organisation's `founded` year, and when THIS country
 * joined (`joined[code]`). Founding members are those whose join year
 * equals `founded`.
 */

export type CountryBlockGroup =
  | "Military & security"
  | "Economic & trade"
  | "Regional organisations"
  | "Political forums";

export type CountryBlock = {
  /** Stable id used as the filter checkbox value. */
  readonly id: string;
  /** Short label shown in the Membership menu and on the membership badge. */
  readonly label: string;
  /** Official / conventional full English name (tooltip title). */
  readonly fullName: string;
  /** Common abbreviation shown in parentheses after the full name. */
  readonly abbreviation: string;
  readonly group: CountryBlockGroup;
  /** Full UN-member (+ observer) ISO codes. */
  readonly codes: readonly string[];
  /** Year the organisation was created (or its current form began). */
  readonly founded: number;
  /** One-sentence explainer: what the organisation is. */
  readonly summary: string;
  /**
   * Year each member joined (ISO code → year). A country whose year equals
   * `founded` is described as a founding member in the badge tooltip.
   */
  readonly joined: Readonly<Record<string, number>>;
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
  {
    id: "nato",
    label: "NATO",
    fullName: "North Atlantic Treaty Organization",
    abbreviation: "NATO",
    group: "Military & security",
    // 32 Allies (Finland 2023, Sweden 2024).
    codes: [
      "AL", "BE", "BG", "CA", "HR", "CZ", "DK", "EE", "FI", "FR",
      "DE", "GR", "HU", "IS", "IT", "LV", "LT", "LU", "ME", "NL",
      "MK", "NO", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "TR",
      "GB", "US",
    ],
    founded: 1949,
    summary: "A collective-defence alliance of North American and European states under the North Atlantic Treaty.",
    joined: {
      BE:1949, CA:1949, DK:1949, FR:1949, GB:1949, IS:1949, IT:1949, LU:1949, NL:1949, NO:1949, PT:1949, US:1949,
      GR:1952, TR:1952,
      DE:1955,
      ES:1982,
      CZ:1999, HU:1999, PL:1999,
      BG:2004, EE:2004, LT:2004, LV:2004, RO:2004, SI:2004, SK:2004,
      AL:2009, HR:2009,
      ME:2017,
      MK:2020,
      FI:2023,
      SE:2024,
    },
    source: "https://www.nato.int/en/about-us/organization/nato-member-countries",
    note: "32 Allies; as of Sweden's accession (2024).",
  },
  {
    id: "anzus",
    label: "ANZUS",
    fullName: "Australia–New Zealand–United States Security Treaty",
    abbreviation: "ANZUS",
    group: "Military & security",
    codes: [
      "AU", "NZ", "US"
    ],
    founded: 1951,
    summary: "A Pacific security treaty under which the parties consult on common threats in the Pacific region.",
    joined: {
      AU:1951, NZ:1951, US:1951,
    },
    source: "https://en.wikipedia.org/wiki/ANZUS",
    note: "Australia–New Zealand–United States Security Treaty parties.",
  },
  {
    id: "aukus",
    label: "AUKUS",
    fullName: "Australia–United Kingdom–United States partnership",
    abbreviation: "AUKUS",
    group: "Military & security",
    codes: [
      "AU", "GB", "US"
    ],
    founded: 2021,
    summary: "A trilateral security partnership focused on Indo-Pacific defence cooperation, including nuclear-powered submarines for Australia.",
    joined: {
      AU:2021, GB:2021, US:2021,
    },
    source: "https://en.wikipedia.org/wiki/AUKUS",
    note: "Australia–United Kingdom–United States security partnership.",
  },
  {
    id: "five-eyes",
    label: "Five Eyes",
    fullName: "Five Eyes",
    abbreviation: "Five Eyes",
    group: "Military & security",
    codes: [
      "AU", "CA", "NZ", "GB", "US"
    ],
    founded: 1946,
    summary: "An intelligence-sharing alliance of Australia, Canada, New Zealand, the United Kingdom and the United States, rooted in the UKUSA Agreement.",
    joined: {
      GB:1946, US:1946,
      CA:1948,
      AU:1956, NZ:1956,
    },
    source: "https://en.wikipedia.org/wiki/Five_Eyes",
    note: "UKUSA intelligence-alliance principals.",
  },
  {
    id: "quad",
    label: "Quad",
    fullName: "Quadrilateral Security Dialogue",
    abbreviation: "Quad",
    group: "Military & security",
    codes: [
      "AU", "IN", "JP", "US"
    ],
    founded: 2007,
    summary: "An informal strategic forum of Australia, India, Japan and the United States on Indo-Pacific security and cooperation.",
    joined: {
      AU:2007, IN:2007, JP:2007, US:2007,
    },
    source: "https://en.wikipedia.org/wiki/Quadrilateral_Security_Dialogue",
    note: "Quadrilateral Security Dialogue members.",
  },
  {
    id: "csto",
    label: "CSTO",
    fullName: "Collective Security Treaty Organization",
    abbreviation: "CSTO",
    group: "Military & security",
    codes: [
      "AM", "BY", "KZ", "KG", "RU", "TJ"
    ],
    founded: 2002,
    summary: "A Eurasian collective-defence organisation of post-Soviet states under the Collective Security Treaty.",
    joined: {
      AM:2002, BY:2002, KG:2002, KZ:2002, RU:2002, TJ:2002,
    },
    source: "https://en.wikipedia.org/wiki/Collective_Security_Treaty_Organization",
    note: "Collective Security Treaty Organization members.",
  },
  {
    id: "eu",
    label: "European Union",
    fullName: "European Union",
    abbreviation: "EU",
    group: "Economic & trade",
    // 27 member states (post-Brexit).
    codes: [
      "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR",
      "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL",
      "PL", "PT", "RO", "SK", "SI", "ES", "SE",
    ],
    founded: 1957,
    summary: "A political and economic union of European states that began with the European Economic Community (Treaty of Rome) and is today the European Union.",
    joined: {
      BE:1957, DE:1957, FR:1957, IT:1957, LU:1957, NL:1957,
      DK:1973, IE:1973,
      GR:1981,
      ES:1986, PT:1986,
      AT:1995, FI:1995, SE:1995,
      CY:2004, CZ:2004, EE:2004, HU:2004, LT:2004, LV:2004, MT:2004, PL:2004, SI:2004, SK:2004,
      BG:2007, RO:2007,
      HR:2013,
    },
    source: "https://european-union.europa.eu/principles-countries-history/eu-countries_en",
    note: "27 EU member states; as of post-Brexit membership.",
  },
  {
    id: "oecd",
    label: "OECD",
    fullName: "Organisation for Economic Co-operation and Development",
    abbreviation: "OECD",
    group: "Economic & trade",
    // 38 members (Costa Rica joined 2021).
    codes: [
      "AU", "AT", "BE", "CA", "CL", "CO", "CR", "CZ", "DK", "EE",
      "FI", "FR", "DE", "GR", "HU", "IS", "IE", "IL", "IT", "JP",
      "KR", "LV", "LT", "LU", "MX", "NL", "NZ", "NO", "PL", "PT",
      "SK", "SI", "ES", "SE", "CH", "TR", "GB", "US",
    ],
    founded: 1961,
    summary: "An intergovernmental organisation of market democracies that coordinates economic policy, statistics and peer review among its members.",
    joined: {
      AT:1961, BE:1961, CA:1961, CH:1961, DE:1961, DK:1961, ES:1961, FR:1961, GB:1961, GR:1961, IE:1961, IS:1961, IT:1961, LU:1961, NL:1961, NO:1961, PT:1961, SE:1961, TR:1961, US:1961,
      JP:1964,
      FI:1969,
      AU:1971,
      NZ:1973,
      MX:1994,
      CZ:1995,
      HU:1996, KR:1996, PL:1996,
      SK:2000,
      CL:2010, EE:2010, IL:2010, SI:2010,
      LV:2016,
      LT:2018,
      CO:2020,
      CR:2021,
    },
    source: "https://www.oecd.org/en/about/members-partners.html",
    note: "38 OECD members; as of Costa Rica's accession (2021).",
  },
  {
    id: "asean",
    label: "ASEAN",
    fullName: "Association of Southeast Asian Nations",
    abbreviation: "ASEAN",
    group: "Economic & trade",
    // 11 members including Timor-Leste (admitted 2025).
    codes: [
      "BN", "KH", "ID", "LA", "MY", "MM", "PH", "SG", "TH", "TL", "VN"
    ],
    founded: 1967,
    summary: "A regional organisation promoting economic, political and security cooperation among Southeast Asian states.",
    joined: {
      ID:1967, MY:1967, PH:1967, SG:1967, TH:1967,
      BN:1984,
      VN:1995,
      LA:1997, MM:1997,
      KH:1999,
      TL:2025,
    },
    source: "https://en.wikipedia.org/wiki/ASEAN",
    note: "11 ASEAN members including Timor-Leste (2025).",
  },
  {
    id: "mercosur",
    label: "Mercosur",
    fullName: "Southern Common Market",
    abbreviation: "Mercosur",
    group: "Economic & trade",
    // Full members only; Venezuela suspended since 2016 — omitted.
    codes: [
      "AR", "BO", "BR", "PY", "UY"
    ],
    founded: 1991,
    summary: "A South American customs union and common-market project created by the Treaty of Asunción.",
    joined: {
      AR:1991, BR:1991, PY:1991, UY:1991,
      BO:2024,
    },
    source: "https://en.wikipedia.org/wiki/Mercosur",
    note: "Full members (Argentina, Bolivia, Brazil, Paraguay, Uruguay); Venezuela suspended, omitted.",
  },
  {
    id: "brics",
    label: "BRICS",
    fullName: "BRICS",
    abbreviation: "BRICS",
    group: "Economic & trade",
    // Full members per en.wikipedia (Saudi Arabia invited; not listed as seated full member there).
    codes: [
      "BR", "RU", "IN", "CN", "ZA", "EG", "ET", "ID", "IR", "AE"
    ],
    founded: 2009,
    summary: "A forum of major emerging economies that coordinates on economic and geopolitical issues; the name comes from its early members.",
    joined: {
      BR:2009, CN:2009, IN:2009, RU:2009,
      ZA:2010,
      AE:2024, EG:2024, ET:2024, IR:2024,
      ID:2025,
    },
    source: "https://en.wikipedia.org/wiki/BRICS",
    note: "10 full members (Brazil, Russia, India, China, South Africa, Egypt, Ethiopia, Indonesia, Iran, UAE).",
  },
  {
    id: "opec",
    label: "OPEC",
    fullName: "Organization of the Petroleum Exporting Countries",
    abbreviation: "OPEC",
    group: "Economic & trade",
    // 11 members after Angola (2024) and Gabon (2025) withdrawals.
    codes: [
      "DZ", "CG", "GQ", "IR", "IQ", "KW", "LY", "NG", "SA", "AE", "VE"
    ],
    founded: 1960,
    summary: "An intergovernmental organisation of oil-exporting countries that coordinates petroleum policies among its members.",
    joined: {
      IQ:1960, IR:1960, KW:1960, SA:1960, VE:1960,
      LY:1962,
      AE:1967,
      DZ:1969,
      NG:1971,
      GQ:2017,
      CG:2018,
    },
    source: "https://en.wikipedia.org/wiki/OPEC",
    note: "11 OPEC members; Angola and Gabon withdrawals reflected.",
  },
  {
    id: "usmca",
    label: "USMCA",
    fullName: "United States–Mexico–Canada Agreement",
    abbreviation: "USMCA",
    group: "Economic & trade",
    codes: [
      "US", "MX", "CA"
    ],
    founded: 2020,
    summary: "A North American free-trade agreement that replaced NAFTA among the United States, Mexico and Canada.",
    joined: {
      CA:2020, MX:2020, US:2020,
    },
    source: "https://en.wikipedia.org/wiki/United_States%E2%80%93Mexico%E2%80%93Canada_Agreement",
    note: "United States–Mexico–Canada Agreement parties.",
  },
  {
    id: "cptpp",
    label: "CPTPP",
    fullName: "Comprehensive and Progressive Agreement for Trans-Pacific Partnership",
    abbreviation: "CPTPP",
    group: "Economic & trade",
    codes: [
      "AU", "BN", "CA", "CL", "JP", "MY", "MX", "NZ", "PE", "SG", "GB", "VN"
    ],
    founded: 2018,
    summary: "A Pacific Rim free-trade agreement among economies that continued the Trans-Pacific Partnership after the United States withdrew.",
    joined: {
      AU:2018, CA:2018, JP:2018, MX:2018, NZ:2018, SG:2018,
      VN:2019,
      PE:2021,
      MY:2022,
      BN:2023, CL:2023,
      GB:2024,
    },
    source: "https://en.wikipedia.org/wiki/Comprehensive_and_Progressive_Agreement_for_Trans-Pacific_Partnership",
    note: "12 CPTPP parties including the United Kingdom.",
  },
  {
    id: "rcep",
    label: "RCEP",
    fullName: "Regional Comprehensive Economic Partnership",
    abbreviation: "RCEP",
    group: "Economic & trade",
    codes: [
      "AU", "BN", "KH", "CN", "ID", "JP", "KR", "LA", "MY", "MM",
      "NZ", "PH", "SG", "TH", "VN",
    ],
    founded: 2022,
    summary: "An Asia–Pacific free-trade agreement linking ASEAN members with Australia, China, Japan, Korea and New Zealand.",
    joined: {
      AU:2022, BN:2022, CN:2022, ID:2022, JP:2022, KH:2022, KR:2022, LA:2022, MM:2022, MY:2022, NZ:2022, PH:2022, SG:2022, TH:2022, VN:2022,
    },
    source: "https://en.wikipedia.org/wiki/Regional_Comprehensive_Economic_Partnership",
    note: "15 RCEP parties (ASEAN + Australia, China, Japan, Korea, New Zealand).",
  },
  {
    id: "eaeu",
    label: "Eurasian Economic Union",
    fullName: "Eurasian Economic Union",
    abbreviation: "EAEU",
    group: "Economic & trade",
    codes: [
      "AM", "BY", "KZ", "KG", "RU"
    ],
    founded: 2015,
    summary: "A Eurasian economic union providing a single market among its member states.",
    joined: {
      AM:2015, BY:2015, KG:2015, KZ:2015, RU:2015,
    },
    source: "https://en.wikipedia.org/wiki/Eurasian_Economic_Union",
    note: "5 EAEU member states.",
  },
  {
    id: "gcc",
    label: "Gulf Cooperation Council",
    fullName: "Gulf Cooperation Council",
    abbreviation: "GCC",
    group: "Economic & trade",
    codes: [
      "BH", "KW", "OM", "QA", "SA", "AE"
    ],
    founded: 1981,
    summary: "A regional political and economic union of Arab states of the Persian Gulf.",
    joined: {
      AE:1981, BH:1981, KW:1981, OM:1981, QA:1981, SA:1981,
    },
    source: "https://en.wikipedia.org/wiki/Gulf_Cooperation_Council",
    note: "6 GCC member states.",
  },
  {
    id: "pacific-alliance",
    label: "Pacific Alliance",
    fullName: "Pacific Alliance",
    abbreviation: "Pacific Alliance",
    group: "Economic & trade",
    codes: [
      "CL", "CO", "MX", "PE"
    ],
    founded: 2011,
    summary: "A Latin American trade bloc aimed at deep economic integration and engagement with the Asia–Pacific.",
    joined: {
      CL:2011, CO:2011, MX:2011, PE:2011,
    },
    source: "https://en.wikipedia.org/wiki/Pacific_Alliance",
    note: "4 Pacific Alliance members.",
  },
  {
    id: "andecan",
    label: "Andean Community",
    fullName: "Andean Community",
    abbreviation: "CAN",
    group: "Economic & trade",
    codes: [
      "BO", "CO", "EC", "PE"
    ],
    founded: 1969,
    summary: "A South American customs union of Andean states originating in the Cartagena Agreement.",
    joined: {
      BO:1969, CO:1969, EC:1969, PE:1969,
    },
    source: "https://en.wikipedia.org/wiki/Andean_Community",
    note: "4 Andean Community members.",
  },
  {
    id: "african-union",
    label: "African Union",
    fullName: "African Union",
    abbreviation: "AU",
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
    founded: 2002,
    summary: "A continental organisation of African states that succeeded the Organisation of African Unity, promoting unity, peace and development.",
    joined: {
      AO:2002, BF:2002, BI:2002, BJ:2002, BW:2002, CD:2002, CF:2002, CG:2002, CI:2002, CM:2002, CV:2002, DJ:2002, DZ:2002, EG:2002, ER:2002, ET:2002, GA:2002, GH:2002, GM:2002, GN:2002, GQ:2002, GW:2002, KE:2002, KM:2002, LR:2002, LS:2002, LY:2002, MG:2002, ML:2002, MR:2002, MU:2002, MW:2002, MZ:2002, NA:2002, NE:2002, NG:2002, RW:2002, SC:2002, SD:2002, SL:2002, SN:2002, SO:2002, ST:2002, SZ:2002, TD:2002, TG:2002, TN:2002, TZ:2002, UG:2002, ZA:2002, ZM:2002, ZW:2002,
      SS:2011,
      MA:2017,
    },
    source: "https://en.wikipedia.org/wiki/Member_states_of_the_African_Union",
    note: "55 AU members; 54 African UN states shown (SADR omitted — not a UN member in this game).",
  },
  {
    id: "oas",
    label: "Organization of American States",
    fullName: "Organization of American States",
    abbreviation: "OAS",
    group: "Regional organisations",
    codes: [
      "AG", "AR", "BS", "BB", "BZ", "BO", "BR", "CA", "CL", "CO",
      "CR", "CU", "DM", "DO", "EC", "SV", "GD", "GT", "GY", "HT",
      "HN", "JM", "MX", "NI", "PA", "PY", "PE", "KN", "LC", "VC",
      "SR", "TT", "US", "UY", "VE",
    ],
    founded: 1948,
    summary: "A continental organisation of the Americas that promotes democracy, human rights, security and development.",
    joined: {
      AR:1948, BO:1948, BR:1948, CL:1948, CO:1948, CR:1948, CU:1948, DO:1948, EC:1948, GT:1948, HN:1948, HT:1948, MX:1948, NI:1948, PA:1948, PE:1948, PY:1948, SV:1948, US:1948, UY:1948, VE:1948,
      BB:1967, TT:1967,
      JM:1969,
      GD:1975,
      SR:1977,
      DM:1979, LC:1979,
      AG:1981, VC:1981,
      BS:1982,
      KN:1984,
      CA:1990,
      BZ:1991, GY:1991,
    },
    source: "https://en.wikipedia.org/wiki/Organization_of_American_States",
    note: "Independent OAS states that are UN members in this game (35).",
  },
  {
    id: "arab-league",
    label: "Arab League",
    fullName: "League of Arab States",
    abbreviation: "Arab League",
    group: "Regional organisations",
    codes: [
      "DZ", "BH", "KM", "DJ", "EG", "IQ", "JO", "KW", "LB", "LY",
      "MR", "MA", "OM", "PS", "QA", "SA", "SO", "SD", "SY", "TN",
      "AE", "YE",
    ],
    founded: 1945,
    summary: "A regional organisation of Arab states that coordinates political, cultural and economic cooperation.",
    joined: {
      EG:1945, IQ:1945, JO:1945, LB:1945, SA:1945, SY:1945, YE:1945,
      LY:1953,
      SD:1956,
      MA:1958, TN:1958,
      KW:1961,
      DZ:1962,
      AE:1971, BH:1971, OM:1971, QA:1971,
      MR:1973,
      SO:1974,
      PS:1976,
      DJ:1977,
      KM:1993,
    },
    source: "https://en.wikipedia.org/wiki/Arab_League",
    note: "22 Arab League members (incl. Palestine UN observer).",
  },
  {
    id: "caricom",
    label: "CARICOM",
    fullName: "Caribbean Community",
    abbreviation: "CARICOM",
    group: "Regional organisations",
    // Full members that are UN states (Montserrat omitted).
    codes: [
      "AG", "BS", "BB", "BZ", "DM", "GD", "GY", "HT", "JM", "KN",
      "LC", "VC", "SR", "TT",
    ],
    founded: 1973,
    summary: "A Caribbean organisation promoting economic integration and foreign-policy coordination among its members.",
    joined: {
      BB:1973, GY:1973, JM:1973, TT:1973,
      AG:1974, BZ:1974, DM:1974, GD:1974, KN:1974, LC:1974, VC:1974,
      BS:1983,
      SR:1995,
      HT:2002,
    },
    source: "https://en.wikipedia.org/wiki/Caribbean_Community",
    note: "14 CARICOM full members that are UN states (Montserrat omitted).",
  },
  {
    id: "ecowas",
    label: "ECOWAS",
    fullName: "Economic Community of West African States",
    abbreviation: "ECOWAS",
    group: "Regional organisations",
    // 12 members after Mali, Burkina Faso and Niger withdrew (2025).
    codes: [
      "BJ", "CV", "CI", "GM", "GH", "GN", "GW", "LR", "NG", "SN",
      "SL", "TG",
    ],
    founded: 1975,
    summary: "A West African regional economic community promoting integration and collective self-sufficiency.",
    joined: {
      BJ:1975, CI:1975, GH:1975, GM:1975, GN:1975, GW:1975, LR:1975, NG:1975, SL:1975, SN:1975, TG:1975,
      CV:1977,
    },
    source: "https://en.wikipedia.org/wiki/Economic_Community_of_West_African_States",
    note: "12 ECOWAS members after Mali, Burkina Faso and Niger withdrew.",
  },
  {
    id: "sadc",
    label: "SADC",
    fullName: "Southern African Development Community",
    abbreviation: "SADC",
    group: "Regional organisations",
    codes: [
      "AO", "BW", "KM", "CD", "SZ", "LS", "MG", "MW", "MU", "MZ",
      "NA", "SC", "ZA", "TZ", "ZM", "ZW",
    ],
    founded: 1992,
    summary: "A Southern African regional community for economic development, peace and regional integration.",
    joined: {
      AO:1992, BW:1992, LS:1992, MW:1992, MZ:1992, NA:1992, SZ:1992, TZ:1992, ZM:1992, ZW:1992,
      ZA:1994,
      MU:1995,
      CD:1997,
      SC:1998,
      MG:2005,
      KM:2017,
    },
    source: "https://en.wikipedia.org/wiki/Southern_African_Development_Community",
    note: "16 Southern African Development Community members.",
  },
  {
    id: "pacific-islands-forum",
    label: "Pacific Islands Forum",
    fullName: "Pacific Islands Forum",
    abbreviation: "PIF",
    group: "Regional organisations",
    // UN-member Forum members (Cook Islands, Niue, French territories omitted).
    codes: [
      "AU", "FJ", "KI", "MH", "FM", "NR", "NZ", "PW", "PG", "WS",
      "SB", "TO", "TV", "VU",
    ],
    founded: 1971,
    summary: "The main political grouping of Pacific Island countries and neighbouring partners, founded as the South Pacific Forum.",
    joined: {
      AU:1971, FJ:1971, NR:1971, NZ:1971, TO:1971, TV:1971, WS:1971,
      PG:1975,
      SB:1978,
      KI:1979,
      VU:1980,
      FM:1987, MH:1987,
      PW:1995,
    },
    source: "https://en.wikipedia.org/wiki/Pacific_Islands_Forum",
    note: "14 Forum members that are UN states (Cook Islands, Niue, French territories omitted).",
  },
  {
    id: "sco",
    label: "Shanghai Cooperation Organisation",
    fullName: "Shanghai Cooperation Organisation",
    abbreviation: "SCO",
    group: "Regional organisations",
    codes: [
      "BY", "CN", "IN", "IR", "KZ", "KG", "PK", "RU", "TJ", "UZ"
    ],
    founded: 2001,
    summary: "A Eurasian political, economic and security organisation that grew out of the Shanghai Five.",
    joined: {
      CN:2001, KG:2001, KZ:2001, RU:2001, TJ:2001, UZ:2001,
      IN:2017, PK:2017,
      IR:2023,
      BY:2024,
    },
    source: "https://en.wikipedia.org/wiki/Shanghai_Cooperation_Organisation",
    note: "10 SCO member states.",
  },
  {
    id: "commonwealth",
    label: "Commonwealth of Nations",
    fullName: "Commonwealth of Nations",
    abbreviation: "Commonwealth",
    group: "Regional organisations",
    codes: [
      "AG", "AU", "BS", "BD", "BB", "BZ", "BW", "BN", "CM", "CA",
      "CY", "DM", "SZ", "FJ", "GA", "GM", "GH", "GD", "GY", "IN",
      "JM", "KE", "KI", "LS", "MW", "MY", "MV", "MT", "MU", "MZ",
      "NA", "NR", "NZ", "NG", "PK", "PG", "RW", "KN", "LC", "VC",
      "WS", "SC", "SL", "SG", "SB", "ZA", "LK", "TZ", "TG", "TO",
      "TT", "TV", "UG", "GB", "VU", "ZM",
    ],
    founded: 1949,
    summary: "A voluntary association of independent states, most of them former territories of the British Empire, formalised by the London Declaration.",
    joined: {
      AU:1949, CA:1949, GB:1949, IN:1949, LK:1949, NZ:1949, PK:1949, ZA:1949,
      GH:1957, MY:1957,
      NG:1960,
      CY:1961, SL:1961, TZ:1961,
      JM:1962, TT:1962, UG:1962,
      KE:1963,
      MT:1964, MW:1964, ZM:1964,
      GM:1965, SG:1965,
      BB:1966, BW:1966, GY:1966, LS:1966,
      MU:1968, NR:1968, SZ:1968,
      FJ:1970, TO:1970, WS:1970,
      BD:1972,
      BS:1973,
      GD:1974,
      PG:1975,
      SC:1976,
      DM:1978, SB:1978, TV:1978,
      KI:1979, LC:1979, VC:1979,
      VU:1980,
      AG:1981, BZ:1981,
      MV:1982,
      KN:1983,
      BN:1984,
      NA:1990,
      CM:1995, MZ:1995,
      RW:2009,
      GA:2022, TG:2022,
    },
    source: "https://en.wikipedia.org/wiki/Commonwealth_of_Nations",
    note: "56 Commonwealth members that are UN states in this game.",
  },
  {
    id: "g7",
    label: "G7",
    fullName: "Group of Seven",
    abbreviation: "G7",
    group: "Political forums",
    codes: [
      "CA", "FR", "DE", "IT", "JP", "GB", "US"
    ],
    founded: 1975,
    summary: "An informal forum of advanced democracies that coordinates on economic policy and global issues.",
    joined: {
      DE:1975, FR:1975, GB:1975, IT:1975, JP:1975, US:1975,
      CA:1976,
    },
    source: "https://en.wikipedia.org/wiki/G7",
    note: "7 country members (EU also participates; not a country card).",
  },
  {
    id: "g20",
    label: "G20",
    fullName: "Group of Twenty",
    abbreviation: "G20",
    group: "Political forums",
    // 19 country members; EU and African Union also members but not country cards.
    codes: [
      "AR", "AU", "BR", "CA", "CN", "FR", "DE", "IN", "ID", "IT",
      "JP", "MX", "RU", "SA", "ZA", "KR", "TR", "GB", "US",
    ],
    founded: 1999,
    summary: "A forum of major advanced and emerging economies that coordinates on global economic and financial governance.",
    joined: {
      AR:1999, AU:1999, BR:1999, CA:1999, CN:1999, DE:1999, FR:1999, GB:1999, ID:1999, IN:1999, IT:1999, JP:1999, KR:1999, MX:1999, RU:1999, SA:1999, TR:1999, US:1999, ZA:1999,
    },
    source: "https://en.wikipedia.org/wiki/G20",
    note: "19 country members (EU and African Union also members; not country cards).",
  },
  {
    id: "apec",
    label: "APEC",
    fullName: "Asia-Pacific Economic Cooperation",
    abbreviation: "APEC",
    group: "Political forums",
    // UN-member economies only (Hong Kong, Taiwan omitted — not UN members here).
    codes: [
      "AU", "BN", "CA", "CL", "CN", "ID", "JP", "KR", "MY", "MX",
      "NZ", "PG", "PE", "PH", "RU", "SG", "TH", "US", "VN",
    ],
    founded: 1989,
    summary: "A forum of Pacific Rim economies that promotes trade and economic cooperation across the Asia–Pacific.",
    joined: {
      AU:1989, BN:1989, CA:1989, ID:1989, JP:1989, KR:1989, MY:1989, NZ:1989, PH:1989, SG:1989, TH:1989, US:1989,
      CN:1991,
      MX:1993, PG:1993,
      CL:1994,
      PE:1998, RU:1998, VN:1998,
    },
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

/** Tooltip title: full name with abbreviation in parentheses. */
export function membershipDisplayName(block: CountryBlock): string {
  return `${block.fullName} (${block.abbreviation})`;
}

/**
 * Short explainer for a membership badge: what the organisation is, when it
 * was created, and when this country joined (or that it is a founding member).
 */
export function membershipExplainer(
  block: CountryBlock,
  code: string,
  countryName: string,
): string {
  const year = block.joined[code];
  const created = `Created in ${block.founded}.`;
  let member: string;
  if (year == null) {
    member = `${countryName} is a member.`;
  } else if (year === block.founded) {
    member = `${countryName} is a founding member.`;
  } else {
    member = `${countryName} became a member in ${year}.`;
  }
  return `${block.summary} ${created} ${member}`;
}
