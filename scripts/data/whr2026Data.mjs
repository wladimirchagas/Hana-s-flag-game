// World Happiness Report 2026 — life-evaluation (Cantril ladder) ranking.
// Source workbook: scripts/data/whr2026-figure-2.1.xlsx
//   https://files.worldhappiness.report/WHR26_Data_Figure_2.1.xlsx
//   (sha256 576e382655cec3ae704a0b41cd2c04465b87cd84b7f131a0c4fa26d41f6d8028)
// CSV extract: scripts/data/whr-happiness-2026.csv (Year=2025 ranking rows)
// Report: Helliwell, J. F., Layard, R., Sachs, J. D., De Neve, J.-E., Aknin, L. B.,
//   & Wang, S. (Eds.). (2026). World Happiness Report 2026. University of Oxford.
// Ranking uses the workbook's Year=2025 rows (Gallup World Poll 2023–2025 average).
// score = Life evaluation (3-year average), 0–10 Cantril ladder.
// rating = 1-point score band for map / Group-by (not an official WHR tier).
// rank = official WHR rank (ties share a rank in the source when scores match).
// rankChange = Rank_2024 − Rank_2025 (positive = rose in the ranking).
//
// Skipped (not UN members in this game): Kosovo, Taiwan Province of China,
// Hong Kong SAR of China. Do not invent scores for countries absent from WHR.

/**
 * @type {Record<string, { year: number, rating: string, rank: number, rankChange: number, score: number }>}
 */
