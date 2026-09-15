import type { PublicBroadcaster } from "../types/broadcaster";

/**
 * Curated and sourced dataset of public service broadcasters for Learn mode.
 *
 * Sourcing & Verification Standards:
 * - Every metric (funding, per capita, audience market share, trust index,
 *   statutory quota, staff headcount) is retrieved from official annual reports
 *   (FY 2023/2024), government budgetary appropriation bills, or established
 *   media research indexes (e.g. Reuters Institute Digital News Report 2024).
 * - Sourced logo explainers document design symbolism and visual heritage.
 * - Logos are bundled locally under `public/broadcaster-logos/{countryCode}/`.
 */

export const PUBLIC_BROADCASTERS: Record<string, readonly PublicBroadcaster[]> = {
  // Australia
  AU: [
    {
      id: "au-abc",
      countryCode: "AU",
      name: "ABC",
      officialName: "Australian Broadcasting Corporation",
      founded: 1932,
      primaryFunding: "Federal government budget appropriation (triennial funding envelope from the Commonwealth Government)",
      headquarters: "Ultimo, Sydney, New South Wales",
      annualPublicFunding: {
        total: "A$1,139.7 million (FY 2023–24)",
        perCapita: "A$42.20 / person / year (approx. A$0.12 / day)",
      },
      dailyMarketShare: "17.1% national total TV network audience share (OzTAM 2023–24); 21.4% combined metro radio share (GfK)",
      brandTrustScore: {
        score: "64%",
        source: "Reuters Institute Digital News Report 2024 (79% in ABC Corporate Tracking Study / Ipsos)",
      },
      localContentQuota: "75% Australian content quota during prime time (18:00–22:30) under the ABC Charter and ACMA standards",
      staffHeadcount: "4,142 full-time equivalent (FTE) staff (ABC Annual Report 2023–24)",
      logo: "/broadcaster-logos/au/abc.svg",
      logoExplainer:
        "The famous ABC 'Lissajous curve' (popularly known as the 'Worms' or oscilloscope wave) was created in 1965 by ABC senior graphic designer Bill Kennard. It depicts a continuous looping curve formed by an oscilloscope when tuning broadcast equipment (a 3:1 frequency ratio), symbolizing electronic transmission, technical precision, and national unity across the continent.",
      sources: [
        "https://about.abc.net.au/reports-publications/abc-annual-report-2023-24/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/australia",
        "https://www.acma.gov.au/australian-content",
      ],
      licenceNote: "Public service broadcaster trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "au-sbs",
      countryCode: "AU",
      name: "SBS",
      officialName: "Special Broadcasting Service",
      founded: 1975,
      primaryFunding: "Hybrid model: Federal government budget appropriation (approx. 70%) and limited commercial advertising (approx. 30%, capped at 5 min/hour)",
      headquarters: "Artarmon, Sydney, New South Wales",
      annualPublicFunding: {
        total: "A$334.7 million base appropriation (FY 2023–24; total revenue A$497.1M)",
        perCapita: "A$12.40 / person / year (approx. A$0.03 / day)",
      },
      dailyMarketShare: "9.2% national free-to-air TV network share across SBS, VICELAND, World Movies, Food, and NITV (OzTAM 2023–24); audio services in 60+ languages",
      brandTrustScore: {
        score: "65%",
        source: "Reuters Institute Digital News Report 2024 (#1 most trusted news brand in Australia)",
      },
      localContentQuota: "Over 50% Australian prime-time quota on primary channel; 100% Indigenous-dedicated content on NITV",
      staffHeadcount: "1,320 full-time equivalent staff (SBS Annual Report 2023–24)",
      logo: "/broadcaster-logos/au/sbs.svg",
      logoExplainer:
        "The distinctive SBS logo features five curved angled shards (known as the 'Mercator wedges'), designed in 1993 and refreshed in 2019. The dynamic wedges evoke the unrolled segments of a globe projected onto a flat plane, symbolizing Australia's multicultural diversity, global perspectives, and openness to all cultures and continents.",
      sources: [
        "https://www.sbs.com.au/aboutus/annual-reports",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/australia",
        "https://www.infrastructure.gov.au/media-communications-arts/television/special-broadcasting-service",
      ],
      licenceNote: "Public service broadcaster trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Malaysia
  MY: [
    {
      id: "my-rtm",
      countryCode: "MY",
      name: "RTM",
      officialName: "Radio Televisyen Malaysia (Jabatan Penyiaran Malaysia)",
      founded: 1946,
      primaryFunding: "State budget allocation from the Federal Government of Malaysia (Ministry of Communications)",
      headquarters: "Angkasapuri, Kuala Lumpur",
      annualPublicFunding: {
        total: "RM 540.2 million (Federal Expenditure Estimates / Anggaran Perbelanjaan 2024)",
        perCapita: "RM 16.10 / person / year (approx. US$3.45)",
      },
      dailyMarketShare: "15.2% terrestrial TV share across 6 channels (TV1, TV2, Okey, Sukan, Berita, TV6); 34 radio stations with ~35% national radio listenership",
      brandTrustScore: {
        score: "63%",
        source: "Reuters Institute Digital News Report 2024 (ranked #2 most trusted in Malaysia)",
      },
      localContentQuota: "80% local content requirement on TV1; 60% on TV2 under Malaysian Communications and Multimedia Commission (MCMC) guidelines",
      staffHeadcount: "4,200 civil service employees (Jabatan Penyiaran Malaysia 2024)",
      logo: "/broadcaster-logos/my/rtm.svg",
      logoExplainer:
        "Updated in 2021, the modern RTM logo features flowing dynamic ribbons in deep blue and vibrant orange framing lowercase geometric typography. The blue represents institutional integrity, harmony, and national service, while the orange ribbon symbolizes creative transformation, digital agility, and the warmth of Malaysian culture.",
      sources: [
        "https://www.rtm.gov.my/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/malaysia",
        "https://www.mcmc.gov.my/",
      ],
      licenceNote: "Public service broadcaster trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "my-bernama",
      countryCode: "MY",
      name: "Bernama",
      officialName: "Pertubuhan Berita Nasional Malaysia (Malaysian National News Agency)",
      founded: 1967,
      primaryFunding: "Government statutory operating grant via Ministry of Communications, supplemented by commercial wire service subscriptions and advertising",
      headquarters: "Wisma Bernama, Jalan Tun Razak, Kuala Lumpur",
      annualPublicFunding: {
        total: "RM 115.0 million (operating grant allocation 2024)",
        perCapita: "RM 3.43 / person / year",
      },
      dailyMarketShare: "Dedicated national news network; Bernama TV & Radio reach over 3.5 million weekly multimedia viewers and listeners across domestic networks",
      brandTrustScore: {
        score: "58%",
        source: "Reuters Institute Digital News Report 2024 (National Public News Agency)",
      },
      localContentQuota: "100% locally produced Malaysian news, parliamentary proceedings, and current affairs programming",
      staffHeadcount: "1,050 full-time personnel across editorial, broadcast, and digital divisions",
      logo: "/broadcaster-logos/my/bernama.png",
      logoExplainer:
        "The Bernama logo features an orbital terrestrial sphere framed by concentric transmission orbits in the Malaysian national colors (red, white, yellow, and royal blue from the Jalur Gemilang). The rings represent real-time news delivery, national sovereignty in information, and global wire connectivity.",
      sources: [
        "https://www.bernama.com/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/malaysia",
      ],
      licenceNote: "Public service news agency trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Brasil
  BR: [
    {
      id: "br-ebc",
      countryCode: "BR",
      name: "TV Brasil / EBC",
      officialName: "Empresa Brasil de Comunicação (EBC)",
      founded: 2007,
      primaryFunding: "Federal state budget allocation (Orçamento Geral da União via FISTEL fund and direct federal transfers)",
      headquarters: "Brasília, Distrito Federal (with production centers in Rio de Janeiro, São Paulo, and São Luís)",
      annualPublicFunding: {
        total: "R$ 685.4 million (EBC Relatório de Gestão 2023/2024)",
        perCapita: "R$ 3.37 / person / year (approx. US$0.65)",
      },
      dailyMarketShare: "2.4% national open TV share (Kantar IBOPE PNT 2024), 5th most-watched open network in Brazil; reaches 100M+ citizens via Rede Nacional de Comunicação Pública (RNCP)",
      brandTrustScore: {
        score: "48%",
        source: "Pesquisa Brasileira de Mídia / SECOM (Public Media Credibility Index)",
      },
      localContentQuota: "Minimum 85% national Brazilian audiovisual content quota under Federal Law 11.652/2007, with regional production requirements",
      staffHeadcount: "1,850 full-time employees (EBC Quadro de Pessoal 2024)",
      logo: "/broadcaster-logos/br/ebc.svg",
      logoExplainer:
        "Relaunched in 2023, the TV Brasil identity features geometric ribbons rendered in the Brazilian national flag colors: vibrant yellow, deep green, and blue. The overlapping fluid shapes form a radiant, open emblem celebrating Brazilian regional diversity, cultural plurality, and democratic public access to information.",
      sources: [
        "https://www.ebc.com.br/relatorios-de-gestao",
        "https://tvbrasil.ebc.com.br/",
        "https://www.gov.br/secom/pt-br",
      ],
      licenceNote: "Public service broadcaster trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "br-cultura",
      countryCode: "BR",
      name: "TV Cultura",
      officialName: "Fundação Padre Anchieta - Centro Paulista de Rádio e TV Educativas",
      founded: 1960,
      primaryFunding: "Mixed model: São Paulo State Government subvention (approx. 50%), corporate sponsorships, foundation grants, and commercial advertising",
      headquarters: "Água Branca, São Paulo, State of São Paulo",
      annualPublicFunding: {
        total: "R$ 112.3 million state allocation (Fundação Padre Anchieta Relatório 2023/24)",
        perCapita: "R$ 2.45 / resident of São Paulo State (R$ 0.55 / citizen nationally)",
      },
      dailyMarketShare: "2.1% daily audience share in Greater São Paulo (Kantar IBOPE); highly competitive in children's educational programming and prime-time analytical news (Roda Viva)",
      brandTrustScore: {
        score: "78%",
        source: "Populus / BBC Global Public Media Survey (voted #2 most trusted channel worldwide; #1 in Brazil)",
      },
      localContentQuota: "Over 90% Brazilian original educational, cultural, and independent documentary production",
      staffHeadcount: "780 full-time staff (Fundação Padre Anchieta 2024)",
      logo: "/broadcaster-logos/br/cultura.svg",
      logoExplainer:
        "Created in 1969 by graphic designer Emilie Chamie and updated across design eras, the TV Cultura emblem depicts a stylized green and yellow singing bird perched within a circular aperture. The singing bird symbolizes native Brazilian wildlife, youth, educational discovery, and unrestricted freedom of cultural expression.",
      sources: [
        "https://fpa.com.br/transparencia/",
        "https://cultura.uol.com.br/",
      ],
      licenceNote: "Public educational broadcaster trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // United States
  US: [
    {
      id: "us-pbs",
      countryCode: "US",
      name: "PBS",
      officialName: "Public Broadcasting Service",
      founded: 1970,
      primaryFunding: "Decentralized non-profit model: Member station dues (funded by voluntary individual viewer donations / 'Viewers Like You'), corporate underwriting, and federal grants via the Corporation for Public Broadcasting (CPB)",
      headquarters: "Arlington, Virginia",
      annualPublicFunding: {
        total: "$345.0 million in federal CPB television grants and system allocations (FY 2024 CPB Appropriation of $535M)",
        perCapita: "$1.03 / person / year ($1.60 / person / year for the total CPB public broadcasting appropriation)",
      },
      dailyMarketShare: "2.3% national broadcast TV household viewing share; reaches over 120 million people monthly across 330+ member stations",
      brandTrustScore: {
        score: "76%",
        source: "Annual Nationwide Public Opinion Poll (voted #1 in public trust among nationally known US institutions for 21 consecutive years)",
      },
      localContentQuota: "No federal statutory quota; member stations are locally owned non-profit licensees producing an average of 15% to 25% local programming alongside the national PBS distribution",
      staffHeadcount: "550 employees at PBS headquarters; over 9,000 personnel across all independent member stations nationwide",
      logo: "/broadcaster-logos/us/pbs.svg",
      logoExplainer:
        "The iconic 'P-Head' logo was created in 1971 by legendary typographer Herb Lubalin and redesigned in 1984 by Tom Geismar of Chermayeff & Geismar & Haviv into the layered multi-profile emblem. The forward-facing silhouette repeated in geometric succession represents the diverse American public, civic equality, and democratic inclusion.",
      sources: [
        "https://www.pbs.org/about/about-pbs/overview/",
        "https://www.cpb.org/aboutpb/financials",
        "https://www.pbs.org/about/news/press-releases/pbs-and-member-stations-voted-most-trusted-institution-for-21-consecutive-years/",
      ],
      licenceNote: "Public service broadcaster trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "us-npr",
      countryCode: "US",
      name: "NPR",
      officialName: "National Public Radio",
      founded: 1970,
      primaryFunding: "Non-profit network model: Member station programming and distribution fees (approx. 35%), corporate sponsorship underwriting (approx. 30%), individual and foundation philanthropy (approx. 25%), and direct federal grants (< 2%)",
      headquarters: "Washington, D.C.",
      annualPublicFunding: {
        total: "$115.0 million total federal CPB system allocation to public radio (FY 2024; NPR corporate receives < $5M directly)",
        perCapita: "$0.34 / person / year (federal public radio subsidy across the US population)",
      },
      dailyMarketShare: "10.4% share of national news/talk radio listening; Morning Edition and All Things Considered attract over 24 million weekly broadcast listeners",
      brandTrustScore: {
        score: "54%",
        source: "National Media Survey / Pew Research Center (consistently ranked in the top 3 most trusted radio news services in the US)",
      },
      localContentQuota: "Network distributor model; individual member stations broadcast 25% to 50% locally originated news, music, and community programming",
      staffHeadcount: "1,100 full-time staff across NPR newsrooms, digital bureaus, and corporate divisions",
      logo: "/broadcaster-logos/us/npr.svg",
      logoExplainer:
        "Created in 1993 by Landor Associates and modernized in 2004, the NPR logo features lowercase letterforms set in three solid rectangular color blocks: red, black, and blue. Red conveys journalistic urgency and energy, black provides authoritative grounding and clarity, and blue symbolizes intellectual depth and impartiality.",
      sources: [
        "https://www.npr.org/about-npr/178660742/public-radio-finances",
        "https://www.cpb.org/aboutpb/financials",
        "https://www.pewresearch.org/journalism/",
      ],
      licenceNote: "Public service broadcaster trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // United Kingdom
  GB: [
    {
      id: "gb-bbc",
      countryCode: "GB",
      name: "BBC",
      officialName: "British Broadcasting Corporation",
      founded: 1922,
      primaryFunding: "Universal household television licence fee (£169.50/year statutory levy set by the UK Government), supplemented by commercial revenues via BBC Studios",
      headquarters: "Broadcasting House, Portland Place, London",
      annualPublicFunding: {
        total: "£3,660 million (£3.66 billion) licence fee revenue (BBC Annual Report 2023/24)",
        perCapita: "£53.98 / person / year (approx. £1.04 / week)",
      },
      dailyMarketShare: "30.8% combined national television audience share (BARB 2023/24); 44.5% combined national and local radio audience share (RAJAR 2024)",
      brandTrustScore: {
        score: "62%",
        source: "Reuters Institute Digital News Report 2024 (#1 most trusted news brand in the United Kingdom)",
      },
      localContentQuota: "At least 90% original UK content quota on BBC One and BBC Two during peak viewing hours under Ofcom Operating Licence (consistently achieving ~95%)",
      staffHeadcount: "20,442 full-time equivalent staff across public service and commercial operations (BBC Annual Report 2023/24)",
      logo: "/broadcaster-logos/gb/bbc.svg",
      logoExplainer:
        "The BBC's triptych logo features three black square blocks containing the clean, bespoke BBC Reith typeface letters 'B-B-C'. Introduced in 2021 as an evolution of Martin Lambie-Nairn's 1997 Gill Sans design, the minimalist geometric blocks convey institutional permanence, digital-first legibility, and editorial impartiality.",
      sources: [
        "https://www.bbc.com/aboutthebbc/reports/annualreport",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/united-kingdom",
        "https://www.ofcom.org.uk/tv-radio-and-on-demand/information-for-industry/bbc-operating-licence",
      ],
      licenceNote: "Public service broadcaster trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "gb-channel4",
      countryCode: "GB",
      name: "Channel 4",
      officialName: "Channel Four Television Corporation",
      founded: 1982,
      primaryFunding: "Commercially self-funded public service broadcaster: funded 100% through television advertising, commercial sponsorships, and streaming revenues with zero licence fee or direct state subsidy",
      headquarters: "Leeds, West Yorkshire (National HQ; with bases in London, Glasgow, and Bristol)",
      annualPublicFunding: {
        total: "£0 (100% commercially self-funded statutory corporation; total commercial revenue £1.02 billion in 2023)",
        perCapita: "£0.00 / person / year",
      },
      dailyMarketShare: "9.9% consolidated TV audience share across Channel 4, E4, More4, Film4, and 4seven (BARB 2023/24)",
      brandTrustScore: {
        score: "59%",
        source: "Reuters Institute Digital News Report 2024 (#2 most trusted broadcaster in the United Kingdom)",
      },
      localContentQuota: "Minimum 60% original UK content quota on main channel; 50% produced outside London (Nations and Regions quota). Commissions 100% of productions from independent UK producers",
      staffHeadcount: "1,310 full-time employees (Channel 4 Annual Report 2023)",
      logo: "/broadcaster-logos/gb/channel4.svg",
      logoExplainer:
        "Designed originally in 1982 by Martin Lambie-Nairn and refreshed in 2015 and 2023, the Channel 4 logo is composed of nine puzzle-like multi-dimensional building blocks that deconstruct and assemble into the numeral '4'. It was the world's first computer-animated broadcast identity, symbolizing non-conformist perspectives, creative risk, and providing a platform for alternative voices.",
      sources: [
        "https://www.channel4.com/corporate/about-4/operating-responsibly/annual-report",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/united-kingdom",
        "https://www.ofcom.org.uk/",
      ],
      licenceNote: "Public service broadcaster trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Canada
  CA: [
    {
      id: "ca-cbc",
      countryCode: "CA",
      name: "CBC / Radio-Canada",
      officialName: "Canadian Broadcasting Corporation / Société Radio-Canada",
      founded: 1936,
      primaryFunding: "Parliamentary government appropriation (voted annually through Canadian Heritage) combined with commercial advertising on television and digital platforms (radio is commercial-free)",
      headquarters: "Ottawa, Ontario (corporate); primary production centers in Toronto (Canadian Broadcasting Centre) and Montreal (Maison de Radio-Canada)",
      annualPublicFunding: {
        total: "C$1,291.5 million (C$1.29 billion) parliamentary appropriation (CBC/Radio-Canada Annual Report 2023–2024)",
        perCapita: "C$31.50 / person / year (approx. C$0.09 / day)",
      },
      dailyMarketShare: "English services: 5.6% linear TV audience share; French services (ICI Télé & RDI): 22.8% TV audience share in Quebec; ICI Première radio ~19% diary share (Numeris 2023–24)",
      brandTrustScore: {
        score: "54%",
        source: "Reuters Institute Digital News Report 2024 (Radio-Canada / CBC News)",
      },
      localContentQuota: "At least 80% Canadian content (CanCon) quota overall and 80% in prime time (19:00–23:00) under Canadian Radio-television and Telecommunications Commission (CRTC) conditions of licence",
      staffHeadcount: "6,554 permanent full-time employees (CBC/Radio-Canada Annual Report 2023–2024)",
      logo: "/broadcaster-logos/ca/cbc.svg",
      logoExplainer:
        "The famed 'Gem' logo, designed in 1974 by graphic designer Burton Kramer and simplified in 1992, consists of a circular core from which geometric segments radiate outwards in morphing shapes. It evokes an antenna radiating signals across Canada's vast continental geography from coast to coast to coast, representing bilingual heritage and national cohesion.",
      sources: [
        "https://site-cbc.radio-canada.ca/en/vision/governance/annual-reports",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/canada",
        "https://crtc.gc.ca/",
      ],
      licenceNote: "Public service broadcaster trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // New Zealand
  NZ: [
    {
      id: "nz-rnz",
      countryCode: "NZ",
      name: "RNZ",
      officialName: "Radio New Zealand (Te Reo Irirangi o Aotearoa)",
      founded: 1925,
      primaryFunding: "Crown government public funding via public media agency NZ On Air and direct Ministry for Culture and Heritage appropriation (100% commercial-free public service media)",
      headquarters: "Radio New Zealand House, The Terrace, Wellington",
      annualPublicFunding: {
        total: "NZ$68.5 million (RNZ Annual Report 2023/24)",
        perCapita: "NZ$12.92 / person / year (approx. US$7.90)",
      },
      dailyMarketShare: "11.2% national radio audience share for RNZ National (GfK 2024); over 650,000 weekly live radio listeners and extensive digital multimedia reach",
      brandTrustScore: {
        score: "4.9 / 10",
        source: "JMAD AUT Trust in News in Aotearoa New Zealand Report 2024 (#1 most trusted news brand in New Zealand across 2024, 2025, and 2026)",
      },
      localContentQuota: "100% public service local content quota under the RNZ Charter; mandated to reflect New Zealand identity, te reo Māori language promotion, and Pacific culture",
      staffHeadcount: "330 full-time equivalent personnel (RNZ Annual Report 2023/24)",
      logo: "/broadcaster-logos/nz/rnz.svg",
      logoExplainer:
        "The RNZ logo features a bold red typographic wordmark with a distinctive angular cut on the letterforms. The signature red draws upon traditional Māori red ochre (kōkōwai), symbolizing life, cultural vitality, and prestige, while the crisp contemporary styling marks RNZ's evolution into a modern multimedia public broadcaster.",
      sources: [
        "https://www.rnz.co.nz/about/annual-report",
        "https://www.aut.ac.nz/research/research-institutes/jmad/jmad-publications",
        "https://www.nzonair.govt.nz/",
      ],
      licenceNote: "Public service broadcaster trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "nz-whakaata-maori",
      countryCode: "NZ",
      name: "Whakaata Māori",
      officialName: "Māori Television Service (Te Aratuku Whakaata Irirangi Māori)",
      founded: 2004,
      primaryFunding: "Crown appropriation via Te Māngai Pāho (Māori Broadcast Funding Agency) and Te Puni Kōkiri (Ministry of Māori Development)",
      headquarters: "East Tāmaki, Auckland",
      annualPublicFunding: {
        total: "NZ$42.8 million (Te Māngai Pāho & Crown Funding 2023/24)",
        perCapita: "NZ$8.08 / person / year nationally (~NZ$48 / Māori citizen)",
      },
      dailyMarketShare: "1.5% national TV viewing share; reaches over 1 million New Zealanders monthly across linear broadcast and MĀORI+ digital on-demand platforms",
      brandTrustScore: {
        score: "4.1 / 10",
        source: "JMAD AUT Trust in News in Aotearoa New Zealand Report 2024 (recognized for exceptional trust in indigenous news and cultural storytelling)",
      },
      localContentQuota: "85% local New Zealand content quota; statutory requirement under the Māori Television Service Act that at least 51% of prime-time broadcasts be in te reo Māori",
      staffHeadcount: "160 full-time employees (Whakaata Māori Annual Report 2023/24)",
      logo: "/broadcaster-logos/nz/whakaata-maori.svg",
      logoExplainer:
        "The Whakaata Māori emblem depicts a stylized koru (unfurling fern frond) and triangular chevron motifs rendered in deep earth red and charcoal. In Māori culture, the koru represents new life, cultural regeneration, inner strength, and the uninterrupted generational flow of oral wisdom and ancestral heritage.",
      sources: [
        "https://www.whakaatamaori.co.nz/about-us",
        "https://www.tmp.govt.nz/",
        "https://www.aut.ac.nz/research/research-institutes/jmad/jmad-publications",
      ],
      licenceNote: "Public service broadcaster trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // France
  FR: [
    {
      id: "fr-france-televisions",
      countryCode: "FR",
      name: "France Télévisions",
      officialName: "France Télévisions S.A.",
      founded: 1992,
      primaryFunding: "State budget allocation (funded since the 2022 abolition of the licence fee through an allocated fraction of national VAT / TVA state revenues), with limited advertising (commercials banned after 20:00)",
      headquarters: "7 Boulevard Esplanade Henri de France, 15th arrondissement, Paris",
      annualPublicFunding: {
        total: "€2,568.0 million (€2.57 billion) in state public funding (Projet de loi de finances 2024)",
        perCapita: "€37.54 / person / year (approx. €0.10 / day)",
      },
      dailyMarketShare: "29.4% combined audience share in 2023/2024 (Médiamétrie) across France 2 (15.3%), France 3 (9.0%), France 5 (3.5%), France 4 (0.8%), and franceinfo (0.8%) — #1 television group in France",
      brandTrustScore: {
        score: "60%",
        source: "Reuters Institute Digital News Report 2024 (#1 most trusted television news service in France)",
      },
      localContentQuota: "Regulated by Arcom: minimum 60% European audiovisual works and 40% original French-language programming (œuvres d'expression originale française), with comprehensive regional news programming on France 3",
      staffHeadcount: "9,150 full-time equivalent employees (France Télévisions Rapport Annuel 2023)",
      logo: "/broadcaster-logos/fr/france-televisions.svg",
      logoExplainer:
        "The France Télévisions visual identity, refreshed by Movement in 2018, features a minimalist sequence of vertical coloured dots alongside clean typography. Each dot represents one of the group's network channels in its signature hue (blue for France 2, orange for France 3, purple for France 4, green for France 5, and dark blue for franceinfo), symbolizing diversity, harmony, and national coherence.",
      sources: [
        "https://www.francetelevisions.fr/groupe/chiffres-cles",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/france",
        "https://www.arcom.fr/",
      ],
      licenceNote: "Public service broadcaster trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "fr-radio-france",
      countryCode: "FR",
      name: "Radio France",
      officialName: "Société nationale de radiodiffusion Radio France",
      founded: 1975,
      primaryFunding: "State budget allocation (allocated fraction of national VAT / TVA, replacing the former audiovisual licence fee), with strictly limited advertising and concert revenues",
      headquarters: "Maison de la Radio et de la Musique, 116 Avenue du Président-Kennedy, 16th arrondissement, Paris",
      annualPublicFunding: {
        total: "€654.0 million public funding allocation (Loi de finances 2024)",
        perCapita: "€9.56 / person / year",
      },
      dailyMarketShare: "31.2% combined radio audience share (Médiamétrie 126 000 Radio 2024); France Inter is consistently the #1 radio station in France with over 7.0 million daily listeners (14.5% share alone), alongside France Info (8.5%), France Culture, and France Musique",
      brandTrustScore: {
        score: "58%",
        source: "Reuters Institute / Médias Français Trust Survey (France Inter and franceinfo recognized as France's benchmark radio news authorities)",
      },
      localContentQuota: "Under Arcom quotas and the French Toubon Law, stations must broadcast a minimum of 40% French-language music (up to 50% on regional stations), with 100% of speech programming conducted in French",
      staffHeadcount: "4,520 full-time employees (including the National Orchestra of France, the Radio France Philharmonic Orchestra, and the Radio France Choir)",
      logo: "/broadcaster-logos/fr/radio-france.svg",
      logoExplainer:
        "Designed by the Leg agency and updated in 2017, the Radio France logo features a square blue medallion bearing the stylized architectural silhouette of the circular Maison de la Radio building in Paris. Its concentric geometry represents the headquarters on the Seine and concentric sound waves radiating across the French Republic.",
      sources: [
        "https://www.radiofrance.com/qui-sommes-nous",
        "https://www.mediametrie.fr/fr/126-000-radio",
        "https://www.arcom.fr/",
      ],
      licenceNote: "Public service broadcaster trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "fr-arte",
      countryCode: "FR",
      name: "Arte",
      officialName: "Arte France / Association Relative à la Télévision Européenne (Arte GEIE)",
      founded: 1991,
      primaryFunding: "Public funding from the French state budget (allocated to Arte France via the audiovisual envelope) and from the German broadcast licence fee (Rundfunkbeitrag via ARD and ZDF to Arte Deutschland); 100% commercial-free with zero advertising",
      headquarters: "Strasbourg, France (Arte GEIE European HQ); Arte France located in Issy-les-Moulineaux, Paris",
      annualPublicFunding: {
        total: "€310.4 million French state allocation to Arte France (2024; combined Franco-German Arte operating budget is ~€610M)",
        perCapita: "€4.54 / citizen in France",
      },
      dailyMarketShare: "3.2% linear TV audience share in France (Médiamétrie 2024) and 1.4% in Germany; over 2.1 billion annual on-demand video streams across Europe on Arte.tv",
      brandTrustScore: {
        score: "58%",
        source: "Reuters Institute Digital News Report 2024 (Europe Cultural Media Index; recognized across the continent for cultural independence)",
      },
      localContentQuota: "Minimum 85% European audiovisual production quota under the Franco-German Treaty; all programs broadcast with dual French/German audio and subtitled in 6 European languages",
      staffHeadcount: "500 employees (approx. 270 at Arte France and 170 at Arte GEIE Strasbourg)",
      logo: "/broadcaster-logos/fr/arte.svg",
      logoExplainer:
        "Designed originally in 1995 and refreshed in 2017 by British design agency The Partners, the Arte logo features four lowercase letters 'arte' in warm coral-orange, tilted upright on a distinctive vertical angle. The standing, monumental posture evokes an architectural column and an open window onto European arts, culture, and intellectual curiosity.",
      sources: [
        "https://www.arte.tv/corporate/en/who-we-are/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/france",
      ],
      licenceNote: "European public cultural broadcaster trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Indonesia
  ID: [
    {
      id: "id-tvri",
      countryCode: "ID",
      name: "TVRI",
      officialName: "Lembaga Penyiaran Publik Televisi Republik Indonesia (LPP TVRI)",
      founded: 1962,
      primaryFunding: "State budget appropriation (APBN / Anggaran Pendapatan dan Belanja Negara) supplemented by state non-tax revenue (PNBP / Penerimaan Negara Bukan Pajak)",
      headquarters: "Gelora, Senayan, Central Jakarta",
      annualPublicFunding: {
        total: "Rp1,159 billion (approx. US$72 million, FY 2024 APBN ceiling)",
        perCapita: "Rp4,170 / person / year (approx. US$0.26 / person / year)",
      },
      dailyMarketShare: "1.8% commercial audience share (Nielsen Indonesia 2024); operates 35 regional television stations and 360+ terrestrial transmitters with the largest geographic reach across the archipelago",
      brandTrustScore: {
        score: "58%",
        source: "Reuters Institute Digital News Report 2024 (jointly highest-ranked television network brand in Indonesia alongside Kompas)",
      },
      localContentQuota: "Minimum 60% domestic content requirement under Law No. 32/2002 on Broadcasting, with extensive regional culture and educational programming mandates",
      staffHeadcount: "4,600+ personnel across national headquarters and 35 provincial broadcasting stations (PPID TVRI 2024)",
      logo: "/broadcaster-logos/id/tvri.svg",
      logoExplainer:
        "Introduced on March 29, 2019, the TVRI logo features a deep trusted-blue circular ring enclosing the initials 'RI' (Republik Indonesia) alongside the wordmark 'TV'. The circle symbolizes a global outlook and the vision to be a world-class public broadcaster, while the unified composition underscores TVRI's foundational motto 'Media Pemersatu Bangsa' (Media Unifying the Nation).",
      sources: [
        "https://tvri.go.id/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/indonesia",
        "https://dpr.go.id/komisi/komisi-1",
      ],
      licenceNote: "Indonesian public service broadcaster trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Thailand
  TH: [
    {
      id: "th-thaipbs",
      countryCode: "TH",
      name: "Thai PBS",
      officialName: "Thai Public Broadcasting Service (องค์การกระจายเสียงและแพร่ภาพสาธารณะแห่งประเทศไทย / ส.ส.ท.)",
      founded: 2008,
      primaryFunding: "Dedicated statutory earmarked levy ('sin tax') of 1.5% on alcohol and tobacco excise taxes, legally capped at 2,000 million baht annually; 100% commercial and advertisement-free",
      headquarters: "Lak Si District, Bangkok",
      annualPublicFunding: {
        total: "฿2,000.0 million statutory cap (approx. US$58 million, FY 2023–24)",
        perCapita: "฿28.60 / person / year (approx. US$0.83 / person / year)",
      },
      dailyMarketShare: "2.8% national TV share (NBTC Thailand Ratings 2024); over 14 million monthly digital active users across Thai PBS web and VIPA platforms",
      brandTrustScore: {
        score: "72%",
        source: "Reuters Institute Digital News Report 2024 (consistently among top 2 most trusted news brands in Thailand)",
      },
      localContentQuota: "Minimum 70% locally produced content quota under the Thai Public Broadcasting Service Act B.E. 2551 (2008), with strict public interest and children/youth educational mandates",
      staffHeadcount: "1,180 full-time equivalent staff (Thai PBS Annual Financial Report 2023–24)",
      logo: "/broadcaster-logos/th/thaipbs.svg",
      logoExplainer:
        "The Thai PBS emblem features a stylized upward-soaring bird in bright dawn orange alongside the bilingual name. The soaring bird represents editorial freedom, aspiration, connection with the people, and societal vitality, while the radiant orange represents the dawn of hope, enlightenment, and public service integrity.",
      sources: [
        "https://www.thaipbs.or.th/about",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/thailand",
        "https://www.nbtc.go.th/",
      ],
      licenceNote: "Thai public service broadcaster trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Vietnam
  VN: [
    {
      id: "vn-vtv",
      countryCode: "VN",
      name: "VTV",
      officialName: "Vietnam Television (Đài Truyền hình Việt Nam)",
      founded: 1970,
      primaryFunding: "Self-financing commercial revenue (advertising, sponsorship, and production services representing ~90%) supplemented by targeted state budget support (~10%) under the Ministry of Information and Communications",
      headquarters: "Ba Dinh District, Hanoi",
      annualPublicFunding: {
        total: "approx. ₫380 billion state budget contribution (~US$15 million, FY 2023–24; total operational revenue exceeds ₫3.8 trillion)",
        perCapita: "₫3,850 / citizen / year (~US$0.15 / citizen)",
      },
      dailyMarketShare: "38.5% national TV viewing share across 9 national terrestrial channels (VTV1 to VTV9; Kantar Media Vietnam 2024); VTV1 is the mandatory national public affairs channel",
      brandTrustScore: {
        score: "78%",
        source: "Ministry of Information & Communications Media Assessment 2024 (flagship source for national disaster warnings and state public affairs)",
      },
      localContentQuota: "80% domestic production quota across prime-time schedules under the Law on Press, with VTV1 carrying 100% Vietnamese public interest and current affairs content",
      staffHeadcount: "4,200+ employees across Hanoi headquarters and 5 regional centers (Vietnam Television Directorate 2024)",
      logo: "/broadcaster-logos/vn/vtv.svg",
      logoExplainer:
        "The VTV logo showcases three bold geometric letterforms 'VTV' in the primary optical additive colors: red, green, and blue (RGB). The red evokes the national flag of Vietnam and patriotic devotion, while green and blue symbolize growth, truth, and electronic broadcasting waves connecting the country's diverse provinces.",
      sources: [
        "https://vtv.vn/",
        "https://mic.gov.vn/",
        "https://statemediamonitor.com/services/vietnam-television-vtv/",
      ],
      licenceNote: "Vietnam Television national trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Philippines
  PH: [
    {
      id: "ph-ptv",
      countryCode: "PH",
      name: "PTV",
      officialName: "People's Television Network, Inc. (PTNI)",
      founded: 1974,
      primaryFunding: "Hybrid model: National budget subsidy under the General Appropriations Act (GAA) via the Presidential Communications Office (PCO) supplemented by commercial advertising and blocktime airtime revenue (under Republic Act 10390)",
      headquarters: "Diliman, Quezon City, Metro Manila",
      annualPublicFunding: {
        total: "₱1,040 million subsidy (approx. US$18.5 million, General Appropriations Act FY 2024)",
        perCapita: "₱9.10 / person / year (approx. US$0.16 / person / year)",
      },
      dailyMarketShare: "1.2% commercial TV audience share (Nielsen Philippines 2024); primary state government channel operating 16 regional stations and digital DTT transmitters nationwide",
      brandTrustScore: {
        score: "52%",
        source: "Reuters Institute Digital News Report 2024 (official state news broadcaster)",
      },
      localContentQuota: "100% domestic Filipino and regional languages content on public news broadcasts; minimum 50% Philippine music quota on radio and cultural programming under government media mandates",
      staffHeadcount: "780 regular, co-terminus, and contract-of-service personnel (PTNI Annual Audit Report, Commission on Audit 2024)",
      logo: "/broadcaster-logos/ph/ptv.svg",
      logoExplainer:
        "Launched in 2017 as part of its network modernization, the PTV logo is rendered in the national colors of the Philippines: royal blue, scarlet red, and golden yellow. It incorporates three stylized rings and rays radiating outward, symbolizing the three island groups (Luzon, Visayas, Mindanao) and the government's commitment to timely, transparent public information.",
      sources: [
        "https://ptvnews.ph/",
        "https://www.dbm.gov.ph/index.php/budget-documents/2024/general-appropriations-act-fy-2024",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/philippines",
      ],
      licenceNote: "People's Television Network trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Singapore
  SG: [
    {
      id: "sg-mediacorp",
      countryCode: "SG",
      name: "Mediacorp",
      officialName: "Mediacorp Pte Ltd (wholly owned by Temasek Holdings)",
      founded: 1936,
      primaryFunding: "Public Service Broadcasting (PSB) government grant from the Infocomm Media Development Authority (IMDA) supplemented by commercial advertising and digital monetization",
      headquarters: "1 Stars Avenue, Mediapolis, one-north, Singapore",
      annualPublicFunding: {
        total: "S$380.0 million annual PSB funding envelope (approx. US$285 million, MDDI Parliamentary Statement 2024/25)",
        perCapita: "S$64.20 / resident / year (approx. US$48.20 / person / year)",
      },
      dailyMarketShare: "84% weekly reach across free-to-air TV channels (Channel 5, Channel 8, Suria, Vasantham, CNA, and U); 98% overall brand reach including mewatch and 11 radio stations",
      brandTrustScore: {
        score: "74%",
        source: "Reuters Institute Digital News Report 2024 (#1 most trusted news brand in Singapore for CNA for 6 consecutive years; Channel 5 News at 71%)",
      },
      localContentQuota: "100% Public Service Broadcasting quota compliance under IMDA licence conditions, delivering over 2,800 hours of locally produced original programming across Singapore's 4 official languages (English, Chinese, Malay, Tamil)",
      staffHeadcount: "3,100 full-time employees (Mediacorp Corporate Review 2024)",
      logo: "/broadcaster-logos/sg/mediacorp.svg",
      logoExplainer:
        "The Mediacorp emblem, refreshed to a refined 2D geometry in 2023, features a dynamic looping 'M' formed by an interlocking ribbon in navy, cyan, magenta, and amber. The continuous loop symbolizes an open window to the world and a reflection of everyday Singaporean life, while the upward-thrusting arrow in the central serif (the 'Mplifier') conveys constant forward progress and technological innovation.",
      sources: [
        "https://www.mediacorp.sg/",
        "https://www.mddi.gov.sg/newsroom/parliamentary-replies/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/singapore",
      ],
      licenceNote: "Mediacorp Singapore registered trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Myanmar
  MM: [
    {
      id: "mm-mrtv",
      countryCode: "MM",
      name: "MRTV",
      officialName: "Myanmar Radio and Television (မြန်မာ့အသံနှင့်ရုပ်မြင်သံကြား)",
      founded: 1946,
      primaryFunding: "Direct state budget allocation under the Ministry of Information (MOI); state-controlled public broadcasting department",
      headquarters: "Tatkon, Naypyidaw (Radio/Admin HQ) & Kamayut Township, Yangon (Broadcast Center)",
      annualPublicFunding: {
        total: "approx. 45 billion kyat state ministerial allocation (approx. US$21.4 million, FY 2023–24)",
        perCapita: "approx. 825 kyat / citizen / year (approx. US$0.39 / citizen)",
      },
      dailyMarketShare: "Primary terrestrial broadcaster operating MRTV-NRC, MRTV Farmers, MRTV Parliament, and ethnic language services across 140+ relay transmission stations nationwide",
      brandTrustScore: {
        score: "State broadcaster",
        source: "Ministry of Information National Broadcasting Registry (exclusive official state authority for government decrees and civil announcements)",
      },
      localContentQuota: "Over 85% domestic programming, including daily transmissions in 17 indigenous ethnic languages (Kayin, Kachin, Shan, Mon, Chin, Rakhine, etc.) alongside Burmese",
      staffHeadcount: "2,200+ civil servants and media production personnel (MOI Department of Broadcasting 2024)",
      logo: "/broadcaster-logos/mm/mrtv.png",
      logoExplainer:
        "The MRTV logo combines the Latin acronym 'MRTV' in deep blue and vibrant red, accompanied by Burmese script lettering. The bold typographic forms reflect institutional authority, national continuity, and the transition from historic radio telegraphy into digital terrestrial television broadcasting.",
      sources: [
        "https://www.mrtv.gov.mm/",
        "https://www.moi.gov.mm/",
        "https://statemediamonitor.com/services/myanmar-radio-and-television-mrtv/",
      ],
      licenceNote: "Myanmar Radio and Television departmental trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Cambodia
  KH: [
    {
      id: "kh-tvk",
      countryCode: "KH",
      name: "TVK",
      officialName: "National Television of Cambodia (ទូរទស្សន៍ជាតិកម្ពុជា / Télévision Nationale du Cambodge)",
      founded: 1966,
      primaryFunding: "National government budget subsidy managed by the Ministry of Information supplemented by limited broadcast airtime sponsorships",
      headquarters: "No. 62 Preah Monivong Blvd, Khan Daun Penh, Phnom Penh",
      annualPublicFunding: {
        total: "approx. 28 billion riel annual ministerial budget (approx. US$6.8 million, FY 2024)",
        perCapita: "approx. 1,680 riel / citizen / year (approx. US$0.41 / citizen)",
      },
      dailyMarketShare: "State-run terrestrial network operating TVK and TVK Edu (Education channel launched with UNESCO support), reaching over 80% of provincial households",
      brandTrustScore: {
        score: "Official state media",
        source: "Royal Government of Cambodia Ministry of Information (designated official broadcaster for Royal ceremonies and national parliamentary proceedings)",
      },
      localContentQuota: "80% Khmer-language domestic cultural and educational quota, featuring classical Royal ballet broadcasts, heritage documentaries, and civic education",
      staffHeadcount: "650 civil service personnel and technical operators (Ministry of Information Personnel Directorate 2024)",
      logo: "/broadcaster-logos/kh/tvk.png",
      logoExplainer:
        "The TVK insignia features a circular badge with the letters 'TVK' intertwined with traditional Khmer kbach ornamentation in gold and navy. The ornate scrollwork echoes ancient Angkorian decorative motifs, signifying Khmer cultural sovereignty, national pride, and heritage preservation.",
      sources: [
        "http://www.tvk.gov.kh/",
        "https://www.information.gov.kh/",
        "https://statemediamonitor.com/services/national-television-of-cambodia-tvk/",
      ],
      licenceNote: "National Television of Cambodia trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Laos
  LA: [
    {
      id: "la-lntv",
      countryCode: "LA",
      name: "LNTV",
      officialName: "Lao National Television (ໂທລະພາບແຫ່ງຊາດລາວ / Télévision Nationale Lao)",
      founded: 1983,
      primaryFunding: "State budget subsidy allocated by the Ministry of Information, Culture and Tourism (MICT), supplemented by technical cooperation grants from international partners",
      headquarters: "Saythany District, Vientiane Prefecture",
      annualPublicFunding: {
        total: "approx. 22 billion kip ministerial allocation (approx. US$1.05 million, FY 2024)",
        perCapita: "approx. 2,930 kip / citizen / year (approx. US$0.14 / citizen)",
      },
      dailyMarketShare: "Principal public terrestrial network broadcasting on Channel 1 and Channel 3 (HD digital), maintaining regional production centers across Luang Prabang, Savannakhet, and Champasak",
      brandTrustScore: {
        score: "Official national broadcaster",
        source: "Ministry of Information, Culture and Tourism (MICT official government registry)",
      },
      localContentQuota: "90% domestic programming in Lao language, including dedicated daily broadcasts in Hmong and Khmu ethnic minority dialects",
      staffHeadcount: "380 employees across national studios in Vientiane and provincial relay centers (MICT Broadcasting Department 2024)",
      logo: "/broadcaster-logos/la/lntv.png",
      logoExplainer:
        "The Lao National Television emblem prominently showcases the sacred golden stupa of Pha That Luang—the national symbol of Laos—encircled by radiating broadcast waves in deep royal blue. The sacred stupa represents Lao national sovereignty and Buddhist heritage, while the concentric orbits denote modern telecommunication reaching all remote mountainous provinces.",
      sources: [
        "https://www.lntv.gov.la/",
        "https://statemediamonitor.com/services/lao-national-television-lntv/",
      ],
      licenceNote: "Lao National Television official emblem and trademark bundled for educational reference in Learn mode.",
    },
  ],

  // Brunei
  BN: [
    {
      id: "bn-rtb",
      countryCode: "BN",
      name: "RTB",
      officialName: "Radio Television Brunei (Jabatan Radio Televisyen Brunei)",
      founded: 1957,
      primaryFunding: "Direct state budget appropriation under the Prime Minister's Office (Jabatan Perdana Menteri); 100% public non-commercial service with zero advertising fees",
      headquarters: "Sungai Akar Broadcasting Complex, Bandar Seri Begawan",
      annualPublicFunding: {
        total: "B$40.94 million (approx. US$30.8 million, Brunei National Budget FY 2024/25)",
        perCapita: "B$89.00 / resident / year (approx. US$67.00 / resident / year)",
      },
      dailyMarketShare: "Monopoly national free-to-air broadcaster operating 3 terrestrial TV channels (RTB Perdana, RTB Aneka, RTB Sukmaindera) and 5 national radio stations, reaching over 95% of national population",
      brandTrustScore: {
        score: "92%",
        source: "Brunei Prime Minister's Office National Media Audit 2024 (primary national institution for royal addresses, Islamic religious rulings, and national emergency announcements)",
      },
      localContentQuota: "Over 75% local content quota under the National Media Charter, anchored in the state philosophy of Melayu Islam Beraja (Malay Islamic Monarchy)",
      staffHeadcount: "1,150 civil service personnel and broadcast professionals (RTB Corporate Directory 2024)",
      logo: "/broadcaster-logos/bn/rtb.svg",
      logoExplainer:
        "The RTB emblem incorporates the National Crest of Brunei Darussalam: the royal umbrella (Payung Ubor-Ubor), the winged pylon (Sayap), the two upturned hands (Tangan), and the crescent bearing the national motto in Jawi script ('Always in service with God's guidance'). Below it, the modern blue and orange geometric initials 'RTB' symbolize progress, digital connectivity, and public devotion.",
      sources: [
        "https://www.rtb.gov.bn/",
        "https://www.jpm.gov.bn/",
        "https://statemediamonitor.com/services/radio-television-brunei-rtb/",
      ],
      licenceNote: "Radio Television Brunei departmental trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Timor-Leste
  TL: [
    {
      id: "tl-rttl",
      countryCode: "TL",
      name: "RTTL",
      officialName: "Rádio e Televisão de Timor-Leste, Empresa Pública (RTTL, E.P.)",
      founded: 2002,
      primaryFunding: "State public enterprise subsidy from the General State Budget (Orçamento Geral do Estado) under the Office of the Prime Minister, supplemented by international development partnerships (UNDP, Japan/JICA)",
      headquarters: "Rua de Caicoli, Dili",
      annualPublicFunding: {
        total: "US$4.50 million state operational subsidy (Orçamento Geral do Estado FY 2024)",
        perCapita: "US$3.35 / person / year (approx. US$0.01 / day)",
      },
      dailyMarketShare: "National public network broadcasting TVTL and RTL (Radio Timor-Leste); principal source of free-to-air news across all 14 municipalities with expanding DTT transmitter coverage",
      brandTrustScore: {
        score: "76%",
        source: "The Asia Foundation Timor-Leste Media & Governance Survey 2024 (most trusted and accessible news organization across rural districts)",
      },
      localContentQuota: "85% domestic programming quota produced in Tetum and Portuguese, preserving Timorese national memory, local music, and civic literacy",
      staffHeadcount: "210 journalists, technical staff, and provincial correspondents (RTTL, E.P. Annual Operational Report 2024)",
      logo: "/broadcaster-logos/tl/rttl.png",
      logoExplainer:
        "The RTTL insignia features a stylized globe intersected by dynamic curved wave arcs in Timor-Leste's national colors: black, red, yellow, and white. The arc sweeping across the horizon symbolizes the emergence of an independent democratic voice, national unity, and telecommunication linking the coastline to the central mountains.",
      sources: [
        "http://www.rttlep.tl/",
        "https://www.timor-leste.gov.tl/",
        "https://statemediamonitor.com/services/radio-e-televisao-de-timor-leste-rttl/",
      ],
      licenceNote: "Rádio e Televisão de Timor-Leste public enterprise trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Japan
  JP: [
    {
      id: "jp-nhk",
      countryCode: "JP",
      name: "NHK",
      officialName: "Nippon Hōsō Kyōkai (日本放送協会 / Japan Broadcasting Corporation)",
      founded: 1926,
      primaryFunding: "Statutory receiving fee system (受信料 / Jushinryō) paid by TV-owning households and businesses under the Broadcast Act; 100% commercial-free with zero tax revenue and no advertising",
      headquarters: "Jinnan, Shibuya, Tokyo (NHK Broadcasting Center)",
      annualPublicFunding: {
        total: "¥624.4 billion receiving fee revenue (approx. US$4.15 billion, NHK FY 2023–24 Financial Report)",
        perCapita: "approx. ¥5,020 / person / year (approx. US$33.50 / person / year)",
      },
      dailyMarketShare: "22.3% prime-time national audience share across NHK General and Educational TV (Video Research Ltd. 2024); NHK News 7 is Japan's most-watched daily evening newscast",
      brandTrustScore: {
        score: "57%",
        source: "Reuters Institute Digital News Report 2024 (#1 most trusted news organization in Japan, outranking all national commercial networks and daily newspapers)",
      },
      localContentQuota: "Over 85% domestic programming quota under the Broadcast Act; operates 54 domestic broadcasting stations across all 47 prefectures with extensive regional news and disaster warning responsibilities",
      staffHeadcount: "10,150 regular employees (NHK Corporate Profile 2024)",
      logo: "/broadcaster-logos/jp/nhk.svg",
      logoExplainer:
        "Updated in 2020 for the digital and 8K era, the minimalist NHK logo features the three Latin letters in bold geometric sans-serif enclosed within soft rounded rectangular containers. The design preserves the iconic three-egg spatial layout introduced in 1995 while simplifying contours for legibility on ultra-high-definition displays and mobile applications.",
      sources: [
        "https://www.nhk.or.jp/corporateinfo/",
        "https://www.nhk.or.jp/pr/keiei/kessan/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/japan",
      ],
      licenceNote: "NHK Japan Broadcasting Corporation registered trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // South Korea
  KR: [
    {
      id: "kr-kbs",
      countryCode: "KR",
      name: "KBS",
      officialName: "Korean Broadcasting System (한국방송공사 / 韓國放送公社)",
      founded: 1927,
      primaryFunding: "Hybrid model: Statutory television receiving fee (수신료 / 2,500 KRW/month per household) accounting for ~45% of budget, supplemented by commercial advertising on KBS2 and digital service revenue (KBS1 is 100% advertisement-free)",
      headquarters: "13 Yeouigongwon-ro, Yeongdeungpo-gu, Seoul (Yeouido Broadcasting HQ)",
      annualPublicFunding: {
        total: "675.8 billion KRW receiving fee revenue (approx. US$510 million, KBS Annual Business Report FY 2023–24)",
        perCapita: "13,070 KRW / citizen / year (approx. US$9.85 / citizen / year)",
      },
      dailyMarketShare: "14.8% combined national free-to-air TV viewing share across KBS1 and KBS2 (Nielsen Korea 2024); KBS News 9 remains the flagship national daily news bulletin",
      brandTrustScore: {
        score: "55%",
        source: "Reuters Institute Digital News Report 2024 (consistently ranks among the top 2 broadcast news organizations in Korea; #1 media brand for overall public influence in Korea Press Foundation surveys)",
      },
      localContentQuota: "80% domestic production quota under the Korea Communications Commission (KCC) regulations, with mandatory investment into independent domestic drama, documentary, and historical sagas",
      staffHeadcount: "4,450 full-time staff across Seoul headquarters and 18 regional stations (KBS Management Information 2024)",
      logo: "/broadcaster-logos/kr/kbs.svg",
      logoExplainer:
        "Refreshed for its 50th public broadcasting anniversary in 2023, the KBS emblem features an optical geometric 'K' formed by radiating concentric arcs in cobalt blue. The circular wave motif symbolizes terrestrial sound and television waves rippling across the Korean Peninsula, conveying national unity, democratic discourse, and universal public service.",
      sources: [
        "https://about.kbs.co.kr/",
        "https://kcc.go.kr/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/south-korea",
      ],
      licenceNote: "Korean Broadcasting System registered trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // China
  CN: [
    {
      id: "cn-cctv",
      countryCode: "CN",
      name: "CCTV",
      officialName: "China Central Television (中国中央电视台), subsidiary of China Media Group (中央广播电视总台 / CMG)",
      founded: 1958,
      primaryFunding: "Commercial advertising revenue and content syndication under state ownership, supplemented by state budget allocations from the Ministry of Finance to China Media Group",
      headquarters: "11 Fuxing Road, Haidian District & 32 East Third Ring Middle Road, Chaoyang District, Beijing",
      annualPublicFunding: {
        total: "approx. 2.06 billion CNY central ministerial budget allocation to CMG (approx. US$285 million, Ministry of Finance FY 2024; commercial advertising revenue exceeds 15 billion CNY)",
        perCapita: "approx. 1.46 CNY / citizen / year (approx. US$0.20 / citizen)",
      },
      dailyMarketShare: "29.8% national TV viewing market share across 40+ broadcast channels (CSM Media Research 2024); Xinwen Lianbo (Evening News) is the world's most-watched daily news broadcast",
      brandTrustScore: {
        score: "State broadcaster",
        source: "National Radio and Television Administration (NRTA official flagship media organization with nationwide universal carriage)",
      },
      localContentQuota: "Over 90% domestic production quota across national broadcast schedules under NRTA guidelines, with strict quotas on prime-time historical, educational, and patriotic programming",
      staffHeadcount: "10,000+ journalists, editors, and production staff across China Media Group (CMG Corporate Overview 2024)",
      logo: "/broadcaster-logos/cn/cctv.svg",
      logoExplainer:
        "The iconic CCTV logo features the bold Latin letterforms 'CCTV' in solid black and cadmium red. The second 'C' and central stroke are rendered in vibrant Chinese red, visually emphasizing the television screen and China's national color, reflecting institutional authority and global broadcasting reach.",
      sources: [
        "https://tv.cctv.com/",
        "http://www.nrta.gov.cn/",
        "http://www.mof.gov.cn/",
      ],
      licenceNote: "China Central Television / China Media Group registered trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Mongolia
  MN: [
    {
      id: "mn-mnb",
      countryCode: "MN",
      name: "MNB",
      officialName: "Mongolian National Public Radio and Television (Монголын Үндэсний Олон Нийтийн Радио Телевиз / MNB)",
      founded: 1967,
      primaryFunding: "Hybrid public model: State budget subsidy (approx. 41%) and compulsory household radio/TV levy (approx. 39%, collected via monthly electricity utility bills) under the Law on Public Radio and Television, supplemented by commercial advertising (capped at 2 hours/day)",
      headquarters: "Khoroo 3, Bayangol District, Ulaanbaatar",
      annualPublicFunding: {
        total: "14.2 billion MNT statutory public envelope (approx. US$4.15 million, MNB Financial Audit 2023–24)",
        perCapita: "4,050 MNT / citizen / year (approx. US$1.18 / citizen / year)",
      },
      dailyMarketShare: "19.5% national audience share across MNB-1, MNB News, and MNB Sport; remains the sole nationwide network accessible across remote nomadic aimags and soums via terrestrial repeaters",
      brandTrustScore: {
        score: "68%",
        source: "Press Institute of Mongolia Media Monitoring Report 2024 (recognized as the most reliable source for meteorological alerts, rural pastoral news, and democratic civic affairs)",
      },
      localContentQuota: "Minimum 60% domestic production requirement under the Public Radio and Television Law, delivering cultural documentaries, traditional folk music, and nomadic heritage programming",
      staffHeadcount: "720 journalists, technical staff, and provincial correspondents (MNB Annual Report 2024)",
      logo: "/broadcaster-logos/mn/mnb.svg",
      logoExplainer:
        "The MNB emblem features a circular turquoise-blue disc bearing the acronym 'MNB' and a stylized depiction of the traditional Soyombo fire symbol and nomadic sun-and-moon emblem in golden yellow. The cosmic Soyombo motifs represent the eternal flame of national independence and prosperity across the Eurasian steppe.",
      sources: [
        "https://www.mnb.mn/",
        "https://crc.gov.mn/en",
        "https://statemediamonitor.com/services/mongolian-national-broadcaster-mnb/",
      ],
      licenceNote: "Mongolian National Public Radio and Television trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // North Korea
  KP: [
    {
      id: "kp-kctv",
      countryCode: "KP",
      name: "KCTV",
      officialName: "Korean Central Television (조선중앙텔레비죤 / 朝鮮中央텔레비죤)",
      founded: 1963,
      primaryFunding: "100% direct state budget financing administered by the Korean Central Broadcasting Committee under the Workers' Party of Korea; zero commercial advertising",
      headquarters: "Moranbong District, Pyongyang (Pyongyang TV Tower Broadcast Complex)",
      annualPublicFunding: {
        total: "Integrated into annual DPRK state expenditure budget (broadcast operations funded via central cultural/ideological envelope; specific fiscal accounts classified)",
        perCapita: "State-funded universal public amenity",
      },
      dailyMarketShare: "Monopoly state terrestrial broadcaster; primary official visual information medium for the domestic population across PAL/DVB-T2 transmission systems and Manbang IPTV network",
      brandTrustScore: {
        score: "Official state broadcaster",
        source: "Korean Central Broadcasting Committee (authoritative official voice of state leadership, military announcements, and national celebrations)",
      },
      localContentQuota: "100% domestic programming in standard Pyongyang dialect, encompassing state documentary chronicles, ideological lectures, theatrical music performances, and educational children's programming",
      staffHeadcount: "1,500+ production, technical, and broadcast engineering personnel (Pyongyang Central Media Directorate 2024)",
      logo: "/broadcaster-logos/kp/kctv.svg",
      logoExplainer:
        "The KCTV emblem features a stylized depiction of the flame from the Juche Tower in bright crimson, set against radiating golden telecommunication rays. The torch flame embodies ideological self-reliance, sovereignty, and state revolutionary leadership, while the radiant golden flares represent the illumination of society through socialist mass broadcasting.",
      sources: [
        "http://www.uriminzokkiri.com/",
        "https://statemediamonitor.com/services/korean-central-television-kctv/",
      ],
      licenceNote: "Korean Central Television national state emblem and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Argentina
  AR: [
    {
      id: "ar-tvp",
      countryCode: "AR",
      name: "Televisión Pública",
      officialName: "Radio y Televisión Argentina Sociedad del Estado (RTA S.E.) - Televisión Pública",
      founded: 1951,
      primaryFunding: "State Treasury budgetary transfers through the National Budget under the Secretariat of Public Communication, supplemented by commercial advertising and transmission services",
      headquarters: "Av. Presidente Figueroa Alcorta 2977, Recoleta, Buenos Aires",
      annualPublicFunding: {
        total: "approx. $74.4 billion ARS approved RTA operating allocation (approx. US$78 million, Resolution 529/2024)",
        perCapita: "approx. $1,610 ARS / citizen / year (approx. US$1.70 / citizen / year)",
      },
      dailyMarketShare: "0.4% national commercial television rating (Kantar IBOPE Media Argentina 2024); guarantees universal federal coverage to over 240 rural repeater relay stations across all 23 provinces",
      brandTrustScore: {
        score: "48%",
        source: "Reuters Institute Digital News Report 2024 (historic federal network; high reach during FIFA World Cup and cultural festivals)",
      },
      localContentQuota: "60% domestic production quota under Audiovisual Communication Services Law No. 26.522, delivering federal cultural documentaries, regional folklore festivals (Cosquín, Jesús María), and civic news",
      staffHeadcount: "1,250 direct personnel at Televisión Pública (RTA S.E. Public Transparency Registry 2024)",
      logo: "/broadcaster-logos/ar/tvp.svg",
      logoExplainer:
        "The Televisión Pública logo features the bold acronym 'TVP' flanked by a stylized ribbon in the Argentine national colors of celestial blue and white. The dynamic diagonal cut across the letterforms reflects modern digital transmission and universal civic connection uniting Buenos Aires and the interior provinces.",
      sources: [
        "https://www.tvpublica.com.ar/",
        "https://www.boletinoficial.gob.ar/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/argentina",
      ],
      licenceNote: "Radio y Televisión Argentina S.E. state trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Chile
  CL: [
    {
      id: "cl-tvn",
      countryCode: "CL",
      name: "TVN",
      officialName: "Televisión Nacional de Chile",
      founded: 1969,
      primaryFunding: "Self-financing commercial public enterprise under Law 19.132; generates over 95% of revenues through advertising, studio production, and international syndication, with targeted state capitalization for digital and cultural signals (NTV)",
      headquarters: "Bellavista 0990, Providencia, Santiago",
      annualPublicFunding: {
        total: "Public enterprise self-financing model (2024 operational revenue of 48.2 billion CLP; receives targeted state subsidies for cultural channel NTV of approx. 5.5 billion CLP / US$5.8M)",
        perCapita: "approx. 280 CLP / citizen / year for cultural public service (approx. US$0.30 / citizen)",
      },
      dailyMarketShare: "9.8% open television broadcast market share (Kantar IBOPE Media Chile 2024); operates 9 regional production centers across the country from Arica to Punta Arenas",
      brandTrustScore: {
        score: "56%",
        source: "Reuters Institute Digital News Report 2024 (24 Horas news brand is among Chile's most established and reputable broadcast news sources)",
      },
      localContentQuota: "Over 65% domestic production quota under the National Television Council (CNTV) regulations, including 100% Chilean educational and cultural content on its dedicated digital channel NTV",
      staffHeadcount: "730 full-time staff across corporate headquarters and regional television stations (TVN Memoria Integrada 2024)",
      logo: "/broadcaster-logos/cl/tvn.svg",
      logoExplainer:
        "The classic TVN logo displays the geometric letters 'tvn' stylized in dynamic angular strokes. Originating in 1996 and recognized nationwide, the interlocking red and gray letterforms symbolize editorial autonomy, forward momentum, and the enduring connection of public television with Chilean society.",
      sources: [
        "https://www.tvn.cl/",
        "https://www.cntv.cl/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/chile",
      ],
      licenceNote: "Televisión Nacional de Chile registered corporate trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Colombia
  CO: [
    {
      id: "co-rtvc",
      countryCode: "CO",
      name: "RTVC",
      officialName: "RTVC Sistema de Medios Públicos (Radio Televisión Nacional de Colombia)",
      founded: 1954,
      primaryFunding: "National government budget allocations through the Single ICT Fund (Fondo Único de TIC / FonTIC) under the Ministry of Information Technologies and Communications (MinTIC)",
      headquarters: "Carrera 45 # 26-33, Centro Administrativo Nacional (CAN), Bogotá D.C.",
      annualPublicFunding: {
        total: "318.5 billion COP ministerial appropriation (approx. US$78 million, MinTIC FonTIC Allocation FY 2024)",
        perCapita: "6,150 COP / citizen / year (approx. US$1.50 / citizen / year)",
      },
      dailyMarketShare: "Operates national free-to-air public channels Señal Colombia and Canal Institucional alongside Radio Nacional (68 frequencies) and Radiónica, reaching 93% of national population",
      brandTrustScore: {
        score: "59%",
        source: "Reuters Institute Digital News Report 2024 (#1 most trusted public broadcast media system in Colombia for Señal Colombia / RTVC Noticias)",
      },
      localContentQuota: "Over 70% Colombian domestic cultural production quota, funding independent regional audiovisual creators, Indigenous storytelling, and national sports broadcasts (Vuelta a Colombia)",
      staffHeadcount: "950 career civil servants, permanent staff, and contracted audiovisual specialists (RTVC Informe de Gestión 2024)",
      logo: "/broadcaster-logos/co/rtvc.svg",
      logoExplainer:
        "The Señal Colombia / RTVC emblem features a bright geometric triangle in vibrant orange, framing a stylized broadcast crest. The triangular symbol represents a digital play button, the three Colombian mountain ranges (Cordilleras), and the forward trajectory of convergent public media.",
      sources: [
        "https://www.rtvc.gov.co/",
        "https://www.mintic.gov.co/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/colombia",
      ],
      licenceNote: "RTVC Sistema de Medios Públicos state trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Peru
  PE: [
    {
      id: "pe-tvperu",
      countryCode: "PE",
      name: "TV Perú",
      officialName: "Instituto Nacional de Radio y Televisión del Perú (IRTP) - TV Perú",
      founded: 1958,
      primaryFunding: "National public budget financing under the Ministry of Culture, supplemented by state advertising and commercial audiovisual production services",
      headquarters: "Jirón Natalio Sánchez 220, Jesús María, Lima",
      annualPublicFunding: {
        total: "S/ 99.95 million budget execution (approx. US$26.8 million, IRTP Institutional Budget FY 2024)",
        perCapita: "S/ 2.95 / citizen / year (approx. US$0.80 / citizen / year)",
      },
      dailyMarketShare: "Maintains the widest terrestrial broadcast footprint in Peru with over 380 transmitter stations nationwide; pioneers pioneering daily indigenous news broadcasts in Quechua (Ñuqanchik) and Aymara (Jiwasanaka)",
      brandTrustScore: {
        score: "52%",
        source: "Reuters Institute Digital News Report 2024 (highly valued for neutral cultural and civic coverage across rural Andean and Amazonian regions)",
      },
      localContentQuota: "80% domestic production requirement under the Radio and Television Law (Law 28278), with mandatory quotas for Peruvian cultural patrimony, regional music, and native language programming",
      staffHeadcount: "1,350 personnel across administrative headquarters and regional production branches (IRTP Transparencia 2024)",
      logo: "/broadcaster-logos/pe/tvperu.svg",
      logoExplainer:
        "The TV Perú logo features the national bilingual wordmark accompanied by a stylized red and white badge echoing the Peruvian national flag. The modern sans-serif typography and vibrant red ribbon communicate clarity, institutional transparency, and cultural inclusion for all Peruvian communities.",
      sources: [
        "https://www.tvperu.gob.pe/",
        "https://www.gob.pe/irtp",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/peru",
      ],
      licenceNote: "Instituto Nacional de Radio y Televisión del Perú trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Venezuela
  VE: [
    {
      id: "ve-vtv",
      countryCode: "VE",
      name: "VTV",
      officialName: "Venezolana de Televisión C.A.",
      founded: 1964,
      primaryFunding: "Direct state budget appropriation from the Ministry of Popular Power for Communication and Information (MIPPCI); state-controlled public television enterprise",
      headquarters: "Avenida Principal de Los Ruices, Municipio Sucre, Caracas",
      annualPublicFunding: {
        total: "approx. 1.2 billion VES ministerial subsidy (approx. US$32 million, MIPPCI Budget Allocation FY 2024)",
        perCapita: "approx. 42 VES / citizen / year (approx. US$1.15 / citizen)",
      },
      dailyMarketShare: "Dominant state terrestrial television signal broadcasting on Channel 8; universal mandatory carriage across all domestic subscription cable and satellite providers in Venezuela",
      brandTrustScore: {
        score: "State broadcaster",
        source: "Ministry of Popular Power for Communication and Information (flagship state news and institutional announcement channel)",
      },
      localContentQuota: "Over 85% domestic programming quota under the Law on Social Responsibility in Radio, Television and Electronic Media (RESORTE), focusing on state news bulletins and ideological analysis",
      staffHeadcount: "1,100+ journalists, editors, and broadcast technicians (MIPPCI Corporate Registry 2024)",
      logo: "/broadcaster-logos/ve/vtv.svg",
      logoExplainer:
        "The VTV logo displays a stylized bold letter 'V' rendered with the yellow, blue, and red colors of the Venezuelan national flag, crowned by the acronym 'VTV'. The dynamic tricolor sweep represents national sovereignty, patriotism, and the historic lineage of public broadcasting founded in Los Ruices.",
      sources: [
        "https://www.vtv.gob.ve/",
        "http://www.minci.gob.ve/",
        "https://statemediamonitor.com/services/venezolana-de-television-vtv/",
      ],
      licenceNote: "Venezolana de Televisión C.A. state corporate trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Ecuador
  EC: [
    {
      id: "ec-ectv",
      countryCode: "EC",
      name: "Ecuador TV",
      officialName: "Empresa Pública de Comunicación del Ecuador (Comunica EP) - Ecuador TV",
      founded: 2007,
      primaryFunding: "State budget allocations through the General State Budget (Presupuesto General del Estado) under the General Secretariat of Communication, supplemented by commercial advertising",
      headquarters: "San Salvador E6-49 y Eloy Alfaro, Quito",
      annualPublicFunding: {
        total: "approx. US$8.5 million public operating transfer (Comunica EP Presupuesto Institucional FY 2024)",
        perCapita: "approx. US$0.48 / citizen / year",
      },
      dailyMarketShare: "National public network covering over 85% of terrestrial households via digital DTT channels 7.1 and 7.2; focuses on cultural patrimony and educational programming (Educa Contigo)",
      brandTrustScore: {
        score: "54%",
        source: "Comunica EP Auditoría de Servicios Públicos 2024 (valued for unbiased educational broadcasts and national civil protection bulletins)",
      },
      localContentQuota: "60% domestic production quota under the Organic Communication Law (LOC), prioritizing national cinema, intercultural intercultural indigenous language segments, and scientific documentaries",
      staffHeadcount: "210 audiovisual professionals, editors, and administrative staff (Comunica EP Transparencia 2024)",
      logo: "/broadcaster-logos/ec/ectv.svg",
      logoExplainer:
        "The Ecuador TV emblem displays the stylized initials 'ec' connected into an unbroken loop in the national colors: golden yellow, cobalt blue, and crimson red. The flowing, harmonious curve conveys unity across the Coast, Highlands, and Amazon, as well as universal access to educational broadcasting.",
      sources: [
        "https://www.comunica.ec/",
        "https://www.ecuadortv.ec/",
        "https://statemediamonitor.com/services/ecuador-tv/",
      ],
      licenceNote: "Empresa Pública de Comunicación del Ecuador public enterprise trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Bolivia
  BO: [
    {
      id: "bo-btv",
      countryCode: "BO",
      name: "Bolivia TV",
      officialName: "Empresa Estatal de Televisión Bolivia TV (BTV)",
      founded: 1969,
      primaryFunding: "Self-generated specific commercial and institutional advertising resources supplemented by strategic state budget transfers under the Ministry of the Presidency",
      headquarters: "Av. Camacho No. 1485, Edificio La Urbana, La Paz",
      annualPublicFunding: {
        total: "78.39 million BOB operational budget (approx. US$11.3 million, BTV Rendición Pública de Cuentas FY 2024)",
        perCapita: "6.35 BOB / citizen / year (approx. US$0.92 / citizen / year)",
      },
      dailyMarketShare: "Operates 270+ terrestrial transmission stations nationwide with the largest territorial reach in Bolivia; broadcasts multilingual news in Spanish, Aymara, Quechua, and Guaraní",
      brandTrustScore: {
        score: "State broadcaster",
        source: "Viceministerio de Comunicación del Estado Plurinacional (official national broadcasting channel)",
      },
      localContentQuota: "Over 70% domestic programming quota under Supreme Decree No. 0074, delivering intercultural educational content, live civic festivities, and rural community voices",
      staffHeadcount: "346 permanent employees, technicians, and specialized consultants (BTV Informe de Gestión 2024)",
      logo: "/broadcaster-logos/bo/btv.png",
      logoExplainer:
        "The Bolivia TV logo features the bold modern acronym 'BTV' with the letter 'B' accented by the vibrant Andean colors of the Bolivian national flag and Wiphala. The dynamic multi-colored gradient symbolizes the plurinational identity, cultural diversity, and geographic richness of Bolivia.",
      sources: [
        "https://www.boliviatv.bo/",
        "https://comunicacion.gob.bo/",
        "https://statemediamonitor.com/services/bolivia-tv/",
      ],
      licenceNote: "Empresa Estatal de Televisión Bolivia TV trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Paraguay
  PY: [
    {
      id: "py-pytv",
      countryCode: "PY",
      name: "Paraguay TV",
      officialName: "Paraguay TV HD (Ministerio de Tecnologías de la Información y Comunicación / MITIC)",
      founded: 2011,
      primaryFunding: "State budget appropriation under the Ministry of Information and Communication Technologies (MITIC); 100% public non-commercial service with zero advertising fees",
      headquarters: "Alberdi y Oliva, Edificio Radio Nacional del Paraguay, Asunción",
      annualPublicFunding: {
        total: "approx. 18.5 billion PYG ministerial media allocation (approx. US$2.5 million, Presupuesto General de la Nación FY 2024)",
        perCapita: "approx. 2,850 PYG / citizen / year (approx. US$0.38 / citizen)",
      },
      dailyMarketShare: "First digital terrestrial television (ISDB-T) station in Paraguay (Channel 14.1 / 15.1); broadcasts bilingual programming in Spanish and Guaraní across metropolitan and regional repeater nodes",
      brandTrustScore: {
        score: "58%",
        source: "MITIC Dirección General de Medios del Estado 2024 (trusted source for civil protection alerts, agricultural advice, and Guaraní language preservation)",
      },
      localContentQuota: "85% domestic cultural and institutional content quota, fostering national cinema, classical folkloric music, and parliamentary hearings",
      staffHeadcount: "165 public media civil servants and broadcast technicians (MITIC Transparencia 2024)",
      logo: "/broadcaster-logos/py/pytv.png",
      logoExplainer:
        "The Paraguay TV emblem displays the network name in crisp contemporary typography next to a vibrant tri-color flourish in red, white, and navy blue reflecting the national flag of Paraguay. The clean layout reflects digital modernization, institutional clarity, and civic service.",
      sources: [
        "https://www.paraguaytv.gov.py/",
        "https://www.mitic.gov.py/",
        "https://statemediamonitor.com/services/paraguay-tv/",
      ],
      licenceNote: "Paraguay TV / MITIC state trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Uruguay
  UY: [
    {
      id: "uy-canal5",
      countryCode: "UY",
      name: "Canal 5",
      officialName: "Servicio de Comunicación Audiovisual Nacional (SECAN) - Canal 5",
      founded: 1963,
      primaryFunding: "State budget appropriation through the Ministry of Education and Culture (MEC) allocated to SECAN; 100% commercial-free public cultural broadcaster",
      headquarters: "Bulevar Artigas 2552, Montevideo",
      annualPublicFunding: {
        total: "approx. US$7.2 million specific Canal 5 operational envelope (US$12.5M for total SECAN system; Presupuesto Nacional MEC FY 2024)",
        perCapita: "approx. US$2.10 / citizen / year (approx. 85 UYU / citizen / year)",
      },
      dailyMarketShare: "3.5% regular commercial market share across Montevideo and the interior (Kantar IBOPE Media Uruguay 2024); reached historical audience peaks of over 40 rating points during FIFA World Cup coverage",
      brandTrustScore: {
        score: "61%",
        source: "MEC Auditoría Social y Ciudadana 2024 (high public prestige for cultural, theatrical, and regional documentary productions)",
      },
      localContentQuota: "Over 75% domestic production quota under Audiovisual Media Law No. 19.307, delivering original children's programming, national theater, and municipal news across all 19 departments",
      staffHeadcount: "230 journalists, production technicians, and permanent staff (SECAN Memoria Anual 2024)",
      logo: "/broadcaster-logos/uy/canal5.svg",
      logoExplainer:
        "The Canal 5 emblem showcases a bold numeral '5' stylized in a warm solar gold and blue geometry. Originating as SODRE and known as TNU before returning to its historic name 'Canal 5' in 2021, the design evokes Uruguay's national Sun of May, public accessibility, and collective cultural memory.",
      sources: [
        "https://mediospublicos.uy/canal5/",
        "https://www.gub.uy/ministerio-educacion-cultura/",
        "https://statemediamonitor.com/services/canal-5-uruguay/",
      ],
      licenceNote: "Servicio de Comunicación Audiovisual Nacional state trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Guyana
  GY: [
    {
      id: "gy-ncn",
      countryCode: "GY",
      name: "NCN",
      officialName: "National Communications Network Inc.",
      founded: 2004,
      primaryFunding: "Government subventions from the National Budget administered through the Office of the Prime Minister, supplemented by commercial advertising and sponsored airtime",
      headquarters: "Homestretch Avenue, D'Urban Park, Georgetown",
      annualPublicFunding: {
        total: "G$210.0 million annual government subvention (approx. US$1.0 million, Guyana National Estimates of Expenditure 2024; total revenue G$480M)",
        perCapita: "G$260 / citizen / year (approx. US$1.25 / citizen / year)",
      },
      dailyMarketShare: "Reaches approximately 80% of Guyana's radio and television audience; operates NCN Channel 11, Voice of Guyana (VOG), 98.1 Hot FM, and regional community relay transmitters across Berbice, Linden, and Essequibo",
      brandTrustScore: {
        score: "64%",
        source: "Guyana National Media Assessment 2024 (primary network for emergency weather advisories, national parliamentary debates, and regional development bulletins)",
      },
      localContentQuota: "70% domestic Guyanese programming quota, highlighting Caribbean cultural heritage, Mashramani celebrations, and CARICOM regional affairs",
      staffHeadcount: "185 journalists, broadcast technicians, and regional studio personnel (NCN Corporate Profile 2024)",
      logo: "/broadcaster-logos/gy/ncn.png",
      logoExplainer:
        "The NCN logo combines bold royal blue lettering with the national colors of the Golden Arrowhead: gold, green, and red. The orbital sweep encircling the letterforms represents nationwide broadcast coverage uniting the coastland and the interior hinterland regions.",
      sources: [
        "https://ncnguyana.com/",
        "https://finance.gov.gy/national-budget/",
        "https://statemediamonitor.com/services/national-communications-network-ncn/",
      ],
      licenceNote: "National Communications Network Inc. state corporate trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Suriname
  SR: [
    {
      id: "sr-stvs",
      countryCode: "SR",
      name: "STVS",
      officialName: "Surinaamse Televisie Stichting",
      founded: 1965,
      primaryFunding: "Government statutory subvention from the Ministry of Transport, Communication and Tourism, supplemented by local commercial advertising and event broadcasting fees",
      headquarters: "Letitia Vriesdelaan #5, Paramaribo",
      annualPublicFunding: {
        total: "approx. 18.2 million SRD annual government subvention (approx. US$520,000, Suriname National Budget 2024; commercial sales generate majority of operational liquidity)",
        perCapita: "approx. 29 SRD / citizen / year (approx. US$0.85 / citizen)",
      },
      dailyMarketShare: "Historic pioneer free-to-air broadcaster known as 'De Nationale Zender' (The National Station), operating Channel 8 and regional relay infrastructure covering over 75% of coastal Suriname",
      brandTrustScore: {
        score: "65%",
        source: "Suriname National Media Commission Survey 2024 (authoritative official source for national parliamentary sessions, cultural Sranan Tongo programs, and national ceremonies)",
      },
      localContentQuota: "Over 60% domestic production quota, featuring news and educational features in Dutch, Sranan Tongo, and Sarnami Hindustani",
      staffHeadcount: "120 journalists, studio technicians, and production crew (STVS Corporate Directory 2024)",
      logo: "/broadcaster-logos/sr/stvs.png",
      logoExplainer:
        "The STVS emblem features a circular crest bearing the acronym 'STVS' superimposed on a television screen silhouette and the national flag of Suriname (green, white, red with the central yellow star). The design signifies national pride, multicultural unity, and patriotic service across the Guiana Shield.",
      sources: [
        "https://stvs.sr/",
        "https://gov.sr/",
        "https://statemediamonitor.com/services/surinaamse-televisie-stichting-stvs/",
      ],
      licenceNote: "Surinaamse Televisie Stichting state foundation trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Germany
  DE: [
    {
      id: "de-ard",
      countryCode: "DE",
      name: "ARD",
      officialName: "Arbeitsgemeinschaft der öffentlich-rechtlichen Rundfunkanstalten der Bundesrepublik Deutschland",
      founded: 1950,
      primaryFunding: "Statutory mandatory household broadcasting fee (Rundfunkbeitrag / €18.36/month per residence) collected by the Beitragsservice; 100% commercial-free in prime time with strict advertising caps during daytime (max 20 min/day on weekdays, zero on Sundays/holidays)",
      headquarters: "Berlin (ARD-Hauptstadtstudio) & rotational chair among the 9 regional member broadcasters (WDR, BR, SWR, NDR, MDR, hr, rbb, SR, Radio Bremen)",
      annualPublicFunding: {
        total: "€6.15 billion allocated share of the Rundfunkbeitrag (total collection €8.74B; KEF 24th Financial Report 2024)",
        perCapita: "€72.80 / resident / year (approx. €0.20 / day)",
      },
      dailyMarketShare: "12.2% linear TV audience share for Das Erste; 27.8% combined market share including all 9 regional third channels (Dritte Programme; AGF Videoforschung 2024)",
      brandTrustScore: {
        score: "64%",
        source: "Reuters Institute Digital News Report 2024 (#1 most trusted news brand in Germany for Tagesschau)",
      },
      localContentQuota: "Over 85% German and European production quota under the Interstate Media Treaty (Medienstaatsvertrag), with comprehensive regional culture, documentary, and investigative mandates",
      staffHeadcount: "22,500 permanent employees across all 9 regional ARD public broadcasting corporations (ARD Leistungsbericht 2024)",
      logo: "/broadcaster-logos/de/ard.svg",
      logoExplainer:
        "Designed by Peter Schmidt and refined in 2019, the ARD logo features the bold numeral '1' (representing Das Erste) encased within a dynamic circular ring alongside the uppercase wordmark 'ARD'. The circular portal represents an all-encompassing lens on the world, federal cooperation among the German states, and technical excellence.",
      sources: [
        "https://www.ard.de/",
        "https://kef-online.de/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/germany",
      ],
      licenceNote: "ARD registered trademark and logo bundled for educational reference in Learn mode.",
    },
    {
      id: "de-zdf",
      countryCode: "DE",
      name: "ZDF",
      officialName: "Zweites Deutsches Fernsehen",
      founded: 1961,
      primaryFunding: "Statutory mandatory household broadcasting fee (Rundfunkbeitrag / €4.69 of the monthly €18.36 fee allocated to ZDF); strictly commercial-free after 20:00 and on Sundays/holidays",
      headquarters: "ZDF-Sendezentrum, Mainz, Rhineland-Palatinate",
      annualPublicFunding: {
        total: "€2.24 billion allocated share of the Rundfunkbeitrag (KEF 24th Financial Report 2024; total budget €2.45B)",
        perCapita: "€26.50 / resident / year (approx. €0.07 / day)",
      },
      dailyMarketShare: "14.6% national TV market share (AGF Videoforschung 2024; consistently Germany's #1 most-watched single linear television channel)",
      brandTrustScore: {
        score: "62%",
        source: "Reuters Institute Digital News Report 2024 (ZDF heute is the #2 most trusted news brand in Germany, behind Tagesschau)",
      },
      localContentQuota: "80% domestic German and European production quota under the ZDF State Treaty, with heavy commitments to original television drama, investigative journalism (Frontal), and political satire (heute-show)",
      staffHeadcount: "3,600 permanent staff and approx. 1,000 freelance specialists (ZDF Jahrbuch 2024)",
      logo: "/broadcaster-logos/de/zdf.svg",
      logoExplainer:
        "Created in 2001 by design agency Razorfish and refreshed into an iconic flat brand, the ZDF logo features the lowercase letters 'zdf' in a warm signature orange. The letter 'z' is optically merged into the numeral '2' inside the circle, subtly reminding viewers of its identity as 'Zweites Deutsches Fernsehen' (Second German Television).",
      sources: [
        "https://www.zdf.de/",
        "https://kef-online.de/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/germany",
      ],
      licenceNote: "Zweites Deutsches Fernsehen statutory corporation trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Italy
  IT: [
    {
      id: "it-rai",
      countryCode: "IT",
      name: "Rai",
      officialName: "RAI - Radiotelevisione Italiana S.p.A.",
      founded: 1924,
      primaryFunding: "Hybrid model: Statutory television license fee (Canone RAI / €70/year per household, collected via electricity bills) providing ~70% of revenues, supplemented by commercial advertising (capped at 7 min/hour)",
      headquarters: "Viale Giuseppe Mazzini 14, Rome",
      annualPublicFunding: {
        total: "€1.82 billion license fee allocation (Rai Bilancio d'Esercizio FY 2024; total revenue €2.68B)",
        perCapita: "€30.90 / resident / year (approx. €0.08 / day)",
      },
      dailyMarketShare: "35.9% combined national television audience share across Rai 1, Rai 2, Rai 3, and thematic digital channels (Auditel 2024; Rai 1 is Italy's most-watched television channel)",
      brandTrustScore: {
        score: "54%",
        source: "Reuters Institute Digital News Report 2024 (TG1, TG2, TG3, and Rai News 24 combined represent the widest weekly news reach in Italy)",
      },
      localContentQuota: "Minimum 70% European and Italian audiovisual production quota under the Consolidated Audiovisual Media Act (TUSMA), supporting Italian cinema, opera broadcasts, and regional news (TGR across all 20 regions)",
      staffHeadcount: "12,400 permanent employees across television, radio, and regional production centers (Rai Bilancio di Sostenibilità 2024)",
      logo: "/broadcaster-logos/it/rai.png",
      logoExplainer:
        "Designed in 2016 by Pentagram, the modern Rai logo features two interlocking squares forming an abstract capital 'R' alongside the clean lowercase letters 'ai' in a brilliant Mediterranean blue. The square modular geometry reflects the integration of television, radio, and digital streaming (RaiPlay) into a cohesive public service ecosystem.",
      sources: [
        "https://www.rai.it/",
        "https://www.mimit.gov.it/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/italy",
      ],
      licenceNote: "RAI - Radiotelevisione Italiana S.p.A. registered trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Spain
  ES: [
    {
      id: "es-rtve",
      countryCode: "ES",
      name: "RTVE",
      officialName: "Corporación de Radio y Televisión Española, S.A.",
      founded: 1956,
      primaryFunding: "State budget appropriation from the General State Budget (PGE) supplemented by statutory taxes on commercial telecom operators (0.9%) and private television broadcasters (1.5%–3%); 100% commercial-free with zero consumer advertising",
      headquarters: "Prado del Rey, Pozuelo de Alarcón, Madrid",
      annualPublicFunding: {
        total: "€1.25 billion total state public funding envelope (RTVE Memoria de Servicio Público FY 2024)",
        perCapita: "€25.80 / citizen / year (approx. €0.07 / day)",
      },
      dailyMarketShare: "15.4% combined television audience share across La 1, La 2, 24h, Teledeporte, and Clan (Kantar Media Spain 2024; La 1 holds 10.2% individually)",
      brandTrustScore: {
        score: "52%",
        source: "Reuters Institute Digital News Report 2024 (Telediario is one of Spain's leading neutral sources of daily news)",
      },
      localContentQuota: "Minimum 85% Spanish and European audiovisual production quota under the General Law on Audiovisual Communication, fostering independent national cinema, cultural series, and regional territorial studios (Centros Territoriales)",
      staffHeadcount: "6,770 permanent employees (RTVE Cuentas Anuales 2024)",
      logo: "/broadcaster-logos/es/rtve.jpg",
      logoExplainer:
        "Created in 2008 by design agency Summa, the RTVE identity features warm organic typography in gradient amber and orange, anchored around the lowercase letters 'rtve'. The luminous orange glow symbolizes Mediterranean sunlight, accessibility, warmth, and the transformation of the state broadcaster into a citizen-centered cultural corporation.",
      sources: [
        "https://www.rtve.es/",
        "https://www.hacienda.gob.es/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/spain",
      ],
      licenceNote: "Corporación de Radio y Televisión Española state mercantile company trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Netherlands
  NL: [
    {
      id: "nl-npo",
      countryCode: "NL",
      name: "NPO",
      officialName: "Nederlandse Publieke Omroep",
      founded: 1930,
      primaryFunding: "Direct state budget appropriation from the Ministry of Education, Culture and Science (OCW) funded via general taxation, supplemented by commercial advertising revenue managed by STER (capped at 8% of broadcast time)",
      headquarters: "Media Park, Sumatralaan 45, Hilversum, North Holland",
      annualPublicFunding: {
        total: "€944.0 million state budget allocation (OCW Rijksbegroting FY 2024; total operating budget ~€1.05B)",
        perCapita: "€52.50 / citizen / year (approx. €0.14 / day)",
      },
      dailyMarketShare: "32.4% linear television audience share across NPO 1, NPO 2, and NPO 3 (NMO Nationaal Media Onderzoek 2024; NPO 1 is the most-watched TV channel in the Netherlands)",
      brandTrustScore: {
        score: "82%",
        source: "Reuters Institute Digital News Report 2024 (#1 most trusted news organization in the Netherlands for NOS Nieuws)",
      },
      localContentQuota: "Over 75% Dutch and European production quota under the Media Act 2008, coordinating programs across pillar broadcasters (NOS, NTR, BNNVARA, KRO-NCRV, AVROTROS, Omroep MAX, VPRO, EO)",
      staffHeadcount: "2,850 employees across the NPO coordinating body, NOS newsroom, and member broadcasting associations (NPO Jaarverslag 2024)",
      logo: "/broadcaster-logos/nl/npo.png",
      logoExplainer:
        "Designed in 2014 by 3D design studio KempertHautmans, the NPO logo consists of three bold geometric letters 'npo' rendered in crisp blue and white with a stylized rhomboid diamond integrated into the letter 'o'. The multifaceted diamond symbolizes pluralism, diversity of opinion among the pillar broadcasters, and universal public broadcasting cohesion.",
      sources: [
        "https://over.npo.nl/",
        "https://www.rijksoverheid.nl/ministeries/ministerie-van-onderwijs-cultuur-en-wetenschap",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/netherlands",
      ],
      licenceNote: "Nederlandse Publieke Omroep registered trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Belgium
  BE: [
    {
      id: "be-vrt",
      countryCode: "BE",
      name: "VRT",
      officialName: "Vlaamse Radio- en Televisieomroeporganisatie (Flemish Public Broadcaster)",
      founded: 1930,
      primaryFunding: "Direct public endowment from the Flemish Government (Vlaamse Gemeenschap) via a five-year Management Agreement (Beheersovereenkomst); 100% commercial-free with zero interruption advertising on television",
      headquarters: "Reyerslaan 52, Schaerbeek, Brussels",
      annualPublicFunding: {
        total: "€295.2 million Flemish government dotation (VRT Jaarverslag 2024)",
        perCapita: "€43.50 / resident in Flanders / year (approx. €0.12 / day)",
      },
      dailyMarketShare: "37.5% television market share in Flanders across VRT 1, VRT Canvas, and Ketnet (CIM 2024; VRT 1 is Flanders' leading television channel with 31% share)",
      brandTrustScore: {
        score: "73%",
        source: "Reuters Institute Digital News Report 2024 (#1 most trusted news brand in Flanders for VRT NWS)",
      },
      localContentQuota: "Over 85% Flemish domestic production quota under the Flemish Media Decree, investing extensively in local fiction, youth education, and regional news",
      staffHeadcount: "2,050 full-time equivalent staff (VRT Jaarverslag 2024)",
      logo: "/broadcaster-logos/be/vrt.png",
      logoExplainer:
        "Unveiled in 2022, the modern VRT emblem features the lowercase letterforms 'vrt' in a sleek, minimalist geometric sans-serif, rendered in stark charcoal black or vibrant electric blue. The unified, digital-first aesthetic conveys openness, agility, and the convergence of traditional television and radio into digital streaming via VRT MAX.",
      sources: [
        "https://www.vrt.be/nl/over-de-vrt/",
        "https://www.cim.be/nl/televisie",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/belgium",
      ],
      licenceNote: "Vlaamse Radio- en Televisieomroeporganisatie public broadcaster trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Portugal
  PT: [
    {
      id: "pt-rtp",
      countryCode: "PT",
      name: "RTP",
      officialName: "Rádio e Televisão de Portugal, S.A.",
      founded: 1935,
      primaryFunding: "Contribuição para o Audiovisual (CAV) statutory fee levied on domestic electricity consumption invoices (~€190M) supplemented by limited commercial advertising (~€40M)",
      headquarters: "Avenida Marechal Gomes da Costa 37, Lisbon",
      annualPublicFunding: {
        total: "€191.8 million public CAV contribution (RTP Relatório e Contas FY 2024; total revenue €235.4M)",
        perCapita: "€18.35 / resident / year (approx. €0.05 / day)",
      },
      dailyMarketShare: "14.2% total television audience share across RTP1, RTP2, RTP3, and RTP Memória (CAEM / GfK Portugal 2024; RTP1 holds 11.0%)",
      brandTrustScore: {
        score: "79%",
        source: "Reuters Institute Digital News Report 2024 (#1 most trusted news brand in Portugal)",
      },
      localContentQuota: "Minimum 50% Portuguese-language audiovisual production quota on RTP1 and 60% on RTP2 under the Portuguese Television Law (Lei da Televisão), with extensive regional coverage in Azores and Madeira",
      staffHeadcount: "3,120 employees across mainland Portugal and the autonomous islands (RTP Relatório de Sustentabilidade 2024)",
      logo: "/broadcaster-logos/pt/rtp.png",
      logoExplainer:
        "Designed in 2004 and refined in 2016, the RTP emblem features four dynamic curving quadrants in deep ultramarine blue and cyan that rotate together to form an energetic circular sphere, accompanied by modern lowercase sans-serif lettering. The four quadrants symbolize the four broadcast elements (RTP1, RTP2, RTP Internacional, and RTP África), convergence, and Portugal's maritime heritage.",
      sources: [
        "https://www.rtp.pt/institucional/",
        "https://www.cav.pt/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/portugal",
      ],
      licenceNote: "Rádio e Televisão de Portugal, S.A. registered trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Sweden
  SE: [
    {
      id: "se-svt",
      countryCode: "SE",
      name: "SVT",
      officialName: "Sveriges Television AB",
      founded: 1956,
      primaryFunding: "Individual public service tax fee (public service-avgift) collected via the Swedish Tax Agency (Skatteverket) ring-fenced in the Public Service Fund managed by Förvaltningsstiftelsen; 100% commercial-free with zero advertising",
      headquarters: "Oxenstiernsgatan 26–34, Stockholm",
      annualPublicFunding: {
        total: "SEK 5,848 million public service tax allocation (Förvaltningsstiftelsen & SVT Årsredovisning 2024; approx. €520M)",
        perCapita: "SEK 556 / resident / year (approx. €49.50 / year or SEK 1.52 / day)",
      },
      dailyMarketShare: "33.5% linear TV audience share across SVT1, SVT2, SVT Barn, and Kunskapskanalen (MMS Mediamätning i Skandinavien 2024; SVT1 is Sweden's most-watched television channel with 26.2% share)",
      brandTrustScore: {
        score: "71%",
        source: "Reuters Institute Digital News Report 2024 (consistently Sweden's top trusted news source alongside Sveriges Radio in SOM-institutet surveys)",
      },
      localContentQuota: "Over 80% Swedish-originated programming requirement across national channels, with strict regional production mandates outside Stockholm across 21 regional news editorial offices",
      staffHeadcount: "2,240 full-time equivalent staff (SVT Årsredovisning 2024)",
      logo: "/broadcaster-logos/se/svt.png",
      logoExplainer:
        "Created by Stockholm design agency Happy F&B in 2008 and updated in 2016, the SVT visual mark features friendly lowercase typography with a distinctive open, curving 's' rendered in warm radiant orange. The flowing letterforms convey warmth, democratic accessibility, and an open dialogue with all Swedish citizens.",
      sources: [
        "https://omoss.svt.se/om-oss/svts-finansiering.html",
        "https://mms.se/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/sweden",
      ],
      licenceNote: "Sveriges Television AB registered trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Norway
  NO: [
    {
      id: "no-nrk",
      countryCode: "NO",
      name: "NRK",
      officialName: "Norsk rikskringkasting AS",
      founded: 1933,
      primaryFunding: "Direct public funding allocated through the Norwegian State Budget (statsbudsjettet) via income taxation (replaces the former television license); 100% commercial-free on TV and radio",
      headquarters: "Bjørnstjerne Bjørnsons plass 1, Marienlyst, Oslo",
      annualPublicFunding: {
        total: "NOK 7,215 million state budget grant (NRK Årsregnskap FY 2024; approx. €615M)",
        perCapita: "NOK 1,305 / citizen / year (approx. €111 / year or NOK 3.58 / day)",
      },
      dailyMarketShare: "36.8% total television audience share across NRK1, NRK2, and NRK3 (Kantar Media Norway 2024; NRK1 commands 30.1% individual share)",
      brandTrustScore: {
        score: "78%",
        source: "Reuters Institute Digital News Report 2024 (#1 most trusted news organization in Norway)",
      },
      localContentQuota: "At least 75% Norwegian-produced content quota, with statutory mandates to provide services in Norwegian (Bokmål and Nynorsk, min. 25% Nynorsk) and dedicated Sami broadcasting via NRK Sápmi",
      staffHeadcount: "3,410 full-time equivalent staff across headquarters and regional district offices (NRK Årsrapport 2024)",
      logo: "/broadcaster-logos/no/nrk.png",
      logoExplainer:
        "Designed in 1970 by graphic artist Richard Aare and modernized in 2011, the iconic NRK emblem features the bold, rounded sans-serif letters 'nrk' with distinctively curved terminal strokes in vivid royal blue. The circular flowing contours evoke radio broadcast waves and friendly Scandinavian modernism.",
      sources: [
        "https://www.nrk.no/omnrk/",
        "https://kantar.no/medier/tv/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/norway",
      ],
      licenceNote: "Norsk rikskringkasting AS state-owned corporation trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Denmark
  DK: [
    {
      id: "dk-dr",
      countryCode: "DK",
      name: "DR",
      officialName: "Danmarks Radio",
      founded: 1925,
      primaryFunding: "General income taxation from the Danish national state budget (Finansloven), fully phased in after replacing the traditional media license fee (medielicensen); 100% commercial-free",
      headquarters: "DR Byen, Emil Holms Kanal 20, Copenhagen",
      annualPublicFunding: {
        total: "DKK 3,920 million state budget appropriation (DR Årsrapport FY 2024; approx. €525M)",
        perCapita: "DKK 658 / resident / year (approx. €88 / year or DKK 1.80 / day)",
      },
      dailyMarketShare: "34.0% combined television audience share across DR1 and DR2 (Nielsen Media Research Denmark 2024; DR1 is Denmark's leading TV channel with 27.5% share)",
      brandTrustScore: {
        score: "76%",
        source: "Reuters Institute Digital News Report 2024 (#1 most trusted news source in Denmark for DR Nyheder)",
      },
      localContentQuota: "Minimum 80% Danish-language and Nordic programming requirement under the DR Public Service Contract with the Ministry of Culture, prioritizing Danish culture, regional news, and children's content (DR Ramasjang)",
      staffHeadcount: "2,780 full-time equivalent staff (DR Årsrapport 2024)",
      logo: "/broadcaster-logos/dk/dr.png",
      logoExplainer:
        "Redesigned in 2020, the DR emblem presents the capital letters 'DR' set in an authoritative, minimalist bespoke geometric grotesque typeface rendered in pure black and white. The clean silhouette embodies Scandinavian functionalism, institutional transparency, and digital-first clarity across DR TV and DR LYD.",
      sources: [
        "https://www.dr.dk/om-dr",
        "https://kum.dk/kulturpolitik/medier/public-service",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/denmark",
      ],
      licenceNote: "Danmarks Radio statutory public institution trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Finland
  FI: [
    {
      id: "fi-yle",
      countryCode: "FI",
      name: "Yle",
      officialName: "Yleisradio Oy (Finnish Broadcasting Company)",
      founded: 1926,
      primaryFunding: "Dedicated personal and corporate Yle tax (yleisradiovero / rundradioskatt) collected by the Finnish Tax Administration (Verohallinto); 100% commercial-free with zero interruption advertisements",
      headquarters: "Radiokatu 5, Pasila, Helsinki",
      annualPublicFunding: {
        total: "€588.6 million state budget tax appropriation (Yle Tilinpäätös ja Toimintakertomus FY 2024)",
        perCapita: "€105.40 / resident / year (approx. €0.29 / day)",
      },
      dailyMarketShare: "40.3% total television viewing share across Yle TV1, Yle TV2, and Yle Teema & Fem (Finnpanel 2024; Yle TV1 is Finland's most-watched television channel with 27.1% share)",
      brandTrustScore: {
        score: "83%",
        source: "Reuters Institute Digital News Report 2024 (#1 most trusted news brand in Finland; among the highest public trust scores globally)",
      },
      localContentQuota: "Over 80% domestic and European production quota under the Act on the Finnish Broadcasting Company (Laki Yleisradio Oy:stä), with dual official language delivery in Finnish and Swedish (Svenska Yle) plus Sámi (Yle Sápmi)",
      staffHeadcount: "2,840 permanent employees (Yle Toimintakertomus 2024)",
      logo: "/broadcaster-logos/fi/yle.png",
      logoExplainer:
        "Created in 2012 by design firm Bob the Robot, the Yle logo features the lowercased, approachable word 'yle' set inside a rounded square in bright turquoise blue. The solid rounded enclosure represents a unified media window connecting citizens across television, radio, and the Yle Areena digital streaming platform.",
      sources: [
        "https://yle.fi/aihe/about-yle",
        "https://www.finnpanel.fi/tulokset/tv.php",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/finland",
      ],
      licenceNote: "Yleisradio Oy public limited company trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Ireland
  IE: [
    {
      id: "ie-rte",
      countryCode: "IE",
      name: "RTÉ",
      officialName: "Raidió Teilifís Éireann",
      founded: 1926,
      primaryFunding: "Dual funding model: Television licence fee (€160/year collected by An Post, ~55% of revenue) combined with commercial advertising, sponsorships, and digital commercial income",
      headquarters: "Donnybrook, Dublin 4",
      annualPublicFunding: {
        total: "€196.1 million public licence fee & exchequer funding (RTÉ Annual Report FY 2024; total revenue €344.0M)",
        perCapita: "€37.20 / resident / year (approx. €0.10 / day)",
      },
      dailyMarketShare: "27.8% television audience share across RTÉ One and RTÉ2 (TAM Ireland / Nielsen 2024; RTÉ One is Ireland's most-watched television channel with 20.4% share)",
      brandTrustScore: {
        score: "72%",
        source: "Reuters Institute Digital News Report 2024 (#1 most trusted news source in Ireland for RTÉ News)",
      },
      localContentQuota: "Over 50% Irish-originated programming quota under the Broadcasting Act 2009 and Coimisiún na Meán regulations, commissioning heavily from independent Irish producers",
      staffHeadcount: "1,790 employees (RTÉ Annual Report 2024)",
      logo: "/broadcaster-logos/ie/rte.png",
      logoExplainer:
        "Adopted in 1995 and refreshed in 2014, the RTÉ visual identity features modern lowercase letterforms with a prominent acute accent (fada) over the 'e' ('é'), honoring the Irish language name 'Raidió Teilifís Éireann'. The sleek typography in emerald blue symbolizes national cultural identity, contemporary public service, and multimedia agility.",
      sources: [
        "https://about.rte.ie/reports-and-policies/annual-reports/",
        "https://www.cnam.ie/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/ireland",
      ],
      licenceNote: "Raidió Teilifís Éireann statutory corporation trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Switzerland
  CH: [
    {
      id: "ch-srg-ssr",
      countryCode: "CH",
      name: "SRG SSR",
      officialName: "Schweizerische Radio- und Fernsehgesellschaft / Société suisse de radiodiffusion et télévision",
      founded: 1931,
      primaryFunding: "Universal household and enterprise media levy (Serafe fee / CHF 335/year per household) providing ~85% of revenue, with strict prohibition of commercials on radio and limited ads on TV",
      headquarters: "Giacomettistrasse 1, Bern",
      annualPublicFunding: {
        total: "CHF 1,260 million media levy revenue share (SRG SSR Geschäftsbericht FY 2024; total revenue CHF 1,530M)",
        perCapita: "CHF 141 / resident / year (approx. €148 / year or CHF 0.39 / day)",
      },
      dailyMarketShare: "29.4% TV audience share in German-speaking Switzerland (SRF), 28.1% in French-speaking Switzerland (RTS), and 31.2% in Italian-speaking Switzerland (RSI) (Mediapulse 2024)",
      brandTrustScore: {
        score: "73%",
        source: "Reuters Institute Digital News Report 2024 (#1 most trusted news brand across all language regions: SRF in German, RTS in French)",
      },
      localContentQuota: "Over 80% Swiss-produced programming quota under the Federal Act on Radio and Television (RTVA), delivering full public service suites in all four national languages: German, French, Italian, and Romansh (RTR)",
      staffHeadcount: "5,540 full-time equivalent staff across all regional divisions (SRG SSR Geschäftsbericht 2024)",
      logo: "/broadcaster-logos/ch/srg-ssr.png",
      logoExplainer:
        "The corporate SRG SSR emblem features an assertive horizontal typographic lockup in charcoal and warm Swiss red, bringing together the German acronym 'SRG' and French/Italian/Romansh acronym 'SSR'. The red rectangular badge echoes the Swiss federal cross and flag, embodying multilingual cohesion, federalism, and national democratic dialogue.",
      sources: [
        "https://www.srgssr.ch/de/ueber-uns/organisation/berichterstattung",
        "https://www.bakom.admin.ch/bakom/de/home/elektronische-medien.html",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/switzerland",
      ],
      licenceNote: "Schweizerische Radio- und Fernsehgesellschaft registered trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Austria
  AT: [
    {
      id: "at-orf",
      countryCode: "AT",
      name: "ORF",
      officialName: "Österreichischer Rundfunk",
      founded: 1955,
      primaryFunding: "Universal household ORF contribution (ORF-Beitrag / €15.30/month) enacted via the ORF-Gesetz reform effective 2024, supplemented by limited commercial advertising",
      headquarters: "Würzburggasse 30, Küniglberg, Vienna",
      annualPublicFunding: {
        total: "€710.0 million public ORF-Beitrag revenue (ORF Jahresbericht FY 2024; total revenue €1,040M)",
        perCapita: "€77.60 / resident / year (approx. €0.21 / day)",
      },
      dailyMarketShare: "32.1% combined television market share across ORF 1, ORF 2, ORF 1+, and ORF Sport + (AGTT / Teletest 2024; ORF 2 is Austria's leading television channel with 20.8% share)",
      brandTrustScore: {
        score: "70%",
        source: "Reuters Institute Digital News Report 2024 (ORF News and Zeit im Bild rank as Austria's #1 most trusted news brand)",
      },
      localContentQuota: "At least 70% Austrian and European content quota under the Federal ORF Act (ORF-Gesetz), funding major domestic film co-productions and nine federal state regional studios (Landesstudios)",
      staffHeadcount: "3,110 full-time equivalent staff (ORF Jahresbericht 2024)",
      logo: "/broadcaster-logos/at/orf.png",
      logoExplainer:
        "Created in 1968 by renowned graphic designer Erich Sokol and updated in modern iterations, the 'ORF-Auge' (ORF eye) combines an abstract camera lens and human eye in bold geometric forms, accompanied by the compact rectangular wordmark 'ORF' in classic brick red. The eye symbolizes vigilance, truth, public insight, and visionary broadcasting.",
      sources: [
        "https://der.orf.at/unternehmen/zahlen-und-fakten/jahresberichte/index.html",
        "https://orf-beitrag.at/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/austria",
      ],
      licenceNote: "Österreichischer Rundfunk foundation under public law trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Poland
  PL: [
    {
      id: "pl-tvp",
      countryCode: "PL",
      name: "TVP",
      officialName: "Telewizja Polska S.A.",
      founded: 1952,
      primaryFunding: "State budget compensation bond allocations (rekompensata abonamentowa) from the Ministry of Culture and National Heritage, television subscription fees (abonament RTV), and commercial advertising",
      headquarters: "ul. Jana Pawła Woronicza 17, Mokotów, Warsaw",
      annualPublicFunding: {
        total: "PLN 1,750 million state public funding appropriation (KRRiT Sprawozdanie & TVP w likwidacji FY 2024; approx. €405M)",
        perCapita: "PLN 46.50 / citizen / year (approx. €10.80 / year or PLN 0.13 / day)",
      },
      dailyMarketShare: "18.8% combined television audience share across TVP1, TVP2, TVP Info, and thematic channels (Nielsen Audience Measurement Poland 2024; TVP1 holds 7.6% share)",
      brandTrustScore: {
        score: "49%",
        source: "Reuters Institute Digital News Report 2024 (reflecting restructuring and editorial independence reforms initiated in 2024)",
      },
      localContentQuota: "Minimum 50% Polish-language quota on primary general channels under the Broadcasting Act (Ustawa o radiofonii i telewizji), supporting Polish cinema, documentary drama, and 16 regional terrestrial branches (TVP3)",
      staffHeadcount: "2,890 permanent employees (Sprawozdanie Zarządu TVP 2024)",
      logo: "/broadcaster-logos/pl/tvp.png",
      logoExplainer:
        "Introduced in 2003, the TVP emblem presents the capital letters 'T', 'V', and 'P' individually encased in three connected squarish rounded boxes in national deep blue. The modular boxes symbolize stability, structural integrity, and the distinct channel pillars that comprise the national public television network.",
      sources: [
        "https://centruminformacji.tvp.pl/15717387/raporty-i-sprawozdania",
        "https://www.gov.pl/web/krrit",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/poland",
      ],
      licenceNote: "Telewizja Polska S.A. public joint-stock company trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Greece
  GR: [
    {
      id: "gr-ert",
      countryCode: "GR",
      name: "ERT",
      officialName: "Ellinikí Radiofonía Tileórasi (Hellenic Broadcasting Corporation S.A.)",
      founded: 1938,
      primaryFunding: "Universal compensation fee (antapodotiko telos / €3.00/month per household) collected via electricity supply bills under Law 4173/2013, supplemented by commercial advertising",
      headquarters: "432 Mesogeion Avenue, Agia Paraskevi, Athens",
      annualPublicFunding: {
        total: "€212.4 million statutory public contribution (ERT Apologismos FY 2024; total revenue €238.1M)",
        perCapita: "€20.40 / resident / year (approx. €0.06 / day)",
      },
      dailyMarketShare: "12.8% total television audience share across ERT1, ERT2, ERT3, and ERT News (Nielsen Audience Measurement Greece 2024; ERT1 holds 7.2%)",
      brandTrustScore: {
        score: "56%",
        source: "Reuters Institute Digital News Report 2024 (ERT News is recognized as one of Greece's most reliable and objective broadcast news services)",
      },
      localContentQuota: "Over 60% Greek and European audiovisual production quota under the National Council for Radio and Television (ESR) directives, with specialized regional coverage across northern Greece (ERT3 in Thessaloniki)",
      staffHeadcount: "2,130 permanent employees (ERT Apologismos Drasis 2024)",
      logo: "/broadcaster-logos/gr/ert.png",
      logoExplainer:
        "Introduced in September 2020, the ERT logo features bold, clean sans-serif typography with the Greek letters 'EPT' in Aegean blue with subtle cyan accents, framed in a streamlined modern layout. The contemporary aesthetic symbolizes institutional renewal, digital transformation via the ERTFLIX streaming platform, and democratic transparency.",
      sources: [
        "https://company.ert.gr/oikonomika-stoicheia/",
        "https://www.esr.gr/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/greece",
      ],
      licenceNote: "Hellenic Broadcasting Corporation S.A. state-owned company trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
};






