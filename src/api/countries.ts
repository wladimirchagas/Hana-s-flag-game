export type Country = {
  name: string;
  /** Long official name from REST Countries (e.g., "Federative Republic of
   *  Brazil"). Used for the entity-summary panel. */
  nameOfficial?: string;
  code: string;
  flagSvg: string;
  continent: Continent;
  /** Sub-region (e.g., "South America", "Western Asia"). Optional. */
  subregion?: string;
  /** Capital city. Some countries have multiple — we keep the first. */
  capital?: string;
  /** Population (last known REST Countries figure). */
  population?: number;
  /** Official languages, deduplicated. */
  languages?: string[];
  /** Currencies — one per row in the panel summary. */
  currencies?: { code: string; name: string; symbol?: string }[];
};

export type Continent =
  | "Africa"
  | "Americas"
  | "Asia"
  | "Europe"
  | "Oceania";

type RestCountry = {
  name?: { common?: string; official?: string };
  cca2?: string;
  flags?: { svg?: string; png?: string };
  region?: string;
  subregion?: string;
  capital?: string[];
  population?: number;
  languages?: Record<string, string>;
  currencies?: Record<string, { name?: string; symbol?: string }>;
};

const API_URL =
  "https://restcountries.com/v3.1/all?fields=name,flags,cca2,region,subregion,capital,population,languages,currencies";

/**
 * World Bank "Population, total" indicator. The most-current authoritative
 * single source for national populations — updated annually by the Bank
 * from UN Population Division and national census data. We use it to
 * override the REST Countries population (which is often a few years
 * stale) so the panel always reflects current figures.
 */
const WORLDBANK_POP_URL =
  "https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL" +
  "?format=json&date=2024&per_page=400";

type WorldBankRow = {
  country?: { id?: string };
  date?: string;
  value?: number | null;
};

/**
 * Build a (alpha-2 code → most-current population) lookup from the World
 * Bank API. Falls back silently to an empty map if the request fails —
 * the caller then keeps the REST-Countries population data.
 */
async function fetchWorldBankPopulation(): Promise<Map<string, number>> {
  try {
    const res = await fetch(WORLDBANK_POP_URL);
    if (!res.ok) return new Map();
    const json = (await res.json()) as [unknown, WorldBankRow[]];
    if (!Array.isArray(json) || json.length < 2) return new Map();
    const out = new Map<string, number>();
    for (const row of json[1]) {
      const code = row.country?.id?.toUpperCase();
      const val = row.value;
      if (code && typeof val === "number" && val > 0) out.set(code, val);
    }
    return out;
  } catch {
    return new Map();
  }
}

const UN_CONTINENTS: ReadonlySet<Continent> = new Set([
  "Africa",
  "Americas",
  "Asia",
  "Europe",
  "Oceania",
]);

// ISO 3166-1 alpha-2 codes for the 195 United Nations states:
// 193 member states + 2 permanent observer states (Holy See / Vatican City and
// State of Palestine). Used to exclude territories, dependencies, and
// non-UN entities (e.g. Taiwan, Kosovo, Hong Kong) that REST Countries returns.
const UN_MEMBER_CODES: ReadonlySet<string> = new Set([
  "AF", "AL", "DZ", "AD", "AO", "AG", "AR", "AM", "AU", "AT",
  "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BT",
  "BO", "BA", "BW", "BR", "BN", "BG", "BF", "BI", "CV", "KH",
  "CM", "CA", "CF", "TD", "CL", "CN", "CO", "KM", "CG", "CD",
  "CR", "CI", "HR", "CU", "CY", "CZ", "DK", "DJ", "DM", "DO",
  "EC", "EG", "SV", "GQ", "ER", "EE", "SZ", "ET", "FJ", "FI",
  "FR", "GA", "GM", "GE", "DE", "GH", "GR", "GD", "GT", "GN",
  "GW", "GY", "HT", "HN", "HU", "IS", "IN", "ID", "IR", "IQ",
  "IE", "IL", "IT", "JM", "JP", "JO", "KZ", "KE", "KI", "KP",
  "KR", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI",
  "LT", "LU", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MR",
  "MU", "MX", "FM", "MD", "MC", "MN", "ME", "MA", "MZ", "MM",
  "NA", "NR", "NP", "NL", "NZ", "NI", "NE", "NG", "MK", "NO",
  "OM", "PK", "PW", "PA", "PG", "PY", "PE", "PH", "PL", "PT",
  "QA", "RO", "RU", "RW", "KN", "LC", "VC", "WS", "SM", "ST",
  "SA", "SN", "RS", "SC", "SL", "SG", "SK", "SI", "SB", "SO",
  "ZA", "SS", "ES", "LK", "SD", "SR", "SE", "CH", "SY", "TJ",
  "TZ", "TH", "TL", "TG", "TO", "TT", "TN", "TR", "TM", "TV",
  "UG", "UA", "AE", "GB", "US", "UY", "UZ", "VU", "VE", "VN",
  "YE", "ZM", "ZW",
  // Permanent UN observer states
  "VA", "PS",
]);