export const WHR_2026_DATA = {
  "AE": { "year": 2026, "rating": "6.0–6.9", "rank": 21, "rankChange": 0, "score": 6.821 }, // United Arab Emirates
  "AF": { "year": 2026, "rating": "1.0–1.9", "rank": 147, "rankChange": 0, "score": 1.446 }, // Afghanistan
  "AL": { "year": 2026, "rating": "5.0–5.9", "rank": 86, "rankChange": 3, "score": 5.662 }, // Albania
  "AM": { "year": 2026, "rating": "5.0–5.9", "rank": 89, "rankChange": -2, "score": 5.584 }, // Armenia
  "AR": { "year": 2026, "rating": "6.0–6.9", "rank": 44, "rankChange": -2, "score": 6.43 }, // Argentina
  "AT": { "year": 2026, "rating": "6.0–6.9", "rank": 19, "rankChange": -2, "score": 6.845 }, // Austria
  "AU": { "year": 2026, "rating": "6.0–6.9", "rank": 15, "rankChange": -4, "score": 6.916 }, // Australia
  "AZ": { "year": 2026, "rating": "4.0–4.9", "rank": 102, "rankChange": 4, "score": 4.993 }, // Azerbaijan
  "BA": { "year": 2026, "rating": "6.0–6.9", "rank": 47, "rankChange": 9, "score": 6.381 }, // Bosnia and Herzegovina
  "BD": { "year": 2026, "rating": "4.0–4.9", "rank": 127, "rankChange": 7, "score": 4.319 }, // Bangladesh
  "BE": { "year": 2026, "rating": "6.0–6.9", "rank": 14, "rankChange": 0, "score": 6.926 }, // Belgium
  "BF": { "year": 2026, "rating": "4.0–4.9", "rank": 123, "rankChange": -3, "score": 4.455 }, // Burkina Faso
  "BG": { "year": 2026, "rating": "5.0–5.9", "rank": 84, "rankChange": 1, "score": 5.703 }, // Bulgaria
  "BH": { "year": 2026, "rating": "6.0–6.9", "rank": 55, "rankChange": 4, "score": 6.254 }, // Bahrain
  "BJ": { "year": 2026, "rating": "4.0–4.9", "rank": 124, "rankChange": -3, "score": 4.393 }, // Benin
  "BO": { "year": 2026, "rating": "5.0–5.9", "rank": 78, "rankChange": -4, "score": 5.835 }, // Bolivia
  "BR": { "year": 2026, "rating": "6.0–6.9", "rank": 32, "rankChange": 4, "score": 6.634 }, // Brazil
  "BW": { "year": 2026, "rating": "3.0–3.9", "rank": 143, "rankChange": -1, "score": 3.464 }, // Botswana
  "BZ": { "year": 2026, "rating": "6.0–6.9", "rank": 27, "rankChange": -2, "score": 6.711 }, // Belize
  "CA": { "year": 2026, "rating": "6.0–6.9", "rank": 25, "rankChange": -7, "score": 6.741 }, // Canada
  "CD": { "year": 2026, "rating": "3.0–3.9", "rank": 140, "rankChange": 1, "score": 3.761 }, // DR Congo
  "CG": { "year": 2026, "rating": "4.0–4.9", "rank": 122, "rankChange": -22, "score": 4.456 }, // Congo
  "CH": { "year": 2026, "rating": "7.0–7.9", "rank": 10, "rankChange": 3, "score": 7.018 }, // Switzerland
  "CI": { "year": 2026, "rating": "5.0–5.9", "rank": 98, "rankChange": 0, "score": 5.148 }, // Côte d’Ivoire
  "CL": { "year": 2026, "rating": "6.0–6.9", "rank": 50, "rankChange": -5, "score": 6.302 }, // Chile
  "CM": { "year": 2026, "rating": "5.0–5.9", "rank": 100, "rankChange": 4, "score": 5.083 }, // Cameroon
  "CN": { "year": 2026, "rating": "6.0–6.9", "rank": 65, "rankChange": 3, "score": 6.074 }, // China
  "CO": { "year": 2026, "rating": "6.0–6.9", "rank": 68, "rankChange": -7, "score": 6.04 }, // Colombia
  "CR": { "year": 2026, "rating": "7.0–7.9", "rank": 4, "rankChange": 2, "score": 7.439 }, // Costa Rica
  "CY": { "year": 2026, "rating": "6.0–6.9", "rank": 62, "rankChange": 5, "score": 6.126 }, // Cyprus
  "CZ": { "year": 2026, "rating": "6.0–6.9", "rank": 20, "rankChange": 0, "score": 6.821 }, // Czechia
  "DE": { "year": 2026, "rating": "6.0–6.9", "rank": 17, "rankChange": 5, "score": 6.882 }, // Germany
  "DK": { "year": 2026, "rating": "7.0–7.9", "rank": 3, "rankChange": -1, "score": 7.539 }, // Denmark
  "DO": { "year": 2026, "rating": "6.0–6.9", "rank": 64, "rankChange": 12, "score": 6.093 }, // Dominican Republic
  "DZ": { "year": 2026, "rating": "5.0–5.9", "rank": 83, "rankChange": 1, "score": 5.714 }, // Algeria
  "EC": { "year": 2026, "rating": "6.0–6.9", "rank": 59, "rankChange": 3, "score": 6.144 }, // Ecuador
  "EE": { "year": 2026, "rating": "6.0–6.9", "rank": 46, "rankChange": -7, "score": 6.41 }, // Estonia
  "EG": { "year": 2026, "rating": "3.0–3.9", "rank": 139, "rankChange": -4, "score": 3.862 }, // Egypt
  "ES": { "year": 2026, "rating": "6.0–6.9", "rank": 41, "rankChange": -3, "score": 6.54 }, // Spain
  "ET": { "year": 2026, "rating": "3.0–3.9", "rank": 135, "rankChange": -3, "score": 3.985 }, // Ethiopia
  "FI": { "year": 2026, "rating": "7.0–7.9", "rank": 1, "rankChange": 0, "score": 7.764 }, // Finland
  "FR": { "year": 2026, "rating": "6.0–6.9", "rank": 35, "rankChange": -2, "score": 6.586 }, // France
  "GA": { "year": 2026, "rating": "5.0–5.9", "rank": 96, "rankChange": 1, "score": 5.167 }, // Gabon
  "GB": { "year": 2026, "rating": "6.0–6.9", "rank": 29, "rankChange": -6, "score": 6.694 }, // United Kingdom
  "GE": { "year": 2026, "rating": "5.0–5.9", "rank": 91, "rankChange": 0, "score": 5.517 }, // Georgia
  "GH": { "year": 2026, "rating": "4.0–4.9", "rank": 115, "rankChange": 10, "score": 4.554 }, // Ghana
  "GM": { "year": 2026, "rating": "4.0–4.9", "rank": 128, "rankChange": -11, "score": 4.306 }, // Gambia
  "GN": { "year": 2026, "rating": "4.0–4.9", "rank": 113, "rankChange": -11, "score": 4.609 }, // Guinea
  "GR": { "year": 2026, "rating": "5.0–5.9", "rank": 85, "rankChange": -4, "score": 5.697 }, // Greece
  "GT": { "year": 2026, "rating": "6.0–6.9", "rank": 42, "rankChange": 2, "score": 6.533 }, // Guatemala
  "HN": { "year": 2026, "rating": "6.0–6.9", "rank": 63, "rankChange": 0, "score": 6.096 }, // Honduras
  "HR": { "year": 2026, "rating": "6.0–6.9", "rank": 70, "rankChange": 2, "score": 6.009 }, // Croatia
  "HU": { "year": 2026, "rating": "5.0–5.9", "rank": 74, "rankChange": -5, "score": 5.937 }, // Hungary
  "ID": { "year": 2026, "rating": "5.0–5.9", "rank": 87, "rankChange": -4, "score": 5.617 }, // Indonesia
  "IE": { "year": 2026, "rating": "6.0–6.9", "rank": 13, "rankChange": 2, "score": 6.928 }, // Ireland
  "IL": { "year": 2026, "rating": "7.0–7.9", "rank": 8, "rankChange": 0, "score": 7.187 }, // Israel
  "IN": { "year": 2026, "rating": "4.0–4.9", "rank": 116, "rankChange": 2, "score": 4.536 }, // India
  "IQ": { "year": 2026, "rating": "5.0–5.9", "rank": 95, "rankChange": 6, "score": 5.212 }, // Iraq
  "IR": { "year": 2026, "rating": "5.0–5.9", "rank": 97, "rankChange": 2, "score": 5.151 }, // Iran
  "IS": { "year": 2026, "rating": "7.0–7.9", "rank": 2, "rankChange": 1, "score": 7.54 }, // Iceland
  "IT": { "year": 2026, "rating": "6.0–6.9", "rank": 38, "rankChange": 2, "score": 6.574 }, // Italy
  "JM": { "year": 2026, "rating": "6.0–6.9", "rank": 49, "rankChange": 24, "score": 6.305 }, // Jamaica
  "JO": { "year": 2026, "rating": "4.0–4.9", "rank": 119, "rankChange": 9, "score": 4.478 }, // Jordan
  "JP": { "year": 2026, "rating": "6.0–6.9", "rank": 61, "rankChange": -6, "score": 6.13 }, // Japan
  "KE": { "year": 2026, "rating": "4.0–4.9", "rank": 110, "rankChange": 5, "score": 4.674 }, // Kenya
  "KG": { "year": 2026, "rating": "6.0–6.9", "rank": 66, "rankChange": 9, "score": 6.049 }, // Kyrgyzstan
  "KH": { "year": 2026, "rating": "4.0–4.9", "rank": 121, "rankChange": 3, "score": 4.462 }, // Cambodia
  "KM": { "year": 2026, "rating": "3.0–3.9", "rank": 136, "rankChange": 3, "score": 3.925 }, // Comoros
  "KR": { "year": 2026, "rating": "6.0–6.9", "rank": 67, "rankChange": -9, "score": 6.04 }, // Republic of Korea
  "KW": { "year": 2026, "rating": "6.0–6.9", "rank": 40, "rankChange": -10, "score": 6.543 }, // Kuwait
  "KZ": { "year": 2026, "rating": "6.0–6.9", "rank": 33, "rankChange": 10, "score": 6.633 }, // Kazakhstan
  "LA": { "year": 2026, "rating": "5.0–5.9", "rank": 92, "rankChange": 1, "score": 5.515 }, // Lao PDR
  "LB": { "year": 2026, "rating": "3.0–3.9", "rank": 141, "rankChange": 4, "score": 3.723 }, // Lebanon
  "LK": { "year": 2026, "rating": "4.0–4.9", "rank": 134, "rankChange": -1, "score": 4.013 }, // Sri Lanka
  "LR": { "year": 2026, "rating": "4.0–4.9", "rank": 130, "rankChange": -1, "score": 4.28 }, // Liberia
  "LS": { "year": 2026, "rating": "4.0–4.9", "rank": 126, "rankChange": 12, "score": 4.375 }, // Lesotho
  "LT": { "year": 2026, "rating": "6.0–6.9", "rank": 28, "rankChange": -12, "score": 6.704 }, // Lithuania
  "LU": { "year": 2026, "rating": "7.0–7.9", "rank": 9, "rankChange": 0, "score": 7.063 }, // Luxembourg
  "LV": { "year": 2026, "rating": "6.0–6.9", "rank": 48, "rankChange": 3, "score": 6.365 }, // Latvia
  "LY": { "year": 2026, "rating": "5.0–5.9", "rank": 81, "rankChange": -2, "score": 5.731 }, // Libya
  "MA": { "year": 2026, "rating": "4.0–4.9", "rank": 112, "rankChange": 0, "score": 4.646 }, // Morocco
  "MD": { "year": 2026, "rating": "5.0–5.9", "rank": 77, "rankChange": 3, "score": 5.851 }, // Republic of Moldova
  "ME": { "year": 2026, "rating": "6.0–6.9", "rank": 60, "rankChange": 11, "score": 6.139 }, // Montenegro
  "MG": { "year": 2026, "rating": "4.0–4.9", "rank": 132, "rankChange": -2, "score": 4.174 }, // Madagascar
  "MK": { "year": 2026, "rating": "5.0–5.9", "rank": 82, "rankChange": 4, "score": 5.719 }, // North Macedonia
  "ML": { "year": 2026, "rating": "4.0–4.9", "rank": 114, "rankChange": 9, "score": 4.588 }, // Mali
  "MM": { "year": 2026, "rating": "4.0–4.9", "rank": 129, "rankChange": -3, "score": 4.287 }, // Myanmar
  "MN": { "year": 2026, "rating": "5.0–5.9", "rank": 75, "rankChange": 2, "score": 5.936 }, // Mongolia
  "MR": { "year": 2026, "rating": "4.0–4.9", "rank": 120, "rankChange": -6, "score": 4.473 }, // Mauritania
  "MT": { "year": 2026, "rating": "6.0–6.9", "rank": 43, "rankChange": 5, "score": 6.436 }, // Malta
  "MU": { "year": 2026, "rating": "5.0–5.9", "rank": 73, "rankChange": 5, "score": 5.939 }, // Mauritius
  "MW": { "year": 2026, "rating": "3.0–3.9", "rank": 145, "rankChange": -1, "score": 3.284 }, // Malawi
  "MX": { "year": 2026, "rating": "6.0–6.9", "rank": 12, "rankChange": -2, "score": 6.972 }, // Mexico
  "MY": { "year": 2026, "rating": "6.0–6.9", "rank": 71, "rankChange": -7, "score": 6.005 }, // Malaysia
  "MZ": { "year": 2026, "rating": "5.0–5.9", "rank": 93, "rankChange": 3, "score": 5.336 }, // Mozambique
  "NA": { "year": 2026, "rating": "4.0–4.9", "rank": 108, "rankChange": -5, "score": 4.781 }, // Namibia
  "NE": { "year": 2026, "rating": "4.0–4.9", "rank": 103, "rankChange": 7, "score": 4.94 }, // Niger
  "NG": { "year": 2026, "rating": "4.0–4.9", "rank": 106, "rankChange": -1, "score": 4.788 }, // Nigeria
  "NI": { "year": 2026, "rating": "6.0–6.9", "rank": 51, "rankChange": -4, "score": 6.301 }, // Nicaragua
  "NL": { "year": 2026, "rating": "7.0–7.9", "rank": 7, "rankChange": -2, "score": 7.223 }, // Netherlands
  "NO": { "year": 2026, "rating": "7.0–7.9", "rank": 6, "rankChange": 1, "score": 7.242 }, // Norway
  "NP": { "year": 2026, "rating": "5.0–5.9", "rank": 99, "rankChange": -7, "score": 5.147 }, // Nepal
  "NZ": { "year": 2026, "rating": "6.0–6.9", "rank": 11, "rankChange": 1, "score": 6.995 }, // New Zealand
  "OM": { "year": 2026, "rating": "6.0–6.9", "rank": 58, "rankChange": -6, "score": 6.197 }, // Oman
  "PA": { "year": 2026, "rating": "6.0–6.9", "rank": 39, "rankChange": 2, "score": 6.547 }, // Panama
  "PE": { "year": 2026, "rating": "5.0–5.9", "rank": 72, "rankChange": -7, "score": 5.974 }, // Peru
  "PH": { "year": 2026, "rating": "6.0–6.9", "rank": 56, "rankChange": 1, "score": 6.206 }, // Philippines
  "PK": { "year": 2026, "rating": "4.0–4.9", "rank": 104, "rankChange": 5, "score": 4.868 }, // Pakistan
  "PL": { "year": 2026, "rating": "6.0–6.9", "rank": 24, "rankChange": 2, "score": 6.768 }, // Poland
  "PS": { "year": 2026, "rating": "4.0–4.9", "rank": 109, "rankChange": -1, "score": 4.694 }, // State of Palestine
  "PT": { "year": 2026, "rating": "6.0–6.9", "rank": 69, "rankChange": -9, "score": 6.029 }, // Portugal
  "PY": { "year": 2026, "rating": "6.0–6.9", "rank": 57, "rankChange": -3, "score": 6.198 }, // Paraguay
  "RO": { "year": 2026, "rating": "6.0–6.9", "rank": 34, "rankChange": 1, "score": 6.629 }, // Romania
  "RS": { "year": 2026, "rating": "6.0–6.9", "rank": 30, "rankChange": 1, "score": 6.691 }, // Serbia
  "RU": { "year": 2026, "rating": "5.0–5.9", "rank": 79, "rankChange": -13, "score": 5.834 }, // Russian Federation
  "SA": { "year": 2026, "rating": "6.0–6.9", "rank": 22, "rankChange": 10, "score": 6.817 }, // Saudi Arabia
  "SE": { "year": 2026, "rating": "7.0–7.9", "rank": 5, "rankChange": -1, "score": 7.255 }, // Sweden
  "SG": { "year": 2026, "rating": "6.0–6.9", "rank": 36, "rankChange": -2, "score": 6.585 }, // Singapore
  "SI": { "year": 2026, "rating": "6.0–6.9", "rank": 18, "rankChange": 1, "score": 6.868 }, // Slovenia
  "SK": { "year": 2026, "rating": "6.0–6.9", "rank": 54, "rankChange": -4, "score": 6.255 }, // Slovakia
  "SL": { "year": 2026, "rating": "3.0–3.9", "rank": 146, "rankChange": 0, "score": 3.251 }, // Sierra Leone
  "SN": { "year": 2026, "rating": "4.0–4.9", "rank": 107, "rankChange": 0, "score": 4.787 }, // Senegal
  "SO": { "year": 2026, "rating": "4.0–4.9", "rank": 117, "rankChange": 5, "score": 4.508 }, // Somalia
  "SV": { "year": 2026, "rating": "6.0–6.9", "rank": 37, "rankChange": 0, "score": 6.578 }, // El Salvador
  "SZ": { "year": 2026, "rating": "3.0–3.9", "rank": 137, "rankChange": 0, "score": 3.909 }, // Eswatini
  "TD": { "year": 2026, "rating": "4.0–4.9", "rank": 125, "rankChange": -6, "score": 4.385 }, // Chad
  "TG": { "year": 2026, "rating": "4.0–4.9", "rank": 131, "rankChange": -4, "score": 4.277 }, // Togo
  "TH": { "year": 2026, "rating": "6.0–6.9", "rank": 52, "rankChange": -3, "score": 6.296 }, // Thailand
  "TJ": { "year": 2026, "rating": "5.0–5.9", "rank": 88, "rankChange": 2, "score": 5.591 }, // Tajikistan
  "TN": { "year": 2026, "rating": "4.0–4.9", "rank": 105, "rankChange": 8, "score": 4.798 }, // Tunisia
  "TR": { "year": 2026, "rating": "5.0–5.9", "rank": 94, "rankChange": 0, "score": 5.3 }, // Türkiye
  "TT": { "year": 2026, "rating": "5.0–5.9", "rank": 76, "rankChange": -6, "score": 5.905 }, // Trinidad and Tobago
  "TZ": { "year": 2026, "rating": "3.0–3.9", "rank": 138, "rankChange": -2, "score": 3.902 }, // Tanzania
  "UA": { "year": 2026, "rating": "4.0–4.9", "rank": 111, "rankChange": 0, "score": 4.658 }, // Ukraine
  "UG": { "year": 2026, "rating": "4.0–4.9", "rank": 118, "rankChange": -2, "score": 4.491 }, // Uganda
  "US": { "year": 2026, "rating": "6.0–6.9", "rank": 23, "rankChange": 1, "score": 6.816 }, // United States
  "UY": { "year": 2026, "rating": "6.0–6.9", "rank": 31, "rankChange": -3, "score": 6.635 }, // Uruguay
  "UZ": { "year": 2026, "rating": "6.0–6.9", "rank": 53, "rankChange": 0, "score": 6.283 }, // Uzbekistan
  "VE": { "year": 2026, "rating": "5.0–5.9", "rank": 80, "rankChange": 2, "score": 5.756 }, // Venezuela
  "VN": { "year": 2026, "rating": "6.0–6.9", "rank": 45, "rankChange": 1, "score": 6.428 }, // Viet Nam
  "YE": { "year": 2026, "rating": "3.0–3.9", "rank": 142, "rankChange": -2, "score": 3.532 }, // Yemen
  "ZA": { "year": 2026, "rating": "5.0–5.9", "rank": 101, "rankChange": -6, "score": 5.009 }, // South Africa
  "ZM": { "year": 2026, "rating": "4.0–4.9", "rank": 133, "rankChange": -2, "score": 4.106 }, // Zambia
  "ZW": { "year": 2026, "rating": "3.0–3.9", "rank": 144, "rankChange": -1, "score": 3.346 }, // Zimbabwe
};
