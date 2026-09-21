// World Justice Project Rule of Law Index 2025.
// Source CSVs (official WJP SPA data files, byte-copied):
//   scripts/data/wjp-rule-of-law-2025.csv
//   scripts/data/wjp-rule-of-law-2024.csv
//   https://worldjusticeproject.org/rule-of-law-index/data/2025.csv
//   https://worldjusticeproject.org/rule-of-law-index/data/2024.csv
// Historical workbook (provenance):
//   https://worldjusticeproject.org/rule-of-law-index/downloads/2025_wjp_rule_of_law_index_HISTORICAL_DATA_FILE.xlsx
// Score 0 (weakest adherence) – 1 (strongest). Rank is the published global
// competition rank on the full 143-country 2025 sample. rankChange compares
// ranks among the 142 countries present in both 2024 and 2025 (positive =
// improved). rating = map score band on the published 2-dp score.
// Hong Kong and Kosovo are in the WJP sample but are not UN members in this
// app — they are omitted, not remapped.
//
// Do not invent scores. Re-extract from the official CSVs when refreshing.

/**
 * @type {Record<string, { year: number, rating: string, rank: number, rankChange?: number, score: number }>}
 */
export const WJP_2025_DATA = {
  "AE": {"year": 2025, "rating": "0.60–0.69", "rank": 37, "score": 0.64, "rankChange": 2}, // United Arab Emirates
  "AF": {"year": 2025, "rating": "0.30–0.39", "rank": 142, "score": 0.31, "rankChange": -1}, // Afghanistan
  "AG": {"year": 2025, "rating": "0.60–0.69", "rank": 38, "score": 0.64, "rankChange": -1}, // Antigua and Barbuda
  "AL": {"year": 2025, "rating": "0.40–0.49", "rank": 87, "score": 0.49, "rankChange": 3}, // Albania
  "AO": {"year": 2025, "rating": "0.40–0.49", "rank": 113, "score": 0.42, "rankChange": 3}, // Angola
  "AR": {"year": 2025, "rating": "0.50–0.59", "rank": 65, "score": 0.54, "rankChange": -1}, // Argentina
  "AT": {"year": 2025, "rating": "0.70–0.79", "rank": 12, "score": 0.79, "rankChange": 1}, // Austria
  "AU": {"year": 2025, "rating": "0.80–1.00", "rank": 11, "score": 0.8, "rankChange": 0}, // Australia
  "BA": {"year": 2025, "rating": "0.50–0.59", "rank": 70, "score": 0.52, "rankChange": 2}, // Bosnia and Herzegovina
  "BB": {"year": 2025, "rating": "0.60–0.69", "rank": 33, "score": 0.66, "rankChange": 2}, // Barbados
  "BD": {"year": 2025, "rating": "0.30–0.39", "rank": 125, "score": 0.39, "rankChange": 3}, // Bangladesh
  "BE": {"year": 2025, "rating": "0.70–0.79", "rank": 17, "score": 0.78, "rankChange": 0}, // Belgium
  "BF": {"year": 2025, "rating": "0.40–0.49", "rank": 101, "score": 0.45, "rankChange": -2}, // Burkina Faso
  "BG": {"year": 2025, "rating": "0.50–0.59", "rank": 61, "score": 0.55, "rankChange": -1}, // Bulgaria
  "BJ": {"year": 2025, "rating": "0.40–0.49", "rank": 94, "score": 0.47, "rankChange": 0}, // Benin
  "BO": {"year": 2025, "rating": "0.30–0.39", "rank": 131, "score": 0.37, "rankChange": 1}, // Bolivia
  "BR": {"year": 2025, "rating": "0.50–0.59", "rank": 78, "score": 0.5, "rankChange": 3}, // Brazil
  "BS": {"year": 2025, "rating": "0.50–0.59", "rank": 51, "score": 0.58, "rankChange": 0}, // The Bahamas
  "BW": {"year": 2025, "rating": "0.60–0.69", "rank": 50, "score": 0.6, "rankChange": 2}, // Botswana
  "BY": {"year": 2025, "rating": "0.40–0.49", "rank": 105, "score": 0.44, "rankChange": 1}, // Belarus
  "BZ": {"year": 2025, "rating": "0.50–0.59", "rank": 82, "score": 0.5, "rankChange": 1}, // Belize
  "CA": {"year": 2025, "rating": "0.70–0.79", "rank": 13, "score": 0.79, "rankChange": -1}, // Canada
  "CD": {"year": 2025, "rating": "0.30–0.39", "rank": 136, "score": 0.34, "rankChange": 1}, // Congo, Dem. Rep.
  "CG": {"year": 2025, "rating": "0.40–0.49", "rank": 123, "score": 0.4, "rankChange": -1}, // Congo, Rep.
  "CI": {"year": 2025, "rating": "0.40–0.49", "rank": 106, "score": 0.44, "rankChange": -1}, // Côte d'Ivoire
  "CL": {"year": 2025, "rating": "0.60–0.69", "rank": 35, "score": 0.66, "rankChange": 1}, // Chile
  "CM": {"year": 2025, "rating": "0.30–0.39", "rank": 134, "score": 0.36, "rankChange": 0}, // Cameroon
  "CN": {"year": 2025, "rating": "0.40–0.49", "rank": 92, "score": 0.48, "rankChange": 4}, // China
  "CO": {"year": 2025, "rating": "0.40–0.49", "rank": 95, "score": 0.47, "rankChange": -3}, // Colombia
  "CR": {"year": 2025, "rating": "0.60–0.69", "rank": 28, "score": 0.68, "rankChange": 1}, // Costa Rica
  "CY": {"year": 2025, "rating": "0.60–0.69", "rank": 30, "score": 0.67, "rankChange": 1}, // Cyprus
  "CZ": {"year": 2025, "rating": "0.70–0.79", "rank": 20, "score": 0.74, "rankChange": 0}, // Czechia
  "DE": {"year": 2025, "rating": "0.80–1.00", "rank": 6, "score": 0.83, "rankChange": -1}, // Germany
  "DK": {"year": 2025, "rating": "0.80–1.00", "rank": 1, "score": 0.9, "rankChange": 0}, // Denmark
  "DM": {"year": 2025, "rating": "0.50–0.59", "rank": 54, "score": 0.58, "rankChange": 0}, // Dominica
  "DO": {"year": 2025, "rating": "0.50–0.59", "rank": 76, "score": 0.5, "rankChange": 11}, // Dominican Republic
  "DZ": {"year": 2025, "rating": "0.40–0.49", "rank": 88, "score": 0.49, "rankChange": -3}, // Algeria
  "EC": {"year": 2025, "rating": "0.40–0.49", "rank": 99, "score": 0.46, "rankChange": -1}, // Ecuador
  "EE": {"year": 2025, "rating": "0.80–1.00", "rank": 10, "score": 0.82, "rankChange": 0}, // Estonia
  "EG": {"year": 2025, "rating": "0.30–0.39", "rank": 135, "score": 0.35, "rankChange": 1}, // Egypt, Arab Rep.
  "ES": {"year": 2025, "rating": "0.70–0.79", "rank": 25, "score": 0.71, "rankChange": 0}, // Spain
  "ET": {"year": 2025, "rating": "0.30–0.39", "rank": 132, "score": 0.36, "rankChange": -1}, // Ethiopia
  "FI": {"year": 2025, "rating": "0.80–1.00", "rank": 3, "score": 0.87, "rankChange": 0}, // Finland
  "FR": {"year": 2025, "rating": "0.70–0.79", "rank": 22, "score": 0.72, "rankChange": 0}, // France
  "GA": {"year": 2025, "rating": "0.40–0.49", "rank": 122, "score": 0.4, "rankChange": 1}, // Gabon
  "GB": {"year": 2025, "rating": "0.70–0.79", "rank": 14, "score": 0.78, "rankChange": 1}, // United Kingdom
  "GD": {"year": 2025, "rating": "0.60–0.69", "rank": 49, "score": 0.6, "rankChange": 0}, // Grenada
  "GE": {"year": 2025, "rating": "0.50–0.59", "rank": 52, "score": 0.58, "rankChange": -2}, // Georgia
  "GH": {"year": 2025, "rating": "0.50–0.59", "rank": 63, "score": 0.54, "rankChange": 0}, // Ghana
  "GM": {"year": 2025, "rating": "0.40–0.49", "rank": 89, "score": 0.49, "rankChange": -1}, // The Gambia
  "GN": {"year": 2025, "rating": "0.40–0.49", "rank": 117, "score": 0.41, "rankChange": 3}, // Guinea
  "GR": {"year": 2025, "rating": "0.60–0.69", "rank": 48, "score": 0.6, "rankChange": 0}, // Greece
  "GT": {"year": 2025, "rating": "0.40–0.49", "rank": 110, "score": 0.44, "rankChange": -2}, // Guatemala
  "GY": {"year": 2025, "rating": "0.50–0.59", "rank": 80, "score": 0.5, "rankChange": -2}, // Guyana
  "HN": {"year": 2025, "rating": "0.40–0.49", "rank": 116, "score": 0.41, "rankChange": 1}, // Honduras
  "HR": {"year": 2025, "rating": "0.60–0.69", "rank": 46, "score": 0.61, "rankChange": 0}, // Croatia
  "HT": {"year": 2025, "rating": "0.30–0.39", "rank": 140, "score": 0.32, "rankChange": 0}, // Haiti
  "HU": {"year": 2025, "rating": "0.50–0.59", "rank": 79, "score": 0.5, "rankChange": -5}, // Hungary
  "ID": {"year": 2025, "rating": "0.50–0.59", "rank": 69, "score": 0.52, "rankChange": 0}, // Indonesia
  "IE": {"year": 2025, "rating": "0.80–1.00", "rank": 8, "score": 0.82, "rankChange": 1}, // Ireland
  "IN": {"year": 2025, "rating": "0.40–0.49", "rank": 86, "score": 0.49, "rankChange": -6}, // India
  "IR": {"year": 2025, "rating": "0.30–0.39", "rank": 128, "score": 0.38, "rankChange": 1}, // Iran, Islamic Rep.
  "IT": {"year": 2025, "rating": "0.60–0.69", "rank": 34, "score": 0.66, "rankChange": -2}, // Italy
  "JM": {"year": 2025, "rating": "0.50–0.59", "rank": 57, "score": 0.57, "rankChange": -2}, // Jamaica
  "JO": {"year": 2025, "rating": "0.50–0.59", "rank": 62, "score": 0.55, "rankChange": 0}, // Jordan
  "JP": {"year": 2025, "rating": "0.70–0.79", "rank": 15, "score": 0.78, "rankChange": -1}, // Japan
  "KE": {"year": 2025, "rating": "0.40–0.49", "rank": 102, "score": 0.45, "rankChange": 1}, // Kenya
  "KG": {"year": 2025, "rating": "0.40–0.49", "rank": 104, "score": 0.45, "rankChange": -2}, // Kyrgyz Republic
  "KH": {"year": 2025, "rating": "0.30–0.39", "rank": 141, "score": 0.31, "rankChange": 1}, // Cambodia
  "KN": {"year": 2025, "rating": "0.60–0.69", "rank": 40, "score": 0.63, "rankChange": -2}, // St. Kitts and Nevis
  "KR": {"year": 2025, "rating": "0.70–0.79", "rank": 19, "score": 0.74, "rankChange": 0}, // Korea, Rep.
  "KW": {"year": 2025, "rating": "0.50–0.59", "rank": 53, "score": 0.58, "rankChange": 0}, // Kuwait
  "KZ": {"year": 2025, "rating": "0.50–0.59", "rank": 66, "score": 0.54, "rankChange": 0}, // Kazakhstan
  "LB": {"year": 2025, "rating": "0.40–0.49", "rank": 107, "score": 0.44, "rankChange": 2}, // Lebanon
  "LC": {"year": 2025, "rating": "0.60–0.69", "rank": 43, "score": 0.62, "rankChange": 0}, // St. Lucia
  "LK": {"year": 2025, "rating": "0.50–0.59", "rank": 74, "score": 0.51, "rankChange": 2}, // Sri Lanka
  "LR": {"year": 2025, "rating": "0.40–0.49", "rank": 108, "score": 0.44, "rankChange": 2}, // Liberia
  "LT": {"year": 2025, "rating": "0.70–0.79", "rank": 18, "score": 0.77, "rankChange": 0}, // Lithuania
  "LU": {"year": 2025, "rating": "0.80–1.00", "rank": 7, "score": 0.83, "rankChange": 0}, // Luxembourg
  "LV": {"year": 2025, "rating": "0.70–0.79", "rank": 21, "score": 0.73, "rankChange": 0}, // Latvia
  "MA": {"year": 2025, "rating": "0.40–0.49", "rank": 91, "score": 0.48, "rankChange": 2}, // Morocco
  "MD": {"year": 2025, "rating": "0.50–0.59", "rank": 68, "score": 0.53, "rankChange": -3}, // Moldova
  "ME": {"year": 2025, "rating": "0.50–0.59", "rank": 55, "score": 0.57, "rankChange": 2}, // Montenegro
  "MG": {"year": 2025, "rating": "0.40–0.49", "rank": 112, "score": 0.43, "rankChange": 1}, // Madagascar
  "MK": {"year": 2025, "rating": "0.50–0.59", "rank": 64, "score": 0.54, "rankChange": 4}, // North Macedonia
  "ML": {"year": 2025, "rating": "0.30–0.39", "rank": 126, "score": 0.39, "rankChange": -1}, // Mali
  "MM": {"year": 2025, "rating": "0.30–0.39", "rank": 138, "score": 0.34, "rankChange": 1}, // Myanmar
  "MN": {"year": 2025, "rating": "0.50–0.59", "rank": 67, "score": 0.53, "rankChange": 0}, // Mongolia
  "MR": {"year": 2025, "rating": "0.30–0.39", "rank": 133, "score": 0.36, "rankChange": 0}, // Mauritania
  "MT": {"year": 2025, "rating": "0.60–0.69", "rank": 31, "score": 0.67, "rankChange": -1}, // Malta
  "MU": {"year": 2025, "rating": "0.60–0.69", "rank": 47, "score": 0.6, "rankChange": 0}, // Mauritius
  "MW": {"year": 2025, "rating": "0.50–0.59", "rank": 71, "score": 0.52, "rankChange": 0}, // Malawi
  "MX": {"year": 2025, "rating": "0.40–0.49", "rank": 121, "score": 0.4, "rankChange": -2}, // Mexico
  "MY": {"year": 2025, "rating": "0.50–0.59", "rank": 56, "score": 0.57, "rankChange": 0}, // Malaysia
  "MZ": {"year": 2025, "rating": "0.30–0.39", "rank": 129, "score": 0.37, "rankChange": -3}, // Mozambique
  "NA": {"year": 2025, "rating": "0.60–0.69", "rank": 45, "score": 0.61, "rankChange": 0}, // Namibia
  "NE": {"year": 2025, "rating": "0.40–0.49", "rank": 115, "score": 0.42, "rankChange": 0}, // Niger
  "NG": {"year": 2025, "rating": "0.40–0.49", "rank": 120, "score": 0.41, "rankChange": 1}, // Nigeria
  "NI": {"year": 2025, "rating": "0.30–0.39", "rank": 139, "score": 0.33, "rankChange": -1}, // Nicaragua
  "NL": {"year": 2025, "rating": "0.80–1.00", "rank": 9, "score": 0.82, "rankChange": -1}, // Netherlands
  "NO": {"year": 2025, "rating": "0.80–1.00", "rank": 2, "score": 0.89, "rankChange": 0}, // Norway
  "NP": {"year": 2025, "rating": "0.50–0.59", "rank": 72, "score": 0.52, "rankChange": -2}, // Nepal
  "NZ": {"year": 2025, "rating": "0.80–1.00", "rank": 5, "score": 0.83, "rankChange": 1}, // New Zealand
  "PA": {"year": 2025, "rating": "0.50–0.59", "rank": 73, "score": 0.52, "rankChange": 0}, // Panama
  "PE": {"year": 2025, "rating": "0.40–0.49", "rank": 93, "score": 0.48, "rankChange": -2}, // Peru
  "PH": {"year": 2025, "rating": "0.40–0.49", "rank": 97, "score": 0.46, "rankChange": 3}, // Philippines
  "PK": {"year": 2025, "rating": "0.30–0.39", "rank": 130, "score": 0.37, "rankChange": 0}, // Pakistan
  "PL": {"year": 2025, "rating": "0.60–0.69", "rank": 32, "score": 0.66, "rankChange": 1}, // Poland
  "PT": {"year": 2025, "rating": "0.60–0.69", "rank": 29, "score": 0.67, "rankChange": -1}, // Portugal
  "PY": {"year": 2025, "rating": "0.40–0.49", "rank": 100, "score": 0.45, "rankChange": 1}, // Paraguay
  "QA": {"year": 2025, "rating": "0.60–0.69", "rank": 41, "score": 0.62}, // Qatar
  "RO": {"year": 2025, "rating": "0.60–0.69", "rank": 44, "score": 0.61, "rankChange": -2}, // Romania
  "RS": {"year": 2025, "rating": "0.40–0.49", "rank": 96, "score": 0.47, "rankChange": -1}, // Serbia
  "RU": {"year": 2025, "rating": "0.40–0.49", "rank": 119, "score": 0.41, "rankChange": -5}, // Russian Federation
  "RW": {"year": 2025, "rating": "0.60–0.69", "rank": 39, "score": 0.63, "rankChange": 1}, // Rwanda
  "SD": {"year": 2025, "rating": "0.30–0.39", "rank": 137, "score": 0.34, "rankChange": -2}, // Sudan
  "SE": {"year": 2025, "rating": "0.80–1.00", "rank": 4, "score": 0.85, "rankChange": 0}, // Sweden
  "SG": {"year": 2025, "rating": "0.70–0.79", "rank": 16, "score": 0.78, "rankChange": 0}, // Singapore
  "SI": {"year": 2025, "rating": "0.60–0.69", "rank": 26, "score": 0.68, "rankChange": 1}, // Slovenia
  "SK": {"year": 2025, "rating": "0.60–0.69", "rank": 36, "score": 0.64, "rankChange": -2}, // Slovak Republic
  "SL": {"year": 2025, "rating": "0.40–0.49", "rank": 109, "score": 0.44, "rankChange": 2}, // Sierra Leone
  "SN": {"year": 2025, "rating": "0.50–0.59", "rank": 58, "score": 0.56, "rankChange": 3}, // Senegal
  "SR": {"year": 2025, "rating": "0.40–0.49", "rank": 84, "score": 0.49, "rankChange": 2}, // Suriname
  "SV": {"year": 2025, "rating": "0.40–0.49", "rank": 114, "score": 0.42, "rankChange": -2}, // El Salvador
  "TG": {"year": 2025, "rating": "0.40–0.49", "rank": 111, "score": 0.43, "rankChange": -4}, // Togo
  "TH": {"year": 2025, "rating": "0.50–0.59", "rank": 77, "score": 0.5, "rankChange": 2}, // Thailand
  "TN": {"year": 2025, "rating": "0.40–0.49", "rank": 85, "score": 0.49, "rankChange": -8}, // Tunisia
  "TR": {"year": 2025, "rating": "0.40–0.49", "rank": 118, "score": 0.41, "rankChange": 0}, // Türkiye
  "TT": {"year": 2025, "rating": "0.50–0.59", "rank": 75, "score": 0.51, "rankChange": 0}, // Trinidad and Tobago
  "TZ": {"year": 2025, "rating": "0.40–0.49", "rank": 98, "score": 0.46, "rankChange": -1}, // Tanzania
  "UA": {"year": 2025, "rating": "0.40–0.49", "rank": 90, "score": 0.48, "rankChange": -1}, // Ukraine
  "UG": {"year": 2025, "rating": "0.30–0.39", "rank": 127, "score": 0.38, "rankChange": 0}, // Uganda
  "US": {"year": 2025, "rating": "0.60–0.69", "rank": 27, "score": 0.68, "rankChange": -1}, // United States
  "UY": {"year": 2025, "rating": "0.70–0.79", "rank": 23, "score": 0.72, "rankChange": 1}, // Uruguay
  "UZ": {"year": 2025, "rating": "0.50–0.59", "rank": 81, "score": 0.5, "rankChange": 3}, // Uzbekistan
  "VC": {"year": 2025, "rating": "0.60–0.69", "rank": 42, "score": 0.62, "rankChange": 2}, // St. Vincent and the Grenadines
  "VE": {"year": 2025, "rating": "0.20–0.29", "rank": 143, "score": 0.26, "rankChange": 0}, // Venezuela, RB
  "VN": {"year": 2025, "rating": "0.50–0.59", "rank": 83, "score": 0.5, "rankChange": -1}, // Vietnam
  "ZA": {"year": 2025, "rating": "0.50–0.59", "rank": 60, "score": 0.56, "rankChange": -2}, // South Africa
  "ZM": {"year": 2025, "rating": "0.40–0.49", "rank": 103, "score": 0.45, "rankChange": 1}, // Zambia
  "ZW": {"year": 2025, "rating": "0.30–0.39", "rank": 124, "score": 0.39, "rankChange": 0}, // Zimbabwe
};

export const WJP_BAND_ORDER = [
  "0.80–1.00",
  "0.70–0.79",
  "0.60–0.69",
  "0.50–0.59",
  "0.40–0.49",
  "0.30–0.39",
  "0.20–0.29",
  "0.00–0.19",
];

/** Map score band for a published (2-dp) WJP overall score. */
export function wjpBandFromScore(score) {
  const s = Math.round(score * 100) / 100;
  if (s >= 0.8) return "0.80–1.00";
  if (s >= 0.7) return "0.70–0.79";
  if (s >= 0.6) return "0.60–0.69";
  if (s >= 0.5) return "0.50–0.59";
  if (s >= 0.4) return "0.40–0.49";
  if (s >= 0.3) return "0.30–0.39";
  if (s >= 0.2) return "0.20–0.29";
  return "0.00–0.19";
}