export async function fetchCountries(): Promise<Country[]> {
  // Run the two fetches in parallel — REST Countries gives us names,
  // flags, capital, languages; the World Bank gives us the most-current
  // population figures (REST Countries' numbers are often years stale).
  const [res, wbPop] = await Promise.all([
    fetch(API_URL),
    fetchWorldBankPopulation(),
  ]);
  if (!res.ok) {
    throw new Error(`Failed to load countries (${res.status})`);
  }
  const data = (await res.json()) as RestCountry[];

  const countries: Country[] = [];
  for (const item of data) {
    const name = item.name?.common?.trim();
    const code = item.cca2?.trim().toUpperCase();
    const flagSvg = item.flags?.svg?.trim();
    const flagPng = item.flags?.png?.trim();
    const region = item.region?.trim() as Continent | undefined;
    const flagUrl = flagSvg || flagPng;
    if (!name || !code || !flagUrl || !region) continue;
    if (!UN_CONTINENTS.has(region)) continue;
    if (!UN_MEMBER_CODES.has(code)) continue;
    const subregion = item.subregion?.trim() || undefined;
    const capital = item.capital?.[0]?.trim() || undefined;
    // Prefer the World Bank figure (refreshed annually); fall back to
    // REST Countries (which can be a few years stale) when the WB doesn't
    // publish a number for this country (e.g., Vatican City).
    const wbValue = wbPop.get(code);
    const population =
      typeof wbValue === "number" && wbValue > 0
        ? wbValue
        : typeof item.population === "number" && item.population > 0
          ? item.population
          : undefined;
    const languages = item.languages
      ? Array.from(new Set(Object.values(item.languages).map((l) => l.trim()).filter(Boolean)))
      : undefined;
    const nameOfficial = item.name?.official?.trim() || undefined;
    const currencies = item.currencies
      ? Object.entries(item.currencies)
          .map(([currCode, info]) => ({
            code: currCode,
            name: (info?.name ?? "").trim() || currCode,
            symbol: info?.symbol?.trim() || undefined,
          }))
          .filter((c) => c.name)
      : undefined;
    countries.push({
      name,
      nameOfficial,
      code,
      flagSvg: flagUrl,
      continent: region,
      subregion,
      capital,
      population,
      languages,
      currencies: currencies && currencies.length > 0 ? currencies : undefined,
    });
  }

  countries.sort((a, b) => a.name.localeCompare(b.name, "en"));
  return countries;
}

/**
 * Compose a one-line summary for a country suitable for the Learn-mode
 * detail panel: capital · subregion · approximate population · official
 * languages. Pieces are omitted gracefully when the underlying field is
 * missing, so the helper is safe to call on any Country instance.
 */
export function summarizeCountry(c: Country): string {
  const parts: string[] = [];
  if (c.capital) parts.push(`Capital: ${c.capital}`);
  if (c.subregion) parts.push(c.subregion);
  if (typeof c.population === "number") {
    if (c.population >= 1_000_000) {
      parts.push(`pop. ~${(c.population / 1_000_000).toFixed(c.population >= 10_000_000 ? 0 : 1)} M`);
    } else if (c.population >= 1_000) {
      parts.push(`pop. ~${(c.population / 1_000).toFixed(0)} k`);
    } else {
      parts.push(`pop. ${c.population}`);
    }
  }
  if (c.languages && c.languages.length > 0) {
    parts.push(c.languages.slice(0, 2).join(", "));
  }
  return parts.join(" · ");
}
