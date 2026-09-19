// Authoritative democracy rankings and ratings for Freedom House, V-Dem, and EIU Economist
// Covers UN member states and permanent observers. Updated with 2026 reports.

/**
 * @type {Record<string, {
 *   freedomHouse?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   vDem?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   economist?: { year: number, rating: string, rank: number, rankChange?: number, score?: number }
 * }>}
 */
export const DEMOCRACY_DATA = {
  "AD": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 11,
      "rankChange": 0,
      "score": 93
    }
  },
  "AF": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 193,
      "rankChange": 0,
      "score": 1
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 177,
      "rankChange": 0,
      "score": 0.03
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 167,
      "rankChange": 0,
      "score": 0.26
    }
  },
  "AL": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 80,
      "rankChange": 1,
      "score": 68
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 74,
      "rankChange": 2,
      "score": 0.48
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 66,
      "rankChange": 1,
      "score": 6.28
    }
  },
  "DZ": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 140,
      "rankChange": -2,
      "score": 31
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 120,
      "rankChange": -1,
      "score": 0.27
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 114,
      "rankChange": -1,
      "score": 3.66
    }
  },
  "AO": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 135,
      "rankChange": 1,
      "score": 34
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 110,
      "rankChange": 3,
      "score": 0.32
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 110,
      "rankChange": -1,
      "score": 4.18
    }
  },
  "AG": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 35,
      "rankChange": 0,
      "score": 85
    }
  },
  "AR": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 40,
      "rankChange": -1,
      "score": 85
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 42,
      "rankChange": -3,
      "score": 0.65
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 52,
      "rankChange": -2,
      "score": 6.62
    }
  },
  "AM": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 92,
      "rankChange": 0,
      "score": 54
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 54,
      "rankChange": 2,
      "score": 0.58
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 84,
      "rankChange": 0,
      "score": 5.42
    }
  },
  "AU": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 13,
      "rankChange": 0,
      "score": 95
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 10,
      "rankChange": 0,
      "score": 0.85
    },
    "economist": {
      "year": 2026,
      "rating": "Full democracy",
      "rank": 14,
      "rankChange": 1,
      "score": 8.66
    }
  },
  "AT": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 17,
      "rankChange": 0,
      "score": 93
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 22,
      "rankChange": -1,
      "score": 0.79
    },
    "economist": {
      "year": 2026,
      "rating": "Full democracy",
      "rank": 19,
      "rankChange": 1,
      "score": 8.28
    }
  },
  "AZ": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 174,
      "rankChange": -2,
      "score": 7
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 154,
      "rankChange": -1,
      "score": 0.12
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 130,
      "rankChange": -1,
      "score": 2.8
    }
  },
  "BS": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 25,
      "rankChange": 0,
      "score": 91
    }
  },
  "BH": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 167,
      "rankChange": 0,
      "score": 12
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 153,
      "rankChange": 0,
      "score": 0.13
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 138,
      "rankChange": 1,
      "score": 2.52
    }
  },
  "BD": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 118,
      "rankChange": -1,
      "score": 40
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 133,
      "rankChange": -2,
      "score": 0.22
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 75,
      "rankChange": -2,
      "score": 5.83
    }
  },
  "BB": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 18,
      "rankChange": 0,
      "score": 94
    }
  },
  "BY": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 173,
      "rankChange": 0,
      "score": 8
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 156,
      "rankChange": -1,
      "score": 0.11
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 151,
      "rankChange": 2,
      "score": 1.99
    }
  },
  "BE": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 11,
      "rankChange": 0,
      "score": 96
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 11,
      "rankChange": 1,
      "score": 0.84
    },
    "economist": {
      "year": 2026,
      "rating": "Full democracy",
      "rank": 36,
      "rankChange": 0,
      "score": 7.64
    }
  },
  "BZ": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 32,
      "rankChange": 0,
      "score": 87
    }
  },
  "BJ": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 90,
      "rankChange": -2,
      "score": 61
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 70,
      "rankChange": -2,
      "score": 0.49
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 108,
      "rankChange": -4,
      "score": 4.68
    }
  },
  "BT": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 45,
      "rankChange": 10,
      "score": 68
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 62,
      "rankChange": 1,
      "score": 0.54
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 81,
      "rankChange": 3,
      "score": 5.54
    }
  },
  "BO": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 42,
      "rankChange": 43,
      "score": 70
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 68,
      "rankChange": -2,
      "score": 0.5
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 106,
      "rankChange": -6,
      "score": 4.2
    }
  },
  "BA": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 98,
      "rankChange": 0,
      "score": 51
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 82,
      "rankChange": -1,
      "score": 0.42
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 94,
      "rankChange": 3,
      "score": 5
    }
  },
  "BW": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 48,
      "rankChange": 1,
      "score": 72
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 48,
      "rankChange": 2,
      "score": 0.61
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 33,
      "rankChange": -1,
      "score": 7.73
    }
  },
  "BR": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 55,
      "rankChange": 1,
      "score": 73
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 45,
      "rankChange": 12,
      "score": 0.64
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 51,
      "rankChange": 0,
      "score": 6.68
    }
  },
  "BN": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 148,
      "rankChange": 0,
      "score": 28
    }
  },
  "BG": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 53,
      "rankChange": 0,
      "score": 78
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 44,
      "rankChange": -1,
      "score": 0.64
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 57,
      "rankChange": 0,
      "score": 6.53
    }
  },
  "BF": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 156,
      "rankChange": -15,
      "score": 19
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 148,
      "rankChange": -12,
      "score": 0.15
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 127,
      "rankChange": -8,
      "score": 2.73
    }
  },
  "BI": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 161,
      "rankChange": 0,
      "score": 14
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 148,
      "rankChange": 0,
      "score": 0.16
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 148,
      "rankChange": 0,
      "score": 2.13
    }
  },
  "CV": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 26,
      "rankChange": 0,
      "score": 89
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 35,
      "rankChange": 0,
      "score": 0.71
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 35,
      "rankChange": 0,
      "score": 7.65
    }
  },
  "KH": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 164,
      "rankChange": 0,
      "score": 15
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 151,
      "rankChange": 0,
      "score": 0.15
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 121,
      "rankChange": 0,
      "score": 3.05
    }
  },
  "CM": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 164,
      "rankChange": 0,
      "score": 15
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 136,
      "rankChange": -1,
      "score": 0.2
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 140,
      "rankChange": 0,
      "score": 2.56
    }
  },
  "CA": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 5,
      "rankChange": 0,
      "score": 97
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 15,
      "rankChange": 0,
      "score": 0.82
    },
    "economist": {
      "year": 2026,
      "rating": "Full democracy",
      "rank": 13,
      "rankChange": -1,
      "score": 8.63
    }
  },
  "CF": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 174,
      "rankChange": 0,
      "score": 7
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 160,
      "rankChange": 0,
      "score": 0.09
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 164,
      "rankChange": 0,
      "score": 1.18
    }
  },
  "TD": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 163,
      "rankChange": 0,
      "score": 15
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 162,
      "rankChange": 0,
      "score": 0.08
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 160,
      "rankChange": 0,
      "score": 1.67
    }
  },
  "CL": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 22,
      "rankChange": 0,
      "score": 94
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 25,
      "rankChange": -1,
      "score": 0.77
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 26,
      "rankChange": -7,
      "score": 7.98
    }
  },
  "CN": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 168,
      "rankChange": 0,
      "score": 9
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 172,
      "rankChange": 0,
      "score": 0.05
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 148,
      "rankChange": 8,
      "score": 2.12
    }
  },
  "CO": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 76,
      "rankChange": 0,
      "score": 70
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 52,
      "rankChange": 2,
      "score": 0.59
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 55,
      "rankChange": -2,
      "score": 6.55
    }
  },
  "KM": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 139,
      "rankChange": 0,
      "score": 32
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 125,
      "rankChange": 0,
      "score": 0.25
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 120,
      "rankChange": 4,
      "score": 3.04
    }
  },
  "CG": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 166,
      "rankChange": 0,
      "score": 12
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 147,
      "rankChange": 0,
      "score": 0.16
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 136,
      "rankChange": 0,
      "score": 2.79
    }
  },
  "CD": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 158,
      "rankChange": 0,
      "score": 19
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 138,
      "rankChange": -2,
      "score": 0.2
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 162,
      "rankChange": 0,
      "score": 1.48
    }
  },
  "CR": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 21,
      "rankChange": 0,
      "score": 94
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 20,
      "rankChange": 0,
      "score": 0.81
    },
    "economist": {
      "year": 2026,
      "rating": "Full democracy",
      "rank": 17,
      "rankChange": 3,
      "score": 8.29
    }
  },
  "CI": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 95,
      "rankChange": 0,
      "score": 53
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 101,
      "rankChange": 1,
      "score": 0.35
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 87,
      "rankChange": 4,
      "score": 5.22
    }
  },
  "HR": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 45,
      "rankChange": 0,
      "score": 84
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 41,
      "rankChange": 0,
      "score": 0.66
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 58,
      "rankChange": 1,
      "score": 6.5
    }
  },
  "CU": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 166,
      "rankChange": 0,
      "score": 12
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 155,
      "rankChange": 0,
      "score": 0.12
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 135,
      "rankChange": 4,
      "score": 2.65
    }
  },
  "CY": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 21,
      "rankChange": 0,
      "score": 94
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 32,
      "rankChange": 0,
      "score": 0.74
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 37,
      "rankChange": 0,
      "score": 7.38
    }
  },
  "CZ": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 18,
      "rankChange": 0,
      "score": 94
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 26,
      "rankChange": 0,
      "score": 0.77
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 25,
      "rankChange": 0,
      "score": 7.97
    }
  },
  "DK": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 5,
      "rankChange": 0,
      "score": 97
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 1,
      "rankChange": 0,
      "score": 0.89
    },
    "economist": {
      "year": 2026,
      "rating": "Full democracy",
      "rank": 6,
      "rankChange": 0,
      "score": 9.28
    }
  },
  "DJ": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 152,
      "rankChange": 0,
      "score": 24
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 142,
      "rankChange": 0,
      "score": 0.18
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 137,
      "rankChange": 0,
      "score": 2.74
    }
  },
  "DM": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 23,
      "rankChange": 0,
      "score": 93
    }
  },
  "DO": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 78,
      "rankChange": 1,
      "score": 69
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 57,
      "rankChange": 3,
      "score": 0.56
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 61,
      "rankChange": 4,
      "score": 6.44
    }
  },
  "EC": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 82,
      "rankChange": -2,
      "score": 67
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 65,
      "rankChange": -4,
      "score": 0.52
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 70,
      "rankChange": -3,
      "score": 6.05
    }
  },
  "EG": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 158,
      "rankChange": 0,
      "score": 18
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 152,
      "rankChange": 0,
      "score": 0.14
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 131,
      "rankChange": 0,
      "score": 2.93
    }
  },
  "SV": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 105,
      "rankChange": -10,
      "score": 46
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 115,
      "rankChange": -14,
      "score": 0.25
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 90,
      "rankChange": 3,
      "score": 4.71
    }
  },
  "GQ": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 177,
      "rankChange": 0,
      "score": 5
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 168,
      "rankChange": 0,
      "score": 0.06
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 158,
      "rankChange": 0,
      "score": 1.92
    }
  },
  "ER": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 180,
      "rankChange": 0,
      "score": 3
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 176,
      "rankChange": 0,
      "score": 0.04
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 161,
      "rankChange": 0,
      "score": 1.66
    }
  },
  "EE": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 15,
      "rankChange": 0,
      "score": 95
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 5,
      "rankChange": 0,
      "score": 0.86
    },
    "economist": {
      "year": 2026,
      "rating": "Full democracy",
      "rank": 21,
      "rankChange": 6,
      "score": 8.1
    }
  },
  "SZ": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 161,
      "rankChange": 0,
      "score": 17
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 143,
      "rankChange": 0,
      "score": 0.18
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 129,
      "rankChange": 0,
      "score": 3.01
    }
  },
  "ET": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 154,
      "rankChange": -1,
      "score": 21
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 128,
      "rankChange": -2,
      "score": 0.24
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 126,
      "rankChange": -4,
      "score": 3
    }
  },
  "FJ": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 43,
      "rankChange": 12,
      "score": 70
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 58,
      "rankChange": 5,
      "score": 0.56
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 72,
      "rankChange": 3,
      "score": 5.95
    }
  },
  "FI": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 1,
      "rankChange": 0,
      "score": 100
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 7,
      "rankChange": 0,
      "score": 0.86
    },
    "economist": {
      "year": 2026,
      "rating": "Full democracy",
      "rank": 5,
      "rankChange": 0,
      "score": 9.3
    }
  },
  "FR": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 26,
      "rankChange": 0,
      "score": 89
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 18,
      "rankChange": 0,
      "score": 0.81
    },
    "economist": {
      "year": 2026,
      "rating": "Full democracy",
      "rank": 23,
      "rankChange": -1,
      "score": 8.07
    }
  },
  "GA": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 157,
      "rankChange": -4,
      "score": 20
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 139,
      "rankChange": -10,
      "score": 0.19
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 146,
      "rankChange": -28,
      "score": 2.18
    }
  },
  "GM": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 98,
      "rankChange": 0,
      "score": 50
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 63,
      "rankChange": 1,
      "score": 0.54
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 101,
      "rankChange": 1,
      "score": 4.47
    }
  },
  "GE": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 90,
      "rankChange": -1,
      "score": 58
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 92,
      "rankChange": -4,
      "score": 0.38
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 89,
      "rankChange": 1,
      "score": 5.2
    }
  },
  "DE": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 17,
      "rankChange": 0,
      "score": 93
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 9,
      "rankChange": 0,
      "score": 0.85
    },
    "economist": {
      "year": 2026,
      "rating": "Full democracy",
      "rank": 12,
      "rankChange": 2,
      "score": 8.68
    }
  },
  "GH": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 50,
      "rankChange": 0,
      "score": 80
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 51,
      "rankChange": 0,
      "score": 0.6
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 65,
      "rankChange": -2,
      "score": 6.3
    }
  },
  "GR": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 41,
      "rankChange": 0,
      "score": 86
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 36,
      "rankChange": -1,
      "score": 0.7
    },
    "economist": {
      "year": 2026,
      "rating": "Full democracy",
      "rank": 20,
      "rankChange": 5,
      "score": 8.14
    }
  },
  "GD": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 27,
      "rankChange": 0,
      "score": 89
    }
  },
  "GT": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 96,
      "rankChange": 2,
      "score": 49
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 105,
      "rankChange": 4,
      "score": 0.34
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 100,
      "rankChange": -2,
      "score": 4.47
    }
  },
  "GN": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 142,
      "rankChange": 0,
      "score": 30
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 137,
      "rankChange": -3,
      "score": 0.2
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 145,
      "rankChange": 0,
      "score": 2.21
    }
  },
  "GW": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 155,
      "rankChange": -20,
      "score": 18
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 135,
      "rankChange": -15,
      "score": 0.21
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 141,
      "rankChange": 0,
      "score": 2.56
    }
  },
  "GY": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 54,
      "rankChange": 0,
      "score": 73
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 60,
      "rankChange": 0,
      "score": 0.55
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 67,
      "rankChange": 0,
      "score": 6.26
    }
  },
  "HT": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 142,
      "rankChange": -2,
      "score": 30
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 132,
      "rankChange": -4,
      "score": 0.23
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 139,
      "rankChange": -4,
      "score": 2.81
    }
  },
  "HN": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 101,
      "rankChange": 0,
      "score": 48
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 84,
      "rankChange": 1,
      "score": 0.42
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 95,
      "rankChange": -4,
      "score": 4.98
    }
  },
  "HU": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 85,
      "rankChange": -1,
      "score": 65
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 95,
      "rankChange": -3,
      "score": 0.37
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 50,
      "rankChange": 6,
      "score": 6.72
    }
  },
  "IS": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 8,
      "rankChange": 0,
      "score": 96
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 17,
      "rankChange": 0,
      "score": 0.81
    },
    "economist": {
      "year": 2026,
      "rating": "Full democracy",
      "rank": 3,
      "rankChange": 0,
      "score": 9.45
    }
  },
  "IN": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 67,
      "rankChange": 0,
      "score": 66
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 104,
      "rankChange": -4,
      "score": 0.35
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 41,
      "rankChange": 5,
      "score": 7.18
    }
  },
  "ID": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 82,
      "rankChange": -1,
      "score": 57
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 87,
      "rankChange": -3,
      "score": 0.41
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 56,
      "rankChange": -2,
      "score": 6.53
    }
  },
  "IR": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 168,
      "rankChange": 0,
      "score": 11
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 166,
      "rankChange": 0,
      "score": 0.08
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 154,
      "rankChange": 0,
      "score": 1.96
    }
  },
  "IQ": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 139,
      "rankChange": 0,
      "score": 31
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 117,
      "rankChange": 0,
      "score": 0.29
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 128,
      "rankChange": 0,
      "score": 2.88
    }
  },
  "IE": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 5,
      "rankChange": 0,
      "score": 97
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 8,
      "rankChange": 0,
      "score": 0.85
    },
    "economist": {
      "year": 2026,
      "rating": "Full democracy",
      "rank": 7,
      "rankChange": 1,
      "score": 9.19
    }
  },
  "IL": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 48,
      "rankChange": 0,
      "score": 77
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 40,
      "rankChange": -6,
      "score": 0.67
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 30,
      "rankChange": -1,
      "score": 7.8
    }
  },
  "IT": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 36,
      "rankChange": -3,
      "score": 88
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 33,
      "rankChange": -4,
      "score": 0.69
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 31,
      "rankChange": 0,
      "score": 7.69
    }
  },
  "JM": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 50,
      "rankChange": 0,
      "score": 80
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 46,
      "rankChange": 0,
      "score": 0.63
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 42,
      "rankChange": 0,
      "score": 7.06
    }
  },
  "JP": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 11,
      "rankChange": 0,
      "score": 96
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 14,
      "rankChange": 0,
      "score": 0.83
    },
    "economist": {
      "year": 2026,
      "rating": "Full democracy",
      "rank": 16,
      "rankChange": 0,
      "score": 8.4
    }
  },
  "JO": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 135,
      "rankChange": 0,
      "score": 33
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 130,
      "rankChange": 0,
      "score": 0.24
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 122,
      "rankChange": 0,
      "score": 3.04
    }
  },
  "KZ": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 154,
      "rankChange": 0,
      "score": 23
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 131,
      "rankChange": 0,
      "score": 0.23
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 124,
      "rankChange": 3,
      "score": 3.08
    }
  },
  "KE": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 91,
      "rankChange": 0,
      "score": 55
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 76,
      "rankChange": 1,
      "score": 0.46
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 92,
      "rankChange": 2,
      "score": 5.05
    }
  },
  "KI": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 23,
      "rankChange": 0,
      "score": 93
    }
  },
  "KP": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 180,
      "rankChange": 0,
      "score": 3
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 178,
      "rankChange": 0,
      "score": 0.02
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 165,
      "rankChange": 0,
      "score": 1.08
    }
  },
  "KR": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 37,
      "rankChange": 0,
      "score": 83
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 28,
      "rankChange": -11,
      "score": 0.76
    },
    "economist": {
      "year": 2026,
      "rating": "Full democracy",
      "rank": 22,
      "rankChange": 2,
      "score": 8.09
    }
  },
  "KW": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 110,
      "rankChange": -1,
      "score": 38
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 122,
      "rankChange": -2,
      "score": 0.27
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 116,
      "rankChange": -5,
      "score": 3.5
    }
  },
  "KG": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 147,
      "rankChange": -2,
      "score": 27
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 135,
      "rankChange": -5,
      "score": 0.21
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 115,
      "rankChange": 1,
      "score": 3.7
    }
  },
  "LA": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 164,
      "rankChange": 0,
      "score": 13
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 163,
      "rankChange": 0,
      "score": 0.08
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 159,
      "rankChange": 0,
      "score": 1.77
    }
  },
  "LV": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 28,
      "rankChange": 0,
      "score": 88
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 27,
      "rankChange": 0,
      "score": 0.76
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 38,
      "rankChange": 0,
      "score": 7.37
    }
  },
  "LB": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 110,
      "rankChange": 0,
      "score": 42
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 114,
      "rankChange": -1,
      "score": 0.3
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 112,
      "rankChange": 3,
      "score": 3.56
    }
  },
  "LS": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 60,
      "rankChange": 1,
      "score": 66
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 64,
      "rankChange": 2,
      "score": 0.53
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 64,
      "rankChange": 0,
      "score": 6.3
    }
  },
  "LR": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 65,
      "rankChange": 2,
      "score": 67
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 61,
      "rankChange": 5,
      "score": 0.55
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 86,
      "rankChange": 4,
      "score": 5.43
    }
  },
  "LY": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 172,
      "rankChange": 0,
      "score": 9
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 157,
      "rankChange": 0,
      "score": 0.11
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 157,
      "rankChange": -6,
      "score": 1.78
    }
  },
  "LI": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 11,
      "rankChange": 0,
      "score": 90
    }
  },
  "LT": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 25,
      "rankChange": 0,
      "score": 89
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 21,
      "rankChange": 0,
      "score": 0.8
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 36,
      "rankChange": 1,
      "score": 7.59
    }
  },
  "LU": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 5,
      "rankChange": 0,
      "score": 97
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 12,
      "rankChange": 0,
      "score": 0.84
    },
    "economist": {
      "year": 2026,
      "rating": "Full democracy",
      "rank": 11,
      "rankChange": 2,
      "score": 8.81
    }
  },
  "MG": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 98,
      "rankChange": -8,
      "score": 52
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 85,
      "rankChange": -6,
      "score": 0.41
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 98,
      "rankChange": -2,
      "score": 5.26
    }
  },
  "MW": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 44,
      "rankChange": 15,
      "score": 68
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 60,
      "rankChange": 2,
      "score": 0.55
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 89,
      "rankChange": 2,
      "score": 5.15
    }
  },
  "MY": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 92,
      "rankChange": 1,
      "score": 53
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 86,
      "rankChange": 2,
      "score": 0.41
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 40,
      "rankChange": 0,
      "score": 7.29
    }
  },
  "MV": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 99,
      "rankChange": 0,
      "score": 46
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 83,
      "rankChange": 0,
      "score": 0.42
    }
  },
  "ML": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 156,
      "rankChange": -3,
      "score": 21
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 144,
      "rankChange": -8,
      "score": 0.17
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 137,
      "rankChange": -18,
      "score": 2.58
    }
  },
  "MT": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 26,
      "rankChange": 0,
      "score": 89
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 38,
      "rankChange": 0,
      "score": 0.68
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 32,
      "rankChange": 1,
      "score": 7.93
    }
  },
  "MH": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 23,
      "rankChange": 0,
      "score": 93
    }
  },
  "MR": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 114,
      "rankChange": 0,
      "score": 36
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 108,
      "rankChange": 0,
      "score": 0.33
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 108,
      "rankChange": 0,
      "score": 3.96
    }
  },
  "MU": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 42,
      "rankChange": 0,
      "score": 85
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 47,
      "rankChange": -2,
      "score": 0.62
    },
    "economist": {
      "year": 2026,
      "rating": "Full democracy",
      "rank": 20,
      "rankChange": 1,
      "score": 8.14
    }
  },
  "MX": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 78,
      "rankChange": 0,
      "score": 60
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 85,
      "rankChange": -2,
      "score": 0.42
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 66,
      "rankChange": 3,
      "score": 5.14
    }
  },
  "FM": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 20,
      "rankChange": 0,
      "score": 92
    }
  },
  "MD": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 81,
      "rankChange": 1,
      "score": 62
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 56,
      "rankChange": 2,
      "score": 0.56
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 68,
      "rankChange": 1,
      "score": 6.1
    }
  },
  "MC": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 44,
      "rankChange": 0,
      "score": 84
    }
  },
  "MN": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 52,
      "rankChange": 0,
      "score": 84
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 66,
      "rankChange": 0,
      "score": 0.51
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 59,
      "rankChange": 3,
      "score": 6.48
    }
  },
  "ME": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 74,
      "rankChange": 1,
      "score": 67
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 69,
      "rankChange": 6,
      "score": 0.5
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 52,
      "rankChange": 9,
      "score": 6.67
    }
  },
  "MA": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 112,
      "rankChange": 0,
      "score": 37
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 106,
      "rankChange": 0,
      "score": 0.33
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 95,
      "rankChange": 0,
      "score": 5.04
    }
  },
  "MZ": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 108,
      "rankChange": -1,
      "score": 44
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 116,
      "rankChange": -3,
      "score": 0.3
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 117,
      "rankChange": 0,
      "score": 3.51
    }
  },
  "MM": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 178,
      "rankChange": 0,
      "score": 8
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 173,
      "rankChange": 0,
      "score": 0.05
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 166,
      "rankChange": 0,
      "score": 0.85
    }
  },
  "NA": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 49,
      "rankChange": 0,
      "score": 77
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 53,
      "rankChange": 0,
      "score": 0.58
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 54,
      "rankChange": 2,
      "score": 6.52
    }
  },
  "NR": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 47,
      "rankChange": 0,
      "score": 77
    }
  },
  "NP": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 85,
      "rankChange": 1,
      "score": 62
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 71,
      "rankChange": 1,
      "score": 0.49
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 101,
      "rankChange": 0,
      "score": 4.6
    }
  },
  "NL": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 5,
      "rankChange": 0,
      "score": 97
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 13,
      "rankChange": 0,
      "score": 0.84
    },
    "economist": {
      "year": 2026,
      "rating": "Full democracy",
      "rank": 9,
      "rankChange": 0,
      "score": 9
    }
  },
  "NZ": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 2,
      "rankChange": 0,
      "score": 99
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 6,
      "rankChange": 0,
      "score": 0.86
    },
    "economist": {
      "year": 2026,
      "rating": "Full democracy",
      "rank": 2,
      "rankChange": 0,
      "score": 9.61
    }
  },
  "NI": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 160,
      "rankChange": -1,
      "score": 16
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 165,
      "rankChange": -2,
      "score": 0.08
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 143,
      "rankChange": 0,
      "score": 2.26
    }
  },
  "NE": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 144,
      "rankChange": -10,
      "score": 33
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 141,
      "rankChange": -25,
      "score": 0.18
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 141,
      "rankChange": -29,
      "score": 2.37
    }
  },
  "NG": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 97,
      "rankChange": 0,
      "score": 44
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 90,
      "rankChange": -2,
      "score": 0.39
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 104,
      "rankChange": 1,
      "score": 4.23
    }
  },
  "MK": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 73,
      "rankChange": 1,
      "score": 67
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 73,
      "rankChange": -1,
      "score": 0.48
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 72,
      "rankChange": 0,
      "score": 6.03
    }
  },
  "NO": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 4,
      "rankChange": 0,
      "score": 98
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 3,
      "rankChange": 0,
      "score": 0.88
    },
    "economist": {
      "year": 2026,
      "rating": "Full democracy",
      "rank": 1,
      "rankChange": 0,
      "score": 9.81
    }
  },
  "OM": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 151,
      "rankChange": 0,
      "score": 24
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 146,
      "rankChange": 0,
      "score": 0.17
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 119,
      "rankChange": 6,
      "score": 3.12
    }
  },
  "PK": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 115,
      "rankChange": -1,
      "score": 37
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 126,
      "rankChange": -2,
      "score": 0.25
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 118,
      "rankChange": -11,
      "score": 3.25
    }
  },
  "PW": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 20,
      "rankChange": 0,
      "score": 92
    }
  },
  "PA": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 46,
      "rankChange": 0,
      "score": 83
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 50,
      "rankChange": 1,
      "score": 0.6
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 48,
      "rankChange": 1,
      "score": 6.91
    }
  },
  "PG": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 83,
      "rankChange": 0,
      "score": 61
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 75,
      "rankChange": 0,
      "score": 0.47
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 74,
      "rankChange": 0,
      "score": 6.03
    }
  },
  "PY": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 83,
      "rankChange": 0,
      "score": 65
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 78,
      "rankChange": -2,
      "score": 0.44
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 71,
      "rankChange": 6,
      "score": 6
    }
  },
  "PE": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 77,
      "rankChange": -2,
      "score": 66
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 72,
      "rankChange": -5,
      "score": 0.49
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 77,
      "rankChange": -2,
      "score": 5.81
    }
  },
  "PH": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 93,
      "rankChange": 0,
      "score": 58
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 96,
      "rankChange": 0,
      "score": 0.37
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 53,
      "rankChange": -1,
      "score": 6.66
    }
  },
  "PL": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 47,
      "rankChange": 1,
      "score": 81
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 43,
      "rankChange": 16,
      "score": 0.65
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 41,
      "rankChange": 16,
      "score": 7.18
    }
  },
  "PT": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 15,
      "rankChange": 0,
      "score": 95
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 24,
      "rankChange": 0,
      "score": 0.78
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 31,
      "rankChange": -3,
      "score": 7.75
    }
  },
  "QA": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 150,
      "rankChange": 0,
      "score": 25
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 149,
      "rankChange": 0,
      "score": 0.16
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 113,
      "rankChange": 1,
      "score": 3.65
    }
  },
  "RO": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 47,
      "rankChange": 0,
      "score": 83
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 59,
      "rankChange": -1,
      "score": 0.55
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 60,
      "rankChange": 1,
      "score": 6.45
    }
  },
  "RU": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 158,
      "rankChange": -2,
      "score": 13
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 150,
      "rankChange": -2,
      "score": 0.16
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 144,
      "rankChange": -2,
      "score": 2.22
    }
  },
  "RW": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 169,
      "rankChange": 0,
      "score": 21
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 134,
      "rankChange": 0,
      "score": 0.22
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 125,
      "rankChange": 1,
      "score": 3
    }
  },
  "KN": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 26,
      "rankChange": 0,
      "score": 89
    }
  },
  "LC": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 22,
      "rankChange": 0,
      "score": 92
    }
  },
  "VC": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 24,
      "rankChange": 0,
      "score": 91
    }
  },
  "WS": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 43,
      "rankChange": 0,
      "score": 85
    }
  },
  "SM": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 5,
      "rankChange": 0,
      "score": 97
    }
  },
  "ST": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 41,
      "rankChange": 0,
      "score": 84
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 49,
      "rankChange": 0,
      "score": 0.61
    }
  },
  "SA": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 171,
      "rankChange": 0,
      "score": 8
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 175,
      "rankChange": 0,
      "score": 0.04
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 150,
      "rankChange": 0,
      "score": 2.08
    }
  },
  "SN": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 75,
      "rankChange": -1,
      "score": 67
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 67,
      "rankChange": -5,
      "score": 0.5
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 79,
      "rankChange": -3,
      "score": 5.72
    }
  },
  "RS": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 91,
      "rankChange": -3,
      "score": 57
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 107,
      "rankChange": -4,
      "score": 0.33
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 64,
      "rankChange": 4,
      "score": 6.33
    }
  },
  "SC": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 51,
      "rankChange": 0,
      "score": 79
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 39,
      "rankChange": 0,
      "score": 0.67
    }
  },
  "SL": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 87,
      "rankChange": -2,
      "score": 63
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 79,
      "rankChange": -3,
      "score": 0.43
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 97,
      "rankChange": -2,
      "score": 5.03
    }
  },
  "SG": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 104,
      "rankChange": 0,
      "score": 48
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 93,
      "rankChange": 0,
      "score": 0.38
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 69,
      "rankChange": 1,
      "score": 6.18
    }
  },
  "SK": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 29,
      "rankChange": -1,
      "score": 90
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 30,
      "rankChange": -3,
      "score": 0.75
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 44,
      "rankChange": -1,
      "score": 7.07
    }
  },
  "SI": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 20,
      "rankChange": 0,
      "score": 91
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 19,
      "rankChange": 2,
      "score": 0.81
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 31,
      "rankChange": 4,
      "score": 7.75
    }
  },
  "SB": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 50,
      "rankChange": 0,
      "score": 76
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 77,
      "rankChange": -2,
      "score": 0.45
    }
  },
  "SO": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 173,
      "rankChange": 0,
      "score": 8
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 158,
      "rankChange": 0,
      "score": 0.1
    }
  },
  "ZA": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 50,
      "rankChange": 0,
      "score": 79
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 37,
      "rankChange": -1,
      "score": 0.69
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 47,
      "rankChange": -2,
      "score": 7.05
    }
  },
  "SS": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 194,
      "rankChange": 0,
      "score": 1
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 169,
      "rankChange": 0,
      "score": 0.06
    }
  },
  "ES": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 26,
      "rankChange": 0,
      "score": 90
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 29,
      "rankChange": 0,
      "score": 0.76
    },
    "economist": {
      "year": 2026,
      "rating": "Full democracy",
      "rank": 23,
      "rankChange": -1,
      "score": 8.07
    }
  },
  "LK": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 92,
      "rankChange": 6,
      "score": 58
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 81,
      "rankChange": 3,
      "score": 0.42
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 70,
      "rankChange": 0,
      "score": 6.17
    }
  },
  "SD": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 176,
      "rankChange": -2,
      "score": 6
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 164,
      "rankChange": -4,
      "score": 0.08
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 153,
      "rankChange": -9,
      "score": 1.76
    }
  },
  "SR": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 49,
      "rankChange": 0,
      "score": 79
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 34,
      "rankChange": 0,
      "score": 0.72
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 49,
      "rankChange": 0,
      "score": 6.88
    }
  },
  "SE": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 2,
      "rankChange": 0,
      "score": 99
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 2,
      "rankChange": 0,
      "score": 0.88
    },
    "economist": {
      "year": 2026,
      "rating": "Full democracy",
      "rank": 4,
      "rankChange": 0,
      "score": 9.39
    }
  },
  "CH": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 8,
      "rankChange": 0,
      "score": 96
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 4,
      "rankChange": 0,
      "score": 0.87
    },
    "economist": {
      "year": 2026,
      "rating": "Full democracy",
      "rank": 8,
      "rankChange": -1,
      "score": 9.14
    }
  },
  "SY": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 190,
      "rankChange": 4,
      "score": 7
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 174,
      "rankChange": 0,
      "score": 0.04
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 163,
      "rankChange": 0,
      "score": 1.43
    }
  },
  "TJ": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 177,
      "rankChange": 0,
      "score": 5
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 161,
      "rankChange": 0,
      "score": 0.09
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 155,
      "rankChange": 0,
      "score": 1.94
    }
  },
  "TZ": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 142,
      "rankChange": -12,
      "score": 32
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 118,
      "rankChange": -8,
      "score": 0.28
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 88,
      "rankChange": 4,
      "score": 5.1
    }
  },
  "TH": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 106,
      "rankChange": 5,
      "score": 38
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 94,
      "rankChange": 10,
      "score": 0.38
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 63,
      "rankChange": -8,
      "score": 6.35
    }
  },
  "TL": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 54,
      "rankChange": 0,
      "score": 72
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 33,
      "rankChange": 0,
      "score": 0.72
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 45,
      "rankChange": -1,
      "score": 7.06
    }
  },
  "TG": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 139,
      "rankChange": 0,
      "score": 31
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 129,
      "rankChange": 0,
      "score": 0.24
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 133,
      "rankChange": 0,
      "score": 2.99
    }
  },
  "TO": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 50,
      "rankChange": 0,
      "score": 79
    }
  },
  "TT": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 47,
      "rankChange": 0,
      "score": 82
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 53,
      "rankChange": 0,
      "score": 0.58
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 43,
      "rankChange": -2,
      "score": 7.16
    }
  },
  "TN": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 100,
      "rankChange": -2,
      "score": 51
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 103,
      "rankChange": -12,
      "score": 0.35
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 82,
      "rankChange": 3,
      "score": 5.51
    }
  },
  "TR": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 125,
      "rankChange": 0,
      "score": 33
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 140,
      "rankChange": 0,
      "score": 0.19
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 102,
      "rankChange": 1,
      "score": 4.35
    }
  },
  "TM": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 180,
      "rankChange": 0,
      "score": 2
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 171,
      "rankChange": 0,
      "score": 0.05
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 161,
      "rankChange": 0,
      "score": 1.66
    }
  },
  "TV": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 23,
      "rankChange": 0,
      "score": 93
    }
  },
  "UG": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 140,
      "rankChange": 0,
      "score": 34
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 119,
      "rankChange": 0,
      "score": 0.28
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 105,
      "rankChange": -6,
      "score": 4.55
    }
  },
  "UA": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 98,
      "rankChange": 0,
      "score": 49
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 80,
      "rankChange": 3,
      "score": 0.43
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 91,
      "rankChange": -4,
      "score": 5.06
    }
  },
  "AE": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 160,
      "rankChange": 0,
      "score": 18
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 159,
      "rankChange": 0,
      "score": 0.1
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 125,
      "rankChange": 8,
      "score": 3.01
    }
  },
  "GB": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 20,
      "rankChange": -2,
      "score": 92
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 28,
      "rankChange": -2,
      "score": 0.74
    },
    "economist": {
      "year": 2026,
      "rating": "Full democracy",
      "rank": 18,
      "rankChange": 0,
      "score": 8.28
    }
  },
  "US": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 45,
      "rankChange": -8,
      "score": 81
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 51,
      "rankChange": -31,
      "score": 0.55
    },
    "economist": {
      "year": 2026,
      "rating": "Flawed democracy",
      "rank": 34,
      "rankChange": -5,
      "score": 7.65
    }
  },
  "UY": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 11,
      "rankChange": 0,
      "score": 96
    },
    "vDem": {
      "year": 2026,
      "rating": "Liberal Democracy",
      "rank": 31,
      "rankChange": 0,
      "score": 0.75
    },
    "economist": {
      "year": 2026,
      "rating": "Full democracy",
      "rank": 15,
      "rankChange": -4,
      "score": 8.66
    }
  },
  "UZ": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 167,
      "rankChange": 0,
      "score": 12
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 150,
      "rankChange": 0,
      "score": 0.16
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 149,
      "rankChange": 0,
      "score": 2.12
    }
  },
  "VU": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 40,
      "rankChange": 0,
      "score": 82
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 36,
      "rankChange": 0,
      "score": 0.7
    }
  },
  "VE": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 165,
      "rankChange": -1,
      "score": 14
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 167,
      "rankChange": -1,
      "score": 0.07
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 142,
      "rankChange": -1,
      "score": 2.31
    }
  },
  "VN": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 158,
      "rankChange": 0,
      "score": 19
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 145,
      "rankChange": 0,
      "score": 0.17
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 134,
      "rankChange": 4,
      "score": 2.73
    }
  },
  "YE": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 173,
      "rankChange": 0,
      "score": 9
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 170,
      "rankChange": 0,
      "score": 0.05
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 156,
      "rankChange": -2,
      "score": 1.95
    }
  },
  "ZM": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Partly Free",
      "rank": 90,
      "rankChange": 1,
      "score": 54
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Democracy",
      "rank": 62,
      "rankChange": 4,
      "score": 0.54
    },
    "economist": {
      "year": 2026,
      "rating": "Hybrid regime",
      "rank": 76,
      "rankChange": 3,
      "score": 5.8
    }
  },
  "ZW": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 148,
      "rankChange": 0,
      "score": 28
    },
    "vDem": {
      "year": 2026,
      "rating": "Electoral Autocracy",
      "rank": 121,
      "rankChange": -3,
      "score": 0.27
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 132,
      "rankChange": 0,
      "score": 3.04
    }
  },
  "PS": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Not Free",
      "rank": 178,
      "rankChange": -2,
      "score": 7
    },
    "vDem": {
      "year": 2026,
      "rating": "Closed Autocracy",
      "rank": 162,
      "rankChange": 0,
      "score": 0.09
    },
    "economist": {
      "year": 2026,
      "rating": "Authoritarian",
      "rank": 152,
      "rankChange": 0,
      "score": 1.78
    }
  },
  "VA": {
    "freedomHouse": {
      "year": 2026,
      "rating": "Free",
      "rank": 30,
      "rankChange": 0,
      "score": 89
    }
  }
};
