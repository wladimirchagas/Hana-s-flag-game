/**
 * Bicameral (and other multi-body) legislatures for the Political parties grid.
 *
 * A single `inPower` boolean cannot say who holds legislative power when two
 * chambers can disagree. This catalog is the source of truth for that case:
 * "Leg power" badges are per-chamber majorities, never the governing-coalition
 * flag. Countries not listed keep the unicameral fallback (`inPower` → Leg
 * power / In-power).
 *
 * Coverage grows as the audit reaches each country — never invent a majority
 * or a seat count. A hung chamber simply has no majority badge.
 */

export interface LegislatureSource {
  readonly title: string;
  readonly url: string;
}

export interface LegislatureBody {
  readonly name: string;
  /** Short grid-badge label ("House", "Senate"). */
  readonly shortName: string;
  readonly seatsTotal: number;
}

export interface CountryLegislature {
  /** The house `PoliticalParty.chamberName` / `seats` already describe —
   *  the confidence house in a parliamentary system; the lower house in a
   *  presidential one. A majority here does not earn a second badge in
   *  Westminster systems (that is the fused "In-power" badge). */
  readonly confidenceHouse: string;
  readonly bodies: readonly LegislatureBody[];
  readonly source: LegislatureSource;
  /** Sourced one-liner when the two houses can (or currently do) disagree. */
  readonly note: string;
}

export const PARTY_LEGISLATURES: Readonly<Record<string, CountryLegislature>> = {
  US: {
    confidenceHouse: "House of Representatives",
    bodies: [
      { name: "House of Representatives", shortName: "House", seatsTotal: 435 },
      { name: "Senate", shortName: "Senate", seatsTotal: 100 },
    ],
    source: {
      title: "United States House of Representatives / United States Senate — Wikipedia: 119th Congress composition",
      url: "https://en.wikipedia.org/wiki/United_States_Senate",
    },
    note: "Bicameral Congress. House and Senate majorities are independent of each other and of the White House.",
  },
  AU: {
    confidenceHouse: "House of Representatives",
    bodies: [
      { name: "House of Representatives", shortName: "House", seatsTotal: 150 },
      { name: "Senate", shortName: "Senate", seatsTotal: 76 },
    ],
    source: {
      title: "Template:Composition of Australian Senate — as of 14 May 2026; House standings 2025–2028",
      url: "https://en.wikipedia.org/wiki/Template:Composition_of_Australian_Senate",
    },
    note: "Bicameral. Government is the party that holds the House of Representatives; the Senate is a separate majority (none as of 14 May 2026 — Labor 30 of 76).",
  },
  BR: {
    confidenceHouse: "Chamber of Deputies",
    bodies: [
      { name: "Chamber of Deputies", shortName: "Deputies", seatsTotal: 513 },
      { name: "Federal Senate", shortName: "Senate", seatsTotal: 81 },
    ],
    source: {
      title: "Chamber of Deputies (Brazil) — Wikipedia (Government 207, Opposition 151, Independent 158 of 513); Federal Senate (Brazil) — Wikipedia (81 seats; Senate President Davi Alcolumbre, UNIÃO)",
      url: "https://en.wikipedia.org/wiki/Federal_Senate_(Brazil)",
    },
    note: "Bicameral National Congress. No single party holds a majority in the Chamber of Deputies (513) or the Federal Senate (81).",
  },
};
