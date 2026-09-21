/**
 * Schema for national central-bank logos in Learn mode.
 * Sourced definitions live in `src/data/centralBanks.ts`.
 */

export type CentralBank = {
  /** Stable unique identifier (e.g. "au-rba", "br-bcb", "us-fed") */
  readonly id: string;
  /** ISO 3166-1 alpha-2 country code (e.g. "AU", "BR", "US") */
  readonly countryCode: string;
  /** Official name of the central bank / monetary authority */
  readonly name: string;
  /** Common short name or abbreviation when widely used (e.g. "RBA", "ECB") */
  readonly shortName?: string;
  /** Year the institution was founded (or reconstituted under its current charter) */
  readonly founded?: number;
  /** Headquarters city, when sourced */
  readonly headquarters?: string;
  /** Official website of the bank */
  readonly website?: string;
  /**
   * When this country participates in a currency union whose monetary policy is
   * set by a shared institution (eurozone → ECB, WAEMU → BCEAO, …), name that
   * shared bank here. The card still shows THIS country's own central bank
   * (or the shared bank when the country has no separate national bank).
   */
  readonly currencyUnion?: string;
  /** Bundled logo path relative to public root (e.g. "/central-bank-logos/au/rba.svg").
   *  Absent only when paired with `noImageReason`. */
  readonly logo?: string;
  /** Sourced explanation of the logo design and symbolism. Required when `logo` is set. */
  readonly logoExplainer?: string;
  /** Documented reason no citable logo could be sourced after an exhaustive
   *  multi-language search — used instead of `logo`/`logoExplainer`. */
  readonly noImageReason?: string;
  /** Authoritative citations and source references */
  readonly sources: readonly string[];
  /** Licence note documenting copyright/fair-use or CC licence — required for
   *  any non-Commons logo source. */
  readonly licenceNote?: string;
};
