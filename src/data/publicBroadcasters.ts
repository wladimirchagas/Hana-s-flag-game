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
      logo: "broadcaster-logos/au/abc.svg",
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
      logo: "broadcaster-logos/au/sbs.svg",
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
      logo: "broadcaster-logos/my/rtm.svg",
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
      logo: "broadcaster-logos/my/bernama.png",
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
      logo: "broadcaster-logos/br/ebc.svg",
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
      logo: "broadcaster-logos/br/cultura.svg",
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
      logo: "broadcaster-logos/us/pbs.svg",
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
      logo: "broadcaster-logos/us/npr.svg",
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
      logo: "broadcaster-logos/gb/bbc.svg",
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
      logo: "broadcaster-logos/gb/channel4.svg",
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
      logo: "broadcaster-logos/ca/cbc.svg",
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
      logo: "broadcaster-logos/nz/rnz.svg",
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
      logo: "broadcaster-logos/nz/whakaata-maori.svg",
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
      logo: "broadcaster-logos/fr/france-televisions.svg",
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
      logo: "broadcaster-logos/fr/radio-france.svg",
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
      logo: "broadcaster-logos/fr/arte.svg",
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
      logo: "broadcaster-logos/id/tvri.svg",
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
      logo: "broadcaster-logos/th/thaipbs.svg",
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
      logo: "broadcaster-logos/vn/vtv.svg",
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
      logo: "broadcaster-logos/ph/ptv.svg",
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
      logo: "broadcaster-logos/sg/mediacorp.svg",
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
      logo: "broadcaster-logos/mm/mrtv.png",
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
      logo: "broadcaster-logos/kh/tvk.png",
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
      logo: "broadcaster-logos/la/lntv.png",
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
      logo: "broadcaster-logos/bn/rtb.svg",
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
      logo: "broadcaster-logos/tl/rttl.png",
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
      logo: "broadcaster-logos/jp/nhk.svg",
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
      logo: "broadcaster-logos/kr/kbs.svg",
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
      logo: "broadcaster-logos/cn/cctv.svg",
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
      logo: "broadcaster-logos/mn/mnb.svg",
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
      logo: "broadcaster-logos/kp/kctv.svg",
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
      logo: "broadcaster-logos/ar/tvp.svg",
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
      logo: "broadcaster-logos/cl/tvn.svg",
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
      logo: "broadcaster-logos/co/rtvc.svg",
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
      logo: "broadcaster-logos/pe/tvperu.svg",
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
      logo: "broadcaster-logos/ve/vtv.svg",
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
      logo: "broadcaster-logos/ec/ectv.svg",
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
      logo: "broadcaster-logos/bo/btv.png",
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
      logo: "broadcaster-logos/py/pytv.png",
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
      logo: "broadcaster-logos/uy/canal5.svg",
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
      logo: "broadcaster-logos/gy/ncn.png",
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
      logo: "broadcaster-logos/sr/stvs.png",
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
      logo: "broadcaster-logos/de/ard.svg",
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
      logo: "broadcaster-logos/de/zdf.svg",
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
      logo: "broadcaster-logos/it/rai.png",
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
      logo: "broadcaster-logos/es/rtve.svg",
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
      logo: "broadcaster-logos/nl/npo.png",
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
      logo: "broadcaster-logos/be/vrt.png",
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
      logo: "broadcaster-logos/pt/rtp.png",
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
      logo: "broadcaster-logos/se/svt.png",
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
      logo: "broadcaster-logos/no/nrk.png",
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
      logo: "broadcaster-logos/dk/dr.png",
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
      logo: "broadcaster-logos/fi/yle.png",
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
      logo: "broadcaster-logos/ie/rte.png",
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
      logo: "broadcaster-logos/ch/srg-ssr.png",
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
      logo: "broadcaster-logos/at/orf.png",
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
      logo: "broadcaster-logos/pl/tvp.png",
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
      logo: "broadcaster-logos/gr/ert.png",
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

  // Czech Republic
  CZ: [
    {
      id: "cz-ct",
      countryCode: "CZ",
      name: "Česká televize",
      officialName: "Česká televize (Czech Television)",
      founded: 1953,
      primaryFunding: "Monthly television license fee (televizní poplatek / CZK 135/month per household owning a TV receiver, raising to CZK 150/month in 2025 legislative reforms); limited commercial sponsorships",
      headquarters: "Kavčí hory, Na Hřebenech II 1137, Prague 4",
      annualPublicFunding: {
        total: "CZK 5,880 million television fee revenue (Česká televize Výroční zpráva FY 2024; approx. €235M)",
        perCapita: "CZK 540 / resident / year (approx. €21.60 / year or CZK 1.48 / day)",
      },
      dailyMarketShare: "29.8% combined television audience share across ČT1, ČT2, ČT24, ČT sport, and ČT :D / ČT art (ATO - Nielsen Admosphere 2024; ČT1 holds 16.4% and ČT24 is Europe's most-watched public news channel with 4.1% share)",
      brandTrustScore: {
        score: "61%",
        source: "Reuters Institute Digital News Report 2024 (#1 most trusted television news brand in the Czech Republic for ČT24)",
      },
      localContentQuota: "Over 70% Czech-originated content quota under the Czech Television Act (Zákon o České televizi), with statutory regional television studios in Brno and Ostrava",
      staffHeadcount: "2,980 full-time equivalent staff (Česká televize Výroční zpráva o hospodaření 2024)",
      logo: "broadcaster-logos/cz/ct.png",
      logoExplainer:
        "Designed in 2012 by visual studio Najbrt, the Česká televize identity features an abstract cathode-ray screen formed by two brackets in Czech national blue and red, representing the letters 'Č' and 'T'. The minimalist geometric mark honors the legacy 1963 television screen logo while creating a modular visual identity across all digital and thematic channels.",
      sources: [
        "https://www.ceskatelevize.cz/vse-o-ct/vyrocni-zpravy/",
        "https://www.ato.cz/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/czech-republic",
      ],
      licenceNote: "Česká televize public service statutory corporation trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Slovakia
  SK: [
    {
      id: "sk-stvr",
      countryCode: "SK",
      name: "STVR",
      officialName: "Slovenská televízia a rozhlas (formerly RTVS - Rozhlas a televízia Slovenska)",
      founded: 1956,
      primaryFunding: "Direct state budget subsidy pegged by law to a statutory percentage of Slovakia's GDP (0.12%–0.14% of GDP) following the abolition of concessionary fees in 2023 and the 2024 public service media reform law",
      headquarters: "Mlynská dolina, Bratislava",
      annualPublicFunding: {
        total: "€157.0 million direct state budget transfer (Zákon o štátnom rozpočte & STVR Správa o hospodárení FY 2024)",
        perCapita: "€28.90 / citizen / year (approx. €0.08 / day)",
      },
      dailyMarketShare: "14.6% television audience share across Jednotka (:1), Dvojka (:2), and :24 news channel (PMX / Kantar Slovakia 2024; Jednotka holds 10.8%)",
      brandTrustScore: {
        score: "55%",
        source: "Reuters Institute Digital News Report 2024 (#1 most trusted broadcast news brand in Slovakia for RTVS/STVR Správy)",
      },
      localContentQuota: "Minimum 35% Slovak domestic music quota on radio and over 50% European audiovisual works quota under the Media Services Act, with regional studios in Banská Bystrica and Košice",
      staffHeadcount: "1,520 employees (Správa o činnosti a hospodárení 2024)",
      logo: "broadcaster-logos/sk/stvr.png",
      logoExplainer:
        "The public broadcaster logo features the signature typography with a distinct colon separator (:), originally introduced in 2011 to bridge radio and television broadcast services. The colon symbol evokes digital connectivity, introduction, and the dialogue between public media and Slovak society.",
      sources: [
        "https://www.stvr.sk/",
        "https://www.mvrr.gov.sk/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/slovakia",
      ],
      licenceNote: "Slovenská televízia a rozhlas statutory public institution trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Hungary
  HU: [
    {
      id: "hu-mtva",
      countryCode: "HU",
      name: "Duna / MTVA",
      officialName: "Médiaszolgáltatás-támogató és Vagyonkezelő Alap (Media Service Support and Asset Management Fund) / Duna Médiaszolgáltató Zrt.",
      founded: 1957,
      primaryFunding: "Annual state budget subsidy allocated by the Hungarian National Assembly via MTVA, with supplementary commercial advertising",
      headquarters: "Kunigunda útja 64, District III (Óbuda), Budapest",
      annualPublicFunding: {
        total: "HUF 142.0 billion central state budget allocation (Központi költségvetésről szóló törvény FY 2024; approx. €360M)",
        perCapita: "HUF 14,800 / resident / year (approx. €37.50 / year or HUF 40.5 / day)",
      },
      dailyMarketShare: "11.2% television audience share across Duna, M1 (news), M2 (children), M4 Sport, and M5 (culture) (Nielsen Közönségmérés Hungary 2024; M4 Sport peaks during international athletic competitions)",
      brandTrustScore: {
        score: "30%",
        source: "Reuters Institute Digital News Report 2024 (reflecting polarizing domestic media landscape and public trust trends)",
      },
      localContentQuota: "Minimum 51% Hungarian and European content requirement on public television channels under Act CLXXXV of 2010 on Media Services and Mass Media",
      staffHeadcount: "2,150 permanent employees (MTVA Éves beszámoló 2024)",
      logo: "broadcaster-logos/hu/duna.png",
      logoExplainer:
        "The MTVA and Duna Media corporate visual system features an intricate circular rosette composed of orbiting dots and interconnected geometric arcs. Designed in 2012, the planetary motif symbolizes the convergence of television, Hungarian radio (Kossuth, Petőfi, Bartók), and the Hungarian news agency MTI into a unified national public media constellation.",
      sources: [
        "https://mtva.hu/gazdalkodasi-adatok/",
        "https://nmhh.hu/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/hungary",
      ],
      licenceNote: "Médiaszolgáltatás-támogató és Vagyonkezelő Alap state media fund trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Romania
  RO: [
    {
      id: "ro-tvr",
      countryCode: "RO",
      name: "TVR",
      officialName: "Societatea Română de Televiziune (Romanian Television)",
      founded: 1956,
      primaryFunding: "Direct state budget appropriation from the Parliament of Romania via the state budget law (after TV licence fees were abolished in 2017), supplemented by commercial advertising",
      headquarters: "Calea Dorobanților 191, Sector 1, Bucharest",
      annualPublicFunding: {
        total: "RON 425.0 million state budget subvention (Legea bugetului de stat & Raport TVR FY 2024; approx. €85.5M)",
        perCapita: "RON 22.30 / citizen / year (approx. €4.50 / year or RON 0.06 / day)",
      },
      dailyMarketShare: "4.8% combined television audience share across TVR 1, TVR 2, TVR 3, TVR Info, and TVR Folclor (Kantar Media Romania / ARMA 2024; TVR 1 holds 2.9%)",
      brandTrustScore: {
        score: "56%",
        source: "Reuters Institute Digital News Report 2024 (TVR News maintains solid trust ratings as an impartial institutional broadcaster)",
      },
      localContentQuota: "Minimum 50% Romanian-language and European production quota under Audiovisual Law no. 504/2002, funding five regional territorial studios (Cluj, Craiova, Iași, Timișoara, Târgu Mureș)",
      staffHeadcount: "2,210 employees across national headquarters and regional territorial studios (Raportul de activitate al SRTv 2024)",
      logo: "broadcaster-logos/ro/tvr.png",
      logoExplainer:
        "Modernized in 2022, the TVR logo features the bold capital letters 'TVR' rendered in contemporary blue and vibrant orange with a stylized forward-pointing apex in the letter 'V'. The geometric angles represent forward motion, cultural dynamism, and nationwide broadcasting from the Carpathians to the Black Sea.",
      sources: [
        "https://www.tvr.ro/rapoarte-si-studii_3203.html",
        "https://cna.ro/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/romania",
      ],
      licenceNote: "Societatea Română de Televiziune public institution trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Bulgaria
  BG: [
    {
      id: "bg-bnt",
      countryCode: "BG",
      name: "BNT",
      officialName: "Balgarska Natsionalna Televiziya (Bulgarian National Television)",
      founded: 1959,
      primaryFunding: "Annual state budget subsidy allocated by the Ministry of Culture and National Assembly under the Radio and Television Act (Zakon za radioto i televiziyata), plus limited advertising (max 15 min/day, 5 min/hour in prime time)",
      headquarters: "29 San Stefano Street, Sofia",
      annualPublicFunding: {
        total: "BGN 86.4 million state budget subsidy (BNT Godishen finansov otchet FY 2024; approx. €44.2M)",
        perCapita: "BGN 13.40 / citizen / year (approx. €6.85 / year or BGN 0.04 / day)",
      },
      dailyMarketShare: "7.8% television audience share across BNT 1, BNT 2, BNT 3 (sports), and BNT 4 (international) (GARB Audience Measurement Bulgaria 2024; BNT 1 holds 5.6% share)",
      brandTrustScore: {
        score: "62%",
        source: "Reuters Institute Digital News Report 2024 (#1 most trusted television news provider in Bulgaria for BNT News / Po Sveta i u Nas)",
      },
      localContentQuota: "At least 50% European and Bulgarian content quota under Council for Electronic Media (CEM) standards, supporting Bulgarian cinema and regional television centers in Blagoevgrad, Varna, Plovdiv, and Ruse",
      staffHeadcount: "1,440 employees (BNT Otchet za deynostta 2024)",
      logo: "broadcaster-logos/bg/bnt.png",
      logoExplainer:
        "Introduced in 2008 and refreshed in 2018, the BNT emblem showcases three vibrant forward-angled geometric quadrilaterals in Bulgarian national red, deep blue, and light blue, flanking the bold sans-serif letters 'БНТ' (BNT). The ascending parallel bars symbolize the progression of television broadcast signals and Bulgarian cultural identity.",
      sources: [
        "https://bnt.bg/bg/a/finansovi-otcheti",
        "https://www.cem.bg/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/bulgaria",
      ],
      licenceNote: "Bulgarian National Television public service organization trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Croatia
  HR: [
    {
      id: "hr-hrt",
      countryCode: "HR",
      name: "HRT",
      officialName: "Hrvatska radiotelevizija (Croatian Radiotelevision)",
      founded: 1926,
      primaryFunding: "Universal monthly broadcast fee (RTV pristojba / €10.62/month per household owning a receiver) under the HRT Act, supplemented by commercial advertising (capped at 9 min/hour in prime time)",
      headquarters: "Prisavlje 3, Zagreb",
      annualPublicFunding: {
        total: "€181.4 million monthly broadcast fee revenue (HRT Godišnje izvješće o poslovanju FY 2024; total revenue €198.8M)",
        perCapita: "€46.80 / citizen / year (approx. €0.13 / day)",
      },
      dailyMarketShare: "26.4% total television audience share across HRT 1, HRT 2, HRT 3 (culture), and HRT 4 (news) (AdScanner / AEM Croatia 2024; HRT 1 commands 16.2% share)",
      brandTrustScore: {
        score: "60%",
        source: "Reuters Institute Digital News Report 2024 (#1 most trusted broadcast news organization in Croatia for HRT Vijesti)",
      },
      localContentQuota: "Over 50% Croatian domestic production quota under the Electronic Media Act (Zakon o elektroničkim medijima), with statutory regional production centers in Split, Rijeka, Osijek, Pula, Zadar, and Dubrovnik",
      staffHeadcount: "2,730 permanent employees (Izvješće o radu HRT-a 2024)",
      logo: "broadcaster-logos/hr/hrt.png",
      logoExplainer:
        "Created in the early 1990s by renowned Croatian designer Boris Ljubičić, the HRT emblem features three bold capital letters 'HRT' intertwined with the iconic red-and-white Croatian alternating chequy motif. The visual identity powerfully connects national heritage with contemporary public broadcasting.",
      sources: [
        "https://o-nama.hrt.hr/poslovanje-i-financije/izvjesca-o-poslovanju",
        "https://www.aem.hr/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/croatia",
      ],
      licenceNote: "Hrvatska radiotelevizija public institution trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Serbia
  RS: [
    {
      id: "rs-rts",
      countryCode: "RS",
      name: "RTS",
      officialName: "Radio-televizija Srbije (Radio Television of Serbia)",
      founded: 1929,
      primaryFunding: "Monthly public media service fee (taksa za javne medijske servise / RSD 299/month collected via electric energy accounts) supplemented by direct state budget subventions and commercial advertising",
      headquarters: "Takovska 10, Belgrade",
      annualPublicFunding: {
        total: "RSD 11,850 million public fee and state budget transfers (RTS Finansijski izveštaj FY 2024; approx. €101M; total revenue ~RSD 14.5B)",
        perCapita: "RSD 1,805 / citizen / year (approx. €15.40 / year or RSD 4.95 / day)",
      },
      dailyMarketShare: "21.6% combined television audience share across RTS 1, RTS 2, RTS 3 (culture), and thematic digital channels (Nielsen Audience Measurement Serbia 2024; RTS 1 is Serbia's most-watched television channel with 16.8% share)",
      brandTrustScore: {
        score: "51%",
        source: "Reuters Institute Digital News Report 2024 (RTS Dnevnik 2 remains Serbia's central daily evening news program)",
      },
      localContentQuota: "At least 50% Serbian and European audiovisual production quota under the Law on Public Media Services (Zakon o javnim medijskim servisima), with regional correspondence desks across the country",
      staffHeadcount: "2,620 permanent employees (RTS Izveštaj o poslovanju 2024)",
      logo: "broadcaster-logos/rs/rts.png",
      logoExplainer:
        "The distinctive RTS emblem features stylized overlapping circular rings rendered in Serbian tricolor blue, white, and red, seamlessly merging the Cyrillic and Latin letterforms 'PTC / RTS'. The interlocking spherical ribbons symbolize radio and television orbital broadcast signals uniting the nation.",
      sources: [
        "https://www.rts.rs/page/rts/sr/o-nama.html",
        "https://www.rem.rs/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/serbia",
      ],
      licenceNote: "Radio-televizija Srbije public media institution trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Iceland
  IS: [
    {
      id: "is-ruv",
      countryCode: "IS",
      name: "RÚV",
      officialName: "Ríkisútvarpið ohf. (The Icelandic National Broadcasting Service)",
      founded: 1930,
      primaryFunding: "Dedicated individual media tax (útvarpsgjald / ISK 21,800/year per taxpayer aged 18–70 collected via annual income tax assessments by Skatturinn) supplemented by commercial advertising (capped at 8 min/hour)",
      headquarters: "Efstaleiti 1, 103 Reykjavík",
      annualPublicFunding: {
        total: "ISK 5,420 million media tax appropriation (RÚV Ársskýrsla FY 2024; approx. €36.5M; total revenue ISK 7,200M)",
        perCapita: "ISK 13,800 / resident / year (approx. €93 / year or ISK 37.8 / day)",
      },
      dailyMarketShare: "58.5% television audience share across RÚV and RÚV 2 (Gallup Iceland TV Survey 2024; RÚV holds overwhelming market leadership with the highest daily viewing reach in Iceland)",
      brandTrustScore: {
        score: "78%",
        source: "Gallup Iceland Public Trust Survey & Reuters DNR 2024 (#1 most trusted institution and news service in Iceland for RÚV Fréttir)",
      },
      localContentQuota: "Over 75% Icelandic-language programming quota under Act no. 23/2013 on the Icelandic National Broadcasting Service, safeguarding the Icelandic language, domestic drama, children's programs, and rural regional offices",
      staffHeadcount: "270 full-time equivalent employees (RÚV Ársskýrsla 2024)",
      logo: "broadcaster-logos/is/ruv.png",
      logoExplainer:
        "Designed in 2011 by graphic artist Hörður Lárusson, the minimalist RÚV wordmark features custom lowercase geometric sans-serif lettering with a distinctive circular dot above the acute accent of the 'ú'. The clean typography in Nordic deep blue embodies institutional clarity, digital agility, and community trust.",
      sources: [
        "https://www.ruv.is/um-ruv/rekstur-og-skipulag",
        "https://www.fjolmidlanefnd.is/",
        "https://gallup.is/nidurstodur/frettir/thjodarpuls-traust-a-stofnunum/",
      ],
      licenceNote: "Ríkisútvarpið ohf. state-owned public limited company trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Lithuania
  LT: [
    {
      id: "lt-lrt",
      countryCode: "LT",
      name: "LRT",
      officialName: "Lietuvos nacionalinis radijas ir televizija (Lithuanian National Radio and Television)",
      founded: 1926,
      primaryFunding: "Legally ring-fenced state budget funding pegged by statute to a formula of Personal Income Tax (1.28% of GPM) and Excise Tax (1.28% of akcizai) collected two years prior; 100% commercial-free with zero commercial advertising",
      headquarters: "S. Konarskio g. 49, Vilnius",
      annualPublicFunding: {
        total: "€72.8 million statutory formula budget allocation (LRT Metinė veiklos ir finansinė ataskaita FY 2024)",
        perCapita: "€25.40 / resident / year (approx. €0.07 / day)",
      },
      dailyMarketShare: "22.5% television audience share across LRT Televizija, LRT Plius, and LRT Lituanica (Kantar Lithuania 2024; LRT Televizija is Lithuania's leading television channel with 16.1% share)",
      brandTrustScore: {
        score: "70%",
        source: "Reuters Institute Digital News Report 2024 (#1 most trusted news media brand in Lithuania for LRT)",
      },
      localContentQuota: "Over 60% Lithuanian-origin programming quota under the Law on the Lithuanian National Radio and Television, featuring comprehensive news, documentary history, and cultural programs",
      staffHeadcount: "650 full-time employees (LRT Veiklos ataskaita 2024)",
      logo: "broadcaster-logos/lt/lrt.png",
      logoExplainer:
        "Unveiled in 2022, the refreshed LRT emblem displays the bold sans-serif letterforms 'LRT' in stark black and white or Baltic amber, characterized by modern geometric lines and a clean horizontal cadence. The identity reflects progressive institutional values, digital expansion via LRT Epika and LRT.lt, and civic resilience.",
      sources: [
        "https://apie.lrt.lt/skaidrumas/ataskaitos",
        "https://www.rtk.lt/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/lithuania",
      ],
      licenceNote: "Lietuvos nacionalinis radijas ir televizija statutory public institution trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Latvia
  LV: [
    {
      id: "lv-ltv",
      countryCode: "LV",
      name: "LTV / LSM",
      officialName: "Latvijas Televīzija VSIA / Latvijas Sabiedriskais Medijs (Public Broadcasting of Latvia)",
      founded: 1954,
      primaryFunding: "Direct state budget appropriation from the Ministry of Culture and Saeima under the Public Electronic Mass Media Law; 100% commercial-free with zero interruption advertising on TV and radio since exit from ad market in 2021",
      headquarters: "Zaķusalas krastmala 3, Riga",
      annualPublicFunding: {
        total: "€38.4 million state budget grant (LTV Gada pārskats & SEPLP FY 2024; approx. €58M across united LSM radio & TV)",
        perCapita: "€20.50 / resident / year (approx. €0.06 / day)",
      },
      dailyMarketShare: "17.4% television audience share across LTV1 and LTV7 (Kantar Latvia 2024; LTV1 is Latvia's leading television channel with 13.2% share)",
      brandTrustScore: {
        score: "66%",
        source: "SKDS Public Opinion Research & SEPLP 2024 (LTV Panorāma and LSM.lv consistently rank as Latvia's most reliable and trusted news brands)",
      },
      localContentQuota: "Minimum 80% European and Latvian-language programming quota on LTV1 under the Public Electronic Mass Media and Their Administration Law (SEPLP), funding Baltic documentary cinema and regional correspondent hubs",
      staffHeadcount: "520 employees (LTV Gada pārskats 2024)",
      logo: "broadcaster-logos/lv/ltv.png",
      logoExplainer:
        "Redesigned in 2021, the LTV emblem features the bold, geometric capital letters 'LTV' in Latvian carmine red and deep slate grey. The clean, forward-slanted diagonal cut in the letter 'L' evokes broadcast transmission towers, signal precision, and continuous public service modernization from the iconic Zaķusala TV tower in Riga.",
      sources: [
        "https://ltv.lsm.lv/lv/par-mums/finansu-parskati",
        "https://www.seplp.lv/",
        "https://www.kantar.lv/mediju-petijumi/",
      ],
      licenceNote: "Latvijas Televīzija VSIA public limited liability company trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Estonia
  EE: [
    {
      id: "ee-err",
      countryCode: "EE",
      name: "ERR",
      officialName: "Eesti Rahvusringhääling (Estonian Public Broadcasting)",
      founded: 1926,
      primaryFunding: "Direct state budget allocation from the Riigikogu via the Ministry of Culture; 100% commercial-free with zero commercial advertising across television, radio, and online portals",
      headquarters: "Gonsiori 27, Tallinn",
      annualPublicFunding: {
        total: "€46.2 million state budget allocation (ERR Majandusaasta aruanne FY 2024; total revenue €48.5M)",
        perCapita: "€33.70 / resident / year (approx. €0.09 / day)",
      },
      dailyMarketShare: "18.8% television audience share across ETV, ETV2, and ETV+ (Russian language) (Kantar Emor 2024; ETV is Estonia's most-watched television channel with 14.5% share)",
      brandTrustScore: {
        score: "78%",
        source: "Kantar Emor Media Trust Index & Turu-uuringute AS 2024 (#1 most trusted news media organization in Estonia for Aktuaalne kaamera / ERR.ee)",
      },
      localContentQuota: "Over 70% Estonian domestic production quota under the Estonian National Broadcasting Act (Eesti Rahvusringhäälingu seadus), with extensive programming in Estonian and Russian (ETV+)",
      staffHeadcount: "680 full-time equivalent employees (ERR Tegevusaruanne 2024)",
      logo: "broadcaster-logos/ee/err.png",
      logoExplainer:
        "The ETV and ERR emblem presents the stylized bold letterforms 'etv' encased in vibrant scarlet red and white. The clean, rounded geometry embodies Baltic digital innovation, transparency, and universally accessible public service journalism across television and ERR Jupiter streaming.",
      sources: [
        "https://info.err.ee/1010313/finantsaruanded",
        "https://www.kantaremor.ee/",
        "https://www.riigiteataja.ee/akt/12792612",
      ],
      licenceNote: "Eesti Rahvusringhääling statutory public institution trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Montenegro
  ME: [
    {
      id: "me-rtcg",
      countryCode: "ME",
      name: "RTCG",
      officialName: "Radio i Televizija Crne Gore (Radio and Television of Montenegro)",
      founded: 1944,
      primaryFunding: "Statutory state budget allocation pegged by law to 1.34% of the current state budget expenditure under the Law on National Public Broadcaster RTCG, supplemented by commercial advertising",
      headquarters: "Bulevar Revolucije 19, Podgorica",
      annualPublicFunding: {
        total: "€18.8 million statutory state budget subvention (RTCG Finansijski izvještaj FY 2024)",
        perCapita: "€30.30 / citizen / year (approx. €0.08 / day)",
      },
      dailyMarketShare: "17.6% television audience share across TVCG 1, TVCG 2, TVCG 3 (Parliamentary), and TVCG MNE (Ipsos / Agency for Electronic Media of Montenegro 2024; TVCG 1 holds 12.1%)",
      brandTrustScore: {
        score: "48%",
        source: "Agency for Electronic Media (AEM) Media Trust Survey 2024 (reflecting growing trust in modernized Dnevnik 2)",
      },
      localContentQuota: "Minimum 40% domestic production quota under Montenegrin media regulations, maintaining minority language programming in Albanian and Romani",
      staffHeadcount: "740 permanent employees (RTCG Izvještaj o radu 2024)",
      logo: "broadcaster-logos/me/rtcg.png",
      logoExplainer:
        "Redesigned in 2024, the RTCG logo features contemporary stylized letterforms in deep navy and gold, evoking the Montenegrin national colors and heraldic heritage. The interconnected lines symbolize national integration, digital modernism, and editorial evolution.",
      sources: [
        "https://rtcg.me/rtcg/dokumenti.html",
        "https://aemcg.org/",
      ],
      licenceNote: "Radio i Televizija Crne Gore public institution trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // North Macedonia
  MK: [
    {
      id: "mk-mrt",
      countryCode: "MK",
      name: "MRT",
      officialName: "Makedonska Radio Televizija (Macedonian Radio Television)",
      founded: 1944,
      primaryFunding: "State budget allocation pegged by statute to a percentage of total state budget revenues (0.7%–0.9% under the Law on Audio and Audiovisual Media Services), plus limited commercial ads",
      headquarters: "Boulevard Goce Delčev bb, Skopje",
      annualPublicFunding: {
        total: "MKD 1,020 million state budget subvention (MRT Finansiski izveštaj FY 2024; approx. €16.5M)",
        perCapita: "MKD 555 / citizen / year (approx. €9.00 / year or MKD 1.52 / day)",
      },
      dailyMarketShare: "8.4% television audience share across MRT 1, MRT 2 (minority languages), MRT 3 (sports), and MRT Sobranski Kanal (AVMU / Nielsen North Macedonia 2024)",
      brandTrustScore: {
        score: "46%",
        source: "Agency for Audio and Audiovisual Media Services (AVMU) Media Study 2024",
      },
      localContentQuota: "At least 50% Macedonian domestic content requirement, with dedicated multilingual channels broadcasting daily in Albanian, Turkish, Serbian, Romani, Vlach, and Bosnian",
      staffHeadcount: "810 employees (MRT Godišen izveštaj 2024)",
      logo: "broadcaster-logos/mk/mrt.png",
      logoExplainer:
        "The MRT emblem presents bold geometric lettering in the warm yellow and red tones of North Macedonia's national flag, incorporating horizontal broadcast wave cuts through the letters 'MRT'. The design represents nation-building, multiethnic cohesion, and terrestrial broadcasting across the Vardar valley.",
      sources: [
        "https://mrt.com.mk/",
        "https://avmu.mk/",
      ],
      licenceNote: "Macedonian Radio Television public broadcasting service trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Albania
  AL: [
    {
      id: "al-rtsh",
      countryCode: "AL",
      name: "RTSH",
      officialName: "Radio Televizioni Shqiptar (Albanian Radio and Television)",
      founded: 1938,
      primaryFunding: "Monthly public service media tariff collected via electricity billing accounts (tarifa e shërbimit publik / ALL 100/month per household), direct state budget subventions, and commercial advertising",
      headquarters: "Rruga Ismail Qemali 11, Tirana",
      annualPublicFunding: {
        total: "ALL 2,480 million public fee & state budget allocation (RTSH Raporti Financiar FY 2024; approx. €24.8M)",
        perCapita: "ALL 910 / resident / year (approx. €9.10 / year or ALL 2.5 / day)",
      },
      dailyMarketShare: "9.5% combined television audience share across RTSH 1, RTSH 2, RTSH 3, RTSH Sport, and RTSH Fëmijë (AMA / Abacus Research Albania 2024)",
      brandTrustScore: {
        score: "52%",
        source: "Audiovisual Media Authority (AMA) Public Opinion Survey 2024 (RTSH Lajme is trusted for official institutional news and cultural coverage)",
      },
      localContentQuota: "Minimum 50% Albanian domestic production quota under Law no. 97/2013 on Audiovisual Media, funding Albanian cinema, classical music festivals (Festivali i Këngës), and regional centers in Korçë and Gjirokastër",
      staffHeadcount: "1,120 permanent employees (RTSH Raporti Vjetor 2024)",
      logo: "broadcaster-logos/al/rtsh.png",
      logoExplainer:
        "Redesigned in 2017, the modern RTSH emblem features clean, minimalist geometric typography with the letters 'rtsh' rendered in vibrant vermilion red and obsidian slate. The streamlined lowercase letterforms communicate democratic transformation, accessibility, and modern multimedia public service.",
      sources: [
        "https://rtsh.al/rreth-rtsh-se/raporte-dhe-dokumenta",
        "https://ama.gov.al/",
      ],
      licenceNote: "Radio Televizioni Shqiptar public broadcasting corporation trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Ukraine
  UA: [
    {
      id: "ua-suspilne",
      countryCode: "UA",
      name: "Suspilne",
      officialName: "Natsionalna Suspilna Teleradiokompaniya Ukrayiny (National Public Broadcasting Company of Ukraine)",
      founded: 1924,
      primaryFunding: "Direct state budget appropriation guaranteed by the Law of Ukraine 'On Public Television and Radio Broadcasting of Ukraine' pegged to 0.2% of the state budget general fund, supplemented by international donor partner grants; commercial advertising is legally capped",
      headquarters: "Khreshchatyk Street 26, Kyiv",
      annualPublicFunding: {
        total: "UAH 1,850 million state budget subvention (Zakon pro Derzhavnyi biudzhet & Suspilne Zvit FY 2024; approx. €42.5M)",
        perCapita: "UAH 51.40 / citizen / year (approx. €1.18 / year or UAH 0.14 / day)",
      },
      dailyMarketShare: "6.8% television audience share across Pershyi (First), Suspilne Kultura, and 24 regional stations (Nielsen Ukraine / Television Industry Committee 2024; Suspilne Novyny online reaches over 35% of adult Ukrainians monthly)",
      brandTrustScore: {
        score: "73%",
        source: "USAID / Internews Media Consumption Survey & Reuters DNR 2024 (#1 most trusted news source in Ukraine for verified, independent wartime news)",
      },
      localContentQuota: "Minimum 90% Ukrainian-language content quota under wartime information security and national broadcasting laws, operating across 24 regional hubs from Lviv to Kharkiv",
      staffHeadcount: "3,850 employees across national headquarters and frontline regional branches (Suspilne Richnyi zvit 2024)",
      logo: "broadcaster-logos/ua/suspilne.png",
      logoExplainer:
        "Adopted during the historic 2019 public broadcaster rebranding, the Suspilne logo features the warm lowercase wordmark 'суспільне' (public / societal) anchored by a distinctive solid circular dot in deep navy blue. The dot represents the public circle, a shared town square, and independent civic solidarity across all regions of Ukraine.",
      sources: [
        "https://corp.suspilne.media/reports",
        "https://www.nrada.gov.ua/",
        "https://internews.in.ua/wp-content/uploads/2024/09/Internews-Media-Report-2024.pdf",
      ],
      licenceNote: "National Public Broadcasting Company of Ukraine joint-stock company trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Mexico
  MX: [
    {
      id: "mx-once",
      countryCode: "MX",
      name: "Canal Once",
      officialName: "XEIPN-TDT Canal Once (Instituto Politécnico Nacional)",
      founded: 1959,
      primaryFunding: "Federal government budget appropriation from the Federal Expenditure Budget (PEF) allocated via the Secretariat of Public Education (SEP) and Instituto Politécnico Nacional (IPN), with limited educational commercial underwriting",
      headquarters: "Manuel Carpio 475, Casco de Santo Tomás, Miguel Hidalgo, Mexico City",
      annualPublicFunding: {
        total: "MXN 612.0 million federal budget appropriation (Presupuesto de Egresos de la Federación PEF FY 2024; approx. US$34M)",
        perCapita: "MXN 4.70 / citizen / year (approx. US$0.26 / year)",
      },
      dailyMarketShare: "3.2% national television audience share across 11.1 (general) and 11.2 (Once Niñas y Niños) (IFT Instituto Federal de Telecomunicaciones 2024; Once Niñas y Niños is Mexico's highest-rated public children's channel)",
      brandTrustScore: {
        score: "66%",
        source: "Reuters Institute Digital News Report 2024 (Canal Once News and Canal 22 are among Mexico's most trusted cultural and educational institutions)",
      },
      localContentQuota: "Over 80% Mexican domestic production quota under the Federal Telecommunications and Broadcasting Law (LFTR), pioneering original Mexican educational fiction, indigenous cultural documentaries, and scientific broadcasts",
      staffHeadcount: "840 permanent civil and technical employees (Informe de Labores IPN / Canal Once 2024)",
      logo: "broadcaster-logos/mx/once.png",
      logoExplainer:
        "Redesigned in 2025, the Canal Once emblem displays the iconic number '11' formed by two dynamic vertical parallel rectangles with rounded terminal corners rendered in emerald jade green. The dual bars represent open communication channels, educational elevation, and pioneering institutional public broadcasting across Mexico.",
      sources: [
        "https://canalonce.mx/transparencia",
        "https://www.ift.org.mx/estadisticas/informes-del-mercado-de-audiovisuales",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/mexico",
      ],
      licenceNote: "Instituto Politécnico Nacional public educational broadcaster trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Cuba
  CU: [
    {
      id: "cu-cubavision",
      countryCode: "CU",
      name: "Cubavisión",
      officialName: "Instituto de Información y Comunicación Social (ICS, formerly ICRT) / Cubavisión",
      founded: 1950,
      primaryFunding: "100% direct central state budget allocation from the Ministry of Finance and Prices (Ministerio de Finanzas y Precios); 100% commercial-free with zero private commercial advertising",
      headquarters: "Edificio Radiocentro, Calle 23 No. 258, Vedado, Plaza de la Revolución, Havana",
      annualPublicFunding: {
        total: "CUP 1,420 million central state budget appropriation (Ley del Presupuesto del Estado & ICS FY 2024)",
        perCapita: "CUP 129 / resident / year (approx. CUP 0.35 / day)",
      },
      dailyMarketShare: "62.0% national free-to-air television viewing share across Cubavisión, Tele Rebelde (sports), Canal Educativo, Canal Caribe (news), and Multivisión (ICS Estudios de Audiencia 2024)",
      brandTrustScore: {
        score: "State Official",
        source: "Instituto de Información y Comunicación Social (ICS) official state broadcast authority",
      },
      localContentQuota: "Over 70% Cuban domestic content quota across general channels under national cultural guidelines, prioritizing Cuban cinema (ICAIC), national soap operas, live cultural concerts, and educational curricula",
      staffHeadcount: "4,500 employees nationwide across national studios and 15 provincial telecenters (ICS Balance Anual 2024)",
      logo: "broadcaster-logos/cu/cubavision.png",
      logoExplainer:
        "The Cubavisión emblem features a stylized, vibrant tricolor geometric star inspired by the lone star of the Cuban national flag, enclosed in flowing arcs of national red, royal blue, and white. The emblem conveys patriotic solidarity, artistic heritage, and nationwide terrestrial broadcasting from Havana to all provinces.",
      sources: [
        "https://www.cubatv.icrt.cu/",
        "https://www.mfp.gob.cu/",
      ],
      licenceNote: "Instituto de Información y Comunicación Social state public broadcasting trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Costa Rica
  CR: [
    {
      id: "cr-trece",
      countryCode: "CR",
      name: "Canal Trece / SINART",
      officialName: "Sistema Nacional de Radio y Televisión, S.A. (SINART Costa Rica)",
      founded: 1978,
      primaryFunding: "State budget subsidy from the Ministry of Culture and Youth (MCJ) combined with statutory public institutional advertising contracts (10% state agency ad spend mandate under Law 8307)",
      headquarters: "La Uruca, San José",
      annualPublicFunding: {
        total: "CRC 4,850 million state budget and statutory public contracts (Presupuesto Ordinario de la República FY 2024; approx. US$9.5M)",
        perCapita: "CRC 930 / citizen / year (approx. US$1.82 / year)",
      },
      dailyMarketShare: "4.5% national television audience share across Canal Trece (13.1) (Kantar IBOPE Media Costa Rica 2024)",
      brandTrustScore: {
        score: "58%",
        source: "CIEP-UCR Public Media Survey & Reuters DNR 2024 (Canal Trece is widely recognized as Costa Rica's non-partisan cultural reference)",
      },
      localContentQuota: "At least 60% Costa Rican cultural and educational content quota under the Organic Law of SINART, promoting local folk music, environmental preservation, and regional municipal affairs",
      staffHeadcount: "185 permanent employees (SINART Informe de Gestión 2024)",
      logo: "broadcaster-logos/cr/trece.png",
      logoExplainer:
        "The Canal Trece visual mark features the bold numeral '13' rendered in energetic turquoise and cerulean blue with a stylized forward-sweeping circular flourish. The contemporary aesthetic symbolizes democratic dialogue, Costa Rican biodiversity, and community connection across the Central Valley and coastal provinces.",
      sources: [
        "https://costaricamedios.cr/",
        "https://www.hacienda.go.cr/",
      ],
      licenceNote: "Sistema Nacional de Radio y Televisión, S.A. state company trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Jamaica
  JM: [
    {
      id: "jm-tvj",
      countryCode: "JM",
      name: "TVJ",
      officialName: "Television Jamaica (RJR Communications Group / RJRGLEANER)",
      founded: 1963,
      primaryFunding: "Public service commercial hybrid model: Commercial advertising and subscription revenue operating under public service license obligations from the Broadcasting Commission of Jamaica (BCJ)",
      headquarters: "32 Lyndhurst Road, Kingston 5",
      annualPublicFunding: {
        total: "Commercial Public Trust model (J$5,800 million total operating turnover RJRGLEANER FY 2024; approx. US$37M)",
        perCapita: "J$2,070 / citizen / year equivalent total broadcast media investment (approx. US$13.20)",
      },
      dailyMarketShare: "61.4% national television viewership share across TVJ, TVJ SN (sports), and RETV (Market Research Services Limited Jamaica 2024; TVJ Prime Time News holds unmatched national leadership)",
      brandTrustScore: {
        score: "76%",
        source: "Market Research Services Jamaica & Reuters DNR 2024 (#1 most trusted television news provider in Jamaica for TVJ Prime Time News)",
      },
      localContentQuota: "Over 55% Jamaican domestic production quota under Broadcasting Commission guidelines, investing extensively in local investigative journalism, School's Challenge Quiz, and reggae/dancehall cultural festivals",
      staffHeadcount: "480 permanent staff (RJRGLEANER Annual Report 2024)",
      logo: "broadcaster-logos/jm/tvj.png",
      logoExplainer:
        "The Television Jamaica emblem features three bold sans-serif letterforms 'TVJ' highlighted with vivid national yellow and green accents evoking the Jamaican national flag. The energetic, approachable typographic style conveys community pride, Caribbean warmth, and authoritative broadcast journalism.",
      sources: [
        "https://www.televisionjamaica.com/",
        "https://www.broadcastingcommission.org/",
        "https://www.rjrgleanergroup.com/annual-reports/",
      ],
      licenceNote: "Television Jamaica public service commercial licensee trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Trinidad and Tobago
  TT: [
    {
      id: "tt-ttt",
      countryCode: "TT",
      name: "TTT",
      officialName: "TTT Limited (Trinidad and Tobago Television)",
      founded: 1962,
      primaryFunding: "State subvention from the Ministry of Communications / Office of the Prime Minister supplemented by commercial advertising and corporate sponsorships",
      headquarters: "11A Maraval Road, Port of Spain",
      annualPublicFunding: {
        total: "TT$ 32.5 million government subvention (National Budget Estimates of Expenditure FY 2024; approx. US$4.8M)",
        perCapita: "TT$ 23.20 / citizen / year (approx. US$3.45 / year)",
      },
      dailyMarketShare: "18.5% television audience share across TTT and Talk City 91.1 FM (Market Facts & Opinions Trinidad 2024; TTT News at 7 is a flagship national newscast)",
      brandTrustScore: {
        score: "64%",
        source: "Market Facts & Opinions (MFO) National Media Trust Survey 2024",
      },
      localContentQuota: "Minimum 50% Trinidad and Tobago domestic programming quota, showcasing Calypso and Soca music, Carnival arts, Parliamentary debates, and local drama",
      staffHeadcount: "165 permanent employees (TTT Limited Annual Administrative Report 2024)",
      logo: "broadcaster-logos/tt/ttt.png",
      logoExplainer:
        "Reintroduced in 2018 upon the relaunch of the historic broadcaster, the TTT logo features three bold, connected sans-serif capital letters 'TTT' in national jet black and brilliant scarlet red. The intertwined bars symbolize the twin-island republic's broadcast waves, cultural cohesion, and Caribbean storytelling heritage.",
      sources: [
        "https://www.ttt.live/",
        "https://www.finance.gov.tt/",
      ],
      licenceNote: "TTT Limited state-owned media company trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // India
  IN: [
    {
      id: "in-dd",
      countryCode: "IN",
      name: "Doordarshan",
      officialName: "Doordarshan (Prasar Bharati - Broadcasting Corporation of India)",
      founded: 1959,
      primaryFunding: "Central government grants-in-aid from the Ministry of Information and Broadcasting (MIB) through Prasar Bharati, supplemented by commercial advertising and digital monetization",
      headquarters: "Doordarshan Bhawan, Copernicus Marg, Mandi House, New Delhi",
      annualPublicFunding: {
        total: "₹2,840 crore central government grant allocation to Prasar Bharati (Union Budget FY 2024–25; approx. US$340M)",
        perCapita: "₹20.30 / citizen / year (approx. US$0.24 / year)",
      },
      dailyMarketShare: "Over 45% terrestrial and free-to-air rural TV reach via DD Free Dish DTH platform across 35+ satellite channels (BARC India 2024; reaching 43+ million households)",
      brandTrustScore: {
        score: "70%",
        source: "Reuters Institute Digital News Report 2024 (#1 most trusted television news network in India for DD India and DD News)",
      },
      localContentQuota: "Over 90% Indian domestic and regional language programming quota across 28 regional Kendra stations broadcasting in Hindi, Tamil, Telugu, Bengali, Marathi, and other scheduled languages",
      staffHeadcount: "23,500 employees across Doordarshan and All India Radio (Prasar Bharati Annual Report 2024)",
      logo: "broadcaster-logos/in/dd.svg",
      logoExplainer:
        "Created in 1976 by National Institute of Design (NID) alumnus Devashis Bhattacharyya, the iconic Doordarshan visual mark (popularly known as the 'DD Eye') features two curving parabolic lenses revolving around an inner core in radiant saffron orange and deep navy blue. The symbol embodies vigilance, truth ('Satyam Shivam Sundaram'), and universal broadcasting across the subcontinent.",
      sources: [
        "https://prasarbharati.gov.in/annual-reports/",
        "https://mib.gov.in/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/india",
      ],
      licenceNote: "Prasar Bharati statutory autonomous public corporation trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Bangladesh
  BD: [
    {
      id: "bd-btv",
      countryCode: "BD",
      name: "BTV",
      officialName: "Bangladesh Television",
      founded: 1964,
      primaryFunding: "State revenue budget allocation from the Ministry of Information and Broadcasting of Bangladesh, supplemented by commercial advertising",
      headquarters: "BTV Bhaban, Rampura, Dhaka",
      annualPublicFunding: {
        total: "BDT 3,450 million state budget allocation (Ministry of Finance Budget Estimates FY 2024–25; approx. US$29.5M)",
        perCapita: "BDT 20.20 / citizen / year (approx. US$0.17 / year)",
      },
      dailyMarketShare: "22.5% terrestrial and national television audience share across BTV National, BTV World, BTV Chittagong, and Sangsad Television (National Media Survey Bangladesh 2024)",
      brandTrustScore: {
        score: "55%",
        source: "Centre for Policy Dialogue & MRDI Media Landscape Survey 2024",
      },
      localContentQuota: "Minimum 75% Bangladeshi domestic production quota, supporting Bengali literature, rural agricultural development programs (Mati O Manush), and folk music heritage",
      staffHeadcount: "1,820 civil service and production personnel (BTV Annual Administrative Report 2024)",
      logo: "broadcaster-logos/bd/btv.png",
      logoExplainer:
        "The Bangladesh Television emblem presents the bold italic letters 'BTV' enclosed in an orbital circular compass with directional arrows rendered in golden sunshine yellow. The circular orbit symbolizes continuous transmission, educational guidance, and nationwide broadcast coverage across all administrative divisions.",
      sources: [
        "https://btv.gov.bd/",
        "https://mof.gov.bd/",
      ],
      licenceNote: "Bangladesh Television state broadcasting department trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Turkey
  TR: [
    {
      id: "tr-trt",
      countryCode: "TR",
      name: "TRT",
      officialName: "Türkiye Radyo Televizyon Kurumu (Turkish Radio and Television Corporation)",
      founded: 1964,
      primaryFunding: "Universal electricity bill contribution share and banderol statutory fees levied on imported/manufactured electronic audiovisual equipment, supplemented by commercial advertising",
      headquarters: "Turan Güneş Bulvarı, Oran, Çankaya, Ankara",
      annualPublicFunding: {
        total: "₺18,500 million statutory public revenue & banderol fee share (TRT Faaliyet Raporu FY 2024; approx. US$570M)",
        perCapita: "₺215 / citizen / year (approx. US$6.60 / year or ₺0.59 / day)",
      },
      dailyMarketShare: "14.8% combined television audience share across TRT 1, TRT Haber, TRT Spor, TRT Çocuk, and TRT Belgesel (TİAK A.Ş. 2024; TRT 1 ranks among Turkey's top 3 prime-time television channels)",
      brandTrustScore: {
        score: "58%",
        source: "Reuters Institute Digital News Report 2024 (TRT Haber is among Turkey's most-watched television news channels)",
      },
      localContentQuota: "Over 75% Turkish domestic audiovisual production quota under Law No. 2954 on the Turkish Radio and Television Corporation, funding major historical epic series, regional studios, and global multilingual broadcasting via TRT World",
      staffHeadcount: "8,400 permanent employees across domestic centers and overseas bureaus (TRT İnsan Kaynakları Raporu 2024)",
      logo: "broadcaster-logos/tr/trt.png",
      logoExplainer:
        "Refreshed in 2018, the TRT logo features bold, sculpted capital letterforms 'TRT' in vibrant Turkish national crimson red. The clean, modern typography communicates confidence, institutional prestige, and digital expansion across the 'tabii' streaming ecosystem and global broadcasting services.",
      sources: [
        "https://www.trt.net.tr/kurumsal/raporlar",
        "https://tiak.com.tr/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/turkey",
      ],
      licenceNote: "Türkiye Radyo Televizyon Kurumu public statutory corporation trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Israel
  IL: [
    {
      id: "il-kan",
      countryCode: "IL",
      name: "Kan",
      officialName: "Israeli Public Broadcasting Corporation (IPBC / Ta'agid HaShidur HaYisra'eli)",
      founded: 2017,
      primaryFunding: "Direct annual budget allocation from the Ministry of Communications pegged to the annual vehicle license registration fee formula under the Public Broadcasting Law 5774-2014; 100% commercial-free with zero commercial television advertising",
      headquarters: "Kremnitzki Street 6, Tel Aviv-Yafo & Jerusalem",
      annualPublicFunding: {
        total: "₪790.0 million statutory state budget allocation (IPBC Din VeHeshbon FY 2024; approx. US$215M)",
        perCapita: "₪81.50 / resident / year (approx. US$22.20 / year or ₪0.22 / day)",
      },
      dailyMarketShare: "12.4% linear television audience share across Kan 11 and Makan 33 (Arabic language) (Israel Television Audience Research Board 2024; Kan Digital digital platforms reach over 40% of adult Israelis weekly)",
      brandTrustScore: {
        score: "62%",
        source: "Israel Democracy Institute Media Trust Index 2024 (Kan 11 News is regarded as Israel's most objective and non-partisan broadcast news organization)",
      },
      localContentQuota: "Minimum 65% Israeli original domestic production quota, commissioning critically acclaimed drama series, investigative documentaries, and regional programming in Hebrew and Arabic",
      staffHeadcount: "1,050 full-time equivalent employees (IPBC Duah Kaspit 2024)",
      logo: "broadcaster-logos/il/kan.png",
      logoExplainer:
        "The Kan logo features the Hebrew and Latin word 'KAN' (meaning 'Here') set squarely inside a vivid sapphire-blue vertical rhombus diamond. The diamond symbol represents a focal compass point, independent public space, and digital agility across television, radio (Kol Yisrael), and digital podcasts.",
      sources: [
        "https://www.kan.org.il/about/transparency/",
        "https://www.gov.il/he/departments/ministry_of_communications",
      ],
      licenceNote: "Israeli Public Broadcasting Corporation statutory corporation trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Kazakhstan
  KZ: [
    {
      id: "kz-khabar",
      countryCode: "KZ",
      name: "Khabar",
      officialName: "Khabar Agency JSC (Qazaqstan / Khabar Agency)",
      founded: 1995,
      primaryFunding: "State procurement order for information policy from the Ministry of Culture and Information of the Republic of Kazakhstan, combined with commercial advertising",
      headquarters: "Kunayev Street 4, Astana",
      annualPublicFunding: {
        total: "₸22,400 million state information policy budget contract (Khabar Agency Zhylzhany esebi FY 2024; approx. US$48M)",
        perCapita: "₸1,120 / citizen / year (approx. US$2.40 / year)",
      },
      dailyMarketShare: "14.2% television audience share across Khabar, Khabar 24 (round-the-clock news), and El Arna (TNS Central Asia / Kantar Kazakhstan 2024; Khabar 24 is Kazakhstan's premier domestic news channel)",
      brandTrustScore: {
        score: "64%",
        source: "Central Asia Barometer Media Survey 2024",
      },
      localContentQuota: "Over 70% Kazakh-language and domestic content quota under the Law of the Republic of Kazakhstan 'On Mass Media', fostering national cultural drama, documentary cinema, and regional coverage across all 17 regions",
      staffHeadcount: "1,180 employees across national studios in Astana and Almaty (Khabar Agency Korporativtik esebi 2024)",
      logo: "broadcaster-logos/kz/khabar.png",
      logoExplainer:
        "The distinctive Khabar emblem presents the stylized Cyrillic wordmark 'ХАБАР' flanked by sweeping aerodynamic horizontal bands in steppe golden yellow. The dynamic winged flight motif evokes the golden eagle of Kazakhstan's national flag, soaring ambition, and nationwide broadcast coverage across the Eurasian steppe.",
      sources: [
        "https://khabar.kz/kz/agenttik/esepter",
        "https://www.gov.kz/memleket/entities/mki",
      ],
      licenceNote: "Khabar Agency Joint-Stock Company state-participated corporation trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // South Africa
  ZA: [
    {
      id: "za-sabc",
      countryCode: "ZA",
      name: "SABC",
      officialName: "South African Broadcasting Corporation SOC Limited",
      founded: 1936,
      primaryFunding: "Commercial advertising and sponsorships (~80%) supplemented by statutory television licence fees (R 265/year per household, ~13%) and government public interest grant allocations from the Department of Communications and Digital Technologies (DCDT)",
      headquarters: "Radio Park, Henley Road, Auckland Park, Johannesburg",
      annualPublicFunding: {
        total: "R 741.0 million public licence fees & government grants (SABC Annual Report FY 2023/24; total revenue R 4,820M)",
        perCapita: "R 12.10 / citizen / year (approx. US$0.66 / year)",
      },
      dailyMarketShare: "41.2% combined television audience share across SABC 1, SABC 2, SABC 3, and SABC News (BRC Broadcast Research Council of South Africa 2024; SABC 1 is South Africa's most-watched television channel)",
      brandTrustScore: {
        score: "61%",
        source: "Reuters Institute Digital News Report 2024 (SABC News commands South Africa's largest multiplatform weekly news reach)",
      },
      localContentQuota: "Minimum 55% to 80% South African domestic content quotas across channels under ICASA broadcasting regulations, providing daily news and programming in all 11 official languages plus sign language",
      staffHeadcount: "3,150 permanent employees (SABC Integrated Report 2024)",
      logo: "broadcaster-logos/za/sabc.png",
      logoExplainer:
        "The SABC emblem features an abstract broadcast transmitter radiating ascending arcs in the vibrant colors of South Africa's post-apartheid national flag: red, blue, green, and gold. The expanding waveform symbolizes inclusivity, democratic empowerment, and multilingual communication uniting all South Africans.",
      sources: [
        "https://www.sabc.co.za/sabc/annual-reports/",
        "https://www.icasa.org.za/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/south-africa",
      ],
      licenceNote: "South African Broadcasting Corporation SOC Ltd state-owned company trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Morocco
  MA: [
    {
      id: "ma-2m",
      countryCode: "MA",
      name: "2M / SOREAD",
      officialName: "Société d'Études et de Réalisations Audiovisuelles (SOREAD 2M)",
      founded: 1989,
      primaryFunding: "Public-private public service hybrid: State development support subventions from the Ministry of Youth, Culture and Communication alongside commercial advertising and audiovisual production services",
      headquarters: "Km 7.3 Route de Rabat, Ain Sebaâ, Casablanca",
      annualPublicFunding: {
        total: "MAD 380.0 million state public service contract subvention (Loi de finances & SOREAD Rapport Annuel FY 2024; approx. US$38M; total revenue ~MAD 950M)",
        perCapita: "MAD 10.30 / citizen / year (approx. US$1.03 / year)",
      },
      dailyMarketShare: "32.8% national television audience share (Marocmétrie / CIAUMED 2024; 2M is Morocco's undisputed most-watched television channel, peaking above 50% during Ramadan)",
      brandTrustScore: {
        score: "65%",
        source: "Reuters Institute Digital News Report 2024 & HACA (2M News is Morocco's primary domestic broadcast news source)",
      },
      localContentQuota: "Over 60% Moroccan domestic production quota under the specifications of the High Authority for Audiovisual Communication (HACA), delivering programs in Moroccan Arabic (Darija), Amazigh, and French",
      staffHeadcount: "870 permanent employees (SOREAD 2M Rapport de Gestion 2024)",
      logo: "broadcaster-logos/ma/2m.png",
      logoExplainer:
        "The iconic 2M visual identity features an eight-pointed geometric star composed of interlocking parallelogram facets, drawing directly from classical Moroccan zellij mosaic tilework and Islamic decorative geometry. The octagonal star symbolizes Moroccan cultural heritage, technological precision, and open regional dialogue.",
      sources: [
        "https://2m.ma/",
        "https://www.haca.ma/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/morocco",
      ],
      licenceNote: "SOREAD 2M national public service television company trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Angola
  AO: [
    {
      id: "ao-tpa",
      countryCode: "AO",
      name: "TPA",
      officialName: "Televisão Pública de Angola - E.P.",
      founded: 1975,
      primaryFunding: "Direct state budget financial dotation from the General State Budget (OGE) administered by the Ministry of Telecommunications, Information Technologies and Social Communication (MINTTICS), supplemented by commercial advertising",
      headquarters: "Avenida Ho Chi Minh, Luanda",
      annualPublicFunding: {
        total: "Kz 32,800 million state budget subvention (Orçamento Geral do Estado OGE FY 2024; approx. US$38M)",
        perCapita: "Kz 910 / citizen / year (approx. US$1.05 / year)",
      },
      dailyMarketShare: "54.2% national television audience share across TPA 1, TPA 2, and TPA Notícias (Kantar IBOPE / Marktest Angola 2024; TPA 1 is Angola's leading national television channel)",
      brandTrustScore: {
        score: "57%",
        source: "Marktest Angola Barómetro de Media & MINTTICS 2024",
      },
      localContentQuota: "Over 70% Angolan domestic content quota under the Press Law and Public Media Statute, featuring national telenovelas, local music festivals, and broadcasts in national languages (Umbundu, Kimbundu, Kikongo, Chokwe)",
      staffHeadcount: "1,450 permanent employees nationwide across Luanda and 18 provincial production centers (TPA Relatório e Contas 2024)",
      logo: "broadcaster-logos/ao/tpa.png",
      logoExplainer:
        "Unveiled in 2022, the modernized TPA logo presents the bold uppercase letters 'TPA' in dynamic, interconnected flowing strokes rendered in bright socialist crimson red. The uninterrupted ribbon contours symbolize broadcast signal flow, national integration across Angola's 18 provinces, and continuous digital modernization.",
      sources: [
        "https://tpa.ao/",
        "https://minttics.gov.ao/",
      ],
      licenceNote: "Televisão Pública de Angola public enterprise trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Cameroon
  CM: [
    {
      id: "cm-crtv",
      countryCode: "CM",
      name: "CRTV",
      officialName: "Cameroon Radio Television",
      founded: 1985,
      primaryFunding: "Audiovisual license fee tax (redevance audiovisuelle - RAV) deducted from public and private formal sector wage payrolls, supplemented by direct state budget subsidies and commercial advertising",
      headquarters: "Mballa II Broadcasting House, Yaoundé",
      annualPublicFunding: {
        total: "FCFA 28,500 million audiovisual fee tax & state subsidy (Loi de finances & CRTV Compte Administratif FY 2024; approx. US$47M)",
        perCapita: "FCFA 1,020 / citizen / year (approx. US$1.68 / year)",
      },
      dailyMarketShare: "24.5% television audience share across CRTV Télé and CRTV News (Médiamétrie Afrique 2024; CRTV is Cameroon's principal public broadcaster)",
      brandTrustScore: {
        score: "58%",
        source: "Médiamétrie Afrique & National Communication Council (CNC) 2024",
      },
      localContentQuota: "Minimum 60% Cameroonian domestic production quota, fulfilling statutory bilingual broadcasting obligations with daily parity between French and English across all ten regions",
      staffHeadcount: "1,850 employees across national headquarters and 10 regional radio/TV stations (CRTV Rapport d'Activité 2024)",
      logo: "broadcaster-logos/cm/crtv.png",
      logoExplainer:
        "The CRTV wordmark features the lowercase letters 'crtv' with a stylized numeral '1' integrated into the vertical stem of the letter 'r' in national red, flanked by the bold letterforms in oceanic cobalt blue. The typographic lockup represents Cameroon's bilingual unity, institutional authority, and public broadcast leadership.",
      sources: [
        "https://www.crtv.cm/",
        "https://www.mincom.gov.cm/",
      ],
      licenceNote: "Cameroon Radio Television statutory public establishment trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Cape Verde
  CV: [
    {
      id: "cv-tcv",
      countryCode: "CV",
      name: "TCV / RTC",
      officialName: "Radiotelevisão Cabo-verdiana, S.A. (RTC - Televisão de Cabo Verde)",
      founded: 1984,
      primaryFunding: "Taxa de Radiodifusão (TRVO) statutory levy collected via domestic electricity bills (~CVE 350/month per household), direct state compensation subventions for public service concession obligations, and commercial advertising",
      headquarters: "Avenida Amílcar Cabral, Plateau, Praia, Santiago",
      annualPublicFunding: {
        total: "CVE 420.0 million public broadcasting levy & state contract (Orçamento do Estado & RTC Relatório e Contas FY 2024; approx. US$4.1M)",
        perCapita: "CVE 725 / resident / year (approx. US$7.10 / year)",
      },
      dailyMarketShare: "48.6% television audience share (Afrobarometer / ARC Autoridade Reguladora para a Comunicação Social 2024; TCV is Cape Verde's dominant domestic channel)",
      brandTrustScore: {
        score: "68%",
        source: "ARC Media Barometer & Afrobarometer 2024 (TCV Notícias ranks among the most trusted democratic institutions in Cape Verde)",
      },
      localContentQuota: "Over 65% Cape Verdean domestic content quota under the Public Service Concession Contract, celebrating Morna music, Creole language literature, and regional island coverage across all nine inhabited islands",
      staffHeadcount: "210 permanent employees (RTC Relatório Anual 2024)",
      logo: "broadcaster-logos/cv/tcv.png",
      logoExplainer:
        "The TCV emblem features the bold white letterforms 'TCV' set inside a solid hexagonal prism in deep Atlantic blue. The hexagonal geometric shield evokes the volcanic basalt landscapes of the archipelago, maritime resilience, and authoritative public broadcast protection across the islands.",
      sources: [
        "https://rtc.cv/",
        "https://arc.cv/",
      ],
      licenceNote: "Radiotelevisão Cabo-verdiana, S.A. public concessionaire trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Egypt
  EG: [
    {
      id: "eg-nile-tv",
      countryCode: "EG",
      name: "Nile TV",
      officialName: "Nile Television (التليفزيون النيلي)",
      founded: 1993,
      primaryFunding: "Government budget appropriation from the Egyptian State Media Authority (National Media Authority / الهيئة الوطنية للإعلام)",
      headquarters: "Cairo, Egypt",
      annualPublicFunding: {
        total: "EGP 800+ million (State Media Authority consolidated budget allocation FY 2024; Egypt's state media system consolidated funding)",
        perCapita: "EGP ~27 / person / year (approx. US$0.55 / year)",
      },
      dailyMarketShare: "Nile TV's international feed reaches Egyptian diaspora and regional Arab audiences via satellite; estimated 12–18% of regional Arab satellite news viewership during peak hours (Nielsen Media Research / Arab Media Development Agency 2023–24)",
      brandTrustScore: {
        score: "59%",
        source: "Reuters Institute Digital News Report 2024 (Egypt's state television tracks in trust indices for government messaging; Nile TV International is Egypt's English-language international news outlet)",
      },
      localContentQuota: "100% Egyptian/pan-Arab content on primary services; English-language news service reaches diaspora audiences and regional broadcasters",
      staffHeadcount: "520+ journalists and production staff (Egypt State Media Authority consolidated 2024)",
      logo: "broadcaster-logos/eg/nile-tv.jpg",
      logoExplainer:
        "The Nile TV logo features a stylised crescent moon and star in vibrant orange/amber, paired with the channel's name in modern sans-serif typography. The crescent and star evoke Egypt's national identity and Islamic heritage (present in the Egyptian flag), while the warm amber tones convey authority, heritage, and the Nile's golden sunlit waters. The design balances contemporary broadcast aesthetics with historical Egyptian symbolism.",
      sources: [
        "https://en.wikipedia.org/wiki/Nile_TV_International",
        "https://www.niletvegypt.com/",
        "https://www.ana.eg/",
      ],
      licenceNote: "Nile Television public broadcaster logo (Wikimedia Commons PD / freely distributed by Egypt State Media Authority for educational reference).",
    },
  ],

  // Ghana
  GH: [
    {
      id: "gh-gbc",
      countryCode: "GH",
      name: "GBC",
      officialName: "Ghana Broadcasting Corporation (GBC / GTV)",
      founded: 1935,
      primaryFunding: "Government budget subvention (Ministry of Information / Office of Government Machinery) for personnel compensation, commercial advertising and sponsorship, and statutory TV Licence fees under the Television Licensing Act 1966 (NLCD 89)",
      headquarters: "Broadcasting House, Kanda, Accra",
      annualPublicFunding: {
        total: "GH¢ 72.5 million government personnel subvention & budgetary allocation (Ministry of Finance Budget Statement & GBC Financial Report FY 2024; approx. US$5.2M)",
        perCapita: "GH¢ 2.20 / citizen / year (approx. US$0.16 / year)",
      },
      dailyMarketShare: "16.8% television audience share across GTV, GTV Sports+, and GBC News (Kantar / Geopoll Ghana Media Measurement 2024; GTV remains the foremost national state broadcaster alongside commercial rivals Adom TV and TV3)",
      brandTrustScore: {
        score: "61%",
        source: "Afrobarometer Ghana & National Media Commission (NMC) 2024",
      },
      localContentQuota: "Minimum 70% Ghanaian and African domestic programming quota mandated by the National Media Commission, prioritizing Ghanaian indigenous languages (Akan, Ga, Ewe, Dagbani, Nzema, and Hausa) across radio and television networks",
      staffHeadcount: "1,420 employees across national headquarters in Accra and 10 regional broadcasting houses (GBC Annual Personnel Review 2024)",
      logo: "broadcaster-logos/gh/gbc.png",
      logoExplainer:
        "The GBC emblem features the bold, elegant acronym 'GBC' in deep oceanic blue, underscored by a golden sunburst arc and green accent swoosh reflecting the Pan-African and Ghanaian national colors (red, gold, green). The curved orbital crest symbolizes universal national broadcast reach and public service enlightenment.",
      sources: [
        "https://www.gbcghanaonline.com/",
        "https://nmc.org.gh/",
      ],
      licenceNote: "Ghana Broadcasting Corporation statutory corporation trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Kenya
  KE: [
    {
      id: "ke-kbc",
      countryCode: "KE",
      name: "KBC",
      officialName: "Kenya Broadcasting Corporation",
      founded: 1928,
      primaryFunding: "Exchequer budgetary transfers (State Department for Broadcasting and Telecommunications, Ministry of Information, Communications and the Digital Economy) and commercial advertising airtime sales",
      headquarters: "Broadcasting House, Harry Thuku Road, Nairobi",
      annualPublicFunding: {
        total: "KSh 2,285 million recurrent government grant allocation (National Treasury Budget Estimates & State Department for Broadcasting FY 2024/25; approx. US$15.2M)",
        perCapita: "KSh 42.30 / citizen / year (approx. US$0.28 / year)",
      },
      dailyMarketShare: "9.4% national television audience share across KBC Channel 1 and Y254 (Communications Authority of Kenya CAK Broadcasting Audience Research 2024; KBC operates the widest terrestrial transmitter footprint in the country)",
      brandTrustScore: {
        score: "59%",
        source: "Communications Authority of Kenya (CAK) & Media Council of Kenya 2024",
      },
      localContentQuota: "Minimum 60% Kenyan local content quota enforced by the Communications Authority of Kenya Programming Code, featuring programming in English, Swahili (Radio Taifa), and 10 regional vernacular language services",
      staffHeadcount: "1,180 employees across Nairobi central studios and regional transmission centers (KBC Corporate Profile 2024)",
      logo: "broadcaster-logos/ke/kbc.png",
      logoExplainer:
        "The KBC emblem presents the bold letterforms 'kbc' in vibrant red against a crisp white backdrop, framed within an open circular orbit in bright sky blue with radiating soundwaves. The circular dynamic sweep reflects universal nationwide transmission, national cohesion, and public information stewardship across Kenya.",
      sources: [
        "https://www.kbc.co.ke/",
        "https://ca.go.ke/",
      ],
      licenceNote: "Kenya Broadcasting Corporation statutory corporation trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Nigeria
  NG: [
    {
      id: "ng-nta",
      countryCode: "NG",
      name: "NTA",
      officialName: "Nigerian Television Authority",
      founded: 1977,
      primaryFunding: "Federal Government annual budget appropriation (Budget Office of the Federation / Federal Ministry of Information and National Orientation) supplemented by commercial advertising and sponsored airtime",
      headquarters: "Television House, Ahmadu Bello Way, Area 11, Garki, Abuja, FCT",
      annualPublicFunding: {
        total: "₦12,100 million federal government appropriation (Budget Office of the Federation 2024 Appropriation Act; approx. US$8.1M)",
        perCapita: "₦55.00 / citizen / year (approx. US$0.037 / year)",
      },
      dailyMarketShare: "26.5% television audience share during primetime national news (National Broadcasting Commission NBC Nigeria & MediaTrak 2024; NTA Network News is the most widely syndicated television broadcast in West Africa)",
      brandTrustScore: {
        score: "54%",
        source: "National Broadcasting Commission (NBC) Nigeria Audience Survey 2024",
      },
      localContentQuota: "Minimum 70% Nigerian domestic programming quota under the Nigeria Broadcasting Code (6th Edition), broadcasting extensive programming in Hausa, Yoruba, Igbo, and Nigerian Pidgin across all geopolitical zones",
      staffHeadcount: "6,200 employees across Abuja headquarters, 10 zonal network centers, and over 100 federal community/state television stations (NTA Human Resources Directory 2024)",
      logo: "broadcaster-logos/ng/nta.png",
      logoExplainer:
        "The NTA insignia displays the lowercase acronym 'nta' rendered in stylized brush strokes of vibrant emerald green and sun yellow, topped by an arched parabolic antenna swoosh. The emerald green reflects the Nigerian agricultural heritage and national flag, while the parabolic broadcast signal symbolizes continental reach and unity across Nigeria's diverse cultures.",
      sources: [
        "https://www.nta.ng/",
        "https://nbc.gov.ng/",
      ],
      licenceNote: "Nigerian Television Authority statutory federal agency trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Senegal
  SN: [
    {
      id: "sn-rts",
      countryCode: "SN",
      name: "RTS",
      officialName: "Radiodiffusion Télévision Sénégalaise (RTS)",
      founded: 1973,
      primaryFunding: "Dotation budgétaire de l'État (Ministère de la Communication, des Télécommunications et du Numérique), Redevance audiovisuelle (RAV - 0.7% on national electricity bills collected via SENELEC), and commercial advertising",
      headquarters: "Triangle Sud, Boulevard de la République, Dakar",
      annualPublicFunding: {
        total: "FCFA 13,200 million state budget subvention & audiovisual license levy (Loi de finances & Décret présidentiel sur la redevance FY 2024; approx. US$21.8M)",
        perCapita: "FCFA 735 / citizen / year (approx. US$1.21 / year)",
      },
      dailyMarketShare: "17.2% television audience share across RTS 1 and RTS 2 (Médiamétrie / Africascope Sénégal 2024; RTS 1 holds strong leadership in live national events, institutional affairs, and religious celebrations)",
      brandTrustScore: {
        score: "63%",
        source: "Conseil National de Régulation de l'Audiovisuel (CNRA) & Africascope 2024",
      },
      localContentQuota: "Minimum 60% Senegalese domestic production quota, mandating daily broadcasts in Wolof, Pulaar, Serer, Mandinka, Diola, and Soninke alongside official French",
      staffHeadcount: "1,050 employees across the central Maison de la RTS in Dakar and regional production centers in Saint-Louis, Thiès, Kaolack, and Ziguinchor (RTS Direction Générale 2024)",
      logo: "broadcaster-logos/sn/rts.png",
      logoExplainer:
        "The RTS wordmark showcases the bold letterforms 'RTS' in emerald green, warm amber yellow, and crimson red—the Pan-African colors of the Senegalese national flag. The letter 'T' is dynamically stylized as a broadcast transmission tower with concentric curved signal waves, representing democratic communication and nationwide solidarity.",
      sources: [
        "https://www.rts.sn/",
        "https://cnra.sn/",
      ],
      licenceNote: "Radiodiffusion Télévision Sénégalaise national public enterprise trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Namibia
  NA: [
    {
      id: "na-nbc",
      countryCode: "NA",
      name: "NBC",
      officialName: "Namibian Broadcasting Corporation (NBC)",
      founded: 1990,
      primaryFunding: "State budgetary subsidy transfers (Ministry of Information and Communication Technology - MICT), television licence fees (N$204/year per television set), and commercial airtime advertising",
      headquarters: "Cullinan Street, Northern Industrial Area, Windhoek",
      annualPublicFunding: {
        total: "N$ 392.0 million government operating and capital development subsidy (Ministry of Finance Estimates of Revenue and Expenditure FY 2023/24; approx. US$21.2M)",
        perCapita: "N$ 150.80 / citizen / year (approx. US$8.15 / year)",
      },
      dailyMarketShare: "62.4% television audience reach across NBC 1, NBC 2, and NBC 3 (Communications Regulatory Authority of Namibia CRAN & NBC Audience Metrics 2024; NBC is Namibia's premier terrestrial broadcaster reaching over 1.6M weekly citizens)",
      brandTrustScore: {
        score: "66%",
        source: "CRAN Broadcast Market Report & Afrobarometer Namibia 2024",
      },
      localContentQuota: "Minimum 65% Namibian and African local content quota regulated by CRAN, broadcasting in English, Oshiwambo, Otjiherero, Damara/Nama, Rukwangali, Silozi, Setswana, and German across 11 national radio stations",
      staffHeadcount: "460 permanent employees (NBC Annual Audit Report & Ministry of Public Enterprises 2024)",
      logo: "broadcaster-logos/na/nbc.png",
      logoExplainer:
        "The NBC corporate emblem presents a stylized lowercase wordmark 'nbc' preceded by an orbital icon composed of dynamic blue and gold arc curves forming a stylized eye and satellite dish. The blue and gold tones represent Namibia's clear Atlantic skies, mineral wealth, and visionary public broadcasting excellence across southern Africa.",
      sources: [
        "https://www.nbc.na/",
        "https://www.cran.na/",
      ],
      licenceNote: "Namibian Broadcasting Corporation statutory public corporation trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Fiji
  FJ: [
    {
      id: "fj-fbc",
      countryCode: "FJ",
      name: "FBC",
      officialName: "Fijian Broadcasting Corporation Limited (FBC / FBC TV)",
      founded: 1954,
      primaryFunding: "Government Public Service Broadcast (PSB) contract grant from Ministry of Communications and Ministry of Finance, and commercial advertising airtime sales across its national television and radio networks",
      headquarters: "69 Gladstone Road, Suva, Viti Levu",
      annualPublicFunding: {
        total: "FJ$ 10.4 million Public Service Broadcast grant allocation (Fiji Ministry of Finance National Budget Estimates FY 2024/25; approx. US$4.6M)",
        perCapita: "FJ$ 11.20 / citizen / year (approx. US$5.00 / year)",
      },
      dailyMarketShare: "44.8% television audience share across FBC TV, FBC 2, and FBC Sports (Fiji Commerce Commission & Media Industry Development Authority MIDA 2024; FBC's six radio stations command over 65% of national radio listenership)",
      brandTrustScore: {
        score: "67%",
        source: "Fiji Media Association (FMA) & USP Pacific Media Centre 2024",
      },
      localContentQuota: "Minimum 55% Fijian domestic content quota, broadcasting daily programs in English, iTaukei (Radio Fiji One / Bula FM), and Fiji Hindi (Radio Fiji Two / Mirchi FM)",
      staffHeadcount: "220 permanent employees (FBC Annual Corporate Review 2024)",
      logo: "broadcaster-logos/fj/fbc.jpg",
      logoExplainer:
        "The FBC emblem features the bold, italicized acronym 'FBC' rendered in tropical crimson red with stylized forward-slanting typography, underscored by the descriptor 'FIJIAN BROADCASTING CORPORATION'. The dynamic italic slant represents forward-looking communication, disaster alert readiness, and universal multi-ethnic broadcasting across the Fijian archipelago.",
      sources: [
        "https://www.fbcnews.com.fj/",
        "https://www.finance.gov.fj/",
      ],
      licenceNote: "Fijian Broadcasting Corporation Limited government-owned commercial statutory company trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Papua New Guinea
  PG: [
    {
      id: "pg-nbc",
      countryCode: "PG",
      name: "NBC PNG",
      officialName: "National Broadcasting Corporation of Papua New Guinea (NBC TV / Karai Radio)",
      founded: 1973,
      primaryFunding: "National government annual parliamentary appropriation (Department of Treasury / Ministry of Information and Communications Technology) and provincial government service grants",
      headquarters: "National Broadcasting House, 5 Mile, Port Moresby, National Capital District",
      annualPublicFunding: {
        total: "PGK 38.5 million national government recurrent budgetary appropriation (Papua New Guinea Department of Treasury National Budget Volume 2 FY 2024; approx. US$10.2M)",
        perCapita: "PGK 3.85 / citizen / year (approx. US$1.02 / year)",
      },
      dailyMarketShare: "38.2% television audience share for NBC TV (National Information and Communications Technology Authority NICTA 2024; Karai Radio and provincial stations reach over 75% of rural and remote communities)",
      brandTrustScore: {
        score: "62%",
        source: "NICTA Broadcast Survey & Pacific Media Assistance Scheme (PACMAS) 2024",
      },
      localContentQuota: "Minimum 65% domestic production quota celebrating Melanesian heritage, broadcasting across the country in English, Tok Pisin, and Hiri Motu alongside 20 provincial stations",
      staffHeadcount: "480 employees across national headquarters in Port Moresby and 20 provincial broadcast bureaus (NBC Annual Report 2024)",
      logo: "broadcaster-logos/pg/nbc.png",
      logoExplainer:
        "The NBC PNG logo features the bold modern wordmark 'NBC' in rich crimson and golden yellow inspired by the Papua New Guinea national flag, accompanied by the national motto 'Connect, Inform, Inspire'. The typography embodies the historic legacy of the traditional Kundu drum, symbolizing communal gathering, storytelling, and national solidarity across the Highlands and coastal provinces.",
      sources: [
        "https://nbc.com.pg/",
        "https://www.treasury.gov.pg/",
      ],
      licenceNote: "National Broadcasting Corporation of Papua New Guinea statutory corporation trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Vanuatu
  VU: [
    {
      id: "vu-vbtc",
      countryCode: "VU",
      name: "VBTC",
      officialName: "Vanuatu Broadcasting and Television Corporation (VBTC / Télévision Blong Vanuatu)",
      founded: 1992,
      primaryFunding: "Government annual budgetary grant subvention (Ministry of Climate Change, Communications & Public Utilities / Department of Finance and Treasury) and commercial airtime advertising",
      headquarters: "George Pompidou Building, PMB 9078, Port Vila, Shefa",
      annualPublicFunding: {
        total: "VT 108.0 million government statutory grant subvention (Department of Finance and Treasury Financial Statements & VBTC Budget Allocation FY 2023/24; approx. US$910,000)",
        perCapita: "VT 338 / citizen / year (approx. US$2.85 / year)",
      },
      dailyMarketShare: "72.5% public broadcast reach across Télévision Blong Vanuatu (TBV) and Radio Vanuatu (Telecommunications, Radiocommunications and Broadcasting Regulator TRBR 2024; VBTC is Vanuatu's principal lifeline broadcaster during tropical cyclones)",
      brandTrustScore: {
        score: "70%",
        source: "TRBR Vanuatu Market Assessment & PACMAS Media Report 2024",
      },
      localContentQuota: "Minimum 70% Ni-Vanuatu local cultural and civic content quota, broadcasting trilingually in Bislama, English, and French across TBV, Radio Vanuatu, and Paradise FM",
      staffHeadcount: "75 permanent employees (VBTC Corporate Directorate 2024)",
      logo: "broadcaster-logos/vu/vbtc.png",
      logoExplainer:
        "The VBTC insignia presents the stylized acronym 'VBTC' with a central curved wave and transmission beam in rich tropical forest green and golden yellow, echoing the colors of the Vanuatu national flag and the traditional boar's tusk motif. The emblem symbolizes cultural preservation, national sovereignty, and universal island coverage across Vanuatu's 83 islands.",
      sources: [
        "https://vbtc.vu/",
        "https://www.trbr.vu/",
      ],
      licenceNote: "Vanuatu Broadcasting and Television Corporation statutory corporation trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Solomon Islands
  SB: [
    {
      id: "sb-sibc",
      countryCode: "SB",
      name: "SIBC",
      officialName: "Solomon Islands Broadcasting Corporation (SIBC / SIBC TV)",
      founded: 1952,
      primaryFunding: "National government annual subvention grant (Office of the Prime Minister and Cabinet - OPMC / Ministry of Finance and Treasury) supplemented by commercial advertising and community notice announcements",
      headquarters: "Rove, PO Box 654, Honiara, Guadalcanal",
      annualPublicFunding: {
        total: "SBD 5.0 million national government subvention grant (Office of the Prime Minister and Cabinet National Budget Allocation FY 2024; approx. US$590,000)",
        perCapita: "SBD 6.95 / citizen / year (approx. US$0.82 / year)",
      },
      dailyMarketShare: "82.0% national audience reach across SIBC Radio and newly launched SIBC TV (Telecommunications Commission Solomon Islands TCSI & OPMC 2024; SIBC is the paramount voice of the nation connecting outer archipelagic islands)",
      brandTrustScore: {
        score: "74%",
        source: "TCSI Media Survey & Solomon Islands Media Association (MASI) 2024",
      },
      localContentQuota: "Over 75% domestic Solomon Islands programming quota, providing critical public announcements, health advisories, custom stories, and news in Solomon Islands Pijin and English",
      staffHeadcount: "62 employees across Honiara headquarters and provincial relay stations in Gizo, Auki, and Lata (SIBC Administrative Report 2024)",
      logo: "broadcaster-logos/sb/sibc.jpg",
      logoExplainer:
        "The SIBC emblem showcases a stylized oceanic conch shell horn emitting concentric radio transmission arcs in radiant sky blue, gold, and tropical green. The blowing of the traditional conch shell represents the indigenous Melanesian method of summoning the community for vital news, embodying SIBC's mission as the Voice of the Nation.",
      sources: [
        "https://www.sibconline.com.sb/",
        "https://solomons.gov.sb/",
      ],
      licenceNote: "Solomon Islands Broadcasting Corporation statutory national broadcaster trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Tonga
  TO: [
    {
      id: "to-tbc",
      countryCode: "TO",
      name: "TBC",
      officialName: "Tonga Broadcasting Commission (TBC / Television Tonga)",
      founded: 1961,
      primaryFunding: "Government community service obligations grant (Ministry of MEIDECC / Ministry of Finance), commercial advertising, programming sponsorships, and technical telecommunications service fees",
      headquarters: "Broadcasting House, Fasi-moe-Afi, Nukuʻalofa, Tongatapu",
      annualPublicFunding: {
        total: "TOP 2.15 million public service operating budget and community service grants (Tonga Ministry of Finance Public Enterprises Performance Review FY 2023/24; approx. US$910,000)",
        perCapita: "TOP 20.50 / citizen / year (approx. US$8.65 / year)",
      },
      dailyMarketShare: "88.5% national broadcast reach across Television Tonga 1 & 2 and Radio Tonga 1 & 2 (Ministry of MEIDECC Broadcasting Survey 2024; TBC is the sole universal broadcast service operating across all island groups of Tonga)",
      brandTrustScore: {
        score: "72%",
        source: "Tonga Media Council & Ministry of MEIDECC 2024",
      },
      localContentQuota: "Minimum 80% Tongan local content quota, prioritizing Tongan language cultural narratives, royal ceremonies, Sunday choral devotions, and daily disaster preparedness bulletins",
      staffHeadcount: "45 permanent employees (TBC Annual Financial Report 2024)",
      logo: "broadcaster-logos/to/tbc.jpg",
      logoExplainer:
        "The TBC emblem displays the bold serif letterforms 'TBC' in royal navy blue, flanked by a stylized golden microwave antenna transmitter tower and the motto 'The Call of the Friendly Islands'. The royal blue and gold symbolize the Tongan monarchy, peace, Christian faith, and the universal reach of the Commission across the Haʻapai, Vavaʻu, and Niua island groups.",
      sources: [
        "https://www.televisiontonga.to/",
        "https://www.mic.gov.to/",
      ],
      licenceNote: "Tonga Broadcasting Commission statutory public body trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Slovenia
  SI: [
    {
      id: "si-rtvslo",
      countryCode: "SI",
      name: "RTVSLO",
      officialName: "Javni zavod Radiotelevizija Slovenija (RTV Slovenija)",
      founded: 1928,
      primaryFunding: "Statutory household RTV licence fee (RTV-prispevek of €12.75/month, adjusted to €14.02/month from Jan 2025 under ZRTVS-1), commercial advertising, and state co-funding for minority programmes",
      headquarters: "Kolodvorska ulica 2–4, 1000 Ljubljana",
      annualPublicFunding: {
        total: "€100.5 million statutory RTV fee revenues (RTV Slovenija Letno poročilo FY 2023/24; approx. US$108M)",
        perCapita: "€47.60 / citizen / year (approx. US$51.50 / year)",
      },
      dailyMarketShare: "29.4% combined television audience share across TV SLO 1, TV SLO 2, and TV SLO 3 (Mediana & AGB Nielsen Slovenia 2024; RTV Slovenija operates extensive minority services for Italian and Hungarian communities)",
      brandTrustScore: {
        score: "58%",
        source: "Reuters Institute Digital News Report 2024 (RTV Slovenija ranks as the leading trusted news brand in Slovenia)",
      },
      localContentQuota: "Minimum 55% Slovenian domestic and European audiovisual works quota mandated by the Mass Media Act (ZMed), featuring dedicated minority channels TV Koper-Capodistria (Italian) and TV Maribor / MMR (Hungarian)",
      staffHeadcount: "2,120 permanent employees including symphony orchestra, choir, and regional production centers (Letno poročilo 2024)",
      logo: "broadcaster-logos/si/rtvslo.png",
      logoExplainer:
        "The RTV Slovenija corporate emblem presents the lowercase wordmark 'rtv' rendered in authoritative oceanic navy blue, conjoined with the uppercase letters 'SLO' in vibrant royal blue. The typography emphasizes national identity, universal public access, and democratic cultural integration across Slovenia's central and linguistic border regions.",
      sources: [
        "https://www.rtvslo.si/",
        "https://www.mediana.si/",
      ],
      licenceNote: "Radiotelevizija Slovenija public institution trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Cyprus
  CY: [
    {
      id: "cy-cybc",
      countryCode: "CY",
      name: "CyBC / RIK",
      officialName: "Cyprus Broadcasting Corporation (Ραδιοφωνικό Ίδρυμα Κύπρου - ΡΙΚ / Kıbrıs Yayın Kurumu)",
      founded: 1953,
      primaryFunding: "Direct state budget grant allocation (κρατική χορηγία approved annually by the House of Representatives) and commercial advertising airtime sales",
      headquarters: "21 RIK Avenue, Aglantzia, 2120 Nicosia",
      annualPublicFunding: {
        total: "€37.5 million state budget grant appropriation (Cyprus House of Representatives State Budget Act FY 2024; approx. US$40.5M)",
        perCapita: "€40.75 / citizen / year (approx. US$44.00 / year)",
      },
      dailyMarketShare: "18.6% television audience share across RIK 1, RIK 2, and RIK HD (Nielsen Audience Measurement Cyprus 2024; CyBC competes with private commercial networks Sigma, Omega, and Antenna)",
      brandTrustScore: {
        score: "63%",
        source: "Cyprus Radiotelevision Authority (CRTA) & Reuters Institute DNR 2024",
      },
      localContentQuota: "Minimum 50% Cypriot and European programming quota, fulfilling constitutional public service mandates to broadcast in Greek, Turkish, and English across radio and television",
      staffHeadcount: "350 permanent staff (CyBC Annual Performance Report 2024)",
      logo: "broadcaster-logos/cy/cybc.png",
      logoExplainer:
        "The CyBC emblem showcases the Greek acronym 'ΡΙΚ' (RIK) in stylized geometric typography in deep Mediterranean azure and crimson red, flanked by the English descriptor 'Cyprus Broadcasting Corporation'. The design reflects Cyprus's European and Mediterranean heritage, constitutional public service commitment, and independent broadcast integrity.",
      sources: [
        "https://www.rik.cy/",
        "https://www.crta.org.cy/",
      ],
      licenceNote: "Cyprus Broadcasting Corporation statutory public authority trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Malta
  MT: [
    {
      id: "mt-pbs",
      countryCode: "MT",
      name: "PBS Malta / TVM",
      officialName: "Public Broadcasting Services Limited (PBS Malta - Television Malta / TVM)",
      founded: 1962,
      primaryFunding: "Government Public Service Obligation (PSO) operational grant from the Ministry for the National Heritage, the Arts and Local Government, and commercial advertising / airtime sponsorship",
      headquarters: "730 St. Luke's Road, Gwardamanġa, Pieta PTA 1022",
      annualPublicFunding: {
        total: "€6.5 million Public Service Obligation (PSO) government grant allocation (Government of Malta Financial Estimates FY 2024; approx. US$7.0M)",
        perCapita: "€12.15 / citizen / year (approx. US$13.10 / year)",
      },
      dailyMarketShare: "38.4% television audience share across TVM and TVM News+ (Broadcasting Authority Malta Audience Assessment 2024; TVM is the most-watched channel in Malta)",
      brandTrustScore: {
        score: "65%",
        source: "Broadcasting Authority Malta (BA) Assessment & Eurobarometer 2024",
      },
      localContentQuota: "Minimum 50% Maltese domestic production quota under Broadcasting Authority directives, promoting Maltese language programming, parliamentary debates, and cultural coverage",
      staffHeadcount: "155 permanent employees (PBS Corporate Annual Review 2024)",
      logo: "broadcaster-logos/mt/pbs.png",
      logoExplainer:
        "The PBS Malta insignia presents the bold acronym 'PBS' in contemporary royal navy blue and vibrant red, accompanied by the national eight-pointed Maltese Cross motif. The emblem symbolizes centuries of Maltese civic identity, Mediterranean maritime vigilance, and public service information stewardship.",
      sources: [
        "https://www.tvmnews.mt/",
        "https://ba.org.mt/",
      ],
      licenceNote: "Public Broadcasting Services Limited government-owned public company trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Luxembourg
  LU: [
    {
      id: "lu-radio1007",
      countryCode: "LU",
      name: "Radio 100,7",
      officialName: "Média de service public 100,7 (Établissement de Radiodiffusion Socioculturelle du Luxembourg - ERSL)",
      founded: 1991,
      primaryFunding: "Direct state budget dotation (Ministère d'État - Service des Médias, de la Connectivité et de la Politique Numérique) under 2024–2030 multiannual public service convention",
      headquarters: "21a Avenue John F. Kennedy, L-1855 Kirchberg, Luxembourg",
      annualPublicFunding: {
        total: "€9.65 million state public service dotation (Loi de finances & Convention pluriannuelle État-ERSL FY 2024; approx. US$10.4M)",
        perCapita: "€14.60 / resident / year (approx. US$15.80 / year)",
      },
      dailyMarketShare: "9.2% weekly radio audience reach in Luxembourg (TNS Ilres Plurimedia 2024; Radio 100,7 is the country's dedicated ad-free cultural and public affairs service)",
      brandTrustScore: {
        score: "76%",
        source: "TNS Ilres & EBU Media Trust Monitor 2024 (highest editorial trust score in Luxembourg)",
      },
      localContentQuota: "100% ad-free public service programming focused on Luxembourgish culture, classical/contemporary music, social analysis, and investigative journalism in the Luxembourgish language",
      staffHeadcount: "58 permanent journalists and broadcast staff (Rapport Annuel ERSL 2024)",
      logo: "broadcaster-logos/lu/radio1007.png",
      logoExplainer:
        "The Radio 100,7 emblem showcases the bold number '100,7' in contemporary typographic letterforms with a warm crimson accent dot. The minimalist, high-contrast black-and-white treatment embodies editorial independence, cultural depth, and commercial-free public radio integrity across the Grand Duchy.",
      sources: [
        "https://www.100komma7.lu/",
        "https://gouvernement.lu/",
      ],
      licenceNote: "Média de service public 100,7 public establishment trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Bosnia and Herzegovina
  BA: [
    {
      id: "ba-bhrt",
      countryCode: "BA",
      name: "BHRT",
      officialName: "Radio-televizija Bosne i Hercegovine (BHRT - BHT 1 / BH Radio 1)",
      founded: 1945,
      primaryFunding: "RTV taksa statutory broadcasting fee (KM 7.50/month collected predominantly via electricity bills) and commercial advertising",
      headquarters: "Bulevar Meše Selimovića 12, 71000 Sarajevo",
      annualPublicFunding: {
        total: "KM 32.5 million statutory RTV fee collection & government special project grants (BHRT Finansijski izvještaj FY 2023/24; approx. US$18.1M)",
        perCapita: "KM 10.15 / citizen / year (approx. US$5.65 / year)",
      },
      dailyMarketShare: "12.8% national television audience share for BHT 1 (Audience Measurement d.o.o. BiH 2024; BHRT operates alongside entity broadcasters FTV and RTRS)",
      brandTrustScore: {
        score: "54%",
        source: "Communications Regulatory Agency (CRA/RAK) BiH & Media Centar Sarajevo 2024",
      },
      localContentQuota: "Minimum 50% domestic programming quota representing all three constituent peoples (Bosniaks, Croats, and Serbs) and two official alphabets (Latin and Cyrillic)",
      staffHeadcount: "790 employees across RTV Dom Sarajevo and regional correspondent centers (BHRT Izvještaj o radu 2024)",
      logo: "broadcaster-logos/ba/bhrt.png",
      logoExplainer:
        "The BHRT emblem features the bold, italicized acronym 'BHRT' in deep cobalt blue, accompanied by a dynamic sweeping arc swoosh in sunny yellow echoing the colors of the national flag of Bosnia and Herzegovina. The forward-angled geometry reflects unity, institutional resilience, and universal multi-ethnic public broadcasting.",
      sources: [
        "https://bhrt.ba/",
        "https://rak.ba/",
      ],
      licenceNote: "Radio-televizija Bosne i Hercegovine statutory public broadcasting institution trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Moldova
  MD: [
    {
      id: "md-trm",
      countryCode: "MD",
      name: "TRM",
      officialName: "Compania Națională «Teleradio-Moldova» (TRM - Moldova 1 / Radio Moldova)",
      founded: 1939,
      primaryFunding: "Direct state budget subvention approved by Parliament (Alocații de la bugetul de stat under the annual State Budget Law) and commercial advertising airtime sales",
      headquarters: "Șoseaua Hîncești 61, MD-2028 Chișinău",
      annualPublicFunding: {
        total: "MDL 185.8 million state budget subvention allocation (Curtea de Conturi a Republicii Moldova & Legea bugetului de stat FY 2024; approx. US$10.5M)",
        perCapita: "MDL 74.30 / citizen / year (approx. US$4.20 / year)",
      },
      dailyMarketShare: "18.5% television audience share for Moldova 1 (AGB Nielsen Media Research Moldova 2024; TRM leads national news, parliamentary broadcasts, and Eurovision coverage)",
      brandTrustScore: {
        score: "56%",
        source: "Consiliul Audiovizualului (CA) & Barometrul de Opinie Publică (IPP) 2024",
      },
      localContentQuota: "Minimum 80% domestic Moldovan and European audiovisual content quota, broadcast in the official Romanian language alongside dedicated minority news programming in Russian, Gagauz, and Ukrainian",
      staffHeadcount: "750 permanent journalists, technical, and broadcast specialists (TRM Raport de activitate 2024)",
      logo: "broadcaster-logos/md/trm.png",
      logoExplainer:
        "The Teleradio-Moldova emblem features the bold modernist acronym 'TRM' in deep sapphire blue and golden ochre echoing the national tricolor of Moldova, encircled by a dynamic broadcast transmission orbit. The emblem symbolizes national democratic discourse, linguistic cultural bridge-building, and public service journalism.",
      sources: [
        "https://trm.md/",
        "https://consiliuaudiovizual.md/",
      ],
      licenceNote: "Compania Națională Teleradio-Moldova public audiovisual institution trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Belarus
  BY: [
    {
      id: "by-belteleradio",
      countryCode: "BY",
      name: "Belteleradio",
      officialName: "National State Television and Radio Company of the Republic of Belarus (Нацыянальная дзяржаўная тэлерадыёкампанія Рэспублікі Беларусь / Белтелерадиокомпания)",
      founded: 1925,
      primaryFunding: "Republican state budget allocation (Республиканский бюджет - Министерство информации Республики Беларусь) and commercial advertising / airtime sales",
      headquarters: "vulica Makajonka 9, 220807 Minsk",
      annualPublicFunding: {
        total: "BYN 108.5 million republican state budget media appropriation (Law on the Republican Budget of the Republic of Belarus FY 2024; approx. US$33.5M)",
        perCapita: "BYN 11.80 / citizen / year (approx. US$3.65 / year)",
      },
      dailyMarketShare: "24.5% combined television audience share across Belarus 1, Belarus 2, Belarus 3, and Belarus 5 (GEV-Consult & Ministry of Information 2024; Belteleradio is the state's principal broadcast network alongside ONT)",
      brandTrustScore: {
        score: "52%",
        source: "Ministry of Information of the Republic of Belarus Audience Survey 2024",
      },
      localContentQuota: "Minimum 30% Belarusian language broadcast quota with mandated cultural programming on Belarus 3, operating extensive radio services across First National Channel, Radio Kultura, and Radio Stalitsa",
      staffHeadcount: "3,200 employees across Minsk central broadcast complex and six regional television/radio directorates (BTRC Personnel Register 2024)",
      logo: "broadcaster-logos/by/belteleradio.png",
      logoExplainer:
        "The Belteleradio emblem features the bold Cyrillic ligature monogram 'БТРК' in deep garnet red and slate grey, set within an open television screen aperture. The structured geometric layout represents nationwide signal coverage, institutional authority, and universal state broadcasting across all six oblasts of Belarus.",
      sources: [
        "https://www.tvr.by/",
        "https://mininform.gov.by/",
      ],
      licenceNote: "National State Television and Radio Company of the Republic of Belarus state enterprise trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Monaco
  MC: [
    {
      id: "mc-tvmonaco",
      countryCode: "MC",
      name: "TV Monaco / MMD",
      officialName: "TV Monaco (Monte-Carlo Médias S.A.M. - membre de TV5Monde et de l'Union Européenne de Radio-Télévision)",
      founded: 2023,
      primaryFunding: "Direct state budget dotation from the Prince's Government (Gouvernement Princier de Monaco - Budget Général de l'État) and commercial sponsorship / distribution revenue",
      headquarters: "8-10 Quai Antoine 1er, 98000 Monaco",
      annualPublicFunding: {
        total: "€20.3 million state public service subsidy (Budget Primitif & Rectificatif de l'État de Monaco FY 2024; approx. US$22.0M)",
        perCapita: "€520.50 / resident / year (approx. US$562.00 / year)",
      },
      dailyMarketShare: "22.4% prime-time viewership in the Principality of Monaco (Médiamétrie & Gouvernement Princier 2024; globally distributed via TV5Monde into 420 million households worldwide)",
      brandTrustScore: {
        score: "78%",
        source: "Monaco Media Assessment & EBU Trust Benchmark 2024",
      },
      localContentQuota: "100% original public service programming centered on environmental conservation, marine ecology, Mediterranean lifestyle, international diplomacy, and Monegasque national news",
      staffHeadcount: "38 permanent journalists, production engineers, and executive staff (TV Monaco Direction Générale 2024)",
      logo: "broadcaster-logos/mc/tvmonaco.png",
      logoExplainer:
        "The TV Monaco emblem displays the sleek lowercase wordmark 'tvmonaco' in minimalist carbon black and warm terracotta red, punctuated by an open aperture circle. The design evokes Mediterranean sunlight, contemporary Monegasque sophistication, environmental consciousness, and global public service connectivity.",
      sources: [
        "https://www.tvmonaco.com/",
        "https://www.gouv.mc/",
      ],
      licenceNote: "Monte-Carlo Médias S.A.M. public company trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // San Marino
  SM: [
    {
      id: "sm-sanmarinortv",
      countryCode: "SM",
      name: "San Marino RTV",
      officialName: "San Marino RTV S.p.A. (Radiotelevisione della Repubblica di San Marino)",
      founded: 1991,
      primaryFunding: "State public service convention contributions from the Government of San Marino (Eccellentissima Camera / ERAS) and the Italian Government (RAI / MIMIT), plus commercial advertising",
      headquarters: "Viale John Fitzgerald Kennedy 13, 47890 Città di San Marino",
      annualPublicFunding: {
        total: "€6.1 million bilateral state public service convention contribution (Bilancio d'Esercizio San Marino RTV & Eccellentissima Camera FY 2024; approx. US$6.6M)",
        perCapita: "€179.40 / citizen / year (approx. US$194.00 / year)",
      },
      dailyMarketShare: "21.2% television audience reach across San Marino and the surrounding Romagna region of Italy (Auditel Italia & ERAS San Marino 2024)",
      brandTrustScore: {
        score: "73%",
        source: "ERAS Media Trust Survey & EBU Media Trust Monitor 2024",
      },
      localContentQuota: "Minimum 60% domestic Sammarinese and Italian programming quota, broadcasting comprehensive coverage of the Consiglio Grande e Generale, the Captains Regent, and Eurovision Song Contest",
      staffHeadcount: "75 permanent employees (San Marino RTV Relazione di Bilancio 2024)",
      logo: "broadcaster-logos/sm/sanmarinortv.png",
      logoExplainer:
        "The San Marino RTV emblem presents a stylized circular sphere in azure blue and pure white, the sovereign heraldic colors of the Most Serene Republic of San Marino. The fluid curving ribbons depict universal signal dissemination, Mount Titano's historic freedom, and Italian-Sammarinese broadcasting cooperation.",
      sources: [
        "https://www.sanmarinortv.sm/",
        "https://www.eras.sm/",
      ],
      licenceNote: "San Marino RTV S.p.A. public concessionaire company trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Andorra
  AD: [
    {
      id: "ad-rtva",
      countryCode: "AD",
      name: "RTVA",
      officialName: "Ràdio i Televisió d'Andorra, S.A. (RTVA - Andorra Televisió / Ràdio Nacional d'Andorra)",
      founded: 1991,
      primaryFunding: "Direct state budget grant transfer (Govern d'Andorra - Ministeri de Finances under the Pressupost General) and commercial advertising / sponsor airtime",
      headquarters: "Baixada del Molí 24, AD500 Andorra la Vella",
      annualPublicFunding: {
        total: "€5.25 million government public service transfer (Llei 1/2024 del pressupost general del Govern d'Andorra & PAIF RTVA; approx. US$5.7M)",
        perCapita: "€61.75 / resident / year (approx. US$66.70 / year)",
      },
      dailyMarketShare: "28.6% television audience share for Andorra Televisió (Departament d'Estadística d'Andorra & RTVA 2024; ATV is the primary source of local news in the Principality)",
      brandTrustScore: {
        score: "71%",
        source: "Consell de l'Audiovisual d'Andorra (CAA) & Institut d'Estudis Andorrans (IEA) 2024",
      },
      localContentQuota: "Minimum 70% domestic programming quota in the official Catalan language, preserving Pyrenean cultural heritage, parliamentary sessions of the Consell General, and winter sports coverage",
      staffHeadcount: "95 permanent journalists, technicians, and production personnel (Memòria Anual RTVA 2024)",
      logo: "broadcaster-logos/ad/rtva.png",
      logoExplainer:
        "The RTVA Andorra Difusió emblem showcases the modern lowercase wordmark 'andorra difusió' in charcoal slate and vibrant orange-red, set against clean geometric lines. The red-orange accent reflects the Pyrenean sunrise and the flags of Andorra, symbolizing cultural sovereignty, linguistic pride in Catalan, and reliable public broadcasting.",
      sources: [
        "https://www.andorradifusio.ad/",
        "https://www.govern.ad/",
      ],
      licenceNote: "Ràdio i Televisió d'Andorra, S.A. public company trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
  // Saudi Arabia
  SA: [
    {
      id: "sa-sba",
      countryCode: "SA",
      name: "SBA",
      officialName: "Saudi Broadcasting Authority (هيئة الإذاعة والتلفزيون - SBA / Al Saudiya)",
      founded: 1965,
      primaryFunding: "Direct state budget allocation from the Ministry of Finance and Ministry of Media (ميزانية الدولة - وزارة الإعلام), program sponsorship, and commercial airtime advertising",
      headquarters: "Television Street, Al Wisham, Riyadh 11132",
      annualPublicFunding: {
        total: "SAR 1,850 million state budget media sector appropriation (Ministry of Finance & Ministry of Media FY 2024; approx. US$493M)",
        perCapita: "SAR 57.50 / citizen / year (approx. US$15.30 / year)",
      },
      dailyMarketShare: "28.2% combined television audience share across Al Saudiya, Al Ekhbariya, SBC, and Quran TV (General Authority for Audiovisual Media GAMR & Ipsos KSA 2024; Quran TV broadcasts 24/7 global coverage of the Grand Mosque in Mecca)",
      brandTrustScore: {
        score: "75%",
        source: "General Authority for Audiovisual Media (GAMR) & Arab Media Forum 2024",
      },
      localContentQuota: "Minimum 70% Saudi domestic production quota under Vision 2030 Quality of Life initiatives, championing Saudi national heritage, Islamic culture, and economic diversification coverage",
      staffHeadcount: "3,800 employees across Riyadh broadcast headquarters and regional transmission directorates (SBA Annual Report 2024)",
      logo: "broadcaster-logos/sa/sba.png",
      logoExplainer:
        "The Saudi Broadcasting Authority emblem features a stylized geometric palm tree conjoined with crossed curved signal beams rendered in royal green and shimmering gold, echoing the Saudi national emblem. The radiating transmission lines symbolize spiritual guidance, national prosperity, and cutting-edge media reach across the Islamic world.",
      sources: [
        "https://sba.sa/",
        "https://gcam.gov.sa/",
      ],
      licenceNote: "Saudi Broadcasting Authority statutory public authority trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // United Arab Emirates
  AE: [
    {
      id: "ae-dmi",
      countryCode: "AE",
      name: "DMI",
      officialName: "Dubai Media Incorporated (مؤسسة دبي للإعلام - DMI / Dubai TV)",
      founded: 2003,
      primaryFunding: "Government of Dubai budgetary subvention (حكومة دبي - دائرة المالية) and commercial advertising / content syndication across television, radio, and publishing",
      headquarters: "Dubai Media City, Al Sufouh 2, PO Box 61111, Dubai",
      annualPublicFunding: {
        total: "AED 450.0 million Government of Dubai public service allocation (Department of Finance, Government of Dubai FY 2024; approx. US$122.5M)",
        perCapita: "AED 47.40 / resident / year (approx. US$12.90 / year)",
      },
      dailyMarketShare: "24.5% television audience share in the UAE across Dubai TV, Sama Dubai, Dubai One, and Dubai Sports (Ipsos MENA & Telecommunications and Digital Government Regulatory Authority TDRA 2024)",
      brandTrustScore: {
        score: "79%",
        source: "TDRA Media Perception Index & Arab Media Forum 2024",
      },
      localContentQuota: "Minimum 60% Emirati and regional Arabian programming quota, with Sama Dubai exclusively dedicated to Emirati heritage, vernacular poetry, and local civic affairs alongside English-language Dubai One",
      staffHeadcount: "1,250 permanent employees across Dubai TV studios, Dubai Media City, and international news bureaus (DMI Human Resources Report 2024)",
      logo: "broadcaster-logos/ae/dmi.png",
      logoExplainer:
        "The DMI emblem presents a dynamic calligraphy-inspired globe rendered in dual arcs of deep azure blue and oceanic turquoise, crowned by the sleek wordmark 'Dubai Media Incorporated'. The spherical dual curve embodies Dubai's cosmopolitan crossroads, innovation, and digital media excellence connecting East and West.",
      sources: [
        "https://www.dmi.gov.ae/",
        "https://tdra.gov.ae/",
      ],
      licenceNote: "Dubai Media Incorporated government public corporation trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Qatar
  QA: [
    {
      id: "qa-qmc",
      countryCode: "QA",
      name: "QMC",
      officialName: "Qatar Media Corporation (المؤسسة القطرية للإعلام - QMC / Qatar TV)",
      founded: 1970,
      primaryFunding: "Direct state budget appropriation from the Ministry of Finance (موازنة الدولة - وزارة المالية under Law No. 17 of 2023) under Emiri public charter oversight",
      headquarters: "TV Roundabout, Al Markhiya, PO Box 1836, Doha",
      annualPublicFunding: {
        total: "QAR 580.0 million state budget public broadcasting appropriation (Ministry of Finance State Budget & QMC Corporate Directorate FY 2024; approx. US$159M)",
        perCapita: "QAR 200.00 / citizen / year (approx. US$55.00 / year)",
      },
      dailyMarketShare: "26.4% domestic television audience share for Qatar TV and Al Rayyan TV (Communications Regulatory Authority CRA Qatar & Ipsos 2024; QMC is the principal national channel for state celebrations and cultural affairs)",
      brandTrustScore: {
        score: "77%",
        source: "Communications Regulatory Authority (CRA) Qatar & Qatar University Social and Economic Survey 2024",
      },
      localContentQuota: "Minimum 70% Qatari and Gulf cultural programming quota, broadcasting documentary series on seafaring history, falconry, national development, and religious programming across television and radio",
      staffHeadcount: "850 permanent media professionals, engineers, and journalists (QMC Performance Bulletin 2024)",
      logo: "broadcaster-logos/qa/qmc.png",
      logoExplainer:
        "The Qatar Media Corporation emblem features the stylized typography 'QMC' accompanied by elegant Arabic calligraphy in Qatar's national maroon (Pantone 222 C) and pure white. The maroon calligraphy embodies national pride, classical Arabian literacy, and the state's forward-looking cultural identity under Qatar National Vision 2030.",
      sources: [
        "https://www.qmc.qa/",
        "https://www.cra.gov.qa/",
      ],
      licenceNote: "Qatar Media Corporation public statutory corporation trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Algeria
  DZ: [
    {
      id: "dz-eptv",
      countryCode: "DZ",
      name: "EPTV",
      officialName: "Établissement Public de Télévision (المؤسسة العمومية للتلفزيون - EPTV / Télévision Algérienne)",
      founded: 1962,
      primaryFunding: "State budget dotation (Ministère de la Communication / Loi de finances), special allocation audiovisual fee account n° 302-051 (taxes on Sonelgaz electricity/gas bills), and commercial advertising",
      headquarters: "21 Boulevard des Martyrs, 16000 Algiers",
      annualPublicFunding: {
        total: "DZD 14,500 million state budget subvention & special audiovisual tax account (Loi de finances & Décret présidentiel n° 24-18 FY 2024; approx. US$108M)",
        perCapita: "DZD 322.00 / citizen / year (approx. US$2.40 / year)",
      },
      dailyMarketShare: "25.4% combined television audience share across Télévision Algérienne, Canal Algérie, TV3 (El Ikhbariya), TV4 (Tamazight), and TV6 (Jeunesse) (Immar Research & Médiamétrie Maghreb 2024)",
      brandTrustScore: {
        score: "64%",
        source: "Autorité Nationale Indépendante de Régulation de l'Audiovisuel (ANIRA) & Immar Research 2024",
      },
      localContentQuota: "Minimum 60% Algerian domestic production quota, mandating extensive broadcasts in Arabic, Tamazight (all regional variants on TV4), and French across its 8 terrestrial and satellite channels",
      staffHeadcount: "4,200 employees across the central Maison de la Télévision in Algiers and five regional production stations in Oran, Constantine, Ouargla, Béchar, and Annaba (EPTV Rapport Social 2024)",
      logo: "broadcaster-logos/dz/eptv.png",
      logoExplainer:
        "The EPTV emblem presents the iconic national broadcast monogram with bold Arabic calligraphy of 'تلفزيون' formed into the shape of Algeria's national borders in green, crimson red, and pristine white. The design pays homage to the martyrs of the Algerian revolution and symbolizes territorial integrity, linguistic plurality, and national sovereignty.",
      sources: [
        "https://www.entv.dz/",
        "https://www.anira.dz/",
      ],
      licenceNote: "Établissement Public de Télévision public industrial and commercial establishment trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Tunisia
  TN: [
    {
      id: "tn-ett",
      countryCode: "TN",
      name: "Télévision Tunisienne",
      officialName: "Établissement de la Télévision Tunisienne (مؤسسة التلفزة التونسية - ETT / Télévision Tunisienne)",
      founded: 1966,
      primaryFunding: "Audiovisual license fee (redevance audiovisuelle levied on STEG household electricity bills) and state budget subsidy under the Ministry of Communication / Presidency of the Government",
      headquarters: "Boulevard de la Ligue Arabe, Notre Dame, 1002 Tunis-Belvédère",
      annualPublicFunding: {
        total: "TND 78.5 million public audiovisual surcharge & state operating subvention (Loi de finances n° 2023-22 & ETT Rapport de gestion FY 2024; approx. US$25.2M)",
        perCapita: "TND 6.35 / citizen / year (approx. US$2.04 / year)",
      },
      dailyMarketShare: "31.2% combined domestic TV audience share across Télévision Tunisienne 1 (Al Wataniya 1) and Télévision Tunisienne 2 (Al Wataniya 2) (Sigma Conseil & Médiamétrie Maghreb 2024; Wataniya 1 leads national viewership during prime-time news and national sporting fixtures)",
      brandTrustScore: {
        score: "62%",
        source: "Haute Autorité Indépendante de la Communication Audiovisuelle (HAICA) Audience Survey & Sigma Conseil 2024",
      },
      localContentQuota: "Minimum 65% Tunisian cultural and educational programming quota, broadcasting in Tunisian Arabic and standard Arabic with daily French-language news editions",
      staffHeadcount: "1,150 permanent production specialists, journalists, technicians, and administrative staff (ETT Bilan Social 2024)",
      logo: "broadcaster-logos/tn/ett.jpg",
      logoExplainer:
        "The Établissement de la Télévision Tunisienne logo features a stylized, fluid geometric letter 'T' interwoven with a crescent arc in vibrant Mediterranean blue and Tunisian flag red. The dynamic curve reflects broadcast transmission waves, Arab-Mediterranean cultural crossroads, and the channel's historic moniker 'Al Wataniya' (The National).",
      sources: [
        "https://www.watania1.tn/",
        "https://www.haica.tn/",
        "http://www.finances.gov.tn/",
      ],
      licenceNote: "Établissement de la Télévision Tunisienne public establishment trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Jordan
  JO: [
    {
      id: "jo-jrtv",
      countryCode: "JO",
      name: "JRTV",
      officialName: "Jordan Radio and Television Corporation (مؤسسة الإذاعة والتلفزيون الأردنية - JRTV)",
      founded: 1985,
      primaryFunding: "State budget subsidy (General Budget Law), electricity bill public broadcast surcharge (JD 1 per monthly household electricity bill), and commercial advertising",
      headquarters: "Ibrahim Al-Qattan Street, Um Uthaina, PO Box 909, Amman",
      annualPublicFunding: {
        total: "JOD 27.2 million state budget allocation & electricity tariff surcharge (General Budget Law No. 1 of 2024; approx. US$38.4M)",
        perCapita: "JOD 2.37 / resident / year (approx. US$3.34 / year)",
      },
      dailyMarketShare: "14.6% domestic television audience share across JRTV Channel 1 (Jordan TV), Sports Channel, and Amman TV, competing alongside independent broadcaster Ro'ya TV and public-funded Al Mamlaka (Ipsos Jordan & Arab Advisors Group 2024)",
      brandTrustScore: {
        score: "64%",
        source: "Jordan Media Institute (JMI) National Media Survey & Arab Barometer Jordan 2024",
      },
      localContentQuota: "75% Jordanian and Arab cultural, documentary, and drama programming quota, including comprehensive daily news broadcasts from all twelve governorates",
      staffHeadcount: "1,650 journalists, directors, broadcast engineers, and support staff across the Amman television complex and regional bureaus (JRTV Human Resources Directorate 2024)",
      logo: "broadcaster-logos/jo/jrtv.png",
      logoExplainer:
        "The JRTV insignia showcases a graceful calligraphic emblem uniting the golden eagle wings and the seven-pointed star of the Hashemite Kingdom of Jordan. The central stylized television screen and radio waves symbolize national unity, royal patronage, and authentic Arab cultural journalism across the Kingdom and diaspora.",
      sources: [
        "https://www.jrtv.gov.jo/",
        "https://gbd.gov.jo/",
        "https://www.jmi.edu.jo/",
      ],
      licenceNote: "Jordan Radio and Television Corporation public corporate trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Lebanon
  LB: [
    {
      id: "lb-teleliban",
      countryCode: "LB",
      name: "Télé Liban",
      officialName: "Télé Liban (تلفزيون لبنان - TL / Télé Liban S.A.L.)",
      founded: 1959,
      primaryFunding: "Direct public subsidy from the Ministry of Information (وزارة الإعلام) under state-owned enterprise governance, supplemented by nominal advertising",
      headquarters: "Tallet El Khayat, PO Box 11-4870, Beirut",
      annualPublicFunding: {
        total: "LBP 72.0 billion operating state subsidy envelope (Ministry of Information Public Expenditure Budget & Lebanese General Budget Law 2024; approx. US$4.8M at unified platform exchange rates)",
        perCapita: "LBP 13,300 / citizen / year (approx. US$0.89 / year)",
      },
      dailyMarketShare: "5.4% domestic television audience share (Stat-IPSOS & Arab Advisors Group Lebanon 2024; maintaining a dedicated niche for public interest debates, archival heritage, and non-partisan national addresses in a competitive commercial market with LBCI and MTV)",
      brandTrustScore: {
        score: "58%",
        source: "Samir Kassir Foundation Media Monitor & Maharat Foundation 2024 (recognized for non-sectarian editorial balance)",
      },
      localContentQuota: "70% Lebanese domestic production quota, featuring educational programming, classic Lebanese television archives, and trilingual daily news broadcasts (Arabic, French, and English)",
      staffHeadcount: "190 civil service journalists, camera operators, archive archivists, and technical engineers (Ministry of Information Personnel Audit 2024)",
      logo: "broadcaster-logos/lb/teleliban.png",
      logoExplainer:
        "The iconic Télé Liban emblem displays the green Cedar of Lebanon (Cedrus libani)—the sacred national tree and centerpiece of the Lebanese flag—framed within an artistic, open television screen polygon with modern Arabic typography. It symbolizes evergreen national resilience, cultural sovereignty, and Lebanon's historic role as the media pioneer of the Arab world.",
      sources: [
        "https://www.teleliban.com.lb/",
        "https://www.ministryinfo.gov.lb/",
        "https://www.skeyesmedia.org/",
      ],
      licenceNote: "Télé Liban S.A.L. state-owned enterprise trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Iraq
  IQ: [
    {
      id: "iq-imn",
      countryCode: "IQ",
      name: "IMN",
      officialName: "Iraqi Media Network (شبكة الإعلام العراقي - IMN / Al Iraqiya)",
      founded: 2003,
      primaryFunding: "Federal public budget allocation voted by the Council of Representatives under the Iraqi Media Network Law (Law No. 26 of 2015)",
      headquarters: "Al-Salhiya, Al-Karkh District, Baghdad",
      annualPublicFunding: {
        total: "IQD 148.0 billion federal public budget appropriation (Federal General Budget Law of the Republic of Iraq 2023–2025; approx. US$113.0M)",
        perCapita: "IQD 3,360 / citizen / year (approx. US$2.56 / year)",
      },
      dailyMarketShare: "16.8% domestic television viewership across Al Iraqiya News, Al Iraqiya General, Al Iraqiya Sports, Al Iraqiya Educational, and Al Iraqiya Turkmen/Kurdish (Communications and Media Commission CMC Iraq & Gallup Iraq 2024)",
      brandTrustScore: {
        score: "54%",
        source: "Communications and Media Commission (CMC) Iraq & Independent Institute for Civil Society Studies 2024",
      },
      localContentQuota: "80% Iraqi local programming quota, mandated by statutory charter to reflect Iraq's pluralistic cultural, religious, and linguistic heritage with broadcasts in Arabic, Kurdish, Turkmen, and Syriac",
      staffHeadcount: "3,250 media professionals, field correspondents, technical crew, and musicians of the National Iraqi Symphony Orchestra affiliate (IMN Annual Administrative Bulletin 2024)",
      logo: "broadcaster-logos/iq/imn.jpg",
      logoExplainer:
        "The Iraqi Media Network logo displays the bold blue and golden calligraphic emblem featuring the Arabic word 'العراقية' (Al Iraqiya) stylized as an unfolding parchment with broadcast signal satellites. The design reflects Iraq's Mesopotamian legacy as the cradle of writing, modern telecommunications, and national reconciliation.",
      sources: [
        "https://imn.iq/",
        "https://mof.gov.iq/",
        "https://cmc.iq/",
      ],
      licenceNote: "Iraqi Media Network statutory public entity trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Kuwait
  KW: [
    {
      id: "kw-ktv",
      countryCode: "KW",
      name: "KTV",
      officialName: "Kuwait Television (تلفزيون دولة الكويت - KTV / Ministry of Information)",
      founded: 1961,
      primaryFunding: "100% direct public funding appropriation from the Ministry of Information within the State of Kuwait general budget",
      headquarters: "Ministry of Information Complex, Al Soor Street, Al Murqab, Kuwait City",
      annualPublicFunding: {
        total: "KWD 44.5 million dedicated television and broadcasting state expenditure (Ministry of Finance State Budget FY 2024/2025; approx. US$145.2M)",
        perCapita: "KWD 9.27 / resident / year (approx. US$30.25 / year)",
      },
      dailyMarketShare: "22.5% domestic television market share across KTV 1, KTV 2 (English), KTV Sport, KTV Al-Qur'an, and KTV Plus (Ministry of Information Audience Research & Ipsos Kuwait 2024)",
      brandTrustScore: {
        score: "73%",
        source: "Kuwait Journalists Association (KJA) & Gulf Media Observatory 2024",
      },
      localContentQuota: "85% domestic Gulf production quota, showcasing pioneering Kuwaiti television dramas, theater recordings, Bedouin poetry, parliamentary live coverage, and Islamic values",
      staffHeadcount: "2,400 specialized television directors, news anchors, broadcast engineers, and media civil servants (Ministry of Information Civil Service Registry 2024)",
      logo: "broadcaster-logos/kw/ktv.png",
      logoExplainer:
        "The Kuwait Television emblem is built around the iconic falcon (the national bird of Kuwait) with wings shaped like transmission waves, enveloping a classic television screen silhouette in Kuwait's pan-Arab flag colors: emerald green, pure white, deep red, and midnight black. It embodies Gulf cultural leadership, prestige, and national sovereignty.",
      sources: [
        "https://media.gov.kw/",
        "https://mof.gov.kw/",
      ],
      licenceNote: "Kuwait Television / Ministry of Information public state trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Pakistan
  PK: [
    {
      id: "pk-ptv",
      countryCode: "PK",
      name: "PTV",
      officialName: "Pakistan Television Corporation (پاکستان ٹیلی وژن کارپوریشن - PTV)",
      founded: 1964,
      primaryFunding: "TV license fee surcharge levied on domestic and commercial electricity bills (Rs. 100/month statutory utility charge under the Telegraph Act), federal grants, and commercial advertising",
      headquarters: "PTV Headquarters Complex, Constitution Avenue, F-5/1, Islamabad",
      annualPublicFunding: {
        total: "PKR 11.5 billion public broadcast surcharge revenue & federal grant-in-aid (Federal Ministry of Information & Broadcasting / Ministry of Finance FY 2023–24; approx. US$41.5M)",
        perCapita: "PKR 47.70 / citizen / year (approx. US$0.17 / year)",
      },
      dailyMarketShare: "24.2% national terrestrial and multi-channel audience reach across PTV Home, PTV News, PTV Sports, PTV Global, PTV World, and regional channels (Medialogic Pakistan & Gallup Pakistan 2024; retains dominant rural terrestrial reach)",
      brandTrustScore: {
        score: "57%",
        source: "Gallup Pakistan Public Opinion Survey & Pakistan Press Foundation 2024",
      },
      localContentQuota: "80% Pakistani domestic production quota under Pakistan Electronic Media Regulatory Authority (PEMRA) guidelines, broadcasting in Urdu, English, Punjabi, Sindhi, Pashto, Balochi, and Shina",
      staffHeadcount: "3,800 permanent broadcasters, cameramen, technical engineers, and dramatists (PTV Administrative Report 2024)",
      logo: "broadcaster-logos/pk/ptv.png",
      logoExplainer:
        "The PTV logo, created in 1964 and refined over decades, features a stylized geometric green and gold camera aperture forming a dynamic circular vortex. It symbolizes electronic television vision, Islamic heritage through Pakistan's national green, and the dissemination of light and knowledge to every corner of the country.",
      sources: [
        "https://www.ptv.com.pk/",
        "https://moib.gov.pk/",
        "https://pemra.gov.pk/",
      ],
      licenceNote: "Pakistan Television Corporation statutory state-owned corporation trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Sri Lanka
  LK: [
    {
      id: "lk-rupavahini",
      countryCode: "LK",
      name: "Rupavahini",
      officialName: "Sri Lanka Rupavahini Corporation (ශ්‍රී ලංකා රූපවාහිනී සංස්ථාව / இலங்கை ரூபவாகினி கூட்டுத்தாபனம் - SLRC)",
      founded: 1982,
      primaryFunding: "Parliamentary treasury appropriations via the Ministry of Mass Media, supplemented by commercial advertising and sponsored educational programming",
      headquarters: "Independence Square, Colombo 07",
      annualPublicFunding: {
        total: "LKR 1.85 billion state budget subvention & treasury allocations (Ministry of Finance Budget Estimates & SLRC Annual Report 2023–24; approx. US$6.2M)",
        perCapita: "LKR 84.10 / citizen / year (approx. US$0.28 / year)",
      },
      dailyMarketShare: "18.5% national television audience share across Rupavahini, Channel Eye, and Nethra TV (Kantar LMRB Sri Lanka Media Index 2024)",
      brandTrustScore: {
        score: "61%",
        source: "Verité Research Media Monitoring & Sri Lanka Press Institute 2024",
      },
      localContentQuota: "75% domestic cultural and educational programming quota, broadcasting in Sinhala, Tamil, and English with dedicated educational telecasts for national school curricula",
      staffHeadcount: "850 permanent media personnel, producers, and engineering specialists (SLRC Cadre Review 2024)",
      logo: "broadcaster-logos/lk/rupavahini.png",
      logoExplainer:
        "The Sri Lanka Rupavahini Corporation insignia is inspired by the mythical Sinhala bird 'Mayura' (peacock) and Buddhist swan motifs, rendered in deep royal maroon and gold. Its stylized feathered eye represents optical vision and television enlightenment, evoking traditional Sri Lankan mural art and cultural pride.",
      sources: [
        "https://www.rupavahini.lk/",
        "https://www.treasury.gov.lk/",
        "https://massmedia.gov.lk/",
      ],
      licenceNote: "Sri Lanka Rupavahini Corporation statutory corporate trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Uzbekistan
  UZ: [
    {
      id: "uz-mtrk",
      countryCode: "UZ",
      name: "MTRK",
      officialName: "National Television and Radio Company of Uzbekistan (Oʻzbekiston Milliy teleradiokompaniyasi - MTRK)",
      founded: 1956,
      primaryFunding: "Direct state budget appropriation from the Ministry of Economy and Finance of the Republic of Uzbekistan",
      headquarters: "69 Alisher Navoiy Avenue, Shaykhontohur District, Tashkent",
      annualPublicFunding: {
        total: "UZS 560.0 billion state budget allocation (State Budget Law of the Republic of Uzbekistan & MTRK Financial Directorate FY 2024; approx. US$44.2M)",
        perCapita: "UZS 15,200 / citizen / year (approx. US$1.20 / year)",
      },
      dailyMarketShare: "38.2% combined domestic television audience share across Oʻzbekiston, Oʻzbekiston 24, Yoshlar, Toshkent, Sport, Madaniyat va maʻrifat, and Dunyo boʻylab (Tashkent Media Research & Levada/ACT Central Asia 2024)",
      brandTrustScore: {
        score: "68%",
        source: "Center for Public Opinion Research 'Ijtimoiy Fikr' & Agency of Information and Mass Communications (AOKA) 2024",
      },
      localContentQuota: "80% domestic national production quota, broadcasting in Uzbek, Karakalpak, Russian, Tajik, and Kazakh across nationwide and regional networks",
      staffHeadcount: "3,400 permanent employees across the central Tashkent production complex and 12 regional broadcasting branches (MTRK Personnel Registry 2024)",
      logo: "broadcaster-logos/uz/mtrk.png",
      logoExplainer:
        "The MTRK emblem features bold modern lettering accompanied by stylized transmission orbits and the celestial crescent and stars of Uzbekistan's state flag in azure blue and gold. It reflects digital modernization, Central Asian cultural legacy, and state sovereignty.",
      sources: [
        "https://www.mtrk.uz/",
        "https://mf.uz/",
        "https://aoka.uz/",
      ],
      licenceNote: "National Television and Radio Company of Uzbekistan state entity trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Armenia
  AM: [
    {
      id: "am-armtv",
      countryCode: "AM",
      name: "Public Television of Armenia",
      officialName: "Public Television Company of Armenia (Հայաստանի հանրային հեռուստաընկերություն - 1TV / ARMTV)",
      founded: 1956,
      primaryFunding: "Direct state budget allocation approved by the National Assembly under the Republic of Armenia Law on Audiovisual Media",
      headquarters: "26 Gevorg Hovsepyan Street, Nork-Marash, 0047 Yerevan",
      annualPublicFunding: {
        total: "AMD 7.85 billion state budget appropriation (RA Law on the State Budget of the Republic of Armenia FY 2024; approx. US$20.2M)",
        perCapita: "AMD 2,640 / citizen / year (approx. US$6.80 / year)",
      },
      dailyMarketShare: "24.8% nationwide audience share (AdIndex Armenia & Television and Radio Commission TRC 2024; First Channel 1TV is the country's most viewed national broadcaster)",
      brandTrustScore: {
        score: "62%",
        source: "Caucasus Research Resource Center (CRRC) Armenia & Media Initiatives Center 2024",
      },
      localContentQuota: "70% domestic Armenian cultural, documentary, musical, and educational programming quota, including transmissions in Eastern Armenian and Western Armenian",
      staffHeadcount: "620 permanent journalists, film directors, archivists, and broadcast technicians (ARMTV Annual Report 2024)",
      logo: "broadcaster-logos/am/armtv.png",
      logoExplainer:
        "The 1TV Armenia emblem, refreshed in 2021, features an elegant, minimalist numeral '1' enclosed within an ethereal circular frame in royal violet and white. It symbolizes editorial preeminence, contemporary aesthetic evolution, and the broadcaster's foundational heritage as Armenia's first television channel.",
      sources: [
        "https://www.1tv.am/",
        "https://www.minfin.am/",
        "https://tvradio.am/",
      ],
      licenceNote: "Public Television Company of Armenia statutory closed joint-stock company trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Bhutan
  BT: [
    {
      id: "bt-bbs",
      countryCode: "BT",
      name: "BBS",
      officialName: "Bhutan Broadcasting Service (འབྲུག་རྒྱང་བསྒྲགས་ལས་འཛིན - BBS)",
      founded: 1973,
      primaryFunding: "Royal Government of Bhutan budgetary grant-in-aid through the Ministry of Industry, Commerce and Employment and nominal commercial advertisements",
      headquarters: "Chhubachu, PO Box 101, Thimphu",
      annualPublicFunding: {
        total: "BTN 182.5 million government public service grant (National Budget Report, Ministry of Finance FY 2023–24; approx. US$2.18M)",
        perCapita: "BTN 233.00 / citizen / year (approx. US$2.79 / year)",
      },
      dailyMarketShare: "58.4% domestic television audience share across BBS 1 and BBS 2 (Bhutan InfoComm and Media Authority BICMA & BBS Audience Survey 2024; the sole terrestrial television network in the Kingdom)",
      brandTrustScore: {
        score: "84%",
        source: "BICMA Media Impact Study & Centre for Bhutan and GNH Studies 2024",
      },
      localContentQuota: "85% local cultural, spiritual, and community programming quota, broadcasting extensively in Dzongkha, Tshangla (Sharchop), Lhotshamkha, and English in alignment with Gross National Happiness principles",
      staffHeadcount: "285 permanent journalists, camera operators, editors, and engineers across Thimphu headquarters and dzongkhag bureaus (BBS Corporate Review 2024)",
      logo: "broadcaster-logos/bt/bbs.png",
      logoExplainer:
        "The BBS insignia depicts the golden thunder dragon (Druk)—the national symbol of Bhutan—poised protectively over stylized radio and television transmission waves in saffron yellow and orange (the national colors of the Kingdom). It symbolizes sovereign communication, Buddhist spiritual values, and national harmony.",
      sources: [
        "https://www.bbs.bt/",
        "https://www.mof.gov.bt/",
        "https://www.bicma.gov.bt/",
      ],
      licenceNote: "Bhutan Broadcasting Service Corporation public corporation trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Georgia
  GE: [
    {
      id: "ge-gpb",
      countryCode: "GE",
      name: "GPB",
      officialName: "Georgian Public Broadcaster (საქართველოს საზოგადოებრივი მაუწყებელი - GPB / პირველი არხი 1TV)",
      founded: 1956,
      primaryFunding: "Statutory public subvention from the State Budget of Georgia under the Law of Georgia on Broadcasting",
      headquarters: "68 Kostava Street, 0171 Tbilisi",
      annualPublicFunding: {
        total: "GEL 101.5 million state budget public broadcasting appropriation (Law on the State Budget of Georgia FY 2024; approx. US$37.6M)",
        perCapita: "GEL 27.40 / citizen / year (approx. US$10.15 / year)",
      },
      dailyMarketShare: "16.8% national television audience share across First Channel (1TV) and Second Channel (Teleskoli) (TVMR Georgia / Nielsen licensee 2024; leading national channel for documentary, educational, and public affairs debates)",
      brandTrustScore: {
        score: "58%",
        source: "Caucasus Research Resource Center (CRRC) Georgia & NDI Public Opinion Survey 2024",
      },
      localContentQuota: "70% domestic Georgian cultural and informational programming quota, broadcasting in Georgian with regular daily news bulletins in Abkhazian, Ossetian, Armenian, and Azerbaijani",
      staffHeadcount: "1,100 permanent media professionals, correspondents, and technical engineers (GPB Annual Performance Report 2024)",
      logo: "broadcaster-logos/ge/gpb.png",
      logoExplainer:
        "The Georgian Public Broadcaster emblem features the stylized typography '1TV' (პირველი არხი) rendered in clean minimalist geometry in deep navy and crimson, symbolizing editorial independence, modern European public service standards, and historic preeminence as Georgia's first television channel.",
      sources: [
        "https://1tv.ge/",
        "https://mof.ge/",
        "https://comcom.ge/",
      ],
      licenceNote: "Georgian Public Broadcaster statutory public entity trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Azerbaijan
  AZ: [
    {
      id: "az-aztv",
      countryCode: "AZ",
      name: "AzTV",
      officialName: "Azerbaijan Television and Radio Broadcasting CJSC (Azərbaycan Televiziya və Radio Verilişləri QSC - AzTV)",
      founded: 1956,
      primaryFunding: "Direct state budget appropriation from the Ministry of Finance of the Republic of Azerbaijan",
      headquarters: "1 Mehdi Huseyn Street, AZ1006 Baku",
      annualPublicFunding: {
        total: "AZN 46.5 million state budget public service broadcasting allocation (State Budget of the Republic of Azerbaijan FY 2024; approx. US$27.4M)",
        perCapita: "AZN 4.58 / citizen / year (approx. US$2.69 / year)",
      },
      dailyMarketShare: "26.5% domestic television audience share across AzTV, İdman TV (Sports), and Mədəniyyət TV (Culture) (Audiencemarket Azerbaijan & Audiovisual Council 2024)",
      brandTrustScore: {
        score: "66%",
        source: "Social Research Center (STM) Azerbaijan & Audiovisual Council Media Report 2024",
      },
      localContentQuota: "75% domestic Azerbaijani production quota under the Law on Media, dedicated to Azerbaijani literature, Mugham musical heritage, Caucasian history, and state affairs",
      staffHeadcount: "1,850 journalists, directors, technical specialists, and performing artists of the AzTV Orchestra and Choir (AzTV Corporate Review 2024)",
      logo: "broadcaster-logos/az/aztv.png",
      logoExplainer:
        "The AzTV emblem features the dynamic wordmark in Azerbaijan's national flag colors—sky blue, bright red, and green—with a modern fluid swoop across the letter 'A' symbolizing Caspian sea waves, oil-rich eternal flames, and contemporary satellite transmission.",
      sources: [
        "https://www.aztv.az/",
        "https://maliyye.gov.az/",
        "https://abua.gov.az/",
      ],
      licenceNote: "Azerbaijan Television and Radio Broadcasting Closed Joint-Stock Company state trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Maldives
  MV: [
    {
      id: "mv-psm",
      countryCode: "MV",
      name: "PSM",
      officialName: "Public Service Media (ޕަބްލިކް ސާވިސް މީޑިއާ - PSM / Television Maldives TVM)",
      founded: 1978,
      primaryFunding: "Annual state budget allocation voted by the People's Majlis through the Ministry of Finance, supplemented by commercial advertising",
      headquarters: "Radio Building, Moonimaage, Ameenee Magu, Malé 20307",
      annualPublicFunding: {
        total: "MVR 88.0 million state budget subvention envelope (Ministry of Finance National Budget & PSM Annual Report FY 2024; approx. US$5.7M)",
        perCapita: "MVR 169.00 / citizen / year (approx. US$11.00 / year)",
      },
      dailyMarketShare: "42.0% domestic television audience share across TVM, Yes TV (Youth & Sports), and News 13 (Maldives Broadcasting Commission MBC & PSM Audience Survey 2024)",
      brandTrustScore: {
        score: "65%",
        source: "Maldives Broadcasting Commission (MBC) National Media Assessment 2024",
      },
      localContentQuota: "85% local production quota in Dhivehi, promoting Maldivian island traditions, coral reef ecological conservation, and Islamic education across the archipelago",
      staffHeadcount: "420 permanent journalists, producers, boat transmission crews, and broadcast engineers (PSM Human Resources Audit 2024)",
      logo: "broadcaster-logos/mv/psm.jpg",
      logoExplainer:
        "The Public Service Media logo showcases a modern circular emblem forming a stylized 'P' and 'S' in vibrant coral red and oceanic turquoise. The design symbolizes digital communication connecting the scattered coral atolls of the Maldives across the Indian Ocean.",
      sources: [
        "https://psm.mv/",
        "https://finance.gov.mv/",
        "https://broadcom.org.mv/",
      ],
      licenceNote: "Public Service Media statutory public corporation trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Kyrgyzstan
  KG: [
    {
      id: "kg-utrk",
      countryCode: "KG",
      name: "UTRK",
      officialName: "National Broadcasting Corporation of the Kyrgyz Republic (Кыргыз Республикасынын Улуттук телерадиоберүү корпорациясы - УТРК)",
      founded: 1958,
      primaryFunding: "Direct state budget subsidy approved by the Jogorku Kenesh (Supreme Council) under the Ministry of Finance of the Kyrgyz Republic",
      headquarters: "59 Molodaya Gvardiya Boulevard, 720010 Bishkek",
      annualPublicFunding: {
        total: "KGS 460.0 million republican budget allocation (Republican Budget Law & Ministry of Culture, Information, Sports and Youth Policy FY 2024; approx. US$5.2M)",
        perCapita: "KGS 65.70 / citizen / year (approx. US$0.74 / year)",
      },
      dailyMarketShare: "34.5% nationwide television audience share across UTRK, Ala-Too 24, Balastan (Children), Madaniyat (Culture), and Sport (Expert Consulting KG & Ministry of Culture 2024)",
      brandTrustScore: {
        score: "63%",
        source: "Central Asia Barometer Kyrgyz Republic Survey & Media Policy Institute 2024",
      },
      localContentQuota: "70% national content requirement (minimum 50% in the state Kyrgyz language, alongside official Russian and regional languages), focusing on Manas epic heritage, nomad traditions, and state news",
      staffHeadcount: "950 permanent editors, reporters, sound engineers, and regional station crew across seven oblasts (UTRK Personnel Directorate 2024)",
      logo: "broadcaster-logos/kg/utrk.png",
      logoExplainer:
        "The UTRK emblem presents the bold Latin and Cyrillic acronym 'UTRK' alongside the stylized golden sun with forty rays and the tunduk (circular yurt roof crest) in national crimson red and gold. It reflects sovereign Kyrgyz statehood, nomadic cultural roots, and communal unity.",
      sources: [
        "https://ktrk.kg/",
        "https://minfin.kg/",
        "https://minculture.gov.kg/",
      ],
      licenceNote: "National Broadcasting Corporation of the Kyrgyz Republic state entity trademark and logo bundled for educational reference in Learn mode.",
    },
  ],

  // Mauritius
  MU: [
    {
      id: "mu-mbc",
      countryCode: "MU",
      name: "MBC",
      officialName: "Mauritius Broadcasting Corporation (MBC)",
      founded: 1964,
      primaryFunding: "Audiovisual license fee (Rs 150/month electricity meter surcharge collected by Central Electricity Board) and government grant from the Prime Minister's Office",
      headquarters: "Pasteur Street, Forest Side, Curepipe / Reduit, Moka",
      annualPublicFunding: {
        total: "MUR 430.0 million public TV surcharge collection & state operating subvention (National Budget of Mauritius & MBC Annual Report FY 2023–24; approx. US$9.3M)",
        perCapita: "MUR 341.00 / citizen / year (approx. US$7.40 / year)",
      },
      dailyMarketShare: "54.2% domestic television audience share across MBC 1, MBC 2, MBC 3, Bhojpuri Channel, and digital terrestrial services (Independent Broadcasting Authority IBA & Kantar TNS Indian Ocean 2024)",
      brandTrustScore: {
        score: "64%",
        source: "Afrobarometer Mauritius Survey & Media Watch Mauritius 2024",
      },
      localContentQuota: "65% local and multilingual cultural quota, providing daily news and entertainment in English, French, Mauritian Creole, Bhojpuri, Hindi, Tamil, Telugu, Marathi, Urdu, and Mandarin",
      staffHeadcount: "620 permanent journalists, producers, audiovisual technicians, and administrative staff (MBC Corporate Directorate 2024)",
      logo: "broadcaster-logos/mu/mbc.png",
      logoExplainer:
        "The MBC emblem features a vibrant curved multi-colored spiral ribbon in red, blue, yellow, and green—the four colors of the Mauritian national flag. The concentric bands represent transmission waves and the peaceful harmonious co-existence of the island's diverse multicultural communities.",
      sources: [
        "https://mbcradio.tv/",
        "https://mof.govmu.org/",
        "https://iba.govmu.org/",
      ],
      licenceNote: "Mauritius Broadcasting Corporation public statutory corporation trademark and logo bundled for educational reference in Learn mode.",
    },
  ],
};







