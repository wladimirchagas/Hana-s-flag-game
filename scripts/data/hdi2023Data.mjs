// UNDP Human Development Report 2025 — Human Development Index (HDI) 2023.
// Source: https://hdr.undp.org/sites/default/files/2025_HDR/HDR25_Composite_indices_complete_time_series.csv
// Full-file sha256: 61ed82e5b66c88dfca8ff9fac775c63981ecab6a254862af97acacc41c143117
// Slim extract: scripts/data/hdr25-hdi-2023.csv (ranked country rows only).
// Categories (hdicode) and ranks are taken verbatim from the official CSV.
// rankChange = rank(hdi_2022) − rank(hdi_2023) using UNDP competition ranking
// (tied scores share the minimum rank; next rank skips). Omitted when hdi_2022
// is absent (Central African Republic).
// Excluded (no HDI rank / not a game UN member): PRK, MCO, HKG, aggregates.

/** @type {Record<string, { year: number, rating: string, rank: number, rankChange?: number, score: number }>} */
export const HDI_2023_DATA = {
  "AD": {
    "year": 2023,
    "rating": "Very High",
    "rank": 32,
    "rankChange": 5,
    "score": 0.913
  },
  "AE": {
    "year": 2023,
    "rating": "Very High",
    "rank": 15,
    "rankChange": 8,
    "score": 0.94
  },
  "AF": {
    "year": 2023,
    "rating": "Low",
    "rank": 181,
    "rankChange": -1,
    "score": 0.496
  },
  "AG": {
    "year": 2023,
    "rating": "Very High",
    "rank": 53,
    "rankChange": -2,
    "score": 0.851
  },
  "AL": {
    "year": 2023,
    "rating": "Very High",
    "rank": 71,
    "rankChange": -1,
    "score": 0.81
  },
  "AM": {
    "year": 2023,
    "rating": "Very High",
    "rank": 69,
    "rankChange": 3,
    "score": 0.811
  },
  "AO": {
    "year": 2023,
    "rating": "Medium",
    "rank": 148,
    "rankChange": -2,
    "score": 0.616
  },
  "AR": {
    "year": 2023,
    "rating": "Very High",
    "rank": 47,
    "rankChange": 0,
    "score": 0.865
  },
  "AT": {
    "year": 2023,
    "rating": "Very High",
    "rank": 22,
    "rankChange": -2,
    "score": 0.93
  },
  "AU": {
    "year": 2023,
    "rating": "Very High",
    "rank": 7,
    "rankChange": 1,
    "score": 0.958
  },
  "AZ": {
    "year": 2023,
    "rating": "High",
    "rank": 81,
    "rankChange": 1,
    "score": 0.789
  },
  "BA": {
    "year": 2023,
    "rating": "Very High",
    "rank": 74,
    "rankChange": -1,
    "score": 0.804
  },
  "BB": {
    "year": 2023,
    "rating": "Very High",
    "rank": 69,
    "rankChange": 0,
    "score": 0.811
  },
  "BD": {
    "year": 2023,
    "rating": "Medium",
    "rank": 130,
    "rankChange": 1,
    "score": 0.685
  },
  "BE": {
    "year": 2023,
    "rating": "Very High",
    "rank": 10,
    "rankChange": 3,
    "score": 0.951
  },
  "BF": {
    "year": 2023,
    "rating": "Low",
    "rank": 186,
    "rankChange": 0,
    "score": 0.459
  },
  "BG": {
    "year": 2023,
    "rating": "Very High",
    "rank": 55,
    "rankChange": 2,
    "score": 0.845
  },
  "BH": {
    "year": 2023,
    "rating": "Very High",
    "rank": 38,
    "rankChange": -5,
    "score": 0.899
  },
  "BI": {
    "year": 2023,
    "rating": "Low",
    "rank": 187,
    "rankChange": 0,
    "score": 0.439
  },
  "BJ": {
    "year": 2023,
    "rating": "Low",
    "rank": 173,
    "rankChange": 1,
    "score": 0.515
  },
  "BN": {
    "year": 2023,
    "rating": "Very High",
    "rank": 60,
    "rankChange": 3,
    "score": 0.837
  },
  "BO": {
    "year": 2023,
    "rating": "High",
    "rank": 108,
    "rankChange": 5,
    "score": 0.733
  },
  "BR": {
    "year": 2023,
    "rating": "High",
    "rank": 84,
    "rankChange": 2,
    "score": 0.786
  },
  "BS": {
    "year": 2023,
    "rating": "Very High",
    "rank": 66,
    "rankChange": 0,
    "score": 0.82
  },
  "BT": {
    "year": 2023,
    "rating": "Medium",
    "rank": 125,
    "rankChange": 1,
    "score": 0.698
  },
  "BW": {
    "year": 2023,
    "rating": "High",
    "rank": 111,
    "rankChange": 1,
    "score": 0.731
  },
  "BY": {
    "year": 2023,
    "rating": "Very High",
    "rank": 65,
    "rankChange": -1,
    "score": 0.824
  },
  "BZ": {
    "year": 2023,
    "rating": "High",
    "rank": 115,
    "rankChange": 3,
    "score": 0.721
  },
  "CA": {
    "year": 2023,
    "rating": "Very High",
    "rank": 16,
    "rankChange": 0,
    "score": 0.939
  },
  "CD": {
    "year": 2023,
    "rating": "Low",
    "rank": 171,
    "rankChange": 1,
    "score": 0.522
  },
  "CF": {
    "year": 2023,
    "rating": "Low",
    "rank": 191,
    "score": 0.414
  },
  "CG": {
    "year": 2023,
    "rating": "Medium",
    "rank": 138,
    "rankChange": 0,
    "score": 0.649
  },
  "CH": {
    "year": 2023,
    "rating": "Very High",
    "rank": 2,
    "rankChange": 0,
    "score": 0.97
  },
  "CI": {
    "year": 2023,
    "rating": "Medium",
    "rank": 157,
    "rankChange": 5,
    "score": 0.582
  },
  "CL": {
    "year": 2023,
    "rating": "Very High",
    "rank": 45,
    "rankChange": 0,
    "score": 0.878
  },
  "CM": {
    "year": 2023,
    "rating": "Medium",
    "rank": 155,
    "rankChange": 1,
    "score": 0.588
  },
  "CN": {
    "year": 2023,
    "rating": "High",
    "rank": 78,
    "rankChange": -4,
    "score": 0.797
  },
  "CO": {
    "year": 2023,
    "rating": "High",
    "rank": 83,
    "rankChange": 2,
    "score": 0.788
  },
  "CR": {
    "year": 2023,
    "rating": "Very High",
    "rank": 62,
    "rankChange": 3,
    "score": 0.833
  },
  "CU": {
    "year": 2023,
    "rating": "High",
    "rank": 97,
    "rankChange": -6,
    "score": 0.762
  },
  "CV": {
    "year": 2023,
    "rating": "Medium",
    "rank": 135,
    "rankChange": 0,
    "score": 0.668
  },
  "CY": {
    "year": 2023,
    "rating": "Very High",
    "rank": 32,
    "rankChange": -1,
    "score": 0.913
  },
  "CZ": {
    "year": 2023,
    "rating": "Very High",
    "rank": 29,
    "rankChange": -1,
    "score": 0.915
  },
  "DE": {
    "year": 2023,
    "rating": "Very High",
    "rank": 5,
    "rankChange": 1,
    "score": 0.959
  },
  "DJ": {
    "year": 2023,
    "rating": "Low",
    "rank": 175,
    "rankChange": 1,
    "score": 0.513
  },
  "DK": {
    "year": 2023,
    "rating": "Very High",
    "rank": 4,
    "rankChange": 0,
    "score": 0.962
  },
  "DM": {
    "year": 2023,
    "rating": "High",
    "rank": 98,
    "rankChange": 0,
    "score": 0.761
  },
  "DO": {
    "year": 2023,
    "rating": "High",
    "rank": 89,
    "rankChange": -2,
    "score": 0.776
  },
  "DZ": {
    "year": 2023,
    "rating": "High",
    "rank": 96,
    "rankChange": 0,
    "score": 0.763
  },
  "EC": {
    "year": 2023,
    "rating": "High",
    "rank": 88,
    "rankChange": 1,
    "score": 0.777
  },
  "EE": {
    "year": 2023,
    "rating": "Very High",
    "rank": 36,
    "rankChange": -3,
    "score": 0.905
  },
  "EG": {
    "year": 2023,
    "rating": "High",
    "rank": 100,
    "rankChange": 0,
    "score": 0.754
  },
  "ER": {
    "year": 2023,
    "rating": "Low",
    "rank": 178,
    "rankChange": 0,
    "score": 0.503
  },
  "ES": {
    "year": 2023,
    "rating": "Very High",
    "rank": 28,
    "rankChange": 0,
    "score": 0.918
  },
  "ET": {
    "year": 2023,
    "rating": "Low",
    "rank": 180,
    "rankChange": 1,
    "score": 0.497
  },
  "FI": {
    "year": 2023,
    "rating": "Very High",
    "rank": 12,
    "rankChange": -1,
    "score": 0.948
  },
  "FJ": {
    "year": 2023,
    "rating": "High",
    "rank": 111,
    "rankChange": 3,
    "score": 0.731
  },
  "FM": {
    "year": 2023,
    "rating": "Medium",
    "rank": 149,
    "rankChange": -2,
    "score": 0.615
  },
  "FR": {
    "year": 2023,
    "rating": "Very High",
    "rank": 26,
    "rankChange": 1,
    "score": 0.92
  },
  "GA": {
    "year": 2023,
    "rating": "High",
    "rank": 108,
    "rankChange": 3,
    "score": 0.733
  },
  "GB": {
    "year": 2023,
    "rating": "Very High",
    "rank": 13,
    "rankChange": -2,
    "score": 0.946
  },
  "GD": {
    "year": 2023,
    "rating": "High",
    "rank": 80,
    "rankChange": 0,
    "score": 0.791
  },
  "GE": {
    "year": 2023,
    "rating": "Very High",
    "rank": 57,
    "rankChange": -2,
    "score": 0.844
  },
  "GH": {
    "year": 2023,
    "rating": "Medium",
    "rank": 143,
    "rankChange": 1,
    "score": 0.628
  },
  "GM": {
    "year": 2023,
    "rating": "Low",
    "rank": 170,
    "rankChange": 0,
    "score": 0.524
  },
  "GN": {
    "year": 2023,
    "rating": "Low",
    "rank": 179,
    "rankChange": 0,
    "score": 0.5
  },
  "GQ": {
    "year": 2023,
    "rating": "Medium",
    "rank": 133,
    "rankChange": -1,
    "score": 0.674
  },
  "GR": {
    "year": 2023,
    "rating": "Very High",
    "rank": 34,
    "rankChange": 2,
    "score": 0.908
  },
  "GT": {
    "year": 2023,
    "rating": "Medium",
    "rank": 137,
    "rankChange": -1,
    "score": 0.662
  },
  "GW": {
    "year": 2023,
    "rating": "Low",
    "rank": 174,
    "rankChange": 1,
    "score": 0.514
  },
  "GY": {
    "year": 2023,
    "rating": "High",
    "rank": 89,
    "rankChange": 6,
    "score": 0.776
  },
  "HN": {
    "year": 2023,
    "rating": "Medium",
    "rank": 139,
    "rankChange": 0,
    "score": 0.645
  },
  "HR": {
    "year": 2023,
    "rating": "Very High",
    "rank": 41,
    "rankChange": -1,
    "score": 0.889
  },
  "HT": {
    "year": 2023,
    "rating": "Medium",
    "rank": 166,
    "rankChange": 0,
    "score": 0.554
  },
  "HU": {
    "year": 2023,
    "rating": "Very High",
    "rank": 46,
    "rankChange": 0,
    "score": 0.87
  },
  "ID": {
    "year": 2023,
    "rating": "High",
    "rank": 113,
    "rankChange": 1,
    "score": 0.728
  },
  "IE": {
    "year": 2023,
    "rating": "Very High",
    "rank": 11,
    "rankChange": -1,
    "score": 0.949
  },
  "IL": {
    "year": 2023,
    "rating": "Very High",
    "rank": 27,
    "rankChange": -4,
    "score": 0.919
  },
  "IN": {
    "year": 2023,
    "rating": "Medium",
    "rank": 130,
    "rankChange": 3,
    "score": 0.685
  },
  "IQ": {
    "year": 2023,
    "rating": "Medium",
    "rank": 126,
    "rankChange": 0,
    "score": 0.695
  },
  "IR": {
    "year": 2023,
    "rating": "High",
    "rank": 75,
    "rankChange": 2,
    "score": 0.799
  },
  "IS": {
    "year": 2023,
    "rating": "Very High",
    "rank": 1,
    "rankChange": 2,
    "score": 0.972
  },
  "IT": {
    "year": 2023,
    "rating": "Very High",
    "rank": 29,
    "rankChange": 3,
    "score": 0.915
  },
  "JM": {
    "year": 2023,
    "rating": "High",
    "rank": 117,
    "rankChange": 0,
    "score": 0.72
  },
  "JO": {
    "year": 2023,
    "rating": "High",
    "rank": 100,
    "rankChange": 0,
    "score": 0.754
  },
  "JP": {
    "year": 2023,
    "rating": "Very High",
    "rank": 23,
    "rankChange": 0,
    "score": 0.925
  },
  "KE": {
    "year": 2023,
    "rating": "Medium",
    "rank": 143,
    "rankChange": 0,
    "score": 0.628
  },
  "KG": {
    "year": 2023,
    "rating": "High",
    "rank": 117,
    "rankChange": 1,
    "score": 0.72
  },
  "KH": {
    "year": 2023,
    "rating": "Medium",
    "rank": 151,
    "rankChange": 0,
    "score": 0.606
  },
  "KI": {
    "year": 2023,
    "rating": "Medium",
    "rank": 140,
    "rankChange": 0,
    "score": 0.644
  },
  "KM": {
    "year": 2023,
    "rating": "Medium",
    "rank": 152,
    "rankChange": -1,
    "score": 0.603
  },
  "KN": {
    "year": 2023,
    "rating": "Very High",
    "rank": 58,
    "rankChange": 2,
    "score": 0.84
  },
  "KR": {
    "year": 2023,
    "rating": "Very High",
    "rank": 20,
    "rankChange": -1,
    "score": 0.937
  },
  "KW": {
    "year": 2023,
    "rating": "Very High",
    "rank": 52,
    "rankChange": 1,
    "score": 0.852
  },
  "KZ": {
    "year": 2023,
    "rating": "Very High",
    "rank": 60,
    "rankChange": -1,
    "score": 0.837
  },
  "LA": {
    "year": 2023,
    "rating": "Medium",
    "rank": 147,
    "rankChange": 0,
    "score": 0.617
  },
  "LB": {
    "year": 2023,
    "rating": "High",
    "rank": 102,
    "rankChange": -3,
    "score": 0.752
  },
  "LC": {
    "year": 2023,
    "rating": "High",
    "rank": 103,
    "rankChange": -1,
    "score": 0.748
  },
  "LI": {
    "year": 2023,
    "rating": "Very High",
    "rank": 17,
    "rankChange": -2,
    "score": 0.938
  },
  "LK": {
    "year": 2023,
    "rating": "High",
    "rank": 89,
    "rankChange": -1,
    "score": 0.776
  },
  "LR": {
    "year": 2023,
    "rating": "Low",
    "rank": 177,
    "rankChange": 0,
    "score": 0.51
  },
  "LS": {
    "year": 2023,
    "rating": "Medium",
    "rank": 167,
    "rankChange": 0,
    "score": 0.55
  },
  "LT": {
    "year": 2023,
    "rating": "Very High",
    "rank": 39,
    "rankChange": 0,
    "score": 0.895
  },
  "LU": {
    "year": 2023,
    "rating": "Very High",
    "rank": 25,
    "rankChange": -3,
    "score": 0.922
  },
  "LV": {
    "year": 2023,
    "rating": "Very High",
    "rank": 41,
    "rankChange": 2,
    "score": 0.889
  },
  "LY": {
    "year": 2023,
    "rating": "High",
    "rank": 115,
    "rankChange": -9,
    "score": 0.721
  },
  "MA": {
    "year": 2023,
    "rating": "High",
    "rank": 120,
    "rankChange": 2,
    "score": 0.71
  },
  "MD": {
    "year": 2023,
    "rating": "High",
    "rank": 86,
    "rankChange": -4,
    "score": 0.785
  },
  "ME": {
    "year": 2023,
    "rating": "Very High",
    "rank": 48,
    "rankChange": 0,
    "score": 0.862
  },
  "MG": {
    "year": 2023,
    "rating": "Low",
    "rank": 183,
    "rankChange": 0,
    "score": 0.487
  },
  "MH": {
    "year": 2023,
    "rating": "High",
    "rank": 108,
    "rankChange": 2,
    "score": 0.733
  },
  "MK": {
    "year": 2023,
    "rating": "Very High",
    "rank": 68,
    "rankChange": -1,
    "score": 0.815
  },
  "ML": {
    "year": 2023,
    "rating": "Low",
    "rank": 188,
    "rankChange": 0,
    "score": 0.419
  },
  "MM": {
    "year": 2023,
    "rating": "Medium",
    "rank": 150,
    "rankChange": -1,
    "score": 0.609
  },
  "MN": {
    "year": 2023,
    "rating": "High",
    "rank": 104,
    "rankChange": 1,
    "score": 0.747
  },
  "MR": {
    "year": 2023,
    "rating": "Medium",
    "rank": 163,
    "rankChange": 0,
    "score": 0.563
  },
  "MT": {
    "year": 2023,
    "rating": "Very High",
    "rank": 24,
    "rankChange": 2,
    "score": 0.924
  },
  "MU": {
    "year": 2023,
    "rating": "Very High",
    "rank": 73,
    "rankChange": 2,
    "score": 0.806
  },
  "MV": {
    "year": 2023,
    "rating": "High",
    "rank": 93,
    "rankChange": -2,
    "score": 0.766
  },
  "MW": {
    "year": 2023,
    "rating": "Low",
    "rank": 172,
    "rankChange": 1,
    "score": 0.517
  },
  "MX": {
    "year": 2023,
    "rating": "High",
    "rank": 81,
    "rankChange": 3,
    "score": 0.789
  },
  "MY": {
    "year": 2023,
    "rating": "Very High",
    "rank": 67,
    "rankChange": 1,
    "score": 0.819
  },
  "MZ": {
    "year": 2023,
    "rating": "Low",
    "rank": 182,
    "rankChange": 0,
    "score": 0.493
  },
  "NA": {
    "year": 2023,
    "rating": "Medium",
    "rank": 136,
    "rankChange": 1,
    "score": 0.665
  },
  "NE": {
    "year": 2023,
    "rating": "Low",
    "rank": 188,
    "rankChange": 1,
    "score": 0.419
  },
  "NG": {
    "year": 2023,
    "rating": "Medium",
    "rank": 164,
    "rankChange": 0,
    "score": 0.56
  },
  "NI": {
    "year": 2023,
    "rating": "High",
    "rank": 123,
    "rankChange": 1,
    "score": 0.706
  },
  "NL": {
    "year": 2023,
    "rating": "Very High",
    "rank": 8,
    "rankChange": -1,
    "score": 0.955
  },
  "NO": {
    "year": 2023,
    "rating": "Very High",
    "rank": 2,
    "rankChange": -1,
    "score": 0.97
  },
  "NP": {
    "year": 2023,
    "rating": "Medium",
    "rank": 145,
    "rankChange": 5,
    "score": 0.622
  },
  "NR": {
    "year": 2023,
    "rating": "High",
    "rank": 124,
    "rankChange": 1,
    "score": 0.703
  },
  "NZ": {
    "year": 2023,
    "rating": "Very High",
    "rank": 17,
    "rankChange": 0,
    "score": 0.938
  },
  "OM": {
    "year": 2023,
    "rating": "Very High",
    "rank": 50,
    "rankChange": 2,
    "score": 0.858
  },
  "PA": {
    "year": 2023,
    "rating": "Very High",
    "rank": 59,
    "rankChange": -2,
    "score": 0.839
  },
  "PE": {
    "year": 2023,
    "rating": "High",
    "rank": 79,
    "rankChange": 0,
    "score": 0.794
  },
  "PG": {
    "year": 2023,
    "rating": "Medium",
    "rank": 160,
    "rankChange": -2,
    "score": 0.576
  },
  "PH": {
    "year": 2023,
    "rating": "High",
    "rank": 117,
    "rankChange": 3,
    "score": 0.72
  },
  "PK": {
    "year": 2023,
    "rating": "Low",
    "rank": 168,
    "rankChange": 0,
    "score": 0.544
  },
  "PL": {
    "year": 2023,
    "rating": "Very High",
    "rank": 35,
    "rankChange": -2,
    "score": 0.906
  },
  "PS": {
    "year": 2023,
    "rating": "Medium",
    "rank": 133,
    "rankChange": -24,
    "score": 0.674
  },
  "PT": {
    "year": 2023,
    "rating": "Very High",
    "rank": 40,
    "rankChange": 1,
    "score": 0.89
  },
  "PW": {
    "year": 2023,
    "rating": "High",
    "rank": 84,
    "rankChange": -3,
    "score": 0.786
  },
  "PY": {
    "year": 2023,
    "rating": "High",
    "rank": 99,
    "rankChange": 3,
    "score": 0.756
  },
  "QA": {
    "year": 2023,
    "rating": "Very High",
    "rank": 43,
    "rankChange": -2,
    "score": 0.886
  },
  "RO": {
    "year": 2023,
    "rating": "Very High",
    "rank": 55,
    "rankChange": -1,
    "score": 0.845
  },
  "RS": {
    "year": 2023,
    "rating": "Very High",
    "rank": 62,
    "rankChange": -1,
    "score": 0.833
  },
  "RU": {
    "year": 2023,
    "rating": "Very High",
    "rank": 64,
    "rankChange": -3,
    "score": 0.832
  },
  "RW": {
    "year": 2023,
    "rating": "Medium",
    "rank": 159,
    "rankChange": 1,
    "score": 0.578
  },
  "SA": {
    "year": 2023,
    "rating": "Very High",
    "rank": 37,
    "rankChange": 0,
    "score": 0.9
  },
  "SB": {
    "year": 2023,
    "rating": "Medium",
    "rank": 156,
    "rankChange": -1,
    "score": 0.584
  },
  "SC": {
    "year": 2023,
    "rating": "Very High",
    "rank": 54,
    "rankChange": 2,
    "score": 0.848
  },
  "SD": {
    "year": 2023,
    "rating": "Low",
    "rank": 176,
    "rankChange": -5,
    "score": 0.511
  },
  "SE": {
    "year": 2023,
    "rating": "Very High",
    "rank": 5,
    "rankChange": -1,
    "score": 0.959
  },
  "SG": {
    "year": 2023,
    "rating": "Very High",
    "rank": 13,
    "rankChange": 1,
    "score": 0.946
  },
  "SI": {
    "year": 2023,
    "rating": "Very High",
    "rank": 21,
    "rankChange": 0,
    "score": 0.931
  },
  "SK": {
    "year": 2023,
    "rating": "Very High",
    "rank": 44,
    "rankChange": 0,
    "score": 0.88
  },
  "SL": {
    "year": 2023,
    "rating": "Low",
    "rank": 185,
    "rankChange": 0,
    "score": 0.467
  },
  "SM": {
    "year": 2023,
    "rating": "Very High",
    "rank": 29,
    "rankChange": 1,
    "score": 0.915
  },
  "SN": {
    "year": 2023,
    "rating": "Low",
    "rank": 169,
    "rankChange": 0,
    "score": 0.53
  },
  "SO": {
    "year": 2023,
    "rating": "Low",
    "rank": 192,
    "rankChange": 0,
    "score": 0.404
  },
  "SR": {
    "year": 2023,
    "rating": "High",
    "rank": 114,
    "rankChange": 2,
    "score": 0.722
  },
  "SS": {
    "year": 2023,
    "rating": "Low",
    "rank": 193,
    "rankChange": -2,
    "score": 0.388
  },
  "ST": {
    "year": 2023,
    "rating": "Medium",
    "rank": 141,
    "rankChange": 0,
    "score": 0.637
  },
  "SV": {
    "year": 2023,
    "rating": "Medium",
    "rank": 132,
    "rankChange": 2,
    "score": 0.678
  },
  "SY": {
    "year": 2023,
    "rating": "Medium",
    "rank": 162,
    "rankChange": -3,
    "score": 0.564
  },
  "SZ": {
    "year": 2023,
    "rating": "Medium",
    "rank": 126,
    "rankChange": 0,
    "score": 0.695
  },
  "TD": {
    "year": 2023,
    "rating": "Low",
    "rank": 190,
    "rankChange": -1,
    "score": 0.416
  },
  "TG": {
    "year": 2023,
    "rating": "Medium",
    "rank": 161,
    "rankChange": 0,
    "score": 0.571
  },
  "TH": {
    "year": 2023,
    "rating": "High",
    "rank": 76,
    "rankChange": 2,
    "score": 0.798
  },
  "TJ": {
    "year": 2023,
    "rating": "Medium",
    "rank": 128,
    "rankChange": 1,
    "score": 0.691
  },
  "TL": {
    "year": 2023,
    "rating": "Medium",
    "rank": 142,
    "rankChange": 0,
    "score": 0.634
  },
  "TM": {
    "year": 2023,
    "rating": "High",
    "rank": 95,
    "rankChange": 1,
    "score": 0.764
  },
  "TN": {
    "year": 2023,
    "rating": "High",
    "rank": 105,
    "rankChange": -1,
    "score": 0.746
  },
  "TO": {
    "year": 2023,
    "rating": "High",
    "rank": 92,
    "rankChange": -1,
    "score": 0.769
  },
  "TR": {
    "year": 2023,
    "rating": "Very High",
    "rank": 51,
    "rankChange": -3,
    "score": 0.853
  },
  "TT": {
    "year": 2023,
    "rating": "Very High",
    "rank": 72,
    "rankChange": -1,
    "score": 0.807
  },
  "TV": {
    "year": 2023,
    "rating": "Medium",
    "rank": 129,
    "rankChange": 1,
    "score": 0.689
  },
  "TZ": {
    "year": 2023,
    "rating": "Medium",
    "rank": 165,
    "rankChange": 0,
    "score": 0.555
  },
  "UA": {
    "year": 2023,
    "rating": "High",
    "rank": 87,
    "rankChange": 3,
    "score": 0.779
  },
  "UG": {
    "year": 2023,
    "rating": "Medium",
    "rank": 157,
    "rankChange": 0,
    "score": 0.582
  },
  "US": {
    "year": 2023,
    "rating": "Very High",
    "rank": 17,
    "rankChange": 1,
    "score": 0.938
  },
  "UY": {
    "year": 2023,
    "rating": "Very High",
    "rank": 48,
    "rankChange": 2,
    "score": 0.862
  },
  "UZ": {
    "year": 2023,
    "rating": "High",
    "rank": 107,
    "rankChange": 0,
    "score": 0.74
  },
  "VC": {
    "year": 2023,
    "rating": "High",
    "rank": 76,
    "rankChange": -1,
    "score": 0.798
  },
  "VE": {
    "year": 2023,
    "rating": "High",
    "rank": 121,
    "rankChange": 0,
    "score": 0.709
  },
  "VN": {
    "year": 2023,
    "rating": "High",
    "rank": 93,
    "rankChange": -2,
    "score": 0.766
  },
  "VU": {
    "year": 2023,
    "rating": "Medium",
    "rank": 146,
    "rankChange": -1,
    "score": 0.621
  },
  "WS": {
    "year": 2023,
    "rating": "High",
    "rank": 122,
    "rankChange": 1,
    "score": 0.708
  },
  "YE": {
    "year": 2023,
    "rating": "Low",
    "rank": 184,
    "rankChange": 0,
    "score": 0.47
  },
  "ZA": {
    "year": 2023,
    "rating": "High",
    "rank": 106,
    "rankChange": 1,
    "score": 0.741
  },
  "ZM": {
    "year": 2023,
    "rating": "Medium",
    "rank": 154,
    "rankChange": 0,
    "score": 0.595
  },
  "ZW": {
    "year": 2023,
    "rating": "Medium",
    "rank": 153,
    "rankChange": 0,
    "score": 0.598
  }
};
