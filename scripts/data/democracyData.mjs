// Authoritative democracy / governance / press-freedom / development / gender-gap / happiness rankings and ratings for
// Freedom House, V-Dem, EIU Economist, Transparency International’s Corruption
// Perceptions Index, the Nira Data / Alliance of Democracies Democracy Perception
// Index, RSF World Press Freedom Index, the UNDP Human Development Index, the WEF
// Global Gender Gap Index, the World Happiness Report, and the Lowy Institute Global Diplomacy Index.
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
// - UNDP Human Development Report 2025: Human Development Index (HDI) 2023
//   Official CSV: scripts/data/hdr25-hdi-2023.csv
//   (from HDR25_Composite_indices_complete_time_series.csv)
//   Categories from UNDP hdicode: Very High (≥0.800), High (0.700–0.799),
//   Medium (0.550–0.699), Low (<0.550).
// - World Economic Forum: Global Gender Gap Report 2025 (Table 1.1)
//   Official extract: scripts/data/gggi-2025.csv / scripts/data/gggi2025Data.mjs
// - World Happiness Report 2026: scripts/data/whr2026-figure-2.1.xlsx
//   (https://files.worldhappiness.report/WHR26_Data_Figure_2.1.xlsx)
//   CSV extract: scripts/data/whr-happiness-2026.csv
//   Year=2025 rows = Gallup World Poll 2023–2025 life-evaluation average (0–10).
// - Lowy Institute: Global Diplomacy Index 2024
//   Official extract: scripts/data/gdi-2024-rankings.json / scripts/data/gdi2024Data.mjs
//   (https://globaldiplomacyindex.lowyinstitute.org/data/2023/get_country_data.json)
//   Score = total diplomatic posts abroad; rating = post-count band for map/Group-by.

/**
 * @type {Record<string, {
 *   freedomHouse?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   vDem?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   economist?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   cpi?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   perception?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   rsfPress?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   hdi?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   genderGap?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   gpi?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   happiness?: { year: number, rating: string, rank: number, rankChange?: number, score?: number },
 *   gdi?: { year: number, rating: string, rank: number, rankChange?: number, score?: number }
 * }>}
 */
