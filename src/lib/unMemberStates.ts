/**
 * RULE #1 — ABSOLUTE CONSTRAINT (hard-coded):
 *
 * Only the 195 United Nations member and permanent observer states may appear
 * as independent/parent nations ANYWHERE in this game — the main flag quiz,
 * subdivision parent sections, historical era entries, etc.
 *
 * The 195 comprise:
 *   • 193 UN member states
 *   • 2 permanent observer states: Holy See (VA) and State of Palestine (PS)
 *
 * Non-UN entities such as Taiwan (TW), Kosovo (XK), Hong Kong (HK), Macau (MO),
 * Greenland (GL), Puerto Rico (PR), and other dependent territories must NOT be
 * added as parent nations.  Disputed territories should instead appear as
 * subdivision entries of their claiming UN-member state(s), labelled
 * "(disputed territory)".
 *
 * Authoritative list: https://www.un.org/en/about-us/member-states
 * Imported by: src/api/countries.ts, src/lib/countrySelection.ts
 */
export const UN_MEMBER_CODES: ReadonlySet<string> = new Set([
  "AF", "AL", "DZ", "AD", "AO", "AG", "AR", "AM", "AU", "AT",
  "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BT",
  "BO", "BA", "BW", "BR", "BN", "BG", "BF", "BI", "CV", "KH",
  "CM", "CA", "CF", "TD", "CL", "CN", "CO", "KM", "CG", "CD",
  "CR", "CI", "HR", "CU", "CY", "CZ", "DK", "DJ", "DM", "DO",
  "EC", "EG", "SV", "GQ", "ER", "EE", "SZ", "ET", "FJ", "FI",
  "FR", "GA", "GM", "GE", "DE", "GH", "GR", "GD", "GT", "GN",
  "GW", "GY", "HT", "HN", "HU", "IS", "IN", "ID", "IR", "IQ",
  "IE", "IL", "IT", "JM", "JP", "JO", "KZ", "KE", "KI", "KP",
  "KR", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI",
  "LT", "LU", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MR",
  "MU", "MX", "FM", "MD", "MC", "MN", "ME", "MA", "MZ", "MM",
  "NA", "NR", "NP", "NL", "NZ", "NI", "NE", "NG", "MK", "NO",
  "OM", "PK", "PW", "PA", "PG", "PY", "PE", "PH", "PL", "PT",
  "QA", "RO", "RU", "RW", "KN", "LC", "VC", "WS", "SM", "ST",
  "SA", "SN", "RS", "SC", "SL", "SG", "SK", "SI", "SB", "SO",
  "ZA", "SS", "ES", "LK", "SD", "SR", "SE", "CH", "SY", "TJ",
  "TZ", "TH", "TL", "TG", "TO", "TT", "TN", "TR", "TM", "TV",
  "UG", "UA", "AE", "GB", "US", "UY", "UZ", "VU", "VE", "VN",
  "YE", "ZM", "ZW",
  // Permanent UN observer states
  "VA", "PS",
]);
