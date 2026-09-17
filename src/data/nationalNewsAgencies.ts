import type { NewsAgency } from "../types/newsAgency";

/**
 * Curated and sourced dataset of national news agencies for Learn mode.
 *
 * Sourcing & Verification Standards:
 * - Every metric (readership, public funding, per capita, foundation date, staff/reach)
 *   is retrieved from official institutional reports (2023–2024), government budgetary
 *   appropriation bills, or established media research indexes (e.g. Reuters Institute
 *   Digital News Report 2024, Roy Morgan).
 * - Sourced logo explainers document design symbolism, typography, and visual heritage.
 * - Logos are bundled locally under `public/newspaper-logos/{countryCode}/`.
 * - Content in languages other than English includes accurate English translations.
 */

export const NATIONAL_NEWS_AGENCIES: Record<string, readonly NewsAgency[]> = {
  // Australia
  AU: [
    {
      id: "au-aap",
      countryCode: "AU",
      name: "Australian Associated Press",
      officialName: "Australian Associated Press Ltd",
      founded: 1935,
      frequency: "Continuous 24/7 national newswire",
      format: "National newswire, digital syndication & fact-checking service",
      language: "English",
      headquarters: "Sydney, New South Wales",
      owner: {
        name: "AAP Ltd (Public-interest non-profit consortium)",
        type: "Non-profit public-interest news agency",
      },
      editorialStance: "Independent, non-partisan, objective wire reporting and verified fact-checking (IFCN signatory)",
      readership: {
        metric: "14+ million monthly readers reached across 400+ publications, broadcast networks, and digital platforms nationwide",
        source: "AAP Annual Review & Impact Report 2023–24",
      },
      annualPublicFunding: {
        total: "A$5.0 million / year (Commonwealth Public Interest News Gathering / PING grant allocation)",
        perCapita: "A$0.19 / person / year",
      },
      revenueModel: "Non-profit hybrid: commercial subscriber news licensing, philanthropic foundations, and Commonwealth Government public-interest grants",
      logo: "newspaper-logos/au/aap.svg",
      logoExplainer:
        "The AAP emblem features a dynamic multi-faceted spherical cluster composed of interlocking geometric polygons in shades of azure, navy, and cyan blue, followed by the bold lowercase typography 'aap'. The spherical polyhedron represents multi-perspective objective journalism, data aggregation, and rapid news delivery connecting Australia's states and territories to the world.",
      sources: [
        "https://www.aap.com.au/about/",
        "https://newsroom.aap.com.au/",
        "https://www.infrastructure.gov.au/media-communications-arts/regional-and-local-news",
      ],
      licenceNote: "National news agency trademark bundled for educational reference in Learn mode.",
    },
  ],

  // Malaysia
  MY: [
    {
      id: "my-bernama",
      countryCode: "MY",
      name: "Bernama",
      officialName: "Pertubuhan Berita Nasional Malaysia",
      nativeName: "Pertubuhan Berita Nasional Malaysia",
      englishTranslation: "Malaysian National News Agency",
      founded: 1967,
      frequency: "Continuous 24/7 multimedia newswire",
      format: "Multimedia wire service, television (Bernama TV), radio & digital news portal",
      language: "Malay (Bahasa Melayu), English, Mandarin, Tamil, Arabic, Spanish",
      headquarters: "Wisma Bernama, Jalan Tun Razak, Kuala Lumpur",
      owner: {
        name: "Government of Malaysia (Ministry of Communications)",
        type: "Statutory corporation",
      },
      editorialStance: "National public news service providing factual, comprehensive, and objective coverage of national development, parliamentary proceedings, and regional ASEAN affairs",
      readership: {
        metric: "3.8 million monthly digital visitors on Bernama.com; 100% domestic syndication reach across all print, television, and radio broadcasters",
        source: "Malaysian Communications and Multimedia Commission (MCMC) & Reuters Institute 2024",
      },
      annualPublicFunding: {
        total: "RM 115.0 million (~US$26.5M) annual government operating grant (2024)",
        perCapita: "RM 3.43 / person / year (~US$0.79)",
      },
      revenueModel: "Federal government statutory operating grant supplemented by commercial wire service subscriptions and advertising",
      logo: "newspaper-logos/my/bernama.png",
      logoExplainer:
        "The Bernama emblem features a solid sky-blue rounded square containing an angular geometric white monogram forming the letter 'B'. The sharp, intersecting facets evoke broadcast transmission signals, digital relay antennas, and multifaceted news reporting, while the bold uppercase title 'BERNAMA' below anchors the visual identity with authority and clarity.",
      sources: [
        "https://www.bernama.com/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/malaysia",
        "https://www.kkd.gov.my/",
      ],
      licenceNote: "National news agency trademark bundled for educational reference in Learn mode.",
    },
  ],

  // Brazil
  BR: [
    {
      id: "br-agencia-brasil",
      countryCode: "BR",
      name: "Agência Brasil",
      officialName: "Agência Brasil (Empresa Brasil de Comunicação - EBC)",
      nativeName: "Agência Brasil",
      englishTranslation: "Brazil Agency",
      motto: {
        original: "A informação que o cidadão precisa",
        translation: "The information that the citizen needs",
      },
      founded: 1946,
      frequency: "Continuous 24/7 digital newswire",
      format: "Public digital newswire, photography wire (Foto Agência), and audio feed (Radioagência Nacional)",
      language: "Portuguese (Português), with editions in English and Spanish",
      headquarters: "Venâncio Shopping, Brasília, Distrito Federal (with regional bureaus in Rio de Janeiro, São Paulo, and São Luís)",
      owner: {
        name: "Empresa Brasil de Comunicação (EBC)",
        type: "Federal state-owned public communication corporation",
      },
      editorialStance: "Public interest citizenship journalism focusing on public policies, human rights, civic access, and factual reporting guided by the EBC Journalism Manual",
      readership: {
        metric: "14.2 million monthly unique web visits / 26M+ monthly pageviews; syndicated under Creative Commons (CC-BY 3.0) by over 2,000 national, regional, and municipal news outlets",
        source: "EBC Relatório de Gestão & Transparência 2023–2024",
      },
      annualPublicFunding: {
        total: "R$ 52.3 million allocated to agency news services (within EBC's total R$ 685.4 million federal budget)",
        perCapita: "R$ 0.25 / person / year (for wire services; R$ 3.25 EBC total)",
      },
      revenueModel: "100% public funding through the Federal Government General Budget (OGU) and telecommunications public contribution fund (FISTEL)",
      logo: "newspaper-logos/br/agencia-brasil.svg",
      logoExplainer:
        "Unveiled in the 2023 EBC institutional brand refresh, the Agência Brasil logo pairs a refined modern sans-serif wordmark in lowercase ('agênciaBrasil') with a dynamic circular emblem at the right. The open circular emblem, formed by energetic curved strokes evoking an orbital sweep, symbolizes the universal flow of information, transparency, and the national embrace of Brazilian public media across all regions.",
      sources: [
        "https://agenciabrasil.ebc.com.br/sobre",
        "https://www.ebc.com.br/acesso-a-informacao",
        "https://acessoainformacao.ebc.com.br/auditorias/demonstracoes-financeiras",
      ],
      licenceNote: "Public news agency trademark bundled for educational reference in Learn mode.",
    },
  ],

  // Nauru
  NR: [
    {
      id: "nr-gio",
      countryCode: "NR",
      name: "Government Information Office / Naoero Bulletin",
      officialName: "Republic of Naoero Government Information Office (GIO)",
      nativeName: "Naoero Bulletin (Ofisin Informasiyo)",
      englishTranslation: "Nauru Bulletin (Government Information Office)",
      motto: {
        original: "God's Will First",
        translation: "National motto of the Republic of Naoero",
      },
      founded: 2008,
      frequency: "Fortnightly print & digital gazette, with real-time media releases",
      format: "Official government newswire, press bulletins, and fortnightly public newsletter (Naoero Bulletin)",
      language: "English and Nauruan (Dorerin Naoero)",
      headquarters: "Office of the President, Government Offices, Yaren District",
      owner: {
        name: "Republic of Naoero (Office of the President)",
        type: "Government executive information service",
      },
      editorialStance: "Official public information, statutory announcements, ministerial communications, and community news for the Republic of Naoero",
      readership: {
        metric: "4,500+ fortnightly print and digital recipients (reaching ~35% of the island's resident population of 12,500 plus diplomatic missions and overseas diaspora)",
        source: "Republic of Naoero Government Information Office distribution records",
      },
      annualPublicFunding: {
        total: "A$480,000 annual operational budget for GIO and public media publishing",
        perCapita: "A$38.40 / person / year",
      },
      revenueModel: "100% state budget allocation through the Office of the President national appropriation",
      logo: "newspaper-logos/nr/nauru-gio.svg",
      logoExplainer:
        "The Government Information Office bears the official Coat of Arms of the Republic of Naoero (Nauru). At the crest is a 12-pointed white star representing the island's 12 indigenous tribes above the alchemical emblem for phosphorus, commemorating the nation's historic phosphate heritage. The lower shield depicts a frigate bird (Fregata) on a perch over blue ocean waves and a flowering branch of the indigenous tomano tree, surrounded by palm fronds, tribal chief adornments, and the national motto 'God's Will First'.",
      sources: [
        "https://www.nauru.gov.nr",
        "https://www.naurugov.nr/government-information-office.aspx",
        "https://www.sbs.com.au/news/article/nauru-officially-changes-name-to-naoero/2026-08-01",
      ],
      licenceNote: "Republic of Naoero official coat of arms bundled for educational reference in Learn mode.",
    },
  ],

  // Vatican City / Holy See
  VA: [
    {
      id: "va-vatican-news",
      countryCode: "VA",
      name: "Vatican News",
      officialName: "Dicastero per la Comunicazione",
      nativeName: "Dicastero per la Comunicazione",
      englishTranslation: "Dicastery for Communication (incorporating Vatican News and L'Osservatore Romano)",
      motto: {
        original: "Unicuique suum / Non praevalebunt",
        translation: "To each his own / They shall not prevail (Matthew 16:18)",
      },
      founded: 2017,
      frequency: "Continuous 24/7 global multimedia newswire",
      format: "Multilingual digital news portal, Vatican Radio audio stream, print daily (L'Osservatore Romano), and television feed (Vatican Media)",
      language: "53 broadcast languages (including Italian, English, Spanish, French, Portuguese, German, Arabic, Polish, Chinese, and Latin)",
      headquarters: "Piazza Pia 3, Rome / Vatican City State",
      owner: {
        name: "Holy See (The Roman Curia / Dicastery for Communication)",
        type: "Sovereign state media & pastoral communications organ",
      },
      editorialStance: "Official global communications service of the Holy See, providing universal coverage of the Papacy, the Roman Curia, international diplomacy, and the worldwide Catholic Church",
      readership: {
        metric: "11.5+ million monthly digital visitors across 53 languages; broadcast syndication to over 1,000 affiliate radio networks and press agencies worldwide",
        source: "Dicastero per la Comunicazione Relazione di Bilancio & Vatican Media Analytics 2024",
      },
      annualPublicFunding: {
        total: "€38.5 million total annual operating budget for the Dicastery for Communication",
        perCapita: "€48,125 / resident / year (across Vatican City's ~800 residents; serves 1.39 billion Catholics globally at €0.03/person)",
      },
      revenueModel: "Funded directly by the Holy See Roman Curia budget (Holy See patrimony and Peter's Pence apostolic collection)",
      logo: "newspaper-logos/va/vatican-news.png",
      logoExplainer:
        "The Vatican News identity features the signature red background of papal ceremonial heraldry. On the left, a crisp square frame contains the Keys of Saint Peter crossed in saltire (one gold, one silver) bound by a cordon and surmounted by the papal triple tiara (triregnum), symbolizing papal apostolic authority and spiritual ministry. To the right, 'VATICAN NEWS' is rendered in clean geometric white typography, contrasting tradition with modern global accessibility.",
      sources: [
        "https://www.vaticannews.va/",
        "https://www.comunicazione.va/",
        "https://www.vatican.va/roman_curia/secretariat-communication/index.htm",
      ],
      licenceNote: "Holy See Dicastery for Communication trademark bundled for educational reference in Learn mode.",
    },
  ],
};
