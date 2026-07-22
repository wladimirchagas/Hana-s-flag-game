/**
 * Curated, dated, CITY-PROPER populations (and native names) for the national
 * capitals shown in the hierarchy's "National capital" panel that are NOT any
 * subdivision's capital — so they have no subdivision-keyed `CAPITAL_DETAILS`
 * entry. Keyed by `"<ISO 3166-1 alpha-2>|<normalizeForSearch(capital name)>"`.
 *
 * Every figure follows the population hard rule (see CLAUDE.md): it is the
 * city/municipality-proper count — NEVER a metropolitan/agglomeration figure —
 * the LATEST authoritative enumeration, dated with its `year` + `basis`, from an
 * authoritative source (each entry cites it). A capital whose city-proper figure
 * cannot be confidently separated from a metro/district figure is OMITTED here:
 * a missing population always beats a wrong (metro) one. Never fabricate.
 *
 * `endonym` is set only where the local-language name genuinely differs from the
 * displayed (English) name.
 */
export type NationalCapitalDetail = {
  population: number;
  year: number;
  basis: string;
  endonym?: string;
};

export const NATIONAL_CAPITAL_DETAILS: Record<string, NationalCapitalDetail> = {
  // City of Pretoria proper (not the City of Tshwane metro ~3.2M) — SA 2011 Census.
  "ZA|pretoria": { population: 741651, year: 2011, basis: "census" },
  // City of Ottawa — Statistics Canada 2021 Census.
  "CA|ottawa": { population: 1017449, year: 2021, basis: "census" },
  // Amsterdam municipality — CBS (Statistics Netherlands), 2023.
  "NL|amsterdam": { population: 921468, year: 2023, basis: "estimate" },
  // Copenhagen Municipality (Københavns Kommune) — Statistics Denmark, 2025.
  "DK|kobenhavn": { population: 667099, year: 2025, basis: "estimate" },
  // Astana (city with special status) — Kazakhstan Bureau of Statistics, 2022.
  "KZ|astana": { population: 1239744, year: 2022, basis: "estimate", endonym: "Астана" },
  // Belmopan (city) — Statistical Institute of Belize, 2022.
  "BZ|belmopan": { population: 20754, year: 2022, basis: "estimate" },
  // Antananarivo Renivohitra (city proper, not the ~2.6M urban agglomeration) — 2018.
  "MG|antananarivo": { population: 1275207, year: 2018, basis: "estimate" },
  // Mbabane (city) — Eswatini, 2017 Census.
  "SZ|mbabane": { population: 60691, year: 2017, basis: "census" },
};
