// Curated sub-national population figures for the Learn-mode subdivision panel.
//
// WHY THIS IS HAND-CURATED (and not bulk-imported):
// The Learn panel shows, for a selected subdivision (e.g. Victoria), its total
// resident population and its share of the national population, *with the year
// of the figure*. No machine-readable, dated, authoritative sub-national
// population dataset is reachable from this project's build/CI network policy
// (Wikidata, the World Bank API and the GeoNames dumps are all blocked; the
// only sub-national population field available over the open mirror — GeoNames'
// `gn_pop`, re-exported by bulk datasets such as dr5hn/countries-states-cities —
// is undated and frequently carries the administrative *seat city's* population
// rather than the whole region's, so it is exactly the kind of unreliable bulk
// import this project's rules forbid trusting).
//
// Each entry is therefore taken from the country's own statistical authority
// (census or official estimate) and carries the figure's `year` and `basis`
// so the panel can state when the number is from. The `population` is the total
// resident population of the whole subdivision.
//
// HOW TO EXTEND: add the subdivision's ISO 3166-2 code (matching the codes in
// src/lib/subdivisionMeta.ts) with a population sourced from that country's
// statistical office, the figure's reference year, and a short `basis`
// ("census" or "estimate"). Never invent or approximate a figure — leave a
// subdivision absent rather than guess (the panel simply omits the row when no
// entry exists, exactly like the country fact-sheet rows).

export type SubdivisionPopulation = {
  /** Total resident population of the whole subdivision. */
  population: number;
  /** Reference year of the figure. */
  year: number;
  /** How the figure was produced — shown after the year ("2021 census"). */
  basis: "census" | "estimate";
};

// National totals matching the SAME census/estimate vintage as the
// subdivisions below, used purely as the denominator when computing a
// subdivision's "share of the national population". Keeping numerator and
// denominator from the same vintage makes the percentage internally consistent
// and lets the share render even when the live national-population source
// (World Bank / REST Countries) is unavailable. The live figure is preferred
// when present (see SubdivisionPopulation.tsx) so the share stays current; this
// is only the fallback denominator, never shown as "the national population".
export const NATIONAL_REFERENCE_POPULATION: Record<string, number> = {
  AU: 26638500, // ABS Estimated Resident Population, 30 June 2023
  CA: 36991981, // 2021 Census of Population
  DE: 84358845, // Destatis, 31 December 2022
  GB: 66937317, // England+Wales+NI 2021 Census + Scotland 2022 Census
  US: 331449281, // 2020 Census (1 April 2020)
  BR: 203080756, // 2022 Census (IBGE)
};

