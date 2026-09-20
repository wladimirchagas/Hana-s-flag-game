// Authoritative democracy / governance rankings and ratings for Freedom House,
// V-Dem, EIU Economist, and Transparency International’s Corruption Perceptions Index.
// Covers UN member states and permanent observers. Sourced from official publications:
// - Freedom House: Freedom in the World 2024
// - V-Dem Institute: Democracy Report 2026 / Dataset v16
// - Economist Intelligence Unit (EIU): Democracy Index 2025
// - Transparency International: Corruption Perceptions Index 2025 (CPI2025_Results.xlsx)

/**
 * @type {Record<string, {
 *   freedomHouse?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   vDem?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   economist?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   cpi?: { year: number, rating: string, rank: number, rankChange?: number, score?: number }
 * }>}
 */
export const DEMOCRACY_DATA = {
  "AD": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 24, "rankChange": 0, "score": 93 }
  },
  "AE": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 159, "rankChange": 0, "score": 18 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 155, "rankChange": -2, "score": 0.08 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 117, "rankChange": 0, "score": 3.18 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 21, "rankChange": 2, "score": 69 }
  },
  "AF": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 184, "rankChange": 0, "score": 6 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 176, "rankChange": 2, "score": 0.02 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 167, "rankChange": -2, "score": 0.25 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 169, "rankChange": -4, "score": 16 }
  },
  "AG": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 57, "rankChange": 0, "score": 83 }
  },
  "AL": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 85, "rankChange": 0, "score": 68 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 81, "rankChange": -2, "score": 0.38 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 67, "rankChange": -2, "score": 6.2 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 91, "rankChange": -11, "score": 39 }
  },
  "AM": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 110, "rankChange": 0, "score": 54 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 86, "rankChange": -10, "score": 0.37 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 84, "rankChange": -3, "score": 5.35 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 65, "rankChange": -2, "score": 46 }
  },
  "AO": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 144, "rankChange": 0, "score": 28 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 120, "rankChange": 1, "score": 0.16 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 107, "rankChange": -2, "score": 3.94 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 120, "rankChange": 1, "score": 32 }
  },
  "AR": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 51, "rankChange": 0, "score": 85 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 56, "rankChange": -5, "score": 0.52 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 49, "rankChange": 4, "score": 6.89 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 104, "rankChange": -5, "score": 36 }
  },
  "AT": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 24, "rankChange": 0, "score": 93 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 19, "rankChange": 0, "score": 0.76 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 17, "rankChange": 1, "score": 8.42 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 21, "rankChange": 4, "score": 69 }
  },
  "AU": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 18, "rankChange": 0, "score": 95 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 12, "rankChange": 0, "score": 0.79 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 13, "rankChange": -2, "score": 8.85 },
    "cpi": { "year": 2025, "rating": "70–79", "rank": 12, "rankChange": -2, "score": 76 }
  },
  "AZ": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 181, "rankChange": 0, "score": 7 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 164, "rankChange": 0, "score": 0.05 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 127, "rankChange": -3, "score": 2.8 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 130, "rankChange": 24, "score": 30 }
  },
  "BA": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 113, "rankChange": 0, "score": 52 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 91, "rankChange": 0, "score": 0.34 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 85, "rankChange": 1, "score": 5.23 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 109, "rankChange": 5, "score": 34 }
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
    "cpi": { "year": 2025, "rating": "20–29", "rank": 150, "rankChange": 1, "score": 24 }
  },
  "BE": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 11, "rankChange": 0, "score": 96 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 11, "rankChange": -2, "score": 0.79 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 31, "rankChange": 2, "score": 7.77 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 21, "rankChange": 1, "score": 69 }
  },
  "BF": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 148, "rankChange": 0, "score": 25 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 141, "rankChange": -10, "score": 0.1 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 137, "rankChange": -2, "score": 2.55 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 84, "rankChange": -2, "score": 40 }
  },
  "BG": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 72, "rankChange": 0, "score": 77 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 67, "rankChange": -12, "score": 0.5 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 61, "rankChange": -1, "score": 6.34 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 84, "rankChange": -8, "score": 40 }
  },
  "BH": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 171, "rankChange": 0, "score": 12 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 157, "rankChange": 0, "score": 0.06 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 138, "rankChange": -2, "score": 2.45 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 56, "rankChange": -3, "score": 50 }
  },
  "BI": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 165, "rankChange": 0, "score": 15 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 159, "rankChange": -1, "score": 0.06 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 144, "rankChange": -2, "score": 2.13 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 167, "rankChange": -2, "score": 17 }
  },
  "BJ": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 100, "rankChange": 0, "score": 60 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 93, "rankChange": 2, "score": 0.32 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 102, "rankChange": -4, "score": 4.26 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 70, "rankChange": -1, "score": 45 }
  },
  "BN": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 145, "rankChange": 0, "score": 27 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 31, "rankChange": 0, "score": 63 }
  },
  "BO": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 91, "rankChange": 0, "score": 65 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 89, "rankChange": 9, "score": 0.35 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 83, "rankChange": 18, "score": 5.38 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 136, "rankChange": -3, "score": 28 }
  },
  "BR": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 79, "rankChange": 0, "score": 72 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 29, "rankChange": 0, "score": 0.7 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 50, "rankChange": 6, "score": 6.76 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 107, "rankChange": 0, "score": 35 }
  },
  "BS": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 36, "rankChange": 0, "score": 90 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 29, "rankChange": -1, "score": 64 }
  },
  "BT": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 85, "rankChange": 0, "score": 68 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 72, "rankChange": -1, "score": 0.46 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 79, "rankChange": -1, "score": 5.65 },
    "cpi": { "year": 2025, "rating": "70–79", "rank": 18, "rankChange": 0, "score": 71 }
  },
  "BW": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 73, "rankChange": 0, "score": 75 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 59, "rankChange": 10, "score": 0.52 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 36, "rankChange": -2, "score": 7.63 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 41, "rankChange": 2, "score": 58 }
  },
  "BY": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 181, "rankChange": 0, "score": 7 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 172, "rankChange": 0, "score": 0.04 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 149, "rankChange": 1, "score": 1.99 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 124, "rankChange": -10, "score": 31 }
  },
  "BZ": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 48, "rankChange": 0, "score": 88 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 104, "rankChange": 0, "score": 36 }
  },
  "CA": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 5, "rankChange": 0, "score": 97 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 23, "rankChange": 2, "score": 0.74 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 9, "rankChange": 4, "score": 9.08 },
    "cpi": { "year": 2025, "rating": "70–79", "rank": 16, "rankChange": -1, "score": 75 }
  },
  "CD": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 159, "rankChange": 0, "score": 18 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 134, "rankChange": -1, "score": 0.12 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 156, "rankChange": -2, "score": 1.92 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 163, "rankChange": 0, "score": 20 }
  },
  "CF": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 185, "rankChange": 0, "score": 5 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 143, "rankChange": 3, "score": 0.1 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 164, "rankChange": -2, "score": 1.18 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 150, "rankChange": -1, "score": 24 }
  },
  "CG": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 163, "rankChange": 0, "score": 17 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 135, "rankChange": 2, "score": 0.12 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 128, "rankChange": -2, "score": 2.79 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 153, "rankChange": -2, "score": 23 }
  },
  "CH": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 11, "rankChange": 0, "score": 96 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 4, "rankChange": 1, "score": 0.84 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 8, "rankChange": -3, "score": 9.32 },
    "cpi": { "year": 2025, "rating": "80–89", "rank": 6, "rankChange": -1, "score": 80 }
  },
  "CI": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 117, "rankChange": 0, "score": 49 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 109, "rankChange": -3, "score": 0.23 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 104, "rankChange": -1, "score": 4.24 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 76, "rankChange": -7, "score": 43 }
  },
  "CL": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 18, "rankChange": 0, "score": 95 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 16, "rankChange": -3, "score": 0.78 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 27, "rankChange": 1, "score": 7.97 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 31, "rankChange": 1, "score": 63 }
  },
  "CM": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 165, "rankChange": 0, "score": 15 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 138, "rankChange": -6, "score": 0.11 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 136, "rankChange": -2, "score": 2.56 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 142, "rankChange": -2, "score": 26 }
  },
  "CN": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 178, "rankChange": 0, "score": 9 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 171, "rankChange": 0, "score": 0.04 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 142, "rankChange": 1, "score": 2.24 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 76, "rankChange": 0, "score": 43 }
  },
  "CO": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 81, "rankChange": 0, "score": 70 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 53, "rankChange": -1, "score": 0.56 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 73, "rankChange": -14, "score": 6.04 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 99, "rankChange": -7, "score": 37 }
  },
  "CR": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 33, "rankChange": 0, "score": 91 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 7, "rankChange": 3, "score": 0.81 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 19, "rankChange": -2, "score": 8.29 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 46, "rankChange": -4, "score": 56 }
  },
  "CU": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 175, "rankChange": 0, "score": 10 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 161, "rankChange": -1, "score": 0.06 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 135, "rankChange": -2, "score": 2.58 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 84, "rankChange": -2, "score": 40 }
  },
  "CV": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 28, "rankChange": 0, "score": 92 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 40, "rankChange": -1, "score": 0.63 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 37, "rankChange": -1, "score": 7.58 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 35, "rankChange": 0, "score": 62 }
  },
  "CY": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 33, "rankChange": 0, "score": 91 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 35, "rankChange": 1, "score": 0.66 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 40, "rankChange": -1, "score": 7.45 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 49, "rankChange": -3, "score": 55 }
  },
  "CZ": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 18, "rankChange": 0, "score": 95 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 10, "rankChange": -3, "score": 0.79 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 23, "rankChange": -1, "score": 8.15 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 39, "rankChange": 7, "score": 59 }
  },
  "DE": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 18, "rankChange": 0, "score": 95 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 15, "rankChange": 1, "score": 0.78 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 16, "rankChange": -4, "score": 8.73 },
    "cpi": { "year": 2025, "rating": "70–79", "rank": 10, "rankChange": 5, "score": 77 }
  },
  "DJ": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 150, "rankChange": 0, "score": 24 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 132, "rankChange": 7, "score": 0.12 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 131, "rankChange": -1, "score": 2.7 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 124, "rankChange": 3, "score": 31 }
  },
  "DK": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 5, "rankChange": 0, "score": 97 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 1, "rankChange": 0, "score": 0.88 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 3, "rankChange": 4, "score": 9.42 },
    "cpi": { "year": 2025, "rating": "80–89", "rank": 1, "rankChange": 0, "score": 89 }
  },
  "DM": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 28, "rankChange": 0, "score": 92 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 37, "rankChange": -1, "score": 60 }
  },
  "DO": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 85, "rankChange": 0, "score": 68 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 65, "rankChange": 0, "score": 0.51 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 51, "rankChange": 0, "score": 6.75 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 99, "rankChange": 5, "score": 37 }
  },
  "DZ": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 139, "rankChange": 0, "score": 31 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 131, "rankChange": 4, "score": 0.13 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 110, "rankChange": -2, "score": 3.55 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 109, "rankChange": -2, "score": 34 }
  },
  "EC": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 91, "rankChange": 0, "score": 65 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 79, "rankChange": -6, "score": 0.39 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 86, "rankChange": -2, "score": 5.2 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 116, "rankChange": 5, "score": 33 }
  },
  "EE": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 11, "rankChange": 0, "score": 96 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 5, "rankChange": -3, "score": 0.84 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 24, "rankChange": -4, "score": 8.07 },
    "cpi": { "year": 2025, "rating": "70–79", "rank": 12, "rankChange": 1, "score": 76 }
  },
  "EG": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 159, "rankChange": 0, "score": 18 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 136, "rankChange": -2, "score": 0.12 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 128, "rankChange": -2, "score": 2.79 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 130, "rankChange": 0, "score": 30 }
  },
  "ER": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 189, "rankChange": 0, "score": 3 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 179, "rankChange": 0, "score": 0.01 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 150, "rankChange": 1, "score": 1.97 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 177, "rankChange": -4, "score": 13 }
  },
  "ES": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 36, "rankChange": 0, "score": 90 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 21, "rankChange": 5, "score": 0.74 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 22, "rankChange": -2, "score": 8.2 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 49, "rankChange": -3, "score": 55 }
  },
  "ET": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 159, "rankChange": 0, "score": 18 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 145, "rankChange": 4, "score": 0.1 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 119, "rankChange": -5, "score": 3.13 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 96, "rankChange": 3, "score": 38 }
  },
  "FI": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 1, "rankChange": 0, "score": 100 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 8, "rankChange": 6, "score": 0.81 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 5, "rankChange": 1, "score": 9.37 },
    "cpi": { "year": 2025, "rating": "80–89", "rank": 2, "rankChange": 0, "score": 88 }
  },
  "FJ": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 82, "rankChange": 0, "score": 69 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 78, "rankChange": -1, "score": 0.4 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 82, "rankChange": -2, "score": 5.39 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 49, "rankChange": 1, "score": 55 }
  },
  "FM": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 28, "rankChange": 0, "score": 92 }
  },
  "FR": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 40, "rankChange": 0, "score": 89 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 9, "rankChange": 2, "score": 0.8 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 26, "rankChange": -1, "score": 8.05 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 27, "rankChange": -2, "score": 66 }
  },
  "GA": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 156, "rankChange": 0, "score": 21 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 114, "rankChange": 9, "score": 0.18 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 111, "rankChange": 30, "score": 3.49 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 135, "rankChange": 0, "score": 29 }
  },
  "GB": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 28, "rankChange": 0, "score": 92 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 30, "rankChange": -6, "score": 0.69 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 18, "rankChange": -2, "score": 8.34 },
    "cpi": { "year": 2025, "rating": "70–79", "rank": 20, "rankChange": 0, "score": 70 }
  },
  "GD": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 40, "rankChange": 0, "score": 89 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 46, "rankChange": 0, "score": 56 }
  },
  "GE": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 108, "rankChange": 0, "score": 55 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 101, "rankChange": -8, "score": 0.28 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 99, "rankChange": -7, "score": 4.36 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 56, "rankChange": -3, "score": 50 }
  },
  "GH": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 67, "rankChange": 0, "score": 80 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 45, "rankChange": 5, "score": 0.61 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 65, "rankChange": -1, "score": 6.24 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 76, "rankChange": 4, "score": 43 }
  },
  "GM": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 116, "rankChange": 0, "score": 50 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 58, "rankChange": 1, "score": 0.52 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 97, "rankChange": 0, "score": 4.47 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 99, "rankChange": -3, "score": 37 }
  },
  "GN": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 142, "rankChange": 0, "score": 30 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 150, "rankChange": 4, "score": 0.1 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 143, "rankChange": 4, "score": 2.15 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 142, "rankChange": -9, "score": 26 }
  },
  "GQ": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 185, "rankChange": 0, "score": 5 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 166, "rankChange": -1, "score": 0.05 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 156, "rankChange": -2, "score": 1.92 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 172, "rankChange": 1, "score": 15 }
  },
  "GR": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 51, "rankChange": 0, "score": 85 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 52, "rankChange": -3, "score": 0.57 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 24, "rankChange": 0, "score": 8.07 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 56, "rankChange": 3, "score": 50 }
  },
  "GT": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 118, "rankChange": 0, "score": 48 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 57, "rankChange": 9, "score": 0.52 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 94, "rankChange": 1, "score": 4.65 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 142, "rankChange": 4, "score": 26 }
  },
  "GW": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 127, "rankChange": 0, "score": 41 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 149, "rankChange": -23, "score": 0.1 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 162, "rankChange": -14, "score": 1.37 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 161, "rankChange": -3, "score": 21 }
  },
  "GY": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 76, "rankChange": 0, "score": 74 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 92, "rankChange": 5, "score": 0.33 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 71, "rankChange": -3, "score": 6.09 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 84, "rankChange": 8, "score": 40 }
  },
  "HN": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 118, "rankChange": 0, "score": 48 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 82, "rankChange": 1, "score": 0.38 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 92, "rankChange": -4, "score": 4.87 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 157, "rankChange": -3, "score": 22 }
  },
  "HR": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 59, "rankChange": 0, "score": 82 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 46, "rankChange": -1, "score": 0.59 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 57, "rankChange": -2, "score": 6.5 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 63, "rankChange": 0, "score": 47 }
  },
  "HT": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 150, "rankChange": 0, "score": 24 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 146, "rankChange": -2, "score": 0.1 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 125, "rankChange": 4, "score": 2.81 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 169, "rankChange": -1, "score": 16 }
  },
  "HU": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 91, "rankChange": 0, "score": 65 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 94, "rankChange": 0, "score": 0.32 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 55, "rankChange": -2, "score": 6.58 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 84, "rankChange": -2, "score": 40 }
  },
  "ID": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 106, "rankChange": 0, "score": 56 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 99, "rankChange": -7, "score": 0.3 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 60, "rankChange": -2, "score": 6.37 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 109, "rankChange": -10, "score": 34 }
  },
  "IE": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 5, "rankChange": 0, "score": 97 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 6, "rankChange": 0, "score": 0.82 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 7, "rankChange": 1, "score": 9.33 },
    "cpi": { "year": 2025, "rating": "70–79", "rank": 12, "rankChange": -2, "score": 76 }
  },
  "IL": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 77, "rankChange": 0, "score": 73 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 48, "rankChange": -2, "score": 0.59 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 30, "rankChange": 0, "score": 7.8 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 35, "rankChange": -5, "score": 62 }
  },
  "IN": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 96, "rankChange": 0, "score": 63 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 105, "rankChange": -4, "score": 0.26 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 47, "rankChange": -7, "score": 6.96 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 91, "rankChange": 5, "score": 39 }
  },
  "IQ": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 139, "rankChange": 0, "score": 31 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 111, "rankChange": 1, "score": 0.22 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 119, "rankChange": 5, "score": 3.13 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 136, "rankChange": 4, "score": 28 }
  },
  "IR": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 174, "rankChange": 0, "score": 11 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 142, "rankChange": 10, "score": 0.1 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 152, "rankChange": 0, "score": 1.96 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 153, "rankChange": -2, "score": 23 }
  },
  "IS": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 18, "rankChange": 0, "score": 95 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 25, "rankChange": -4, "score": 0.72 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 4, "rankChange": 0, "score": 9.38 },
    "cpi": { "year": 2025, "rating": "70–79", "rank": 10, "rankChange": 0, "score": 77 }
  },
  "IT": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 40, "rankChange": 0, "score": 89 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 37, "rankChange": -6, "score": 0.64 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 37, "rankChange": -1, "score": 7.58 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 52, "rankChange": 0, "score": 53 }
  },
  "JM": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 67, "rankChange": 0, "score": 80 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 33, "rankChange": 1, "score": 0.68 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 52, "rankChange": -4, "score": 6.74 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 73, "rankChange": 0, "score": 44 }
  },
  "JO": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 134, "rankChange": 0, "score": 34 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 102, "rankChange": 2, "score": 0.27 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 115, "rankChange": -2, "score": 3.28 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 56, "rankChange": 3, "score": 50 }
  },
  "JP": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 11, "rankChange": 0, "score": 96 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 24, "rankChange": 3, "score": 0.73 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 13, "rankChange": 2, "score": 8.85 },
    "cpi": { "year": 2025, "rating": "70–79", "rank": 18, "rankChange": 2, "score": 71 }
  },
  "KE": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 114, "rankChange": 0, "score": 51 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 74, "rankChange": 0, "score": 0.45 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 89, "rankChange": -2, "score": 5.05 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 130, "rankChange": -9, "score": 30 }
  },
  "KG": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 146, "rankChange": 0, "score": 26 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 115, "rankChange": 1, "score": 0.18 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 116, "rankChange": -7, "score": 3.27 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 142, "rankChange": 4, "score": 26 }
  },
  "KH": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 154, "rankChange": 0, "score": 23 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 165, "rankChange": 1, "score": 0.05 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 131, "rankChange": -10, "score": 2.7 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 163, "rankChange": -5, "score": 20 }
  },
  "KI": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 40, "rankChange": 0, "score": 89 }
  },
  "KM": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 126, "rankChange": 0, "score": 42 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 126, "rankChange": 10, "score": 0.13 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 125, "rankChange": -3, "score": 2.81 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 163, "rankChange": -5, "score": 20 }
  },
  "KN": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 40, "rankChange": 0, "score": 89 }
  },
  "KP": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 189, "rankChange": 0, "score": 3 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 178, "rankChange": -1, "score": 0.01 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 165, "rankChange": -2, "score": 1.08 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 172, "rankChange": -2, "score": 15 }
  },
  "KR": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 65, "rankChange": 0, "score": 81 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 22, "rankChange": 20, "score": 0.74 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 32, "rankChange": -1, "score": 7.75 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 31, "rankChange": -1, "score": 63 }
  },
  "KW": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 139, "rankChange": 0, "score": 31 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 129, "rankChange": -11, "score": 0.13 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 130, "rankChange": -2, "score": 2.78 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 65, "rankChange": 0, "score": 46 }
  },
  "KZ": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 154, "rankChange": 0, "score": 23 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 127, "rankChange": 2, "score": 0.13 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 123, "rankChange": -7, "score": 2.91 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 96, "rankChange": -8, "score": 38 }
  },
  "LA": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 169, "rankChange": 0, "score": 13 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 140, "rankChange": 0, "score": 0.11 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 159, "rankChange": -1, "score": 1.71 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 109, "rankChange": 5, "score": 34 }
  },
  "LB": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 130, "rankChange": 0, "score": 39 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 103, "rankChange": 7, "score": 0.27 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 109, "rankChange": -2, "score": 3.81 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 153, "rankChange": 1, "score": 23 }
  },
  "LC": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 33, "rankChange": 0, "score": 91 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 39, "rankChange": -1, "score": 59 }
  },
  "LI": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 36, "rankChange": 0, "score": 90 }
  },
  "LK": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 104, "rankChange": 0, "score": 58 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 44, "rankChange": 20, "score": 0.61 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 56, "rankChange": 10, "score": 6.57 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 107, "rankChange": 14, "score": 35 }
  },
  "LR": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 95, "rankChange": 0, "score": 64 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 76, "rankChange": 2, "score": 0.42 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 80, "rankChange": -1, "score": 5.57 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 136, "rankChange": -1, "score": 28 }
  },
  "LS": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 90, "rankChange": 0, "score": 66 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 62, "rankChange": -2, "score": 0.51 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 66, "rankChange": 3, "score": 6.23 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 99, "rankChange": 0, "score": 37 }
  },
  "LT": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 40, "rankChange": 0, "score": 89 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 27, "rankChange": 1, "score": 0.71 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 39, "rankChange": -4, "score": 7.55 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 28, "rankChange": 4, "score": 65 }
  },
  "LU": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 5, "rankChange": 0, "score": 97 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 17, "rankChange": -2, "score": 0.78 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 9, "rankChange": 1, "score": 9.08 },
    "cpi": { "year": 2025, "rating": "70–79", "rank": 8, "rankChange": -3, "score": 78 }
  },
  "LV": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 40, "rankChange": 0, "score": 89 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 20, "rankChange": 0, "score": 0.75 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 33, "rankChange": -1, "score": 7.73 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 37, "rankChange": 1, "score": 60 }
  },
  "LY": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 175, "rankChange": 0, "score": 10 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 147, "rankChange": -4, "score": 0.1 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 141, "rankChange": -3, "score": 2.31 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 177, "rankChange": -4, "score": 13 }
  },
  "MA": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 132, "rankChange": 0, "score": 37 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 107, "rankChange": -2, "score": 0.25 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 91, "rankChange": -2, "score": 4.97 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 91, "rankChange": 8, "score": 39 }
  },
  "MC": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 59, "rankChange": 0, "score": 82 }
  },
  "MD": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 100, "rankChange": 0, "score": 60 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 73, "rankChange": -12, "score": 0.45 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 77, "rankChange": -7, "score": 5.86 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 80, "rankChange": -4, "score": 42 }
  },
  "ME": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 82, "rankChange": 0, "score": 69 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 66, "rankChange": -3, "score": 0.5 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 53, "rankChange": -4, "score": 6.73 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 65, "rankChange": 0, "score": 46 }
  },
  "MG": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 108, "rankChange": 0, "score": 55 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 113, "rankChange": 0, "score": 0.19 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 88, "rankChange": -6, "score": 5.06 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 148, "rankChange": -8, "score": 25 }
  },
  "MH": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 24, "rankChange": 0, "score": 93 }
  },
  "MK": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 88, "rankChange": 0, "score": 67 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 85, "rankChange": 1, "score": 0.37 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 64, "rankChange": -3, "score": 6.28 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 84, "rankChange": 4, "score": 40 }
  },
  "ML": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 150, "rankChange": 0, "score": 24 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 122, "rankChange": 3, "score": 0.15 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 140, "rankChange": -3, "score": 2.4 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 136, "rankChange": -1, "score": 28 }
  },
  "MM": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 181, "rankChange": 0, "score": 7 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 177, "rankChange": -1, "score": 0.01 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 166, "rankChange": -2, "score": 0.96 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 169, "rankChange": -1, "score": 16 }
  },
  "MN": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 53, "rankChange": 0, "score": 84 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 75, "rankChange": 7, "score": 0.42 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 57, "rankChange": -5, "score": 6.5 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 124, "rankChange": -10, "score": 31 }
  },
  "MR": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 130, "rankChange": 0, "score": 39 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 130, "rankChange": -2, "score": 0.13 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 108, "rankChange": -2, "score": 3.84 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 130, "rankChange": 0, "score": 30 }
  },
  "MT": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 49, "rankChange": 0, "score": 87 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 43, "rankChange": 0, "score": 0.62 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 28, "rankChange": -2, "score": 7.93 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 60, "rankChange": 5, "score": 49 }
  },
  "MU": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 50, "rankChange": 0, "score": 86 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 38, "rankChange": 47, "score": 0.64 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 21, "rankChange": -2, "score": 8.23 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 61, "rankChange": -5, "score": 48 }
  },
  "MV": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 125, "rankChange": 0, "score": 43 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 77, "rankChange": -2, "score": 0.42 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 91, "rankChange": 5, "score": 39 }
  },
  "MW": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 91, "rankChange": 0, "score": 65 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 70, "rankChange": -3, "score": 0.46 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 70, "rankChange": 5, "score": 6.1 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 109, "rankChange": -2, "score": 34 }
  },
  "MX": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 102, "rankChange": 0, "score": 59 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 110, "rankChange": -2, "score": 0.22 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 81, "rankChange": 2, "score": 5.4 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 141, "rankChange": -1, "score": 27 }
  },
  "MY": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 111, "rankChange": 0, "score": 53 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 88, "rankChange": 0, "score": 0.35 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 42, "rankChange": 1, "score": 7.11 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 54, "rankChange": 3, "score": 52 }
  },
  "MZ": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 127, "rankChange": 0, "score": 41 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 118, "rankChange": -3, "score": 0.17 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 113, "rankChange": -2, "score": 3.38 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 161, "rankChange": -15, "score": 21 }
  },
  "NA": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 77, "rankChange": 0, "score": 73 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 60, "rankChange": -2, "score": 0.52 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 59, "rankChange": -2, "score": 6.48 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 65, "rankChange": -6, "score": 46 }
  },
  "NE": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 142, "rankChange": 0, "score": 30 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 116, "rankChange": 1, "score": 0.18 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 153, "rankChange": -14, "score": 1.95 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 124, "rankChange": -17, "score": 31 }
  },
  "NG": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 123, "rankChange": 0, "score": 44 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 96, "rankChange": 0, "score": 0.31 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 105, "rankChange": -1, "score": 4.1 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 142, "rankChange": -2, "score": 26 }
  },
  "NI": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 168, "rankChange": 0, "score": 14 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 175, "rankChange": 0, "score": 0.02 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 150, "rankChange": -5, "score": 1.97 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 175, "rankChange": -3, "score": 14 }
  },
  "NL": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 5, "rankChange": 0, "score": 97 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 18, "rankChange": 0, "score": 0.77 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 11, "rankChange": -2, "score": 8.93 },
    "cpi": { "year": 2025, "rating": "70–79", "rank": 8, "rankChange": 1, "score": 78 }
  },
  "NO": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 2, "rankChange": 0, "score": 99 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 3, "rankChange": 0, "score": 0.85 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 1, "rankChange": 0, "score": 9.81 },
    "cpi": { "year": 2025, "rating": "80–89", "rank": 4, "rankChange": 1, "score": 81 }
  },
  "NP": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 98, "rankChange": 0, "score": 62 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 64, "rankChange": -8, "score": 0.51 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 106, "rankChange": -12, "score": 4.01 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 109, "rankChange": -2, "score": 34 }
  },
  "NR": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 73, "rankChange": 0, "score": 75 }
  },
  "NZ": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 2, "rankChange": 0, "score": 99 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 14, "rankChange": -6, "score": 0.79 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 2, "rankChange": 0, "score": 9.62 },
    "cpi": { "year": 2025, "rating": "80–89", "rank": 4, "rankChange": 0, "score": 81 }
  },
  "OM": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 150, "rankChange": 0, "score": 24 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 125, "rankChange": 2, "score": 0.14 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 121, "rankChange": -3, "score": 3.05 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 54, "rankChange": -4, "score": 52 }
  },
  "PA": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 57, "rankChange": 0, "score": 83 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 49, "rankChange": -1, "score": 0.57 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 44, "rankChange": 2, "score": 7.04 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 116, "rankChange": -2, "score": 33 }
  },
  "PE": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 88, "rankChange": 0, "score": 67 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 63, "rankChange": -1, "score": 0.51 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 76, "rankChange": 1, "score": 5.88 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 130, "rankChange": -3, "score": 30 }
  },
  "PG": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 99, "rankChange": 0, "score": 61 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 80, "rankChange": 4, "score": 0.38 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 75, "rankChange": -3, "score": 5.9 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 142, "rankChange": -15, "score": 26 }
  },
  "PH": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 104, "rankChange": 0, "score": 58 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 100, "rankChange": 0, "score": 0.29 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 62, "rankChange": -12, "score": 6.31 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 120, "rankChange": -6, "score": 32 }
  },
  "PK": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 138, "rankChange": 0, "score": 32 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 117, "rankChange": -3, "score": 0.18 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 139, "rankChange": -17, "score": 2.44 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 136, "rankChange": -1, "score": 28 }
  },
  "PL": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 59, "rankChange": 0, "score": 82 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 36, "rankChange": 8, "score": 0.65 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 34, "rankChange": 4, "score": 7.65 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 52, "rankChange": 1, "score": 53 }
  },
  "PS": {
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 137, "rankChange": 1, "score": 0.11 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 112, "rankChange": -2, "score": 3.44 }
  },
  "PT": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 11, "rankChange": 0, "score": 96 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 26, "rankChange": -4, "score": 0.72 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 20, "rankChange": 2, "score": 8.28 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 46, "rankChange": -3, "score": 56 }
  },
  "PW": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 28, "rankChange": 0, "score": 92 }
  },
  "PY": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 96, "rankChange": 0, "score": 63 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 83, "rankChange": -2, "score": 0.38 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 73, "rankChange": 1, "score": 6.04 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 150, "rankChange": -1, "score": 24 }
  },
  "QA": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 148, "rankChange": 0, "score": 25 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 151, "rankChange": -3, "score": 0.09 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 118, "rankChange": -3, "score": 3.17 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 41, "rankChange": -3, "score": 58 }
  },
  "RO": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 59, "rankChange": 0, "score": 82 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 69, "rankChange": 3, "score": 0.46 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 69, "rankChange": 2, "score": 6.11 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 70, "rankChange": -5, "score": 45 }
  },
  "RS": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 106, "rankChange": 0, "score": 56 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 112, "rankChange": -1, "score": 0.21 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 63, "rankChange": 0, "score": 6.3 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 116, "rankChange": -11, "score": 33 }
  },
  "RU": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 171, "rankChange": 0, "score": 12 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 162, "rankChange": -3, "score": 0.06 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 148, "rankChange": 0, "score": 2.03 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 157, "rankChange": -3, "score": 22 }
  },
  "RW": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 156, "rankChange": 0, "score": 21 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 152, "rankChange": -2, "score": 0.09 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 114, "rankChange": -2, "score": 3.34 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 41, "rankChange": 2, "score": 58 }
  },
  "SA": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 178, "rankChange": 0, "score": 9 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 167, "rankChange": 0, "score": 0.05 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 147, "rankChange": -1, "score": 2.08 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 45, "rankChange": -7, "score": 57 }
  },
  "SB": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 73, "rankChange": 0, "score": 75 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 55, "rankChange": -1, "score": 0.54 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 73, "rankChange": 3, "score": 44 }
  },
  "SC": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 67, "rankChange": 0, "score": 80 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 31, "rankChange": 6, "score": 0.68 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 24, "rankChange": -6, "score": 68 }
  },
  "SD": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 191, "rankChange": 0, "score": 2 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 174, "rankChange": 0, "score": 0.03 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 161, "rankChange": -1, "score": 1.46 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 175, "rankChange": -5, "score": 14 }
  },
  "SE": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 2, "rankChange": 0, "score": 99 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 2, "rankChange": 2, "score": 0.85 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 6, "rankChange": -3, "score": 9.35 },
    "cpi": { "year": 2025, "rating": "80–89", "rank": 6, "rankChange": 2, "score": 80 }
  },
  "SG": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 118, "rankChange": 0, "score": 48 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 87, "rankChange": 3, "score": 0.36 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 68, "rankChange": -1, "score": 6.18 },
    "cpi": { "year": 2025, "rating": "80–89", "rank": 3, "rankChange": 0, "score": 84 }
  },
  "SI": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 11, "rankChange": 0, "score": 96 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 47, "rankChange": -6, "score": 0.59 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 29, "rankChange": 0, "score": 7.82 },
    "cpi": { "year": 2025, "rating": "50–59", "rank": 41, "rankChange": -5, "score": 58 }
  },
  "SK": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 40, "rankChange": 0, "score": 89 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 50, "rankChange": -3, "score": 0.57 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 48, "rankChange": -7, "score": 6.94 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 61, "rankChange": -2, "score": 48 }
  },
  "SL": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 102, "rankChange": 0, "score": 59 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 90, "rankChange": -3, "score": 0.35 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 98, "rankChange": 2, "score": 4.44 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 109, "rankChange": 5, "score": 34 }
  },
  "SM": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 5, "rankChange": 0, "score": 97 }
  },
  "SN": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 82, "rankChange": 0, "score": 69 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 68, "rankChange": 2, "score": 0.48 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 72, "rankChange": 1, "score": 6.05 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 65, "rankChange": 4, "score": 46 }
  },
  "SO": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 180, "rankChange": 0, "score": 8 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 128, "rankChange": 2, "score": 0.13 },
    "cpi": { "year": 2025, "rating": "0–9", "rank": 181, "rankChange": -2, "score": 9 }
  },
  "SR": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 67, "rankChange": 0, "score": 80 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 41, "rankChange": -1, "score": 0.63 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 45, "rankChange": 2, "score": 7.03 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 96, "rankChange": -8, "score": 38 }
  },
  "SS": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 192, "rankChange": 0, "score": 1 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 156, "rankChange": 0, "score": 0.06 },
    "cpi": { "year": 2025, "rating": "0–9", "rank": 181, "rankChange": -1, "score": 9 }
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
    "cpi": { "year": 2025, "rating": "30–39", "rank": 120, "rankChange": 10, "score": 32 }
  },
  "SY": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 185, "rankChange": 0, "score": 5 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 163, "rankChange": 0, "score": 0.05 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 162, "rankChange": -1, "score": 1.37 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 172, "rankChange": 5, "score": 15 }
  },
  "SZ": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 163, "rankChange": 0, "score": 17 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 148, "rankChange": -3, "score": 0.1 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 134, "rankChange": -2, "score": 2.6 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 153, "rankChange": -18, "score": 23 }
  },
  "TD": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 165, "rankChange": 0, "score": 15 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 158, "rankChange": 4, "score": 0.06 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 158, "rankChange": -2, "score": 1.76 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 157, "rankChange": 1, "score": 22 }
  },
  "TG": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 127, "rankChange": 0, "score": 41 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 121, "rankChange": -1, "score": 0.16 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 124, "rankChange": -5, "score": 2.88 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 120, "rankChange": 1, "score": 32 }
  },
  "TH": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 134, "rankChange": 0, "score": 34 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 95, "rankChange": 4, "score": 0.31 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 54, "rankChange": 8, "score": 6.59 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 116, "rankChange": -9, "score": 33 }
  },
  "TJ": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 185, "rankChange": 0, "score": 5 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 168, "rankChange": 2, "score": 0.04 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 155, "rankChange": 2, "score": 1.94 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 166, "rankChange": -2, "score": 19 }
  },
  "TL": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 79, "rankChange": 0, "score": 72 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 54, "rankChange": -1, "score": 0.55 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 46, "rankChange": -1, "score": 6.97 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 73, "rankChange": 0, "score": 44 }
  },
  "TM": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 192, "rankChange": 0, "score": 1 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 173, "rankChange": 0, "score": 0.03 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 160, "rankChange": -1, "score": 1.54 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 167, "rankChange": -2, "score": 17 }
  },
  "TN": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 123, "rankChange": 0, "score": 44 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 104, "rankChange": -1, "score": 0.27 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 94, "rankChange": -3, "score": 4.65 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 91, "rankChange": 1, "score": 39 }
  },
  "TO": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 67, "rankChange": 0, "score": 80 }
  },
  "TR": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 137, "rankChange": 0, "score": 33 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 139, "rankChange": 3, "score": 0.11 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 102, "rankChange": -1, "score": 4.26 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 124, "rankChange": -17, "score": 31 }
  },
  "TT": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 59, "rankChange": 0, "score": 82 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 34, "rankChange": 1, "score": 0.67 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 43, "rankChange": 1, "score": 7.09 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 81, "rankChange": 1, "score": 41 }
  },
  "TV": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 24, "rankChange": 0, "score": 93 }
  },
  "TZ": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 133, "rankChange": 0, "score": 35 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 97, "rankChange": -8, "score": 0.3 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 87, "rankChange": -2, "score": 5.13 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 84, "rankChange": -2, "score": 40 }
  },
  "UA": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 114, "rankChange": 0, "score": 51 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 108, "rankChange": 1, "score": 0.24 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 93, "rankChange": -3, "score": 4.79 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 104, "rankChange": 1, "score": 36 }
  },
  "UG": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 134, "rankChange": 0, "score": 34 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 119, "rankChange": 0, "score": 0.17 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 100, "rankChange": -4, "score": 4.31 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 148, "rankChange": -8, "score": 25 }
  },
  "US": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 53, "rankChange": 0, "score": 84 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 51, "rankChange": -28, "score": 0.57 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 34, "rankChange": -7, "score": 7.65 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 29, "rankChange": -1, "score": 64 }
  },
  "UY": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 11, "rankChange": 0, "score": 96 },
    "vDem": { "year": 2026, "rating": "Liberal Democracy", "rank": 13, "rankChange": 4, "score": 0.79 },
    "economist": { "year": 2025, "rating": "Full democracy", "rank": 12, "rankChange": 2, "score": 8.92 },
    "cpi": { "year": 2025, "rating": "70–79", "rank": 17, "rankChange": -4, "score": 73 }
  },
  "UZ": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 171, "rankChange": 0, "score": 12 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 154, "rankChange": 1, "score": 0.08 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 146, "rankChange": -2, "score": 2.1 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 124, "rankChange": -3, "score": 31 }
  },
  "VC": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 36, "rankChange": 0, "score": 90 },
    "cpi": { "year": 2025, "rating": "60–69", "rank": 31, "rankChange": 1, "score": 63 }
  },
  "VE": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 169, "rankChange": 0, "score": 13 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 170, "rankChange": -1, "score": 0.04 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 144, "rankChange": -4, "score": 2.13 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 180, "rankChange": -2, "score": 10 }
  },
  "VN": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 158, "rankChange": 0, "score": 20 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 144, "rankChange": -3, "score": 0.1 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 133, "rankChange": -2, "score": 2.62 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 81, "rankChange": 7, "score": 41 }
  },
  "VU": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 59, "rankChange": 0, "score": 82 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 42, "rankChange": -10, "score": 0.62 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 63, "rankChange": -6, "score": 47 }
  },
  "WS": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 53, "rankChange": 0, "score": 84 }
  },
  "YE": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 175, "rankChange": 0, "score": 10 },
    "vDem": { "year": 2026, "rating": "Closed Autocracy", "rank": 169, "rankChange": -1, "score": 0.04 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 153, "rankChange": 0, "score": 1.95 },
    "cpi": { "year": 2025, "rating": "10–19", "rank": 177, "rankChange": -4, "score": 13 }
  },
  "ZA": {
    "freedomHouse": { "year": 2024, "rating": "Free", "rank": 65, "rankChange": 0, "score": 81 },
    "vDem": { "year": 2026, "rating": "Electoral Democracy", "rank": 39, "rankChange": -1, "score": 0.63 },
    "economist": { "year": 2025, "rating": "Flawed democracy", "rank": 41, "rankChange": 1, "score": 7.16 },
    "cpi": { "year": 2025, "rating": "40–49", "rank": 81, "rankChange": 1, "score": 41 }
  },
  "ZM": {
    "freedomHouse": { "year": 2024, "rating": "Partly Free", "rank": 111, "rankChange": 0, "score": 53 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 84, "rankChange": -4, "score": 0.38 },
    "economist": { "year": 2025, "rating": "Hybrid regime", "rank": 78, "rankChange": -2, "score": 5.82 },
    "cpi": { "year": 2025, "rating": "30–39", "rank": 99, "rankChange": -7, "score": 37 }
  },
  "ZW": {
    "freedomHouse": { "year": 2024, "rating": "Not Free", "rank": 146, "rankChange": 0, "score": 26 },
    "vDem": { "year": 2026, "rating": "Electoral Autocracy", "rank": 123, "rankChange": -1, "score": 0.15 },
    "economist": { "year": 2025, "rating": "Authoritarian", "rank": 122, "rankChange": -2, "score": 2.98 },
    "cpi": { "year": 2025, "rating": "20–29", "rank": 157, "rankChange": 1, "score": 22 }
  }
};