export const DEMOCRACY_DATA = {
  "AD": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":24,"rankChange":0,"score":93},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":60,"rankChange":5,"score":63.91},
    "hdi": {"year":2023,"rating":"Very High","rank":32,"rankChange":5,"score":0.913}
  },
  "AE": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":159,"rankChange":0,"score":18},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":155,"rankChange":-2,"score":0.08},
    "economist": {"year":2025,"rating":"Authoritarian","rank":117,"rankChange":0,"score":3.18},
    "cpi": {"year":2025,"rating":"60–69","rank":21,"rankChange":2,"score":69},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":158,"rankChange":6,"score":30.86},
    "hdi": {"year":2023,"rating":"Very High","rank":15,"rankChange":8,"score":0.94},
    "genderGap": {"year":2026,"rating":"70–79","rank":91,"rankChange":-22,"score":0.702},
    "gpi": {"year":2026,"rating":"Medium","rank":73,"rankChange":0,"score":1.927},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":21,"rankChange":0,"score":6.821}
  },
  "AF": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":184,"rankChange":0,"score":6},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":176,"rankChange":2,"score":0.02},
    "economist": {"year":2025,"rating":"Authoritarian","rank":167,"rankChange":-2,"score":0.25},
    "cpi": {"year":2025,"rating":"10–19","rank":169,"rankChange":-4,"score":16},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":175,"rankChange":0,"score":19.51},
    "hdi": {"year":2023,"rating":"Low","rank":181,"rankChange":-1,"score":0.496},
    "gpi": {"year":2026,"rating":"Very Low","rank":157,"rankChange":0,"score":3.106},
    "happiness": {"year":2026,"rating":"1.0–1.9","rank":147,"rankChange":0,"score":1.446}
  },
  "AG": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":57,"rankChange":0,"score":83},
    "hdi": {"year":2023,"rating":"Very High","rank":53,"rankChange":-2,"score":0.851}
  },
  "AL": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":85,"rankChange":0,"score":68},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":81,"rankChange":-2,"score":0.38},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":67,"rankChange":-2,"score":6.2},
    "cpi": {"year":2025,"rating":"30–39","rank":91,"rankChange":-11,"score":39},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":83,"rankChange":-3,"score":56.52},
    "hdi": {"year":2023,"rating":"Very High","rank":71,"rankChange":-1,"score":0.81},
    "genderGap": {"year":2026,"rating":"70–79","rank":25,"rankChange":11,"score":0.775},
    "gpi": {"year":2026,"rating":"High","rank":36,"rankChange":7,"score":1.725},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":86,"rankChange":3,"score":5.662}
  },
  "AM": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":110,"rankChange":0,"score":54},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":86,"rankChange":-10,"score":0.37},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":84,"rankChange":-3,"score":5.35},
    "cpi": {"year":2025,"rating":"40–49","rank":65,"rankChange":-2,"score":46},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":50,"rankChange":-16,"score":67.02},
    "hdi": {"year":2023,"rating":"Very High","rank":69,"rankChange":3,"score":0.811},
    "genderGap": {"year":2026,"rating":"70–79","rank":58,"rankChange":1,"score":0.731},
    "gpi": {"year":2026,"rating":"High","rank":51,"rankChange":21,"score":1.825},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":89,"rankChange":-2,"score":5.584}
  },
  "AO": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":144,"rankChange":0,"score":28},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":120,"rankChange":1,"score":0.16},
    "economist": {"year":2025,"rating":"Authoritarian","rank":107,"rankChange":-2,"score":3.94},
    "cpi": {"year":2025,"rating":"30–39","rank":120,"rankChange":1,"score":32},
    "perception": {"year":2026,"rating":"Negative","rank":58,"score":-9},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":109,"rankChange":-9,"score":48.82},
    "hdi": {"year":2023,"rating":"Medium","rank":148,"rankChange":-2,"score":0.616},
    "genderGap": {"year":2026,"rating":"70–79","rank":87,"rankChange":30,"score":0.705},
    "gpi": {"year":2026,"rating":"Medium","rank":78,"rankChange":11,"score":1.955}
  },
  "AR": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":51,"rankChange":0,"score":85},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":56,"rankChange":-5,"score":0.52},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":49,"rankChange":4,"score":6.89},
    "cpi": {"year":2025,"rating":"30–39","rank":104,"rankChange":-5,"score":36},
    "perception": {"year":2026,"rating":"Neutral","rank":43,"score":-3},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":98,"rankChange":-11,"score":52.44},
    "hdi": {"year":2023,"rating":"Very High","rank":47,"rankChange":0,"score":0.865},
    "genderGap": {"year":2026,"rating":"70–79","rank":45,"rankChange":-8,"score":0.751},
    "gpi": {"year":2026,"rating":"Medium","rank":72,"rankChange":-20,"score":1.922},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":44,"rankChange":-2,"score":6.43},
    "gdi": {"year":2024,"rating":"150–199","rank":16,"score":150}
  },
  "AT": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":24,"rankChange":0,"score":93},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":19,"rankChange":0,"score":0.76},
    "economist": {"year":2025,"rating":"Full democracy","rank":17,"rankChange":1,"score":8.42},
    "cpi": {"year":2025,"rating":"60–69","rank":21,"rankChange":4,"score":69},
    "perception": {"year":2026,"rating":"Positive","rank":17,"score":9},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":19,"rankChange":3,"score":79.43},
    "hdi": {"year":2023,"rating":"Very High","rank":22,"rankChange":-2,"score":0.93},
    "genderGap": {"year":2026,"rating":"70–79","rank":40,"rankChange":16,"score":0.753},
    "gpi": {"year":2026,"rating":"Very High","rank":6,"rankChange":-1,"score":1.421},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":19,"rankChange":-2,"score":6.845},
    "gdi": {"year":2024,"rating":"100–149","rank":36,"score":104}
  },
  "AU": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":18,"rankChange":0,"score":95},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":12,"rankChange":0,"score":0.79},
    "economist": {"year":2025,"rating":"Full democracy","rank":13,"rankChange":-2,"score":8.85},
    "cpi": {"year":2025,"rating":"70–79","rank":12,"rankChange":-2,"score":76},
    "perception": {"year":2026,"rating":"Positive","rank":23,"score":7},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":33,"rankChange":-4,"score":74.58},
    "hdi": {"year":2023,"rating":"Very High","rank":7,"rankChange":1,"score":0.958},
    "genderGap": {"year":2026,"rating":"80–89","rank":8,"rankChange":5,"score":0.819},
    "gpi": {"year":2026,"rating":"High","rank":20,"rankChange":4,"score":1.602},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":15,"rankChange":-4,"score":6.916},
    "gdi": {"year":2024,"rating":"100–149","rank":26,"score":124}
  },
  "AZ": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":181,"rankChange":0,"score":7},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":164,"rankChange":0,"score":0.05},
    "economist": {"year":2025,"rating":"Authoritarian","rank":127,"rankChange":-3,"score":2.8},
    "cpi": {"year":2025,"rating":"30–39","rank":130,"rankChange":24,"score":30},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":171,"rankChange":-4,"score":23.95},
    "hdi": {"year":2023,"rating":"High","rank":81,"rankChange":1,"score":0.789},
    "genderGap": {"year":2026,"rating":"60–69","rank":98,"rankChange":2,"score":0.697},
    "gpi": {"year":2026,"rating":"Medium","rank":110,"rankChange":-8,"score":2.142},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":102,"rankChange":4,"score":4.993}
  },
  "BA": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":113,"rankChange":0,"score":52},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":91,"rankChange":0,"score":0.34},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":85,"rankChange":1,"score":5.23},
    "cpi": {"year":2025,"rating":"30–39","rank":109,"rankChange":5,"score":34},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":90,"rankChange":-4,"score":54.29},
    "hdi": {"year":2023,"rating":"Very High","rank":74,"rankChange":-1,"score":0.804},
    "genderGap": {"year":2026,"rating":"70–79","rank":62,"rankChange":11,"score":0.723},
    "gpi": {"year":2026,"rating":"High","rank":48,"rankChange":9,"score":1.81},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":47,"rankChange":9,"score":6.381}
  },
  "BB": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":23,"rankChange":0,"score":94},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":32,"rankChange":1,"score":0.68},
    "cpi": {"year":2025,"rating":"60–69","rank":24,"rankChange":-1,"score":68},
    "hdi": {"year":2023,"rating":"Very High","rank":69,"rankChange":0,"score":0.811},
    "genderGap": {"year":2026,"rating":"70–79","rank":13,"rankChange":2,"score":0.794}
  },
  "BD": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":122,"rankChange":0,"score":45},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":133,"rankChange":14,"score":0.12},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":101,"rankChange":-3,"score":4.27},
    "cpi": {"year":2025,"rating":"20–29","rank":150,"rankChange":1,"score":24},
    "perception": {"year":2026,"rating":"Negative","rank":58,"score":-9},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":152,"rankChange":-3,"score":33.05},
    "hdi": {"year":2023,"rating":"Medium","rank":130,"rankChange":1,"score":0.685},
    "genderGap": {"year":2026,"rating":"70–79","rank":79,"rankChange":-55,"score":0.712},
    "gpi": {"year":2026,"rating":"Medium","rank":117,"rankChange":3,"score":2.226},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":127,"rankChange":7,"score":4.319},
    "gdi": {"year":2024,"rating":"50–99","rank":46,"score":80}
  },
  "BE": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":11,"rankChange":0,"score":96},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":11,"rankChange":-2,"score":0.79},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":31,"rankChange":2,"score":7.77},
    "cpi": {"year":2025,"rating":"60–69","rank":21,"rankChange":1,"score":69},
    "perception": {"year":2026,"rating":"Neutral","rank":29,"score":3},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":16,"rankChange":2,"score":81.17},
    "hdi": {"year":2023,"rating":"Very High","rank":10,"rankChange":3,"score":0.951},
    "genderGap": {"year":2026,"rating":"70–79","rank":33,"rankChange":-6,"score":0.762},
    "gpi": {"year":2026,"rating":"High","rank":21,"rankChange":-5,"score":1.608},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":14,"rankChange":0,"score":6.926},
    "gdi": {"year":2024,"rating":"100–149","rank":32,"score":113}
  },
  "BF": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":148,"rankChange":0,"score":25},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":141,"rankChange":-10,"score":0.1},
    "economist": {"year":2025,"rating":"Authoritarian","rank":137,"rankChange":-2,"score":2.55},
    "cpi": {"year":2025,"rating":"40–49","rank":84,"rankChange":-2,"score":40},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":110,"rankChange":-5,"score":48.52},
    "hdi": {"year":2023,"rating":"Low","rank":186,"rankChange":0,"score":0.459},
    "genderGap": {"year":2026,"rating":"60–69","rank":115,"rankChange":5,"score":0.676},
    "gpi": {"year":2026,"rating":"Low","rank":149,"rankChange":3,"score":2.882},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":123,"rankChange":-3,"score":4.455}
  },
  "BG": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":72,"rankChange":0,"score":77},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":67,"rankChange":-12,"score":0.5},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":61,"rankChange":-1,"score":6.34},
    "cpi": {"year":2025,"rating":"40–49","rank":84,"rankChange":-8,"score":40},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":71,"rankChange":-1,"score":60.28},
    "hdi": {"year":2023,"rating":"Very High","rank":55,"rankChange":2,"score":0.845},
    "genderGap": {"year":2026,"rating":"70–79","rank":80,"rankChange":3,"score":0.71},
    "gpi": {"year":2026,"rating":"High","rank":26,"rankChange":-4,"score":1.628},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":84,"rankChange":1,"score":5.703}
  },
  "BH": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":171,"rankChange":0,"score":12},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":157,"rankChange":0,"score":0.06},
    "economist": {"year":2025,"rating":"Authoritarian","rank":138,"rankChange":-2,"score":2.45},
    "cpi": {"year":2025,"rating":"50–59","rank":56,"rankChange":-3,"score":50},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":170,"rankChange":-13,"score":24.84},
    "hdi": {"year":2023,"rating":"Very High","rank":38,"rankChange":-5,"score":0.899},
    "genderGap": {"year":2026,"rating":"60–69","rank":105,"rankChange":-1,"score":0.689},
    "gpi": {"year":2026,"rating":"Medium","rank":108,"rankChange":0,"score":2.131},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":55,"rankChange":4,"score":6.254}
  },
  "BI": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":165,"rankChange":0,"score":15},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":159,"rankChange":-1,"score":0.06},
    "economist": {"year":2025,"rating":"Authoritarian","rank":144,"rankChange":-2,"score":2.13},
    "cpi": {"year":2025,"rating":"10–19","rank":167,"rankChange":-2,"score":17},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":119,"rankChange":6,"score":46.14},
    "hdi": {"year":2023,"rating":"Low","rank":187,"rankChange":0,"score":0.439},
    "genderGap": {"year":2026,"rating":"70–79","rank":26,"rankChange":18,"score":0.771},
    "gpi": {"year":2026,"rating":"Low","rank":129,"rankChange":6,"score":2.417}
  },
  "BJ": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":100,"rankChange":0,"score":60},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":93,"rankChange":2,"score":0.32},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":102,"rankChange":-4,"score":4.26},
    "cpi": {"year":2025,"rating":"40–49","rank":70,"rankChange":-1,"score":45},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":113,"rankChange":-21,"score":47.39},
    "hdi": {"year":2023,"rating":"Low","rank":173,"rankChange":1,"score":0.515},
    "genderGap": {"year":2026,"rating":"60–69","rank":112,"rankChange":1,"score":0.681},
    "gpi": {"year":2026,"rating":"Medium","rank":122,"rankChange":-1,"score":2.293},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":124,"rankChange":-3,"score":4.393}
  },
  "BN": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":145,"rankChange":0,"score":27},
    "cpi": {"year":2025,"rating":"60–69","rank":31,"rankChange":0,"score":63},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":96,"rankChange":1,"score":52.58},
    "hdi": {"year":2023,"rating":"Very High","rank":60,"rankChange":3,"score":0.837},
    "genderGap": {"year":2026,"rating":"60–69","rank":111,"rankChange":-4,"score":0.681},
    "gdi": {"year":2024,"rating":"Below 50","rank":60,"score":42}
  },
  "BO": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":91,"rankChange":0,"score":65},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":89,"rankChange":9,"score":0.35},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":83,"rankChange":18,"score":5.38},
    "cpi": {"year":2025,"rating":"20–29","rank":136,"rankChange":-3,"score":28},
    "perception": {"year":2026,"rating":"Negative","rank":64,"score":-11},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":91,"rankChange":2,"score":54.25},
    "hdi": {"year":2023,"rating":"High","rank":108,"rankChange":5,"score":0.733},
    "genderGap": {"year":2026,"rating":"70–79","rank":36,"rankChange":12,"score":0.758},
    "gpi": {"year":2026,"rating":"Medium","rank":92,"rankChange":-2,"score":2.054},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":78,"rankChange":-4,"score":5.835}
  },
  "BR": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":79,"rankChange":0,"score":72},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":29,"rankChange":0,"score":0.7},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":50,"rankChange":6,"score":6.76},
    "cpi": {"year":2025,"rating":"30–39","rank":107,"rankChange":0,"score":35},
    "perception": {"year":2026,"rating":"Negative","rank":67,"score":-13},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":52,"rankChange":11,"score":66.37},
    "hdi": {"year":2023,"rating":"High","rank":84,"rankChange":2,"score":0.786},
    "genderGap": {"year":2026,"rating":"70–79","rank":72,"rankChange":0,"score":0.715},
    "gpi": {"year":2026,"rating":"Medium","rank":124,"rankChange":1,"score":2.333},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":32,"rankChange":4,"score":6.634},
    "gdi": {"year":2024,"rating":"200–249","rank":10,"score":205}
  },
  "BS": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":36,"rankChange":0,"score":90},
    "cpi": {"year":2025,"rating":"60–69","rank":29,"rankChange":-1,"score":64},
    "hdi": {"year":2023,"rating":"Very High","rank":66,"rankChange":0,"score":0.82}
  },
  "BT": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":85,"rankChange":0,"score":68},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":72,"rankChange":-1,"score":0.46},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":79,"rankChange":-1,"score":5.65},
    "cpi": {"year":2025,"rating":"70–79","rank":18,"rankChange":0,"score":71},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":150,"rankChange":2,"score":33.5},
    "hdi": {"year":2023,"rating":"Medium","rank":125,"rankChange":1,"score":0.698},
    "genderGap": {"year":2026,"rating":"60–69","rank":121,"rankChange":-2,"score":0.663},
    "gpi": {"year":2026,"rating":"High","rank":16,"rankChange":2,"score":1.546},
    "gdi": {"year":2024,"rating":"Below 50","rank":66,"score":10}
  },
  "BW": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":73,"rankChange":0,"score":75},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":59,"rankChange":10,"score":0.52},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":36,"rankChange":-2,"score":7.63},
    "cpi": {"year":2025,"rating":"50–59","rank":41,"rankChange":2,"score":58},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":63,"rankChange":18,"score":62.89},
    "hdi": {"year":2023,"rating":"High","rank":111,"rankChange":1,"score":0.731},
    "genderGap": {"year":2026,"rating":"70–79","rank":63,"rankChange":-3,"score":0.722},
    "gpi": {"year":2026,"rating":"High","rank":50,"rankChange":-4,"score":1.823},
    "happiness": {"year":2026,"rating":"3.0–3.9","rank":143,"rankChange":-1,"score":3.464}
  },
  "BY": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":181,"rankChange":0,"score":7},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":172,"rankChange":0,"score":0.04},
    "economist": {"year":2025,"rating":"Authoritarian","rank":149,"rankChange":1,"score":1.99},
    "cpi": {"year":2025,"rating":"30–39","rank":124,"rankChange":-10,"score":31},
    "perception": {"year":2026,"rating":"Negative","rank":58,"score":-9},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":165,"rankChange":1,"score":27.72},
    "hdi": {"year":2023,"rating":"Very High","rank":65,"rankChange":-1,"score":0.824},
    "genderGap": {"year":2026,"rating":"70–79","rank":52,"rankChange":2,"score":0.74},
    "gpi": {"year":2026,"rating":"Medium","rank":115,"rankChange":1,"score":2.216}
  },
  "BZ": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":48,"rankChange":0,"score":88},
    "cpi": {"year":2025,"rating":"30–39","rank":104,"rankChange":0,"score":36},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":66,"rankChange":-19,"score":61.66},
    "hdi": {"year":2023,"rating":"High","rank":115,"rankChange":3,"score":0.721},
    "genderGap": {"year":2026,"rating":"70–79","rank":92,"rankChange":-3,"score":0.701},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":27,"rankChange":-2,"score":6.711}
  },
  "CA": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":5,"rankChange":0,"score":97},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":23,"rankChange":2,"score":0.74},
    "economist": {"year":2025,"rating":"Full democracy","rank":9,"rankChange":4,"score":9.08},
    "cpi": {"year":2025,"rating":"70–79","rank":16,"rankChange":-1,"score":75},
    "perception": {"year":2026,"rating":"Positive","rank":10,"score":13},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":20,"rankChange":1,"score":78.76},
    "hdi": {"year":2023,"rating":"Very High","rank":16,"rankChange":0,"score":0.939},
    "genderGap": {"year":2026,"rating":"70–79","rank":24,"rankChange":8,"score":0.777},
    "gpi": {"year":2026,"rating":"High","rank":14,"rankChange":1,"score":1.525},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":25,"rankChange":-7,"score":6.741},
    "gdi": {"year":2024,"rating":"150–199","rank":15,"score":157}
  },
  "CD": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":159,"rankChange":0,"score":18},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":134,"rankChange":-1,"score":0.12},
    "economist": {"year":2025,"rating":"Authoritarian","rank":156,"rankChange":-2,"score":1.92},
    "cpi": {"year":2025,"rating":"20–29","rank":163,"rankChange":0,"score":20},
    "perception": {"year":2026,"rating":"Neutral","rank":49,"score":-5},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":130,"rankChange":3,"score":42.16},
    "hdi": {"year":2023,"rating":"Low","rank":171,"rankChange":1,"score":0.522},
    "genderGap": {"year":2026,"rating":"50–59","rank":142,"rankChange":1,"score":0.595},
    "gpi": {"year":2026,"rating":"Very Low","rank":161,"rankChange":0,"score":3.189},
    "happiness": {"year":2026,"rating":"3.0–3.9","rank":140,"rankChange":1,"score":3.761}
  },
  "CF": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":185,"rankChange":0,"score":5},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":143,"rankChange":3,"score":0.1},
    "economist": {"year":2025,"rating":"Authoritarian","rank":164,"rankChange":-2,"score":1.18},
    "cpi": {"year":2025,"rating":"20–29","rank":150,"rankChange":-1,"score":24},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":81,"rankChange":-9,"score":56.73},
    "hdi": {"year":2023,"rating":"Low","rank":191,"score":0.414},
    "gpi": {"year":2026,"rating":"Very Low","rank":150,"rankChange":1,"score":2.906}
  },
  "CG": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":163,"rankChange":0,"score":17},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":135,"rankChange":2,"score":0.12},
    "economist": {"year":2025,"rating":"Authoritarian","rank":128,"rankChange":-2,"score":2.79},
    "cpi": {"year":2025,"rating":"20–29","rank":153,"rankChange":-2,"score":23},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":68,"rankChange":3,"score":61.21},
    "hdi": {"year":2023,"rating":"Medium","rank":138,"rankChange":0,"score":0.649},
    "gpi": {"year":2026,"rating":"Medium","rank":120,"rankChange":-15,"score":2.256},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":122,"rankChange":-22,"score":4.456}
  },
  "CH": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":11,"rankChange":0,"score":96},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":4,"rankChange":1,"score":0.84},
    "economist": {"year":2025,"rating":"Full democracy","rank":8,"rankChange":-3,"score":9.32},
    "cpi": {"year":2025,"rating":"80–89","rank":6,"rankChange":-1,"score":80},
    "perception": {"year":2026,"rating":"Very Positive","rank":5,"score":19},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":8,"rankChange":1,"score":84.83},
    "hdi": {"year":2023,"rating":"Very High","rank":2,"rankChange":0,"score":0.97},
    "genderGap": {"year":2026,"rating":"70–79","rank":27,"rankChange":-10,"score":0.771},
    "gpi": {"year":2026,"rating":"Very High","rank":3,"rankChange":-1,"score":1.363},
    "happiness": {"year":2026,"rating":"7.0–7.9","rank":10,"rankChange":3,"score":7.018},
    "gdi": {"year":2024,"rating":"100–149","rank":19,"score":141}
  },
  "CI": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":117,"rankChange":0,"score":49},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":109,"rankChange":-3,"score":0.23},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":104,"rankChange":-1,"score":4.24},
    "cpi": {"year":2025,"rating":"40–49","rank":76,"rankChange":-7,"score":43},
    "perception": {"year":2026,"rating":"Negative","rank":58,"score":-9},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":54,"rankChange":10,"score":66.27},
    "hdi": {"year":2023,"rating":"Medium","rank":157,"rankChange":5,"score":0.582},
    "genderGap": {"year":2026,"rating":"60–69","rank":122,"rankChange":5,"score":0.66},
    "gpi": {"year":2026,"rating":"Medium","rank":93,"rankChange":-9,"score":2.061},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":98,"rankChange":0,"score":5.148}
  },
  "CL": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":18,"rankChange":0,"score":95},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":16,"rankChange":-3,"score":0.78},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":27,"rankChange":1,"score":7.97},
    "cpi": {"year":2025,"rating":"60–69","rank":31,"rankChange":1,"score":63},
    "perception": {"year":2026,"rating":"Negative","rank":62,"score":-10},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":70,"rankChange":-1,"score":60.84},
    "hdi": {"year":2023,"rating":"Very High","rank":45,"rankChange":0,"score":0.878},
    "genderGap": {"year":2026,"rating":"70–79","rank":29,"rankChange":-7,"score":0.769},
    "gpi": {"year":2026,"rating":"High","rank":52,"rankChange":8,"score":1.826},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":50,"rankChange":-5,"score":6.302},
    "gdi": {"year":2024,"rating":"100–149","rank":27,"score":121}
  },
  "CM": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":165,"rankChange":0,"score":15},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":138,"rankChange":-6,"score":0.11},
    "economist": {"year":2025,"rating":"Authoritarian","rank":136,"rankChange":-2,"score":2.56},
    "cpi": {"year":2025,"rating":"20–29","rank":142,"rankChange":-2,"score":26},
    "perception": {"year":2026,"rating":"Very Negative","rank":92,"score":-23},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":133,"rankChange":-2,"score":40.88},
    "hdi": {"year":2023,"rating":"Medium","rank":155,"rankChange":1,"score":0.588},
    "genderGap": {"year":2026,"rating":"70–79","rank":90,"rankChange":3,"score":0.703},
    "gpi": {"year":2026,"rating":"Low","rank":137,"rankChange":5,"score":2.634},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":100,"rankChange":4,"score":5.083}
  },
  "CN": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":178,"rankChange":0,"score":9},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":171,"rankChange":0,"score":0.04},
    "economist": {"year":2025,"rating":"Authoritarian","rank":142,"rankChange":1,"score":2.24},
    "cpi": {"year":2025,"rating":"40–49","rank":76,"rankChange":0,"score":43},
    "perception": {"year":2026,"rating":"Positive","rank":9,"score":14},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":178,"rankChange":0,"score":13.85},
    "hdi": {"year":2023,"rating":"High","rank":78,"rankChange":-4,"score":0.797},
    "genderGap": {"year":2026,"rating":"60–69","rank":96,"rankChange":7,"score":0.699},
    "gpi": {"year":2026,"rating":"Medium","rank":118,"rankChange":-11,"score":2.231},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":65,"rankChange":3,"score":6.074},
    "gdi": {"year":2024,"rating":"250+","rank":1,"score":274}
  },
  "CO": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":81,"rankChange":0,"score":70},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":53,"rankChange":-1,"score":0.56},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":73,"rankChange":-14,"score":6.04},
    "cpi": {"year":2025,"rating":"30–39","rank":99,"rankChange":-7,"score":37},
    "perception": {"year":2026,"rating":"Negative","rank":52,"score":-6},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":102,"rankChange":13,"score":51.66},
    "hdi": {"year":2023,"rating":"High","rank":83,"rankChange":2,"score":0.788},
    "genderGap": {"year":2026,"rating":"70–79","rank":34,"rankChange":7,"score":0.761},
    "gpi": {"year":2026,"rating":"Low","rank":141,"rankChange":-4,"score":2.735},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":68,"rankChange":-7,"score":6.04},
    "gdi": {"year":2024,"rating":"100–149","rank":30,"score":117}
  },
  "CR": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":33,"rankChange":0,"score":91},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":7,"rankChange":3,"score":0.81},
    "economist": {"year":2025,"rating":"Full democracy","rank":19,"rankChange":-2,"score":8.29},
    "cpi": {"year":2025,"rating":"50–59","rank":46,"rankChange":-4,"score":56},
    "perception": {"year":2026,"rating":"Positive","rank":17,"score":9},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":38,"rankChange":-2,"score":72.35},
    "hdi": {"year":2023,"rating":"Very High","rank":62,"rankChange":3,"score":0.833},
    "genderGap": {"year":2026,"rating":"70–79","rank":21,"rankChange":-5,"score":0.779},
    "gpi": {"year":2026,"rating":"High","rank":62,"rankChange":-14,"score":1.86},
    "happiness": {"year":2026,"rating":"7.0–7.9","rank":4,"rankChange":2,"score":7.439},
    "gdi": {"year":2024,"rating":"50–99","rank":51,"score":52}
  },
  "CU": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":175,"rankChange":0,"score":10},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":161,"rankChange":-1,"score":0.06},
    "economist": {"year":2025,"rating":"Authoritarian","rank":135,"rankChange":-2,"score":2.58},
    "cpi": {"year":2025,"rating":"40–49","rank":84,"rankChange":-2,"score":40},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":160,"rankChange":5,"score":29.22},
    "hdi": {"year":2023,"rating":"High","rank":97,"rankChange":-6,"score":0.762},
    "gpi": {"year":2026,"rating":"Medium","rank":109,"rankChange":-11,"score":2.139}
  },
  "CV": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":28,"rankChange":0,"score":92},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":40,"rankChange":-1,"score":0.63},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":37,"rankChange":-1,"score":7.58},
    "cpi": {"year":2025,"rating":"60–69","rank":35,"rankChange":0,"score":62},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":40,"rankChange":-10,"score":71.98},
    "hdi": {"year":2023,"rating":"Medium","rank":135,"rankChange":0,"score":0.668},
    "genderGap": {"year":2026,"rating":"70–79","rank":69,"rankChange":-39,"score":0.721}
  },
  "CY": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":33,"rankChange":0,"score":91},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":35,"rankChange":1,"score":0.66},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":40,"rankChange":-1,"score":7.45},
    "cpi": {"year":2025,"rating":"50–59","rank":49,"rankChange":-3,"score":55},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":80,"rankChange":-3,"score":56.91},
    "hdi": {"year":2023,"rating":"Very High","rank":32,"rankChange":-1,"score":0.913},
    "genderGap": {"year":2026,"rating":"70–79","rank":78,"rankChange":4,"score":0.712},
    "gpi": {"year":2026,"rating":"Medium","rank":80,"rankChange":-9,"score":1.967},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":62,"rankChange":5,"score":6.126}
  },
  "CZ": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":18,"rankChange":0,"score":95},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":10,"rankChange":-3,"score":0.79},
    "economist": {"year":2025,"rating":"Full democracy","rank":23,"rankChange":-1,"score":8.15},
    "cpi": {"year":2025,"rating":"50–59","rank":39,"rankChange":7,"score":59},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":11,"rankChange":-1,"score":83.01},
    "hdi": {"year":2023,"rating":"Very High","rank":29,"rankChange":-1,"score":0.915},
    "genderGap": {"year":2026,"rating":"70–79","rank":77,"rankChange":25,"score":0.712},
    "gpi": {"year":2026,"rating":"High","rank":13,"rankChange":-1,"score":1.517},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":20,"rankChange":0,"score":6.821},
    "gdi": {"year":2024,"rating":"100–149","rank":29,"score":120}
  },
  "DE": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":18,"rankChange":0,"score":95},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":15,"rankChange":1,"score":0.78},
    "economist": {"year":2025,"rating":"Full democracy","rank":16,"rankChange":-4,"score":8.73},
    "cpi": {"year":2025,"rating":"70–79","rank":10,"rankChange":5,"score":77},
    "perception": {"year":2026,"rating":"Positive","rank":20,"score":8},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":14,"rankChange":-3,"score":82.17},
    "hdi": {"year":2023,"rating":"Very High","rank":5,"rankChange":1,"score":0.959},
    "genderGap": {"year":2026,"rating":"80–89","rank":9,"rankChange":0,"score":0.817},
    "gpi": {"year":2026,"rating":"High","rank":28,"rankChange":-5,"score":1.657},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":17,"rankChange":5,"score":6.882},
    "gdi": {"year":2024,"rating":"200–249","rank":8,"score":217}
  },
  "DJ": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":150,"rankChange":0,"score":24},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":132,"rankChange":7,"score":0.12},
    "economist": {"year":2025,"rating":"Authoritarian","rank":131,"rankChange":-1,"score":2.7},
    "cpi": {"year":2025,"rating":"30–39","rank":124,"rankChange":3,"score":31},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":167,"rankChange":1,"score":25.04},
    "hdi": {"year":2023,"rating":"Low","rank":175,"rankChange":1,"score":0.513},
    "gpi": {"year":2026,"rating":"Medium","rank":105,"rankChange":6,"score":2.098}
  },
  "DK": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":5,"rankChange":0,"score":97},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":1,"rankChange":0,"score":0.88},
    "economist": {"year":2025,"rating":"Full democracy","rank":3,"rankChange":4,"score":9.42},
    "cpi": {"year":2025,"rating":"80–89","rank":1,"rankChange":0,"score":89},
    "perception": {"year":2026,"rating":"Very Positive","rank":3,"score":21},
    "rsfPress": {"year":2026,"rating":"Good","rank":4,"rankChange":2,"score":88.47},
    "hdi": {"year":2023,"rating":"Very High","rank":4,"rankChange":0,"score":0.962},
    "genderGap": {"year":2026,"rating":"80–89","rank":11,"rankChange":3,"score":0.81},
    "gpi": {"year":2026,"rating":"High","rank":11,"rankChange":-2,"score":1.504},
    "happiness": {"year":2026,"rating":"7.0–7.9","rank":3,"rankChange":-1,"score":7.539},
    "gdi": {"year":2024,"rating":"50–99","rank":43,"score":90}
  },
  "DM": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":28,"rankChange":0,"score":92},
    "cpi": {"year":2025,"rating":"60–69","rank":37,"rankChange":-1,"score":60},
    "hdi": {"year":2023,"rating":"High","rank":98,"rankChange":0,"score":0.761}
  },
  "DO": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":85,"rankChange":0,"score":68},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":65,"rankChange":0,"score":0.51},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":51,"rankChange":0,"score":6.75},
    "cpi": {"year":2025,"rating":"30–39","rank":99,"rankChange":5,"score":37},
    "perception": {"year":2026,"rating":"Negative","rank":70,"score":-14},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":44,"rankChange":-1,"score":69.73},
    "hdi": {"year":2023,"rating":"High","rank":89,"rankChange":-2,"score":0.776},
    "genderGap": {"year":2026,"rating":"70–79","rank":67,"rankChange":-6,"score":0.721},
    "gpi": {"year":2026,"rating":"Medium","rank":89,"rankChange":-10,"score":2.038},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":64,"rankChange":12,"score":6.093}
  },
  "DZ": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":139,"rankChange":0,"score":31},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":131,"rankChange":4,"score":0.13},
    "economist": {"year":2025,"rating":"Authoritarian","rank":110,"rankChange":-2,"score":3.55},
    "cpi": {"year":2025,"rating":"30–39","rank":109,"rankChange":-2,"score":34},
    "perception": {"year":2026,"rating":"Positive","rank":23,"score":7},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":145,"rankChange":-19,"score":37.38},
    "hdi": {"year":2023,"rating":"High","rank":96,"rankChange":0,"score":0.763},
    "genderGap": {"year":2026,"rating":"60–69","rank":141,"rankChange":0,"score":0.618},
    "gpi": {"year":2026,"rating":"Medium","rank":91,"rankChange":-5,"score":2.053},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":83,"rankChange":1,"score":5.714}
  },
  "EC": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":91,"rankChange":0,"score":65},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":79,"rankChange":-6,"score":0.39},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":86,"rankChange":-2,"score":5.2},
    "cpi": {"year":2025,"rating":"30–39","rank":116,"rankChange":5,"score":33},
    "perception": {"year":2026,"rating":"Negative","rank":70,"score":-14},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":125,"rankChange":-31,"score":44.37},
    "hdi": {"year":2023,"rating":"High","rank":88,"rankChange":1,"score":0.777},
    "genderGap": {"year":2026,"rating":"70–79","rank":16,"rankChange":9,"score":0.79},
    "gpi": {"year":2026,"rating":"Low","rank":135,"rankChange":-3,"score":2.539},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":59,"rankChange":3,"score":6.144}
  },
  "EE": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":11,"rankChange":0,"score":96},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":5,"rankChange":-3,"score":0.84},
    "economist": {"year":2025,"rating":"Full democracy","rank":24,"rankChange":-4,"score":8.07},
    "cpi": {"year":2025,"rating":"70–79","rank":12,"rankChange":1,"score":76},
    "rsfPress": {"year":2026,"rating":"Good","rank":3,"rankChange":-1,"score":88.54},
    "hdi": {"year":2023,"rating":"Very High","rank":36,"rankChange":-3,"score":0.905},
    "genderGap": {"year":2026,"rating":"70–79","rank":19,"rankChange":-8,"score":0.782},
    "gpi": {"year":2026,"rating":"High","rank":25,"rankChange":-5,"score":1.623},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":46,"rankChange":-7,"score":6.41},
    "gdi": {"year":2024,"rating":"Below 50","rank":54,"score":46}
  },
  "EG": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":159,"rankChange":0,"score":18},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":136,"rankChange":-2,"score":0.12},
    "economist": {"year":2025,"rating":"Authoritarian","rank":128,"rankChange":-2,"score":2.79},
    "cpi": {"year":2025,"rating":"30–39","rank":130,"rankChange":0,"score":30},
    "perception": {"year":2026,"rating":"Positive","rank":23,"score":7},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":169,"rankChange":1,"score":24.92},
    "hdi": {"year":2023,"rating":"High","rank":100,"rankChange":0,"score":0.754},
    "genderGap": {"year":2026,"rating":"60–69","rank":138,"rankChange":1,"score":0.632},
    "gpi": {"year":2026,"rating":"Medium","rank":113,"rankChange":2,"score":2.186},
    "happiness": {"year":2026,"rating":"3.0–3.9","rank":139,"rankChange":-4,"score":3.862}
  },
  "ER": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":189,"rankChange":0,"score":3},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":179,"rankChange":0,"score":0.01},
    "economist": {"year":2025,"rating":"Authoritarian","rank":150,"rankChange":1,"score":1.97},
    "cpi": {"year":2025,"rating":"10–19","rank":177,"rankChange":-4,"score":13},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":180,"rankChange":0,"score":10.24},
    "hdi": {"year":2023,"rating":"Low","rank":178,"rankChange":0,"score":0.503},
    "gpi": {"year":2026,"rating":"Low","rank":128,"rankChange":3,"score":2.412}
  },
  "ES": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":36,"rankChange":0,"score":90},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":21,"rankChange":5,"score":0.74},
    "economist": {"year":2025,"rating":"Full democracy","rank":22,"rankChange":-2,"score":8.2},
    "cpi": {"year":2025,"rating":"50–59","rank":49,"rankChange":-3,"score":55},
    "perception": {"year":2026,"rating":"Neutral","rank":43,"score":-3},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":29,"rankChange":-6,"score":75.42},
    "hdi": {"year":2023,"rating":"Very High","rank":28,"rankChange":0,"score":0.918},
    "genderGap": {"year":2026,"rating":"70–79","rank":12,"rankChange":0,"score":0.796},
    "gpi": {"year":2026,"rating":"High","rank":27,"rankChange":4,"score":1.654},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":41,"rankChange":-3,"score":6.54},
    "gdi": {"year":2024,"rating":"150–199","rank":12,"score":190}
  },
  "ET": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":159,"rankChange":0,"score":18},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":145,"rankChange":4,"score":0.1},
    "economist": {"year":2025,"rating":"Authoritarian","rank":119,"rankChange":-5,"score":3.13},
    "cpi": {"year":2025,"rating":"30–39","rank":96,"rankChange":3,"score":38},
    "perception": {"year":2026,"rating":"Neutral","rank":29,"score":3},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":148,"rankChange":-3,"score":34.66},
    "hdi": {"year":2023,"rating":"Low","rank":180,"rankChange":1,"score":0.497},
    "gpi": {"year":2026,"rating":"Low","rank":138,"rankChange":1,"score":2.648},
    "happiness": {"year":2026,"rating":"3.0–3.9","rank":135,"rankChange":-3,"score":3.985}
  },
  "FI": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":1,"rankChange":0,"score":100},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":8,"rankChange":6,"score":0.81},
    "economist": {"year":2025,"rating":"Full democracy","rank":5,"rankChange":1,"score":9.37},
    "cpi": {"year":2025,"rating":"80–89","rank":2,"rankChange":0,"score":88},
    "perception": {"year":2026,"rating":"Very Positive","rank":4,"score":20},
    "rsfPress": {"year":2026,"rating":"Good","rank":6,"rankChange":-1,"score":86.22},
    "hdi": {"year":2023,"rating":"Very High","rank":12,"rankChange":-1,"score":0.948},
    "genderGap": {"year":2026,"rating":"80–89","rank":2,"rankChange":0,"score":0.872},
    "gpi": {"year":2026,"rating":"High","rank":9,"rankChange":1,"score":1.478},
    "happiness": {"year":2026,"rating":"7.0–7.9","rank":1,"rankChange":0,"score":7.764},
    "gdi": {"year":2024,"rating":"50–99","rank":43,"score":90}
  },
  "FJ": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":82,"rankChange":0,"score":69},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":78,"rankChange":-1,"score":0.4},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":82,"rankChange":-2,"score":5.39},
    "cpi": {"year":2025,"rating":"50–59","rank":49,"rankChange":1,"score":55},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":24,"rankChange":16,"score":76.76},
    "hdi": {"year":2023,"rating":"High","rank":111,"rankChange":3,"score":0.731},
    "genderGap": {"year":2026,"rating":"60–69","rank":130,"rankChange":-4,"score":0.646}
  },
  "FM": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":28,"rankChange":0,"score":92},
    "hdi": {"year":2023,"rating":"Medium","rank":149,"rankChange":-2,"score":0.615}
  },
  "FR": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":40,"rankChange":0,"score":89},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":9,"rankChange":2,"score":0.8},
    "economist": {"year":2025,"rating":"Full democracy","rank":26,"rankChange":-1,"score":8.05},
    "cpi": {"year":2025,"rating":"60–69","rank":27,"rankChange":-2,"score":66},
    "perception": {"year":2026,"rating":"Very Negative","rank":83,"score":-20},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":25,"rankChange":0,"score":76.68},
    "hdi": {"year":2023,"rating":"Very High","rank":26,"rankChange":1,"score":0.92},
    "genderGap": {"year":2026,"rating":"70–79","rank":22,"rankChange":13,"score":0.779},
    "gpi": {"year":2026,"rating":"Medium","rank":99,"rankChange":3,"score":2.083},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":35,"rankChange":-2,"score":6.586},
    "gdi": {"year":2024,"rating":"200–249","rank":5,"score":249}
  },
  "GA": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":156,"rankChange":0,"score":21},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":114,"rankChange":9,"score":0.18},
    "economist": {"year":2025,"rating":"Authoritarian","rank":111,"rankChange":30,"score":3.49},
    "cpi": {"year":2025,"rating":"20–29","rank":135,"rankChange":0,"score":29},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":43,"rankChange":-2,"score":70.57},
    "hdi": {"year":2023,"rating":"High","rank":108,"rankChange":3,"score":0.733},
    "genderGap": {"year":2026,"rating":"70–79","rank":68,"rankChange":23,"score":0.721},
    "gpi": {"year":2026,"rating":"Medium","rank":100,"rankChange":17,"score":2.086},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":96,"rankChange":1,"score":5.167}
  },
  "GB": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":28,"rankChange":0,"score":92},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":30,"rankChange":-6,"score":0.69},
    "economist": {"year":2025,"rating":"Full democracy","rank":18,"rankChange":-2,"score":8.34},
    "cpi": {"year":2025,"rating":"70–79","rank":20,"rankChange":0,"score":70},
    "perception": {"year":2026,"rating":"Neutral","rank":43,"score":-3},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":18,"rankChange":2,"score":79.45},
    "hdi": {"year":2023,"rating":"Very High","rank":13,"rankChange":-2,"score":0.946},
    "genderGap": {"year":2026,"rating":"80–89","rank":5,"rankChange":-1,"score":0.842},
    "gpi": {"year":2026,"rating":"High","rank":39,"rankChange":-7,"score":1.73},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":29,"rankChange":-6,"score":6.694},
    "gdi": {"year":2024,"rating":"200–249","rank":7,"score":225}
  },
  "GD": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":40,"rankChange":0,"score":89},
    "cpi": {"year":2025,"rating":"50–59","rank":46,"rankChange":0,"score":56},
    "hdi": {"year":2023,"rating":"High","rank":80,"rankChange":0,"score":0.791}
  },
  "GE": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":108,"rankChange":0,"score":55},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":101,"rankChange":-8,"score":0.28},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":99,"rankChange":-7,"score":4.36},
    "cpi": {"year":2025,"rating":"50–59","rank":56,"rankChange":-3,"score":50},
    "perception": {"year":2026,"rating":"Negative","rank":53,"score":-7},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":135,"rankChange":-21,"score":40.77},
    "hdi": {"year":2023,"rating":"Very High","rank":57,"rankChange":-2,"score":0.844},
    "genderGap": {"year":2026,"rating":"70–79","rank":60,"rankChange":3,"score":0.727},
    "gpi": {"year":2026,"rating":"Medium","rank":94,"rankChange":1,"score":2.066},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":91,"rankChange":0,"score":5.517}
  },
  "GH": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":67,"rankChange":0,"score":80},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":45,"rankChange":5,"score":0.61},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":65,"rankChange":-1,"score":6.24},
    "cpi": {"year":2025,"rating":"40–49","rank":76,"rankChange":4,"score":43},
    "perception": {"year":2026,"rating":"Very Positive","rank":6,"score":17},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":39,"rankChange":13,"score":72.2},
    "hdi": {"year":2023,"rating":"Medium","rank":143,"rankChange":1,"score":0.628},
    "genderGap": {"year":2026,"rating":"70–79","rank":56,"rankChange":32,"score":0.732},
    "gpi": {"year":2026,"rating":"Medium","rank":76,"rankChange":-2,"score":1.943},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":115,"rankChange":10,"score":4.554}
  },
  "GM": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":116,"rankChange":0,"score":50},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":58,"rankChange":1,"score":0.52},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":97,"rankChange":0,"score":4.47},
    "cpi": {"year":2025,"rating":"30–39","rank":99,"rankChange":-3,"score":37},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":46,"rankChange":12,"score":69.42},
    "hdi": {"year":2023,"rating":"Low","rank":170,"rankChange":0,"score":0.524},
    "genderGap": {"year":2026,"rating":"60–69","rank":123,"rankChange":-9,"score":0.66},
    "gpi": {"year":2026,"rating":"High","rank":56,"rankChange":5,"score":1.837},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":128,"rankChange":-11,"score":4.306}
  },
  "GN": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":142,"rankChange":0,"score":30},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":150,"rankChange":4,"score":0.1},
    "economist": {"year":2025,"rating":"Authoritarian","rank":143,"rankChange":4,"score":2.15},
    "cpi": {"year":2025,"rating":"20–29","rank":142,"rankChange":-9,"score":26},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":111,"rankChange":-8,"score":48.45},
    "hdi": {"year":2023,"rating":"Low","rank":179,"rankChange":0,"score":0.5},
    "gpi": {"year":2026,"rating":"Medium","rank":116,"rankChange":2,"score":2.22},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":113,"rankChange":-11,"score":4.609}
  },
  "GQ": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":185,"rankChange":0,"score":5},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":166,"rankChange":-1,"score":0.05},
    "economist": {"year":2025,"rating":"Authoritarian","rank":156,"rankChange":-2,"score":1.92},
    "cpi": {"year":2025,"rating":"10–19","rank":172,"rankChange":1,"score":15},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":94,"rankChange":24,"score":52.79},
    "hdi": {"year":2023,"rating":"Medium","rank":133,"rankChange":-1,"score":0.674},
    "gpi": {"year":2026,"rating":"High","rank":38,"rankChange":20,"score":1.729}
  },
  "GR": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":51,"rankChange":0,"score":85},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":52,"rankChange":-3,"score":0.57},
    "economist": {"year":2025,"rating":"Full democracy","rank":24,"rankChange":0,"score":8.07},
    "cpi": {"year":2025,"rating":"50–59","rank":56,"rankChange":3,"score":50},
    "perception": {"year":2026,"rating":"Very Negative","rank":81,"score":-18},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":86,"rankChange":3,"score":55.05},
    "hdi": {"year":2023,"rating":"Very High","rank":34,"rankChange":2,"score":0.908},
    "genderGap": {"year":2026,"rating":"70–79","rank":75,"rankChange":2,"score":0.714},
    "gpi": {"year":2026,"rating":"High","rank":53,"rankChange":2,"score":1.828},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":85,"rankChange":-4,"score":5.697},
    "gdi": {"year":2024,"rating":"100–149","rank":22,"score":134}
  },
  "GT": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":118,"rankChange":0,"score":48},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":57,"rankChange":9,"score":0.52},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":94,"rankChange":1,"score":4.65},
    "cpi": {"year":2025,"rating":"20–29","rank":142,"rankChange":4,"score":26},
    "perception": {"year":2026,"rating":"Very Negative","rank":85,"score":-21},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":128,"rankChange":10,"score":43.21},
    "hdi": {"year":2023,"rating":"Medium","rank":137,"rankChange":-1,"score":0.662},
    "genderGap": {"year":2026,"rating":"70–79","rank":50,"rankChange":31,"score":0.74},
    "gpi": {"year":2026,"rating":"Medium","rank":88,"rankChange":-6,"score":2.025},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":42,"rankChange":2,"score":6.533}
  },
  "GW": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":127,"rankChange":0,"score":41},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":149,"rankChange":-23,"score":0.1},
    "economist": {"year":2025,"rating":"Authoritarian","rank":162,"rankChange":-14,"score":1.37},
    "cpi": {"year":2025,"rating":"20–29","rank":161,"rankChange":-3,"score":21},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":100,"rankChange":10,"score":51.99},
    "hdi": {"year":2023,"rating":"Low","rank":174,"rankChange":1,"score":0.514},
    "gpi": {"year":2026,"rating":"Medium","rank":85,"rankChange":7,"score":2.012}
  },
  "GY": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":76,"rankChange":0,"score":74},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":92,"rankChange":5,"score":0.33},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":71,"rankChange":-3,"score":6.09},
    "cpi": {"year":2025,"rating":"40–49","rank":84,"rankChange":8,"score":40},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":76,"rankChange":-3,"score":59.58},
    "hdi": {"year":2023,"rating":"High","rank":89,"rankChange":6,"score":0.776},
    "genderGap": {"year":2026,"rating":"70–79","rank":35,"rankChange":-4,"score":0.759},
    "gpi": {"year":2026,"rating":"Medium","rank":103,"rankChange":-12,"score":2.093}
  },
  "HN": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":118,"rankChange":0,"score":48},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":82,"rankChange":1,"score":0.38},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":92,"rankChange":-4,"score":4.87},
    "cpi": {"year":2025,"rating":"20–29","rank":157,"rankChange":-3,"score":22},
    "perception": {"year":2026,"rating":"Negative","rank":64,"score":-11},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":132,"rankChange":10,"score":41.02},
    "hdi": {"year":2023,"rating":"Medium","rank":139,"rankChange":0,"score":0.645},
    "genderGap": {"year":2026,"rating":"70–79","rank":51,"rankChange":16,"score":0.74},
    "gpi": {"year":2026,"rating":"Medium","rank":96,"rankChange":13,"score":2.075},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":63,"rankChange":0,"score":6.096}
  },
  "HR": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":59,"rankChange":0,"score":82},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":46,"rankChange":-1,"score":0.59},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":57,"rankChange":-2,"score":6.5},
    "cpi": {"year":2025,"rating":"40–49","rank":63,"rankChange":0,"score":47},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":53,"rankChange":7,"score":66.31},
    "hdi": {"year":2023,"rating":"Very High","rank":41,"rankChange":-1,"score":0.889},
    "genderGap": {"year":2026,"rating":"70–79","rank":48,"rankChange":16,"score":0.744},
    "gpi": {"year":2026,"rating":"High","rank":23,"rankChange":2,"score":1.619},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":70,"rankChange":2,"score":6.009}
  },
  "HT": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":150,"rankChange":0,"score":24},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":146,"rankChange":-2,"score":0.1},
    "economist": {"year":2025,"rating":"Authoritarian","rank":125,"rankChange":4,"score":2.81},
    "cpi": {"year":2025,"rating":"10–19","rank":169,"rankChange":-1,"score":16},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":107,"rankChange":4,"score":50.32},
    "hdi": {"year":2023,"rating":"Medium","rank":166,"rankChange":0,"score":0.554},
    "gpi": {"year":2026,"rating":"Low","rank":142,"rankChange":-1,"score":2.755}
  },
  "HU": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":91,"rankChange":0,"score":65},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":94,"rankChange":0,"score":0.32},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":55,"rankChange":-2,"score":6.58},
    "cpi": {"year":2025,"rating":"40–49","rank":84,"rankChange":-2,"score":40},
    "perception": {"year":2026,"rating":"Neutral","rank":36,"score":-1},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":74,"rankChange":-6,"score":59.85},
    "hdi": {"year":2023,"rating":"Very High","rank":46,"rankChange":0,"score":0.87},
    "genderGap": {"year":2026,"rating":"70–79","rank":85,"rankChange":20,"score":0.707},
    "gpi": {"year":2026,"rating":"High","rank":15,"rankChange":-1,"score":1.538},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":74,"rankChange":-5,"score":5.937},
    "gdi": {"year":2024,"rating":"100–149","rank":20,"score":140}
  },
  "ID": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":106,"rankChange":0,"score":56},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":99,"rankChange":-7,"score":0.3},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":60,"rankChange":-2,"score":6.37},
    "cpi": {"year":2025,"rating":"30–39","rank":109,"rankChange":-10,"score":34},
    "perception": {"year":2026,"rating":"Very Negative","rank":85,"score":-21},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":129,"rankChange":-2,"score":43.02},
    "hdi": {"year":2023,"rating":"High","rank":113,"rankChange":1,"score":0.728},
    "genderGap": {"year":2026,"rating":"60–69","rank":106,"rankChange":-9,"score":0.687},
    "gpi": {"year":2026,"rating":"Medium","rank":69,"rankChange":-3,"score":1.918},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":87,"rankChange":-4,"score":5.617},
    "gdi": {"year":2024,"rating":"100–149","rank":23,"score":130}
  },
  "IE": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":5,"rankChange":0,"score":97},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":6,"rankChange":0,"score":0.82},
    "economist": {"year":2025,"rating":"Full democracy","rank":7,"rankChange":1,"score":9.33},
    "cpi": {"year":2025,"rating":"70–79","rank":12,"rankChange":-2,"score":76},
    "perception": {"year":2026,"rating":"Neutral","rank":32,"score":2},
    "rsfPress": {"year":2026,"rating":"Good","rank":7,"rankChange":0,"score":85.93},
    "hdi": {"year":2023,"rating":"Very High","rank":11,"rankChange":-1,"score":0.949},
    "genderGap": {"year":2026,"rating":"80–89","rank":10,"rankChange":0,"score":0.814},
    "gpi": {"year":2026,"rating":"Very High","rank":5,"rankChange":-1,"score":1.371},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":13,"rankChange":2,"score":6.928},
    "gdi": {"year":2024,"rating":"50–99","rank":38,"score":98}
  },
  "IL": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":77,"rankChange":0,"score":73},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":48,"rankChange":-2,"score":0.59},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":30,"rankChange":0,"score":7.8},
    "cpi": {"year":2025,"rating":"60–69","rank":35,"rankChange":-5,"score":62},
    "perception": {"year":2026,"rating":"Neutral","rank":41,"score":-2},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":116,"rankChange":-4,"score":46.46},
    "hdi": {"year":2023,"rating":"Very High","rank":27,"rankChange":-4,"score":0.919},
    "genderGap": {"year":2026,"rating":"70–79","rank":71,"rankChange":5,"score":0.717},
    "gpi": {"year":2026,"rating":"Very Low","rank":159,"rankChange":1,"score":3.124},
    "happiness": {"year":2026,"rating":"7.0–7.9","rank":8,"rankChange":0,"score":7.187},
    "gdi": {"year":2024,"rating":"100–149","rank":34,"score":107}
  },
  "IN": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":96,"rankChange":0,"score":63},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":105,"rankChange":-4,"score":0.26},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":47,"rankChange":-7,"score":6.96},
    "cpi": {"year":2025,"rating":"30–39","rank":91,"rankChange":5,"score":39},
    "perception": {"year":2026,"rating":"Very Positive","rank":8,"score":15},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":157,"rankChange":-6,"score":31.96},
    "hdi": {"year":2023,"rating":"Medium","rank":130,"rankChange":3,"score":0.685},
    "genderGap": {"year":2026,"rating":"60–69","rank":131,"rankChange":0,"score":0.645},
    "gpi": {"year":2026,"rating":"Low","rank":127,"rankChange":-3,"score":2.409},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":116,"rankChange":2,"score":4.536},
    "gdi": {"year":2024,"rating":"150–199","rank":11,"score":194}
  },
  "IQ": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":139,"rankChange":0,"score":31},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":111,"rankChange":1,"score":0.22},
    "economist": {"year":2025,"rating":"Authoritarian","rank":119,"rankChange":5,"score":3.13},
    "cpi": {"year":2025,"rating":"20–29","rank":136,"rankChange":4,"score":28},
    "perception": {"year":2026,"rating":"Very Negative","rank":78,"score":-17},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":162,"rankChange":-7,"score":28.85},
    "hdi": {"year":2023,"rating":"Medium","rank":126,"rankChange":0,"score":0.695},
    "gpi": {"year":2026,"rating":"Low","rank":140,"rankChange":0,"score":2.662},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":95,"rankChange":6,"score":5.212}
  },
  "IR": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":174,"rankChange":0,"score":11},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":142,"rankChange":10,"score":0.1},
    "economist": {"year":2025,"rating":"Authoritarian","rank":152,"rankChange":0,"score":1.96},
    "cpi": {"year":2025,"rating":"20–29","rank":153,"rankChange":-2,"score":23},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":177,"rankChange":-1,"score":17.45},
    "hdi": {"year":2023,"rating":"High","rank":75,"rankChange":2,"score":0.799},
    "genderGap": {"year":2026,"rating":"50–59","rank":144,"rankChange":1,"score":0.585},
    "gpi": {"year":2026,"rating":"Low","rank":144,"rankChange":-6,"score":2.759},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":97,"rankChange":2,"score":5.151}
  },
  "IS": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":18,"rankChange":0,"score":95},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":25,"rankChange":-4,"score":0.72},
    "economist": {"year":2025,"rating":"Full democracy","rank":4,"rankChange":0,"score":9.38},
    "cpi": {"year":2025,"rating":"70–79","rank":10,"rankChange":0,"score":77},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":12,"rankChange":5,"score":82.77},
    "hdi": {"year":2023,"rating":"Very High","rank":1,"rankChange":2,"score":0.972},
    "genderGap": {"year":2026,"rating":"90–100","rank":1,"rankChange":0,"score":0.93},
    "gpi": {"year":2026,"rating":"Very High","rank":1,"rankChange":0,"score":1.161},
    "happiness": {"year":2026,"rating":"7.0–7.9","rank":2,"rankChange":1,"score":7.54},
    "gdi": {"year":2024,"rating":"Below 50","rank":64,"score":26}
  },
  "IT": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":40,"rankChange":0,"score":89},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":37,"rankChange":-6,"score":0.64},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":37,"rankChange":-1,"score":7.58},
    "cpi": {"year":2025,"rating":"50–59","rank":52,"rankChange":0,"score":53},
    "perception": {"year":2026,"rating":"Neutral","rank":36,"score":-1},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":56,"rankChange":-7,"score":65.16},
    "hdi": {"year":2023,"rating":"Very High","rank":29,"rankChange":3,"score":0.915},
    "genderGap": {"year":2026,"rating":"70–79","rank":83,"rankChange":2,"score":0.708},
    "gpi": {"year":2026,"rating":"High","rank":35,"rankChange":0,"score":1.712},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":38,"rankChange":2,"score":6.574},
    "gdi": {"year":2024,"rating":"200–249","rank":9,"score":206}
  },
  "JM": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":67,"rankChange":0,"score":80},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":33,"rankChange":1,"score":0.68},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":52,"rankChange":-4,"score":6.74},
    "cpi": {"year":2025,"rating":"40–49","rank":73,"rankChange":0,"score":44},
    "perception": {"year":2026,"rating":"Neutral","rank":32,"score":2},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":26,"rankChange":0,"score":75.87},
    "hdi": {"year":2023,"rating":"High","rank":117,"rankChange":0,"score":0.72},
    "genderGap": {"year":2026,"rating":"70–79","rank":37,"rankChange":1,"score":0.757},
    "gpi": {"year":2026,"rating":"Medium","rank":70,"rankChange":-1,"score":1.919},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":49,"rankChange":24,"score":6.305}
  },
  "JO": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":134,"rankChange":0,"score":34},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":102,"rankChange":2,"score":0.27},
    "economist": {"year":2025,"rating":"Authoritarian","rank":115,"rankChange":-2,"score":3.28},
    "cpi": {"year":2025,"rating":"50–59","rank":56,"rankChange":3,"score":50},
    "perception": {"year":2026,"rating":"Neutral","rank":36,"score":-1},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":142,"rankChange":5,"score":39.33},
    "hdi": {"year":2023,"rating":"High","rank":100,"rankChange":0,"score":0.754},
    "genderGap": {"year":2026,"rating":"60–69","rank":127,"rankChange":-5,"score":0.649},
    "gpi": {"year":2026,"rating":"Medium","rank":68,"rankChange":9,"score":1.913},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":119,"rankChange":9,"score":4.478}
  },
  "JP": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":11,"rankChange":0,"score":96},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":24,"rankChange":3,"score":0.73},
    "economist": {"year":2025,"rating":"Full democracy","rank":13,"rankChange":2,"score":8.85},
    "cpi": {"year":2025,"rating":"70–79","rank":18,"rankChange":2,"score":71},
    "perception": {"year":2026,"rating":"Neutral","rank":49,"score":-5},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":62,"rankChange":4,"score":62.9},
    "hdi": {"year":2023,"rating":"Very High","rank":23,"rankChange":0,"score":0.925},
    "genderGap": {"year":2026,"rating":"60–69","rank":117,"rankChange":1,"score":0.67},
    "gpi": {"year":2026,"rating":"High","rank":10,"rankChange":3,"score":1.489},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":61,"rankChange":-6,"score":6.13},
    "gdi": {"year":2024,"rating":"250+","rank":4,"score":251}
  },
  "KE": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":114,"rankChange":0,"score":51},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":74,"rankChange":0,"score":0.45},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":89,"rankChange":-2,"score":5.05},
    "cpi": {"year":2025,"rating":"30–39","rank":130,"rankChange":-9,"score":30},
    "perception": {"year":2026,"rating":"Neutral","rank":36,"score":-1},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":106,"rankChange":11,"score":50.51},
    "hdi": {"year":2023,"rating":"Medium","rank":143,"rankChange":0,"score":0.628},
    "genderGap": {"year":2026,"rating":"70–79","rank":65,"rankChange":33,"score":0.721},
    "gpi": {"year":2026,"rating":"Low","rank":132,"rankChange":1,"score":2.447},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":110,"rankChange":5,"score":4.674}
  },
  "KG": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":146,"rankChange":0,"score":26},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":115,"rankChange":1,"score":0.18},
    "economist": {"year":2025,"rating":"Authoritarian","rank":116,"rankChange":-7,"score":3.27},
    "cpi": {"year":2025,"rating":"20–29","rank":142,"rankChange":4,"score":26},
    "perception": {"year":2026,"rating":"Very Negative","rank":76,"score":-16},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":146,"rankChange":-2,"score":35.06},
    "hdi": {"year":2023,"rating":"High","rank":117,"rankChange":1,"score":0.72},
    "genderGap": {"year":2026,"rating":"70–79","rank":88,"rankChange":7,"score":0.704},
    "gpi": {"year":2026,"rating":"High","rank":61,"rankChange":8,"score":1.853},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":66,"rankChange":9,"score":6.049}
  },
  "KH": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":154,"rankChange":0,"score":23},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":165,"rankChange":1,"score":0.05},
    "economist": {"year":2025,"rating":"Authoritarian","rank":131,"rankChange":-10,"score":2.7},
    "cpi": {"year":2025,"rating":"20–29","rank":163,"rankChange":-5,"score":20},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":151,"rankChange":10,"score":33.28},
    "hdi": {"year":2023,"rating":"Medium","rank":151,"rankChange":0,"score":0.606},
    "genderGap": {"year":2026,"rating":"60–69","rank":113,"rankChange":-7,"score":0.68},
    "gpi": {"year":2026,"rating":"Medium","rank":96,"rankChange":-8,"score":2.075},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":121,"rankChange":3,"score":4.462},
    "gdi": {"year":2024,"rating":"Below 50","rank":58,"score":43}
  },
  "KI": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":40,"rankChange":0,"score":89},
    "hdi": {"year":2023,"rating":"Medium","rank":140,"rankChange":0,"score":0.644}
  },
  "KM": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":126,"rankChange":0,"score":42},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":126,"rankChange":10,"score":0.13},
    "economist": {"year":2025,"rating":"Authoritarian","rank":125,"rankChange":-3,"score":2.81},
    "cpi": {"year":2025,"rating":"20–29","rank":163,"rankChange":-5,"score":20},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":72,"rankChange":3,"score":60.23},
    "hdi": {"year":2023,"rating":"Medium","rank":152,"rankChange":-1,"score":0.603},
    "genderGap": {"year":2026,"rating":"60–69","rank":103,"rankChange":12,"score":0.689},
    "happiness": {"year":2026,"rating":"3.0–3.9","rank":136,"rankChange":3,"score":3.925}
  },
  "KN": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":40,"rankChange":0,"score":89},
    "hdi": {"year":2023,"rating":"Very High","rank":58,"rankChange":2,"score":0.84}
  },
  "KP": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":189,"rankChange":0,"score":3},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":178,"rankChange":-1,"score":0.01},
    "economist": {"year":2025,"rating":"Authoritarian","rank":165,"rankChange":-2,"score":1.08},
    "cpi": {"year":2025,"rating":"10–19","rank":172,"rankChange":-2,"score":15},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":179,"rankChange":0,"score":12.67},
    "gpi": {"year":2026,"rating":"Low","rank":147,"rankChange":0,"score":2.845},
    "gdi": {"year":2024,"rating":"Below 50","rank":58,"score":43}
  },
  "KR": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":65,"rankChange":0,"score":81},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":22,"rankChange":20,"score":0.74},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":32,"rankChange":-1,"score":7.75},
    "cpi": {"year":2025,"rating":"60–69","rank":31,"rankChange":-1,"score":63},
    "perception": {"year":2026,"rating":"Positive","rank":11,"score":12},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":47,"rankChange":14,"score":69.12},
    "hdi": {"year":2023,"rating":"Very High","rank":20,"rankChange":-1,"score":0.937},
    "genderGap": {"year":2026,"rating":"60–69","rank":101,"rankChange":0,"score":0.693},
    "gpi": {"year":2026,"rating":"High","rank":57,"rankChange":-6,"score":1.839},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":67,"rankChange":-9,"score":6.04},
    "gdi": {"year":2024,"rating":"150–199","rank":13,"score":187}
  },
  "KW": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":139,"rankChange":0,"score":31},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":129,"rankChange":-11,"score":0.13},
    "economist": {"year":2025,"rating":"Authoritarian","rank":130,"rankChange":-2,"score":2.78},
    "cpi": {"year":2025,"rating":"40–49","rank":65,"rankChange":0,"score":46},
    "perception": {"year":2026,"rating":"Positive","rank":23,"score":7},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":136,"rankChange":-8,"score":40.44},
    "hdi": {"year":2023,"rating":"Very High","rank":52,"rankChange":1,"score":0.852},
    "genderGap": {"year":2026,"rating":"60–69","rank":133,"rankChange":-5,"score":0.641},
    "gpi": {"year":2026,"rating":"High","rank":49,"rankChange":-13,"score":1.813},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":40,"rankChange":-10,"score":6.543}
  },
  "KZ": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":154,"rankChange":0,"score":23},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":127,"rankChange":2,"score":0.13},
    "economist": {"year":2025,"rating":"Authoritarian","rank":123,"rankChange":-7,"score":2.91},
    "cpi": {"year":2025,"rating":"30–39","rank":96,"rankChange":-8,"score":38},
    "perception": {"year":2026,"rating":"Very Negative","rank":96,"score":-31},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":149,"rankChange":-8,"score":34.41},
    "hdi": {"year":2023,"rating":"Very High","rank":60,"rankChange":-1,"score":0.837},
    "genderGap": {"year":2026,"rating":"70–79","rank":95,"rankChange":-3,"score":0.7},
    "gpi": {"year":2026,"rating":"High","rank":44,"rankChange":5,"score":1.771},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":33,"rankChange":10,"score":6.633}
  },
  "LA": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":169,"rankChange":0,"score":13},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":140,"rankChange":0,"score":0.11},
    "economist": {"year":2025,"rating":"Authoritarian","rank":159,"rankChange":-1,"score":1.71},
    "cpi": {"year":2025,"rating":"30–39","rank":109,"rankChange":5,"score":34},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":154,"rankChange":-4,"score":32.54},
    "hdi": {"year":2023,"rating":"Medium","rank":147,"rankChange":0,"score":0.617},
    "genderGap": {"year":2026,"rating":"70–79","rank":89,"rankChange":7,"score":0.703},
    "gpi": {"year":2026,"rating":"High","rank":58,"rankChange":0,"score":1.846},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":92,"rankChange":1,"score":5.515},
    "gdi": {"year":2024,"rating":"Below 50","rank":61,"score":40}
  },
  "LB": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":130,"rankChange":0,"score":39},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":103,"rankChange":7,"score":0.27},
    "economist": {"year":2025,"rating":"Authoritarian","rank":109,"rankChange":-2,"score":3.81},
    "cpi": {"year":2025,"rating":"20–29","rank":153,"rankChange":1,"score":23},
    "perception": {"year":2026,"rating":"Very Negative","rank":85,"score":-21},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":115,"rankChange":17,"score":46.49},
    "hdi": {"year":2023,"rating":"High","rank":102,"rankChange":-3,"score":0.752},
    "genderGap": {"year":2026,"rating":"60–69","rank":128,"rankChange":8,"score":0.648},
    "gpi": {"year":2026,"rating":"Low","rank":131,"rankChange":3,"score":2.435},
    "happiness": {"year":2026,"rating":"3.0–3.9","rank":141,"rankChange":4,"score":3.723}
  },
  "LC": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":33,"rankChange":0,"score":91},
    "cpi": {"year":2025,"rating":"50–59","rank":39,"rankChange":-1,"score":59},
    "hdi": {"year":2023,"rating":"High","rank":103,"rankChange":-1,"score":0.748}
  },
  "LI": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":36,"rankChange":0,"score":90},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":13,"rankChange":-1,"score":82.62},
    "hdi": {"year":2023,"rating":"Very High","rank":17,"rankChange":-2,"score":0.938}
  },
  "LK": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":104,"rankChange":0,"score":58},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":44,"rankChange":20,"score":0.61},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":56,"rankChange":10,"score":6.57},
    "cpi": {"year":2025,"rating":"30–39","rank":107,"rankChange":14,"score":35},
    "perception": {"year":2026,"rating":"Very Positive","rank":7,"score":16},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":134,"rankChange":5,"score":40.77},
    "hdi": {"year":2023,"rating":"High","rank":89,"rankChange":-1,"score":0.776},
    "genderGap": {"year":2026,"rating":"60–69","rank":129,"rankChange":1,"score":0.646},
    "gpi": {"year":2026,"rating":"Medium","rank":67,"rankChange":14,"score":1.91},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":134,"rankChange":-1,"score":4.013},
    "gdi": {"year":2024,"rating":"50–99","rank":49,"score":60}
  },
  "LR": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":95,"rankChange":0,"score":64},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":76,"rankChange":2,"score":0.42},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":80,"rankChange":-1,"score":5.57},
    "cpi": {"year":2025,"rating":"20–29","rank":136,"rankChange":-1,"score":28},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":58,"rankChange":-4,"score":64.54},
    "hdi": {"year":2023,"rating":"Low","rank":177,"rankChange":0,"score":0.51},
    "genderGap": {"year":2026,"rating":"70–79","rank":43,"rankChange":-3,"score":0.751},
    "gpi": {"year":2026,"rating":"Medium","rank":87,"rankChange":17,"score":2.024},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":130,"rankChange":-1,"score":4.28}
  },
  "LS": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":90,"rankChange":0,"score":66},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":62,"rankChange":-2,"score":0.51},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":66,"rankChange":3,"score":6.23},
    "cpi": {"year":2025,"rating":"30–39","rank":99,"rankChange":0,"score":37},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":89,"rankChange":18,"score":54.37},
    "hdi": {"year":2023,"rating":"Medium","rank":167,"rankChange":0,"score":0.55},
    "genderGap": {"year":2026,"rating":"60–69","rank":100,"rankChange":-1,"score":0.693},
    "gpi": {"year":2026,"rating":"Medium","rank":86,"rankChange":27,"score":2.016},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":126,"rankChange":12,"score":4.375}
  },
  "LT": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":40,"rankChange":0,"score":89},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":27,"rankChange":1,"score":0.71},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":39,"rankChange":-4,"score":7.55},
    "cpi": {"year":2025,"rating":"60–69","rank":28,"rankChange":4,"score":65},
    "perception": {"year":2026,"rating":"Negative","rank":67,"score":-13},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":15,"rankChange":-1,"score":81.34},
    "hdi": {"year":2023,"rating":"Very High","rank":39,"rankChange":0,"score":0.895},
    "genderGap": {"year":2026,"rating":"70–79","rank":14,"rankChange":5,"score":0.791},
    "gpi": {"year":2026,"rating":"High","rank":24,"rankChange":3,"score":1.62},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":28,"rankChange":-12,"score":6.704},
    "gdi": {"year":2024,"rating":"50–99","rank":48,"score":62}
  },
  "LU": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":5,"rankChange":0,"score":97},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":17,"rankChange":-2,"score":0.78},
    "economist": {"year":2025,"rating":"Full democracy","rank":9,"rankChange":1,"score":9.08},
    "cpi": {"year":2025,"rating":"70–79","rank":8,"rankChange":-3,"score":78},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":9,"rankChange":4,"score":84.14},
    "hdi": {"year":2023,"rating":"Very High","rank":25,"rankChange":-3,"score":0.922},
    "genderGap": {"year":2026,"rating":"70–79","rank":42,"rankChange":8,"score":0.752},
    "happiness": {"year":2026,"rating":"7.0–7.9","rank":9,"rankChange":0,"score":7.063},
    "gdi": {"year":2024,"rating":"Below 50","rank":54,"score":46}
  },
  "LV": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":40,"rankChange":0,"score":89},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":20,"rankChange":0,"score":0.75},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":33,"rankChange":-1,"score":7.73},
    "cpi": {"year":2025,"rating":"60–69","rank":37,"rankChange":1,"score":60},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":17,"rankChange":-2,"score":81},
    "hdi": {"year":2023,"rating":"Very High","rank":41,"rankChange":2,"score":0.889},
    "genderGap": {"year":2026,"rating":"70–79","rank":17,"rankChange":4,"score":0.788},
    "gpi": {"year":2026,"rating":"High","rank":19,"rankChange":0,"score":1.589},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":48,"rankChange":3,"score":6.365},
    "gdi": {"year":2024,"rating":"Below 50","rank":54,"score":46}
  },
  "LY": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":175,"rankChange":0,"score":10},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":147,"rankChange":-4,"score":0.1},
    "economist": {"year":2025,"rating":"Authoritarian","rank":141,"rankChange":-3,"score":2.31},
    "cpi": {"year":2025,"rating":"10–19","rank":177,"rankChange":-4,"score":13},
    "perception": {"year":2026,"rating":"Negative","rank":67,"score":-13},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":138,"rankChange":-1,"score":40.34},
    "hdi": {"year":2023,"rating":"High","rank":115,"rankChange":-9,"score":0.721},
    "gpi": {"year":2026,"rating":"Low","rank":125,"rankChange":3,"score":2.361},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":81,"rankChange":-2,"score":5.731}
  },
  "MA": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":132,"rankChange":0,"score":37},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":107,"rankChange":-2,"score":0.25},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":91,"rankChange":-2,"score":4.97},
    "cpi": {"year":2025,"rating":"30–39","rank":91,"rankChange":8,"score":39},
    "perception": {"year":2026,"rating":"Negative","rank":54,"score":-8},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":105,"rankChange":15,"score":50.55},
    "hdi": {"year":2023,"rating":"High","rank":120,"rankChange":2,"score":0.71},
    "genderGap": {"year":2026,"rating":"60–69","rank":139,"rankChange":-2,"score":0.632},
    "gpi": {"year":2026,"rating":"High","rank":65,"rankChange":3,"score":1.887},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":112,"rankChange":0,"score":4.646}
  },
  "MC": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":59,"rankChange":0,"score":82}
  },
  "MD": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":100,"rankChange":0,"score":60},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":73,"rankChange":-12,"score":0.45},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":77,"rankChange":-7,"score":5.86},
    "cpi": {"year":2025,"rating":"40–49","rank":80,"rankChange":-4,"score":42},
    "perception": {"year":2026,"rating":"Negative","rank":54,"score":-8},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":31,"rankChange":4,"score":74.77},
    "hdi": {"year":2023,"rating":"High","rank":86,"rankChange":-4,"score":0.785},
    "genderGap": {"year":2026,"rating":"70–79","rank":15,"rankChange":-8,"score":0.791},
    "gpi": {"year":2026,"rating":"High","rank":55,"rankChange":1,"score":1.836},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":77,"rankChange":3,"score":5.851}
  },
  "ME": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":82,"rankChange":0,"score":69},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":66,"rankChange":-3,"score":0.5},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":53,"rankChange":-4,"score":6.73},
    "cpi": {"year":2025,"rating":"40–49","rank":65,"rankChange":0,"score":46},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":41,"rankChange":-4,"score":71.8},
    "hdi": {"year":2023,"rating":"Very High","rank":48,"rankChange":0,"score":0.862},
    "genderGap": {"year":2026,"rating":"70–79","rank":74,"rankChange":10,"score":0.715},
    "gpi": {"year":2026,"rating":"High","rank":30,"rankChange":-2,"score":1.672},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":60,"rankChange":11,"score":6.139}
  },
  "MG": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":108,"rankChange":0,"score":55},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":113,"rankChange":0,"score":0.19},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":88,"rankChange":-6,"score":5.06},
    "cpi": {"year":2025,"rating":"20–29","rank":148,"rankChange":-8,"score":25},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":103,"rankChange":10,"score":50.95},
    "hdi": {"year":2023,"rating":"Low","rank":183,"rankChange":0,"score":0.487},
    "genderGap": {"year":2026,"rating":"70–79","rank":81,"rankChange":-23,"score":0.709},
    "gpi": {"year":2026,"rating":"High","rank":59,"rankChange":4,"score":1.849},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":132,"rankChange":-2,"score":4.174}
  },
  "MH": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":24,"rankChange":0,"score":93},
    "hdi": {"year":2023,"rating":"High","rank":108,"rankChange":2,"score":0.733}
  },
  "MK": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":88,"rankChange":0,"score":67},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":85,"rankChange":1,"score":0.37},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":64,"rankChange":-3,"score":6.28},
    "cpi": {"year":2025,"rating":"40–49","rank":84,"rankChange":4,"score":40},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":45,"rankChange":-3,"score":69.49},
    "hdi": {"year":2023,"rating":"Very High","rank":68,"rankChange":-1,"score":0.815},
    "genderGap": {"year":2026,"rating":"70–79","rank":82,"rankChange":8,"score":0.709},
    "gpi": {"year":2026,"rating":"High","rank":46,"rankChange":3,"score":1.792},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":82,"rankChange":4,"score":5.719}
  },
  "ML": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":150,"rankChange":0,"score":24},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":122,"rankChange":3,"score":0.15},
    "economist": {"year":2025,"rating":"Authoritarian","rank":140,"rankChange":-3,"score":2.4},
    "cpi": {"year":2025,"rating":"20–29","rank":136,"rankChange":-1,"score":28},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":121,"rankChange":-2,"score":45.63},
    "hdi": {"year":2023,"rating":"Low","rank":188,"rankChange":0,"score":0.419},
    "genderGap": {"year":2026,"rating":"60–69","rank":140,"rankChange":0,"score":0.619},
    "gpi": {"year":2026,"rating":"Very Low","rank":154,"rankChange":0,"score":2.996},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":114,"rankChange":9,"score":4.588}
  },
  "MM": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":181,"rankChange":0,"score":7},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":177,"rankChange":-1,"score":0.01},
    "economist": {"year":2025,"rating":"Authoritarian","rank":166,"rankChange":-2,"score":0.96},
    "cpi": {"year":2025,"rating":"10–19","rank":169,"rankChange":-1,"score":16},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":166,"rankChange":3,"score":26.38},
    "hdi": {"year":2023,"rating":"Medium","rank":150,"rankChange":-1,"score":0.609},
    "gpi": {"year":2026,"rating":"Very Low","rank":151,"rankChange":2,"score":2.911},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":129,"rankChange":-3,"score":4.287},
    "gdi": {"year":2024,"rating":"Below 50","rank":54,"score":46}
  },
  "MN": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":53,"rankChange":0,"score":84},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":75,"rankChange":7,"score":0.42},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":57,"rankChange":-5,"score":6.5},
    "cpi": {"year":2025,"rating":"30–39","rank":124,"rankChange":-10,"score":31},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":85,"rankChange":17,"score":55.79},
    "hdi": {"year":2023,"rating":"High","rank":104,"rankChange":1,"score":0.747},
    "genderGap": {"year":2026,"rating":"70–79","rank":70,"rankChange":-5,"score":0.719},
    "gpi": {"year":2026,"rating":"High","rank":34,"rankChange":4,"score":1.692},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":75,"rankChange":2,"score":5.936},
    "gdi": {"year":2024,"rating":"50–99","rank":52,"score":50}
  },
  "MR": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":130,"rankChange":0,"score":39},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":130,"rankChange":-2,"score":0.13},
    "economist": {"year":2025,"rating":"Authoritarian","rank":108,"rankChange":-2,"score":3.84},
    "cpi": {"year":2025,"rating":"30–39","rank":130,"rankChange":0,"score":30},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":61,"rankChange":-11,"score":63.36},
    "hdi": {"year":2023,"rating":"Medium","rank":163,"rankChange":0,"score":0.563},
    "gpi": {"year":2026,"rating":"Medium","rank":112,"rankChange":2,"score":2.184},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":120,"rankChange":-6,"score":4.473}
  },
  "MT": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":49,"rankChange":0,"score":87},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":43,"rankChange":0,"score":0.62},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":28,"rankChange":-2,"score":7.93},
    "cpi": {"year":2025,"rating":"40–49","rank":60,"rankChange":5,"score":49},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":67,"rankChange":0,"score":61.44},
    "hdi": {"year":2023,"rating":"Very High","rank":24,"rankChange":2,"score":0.924},
    "genderGap": {"year":2026,"rating":"70–79","rank":73,"rankChange":-5,"score":0.715},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":43,"rankChange":5,"score":6.436}
  },
  "MU": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":50,"rankChange":0,"score":86},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":38,"rankChange":47,"score":0.64},
    "economist": {"year":2025,"rating":"Full democracy","rank":21,"rankChange":-2,"score":8.23},
    "cpi": {"year":2025,"rating":"40–49","rank":61,"rankChange":-5,"score":48},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":42,"rankChange":9,"score":70.92},
    "hdi": {"year":2023,"rating":"Very High","rank":73,"rankChange":2,"score":0.806},
    "genderGap": {"year":2026,"rating":"60–69","rank":102,"rankChange":9,"score":0.691},
    "gpi": {"year":2026,"rating":"High","rank":18,"rankChange":11,"score":1.586},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":73,"rankChange":5,"score":5.939}
  },
  "MV": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":125,"rankChange":0,"score":43},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":77,"rankChange":-2,"score":0.42},
    "cpi": {"year":2025,"rating":"30–39","rank":91,"rankChange":5,"score":39},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":108,"rankChange":-4,"score":49.23},
    "hdi": {"year":2023,"rating":"High","rank":93,"rankChange":-2,"score":0.766},
    "genderGap": {"year":2026,"rating":"60–69","rank":119,"rankChange":19,"score":0.669}
  },
  "MW": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":91,"rankChange":0,"score":65},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":70,"rankChange":-3,"score":0.46},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":70,"rankChange":5,"score":6.1},
    "cpi": {"year":2025,"rating":"30–39","rank":109,"rankChange":-2,"score":34},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":69,"rankChange":7,"score":60.96},
    "hdi": {"year":2023,"rating":"Low","rank":172,"rankChange":1,"score":0.517},
    "genderGap": {"year":2026,"rating":"60–69","rank":99,"score":0.695},
    "gpi": {"year":2026,"rating":"Medium","rank":83,"rankChange":-18,"score":1.994},
    "happiness": {"year":2026,"rating":"3.0–3.9","rank":145,"rankChange":-1,"score":3.284}
  },
  "MX": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":102,"rankChange":0,"score":59},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":110,"rankChange":-2,"score":0.22},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":81,"rankChange":2,"score":5.4},
    "cpi": {"year":2025,"rating":"20–29","rank":141,"rankChange":-1,"score":27},
    "perception": {"year":2026,"rating":"Negative","rank":70,"score":-14},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":122,"rankChange":2,"score":45.23},
    "hdi": {"year":2023,"rating":"High","rank":81,"rankChange":3,"score":0.789},
    "genderGap": {"year":2026,"rating":"70–79","rank":18,"rankChange":5,"score":0.787},
    "gpi": {"year":2026,"rating":"Low","rank":139,"rankChange":4,"score":2.65},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":12,"rankChange":-2,"score":6.972},
    "gdi": {"year":2024,"rating":"150–199","rank":14,"score":161}
  },
  "MY": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":111,"rankChange":0,"score":53},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":88,"rankChange":0,"score":0.35},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":42,"rankChange":1,"score":7.11},
    "cpi": {"year":2025,"rating":"50–59","rank":54,"rankChange":3,"score":52},
    "perception": {"year":2026,"rating":"Positive","rank":17,"score":9},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":95,"rankChange":-7,"score":52.73},
    "hdi": {"year":2023,"rating":"Very High","rank":67,"rankChange":1,"score":0.819},
    "genderGap": {"year":2026,"rating":"60–69","rank":104,"rankChange":4,"score":0.689},
    "gpi": {"year":2026,"rating":"High","rank":12,"rankChange":-1,"score":1.513},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":71,"rankChange":-7,"score":6.005},
    "gdi": {"year":2024,"rating":"100–149","rank":35,"score":106}
  },
  "MZ": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":127,"rankChange":0,"score":41},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":118,"rankChange":-3,"score":0.17},
    "economist": {"year":2025,"rating":"Authoritarian","rank":113,"rankChange":-2,"score":3.38},
    "cpi": {"year":2025,"rating":"20–29","rank":161,"rankChange":-15,"score":21},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":99,"rankChange":2,"score":52.27},
    "hdi": {"year":2023,"rating":"Low","rank":182,"rankChange":0,"score":0.493},
    "genderGap": {"year":2026,"rating":"70–79","rank":59,"rankChange":-6,"score":0.728},
    "gpi": {"year":2026,"rating":"Low","rank":126,"rankChange":1,"score":2.383},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":93,"rankChange":3,"score":5.336}
  },
  "NA": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":77,"rankChange":0,"score":73},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":60,"rankChange":-2,"score":0.52},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":59,"rankChange":-2,"score":6.48},
    "cpi": {"year":2025,"rating":"40–49","rank":65,"rankChange":-6,"score":46},
    "perception": {"year":2026,"rating":"Positive","rank":20,"score":8},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":23,"rankChange":5,"score":76.97},
    "hdi": {"year":2023,"rating":"Medium","rank":136,"rankChange":1,"score":0.665},
    "genderGap": {"year":2026,"rating":"80–89","rank":4,"rankChange":4,"score":0.845},
    "gpi": {"year":2026,"rating":"High","rank":63,"rankChange":-1,"score":1.872},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":108,"rankChange":-5,"score":4.781}
  },
  "NE": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":142,"rankChange":0,"score":30},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":116,"rankChange":1,"score":0.18},
    "economist": {"year":2025,"rating":"Authoritarian","rank":153,"rankChange":-14,"score":1.95},
    "cpi": {"year":2025,"rating":"30–39","rank":124,"rankChange":-17,"score":31},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":120,"rankChange":-37,"score":46.02},
    "hdi": {"year":2023,"rating":"Low","rank":188,"rankChange":1,"score":0.419},
    "genderGap": {"year":2026,"rating":"60–69","rank":124,"rankChange":18,"score":0.655},
    "gpi": {"year":2026,"rating":"Low","rank":146,"rankChange":-1,"score":2.832},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":103,"rankChange":7,"score":4.94}
  },
  "NG": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":123,"rankChange":0,"score":44},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":96,"rankChange":0,"score":0.31},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":105,"rankChange":-1,"score":4.1},
    "cpi": {"year":2025,"rating":"20–29","rank":142,"rankChange":-2,"score":26},
    "perception": {"year":2026,"rating":"Very Negative","rank":83,"score":-20},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":112,"rankChange":10,"score":48.11},
    "hdi": {"year":2023,"rating":"Medium","rank":164,"rankChange":0,"score":0.56},
    "genderGap": {"year":2026,"rating":"60–69","rank":114,"rankChange":10,"score":0.676},
    "gpi": {"year":2026,"rating":"Low","rank":142,"rankChange":6,"score":2.755},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":106,"rankChange":-1,"score":4.788}
  },
  "NI": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":168,"rankChange":0,"score":14},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":175,"rankChange":0,"score":0.02},
    "economist": {"year":2025,"rating":"Authoritarian","rank":150,"rankChange":-5,"score":1.97},
    "cpi": {"year":2025,"rating":"10–19","rank":175,"rankChange":-3,"score":14},
    "perception": {"year":2026,"rating":"Negative","rank":54,"score":-8},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":168,"rankChange":4,"score":24.98},
    "hdi": {"year":2023,"rating":"High","rank":123,"rankChange":1,"score":0.706},
    "gpi": {"year":2026,"rating":"Medium","rank":106,"rankChange":-9,"score":2.107},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":51,"rankChange":-4,"score":6.301}
  },
  "NL": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":5,"rankChange":0,"score":97},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":18,"rankChange":0,"score":0.77},
    "economist": {"year":2025,"rating":"Full democracy","rank":11,"rankChange":-2,"score":8.93},
    "cpi": {"year":2025,"rating":"70–79","rank":8,"rankChange":1,"score":78},
    "perception": {"year":2026,"rating":"Positive","rank":14,"score":10},
    "rsfPress": {"year":2026,"rating":"Good","rank":2,"rankChange":1,"score":88.92},
    "hdi": {"year":2023,"rating":"Very High","rank":8,"rankChange":-1,"score":0.955},
    "genderGap": {"year":2026,"rating":"70–79","rank":46,"rankChange":-3,"score":0.75},
    "gpi": {"year":2026,"rating":"High","rank":17,"rankChange":0,"score":1.566},
    "happiness": {"year":2026,"rating":"7.0–7.9","rank":7,"rankChange":-2,"score":7.223},
    "gdi": {"year":2024,"rating":"100–149","rank":17,"score":149}
  },
  "NO": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":2,"rankChange":0,"score":99},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":3,"rankChange":0,"score":0.85},
    "economist": {"year":2025,"rating":"Full democracy","rank":1,"rankChange":0,"score":9.81},
    "cpi": {"year":2025,"rating":"80–89","rank":4,"rankChange":1,"score":81},
    "perception": {"year":2026,"rating":"Very Positive","rank":2,"score":23},
    "rsfPress": {"year":2026,"rating":"Good","rank":1,"rankChange":0,"score":92.72},
    "hdi": {"year":2023,"rating":"Very High","rank":2,"rankChange":-1,"score":0.97},
    "genderGap": {"year":2026,"rating":"80–89","rank":3,"rankChange":0,"score":0.857},
    "gpi": {"year":2026,"rating":"High","rank":33,"rankChange":0,"score":1.688},
    "happiness": {"year":2026,"rating":"7.0–7.9","rank":6,"rankChange":1,"score":7.242},
    "gdi": {"year":2024,"rating":"50–99","rank":42,"score":91}
  },
  "NP": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":98,"rankChange":0,"score":62},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":64,"rankChange":-8,"score":0.51},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":106,"rankChange":-12,"score":4.01},
    "cpi": {"year":2025,"rating":"30–39","rank":109,"rankChange":-2,"score":34},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":87,"rankChange":3,"score":54.8},
    "hdi": {"year":2023,"rating":"Medium","rank":145,"rankChange":5,"score":0.622},
    "genderGap": {"year":2026,"rating":"60–69","rank":120,"rankChange":5,"score":0.669},
    "gpi": {"year":2026,"rating":"Medium","rank":111,"rankChange":-26,"score":2.143},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":99,"rankChange":-7,"score":5.147},
    "gdi": {"year":2024,"rating":"Below 50","rank":61,"score":40}
  },
  "NR": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":73,"rankChange":0,"score":75},
    "hdi": {"year":2023,"rating":"High","rank":124,"rankChange":1,"score":0.703}
  },
  "NZ": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":2,"rankChange":0,"score":99},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":14,"rankChange":-6,"score":0.79},
    "economist": {"year":2025,"rating":"Full democracy","rank":2,"rankChange":0,"score":9.62},
    "cpi": {"year":2025,"rating":"80–89","rank":4,"rankChange":0,"score":81},
    "perception": {"year":2026,"rating":"Positive","rank":12,"score":11},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":22,"rankChange":-6,"score":77.38},
    "hdi": {"year":2023,"rating":"Very High","rank":17,"rankChange":0,"score":0.938},
    "genderGap": {"year":2026,"rating":"80–89","rank":6,"rankChange":-1,"score":0.828},
    "gpi": {"year":2026,"rating":"Very High","rank":2,"rankChange":1,"score":1.343},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":11,"rankChange":1,"score":6.995},
    "gdi": {"year":2024,"rating":"50–99","rank":47,"score":68}
  },
  "OM": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":150,"rankChange":0,"score":24},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":125,"rankChange":2,"score":0.14},
    "economist": {"year":2025,"rating":"Authoritarian","rank":121,"rankChange":-3,"score":3.05},
    "cpi": {"year":2025,"rating":"50–59","rank":54,"rankChange":-4,"score":52},
    "perception": {"year":2026,"rating":"Positive","rank":12,"score":11},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":127,"rankChange":7,"score":43.67},
    "hdi": {"year":2023,"rating":"Very High","rank":50,"rankChange":2,"score":0.858},
    "genderGap": {"year":2026,"rating":"60–69","rank":134,"rankChange":0,"score":0.639},
    "gpi": {"year":2026,"rating":"High","rank":60,"rankChange":-26,"score":1.85},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":58,"rankChange":-6,"score":6.197}
  },
  "PA": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":57,"rankChange":0,"score":83},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":49,"rankChange":-1,"score":0.57},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":44,"rankChange":2,"score":7.04},
    "cpi": {"year":2025,"rating":"30–39","rank":116,"rankChange":-2,"score":33},
    "perception": {"year":2026,"rating":"Very Negative","rank":75,"score":-15},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":65,"rankChange":-12,"score":62.14},
    "hdi": {"year":2023,"rating":"Very High","rank":59,"rankChange":-2,"score":0.839},
    "genderGap": {"year":2026,"rating":"70–79","rank":41,"rankChange":10,"score":0.753},
    "gpi": {"year":2026,"rating":"Medium","rank":81,"rankChange":-6,"score":1.976},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":39,"rankChange":2,"score":6.547}
  },
  "PE": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":88,"rankChange":0,"score":67},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":63,"rankChange":-1,"score":0.51},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":76,"rankChange":1,"score":5.88},
    "cpi": {"year":2025,"rating":"30–39","rank":130,"rankChange":-3,"score":30},
    "perception": {"year":2026,"rating":"Negative","rank":70,"score":-14},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":144,"rankChange":-14,"score":37.86},
    "hdi": {"year":2023,"rating":"High","rank":79,"rankChange":0,"score":0.794},
    "genderGap": {"year":2026,"rating":"70–79","rank":94,"rankChange":-37,"score":0.7},
    "gpi": {"year":2026,"rating":"Medium","rank":107,"rankChange":-1,"score":2.12},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":72,"rankChange":-7,"score":5.974}
  },
  "PG": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":99,"rankChange":0,"score":61},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":80,"rankChange":4,"score":0.38},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":75,"rankChange":-3,"score":5.9},
    "cpi": {"year":2025,"rating":"20–29","rank":142,"rankChange":-15,"score":26},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":73,"rankChange":5,"score":60.11},
    "hdi": {"year":2023,"rating":"Medium","rank":160,"rankChange":-2,"score":0.576},
    "genderGap": {"year":2026,"rating":"60–69","rank":132,"rankChange":1,"score":0.642},
    "gpi": {"year":2026,"rating":"Medium","rank":84,"rankChange":17,"score":2.002},
    "gdi": {"year":2024,"rating":"Below 50","rank":65,"score":21}
  },
  "PH": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":104,"rankChange":0,"score":58},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":100,"rankChange":0,"score":0.29},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":62,"rankChange":-12,"score":6.31},
    "cpi": {"year":2025,"rating":"30–39","rank":120,"rankChange":-6,"score":32},
    "perception": {"year":2026,"rating":"Positive","rank":14,"score":10},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":114,"rankChange":2,"score":46.79},
    "hdi": {"year":2023,"rating":"High","rank":117,"rankChange":3,"score":0.72},
    "genderGap": {"year":2026,"rating":"70–79","rank":20,"rankChange":0,"score":0.78},
    "gpi": {"year":2026,"rating":"Medium","rank":102,"rankChange":-3,"score":2.092},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":56,"rankChange":1,"score":6.206},
    "gdi": {"year":2024,"rating":"50–99","rank":40,"score":94}
  },
  "PK": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":138,"rankChange":0,"score":32},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":117,"rankChange":-3,"score":0.18},
    "economist": {"year":2025,"rating":"Authoritarian","rank":139,"rankChange":-17,"score":2.44},
    "cpi": {"year":2025,"rating":"20–29","rank":136,"rankChange":-1,"score":28},
    "perception": {"year":2026,"rating":"Negative","rank":66,"score":-12},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":153,"rankChange":5,"score":32.61},
    "hdi": {"year":2023,"rating":"Low","rank":168,"rankChange":0,"score":0.544},
    "genderGap": {"year":2026,"rating":"50–59","rank":143,"rankChange":5,"score":0.595},
    "gpi": {"year":2026,"rating":"Very Low","rank":152,"rankChange":-6,"score":2.919},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":104,"rankChange":5,"score":4.868},
    "gdi": {"year":2024,"rating":"100–149","rank":27,"score":121}
  },
  "PL": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":59,"rankChange":0,"score":82},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":36,"rankChange":8,"score":0.65},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":34,"rankChange":4,"score":7.65},
    "cpi": {"year":2025,"rating":"50–59","rank":52,"rankChange":1,"score":53},
    "perception": {"year":2026,"rating":"Neutral","rank":47,"score":-4},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":27,"rankChange":4,"score":75.52},
    "hdi": {"year":2023,"rating":"Very High","rank":35,"rankChange":-2,"score":0.906},
    "genderGap": {"year":2026,"rating":"70–79","rank":44,"rankChange":1,"score":0.751},
    "gpi": {"year":2026,"rating":"High","rank":22,"rankChange":23,"score":1.615},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":24,"rankChange":2,"score":6.768},
    "gdi": {"year":2024,"rating":"100–149","rank":21,"score":135}
  },
  "PS": {
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":137,"rankChange":1,"score":0.11},
    "economist": {"year":2025,"rating":"Authoritarian","rank":112,"rankChange":-2,"score":3.44},
    "perception": {"year":2026,"rating":"Very Negative","rank":90,"score":-22},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":156,"rankChange":7,"score":32.09},
    "hdi": {"year":2023,"rating":"Medium","rank":133,"rankChange":-24,"score":0.674},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":109,"rankChange":-1,"score":4.694}
  },
  "PT": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":11,"rankChange":0,"score":96},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":26,"rankChange":-4,"score":0.72},
    "economist": {"year":2025,"rating":"Full democracy","rank":20,"rankChange":2,"score":8.28},
    "cpi": {"year":2025,"rating":"50–59","rank":46,"rankChange":-3,"score":56},
    "perception": {"year":2026,"rating":"Negative","rank":62,"score":-10},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":10,"rankChange":-2,"score":83.71},
    "hdi": {"year":2023,"rating":"Very High","rank":40,"rankChange":1,"score":0.89},
    "genderGap": {"year":2026,"rating":"70–79","rank":32,"rankChange":2,"score":0.763},
    "gpi": {"year":2026,"rating":"Very High","rank":7,"rankChange":1,"score":1.427},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":69,"rankChange":-9,"score":6.029},
    "gdi": {"year":2024,"rating":"100–149","rank":25,"score":127}
  },
  "PW": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":28,"rankChange":0,"score":92},
    "hdi": {"year":2023,"rating":"High","rank":84,"rankChange":-3,"score":0.786}
  },
  "PY": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":96,"rankChange":0,"score":63},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":83,"rankChange":-2,"score":0.38},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":73,"rankChange":1,"score":6.04},
    "cpi": {"year":2025,"rating":"20–29","rank":150,"rankChange":-1,"score":24},
    "perception": {"year":2026,"rating":"Very Negative","rank":92,"score":-23},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":88,"rankChange":-4,"score":54.67},
    "hdi": {"year":2023,"rating":"High","rank":99,"rankChange":3,"score":0.756},
    "genderGap": {"year":2026,"rating":"70–79","rank":86,"rankChange":1,"score":0.706},
    "gpi": {"year":2026,"rating":"High","rank":64,"rankChange":5,"score":1.882},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":57,"rankChange":-3,"score":6.198}
  },
  "QA": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":148,"rankChange":0,"score":25},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":151,"rankChange":-3,"score":0.09},
    "economist": {"year":2025,"rating":"Authoritarian","rank":118,"rankChange":-3,"score":3.17},
    "cpi": {"year":2025,"rating":"50–59","rank":41,"rankChange":-3,"score":58},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":75,"rankChange":4,"score":59.79},
    "hdi": {"year":2023,"rating":"Very High","rank":43,"rankChange":-2,"score":0.886},
    "genderGap": {"year":2026,"rating":"60–69","rank":135,"score":0.638},
    "gpi": {"year":2026,"rating":"High","rank":31,"rankChange":-10,"score":1.676}
  },
  "RO": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":59,"rankChange":0,"score":82},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":69,"rankChange":3,"score":0.46},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":69,"rankChange":2,"score":6.11},
    "cpi": {"year":2025,"rating":"40–49","rank":70,"rankChange":-5,"score":45},
    "perception": {"year":2026,"rating":"Very Negative","rank":85,"score":-21},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":49,"rankChange":6,"score":67.71},
    "hdi": {"year":2023,"rating":"Very High","rank":55,"rankChange":-1,"score":0.845},
    "genderGap": {"year":2026,"rating":"60–69","rank":97,"rankChange":-3,"score":0.698},
    "gpi": {"year":2026,"rating":"High","rank":45,"rankChange":-1,"score":1.788},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":34,"rankChange":1,"score":6.629}
  },
  "RS": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":106,"rankChange":0,"score":56},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":112,"rankChange":-1,"score":0.21},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":63,"rankChange":0,"score":6.3},
    "cpi": {"year":2025,"rating":"30–39","rank":116,"rankChange":-11,"score":33},
    "perception": {"year":2026,"rating":"Very Negative","rank":81,"score":-18},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":104,"rankChange":-8,"score":50.79},
    "hdi": {"year":2023,"rating":"Very High","rank":62,"rankChange":-1,"score":0.833},
    "genderGap": {"year":2026,"rating":"70–79","rank":39,"rankChange":-13,"score":0.754},
    "gpi": {"year":2026,"rating":"Medium","rank":70,"rankChange":5,"score":1.919},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":30,"rankChange":1,"score":6.691}
  },
  "RU": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":171,"rankChange":0,"score":12},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":162,"rankChange":-3,"score":0.06},
    "economist": {"year":2025,"rating":"Authoritarian","rank":148,"rankChange":0,"score":2.03},
    "cpi": {"year":2025,"rating":"20–29","rank":157,"rankChange":-3,"score":22},
    "perception": {"year":2026,"rating":"Very Negative","rank":85,"score":-21},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":172,"rankChange":-1,"score":23.15},
    "hdi": {"year":2023,"rating":"Very High","rank":64,"rankChange":-3,"score":0.832},
    "gpi": {"year":2026,"rating":"Very Low","rank":163,"rankChange":0,"score":3.367},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":79,"rankChange":-13,"score":5.834},
    "gdi": {"year":2024,"rating":"200–249","rank":6,"score":230}
  },
  "RW": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":156,"rankChange":0,"score":21},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":152,"rankChange":-2,"score":0.09},
    "economist": {"year":2025,"rating":"Authoritarian","rank":114,"rankChange":-2,"score":3.34},
    "cpi": {"year":2025,"rating":"50–59","rank":41,"rankChange":2,"score":58},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":139,"rankChange":7,"score":39.58},
    "hdi": {"year":2023,"rating":"Medium","rank":159,"rankChange":1,"score":0.578},
    "genderGap": {"year":2026,"rating":"70–79","rank":28,"rankChange":11,"score":0.769},
    "gpi": {"year":2026,"rating":"Medium","rank":114,"rankChange":-2,"score":2.2}
  },
  "SA": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":178,"rankChange":0,"score":9},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":167,"rankChange":0,"score":0.05},
    "economist": {"year":2025,"rating":"Authoritarian","rank":147,"rankChange":-1,"score":2.08},
    "cpi": {"year":2025,"rating":"50–59","rank":45,"rankChange":-7,"score":57},
    "perception": {"year":2026,"rating":"Neutral","rank":41,"score":-2},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":176,"rankChange":-14,"score":19.11},
    "hdi": {"year":2023,"rating":"Very High","rank":37,"rankChange":0,"score":0.9},
    "genderGap": {"year":2026,"rating":"60–69","rank":137,"rankChange":-5,"score":0.633},
    "gpi": {"year":2026,"rating":"Medium","rank":95,"rankChange":-2,"score":2.067},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":22,"rankChange":10,"score":6.817},
    "gdi": {"year":2024,"rating":"100–149","rank":24,"score":128}
  },
  "SB": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":73,"rankChange":0,"score":75},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":55,"rankChange":-1,"score":0.54},
    "cpi": {"year":2025,"rating":"40–49","rank":73,"rankChange":3,"score":44},
    "hdi": {"year":2023,"rating":"Medium","rank":156,"rankChange":-1,"score":0.584}
  },
  "SC": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":67,"rankChange":0,"score":80},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":31,"rankChange":6,"score":0.68},
    "cpi": {"year":2025,"rating":"60–69","rank":24,"rankChange":-6,"score":68},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":35,"rankChange":10,"score":73.04},
    "hdi": {"year":2023,"rating":"Very High","rank":54,"rankChange":2,"score":0.848}
  },
  "SD": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":191,"rankChange":0,"score":2},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":174,"rankChange":0,"score":0.03},
    "economist": {"year":2025,"rating":"Authoritarian","rank":161,"rankChange":-1,"score":1.46},
    "cpi": {"year":2025,"rating":"10–19","rank":175,"rankChange":-5,"score":14},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":161,"rankChange":-5,"score":29.02},
    "hdi": {"year":2023,"rating":"Low","rank":176,"rankChange":-5,"score":0.511},
    "gpi": {"year":2026,"rating":"Very Low","rank":162,"rankChange":-3,"score":3.195}
  },
  "SE": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":2,"rankChange":0,"score":99},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":2,"rankChange":2,"score":0.85},
    "economist": {"year":2025,"rating":"Full democracy","rank":6,"rankChange":-3,"score":9.35},
    "cpi": {"year":2025,"rating":"80–89","rank":6,"rankChange":2,"score":80},
    "perception": {"year":2026,"rating":"Very Positive","rank":1,"score":29},
    "rsfPress": {"year":2026,"rating":"Good","rank":5,"rankChange":-1,"score":87.61},
    "hdi": {"year":2023,"rating":"Very High","rank":5,"rankChange":-1,"score":0.959},
    "genderGap": {"year":2026,"rating":"80–89","rank":7,"rankChange":-1,"score":0.823},
    "gpi": {"year":2026,"rating":"High","rank":40,"rankChange":-1,"score":1.732},
    "happiness": {"year":2026,"rating":"7.0–7.9","rank":5,"rankChange":-1,"score":7.255},
    "gdi": {"year":2024,"rating":"100–149","rank":37,"score":102}
  },
  "SG": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":118,"rankChange":0,"score":48},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":87,"rankChange":3,"score":0.36},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":68,"rankChange":-1,"score":6.18},
    "cpi": {"year":2025,"rating":"80–89","rank":3,"rankChange":0,"score":84},
    "perception": {"year":2026,"rating":"Neutral","rank":32,"score":2},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":123,"rankChange":0,"score":44.57},
    "hdi": {"year":2023,"rating":"Very High","rank":13,"rankChange":1,"score":0.946},
    "genderGap": {"year":2026,"rating":"70–79","rank":31,"rankChange":16,"score":0.764},
    "gpi": {"year":2026,"rating":"Very High","rank":8,"rankChange":-1,"score":1.435},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":36,"rankChange":-2,"score":6.585},
    "gdi": {"year":2024,"rating":"50–99","rank":52,"score":50}
  },
  "SI": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":11,"rankChange":0,"score":96},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":47,"rankChange":-6,"score":0.59},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":29,"rankChange":0,"score":7.82},
    "cpi": {"year":2025,"rating":"50–59","rank":41,"rankChange":-5,"score":58},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":36,"rankChange":-3,"score":72.88},
    "hdi": {"year":2023,"rating":"Very High","rank":21,"rankChange":0,"score":0.931},
    "genderGap": {"year":2026,"rating":"70–79","rank":23,"rankChange":6,"score":0.778},
    "gpi": {"year":2026,"rating":"Very High","rank":4,"rankChange":2,"score":1.369},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":18,"rankChange":1,"score":6.868},
    "gdi": {"year":2024,"rating":"50–99","rank":50,"score":58}
  },
  "SK": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":40,"rankChange":0,"score":89},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":50,"rankChange":-3,"score":0.57},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":48,"rankChange":-7,"score":6.94},
    "cpi": {"year":2025,"rating":"40–49","rank":61,"rankChange":-2,"score":48},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":37,"rankChange":1,"score":72.71},
    "hdi": {"year":2023,"rating":"Very High","rank":44,"rankChange":0,"score":0.88},
    "genderGap": {"year":2026,"rating":"70–79","rank":64,"rankChange":6,"score":0.721},
    "gpi": {"year":2026,"rating":"High","rank":29,"rankChange":-3,"score":1.661},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":54,"rankChange":-4,"score":6.255},
    "gdi": {"year":2024,"rating":"50–99","rank":45,"score":82}
  },
  "SL": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":102,"rankChange":0,"score":59},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":90,"rankChange":-3,"score":0.35},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":98,"rankChange":2,"score":4.44},
    "cpi": {"year":2025,"rating":"30–39","rank":109,"rankChange":5,"score":34},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":79,"rankChange":-23,"score":57.06},
    "hdi": {"year":2023,"rating":"Low","rank":185,"rankChange":0,"score":0.467},
    "genderGap": {"year":2026,"rating":"60–69","rank":109,"rankChange":3,"score":0.683},
    "gpi": {"year":2026,"rating":"Medium","rank":74,"rankChange":9,"score":1.937},
    "happiness": {"year":2026,"rating":"3.0–3.9","rank":146,"rankChange":0,"score":3.251}
  },
  "SM": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":5,"rankChange":0,"score":97},
    "hdi": {"year":2023,"rating":"Very High","rank":29,"rankChange":1,"score":0.915}
  },
  "SN": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":82,"rankChange":0,"score":69},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":68,"rankChange":2,"score":0.48},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":72,"rankChange":1,"score":6.05},
    "cpi": {"year":2025,"rating":"40–49","rank":65,"rankChange":4,"score":46},
    "perception": {"year":2026,"rating":"Positive","rank":20,"score":8},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":78,"rankChange":-4,"score":58.11},
    "hdi": {"year":2023,"rating":"Low","rank":169,"rankChange":0,"score":0.53},
    "genderGap": {"year":2026,"rating":"60–69","rank":118,"rankChange":-2,"score":0.67},
    "gpi": {"year":2026,"rating":"Medium","rank":75,"rankChange":12,"score":1.939},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":107,"rankChange":0,"score":4.787}
  },
  "SO": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":180,"rankChange":0,"score":8},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":128,"rankChange":2,"score":0.13},
    "cpi": {"year":2025,"rating":"0–9","rank":181,"rankChange":-2,"score":9},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":126,"rankChange":10,"score":43.84},
    "hdi": {"year":2023,"rating":"Low","rank":192,"rankChange":0,"score":0.404},
    "gpi": {"year":2026,"rating":"Very Low","rank":153,"rankChange":-4,"score":2.973},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":117,"rankChange":5,"score":4.508}
  },
  "SR": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":67,"rankChange":0,"score":80},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":41,"rankChange":-1,"score":0.63},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":45,"rankChange":2,"score":7.03},
    "cpi": {"year":2025,"rating":"30–39","rank":96,"rankChange":-8,"score":38},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":34,"rankChange":-2,"score":73.2},
    "hdi": {"year":2023,"rating":"High","rank":114,"rankChange":2,"score":0.722},
    "genderGap": {"year":2026,"rating":"70–79","rank":57,"rankChange":-5,"score":0.732}
  },
  "SS": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":192,"rankChange":0,"score":1},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":156,"rankChange":0,"score":0.06},
    "cpi": {"year":2025,"rating":"0–9","rank":181,"rankChange":-1,"score":9},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":118,"rankChange":-9,"score":46.16},
    "hdi": {"year":2023,"rating":"Low","rank":193,"rankChange":-2,"score":0.388},
    "gpi": {"year":2026,"rating":"Very Low","rank":158,"rankChange":-2,"score":3.116}
  },
  "ST": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":53,"rankChange":0,"score":84},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":61,"rankChange":-4,"score":0.52},
    "cpi": {"year":2025,"rating":"40–49","rank":70,"rankChange":-1,"score":45},
    "hdi": {"year":2023,"rating":"Medium","rank":141,"rankChange":0,"score":0.637}
  },
  "SV": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":121,"rankChange":0,"score":47},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":153,"rankChange":-2,"score":0.09},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":96,"rankChange":-3,"score":4.57},
    "cpi": {"year":2025,"rating":"30–39","rank":120,"rankChange":10,"score":32},
    "perception": {"year":2026,"rating":"Neutral","rank":43,"score":-3},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":143,"rankChange":-8,"score":38.88},
    "hdi": {"year":2023,"rating":"Medium","rank":132,"rankChange":2,"score":0.678},
    "genderGap": {"year":2026,"rating":"70–79","rank":61,"rankChange":17,"score":0.724},
    "gpi": {"year":2026,"rating":"Medium","rank":121,"rankChange":1,"score":2.264},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":37,"rankChange":0,"score":6.578}
  },
  "SY": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":185,"rankChange":0,"score":5},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":163,"rankChange":0,"score":0.05},
    "economist": {"year":2025,"rating":"Authoritarian","rank":162,"rankChange":-1,"score":1.37},
    "cpi": {"year":2025,"rating":"10–19","rank":172,"rankChange":5,"score":15},
    "perception": {"year":2026,"rating":"Neutral","rank":49,"score":-5},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":141,"rankChange":36,"score":39.44},
    "hdi": {"year":2023,"rating":"Medium","rank":162,"rankChange":-3,"score":0.564},
    "gpi": {"year":2026,"rating":"Very Low","rank":155,"rankChange":0,"score":3.067}
  },
  "SZ": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":163,"rankChange":0,"score":17},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":148,"rankChange":-3,"score":0.1},
    "economist": {"year":2025,"rating":"Authoritarian","rank":134,"rankChange":-2,"score":2.6},
    "cpi": {"year":2025,"rating":"20–29","rank":153,"rankChange":-18,"score":23},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":101,"rankChange":-3,"score":51.94},
    "hdi": {"year":2023,"rating":"Medium","rank":126,"rankChange":0,"score":0.695},
    "genderGap": {"year":2026,"rating":"70–79","rank":76,"rankChange":-30,"score":0.714},
    "gpi": {"year":2026,"rating":"Medium","rank":104,"rankChange":6,"score":2.095},
    "happiness": {"year":2026,"rating":"3.0–3.9","rank":137,"rankChange":0,"score":3.909}
  },
  "TD": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":165,"rankChange":0,"score":15},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":158,"rankChange":4,"score":0.06},
    "economist": {"year":2025,"rating":"Authoritarian","rank":158,"rankChange":-2,"score":1.76},
    "cpi": {"year":2025,"rating":"20–29","rank":157,"rankChange":1,"score":22},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":93,"rankChange":15,"score":53.9},
    "hdi": {"year":2023,"rating":"Low","rank":190,"rankChange":-1,"score":0.416},
    "genderGap": {"year":2026,"rating":"50–59","rank":145,"rankChange":1,"score":0.578},
    "gpi": {"year":2026,"rating":"Low","rank":145,"rankChange":-9,"score":2.769},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":125,"rankChange":-6,"score":4.385}
  },
  "TG": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":127,"rankChange":0,"score":41},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":121,"rankChange":-1,"score":0.16},
    "economist": {"year":2025,"rating":"Authoritarian","rank":124,"rankChange":-5,"score":2.88},
    "cpi": {"year":2025,"rating":"30–39","rank":120,"rankChange":1,"score":32},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":97,"rankChange":24,"score":52.56},
    "hdi": {"year":2023,"rating":"Medium","rank":161,"rankChange":0,"score":0.571},
    "genderGap": {"year":2026,"rating":"60–69","rank":116,"rankChange":5,"score":0.675},
    "gpi": {"year":2026,"rating":"Medium","rank":119,"rankChange":7,"score":2.251},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":131,"rankChange":-4,"score":4.277}
  },
  "TH": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":134,"rankChange":0,"score":34},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":95,"rankChange":4,"score":0.31},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":54,"rankChange":8,"score":6.59},
    "cpi": {"year":2025,"rating":"30–39","rank":116,"rankChange":-9,"score":33},
    "perception": {"year":2026,"rating":"Neutral","rank":35,"score":0},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":92,"rankChange":-7,"score":53.97},
    "hdi": {"year":2023,"rating":"High","rank":76,"rankChange":2,"score":0.798},
    "genderGap": {"year":2026,"rating":"70–79","rank":55,"rankChange":11,"score":0.735},
    "gpi": {"year":2026,"rating":"Medium","rank":101,"rankChange":-7,"score":2.089},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":52,"rankChange":-3,"score":6.296},
    "gdi": {"year":2024,"rating":"50–99","rank":39,"score":97}
  },
  "TJ": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":185,"rankChange":0,"score":5},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":168,"rankChange":2,"score":0.04},
    "economist": {"year":2025,"rating":"Authoritarian","rank":155,"rankChange":2,"score":1.94},
    "cpi": {"year":2025,"rating":"10–19","rank":166,"rankChange":-2,"score":19},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":155,"rankChange":-2,"score":32.22},
    "hdi": {"year":2023,"rating":"Medium","rank":128,"rankChange":1,"score":0.691},
    "genderGap": {"year":2026,"rating":"60–69","rank":136,"rankChange":-7,"score":0.638},
    "gpi": {"year":2026,"rating":"High","rank":47,"rankChange":-6,"score":1.799},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":88,"rankChange":2,"score":5.591}
  },
  "TL": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":79,"rankChange":0,"score":72},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":54,"rankChange":-1,"score":0.55},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":46,"rankChange":-1,"score":6.97},
    "cpi": {"year":2025,"rating":"40–49","rank":73,"rankChange":0,"score":44},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":30,"rankChange":9,"score":75.29},
    "hdi": {"year":2023,"rating":"Medium","rank":142,"rankChange":0,"score":0.634},
    "genderGap": {"year":2026,"rating":"70–79","rank":93,"rankChange":-7,"score":0.701},
    "gpi": {"year":2026,"rating":"High","rank":32,"rankChange":-2,"score":1.681},
    "gdi": {"year":2024,"rating":"Below 50","rank":63,"score":31}
  },
  "TM": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":192,"rankChange":0,"score":1},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":173,"rankChange":0,"score":0.03},
    "economist": {"year":2025,"rating":"Authoritarian","rank":160,"rankChange":-1,"score":1.54},
    "cpi": {"year":2025,"rating":"10–19","rank":167,"rankChange":-2,"score":17},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":173,"rankChange":1,"score":23.06},
    "hdi": {"year":2023,"rating":"High","rank":95,"rankChange":1,"score":0.764},
    "gpi": {"year":2026,"rating":"High","rank":66,"rankChange":-2,"score":1.903}
  },
  "TN": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":123,"rankChange":0,"score":44},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":104,"rankChange":-1,"score":0.27},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":94,"rankChange":-3,"score":4.65},
    "cpi": {"year":2025,"rating":"30–39","rank":91,"rankChange":1,"score":39},
    "perception": {"year":2026,"rating":"Neutral","rank":28,"score":4},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":137,"rankChange":-8,"score":40.43},
    "hdi": {"year":2023,"rating":"High","rank":105,"rankChange":-1,"score":0.746},
    "genderGap": {"year":2026,"rating":"60–69","rank":125,"rankChange":-2,"score":0.65},
    "gpi": {"year":2026,"rating":"Medium","rank":77,"rankChange":19,"score":1.947},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":105,"rankChange":8,"score":4.798}
  },
  "TO": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":67,"rankChange":0,"score":80},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":51,"rankChange":-5,"score":66.62},
    "hdi": {"year":2023,"rating":"High","rank":92,"rankChange":-1,"score":0.769}
  },
  "TR": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":137,"rankChange":0,"score":33},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":139,"rankChange":3,"score":0.11},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":102,"rankChange":-1,"score":4.26},
    "cpi": {"year":2025,"rating":"30–39","rank":124,"rankChange":-17,"score":31},
    "perception": {"year":2026,"rating":"Negative","rank":70,"score":-14},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":163,"rankChange":-4,"score":27.94},
    "hdi": {"year":2023,"rating":"Very High","rank":51,"rankChange":-3,"score":0.853},
    "genderGap": {"year":2026,"rating":"60–69","rank":126,"rankChange":9,"score":0.649},
    "gpi": {"year":2026,"rating":"Low","rank":136,"rankChange":8,"score":2.605},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":94,"rankChange":0,"score":5.3},
    "gdi": {"year":2024,"rating":"250+","rank":3,"score":252}
  },
  "TT": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":59,"rankChange":0,"score":82},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":34,"rankChange":1,"score":0.67},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":43,"rankChange":1,"score":7.09},
    "cpi": {"year":2025,"rating":"40–49","rank":81,"rankChange":1,"score":41},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":32,"rankChange":-13,"score":74.7},
    "hdi": {"year":2023,"rating":"Very High","rank":72,"rankChange":-1,"score":0.807},
    "genderGap": {"year":2026,"rating":"70–79","rank":38,"rankChange":-10,"score":0.757},
    "gpi": {"year":2026,"rating":"Medium","rank":79,"rankChange":-12,"score":1.959},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":76,"rankChange":-6,"score":5.905}
  },
  "TV": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":24,"rankChange":0,"score":93},
    "hdi": {"year":2023,"rating":"Medium","rank":129,"rankChange":1,"score":0.689}
  },
  "TZ": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":133,"rankChange":0,"score":35},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":97,"rankChange":-8,"score":0.3},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":87,"rankChange":-2,"score":5.13},
    "cpi": {"year":2025,"rating":"40–49","rank":84,"rankChange":-2,"score":40},
    "perception": {"year":2026,"rating":"Very Negative","rank":78,"score":-17},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":117,"rankChange":-22,"score":46.22},
    "hdi": {"year":2023,"rating":"Medium","rank":165,"rankChange":0,"score":0.555},
    "genderGap": {"year":2026,"rating":"70–79","rank":54,"rankChange":1,"score":0.736},
    "gpi": {"year":2026,"rating":"Medium","rank":98,"rankChange":-20,"score":2.08},
    "happiness": {"year":2026,"rating":"3.0–3.9","rank":138,"rankChange":-2,"score":3.902}
  },
  "UA": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":114,"rankChange":0,"score":51},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":108,"rankChange":1,"score":0.24},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":93,"rankChange":-3,"score":4.79},
    "cpi": {"year":2025,"rating":"30–39","rank":104,"rankChange":1,"score":36},
    "perception": {"year":2026,"rating":"Very Negative","rank":92,"score":-23},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":55,"rankChange":7,"score":66.1},
    "hdi": {"year":2023,"rating":"High","rank":87,"rankChange":3,"score":0.779},
    "genderGap": {"year":2026,"rating":"70–79","rank":66,"rankChange":-4,"score":0.721},
    "gpi": {"year":2026,"rating":"Very Low","rank":160,"rankChange":2,"score":3.184},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":111,"rankChange":0,"score":4.658}
  },
  "UG": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":134,"rankChange":0,"score":34},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":119,"rankChange":0,"score":0.17},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":100,"rankChange":-4,"score":4.31},
    "cpi": {"year":2025,"rating":"20–29","rank":148,"rankChange":-8,"score":25},
    "perception": {"year":2026,"rating":"Very Negative","rank":76,"score":-16},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":131,"rankChange":12,"score":41.98},
    "hdi": {"year":2023,"rating":"Medium","rank":157,"rankChange":0,"score":0.582},
    "gpi": {"year":2026,"rating":"Low","rank":130,"rankChange":-7,"score":2.42},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":118,"rankChange":-2,"score":4.491}
  },
  "US": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":53,"rankChange":0,"score":84},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":51,"rankChange":-28,"score":0.57},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":34,"rankChange":-7,"score":7.65},
    "cpi": {"year":2025,"rating":"60–69","rank":29,"rankChange":-1,"score":64},
    "perception": {"year":2026,"rating":"Neutral","rank":36,"score":-1},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":64,"rankChange":-7,"score":62.61},
    "hdi": {"year":2023,"rating":"Very High","rank":17,"rankChange":1,"score":0.938},
    "genderGap": {"year":2026,"rating":"70–79","rank":47,"rankChange":-5,"score":0.749},
    "gpi": {"year":2026,"rating":"Low","rank":134,"rankChange":-4,"score":2.535},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":23,"rankChange":1,"score":6.816},
    "gdi": {"year":2024,"rating":"250+","rank":2,"score":271}
  },
  "UY": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":11,"rankChange":0,"score":96},
    "vDem": {"year":2026,"rating":"Liberal Democracy","rank":13,"rankChange":4,"score":0.79},
    "economist": {"year":2025,"rating":"Full democracy","rank":12,"rankChange":2,"score":8.92},
    "cpi": {"year":2025,"rating":"70–79","rank":17,"rankChange":-4,"score":73},
    "perception": {"year":2026,"rating":"Positive","rank":23,"score":7},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":48,"rankChange":11,"score":68.72},
    "hdi": {"year":2023,"rating":"Very High","rank":48,"rankChange":2,"score":0.862},
    "genderGap": {"year":2026,"rating":"70–79","rank":53,"rankChange":18,"score":0.74},
    "gpi": {"year":2026,"rating":"High","rank":43,"rankChange":-1,"score":1.754},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":31,"rankChange":-3,"score":6.635}
  },
  "UZ": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":171,"rankChange":0,"score":12},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":154,"rankChange":1,"score":0.08},
    "economist": {"year":2025,"rating":"Authoritarian","rank":146,"rankChange":-2,"score":2.1},
    "cpi": {"year":2025,"rating":"30–39","rank":124,"rankChange":-3,"score":31},
    "perception": {"year":2026,"rating":"Neutral","rank":47,"score":-4},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":147,"rankChange":1,"score":34.95},
    "hdi": {"year":2023,"rating":"High","rank":107,"rankChange":0,"score":0.74},
    "genderGap": {"year":2026,"rating":"60–69","rank":110,"rankChange":0,"score":0.682},
    "gpi": {"year":2026,"rating":"High","rank":37,"rankChange":10,"score":1.726},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":53,"rankChange":0,"score":6.283}
  },
  "VC": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":36,"rankChange":0,"score":90},
    "cpi": {"year":2025,"rating":"60–69","rank":31,"rankChange":1,"score":63},
    "hdi": {"year":2023,"rating":"High","rank":76,"rankChange":-1,"score":0.798}
  },
  "VE": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":169,"rankChange":0,"score":13},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":170,"rankChange":-1,"score":0.04},
    "economist": {"year":2025,"rating":"Authoritarian","rank":144,"rankChange":-4,"score":2.13},
    "cpi": {"year":2025,"rating":"10–19","rank":180,"rankChange":-2,"score":10},
    "perception": {"year":2026,"rating":"Very Negative","rank":90,"score":-22},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":159,"rankChange":1,"score":30.48},
    "hdi": {"year":2023,"rating":"High","rank":121,"rankChange":0,"score":0.709},
    "gpi": {"year":2026,"rating":"Low","rank":133,"rankChange":-4,"score":2.516},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":80,"rankChange":2,"score":5.756}
  },
  "VN": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":158,"rankChange":0,"score":20},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":144,"rankChange":-3,"score":0.1},
    "economist": {"year":2025,"rating":"Authoritarian","rank":133,"rankChange":-2,"score":2.62},
    "cpi": {"year":2025,"rating":"40–49","rank":81,"rankChange":7,"score":41},
    "perception": {"year":2026,"rating":"Positive","rank":14,"score":10},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":174,"rankChange":-1,"score":21.15},
    "hdi": {"year":2023,"rating":"High","rank":93,"rankChange":-2,"score":0.766},
    "genderGap": {"year":2026,"rating":"70–79","rank":84,"rankChange":-10,"score":0.707},
    "gpi": {"year":2026,"rating":"High","rank":41,"rankChange":-1,"score":1.738},
    "happiness": {"year":2026,"rating":"6.0–6.9","rank":45,"rankChange":1,"score":6.428},
    "gdi": {"year":2024,"rating":"50–99","rank":40,"score":94}
  },
  "VU": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":59,"rankChange":0,"score":82},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":42,"rankChange":-10,"score":0.62},
    "cpi": {"year":2025,"rating":"40–49","rank":63,"rankChange":-6,"score":47},
    "hdi": {"year":2023,"rating":"Medium","rank":146,"rankChange":-1,"score":0.621},
    "genderGap": {"year":2026,"rating":"60–69","rank":107,"rankChange":2,"score":0.686}
  },
  "WS": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":53,"rankChange":0,"score":84},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":59,"rankChange":-15,"score":64.53},
    "hdi": {"year":2023,"rating":"High","rank":122,"rankChange":1,"score":0.708}
  },
  "YE": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":175,"rankChange":0,"score":10},
    "vDem": {"year":2026,"rating":"Closed Autocracy","rank":169,"rankChange":-1,"score":0.04},
    "economist": {"year":2025,"rating":"Authoritarian","rank":153,"rankChange":0,"score":1.95},
    "cpi": {"year":2025,"rating":"10–19","rank":177,"rankChange":-4,"score":13},
    "perception": {"year":2026,"rating":"Very Negative","rank":95,"score":-25},
    "rsfPress": {"year":2026,"rating":"Very serious","rank":164,"rankChange":-10,"score":27.89},
    "hdi": {"year":2023,"rating":"Low","rank":184,"rankChange":0,"score":0.47},
    "gpi": {"year":2026,"rating":"Very Low","rank":156,"rankChange":2,"score":3.081},
    "happiness": {"year":2026,"rating":"3.0–3.9","rank":142,"rankChange":-2,"score":3.532}
  },
  "ZA": {
    "freedomHouse": {"year":2024,"rating":"Free","rank":65,"rankChange":0,"score":81},
    "vDem": {"year":2026,"rating":"Electoral Democracy","rank":39,"rankChange":-1,"score":0.63},
    "economist": {"year":2025,"rating":"Flawed democracy","rank":41,"rankChange":1,"score":7.16},
    "cpi": {"year":2025,"rating":"40–49","rank":81,"rankChange":1,"score":41},
    "perception": {"year":2026,"rating":"Negative","rank":54,"score":-8},
    "rsfPress": {"year":2026,"rating":"Satisfactory","rank":21,"rankChange":6,"score":77.95},
    "hdi": {"year":2023,"rating":"High","rank":106,"rankChange":1,"score":0.741},
    "genderGap": {"year":2026,"rating":"70–79","rank":30,"rankChange":3,"score":0.766},
    "gpi": {"year":2026,"rating":"Medium","rank":123,"rankChange":-4,"score":2.308},
    "happiness": {"year":2026,"rating":"5.0–5.9","rank":101,"rankChange":-6,"score":5.009},
    "gdi": {"year":2024,"rating":"100–149","rank":31,"score":114}
  },
  "ZM": {
    "freedomHouse": {"year":2024,"rating":"Partly Free","rank":111,"rankChange":0,"score":53},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":84,"rankChange":-4,"score":0.38},
    "economist": {"year":2025,"rating":"Hybrid regime","rank":78,"rankChange":-2,"score":5.82},
    "cpi": {"year":2025,"rating":"30–39","rank":99,"rankChange":-7,"score":37},
    "perception": {"year":2026,"rating":"Neutral","rank":29,"score":3},
    "rsfPress": {"year":2026,"rating":"Problematic","rank":77,"rankChange":5,"score":58.58},
    "hdi": {"year":2023,"rating":"Medium","rank":154,"rankChange":0,"score":0.595},
    "genderGap": {"year":2026,"rating":"60–69","rank":108,"rankChange":-29,"score":0.684},
    "gpi": {"year":2026,"rating":"Medium","rank":82,"rankChange":-2,"score":1.992},
    "happiness": {"year":2026,"rating":"4.0–4.9","rank":133,"rankChange":-2,"score":4.106}
  },
  "ZW": {
    "freedomHouse": {"year":2024,"rating":"Not Free","rank":146,"rankChange":0,"score":26},
    "vDem": {"year":2026,"rating":"Electoral Autocracy","rank":123,"rankChange":-1,"score":0.15},
    "economist": {"year":2025,"rating":"Authoritarian","rank":122,"rankChange":-2,"score":2.98},
    "cpi": {"year":2025,"rating":"20–29","rank":157,"rankChange":1,"score":22},
    "perception": {"year":2026,"rating":"Very Negative","rank":78,"score":-17},
    "rsfPress": {"year":2026,"rating":"Difficult","rank":124,"rankChange":-18,"score":44.37},
    "hdi": {"year":2023,"rating":"Medium","rank":153,"rankChange":0,"score":0.598},
    "genderGap": {"year":2026,"rating":"70–79","rank":49,"rankChange":0,"score":0.743},
    "gpi": {"year":2026,"rating":"Medium","rank":90,"rankChange":10,"score":2.051},
    "happiness": {"year":2026,"rating":"3.0–3.9","rank":144,"rankChange":-1,"score":3.346}
  }
};