export const SUBDIVISION_POPULATION: Record<string, SubdivisionPopulation> = {
  // ── Australia — ABS Estimated Resident Population, 30 June 2023 ──────────
  "AU-NSW": { population: 8339300, year: 2023, basis: "estimate" },
  "AU-VIC": { population: 6812200, year: 2023, basis: "estimate" },
  "AU-QLD": { population: 5459400, year: 2023, basis: "estimate" },
  "AU-WA": { population: 2878700, year: 2023, basis: "estimate" },
  "AU-SA": { population: 1851500, year: 2023, basis: "estimate" },
  "AU-TAS": { population: 573500, year: 2023, basis: "estimate" },
  "AU-ACT": { population: 466800, year: 2023, basis: "estimate" },
  "AU-NT": { population: 252500, year: 2023, basis: "estimate" },
  // Australian external territories — 2021 Census of Population and Housing
  "AU-NF": { population: 2188, year: 2021, basis: "census" },
  "AU-CX": { population: 1692, year: 2021, basis: "census" },
  "AU-CC": { population: 593, year: 2021, basis: "census" },

  // ── Canada — 2021 Census of Population (Statistics Canada) ───────────────
  "CA-ON": { population: 14223942, year: 2021, basis: "census" },
  "CA-QC": { population: 8501833, year: 2021, basis: "census" },
  "CA-BC": { population: 5000879, year: 2021, basis: "census" },
  "CA-AB": { population: 4262635, year: 2021, basis: "census" },
  "CA-MB": { population: 1342153, year: 2021, basis: "census" },
  "CA-SK": { population: 1132505, year: 2021, basis: "census" },
  "CA-NS": { population: 969383, year: 2021, basis: "census" },
  "CA-NB": { population: 775610, year: 2021, basis: "census" },
  "CA-NL": { population: 510550, year: 2021, basis: "census" },
  "CA-PE": { population: 154331, year: 2021, basis: "census" },
  "CA-NT": { population: 41070, year: 2021, basis: "census" },
  "CA-YT": { population: 40232, year: 2021, basis: "census" },
  "CA-NU": { population: 36858, year: 2021, basis: "census" },

  // ── Germany — Destatis population estimate, 31 December 2022 ─────────────
  "DE-NW": { population: 18139116, year: 2022, basis: "estimate" },
  "DE-BY": { population: 13369393, year: 2022, basis: "estimate" },
  "DE-BW": { population: 11280257, year: 2022, basis: "estimate" },
  "DE-NI": { population: 8140242, year: 2022, basis: "estimate" },
  "DE-HE": { population: 6391360, year: 2022, basis: "estimate" },
  "DE-RP": { population: 4159150, year: 2022, basis: "estimate" },
  "DE-SN": { population: 4086152, year: 2022, basis: "estimate" },
  "DE-BE": { population: 3755251, year: 2022, basis: "estimate" },
  "DE-SH": { population: 2953270, year: 2022, basis: "estimate" },
  "DE-BB": { population: 2573135, year: 2022, basis: "estimate" },
  "DE-ST": { population: 2186643, year: 2022, basis: "estimate" },
  "DE-TH": { population: 2126846, year: 2022, basis: "estimate" },
  "DE-HH": { population: 1892122, year: 2022, basis: "estimate" },
  "DE-MV": { population: 1628378, year: 2022, basis: "estimate" },
  "DE-SL": { population: 992666, year: 2022, basis: "estimate" },
  "DE-HB": { population: 676463, year: 2022, basis: "estimate" },

  // ── United Kingdom — 2021/2022 census ───────────────────────────────────
  // England & Wales and Northern Ireland: Census 2021. Scotland: Census 2022.
  "GB-ENG": { population: 56490048, year: 2021, basis: "census" },
  "GB-SCT": { population: 5436600, year: 2022, basis: "census" },
  "GB-WLS": { population: 3107494, year: 2021, basis: "census" },
  "GB-NIR": { population: 1903175, year: 2021, basis: "census" },
  // Crown Dependencies
  "GB-JE": { population: 103267, year: 2021, basis: "census" },
  "GB-IM": { population: 84069, year: 2021, basis: "census" },
  "GB-GG": { population: 63950, year: 2023, basis: "estimate" },
  // Overseas Territories
  "GB-GI": { population: 32688, year: 2022, basis: "census" },
  "GB-KY": { population: 81546, year: 2023, basis: "estimate" },
  "GB-BM": { population: 64055, year: 2016, basis: "census" },
  "GB-TC": { population: 45114, year: 2021, basis: "estimate" },
  "GB-VG": { population: 31538, year: 2023, basis: "estimate" },
  "GB-AI": { population: 15753, year: 2021, basis: "estimate" },
  "GB-SH": { population: 4439, year: 2021, basis: "census" },
  "GB-MS": { population: 4433, year: 2018, basis: "census" },
  "GB-FK": { population: 3662, year: 2021, basis: "census" },
  "GB-PN": { population: 47, year: 2021, basis: "census" },

  // ── United States — 2020 Census (1 April 2020, U.S. Census Bureau) ───────
  "US-CA": { population: 39538223, year: 2020, basis: "census" },
  "US-TX": { population: 29145505, year: 2020, basis: "census" },
  "US-FL": { population: 21538187, year: 2020, basis: "census" },
  "US-NY": { population: 20201249, year: 2020, basis: "census" },
  "US-PA": { population: 13002700, year: 2020, basis: "census" },
  "US-IL": { population: 12812508, year: 2020, basis: "census" },
  "US-OH": { population: 11799448, year: 2020, basis: "census" },
  "US-GA": { population: 10711908, year: 2020, basis: "census" },
  "US-NC": { population: 10439388, year: 2020, basis: "census" },
  "US-MI": { population: 10077331, year: 2020, basis: "census" },
  "US-NJ": { population: 9288994, year: 2020, basis: "census" },
  "US-VA": { population: 8631393, year: 2020, basis: "census" },
  "US-WA": { population: 7705281, year: 2020, basis: "census" },
  "US-AZ": { population: 7151502, year: 2020, basis: "census" },
  "US-MA": { population: 7029917, year: 2020, basis: "census" },
  "US-TN": { population: 6910840, year: 2020, basis: "census" },
  "US-IN": { population: 6785528, year: 2020, basis: "census" },
  "US-MD": { population: 6177224, year: 2020, basis: "census" },
  "US-MO": { population: 6154913, year: 2020, basis: "census" },
  "US-WI": { population: 5893718, year: 2020, basis: "census" },
  "US-CO": { population: 5773714, year: 2020, basis: "census" },
  "US-MN": { population: 5706494, year: 2020, basis: "census" },
  "US-SC": { population: 5118425, year: 2020, basis: "census" },
  "US-AL": { population: 5024279, year: 2020, basis: "census" },
  "US-LA": { population: 4657757, year: 2020, basis: "census" },
  "US-KY": { population: 4505836, year: 2020, basis: "census" },
  "US-OR": { population: 4237256, year: 2020, basis: "census" },
  "US-OK": { population: 3959353, year: 2020, basis: "census" },
  "US-CT": { population: 3605944, year: 2020, basis: "census" },
  "US-UT": { population: 3271616, year: 2020, basis: "census" },
  "US-IA": { population: 3190369, year: 2020, basis: "census" },
  "US-NV": { population: 3104614, year: 2020, basis: "census" },
  "US-AR": { population: 3011524, year: 2020, basis: "census" },
  "US-MS": { population: 2961279, year: 2020, basis: "census" },
  "US-KS": { population: 2937880, year: 2020, basis: "census" },
  "US-NM": { population: 2117522, year: 2020, basis: "census" },
  "US-NE": { population: 1961504, year: 2020, basis: "census" },
  "US-ID": { population: 1839106, year: 2020, basis: "census" },
  "US-WV": { population: 1793716, year: 2020, basis: "census" },
  "US-HI": { population: 1455271, year: 2020, basis: "census" },
  "US-NH": { population: 1377529, year: 2020, basis: "census" },
  "US-ME": { population: 1362359, year: 2020, basis: "census" },
  "US-RI": { population: 1097379, year: 2020, basis: "census" },
  "US-MT": { population: 1084225, year: 2020, basis: "census" },
  "US-DE": { population: 989948, year: 2020, basis: "census" },
  "US-SD": { population: 886667, year: 2020, basis: "census" },
  "US-ND": { population: 779094, year: 2020, basis: "census" },
  "US-AK": { population: 733391, year: 2020, basis: "census" },
  "US-DC": { population: 689545, year: 2020, basis: "census" },
  "US-VT": { population: 643077, year: 2020, basis: "census" },
  "US-WY": { population: 576851, year: 2020, basis: "census" },
  // U.S. territories — 2020 Census
  "US-PR": { population: 3285874, year: 2020, basis: "census" },
  "US-GU": { population: 153836, year: 2020, basis: "census" },
  "US-VI": { population: 87146, year: 2020, basis: "census" },
  "US-AS": { population: 49710, year: 2020, basis: "census" },
  "US-MP": { population: 47329, year: 2020, basis: "census" },

  // ── Brazil — 2022 Census (IBGE, Censo Demográfico 2022) ──────────────────
  "BR-SP": { population: 44411238, year: 2022, basis: "census" },
  "BR-MG": { population: 20538718, year: 2022, basis: "census" },
  "BR-RJ": { population: 16055174, year: 2022, basis: "census" },
  "BR-BA": { population: 14141626, year: 2022, basis: "census" },
  "BR-PR": { population: 11444380, year: 2022, basis: "census" },
  "BR-RS": { population: 10882965, year: 2022, basis: "census" },
  "BR-PE": { population: 9058931, year: 2022, basis: "census" },
  "BR-CE": { population: 8794957, year: 2022, basis: "census" },
  "BR-PA": { population: 8120131, year: 2022, basis: "census" },
  "BR-SC": { population: 7610361, year: 2022, basis: "census" },
  "BR-GO": { population: 7056495, year: 2022, basis: "census" },
  "BR-MA": { population: 6775805, year: 2022, basis: "census" },
  "BR-PB": { population: 3974687, year: 2022, basis: "census" },
  "BR-AM": { population: 3941613, year: 2022, basis: "census" },
  "BR-ES": { population: 3833712, year: 2022, basis: "census" },
  "BR-MT": { population: 3658649, year: 2022, basis: "census" },
  "BR-RN": { population: 3302729, year: 2022, basis: "census" },
  "BR-PI": { population: 3271199, year: 2022, basis: "census" },
  "BR-AL": { population: 3127683, year: 2022, basis: "census" },
  "BR-DF": { population: 2817068, year: 2022, basis: "census" },
  "BR-MS": { population: 2757013, year: 2022, basis: "census" },
  "BR-SE": { population: 2209558, year: 2022, basis: "census" },
  "BR-RO": { population: 1581196, year: 2022, basis: "census" },
  "BR-TO": { population: 1511460, year: 2022, basis: "census" },
  "BR-AC": { population: 830018, year: 2022, basis: "census" },
  "BR-AP": { population: 733759, year: 2022, basis: "census" },
  "BR-RR": { population: 636707, year: 2022, basis: "census" },
};
