// City-territories: subdivisions that ARE a single city (coterminous with one
// municipality), so calling the city "the capital of" the subdivision is
// tautological — "Putrajaya is the capital city of Putrajaya."
//
// In the Sub-national flags game these are treated as ONE entity: they appear
// only in the sub-national (division) set — shown by their own name, with the
// city's own flag — and are NEVER emitted as a separate "capital city" question
// or given a "capital of X" reveal. (Owner decision, 2026-07.)
//
// This is DISTINCT from a region that is merely named after its capital — a
// Swiss canton (Zürich), an Italian province (Como), a department (Cochabamba).
// Those are genuinely larger than their same-named capital city, so the city
// really is the region's capital; they stay as two separate entities and, when
// they share a coat-of-arms flag, both answers are accepted. Only entities whose
// official status is a single city belong here.
//
// Every entry is a subdivision whose ISO 3166-2 status is a city / city-state /
// autonomous city / federal city-territory / city-municipality (sourced below).
// Never add a province/department/canton/district here just because its name
// matches its capital — research the status first (subdivision-research rule).

/** Subdivision codes that are a single city (see file header). */
export const CITY_TERRITORY_CODES: ReadonlySet<string> = new Set([
  "MY-14", // Kuala Lumpur — Malaysian Federal Territory coterminous with the city
  "MY-16", // Putrajaya — Malaysian Federal Territory, a planned city (federal admin capital)
  "ES-CE", // Ceuta — Spanish Autonomous City
  "US-DC", // Washington — Federal District coterminous with the city of Washington
  "BY-MI", // Minsk — city with special administrative status (Horad Minsk), not Minsk Region
  "RS-00", // Belgrade — City of Belgrade (grad), the capital-city administrative unit
  "MD-CU", // Chișinău — Moldovan municipality (city)
  "MD-BA", // Bălți — Moldovan municipality (city)
  "MD-BD", // Bender — Moldovan municipality (city)
  "ZW-BU", // Bulawayo — Zimbabwean city (metropolitan province)
  "MU-PL", // Port Louis — Mauritian city/district coterminous with the capital city
  "KR-11", // Seoul — South Korean Special City (single city)
  "KR-26", // Busan — South Korean Metropolitan City (single city)
]);
