// Democracy Perception Index 2026 — Nira Data / Alliance of Democracies.
// Source: DPI 2026 report (Country Appendix),
//   https://146165116.fs1.hubspotusercontent-eu1.net/hubfs/146165116/DPI%202026.pdf
// Survey: 94,146 respondents in 98 countries, 19 March–21 April 2026.
//
// Index Score = mean of eight net scores (% positive − % negative).
// Tiers at ±5 / ±15 (report): Very Positive ≥15, Positive 6…14, Neutral −5…5,
// Negative −14…−6, Very Negative ≤−15.
// Rank uses competition ranking on Index Score (ties share a rank; next skips).
//
// Taiwan and Puerto Rico appear in the report but are not UN members in this
// game’s country set — omitted here (same discipline as other indices).
// Do not invent scores. Re-read the Country Appendix when refreshing.

/**
 * @type {Record<string, { year: number, rating: string, rank: number, score: number }>}
 */
export const DPI_2026_DATA = {
  "SE": { "year": 2026, "rating": "Very Positive", "rank": 1, "score": 29 }, // Sweden
  "NO": { "year": 2026, "rating": "Very Positive", "rank": 2, "score": 23 }, // Norway
  "DK": { "year": 2026, "rating": "Very Positive", "rank": 3, "score": 21 }, // Denmark
  "FI": { "year": 2026, "rating": "Very Positive", "rank": 4, "score": 20 }, // Finland
  "CH": { "year": 2026, "rating": "Very Positive", "rank": 5, "score": 19 }, // Switzerland
  "GH": { "year": 2026, "rating": "Very Positive", "rank": 6, "score": 17 }, // Ghana
  "LK": { "year": 2026, "rating": "Very Positive", "rank": 7, "score": 16 }, // Sri Lanka
  "IN": { "year": 2026, "rating": "Very Positive", "rank": 8, "score": 15 }, // India
  "CN": { "year": 2026, "rating": "Positive", "rank": 9, "score": 14 }, // China
  "CA": { "year": 2026, "rating": "Positive", "rank": 10, "score": 13 }, // Canada
  "KR": { "year": 2026, "rating": "Positive", "rank": 11, "score": 12 }, // South Korea
  "OM": { "year": 2026, "rating": "Positive", "rank": 12, "score": 11 }, // Oman
  "NZ": { "year": 2026, "rating": "Positive", "rank": 12, "score": 11 }, // New Zealand
  "NL": { "year": 2026, "rating": "Positive", "rank": 14, "score": 10 }, // Netherlands
  "PH": { "year": 2026, "rating": "Positive", "rank": 14, "score": 10 }, // Philippines
  "VN": { "year": 2026, "rating": "Positive", "rank": 14, "score": 10 }, // Vietnam
  "CR": { "year": 2026, "rating": "Positive", "rank": 17, "score": 9 }, // Costa Rica
  "AT": { "year": 2026, "rating": "Positive", "rank": 17, "score": 9 }, // Austria
  "MY": { "year": 2026, "rating": "Positive", "rank": 17, "score": 9 }, // Malaysia
  "NA": { "year": 2026, "rating": "Positive", "rank": 20, "score": 8 }, // Namibia
  "DE": { "year": 2026, "rating": "Positive", "rank": 20, "score": 8 }, // Germany
  "SN": { "year": 2026, "rating": "Positive", "rank": 20, "score": 8 }, // Senegal
  "KW": { "year": 2026, "rating": "Positive", "rank": 23, "score": 7 }, // Kuwait
  "UY": { "year": 2026, "rating": "Positive", "rank": 23, "score": 7 }, // Uruguay
  "DZ": { "year": 2026, "rating": "Positive", "rank": 23, "score": 7 }, // Algeria
  "EG": { "year": 2026, "rating": "Positive", "rank": 23, "score": 7 }, // Egypt
  "AU": { "year": 2026, "rating": "Positive", "rank": 23, "score": 7 }, // Australia
  "TN": { "year": 2026, "rating": "Neutral", "rank": 28, "score": 4 }, // Tunisia
  "BE": { "year": 2026, "rating": "Neutral", "rank": 29, "score": 3 }, // Belgium
  "ET": { "year": 2026, "rating": "Neutral", "rank": 29, "score": 3 }, // Ethiopia
  "ZM": { "year": 2026, "rating": "Neutral", "rank": 29, "score": 3 }, // Zambia
  "IE": { "year": 2026, "rating": "Neutral", "rank": 32, "score": 2 }, // Ireland
  "JM": { "year": 2026, "rating": "Neutral", "rank": 32, "score": 2 }, // Jamaica
  "SG": { "year": 2026, "rating": "Neutral", "rank": 32, "score": 2 }, // Singapore
  "TH": { "year": 2026, "rating": "Neutral", "rank": 35, "score": 0 }, // Thailand
  "HU": { "year": 2026, "rating": "Neutral", "rank": 36, "score": -1 }, // Hungary
  "US": { "year": 2026, "rating": "Neutral", "rank": 36, "score": -1 }, // United States
  "KE": { "year": 2026, "rating": "Neutral", "rank": 36, "score": -1 }, // Kenya
  "IT": { "year": 2026, "rating": "Neutral", "rank": 36, "score": -1 }, // Italy
  "JO": { "year": 2026, "rating": "Neutral", "rank": 36, "score": -1 }, // Jordan
  "IL": { "year": 2026, "rating": "Neutral", "rank": 41, "score": -2 }, // Israel
  "SA": { "year": 2026, "rating": "Neutral", "rank": 41, "score": -2 }, // Saudi Arabia
  "SV": { "year": 2026, "rating": "Neutral", "rank": 43, "score": -3 }, // El Salvador
  "AR": { "year": 2026, "rating": "Neutral", "rank": 43, "score": -3 }, // Argentina
  "ES": { "year": 2026, "rating": "Neutral", "rank": 43, "score": -3 }, // Spain
  "GB": { "year": 2026, "rating": "Neutral", "rank": 43, "score": -3 }, // United Kingdom
  "PL": { "year": 2026, "rating": "Neutral", "rank": 47, "score": -4 }, // Poland
  "UZ": { "year": 2026, "rating": "Neutral", "rank": 47, "score": -4 }, // Uzbekistan
  "JP": { "year": 2026, "rating": "Neutral", "rank": 49, "score": -5 }, // Japan
  "SY": { "year": 2026, "rating": "Neutral", "rank": 49, "score": -5 }, // Syria
  "CD": { "year": 2026, "rating": "Neutral", "rank": 49, "score": -5 }, // Democratic Republic of the Congo
  "CO": { "year": 2026, "rating": "Negative", "rank": 52, "score": -6 }, // Colombia
  "GE": { "year": 2026, "rating": "Negative", "rank": 53, "score": -7 }, // Georgia
  "NI": { "year": 2026, "rating": "Negative", "rank": 54, "score": -8 }, // Nicaragua
  "ZA": { "year": 2026, "rating": "Negative", "rank": 54, "score": -8 }, // South Africa
  "MD": { "year": 2026, "rating": "Negative", "rank": 54, "score": -8 }, // Moldova
  "MA": { "year": 2026, "rating": "Negative", "rank": 54, "score": -8 }, // Morocco
  "BD": { "year": 2026, "rating": "Negative", "rank": 58, "score": -9 }, // Bangladesh
  "BY": { "year": 2026, "rating": "Negative", "rank": 58, "score": -9 }, // Belarus
  "CI": { "year": 2026, "rating": "Negative", "rank": 58, "score": -9 }, // Côte d'Ivoire
  "AO": { "year": 2026, "rating": "Negative", "rank": 58, "score": -9 }, // Angola
  "CL": { "year": 2026, "rating": "Negative", "rank": 62, "score": -10 }, // Chile
  "PT": { "year": 2026, "rating": "Negative", "rank": 62, "score": -10 }, // Portugal
  "BO": { "year": 2026, "rating": "Negative", "rank": 64, "score": -11 }, // Bolivia
  "HN": { "year": 2026, "rating": "Negative", "rank": 64, "score": -11 }, // Honduras
  "PK": { "year": 2026, "rating": "Negative", "rank": 66, "score": -12 }, // Pakistan
  "LT": { "year": 2026, "rating": "Negative", "rank": 67, "score": -13 }, // Lithuania
  "LY": { "year": 2026, "rating": "Negative", "rank": 67, "score": -13 }, // Libya
  "BR": { "year": 2026, "rating": "Negative", "rank": 67, "score": -13 }, // Brazil
  "MX": { "year": 2026, "rating": "Negative", "rank": 70, "score": -14 }, // Mexico
  "EC": { "year": 2026, "rating": "Negative", "rank": 70, "score": -14 }, // Ecuador
  "TR": { "year": 2026, "rating": "Negative", "rank": 70, "score": -14 }, // Türkiye
  "DO": { "year": 2026, "rating": "Negative", "rank": 70, "score": -14 }, // Dominican Republic
  "PE": { "year": 2026, "rating": "Negative", "rank": 70, "score": -14 }, // Peru
  "PA": { "year": 2026, "rating": "Very Negative", "rank": 75, "score": -15 }, // Panama
  "UG": { "year": 2026, "rating": "Very Negative", "rank": 76, "score": -16 }, // Uganda
  "KG": { "year": 2026, "rating": "Very Negative", "rank": 76, "score": -16 }, // Kyrgyzstan
  "TZ": { "year": 2026, "rating": "Very Negative", "rank": 78, "score": -17 }, // Tanzania
  "ZW": { "year": 2026, "rating": "Very Negative", "rank": 78, "score": -17 }, // Zimbabwe
  "IQ": { "year": 2026, "rating": "Very Negative", "rank": 78, "score": -17 }, // Iraq
  "GR": { "year": 2026, "rating": "Very Negative", "rank": 81, "score": -18 }, // Greece
  "RS": { "year": 2026, "rating": "Very Negative", "rank": 81, "score": -18 }, // Serbia
  "NG": { "year": 2026, "rating": "Very Negative", "rank": 83, "score": -20 }, // Nigeria
  "FR": { "year": 2026, "rating": "Very Negative", "rank": 83, "score": -20 }, // France
  "GT": { "year": 2026, "rating": "Very Negative", "rank": 85, "score": -21 }, // Guatemala
  "RU": { "year": 2026, "rating": "Very Negative", "rank": 85, "score": -21 }, // Russia
  "RO": { "year": 2026, "rating": "Very Negative", "rank": 85, "score": -21 }, // Romania
  "ID": { "year": 2026, "rating": "Very Negative", "rank": 85, "score": -21 }, // Indonesia
  "LB": { "year": 2026, "rating": "Very Negative", "rank": 85, "score": -21 }, // Lebanon
  "PS": { "year": 2026, "rating": "Very Negative", "rank": 90, "score": -22 }, // Palestine
  "VE": { "year": 2026, "rating": "Very Negative", "rank": 90, "score": -22 }, // Venezuela
  "CM": { "year": 2026, "rating": "Very Negative", "rank": 92, "score": -23 }, // Cameroon
  "UA": { "year": 2026, "rating": "Very Negative", "rank": 92, "score": -23 }, // Ukraine
  "PY": { "year": 2026, "rating": "Very Negative", "rank": 92, "score": -23 }, // Paraguay
  "YE": { "year": 2026, "rating": "Very Negative", "rank": 95, "score": -25 }, // Yemen
  "KZ": { "year": 2026, "rating": "Very Negative", "rank": 96, "score": -31 }, // Kazakhstan
};

/** Official DPI tier from Index Score (±5 / ±15). */
export function dpiTierFromScore(score) {
  if (score >= 15) return "Very Positive";
  if (score > 5) return "Positive";
  if (score >= -5) return "Neutral";
  if (score > -15) return "Negative";
  return "Very Negative";
}
