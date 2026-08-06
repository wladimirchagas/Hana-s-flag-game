// ISO 3166-1 alpha-2 codes for the 195 UN states (193 members + 2 observers),
// paired with their English short names. Must stay in sync with
// src/lib/unMemberStates.ts UN_MEMBER_CODES (the authoritative source for rule #1).
import { loadLearnedCodes } from "./learnedFlags";
import { notifyFlagDataChanged, pushSelectedCodes } from "./profileSync";

export type CountryOption = { code: string; name: string };

const UN_MEMBERS: readonly CountryOption[] = [
  { code: "AF", name: "Afghanistan" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AD", name: "Andorra" },
  { code: "AO", name: "Angola" },
  { code: "AG", name: "Antigua and Barbuda" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BS", name: "Bahamas" },
  { code: "BH", name: "Bahrain" },
  { code: "BD", name: "Bangladesh" },
  { code: "BB", name: "Barbados" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" },
  { code: "BT", name: "Bhutan" },
  { code: "BO", name: "Bolivia" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BW", name: "Botswana" },
  { code: "BR", name: "Brazil" },
  { code: "BN", name: "Brunei" },
  { code: "BG", name: "Bulgaria" },
  { code: "BF", name: "Burkina Faso" },
  { code: "BI", name: "Burundi" },
  { code: "CV", name: "Cabo Verde" },
  { code: "KH", name: "Cambodia" },
  { code: "CM", name: "Cameroon" },
  { code: "CA", name: "Canada" },
  { code: "CF", name: "Central African Republic" },
  { code: "TD", name: "Chad" },
  { code: "CL", name: "Chile" },
  { code: "CN", name: "China" },
  { code: "CO", name: "Colombia" },
  { code: "KM", name: "Comoros" },
  { code: "CG", name: "Congo" },
  { code: "CD", name: "Congo (DRC)" },
  { code: "CR", name: "Costa Rica" },
  { code: "CI", name: "Côte d’Ivoire" },
  { code: "HR", name: "Croatia" },
  { code: "CU", name: "Cuba" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czechia" },
  { code: "DK", name: "Denmark" },
  { code: "DJ", name: "Djibouti" },
  { code: "DM", name: "Dominica" },
  { code: "DO", name: "Dominican Republic" },
  { code: "EC", name: "Ecuador" },
  { code: "EG", name: "Egypt" },
  { code: "SV", name: "El Salvador" },
  { code: "GQ", name: "Equatorial Guinea" },
  { code: "ER", name: "Eritrea" },
  { code: "EE", name: "Estonia" },
  { code: "SZ", name: "Eswatini" },
  { code: "ET", name: "Ethiopia" },
  { code: "FJ", name: "Fiji" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GA", name: "Gabon" },
  { code: "GM", name: "Gambia" },
  { code: "GE", name: "Georgia" },
  { code: "DE", name: "Germany" },
  { code: "GH", name: "Ghana" },
  { code: "GR", name: "Greece" },
  { code: "GD", name: "Grenada" },
  { code: "GT", name: "Guatemala" },
  { code: "GN", name: "Guinea" },
  { code: "GW", name: "Guinea-Bissau" },
  { code: "GY", name: "Guyana" },
  { code: "HT", name: "Haiti" },
  { code: "HN", name: "Honduras" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IR", name: "Iran" },
  { code: "IQ", name: "Iraq" },
  { code: "IE", name: "Ireland" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" },
  { code: "JM", name: "Jamaica" },
  { code: "JP", name: "Japan" },
  { code: "JO", name: "Jordan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KE", name: "Kenya" },
  { code: "KI", name: "Kiribati" },
  { code: "KP", name: "North Korea" },
  { code: "KR", name: "South Korea" },
  { code: "KW", name: "Kuwait" },
  { code: "KG", name: "Kyrgyzstan" },
  { code: "LA", name: "Laos" },
  { code: "LV", name: "Latvia" },
  { code: "LB", name: "Lebanon" },
  { code: "LS", name: "Lesotho" },
  { code: "LR", name: "Liberia" },
  { code: "LY", name: "Libya" },
  { code: "LI", name: "Liechtenstein" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MG", name: "Madagascar" },
  { code: "MW", name: "Malawi" },
  { code: "MY", name: "Malaysia" },
  { code: "MV", name: "Maldives" },
  { code: "ML", name: "Mali" },
  { code: "MT", name: "Malta" },
  { code: "MH", name: "Marshall Islands" },
  { code: "MR", name: "Mauritania" },
  { code: "MU", name: "Mauritius" },
  { code: "MX", name: "Mexico" },
  { code: "FM", name: "Micronesia" },
  { code: "MD", name: "Moldova" },
  { code: "MC", name: "Monaco" },
  { code: "MN", name: "Mongolia" },
  { code: "ME", name: "Montenegro" },
  { code: "MA", name: "Morocco" },
  { code: "MZ", name: "Mozambique" },
  { code: "MM", name: "Myanmar" },
  { code: "NA", name: "Namibia" },
  // Renamed 2026: the UN member-states list now reads "Naoero" (Republic of Naoero)
  // after Nauru's 13 May 2026 constitutional amendment and its 26 June 2026
  // notification to the UN. https://www.un.org/en/about-us/member-states/naoero
  { code: "NR", name: "Naoero" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" },
  { code: "NZ", name: "New Zealand" },
  { code: "NI", name: "Nicaragua" },
  { code: "NE", name: "Niger" },
  { code: "NG", name: "Nigeria" },
  { code: "MK", name: "North Macedonia" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "PW", name: "Palau" },
  { code: "PA", name: "Panama" },
  { code: "PG", name: "Papua New Guinea" },
  { code: "PY", name: "Paraguay" },
  { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "QA", name: "Qatar" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russia" },
  { code: "RW", name: "Rwanda" },
  { code: "KN", name: "Saint Kitts and Nevis" },
  { code: "LC", name: "Saint Lucia" },
  { code: "VC", name: "Saint Vincent and the Grenadines" },
  { code: "WS", name: "Samoa" },
  { code: "SM", name: "San Marino" },
  { code: "ST", name: "São Tomé and Príncipe" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SN", name: "Senegal" },
  { code: "RS", name: "Serbia" },
  { code: "SC", name: "Seychelles" },
  { code: "SL", name: "Sierra Leone" },
  { code: "SG", name: "Singapore" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "SB", name: "Solomon Islands" },
  { code: "SO", name: "Somalia" },
  { code: "ZA", name: "South Africa" },
  { code: "SS", name: "South Sudan" },
  { code: "ES", name: "Spain" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SD", name: "Sudan" },
  { code: "SR", name: "Suriname" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "SY", name: "Syria" },
  { code: "TJ", name: "Tajikistan" },
  { code: "TZ", name: "Tanzania" },
  { code: "TH", name: "Thailand" },
  { code: "TL", name: "Timor-Leste" },
  { code: "TG", name: "Togo" },
  { code: "TO", name: "Tonga" },
  { code: "TT", name: "Trinidad and Tobago" },
  { code: "TN", name: "Tunisia" },
  { code: "TR", name: "Türkiye" },
  { code: "TM", name: "Turkmenistan" },
  { code: "TV", name: "Tuvalu" },
  { code: "UG", name: "Uganda" },
  { code: "UA", name: "Ukraine" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VU", name: "Vanuatu" },
  { code: "VE", name: "Venezuela" },
  { code: "VN", name: "Vietnam" },
  { code: "YE", name: "Yemen" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
  { code: "VA", name: "Vatican City" },
  { code: "PS", name: "Palestine" },
];

export const ALL_COUNTRY_OPTIONS: readonly CountryOption[] = [...UN_MEMBERS].sort(
  (a, b) => a.name.localeCompare(b.name, "en"),
);

/**
 * Names a country used to be known by, so search still finds it after a rename.
 *
 * The list above carries each country's CURRENT name, which is what a fact sheet
 * must show — but a player typing "Turkey", "Swaziland" or "Nauru" would otherwise
 * get no results at all, because the search matches on the displayed name only.
 * Every entry is a name the state itself, or the UN, used before the change; this
 * is a search index, never something rendered as the country's name.
 */
export const FORMER_COUNTRY_NAMES: Readonly<Record<string, readonly string[]>> = {
  NR: ["Nauru"],                    // renamed Naoero, 2026
  TR: ["Turkey"],                   // English name changed to Türkiye, 2022
  MK: ["Macedonia"],                // North Macedonia, 2019 (Prespa agreement)
  SZ: ["Swaziland"],                // Eswatini, 2018
  CZ: ["Czech Republic"],           // Czechia registered as the short name, 2016
  CI: ["Ivory Coast"],              // Côte d'Ivoire in all languages, from 1986
  CV: ["Cape Verde"],               // Cabo Verde in all languages, from 2013
  MM: ["Burma"],                    // Myanmar, 1989
  BF: ["Upper Volta"],              // Burkina Faso, 1984
  CD: ["Zaire"],                    // Zaire 1971–1997
  BJ: ["Dahomey"],                  // Benin, 1975
  SR: ["Dutch Guiana"],             // the English name of the Dutch colony
  ZW: ["Rhodesia", "Southern Rhodesia"], // Zimbabwe, 1980
  LK: ["Ceylon"],                   // Sri Lanka, 1972
  TH: ["Siam"],                     // Thailand, 1939
  IR: ["Persia"],                   // Iran, 1935
  KH: ["Kampuchea"],                // Cambodia
  BZ: ["British Honduras"],         // Belize, 1973
  BW: ["Bechuanaland"],             // Botswana, 1966
  LS: ["Basutoland"],               // Lesotho, 1966
  MW: ["Nyasaland"],                // Malawi, 1964
  ZM: ["Northern Rhodesia"],        // Zambia, 1964
  GY: ["British Guiana"],           // Guyana, 1966
  GQ: ["Spanish Guinea"],           // Equatorial Guinea, 1968
  GW: ["Portuguese Guinea"],        // Guinea-Bissau, 1973
  TZ: ["Tanganyika"],               // Tanzania, 1964
  DJ: ["French Somaliland"],        // Djibouti, 1977
  GH: ["Gold Coast"],               // Ghana, 1957
  ML: ["French Sudan"],             // Mali, 1960
  CF: ["Ubangi-Shari"],             // Central African Republic, 1958
  NA: ["South West Africa"],        // Namibia, 1990
  WS: ["Western Samoa"],            // Samoa, 1997
  AE: ["Trucial States"],           // United Arab Emirates, 1971
};

/** Search haystack for a country: its current name plus any former names. */
export function countrySearchNames(code: string, name: string): string[] {
  const former = FORMER_COUNTRY_NAMES[code];
  return former ? [name, ...former] : [name];
}

const VALID_CODES: ReadonlySet<string> = new Set(UN_MEMBERS.map((c) => c.code));

/**
 * Starter set Hana ships with. The effective default selection (returned
 * by `loadStoredSelection` when nothing is saved yet) also merges in any
 * codes the player has unlocked via the perfect-streak reward flow — see
 * `getDefaultSelectedCodes` below.
 */
export const STARTER_SELECTED_CODES: readonly string[] = [
  "AU", "BR", "IS", "IT", "CA", "NZ", "IN", "JP", "MY", "FR", "ZA", "CN",
];

/**
 * Legacy export kept so any out-of-tree consumers that still reference
 * DEFAULT_SELECTED_CODES continue to compile. New code should prefer
 * `getDefaultSelectedCodes()` which also folds in learned flags.
 */
export const DEFAULT_SELECTED_CODES = STARTER_SELECTED_CODES;

/**
 * Default selection = starter set + any flags the user has unlocked.
 * Order: unlocked-first (newest unlocks float to the top of the list, the
 * starter set follows), uniqued so a code never appears twice.
 */
export function getDefaultSelectedCodes(
  learnedCodes: readonly string[] = [],
): string[] {
  const valid = learnedCodes.filter((c) => VALID_CODES.has(c));
  const seen = new Set<string>();
  const out: string[] = [];
  for (const code of [...valid, ...STARTER_SELECTED_CODES]) {
    if (seen.has(code)) continue;
    seen.add(code);
    out.push(code);
  }
  return out;
}

const ORDER_KEY = "flagGame.selectedCountryOrder";

export type StoredSelection = { codes: string[] };

export function loadStoredSelection(): StoredSelection {
  try {
    const raw = localStorage.getItem(ORDER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) {
        const valid = parsed.filter(
          (c): c is string => typeof c === "string" && VALID_CODES.has(c),
        );
        if (valid.length > 0) return { codes: valid };
      }
    }
  } catch {
    // fall through to defaults
  }
  // First-load fallback: persist the defaults immediately so the picker
  // modal and the Learn-page "In my list" toggle read the same data
  // instead of an implicit in-memory fallback. Without this the toggle
  // would flip back to "Add to my list" after any state change that
  // re-runs loadStoredSelection without the corresponding save. The
  // starter set is merged with any flags the player has already unlocked
  // via the perfect-streak reward so unlocks survive a "no saved
  // selection" state (cleared storage, fresh device).
  const defaults: StoredSelection = {
    codes: getDefaultSelectedCodes(loadLearnedCodes()),
  };
  saveStoredSelection(defaults);
  return defaults;
}

function writeSelectionLocal(codes: readonly string[]): void {
  try {
    localStorage.setItem(ORDER_KEY, JSON.stringify([...codes]));
  } catch {
    // ignore quota / privacy mode errors
  }
}

/** Save the selection locally AND sync it up to the active profile. */
export function saveStoredSelection(selection: StoredSelection): void {
  writeSelectionLocal(selection.codes);
  pushSelectedCodes(selection.codes);
  notifyFlagDataChanged();
}

/**
 * Write a selection that came DOWN from the active profile (another device).
 * Updates localStorage and notifies the UI, but does NOT push back to Firestore.
 */
export function hydrateSelectedCodes(codes: readonly string[]): void {
  writeSelectionLocal(codes);
  notifyFlagDataChanged();
}

/**
 * Add a single country code to the saved selection if it isn't already
 * there. Used by the streak-reward unlock flow so a freshly-learned flag
 * is immediately part of the next Hana's Game run. Newly-added codes are
 * placed at the front so they're visible at the top of the picker list.
 */
export function addCodeToStoredSelection(code: string): string[] {
  if (!VALID_CODES.has(code)) return loadStoredSelection().codes;
  const current = loadStoredSelection().codes;
  if (current.includes(code)) return current;
  const next = [code, ...current];
  saveStoredSelection({ codes: next });
  return next;
}
