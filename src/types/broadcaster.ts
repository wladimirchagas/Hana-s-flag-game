/**
 * Schema for public service broadcasters in Learn mode.
 * Sourced definitions live in `src/data/publicBroadcasters.ts`.
 */

export type PublicBroadcaster = {
  /** Stable unique identifier (e.g. "au-abc", "gb-bbc") */
  readonly id: string;
  /** ISO 3166-1 alpha-2 country code (e.g. "AU", "GB") */
  readonly countryCode: string;
  /** Broadcaster operating / brand name (e.g. "ABC", "BBC", "PBS") */
  readonly name: string;
  /** Full statutory or official legal name */
  readonly officialName?: string;
  /** Foundation / establishing year */
  readonly founded: number;
  /** Primary funding model (e.g. universal household licence fee, state budget allocation, commercial mix) */
  readonly primaryFunding: string;
  /** Headquarters location (city, state/province) */
  readonly headquarters: string;
  /** Annual public funding figures */
  readonly annualPublicFunding: {
    /** Total annual public funding / appropriation / licence fee revenue */
    readonly total: string;
    /** Public funding per capita per year */
    readonly perCapita: string;
  };
  /** Average daily or consolidated market share across television, radio, or digital */
  readonly dailyMarketShare: string;
  /** Public news brand trust score from authoritative surveys (e.g. Reuters Institute Digital News Report) */
  readonly brandTrustScore: {
    /** Score or percentage */
    readonly score: string;
    /** Citation / benchmark index */
    readonly source: string;
  };
  /** Local content programming quota or statutory charter commitment */
  readonly localContentQuota: string;
  /** Total full-time staff headcount (FTE) */
  readonly staffHeadcount: string;
  /** Bundled logo path relative to public root (e.g. "/broadcaster-logos/au/abc.svg") */
  readonly logo: string;
  /** Sourced explanation of the logo design, symbolism, and identity history */
  readonly logoExplainer: string;
  /** Authoritative citations and source references */
  readonly sources: readonly string[];
  /** Licence note documenting trademark/logo usage for educational reference */
  readonly licenceNote?: string;
};
