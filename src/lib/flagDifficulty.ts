/**
 * Per-flag difficulty classification.
 *
 * Buckets:
 *   - EASY:     ~33 flags. Globally well-known countries; iconic / visually
 *               unmistakable flags (US, UK, France, Japan, Brazil, etc.) plus
 *               a few that stand out for design (Nepal — only non-rectangular
 *               flag, Vatican — crossed keys, Switzerland — square cross).
 *   - MODERATE: ~78 flags. Common-knowledge countries that an average adult
 *               recognises, even if the flag isn't iconic (most of Europe
 *               beyond the majors, populous Asian/African countries,
 *               distinctive but less famous designs like Albania's eagle).
 *   - HARD:     ~84 flags. Small/microstates, Pacific island nations,
 *               Caribbean small states, Central Asian "-stans", most of
 *               sub-Saharan Africa, and similar-pattern flags that are hard
 *               to tell apart (the various Arab tricolors, the West African
 *               red/yellow/green tricolors, Romania ↔ Chad ↔ Moldova, etc.).
 *
 * Editing:
 *   To move a country between buckets, simply cut its line from one array
 *   and paste it into another. Each entry is alphabetised by name (the
 *   comment after the code) within its bucket. Recompile / refresh and
 *   the new classification applies everywhere.
 */

export type Difficulty = "easy" | "moderate" | "hard";

// ---------------------------------------------------------------------------
// EASY
// Globally well-known countries + visually iconic flags.
// ---------------------------------------------------------------------------
export const EASY_CODES: readonly string[] = [
  "AR", // Argentina
  "AU", // Australia
  "BR", // Brazil
  "CA", // Canada
  "CH", // Switzerland
  "CN", // China
  "DE", // Germany
  "EG", // Egypt
  "ES", // Spain
  "FR", // France
  "GB", // United Kingdom
  "GR", // Greece
  "ID", // Indonesia
  "IN", // India
  "IT", // Italy
  "JP", // Japan
  "KR", // South Korea
  "MX", // Mexico
  "MY", // Malaysia
  "NL", // Netherlands
  "NP", // Nepal — only non-rectangular national flag
  "NZ", // New Zealand
  "PT", // Portugal
  "RU", // Russia
  "SA", // Saudi Arabia — distinctive Arabic + sword
  "SE", // Sweden
  "SG", // Singapore
  "TR", // Turkey
  "US", // United States
  "VA", // Vatican City — iconic crossed keys
  "ZA", // South Africa — rainbow Y-shape
];

// ---------------------------------------------------------------------------
// MODERATE
// Common-knowledge countries; recognisable but not iconic.
// ---------------------------------------------------------------------------
export const MODERATE_CODES: readonly string[] = [
  "AL", // Albania — black eagle
  "AT", // Austria
  "BA", // Bosnia and Herzegovina
  "BD", // Bangladesh
  "BE", // Belgium
  "BG", // Bulgaria
  "BO", // Bolivia
  "BY", // Belarus
  "CL", // Chile
  "CM", // Cameroon
  "CO", // Colombia
  "CR", // Costa Rica
  "CU", // Cuba
  "CY", // Cyprus
  "CZ", // Czechia
  "CI", // Côte d'Ivoire
  "DK", // Denmark
  "DO", // Dominican Republic
  "DZ", // Algeria
  "EC", // Ecuador
  "EE", // Estonia
  "ET", // Ethiopia
  "FI", // Finland
  "FJ", // Fiji
  "GH", // Ghana
  "GT", // Guatemala
  "HR", // Croatia
  "HT", // Haiti
  "HN", // Honduras
  "HU", // Hungary
  "IE", // Ireland
  "IL", // Israel
  "IQ", // Iraq
  "IR", // Iran
  "IS", // Iceland
  "JM", // Jamaica
  "JO", // Jordan
  "KE", // Kenya
  "KH", // Cambodia
  "KP", // North Korea
  "KW", // Kuwait
  "LB", // Lebanon — cedar
  "LK", // Sri Lanka — lion
  "LT", // Lithuania
  "LU", // Luxembourg
  "LV", // Latvia
  "LY", // Libya
  "MA", // Morocco
  "MG", // Madagascar
  "MK", // North Macedonia
  "MM", // Myanmar
  "MN", // Mongolia
  "MT", // Malta
  "MZ", // Mozambique
  "NG", // Nigeria
  "NO", // Norway
  "OM", // Oman
  "PA", // Panama
  "PE", // Peru
  "PH", // Philippines
  "PK", // Pakistan
  "PL", // Poland
  "PS", // Palestine
  "QA", // Qatar
  "RO", // Romania
  "RS", // Serbia
  "SI", // Slovenia
  "SK", // Slovakia
  "SN", // Senegal
  "SY", // Syria
  "TH", // Thailand
  "TN", // Tunisia
  "TZ", // Tanzania
  "UA", // Ukraine
  "UG", // Uganda
  "UY", // Uruguay
  "AE", // United Arab Emirates
  "VE", // Venezuela
  "VN", // Vietnam
  "YE", // Yemen
  "ZW", // Zimbabwe — Zimbabwe Bird
];

