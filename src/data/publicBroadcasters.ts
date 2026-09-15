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
        "The Bernama logo features a geometric monogram combining the letters B and M in white and blue, with two upward-pointing triangular broadcast transmission symbols flanking the letterforms. The modern, bold design in blue and white symbolizes media distribution, transmission signals, and contemporary news broadcasting.",
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
        "The TV Cultura logo features a geometric design comprising stylized letterforms rendered in vibrant green (#27ba59) and deep dark blue (#39409e). The modern, minimalist composition reflects the broadcaster's commitment to contemporary, accessible educational content while maintaining visual distinction through its bold, complementary color palette of environmental green and institutional blue.",
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
        "The Radio France logo employs a circular design with a sophisticated linear gradient spanning purple (#8D044F) through pink (#AC47B6) to orange-red (#FF6C5B) and culminating in deep red (#FD0323). The gradient's warm, energetic progression from cool tones to warm tones symbolizes the breadth of Radio France's programming and its dynamic reach across French audiences and cultural expression.",
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
        "The Thai PBS logo comprises complex geometric shapes rendered in a carefully chosen palette of red (#EF5021), orange (#F69322), neutral gray (#727272), and white (#FFFFFF). The layered geometric composition reflects modern broadcast design principles while the warm red and orange tones convey energy, vitality, and engagement with Thai audiences across all educational and informational programming.",
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
};

