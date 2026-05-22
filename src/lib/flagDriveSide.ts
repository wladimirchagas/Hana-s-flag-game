/**
 * Which side of the road each country drives on.
 *
 * Only left-hand traffic (LHT) countries are listed here; every other
 * sovereign state drives on the right (RHT). Source: Wikipedia
 * "Left- and right-hand traffic" and World Population Review.
 *
 * Keyed on ISO 3166-1 alpha-2 code.
 */
export type DriveSide = "left" | "right";

/** Set of alpha-2 codes for countries that drive on the LEFT. */
const LEFT_COUNTRIES: ReadonlySet<string> = new Set([
  // ── British Isles ─────────────────────────────────────────────────────────
  "GB", // United Kingdom
  "IE", // Ireland
  "MT", // Malta
  "CY", // Cyprus

  // ── South Asia ────────────────────────────────────────────────────────────
  "IN", // India
  "BD", // Bangladesh
  "LK", // Sri Lanka
  "NP", // Nepal
  "BT", // Bhutan
  "MV", // Maldives

  // ── South-East Asia ───────────────────────────────────────────────────────
  "MY", // Malaysia
  "SG", // Singapore
  "ID", // Indonesia
  "BN", // Brunei
  "TH", // Thailand
  "TL", // Timor-Leste

  // ── East Asia ─────────────────────────────────────────────────────────────
  "JP", // Japan

  // ── Oceania ───────────────────────────────────────────────────────────────
  "AU", // Australia
  "NZ", // New Zealand
  "PG", // Papua New Guinea
  "FJ", // Fiji
  "TO", // Tonga
  "WS", // Samoa (switched from right in 2009)
  "TV", // Tuvalu
  "KI", // Kiribati
  "NR", // Nauru
  "VU", // Vanuatu
  "SB", // Solomon Islands

  // ── Eastern & Southern Africa ─────────────────────────────────────────────
  "KE", // Kenya
  "TZ", // Tanzania
  "UG", // Uganda
  "ZA", // South Africa
  "ZW", // Zimbabwe
  "ZM", // Zambia
  "MW", // Malawi
  "MZ", // Mozambique
  "BW", // Botswana
  "NA", // Namibia
  "LS", // Lesotho
  "SZ", // Eswatini
  "MU", // Mauritius
  "SC", // Seychelles

  // ── Caribbean & South America ─────────────────────────────────────────────
  "JM", // Jamaica
  "TT", // Trinidad and Tobago
  "BB", // Barbados
  "GY", // Guyana
  "BS", // Bahamas
  "AG", // Antigua and Barbuda
  "DM", // Dominica
  "GD", // Grenada
  "KN", // Saint Kitts and Nevis
  "LC", // Saint Lucia
  "VC", // Saint Vincent and the Grenadines
]);

/**
 * Returns which side of the road a country drives on.
 * Defaults to "right" for any code not explicitly listed as left.
 */
export function getDriveSide(code: string): DriveSide {
  return LEFT_COUNTRIES.has(code) ? "left" : "right";
}

/** Full lookup table for all countries. Defaults to "right". */
export function FLAG_DRIVE_SIDE_MAP(code: string): DriveSide {
  return getDriveSide(code);
}
