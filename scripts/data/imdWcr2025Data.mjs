// IMD World Competitiveness Ranking 2025 — overall competitiveness score.
// Source booklet: https://www.imd.org/wp-content/uploads/2025/06/Booklet-WCR-2025-v3.pdf
//   sha256 fd693b1cc736621de75c976d655246fcc20448e819a39fb9e04df54112c7fe2d
// Ranking tables reprint (same overall ranks/scores):
//   https://productivitysa.co.za/wp-content/uploads/2025/06/IMD-2025-Ranking-Tables.pdf
//   sha256 32a333a279311a3bb301061724dd1ec817fa845e41f71f1672d339834367bab7
// CSV extract: scripts/data/imd-wcr-2025.csv (69 economies; verbatim ranks/scores).
// score = IMD overall competitiveness index (0–100), generated for charts.
// rating = decade score band for map / Group-by (not an official IMD tier).
// rank = official IMD overall rank (1 = most competitive).
// rankChange = places gained (+) / lost (−) vs 2024; omitted for first-time
//   entrants Oman, Kenya, Namibia (IMD news, June 2025).
//
// Skipped (not UN members in this game): Hong Kong SAR, Taiwan (Chinese Taipei),
// Puerto Rico. Do not invent scores for economies absent from the IMD table.

/**
 * @type {Record<string, { year: number, rating: string, rank: number, rankChange?: number, score: number }>}
 */
