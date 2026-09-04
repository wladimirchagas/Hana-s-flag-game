/**
 * Sourced political-party data for the Learn-mode "Political parties" grid view
 * and its detail widget.
 *
 * HARD RULE — same discipline as every other sourced dataset in this repo (see
 * CLAUDE.md "Never invent or approximate" rules): every fact here — the party's
 * name, ideology, founding year, leader, coalition membership, seat count — MUST
 * come from an authoritative, cited source (`sources`). Nothing is guessed or
 * paraphrased-to-fill. A field with no sourceable value is OMITTED, never
 * invented — a party with no listed leader is honest; a guessed one is not.
 *
 * SCOPE — per owner direction (2026-09): only parties currently holding at least
 * one seat in the country's national lower/unicameral legislative chamber are
 * included. A country with no competitive multi-party system (an absolute
 * monarchy, a one-party state) is either omitted entirely or — where a single
 * ruling party genuinely exists — represented by that one party; this dataset
 * currently only covers competitive multi-party systems.
 *
 * COVERAGE is an incrementally-growing curated set, exactly like
 * `flagMeanings.ts` — hand-authored, sourced country by country, never
 * generated. Do not pad an omission; do not fabricate to complete a country.
 *
 * Logo images are bundled locally under `public/party-logos/{cc}/` (never a
 * runtime URL — same "all flag/symbol files must be bundled" discipline as
 * every other image in this game). A party logo that cannot be freely licensed
 * on Wikimedia Commons is still bundled non-free (fair-use) with a `licenceNote`
 * documenting the copyright position — the same pattern already used for
 * football-association crests and passport covers.
 *
 * `scripts/check-political-parties.mjs` (run by `npm run flags:check`)
 * validates structure (sourcing, bundled/checksummed logos, seat-count sanity,
 * coalition-reference integrity) — it is a safety net, not a substitute for
 * verifying each claim against its cited source by hand.
 */

import type { FlagMeaning } from "./flagMeanings";

export type PartyIdeologyPosition =
  | "far-left"
  | "left"
  | "centre-left"
  | "centre"
  | "centre-right"
  | "right"
  | "far-right"
  | "other";

/** Ordered progressive → conservative; "other" (unplaceable) sorts last. */
export const IDEOLOGY_POSITION_ORDER: readonly PartyIdeologyPosition[] = [
  "far-left",
  "left",
  "centre-left",
  "centre",
  "centre-right",
  "right",
  "far-right",
  "other",
];

export const IDEOLOGY_POSITION_LABELS: Record<PartyIdeologyPosition, string> = {
  "far-left": "Far-left",
  left: "Left-wing",
  "centre-left": "Centre-left",
  centre: "Centre",
  "centre-right": "Centre-right",
  right: "Right-wing",
  "far-right": "Far-right",
  other: "Other / unclassified",
};

export interface PoliticalPartySource {
  title: string;
  url: string;
}

export interface PoliticalPartyPriorName {
  name: string;
  nameEn?: string;
  years?: string;
}

export interface PoliticalCoalition {
  /** Stable id, e.g. "MY-PH". */
  readonly id: string;
  /** The coalition/alliance's own name, in its original language. */
  readonly name: string;
  /** English translation — omit when the name is already English. */
  readonly nameEn?: string;
  /** What kind of national-level grouping this is — most are a pre-election /
   *  governing "coalition" or "alliance"; Brazil's post-2020 mechanism is a
   *  legally distinct "party federation" and is labelled as such. */
  readonly kind?: "coalition" | "federation";
  /** Ids of every PoliticalParty entry that belongs to this coalition. */
  readonly memberPartyIds: readonly string[];
  readonly source: PoliticalPartySource;
  /** An optional sourced caveat about the coalition's current status (e.g.
   *  Brazil's PSDB–Cidadania federation, whose dissolution vote has not yet
   *  been formally filed with the electoral court). */
  readonly note?: string;
}

export interface PoliticalParty {
  /** Stable id: "{countryCode}-{SHORTCODE}", e.g. "MY-DAP". */
  readonly id: string;
  /** ISO 3166-1 alpha-2 country code. */
  readonly country: string;
  /** Abbreviation shown on the grid card, e.g. "DAP". */
  readonly shortName: string;
  /** Official name in the party's own language. */
  readonly name: string;
  /** English translation of the official name — omit when already English. */
  readonly nameEn?: string;
  /** Path relative to BASE_URL, e.g. "party-logos/my/dap.svg". Absent when no
   *  freely- or non-free-licensed image could be sourced (see `noImageReason`). */
  readonly logo?: string;
  /** sha256 of the bundled logo file — required whenever `logo` is present. */
  readonly sha256?: string;
  /** Where the logo file came from (Commons or Wikipedia file page). */
  readonly logoSourceUrl?: string;
  /** Required whenever the logo is not sourced from commons.wikimedia.org: a
   *  sourced statement of the copyright position (same discipline as the
   *  football-crest / passport-cover non-free bundling rule). */
  readonly licenceNote?: string;
  /** Why no logo is shown — present exactly when `logo` is absent. */
  readonly noImageReason?: string;
  /** Ideology tags, exactly as the party's own cited source lists them. */
  readonly ideology: readonly string[];
  /** The primary bucket used to order/group the grid, progressive → conservative. */
  readonly ideologyPosition: PartyIdeologyPosition;
  /** The source's own raw "political position" text (may span a range). */
  readonly positionRaw?: string;
  /** Year founded. */
  readonly founded: number;
  /** Prior names of this SAME continuous party (not a merger predecessor). */
  readonly previousNames?: readonly PoliticalPartyPriorName[];
  /** Id into POLITICAL_COALITIONS — the one national coalition/federation this
   *  party currently belongs to, if any. */
  readonly coalitionId?: string;
  readonly leader?: string;
  readonly leaderTitle?: string;
  /** Currently part of the national governing coalition/cabinet. */
  readonly inPower: boolean;
  /** When the party's current continuous stint in government began (or a brief
   *  sourced summary for a longer/complex history). Absent when not in power. */
  readonly timeInPower?: string;
  readonly seats: number;
  readonly seatsTotal: number;
  readonly chamberName: string;
  /** Sourced, documented explanation of what the logo's design means — the
   *  SAME {description, myths?, sources} shape (and the same `FlagMeaning`
   *  component) every other flag/symbol meaning in this game uses. Present
   *  only when a real source documents it. */
  readonly logoMeaning?: FlagMeaning;
  readonly sources: readonly PoliticalPartySource[];
}

export const POLITICAL_COALITIONS: Record<string, PoliticalCoalition> = {
  "AU-COALITION": {
    "id": "AU-COALITION",
    "name": "The Coalition",
    "kind": "coalition",
    "memberPartyIds": [
      "AU-LIB",
      "AU-NAT",
      "AU-LNP"
    ],
    "source": {
      "title": "Liberal–National Coalition – Wikipedia (infobox: Federal member parties Liberal, National; Merged: Qld (LNP), NT (CLP))",
      "url": "https://en.wikipedia.org/wiki/Liberal%E2%80%93National_Coalition"
    }
  },
  "BR-FEBRASIL": {
    "id": "BR-FEBRASIL",
    "name": "Federação Brasil da Esperança",
    "nameEn": "Brazil of Hope Federation",
    "kind": "federation",
    "memberPartyIds": [
      "BR-PT",
      "BR-PCDOB",
      "BR-PV"
    ],
    "source": {
      "title": "Federação Brasil da Esperança (FE BRASIL) — Tribunal Superior Eleitoral",
      "url": "https://www.tse.jus.br/partidos/federacoes-registradas-no-tse/brasil-da-esperanca-fe-brasil"
    }
  },
  "BR-PSOLREDE": {
    "id": "BR-PSOLREDE",
    "name": "Federação PSOL REDE",
    "nameEn": "PSOL–REDE Federation",
    "kind": "federation",
    "memberPartyIds": [
      "BR-PSOL",
      "BR-REDE"
    ],
    "source": {
      "title": "Federação PSOL REDE — Tribunal Superior Eleitoral",
      "url": "https://www.tse.jus.br/partidos/federacoes-registradas-no-tse/federacao-psol-rede"
    }
  },
  "BR-PSDBCIDADANIA": {
    "id": "BR-PSDBCIDADANIA",
    "name": "Federação PSDB Cidadania",
    "nameEn": "PSDB–Cidadania Federation",
    "kind": "federation",
    "memberPartyIds": [
      "BR-PSDB",
      "BR-CIDADANIA"
    ],
    "source": {
      "title": "Federação PSDB Cidadania — Tribunal Superior Eleitoral",
      "url": "https://www.tse.jus.br/partidos/federacoes-registradas-no-tse/psdb-cidadania"
    },
    "note": "Registered with the TSE 26 May 2022 (federations run for a minimum 4-year term). Cidadania's national directory voted 16 March 2025 to dissolve the federation, but formally filing the dissolution with the TSE was deferred to avoid penalties under the party-federation law for dissolving before the minimum term; as of this data (Sept 2026) the Câmara dos Deputados still lists the two parties as one active federated bloc of 20 seats."
  },
  "MY-PH": {
    "id": "MY-PH",
    "name": "Pakatan Harapan",
    "nameEn": "Alliance of Hope",
    "kind": "coalition",
    "memberPartyIds": [
      "MY-DAP",
      "MY-PKR",
      "MY-AMANAH"
    ],
    "source": {
      "title": "Pakatan Harapan",
      "url": "https://en.wikipedia.org/wiki/Pakatan_Harapan"
    }
  },
  "MY-BN": {
    "id": "MY-BN",
    "name": "Barisan Nasional",
    "nameEn": "National Front",
    "kind": "coalition",
    "memberPartyIds": [
      "MY-UMNO",
      "MY-MCA",
      "MY-MIC",
      "MY-PBRS"
    ],
    "source": {
      "title": "Barisan Nasional",
      "url": "https://en.wikipedia.org/wiki/Barisan_Nasional"
    }
  },
  "MY-PN": {
    "id": "MY-PN",
    "name": "Perikatan Nasional",
    "nameEn": "National Alliance",
    "kind": "coalition",
    "memberPartyIds": [
      "MY-PAS",
      "MY-WAWASAN"
    ],
    "source": {
      "title": "Perikatan Nasional",
      "url": "https://en.wikipedia.org/wiki/Perikatan_Nasional"
    }
  },
  "MY-GPS": {
    "id": "MY-GPS",
    "name": "Gabungan Parti Sarawak",
    "nameEn": "Sarawak Parties Alliance",
    "kind": "coalition",
    "memberPartyIds": [
      "MY-PBB",
      "MY-PRS",
      "MY-PDP",
      "MY-SUPP"
    ],
    "source": {
      "title": "Gabungan Parti Sarawak",
      "url": "https://en.wikipedia.org/wiki/Gabungan_Parti_Sarawak"
    }
  },
  "MY-GRS": {
    "id": "MY-GRS",
    "name": "Gabungan Rakyat Sabah",
    "nameEn": "Sabah People's Coalition",
    "kind": "coalition",
    "memberPartyIds": [
      "MY-GRS",
      "MY-UPKO",
      "MY-PBS"
    ],
    "source": {
      "title": "Gabungan Rakyat Sabah",
      "url": "https://en.wikipedia.org/wiki/Gabungan_Rakyat_Sabah"
    }
  }
};

