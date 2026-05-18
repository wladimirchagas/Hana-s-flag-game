/**
 * Curated government-type strings keyed by ISO 3166-1 alpha-2 code.
 *
 * REST Countries doesn't ship a "government" field, so we maintain a
 * small static lookup for the panel summary. Values are intentionally
 * short and use common phrasings — "Federal presidential republic",
 * "Parliamentary constitutional monarchy", "One-party socialist state",
 * etc. — drawn from the CIA World Factbook / Wikipedia consensus.
 *
 * Coverage is the ~50 most-recognised countries. Anywhere we don't have
 * an entry, the panel simply omits the "Government" row.
 */
export const GOVERNMENT_TYPES: Readonly<Record<string, string>> = {
  // North + South America ---------------------------------------------------
  US: "Federal presidential republic",
  CA: "Parliamentary constitutional monarchy",
  MX: "Federal presidential republic",
  BR: "Federal presidential republic",
  AR: "Federal presidential republic",
  CL: "Presidential republic",
  CO: "Presidential republic",
  PE: "Presidential republic",
  VE: "Presidential republic",
  CU: "One-party socialist state",
  // Europe -----------------------------------------------------------------
  GB: "Parliamentary constitutional monarchy",
  FR: "Unitary semi-presidential republic",
  DE: "Federal parliamentary republic",
  IT: "Parliamentary republic",
  ES: "Parliamentary constitutional monarchy",
  PT: "Parliamentary republic",
  NL: "Parliamentary constitutional monarchy",
  BE: "Federal parliamentary constitutional monarchy",
  SE: "Parliamentary constitutional monarchy",
  NO: "Parliamentary constitutional monarchy",
  DK: "Parliamentary constitutional monarchy",
  FI: "Parliamentary republic",
  IE: "Parliamentary republic",
  PL: "Parliamentary republic",
  CH: "Federal directorial republic",
  AT: "Federal parliamentary republic",
  GR: "Parliamentary republic",
  UA: "Semi-presidential republic",
  RU: "Federal semi-presidential republic (authoritarian)",
  VA: "Absolute theocratic elective monarchy",
  // Africa -----------------------------------------------------------------
  ZA: "Parliamentary republic",
  NG: "Federal presidential republic",
  EG: "Presidential republic",
  KE: "Presidential republic",
  ET: "Federal parliamentary republic",
  MA: "Constitutional monarchy",
  // Middle East ------------------------------------------------------------
  TR: "Presidential republic",
  SA: "Absolute monarchy",
  AE: "Federal absolute monarchy",
  IR: "Theocratic republic",
  IL: "Parliamentary republic",
  QA: "Absolute monarchy",
  KW: "Constitutional emirate",
  // South + East Asia ------------------------------------------------------
  IN: "Federal parliamentary republic",
  PK: "Federal parliamentary republic",
  BD: "Parliamentary republic",
  CN: "One-party socialist republic",
  JP: "Parliamentary constitutional monarchy",
  KR: "Presidential republic",
  KP: "One-party state",
  VN: "One-party socialist republic",
  TH: "Constitutional monarchy",
  ID: "Presidential republic",
  PH: "Presidential republic",
  MY: "Federal parliamentary constitutional monarchy",
  SG: "Parliamentary republic",
  // Oceania ----------------------------------------------------------------
  AU: "Federal parliamentary constitutional monarchy",
  NZ: "Parliamentary constitutional monarchy",
};
