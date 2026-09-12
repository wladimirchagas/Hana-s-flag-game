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
  /** Party holds executive office (presidency / ministerial cabinet portfolios). */
  readonly inExecutive?: boolean;
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
  "MY-PH": {
    id: "MY-PH",
    name: "Pakatan Harapan",
    nameEn: "Alliance of Hope",
    kind: "coalition",
    memberPartyIds: ["MY-DAP", "MY-PKR", "MY-AMANAH"],
    source: {
      title: "Pakatan Harapan — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Pakatan_Harapan",
    },
  },
  "MY-BN": {
    id: "MY-BN",
    name: "Barisan Nasional",
    nameEn: "National Front",
    kind: "coalition",
    memberPartyIds: ["MY-UMNO", "MY-MCA", "MY-MIC", "MY-PBRS"],
    source: {
      title: "Barisan Nasional — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Barisan_Nasional",
    },
  },
  "MY-GPS": {
    id: "MY-GPS",
    name: "Gabungan Parti Sarawak",
    nameEn: "Sarawak Parties Alliance",
    kind: "coalition",
    memberPartyIds: ["MY-PBB", "MY-PRS", "MY-PDP", "MY-SUPP"],
    source: {
      title: "Gabungan Parti Sarawak — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Gabungan_Parti_Sarawak",
    },
  },
  "MY-GRS": {
    id: "MY-GRS",
    name: "Gabungan Rakyat Sabah",
    nameEn: "Sabah People's Alliance",
    kind: "coalition",
    memberPartyIds: ["MY-GRS", "MY-UPKO", "MY-PBS"],
    source: {
      title: "Gabungan Rakyat Sabah — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Gabungan_Rakyat_Sabah",
    },
  },
  "MY-PN": {
    id: "MY-PN",
    name: "Perikatan Nasional",
    nameEn: "National Alliance",
    kind: "coalition",
    memberPartyIds: ["MY-PAS", "MY-WAWASAN"],
    source: {
      title: "Perikatan Nasional — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Perikatan_Nasional",
    },
    note: "BERSATU's membership is disputed: Perikatan Nasional lists it as an affiliate marked \"disputed\", and the Dewan Rakyat counts its 19 seats as a bloc of their own rather than inside PN's 49. It is therefore recorded here with no coalition.",
  },
  "TL-CNRT-PD": {
    id: "TL-CNRT-PD",
    name: "Coligação CNRT–PD",
    nameEn: "CNRT–PD Coalition",
    kind: "coalition",
    memberPartyIds: ["TL-CNRT", "TL-PD"],
    source: {
      title: "IX Constitutional Government of East Timor — Wikipedia",
      url: "https://en.wikipedia.org/wiki/IX_Constitutional_Government_of_East_Timor",
    },
  },
  "ID-KIM": {
    id: "ID-KIM",
    name: "Koalisi Indonesia Maju",
    nameEn: "Advanced Indonesia Coalition",
    kind: "coalition",
    memberPartyIds: ["ID-GERINDRA", "ID-GOLKAR", "ID-DEMOKRAT", "ID-PAN"],
    source: {
      title: "Advanced Indonesia Coalition — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Advanced_Indonesia_Coalition",
    },
  },
  "PH-ALYANSA": {
    id: "PH-ALYANSA",
    name: "Alyansa para sa Bagong Pilipinas",
    nameEn: "Alliance for a New Philippines",
    kind: "coalition",
    memberPartyIds: ["PH-PFP", "PH-LAKAS", "PH-NPC", "PH-NUP", "PH-NACIONALISTA"],
    source: {
      title: "Alyansa para sa Bagong Pilipinas — Wikipedia",
      url: "https://en.wikipedia.org/wiki/Alyansa_para_sa_Bagong_Pilipinas",
    },
  },
  "AU-COALITION": {
    id: "AU-COALITION",
    name: "Liberal–National Coalition",
    kind: "coalition",
    memberPartyIds: ["AU-LIB", "AU-NAT", "AU-LNP"],
    source: {
      title:
        "Liberal–National Coalition — Wikipedia (current agreement re-formed 8 February 2026 after the 22 January 2026 dissolution; leaders Angus Taylor and Matt Canavan; 41 of 150 House seats)",
      url: "https://en.wikipedia.org/wiki/Coalition_(Australia)",
    },
    note: "The Coalition agreement lapsed on 22 January 2026 and was re-formed on 8 February 2026; the Queensland LNP sits with both partners' party rooms.",
  },
  "BR-PSOLREDE": {
    id: "BR-PSOLREDE",
    name: "Federação PSOL REDE",
    nameEn: "PSOL REDE Federation",
    kind: "federation",
    memberPartyIds: ["BR-PSOL", "BR-REDE"],
    source: {
      title:
        "PSOL REDE Federation — Wikipedia (federation of PSOL and Rede Sustentabilidade, registered 17 May 2022; the Chamber counts its 16 seats as one bloc)",
      url: "https://en.wikipedia.org/wiki/PSOL_REDE_Federation",
    },
  },
  "BR-RS": {
    id: "BR-RS",
    name: "Federação Renovação Solidária",
    nameEn: "Solidary Renewal Federation",
    kind: "federation",
    memberPartyIds: ["BR-SOLIDARIEDADE", "BR-PRD"],
    source: {
      title:
        "Solidary Renewal Federation — Wikipedia (federation of Solidariedade and PRD, formed 25 June 2025)",
      url: "https://en.wikipedia.org/wiki/Solidary_Renewal_Federation",
    },
  },
  "BR-FE": {
    id: "BR-FE",
    name: "Federação Brasil da Esperança",
    nameEn: "Brazil of Hope",
    kind: "federation",
    memberPartyIds: ["BR-PT", "BR-PCDOB", "BR-PV"],
    source: {
      title:
        "Brazil of Hope — Wikipedia (Federação Brasil da Esperança: PT, PCdoB and PV, registered 2022)",
      url: "https://en.wikipedia.org/wiki/Brazil_of_Hope",
    },
  },
  "BR-UP": {
    id: "BR-UP",
    name: "União Progressista",
    nameEn: "Progressive Union",
    kind: "federation",
    memberPartyIds: ["BR-UNIAO", "BR-PP"],
    source: {
      title:
        "Progressive Union (Brazil) — Wikipedia (União Progressista: União Brasil and Progressistas, formed 29 April 2025)",
      url: "https://en.wikipedia.org/wiki/Progressive_Union_(Brazil)",
    },
  },
  "BR-AF": {
    id: "BR-AF",
    name: "Federação PSDB Cidadania",
    nameEn: "PSDB Cidadania Federation",
    kind: "federation",
    memberPartyIds: ["BR-PSDB", "BR-CIDADANIA"],
    source: {
      title:
        "PSDB Cidadania Federation — Wikipedia (also contesting elections as Federação Sempre pra Frente; programme registered by the Superior Electoral Court 26 May 2022)",
      url: "https://en.wikipedia.org/wiki/Always_Forward_(Brazil)",
    },
    note: "Cidadania voted to end membership in 2026",
  },
  "VE-GPPSB": {
    id: "VE-GPPSB",
    name: "Gran Polo Patriótico Simón Bolívar",
    nameEn: "Great Patriotic Pole Simón Bolívar",
    kind: "coalition",
    memberPartyIds: [
      "VE-PSUV",
      "VE-PPT",
      "VE-MRT",
      "VE-MSV",
      "VE-PODEMOS",
      "VE-APC",
      "VE-MEP",
      "VE-ORA",
      "VE-UPV",
    ],
    source: {
      title: "Gran Polo Patriótico Simón Bolívar — Wikipedia (es): the governing Chavista alliance founded 7 October 2011; holds 253 of the National Assembly's 285 seats",
      url: "https://es.wikipedia.org/wiki/Gran_Polo_Patri%C3%B3tico_Sim%C3%B3n_Bol%C3%ADvar",
    },
    note: "The alliance holds 253 seats; the nine member parties listed here are the ones that hold them. Its wider membership also includes parties with no National Assembly seats.",
  },
  "VE-AD-ALLIANCE": {
    id: "VE-AD-ALLIANCE",
    name: "Alianza Democrática",
    nameEn: "Democratic Alliance",
    kind: "coalition",
    memberPartyIds: [
      "VE-AD",
      "VE-PV",
      "VE-PJ",
      "VE-CMC",
      "VE-CAMBIO",
      "VE-AP",
      "VE-COPEI",
    ],
    source: {
      title: "Alianza Democrática (Venezuela) — Wikipedia (es): the opposition alliance that sits as a nine-member parliamentary group in the VI National Assembly",
      url: "https://es.wikipedia.org/wiki/Alianza_Democr%C3%A1tica_(Venezuela)",
    },
    note: "Acción Democrática, Primero Justicia and Copei sit here through the ad hoc boards imposed by the Supreme Tribunal of Justice, not through the leaderships those parties themselves recognise.",
  },
};




export const POLITICAL_PARTIES: Record<string, readonly PoliticalParty[]> = {
  "BB": [
    {
      "id": "BB-BLP",
      "country": "BB",
      "shortName": "BLP",
      "name": "Barbados Labour Party",
      "logo": "party-logos/bb/blp.svg",
      "sha256": "9b5068b6e86bb5ae3207a3fe1173d8182aeb20ddda2894137ee517afe345f2b9",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Barbados_Labour_Party_logo.svg",
      "ideology": ["Social democracy", "Progressivism"],
      "ideologyPosition": "centre-left",
      "founded": 1938,
      "leader": "Mia Amor Mottley",
      "leaderTitle": "Leader",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2018–present",
      "seats": 30,
      "seatsTotal": 30,
      "chamberName": "House of Assembly",
      "sources": [
        {
          "title": "Barbados Labour Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Barbados_Labour_Party"
        },
        {
          "title": "2022 Barbadian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2022_Barbadian_general_election"
        }
      ]
    },
    {
      "id": "BB-DLP",
      "country": "BB",
      "shortName": "DLP",
      "name": "Democratic Labour Party",
      "logo": "party-logos/bb/dlp.svg",
      "sha256": "36f9a6a04ed50e7bbb3586a63ea2e37b0d1628964be37a893e893ec7683032ef",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Democratic_Labour_Party_Barbados_logo.svg",
      "ideology": ["Conservatism", "Christian democracy"],
      "ideologyPosition": "centre-right",
      "founded": 1955,
      "leader": "Verla De Coteau",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 0,
      "seatsTotal": 30,
      "chamberName": "House of Assembly",
      "sources": [
        {
          "title": "Democratic Labour Party (Barbados) – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Democratic_Labour_Party_(Barbados)"
        },
        {
          "title": "2022 Barbadian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2022_Barbadian_general_election"
        }
      ]
    },
    {
      "id": "BB-SB",
      "country": "BB",
      "shortName": "SB",
      "name": "Solutions Barbados",
      "logo": "party-logos/bb/sb.svg",
      "sha256": "b6e109bd496cf2d254e82f73eb2bf0efa19b27465b7a399d84b7a52002a91a9f",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Solutions_Barbados_logo.svg",
      "ideology": ["Liberalism", "Anti-establishment"],
      "ideologyPosition": "centre-left",
      "founded": 2016,
      "inPower": false,
      "seats": 0,
      "seatsTotal": 30,
      "chamberName": "House of Assembly",
      "sources": [
        {
          "title": "2022 Barbadian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2022_Barbadian_general_election"
        }
      ]
    }
  ],
  "BS": [
    {
      "id": "BS-BDM",
      "country": "BS",
      "shortName": "BDM",
      "name": "Bahamas Democratic Movement",
      "logo": "party-logos/bs/bdm.svg",
      "sha256": "84d8fae0fea6ab0e4e067180c33dd87f0815f5f8ccc6e8d5597d3dc951898f74",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Bahamas_Democratic_Movement_logo.svg",
      "ideology": ["Liberalism", "Nationalism"],
      "ideologyPosition": "centre-right",
      "founded": 2011,
      "inPower": false,
      "seats": 0,
      "seatsTotal": 39,
      "chamberName": "House of Assembly",
      "sources": [
        {
          "title": "2023 Bahamian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Bahamian_general_election"
        }
      ]
    },
    {
      "id": "BS-FNM",
      "country": "BS",
      "shortName": "FNM",
      "name": "Free National Movement",
      "logo": "party-logos/bs/fnm.svg",
      "sha256": "a5846791460e01921d741cdebbdeae326633e6a30951df250854c0c8cd026a43",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Free_National_Movement_Bahamas_logo.svg",
      "ideology": ["Conservatism", "Liberalism"],
      "ideologyPosition": "centre-right",
      "founded": 1972,
      "leader": "Michael Pintard",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 0,
      "seatsTotal": 39,
      "chamberName": "House of Assembly",
      "sources": [
        {
          "title": "Free National Movement – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Free_National_Movement"
        },
        {
          "title": "2023 Bahamian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Bahamian_general_election"
        }
      ]
    },
    {
      "id": "BS-PLP",
      "country": "BS",
      "shortName": "PLP",
      "name": "Progressive Liberal Party",
      "logo": "party-logos/bs/plp.svg",
      "sha256": "9b10e9956b05095d99d106ffb1804d99bff24b489882a1f06804c0ff753681e7",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Progressive_Liberal_Party_Bahamas_logo.svg",
      "ideology": ["Social democracy", "Progressivism"],
      "ideologyPosition": "centre-left",
      "founded": 1953,
      "leader": "Philip Davis",
      "leaderTitle": "Leader",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2021–present",
      "seats": 39,
      "seatsTotal": 39,
      "chamberName": "House of Assembly",
      "sources": [
        {
          "title": "Progressive Liberal Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Progressive_Liberal_Party"
        },
        {
          "title": "2023 Bahamian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Bahamian_general_election"
        }
      ]
    }
  ],
  "BT": [
    {
      "id": "BT-BKP",
      "country": "BT",
      "shortName": "BKP",
      "name": "Bhutan Kuen Nyam Party",
      "logo": "party-logos/bt/bkp.svg",
      "sha256": "af43b961020377bb0656c5a9dd284f4444b77a78728bcb478d5bfddea6fe080f",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Bhutan_Kuen_Nyam_Party_logo.svg",
      "ideology": ["Centrism", "Bhutanese nationalism"],
      "ideologyPosition": "centre",
      "founded": 2013,
      "inPower": false,
      "seats": 17,
      "seatsTotal": 47,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "2023 Bhutanese parliamentary election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Bhutanese_parliamentary_election"
        }
      ]
    },
    {
      "id": "BT-DPT",
      "country": "BT",
      "shortName": "DPT",
      "name": "Druk Phuensum Tshogpa",
      "nameEn": "Bhutan Peace and Prosperity Party",
      "logo": "party-logos/bt/dpt.svg",
      "sha256": "bfd802cb8c853c9fc30b9e56f05f1fc81a2ac40d4e827faafcb2eca5d46e352b",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Druk_Phuensum_Tshogpa_logo.svg",
      "ideology": ["Conservatism", "Buddhist traditionalism"],
      "ideologyPosition": "right",
      "founded": 2007,
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2018–present",
      "seats": 20,
      "seatsTotal": 47,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Druk Phuensum Tshogpa – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Druk_Phuensum_Tshogpa"
        },
        {
          "title": "2023 Bhutanese parliamentary election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Bhutanese_parliamentary_election"
        }
      ]
    },
    {
      "id": "BT-PDP",
      "country": "BT",
      "shortName": "PDP",
      "name": "People's Democratic Party",
      "logo": "party-logos/bt/pdp.svg",
      "sha256": "8f7dd0c5fa6a2d5cbe954036ce695f942922437270feb2a997cb7bbe91d67c65",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:People%27s_Democratic_Party_Bhutan_logo.svg",
      "ideology": ["Socialism", "Progressivism"],
      "ideologyPosition": "left",
      "founded": 2007,
      "inPower": false,
      "seats": 10,
      "seatsTotal": 47,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "People's Democratic Party (Bhutan) – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/People%27s_Democratic_Party_(Bhutan)"
        },
        {
          "title": "2023 Bhutanese parliamentary election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Bhutanese_parliamentary_election"
        }
      ]
    }
  ],
  "BZ": [
    {
      "id": "BZ-PUP",
      "country": "BZ",
      "shortName": "PUP",
      "name": "People's United Party",
      "logo": "party-logos/bz/pup.svg",
      "sha256": "399b60f1cf10b8dc7a877a6569d2e085cb8430ce79137f15edda8877494b984d",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:People%27s_United_Party_Belize_logo.svg",
      "ideology": ["Social democracy", "Progressivism"],
      "ideologyPosition": "centre-left",
      "founded": 1950,
      "leader": "John Briceño",
      "leaderTitle": "Prime Minister",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2020–present",
      "seats": 26,
      "seatsTotal": 31,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "People's United Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/People%27s_United_Party"
        },
        {
          "title": "2020 Belizean general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2020_Belizean_general_election"
        }
      ]
    },
    {
      "id": "BZ-UDP",
      "country": "BZ",
      "shortName": "UDP",
      "name": "United Democratic Party",
      "logo": "party-logos/bz/udp.svg",
      "sha256": "d2ab2aa5d126436b9c3aa561233b134fd3013f2ddb4e0b600565417f285db9c1",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:United_Democratic_Party_Belize_logo.svg",
      "ideology": ["Conservatism", "Liberalism"],
      "ideologyPosition": "centre-right",
      "founded": 1985,
      "inPower": false,
      "seats": 5,
      "seatsTotal": 31,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "United Democratic Party (Belize) – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/United_Democratic_Party_(Belize)"
        },
        {
          "title": "2020 Belizean general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2020_Belizean_general_election"
        }
      ]
    },
    {
      "id": "BZ-VIA",
      "country": "BZ",
      "shortName": "VIA",
      "name": "Vision Inspired by Action",
      "logo": "party-logos/bz/via.svg",
      "sha256": "a16f5a456797bfdd3ae0ac0d56a748f25294ad5763c50015ae5b6c52b343f10e",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Vision_Inspired_by_Action_Belize_logo.svg",
      "ideology": ["Centrism", "Anti-corruption"],
      "ideologyPosition": "centre",
      "founded": 2009,
      "inPower": false,
      "seats": 0,
      "seatsTotal": 31,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "2020 Belizean general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2020_Belizean_general_election"
        }
      ]
    }
  ],
  "DZ": [
    {
      "id": "DZ-FLN",
      "country": "DZ",
      "shortName": "FLN",
      "name": "Front de Libération Nationale",
      "nameEn": "National Liberation Front",
      "logo": "party-logos/dz/fln.svg",
      "sha256": "eddda0b9bb67c6874514823550d3fe9e37fa29f7efc7d05d69950e815a44f2ef",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:FLN_Algeria_logo.svg",
      "ideology": ["Socialism", "Algerian nationalism"],
      "ideologyPosition": "left",
      "founded": 1954,
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "1962–present",
      "seats": 218,
      "seatsTotal": 407,
      "chamberName": "National People's Assembly",
      "sources": [
        {
          "title": "National Liberation Front (Algeria) – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/National_Liberation_Front_(Algeria)"
        },
        {
          "title": "2024 Algerian legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Algerian_legislative_election"
        }
      ]
    },
    {
      "id": "DZ-MSP",
      "country": "DZ",
      "shortName": "MSP",
      "name": "Mouvement de la Société pour la Paix",
      "nameEn": "Movement of Society for Peace",
      "logo": "party-logos/dz/msp.svg",
      "sha256": "b8df1d2deeecead81cc4c941d70540a764919b593610da0ef2fc94928ad0237b",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:MSP_Algeria_logo.svg",
      "ideology": ["Islamic democracy", "Conservatism"],
      "ideologyPosition": "right",
      "founded": 1990,
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2022–present",
      "seats": 105,
      "seatsTotal": 407,
      "chamberName": "National People's Assembly",
      "sources": [
        {
          "title": "Movement of Society for Peace – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Movement_of_Society_for_Peace"
        },
        {
          "title": "2024 Algerian legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Algerian_legislative_election"
        }
      ]
    },
    {
      "id": "DZ-RND",
      "country": "DZ",
      "shortName": "RND",
      "name": "Rassemblement National Démocratique",
      "nameEn": "National Rally for Democracy",
      "logo": "party-logos/dz/rnd.svg",
      "sha256": "28b283c091e7b110aeece4dee4804e2217f844700c1803c8341301779b9605fb",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:RND_Algeria_logo.svg",
      "ideology": ["Liberalism", "Algerian nationalism"],
      "ideologyPosition": "centre-right",
      "founded": 1997,
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2022–present",
      "seats": 84,
      "seatsTotal": 407,
      "chamberName": "National People's Assembly",
      "sources": [
        {
          "title": "National Rally for Democracy – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/National_Rally_for_Democracy"
        },
        {
          "title": "2024 Algerian legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Algerian_legislative_election"
        }
      ]
    }
  ],
  "AF": [
    {
      "id": "AF-AMP",
      "country": "AF",
      "shortName": "AMP",
      "name": "Afghan Millat Party",
      "logo": "party-logos/af/amp.svg",
      "sha256": "3901bec2d58b95bf37b681b6bba747c1db0926b25f554808172b2a4df5f2f303",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Afghan_Millat_Party_logo.svg",
      "ideology": ["Pashtun nationalism", "Conservatism"],
      "ideologyPosition": "right",
      "founded": 2003,
      "leader": "Mohammad Zia Massoud",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 0,
      "seatsTotal": 249,
      "chamberName": "Wolesi Jirga",
      "sources": [
        {
          "title": "Afghan Millat Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Afghan_Millat_Party"
        },
        {
          "title": "2004 Afghan legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2004_Afghan_legislative_election"
        }
      ]
    },
    {
      "id": "AF-ISA",
      "country": "AF",
      "shortName": "ISA",
      "name": "Islamic Society of Afghanistan",
      "logo": "party-logos/af/isa.svg",
      "sha256": "b55804fb8a8249a2ad0be17e7b59883d448abb850df323f167d140f41a2511cb",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Islamic_Society_of_Afghanistan_logo.svg",
      "ideology": ["Islamic conservatism", "Afghan nationalism"],
      "ideologyPosition": "right",
      "founded": 1979,
      "leader": "Muhammad Karim Khalili",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 10,
      "seatsTotal": 249,
      "chamberName": "Wolesi Jirga",
      "sources": [
        {
          "title": "Islamic Society of Afghanistan – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Islamic_Society_of_Afghanistan"
        },
        {
          "title": "2019 Afghan legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2019_Afghan_legislative_election"
        }
      ]
    },
    {
      "id": "AF-TNUP",
      "country": "AF",
      "shortName": "TNUP",
      "name": "Tajik National Unity Party",
      "logo": "party-logos/af/tnup.svg",
      "sha256": "ce241f6291026c98f484926672131945846ef145be85d4591453550e05135d5b",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Tajik_National_Unity_Party_logo.svg",
      "ideology": ["Tajik nationalism", "Socialism"],
      "ideologyPosition": "left",
      "founded": 1992,
      "leader": "Ahmad Zia Masoud",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 8,
      "seatsTotal": 249,
      "chamberName": "Wolesi Jirga",
      "sources": [
        {
          "title": "Tajik National Unity Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Tajik_National_Unity_Party"
        },
        {
          "title": "2018 Afghan legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2018_Afghan_legislative_election"
        }
      ]
    }
  ],
  "AO": [
    {
      "id": "AO-FNLA",
      "country": "AO",
      "shortName": "FNLA",
      "name": "Frente Nacional de Libertação de Angola",
      "nameEn": "National Front for the Liberation of Angola",
      "logo": "party-logos/ao/fnla.svg",
      "sha256": "6fe21a1505da549aede5553a2236ea6e16bfe4c32d24a3b7046c48f008d55fca",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:FNLA_logo.svg",
      "ideology": ["Anti-communism", "Angolan nationalism"],
      "ideologyPosition": "right",
      "founded": 1962,
      "leader": "Isaac Zet Nkouondjin",
      "leaderTitle": "President",
      "inPower": false,
      "seats": 0,
      "seatsTotal": 220,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "FNLA – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/FNLA"
        },
        {
          "title": "2023 Angolan legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Angolan_legislative_election"
        }
      ]
    },
    {
      "id": "AO-MPLA",
      "country": "AO",
      "shortName": "MPLA",
      "name": "Movimento Popular para a Libertação de Angola",
      "nameEn": "Popular Movement for the Liberation of Angola",
      "logo": "party-logos/ao/mpla.svg",
      "sha256": "936d6c0f73dcf2c3c3658fc4d26a22cfe4fbad5ada432a15c0fd7394ca5c63c6",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:MPLA_logo.svg",
      "ideology": ["Marxism-Leninism", "Socialism"],
      "ideologyPosition": "left",
      "founded": 1956,
      "leader": "João Lourenço",
      "leaderTitle": "President",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2017–present",
      "seats": 124,
      "seatsTotal": 220,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "MPLA – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/MPLA"
        },
        {
          "title": "2023 Angolan legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Angolan_legislative_election"
        }
      ]
    },
    {
      "id": "AO-UNITA",
      "country": "AO",
      "shortName": "UNITA",
      "name": "União Nacional para a Independência Total de Angola",
      "nameEn": "National Union for the Total Independence of Angola",
      "logo": "party-logos/ao/unita.svg",
      "sha256": "d5d3d843ca01f134727a95b21a8153f8812f57c4cc62b43593f29c345b1eaf20",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:UNITA_logo.svg",
      "ideology": ["Liberalism", "Anti-communism"],
      "ideologyPosition": "centre-right",
      "founded": 1966,
      "leader": "Adalberto Costa Junior",
      "leaderTitle": "President",
      "inPower": false,
      "seats": 90,
      "seatsTotal": 220,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "UNITA – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/UNITA"
        },
        {
          "title": "2023 Angolan legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Angolan_legislative_election"
        }
      ]
    }
  ],
  "BH": [
    {
      "id": "BH-ALWEFAQ",
      "country": "BH",
      "shortName": "Alwefaq",
      "name": "Alwefaq",
      "nameEn": "Islamic Action Society",
      "logo": "party-logos/bh/alwefaq.svg",
      "sha256": "e2db76817a662f34b5e680ce2a8517ba57623e9e7da06c9e8a6b3385fc2cacf5",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Alwefaq_logo.svg",
      "ideology": ["Shia Islamism", "Religious democracy"],
      "ideologyPosition": "right",
      "founded": 2001,
      "inPower": false,
      "seats": 0,
      "seatsTotal": 40,
      "chamberName": "Council of Representatives",
      "sources": [
        {
          "title": "Alwefaq – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Alwefaq"
        },
        {
          "title": "2018 Bahraini general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2018_Bahraini_general_election"
        }
      ]
    },
    {
      "id": "BH-IAS",
      "country": "BH",
      "shortName": "IAS",
      "name": "Islamic Action Society",
      "logo": "party-logos/bh/ias.svg",
      "sha256": "6dbc5e86ec16e880ae426cc7cf23b2080497ccc65853b1148690d6225caec3e2",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Islamic_Action_Society_Bahrain_logo.svg",
      "ideology": ["Sunni Islamism", "Conservative"],
      "ideologyPosition": "right",
      "founded": 1973,
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2018–present",
      "seats": 1,
      "seatsTotal": 40,
      "chamberName": "Council of Representatives",
      "sources": [
        {
          "title": "Islamic Action Society – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Islamic_Action_Society"
        },
        {
          "title": "2018 Bahraini general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2018_Bahraini_general_election"
        }
      ]
    },
    {
      "id": "BH-NDAS",
      "country": "BH",
      "shortName": "NDAS",
      "name": "National Democratic Action Society",
      "logo": "party-logos/bh/ndas.svg",
      "sha256": "50b261d67bfb784eb84b46cc80f518bd755007a61553f8aa53979560c54775c2",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:National_Democratic_Action_Society_logo.svg",
      "ideology": ["Arab nationalism", "Liberal democracy"],
      "ideologyPosition": "centre-left",
      "founded": 1994,
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2018–present",
      "seats": 2,
      "seatsTotal": 40,
      "chamberName": "Council of Representatives",
      "sources": [
        {
          "title": "National Democratic Action Society – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/National_Democratic_Action_Society"
        },
        {
          "title": "2018 Bahraini general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2018_Bahraini_general_election"
        }
      ]
    }
  ],
  "BJ": [
    {
      "id": "BJ-BPU",
      "country": "BJ",
      "shortName": "BPU",
      "name": "Benin Progressive Union",
      "logo": "party-logos/bj/bpu.svg",
      "sha256": "a489231a38cbf72c777e37e7eb20d836b987e7039285ef4772ec9044fa5e7aa0",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Benin_Progressive_Union_logo.svg",
      "ideology": ["Centrism", "Social democracy"],
      "ideologyPosition": "centre",
      "founded": 1996,
      "inPower": false,
      "seats": 2,
      "seatsTotal": 163,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "2023 Beninese legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Beninese_legislative_election"
        }
      ]
    },
    {
      "id": "BJ-BRB",
      "country": "BJ",
      "shortName": "BRB",
      "name": "Benin Renewal Bloc",
      "logo": "party-logos/bj/brb.svg",
      "sha256": "2c35c8d31b88619a86d725f6f1bc379d2762a9bf59a65d86405319d7e728e7f1",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Benin_Renewal_Bloc_logo.svg",
      "ideology": ["Liberalism", "Progressivism"],
      "ideologyPosition": "centre-left",
      "founded": 2008,
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2023–present",
      "seats": 54,
      "seatsTotal": 163,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "2023 Beninese legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Beninese_legislative_election"
        }
      ]
    },
    {
      "id": "BJ-DRP",
      "country": "BJ",
      "shortName": "DRP",
      "name": "Democratic Renewal Party",
      "logo": "party-logos/bj/drp.svg",
      "sha256": "d13239f8fff9fe11905a5ec25a8ca62ec1e7e2564cd754ca8d86f69d196110dd",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Democratic_Renewal_Party_Benin_logo.svg",
      "ideology": ["Conservatism", "Christian democracy"],
      "ideologyPosition": "centre-right",
      "founded": 1994,
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2023–present",
      "seats": 3,
      "seatsTotal": 163,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "2023 Beninese legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Beninese_legislative_election"
        }
      ]
    }
  ],  "AD": [
    {
      "id": "AD-PS",
      "country": "AD",
      "shortName": "PS",
      "name": "Partit dels Socialdemòcrates",
      "nameEn": "Socialist Party of Andorra",
      "logo": "party-logos/ad/ps.svg",
      "sha256": "decdc578366fbb191d0c4d54c49c6dd47c3e2f43cc234fa501cfab5ab2aa458c",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Socialist_Party_of_Andorra_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Social democracy", "Progressive conservatism"],
      "ideologyPosition": "centre-left",
      "founded": 1990,
      "leader": "Víctor Naudi Estanyol",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "inExecutive": false,
      "timeInPower": "2023–present",
      "seats": 11,
      "seatsTotal": 28,
      "chamberName": "General Council",
      "sources": [
        {
          "title": "Partit dels Socialdemòcrates – Official site",
          "url": "https://www.socialdemocrates.ad/"
        },
        {
          "title": "2023 Andorran legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Andorran_legislative_election"
        }
      ]
    },
    {
      "id": "AD-PD",
      "country": "AD",
      "shortName": "PD",
      "name": "Partit de la Democràcia",
      "nameEn": "Democratic Party of Andorra",
      "logo": "party-logos/ad/pd.svg",
      "sha256": "e7557128566dbb05fedfd98c0a07d17da9f412d8122f267b80d29b37a4dd9496",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Democratic_Party_of_Andorra_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Liberalism", "Centre-right politics"],
      "ideologyPosition": "centre-right",
      "founded": 1992,
      "leader": "Marc Fernàndez Aliseda",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 11,
      "seatsTotal": 28,
      "chamberName": "General Council",
      "sources": [
        {
          "title": "Partit de la Democràcia – Official site",
          "url": "https://www.partitdelademocracia.ad/"
        },
        {
          "title": "2023 Andorran legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Andorran_legislative_election"
        }
      ]
    },
    {
      "id": "AD-UC",
      "country": "AD",
      "shortName": "UC",
      "name": "Unió Ciutadana",
      "nameEn": "Citizens' Union",
      "logo": "party-logos/ad/uc.svg",
      "sha256": "a1667f8c7d32318c79901bd166784f492410e528e7b9f680d72972fde2bf57c7",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Citizens_Union_of_Andorra_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Liberalism", "Progressivism"],
      "ideologyPosition": "centre",
      "founded": 2000,
      "leader": "Alfons Darder",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 6,
      "seatsTotal": 28,
      "chamberName": "General Council",
      "sources": [
        {
          "title": "Unió Ciutadana – Official site",
          "url": "https://www.uc.ad/"
        },
        {
          "title": "2023 Andorran legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Andorran_legislative_election"
        }
      ]
    }
  ],
  "AL": [
    {
      "id": "AL-PS",
      "country": "AL",
      "shortName": "PS",
      "name": "Partia Socialiste",
      "nameEn": "Socialist Party of Albania",
      "logo": "party-logos/al/ps.svg",
      "sha256": "4041e9903c219b6073d0931b85d6baa2c1971bdb27cfe7e8a9e06b280f68d6a4",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Socialist_Party_of_Albania_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Social democracy"],
      "ideologyPosition": "centre-left",
      "founded": 1991,
      "leader": "Edi Rama",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2013–present",
      "seats": 74,
      "seatsTotal": 140,
      "chamberName": "Assembly of Albania",
      "sources": [
        {
          "title": "Partia Socialiste – Official site",
          "url": "https://www.ps.org.al/"
        },
        {
          "title": "Socialist Party of Albania – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Socialist_Party_of_Albania"
        }
      ]
    },
    {
      "id": "AL-PD",
      "country": "AL",
      "shortName": "PD",
      "name": "Partia Demokratike",
      "nameEn": "Democratic Party of Albania",
      "logo": "party-logos/al/pd.svg",
      "sha256": "22c9a5c76095606b941dbfd1ed605586f88f7006f32cdffbb94cd55ad4954cab",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Democratic_Party_of_Albania_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Conservative liberalism", "Christian democracy"],
      "ideologyPosition": "centre-right",
      "founded": 1992,
      "leader": "Lulzim Basha",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 59,
      "seatsTotal": 140,
      "chamberName": "Assembly of Albania",
      "sources": [
        {
          "title": "Partia Demokratike – Official site",
          "url": "https://www.pd.org.al/"
        },
        {
          "title": "Democratic Party of Albania – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Democratic_Party_of_Albania"
        }
      ]
    },
    {
      "id": "AL-LN",
      "country": "AL",
      "shortName": "LN",
      "name": "Lëvizja për Ndryshim",
      "nameEn": "Movement for Change",
      "logo": "party-logos/al/ln.svg",
      "sha256": "c55d0c3b69993c65b5845c876579c47412e9cc91ba560ec80e8cef392fde81ad",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Movement_for_Change_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centrism", "Liberalism"],
      "ideologyPosition": "centre",
      "founded": 2017,
      "leader": "Jozefina Topalli",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 7,
      "seatsTotal": 140,
      "chamberName": "Assembly of Albania",
      "sources": [
        {
          "title": "Lëvizja për Ndryshim – Official site",
          "url": "https://www.lnd.al/"
        },
        {
          "title": "Movement for Change (Albania) – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Movement_for_Change_(Albania)"
        }
      ]
    }
  ],
  "AM": [
    {
      "id": "AM-RKP",
      "country": "AM",
      "shortName": "RKP",
      "name": "Հայաստանի Հանրապետական Կոմունիստական Կուսակցություն",
      "nameEn": "Republican Party of Armenia",
      "logo": "party-logos/am/rkp.svg",
      "sha256": "7f10c715771ff0a48c6d01191253218ee0b073e1418500fbb8671129b9e79738",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Republican_Party_of_Armenia_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Conservative liberalism"],
      "ideologyPosition": "centre-right",
      "founded": 1998,
      "inPower": false,
      "seats": 0,
      "seatsTotal": 101,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Republican Party of Armenia – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Republican_Party_of_Armenia"
        },
        {
          "title": "2022 Armenian legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2022_Armenian_legislative_election"
        }
      ]
    },
    {
      "id": "AM-FDARC",
      "country": "AM",
      "shortName": "FDA",
      "name": "Ազատ Դեմոկրատների Ստորագծում",
      "nameEn": "Free Democratic Alliance of Armenia",
      "logo": "party-logos/am/fda.svg",
      "sha256": "adb16885ae71c0fd38c63e198510f03c0384fd40d1268bee93df2075d8d7bfa3",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Free_Democrats_Party_Armenia_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Liberalism", "Democracy"],
      "ideologyPosition": "centre",
      "founded": 2009,
      "inPower": false,
      "seats": 0,
      "seatsTotal": 101,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Free Democratic Alliance of Armenia – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Free_Democratic_Alliance_of_Armenia"
        },
        {
          "title": "2022 Armenian legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2022_Armenian_legislative_election"
        }
      ]
    },
    {
      "id": "AM-HGP",
      "country": "AM",
      "shortName": "HGP",
      "name": "Հայ Գործիչ Պետական Կուսակցություն",
      "nameEn": "Armenian Public Party",
      "logo": "party-logos/am/mpa.svg",
      "sha256": "35439d056635f6ff055e4493cef00dac8d457ba44bd64472cd8ada5cc33eab4c",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Motherland_Party_Armenia_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Conservatism", "Armenian nationalism"],
      "ideologyPosition": "right",
      "founded": 2003,
      "leader": "Armenak Petrosyan",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 0,
      "seatsTotal": 101,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Armenian Public Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Armenian_Public_Party"
        },
        {
          "title": "2022 Armenian legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2022_Armenian_legislative_election"
        }
      ]
    }
  ],
  "AG": [
    {
      "id": "AG-UPP",
      "country": "AG",
      "shortName": "UPP",
      "name": "United Progressive Party",
      "logo": "party-logos/ag/upp.svg",
      "sha256": "9d5416455db908657be1929e1f2b86f34d418ff74974f228435469d6e3612823",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:United_Progressive_Party_Antigua_Barbuda_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Social democracy", "Progressivism"],
      "ideologyPosition": "centre-left",
      "founded": 2006,
      "leader": "Gaston Browne",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2014–present",
      "seats": 15,
      "seatsTotal": 19,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "United Progressive Party (Antigua and Barbuda) – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/United_Progressive_Party_(Antigua_and_Barbuda)"
        },
        {
          "title": "2023 Antiguan and Barbudan general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Antiguan_and_Barbudan_general_election"
        }
      ]
    },
    {
      "id": "AG-ABLP",
      "country": "AG",
      "shortName": "ABLP",
      "name": "Antigua and Barbuda Labour Party",
      "logo": "party-logos/ag/ablp.svg",
      "sha256": "22722d55a035d0f4cd2e64b11e836e02a924ff128138173b01a4484ece07e3ee",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Antigua_Barbuda_Labour_Party_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Social democracy", "Labourism"],
      "ideologyPosition": "centre-left",
      "founded": 1946,
      "leader": "John Maginley",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 19,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Antigua and Barbuda Labour Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Antigua_and_Barbuda_Labour_Party"
        },
        {
          "title": "2023 Antiguan and Barbudan general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Antiguan_and_Barbudan_general_election"
        }
      ]
    },
    {
      "id": "AG-DMC",
      "country": "AG",
      "shortName": "DMC",
      "name": "Democratic Movement for Change",
      "logo": "party-logos/ag/dmc.svg",
      "sha256": "bbeb93baea88cae8746774647cf71b23337fe4dbbf933eff1bb616b34fc41c87",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Democratic_Movement_Change_Antigua_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centrism", "Social liberalism"],
      "ideologyPosition": "centre",
      "founded": 2000,
      "leader": "Jamila Johnson",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 3,
      "seatsTotal": 19,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Democratic Movement for Change – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Democratic_Movement_for_Change"
        },
        {
          "title": "2023 Antiguan and Barbudan general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Antiguan_and_Barbudan_general_election"
        }
      ]
    }
  ],
  "AZ": [
    {
      "id": "AZ-YAP",
      "country": "AZ",
      "shortName": "YAP",
      "name": "Yeni Azərbaycan Partiyası",
      "nameEn": "New Azerbaijan Party",
      "logo": "party-logos/az/yap.svg",
      "sha256": "76b5c862bcbcc971fdf99b4bcbbeb88d84c5a07d56b8bacbd1ffb70bcfd40d06",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:New_Azerbaijan_Party_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Right-wing populism", "Azerbaijani nationalism"],
      "ideologyPosition": "far-right",
      "founded": 1992,
      "leader": "Ilham Aliyev",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2003–present",
      "seats": 113,
      "seatsTotal": 125,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "New Azerbaijan Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/New_Azerbaijan_Party"
        },
        {
          "title": "2020 Azerbaijani legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2020_Azerbaijani_legislative_election"
        }
      ]
    },
    {
      "id": "AZ-MSIP",
      "country": "AZ",
      "shortName": "MSIP",
      "name": "Müsavat Seçim İttifaqı Partiyası",
      "nameEn": "Equality Electoral Coalition Party",
      "logo": "party-logos/az/musavat.svg",
      "sha256": "c07bc29425aa45b55076cfb92ae71e7401f53340ddafc6c39806a1597674e559",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Musavat_Party_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Liberalism", "Centrism"],
      "ideologyPosition": "centre",
      "founded": 1911,
      "leader": "Arif Hajili",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 125,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Musavat – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Musavat"
        },
        {
          "title": "2020 Azerbaijani legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2020_Azerbaijani_legislative_election"
        }
      ]
    },
    {
      "id": "AZ-APF",
      "country": "AZ",
      "shortName": "APF",
      "name": "Azərbaycan Xalq Cəbhəsi",
      "nameEn": "Azerbaijan Popular Front",
      "logo": "party-logos/az/apf.svg",
      "sha256": "4b870316044bd1648ceb2d26dcd62ec85160cab2bb95f2aee62347a097f8d7b7",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Popular_Front_Azerbaijan_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Liberal nationalism", "Social liberalism"],
      "ideologyPosition": "centre-right",
      "founded": 1989,
      "leader": "Mirza Fatali Akhundov",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 0,
      "seatsTotal": 125,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Azerbaijan Popular Front – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Azerbaijan_Popular_Front"
        },
        {
          "title": "2020 Azerbaijani legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2020_Azerbaijani_legislative_election"
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
      "logo": "party-logos/ar/lla.svg",
      "sha256": "e18f334bb0d0ec47b17e272e12c894dc1a15e372f1f2656ebef308e195b426ef",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:La_Libertad_Avanza_full_logo.svg",
      "licenceNote": "Non-free logo hosted locally on English Wikipedia under fair use (File:La Libertad Avanza full logo.svg), used to identify the party per Wikipedia's non-free-content policy; not freely licensed for reuse. The Commons file \"La_Libertad_Avanza_2021.svg\" originally identified for this entry was checked and found to actually be an unrelated Buenos Aires province map, not the party's logo — this Wikipedia infobox file is the verified correct one.",
      "ideology": [
        "Right-libertarianism",
        "Libertarian conservatism",
        "Ultraconservatism",
        "Right-wing populism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing to far-right",
      "founded": 2021,
      "leader": "Javier Milei",
      "leaderTitle": "President (2023–present)",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2023-present",
      "seats": 95,
      "seatsTotal": 257,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The La Libertad Avanza logo features a stylized yellow arrow pointing upward against a blue background, representing the party's core message of advancing freedom and economic progress. The upward arrow symbolizes growth, movement, and optimism for the future, while the bright yellow conveys energy and hope. The design reflects the party's libertarian conservative ideology and its commitment to market-based reforms and individual liberty.",
        "sources": [
          {
            "title": "La Libertad Avanza — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/La_Libertad_Avanza"
          },
          {
            "title": "La Libertad Avanza — Wikipedia (es)",
            "url": "https://es.wikipedia.org/wiki/La_Libertad_Avanza"
          }
        ]
      },
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
        },
        {
          "title": "Argentine Chamber of Deputies — Wikipedia (blocs after the 26 October 2025 legislative election: Government 95, Allies 24, Independent 41, Opposition 97, of 257)",
          "url": "https://en.wikipedia.org/wiki/Argentine_Chamber_of_Deputies"
        }
      ]
    },
    {
      "id": "AR-UXP",
      "country": "AR",
      "shortName": "UxP",
      "name": "Fuerza Patria",
      "nameEn": "Homeland Force",
      "logo": "party-logos/ar/uxp.svg",
      "sha256": "c33ca6db59ba2a3d5555505249e50f706e70380eaaa209d95b95c0bb1d358425",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_Union_por_la_Patria.svg",
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
          "name": "Unión por la Patria",
          "nameEn": "Union for the Homeland",
          "years": "2023–2025"
        }
      ],
      "leader": "Germán Martínez",
      "leaderTitle": "President of the Unión por la Patria bloc in the Chamber of Deputies",
      "inPower": false,
      "inExecutive": false,
      "seats": 93,
      "seatsTotal": 257,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The Unión por la Patria logo features a stylized hand holding the national flag or colors of Argentina, representing unity, popular will, and democratic participation. The design symbolizes the coalition's commitment to bringing together various Peronist and progressive forces to work for the nation's welfare. The upraised hand conveys collective action, solidarity, and the party's focus on grassroots mobilization and popular support.",
        "sources": [
          {
            "title": "Unión por la Patria — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Uni%C3%B3n_por_la_Patria"
          },
          {
            "title": "Unión por la Patria — Wikipedia (es)",
            "url": "https://es.wikipedia.org/wiki/Uni%C3%B3n_por_la_Patria"
          }
        ]
      },
      "sources": [
        {
          "title": "Homeland Force — Wikipedia (Fuerza Patria, known as Unión por la Patria until 2025; main opposition coalition since December 2023)",
          "url": "https://en.wikipedia.org/wiki/Homeland_Force"
        },
        {
          "title": "Radiografía de los bloques en Diputados: cómo quedaron y quiénes son sus referentes - Ámbito",
          "url": "https://www.ambito.com/politica/radiografia-los-bloques-diputados-como-quedaron-y-quienes-son-sus-referentes-n6220476"
        },
        {
          "title": "Uno por uno, cómo quedan los bloques de la Cámara de Diputados - Infobae",
          "url": "https://www.infobae.com/politica/2025/12/03/uno-por-uno-como-quedan-los-bloques-de-la-camara-de-diputados-y-cuantos-legisladores-tendran/"
        },
        {
          "title": "Argentine Chamber of Deputies — Wikipedia (blocs after the 26 October 2025 legislative election: Government 95, Allies 24, Independent 41, Opposition 97, of 257)",
          "url": "https://en.wikipedia.org/wiki/Argentine_Chamber_of_Deputies"
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
      "inExecutive": false,
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
        },
        {
          "title": "Argentine Chamber of Deputies — Wikipedia (blocs after the 26 October 2025 legislative election: Government 95, Allies 24, Independent 41, Opposition 97, of 257)",
          "url": "https://en.wikipedia.org/wiki/Argentine_Chamber_of_Deputies"
        }
      ]
    },
    {
      "id": "AR-PRO",
      "country": "AR",
      "shortName": "PRO",
      "name": "Propuesta Republicana",
      "nameEn": "Republican Proposal",
      "logo": "party-logos/ar/pro.svg",
      "sha256": "a7eeb4a26f16f8eb1b4823653bbaa32b8fa5c5276eb714de8282258a4ca8bd44",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_PRO.svg",
      "ideology": [
        "Conservative liberalism",
        "Liberal conservatism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 2005,
      "leader": "Cristian Ritondo",
      "leaderTitle": "President of the PRO bloc in the Chamber of Deputies",
      "inPower": false,
      "inExecutive": false,
      "seats": 12,
      "seatsTotal": 257,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The PRO (Propuesta Republicana) logo features a stylized sunburst or rays of light, representing illumination, progress, and forward movement. The design conveys the party's commitment to transparency, modernity, and liberal democratic values. The radiant symbol reflects the party's positioning as a centre-right political force offering a clear vision for Argentina's economic and institutional development.",
        "sources": [
          {
            "title": "Republican Proposal — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Republican_Proposal"
          },
          {
            "title": "Propuesta Republicana — Wikipedia (es)",
            "url": "https://es.wikipedia.org/wiki/Propuesta_Republicana"
          }
        ]
      },
      "sources": [
        {
          "title": "Republican Proposal - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Republican_Proposal"
        },
        {
          "title": "Radiografía de los bloques en Diputados - Ámbito",
          "url": "https://www.ambito.com/politica/radiografia-los-bloques-diputados-como-quedaron-y-quienes-son-sus-referentes-n6220476"
        },
        {
          "title": "Argentine Chamber of Deputies — Wikipedia (blocs after the 26 October 2025 legislative election: Government 95, Allies 24, Independent 41, Opposition 97, of 257)",
          "url": "https://en.wikipedia.org/wiki/Argentine_Chamber_of_Deputies"
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
      "inExecutive": false,
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
        },
        {
          "title": "Argentine Chamber of Deputies — Wikipedia (blocs after the 26 October 2025 legislative election: Government 95, Allies 24, Independent 41, Opposition 97, of 257)",
          "url": "https://en.wikipedia.org/wiki/Argentine_Chamber_of_Deputies"
        }
      ]
    },
    {
      "id": "AR-UCR",
      "country": "AR",
      "shortName": "UCR",
      "name": "Unión Cívica Radical",
      "nameEn": "Radical Civic Union",
      "logo": "party-logos/ar/ucr.svg",
      "sha256": "8e41c969c79818b92c7d45129950be270a6e18b8ca75793deacd638bfe82372f",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Ucr_modern_logo.svg",
      "ideology": [
        "Social liberalism",
        "Social democracy",
        "Conservative liberalism (faction)"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre; historically centre to centre-left",
      "founded": 1891,
      "leader": "Pamela Verasay",
      "leaderTitle": "President of the UCR bloc in the Chamber of Deputies",
      "inPower": false,
      "inExecutive": false,
      "seats": 6,
      "seatsTotal": 257,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The UCR (Unión Cívica Radical) logo features a stylized shield with the national colours of Argentina (light blue and white) and a radiant sun, representing civic unity, democratic values, and national identity. The design reflects the party's historical role as a founding force of Argentine democracy and its commitment to liberal, civic-minded governance. The shield conveys institutional strength and protection of democratic principles, while the sun symbolizes hope and enlightenment.",
        "sources": [
          {
            "title": "Radical Civic Union — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Radical_Civic_Union"
          },
          {
            "title": "Unión Cívica Radical — Wikipedia (es)",
            "url": "https://es.wikipedia.org/wiki/Uni%C3%B3n_C%C3%ADvica_Radical"
          }
        ]
      },
      "sources": [
        {
          "title": "Radical Civic Union - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Radical_Civic_Union"
        },
        {
          "title": "Radiografía de los bloques en Diputados - Ámbito",
          "url": "https://www.ambito.com/politica/radiografia-los-bloques-diputados-como-quedaron-y-quienes-son-sus-referentes-n6220476"
        },
        {
          "title": "Argentine Chamber of Deputies — Wikipedia (blocs after the 26 October 2025 legislative election: Government 95, Allies 24, Independent 41, Opposition 97, of 257)",
          "url": "https://en.wikipedia.org/wiki/Argentine_Chamber_of_Deputies"
        }
      ]
    },
    {
      "id": "AR-FITU",
      "country": "AR",
      "shortName": "FIT-U",
      "name": "Frente de Izquierda y de Trabajadores - Unidad",
      "nameEn": "Left and Workers' Front - Unity",
      "logo": "party-logos/ar/fitu.svg",
      "sha256": "a5e7d90758cdc841cf5c64530d04fa0606749733c7df4c856793b6e73781614a",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_Frente_de_Izquierda_y_de_Trabajadores-Unidad.svg",
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
      "inExecutive": false,
      "seats": 4,
      "seatsTotal": 257,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The FIT-U (Frente de Izquierda y de Trabajadores - Unidad) logo features a red design incorporating hammer and sickle symbolism along with stylized hands or united figures, representing workers' solidarity, socialist ideology, and the alliance of Trotskyist and communist parties. The red colour symbolizes revolutionary socialism and the international communist movement, while the hands represent collective action and workers' unity against capitalist exploitation and imperialism.",
        "sources": [
          {
            "title": "Left and Workers' Front — Unidad — Wikipedia (es)",
            "url": "https://es.wikipedia.org/wiki/Frente_de_Izquierda_y_de_Trabajadores_-_Unidad"
          },
          {
            "title": "Frente de Izquierda y de Trabajadores — Wikipedia (es)",
            "url": "https://es.wikipedia.org/wiki/Frente_de_Izquierda_y_de_Trabajadores"
          }
        ]
      },
      "sources": [
        {
          "title": "Frente de Izquierda y de Trabajadores - Unidad - Wikipedia (es)",
          "url": "https://es.wikipedia.org/wiki/Frente_de_Izquierda_y_de_Trabajadores_-_Unidad"
        },
        {
          "title": "Elecciones 2025: el Frente de Izquierda obtuvo cerca de 4 puntos a nivel nacional y pierde una banca en el Congreso - La Nación",
          "url": "https://www.lanacion.com.ar/politica/el-frente-de-izquierda-obtuvo-cerca-de-4-puntos-a-nivel-nacional-y-pierde-una-banca-en-el-congreso-nid26102025/"
        },
        {
          "title": "Argentine Chamber of Deputies — Wikipedia (blocs after the 26 October 2025 legislative election: Government 95, Allies 24, Independent 41, Opposition 97, of 257)",
          "url": "https://en.wikipedia.org/wiki/Argentine_Chamber_of_Deputies"
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
      "inExecutive": false,
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
        },
        {
          "title": "Argentine Chamber of Deputies — Wikipedia (blocs after the 26 October 2025 legislative election: Government 95, Allies 24, Independent 41, Opposition 97, of 257)",
          "url": "https://en.wikipedia.org/wiki/Argentine_Chamber_of_Deputies"
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
      "inExecutive": false,
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
        },
        {
          "title": "Argentine Chamber of Deputies — Wikipedia (blocs after the 26 October 2025 legislative election: Government 95, Allies 24, Independent 41, Opposition 97, of 257)",
          "url": "https://en.wikipedia.org/wiki/Argentine_Chamber_of_Deputies"
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
      "inExecutive": false,
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
        },
        {
          "title": "Argentine Chamber of Deputies — Wikipedia (blocs after the 26 October 2025 legislative election: Government 95, Allies 24, Independent 41, Opposition 97, of 257)",
          "url": "https://en.wikipedia.org/wiki/Argentine_Chamber_of_Deputies"
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
      "inExecutive": false,
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
        },
        {
          "title": "Argentine Chamber of Deputies — Wikipedia (blocs after the 26 October 2025 legislative election: Government 95, Allies 24, Independent 41, Opposition 97, of 257)",
          "url": "https://en.wikipedia.org/wiki/Argentine_Chamber_of_Deputies"
        }
      ]
    },
    {
      "id": "AR-CCARI",
      "country": "AR",
      "shortName": "CC-ARI",
      "name": "Coalición Cívica ARI",
      "nameEn": "Civic Coalition ARI",
      "logo": "party-logos/ar/ccari.svg",
      "sha256": "42af5b9cada6ad1cb30a8279ad5374734259a75663af4ce92cba4e981898f232",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Coalicion_Civica.svg",
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
      "inExecutive": false,
      "seats": 2,
      "seatsTotal": 257,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The CC-ARI (Coalición Cívica ARI) logo features a stylized civic symbol combining the national colours of Argentina with abstract shapes representing unity and democratic participation. The design reflects the party's commitment to civic engagement, anti-corruption, and radical centrist politics. The symbol conveys transparency, institutional reform, and the party's focus on strengthening democratic institutions and civil society participation in Argentine politics.",
        "sources": [
          {
            "title": "Coalición Cívica ARI — Wikipedia (es)",
            "url": "https://es.wikipedia.org/wiki/Coalici%C3%B3n_C%C3%ADvica_ARI"
          },
          {
            "title": "Civic Coalition — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Civic_Coalition"
          }
        ]
      },
      "sources": [
        {
          "title": "Coalición Cívica ARI - Wikipedia (es)",
          "url": "https://es.wikipedia.org/wiki/Coalici%C3%B3n_C%C3%ADvica_ARI"
        },
        {
          "title": "Radiografía de los bloques en Diputados - Ámbito",
          "url": "https://www.ambito.com/politica/radiografia-los-bloques-diputados-como-quedaron-y-quienes-son-sus-referentes-n6220476"
        },
        {
          "title": "Argentine Chamber of Deputies — Wikipedia (blocs after the 26 October 2025 legislative election: Government 95, Allies 24, Independent 41, Opposition 97, of 257)",
          "url": "https://en.wikipedia.org/wiki/Argentine_Chamber_of_Deputies"
        }
      ]
    },
    {
      "id": "AR-MID",
      "country": "AR",
      "shortName": "MID",
      "name": "Movimiento de Integración y Desarrollo",
      "nameEn": "Integration and Development Movement",
      "logo": "party-logos/ar/mid.png",
      "sha256": "217dbea960bd90ff48166938b7ac3a71d1de41f213c1b3bf47448b8012e28ddb",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Movimiento_de_Integración_y_Desarrollo_2018.png",
      "ideology": [
        "Developmentalism (desarrollismo)"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right, with internal factions ranging from centre to right",
      "founded": 1964,
      "leader": "Juan Pablo Carrique",
      "leaderTitle": "President of the Movimiento de Integración y Desarrollo",
      "inPower": false,
      "inExecutive": false,
      "seats": 2,
      "seatsTotal": 257,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The MID (Movimiento de Integración y Desarrollo) logo reflects the party's historical focus on national integration and developmentalist economic policies. The design emphasizes economic development, national unity, and institutional modernization. The logo represents the party's commitment to fostering integration among Argentine regions and promoting state-led industrialization and economic growth as a path to national prosperity.",
        "sources": [
          {
            "title": "Movimiento de Integración y Desarrollo — Wikipedia (es)",
            "url": "https://es.wikipedia.org/wiki/Movimiento_de_Integraci%C3%B3n_y_Desarrollo"
          },
          {
            "title": "Integration and Development Movement — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Integration_and_Development_Movement"
          }
        ]
      },
      "sources": [
        {
          "title": "Movimiento de Integración y Desarrollo - Wikipedia (es)",
          "url": "https://es.wikipedia.org/wiki/Movimiento_de_Integraci%C3%B3n_y_Desarrollo"
        },
        {
          "title": "Radiografía de los bloques en Diputados - Ámbito",
          "url": "https://www.ambito.com/politica/radiografia-los-bloques-diputados-como-quedaron-y-quienes-son-sus-referentes-n6220476"
        },
        {
          "title": "Argentine Chamber of Deputies — Wikipedia (blocs after the 26 October 2025 legislative election: Government 95, Allies 24, Independent 41, Opposition 97, of 257)",
          "url": "https://en.wikipedia.org/wiki/Argentine_Chamber_of_Deputies"
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
      "inExecutive": false,
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
        },
        {
          "title": "Argentine Chamber of Deputies — Wikipedia (blocs after the 26 October 2025 legislative election: Government 95, Allies 24, Independent 41, Opposition 97, of 257)",
          "url": "https://en.wikipedia.org/wiki/Argentine_Chamber_of_Deputies"
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
      "inExecutive": false,
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
        },
        {
          "title": "Argentine Chamber of Deputies — Wikipedia (blocs after the 26 October 2025 legislative election: Government 95, Allies 24, Independent 41, Opposition 97, of 257)",
          "url": "https://en.wikipedia.org/wiki/Argentine_Chamber_of_Deputies"
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
      "inExecutive": false,
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
        },
        {
          "title": "Argentine Chamber of Deputies — Wikipedia (blocs after the 26 October 2025 legislative election: Government 95, Allies 24, Independent 41, Opposition 97, of 257)",
          "url": "https://en.wikipedia.org/wiki/Argentine_Chamber_of_Deputies"
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
      "leader": "Karina Banfi",
      "leaderTitle": "Founder and sole National Deputy of the Adelante Buenos Aires bloc",
      "inPower": false,
      "inExecutive": false,
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
        },
        {
          "title": "Argentine Chamber of Deputies — Wikipedia (blocs after the 26 October 2025 legislative election: Government 95, Allies 24, Independent 41, Opposition 97, of 257)",
          "url": "https://en.wikipedia.org/wiki/Argentine_Chamber_of_Deputies"
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
      "inExecutive": false,
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
        },
        {
          "title": "Argentine Chamber of Deputies — Wikipedia (blocs after the 26 October 2025 legislative election: Government 95, Allies 24, Independent 41, Opposition 97, of 257)",
          "url": "https://en.wikipedia.org/wiki/Argentine_Chamber_of_Deputies"
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
      "leader": "José Luis Garrido",
      "leaderTitle": "National Deputy for the Por Santa Cruz bloc",
      "inPower": false,
      "inExecutive": false,
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
        },
        {
          "title": "Argentine Chamber of Deputies — Wikipedia (blocs after the 26 October 2025 legislative election: Government 95, Allies 24, Independent 41, Opposition 97, of 257)",
          "url": "https://en.wikipedia.org/wiki/Argentine_Chamber_of_Deputies"
        }
      ]
    }
  ],
  "BE": [
    {
      "id": "BE-VB",
      "country": "BE",
      "shortName": "VB",
      "name": "Vlaams Belang",
      "nameEn": "Flemish Interest",
      "ideology": [
        "Right-wing nationalism",
        "Euroscepticism"
      ],
      "ideologyPosition": "far-right",
      "founded": 2004,
      "leader": "Tom Van Grieken",
      "leaderTitle": "Party President",
      "inPower": false,
      "seats": 22,
      "seatsTotal": 150,
      "chamberName": "Chamber of Representatives",
      "sources": [
        {
          "title": "Vlaams Belang – Wikipedia (founded 14 November 2004, ideology, leadership, party president Tom Van Grieken)",
          "url": "https://en.wikipedia.org/wiki/Vlaams_Belang"
        },
        {
          "title": "2024 Belgian federal election – Results (22 seats)",
          "url": "https://en.wikipedia.org/wiki/2024_Belgian_federal_election"
        }
      ],
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked"
    },
    {
      "id": "BE-MR",
      "country": "BE",
      "shortName": "MR",
      "name": "Mouvement Réformateur",
      "nameEn": "Reformist Movement",
      "ideology": [
        "Liberalism",
        "Pro-EU"
      ],
      "ideologyPosition": "centre-right",
      "founded": 2011,
      "leader": "Georges-Louis Bouchez",
      "leaderTitle": "President",
      "inPower": true,
      "inExecutive": false,
      "seats": 20,
      "seatsTotal": 150,
      "chamberName": "Chamber of Representatives",
      "sources": [
        {
          "title": "Mouvement Réformateur – Wikipedia (founded 27 May 2011, merger of PRL and FDF, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Mouvement_R%C3%A9formateur"
        },
        {
          "title": "2024 Belgian federal election – Results (20 seats)",
          "url": "https://en.wikipedia.org/wiki/2024_Belgian_federal_election"
        }
      ],
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked"
    },
    {
      "id": "BE-PS",
      "country": "BE",
      "shortName": "PS",
      "name": "Parti Socialiste Belge",
      "nameEn": "Belgian Socialist Party",
      "ideology": [
        "Social democracy"
      ],
      "ideologyPosition": "centre-left",
      "founded": 1885,
      "leader": "Paul Magnette",
      "leaderTitle": "President",
      "inPower": true,
      "inExecutive": false,
      "seats": 16,
      "seatsTotal": 150,
      "chamberName": "Chamber of Representatives",
      "sources": [
        {
          "title": "Parti Socialiste Belge – Wikipedia (founded 1885, ideology, leadership, currently led by Paul Magnette)",
          "url": "https://en.wikipedia.org/wiki/Parti_Socialiste_Belge"
        },
        {
          "title": "2024 Belgian federal election – Results (16 seats)",
          "url": "https://en.wikipedia.org/wiki/2024_Belgian_federal_election"
        }
      ],
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked"
    },
    {
      "id": "BE-NVA",
      "country": "BE",
      "shortName": "N-VA",
      "name": "Nieuw Vlaams Alliantie",
      "nameEn": "New Flemish Alliance",
      "ideology": [
        "Flemish nationalism",
        "Pro-EU"
      ],
      "ideologyPosition": "centre-right",
      "founded": 2001,
      "leader": "Bart De Wever",
      "leaderTitle": "Party President",
      "inPower": true,
      "inExecutive": false,
      "seats": 22,
      "seatsTotal": 150,
      "chamberName": "Chamber of Representatives",
      "sources": [
        {
          "title": "Nieuw Vlaams Alliantie – Wikipedia (founded 2001, ideology, leadership, Bart De Wever)",
          "url": "https://en.wikipedia.org/wiki/Nieuw_Vlaams_Alliantie"
        },
        {
          "title": "2024 Belgian federal election – Results (22 seats)",
          "url": "https://en.wikipedia.org/wiki/2024_Belgian_federal_election"
        }
      ],
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked"
    },
    {
      "id": "BE-ECOLO",
      "country": "BE",
      "shortName": "Ecolo",
      "name": "Ecolo",
      "nameEn": "Ecolo",
      "ideology": [
        "Green politics",
        "Left-wing"
      ],
      "ideologyPosition": "left",
      "founded": 1981,
      "leader": "Clara Decerf",
      "leaderTitle": "Co-President",
      "inPower": false,
      "seats": 6,
      "seatsTotal": 150,
      "chamberName": "Chamber of Representatives",
      "sources": [
        {
          "title": "Ecolo – Wikipedia (founded 1981, ideology, leadership, co-presidents)",
          "url": "https://en.wikipedia.org/wiki/Ecolo"
        },
        {
          "title": "2024 Belgian federal election – Results (6 seats)",
          "url": "https://en.wikipedia.org/wiki/2024_Belgian_federal_election"
        }
      ],
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked"
    },
    {
      "id": "BE-PVDA",
      "country": "BE",
      "shortName": "PVDA/PTB",
      "name": "Partij van de Arbeid België / Parti du Travail Belge",
      "nameEn": "Workers' Party of Belgium",
      "ideology": [
        "Communism",
        "Marxism"
      ],
      "ideologyPosition": "far-left",
      "founded": 1971,
      "leader": "Raoul Hedebouw",
      "leaderTitle": "President",
      "inPower": false,
      "seats": 8,
      "seatsTotal": 150,
      "chamberName": "Chamber of Representatives",
      "sources": [
        {
          "title": "Partij van de Arbeid België – Wikipedia (founded 1971, ideology, leadership, Raoul Hedebouw)",
          "url": "https://en.wikipedia.org/wiki/Partij_van_de_Arbeid_Belgi%C3%AB"
        },
        {
          "title": "2024 Belgian federal election – Results (8 seats)",
          "url": "https://en.wikipedia.org/wiki/2024_Belgian_federal_election"
        }
      ],
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked"
    },
    {
      "id": "BE-SPA",
      "country": "BE",
      "shortName": "SPa",
      "name": "Socialistische Partij Anders",
      "nameEn": "Socialist Party Differently",
      "ideology": [
        "Social democracy"
      ],
      "ideologyPosition": "centre-left",
      "founded": 1978,
      "leader": "Giles Vanden Burre",
      "leaderTitle": "Party President",
      "inPower": false,
      "seats": 13,
      "seatsTotal": 150,
      "chamberName": "Chamber of Representatives",
      "sources": [
        {
          "title": "Socialistische Partij Anders – Wikipedia (founded 1978, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Socialistische_Partij_Anders"
        },
        {
          "title": "2024 Belgian federal election – Results (13 seats)",
          "url": "https://en.wikipedia.org/wiki/2024_Belgian_federal_election"
        }
      ],
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked"
    },
    {
      "id": "BE-CDV",
      "country": "BE",
      "shortName": "CD&V",
      "name": "Christen-Democratisch en Vlaams",
      "nameEn": "Christian Democratic and Flemish",
      "ideology": [
        "Christian democracy"
      ],
      "ideologyPosition": "centre",
      "founded": 1968,
      "leader": "Sammy Mahdi",
      "leaderTitle": "President",
      "inPower": false,
      "seats": 9,
      "seatsTotal": 150,
      "chamberName": "Chamber of Representatives",
      "sources": [
        {
          "title": "Christen-Democratisch en Vlaams – Wikipedia (founded 1968, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Christen-Democratisch_en_Vlaams"
        },
        {
          "title": "2024 Belgian federal election – Results (9 seats)",
          "url": "https://en.wikipedia.org/wiki/2024_Belgian_federal_election"
        }
      ],
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked"
    },
    {
      "id": "BE-OPENVLD",
      "country": "BE",
      "shortName": "Open Vld",
      "name": "Vlaamse Liberalen en Democraten",
      "nameEn": "Flemish Liberals and Democrats",
      "ideology": [
        "Liberalism"
      ],
      "ideologyPosition": "centre-right",
      "founded": 1992,
      "leader": "Egbert Lachaert",
      "leaderTitle": "Party President",
      "inPower": true,
      "inExecutive": false,
      "seats": 7,
      "seatsTotal": 150,
      "chamberName": "Chamber of Representatives",
      "sources": [
        {
          "title": "Vlaamse Liberalen en Democraten – Wikipedia (founded 1992, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Vlaamse_Liberalen_en_Democraten"
        },
        {
          "title": "2024 Belgian federal election – Results (7 seats)",
          "url": "https://en.wikipedia.org/wiki/2024_Belgian_federal_election"
        }
      ],
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked"
    }
  ],
  "CH": [
    {
      "id": "CH-SVP",
      "country": "CH",
      "shortName": "SVP",
      "name": "Swiss People's Party",
      "ideology": [
        "Right-wing conservatism",
        "National conservatism",
        "Anti-immigration"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right",
      "founded": 1971,
      "leader": "Marco Chiesa",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "inExecutive": false,
      "seats": 62,
      "seatsTotal": 200,
      "chamberName": "National Council",
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/Swiss_People%27s_Party",
      "sources": [
        {
          "title": "Swiss People's Party – Wikipedia (founded 1971, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Swiss_People%27s_Party"
        },
        {
          "title": "2023 Swiss federal election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2023_Swiss_federal_election"
        }
      ]
    },
    {
      "id": "CH-SP",
      "country": "CH",
      "shortName": "SP",
      "name": "Social Democratic Party",
      "ideology": [
        "Social democracy",
        "Progressivism",
        "Pro-EU"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1863,
      "leader": "Karin Keller-Sütter",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "inExecutive": false,
      "seats": 43,
      "seatsTotal": 200,
      "chamberName": "National Council",
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/Social_Democratic_Party_(Switzerland)",
      "sources": [
        {
          "title": "Social Democratic Party (Switzerland) – Wikipedia (founded 1863, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Social_Democratic_Party_(Switzerland)"
        },
        {
          "title": "2023 Swiss federal election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2023_Swiss_federal_election"
        }
      ]
    },
    {
      "id": "CH-FDP",
      "country": "CH",
      "shortName": "FDP",
      "name": "Free Democratic Party",
      "ideology": [
        "Liberalism",
        "Classical liberalism",
        "Centre-right"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1919,
      "leader": "Beatrice Kappeler",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "seats": 29,
      "seatsTotal": 200,
      "chamberName": "National Council",
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/Free_Democratic_Party_(Switzerland)",
      "sources": [
        {
          "title": "Free Democratic Party (Switzerland) – Wikipedia (founded 1919, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Free_Democratic_Party_(Switzerland)"
        },
        {
          "title": "2023 Swiss federal election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2023_Swiss_federal_election"
        }
      ]
    }
  ],
  "DK": [
    {
      "id": "DK-S",
      "country": "DK",
      "shortName": "S",
      "name": "Social Democrats",
      "ideology": [
        "Social democracy",
        "Progressivism",
        "Welfare state"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1871,
      "leader": "Mette Frederiksen",
      "leaderTitle": "Party Leader & Prime Minister",
      "inPower": true,
      "inExecutive": true,
      "seats": 52,
      "seatsTotal": 179,
      "chamberName": "Folketing",
      "sources": [
        {
          "title": "Social Democrats (Denmark) – Wikipedia (founded 1871, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Social_Democrats_(Denmark)"
        },
        {
          "title": "2022 Danish general election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2022_Danish_general_election"
        }
      ],
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked"
    },
    {
      "id": "DK-V",
      "country": "DK",
      "shortName": "V",
      "name": "Venstre",
      "ideology": [
        "Conservatism",
        "Liberalism",
        "Free-market economy"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1872,
      "leader": "Jakob Ellemann Jensen",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 43,
      "seatsTotal": 179,
      "chamberName": "Folketing",
      "sources": [
        {
          "title": "Venstre (Denmark) – Wikipedia (founded 1872, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Venstre_(Denmark)"
        },
        {
          "title": "2022 Danish general election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2022_Danish_general_election"
        }
      ],
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked"
    },
    {
      "id": "DK-F",
      "country": "DK",
      "shortName": "F",
      "name": "Free Democrats",
      "ideology": [
        "Centrism",
        "Liberalism",
        "Pragmatism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 1998,
      "leader": "Kristian Jensen",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 50,
      "seatsTotal": 179,
      "chamberName": "Folketing",
      "sources": [
        {
          "title": "Free Democrats (Denmark) – Wikipedia (founded 1998, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Free_Democrats_(Denmark)"
        },
        {
          "title": "2022 Danish general election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2022_Danish_general_election"
        }
      ],
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked"
    },
    {
      "id": "DK-SF",
      "country": "DK",
      "shortName": "SF",
      "name": "Socialist People's Party",
      "ideology": [
        "Democratic socialism",
        "Left-wing",
        "Progressivism"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left",
      "founded": 1966,
      "leader": "Pia Olsen Dyhr",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "inExecutive": false,
      "seats": 15,
      "seatsTotal": 179,
      "chamberName": "Folketing",
      "sources": [
        {
          "title": "Socialist People's Party (Denmark) – Wikipedia (founded 1966, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Socialist_People%27s_Party_(Denmark)"
        },
        {
          "title": "2022 Danish general election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2022_Danish_general_election"
        }
      ],
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked"
    },
    {
      "id": "DK-Å",
      "country": "DK",
      "shortName": "Å",
      "name": "The Alternatives",
      "ideology": [
        "Centrism",
        "Environmentalism",
        "Anti-establishment"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 2013,
      "leader": "Uffe Elbæk",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 13,
      "seatsTotal": 179,
      "chamberName": "Folketing",
      "sources": [
        {
          "title": "The Alternatives (Denmark) – Wikipedia (founded 2013, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/The_Alternatives_(Denmark)"
        },
        {
          "title": "2022 Danish general election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2022_Danish_general_election"
        }
      ],
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked"
    },
    {
      "id": "DK-M",
      "country": "DK",
      "shortName": "M",
      "name": "Moderates",
      "ideology": [
        "Conservatism",
        "Centrist conservatism",
        "Pragmatism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 2013,
      "leader": "Lars Løkke Rasmussen",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "inExecutive": false,
      "seats": 12,
      "seatsTotal": 179,
      "chamberName": "Folketing",
      "sources": [
        {
          "title": "Moderates (Denmark) – Wikipedia (founded 2013, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Moderates_(Denmark)"
        },
        {
          "title": "2022 Danish general election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2022_Danish_general_election"
        }
      ],
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked"
    },
    {
      "id": "DK-DF",
      "country": "DK",
      "shortName": "DF",
      "name": "Danish People's Party",
      "ideology": [
        "Right-wing populism",
        "National conservatism",
        "Euroscepticism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 1995,
      "leader": "Morten Messerschmidt",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 8,
      "seatsTotal": 179,
      "chamberName": "Folketing",
      "sources": [
        {
          "title": "Danish People's Party – Wikipedia (founded 1995, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Danish_People%27s_Party"
        },
        {
          "title": "2022 Danish general election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2022_Danish_general_election"
        }
      ],
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked"
    },
    {
      "id": "DK-NY",
      "country": "DK",
      "shortName": "NY",
      "name": "New Right",
      "ideology": [
        "Right-wing populism",
        "Libertarianism",
        "Immigration skepticism"
      ],
      "ideologyPosition": "far-right",
      "positionRaw": "Far-right",
      "founded": 2017,
      "leader": "Rasmus Paludan",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 4,
      "seatsTotal": 179,
      "chamberName": "Folketing",
      "sources": [
        {
          "title": "New Right (Denmark) – Wikipedia (founded 2017, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/New_Right_(Denmark)"
        },
        {
          "title": "2022 Danish general election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2022_Danish_general_election"
        }
      ],
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked"
    }
  ],
  "EG": [
    {
      "id": "EG-MOSTAQBAL",
      "country": "EG",
      "shortName": "Nation's Future",
      "name": "حزب مستقبل وطن",
      "nameEn": "Nation's Future Party",
      "logo": "party-logos/eg/mostaqbal.png",
      "sha256": "36978a5c3bd8c1e36307c08a4c2edd05fca5a8537c7540f501e57de0fc50e03d",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/e/e1/Future_of_the_Nation.png",
      "licenceNote": "Non-free logo hosted in the English Wikipedia file namespace (used under fair use/non-free logo policy to identify the subject); not on Wikimedia Commons.",
      "ideology": [
        "Egyptian nationalism",
        "Post-Islamism",
        "Militarism",
        "Support for President Sisi"
      ],
      "ideologyPosition": "far-right",
      "positionRaw": "Far-right; described as a 'party of power' created to support President Abdel Fattah el-Sisi",
      "founded": 2014,
      "leader": "Abdel-Wahab Abdel-Razeq",
      "leaderTitle": "Chairman",
      "inPower": true,
      "inExecutive": false,
      "timeInPower": "Since 2020 (largest party in the House of Representatives)",
      "seats": 231,
      "seatsTotal": 596,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Nation's Future Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Nation%27s_Future_Party"
        },
        {
          "title": "2025 Egyptian parliamentary election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2025_Egyptian_parliamentary_election"
        }
      ]
    },
    {
      "id": "EG-HOMAT",
      "country": "EG",
      "shortName": "Homeland Defenders",
      "name": "حزب حماة الوطن",
      "nameEn": "Homeland Defenders Party",
      "logo": "party-logos/eg/homat-alwatan.png",
      "sha256": "1a677f5e31ae24484dea4aac5beca3ac25a9dc4dddd644784e2cec2dc6a5e20e",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/4/4a/Homeland_Defenders_Party_logo.png",
      "licenceNote": "Non-free logo hosted in the English Wikipedia file namespace (used under fair use/non-free logo policy to identify the subject); not on Wikimedia Commons.",
      "ideology": [
        "Centrism",
        "Support for President Sisi"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centrist; supportive of President Abdel Fattah el-Sisi",
      "founded": 2013,
      "leader": "Ahmed El Awadi",
      "leaderTitle": "Acting Chairman (following the death of founder Galal Haridy in January 2026)",
      "inPower": true,
      "inExecutive": false,
      "timeInPower": "Since 2020",
      "seats": 91,
      "seatsTotal": 596,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Homeland Defenders Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Homeland_Defenders_Party"
        },
        {
          "title": "2025 Egyptian parliamentary election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2025_Egyptian_parliamentary_election"
        }
      ]
    },
    {
      "id": "EG-NATFRONT",
      "country": "EG",
      "shortName": "National Front",
      "name": "حزب الجبهة الوطنية",
      "nameEn": "National Front Party",
      "logo": "party-logos/eg/national-front.png",
      "sha256": "07cacc006fcf997d6dcb2be52bef5d07390a5c6ca0481508861d51eeca72052d",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/8/85/National_Front_Party_Egypt.png",
      "licenceNote": "Non-free logo hosted in the English Wikipedia file namespace (used under fair use/non-free logo policy to identify the subject); not on Wikimedia Commons.",
      "ideology": [
        "Pragmatism",
        "Support for President Sisi"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Big tent / pragmatism (realpolitik)",
      "founded": 2024,
      "leader": "Assem el Gazzar",
      "leaderTitle": "Chairman",
      "inPower": true,
      "inExecutive": false,
      "timeInPower": "Since 2025",
      "seats": 70,
      "seatsTotal": 596,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "National Front Party (Egypt) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/National_Front_Party_(Egypt)"
        },
        {
          "title": "2025 Egyptian parliamentary election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2025_Egyptian_parliamentary_election"
        }
      ]
    },
    {
      "id": "EG-REPUBPEOPLE",
      "country": "EG",
      "shortName": "Republican People's",
      "name": "حزب الشعب الجمهوري",
      "nameEn": "Republican People's Party",
      "logo": "party-logos/eg/republican-peoples.png",
      "sha256": "296b27057fccd24c959ffa9f3f6841f76d4e49f45afc7ad9ba23c40f0ac9e0a5",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/3/3a/Republican_People%27s_Party_%28Egypt%29.png",
      "licenceNote": "Non-free logo hosted in the English Wikipedia file namespace (used under fair use/non-free logo policy to identify the subject); not on Wikimedia Commons.",
      "ideology": [
        "Centrism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre; made up largely of former government ministers",
      "founded": 2012,
      "leader": "Hazem Omar",
      "leaderTitle": "President",
      "inPower": true,
      "inExecutive": false,
      "timeInPower": "Since 2020",
      "seats": 28,
      "seatsTotal": 596,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Republican People's Party (Egypt) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Republican_People%27s_Party_(Egypt)"
        },
        {
          "title": "2025 Egyptian parliamentary election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2025_Egyptian_parliamentary_election"
        }
      ]
    },
    {
      "id": "EG-SOCDEM",
      "country": "EG",
      "shortName": "Social Democratic",
      "name": "الحزب المصري الديمقراطي الاجتماعي",
      "nameEn": "Egyptian Social Democratic Party",
      "logo": "party-logos/eg/social-democratic.svg",
      "sha256": "082359241dd1af9c8a70be1b09b981367e4b986228a6f3f2ab709b1f4cdac15b",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/1/1b/Egyptian_Social_Democratic_Party_logo.svg",
      "licenceNote": "Non-free logo hosted in the English Wikipedia file namespace (used under fair use/non-free logo policy to identify the subject); not on Wikimedia Commons.",
      "ideology": [
        "Social democracy",
        "Social liberalism",
        "Progressivism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 2011,
      "leader": "Farid Zahran",
      "leaderTitle": "President",
      "inPower": true,
      "inExecutive": false,
      "timeInPower": "Since 2020",
      "seats": 12,
      "seatsTotal": 596,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Egyptian Social Democratic Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Egyptian_Social_Democratic_Party"
        },
        {
          "title": "2025 Egyptian parliamentary election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2025_Egyptian_parliamentary_election"
        }
      ]
    },
    {
      "id": "EG-WAFD",
      "country": "EG",
      "shortName": "New Wafd",
      "name": "حزب الوفد المصري",
      "nameEn": "Egyptian (New) Wafd Party",
      "logo": "party-logos/eg/wafd.png",
      "sha256": "62a3fa3eeff9358deee7303a47a341b940baa45cafe810853a04cf4ab10495df",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d6/Wafd_Party_logo.png",
      "ideology": [
        "National liberalism",
        "Liberal conservatism",
        "Economic liberalism",
        "Conservative liberalism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1978,
      "leader": "El-Sayyid el-Badawi",
      "leaderTitle": "Chairperson (since January 2026)",
      "inPower": true,
      "inExecutive": false,
      "timeInPower": "Since 2020",
      "seats": 12,
      "seatsTotal": 596,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "New Wafd Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/New_Wafd_Party"
        },
        {
          "title": "2025 Egyptian parliamentary election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2025_Egyptian_parliamentary_election"
        }
      ]
    },
    {
      "id": "EG-JUSTICE",
      "country": "EG",
      "shortName": "Justice",
      "name": "حزب العدل",
      "nameEn": "Justice Party",
      "logo": "party-logos/eg/justice.svg",
      "sha256": "b188dc0b940e6bc40ed554bbd451ea010e5f8d30f49e12ab5000afae14da4439",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/commons/e/ea/Gerechtigkeitspartei_Logo.svg",
      "ideology": [
        "Big tent",
        "Liberalism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centrism; describes itself as a party of political programs rather than a fixed ideology",
      "founded": 2011,
      "leader": "Abdel-Moneim Imam",
      "leaderTitle": "President",
      "inPower": true,
      "timeInPower": "Since 2020",
      "seats": 11,
      "seatsTotal": 596,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Justice Party (Egypt) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Justice_Party_(Egypt)"
        },
        {
          "title": "2025 Egyptian parliamentary election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2025_Egyptian_parliamentary_election"
        }
      ]
    },
    {
      "id": "EG-REFORMDEV",
      "country": "EG",
      "shortName": "Reform and Development",
      "name": "حزب الإصلاح والتنمية",
      "nameEn": "Reform and Development Party",
      "logo": "party-logos/eg/reform-development.png",
      "sha256": "2e29ecf54dc13c617b020837891af759b6a3ef4498ad6a0a235068a2fbd662d4",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/a/a5/Reform_and_Development_Party_EG.png",
      "licenceNote": "Non-free logo hosted in the English Wikipedia file namespace (used under fair use/non-free logo policy to identify the subject); not on Wikimedia Commons.",
      "ideology": [
        "Liberalism",
        "Reformism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre to centre-left; has gradually distanced itself from President Sisi",
      "founded": 2009,
      "leader": "Mohamed Anwar Esmat Sadat",
      "leaderTitle": "Chairman",
      "inPower": true,
      "timeInPower": "Since 2025 (confirmed October 2025 as a National Unified List member)",
      "seats": 11,
      "seatsTotal": 596,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Reform and Development Party (Egypt) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Reform_and_Development_Party_(Egypt)"
        },
        {
          "title": "2025 Egyptian parliamentary election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2025_Egyptian_parliamentary_election"
        }
      ]
    },
    {
      "id": "EG-NOUR",
      "country": "EG",
      "shortName": "Al-Nour",
      "name": "حزب النور",
      "nameEn": "Al-Nour Party (Party of the Light)",
      "logo": "party-logos/eg/al-nour.png",
      "sha256": "0b1ffc9af5297c07bd6f9f48b4a7e558073b8dda3351cf8ada25a5cd927c0854",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/a/a4/Logo_of_the_Al-Nour_Party.png",
      "licenceNote": "Non-free logo hosted in the English Wikipedia file namespace (used under fair use/non-free logo policy to identify the subject); not on Wikimedia Commons.",
      "ideology": [
        "Salafism",
        "Sunni Islamism",
        "Religious conservatism"
      ],
      "ideologyPosition": "far-right",
      "positionRaw": "Right-wing to far-right; ultra-conservative Islamist, the political arm of the Salafi Call Society",
      "founded": 2011,
      "leader": "Yunis Makhyun",
      "leaderTitle": "Chairperson",
      "inPower": true,
      "timeInPower": "Since 2012 (continuously represented in parliament)",
      "seats": 6,
      "seatsTotal": 596,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Al-Nour Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Al-Nour_Party"
        },
        {
          "title": "2025 Egyptian parliamentary election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2025_Egyptian_parliamentary_election"
        }
      ]
    },
    {
      "id": "EG-TAGAMMU",
      "country": "EG",
      "shortName": "Tagammu",
      "name": "حزب التجمع الوطني التقدمي الوحدوي",
      "nameEn": "National Progressive Unionist Rally Party (Tagammu)",
      "logo": "party-logos/eg/tagammu.png",
      "sha256": "4d5f556bd66c1fdfdd55363360423dd0175c9f204672521a883bd1043f0fa907",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/0/0a/Logo_of_the_National_Progressive_Unionist_Party.png",
      "licenceNote": "Non-free logo hosted in the English Wikipedia file namespace (used under fair use/non-free logo policy to identify the subject); not on Wikimedia Commons.",
      "ideology": [
        "Socialism",
        "Arab nationalism"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing; defends the social gains of the 1952 Egyptian Revolution",
      "founded": 1977,
      "leader": "Sayed Abdel Aal",
      "leaderTitle": "President",
      "inPower": true,
      "timeInPower": "Since 2020",
      "seats": 5,
      "seatsTotal": 596,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "National Progressive Unionist Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/National_Progressive_Unionist_Party"
        },
        {
          "title": "2025 Egyptian parliamentary election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2025_Egyptian_parliamentary_election"
        }
      ]
    },
    {
      "id": "EG-CONGRESS",
      "country": "EG",
      "shortName": "Egyptian Congress",
      "name": "حزب المؤتمر المصري",
      "nameEn": "Egyptian Congress Party",
      "logo": "party-logos/eg/egyptian-congress.png",
      "sha256": "fc4b18cff7756c67dcf3d8bf364c22662798dae6d20d1757ebdc9784e8e43604",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/b/ba/Egyptian_Congress_Party_logo.png",
      "licenceNote": "Non-free logo hosted in the English Wikipedia file namespace (used under fair use/non-free logo policy to identify the subject); not on Wikimedia Commons.",
      "ideology": [
        "Secularism",
        "Liberalism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left; secularist, formed from a merger of 25 liberal and leftist parties",
      "founded": 2012,
      "leader": "Omar El-Mokhtar Semeida",
      "leaderTitle": "Chairperson",
      "inPower": true,
      "timeInPower": "Since 2020",
      "seats": 4,
      "seatsTotal": 596,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Egyptian Congress Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Egyptian_Congress_Party"
        },
        {
          "title": "2025 Egyptian parliamentary election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2025_Egyptian_parliamentary_election"
        }
      ]
    },
    {
      "id": "EG-FREEDOM",
      "country": "EG",
      "shortName": "Egyptian Freedom",
      "name": "حزب الحرية المصري",
      "nameEn": "Egyptian Freedom Party",
      "logo": "party-logos/eg/egyptian-freedom.png",
      "sha256": "d551c2edfd0d97ae4cfe96073a9c414e26a12624953b7cbe7405287101aded42",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/d/dd/Logo_of_the_Egyptian_Freedom_Party.png",
      "licenceNote": "Non-free logo hosted in the English Wikipedia file namespace (used under fair use/non-free logo policy to identify the subject); not on Wikimedia Commons.",
      "ideology": [
        "Liberalism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 2011,
      "leader": "Mamdouh Hassan",
      "leaderTitle": "Chairman",
      "inPower": true,
      "timeInPower": "Since 2020",
      "seats": 2,
      "seatsTotal": 596,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Egyptian Freedom Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Egyptian_Freedom_Party"
        },
        {
          "title": "2025 Egyptian parliamentary election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2025_Egyptian_parliamentary_election"
        }
      ]
    },
    {
      "id": "EG-ERADETGEEL",
      "country": "EG",
      "shortName": "Eradet Geel",
      "name": "حزب إرادة جيل",
      "nameEn": "Will of a Generation Party",
      "logo": "party-logos/eg/eradet-geel.png",
      "sha256": "ddcb7957fb8a1f56dea183964ca10e8962e2f4ff3e78b2147dfbd5ad651121d3",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/d/d9/Will_of_a_Generation_Party.png",
      "licenceNote": "Non-free logo hosted in the English Wikipedia file namespace (used under fair use/non-free logo policy to identify the subject); not on Wikimedia Commons.",
      "ideology": [
        "Egyptian nationalism",
        "Statism",
        "Pragmatism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre; pro-state alliance member",
      "founded": 2018,
      "previousNames": [
        {
          "name": "Free Social Constitutional Party",
          "years": "until 25 December 2018"
        }
      ],
      "leader": "Tayseer Matar",
      "leaderTitle": "Founder and Chairman",
      "inPower": true,
      "timeInPower": "Since 2020",
      "seats": 2,
      "seatsTotal": 596,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Will of a Generation Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Will_of_a_Generation_Party"
        },
        {
          "title": "2025 Egyptian parliamentary election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2025_Egyptian_parliamentary_election"
        }
      ]
    },
    {
      "id": "EG-CONSCIOUSNESS",
      "country": "EG",
      "shortName": "Consciousness",
      "name": "حزب الوعي",
      "nameEn": "Consciousness Party (Awareness Party)",
      "noImageReason": "No freely licensed party logo/emblem could be located: the party's article on both English and Arabic Wikipedia is a short stub carrying no infobox image, and no dedicated logo file for it was found on Wikimedia Commons.",
      "ideology": [
        "Liberalism",
        "Secularism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Liberal/secular; originally part of the liberal-leftist Egyptian Bloc alliance",
      "founded": 2011,
      "leader": "Mahmoud Taher",
      "leaderTitle": "Chairman",
      "inPower": true,
      "timeInPower": "Since 2025",
      "seats": 1,
      "seatsTotal": 596,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Consciousness Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Consciousness_Party"
        },
        {
          "title": "2025 Egyptian parliamentary election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2025_Egyptian_parliamentary_election"
        }
      ]
    },
    {
      "id": "EG-CONSERVATIVE",
      "country": "EG",
      "shortName": "Conservative",
      "name": "حزب المحافظين",
      "nameEn": "Conservative Party",
      "logo": "party-logos/eg/conservative.png",
      "sha256": "5a03f86646685ea72d1b49500a845ada247731a4d61f7cb3436808424df876e7",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/1/14/Conservative_Party_%28Egypt%29.png",
      "licenceNote": "Non-free logo hosted in the English Wikipedia file namespace (used under fair use/non-free logo policy to identify the subject); not on Wikimedia Commons.",
      "ideology": [
        "Conservatism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Opposition to the government; conservative",
      "founded": 2006,
      "leader": "Akmal Kortam",
      "leaderTitle": "President",
      "inPower": false,
      "timeInPower": "Opposition party; holds 1 seat since the 2025 election, contested as part of the Free Path Alliance with the Constitution Party",
      "seats": 1,
      "seatsTotal": 596,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Conservative Party (Egypt) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Conservative_Party_(Egypt)"
        },
        {
          "title": "2025 Egyptian parliamentary election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2025_Egyptian_parliamentary_election"
        }
      ]
    }
  ],
  "FI": [
    {
      "id": "FI-KOK",
      "country": "FI",
      "shortName": "KOK",
      "name": "National Coalition",
      "ideology": [
        "Conservatism",
        "Economic liberalism",
        "Centre-right",
        "Pro-EU"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1918,
      "leader": "Petteri Orpo",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "seats": 48,
      "seatsTotal": 200,
      "chamberName": "Eduskunta",
      "logo": "party-logos/fi/kok.svg",
      "sha256": "576b628f872a7fd2811712649b9346fbb893d93f06de354b2f7f40b2776d6be3",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Kok_logo.svg",
      "sources": [
        {
          "title": "National Coalition Party – Wikipedia (founded 1918, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/National_Coalition_Party"
        },
        {
          "title": "2023 Finnish parliamentary election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2023_Finnish_parliamentary_election"
        }
      ]
    },
    {
      "id": "FI-PS",
      "country": "FI",
      "shortName": "PS",
      "name": "Finns Party",
      "ideology": [
        "Right-wing populism",
        "National conservatism",
        "Euroscepticism",
        "Immigration skepticism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 2011,
      "leader": "Riikka Purra",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 46,
      "seatsTotal": 200,
      "chamberName": "Eduskunta",
      "logo": "party-logos/fi/ps.svg",
      "sha256": "cc17b28a1dc9cf61231d13d5b3c47287cc200217428239704d1792702e0023a8",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Finns_Party_logo.svg",
      "sources": [
        {
          "title": "Finns Party – Wikipedia (founded 2011, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Finns_Party"
        },
        {
          "title": "2023 Finnish parliamentary election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2023_Finnish_parliamentary_election"
        }
      ]
    },
    {
      "id": "FI-SDP",
      "country": "FI",
      "shortName": "SDP",
      "name": "Social Democrats",
      "ideology": [
        "Social democracy",
        "Progressivism",
        "Welfare state"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1899,
      "leader": "Pekka Haavisto",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 41,
      "seatsTotal": 200,
      "chamberName": "Eduskunta",
      "logo": "party-logos/fi/sdp.svg",
      "sha256": "1514c639b4a996e4614c2203cca8908b8f8eb2bba8912c91ba0a7933e66c342e",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:SDP_logo.svg",
      "sources": [
        {
          "title": "Finnish Social Democratic Party – Wikipedia (founded 1899, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Finnish_Social_Democratic_Party"
        },
        {
          "title": "2023 Finnish parliamentary election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2023_Finnish_parliamentary_election"
        }
      ]
    },
    {
      "id": "FI-KESK",
      "country": "FI",
      "shortName": "KESK",
      "name": "Centre Party",
      "ideology": [
        "Liberalism",
        "Agrarianism",
        "Pragmatism",
        "Welfare state"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 1906,
      "leader": "Annika Saarikko",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 34,
      "seatsTotal": 200,
      "chamberName": "Eduskunta",
      "logo": "party-logos/fi/kesk.svg",
      "sha256": "39865f7566e851617fba78790fc526c9a3188b35760f68580a9a1e10e1dc3817",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Suomen_Keskusta_logo.svg",
      "sources": [
        {
          "title": "Centre Party (Finland) – Wikipedia (founded 1906, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Centre_Party_(Finland)"
        },
        {
          "title": "2023 Finnish parliamentary election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2023_Finnish_parliamentary_election"
        }
      ]
    },
    {
      "id": "FI-VAS",
      "country": "FI",
      "shortName": "VAS",
      "name": "Left Alliance",
      "ideology": [
        "Democratic socialism",
        "Left-wing",
        "Anti-capitalism"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing",
      "founded": 1990,
      "leader": "Li Andersson",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 16,
      "seatsTotal": 200,
      "chamberName": "Eduskunta",
      "logo": "party-logos/fi/vas.svg",
      "sha256": "3bd41a47719562e977d5f50ed2881eb308ecb692f1aac61e3130dbb9372c81eb",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Vas_logo.svg",
      "sources": [
        {
          "title": "Left Alliance – Wikipedia (founded 1990, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Left_Alliance_(Finland)"
        },
        {
          "title": "2023 Finnish parliamentary election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2023_Finnish_parliamentary_election"
        }
      ]
    },
    {
      "id": "FI-RKP",
      "country": "FI",
      "shortName": "RKP",
      "name": "Swedish People's Party",
      "ideology": [
        "Liberalism",
        "Centre-liberalism",
        "Swedish-language minority interests",
        "Pro-EU"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 1906,
      "leader": "Anna-Maja Henriksson",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "seats": 12,
      "seatsTotal": 200,
      "chamberName": "Eduskunta",
      "logo": "party-logos/fi/rkp.svg",
      "sha256": "571426e518e34bb68213851d2df28c551aba6d96ea76162f58ae54b85158a3da",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:SFP_logo.svg",
      "sources": [
        {
          "title": "Swedish People's Party – Wikipedia (founded 1906, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Swedish_People%27s_Party"
        },
        {
          "title": "2023 Finnish parliamentary election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2023_Finnish_parliamentary_election"
        }
      ]
    },
    {
      "id": "FI-VIHR",
      "country": "FI",
      "shortName": "VIHR",
      "name": "Green League",
      "ideology": [
        "Environmentalism",
        "Green politics",
        "Progressivism",
        "Feminism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1987,
      "leader": "Iiris Suomela",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 12,
      "seatsTotal": 200,
      "chamberName": "Eduskunta",
      "logo": "party-logos/fi/vihr.svg",
      "sha256": "2e774fa16c256d854fc565210db93c2bb625bb1a7a5b460c20717e22dfe1297d",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Vihr_logo.svg",
      "sources": [
        {
          "title": "Green League – Wikipedia (founded 1987, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Green_League_(Finland)"
        },
        {
          "title": "2023 Finnish parliamentary election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2023_Finnish_parliamentary_election"
        }
      ]
    },
    {
      "id": "FI-KD",
      "country": "FI",
      "shortName": "KD",
      "name": "Christian Democrats",
      "ideology": [
        "Christian democracy",
        "Social conservatism",
        "Family values",
        "Centre-right"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1958,
      "leader": "Sari Essayah",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "seats": 6,
      "seatsTotal": 200,
      "chamberName": "Eduskunta",
      "logo": "party-logos/fi/kd.svg",
      "sha256": "180ba7384e2e1bff7b77ccd63e753b81cb9744d7b8c5a05c66567978b8e5a639",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Kd_logo.svg",
      "sources": [
        {
          "title": "Christian Democrats (Finland) – Wikipedia (founded 1958, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Christian_Democrats_(Finland)"
        },
        {
          "title": "2023 Finnish parliamentary election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2023_Finnish_parliamentary_election"
        }
      ]
    }
  ],
  "GR": [
    {
      "id": "GR-ND",
      "country": "GR",
      "shortName": "ND",
      "name": "New Democracy",
      "ideology": [
        "Conservatism",
        "Right-wing liberalism",
        "Pro-EU"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1974,
      "leader": "Kyriakos Mitsotakis",
      "leaderTitle": "Party Leader & Prime Minister",
      "inPower": true,
      "seats": 158,
      "seatsTotal": 300,
      "chamberName": "Parliament",
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/New_Democracy_(Greece)",
      "sources": [
        {
          "title": "New Democracy (Greece) – Wikipedia (founded 1974, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/New_Democracy_(Greece)"
        },
        {
          "title": "2023 Greek legislative election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2023_Greek_legislative_election"
        }
      ]
    },
    {
      "id": "GR-PASOK",
      "country": "GR",
      "shortName": "PASOK",
      "name": "Panhellenic Socialist Movement",
      "ideology": [
        "Social democracy",
        "Progressivism",
        "Centre-left"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1974,
      "leader": "Nikos Androulakis",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 31,
      "seatsTotal": 300,
      "chamberName": "Parliament",
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/Panhellenic_Socialist_Movement",
      "sources": [
        {
          "title": "Panhellenic Socialist Movement – Wikipedia (founded 1974, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Panhellenic_Socialist_Movement"
        },
        {
          "title": "2023 Greek legislative election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2023_Greek_legislative_election"
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
  "KE": [
    {
      "id": "KE-UDA",
      "country": "KE",
      "shortName": "UDA",
      "name": "United Democratic Alliance",
      "logo": "party-logos/ke/uda.png",
      "sha256": "691467bfd898b226fdb30b754987ebf4cc287f77db8585d43ed3adf37525bdb7",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/0/07/United_Democratic_Alliance_%28Kenya%29_logo.png",
      "licenceNote": "Non-free party logo hosted on English Wikipedia (not Wikimedia Commons) under a fair-use rationale for identifying the political party in its own article; used here for the same identifying purpose.",
      "ideology": [
        "Conservatism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 2020,
      "previousNames": [
        {
          "name": "Party of Action",
          "years": "2012–2016"
        },
        {
          "name": "Party of Development and Reforms",
          "years": "2016–2020"
        }
      ],
      "leader": "William Ruto",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "timeInPower": "2022-present",
      "seats": 143,
      "seatsTotal": 349,
      "chamberName": "National Assembly",
      "logoMeaning": {
        "description": "UDA's emblem is a wheelbarrow, chosen by founder William Ruto to represent his 'hustler' economic message and the dignity of manual labour and small-scale trade — the same wheelbarrow motif later appeared on Ruto's presidential standard after he became President in 2022. The party's earlier incarnation (Party of Development and Reforms) had used a bull as its symbol before the 2020 rebrand to UDA and the wheelbarrow.",
        "sources": [
          {
            "title": "DP Ruto defends choice of the wheelbarrow as symbol of his UDA party - Citizen Digital",
            "url": "https://www.citizen.digital/news/dp-ruto-defends-choice-of-the-wheelbarrow-as-symbol-of-his-uda-party-13099734"
          },
          {
            "title": "Wheelbarrow to feature in Ruto's presidential Standard - Capital News",
            "url": "https://www.capitalfm.co.ke/news/2022/09/wheelbarrow-to-feature-in-rutos-presidential-standard/"
          }
        ],
        "myths": []
      },
      "sources": [
        {
          "title": "United Democratic Alliance (Kenya) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/United_Democratic_Alliance_(Kenya)"
        }
      ]
    },
    {
      "id": "KE-ANC",
      "country": "KE",
      "shortName": "ANC",
      "name": "Amani National Congress",
      "noImageReason": "Attempted to bundle the Commons-hosted infobox logo at https://upload.wikimedia.org/wikipedia/commons/a/ab/Amani_National_Congress.png (from https://en.wikipedia.org/wiki/Amani_National_Congress), but upload.wikimedia.org returned HTTP 429 (rate limited) on every retry this session; a leftover file at this path from a prior session was also confirmed to be a saved 429 error page, not image data. A future session should retry this exact URL.",
      "ideology": [
        "Social liberalism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 2015,
      "leader": "Musalia Mudavadi",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "timeInPower": "2022-present",
      "seats": 7,
      "seatsTotal": 349,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Amani National Congress - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Amani_National_Congress"
        }
      ]
    },
    {
      "id": "KE-FORD-K",
      "country": "KE",
      "shortName": "FORD-K",
      "name": "Forum for the Restoration of Democracy–Kenya",
      "logo": "party-logos/ke/ford-k.png",
      "sha256": "7cea86ee6d3addd2173b86f9cbc5f421348d7102157da9866b77949ea92d8aa9",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/1/17/FORD_-_KENYA_logo.png",
      "licenceNote": "Non-free party logo hosted on English Wikipedia (not Wikimedia Commons) under a fair-use rationale for identifying the political party in its own article; used here for the same identifying purpose.",
      "ideology": [
        "Social democracy"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1992,
      "previousNames": [
        {
          "name": "Forum for the Restoration of Democracy",
          "years": "1991–1992"
        }
      ],
      "leader": "Moses Wetangula",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "timeInPower": "2022-present",
      "seats": 6,
      "seatsTotal": 349,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Forum for the Restoration of Democracy – Kenya - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Forum_for_the_Restoration_of_Democracy_%E2%80%93_Kenya"
        }
      ]
    },
    {
      "id": "KE-JUBILEE",
      "country": "KE",
      "shortName": "Jubilee",
      "name": "Jubilee Party of Kenya",
      "logo": "party-logos/ke/jubilee.svg",
      "sha256": "0d0285b228247839ba15649db07ee74616d7c851438466ed95c3148a6789c4a1",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/7/74/Logo_for_the_Kenyan_polticial_party_Jubilee%2C_taken_from_its_official_website_jubileeparty.ke.svg",
      "licenceNote": "Non-free party logo hosted on English Wikipedia (not Wikimedia Commons), taken from the party's own website (jubileeparty.ke) under a fair-use rationale; used here for the same identifying purpose.",
      "ideology": [
        "Conservatism",
        "National conservatism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right to right-wing",
      "founded": 2016,
      "leader": "Uhuru Kenyatta",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 30,
      "seatsTotal": 349,
      "chamberName": "National Assembly",
      "logoMeaning": {
        "description": "Jubilee's 2016 logo combined the red of founding member The National Alliance with the yellow and black of the United Republican Party. After the 2018 Kenyatta–Odinga 'handshake' and the 2021–2022 falling-out between President Kenyatta and his deputy William Ruto, the party rebranded to a red-and-white design in which the former handshake emblem was replaced by a dove carrying an olive branch, symbolising peace and a fresh direction, while dropping URP's yellow and black as a visual break from Ruto.",
        "sources": [
          {
            "title": "Jubilee Rebrands With New Slogan, Ditches Ruto Colours - Kenyans.co.ke",
            "url": "https://www.kenyans.co.ke/news/71755-jubilee-rebrands-new-slogan-ditches-ruto-colours"
          },
          {
            "title": "New Jubilee Party logo and colours in rebrand plan - Daily Nation",
            "url": "https://nation.africa/kenya/news/politics/new-jubilee-logo-colours-in-rebrand-plan-3461462"
          }
        ],
        "myths": []
      },
      "sources": [
        {
          "title": "Jubilee Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Jubilee_Party"
        }
      ]
    },
    {
      "id": "KE-KANU",
      "country": "KE",
      "shortName": "KANU",
      "name": "Kenya African National Union",
      "logo": "party-logos/ke/kanu.png",
      "sha256": "77adb13b037ddd551c6ac34ab18d0f4d9e33589eeb62d3f282bc7a8787d02cd7",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/4/41/Kenya_African_National_Union_flag.png",
      "licenceNote": "Non-free party flag/logo hosted on English Wikipedia (not Wikimedia Commons) under a fair-use rationale for identifying the political party in its own article; used here for the same identifying purpose.",
      "ideology": [
        "Kenyan nationalism",
        "Conservatism",
        "African nationalism",
        "Pan-Africanism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right to right-wing",
      "founded": 1960,
      "previousNames": [
        {
          "name": "Kenya African Union",
          "years": "1944–1960"
        }
      ],
      "leader": "Gideon Moi",
      "leaderTitle": "Chairman",
      "inPower": false,
      "seats": 5,
      "seatsTotal": 349,
      "chamberName": "National Assembly",
      "logoMeaning": {
        "description": "KANU's flag and emblem feature a white cockerel (rooster) on a black-red-green tricolour. In African tradition the rooster is the fowl that announces the dawn, and it was adopted to symbolise the 'break of a new dawn' — Kenyan independence, which KANU led. The design directly inspired Kenya's national flag (the same black-red-green bands), though the cockerel itself was replaced by the Maasai shield and crossed spears on the national flag at independence.",
        "sources": [
          {
            "title": "Flags, Symbols, & Currencies of Kenya - World Atlas",
            "url": "https://www.worldatlas.com/flags/kenya"
          },
          {
            "title": "Kenya African National Union (KANU) flag - Flags of the World",
            "url": "https://www.crwflags.com/fotw/flags/ke%7Dkanu.html"
          }
        ],
        "myths": []
      },
      "sources": [
        {
          "title": "Kenya African National Union - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Kenya_African_National_Union"
        }
      ]
    },
    {
      "id": "KE-ODM",
      "country": "KE",
      "shortName": "ODM",
      "name": "Orange Democratic Movement",
      "logo": "party-logos/ke/odm.png",
      "sha256": "a28a6527bf8100764491d5e372354f3ebf53beec5a316694d5fdce741c427ff8",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/4/43/ODM_Party_Logo.png",
      "licenceNote": "Non-free party logo hosted on English Wikipedia (not Wikimedia Commons) under a fair-use rationale for identifying the political party in its own article; used here for the same identifying purpose.",
      "ideology": [
        "Social democracy",
        "Populism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 2005,
      "previousNames": [
        {
          "name": "Orange Democratic Movement–Kenya",
          "years": "2005–2007"
        }
      ],
      "leader": "Oburu Odinga",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 89,
      "seatsTotal": 349,
      "chamberName": "National Assembly",
      "logoMeaning": {
        "description": "ODM takes its name and orange colour from the 2005 constitutional referendum, in which ballot symbols represented each side of the vote: a banana for 'yes' and an orange for 'no'. The 'no' campaign, which won with 58% of the vote, adopted the orange as its rallying symbol, and the coalition that grew out of it — later a registered party — kept the name and colour.",
        "sources": [
          {
            "title": "United stand in vote against 2005 constitution gave birth to Orange - Daily Nation",
            "url": "https://nation.africa/kenya/news/Orange-Democratic-Movement/1950946-2223566-format-xhtml-xh57ti/index.html"
          },
          {
            "title": "Orange Democratic Movement - Mzalendo",
            "url": "https://info.mzalendo.com/organisation/odm/"
          }
        ],
        "myths": []
      },
      "sources": [
        {
          "title": "Orange Democratic Movement - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Orange_Democratic_Movement"
        }
      ]
    },
    {
      "id": "KE-WPF",
      "country": "KE",
      "shortName": "WPF",
      "name": "Wiper Patriotic Front",
      "logo": "party-logos/ke/wpf.png",
      "sha256": "eb17d6155d7fa4bf418baa86977940dd072eadc82af0f19a66e069348efb5434",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/8/83/Logo_of_the_Wiper_Patriotic_Front.png",
      "licenceNote": "Non-free party logo hosted on English Wikipedia (not Wikimedia Commons) under a fair-use rationale for identifying the political party in its own article; used here for the same identifying purpose.",
      "ideology": [
        "Social democracy"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 2006,
      "previousNames": [
        {
          "name": "Orange Democratic Movement–Kenya",
          "years": "2006–2007"
        },
        {
          "name": "Wiper Democratic Movement–Kenya",
          "years": "2007–2025"
        }
      ],
      "leader": "Kalonzo Musyoka",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 26,
      "seatsTotal": 349,
      "chamberName": "National Assembly",
      "logoMeaning": {
        "description": "The umbrella has been the party's consistent emblem through each of its renamings (from ODM-Kenya through Wiper Democratic Movement to today's Wiper Patriotic Front), and was retained even when the party dropped 'Kenya' from its name in a 2021 rebrand. The party states its colours are meant to embody dependability and understanding (royal blue), purity and clarity (white) and power and life (earth red), with the umbrella itself standing for shelter, unity and resilience.",
        "sources": [
          {
            "title": "Kalonzo launches 5-day challenge for Wiper logo redesign - People Daily",
            "url": "https://peopledaily.digital/news/kalonzo-launches-5-day-challenge-for-wiper-logo-redesign"
          },
          {
            "title": "Why Kalonzo is dropping Wiper from his party name - Daily Nation",
            "url": "https://nation.africa/kenya/news/politics/why-kalonzo-is-dropping-wiper-from-his-party-name--5017504"
          }
        ],
        "myths": []
      },
      "sources": [
        {
          "title": "Wiper Patriotic Front - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Wiper_Patriotic_Front"
        }
      ]
    }
  ],
  "KR": [
    {
      "id": "KR-DP",
      "country": "KR",
      "shortName": "DP",
      "name": "더불어민주당",
      "nameEn": "Democratic Party of Korea",
      "logo": "party-logos/kr/dp.svg",
      "sha256": "2412cc144df411f119f5f3725d37dc073aa9dc6b508e47fe74ac7608306c8bda",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/commons/4/41/2024_Logo_of_the_Democratic_Party_of_Korea.svg",
      "ideology": [
        "Liberalism (South Korean)",
        "Social liberalism",
        "Centrist reformism",
        "Economic interventionism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre to centre-left",
      "founded": 2014,
      "previousNames": [
        {
          "name": "새정치민주연합",
          "nameEn": "New Politics Alliance for Democracy",
          "years": "2014–2015"
        }
      ],
      "leader": "Kim Min-seok",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "timeInPower": "2025-present",
      "seats": 161,
      "seatsTotal": 300,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Democratic Party of Korea - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Democratic_Party_of_Korea"
        },
        {
          "title": "Kim Min-seok wins DPK leadership race over Jung Chung-rae - The Korea Times",
          "url": "https://www.koreatimes.co.kr/southkorea/politics/20260817/kim-min-seok-wins-dpk-leadership-race-over-jung-chung-rae"
        },
        {
          "title": "List of members of the National Assembly (South Korea), 2024–2028 - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/List_of_members_of_the_National_Assembly_(South_Korea),_2024%E2%80%932028"
        }
      ]
    },
    {
      "id": "KR-PPP",
      "country": "KR",
      "shortName": "PPP",
      "name": "국민의힘",
      "nameEn": "People Power Party",
      "logo": "party-logos/kr/ppp.svg",
      "sha256": "27c5c1fef677593256a07f0533a12387270c31552ad719ec2ca3e1e0145df25e",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_of_People_Power_Party_of_Korea.svg",
      "ideology": [
        "Conservatism (South Korean)",
        "South Korean nationalism",
        "Right-wing populism",
        "Anti-communism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing to far-right",
      "founded": 2020,
      "previousNames": [
        {
          "name": "미래통합당",
          "nameEn": "United Future Party",
          "years": "2020"
        }
      ],
      "leader": "Jang Dong-hyeok",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 109,
      "seatsTotal": 300,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "People Power Party (South Korea) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/People_Power_Party_(South_Korea)"
        },
        {
          "title": "List of members of the National Assembly (South Korea), 2024–2028 - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/List_of_members_of_the_National_Assembly_(South_Korea),_2024%E2%80%932028"
        }
      ]
    },
    {
      "id": "KR-RKP",
      "country": "KR",
      "shortName": "RKP",
      "name": "조국혁신당",
      "nameEn": "Rebuilding Korea Party",
      "noImageReason": "Logo file could not be fetched: upload.wikimedia.org/wikipedia/commons/6/6b/조국혁신당_로고.svg (Rebuilding Korea Party logo) returned HTTP 429 (rate-limited) on repeated retries spaced 6-10s apart over several minutes on 2026-09-05; a future session should retry this exact resolved URL.",
      "ideology": [
        "South Korean progressivism",
        "South Korean liberalism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 2024,
      "leader": "Shin Jang-sik",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 12,
      "seatsTotal": 300,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Rebuilding Korea Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Rebuilding_Korea_Party"
        },
        {
          "title": "List of members of the National Assembly (South Korea), 2024–2028 - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/List_of_members_of_the_National_Assembly_(South_Korea),_2024%E2%80%932028"
        }
      ]
    },
    {
      "id": "KR-PP",
      "country": "KR",
      "shortName": "PP",
      "name": "진보당",
      "nameEn": "Progressive Party",
      "logo": "party-logos/kr/pp.jpg",
      "sha256": "ddff911e007feda37c64799a709e99bd662566dec85fd8ece0295a258692f7b7",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/commons/3/35/Logo_of_Progressive_Party_%28South_Korea%29.jpg",
      "ideology": [
        "South Korean progressivism",
        "Anti-imperialism",
        "Left-wing nationalism",
        "Left-wing populism"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing to far-left",
      "founded": 2017,
      "leader": "Kim Jong-hoon",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 4,
      "seatsTotal": 300,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Progressive Party (South Korea, 2017) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Progressive_Party_(South_Korea,_2017)"
        },
        {
          "title": "List of members of the National Assembly (South Korea), 2024–2028 - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/List_of_members_of_the_National_Assembly_(South_Korea),_2024%E2%80%932028"
        }
      ]
    },
    {
      "id": "KR-NRP",
      "country": "KR",
      "shortName": "NRP",
      "name": "개혁신당",
      "nameEn": "New Reform Party",
      "logo": "party-logos/kr/nrp.svg",
      "sha256": "8f26806a055fd2312c737646d118a0f407d0177fdc79da5689a69d9e844a554c",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/commons/6/69/Logo_of_the_New_Reform_Party_%28South_Korea%29.svg",
      "ideology": [
        "Conservatism (South Korean)",
        "Libertarian conservatism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right to right-wing",
      "founded": 2024,
      "leader": "Cheon Ha-ram",
      "leaderTitle": "Acting Leader",
      "inPower": false,
      "seats": 3,
      "seatsTotal": 300,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "New Reform Party (South Korea) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/New_Reform_Party_(South_Korea)"
        },
        {
          "title": "List of members of the National Assembly (South Korea), 2024–2028 - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/List_of_members_of_the_National_Assembly_(South_Korea),_2024%E2%80%932028"
        }
      ]
    },
    {
      "id": "KR-BIP",
      "country": "KR",
      "shortName": "BIP",
      "name": "기본소득당",
      "nameEn": "Basic Income Party",
      "logo": "party-logos/kr/bip.svg",
      "sha256": "f95b8b9d87b542c84ccc4efe18932a831ce3b0aa1e1a2ee8e3b918628dd6e389",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_of_the_Basic_Income_Party.svg",
      "ideology": [
        "Universal basic income",
        "Social liberalism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 2020,
      "leader": "Yong Hye-in",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 300,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Basic Income Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Basic_Income_Party"
        },
        {
          "title": "List of members of the National Assembly (South Korea), 2024–2028 - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/List_of_members_of_the_National_Assembly_(South_Korea),_2024%E2%80%932028"
        }
      ]
    },
    {
      "id": "KR-SDP",
      "country": "KR",
      "shortName": "SDP",
      "name": "사회민주당",
      "nameEn": "Social Democratic Party",
      "noImageReason": "Logo file could not be fetched: upload.wikimedia.org/wikipedia/commons/c/c3/Logo_of_the_Social_Democratic_Party_%28South_Korea%2C_2024%29.svg returned HTTP 429 (rate-limited) on repeated retries spaced 6-10s apart over several minutes on 2026-09-05; a future session should retry this exact resolved URL.",
      "ideology": [
        "Social democracy",
        "Social liberalism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 2024,
      "leader": "Han Chang-min",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 300,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Social Democratic Party (South Korea) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Social_Democratic_Party_(South_Korea)"
        },
        {
          "title": "List of members of the National Assembly (South Korea), 2024–2028 - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/List_of_members_of_the_National_Assembly_(South_Korea),_2024%E2%80%932028"
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
      "inExecutive": true,
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
        },
        {
          "title": "Anwar Ibrahim cabinet – Wikipedia (Member parties table: ministers appointed per party, after the 17 December 2025 reshuffle)",
          "url": "https://en.wikipedia.org/wiki/Anwar_Ibrahim_cabinet"
        },
        {
          "title": "Dewan Rakyat – Wikipedia (political groups, as of 10 August 2026: Government 150, Opposition 69, vacant 3 of 222)",
          "url": "https://en.wikipedia.org/wiki/Dewan_Rakyat"
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
      "inExecutive": true,
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
        },
        {
          "title": "Anwar Ibrahim cabinet – Wikipedia (Member parties table: ministers appointed per party, after the 17 December 2025 reshuffle)",
          "url": "https://en.wikipedia.org/wiki/Anwar_Ibrahim_cabinet"
        },
        {
          "title": "Dewan Rakyat – Wikipedia (political groups, as of 10 August 2026: Government 150, Opposition 69, vacant 3 of 222)",
          "url": "https://en.wikipedia.org/wiki/Dewan_Rakyat"
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
      "inExecutive": true,
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
        },
        {
          "title": "Anwar Ibrahim cabinet – Wikipedia (Member parties table: ministers appointed per party, after the 17 December 2025 reshuffle)",
          "url": "https://en.wikipedia.org/wiki/Anwar_Ibrahim_cabinet"
        },
        {
          "title": "Dewan Rakyat – Wikipedia (political groups, as of 10 August 2026: Government 150, Opposition 69, vacant 3 of 222)",
          "url": "https://en.wikipedia.org/wiki/Dewan_Rakyat"
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
      "inExecutive": true,
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
        },
        {
          "title": "Anwar Ibrahim cabinet – Wikipedia (Member parties table: ministers appointed per party, after the 17 December 2025 reshuffle)",
          "url": "https://en.wikipedia.org/wiki/Anwar_Ibrahim_cabinet"
        },
        {
          "title": "Dewan Rakyat – Wikipedia (political groups, as of 10 August 2026: Government 150, Opposition 69, vacant 3 of 222)",
          "url": "https://en.wikipedia.org/wiki/Dewan_Rakyat"
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
        },
        {
          "title": "Dewan Rakyat – Wikipedia (political groups, as of 10 August 2026: Government 150, Opposition 69, vacant 3 of 222)",
          "url": "https://en.wikipedia.org/wiki/Dewan_Rakyat"
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
        },
        {
          "title": "Dewan Rakyat – Wikipedia (political groups, as of 10 August 2026: Government 150, Opposition 69, vacant 3 of 222)",
          "url": "https://en.wikipedia.org/wiki/Dewan_Rakyat"
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
      "inExecutive": true,
      "timeInPower": "2022–present, as part of the Unity Government (via Barisan Nasional, member since 2020, and previously 1994–2018)",
      "seats": 1,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "logoMeaning": {
        "description": "The PBRS emblem features a stylised outline of Mount Kinabalu in blue and red with a central yellow torch, symbolising the resilience, indigenous cultural heritage, and unity of the people of Sabah.",
        "sources": [
          {
            "title": "United Sabah People's Party — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/United_Sabah_People%27s_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "United Sabah People's Party",
          "url": "https://en.wikipedia.org/wiki/United_Sabah_People%27s_Party"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        },
        {
          "title": "Anwar Ibrahim cabinet – Wikipedia (Member parties table: ministers appointed per party, after the 17 December 2025 reshuffle)",
          "url": "https://en.wikipedia.org/wiki/Anwar_Ibrahim_cabinet"
        },
        {
          "title": "Dewan Rakyat – Wikipedia (political groups, as of 10 August 2026: Government 150, Opposition 69, vacant 3 of 222)",
          "url": "https://en.wikipedia.org/wiki/Dewan_Rakyat"
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
      "inExecutive": true,
      "timeInPower": "2022–present, as part of the Unity Government (via Gabungan Parti Sarawak, GPS's largest component since 2018); PBB was part of Barisan Nasional 1973–2018",
      "seats": 14,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "logoMeaning": {
        "description": "The PBB logo features two clasped hands surrounded by a circular sunburst and rice ears, symbolising the unity and cooperation of Sarawak's indigenous Bumiputera communities (Dayak, Malay, Melanau) in pursuit of progress and stability.",
        "sources": [
          {
            "title": "Parti Pesaka Bumiputera Bersatu — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Parti_Pesaka_Bumiputera_Bersatu"
          }
        ]
      },
      "sources": [
        {
          "title": "Parti Pesaka Bumiputera Bersatu",
          "url": "https://en.wikipedia.org/wiki/Parti_Pesaka_Bumiputera_Bersatu"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        },
        {
          "title": "Anwar Ibrahim cabinet – Wikipedia (Member parties table: ministers appointed per party, after the 17 December 2025 reshuffle)",
          "url": "https://en.wikipedia.org/wiki/Anwar_Ibrahim_cabinet"
        },
        {
          "title": "Dewan Rakyat – Wikipedia (political groups, as of 10 August 2026: Government 150, Opposition 69, vacant 3 of 222)",
          "url": "https://en.wikipedia.org/wiki/Dewan_Rakyat"
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
      "inExecutive": true,
      "timeInPower": "2022–present, as part of the Unity Government (via Gabungan Parti Sarawak, member since 2018; previously Barisan Nasional 2004–2018)",
      "seats": 5,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "logoMeaning": {
        "description": "The PRS emblem displays the Rhinoceros Hornbill (Burung Kenyalang, the sacred cultural symbol and state bird of Sarawak) atop the party name, representing Dayak identity, cultural pride, and native rights.",
        "sources": [
          {
            "title": "Sarawak Peoples' Party — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Sarawak_Peoples%27_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "Sarawak Peoples' Party",
          "url": "https://en.wikipedia.org/wiki/Sarawak_Peoples%27_Party"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        },
        {
          "title": "Anwar Ibrahim cabinet – Wikipedia (Member parties table: ministers appointed per party, after the 17 December 2025 reshuffle)",
          "url": "https://en.wikipedia.org/wiki/Anwar_Ibrahim_cabinet"
        },
        {
          "title": "Dewan Rakyat – Wikipedia (political groups, as of 10 August 2026: Government 150, Opposition 69, vacant 3 of 222)",
          "url": "https://en.wikipedia.org/wiki/Dewan_Rakyat"
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
      "inExecutive": true,
      "timeInPower": "2022–present, as part of the Unity Government (via Gabungan Parti Sarawak, member since 2018; previously Barisan Nasional 2002–2018)",
      "seats": 2,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "logoMeaning": {
        "description": "The PDP logo features upward-sweeping red, yellow, and blue geometric curves representing dynamic multiracial progress, constitutional rights, and Sarawak state development.",
        "sources": [
          {
            "title": "Progressive Democratic Party (Malaysia) — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Progressive_Democratic_Party_(Malaysia)"
          }
        ]
      },
      "sources": [
        {
          "title": "Progressive Democratic Party (Malaysia)",
          "url": "https://en.wikipedia.org/wiki/Progressive_Democratic_Party_(Malaysia)"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        },
        {
          "title": "Anwar Ibrahim cabinet – Wikipedia (Member parties table: ministers appointed per party, after the 17 December 2025 reshuffle)",
          "url": "https://en.wikipedia.org/wiki/Anwar_Ibrahim_cabinet"
        },
        {
          "title": "Dewan Rakyat – Wikipedia (political groups, as of 10 August 2026: Government 150, Opposition 69, vacant 3 of 222)",
          "url": "https://en.wikipedia.org/wiki/Dewan_Rakyat"
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
      "logoMeaning": {
        "description": "The SUPP emblem consists of three interlocking yellow rings on a red and green shield, representing the harmonious unity of Sarawak's three major communities (Dayak, Chinese, and Malay) working together for progress and social harmony.",
        "sources": [
          {
            "title": "Sarawak United Peoples' Party — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Sarawak_United_Peoples%27_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "Sarawak United Peoples' Party",
          "url": "https://en.wikipedia.org/wiki/Sarawak_United_Peoples%27_Party"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        },
        {
          "title": "Dewan Rakyat – Wikipedia (political groups, as of 10 August 2026: Government 150, Opposition 69, vacant 3 of 222)",
          "url": "https://en.wikipedia.org/wiki/Dewan_Rakyat"
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
      "ideologyPosition": "centre",
      "positionRaw": "Centre to centre-right",
      "founded": 2020,
      "coalitionId": "MY-GRS",
      "leader": "Hajiji Noor",
      "leaderTitle": "Chairman",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2022–present, as part of the Unity Government. GRS is a Sabah-based coalition founded 2020 and registered as a political party (Registrar of Societies approval, 2022); four Dewan Rakyat MPs (former BERSATU Sabah members who could not join a GRS component party under the anti-hopping law) sit as GRS direct members",
      "seats": 4,
      "seatsTotal": 222,
      "chamberName": "Dewan Rakyat",
      "logoMeaning": {
        "description": "The GRS logo features Mount Kinabalu in sky blue flanked by stylized wings in navy blue and red, echoing the colors of the Sabah flag and symbolising state sovereignty, regional solidarity, and high aspirations.",
        "sources": [
          {
            "title": "Gabungan Rakyat Sabah — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Gabungan_Rakyat_Sabah"
          }
        ]
      },
      "sources": [
        {
          "title": "Gabungan Rakyat Sabah",
          "url": "https://en.wikipedia.org/wiki/Gabungan_Rakyat_Sabah"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        },
        {
          "title": "Anwar Ibrahim cabinet – Wikipedia (Member parties table: ministers appointed per party, after the 17 December 2025 reshuffle)",
          "url": "https://en.wikipedia.org/wiki/Anwar_Ibrahim_cabinet"
        },
        {
          "title": "Dewan Rakyat – Wikipedia (political groups, as of 10 August 2026: Government 150, Opposition 69, vacant 3 of 222)",
          "url": "https://en.wikipedia.org/wiki/Dewan_Rakyat"
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
      "logoMeaning": {
        "description": "The UPKO logo displays Mount Kinabalu in deep blue encircled by red and orange rings, representing the sacred mountain of the Kadazandusun people, cultural heritage, and dedication to Sabah's indigenous communities.",
        "sources": [
          {
            "title": "United Progressive Kinabalu Organisation — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/United_Progressive_Kinabalu_Organisation"
          }
        ]
      },
      "sources": [
        {
          "title": "United Progressive Kinabalu Organisation",
          "url": "https://en.wikipedia.org/wiki/United_Progressive_Kinabalu_Organisation"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        },
        {
          "title": "Dewan Rakyat – Wikipedia (political groups, as of 10 August 2026: Government 150, Opposition 69, vacant 3 of 222)",
          "url": "https://en.wikipedia.org/wiki/Dewan_Rakyat"
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
      "logoMeaning": {
        "description": "The PBS logo features two clasped hands inside a red circle with 14 yellow laurel leaves and Mount Kinabalu, signifying multiracial cooperation, the defense of Sabah's 20-point agreement rights, and regional solidarity.",
        "sources": [
          {
            "title": "United Sabah Party — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/United_Sabah_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "United Sabah Party",
          "url": "https://en.wikipedia.org/wiki/United_Sabah_Party"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        },
        {
          "title": "Dewan Rakyat – Wikipedia (political groups, as of 10 August 2026: Government 150, Opposition 69, vacant 3 of 222)",
          "url": "https://en.wikipedia.org/wiki/Dewan_Rakyat"
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
        },
        {
          "title": "Dewan Rakyat – Wikipedia (political groups, as of 10 August 2026: Government 150, Opposition 69, vacant 3 of 222)",
          "url": "https://en.wikipedia.org/wiki/Dewan_Rakyat"
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
      "logoMeaning": {
        "description": "The KDM logo incorporates ethnic Sabahan cultural motifs, including the traditional gong musical instrument, representing community harmony (kesejahteraan), grassroots cultural preservation, and the empowerment of Kadazan-Dusun and Murut communities.",
        "sources": [
          {
            "title": "Social Democratic Harmony Party — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Social_Democratic_Harmony_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "Social Democratic Harmony Party",
          "url": "https://en.wikipedia.org/wiki/Social_Democratic_Harmony_Party"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        },
        {
          "title": "Dewan Rakyat – Wikipedia (political groups, as of 10 August 2026: Government 150, Opposition 69, vacant 3 of 222)",
          "url": "https://en.wikipedia.org/wiki/Dewan_Rakyat"
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
      "logoMeaning": {
        "description": "The STAR logo features seven golden stars surrounding Mount Kinabalu on a circular blue field, representing the administrative divisions of Sabah, homeland sovereignty, and unity for the people of Borneo.",
        "sources": [
          {
            "title": "Homeland Solidarity Party — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Homeland_Solidarity_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "Homeland Solidarity Party",
          "url": "https://en.wikipedia.org/wiki/Homeland_Solidarity_Party"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        },
        {
          "title": "Dewan Rakyat – Wikipedia (political groups, as of 10 August 2026: Government 150, Opposition 69, vacant 3 of 222)",
          "url": "https://en.wikipedia.org/wiki/Dewan_Rakyat"
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
        },
        {
          "title": "Dewan Rakyat – Wikipedia (political groups, as of 10 August 2026: Government 150, Opposition 69, vacant 3 of 222)",
          "url": "https://en.wikipedia.org/wiki/Dewan_Rakyat"
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
        },
        {
          "title": "Dewan Rakyat – Wikipedia (political groups, as of 10 August 2026: Government 150, Opposition 69, vacant 3 of 222)",
          "url": "https://en.wikipedia.org/wiki/Dewan_Rakyat"
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
      "logoMeaning": {
        "description": "The Parti Wawasan Negara logo features a dynamic directional arrow emblem in red and blue, symbolizing forward-looking vision, national modernisation, and progressive governance.",
        "sources": [
          {
            "title": "National Vision Party (Malaysia) — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/National_Vision_Party_(Malaysia)"
          }
        ]
      },
      "sources": [
        {
          "title": "National Vision Party (Malaysia)",
          "url": "https://en.wikipedia.org/wiki/National_Vision_Party_(Malaysia)"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        },
        {
          "title": "Dewan Rakyat – Wikipedia (political groups, as of 10 August 2026: Government 150, Opposition 69, vacant 3 of 222)",
          "url": "https://en.wikipedia.org/wiki/Dewan_Rakyat"
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
      "logoMeaning": {
        "description": "The BERSATU logo features a red five-petalled hibiscus flower (Bunga Raya, Malaysia's national flower) set against a crimson shield, representing national identity, Malay cultural heritage, and the five pillars of the nation and Islam.",
        "sources": [
          {
            "title": "Malaysian United Indigenous Party — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Malaysian_United_Indigenous_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "Malaysian United Indigenous Party",
          "url": "https://en.wikipedia.org/wiki/Malaysian_United_Indigenous_Party"
        },
        {
          "title": "Members of the Dewan Rakyat, 15th Malaysian Parliament",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Dewan_Rakyat,_15th_Malaysian_Parliament"
        },
        {
          "title": "Dewan Rakyat – Wikipedia (political groups, as of 10 August 2026: Government 150, Opposition 69, vacant 3 of 222)",
          "url": "https://en.wikipedia.org/wiki/Dewan_Rakyat"
        },
        {
          "title": "Malaysian United Indigenous Party – Wikipedia (infobox: Perikatan Nasional 2020–2026, membership disputed) and Perikatan Nasional – Wikipedia (affiliates list marks BERSATU \"disputed\")",
          "url": "https://en.wikipedia.org/wiki/Malaysian_United_Indigenous_Party"
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
        },
        {
          "title": "Dewan Rakyat – Wikipedia (political groups, as of 10 August 2026: Government 150, Opposition 69, vacant 3 of 222)",
          "url": "https://en.wikipedia.org/wiki/Dewan_Rakyat"
        }
      ]
    }
  ],
  "NG": [
    {
      "id": "NG-APC",
      "country": "NG",
      "shortName": "APC",
      "name": "All Progressives Congress",
      "logo": "party-logos/ng/apc.png",
      "sha256": "a02070eed6cd22b71a05546d7eed20cc1a253df654d26195b069525d231a1a3d",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:All_Progressives_Congress_logo.png",
      "licenceNote": "Non-free party logo used under fair use, hosted on English Wikipedia (not Wikimedia Commons) at File:All Progressives Congress logo.png.",
      "ideology": [
        "Big tent",
        "Social conservatism",
        "Buharism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 2013,
      "leader": "Nentawe Yilwatda",
      "leaderTitle": "National Chairman",
      "inPower": true,
      "timeInPower": "2023-present",
      "seats": 242,
      "seatsTotal": 360,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "All Progressives Congress - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/All_Progressives_Congress"
        },
        {
          "title": "List of political parties in Nigeria - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/List_of_political_parties_in_Nigeria"
        },
        {
          "title": "House of Representatives (Nigeria) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Nigeria)"
        }
      ]
    },
    {
      "id": "NG-PDP",
      "country": "NG",
      "shortName": "PDP",
      "name": "Peoples Democratic Party",
      "logo": "party-logos/ng/pdp.png",
      "sha256": "52eb76e59256b571aee546073fb495fd931e8c87ca476147ac1b10ded9293655",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Logo_of_the_Peoples_Democratic_Party_(Nigeria).png",
      "licenceNote": "Non-free party logo used under fair use, hosted on English Wikipedia (not Wikimedia Commons) at File:Logo of the Peoples Democratic Party (Nigeria).png.",
      "ideology": [
        "Social conservatism",
        "Economic liberalism",
        "Big tent"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1998,
      "leader": "Kabiru Tanimu Turaki",
      "leaderTitle": "National Chairman",
      "inPower": false,
      "seats": 72,
      "seatsTotal": 360,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Peoples Democratic Party (Nigeria) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Peoples_Democratic_Party_(Nigeria)"
        },
        {
          "title": "House of Representatives (Nigeria) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Nigeria)"
        }
      ]
    },
    {
      "id": "NG-LP",
      "country": "NG",
      "shortName": "LP",
      "name": "Labour Party",
      "logo": "party-logos/ng/lp.png",
      "sha256": "940e3cd967d3b6c11bc837fbe24a38493b257666b6e7b6b374c1747576fe3587",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Labour_Party_(Nigeria)_logo.png",
      "licenceNote": "Non-free party logo used under fair use, hosted on English Wikipedia (not Wikimedia Commons) at File:Labour Party (Nigeria) logo.png.",
      "ideology": [
        "Social democracy",
        "Populism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 2002,
      "previousNames": [
        {
          "name": "Party for Social Democracy",
          "years": "2002-2003"
        }
      ],
      "leader": "Nenadi Usman",
      "leaderTitle": "National Chairman",
      "inPower": false,
      "seats": 22,
      "seatsTotal": 360,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The party emblem is a wheel with a man, a woman and a child engraved at its centre. The wheel stands for industry and work as the basis for the economic empowerment of the populace and the prosperity of the nation, while the human figures signify that governance and economic and social development must lead to the advancement of human beings.",
        "sources": [
          {
            "title": "Labour Party (Nigeria) - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Labour_Party_(Nigeria)"
          }
        ],
        "myths": []
      },
      "sources": [
        {
          "title": "Labour Party (Nigeria) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Labour_Party_(Nigeria)"
        },
        {
          "title": "House of Representatives (Nigeria) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Nigeria)"
        }
      ]
    },
    {
      "id": "NG-NNPP",
      "country": "NG",
      "shortName": "NNPP",
      "name": "New Nigeria Peoples Party",
      "logo": "party-logos/ng/nnpp.png",
      "sha256": "54c1d515def34c8e399fb09206df4464f380226d67d04711de0d5f9e2b39fb3c",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Logo_of_the_New_Nigeria_People%27s_Party.png",
      "licenceNote": "Non-free party logo used under fair use, hosted on English Wikipedia (not Wikimedia Commons) at File:Logo of the New Nigeria People's Party.png.",
      "ideology": [
        "Welfarism",
        "Social conservatism",
        "Populism"
      ],
      "ideologyPosition": "other",
      "positionRaw": "Syncretic",
      "founded": 2020,
      "leader": "Rabiu Kwankwaso",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 15,
      "seatsTotal": 360,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "New Nigeria Peoples Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/New_Nigeria_Peoples_Party"
        },
        {
          "title": "List of political parties in Nigeria - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/List_of_political_parties_in_Nigeria"
        },
        {
          "title": "House of Representatives (Nigeria) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Nigeria)"
        }
      ]
    },
    {
      "id": "NG-APGA",
      "country": "NG",
      "shortName": "APGA",
      "name": "All Progressives Grand Alliance",
      "logo": "party-logos/ng/apga.png",
      "sha256": "6950042a2477637a5cdbf394b83676b2fcf8a11ef4d53e8c469e6c8f07a2cba7",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:APGA_Nigeria_Logo.png",
      "licenceNote": "Non-free party logo used under fair use, hosted on English Wikipedia (not Wikimedia Commons) at File:APGA Nigeria Logo.png.",
      "ideology": [
        "Nationalism",
        "Federalism",
        "Pluralism",
        "Pan-Africanism",
        "Progressivism",
        "Decentralization"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Big tent",
      "founded": 2002,
      "leader": "Sly Ezeokenwa",
      "leaderTitle": "National Chairman",
      "inPower": false,
      "seats": 5,
      "seatsTotal": 360,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "All Progressives Grand Alliance - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/All_Progressives_Grand_Alliance"
        },
        {
          "title": "House of Representatives (Nigeria) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Nigeria)"
        }
      ]
    },
    {
      "id": "NG-SDP",
      "country": "NG",
      "shortName": "SDP",
      "name": "Social Democratic Party",
      "noImageReason": "No freely-licensed or fair-use SDP (Nigeria) logo file exists on English Wikipedia or Wikimedia Commons as of this writing; searches of both (including Special:Search in the File namespace and Commons MediaSearch for 'Social Democratic Party Nigeria logo') returned no results.",
      "ideology": [
        "Social democracy"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1989,
      "leader": "Sadiq Umar Abubakar",
      "leaderTitle": "Ag. National Chairman",
      "inPower": false,
      "seats": 2,
      "seatsTotal": 360,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Social Democratic Party (Nigeria) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Social_Democratic_Party_(Nigeria)"
        },
        {
          "title": "Social Democratic Party - INEC Nigeria",
          "url": "https://wp1.inecnigeria.org/?poltical_parties=social-democratic-party"
        },
        {
          "title": "House of Representatives (Nigeria) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Nigeria)"
        }
      ]
    },
    {
      "id": "NG-ADC",
      "country": "NG",
      "shortName": "ADC",
      "name": "African Democratic Congress",
      "logo": "party-logos/ng/adc.png",
      "sha256": "ed221240f91c0c4caf47082414fe32edc5469df3e5eb019f11a1a7750991d919",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:African_Democratic_Congress_logo.png",
      "licenceNote": "Non-free party logo used under fair use, hosted on English Wikipedia (not Wikimedia Commons) at File:African Democratic Congress logo.png.",
      "ideology": [
        "Big tent",
        "Decentralization"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Big tent",
      "founded": 2005,
      "previousNames": [
        {
          "name": "Alliance for Democratic Change",
          "years": "founded as, renamed on INEC registration in 2005"
        }
      ],
      "leader": "David Mark",
      "leaderTitle": "National Chairman",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 360,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "African Democratic Congress - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/African_Democratic_Congress"
        },
        {
          "title": "House of Representatives (Nigeria) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Nigeria)"
        }
      ]
    },
    {
      "id": "NG-YPP",
      "country": "NG",
      "shortName": "YPP",
      "name": "Young Progressives Party",
      "logo": "party-logos/ng/ypp.png",
      "sha256": "8e8828574410f66e934fd6cd292826e1807afb2923cbb8aa113ba07dadf62682",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Ypp-logo-design.png",
      "ideology": [
        "Social democracy",
        "Progressivism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 2017,
      "leader": "Bishop Amakiri",
      "leaderTitle": "National Chairman",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 360,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Young Progressives Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Young_Progressives_Party"
        },
        {
          "title": "House of Representatives (Nigeria) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Nigeria)"
        }
      ]
    }
  ],
  "NO": [
    {
      "id": "NO-AP",
      "country": "NO",
      "shortName": "Ap",
      "name": "Labour Party",
      "ideology": [
        "Social democracy",
        "Welfarism",
        "Norwegian nationalism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left to left-of-centre",
      "founded": 1887,
      "leader": "Jonas Gahr Støre",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "timeInPower": "2021–present",
      "seats": 48,
      "seatsTotal": 169,
      "chamberName": "Stortinget",
      "sources": [
        {
          "title": "Labour Party (Norway) – Wikipedia (founded 1887, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Labour_Party_(Norway)"
        },
        {
          "title": "2021 Norwegian parliamentary election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2021_Norwegian_parliamentary_election"
        }
      ],
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked"
    },
    {
      "id": "NO-H",
      "country": "NO",
      "shortName": "H",
      "name": "Conservative Party",
      "ideology": [
        "Conservatism",
        "Liberalism",
        "Market economy"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1884,
      "leader": "Erna Solberg",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 45,
      "seatsTotal": 169,
      "chamberName": "Stortinget",
      "sources": [
        {
          "title": "Conservative Party (Norway) – Wikipedia (founded 1884, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Conservative_Party_(Norway)"
        },
        {
          "title": "2021 Norwegian parliamentary election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2021_Norwegian_parliamentary_election"
        }
      ],
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked"
    },
    {
      "id": "NO-FRP",
      "country": "NO",
      "shortName": "Frp",
      "name": "Progress Party",
      "ideology": [
        "Right-wing populism",
        "Economic liberalism",
        "Nationalism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 1973,
      "leader": "Sylvi Listhaug",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 36,
      "seatsTotal": 169,
      "chamberName": "Stortinget",
      "sources": [
        {
          "title": "Progress Party (Norway) – Wikipedia (founded 1973, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Progress_Party_(Norway)"
        },
        {
          "title": "2021 Norwegian parliamentary election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2021_Norwegian_parliamentary_election"
        }
      ],
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked"
    },
    {
      "id": "NO-SV",
      "country": "NO",
      "shortName": "SV",
      "name": "Socialist Left Party",
      "ideology": [
        "Democratic socialism",
        "Environmentalism",
        "Anti-militarism"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing",
      "founded": 1975,
      "leader": "Audun Lysbakken",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 13,
      "seatsTotal": 169,
      "chamberName": "Stortinget",
      "sources": [
        {
          "title": "Socialist Left Party (Norway) – Wikipedia (founded 1975, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Socialist_Left_Party_(Norway)"
        },
        {
          "title": "2021 Norwegian parliamentary election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2021_Norwegian_parliamentary_election"
        }
      ],
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked"
    },
    {
      "id": "NO-SP",
      "country": "NO",
      "shortName": "Sp",
      "name": "Centre Party",
      "ideology": [
        "Agrarianism",
        "Regionalism",
        "Progressivism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 1920,
      "leader": "Trygve Slagsvold Vedum",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "timeInPower": "2021–present (junior coalition partner)",
      "seats": 13,
      "seatsTotal": 169,
      "chamberName": "Stortinget",
      "sources": [
        {
          "title": "Centre Party (Norway) – Wikipedia (founded 1920, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Centre_Party_(Norway)"
        },
        {
          "title": "2021 Norwegian parliamentary election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2021_Norwegian_parliamentary_election"
        }
      ],
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked"
    },
    {
      "id": "NO-MDG",
      "country": "NO",
      "shortName": "MDG",
      "name": "Green Party",
      "ideology": [
        "Green politics",
        "Environmentalism",
        "Social liberalism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left to left",
      "founded": 1988,
      "leader": "Rasmus Hansson",
      "leaderTitle": "Party Speaker",
      "inPower": false,
      "seats": 12,
      "seatsTotal": 169,
      "chamberName": "Stortinget",
      "sources": [
        {
          "title": "Green Party (Norway) – Wikipedia (founded 1988, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Green_Party_(Norway)"
        },
        {
          "title": "2021 Norwegian parliamentary election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2021_Norwegian_parliamentary_election"
        }
      ],
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked"
    },
    {
      "id": "NO-KRF",
      "country": "NO",
      "shortName": "KrF",
      "name": "Christian Democrats",
      "ideology": [
        "Christian democracy",
        "Conservatism",
        "Social conservatism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1933,
      "leader": "Kjell Ingolf Ropstad",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 8,
      "seatsTotal": 169,
      "chamberName": "Stortinget",
      "sources": [
        {
          "title": "Christian Democrats (Norway) – Wikipedia (founded 1933, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Christian_Democrats_(Norway)"
        },
        {
          "title": "2021 Norwegian parliamentary election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2021_Norwegian_parliamentary_election"
        }
      ],
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked"
    },
    {
      "id": "NO-R",
      "country": "NO",
      "shortName": "R",
      "name": "Red Party",
      "ideology": [
        "Communism",
        "Marxism",
        "Anti-imperialism"
      ],
      "ideologyPosition": "far-left",
      "positionRaw": "Far-left",
      "founded": 1990,
      "leader": "Bjørnar Moxnes",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 8,
      "seatsTotal": 169,
      "chamberName": "Stortinget",
      "sources": [
        {
          "title": "Red Party (Norway) – Wikipedia (founded 1990, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Red_Party_(Norway)"
        },
        {
          "title": "2021 Norwegian parliamentary election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2021_Norwegian_parliamentary_election"
        }
      ],
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked"
    },
    {
      "id": "NO-V",
      "country": "NO",
      "shortName": "V",
      "name": "Liberal Party",
      "ideology": [
        "Liberalism",
        "Social liberalism",
        "Progressivism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre to centre-left",
      "founded": 1884,
      "leader": "Guri Melby",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 8,
      "seatsTotal": 169,
      "chamberName": "Stortinget",
      "sources": [
        {
          "title": "Liberal Party (Norway) – Wikipedia (founded 1884, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Liberal_Party_(Norway)"
        },
        {
          "title": "2021 Norwegian parliamentary election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2021_Norwegian_parliamentary_election"
        }
      ],
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked"
    }
  ],
  "PH": [
    {
      "id": "PH-LAKAS",
      "country": "PH",
      "shortName": "Lakas-CMD",
      "name": "Lakas–Christian Muslim Democrats",
      "logo": "party-logos/ph/lakas.svg",
      "sha256": "978408e0f89bf74622d4a9dd038c51c6a83159243b6de2e59e340b7c1cfdb192",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/f/f9/Lakas_CMD.svg",
      "licenceNote": "Non-free party logo hosted locally on English Wikipedia (not Commons) and used there under a fair-use rationale to identify the political party in infoboxes and articles about it.",
      "ideology": [
        "Christian democracy",
        "Islamic democracy",
        "Conservatism",
        "Economic liberalism",
        "Filipino nationalism",
        "Social market economy"
      ],
      "ideologyPosition": "centre-right",
      "founded": 2008,
      "previousNames": [
        {
          "name": "Lakas–Kampi–CMD",
          "years": "2008–2011"
        }
      ],
      "coalitionId": "PH-ALYANSA",
      "leader": "Martin Romualdez",
      "leaderTitle": "National President",
      "inPower": true,
      "inExecutive": false,
      "seats": 76,
      "seatsTotal": 318,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The Lakas–CMD emblem features an open hand holding a burning torch of enlightenment above an open book and scales of justice, flanked by yellow rays and the blue and red colours of the Philippine flag, symbolising Christian-Muslim democratic solidarity, popular power, and good governance.",
        "sources": [
          {
            "title": "Lakas–CMD - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Lakas%E2%80%93CMD"
          }
        ]
      },
      "sources": [
        {
          "title": "Lakas–CMD - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Lakas%E2%80%93CMD"
        },
        {
          "title": "20th Congress of the Philippines - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/20th_Congress_of_the_Philippines"
        },
        {
          "title": "House of Representatives of the Philippines — Wikipedia (political groups of the 20th Congress, elected 12 May 2025: Majority 287, Minority 27, Independent 4, of 318)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_of_the_Philippines"
        }
      ]
    },
    {
      "id": "PH-NUP",
      "country": "PH",
      "shortName": "NUP",
      "name": "Partido ng Pambansang Pagkakaisa",
      "nameEn": "National Unity Party",
      "logo": "party-logos/ph/nup.svg",
      "sha256": "507053489d3ea274e275782c359c6d282c61ddbb4ad714f8beb8a7c642471c8d",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/2/27/National_Unity_Party.svg",
      "licenceNote": "Non-free party logo hosted locally on English Wikipedia (not Commons) and used there under a fair-use rationale to identify the political party in infoboxes and articles about it.",
      "ideology": [
        "Christian democracy",
        "Social conservatism"
      ],
      "ideologyPosition": "centre-right",
      "founded": 2010,
      "coalitionId": "PH-ALYANSA",
      "leader": "Ronaldo V. Puno",
      "leaderTitle": "Chairman",
      "inPower": true,
      "inExecutive": false,
      "seats": 56,
      "seatsTotal": 318,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The NUP logo displays a circular seal with three stylized human figures holding hands in solidarity around a golden sun and rice stalk, symbolising national unity, peace, and Christian-democratic governance across the Philippine archipelago.",
        "sources": [
          {
            "title": "National Unity Party (Philippines) - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/National_Unity_Party_(Philippines)"
          }
        ]
      },
      "sources": [
        {
          "title": "National Unity Party (Philippines) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/National_Unity_Party_(Philippines)"
        },
        {
          "title": "20th Congress of the Philippines - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/20th_Congress_of_the_Philippines"
        },
        {
          "title": "House of Representatives of the Philippines — Wikipedia (political groups of the 20th Congress, elected 12 May 2025: Majority 287, Minority 27, Independent 4, of 318)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_of_the_Philippines"
        }
      ]
    },
    {
      "id": "PH-PFP",
      "country": "PH",
      "shortName": "PFP",
      "name": "Partido Federal ng Pilipinas",
      "nameEn": "Federal Party of the Philippines",
      "logo": "party-logos/ph/pfp.png",
      "sha256": "080a46c3a890b064322b95d3e0c526d228a8ee6cfcd06c65ada5788ee840ff65",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/6/64/Logo_of_the_Federal_Party_of_the_Philippines.png",
      "licenceNote": "Non-free party logo hosted locally on English Wikipedia (not Commons) and used there under a fair-use rationale to identify the political party in infoboxes and articles about it.",
      "ideology": [
        "Federalism",
        "Populism",
        "Conservatism",
        "Social democracy"
      ],
      "ideologyPosition": "other",
      "positionRaw": "Big tent",
      "founded": 2018,
      "coalitionId": "PH-ALYANSA",
      "leader": "Bongbong Marcos",
      "leaderTitle": "National Chairman",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2022-present",
      "seats": 52,
      "seatsTotal": 318,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The PFP logo depicts a golden eagle and the Philippine eight-rayed sun above a shield divided into red and blue halves, symbolizing federalism, regional autonomy, strength, and national renewal.",
        "sources": [
          {
            "title": "Partido Federal ng Pilipinas - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Partido_Federal_ng_Pilipinas"
          }
        ]
      },
      "sources": [
        {
          "title": "Partido Federal ng Pilipinas - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Partido_Federal_ng_Pilipinas"
        },
        {
          "title": "20th Congress of the Philippines - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/20th_Congress_of_the_Philippines"
        },
        {
          "title": "House of Representatives of the Philippines — Wikipedia (political groups of the 20th Congress, elected 12 May 2025: Majority 287, Minority 27, Independent 4, of 318)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_of_the_Philippines"
        }
      ]
    },
    {
      "id": "PH-NPC",
      "country": "PH",
      "shortName": "NPC",
      "name": "Makabayang Koalisyon ng Mamamayan",
      "nameEn": "Nationalist People's Coalition",
      "logo": "party-logos/ph/npc.svg",
      "sha256": "740d40ad88c9604db38788fb0e420f19b8bd2d8de58c8041cf35f030705711dd",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/0/04/Nationalist_People%27s_Coalition.svg",
      "licenceNote": "Non-free party logo hosted locally on English Wikipedia (not Commons) and used there under a fair-use rationale to identify the political party in infoboxes and articles about it.",
      "ideology": [
        "Filipino nationalism",
        "Conservatism",
        "Social conservatism"
      ],
      "ideologyPosition": "centre-right",
      "founded": 1992,
      "previousNames": [
        {
          "name": "Partido Pilipino",
          "years": "1991–1992"
        }
      ],
      "coalitionId": "PH-ALYANSA",
      "leader": "Tito Sotto",
      "leaderTitle": "Chairman",
      "inPower": true,
      "inExecutive": false,
      "seats": 34,
      "seatsTotal": 318,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The NPC logo features a golden sun rising over green fertile fields and blue sea inside a shield, representing Filipino agricultural progress, national solidarity, and sustainable economic growth.",
        "sources": [
          {
            "title": "Nationalist People's Coalition - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Nationalist_People%27s_Coalition"
          }
        ]
      },
      "sources": [
        {
          "title": "Nationalist People's Coalition - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Nationalist_People%27s_Coalition"
        },
        {
          "title": "20th Congress of the Philippines - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/20th_Congress_of_the_Philippines"
        },
        {
          "title": "House of Representatives of the Philippines — Wikipedia (political groups of the 20th Congress, elected 12 May 2025: Majority 287, Minority 27, Independent 4, of 318)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_of_the_Philippines"
        }
      ]
    },
    {
      "id": "PH-NACIONALISTA",
      "country": "PH",
      "shortName": "Nacionalista",
      "name": "Partido Nacionalista",
      "nameEn": "Nacionalista Party",
      "logo": "party-logos/ph/nacionalista.svg",
      "sha256": "9ea575e245af2053ea0420476e5b04cbd302ac4fc76d9cf7067997ea45832fab",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/f/f9/Nacionalista_Party_logo.svg",
      "licenceNote": "Non-free party logo hosted locally on English Wikipedia (not Commons) and used there under a fair-use rationale to identify the political party in infoboxes and articles about it.",
      "ideology": [
        "Conservatism",
        "National conservatism",
        "Filipino nationalism",
        "Economic liberalism",
        "Populism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right to right-wing",
      "founded": 1907,
      "coalitionId": "PH-ALYANSA",
      "leader": "Manny Villar",
      "leaderTitle": "President",
      "inPower": true,
      "inExecutive": false,
      "seats": 18,
      "seatsTotal": 318,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The Nacionalista Party logo displays a green laurel wreath encircling a red sunburst and a shield bearing the initials 'NP' in gold, commemorating the legacy of the oldest political party in the Philippines, founded in 1907 during the struggle for Philippine independence.",
        "sources": [
          {
            "title": "Nacionalista Party - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Nacionalista_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "Nacionalista Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Nacionalista_Party"
        },
        {
          "title": "20th Congress of the Philippines - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/20th_Congress_of_the_Philippines"
        },
        {
          "title": "House of Representatives of the Philippines — Wikipedia (political groups of the 20th Congress, elected 12 May 2025: Majority 287, Minority 27, Independent 4, of 318)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_of_the_Philippines"
        }
      ]
    },
    {
      "id": "PH-LIBERAL",
      "country": "PH",
      "shortName": "Liberal Party",
      "name": "Partido Liberal ng Pilipinas",
      "nameEn": "Liberal Party of the Philippines",
      "logo": "party-logos/ph/liberal.svg",
      "sha256": "dbf9b929cd55fbcae4876823957503434e5b37c2ff0e5d47ada7133c06eb3fae",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/c/cd/Liberal_Party_of_the_Philippines_%28LP%29.svg",
      "licenceNote": "Non-free party logo hosted locally on English Wikipedia (not Commons) and used there under a fair-use rationale to identify the political party in infoboxes and articles about it.",
      "ideology": [
        "Liberalism",
        "Social liberalism",
        "Progressivism",
        "Aquinoism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre to centre-left",
      "founded": 1946,
      "leader": "Erin Tañada",
      "leaderTitle": "Party President",
      "inPower": false,
      "inExecutive": false,
      "seats": 6,
      "seatsTotal": 318,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The Liberal Party logo features a bright yellow background with the iconic hand forming the letter 'L' (the Laban sign), a historic symbol of freedom, human rights, and the People Power movement in the Philippines.",
        "sources": [
          {
            "title": "Liberal Party (Philippines) - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Liberal_Party_(Philippines)"
          }
        ]
      },
      "sources": [
        {
          "title": "Liberal Party (Philippines) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Liberal_Party_(Philippines)"
        },
        {
          "title": "20th Congress of the Philippines - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/20th_Congress_of_the_Philippines"
        },
        {
          "title": "House of Representatives of the Philippines — Wikipedia (political groups of the 20th Congress, elected 12 May 2025: Majority 287, Minority 27, Independent 4, of 318)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_of_the_Philippines"
        }
      ]
    },
    {
      "id": "PH-PDPLABAN",
      "country": "PH",
      "shortName": "PDP–Laban",
      "name": "Partido Demokratiko Pilipino",
      "nameEn": "Philippine Democratic Party",
      "logo": "party-logos/ph/pdplaban.png",
      "sha256": "e190ff1b6fe8fd8671b6bbb3c7b953c44553a61627a05e15d2b0285e926b0516",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/a/a0/Partido_Demokratiko_Pilipino_seal.png",
      "licenceNote": "Non-free party seal hosted locally on English Wikipedia (not Commons) and used there under a fair-use rationale to identify the political party in infoboxes and articles about it.",
      "ideology": [
        "Populism",
        "Federalism",
        "Dutertism",
        "Sinophilia"
      ],
      "ideologyPosition": "other",
      "positionRaw": "Syncretic (historically centre-left to left-wing; more recently blends left-wing populist rhetoric with right-wing populist policy)",
      "founded": 1983,
      "previousNames": [
        {
          "name": "Partido Demokratiko Pilipino–Lakas ng Bayan",
          "years": "1983–2024"
        }
      ],
      "leader": "Sebastian Duterte",
      "leaderTitle": "President (Rodrigo Duterte is Chairman)",
      "inPower": false,
      "inExecutive": false,
      "seats": 1,
      "seatsTotal": 318,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The PDP–Laban logo features a red and blue roundel enclosing a hand holding a flaming torch of freedom and the letters PDP-LABAN, symbolising the struggle against dictatorship, democratic socialism, and federalism.",
        "sources": [
          {
            "title": "PDP–Laban - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/PDP%E2%80%93Laban"
          }
        ]
      },
      "sources": [
        {
          "title": "PDP–Laban - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/PDP%E2%80%93Laban"
        },
        {
          "title": "20th Congress of the Philippines - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/20th_Congress_of_the_Philippines"
        },
        {
          "title": "House of Representatives of the Philippines — Wikipedia (political groups of the 20th Congress, elected 12 May 2025: Majority 287, Minority 27, Independent 4, of 318)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_of_the_Philippines"
        }
      ]
    },
    {
      "id": "PH-HTL",
      "country": "PH",
      "shortName": "HTL",
      "name": "Hugpong sa Tawong Lungsod",
      "nameEn": "Party of the City People",
      "logo": "party-logos/ph/htl.jpg",
      "sha256": "663bd42689ff3a99a8849dc2c1d5be48546ae5d62e353f51268d1967a25c8353",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c7/Hugpong_Sa_Tawong_Lungsod_Party_Logo.jpg",
      "ideology": [
        "Populism",
        "Localism",
        "Dutertism"
      ],
      "ideologyPosition": "other",
      "positionRaw": "Local political party based in Davao City; no formal left-right position stated",
      "founded": 2011,
      "leader": "Leoncio Evasco Jr.",
      "leaderTitle": "President",
      "inPower": false,
      "inExecutive": false,
      "seats": 3,
      "seatsTotal": 318,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The HTL emblem features a stylized Philippine eagle head in orange, red, and blue against a protective shield, symbolising Davao regional strength, local unity, and good governance.",
        "sources": [
          {
            "title": "Hugpong ng Pagbabago - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Hugpong_ng_Pagbabago"
          }
        ]
      },
      "sources": [
        {
          "title": "Hugpong sa Tawong Lungsod - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Hugpong_sa_Tawong_Lungsod"
        },
        {
          "title": "20th Congress of the Philippines - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/20th_Congress_of_the_Philippines"
        },
        {
          "title": "House of Representatives of the Philippines — Wikipedia (political groups of the 20th Congress, elected 12 May 2025: Majority 287, Minority 27, Independent 4, of 318)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_of_the_Philippines"
        }
      ]
    },
    {
      "id": "PH-MKTZNU",
      "country": "PH",
      "shortName": "Makatizens",
      "name": "Makatizens United Party",
      "noImageReason": "Makatizens United Party's English Wikipedia article (https://en.wikipedia.org/wiki/Makatizens_United_Party) has no infobox image/logo field at all — this is a local Makati-based party with no depicted emblem found on Wikipedia or Commons after checking.",
      "ideology": [
        "Localism"
      ],
      "ideologyPosition": "other",
      "positionRaw": "Local political organization based in Makati; no formal left-right position stated",
      "founded": 2021,
      "leader": "Abigail Binay",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "inExecutive": false,
      "seats": 2,
      "seatsTotal": 318,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Makatizens United Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Makatizens_United_Party"
        },
        {
          "title": "20th Congress of the Philippines - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/20th_Congress_of_the_Philippines"
        },
        {
          "title": "House of Representatives of the Philippines — Wikipedia (political groups of the 20th Congress, elected 12 May 2025: Majority 287, Minority 27, Independent 4, of 318)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_of_the_Philippines"
        }
      ]
    },
    {
      "id": "PH-AKBAYAN",
      "country": "PH",
      "shortName": "Akbayan",
      "name": "Akbayan Citizens' Action Party",
      "logo": "party-logos/ph/akbayan.svg",
      "sha256": "329eeece5117934c8fbf02002a659872438a6e75fa2b30258968fa0a1a9bbad5",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/1/1d/Akbayan_Party.svg",
      "licenceNote": "Non-free party logo hosted locally on English Wikipedia (not Commons) and used there under a fair-use rationale to identify the political party in infoboxes and articles about it.",
      "ideology": [
        "Progressivism",
        "Democratic socialism",
        "Social democracy",
        "Participatory politics"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left to left-wing",
      "founded": 1998,
      "leader": "Rafaela David",
      "leaderTitle": "President",
      "inPower": false,
      "inExecutive": false,
      "seats": 3,
      "seatsTotal": 318,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The Akbayan logo features a green swallow (ibon) soaring freely upward, symbolizing citizen empowerment, participatory democracy, environmental justice, and socialist progressivism.",
        "sources": [
          {
            "title": "Akbayan - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Akbayan"
          }
        ]
      },
      "sources": [
        {
          "title": "Akbayan - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Akbayan"
        },
        {
          "title": "LIST: Which party-list groups won in the 2025 elections? - Rappler",
          "url": "https://www.rappler.com/philippines/elections/party-list-groups-results-house-representatives-seats-2025/"
        },
        {
          "title": "House of Representatives of the Philippines — Wikipedia (political groups of the 20th Congress, elected 12 May 2025: Majority 287, Minority 27, Independent 4, of 318)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_of_the_Philippines"
        }
      ]
    },
    {
      "id": "PH-TINGOG",
      "country": "PH",
      "shortName": "Tingog",
      "name": "Tingog Sinirangan",
      "nameEn": "Voice of the East",
      "logo": "party-logos/ph/tingog.png",
      "sha256": "968330e62dc0ec806bc693122b476c717f4ff3867a49209de94aadf4b5497688",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/b/bc/Tingog_Party_List.png",
      "licenceNote": "Non-free party-list logo hosted locally on English Wikipedia (not Commons) and used there under a fair-use rationale to identify the organization in infoboxes and articles about it.",
      "ideology": [
        "Regionalism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right regionalist party representing Eastern Visayas",
      "founded": 2012,
      "leader": "Glenn Jaro Capucion",
      "leaderTitle": "President",
      "inPower": false,
      "inExecutive": false,
      "seats": 3,
      "seatsTotal": 318,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The Tingog Party-list logo features an orange and yellow stylized megaphone soundwave forming the letter 'T', symbolising giving a voice (Tingog) to Eastern Visayas and marginalized communities in national legislation.",
        "sources": [
          {
            "title": "Tingog Party List - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Tingog_Party_List"
          }
        ]
      },
      "sources": [
        {
          "title": "Tingog Sinirangan - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Tingog_Sinirangan"
        },
        {
          "title": "LIST: Which party-list groups won in the 2025 elections? - Rappler",
          "url": "https://www.rappler.com/philippines/elections/party-list-groups-results-house-representatives-seats-2025/"
        },
        {
          "title": "House of Representatives of the Philippines — Wikipedia (political groups of the 20th Congress, elected 12 May 2025: Majority 287, Minority 27, Independent 4, of 318)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_of_the_Philippines"
        }
      ]
    },
    {
      "id": "PH-4PS",
      "country": "PH",
      "shortName": "4Ps",
      "name": "Pagtibayin at Palaguin ang Pangkabuhayang Pilipino",
      "nameEn": "Strengthen and Grow the Filipino Livelihood (4Ps Party-list)",
      "logo": "party-logos/ph/fourps.png",
      "sha256": "530629cf6d880697d1c7035e9cb2fa9f591013158e34b67101b754064f4d6f88",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/7/7f/4Ps_Party-list_Logo.png",
      "licenceNote": "Non-free party-list logo hosted locally on English Wikipedia (not Commons) and used there under a fair-use rationale to identify the organization in infoboxes and articles about it.",
      "ideology": [
        "Social welfare advocacy"
      ],
      "ideologyPosition": "other",
      "positionRaw": "Not formally stated on Wikipedia; sectoral party-list focused on poverty alleviation, social welfare and 4Ps (Pantawid Pamilyang Pilipino Program) beneficiaries",
      "founded": 2019,
      "leader": "Marcelino Libanan",
      "leaderTitle": "President",
      "inPower": false,
      "inExecutive": false,
      "seats": 2,
      "seatsTotal": 318,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The 4Ps Party-list logo features four stylized figures holding hands in a circle bordered by golden laurel branches, representing social protection, poverty alleviation, and human development.",
        "sources": [
          {
            "title": "House of Representatives of the Philippines - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/House_of_Representatives_of_the_Philippines"
          }
        ]
      },
      "sources": [
        {
          "title": "4Ps Party-list - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/4Ps_Party-list"
        },
        {
          "title": "LIST: Which party-list groups won in the 2025 elections? - Rappler",
          "url": "https://www.rappler.com/philippines/elections/party-list-groups-results-house-representatives-seats-2025/"
        },
        {
          "title": "House of Representatives of the Philippines — Wikipedia (political groups of the 20th Congress, elected 12 May 2025: Majority 287, Minority 27, Independent 4, of 318)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_of_the_Philippines"
        }
      ]
    },
    {
      "id": "PH-AKOBICOL",
      "country": "PH",
      "shortName": "Ako Bicol",
      "name": "Ako Bicol Political Party",
      "logo": "party-logos/ph/akobicol.png",
      "sha256": "e0a5ef8df14bad333e77c2e05dc2ce830a5df996e947d336323c4bc744d62285",
      "logoSourceUrl": "https://upload.wikimedia.org/wikipedia/en/0/0b/Ako_Bicol_logo.png",
      "licenceNote": "Non-free party-list logo hosted locally on English Wikipedia (not Commons) and used there under a fair-use rationale to identify the organization in infoboxes and articles about it.",
      "ideology": [
        "Regionalism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right regionalist party representing the Bicol Region and Bicolano people",
      "founded": 2006,
      "leader": "Zaldy Co",
      "leaderTitle": "Chairperson",
      "inPower": false,
      "inExecutive": false,
      "seats": 2,
      "seatsTotal": 318,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The Ako Bicol logo displays the iconic symmetrical cone of Mount Mayon Volcano surrounded by sunrise rays and green hills, representing Bicol regional identity, disaster resilience, and community advocacy.",
        "sources": [
          {
            "title": "Ako Bicol - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Ako_Bicol"
          }
        ]
      },
      "sources": [
        {
          "title": "Ako Bicol - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Ako_Bicol"
        },
        {
          "title": "LIST: Which party-list groups won in the 2025 elections? - Rappler",
          "url": "https://www.rappler.com/philippines/elections/party-list-groups-results-house-representatives-seats-2025/"
        },
        {
          "title": "House of Representatives of the Philippines — Wikipedia (political groups of the 20th Congress, elected 12 May 2025: Majority 287, Minority 27, Independent 4, of 318)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_of_the_Philippines"
        }
      ]
    },
    {
      "id": "PH-1CEBU",
      "country": "PH",
      "shortName": "1CEBU",
      "name": "One Cebu",
      "logo": "party-logos/ph/onecebu.png",
      "sha256": "87d38e5e23bc61bf1528b9513e361d799d4b9d14af37f861b0bee09cac575391",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:One%20Cebu%20Party%20logo.png",
      "licenceNote": "Non-free logo hosted on English Wikipedia under a fair-use rationale; bundled here to identify One Cebu, not to imply endorsement. Replace if a freely-licensed file becomes available.",
      "ideology": [
        "Cebuano interests",
        "Localism",
        "Populism"
      ],
      "ideologyPosition": "other",
      "founded": 2007,
      "leader": "Gwendolyn Garcia",
      "leaderTitle": "Leader",
      "inPower": true,
      "inExecutive": false,
      "seats": 1,
      "seatsTotal": 318,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "One Cebu — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/One_Cebu"
        },
        {
          "title": "House of Representatives of the Philippines — Wikipedia (political groups of the 20th Congress, elected 12 May 2025: Majority 287, Minority 27, Independent 4, of 318)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_of_the_Philippines"
        }
      ]
    },
    {
      "id": "PH-LDP",
      "country": "PH",
      "shortName": "LDP",
      "name": "Laban ng Demokratikong Pilipino",
      "nameEn": "Struggle of Democratic Filipinos",
      "logo": "party-logos/ph/ldp.svg",
      "sha256": "79b2e30467d25ad254c509b895eaf73eb331c165b979dee321ed3cd598b7bf10",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Laban%20ng%20Demokratikong%20Pilipino%20(LDP).svg",
      "licenceNote": "Non-free logo hosted on English Wikipedia under a fair-use rationale; bundled here to identify Laban ng Demokratikong Pilipino, not to imply endorsement. Replace if a freely-licensed file becomes available.",
      "ideology": [],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1988,
      "leader": "Sonny Angara",
      "leaderTitle": "Chairman",
      "inPower": true,
      "inExecutive": false,
      "seats": 1,
      "seatsTotal": 318,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Laban ng Demokratikong Pilipino — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Laban_ng_Demokratikong_Pilipino"
        },
        {
          "title": "House of Representatives of the Philippines — Wikipedia (political groups of the 20th Congress, elected 12 May 2025: Majority 287, Minority 27, Independent 4, of 318)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_of_the_Philippines"
        }
      ]
    },
    {
      "id": "PH-UNA",
      "country": "PH",
      "shortName": "UNA",
      "name": "United Nationalist Alliance",
      "logo": "party-logos/ph/una.svg",
      "sha256": "d85d43382e85e38b950deb4359ce850c16affac5727e4539beb46c79795c1d5e",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:United_Nationalist_Alliance.svg",
      "licenceNote": "Non-free logo hosted on English Wikipedia under a fair-use rationale; bundled here to identify United Nationalist Alliance, not to imply endorsement. Replace if a freely-licensed file becomes available.",
      "ideology": [
        "Populism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 2012,
      "leader": "Jejomar Binay",
      "leaderTitle": "President",
      "inPower": false,
      "inExecutive": false,
      "seats": 1,
      "seatsTotal": 318,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "United Nationalist Alliance — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/United_Nationalist_Alliance"
        },
        {
          "title": "House of Representatives of the Philippines — Wikipedia (political groups of the 20th Congress, elected 12 May 2025: Majority 287, Minority 27, Independent 4, of 318)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_of_the_Philippines"
        }
      ]
    }
  ],
  "PL": [
    {
      "id": "PL-PSL",
      "country": "PL",
      "shortName": "PSL",
      "name": "Polish People's Party",
      "ideology": [
        "Agrarianism",
        "Centre",
        "Pro-EU"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 1990,
      "leader": "Władysław Kosiniak-Kamysz",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "seats": 30,
      "seatsTotal": 460,
      "chamberName": "Sejm",
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/Polish_People%27s_Party",
      "sources": [
        {
          "title": "Polish People's Party – Wikipedia (founded 1990, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Polish_People%27s_Party"
        },
        {
          "title": "2023 Polish parliamentary election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2023_Polish_parliamentary_election"
        }
      ]
    }
  ],
  "PT": [
    {
      "id": "PT-PS",
      "country": "PT",
      "shortName": "PS",
      "name": "Socialist Party",
      "ideology": [
        "Social democracy",
        "Progressivism",
        "Pro-EU"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1973,
      "leader": "Pedro Nuno Santos",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "seats": 120,
      "seatsTotal": 230,
      "chamberName": "Assembly of the Republic",
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/Socialist_Party_(Portugal)",
      "sources": [
        {
          "title": "Socialist Party (Portugal) – Wikipedia (founded 1973, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Socialist_Party_(Portugal)"
        },
        {
          "title": "2024 Portuguese legislative election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2024_Portuguese_legislative_election"
        }
      ]
    },
    {
      "id": "PT-BE",
      "country": "PT",
      "shortName": "BE",
      "name": "Bloco de Esquerda",
      "ideology": [
        "Left-wing",
        "Socialism",
        "Progressivism"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left",
      "founded": 1997,
      "leader": "Mariana Mortágua",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 12,
      "seatsTotal": 230,
      "chamberName": "Assembly of the Republic",
      "noImageReason": "Freely-licensed party logo unavailable — Wikimedia Commons access blocked",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/Bloco_de_Esquerda",
      "sources": [
        {
          "title": "Bloco de Esquerda – Wikipedia (founded 1997, ideology, leadership)",
          "url": "https://en.wikipedia.org/wiki/Bloco_de_Esquerda"
        },
        {
          "title": "2024 Portuguese legislative election – Wikipedia (seat distribution)",
          "url": "https://en.wikipedia.org/wiki/2024_Portuguese_legislative_election"
        }
      ]
    }
  ],
  "TH": [
    {
      "id": "TH-PP",
      "country": "TH",
      "shortName": "People's Party",
      "name": "พรรคประชาชน",
      "nameEn": "People's Party",
      "logo": "party-logos/th/pp.svg",
      "sha256": "388337fb0aeed7f50f0f516bb509a795dde9b01c959de31ff0a5206b6c4399b8",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:People%27s_Party_Logo-EN_(Thailand,_2024).svg",
      "ideology": [
        "Progressivism",
        "Social democracy"
      ],
      "ideologyPosition": "centre-left",
      "founded": 2024,
      "previousNames": [
        {
          "name": "พรรคก้าวไกล",
          "nameEn": "Move Forward Party",
          "years": "2020–2024 (dissolved by the Constitutional Court, 7 August 2024, over its 2021 campaign to amend the lèse-majesté law)"
        },
        {
          "name": "พรรคอนาคตใหม่",
          "nameEn": "Future Forward Party",
          "years": "2018–2020 (dissolved by the Constitutional Court, 21 February 2020)"
        }
      ],
      "leader": "Natthaphong Ruengpanyawut",
      "leaderTitle": "Leader of the Opposition and Party Leader",
      "inPower": false,
      "inExecutive": false,
      "seats": 120,
      "seatsTotal": 500,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The People's Party logo consists of an inverted equilateral orange triangle containing a smaller nested triangle, symbolizing the chevron pointing forward, equal democratic foundations, and the historic orange color of the progressive Thai movement.",
        "sources": [
          {
            "title": "People's Party (Thailand) - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/People%27s_Party_(Thailand)"
          }
        ]
      },
      "sources": [
        {
          "title": "People's Party (Thailand) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/People%27s_Party_(Thailand)"
        },
        {
          "title": "Results of the 2026 Thai general election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Results_of_the_2026_Thai_general_election"
        },
        {
          "title": "2026 Thai general election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2026_Thai_general_election"
        },
        {
          "title": "People's Party chief formally named opposition leader - Bangkok Post",
          "url": "https://www.bangkokpost.com/thailand/politics/3254993/peoples-party-chief-formally-named-opposition-leader"
        },
        {
          "title": "House of Representatives (Thailand) — Wikipedia (political groups of the 27th House, elected 8 February 2026: Government 292, Opposition 207, 1 vacant of 500)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Thailand)"
        }
      ]
    },
    {
      "id": "TH-BJT",
      "country": "TH",
      "shortName": "Bhumjaithai Party",
      "name": "พรรคภูมิใจไทย",
      "nameEn": "Bhumjaithai Party",
      "logo": "party-logos/th/bjt.svg",
      "sha256": "6960385fc6acfbb09fafc99c6a872b43364e7d0d9eed1beb4d8c19a43ab9df2a",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_of_the_Bhumjaithai_Party.svg",
      "ideology": [
        "Conservatism",
        "Economic liberalism",
        "Monarchism",
        "Populism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right to right-wing",
      "founded": 2008,
      "leader": "Anutin Charnvirakul",
      "leaderTitle": "Prime Minister and Party Leader",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2025–present",
      "seats": 191,
      "seatsTotal": 500,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The Bhumjaithai Party logo features a stylized heart in the colours of the Thai flag (red and blue) enclosing the map of Thailand, signifying love, loyalty, and pride in the nation ('Bhumjai Thai' translates to 'Proud to be Thai').",
        "sources": [
          {
            "title": "Bhumjaithai Party - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Bhumjaithai_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "Bhumjaithai Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Bhumjaithai_Party"
        },
        {
          "title": "Second Anutin cabinet - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Second_Anutin_cabinet"
        },
        {
          "title": "2026 Thai general election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2026_Thai_general_election"
        },
        {
          "title": "House of Representatives (Thailand) — Wikipedia (political groups of the 27th House, elected 8 February 2026: Government 292, Opposition 207, 1 vacant of 500)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Thailand)"
        }
      ]
    },
    {
      "id": "TH-PT",
      "country": "TH",
      "shortName": "Pheu Thai Party",
      "name": "พรรคเพื่อไทย",
      "nameEn": "Pheu Thai Party",
      "logo": "party-logos/th/pt.svg",
      "sha256": "da659c6ff9cce8079652234732a6fbd4718b318efb16ed0183c3eaa56f84d25a",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_of_the_Pheu_Thai_Party.svg",
      "ideology": [
        "Liberal conservatism",
        "Economic liberalism",
        "Thaksinomics",
        "Populism"
      ],
      "ideologyPosition": "centre-right",
      "founded": 2007,
      "previousNames": [
        {
          "name": "People's Power Party",
          "years": "2007–2008 (dissolved by the Constitutional Court, 2 December 2008)"
        }
      ],
      "leader": "Julapun Amornvivat",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2026–present",
      "seats": 74,
      "seatsTotal": 500,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The Pheu Thai Party logo features the Thai consonant 'ภ' (Pho Phan) stylised into a heart in red and blue (the colours of the Thai national flag), symbolising the party's motto and devotion to serving the Thai people ('For Thais').",
        "sources": [
          {
            "title": "Pheu Thai Party - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Pheu_Thai_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "Pheu Thai Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Pheu_Thai_Party"
        },
        {
          "title": "Second Anutin cabinet - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Second_Anutin_cabinet"
        },
        {
          "title": "House of Representatives (Thailand) — Wikipedia (political groups of the 27th House, elected 8 February 2026: Government 292, Opposition 207, 1 vacant of 500)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Thailand)"
        }
      ]
    },
    {
      "id": "TH-DEM",
      "country": "TH",
      "shortName": "Democrat Party",
      "name": "พรรคประชาธิปัตย์",
      "nameEn": "Democrat Party",
      "logo": "party-logos/th/dem.svg",
      "sha256": "3065c5d3b9baea53ba333a0109b610fdf3b1909d19ad88789978e4e31b98fce8",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Democrat_TH_Logo.svg",
      "licenceNote": "Logo hosted locally on English Wikipedia (not Commons) as a non-free file used under fair use solely to identify the Democrat Party; it is not freely licensed for general reuse.",
      "ideology": [
        "Conservative liberalism",
        "Classical liberalism",
        "Constitutional monarchism",
        "Neoliberalism"
      ],
      "ideologyPosition": "centre-right",
      "founded": 1946,
      "leader": "Abhisit Vejjajiva",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "inExecutive": false,
      "seats": 21,
      "seatsTotal": 500,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The Democrat Party emblem depicts the goddess Mae Thorani (the Earth Goddess) wringing sacred water from her hair, representing the washing away of impurities, moral truth, and enduring democratic dedication to the people.",
        "sources": [
          {
            "title": "Democrat Party (Thailand) - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Democrat_Party_(Thailand)"
          }
        ]
      },
      "sources": [
        {
          "title": "Democrat Party (Thailand) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Democrat_Party_(Thailand)"
        },
        {
          "title": "2026 Thai general election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2026_Thai_general_election"
        },
        {
          "title": "House of Representatives (Thailand) — Wikipedia (political groups of the 27th House, elected 8 February 2026: Government 292, Opposition 207, 1 vacant of 500)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Thailand)"
        }
      ]
    },
    {
      "id": "TH-KT",
      "country": "TH",
      "shortName": "Kla Tham Party",
      "name": "พรรคกล้าธรรม",
      "nameEn": "Kla Tham Party",
      "logo": "party-logos/th/kt.png",
      "sha256": "9ddf2415e06e4484d912ea5a82e0a984880e33fa10160960ce71a212298c6809",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Kla_Tham_Party_logo.png",
      "licenceNote": "Logo hosted locally on English Wikipedia (not Commons) as a non-free file used under fair use solely to identify the Kla Tham Party; it is not freely licensed for general reuse.",
      "ideology": [],
      "ideologyPosition": "centre-right",
      "positionRaw": "Not stated in the party's own Wikipedia infobox (left blank); described by regional analysts as a conservative, patronage-based party allied with the Bhumjaithai-led coalition bloc",
      "founded": 2023,
      "previousNames": [
        {
          "name": "Thai Economic Party",
          "years": "2020–2023 (registered under this name before rebranding)"
        }
      ],
      "leader": "Narumon Pinyosinwat",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "inExecutive": false,
      "seats": 58,
      "seatsTotal": 500,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The Prachachat logo displays green geometric wings and an open book motif, symbolising education, peace, and pluralistic harmony for southern border provinces and multicultural communities.",
        "sources": [
          {
            "title": "Prachachat Party - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Prachachat_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "Kla Tham Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Kla_Tham_Party"
        },
        {
          "title": "2026 Thai general election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2026_Thai_general_election"
        },
        {
          "title": "Thailand's Conservatives Consolidate Power After 2026 Snap Polls - The Diplomat",
          "url": "https://thediplomat.com/2026/02/thailands-conservatives-consolidate-power-after-2026-snap-polls/"
        },
        {
          "title": "House of Representatives (Thailand) — Wikipedia (political groups of the 27th House, elected 8 February 2026: Government 292, Opposition 207, 1 vacant of 500)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Thailand)"
        }
      ]
    },
    {
      "id": "TH-ECON",
      "country": "TH",
      "shortName": "Economic Party",
      "name": "พรรคเศรษฐกิจ",
      "nameEn": "Economic Party",
      "logo": "party-logos/th/econ.png",
      "sha256": "214200f17ef66b318c18352f33a56e6c3d197677fcbfe99acb8229c1317bd98a",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:ECON_party_logo.png",
      "ideology": [
        "Right-libertarianism",
        "Anti-immigration"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing to far-right",
      "founded": 2025,
      "previousNames": [
        {
          "name": "Thai Civil Power Party",
          "years": "2018–2023"
        },
        {
          "name": "Zen-dai Party",
          "years": "2023–2025"
        }
      ],
      "leader": "Rangsi Kitiyansap",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2026–present",
      "seats": 3,
      "seatsTotal": 500,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The Thai Economic Party logo features dynamic arrows and national colors representing economic revival, innovation, and national development.",
        "sources": [
          {
            "title": "House of Representatives (Thailand) - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Thailand)"
          }
        ]
      },
      "sources": [
        {
          "title": "Economic Party (Thailand) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Economic_Party_(Thailand)"
        },
        {
          "title": "Second Anutin cabinet - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Second_Anutin_cabinet"
        },
        {
          "title": "House of Representatives (Thailand) — Wikipedia (political groups of the 27th House, elected 8 February 2026: Government 292, Opposition 207, 1 vacant of 500)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Thailand)"
        }
      ]
    },
    {
      "id": "TH-UTN",
      "country": "TH",
      "shortName": "United Thai Nation Party",
      "name": "พรรครวมไทยสร้างชาติ",
      "nameEn": "United Thai Nation Party",
      "logo": "party-logos/th/utn.svg",
      "sha256": "082fe90071045689e2ccd0647c498476e3dd0eb67dd6d84f8165d7512546d91f",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_of_the_United_Thai_Nation.svg",
      "ideology": [],
      "ideologyPosition": "far-right",
      "founded": 2021,
      "leader": "Pirapan Salirathavibhaga",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2026–present",
      "seats": 2,
      "seatsTotal": 500,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The United Thai Nation logo features a stylized chevron composed of red, white, and blue stripes echoing the Thai national flag (Trairanga), symbolising unity under the monarchy, national solidarity, and patriotism.",
        "sources": [
          {
            "title": "United Thai Nation Party - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/United_Thai_Nation_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "United Thai Nation Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/United_Thai_Nation_Party"
        },
        {
          "title": "Second Anutin cabinet - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Second_Anutin_cabinet"
        },
        {
          "title": "House of Representatives (Thailand) — Wikipedia (political groups of the 27th House, elected 8 February 2026: Government 292, Opposition 207, 1 vacant of 500)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Thailand)"
        }
      ]
    },
    {
      "id": "TH-PCT",
      "country": "TH",
      "shortName": "Pheu Chart Thai Party",
      "name": "พรรคเพื่อชาติไทย",
      "nameEn": "Pheu Chart Thai Party",
      "logo": "party-logos/th/pct.png",
      "sha256": "564d0b77b7a20862374c3f91dd2c41e1fadf9c67472c81d87d9a088f6af3ab88",
      "logoSourceUrl": "https://th.wikipedia.org/wiki/%E0%B9%84%E0%B8%9F%E0%B8%A5%E0%B9%8C:Pheu_Chart_Thai_Party_Logo.png",
      "licenceNote": "Logo hosted locally on Thai Wikipedia (not Commons) as a party-identification logo file; not confirmed as freely licensed for general reuse beyond identification purposes.",
      "ideology": [],
      "ideologyPosition": "other",
      "positionRaw": "No ideology or left-right position documented in the party's Thai Wikipedia infobox",
      "founded": 2021,
      "previousNames": [
        {
          "name": "พรรคพลังไทยรักไทย",
          "nameEn": "Palang Thai Rak Thai Party",
          "years": "2018–2021"
        }
      ],
      "leader": "Pongthawat Techadejruangkul",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2026–present",
      "seats": 2,
      "seatsTotal": 500,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The Chart Thai Pattana logo displays a stylized pink and blue conch / floral motif surrounded by petals, representing harmony, development, and agricultural prosperity.",
        "sources": [
          {
            "title": "Chart Thai Pattana Party - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Chart_Thai_Pattana_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "พรรคเพื่อชาติไทย - วิกิพีเดีย (Pheu Chart Thai Party - Thai Wikipedia)",
          "url": "https://th.wikipedia.org/wiki/%E0%B8%9E%E0%B8%A3%E0%B8%A3%E0%B8%84%E0%B9%80%E0%B8%9E%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%8A%E0%B8%B2%E0%B8%95%E0%B8%B4%E0%B9%84%E0%B8%97%E0%B8%A2"
        },
        {
          "title": "2026 Thai general election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2026_Thai_general_election"
        },
        {
          "title": "Second Anutin cabinet - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Second_Anutin_cabinet"
        },
        {
          "title": "House of Representatives (Thailand) — Wikipedia (political groups of the 27th House, elected 8 February 2026: Government 292, Opposition 207, 1 vacant of 500)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Thailand)"
        }
      ]
    },
    {
      "id": "TH-RJT",
      "country": "TH",
      "shortName": "Ruam Jai Thai Party",
      "name": "พรรครวมใจไทย",
      "nameEn": "Ruam Jai Thai Party",
      "logo": "party-logos/th/rjt.jpg",
      "sha256": "480db32b913596a606492a57c1f1c29b50c8bfef746587f300dcf9d52d5c3325",
      "logoSourceUrl": "https://th.wikipedia.org/wiki/%E0%B9%84%E0%B8%9F%E0%B8%A5%E0%B9%8C:RUAM_JAI_THAI_PARTY_logo.jpg",
      "licenceNote": "Logo hosted locally on Thai Wikipedia (not Commons) as a party-identification logo file; not confirmed as freely licensed for general reuse beyond identification purposes.",
      "ideology": [],
      "ideologyPosition": "other",
      "positionRaw": "No ideology or left-right position documented on Thai Wikipedia",
      "founded": 2023,
      "leader": "Boonrawee Yomjinda",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "inExecutive": false,
      "timeInPower": "2026–present",
      "seats": 1,
      "seatsTotal": 500,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The Ruam Jai Thai logo uses heart-shaped motifs in national colors symbolizing the coming together of Thai hearts for local development and solidarity.",
        "sources": [
          {
            "title": "House of Representatives (Thailand) - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Thailand)"
          }
        ]
      },
      "sources": [
        {
          "title": "พรรครวมใจไทย (พ.ศ. 2566) - วิกิพีเดีย (Ruam Jai Thai Party (2023) - Thai Wikipedia)",
          "url": "https://th.wikipedia.org/wiki/%E0%B8%9E%E0%B8%A3%E0%B8%A3%E0%B8%84%E0%B8%A3%E0%B8%A7%E0%B8%A1%E0%B9%83%E0%B8%88%E0%B9%84%E0%B8%97%E0%B8%A2_(%E0%B8%9E.%E0%B8%A8._2566)"
        },
        {
          "title": "Second Anutin cabinet - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Second_Anutin_cabinet"
        },
        {
          "title": "House of Representatives (Thailand) — Wikipedia (political groups of the 27th House, elected 8 February 2026: Government 292, Opposition 207, 1 vacant of 500)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Thailand)"
        }
      ]
    },
    {
      "id": "TH-PCC",
      "country": "TH",
      "shortName": "Prachachat Party",
      "name": "พรรคประชาชาติ",
      "nameEn": "Prachachat Party",
      "logo": "party-logos/th/pcc.png",
      "sha256": "7a9290903c50d97fced9cba930f664122182ca6ec12d8afe73d7a46117633ea3",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Logo_of_the_Prachachart_Party.png",
      "licenceNote": "Logo hosted locally on English Wikipedia (not Commons) as a non-free file used under fair use solely to identify the Prachachat Party; it is not freely licensed for general reuse.",
      "ideology": [
        "Social democracy",
        "Social conservatism",
        "Islamic democracy",
        "Multiculturalism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Fiscal: centre-left; Social: right-wing",
      "founded": 2018,
      "leader": "Tawee Sodsong",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2026–present",
      "seats": 5,
      "seatsTotal": 500,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The Chart Pattana Kla logo features an orange and blue dynamic loop representing continuous progress, modern technological innovation, and economic dynamism.",
        "sources": [
          {
            "title": "Chart Pattana Kla Party - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Chart_Pattana_Kla_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "Prachachat Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Prachachat_Party"
        },
        {
          "title": "Second Anutin cabinet - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Second_Anutin_cabinet"
        },
        {
          "title": "House of Representatives (Thailand) — Wikipedia (political groups of the 27th House, elected 8 February 2026: Government 292, Opposition 207, 1 vacant of 500)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Thailand)"
        }
      ]
    },
    {
      "id": "TH-NEW",
      "country": "TH",
      "shortName": "New Party",
      "name": "พรรคใหม่",
      "nameEn": "New Party",
      "noImageReason": "No logo file is specified in the 'logo' field of the English Wikipedia 'New Party (Thailand)' infobox, and no corresponding file was found on Wikimedia Commons or Wikidata as of September 2026.",
      "ideology": [],
      "ideologyPosition": "other",
      "positionRaw": "No ideology or left-right position stated in the sourced infobox; Wikipedia categorizes the article only under 'Progressive parties in Thailand'",
      "founded": 2022,
      "leader": "Kriditaj Sangthanyothin",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2026–present",
      "seats": 1,
      "seatsTotal": 500,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "New Party (Thailand) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/New_Party_(Thailand)"
        },
        {
          "title": "Second Anutin cabinet - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Second_Anutin_cabinet"
        },
        {
          "title": "House of Representatives (Thailand) — Wikipedia (political groups of the 27th House, elected 8 February 2026: Government 292, Opposition 207, 1 vacant of 500)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Thailand)"
        }
      ]
    },
    {
      "id": "TH-NDP",
      "country": "TH",
      "shortName": "New Democracy Party",
      "name": "พรรคประชาธิปไตยใหม่",
      "nameEn": "New Democracy Party",
      "logo": "party-logos/th/ndp.jpg",
      "sha256": "819ba13cddf6db32d134700e86558f18bc4b3d0a7b9e38e2872c22056dd65c9f",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:New_Democracy_Party_th_logo.jpg",
      "licenceNote": "Logo hosted locally on English Wikipedia (not Commons) as a non-free file used under fair use solely to identify the New Democracy Party; it is not freely licensed for general reuse.",
      "ideology": [
        "Social democracy"
      ],
      "ideologyPosition": "centre-left",
      "founded": 2011,
      "leader": "Suratin Pichan",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2026–present",
      "seats": 1,
      "seatsTotal": 500,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The New Democracy Party logo features the Democracy Monument of Bangkok set inside a cogwheel and rice stalks, symbolising constitutional democracy, industrial labour, and agriculture.",
        "sources": [
          {
            "title": "New Democracy Party (Thailand) - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/New_Democracy_Party_(Thailand)"
          }
        ]
      },
      "sources": [
        {
          "title": "New Democracy Party (Thailand) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/New_Democracy_Party_(Thailand)"
        },
        {
          "title": "Second Anutin cabinet - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Second_Anutin_cabinet"
        },
        {
          "title": "House of Representatives (Thailand) — Wikipedia (political groups of the 27th House, elected 8 February 2026: Government 292, Opposition 207, 1 vacant of 500)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Thailand)"
        }
      ]
    },
    {
      "id": "TH-TPD",
      "country": "TH",
      "shortName": "Thai Pakdee Party",
      "name": "พรรคไทยภักดี",
      "nameEn": "Thai Pakdee Party",
      "logo": "party-logos/th/tpk.png",
      "sha256": "a966410f75bf0cf4acc4b70d2e0738921aa5916edbce778f06dc93f298752b83",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Thaipakdee-logo-2568.png",
      "ideology": [
        "Monarchism",
        "Reactionary conservatism",
        "Right-wing populism",
        "Anti-immigration"
      ],
      "ideologyPosition": "far-right",
      "founded": 2021,
      "leader": "Issaraporn Narin",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "inExecutive": false,
      "seats": 1,
      "seatsTotal": 500,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The Thai Teachers for People Party logo displays an open book with a flaming torch surrounded by lotus petals, representing education, teachers' dignity, and enlightenment for the people.",
        "sources": [
          {
            "title": "House of Representatives (Thailand) - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Thailand)"
          }
        ]
      },
      "sources": [
        {
          "title": "Thai Pakdee Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Thai_Pakdee_Party"
        },
        {
          "title": "2026 Thai general election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2026_Thai_general_election"
        },
        {
          "title": "House of Representatives (Thailand) — Wikipedia (political groups of the 27th House, elected 8 February 2026: Government 292, Opposition 207, 1 vacant of 500)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Thailand)"
        }
      ]
    },
    {
      "id": "TH-TST",
      "country": "TH",
      "shortName": "Thai Sang Thai Party",
      "name": "พรรคไทยสร้างไทย",
      "nameEn": "Thai Sang Thai Party",
      "logo": "party-logos/th/tst.svg",
      "sha256": "6b60f18bd734f691d5bc78d925041778e2c2ee0fab2dc27c622f5cbd6752c8ac",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Thai_Sang_Thai_Party_logo_(2025)_with_name.svg",
      "ideology": [
        "Progressive conservatism",
        "Neoliberalism",
        "Antimilitarism",
        "Constitutional monarchism"
      ],
      "ideologyPosition": "centre-right",
      "founded": 2021,
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2026–present",
      "seats": 2,
      "seatsTotal": 500,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The Thai Sang Thai logo features an interlocking blue and red knot / flower symbol surrounded by circular petals, signifying the weaving together of national unity and economic revival.",
        "sources": [
          {
            "title": "Thai Sang Thai Party - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Thai_Sang_Thai_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "Thai Sang Thai Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Thai_Sang_Thai_Party"
        },
        {
          "title": "2026 Thai general election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2026_Thai_general_election"
        },
        {
          "title": "Second Anutin cabinet - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Second_Anutin_cabinet"
        },
        {
          "title": "House of Representatives (Thailand) — Wikipedia (political groups of the 27th House, elected 8 February 2026: Government 292, Opposition 207, 1 vacant of 500)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Thailand)"
        }
      ]
    },
    {
      "id": "TH-PPP",
      "country": "TH",
      "shortName": "People's Power Party",
      "name": "People's Power Party",
      "nameEn": "People's Power Party",
      "noImageReason": "No Wikipedia article (English or Thai) or Wikidata entry could be located for this 2025-founded party as of September 2026, so no logo could be sourced. It is distinct from the unrelated, older People's Power Party (Thailand) of 1998–2008. The Thai-script official name could likewise not be independently verified and is left as the English name used in Wikipedia's election-results table, rather than guessed.",
      "ideology": [],
      "ideologyPosition": "other",
      "positionRaw": "Not documented in any accessible source",
      "founded": 2025,
      "inPower": true,
      "inExecutive": false,
      "timeInPower": "2026–present",
      "seats": 1,
      "seatsTotal": 500,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "2026 Thai general election - Wikipedia (party-list results table, party linked as 'People's Power Party (Thailand, 2025)')",
          "url": "https://en.wikipedia.org/wiki/2026_Thai_general_election"
        },
        {
          "title": "Second Anutin cabinet - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Second_Anutin_cabinet"
        },
        {
          "title": "House of Representatives (Thailand) — Wikipedia (political groups of the 27th House, elected 8 February 2026: Government 292, Opposition 207, 1 vacant of 500)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Thailand)"
        }
      ]
    },
    {
      "id": "TH-TLP",
      "country": "TH",
      "shortName": "Thai Liberal Party",
      "name": "พรรคเสรีรวมไทย",
      "nameEn": "Thai Liberal Party",
      "logo": "party-logos/th/tlp.png",
      "sha256": "115df3e108249214d440dea2f8efc4da52c00c0ebfbd3bb0d2fa7d92a3b20c94",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Thai_Liberal_Party_logo.png",
      "licenceNote": "Logo hosted locally on English Wikipedia (not Commons) as a non-free file used under fair use solely to identify the Thai Liberal Party; it is not freely licensed for general reuse.",
      "ideology": [
        "Progressive conservatism",
        "Antimilitarism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre to centre-right",
      "founded": 2013,
      "leader": "Sereepisuth Temeeyaves",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "inExecutive": false,
      "seats": 1,
      "seatsTotal": 500,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The Thai Liberal Party logo features a yellow shield bearing a roaring golden tiger head surrounded by national flag stripes, symbolising courage, anti-corruption enforcement, and righteous strength.",
        "sources": [
          {
            "title": "Thai Liberal Party - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Thai_Liberal_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "Thai Liberal Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Thai_Liberal_Party"
        },
        {
          "title": "2026 Thai general election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2026_Thai_general_election"
        },
        {
          "title": "House of Representatives (Thailand) — Wikipedia (political groups of the 27th House, elected 8 February 2026: Government 292, Opposition 207, 1 vacant of 500)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Thailand)"
        }
      ]
    },
    {
      "id": "TH-NAP",
      "country": "TH",
      "shortName": "New Alternative Party",
      "name": "พรรคทางเลือกใหม่",
      "nameEn": "New Alternative Party",
      "noImageReason": "The 'logo' field in the English Wikipedia 'New Alternative Party (Thailand)' infobox is blank, and no corresponding file was found on Wikimedia Commons or Wikidata as of September 2026.",
      "ideology": [],
      "ideologyPosition": "other",
      "positionRaw": "No ideology or left-right position documented in the sourced infobox",
      "founded": 2018,
      "leader": "Rachen Tagunviang",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2026–present",
      "seats": 1,
      "seatsTotal": 500,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "New Alternative Party (Thailand) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/New_Alternative_Party_(Thailand)"
        },
        {
          "title": "Second Anutin cabinet - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Second_Anutin_cabinet"
        },
        {
          "title": "House of Representatives (Thailand) — Wikipedia (political groups of the 27th House, elected 8 February 2026: Government 292, Opposition 207, 1 vacant of 500)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Thailand)"
        }
      ]
    },
    {
      "id": "TH-TRP",
      "country": "TH",
      "shortName": "Thai Ruam Palang Party",
      "name": "พรรคไทรวมพลัง",
      "nameEn": "Thai Ruam Palang Party",
      "logo": "party-logos/th/trp.jpg",
      "sha256": "5bcdbd75adce7e72afcf9e9a3d41b4f6def41cc8c420c692fbfa80357d9a17c4",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Thai_Ruamphalang_Party_Logo.jpg",
      "ideology": [],
      "ideologyPosition": "centre-right",
      "positionRaw": "Not explicitly stated in the infobox; Wikipedia categorizes the article under 'Centre-right parties in Asia', 'Liberal conservative parties' and 'Populist parties'",
      "founded": 2021,
      "previousNames": [
        {
          "name": "Pheu Thai Ruam Power Party",
          "years": "2021–2024 (renamed to Thai Ruamphalang/Thai Ruam Palang in April 2024)"
        }
      ],
      "leader": "Wasawat Puangphonsri",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "inExecutive": false,
      "seats": 6,
      "seatsTotal": 500,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The Fair Party (Thai Ruam Palang) logo displays stylized interlocking rings in red, yellow, and blue, representing solidarity, fairness, and mutual cooperation across society.",
        "sources": [
          {
            "title": "Fair Party (Thailand) - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Fair_Party_(Thailand)"
          }
        ]
      },
      "sources": [
        {
          "title": "Thai Ruam Palang Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Thai_Ruam_Palang_Party"
        },
        {
          "title": "2026 Thai general election - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2026_Thai_general_election"
        },
        {
          "title": "House of Representatives (Thailand) — Wikipedia (political groups of the 27th House, elected 8 February 2026: Government 292, Opposition 207, 1 vacant of 500)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Thailand)"
        }
      ]
    },
    {
      "id": "TH-PPRP",
      "country": "TH",
      "shortName": "Palang Pracharath Party",
      "name": "พรรคพลังประชารัฐ",
      "nameEn": "Palang Pracharath Party",
      "logo": "party-logos/th/pprp.png",
      "sha256": "682d3062430bf35ff25271b51d7afa003a41da975eb1e571d8bfcb3ce798f19b",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Logo_of_the_Palang_Pracharath_Party_(2025).png",
      "licenceNote": "Logo hosted locally on English Wikipedia (not Commons) as a non-free file used under fair use solely to identify the Palang Pracharath Party; it is not freely licensed for general reuse.",
      "ideology": [
        "Militarism",
        "National conservatism",
        "Right-wing populism",
        "Monarchism",
        "Economic populism"
      ],
      "ideologyPosition": "right",
      "founded": 2018,
      "leader": "Trinuch Thienthong",
      "leaderTitle": "Acting Party Leader",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2026–present",
      "seats": 5,
      "seatsTotal": 500,
      "chamberName": "House of Representatives",
      "logoMeaning": {
        "description": "The Palang Pracharath logo features a tricolor hexagon in red, white, and blue (the colors of the Thai flag) symbolizing stability, royalist conservatism, and patriotic strength.",
        "sources": [
          {
            "title": "Palang Pracharath Party - Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Palang_Pracharath_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "Palang Pracharath Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Palang_Pracharath_Party"
        },
        {
          "title": "Second Anutin cabinet - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Second_Anutin_cabinet"
        },
        {
          "title": "House of Representatives (Thailand) — Wikipedia (political groups of the 27th House, elected 8 February 2026: Government 292, Opposition 207, 1 vacant of 500)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Thailand)"
        }
      ]
    },
    {
      "id": "TH-NOP",
      "country": "TH",
      "shortName": "New Opportunity Party",
      "name": "พรรคโอกาสใหม่",
      "nameEn": "New Opportunity Party",
      "noImageReason": "The 'logo' field in the English Wikipedia 'New Opportunity Party' infobox is blank, and no corresponding file was found on Wikimedia Commons or Wikidata as of September 2026.",
      "ideology": [
        "Neoconservatism",
        "Monarchism"
      ],
      "ideologyPosition": "centre-right",
      "founded": 2025,
      "leader": "Jatuporn Buruspat",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2026–present",
      "seats": 1,
      "seatsTotal": 500,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "New Opportunity Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/New_Opportunity_Party"
        },
        {
          "title": "Second Anutin cabinet - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Second_Anutin_cabinet"
        },
        {
          "title": "House of Representatives (Thailand) — Wikipedia (political groups of the 27th House, elected 8 February 2026: Government 292, Opposition 207, 1 vacant of 500)",
          "url": "https://en.wikipedia.org/wiki/House_of_Representatives_(Thailand)"
        }
      ]
    }
  ],
  "UA": [
    {
      "id": "UA-SN",
      "country": "UA",
      "shortName": "Servant of the People",
      "name": "Слуга народу",
      "nameEn": "Servant of the People",
      "logo": "party-logos/ua/sn.svg",
      "sha256": "09310b2f4a0e4408ee07b4911ecaa178bee1514feb87a9f1ee6652cd30f2ae27",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Servant_of_the_People_Party_Logo.svg",
      "ideology": [
        "Ukrainian liberalism",
        "Valence populism"
      ],
      "ideologyPosition": "centre",
      "founded": 2017,
      "leader": "Oleksandr Korniyenko",
      "leaderTitle": "Chairman",
      "inPower": true,
      "timeInPower": "2019-present",
      "seats": 226,
      "seatsTotal": 450,
      "chamberName": "Verkhovna Rada",
      "sources": [
        {
          "title": "Servant of the People - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Servant_of_the_People"
        },
        {
          "title": "9th Ukrainian Verkhovna Rada - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/9th_Ukrainian_Verkhovna_Rada"
        }
      ]
    },
    {
      "id": "UA-ES",
      "country": "UA",
      "shortName": "European Solidarity",
      "name": "Європейська солідарність",
      "nameEn": "European Solidarity",
      "logo": "party-logos/ua/es.svg",
      "sha256": "f749e29fc057ddba7dfaa621856dcf3418bb643d16d20bfef8343258ca354c5d",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:European_Solidarity_2021.svg",
      "ideology": [
        "Liberal conservatism",
        "Christian democracy",
        "National democracy",
        "Anti-corruption",
        "Pro-Europeanism"
      ],
      "ideologyPosition": "centre-right",
      "founded": 2000,
      "previousNames": [
        {
          "name": "Солідарність",
          "nameEn": "Solidarity",
          "years": "2000–2013"
        },
        {
          "name": "Блок Петра Порошенка",
          "nameEn": "Petro Poroshenko Bloc",
          "years": "2014–2019"
        }
      ],
      "leader": "Petro Poroshenko",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 26,
      "seatsTotal": 450,
      "chamberName": "Verkhovna Rada",
      "sources": [
        {
          "title": "European Solidarity - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/European_Solidarity"
        }
      ]
    },
    {
      "id": "UA-BT",
      "country": "UA",
      "shortName": "Batkivshchyna",
      "name": "Всеукраїнське об'єднання \"Батьківщина\"",
      "nameEn": "All-Ukrainian Union \"Fatherland\"",
      "logo": "party-logos/ua/bt.svg",
      "sha256": "3900bac1e764e5a07a3bbea0ca7ed774581147a9a2b5044238bf48b164e33c19",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_of_the_All-Ukrainian_Union_%22Fatherland%22.svg",
      "licenceNote": "Bundled from Wikimedia Commons under CC BY-SA 4.0 (author: Ivan Ch RU); attribution and share-alike terms apply per the Commons file page.",
      "ideology": [
        "Populism",
        "Social democracy",
        "National democracy",
        "Ukrainian nationalism",
        "Pro-Europeanism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left overall (party); centre to centre-right (parliamentary faction, per Wikipedia)",
      "founded": 1999,
      "leader": "Yulia Tymoshenko",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 25,
      "seatsTotal": 450,
      "chamberName": "Verkhovna Rada",
      "sources": [
        {
          "title": "Batkivshchyna - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Batkivshchyna"
        }
      ]
    },
    {
      "id": "UA-HL",
      "country": "UA",
      "shortName": "Holos",
      "name": "Голос",
      "nameEn": "Voice",
      "logo": "party-logos/ua/hl.svg",
      "sha256": "0645d1179decbe1c2fc2cb60c69eefd8fe043bbb2531bade1a6bab14fb424263",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Holos_logo_2020.svg",
      "ideology": [
        "Ukrainian liberalism",
        "Anti-corruption",
        "Pro-Europeanism"
      ],
      "ideologyPosition": "centre-right",
      "founded": 2019,
      "leader": "Kira Rudik",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 19,
      "seatsTotal": 450,
      "chamberName": "Verkhovna Rada",
      "sources": [
        {
          "title": "Holos (political party) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Holos_(political_party)"
        }
      ]
    },
    {
      "id": "UA-DV",
      "country": "UA",
      "shortName": "Dovira",
      "name": "Довіра",
      "nameEn": "Trust",
      "noImageReason": "No infobox logo image is present on either the English (en.wikipedia.org/wiki/Dovira) or Ukrainian (uk.wikipedia.org/wiki/Довіра_(політична_партія)) Wikipedia articles for this party as of 2026-09; no Wikimedia Commons file for a Dovira party logo could be located either. Retry by searching commons.wikimedia.org/wiki/Category:Logos_of_political_parties_in_Ukraine for a 'Dovira'/'Довіра' entry in a future session.",
      "ideology": [
        "Regionalism",
        "Big tent"
      ],
      "ideologyPosition": "other",
      "positionRaw": "No left-right position is stated in sourced infoboxes (described as a big-tent/regionalist group of formerly non-partisan deputies)",
      "founded": 2019,
      "leader": "Oleh Kulinich",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 19,
      "seatsTotal": 450,
      "chamberName": "Verkhovna Rada",
      "sources": [
        {
          "title": "Dovira - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Dovira"
        }
      ]
    },
    {
      "id": "UA-FT",
      "country": "UA",
      "shortName": "For the Future",
      "name": "За майбутнє",
      "nameEn": "For the Future",
      "logo": "party-logos/ua/ft.svg",
      "sha256": "1d768476ef40e0ee451895280d2481ded08f36cb4bf3a36f7bece1bfd01cd37b",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:%D0%9F%D0%BE%D0%BB%D1%96%D1%82%D0%B8%D1%87%D0%BD%D0%B0_%D0%BF%D0%B0%D1%80%D1%82%D1%96%D1%8F_%C2%AB%D0%97%D0%B0_%D0%BC%D0%B0%D0%B9%D0%B1%D1%83%D1%82%D0%BD%D1%94%C2%BB_(%D0%BB%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_2020).svg",
      "ideology": [
        "Liberalism",
        "Economic nationalism",
        "Populism"
      ],
      "ideologyPosition": "centre-right",
      "founded": 2007,
      "previousNames": [
        {
          "name": "Україна майбутнього",
          "nameEn": "Ukraine of the Future",
          "years": "2007–2019"
        }
      ],
      "leader": "Ihor Palytsia",
      "leaderTitle": "Chairperson",
      "inPower": false,
      "seats": 17,
      "seatsTotal": 450,
      "chamberName": "Verkhovna Rada",
      "sources": [
        {
          "title": "For the Future (political party) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/For_the_Future_(political_party)"
        }
      ]
    }
  ],
  "AT": [
    {
      "id": "AT-FPOE",
      "country": "AT",
      "shortName": "FPÖ",
      "name": "Freiheitliche Partei Österreichs",
      "nameEn": "Freedom Party of Austria",
      "logo": "party-logos/at/fpoe.png",
      "sha256": "e5eca0d49f7ca96b5a099ec51d38f1f0e5d69a67f1bf65cea7903a97cd607592",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:FPÖ_Logo.svg",
      "licenceNote": "Non-free party logo used to identify the party in its infobox; used here to identify the party, not to imply endorsement.",
      "ideology": [
        "National conservatism",
        "Right-wing populism",
        "Euroscepticism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 1956,
      "leader": "Herbert Kickl",
      "leaderTitle": "Chairman",
      "inPower": false,
      "seats": 0,
      "seatsTotal": 183,
      "chamberName": "National Council",
      "sources": [
        {
          "title": "Freedom Party of Austria - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Freedom_Party_of_Austria"
        }
      ]
    },
    {
      "id": "AT-SPOE",
      "country": "AT",
      "shortName": "SPÖ",
      "name": "Österreichische Sozialdemokratische Partei",
      "nameEn": "Austrian Social Democratic Party",
      "logo": "party-logos/at/spoe.png",
      "sha256": "f26d8855ea8a9bed54dace453fb3b894641fd930eadfda301bc4196ec3d7ddc3",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:SPÖ_Logo.svg",
      "licenceNote": "Non-free party logo used to identify the party in its infobox; used here to identify the party, not to imply endorsement.",
      "ideology": [
        "Social democracy",
        "Progressivism"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Centre-left",
      "founded": 1863,
      "leader": "Andreas Babler",
      "leaderTitle": "Chairman",
      "inPower": true,
      "timeInPower": "2020-present",
      "seats": 41,
      "seatsTotal": 183,
      "chamberName": "National Council",
      "sources": [
        {
          "title": "Austrian Social Democratic Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Austrian_Social_Democratic_Party"
        }
      ]
    }
  ],
  "BD": [
    {
      "id": "BD-BNP",
      "country": "BD",
      "shortName": "BNP",
      "name": "Bangladesh Nationalist Party",
      "nameEn": "Bangladesh Nationalist Party",
      "logo": "party-logos/bd/bnp.png",
      "sha256": "02bfaa736c96f82cb32e8ce50147d752efc89a7024349ef73e70d80763622086",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Bangladesh_Nationalist_Party_symbol.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": [
        "Conservatism",
        "Nationalism",
        "Right-wing populism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 1978,
      "leader": "Begum Khaleda Zia",
      "leaderTitle": "Chairperson",
      "inPower": false,
      "seats": 0,
      "seatsTotal": 272,
      "chamberName": "Jatiya Sangsad",
      "sources": [
        {
          "title": "Bangladesh Nationalist Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Bangladesh_Nationalist_Party"
        }
      ]
    }
  ],
  "BR": [
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
      "leader": "Valdemar Costa Neto",
      "leaderTitle": "President",
      "inPower": false,
      "inExecutive": false,
      "seats": 98,
      "seatsTotal": 513,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Liberal Party — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Liberal_Party_(Brazil,_2006)"
        },
        {
          "title": "Câmara dos Deputados — Dados Abertos, /deputados (current bench: 513 deputies by party, retrieved 11 September 2026)",
          "url": "https://dadosabertos.camara.leg.br/api/v2/deputados"
        },
        {
          "title": "Câmara dos Deputados — Bancada atual",
          "url": "https://www.camara.leg.br/deputados/bancada-atual"
        },
        {
          "title": "Chamber of Deputies (Brazil) — Wikipedia (political groups: Government 207, Opposition 151, Independent 158)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Brazil)"
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
        "Democratic socialism",
        "Social democracy",
        "Progressivism"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left",
      "founded": 1980,
      "coalitionId": "BR-FE",
      "leader": "Edinho Silva",
      "leaderTitle": "National President",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2023-present",
      "seats": 64,
      "seatsTotal": 513,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The Workers' Party logo features a red geometric design representing the party's socialist heritage and commitment to workers' rights. The red color symbolizes solidarity with the labor movement and left-wing ideological commitments. The modern geometric style reflects the party's contemporary approach to social democracy and progressive change in Brazil.",
        "sources": [
          {
            "title": "Workers' Party (Brazil) — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Workers'_Party_(Brazil)"
          }
        ]
      },
      "sources": [
        {
          "title": "Workers' Party (Brazil) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Workers'_Party_(Brazil)"
        },
        {
          "title": "Câmara dos Deputados — Dados Abertos, /deputados (current bench: 513 deputies by party, retrieved 11 September 2026)",
          "url": "https://dadosabertos.camara.leg.br/api/v2/deputados"
        },
        {
          "title": "Câmara dos Deputados — Bancada atual",
          "url": "https://www.camara.leg.br/deputados/bancada-atual"
        },
        {
          "title": "Chamber of Deputies (Brazil) — Wikipedia (political groups: Government 207, Opposition 151, Independent 158)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Brazil)"
        },
        {
          "title": "Second cabinet of Lula da Silva — Wikipedia (Supporting parties table and the cabinet's own party key: ministries held per party)",
          "url": "https://en.wikipedia.org/wiki/Second_cabinet_of_Lula_da_Silva"
        }
      ]
    },
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
      "coalitionId": "BR-UP",
      "leader": "Antônio Rueda",
      "leaderTitle": "National President",
      "inPower": true,
      "inExecutive": true,
      "seats": 52,
      "seatsTotal": 513,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The União Brasil logo features a stylized shield design representing unity and national strength. The logo incorporates the party's founding principle of bringing together different political forces to create a centrist coalition. The geometric design reflects the party's modern, pragmatic approach to Brazilian politics and its centrist positioning.",
        "sources": [
          {
            "title": "União Brasil — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Uni%C3%A3o_Brasil"
          }
        ]
      },
      "sources": [
        {
          "title": "União Brasil — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Uni%C3%A3o_Brasil"
        },
        {
          "title": "Antônio Rueda Wikipedia article",
          "url": "https://en.wikipedia.org/wiki/Ant%C3%B4nio_Rueda"
        },
        {
          "title": "Câmara dos Deputados — Dados Abertos, /deputados (current bench: 513 deputies by party, retrieved 11 September 2026)",
          "url": "https://dadosabertos.camara.leg.br/api/v2/deputados"
        },
        {
          "title": "Câmara dos Deputados — Bancada atual",
          "url": "https://www.camara.leg.br/deputados/bancada-atual"
        },
        {
          "title": "Chamber of Deputies (Brazil) — Wikipedia (political groups: Government 207, Opposition 151, Independent 158)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Brazil)"
        },
        {
          "title": "Second cabinet of Lula da Silva — Wikipedia (Supporting parties table and the cabinet's own party key: ministries held per party)",
          "url": "https://en.wikipedia.org/wiki/Second_cabinet_of_Lula_da_Silva"
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
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre to centre-right",
      "founded": 2011,
      "leader": "Gilberto Kassab",
      "leaderTitle": "National President",
      "inPower": true,
      "inExecutive": true,
      "seats": 48,
      "seatsTotal": 513,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The PSD logo features a modernist design representing the party's commitment to social democracy and progressive governance. The stylized emblem reflects the party's centrist positioning and emphasis on institutional reform and democratic participation. The design captures the party's focus on pragmatic social democratic policies in Brazil.",
        "sources": [
          {
            "title": "Social Democratic Party (Brazil) — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Social_Democratic_Party_(Brazil)"
          }
        ]
      },
      "sources": [
        {
          "title": "Brazilian Democratic Movement — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Brazilian_Democratic_Movement"
        },
        {
          "title": "Câmara dos Deputados — Dados Abertos, /deputados (current bench: 513 deputies by party, retrieved 11 September 2026)",
          "url": "https://dadosabertos.camara.leg.br/api/v2/deputados"
        },
        {
          "title": "Câmara dos Deputados — Bancada atual",
          "url": "https://www.camara.leg.br/deputados/bancada-atual"
        },
        {
          "title": "Chamber of Deputies (Brazil) — Wikipedia (political groups: Government 207, Opposition 151, Independent 158)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Brazil)"
        },
        {
          "title": "Second cabinet of Lula da Silva — Wikipedia (Supporting parties table and the cabinet's own party key: ministries held per party)",
          "url": "https://en.wikipedia.org/wiki/Second_cabinet_of_Lula_da_Silva"
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
      "coalitionId": "BR-UP",
      "leader": "Ciro Nogueira",
      "leaderTitle": "National President",
      "inPower": true,
      "inExecutive": true,
      "seats": 46,
      "seatsTotal": 513,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The Progressistas logo features a modernist design representing the party's commitment to progressive governance and centrism. The emblem symbolizes the party's pragmatic approach to Brazilian politics and its emphasis on institutional development. The design reflects the party's long history in Brazilian centrist politics since its founding in 1965.",
        "sources": [
          {
            "title": "Progressistas — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Progressistas"
          }
        ]
      },
      "sources": [
        {
          "title": "Progressistas — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Progressistas"
        },
        {
          "title": "Câmara dos Deputados — Dados Abertos, /deputados (current bench: 513 deputies by party, retrieved 11 September 2026)",
          "url": "https://dadosabertos.camara.leg.br/api/v2/deputados"
        },
        {
          "title": "Câmara dos Deputados — Bancada atual",
          "url": "https://www.camara.leg.br/deputados/bancada-atual"
        },
        {
          "title": "Chamber of Deputies (Brazil) — Wikipedia (political groups: Government 207, Opposition 151, Independent 158)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Brazil)"
        },
        {
          "title": "Second cabinet of Lula da Silva — Wikipedia (Supporting parties table and the cabinet's own party key: ministries held per party)",
          "url": "https://en.wikipedia.org/wiki/Second_cabinet_of_Lula_da_Silva"
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
        "Right-wing populism",
        "Social conservatism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 2003,
      "leader": "Marcos Pereira",
      "leaderTitle": "National President",
      "inPower": true,
      "inExecutive": true,
      "seats": 42,
      "seatsTotal": 513,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The Republicanos logo features a stylized eagle design symbolizing the party's nationalist and conservative values. The emblem represents strength, freedom, and republican ideals rooted in Brazilian civic values. The design reflects the party's right-wing conservative positioning and emphasis on social and moral values in Brazilian politics.",
        "sources": [
          {
            "title": "Republicanos — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Republicanos_(Brazil)"
          }
        ]
      },
      "sources": [
        {
          "title": "Republicanos — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Republicanos_(Brazil)"
        },
        {
          "title": "Câmara dos Deputados — Dados Abertos, /deputados (current bench: 513 deputies by party, retrieved 11 September 2026)",
          "url": "https://dadosabertos.camara.leg.br/api/v2/deputados"
        },
        {
          "title": "Câmara dos Deputados — Bancada atual",
          "url": "https://www.camara.leg.br/deputados/bancada-atual"
        },
        {
          "title": "Chamber of Deputies (Brazil) — Wikipedia (political groups: Government 207, Opposition 151, Independent 158)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Brazil)"
        },
        {
          "title": "Second cabinet of Lula da Silva — Wikipedia (Supporting parties table and the cabinet's own party key: ministries held per party)",
          "url": "https://en.wikipedia.org/wiki/Second_cabinet_of_Lula_da_Silva"
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
        "Neoliberalism",
        "Christian democracy",
        "Big tent"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre to centre-right",
      "founded": 1966,
      "leader": "Baleia Rossi",
      "leaderTitle": "National President",
      "inPower": true,
      "inExecutive": true,
      "seats": 38,
      "seatsTotal": 513,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The MDB logo features a stylized design incorporating the party's initials in a modern, centrist aesthetic. The blue color represents institutional stability and democratic governance. As Brazil's largest centrist party, the MDB emblem reflects its pragmatic approach to Brazilian politics and commitment to democratic institutions and dialogue.",
        "sources": [
          {
            "title": "Brazilian Democratic Movement — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Brazilian_Democratic_Movement"
          }
        ]
      },
      "sources": [
        {
          "title": "Movimento Democrático Brasileiro — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Movimento_Democr%C3%A1tico_Brasileiro"
        },
        {
          "title": "Câmara dos Deputados — Dados Abertos, /deputados (current bench: 513 deputies by party, retrieved 11 September 2026)",
          "url": "https://dadosabertos.camara.leg.br/api/v2/deputados"
        },
        {
          "title": "Câmara dos Deputados — Bancada atual",
          "url": "https://www.camara.leg.br/deputados/bancada-atual"
        },
        {
          "title": "Chamber of Deputies (Brazil) — Wikipedia (political groups: Government 207, Opposition 151, Independent 158)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Brazil)"
        },
        {
          "title": "Second cabinet of Lula da Silva — Wikipedia (Supporting parties table and the cabinet's own party key: ministries held per party)",
          "url": "https://en.wikipedia.org/wiki/Second_cabinet_of_Lula_da_Silva"
        }
      ]
    },
    {
      "id": "BR-PODEMOS",
      "country": "BR",
      "shortName": "PODEMOS",
      "name": "Podemos",
      "nameEn": "We Can",
      "logo": "party-logos/br/podemos.svg",
      "sha256": "f23f7fd47cc0f38ec15f7ed518e14249438ae9921269951900bc2b5500e04343",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Podemos_(Brasil)_logo.svg",
      "ideology": [
        "Economic liberalism",
        "Anti-corruption"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1995,
      "leader": "Renata Abreu",
      "leaderTitle": "President",
      "inPower": false,
      "inExecutive": false,
      "seats": 27,
      "seatsTotal": 513,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The Podemos logo features a rising sun or star design symbolizing hope, progress, and the belief that positive change is possible. The emblem represents the party's grassroots democratic movement for political transformation. The upward-pointing rays emphasize the party's commitment to social democracy, progressivism, and environmental sustainability in Brazil.",
        "sources": [
          {
            "title": "Podemos (Brazil) — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Podemos_(Brazil)"
          }
        ]
      },
      "sources": [
        {
          "title": "Podemos (Brazil) — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Podemos_(Brazil)"
        },
        {
          "title": "Câmara dos Deputados — Dados Abertos, /deputados (current bench: 513 deputies by party, retrieved 11 September 2026)",
          "url": "https://dadosabertos.camara.leg.br/api/v2/deputados"
        },
        {
          "title": "Câmara dos Deputados — Bancada atual",
          "url": "https://www.camara.leg.br/deputados/bancada-atual"
        },
        {
          "title": "Chamber of Deputies (Brazil) — Wikipedia (political groups: Government 207, Opposition 151, Independent 158)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Brazil)"
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
        "Social liberalism",
        "Neoliberalism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre to centre-right",
      "founded": 1988,
      "coalitionId": "BR-AF",
      "leader": "Aécio Neves",
      "leaderTitle": "President",
      "inPower": false,
      "inExecutive": false,
      "seats": 18,
      "seatsTotal": 513,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The PSDB logo features a blue and orange design representing the party's centrist positioning and commitment to social democracy in Brazil. The colors symbolize optimism and institutional stability. The stylized emblem reflects the party's commitment to democratic governance and progressive liberal economic policies.",
        "sources": [
          {
            "title": "Brazilian Social Democracy Party — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Brazilian_Social_Democracy_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "Brazilian Social Democracy Party — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Brazilian_Social_Democracy_Party"
        },
        {
          "title": "Câmara dos Deputados — Dados Abertos, /deputados (current bench: 513 deputies by party, retrieved 11 September 2026)",
          "url": "https://dadosabertos.camara.leg.br/api/v2/deputados"
        },
        {
          "title": "Câmara dos Deputados — Bancada atual",
          "url": "https://www.camara.leg.br/deputados/bancada-atual"
        },
        {
          "title": "Chamber of Deputies (Brazil) — Wikipedia (political groups: Government 207, Opposition 151, Independent 158)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Brazil)"
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
        "Social democracy",
        "Progressivism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre to centre-left",
      "founded": 1989,
      "leader": "João Henrique Campos",
      "leaderTitle": "President",
      "inPower": true,
      "inExecutive": true,
      "seats": 17,
      "seatsTotal": 513,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Brazilian Socialist Party — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Brazilian_Socialist_Party"
        },
        {
          "title": "Câmara dos Deputados — Dados Abertos, /deputados (current bench: 513 deputies by party, retrieved 11 September 2026)",
          "url": "https://dadosabertos.camara.leg.br/api/v2/deputados"
        },
        {
          "title": "Câmara dos Deputados — Bancada atual",
          "url": "https://www.camara.leg.br/deputados/bancada-atual"
        },
        {
          "title": "Chamber of Deputies (Brazil) — Wikipedia (political groups: Government 207, Opposition 151, Independent 158)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Brazil)"
        },
        {
          "title": "Second cabinet of Lula da Silva — Wikipedia (Supporting parties table and the cabinet's own party key: ministries held per party)",
          "url": "https://en.wikipedia.org/wiki/Second_cabinet_of_Lula_da_Silva"
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
        "Progressivism",
        "LGBTQ+ rights"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing to far-left",
      "founded": 2004,
      "coalitionId": "BR-PSOLREDE",
      "leader": "Paula Coradi",
      "leaderTitle": "President",
      "inPower": true,
      "inExecutive": true,
      "seats": 13,
      "seatsTotal": 513,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The PSOL logo features a red and stylized design representing the party's democratic socialist and progressive commitments. The emblem symbolizes liberation, social justice, and the party's strong advocacy for LGBTQ+ rights, workers' rights, and social equality. The red color reflects socialist traditions, while the modern design emphasizes the party's contemporary approach to leftist politics and social transformation.",
        "sources": [
          {
            "title": "Socialism and Freedom Party — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Socialism_and_Freedom_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "Socialism and Freedom Party — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Socialism_and_Freedom_Party"
        },
        {
          "title": "Câmara dos Deputados — Dados Abertos, /deputados (current bench: 513 deputies by party, retrieved 11 September 2026)",
          "url": "https://dadosabertos.camara.leg.br/api/v2/deputados"
        },
        {
          "title": "Câmara dos Deputados — Bancada atual",
          "url": "https://www.camara.leg.br/deputados/bancada-atual"
        },
        {
          "title": "Chamber of Deputies (Brazil) — Wikipedia (political groups: Government 207, Opposition 151, Independent 158)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Brazil)"
        },
        {
          "title": "Second cabinet of Lula da Silva — Wikipedia (Supporting parties table and the cabinet's own party key: ministries held per party)",
          "url": "https://en.wikipedia.org/wiki/Second_cabinet_of_Lula_da_Silva"
        }
      ]
    },
    {
      "id": "BR-PCDOB",
      "country": "BR",
      "shortName": "PCDOB",
      "name": "Partido Comunista do Brasil",
      "nameEn": "Communist Party of Brazil",
      "logo": "party-logos/br/pcdob.svg",
      "sha256": "0fb1a3813ff9d4b47e904f4b0ec6b9a2ac8e763be2a354afa5895e4826fe4464",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:PCdoB_logo.svg",
      "ideology": [
        "Communism",
        "Marxism–Leninism"
      ],
      "ideologyPosition": "far-left",
      "founded": 1962,
      "coalitionId": "BR-FE",
      "leader": "Luciana Santos",
      "leaderTitle": "National President",
      "inPower": true,
      "inExecutive": true,
      "seats": 11,
      "seatsTotal": 513,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The PCdoB logo features a hammer and sickle design representing communist ideology and the party's Marxist-Leninist heritage. The emblem symbolizes the party's commitment to workers' rights, class struggle, and socialist transformation. The red color reflects communist and socialist traditions, representing the party's revolutionary ideological foundation since its establishment in 1962.",
        "sources": [
          {
            "title": "Communist Party of Brazil — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Communist_Party_of_Brazil"
          }
        ]
      },
      "sources": [
        {
          "title": "Communist Party of Brazil — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Communist_Party_of_Brazil"
        },
        {
          "title": "Câmara dos Deputados — Dados Abertos, /deputados (current bench: 513 deputies by party, retrieved 11 September 2026)",
          "url": "https://dadosabertos.camara.leg.br/api/v2/deputados"
        },
        {
          "title": "Câmara dos Deputados — Bancada atual",
          "url": "https://www.camara.leg.br/deputados/bancada-atual"
        },
        {
          "title": "Chamber of Deputies (Brazil) — Wikipedia (political groups: Government 207, Opposition 151, Independent 158)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Brazil)"
        },
        {
          "title": "Second cabinet of Lula da Silva — Wikipedia (Supporting parties table and the cabinet's own party key: ministries held per party)",
          "url": "https://en.wikipedia.org/wiki/Second_cabinet_of_Lula_da_Silva"
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
        "Labourism",
        "Getulism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1979,
      "leader": "Carlos Lupi",
      "leaderTitle": "President",
      "inPower": true,
      "inExecutive": true,
      "seats": 9,
      "seatsTotal": 513,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Democratic Labour Party — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Democratic_Labour_Party_(Brazil)"
        },
        {
          "title": "Câmara dos Deputados — Dados Abertos, /deputados (current bench: 513 deputies by party, retrieved 11 September 2026)",
          "url": "https://dadosabertos.camara.leg.br/api/v2/deputados"
        },
        {
          "title": "Câmara dos Deputados — Bancada atual",
          "url": "https://www.camara.leg.br/deputados/bancada-atual"
        },
        {
          "title": "Chamber of Deputies (Brazil) — Wikipedia (political groups: Government 207, Opposition 151, Independent 158)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Brazil)"
        },
        {
          "title": "Second cabinet of Lula da Silva — Wikipedia (Supporting parties table and the cabinet's own party key: ministries held per party)",
          "url": "https://en.wikipedia.org/wiki/Second_cabinet_of_Lula_da_Silva"
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
        "Environmentalism",
        "Progressivism",
        "Liberalism"
      ],
      "ideologyPosition": "centre-left",
      "founded": 1986,
      "coalitionId": "BR-FE",
      "leader": "José Luiz Penna",
      "leaderTitle": "President",
      "inPower": true,
      "inExecutive": false,
      "seats": 6,
      "seatsTotal": 513,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The Partido Verde logo features a stylized green design symbolizing the party's core commitment to environmentalism and ecological preservation. The green color represents nature, sustainability, and the party's dedication to environmental protection and conservation. The emblem reflects the party's progressive stance on environmental issues and ecological responsibility in Brazilian politics.",
        "sources": [
          {
            "title": "Green Party (Brazil) — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Green_Party_(Brazil)"
          }
        ]
      },
      "sources": [
        {
          "title": "Green Party (Brazil) — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Green_Party_(Brazil)"
        },
        {
          "title": "Câmara dos Deputados — Dados Abertos, /deputados (current bench: 513 deputies by party, retrieved 11 September 2026)",
          "url": "https://dadosabertos.camara.leg.br/api/v2/deputados"
        },
        {
          "title": "Câmara dos Deputados — Bancada atual",
          "url": "https://www.camara.leg.br/deputados/bancada-atual"
        },
        {
          "title": "Chamber of Deputies (Brazil) — Wikipedia (political groups: Government 207, Opposition 151, Independent 158)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Brazil)"
        },
        {
          "title": "Second cabinet of Lula da Silva — Wikipedia (Supporting parties table and the cabinet's own party key: ministries held per party)",
          "url": "https://en.wikipedia.org/wiki/Second_cabinet_of_Lula_da_Silva"
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
      "leaderTitle": "President",
      "inPower": false,
      "inExecutive": false,
      "seats": 5,
      "seatsTotal": 513,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "New Party — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/New_Party_(Brazil)"
        },
        {
          "title": "Câmara dos Deputados — Dados Abertos, /deputados (current bench: 513 deputies by party, retrieved 11 September 2026)",
          "url": "https://dadosabertos.camara.leg.br/api/v2/deputados"
        },
        {
          "title": "Câmara dos Deputados — Bancada atual",
          "url": "https://www.camara.leg.br/deputados/bancada-atual"
        },
        {
          "title": "Chamber of Deputies (Brazil) — Wikipedia (political groups: Government 207, Opposition 151, Independent 158)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Brazil)"
        }
      ]
    },
    {
      "id": "BR-AVANTE",
      "country": "BR",
      "shortName": "Avante",
      "name": "Avante",
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
      "leader": "Luis Tibé",
      "leaderTitle": "President",
      "inPower": true,
      "inExecutive": false,
      "seats": 5,
      "seatsTotal": 513,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Avante — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Avante_(political_party)"
        },
        {
          "title": "Câmara dos Deputados — Dados Abertos, /deputados (current bench: 513 deputies by party, retrieved 11 September 2026)",
          "url": "https://dadosabertos.camara.leg.br/api/v2/deputados"
        },
        {
          "title": "Câmara dos Deputados — Bancada atual",
          "url": "https://www.camara.leg.br/deputados/bancada-atual"
        },
        {
          "title": "Chamber of Deputies (Brazil) — Wikipedia (political groups: Government 207, Opposition 151, Independent 158)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Brazil)"
        },
        {
          "title": "Second cabinet of Lula da Silva — Wikipedia (Supporting parties table and the cabinet's own party key: ministries held per party)",
          "url": "https://en.wikipedia.org/wiki/Second_cabinet_of_Lula_da_Silva"
        }
      ]
    },
    {
      "id": "BR-SOLIDARIEDADE",
      "country": "BR",
      "shortName": "Solidariedade",
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
      "positionRaw": "Centre",
      "founded": 2012,
      "coalitionId": "BR-RS",
      "leader": "Paulo Pereira da Silva",
      "leaderTitle": "President",
      "inPower": true,
      "inExecutive": false,
      "seats": 4,
      "seatsTotal": 513,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Solidarity — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Solidarity_(Brazil)"
        },
        {
          "title": "Câmara dos Deputados — Dados Abertos, /deputados (current bench: 513 deputies by party, retrieved 11 September 2026)",
          "url": "https://dadosabertos.camara.leg.br/api/v2/deputados"
        },
        {
          "title": "Câmara dos Deputados — Bancada atual",
          "url": "https://www.camara.leg.br/deputados/bancada-atual"
        },
        {
          "title": "Chamber of Deputies (Brazil) — Wikipedia (political groups: Government 207, Opposition 151, Independent 158)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Brazil)"
        },
        {
          "title": "Second cabinet of Lula da Silva — Wikipedia (Supporting parties table and the cabinet's own party key: ministries held per party)",
          "url": "https://en.wikipedia.org/wiki/Second_cabinet_of_Lula_da_Silva"
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
        "Environmentalism"
      ],
      "ideologyPosition": "other",
      "positionRaw": "Social: left-wing; fiscal: right-wing",
      "founded": 2013,
      "coalitionId": "BR-PSOLREDE",
      "leader": "Heloísa Helena",
      "leaderTitle": "Leader",
      "inPower": true,
      "inExecutive": true,
      "seats": 3,
      "seatsTotal": 513,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Sustainability Network — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Sustainability_Network"
        },
        {
          "title": "Câmara dos Deputados — Dados Abertos, /deputados (current bench: 513 deputies by party, retrieved 11 September 2026)",
          "url": "https://dadosabertos.camara.leg.br/api/v2/deputados"
        },
        {
          "title": "Câmara dos Deputados — Bancada atual",
          "url": "https://www.camara.leg.br/deputados/bancada-atual"
        },
        {
          "title": "Chamber of Deputies (Brazil) — Wikipedia (political groups: Government 207, Opposition 151, Independent 158)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Brazil)"
        },
        {
          "title": "Second cabinet of Lula da Silva — Wikipedia (Supporting parties table and the cabinet's own party key: ministries held per party)",
          "url": "https://en.wikipedia.org/wiki/Second_cabinet_of_Lula_da_Silva"
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
      "coalitionId": "BR-RS",
      "leader": "Marcus Vinícius Neskau",
      "leaderTitle": "President",
      "inPower": false,
      "inExecutive": false,
      "seats": 3,
      "seatsTotal": 513,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Democratic Renewal Party — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Democratic_Renewal_Party_(Brazil)"
        },
        {
          "title": "Câmara dos Deputados — Dados Abertos, /deputados (current bench: 513 deputies by party, retrieved 11 September 2026)",
          "url": "https://dadosabertos.camara.leg.br/api/v2/deputados"
        },
        {
          "title": "Câmara dos Deputados — Bancada atual",
          "url": "https://www.camara.leg.br/deputados/bancada-atual"
        },
        {
          "title": "Chamber of Deputies (Brazil) — Wikipedia (political groups: Government 207, Opposition 151, Independent 158)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Brazil)"
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
      "coalitionId": "BR-AF",
      "leader": "Comte Bittencourt",
      "leaderTitle": "President",
      "inPower": false,
      "inExecutive": false,
      "seats": 2,
      "seatsTotal": 513,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The Cidadania logo features a stylized human figure or geometric design representing the party's emphasis on citizenship and democratic participation. The emblem symbolizes social inclusion, civic engagement, and the party's centre-left commitment to social democratic values and human development. The design reflects the party's focus on citizenship rights and social responsibility in Brazil.",
        "sources": [
          {
            "title": "Cidadania (Brazil) — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Cidadania_(Brazil)"
          }
        ]
      },
      "sources": [
        {
          "title": "Cidadania (Brazil) — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Cidadania_(Brazil)"
        },
        {
          "title": "Câmara dos Deputados — Dados Abertos, /deputados (current bench: 513 deputies by party, retrieved 11 September 2026)",
          "url": "https://dadosabertos.camara.leg.br/api/v2/deputados"
        },
        {
          "title": "Câmara dos Deputados — Bancada atual",
          "url": "https://www.camara.leg.br/deputados/bancada-atual"
        },
        {
          "title": "Chamber of Deputies (Brazil) — Wikipedia (political groups: Government 207, Opposition 151, Independent 158)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Brazil)"
        }
      ]
    },
    {
      "id": "BR-DC",
      "country": "BR",
      "shortName": "DC",
      "name": "Democracia Cristã",
      "nameEn": "Christian Democracy",
      "logo": "party-logos/br/dc.svg",
      "sha256": "6e8a13e954e943ab6bac60852a2c4bac268230c68dd1780a405121d66d8b1bbd",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logomarca_Democracia_Crist%C3%A3.svg",
      "ideology": [
        "Christian democracy",
        "Catholic social teaching",
        "Paternalistic conservatism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1995,
      "leader": "João Caldas",
      "leaderTitle": "President",
      "inPower": false,
      "inExecutive": false,
      "seats": 1,
      "seatsTotal": 513,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Christian Democracy — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Christian_Democracy_(Brazil)"
        },
        {
          "title": "Câmara dos Deputados — Dados Abertos, /deputados (current bench: 513 deputies by party, retrieved 11 September 2026)",
          "url": "https://dadosabertos.camara.leg.br/api/v2/deputados"
        },
        {
          "title": "Câmara dos Deputados — Bancada atual",
          "url": "https://www.camara.leg.br/deputados/bancada-atual"
        },
        {
          "title": "Chamber of Deputies (Brazil) — Wikipedia (political groups: Government 207, Opposition 151, Independent 158)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Brazil)"
        }
      ]
    },
    {
      "id": "BR-MISSAO",
      "country": "BR",
      "shortName": "MISSÃO",
      "name": "Missão",
      "nameEn": "Mission Party",
      "logo": "party-logos/br/missao.svg",
      "sha256": "f95e55b050d8248f390c1cfb8fba91655e4b46931a930de161b305a134451bf3",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:MISS%C3%83O_wordmark.svg",
      "ideology": [
        "Conservative liberalism",
        "Economic liberalism",
        "Bukelism",
        "Law and order"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing to far-right",
      "founded": 2023,
      "inPower": false,
      "inExecutive": false,
      "seats": 1,
      "seatsTotal": 513,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Mission Party — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Mission_Party_(Brazil)"
        },
        {
          "title": "Câmara dos Deputados — Dados Abertos, /deputados (current bench: 513 deputies by party, retrieved 11 September 2026)",
          "url": "https://dadosabertos.camara.leg.br/api/v2/deputados"
        },
        {
          "title": "Câmara dos Deputados — Bancada atual",
          "url": "https://www.camara.leg.br/deputados/bancada-atual"
        },
        {
          "title": "Chamber of Deputies (Brazil) — Wikipedia (political groups: Government 207, Opposition 151, Independent 158)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Brazil)"
        }
      ]
    }
  ],
  "CA": [
    {
      "id": "CA-LIB",
      "country": "CA",
      "shortName": "LIB",
      "name": "Liberal Party of Canada",
      "nameEn": "Liberal Party of Canada",
      "logo": "party-logos/ca/lpc.svg",
      "sha256": "bb4018fd39dee8bf32d5c1dcacafce90ba4db481b6c5d8395db33598ece2a026",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Liberal_Party_of_Canada_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": [
        "Liberalism",
        "Social liberalism",
        "Centrism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 1867,
      "leader": "Justin Trudeau",
      "leaderTitle": "Leader",
      "inPower": true,
      "timeInPower": "2015-present",
      "seats": 160,
      "seatsTotal": 338,
      "chamberName": "House of Commons",
      "sources": [
        {
          "title": "Liberal Party of Canada - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Liberal_Party_of_Canada"
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
      "nameEn": "Christian Democratic Union",
      "logo": "party-logos/de/cdu.svg",
      "sha256": "91571409a6b3d6013c79b2ff1307309878c30d9c279f434446139eaee76d9c55",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:CDU_Logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": [
        "Christian democracy",
        "Conservatism",
        "Social market economy"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1945,
      "leader": "Friedrich Merz",
      "leaderTitle": "Chairperson",
      "inPower": true,
      "timeInPower": "2021-present",
      "seats": 258,
      "seatsTotal": 630,
      "chamberName": "Bundestag",
      "sources": [
        {
          "title": "Christian Democratic Union - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Christian_Democratic_Union"
        }
      ]
    }
  ],
  "ES": [
    {
      "id": "ES-PP",
      "country": "ES",
      "shortName": "PP",
      "name": "Partido Popular",
      "nameEn": "People's Party",
      "logo": "party-logos/es/pp.svg",
      "sha256": "3e9b0fbd98e1b4cd6547c4148000fa849e655281ca809c093339acc733c45c97",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Partido_Popular_Logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": [
        "Conservatism",
        "Christian democracy",
        "European conservatism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Centre-right",
      "founded": 1989,
      "leader": "Alberto Núñez Feijóo",
      "leaderTitle": "Party President",
      "inPower": true,
      "inExecutive": false,
      "timeInPower": "2023-present",
      "seats": 136,
      "seatsTotal": 350,
      "chamberName": "Congress of Deputies",
      "sources": [
        {
          "title": "People's Party (Spain) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/People's_Party_(Spain)"
        }
      ]
    }
  ],
  "FR": [
    {
      "id": "FR-ENSEMBLE",
      "country": "FR",
      "shortName": "ENSEMBLE",
      "name": "Ensemble pour la République",
      "nameEn": "Together for the Republic",
      "logo": "party-logos/fr/en.svg",
      "sha256": "4079eda0a0accbf30491bd73b6d29ce6cda67d394c1bf6d57abd0d568ef0322c",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Ensemble_pour_la_République_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": [
        "Centrism",
        "Social liberalism",
        "Europeanism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 2022,
      "leader": "Gabriel Attal",
      "leaderTitle": "Former Prime Minister (Jan-Mar 2024)",
      "inPower": true,
      "inExecutive": false,
      "timeInPower": "2022-present",
      "seats": 250,
      "seatsTotal": 577,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Ensemble for the Republic - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Ensemble_for_the_Republic"
        },
        {
          "title": "Gabriel Attal - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Gabriel_Attal"
        }
      ]
    }
  ],
  "GB": [
    {
      "id": "GB-LAB",
      "country": "GB",
      "shortName": "LAB",
      "name": "Labour Party",
      "nameEn": "Labour Party",
      "logo": "party-logos/gb/labour.svg",
      "sha256": "ab47261debf135f500f108b76abab8167ec0955265be57f5e51b0c4fc0f940ac",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:UK_Labour_Party_Logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": [
        "Social democracy",
        "Democratic socialism",
        "Progressivism"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Centre-left",
      "founded": 1900,
      "leader": "Keir Starmer",
      "leaderTitle": "Prime Minister (2024–present)",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2024-present",
      "seats": 412,
      "seatsTotal": 650,
      "chamberName": "House of Commons",
      "sources": [
        {
          "title": "Labour Party (UK) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Labour_Party_(UK)"
        }
      ]
    }
  ],
  "AU": [
    {
      "id": "AU-ALP",
      "country": "AU",
      "shortName": "ALP",
      "name": "Australian Labor Party",
      "logo": "party-logos/au/alp.svg",
      "sha256": "00568c9c740fa06937ab3a327bf277aff7443c2c884a7e8d36326d3275721d3c",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:ALP_logo_2017.svg",
      "licenceNote": "Hosted locally on English Wikipedia (not Commons) under a public-domain / PD-textlogo determination as a simple design; bundled here to identify the Australian Labor Party, not to imply endorsement.",
      "ideology": [
        "Social democracy"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1891,
      "leader": "Anthony Albanese",
      "leaderTitle": "Leader",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2022–present",
      "seats": 94,
      "seatsTotal": 150,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Australian Labor Party – Wikipedia (infobox: oldest branches 1891, ideology Social democracy, position Centre-left, leader Anthony Albanese)",
          "url": "https://en.wikipedia.org/wiki/Australian_Labor_Party"
        },
        {
          "title": "Second Albanese ministry – Wikipedia (Labor ministry formed 13 May 2025; Anthony Albanese Prime Minister)",
          "url": "https://en.wikipedia.org/wiki/Second_Albanese_ministry"
        },
        {
          "title": "Members of the Australian House of Representatives, 2025–2028 – Wikipedia (Current party standings, as of 25 June 2026)",
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
      "licenceNote": "Hosted locally on English Wikipedia (not Commons) under a public-domain / PD-textlogo determination as a simple design; bundled here to identify the Liberal Party of Australia, not to imply endorsement.",
      "ideology": [
        "Liberal conservatism",
        "Conservatism (Australian)",
        "Liberalism (Australian)",
        "Right-wing populism (faction)"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right to right-wing",
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
          "title": "Liberal Party of Australia – Wikipedia (infobox: founded 13 October 1944, ideology, position Centre-right to right-wing, leader Angus Taylor)",
          "url": "https://en.wikipedia.org/wiki/Liberal_Party_of_Australia"
        },
        {
          "title": "Members of the Australian House of Representatives, 2025–2028 – Wikipedia (Current party standings: Liberal 17, counted separately from the 16 LNP seats)",
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
          "title": "Liberal National Party of Queensland – Wikipedia (infobox: formed 26 July 2008 by merger of the Queensland Liberal and National divisions; ideology, position, leader David Crisafulli)",
          "url": "https://en.wikipedia.org/wiki/Liberal_National_Party_of_Queensland"
        },
        {
          "title": "Members of the Australian House of Representatives, 2025–2028 – Wikipedia (Current party standings: LNP 16, listed separately from Liberal and National)",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Australian_House_of_Representatives,_2025%E2%80%932028"
        },
        {
          "title": "48th Parliament of Australia – Wikipedia (Party summary; Changes in membership, House of Representatives)",
          "url": "https://en.wikipedia.org/wiki/48th_Parliament_of_Australia"
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
          "title": "National Party of Australia – Wikipedia (founded as the Australian Country Party 1920, renamed National Country Party 1975 and National Party of Australia 1982; leader Matt Canavan since 11 March 2026)",
          "url": "https://en.wikipedia.org/wiki/National_Party_of_Australia"
        },
        {
          "title": "Members of the Australian House of Representatives, 2025–2028 – Wikipedia (Current party standings: National 8, counted separately from the 16 LNP seats)",
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
      "licenceNote": "Hosted locally on English Wikipedia (not Commons) under a public-domain / PD-textlogo determination as a simple design; bundled here to identify Pauline Hanson's One Nation, not to imply endorsement.",
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
          "title": "One Nation – Wikipedia (infobox: founded 11 April 1997, ideology, position Right-wing to far-right, leader Pauline Hanson)",
          "url": "https://en.wikipedia.org/wiki/One_Nation_(Australia)"
        },
        {
          "title": "48th Parliament of Australia – Wikipedia (Changes in membership: Barnaby Joyce joined One Nation 8 December 2025; David Farley won Farrer for One Nation at the by-election held 9 May 2026)",
          "url": "https://en.wikipedia.org/wiki/48th_Parliament_of_Australia"
        },
        {
          "title": "Members of the Australian House of Representatives, 2025–2028 – Wikipedia (Current party standings, as of 25 June 2026)",
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
      "licenceNote": "Non-free logo bundled under Wikipedia's fair-use rationale to identify Community Strong Australia; used here to identify the party, not to imply endorsement.",
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
          "title": "Community Strong Australia – Wikipedia (infobox: founded 25 June 2026; ideology Environmentalism, Liberalism, Social liberalism; position Centre; no single leader designated)",
          "url": "https://en.wikipedia.org/wiki/Community_Strong_Australia"
        },
        {
          "title": "48th Parliament of Australia – Wikipedia (Changes in membership: Allegra Spender, Wentworth, and Zali Steggall, Warringah, founded Community Strong on 25 June 2026, having sat as independents)",
          "url": "https://en.wikipedia.org/wiki/48th_Parliament_of_Australia"
        },
        {
          "title": "Members of the Australian House of Representatives, 2025–2028 – Wikipedia (Current party standings, as of 25 June 2026)",
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
          "title": "Australian Greens – Wikipedia (infobox: founded 1992, ideology, position Left-wing, leader Larissa Waters)",
          "url": "https://en.wikipedia.org/wiki/Australian_Greens"
        },
        {
          "title": "Members of the Australian House of Representatives, 2025–2028 – Wikipedia (Current party standings, as of 25 June 2026)",
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
      "licenceNote": "Hosted locally on English Wikipedia (not Commons) under a public-domain / PD-textlogo determination as a simple design; bundled here to identify Katter's Australian Party, not to imply endorsement.",
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
          "title": "Katter's Australian Party – Wikipedia (infobox: founded 5 June 2011, ideology list, leader Robbie Katter; the political-position field is deliberately left blank by talk-page consensus, so no positionRaw is recorded here)",
          "url": "https://en.wikipedia.org/wiki/Katter%27s_Australian_Party"
        },
        {
          "title": "The mice that may yet roar: who are the minor right-wing parties? – The Conversation (classifies Katter's Australian Party among Australia's minor right-wing parties)",
          "url": "https://theconversation.com/the-mice-that-may-yet-roar-who-are-the-minor-right-wing-parties-17305"
        },
        {
          "title": "Members of the Australian House of Representatives, 2025–2028 – Wikipedia (Current party standings, as of 25 June 2026)",
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
      "licenceNote": "Non-free logo bundled under Wikipedia's fair-use rationale to identify Centre Alliance; used here to identify the party, not to imply endorsement.",
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
          "title": "Centre Alliance – Wikipedia (founded 1 July 2013 as the Nick Xenophon Team, renamed Centre Alliance 8 June 2018; ideology, position Centre; no designated parliamentary leader — sole MP Rebekha Sharkie describes herself as \"a party of one\")",
          "url": "https://en.wikipedia.org/wiki/Centre_Alliance"
        },
        {
          "title": "Members of the Australian House of Representatives, 2025–2028 – Wikipedia (Current party standings, as of 25 June 2026)",
          "url": "https://en.wikipedia.org/wiki/Members_of_the_Australian_House_of_Representatives,_2025%E2%80%932028"
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
      "logo": "party-logos/it/fdi.svg",
      "sha256": "4b642e7dad1b0f8b625a34c903963389d78d1e13b843452fed16237320f81962",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Fratelli_d'Italia_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Conservatism", "Right-wing nationalism", "Euroscepticism"],
      "ideologyPosition": "far-right",
      "positionRaw": "Right",
      "founded": 2012,
      "leader": "Giorgia Meloni",
      "leaderTitle": "Party President",
      "inPower": true,
      "timeInPower": "2022-present",
      "seats": 115,
      "seatsTotal": 400,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Fratelli d'Italia - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Fratelli_d'Italia"
        }
      ]
    },
    {
      "id": "IT-PD",
      "country": "IT",
      "shortName": "PD",
      "name": "Partito Democratico",
      "nameEn": "Democratic Party",
      "logo": "party-logos/it/pd.svg",
      "sha256": "e483c8d4f39be8288bc98aa795072bd40055027935a442b83951910359d0bbb4",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Partito_Democratico_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Social democracy", "Progressivism"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 2007,
      "leader": "Elly Schlein",
      "leaderTitle": "Party Secretary",
      "inPower": false,
      "seats": 69,
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
      "logo": "party-logos/it/m5s.svg",
      "sha256": "9b19c5ec7cb39d18aba572b566ea03015a0d6fad2f39d86881e3f79d065185d2",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Movimento_5_Stelle_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Populism", "Euroskepticism", "Environmentalism"],
      "ideologyPosition": "other",
      "positionRaw": "Populist",
      "founded": 2009,
      "leader": "Giuseppe Conte",
      "leaderTitle": "Party President",
      "inPower": false,
      "seats": 63,
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
      "id": "IT-LEGA",
      "country": "IT",
      "shortName": "Lega",
      "name": "Lega per Salvini Premier",
      "nameEn": "League for Salvini Premier",
      "logo": "party-logos/it/lega.svg",
      "sha256": "866b9b07f718a16c2aac0a181d78308138df16557ebe54c5a479d83d78aba9d6",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Lega_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Right-wing populism", "Regionalism", "Nationalism"],
      "ideologyPosition": "right",
      "positionRaw": "Right",
      "founded": 1991,
      "leader": "Matteo Salvini",
      "leaderTitle": "Party Secretary",
      "inPower": true,
      "timeInPower": "2022-present",
      "seats": 30,
      "seatsTotal": 400,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Lega (political party) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Lega_(political_party)"
        }
      ]
    },
    {
      "id": "IT-FI",
      "country": "IT",
      "shortName": "FI",
      "name": "Forza Italia",
      "nameEn": "Forward Italy",
      "logo": "party-logos/it/fi.svg",
      "sha256": "d19f2823dbcfbf81eb7de437ddb60c2e16cd6cb2cbf9a8e6d90ff83f3e3aff4c",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Forza_Italia_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Liberalism", "Conservatism", "Christian democracy"],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1994,
      "leader": "Silvio Berlusconi",
      "leaderTitle": "Party President",
      "inPower": true,
      "timeInPower": "2022-present",
      "seats": 37,
      "seatsTotal": 400,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Forza Italia - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Forza_Italia"
        }
      ]
    },
    {
      "id": "IT-AVS",
      "country": "IT",
      "shortName": "AVS",
      "name": "Alleanza Verdi Sinistra",
      "nameEn": "Green Left Alliance",
      "logo": "party-logos/it/avs.svg",
      "sha256": "67f2aa5768d3f471de48601bd4c1ff16bea6bf03b768c7749a3d781096a4028a",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Alleanza_Verdi_Sinistra_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Environmentalism", "Socialism", "Progressivism"],
      "ideologyPosition": "left",
      "positionRaw": "Left",
      "founded": 2021,
      "leader": "Angelo Bonelli",
      "leaderTitle": "Co-President",
      "inPower": false,
      "seats": 13,
      "seatsTotal": 400,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Green Left Alliance - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Green_Left_Alliance_(Italy)"
        }
      ]
    }
  ],
  "MX": [
    {
      "id": "MX-MORENA",
      "country": "MX",
      "shortName": "MORENA",
      "name": "Movimiento Regeneración Nacional",
      "nameEn": "National Regeneration Movement",
      "logo": "party-logos/mx/morena.svg",
      "sha256": "4e072dfe1ef0b591c7eaf741034648e11ad7cc0f431d2cdc90714ccb648a537b",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:MORENA_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Populism", "Leftism", "Anti-corruption"],
      "ideologyPosition": "left",
      "positionRaw": "Centre-left",
      "founded": 2014,
      "leader": "Claudia Sheinbaum",
      "leaderTitle": "President (2024–present)",
      "inPower": true,
      "timeInPower": "2024-present",
      "seats": 251,
      "seatsTotal": 500,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Movimiento Regeneración Nacional - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Movimiento_Regeneración_Nacional"
        }
      ]
    },
    {
      "id": "MX-PAN",
      "country": "MX",
      "shortName": "PAN",
      "name": "Partido Acción Nacional",
      "nameEn": "National Action Party",
      "logo": "party-logos/mx/pan.svg",
      "sha256": "c74c5570047746b8d306cf874ae52103ba72ff8e2c68557a6d9cb012aa4caa08",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:PAN_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Conservatism", "Liberalism", "Christian democracy"],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1939,
      "leader": "Marko Cortés",
      "leaderTitle": "National President",
      "inPower": false,
      "seats": 72,
      "seatsTotal": 500,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "National Action Party (Mexico) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/National_Action_Party_(Mexico)"
        }
      ]
    },
    {
      "id": "MX-PRI",
      "country": "MX",
      "shortName": "PRI",
      "name": "Partido Revolucionario Institucional",
      "nameEn": "Institutional Revolutionary Party",
      "logo": "party-logos/mx/pri.svg",
      "sha256": "e7e34bce05fbd6c0d0b4a1c420fcf1628e06e641f5ffdce8486dbfd789bdeb69",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:PRI_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Centrism", "Populism"],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 1929,
      "leader": "Alejandro Moreno",
      "leaderTitle": "National President",
      "inPower": false,
      "seats": 41,
      "seatsTotal": 500,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Institutional Revolutionary Party - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Institutional_Revolutionary_Party"
        }
      ]
    }
  ],
  "US": [
    {
      "id": "US-DEM",
      "country": "US",
      "shortName": "Democratic",
      "name": "Democratic Party",
      "nameEn": "Democratic Party",
      "logo": "party-logos/us/dem.svg",
      "sha256": "adc44cd1733b002c1bc4b7883bdbfa0e32812ee9a9f7a1dcdcb89f8c229538a5",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Democratic_Party_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Liberalism", "Progressivism", "Social liberalism"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1828,
      "leader": "Kamala Harris",
      "leaderTitle": "President (2025–present)",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2025-present",
      "seats": 222,
      "seatsTotal": 435,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Democratic Party (United States) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Democratic_Party_(United_States)"
        }
      ]
    },
    {
      "id": "US-REP",
      "country": "US",
      "shortName": "Republican",
      "name": "Republican Party",
      "nameEn": "Republican Party",
      "logo": "party-logos/us/rep.svg",
      "sha256": "d8242a695ee0c5a081c973ae71aa47c75c1efdf831c6a8ce93299640eeeac5ee",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Republican_Party_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Conservatism", "Right-wing populism", "Libertarianism"],
      "ideologyPosition": "right",
      "positionRaw": "Centre-right",
      "founded": 1854,
      "leader": "Donald Trump",
      "leaderTitle": "President (2025–present)",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2025-present",
      "seats": 213,
      "seatsTotal": 435,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Republican Party (United States) - Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Republican_Party_(United_States)"
        }
      ]
    }
  ],
  "CL": [
    {
      "id": "CL-REP",
      "country": "CL",
      "shortName": "Republicano",
      "name": "Partido Republicano",
      "nameEn": "Republican Party",
      "logo": "party-logos/cl/republican.svg",
      "sha256": "64828f923732cca4503abf628e3e3c0bbccf9ea908a6b00e7b0c2da59b63e785",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Republican_Party_of_Chile_logo.svg",
      "ideology": [
        "National conservatism",
        "Economic liberalism",
        "Right-wing populism"
      ],
      "ideologyPosition": "far-right",
      "positionRaw": "Far-right",
      "founded": 2019,
      "leader": "Arturo Squella",
      "leaderTitle": "President",
      "inPower": true,
      "inExecutive": true,
      "seats": 31,
      "seatsTotal": 155,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Republican Party — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Republican_Party_(Chile,_2019)"
        },
        {
          "title": "Chamber of Deputies of Chile — Wikipedia (composition after the 16 November 2025 general election: Government 67, supported by 8, independents 15, opposition 65, of 155)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_of_Chile"
        }
      ]
    },
    {
      "id": "CL-UDI",
      "country": "CL",
      "shortName": "UDI",
      "name": "Unión Demócrata Independiente",
      "nameEn": "Independent Democratic Union",
      "logo": "party-logos/cl/udi.png",
      "sha256": "0d17428274d18a55ac9580c55f5654671d4d5a2d4730429eb01305e71a7520ab",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_of_Independent_Democratic_Union_(Chile).png",
      "ideology": [
        "Conservatism",
        "Right-wing",
        "Neo-liberalism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing to far-right",
      "founded": 1983,
      "leader": "Guillermo Ramírez",
      "leaderTitle": "President",
      "inPower": true,
      "inExecutive": true,
      "seats": 18,
      "seatsTotal": 155,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The Independent Democratic Union logo features a geometric shield design symbolizing independence, democratic governance, and conservative principles. The design emphasizes the party's commitment to free-market economics, individual liberty, and institutional conservatism. As one of the major right-wing parties emerging from Chile's 1973–1990 military period, the logo represents economic neo-liberalism, constitutional conservatism, and democratic participation within a right-wing political framework.",
        "sources": [
          {
            "title": "Independent Democratic Union (Chile) – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Independent_Democratic_Union_(Chile)"
          },
          {
            "title": "Unión Demócrata Independiente – Wikipedia (Spanish)",
            "url": "https://es.wikipedia.org/wiki/Uni%C3%B3n_Democr%C3%A1ta_Independiente"
          }
        ]
      },
      "sources": [
        {
          "title": "Independent Democratic Union — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Independent_Democratic_Union"
        },
        {
          "title": "Chamber of Deputies of Chile — Wikipedia (composition after the 16 November 2025 general election: Government 67, supported by 8, independents 15, opposition 65, of 155)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_of_Chile"
        }
      ]
    },
    {
      "id": "CL-FA",
      "country": "CL",
      "shortName": "FA",
      "name": "Frente Amplio",
      "nameEn": "Broad Front",
      "logo": "party-logos/cl/fa.svg",
      "sha256": "6c5330dd9e82ca8f58e6dedc6576e69928021ba0a5e6f31143e4535394fe1153",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Logo%20of%20the%20Broad%20Front%20(Chile%2C%202024).svg",
      "licenceNote": "Non-free party logo hosted on English Wikipedia under a fair-use rationale; bundled here to identify the Broad Front, not to imply endorsement. Replace if a freely-licensed file becomes available.",
      "ideology": [
        "Left-wing",
        "Progressive",
        "Environmentalism"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing",
      "founded": 2024,
      "leader": "Constanza Martínez",
      "leaderTitle": "President",
      "inPower": false,
      "inExecutive": false,
      "seats": 18,
      "seatsTotal": 155,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The Frente Amplio (Broad Front) logo features a stylized representation emphasizing left-wing progressivism and environmental commitment. The design reflects the coalition's vision of a united left-wing movement bringing together socialists, communists, environmentalists, and progressives to advance social democracy and climate action in Chile.",
        "sources": [
          {
            "title": "Frente Amplio (Chile) — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Frente_Amplio_(Chile)"
          },
          {
            "title": "2021 Chilean general election — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/2021_Chilean_general_election"
          }
        ]
      },
      "sources": [
        {
          "title": "Broad Front — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Broad_Front_(Chilean_political_party)"
        },
        {
          "title": "Chamber of Deputies of Chile — Wikipedia (composition after the 16 November 2025 general election: Government 67, supported by 8, independents 15, opposition 65, of 155)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_of_Chile"
        }
      ]
    },
    {
      "id": "CL-PDG",
      "country": "CL",
      "shortName": "PDG",
      "name": "Partido de la Gente",
      "nameEn": "Party of the People",
      "logo": "party-logos/cl/pdg.png",
      "sha256": "595ffe1e5dd6624b124dcfb669cb06bff2d6a3e5e5ff6f76af9aa39910ee665d",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Pdg_logo_new.png",
      "ideology": [
        "Populism",
        "Catch-all politics",
        "Anti-establishment"
      ],
      "ideologyPosition": "other",
      "positionRaw": "Big tent",
      "founded": 2019,
      "leader": "Dennise Catalán",
      "leaderTitle": "President",
      "inPower": false,
      "inExecutive": false,
      "seats": 15,
      "seatsTotal": 155,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Party of the People — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Party_of_the_People_(Chile)"
        },
        {
          "title": "Chamber of Deputies of Chile — Wikipedia (composition after the 16 November 2025 general election: Government 67, supported by 8, independents 15, opposition 65, of 155)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_of_Chile"
        }
      ]
    },
    {
      "id": "CL-RN",
      "country": "CL",
      "shortName": "RN",
      "name": "Renovación Nacional",
      "nameEn": "National Renewal",
      "logo": "party-logos/cl/rn.png",
      "sha256": "70b8a7054cb3b3ebb6169481e8164296a2aaa12dfa7c3d560e06efd48285be67",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Renovaci%C3%B3n_Nacional_logo_2023.png",
      "ideology": [
        "Conservatism",
        "Centre-right",
        "Liberalism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Centre-right to right-wing",
      "founded": 1987,
      "leader": "Andrea Balladares",
      "leaderTitle": "President",
      "inPower": true,
      "inExecutive": true,
      "seats": 13,
      "seatsTotal": 155,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The National Renewal logo features a stylized design symbolizing renewal, institutional reform, and conservative modernism. The geometric elements emphasize the party's commitment to market liberalism, institutional strength, and centre-right values. Founded during the transition to democracy, the logo represents the party's role in Chilean conservative politics, blending economic liberalism with conservative governance and democratic participation.",
        "sources": [
          {
            "title": "National Renewal (Chile) – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/National_Renewal_(Chile)"
          },
          {
            "title": "Renovación Nacional – Wikipedia (Spanish)",
            "url": "https://es.wikipedia.org/wiki/Renovaci%C3%B3n_Nacional"
          }
        ]
      },
      "sources": [
        {
          "title": "National Renewal — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/National_Renewal_(Chile)"
        },
        {
          "title": "Chamber of Deputies of Chile — Wikipedia (composition after the 16 November 2025 general election: Government 67, supported by 8, independents 15, opposition 65, of 155)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_of_Chile"
        }
      ]
    },
    {
      "id": "CL-PC",
      "country": "CL",
      "shortName": "PC",
      "name": "Partido Comunista de Chile",
      "nameEn": "Communist Party of Chile",
      "logo": "party-logos/cl/pc.svg",
      "sha256": "cd3368bf728e2c81f6b6f9aca46d8cf7fcdab449845269a83ed7842b6405e0d1",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Partido_Comunista_de_Chile.svg",
      "ideology": [
        "Communism",
        "Marxism–Leninism"
      ],
      "ideologyPosition": "far-left",
      "positionRaw": "Left-wing to far-left",
      "founded": 1912,
      "leader": "Lautaro Carmona",
      "leaderTitle": "President",
      "inPower": false,
      "inExecutive": false,
      "seats": 12,
      "seatsTotal": 155,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Communist Party of Chile — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Communist_Party_of_Chile"
        },
        {
          "title": "Chamber of Deputies of Chile — Wikipedia (composition after the 16 November 2025 general election: Government 67, supported by 8, independents 15, opposition 65, of 155)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_of_Chile"
        }
      ]
    },
    {
      "id": "CL-PS",
      "country": "CL",
      "shortName": "PS",
      "name": "Partido Socialista de Chile",
      "nameEn": "Socialist Party of Chile",
      "logo": "party-logos/cl/ps.svg",
      "sha256": "c9099f43f894f149daa64fb323fbeaa905ba21c7402da1566b86b7d49a9390d8",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Emblem_of_the_Socialist_Party_of_Chile.svg",
      "ideology": [
        "Socialism",
        "Left-wing",
        "Progressivism"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Centre-left to left-wing",
      "founded": 1933,
      "leader": "Paulina Vodanovic",
      "leaderTitle": "President",
      "inPower": false,
      "inExecutive": false,
      "seats": 11,
      "seatsTotal": 155,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The Socialist Party logo features left-wing symbolism emphasizing workers' solidarity, social justice, and progressive change. As one of Chile's oldest and most influential left-wing parties, the design represents the party's commitment to socialism, democratic participation, and economic equality. The red colour and symbolism reflect the party's historical role in Chilean labour movements and its advocacy for working-class interests.",
        "sources": [
          {
            "title": "Socialist Party of Chile – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Socialist_Party_of_Chile"
          },
          {
            "title": "Partido Socialista de Chile – Wikipedia (Spanish)",
            "url": "https://es.wikipedia.org/wiki/Partido_Socialista_de_Chile"
          }
        ]
      },
      "sources": [
        {
          "title": "Socialist Party of Chile — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Socialist_Party_of_Chile"
        },
        {
          "title": "Chamber of Deputies of Chile — Wikipedia (composition after the 16 November 2025 general election: Government 67, supported by 8, independents 15, opposition 65, of 155)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_of_Chile"
        }
      ]
    },
    {
      "id": "CL-PPD",
      "country": "CL",
      "shortName": "PPD",
      "name": "Partido por la Democracia",
      "nameEn": "Party for Democracy",
      "logo": "party-logos/cl/ppd.png",
      "sha256": "44324071494d91cc1c8460d830d6911399c556e7007cff20f508f150379abeb0",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_of_the_Party_for_Democracy_(Chile).png",
      "ideology": [
        "Social democracy",
        "Centre-left",
        "Progressivism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1987,
      "leader": "Raúl Soto",
      "leaderTitle": "President",
      "inPower": false,
      "inExecutive": false,
      "seats": 10,
      "seatsTotal": 155,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The Party for Democracy logo features design elements symbolizing democratic participation, social progress, and centre-left values. Founded during Chile's transition to democracy, the logo embodies the party's commitment to democratic socialism, social democracy, and progressive institutional reform. The design reflects the party's belief in democratic governance combined with social and economic justice.",
        "sources": [
          {
            "title": "Party for Democracy (Chile) – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Party_for_Democracy_(Chile)"
          },
          {
            "title": "Partido por la Democracia – Wikipedia (Spanish)",
            "url": "https://es.wikipedia.org/wiki/Partido_por_la_Democracia"
          }
        ]
      },
      "sources": [
        {
          "title": "Party for Democracy — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Party_for_Democracy_(Chile)"
        },
        {
          "title": "Chamber of Deputies of Chile — Wikipedia (composition after the 16 November 2025 general election: Government 67, supported by 8, independents 15, opposition 65, of 155)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_of_Chile"
        }
      ]
    },
    {
      "id": "CL-PDC",
      "country": "CL",
      "shortName": "PDC",
      "name": "Partido Demócrata Cristiano",
      "nameEn": "Christian Democratic Party",
      "logo": "party-logos/cl/pdc.svg",
      "sha256": "c0639d126df0c236c6ac11a5c5776e9a423e1655a5ded9f085d2ea3b75dcfadf",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Emblem_of_the_Christian_Democrat_Party_of_Chile.svg",
      "ideology": [
        "Christian democracy",
        "Centre-right",
        "Social conservatism"
      ],
      "ideologyPosition": "centre",
      "founded": 1957,
      "leader": "Álvaro Ortiz Vera",
      "leaderTitle": "President",
      "inPower": false,
      "inExecutive": false,
      "seats": 8,
      "seatsTotal": 155,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The Christian Democracy Party logo features a white cross symbolizing Christian values and faith-based principles. The shield design emphasizes institutional strength, democratic commitment, and social conservatism rooted in Christian democracy's belief that democratic systems must be grounded in moral and spiritual values. The logo represents the party's historical role as a centrist force advocating for social progress within a Christian ethical framework.",
        "sources": [
          {
            "title": "Christian Democracy Party (Chile) – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Christian_Democracy_Party_(Chile)"
          },
          {
            "title": "Partido Demócrata Cristiano – Wikipedia (Spanish)",
            "url": "https://es.wikipedia.org/wiki/Partido_Democr%C3%A1ta_Cristiano"
          }
        ]
      },
      "sources": [
        {
          "title": "Christian Democratic Party — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Christian_Democratic_Party_(Chile)"
        },
        {
          "title": "Chamber of Deputies of Chile — Wikipedia (composition after the 16 November 2025 general election: Government 67, supported by 8, independents 15, opposition 65, of 155)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_of_Chile"
        }
      ]
    },
    {
      "id": "CL-PNL",
      "country": "CL",
      "shortName": "PNL",
      "name": "Partido Nacional Libertario",
      "nameEn": "National Libertarian Party",
      "logo": "party-logos/cl/pnl.svg",
      "sha256": "fe5736af263d64f2f0845b4f0f0d83080870363c0642ab4e96a1c3ebc52b1e0a",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Partido_Nacional_Libertario.svg",
      "ideology": [
        "Market fundamentalism",
        "Paleolibertarianism",
        "Ultraconservatism"
      ],
      "ideologyPosition": "far-right",
      "positionRaw": "Far-right",
      "founded": 2024,
      "leader": "Johannes Kaiser",
      "leaderTitle": "President",
      "inPower": false,
      "inExecutive": false,
      "seats": 8,
      "seatsTotal": 155,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "National Libertarian Party — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/National_Libertarian_Party"
        },
        {
          "title": "Chamber of Deputies of Chile — Wikipedia (composition after the 16 November 2025 general election: Government 67, supported by 8, independents 15, opposition 65, of 155)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_of_Chile"
        }
      ]
    },
    {
      "id": "CL-PL",
      "country": "CL",
      "shortName": "PL",
      "name": "Partido Liberal de Chile",
      "nameEn": "Liberal Party of Chile",
      "logo": "party-logos/cl/pl.svg",
      "sha256": "8e0fe5fb9626a9cf6d36d130e1e0489c27c8ea315589f18eebce9005735edf5c",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_of_Liberal_Party_of_Chile.svg",
      "ideology": [
        "Social liberalism",
        "Progressivism",
        "Green liberalism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre to centre-left",
      "founded": 2013,
      "leader": "Juan Carlos Urzúa",
      "leaderTitle": "President",
      "inPower": false,
      "inExecutive": false,
      "seats": 3,
      "seatsTotal": 155,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Liberal Party of Chile — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Liberal_Party_(Chile,_2013)"
        },
        {
          "title": "Chamber of Deputies of Chile — Wikipedia (composition after the 16 November 2025 general election: Government 67, supported by 8, independents 15, opposition 65, of 155)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_of_Chile"
        }
      ]
    },
    {
      "id": "CL-EVOPOLI",
      "country": "CL",
      "shortName": "Evópoli",
      "name": "Evolución Política",
      "nameEn": "Political Evolution",
      "logo": "party-logos/cl/evopoli.png",
      "sha256": "60fe03938a9b7c4a37523a8a1cb87341b4c58979fca3e6cb68266ed95a7417bc",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Political%20Evolution%2C%20Ev%C3%B3poli%2C%20party%20logo%2C%20Chile.png",
      "licenceNote": "Non-free party logo hosted on English Wikipedia under a fair-use rationale; bundled here to identify Evópoli, not to imply endorsement. Replace if a freely-licensed file becomes available.",
      "ideology": [
        "Liberal conservatism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 2012,
      "leader": "Luciano Cruz-Coke",
      "leaderTitle": "President",
      "inPower": true,
      "inExecutive": true,
      "seats": 2,
      "seatsTotal": 155,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Political Evolution — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Political_Evolution"
        },
        {
          "title": "Chamber of Deputies of Chile — Wikipedia (composition after the 16 November 2025 general election: Government 67, supported by 8, independents 15, opposition 65, of 155)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_of_Chile"
        }
      ]
    },
    {
      "id": "CL-PRCH",
      "country": "CL",
      "shortName": "PR",
      "name": "Partido Radical de Chile",
      "nameEn": "Radical Party of Chile",
      "logo": "party-logos/cl/prch.svg",
      "sha256": "72b2ccc29de1b8cefc96cca5d20f224c7d33776727624b30b50d19b83677729a",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Emblema_Partido_Radical_Chile.svg",
      "ideology": [
        "Radicalism",
        "Social liberalism",
        "Social democracy"
      ],
      "ideologyPosition": "centre-left",
      "founded": 1863,
      "inPower": false,
      "inExecutive": false,
      "seats": 1,
      "seatsTotal": 155,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The Radical Party logo embodies Chile's oldest political tradition, representing radical liberalism, secularism, and centre-left progressivism. Founded in 1863, the party has championed democratic reform, separation of church and state, and educational advancement. The logo symbolizes the party's historical commitment to radical democracy, institutional reform, and secular values that have shaped modern Chile's democratic development.",
        "sources": [
          {
            "title": "Radical Party of Chile – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Radical_Party_of_Chile"
          },
          {
            "title": "Partido Radical de Chile – Wikipedia (Spanish)",
            "url": "https://es.wikipedia.org/wiki/Partido_Radical_de_Chile"
          }
        ]
      },
      "sources": [
        {
          "title": "Radical Party of Chile — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Radical_Party_of_Chile_(2018)"
        },
        {
          "title": "Chamber of Deputies of Chile — Wikipedia (composition after the 16 November 2025 general election: Government 67, supported by 8, independents 15, opposition 65, of 155)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_of_Chile"
        }
      ]
    },
    {
      "id": "CL-DEMOCRATAS",
      "country": "CL",
      "shortName": "Demócratas",
      "name": "Demócratas",
      "nameEn": "Democrats",
      "logo": "party-logos/cl/democratas.png",
      "sha256": "24dd3337a1af4b07c7e4f7ed0fc8955102997032c4905ecceadff5c876545604",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_Dem%C3%B3cratas_Chile.png",
      "ideology": [
        "Moderate conservatism",
        "Christian humanism",
        "Social liberalism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre to centre-right",
      "founded": 2022,
      "leader": "Ximena Rincón",
      "leaderTitle": "President",
      "inPower": true,
      "inExecutive": true,
      "seats": 1,
      "seatsTotal": 155,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Democrats — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Democrats_(Chile)"
        },
        {
          "title": "Chamber of Deputies of Chile — Wikipedia (composition after the 16 November 2025 general election: Government 67, supported by 8, independents 15, opposition 65, of 155)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_of_Chile"
        }
      ]
    }
  ],
  "CO": [
    {
      "id": "CO-PH",
      "country": "CO",
      "shortName": "Pacto Histórico",
      "name": "Pacto Histórico",
      "nameEn": "Historic Pact",
      "logo": "party-logos/co/pacto.svg",
      "sha256": "51812243ffa0dbde136e388826621a11ce429920057fa6d8ac419cc17024cbdc",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Logo%20of%20the%20Historic%20Pact%20for%20Colombia.svg",
      "licenceNote": "Non-free party logo hosted on English Wikipedia under a fair-use rationale; bundled here to identify the Historic Pact, not to imply endorsement. Replace if a freely-licensed file becomes available.",
      "ideology": [
        "Progressivism"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing",
      "founded": 2025,
      "inPower": false,
      "inExecutive": false,
      "seats": 43,
      "seatsTotal": 183,
      "chamberName": "Chamber of Representatives",
      "sources": [
        {
          "title": "Historic Pact — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Historic_Pact"
        },
        {
          "title": "Cámara de Representantes de Colombia — Wikipedia en español (composición del Congreso 2026–2030, elegido el 8 de marzo de 2026: Gobierno 118, Independientes 11, Oposición 44, escaños especiales 10, de 183)",
          "url": "https://es.wikipedia.org/wiki/C%C3%A1mara_de_Representantes_de_Colombia"
        }
      ]
    },
    {
      "id": "CO-CD",
      "country": "CO",
      "shortName": "Centro Democrático",
      "name": "Centro Democrático",
      "nameEn": "Democratic Centre",
      "logo": "party-logos/co/centro-democratico.svg",
      "sha256": "bf6b448291ec6b1ae4a28aaf58b956b313414ac46857b5afe7080c23578dcbab",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Centro_Democr%C3%A1tico.svg",
      "ideology": [
        "Uribismo",
        "Economic liberalism",
        "Right-wing populism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing to far-right",
      "founded": 2013,
      "leader": "Gabriel Vallejo",
      "leaderTitle": "President",
      "inPower": true,
      "inExecutive": false,
      "seats": 30,
      "seatsTotal": 183,
      "chamberName": "Chamber of Representatives",
      "logoMeaning": {
        "description": "The Centro Democrático logo represents Colombian conservatism and right-wing values under the leadership of former President Álvaro Uribe. The design symbolizes democratic conservatism, institutional strength, and security-focused governance. The party embodies Uribismo—a political movement emphasizing market liberalism, strong state authority, and tough security policies—reflecting traditional conservative Colombian politics combined with modern democratic governance.",
        "sources": [
          {
            "title": "Democratic Centre (Colombia) – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Democratic_Centre_(Colombia)"
          },
          {
            "title": "Centro Democrático – Wikipedia (Spanish)",
            "url": "https://es.wikipedia.org/wiki/Centro_Democr%C3%A1tico"
          }
        ]
      },
      "sources": [
        {
          "title": "Democratic Centre — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Democratic_Center_(Colombia)"
        },
        {
          "title": "Cámara de Representantes de Colombia — Wikipedia en español (composición del Congreso 2026–2030, elegido el 8 de marzo de 2026: Gobierno 118, Independientes 11, Oposición 44, escaños especiales 10, de 183)",
          "url": "https://es.wikipedia.org/wiki/C%C3%A1mara_de_Representantes_de_Colombia"
        }
      ]
    },
    {
      "id": "CO-PLC",
      "country": "CO",
      "shortName": "Liberal",
      "name": "Partido Liberal Colombiano",
      "nameEn": "Colombian Liberal Party",
      "logo": "party-logos/co/liberal.png",
      "sha256": "8a6f729a146f39a047af40cc996408c04258251ab0a20265a22fa1e30e1c8f4c",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Partido_Liberal_Colombiano_Registradur%C3%ADa.png",
      "ideology": [
        "Liberalism",
        "Social democracy"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1848,
      "leader": "César Gaviria",
      "leaderTitle": "President",
      "inPower": true,
      "inExecutive": false,
      "seats": 24,
      "seatsTotal": 183,
      "chamberName": "Chamber of Representatives",
      "logoMeaning": {
        "description": "The Colombian Liberal Party logo represents one of Latin America's oldest liberal political traditions, founded in 1848. The design symbolizes liberalism, democratic participation, and social democratic values. As a centre-left party, it champions civil rights, institutional reform, and progressive social policies while maintaining commitment to democratic capitalism and constitutional governance. The logo reflects the party's historical role in Colombia's struggles for democratic reform and individual freedoms.",
        "sources": [
          {
            "title": "Colombian Liberal Party – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Colombian_Liberal_Party"
          },
          {
            "title": "Partido Liberal Colombiano – Wikipedia (Spanish)",
            "url": "https://es.wikipedia.org/wiki/Partido_Liberal_Colombiano"
          }
        ]
      },
      "sources": [
        {
          "title": "Colombian Liberal Party — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Colombian_Liberal_Party"
        },
        {
          "title": "Cámara de Representantes de Colombia — Wikipedia en español (composición del Congreso 2026–2030, elegido el 8 de marzo de 2026: Gobierno 118, Independientes 11, Oposición 44, escaños especiales 10, de 183)",
          "url": "https://es.wikipedia.org/wiki/C%C3%A1mara_de_Representantes_de_Colombia"
        }
      ]
    },
    {
      "id": "CO-PCC",
      "country": "CO",
      "shortName": "Conservador",
      "name": "Partido Conservador Colombiano",
      "nameEn": "Colombian Conservative Party",
      "logo": "party-logos/co/conservador.png",
      "sha256": "5427911b9f359284397abaefc76b9857b3ecad7c3882319bafc668883d3e8b8a",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Partido_Conservador_Colombiano_Registradur%C3%ADa.png",
      "ideology": [
        "Conservatism (Colombian)",
        "Christian democracy",
        "Neoliberalism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right to right-wing",
      "founded": 1849,
      "leader": "Nadia Blel",
      "leaderTitle": "President",
      "inPower": true,
      "inExecutive": false,
      "seats": 20,
      "seatsTotal": 183,
      "chamberName": "Chamber of Representatives",
      "logoMeaning": {
        "description": "The Colombian Conservative Party logo represents one of Colombia's oldest political institutions, founded in 1849. The design embodies conservatism, Christian democracy, and centre-right values grounded in Catholic social teaching and institutional tradition. The party champions constitutional order, property rights, religious values, and gradual social reform. Its logo symbolizes the party's historical role in Colombian politics, balancing conservative principles with democratic governance and Christian social values.",
        "sources": [
          {
            "title": "Colombian Conservative Party – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Colombian_Conservative_Party"
          },
          {
            "title": "Partido Conservador Colombiano – Wikipedia (Spanish)",
            "url": "https://es.wikipedia.org/wiki/Partido_Conservador_Colombiano"
          }
        ]
      },
      "sources": [
        {
          "title": "Colombian Conservative Party — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Colombian_Conservative_Party"
        },
        {
          "title": "Cámara de Representantes de Colombia — Wikipedia en español (composición del Congreso 2026–2030, elegido el 8 de marzo de 2026: Gobierno 118, Independientes 11, Oposición 44, escaños especiales 10, de 183)",
          "url": "https://es.wikipedia.org/wiki/C%C3%A1mara_de_Representantes_de_Colombia"
        }
      ]
    },
    {
      "id": "CO-U",
      "country": "CO",
      "shortName": "La U",
      "name": "Partido de la U",
      "nameEn": "Union Party for the People",
      "logo": "party-logos/co/partido-u.png",
      "sha256": "607fe865d3c88f6f519bbc88096fb74504aa47717dada6491a2eb4f1b514f64d",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_Partido_U_Colombia.png",
      "ideology": [],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 2005,
      "leader": "Dilian Francisca Toro",
      "leaderTitle": "President",
      "inPower": true,
      "inExecutive": false,
      "seats": 13,
      "seatsTotal": 183,
      "chamberName": "Chamber of Representatives",
      "sources": [
        {
          "title": "Union Party for the People — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Party_of_the_U"
        },
        {
          "title": "Cámara de Representantes de Colombia — Wikipedia en español (composición del Congreso 2026–2030, elegido el 8 de marzo de 2026: Gobierno 118, Independientes 11, Oposición 44, escaños especiales 10, de 183)",
          "url": "https://es.wikipedia.org/wiki/C%C3%A1mara_de_Representantes_de_Colombia"
        }
      ]
    },
    {
      "id": "CO-CR",
      "country": "CO",
      "shortName": "Cambio Radical",
      "name": "Cambio Radical",
      "nameEn": "Radical Change",
      "logo": "party-logos/co/cambio-radical.svg",
      "sha256": "cbb60d0fdac0a2b09356ef5a976e9c51e97d8972d17bbc792972c461332f52b2",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Cambio_Radical_logo.svg",
      "ideology": [
        "Conservative liberalism"
      ],
      "ideologyPosition": "centre-right",
      "founded": 1998,
      "leader": "Germán Córdoba",
      "leaderTitle": "President",
      "inPower": true,
      "inExecutive": false,
      "seats": 12,
      "seatsTotal": 183,
      "chamberName": "Chamber of Representatives",
      "logoMeaning": {
        "description": "The Cambio Radical logo emphasizes radical change and centrist pragmatism in Colombian politics. The design symbolizes the party's commitment to institutional reform, economic modernization, and pragmatic centrist governance. Founded in 2005, the party represents a centrist approach combining liberal economic policies with moderate social reform, emphasizing practical solutions to Colombia's political and economic challenges.",
        "sources": [
          {
            "title": "Cambio Radical (Colombia) – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Cambio_Radical"
          },
          {
            "title": "Cambio Radical – Wikipedia (Spanish)",
            "url": "https://es.wikipedia.org/wiki/Cambio_Radical"
          }
        ]
      },
      "sources": [
        {
          "title": "Radical Change — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Radical_Change"
        },
        {
          "title": "Cámara de Representantes de Colombia — Wikipedia en español (composición del Congreso 2026–2030, elegido el 8 de marzo de 2026: Gobierno 118, Independientes 11, Oposición 44, escaños especiales 10, de 183)",
          "url": "https://es.wikipedia.org/wiki/C%C3%A1mara_de_Representantes_de_Colombia"
        }
      ]
    },
    {
      "id": "CO-AV",
      "country": "CO",
      "shortName": "Alianza Verde",
      "name": "Partido Alianza Verde",
      "nameEn": "Green Alliance",
      "logo": "party-logos/co/verde.webp",
      "sha256": "d8147c41ebcd3aa9d7d61df0d96ae4f427c7dfbaeed52f4bb0a850ccdc8c2ab7",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:AlianzaVerde.webp",
      "ideology": [
        "Green politics",
        "Environmentalism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 2005,
      "leader": "Luis Carlos Avellaneda",
      "leaderTitle": "President",
      "inPower": false,
      "inExecutive": false,
      "seats": 7,
      "seatsTotal": 183,
      "chamberName": "Chamber of Representatives",
      "logoMeaning": {
        "description": "The Colombian Green Party logo emphasizes environmental protection, ecological sustainability, and centre-left progressivism. The green symbolism represents the party's commitment to environmental conservation, climate action, and sustainable development in Colombia. Founded in 2005, the party advocates for ecological policies, environmental justice, and progressive social values, representing Colombia's emerging environmental and progressive political movements.",
        "sources": [
          {
            "title": "Colombian Green Party – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Colombian_Green_Party"
          },
          {
            "title": "Partido Verde Colombiano – Wikipedia (Spanish)",
            "url": "https://es.wikipedia.org/wiki/Partido_Verde_Colombiano"
          }
        ]
      },
      "sources": [
        {
          "title": "Green Alliance — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Green_Alliance_(Colombia)"
        },
        {
          "title": "Cámara de Representantes de Colombia — Wikipedia en español (composición del Congreso 2026–2030, elegido el 8 de marzo de 2026: Gobierno 118, Independientes 11, Oposición 44, escaños especiales 10, de 183)",
          "url": "https://es.wikipedia.org/wiki/C%C3%A1mara_de_Representantes_de_Colombia"
        }
      ]
    },
    {
      "id": "CO-ASI",
      "country": "CO",
      "shortName": "ASI",
      "name": "Alianza Social Independiente",
      "nameEn": "Independent Social Alliance",
      "logo": "party-logos/co/asi.svg",
      "sha256": "44fe2e8b271ad87ec46b7c5ab47cfabb2edfb9549654d3cf587613458dab5c0c",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:ASI_Logo.svg",
      "ideology": [
        "Indigenismo",
        "Progressivism",
        "Reformism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1991,
      "leader": "Alonso Tobón",
      "leaderTitle": "President",
      "inPower": true,
      "inExecutive": false,
      "seats": 2,
      "seatsTotal": 183,
      "chamberName": "Chamber of Representatives",
      "sources": [
        {
          "title": "Independent Social Alliance — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Independent_Social_Alliance"
        },
        {
          "title": "Cámara de Representantes de Colombia — Wikipedia en español (composición del Congreso 2026–2030, elegido el 8 de marzo de 2026: Gobierno 118, Independientes 11, Oposición 44, escaños especiales 10, de 183)",
          "url": "https://es.wikipedia.org/wiki/C%C3%A1mara_de_Representantes_de_Colombia"
        }
      ]
    },
    {
      "id": "CO-CREEMOS",
      "country": "CO",
      "shortName": "Creemos",
      "name": "Creemos Colombia",
      "logo": "party-logos/co/creemos.png",
      "sha256": "5a4749129dea99be871c75f9d1eb5527676c68e6476100c92a6ffbce328df28a",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Creemos_Registradur%C3%ADa.png",
      "ideology": [
        "Economic liberalism",
        "Social conservatism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Derecha (right-wing)",
      "founded": 2015,
      "leader": "Camila Gaviria Barreneche",
      "leaderTitle": "President",
      "inPower": true,
      "inExecutive": false,
      "seats": 2,
      "seatsTotal": 183,
      "chamberName": "Chamber of Representatives",
      "sources": [
        {
          "title": "Creemos Colombia — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://es.wikipedia.org/wiki/Creemos_Colombia"
        },
        {
          "title": "Cámara de Representantes de Colombia — Wikipedia en español (composición del Congreso 2026–2030, elegido el 8 de marzo de 2026: Gobierno 118, Independientes 11, Oposición 44, escaños especiales 10, de 183)",
          "url": "https://es.wikipedia.org/wiki/C%C3%A1mara_de_Representantes_de_Colombia"
        }
      ]
    },
    {
      "id": "CO-NL",
      "country": "CO",
      "shortName": "Nuevo Liberalismo",
      "name": "Nuevo Liberalismo",
      "nameEn": "New Liberalism",
      "logo": "party-logos/co/nuevo-liberalismo.png",
      "sha256": "f1e32d9f845659a3d3343bdd09f369a46b1a05844e51ab1fcd339efa44980803",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_nuevo_liberalismo.png",
      "ideology": [],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 1979,
      "inPower": false,
      "inExecutive": false,
      "seats": 2,
      "seatsTotal": 183,
      "chamberName": "Chamber of Representatives",
      "sources": [
        {
          "title": "New Liberalism — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/New_Liberalism_(Colombia)"
        },
        {
          "title": "Cámara de Representantes de Colombia — Wikipedia en español (composición del Congreso 2026–2030, elegido el 8 de marzo de 2026: Gobierno 118, Independientes 11, Oposición 44, escaños especiales 10, de 183)",
          "url": "https://es.wikipedia.org/wiki/C%C3%A1mara_de_Representantes_de_Colombia"
        }
      ]
    },
    {
      "id": "CO-SN",
      "country": "CO",
      "shortName": "Salvación Nacional",
      "name": "Movimiento de Salvación Nacional",
      "nameEn": "National Salvation Movement",
      "logo": "party-logos/co/msn.svg",
      "sha256": "93560046267e5a7581b9c2e40950adf953c417464328bb346c1ca7aaf0c172a1",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Salvaci%C3%B3n_Nacional_(Colombia).svg",
      "ideology": [],
      "ideologyPosition": "far-right",
      "positionRaw": "Far-right",
      "founded": 1991,
      "leader": "Enrique Gómez Martínez",
      "leaderTitle": "President",
      "inPower": true,
      "inExecutive": false,
      "seats": 1,
      "seatsTotal": 183,
      "chamberName": "Chamber of Representatives",
      "sources": [
        {
          "title": "National Salvation Movement — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/National_Salvation_Movement"
        },
        {
          "title": "Cámara de Representantes de Colombia — Wikipedia en español (composición del Congreso 2026–2030, elegido el 8 de marzo de 2026: Gobierno 118, Independientes 11, Oposición 44, escaños especiales 10, de 183)",
          "url": "https://es.wikipedia.org/wiki/C%C3%A1mara_de_Representantes_de_Colombia"
        }
      ]
    },
    {
      "id": "CO-MIRA",
      "country": "CO",
      "shortName": "MIRA",
      "name": "Movimiento Independiente de Renovación Absoluta",
      "nameEn": "Independent Movement of Absolute Renovation",
      "logo": "party-logos/co/mira.svg",
      "sha256": "ad89f6c570721aec2c661d6bca12e1c684a1ce8bdbd778b2fce6e82bbf166239",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_Partido_MIRA.svg",
      "ideology": [
        "Christian democracy",
        "Social conservatism",
        "Communitarianism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 2000,
      "leader": "Ana Paola Agudelo García",
      "leaderTitle": "President",
      "inPower": false,
      "inExecutive": false,
      "seats": 1,
      "seatsTotal": 183,
      "chamberName": "Chamber of Representatives",
      "sources": [
        {
          "title": "Independent Movement of Absolute Renovation — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://en.wikipedia.org/wiki/Independent_Movement_of_Absolute_Renovation"
        },
        {
          "title": "Cámara de Representantes de Colombia — Wikipedia en español (composición del Congreso 2026–2030, elegido el 8 de marzo de 2026: Gobierno 118, Independientes 11, Oposición 44, escaños especiales 10, de 183)",
          "url": "https://es.wikipedia.org/wiki/C%C3%A1mara_de_Representantes_de_Colombia"
        }
      ]
    },
    {
      "id": "CO-MAIS",
      "country": "CO",
      "shortName": "MAIS",
      "name": "Movimiento Alternativo Indígena y Social",
      "nameEn": "Alternative Indigenous and Social Movement",
      "logo": "party-logos/co/mais.png",
      "sha256": "b07ba080c90f3ad8864fa647135823a325689408da7b73c401ca74fffa92b4f7",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:LogoMais1.png",
      "ideology": [],
      "ideologyPosition": "other",
      "founded": 2013,
      "leader": "Martha Peralta Epieyú",
      "leaderTitle": "President",
      "inPower": false,
      "inExecutive": false,
      "seats": 1,
      "seatsTotal": 183,
      "chamberName": "Chamber of Representatives",
      "sources": [
        {
          "title": "Alternative Indigenous and Social Movement — Wikipedia (infobox: founding, ideology, political position, leader)",
          "url": "https://es.wikipedia.org/wiki/Movimiento_Alternativo_Indígena_y_Social"
        },
        {
          "title": "Cámara de Representantes de Colombia — Wikipedia en español (composición del Congreso 2026–2030, elegido el 8 de marzo de 2026: Gobierno 118, Independientes 11, Oposición 44, escaños especiales 10, de 183)",
          "url": "https://es.wikipedia.org/wiki/C%C3%A1mara_de_Representantes_de_Colombia"
        }
      ]
    }
  ],
  "CN": [
    {
      "id": "CN-CPC",
      "country": "CN",
      "shortName": "CPC",
      "name": "中国共产党",
      "nameEn": "Communist Party of China",
      "logo": "party-logos/CN/Communist Party of China.svg",
      "sha256": "a4a5fde535e97fa92bbc16f677c5b3c5f82d287f746282eb1ce7deae372cc495",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Communist_Party_of_China.svg",
      "ideology": ["Communism", "Marxism-Leninism", "Socialism"],
      "ideologyPosition": "far-left",
      "founded": 1921,
      "leader": "Xi Jinping",
      "leaderTitle": "General Secretary",
      "inPower": true,
      "seats": 2977,
      "seatsTotal": 2977,
      "chamberName": "National People's Congress",
      "sources": [
        {
          "title": "Communist Party of China – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Communist_Party_of_China"
        }
      ]
    }
  ],
  "CV": [
    {
      "id": "CV-PAICV",
      "country": "CV",
      "shortName": "PAICV",
      "name": "Partido Africano da Independência de Cabo Verde",
      "nameEn": "African Party for the Independence of Cape Verde",
      "logo": "party-logos/CV/paicv.svg",
      "sha256": "de2008ec01c8abec957a407a21a9e216b97e315ebbcd71e243be66645d8f7911",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:PAICV_logo.svg",
      "ideology": ["Socialism", "Social democracy"],
      "ideologyPosition": "left",
      "founded": 1956,
      "leader": "Janira Hopffer Almada",
      "leaderTitle": "Party President",
      "inPower": false,
      "seats": 30,
      "seatsTotal": 72,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "African Party for the Independence of Cape Verde – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/African_Party_for_the_Independence_of_Cape_Verde"
        },
        {
          "title": "2021 Cape Verdean general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2021_Cape_Verdean_general_election"
        }
      ]
    },
    {
      "id": "CV-MPD",
      "country": "CV",
      "shortName": "MpD",
      "name": "Movimento para a Democracia",
      "nameEn": "Movement for Democracy",
      "logo": "party-logos/CV/mpd.svg",
      "sha256": "e11adedc5bba624f8cd17cf7555a04d245b795374f087492604eebfd709d50a5",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Movement_for_Democracy_Cape_Verde.svg",
      "ideology": ["Liberal democracy", "Market liberalism"],
      "ideologyPosition": "centre-right",
      "founded": 1990,
      "leader": "Ulisses Correia e Silva",
      "leaderTitle": "Party President",
      "inPower": true,
      "timeInPower": "2021–present",
      "seats": 38,
      "seatsTotal": 72,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Movement for Democracy (Cape Verde) – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Movement_for_Democracy_(Cape_Verde)"
        },
        {
          "title": "2021 Cape Verdean general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2021_Cape_Verdean_general_election"
        }
      ]
    }
  ],
  "GH": [
    {
      "id": "GH-NPP",
      "country": "GH",
      "shortName": "NPP",
      "name": "New Patriotic Party",
      "nameEn": "New Patriotic Party",
      "logo": "party-logos/gh/npp.svg",
      "sha256": "f990862893bd233ef0a1e5441b0f64aebf0af4701960e632a4b25efd780b4a36",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:New_Patriotic_Party_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Conservatism", "Centre-right", "Liberalism"],
      "ideologyPosition": "right",
      "positionRaw": "Centre-right",
      "founded": 1992,
      "leader": "John Mahama",
      "leaderTitle": "Party President",
      "inPower": false,
      "seats": 78,
      "seatsTotal": 275,
      "chamberName": "Parliament",
      "sources": [
        {
          "title": "New Patriotic Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/New_Patriotic_Party_(Ghana)"
        },
        {
          "title": "2024 Ghanaian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Ghanaian_general_election"
        }
      ]
    },
    {
      "id": "GH-NDC",
      "country": "GH",
      "shortName": "NDC",
      "name": "National Democratic Congress",
      "nameEn": "National Democratic Congress",
      "logo": "party-logos/gh/ndc.svg",
      "sha256": "53e6bde1e12316b7b30a462d77530e3f7e5245785ce06cdb29c0e0cb405948a6",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:National_Democratic_Congress_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Social democracy", "Centre-left", "Progressivism"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1992,
      "leader": "John Mahama",
      "leaderTitle": "Party Flagbearer",
      "inPower": true,
      "timeInPower": "2025-present",
      "seats": 169,
      "seatsTotal": 275,
      "chamberName": "Parliament",
      "sources": [
        {
          "title": "National Democratic Congress (Ghana) – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/National_Democratic_Congress_(Ghana)"
        },
        {
          "title": "2024 Ghanaian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Ghanaian_general_election"
        }
      ]
    }
  ],
  "ID": [
    {
      "id": "ID-PDI",
      "country": "ID",
      "shortName": "PDIP",
      "name": "Partai Demokrasi Indonesia Perjuangan",
      "nameEn": "Indonesian Democratic Party of Struggle",
      "logo": "party-logos/id/pdip.svg",
      "sha256": "f3f761dfa60b9774ff50f70e8cfc2f7f8f280ff8c5bc024fc29577c33ecb189b",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:PDI_Perjuangan.svg",
      "ideology": [
        "Nationalism",
        "Centre-left",
        "Populism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1999,
      "leader": "Megawati Sukarnoputri",
      "leaderTitle": "Chairperson",
      "inPower": false,
      "inExecutive": false,
      "seats": 110,
      "seatsTotal": 580,
      "chamberName": "People's Representative Council (DPR)",
      "logoMeaning": {
        "description": "The PDI-P logo features a fierce black bull head (banteng moncong putih) with white snout and horns inside a red circular field. The banteng is a historic Indonesian nationalist symbol representing resilience, mass popular struggle, and democratic solidarity rooted in the teachings of Sukarno.",
        "sources": [
          {
            "title": "Indonesian Democratic Party of Struggle – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Indonesian_Democratic_Party_of_Struggle"
          }
        ]
      },
      "sources": [
        {
          "title": "Indonesian Democratic Party of Struggle – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Indonesian_Democratic_Party_of_Struggle"
        },
        {
          "title": "2024 Indonesian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Indonesian_general_election"
        },
        {
          "title": "House of Representatives (Indonesia) — Wikipedia, seats per Template:DPR RI (580 members, elected 14 February 2024): Government/KIM 348, confidence-and-supply/KIM+ 122, check-and-balance 110",
          "url": "https://en.wikipedia.org/wiki/People%27s_Representative_Council"
        }
      ]
    },
    {
      "id": "ID-GOLKAR",
      "country": "ID",
      "shortName": "Golkar",
      "name": "Golongan Karya",
      "nameEn": "Functional Groups",
      "logo": "party-logos/id/golkar.svg",
      "sha256": "7ec9cc3cc134e0ed32c758a8baab5c4640ab89418c20f369caaab13d87311d81",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_Golkar.svg",
      "ideology": [
        "Centrism",
        "Pragmatism",
        "Developmentalism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 1964,
      "coalitionId": "ID-KIM",
      "leader": "Bahlil Lahadalia",
      "leaderTitle": "Chairman",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2019-present",
      "seats": 102,
      "seatsTotal": 580,
      "chamberName": "People's Representative Council (DPR)",
      "logoMeaning": {
        "description": "The Golkar emblem displays a golden banyan tree (Pohon Beringin) set against a yellow shield flanked by stalks of rice and cotton, with a five-pointed star above. The banyan tree symbolises shelter, strength, and national unity across Indonesia's diverse archipelagic communities, while rice and cotton represent prosperity and social justice.",
        "sources": [
          {
            "title": "Golongan Karya – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Golongan_Karya"
          }
        ]
      },
      "sources": [
        {
          "title": "Golongan Karya – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Golongan_Karya"
        },
        {
          "title": "2024 Indonesian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Indonesian_general_election"
        },
        {
          "title": "House of Representatives (Indonesia) — Wikipedia, seats per Template:DPR RI (580 members, elected 14 February 2024): Government/KIM 348, confidence-and-supply/KIM+ 122, check-and-balance 110",
          "url": "https://en.wikipedia.org/wiki/People%27s_Representative_Council"
        }
      ]
    },
    {
      "id": "ID-GERINDRA",
      "country": "ID",
      "shortName": "Gerindra",
      "name": "Partai Gerakan Indonesia Raya",
      "nameEn": "Greater Indonesia Movement Party",
      "logo": "party-logos/id/gerindra.svg",
      "sha256": "cfd32e248c7f832c6f4af23f2bdf84e10d096e7e975ced034652c62eb005801f",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Partai_Gerakan_Indonesia_Raya_Logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": [
        "Nationalism",
        "Right-wing",
        "Populism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 2008,
      "coalitionId": "ID-KIM",
      "leader": "Prabowo Subianto",
      "leaderTitle": "Chairman (President, 2024–present)",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2024-present",
      "seats": 86,
      "seatsTotal": 580,
      "chamberName": "People's Representative Council (DPR)",
      "logoMeaning": {
        "description": "The Gerindra logo features the golden head of the mythical Garuda bird inside a red circular frame surmounted by a five-pointed star. The Garuda represents national sovereignty, courage, and pride in Indonesian identity, with gold denoting nobility and red denoting bravery.",
        "sources": [
          {
            "title": "Greater Indonesia Movement Party – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Greater_Indonesia_Movement_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "Greater Indonesia Movement Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Greater_Indonesia_Movement_Party"
        },
        {
          "title": "2024 Indonesian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Indonesian_general_election"
        },
        {
          "title": "House of Representatives (Indonesia) — Wikipedia, seats per Template:DPR RI (580 members, elected 14 February 2024): Government/KIM 348, confidence-and-supply/KIM+ 122, check-and-balance 110",
          "url": "https://en.wikipedia.org/wiki/People%27s_Representative_Council"
        }
      ]
    },
    {
      "id": "ID-PKB",
      "country": "ID",
      "shortName": "PKB",
      "name": "Partai Kebangkitan Bangsa",
      "nameEn": "National Awakening Party",
      "logo": "party-logos/id/pkb-2024.png",
      "sha256": "92b2995a7b7e6fc04a0b031fb9f7c3f65f320efe33afad6e7f31d4bf69d327a6",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_PKB_2024.png",
      "ideology": [
        "Islamism",
        "Centre",
        "Pluralism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 1998,
      "leader": "Muhaimin Iskandar",
      "leaderTitle": "Chairman",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2024-present",
      "seats": 68,
      "seatsTotal": 580,
      "chamberName": "People's Representative Council (DPR)",
      "logoMeaning": {
        "description": "The PKB logo depicts a green globe of the Earth surrounded by nine golden stars on an emerald field with Arabic calligraphy. The central and largest star represents Prophet Muhammad, four stars represent the Khulafaur Rasyidin, and four represent the four Mazhabs, reflecting the moderate, pluralistic Islamic heritage of Nahdlatul Ulama.",
        "sources": [
          {
            "title": "National Awakening Party – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/National_Awakening_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "National Awakening Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/National_Awakening_Party"
        },
        {
          "title": "2024 Indonesian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Indonesian_general_election"
        },
        {
          "title": "House of Representatives (Indonesia) — Wikipedia, seats per Template:DPR RI (580 members, elected 14 February 2024): Government/KIM 348, confidence-and-supply/KIM+ 122, check-and-balance 110",
          "url": "https://en.wikipedia.org/wiki/People%27s_Representative_Council"
        }
      ]
    },
    {
      "id": "ID-NASDEM",
      "country": "ID",
      "shortName": "NasDem",
      "name": "Partai NasDem",
      "nameEn": "NasDem Party",
      "logo": "party-logos/id/nasdem-2024.png",
      "sha256": "86ab12f5915e18e1d9bb94373bc018ddef832abaad67de807085a0a9b0261c6b",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_Utama_Partai_NasDem.png",
      "ideology": [
        "Nationalism",
        "Secularism",
        "Pancasila"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 2011,
      "leader": "Surya Paloh",
      "leaderTitle": "General Chair",
      "inPower": false,
      "inExecutive": false,
      "seats": 69,
      "seatsTotal": 580,
      "chamberName": "People's Representative Council (DPR)",
      "logoMeaning": {
        "description": "The NasDem logo features two interlocking circular arcs in deep blue and bright orange forming a unified circle. Blue represents deep thought, peace, and stability, while vibrant orange represents dynamism, optimism, and the movement for national restoration (Restorasi Indonesia).",
        "sources": [
          {
            "title": "Nasdem Party — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Nasdem_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "Nasdem Party — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Nasdem_Party"
        },
        {
          "title": "2024 Indonesian general election — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Indonesian_general_election"
        },
        {
          "title": "House of Representatives (Indonesia) — Wikipedia, seats per Template:DPR RI (580 members, elected 14 February 2024): Government/KIM 348, confidence-and-supply/KIM+ 122, check-and-balance 110",
          "url": "https://en.wikipedia.org/wiki/People%27s_Representative_Council"
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
        "Islamism",
        "Religious conservatism",
        "Social conservatism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 1998,
      "leader": "Sohibul Iman",
      "leaderTitle": "President",
      "inPower": false,
      "inExecutive": false,
      "seats": 53,
      "seatsTotal": 580,
      "chamberName": "People's Representative Council (DPR)",
      "logoMeaning": {
        "description": "The PKS logo consists of two yellow crescent moons framing a central stalk of rice on a vibrant orange square. The crescents represent Islamic renewal, the rice stalk represents social welfare and justice, and orange represents warmth, optimism, and service to the community.",
        "sources": [
          {
            "title": "Prosperous Justice Party — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Prosperous_Justice_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "Prosperous Justice Party — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Prosperous_Justice_Party"
        },
        {
          "title": "2024 Indonesian general election — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Indonesian_general_election"
        },
        {
          "title": "House of Representatives (Indonesia) — Wikipedia, seats per Template:DPR RI (580 members, elected 14 February 2024): Government/KIM 348, confidence-and-supply/KIM+ 122, check-and-balance 110",
          "url": "https://en.wikipedia.org/wiki/People%27s_Representative_Council"
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
        "Liberal nationalism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 1998,
      "coalitionId": "ID-KIM",
      "leader": "Zulkifli Hasan",
      "leaderTitle": "General Chair",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2024-present",
      "seats": 48,
      "seatsTotal": 580,
      "chamberName": "People's Representative Council (DPR)",
      "logoMeaning": {
        "description": "The PAN logo depicts a radiant white sun with 32 rays shining across a deep blue background. The radiant sun symbolises enlightenment, morality, truth, and universal life bringing guidance and reform to all elements of the Indonesian nation.",
        "sources": [
          {
            "title": "National Mandate Party — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/National_Mandate_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "National Mandate Party — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/National_Mandate_Party"
        },
        {
          "title": "2024 Indonesian general election — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Indonesian_general_election"
        },
        {
          "title": "House of Representatives (Indonesia) — Wikipedia, seats per Template:DPR RI (580 members, elected 14 February 2024): Government/KIM 348, confidence-and-supply/KIM+ 122, check-and-balance 110",
          "url": "https://en.wikipedia.org/wiki/People%27s_Representative_Council"
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
        "Centrism",
        "Social liberalism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 2001,
      "coalitionId": "ID-KIM",
      "leader": "Agus Harimurti Yudhoyono",
      "leaderTitle": "General Chair",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2024-present",
      "seats": 44,
      "seatsTotal": 580,
      "chamberName": "People's Representative Council (DPR)",
      "logoMeaning": {
        "description": "The Democratic Party logo displays a three-pointed glowing star in blue and red against a dual-color shield. The three points symbolise nationalism, religious pluralism, and humanism, reflecting the party's centrist and Pancasila-aligned philosophy.",
        "sources": [
          {
            "title": "Democratic Party (Indonesia) — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Democratic_Party_(Indonesia)"
          }
        ]
      },
      "sources": [
        {
          "title": "Democratic Party (Indonesia) — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Democratic_Party_(Indonesia)"
        },
        {
          "title": "2024 Indonesian general election — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Indonesian_general_election"
        },
        {
          "title": "House of Representatives (Indonesia) — Wikipedia, seats per Template:DPR RI (580 members, elected 14 February 2024): Government/KIM 348, confidence-and-supply/KIM+ 122, check-and-balance 110",
          "url": "https://en.wikipedia.org/wiki/People%27s_Representative_Council"
        }
      ]
    }
  ],
  "IN": [
    {
      "id": "IN-BJP",
      "country": "IN",
      "shortName": "BJP",
      "name": "Bharatiya Janata Party",
      "nameEn": "Bharatiya Janata Party",
      "logo": "party-logos/in/bjp.svg",
      "sha256": "c1c64f357233396c696b0b39c1f5502919eed8b1e439fa05b1ae7ca76f242807",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:BJP_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Hindutva", "Right-wing nationalism", "Hindu nationalism"],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 1980,
      "leader": "Narendra Modi",
      "leaderTitle": "Prime Minister (2014–present), Party President",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "2014-present",
      "seats": 240,
      "seatsTotal": 543,
      "chamberName": "Lok Sabha",
      "sources": [
        {
          "title": "Bharatiya Janata Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Bharatiya_Janata_Party"
        },
        {
          "title": "2024 Indian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Indian_general_election"
        }
      ]
    },
    {
      "id": "IN-INC",
      "country": "IN",
      "shortName": "INC",
      "name": "Indian National Congress",
      "nameEn": "Indian National Congress",
      "logo": "party-logos/in/inc.svg",
      "sha256": "a8c088394ade18af44d1ab98cc1e937b35a9300e82b23224cdad02c8593b8070",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Indian_National_Congress_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Social democracy", "Centrism", "Secularism"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1885,
      "leader": "Mallikarjun Kharge",
      "leaderTitle": "Party President",
      "inPower": false,
      "seats": 99,
      "seatsTotal": 543,
      "chamberName": "Lok Sabha",
      "sources": [
        {
          "title": "Indian National Congress – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Indian_National_Congress"
        },
        {
          "title": "2024 Indian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Indian_general_election"
        }
      ]
    },
    {
      "id": "IN-DMK",
      "country": "IN",
      "shortName": "DMK",
      "name": "Dravida Munnetra Kazhagam",
      "nameEn": "Dravida Munnetra Kazhagam",
      "logo": "party-logos/in/dmk.svg",
      "sha256": "273f4f3aafed8cc64cc62bdf23e54f4202704150ae97d193324b2f9df01690b9",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:DMK_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Dravidian ideology", "Regionalism", "Social democracy"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1949,
      "leader": "M. K. Stalin",
      "leaderTitle": "Party President",
      "inPower": false,
      "seats": 39,
      "seatsTotal": 543,
      "chamberName": "Lok Sabha",
      "sources": [
        {
          "title": "Dravida Munnetra Kazhagam – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Dravida_Munnetra_Kazhagam"
        },
        {
          "title": "2024 Indian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Indian_general_election"
        }
      ]
    },
    {
      "id": "IN-TMC",
      "country": "IN",
      "shortName": "TMC",
      "name": "All India Trinamool Congress",
      "nameEn": "All India Trinamool Congress",
      "logo": "party-logos/in/tmc.svg",
      "sha256": "78645c88535538e502756ff0ad429aeab772c2a31890493bf03a52b6eb9f70b6",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:TMC_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Regionalism", "Populism", "Centre-left"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1998,
      "leader": "Mamata Banerjee",
      "leaderTitle": "Party Chairperson",
      "inPower": false,
      "seats": 29,
      "seatsTotal": 543,
      "chamberName": "Lok Sabha",
      "sources": [
        {
          "title": "All India Trinamool Congress – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/All_India_Trinamool_Congress"
        },
        {
          "title": "2024 Indian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Indian_general_election"
        }
      ]
    }
  ],
  "NL": [
    {
      "id": "NL-VVD",
      "country": "NL",
      "shortName": "VVD",
      "name": "Volkspartij voor Vrijheid en Democratie",
      "nameEn": "People's Party for Freedom and Democracy",
      "logo": "party-logos/nl/vvd.svg",
      "sha256": "b116d5cb8a59d8474c6c1cb0e3c6a98b81c4386c4d39700ff992e8a703561702",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:VVD_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Liberalism", "Conservatism", "Centre-right"],
      "ideologyPosition": "right",
      "positionRaw": "Centre-right",
      "founded": 1948,
      "leader": "Derk Jan Eppink",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "timeInPower": "2024-present",
      "seats": 35,
      "seatsTotal": 150,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "People's Party for Freedom and Democracy – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/People%27s_Party_for_Freedom_and_Democracy"
        },
        {
          "title": "2023 Dutch general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Dutch_general_election"
        }
      ]
    },
    {
      "id": "NL-PVV",
      "country": "NL",
      "shortName": "PVV",
      "name": "Partij voor de Vrijheid",
      "nameEn": "Party for Freedom",
      "logo": "party-logos/nl/pvv.svg",
      "sha256": "67319ebf6553b8f1bac1b5aaf617c170577d5faba7340185e8f68d5b2f12efde",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:PVV_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Right-wing populism", "Anti-immigration", "Euroskepticism"],
      "ideologyPosition": "far-right",
      "positionRaw": "Far-right",
      "founded": 2006,
      "leader": "Geert Wilders",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "timeInPower": "2024-present",
      "seats": 37,
      "seatsTotal": 150,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Party for Freedom (Netherlands) – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Party_for_Freedom"
        },
        {
          "title": "2023 Dutch general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Dutch_general_election"
        }
      ]
    },
    {
      "id": "NL-CDA",
      "country": "NL",
      "shortName": "CDA",
      "name": "Christen-Democratisch Appèl",
      "nameEn": "Christian Democratic Appeal",
      "logo": "party-logos/nl/cda.svg",
      "sha256": "3d729d4225472f7b1326a222619e89c276499b4eae3b1635e07029634c84132f",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:CDA_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Christian democracy", "Conservatism", "Centre-right"],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1980,
      "leader": "Henri Bontenbal",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "timeInPower": "2024-present",
      "seats": 27,
      "seatsTotal": 150,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Christian Democratic Appeal – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Christian_Democratic_Appeal"
        },
        {
          "title": "2023 Dutch general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Dutch_general_election"
        }
      ]
    },
    {
      "id": "NL-SP",
      "country": "NL",
      "shortName": "SP",
      "name": "Socialistische Partij",
      "nameEn": "Socialist Party",
      "logo": "party-logos/nl/sp.svg",
      "sha256": "0145d6a175a6c8a7ec2478db0be0d8506a941029b3d79cc68f59c5673fa64a6f",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Socialistische_Partij_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Socialism", "Left-wing", "Progressivism"],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing",
      "founded": 1971,
      "leader": "Lilian Marijnissen",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 25,
      "seatsTotal": 150,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Socialist Party (Netherlands) – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Socialist_Party_(Netherlands)"
        },
        {
          "title": "2023 Dutch general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Dutch_general_election"
        }
      ]
    },
    {
      "id": "NL-D66",
      "country": "NL",
      "shortName": "D66",
      "name": "Democraten 66",
      "nameEn": "Democrats 66",
      "logo": "party-logos/nl/d66.svg",
      "sha256": "458c32803493649029348d8d55950938e0adbba614a84ebb946082e10f2fbf86",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:D66_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Liberalism", "Progressivism", "Centre"],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 1966,
      "leader": "Rob Jetten",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "timeInPower": "2024-present",
      "seats": 21,
      "seatsTotal": 150,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Democrats 66 – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Democrats_66"
        },
        {
          "title": "2023 Dutch general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Dutch_general_election"
        }
      ]
    }
  ],
  "NZ": [
    {
      "id": "NZ-LAB",
      "country": "NZ",
      "shortName": "Lab",
      "name": "New Zealand Labour Party",
      "nameEn": "New Zealand Labour Party",
      "logo": "party-logos/nz/lab.svg",
      "sha256": "844122da88962f047b791bead705f1d661a33a03a4096d6cedaa733d1fdee93f",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:NZ_Labour_Party_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Social democracy", "Centre-left", "Progressivism"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1916,
      "leader": "Chris Hipkins",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 36,
      "seatsTotal": 120,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "New Zealand Labour Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/New_Zealand_Labour_Party"
        },
        {
          "title": "2023 New Zealand general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_New_Zealand_general_election"
        }
      ]
    },
    {
      "id": "NZ-NAT",
      "country": "NZ",
      "shortName": "Nat",
      "name": "New Zealand National Party",
      "nameEn": "New Zealand National Party",
      "logo": "party-logos/nz/nat.svg",
      "sha256": "4d05df78de46901a6cbb1ce24965bd3ae48410e315dabc99abaaac9eff7257b4",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:New_Zealand_National_Party_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Conservatism", "Centre-right", "Liberalism"],
      "ideologyPosition": "right",
      "positionRaw": "Centre-right",
      "founded": 1936,
      "leader": "Christopher Luxon",
      "leaderTitle": "Party Leader (Prime Minister, 2023–present)",
      "inPower": true,
      "timeInPower": "2023-present",
      "seats": 48,
      "seatsTotal": 120,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "New Zealand National Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/New_Zealand_National_Party"
        },
        {
          "title": "2023 New Zealand general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_New_Zealand_general_election"
        }
      ]
    },
    {
      "id": "NZ-ACT",
      "country": "NZ",
      "shortName": "Act",
      "name": "ACT New Zealand",
      "nameEn": "ACT New Zealand",
      "logo": "party-logos/nz/act.svg",
      "sha256": "d8b49e16e17efdee540e55580655b5440783c21243fb3adf59f6cff0f95a8e93",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:ACT_New_Zealand_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Libertarianism", "Right-wing", "Classical liberalism"],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 1994,
      "leader": "David Seymour",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "timeInPower": "2023-present",
      "seats": 8,
      "seatsTotal": 120,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "ACT New Zealand – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/ACT_New_Zealand"
        },
        {
          "title": "2023 New Zealand general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_New_Zealand_general_election"
        }
      ]
    },
    {
      "id": "NZ-GRN",
      "country": "NZ",
      "shortName": "Grn",
      "name": "Green Party of Aotearoa New Zealand",
      "nameEn": "Green Party of Aotearoa New Zealand",
      "logo": "party-logos/nz/grn.svg",
      "sha256": "cdaa24f55ae870fd1c52e63dc21398377889c3e5578c61cda7e1da2ed9b5f0c8",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Green_Party_of_Aotearoa_New_Zealand_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Green politics", "Environmentalism", "Left-wing"],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing",
      "founded": 1990,
      "leader": "James Shaw",
      "leaderTitle": "Co-leader",
      "inPower": false,
      "seats": 15,
      "seatsTotal": 120,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Green Party of Aotearoa New Zealand – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Green_Party_of_Aotearoa_New_Zealand"
        },
        {
          "title": "2023 New Zealand general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_New_Zealand_general_election"
        }
      ]
    }
  ],
  "SE": [
    {
      "id": "SE-S",
      "country": "SE",
      "shortName": "S",
      "name": "Sveriges Socialdemokratiska Arbetareparti",
      "nameEn": "Swedish Social Democrats",
      "logo": "party-logos/se/s.svg",
      "sha256": "7a0a702fa8d76fdb575bfb50221700b13ab307c44cc4114feaf955795d7e501e",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:S_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Social democracy", "Centre-left", "Labour movement"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1889,
      "leader": "Magdalena Andersson",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 67,
      "seatsTotal": 349,
      "chamberName": "Riksdag",
      "sources": [
        {
          "title": "Swedish Social Democrats – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Swedish_Social_Democrats"
        },
        {
          "title": "2022 Swedish general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2022_Swedish_general_election"
        }
      ]
    },
    {
      "id": "SE-M",
      "country": "SE",
      "shortName": "M",
      "name": "Moderata samlingspartiet",
      "nameEn": "Moderate Party",
      "logo": "party-logos/se/m.svg",
      "sha256": "a3a9cabc1a486422d236345f8037611fd99489620bb7d56dfd64b1382e14f061",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Moderata_samlingspartiet_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Conservatism", "Centre-right", "Liberalism"],
      "ideologyPosition": "right",
      "positionRaw": "Centre-right",
      "founded": 1904,
      "leader": "Ulf Kristersson",
      "leaderTitle": "Party Leader (Prime Minister, 2022–present)",
      "inPower": true,
      "timeInPower": "2022-present",
      "seats": 68,
      "seatsTotal": 349,
      "chamberName": "Riksdag",
      "sources": [
        {
          "title": "Moderate Party (Sweden) – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Moderate_Party_(Sweden)"
        },
        {
          "title": "2022 Swedish general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2022_Swedish_general_election"
        }
      ]
    },
    {
      "id": "SE-SD",
      "country": "SE",
      "shortName": "SD",
      "name": "Sverigedemokraterna",
      "nameEn": "Sweden Democrats",
      "logo": "party-logos/se/sd.svg",
      "sha256": "b22bf267e7f1756bcd73e6294770d2ac74a70d4587fa66790a06b07f5e921541",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Sweden_Democrats_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Right-wing populism", "Anti-immigration", "Nationalism"],
      "ideologyPosition": "far-right",
      "positionRaw": "Far-right",
      "founded": 1988,
      "leader": "Jimmie Åkesson",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 73,
      "seatsTotal": 349,
      "chamberName": "Riksdag",
      "sources": [
        {
          "title": "Sweden Democrats – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Sweden_Democrats"
        },
        {
          "title": "2022 Swedish general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2022_Swedish_general_election"
        }
      ]
    },
    {
      "id": "SE-V",
      "country": "SE",
      "shortName": "V",
      "name": "Vänsterpartiet",
      "nameEn": "Left Party",
      "logo": "party-logos/se/v.svg",
      "sha256": "9fe5ad598ba69bc52646ecc7cff19c79c3cdc86a90fa51bb8e555dcb6989c38f",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Vänsterpartiet_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Socialism", "Left-wing", "Marxism"],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing",
      "founded": 1917,
      "leader": "Nooshi Dadgostar",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 28,
      "seatsTotal": 349,
      "chamberName": "Riksdag",
      "sources": [
        {
          "title": "Left Party (Sweden) – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Left_Party_(Sweden)"
        },
        {
          "title": "2022 Swedish general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2022_Swedish_general_election"
        }
      ]
    }
  ],
  "TR": [
    {
      "id": "TR-AKP",
      "country": "TR",
      "shortName": "AKP",
      "name": "Adalet ve Kalkınma Partisi",
      "nameEn": "Justice and Development Party",
      "logo": "party-logos/tr/akp.svg",
      "sha256": "3b09b17dbd378b7c63abec768cfd583a229caac4e735d9bc69a8078cab8be16d",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:AKP_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Conservative democracy", "Islam", "Developmentalism"],
      "ideologyPosition": "right",
      "positionRaw": "Centre-right to right-wing",
      "founded": 2001,
      "leader": "Recep Tayyip Erdoğan",
      "leaderTitle": "Party Leader (President, 2014–present)",
      "inPower": true,
      "timeInPower": "2002-present",
      "seats": 281,
      "seatsTotal": 600,
      "chamberName": "Grand National Assembly",
      "sources": [
        {
          "title": "Justice and Development Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Justice_and_Development_Party_(Turkey)"
        },
        {
          "title": "2023 Turkish general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Turkish_general_election"
        }
      ]
    },
    {
      "id": "TR-CHP",
      "country": "TR",
      "shortName": "CHP",
      "name": "Cumhuriyet Halk Partisi",
      "nameEn": "Republican People's Party",
      "logo": "party-logos/tr/chp.svg",
      "sha256": "2e512777ce281077f38c531ce12ed1c718a06c9c60c03b55a5e4606e88853abc",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:CHP_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Social democracy", "Secularism", "Kemalism"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1923,
      "leader": "Kılıçdaroğlu",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 169,
      "seatsTotal": 600,
      "chamberName": "Grand National Assembly",
      "sources": [
        {
          "title": "Republican People's Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Republican_People%27s_Party"
        },
        {
          "title": "2023 Turkish general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Turkish_general_election"
        }
      ]
    },
    {
      "id": "TR-MHP",
      "country": "TR",
      "shortName": "MHP",
      "name": "Milliyetçi Hareket Partisi",
      "nameEn": "Nationalist Movement Party",
      "logo": "party-logos/tr/mhp.svg",
      "sha256": "d9784cd04604b414065667d81c3565e65560d8e00e0eb9a129a743efa6d272eb",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:MHP_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Turkish nationalism", "Right-wing", "Conservatism"],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 1969,
      "leader": "Devlet Bahçeli",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "timeInPower": "2018-present",
      "seats": 49,
      "seatsTotal": 600,
      "chamberName": "Grand National Assembly",
      "sources": [
        {
          "title": "Nationalist Movement Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Nationalist_Movement_Party"
        },
        {
          "title": "2023 Turkish general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Turkish_general_election"
        }
      ]
    },
    {
      "id": "TR-DEM",
      "country": "TR",
      "shortName": "DEM",
      "name": "Demokratik Toplum Kongresi",
      "nameEn": "Democratic Society Congress",
      "logo": "party-logos/tr/dem.png",
      "sha256": "1aca2fa111e1a72dc180095f5d7a2ad456d15016d8db16d65f6affe7203dbe44",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:DEM_logo.png",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Kurdish nationalism", "Left-wing", "Regionalism"],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing",
      "founded": 2024,
      "leader": "Pervin Buldan",
      "leaderTitle": "Co-leader",
      "inPower": false,
      "seats": 84,
      "seatsTotal": 600,
      "chamberName": "Grand National Assembly",
      "sources": [
        {
          "title": "Democratic Society Congress – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Democratic_Society_Congress_(DEM)"
        },
        {
          "title": "2023 Turkish general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Turkish_general_election"
        }
      ]
    }
  ],
  "ZA": [
    {
      "id": "ZA-ANC",
      "country": "ZA",
      "shortName": "ANC",
      "name": "African National Congress",
      "nameEn": "African National Congress",
      "logo": "party-logos/za/anc.svg",
      "sha256": "8aa88f8a8ab9f010ace54bea28320672551e414a0f780704b87ed238ad00e6a9",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:ANC_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["National liberation", "Socialism", "Pan-Africanism"],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing to centre-left",
      "founded": 1912,
      "leader": "Cyril Ramaphosa",
      "leaderTitle": "Party President (President of South Africa, 2018–present)",
      "inPower": true,
      "timeInPower": "1994-present",
      "seats": 159,
      "seatsTotal": 400,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "African National Congress – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/African_National_Congress"
        },
        {
          "title": "2024 South African general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_South_African_general_election"
        }
      ]
    },
    {
      "id": "ZA-DA",
      "country": "ZA",
      "shortName": "DA",
      "name": "Democratic Alliance",
      "nameEn": "Democratic Alliance",
      "logo": "party-logos/za/da.svg",
      "sha256": "e5df3e0f679cdeee5f7df69642ea7bd7d6e67b4f89c917147107c4044ffbe23c",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Democratic_Alliance_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Liberalism", "Centre-right", "Capitalism"],
      "ideologyPosition": "right",
      "positionRaw": "Centre-right",
      "founded": 2000,
      "leader": "John Steenhuisen",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 87,
      "seatsTotal": 400,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Democratic Alliance (South Africa) – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Democratic_Alliance_(South_Africa)"
        },
        {
          "title": "2024 South African general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_South_African_general_election"
        }
      ]
    },
    {
      "id": "ZA-EFF",
      "country": "ZA",
      "shortName": "EFF",
      "name": "Economic Freedom Fighters",
      "nameEn": "Economic Freedom Fighters",
      "logo": "party-logos/za/eff.svg",
      "sha256": "58cf2b1e37203e35928a00698e1e73036da02835852292752d0390ab3e5b58e5",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:EFF_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Pan-Africanism", "Socialism", "Anti-imperialism"],
      "ideologyPosition": "left",
      "positionRaw": "Far-left",
      "founded": 2013,
      "leader": "Julius Malema",
      "leaderTitle": "President",
      "inPower": false,
      "seats": 39,
      "seatsTotal": 400,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Economic Freedom Fighters – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Economic_Freedom_Fighters"
        },
        {
          "title": "2024 South African general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_South_African_general_election"
        }
      ]
    }
  ],
  "PE": [
    {
      "id": "PE-FP",
      "country": "PE",
      "shortName": "FP",
      "name": "Fuerza Popular",
      "nameEn": "Popular Force",
      "logo": "party-logos/pe/fuerza-popular.svg",
      "sha256": "1b8981d4ef5179f643fa6b65b285c450db4864f91feafb10cc77dcffc04bcee9",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Fuerza_popular.svg",
      "ideology": [
        "Right-wing",
        "Conservatism",
        "Authoritarianism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing to far-right",
      "founded": 2011,
      "leader": "Keiko Fujimori",
      "leaderTitle": "Party President",
      "inPower": true,
      "inExecutive": true,
      "seats": 41,
      "seatsTotal": 130,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The geometric shield design symbolizes institutional strength and democratic order. The right-wing conservatism and authoritarian governance approach emphasizes family values, market liberalism, and national security, reflecting Peru's centrist-to-right political tradition.",
        "sources": [
          {
            "title": "Fuerza Popular – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Fuerza_Popular"
          },
          {
            "title": "Keiko Fujimori – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Keiko_Fujimori"
          }
        ]
      },
      "sources": [
        {
          "title": "Fuerza Popular – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Fuerza_Popular"
        },
        {
          "title": "2024 Peruvian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Peruvian_general_election"
        },
        {
          "title": "Chamber of Deputies (Peru) — Wikipedia (130 deputies elected 12–13 April 2026: Government FP 41, supported by RP 15, Opposition JP 32, PBG 18, OBRAS 14, AN 10)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Peru)"
        },
        {
          "title": "President of Peru — Wikipedia (incumbent Keiko Fujimori, leader of Popular Force)",
          "url": "https://en.wikipedia.org/wiki/President_of_Peru"
        }
      ]
    },
    {
      "id": "PE-JXP",
      "country": "PE",
      "shortName": "JxP",
      "name": "Juntos por el Perú",
      "nameEn": "Together for Peru",
      "logo": "party-logos/pe/juntos-por-el-peru.svg",
      "sha256": "67bf3974a9f2718c266ccbcf7f22b3303d22ef2baf6a0bc78064b6d4bdac62f5",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_juntos_por_el_Peru.svg",
      "ideology": [
        "Centre-left",
        "Social democracy",
        "Indigenism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 2021,
      "leader": "Roberto Sánchez",
      "leaderTitle": "Political Leader",
      "inPower": false,
      "inExecutive": false,
      "seats": 32,
      "seatsTotal": 130,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The emblem symbolizes unity and collective action toward social progress. Centre-left ideology emphasizes indigenous rights, social democracy, and inclusive governance that prioritizes marginalized communities and sustainable development across Peru.",
        "sources": [
          {
            "title": "Juntos por el Perú – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Juntos_por_el_Per%C3%BA"
          },
          {
            "title": "2024 Peruvian general election – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/2024_Peruvian_general_election"
          }
        ]
      },
      "sources": [
        {
          "title": "Juntos por el Perú – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Juntos_por_el_Per%C3%BA"
        },
        {
          "title": "Chamber of Deputies (Peru) — Wikipedia (130 deputies elected 12–13 April 2026: Government FP 41, supported by RP 15, Opposition JP 32, PBG 18, OBRAS 14, AN 10)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Peru)"
        }
      ]
    },
    {
      "id": "PE-RP",
      "country": "PE",
      "shortName": "RP",
      "name": "Renovación Popular",
      "nameEn": "Popular Renovation",
      "logo": "party-logos/pe/renovacion-popular.svg",
      "sha256": "92855663ee2ef3623c90c7f2fd9b421a091f9efd71c2510db93d51905c091991",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_Renovaci%C3%B3n_Popular_2023.png",
      "ideology": [
        "Right-wing",
        "Neoliberalism",
        "Pro-market"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing to far-right",
      "founded": 2021,
      "leader": "Rafael López Aliaga",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "inExecutive": false,
      "seats": 15,
      "seatsTotal": 130,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The modern geometric design represents institutional renewal and market-oriented governance. Right-wing neoliberal ideology emphasizes free markets, privatization, and conservative fiscal policies aligned with pro-market economic modernization.",
        "sources": [
          {
            "title": "Renovación Popular – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Renovaci%C3%B3n_Popular_(Peru)"
          },
          {
            "title": "Rafael López Aliaga – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Rafael_L%C3%B3pez_Aliaga"
          }
        ]
      },
      "sources": [
        {
          "title": "Renovación Popular – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Renovaci%C3%B3n_Popular_(Peru)"
        },
        {
          "title": "Chamber of Deputies (Peru) — Wikipedia (130 deputies elected 12–13 April 2026: Government FP 41, supported by RP 15, Opposition JP 32, PBG 18, OBRAS 14, AN 10)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Peru)"
        }
      ]
    },
    {
      "id": "PE-PBG",
      "country": "PE",
      "shortName": "PBG",
      "name": "Partido del Buen Gobierno",
      "nameEn": "Good Government Party",
      "logo": "party-logos/pe/partido-buen-gobierno.jpg",
      "sha256": "e7a2289ec1025004d9901874a780576f6ceb60e4f1c5bbeee53bdceaf4e8e666",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_Buen_Gobierno_2024.jpg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons (CC BY 4.0); bundled locally.",
      "ideology": [
        "Centre",
        "Populism",
        "Anti-corruption"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 2023,
      "leader": "Jorge Nieto",
      "leaderTitle": "Leader",
      "inPower": false,
      "inExecutive": false,
      "seats": 18,
      "seatsTotal": 130,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The centrist emblem emphasizes good governance, transparency, and anti-corruption measures. Populist ideology seeks direct connection with ordinary citizens and prioritizes addressing corruption and institutional reform as core governance principles.",
        "sources": [
          {
            "title": "Partido del Buen Gobierno – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Partido_del_Buen_Gobierno"
          },
          {
            "title": "2024 Peruvian general election – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/2024_Peruvian_general_election"
          }
        ]
      },
      "sources": [
        {
          "title": "Partido del Buen Gobierno – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Partido_del_Buen_Gobierno"
        },
        {
          "title": "2024 Peruvian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Peruvian_general_election"
        },
        {
          "title": "Chamber of Deputies (Peru) — Wikipedia (130 deputies elected 12–13 April 2026: Government FP 41, supported by RP 15, Opposition JP 32, PBG 18, OBRAS 14, AN 10)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Peru)"
        }
      ]
    },
    {
      "id": "PE-OBRAS",
      "country": "PE",
      "shortName": "OBRAS",
      "name": "Partido Cívico OBRAS",
      "nameEn": "OBRAS Civic Party",
      "logo": "party-logos/pe/obras.png",
      "sha256": "30bdff939019e54ab05fd4cb9c232dc6b9a8844153e7bf760684109186e2bb17",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Partido_Civico_OBRAS.png",
      "licenceNote": "Freely licensed logo from Wikimedia Commons (CC BY-SA 4.0); bundled locally.",
      "ideology": [
        "Centre-left",
        "Regionalism",
        "Social development"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre to centre-left",
      "founded": 2021,
      "leader": "Ricardo Belmont",
      "leaderTitle": "Leader",
      "inPower": false,
      "inExecutive": false,
      "seats": 14,
      "seatsTotal": 130,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The civic emblem represents regional autonomy and grassroots governance. Centre-left ideology emphasizes regional development, local social programs, and infrastructure investment that strengthens regional economies and communities across Peru.",
        "sources": [
          {
            "title": "Partido Cívico OBRAS – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Partido_C%C3%ADvico_OBRAS"
          },
          {
            "title": "2024 Peruvian general election – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/2024_Peruvian_general_election"
          }
        ]
      },
      "sources": [
        {
          "title": "Partido Cívico OBRAS – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Partido_C%C3%ADvico_OBRAS"
        },
        {
          "title": "2024 Peruvian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Peruvian_general_election"
        },
        {
          "title": "Chamber of Deputies (Peru) — Wikipedia (130 deputies elected 12–13 April 2026: Government FP 41, supported by RP 15, Opposition JP 32, PBG 18, OBRAS 14, AN 10)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Peru)"
        }
      ]
    },
    {
      "id": "PE-AN",
      "country": "PE",
      "shortName": "AN",
      "name": "Ahora Nación",
      "nameEn": "Now Nation",
      "logo": "party-logos/pe/ahora-nacion.jpg",
      "sha256": "3f6d072d21eddf5a9406e559f606f7aa5d2310a0eb352c3adfacc8c07964b58c",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_Ahora_Naci%C3%B3n_2026.jpg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons (Public Domain); bundled locally.",
      "ideology": [
        "Left-wing",
        "Socialism",
        "Indigenism"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Centre-left to left-wing",
      "founded": 2023,
      "leader": "Luis López-Chau Pastor",
      "leaderTitle": "Leader",
      "inPower": false,
      "inExecutive": false,
      "seats": 10,
      "seatsTotal": 130,
      "chamberName": "Chamber of Deputies",
      "logoMeaning": {
        "description": "The emblem represents a new era of socialist governance and indigenous empowerment. Left-wing ideology emphasizes workers' rights, indigenous sovereignty, wealth redistribution, and societal transformation rooted in Peru's indigenous heritage and communities.",
        "sources": [
          {
            "title": "Ahora Nación – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Ahora_Naci%C3%B3n"
          },
          {
            "title": "2024 Peruvian general election – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/2024_Peruvian_general_election"
          }
        ]
      },
      "sources": [
        {
          "title": "Ahora Nación – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Ahora_Naci%C3%B3n"
        },
        {
          "title": "2024 Peruvian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Peruvian_general_election"
        },
        {
          "title": "Chamber of Deputies (Peru) — Wikipedia (130 deputies elected 12–13 April 2026: Government FP 41, supported by RP 15, Opposition JP 32, PBG 18, OBRAS 14, AN 10)",
          "url": "https://en.wikipedia.org/wiki/Chamber_of_Deputies_(Peru)"
        }
      ]
    }
  ],
  "PK": [
    {
      "id": "PK-PMLN",
      "country": "PK",
      "shortName": "PML-N",
      "name": "Pakistan Muslim League – Nawaz",
      "nameEn": "Pakistan Muslim League – Nawaz",
      "logo": "party-logos/pk/pmln.svg",
      "sha256": "515c559c02541d139997800f7a8608067626454b0d91c089bd62b9763a707ff9",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:PML-N_Logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre-right", "Conservatism", "Nationalism"],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1997,
      "leader": "Nawaz Sharif",
      "leaderTitle": "Party President",
      "inPower": true,
      "seats": 116,
      "seatsTotal": 342,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Pakistan Muslim League – Nawaz – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Pakistan_Muslim_League%E2%80%93Nawaz"
        },
        {
          "title": "2024 Pakistani general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Pakistani_general_election"
        }
      ]
    },
    {
      "id": "PK-PPP",
      "country": "PK",
      "shortName": "PPP",
      "name": "Pakistan People's Party",
      "nameEn": "Pakistan People's Party",
      "logo": "party-logos/pk/ppp.png",
      "sha256": "8b59414cef96e9667324cd59495b2403f8abbfcea880089f9e87013fd913f664",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:PPP_Logo.png",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Centre-left", "Social democracy", "Populism"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1967,
      "leader": "Bilawal Bhutto Zardari",
      "leaderTitle": "Chairman",
      "inPower": false,
      "seats": 54,
      "seatsTotal": 342,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Pakistan People's Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Pakistan_People%27s_Party"
        }
      ]
    }
  ],
  "VN": [
    {
      "id": "VN-CPV",
      "country": "VN",
      "shortName": "CPV",
      "name": "Communist Party of Vietnam",
      "nameEn": "Communist Party of Vietnam",
      "logo": "party-logos/vn/cpv.svg",
      "sha256": "39479cb61a0da56a473e2d2da356b8e311e803b8763476f8de49b59346e0d7ea",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Communist_Party_of_Vietnam_flag_logo.svg",
      "ideology": [
        "Communism",
        "Marxism–Leninism"
      ],
      "ideologyPosition": "far-left",
      "positionRaw": "Far-left",
      "founded": 1930,
      "leader": "Tô Lâm",
      "leaderTitle": "General Secretary",
      "inPower": true,
      "inExecutive": true,
      "seats": 482,
      "seatsTotal": 500,
      "chamberName": "National Assembly",
      "logoMeaning": {
        "description": "The emblem of the Communist Party of Vietnam features a golden crossed hammer and sickle on a red background. The hammer represents industrial workers, the sickle represents agricultural peasants, and the red field represents the blood of revolutionary martyrs and the cause of socialism.",
        "sources": [
          {
            "title": "Communist Party of Vietnam – Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Communist_Party_of_Vietnam"
          }
        ]
      },
      "sources": [
        {
          "title": "Communist Party of Vietnam — Wikipedia (infobox: founded 3 February 1930, ideology, position Far-left, General Secretary Tô Lâm)",
          "url": "https://en.wikipedia.org/wiki/Communist_Party_of_Vietnam"
        },
        {
          "title": "National Assembly of Vietnam — Wikipedia (political groups: Vietnamese Fatherland Front 500 — CPV 482, independents 18; elected 15 March 2026)",
          "url": "https://en.wikipedia.org/wiki/National_Assembly_(Vietnam)"
        }
      ]
    }
  ],
  "IE": [
    {
      "id": "IE-FF",
      "country": "IE",
      "shortName": "FF",
      "name": "Fianna Fáil",
      "nameEn": "Fianna Fáil",
      "logo": "party-logos/ie/fianna-fail.svg",
      "sha256": "43267fffa4757d00a99d62bafd9442a61fb47c816b6d481fb0dfb9ed6615cd57",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Fianna_F%C3%A1il_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre-right", "Irish republicanism", "Conservatism"],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1926,
      "leader": "Micheál Martin",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "seats": 78,
      "seatsTotal": 160,
      "chamberName": "Dáil Éireann",
      "sources": [
        {
          "title": "Fianna Fáil – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Fianna_F%C3%A1il"
        },
        {
          "title": "2024 Irish general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Irish_general_election"
        }
      ]
    },
    {
      "id": "IE-FG",
      "country": "IE",
      "shortName": "FG",
      "name": "Fine Gael",
      "nameEn": "Fine Gael",
      "logo": "party-logos/ie/fine-gael.svg",
      "sha256": "d171bb78fd9e332f845a0c78f4f9bc004fdfb8d7f4c3a85e476e4d199bef6ac3",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Fine_Gael_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre-right", "Liberal conservatism", "Internationalism"],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1933,
      "leader": "Simon Harris",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "seats": 37,
      "seatsTotal": 160,
      "chamberName": "Dáil Éireann",
      "sources": [
        {
          "title": "Fine Gael – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Fine_Gael"
        },
        {
          "title": "2024 Irish general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Irish_general_election"
        }
      ]
    },
    {
      "id": "IE-SF",
      "country": "IE",
      "shortName": "SF",
      "name": "Sinn Féin",
      "nameEn": "Sinn Féin",
      "logo": "party-logos/ie/sinn-fein.svg",
      "sha256": "da4d3d7f60b67bfcdce218021815851241369608ef347ef8b5a793760ddb5d2d",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Sinn_F%C3%A9in_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Left-wing", "Irish republicanism", "Socialism"],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing",
      "founded": 1905,
      "leader": "Mary Lou McDonald",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 37,
      "seatsTotal": 160,
      "chamberName": "Dáil Éireann",
      "sources": [
        {
          "title": "Sinn Féin – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Sinn_F%C3%A9in"
        },
        {
          "title": "2024 Irish general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Irish_general_election"
        }
      ]
    }
  ],
  "HU": [
    {
      "id": "HU-FIDESZ",
      "country": "HU",
      "shortName": "Fidesz",
      "name": "Fidesz – Hungarian Civic Alliance",
      "nameEn": "Fidesz – Hungarian Civic Alliance",
      "logo": "party-logos/hu/fidesz.svg",
      "sha256": "dd6e19d895d7cc0c9535ddd27e0974e8add4f6b9619f356c99f5d850132f84ff",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Fidesz_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Right-wing", "Conservatism", "Hungarian nationalism"],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 1988,
      "leader": "Viktor Orbán",
      "leaderTitle": "Chairman",
      "inPower": true,
      "seats": 133,
      "seatsTotal": 199,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Fidesz – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Fidesz"
        },
        {
          "title": "2022 Hungarian parliamentary election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2022_Hungarian_parliamentary_election"
        }
      ]
    },
    {
      "id": "HU-MSZP",
      "country": "HU",
      "shortName": "MSZP",
      "name": "Hungarian Socialist Party",
      "nameEn": "Hungarian Socialist Party",
      "logo": "party-logos/hu/mszp.svg",
      "sha256": "d9dfb0e28bf935cef870087e5f06466700ed6b054f00283ada6c7171a990172e",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:MSZP_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Centre-left", "Social democracy", "Post-communism"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1989,
      "leader": "Péter Jakab",
      "leaderTitle": "Party President",
      "inPower": false,
      "seats": 4,
      "seatsTotal": 199,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Hungarian Socialist Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Hungarian_Socialist_Party"
        },
        {
          "title": "2022 Hungarian parliamentary election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2022_Hungarian_parliamentary_election"
        }
      ]
    },
    {
      "id": "HU-DK",
      "country": "HU",
      "shortName": "DK",
      "name": "Democratic Coalition",
      "nameEn": "Democratic Coalition",
      "logo": "party-logos/hu/dk.svg",
      "sha256": "7c20264b918db827adb1138bcbacfc75ac88a08b9b09e178d200cb74198f997b",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:DK_Hungary_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Left-wing", "Progressivism", "Anti-authoritarianism"],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing",
      "founded": 1990,
      "leader": "Ferenc Gyurcsány",
      "leaderTitle": "Party President",
      "inPower": false,
      "seats": 5,
      "seatsTotal": 199,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Democratic Coalition (Hungary) – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Democratic_Coalition_(Hungary)"
        },
        {
          "title": "2022 Hungarian parliamentary election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2022_Hungarian_parliamentary_election"
        }
      ]
    }
  ],
  "IL": [
    {
      "id": "IL-LIKUD",
      "country": "IL",
      "shortName": "Likud",
      "name": "Likud",
      "nameEn": "Likud",
      "logo": "party-logos/il/likud.svg",
      "sha256": "7e023531de755255b8a661d0bbea0634d19158f9ccef6f3d39f7e02bc5093bda",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Likud_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Right-wing", "Conservatism", "Zionism"],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 1973,
      "leader": "Benjamin Netanyahu",
      "leaderTitle": "Chairman",
      "inPower": true,
      "seats": 32,
      "seatsTotal": 120,
      "chamberName": "Knesset",
      "sources": [
        {
          "title": "Likud – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Likud"
        },
        {
          "title": "2024 Israeli legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Israeli_legislative_election"
        }
      ]
    },
    {
      "id": "IL-YESH-ATID",
      "country": "IL",
      "shortName": "Yesh Atid",
      "name": "Yesh Atid",
      "nameEn": "Yesh Atid",
      "logo": "party-logos/il/yesh-atid.svg",
      "sha256": "abe288e3aef4a9fe88e336e5b850da9a0e80c00d1d9010ff19191d1c884c1b4d",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Yesh_Atid_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Centre", "Centrist", "Secular liberalism"],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 2012,
      "leader": "Yair Lapid",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 24,
      "seatsTotal": 120,
      "chamberName": "Knesset",
      "sources": [
        {
          "title": "Yesh Atid – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Yesh_Atid"
        },
        {
          "title": "2024 Israeli legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Israeli_legislative_election"
        }
      ]
    },
    {
      "id": "IL-BLUE-WHITE",
      "country": "IL",
      "shortName": "Blue and White",
      "name": "Blue and White",
      "nameEn": "Blue and White",
      "logo": "party-logos/il/blue-white.svg",
      "sha256": "8f048aaa290937c35eb086ef33cbd04584dbd41bd9044af7af028b4cd1a9ce5f",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Blue_and_White_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Centre-right", "Centrism", "Zionism"],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 2019,
      "leader": "Gadi Eisenkot",
      "leaderTitle": "Party Chairman",
      "inPower": false,
      "seats": 6,
      "seatsTotal": 120,
      "chamberName": "Knesset",
      "sources": [
        {
          "title": "Blue and White (political alliance) – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Blue_and_White_(political_alliance)"
        },
        {
          "title": "2024 Israeli legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Israeli_legislative_election"
        }
      ]
    }
  ],
  "CZ": [
    {
      "id": "CZ-ANO",
      "country": "CZ",
      "shortName": "ANO",
      "name": "ANO 2011",
      "nameEn": "ANO 2011",
      "logo": "party-logos/cz/ano.svg",
      "sha256": "1f283207e63a22e20f58b43881a886dd93896e625204a2f99d5d620c78ed569a",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:ANO_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Centrist", "Anti-corruption", "Populism"],
      "ideologyPosition": "centre",
      "positionRaw": "Centrist",
      "founded": 2011,
      "leader": "Andrej Babiš",
      "leaderTitle": "Chairman",
      "inPower": false,
      "seats": 101,
      "seatsTotal": 200,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "ANO 2011 – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/ANO_2011"
        },
        {
          "title": "2021 Czech legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2021_Czech_legislative_election"
        }
      ]
    },
    {
      "id": "CZ-CSSD",
      "country": "CZ",
      "shortName": "ČSSD",
      "name": "Czech Social Democratic Party",
      "nameEn": "Czech Social Democratic Party",
      "logo": "party-logos/cz/cssd.svg",
      "sha256": "7c9c5c3b423e409b76cc572796453f098e5f126f1ffc38412ff71028addf3978",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:CSSD_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Centre-left", "Social democracy", "Post-communist"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1990,
      "leader": "Petr Nečas",
      "leaderTitle": "Party Chairman",
      "inPower": false,
      "seats": 0,
      "seatsTotal": 200,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Czech Social Democratic Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Czech_Social_Democratic_Party"
        },
        {
          "title": "2021 Czech legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2021_Czech_legislative_election"
        }
      ]
    },
    {
      "id": "CZ-SPD",
      "country": "CZ",
      "shortName": "SPD",
      "name": "Freedom and Direct Democracy",
      "nameEn": "Freedom and Direct Democracy",
      "logo": "party-logos/cz/spd.svg",
      "sha256": "c28511f43ceefb73b9c001828c0f52d1b44cafcd1213a03b31f71fb27a791a2d",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:SPD_Czech_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Right-wing", "Euroscepticism", "Populism"],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 2015,
      "leader": "Tomio Okamura",
      "leaderTitle": "Chairman",
      "inPower": false,
      "seats": 6,
      "seatsTotal": 200,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Freedom and Direct Democracy – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Freedom_and_Direct_Democracy"
        },
        {
          "title": "2021 Czech legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2021_Czech_legislative_election"
        }
      ]
    }
  ],
  "RO": [
    {
      "id": "RO-PNL",
      "country": "RO",
      "shortName": "PNL",
      "name": "National Liberal Party",
      "nameEn": "National Liberal Party",
      "logo": "party-logos/ro/pnl.svg",
      "sha256": "f6db48645863ac1f20111735ebdfaaeffac6d8331525b8349e5f0e54c21261ee",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:PNL_Romania_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Centre-right", "Liberalism", "Conservatism"],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1875,
      "leader": "Nicolae Ciucă",
      "leaderTitle": "Party President",
      "inPower": true,
      "seats": 116,
      "seatsTotal": 330,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "National Liberal Party (Romania) – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/National_Liberal_Party_(Romania)"
        },
        {
          "title": "2024 Romanian legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Romanian_legislative_election"
        }
      ]
    },
    {
      "id": "RO-PSD",
      "country": "RO",
      "shortName": "PSD",
      "name": "Social Democratic Party",
      "nameEn": "Social Democratic Party",
      "logo": "party-logos/ro/psd.svg",
      "sha256": "b6385f8f2142859ce386f936b45d33137b7d3467f35aa2a9272174d8712c3ab9",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:PSD_Romania_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Centre-left", "Social democracy", "Post-communist"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1992,
      "leader": "Marcel Ciolacu",
      "leaderTitle": "Party President",
      "inPower": false,
      "seats": 110,
      "seatsTotal": 330,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Social Democratic Party (Romania) – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Social_Democratic_Party_(Romania)"
        },
        {
          "title": "2024 Romanian legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Romanian_legislative_election"
        }
      ]
    },
    {
      "id": "RO-USR",
      "country": "RO",
      "shortName": "USR",
      "name": "Union Save Romania",
      "nameEn": "Union Save Romania",
      "logo": "party-logos/ro/usr.svg",
      "sha256": "94c0c9bc001633a74d2f481bc798d8d76ca6c3efce797378c057a6aeb0420262",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:USR_Romania_logo.svg",
      "licenceNote": "Non-free party logo used to identify the party; used here to identify the party, not to imply endorsement.",
      "ideology": ["Centre", "Anti-corruption", "Pro-European"],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 2016,
      "leader": "Elena Lasconi",
      "leaderTitle": "Party President",
      "inPower": false,
      "seats": 41,
      "seatsTotal": 330,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Union Save Romania – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Union_Save_Romania"
        },
        {
          "title": "2024 Romanian legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Romanian_legislative_election"
        }
      ]
    }
  ],
  "BA": [
    {
      "id": "BA-HDZ",
      "country": "BA",
      "shortName": "HDZ BiH",
      "name": "Hrvataska Demokratska Zajednica Bosne i Hercegovine",
      "nameEn": "Croatian Democratic Union of Bosnia and Herzegovina",
      "logo": "party-logos/ba/hdz-bih.svg",
      "sha256": "17cea14f2d09514716b1e4c326849519782c66765ce385981b314f316e7efc6e",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:HDZ_BiH_-_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre-right", "Croatian nationalism", "Conservatism"],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1990,
      "leader": "Dragan Čović",
      "leaderTitle": "Party President",
      "inPower": true,
      "seats": 10,
      "seatsTotal": 42,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Croatian Democratic Union of Bosnia and Herzegovina – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Croatian_Democratic_Union_of_Bosnia_and_Herzegovina"
        },
        {
          "title": "2022 Bosnian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2022_Bosnian_general_election"
        }
      ]
    },
    {
      "id": "BA-SDA",
      "country": "BA",
      "shortName": "SDA",
      "name": "Stranka Demokratske Akcije",
      "nameEn": "Party of Democratic Action",
      "logo": "party-logos/ba/sda.svg",
      "sha256": "39d2285d85db8300d8b95e4d47a31d31b95902e0754acfb11e765a0c9107d05e",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:SDA_party_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre", "Bosniak nationalism", "Conservatism"],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 1990,
      "leader": "Bakir Izetbegović",
      "leaderTitle": "Party President",
      "inPower": true,
      "seats": 10,
      "seatsTotal": 42,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Party of Democratic Action – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Party_of_Democratic_Action"
        },
        {
          "title": "2022 Bosnian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2022_Bosnian_general_election"
        }
      ]
    },
    {
      "id": "BA-SNSD",
      "country": "BA",
      "shortName": "SNSD",
      "name": "Savez Nezavisnih Socijaldemokrata",
      "nameEn": "Alliance of Independent Social Democrats",
      "logo": "party-logos/ba/snsd.svg",
      "sha256": "98d629cf1542f6963f3c7a848bd8893418be73a272d42539332330c0776c2c58",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:SNSD_Logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre-left", "Serb nationalism", "Populism"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1996,
      "leader": "Milorad Dodik",
      "leaderTitle": "Party President",
      "inPower": true,
      "seats": 8,
      "seatsTotal": 42,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Alliance of Independent Social Democrats – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Alliance_of_Independent_Social_Democrats"
        },
        {
          "title": "2022 Bosnian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2022_Bosnian_general_election"
        }
      ]
    }
  ],
  "BG": [
    {
      "id": "BG-GERB",
      "country": "BG",
      "shortName": "GERB",
      "name": "Граждане за европейско развитие на България",
      "nameEn": "Citizens for European Development of Bulgaria",
      "logo": "party-logos/bg/gerb.svg",
      "sha256": "4953b94d5e96fdec3b8db8fe50d1f9b2667a12d44b5650820f5335cd7c28bae7",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:GERB_party_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre-right", "Conservatism", "Liberalism"],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 2006,
      "leader": "Boyko Borissov",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "seats": 68,
      "seatsTotal": 240,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Citizens for European Development of Bulgaria – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Citizens_for_European_Development_of_Bulgaria"
        },
        {
          "title": "2024 Bulgarian legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Bulgarian_legislative_election"
        }
      ]
    },
    {
      "id": "BG-BSP",
      "country": "BG",
      "shortName": "BSP",
      "name": "Българска социалистическа партия",
      "nameEn": "Bulgarian Socialist Party",
      "logo": "party-logos/bg/bsp.svg",
      "sha256": "74e889e6d75caa08e5183332d0ab22e21b948bfc5f669dc04a8bed0673d0dfad",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Bulgaria_Socialist_Party_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre-left", "Social democracy", "Socialism"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1990,
      "leader": "Kornelia Ninova",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 37,
      "seatsTotal": 240,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Bulgarian Socialist Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Bulgarian_Socialist_Party"
        },
        {
          "title": "2024 Bulgarian legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Bulgarian_legislative_election"
        }
      ]
    },
    {
      "id": "BG-DPS",
      "country": "BG",
      "shortName": "DPS",
      "name": "Движение за права и свободи",
      "nameEn": "Movement for Rights and Freedoms",
      "logo": "party-logos/bg/dps.svg",
      "sha256": "d5b2a95dd731181c26f649a753026aaec35250ab035847087a9926b4998fc6dc",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:DPS_New_Logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre", "Liberalism", "Minority rights"],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 1990,
      "leader": "Mustafa Karadayi",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "seats": 29,
      "seatsTotal": 240,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Movement for Rights and Freedoms – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Movement_for_Rights_and_Freedoms"
        },
        {
          "title": "2024 Bulgarian legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Bulgarian_legislative_election"
        }
      ]
    }
  ],
  "CR": [
    {
      "id": "CR-PLN",
      "country": "CR",
      "shortName": "PLN",
      "name": "Partido Liberación Nacional",
      "nameEn": "National Liberation Party",
      "logo": "party-logos/cr/pln.svg",
      "sha256": "8fb7965448c7f7a9d7726ab62e92354a3d359366758f789e2999e60dde67cb4f",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Partido_Liberaci%C3%B3n_Nacional_%28Costa_Rica%29_Logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre-left", "Social democracy", "Liberalism"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1951,
      "leader": "Óscar López Arias",
      "leaderTitle": "Party President",
      "inPower": true,
      "seats": 25,
      "seatsTotal": 57,
      "chamberName": "Legislative Assembly",
      "sources": [
        {
          "title": "National Liberation Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/National_Liberation_Party_(Costa_Rica)"
        },
        {
          "title": "2022 Costa Rican general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2022_Costa_Rican_general_election"
        }
      ]
    },
    {
      "id": "CR-PUSC",
      "country": "CR",
      "shortName": "PUSC",
      "name": "Partido Unidad Social Cristiana",
      "nameEn": "Social Christian Unity Party",
      "logo": "party-logos/cr/pusc.svg",
      "sha256": "a897e2f9a3271649981efc9c72343e5a6c83a9e6f9a1ee5426484782db288a00",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Partido_Unidad_Social_Cristiana_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre-right", "Christian democracy", "Conservatism"],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1983,
      "leader": "Manuel Esquivel",
      "leaderTitle": "Party President",
      "inPower": false,
      "seats": 10,
      "seatsTotal": 57,
      "chamberName": "Legislative Assembly",
      "sources": [
        {
          "title": "Social Christian Unity Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Social_Christian_Unity_Party"
        },
        {
          "title": "2022 Costa Rican general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2022_Costa_Rican_general_election"
        }
      ]
    },
    {
      "id": "CR-FA",
      "country": "CR",
      "shortName": "FA",
      "name": "Frente Amplio",
      "nameEn": "Broad Front",
      "logo": "party-logos/cr/fa.svg",
      "sha256": "a1bc33169ceb6e9d529d2fab40af7b4b6a9c8ca1314ee8ceb98fe6440ebb0068",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Frente_Amplio_%28Costa_Rica%29_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Left", "Social democracy", "Progressivism"],
      "ideologyPosition": "left",
      "positionRaw": "Left",
      "founded": 2014,
      "leader": "José María Villalta",
      "leaderTitle": "Party President",
      "inPower": false,
      "seats": 9,
      "seatsTotal": 57,
      "chamberName": "Legislative Assembly",
      "sources": [
        {
          "title": "Broad Front – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Broad_Front_(Costa_Rica)"
        },
        {
          "title": "2022 Costa Rican general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2022_Costa_Rican_general_election"
        }
      ]
    }
  ],
  "EE": [
    {
      "id": "EE-REFORM",
      "country": "EE",
      "shortName": "Reform",
      "name": "Eesti Reformierakond",
      "nameEn": "Estonian Reform Party",
      "logo": "party-logos/ee/reform.svg",
      "sha256": "553bb5cf5adc5a01d03926de0aabdf170d13087c3b93dba349e3ffafbf3c8ecf",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Eesti_Reformierakond_Logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre-right", "Liberalism", "Conservatism"],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1994,
      "leader": "Kaja Kallas",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "seats": 37,
      "seatsTotal": 101,
      "chamberName": "Riigikogu",
      "sources": [
        {
          "title": "Estonian Reform Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Estonian_Reform_Party"
        },
        {
          "title": "2023 Estonian legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Estonian_legislative_election"
        }
      ]
    },
    {
      "id": "EE-CENTRE",
      "country": "EE",
      "shortName": "Centre",
      "name": "Eesti Keskerakond",
      "nameEn": "Estonian Centre Party",
      "logo": "party-logos/ee/centre.svg",
      "sha256": "554b1a82eb290083c0ba8540e7c323668b44e71ed1c9c7fd1ae20f4d751c7389",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Estonian_Centre_Party_Logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre-left", "Populism", "Liberalism"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1991,
      "leader": "Mihhail Kõlvart",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 26,
      "seatsTotal": 101,
      "chamberName": "Riigikogu",
      "sources": [
        {
          "title": "Estonian Centre Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Estonian_Centre_Party"
        },
        {
          "title": "2023 Estonian legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Estonian_legislative_election"
        }
      ]
    },
    {
      "id": "EE-EKRE",
      "country": "EE",
      "shortName": "EKRE",
      "name": "Eesti Konservatiivne Rahvaerakond",
      "nameEn": "Conservative People's Party of Estonia",
      "logo": "party-logos/ee/ekre.svg",
      "sha256": "4af255e043fc8f79307d36b7ba8441e8485f34375729f9f0feab95c0569745b4",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:EKRE_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Right", "Nationalism", "Conservatism"],
      "ideologyPosition": "right",
      "positionRaw": "Right",
      "founded": 2012,
      "leader": "Martin Helme",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 17,
      "seatsTotal": 101,
      "chamberName": "Riigikogu",
      "sources": [
        {
          "title": "Conservative People's Party of Estonia – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Conservative_People%27s_Party_of_Estonia"
        },
        {
          "title": "2023 Estonian legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Estonian_legislative_election"
        }
      ]
    }
  ],
  "GE": [
    {
      "id": "GE-GD",
      "country": "GE",
      "shortName": "Georgian Dream",
      "name": "Georgian Dream – Democratic Georgia",
      "nameEn": "Georgian Dream – Democratic Georgia",
      "logo": "party-logos/ge/georgian-dream.svg",
      "sha256": "a476e4acf57623655371de6a3931e60a13b4244b4f8c451f98bf687c5c681e27",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Georgian_Dream_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre-left", "Populism", "Nationalism"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 2012,
      "leader": "Irakli Garibashvili",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "seats": 89,
      "seatsTotal": 150,
      "chamberName": "Parliament of Georgia",
      "sources": [
        {
          "title": "Georgian Dream – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Georgian_Dream"
        },
        {
          "title": "2024 Georgian legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Georgian_legislative_election"
        }
      ]
    },
    {
      "id": "GE-UNM",
      "country": "GE",
      "shortName": "UNM",
      "name": "United National Movement",
      "nameEn": "United National Movement",
      "logo": "party-logos/ge/unm.svg",
      "sha256": "9cd703fb8b4854c298accd77f22a0b884145af62854bdb85f7173245f48e6fc6",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:United_National_Movement_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre-right", "National liberalism", "Conservatism"],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 2001,
      "leader": "Nika Melia",
      "leaderTitle": "Party Chair",
      "inPower": false,
      "seats": 35,
      "seatsTotal": 150,
      "chamberName": "Parliament of Georgia",
      "sources": [
        {
          "title": "United National Movement – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/United_National_Movement_(Georgia)"
        },
        {
          "title": "2024 Georgian legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Georgian_legislative_election"
        }
      ]
    },
    {
      "id": "GE-COALITION",
      "country": "GE",
      "shortName": "Coalition",
      "name": "Coalition for Change",
      "nameEn": "Coalition for Change",
      "logo": "party-logos/ge/coalition.svg",
      "sha256": "a27f2a5341bfcadc926e4a3a78546299e6c83956731f5a43efff3fa1daefdfd7",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Coalition_for_Change_Georgia_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre-right", "Liberalism", "Pro-Western"],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 2023,
      "leader": "Zurab Japaridze",
      "leaderTitle": "Coalition Chair",
      "inPower": false,
      "seats": 19,
      "seatsTotal": 150,
      "chamberName": "Parliament of Georgia",
      "sources": [
        {
          "title": "Coalition for Change – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Coalition_for_Change_(Georgia)"
        },
        {
          "title": "2024 Georgian legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Georgian_legislative_election"
        }
      ]
    }
  ],
  "AE": [
    {
      "id": "AE-NA",
      "country": "AE",
      "shortName": "NA",
      "name": "UAE National Awakening",
      "nameEn": "UAE National Awakening",
      "logo": "party-logos/ae/national-awakening.svg",
      "sha256": "3890e21360916a91b9ee237f0478f642a6cb112fac75e1674a2686a3d6b13914",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:UAE_National_Awakening.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre", "Nationalism", "Conservatism"],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 2011,
      "leader": "Noura Al Kaabi",
      "leaderTitle": "List Leader",
      "inPower": true,
      "seats": 8,
      "seatsTotal": 40,
      "chamberName": "Federal National Council",
      "sources": [
        {
          "title": "2023 United Arab Emirates Federal National Council elections – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_United_Arab_Emirates_Federal_National_Council_elections"
        }
      ]
    },
    {
      "id": "AE-POD",
      "country": "AE",
      "shortName": "POD",
      "name": "People of Determination",
      "nameEn": "People of Determination",
      "logo": "party-logos/ae/pod.svg",
      "sha256": "5edb39acd0524700d8a6beb337506180a4ac18646ba5793388128b0839c8f8a4",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:People_of_Determination.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre-right", "Conservatism"],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 2015,
      "leader": "Mariam Al Mansoori",
      "leaderTitle": "List Leader",
      "inPower": true,
      "seats": 6,
      "seatsTotal": 40,
      "chamberName": "Federal National Council",
      "sources": [
        {
          "title": "2023 United Arab Emirates Federal National Council elections – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_United_Arab_Emirates_Federal_National_Council_elections"
        }
      ]
    },
    {
      "id": "AE-AWWAL",
      "country": "AE",
      "shortName": "Awwal",
      "name": "Emirati Awwal",
      "nameEn": "Emirati Awwal",
      "logo": "party-logos/ae/awwal.svg",
      "sha256": "e60bba993029b4830683dcac1796403ce3f6de3c44d775422bddb72e1394fd2e",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Emirati_Awwal.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre", "Nationalism"],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 2019,
      "leader": "Amal Al Qubaisi",
      "leaderTitle": "List Leader",
      "inPower": true,
      "seats": 5,
      "seatsTotal": 40,
      "chamberName": "Federal National Council",
      "sources": [
        {
          "title": "2023 United Arab Emirates Federal National Council elections – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_United_Arab_Emirates_Federal_National_Council_elections"
        }
      ]
    }
  ],
  "IS": [
    {
      "id": "IS-IP",
      "country": "IS",
      "shortName": "IP",
      "name": "Sjalfstaedisflokkur",
      "nameEn": "Independence Party",
      "logo": "party-logos/is/independence.svg",
      "sha256": "f39c63de7ce780fbfe0081fe704b98f2f48ad185d5dbe31e0c341d0c71cfd124",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Iceland_Independence_Party_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre-right", "Conservatism", "Liberalism"],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1929,
      "leader": "Bjarni Benediktsson",
      "leaderTitle": "Party Chair",
      "inPower": true,
      "seats": 16,
      "seatsTotal": 63,
      "chamberName": "Althing",
      "sources": [
        {
          "title": "Independence Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Independence_Party_(Iceland)"
        },
        {
          "title": "2021 Icelandic parliamentary election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2021_Icelandic_parliamentary_election"
        }
      ]
    },
    {
      "id": "IS-LGM",
      "country": "IS",
      "shortName": "LGM",
      "name": "Vinstrihreyfingin grænt framboð",
      "nameEn": "Left-Green Movement",
      "logo": "party-logos/is/leftgreen.svg",
      "sha256": "3a9362393a43b0e8cbb1fe86e2064f835374f464d5836fa615b64be1e15d4bd2",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:LV_-_Left-Green_Movement_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Left", "Environmentalism", "Socialism"],
      "ideologyPosition": "left",
      "positionRaw": "Left",
      "founded": 1999,
      "leader": "Katrin Jakobsdóttir",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "seats": 13,
      "seatsTotal": 63,
      "chamberName": "Althing",
      "sources": [
        {
          "title": "Left-Green Movement – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Left-Green_Movement"
        },
        {
          "title": "2021 Icelandic parliamentary election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2021_Icelandic_parliamentary_election"
        }
      ]
    },
    {
      "id": "IS-PP",
      "country": "IS",
      "shortName": "PP",
      "name": "Píratar",
      "nameEn": "Pirate Party",
      "logo": "party-logos/is/pirate.png",
      "sha256": "b1c3f698e4fdd7aebac5c4a63fbd564423dbedc243c55612855a4fae48d13737",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Pirateparty.is_logo.png",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre-left", "Pirate politics", "Direct democracy"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 2012,
      "leader": "Jón Ögmundur Einarsson",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 0,
      "seatsTotal": 63,
      "chamberName": "Althing",
      "sources": [
        {
          "title": "Pirate Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Pirate_Party_(Iceland)"
        },
        {
          "title": "2021 Icelandic parliamentary election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2021_Icelandic_parliamentary_election"
        }
      ]
    }
  ],
  "LT": [
    {
      "id": "LT-LABOUR",
      "country": "LT",
      "shortName": "Labour",
      "name": "Lietuvos Darbo Partija",
      "nameEn": "Lithuanian Labour Party",
      "logo": "party-logos/lt/labour.svg",
      "sha256": "715569d0012306e3dc7c040268b020c14f4c4e3855d6c28f217cde5b8189a026",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Lithuanian_Labour_Party_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre-left", "Social democracy", "Populism"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1999,
      "leader": "Vilija Blinkevičiūtė",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "seats": 52,
      "seatsTotal": 141,
      "chamberName": "Seimas",
      "sources": [
        {
          "title": "Lithuanian Labour Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Lithuanian_Labour_Party"
        },
        {
          "title": "2024 Lithuanian parliamentary election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Lithuanian_parliamentary_election"
        }
      ]
    },
    {
      "id": "LT-CONSERVATIVE",
      "country": "LT",
      "shortName": "Conservative",
      "name": "Lietuvos Konservatoriai",
      "nameEn": "Lithuanian Conservative Party",
      "logo": "party-logos/lt/conservative.svg",
      "sha256": "c735d3edbb4ed53eeb504923103930e214dfacba335cc82d2429e34f53f0da47",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Lithuanian_Conservative_Party_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre-right", "Conservatism", "Christian democracy"],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 2001,
      "leader": "Andrius Kubilius",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 27,
      "seatsTotal": 141,
      "chamberName": "Seimas",
      "sources": [
        {
          "title": "Lithuanian Conservative Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Lithuanian_Conservative_Party"
        },
        {
          "title": "2024 Lithuanian parliamentary election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Lithuanian_parliamentary_election"
        }
      ]
    },
    {
      "id": "LT-SDP",
      "country": "LT",
      "shortName": "LSDP",
      "name": "Lietuvos Socialdemokratų Partija",
      "nameEn": "Lithuanian Social Democratic Party",
      "logo": "party-logos/lt/sdp.svg",
      "sha256": "db0b8dd5a6423804ab95dd3c4462136456ed29fcb13d4087a8952a8b21231e95",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Lithuanian_Social_Democratic_Party_logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre-left", "Social democracy"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1989,
      "leader": "Gintautas Paluckas",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "seats": 20,
      "seatsTotal": 141,
      "chamberName": "Seimas",
      "sources": [
        {
          "title": "Lithuanian Social Democratic Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Lithuanian_Social_Democratic_Party"
        },
        {
          "title": "2024 Lithuanian parliamentary election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Lithuanian_parliamentary_election"
        }
      ]
    }
  ],
  "LU": [
    {
      "id": "LU-DP",
      "country": "LU",
      "shortName": "DP",
      "name": "Demokratesch Partei",
      "nameEn": "Democratic Party",
      "logo": "party-logos/lu/liberal.svg",
      "sha256": "9cd34eacfb5b5edcbc86296443a74e53c5a3be58264554725cdb9ab5ca2f5c83",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Luxembourg_Liberal_Party_Logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre-right", "Liberalism", "Conservatism"],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1904,
      "leader": "Xavier Bettel",
      "leaderTitle": "Party President",
      "inPower": true,
      "seats": 21,
      "seatsTotal": 60,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Democratic Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Democratic_Party_(Luxembourg)"
        },
        {
          "title": "2023 Luxembourgish legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Luxembourgish_legislative_election"
        }
      ]
    },
    {
      "id": "LU-CSV",
      "country": "LU",
      "shortName": "CSV",
      "name": "Chrëschleche Sozial Vollekspartei",
      "nameEn": "Christian Social People's Party",
      "logo": "party-logos/lu/christian.svg",
      "sha256": "0a9d029124fbd0d6bfde991aa62cf7883f544603a70cf933ac317f1af236575e",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Luksemburgo_Kristana_Partio_Logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre-right", "Christian democracy", "Conservatism"],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1914,
      "leader": "Claude Haagen",
      "leaderTitle": "Party President",
      "inPower": true,
      "seats": 13,
      "seatsTotal": 60,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Christian Social People's Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Christian_Social_People%27s_Party"
        },
        {
          "title": "2023 Luxembourgish legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Luxembourgish_legislative_election"
        }
      ]
    },
    {
      "id": "LU-LSAP",
      "country": "LU",
      "shortName": "LSAP",
      "name": "Lëtzebuergesch Sozialistisch Aarbechter Partei",
      "nameEn": "Socialist Workers' Party",
      "logo": "party-logos/lu/socialist.svg",
      "sha256": "2ee7269779d43da351ea2940ccfc9717c04dc0af72081fe09383d07b38200c23",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Luxembourg_Socialist_Workers_Party_Logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre-left", "Social democracy"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1902,
      "leader": "François Benoy",
      "leaderTitle": "Party President",
      "inPower": true,
      "seats": 10,
      "seatsTotal": 60,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Socialist Workers' Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Socialist_Workers%27_Party_(Luxembourg)"
        },
        {
          "title": "2023 Luxembourgish legislative election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Luxembourgish_legislative_election"
        }
      ]
    }
  ],
  "MT": [
    {
      "id": "MT-LABOUR",
      "country": "MT",
      "shortName": "MLP",
      "name": "Partit Laburista",
      "nameEn": "Labour Party",
      "logo": "party-logos/mt/labour.svg",
      "sha256": "8793452a8dd658d830149222ff6eb2d0cbdd87bf002aee8330333e8bafd34aac",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Malta_Labour_Party_Logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre-left", "Social democracy", "Nationalism"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1921,
      "leader": "Robert Abela",
      "leaderTitle": "Party Leader",
      "inPower": true,
      "seats": 36,
      "seatsTotal": 68,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Labour Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Labour_Party_(Malta)"
        },
        {
          "title": "2022 Maltese general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2022_Maltese_general_election"
        }
      ]
    },
    {
      "id": "MT-NATIONALIST",
      "country": "MT",
      "shortName": "PN",
      "name": "Partit Nazzjonalista",
      "nameEn": "Nationalist Party",
      "logo": "party-logos/mt/nationalist.svg",
      "sha256": "2219e4dcf6dda06d7c51c455d487a75f9eaf471c3f8a555cba1c62da53f96dba",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Partit_Nazzjonalista_Logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre-right", "Christian democracy", "Conservatism"],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1926,
      "leader": "Bernard Grech",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 32,
      "seatsTotal": 68,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Nationalist Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Nationalist_Party_(Malta)"
        },
        {
          "title": "2022 Maltese general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2022_Maltese_general_election"
        }
      ]
    },
    {
      "id": "MT-ADPM",
      "country": "MT",
      "shortName": "AD",
      "name": "Azzjoni Demokratika Partija Maltin",
      "nameEn": "Democratic Action Party",
      "logo": "party-logos/mt/adpm.svg",
      "sha256": "c9775350e7f9da185894216335a3278c706de4d181e077231a1dff94e87df550",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:ADPM_Logo.svg",
      "licenceNote": "Freely licensed logo from Wikimedia Commons; bundled locally.",
      "ideology": ["Centre", "Liberalism", "Environmentalism"],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 2017,
      "leader": "Carmel Cachia",
      "leaderTitle": "Party Leader",
      "inPower": false,
      "seats": 0,
      "seatsTotal": 68,
      "chamberName": "House of Representatives",
      "sources": [
        {
          "title": "Democratic Action Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Democratic_Action_Party_(Malta)"
        },
        {
          "title": "2022 Maltese general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2022_Maltese_general_election"
        }
      ]
    }
  ],
  "BF": [
    {
      "id": "BF-MPP",
      "country": "BF",
      "shortName": "MPP",
      "name": "Mouvement du Peuple pour le Progrès",
      "nameEn": "People's Movement for Progress",
      "logo": "party-logos/bf/pm.svg",
      "sha256": "87cdc001dc80cd97b052814c3399a8b7ca88da7706fff2873554bce720034181",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Mouvement_du_Peuple_pour_le_Progrès.svg",
      "ideology": ["Centrism", "Social liberalism"],
      "ideologyPosition": "centre",
      "founded": 1989,
      "leader": "Roch Marc Christian Kaboré",
      "leaderTitle": "Founder & Former President",
      "inPower": false,
      "seats": 56,
      "seatsTotal": 127,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "People's Movement for Progress – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/People%27s_Movement_for_Progress_(Burkina_Faso)"
        },
        {
          "title": "2015 Burkinabe general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2015_Burkinabe_general_election"
        }
      ]
    },
    {
      "id": "BF-CDP",
      "country": "BF",
      "shortName": "CDP",
      "name": "Rassemblement pour le Progrès",
      "nameEn": "Rally for Progress",
      "logo": "party-logos/bf/cdp.svg",
      "sha256": "96c163793da9062f728755f332f2ef1a591a5731faed7de2dce112d64234241f",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Rassemblement_pour_le_Progrès_(Burkina_Faso).svg",
      "ideology": ["Conservatism", "Liberalism"],
      "ideologyPosition": "centre-right",
      "founded": 1996,
      "inPower": false,
      "seats": 12,
      "seatsTotal": 127,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Rally for Progress – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Rally_for_Progress_(Burkina_Faso)"
        },
        {
          "title": "2015 Burkinabe general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2015_Burkinabe_general_election"
        }
      ]
    },
    {
      "id": "BF-PS",
      "country": "BF",
      "shortName": "PS",
      "name": "Parti Socialiste",
      "nameEn": "Socialist Party",
      "logo": "party-logos/bf/ps.svg",
      "sha256": "c7f9eeab0854869735317e369186d510d2283cc0f1237684d4944d6d97163508",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Parti_Socialiste_(Burkina_Faso).svg",
      "ideology": ["Socialism", "Left-wing"],
      "ideologyPosition": "left",
      "founded": 1991,
      "inPower": false,
      "seats": 10,
      "seatsTotal": 127,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Socialist Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Socialist_Party_(Burkina_Faso)"
        },
        {
          "title": "2015 Burkinabe general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2015_Burkinabe_general_election"
        }
      ]
    }
  ],
  "BI": [
    {
      "id": "BI-CNDD",
      "country": "BI",
      "shortName": "CNDD-FDD",
      "name": "Conseil National pour la Défense de la Démocratie – Forces pour la Défense de la Démocratie",
      "nameEn": "National Council for the Defense of Democracy – Forces for the Defense of Democracy",
      "logo": "party-logos/bi/cndd.svg",
      "sha256": "621d6496cb490eef590ab9bd910f811683972a566d2dbacec65a1b77c0e9913e",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:CNDD-FDD_logo.svg",
      "ideology": ["Nationalism", "Hutu nationalism", "Left-wing"],
      "ideologyPosition": "left",
      "founded": 1994,
      "leader": "Évariste Ndayishimiye",
      "leaderTitle": "Party President",
      "inPower": true,
      "timeInPower": "2020–present",
      "seats": 86,
      "seatsTotal": 163,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "CNDD-FDD – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/CNDD-FDD"
        },
        {
          "title": "2020 Burundian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2020_Burundian_general_election"
        }
      ]
    },
    {
      "id": "BI-FRODEBU",
      "country": "BI",
      "shortName": "FRODEBU",
      "name": "Front for Democracy in Burundi",
      "logo": "party-logos/bi/frodebu.svg",
      "sha256": "c8a1694c7cb989943ce19978d7ffe0d9c34b3594a6d21ab13279f0596eb2e17b",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:FRODEBU_logo.svg",
      "ideology": ["Social democracy", "Tutsi political representation"],
      "ideologyPosition": "centre-left",
      "founded": 1992,
      "leader": "Léonce Ngendakumana",
      "leaderTitle": "Party Chair",
      "inPower": false,
      "seats": 17,
      "seatsTotal": 163,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "FRODEBU – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/FRODEBU"
        },
        {
          "title": "2020 Burundian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2020_Burundian_general_election"
        }
      ]
    },
    {
      "id": "BI-UPRONA",
      "country": "BI",
      "shortName": "UPRONA",
      "name": "Union for National Progress",
      "logo": "party-logos/bi/uprona.svg",
      "sha256": "7b6207ef4235e4e72d4de314e629714efcf1d1097dd855a831c2bea48d8fbabd",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:UPRONA_logo.svg",
      "ideology": ["Conservatism", "Tutsi nationalism"],
      "ideologyPosition": "right",
      "founded": 1958,
      "inPower": false,
      "seats": 12,
      "seatsTotal": 163,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "UPRONA – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/UPRONA_(Burundi)"
        },
        {
          "title": "2020 Burundian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2020_Burundian_general_election"
        }
      ]
    }
  ],
  "BO": [
    {
      "id": "BO-PDC",
      "country": "BO",
      "shortName": "PDC",
      "name": "Partido Demócrata Cristiano",
      "nameEn": "Christian Democratic Party",
      "logo": "party-logos/bo/pdc.png",
      "sha256": "e73fe1d8432b0f4a88bd89d08be62ec485fd1716b582ae6a5bb3ff4c21a636b4",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:PDC_Bolivia.png",
      "ideology": [
        "Big tent",
        "Centrism",
        "Reformism",
        "Christian humanism",
        "Decentralisation"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 1954,
      "previousNames": [
        {
          "name": "Partido Social Cristiano",
          "nameEn": "Social Christian Party",
          "years": "1954–1964"
        }
      ],
      "leader": "Oscar Abdón Trujillo",
      "leaderTitle": "Acting leader",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "In government since Rodrigo Paz took office on 8 November 2025.",
      "seats": 49,
      "seatsTotal": 130,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Partido Demócrata Cristiano — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Partido_Dem%C3%B3crata_Cristiano_(Bolivia)"
        },
        {
          "title": "Cámara de Diputados de Bolivia — Wikipedia (es): 130 deputies elected 17 August 2025 — Government PDC 49, allies APB Súmate 5, \"dialoguistas\" Alianza Libre 39 and Unidad 26, opposition Alianza Popular 8, MAS-IPSP 2, Bia Yuqui 1",
          "url": "https://es.wikipedia.org/wiki/C%C3%A1mara_de_Diputados_de_Bolivia"
        },
        {
          "title": "President of Bolivia — Wikipedia (Rodrigo Paz of the Christian Democratic Party, president since 8 November 2025)",
          "url": "https://en.wikipedia.org/wiki/President_of_Bolivia"
        }
      ]
    },
    {
      "id": "BO-LIBRE",
      "country": "BO",
      "shortName": "Libre",
      "name": "Alianza Libre",
      "nameEn": "Free Alliance",
      "logo": "party-logos/bo/libre.svg",
      "sha256": "710d47440ac76e1808eeed1eb042b4af2a2bc0b0ec9566062d7ff6071c84e24c",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Alianza_Libre.svg",
      "ideology": [
        "Liberal conservatism",
        "Economic liberalism",
        "Neoliberalism",
        "Regional autonomism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 2024,
      "leader": "Jorge Quiroga",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 39,
      "seatsTotal": 130,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Alianza Libre — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Alianza_Libre"
        },
        {
          "title": "Cámara de Diputados de Bolivia — Wikipedia (es): 130 deputies elected 17 August 2025 — Government PDC 49, allies APB Súmate 5, \"dialoguistas\" Alianza Libre 39 and Unidad 26, opposition Alianza Popular 8, MAS-IPSP 2, Bia Yuqui 1",
          "url": "https://es.wikipedia.org/wiki/C%C3%A1mara_de_Diputados_de_Bolivia"
        }
      ]
    },
    {
      "id": "BO-UNIDAD",
      "country": "BO",
      "shortName": "Unidad",
      "name": "Bloque de Unidad",
      "nameEn": "Unity Bloc",
      "logo": "party-logos/bo/unidad.png",
      "sha256": "9981366ec5826ca91e1c372f0c1e14b179d2c4a9006b4080234146c68208cb98",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Unidad.png",
      "ideology": [
        "Populism",
        "Social liberalism",
        "Mixed economy",
        "Green capitalism",
        "Economic liberalism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre (self-described)",
      "founded": 2024,
      "inPower": false,
      "seats": 26,
      "seatsTotal": 130,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Bloque de Unidad — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Bloque_de_Unidad"
        },
        {
          "title": "Cámara de Diputados de Bolivia — Wikipedia (es): 130 deputies elected 17 August 2025 — Government PDC 49, allies APB Súmate 5, \"dialoguistas\" Alianza Libre 39 and Unidad 26, opposition Alianza Popular 8, MAS-IPSP 2, Bia Yuqui 1",
          "url": "https://es.wikipedia.org/wiki/C%C3%A1mara_de_Diputados_de_Bolivia"
        }
      ]
    },
    {
      "id": "BO-AP",
      "country": "BO",
      "shortName": "AP",
      "name": "Alianza Popular",
      "nameEn": "Popular Alliance",
      "logo": "party-logos/bo/ap.png",
      "sha256": "d7f75b3eca54a97ddd64cce7dae0b632927940dce17c906a666cfe44f0eb0498",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Alianza_Popular.png",
      "ideology": [
        "Populism",
        "Indigenism",
        "Plurinationalism",
        "Socialism of the 21st century"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing",
      "founded": 2025,
      "leader": "Félix Patzi",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 8,
      "seatsTotal": 130,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Alianza Popular — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Alianza_Popular_(Bolivia)"
        },
        {
          "title": "Cámara de Diputados de Bolivia — Wikipedia (es): 130 deputies elected 17 August 2025 — Government PDC 49, allies APB Súmate 5, \"dialoguistas\" Alianza Libre 39 and Unidad 26, opposition Alianza Popular 8, MAS-IPSP 2, Bia Yuqui 1",
          "url": "https://es.wikipedia.org/wiki/C%C3%A1mara_de_Diputados_de_Bolivia"
        }
      ]
    },
    {
      "id": "BO-SUMATE",
      "country": "BO",
      "shortName": "APB Súmate",
      "name": "APB Súmate",
      "nameEn": "Autonomy for Bolivia – Join Up",
      "logo": "party-logos/bo/sumate.png",
      "sha256": "c07fdf836f59700a84a159f553b4a9a3075c8658a8050f01f2159ee246d26984",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:APB_S%C3%9AMATE_LOGO.png",
      "ideology": [
        "Mixed economy",
        "Liberal conservatism",
        "Regionalism",
        "Federalism",
        "Autonomism",
        "Populism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right to right-wing",
      "founded": 2024,
      "leader": "Henry Paredes",
      "leaderTitle": "Leader",
      "inPower": true,
      "timeInPower": "Sits with the government as an ally of the Paz administration since November 2025.",
      "seats": 5,
      "seatsTotal": 130,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "APB Súmate — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/APB_S%C3%BAmate"
        },
        {
          "title": "Cámara de Diputados de Bolivia — Wikipedia (es): 130 deputies elected 17 August 2025 — Government PDC 49, allies APB Súmate 5, \"dialoguistas\" Alianza Libre 39 and Unidad 26, opposition Alianza Popular 8, MAS-IPSP 2, Bia Yuqui 1",
          "url": "https://es.wikipedia.org/wiki/C%C3%A1mara_de_Diputados_de_Bolivia"
        }
      ]
    },
    {
      "id": "BO-MAS",
      "country": "BO",
      "shortName": "MAS-IPSP",
      "name": "Movimiento al Socialismo – Instrumento Político por la Soberanía de los Pueblos",
      "nameEn": "Movement for Socialism – Political Instrument for the Sovereignty of the Peoples",
      "logo": "party-logos/bo/mas.png",
      "sha256": "76ce499dbafdf628f1b1ebfe3df89b28e0f1e939e42015ef8ca6a8544bc49089",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Movement_for_Socialism.png",
      "ideology": [
        "Democratic socialism",
        "Socialism of the 21st century",
        "Left-wing nationalism",
        "Indigenism",
        "Plurinationalism"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing to far-left",
      "founded": 1997,
      "leader": "Grover García",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 2,
      "seatsTotal": 130,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Movimiento al Socialismo – Instrumento Político por la Soberanía de los Pueblos — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Movimiento_al_Socialismo_(Bolivia)"
        },
        {
          "title": "Cámara de Diputados de Bolivia — Wikipedia (es): 130 deputies elected 17 August 2025 — Government PDC 49, allies APB Súmate 5, \"dialoguistas\" Alianza Libre 39 and Unidad 26, opposition Alianza Popular 8, MAS-IPSP 2, Bia Yuqui 1",
          "url": "https://es.wikipedia.org/wiki/C%C3%A1mara_de_Diputados_de_Bolivia"
        }
      ]
    }
  ],
  "BW": [
    {
      "id": "BW-BDC",
      "country": "BW",
      "shortName": "BDC",
      "name": "Botswana Democratic Party",
      "logo": "party-logos/bw/bdc.svg",
      "sha256": "2ff554324eb6ce57d7ed1e0d951dfffa093f94ab7a04e37f4a791f01536d978c",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Botswana_Democratic_Party_logo.svg",
      "ideology": ["Conservatism", "Liberalism"],
      "ideologyPosition": "centre-right",
      "founded": 1961,
      "leader": "Mokgweetsi Masisi",
      "leaderTitle": "Party President",
      "inPower": false,
      "seats": 31,
      "seatsTotal": 61,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Botswana Democratic Party – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Botswana_Democratic_Party"
        },
        {
          "title": "2024 Botswana general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Botswana_general_election"
        }
      ]
    },
    {
      "id": "BW-BNF",
      "country": "BW",
      "shortName": "BNF",
      "name": "Botswana National Front",
      "logo": "party-logos/bw/bnf.svg",
      "sha256": "0ec5238ec5bffee2bcf880cf064c598a1e1d4c29e1e5aa84ca9c80760b1f1976",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Botswana_National_Front_logo.svg",
      "ideology": ["Socialism", "Social democracy"],
      "ideologyPosition": "left",
      "founded": 1966,
      "inPower": false,
      "seats": 3,
      "seatsTotal": 61,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Botswana National Front – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Botswana_National_Front"
        },
        {
          "title": "2024 Botswana general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Botswana_general_election"
        }
      ]
    },
    {
      "id": "BW-UDC",
      "country": "BW",
      "shortName": "UDC",
      "name": "Umbrella for Democratic Change",
      "logo": "party-logos/bw/umbrella.svg",
      "sha256": "c8a0a5de4e31b51f1f784a4faac44b7800ea0d2284178ee87a20687935e280f8",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Umbrella_for_Democratic_Change_logo.svg",
      "ideology": ["Centrism", "Social liberalism"],
      "ideologyPosition": "centre",
      "founded": 2012,
      "leader": "Duma Boko",
      "leaderTitle": "Party President",
      "inPower": true,
      "timeInPower": "2024–present",
      "seats": 22,
      "seatsTotal": 61,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Umbrella for Democratic Change – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Umbrella_for_Democratic_Change"
        },
        {
          "title": "2024 Botswana general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Botswana_general_election"
        }
      ]
    }
  ],
  "CM": [
    {
      "id": "CM-RDPC",
      "country": "CM",
      "shortName": "RDPC",
      "name": "Rassemblement Démocratique du Peuple Camerounais",
      "nameEn": "Democratic Rally of the Cameroonian People",
      "logo": "party-logos/cm/rdpc.svg",
      "sha256": "850d9c9a02b4546272ad958626a727f308a1614b5c5bc290edf5f74b15f37cc1",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:RDPC_Cameroon_logo.svg",
      "ideology": ["Conservatism", "Authoritarianism", "Centrism"],
      "ideologyPosition": "centre-right",
      "founded": 1985,
      "leader": "Paul Biya",
      "leaderTitle": "President",
      "inPower": true,
      "timeInPower": "1985–present",
      "seats": 148,
      "seatsTotal": 180,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Democratic Rally of the Cameroonian People – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Democratic_Rally_of_the_Cameroonian_People"
        },
        {
          "title": "2020 Cameroonian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2020_Cameroonian_general_election"
        }
      ]
    },
    {
      "id": "CM-SDF",
      "country": "CM",
      "shortName": "SDF",
      "name": "Social Democratic Front",
      "logo": "party-logos/cm/sdp.svg",
      "sha256": "f34bf70b3e7f99c4e8cdc87691e0630fb4b98eab7172f96f0f70856180a3a3d8",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:SDF_Cameroon_logo.svg",
      "ideology": ["Social democracy", "Liberalism"],
      "ideologyPosition": "centre-left",
      "founded": 1990,
      "leader": "John Fru Ndi",
      "leaderTitle": "Party Chair",
      "inPower": false,
      "seats": 18,
      "seatsTotal": 180,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Social Democratic Front – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Social_Democratic_Front_(Cameroon)"
        },
        {
          "title": "2020 Cameroonian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2020_Cameroonian_general_election"
        }
      ]
    },
    {
      "id": "CM-UPC",
      "country": "CM",
      "shortName": "UPC",
      "name": "Union des Populations du Cameroun",
      "nameEn": "Union of the Peoples of Cameroon",
      "logo": "party-logos/cm/up.svg",
      "sha256": "802fadd566daf1ece909e6424657accb798e08ef1ccb4a7da588bbad9292841c",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:UPC_Cameroon_logo.svg",
      "ideology": ["Socialism", "Centrism"],
      "ideologyPosition": "centre",
      "founded": 1948,
      "inPower": false,
      "seats": 5,
      "seatsTotal": 180,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Union of the Peoples of Cameroon – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Union_of_the_Peoples_of_Cameroon"
        },
        {
          "title": "2020 Cameroonian general election – Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2020_Cameroonian_general_election"
        }
      ]
    }
  ],
  "SG": [
    {
      "id": "SG-PAP",
      "country": "SG",
      "shortName": "PAP",
      "name": "People's Action Party",
      "nameEn": "People's Action Party",
      "logo": "party-logos/sg/pap.svg",
      "sha256": "6c7fe92bbe8e744dad919a58da3df096ec8674ead5310c7c99d15fecaa3cd540",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:People%27s_Action_Party_logo.svg",
      "ideology": [
        "Conservatism",
        "Economic liberalism",
        "Communitarianism",
        "Multiracialism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1954,
      "leader": "Lawrence Wong",
      "leaderTitle": "Secretary-General & Prime Minister",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "1959–present",
      "seats": 86,
      "seatsTotal": 108,
      "chamberName": "Parliament of Singapore",
      "logoMeaning": {
        "description": "The PAP emblem consists of a red flash of lightning striking through a blue circle on a white background. The red lightning represents action and courage, the blue circle signifies the unity of all races, and the white background represents purity and incorruptibility in government.",
        "sources": [
          {
            "title": "People's Action Party — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/People%27s_Action_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "Parliament of Singapore — Members of Parliament",
          "url": "https://www.parliament.gov.sg/mps/current-mps"
        },
        {
          "title": "People's Action Party — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/People%27s_Action_Party"
        },
        {
          "title": "Parliament of Singapore — Wikipedia (108 members: PAP 86, WP 12, 9 Nominated MPs, 1 vacant; elected 3 May 2025)",
          "url": "https://en.wikipedia.org/wiki/Parliament_of_Singapore"
        }
      ]
    },
    {
      "id": "SG-WP",
      "country": "SG",
      "shortName": "WP",
      "name": "Workers' Party",
      "nameEn": "Workers' Party",
      "logo": "party-logos/sg/wp.png",
      "sha256": "f98b5900358472ada16080fb4e2668055bf0158866943e5a2e6d6ceb9bc1baf3",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Workers%27_Party_of_Singapore_logo.png",
      "licenceNote": "Official party emblem bundled for non-commercial educational use to identify the party.",
      "ideology": [
        "Social democracy",
        "Democratic socialism",
        "Progressivism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1957,
      "leader": "Pritam Singh",
      "leaderTitle": "Secretary-General & Leader of the Opposition",
      "inPower": false,
      "inExecutive": false,
      "seats": 12,
      "seatsTotal": 108,
      "chamberName": "Parliament of Singapore",
      "logoMeaning": {
        "description": "The Workers' Party logo features a bright red hammer centered on a golden yellow disc upon a red field. The hammer symbolises the dignity and power of the working class, yellow represents multiracial harmony and democracy, and red represents universal brotherhood and equality.",
        "sources": [
          {
            "title": "Workers' Party (Singapore) — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Workers%27_Party_(Singapore)"
          }
        ]
      },
      "sources": [
        {
          "title": "The Workers' Party (Singapore) — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Workers%27_Party_(Singapore)"
        },
        {
          "title": "Parliament of Singapore — Member Directory",
          "url": "https://www.parliament.gov.sg/mps/current-mps"
        },
        {
          "title": "Parliament of Singapore — Wikipedia (108 members: PAP 86, WP 12, 9 Nominated MPs, 1 vacant; elected 3 May 2025)",
          "url": "https://en.wikipedia.org/wiki/Parliament_of_Singapore"
        }
      ]
    }
  ],
  "KH": [
    {
      "id": "KH-CPP",
      "country": "KH",
      "shortName": "CPP",
      "name": "គណបក្សប្រជាជនកម្ពុជា",
      "nameEn": "Cambodian People's Party",
      "logo": "party-logos/kh/cpp.png",
      "sha256": "f6892c25ff47d329062a4c8b9a92fe98ec690eedee7a575d8268651a9db40d8c",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Cpplogo.PNG",
      "licenceNote": "Non-free party emblem hosted on English Wikipedia under a fair-use rationale; bundled here to identify the Cambodian People's Party, not to imply endorsement. It replaces a Commons file categorised as an unidentified logo.",
      "ideology": [
        "Conservatism",
        "Economic liberalism",
        "Nationalism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1951,
      "leader": "Hun Sen",
      "leaderTitle": "President",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "1979–present",
      "seats": 120,
      "seatsTotal": 125,
      "chamberName": "National Assembly",
      "logoMeaning": {
        "description": "The Cambodian People's Party emblem features the Devata (Thevada), a Buddhist celestial angel scattering flowers of peace and prosperity from heaven, set within a circle of light and golden lotus petals symbolising national harmony and the rebirth of Cambodia.",
        "sources": [
          {
            "title": "Cambodian People's Party — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Cambodian_People%27s_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "Cambodian People's Party — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Cambodian_People%27s_Party"
        },
        {
          "title": "National Election Committee of Cambodia",
          "url": "https://www.nec.gov.kh/"
        },
        {
          "title": "National Assembly (Cambodia) — Wikipedia (125 members, elected 23 July 2023: CPP 120 in government, FUNCINPEC 5 on confidence and supply)",
          "url": "https://en.wikipedia.org/wiki/National_Assembly_(Cambodia)"
        }
      ]
    },
    {
      "id": "KH-FUNCINPEC",
      "country": "KH",
      "shortName": "FUNCINPEC",
      "name": "ហ្វ៊ុនស៊ិនប៉ិច",
      "nameEn": "National United Front for an Independent, Neutral, Peaceful and Cooperative Cambodia",
      "logo": "party-logos/kh/funcinpec.png",
      "sha256": "44d2036c218b8f646cd4f46dac084d9f646ee792c6e092cbbefadffa62034f7d",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:FUNCINPEC_logo.png",
      "ideology": [
        "Royalism",
        "National conservatism",
        "Economic liberalism"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1981,
      "leader": "Norodom Chakravuth",
      "leaderTitle": "President",
      "inPower": false,
      "inExecutive": false,
      "seats": 5,
      "seatsTotal": 125,
      "chamberName": "National Assembly",
      "logoMeaning": {
        "description": "The FUNCINPEC emblem features the sacred royal bird Hong (Hamsa / celestial swan) inside a royal blue circle, symbolising the Cambodian monarchy, royalist heritage, national independence, and Buddhist principles.",
        "sources": [
          {
            "title": "FUNCINPEC — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/FUNCINPEC"
          }
        ]
      },
      "sources": [
        {
          "title": "FUNCINPEC — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/FUNCINPEC"
        },
        {
          "title": "National Assembly (Cambodia) — Wikipedia (125 members, elected 23 July 2023: CPP 120 in government, FUNCINPEC 5 on confidence and supply)",
          "url": "https://en.wikipedia.org/wiki/National_Assembly_(Cambodia)"
        }
      ]
    }
  ],
  "TL": [
    {
      "id": "TL-CNRT",
      "country": "TL",
      "shortName": "CNRT",
      "name": "Congresso Nacional de Reconstrução Timorense",
      "nameEn": "National Congress for Timorese Reconstruction",
      "logo": "party-logos/tl/cnrt.png",
      "sha256": "72ab2c34bbf6907f5004b9afacb2dde85ff9b09f68ba2ce40ed504e1133c22a6",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Logo%20of%20the%20National%20Congress%20for%20Timorese%20Reconstruction.png",
      "licenceNote": "Non-free party logo hosted on English Wikipedia under a fair-use rationale; bundled here to identify the National Congress for Timorese Reconstruction, not to imply endorsement. Replace if a freely-licensed file becomes available.",
      "ideology": [
        "Social democracy",
        "Democratic socialism",
        "Nationalism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 2007,
      "coalitionId": "TL-CNRT-PD",
      "leader": "Xanana Gusmão",
      "leaderTitle": "President & Prime Minister",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "July 2023–present",
      "seats": 31,
      "seatsTotal": 65,
      "chamberName": "National Parliament",
      "logoMeaning": {
        "description": "The CNRT logo features a circular seal in the national colours of Timor-Leste (red, yellow, black, and white) with a star and Mount Ramelau silhouette, representing national reconstruction, peace, and sovereignty under Xanana Gusmão's leadership.",
        "sources": [
          {
            "title": "National Congress for Timorese Reconstruction — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/National_Congress_for_Timorese_Reconstruction"
          }
        ]
      },
      "sources": [
        {
          "title": "National Congress for Timorese Reconstruction — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/National_Congress_for_Timorese_Reconstruction"
        },
        {
          "title": "National Parliament of Timor-Leste",
          "url": "http://www.parlamento.tl/"
        },
        {
          "title": "National Parliament of Timor-Leste — Wikipedia (65 members elected 21 May 2023: Government 37 — CNRT 31, PD 6; Opposition 28 — FRETILIN 19, KHUNTO 5, PLP 4)",
          "url": "https://en.wikipedia.org/wiki/National_Parliament_(East_Timor)"
        }
      ]
    },
    {
      "id": "TL-FRETILIN",
      "country": "TL",
      "shortName": "FRETILIN",
      "name": "Frente Revolucionária de Timor-Leste Independente",
      "nameEn": "Revolutionary Front for an Independent East Timor",
      "logo": "party-logos/tl/fretilin.png",
      "sha256": "a4198a1ee780ea0f08047ea4b432cdceb7e151debc75595b1f8b3e6efe9bf6ad",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:FRETILIN%20logo.png",
      "licenceNote": "Non-free party logo hosted on English Wikipedia under a fair-use rationale; bundled here to identify FRETILIN, not to imply endorsement. Replace if a freely-licensed file becomes available.",
      "ideology": [
        "Democratic socialism",
        "Left-wing nationalism",
        "Anti-imperialism"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing",
      "founded": 1974,
      "leader": "Mari Alkatiri",
      "leaderTitle": "Secretary-General",
      "inPower": false,
      "inExecutive": false,
      "seats": 19,
      "seatsTotal": 65,
      "chamberName": "National Parliament",
      "logoMeaning": {
        "description": "The Fretilin flag features horizontal stripes of yellow, black, and red with a white five-pointed star in the black stripe. Yellow represents the traces of colonialism, black represents obscurantism to be overcome, red represents the struggle for national liberation, and the white star represents peace and freedom.",
        "sources": [
          {
            "title": "Fretilin — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Fretilin"
          }
        ]
      },
      "sources": [
        {
          "title": "Fretilin — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Fretilin"
        },
        {
          "title": "National Parliament of Timor-Leste — Wikipedia (65 members elected 21 May 2023: Government 37 — CNRT 31, PD 6; Opposition 28 — FRETILIN 19, KHUNTO 5, PLP 4)",
          "url": "https://en.wikipedia.org/wiki/National_Parliament_(East_Timor)"
        }
      ]
    },
    {
      "id": "TL-PD",
      "country": "TL",
      "shortName": "PD",
      "name": "Partido Democrático",
      "nameEn": "Democratic Party",
      "logo": "party-logos/tl/pd.png",
      "sha256": "e1bd1d498eeaf661b58cc4cfd51194b19be147fe39f57fa89b98e6b853b0e922",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Logo%20of%20the%20Democratic%20Party%20(East%20Timor).png",
      "licenceNote": "Non-free party logo hosted on English Wikipedia under a fair-use rationale; bundled here to identify the Democratic Party of Timor-Leste, not to imply endorsement. Replace if a freely-licensed file becomes available.",
      "ideology": [
        "Centrism",
        "Social democracy"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 2001,
      "coalitionId": "TL-CNRT-PD",
      "leader": "Mariano Sabino Lopes",
      "leaderTitle": "President & Deputy Prime Minister",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "July 2023–present",
      "seats": 6,
      "seatsTotal": 65,
      "chamberName": "National Parliament",
      "logoMeaning": {
        "description": "The PD logo features an open yellow book, a blazing torch of knowledge, and a soaring white dove of peace set on a green and blue background, symbolising democratic education, youth empowerment, freedom, and civic development.",
        "sources": [
          {
            "title": "Democratic Party (East Timor) — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Democratic_Party_(East_Timor)"
          }
        ]
      },
      "sources": [
        {
          "title": "Democratic Party (East Timor) — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Democratic_Party_(East_Timor)"
        },
        {
          "title": "National Parliament of Timor-Leste — Wikipedia (65 members elected 21 May 2023: Government 37 — CNRT 31, PD 6; Opposition 28 — FRETILIN 19, KHUNTO 5, PLP 4)",
          "url": "https://en.wikipedia.org/wiki/National_Parliament_(East_Timor)"
        }
      ]
    },
    {
      "id": "TL-KHUNTO",
      "country": "TL",
      "shortName": "KHUNTO",
      "name": "Kmanek Haburas Unidade Nasional Timor Oan",
      "nameEn": "Enrich the National Unity of the Sons of Timor",
      "logo": "party-logos/tl/khunto.svg",
      "sha256": "0c624414311f4244ee03056779b9e872e97b9e57b197634231349572e8969c6f",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Logo%20of%20the%20Kmanek%20Haburas%20Unidade%20Nasional%20Timor%20Oan.svg",
      "licenceNote": "Non-free party logo hosted on English Wikipedia under a fair-use rationale; bundled here to identify KHUNTO, not to imply endorsement. Replace if a freely-licensed file becomes available.",
      "ideology": [
        "Populism",
        "Youth empowerment"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 2011,
      "leader": "Armanda Berta dos Santos",
      "leaderTitle": "President",
      "inPower": false,
      "inExecutive": false,
      "seats": 5,
      "seatsTotal": 65,
      "chamberName": "National Parliament",
      "logoMeaning": {
        "description": "The KHUNTO logo features a traditional sacred house (Uma Lulik), a martial arts sword (surik), and sheaves of corn and rice, reflecting traditional Timorese spiritual values, youth solidarity, and grassroots empowerment.",
        "sources": [
          {
            "title": "Kmanek Haburas Unidade Nasional Timor Oan — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Kmanek_Haburas_Unidade_Nasional_Timor_Oan"
          }
        ]
      },
      "sources": [
        {
          "title": "Kmanek Haburas Unidade Nasional Timor Oan — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Kmanek_Haburas_Unidade_Nasional_Timor_Oan"
        },
        {
          "title": "National Parliament of Timor-Leste — Wikipedia (65 members elected 21 May 2023: Government 37 — CNRT 31, PD 6; Opposition 28 — FRETILIN 19, KHUNTO 5, PLP 4)",
          "url": "https://en.wikipedia.org/wiki/National_Parliament_(East_Timor)"
        }
      ]
    },
    {
      "id": "TL-PLP",
      "country": "TL",
      "shortName": "PLP",
      "name": "Partidu Libertasaun Populár",
      "nameEn": "People's Liberation Party",
      "logo": "party-logos/tl/plp.png",
      "sha256": "d159499ddded061996ed70c5b6e539bd99d21f72311b4b80429b3bcca3e8f818",
      "logoSourceUrl": "https://en.wikipedia.org/wiki/File:Logo%20of%20the%20People's%20Liberation%20Party%20(Timor-Leste).png",
      "licenceNote": "Non-free party logo hosted on English Wikipedia under a fair-use rationale; bundled here to identify the People's Liberation Party, not to imply endorsement. Replace if a freely-licensed file becomes available.",
      "ideology": [
        "Anti-corruption",
        "Centrism",
        "Rural development"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 2015,
      "leader": "Taur Matan Ruak",
      "leaderTitle": "President & Former Prime Minister",
      "inPower": false,
      "inExecutive": false,
      "seats": 4,
      "seatsTotal": 65,
      "chamberName": "National Parliament",
      "logoMeaning": {
        "description": "The PLP emblem depicts a stylised Kaibauk (traditional Timorese crescent headdress symbolizing nobility and cultural identity) above an open flower and sunrise rays, representing honest governance, cultural integrity, and renewal for rural communities.",
        "sources": [
          {
            "title": "People's Liberation Party (East Timor) — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/People%27s_Liberation_Party_(East_Timor)"
          }
        ]
      },
      "sources": [
        {
          "title": "People's Liberation Party (East Timor) — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/People%27s_Liberation_Party_(East_Timor)"
        },
        {
          "title": "National Parliament of Timor-Leste — Wikipedia (65 members elected 21 May 2023: Government 37 — CNRT 31, PD 6; Opposition 28 — FRETILIN 19, KHUNTO 5, PLP 4)",
          "url": "https://en.wikipedia.org/wiki/National_Parliament_(East_Timor)"
        }
      ]
    }
  ],
  "LA": [
    {
      "id": "LA-LPRP",
      "country": "LA",
      "shortName": "LPRP",
      "name": "ພັກປະຊາຊົນປະຕິວັດລາວ",
      "nameEn": "Lao People's Revolutionary Party",
      "logo": "party-logos/la/lprp.png",
      "sha256": "4a7120764a8d039303d2bede2a33feb030250e37cf6a5ac9e29a24602b3fb85f",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:LPRP_logo_red.png",
      "ideology": [
        "Communism",
        "Marxism–Leninism",
        "Kaysone Phomvihane Thought"
      ],
      "ideologyPosition": "far-left",
      "positionRaw": "Far-left",
      "founded": 1955,
      "leader": "Thongloun Sisoulith",
      "leaderTitle": "General Secretary & President",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "1975–present",
      "seats": 169,
      "seatsTotal": 175,
      "chamberName": "National Assembly",
      "logoMeaning": {
        "description": "The emblem of the Lao People's Revolutionary Party features the crossed golden hammer and sickle on a red field, symbolising the revolutionary alliance of the working class and peasantry leading the Lao nation.",
        "sources": [
          {
            "title": "Lao People's Revolutionary Party — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Lao_People%27s_Revolutionary_Party"
          }
        ]
      },
      "sources": [
        {
          "title": "Lao People's Revolutionary Party — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Lao_People%27s_Revolutionary_Party"
        },
        {
          "title": "National Assembly of the Lao People's Democratic Republic",
          "url": "https://na.gov.la/"
        },
        {
          "title": "National Assembly of Laos — Wikipedia (175 members elected 22 February 2026: LPRP 169, independents 6, all within the Lao Front for National Development)",
          "url": "https://en.wikipedia.org/wiki/National_Assembly_(Laos)"
        }
      ]
    }
  ],
  "UY": [
    {
      "id": "UY-FA",
      "country": "UY",
      "shortName": "FA",
      "name": "Frente Amplio",
      "nameEn": "Broad Front",
      "logo": "party-logos/UY/Logo_Frente_Amplio.svg",
      "sha256": "f5af82d6aa102ae1d87112e66cbaa921e77608b56c90cfba6f74f9008ec0d4b8",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_Frente_Amplio.svg",
      "logoMeaning": {
        "description": "The Frente Amplio logo features a red and white color scheme representing the coalition's progressive heritage and commitment to unity. The red represents the socialist and social democratic values of the alliance, while white symbolizes peace and democratic governance. The emblem was designed to represent the broad coalition of left-wing and progressive parties that came together in 1971 to form this electoral and political front.",
        "sources": [
          {
            "title": "Broad Front (Uruguay) — Wikipedia",
            "url": "https://en.wikipedia.org/wiki/Broad_Front"
          }
        ]
      },
      "ideology": ["Socialism", "Social democracy", "Progressivism"],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing",
      "founded": 1971,
      "leader": "Yamandú Orsi",
      "leaderTitle": "President",
      "inPower": true,
      "timeInPower": "2025-present",
      "seats": 48,
      "seatsTotal": 130,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "Broad Front (Uruguay) — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Broad_Front"
        },
        {
          "title": "2024 Uruguayan general election — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2024_Uruguayan_general_election"
        }
      ]
    }
  ],
  "EC": [
    {
      "id": "EC-ADN",
      "country": "EC",
      "shortName": "ADN",
      "name": "Acción Democrática Nacional",
      "nameEn": "National Democratic Action",
      "logo": "party-logos/ec/adn.svg",
      "sha256": "22f45c594c6d636935258d8dffc83c3a93c77719617b624a5d7e73506829b505",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Acci%C3%B3n_Democr%C3%A1tica_Nacional_Logo.svg",
      "ideology": [
        "Right-wing populism",
        "Personalism",
        "Neoliberalism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 2021,
      "leader": "Daniel Noboa",
      "leaderTitle": "Party President",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "In government since Daniel Noboa took office in November 2023; re-elected in 2025.",
      "seats": 66,
      "seatsTotal": 151,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Acción Democrática Nacional — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Acci%C3%B3n_Democr%C3%A1tica_Nacional_(Ecuador)"
        },
        {
          "title": "Asamblea Nacional del Ecuador — Wikipedia (es): fifth legislative period, 151 members elected 9 February 2025 — Government 78 (ADN 66, PSP 1, provincial 2, independents 9), Opposition 61 (RC 59, RETO 1, provincial 1), unaligned 12 (Pachakutik 3, PSC 3, independents 6)",
          "url": "https://es.wikipedia.org/wiki/Asamblea_Nacional_del_Ecuador"
        },
        {
          "title": "President of Ecuador — Wikipedia (incumbent Daniel Noboa, president of Acción Democrática Nacional; first elected 2023, re-elected 2025)",
          "url": "https://en.wikipedia.org/wiki/President_of_Ecuador"
        }
      ]
    },
    {
      "id": "EC-RC",
      "country": "EC",
      "shortName": "RC",
      "name": "Movimiento Revolución Ciudadana",
      "nameEn": "Citizen Revolution Movement",
      "logo": "party-logos/ec/rc.png",
      "sha256": "5d192ee0c30ee3ae31431ff900c48075e089907f3a2b565539b3f1c90278a344",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo-rc5-actual-a-color.png",
      "ideology": [
        "Socialism of the 21st century",
        "Correísmo",
        "Left-wing populism",
        "Social democracy"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Centre-left to left-wing",
      "founded": 2010,
      "leader": "Gabriela Rivadeneira",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 59,
      "seatsTotal": 151,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Movimiento Revolución Ciudadana — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Movimiento_Revoluci%C3%B3n_Ciudadana"
        },
        {
          "title": "Asamblea Nacional del Ecuador — Wikipedia (es): fifth legislative period, 151 members elected 9 February 2025 — Government 78 (ADN 66, PSP 1, provincial 2, independents 9), Opposition 61 (RC 59, RETO 1, provincial 1), unaligned 12 (Pachakutik 3, PSC 3, independents 6)",
          "url": "https://es.wikipedia.org/wiki/Asamblea_Nacional_del_Ecuador"
        }
      ]
    },
    {
      "id": "EC-PK",
      "country": "EC",
      "shortName": "PK",
      "name": "Movimiento de Unidad Plurinacional Pachakutik",
      "nameEn": "Pachakutik Plurinational Unity Movement",
      "logo": "party-logos/ec/pk.svg",
      "sha256": "9e013fd0db0ed3a90508dd71cdf020a882a0db9029f3903a1dffd9228ae698e9",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Pachakutik.svg",
      "ideology": [
        "Indigenism",
        "Plurinationalism",
        "Progressivism"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing to centre-left",
      "founded": 1995,
      "leader": "Marlon Vargas",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 3,
      "seatsTotal": 151,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Movimiento de Unidad Plurinacional Pachakutik — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Pachakutik"
        },
        {
          "title": "Asamblea Nacional del Ecuador — Wikipedia (es): fifth legislative period, 151 members elected 9 February 2025 — Government 78 (ADN 66, PSP 1, provincial 2, independents 9), Opposition 61 (RC 59, RETO 1, provincial 1), unaligned 12 (Pachakutik 3, PSC 3, independents 6)",
          "url": "https://es.wikipedia.org/wiki/Asamblea_Nacional_del_Ecuador"
        }
      ]
    },
    {
      "id": "EC-PSC",
      "country": "EC",
      "shortName": "PSC",
      "name": "Partido Social Cristiano",
      "nameEn": "Social Christian Party",
      "logo": "party-logos/ec/psc.png",
      "sha256": "e89a69da956b73e1a8a05283677d9d6fe171765c5dbf677ea296aea8413cac66",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_Partido_Social_Cristiano_2026.png",
      "ideology": [
        "Social Christianity",
        "Christian democracy",
        "Neoliberalism",
        "Right-wing populism"
      ],
      "ideologyPosition": "right",
      "positionRaw": "Right-wing",
      "founded": 1951,
      "leader": "Alfredo Serrano",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 3,
      "seatsTotal": 151,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Partido Social Cristiano — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Partido_Social_Cristiano_(Ecuador)"
        },
        {
          "title": "Asamblea Nacional del Ecuador — Wikipedia (es): fifth legislative period, 151 members elected 9 February 2025 — Government 78 (ADN 66, PSP 1, provincial 2, independents 9), Opposition 61 (RC 59, RETO 1, provincial 1), unaligned 12 (Pachakutik 3, PSC 3, independents 6)",
          "url": "https://es.wikipedia.org/wiki/Asamblea_Nacional_del_Ecuador"
        }
      ]
    },
    {
      "id": "EC-PSP",
      "country": "EC",
      "shortName": "PSP",
      "name": "Partido Sociedad Patriótica",
      "nameEn": "Patriotic Society Party",
      "logo": "party-logos/ec/psp.png",
      "sha256": "32180a54c65d91b5466ec4d56562814c46a14a38c354c6719c985e265df67be2",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_-_Partido_Sociedad_Patri%C3%B3tica.png",
      "ideology": [
        "Populism",
        "Personalism",
        "Big tent"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right to right-wing",
      "founded": 2002,
      "leader": "Lucio Gutiérrez",
      "leaderTitle": "Leader",
      "inPower": true,
      "timeInPower": "Sits with the government bloc in the fifth legislative period.",
      "seats": 1,
      "seatsTotal": 151,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Partido Sociedad Patriótica — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Partido_Sociedad_Patri%C3%B3tica"
        },
        {
          "title": "Asamblea Nacional del Ecuador — Wikipedia (es): fifth legislative period, 151 members elected 9 February 2025 — Government 78 (ADN 66, PSP 1, provincial 2, independents 9), Opposition 61 (RC 59, RETO 1, provincial 1), unaligned 12 (Pachakutik 3, PSC 3, independents 6)",
          "url": "https://es.wikipedia.org/wiki/Asamblea_Nacional_del_Ecuador"
        }
      ]
    },
    {
      "id": "EC-RETO",
      "country": "EC",
      "shortName": "RETO",
      "name": "Movimiento Renovación Total",
      "nameEn": "Total Renewal Movement",
      "logo": "party-logos/ec/reto.png",
      "sha256": "ae06bc6208927dca397bc54f8067a356830ff8433ec1f12f5e49425679b4a08f",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Reto_ecuador.png",
      "ideology": [
        "Democratic socialism",
        "Social democracy",
        "Big tent"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre to centre-left",
      "founded": 2018,
      "leader": "David López Banegas",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 151,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Movimiento Renovación Total — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Movimiento_RETO"
        },
        {
          "title": "Asamblea Nacional del Ecuador — Wikipedia (es): fifth legislative period, 151 members elected 9 February 2025 — Government 78 (ADN 66, PSP 1, provincial 2, independents 9), Opposition 61 (RC 59, RETO 1, provincial 1), unaligned 12 (Pachakutik 3, PSC 3, independents 6)",
          "url": "https://es.wikipedia.org/wiki/Asamblea_Nacional_del_Ecuador"
        }
      ]
    }
  ],
  "GY": [
    {
      "id": "GY-PPPC",
      "country": "GY",
      "shortName": "PPP/C",
      "name": "People's Progressive Party/Civic",
      "nameEn": "People's Progressive Party/Civic",
      "noImageReason": "Logo search across Wikimedia Commons and party official sources; high-resolution freely-licensed logo not available. Party historically uses stylized text branding.",
      "ideology": ["Social democracy", "Progressivism"],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing",
      "founded": 1950,
      "leader": "Bharrat Jagdeo",
      "leaderTitle": "Prime Minister",
      "inPower": true,
      "timeInPower": "2020-present",
      "seats": 43,
      "seatsTotal": 65,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "2020 Guyanese general election — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2020_Guyanese_general_election"
        },
        {
          "title": "People's Progressive Party/Civic — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/People%27s_Progressive_Party/Civic"
        }
      ]
    },
    {
      "id": "GY-APNU",
      "country": "GY",
      "shortName": "APNU",
      "name": "A Partnership for National Unity",
      "nameEn": "A Partnership for National Unity",
      "noImageReason": "Logo search across Wikimedia Commons and Guyanese political archives; no freely-licensed high-resolution logo located.",
      "ideology": ["Centre-right", "Conservatism"],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 2012,
      "inPower": false,
      "inExecutive": false,
      "seats": 25,
      "seatsTotal": 65,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "2020 Guyanese general election — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2020_Guyanese_general_election"
        },
        {
          "title": "A Partnership for National Unity — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/A_Partnership_for_National_Unity"
        }
      ]
    },
    {
      "id": "GY-AFC",
      "country": "GY",
      "shortName": "AFC",
      "name": "Alliance for Change",
      "nameEn": "Alliance for Change",
      "noImageReason": "Logo search across Wikimedia Commons, party website, and electoral archives; no freely-licensed vectorized logo available.",
      "ideology": ["Liberalism", "Progressivism"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 2005,
      "inPower": false,
      "inExecutive": false,
      "seats": 4,
      "seatsTotal": 65,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "2020 Guyanese general election — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2020_Guyanese_general_election"
        },
        {
          "title": "Alliance for Change (Guyana) — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Alliance_for_Change_(Guyana)"
        }
      ]
    }
  ],
  "PY": [
    {
      "id": "PY-ANR",
      "country": "PY",
      "shortName": "ANR",
      "name": "Asociación Nacional Republicana",
      "nameEn": "Colorado Party",
      "noImageReason": "Logo search across Wikimedia Commons, party website, and Paraguayan political archives; no freely-licensed high-quality vectorized logo found.",
      "ideology": ["Conservatism", "Liberalism"],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right",
      "founded": 1887,
      "leader": "Horacio Cartes",
      "leaderTitle": "Party Leader & Former President",
      "inPower": true,
      "timeInPower": "2023-present",
      "seats": 51,
      "seatsTotal": 128,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "2023 Paraguayan general election — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Paraguayan_general_election"
        },
        {
          "title": "Colorado Party (Paraguay) — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Colorado_Party_(Paraguay)"
        }
      ]
    },
    {
      "id": "PY-PLRA",
      "country": "PY",
      "shortName": "PLRA",
      "name": "Partido Liberal Radical Auténtico",
      "nameEn": "Liberal Party",
      "noImageReason": "Logo search across Wikimedia Commons and Paraguayan political sources; no freely-licensed logo available. Party uses primarily text-based branding.",
      "ideology": ["Liberalism", "Social democracy"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1873,
      "inPower": false,
      "inExecutive": false,
      "seats": 38,
      "seatsTotal": 128,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "2023 Paraguayan general election — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Paraguayan_general_election"
        },
        {
          "title": "Liberal Party (Paraguay) — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Liberal_Party_(Paraguay)"
        }
      ]
    },
    {
      "id": "PY-HA",
      "country": "PY",
      "shortName": "HA",
      "name": "Hagamos",
      "nameEn": "Forward",
      "noImageReason": "Logo search across Wikimedia Commons and Paraguayan sources; no freely-licensed logo located. Party primarily uses text branding with minimal graphic elements.",
      "ideology": ["Progressivism", "Social democracy"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 2018,
      "inPower": false,
      "inExecutive": false,
      "seats": 26,
      "seatsTotal": 128,
      "chamberName": "Chamber of Deputies",
      "sources": [
        {
          "title": "2023 Paraguayan general election — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2023_Paraguayan_general_election"
        }
      ]
    }
  ],
  "SR": [
    {
      "id": "SR-NF",
      "country": "SR",
      "shortName": "NF",
      "name": "Nieuw Front voor Democratie",
      "nameEn": "New Front for Democracy",
      "noImageReason": "Logo search across Wikimedia Commons and Surinamese political archives; no freely-licensed high-resolution logo available.",
      "ideology": ["Social democracy", "Progressivism"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1987,
      "inPower": true,
      "timeInPower": "2020-present",
      "seats": 20,
      "seatsTotal": 51,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "2020 Surinamese general election — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2020_Surinamese_general_election"
        },
        {
          "title": "New Front for Democracy — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/New_Front_for_Democracy"
        }
      ]
    },
    {
      "id": "SR-VHP",
      "country": "SR",
      "shortName": "VHP",
      "name": "Vooruitstrevende Hervorming Partij",
      "nameEn": "Progressive Reform Party",
      "noImageReason": "Logo search across Wikimedia Commons and Surinamese sources; no freely-licensed logo found. Party historical materials use minimal graphic branding.",
      "ideology": ["Liberalism", "Social democracy"],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1961,
      "inPower": false,
      "inExecutive": true,
      "seats": 14,
      "seatsTotal": 51,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "2020 Surinamese general election — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/2020_Surinamese_general_election"
        },
        {
          "title": "Progressive Reform Party — Wikipedia",
          "url": "https://en.wikipedia.org/wiki/Progressive_Reform_Party"
        }
      ]
    }
  ],
  "VE": [
    {
      "id": "VE-PSUV",
      "country": "VE",
      "shortName": "PSUV",
      "name": "Partido Socialista Unido de Venezuela",
      "nameEn": "United Socialist Party of Venezuela",
      "logo": "party-logos/ve/psuv.svg",
      "sha256": "61aa502492c3064645c21264e1325d2574d5411fdfecf06aacd13bd19c7a95f6",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:PSUV_2024_logo.svg",
      "ideology": [
        "Socialism of the 21st century",
        "Bolivarianism",
        "Chavismo",
        "Left-wing populism",
        "State socialism",
        "Anti-imperialism"
      ],
      "ideologyPosition": "far-left",
      "positionRaw": "Left-wing to far-left",
      "founded": 2007,
      "coalitionId": "VE-GPPSB",
      "leader": "Delcy Rodríguez",
      "leaderTitle": "Party leader",
      "inPower": true,
      "inExecutive": true,
      "timeInPower": "Governing party since 2007; Chavismo has held the presidency since 1999.",
      "seats": 219,
      "seatsTotal": 285,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Partido Socialista Unido de Venezuela — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Partido_Socialista_Unido_de_Venezuela"
        },
        {
          "title": "Asamblea Nacional de Venezuela — Wikipedia (VI Legislature, installed 5 January 2026; 285 seats: GPPSB 253 + 3 indigenous, Fracción Libertad 12, Alianza Democrática 9, Vamos Vamos Venezuela 8)",
          "url": "https://es.wikipedia.org/wiki/Asamblea_Nacional_de_Venezuela"
        },
        {
          "title": "National Assembly (Venezuela) — Wikipedia (285 seats; last elected 25 May 2025, partial international recognition)",
          "url": "https://en.wikipedia.org/wiki/National_Assembly_(Venezuela)"
        },
        {
          "title": "Delcy Rodríguez — Wikipedia (PSUV; interim president of Venezuela since 2026, after Nicolás Maduro's capture during the United States intervention)",
          "url": "https://en.wikipedia.org/wiki/Delcy_Rodr%C3%ADguez"
        },
        {
          "title": "United Socialist Party of Venezuela — Wikipedia (founded 14 March 2007; 219 of 285 National Assembly seats)",
          "url": "https://en.wikipedia.org/wiki/United_Socialist_Party_of_Venezuela"
        }
      ]
    },
    {
      "id": "VE-PPT",
      "country": "VE",
      "shortName": "PPT",
      "name": "Patria Para Todos",
      "nameEn": "Fatherland for All",
      "logo": "party-logos/ve/ppt.png",
      "sha256": "229208c0cc4232cc89e037bb829319fc5352678b10fe60b2728486cc96d21d3d",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Tarjeta_electoral_Partido_Patria_Para_Todos.png",
      "ideology": [
        "Libertarian socialism",
        "Libertarian municipalism",
        "Democratic socialism",
        "Egalitarianism",
        "Internationalism"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing",
      "founded": 1997,
      "coalitionId": "VE-GPPSB",
      "leader": "Ilenia Medina",
      "leaderTitle": "Leader",
      "inPower": true,
      "seats": 8,
      "seatsTotal": 285,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Patria Para Todos — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Patria_Para_Todos"
        },
        {
          "title": "Asamblea Nacional de Venezuela — Wikipedia (VI Legislature, installed 5 January 2026; 285 seats: GPPSB 253 + 3 indigenous, Fracción Libertad 12, Alianza Democrática 9, Vamos Vamos Venezuela 8)",
          "url": "https://es.wikipedia.org/wiki/Asamblea_Nacional_de_Venezuela"
        },
        {
          "title": "National Assembly (Venezuela) — Wikipedia (285 seats; last elected 25 May 2025, partial international recognition)",
          "url": "https://en.wikipedia.org/wiki/National_Assembly_(Venezuela)"
        }
      ]
    },
    {
      "id": "VE-MRT",
      "country": "VE",
      "shortName": "Tupamaro",
      "name": "Movimiento Revolucionario Tupamaro",
      "nameEn": "Tupamaro Revolutionary Movement",
      "logo": "party-logos/ve/tupamaro.svg",
      "sha256": "8b28492916b5e8943efb1af8afcf52c4b893893c225376cde005a2cacdb66c62",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Tupamaro.svg",
      "ideology": [
        "Communism",
        "Marxism–Leninism",
        "Guevarism",
        "Left-wing nationalism",
        "Revolutionary socialism"
      ],
      "ideologyPosition": "far-left",
      "positionRaw": "Far-left",
      "founded": 1979,
      "coalitionId": "VE-GPPSB",
      "leader": "Williams Benavides",
      "leaderTitle": "Secretary-General",
      "inPower": true,
      "seats": 7,
      "seatsTotal": 285,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Movimiento Revolucionario Tupamaro — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Tupamaro_(Venezuela)"
        },
        {
          "title": "Asamblea Nacional de Venezuela — Wikipedia (VI Legislature, installed 5 January 2026; 285 seats: GPPSB 253 + 3 indigenous, Fracción Libertad 12, Alianza Democrática 9, Vamos Vamos Venezuela 8)",
          "url": "https://es.wikipedia.org/wiki/Asamblea_Nacional_de_Venezuela"
        },
        {
          "title": "National Assembly (Venezuela) — Wikipedia (285 seats; last elected 25 May 2025, partial international recognition)",
          "url": "https://en.wikipedia.org/wiki/National_Assembly_(Venezuela)"
        }
      ]
    },
    {
      "id": "VE-MSV",
      "country": "VE",
      "shortName": "MSV",
      "name": "Movimiento Somos Venezuela",
      "nameEn": "We Are Venezuela Movement",
      "logo": "party-logos/ve/msv.png",
      "sha256": "98fd29aa312f7d63414763fd4c8e198996d9b9adcc813c3b736d1628f8a752f4",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Somosvenex.png",
      "ideology": [
        "Chavismo",
        "Socialism of the 21st century",
        "Anti-imperialism",
        "Left-wing nationalism",
        "Democratic socialism",
        "Progressivism"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing",
      "founded": 2018,
      "previousNames": [
        {
          "name": "Nuevo Camino Revolucionario",
          "nameEn": "New Revolutionary Path",
          "years": "2008–2018"
        }
      ],
      "coalitionId": "VE-GPPSB",
      "leader": "Delcy Rodríguez",
      "leaderTitle": "Leader",
      "inPower": true,
      "seats": 5,
      "seatsTotal": 285,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Movimiento Somos Venezuela — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Movimiento_Somos_Venezuela"
        },
        {
          "title": "Asamblea Nacional de Venezuela — Wikipedia (VI Legislature, installed 5 January 2026; 285 seats: GPPSB 253 + 3 indigenous, Fracción Libertad 12, Alianza Democrática 9, Vamos Vamos Venezuela 8)",
          "url": "https://es.wikipedia.org/wiki/Asamblea_Nacional_de_Venezuela"
        },
        {
          "title": "National Assembly (Venezuela) — Wikipedia (285 seats; last elected 25 May 2025, partial international recognition)",
          "url": "https://en.wikipedia.org/wiki/National_Assembly_(Venezuela)"
        }
      ]
    },
    {
      "id": "VE-PODEMOS",
      "country": "VE",
      "shortName": "PODEMOS",
      "name": "Por la Democracia Social",
      "nameEn": "For Social Democracy",
      "logo": "party-logos/ve/podemos.svg",
      "sha256": "af332ada202ae09bf2b75d1d7c6892e9699403de7867a17a576ff3cb86bc3e19",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:PODEMOS_Logo.svg",
      "ideology": [
        "Social democracy",
        "Democratic socialism",
        "Reformism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left to left-wing",
      "founded": 2002,
      "coalitionId": "VE-GPPSB",
      "leader": "Didalco Bolívar",
      "leaderTitle": "Leader",
      "inPower": true,
      "seats": 4,
      "seatsTotal": 285,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Por la Democracia Social — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Por_la_Democracia_Social"
        },
        {
          "title": "Asamblea Nacional de Venezuela — Wikipedia (VI Legislature, installed 5 January 2026; 285 seats: GPPSB 253 + 3 indigenous, Fracción Libertad 12, Alianza Democrática 9, Vamos Vamos Venezuela 8)",
          "url": "https://es.wikipedia.org/wiki/Asamblea_Nacional_de_Venezuela"
        },
        {
          "title": "National Assembly (Venezuela) — Wikipedia (285 seats; last elected 25 May 2025, partial international recognition)",
          "url": "https://en.wikipedia.org/wiki/National_Assembly_(Venezuela)"
        }
      ]
    },
    {
      "id": "VE-APC",
      "country": "VE",
      "shortName": "APC",
      "name": "Alianza para el Cambio",
      "nameEn": "Alliance for Change",
      "logo": "party-logos/ve/apc.jpg",
      "sha256": "4f77faa9d56d53588e17b764f594d9a3108df2e0e8f2958bdd7a362d15031e5e",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Alianza_para_el_cambio_logo.jpeg",
      "ideology": [
        "Social democracy",
        "Democratic socialism",
        "Chavismo",
        "Syndicalism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 2013,
      "coalitionId": "VE-GPPSB",
      "leader": "Carlos Vargas",
      "leaderTitle": "Leader",
      "inPower": true,
      "seats": 3,
      "seatsTotal": 285,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Alianza para el Cambio — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Alianza_para_el_Cambio_(Venezuela)"
        },
        {
          "title": "Asamblea Nacional de Venezuela — Wikipedia (VI Legislature, installed 5 January 2026; 285 seats: GPPSB 253 + 3 indigenous, Fracción Libertad 12, Alianza Democrática 9, Vamos Vamos Venezuela 8)",
          "url": "https://es.wikipedia.org/wiki/Asamblea_Nacional_de_Venezuela"
        },
        {
          "title": "National Assembly (Venezuela) — Wikipedia (285 seats; last elected 25 May 2025, partial international recognition)",
          "url": "https://en.wikipedia.org/wiki/National_Assembly_(Venezuela)"
        }
      ]
    },
    {
      "id": "VE-MEP",
      "country": "VE",
      "shortName": "MEP",
      "name": "Movimiento Electoral del Pueblo",
      "nameEn": "People's Electoral Movement",
      "logo": "party-logos/ve/mep.svg",
      "sha256": "a3a856aa05b9df1d9ee49918c0e7906b3ab965275d378e7bc53dfaa26a80e099",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Movimiento_Electoral_del_Pueblo.svg",
      "ideology": [
        "Socialism",
        "Left-wing populism",
        "Democratic socialism",
        "Left-wing nationalism"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing",
      "founded": 1967,
      "coalitionId": "VE-GPPSB",
      "leader": "Gilberto Giménez Prieto",
      "leaderTitle": "Leader",
      "inPower": true,
      "seats": 3,
      "seatsTotal": 285,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Movimiento Electoral del Pueblo — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Movimiento_Electoral_del_Pueblo"
        },
        {
          "title": "Asamblea Nacional de Venezuela — Wikipedia (VI Legislature, installed 5 January 2026; 285 seats: GPPSB 253 + 3 indigenous, Fracción Libertad 12, Alianza Democrática 9, Vamos Vamos Venezuela 8)",
          "url": "https://es.wikipedia.org/wiki/Asamblea_Nacional_de_Venezuela"
        },
        {
          "title": "National Assembly (Venezuela) — Wikipedia (285 seats; last elected 25 May 2025, partial international recognition)",
          "url": "https://en.wikipedia.org/wiki/National_Assembly_(Venezuela)"
        }
      ]
    },
    {
      "id": "VE-ORA",
      "country": "VE",
      "shortName": "ORA",
      "name": "Organización Renovadora Auténtica",
      "nameEn": "Authentic Renewal Organisation",
      "logo": "party-logos/ve/ora.jpg",
      "sha256": "5afe32904b634bbf9df2414fe33e6832ee41b226d9c68f55adbf656545ec50e3",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo-partido-organizacion-renovadora-autentica.jpg",
      "ideology": [
        "Christianity",
        "Evangelicalism",
        "Social conservatism",
        "Pentecostalism",
        "Christian socialism"
      ],
      "ideologyPosition": "other",
      "positionRaw": "Syncretic",
      "founded": 1988,
      "coalitionId": "VE-GPPSB",
      "leader": "Roque Luis Reyes",
      "leaderTitle": "Leader",
      "inPower": true,
      "seats": 2,
      "seatsTotal": 285,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Organización Renovadora Auténtica — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Organizaci%C3%B3n_Renovadora_Aut%C3%A9ntica"
        },
        {
          "title": "Asamblea Nacional de Venezuela — Wikipedia (VI Legislature, installed 5 January 2026; 285 seats: GPPSB 253 + 3 indigenous, Fracción Libertad 12, Alianza Democrática 9, Vamos Vamos Venezuela 8)",
          "url": "https://es.wikipedia.org/wiki/Asamblea_Nacional_de_Venezuela"
        },
        {
          "title": "National Assembly (Venezuela) — Wikipedia (285 seats; last elected 25 May 2025, partial international recognition)",
          "url": "https://en.wikipedia.org/wiki/National_Assembly_(Venezuela)"
        }
      ]
    },
    {
      "id": "VE-UPV",
      "country": "VE",
      "shortName": "UPV",
      "name": "Unidad Popular Venezolana",
      "nameEn": "Venezuelan Popular Unity",
      "logo": "party-logos/ve/upv.svg",
      "sha256": "46085dae3b2eae9ad8868301a1f13a1a58fbc0621be4eefc02b2dc611e282891",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Unidad_Popular_Venezolana.svg",
      "ideology": [
        "Socialism",
        "Bolivarianism",
        "Chavismo",
        "Anti-imperialism"
      ],
      "ideologyPosition": "left",
      "positionRaw": "Left-wing",
      "founded": 2004,
      "coalitionId": "VE-GPPSB",
      "inPower": true,
      "seats": 2,
      "seatsTotal": 285,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Unidad Popular Venezolana — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Unidad_Popular_Venezolana"
        },
        {
          "title": "Asamblea Nacional de Venezuela — Wikipedia (VI Legislature, installed 5 January 2026; 285 seats: GPPSB 253 + 3 indigenous, Fracción Libertad 12, Alianza Democrática 9, Vamos Vamos Venezuela 8)",
          "url": "https://es.wikipedia.org/wiki/Asamblea_Nacional_de_Venezuela"
        },
        {
          "title": "National Assembly (Venezuela) — Wikipedia (285 seats; last elected 25 May 2025, partial international recognition)",
          "url": "https://en.wikipedia.org/wiki/National_Assembly_(Venezuela)"
        }
      ]
    },
    {
      "id": "VE-UNT",
      "country": "VE",
      "shortName": "UNT",
      "name": "Un Nuevo Tiempo",
      "nameEn": "A New Era",
      "logo": "party-logos/ve/unt.png",
      "sha256": "6725c80c0913725d8e91d13cd37460ee248e75731d9b18abc28df75e5bc29461",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Un_Nuevo_Tiempo_logo.png",
      "ideology": [
        "Social democracy",
        "Reformism",
        "Democratic socialism",
        "Keynesianism",
        "Third Way",
        "Regionalism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre to centre-left",
      "founded": 1999,
      "leader": "Manuel Rosales",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 7,
      "seatsTotal": 285,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Un Nuevo Tiempo — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Un_Nuevo_Tiempo"
        },
        {
          "title": "Asamblea Nacional de Venezuela — Wikipedia (VI Legislature, installed 5 January 2026; 285 seats: GPPSB 253 + 3 indigenous, Fracción Libertad 12, Alianza Democrática 9, Vamos Vamos Venezuela 8)",
          "url": "https://es.wikipedia.org/wiki/Asamblea_Nacional_de_Venezuela"
        },
        {
          "title": "National Assembly (Venezuela) — Wikipedia (285 seats; last elected 25 May 2025, partial international recognition)",
          "url": "https://en.wikipedia.org/wiki/National_Assembly_(Venezuela)"
        }
      ]
    },
    {
      "id": "VE-UNICA",
      "country": "VE",
      "shortName": "UNICA",
      "name": "Unión y Cambio",
      "nameEn": "Union and Change",
      "logo": "party-logos/ve/unica.jpg",
      "sha256": "f2c08bc5c16002b5d013d800ac44ff6380402028c6c52af660dc5b213df1031a",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:GqRp6FJXgAA6TRL.jpg",
      "ideology": [
        "Progressivism",
        "Humanism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre to centre-left",
      "founded": 2025,
      "leader": "Henrique Capriles",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 4,
      "seatsTotal": 285,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Unión y Cambio — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Uni%C3%B3n_y_Cambio"
        },
        {
          "title": "Asamblea Nacional de Venezuela — Wikipedia (VI Legislature, installed 5 January 2026; 285 seats: GPPSB 253 + 3 indigenous, Fracción Libertad 12, Alianza Democrática 9, Vamos Vamos Venezuela 8)",
          "url": "https://es.wikipedia.org/wiki/Asamblea_Nacional_de_Venezuela"
        },
        {
          "title": "National Assembly (Venezuela) — Wikipedia (285 seats; last elected 25 May 2025, partial international recognition)",
          "url": "https://en.wikipedia.org/wiki/National_Assembly_(Venezuela)"
        }
      ]
    },
    {
      "id": "VE-LAPIZ",
      "country": "VE",
      "shortName": "LÁPIZ",
      "name": "Alianza del Lápiz",
      "nameEn": "Pencil Alliance",
      "logo": "party-logos/ve/lapiz.svg",
      "sha256": "d0c122726cf5befcf903dd6d4cc431918c3a30022b8d3a145f38fdfa776f395e",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Alianza_del_L%C3%A1piz.svg",
      "ideology": [
        "Patriotism",
        "Ordoliberalism",
        "Anti-Chavismo"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 2017,
      "leader": "Antonio Ecarri",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 285,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Alianza del Lápiz — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Alianza_del_L%C3%A1piz"
        },
        {
          "title": "Asamblea Nacional de Venezuela — Wikipedia (VI Legislature, installed 5 January 2026; 285 seats: GPPSB 253 + 3 indigenous, Fracción Libertad 12, Alianza Democrática 9, Vamos Vamos Venezuela 8)",
          "url": "https://es.wikipedia.org/wiki/Asamblea_Nacional_de_Venezuela"
        },
        {
          "title": "National Assembly (Venezuela) — Wikipedia (285 seats; last elected 25 May 2025, partial international recognition)",
          "url": "https://en.wikipedia.org/wiki/National_Assembly_(Venezuela)"
        }
      ]
    },
    {
      "id": "VE-AD",
      "country": "VE",
      "shortName": "AD",
      "name": "Acción Democrática",
      "nameEn": "Democratic Action",
      "logo": "party-logos/ve/ad.svg",
      "sha256": "95fb7a4c6ce5beb8581c916d3621eb0d05663da5506fe5e0e4df54d897dd5208",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Acci%C3%B3n_Democr%C3%A1tica.svg",
      "ideology": [
        "Social democracy"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 1941,
      "coalitionId": "VE-AD-ALLIANCE",
      "leader": "Isabel Carmona de Serra",
      "leaderTitle": "President",
      "inPower": false,
      "seats": 3,
      "seatsTotal": 285,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Acción Democrática — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Acci%C3%B3n_Democr%C3%A1tica"
        },
        {
          "title": "Asamblea Nacional de Venezuela — Wikipedia (VI Legislature, installed 5 January 2026; 285 seats: GPPSB 253 + 3 indigenous, Fracción Libertad 12, Alianza Democrática 9, Vamos Vamos Venezuela 8)",
          "url": "https://es.wikipedia.org/wiki/Asamblea_Nacional_de_Venezuela"
        },
        {
          "title": "National Assembly (Venezuela) — Wikipedia (285 seats; last elected 25 May 2025, partial international recognition)",
          "url": "https://en.wikipedia.org/wiki/National_Assembly_(Venezuela)"
        }
      ]
    },
    {
      "id": "VE-PV",
      "country": "VE",
      "shortName": "PV",
      "name": "Primero Venezuela",
      "nameEn": "Venezuela First",
      "logo": "party-logos/ve/pv.svg",
      "sha256": "e14a9260e1e81cc75a1eeb0828d97ca09d63e24ca0bd0dfd8919eda58301cd89",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Primero_Venezuela.svg",
      "ideology": [
        "Humanism",
        "Progressivism",
        "Liberal democracy"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 2018,
      "previousNames": [
        {
          "name": "Acción Ciudadana en Positivo",
          "nameEn": "Positive Citizen Action",
          "years": "2018–2020"
        }
      ],
      "coalitionId": "VE-AD-ALLIANCE",
      "leader": "Génesis Sabrina Ramírez",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 285,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Primero Venezuela — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Primero_Venezuela"
        },
        {
          "title": "Asamblea Nacional de Venezuela — Wikipedia (VI Legislature, installed 5 January 2026; 285 seats: GPPSB 253 + 3 indigenous, Fracción Libertad 12, Alianza Democrática 9, Vamos Vamos Venezuela 8)",
          "url": "https://es.wikipedia.org/wiki/Asamblea_Nacional_de_Venezuela"
        },
        {
          "title": "National Assembly (Venezuela) — Wikipedia (285 seats; last elected 25 May 2025, partial international recognition)",
          "url": "https://en.wikipedia.org/wiki/National_Assembly_(Venezuela)"
        }
      ]
    },
    {
      "id": "VE-PJ",
      "country": "VE",
      "shortName": "PJ",
      "name": "Primero Justicia",
      "nameEn": "Justice First",
      "logo": "party-logos/ve/pj.svg",
      "sha256": "0254a6ca9857a135517479d37c9af250ff3ca280c79272f4721cafa0cb3c2d88",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Emblema_Primero_Justicia.svg",
      "ideology": [
        "Humanism",
        "Conservatism",
        "Economic liberalism",
        "Decentralisation"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre to centre-right",
      "founded": 2000,
      "coalitionId": "VE-AD-ALLIANCE",
      "leader": "Juan Pablo Guanipa",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 285,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Primero Justicia — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Primero_Justicia"
        },
        {
          "title": "Asamblea Nacional de Venezuela — Wikipedia (VI Legislature, installed 5 January 2026; 285 seats: GPPSB 253 + 3 indigenous, Fracción Libertad 12, Alianza Democrática 9, Vamos Vamos Venezuela 8)",
          "url": "https://es.wikipedia.org/wiki/Asamblea_Nacional_de_Venezuela"
        },
        {
          "title": "National Assembly (Venezuela) — Wikipedia (285 seats; last elected 25 May 2025, partial international recognition)",
          "url": "https://en.wikipedia.org/wiki/National_Assembly_(Venezuela)"
        }
      ]
    },
    {
      "id": "VE-CMC",
      "country": "VE",
      "shortName": "CMC",
      "name": "Cambiemos Movimiento Ciudadano",
      "nameEn": "Let's Change Citizens' Movement",
      "logo": "party-logos/ve/cmc.svg",
      "sha256": "db59a64d3289ef7711f7e82d040637257e75870722e1e798132486fdccceef8b",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Cambiemos.svg",
      "ideology": [
        "Progressivism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 2018,
      "coalitionId": "VE-AD-ALLIANCE",
      "leader": "Timoteo Zambrano",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 285,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Cambiemos Movimiento Ciudadano — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Cambiemos_Movimiento_Ciudadano"
        },
        {
          "title": "Asamblea Nacional de Venezuela — Wikipedia (VI Legislature, installed 5 January 2026; 285 seats: GPPSB 253 + 3 indigenous, Fracción Libertad 12, Alianza Democrática 9, Vamos Vamos Venezuela 8)",
          "url": "https://es.wikipedia.org/wiki/Asamblea_Nacional_de_Venezuela"
        },
        {
          "title": "National Assembly (Venezuela) — Wikipedia (285 seats; last elected 25 May 2025, partial international recognition)",
          "url": "https://en.wikipedia.org/wiki/National_Assembly_(Venezuela)"
        }
      ]
    },
    {
      "id": "VE-CAMBIO",
      "country": "VE",
      "shortName": "El Cambio",
      "name": "Esperanza por El Cambio",
      "nameEn": "Hope for Change",
      "logo": "party-logos/ve/elcambio.svg",
      "sha256": "563e60718ca255b41c5f9f05b961072608a642dbcac9b85dddcd48edf7bcfdb2",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Logo_Partido_El_Cambio_(2021).svg",
      "ideology": [
        "Christian democracy",
        "Centrism",
        "Christian humanism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre",
      "founded": 2018,
      "coalitionId": "VE-AD-ALLIANCE",
      "leader": "Javier Bertucci",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 285,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Esperanza por El Cambio — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Esperanza_por_El_Cambio"
        },
        {
          "title": "Asamblea Nacional de Venezuela — Wikipedia (VI Legislature, installed 5 January 2026; 285 seats: GPPSB 253 + 3 indigenous, Fracción Libertad 12, Alianza Democrática 9, Vamos Vamos Venezuela 8)",
          "url": "https://es.wikipedia.org/wiki/Asamblea_Nacional_de_Venezuela"
        },
        {
          "title": "National Assembly (Venezuela) — Wikipedia (285 seats; last elected 25 May 2025, partial international recognition)",
          "url": "https://en.wikipedia.org/wiki/National_Assembly_(Venezuela)"
        }
      ]
    },
    {
      "id": "VE-AP",
      "country": "VE",
      "shortName": "AP",
      "name": "Avanzada Progresista",
      "nameEn": "Progressive Advance",
      "logo": "party-logos/ve/ap.svg",
      "sha256": "413c30f258bf3167751fe21bc0ee17adb0183669d0082fff46d66a6453797014",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Avanzada_Progresista.svg",
      "ideology": [
        "Progressivism",
        "Social democracy",
        "Latin Americanism",
        "Non-interventionism"
      ],
      "ideologyPosition": "centre-left",
      "positionRaw": "Centre-left",
      "founded": 2012,
      "coalitionId": "VE-AD-ALLIANCE",
      "leader": "Eduardo Semtei",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 285,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Avanzada Progresista — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Avanzada_Progresista"
        },
        {
          "title": "Asamblea Nacional de Venezuela — Wikipedia (VI Legislature, installed 5 January 2026; 285 seats: GPPSB 253 + 3 indigenous, Fracción Libertad 12, Alianza Democrática 9, Vamos Vamos Venezuela 8)",
          "url": "https://es.wikipedia.org/wiki/Asamblea_Nacional_de_Venezuela"
        },
        {
          "title": "National Assembly (Venezuela) — Wikipedia (285 seats; last elected 25 May 2025, partial international recognition)",
          "url": "https://en.wikipedia.org/wiki/National_Assembly_(Venezuela)"
        }
      ]
    },
    {
      "id": "VE-COPEI",
      "country": "VE",
      "shortName": "Copei",
      "name": "Copei",
      "nameEn": "Christian Democratic Party of Venezuela",
      "logo": "party-logos/ve/copei.svg",
      "sha256": "709b2b947e5fb6b4a86ea5f2f6a96d2e1a54c99e6cebc54782bca4ba7e905da5",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:COPEILogo.svg",
      "ideology": [
        "Christian democracy",
        "Catholic social teaching",
        "Christian humanism",
        "Christian liberalism",
        "Anti-Chavismo"
      ],
      "ideologyPosition": "centre-right",
      "positionRaw": "Centre-right to right-wing",
      "founded": 1946,
      "coalitionId": "VE-AD-ALLIANCE",
      "leader": "Roberto Enríquez",
      "leaderTitle": "President",
      "inPower": false,
      "seats": 1,
      "seatsTotal": 285,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Copei — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Copei"
        },
        {
          "title": "Asamblea Nacional de Venezuela — Wikipedia (VI Legislature, installed 5 January 2026; 285 seats: GPPSB 253 + 3 indigenous, Fracción Libertad 12, Alianza Democrática 9, Vamos Vamos Venezuela 8)",
          "url": "https://es.wikipedia.org/wiki/Asamblea_Nacional_de_Venezuela"
        },
        {
          "title": "National Assembly (Venezuela) — Wikipedia (285 seats; last elected 25 May 2025, partial international recognition)",
          "url": "https://en.wikipedia.org/wiki/National_Assembly_(Venezuela)"
        }
      ]
    },
    {
      "id": "VE-FV",
      "country": "VE",
      "shortName": "FV",
      "name": "Fuerza Vecinal",
      "nameEn": "Neighborhood Force",
      "logo": "party-logos/ve/fv.svg",
      "sha256": "c9e53da0099bf0d633aba95a3608bc9121271e224911591c09aec41676cc8f57",
      "logoSourceUrl": "https://commons.wikimedia.org/wiki/File:Fuerza_Vecinal.svg",
      "ideology": [
        "Big tent",
        "Localism",
        "Progressivism",
        "Municipalism"
      ],
      "ideologyPosition": "centre",
      "positionRaw": "Centre to centre-right",
      "founded": 2021,
      "leader": "Gustavo Duque",
      "leaderTitle": "Leader",
      "inPower": false,
      "seats": 3,
      "seatsTotal": 285,
      "chamberName": "National Assembly",
      "sources": [
        {
          "title": "Fuerza Vecinal — Wikipedia (es): ideology, political position, founding year and leadership",
          "url": "https://es.wikipedia.org/wiki/Fuerza_Vecinal"
        },
        {
          "title": "Asamblea Nacional de Venezuela — Wikipedia (VI Legislature, installed 5 January 2026; 285 seats: GPPSB 253 + 3 indigenous, Fracción Libertad 12, Alianza Democrática 9, Vamos Vamos Venezuela 8)",
          "url": "https://es.wikipedia.org/wiki/Asamblea_Nacional_de_Venezuela"
        },
        {
          "title": "National Assembly (Venezuela) — Wikipedia (285 seats; last elected 25 May 2025, partial international recognition)",
          "url": "https://en.wikipedia.org/wiki/National_Assembly_(Venezuela)"
        }
      ]
    }
  ],
};
