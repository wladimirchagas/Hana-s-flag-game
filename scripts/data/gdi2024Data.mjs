// Lowy Institute Global Diplomacy Index 2024.
// Source: https://globaldiplomacyindex.lowyinstitute.org/data/2023/get_country_data.json
// Key findings: https://globaldiplomacyindex.lowyinstitute.org/downloads/GDI_Key_Findings.pdf
// Index covers 66 countries/territories in Asia, the G20 and the OECD;
// data collected July–November 2023. Score = total diplomatic posts abroad.
// rating = map/group post-count band (250+ … Below 50) for colouring only —
// Lowy does not publish categorical tiers; do not treat bands as Lowy labels.
// European Union and Taiwan are in the Index but omitted here (not UN members
// in COUNTRY_FACTS). RankChange omitted — API trend is direction-only;
// do not invent year-on-year magnitude.
//
// Do not invent posts or ranks. Refresh from the Lowy JSON only.

/**
 * @type {Record<string, { year: number, rating: string, rank: number, score: number }>}
 */
export const GDI_2024_DATA = {
  "AR": {"year": 2024, "rating": "150–199", "rank": 16, "score": 150},
  "AT": {"year": 2024, "rating": "100–149", "rank": 36, "score": 104},
  "AU": {"year": 2024, "rating": "100–149", "rank": 26, "score": 124},
  "BD": {"year": 2024, "rating": "50–99", "rank": 46, "score": 80},
  "BE": {"year": 2024, "rating": "100–149", "rank": 32, "score": 113},
  "BN": {"year": 2024, "rating": "Below 50", "rank": 60, "score": 42},
  "BR": {"year": 2024, "rating": "200–249", "rank": 10, "score": 205},
  "BT": {"year": 2024, "rating": "Below 50", "rank": 66, "score": 10},
  "CA": {"year": 2024, "rating": "150–199", "rank": 15, "score": 157},
  "CH": {"year": 2024, "rating": "100–149", "rank": 19, "score": 141},
  "CL": {"year": 2024, "rating": "100–149", "rank": 27, "score": 121},
  "CN": {"year": 2024, "rating": "250+", "rank": 1, "score": 274},
  "CO": {"year": 2024, "rating": "100–149", "rank": 30, "score": 117},
  "CR": {"year": 2024, "rating": "50–99", "rank": 51, "score": 52},
  "CZ": {"year": 2024, "rating": "100–149", "rank": 29, "score": 120},
  "DE": {"year": 2024, "rating": "200–249", "rank": 8, "score": 217},
  "DK": {"year": 2024, "rating": "50–99", "rank": 43, "score": 90},
  "EE": {"year": 2024, "rating": "Below 50", "rank": 54, "score": 46},
  "ES": {"year": 2024, "rating": "150–199", "rank": 12, "score": 190},
  "FI": {"year": 2024, "rating": "50–99", "rank": 43, "score": 90},
  "FR": {"year": 2024, "rating": "200–249", "rank": 5, "score": 249},
  "GB": {"year": 2024, "rating": "200–249", "rank": 7, "score": 225},
  "GR": {"year": 2024, "rating": "100–149", "rank": 22, "score": 134},
  "HU": {"year": 2024, "rating": "100–149", "rank": 20, "score": 140},
  "ID": {"year": 2024, "rating": "100–149", "rank": 23, "score": 130},
  "IE": {"year": 2024, "rating": "50–99", "rank": 38, "score": 98},
  "IL": {"year": 2024, "rating": "100–149", "rank": 34, "score": 107},
  "IN": {"year": 2024, "rating": "150–199", "rank": 11, "score": 194},
  "IS": {"year": 2024, "rating": "Below 50", "rank": 64, "score": 26},
  "IT": {"year": 2024, "rating": "200–249", "rank": 9, "score": 206},
  "JP": {"year": 2024, "rating": "250+", "rank": 4, "score": 251},
  "KH": {"year": 2024, "rating": "Below 50", "rank": 58, "score": 43},
  "KP": {"year": 2024, "rating": "Below 50", "rank": 58, "score": 43},
  "KR": {"year": 2024, "rating": "150–199", "rank": 13, "score": 187},
  "LA": {"year": 2024, "rating": "Below 50", "rank": 61, "score": 40},
  "LK": {"year": 2024, "rating": "50–99", "rank": 49, "score": 60},
  "LT": {"year": 2024, "rating": "50–99", "rank": 48, "score": 62},
  "LU": {"year": 2024, "rating": "Below 50", "rank": 54, "score": 46},
  "LV": {"year": 2024, "rating": "Below 50", "rank": 54, "score": 46},
  "MM": {"year": 2024, "rating": "Below 50", "rank": 54, "score": 46},
  "MN": {"year": 2024, "rating": "50–99", "rank": 52, "score": 50},
  "MX": {"year": 2024, "rating": "150–199", "rank": 14, "score": 161},
  "MY": {"year": 2024, "rating": "100–149", "rank": 35, "score": 106},
  "NL": {"year": 2024, "rating": "100–149", "rank": 17, "score": 149},
  "NO": {"year": 2024, "rating": "50–99", "rank": 42, "score": 91},
  "NP": {"year": 2024, "rating": "Below 50", "rank": 61, "score": 40},
  "NZ": {"year": 2024, "rating": "50–99", "rank": 47, "score": 68},
  "PG": {"year": 2024, "rating": "Below 50", "rank": 65, "score": 21},
  "PH": {"year": 2024, "rating": "50–99", "rank": 40, "score": 94},
  "PK": {"year": 2024, "rating": "100–149", "rank": 27, "score": 121},
  "PL": {"year": 2024, "rating": "100–149", "rank": 21, "score": 135},
  "PT": {"year": 2024, "rating": "100–149", "rank": 25, "score": 127},
  "RU": {"year": 2024, "rating": "200–249", "rank": 6, "score": 230},
  "SA": {"year": 2024, "rating": "100–149", "rank": 24, "score": 128},
  "SE": {"year": 2024, "rating": "100–149", "rank": 37, "score": 102},
  "SG": {"year": 2024, "rating": "50–99", "rank": 52, "score": 50},
  "SI": {"year": 2024, "rating": "50–99", "rank": 50, "score": 58},
  "SK": {"year": 2024, "rating": "50–99", "rank": 45, "score": 82},
  "TH": {"year": 2024, "rating": "50–99", "rank": 39, "score": 97},
  "TL": {"year": 2024, "rating": "Below 50", "rank": 63, "score": 31},
  "TR": {"year": 2024, "rating": "250+", "rank": 3, "score": 252},
  "US": {"year": 2024, "rating": "250+", "rank": 2, "score": 271},
  "VN": {"year": 2024, "rating": "50–99", "rank": 40, "score": 94},
  "ZA": {"year": 2024, "rating": "100–149", "rank": 31, "score": 114},
};