// ---------------------------------------------------------------------------
// HARD
// Small/microstates, Pacific & Caribbean islands, Central Asia, most of
// sub-Saharan Africa, and similar-pattern flags hard to tell apart.
// ---------------------------------------------------------------------------
export const HARD_CODES: readonly string[] = [
  "AD", // Andorra
  "AF", // Afghanistan
  "AG", // Antigua and Barbuda
  "AM", // Armenia
  "AO", // Angola
  "AZ", // Azerbaijan
  "BB", // Barbados
  "BF", // Burkina Faso
  "BH", // Bahrain
  "BI", // Burundi
  "BJ", // Benin
  "BN", // Brunei
  "BS", // Bahamas
  "BT", // Bhutan — dragon
  "BW", // Botswana
  "BZ", // Belize
  "CD", // Congo (DRC)
  "CF", // Central African Republic
  "CG", // Congo (Republic)
  "CV", // Cabo Verde
  "DJ", // Djibouti
  "DM", // Dominica
  "ER", // Eritrea
  "GA", // Gabon
  "GD", // Grenada
  "GE", // Georgia
  "GM", // Gambia
  "GN", // Guinea
  "GQ", // Equatorial Guinea
  "GW", // Guinea-Bissau
  "GY", // Guyana — "Golden Arrowhead"
  "KG", // Kyrgyzstan
  "KI", // Kiribati
  "KM", // Comoros
  "KN", // Saint Kitts and Nevis
  "KZ", // Kazakhstan
  "LA", // Laos
  "LC", // Saint Lucia
  "LI", // Liechtenstein
  "LR", // Liberia
  "LS", // Lesotho
  "MC", // Monaco
  "MD", // Moldova
  "ME", // Montenegro
  "MH", // Marshall Islands
  "ML", // Mali
  "MR", // Mauritania
  "MU", // Mauritius
  "MV", // Maldives
  "MW", // Malawi
  "NA", // Namibia
  "NE", // Niger
  "NI", // Nicaragua
  "NR", // Nauru
  "PG", // Papua New Guinea
  "PW", // Palau
  "PY", // Paraguay
  "RW", // Rwanda
  "SB", // Solomon Islands
  "SC", // Seychelles
  "SD", // Sudan
  "SL", // Sierra Leone
  "SM", // San Marino
  "SO", // Somalia
  "SR", // Suriname
  "SS", // South Sudan
  "ST", // São Tomé and Príncipe
  "SV", // El Salvador
  "SZ", // Eswatini
  "TD", // Chad
  "TG", // Togo
  "TJ", // Tajikistan
  "TL", // Timor-Leste
  "TM", // Turkmenistan
  "TO", // Tonga
  "TT", // Trinidad and Tobago
  "TV", // Tuvalu
  "FM", // Micronesia
  "UZ", // Uzbekistan
  "VC", // Saint Vincent and the Grenadines
  "VU", // Vanuatu
  "WS", // Samoa
  "ZM", // Zambia
];

// ---------------------------------------------------------------------------
// Lookup helpers — exported for use by the game pool / distractor logic.
// ---------------------------------------------------------------------------

const BUCKETS: Record<Difficulty, readonly string[]> = {
  easy: EASY_CODES,
  moderate: MODERATE_CODES,
  hard: HARD_CODES,
};

/** Returns the (uppercase) ISO codes assigned to the given difficulty. */
export function codesForDifficulty(d: Difficulty): readonly string[] {
  return BUCKETS[d];
}

/** Look up a single country's difficulty. Returns null if not classified. */
const DIFFICULTY_BY_CODE = new Map<string, Difficulty>(
  [
    ...EASY_CODES.map((c) => [c, "easy"] as const),
    ...MODERATE_CODES.map((c) => [c, "moderate"] as const),
    ...HARD_CODES.map((c) => [c, "hard"] as const),
  ],
);

export function difficultyOf(code: string): Difficulty | null {
  return DIFFICULTY_BY_CODE.get(code.toUpperCase()) ?? null;
}

/** Per-difficulty UX configuration: dropdown size + max attempts per flag. */
export const DIFFICULTY_CONFIG: Record<
  Difficulty,
  { optionCount: number; maxAttempts: number; label: string; tagline: string }
> = {
  easy: {
    optionCount: 5,
    maxAttempts: 1,
    label: "Easy",
    tagline: "5 choices · 1 try",
  },
  moderate: {
    optionCount: 15,
    maxAttempts: 1,
    label: "Moderate",
    tagline: "15 choices · 1 try",
  },
  hard: {
    optionCount: 50,
    maxAttempts: 1,
    label: "Hard",
    tagline: "50 choices · 1 try",
  },
};