export const IMD_WCR_2025_DATA = {
  "AE": { "year": 2025, "rating": "90–100", "rank": 5, "score": 96.09, "rankChange": 2 }, // UAE
  "AR": { "year": 2025, "rating": "40–49", "rank": 62, "score": 42.84, "rankChange": 4 }, // Argentina
  "AT": { "year": 2025, "rating": "70–79", "rank": 26, "score": 73.55, "rankChange": 0 }, // Austria
  "AU": { "year": 2025, "rating": "70–79", "rank": 18, "score": 78.36, "rankChange": -5 }, // Australia
  "BE": { "year": 2025, "rating": "70–79", "rank": 24, "score": 74.57, "rankChange": -6 }, // Belgium
  "BG": { "year": 2025, "rating": "40–49", "rank": 57, "score": 47.96, "rankChange": 1 }, // Bulgaria
  "BH": { "year": 2025, "rating": "70–79", "rank": 22, "score": 76.56, "rankChange": -1 }, // Bahrain
  "BR": { "year": 2025, "rating": "40–49", "rank": 58, "score": 46.41, "rankChange": 4 }, // Brazil
  "BW": { "year": 2025, "rating": "40–49", "rank": 59, "score": 46.12, "rankChange": -4 }, // Botswana
  "CA": { "year": 2025, "rating": "80–89", "rank": 11, "score": 88.73, "rankChange": 8 }, // Canada
  "CH": { "year": 2025, "rating": "90–100", "rank": 1, "score": 100, "rankChange": 1 }, // Switzerland
  "CL": { "year": 2025, "rating": "60–69", "rank": 42, "score": 62.52, "rankChange": 2 }, // Chile
  "CN": { "year": 2025, "rating": "80–89", "rank": 16, "score": 82.13, "rankChange": -2 }, // China
  "CO": { "year": 2025, "rating": "40–49", "rank": 54, "score": 49.66, "rankChange": 3 }, // Colombia
  "CY": { "year": 2025, "rating": "60–69", "rank": 44, "score": 61.8, "rankChange": -1 }, // Cyprus
  "CZ": { "year": 2025, "rating": "70–79", "rank": 25, "score": 73.66, "rankChange": 4 }, // Czech Republic
  "DE": { "year": 2025, "rating": "70–79", "rank": 19, "score": 78.24, "rankChange": 5 }, // Germany
  "DK": { "year": 2025, "rating": "90–100", "rank": 4, "score": 97.51, "rankChange": -1 }, // Denmark
  "EE": { "year": 2025, "rating": "60–69", "rank": 33, "score": 69.65, "rankChange": 0 }, // Estonia
  "ES": { "year": 2025, "rating": "60–69", "rank": 39, "score": 65.8, "rankChange": 1 }, // Spain
  "FI": { "year": 2025, "rating": "80–89", "rank": 14, "score": 83.83, "rankChange": 1 }, // Finland
  "FR": { "year": 2025, "rating": "60–69", "rank": 32, "score": 69.93, "rankChange": -1 }, // France
  "GB": { "year": 2025, "rating": "70–79", "rank": 29, "score": 71.95, "rankChange": -1 }, // United Kingdom
  "GH": { "year": 2025, "rating": "40–49", "rank": 61, "score": 44.25, "rankChange": 4 }, // Ghana
  "GR": { "year": 2025, "rating": "50–59", "rank": 50, "score": 55.33, "rankChange": -3 }, // Greece
  "HR": { "year": 2025, "rating": "50–59", "rank": 53, "score": 51.19, "rankChange": -2 }, // Croatia
  "HU": { "year": 2025, "rating": "50–59", "rank": 48, "score": 56.71, "rankChange": 6 }, // Hungary
  "ID": { "year": 2025, "rating": "60–69", "rank": 40, "score": 64.32, "rankChange": -13 }, // Indonesia
  "IE": { "year": 2025, "rating": "90–100", "rank": 7, "score": 91.31, "rankChange": -3 }, // Ireland
  "IN": { "year": 2025, "rating": "60–69", "rank": 41, "score": 64.19, "rankChange": -2 }, // India
  "IS": { "year": 2025, "rating": "80–89", "rank": 15, "score": 83.49, "rankChange": 2 }, // Iceland
  "IT": { "year": 2025, "rating": "60–69", "rank": 43, "score": 62.5, "rankChange": -1 }, // Italy
  "JO": { "year": 2025, "rating": "50–59", "rank": 47, "score": 57.79, "rankChange": 1 }, // Jordan
  "JP": { "year": 2025, "rating": "60–69", "rank": 35, "score": 68.74, "rankChange": 3 }, // Japan
  "KE": { "year": 2025, "rating": "40–49", "rank": 56, "score": 48.29 }, // Kenya
  "KR": { "year": 2025, "rating": "70–79", "rank": 27, "score": 73.39, "rankChange": -7 }, // Korea Rep.
  "KW": { "year": 2025, "rating": "60–69", "rank": 36, "score": 68.69, "rankChange": 1 }, // Kuwait
  "KZ": { "year": 2025, "rating": "60–69", "rank": 34, "score": 68.99, "rankChange": 1 }, // Kazakhstan
  "LT": { "year": 2025, "rating": "70–79", "rank": 21, "score": 77.68, "rankChange": 9 }, // Lithuania
  "LU": { "year": 2025, "rating": "70–79", "rank": 20, "score": 78.17, "rankChange": 3 }, // Luxembourg
  "LV": { "year": 2025, "rating": "60–69", "rank": 38, "score": 67.03, "rankChange": 7 }, // Latvia
  "MN": { "year": 2025, "rating": "40–49", "rank": 65, "score": 40.91, "rankChange": -4 }, // Mongolia
  "MX": { "year": 2025, "rating": "40–49", "rank": 55, "score": 48.84, "rankChange": 1 }, // Mexico
  "MY": { "year": 2025, "rating": "70–79", "rank": 23, "score": 74.81, "rankChange": 11 }, // Malaysia
  "NA": { "year": 2025, "rating": "30–39", "rank": 68, "score": 37.48 }, // Namibia
  "NG": { "year": 2025, "rating": "30–39", "rank": 67, "score": 39.73, "rankChange": -3 }, // Nigeria
  "NL": { "year": 2025, "rating": "80–89", "rank": 10, "score": 89.75, "rankChange": -1 }, // Netherlands
  "NO": { "year": 2025, "rating": "80–89", "rank": 12, "score": 86.17, "rankChange": -2 }, // Norway
  "NZ": { "year": 2025, "rating": "70–79", "rank": 31, "score": 70.23, "rankChange": 1 }, // New Zealand
  "OM": { "year": 2025, "rating": "70–79", "rank": 28, "score": 72.86 }, // Oman
  "PE": { "year": 2025, "rating": "40–49", "rank": 60, "score": 45.89, "rankChange": 3 }, // Peru
  "PH": { "year": 2025, "rating": "50–59", "rank": 51, "score": 54.88, "rankChange": 1 }, // Philippines
  "PL": { "year": 2025, "rating": "50–59", "rank": 52, "score": 53.91, "rankChange": -11 }, // Poland
  "PT": { "year": 2025, "rating": "60–69", "rank": 37, "score": 67.84, "rankChange": -1 }, // Portugal
  "QA": { "year": 2025, "rating": "80–89", "rank": 9, "score": 89.93, "rankChange": 2 }, // Qatar
  "RO": { "year": 2025, "rating": "50–59", "rank": 49, "score": 56.64, "rankChange": 1 }, // Romania
  "SA": { "year": 2025, "rating": "80–89", "rank": 17, "score": 82.09, "rankChange": -1 }, // Saudi Arabia
  "SE": { "year": 2025, "rating": "90–100", "rank": 8, "score": 90.2, "rankChange": -2 }, // Sweden
  "SG": { "year": 2025, "rating": "90–100", "rank": 2, "score": 99.44, "rankChange": -1 }, // Singapore
  "SI": { "year": 2025, "rating": "50–59", "rank": 46, "score": 59.14, "rankChange": 0 }, // Slovenia
  "SK": { "year": 2025, "rating": "40–49", "rank": 63, "score": 42.79, "rankChange": -4 }, // Slovak Republic
  "TH": { "year": 2025, "rating": "70–79", "rank": 30, "score": 71.32, "rankChange": -5 }, // Thailand
  "TR": { "year": 2025, "rating": "40–49", "rank": 66, "score": 40.41, "rankChange": -13 }, // Türkiye
  "US": { "year": 2025, "rating": "80–89", "rank": 13, "score": 84.27, "rankChange": -1 }, // USA
  "VE": { "year": 2025, "rating": "20–29", "rank": 69, "score": 25.47, "rankChange": -2 }, // Venezuela
  "ZA": { "year": 2025, "rating": "40–49", "rank": 64, "score": 41.98, "rankChange": -4 }, // South Africa
};
