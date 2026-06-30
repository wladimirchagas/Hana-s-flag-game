import {
  NATIONAL_CITIES,
  SUBNATIONAL_CITIES,
  type City,
} from "../data/cities";

/**
 * Role flags for a city marker. A single city can hold several at once — e.g.
 * London is the national capital AND national largest city of the UK, AND the
 * capital AND largest city of England — so roles are a bitmask and coincident
 * cities are merged into one marker carrying every role they hold.
 */
export const CityRole = {
  NationalCapital: 1,
  NationalLargest: 2,
  SubnationalCapital: 4,
  SubnationalLargest: 8,
} as const;

export type PlacedCity = {
  /** Stable key (name + rounded coordinates). */
  id: string;
  name: string;
  lon: number;
  lat: number;
  /** Bitmask of CityRole values this city holds in the current view. */
  roles: number;
  /** Sourced capital role note (e.g. "Executive capital"), if any. */
  note?: string;
  population?: number;
};

const key = (c: City) => `${c.name}|${c.lon.toFixed(3)},${c.lat.toFixed(3)}`;

/** Merge a city into the accumulator, OR-ing roles and keeping richest data. */
function add(acc: Map<string, PlacedCity>, c: City, role: number) {
  const k = key(c);
  const existing = acc.get(k);
  if (existing) {
    existing.roles |= role;
    if (!existing.note && c.note) existing.note = c.note;
    if (c.population != null && (existing.population == null || c.population > existing.population))
      existing.population = c.population;
    return;
  }
  acc.set(k, {
    id: k,
    name: c.name,
    lon: c.lon,
    lat: c.lat,
    roles: role,
    note: c.note,
    population: c.population,
  });
}

/**
 * Markers for the world map: each country's national capital(s) + largest city.
 * `codes` defaults to every country with city data.
 */
export function worldCityMarkers(codes?: Iterable<string>): PlacedCity[] {
  const acc = new Map<string, PlacedCity>();
  const list = codes ? [...codes] : Object.keys(NATIONAL_CITIES);
  for (const code of list) {
    const nat = NATIONAL_CITIES[code];
    if (!nat) continue;
    for (const cap of nat.capitals ?? []) add(acc, cap, CityRole.NationalCapital);
    if (nat.largest) add(acc, nat.largest, CityRole.NationalLargest);
  }
  return [...acc.values()];
}

/**
 * Markers for a country's subdivision map: the national capital(s) + national
 * largest city, PLUS each listed subdivision's capital + largest city.
 * Coincident cities (e.g. London for both the UK and England) merge into one
 * marker carrying all of their roles.
 */
export function subdivisionCityMarkers(
  countryCode: string,
  subdivisionCodes: Iterable<string>,
): PlacedCity[] {
  const acc = new Map<string, PlacedCity>();
  const nat = NATIONAL_CITIES[countryCode];
  if (nat) {
    for (const cap of nat.capitals ?? []) add(acc, cap, CityRole.NationalCapital);
    if (nat.largest) add(acc, nat.largest, CityRole.NationalLargest);
  }
  for (const code of subdivisionCodes) {
    const sub = SUBNATIONAL_CITIES[code];
    if (!sub) continue;
    if (sub.capital) add(acc, sub.capital, CityRole.SubnationalCapital);
    if (sub.largest) add(acc, sub.largest, CityRole.SubnationalLargest);
  }
  return [...acc.values()];
}

// --- Role helpers used by the marker renderer + legend ----------------------

export const isCapital = (r: number) =>
  (r & (CityRole.NationalCapital | CityRole.SubnationalCapital)) !== 0;
export const isLargest = (r: number) =>
  (r & (CityRole.NationalLargest | CityRole.SubnationalLargest)) !== 0;
export const isNational = (r: number) =>
  (r & (CityRole.NationalCapital | CityRole.NationalLargest)) !== 0;
export const isSubnational = (r: number) =>
  (r & (CityRole.SubnationalCapital | CityRole.SubnationalLargest)) !== 0;

/** Human-readable description of every role a city holds (for tooltips/aria). */
export function describeRoles(c: PlacedCity, countryName?: string): string {
  const parts: string[] = [];
  if (c.roles & CityRole.NationalCapital)
    parts.push(c.note ? c.note.toLowerCase() : `capital${countryName ? ` of ${countryName}` : ""}`);
  if (c.roles & CityRole.NationalLargest) parts.push("largest city");
  if (c.roles & CityRole.SubnationalCapital) parts.push("subdivision capital");
  if (c.roles & CityRole.SubnationalLargest) parts.push("subdivision largest city");
  // De-duplicate while preserving order.
  return [...new Set(parts)].join(" · ");
}
