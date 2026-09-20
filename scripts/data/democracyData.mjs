// Authoritative democracy / governance / press-freedom rankings and ratings for
// Freedom House, V-Dem, EIU Economist, Transparency International’s Corruption
// Perceptions Index, the Nira Data / Alliance of Democracies Democracy Perception
// Index, and RSF World Press Freedom Index.
// Covers UN member states and permanent observers. Sourced from official publications:
// - Freedom House: Freedom in the World 2024
// - V-Dem Institute: Democracy Report 2026 / Dataset v16
// - Economist Intelligence Unit (EIU): Democracy Index 2025
// - Transparency International: Corruption Perceptions Index 2025 (CPI2025_Results.xlsx)
// - Nira Data / Alliance of Democracies: Democracy Perception Index 2026 (DPI 2026 PDF Country Appendix)
// - Reporters Without Borders (RSF): World Press Freedom Index 2026
//   Official CSV: scripts/data/rsf-press-freedom-2026.csv
//   (https://rsf.org/sites/default/files/import_classement/2026.csv)
//   Categories from RSF methodology: Good [85–100], Satisfactory [70–85),
//   Problematic [55–70), Difficult [40–55), Very serious [0–40).

/**
 * @type {Record<string, {
 *   freedomHouse?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   vDem?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   economist?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   cpi?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   perception?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   rsfPress?: { year: number, rating: string, rank: number, rankChange?: number, score?: number }
 * }>}
 */