export const POLITICAL_PARTIES: Record<string, readonly PoliticalParty[]> = {
"AU": [
    {
      "id": "AU-ALP",
      "country": "AU",
      "shortName": "ALP",
      "name": "Australian Labor Party",
      "logo": "party-logos/au/alp.svg",
      "sha256": "00568c9c740fa06937ab3a327bf277aff7443c2c884a7e8d36326d3275721d3c",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:ALP_logo_2017.svg",
      "licenceNote": "Hosted locally on English Wikipedia (not Commons) under a public-domain / PD-textlogo determination as a simple design; used here to identify the Australian Labor Party, not to imply endorsement.",
      "ideology": [
        "Social democracy"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1891,
      "leader": "Anthony Albanese",
      "leaderTitle": "Leader",
      "inPower": true,
      "timeInPower": "2022–present",
      "seats": 94,
      "seatsTotal": 150,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Australian Labor Party – Wikipedia (infobox: founded, ideology, position, leader)",
          "url": "https://en.wikipedia.org/wiki/Australian_Labor_Party"
        },
        {
          "title": "Members of the Australian House of Representatives, 2025–2028 – Current party standings (94 seats)",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Australian_House_of_Representatives,_2025%E2%80%932028"
        }
      ]
    },
    {
      "id": "AU-LIB",
      "country": "AU",
      "shortName": "Liberal",
      "name": "Liberal Party of Australia",
      "logo": "party-logos/au/lib.svg",
      "sha256": "bc5449a403b07d251e4f5c83739c55da38e864ca16d460914ed6c385c937f802",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Liberal_Party_of_Australia_logo.svg",
      "licenceNote": "Hosted locally on English Wikipedia (not Commons) under a public-domain / PD-textlogo determination as a simple design; used here to identify the Liberal Party of Australia, not to imply endorsement.",
      "ideology": [
        "Liberal conservatism",
        "Conservatism (Australian)",
        "Liberalism (Australian)",
        "Right-wing populism (faction)",
        "Nationalism (Australian) (faction)"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1944,
      "coalitionId": "AU-COALITION",
      "leader": "Angus Taylor",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 17,
      "seatsTotal": 150,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Liberal Party of Australia – Wikipedia (infobox: founded 1944, predecessor United Australia Party, ideology, position, leader)",
          "url": "https://en.wikipedia.org/wiki/Liberal_Party_of_Australia"
        },
        {
          "title": "Members of the Australian House of Representatives, 2025–2028 – Current party standings (Liberal 17 seats, distinct from the 16 LNP seats)",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Australian_House_of_Representatives,_2025%E2%80%932028"
        }
      ]
    },
    {
      "id": "AU-NAT",
      "country": "AU",
      "shortName": "Nationals",
      "name": "National Party of Australia",
      "logo": "party-logos/au/nat.svg",
      "sha256": "7d8e3cc345a862dd2cc38db2f817e7e3acce74809f5a5fbae40811cc4b81c8aa",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:The_National_Party_of_Australia_Logo.svg",
      "ideology": [
        "Agrarianism",
        "Conservatism (Australian)"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 1920,
      "previousNames": [
        {
          "name": "Australian Country Party",
          "years": "1920–1975"
        },
        {
          "name": "National Country Party",
          "years": "1975–1982"
        }
      ],
      "coalitionId": "AU-COALITION",
      "leader": "Matt Canavan",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 8,
      "seatsTotal": 150,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "National Party of Australia – Wikipedia (infobox: founded 22 Jan 1920 as Australian Country Party, renamed National Country Party 1975, National Party of Australia 1982; ideology, position, leader)",
          "url": "https://en.wikipedia.org/wiki/National_Party_of_Australia"
        },
        {
          "title": "Members of the Australian House of Representatives, 2025–2028 – Current party standings (National 8 seats, distinct from the 16 LNP seats)",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Australian_House_of_Representatives,_2025%E2%80%932028"
        }
      ]
    },
    {
      "id": "AU-LNP",
      "country": "AU",
      "shortName": "LNP",
      "name": "Liberal National Party of Queensland",
      "logo": "party-logos/au/lnp.svg",
      "sha256": "1ce1c62aa21a8cae0bcd807d2aa86112210f99c5054b5b8170cc9318888bcf54",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:LNP_Regular.svg",
      "ideology": [
        "Conservatism (Australian)",
        "Agrarianism",
        "Christian right (faction)"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right to right-wing",
      "founded": 2008,
      "coalitionId": "AU-COALITION",
      "leader": "David Crisafulli",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 16,
      "seatsTotal": 150,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Liberal National Party of Queensland – Wikipedia (infobox: formed 26 July 2008 by merger of the Queensland Liberal and National divisions; ideology, position, leader)",
          "url": "https://en.wikipedia.org/wiki/Liberal_National_Party_of_Queensland"
        },
        {
          "title": "Members of the Australian House of Representatives, 2025–2028 – Current party standings (LNP 16 seats, listed separately from Liberal and National)",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Australian_House_of_Representatives,_2025%E2%80%932028"
        }
      ]
    },
    {
      "id": "AU-GRN",
      "country": "AU",
      "shortName": "Greens",
      "name": "Australian Greens",
      "logo": "party-logos/au/grn.svg",
      "sha256": "aef221d20eea3fa971310e12afb014065d7c8413bd1755b1bbbd02895de74860",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:AustralianGreensLogo_official.svg",
      "ideology": [
        "Green politics",
        "Progressivism",
        "Left-wing populism"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing",
      "founded": 1992,
      "leader": "Larissa Waters",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 150,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Australian Greens – Wikipedia (infobox: founded 1992, ideology, position, leader)",
          "url": "https://en.wikipedia.org/wiki/Australian_Greens"
        },
        {
          "title": "Members of the Australian House of Representatives, 2025–2028 – Current party standings (Greens 1 seat, Ryan, held by Elizabeth Watson-Brown)",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Australian_House_of_Representatives,_2025%E2%80%932028"
        }
      ]
    },
    {
      "id": "AU-KAP",
      "country": "AU",
      "shortName": "KAP",
      "name": "Katter's Australian Party",
      "logo": "party-logos/au/kap.svg",
      "sha256": "65df155860e88e5877c0203a23570e7c60002f34656e03337b399c0320bcd873",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Katter%27s_Australian_Party_logo.svg",
      "licenceNote": "Hosted locally on English Wikipedia (not Commons) under a public-domain / PD-textlogo determination as a simple design; used here to identify Katter's Australian Party, not to imply endorsement.",
      "ideology": [
        "Populism",
        "McEwenism",
        "Agrarian socialism",
        "Social conservatism",
        "Economic nationalism",
        "North Queensland statehood"
      ],
      "ideologyPosition": "right",
      "founded": 2011,
      "leader": "Robbie Katter",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 150,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Katter's Australian Party – Wikipedia (infobox: founded 5 June 2011, ideology, leader; political-position field is deliberately left blank by talk-page consensus)",
          "url": "https://en.wikipedia.org/wiki/Katter%27s_Australian_Party"
        },
        {
          "title": "Members of the Australian House of Representatives, 2025–2028 – Current party standings (KAP 1 seat, Kennedy, held by Bob Katter)",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Australian_House_of_Representatives,_2025%E2%80%932028"
        }
      ]
    },
    {
      "id": "AU-CA",
      "country": "AU",
      "shortName": "Centre Alliance",
      "name": "Centre Alliance",
      "logo": "party-logos/au/ca.svg",
      "sha256": "975a1ce9e21d740d884bff9f802ce4ad84740e4a30ca6d0596df55d14947a09d",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Centre_Alliance_logo.svg",
      "licenceNote": "Non-free logo used under Wikipedia's fair-use policy to identify Centre Alliance; used here to identify the party, not to imply endorsement.",
      "ideology": [
        "Social liberalism",
        "Populism",
        "South Australian regionalism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 2013,
      "previousNames": [
        {
          "name": "Nick Xenophon Team",
          "years": "2013–2018"
        }
      ],
      "inPower": false,
      "seats": 1,
      "seatsTotal": 150,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Centre Alliance – Wikipedia (infobox: founded 1 July 2013 as Nick Xenophon Team, renamed Centre Alliance 2018; ideology, position; no formal leader listed – sole MP Rebekha Sharkie describes herself as \"a party of one\")",
          "url": "https://en.wikipedia.org/wiki/Centre_Alliance"
        },
        {
          "title": "Members of the Australian House of Representatives, 2025–2028 – Current party standings (Centre Alliance 1 seat, Mayo, held by Rebekha Sharkie)",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Australian_House_of_Representatives,_2025%E2%80%932028"
        }
      ]
    },
    {
      "id": "AU-ONP",
      "country": "AU",
      "shortName": "One Nation",
      "name": "Pauline Hanson's One Nation",
      "logo": "party-logos/au/onp.svg",
      "sha256": "3dc2141ce4d0ae308d2e44e5394d5b74821b95b960bfe4a8fd357409dbb2f941",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Pauline_Hanson%27s_One_Nation_logo.svg",
      "licenceNote": "Hosted locally on English Wikipedia (not Commons) under a public-domain / PD-textlogo determination as a simple design; used here to identify Pauline Hanson's One Nation, not to imply endorsement.",
      "ideology": [
        "Hansonism",
        "Australian nationalism",
        "Right-wing populism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing to far-right",
      "founded": 1997,
      "leader": "Pauline Hanson",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 2,
      "seatsTotal": 150,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "One Nation – Wikipedia (infobox: founded 11 April 1997, ideology, position, leader)",
          "url": "https://en.wikipedia.org/wiki/One_Nation_(Australia)"
        },
        {
          "title": "48th Parliament of Australia – House Membership Changes Table (Barnaby Joyce, New England, joined One Nation 8 December 2025; David Farley won Farrer for One Nation at the 2026 by-election)",
          "url": "https://en.wikipedia.org/wiki/48th_Parliament_of_Australia"
        },
        {
          "title": "Members of the Australian House of Representatives, 2025–2028 – Current party standings (One Nation 2 seats)",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Australian_House_of_Representatives,_2025%E2%80%932028"
        }
      ]
    },
    {
      "id": "AU-CSA",
      "country": "AU",
      "shortName": "Community Strong",
      "name": "Community Strong Australia",
      "logo": "party-logos/au/csa.png",
      "sha256": "d28348096ba1265fec9e7940dac874eaa386c3fd08548e9af44a1313e1c50e2f",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Community_Strong_Australia_logo.png",
      "licenceNote": "Non-free logo used under Wikipedia's fair-use policy to identify Community Strong Australia; used here to identify the party, not to imply endorsement.",
      "ideology": [
        "Environmentalism",
        "Liberalism",
        "Social liberalism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 2026,
      "inPower": false,
      "seats": 2,
      "seatsTotal": 150,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Community Strong Australia – Wikipedia (infobox: founded 25 June 2026 by MPs Zali Steggall and Allegra Spender; ideology, position; no formal single leader designated)",
          "url": "https://en.wikipedia.org/wiki/Community_Strong_Australia"
        },
        {
          "title": "48th Parliament of Australia – House Membership Changes Table (Steggall, Warringah, and Spender, Wentworth, founded Community Strong Australia 25 June 2026, having previously sat as independents)",
          "url": "https://en.wikipedia.org/wiki/48th_Parliament_of_Australia"
        },
        {
          "title": "Members of the Australian House of Representatives, 2025–2028 – Current party standings (Community Strong Australia 2 seats)",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Australian_House_of_Representatives,_2025%E2%80%932028"
        }
      ]
    }
  ],
  "BR": [
    {
      "id": "BR-UNIAO",
      "country": "BR",
      "shortName": "UNIÃO",
      "name": "União Brasil",
      "nameEn": "Brazil Union",
      "logo": "party-logos/br/uniao.svg",
      "sha256": "b50493f337436557e257d28c5f5124eb7173cf70dabae8daf02fbad730aed093",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Uni%C3%A3o_Brasil_logo.svg",
      "ideology": [
        "Liberal conservatism",
        "Economic liberalism",
        "Social conservatism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 2021,
      "leader": "Antônio Rueda",
      "leaderTitle": "National President",
      "inPower": false,
      "timeInPower": "Not currently in Lula's cabinet as of Sept 2026; the Ministry of Communications, which media reported União Brasil had nominated, is held by Frederico Siqueira, whose Wikipedia infobox lists him as an independent, not a União Brasil member.",
      "seats": 52,
      "seatsTotal": 513,
      "chamberName": "Câmara dos Deputados",
      "sources": [
        {
          "title": "União Brasil - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Uni%C3%A3o_Brasil"
        },
        {
          "title": "Bancadas Atuais - Portal da Câmara dos Deputados",
          "url": "https://www.camara.leg.br/deputados/liderancas-e-bancadas-partidarias/bancadas-atuais"
        },
        {
          "title": "Frederico Siqueira - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Frederico_Siqueira"
        }
      ]
    },
    {
      "id": "BR-PSD",
      "country": "BR",
      "shortName": "PSD",
      "name": "Partido Social Democrático",
      "nameEn": "Social Democratic Party",
      "logo": "party-logos/br/psd.svg",
      "sha256": "da583d46a5d5a373bb8a3d2831b9f4923df8fd303585ce8179ea1a77a9d7384e",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:PSD_Brazil_logo.svg",
      "ideology": [
        "Economic liberalism",
        "Big tent"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre to centre-right",
      "founded": 2011,
      "leader": "Gilberto Kassab",
      "leaderTitle": "National President",
      "inPower": true,
      "timeInPower": "2023–present (Alexandre Silveira, Mines and Energy, since Jan 2023); the party also holds Agriculture and Fisheries as of the most recent reshuffle.",
      "seats": 48,
      "seatsTotal": 513,
      "chamberName": "Câmara dos Deputados",
      "sources": [
        {
          "title": "Social Democratic Party (Brazil, 2011) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Social_Democratic_Party_(Brazil,_2011)"
        },
        {
          "title": "Bancadas Atuais - Portal da Câmara dos Deputados",
          "url": "https://www.camara.leg.br/deputados/liderancas-e-bancadas-partidarias/bancadas-atuais"
        },
        {
          "title": "Ministérios do Brasil - Wikipédia",
          "url": "https://pt.wikipedia.org/wiki/Minist%C3%A9rios_do_Brasil"
        }
      ]
    },
    {
      "id": "BR-PP",
      "country": "BR",
      "shortName": "PP",
      "name": "Progressistas",
      "nameEn": "Progressives",
      "logo": "party-logos/br/pp.svg",
      "sha256": "0dde6bf9bc3e36bf3678d0fd842b5761349ab6f5e3993f5e918e84457a764a17",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Progressistas_(Brazil)_logo.svg",
      "ideology": [
        "Conservative liberalism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1995,
      "previousNames": [
        {
          "name": "Partido Progressista Brasileiro",
          "nameEn": "Brazilian Progressive Party",
          "years": "1995–2003"
        }
      ],
      "leader": "Ciro Nogueira",
      "leaderTitle": "National President",
      "inPower": true,
      "timeInPower": "Holds the Ministry of Sport (André Fufuca) as of the most recent reshuffle in the second Lula cabinet.",
      "seats": 46,
      "seatsTotal": 513,
      "chamberName": "Câmara dos Deputados",
      "sources": [
        {
          "title": "Progressistas - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Progressistas"
        },
        {
          "title": "Bancadas Atuais - Portal da Câmara dos Deputados",
          "url": "https://www.camara.leg.br/deputados/liderancas-e-bancadas-partidarias/bancadas-atuais"
        },
        {
          "title": "Ministérios do Brasil - Wikipédia",
          "url": "https://pt.wikipedia.org/wiki/Minist%C3%A9rios_do_Brasil"
        }
      ]
    },
    {
      "id": "BR-REPUBLICANOS",
      "country": "BR",
      "shortName": "REPUBLICANOS",
      "name": "Republicanos",
      "nameEn": "Republicans",
      "logo": "party-logos/br/republicanos.svg",
      "sha256": "4333b8fa16ab411bf73c90e67cc055926bc0f37b2b191e5b8d7ea2c606c74d9a",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Republicanos_(Brazil)_wordmark.svg",
      "ideology": [
        "Conservatism",
        "Christian right",
        "Economic liberalism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 2005,
      "previousNames": [
        {
          "name": "Partido Municipalista Renovador",
          "nameEn": "Municipalist Renewal Party",
          "years": "2005–2006"
        },
        {
          "name": "Partido Republicano Brasileiro",
          "nameEn": "Brazilian Republican Party",
          "years": "2006–2019"
        }
      ],
      "leader": "Marcos Pereira",
      "leaderTitle": "National President",
      "inPower": true,
      "timeInPower": "Holds the Ministry of Ports and Airports (Silvio Costa Filho) since 2023, as part of the Centrão bloc brought into the governing base.",
      "seats": 42,
      "seatsTotal": 513,
      "chamberName": "Câmara dos Deputados",
      "sources": [
        {
          "title": "Republicans (Brazil) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Republicans_(Brazil)"
        },
        {
          "title": "Bancadas Atuais - Portal da Câmara dos Deputados",
          "url": "https://www.camara.leg.br/deputados/liderancas-e-bancadas-partidarias/bancadas-atuais"
        },
        {
          "title": "Ministérios do Brasil - Wikipédia",
          "url": "https://pt.wikipedia.org/wiki/Minist%C3%A9rios_do_Brasil"
        }
      ]
    },
    {
      "id": "BR-MDB",
      "country": "BR",
      "shortName": "MDB",
      "name": "Movimento Democrático Brasileiro",
      "nameEn": "Brazilian Democratic Movement",
      "logo": "party-logos/br/mdb.svg",
      "sha256": "d610a2dc81ec7c18b798f5e2a7c075d8f56d6661f3b8929ea5ae9c5db82f1a5e",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Brazilian_Democratic_Movement_logo.svg",
      "ideology": [
        "Economic liberalism",
        "Christian democracy",
        "Big tent"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre to centre-right",
      "founded": 1966,
      "previousNames": [
        {
          "name": "Partido do Movimento Democrático Brasileiro",
          "nameEn": "Party of the Brazilian Democratic Movement (PMDB)",
          "years": "1980–2017"
        }
      ],
      "leader": "Baleia Rossi",
      "leaderTitle": "National President",
      "inPower": true,
      "timeInPower": "2023–present; holds Transport (Renan Filho), Planning and Budget (Simone Tebet) and Cities (Jader Filho).",
      "seats": 38,
      "seatsTotal": 513,
      "chamberName": "Câmara dos Deputados",
      "sources": [
        {
          "title": "Brazilian Democratic Movement - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Brazilian_Democratic_Movement"
        },
        {
          "title": "Bancadas Atuais - Portal da Câmara dos Deputados",
          "url": "https://www.camara.leg.br/deputados/liderancas-e-bancadas-partidarias/bancadas-atuais"
        },
        {
          "title": "Ministérios do Brasil - Wikipédia",
          "url": "https://pt.wikipedia.org/wiki/Minist%C3%A9rios_do_Brasil"
        }
      ]
    },
    {
      "id": "BR-PODEMOS",
      "country": "BR",
      "shortName": "PODE",
      "name": "Podemos",
      "nameEn": "We Can",
      "logo": "party-logos/br/podemos.svg",
      "sha256": "f23f7fd47cc0f38ec15f7ed518e14249438ae9921269951900bc2b5500e04343",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Podemos_(Brasil)_logo.svg",
      "ideology": [
        "Economic liberalism",
        "Anti-corruption",
        "Direct democracy"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1995,
      "previousNames": [
        {
          "name": "Partido Trabalhista Nacional",
          "nameEn": "National Labour Party (PTN)",
          "years": "1995–2016"
        }
      ],
      "leader": "Renata Abreu",
      "leaderTitle": "National President",
      "inPower": false,
      "timeInPower": "Not currently in Lula's cabinet as of Sept 2026.",
      "seats": 27,
      "seatsTotal": 513,
      "chamberName": "Câmara dos Deputados",
      "sources": [
        {
          "title": "Podemos (Brazil) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Podemos_(Brazil)"
        },
        {
          "title": "Bancadas Atuais - Portal da Câmara dos Deputados",
          "url": "https://www.camara.leg.br/deputados/liderancas-e-bancadas-partidarias/bancadas-atuais"
        }
      ]
    },
    {
      "id": "BR-PSDB",
      "country": "BR",
      "shortName": "PSDB",
      "name": "Partido da Social Democracia Brasileira",
      "nameEn": "Brazilian Social Democracy Party",
      "logo": "party-logos/br/psdb.svg",
      "sha256": "4b6a27ad9fc593808ac26e7d4c8b6f2dac549cdbb30cbdfa6f1b58bd7d7d23ef",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_of_the_Brazilian_Social_Democracy_Party_(2023).svg",
      "ideology": [
        "Third Way",
        "Social liberalism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre to centre-right",
      "founded": 1988,
      "coalitionId": "BR-PSDBCIDADANIA",
      "leader": "Aécio Neves",
      "leaderTitle": "National President",
      "inPower": false,
      "timeInPower": "Not currently in Lula's cabinet as of Sept 2026.",
      "seats": 18,
      "seatsTotal": 513,
      "chamberName": "Câmara dos Deputados",
      "sources": [
        {
          "title": "Brazilian Social Democracy Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Brazilian_Social_Democracy_Party"
        },
        {
          "title": "Busca de Deputados - Portal da Câmara dos Deputados (PSDB, 57ª legislatura)",
          "url": "https://www.camara.leg.br/deputados/quem-sao/resultado?partido=PSDB&legislatura=57&situacaoAtual=Em%20exerc%C3%ADcio"
        },
        {
          "title": "Marconi Perillo - Wikipedia (Aécio Neves succession as PSDB president)",
          "url": "https://en.wikipedia.org/wiki/Marconi_Perillo"
        }
      ]
    },
    {
      "id": "BR-CIDADANIA",
      "country": "BR",
      "shortName": "CIDADANIA",
      "name": "Cidadania",
      "nameEn": "Citizenship",
      "logo": "party-logos/br/cidadania.svg",
      "sha256": "655c2fe1d87c7ef57a7a4339b6d87d951d6bd032b646588914ccdd1b760d2d09",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Cidadania_(Brasil)_logo.svg",
      "ideology": [
        "Social liberalism",
        "Parliamentarism",
        "Federalism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre to centre-right",
      "founded": 1992,
      "previousNames": [
        {
          "name": "Partido Popular Socialista",
          "nameEn": "Popular Socialist Party (PPS)",
          "years": "1992–2019"
        }
      ],
      "coalitionId": "BR-PSDBCIDADANIA",
      "leader": "Comte Bittencourt",
      "leaderTitle": "National President",
      "inPower": false,
      "timeInPower": "Not currently in Lula's cabinet as of Sept 2026.",
      "seats": 2,
      "seatsTotal": 513,
      "chamberName": "Câmara dos Deputados",
      "sources": [
        {
          "title": "Cidadania - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Cidadania"
        },
        {
          "title": "Busca de Deputados - Portal da Câmara dos Deputados (CIDADANIA, 57ª legislatura)",
          "url": "https://www.camara.leg.br/deputados/quem-sao/resultado?partido=CIDADANIA&legislatura=57&situacaoAtual=Em%20exerc%C3%ADcio"
        }
      ]
    },
    {
      "id": "BR-PT",
      "country": "BR",
      "shortName": "PT",
      "name": "Partido dos Trabalhadores",
      "nameEn": "Workers' Party",
      "logo": "party-logos/br/pt.svg",
      "sha256": "5014ff66de5112a46de044dfd22a60226feccc98a3aeaa57fd08f6f18e8d6be5",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_do_Partido_dos_Trabalhadores.svg",
      "ideology": [
        "Social democracy",
        "Social liberalism",
        "Progressivism",
        "Populism",
        "Lulism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1980,
      "coalitionId": "BR-FEBRASIL",
      "leader": "Edinho Silva",
      "leaderTitle": "National President",
      "inPower": true,
      "timeInPower": "2023–present; the President's own party, holding the largest cabinet share, including Finance (Haddad), Casa Civil (Rui Costa), Education, Health and others.",
      "seats": 64,
      "seatsTotal": 513,
      "chamberName": "Câmara dos Deputados",
      "sources": [
        {
          "title": "Workers' Party (Brazil) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Workers%27_Party_(Brazil)"
        },
        {
          "title": "Busca de Deputados - Portal da Câmara dos Deputados (PT, 57ª legislatura)",
          "url": "https://www.camara.leg.br/deputados/quem-sao/resultado?partido=PT&legislatura=57&situacaoAtual=Em%20exerc%C3%ADcio"
        },
        {
          "title": "Ministérios do Brasil - Wikipédia",
          "url": "https://pt.wikipedia.org/wiki/Minist%C3%A9rios_do_Brasil"
        }
      ]
    },
    {
      "id": "BR-PCDOB",
      "country": "BR",
      "shortName": "PCdoB",
      "name": "Partido Comunista do Brasil",
      "nameEn": "Communist Party of Brazil",
      "logo": "party-logos/br/pcdob.svg",
      "sha256": "0fb1a3813ff9d4b47e904f4b0ec6b9a2ac8e763be2a354afa5895e4826fe4464",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:PCdoB_logo.svg",
      "ideology": [
        "Communism",
        "Marxism–Leninism",
        "Developmentalism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left to left-wing (described by some outlets as far-left due to its de jure Marxist–Leninist stance)",
      "founded": 1962,
      "coalitionId": "BR-FEBRASIL",
      "leader": "Luciana Santos",
      "leaderTitle": "National President",
      "inPower": true,
      "timeInPower": "2023–present; holds the Ministry of Science, Technology and Innovation (Luciana Santos).",
      "seats": 11,
      "seatsTotal": 513,
      "chamberName": "Câmara dos Deputados",
      "sources": [
        {
          "title": "Communist Party of Brazil - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Communist_Party_of_Brazil"
        },
        {
          "title": "Busca de Deputados - Portal da Câmara dos Deputados (PCdoB, 57ª legislatura)",
          "url": "https://www.camara.leg.br/deputados/quem-sao/resultado?partido=PCdoB&legislatura=57&situacaoAtual=Em%20exerc%C3%ADcio"
        },
        {
          "title": "Ministérios do Brasil - Wikipédia",
          "url": "https://pt.wikipedia.org/wiki/Minist%C3%A9rios_do_Brasil"
        }
      ]
    },
    {
      "id": "BR-PV",
      "country": "BR",
      "shortName": "PV",
      "name": "Partido Verde",
      "nameEn": "Green Party",
      "logo": "party-logos/br/pv.svg",
      "sha256": "977821d6ff979d775fe2f016576ef158b3af256d232fc9c1c508ed1ce2cdff62",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logomarca_do_Partido_Verde.svg",
      "ideology": [
        "Green politics"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre to left-wing",
      "founded": 1986,
      "coalitionId": "BR-FEBRASIL",
      "leader": "José Luiz Penna",
      "leaderTitle": "National President",
      "inPower": false,
      "timeInPower": "Part of the FE Brasil electoral federation with PT and PCdoB, but does not currently hold a ministry of its own in Lula's cabinet as of Sept 2026 (the Environment portfolio is held by REDE's Marina Silva, not PV).",
      "seats": 6,
      "seatsTotal": 513,
      "chamberName": "Câmara dos Deputados",
      "sources": [
        {
          "title": "Green Party (Brazil) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Green_Party_(Brazil)"
        },
        {
          "title": "Busca de Deputados - Portal da Câmara dos Deputados (PV, 57ª legislatura)",
          "url": "https://www.camara.leg.br/deputados/quem-sao/resultado?partido=PV&legislatura=57&situacaoAtual=Em%20exerc%C3%ADcio"
        },
        {
          "title": "Ministérios do Brasil - Wikipédia",
          "url": "https://pt.wikipedia.org/wiki/Minist%C3%A9rios_do_Brasil"
        }
      ]
    },
    {
      "id": "BR-PSOL",
      "country": "BR",
      "shortName": "PSOL",
      "name": "Partido Socialismo e Liberdade",
      "nameEn": "Socialism and Liberty Party",
      "logo": "party-logos/br/psol.svg",
      "sha256": "17072b12f62fd5443b9e15e3f964bb8ecef9192d19d8e31cfe241b319b5bc537",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_PSOL_roxo.svg",
      "ideology": [
        "Democratic socialism",
        "Socialism of the 21st century",
        "Progressivism"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing to far-left",
      "founded": 2004,
      "coalitionId": "BR-PSOLREDE",
      "leader": "Paula Coradi",
      "leaderTitle": "National President",
      "inPower": true,
      "timeInPower": "2023–present; holds the Secretaria-Geral of the Presidency (Guilherme Boulos), a ministry-status post.",
      "seats": 13,
      "seatsTotal": 513,
      "chamberName": "Câmara dos Deputados",
      "sources": [
        {
          "title": "Socialism and Liberty Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Socialism_and_Liberty_Party"
        },
        {
          "title": "Busca de Deputados - Portal da Câmara dos Deputados (PSOL, 57ª legislatura)",
          "url": "https://www.camara.leg.br/deputados/quem-sao/resultado?partido=PSOL&legislatura=57&situacaoAtual=Em%20exerc%C3%ADcio"
        },
        {
          "title": "Ministérios do Brasil - Wikipédia",
          "url": "https://pt.wikipedia.org/wiki/Minist%C3%A9rios_do_Brasil"
        }
      ]
    },
    {
      "id": "BR-REDE",
      "country": "BR",
      "shortName": "REDE",
      "name": "Rede Sustentabilidade",
      "nameEn": "Sustainability Network",
      "logo": "party-logos/br/rede.svg",
      "sha256": "68a0c909407889b14b429182d02559bc96dd60846e0fbf81b22eeeacc444c53e",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Rede_Sustentabilidade_logo.svg",
      "ideology": [
        "Environmentalism",
        "Progressivism"
      ],
      "ideologyPosition": "other",
      "positionRaw": "Left-wing (social), right-wing (fiscal)",
      "founded": 2013,
      "coalitionId": "BR-PSOLREDE",
      "leader": "Heloísa Helena",
      "leaderTitle": "National Spokesperson (co-spokesperson: Wesley Diógenes)",
      "inPower": true,
      "timeInPower": "2023–present; holds the Ministry of the Environment and Climate Change (Marina Silva), continuing a role she has held across multiple governments.",
      "seats": 3,
      "seatsTotal": 513,
      "chamberName": "Câmara dos Deputados",
      "sources": [
        {
          "title": "Sustainability Network - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Sustainability_Network"
        },
        {
          "title": "Busca de Deputados - Portal da Câmara dos Deputados (REDE, 57ª legislatura)",
          "url": "https://www.camara.leg.br/deputados/quem-sao/resultado?partido=REDE&legislatura=57&situacaoAtual=Em%20exerc%C3%ADcio"
        },
        {
          "title": "Ministérios do Brasil - Wikipédia",
          "url": "https://pt.wikipedia.org/wiki/Minist%C3%A9rios_do_Brasil"
        }
      ]
    },
    {
      "id": "BR-PL",
      "country": "BR",
      "shortName": "PL",
      "name": "Partido Liberal",
      "nameEn": "Liberal Party",
      "logo": "party-logos/br/pl.svg",
      "sha256": "190e2a70a1d2237ce4a3c0b532894a8209b5b5f88a09597b80f992ec9c98b391",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Partido_Liberal_(Brazil)_logo.svg",
      "ideology": [
        "Bolsonarism",
        "National conservatism",
        "Right-wing populism",
        "Economic liberalism",
        "Christian right"
      ],
      "ideologyPosition": "far-right",
      "positionRaw": "Far-right",
      "founded": 2006,
      "previousNames": [
        {
          "name": "Partido da República",
          "nameEn": "Party of the Republic (PR)",
          "years": "2006–2019"
        }
      ],
      "leader": "Valdemar Costa Neto",
      "leaderTitle": "National President",
      "inPower": false,
      "timeInPower": "The main opposition party (former President Bolsonaro's party); not part of Lula's governing base.",
      "seats": 98,
      "seatsTotal": 513,
      "chamberName": "Câmara dos Deputados",
      "sources": [
        {
          "title": "Liberal Party (Brazil, 2006) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Liberal_Party_(Brazil,_2006)"
        },
        {
          "title": "Bancadas Atuais - Portal da Câmara dos Deputados",
          "url": "https://www.camara.leg.br/deputados/liderancas-e-bancadas-partidarias/bancadas-atuais"
        }
      ]
    },
    {
      "id": "BR-PSB",
      "country": "BR",
      "shortName": "PSB",
      "name": "Partido Socialista Brasileiro",
      "nameEn": "Brazilian Socialist Party",
      "logo": "party-logos/br/psb.svg",
      "sha256": "ce8b08d35e257793438253fbad36ce7ac27aa3748daa07ded0cbfa258e087868",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_of_the_Brazilian_Socialist_Party_(wordmark_color).svg",
      "ideology": [
        "Social liberalism",
        "Social democracy"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre to centre-left",
      "founded": 1989,
      "leader": "João Henrique Campos",
      "leaderTitle": "National President",
      "inPower": true,
      "timeInPower": "2023–present; holds the Ministry of Entrepreneurship, Micro and Small Business (Márcio França). Vice President Geraldo Alckmin's ministerial role (Development, Industry, Commerce and Services) has also run through this term though Alckmin is not currently in this table as party-affiliated in that role.",
      "seats": 17,
      "seatsTotal": 513,
      "chamberName": "Câmara dos Deputados",
      "sources": [
        {
          "title": "Brazilian Socialist Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Brazilian_Socialist_Party"
        },
        {
          "title": "Bancadas Atuais - Portal da Câmara dos Deputados",
          "url": "https://www.camara.leg.br/deputados/liderancas-e-bancadas-partidarias/bancadas-atuais"
        },
        {
          "title": "Ministérios do Brasil - Wikipédia",
          "url": "https://pt.wikipedia.org/wiki/Minist%C3%A9rios_do_Brasil"
        }
      ]
    },
    {
      "id": "BR-PDT",
      "country": "BR",
      "shortName": "PDT",
      "name": "Partido Democrático Trabalhista",
      "nameEn": "Democratic Labour Party",
      "logo": "party-logos/br/pdt.png",
      "sha256": "4d5863261c765807a3529e3402e58f428641c6747717ef0779fd39aa4a3ed7ac",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:PDT_logo_2026.png",
      "ideology": [
        "Social democracy",
        "Social liberalism",
        "Democratic socialism",
        "Left-wing nationalism",
        "Left-wing populism",
        "Labourism",
        "Getulism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1979,
      "leader": "Carlos Lupi",
      "leaderTitle": "National President",
      "inPower": true,
      "timeInPower": "2023–present; holds Social Security (Wolney Queiroz) and Integration and Regional Development (Waldez Góes).",
      "seats": 10,
      "seatsTotal": 513,
      "chamberName": "Câmara dos Deputados",
      "logoMeaning": {
        "description": "The PDT's traditional emblem is a red rose held by a raised fist (the international social-democratic 'fist and rose' symbol, associated with the party's Labourist/Getulist roots). In a redesign led by strategist João Santana, the rose's leaves were recoloured green and yellow — the colours of the Brazilian flag. Party figures including Juliana Brizola said the change was meant to let the left 'reclaim' the national colours at a moment when they had become closely associated with Jair Bolsonaro and his supporters, stating the green and yellow 'belong to the entire nation' and not to Bolsonaro and his followers. The change was controversial inside the party, with some members (including Leonel Brizola Neto) arguing it signalled a rightward shift.",
        "sources": [
          {
            "title": "João Santana muda cor da rosa do PDT e inclui cores da bandeira do Brasil - Território Livre / Tribuna do Norte",
            "url": "https://blog.tribunadonorte.com.br/territoriolivre/joao-santana-muda-cor-da-rosa-do-pdt-e-inclui-cores-da-bandeira-do-brasil/"
          },
          {
            "title": "PDT renova sua identidade visual - PDT (official)",
            "url": "https://pdt.org.br/index.php/pdt-renova-sua-identidade-visual/"
          }
        ]
      },
      "sources": [
        {
          "title": "Democratic Labour Party (Brazil) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Democratic_Labour_Party_(Brazil)"
        },
        {
          "title": "Bancadas Atuais - Portal da Câmara dos Deputados",
          "url": "https://www.camara.leg.br/deputados/liderancas-e-bancadas-partidarias/bancadas-atuais"
        },
        {
          "title": "Ministérios do Brasil - Wikipédia",
          "url": "https://pt.wikipedia.org/wiki/Minist%C3%A9rios_do_Brasil"
        }
      ]
    },
    {
      "id": "BR-AVANTE",
      "country": "BR",
      "shortName": "AVANTE",
      "name": "Avante",
      "nameEn": "Forward",
      "logo": "party-logos/br/avante.svg",
      "sha256": "52a1061241f791d7f3275f9e9b0c6e1ae15fbd5a0034d08589ff6d9a8f4793a8",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Avante_70_(Brasil)_logo.svg",
      "ideology": [
        "Labourism",
        "Christian solidarism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 1989,
      "previousNames": [
        {
          "name": "Partido Trabalhista do Brasil",
          "nameEn": "Labour Party of Brazil (PTdoB)",
          "years": "1989–2017"
        }
      ],
      "leader": "Luis Tibé",
      "leaderTitle": "National President",
      "inPower": false,
      "timeInPower": "Not currently confirmed to hold a ministry in Lula's cabinet as of the September 2026 ministries table.",
      "seats": 5,
      "seatsTotal": 513,
      "chamberName": "Câmara dos Deputados",
      "sources": [
        {
          "title": "Avante (political party) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Avante_(political_party)"
        },
        {
          "title": "Bancadas Atuais - Portal da Câmara dos Deputados",
          "url": "https://www.camara.leg.br/deputados/liderancas-e-bancadas-partidarias/bancadas-atuais"
        },
        {
          "title": "Ministérios do Brasil - Wikipédia",
          "url": "https://pt.wikipedia.org/wiki/Minist%C3%A9rios_do_Brasil"
        }
      ]
    },
    {
      "id": "BR-NOVO",
      "country": "BR",
      "shortName": "NOVO",
      "name": "Partido Novo",
      "nameEn": "New Party",
      "logo": "party-logos/br/novo.svg",
      "sha256": "3cffc9f1c2da3185aaab2fbfeb86f2472d84f23fb66f590fff365d48b36ed253",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Partido_Novo_logo_(2023).svg",
      "ideology": [
        "Conservative liberalism",
        "Libertarian conservatism",
        "Libertarianism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing to far-right",
      "founded": 2011,
      "leader": "Eduardo Rodrigo Fernandes Ribeiro",
      "leaderTitle": "National President",
      "inPower": false,
      "timeInPower": "Opposition; NOVO has a standing policy of not accepting cabinet posts or public funding, and is not part of Lula's governing base.",
      "seats": 5,
      "seatsTotal": 513,
      "chamberName": "Câmara dos Deputados",
      "sources": [
        {
          "title": "New Party (Brazil) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/New_Party_(Brazil)"
        },
        {
          "title": "Bancadas Atuais - Portal da Câmara dos Deputados",
          "url": "https://www.camara.leg.br/deputados/liderancas-e-bancadas-partidarias/bancadas-atuais"
        }
      ]
    },
    {
      "id": "BR-SOLIDARIEDADE",
      "country": "BR",
      "shortName": "SOLIDARIEDADE",
      "name": "Solidariedade",
      "nameEn": "Solidarity",
      "logo": "party-logos/br/solidariedade.svg",
      "sha256": "60b788b35b9ff402229dcb995d78b39fc5f9835d9d930126d70d67347dd691a9",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Solidariedade_77_(Brasil)_logo.svg",
      "ideology": [
        "Social democracy",
        "Third Way",
        "Labourism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre (also described as centre-right and centre-left in some analyses)",
      "founded": 2012,
      "leader": "Paulo Pereira da Silva",
      "leaderTitle": "National President",
      "inPower": false,
      "timeInPower": "Not currently confirmed to hold a ministry in Lula's cabinet as of the September 2026 ministries table (the Sport ministry it was historically associated with is currently held by a PP minister).",
      "seats": 4,
      "seatsTotal": 513,
      "chamberName": "Câmara dos Deputados",
      "sources": [
        {
          "title": "Solidarity (Brazil) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Solidarity_(Brazil)"
        },
        {
          "title": "Bancadas Atuais - Portal da Câmara dos Deputados",
          "url": "https://www.camara.leg.br/deputados/liderancas-e-bancadas-partidarias/bancadas-atuais"
        },
        {
          "title": "Ministérios do Brasil - Wikipédia",
          "url": "https://pt.wikipedia.org/wiki/Minist%C3%A9rios_do_Brasil"
        }
      ]
    },
    {
      "id": "BR-PRD",
      "country": "BR",
      "shortName": "PRD",
      "name": "Partido Renovação Democrática",
      "nameEn": "Democratic Renewal Party",
      "logo": "party-logos/br/prd.svg",
      "sha256": "44255e82045f3ee9c8ae35f445f470dc280cde5ad422600e5d23dfc577375219",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Partido_Renova%C3%A7%C3%A3o_Democr%C3%A1tica_logo.svg",
      "ideology": [
        "National conservatism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 2022,
      "leader": "Marcus Vinícius Neskau",
      "leaderTitle": "National President",
      "inPower": true,
      "timeInPower": "Per the Portuguese Wikipedia's current ministries table, the Ministry of Defence (José Múcio Monteiro, minister continuously since Jan 2023) is currently listed under PRD's party column; PRD itself was only registered by the TSE in November 2023, formed from the 2022 merger of the PTB and Patriota (both of which had failed to clear the electoral threshold in the 2022 election).",
      "seats": 3,
      "seatsTotal": 513,
      "chamberName": "Câmara dos Deputados",
      "sources": [
        {
          "title": "Democratic Renewal Party (Brazil) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Democratic_Renewal_Party_(Brazil)"
        },
        {
          "title": "Bancadas Atuais - Portal da Câmara dos Deputados",
          "url": "https://www.camara.leg.br/deputados/liderancas-e-bancadas-partidarias/bancadas-atuais"
        },
        {
          "title": "Ministérios do Brasil - Wikipédia",
          "url": "https://pt.wikipedia.org/wiki/Minist%C3%A9rios_do_Brasil"
        },
        {
          "title": "TSE aprova criação do Partido Renovação Democrática (PRD)",
          "url": "https://www.tse.jus.br/comunicacao/noticias/2023/Novembro/tse-aprova-criacao-do-partido-renovacao-democratica-prd"
        }
      ]
    },
    {
      "id": "BR-MISSAO",
      "country": "BR",
      "shortName": "MISSÃO",
      "name": "Missão",
      "nameEn": "Mission",
      "logo": "party-logos/br/missao.svg",
      "sha256": "f95e55b050d8248f390c1cfb8fba91655e4b46931a930de161b305a134451bf3",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:MISS%C3%83O_wordmark.svg",
      "ideology": [
        "Liberalismo conservador (Conservative liberalism)",
        "Liberalismo econômico (Economic liberalism)",
        "Nacional-liberalismo (National liberalism)",
        "Tecnocapitalismo",
        "Fiscalismo",
        "Bukelismo"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Direita à extrema-direita (Right to far-right)",
      "founded": 2025,
      "leader": "Renan Antônio Ferreira dos Santos (Renan Santos)",
      "leaderTitle": "National President",
      "inPower": false,
      "timeInPower": "Not part of Lula's governing base; Brazil's newest registered party (statute filed 2023, TSE registration granted 4 November 2025), founded by the Movimento Brasil Livre (MBL, est. 2014). Its sole deputy, Kim Kataguiri, left União Brasil to join it.",
      "seats": 1,
      "seatsTotal": 513,
      "chamberName": "Câmara dos Deputados",
      "sources": [
        {
          "title": "Partido Missão - Wikipédia",
          "url": "https://pt.wikipedia.org/wiki/Partido_Miss%C3%A3o"
        },
        {
          "title": "Mission Party (Brazil) - Wikidata",
          "url": "https://www.wikidata.org/wiki/Q134984491"
        },
        {
          "title": "Bancadas Atuais - Portal da Câmara dos Deputados",
          "url": "https://www.camara.leg.br/deputados/liderancas-e-bancadas-partidarias/bancadas-atuais"
        },
        {
          "title": "Kataguiri anuncia saída do União Brasil para ingressar no Missão - Gazeta do Povo",
          "url": "https://www.gazetadopovo.com.br/republica/kim-kataguiri-anuncia-saida-do-uniao-brasil-para-o-partido-do-mbl/"
        }
      ]
    }
  ],
  "MY": [
    {
      "id": "MY-DAP",
      "country": "MY",
      "shortName": "DAP",
      "name": "Parti Tindakan Demokratik",
      "nameEn": "Democratic Action Party",
      "logo": "party-logos/my/dap.svg",
      "sha256": "306ab75cdd756db7ebc8c8e79ccf5edfbf5e68ed717c8598b2f4ac8601f1344c",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Democratic_Action_Party_Logo.svg",
      "ideology": [
        "Social democracy",
        "Progressivism",
        "Secularism",
        "Multiculturalism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1965,
      "coalitionId": "MY-PH",
      "leader": "Anthony Loke",
      "leaderTitle": "Secretary-General",
      "inPower": true,
      "timeInPower": "2022–present, as part of the Pakatan Harapan-led Unity Government",
      "seats": 40,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "logoMeaning": {
        "description": "DAP's rocket logo has been used since the 1969 general election. The red rocket symbolises the party's aspiration for a modern, dynamic and progressive society; the four rocket boosters represent the support and drive given to the party's objectives by the three major ethnic groups (Malay, Chinese, Indian) and others; the blue circle stands for the unity of Malaysia's multiracial people; and the white background stands for purity and incorruptibility.",
        "sources": [
          {
            "title": "Democratic Action Party — Party symbols",
            "url": "https://en.wikipedia.org/wiki/Democratic_Action_Party"
          },
          {
            "title": "What do the symbols on Malaysian political party logos mean?",
            "url": "https://cilisos.my/what-do-malaysian-political-party-flags-mean/"
          }
        ]
      },
      "sources": [
        {
          "title": "Democratic Action Party",
          "url": "https://en.wikipedia.org/wiki/Democratic_Action_Party"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        }
      ]
    },
    {
      "id": "MY-PKR",
      "country": "MY",
      "shortName": "PKR",
      "name": "Parti Keadilan Rakyat",
      "nameEn": "People's Justice Party",
      "logo": "party-logos/my/pkr.svg",
      "sha256": "29d8aa57a8fcee639aa855e618386787c882aab813b16c425f02c046a6b47a7c",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Parti_Keadilan_Rakyat_logo.svg",
      "ideology": [
        "Reformism",
        "Anti-corruption",
        "Social democracy"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 1999,
      "coalitionId": "MY-PH",
      "leader": "Anwar Ibrahim",
      "leaderTitle": "President",
      "inPower": true,
      "timeInPower": "2022–present, as part of the Pakatan Harapan-led Unity Government (Anwar Ibrahim is Prime Minister)",
      "seats": 28,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "logoMeaning": {
        "description": "PKR's logo centres on a large white eye, widely understood as a reference to the black eye Anwar Ibrahim suffered from a police beating in custody in 1998 (an event that galvanised the Reformasi movement from which the party emerged); the eye shape is also read as depicting two crescent moons, an Islamic symbol.",
        "sources": [
          {
            "title": "What do the symbols on Malaysian political party logos mean?",
            "url": "https://cilisos.my/what-do-malaysian-political-party-flags-mean/"
          }
        ]
      },
      "sources": [
        {
          "title": "People's Justice Party (Malaysia)",
          "url": "https://en.wikipedia.org/wiki/People%27s_Justice_Party_(Malaysia)"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        }
      ]
    },
    {
      "id": "MY-AMANAH",
      "country": "MY",
      "shortName": "AMANAH",
      "name": "Parti Amanah Negara",
      "nameEn": "National Trust Party",
      "logo": "party-logos/my/amanah.svg",
      "sha256": "eceacb888ee39a3aadd358e7d1325c5682f78439681c8de2d9ca5cc8d45aae57",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Parti_Amanah_Negara_Logo.svg",
      "ideology": [
        "Islamic democracy",
        "Progressivism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 1978,
      "previousNames": [
        {
          "name": "Parti Pekerja-Pekerja Malaysia",
          "nameEn": "Malaysian Workers' Party (PPPM)",
          "years": "1978–2015"
        }
      ],
      "coalitionId": "MY-PH",
      "leader": "Mohamad Sabu",
      "leaderTitle": "President",
      "inPower": true,
      "timeInPower": "2022–present, as part of the Pakatan Harapan-led Unity Government",
      "seats": 8,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "logoMeaning": {
        "description": "AMANAH's logo uses a stylised letter 'A' (also read as an upward arrow) for the party's name; three stripes represent the values of Trust (Amanah), Progressiveness and Care; orange symbolises energy, success, friendship and determination, while white symbolises purity and morality.",
        "sources": [
          {
            "title": "What do the symbols on Malaysian political party logos mean?",
            "url": "https://cilisos.my/what-do-malaysian-political-party-flags-mean/"
          }
        ]
      },
      "sources": [
        {
          "title": "National Trust Party (Malaysia)",
          "url": "https://en.wikipedia.org/wiki/National_Trust_Party_(Malaysia)"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        }
      ]
    },
    {
      "id": "MY-UMNO",
      "country": "MY",
      "shortName": "UMNO",
      "name": "Pertubuhan Kebangsaan Melayu Bersatu",
      "nameEn": "United Malays National Organisation",
      "logo": "party-logos/my/umno.svg",
      "sha256": "8677cd8e2d547fd7c6b307e69c051198b85620a21219f7d2fb4665072cbf2f7f",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:UMNO_logo.svg",
      "ideology": [
        "Ketuanan Melayu",
        "Malay nationalism",
        "National conservatism",
        "Social conservatism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 1946,
      "coalitionId": "MY-BN",
      "leader": "Ahmad Zahid Hamidi",
      "leaderTitle": "President",
      "inPower": true,
      "timeInPower": "2022–present as part of the Unity Government (via Barisan Nasional); UMNO/BN led the federal government almost continuously from independence (1957) until 2018, and again 2020–2022 under different coalitions",
      "seats": 26,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "logoMeaning": {
        "description": "UMNO's flag (Sang Saka Bangsa) uses red for bravery, white for purity and sincerity, yellow for royalty and green for Islam; the keris (Malay dagger) at its centre represents Malay civilisation.",
        "sources": [
          {
            "title": "What do the symbols on Malaysian political party logos mean?",
            "url": "https://cilisos.my/what-do-malaysian-political-party-flags-mean/"
          }
        ]
      },
      "sources": [
        {
          "title": "UMNO",
          "url": "https://en.wikipedia.org/wiki/UMNO"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        }
      ]
    },
    {
      "id": "MY-MCA",
      "country": "MY",
      "shortName": "MCA",
      "name": "Persatuan Cina Malaysia",
      "nameEn": "Malaysian Chinese Association",
      "logo": "party-logos/my/mca.svg",
      "sha256": "dca1dfbc699b48be4e555aa234e31d817574c0703de25fc5a4daf0630bd21f14",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Emblem_of_the_Malaysian_Chinese_Association.svg",
      "ideology": [
        "Malaysian Chinese interests",
        "Social conservatism",
        "Three Principles of the People"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1949,
      "coalitionId": "MY-BN",
      "leader": "Wee Ka Siong",
      "leaderTitle": "President",
      "inPower": true,
      "timeInPower": "2022–present, as part of the Unity Government (via Barisan Nasional, a BN member since 1974)",
      "seats": 2,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "logoMeaning": {
        "description": "The MCA emblem's 14-point star represents the 13 states of Malaysia together with the Federal Government, symbolising the party's loyalty to the nation; the design was adopted in the 1950s and first flown in 1958.",
        "sources": [
          {
            "title": "What do the symbols on Malaysian political party logos mean?",
            "url": "https://cilisos.my/what-do-malaysian-political-party-flags-mean/"
          }
        ]
      },
      "sources": [
        {
          "title": "Malaysian Chinese Association",
          "url": "https://en.wikipedia.org/wiki/Malaysian_Chinese_Association"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        }
      ]
    },
    {
      "id": "MY-MIC",
      "country": "MY",
      "shortName": "MIC",
      "name": "Kongres India Se-Malaysia",
      "nameEn": "Malaysian Indian Congress",
      "logo": "party-logos/my/mic.svg",
      "sha256": "1d322d311daa0d711cba69e48305b63c6e2ae842dde0f3336d1ec15948afda3a",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Malaysian_Indian_Congress_Logo.svg",
      "ideology": [
        "Malaysian Indian interests",
        "Social conservatism",
        "Dravidian movement"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1946,
      "coalitionId": "MY-BN",
      "leader": "Vigneswaran Sanasee",
      "leaderTitle": "President",
      "inPower": true,
      "timeInPower": "2022–present, as part of the Unity Government (via Barisan Nasional, a BN member since 1974)",
      "seats": 1,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "logoMeaning": {
        "description": "The MIC flag's 14 stripes are borrowed from Malaysia's national flag (the Jalur Gemilang); the blue stripes at top and bottom represent peace and prosperity, and the green circle at the centre represents unity, with the party's initials rendered in Tamil and Romanised script.",
        "sources": [
          {
            "title": "What do the symbols on Malaysian political party logos mean?",
            "url": "https://cilisos.my/what-do-malaysian-political-party-flags-mean/"
          }
        ]
      },
      "sources": [
        {
          "title": "Malaysian Indian Congress",
          "url": "https://en.wikipedia.org/wiki/Malaysian_Indian_Congress"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        }
      ]
    },
    {
      "id": "MY-PBRS",
      "country": "MY",
      "shortName": "PBRS",
      "name": "Parti Bersatu Rakyat Sabah",
      "nameEn": "United Sabah People's Party",
      "logo": "party-logos/my/pbrs.jpg",
      "sha256": "787425148e44987ef16aa4818987e4971e962320cd4dd517cc54f4e2c53da300",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Parti_Bersatu_Rakyat_Sabah_(Logo).jpg",
      "licenceNote": "Non-free party logo hosted locally on English Wikipedia and used there under a fair-use style rationale to identify the party in its own infobox; used here to identify the party, not to imply endorsement.",
      "ideology": [
        "Sabah regionalism",
        "20-point agreement",
        "Multiracialism",
        "Indigenous rights",
        "Social conservatism",
        "Kadazan-Dusun interests"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1994,
      "coalitionId": "MY-BN",
      "leader": "Arthur Joseph Kurup",
      "leaderTitle": "President",
      "inPower": true,
      "timeInPower": "2022–present, as part of the Unity Government (via Barisan Nasional, member since 2020, and previously 1994–2018)",
      "seats": 1,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "sources": [
        {
          "title": "United Sabah People's Party",
          "url": "https://en.wikipedia.org/wiki/United_Sabah_People%27s_Party"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        }
      ]
    },
    {
      "id": "MY-PBB",
      "country": "MY",
      "shortName": "PBB",
      "name": "Parti Pesaka Bumiputera Bersatu",
      "nameEn": "United Bumiputera Heritage Party",
      "logo": "party-logos/my/pbb.svg",
      "sha256": "fb8c85d6f164afa6613cc236266c5bf9e6dc99b81f97a60df8b55acb472cfdc3",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Parti_Pesaka_Bumiputera_Bersatu_Logo.svg",
      "licenceNote": "Non-free party logo hosted locally on English Wikipedia and used there under a fair-use style rationale to identify the party in its own infobox; used here to identify the party, not to imply endorsement.",
      "ideology": [],
      "ideologyPosition": "other",
      "founded": 1973,
      "coalitionId": "MY-GPS",
      "leader": "Abang Abdul Rahman Zohari Abang Openg",
      "leaderTitle": "President",
      "inPower": true,
      "timeInPower": "2022–present, as part of the Unity Government (via Gabungan Parti Sarawak, GPS's largest component since 2018); PBB was part of Barisan Nasional 1973–2018",
      "seats": 14,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "sources": [
        {
          "title": "Parti Pesaka Bumiputera Bersatu",
          "url": "https://en.wikipedia.org/wiki/Parti_Pesaka_Bumiputera_Bersatu"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        }
      ]
    },
    {
      "id": "MY-PRS",
      "country": "MY",
      "shortName": "PRS",
      "name": "Parti Rakyat Sarawak",
      "nameEn": "Sarawak Peoples' Party",
      "logo": "party-logos/my/prs.jpg",
      "sha256": "de1bb3d971967b21351110ddd17f7ebab3e70df2bcb7db0960452629128779da",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_PRS.jpg",
      "ideology": [
        "Nationalism",
        "Multiracialism",
        "Self determination",
        "MA63 and law rights",
        "National reformism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 2004,
      "coalitionId": "MY-GPS",
      "leader": "John Sikie Tayai",
      "leaderTitle": "President",
      "inPower": true,
      "timeInPower": "2022–present, as part of the Unity Government (via Gabungan Parti Sarawak, member since 2018; previously Barisan Nasional 2004–2018)",
      "seats": 5,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "sources": [
        {
          "title": "Sarawak Peoples' Party",
          "url": "https://en.wikipedia.org/wiki/Sarawak_Peoples%27_Party"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        }
      ]
    },
    {
      "id": "MY-PDP",
      "country": "MY",
      "shortName": "PDP",
      "name": "Parti Demokratik Progresif",
      "nameEn": "Progressive Democratic Party",
      "logo": "party-logos/my/pdp.jpg",
      "sha256": "d8fb9422a47ce4d7574b6a14a29f0de819b545356e7fa7b59c456a70beed20a9",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Progressive_Democratic_Party_of_Malaysia_PDP_new_logo.jpg",
      "licenceNote": "Non-free party logo hosted locally on English Wikipedia and used there under a fair-use style rationale to identify the party in its own infobox; used here to identify the party, not to imply endorsement.",
      "ideology": [
        "Conservatism",
        "Sarawak regionalism",
        "Nationalism",
        "Multiracial politics",
        "Self-determination"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right to right-wing",
      "founded": 2002,
      "previousNames": [
        {
          "name": "Sarawak Progressive Democratic Party",
          "years": "2002–2017"
        }
      ],
      "coalitionId": "MY-GPS",
      "leader": "Tiong King Sing",
      "leaderTitle": "President",
      "inPower": true,
      "timeInPower": "2022–present, as part of the Unity Government (via Gabungan Parti Sarawak, member since 2018; previously Barisan Nasional 2002–2018)",
      "seats": 2,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "sources": [
        {
          "title": "Progressive Democratic Party (Malaysia)",
          "url": "https://en.wikipedia.org/wiki/Progressive_Democratic_Party_(Malaysia)"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        }
      ]
    },
    {
      "id": "MY-SUPP",
      "country": "MY",
      "shortName": "SUPP",
      "name": "Parti Rakyat Bersatu Sarawak",
      "nameEn": "Sarawak United Peoples' Party",
      "logo": "party-logos/my/supp.svg",
      "sha256": "e723fadafc39765985449ed8fe802c1d627977b02e30c910b59cdc722423ab2a",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Sarawak_United_People%27s_Party_logo.svg",
      "ideology": [
        "Multiracialism",
        "Sarawak regionalism",
        "Sarawak Chinese interests"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 1959,
      "coalitionId": "MY-GPS",
      "leader": "Sim Kui Hian",
      "leaderTitle": "President",
      "inPower": true,
      "timeInPower": "2022–present, as part of the Unity Government (via Gabungan Parti Sarawak, member since 2018; previously Barisan Nasional 1973–2018)",
      "seats": 2,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "sources": [
        {
          "title": "Sarawak United Peoples' Party",
          "url": "https://en.wikipedia.org/wiki/Sarawak_United_Peoples%27_Party"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        }
      ]
    },
    {
      "id": "MY-GRS",
      "country": "MY",
      "shortName": "GRS",
      "name": "Gabungan Rakyat Sabah",
      "nameEn": "Sabah People's Coalition",
      "logo": "party-logos/my/grs.jpg",
      "sha256": "cf54c9f6fce0328cb93923abf6f58780cb541e3a60afcfd4064e660e596c1b90",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Gabungan_Rakyat_Sabah_GRS.jpg",
      "ideology": [
        "Sabahan regionalism",
        "Sabahan nationalism",
        "Borneo multiracialism",
        "20-point agreement",
        "Bumiputera interests",
        "Sabah & Sarawak unity"
      ],
      "ideologyPosition": "other",
      "founded": 2020,
      "coalitionId": "MY-GRS",
      "leader": "Hajiji Noor",
      "leaderTitle": "Chairman",
      "inPower": true,
      "timeInPower": "2022–present, as part of the Unity Government. GRS is a Sabah-based coalition founded 2020 and registered as a political party (Registrar of Societies approval, 2022); four Dewan Rakyat MPs (former BERSATU Sabah members who could not join a GRS component party under the anti-hopping law) sit as GRS direct members",
      "seats": 4,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "sources": [
        {
          "title": "Gabungan Rakyat Sabah",
          "url": "https://en.wikipedia.org/wiki/Gabungan_Rakyat_Sabah"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        }
      ]
    },
    {
      "id": "MY-UPKO",
      "country": "MY",
      "shortName": "UPKO",
      "name": "Pertubuhan Kinabalu Progresif Bersatu",
      "nameEn": "United Progressive Kinabalu Organisation",
      "logo": "party-logos/my/upko.jpg",
      "sha256": "b6cb3b1d4df9e83dbe3bed21637f06b4fd279657f774cce3e13b91c1997274f3",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:United_Progressive_People_of_Kinabalu_Organisation.jpg",
      "licenceNote": "Non-free party logo hosted locally on English Wikipedia and used there under a fair-use style rationale to identify the party in its own infobox; used here to identify the party, not to imply endorsement.",
      "ideology": [
        "Sabah regionalism"
      ],
      "ideologyPosition": "other",
      "founded": 1994,
      "previousNames": [
        {
          "name": "Sabah Democratic Party",
          "years": "1994–1999"
        },
        {
          "name": "United Pasokmomogun Kadazandusun Murut Organisation",
          "years": "1999–2019"
        }
      ],
      "coalitionId": "MY-GRS",
      "leader": "Ewon Benedick",
      "leaderTitle": "President",
      "inPower": true,
      "timeInPower": "2022–present, as part of the Unity Government; UPKO was in Pakatan Harapan 2021–2025 and joined Gabungan Rakyat Sabah in 2026",
      "seats": 2,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "sources": [
        {
          "title": "United Progressive Kinabalu Organisation",
          "url": "https://en.wikipedia.org/wiki/United_Progressive_Kinabalu_Organisation"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        }
      ]
    },
    {
      "id": "MY-PBS",
      "country": "MY",
      "shortName": "PBS",
      "name": "Parti Bersatu Sabah",
      "nameEn": "United Sabah Party",
      "logo": "party-logos/my/pbs.png",
      "sha256": "29f0924fa9b9adad35be561183f3e928c70e86b8982280b515e9cdf7d8550e25",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Logo_of_Parti_Bersatu_Sabah.png",
      "licenceNote": "Non-free party logo hosted locally on English Wikipedia and used there under a fair-use style rationale to identify the party in its own infobox; used here to identify the party, not to imply endorsement.",
      "ideology": [
        "Sabah regionalism",
        "20-point agreement",
        "Multiracialism",
        "Indigenous rights",
        "Social conservatism",
        "Kadazan-Dusun interests"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1985,
      "coalitionId": "MY-GRS",
      "leader": "Joachim Gunsalam",
      "leaderTitle": "President",
      "inPower": true,
      "timeInPower": "2022–present, as part of the Unity Government (via Gabungan Rakyat Sabah, member since 2020)",
      "seats": 1,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "sources": [
        {
          "title": "United Sabah Party",
          "url": "https://en.wikipedia.org/wiki/United_Sabah_Party"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        }
      ]
    },
    {
      "id": "MY-WARISAN",
      "country": "MY",
      "shortName": "WARISAN",
      "name": "Parti Warisan",
      "nameEn": "Heritage Party",
      "logo": "party-logos/my/warisan.png",
      "sha256": "8533d58a53900f82ba045e1cf70effb4c26c5af1491adadbc6718d7b07ef73b0",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Parti_Warisan_logo.png",
      "licenceNote": "Non-free party logo hosted locally on English Wikipedia and used there under a fair-use style rationale to identify the party in its own infobox; used here to identify the party, not to imply endorsement.",
      "ideology": [
        "Progressivism",
        "Multiracialism",
        "Nationalism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 2016,
      "previousNames": [
        {
          "name": "Parti Warisan Sabah",
          "nameEn": "Sabah Heritage Party",
          "years": "2016–2020"
        }
      ],
      "leader": "Shafie Apdal",
      "leaderTitle": "President",
      "inPower": true,
      "timeInPower": "2022–present, supporting the Unity Government; was the senior partner in Sabah's state government and PH's junior federal partner 2018–2020",
      "seats": 3,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "logoMeaning": {
        "description": "WARISAN's logo depicts a sailboat symbolising courage and resilience, and a handshake symbolising the unity of Sabah's multi-ethnic population; a blue hand represents eastern Sabah and a red hand western Sabah, paddy represents the welfare of Sabah's people, and the blue sea represents challenges shared across the state.",
        "sources": [
          {
            "title": "What do the symbols on Malaysian political party logos mean?",
            "url": "https://cilisos.my/what-do-malaysian-political-party-flags-mean/"
          }
        ]
      },
      "sources": [
        {
          "title": "Heritage Party (Malaysia)",
          "url": "https://en.wikipedia.org/wiki/Heritage_Party_(Malaysia)"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        }
      ]
    },
    {
      "id": "MY-KDM",
      "country": "MY",
      "shortName": "KDM",
      "name": "Parti Kesejahteraan Demokratik Masyarakat",
      "nameEn": "Social Democratic Harmony Party",
      "logo": "party-logos/my/kdm.png",
      "sha256": "a7113b929fc92495ea94c11a56be13fb462054aebd87216743b65ebd021d6c8b",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:KDM_Party_Sabah.png",
      "licenceNote": "Non-free party logo hosted locally on English Wikipedia and used there under a fair-use style rationale to identify the party in its own infobox; used here to identify the party, not to imply endorsement.",
      "ideology": [
        "Sabah regionalism",
        "Multiracialism",
        "Kadazandusun and Murut interests",
        "Localism"
      ],
      "ideologyPosition": "other",
      "founded": 2022,
      "leader": "Priscella Peter",
      "leaderTitle": "President",
      "inPower": true,
      "timeInPower": "2022–present, supporting the Unity Government; formerly allied with Gabungan Rakyat Sabah (2022–2026)",
      "seats": 2,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "sources": [
        {
          "title": "Social Democratic Harmony Party",
          "url": "https://en.wikipedia.org/wiki/Social_Democratic_Harmony_Party"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        }
      ]
    },
    {
      "id": "MY-STAR",
      "country": "MY",
      "shortName": "STAR",
      "name": "Parti Solidariti Tanah Airku",
      "nameEn": "Homeland Solidarity Party",
      "logo": "party-logos/my/star.svg",
      "sha256": "61e9d857fd79a687e74e59761f5f014a459eaf9cea7364c2064701546c7a779f",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Homeland_Solidarity_Party_Logo.svg",
      "licenceNote": "Non-free party logo hosted locally on English Wikipedia and used there under a fair-use style rationale to identify the party in its own infobox; used here to identify the party, not to imply endorsement.",
      "ideology": [
        "Sabah regionalism"
      ],
      "ideologyPosition": "other",
      "founded": 2016,
      "leader": "Jeffrey Kitingan",
      "leaderTitle": "President",
      "inPower": true,
      "timeInPower": "2022–present, supporting the Unity Government; was a Gabungan Rakyat Sabah member 2020–2025, leaving after disputing GRS's 2025 Sabah state election seat allocation",
      "seats": 1,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "sources": [
        {
          "title": "Homeland Solidarity Party",
          "url": "https://en.wikipedia.org/wiki/Homeland_Solidarity_Party"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        }
      ]
    },
    {
      "id": "MY-PBM",
      "country": "MY",
      "shortName": "PBM",
      "name": "Parti Bangsa Malaysia",
      "nameEn": "Malaysian Nation Party",
      "noImageReason": "No logo image for Parti Bangsa Malaysia could be found on Wikimedia Commons or English Wikipedia (its Wikipedia infobox logo field is blank and its Wikidata item has no logo image statement); the party unveiled a new hand-shaped logo in December 2024 per news coverage, but no freely reusable or Wikipedia-hosted copy of it was located.",
      "ideology": [
        "Multiracialism",
        "Civic nationalism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 2012,
      "previousNames": [
        {
          "name": "Parti Pekerja Sarawak",
          "nameEn": "Sarawak Workers Party",
          "years": "2012–2021"
        }
      ],
      "leader": "Larry Sng Wei Shien",
      "leaderTitle": "President",
      "inPower": true,
      "timeInPower": "2022–present, supporting the Unity Government",
      "seats": 1,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "sources": [
        {
          "title": "Parti Bangsa Malaysia",
          "url": "https://en.wikipedia.org/wiki/Parti_Bangsa_Malaysia"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        }
      ]
    },
    {
      "id": "MY-PAS",
      "country": "MY",
      "shortName": "PAS",
      "name": "Parti Islam Se-Malaysia",
      "nameEn": "Malaysian Islamic Party",
      "logo": "party-logos/my/pas.svg",
      "sha256": "4d7d7d4289a66af3f8a538fa447d0ebf76454ce8c26992b9c93ab2a4f9293926",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:PAS_logo.svg",
      "ideology": [
        "Islamism",
        "Pan-Islamism",
        "Ketuanan Melayu",
        "Islamic nationalism",
        "Islamic fundamentalism",
        "Right-wing populism",
        "Anti-Zionism",
        "Anti-communism"
      ],
      "ideologyPosition": "far-right",
      "positionRaw": "Far-right",
      "founded": 1951,
      "previousNames": [
        {
          "name": "Pan-Malayan Islamic Union",
          "years": "1951"
        }
      ],
      "coalitionId": "MY-PN",
      "leader": "Abdul Hadi Awang",
      "leaderTitle": "President",
      "inPower": false,
      "timeInPower": "Opposition since 2022; previously in the federal government within Perikatan Nasional, 2020–2022",
      "seats": 43,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "logoMeaning": {
        "description": "PAS's flag is a plain green field bearing a white disc (\"bulan\", the moon); the green colour and the white moon both symbolise Islam, and the design was originally kept simple so rural supporters could easily sew it themselves.",
        "sources": [
          {
            "title": "What do the symbols on Malaysian political party logos mean?",
            "url": "https://cilisos.my/what-do-malaysian-political-party-flags-mean/"
          }
        ]
      },
      "sources": [
        {
          "title": "Malaysian Islamic Party",
          "url": "https://en.wikipedia.org/wiki/Malaysian_Islamic_Party"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        }
      ]
    },
    {
      "id": "MY-WAWASAN",
      "country": "MY",
      "shortName": "WAWASAN",
      "name": "Parti Wawasan Negara",
      "nameEn": "National Vision Party",
      "logo": "party-logos/my/wawasan.svg",
      "sha256": "c1c528a8b7f36d218be61ab010f7a4a202d8a4c2164634edc6483b7e9d8ff910",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Parti_Wawasan_Negara_logo.svg",
      "ideology": [],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 2009,
      "previousNames": [
        {
          "name": "Parti Cinta Malaysia",
          "nameEn": "Love Malaysia Party",
          "years": "2009–2026"
        }
      ],
      "coalitionId": "MY-PN",
      "leader": "Hamzah Zainudin",
      "leaderTitle": "President",
      "inPower": false,
      "timeInPower": "Opposition; joined Perikatan Nasional in 2026 after a takeover and rename of the dormant Parti Cinta Malaysia by Hamzah Zainudin",
      "seats": 6,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "sources": [
        {
          "title": "National Vision Party (Malaysia)",
          "url": "https://en.wikipedia.org/wiki/National_Vision_Party_(Malaysia)"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        }
      ]
    },
    {
      "id": "MY-BERSATU",
      "country": "MY",
      "shortName": "BERSATU",
      "name": "Parti Pribumi Bersatu Malaysia",
      "nameEn": "Malaysian United Indigenous Party",
      "logo": "party-logos/my/bersatu.svg",
      "sha256": "ac74b2bd6df2190acef35e84ecd1e0423c00f2429f56b5d975ed1da6df3bdb0d",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Parti_Pribumi_Bersatu_Malaysia_Logo.svg",
      "licenceNote": "Non-free party logo hosted locally on English Wikipedia and used there under a fair-use style rationale to identify the party in its own infobox; used here to identify the party, not to imply endorsement.",
      "ideology": [
        "Ketuanan Melayu",
        "Social conservatism",
        "Islamism (faction)"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 2016,
      "leader": "Muhyiddin Yassin",
      "leaderTitle": "President",
      "inPower": false,
      "timeInPower": "Opposition since 2022; in the Pakatan Harapan government 2018–2020 and the Perikatan Nasional government 2020–2022. As of August 2026 its continued membership of Perikatan Nasional is publicly disputed between BERSATU and PAS leaders",
      "seats": 19,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "sources": [
        {
          "title": "Malaysian United Indigenous Party",
          "url": "https://en.wikipedia.org/wiki/Malaysian_United_Indigenous_Party"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        }
      ]
    },
    {
      "id": "MY-MUDA",
      "country": "MY",
      "shortName": "MUDA",
      "name": "Ikatan Demokratik Malaysia",
      "nameEn": "Malaysian United Democratic Alliance",
      "logo": "party-logos/my/muda.svg",
      "sha256": "95e5703963357a863e9a971941d83f7ed817e92f7275dba409341d6056e42073",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Malaysian_United_Democratic_Alliance_logo_(2024).svg",
      "ideology": [
        "Social democracy",
        "Populism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 2020,
      "leader": "Amira Aisya Abdul Aziz",
      "leaderTitle": "President",
      "inPower": false,
      "timeInPower": "Not currently in national government; supported Warisan Plus (2020–2021) and was in electoral pact with, and briefly part of, the Pakatan Harapan-led Unity Government (2022–2023)",
      "seats": 1,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "logoMeaning": {
        "description": "MUDA's logo is a deliberately simple wordmark set in Helvetica Bold, kept minimal so that members of the public could easily recreate it themselves.",
        "sources": [
          {
            "title": "What do the symbols on Malaysian political party logos mean?",
            "url": "https://cilisos.my/what-do-malaysian-political-party-flags-mean/"
          }
        ]
      },
      "sources": [
        {
          "title": "Malaysian United Democratic Alliance",
          "url": "https://en.wikipedia.org/wiki/Malaysian_United_Democratic_Alliance"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        }
      ]
    }
  ],
  US: [
    {
      "id": "US-DEM",
      "country": "US",
      "shortName": "Democrats",
      "name": "Democratic Party",
      "logo": "party-logos/us/dem.svg",
      "sha256": "adc44cd1733b002c1bc4b7883bdbfa0e32812ee9a9f7a1dcdcb89f8c229538a5",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:US_Democratic_Party_Logo.svg",
      "ideology": [
        "Liberalism (US)",
        "Progressivism (US)"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Center to center-left",
      "founded": 1828,
      "leader": "Hakeem Jeffries",
      "leaderTitle": "House Minority Leader",
      "inPower": false,
      "seats": 214,
      "seatsTotal": 435,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Democratic Party (United States) - Wikipedia (infobox: ideology, political position, founded, chair)",
          "url": "https://en.wikipedia.org/wiki/Democratic_Party_(United_States)"
        },
        {
          "title": "United States House of Representatives - Wikipedia (infobox political groups: seat counts by party, as of Sept 2, 2026)",
          "url": "https://en.wikipedia.org/wiki/United_States_House_of_Representatives"
        },
        {
          "title": "List of current members of the United States House of Representatives - Wikipedia (composition table)",
          "url": "https://en.wikipedia.org/wiki/List_of_current_members_of_the_United_States_House_of_Representatives"
        },
        {
          "title": "US_Democratic_Party_Logo.svg - Wikimedia Commons (PD-textlogo)",
          "url": "https://commons.wikimedia.org/wiki/File:US_Democratic_Party_Logo.svg"
        }
      ]
    },
    {
      "id": "US-REP",
      "country": "US",
      "shortName": "Republicans",
      "name": "Republican Party",
      "logo": "party-logos/us/rep.svg",
      "sha256": "d8242a695ee0c5a081c973ae71aa47c75c1efdf831c6a8ce93299640eeeac5ee",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:GOP_logo_(positive).svg",
      "ideology": [
        "Right-wing populism",
        "American neo-nationalism",
        "Conservatism (US)",
        "Christian right",
        "Right-libertarianism (US)"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing to far-right",
      "founded": 1854,
      "leader": "Mike Johnson",
      "leaderTitle": "Speaker of the House",
      "inPower": true,
      "timeInPower": "2025–present",
      "seats": 218,
      "seatsTotal": 435,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Republican Party (United States) - Wikipedia (infobox: ideology, political position, founded, chair)",
          "url": "https://en.wikipedia.org/wiki/Republican_Party_(United_States)"
        },
        {
          "title": "United States House of Representatives - Wikipedia (infobox political groups: seat counts by party, as of Sept 2, 2026)",
          "url": "https://en.wikipedia.org/wiki/United_States_House_of_Representatives"
        },
        {
          "title": "List of current members of the United States House of Representatives - Wikipedia (composition table)",
          "url": "https://en.wikipedia.org/wiki/List_of_current_members_of_the_United_States_House_of_Representatives"
        },
        {
          "title": "GOP_logo_(positive).svg - Wikimedia Commons (public domain)",
          "url": "https://commons.wikimedia.org/wiki/File:GOP_logo_(positive).svg"
        }
      ]
    }
  ]
};
