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
  },
  "DE-CDUCSUSPD": {
    "id": "DE-CDUCSUSPD",
    "name": "Koalition aus CDU, CSU und SPD",
    "nameEn": "CDU/CSU–SPD coalition (\"grand coalition\")",
    "kind": "coalition",
    "memberPartyIds": [
      "DE-CDU",
      "DE-CSU",
      "DE-SPD"
    ],
    "source": {
      "title": "Merz cabinet – Wikipedia (coalition agreement signed 5 May 2025 between CDU, CSU and SPD; Friedrich Merz elected Chancellor 6 May 2025)",
      "url": "https://en.wikipedia.org/wiki/Merz_cabinet"
    },
    "note": "This id represents ONLY the 2025 governing coalition cabinet (CDU+CSU+SPD under Chancellor Friedrich Merz). It is NOT used to represent the CDU/CSU's separate, permanent sister-party Fraktion pact, which the two parties maintain regardless of who is in government."
  },
  "ldp-jip-2025": {
    "id": "ldp-jip-2025",
    "name": "Liberal Democratic Party–Japan Innovation Party coalition",
    "kind": "coalition",
    "memberPartyIds": [
      "JP-LDP",
      "JP-ISHIN"
    ],
    "source": {
      "title": "Liberal Democratic Party (Japan) - Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Liberal_Democratic_Party_(Japan)"
    },
    "note": "Confidence-and-supply / coalition arrangement between the LDP and the Japan Innovation Party (JIP), agreed 20 October 2025 after the collapse of the 26-year LDP–Komeito coalition (Komeito withdrew over disagreements with incoming LDP leader Sanae Takaichi). The arrangement continued after, and was reinforced by, the LDP-JIP landslide in the 8 February 2026 general election; Takaichi was reconfirmed as Prime Minister 18 February 2026 with a two-thirds supermajority."
  },
  "NZ-COALITION": {
    "id": "NZ-COALITION",
    "name": "Sixth National Government of New Zealand",
    "kind": "coalition",
    "memberPartyIds": [
      "NZ-NAT",
      "NZ-ACT",
      "NZ-NZF"
    ],
    "source": {
      "title": "Sixth National Government of New Zealand – Wikipedia (infobox: political parties National, ACT, New Zealand First; date formed 27 November 2023)",
      "url": "https://en.wikipedia.org/wiki/Sixth_National_Government_of_New_Zealand"
    },
    "note": "Coalition agreement announced 24 November 2023; Christopher Luxon (National) sworn in as Prime Minister 27 November 2023, governing with ACT and New Zealand First under the 2023 coalition agreements."
  },
  "id-koalisi-indonesia-maju": {
    "id": "id-koalisi-indonesia-maju",
    "name": "Koalisi Indonesia Maju Plus",
    "nameEn": "Advanced Indonesia Coalition Plus",
    "kind": "coalition",
    "memberPartyIds": [
      "ID-GERINDRA",
      "ID-GOLKAR",
      "ID-PAN",
      "ID-DEMOKRAT",
      "ID-PKB",
      "ID-NASDEM",
      "ID-PKS"
    ],
    "source": {
      "title": "Advanced Indonesia Coalition - Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Advanced_Indonesia_Coalition"
    },
    "note": "Formed by Gerindra, Golkar, PAN, Demokrat and others to back Prabowo Subianto's 2024 presidential bid and government; expanded as 'KIM Plus' from August 2024 to also include PKB, NasDem, PKS and the non-parliamentary PPP. PDI-P is the only DPR party that remains outside the coalition, in opposition."
  },
  "it-centre-right": {
    "id": "it-centre-right",
    "name": "Coalizione di centrodestra",
    "nameEn": "Centre-right coalition",
    "kind": "coalition",
    "memberPartyIds": [
      "IT-FDI",
      "IT-LEGA",
      "IT-FI",
      "IT-NM"
    ],
    "source": {
      "title": "Centre-right coalition (Italy) - Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Centre-right_coalition_(Italy)"
    },
    "note": "Governing coalition since the 2022 general election, backing the Meloni cabinet; Giorgia Meloni (FdI) has served as Prime Minister since 22 October 2022."
  },
  "ar-fuerza-cambio": {
    "id": "ar-fuerza-cambio",
    "name": "Fuerza del Cambio",
    "nameEn": "Force of Change",
    "kind": "coalition",
    "memberPartyIds": [
      "AR-PRO",
      "AR-UCR",
      "AR-MID",
      "AR-SANTACRUZ",
      "AR-ABSAS"
    ],
    "source": {
      "title": "PRO, UCR, MID y otras fuerzas lanzaron un nuevo interbloque de 22 diputados nacionales - La Nueva",
      "url": "https://www.lanueva.com/puntaalta/nota/2025-12-16-18-41-0-el-pro-la-ucr-el-mid-y-otras-fuerzas-lanzaron-un-nuevo-interbloque-de-22-diputados-nacionales"
    },
    "note": "This is a procedural 'interbloque' (inter-bloc alliance) formed in the Chamber of Deputies on 16 December 2025, initially known as the revived 'Juntos por el Cambio' mini-interbloque before being formalised as 'Fuerza del Cambio'. It groups several already-distinct parliamentary blocs (PRO, UCR, MID, Por Santa Cruz, Adelante Buenos Aires) for procedural purposes (speaking time, committee seats) without merging their separate identities or ideologies — each retains its own bloc and vote."
  },
  "fr-ensemble": {
    "id": "fr-ensemble",
    "name": "Ensemble",
    "nameEn": "Together",
    "kind": "coalition",
    "memberPartyIds": [
      "FR-EPR",
      "FR-MODEM",
      "FR-HOR"
    ],
    "source": {
      "title": "Ensemble (French political alliance) - Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Ensemble_(French_political_alliance)"
    },
    "note": "Presidential-majority electoral and parliamentary alliance of Renaissance, MoDem and Horizons, used for the 2022 and 2024 legislative elections and continuing as the governing bloc; Les Républicains (FR-LR) also participates in the current Lecornu government (inPower) but is not a member of the Ensemble alliance itself."
  },
  "fr-nfp": {
    "id": "fr-nfp",
    "name": "Nouveau Front Populaire",
    "nameEn": "New Popular Front",
    "kind": "coalition",
    "memberPartyIds": [
      "FR-LFI",
      "FR-PS",
      "FR-EELV",
      "FR-GDR"
    ],
    "source": {
      "title": "New Popular Front - Wikipedia",
      "url": "https://en.wikipedia.org/wiki/New_Popular_Front"
    },
    "note": "Left-wing electoral alliance formed for the June–July 2024 snap legislative election, comprising La France Insoumise, the Socialist Party, the Ecologists/Greens and the Communist-led GDR grouping."
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
  "US": [
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
  ],
  "GB": [
    {
      "id": "GB-LAB",
      "country": "GB",
      "shortName": "Labour",
      "name": "Labour Party",
      "logo": "party-logos/gb/labour.svg",
      "sha256": "ab47261debf135f500f108b76abab8167ec0955265be57f5e51b0c4fc0f940ac",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/c/c1/Labour_Party_%28UK%29_logo.svg",
      "licenceNote": "Non-free logo hosted locally on English Wikipedia under fair use (File:Labour Party (UK) logo.svg), used to identify the party per Wikipedia's non-free-content policy; not freely licensed for reuse.",
      "ideology": [
        "Social democracy",
        "Democratic socialism",
        "Trade unionism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1900,
      "previousNames": [
        {
          "name": "Labour Representation Committee",
          "years": "1900–1906"
        }
      ],
      "leader": "Andy Burnham",
      "leaderTitle": "Leader of the Labour Party and Prime Minister",
      "inPower": true,
      "timeInPower": "5 July 2024 – present (Keir Starmer 2024–2026; Andy Burnham from 20 July 2026)",
      "seats": 403,
      "seatsTotal": 650,
      "chamberName": "House of Commons",
      "sources": [
        {
          "title": "Labour Party (UK) — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Labour_Party_(UK)"
        },
        {
          "title": "Premiership of Andy Burnham — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Premiership_of_Andy_Burnham"
        },
        {
          "title": "Template:UK House of Commons composition — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Template:UK_House_of_Commons_composition"
        }
      ]
    },
    {
      "id": "GB-CON",
      "country": "GB",
      "shortName": "Conservative",
      "name": "Conservative and Unionist Party",
      "logo": "party-logos/gb/con.svg",
      "sha256": "5972cfc94f63f04e9bff0ae071b4e4dc0557cb2b5c0eba8c24000161a102a6ca",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/a/a0/Conservatives_logo.svg",
      "licenceNote": "Non-free logo hosted locally on English Wikipedia (not Commons) under fair use, used there to identify the Conservative Party; used here to identify the party, not to imply endorsement.",
      "ideology": [
        "Conservatism",
        "British unionism",
        "Economic liberalism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right to right-wing",
      "founded": 1834,
      "leader": "Kemi Badenoch",
      "leaderTitle": "Leader of the Conservative Party",
      "inPower": false,
      "seats": 118,
      "seatsTotal": 650,
      "chamberName": "House of Commons",
      "sources": [
        {
          "title": "Conservative Party (UK) — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Conservative_Party_(UK)"
        },
        {
          "title": "Template:UK House of Commons composition — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Template:UK_House_of_Commons_composition"
        }
      ]
    },
    {
      "id": "GB-LD",
      "country": "GB",
      "shortName": "Liberal Democrats",
      "name": "Liberal Democrats",
      "logo": "party-logos/gb/ld.svg",
      "sha256": "37cdd6730265ba43ac86e23507b50822962b8ba3466862fb565f5996b00e5ef4",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/6/62/Liberal_Democrats_logo.svg",
      "licenceNote": "Non-free logo hosted locally on English Wikipedia under fair use (File:Liberal Democrats logo.svg), used to identify the party per Wikipedia's non-free-content policy; not freely licensed for reuse.",
      "ideology": [
        "Liberalism",
        "Social liberalism",
        "Pro-Europeanism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre to centre-left",
      "founded": 1988,
      "leader": "Ed Davey",
      "leaderTitle": "Leader of the Liberal Democrats",
      "inPower": false,
      "seats": 71,
      "seatsTotal": 650,
      "chamberName": "House of Commons",
      "sources": [
        {
          "title": "Liberal Democrats (UK) — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Liberal_Democrats_(UK)"
        },
        {
          "title": "Template:UK House of Commons composition — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Template:UK_House_of_Commons_composition"
        }
      ]
    },
    {
      "id": "GB-SNP",
      "country": "GB",
      "shortName": "SNP",
      "name": "Scottish National Party",
      "logo": "party-logos/gb/snp.svg",
      "sha256": "84fc0ee714fb0a8bc7e83ca9c931d2bbeef67d1fe657adef1d7dbf82f355eef4",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/0/0f/Scottish_National_Party_logo_2016.svg",
      "licenceNote": "Non-free logo hosted locally on English Wikipedia (not Commons) under fair use, used there to identify the Scottish National Party; used here to identify the party, not to imply endorsement.",
      "ideology": [
        "Scottish nationalism",
        "Scottish independence",
        "Social democracy"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1934,
      "leader": "John Swinney",
      "leaderTitle": "Leader of the Scottish National Party (Westminster leader: Dave Doogan, since 12 May 2026)",
      "inPower": false,
      "seats": 8,
      "seatsTotal": 650,
      "chamberName": "House of Commons",
      "sources": [
        {
          "title": "Scottish National Party — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Scottish_National_Party"
        },
        {
          "title": "Dave Doogan — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Dave_Doogan"
        },
        {
          "title": "Template:UK House of Commons composition — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Template:UK_House_of_Commons_composition"
        }
      ]
    },
    {
      "id": "GB-REFORM",
      "country": "GB",
      "shortName": "Reform UK",
      "name": "Reform UK",
      "logo": "party-logos/gb/reform.svg",
      "sha256": "9fddd4ecb2c92e208221f9f1c787a3d146fdfb0718a0855daeaca28903c3d5d1",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/commons/0/06/Logo_of_the_Reform_UK.svg",
      "ideology": [
        "Right-wing populism",
        "Hard Euroscepticism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing to far-right",
      "founded": 2018,
      "previousNames": [
        {
          "name": "The Brexit Party",
          "years": "2018–2021"
        }
      ],
      "leader": "Nigel Farage",
      "leaderTitle": "Leader of Reform UK",
      "inPower": false,
      "seats": 8,
      "seatsTotal": 650,
      "chamberName": "House of Commons",
      "sources": [
        {
          "title": "Reform UK — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Reform_UK"
        },
        {
          "title": "Template:UK House of Commons composition — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Template:UK_House_of_Commons_composition"
        }
      ]
    },
    {
      "id": "GB-SF",
      "country": "GB",
      "shortName": "Sinn Féin",
      "name": "Sinn Féin",
      "nameEn": "We Ourselves",
      "logo": "party-logos/gb/sf.svg",
      "sha256": "bd37b761a63b5f990ffd82a4937edf05e60ac2a44acef333460763b59c2c9dce",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/4/46/Logo_of_the_Sinn_F%C3%A9in.svg",
      "licenceNote": "Non-free logo hosted locally on English Wikipedia under fair use (File:Logo of the Sinn Féin.svg), used to identify the party per Wikipedia's non-free-content policy; not freely licensed for reuse.",
      "ideology": [
        "Irish republicanism",
        "Democratic socialism",
        "Left-wing nationalism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left to left-wing",
      "founded": 1905,
      "leader": "Mary Lou McDonald",
      "leaderTitle": "President of Sinn Féin",
      "inPower": false,
      "seats": 7,
      "seatsTotal": 650,
      "chamberName": "House of Commons",
      "sources": [
        {
          "title": "Sinn Féin — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Sinn_F%C3%A9in"
        },
        {
          "title": "Template:UK House of Commons composition — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Template:UK_House_of_Commons_composition"
        }
      ]
    },
    {
      "id": "GB-DUP",
      "country": "GB",
      "shortName": "DUP",
      "name": "Democratic Unionist Party",
      "logo": "party-logos/gb/dup.svg",
      "sha256": "91d300a38cabc865d4c3c759331c8d556459baff1c3941aa6e90b481f6e19a06",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/f/f2/Democratic_Unionist_Party_logo.svg",
      "licenceNote": "Non-free logo hosted locally on English Wikipedia under fair use (File:Democratic Unionist Party logo.svg), used to identify the party per Wikipedia's non-free-content policy; not freely licensed for reuse.",
      "ideology": [
        "British unionism",
        "British nationalism",
        "Ulster loyalism",
        "National conservatism",
        "Social conservatism",
        "Right-wing populism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 1971,
      "leader": "Gavin Robinson",
      "leaderTitle": "Leader of the Democratic Unionist Party",
      "inPower": false,
      "seats": 5,
      "seatsTotal": 650,
      "chamberName": "House of Commons",
      "sources": [
        {
          "title": "Democratic Unionist Party — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Democratic_Unionist_Party"
        },
        {
          "title": "Template:UK House of Commons composition — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Template:UK_House_of_Commons_composition"
        }
      ]
    },
    {
      "id": "GB-GREEN",
      "country": "GB",
      "shortName": "Green Party",
      "name": "Green Party of England and Wales",
      "logo": "party-logos/gb/green.svg",
      "sha256": "13383962c2a4140996a29ffc204d03e287de09fa5f8de3051a6fd1bb6b2760b4",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/a/ab/Green_Party_of_England_and_Wales_logo.svg",
      "licenceNote": "Non-free logo hosted locally on English Wikipedia under fair use (File:Green Party of England and Wales logo.svg), used to identify the party per Wikipedia's non-free-content policy; not freely licensed for reuse.",
      "ideology": [
        "Green politics",
        "Progressivism",
        "Anti-capitalism (faction)",
        "Eco-socialism (faction)"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing",
      "founded": 1990,
      "previousNames": [
        {
          "name": "PEOPLE Party",
          "years": "1972–1975"
        },
        {
          "name": "Ecology Party",
          "years": "1975–1985"
        },
        {
          "name": "Green Party (UK-wide)",
          "years": "1985–1990"
        }
      ],
      "leader": "Zack Polanski",
      "leaderTitle": "Leader of the Green Party of England and Wales (sole leader since 2 September 2025)",
      "inPower": false,
      "seats": 5,
      "seatsTotal": 650,
      "chamberName": "House of Commons",
      "sources": [
        {
          "title": "Green Party of England and Wales — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Green_Party_of_England_and_Wales"
        },
        {
          "title": "Template:UK House of Commons composition — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Template:UK_House_of_Commons_composition"
        }
      ]
    },
    {
      "id": "GB-PC",
      "country": "GB",
      "shortName": "Plaid Cymru",
      "name": "Plaid Cymru",
      "nameEn": "Party of Wales",
      "logo": "party-logos/gb/pc.svg",
      "sha256": "630729c2e83fe5c8f799d600cbc1bbb13d5ac5354f69eb812e9ed5dc8c01c0ce",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/9/99/Plaid_Cymru_logo.svg",
      "licenceNote": "Non-free logo hosted locally on English Wikipedia under fair use (File:Plaid Cymru logo.svg), used to identify the party per Wikipedia's non-free-content policy; not freely licensed for reuse.",
      "ideology": [
        "Welsh nationalism",
        "Welsh independence",
        "Social democracy"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left to left-wing",
      "founded": 1925,
      "leader": "Rhun ap Iorwerth",
      "leaderTitle": "Leader of Plaid Cymru",
      "inPower": false,
      "seats": 4,
      "seatsTotal": 650,
      "chamberName": "House of Commons",
      "sources": [
        {
          "title": "Plaid Cymru — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Plaid_Cymru"
        },
        {
          "title": "Template:UK House of Commons composition — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Template:UK_House_of_Commons_composition"
        }
      ]
    },
    {
      "id": "GB-SDLP",
      "country": "GB",
      "shortName": "SDLP",
      "name": "Social Democratic and Labour Party",
      "logo": "party-logos/gb/sdlp.svg",
      "sha256": "e6b3cbb541f65cb4ea91f2ad2904701e9a156f3c9ea0013569597a8398eb4bb1",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e0/SDLP_Logo_2025.svg",
      "ideology": [
        "Social democracy",
        "Irish reunification",
        "Irish nationalism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1970,
      "leader": "Claire Hanna",
      "leaderTitle": "Leader of the Social Democratic and Labour Party",
      "inPower": false,
      "seats": 2,
      "seatsTotal": 650,
      "chamberName": "House of Commons",
      "sources": [
        {
          "title": "Social Democratic and Labour Party — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Social_Democratic_and_Labour_Party"
        },
        {
          "title": "Template:UK House of Commons composition — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Template:UK_House_of_Commons_composition"
        }
      ]
    },
    {
      "id": "GB-YOURPARTY",
      "country": "GB",
      "shortName": "Your Party",
      "name": "Your Party",
      "logo": "party-logos/gb/yourparty.svg",
      "sha256": "25614b3ca0e29050a316e3f5672678254673fa8212194e26e1d81bf823c69fb0",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/commons/d/dd/Your_Party_logo.svg",
      "ideology": [
        "Socialism"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing",
      "founded": 2025,
      "leader": "Jeremy Corbyn",
      "leaderTitle": "Parliamentary Leader of Your Party (party uses collective leadership via a Central Executive Committee; no single overall leader)",
      "inPower": false,
      "seats": 2,
      "seatsTotal": 650,
      "chamberName": "House of Commons",
      "sources": [
        {
          "title": "Your Party (UK) — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Your_Party_(UK)"
        },
        {
          "title": "Template:UK House of Commons composition — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Template:UK_House_of_Commons_composition"
        }
      ]
    },
    {
      "id": "GB-APNI",
      "country": "GB",
      "shortName": "Alliance",
      "name": "Alliance Party of Northern Ireland",
      "logo": "party-logos/gb/apni.svg",
      "sha256": "a9471c3df4bee10b009fcd939a8f94c3ac968f90c7ff1852370470d8f3a33d30",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/commons/b/be/Alliance_Party_of_Northern_Ireland_logo.svg",
      "ideology": [
        "Liberalism",
        "Social liberalism",
        "Nonsectarianism",
        "Pro-Europeanism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre to centre-left",
      "founded": 1970,
      "leader": "Naomi Long",
      "leaderTitle": "Leader of the Alliance Party of Northern Ireland",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 650,
      "chamberName": "House of Commons",
      "sources": [
        {
          "title": "Alliance Party of Northern Ireland — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Alliance_Party_of_Northern_Ireland"
        },
        {
          "title": "Template:UK House of Commons composition — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Template:UK_House_of_Commons_composition"
        }
      ]
    },
    {
      "id": "GB-UUP",
      "country": "GB",
      "shortName": "UUP",
      "name": "Ulster Unionist Party",
      "logo": "party-logos/gb/uup.svg",
      "sha256": "b0e28301a7f304ea5d5569ac50304ab3b4ac494300a6441ca17e8dbd63013c85",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/5/5e/Ulster_Unionist_Party_logo_%282017%29.svg",
      "licenceNote": "Non-free logo hosted locally on English Wikipedia under fair use (File:Ulster Unionist Party logo (2017).svg), used to identify the party per Wikipedia's non-free-content policy; not freely licensed for reuse.",
      "ideology": [
        "British unionism",
        "Conservatism",
        "Social liberalism (minor faction)"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1905,
      "leader": "Jon Burrows",
      "leaderTitle": "Leader of the Ulster Unionist Party (since 31 January 2026)",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 650,
      "chamberName": "House of Commons",
      "sources": [
        {
          "title": "Ulster Unionist Party — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Ulster_Unionist_Party"
        },
        {
          "title": "Template:UK House of Commons composition — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Template:UK_House_of_Commons_composition"
        }
      ]
    },
    {
      "id": "GB-TUV",
      "country": "GB",
      "shortName": "TUV",
      "name": "Traditional Unionist Voice",
      "logo": "party-logos/gb/tuv.svg",
      "sha256": "e1464f9fab020208be30f1ebd0c030c3d90850ff59cac685c9ace822a556360e",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Logo_of_the_Traditional_Unionist_Voice.svg",
      "ideology": [
        "British unionism",
        "National conservatism",
        "Social conservatism",
        "Anti-Good Friday Agreement",
        "Hard Euroscepticism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 2007,
      "leader": "Jim Allister",
      "leaderTitle": "Leader of Traditional Unionist Voice",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 650,
      "chamberName": "House of Commons",
      "sources": [
        {
          "title": "Traditional Unionist Voice — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Traditional_Unionist_Voice"
        },
        {
          "title": "Template:UK House of Commons composition — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Template:UK_House_of_Commons_composition"
        }
      ]
    },
    {
      "id": "GB-RESTORE",
      "country": "GB",
      "shortName": "Restore Britain",
      "name": "Restore Britain",
      "logo": "party-logos/gb/restore.svg",
      "sha256": "09e599aba3100ab927dba572064a7479e2683dda28097c558ce9db87dcef3642",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/3/32/Restore_Britain_logo.svg",
      "licenceNote": "Non-free logo hosted locally on English Wikipedia under fair use (File:Restore Britain logo.svg), used to identify the party per Wikipedia's non-free-content policy; not freely licensed for reuse.",
      "ideology": [
        "Ethnic nationalism",
        "Far-right politics"
      ],
      "ideologyPosition": "far-right",
      "positionRaw": "Far-right",
      "founded": 2026,
      "leader": "Rupert Lowe",
      "leaderTitle": "Leader of Restore Britain",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 650,
      "chamberName": "House of Commons",
      "sources": [
        {
          "title": "Restore Britain — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Restore_Britain"
        },
        {
          "title": "Template:UK House of Commons composition — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Template:UK_House_of_Commons_composition"
        }
      ]
    }
  ],
  "DE": [
    {
      "id": "DE-CDU",
      "country": "DE",
      "shortName": "CDU",
      "name": "Christlich Demokratische Union Deutschlands",
      "nameEn": "Christian Democratic Union of Germany",
      "logo": "party-logos/de/cdu.svg",
      "sha256": "91571409a6b3d6013c79b2ff1307309878c30d9c279f434446139eaee76d9c55",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:CDU_Logo_2023.svg",
      "ideology": [
        "Christian democracy",
        "Conservatism (German)"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1945,
      "coalitionId": "DE-CDUCSUSPD",
      "leader": "Friedrich Merz",
      "leaderTitle": "Federal Chairman",
      "inPower": true,
      "timeInPower": "6 May 2025–present (leads the Merz cabinet, in coalition with the CSU and SPD)",
      "seats": 164,
      "seatsTotal": 630,
      "chamberName": "Bundestag",
      "sources": [
        {
          "title": "Christian Democratic Union of Germany – Wikipedia (infobox: founded 26 June 1945, ideology, political position, leader Friedrich Merz)",
          "url": "https://en.wikipedia.org/wiki/Christian_Democratic_Union_of_Germany"
        },
        {
          "title": "2025 German federal election – Wikipedia (CDU/CSU 208 combined seats; CDU 164 of those)",
          "url": "https://en.wikipedia.org/wiki/2025_German_federal_election"
        },
        {
          "title": "21st Bundestag – Wikipedia (current composition: CDU 164, CSU 44, CDU/CSU 208 total)",
          "url": "https://en.wikipedia.org/wiki/21st_Bundestag"
        },
        {
          "title": "Merz cabinet – Wikipedia (Friedrich Merz elected Chancellor 6 May 2025, heading a CDU/CSU–SPD coalition)",
          "url": "https://en.wikipedia.org/wiki/Merz_cabinet"
        }
      ]
    },
    {
      "id": "DE-CSU",
      "country": "DE",
      "shortName": "CSU",
      "name": "Christlich-Soziale Union in Bayern",
      "nameEn": "Christian Social Union in Bavaria",
      "logo": "party-logos/de/csu.svg",
      "sha256": "6e76ac151cfdd746785391468589583ef8ee233aff6db6533f06c856c97ca1c5",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:CSU_Logo_since_2016.svg",
      "ideology": [
        "Christian democracy",
        "Conservatism (German)",
        "Regionalism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1945,
      "coalitionId": "DE-CDUCSUSPD",
      "leader": "Markus Söder",
      "leaderTitle": "Party Chairman",
      "inPower": true,
      "timeInPower": "6 May 2025–present (junior partner, with the CDU, in the Merz cabinet, in coalition with the SPD)",
      "seats": 44,
      "seatsTotal": 630,
      "chamberName": "Bundestag",
      "sources": [
        {
          "title": "Christian Social Union in Bavaria – Wikipedia (infobox: founded 13 October 1945, ideology, political position, leader Markus Söder)",
          "url": "https://en.wikipedia.org/wiki/Christian_Social_Union_in_Bavaria"
        },
        {
          "title": "2025 German federal election – Wikipedia (CDU/CSU 208 combined seats; CSU 44 of those)",
          "url": "https://en.wikipedia.org/wiki/2025_German_federal_election"
        },
        {
          "title": "21st Bundestag – Wikipedia (current composition: CDU 164, CSU 44, CDU/CSU 208 total)",
          "url": "https://en.wikipedia.org/wiki/21st_Bundestag"
        },
        {
          "title": "Merz cabinet – Wikipedia (CDU/CSU–SPD coalition formed 6 May 2025)",
          "url": "https://en.wikipedia.org/wiki/Merz_cabinet"
        }
      ]
    },
    {
      "id": "DE-SPD",
      "country": "DE",
      "shortName": "SPD",
      "name": "Sozialdemokratische Partei Deutschlands",
      "nameEn": "Social Democratic Party of Germany",
      "logo": "party-logos/de/spd.svg",
      "sha256": "7bd74a096f0522f8629d45d8b59eaf1d23ce90f61479ca3950b524edbcaa8d8b",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:SPD-Logo_2022_(rot).svg",
      "ideology": [
        "Social democracy"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1875,
      "previousNames": [
        {
          "name": "Sozialistische Arbeiterpartei Deutschlands",
          "nameEn": "Socialist Workers' Party of Germany",
          "years": "1875–1890"
        }
      ],
      "coalitionId": "DE-CDUCSUSPD",
      "leader": "Bärbel Bas and Lars Klingbeil",
      "leaderTitle": "Co-leaders",
      "inPower": true,
      "timeInPower": "6 May 2025–present (junior coalition partner in the Merz cabinet)",
      "seats": 120,
      "seatsTotal": 630,
      "chamberName": "Bundestag",
      "sources": [
        {
          "title": "Social Democratic Party of Germany – Wikipedia (infobox: founded 1875 as SAPD, renamed SPD 1890; ideology, political position, co-leaders Bärbel Bas and Lars Klingbeil)",
          "url": "https://en.wikipedia.org/wiki/Social_Democratic_Party_of_Germany"
        },
        {
          "title": "2025 German federal election – Wikipedia (SPD 120 seats, 16.4%)",
          "url": "https://en.wikipedia.org/wiki/2025_German_federal_election"
        },
        {
          "title": "21st Bundestag – Wikipedia (current composition: SPD 120)",
          "url": "https://en.wikipedia.org/wiki/21st_Bundestag"
        },
        {
          "title": "Merz cabinet – Wikipedia (SPD joined the governing coalition 6 May 2025)",
          "url": "https://en.wikipedia.org/wiki/Merz_cabinet"
        }
      ]
    },
    {
      "id": "DE-AFD",
      "country": "DE",
      "shortName": "AfD",
      "name": "Alternative für Deutschland",
      "nameEn": "Alternative for Germany",
      "logo": "party-logos/de/afd.svg",
      "sha256": "5f262a1faae387b5ed171cb4e1ed14e18db61fe2004821f5e508f2ed40fef6f6",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:AfD_Logo_2021.svg",
      "ideology": [
        "Right-wing populism",
        "National conservatism",
        "Euroscepticism",
        "Völkisch nationalism (faction)"
      ],
      "ideologyPosition": "far-right",
      "positionRaw": "Far-right",
      "founded": 2013,
      "leader": "Tino Chrupalla and Alice Weidel",
      "leaderTitle": "Co-leaders",
      "inPower": false,
      "seats": 152,
      "seatsTotal": 630,
      "chamberName": "Bundestag",
      "sources": [
        {
          "title": "Alternative for Germany – Wikipedia (infobox: founded 6 February 2013, ideology, political position, co-leaders Tino Chrupalla and Alice Weidel)",
          "url": "https://en.wikipedia.org/wiki/Alternative_for_Germany"
        },
        {
          "title": "2025 German federal election – Wikipedia (AfD 152 seats, 20.8%, largest opposition party)",
          "url": "https://en.wikipedia.org/wiki/2025_German_federal_election"
        },
        {
          "title": "21st Bundestag – Wikipedia (current AfD Fraktion 150, down 2 from the 152 won at the election after two members left the party/Fraktion in mid-2025 following the BfV's, since temporarily suspended, extremism classification; those 2 seats are now held by non-attached members, not reassigned to another party)",
          "url": "https://en.wikipedia.org/wiki/21st_Bundestag"
        }
      ]
    },
    {
      "id": "DE-GRUENE",
      "country": "DE",
      "shortName": "Greens",
      "name": "Bündnis 90/Die Grünen",
      "nameEn": "Alliance 90/The Greens",
      "logo": "party-logos/de/gruene.svg",
      "sha256": "b0877cdfb209b42075e6674ea1727e19100b8a6f62bf5635dd9d93e3bd089662",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Bündnis_90_-_Die_Grünen_Logo.svg",
      "ideology": [
        "Green politics",
        "Social liberalism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1993,
      "leader": "Felix Banaszak and Franziska Brantner",
      "leaderTitle": "Co-leaders",
      "inPower": false,
      "seats": 85,
      "seatsTotal": 630,
      "chamberName": "Bundestag",
      "sources": [
        {
          "title": "Alliance 90/The Greens – Wikipedia (infobox: founded 1993 by the merger of Die Grünen, founded 1980 in West Germany, and Bündnis 90, founded 1990 in East Germany; ideology, political position, co-leaders Felix Banaszak and Franziska Brantner as of Nov 2024)",
          "url": "https://en.wikipedia.org/wiki/Alliance_90/The_Greens"
        },
        {
          "title": "2025 German federal election – Wikipedia (Greens 85 seats, 11.6%)",
          "url": "https://en.wikipedia.org/wiki/2025_German_federal_election"
        },
        {
          "title": "21st Bundestag – Wikipedia (current composition: Alliance 90/The Greens 85, in opposition)",
          "url": "https://en.wikipedia.org/wiki/21st_Bundestag"
        }
      ]
    },
    {
      "id": "DE-LINKE",
      "country": "DE",
      "shortName": "Linke",
      "name": "Die Linke",
      "nameEn": "The Left",
      "logo": "party-logos/de/linke.svg",
      "sha256": "641255b63abca5e7d9a23fc22dab1e9e2975d317d8eca74d2de6c5651c0b52f9",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_Die_Linke_(2023).svg",
      "ideology": [
        "Democratic socialism"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing",
      "founded": 2007,
      "leader": "Ines Schwerdtner and Luigi Pantisano",
      "leaderTitle": "Chairpersons",
      "inPower": false,
      "seats": 64,
      "seatsTotal": 630,
      "chamberName": "Bundestag",
      "sources": [
        {
          "title": "The Left (Germany) – Wikipedia (infobox: founded 16 June 2007 by the merger of the Party of Democratic Socialism, PDS, and Labour and Social Justice – The Electoral Alternative, WASG; ideology, political position, chairpersons Ines Schwerdtner and Luigi Pantisano since June 2026)",
          "url": "https://en.wikipedia.org/wiki/The_Left_(Germany)"
        },
        {
          "title": "2025 German federal election – Wikipedia (Die Linke 64 seats, 8.8%)",
          "url": "https://en.wikipedia.org/wiki/2025_German_federal_election"
        },
        {
          "title": "21st Bundestag – Wikipedia (current composition: The Left 64, in opposition, though a junior coalition partner in the Bremen and Mecklenburg-Vorpommern state governments)",
          "url": "https://en.wikipedia.org/wiki/21st_Bundestag"
        }
      ]
    },
    {
      "id": "DE-SSW",
      "country": "DE",
      "shortName": "SSW",
      "name": "Südschleswigscher Wählerverband",
      "nameEn": "South Schleswig Voters' Association",
      "logo": "party-logos/de/ssw.svg",
      "sha256": "42d83d16ecd1ff89b5cd412d80e9eb5b53dce2fbf37b186cec3b61b130504238",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Südschleswigscher_Wählerverband,_Logo.svg",
      "ideology": [
        "Regionalism",
        "Danish minority interests",
        "Frisian minority interests",
        "Social liberalism"
      ],
      "ideologyPosition": "other",
      "positionRaw": "Declines to identify itself with a scale of left–right politics; models its policies on the Nordic welfare-state model",
      "founded": 1948,
      "leader": "Christian Dirschauer",
      "leaderTitle": "Chairman",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 630,
      "chamberName": "Bundestag",
      "sources": [
        {
          "title": "South Schleswig Voters' Association – Wikipedia (infobox: founded 30 June 1948, ideology, chairman Christian Dirschauer; party representing the Danish and Frisian minorities, exempt from the federal 5% electoral threshold as a national-minority party)",
          "url": "https://en.wikipedia.org/wiki/South_Schleswig_Voters%27_Association"
        },
        {
          "title": "2025 German federal election – Wikipedia (SSW retained its 1 seat with 76,138 votes / 0.15% nationally, exempt from the 5% threshold as a national-minority party)",
          "url": "https://en.wikipedia.org/wiki/2025_German_federal_election"
        },
        {
          "title": "21st Bundestag – Wikipedia (SSW holds 1 of the 630 seats; too small to form its own Fraktion, so its member sits among the chamber's non-attached members)",
          "url": "https://en.wikipedia.org/wiki/21st_Bundestag"
        }
      ]
    }
  ],
  "JP": [
    {
      "id": "JP-LDP",
      "country": "JP",
      "shortName": "LDP",
      "name": "自由民主党",
      "nameEn": "Liberal Democratic Party",
      "logo": "party-logos/jp/ldp.svg",
      "sha256": "afdf688f9ab96e80cf22ca9115ee602e8d5766ea9ab24d52faa4579a9233580b",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Liberal_Democratic_Party_of_Japan_logo.svg",
      "ideology": [
        "Conservatism (Japanese)",
        "Japanese nationalism",
        "Big-tent"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Centre-right to far-right (functions as a big-tent conservative party)",
      "founded": 1955,
      "coalitionId": "ldp-jip-2025",
      "leader": "Sanae Takaichi",
      "leaderTitle": "President",
      "inPower": true,
      "timeInPower": "2012-12-26–present (continuously the senior governing party since the Second Abe Cabinet; Sanae Takaichi became party President 4 October 2025 and Prime Minister 21 October 2025)",
      "seats": 316,
      "seatsTotal": 465,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Liberal Democratic Party (Japan) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Liberal_Democratic_Party_(Japan)"
        },
        {
          "title": "2026 Japanese general election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2026_Japanese_general_election"
        },
        {
          "title": "House of Representatives (Japan) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Japan)"
        }
      ]
    },
    {
      "id": "JP-CRA",
      "country": "JP",
      "shortName": "CRA",
      "name": "中道改革連合",
      "nameEn": "Centrist Reform Alliance",
      "logo": "party-logos/jp/cra.svg",
      "sha256": "1141392cc5cb12b0cdcd6d234f54167647f00e455b5c675f875e6db0ab55d7c4",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Centrist_Reform_Alliance_Logo.svg",
      "ideology": [
        "Centrism",
        "Liberalism",
        "Constitutionalism",
        "Citizens-first (生活者ファースト)"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre to centre-left",
      "founded": 2026,
      "leader": "Junya Ogawa",
      "leaderTitle": "Representative",
      "inPower": false,
      "seats": 49,
      "seatsTotal": 465,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Centrist Reform Alliance - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Centrist_Reform_Alliance"
        },
        {
          "title": "中道改革連合 - Wikipedia (ja)",
          "url": "https://ja.wikipedia.org/wiki/%E4%B8%AD%E9%81%93%E6%94%B9%E9%9D%A9%E9%80%A3%E5%90%88"
        },
        {
          "title": "Komeito - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Komeito"
        },
        {
          "title": "After collapse of merger talks, centrist parties seek unity without unification - The Japan Times (2026-09-01)",
          "url": "https://www.japantimes.co.jp/news/2026/09/01/japan/politics/cra-merger-collapse/"
        }
      ]
    },
    {
      "id": "JP-ISHIN",
      "country": "JP",
      "shortName": "Ishin",
      "name": "日本維新の会",
      "nameEn": "Japan Innovation Party",
      "logo": "party-logos/jp/ishin.svg",
      "sha256": "01ce451cadd917e090ca1e1105da2c32fa54b47e3a117b1ae5b2ffe83009d9f2",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Japan_Innovation_Party.svg",
      "ideology": [
        "Libertarian conservatism",
        "Neoliberalism",
        "Economic liberalism",
        "Right-wing populism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Centre-right to right-wing",
      "founded": 2015,
      "coalitionId": "ldp-jip-2025",
      "leader": "Hirofumi Yoshimura",
      "leaderTitle": "Leader",
      "inPower": true,
      "timeInPower": "2025-10-20–present (confidence-and-supply/coalition partner of the LDP)",
      "seats": 36,
      "seatsTotal": 465,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Japan Innovation Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Japan_Innovation_Party"
        },
        {
          "title": "2026 Japanese general election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2026_Japanese_general_election"
        }
      ]
    },
    {
      "id": "JP-DPFP",
      "country": "JP",
      "shortName": "DPFP",
      "name": "国民民主党",
      "nameEn": "Democratic Party For the People",
      "logo": "party-logos/jp/dpfp.svg",
      "sha256": "335a32fd9bfda1025189fcd23bd417a2c1931cbc1f3c83c555ba3674b766c2e6",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_of_Democratic_Party_For_the_People.svg",
      "ideology": [
        "Conservatism",
        "Populism",
        "Expansionary fiscal policy"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre to centre-right",
      "founded": 2020,
      "leader": "Yuichiro Tamaki",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 28,
      "seatsTotal": 465,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Democratic Party For the People - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Democratic_Party_For_the_People"
        },
        {
          "title": "2026 Japanese general election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2026_Japanese_general_election"
        }
      ]
    },
    {
      "id": "JP-SANSEITO",
      "country": "JP",
      "shortName": "Sanseito",
      "name": "参政党",
      "nameEn": "Sanseitō (\"Party of Do It Yourself\")",
      "logo": "party-logos/jp/sanseito.svg",
      "sha256": "40e0eefe5f37e4661c698a9aa6aed3efd9bba9d762d5e2b0dda2aba80be868fc",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Sanseito_Logo_(2025).svg",
      "ideology": [
        "Japanese nationalism",
        "Ultraconservatism",
        "Right-wing populism",
        "Anti-immigration"
      ],
      "ideologyPosition": "far-right",
      "positionRaw": "Far-right",
      "founded": 2020,
      "leader": "Sohei Kamiya",
      "leaderTitle": "Representative (also concurrently Secretary-General)",
      "inPower": false,
      "seats": 15,
      "seatsTotal": 465,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Sanseitō - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Sanseit%C5%8D"
        },
        {
          "title": "2026 Japanese general election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2026_Japanese_general_election"
        }
      ]
    },
    {
      "id": "JP-TEAMMIRAI",
      "country": "JP",
      "shortName": "Team Mirai",
      "name": "チームみらい",
      "nameEn": "Team Mirai (\"Team Future\")",
      "logo": "party-logos/jp/team-mirai.svg",
      "sha256": "5b2c840d572dcf47389b8c6765bda37c32cdd4baa139096b6ab4892e4dcf374f",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Team_Mirai_logo.svg",
      "ideology": [
        "E-democracy",
        "Plurality",
        "Technocracy",
        "Social liberalism",
        "Third Way"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 2025,
      "leader": "Takahiro Anno",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 11,
      "seatsTotal": 465,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Team Mirai - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Team_Mirai"
        },
        {
          "title": "2026 Japanese general election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2026_Japanese_general_election"
        }
      ]
    },
    {
      "id": "JP-JCP",
      "country": "JP",
      "shortName": "JCP",
      "name": "日本共産党",
      "nameEn": "Japanese Communist Party",
      "logo": "party-logos/jp/jcp.svg",
      "sha256": "307ebd5cfe850d4bc0ed004f60822302ff9d485bcb21bfb211c99e8514173cc6",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Nihon_Kyosan-to_logo_2026.svg",
      "ideology": [
        "Communism",
        "Democratic socialism"
      ],
      "ideologyPosition": "far-left",
      "positionRaw": "Left-wing to far-left",
      "founded": 1922,
      "leader": "Tomoko Tamura",
      "leaderTitle": "Chairperson",
      "inPower": false,
      "seats": 4,
      "seatsTotal": 465,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Japanese Communist Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Japanese_Communist_Party"
        },
        {
          "title": "2026 Japanese general election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2026_Japanese_general_election"
        }
      ]
    },
    {
      "id": "JP-INOCHI",
      "country": "JP",
      "shortName": "Party of Life",
      "name": "いのちの党",
      "nameEn": "Party of Life",
      "noImageReason": "The party (as Reiwa Shinsengumi) suffered a near-collapse in the 8 February 2026 election (8 to 1 seat) and founder/leader Taro Yamamoto resigned in July 2026 for health and legal reasons. New leader Jōji Yamamoto, elected 31 July 2026, announced the party's rename to 'いのちの党' (Party of Life) on 6 August 2026, explicitly to refresh the party's image away from its founder. As of the most recent Wikipedia update (the dedicated 'いのちの党 (2026)' article), no new logo has been published yet: the infobox itself states the logo is 'ロゴ製作中' (logo under production) and a press conference to unveil new branding, planned for late August 2026, had not yet resulted in a published logo file. The party's OLD Reiwa Shinsengumi branding is a different, superseded party identity and would misrepresent the current party if shown as its logo.",
      "ideology": [
        "Left-wing populism",
        "Anti-austerity",
        "Expansionary fiscal policy",
        "Nuclear phase-out",
        "Green New Deal"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing populism",
      "founded": 2019,
      "previousNames": [
        {
          "name": "れいわ新選組",
          "nameEn": "Reiwa Shinsengumi",
          "years": "2019-2026"
        }
      ],
      "leader": "Jōji Yamamoto",
      "leaderTitle": "Representative (Co-Representative: Daisuke Amahata)",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 465,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "れいわ新選組 / いのちの党 (2026) - Wikipedia (ja)",
          "url": "https://ja.wikipedia.org/wiki/%E3%82%8C%E3%81%84%E3%82%8F%E6%96%B0%E9%81%B8%E7%B5%84"
        },
        {
          "title": "いのちの党 (2026) - Wikipedia (ja)",
          "url": "https://ja.wikipedia.org/wiki/%E3%81%84%E3%81%AE%E3%81%A1%E3%81%AE%E5%85%9A_(2026)"
        },
        {
          "title": "2026年れいわ新選組代表選挙 - Wikipedia (ja)",
          "url": "https://ja.wikipedia.org/wiki/2026%E5%B9%B4%E3%82%8C%E3%81%84%E3%82%8F%E6%96%B0%E9%81%B8%E7%B5%84%E4%BB%A3%E8%A1%A8%E9%81%B8%E6%8C%99"
        },
        {
          "title": "2026 Japanese general election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2026_Japanese_general_election"
        }
      ]
    },
    {
      "id": "JP-GENZEIYUKOKU",
      "country": "JP",
      "shortName": "Genzei-Yukoku",
      "name": "減税日本・ゆうこく連合",
      "nameEn": "Tax Cuts Japan and Yūkoku Alliance",
      "logo": "party-logos/jp/genzei-yukoku.png",
      "sha256": "4f03872d815f4236154055c058a36f45e2e61c06d7a2911c6b0b46baa64ec42c",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Tax_Cuts_Japan_and_Yukoku_Alliance_Logo.svg",
      "ideology": [
        "Tax reduction",
        "Anti-corruption / government waste oversight",
        "Education expansion"
      ],
      "ideologyPosition": "other",
      "positionRaw": "Mixed / internally disputed: co-representative Kazuhiro Haraguchi favours abolishing the consumption tax and holds that Japan's Self-Defense Forces are constitutional as-is; co-representative Takashi Kawamura favours a flat 5% consumption tax and supports revising Article 9",
      "founded": 2026,
      "leader": "Kazuhiro Haraguchi and Takashi Kawamura",
      "leaderTitle": "Co-Representatives",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 465,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "減税日本・ゆうこく連合 - Wikipedia (ja)",
          "url": "https://ja.wikipedia.org/wiki/%E6%B8%9B%E7%A8%8E%E6%97%A5%E6%9C%AC%E3%83%BB%E3%82%86%E3%81%86%E3%81%93%E3%81%8F%E9%80%A3%E5%90%88"
        },
        {
          "title": "2026 Japanese general election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2026_Japanese_general_election"
        },
        {
          "title": "減税日本・ゆうこく連合、政党要件失う - 時事ドットコム",
          "url": "https://www.jiji.com/jc/article?k=2026020901480&g=pol"
        }
      ]
    }
  ],
  "NZ": [
    {
      "id": "NZ-NAT",
      "country": "NZ",
      "shortName": "National",
      "name": "New Zealand National Party",
      "logo": "party-logos/nz/nat.svg",
      "sha256": "4d05df78de46901a6cbb1ce24965bd3ae48410e315dabc99abaaac9eff7257b4",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:New_Zealand_National_Party_logo_(2017%E2%80%93present).svg",
      "ideology": [
        "Conservatism",
        "Liberalism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1936,
      "coalitionId": "NZ-COALITION",
      "leader": "Christopher Luxon",
      "leaderTitle": "Leader",
      "inPower": true,
      "timeInPower": "2023–present",
      "seats": 48,
      "seatsTotal": 123,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "New Zealand National Party – Wikipedia (infobox: founded 14 May 1936, ideology, position, leader, seats)",
          "url": "https://en.wikipedia.org/wiki/New_Zealand_National_Party"
        },
        {
          "title": "54th New Zealand Parliament – Wikipedia (current seat composition; National reduced to 48 of 123 after Judith Collins' May 2026 resignation)",
          "url": "https://en.wikipedia.org/wiki/54th_New_Zealand_Parliament"
        }
      ]
    },
    {
      "id": "NZ-LAB",
      "country": "NZ",
      "shortName": "Labour",
      "name": "New Zealand Labour Party",
      "logo": "party-logos/nz/lab.svg",
      "sha256": "844122da88962f047b791bead705f1d661a33a03a4096d6cedaa733d1fdee93f",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:New_Zealand_Labour_Party_logo.svg",
      "licenceNote": "Hosted locally on English Wikipedia (not Commons) under a non-free-use rationale (WP:NFCC) as the party's 2020-adopted logo; used here solely to identify the New Zealand Labour Party, not to imply endorsement. Verified 2026-09-05: local file's SHA-1 (27900535d3d0fce36ca1acd92f26203634c9df31) matches the current English-Wikipedia file exactly.",
      "ideology": [
        "Social democracy"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1916,
      "leader": "Chris Hipkins",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 34,
      "seatsTotal": 123,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "New Zealand Labour Party – Wikipedia (infobox: founded 7 July 1916, ideology, position, leader, seats)",
          "url": "https://en.wikipedia.org/wiki/New_Zealand_Labour_Party"
        },
        {
          "title": "54th New Zealand Parliament – Wikipedia (current seat composition: Labour 34 of 123)",
          "url": "https://en.wikipedia.org/wiki/54th_New_Zealand_Parliament"
        }
      ]
    },
    {
      "id": "NZ-GRN",
      "country": "NZ",
      "shortName": "Green",
      "name": "Green Party of Aotearoa New Zealand",
      "logo": "party-logos/nz/grn.svg",
      "sha256": "cdaa24f55ae870fd1c52e63dc21398377889c3e5578c61cda7e1da2ed9b5f0c8",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Green_Party_of_Aotearoa_New_Zealand_logo.svg",
      "ideology": [
        "Green politics",
        "Social democracy",
        "Socialism (faction)"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left to left-wing",
      "founded": 1990,
      "leader": "Marama Davidson & Chlöe Swarbrick",
      "leaderTitle": "Co-leaders",
      "inPower": false,
      "seats": 15,
      "seatsTotal": 123,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Green Party of Aotearoa New Zealand – Wikipedia (infobox: founded 26 May 1990, ideology, position, co-leaders, seats)",
          "url": "https://en.wikipedia.org/wiki/Green_Party_of_Aotearoa_New_Zealand"
        },
        {
          "title": "54th New Zealand Parliament – Wikipedia (current seat composition: Green 15 of 123)",
          "url": "https://en.wikipedia.org/wiki/54th_New_Zealand_Parliament"
        }
      ]
    },
    {
      "id": "NZ-ACT",
      "country": "NZ",
      "shortName": "ACT",
      "name": "ACT New Zealand",
      "logo": "party-logos/nz/act.svg",
      "sha256": "d8b49e16e17efdee540e55580655b5440783c21243fb3adf59f6cff0f95a8e93",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_of_the_ACT_New_Zealand.svg",
      "ideology": [
        "Classical liberalism",
        "Right-libertarianism",
        "Conservatism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 1994,
      "coalitionId": "NZ-COALITION",
      "leader": "David Seymour",
      "leaderTitle": "Leader",
      "inPower": true,
      "timeInPower": "2023–present",
      "seats": 11,
      "seatsTotal": 123,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "ACT New Zealand – Wikipedia (infobox: founded 1994 from the 1993 Association of Consumers and Taxpayers, ideology, position, leader, seats)",
          "url": "https://en.wikipedia.org/wiki/ACT_New_Zealand"
        },
        {
          "title": "54th New Zealand Parliament – Wikipedia (current seat composition: ACT 11 of 123)",
          "url": "https://en.wikipedia.org/wiki/54th_New_Zealand_Parliament"
        }
      ]
    },
    {
      "id": "NZ-NZF",
      "country": "NZ",
      "shortName": "NZ First",
      "name": "New Zealand First",
      "logo": "party-logos/nz/nzf.svg",
      "sha256": "092f05ed240e3aded1f0e709fd753ba51b12922a28b6e3a8702eadedd3d4e48c",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:New_Zealand_First_logo_2026.svg",
      "ideology": [
        "Right-wing populism",
        "Nationalism",
        "Social conservatism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing populist",
      "founded": 1993,
      "coalitionId": "NZ-COALITION",
      "leader": "Winston Peters",
      "leaderTitle": "Leader",
      "inPower": true,
      "timeInPower": "2023–present",
      "seats": 8,
      "seatsTotal": 123,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "New Zealand First – Wikipedia (infobox: founded 18 July 1993, ideology, leader, seats; lead sentence describes it as a right-wing populist party)",
          "url": "https://en.wikipedia.org/wiki/New_Zealand_First"
        },
        {
          "title": "54th New Zealand Parliament – Wikipedia (current seat composition: NZ First 8 of 123)",
          "url": "https://en.wikipedia.org/wiki/54th_New_Zealand_Parliament"
        }
      ]
    },
    {
      "id": "NZ-TPM",
      "country": "NZ",
      "shortName": "Te Pāti Māori",
      "name": "Te Pāti Māori",
      "nameEn": "The Māori Party",
      "logo": "party-logos/nz/tpm.svg",
      "sha256": "4e779122389546c81cc1d7e86ef9763954c9c3fd2ddf994544490d988fdda7a1",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Te_P%C4%81ti_M%C4%81ori_logo.svg",
      "licenceNote": "Hosted locally on English Wikipedia (not Commons) under a non-free-use rationale (WP:NFCC) as the party's current logo; used here solely to identify Te Pāti Māori, not to imply endorsement. Verified 2026-09-05: local file's SHA-1 (132a041dba5ab2d3b21d27085f806b8ae034ba01) matches the current English-Wikipedia file exactly.",
      "ideology": [
        "Māori rights",
        "Tino rangatiratanga",
        "Progressivism"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing",
      "founded": 2004,
      "leader": "Debbie Ngarewa-Packer & Rawiri Waititi",
      "leaderTitle": "Co-leaders",
      "inPower": false,
      "seats": 4,
      "seatsTotal": 123,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Te Pāti Māori – Wikipedia (infobox: founded 7 July 2004, ideology, position, co-leaders, seats — currently 4 of 123 after two MPs, Tākuta Ferris and Mariameno Kapa-Kingi, left the parliamentary party in late 2025/2026)",
          "url": "https://en.wikipedia.org/wiki/Te_P%C4%81ti_M%C4%81ori"
        },
        {
          "title": "54th New Zealand Parliament – Wikipedia (current seat composition table, \"As of November 2025\": Te Pāti Māori 4, Independent 2)",
          "url": "https://en.wikipedia.org/wiki/54th_New_Zealand_Parliament"
        },
        {
          "title": "Mariameno Kapa-Kingi – Wikipedia (departure from the Te Pāti Māori parliamentary caucus, 11 May 2026, to form a new party for the 2026 election)",
          "url": "https://en.wikipedia.org/wiki/Mariameno_Kapa-Kingi"
        }
      ]
    }
  ],
  "ID": [
    {
      "id": "ID-PDIP",
      "country": "ID",
      "shortName": "PDI-P",
      "name": "Partai Demokrasi Indonesia Perjuangan",
      "nameEn": "Indonesian Democratic Party of Struggle",
      "logo": "party-logos/id/pdip.svg",
      "sha256": "f3f761dfa60b9774ff50f70e8cfc2f7f8f280ff8c5bc024fc29577c33ecb189b",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:PDI_Perjuangan.svg",
      "ideology": [
        "Pancasila",
        "Indonesian nationalism",
        "Sukarnoism",
        "Marhaenism",
        "Social democracy",
        "Populism",
        "Progressivism",
        "Secularism",
        "Social liberalism",
        "Economic nationalism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre to centre-left",
      "founded": 1973,
      "previousNames": [
        {
          "name": "Partai Demokrasi Indonesia",
          "nameEn": "Indonesian Democratic Party",
          "years": "1973-1999"
        }
      ],
      "leader": "Megawati Soekarnoputri",
      "leaderTitle": "Ketua Umum",
      "inPower": false,
      "seats": 110,
      "seatsTotal": 580,
      "chamberName": "Dewan Perwakilan Rakyat",
      "sources": [
        {
          "title": "Indonesian Democratic Party of Struggle - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Indonesian_Democratic_Party_of_Struggle"
        },
        {
          "title": "2024 Indonesian legislative election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Indonesian_legislative_election"
        }
      ]
    },
    {
      "id": "ID-GOLKAR",
      "country": "ID",
      "shortName": "Golkar",
      "name": "Partai Golongan Karya",
      "nameEn": "Party of the Functional Groups",
      "logo": "party-logos/id/golkar.png",
      "sha256": "8121fb18393cf961dedce4f81eb4b425e607d10471a503a00ac6b341938d5961",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_Golkar.svg",
      "ideology": [
        "Pancasila",
        "Conservatism",
        "National conservatism",
        "Developmentalism",
        "Pancasila economics",
        "Economic liberalism",
        "Indonesian nationalism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre to centre-right",
      "founded": 1964,
      "previousNames": [
        {
          "name": "Sekretariat Bersama Golongan Karya (Sekber Golkar)",
          "nameEn": "Joint Secretariat of Functional Groups",
          "years": "1964-1971"
        }
      ],
      "coalitionId": "id-koalisi-indonesia-maju",
      "leader": "Bahlil Lahadalia",
      "leaderTitle": "Ketua Umum",
      "inPower": true,
      "timeInPower": "2024-present",
      "seats": 102,
      "seatsTotal": 580,
      "chamberName": "Dewan Perwakilan Rakyat",
      "sources": [
        {
          "title": "Golkar - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Golkar"
        },
        {
          "title": "2024 Indonesian legislative election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Indonesian_legislative_election"
        }
      ]
    },
    {
      "id": "ID-GERINDRA",
      "country": "ID",
      "shortName": "Gerindra",
      "name": "Partai Gerakan Indonesia Raya",
      "nameEn": "Great Indonesia Movement Party",
      "logo": "party-logos/id/gerindra.svg",
      "sha256": "cfd32e248c7f832c6f4af23f2bdf84e10d096e7e975ced034652c62eb005801f",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Partai_Gerakan_Indonesia_Raya_Logo.svg",
      "licenceNote": "Used on English Wikipedia under a non-free-logo fair-use rationale (not hosted on Wikimedia Commons); credited by the uploader to the party's own website, partaigerindra.or.id, as a low-resolution reproduction of the party's official golden-eagle-head emblem for identification purposes.",
      "ideology": [
        "Pancasila",
        "Indonesian nationalism",
        "Anti-communism",
        "National conservatism",
        "Right-wing populism",
        "Protectionism",
        "National liberalism",
        "Pancasila economics",
        "State capitalism",
        "Ultranationalism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing to far-right",
      "founded": 2008,
      "coalitionId": "id-koalisi-indonesia-maju",
      "leader": "Prabowo Subianto",
      "leaderTitle": "Ketua Umum",
      "inPower": true,
      "timeInPower": "2024-present",
      "seats": 86,
      "seatsTotal": 580,
      "chamberName": "Dewan Perwakilan Rakyat",
      "sources": [
        {
          "title": "Gerindra Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Gerindra_Party"
        },
        {
          "title": "2024 Indonesian legislative election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Indonesian_legislative_election"
        }
      ]
    },
    {
      "id": "ID-PKB",
      "country": "ID",
      "shortName": "PKB",
      "name": "Partai Kebangkitan Bangsa",
      "nameEn": "National Awakening Party",
      "logo": "party-logos/id/pkb.png",
      "sha256": "09385eb1b1039061ce9d7a763adf53c4da5512327c4846ea197e660ad142da4b",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_PKB_2024.png",
      "ideology": [
        "Pancasila",
        "Islamic democracy",
        "Pluralism",
        "Liberalism",
        "Indonesian nationalism",
        "Centrism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre; historically centre to centre-left",
      "founded": 1998,
      "coalitionId": "id-koalisi-indonesia-maju",
      "leader": "Muhaimin Iskandar",
      "leaderTitle": "Ketua Umum",
      "inPower": true,
      "timeInPower": "2024-present",
      "seats": 68,
      "seatsTotal": 580,
      "chamberName": "Dewan Perwakilan Rakyat",
      "sources": [
        {
          "title": "National Awakening Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/National_Awakening_Party"
        },
        {
          "title": "2024 Indonesian legislative election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Indonesian_legislative_election"
        }
      ]
    },
    {
      "id": "ID-NASDEM",
      "country": "ID",
      "shortName": "NasDem",
      "name": "Partai NasDem",
      "nameEn": "National Democratic Party",
      "logo": "party-logos/id/nasdem.png",
      "sha256": "de9ca7560ba8f93095e4a7b9146e712504020405bac74dc0e65e560e42280b30",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_Utama_Partai_NasDem.png",
      "ideology": [
        "Pancasila",
        "Indonesian nationalism",
        "Secularism",
        "Social democracy",
        "Social liberalism",
        "Progressivism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 2011,
      "coalitionId": "id-koalisi-indonesia-maju",
      "leader": "Surya Paloh",
      "leaderTitle": "Ketua Umum",
      "inPower": true,
      "seats": 69,
      "seatsTotal": 580,
      "chamberName": "Dewan Perwakilan Rakyat",
      "sources": [
        {
          "title": "NasDem Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/NasDem_Party"
        },
        {
          "title": "Advanced Indonesia Coalition - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Advanced_Indonesia_Coalition"
        },
        {
          "title": "2024 Indonesian legislative election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Indonesian_legislative_election"
        }
      ]
    },
    {
      "id": "ID-PKS",
      "country": "ID",
      "shortName": "PKS",
      "name": "Partai Keadilan Sejahtera",
      "nameEn": "Prosperous Justice Party",
      "logo": "party-logos/id/pks.svg",
      "sha256": "98e09bbcc6029c94b9cba0b1c450fac22c0acf82d2563faa123150059084a789",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:PKS_logo_2020.svg",
      "ideology": [
        "Pancasila (de jure)",
        "Islamism",
        "Islamic fundamentalism",
        "Social conservatism",
        "Islamic nationalism",
        "Islamic economics"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing; centre-right to right-wing in the early Reform era",
      "founded": 1998,
      "previousNames": [
        {
          "name": "Partai Keadilan",
          "nameEn": "Justice Party",
          "years": "1998-2003"
        }
      ],
      "coalitionId": "id-koalisi-indonesia-maju",
      "leader": "Al Muzzammil Yusuf",
      "leaderTitle": "Presiden",
      "inPower": true,
      "seats": 53,
      "seatsTotal": 580,
      "chamberName": "Dewan Perwakilan Rakyat",
      "sources": [
        {
          "title": "Prosperous Justice Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Prosperous_Justice_Party"
        },
        {
          "title": "Profil Al Muzzammil Yusuf, Presiden PKS - Kompas",
          "url": "https://nasional.kompas.com/read/2025/06/04/16302321/profil-al-muzzammil-yusuf-presiden-pks-yang-pernah-jadi-co-capt-timnas-anies"
        },
        {
          "title": "2024 Indonesian legislative election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Indonesian_legislative_election"
        }
      ]
    },
    {
      "id": "ID-PAN",
      "country": "ID",
      "shortName": "PAN",
      "name": "Partai Amanat Nasional",
      "nameEn": "National Mandate Party",
      "logo": "party-logos/id/pan.png",
      "sha256": "77d9ce0e91c990ecd7a13fe74eb6678d9d4deb4434627d51dd3ee58b44efff8f",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_Partai_Amanat_Nasional_2024.png",
      "ideology": [
        "Pancasila",
        "Islamic democracy",
        "Religious nationalism",
        "Religious conservatism (faction)"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre to centre-right, with a right-wing faction",
      "founded": 1998,
      "coalitionId": "id-koalisi-indonesia-maju",
      "leader": "Zulkifli Hasan",
      "leaderTitle": "Ketua Umum",
      "inPower": true,
      "timeInPower": "2024-present",
      "seats": 48,
      "seatsTotal": 580,
      "chamberName": "Dewan Perwakilan Rakyat",
      "sources": [
        {
          "title": "National Mandate Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/National_Mandate_Party"
        },
        {
          "title": "2024 Indonesian legislative election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Indonesian_legislative_election"
        }
      ]
    },
    {
      "id": "ID-DEMOKRAT",
      "country": "ID",
      "shortName": "Demokrat",
      "name": "Partai Demokrat",
      "nameEn": "Democratic Party",
      "logo": "party-logos/id/demokrat.svg",
      "sha256": "f3123603fa1de57283a925c3455a9d5e533897d7449ef26556283a775057feb9",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_of_the_Democratic_Party_(Indonesia).svg",
      "ideology": [
        "Pancasila",
        "Indonesian nationalism",
        "Economic liberalism",
        "Neoliberalism",
        "Pluralism",
        "Secularism",
        "Constitutionalism",
        "Populism",
        "Centrism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Social: Centre; Fiscal: Centre-right",
      "founded": 2001,
      "coalitionId": "id-koalisi-indonesia-maju",
      "leader": "Agus Harimurti Yudhoyono",
      "leaderTitle": "Ketua Umum",
      "inPower": true,
      "timeInPower": "2024-present",
      "seats": 44,
      "seatsTotal": 580,
      "chamberName": "Dewan Perwakilan Rakyat",
      "sources": [
        {
          "title": "Democratic Party (Indonesia) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Democratic_Party_(Indonesia)"
        },
        {
          "title": "2024 Indonesian legislative election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Indonesian_legislative_election"
        }
      ]
    }
  ],
  "IT": [
    {
      "id": "IT-FDI",
      "country": "IT",
      "shortName": "FdI",
      "name": "Fratelli d'Italia",
      "nameEn": "Brothers of Italy",
      "noImageReason": "Wikimedia's media CDN (upload.wikimedia.org) and the Commons API (commons.wikimedia.org/w/api.php) both returned HTTP 429 (rate limited) for this session's shared egress IP; the pre-existing public/party-logos/it/fdi.svg was inspected and found to be a saved Wikimedia 429 error/redirect HTML page, not a real image. Target file: File:Brothers_of_Italy.svg on Wikimedia Commons — retry download and sha1-verify against the MediaWiki API in a future session once egress clears.",
      "ideology": [
        "National conservatism",
        "Right-wing populism",
        "Post-fascism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing to far-right",
      "founded": 2012,
      "coalitionId": "it-centre-right",
      "leader": "Giorgia Meloni",
      "leaderTitle": "President",
      "inPower": true,
      "timeInPower": "2022-present",
      "seats": 118,
      "seatsTotal": 400,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "FdI's logo is the tricolour flame (green-white-red) rising from a stylised base, inherited unchanged from the neo-fascist Italian Social Movement (MSI, founded 1946) and carried through National Alliance to Fratelli d'Italia in 2012. The MSI's founders adopted a flame in the Italian national colours as their party symbol; the flame is widely understood among historians and commentators as evoking the eternal flame said to burn on Mussolini's tomb, and the trapezoid base beneath it has often been read as representing a coffin — making the symbol, for those who recognise the lineage, a form of tribute to the MSI and its founder Giorgio Almirante rather than a neutral national-colours device.",
        "sources": [
          {
            "title": "Fratelli d'Italia's Burning Flame - why the medium is the message for Giorgia Meloni (Engelsberg Ideas)",
            "url": "https://engelsbergideas.com/notebook/fratelli-ditalias-burning-flame-why-the-medium-is-the-message-for-giorgia-meloni/"
          },
          {
            "title": "Fascism's return to Italy? The meaning of the Fratelli d'Italia (International Socialism Journal)",
            "url": "https://isj.org.uk/the-fratelli-ditalia/"
          }
        ],
        "myths": [
          {
            "claim": "The tricolour flame is simply a patriotic emblem in the colours of the Italian flag, with no further significance.",
            "reality": "The flame design and its trapezoid base were carried over unaltered from the MSI's 1946 logo; multiple historians and journalists identify it as a memorial/funerary symbol referencing Mussolini's tomb and as a deliberate marker of ideological continuity with the MSI, not a generic patriotic device."
          }
        ]
      },
      "sources": [
        {
          "title": "Brothers of Italy - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Brothers_of_Italy"
        },
        {
          "title": "Centre-right coalition (Italy) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Centre-right_coalition_(Italy)"
        }
      ]
    },
    {
      "id": "IT-LEGA",
      "country": "IT",
      "shortName": "Lega",
      "name": "Lega per Salvini Premier",
      "nameEn": "League for Salvini Premier",
      "noImageReason": "Wikimedia CDN and Commons API both returned HTTP 429 during this session; the pre-existing public/party-logos/it/lega.svg was inspected and found to be a saved Wikimedia error/redirect HTML page, not a real image. Target file: File:League_-_Salvini_premier.svg on Wikimedia Commons - retry once egress clears.",
      "ideology": [
        "Right-wing populism",
        "Conservatism",
        "Nationalism",
        "Regionalism",
        "Federalism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing to far-right",
      "founded": 1989,
      "previousNames": [
        {
          "name": "Lega Nord",
          "nameEn": "Northern League",
          "years": "1989/1991-2017"
        }
      ],
      "coalitionId": "it-centre-right",
      "leader": "Matteo Salvini",
      "leaderTitle": "Federal Secretary",
      "inPower": true,
      "timeInPower": "2022-present",
      "seats": 57,
      "seatsTotal": 400,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Lega (political party) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Lega_(political_party)"
        },
        {
          "title": "Lega Nord - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Lega_Nord"
        }
      ]
    },
    {
      "id": "IT-FI",
      "country": "IT",
      "shortName": "FI",
      "name": "Forza Italia",
      "nameEn": "Go Italy",
      "noImageReason": "Wikimedia CDN and Commons API both returned HTTP 429 during this session; the pre-existing public/party-logos/it/fi.svg was inspected and found to be a saved Wikimedia 'too many requests' error page (429), not a real image. Target file: File:Logo_Forza_Italia.svg on Wikimedia Commons - retry once egress clears.",
      "ideology": [
        "Liberal conservatism",
        "Christian democracy",
        "Populism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 2013,
      "previousNames": [
        {
          "name": "Forza Italia",
          "nameEn": "Go Italy",
          "years": "1994-2009 (original party, merged into The People of Freedom)"
        }
      ],
      "coalitionId": "it-centre-right",
      "leader": "Antonio Tajani",
      "leaderTitle": "Secretary",
      "inPower": true,
      "timeInPower": "2022-present",
      "seats": 52,
      "seatsTotal": 400,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Forza Italia (2013) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Forza_Italia_(2013)"
        }
      ]
    },
    {
      "id": "IT-NM",
      "country": "IT",
      "shortName": "NM",
      "name": "Noi Moderati",
      "nameEn": "Us Moderates",
      "noImageReason": "Wikimedia CDN and Commons API both returned HTTP 429 during this session; the pre-existing public/party-logos/it/nm.svg was inspected and found to be a saved Wikimedia 'too many requests' error page (429), not a real image. Target file: File:Noi_Moderati_-_logo_(Italy,_2024).svg on Wikimedia Commons - retry once egress clears.",
      "ideology": [
        "Liberal conservatism",
        "Christian democracy"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre to centre-right",
      "founded": 2022,
      "coalitionId": "it-centre-right",
      "leader": "Maurizio Lupi",
      "leaderTitle": "President",
      "inPower": true,
      "timeInPower": "2022-present",
      "seats": 7,
      "seatsTotal": 400,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Us Moderates - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Us_Moderates"
        }
      ]
    },
    {
      "id": "IT-PD",
      "country": "IT",
      "shortName": "PD",
      "name": "Partito Democratico",
      "nameEn": "Democratic Party",
      "noImageReason": "Wikimedia CDN and Commons API both returned HTTP 429 during this session; the pre-existing public/party-logos/it/pd.svg was inspected and found to be a saved Wikimedia error/redirect HTML page, not a real image. Target file: File:Partito_Democratico_Logo.svg on Wikimedia Commons - retry once egress clears.",
      "ideology": [
        "Social democracy"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 2007,
      "leader": "Elly Schlein",
      "leaderTitle": "Secretary",
      "inPower": false,
      "seats": 68,
      "seatsTotal": 400,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Democratic Party (Italy) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Democratic_Party_(Italy)"
        }
      ]
    },
    {
      "id": "IT-M5S",
      "country": "IT",
      "shortName": "M5S",
      "name": "Movimento 5 Stelle",
      "nameEn": "Five Star Movement",
      "noImageReason": "Wikimedia CDN and Commons API both returned HTTP 429 during this session; the pre-existing public/party-logos/it/m5s.svg was inspected and found to be a saved Wikimedia error/redirect HTML page, not a real image. Target file: File:M5S_logo_2050.svg on Wikimedia Commons - retry once egress clears.",
      "ideology": [
        "Populism",
        "Green politics"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing (self-described as post-ideological; formerly catch-all/syncretic)",
      "founded": 2009,
      "leader": "Giuseppe Conte",
      "leaderTitle": "President",
      "inPower": false,
      "seats": 48,
      "seatsTotal": 400,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Five Star Movement - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Five_Star_Movement"
        }
      ]
    },
    {
      "id": "IT-AVS",
      "country": "IT",
      "shortName": "AVS",
      "name": "Alleanza Verdi e Sinistra",
      "nameEn": "Greens and Left Alliance",
      "noImageReason": "Wikimedia CDN and Commons API both returned HTTP 429 during this session; the pre-existing public/party-logos/it/avs.svg was inspected and found to be a saved Wikimedia error/redirect HTML page, not a real image. Target file: File:Logo_of_the_Greens_and_Left_Alliance.svg on Wikimedia Commons - retry once egress clears.",
      "ideology": [
        "Democratic socialism",
        "Green politics"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing",
      "founded": 2022,
      "leader": "Angelo Bonelli / Nicola Fratoianni",
      "leaderTitle": "Co-spokespersons",
      "inPower": false,
      "seats": 10,
      "seatsTotal": 400,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Greens and Left Alliance - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Greens_and_Left_Alliance"
        }
      ]
    },
    {
      "id": "IT-AZIONE",
      "country": "IT",
      "shortName": "Azione",
      "name": "Azione",
      "nameEn": "Action",
      "noImageReason": "Wikimedia CDN and Commons API both returned HTTP 429 during this session; the pre-existing public/party-logos/it/azione.svg was inspected and found to be a saved Wikimedia 'too many requests' error page (429), not a real image. Target file: File:Azione_-_logo_(Italy,_2021-).svg on Wikimedia Commons - retry once egress clears.",
      "ideology": [
        "Liberalism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 2019,
      "leader": "Carlo Calenda",
      "leaderTitle": "Secretary",
      "inPower": false,
      "seats": 10,
      "seatsTotal": 400,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Action (Italian political party) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Action_(Italian_political_party)"
        }
      ]
    },
    {
      "id": "IT-IV",
      "country": "IT",
      "shortName": "IV",
      "name": "Italia Viva",
      "nameEn": "Italy Alive",
      "noImageReason": "Wikimedia CDN and Commons API both returned HTTP 429 during this session; the pre-existing public/party-logos/it/iv.svg was inspected and found to be a saved Wikimedia error/redirect HTML page, not a real image. Target file: File:Logo_of_the_Italia_Viva.svg on Wikimedia Commons - retry once egress clears.",
      "ideology": [
        "Liberalism",
        "Reformism",
        "Pro-Europeanism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre to centre-left",
      "founded": 2019,
      "leader": "Matteo Renzi",
      "leaderTitle": "President",
      "inPower": false,
      "seats": 7,
      "seatsTotal": 400,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Italia Viva - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Italia_Viva"
        }
      ]
    },
    {
      "id": "IT-FN",
      "country": "IT",
      "shortName": "FN",
      "name": "Futuro Nazionale con Roberto Vannacci",
      "nameEn": "National Future with Roberto Vannacci",
      "noImageReason": "Wikimedia CDN and Commons API both returned HTTP 429 during this session; the pre-existing public/party-logos/it/fn.svg was inspected and found to be a saved Wikimedia error/redirect HTML page, not a real image. Target file: File:Futuro_Nazionale_logo.svg on Wikimedia Commons - retry once egress clears.",
      "ideology": [
        "Nationalism",
        "Right-wing populism",
        "National conservatism",
        "Social conservatism",
        "Euroscepticism",
        "Neo-fascism"
      ],
      "ideologyPosition": "far-right",
      "positionRaw": "Far-right",
      "founded": 2026,
      "leader": "Roberto Vannacci",
      "leaderTitle": "President",
      "inPower": false,
      "seats": 8,
      "seatsTotal": 400,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "National Future - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/National_Future"
        }
      ]
    }
  ],
  "AR": [
    {
      "id": "AR-LLA",
      "country": "AR",
      "shortName": "LLA",
      "name": "La Libertad Avanza",
      "nameEn": "Freedom Advances",
      "noImageReason": "Wikimedia Commons/upload.wikimedia.org returned HTTP 429 (rate-limited) to this environment's egress IP during every download attempt made while compiling this dataset; no image bytes could be fetched. A free logo exists at https://commons.wikimedia.org/wiki/File:La_Libertad_Avanza_2021.svg and should be bundled once egress succeeds.",
      "ideology": [
        "Right-libertarianism",
        "Libertarian conservatism",
        "Ultraconservatism",
        "Right-wing populism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing to far-right",
      "founded": 2021,
      "leader": "Gabriel Bornoroni",
      "leaderTitle": "President of the La Libertad Avanza bloc in the Chamber of Deputies",
      "inPower": true,
      "timeInPower": "2023-present",
      "seats": 95,
      "seatsTotal": 257,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "La Libertad Avanza - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/La_Libertad_Avanza"
        },
        {
          "title": "Uno por uno, cómo quedan los bloques de la Cámara de Diputados y cuántos legisladores tendrán - Infobae",
          "url": "https://www.infobae.com/politica/2025/12/03/uno-por-uno-como-quedan-los-bloques-de-la-camara-de-diputados-y-cuantos-legisladores-tendran/"
        },
        {
          "title": "Quién es Gabriel Bornoroni, el nuevo jefe del bloque de Diputados de La Libertad Avanza - Página/12",
          "url": "https://www.pagina12.com.ar/728224-quien-es-gabriel-bornoroni-el-nuevo-jefe-del-bloque-de-diput/"
        },
        {
          "title": "Radiografía de los bloques en Diputados: cómo quedaron y quiénes son sus referentes - Ámbito",
          "url": "https://www.ambito.com/politica/radiografia-los-bloques-diputados-como-quedaron-y-quienes-son-sus-referentes-n6220476"
        }
      ]
    },
    {
      "id": "AR-UXP",
      "country": "AR",
      "shortName": "UxP",
      "name": "Unión por la Patria",
      "nameEn": "Union for the Homeland",
      "noImageReason": "Wikimedia Commons/upload.wikimedia.org returned HTTP 429 (rate-limited) to this environment's egress IP during every download attempt; no image bytes could be fetched. A free logo exists at https://commons.wikimedia.org/wiki/File:Logo_Union_por_la_Patria.svg and should be bundled once egress succeeds.",
      "ideology": [
        "Peronism",
        "Kirchnerism",
        "Progressivism",
        "Anti-neoliberalism",
        "Left-wing populism",
        "Left-wing nationalism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left to left-wing",
      "founded": 2023,
      "previousNames": [
        {
          "name": "Frente de Todos",
          "nameEn": "Front for All",
          "years": "2019-2023"
        }
      ],
      "leader": "Germán Martínez",
      "leaderTitle": "President of the Unión por la Patria bloc in the Chamber of Deputies",
      "inPower": false,
      "seats": 93,
      "seatsTotal": 257,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Unión por la Patria - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Uni%C3%B3n_por_la_Patria"
        },
        {
          "title": "Radiografía de los bloques en Diputados: cómo quedaron y quiénes son sus referentes - Ámbito",
          "url": "https://www.ambito.com/politica/radiografia-los-bloques-diputados-como-quedaron-y-quienes-son-sus-referentes-n6220476"
        },
        {
          "title": "Uno por uno, cómo quedan los bloques de la Cámara de Diputados - Infobae",
          "url": "https://www.infobae.com/politica/2025/12/03/uno-por-uno-como-quedan-los-bloques-de-la-camara-de-diputados-y-cuantos-legisladores-tendran/"
        }
      ]
    },
    {
      "id": "AR-PU",
      "country": "AR",
      "shortName": "PU",
      "name": "Provincias Unidas",
      "nameEn": "United Provinces",
      "noImageReason": "Wikimedia Commons/upload.wikimedia.org returned HTTP 429 (rate-limited) during every download attempt; no image bytes could be fetched. A free logo (\"Logo de 'Provincias Unidas'\") exists on Wikimedia Commons and should be bundled once egress succeeds.",
      "ideology": [
        "Federal Peronism",
        "Federalism",
        "Provincial regionalism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre to centre-right",
      "founded": 2025,
      "leader": "Gisela Scaglia",
      "leaderTitle": "President of the Provincias Unidas bloc in the Chamber of Deputies",
      "inPower": false,
      "seats": 18,
      "seatsTotal": 257,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "United Provinces (political coalition) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/United_Provinces_(political_coalition)"
        },
        {
          "title": "Provincias Unidas: se conforma un nuevo bloque de 22 diputados que será la tercera fuerza - Mirador Provincial",
          "url": "https://www.miradorprovincial.com/2025/12/03/provincias-unidas-se-conforma-un-nuevo-bloque-de-22-diputados-que-sera-la-tercera-fuerza/"
        },
        {
          "title": "Diputados: Provincias Unidas tendrá el bloque de gobernadores más grande - LetraP",
          "url": "https://www.letrap.com.ar/politica/diputados-provincias-unidas-tendra-el-bloque-gobernadores-mas-grande-aportes-valdes-y-vidal-n5420571"
        }
      ]
    },
    {
      "id": "AR-PRO",
      "country": "AR",
      "shortName": "PRO",
      "name": "Propuesta Republicana",
      "nameEn": "Republican Proposal",
      "noImageReason": "Wikimedia Commons/upload.wikimedia.org returned HTTP 429 (rate-limited) during every download attempt; no image bytes could be fetched. A free logo exists at https://commons.wikimedia.org/wiki/File:Logo_PRO.svg and should be bundled once egress succeeds.",
      "ideology": [
        "Conservative liberalism",
        "Liberal conservatism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 2005,
      "coalitionId": "ar-fuerza-cambio",
      "leader": "Cristian Ritondo",
      "leaderTitle": "President of the PRO bloc in the Chamber of Deputies",
      "inPower": false,
      "seats": 12,
      "seatsTotal": 257,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Republican Proposal - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Republican_Proposal"
        },
        {
          "title": "Radiografía de los bloques en Diputados - Ámbito",
          "url": "https://www.ambito.com/politica/radiografia-los-bloques-diputados-como-quedaron-y-quienes-son-sus-referentes-n6220476"
        }
      ]
    },
    {
      "id": "AR-INNFED",
      "country": "AR",
      "shortName": "IF",
      "name": "Innovación Federal",
      "nameEn": "Federal Innovation",
      "noImageReason": "This is a provincial parliamentary bloc (deputies from Salta, Misiones, Río Negro, Neuquén, Formosa and San Luis) rather than a registered national party with its own emblem; no distinct, freely-licensed logo could be located.",
      "ideology": [
        "Federalism",
        "Provincial regionalism"
      ],
      "ideologyPosition": "other",
      "positionRaw": "Cross-spectrum provincial/federalist bloc aligned with regional governors; no single left-right classification is documented",
      "founded": 2023,
      "leader": "Alberto Arrúa",
      "leaderTitle": "President of the Innovación Federal bloc in the Chamber of Deputies",
      "inPower": false,
      "seats": 7,
      "seatsTotal": 257,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Innovación Federal - Wikipedia (es)",
          "url": "https://es.wikipedia.org/wiki/Innovaci%C3%B3n_Federal"
        },
        {
          "title": "Innovación Federal: quiénes son y a qué apuestan en el bloque de los renovadores en Diputados - Primera Edición",
          "url": "https://www.primeraedicion.com.ar/nota/100868684/innovacion-federal-quienes-son-y-a-que-apuestan-en-el-bloque-de-los-renovadores-en-diputados/"
        },
        {
          "title": "Radiografía de los bloques en Diputados - Ámbito",
          "url": "https://www.ambito.com/politica/radiografia-los-bloques-diputados-como-quedaron-y-quienes-son-sus-referentes-n6220476"
        }
      ]
    },
    {
      "id": "AR-UCR",
      "country": "AR",
      "shortName": "UCR",
      "name": "Unión Cívica Radical",
      "nameEn": "Radical Civic Union",
      "noImageReason": "Wikimedia Commons/upload.wikimedia.org returned HTTP 429 (rate-limited) during every download attempt; no image bytes could be fetched. A free logo exists at https://commons.wikimedia.org/wiki/File:Ucr_modern_logo.svg and should be bundled once egress succeeds.",
      "ideology": [
        "Social liberalism",
        "Social democracy",
        "Conservative liberalism (faction)"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre; historically centre to centre-left",
      "founded": 1891,
      "coalitionId": "ar-fuerza-cambio",
      "leader": "Pamela Verasay",
      "leaderTitle": "President of the UCR bloc in the Chamber of Deputies",
      "inPower": false,
      "seats": 6,
      "seatsTotal": 257,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Radical Civic Union - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Radical_Civic_Union"
        },
        {
          "title": "Radiografía de los bloques en Diputados - Ámbito",
          "url": "https://www.ambito.com/politica/radiografia-los-bloques-diputados-como-quedaron-y-quienes-son-sus-referentes-n6220476"
        }
      ]
    },
    {
      "id": "AR-FITU",
      "country": "AR",
      "shortName": "FIT-U",
      "name": "Frente de Izquierda y de Trabajadores - Unidad",
      "nameEn": "Left and Workers' Front - Unity",
      "noImageReason": "Wikimedia Commons/upload.wikimedia.org returned HTTP 429 (rate-limited) during every download attempt; no image bytes could be fetched. A free logo exists at https://commons.wikimedia.org/wiki/File:Logo_Frente_de_Izquierda_y_de_Trabajadores-Unidad.svg and should be bundled once egress succeeds.",
      "ideology": [
        "Trotskyism",
        "Communism",
        "Socialism",
        "Anti-capitalism",
        "Anti-imperialism"
      ],
      "ideologyPosition": "far-left",
      "positionRaw": "Far-left",
      "founded": 2011,
      "leader": "Myriam Bregman",
      "leaderTitle": "National Deputy and lead spokesperson (the bloc is led collectively by its four member parties: PO, PTS, IS, MST)",
      "inPower": false,
      "seats": 4,
      "seatsTotal": 257,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Frente de Izquierda y de Trabajadores - Unidad - Wikipedia (es)",
          "url": "https://es.wikipedia.org/wiki/Frente_de_Izquierda_y_de_Trabajadores_-_Unidad"
        },
        {
          "title": "Elecciones 2025: el Frente de Izquierda obtuvo cerca de 4 puntos a nivel nacional y pierde una banca en el Congreso - La Nación",
          "url": "https://www.lanacion.com.ar/politica/el-frente-de-izquierda-obtuvo-cerca-de-4-puntos-a-nivel-nacional-y-pierde-una-banca-en-el-congreso-nid26102025/"
        }
      ]
    },
    {
      "id": "AR-COHERENCIA",
      "country": "AR",
      "shortName": "Coherencia",
      "name": "Coherencia",
      "noImageReason": "Coherencia is a small parliamentary splinter bloc formed by deputies who left La Libertad Avanza in August 2025; it has no registered party emblem distinct from its member deputies' own campaign material, and no freely-licensed logo could be located.",
      "ideology": [
        "Libertarianism",
        "Anti-corruption"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing libertarian; splinter from La Libertad Avanza, positions itself as more independent of the ruling Milei/Karina Milei leadership",
      "founded": 2025,
      "leader": "Marcela Pagano",
      "leaderTitle": "Founding member; the bloc has been reorganised multiple times since August 2025 and Pagano currently holds it as a single-member bloc",
      "inPower": false,
      "seats": 3,
      "seatsTotal": 257,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Se volvió a romper el oficialismo en Diputados: cuatro ex libertarios formarán el bloque \"Coherencia\" - Infobae",
          "url": "https://www.infobae.com/politica/2025/08/20/se-volvio-a-romper-el-oficialismo-en-diputados-cuatro-ex-libertarios-formaran-el-bloque-coherencia/"
        },
        {
          "title": "País Federal se fracturó y Pagano reflotó Coherencia como bloque unipersonal - Parlamentario",
          "url": "https://www.parlamentario.com/2025/12/30/pais-federal-se-fracturo-y-pagano-refloto-coherencia-como-bloque-unipersonal/"
        },
        {
          "title": "Radiografía de los bloques en Diputados - Ámbito",
          "url": "https://www.ambito.com/politica/radiografia-los-bloques-diputados-como-quedaron-y-quienes-son-sus-referentes-n6220476"
        }
      ]
    },
    {
      "id": "AR-INDEP",
      "country": "AR",
      "shortName": "Independencia",
      "name": "Independencia",
      "noImageReason": "Independencia is a three-member provincial (Tucumán) parliamentary bloc, not a registered national party; no distinct, freely-licensed logo could be located.",
      "ideology": [
        "Federal Peronism",
        "Provincial pragmatism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Peronismo federal, described by es.wikipedia as pragmatic and positioned toward the right within Peronism",
      "founded": 2024,
      "leader": "Gladys Medina",
      "leaderTitle": "President of the Independencia bloc in the Chamber of Deputies",
      "inPower": false,
      "seats": 3,
      "seatsTotal": 257,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Independencia (bloque legislativo) - Wikipedia (es)",
          "url": "https://es.wikipedia.org/wiki/Independencia_(bloque_legislativo)"
        },
        {
          "title": "Radiografía de los bloques en Diputados - Ámbito",
          "url": "https://www.ambito.com/politica/radiografia-los-bloques-diputados-como-quedaron-y-quienes-son-sus-referentes-n6220476"
        }
      ]
    },
    {
      "id": "AR-CATAMARCA",
      "country": "AR",
      "shortName": "Elijo Catamarca",
      "name": "Elijo Catamarca",
      "nameEn": "I Choose Catamarca",
      "noImageReason": "Elijo Catamarca is a three-member provincial (Catamarca) parliamentary bloc formed in December 2025, not a registered national party; no distinct, freely-licensed logo could be located.",
      "ideology": [
        "Provincial governismo",
        "Federal Peronism"
      ],
      "ideologyPosition": "other",
      "positionRaw": "Governor-aligned provincial bloc (Raúl Jalil); breakaway from Unión por la Patria signalling openness to cooperating with the Milei government; no left-right classification is documented",
      "founded": 2025,
      "leader": "Sebastián Nóblega",
      "leaderTitle": "President of the Elijo Catamarca bloc in the Chamber of Deputies",
      "inPower": false,
      "seats": 3,
      "seatsTotal": 257,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Jalil pateó el tablero: nace \"Elijo Catamarca\" - BAE Negocios",
          "url": "https://www.baenegocios.com/politica/Jalil-pateo-el-tablero-nace-Elijo-Catamarca-y-el-mapa-de-Diputados-queda-al-borde-del-empate-20251202-0036.html"
        },
        {
          "title": "Tres diputados de Catamarca confirmaron que dejan el bloque de Unión por la Patria - Infobae",
          "url": "https://www.infobae.com/politica/2025/12/02/tres-diputados-de-catamarca-confirmaron-que-dejan-el-bloque-de-union-por-la-patria-y-la-libertad-avanza-se-quedara-con-la-primera-minoria/"
        }
      ]
    },
    {
      "id": "AR-ENCFED",
      "country": "AR",
      "shortName": "Encuentro Federal",
      "name": "Encuentro Federal",
      "nameEn": "Federal Encounter",
      "noImageReason": "Encuentro Federal is a small remnant parliamentary bloc (2 deputies as of December 2025, after most members joined Provincias Unidas) rather than a distinct registered national party; no freely-licensed logo could be located.",
      "ideology": [
        "Peronismo Republicano",
        "Federalism",
        "Institucionalismo"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 2023,
      "previousNames": [
        {
          "name": "Hacemos Coalición Federal",
          "years": "2023-2024"
        },
        {
          "name": "Cambio Federal",
          "years": "2023"
        }
      ],
      "leader": "Miguel Ángel Pichetto",
      "leaderTitle": "Founder of the Encuentro Federal / Peronismo Republicano space",
      "inPower": false,
      "seats": 2,
      "seatsTotal": 257,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Hacemos Coalición Federal - Wikipedia (es)",
          "url": "https://es.wikipedia.org/wiki/Hacemos_Coalici%C3%B3n_Federal"
        },
        {
          "title": "Radiografía de los bloques en Diputados - Ámbito",
          "url": "https://www.ambito.com/politica/radiografia-los-bloques-diputados-como-quedaron-y-quienes-son-sus-referentes-n6220476"
        }
      ]
    },
    {
      "id": "AR-CCARI",
      "country": "AR",
      "shortName": "CC-ARI",
      "name": "Coalición Cívica ARI",
      "nameEn": "Civic Coalition ARI",
      "noImageReason": "Wikimedia Commons/upload.wikimedia.org returned HTTP 429 (rate-limited) during every download attempt; no image bytes could be fetched. A free logo exists at https://commons.wikimedia.org/wiki/File:Coalicion_Civica.svg and should be bundled once egress succeeds.",
      "ideology": [
        "Socioliberalism",
        "Progressivism",
        "Radical centrism",
        "Developmentalism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 2002,
      "leader": "Maximiliano Ferraro",
      "leaderTitle": "President of Coalición Cívica ARI",
      "inPower": false,
      "seats": 2,
      "seatsTotal": 257,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Coalición Cívica ARI - Wikipedia (es)",
          "url": "https://es.wikipedia.org/wiki/Coalici%C3%B3n_C%C3%ADvica_ARI"
        },
        {
          "title": "Radiografía de los bloques en Diputados - Ámbito",
          "url": "https://www.ambito.com/politica/radiografia-los-bloques-diputados-como-quedaron-y-quienes-son-sus-referentes-n6220476"
        }
      ]
    },
    {
      "id": "AR-MID",
      "country": "AR",
      "shortName": "MID",
      "name": "Movimiento de Integración y Desarrollo",
      "nameEn": "Integration and Development Movement",
      "noImageReason": "Wikimedia Commons/upload.wikimedia.org returned HTTP 429 (rate-limited) during every download attempt; no image bytes could be fetched. A free logo (\"Movimiento de Integración y Desarrollo 2018.png\") exists on Wikimedia Commons and should be bundled once egress succeeds.",
      "ideology": [
        "Developmentalism (desarrollismo)"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right, with internal factions ranging from centre to right",
      "founded": 1964,
      "coalitionId": "ar-fuerza-cambio",
      "leader": "Juan Pablo Carrique",
      "leaderTitle": "President of the Movimiento de Integración y Desarrollo",
      "inPower": false,
      "seats": 2,
      "seatsTotal": 257,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Movimiento de Integración y Desarrollo - Wikipedia (es)",
          "url": "https://es.wikipedia.org/wiki/Movimiento_de_Integraci%C3%B3n_y_Desarrollo"
        },
        {
          "title": "Radiografía de los bloques en Diputados - Ámbito",
          "url": "https://www.ambito.com/politica/radiografia-los-bloques-diputados-como-quedaron-y-quienes-son-sus-referentes-n6220476"
        }
      ]
    },
    {
      "id": "AR-PYT",
      "country": "AR",
      "shortName": "PyT",
      "name": "Producción y Trabajo",
      "nameEn": "Production and Labour",
      "noImageReason": "This San Juan provincial party's article and available Commons categories carry no freely-licensed logo file; only non-free/social-media imagery could be located.",
      "ideology": [
        "Regionalism",
        "Conservatism",
        "Republicanism",
        "Federal Peronism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 2005,
      "leader": "Marcelo Orrego",
      "leaderTitle": "Governor of San Juan; current leader of Producción y Trabajo",
      "inPower": false,
      "seats": 2,
      "seatsTotal": 257,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Producción y Trabajo - Wikipedia (es)",
          "url": "https://es.wikipedia.org/wiki/Producci%C3%B3n_y_Trabajo"
        },
        {
          "title": "Radiografía de los bloques en Diputados - Ámbito",
          "url": "https://www.ambito.com/politica/radiografia-los-bloques-diputados-como-quedaron-y-quienes-son-sus-referentes-n6220476"
        }
      ]
    },
    {
      "id": "AR-NEUQ",
      "country": "AR",
      "shortName": "La Neuquinidad",
      "name": "La Neuquinidad",
      "noImageReason": "La Neuquinidad is a provincial (Neuquén) electoral front launched in March 2025 that won a single Chamber seat; no freely-licensed party logo could be located.",
      "ideology": [
        "Provincial regionalism"
      ],
      "ideologyPosition": "other",
      "positionRaw": "Cross-spectrum provincialist front combining sectors of PRO, provincial Peronism and dissident libertarians around Governor Rolando Figueroa; no single left-right classification is documented",
      "founded": 2025,
      "leader": "Rolando Figueroa",
      "leaderTitle": "Governor of Neuquén; founder of La Neuquinidad",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 257,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Neuquén: Rolando Figueroa armó el frente La Neuquinidad y primerea en el año electoral - LetraP",
          "url": "https://www.letrap.com.ar/politica/neuquen-rolando-figueroa-armo-el-frente-la-neuquinidad-y-primerea-el-ano-electoral-n5413581"
        },
        {
          "title": "Radiografía de los bloques en Diputados - Ámbito",
          "url": "https://www.ambito.com/politica/radiografia-los-bloques-diputados-como-quedaron-y-quienes-son-sus-referentes-n6220476"
        }
      ]
    },
    {
      "id": "AR-CBA",
      "country": "AR",
      "shortName": "Defendamos Córdoba",
      "name": "Defendamos Córdoba",
      "nameEn": "Let's Defend Córdoba",
      "noImageReason": "Single-deputy provincial (Córdoba) electoral alliance launched for the 2025 elections; only a non-free campaign wordmark image could be located, no freely-licensed logo.",
      "ideology": [
        "Peronism",
        "Federalism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Peronist and federalist; positions itself as centrist, opposing both the Milei government and Kirchnerismo",
      "founded": 2025,
      "leader": "Natalia de la Sota",
      "leaderTitle": "Founder and sole National Deputy of the Defendamos Córdoba bloc",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 257,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Defendamos Córdoba - Wikipedia (es)",
          "url": "https://es.wikipedia.org/wiki/Defendamos_C%C3%B3rdoba"
        },
        {
          "title": "Radiografía de los bloques en Diputados - Ámbito",
          "url": "https://www.ambito.com/politica/radiografia-los-bloques-diputados-como-quedaron-y-quienes-son-sus-referentes-n6220476"
        }
      ]
    },
    {
      "id": "AR-ABSAS",
      "country": "AR",
      "shortName": "Adelante Buenos Aires",
      "name": "Adelante Buenos Aires",
      "nameEn": "Forward Buenos Aires",
      "noImageReason": "Single-deputy monobloque formed by a deputy who broke from the UCR; no freely-licensed distinct logo could be located.",
      "ideology": [
        "Liberalism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre; formed by a deputy who left the more traditional UCR bloc",
      "founded": 2025,
      "coalitionId": "ar-fuerza-cambio",
      "leader": "Karina Banfi",
      "leaderTitle": "Founder and sole National Deputy of the Adelante Buenos Aires bloc",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 257,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "PRO, UCR, MID y otras fuerzas lanzaron un nuevo interbloque de 22 diputados nacionales - La Nueva",
          "url": "https://www.lanueva.com/puntaalta/nota/2025-12-16-18-41-0-el-pro-la-ucr-el-mid-y-otras-fuerzas-lanzaron-un-nuevo-interbloque-de-22-diputados-nacionales"
        },
        {
          "title": "Radiografía de los bloques en Diputados - Ámbito",
          "url": "https://www.ambito.com/politica/radiografia-los-bloques-diputados-como-quedaron-y-quienes-son-sus-referentes-n6220476"
        }
      ]
    },
    {
      "id": "AR-PJSL",
      "country": "AR",
      "shortName": "PJ San Luis",
      "name": "Partido Justicialista (San Luis)",
      "nameEn": "Justicialist Party (San Luis)",
      "noImageReason": "This entry represents a single National Deputy elected on the San Luis PJ/Frente Justicialista list who sits apart from the main Unión por la Patria bloc; no distinct freely-licensed provincial-branch logo (separate from the national PJ emblem) could be located, and the national PJ emblem would misrepresent this as the national party rather than the provincial bloc.",
      "ideology": [
        "Peronism",
        "Justicialism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Justicialist/Peronist; the San Luis provincial PJ under the Rodríguez Saá family has historically positioned itself as a distinct, more conservative Peronist current",
      "founded": 1945,
      "leader": "Alberto Rodríguez Saá",
      "leaderTitle": "President of the Justicialist Party's San Luis provincial branch",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 257,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Alberto Rodríguez Saá apartó del PJ de San Luis a un intendente que lo desafiaba con una interna - La Nación",
          "url": "https://www.lanacion.com.ar/politica/alberto-rodriguez-saa-aparto-del-pj-de-san-luis-a-un-intendente-que-lo-desafiaba-con-una-interna-nid18082024/"
        },
        {
          "title": "Radiografía de los bloques en Diputados - Ámbito",
          "url": "https://www.ambito.com/politica/radiografia-los-bloques-diputados-como-quedaron-y-quienes-son-sus-referentes-n6220476"
        }
      ]
    },
    {
      "id": "AR-SANTACRUZ",
      "country": "AR",
      "shortName": "Por Santa Cruz",
      "name": "Por Santa Cruz",
      "nameEn": "For Santa Cruz",
      "noImageReason": "Single-deputy provincial (Santa Cruz) electoral front tied to Governor Claudio Vidal; no freely-licensed distinct party logo could be located.",
      "ideology": [
        "Provincial regionalism",
        "Unionism"
      ],
      "ideologyPosition": "other",
      "positionRaw": "Provincial governismo aligned with Governor Claudio Vidal, a former union leader; no single left-right classification is documented",
      "founded": 2023,
      "coalitionId": "ar-fuerza-cambio",
      "leader": "José Luis Garrido",
      "leaderTitle": "National Deputy for the Por Santa Cruz bloc",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 257,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "PRO, UCR, MID y otras fuerzas lanzaron un nuevo interbloque de 22 diputados nacionales - La Nueva",
          "url": "https://www.lanueva.com/puntaalta/nota/2025-12-16-18-41-0-el-pro-la-ucr-el-mid-y-otras-fuerzas-lanzaron-un-nuevo-interbloque-de-22-diputados-nacionales"
        },
        {
          "title": "Radiografía de los bloques en Diputados - Ámbito",
          "url": "https://www.ambito.com/politica/radiografia-los-bloques-diputados-como-quedaron-y-quienes-son-sus-referentes-n6220476"
        }
      ]
    }
  ],
  "FR": [
    {
      "id": "FR-RN",
      "country": "FR",
      "shortName": "RN",
      "name": "Rassemblement National",
      "nameEn": "National Rally",
      "noImageReason": "Wikimedia CDN (upload.wikimedia.org) returned HTTP 429 rate-limit errors on every attempt across ~15 minutes of retries with backoff (immediate, 10s, 30s, 60s, 90s) during this research session, so the logo could not be bundled. Identified file: Commons File:Logo_Rassemblement_National.svg (the tricolour flame emblem), per the current English Wikipedia infobox for National Rally. A future session should retry downloading this exact file.",
      "ideology": [
        "French nationalism",
        "National conservatism",
        "Right-wing populism"
      ],
      "ideologyPosition": "far-right",
      "positionRaw": "Far-right",
      "founded": 1972,
      "previousNames": [
        {
          "name": "Front National",
          "nameEn": "National Front",
          "years": "1972–2018"
        }
      ],
      "leader": "Jordan Bardella",
      "leaderTitle": "President",
      "inPower": false,
      "seats": 122,
      "seatsTotal": 577,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "National Rally - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/National_Rally"
        },
        {
          "title": "National Rally group - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/National_Rally_group"
        }
      ]
    },
    {
      "id": "FR-EPR",
      "country": "FR",
      "shortName": "EPR",
      "name": "Renaissance",
      "nameEn": "Renaissance",
      "noImageReason": "Wikimedia CDN (upload.wikimedia.org) returned HTTP 429 rate-limit errors on every attempt across ~15 minutes of retries with backoff during this research session. Identified file: Commons File:Renaissance_parti_logo.svg (the current official logo, circled 'R'/'E' monogram), per the current English Wikipedia infobox for Renaissance (French political party). A future session should retry downloading this exact file.",
      "ideology": [
        "Liberalism (French)",
        "Social liberalism",
        "Pro-Europeanism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre to centre-right",
      "founded": 2016,
      "previousNames": [
        {
          "name": "En Marche !",
          "nameEn": "Onwards!",
          "years": "2016–2017"
        },
        {
          "name": "La République En Marche",
          "nameEn": "The Republic on the Move",
          "years": "2017–2022"
        }
      ],
      "coalitionId": "fr-ensemble",
      "leader": "Gabriel Attal",
      "leaderTitle": "Secretary General",
      "inPower": true,
      "timeInPower": "2017-present",
      "seats": 90,
      "seatsTotal": 577,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Renaissance (French political party) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Renaissance_(French_political_party)"
        },
        {
          "title": "Ensemble pour la République - Assemblée nationale",
          "url": "https://www.assemblee-nationale.fr/dyn/org/PO845407?cible=composition"
        }
      ]
    },
    {
      "id": "FR-LFI",
      "country": "FR",
      "shortName": "LFI",
      "name": "La France Insoumise",
      "nameEn": "France Unbowed",
      "noImageReason": "Wikimedia CDN (upload.wikimedia.org) returned HTTP 429 rate-limit errors on every attempt across ~15 minutes of retries with backoff during this research session. Identified file: Commons/en-Wikipedia File:LOGO-LFI-2026.png (the current 2026 party logo shown in the English Wikipedia infobox for La France Insoumise; an older File:LFI_Logo_2024.svg also exists on Commons). A future session should retry downloading one of these exact files.",
      "ideology": [
        "Democratic socialism",
        "Anti-neoliberalism",
        "Souverainism",
        "Eco-socialism",
        "Left-wing populism"
      ],
      "ideologyPosition": "far-left",
      "positionRaw": "Left-wing to far-left",
      "founded": 2016,
      "coalitionId": "fr-nfp",
      "leader": "Manuel Bompard",
      "leaderTitle": "Coordinator",
      "inPower": false,
      "seats": 71,
      "seatsTotal": 577,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "La France Insoumise - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/La_France_Insoumise"
        },
        {
          "title": "La France Insoumise group - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/La_France_Insoumise_group"
        }
      ]
    },
    {
      "id": "FR-PS",
      "country": "FR",
      "shortName": "PS",
      "name": "Parti Socialiste",
      "nameEn": "Socialist Party",
      "noImageReason": "Wikimedia CDN (upload.wikimedia.org) returned HTTP 429 rate-limit errors on every attempt across ~15 minutes of retries with backoff during this research session. Identified file: Commons File:Socialist_Party_(France)_2024_logo.svg (the current 'rose au poing' logo), per the current English Wikipedia infobox for Socialist Party (France). A future session should retry downloading this exact file.",
      "ideology": [
        "Social democracy",
        "Pro-Europeanism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left to left-wing",
      "founded": 1969,
      "coalitionId": "fr-nfp",
      "leader": "Olivier Faure",
      "leaderTitle": "First Secretary",
      "inPower": false,
      "seats": 68,
      "seatsTotal": 577,
      "chamberName": "National Assembly",
      "logoMeaning": {
        "description": "The party's emblem, 'le poing et la rose' (the fist and the rose), was adopted in September 1971 at the Épinay congress, created by activist Yann Berriet and illustrator Marc Bonnet. It was explained at the time as: the flourishing (the rose) that only socialism will allow will only be achieved through struggle (the fist raised behind it). Since the 1980s the design has evolved so the rose is more prominent and the fist is fainter, but both elements remain in the current logo.",
        "sources": [
          {
            "title": "Pourquoi le poing et la rose ? - Parti Socialiste",
            "url": "https://www.parti-socialiste.fr/pourquoi_le_poing_et_la_rose"
          },
          {
            "title": "« Le poing et la rose », la saga d'un logo - Vingtième Siècle (Persée)",
            "url": "https://www.persee.fr/doc/xxs_0294-1759_1996_num_49_1_3481"
          }
        ],
        "myths": []
      },
      "sources": [
        {
          "title": "Socialist Party (France) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Socialist_Party_(France)"
        }
      ]
    },
    {
      "id": "FR-LR",
      "country": "FR",
      "shortName": "LR",
      "name": "Les Républicains",
      "nameEn": "The Republicans",
      "noImageReason": "Wikimedia CDN (upload.wikimedia.org) returned HTTP 429 rate-limit errors on every attempt across ~15 minutes of retries with backoff during this research session. Identified file: Commons File:Les_Républicains_-_logo_(France,_2023).svg, per the current English Wikipedia infobox for The Republicans (France). A future session should retry downloading this exact file.",
      "ideology": [
        "Conservatism (French)",
        "Neo-Gaullism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Centre-right to right-wing",
      "founded": 2015,
      "leader": "Bruno Retailleau",
      "leaderTitle": "President",
      "inPower": true,
      "timeInPower": "2025-present",
      "seats": 48,
      "seatsTotal": 577,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "The Republicans (France) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/The_Republicans_(France)"
        },
        {
          "title": "Droite Républicaine - Assemblée nationale",
          "url": "https://www2.assemblee-nationale.fr/17/les-groupes-politiques/droite-republicaine"
        }
      ]
    },
    {
      "id": "FR-EELV",
      "country": "FR",
      "shortName": "LE",
      "name": "Les Écologistes",
      "nameEn": "The Ecologists",
      "noImageReason": "Wikimedia CDN (upload.wikimedia.org) returned HTTP 429 rate-limit errors on every attempt across ~15 minutes of retries with backoff during this research session. Identified file: Commons File:Logo_of_The_Ecologists_(France).svg, per the current English Wikipedia infobox for The Ecologists; an older File:Europe_Ecologie-Les_Verts_Logo.svg also exists on Commons for the pre-2023 name. A future session should retry downloading the current file.",
      "ideology": [
        "Green politics",
        "Alter-globalization"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left to left-wing",
      "founded": 2010,
      "previousNames": [
        {
          "name": "Europe Écologie Les Verts",
          "nameEn": "Europe Ecology – The Greens",
          "years": "2010–2023"
        }
      ],
      "coalitionId": "fr-nfp",
      "leader": "Marine Tondelier",
      "leaderTitle": "National Secretary",
      "inPower": false,
      "seats": 38,
      "seatsTotal": 577,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "The Ecologists - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/The_Ecologists"
        }
      ]
    },
    {
      "id": "FR-MODEM",
      "country": "FR",
      "shortName": "MoDem",
      "name": "Mouvement Démocrate",
      "nameEn": "Democratic Movement",
      "noImageReason": "Wikimedia CDN (upload.wikimedia.org) returned HTTP 429 rate-limit errors on every attempt across ~15 minutes of retries with backoff during this research session. Identified file: Commons File:MoDem_logo_2019.svg, per the current English Wikipedia infobox for Democratic Movement (France). A future session should retry downloading this exact file.",
      "ideology": [
        "Social liberalism",
        "Christian democracy",
        "Pro-Europeanism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 2007,
      "coalitionId": "fr-ensemble",
      "leader": "François Bayrou",
      "leaderTitle": "President",
      "inPower": true,
      "timeInPower": "2017-present",
      "seats": 37,
      "seatsTotal": 577,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Democratic Movement (France) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Democratic_Movement_(France)"
        },
        {
          "title": "The Democrats group - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/The_Democrats_group"
        }
      ]
    },
    {
      "id": "FR-HOR",
      "country": "FR",
      "shortName": "HOR",
      "name": "Horizons",
      "nameEn": "Horizons",
      "noImageReason": "Wikimedia CDN (upload.wikimedia.org) returned HTTP 429 rate-limit errors on every attempt across ~15 minutes of retries with backoff during this research session. Identified file: Commons File:Logo_Parti_Politique_Horizons_-_2021.svg, per the current English Wikipedia infobox for Horizons (political party). A future session should retry downloading this exact file.",
      "ideology": [
        "Liberal conservatism",
        "Pro-Europeanism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 2021,
      "coalitionId": "fr-ensemble",
      "leader": "Édouard Philippe",
      "leaderTitle": "President",
      "inPower": true,
      "timeInPower": "2024-present",
      "seats": 36,
      "seatsTotal": 577,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Horizons (political party) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Horizons_(political_party)"
        },
        {
          "title": "Horizons group (National Assembly) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Horizons_group_(National_Assembly)"
        }
      ]
    },
    {
      "id": "FR-LIOT",
      "country": "FR",
      "shortName": "LIOT",
      "name": "Groupe Libertés, Indépendants, Outre-mer et Territoires",
      "nameEn": "Liberties, Independents, Overseas and Territories group",
      "noImageReason": "Wikimedia CDN (upload.wikimedia.org) returned HTTP 429 rate-limit errors on every attempt across ~15 minutes of retries with backoff during this research session. Identified file: Commons File:LIOT_Group.png. A future session should retry downloading this exact file.",
      "ideology": [
        "Centrism",
        "Regionalism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centrist, independent (mixed cross-party group)",
      "founded": 2018,
      "previousNames": [
        {
          "name": "Groupe Libertés et Territoires",
          "nameEn": "Liberties and Territories group",
          "years": "2018–2022"
        }
      ],
      "leader": "Christophe Naegelen",
      "leaderTitle": "Group President",
      "inPower": false,
      "seats": 23,
      "seatsTotal": 577,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Groupe Libertés, indépendants, outre-mer et territoires - Wikipédia (French)",
          "url": "https://fr.wikipedia.org/wiki/Groupe_Libert%C3%A9s,_ind%C3%A9pendants,_outre-mer_et_territoires"
        },
        {
          "title": "Libertés, Indépendants, Outre-mer et Territoires (LIOT) - Assemblée Nationale | Datan",
          "url": "https://datan.fr/groupes/legislature-17/liot"
        }
      ]
    },
    {
      "id": "FR-GDR",
      "country": "FR",
      "shortName": "GDR",
      "name": "Gauche Démocrate et Républicaine",
      "nameEn": "Democratic and Republican Left",
      "noImageReason": "Wikimedia CDN (upload.wikimedia.org) returned HTTP 429 rate-limit errors on every attempt across ~15 minutes of retries with backoff during this research session. Identified file: Commons File:Logo_GDR.svg. A future session should retry downloading this exact file.",
      "ideology": [
        "Communism",
        "Democratic socialism",
        "Regionalism (overseas territories)"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing to far-left (mixed group led by the French Communist Party)",
      "founded": 1997,
      "coalitionId": "fr-nfp",
      "leader": "Stéphane Peu and Émeline K/Bidi",
      "leaderTitle": "Co-Presidents of the GDR group",
      "inPower": false,
      "seats": 17,
      "seatsTotal": 577,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Democratic and Republican Left group - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Democratic_and_Republican_Left_group"
        },
        {
          "title": "French Communist Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/French_Communist_Party"
        }
      ]
    },
    {
      "id": "FR-UDR",
      "country": "FR",
      "shortName": "UDR",
      "name": "Union des Droites pour la République",
      "nameEn": "Union of the Right for the Republic",
      "noImageReason": "Wikimedia CDN (upload.wikimedia.org) returned HTTP 429 rate-limit errors on every attempt across ~15 minutes of retries with backoff during this research session. Identified file: Commons File:UDR_logo.svg. A future session should retry downloading this exact file.",
      "ideology": [
        "Right-libertarianism",
        "Right-wing populism"
      ],
      "ideologyPosition": "far-right",
      "positionRaw": "Far-right",
      "founded": 2024,
      "leader": "Éric Ciotti",
      "leaderTitle": "President",
      "inPower": false,
      "seats": 17,
      "seatsTotal": 577,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Union of the Right for the Republic - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Union_of_the_Right_for_the_Republic"
        },
        {
          "title": "UDR group - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/UDR_group"
        }
      ]
    }
  ]
};
