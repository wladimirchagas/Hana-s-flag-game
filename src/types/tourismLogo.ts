/**
 * Schema for national tourism-board logos in Learn mode.
 * Sourced definitions live in `src/data/tourismLogos.ts`.
 */

export type TourismLogo = {
  /** Stable unique identifier (e.g. "au-tourism-australia", "my-tourism-malaysia") */
  readonly id: string;
  /** ISO 3166-1 alpha-2 country code (e.g. "AU", "MY") */
  readonly countryCode: string;
  /** Name of the tourism board / brand shown as the card title */
  readonly name: string;
  /** Campaign tagline/slogan, when the board has a well-known one (e.g. "Malaysia, Truly Asia") */
  readonly slogan?: string;
  /** Full official name of the body responsible for this brand */
  readonly agency: string;
  /** Year this logo/brand was first adopted (or most recently readopted, if reused) */
  readonly launched?: number;
  /** A comparable annual-visitors figure, when one can be sourced for this exact
   *  country/entity. `metric` states precisely what was counted so two entries are
   *  never implied to be more comparable than they really are (e.g. Malaysia's
   *  "International tourist arrivals" is not the same measurement as the Vatican
   *  Museums' own visitor count). */
  readonly visitors?: {
    readonly count: number;
    readonly year: number;
    readonly metric: string;
  };
  /** Free-text note explaining why no comparable visitors figure is given (used
   *  instead of `visitors` when no authoritative figure could be sourced). */
  readonly visitorsNote?: string;
  /** Bundled logo path relative to public root (e.g. "/tourism-logos/au/tourism-australia.svg").
   *  Absent only when paired with `noImageReason`. */
  readonly logo?: string;
  /** Sourced explanation of the logo design and symbolism. Required when `logo` is set. */
  readonly logoExplainer?: string;
  /** Documented reason no freely-licensed or citable logo could be sourced, after an
   *  exhaustive multi-language search — used instead of `logo`/`logoExplainer`. A
   *  genuinely unsourceable logo is listed anyway, never silently dropped. */
  readonly noImageReason?: string;
  /** Authoritative citations and source references */
  readonly sources: readonly string[];
  /** Licence note documenting copyright/fair-use or CC licence, required for any
   *  non-Commons `url` source per this repo's sourcing discipline. */
  readonly licenceNote?: string;
};
