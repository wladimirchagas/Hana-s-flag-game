/**
 * Schema for commercial airlines in Learn mode.
 * Sourced definitions live in `src/data/commercialAirlines.ts`.
 */

export type CommercialAirline = {
  /** Stable unique identifier (e.g. "au-qantas", "my-airasia") */
  readonly id: string;
  /** ISO 3166-1 alpha-2 country code (e.g. "AU", "MY") */
  readonly countryCode: string;
  /** Official operating airline name */
  readonly name: string;
  /** 2-letter IATA airline designator (e.g. "QF", "AK") */
  readonly iata: string;
  /** 3-letter ICAO airline designator (e.g. "QFA", "AXM") */
  readonly icao?: string;
  /** Foundation / establishment year */
  readonly founded: number;
  /** Global airline alliance (e.g. "oneworld", "Star Alliance", "SkyTeam", or "None") */
  readonly alliance: "Star Alliance" | "oneworld" | "SkyTeam" | "None" | string;
  /** Primary hub airport(s) or operating base(s) */
  readonly hubs: readonly string[];
  /** Fleet composition: total count and summary of aircraft types */
  readonly fleet: {
    readonly total: number;
    readonly summary: string;
  };
  /** Bundled logo path relative to public root (e.g. "/airline-logos/au/qantas.svg") */
  readonly logo: string;
  /** Sourced explanation of the logo design, emblem symbolism, and livery history */
  readonly logoExplainer: string;
  /** Authoritative citations and source references */
  readonly sources: readonly string[];
  /** Licence note documenting copyright/fair-use or CC licence */
  readonly licenceNote?: string;
};
