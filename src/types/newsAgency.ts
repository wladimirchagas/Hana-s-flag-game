/**
 * Schema for national news agencies in Learn mode.
 * Sourced definitions live in `src/data/nationalNewsAgencies.ts`.
 */

export type NewsAgency = {
  /** Stable unique identifier (e.g. "au-aap", "my-bernama") */
  readonly id: string;
  /** ISO 3166-1 alpha-2 country code (e.g. "AU", "MY") */
  readonly countryCode: string;
  /** Common name of the news agency shown as the title */
  readonly name: string;
  /** Full formal or corporate legal name */
  readonly officialName?: string;
  /** Native-language name when different from English or common name */
  readonly nativeName?: string;
  /** English translation of the native or official name */
  readonly englishTranslation?: string;
  /** Institutional motto or editorial slogan */
  readonly motto?: {
    readonly original: string;
    readonly translation?: string;
  };
  /** Year the news agency was founded */
  readonly founded: number;
  /** Frequency / distribution cycle (e.g. "Continuous 24/7 national newswire") */
  readonly frequency: string;
  /** Output formats and services (e.g. digital newswire, photography, syndicated feeds) */
  readonly format: string;
  /** Primary reporting and wire distribution languages */
  readonly language: string;
  /** City and state/province/territory of main headquarters */
  readonly headquarters: string;
  /** Ownership entity and organizational governance type */
  readonly owner: {
    readonly name: string;
    readonly type: string;
  };
  /** Editorial stance and remit */
  readonly editorialStance: string;
  /** Comparable audience and reach metrics */
  readonly readership: {
    readonly metric: string;
    readonly source: string;
  };
  /** Comparable public funding figures (total and per capita) */
  readonly annualPublicFunding?: {
    readonly total: string;
    readonly perCapita: string;
  };
  /** Revenue model and funding streams */
  readonly revenueModel: string;
  /** Bundled logo path relative to public root (e.g. "newspaper-logos/au/aap.svg").
   *  Absent only when paired with `noImageReason`. */
  readonly logo?: string;
  /** Sourced explanation of the logo design, symbolism, and history.
   *  Required when `logo` is set. */
  readonly logoExplainer?: string;
  /** Documented reason no freely-citable authentic logo could be sourced —
   *  used instead of `logo`/`logoExplainer`. */
  readonly noImageReason?: string;
  /** Authoritative institutional sources and citations */
  readonly sources: readonly string[];
  /** Educational reference / trademark licence note */
  readonly licenceNote?: string;
};

export type NationalNewsAgency = NewsAgency;