export const DEMOCRACY_DATA = {
  "AD": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 24, "rankChange": 0, "score": 93 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 60, "rankChange": 5, "score": 63.91 }
  },
  "AE": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 159, "rankChange": 0, "score": 18 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 155, "rankChange": -2, "score": 0.08 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 117, "rankChange": 0, "score": 3.18 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 21, "rankChange": 2, "score": 69 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 158, "rankChange": 6, "score": 30.86 }
  },
  "AF": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 184, "rankChange": 0, "score": 6 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 176, "rankChange": 2, "score": 0.02 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 167, "rankChange": -2, "score": 0.25 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 169, "rankChange": -4, "score": 16 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 175, "rankChange": 0, "score": 19.51 }
  },
  "AG": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 57, "rankChange": 0, "score": 83 }
  },
  "AL": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 85, "rankChange": 0, "score": 68 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 81, "rankChange": -2, "score": 0.38 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 67, "rankChange": -2, "score": 6.2 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 91, "rankChange": -11, "score": 39 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 83, "rankChange": -3, "score": 56.52 }
  },
  "AM": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 110, "rankChange": 0, "score": 54 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 86, "rankChange": -10, "score": 0.37 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 84, "rankChange": -3, "score": 5.35 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 65, "rankChange": -2, "score": 46 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 50, "rankChange": -16, "score": 67.02 }
  },
  "AO": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 144, "rankChange": 0, "score": 28 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 120, "rankChange": 1, "score": 0.16 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 107, "rankChange": -2, "score": 3.94 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 120, "rankChange": 1, "score": 32 },
    "perception": { "year": 2026, "rating": "Negative", "rank": 58, "score": -9 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 109, "rankChange": -9, "score": 48.82 }
  },
  "AR": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 51, "rankChange": 0, "score": 85 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 56, "rankChange": -5, "score": 0.52 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 49, "rankChange": 4, "score": 6.89 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 104, "rankChange": -5, "score": 36 },
    "perception": { "year": 2026, "rating": "Neutral", "rank": 43, "score": -3 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 98, "rankChange": -11, "score": 52.44 }
  },
  "AT": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 24, "rankChange": 0, "score": 93 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 19, "rankChange": 0, "score": 0.76 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 17, "rankChange": 1, "score": 8.42 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 21, "rankChange": 4, "score": 69 },
    "perception": { "year": 2026, "rating": "Positive", "rank": 17, "score": 9 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 19, "rankChange": 3, "score": 79.43 }
  },
  "AU": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 18, "rankChange": 0, "score": 95 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 12, "rankChange": 0, "score": 0.79 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 13, "rankChange": -2, "score": 8.85 },
    "cpi": { "year": 2025, "rating": "70–79", "rank": 12, "rankChange": -2, "score": 76 },
    "perception": { "year": 2026, "rating": "Positive", "rank": 23, "score": 7 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 33, "rankChange": -4, "score": 74.58 }
  },
  "AZ": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 181, "rankChange": 0, "score": 7 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 164, "rankChange": 0, "score": 0.05 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 127, "rankChange": -3, "score": 2.8 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 130, "rankChange": 24, "score": 30 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 171, "rankChange": -4, "score": 23.95 }
  },
  "BA": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 113, "rankChange": 0, "score": 52 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 91, "rankChange": 0, "score": 0.34 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 85, "rankChange": 1, "score": 5.23 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 109, "rankChange": 5, "score": 34 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 90, "rankChange": -4, "score": 54.29 }
  },
  "BB": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 23, "rankChange": 0, "score": 94 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 32, "rankChange": 1, "score": 0.68 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 24, "rankChange": -1, "score": 68 }
  },
  "BD": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 122, "rankChange": 0, "score": 45 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 133, "rankChange": 14, "score": 0.12 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 101, "rankChange": -3, "score": 4.27 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 150, "rankChange": 1, "score": 24 },
    "perception": { "year": 2026, "rating": "Negative", "rank": 58, "score": -9 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 152, "rankChange": -3, "score": 33.05 }
  },
  "BE": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 11, "rankChange": 0, "score": 96 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 11, "rankChange": -2, "score": 0.79 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 31, "rankChange": 2, "score": 7.77 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 21, "rankChange": 1, "score": 69 },
    "perception": { "year": 2026, "rating": "Neutral", "rank": 29, "score": 3 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 16, "rankChange": 2, "score": 81.17 }
  },
  "BF": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 148, "rankChange": 0, "score": 25 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 141, "rankChange": -10, "score": 0.1 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 137, "rankChange": -2, "score": 2.55 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 84, "rankChange": -2, "score": 40 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 110, "rankChange": -5, "score": 48.52 }
  },
  "BG": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 72, "rankChange": 0, "score": 77 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 67, "rankChange": -12, "score": 0.5 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 61, "rankChange": -1, "score": 6.34 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 84, "rankChange": -8, "score": 40 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 71, "rankChange": -1, "score": 60.28 }
  },
  "BH": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 171, "rankChange": 0, "score": 12 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 157, "rankChange": 0, "score": 0.06 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 138, "rankChange": -2, "score": 2.45 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 56, "rankChange": -3, "score": 50 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 170, "rankChange": -13, "score": 24.84 }
  },
  "BI": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 165, "rankChange": 0, "score": 15 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 159, "rankChange": -1, "score": 0.06 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 144, "rankChange": -2, "score": 2.13 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 167, "rankChange": -2, "score": 17 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 119, "rankChange": 6, "score": 46.14 }
  },
  "BJ": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 100, "rankChange": 0, "score": 60 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 93, "rankChange": 2, "score": 0.32 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 102, "rankChange": -4, "score": 4.26 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 70, "rankChange": -1, "score": 45 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 113, "rankChange": -21, "score": 47.39 }
  },
  "BN": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 145, "rankChange": 0, "score": 27 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 31, "rankChange": 0, "score": 63 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 96, "rankChange": 1, "score": 52.58 }
  },
  "BO": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 91, "rankChange": 0, "score": 65 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 89, "rankChange": 9, "score": 0.35 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 83, "rankChange": 18, "score": 5.38 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 136, "rankChange": -3, "score": 28 },
    "perception": { "year": 2026, "rating": "Negative", "rank": 64, "score": -11 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 91, "rankChange": 2, "score": 54.25 }
  },
  "BR": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 79, "rankChange": 0, "score": 72 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 29, "rankChange": 0, "score": 0.7 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 50, "rankChange": 6, "score": 6.76 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 107, "rankChange": 0, "score": 35 },
    "perception": { "year": 2026, "rating": "Negative", "rank": 67, "score": -13 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 52, "rankChange": 11, "score": 66.37 }
  },
  "BS": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 36, "rankChange": 0, "score": 90 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 29, "rankChange": -1, "score": 64 }
  },
  "BT": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 85, "rankChange": 0, "score": 68 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 72, "rankChange": -1, "score": 0.46 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 79, "rankChange": -1, "score": 5.65 },
    "cpi": { "year": 2025, "rating": "70–79", "rank": 18, "rankChange": 0, "score": 71 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 150, "rankChange": 2, "score": 33.5 }
  },
  "BW": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 73, "rankChange": 0, "score": 75 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 59, "rankChange": 10, "score": 0.52 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 36, "rankChange": -2, "score": 7.63 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 41, "rankChange": 2, "score": 58 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 63, "rankChange": 18, "score": 62.89 }
  },
  "BY": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 181, "rankChange": 0, "score": 7 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 172, "rankChange": 0, "score": 0.04 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 149, "rankChange": 1, "score": 1.99 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 124, "rankChange": -10, "score": 31 },
    "perception": { "year": 2026, "rating": "Negative", "rank": 58, "score": -9 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 165, "rankChange": 1, "score": 27.72 }
  },
  "BZ": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 48, "rankChange": 0, "score": 88 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 104, "rankChange": 0, "score": 36 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 66, "rankChange": -19, "score": 61.66 }
  },
  "CA": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 5, "rankChange": 0, "score": 97 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 23, "rankChange": 2, "score": 0.74 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 9, "rankChange": 4, "score": 9.08 },
    "cpi": { "year": 2025, "rating": "70–79", "rank": 16, "rankChange": -1, "score": 75 },
    "perception": { "year": 2026, "rating": "Positive", "rank": 10, "score": 13 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 20, "rankChange": 1, "score": 78.76 }
  },
  "CD": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 159, "rankChange": 0, "score": 18 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 134, "rankChange": -1, "score": 0.12 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 156, "rankChange": -2, "score": 1.92 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 163, "rankChange": 0, "score": 20 },
    "perception": { "year": 2026, "rating": "Neutral", "rank": 49, "score": -5 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 130, "rankChange": 3, "score": 42.16 }
  },
  "CF": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 185, "rankChange": 0, "score": 5 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 143, "rankChange": 3, "score": 0.1 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 164, "rankChange": -2, "score": 1.18 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 150, "rankChange": -1, "score": 24 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 81, "rankChange": -9, "score": 56.73 }
  },
  "CG": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 163, "rankChange": 0, "score": 17 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 135, "rankChange": 2, "score": 0.12 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 128, "rankChange": -2, "score": 2.79 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 153, "rankChange": -2, "score": 23 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 68, "rankChange": 3, "score": 61.21 }
  },
  "CH": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 11, "rankChange": 0, "score": 96 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 4, "rankChange": 1, "score": 0.84 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 8, "rankChange": -3, "score": 9.32 },
    "cpi": { "year": 2025, "rating": "80–89", "rank": 6, "rankChange": -1, "score": 80 },
    "perception": { "year": 2026, "rating": "Very Positive", "rank": 5, "score": 19 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 8, "rankChange": 1, "score": 84.83 }
  },
  "CI": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 117, "rankChange": 0, "score": 49 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 109, "rankChange": -3, "score": 0.23 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 104, "rankChange": -1, "score": 4.24 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 76, "rankChange": -7, "score": 43 },
    "perception": { "year": 2026, "rating": "Negative", "rank": 58, "score": -9 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 54, "rankChange": 10, "score": 66.27 }
  },
  "CL": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 18, "rankChange": 0, "score": 95 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 16, "rankChange": -3, "score": 0.78 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 27, "rankChange": 1, "score": 7.97 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 31, "rankChange": 1, "score": 63 },
    "perception": { "year": 2026, "rating": "Negative", "rank": 62, "score": -10 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 70, "rankChange": -1, "score": 60.84 }
  },
  "CM": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 165, "rankChange": 0, "score": 15 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 138, "rankChange": -6, "score": 0.11 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 136, "rankChange": -2, "score": 2.56 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 142, "rankChange": -2, "score": 26 },
    "perception": { "year": 2026, "rating": "Very Negative", "rank": 92, "score": -23 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 133, "rankChange": -2, "score": 40.88 }
  },
  "CN": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 178, "rankChange": 0, "score": 9 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 171, "rankChange": 0, "score": 0.04 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 142, "rankChange": 1, "score": 2.24 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 76, "rankChange": 0, "score": 43 },
    "perception": { "year": 2026, "rating": "Positive", "rank": 9, "score": 14 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 178, "rankChange": 0, "score": 13.85 }
  },
  "CO": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 81, "rankChange": 0, "score": 70 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 53, "rankChange": -1, "score": 0.56 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 73, "rankChange": -14, "score": 6.04 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 99, "rankChange": -7, "score": 37 },
    "perception": { "year": 2026, "rating": "Negative", "rank": 52, "score": -6 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 102, "rankChange": 13, "score": 51.66 }
  },
  "CR": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 33, "rankChange": 0, "score": 91 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 7, "rankChange": 3, "score": 0.81 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 19, "rankChange": -2, "score": 8.29 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 46, "rankChange": -4, "score": 56 },
    "perception": { "year": 2026, "rating": "Positive", "rank": 17, "score": 9 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 38, "rankChange": -2, "score": 72.35 }
  },
  "CU": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 175, "rankChange": 0, "score": 10 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 161, "rankChange": -1, "score": 0.06 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 135, "rankChange": -2, "score": 2.58 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 84, "rankChange": -2, "score": 40 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 160, "rankChange": 5, "score": 29.22 }
  },
  "CV": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 28, "rankChange": 0, "score": 92 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 40, "rankChange": -1, "score": 0.63 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 37, "rankChange": -1, "score": 7.58 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 35, "rankChange": 0, "score": 62 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 40, "rankChange": -10, "score": 71.98 }
  },
  "CY": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 33, "rankChange": 0, "score": 91 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 35, "rankChange": 1, "score": 0.66 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 40, "rankChange": -1, "score": 7.45 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 49, "rankChange": -3, "score": 55 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 80, "rankChange": -3, "score": 56.91 }
  },
  "CZ": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 18, "rankChange": 0, "score": 95 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 10, "rankChange": -3, "score": 0.79 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 23, "rankChange": -1, "score": 8.15 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 39, "rankChange": 7, "score": 59 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 11, "rankChange": -1, "score": 83.01 }
  },
  "DE": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 18, "rankChange": 0, "score": 95 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 15, "rankChange": 1, "score": 0.78 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 16, "rankChange": -4, "score": 8.73 },
    "cpi": { "year": 2025, "rating": "70–79", "rank": 10, "rankChange": 5, "score": 77 },
    "perception": { "year": 2026, "rating": "Positive", "rank": 20, "score": 8 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 14, "rankChange": -3, "score": 82.17 }
  },
  "DJ": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 150, "rankChange": 0, "score": 24 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 132, "rankChange": 7, "score": 0.12 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 131, "rankChange": -1, "score": 2.7 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 124, "rankChange": 3, "score": 31 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 167, "rankChange": 1, "score": 25.04 }
  },
  "DK": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 5, "rankChange": 0, "score": 97 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 1, "rankChange": 0, "score": 0.88 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 3, "rankChange": 4, "score": 9.42 },
    "cpi": { "year": 2025, "rating": "80–89", "rank": 1, "rankChange": 0, "score": 89 },
    "perception": { "year": 2026, "rating": "Very Positive", "rank": 3, "score": 21 },
    "rsfPress": { "year": 2026, "rating": "Good", "rank": 4, "rankChange": 2, "score": 88.47 }
  },
  "DM": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 28, "rankChange": 0, "score": 92 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 37, "rankChange": -1, "score": 60 }
  },
  "DO": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 85, "rankChange": 0, "score": 68 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 65, "rankChange": 0, "score": 0.51 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 51, "rankChange": 0, "score": 6.75 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 99, "rankChange": 5, "score": 37 },
    "perception": { "year": 2026, "rating": "Negative", "rank": 70, "score": -14 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 44, "rankChange": -1, "score": 69.73 }
  },
  "DZ": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 139, "rankChange": 0, "score": 31 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 131, "rankChange": 4, "score": 0.13 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 110, "rankChange": -2, "score": 3.55 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 109, "rankChange": -2, "score": 34 },
    "perception": { "year": 2026, "rating": "Positive", "rank": 23, "score": 7 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 145, "rankChange": -19, "score": 37.38 }
  },
  "EC": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 91, "rankChange": 0, "score": 65 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 79, "rankChange": -6, "score": 0.39 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 86, "rankChange": -2, "score": 5.2 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 116, "rankChange": 5, "score": 33 },
    "perception": { "year": 2026, "rating": "Negative", "rank": 70, "score": -14 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 125, "rankChange": -31, "score": 44.37 }
  },
  "EE": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 11, "rankChange": 0, "score": 96 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 5, "rankChange": -3, "score": 0.84 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 24, "rankChange": -4, "score": 8.07 },
    "cpi": { "year": 2025, "rating": "70–79", "rank": 12, "rankChange": 1, "score": 76 },
    "rsfPress": { "year": 2026, "rating": "Good", "rank": 3, "rankChange": -1, "score": 88.54 }
  },
  "EG": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 159, "rankChange": 0, "score": 18 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 136, "rankChange": -2, "score": 0.12 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 128, "rankChange": -2, "score": 2.79 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 130, "rankChange": 0, "score": 30 },
    "perception": { "year": 2026, "rating": "Positive", "rank": 23, "score": 7 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 169, "rankChange": 1, "score": 24.92 }
  },
  "ER": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 189, "rankChange": 0, "score": 3 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 179, "rankChange": 0, "score": 0.01 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 150, "rankChange": 1, "score": 1.97 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 177, "rankChange": -4, "score": 13 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 180, "rankChange": 0, "score": 10.24 }
  },
  "ES": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 36, "rankChange": 0, "score": 90 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 21, "rankChange": 5, "score": 0.74 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 22, "rankChange": -2, "score": 8.2 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 49, "rankChange": -3, "score": 55 },
    "perception": { "year": 2026, "rating": "Neutral", "rank": 43, "score": -3 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 29, "rankChange": -6, "score": 75.42 }
  },
  "ET": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 159, "rankChange": 0, "score": 18 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 145, "rankChange": 4, "score": 0.1 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 119, "rankChange": -5, "score": 3.13 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 96, "rankChange": 3, "score": 38 },
    "perception": { "year": 2026, "rating": "Neutral", "rank": 29, "score": 3 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 148, "rankChange": -3, "score": 34.66 }
  },
  "FI": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 1, "rankChange": 0, "score": 100 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 8, "rankChange": 6, "score": 0.81 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 5, "rankChange": 1, "score": 9.37 },
    "cpi": { "year": 2025, "rating": "80–89", "rank": 2, "rankChange": 0, "score": 88 },
    "perception": { "year": 2026, "rating": "Very Positive", "rank": 4, "score": 20 },
    "rsfPress": { "year": 2026, "rating": "Good", "rank": 6, "rankChange": -1, "score": 86.22 }
  },
  "FJ": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 82, "rankChange": 0, "score": 69 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 78, "rankChange": -1, "score": 0.4 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 82, "rankChange": -2, "score": 5.39 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 49, "rankChange": 1, "score": 55 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 24, "rankChange": 16, "score": 76.76 }
  },
  "FM": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 28, "rankChange": 0, "score": 92 }
  },
  "FR": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 40, "rankChange": 0, "score": 89 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 9, "rankChange": 2, "score": 0.8 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 26, "rankChange": -1, "score": 8.05 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 27, "rankChange": -2, "score": 66 },
    "perception": { "year": 2026, "rating": "Very Negative", "rank": 83, "score": -20 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 25, "rankChange": 0, "score": 76.68 }
  },
  "GA": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 156, "rankChange": 0, "score": 21 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 114, "rankChange": 9, "score": 0.18 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 111, "rankChange": 30, "score": 3.49 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 135, "rankChange": 0, "score": 29 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 43, "rankChange": -2, "score": 70.57 }
  },
  "GB": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 28, "rankChange": 0, "score": 92 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 30, "rankChange": -6, "score": 0.69 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 18, "rankChange": -2, "score": 8.34 },
    "cpi": { "year": 2025, "rating": "70–79", "rank": 20, "rankChange": 0, "score": 70 },
    "perception": { "year": 2026, "rating": "Neutral", "rank": 43, "score": -3 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 18, "rankChange": 2, "score": 79.45 }
  },
  "GD": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 40, "rankChange": 0, "score": 89 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 46, "rankChange": 0, "score": 56 }
  },
  "GE": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 108, "rankChange": 0, "score": 55 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 101, "rankChange": -8, "score": 0.28 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 99, "rankChange": -7, "score": 4.36 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 56, "rankChange": -3, "score": 50 },
    "perception": { "year": 2026, "rating": "Negative", "rank": 53, "score": -7 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 135, "rankChange": -21, "score": 40.77 }
  },
  "GH": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 67, "rankChange": 0, "score": 80 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 45, "rankChange": 5, "score": 0.61 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 65, "rankChange": -1, "score": 6.24 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 76, "rankChange": 4, "score": 43 },
    "perception": { "year": 2026, "rating": "Very Positive", "rank": 6, "score": 17 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 39, "rankChange": 13, "score": 72.2 }
  },
  "GM": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 116, "rankChange": 0, "score": 50 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 58, "rankChange": 1, "score": 0.52 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 97, "rankChange": 0, "score": 4.47 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 99, "rankChange": -3, "score": 37 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 46, "rankChange": 12, "score": 69.42 }
  },
  "GN": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 142, "rankChange": 0, "score": 30 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 150, "rankChange": 4, "score": 0.1 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 143, "rankChange": 4, "score": 2.15 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 142, "rankChange": -9, "score": 26 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 111, "rankChange": -8, "score": 48.45 }
  },
  "GQ": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 185, "rankChange": 0, "score": 5 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 166, "rankChange": -1, "score": 0.05 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 156, "rankChange": -2, "score": 1.92 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 172, "rankChange": 1, "score": 15 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 94, "rankChange": 24, "score": 52.79 }
  },
  "GR": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 51, "rankChange": 0, "score": 85 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 52, "rankChange": -3, "score": 0.57 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 24, "rankChange": 0, "score": 8.07 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 56, "rankChange": 3, "score": 50 },
    "perception": { "year": 2026, "rating": "Very Negative", "rank": 81, "score": -18 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 86, "rankChange": 3, "score": 55.05 }
  },
  "GT": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 118, "rankChange": 0, "score": 48 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 57, "rankChange": 9, "score": 0.52 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 94, "rankChange": 1, "score": 4.65 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 142, "rankChange": 4, "score": 26 },
    "perception": { "year": 2026, "rating": "Very Negative", "rank": 85, "score": -21 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 128, "rankChange": 10, "score": 43.21 }
  },
  "GW": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 127, "rankChange": 0, "score": 41 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 149, "rankChange": -23, "score": 0.1 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 162, "rankChange": -14, "score": 1.37 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 161, "rankChange": -3, "score": 21 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 100, "rankChange": 10, "score": 51.99 }
  },
  "GY": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 76, "rankChange": 0, "score": 74 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 92, "rankChange": 5, "score": 0.33 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 71, "rankChange": -3, "score": 6.09 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 84, "rankChange": 8, "score": 40 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 76, "rankChange": -3, "score": 59.58 }
  },
  "HN": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 118, "rankChange": 0, "score": 48 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 82, "rankChange": 1, "score": 0.38 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 92, "rankChange": -4, "score": 4.87 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 157, "rankChange": -3, "score": 22 },
    "perception": { "year": 2026, "rating": "Negative", "rank": 64, "score": -11 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 132, "rankChange": 10, "score": 41.02 }
  },
  "HR": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 59, "rankChange": 0, "score": 82 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 46, "rankChange": -1, "score": 0.59 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 57, "rankChange": -2, "score": 6.5 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 63, "rankChange": 0, "score": 47 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 53, "rankChange": 7, "score": 66.31 }
  },
  "HT": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 150, "rankChange": 0, "score": 24 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 146, "rankChange": -2, "score": 0.1 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 125, "rankChange": 4, "score": 2.81 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 169, "rankChange": -1, "score": 16 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 107, "rankChange": 4, "score": 50.32 }
  },
  "HU": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 91, "rankChange": 0, "score": 65 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 94, "rankChange": 0, "score": 0.32 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 55, "rankChange": -2, "score": 6.58 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 84, "rankChange": -2, "score": 40 },
    "perception": { "year": 2026, "rating": "Neutral", "rank": 36, "score": -1 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 74, "rankChange": -6, "score": 59.85 }
  },
  "ID": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 106, "rankChange": 0, "score": 56 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 99, "rankChange": -7, "score": 0.3 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 60, "rankChange": -2, "score": 6.37 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 109, "rankChange": -10, "score": 34 },
    "perception": { "year": 2026, "rating": "Very Negative", "rank": 85, "score": -21 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 129, "rankChange": -2, "score": 43.02 }
  },
  "IE": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 5, "rankChange": 0, "score": 97 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 6, "rankChange": 0, "score": 0.82 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 7, "rankChange": 1, "score": 9.33 },
    "cpi": { "year": 2025, "rating": "70–79", "rank": 12, "rankChange": -2, "score": 76 },
    "perception": { "year": 2026, "rating": "Neutral", "rank": 32, "score": 2 },
    "rsfPress": { "year": 2026, "rating": "Good", "rank": 7, "rankChange": 0, "score": 85.93 }
  },
  "IL": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 77, "rankChange": 0, "score": 73 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 48, "rankChange": -2, "score": 0.59 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 30, "rankChange": 0, "score": 7.8 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 35, "rankChange": -5, "score": 62 },
    "perception": { "year": 2026, "rating": "Neutral", "rank": 41, "score": -2 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 116, "rankChange": -4, "score": 46.46 }
  },
  "IN": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 96, "rankChange": 0, "score": 63 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 105, "rankChange": -4, "score": 0.26 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 47, "rankChange": -7, "score": 6.96 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 91, "rankChange": 5, "score": 39 },
    "perception": { "year": 2026, "rating": "Very Positive", "rank": 8, "score": 15 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 157, "rankChange": -6, "score": 31.96 }
  },
  "IQ": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 139, "rankChange": 0, "score": 31 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 111, "rankChange": 1, "score": 0.22 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 119, "rankChange": 5, "score": 3.13 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 136, "rankChange": 4, "score": 28 },
    "perception": { "year": 2026, "rating": "Very Negative", "rank": 78, "score": -17 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 162, "rankChange": -7, "score": 28.85 }
  },
  "IR": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 174, "rankChange": 0, "score": 11 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 142, "rankChange": 10, "score": 0.1 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 152, "rankChange": 0, "score": 1.96 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 153, "rankChange": -2, "score": 23 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 177, "rankChange": -1, "score": 17.45 }
  },
  "IS": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 18, "rankChange": 0, "score": 95 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 25, "rankChange": -4, "score": 0.72 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 4, "rankChange": 0, "score": 9.38 },
    "cpi": { "year": 2025, "rating": "70–79", "rank": 10, "rankChange": 0, "score": 77 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 12, "rankChange": 5, "score": 82.77 }
  },
  "IT": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 40, "rankChange": 0, "score": 89 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 37, "rankChange": -6, "score": 0.64 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 37, "rankChange": -1, "score": 7.58 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 52, "rankChange": 0, "score": 53 },
    "perception": { "year": 2026, "rating": "Neutral", "rank": 36, "score": -1 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 56, "rankChange": -7, "score": 65.16 }
  },
  "JM": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 67, "rankChange": 0, "score": 80 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 33, "rankChange": 1, "score": 0.68 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 52, "rankChange": -4, "score": 6.74 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 73, "rankChange": 0, "score": 44 },
    "perception": { "year": 2026, "rating": "Neutral", "rank": 32, "score": 2 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 26, "rankChange": 0, "score": 75.87 }
  },
  "JO": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 134, "rankChange": 0, "score": 34 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 102, "rankChange": 2, "score": 0.27 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 115, "rankChange": -2, "score": 3.28 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 56, "rankChange": 3, "score": 50 },
    "perception": { "year": 2026, "rating": "Neutral", "rank": 36, "score": -1 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 142, "rankChange": 5, "score": 39.33 }
  },
  "JP": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 11, "rankChange": 0, "score": 96 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 24, "rankChange": 3, "score": 0.73 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 13, "rankChange": 2, "score": 8.85 },
    "cpi": { "year": 2025, "rating": "70–79", "rank": 18, "rankChange": 2, "score": 71 },
    "perception": { "year": 2026, "rating": "Neutral", "rank": 49, "score": -5 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 62, "rankChange": 4, "score": 62.9 }
  },
  "KE": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 114, "rankChange": 0, "score": 51 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 74, "rankChange": 0, "score": 0.45 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 89, "rankChange": -2, "score": 5.05 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 130, "rankChange": -9, "score": 30 },
    "perception": { "year": 2026, "rating": "Neutral", "rank": 36, "score": -1 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 106, "rankChange": 11, "score": 50.51 }
  },
  "KG": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 146, "rankChange": 0, "score": 26 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 115, "rankChange": 1, "score": 0.18 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 116, "rankChange": -7, "score": 3.27 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 142, "rankChange": 4, "score": 26 },
    "perception": { "year": 2026, "rating": "Very Negative", "rank": 76, "score": -16 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 146, "rankChange": -2, "score": 35.06 }
  },
  "KH": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 154, "rankChange": 0, "score": 23 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 165, "rankChange": 1, "score": 0.05 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 131, "rankChange": -10, "score": 2.7 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 163, "rankChange": -5, "score": 20 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 151, "rankChange": 10, "score": 33.28 }
  },
  "KI": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 40, "rankChange": 0, "score": 89 }
  },
  "KM": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 126, "rankChange": 0, "score": 42 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 126, "rankChange": 10, "score": 0.13 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 125, "rankChange": -3, "score": 2.81 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 163, "rankChange": -5, "score": 20 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 72, "rankChange": 3, "score": 60.23 }
  },
  "KN": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 40, "rankChange": 0, "score": 89 }
  },
  "KP": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 189, "rankChange": 0, "score": 3 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 178, "rankChange": -1, "score": 0.01 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 165, "rankChange": -2, "score": 1.08 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 172, "rankChange": -2, "score": 15 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 179, "rankChange": 0, "score": 12.67 }
  },
  "KR": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 65, "rankChange": 0, "score": 81 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 22, "rankChange": 20, "score": 0.74 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 32, "rankChange": -1, "score": 7.75 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 31, "rankChange": -1, "score": 63 },
    "perception": { "year": 2026, "rating": "Positive", "rank": 11, "score": 12 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 47, "rankChange": 14, "score": 69.12 }
  },
  "KW": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 139, "rankChange": 0, "score": 31 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 129, "rankChange": -11, "score": 0.13 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 130, "rankChange": -2, "score": 2.78 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 65, "rankChange": 0, "score": 46 },
    "perception": { "year": 2026, "rating": "Positive", "rank": 23, "score": 7 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 136, "rankChange": -8, "score": 40.44 }
  },
  "KZ": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 154, "rankChange": 0, "score": 23 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 127, "rankChange": 2, "score": 0.13 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 123, "rankChange": -7, "score": 2.91 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 96, "rankChange": -8, "score": 38 },
    "perception": { "year": 2026, "rating": "Very Negative", "rank": 96, "score": -31 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 149, "rankChange": -8, "score": 34.41 }
  },
  "LA": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 169, "rankChange": 0, "score": 13 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 140, "rankChange": 0, "score": 0.11 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 159, "rankChange": -1, "score": 1.71 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 109, "rankChange": 5, "score": 34 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 154, "rankChange": -4, "score": 32.54 }
  },
  "LB": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 130, "rankChange": 0, "score": 39 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 103, "rankChange": 7, "score": 0.27 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 109, "rankChange": -2, "score": 3.81 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 153, "rankChange": 1, "score": 23 },
    "perception": { "year": 2026, "rating": "Very Negative", "rank": 85, "score": -21 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 115, "rankChange": 17, "score": 46.49 }
  },
  "LC": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 33, "rankChange": 0, "score": 91 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 39, "rankChange": -1, "score": 59 }
  },
  "LI": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 36, "rankChange": 0, "score": 90 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 13, "rankChange": -1, "score": 82.62 }
  },
  "LK": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 104, "rankChange": 0, "score": 58 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 44, "rankChange": 20, "score": 0.61 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 56, "rankChange": 10, "score": 6.57 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 107, "rankChange": 14, "score": 35 },
    "perception": { "year": 2026, "rating": "Very Positive", "rank": 7, "score": 16 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 134, "rankChange": 5, "score": 40.77 }
  },
  "LR": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 95, "rankChange": 0, "score": 64 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 76, "rankChange": 2, "score": 0.42 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 80, "rankChange": -1, "score": 5.57 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 136, "rankChange": -1, "score": 28 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 58, "rankChange": -4, "score": 64.54 }
  },
  "LS": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 90, "rankChange": 0, "score": 66 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 62, "rankChange": -2, "score": 0.51 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 66, "rankChange": 3, "score": 6.23 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 99, "rankChange": 0, "score": 37 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 89, "rankChange": 18, "score": 54.37 }
  },
  "LT": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 40, "rankChange": 0, "score": 89 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 27, "rankChange": 1, "score": 0.71 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 39, "rankChange": -4, "score": 7.55 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 28, "rankChange": 4, "score": 65 },
    "perception": { "year": 2026, "rating": "Negative", "rank": 67, "score": -13 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 15, "rankChange": -1, "score": 81.34 }
  },
  "LU": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 5, "rankChange": 0, "score": 97 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 17, "rankChange": -2, "score": 0.78 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 9, "rankChange": 1, "score": 9.08 },
    "cpi": { "year": 2025, "rating": "70–79", "rank": 8, "rankChange": -3, "score": 78 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 9, "rankChange": 4, "score": 84.14 }
  },
  "LV": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 40, "rankChange": 0, "score": 89 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 20, "rankChange": 0, "score": 0.75 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 33, "rankChange": -1, "score": 7.73 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 37, "rankChange": 1, "score": 60 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 17, "rankChange": -2, "score": 81.0 }
  },
  "LY": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 175, "rankChange": 0, "score": 10 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 147, "rankChange": -4, "score": 0.1 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 141, "rankChange": -3, "score": 2.31 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 177, "rankChange": -4, "score": 13 },
    "perception": { "year": 2026, "rating": "Negative", "rank": 67, "score": -13 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 138, "rankChange": -1, "score": 40.34 }
  },
  "MA": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 132, "rankChange": 0, "score": 37 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 107, "rankChange": -2, "score": 0.25 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 91, "rankChange": -2, "score": 4.97 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 91, "rankChange": 8, "score": 39 },
    "perception": { "year": 2026, "rating": "Negative", "rank": 54, "score": -8 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 105, "rankChange": 15, "score": 50.55 }
  },
  "MC": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 59, "rankChange": 0, "score": 82 }
  },
  "MD": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 100, "rankChange": 0, "score": 60 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 73, "rankChange": -12, "score": 0.45 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 77, "rankChange": -7, "score": 5.86 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 80, "rankChange": -4, "score": 42 },
    "perception": { "year": 2026, "rating": "Negative", "rank": 54, "score": -8 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 31, "rankChange": 4, "score": 74.77 }
  },
  "ME": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 82, "rankChange": 0, "score": 69 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 66, "rankChange": -3, "score": 0.5 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 53, "rankChange": -4, "score": 6.73 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 65, "rankChange": 0, "score": 46 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 41, "rankChange": -4, "score": 71.8 }
  },
  "MG": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 108, "rankChange": 0, "score": 55 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 113, "rankChange": 0, "score": 0.19 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 88, "rankChange": -6, "score": 5.06 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 148, "rankChange": -8, "score": 25 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 103, "rankChange": 10, "score": 50.95 }
  },
  "MH": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 24, "rankChange": 0, "score": 93 }
  },
  "MK": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 88, "rankChange": 0, "score": 67 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 85, "rankChange": 1, "score": 0.37 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 64, "rankChange": -3, "score": 6.28 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 84, "rankChange": 4, "score": 40 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 45, "rankChange": -3, "score": 69.49 }
  },
  "ML": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 150, "rankChange": 0, "score": 24 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 122, "rankChange": 3, "score": 0.15 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 140, "rankChange": -3, "score": 2.4 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 136, "rankChange": -1, "score": 28 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 121, "rankChange": -2, "score": 45.63 }
  },
  "MM": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 181, "rankChange": 0, "score": 7 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 177, "rankChange": -1, "score": 0.01 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 166, "rankChange": -2, "score": 0.96 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 169, "rankChange": -1, "score": 16 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 166, "rankChange": 3, "score": 26.38 }
  },
  "MN": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 53, "rankChange": 0, "score": 84 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 75, "rankChange": 7, "score": 0.42 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 57, "rankChange": -5, "score": 6.5 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 124, "rankChange": -10, "score": 31 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 85, "rankChange": 17, "score": 55.79 }
  },
  "MR": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 130, "rankChange": 0, "score": 39 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 130, "rankChange": -2, "score": 0.13 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 108, "rankChange": -2, "score": 3.84 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 130, "rankChange": 0, "score": 30 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 61, "rankChange": -11, "score": 63.36 }
  },
  "MT": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 49, "rankChange": 0, "score": 87 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 43, "rankChange": 0, "score": 0.62 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 28, "rankChange": -2, "score": 7.93 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 60, "rankChange": 5, "score": 49 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 67, "rankChange": 0, "score": 61.44 }
  },
  "MU": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 50, "rankChange": 0, "score": 86 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 38, "rankChange": 47, "score": 0.64 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 21, "rankChange": -2, "score": 8.23 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 61, "rankChange": -5, "score": 48 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 42, "rankChange": 9, "score": 70.92 }
  },
  "MV": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 125, "rankChange": 0, "score": 43 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 77, "rankChange": -2, "score": 0.42 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 91, "rankChange": 5, "score": 39 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 108, "rankChange": -4, "score": 49.23 }
  },
  "MW": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 91, "rankChange": 0, "score": 65 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 70, "rankChange": -3, "score": 0.46 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 70, "rankChange": 5, "score": 6.1 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 109, "rankChange": -2, "score": 34 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 69, "rankChange": 7, "score": 60.96 }
  },
  "MX": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 102, "rankChange": 0, "score": 59 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 110, "rankChange": -2, "score": 0.22 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 81, "rankChange": 2, "score": 5.4 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 141, "rankChange": -1, "score": 27 },
    "perception": { "year": 2026, "rating": "Negative", "rank": 70, "score": -14 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 122, "rankChange": 2, "score": 45.23 }
  },
  "MY": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 111, "rankChange": 0, "score": 53 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 88, "rankChange": 0, "score": 0.35 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 42, "rankChange": 1, "score": 7.11 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 54, "rankChange": 3, "score": 52 },
    "perception": { "year": 2026, "rating": "Positive", "rank": 17, "score": 9 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 95, "rankChange": -7, "score": 52.73 }
  },
  "MZ": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 127, "rankChange": 0, "score": 41 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 118, "rankChange": -3, "score": 0.17 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 113, "rankChange": -2, "score": 3.38 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 161, "rankChange": -15, "score": 21 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 99, "rankChange": 2, "score": 52.27 }
  },
  "NA": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 77, "rankChange": 0, "score": 73 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 60, "rankChange": -2, "score": 0.52 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 59, "rankChange": -2, "score": 6.48 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 65, "rankChange": -6, "score": 46 },
    "perception": { "year": 2026, "rating": "Positive", "rank": 20, "score": 8 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 23, "rankChange": 5, "score": 76.97 }
  },
  "NE": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 142, "rankChange": 0, "score": 30 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 116, "rankChange": 1, "score": 0.18 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 153, "rankChange": -14, "score": 1.95 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 124, "rankChange": -17, "score": 31 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 120, "rankChange": -37, "score": 46.02 }
  },
  "NG": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 123, "rankChange": 0, "score": 44 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 96, "rankChange": 0, "score": 0.31 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 105, "rankChange": -1, "score": 4.1 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 142, "rankChange": -2, "score": 26 },
    "perception": { "year": 2026, "rating": "Very Negative", "rank": 83, "score": -20 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 112, "rankChange": 10, "score": 48.11 }
  },
  "NI": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 168, "rankChange": 0, "score": 14 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 175, "rankChange": 0, "score": 0.02 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 150, "rankChange": -5, "score": 1.97 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 175, "rankChange": -3, "score": 14 },
    "perception": { "year": 2026, "rating": "Negative", "rank": 54, "score": -8 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 168, "rankChange": 4, "score": 24.98 }
  },
  "NL": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 5, "rankChange": 0, "score": 97 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 18, "rankChange": 0, "score": 0.77 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 11, "rankChange": -2, "score": 8.93 },
    "cpi": { "year": 2025, "rating": "70–79", "rank": 8, "rankChange": 1, "score": 78 },
    "perception": { "year": 2026, "rating": "Positive", "rank": 14, "score": 10 },
    "rsfPress": { "year": 2026, "rating": "Good", "rank": 2, "rankChange": 1, "score": 88.92 }
  },
  "NO": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 2, "rankChange": 0, "score": 99 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 3, "rankChange": 0, "score": 0.85 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 1, "rankChange": 0, "score": 9.81 },
    "cpi": { "year": 2025, "rating": "80–89", "rank": 4, "rankChange": 1, "score": 81 },
    "perception": { "year": 2026, "rating": "Very Positive", "rank": 2, "score": 23 },
    "rsfPress": { "year": 2026, "rating": "Good", "rank": 1, "rankChange": 0, "score": 92.72 }
  },
  "NP": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 98, "rankChange": 0, "score": 62 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 64, "rankChange": -8, "score": 0.51 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 106, "rankChange": -12, "score": 4.01 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 109, "rankChange": -2, "score": 34 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 87, "rankChange": 3, "score": 54.8 }
  },
  "NR": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 73, "rankChange": 0, "score": 75 }
  },
  "NZ": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 2, "rankChange": 0, "score": 99 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 14, "rankChange": -6, "score": 0.79 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 2, "rankChange": 0, "score": 9.62 },
    "cpi": { "year": 2025, "rating": "80–89", "rank": 4, "rankChange": 0, "score": 81 },
    "perception": { "year": 2026, "rating": "Positive", "rank": 12, "score": 11 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 22, "rankChange": -6, "score": 77.38 }
  },
  "OM": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 150, "rankChange": 0, "score": 24 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 125, "rankChange": 2, "score": 0.14 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 121, "rankChange": -3, "score": 3.05 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 54, "rankChange": -4, "score": 52 },
    "perception": { "year": 2026, "rating": "Positive", "rank": 12, "score": 11 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 127, "rankChange": 7, "score": 43.67 }
  },
  "PA": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 57, "rankChange": 0, "score": 83 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 49, "rankChange": -1, "score": 0.57 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 44, "rankChange": 2, "score": 7.04 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 116, "rankChange": -2, "score": 33 },
    "perception": { "year": 2026, "rating": "Very Negative", "rank": 75, "score": -15 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 65, "rankChange": -12, "score": 62.14 }
  },
  "PE": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 88, "rankChange": 0, "score": 67 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 63, "rankChange": -1, "score": 0.51 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 76, "rankChange": 1, "score": 5.88 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 130, "rankChange": -3, "score": 30 },
    "perception": { "year": 2026, "rating": "Negative", "rank": 70, "score": -14 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 144, "rankChange": -14, "score": 37.86 }
  },
  "PG": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 99, "rankChange": 0, "score": 61 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 80, "rankChange": 4, "score": 0.38 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 75, "rankChange": -3, "score": 5.9 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 142, "rankChange": -15, "score": 26 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 73, "rankChange": 5, "score": 60.11 }
  },
  "PH": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 104, "rankChange": 0, "score": 58 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 100, "rankChange": 0, "score": 0.29 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 62, "rankChange": -12, "score": 6.31 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 120, "rankChange": -6, "score": 32 },
    "perception": { "year": 2026, "rating": "Positive", "rank": 14, "score": 10 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 114, "rankChange": 2, "score": 46.79 }
  },
  "PK": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 138, "rankChange": 0, "score": 32 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 117, "rankChange": -3, "score": 0.18 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 139, "rankChange": -17, "score": 2.44 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 136, "rankChange": -1, "score": 28 },
    "perception": { "year": 2026, "rating": "Negative", "rank": 66, "score": -12 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 153, "rankChange": 5, "score": 32.61 }
  },
  "PL": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 59, "rankChange": 0, "score": 82 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 36, "rankChange": 8, "score": 0.65 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 34, "rankChange": 4, "score": 7.65 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 52, "rankChange": 1, "score": 53 },
    "perception": { "year": 2026, "rating": "Neutral", "rank": 47, "score": -4 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 27, "rankChange": 4, "score": 75.52 }
  },
  "PS": {
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 137, "rankChange": 1, "score": 0.11 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 112, "rankChange": -2, "score": 3.44 },
    "perception": { "year": 2026, "rating": "Very Negative", "rank": 90, "score": -22 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 156, "rankChange": 7, "score": 32.09 }
  },
  "PT": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 11, "rankChange": 0, "score": 96 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 26, "rankChange": -4, "score": 0.72 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 20, "rankChange": 2, "score": 8.28 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 46, "rankChange": -3, "score": 56 },
    "perception": { "year": 2026, "rating": "Negative", "rank": 62, "score": -10 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 10, "rankChange": -2, "score": 83.71 }
  },
  "PW": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 28, "rankChange": 0, "score": 92 }
  },
  "PY": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 96, "rankChange": 0, "score": 63 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 83, "rankChange": -2, "score": 0.38 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 73, "rankChange": 1, "score": 6.04 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 150, "rankChange": -1, "score": 24 },
    "perception": { "year": 2026, "rating": "Very Negative", "rank": 92, "score": -23 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 88, "rankChange": -4, "score": 54.67 }
  },
  "QA": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 148, "rankChange": 0, "score": 25 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 151, "rankChange": -3, "score": 0.09 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 118, "rankChange": -3, "score": 3.17 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 41, "rankChange": -3, "score": 58 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 75, "rankChange": 4, "score": 59.79 }
  },
  "RO": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 59, "rankChange": 0, "score": 82 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 69, "rankChange": 3, "score": 0.46 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 69, "rankChange": 2, "score": 6.11 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 70, "rankChange": -5, "score": 45 },
    "perception": { "year": 2026, "rating": "Very Negative", "rank": 85, "score": -21 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 49, "rankChange": 6, "score": 67.71 }
  },
  "RS": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 106, "rankChange": 0, "score": 56 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 112, "rankChange": -1, "score": 0.21 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 63, "rankChange": 0, "score": 6.3 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 116, "rankChange": -11, "score": 33 },
    "perception": { "year": 2026, "rating": "Very Negative", "rank": 81, "score": -18 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 104, "rankChange": -8, "score": 50.79 }
  },
  "RU": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 171, "rankChange": 0, "score": 12 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 162, "rankChange": -3, "score": 0.06 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 148, "rankChange": 0, "score": 2.03 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 157, "rankChange": -3, "score": 22 },
    "perception": { "year": 2026, "rating": "Very Negative", "rank": 85, "score": -21 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 172, "rankChange": -1, "score": 23.15 }
  },
  "RW": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 156, "rankChange": 0, "score": 21 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 152, "rankChange": -2, "score": 0.09 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 114, "rankChange": -2, "score": 3.34 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 41, "rankChange": 2, "score": 58 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 139, "rankChange": 7, "score": 39.58 }
  },
  "SA": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 178, "rankChange": 0, "score": 9 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 167, "rankChange": 0, "score": 0.05 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 147, "rankChange": -1, "score": 2.08 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 45, "rankChange": -7, "score": 57 },
    "perception": { "year": 2026, "rating": "Neutral", "rank": 41, "score": -2 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 176, "rankChange": -14, "score": 19.11 }
  },
  "SB": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 73, "rankChange": 0, "score": 75 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 55, "rankChange": -1, "score": 0.54 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 73, "rankChange": 3, "score": 44 }
  },
  "SC": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 67, "rankChange": 0, "score": 80 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 31, "rankChange": 6, "score": 0.68 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 24, "rankChange": -6, "score": 68 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 35, "rankChange": 10, "score": 73.04 }
  },
  "SD": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 191, "rankChange": 0, "score": 2 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 174, "rankChange": 0, "score": 0.03 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 161, "rankChange": -1, "score": 1.46 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 175, "rankChange": -5, "score": 14 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 161, "rankChange": -5, "score": 29.02 }
  },
  "SE": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 2, "rankChange": 0, "score": 99 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 2, "rankChange": 2, "score": 0.85 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 6, "rankChange": -3, "score": 9.35 },
    "cpi": { "year": 2025, "rating": "80–89", "rank": 6, "rankChange": 2, "score": 80 },
    "perception": { "year": 2026, "rating": "Very Positive", "rank": 1, "score": 29 },
    "rsfPress": { "year": 2026, "rating": "Good", "rank": 5, "rankChange": -1, "score": 87.61 }
  },
  "SG": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 118, "rankChange": 0, "score": 48 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 87, "rankChange": 3, "score": 0.36 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 68, "rankChange": -1, "score": 6.18 },
    "cpi": { "year": 2025, "rating": "80–89", "rank": 3, "rankChange": 0, "score": 84 },
    "perception": { "year": 2026, "rating": "Neutral", "rank": 32, "score": 2 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 123, "rankChange": 0, "score": 44.57 }
  },
  "SI": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 11, "rankChange": 0, "score": 96 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 47, "rankChange": -6, "score": 0.59 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 29, "rankChange": 0, "score": 7.82 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 41, "rankChange": -5, "score": 58 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 36, "rankChange": -3, "score": 72.88 }
  },
  "SK": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 40, "rankChange": 0, "score": 89 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 50, "rankChange": -3, "score": 0.57 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 48, "rankChange": -7, "score": 6.94 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 61, "rankChange": -2, "score": 48 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 37, "rankChange": 1, "score": 72.71 }
  },
  "SL": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 102, "rankChange": 0, "score": 59 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 90, "rankChange": -3, "score": 0.35 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 98, "rankChange": 2, "score": 4.44 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 109, "rankChange": 5, "score": 34 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 79, "rankChange": -23, "score": 57.06 }
  },
  "SM": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 5, "rankChange": 0, "score": 97 }
  },
  "SN": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 82, "rankChange": 0, "score": 69 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 68, "rankChange": 2, "score": 0.48 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 72, "rankChange": 1, "score": 6.05 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 65, "rankChange": 4, "score": 46 },
    "perception": { "year": 2026, "rating": "Positive", "rank": 20, "score": 8 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 78, "rankChange": -4, "score": 58.11 }
  },
  "SO": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 180, "rankChange": 0, "score": 8 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 128, "rankChange": 2, "score": 0.13 },
    "cpi": { "year": 2025, "rating": "0–9", "rank": 181, "rankChange": -2, "score": 9 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 126, "rankChange": 10, "score": 43.84 }
  },
  "SR": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 67, "rankChange": 0, "score": 80 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 41, "rankChange": -1, "score": 0.63 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 45, "rankChange": 2, "score": 7.03 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 96, "rankChange": -8, "score": 38 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 34, "rankChange": -2, "score": 73.2 }
  },
  "SS": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 192, "rankChange": 0, "score": 1 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 156, "rankChange": 0, "score": 0.06 },
    "cpi": { "year": 2025, "rating": "0–9", "rank": 181, "rankChange": -1, "score": 9 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 118, "rankChange": -9, "score": 46.16 }
  },
  "ST": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 53, "rankChange": 0, "score": 84 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 61, "rankChange": -4, "score": 0.52 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 70, "rankChange": -1, "score": 45 }
  },
  "SV": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 121, "rankChange": 0, "score": 47 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 153, "rankChange": -2, "score": 0.09 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 96, "rankChange": -3, "score": 4.57 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 120, "rankChange": 10, "score": 32 },
    "perception": { "year": 2026, "rating": "Neutral", "rank": 43, "score": -3 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 143, "rankChange": -8, "score": 38.88 }
  },
  "SY": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 185, "rankChange": 0, "score": 5 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 163, "rankChange": 0, "score": 0.05 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 162, "rankChange": -1, "score": 1.37 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 172, "rankChange": 5, "score": 15 },
    "perception": { "year": 2026, "rating": "Neutral", "rank": 49, "score": -5 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 141, "rankChange": 36, "score": 39.44 }
  },
  "SZ": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 163, "rankChange": 0, "score": 17 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 148, "rankChange": -3, "score": 0.1 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 134, "rankChange": -2, "score": 2.6 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 153, "rankChange": -18, "score": 23 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 101, "rankChange": -3, "score": 51.94 }
  },
  "TD": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 165, "rankChange": 0, "score": 15 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 158, "rankChange": 4, "score": 0.06 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 158, "rankChange": -2, "score": 1.76 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 157, "rankChange": 1, "score": 22 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 93, "rankChange": 15, "score": 53.9 }
  },
  "TG": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 127, "rankChange": 0, "score": 41 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 121, "rankChange": -1, "score": 0.16 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 124, "rankChange": -5, "score": 2.88 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 120, "rankChange": 1, "score": 32 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 97, "rankChange": 24, "score": 52.56 }
  },
  "TH": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 134, "rankChange": 0, "score": 34 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 95, "rankChange": 4, "score": 0.31 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 54, "rankChange": 8, "score": 6.59 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 116, "rankChange": -9, "score": 33 },
    "perception": { "year": 2026, "rating": "Neutral", "rank": 35, "score": 0 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 92, "rankChange": -7, "score": 53.97 }
  },
  "TJ": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 185, "rankChange": 0, "score": 5 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 168, "rankChange": 2, "score": 0.04 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 155, "rankChange": 2, "score": 1.94 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 166, "rankChange": -2, "score": 19 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 155, "rankChange": -2, "score": 32.22 }
  },
  "TL": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 79, "rankChange": 0, "score": 72 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 54, "rankChange": -1, "score": 0.55 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 46, "rankChange": -1, "score": 6.97 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 73, "rankChange": 0, "score": 44 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 30, "rankChange": 9, "score": 75.29 }
  },
  "TM": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 192, "rankChange": 0, "score": 1 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 173, "rankChange": 0, "score": 0.03 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 160, "rankChange": -1, "score": 1.54 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 167, "rankChange": -2, "score": 17 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 173, "rankChange": 1, "score": 23.06 }
  },
  "TN": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 123, "rankChange": 0, "score": 44 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 104, "rankChange": -1, "score": 0.27 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 94, "rankChange": -3, "score": 4.65 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 91, "rankChange": 1, "score": 39 },
    "perception": { "year": 2026, "rating": "Neutral", "rank": 28, "score": 4 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 137, "rankChange": -8, "score": 40.43 }
  },
  "TO": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 67, "rankChange": 0, "score": 80 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 51, "rankChange": -5, "score": 66.62 }
  },
  "TR": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 137, "rankChange": 0, "score": 33 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 139, "rankChange": 3, "score": 0.11 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 102, "rankChange": -1, "score": 4.26 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 124, "rankChange": -17, "score": 31 },
    "perception": { "year": 2026, "rating": "Negative", "rank": 70, "score": -14 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 163, "rankChange": -4, "score": 27.94 }
  },
  "TT": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 59, "rankChange": 0, "score": 82 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 34, "rankChange": 1, "score": 0.67 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 43, "rankChange": 1, "score": 7.09 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 81, "rankChange": 1, "score": 41 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 32, "rankChange": -13, "score": 74.7 }
  },
  "TV": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 24, "rankChange": 0, "score": 93 }
  },
  "TZ": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 133, "rankChange": 0, "score": 35 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 97, "rankChange": -8, "score": 0.3 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 87, "rankChange": -2, "score": 5.13 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 84, "rankChange": -2, "score": 40 },
    "perception": { "year": 2026, "rating": "Very Negative", "rank": 78, "score": -17 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 117, "rankChange": -22, "score": 46.22 }
  },
  "UA": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 114, "rankChange": 0, "score": 51 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 108, "rankChange": 1, "score": 0.24 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 93, "rankChange": -3, "score": 4.79 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 104, "rankChange": 1, "score": 36 },
    "perception": { "year": 2026, "rating": "Very Negative", "rank": 92, "score": -23 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 55, "rankChange": 7, "score": 66.1 }
  },
  "UG": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 134, "rankChange": 0, "score": 34 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 119, "rankChange": 0, "score": 0.17 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 100, "rankChange": -4, "score": 4.31 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 148, "rankChange": -8, "score": 25 },
    "perception": { "year": 2026, "rating": "Very Negative", "rank": 76, "score": -16 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 131, "rankChange": 12, "score": 41.98 }
  },
  "US": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 53, "rankChange": 0, "score": 84 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 51, "rankChange": -28, "score": 0.57 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 34, "rankChange": -7, "score": 7.65 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 29, "rankChange": -1, "score": 64 },
    "perception": { "year": 2026, "rating": "Neutral", "rank": 36, "score": -1 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 64, "rankChange": -7, "score": 62.61 }
  },
  "UY": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 11, "rankChange": 0, "score": 96 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 13, "rankChange": 4, "score": 0.79 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 12, "rankChange": 2, "score": 8.92 },
    "cpi": { "year": 2025, "rating": "70–79", "rank": 17, "rankChange": -4, "score": 73 },
    "perception": { "year": 2026, "rating": "Positive", "rank": 23, "score": 7 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 48, "rankChange": 11, "score": 68.72 }
  },
  "UZ": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 171, "rankChange": 0, "score": 12 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 154, "rankChange": 1, "score": 0.08 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 146, "rankChange": -2, "score": 2.1 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 124, "rankChange": -3, "score": 31 },
    "perception": { "year": 2026, "rating": "Neutral", "rank": 47, "score": -4 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 147, "rankChange": 1, "score": 34.95 }
  },
  "VC": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 36, "rankChange": 0, "score": 90 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 31, "rankChange": 1, "score": 63 }
  },
  "VE": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 169, "rankChange": 0, "score": 13 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 170, "rankChange": -1, "score": 0.04 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 144, "rankChange": -4, "score": 2.13 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 180, "rankChange": -2, "score": 10 },
    "perception": { "year": 2026, "rating": "Very Negative", "rank": 90, "score": -22 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 159, "rankChange": 1, "score": 30.48 }
  },
  "VN": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 158, "rankChange": 0, "score": 20 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 144, "rankChange": -3, "score": 0.1 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 133, "rankChange": -2, "score": 2.62 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 81, "rankChange": 7, "score": 41 },
    "perception": { "year": 2026, "rating": "Positive", "rank": 14, "score": 10 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 174, "rankChange": -1, "score": 21.15 }
  },
  "VU": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 59, "rankChange": 0, "score": 82 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 42, "rankChange": -10, "score": 0.62 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 63, "rankChange": -6, "score": 47 }
  },
  "WS": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 53, "rankChange": 0, "score": 84 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 59, "rankChange": -15, "score": 64.53 }
  },
  "YE": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 175, "rankChange": 0, "score": 10 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 169, "rankChange": -1, "score": 0.04 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 153, "rankChange": 0, "score": 1.95 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 177, "rankChange": -4, "score": 13 },
    "perception": { "year": 2026, "rating": "Very Negative", "rank": 95, "score": -25 },
    "rsfPress": { "year": 2026, "rating": "Very serious", "rank": 164, "rankChange": -10, "score": 27.89 }
  },
  "ZA": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 65, "rankChange": 0, "score": 81 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 39, "rankChange": -1, "score": 0.63 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 41, "rankChange": 1, "score": 7.16 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 81, "rankChange": 1, "score": 41 },
    "perception": { "year": 2026, "rating": "Negative", "rank": 54, "score": -8 },
    "rsfPress": { "year": 2026, "rating": "Satisfactory", "rank": 21, "rankChange": 6, "score": 77.95 }
  },
  "ZM": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 111, "rankChange": 0, "score": 53 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 84, "rankChange": -4, "score": 0.38 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 78, "rankChange": -2, "score": 5.82 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 99, "rankChange": -7, "score": 37 },
    "perception": { "year": 2026, "rating": "Neutral", "rank": 29, "score": 3 },
    "rsfPress": { "year": 2026, "rating": "Problematic", "rank": 77, "rankChange": 5, "score": 58.58 }
  },
  "ZW": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 146, "rankChange": 0, "score": 26 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 123, "rankChange": -1, "score": 0.15 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 122, "rankChange": -2, "score": 2.98 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 157, "rankChange": 1, "score": 22 },
    "perception": { "year": 2026, "rating": "Very Negative", "rank": 78, "score": -17 },
    "rsfPress": { "year": 2026, "rating": "Difficult", "rank": 124, "rankChange": -18, "score": 44.37 }
  },
};
