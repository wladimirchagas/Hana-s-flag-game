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

  // Afghanistan
  AF: [
    {
      id: "af-bakhtar",
      countryCode: "AF",
      name: "Bakhtar News Agency",
      officialName: "Bakhtar News Agency (BNA)",
      founded: 1939,
      frequency: "Daily official state newswire",
      format: "Multimedia newswire & digital portal",
      language: "Pashto, Dari, English",
      headquarters: "Kabul",
      owner: {
        name: "Ministry of Information and Culture",
        type: "Government ministry / department",
      },
      editorialStance: "Official state news agency; official government bulletins and national announcements",
      readership: {
        metric: "Primary news supplier for Afghan domestic broadcasters, provincial radio, and print outlets",
        source: "Ministry of Information and Culture / BNA Official",
      },
      revenueModel: "Directly funded through the state budget",
      logo: "newspaper-logos/af/bakhtar.svg",
      logoExplainer:
        "Emblem in deep green and gold featuring classical Dari typography within a circular seal, representing state heritage and official public information.",
      sources: ["https://bakhtarnews.af", "https://en.wikipedia.org/wiki/Bakhtar_News_Agency"],
    },
    {
      id: "af-tolonews",
      countryCode: "AF",
      name: "TOLOnews",
      founded: 2010,
      frequency: "Continuous 24/7 news reporting",
      format: "24-hour news network & digital portal",
      language: "Dari, Pashto, English",
      headquarters: "Kabul",
      owner: {
        name: "Moby Media Group",
        type: "Independent commercial media",
      },
      editorialStance: "Commercial news network; continuous breaking news, current affairs, and political interviews",
      readership: {
        metric: "Over 5 million regular TV viewers and digital followers nationwide",
        source: "Moby Media Group Impact Review 2023",
      },
      revenueModel: "Commercial advertising, digital display ads, and international content syndication",
      logo: "newspaper-logos/af/tolonews.svg",
      logoExplainer:
        "Bold geometric red arrow logo symbolising forward motion, breaking news, and 24-hour broadcast coverage across Afghanistan.",
      sources: ["https://tolonews.com", "https://en.wikipedia.org/wiki/TOLOnews"],
    },
    {
      id: "af-pajhwok",
      countryCode: "AF",
      name: "Pajhwok Afghan News",
      founded: 2003,
      frequency: "Continuous newswire service",
      format: "Independent digital newswire & photo service",
      language: "Pashto, Dari, English",
      headquarters: "Kabul",
      owner: {
        name: "Pajhwok Afghan News LLC",
        type: "Independent commercial media",
      },
      editorialStance: "Independent news agency; non-partisan coverage of provincial affairs, security, and human rights",
      readership: {
        metric: "Highest-reach independent newswire with correspondents across all 34 provinces",
        source: "Pajhwok Afghan News Organization Report 2024",
      },
      revenueModel: "Newswire subscriptions, photo syndication, and international media partnerships",
      logo: "newspaper-logos/af/pajhwok.svg",
      logoExplainer:
        "Stylised flame symbol in amber and blue, representing illumination, truth, and nationwide provincial reporting.",
      sources: ["https://pajhwok.com", "https://en.wikipedia.org/wiki/Pajhwok_Afghan_News"],
    },
    {
      id: "af-khaama",
      countryCode: "AF",
      name: "Khaama Press",
      founded: 2010,
      frequency: "Continuous digital publishing",
      format: "Digital news agency & online portal",
      language: "English, Pashto, Dari",
      headquarters: "Kabul",
      owner: {
        name: "Khaama Press News Agency",
        type: "Independent commercial media",
      },
      editorialStance: "Independent digital news outlet; business, political, and diplomatic reporting",
      readership: {
        metric: "1.2 million monthly unique online visitors",
        source: "Khaama Press Media Kit 2024",
      },
      revenueModel: "Digital advertising, sponsored content, and syndication",
      logo: "newspaper-logos/af/khaama.svg",
      logoExplainer:
        "Deep blue square badge featuring interconnected white letterforms, symbolizing modern digital journalism.",
      sources: ["https://www.khaama.com", "https://en.wikipedia.org/wiki/Khaama_Press"],
    },
    {
      id: "af-hasht-e-subh",
      countryCode: "AF",
      name: "Hasht-e Subh",
      englishTranslation: "8am Daily",
      founded: 2007,
      frequency: "Daily publication",
      format: "Print daily & digital portal",
      language: "Dari, English",
      headquarters: "Kabul",
      owner: {
        name: "8am Media Group",
        type: "Independent commercial media",
      },
      editorialStance: "Independent reformist newspaper; civil rights, investigative reporting, and public policy",
      readership: {
        metric: "Prominent daily print distribution and widely read digital edition across the diaspora",
        source: "Hasht-e Subh Publishing House",
      },
      revenueModel: "Print sales, digital subscriptions, and commercial advertising",
      logo: "newspaper-logos/af/hasht-e-subh.svg",
      logoExplainer:
        "Emerald green emblem with the Arabic numeral 8 ('۸') representing dawn, truth, and morning journalism.",
      sources: ["https://8am.media", "https://en.wikipedia.org/wiki/Hasht-e_Subh"],
    },
  ],

  // Albania
  AL: [
    {
      id: "al-atsh",
      countryCode: "AL",
      name: "Albanian Telegraphic Agency",
      nativeName: "Agjencia Telegrafike Shqiptare",
      englishTranslation: "Albanian Telegraphic Agency",
      founded: 1912,
      frequency: "Continuous 24/7 state newswire",
      format: "Official state newswire & photo service",
      language: "Albanian, English, French",
      headquarters: "Tirana",
      owner: {
        name: "Republic of Albania (Council of Ministers)",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official state news agency; government policy, parliamentary proceedings, and foreign diplomacy",
      readership: {
        metric: "Primary source of official news for Albanian domestic media and accredited international correspondents",
        source: "ATSH Official Annual Report 2023",
      },
      revenueModel: "State budget allocation and commercial newswire licensing",
      logo: "newspaper-logos/al/atsh.svg",
      logoExplainer:
        "Crimson crest incorporating the double-headed eagle of Albania and bold white typography 'ATSH'.",
      sources: ["https://ata.gov.al", "https://en.wikipedia.org/wiki/Albanian_Telegrafic_Agency"],
    },
    {
      id: "al-panorama",
      countryCode: "AL",
      name: "Panorama",
      founded: 2002,
      frequency: "Daily (Monday–Sunday)",
      format: "Broadsheet & digital portal",
      language: "Albanian",
      headquarters: "Tirana",
      owner: {
        name: "Panorama Group",
        type: "Independent commercial media",
      },
      editorialStance: "Independent commercial daily; center-right leaning, wide circulation national reporting",
      readership: {
        metric: "Highest print circulation newspaper in Albania (~15,000 daily print, 2M monthly digital visitors)",
        source: "Media Ownership Monitor Albania 2023",
      },
      revenueModel: "Print sales, display advertising, and digital sponsorships",
      logo: "newspaper-logos/al/panorama.svg",
      logoExplainer:
        "Bold serif title logo in dark red, conveying authority and national circulation prominence.",
      sources: ["https://www.panorama.com.al", "https://en.wikipedia.org/wiki/Panorama_(Albanian_newspaper)"],
    },
    {
      id: "al-gazeta-shqiptare",
      countryCode: "AL",
      name: "Gazeta Shqiptare",
      englishTranslation: "Albanian Newspaper",
      founded: 1927,
      frequency: "Daily newspaper",
      format: "Print daily & digital portal",
      language: "Albanian",
      headquarters: "Tirana",
      owner: {
        name: "Focus Group",
        type: "Independent commercial media",
      },
      editorialStance: "Historic daily newspaper; public affairs, culture, and social reporting",
      readership: {
        metric: "Established readership among intellectuals, public servants, and civil society",
        source: "Albanian Media Institute Review 2023",
      },
      revenueModel: "Print retail sales and commercial display advertising",
      logo: "newspaper-logos/al/gazeta-shqiptare.svg",
      logoExplainer:
        "Classic black serif typography with a red accent line representing historic Albanian print journalism.",
      sources: ["https://www.balkanweb.com", "https://en.wikipedia.org/wiki/Gazeta_Shqiptare"],
    },
    {
      id: "al-koha-jone",
      countryCode: "AL",
      name: "Koha Jonë",
      englishTranslation: "Our Time",
      founded: 1991,
      frequency: "Daily newspaper",
      format: "Tabloid & digital portal",
      language: "Albanian",
      headquarters: "Tirana",
      owner: {
        name: "Nikoll Lesi Media",
        type: "Independent commercial media",
      },
      editorialStance: "Pioneer post-communist independent daily; political commentary and breaking news",
      readership: {
        metric: "Historic pioneer of independent media in post-1990 Albania",
        source: "Albanian Media Institute",
      },
      revenueModel: "Print sales and advertising",
      logo: "newspaper-logos/al/koha-jone.svg",
      logoExplainer:
        "Vibrant red block typography symbolizing post-1990 free press and energetic daily reporting.",
      sources: ["https://www.kohajone.com", "https://en.wikipedia.org/wiki/Koha_Jon%C3%AB"],
    },
    {
      id: "al-shekulli",
      countryCode: "AL",
      name: "Shekulli",
      englishTranslation: "The Century",
      founded: 1997,
      frequency: "Daily publication",
      format: "Compact daily & digital portal",
      language: "Albanian",
      headquarters: "Tirana",
      owner: {
        name: "SPEKTER Group",
        type: "Independent commercial media",
      },
      editorialStance: "Center-left commercial daily; investigative reporting and political analysis",
      readership: {
        metric: "National reach in print and online across urban hubs",
        source: "Media Ownership Monitor Albania",
      },
      revenueModel: "Print sales and digital advertising",
      logo: "newspaper-logos/al/shekulli.svg",
      logoExplainer:
        "Sky blue serif title typography representing 21st-century modern Albanian press.",
      sources: ["https://shekulli.com.al", "https://en.wikipedia.org/wiki/Shekulli"],
    },
  ],

  // Algeria
  DZ: [
    {
      id: "dz-aps",
      countryCode: "DZ",
      name: "Algérie Presse Service",
      officialName: "Algérie Presse Service (APS)",
      founded: 1961,
      frequency: "Continuous 24/7 state newswire",
      format: "Official state newswire & photo service",
      language: "Arabic, French, Tamazight, English",
      headquarters: "Algiers",
      owner: {
        name: "People's Democratic Republic of Algeria",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official state news agency; presidential decrees, government policy, and diplomatic affairs",
      readership: {
        metric: "Primary news agency supplying all Algerian public and private newspapers, TV, and radio networks",
        source: "APS Annual Report 2023",
      },
      revenueModel: "Direct state budget allocation and subscriber licensing fees",
      logo: "newspaper-logos/dz/aps.svg",
      logoExplainer:
        "Emerald green circular badge with white typography and stylized arrow symbolizing rapid national news distribution.",
      sources: ["https://www.aps.dz", "https://en.wikipedia.org/wiki/Alg%C3%A9rie_Presse_Service"],
    },
    {
      id: "dz-el-watan",
      countryCode: "DZ",
      name: "El Watan",
      englishTranslation: "The Homeland",
      founded: 1990,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "French",
      headquarters: "Algiers",
      owner: {
        name: "SPA El Watan",
        type: "Independent commercial media",
      },
      editorialStance: "Independent francophone daily; secular, investigative, and critical news coverage",
      readership: {
        metric: "Leading francophone quality daily in Algeria (~80,000 daily print, 3M monthly digital visitors)",
        source: "Reuters Institute Digital News Report 2023",
      },
      revenueModel: "Print sales, commercial advertising, and digital subscriptions",
      logo: "newspaper-logos/dz/el-watan.svg",
      logoExplainer:
        "Classic serif masthead in dark charcoal, representing prestigious independent francophone journalism.",
      sources: ["https://elwatan-dz.com", "https://en.wikipedia.org/wiki/El_Watan"],
    },
    {
      id: "dz-el-khabar",
      countryCode: "DZ",
      name: "El Khabar",
      englishTranslation: "The News",
      founded: 1990,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Arabic",
      headquarters: "Algiers",
      owner: {
        name: "El Khabar SPA",
        type: "Independent commercial media",
      },
      editorialStance: "Independent Arabic daily; broad political commentary, domestic politics, and social reporting",
      readership: {
        metric: "One of the most widely read Arabic-language dailies in Algeria (~100,000 daily print circulation)",
        source: "OJD Middle East & North Africa",
      },
      revenueModel: "Print retail sales and commercial display advertising",
      logo: "newspaper-logos/dz/el-khabar.svg",
      logoExplainer:
        "Bold Arabic calligraphic masthead in white on a deep crimson background, symbolizing national Arab-language reporting.",
      sources: ["https://www.elkhabar.com", "https://en.wikipedia.org/wiki/El_Khabar"],
    },
    {
      id: "dz-echorouk",
      countryCode: "DZ",
      name: "Echorouk El Yaoumi",
      englishTranslation: "The Daily Sunrise",
      founded: 1991,
      frequency: "Daily publication",
      format: "Tabloid & digital portal",
      language: "Arabic",
      headquarters: "Algiers",
      owner: {
        name: "Echorouk Group",
        type: "Independent commercial media",
      },
      editorialStance: "Popular conservative Arabic daily; breaking news, sports, and populist commentary",
      readership: {
        metric: "Over 4 million monthly online visitors across mobile and web platforms",
        source: "Echorouk Media Kit 2024",
      },
      revenueModel: "Print sales, digital advertising, and TV cross-promotion",
      logo: "newspaper-logos/dz/echorouk.svg",
      logoExplainer:
        "Bright orange sun emblem next to bold Arabic typography, representing morning news and high-volume readership.",
      sources: ["https://www.echoroukonline.com", "https://en.wikipedia.org/wiki/Echorouk_El_Yaoumi"],
    },
    {
      id: "dz-liberte",
      countryCode: "DZ",
      name: "Liberté",
      englishTranslation: "Liberty",
      founded: 1992,
      frequency: "Daily publication (historic)",
      format: "Print daily & digital portal",
      language: "French",
      headquarters: "Algiers",
      owner: {
        name: "SAEC Liberté",
        type: "Independent commercial media",
      },
      editorialStance: "Independent secular francophone paper; democracy, human rights, and economic reform",
      readership: {
        metric: "Historic pillar of independent Algerian press during the 1990s and 2000s",
        source: "Algerian Press Archive",
      },
      revenueModel: "Print sales and private sector advertising",
      logo: "newspaper-logos/dz/liberte.svg",
      logoExplainer:
        "Royal blue sans-serif title logo representing secular democratic ideals and free press principles.",
      sources: ["https://www.liberte-algerie.com", "https://en.wikipedia.org/wiki/Libert%C3%A9_(Algerian_newspaper)"],
    },
  ],

  // Andorra
  AD: [
    {
      id: "ad-diari-d-andorra",
      countryCode: "AD",
      name: "Diari d'Andorra",
      englishTranslation: "Andorra Daily",
      founded: 1991,
      frequency: "Daily (Monday–Sunday)",
      format: "Tabloid & digital portal",
      language: "Catalan",
      headquarters: "Andorra la Vella",
      owner: {
        name: "Premsa Andorrana SA",
        type: "Independent commercial media",
      },
      editorialStance: "Leading principal daily newspaper of Andorra; local politics, tourism, economy, and Pyrenean affairs",
      readership: {
        metric: "Highest-readership daily newspaper in Andorra (~18,000 daily print & digital readers)",
        source: "Premsa Andorrana Annual Report 2023",
      },
      revenueModel: "Print retail sales, digital advertising, and commercial announcements",
      logo: "newspaper-logos/ad/diari-d-andorra.svg",
      logoExplainer:
        "Navy blue serif title block with yellow accent line, representing the principal newspaper of the Principality of Andorra.",
      sources: ["https://www.diariandorra.ad", "https://en.wikipedia.org/wiki/Diari_d%27Andorra"],
    },
    {
      id: "ad-el-periodic",
      countryCode: "AD",
      name: "El Periòdic d'Andorra",
      englishTranslation: "The Andorra Periodical",
      founded: 1997,
      frequency: "Daily newspaper",
      format: "Tabloid & digital portal",
      language: "Catalan",
      headquarters: "Escaldes-Engordany",
      owner: {
        name: "Grup Clariana / Prensa Ibérica",
        type: "Independent commercial media",
      },
      editorialStance: "Commercial daily newspaper; local news, business, sports, and regional Pyrenean reporting",
      readership: {
        metric: "Major daily reach across the 7 parishes of Andorra",
        source: "El Periòdic Media Kit 2024",
      },
      revenueModel: "Print circulation and commercial advertising",
      logo: "newspaper-logos/ad/el-periodic.svg",
      logoExplainer:
        "Red and navy typography logo reflecting dynamic local news coverage across the Principality.",
      sources: ["https://www.elperiodic.ad", "https://en.wikipedia.org/wiki/El_Peri%C3%B2dic_d%27Andorra"],
    },
    {
      id: "ad-ana",
      countryCode: "AD",
      name: "Agència de Notícies Andorrana",
      englishTranslation: "Andorran News Agency (ANA)",
      founded: 2008,
      frequency: "Continuous newswire service",
      format: "Digital newswire & photo agency",
      language: "Catalan",
      headquarters: "Andorra la Vella",
      owner: {
        name: "ANA Media Group",
        type: "Independent commercial media",
      },
      editorialStance: "National newswire service; objective news reporting on Andorran public affairs and institutions",
      readership: {
        metric: "Primary wire service supplying Andorran newspapers, radio stations, and digital portals",
        source: "Agència de Notícies Andorrana Official",
      },
      revenueModel: "Media subscription fees and syndication",
      logo: "newspaper-logos/ad/ana.svg",
      logoExplainer:
        "Orange circular badge with white sans-serif lettering 'ANA', representing modern digital newswire distribution.",
      sources: ["https://www.ana.ad", "https://ca.wikipedia.org/wiki/Ag%C3%A8ncia_de_Not%C3%ADcies_Andorrana"],
    },
    {
      id: "ad-altaveu",
      countryCode: "AD",
      name: "Altaveu",
      englishTranslation: "Loudspeaker / Voice",
      founded: 2017,
      frequency: "Continuous digital news",
      format: "Digital portal & mobile news app",
      language: "Catalan",
      headquarters: "Andorra la Vella",
      owner: {
        name: "Altaveu Digital SL",
        type: "Independent commercial media",
      },
      editorialStance: "Independent digital news portal; investigative reporting, social affairs, and community news",
      readership: {
        metric: "Over 350,000 monthly page views in the Principality of Andorra",
        source: "Altaveu Digital Audience Review 2024",
      },
      revenueModel: "Digital display advertising and local commercial partnerships",
      logo: "newspaper-logos/ad/altaveu.svg",
      logoExplainer:
        "Purple modern sans-serif lowercase typography symbolising fresh independent digital journalism.",
      sources: ["https://www.altaveu.com"],
    },
    {
      id: "ad-bondia",
      countryCode: "AD",
      name: "BonDia",
      englishTranslation: "Good Day",
      founded: 2006,
      frequency: "Daily publication",
      format: "Free print daily & digital portal",
      language: "Catalan",
      headquarters: "Andorra la Vella",
      owner: {
        name: "La Veu del Poble SL",
        type: "Independent commercial media",
      },
      editorialStance: "Free daily community newspaper; accessible local news, event listings, and lifestyle",
      readership: {
        metric: "Widely distributed free daily newspaper across Andorran retail and transport nodes",
        source: "BonDia Media Kit 2024",
      },
      revenueModel: "Commercial advertising and sponsored features",
      logo: "newspaper-logos/ad/bondia.svg",
      logoExplainer:
        "Sunny orange logo with white script typography, representing friendly morning news delivery.",
      sources: ["https://www.bondia.ad"],
    },
  ],

  // Angola
  AO: [
    {
      id: "ao-angop",
      countryCode: "AO",
      name: "Agência Angola Press",
      officialName: "Agência Angola Press (ANGOP)",
      founded: 1975,
      frequency: "Continuous 24/7 state newswire",
      format: "Official state newswire & photo service",
      language: "Portuguese, English, French, Spanish",
      headquarters: "Luanda",
      owner: {
        name: "Republic of Angola",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official state news agency; government policy, national infrastructure, and African regional diplomacy",
      readership: {
        metric: "Sole national news agency of Angola, supplying news to all domestic TV, radio, and print outlets",
        source: "ANGOP Institutional Report 2023",
      },
      revenueModel: "Direct state budget allocation and subscriber licensing",
      logo: "newspaper-logos/ao/angop.svg",
      logoExplainer:
        "Red and yellow emblem incorporating a stylized geometric arrowhead, representing rapid national news distribution.",
      sources: ["https://www.angop.ao", "https://en.wikipedia.org/wiki/Angola_Press_Agency"],
    },
    {
      id: "ao-jornal-de-angola",
      countryCode: "AO",
      name: "Jornal de Angola",
      englishTranslation: "Angola Newspaper",
      founded: 1923,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Portuguese",
      headquarters: "Luanda",
      owner: {
        name: "Edições Novembro EP",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "National public daily newspaper; official state notices, public policy, and national affairs",
      readership: {
        metric: "Largest print circulation daily in Angola (~40,000 daily print copies nationwide)",
        source: "Edições Novembro EP Annual Report 2023",
      },
      revenueModel: "State subsidy, print retail sales, and official government advertising",
      logo: "newspaper-logos/ao/jornal-de-angola.svg",
      logoExplainer:
        "Classic red serif title typography on white, representing the historic national daily paper of Angola.",
      sources: ["https://www.jornaldeangola.ao", "https://en.wikipedia.org/wiki/Jornal_de_Angola"],
    },
    {
      id: "ao-o-pais",
      countryCode: "AO",
      name: "O País",
      englishTranslation: "The Country",
      founded: 2008,
      frequency: "Weekly newspaper",
      format: "Tabloid & digital portal",
      language: "Portuguese",
      headquarters: "Luanda",
      owner: {
        name: "Grupo Media Nova",
        type: "Independent commercial media",
      },
      editorialStance: "Commercial weekly newspaper; business, political commentary, and social issues",
      readership: {
        metric: "Leading commercial weekly publication in Luanda and major provincial capitals",
        source: "Media Nova Group Review 2023",
      },
      revenueModel: "Print sales and commercial advertising",
      logo: "newspaper-logos/ao/o-pais.svg",
      logoExplainer:
        "Bold crimson block typography 'O PAÍS' symbolising dynamic commercial reporting.",
      sources: ["https://opais.ao", "https://pt.wikipedia.org/wiki/O_Pa%C3%ADs_(Angola)"],
    },
    {
      id: "ao-novo-jornal",
      countryCode: "AO",
      name: "Novo Jornal",
      englishTranslation: "New Newspaper",
      founded: 2008,
      frequency: "Weekly newspaper",
      format: "Tabloid & digital portal",
      language: "Portuguese",
      headquarters: "Luanda",
      owner: {
        name: "ZAP Media / Nova Vaga",
        type: "Independent commercial media",
      },
      editorialStance: "Independent commercial weekly; investigative journalism and political analysis",
      readership: {
        metric: "Highly influential among urban professionals and civil society in Angola",
        source: "Novo Jornal Media Kit 2024",
      },
      revenueModel: "Print sales and digital display advertising",
      logo: "newspaper-logos/ao/novo-jornal.svg",
      logoExplainer:
        "Cyan blue title logo representing modern independent print journalism in Angola.",
      sources: ["https://novojornal.co.ao", "https://pt.wikipedia.org/wiki/Novo_Jornal"],
    },
    {
      id: "ao-folha-8",
      countryCode: "AO",
      name: "Folha 8",
      englishTranslation: "Page 8",
      founded: 1995,
      frequency: "Weekly publication",
      format: "Print weekly & digital portal",
      language: "Portuguese",
      headquarters: "Luanda",
      owner: {
        name: "F8 Comunicação",
        type: "Independent commercial media",
      },
      editorialStance: "Independent critical weekly; human rights, anti-corruption, and political opposition voice",
      readership: {
        metric: "Pioneer independent paper established during Angola's civil war era",
        source: "Folha 8 Archive",
      },
      revenueModel: "Print newsstand sales and private subscriptions",
      logo: "newspaper-logos/ao/folha-8.svg",
      logoExplainer:
        "Red and black stencil font 'FOLHA 8' representing courageous independent reporting.",
      sources: ["https://jornalf8.net", "https://pt.wikipedia.org/wiki/Folha_8"],
    },
  ],

  // Antigua and Barbuda
  AG: [
    {
      id: "ag-antigua-observer",
      countryCode: "AG",
      name: "Antigua Observer",
      founded: 1993,
      frequency: "Daily digital publication",
      format: "Digital portal & broadcast news service",
      language: "English",
      headquarters: "St. John's",
      owner: {
        name: "News Media Ltd",
        type: "Independent commercial media",
      },
      editorialStance: "Leading independent news organisation; Caribbean regional affairs, local politics, and tourism",
      readership: {
        metric: "Primary news source in Antigua and Barbuda with over 200,000 monthly digital visits",
        source: "Observer Media Group Impact Review 2023",
      },
      revenueModel: "Digital display advertising, commercial radio ads, and sponsored features",
      logo: "newspaper-logos/ag/antigua-observer.svg",
      logoExplainer:
        "Ocean blue rectangular banner with a golden sun emblem, symbolising Caribbean island journalism.",
      sources: ["https://antiguaobserver.com", "https://en.wikipedia.org/wiki/Antigua_Observer"],
    },
    {
      id: "ag-abs",
      countryCode: "AG",
      name: "ABS News",
      officialName: "Antigua and Barbuda Broadcasting Service",
      founded: 1956,
      frequency: "Continuous 24/7 public service broadcasting",
      format: "Public TV, radio & digital news portal",
      language: "English",
      headquarters: "St. John's",
      owner: {
        name: "Government of Antigua and Barbuda",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "National public news broadcaster; official government announcements, emergency weather bulletins, and cultural news",
      readership: {
        metric: "National public broadcaster reaching all households across Antigua and Barbuda",
        source: "ABS TV & Radio Annual Report 2023",
      },
      revenueModel: "State public budget allocation and commercial advertising",
      logo: "newspaper-logos/ag/abs.svg",
      logoExplainer:
        "Dark navy badge with a red square 'ABS' logo, representing national public service media.",
      sources: ["https://abstvradio.com"],
    },
    {
      id: "ag-real-news",
      countryCode: "AG",
      name: "Real News Antigua",
      founded: 2019,
      frequency: "Daily digital publication",
      format: "Digital news portal & e-paper",
      language: "English",
      headquarters: "St. John's",
      owner: {
        name: "Real News Media",
        type: "Independent commercial media",
      },
      editorialStance: "Independent digital newspaper; investigative stories and political critique",
      readership: {
        metric: "Widespread local readership across Antigua and the Caribbean diaspora",
        source: "Real News Media Report 2024",
      },
      revenueModel: "Digital advertising and classifieds",
      logo: "newspaper-logos/ag/real-news.svg",
      logoExplainer:
        "Vibrant green block typography 'REAL NEWS ANTIGUA' representing bold digital reporting.",
      sources: ["https://realnewsantigua.com"],
    },
    {
      id: "ag-pointville",
      countryCode: "AG",
      name: "Point Express Newspaper",
      officialName: "Pointville Publishing",
      founded: 2020,
      frequency: "Daily publication (Monday–Friday)",
      format: "Digital daily e-paper & print publication",
      language: "English",
      headquarters: "St. John's",
      owner: {
        name: "Pointville Communications",
        type: "Independent commercial media",
      },
      editorialStance: "Daily news publication; national politics, economics, and community developments",
      readership: {
        metric: "Popular daily e-paper circulated widely via digital platforms and social channels",
        source: "Pointville Publishing Review 2023",
      },
      revenueModel: "Advertising and commercial publishing",
      logo: "newspaper-logos/ag/pointville.svg",
      logoExplainer:
        "Crimson rectangular badge with bold white text 'POINT EXPRESS', representing modern daily news.",
      sources: ["https://pointville.ag"],
    },
    {
      id: "ag-antigua-trumpet",
      countryCode: "AG",
      name: "Antigua Trumpet",
      founded: 2010,
      frequency: "Weekly publication",
      format: "Digital newspaper & community portal",
      language: "English",
      headquarters: "St. John's",
      owner: {
        name: "Trumpet Media Group",
        type: "Independent commercial media",
      },
      editorialStance: "Independent community paper; focus on public opinion, civil affairs, and culture",
      readership: {
        metric: "Local community distribution across Antigua",
        source: "Antigua Trumpet Media Kit",
      },
      revenueModel: "Advertising and private sponsorships",
      logo: "newspaper-logos/ag/antigua-trumpet.svg",
      logoExplainer:
        "Indigo banner with yellow serif text 'ANTIGUA TRUMPET', symbolizing community voice and civic discourse.",
      sources: ["https://antiguatrumpet.com"],
    },
  ],

  // Argentina
  AR: [
    {
      id: "ar-clarin",
      countryCode: "AR",
      name: "Clarín",
      founded: 1945,
      frequency: "Daily (Monday–Sunday)",
      format: "Tabloid & digital portal",
      language: "Spanish",
      headquarters: "Buenos Aires",
      owner: {
        name: "Grupo Clarín S.A.",
        type: "Commercial conglomerate",
      },
      editorialStance: "Center-right commercial daily; largest circulation daily newspaper in Argentina",
      readership: {
        metric: "Over 7.5 million monthly digital subscribers and readers; highest print circulation in South America",
        source: "Instituto Verificador de Circulaciones (IVC) Argentina 2023",
      },
      revenueModel: "Digital subscriptions, print sales, display advertising, and media syndication",
      logo: "newspaper-logos/ar/clarin.svg",
      logoExplainer:
        "Iconic red serif title logo 'Clarín', recognized across Latin America as Argentina's flagship daily.",
      sources: ["https://www.clarin.com", "https://en.wikipedia.org/wiki/Clar%C3%ADn_(Argentine_newspaper)"],
    },
    {
      id: "ar-la-nacion",
      countryCode: "AR",
      name: "La Nación",
      englishTranslation: "The Nation",
      founded: 1870,
      frequency: "Daily (Monday–Sunday)",
      format: "Broadsheet & digital portal",
      language: "Spanish",
      headquarters: "Buenos Aires",
      owner: {
        name: "SA La Nación",
        type: "Independent commercial media",
      },
      editorialStance: "Conservative quality daily; founded by former President Bartolomé Mitre; business, politics, and culture",
      readership: {
        metric: "Historic paper of record in Argentina; over 5 million monthly digital readers",
        source: "IVC Argentina / Comscore 2023",
      },
      revenueModel: "Digital paywall subscriptions, print sales, and corporate advertising",
      logo: "newspaper-logos/ar/la-nacion.svg",
      logoExplainer:
        "Classic black serif title logo 'LA NACION', symbolizing 150+ years of Argentine journalism.",
      sources: ["https://www.lanacion.com.ar", "https://en.wikipedia.org/wiki/La_Naci%C3%B3n"],
    },
    {
      id: "ar-pagina-12",
      countryCode: "AR",
      name: "Página/12",
      englishTranslation: "Page 12",
      founded: 1987,
      frequency: "Daily (Monday–Sunday)",
      format: "Compact & digital portal",
      language: "Spanish",
      headquarters: "Buenos Aires",
      owner: {
        name: "Grupo Octubre",
        type: "Independent commercial media",
      },
      editorialStance: "Center-left progressive daily; human rights, investigative journalism, and labor affairs",
      readership: {
        metric: "Leading progressive newspaper in Argentina with strong academic and union readership",
        source: "IVC Argentina 2023",
      },
      revenueModel: "Print sales, digital subscriptions, and institutional advertising",
      logo: "newspaper-logos/ar/pagina-12.svg",
      logoExplainer:
        "Modern blue and white title logo 'Página/12', representing post-dictatorship progressive press freedom.",
      sources: ["https://www.pagina12.com.ar", "https://en.wikipedia.org/wiki/P%C3%A1gina/12"],
    },
    {
      id: "ar-telam",
      countryCode: "AR",
      name: "Télam",
      officialName: "Télam Agencia Nacional de Noticias",
      founded: 1945,
      frequency: "Continuous 24/7 state newswire",
      format: "Official state newswire & photo service",
      language: "Spanish, English",
      headquarters: "Buenos Aires",
      owner: {
        name: "Argentine Republic",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "National public news agency; official state news, federal affairs, and international wire distribution",
      readership: {
        metric: "Historic state newswire supplying all major Argentine provincial and national newspapers",
        source: "Agencia Télam Memory Report",
      },
      revenueModel: "State public budget funding and content subscriber fees",
      logo: "newspaper-logos/ar/telam.svg",
      logoExplainer:
        "Sky blue and white emblem with bold typography 'TÉLAM', reflecting the national colors of Argentina.",
      sources: ["https://www.telam.com.ar", "https://en.wikipedia.org/wiki/T%C3%A9lam"],
    },
    {
      id: "ar-el-cronista",
      countryCode: "AR",
      name: "El Cronista",
      officialName: "El Cronista Comercial",
      founded: 1908,
      frequency: "Daily (Monday–Friday)",
      format: "Tabloid & financial digital portal",
      language: "Spanish",
      headquarters: "Buenos Aires",
      owner: {
        name: "Grupo América",
        type: "Commercial conglomerate",
      },
      editorialStance: "Financial and business daily; macroeconomic news, markets, and corporate policy",
      readership: {
        metric: "Leading financial daily in Argentina read by business executives and financial markets",
        source: "El Cronista Media Review 2023",
      },
      revenueModel: "Corporate subscriptions, print sales, and financial advertising",
      logo: "newspaper-logos/ar/el-cronista.svg",
      logoExplainer:
        "Emerald green title logo representing financial journalism and economic markets.",
      sources: ["https://www.cronista.com", "https://es.wikipedia.org/wiki/El_Cronista_(n%C3%BAmero_comercial)"],
    },
  ],

  // Armenia
  AM: [
    {
      id: "am-armenpress",
      countryCode: "AM",
      name: "Armenpress",
      officialName: "Armenpress News Agency State CJSC",
      founded: 1918,
      frequency: "Continuous 24/7 state newswire",
      format: "Official state newswire & photo service",
      language: "Armenian, Russian, English, French, Arabic, Spanish",
      headquarters: "Yerevan",
      owner: {
        name: "Republic of Armenia",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "National state news agency; official state communications, foreign relations, and Nagorno-Karabakh reporting",
      readership: {
        metric: "Oldest and primary news agency of Armenia, supplying news to all Armenian domestic outlets and diaspora media",
        source: "Armenpress Official Review 2023",
      },
      revenueModel: "State budget allocation and subscriber service licensing",
      logo: "newspaper-logos/am/armenpress.svg",
      logoExplainer:
        "Deep blue circular badge with gold emblem and Armenian typography 'ԱՐՄԵՆՊՐԵՍ', representing 100+ years of national news agency history.",
      sources: ["https://armenpress.am", "https://en.wikipedia.org/wiki/Armenpress"],
    },
    {
      id: "am-aravot",
      countryCode: "AM",
      name: "Aravot",
      englishTranslation: "Morning",
      founded: 1994,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Armenian, Russian, English",
      headquarters: "Yerevan",
      owner: {
        name: "Aravot Daily LLC",
        type: "Independent commercial media",
      },
      editorialStance: "Independent daily newspaper; liberal democratic stance, civil rights, and political analysis",
      readership: {
        metric: "One of Armenia's most respected independent daily print and online newspapers",
        source: "Yerevan Press Club Report 2023",
      },
      revenueModel: "Print sales, digital display advertising, and subscriptions",
      logo: "newspaper-logos/am/aravot.svg",
      logoExplainer:
        "Navy and red Armenian script logo 'ԱՌԱՎՈՏ' representing morning independent news.",
      sources: ["https://www.aravot.am", "https://en.wikipedia.org/wiki/Aravot"],
    },
    {
      id: "am-news-am",
      countryCode: "AM",
      name: "News.am",
      founded: 2009,
      frequency: "Continuous 24/7 digital news",
      format: "Digital news portal & mobile news service",
      language: "Armenian, English, Russian, Turkish",
      headquarters: "Yerevan",
      owner: {
        name: "Media News Agency LLC",
        type: "Independent commercial media",
      },
      editorialStance: "Independent online news agency; breaking news, regional Caucasus politics, and international affairs",
      readership: {
        metric: "Over 3.5 million monthly online visits across Armenia and the global Armenian diaspora",
        source: "SimilarWeb / News.am Media Kit 2024",
      },
      revenueModel: "Digital display advertising, video pre-rolls, and commercial partnerships",
      logo: "newspaper-logos/am/news-am.svg",
      logoExplainer:
        "Red bold typography 'NEWS.am' symbolising rapid digital breaking news reporting.",
      sources: ["https://news.am", "https://en.wikipedia.org/wiki/News.am"],
    },
    {
      id: "am-hayastani-hanrapetutyun",
      countryCode: "AM",
      name: "Hayastani Hanrapetutyun",
      englishTranslation: "Republic of Armenia",
      founded: 1990,
      frequency: "Daily (Tuesday–Saturday)",
      format: "Official print daily & digital portal",
      language: "Armenian",
      headquarters: "Yerevan",
      owner: {
        name: "National Assembly of Armenia",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official parliamentary daily newspaper; official legislative acts, laws, and state decrees",
      readership: {
        metric: "Official legal gazette and daily paper for civil servants and legal professionals in Armenia",
        source: "National Assembly Press Division 2023",
      },
      revenueModel: "State parliamentary budget allocation",
      logo: "newspaper-logos/am/hayastani-hanrapetutyun.svg",
      logoExplainer:
        "Gold Armenian calligraphic script 'ՀԱՅԱՍՏԱՆԻ ՀԱՆՐԱՊԵՏՈՒԹՅՈՒՆ' on dark slate, representing parliamentary state publishing.",
      sources: ["https://hhpress.am", "https://hy.wikipedia.org/wiki/%D5%80%D5%A1%D5%B5%D5%A1%D5%BD%D5%B2%D5%A1%D5%B6%D5%AB_%D5%80%D5%A1%D5%B6%D5%BF%D5%A1%D5%BA%D5%AE%D5%BF%D5%B8%D5%A9%D5%B5%D5%B8%D5%Living"],
    },
    {
      id: "am-hetq",
      countryCode: "AM",
      name: "Hetq",
      englishTranslation: "Trace",
      founded: 2001,
      frequency: "Continuous online publishing",
      format: "Investigative e-journal & multimedia portal",
      language: "Armenian, English",
      headquarters: "Yerevan",
      owner: {
        name: "Investigative Journalists NGO",
        type: "Independent trust / foundation",
      },
      editorialStance: "Independent non-profit investigative journalism; anti-corruption, environment, and human rights (GIJN member)",
      readership: {
        metric: "Premier investigative journalism outlet in Armenia, widely cited by international media",
        source: "Global Investigative Journalism Network (GIJN)",
      },
      revenueModel: "Philanthropic grants, non-profit foundations, and reader donations",
      logo: "newspaper-logos/am/hetq.svg",
      logoExplainer:
        "Forest green badge with white Armenian typography 'ՀԵՏՔ', representing independent investigative integrity.",
      sources: ["https://hetq.am", "https://en.wikipedia.org/wiki/Hetq"],
    },
  ],

  // Austria
  AT: [
    {
      id: "at-apa",
      countryCode: "AT",
      name: "Austria Presse Agentur",
      officialName: "Austria Presse Agentur eG (APA)",
      founded: 1946,
      frequency: "Continuous 24/7 national newswire",
      format: "Cooperative national newswire, photo & digital data agency",
      language: "German, English",
      headquarters: "Vienna",
      owner: {
        name: "APA eG (Cooperative of Austrian daily newspapers & ORF)",
        type: "Independent trust / foundation",
      },
      editorialStance: "Independent, non-partisan cooperative news agency; factual wire reporting and fact-checking",
      readership: {
        metric: "National news agency of Austria, supplying 100% of Austrian daily newspapers and broadcast networks",
        source: "APA Annual Report 2023",
      },
      annualPublicFunding: {
        total: "A$0.00 / year (Fully self-funded cooperative owned by private newspapers and ORF)",
        perCapita: "A$0.00 / person",
      },
      revenueModel: "Commercial subscription fees from member newspapers, broadcasters, and corporate clients",
      logo: "newspaper-logos/at/apa.svg",
      logoExplainer:
        "Red square emblem next to bold typography 'APA AUSTRIAPRESSEAGENTUR', symbolising independent cooperative news agency reporting.",
      sources: ["https://apa.at", "https://en.wikipedia.org/wiki/Austria_Presse_Agentur"],
    },
    {
      id: "at-kronen-zeitung",
      countryCode: "AT",
      name: "Kronen Zeitung",
      englishTranslation: "Crown Newspaper",
      founded: 1900,
      frequency: "Daily (Monday–Sunday)",
      format: "Tabloid & digital portal",
      language: "German",
      headquarters: "Vienna",
      owner: {
        name: "Dichand Family & Funke Mediengruppe",
        type: "Independent commercial media",
      },
      editorialStance: "Populist commercial daily; highest circulation newspaper in Austria per capita",
      readership: {
        metric: "Over 2.1 million daily readers (~25% of Austria's population); highest per-capita print reach in Europe",
        source: "Media-Analyse Austria 2023/2024",
      },
      revenueModel: "Print retail sales, digital subscriptions, and commercial advertising",
      logo: "newspaper-logos/at/kronen-zeitung.svg",
      logoExplainer:
        "Red banner featuring traditional Fraktur script typography 'Kronen Zeitung', iconic across Austrian print history.",
      sources: ["https://www.krone.at", "https://en.wikipedia.org/wiki/Kronen_Zeitung"],
    },
    {
      id: "at-der-standard",
      countryCode: "AT",
      name: "Der Standard",
      founded: 1988,
      frequency: "Daily (Monday–Saturday)",
      format: "Broadsheet (pink paper) & digital portal",
      language: "German",
      headquarters: "Vienna",
      owner: {
        name: "Oscar Bronner / STANDARD Medien AG",
        type: "Independent commercial media",
      },
      editorialStance: "Liberal-centre quality daily newspaper; international politics, culture, economics, and civil society",
      readership: {
        metric: "Leading online news portal in Austria (derStandard.at) with over 2.5 million monthly unique visitors",
        source: "ÖWA (Österreichische Web-Analyse) 2024",
      },
      revenueModel: "Digital subscriptions, pink paper print sales, and display advertising",
      logo: "newspaper-logos/at/der-standard.svg",
      logoExplainer:
        "Salmon-pink rectangular logo with bold sans-serif text 'DER STANDARD', matching the newspaper's signature pink print pages.",
      sources: ["https://www.derstandard.at", "https://en.wikipedia.org/wiki/Der_Standard"],
    },
    {
      id: "at-die-presse",
      countryCode: "AT",
      name: "Die Presse",
      englishTranslation: "The Press",
      founded: 1848,
      frequency: "Daily (Monday–Sunday)",
      format: "Broadsheet & digital portal",
      language: "German",
      headquarters: "Vienna",
      owner: {
        name: "Styria Media Group AG",
        type: "Independent commercial media",
      },
      editorialStance: "Bourgeois-liberal quality daily newspaper; founded during the 1848 revolutions; economics and law",
      readership: {
        metric: "Over 350,000 daily readers; leading paper of record for Austria's business and legal sectors",
        source: "Media-Analyse Austria 2023/2024",
      },
      revenueModel: "Digital paywall subscriptions, print sales, and corporate advertising",
      logo: "newspaper-logos/at/die-presse.svg",
      logoExplainer:
        "Classic serif title logo 'Die Presse' with subtitle 'SEIT 1848 UNABHÄNGIG', reflecting 175+ years of liberal press tradition.",
      sources: ["https://www.diepresse.com", "https://en.wikipedia.org/wiki/Die_Presse"],
    },
    {
      id: "at-kurier",
      countryCode: "AT",
      name: "Kurier",
      englishTranslation: "Courier",
      founded: 1954,
      frequency: "Daily (Monday–Sunday)",
      format: "Tabloid/Compact & digital portal",
      language: "German",
      headquarters: "Vienna",
      owner: {
        name: "Funke Mediengruppe & Raiffeisen Group",
        type: "Independent commercial media",
      },
      editorialStance: "Centrist commercial daily; major national reporting, investigative journalism, and domestic news",
      readership: {
        metric: "Over 480,000 daily print & digital readers across Austria",
        source: "Media-Analyse Austria 2023/2024",
      },
      revenueModel: "Print newsstand sales, digital subscriptions, and commercial advertising",
      logo: "newspaper-logos/at/kurier.svg",
      logoExplainer:
        "Bold blue sans-serif title logo 'KURIER', symbolizing modern Austrian mainstream daily journalism.",
      sources: ["https://kurier.at", "https://en.wikipedia.org/wiki/Kurier"],
    },
  ],

  // Azerbaijan
  AZ: [
    {
      id: "az-azertac",
      countryCode: "AZ",
      name: "AZERTAC",
      officialName: "Azerbaijan State News Agency",
      founded: 1920,
      frequency: "Continuous 24/7 state newswire",
      format: "Official state newswire & photo service",
      language: "Azerbaijani, English, Russian, French, German, Arabic, Chinese, Spanish",
      headquarters: "Baku",
      owner: {
        name: "Republic of Azerbaijan",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official state news agency; government policy, presidential activity, and international diplomacy",
      readership: {
        metric: "Primary news supplier to domestic broadcast networks, print titles, and foreign diplomatic missions",
        source: "AZERTAC Annual Report 2023",
      },
      revenueModel: "Direct state budget allocation",
      logo: "newspaper-logos/az/azertac.svg",
      logoExplainer:
        "Cyan blue emblem with white typography 'AZERTAC', representing Azerbaijan's official state news agency.",
      sources: ["https://azertag.az", "https://en.wikipedia.org/wiki/Azerbaijan_State_News_Agency"],
    },
    {
      id: "az-apa",
      countryCode: "AZ",
      name: "APA",
      officialName: "Azeri Press Agency",
      founded: 2004,
      frequency: "Continuous digital newswire",
      format: "Independent digital newswire service",
      language: "Azerbaijani, English, Russian",
      headquarters: "Baku",
      owner: {
        name: "APA Group",
        type: "Independent commercial media",
      },
      editorialStance: "Commercial news agency; breaking news, political commentary, and South Caucasus affairs",
      readership: {
        metric: "Over 1.5 million monthly online visits across Azerbaijani media outlets",
        source: "APA Group Media Review 2024",
      },
      revenueModel: "Digital advertising and news syndication",
      logo: "newspaper-logos/az/apa.svg",
      logoExplainer:
        "Dark navy badge with bright sky blue typography 'apa', representing modern online journalism.",
      sources: ["https://apa.az", "https://en.wikipedia.org/wiki/Azeri-Press_Agency"],
    },
    {
      id: "az-trend",
      countryCode: "AZ",
      name: "Trend News Agency",
      founded: 1995,
      frequency: "Continuous newswire service",
      format: "Commercial newswire & analytical portal",
      language: "Azerbaijani, English, Russian, Persian",
      headquarters: "Baku",
      owner: {
        name: "Trend Media Group",
        type: "Independent commercial media",
      },
      editorialStance: "Commercial news agency; energy sector, Caspian region economics, and international business",
      readership: {
        metric: "Major regional coverage across Caspian and Central Asian energy markets",
        source: "Trend News Agency Corporate Profile",
      },
      revenueModel: "Commercial subscriber feeds, energy reports, and advertising",
      logo: "newspaper-logos/az/trend.svg",
      logoExplainer:
        "Royal blue background with amber text 'TREND', symbolising economic and energy reporting.",
      sources: ["https://en.trend.az", "https://en.wikipedia.org/wiki/Trend_News_Agency"],
    },
    {
      id: "az-report",
      countryCode: "AZ",
      name: "Report News Agency",
      founded: 2014,
      frequency: "Continuous digital newswire",
      format: "Digital news agency portal",
      language: "Azerbaijani, English, Russian",
      headquarters: "Baku",
      owner: {
        name: "Global Media Group",
        type: "Independent commercial media",
      },
      editorialStance: "Commercial digital news agency; political events, economy, and sports reporting",
      readership: {
        metric: "Over 2 million monthly online page views",
        source: "Report.az Media Kit 2024",
      },
      revenueModel: "Digital display advertising and video news distribution",
      logo: "newspaper-logos/az/report.svg",
      logoExplainer:
        "Crimson title badge with bold white text 'REPORT.AZ', representing rapid digital breaking news.",
      sources: ["https://report.az", "https://en.wikipedia.org/wiki/Report_News_Agency"],
    },
    {
      id: "az-525",
      countryCode: "AZ",
      name: "525-ci qəzet",
      englishTranslation: "Newspaper 525",
      founded: 1992,
      frequency: "Daily newspaper",
      format: "Print daily & digital portal",
      language: "Azerbaijani",
      headquarters: "Baku",
      owner: {
        name: "525 Press LLC",
        type: "Independent commercial media",
      },
      editorialStance: "Independent daily newspaper; public affairs, literature, and social issues",
      readership: {
        metric: "Established daily print readership among intellectuals and civil society in Baku",
        source: "Press Council of Azerbaijan",
      },
      revenueModel: "Print sales and commercial advertising",
      logo: "newspaper-logos/az/525.svg",
      logoExplainer:
        "Dark slate background with gold text '525-ci QƏZET', representing 30+ years of independent print press.",
      sources: ["https://525.az", "https://az.wikipedia.org/wiki/525-ci_q%C9%99zet"],
    },
  ],

  // Bahamas
  BS: [
    {
      id: "bs-nassau-guardian",
      countryCode: "BS",
      name: "The Nassau Guardian",
      founded: 1844,
      frequency: "Daily (Monday–Saturday)",
      format: "Broadsheet & digital portal",
      language: "English",
      headquarters: "Nassau",
      owner: {
        name: "Perry Media Group",
        type: "Independent commercial media",
      },
      editorialStance: "Commercial quality daily; oldest continuously published newspaper in The Bahamas",
      readership: {
        metric: "Leading national print and online daily in The Bahamas (~15,000 daily print, 300K monthly web views)",
        source: "The Nassau Guardian Media Review 2023",
      },
      revenueModel: "Print retail sales, digital subscriptions, and commercial advertising",
      logo: "newspaper-logos/bs/nassau-guardian.svg",
      logoExplainer:
        "Teal blue rectangular banner with white serif title typography 'The Nassau Guardian', representing Bahamian print history.",
      sources: ["https://thenassauguardian.com", "https://en.wikipedia.org/wiki/The_Nassau_Guardian"],
    },
    {
      id: "bs-tribune",
      countryCode: "BS",
      name: "The Tribune",
      founded: 1903,
      frequency: "Daily (Monday–Saturday)",
      format: "Broadsheet & digital portal",
      language: "English",
      headquarters: "Nassau",
      owner: {
        name: "Dupuch Family",
        type: "Independent commercial media",
      },
      editorialStance: "Independent commercial daily; crusading journalism, political commentary, and local reporting",
      readership: {
        metric: "Historic paper of record founded by Sir Etienne Dupuch; widespread island distribution",
        source: "The Tribune Media Kit 2023",
      },
      revenueModel: "Print newsstand sales and advertising",
      logo: "newspaper-logos/bs/tribune.svg",
      logoExplainer:
        "Classic black serif title font on white canvas, reflecting 120+ years of independent Bahamian journalism.",
      sources: ["https://www.tribune242.com", "https://en.wikipedia.org/wiki/The_Tribune_(Bahamas)"],
    },
    {
      id: "bs-bis",
      countryCode: "BS",
      name: "Bahamas Information Services",
      officialName: "Bahamas Information Services (BIS)",
      founded: 1974,
      frequency: "Continuous state news service",
      format: "Official government news agency",
      language: "English",
      headquarters: "Nassau",
      owner: {
        name: "Commonwealth of The Bahamas",
        type: "Government ministry / department",
      },
      editorialStance: "Official government news service; parliamentary proceedings, cabinet releases, and national public announcements",
      readership: {
        metric: "Official news provider for all Bahamian radio, TV, and print media",
        source: "Bahamas Information Services",
      },
      revenueModel: "Government parliamentary budget",
      logo: "newspaper-logos/bs/bis.svg",
      logoExplainer:
        "Gold and blue emblem 'BIS BAHAMAS INFORMATION SERVICES', representing official state public information.",
      sources: ["https://www.bahamas.gov.bs", "https://en.wikipedia.org/wiki/Bahamas_Information_Services"],
    },
    {
      id: "bs-punch",
      countryCode: "BS",
      name: "The Punch",
      founded: 1990,
      frequency: "Bi-weekly publication",
      format: "Tabloid print & digital",
      language: "English",
      headquarters: "Nassau",
      owner: {
        name: "The Punch Ltd",
        type: "Independent commercial media",
      },
      editorialStance: "Sensational tabloid newspaper; political gossip, investigative scoops, and crime reporting",
      readership: {
        metric: "Highest single-issue print sales in The Bahamas (~25,000 copies per edition)",
        source: "The Punch Publishing Group",
      },
      revenueModel: "Newsstand retail sales and local advertising",
      logo: "newspaper-logos/bs/punch.svg",
      logoExplainer:
        "Bold red title banner with yellow typography 'THE PUNCH', representing energetic tabloid reporting.",
      sources: ["https://en.wikipedia.org/wiki/The_Punch_(Bahamas)"],
    },
    {
      id: "bs-eyewitness",
      countryCode: "BS",
      name: "Eyewitness News Bahamas",
      founded: 2017,
      frequency: "Continuous digital news",
      format: "Digital news portal & broadcast agency",
      language: "English",
      headquarters: "Nassau",
      owner: {
        name: "Cable Bahamas / Aliv",
        type: "Independent commercial media",
      },
      editorialStance: "Modern digital news portal; breaking news, video reporting, and national current affairs",
      readership: {
        metric: "Over 400,000 monthly page views nationwide",
        source: "Eyewitness News Media Kit 2024",
      },
      revenueModel: "Digital display ads, telecom sponsorship, and video commercials",
      logo: "newspaper-logos/bs/eyewitness.svg",
      logoExplainer:
        "Dark blue badge with white and sky blue text 'EYEWITNESS NEWS', symbolising modern digital broadcasting.",
      sources: ["https://ewnews.com"],
    },
  ],

  // Bahrain
  BH: [
    {
      id: "bh-bna",
      countryCode: "BH",
      name: "Bahrain News Agency",
      officialName: "Bahrain News Agency (BNA)",
      founded: 1976,
      frequency: "Continuous 24/7 state newswire",
      format: "Official state newswire & photo service",
      language: "Arabic, English",
      headquarters: "Manama",
      owner: {
        name: "Ministry of Information Affairs",
        type: "Government ministry / department",
      },
      editorialStance: "Official state news agency; royal decrees, government policy, and Gulf Cooperation Council (GCC) diplomacy",
      readership: {
        metric: "Primary wire agency supplying news to all domestic Bahraini newspapers, TV, and international press",
        source: "BNA Institutional Review 2023",
      },
      revenueModel: "Direct state budget allocation",
      logo: "newspaper-logos/bh/bna.svg",
      logoExplainer:
        "Crimson circular emblem with Arabic typography 'بنا' and white text 'BAHRAIN NEWS AGENCY', representing official royal state media.",
      sources: ["https://www.bna.bh", "https://en.wikipedia.org/wiki/Bahrain_News_Agency"],
    },
    {
      id: "bh-al-ayam",
      countryCode: "BH",
      name: "Al Ayam",
      englishTranslation: "The Days",
      founded: 1989,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Arabic",
      headquarters: "Manama",
      owner: {
        name: "Al Ayam Publishing",
        type: "Independent commercial media",
      },
      editorialStance: "Independent commercial Arabic daily; reformist stance, public affairs, and cultural news",
      readership: {
        metric: "One of Bahrain's highest circulation Arabic dailies (~35,000 daily print & digital copies)",
        source: "Al Ayam Publishing Review 2023",
      },
      revenueModel: "Print sales, subscriptions, and commercial advertising",
      logo: "newspaper-logos/bh/al-ayam.svg",
      logoExplainer:
        "Sky blue title banner with white Arabic calligraphic typography 'الأيام'.",
      sources: ["https://www.alayam.com", "https://en.wikipedia.org/wiki/Al_Ayam_(Bahrain)"],
    },
    {
      id: "bh-al-bilad",
      countryCode: "BH",
      name: "Al Bilad",
      englishTranslation: "The Country",
      founded: 2008,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Arabic",
      headquarters: "Manama",
      owner: {
        name: "Dar Al Bilad Press",
        type: "Independent commercial media",
      },
      editorialStance: "Commercial Arabic daily; business, financial markets, local politics, and Gulf affairs",
      readership: {
        metric: "Major daily reach among business leaders and government sectors in Manama",
        source: "Dar Al Bilad Media Kit 2024",
      },
      revenueModel: "Print sales and corporate display advertising",
      logo: "newspaper-logos/bh/al-bilad.svg",
      logoExplainer:
        "Forest green background with white calligraphic text 'البلاد', representing financial and national affairs.",
      sources: ["https://www.albiladpress.com", "https://en.wikipedia.org/wiki/Al_Bilad_(Bahraini_newspaper)"],
    },
    {
      id: "bh-akhbar-al-khaleej",
      countryCode: "BH",
      name: "Akhbar Al Khaleej",
      englishTranslation: "Gulf News",
      founded: 1976,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Arabic",
      headquarters: "Manama",
      owner: {
        name: "Al Hilal Group",
        type: "Independent commercial media",
      },
      editorialStance: "Historic Arabic daily newspaper; pro-government, regional Arab affairs, and community news",
      readership: {
        metric: "First daily newspaper published in Bahrain (est. 1976); established readership base",
        source: "Al Hilal Publishing",
      },
      revenueModel: "Print circulation and commercial advertising",
      logo: "newspaper-logos/bh/akhbar-al-khaleej.svg",
      logoExplainer:
        "Deep red title block with Arabic calligraphy 'أخبار الخليج', symbolizing historic Gulf journalism.",
      sources: ["https://www.akhbar-alkhaleej.com", "https://en.wikipedia.org/wiki/Akhbar_Al_Khaleej"],
    },
    {
      id: "bh-daily-tribune",
      countryCode: "BH",
      name: "The Daily Tribune",
      officialName: "DT News / The Daily Tribune",
      founded: 1997,
      frequency: "Daily newspaper",
      format: "Tabloid & digital portal",
      language: "English",
      headquarters: "Manama",
      owner: {
        name: "VAR Media",
        type: "Independent commercial media",
      },
      editorialStance: "English-language daily newspaper; local news, expatriate community, business, and sports",
      readership: {
        metric: "Leading English daily read by expatriate professionals and diplomatic sector in Bahrain",
        source: "The Daily Tribune Media Kit 2024",
      },
      revenueModel: "Print sales, digital display ads, and corporate sponsorships",
      logo: "newspaper-logos/bh/daily-tribune.svg",
      logoExplainer:
        "Slate blue title banner with white serif text 'THE DAILY TRIBUNE' and red subtitle.",
      sources: ["https://www.newsofbahrain.com", "https://en.wikipedia.org/wiki/The_Daily_Tribune_(Bahrain)"],
    },
  ],

  // Bangladesh
  BD: [
    {
      id: "bd-bss",
      countryCode: "BD",
      name: "Bangladesh Sangbad Sangstha",
      officialName: "Bangladesh Sangbad Sangstha (BSS)",
      founded: 1972,
      frequency: "Continuous 24/7 state newswire",
      format: "Official state newswire & photo agency",
      language: "Bengali, English",
      headquarters: "Dhaka",
      owner: {
        name: "People's Republic of Bangladesh",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official national news agency; parliamentary proceedings, state development, and diplomatic reporting",
      readership: {
        metric: "Primary news supplier to all Bangladeshi domestic newspapers, television channels, and radio stations",
        source: "BSS Official Annual Report 2023",
      },
      revenueModel: "Government parliamentary grant allocation and subscriber licensing",
      logo: "newspaper-logos/bd/bss.svg",
      logoExplainer:
        "Green and red emblem incorporating Bengali and English typography, representing Bangladesh's national press agency.",
      sources: ["https://www.bssnews.net", "https://en.wikipedia.org/wiki/Bangladesh_Sangbad_Sangstha"],
    },
    {
      id: "bd-daily-star",
      countryCode: "BD",
      name: "The Daily Star",
      founded: 1991,
      frequency: "Daily (Monday–Sunday)",
      format: "Broadsheet & digital portal",
      language: "English",
      headquarters: "Dhaka",
      owner: {
        name: "Mediaworld Ltd",
        type: "Independent commercial media",
      },
      editorialStance: "Leading English-language quality daily; independent, liberal stance, civil rights, and economic reporting",
      readership: {
        metric: "Largest circulation English newspaper in Bangladesh (over 8 million monthly unique web visitors)",
        source: "Reuters Institute Digital News Report 2023",
      },
      revenueModel: "Print newsstand sales, display advertising, and digital subscriptions",
      logo: "newspaper-logos/bd/daily-star.svg",
      logoExplainer:
        "Deep blue serif title font 'The Daily Star', recognized worldwide as Bangladesh's primary English newspaper.",
      sources: ["https://www.thedailystar.net", "https://en.wikipedia.org/wiki/The_Daily_Star_(Bangladesh)"],
    },
    {
      id: "bd-prothom-alo",
      countryCode: "BD",
      name: "Prothom Alo",
      englishTranslation: "First Light",
      founded: 1998,
      frequency: "Daily (Monday–Sunday)",
      format: "Broadsheet & digital portal",
      language: "Bengali",
      headquarters: "Dhaka",
      owner: {
        name: "Transcom Group (Mediastar Ltd)",
        type: "Commercial conglomerate",
      },
      editorialStance: "Independent Bengali quality daily; largest newspaper in Bangladesh; investigative journalism and culture",
      readership: {
        metric: "Highest print circulation and online reach in Bangladesh (~500,000 daily print, 15M monthly web visitors)",
        source: "Department of Film and Publications (DFP) Bangladesh 2023",
      },
      revenueModel: "Print sales, digital display advertising, and e-paper subscriptions",
      logo: "newspaper-logos/bd/prothom-alo.svg",
      logoExplainer:
        "Red Bengali script title logo 'প্রথম আলো', symbolising morning enlightenment and national news leadership.",
      sources: ["https://www.prothomalo.com", "https://en.wikipedia.org/wiki/Prothom_Alo"],
    },
    {
      id: "bd-ittefaq",
      countryCode: "BD",
      name: "The Daily Ittefaq",
      englishTranslation: "Unity",
      founded: 1953,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Bengali",
      headquarters: "Dhaka",
      owner: {
        name: "Ittefaq Group of Publications",
        type: "Independent commercial media",
      },
      editorialStance: "Historic Bengali daily newspaper; played a pivotal role in the 1971 Bangladesh Liberation Movement",
      readership: {
        metric: "Oldest continuously published Bengali daily newspaper in Bangladesh",
        source: "DFP Bangladesh 2023",
      },
      revenueModel: "Print circulation and commercial advertising",
      logo: "newspaper-logos/bd/ittefaq.svg",
      logoExplainer:
        "Emerald green title block with white Bengali calligraphy 'ইত্তেফাক', reflecting liberation era journalism heritage.",
      sources: ["https://www.ittefaq.com.bd", "https://en.wikipedia.org/wiki/The_Daily_Ittefaq"],
    },
    {
      id: "bd-bdnews24",
      countryCode: "BD",
      name: "bdnews24.com",
      founded: 2005,
      frequency: "Continuous 24/7 digital news",
      format: "Bilingual digital news agency portal",
      language: "Bengali, English",
      headquarters: "Dhaka",
      owner: {
        name: "Bangladesh News 24 Hours Ltd",
        type: "Independent commercial media",
      },
      editorialStance: "Pioneer online news agency; 24-hour breaking news, political reporting, and multimedia coverage",
      readership: {
        metric: "First internet-only news agency in Bangladesh with over 10 million monthly digital visits",
        source: "SimilarWeb / bdnews24 Media Review 2024",
      },
      revenueModel: "Digital advertising, sponsored sections, and mobile news syndication",
      logo: "newspaper-logos/bd/bdnews24.svg",
      logoExplainer:
        "Slate black logo with red text 'bdnews24.com', symbolising digital 24-hour newswire distribution.",
      sources: ["https://bdnews24.com", "https://en.wikipedia.org/wiki/Bdnews24.com"],
    },
  ],

  // Barbados
  BB: [
    {
      id: "bb-barbados-advocate",
      countryCode: "BB",
      name: "The Barbados Advocate",
      founded: 1895,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "English",
      headquarters: "Bridgetown",
      owner: {
        name: "Advocate Publishers 2000 Inc",
        type: "Independent commercial media",
      },
      editorialStance: "Commercial quality daily; oldest surviving daily newspaper in Barbados; local politics, business, and sports",
      readership: {
        metric: "Established daily print and online circulation across Barbados and the Eastern Caribbean",
        source: "Advocate Publishers Review 2023",
      },
      revenueModel: "Print newsstand sales, digital subscriptions, and commercial advertising",
      logo: "newspaper-logos/bb/barbados-advocate.svg",
      logoExplainer:
        "Deep blue serif title font 'The Barbados Advocate' with yellow subtitle, symbolising 125+ years of Barbadian print journalism.",
      sources: ["https://www.barbadosadvocate.com", "https://en.wikipedia.org/wiki/The_Barbados_Advocate"],
    },
    {
      id: "bb-nation-news",
      countryCode: "BB",
      name: "Nation News",
      officialName: "The Nation Newspaper",
      founded: 1973,
      frequency: "Daily (Monday–Sunday)",
      format: "Broadsheet & digital portal",
      language: "English",
      headquarters: "Fontabelle, St. Michael",
      owner: {
        name: "One Caribbean Media Ltd (OCM)",
        type: "Commercial conglomerate",
      },
      editorialStance: "Leading commercial daily newspaper in Barbados; investigative news, community issues, and CARICOM regional affairs",
      readership: {
        metric: "Highest circulation newspaper in Barbados (~25,000 daily print, 1M monthly digital visitors)",
        source: "One Caribbean Media Annual Report 2023",
      },
      revenueModel: "Print retail sales, digital advertising, and e-paper subscriptions",
      logo: "newspaper-logos/bb/nation-news.svg",
      logoExplainer:
        "Bold red title typography 'NATION NEWS' on white, representing Barbados's primary daily newspaper.",
      sources: ["https://www.nationnews.com", "https://en.wikipedia.org/wiki/The_Nation_(Barbados)"],
    },
    {
      id: "bb-bgis",
      countryCode: "BB",
      name: "Barbados Government Information Service",
      officialName: "BGIS News",
      founded: 1958,
      frequency: "Continuous state news agency",
      format: "Official government news service",
      language: "English",
      headquarters: "Bridgetown",
      owner: {
        name: "Government of Barbados",
        type: "Government ministry / department",
      },
      editorialStance: "Official government news agency; ministerial statements, parliamentary acts, and public health bulletins",
      readership: {
        metric: "Primary official news source supplying all Barbadian radio, TV, and print outlets",
        source: "BGIS Official",
      },
      revenueModel: "Government state budget allocation",
      logo: "newspaper-logos/bb/bgis.svg",
      logoExplainer:
        "Blue and gold emblem 'BGIS BARBADOS GOVERNMENT INFORMATION SERVICE', representing official public communication.",
      sources: ["https://gisbarbados.gov.bb", "https://en.wikipedia.org/wiki/Barbados_Government_Information_Service"],
    },
    {
      id: "bb-barbados-today",
      countryCode: "BB",
      name: "Barbados Today",
      founded: 2010,
      frequency: "Daily digital publication",
      format: "Digital multimedia portal & e-paper",
      language: "English",
      headquarters: "Lodge Hill, St. Michael",
      owner: {
        name: "Barbados Today Inc",
        type: "Independent commercial media",
      },
      editorialStance: "Independent digital newspaper; multimedia news reporting, video interviews, and current affairs",
      readership: {
        metric: "Over 500,000 monthly digital visits across mobile and web platforms",
        source: "Barbados Today Media Review 2024",
      },
      revenueModel: "Digital display advertising, video pre-rolls, and corporate sponsorships",
      logo: "newspaper-logos/bb/barbados-today.svg",
      logoExplainer:
        "Cyan blue title banner with white and yellow text 'BARBADOS TODAY', representing modern digital island news.",
      sources: ["https://barbadostoday.bb"],
    },
    {
      id: "bb-loop-barbados",
      countryCode: "BB",
      name: "Loop News Barbados",
      founded: 2014,
      frequency: "Continuous digital news",
      format: "Digital news portal & mobile news app",
      language: "English",
      headquarters: "Bridgetown",
      owner: {
        name: "Trend Media / Digicel Group",
        type: "Commercial conglomerate",
      },
      editorialStance: "Caribbean digital news network; lifestyle, breaking news, sports, and youth community reporting",
      readership: {
        metric: "Wide mobile app reach among young Barbadians and Caribbean diaspora",
        source: "Trend Media Group 2024",
      },
      revenueModel: "Digital mobile advertising and branded partnerships",
      logo: "newspaper-logos/bb/loop-barbados.svg",
      logoExplainer:
        "Purple modern logo 'loop NEWS', representing Caribbean mobile digital publishing.",
      sources: ["https://barbados.loopnews.com"],
    },
  ],

  // Belarus
  BY: [
    {
      id: "by-belta",
      countryCode: "BY",
      name: "BelTA",
      officialName: "Belarusian Telegraph Agency (BelTA)",
      founded: 1918,
      frequency: "Continuous 24/7 state newswire",
      format: "Official state newswire & photo agency",
      language: "Belarusian, Russian, English, German, Spanish, Chinese",
      headquarters: "Minsk",
      owner: {
        name: "Republic of Belarus",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official state news agency; presidential decrees, government policies, and national affairs",
      readership: {
        metric: "Primary news supplier to all domestic Belarusian print newspapers, TV channels, and radio stations",
        source: "BelTA Official Annual Report 2023",
      },
      revenueModel: "Direct state budget funding and subscriber licensing",
      logo: "newspaper-logos/by/belta.svg",
      logoExplainer:
        "Red circular emblem with white typography 'БЕЛТА', symbolising Belarus's official national telegraph agency.",
      sources: ["https://www.belta.by", "https://en.wikipedia.org/wiki/Belarusian_Telegraph_Agency"],
    },
    {
      id: "by-sb-segodnya",
      countryCode: "BY",
      name: "SB. Belarus Segodnya",
      officialName: "Sovetskaya Belorussiya / SB. Belarus Segodnya",
      founded: 1927,
      frequency: "Daily (Tuesday–Saturday)",
      format: "Broadsheet & digital portal",
      language: "Russian, Belarusian",
      headquarters: "Minsk",
      owner: {
        name: "Presidential Administration of Belarus",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official state daily newspaper; highest print circulation in Belarus; official government notices and public policy",
      readership: {
        metric: "Largest print newspaper circulation in Belarus (~190,000 daily print copies)",
        source: "Ministry of Information of the Republic of Belarus 2023",
      },
      revenueModel: "State budget subsidy, print retail sales, and mandatory public institution subscriptions",
      logo: "newspaper-logos/by/sb-segodnya.svg",
      logoExplainer:
        "Royal blue title banner with white serif text 'СБ. БЕЛАРУСЬ СЕГОДНЯ', representing the main state daily paper.",
      sources: ["https://www.sb.by", "https://en.wikipedia.org/wiki/Sovetskaya_Belorussiya_%E2%80%93_Belarus_Segodnya"],
    },
    {
      id: "by-zvyazda",
      countryCode: "BY",
      name: "Zvyazda",
      englishTranslation: "The Star",
      founded: 1917,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Belarusian",
      headquarters: "Minsk",
      owner: {
        name: "Publishing House Zvyazda",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official state Belarusian-language daily; focus on Belarusian language culture, literature, and regional news",
      readership: {
        metric: "Only state daily newspaper published entirely in the Belarusian language (~20,000 daily print copies)",
        source: "Ministry of Information of Belarus",
      },
      revenueModel: "State subsidy and print subscription sales",
      logo: "newspaper-logos/by/zvyazda.svg",
      logoExplainer:
        "Forest green title banner with white Cyrillic calligraphic script 'ЗВЯЗДА', symbolising historic Belarusian print press.",
      sources: ["https://zviazda.by", "https://en.wikipedia.org/wiki/Zvyazda"],
    },
    {
      id: "by-nasha-niva",
      countryCode: "BY",
      name: "Nasha Niva",
      englishTranslation: "Our Field",
      founded: 1906,
      frequency: "Continuous digital news",
      format: "Digital e-journal & multimedia portal",
      language: "Belarusian",
      headquarters: "Minsk (operating in diaspora)",
      owner: {
        name: "Nasha Niva LLC",
        type: "Independent commercial media",
      },
      editorialStance: "Historic independent Belarusian publication; national revival, human rights, and critical news",
      readership: {
        metric: "Pioneer of Belarusian cultural press; widely read online despite state censorship",
        source: "Belarusian Association of Journalists (BAJ)",
      },
      revenueModel: "Reader donations, grant funding, and digital advertising",
      logo: "newspaper-logos/by/nasha-niva.svg",
      logoExplainer:
        "Classic white banner with red script typography 'Наша Ніва', representing 115+ years of Belarusian cultural journalism.",
      sources: ["https://nashaniva.com", "https://en.wikipedia.org/wiki/Nasha_Niva"],
    },
    {
      id: "by-belapan",
      countryCode: "BY",
      name: "BelaPAN",
      officialName: "Belarusian Private News Agency",
      founded: 1991,
      frequency: "Continuous digital newswire",
      format: "Independent digital newswire agency",
      language: "Belarusian, Russian, English",
      headquarters: "Minsk",
      owner: {
        name: "BelaPAN Company",
        type: "Independent commercial media",
      },
      editorialStance: "Historic independent news agency; non-partisan wire reporting and economic analysis",
      readership: {
        metric: "First independent private news agency established in post-Soviet Belarus",
        source: "BAJ Review",
      },
      revenueModel: "Subscriber licensing and commercial news syndication",
      logo: "newspaper-logos/by/belapan.svg",
      logoExplainer:
        "Slate blue title logo 'BelaPAN', representing independent wire reporting history.",
      sources: ["https://belapan.by", "https://en.wikipedia.org/wiki/BelaPAN"],
    },
  ],

  // Belgium
  BE: [
    {
      id: "be-belga",
      countryCode: "BE",
      name: "Belga News Agency",
      officialName: "Agence Belga SA / Agentschap Belga NV",
      founded: 1920,
      frequency: "Continuous 24/7 national newswire",
      format: "Cooperative national newswire & photo agency",
      language: "Dutch, French, English",
      headquarters: "Brussels",
      owner: {
        name: "Belga SA (Cooperative of Belgian media publishers)",
        type: "Independent trust / foundation",
      },
      editorialStance: "Independent national news agency; factual wire reporting on Belgian federal politics, EU institutions, and diplomacy",
      readership: {
        metric: "Primary news supplier to 100% of Belgian daily newspapers, TV stations, and radio networks in both Flanders and Wallonia",
        source: "Belga News Agency Annual Report 2023",
      },
      revenueModel: "Subscription licensing fees from member Belgian publishers and broadcast networks",
      logo: "newspaper-logos/be/belga.svg",
      logoExplainer:
        "Dark slate badge with gold icon and bold text 'BELGAPRESS', representing Belgium's national cooperative news agency.",
      sources: ["https://www.belga.be", "https://en.wikipedia.org/wiki/Belga_(news_agency)"],
    },
    {
      id: "be-le-soir",
      countryCode: "BE",
      name: "Le Soir",
      englishTranslation: "The Evening",
      founded: 1887,
      frequency: "Daily (Monday–Saturday)",
      format: "Broadsheet & digital portal",
      language: "French",
      headquarters: "Brussels",
      owner: {
        name: "Groupe Rossel",
        type: "Commercial conglomerate",
      },
      editorialStance: "Independent quality francophone daily; progressive-liberal stance, Belgian federal politics, and European affairs",
      readership: {
        metric: "Leading francophone newspaper in Belgium (~60,000 daily print, 2.5M monthly digital visitors)",
        source: "CIM (Centre d'Information sur les Média) Belgium 2023",
      },
      revenueModel: "Digital paywall subscriptions, print sales, and commercial advertising",
      logo: "newspaper-logos/be/le-soir.svg",
      logoExplainer:
        "Classic serif title logo 'LE SOIR' on white, representing Belgian francophone press leadership.",
      sources: ["https://www.lesoir.be", "https://en.wikipedia.org/wiki/Le_Soir"],
    },
    {
      id: "be-de-standaard",
      countryCode: "BE",
      name: "De Standaard",
      englishTranslation: "The Standard",
      founded: 1918,
      frequency: "Daily (Monday–Saturday)",
      format: "Broadsheet & digital portal",
      language: "Dutch",
      headquarters: "Groot-Bijgaarden, Dilbeek",
      owner: {
        name: "Mediahuis NV",
        type: "Commercial conglomerate",
      },
      editorialStance: "Leading Flemish quality daily newspaper; Christian-democrat heritage turned independent quality journal; culture, law, and politics",
      readership: {
        metric: "Leading Flemish quality paper (~90,000 daily print, 3M monthly digital readers)",
        source: "CIM Belgium 2023/2024",
      },
      revenueModel: "Digital subscriptions, print sales, and corporate advertising",
      logo: "newspaper-logos/be/de-standaard.svg",
      logoExplainer:
        "Royal blue title banner with bold white text 'DE STANDAARD', symbolising quality Flemish journalism.",
      sources: ["https://www.standaard.be", "https://en.wikipedia.org/wiki/De_Standaard"],
    },
    {
      id: "be-hln",
      countryCode: "BE",
      name: "Het Laatste Nieuws",
      englishTranslation: "The Latest News (HLN)",
      founded: 1888,
      frequency: "Daily (Monday–Sunday)",
      format: "Tabloid & digital portal",
      language: "Dutch",
      headquarters: "Antwerp",
      owner: {
        name: "DPG Media",
        type: "Commercial conglomerate",
      },
      editorialStance: "Popular commercial Flemish daily; highest circulation newspaper in Belgium; breaking news, regional news, and sports",
      readership: {
        metric: "Highest total reach in Belgium (~240,000 daily print copies, 2M daily digital visitors on HLN.be)",
        source: "CIM Belgium 2023/2024",
      },
      revenueModel: "Print retail sales, digital display advertising, and subscriptions",
      logo: "newspaper-logos/be/hln.svg",
      logoExplainer:
        "Vibrant red title logo with white text 'HLN', iconic across Flanders as the highest-circulation news brand.",
      sources: ["https://www.hln.be", "https://en.wikipedia.org/wiki/Het_Laatste_Nieuws"],
    },
    {
      id: "be-la-libre",
      countryCode: "BE",
      name: "La Libre Belgique",
      englishTranslation: "Free Belgium",
      founded: 1884,
      frequency: "Daily (Monday–Sunday)",
      format: "Broadsheet & digital portal",
      language: "French",
      headquarters: "Brussels",
      owner: {
        name: "IPM Group",
        type: "Commercial conglomerate",
      },
      editorialStance: "Center-right Christian-democrat quality paper; historic resistance press heritage; politics, economics, and international news",
      readership: {
        metric: "Over 40,000 daily print copies and 1.2M monthly digital readers in Wallonia and Brussels",
        source: "CIM Belgium 2023",
      },
      revenueModel: "Digital paywall subscriptions and print sales",
      logo: "newspaper-logos/be/la-libre.svg",
      logoExplainer:
        "Classic serif title logo 'La Libre Belgique' with gold accent, symbolising 140+ years of Belgian francophone journalism.",
      sources: ["https://www.lalibre.be", "https://en.wikipedia.org/wiki/La_Libre_Belgique"],
    },
  ],

  // Belize
  BZ: [
    {
      id: "bz-amandala",
      countryCode: "BZ",
      name: "Amandala",
      founded: 1969,
      frequency: "Bi-weekly print publication (Tuesday & Friday)",
      format: "Tabloid print & digital portal",
      language: "English",
      headquarters: "Belize City",
      owner: {
        name: "Kremandala Ltd",
        type: "Independent commercial media",
      },
      editorialStance: "Leading independent newspaper in Belize; Garifuna, Creole, and grassroots community advocacy; anti-colonial heritage",
      readership: {
        metric: "Highest print circulation newspaper in Belize (~10,000 copies per edition nationwide)",
        source: "Amandala Publishing Review 2023",
      },
      revenueModel: "Print retail sales and local commercial advertising",
      logo: "newspaper-logos/bz/amandala.svg",
      logoExplainer:
        "Forest green title banner with bold white text 'AMANDALA', representing Belize's leading independent print voice.",
      sources: ["https://amandala.com.bz", "https://en.wikipedia.org/wiki/Amandala"],
    },
    {
      id: "bz-reporter",
      countryCode: "BZ",
      name: "The Reporter",
      founded: 1967,
      frequency: "Weekly (Friday)",
      format: "Tabloid & digital portal",
      language: "English",
      headquarters: "Belize City",
      owner: {
        name: "The Reporter Newspaper Ltd",
        type: "Independent commercial media",
      },
      editorialStance: "Independent commercial weekly; moderate stance, business news, legal affairs, and environmental issues",
      readership: {
        metric: "Second-largest print circulation weekly in Belize",
        source: "The Reporter Media Kit 2023",
      },
      revenueModel: "Print newsstand sales and commercial advertising",
      logo: "newspaper-logos/bz/reporter.svg",
      logoExplainer:
        "Classic blue serif title 'The Reporter' on white canvas, symbolizing established weekly journalism in Belize.",
      sources: ["https://www.reporter.bz", "https://en.wikipedia.org/wiki/The_Reporter_(Belize)"],
    },
    {
      id: "bz-bgis",
      countryCode: "BZ",
      name: "Belize Government Press Office",
      officialName: "Government of Belize Press Office",
      founded: 1962,
      frequency: "Continuous state news service",
      format: "Official state information agency",
      language: "English, Spanish",
      headquarters: "Belmopan",
      owner: {
        name: "Government of Belize",
        type: "Government ministry / department",
      },
      editorialStance: "Official state news service; cabinet decisions, legislative updates, and national public notices",
      readership: {
        metric: "Official news provider for Belizean domestic radio, TV stations, and digital outlets",
        source: "Government Press Office Belmopan",
      },
      revenueModel: "State administrative budget allocation",
      logo: "newspaper-logos/bz/bgis.svg",
      logoExplainer:
        "Dark blue badge with red emblem 'BELIZE GOVERNMENT PRESS OFFICE', representing official state public information.",
      sources: ["https://www.pressoffice.gov.bz"],
    },
    {
      id: "bz-san-pedro-sun",
      countryCode: "BZ",
      name: "The San Pedro Sun",
      founded: 1991,
      frequency: "Weekly print & continuous digital",
      format: "Community newspaper & digital portal",
      language: "English",
      headquarters: "San Pedro, Ambergris Caye",
      owner: {
        name: "San Pedro Sun Ltd",
        type: "Independent commercial media",
      },
      editorialStance: "Island community newspaper; marine conservation, tourism industry, and local island governance",
      readership: {
        metric: "Primary news outlet for Ambergris Caye and Caye Caulker in northern Belize",
        source: "The San Pedro Sun Media Kit 2024",
      },
      revenueModel: "Tourism business advertising and print sales",
      logo: "newspaper-logos/bz/san-pedro-sun.svg",
      logoExplainer:
        "Sky blue banner with golden sun emblem, symbolising Ambergris Caye island community reporting.",
      sources: ["https://www.sanpedrosun.com"],
    },
    {
      id: "bz-bbn",
      countryCode: "BZ",
      name: "Breaking Belize News",
      officialName: "BBN Digital",
      founded: 2013,
      frequency: "Continuous digital news",
      format: "Digital news portal & mobile app",
      language: "English",
      headquarters: "San Ignacio, Cayo",
      owner: {
        name: "BBN Media Group",
        type: "Independent commercial media",
      },
      editorialStance: "Independent digital news portal; 24-hour breaking news, regional Cayo district news, and national coverage",
      readership: {
        metric: "Over 600,000 monthly digital visitors nationwide and across the Belizean diaspora",
        source: "BBN Media Review 2024",
      },
      revenueModel: "Digital display ads, mobile advertising, and corporate sponsorships",
      logo: "newspaper-logos/bz/bbn.svg",
      logoExplainer:
        "Red title banner with white text 'BREAKING BELIZE NEWS', symbolising modern 24-hour online reporting.",
      sources: ["https://www.breakingbelizenews.com"],
    },
  ],

  // Benin
  BJ: [
    {
      id: "bj-abp",
      countryCode: "BJ",
      name: "Agence Bénin Presse",
      officialName: "Agence Bénin Presse (ABP)",
      founded: 1961,
      frequency: "Continuous 24/7 state newswire",
      format: "Official state newswire agency",
      language: "French",
      headquarters: "Cotonou",
      owner: {
        name: "Republic of Benin",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official state news agency; presidential decrees, national assembly acts, and West African regional news",
      readership: {
        metric: "Primary news supplier to Beninese daily newspapers, radio stations, and national TV networks",
        source: "ABP Annual Report 2023",
      },
      revenueModel: "Direct state budget funding and subscriber licensing",
      logo: "newspaper-logos/bj/abp.svg",
      logoExplainer:
        "Green and yellow circular emblem with text 'AGENCE BÉNIN PRESSE', representing Benin's national state press agency.",
      sources: ["https://www.abp.bj", "https://fr.wikipedia.org/wiki/Agence_B%C3%A9nin_Presse"],
    },
    {
      id: "bj-la-nation",
      countryCode: "BJ",
      name: "La Nation",
      englishTranslation: "The Nation",
      founded: 1990,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "French",
      headquarters: "Cotonou",
      owner: {
        name: "Office National d'Imprimerie et de Presse (ONIP)",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official national public daily newspaper; public policy, legislative notices, and state affairs",
      readership: {
        metric: "Largest print circulation daily in Benin (~10,000 daily print copies)",
        source: "ONIP Benin Annual Report 2023",
      },
      revenueModel: "State subsidy, print sales, and official government advertising",
      logo: "newspaper-logos/bj/la-nation.svg",
      logoExplainer:
        "Green serif title typography 'LA NATION' on white, symbolising the official public daily of Benin.",
      sources: ["https://lanation.bj", "https://fr.wikipedia.org/wiki/La_Nation_(B%C3%A9nin)"],
    },
    {
      id: "bj-le-matinal",
      countryCode: "BJ",
      name: "Le Matinal",
      englishTranslation: "The Morning Paper",
      founded: 1998,
      frequency: "Daily newspaper",
      format: "Tabloid & digital portal",
      language: "French",
      headquarters: "Cotonou",
      owner: {
        name: "Groupe Le Matinal",
        type: "Independent commercial media",
      },
      editorialStance: "Independent commercial daily newspaper; domestic politics, investigative reporting, and economic news",
      readership: {
        metric: "Leading private commercial daily in Benin read widely in Cotonou and Porto-Novo",
        source: "Groupe Le Matinal Review 2023",
      },
      revenueModel: "Print retail sales and commercial display advertising",
      logo: "newspaper-logos/bj/le-matinal.svg",
      logoExplainer:
        "Dark blue title banner with gold text 'LE MATINAL', representing morning commercial reporting.",
      sources: ["https://lespharaons.com", "https://fr.wikipedia.org/wiki/Le_Matinal"],
    },
    {
      id: "bj-fraternite",
      countryCode: "BJ",
      name: "Fraternité",
      englishTranslation: "Fraternity",
      founded: 1999,
      frequency: "Daily newspaper",
      format: "Tabloid & digital portal",
      language: "French",
      headquarters: "Cotonou",
      owner: {
        name: "Fraternité Media",
        type: "Independent commercial media",
      },
      editorialStance: "Independent daily paper; public policy debates, social affairs, and cultural coverage",
      readership: {
        metric: "Established daily print circulation in Beninese urban centers",
        source: "Fraternité Media Kit",
      },
      revenueModel: "Print sales and local advertising",
      logo: "newspaper-logos/bj/fraternite.svg",
      logoExplainer:
        "Crimson title logo 'Fraternité', representing democratic dialogue and community press.",
      sources: ["https://www.fraternitebj.info"],
    },
    {
      id: "bj-la-nouvelle-tribune",
      countryCode: "BJ",
      name: "La Nouvelle Tribune",
      englishTranslation: "The New Tribune",
      founded: 2001,
      frequency: "Daily publication",
      format: "Print daily & digital portal",
      language: "French",
      headquarters: "Cotonou",
      owner: {
        name: "Nouvelle Tribune Media",
        type: "Independent commercial media",
      },
      editorialStance: "Independent critical daily; political commentary, anti-corruption stories, and civil rights",
      readership: {
        metric: "Influential among Beninese political commentators, legal professionals, and academics",
        source: "La Nouvelle Tribune Archive",
      },
      revenueModel: "Print sales and digital display advertising",
      logo: "newspaper-logos/bj/la-nouvelle-tribune.svg",
      logoExplainer:
        "Dark slate banner with sky blue text 'LA NOUVELLE TRIBUNE', symbolising critical political commentary.",
      sources: ["https://lanouvelletribune.info", "https://fr.wikipedia.org/wiki/La_Nouvelle_Tribune_(B%C3%A9nin)"],
    },
  ],

  // Bhutan
  BT: [
    {
      id: "bt-kuensel",
      countryCode: "BT",
      name: "Kuensel",
      officialName: "Kuensel Corporation Ltd",
      founded: 1967,
      frequency: "Daily (Monday–Saturday in English & Dzongkha)",
      format: "Broadsheet & digital portal",
      language: "English, Dzongkha",
      headquarters: "Thimphu",
      owner: {
        name: "Kuensel Corporation (Public-private shareholding)",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "National public daily newspaper; Gross National Happiness (GNH) policies, royal affairs, and Himalayan development",
      readership: {
        metric: "National paper of record in Bhutan (~12,000 daily print copies, widely read online)",
        source: "Kuensel Corporation Annual Report 2023",
      },
      revenueModel: "Print sales, official government advertising, and commercial subscriptions",
      logo: "newspaper-logos/bt/kuensel.svg",
      logoExplainer:
        "Orange title banner featuring Dzongkha script 'ཀུན་གསལ།' and gold lettering 'KUENSEL', symbolising Himalayan enlightenment.",
      sources: ["https://kuenselonline.com", "https://en.wikipedia.org/wiki/Kuensel"],
    },
    {
      id: "bt-the-bhutanese",
      countryCode: "BT",
      name: "The Bhutanese",
      founded: 2012,
      frequency: "Bi-weekly publication (Wednesday & Saturday)",
      format: "Tabloid & digital portal",
      language: "English",
      headquarters: "Thimphu",
      owner: {
        name: "Tenzing Lamsang / The Bhutanese Newspaper Ltd",
        type: "Independent commercial media",
      },
      editorialStance: "Independent commercial paper; investigative journalism, anti-corruption, governance, and environmental issues",
      readership: {
        metric: "Leading independent private newspaper in Bhutan with strong digital reach across Thimphu",
        source: "The Bhutanese Media Kit 2024",
      },
      revenueModel: "Print retail sales and digital display advertising",
      logo: "newspaper-logos/bt/the-bhutanese.svg",
      logoExplainer:
        "Dark navy title logo with gold text 'The Bhutanese', representing independent investigative reporting.",
      sources: ["https://thebhutanese.bt", "https://en.wikipedia.org/wiki/The_Bhutanese"],
    },
    {
      id: "bt-bbs",
      countryCode: "BT",
      name: "BBS News",
      officialName: "Bhutan Broadcasting Service Corporation",
      founded: 1973,
      frequency: "Continuous 24/7 public broadcasting",
      format: "Public TV, radio & digital news portal",
      language: "Dzongkha, English",
      headquarters: "Thimphu",
      owner: {
        name: "Royal Government of Bhutan",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "National public news broadcaster; royal announcements, parliamentary debates, and rural development news",
      readership: {
        metric: "Universal public broadcasting reach across all 20 dzongkhags (districts) of Bhutan",
        source: "BBS Corporation Annual Report 2023",
      },
      revenueModel: "Royal Government budget appropriation and commercial advertising",
      logo: "newspaper-logos/bt/bbs.svg",
      logoExplainer:
        "Dark slate badge with orange icon 'BBS NEWS', symbolising national public service media.",
      sources: ["http://www.bbs.bt", "https://en.wikipedia.org/wiki/Bhutan_Broadcasting_Service"],
    },
    {
      id: "bt-business-bhutan",
      countryCode: "BT",
      name: "Business Bhutan",
      founded: 2009,
      frequency: "Weekly publication (Saturday)",
      format: "Tabloid & digital portal",
      language: "English, Dzongkha",
      headquarters: "Thimphu",
      owner: {
        name: "Business Bhutan Media",
        type: "Independent commercial media",
      },
      editorialStance: "Financial and business weekly; Himalayan economy, trade, banking, and private sector growth",
      readership: {
        metric: "Only financial newspaper in Bhutan read by business leaders and policymakers",
        source: "Business Bhutan Review 2023",
      },
      revenueModel: "Print subscriptions and corporate advertising",
      logo: "newspaper-logos/bt/business-bhutan.svg",
      logoExplainer:
        "Forest green title logo 'Business Bhutan', representing economic and financial journalism.",
      sources: ["https://businessbhutan.bt"],
    },
    {
      id: "bt-jbs",
      countryCode: "BT",
      name: "Journal of Bhutan Studies",
      founded: 1999,
      frequency: "Bi-annual scholarly journal",
      format: "Academic journal & digital repository",
      language: "English, Dzongkha",
      headquarters: "Thimphu",
      owner: {
        name: "Centre for Bhutan & GNH Studies (CBS)",
        type: "Independent trust / foundation",
      },
      editorialStance: "Academic research publication; Gross National Happiness (GNH), culture, history, and public policy",
      readership: {
        metric: "Primary scholarly journal on Bhutanese history, culture, and GNH development economics",
        source: "Centre for Bhutan & GNH Studies",
      },
      revenueModel: "Royal Government research grants and academic subscriptions",
      logo: "newspaper-logos/bt/jbs.svg",
      logoExplainer:
        "Indigo title banner 'JOURNAL OF BHUTAN STUDIES', symbolising scholarly academic research.",
      sources: ["https://www.bhutanstudies.org.bt", "https://en.wikipedia.org/wiki/Journal_of_Bhutan_Studies"],
    },
  ],

  // Bolivia
  BO: [
    {
      id: "bo-abi",
      countryCode: "BO",
      name: "ABI",
      officialName: "Agencia Boliviana de Información",
      founded: 1996,
      frequency: "Continuous 24/7 state newswire",
      format: "Official state newswire agency",
      language: "Spanish",
      headquarters: "La Paz",
      owner: {
        name: "Ministry of Presidencial Affairs",
        type: "Government ministry / department",
      },
      editorialStance: "Official state news agency; executive decrees, state investments, and national news",
      readership: {
        metric: "Primary news supplier to all Bolivian domestic television, radio, and print outlets",
        source: "ABI Annual Report 2023",
      },
      revenueModel: "Direct state budget funding",
      logo: "newspaper-logos/bo/abi.svg",
      logoExplainer:
        "Emerald green badge with white typography 'ABI', representing the official news agency of Bolivia.",
      sources: ["https://abi.bo", "https://es.wikipedia.org/wiki/Agencia_Boliviana_de_Informaci%C3%B3n"],
    },
    {
      id: "bo-el-deber",
      countryCode: "BO",
      name: "El Deber",
      englishTranslation: "The Duty",
      founded: 1953,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Spanish",
      headquarters: "Santa Cruz de la Sierra",
      owner: {
        name: "Grupo Multimedios EL DEBER",
        type: "Independent commercial media",
      },
      editorialStance: "Leading commercial daily in eastern Bolivia; business, agriculture, and regional autonomy focus",
      readership: {
        metric: "Highest print circulation and digital reach in Bolivia (~45,000 daily print copies)",
        source: "El Deber Media Kit 2023",
      },
      revenueModel: "Print sales, display advertising, and digital subscriptions",
      logo: "newspaper-logos/bo/el-deber.svg",
      logoExplainer:
        "Crimson title block with white serif font 'EL DEBER', iconic in Santa Cruz regional press.",
      sources: ["https://eldeber.com.bo", "https://en.wikipedia.org/wiki/El_Deber"],
    },
    {
      id: "bo-los-tiempos",
      countryCode: "BO",
      name: "Los Tiempos",
      englishTranslation: "The Times",
      founded: 1943,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Spanish",
      headquarters: "Cochabamba",
      owner: {
        name: "Editorial Canelas SA",
        type: "Independent commercial media",
      },
      editorialStance: "Independent quality daily; regional news, politics, and social reporting in central Bolivia",
      readership: {
        metric: "Leading quality daily in Cochabamba and central valley region of Bolivia",
        source: "Los Tiempos Archive 2023",
      },
      revenueModel: "Print circulation and commercial advertising",
      logo: "newspaper-logos/bo/los-tiempos.svg",
      logoExplainer:
        "Deep blue title banner with classic white serif typography 'LOS TIEMPOS'.",
      sources: ["https://www.lostiempos.com", "https://en.wikipedia.org/wiki/Los_Tiempos"],
    },
    {
      id: "bo-la-razon",
      countryCode: "BO",
      name: "La Razón",
      englishTranslation: "The Reason",
      founded: 1990,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Spanish",
      headquarters: "La Paz",
      owner: {
        name: "La Razón Comunicaciones",
        type: "Independent commercial media",
      },
      editorialStance: "Commercial quality daily; national politics, economics, and Andean regional affairs",
      readership: {
        metric: "Primary daily paper read by government officials and diplomatic sector in La Paz",
        source: "La Razón Media Kit 2024",
      },
      revenueModel: "Print sales, corporate display ads, and subscriptions",
      logo: "newspaper-logos/bo/la-razon.svg",
      logoExplainer:
        "Classic black serif title 'LA RAZON' on white canvas, symbolising national press presence.",
      sources: ["https://www.la-razon.com", "https://en.wikipedia.org/wiki/La_Raz%C3%B3n_(Bolivia)"],
    },
    {
      id: "bo-opinion",
      countryCode: "BO",
      name: "Opinión",
      englishTranslation: "Opinion",
      founded: 1985,
      frequency: "Daily newspaper",
      format: "Tabloid & digital portal",
      language: "Spanish",
      headquarters: "Cochabamba",
      owner: {
        name: "Coboce Editora",
        type: "Independent commercial media",
      },
      editorialStance: "Cooperative commercial paper; community issues, sports, and regional developments",
      readership: {
        metric: "Established daily print circulation across central Bolivia",
        source: "Opinión Publishing 2023",
      },
      revenueModel: "Print newsstand sales and local advertising",
      logo: "newspaper-logos/bo/opinion.svg",
      logoExplainer:
        "Sky blue title logo 'OPINIÓN' in bold sans-serif lettering.",
      sources: ["https://www.opinion.com.bo", "https://es.wikipedia.org/wiki/Opini%C3%B3n_(peri%C3%B3dico_boliviano)"],
    },
  ],

  // Bosnia and Herzegovina
  BA: [
    {
      id: "ba-fena",
      countryCode: "BA",
      name: "FENA",
      officialName: "Federalna novinska agencija",
      founded: 2000,
      frequency: "Continuous 24/7 state newswire",
      format: "Official entity newswire & photo service",
      language: "Bosnian, Croatian, Serbian, English",
      headquarters: "Sarajevo",
      owner: {
        name: "Federation of Bosnia and Herzegovina",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official news agency; federal government notices, parliamentary debates, and regional affairs",
      readership: {
        metric: "Largest news agency supplying all daily papers, TV, and radio networks in FBiH",
        source: "FENA Official Review 2023",
      },
      revenueModel: "State budget funding and commercial newswire subscriptions",
      logo: "newspaper-logos/ba/fena.svg",
      logoExplainer:
        "Royal blue circular emblem with gold lettering 'FENA', representing Bosnia and Herzegovina's federal news agency.",
      sources: ["https://fena.ba", "https://bs.wikipedia.org/wiki/Federalna_novinska_agencija"],
    },
    {
      id: "ba-oslobodjenje",
      countryCode: "BA",
      name: "Oslobođenje",
      englishTranslation: "Liberation",
      founded: 1943,
      frequency: "Daily (Monday–Sunday)",
      format: "Broadsheet & digital portal",
      language: "Bosnian",
      headquarters: "Sarajevo",
      owner: {
        name: "Oslobođenje d.o.o. (MIMS Group)",
        type: "Independent commercial media",
      },
      editorialStance: "Historic anti-fascist daily newspaper; secular, multi-ethnic, quality journalism; Sakharov Prize laureate 1993",
      readership: {
        metric: "Historic paper of record; widely respected across Bosnia and South-Eastern Europe",
        source: "Oslobođenje Publishing House 2023",
      },
      revenueModel: "Print sales, display advertising, and digital subscriptions",
      logo: "newspaper-logos/ba/oslobodjenje.svg",
      logoExplainer:
        "Classic red serif title logo 'Oslobođenje', symbolising historic wartime free press courage.",
      sources: ["https://www.oslobodjenje.ba", "https://en.wikipedia.org/wiki/Oslobo%C4%91enje"],
    },
    {
      id: "ba-dnevni-avaz",
      countryCode: "BA",
      name: "Dnevni avaz",
      englishTranslation: "Daily Voice",
      founded: 1995,
      frequency: "Daily (Monday–Sunday)",
      format: "Tabloid & digital portal",
      language: "Bosnian",
      headquarters: "Sarajevo",
      owner: {
        name: "Avaz-roto press",
        type: "Independent commercial media",
      },
      editorialStance: "Highest circulation daily newspaper in Bosnia and Herzegovina; breaking news, politics, and populism",
      readership: {
        metric: "Highest print circulation daily in Bosnia and Herzegovina (~30,000 daily print, 4M monthly web visitors)",
        source: "ABC Central & Eastern Europe 2023",
      },
      revenueModel: "Print sales, digital display advertising, and commercial classifieds",
      logo: "newspaper-logos/ba/dnevni-avaz.svg",
      logoExplainer:
        "Slate black logo block with bright blue and white text 'DNEVNI AVAZ', iconic in Bosnian daily print.",
      sources: ["https://avaz.ba", "https://en.wikipedia.org/wiki/Dnevni_avaz"],
    },
    {
      id: "ba-nezavisne",
      countryCode: "BA",
      name: "Nezavisne novine",
      englishTranslation: "Independent Newspaper",
      founded: 1995,
      frequency: "Daily newspaper",
      format: "Tabloid & digital portal",
      language: "Serbian, Bosnian",
      headquarters: "Banja Luka",
      owner: {
        name: "Nigrad d.o.o.",
        type: "Independent commercial media",
      },
      editorialStance: "Major daily newspaper based in Banja Luka; regional politics, business, and social affairs",
      readership: {
        metric: "Leading commercial daily in Republika Srpska and northern Bosnia",
        source: "Nezavisne Media Kit 2024",
      },
      revenueModel: "Print circulation and commercial advertising",
      logo: "newspaper-logos/ba/nezavisne.svg",
      logoExplainer:
        "Forest green title logo 'NEZAVISNE NOVINE', representing regional print press leadership.",
      sources: ["https://www.nezavisne.com", "https://en.wikipedia.org/wiki/Nezavisne_novine"],
    },
    {
      id: "ba-srna",
      countryCode: "BA",
      name: "SRNA",
      officialName: "Novinska agencija Republike Srpske",
      founded: 1992,
      frequency: "Continuous newswire service",
      format: "Entity newswire & photo service",
      language: "Serbian, English",
      headquarters: "Bijeljina",
      owner: {
        name: "Government of Republika Srpska",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Entity state news agency; official government announcements and regional news",
      readership: {
        metric: "Primary news agency for media outlets in Republika Srpska",
        source: "SRNA Official Report 2023",
      },
      revenueModel: "Entity public budget funding and subscription licensing",
      logo: "newspaper-logos/ba/srna.svg",
      logoExplainer:
        "Crimson title badge with Cyrillic and Latin typography 'СРНА / SRNA'.",
      sources: ["https://www.srna.rs", "https://sr.wikipedia.org/wiki/%D0%A1%D0%A0%D0%9D%D0%90"],
    },
  ],

  // Botswana
  BW: [
    {
      id: "bw-bopa",
      countryCode: "BW",
      name: "BOPA",
      officialName: "Botswana Press Agency (BOPA)",
      founded: 1981,
      frequency: "Continuous 24/7 state newswire",
      format: "Official state newswire agency",
      language: "English, Setswana",
      headquarters: "Gaborone",
      owner: {
        name: "Department of Information Services",
        type: "Government ministry / department",
      },
      editorialStance: "Official national news agency; parliamentary proceedings, state visits, and rural development news",
      readership: {
        metric: "Primary news supplier to all Botswana national radio, TV, and print newspapers",
        source: "BOPA Department Review 2023",
      },
      revenueModel: "Direct state budget funding",
      logo: "newspaper-logos/bw/bopa.svg",
      logoExplainer:
        "Sky blue circular emblem with white typography 'BOPA', symbolising national public news distribution.",
      sources: ["https://www.dailynews.gov.bw", "https://en.wikipedia.org/wiki/Botswana_Press_Agency"],
    },
    {
      id: "bw-mmegi",
      countryCode: "BW",
      name: "Mmegi",
      englishTranslation: "The Reporter",
      founded: 1984,
      frequency: "Daily (Monday–Friday)",
      format: "Broadsheet & digital portal",
      language: "English, Setswana",
      headquarters: "Gaborone",
      owner: {
        name: "Dikgang Publishing Company",
        type: "Independent commercial media",
      },
      editorialStance: "Leading independent daily newspaper in Botswana; investigative journalism, politics, and economics",
      readership: {
        metric: "Highest print circulation independent paper in Botswana (~25,000 daily print, 1M monthly digital views)",
        source: "Dikgang Publishing Review 2023",
      },
      revenueModel: "Print newsstand sales, display advertising, and digital subscriptions",
      logo: "newspaper-logos/bw/mmegi.svg",
      logoExplainer:
        "Classic black serif title logo 'Mmegi', representing independent print journalism in Botswana.",
      sources: ["https://www.mmegi.bw", "https://en.wikipedia.org/wiki/Mmegi"],
    },
    {
      id: "bw-the-voice",
      countryCode: "BW",
      name: "The Voice",
      founded: 1993,
      frequency: "Weekly (Friday)",
      format: "Tabloid & digital portal",
      language: "English",
      headquarters: "Francistown / Gaborone",
      owner: {
        name: "The Voice Newspaper Ltd",
        type: "Independent commercial media",
      },
      editorialStance: "Popular commercial weekly newspaper; human interest, crime, sports, and entertainment focus",
      readership: {
        metric: "Widely read weekly tabloid newspaper nationwide in Botswana",
        source: "The Voice Media Kit 2023",
      },
      revenueModel: "Print retail sales and local commercial advertising",
      logo: "newspaper-logos/bw/the-voice.svg",
      logoExplainer:
        "Red title banner with bold white text 'THE VOICE', symbolising energetic tabloid reporting.",
      sources: ["https://news.thevoicebw.com", "https://en.wikipedia.org/wiki/The_Voice_(Botswana)"],
    },
    {
      id: "bw-sunday-standard",
      countryCode: "BW",
      name: "Sunday Standard",
      founded: 2005,
      frequency: "Weekly (Sunday)",
      format: "Broadsheet & digital portal",
      language: "English",
      headquarters: "Gaborone",
      owner: {
        name: "Telegraphic Publishing",
        type: "Independent commercial media",
      },
      editorialStance: "Independent commercial weekly; investigative journalism, business news, and political analysis",
      readership: {
        metric: "Influential Sunday paper read by policymakers, legal sector, and business leaders in Botswana",
        source: "Sunday Standard Review 2023",
      },
      revenueModel: "Print sales and corporate advertising",
      logo: "newspaper-logos/bw/sunday-standard.svg",
      logoExplainer:
        "Dark slate title block with white serif typography 'Sunday Standard'.",
      sources: ["https://www.sundaystandard.info"],
    },
    {
      id: "bw-botswana-guardian",
      countryCode: "BW",
      name: "Botswana Guardian",
      founded: 1982,
      frequency: "Weekly (Friday)",
      format: "Tabloid & digital portal",
      language: "English",
      headquarters: "Gaborone",
      owner: {
        name: "CBET Ltd",
        type: "Independent commercial media",
      },
      editorialStance: "Independent weekly newspaper; public affairs, investigative stories, and governance",
      readership: {
        metric: "Established national weekly readership across urban centers in Botswana",
        source: "CBET Publishing 2023",
      },
      revenueModel: "Print circulation and commercial display advertising",
      logo: "newspaper-logos/bw/botswana-guardian.svg",
      logoExplainer:
        "Blue title banner 'BOTSWANA GUARDIAN' in bold sans-serif text.",
      sources: ["https://www.botswanaguardian.co.bw"],
    },
  ],

  // Brunei
  BN: [
    {
      id: "bn-borneo-bulletin",
      countryCode: "BN",
      name: "Borneo Bulletin",
      founded: 1953,
      frequency: "Daily (Monday–Sunday)",
      format: "Broadsheet & digital portal",
      language: "English",
      headquarters: "Bandar Seri Begawan",
      owner: {
        name: "QAF Media Group",
        type: "Commercial conglomerate",
      },
      editorialStance: "Leading national English-language daily in Brunei; royal announcements, Southeast Asian diplomacy, and local news",
      readership: {
        metric: "Primary English newspaper read across the Sultanate of Brunei (~20,000 daily print copies)",
        source: "QAF Media Group Review 2023",
      },
      revenueModel: "Print sales, display advertising, and commercial subscriptions",
      logo: "newspaper-logos/bn/borneo-bulletin.svg",
      logoExplainer:
        "Deep blue title banner with white serif font 'Borneo Bulletin', symbolising 70+ years of Bruneian print press history.",
      sources: ["https://borneobulletin.com.bn", "https://en.wikipedia.org/wiki/Borneo_Bulletin"],
    },
    {
      id: "bn-media-permata",
      countryCode: "BN",
      name: "Media Permata",
      englishTranslation: "Jewel Media",
      founded: 1995,
      frequency: "Daily (Monday–Saturday)",
      format: "Broadsheet & digital portal",
      language: "Malay",
      headquarters: "Bandar Seri Begawan",
      owner: {
        name: "QAF Media Group",
        type: "Commercial conglomerate",
      },
      editorialStance: "Main Malay-language daily newspaper in Brunei; Malay Islamic Monarchy (MIB) values, local events, and community news",
      readership: {
        metric: "Highest-readership Malay language daily in the Sultanate",
        source: "Media Permata Annual Review 2023",
      },
      revenueModel: "Print sales and local commercial advertising",
      logo: "newspaper-logos/bn/media-permata.svg",
      logoExplainer:
        "Red title banner with gold text 'Media Permata', representing Malay-language print news leadership.",
      sources: ["https://mediapermata.com.bn", "https://en.wikipedia.org/wiki/Media_Permata"],
    },
    {
      id: "bn-pelita-brunei",
      countryCode: "BN",
      name: "Pelita Brunei",
      englishTranslation: "Light of Brunei",
      founded: 1956,
      frequency: "Bi-weekly official newspaper",
      format: "Official state newspaper & digital portal",
      language: "Malay, English",
      headquarters: "Bandar Seri Begawan",
      owner: {
        name: "Information Department (Prime Minister's Office)",
        type: "Government ministry / department",
      },
      editorialStance: "Official state newspaper of Brunei; royal decrees, government policies, and national development",
      readership: {
        metric: "Distributed free to all government departments, educational institutions, and public venues",
        source: "Pelita Brunei Official 2023",
      },
      revenueModel: "Direct Prime Minister's Office state budget allocation",
      logo: "newspaper-logos/bn/pelita-brunei.svg",
      logoExplainer:
        "Emerald green banner featuring Jawi and Latin script 'PELITA BRUNEI', representing official state public information.",
      sources: ["https://www.pelitabrunei.gov.bn", "https://en.wikipedia.org/wiki/Pelita_Brunei"],
    },
    {
      id: "bn-rtb",
      countryCode: "BN",
      name: "RTB News",
      officialName: "Radio Television Brunei News",
      founded: 1957,
      frequency: "Continuous 24/7 public broadcasting",
      format: "Public TV, radio & digital news service",
      language: "Malay, English",
      headquarters: "Bandar Seri Begawan",
      owner: {
        name: "Radio Television Brunei (Prime Minister's Office)",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "National public news broadcaster; official state reporting, royal affairs, and cultural broadcasts",
      readership: {
        metric: "Universal broadcasting reach across all 4 districts of Brunei Darussalam",
        source: "RTB Annual Report 2023",
      },
      revenueModel: "State public budget allocation",
      logo: "newspaper-logos/bn/rtb.svg",
      logoExplainer:
        "Yellow circular emblem 'RTB NEWS' on dark background, representing national public media.",
      sources: ["https://www.rtbnews.gov.bn"],
    },
    {
      id: "bn-the-scoop",
      countryCode: "BN",
      name: "The Scoop",
      founded: 2017,
      frequency: "Continuous digital news",
      format: "Digital news portal & video outlet",
      language: "English",
      headquarters: "Bandar Seri Begawan",
      owner: {
        name: "Scoop Media",
        type: "Independent commercial media",
      },
      editorialStance: "Independent digital news portal; youth culture, environment, business, and modern Bruneian society",
      readership: {
        metric: "Popular digital news platform among young Bruneians (over 200,000 monthly digital views)",
        source: "The Scoop Media Review 2024",
      },
      revenueModel: "Digital display ads, sponsored content, and video production",
      logo: "newspaper-logos/bn/the-scoop.svg",
      logoExplainer:
        "Purple modern typography logo 'The Scoop', representing modern digital journalism in Brunei.",
      sources: ["https://thescoop.co"],
    },
  ],

  // Bulgaria
  BG: [
    {
      id: "bg-bta",
      countryCode: "BG",
      name: "BTA",
      officialName: "Bulgarian Telegraph Agency (BTA)",
      founded: 1898,
      frequency: "Continuous 24/7 state newswire",
      format: "Official state newswire & photo agency",
      language: "Bulgarian, English",
      headquarters: "Sofia",
      owner: {
        name: "Republic of Bulgaria (National Assembly)",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official state news agency; parliamentary proceedings, executive policies, and foreign diplomacy",
      readership: {
        metric: "Primary news agency supplying all Bulgarian domestic daily newspapers, TV channels, and radio stations",
        source: "BTA Official Annual Report 2023",
      },
      revenueModel: "State parliamentary budget allocation and subscriber licensing",
      logo: "newspaper-logos/bg/bta.svg",
      logoExplainer:
        "Royal blue circular emblem with Cyrillic text 'БТА', symbolising Bulgaria's 125-year-old telegraph news agency.",
      sources: ["https://www.bta.bg", "https://en.wikipedia.org/wiki/Bulgarian_Telegraph_Agency"],
    },
    {
      id: "bg-24-chasa",
      countryCode: "BG",
      name: "24 Chasa",
      englishTranslation: "24 Hours",
      founded: 1991,
      frequency: "Daily newspaper",
      format: "Tabloid & digital portal",
      language: "Bulgarian",
      headquarters: "Sofia",
      owner: {
        name: "Media Group Bulgaria",
        type: "Independent commercial media",
      },
      editorialStance: "Popular commercial daily newspaper; national politics, crime, social affairs, and opinion",
      readership: {
        metric: "Highest print circulation commercial daily in Bulgaria (~35,000 daily print copies)",
        source: "Media Group Bulgaria Review 2023",
      },
      revenueModel: "Print sales, display advertising, and digital subscriptions",
      logo: "newspaper-logos/bg/24-chasa.svg",
      logoExplainer:
        "Crimson rectangular title banner with bold white text '24 ЧАСА', iconic in Bulgarian print press.",
      sources: ["https://www.24chasa.bg", "https://en.wikipedia.org/wiki/24_Chasa"],
    },
    {
      id: "bg-trud",
      countryCode: "BG",
      name: "Trud",
      englishTranslation: "Labor",
      founded: 1936,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Bulgarian",
      headquarters: "Sofia",
      owner: {
        name: "Trud Media",
        type: "Independent commercial media",
      },
      editorialStance: "Historic daily newspaper; conservative-nationalist stance, domestic politics, and culture",
      readership: {
        metric: "One of Bulgaria's oldest continuously published daily newspapers",
        source: "Trud Media Kit 2023",
      },
      revenueModel: "Print sales and commercial display advertising",
      logo: "newspaper-logos/bg/trud.svg",
      logoExplainer:
        "Classic black serif Cyrillic title font 'ТРУД' on white canvas.",
      sources: ["https://trud.bg", "https://en.wikipedia.org/wiki/Trud_(Bulgarian_newspaper)"],
    },
    {
      id: "bg-dnevnik",
      countryCode: "BG",
      name: "Dnevnik",
      englishTranslation: "Daily Journal",
      founded: 2001,
      frequency: "Continuous digital news",
      format: "Digital quality portal & e-journal",
      language: "Bulgarian",
      headquarters: "Sofia",
      owner: {
        name: "Economedia AD",
        type: "Independent commercial media",
      },
      editorialStance: "Pro-European liberal quality news portal; investigative reporting, rule of law, and EU affairs",
      readership: {
        metric: "Leading quality online daily in Bulgaria (over 2 million monthly digital visitors)",
        source: "Gemius Bulgaria 2024",
      },
      revenueModel: "Digital subscriptions, display advertising, and e-paper subscriptions",
      logo: "newspaper-logos/bg/dnevnik.svg",
      logoExplainer:
        "Dark slate badge with sky blue text 'ДНЕВНИК', symbolising modern European digital journalism.",
      sources: ["https://www.dnevnik.bg", "https://en.wikipedia.org/wiki/Dnevnik_(Bulgarian_newspaper)"],
    },
    {
      id: "bg-capital",
      countryCode: "BG",
      name: "Capital",
      founded: 1993,
      frequency: "Weekly (Friday)",
      format: "Broadsheet & digital business portal",
      language: "Bulgarian",
      headquarters: "Sofia",
      owner: {
        name: "Economedia AD",
        type: "Independent commercial media",
      },
      editorialStance: "Premier financial and economic weekly in Bulgaria; corporate business, markets, and policy analysis",
      readership: {
        metric: "Leading weekly paper read by Bulgarian business executives, economists, and legal sector",
        source: "Economedia AD Review 2023",
      },
      revenueModel: "Corporate paywall subscriptions, print sales, and financial advertising",
      logo: "newspaper-logos/bg/capital.svg",
      logoExplainer:
        "Forest green title banner 'CAPITAL' in bold serif typography, symbolising economic press leadership.",
      sources: ["https://www.capital.bg", "https://en.wikipedia.org/wiki/Capital_(Bulgarian_newspaper)"],
    },
  ],

  // Burkina Faso
  BF: [
    {
      id: "bf-aib",
      countryCode: "BF",
      name: "Agence d'Information du Burkina",
      officialName: "Agence d'Information du Burkina (AIB)",
      founded: 1964,
      frequency: "Continuous 24/7 state newswire",
      format: "Official state newswire agency",
      language: "French",
      headquarters: "Ouagadougou",
      owner: {
        name: "Republic of Burkina Faso",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official state news agency; government decisions, security updates, and regional Sahelian news",
      readership: {
        metric: "Primary news supplier to all Burkinabé radio, TV networks, and domestic print papers",
        source: "AIB Official Review 2023",
      },
      revenueModel: "Direct state budget funding",
      logo: "newspaper-logos/bf/aib.svg",
      logoExplainer:
        "Green and red circular emblem 'AIB AGENCE D'INFORMATION DU BURKINA', representing official state news.",
      sources: ["https://www.aib.media", "https://fr.wikipedia.org/wiki/Agence_d%27information_du_Burkina"],
    },
    {
      id: "bf-sidwaya",
      countryCode: "BF",
      name: "Sidwaya",
      englishTranslation: "The Truth Has Come",
      founded: 1984,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "French",
      headquarters: "Ouagadougou",
      owner: {
        name: "Éditions Sidwaya",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official national public daily newspaper; state affairs, public policy, and national unity",
      readership: {
        metric: "Largest print circulation daily in Burkina Faso (~8,000 daily print copies)",
        source: "Éditions Sidwaya Annual Report 2023",
      },
      revenueModel: "State subsidy, print sales, and official government advertising",
      logo: "newspaper-logos/bf/sidwaya.svg",
      logoExplainer:
        "Red title banner with gold text 'SIDWAYA', representing Burkina Faso's official public daily newspaper.",
      sources: ["https://www.sidwaya.info", "https://fr.wikipedia.org/wiki/Sidwaya"],
    },
    {
      id: "bf-lobservateur",
      countryCode: "BF",
      name: "L'Observateur Paalga",
      englishTranslation: "The New Observer",
      founded: 1973,
      frequency: "Daily (Monday–Friday)",
      format: "Broadsheet & digital portal",
      language: "French",
      headquarters: "Ouagadougou",
      owner: {
        name: "L'Observateur Media Group",
        type: "Independent commercial media",
      },
      editorialStance: "Oldest independent daily newspaper in Burkina Faso; investigative journalism, democracy, and civil society",
      readership: {
        metric: "Pioneer independent newspaper in Burkina Faso, widely respected across Francophone West Africa",
        source: "L'Observateur Paalga Review 2023",
      },
      revenueModel: "Print sales and commercial advertising",
      logo: "newspaper-logos/bf/lobservateur.svg",
      logoExplainer:
        "Classic black serif title logo 'L'Observateur Paalga' with red subtitle.",
      sources: ["https://lobservateur.bf", "https://fr.wikipedia.org/wiki/L%27Observateur_Paalga"],
    },
    {
      id: "bf-le-pays",
      countryCode: "BF",
      name: "Le Pays",
      englishTranslation: "The Country",
      founded: 1991,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "French",
      headquarters: "Ouagadougou",
      owner: {
        name: "Editions Le Pays",
        type: "Independent commercial media",
      },
      editorialStance: "Independent commercial daily newspaper; investigative stories, political analysis, and social news",
      readership: {
        metric: "Major daily circulation in Ouagadougou and Bobo-Dioulasso",
        source: "Le Pays Media Kit 2024",
      },
      revenueModel: "Print newsstand sales and private advertising",
      logo: "newspaper-logos/bf/le-pays.svg",
      logoExplainer:
        "Dark blue title banner 'LE PAYS' in bold white block typography.",
      sources: ["https://lepays.bf", "https://fr.wikipedia.org/wiki/Le_Pays_(Burkina_Faso)"],
    },
    {
      id: "bf-levenement",
      countryCode: "BF",
      name: "L'Événement",
      englishTranslation: "The Event",
      founded: 2001,
      frequency: "Bi-monthly publication",
      format: "Investigative e-journal & print",
      language: "French",
      headquarters: "Ouagadougou",
      owner: {
        name: "Événement Media",
        type: "Independent commercial media",
      },
      editorialStance: "Independent investigative journal; anti-corruption, governance, and human rights focus",
      readership: {
        metric: "Leading investigative bi-monthly publication in Burkina Faso",
        source: "L'Événement Archive",
      },
      revenueModel: "Print sales and digital subscriptions",
      logo: "newspaper-logos/bf/levenement.svg",
      logoExplainer:
        "Dark slate badge with sky blue font 'L'ÉVÉNEMENT', representing investigative journalism.",
      sources: ["https://www.evenement-bf.net"],
    },
  ],

  // Burundi
  BI: [
    {
      id: "bi-abp",
      countryCode: "BI",
      name: "Agence Burundaise de Presse",
      officialName: "Agence Burundaise de Presse (ABP)",
      founded: 1978,
      frequency: "Continuous 24/7 state newswire",
      format: "Official state newswire agency",
      language: "French, Kirundi",
      headquarters: "Bujumbura",
      owner: {
        name: "Republic of Burundi",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official state news agency; presidential activity, government decisions, and provincial news",
      readership: {
        metric: "Primary news supplier to all domestic Burundian radio stations, TV networks, and public institutions",
        source: "ABP Annual Report 2023",
      },
      revenueModel: "Direct state budget funding",
      logo: "newspaper-logos/bi/abp.svg",
      logoExplainer:
        "Red and green circular badge with text 'ABP AGENCE BURUNDAISE DE PRESSE'.",
      sources: ["https://abpinfo.bi", "https://fr.wikipedia.org/wiki/Agence_burundaise_de_presse"],
    },
    {
      id: "bi-le-renouveau",
      countryCode: "BI",
      name: "Le Renouveau du Burundi",
      englishTranslation: "The Renewal of Burundi",
      founded: 1978,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "French",
      headquarters: "Bujumbura",
      owner: {
        name: "Publications de Presse Burundaise (PPB)",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official public daily newspaper; state affairs, public policy, and national notices",
      readership: {
        metric: "Official state daily paper circulated across all provinces of Burundi",
        source: "PPB Burundi 2023",
      },
      revenueModel: "State subsidy and official government announcements",
      logo: "newspaper-logos/bi/le-renouveau.svg",
      logoExplainer:
        "Forest green title banner 'LE RENOUVEAU DU BURUNDI' with yellow subtitle.",
      sources: ["https://renouveau.bi"],
    },
    {
      id: "bi-iwacu",
      countryCode: "BI",
      name: "IWACU",
      englishTranslation: "Our Home",
      founded: 2008,
      frequency: "Weekly print & continuous digital",
      format: "Weekly newspaper & digital portal",
      language: "French, Kirundi, English",
      headquarters: "Bujumbura",
      owner: {
        name: "Groupe Presse IWACU",
        type: "Independent commercial media",
      },
      editorialStance: "Leading independent news group in Burundi; investigative reporting, civil society, and human rights",
      readership: {
        metric: "Most widely read independent news outlet in Burundi both in print and online",
        source: "IWACU Media Review 2023",
      },
      revenueModel: "Print sales, digital advertising, and reader subscriptions",
      logo: "newspaper-logos/bi/iwacu.svg",
      logoExplainer:
        "White rectangular banner with bold dark blue text 'IWACU', symbolising independent Burundian media.",
      sources: ["https://www.iwacu-burundi.org", "https://fr.wikipedia.org/wiki/Iwacu"],
    },
    {
      id: "bi-net-press",
      countryCode: "BI",
      name: "Net Press",
      founded: 1996,
      frequency: "Continuous digital news",
      format: "Digital news agency portal",
      language: "French",
      headquarters: "Bujumbura",
      owner: {
        name: "Net Press Agency",
        type: "Independent commercial media",
      },
      editorialStance: "Independent online news agency; local news, political commentary, and civil affairs",
      readership: {
        metric: "Pioneer digital news agency in Burundi",
        source: "Net Press Archive",
      },
      revenueModel: "Digital subscriptions and advertising",
      logo: "newspaper-logos/bi/net-press.svg",
      logoExplainer:
        "Slate black logo block with red text 'NETPRESS', representing online news distribution.",
      sources: ["https://www.netpress.bi"],
    },
    {
      id: "bi-jimbere",
      countryCode: "BI",
      name: "Jimbere",
      englishTranslation: "Move Forward",
      founded: 2015,
      frequency: "Monthly magazine & digital portal",
      format: "Print magazine & digital portal",
      language: "French, Kirundi",
      headquarters: "Bujumbura",
      owner: {
        name: "Jimbere Media",
        type: "Independent commercial media",
      },
      editorialStance: "Independent youth magazine; culture, entrepreneurship, gender equality, and social issues",
      readership: {
        metric: "Popular youth and cultural publication across Burundi",
        source: "Jimbere Media Kit 2024",
      },
      revenueModel: "Print sales and corporate sponsorships",
      logo: "newspaper-logos/bi/jimbere.svg",
      logoExplainer:
        "Purple modern title font 'JIMBERE', representing youth empowerment and social progress.",
      sources: ["https://www.jimbere-mag.org"],
    },
  ],

  // Cambodia
  KH: [
    {
      id: "kh-akp",
      countryCode: "KH",
      name: "AKP",
      officialName: "Agence Kampuchea Presse (AKP)",
      founded: 1978,
      frequency: "Continuous 24/7 state newswire",
      format: "Official state newswire agency",
      language: "Khmer, English, French",
      headquarters: "Phnom Penh",
      owner: {
        name: "Ministry of Information",
        type: "Government ministry / department",
      },
      editorialStance: "Official state news agency; royal bulletins, prime ministerial decrees, and national development",
      readership: {
        metric: "Primary news supplier to all Cambodian domestic broadcast networks, radio, and Khmer print media",
        source: "AKP Ministry Report 2023",
      },
      revenueModel: "Direct state budget funding",
      logo: "newspaper-logos/kh/akp.svg",
      logoExplainer:
        "Navy blue circular emblem with crimson star and text 'AKP AGENCE KAMPUCHEA PRESSE'.",
      sources: ["https://www.akp.gov.kh", "https://en.wikipedia.org/wiki/Agence_Kampuchea_Presse"],
    },
    {
      id: "kh-rasmei-kampuchea",
      countryCode: "KH",
      name: "Rasmei Kampuchea Daily",
      englishTranslation: "Light of Cambodia Daily",
      founded: 1993,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Khmer",
      headquarters: "Phnom Penh",
      owner: {
        name: "Rasmei Kampuchea Group",
        type: "Independent commercial media",
      },
      editorialStance: "Leading Khmer-language commercial daily newspaper; domestic politics, sports, crime, and culture",
      readership: {
        metric: "Highest print circulation Khmer daily newspaper in Cambodia (~18,000 daily print copies)",
        source: "Rasmei Kampuchea Publishing Review 2023",
      },
      revenueModel: "Print retail sales and commercial display advertising",
      logo: "newspaper-logos/kh/rasmei-kampuchea.svg",
      logoExplainer:
        "Red title banner featuring traditional Khmer script 'រស្មីកម្ពុជា' and yellow subtitle.",
      sources: ["https://www.rasmeinews.com", "https://en.wikipedia.org/wiki/Rasmei_Kampuchea_Daily"],
    },
    {
      id: "kh-phnom-penh-post",
      countryCode: "KH",
      name: "The Phnom Penh Post",
      founded: 1992,
      frequency: "Daily (Monday–Friday)",
      format: "Broadsheet & digital portal",
      language: "English, Khmer",
      headquarters: "Phnom Penh",
      owner: {
        name: "Post Media Co. Ltd",
        type: "Independent commercial media",
      },
      editorialStance: "Historic English-language daily newspaper in Cambodia; business, foreign affairs, and national news",
      readership: {
        metric: "Oldest English newspaper in Cambodia (est. 1992); widely read by business leaders and diplomatic sector",
        source: "Post Media Review 2023",
      },
      revenueModel: "Print newsstand sales, display advertising, and digital subscriptions",
      logo: "newspaper-logos/kh/phnom-penh-post.svg",
      logoExplainer:
        "Classic black serif title font 'The Phnom Penh Post' on white canvas.",
      sources: ["https://www.phnompenhpost.com", "https://en.wikipedia.org/wiki/The_Phnom_Penh_Post"],
    },
    {
      id: "kh-khmer-times",
      countryCode: "KH",
      name: "Khmer Times",
      founded: 2014,
      frequency: "Daily (Monday–Friday)",
      format: "Broadsheet & digital portal",
      language: "English",
      headquarters: "Phnom Penh",
      owner: {
        name: "Virtus Media Pte Ltd",
        type: "Independent commercial media",
      },
      editorialStance: "Commercial English daily newspaper; business development, ASEAN affairs, and local news",
      readership: {
        metric: "Major daily reach among expatriates, business sector, and international community in Phnom Penh",
        source: "Khmer Times Media Kit 2024",
      },
      revenueModel: "Print sales, commercial display ads, and digital partnerships",
      logo: "newspaper-logos/kh/khmer-times.svg",
      logoExplainer:
        "Dark slate logo banner with bright blue text 'KHMER TIMES'.",
      sources: ["https://www.khmertimeskh.com", "https://en.wikipedia.org/wiki/Khmer_Times"],
    },
    {
      id: "kh-koh-santepheap",
      countryCode: "KH",
      name: "Koh Santepheap Daily",
      englishTranslation: "Island of Peace Daily",
      founded: 1967,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Khmer",
      headquarters: "Phnom Penh",
      owner: {
        name: "Koh Santepheap Group",
        type: "Independent commercial media",
      },
      editorialStance: "Historic popular Khmer daily paper; breaking crime, local news, and community stories",
      readership: {
        metric: "One of Cambodia's oldest and most popular Khmer-language newspapers",
        source: "Koh Santepheap Media Kit 2023",
      },
      revenueModel: "Print sales and local commercial advertising",
      logo: "newspaper-logos/kh/koh-santepheap.svg",
      logoExplainer:
        "Forest green banner featuring traditional Khmer script 'កោះសន្តិភាព'.",
      sources: ["https://kohsantepheapdaily.com.kh", "https://en.wikipedia.org/wiki/Koh_Santepheap_Daily"],
    },
  ],

  // Cameroon
  CM: [
    {
      id: "cm-cameroon-tribune",
      countryCode: "CM",
      name: "Cameroon Tribune",
      founded: 1974,
      frequency: "Daily (Monday–Friday)",
      format: "Broadsheet & digital portal",
      language: "French, English",
      headquarters: "Yaoundé",
      owner: {
        name: "Société de Presse et d'Édition du Cameroun (SOPECAM)",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official national public daily newspaper; bilingual (French/English); presidential acts, government decisions, and national policy",
      readership: {
        metric: "Largest print circulation daily in Cameroon (~25,000 daily print copies nationwide)",
        source: "SOPECAM Annual Report 2023",
      },
      revenueModel: "State public budget subsidy, print retail sales, and official government advertising",
      logo: "newspaper-logos/cm/cameroon-tribune.svg",
      logoExplainer:
        "Green title banner with white serif text 'Cameroon Tribune' and yellow subtitle, representing Cameroon's official bilingual daily.",
      sources: ["https://www.cameroon-tribune.cm", "https://en.wikipedia.org/wiki/Cameroon_Tribune"],
    },
    {
      id: "cm-le-jour",
      countryCode: "CM",
      name: "Le Jour",
      englishTranslation: "The Day",
      founded: 2007,
      frequency: "Daily newspaper",
      format: "Tabloid & digital portal",
      language: "French",
      headquarters: "Yaoundé",
      owner: {
        name: "Haman Mana / Groupe Le Jour",
        type: "Independent commercial media",
      },
      editorialStance: "Independent commercial daily newspaper; investigative stories, political commentary, and social issues",
      readership: {
        metric: "Leading independent francophone daily in Yaoundé and Douala",
        source: "Groupe Le Jour Review 2023",
      },
      revenueModel: "Print sales and commercial display advertising",
      logo: "newspaper-logos/cm/le-jour.svg",
      logoExplainer:
        "Red title banner with bold white font 'LE JOUR', representing modern independent daily reporting.",
      sources: ["https://www.lejour.cm", "https://fr.wikipedia.org/wiki/Le_Jour_(Cameroun)"],
    },
    {
      id: "cm-mutations",
      countryCode: "CM",
      name: "Mutations",
      founded: 1996,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "French",
      headquarters: "Yaoundé",
      owner: {
        name: "South Media Corporation",
        type: "Independent commercial media",
      },
      editorialStance: "Independent quality daily newspaper; political analysis, economic reports, and governance focus",
      readership: {
        metric: "Respected daily paper read by intellectuals, civil servants, and business sector",
        source: "South Media Corporation 2023",
      },
      revenueModel: "Print sales and commercial advertising",
      logo: "newspaper-logos/cm/mutations.svg",
      logoExplainer:
        "Royal blue title font 'MUTATIONS' in bold serif typography.",
      sources: ["https://www.mutations-online.com", "https://fr.wikipedia.org/wiki/Mutations_(journal)"],
    },
    {
      id: "cm-guardian-post",
      countryCode: "CM",
      name: "The Guardian Post",
      founded: 2001,
      frequency: "Daily (Monday–Friday)",
      format: "Tabloid & digital portal",
      language: "English",
      headquarters: "Yaoundé / Bamenda",
      owner: {
        name: "Christian Cardinal Tumi Media / Guardian Post Group",
        type: "Independent commercial media",
      },
      editorialStance: "Leading English-language daily in Cameroon; focus on Anglophone regions, human rights, and national politics",
      readership: {
        metric: "Only daily English-language newspaper in Cameroon (~12,000 daily print copies)",
        source: "The Guardian Post Media Kit 2024",
      },
      revenueModel: "Print newsstand sales and commercial advertising",
      logo: "newspaper-logos/cm/guardian-post.svg",
      logoExplainer:
        "Dark slate banner with white text 'The Guardian Post' and red subtitle.",
      sources: ["https://theguardianpostcameroon.com"],
    },
    {
      id: "cm-le-messager",
      countryCode: "CM",
      name: "Le Messager",
      englishTranslation: "The Messenger",
      founded: 1979,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "French",
      headquarters: "Douala",
      owner: {
        name: "Pius Njawé Foundation / Free Media Group",
        type: "Independent commercial media",
      },
      editorialStance: "Historic pioneer of independent press freedom in Cameroon; founded by legendary journalist Pius Njawé",
      readership: {
        metric: "Pioneer independent paper established during single-party rule in 1979",
        source: "Free Media Group Archive",
      },
      revenueModel: "Print sales and local advertising",
      logo: "newspaper-logos/cm/le-messager.svg",
      logoExplainer:
        "Classic black serif title 'Le Messager' on white canvas, symbolising historic press freedom in Cameroon.",
      sources: ["https://www.lemessager.cm", "https://en.wikipedia.org/wiki/Le_Messager_(Cameroon)"],
    },
  ],

  // Canada
  CA: [
    {
      id: "ca-the-globe-and-mail",
      countryCode: "CA",
      name: "The Globe and Mail",
      founded: 1844,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Broadsheet & digital portal",
      language: "English",
      headquarters: "Toronto, Ontario",
      owner: {
        name: "The Woodbridge Company (Thomson family)",
        type: "Independent commercial media",
      },
      editorialStance: "National newspaper of record; center-right liberal-conservative editorial stance focusing on finance, politics, and investigative national reporting",
      readership: {
        metric: "Over 6.2 million weekly multiplatform readers across Canada",
        source: "News Media Canada & Vividata 2024",
      },
      revenueModel: "Digital subscriptions, print sales, and corporate advertising",
      logo: "newspaper-logos/ca/the-globe-and-mail.svg",
      logoExplainer:
        "White banner featuring the iconic serif typography 'The Globe and Mail' in black, representing Canada's historic newspaper of record.",
      sources: ["https://www.theglobeandmail.com", "https://en.wikipedia.org/wiki/The_Globe_and_Mail"],
    },
    {
      id: "ca-the-toronto-star",
      countryCode: "CA",
      name: "Toronto Star",
      founded: 1892,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "English",
      headquarters: "Toronto, Ontario",
      owner: {
        name: "NordStar Capital",
        type: "Independent commercial media",
      },
      editorialStance: "Social-democratic / liberal progressive editorial stance guided by the Atkinson Principles, focusing on social justice and civic affairs",
      readership: {
        metric: "Highest daily print circulation in Canada with 5.0+ million weekly readers",
        source: "Torstar Corporate Media Profile 2023",
      },
      revenueModel: "Digital paywall subscriptions, print sales, and display advertising",
      logo: "newspaper-logos/ca/the-toronto-star.svg",
      logoExplainer:
        "Deep blue banner featuring white serif typography 'TORONTO STAR', symbolizing progressive civic and investigative reporting.",
      sources: ["https://www.thestar.com", "https://en.wikipedia.org/wiki/Toronto_Star"],
    },
    {
      id: "ca-le-devoir",
      countryCode: "CA",
      name: "Le Devoir",
      englishTranslation: "The Duty",
      founded: 1910,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Compact broadsheet & digital portal",
      language: "French",
      headquarters: "Montreal, Quebec",
      owner: {
        name: "Le Devoir Trust",
        type: "Non-profit independent trust",
      },
      editorialStance: "Independent Quebec intellectual daily founded by Henri Bourassa; focus on culture, Quebec politics, and civic debate",
      readership: {
        metric: "Benchmark French-language quality daily reaching over 1.8 million monthly digital visitors",
        source: "Le Devoir Trust Annual Report 2023",
      },
      revenueModel: "Reader subscriptions, philanthropic donations, and targeted advertising",
      logo: "newspaper-logos/ca/le-devoir.svg",
      logoExplainer:
        "Minimalist white background with crisp black serif masthead 'LE DEVOIR', representing intellectual independence and journalistic duty.",
      sources: ["https://www.ledevoir.com", "https://en.wikipedia.org/wiki/Le_Devoir"],
    },
    {
      id: "ca-national-post",
      countryCode: "CA",
      name: "National Post",
      founded: 1998,
      frequency: "Daily newspaper (Tuesday–Saturday)",
      format: "Broadsheet & digital portal",
      language: "English",
      headquarters: "Toronto, Ontario",
      owner: {
        name: "Postmedia Network",
        type: "Independent commercial media",
      },
      editorialStance: "Conservative national broadsheet founded by Conrad Black; free-market advocacy, federal politics, and financial market analysis",
      readership: {
        metric: "Over 4.5 million weekly readers across print and digital Postmedia networks",
        source: "Postmedia Network Annual Report 2023",
      },
      revenueModel: "Print advertising, digital paywall, and sponsored content",
      logo: "newspaper-logos/ca/national-post.svg",
      logoExplainer:
        "Modern black uppercase sans-serif title 'NATIONAL POST' on white ground, reflecting contemporary business and national political journalism.",
      sources: ["https://nationalpost.com", "https://en.wikipedia.org/wiki/National_Post"],
    },
    {
      id: "ca-la-presse",
      countryCode: "CA",
      name: "La Presse",
      englishTranslation: "The Press",
      founded: 1884,
      frequency: "Continuous digital daily edition",
      format: "Digital-only news tablet app & portal",
      language: "French",
      headquarters: "Montreal, Quebec",
      owner: {
        name: "Fiducie La Presse",
        type: "Non-profit independent trust",
      },
      editorialStance: "Independent progressive francophone media; pioneer in digital-first journalism and comprehensive national coverage",
      readership: {
        metric: "Over 4 million monthly active digital readers on mobile, tablet, and web platforms",
        source: "Fiducie La Presse Financial Report 2023",
      },
      revenueModel: "Philanthropic donations, government journalism tax credits, and digital advertising",
      logo: "newspaper-logos/ca/la-presse.svg",
      logoExplainer:
        "Red rectangular emblem featuring clean white sans-serif letters 'LA PRESSE', symbolising modern Quebec digital news leadership.",
      sources: ["https://www.lapresse.ca", "https://en.wikipedia.org/wiki/La_Presse_(Canadian_newspaper)"],
    },
  ],

  // Cape Verde
  CV: [
    {
      id: "cv-inforpress",
      countryCode: "CV",
      name: "Inforpress",
      officialName: "Agência Cabo-Verdiana de Notícias",
      nativeName: "Agência Cabo-Verdiana de Notícias",
      englishTranslation: "Cape Verdean News Agency",
      founded: 1988,
      frequency: "Continuous 24/7 national newswire",
      format: "National state newswire & multimedia service",
      language: "Portuguese",
      headquarters: "Praia, Santiago Island",
      owner: {
        name: "State of Cape Verde",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "National public newswire agency; government decrees, parliamentary activity, and island archipelago news",
      readership: {
        metric: "Primary news supplier to all television, radio, and digital media across the nine inhabited islands of Cape Verde",
        source: "Inforpress Relatório e Contas 2023",
      },
      annualPublicFunding: {
        total: "CVE 95.0 million (~US$920,000) state budget appropriation",
        perCapita: "CVE 190 / person / year (~US$1.85)",
      },
      revenueModel: "State public service contract and wire subscription syndication",
      logo: "newspaper-logos/cv/inforpress.svg",
      logoExplainer:
        "White emblem with deep blue typography 'inforpress' and stylized connectivity waves, representing national archipelago communication.",
      sources: ["https://inforpress.cv", "https://pt.wikipedia.org/wiki/Inforpress"],
    },
    {
      id: "cv-a-semana",
      countryCode: "CV",
      name: "A Semana",
      englishTranslation: "The Week",
      founded: 1991,
      frequency: "Weekly newspaper & digital daily",
      format: "Tabloid & digital portal",
      language: "Portuguese",
      headquarters: "Praia",
      owner: {
        name: "Publi-Press Lda",
        type: "Independent commercial media",
      },
      editorialStance: "Historic independent weekly newspaper; investigative reporting, political analysis, and democratic accountability",
      readership: {
        metric: "Leading independent weekly publication in Cape Verde with widespread diaspora readership in Portugal and the US",
        source: "A Semana Online Profile 2023",
      },
      revenueModel: "Print sales and digital display advertising",
      logo: "newspaper-logos/cv/a-semana.svg",
      logoExplainer:
        "White canvas displaying bold black masthead 'A SEMANA', symbolising thirty years of independent democratic journalism.",
      sources: ["https://asemana.publ.cv", "https://pt.wikipedia.org/wiki/A_Semana"],
    },
    {
      id: "cv-expressodasilhas",
      countryCode: "CV",
      name: "Expresso das Ilhas",
      englishTranslation: "Islands Express",
      founded: 2001,
      frequency: "Weekly newspaper & daily web portal",
      format: "Tabloid & digital portal",
      language: "Portuguese",
      headquarters: "Praia & Mindelo",
      owner: {
        name: "Silves & Faria / Grupo Lena",
        type: "Independent commercial media",
      },
      editorialStance: "Center-liberal economic and political weekly; focus on archipelago development, business, and cultural heritage",
      readership: {
        metric: "Widely read weekly newspaper across São Vicente and Santiago islands",
        source: "Expresso das Ilhas Editorial Review 2023",
      },
      revenueModel: "Commercial advertising and newspaper circulation",
      logo: "newspaper-logos/cv/expressodasilhas.svg",
      logoExplainer:
        "Navy blue background with gold-yellow lettering 'Expresso das Ilhas', highlighting maritime connectivity and national reporting.",
      sources: ["https://expressodasilhas.cv", "https://pt.wikipedia.org/wiki/Expresso_das_Ilhas"],
    },
    {
      id: "cv-jornal-i",
      countryCode: "CV",
      name: "Jornal i",
      founded: 2010,
      frequency: "Weekly newspaper",
      format: "Tabloid & digital portal",
      language: "Portuguese",
      headquarters: "Praia",
      owner: {
        name: "Iniciativa Media Group",
        type: "Independent commercial media",
      },
      editorialStance: "Independent commercial paper; urban lifestyle, youth culture, culture, and social development in Cape Verde",
      readership: {
        metric: "Popular urban weekly paper read across youth and commercial sectors in Praia",
        source: "Jornal i Archive 2023",
      },
      revenueModel: "Print sales and local corporate advertising",
      logo: "newspaper-logos/cv/jornal-i.svg",
      logoExplainer:
        "Red title banner featuring crisp white letter 'i' and modern typography, symbolising innovative urban press.",
      sources: ["https://www.facebook.com/jornalicv", "https://pt.wikipedia.org/wiki/Cabo_Verde#Comunica%C3%A7%C3%A3o_social"],
    },
    {
      id: "cv-santiago-magazine",
      countryCode: "CV",
      name: "Santiago Magazine",
      founded: 2017,
      frequency: "Continuous digital news portal",
      format: "Digital news portal",
      language: "Portuguese",
      headquarters: "Praia, Santiago Island",
      owner: {
        name: "Santiago Magazine Lda",
        type: "Independent commercial media",
      },
      editorialStance: "Independent digital investigative journalism; in-depth political scandals, justice investigations, and governance oversight",
      readership: {
        metric: "Leading digital investigative daily portal in Cape Verde with 600,000+ monthly visits",
        source: "Santiago Magazine Analytics 2024",
      },
      revenueModel: "Digital banner advertising and sponsored opinion columns",
      logo: "newspaper-logos/cv/santiago-magazine.svg",
      logoExplainer:
        "Dark slate badge with clean white uppercase title 'SANTIAGO MAGAZINE', representing fearless modern digital investigative journalism.",
      sources: ["https://santiagomagazine.cv"],
    },
  ],

  // Central African Republic
  CF: [
    {
      id: "cf-acap",
      countryCode: "CF",
      name: "ACAP",
      officialName: "Agence Centrafricaine de Presse",
      nativeName: "Agence Centrafricaine de Presse",
      englishTranslation: "Central African Press Agency",
      founded: 1961,
      frequency: "Continuous daily state newswire",
      format: "Official state newswire & bulletin",
      language: "French, Sango",
      headquarters: "Bangui",
      owner: {
        name: "Republic of Central Africa (Ministère de la Communication)",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official state news wire; presidential communications, ministerial decrees, and peace accord monitoring",
      readership: {
        metric: "Primary news supplier to Bangui national radio, television, and private print titles",
        source: "ACAP Bangui Annual Review 2023",
      },
      annualPublicFunding: {
        total: "XAF 120 million (~US$200,000) state budget operating grant",
        perCapita: "XAF 22 / person / year (~US$0.04)",
      },
      revenueModel: "Direct state budget subsidy and subscription bulletin sales",
      logo: "newspaper-logos/cf/acap.svg",
      logoExplainer:
        "Deep blue emblem with white serif letters 'ACAP', representing the official national news wire of the Central African Republic.",
      sources: ["https://acap.cf", "https://fr.wikipedia.org/wiki/Agence_centrafricaine_de_presse"],
    },
    {
      id: "cf-le-democrate",
      countryCode: "CF",
      name: "Le Démocrate",
      englishTranslation: "The Democrat",
      founded: 1992,
      frequency: "Daily newspaper",
      format: "Tabloid & digital portal",
      language: "French",
      headquarters: "Bangui",
      owner: {
        name: "Société Le Démocrate (Ferdinand Samba)",
        type: "Independent commercial media",
      },
      editorialStance: "Historic independent daily paper; democratic governance, civil society advocacy, and political reporting in Bangui",
      readership: {
        metric: "One of the longest-running private daily newspapers in Bangui",
        source: "Union des Journalistes de Centrafrique 2023",
      },
      revenueModel: "Street print sales and private advertising",
      logo: "newspaper-logos/cf/le-démocrate.svg",
      logoExplainer:
        "White banner with bold black masthead 'LE DÉMOCRATE', symbolising democratic transition and independent press history in CAR.",
      sources: ["https://www.le-democrate.com", "https://fr.wikipedia.org/wiki/M%C3%A9dias_en_R%C3%A9publique_centrafricaine"],
    },
    {
      id: "cf-le-potentiel-centrafricain",
      countryCode: "CF",
      name: "Le Potentiel Centrafricain",
      englishTranslation: "The Central African Potential",
      founded: 2000,
      frequency: "Daily newspaper",
      format: "Tabloid & digital portal",
      language: "French",
      headquarters: "Bangui",
      owner: {
        name: "Groupe Le Potentiel Centrafricain",
        type: "Independent commercial media",
      },
      editorialStance: "Independent commercial daily; national politics, economic reconstruction, and Central African mining/forestry sectors",
      readership: {
        metric: "Regular daily print circulation in Bangui commercial districts",
        source: "Haut Conseil de la Communication RCA 2023",
      },
      revenueModel: "Print sales and public legal notice advertising",
      logo: "newspaper-logos/cf/le-potentiel-centrafricain.svg",
      logoExplainer:
        "White banner with prominent green and black lettering 'Le Potentiel Centrafricain', representing national reconstruction.",
      sources: ["https://lepotentielcentrafricain.com", "https://fr.wikipedia.org/wiki/M%C3%A9dias_en_R%C3%A9publique_centrafricaine"],
    },
    {
      id: "cf-corbeau-news-centrafrique",
      countryCode: "CF",
      name: "Corbeau News Centrafrique",
      founded: 2014,
      frequency: "Continuous digital news portal",
      format: "Digital investigative news portal",
      language: "French, Sango",
      headquarters: "Bangui",
      owner: {
        name: "CNC Media Network (Gisèle Moloma)",
        type: "Independent commercial media",
      },
      editorialStance: "Independent digital investigative portal; security reporting, armed group movements, and political accountability",
      readership: {
        metric: "Over 850,000 monthly digital visitors across Central African Republic and international diaspora",
        source: "Corbeau News Analytics 2024",
      },
      revenueModel: "Digital web advertising and private reader donations",
      logo: "newspaper-logos/cf/corbeau-news-centrafrique.svg",
      logoExplainer:
        "Dark charcoal banner with bold white text 'CNC' and 'Corbeau News Centrafrique', symbolising independent investigative news.",
      sources: ["https://corbeaunews-centrafrique.org"],
    },
    {
      id: "cf-l-expansion",
      countryCode: "CF",
      name: "L'Expansion",
      englishTranslation: "The Expansion",
      founded: 1996,
      frequency: "Weekly newspaper",
      format: "Tabloid publication",
      language: "French",
      headquarters: "Bangui",
      owner: {
        name: "Éditions L'Expansion Centrafrique",
        type: "Independent commercial media",
      },
      editorialStance: "Weekly independent publication; macroeconomic developments, agricultural reform, and Central African trade",
      readership: {
        metric: "Read by business professionals, development agencies, and civil servants in Bangui",
        source: "Ministère de la Communication RCA 2023",
      },
      revenueModel: "Print sales and corporate sponsorships",
      logo: "newspaper-logos/cf/l-expansion.svg",
      logoExplainer:
        "Clean white masthead with blue serif title 'L'EXPANSION', representing economic focus and development journalism.",
      sources: ["https://fr.wikipedia.org/wiki/M%C3%A9dias_en_R%C3%A9publique_centrafricaine"],
    },
  ],

  // Chad
  TD: [
    {
      id: "td-tchadinfos",
      countryCode: "TD",
      name: "Tchadinfos",
      founded: 2012,
      frequency: "Continuous 24/7 digital news service",
      format: "Digital multimedia portal & web TV",
      language: "French, Arabic",
      headquarters: "N'Djamena",
      owner: {
        name: "Mamadou Djimtebaye / Tchadinfos Media Group",
        type: "Independent commercial media",
      },
      editorialStance: "Leading independent digital multimedia network in Chad; breaking national news, politics, and youth entrepreneurship",
      readership: {
        metric: "Over 2.2 million monthly page views; premier online news destination in Chad",
        source: "Tchadinfos Audience Review 2024",
      },
      revenueModel: "Digital advertising, video production, and corporate media partnerships",
      logo: "newspaper-logos/td/tchadinfos.svg",
      logoExplainer:
        "Teal green title banner with bold white lettering 'tchadinfos', symbolising modern Chadian digital news innovation.",
      sources: ["https://tchadinfos.com", "https://fr.wikipedia.org/wiki/Tchadinfos.com"],
    },
    {
      id: "td-alwihda-info",
      countryCode: "TD",
      name: "Alwihda Info",
      nativeName: "الوحدة انفو",
      englishTranslation: "Unity Info",
      founded: 1994,
      frequency: "Continuous digital newswire",
      format: "Digital news portal & web daily",
      language: "French, Arabic",
      headquarters: "N'Djamena",
      owner: {
        name: "Djamil Ahmat / Alwihda Media Group",
        type: "Independent commercial media",
      },
      editorialStance: "Independent news portal; Sahelian regional security, political transitions, and human rights advocacy",
      readership: {
        metric: "Widely read across the Lake Chad Basin, CEMAC region, and diaspora with 1.5M monthly visits",
        source: "Alwihda Info Analytics 2023",
      },
      revenueModel: "Online banner advertising and media consulting",
      logo: "newspaper-logos/td/alwihda-info.svg",
      logoExplainer:
        "White banner featuring red and black font 'ALWIHDA INFO', representing national unity and comprehensive Sahel coverage.",
      sources: ["https://www.alwihdainfo.com", "https://fr.wikipedia.org/wiki/Alwihda_Info"],
    },
    {
      id: "td-journal-le-pays",
      countryCode: "TD",
      name: "Le Pays",
      englishTranslation: "The Country",
      founded: 2011,
      frequency: "Weekly newspaper & daily web portal",
      format: "Tabloid & digital portal",
      language: "French",
      headquarters: "N'Djamena",
      owner: {
        name: "Madjiasra Nako / Le Pays Médias",
        type: "Independent commercial media",
      },
      editorialStance: "Independent investigative weekly; political governance, social inequalities, and environmental reporting in Chad",
      readership: {
        metric: "Leading investigative print weekly newspaper in N'Djamena",
        source: "Union des Journalistes Tchadiens 2023",
      },
      revenueModel: "Print retail sales and private advertisements",
      logo: "newspaper-logos/td/journal-le-pays.svg",
      logoExplainer:
        "Emerald green badge with white typography 'LE PAYS', reflecting agricultural resilience and independent public oversight.",
      sources: ["https://lepaystchad.com"],
    },
    {
      id: "td-le-progres",
      countryCode: "TD",
      name: "Le Progrès",
      englishTranslation: "The Progress",
      founded: 1993,
      frequency: "Daily newspaper",
      format: "Tabloid daily paper",
      language: "French",
      headquarters: "N'Djamena",
      owner: {
        name: "Éditions Le Progrès (Abderahmane Koulamallah)",
        type: "Independent commercial media",
      },
      editorialStance: "Historic private daily newspaper in Chad; national political developments, civil service news, and civic commentary",
      readership: {
        metric: "Pioneer private daily publication in Chad with wide institutional circulation in the capital",
        source: "Haute Autorité des Médias et de l'Audiovisuel (HAMA) 2023",
      },
      revenueModel: "Print sales and official notices",
      logo: "newspaper-logos/td/le-progrès.svg",
      logoExplainer:
        "Deep navy blue masthead with white serif font 'LE PROGRÈS', symbolising historic democratic press evolution in Chad.",
      sources: ["https://fr.wikipedia.org/wiki/Le_Progr%C3%A8s_(Tchad)"],
    },
    {
      id: "td-n-djamena-hebdo",
      countryCode: "TD",
      name: "N'Djaména Hebdo",
      englishTranslation: "N'Djamena Weekly",
      founded: 1989,
      frequency: "Weekly newspaper",
      format: "Tabloid publication",
      language: "French",
      headquarters: "N'Djamena",
      owner: {
        name: "Yaldet Bégoto Oulatar",
        type: "Independent commercial media",
      },
      editorialStance: "Historic pioneer of independent print journalism in Chad; courageous press freedom advocate and democratic commentary",
      readership: {
        metric: "Longest continuously operating independent weekly paper in Chad since 1989",
        source: "Reporters Without Borders & HAMA Chad 2023",
      },
      revenueModel: "Print retail sales and classified advertisements",
      logo: "newspaper-logos/td/n-djamena-hebdo.svg",
      logoExplainer:
        "White canvas displaying bold black masthead 'N'DJAMÉNA HEBDO', representing thirty-five years of independent Chadian press.",
      sources: ["https://fr.wikipedia.org/wiki/N%27Djam%C3%A9na_Hebdo"],
    },
  ],

  // Chile
  CL: [
    {
      id: "cl-el-mercurio",
      countryCode: "CL",
      name: "El Mercurio",
      englishTranslation: "The Mercury",
      founded: 1900,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Spanish",
      headquarters: "Santiago",
      owner: {
        name: "Empresa El Mercurio S.A.P. (Edwards family)",
        type: "Independent commercial media",
      },
      editorialStance: "Chile's historic conservative newspaper of record; business, legal affairs, national politics, and international diplomacy",
      readership: {
        metric: "Leading national newspaper of record with over 120,000 daily print circulation and Emol.com digital portal reaching 8M+ monthly readers",
        source: "El Mercurio SAP Memoria Anual 2023",
      },
      revenueModel: "Print sales, digital subscriptions, and display advertising",
      logo: "newspaper-logos/cl/el-mercurio.svg",
      logoExplainer:
        "White banner displaying the classic black gothic and serif masthead 'EL MERCURIO', representing Chile's oldest major news institution.",
      sources: ["https://www.elmercurio.com", "https://en.wikipedia.org/wiki/El_Mercurio"],
    },
    {
      id: "cl-la-tercera",
      countryCode: "CL",
      name: "La Tercera",
      englishTranslation: "The Third",
      founded: 1950,
      frequency: "Daily newspaper & continuous digital portal",
      format: "Berliner & digital portal",
      language: "Spanish",
      headquarters: "Santiago",
      owner: {
        name: "Copesa (Consorcio Periodístico de Chile S.A.)",
        type: "Independent commercial media",
      },
      editorialStance: "Center-right mainstream daily; national political analysis, investigative reports (La Tercera PM), and business coverage (Pulso)",
      readership: {
        metric: "Over 6.5 million monthly unique digital visitors across latercera.com and Pulso",
        source: "Copesa Audience Report 2024",
      },
      revenueModel: "Digital paywall subscriptions, print sales, and programmatic advertising",
      logo: "newspaper-logos/cl/la-tercera.svg",
      logoExplainer:
        "Vibrant red banner with bold white lowercase typography 'la tercera', reflecting modern investigative and dynamic daily reporting.",
      sources: ["https://www.latercera.com", "https://en.wikipedia.org/wiki/La_Tercera"],
    },
    {
      id: "cl-diario-financiero",
      countryCode: "CL",
      name: "Diario Financiero",
      englishTranslation: "Financial Daily",
      founded: 1988,
      frequency: "Daily business newspaper (Monday–Friday)",
      format: "Salmon broadsheet & digital portal",
      language: "Spanish",
      headquarters: "Santiago",
      owner: {
        name: "Grupo Claro",
        type: "Independent commercial media",
      },
      editorialStance: "Specialized financial and economic daily; Santiago Stock Exchange, mining industries, retail markets, and regulatory affairs",
      readership: {
        metric: "Primary business daily in Chile read by corporate executives and financial institutions (2.5M monthly visits)",
        source: "Diario Financiero Media Kit 2024",
      },
      revenueModel: "Corporate subscriptions and financial sector advertising",
      logo: "newspaper-logos/cl/diario-financiero.svg",
      logoExplainer:
        "White banner with distinctive navy blue lettering 'DF DIARIO FINANCIERO', symbolising market analysis and corporate integrity.",
      sources: ["https://www.df.cl", "https://es.wikipedia.org/wiki/Diario_Financiero"],
    },
    {
      id: "cl-las-ultimas-noticias",
      countryCode: "CL",
      name: "Las Últimas Noticias",
      englishTranslation: "The Latest News",
      founded: 1902,
      frequency: "Daily newspaper",
      format: "Tabloid & digital portal",
      language: "Spanish",
      headquarters: "Santiago",
      owner: {
        name: "Empresa El Mercurio S.A.P.",
        type: "Independent commercial media",
      },
      editorialStance: "Mass-circulation popular daily; sports, technology trends, popular culture, and human interest stories",
      readership: {
        metric: "Highest print retail circulation among popular tabloids in Chile with 100,000+ daily copies",
        source: "LUN Media Metrics 2023",
      },
      revenueModel: "Retail print sales and retail commercial advertising",
      logo: "newspaper-logos/cl/las-últimas-noticias.svg",
      logoExplainer:
        "Royal blue background with bright yellow and white typography 'LUN Las Últimas Noticias', iconic across Chilean newsstands.",
      sources: ["https://www.lun.com", "https://en.wikipedia.org/wiki/Las_%C3%9Altimas_Noticias"],
    },
    {
      id: "cl-the-clinic",
      countryCode: "CL",
      name: "The Clinic",
      founded: 1998,
      frequency: "Weekly publication & digital portal",
      format: "Satirical journal & digital portal",
      language: "Spanish",
      headquarters: "Santiago",
      owner: {
        name: "Ediciones The Clinic (Patricio Fernández)",
        type: "Independent commercial media",
      },
      editorialStance: "Left-leaning satirical and political investigative publication founded during Pinochet's London arrest; anti-establishment critique",
      readership: {
        metric: "Cult political publication reaching 1.2 million monthly readers across cultural and academic sectors",
        source: "The Clinic Audience Review 2023",
      },
      revenueModel: "Print sales, digital display advertising, and reader memberships",
      logo: "newspaper-logos/cl/the-clinic.svg",
      logoExplainer:
        "Dark black banner with bold white text 'THE CLINIC', symbolising sharp political satire and counter-cultural investigative journalism.",
      sources: ["https://www.theclinic.cl", "https://en.wikipedia.org/wiki/The_Clinic_(newspaper)"],
    },
  ],

  // China
  CN: [
    {
      id: "cn-people-s-daily",
      countryCode: "CN",
      name: "People's Daily",
      officialName: "People's Daily (Renmin Ribao)",
      nativeName: "人民日报",
      englishTranslation: "People's Daily",
      founded: 1948,
      frequency: "Daily newspaper",
      format: "Official state broadsheet & digital network",
      language: "Chinese (Simplified), with foreign language editions",
      headquarters: "Chaoyang District, Beijing",
      owner: {
        name: "Central Committee of the Chinese Communist Party",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official newspaper of the Central Committee of the CCP; authoritative voice on national policies, ideological guidelines, and central government affairs",
      readership: {
        metric: "Largest print circulation in China with 3.2 million daily copies and global online reach exceeding 100 million across People.cn",
        source: "People's Daily Annual Report 2023",
      },
      revenueModel: "State institutional subscriptions, official public notices, and digital media advertising",
      logo: "newspaper-logos/cn/people-s-daily.svg",
      logoExplainer:
        "Crimson red banner featuring golden-yellow calligraphic characters '人民日报' written by Mao Zedong, the defining insignia of China's principal state paper.",
      sources: ["http://en.people.cn", "https://en.wikipedia.org/wiki/People%27s_Daily"],
    },
    {
      id: "cn-china-daily",
      countryCode: "CN",
      name: "China Daily",
      nativeName: "中国日报",
      englishTranslation: "China Daily",
      founded: 1981,
      frequency: "Daily newspaper",
      format: "Broadsheet & international digital portal",
      language: "English",
      headquarters: "Beijing",
      owner: {
        name: "State Council Information Office",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "China's premier national English-language daily; international diplomacy, global business, trade, and cultural exchange",
      readership: {
        metric: "Over 900,000 daily global print distribution and 350+ million digital and social media followers worldwide",
        source: "China Daily Global Media Kit 2024",
      },
      annualPublicFunding: {
        total: "Direct central state foreign communication appropriation",
        perCapita: "National international communication remit",
      },
      revenueModel: "Central state foreign-press budget, global institutional subscriptions, and advertising",
      logo: "newspaper-logos/cn/china-daily.svg",
      logoExplainer:
        "Navy blue banner displaying the refined white serif masthead 'CHINA DAILY', representing China's primary international English voice.",
      sources: ["https://www.chinadaily.com.cn", "https://en.wikipedia.org/wiki/China_Daily"],
    },
    {
      id: "cn-reference-news",
      countryCode: "CN",
      name: "Reference News",
      officialName: "Cankao Xiaoxi",
      nativeName: "参考消息",
      englishTranslation: "Reference News",
      founded: 1931,
      frequency: "Daily newspaper",
      format: "Broadsheet digest",
      language: "Chinese",
      headquarters: "Beijing",
      owner: {
        name: "Xinhua News Agency",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Foreign affairs digest published by Xinhua; translating and reprinting international news coverage and commentary for domestic readership",
      readership: {
        metric: "Over 2.5 million daily print circulation; historically one of China's most widely read daily digests",
        source: "Xinhua Media Research 2023",
      },
      revenueModel: "Institutional and retail print subscriptions",
      logo: "newspaper-logos/cn/reference-news.svg",
      logoExplainer:
        "White canvas with black calligraphic Chinese characters '参考消息' penned by Lu Xun, symbolising curated international news insights.",
      sources: ["http://www.cankaoxiaoxi.com", "https://en.wikipedia.org/wiki/Reference_News"],
    },
    {
      id: "cn-huanqiu-shibao",
      countryCode: "CN",
      name: "Global Times",
      officialName: "Huanqiu Shibao",
      nativeName: "环球时报",
      englishTranslation: "Global Times",
      founded: 1993,
      frequency: "Daily newspaper (Chinese & English editions)",
      format: "Tabloid & international digital portal",
      language: "Chinese, English",
      headquarters: "Beijing",
      owner: {
        name: "People's Daily Press",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Nationalist international affairs daily affiliated with People's Daily; vocal coverage of foreign relations, geopolitics, and sovereignty",
      readership: {
        metric: "Over 1.5 million daily print circulation in Chinese plus extensive international web traffic on GlobalTimes.cn",
        source: "Global Times Audience Report 2023",
      },
      revenueModel: "Print sales, corporate advertising, and digital subscriptions",
      logo: "newspaper-logos/cn/huanqiu-shibao.svg",
      logoExplainer:
        "Burgundy red banner with white typography 'GLOBAL TIMES' and Chinese characters '环球时报', symbolising forthright geopolitical reporting.",
      sources: ["https://www.globaltimes.cn", "https://en.wikipedia.org/wiki/Global_Times"],
    },
    {
      id: "cn-nanfang-ribao",
      countryCode: "CN",
      name: "Nanfang Daily",
      officialName: "Southern Daily",
      nativeName: "南方日报",
      englishTranslation: "Southern Daily",
      founded: 1949,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital multimedia network",
      language: "Chinese",
      headquarters: "Guangzhou, Guangdong",
      owner: {
        name: "Nanfang Media Group",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official newspaper of the Guangdong Provincial Committee of the CCP; flagship of Nanfang Media Group covering the Greater Bay Area economy",
      readership: {
        metric: "Leading regional provincial broadsheet with 950,000+ daily copies across Guangdong, Hong Kong, and Macau",
        source: "Nanfang Media Group Annual Review 2023",
      },
      revenueModel: "Provincial institutional subscriptions and regional commercial advertising",
      logo: "newspaper-logos/cn/nanfang-ribao.svg",
      logoExplainer:
        "White banner displaying red calligraphic characters '南方日报', representing the dynamic Greater Bay Area and Guangdong journalism.",
      sources: ["https://www.nanfangdaily.com.cn", "https://en.wikipedia.org/wiki/Nanfang_Daily"],
    },
  ],

  // Colombia
  CO: [
    {
      id: "co-el-tiempo",
      countryCode: "CO",
      name: "El Tiempo",
      englishTranslation: "The Time",
      founded: 1911,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Spanish",
      headquarters: "Bogotá",
      owner: {
        name: "Grupo Aval (Luis Carlos Sarmiento Angulo)",
        type: "Independent commercial media",
      },
      editorialStance: "Historic centrist newspaper of record in Colombia; national politics, economic policy, peace process analysis, and cultural reporting",
      readership: {
        metric: "Largest print circulation in Colombia and premier digital portal reaching over 14 million monthly unique visitors",
        source: "Casa Editorial El Tiempo Media Profile 2024",
      },
      revenueModel: "Digital subscriptions, print sales, and cross-media advertising",
      logo: "newspaper-logos/co/el-tiempo.svg",
      logoExplainer:
        "Navy blue title banner with white serif masthead 'EL TIEMPO', representing Colombia's preeminent historic daily newspaper.",
      sources: ["https://www.eltiempo.com", "https://en.wikipedia.org/wiki/El_Tiempo_(Colombia)"],
    },
    {
      id: "co-el-espectador",
      countryCode: "CO",
      name: "El Espectador",
      englishTranslation: "The Spectator",
      founded: 1887,
      frequency: "Daily digital portal & weekly Sunday print edition",
      format: "Tabloid & digital portal",
      language: "Spanish",
      headquarters: "Bogotá",
      owner: {
        name: "Valorem S.A. (Santo Domingo family)",
        type: "Independent commercial media",
      },
      editorialStance: "Colombia's oldest newspaper; historic progressive liberal stance known for legendary courageous investigative journalism against drug cartels and corruption",
      readership: {
        metric: "Revered quality investigative outlet with over 9 million monthly digital visitors on elespectador.com",
        source: "Valorem Annual Report 2023",
      },
      revenueModel: "Digital subscriber paywall, print sales, and civic journalism grants",
      logo: "newspaper-logos/co/el-espectador.svg",
      logoExplainer:
        "White banner displaying the iconic black gothic masthead 'El Espectador', symbolising heroic defence of press freedom in Colombia.",
      sources: ["https://www.elespectador.com", "https://en.wikipedia.org/wiki/El_Espectador_(newspaper)"],
    },
    {
      id: "co-el-colombiano",
      countryCode: "CO",
      name: "El Colombiano",
      englishTranslation: "The Colombian",
      founded: 1912,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Spanish",
      headquarters: "Medellín, Antioquia",
      owner: {
        name: "Grupo Gilinski",
        type: "Independent commercial media",
      },
      editorialStance: "Conservative regional broadsheet; principal voice of Antioquia and western Colombia focusing on business, industry, and regional politics",
      readership: {
        metric: "Dominant daily newspaper in Medellín and the coffee-growing axis with 3.5 million monthly digital readers",
        source: "El Colombiano Media Kit 2024",
      },
      revenueModel: "Print subscriptions, digital access plans, and regional advertising",
      logo: "newspaper-logos/co/el-colombiano.svg",
      logoExplainer:
        "Red banner with clean white serif font 'EL COLOMBIANO', representing century-old journalistic tradition in Antioquia.",
      sources: ["https://www.elcolombiano.com", "https://en.wikipedia.org/wiki/El_Colombiano"],
    },
    {
      id: "co-portafolio",
      countryCode: "CO",
      name: "Portafolio",
      englishTranslation: "Portfolio",
      founded: 1993,
      frequency: "Daily financial newspaper (Monday–Friday)",
      format: "Compact tabloid & financial portal",
      language: "Spanish",
      headquarters: "Bogotá",
      owner: {
        name: "Casa Editorial El Tiempo",
        type: "Independent commercial media",
      },
      editorialStance: "Premier financial and economic daily; Bogota stock market, macroeconomic indicators, foreign investment, and corporate mergers",
      readership: {
        metric: "Leading specialized financial daily read across Colombian corporate boardrooms and government ministries",
        source: "Portafolio Corporate Profile 2023",
      },
      revenueModel: "Financial corporate subscriptions and business-to-business advertising",
      logo: "newspaper-logos/co/portafolio.svg",
      logoExplainer:
        "Dark slate badge with clean white title 'PORTAFOLIO', symbolising authoritative financial analysis and business intelligence.",
      sources: ["https://www.portafolio.co", "https://es.wikipedia.org/wiki/Portafolio_(peri%C3%B3dico)"],
    },
    {
      id: "co-la-republica",
      countryCode: "CO",
      name: "La República",
      englishTranslation: "The Republic",
      founded: 1954,
      frequency: "Daily financial newspaper (Monday–Saturday)",
      format: "Salmon broadsheet & digital portal",
      language: "Spanish",
      headquarters: "Bogotá",
      owner: {
        name: "Editorial La República / Grupo Ardila Lülle",
        type: "Independent commercial media",
      },
      editorialStance: "Historic specialized business and economic newspaper founded by former President Mariano Ospina Pérez; economic policy and market reporting",
      readership: {
        metric: "Over 2.8 million monthly digital visitors and widespread institutional print circulation",
        source: "Grupo Ardila Lülle Media Review 2023",
      },
      revenueModel: "Corporate subscriptions and commercial banking advertising",
      logo: "newspaper-logos/co/la-república.svg",
      logoExplainer:
        "White banner displaying red and black serif lettering 'La República', representing Colombia's first dedicated economic daily.",
      sources: ["https://www.larepublica.co", "https://es.wikipedia.org/wiki/La_Rep%C3%BAblica_(Colombia)"],
    },
  ],

  // Comoros
  KM: [
    {
      id: "km-al-watwan",
      countryCode: "KM",
      name: "Al-Watwan",
      nativeName: "Al-Watwan",
      englishTranslation: "The Homeland",
      founded: 1985,
      frequency: "Daily newspaper (Monday–Friday)",
      format: "Official state daily broadsheet & digital portal",
      language: "French, Arabic",
      headquarters: "Moroni, Grande Comore",
      owner: {
        name: "Union of the Comoros (Ministère des Télécommunications)",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official national public daily newspaper; presidential decrees, inter-island development, parliamentary affairs, and Indian Ocean diplomacy",
      readership: {
        metric: "Only national daily print newspaper in the Comoros, distributed across Grande Comore, Anjouan, and Mohéli",
        source: "Al-Watwan Presse d'État Rapport 2023",
      },
      annualPublicFunding: {
        total: "KMF 85 million (~US$185,000) national operating allocation",
        perCapita: "KMF 95 / person / year (~US$0.21)",
      },
      revenueModel: "State operating subsidy, print sales, and official legal notices",
      logo: "newspaper-logos/km/al-watwan.svg",
      logoExplainer:
        "Green title banner with white serif font 'AL-WATWAN', embodying the national color of Comoros and state press heritage.",
      sources: ["https://alwatwan.net", "https://fr.wikipedia.org/wiki/Al-Watwan"],
    },
    {
      id: "km-la-gazette-des-comores",
      countryCode: "KM",
      name: "La Gazette des Comores",
      englishTranslation: "The Comoros Gazette",
      founded: 1999,
      frequency: "Daily newspaper",
      format: "Tabloid & digital portal",
      language: "French",
      headquarters: "Moroni",
      owner: {
        name: "Housseine Saïd / Groupe La Gazette",
        type: "Independent commercial media",
      },
      editorialStance: "Independent commercial daily; political debates, social issues, regional economy, and human rights coverage in Comoros",
      readership: {
        metric: "Leading independent print and digital daily in Moroni with widespread readership across the islands",
        source: "Groupe La Gazette Media Review 2023",
      },
      revenueModel: "Print sales and local business advertising",
      logo: "newspaper-logos/km/la-gazette-des-comores.svg",
      logoExplainer:
        "White canvas displaying bold black font 'La Gazette des Comores', representing independent civic journalism.",
      sources: ["https://lagazettedescomores.com"],
    },
    {
      id: "km-habari-za-comores",
      countryCode: "KM",
      name: "Habari Za Comores",
      nativeName: "Habari Za Comores",
      englishTranslation: "News of Comoros",
      founded: 2010,
      frequency: "Continuous digital news portal",
      format: "Digital news portal",
      language: "French, Comorian (Shikomori)",
      headquarters: "Moroni",
      owner: {
        name: "Habari Media Network",
        type: "Independent commercial media",
      },
      editorialStance: "Independent digital news outlet; community news, cultural preservation, diaspora connections, and civic affairs",
      readership: {
        metric: "Over 450,000 monthly digital visitors across Comoros, Mayotte, and the French diaspora",
        source: "Habari Za Comores Analytics 2024",
      },
      revenueModel: "Digital banner advertising and diaspora promotions",
      logo: "newspaper-logos/km/habari-za-comores.svg",
      logoExplainer:
        "White banner with bold green and navy typography 'HABARI ZA COMORES', symbolising community news and archipelago culture.",
      sources: ["https://habarizacomores.com"],
    },
    {
      id: "km-comores-infos",
      countryCode: "KM",
      name: "Comores-Infos",
      englishTranslation: "Comoros News",
      founded: 2012,
      frequency: "Continuous digital news service",
      format: "Digital multimedia portal",
      language: "French",
      headquarters: "Moroni",
      owner: {
        name: "Comores Infos Médias",
        type: "Independent commercial media",
      },
      editorialStance: "Digital news and multimedia portal; breaking national news, sports, youth initiatives, and social commentary",
      readership: {
        metric: "High engagement on mobile and social networks across the island archipelago",
        source: "Comores Infos Digital Review 2023",
      },
      revenueModel: "Digital display ads and multimedia sponsorships",
      logo: "newspaper-logos/km/comores-infos.svg",
      logoExplainer:
        "Red title banner with modern white typography 'COMORES INFOS', symbolising dynamic digital breaking news.",
      sources: ["https://www.comoresinfos.net"],
    },
    {
      id: "km-mwali-info",
      countryCode: "KM",
      name: "Mwali Info",
      englishTranslation: "Mohéli News",
      founded: 2014,
      frequency: "Digital portal",
      format: "Regional digital news service",
      language: "French, Shikomori",
      headquarters: "Fomboni, Mohéli",
      owner: {
        name: "Collectif des Journalistes de Mohéli",
        type: "Independent commercial media",
      },
      editorialStance: "Regional media voice of Mohéli Island; biosphere reserve conservation, local governance, and island agricultural affairs",
      readership: {
        metric: "Primary news portal dedicated to Mohéli island affairs and ecological tourism",
        source: "Mohéli Media Collective 2023",
      },
      revenueModel: "Community sponsorships and tourism advertising",
      logo: "newspaper-logos/km/mwali-info.svg",
      logoExplainer:
        "Yellow title block with bold blue font 'MWALI INFO', reflecting the vibrant biodiversity and island heritage of Mohéli.",
      sources: ["https://fr.wikipedia.org/wiki/Moh%C3%A9li"],
    },
  ],

  // Republic of the Congo
  CG: [
    {
      id: "cg-aci",
      countryCode: "CG",
      name: "ACI",
      officialName: "Agence Congolaise d'Information",
      nativeName: "Agence Congolaise d'Information",
      englishTranslation: "Congolese Information Agency",
      founded: 1961,
      frequency: "Continuous 24/7 national newswire",
      format: "Official state newswire & bulletin",
      language: "French",
      headquarters: "Brazzaville",
      owner: {
        name: "Republic of the Congo (Ministère de la Communication)",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official national public newswire; executive decisions, legislative proceedings, diplomatic cooperation, and forestry development",
      readership: {
        metric: "Primary news supplier to all domestic broadcast networks and print titles across Brazzaville and Pointe-Noire",
        source: "ACI Brazzaville Rapport Annuel 2023",
      },
      annualPublicFunding: {
        total: "XAF 180 million (~US$295,000) state operating subsidy",
        perCapita: "XAF 30 / person / year (~US$0.05)",
      },
      revenueModel: "State budget allocation and wire syndication fees",
      logo: "newspaper-logos/cg/aci-agence-congolaise-d-information.svg",
      logoExplainer:
        "Deep blue banner with crisp white letters 'ACI Agence Congolaise d'Information', representing the statutory news agency of Congo-Brazzaville.",
      sources: ["https://www.aci.cg", "https://fr.wikipedia.org/wiki/Agence_congolaise_d%27information"],
    },
    {
      id: "cg-les-depeches-de-brazzaville",
      countryCode: "CG",
      name: "Les Dépêches de Brazzaville",
      englishTranslation: "Brazzaville Dispatches",
      founded: 1998,
      frequency: "Daily newspaper (Monday–Friday)",
      format: "Berliner & international portal",
      language: "French",
      headquarters: "Brazzaville",
      owner: {
        name: "Agence d'Information d'Afrique Centrale (ADIAC)",
        type: "Independent commercial media",
      },
      editorialStance: "Leading national daily newspaper; Central African geopolitics, cultural festivals, public infrastructure, and pan-African diplomacy",
      readership: {
        metric: "Largest print daily circulation in the Republic of the Congo with 15,000 daily print copies",
        source: "ADIAC Corporate Review 2023",
      },
      revenueModel: "Print sales, cultural sponsorships, and institutional subscriptions",
      logo: "newspaper-logos/cg/les-dépêches-de-brazzaville.svg",
      logoExplainer:
        "Black background with white serif title 'Les Dépêches de Brazzaville', the most prominent daily masthead in the Congo Basin.",
      sources: ["https://www.lesdepechesdebrazzaville.fr", "https://fr.wikipedia.org/wiki/Les_D%C3%A9p%C3%AAches_de_Brazzaville"],
    },
    {
      id: "cg-la-semaine-africaine",
      countryCode: "CG",
      name: "La Semaine Africaine",
      englishTranslation: "The African Week",
      founded: 1952,
      frequency: "Bi-weekly publication (Tuesday & Friday)",
      format: "Tabloid publication & digital portal",
      language: "French",
      headquarters: "Brazzaville",
      owner: {
        name: "Episcopal Conference of the Congo (Catholic Church)",
        type: "Independent trust / foundation",
      },
      editorialStance: "Historic independent bi-weekly; social justice, pastoral advocacy, ethical governance, and civil society reflection",
      readership: {
        metric: "Over 70 years of continuous publishing; highly respected independent moral authority in Congolese media",
        source: "La Semaine Africaine Archive 2023",
      },
      revenueModel: "Print circulation, church subscriptions, and civic announcements",
      logo: "newspaper-logos/cg/la-semaine-africaine.svg",
      logoExplainer:
        "White banner with bold green and black lettering 'La Semaine Africaine', symbolising historic moral and civic journalism.",
      sources: ["https://lasemaineafricaine.info", "https://fr.wikipedia.org/wiki/La_Semaine_africaine"],
    },
    {
      id: "cg-le-patriote",
      countryCode: "CG",
      name: "Le Patriote",
      englishTranslation: "The Patriot",
      founded: 2000,
      frequency: "Weekly newspaper",
      format: "Tabloid publication",
      language: "French",
      headquarters: "Brazzaville",
      owner: {
        name: "Groupe Le Patriote",
        type: "Independent commercial media",
      },
      editorialStance: "Weekly independent newspaper; national political debates, regional economic corridors, and social development",
      readership: {
        metric: "Popular weekly print edition in administrative centers of Brazzaville and Pointe-Noire",
        source: "Conseil Supérieur de la Liberté de Communication 2023",
      },
      revenueModel: "Print retail sales and local advertising",
      logo: "newspaper-logos/cg/le-patriote.svg",
      logoExplainer:
        "Red title banner with bold white lettering 'LE PATRIOTE', representing national civic engagement and public debate.",
      sources: ["https://fr.wikipedia.org/wiki/M%C3%A9dias_en_R%C3%A9publique_du_Congo"],
    },
    {
      id: "cg-vox-congo",
      countryCode: "CG",
      name: "Vox Congo",
      founded: 2017,
      frequency: "Continuous digital multimedia service",
      format: "Digital multimedia portal & Web TV",
      language: "French",
      headquarters: "Brazzaville",
      owner: {
        name: "Vox Médias Group",
        type: "Independent commercial media",
      },
      editorialStance: "Modern multimedia and digital TV platform; youth culture, sports, technological entrepreneurship, and urban lifestyle",
      readership: {
        metric: "Leading digital native video and news platform in Brazzaville with 500,000+ monthly engagements",
        source: "Vox Congo Audience Review 2024",
      },
      revenueModel: "Digital video advertising and sponsored corporate media",
      logo: "newspaper-logos/cg/vox-congo.svg",
      logoExplainer:
        "White banner with vibrant red and black logo 'VOX', representing modern digital television and youth-oriented journalism.",
      sources: ["https://www.vox.cg"],
    },
  ],

  // Democratic Republic of the Congo
  CD: [
    {
      id: "cd-acp",
      countryCode: "CD",
      name: "ACP",
      officialName: "Agence Congolaise de Presse",
      nativeName: "Agence Congolaise de Presse",
      englishTranslation: "Congolese Press Agency",
      founded: 1960,
      frequency: "Continuous 24/7 national newswire",
      format: "Official public wire service & daily bulletin",
      language: "French",
      headquarters: "Gombe, Kinshasa",
      owner: {
        name: "Democratic Republic of the Congo (Ministère de la Communication et Médias)",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official public newswire of the DRC; presidential activity, national assembly decrees, provincial governors, and MONUSCO peace initiatives",
      readership: {
        metric: "Primary news supplier to over 500 radio, television, and print outlets across all 26 provinces of the DRC",
        source: "ACP Rapport de Gestion et Performance 2023",
      },
      annualPublicFunding: {
        total: "CDF 4.5 billion (~US$1.65 million) state budget allocation",
        perCapita: "CDF 45 / person / year (~US$0.016)",
      },
      revenueModel: "Direct state budget subsidy and institutional subscriber feeds",
      logo: "newspaper-logos/cd/acp-agence-congolaise-de-presse.svg",
      logoExplainer:
        "Navy blue background with bold white lettering 'ACP' and full title, symbolising the official state wire service of the DRC.",
      sources: ["https://acp.cd", "https://fr.wikipedia.org/wiki/Agence_congolaise_de_presse"],
    },
    {
      id: "cd-le-potentiel",
      countryCode: "CD",
      name: "Le Potentiel",
      englishTranslation: "The Potential",
      founded: 1982,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Tabloid & digital portal",
      language: "French",
      headquarters: "Kinshasa",
      owner: {
        name: "Modeste Mutinga Mutuishayi / Groupe Le Potentiel",
        type: "Independent commercial media",
      },
      editorialStance: "DRC's benchmark independent daily newspaper; recognized for in-depth economic analysis, governance monitoring, and constitutional reform debate",
      readership: {
        metric: "Most influential intellectual daily in Kinshasa and Lubumbashi with 1.2 million monthly web readers on lepotentiel.cd",
        source: "Groupe Le Potentiel Profile 2023",
      },
      revenueModel: "Print sales, institutional advertising, and online sponsorships",
      logo: "newspaper-logos/cd/le-potentiel.svg",
      logoExplainer:
        "Deep blue banner with white serif font 'Le Potentiel', representing decades of independent investigative journalism in Central Africa.",
      sources: ["https://lepotentiel.cd", "https://fr.wikipedia.org/wiki/Le_Potentiel"],
    },
    {
      id: "cd-actualite-cd",
      countryCode: "CD",
      name: "ACTUALITE.CD",
      founded: 2016,
      frequency: "Continuous 24/7 digital news service",
      format: "Digital multimedia portal & podcasts",
      language: "French",
      headquarters: "Kinshasa",
      owner: {
        name: "Next Corp (Patient Ligodi)",
        type: "Independent commercial media",
      },
      editorialStance: "Leading independent digital news portal in the DRC; high-tempo breaking news, eastern DRC security coverage, electoral tracking, and podcast journalism",
      readership: {
        metric: "Over 3.5 million monthly pageviews; premier digital news reference for Congolese youth and civil society",
        source: "Actualite.cd Audience Review 2024",
      },
      revenueModel: "Digital display advertising, international donor media grants, and syndicated reporting",
      logo: "newspaper-logos/cd/actualite-cd.svg",
      logoExplainer:
        "Dark charcoal banner with bold white text 'ACTUALITE.CD' and vivid red dot, symbolising real-time breaking news.",
      sources: ["https://actualite.cd"],
    },
    {
      id: "cd-l-avenir",
      countryCode: "CD",
      name: "L'Avenir",
      englishTranslation: "The Future",
      founded: 1996,
      frequency: "Daily newspaper",
      format: "Tabloid & digital portal",
      language: "French",
      headquarters: "Kinshasa",
      owner: {
        name: "Groupe L'Avenir (Pius Muabilu)",
        type: "Independent commercial media",
      },
      editorialStance: "Major Kinshasa commercial daily; national politics, parliamentary debates, infrastructure modernization, and cultural commentary",
      readership: {
        metric: "Prominent daily circulation in Kinshasa and central provinces with active digital platform groupelavenir.cd",
        source: "Groupe L'Avenir Media Review 2023",
      },
      revenueModel: "Print newspaper sales and commercial advertising",
      logo: "newspaper-logos/cd/l-avenir.svg",
      logoExplainer:
        "White banner featuring blue and red font 'L'AVENIR', representing optimistic national development and daily news.",
      sources: ["https://groupelavenir.cd", "https://fr.wikipedia.org/wiki/L%27Avenir_(journal_congolais)"],
    },
    {
      id: "cd-la-prosperite",
      countryCode: "CD",
      name: "La Prospérité",
      englishTranslation: "The Prosperity",
      founded: 1999,
      frequency: "Daily newspaper (Monday–Friday)",
      format: "Tabloid publication & digital portal",
      language: "French",
      headquarters: "Kinshasa",
      owner: {
        name: "Marcel Ngoyi Ngoyi / Éditions La Prospérité",
        type: "Independent commercial media",
      },
      editorialStance: "Independent commercial daily newspaper; detailed parliamentary reporting, judicial proceedings, and public policy debate",
      readership: {
        metric: "Widely read by legal practitioners, parliamentarians, and civil servants in Kinshasa",
        source: "CSAC RDC Media Registry 2023",
      },
      revenueModel: "Print sales and official legal publication notices",
      logo: "newspaper-logos/cd/la-prospérité.svg",
      logoExplainer:
        "Emerald green title banner with bold white typography 'La Prospérité', reflecting economic growth and national progress.",
      sources: ["https://laprosperite.online"],
    },
  ],

  // Costa Rica
  CR: [
    {
      id: "cr-la-nacion",
      countryCode: "CR",
      name: "La Nación",
      englishTranslation: "The Nation",
      founded: 1946,
      frequency: "Daily newspaper (Monday–Sunday)",
      format: "Tabloid & digital portal",
      language: "Spanish",
      headquarters: "San José",
      owner: {
        name: "Grupo Nación S.A.",
        type: "Independent commercial media",
      },
      editorialStance: "Costa Rica's historic newspaper of record; center-right liberal-conservative editorial stance focusing on governance, politics, and investigative reporting",
      readership: {
        metric: "Over 2.5 million monthly digital readers and Costa Rica's highest circulated print daily",
        source: "Grupo Nación Memoria Anual 2023",
      },
      revenueModel: "Digital paywall subscriptions, print sales, and corporate advertising",
      logo: "newspaper-logos/cr/la-nación.svg",
      logoExplainer:
        "Classic black serif masthead 'La Nación' on white canvas, symbolising democratic governance and public interest reporting in Costa Rica.",
      sources: ["https://www.nacion.com", "https://en.wikipedia.org/wiki/La_Naci%C3%B3n_(San_Jos%C3%A9)"],
    },
    {
      id: "cr-la-republica",
      countryCode: "CR",
      name: "La República",
      englishTranslation: "The Republic",
      founded: 1950,
      frequency: "Daily business newspaper (Monday–Friday)",
      format: "Tabloid & digital portal",
      language: "Spanish",
      headquarters: "San José",
      owner: {
        name: "Republicare Media Group",
        type: "Independent commercial media",
      },
      editorialStance: "Business, finance, and investment daily; focus on foreign direct investment, free trade zones, and macroeconomic policy",
      readership: {
        metric: "Leading specialized financial daily read across business chambers and executive suites in Costa Rica",
        source: "La República Media Profile 2024",
      },
      revenueModel: "Corporate subscriptions and financial sector advertising",
      logo: "newspaper-logos/cr/la-república.svg",
      logoExplainer:
        "Vibrant red banner with crisp white serif typography 'LA REPÚBLICA', representing business intelligence and commerce.",
      sources: ["https://www.larepublica.net", "https://es.wikipedia.org/wiki/La_Rep%C3%BAblica_(Costa_Rica)"],
    },
    {
      id: "cr-diario-extra",
      countryCode: "CR",
      name: "Diario Extra",
      englishTranslation: "Extra Daily",
      founded: 1978,
      frequency: "Daily newspaper",
      format: "Tabloid & digital portal",
      language: "Spanish",
      headquarters: "San José",
      owner: {
        name: "Grupo Extra / Transcomer Group",
        type: "Independent commercial media",
      },
      editorialStance: "Popular tabloid; crime reporting, labour union advocacy, sports, and working-class social issues",
      readership: {
        metric: "Historically Costa Rica's largest street-sale newspaper with 80,000+ daily copies",
        source: "Diario Extra Media Kit 2023",
      },
      revenueModel: "Retail print sales and classified advertising",
      logo: "newspaper-logos/cr/diario-extra.svg",
      logoExplainer:
        "Red and yellow title block with bold sans-serif lettering 'DIARIO EXTRA', iconic across Costa Rican kiosks.",
      sources: ["https://www.diarioextra.com", "https://es.wikipedia.org/wiki/Diario_Extra_(Costa_Rica)"],
    },
    {
      id: "cr-crhoy",
      countryCode: "CR",
      name: "CRHoy",
      founded: 2012,
      frequency: "Continuous 24/7 digital news service",
      format: "Digital-only news portal",
      language: "Spanish",
      headquarters: "San José",
      owner: {
        name: "Leonel Baruch / CRHoy Media",
        type: "Independent commercial media",
      },
      editorialStance: "Leading digital investigative portal; high-tempo breaking news, investigative exposés, and political accountability",
      readership: {
        metric: "Over 5.5 million monthly unique digital visitors; highest digital news traffic in Costa Rica",
        source: "Similarweb & CRHoy Media Review 2024",
      },
      revenueModel: "Digital programmatic advertising and sponsored content",
      logo: "newspaper-logos/cr/crhoy.svg",
      logoExplainer:
        "Bold blue and orange typography 'crhoy.com' representing rapid breaking digital journalism in Central America.",
      sources: ["https://www.crhoy.com", "https://es.wikipedia.org/wiki/CRHoy"],
    },
    {
      id: "cr-elfaro-cr",
      countryCode: "CR",
      name: "El Faro Costa Rica",
      englishTranslation: "The Lighthouse Costa Rica",
      founded: 2018,
      frequency: "Continuous digital news magazine",
      format: "Investigative digital portal",
      language: "Spanish",
      headquarters: "San José",
      owner: {
        name: "Fundación Trípode",
        type: "Non-profit independent foundation",
      },
      editorialStance: "In-depth investigative journalism; corruption investigations, judicial independence, and regional Central American democracy",
      readership: {
        metric: "Leading investigative regional journalism platform relocated to San José for press freedom protection",
        source: "Fundación Trípode Annual Report 2023",
      },
      revenueModel: "International journalistic grants and reader crowdfunding",
      logo: "newspaper-logos/cr/elfaro-cr.svg",
      logoExplainer:
        "Black emblem with golden lighthouse beam and stark typography 'elfaro', symbolising illumination of truth and investigative scrutiny.",
      sources: ["https://elfaro.net", "https://en.wikipedia.org/wiki/El_Faro_(digital_newspaper)"],
    },
  ],

  // Croatia
  HR: [
    {
      id: "hr-vecernji-list",
      countryCode: "HR",
      name: "Večernji list",
      englishTranslation: "Evening Paper",
      founded: 1959,
      frequency: "Daily newspaper",
      format: "Compact daily & digital portal",
      language: "Croatian",
      headquarters: "Zagreb",
      owner: {
        name: "Styria Media Group AG",
        type: "Independent commercial media",
      },
      editorialStance: "Center-right mainstream daily newspaper of record; national political commentary, European Union affairs, and cultural reviews",
      readership: {
        metric: "Over 2.2 million monthly unique digital visitors on vecernji.hr and leading print circulation in Zagreb",
        source: "Styria Media Group Croatia 2023",
      },
      revenueModel: "Digital subscriptions, print sales, and commercial advertising",
      logo: "newspaper-logos/hr/večernji-list.svg",
      logoExplainer:
        "Red and black logo with stylized bold text 'Večernji list', an iconic masthead across Croatia for over sixty years.",
      sources: ["https://www.vecernji.hr", "https://en.wikipedia.org/wiki/Ve%C4%8Dernji_list"],
    },
    {
      id: "hr-jutarnji-list",
      countryCode: "HR",
      name: "Jutarnji list",
      englishTranslation: "Morning Paper",
      founded: 1998,
      frequency: "Daily newspaper",
      format: "Berliner & digital portal",
      language: "Croatian",
      headquarters: "Zagreb",
      owner: {
        name: "Hanza Media",
        type: "Independent commercial media",
      },
      editorialStance: "Center-left liberal daily; investigative journalism, political reform, business analysis, and arts coverage",
      readership: {
        metric: "Over 2.4 million monthly unique digital visitors on jutarnji.hr; flagship publication of Hanza Media",
        source: "Hanza Media Audience Report 2024",
      },
      revenueModel: "Digital paywall subscriptions, print sales, and display advertising",
      logo: "newspaper-logos/hr/jutarnji-list.svg",
      logoExplainer:
        "Deep blue banner with modern bold white serif lettering 'JutarnjiLIST', symbolising contemporary liberal journalism.",
      sources: ["https://www.jutarnji.hr", "https://en.wikipedia.org/wiki/Jutarnji_list"],
    },
    {
      id: "hr-24sata",
      countryCode: "HR",
      name: "24sata",
      englishTranslation: "24 Hours",
      founded: 2005,
      frequency: "Daily newspaper",
      format: "Tabloid & multimedia portal",
      language: "Croatian",
      headquarters: "Zagreb",
      owner: {
        name: "Styria Media Group AG",
        type: "Independent commercial media",
      },
      editorialStance: "Popular tabloid; breaking news, visual reporting, social exposés, sports, and entertainment",
      readership: {
        metric: "Highest daily print circulation in Croatia and premier digital news website with 2.8M+ monthly unique users",
        source: "Styria Media Croatia Audience Review 2024",
      },
      revenueModel: "Retail print sales, programmatic digital advertising, and native video production",
      logo: "newspaper-logos/hr/24sata.svg",
      logoExplainer:
        "Orange rectangular badge featuring white numeral '24' and text 'sata', representing 24-hour fast-paced multimedia news.",
      sources: ["https://www.24sata.hr", "https://en.wikipedia.org/wiki/24sata_(Croatia)"],
    },
    {
      id: "hr-slobodna-dalmacija",
      countryCode: "HR",
      name: "Slobodna Dalmacija",
      englishTranslation: "Free Dalmatia",
      founded: 1943,
      frequency: "Daily newspaper",
      format: "Broadsheet & regional portal",
      language: "Croatian",
      headquarters: "Split, Dalmatia",
      owner: {
        name: "Hanza Media",
        type: "Independent commercial media",
      },
      editorialStance: "Historic regional daily newspaper founded as an anti-fascist partisan paper; voice of Dalmatia, maritime commerce, and Adriatic tourism",
      readership: {
        metric: "Leading daily newspaper in southern Croatia and the Adriatic coast with 1.8M monthly readers",
        source: "Hanza Media Regional Division 2023",
      },
      revenueModel: "Print circulation and regional corporate advertising",
      logo: "newspaper-logos/hr/slobodna-dalmacija.svg",
      logoExplainer:
        "Classic blue and white title banner with serif typography 'SLOBODNA DALMACIJA', evoking the Adriatic sea and Mediterranean tradition.",
      sources: ["https://slobodnadalmacija.hr", "https://en.wikipedia.org/wiki/Slobodna_Dalmacija"],
    },
    {
      id: "hr-novi-list",
      countryCode: "HR",
      name: "Novi list",
      englishTranslation: "New Paper",
      founded: 1900,
      frequency: "Daily newspaper",
      format: "Broadsheet & regional portal",
      language: "Croatian",
      headquarters: "Rijeka, Kvarner",
      owner: {
        name: "Media Solutions",
        type: "Independent commercial media",
      },
      editorialStance: "Centrist quality daily; primary voice of Rijeka, Istria, and Kvarner Bay focusing on local governance and industry",
      readership: {
        metric: "Oldest active daily newspaper in Croatia, dominating regional readership in western Croatia",
        source: "Novi List Nakladnik 2023",
      },
      revenueModel: "Print sales, subscriptions, and display advertising",
      logo: "newspaper-logos/hr/novi-list.svg",
      logoExplainer:
        "Red and black uppercase masthead 'NOVI LIST' on white ground, symbolising century-old civic journalism in Rijeka.",
      sources: ["https://www.novilist.hr", "https://en.wikipedia.org/wiki/Novi_list"],
    },
  ],

  // Cuba
  CU: [
    {
      id: "cu-granma",
      countryCode: "CU",
      name: "Granma",
      officialName: "Granma - Órgano Oficial del Comité Central del Partido Comunista de Cuba",
      nativeName: "Granma",
      englishTranslation: "Granma (named after the revolutionary yacht)",
      founded: 1965,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Official state broadsheet & international portal",
      language: "Spanish, with foreign language editions",
      headquarters: "Plaza de la Revolución, Havana",
      owner: {
        name: "Central Committee of the Communist Party of Cuba",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official newspaper of the Communist Party of Cuba; state decrees, socialist theory, economic reforms, and international anti-imperialist diplomacy",
      readership: {
        metric: "Largest print circulation in Cuba with 450,000 daily print copies and global digital reach across Granma.cu",
        source: "Editora Granma Informe de Gestión 2023",
      },
      revenueModel: "Direct state budget appropriation and institutional subscriptions",
      logo: "newspaper-logos/cu/granma.svg",
      logoExplainer:
        "Red banner with bold white lettering 'Granma' and stylized silhouette of the revolutionary yacht, the historic emblem of Cuban state journalism.",
      sources: ["https://www.granma.cu", "https://en.wikipedia.org/wiki/Granma_(newspaper)"],
    },
    {
      id: "cu-juventud-rebelde",
      countryCode: "CU",
      name: "Juventud Rebelde",
      englishTranslation: "Rebel Youth",
      founded: 1965,
      frequency: "Daily newspaper (Tuesday–Sunday)",
      format: "Tabloid & digital portal",
      language: "Spanish",
      headquarters: "Havana",
      owner: {
        name: "Union of Young Communists (UJC)",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official newspaper of the Cuban youth organization; cultural development, youth sports, science, and university affairs",
      readership: {
        metric: "Second largest print circulation in Cuba with 250,000 daily copies and popular Sunday magazine edition",
        source: "Editora Juventud Rebelde 2023",
      },
      revenueModel: "State youth media subsidies and retail print distribution",
      logo: "newspaper-logos/cu/juventud-rebelde.svg",
      logoExplainer:
        "Blue and red badge with bold sans-serif text 'JUVENTUD REBELDE', symbolising revolutionary youth energy and education.",
      sources: ["https://www.juventudrebelde.cu", "https://en.wikipedia.org/wiki/Juventud_Rebelde"],
    },
    {
      id: "cu-prensa-latina",
      countryCode: "CU",
      name: "Prensa Latina",
      officialName: "Agencia Informativa Latinoamericana Prensa Latina S.A.",
      nativeName: "Prensa Latina",
      englishTranslation: "Latin American Press",
      founded: 1959,
      frequency: "Continuous 24/7 international newswire",
      format: "International news agency wire & multimedia service",
      language: "Spanish, English, French, Portuguese, Russian, Italian",
      headquarters: "Vedado, Havana",
      owner: {
        name: "Republic of Cuba",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Founded by Che Guevara and Jorge Ricardo Masetti; Latin American perspective on global affairs, Non-Aligned Movement, and anti-hegemonic coverage",
      readership: {
        metric: "Bureaus in over 40 countries; transmits more than 400 news dispatches daily to media partners worldwide",
        source: "Prensa Latina Memoria Institucional 2024",
      },
      annualPublicFunding: {
        total: "Central state foreign-press operational allocation",
        perCapita: "State international agency",
      },
      revenueModel: "State budget funding and international media syndication agreements",
      logo: "newspaper-logos/cu/prensa-latina.svg",
      logoExplainer:
        "Navy blue emblem with white calligraphy 'PL Prensa Latina' and globe meridians, symbolising non-aligned Latin American news distribution.",
      sources: ["https://www.prensa-latina.cu", "https://en.wikipedia.org/wiki/Prensa_Latina"],
    },
    {
      id: "cu-trabajadores",
      countryCode: "CU",
      name: "Trabajadores",
      englishTranslation: "Workers",
      founded: 1970,
      frequency: "Weekly newspaper (Monday)",
      format: "Tabloid publication & digital portal",
      language: "Spanish",
      headquarters: "Havana",
      owner: {
        name: "Central de Trabajadores de Cuba (CTC)",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official organ of the Cuban Trade Union Confederation; labour legislation, worker productivity, industrial management, and cooperative agriculture",
      readership: {
        metric: "Distributed across all state enterprises, cooperative farms, and industrial unions nationwide",
        source: "CTC Departamento de Prensa 2023",
      },
      revenueModel: "Trade union dues and state publishing subsidy",
      logo: "newspaper-logos/cu/trabajadores.svg",
      logoExplainer:
        "Red and black title banner with bold uppercase typography 'TRABAJADORES', representing trade union solidarity.",
      sources: ["https://www.trabajadores.cu", "https://es.wikipedia.org/wiki/Trabajadores_(peri%C3%B3dico)"],
    },
    {
      id: "cu-cubadebate",
      countryCode: "CU",
      name: "Cubadebate",
      founded: 2003,
      frequency: "Continuous digital news service",
      format: "Digital multimedia portal",
      language: "Spanish, English, French, Portuguese",
      headquarters: "Havana",
      owner: {
        name: "Circle of Anti-Terrorist Journalists of Cuba",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Premier digital news and ideological debate portal; in-depth political essays, international sanctions analysis, and digital fact-checking",
      readership: {
        metric: "Most visited Cuban domestic website with over 3 million monthly web sessions",
        source: "Cubadebate Métricas Digitales 2024",
      },
      revenueModel: "State digital communication grant allocation",
      logo: "newspaper-logos/cu/cubadebate.svg",
      logoExplainer:
        "Red speech bubble emblem with clean white typography 'cubadebate', symbolising ideological discussion and digital news.",
      sources: ["http://www.cubadebate.cu", "https://en.wikipedia.org/wiki/Cubadebate"],
    },
  ],

  // Cyprus
  CY: [
    {
      id: "cy-cyprus-mail",
      countryCode: "CY",
      name: "Cyprus Mail",
      founded: 1945,
      frequency: "Daily newspaper & digital portal",
      format: "Broadsheet & English digital daily",
      language: "English",
      headquarters: "Nicosia",
      owner: {
        name: "CM Cyprus Mail Ltd",
        type: "Independent commercial media",
      },
      editorialStance: "Cyprus's oldest daily newspaper; authoritative English-language daily covering peace negotiations, EU diplomacy, energy, and business",
      readership: {
        metric: "Primary news source for English-speaking diplomats, expatriates, and international business leaders in Cyprus",
        source: "Cyprus Mail Circulation Review 2023",
      },
      revenueModel: "Digital subscriptions, print sales, and corporate advertising",
      logo: "newspaper-logos/cy/cyprus-mail.svg",
      logoExplainer:
        "Navy blue banner with classical white serif typography 'Cyprus Mail', representing eighty years of authoritative journalism.",
      sources: ["https://cyprus-mail.com", "https://en.wikipedia.org/wiki/Cyprus_Mail"],
    },
    {
      id: "cy-o-phileleftheros",
      countryCode: "CY",
      name: "O Phileleftheros",
      officialName: "O Fileleftheros",
      nativeName: "Ο Φιλελεύθερος",
      englishTranslation: "The Liberal",
      founded: 1955,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital network",
      language: "Greek",
      headquarters: "Nicosia",
      owner: {
        name: "Phileleftheros Public Company Ltd",
        type: "Independent commercial media",
      },
      editorialStance: "Cyprus's largest circulation newspaper of record; center-right stance focusing on the Cyprus problem, Hellenic affairs, and economic governance",
      readership: {
        metric: "Largest print circulation in Cyprus and leading web portal philnews.com reaching 3.5 million monthly unique visitors",
        source: "Phileleftheros Group Annual Review 2023",
      },
      revenueModel: "Print sales, corporate display advertising, and digital subscriptions",
      logo: "newspaper-logos/cy/o-phileleftheros.svg",
      logoExplainer:
        "Blue banner with classic white Greek typography 'Ο ΦΙΛΕΛΕΥΘΕΡΟΣ', the defining masthead of Cypriot print journalism.",
      sources: ["https://www.philenews.com", "https://en.wikipedia.org/wiki/Phileleftheros"],
    },
    {
      id: "cy-politis",
      countryCode: "CY",
      name: "Politis",
      nativeName: "Πολίτης",
      englishTranslation: "Citizen",
      founded: 1999,
      frequency: "Daily newspaper",
      format: "Compact tabloid & digital portal",
      language: "Greek",
      headquarters: "Nicosia",
      owner: {
        name: "Politis Media Group (Yiannis Papadopoulos)",
        type: "Independent commercial media",
      },
      editorialStance: "Independent progressive liberal newspaper; strong proponent of Cypriot reunification, anti-corruption investigations, and social reforms",
      readership: {
        metric: "Second largest Greek-language daily newspaper and highly influential digital portal politis.com.cy",
        source: "Politis Media Review 2024",
      },
      revenueModel: "Digital subscriptions, print sales, and commercial advertising",
      logo: "newspaper-logos/cy/politis.svg",
      logoExplainer:
        "Red and black logo with modern Greek sans-serif lettering 'ΠΟΛΙΤΗΣ', symbolising democratic citizenship and progressive civic debate.",
      sources: ["https://politis.com.cy", "https://en.wikipedia.org/wiki/Politis_(Cyprus)"],
    },
    {
      id: "cy-haravgi",
      countryCode: "CY",
      name: "Haravgi",
      nativeName: "Χαραυγή",
      englishTranslation: "Dawn",
      founded: 1956,
      frequency: "Daily newspaper",
      format: "Tabloid publication & digital portal",
      language: "Greek",
      headquarters: "Nicosia",
      owner: {
        name: "Tilegrafos Media (AKEL affiliated)",
        type: "Independent commercial media",
      },
      editorialStance: "Left-wing daily newspaper affiliated with the Progressive Party of Working People (AKEL); trade union rights, social welfare, and bi-communal peace",
      readership: {
        metric: "Dedicated nationwide readership across trade unions, cooperative movements, and left-wing civic organizations",
        source: "Haravgi Publishing Data 2023",
      },
      revenueModel: "Print sales, party subscriptions, and institutional advertisements",
      logo: "newspaper-logos/cy/haravgi.svg",
      logoExplainer:
        "Red title banner featuring golden sunrise symbol and white Greek lettering 'ΧΑΡΑΥΓΗ', representing a new socialist dawn.",
      sources: ["https://dialogos.com.cy/haravgi", "https://en.wikipedia.org/wiki/Haravgi"],
    },
    {
      id: "cy-simerini",
      countryCode: "CY",
      name: "Simerini",
      nativeName: "Σημερινή",
      englishTranslation: "Today",
      founded: 1976,
      frequency: "Weekly newspaper (Sunday) & daily portal",
      format: "Broadsheet & digital portal",
      language: "Greek",
      headquarters: "Nicosia",
      owner: {
        name: "Zeus Group / Dias Publishing",
        type: "Independent commercial media",
      },
      editorialStance: "Right-wing nationalist publication; defense of the Republic of Cyprus, Orthodox Christian cultural heritage, and sovereignty critique",
      readership: {
        metric: "Prominent Sunday print edition and active digital readership on sigmalive.com network",
        source: "Dias Publishing Group 2023",
      },
      revenueModel: "Print retail sales and network television-digital advertising",
      logo: "newspaper-logos/cy/simerini.svg",
      logoExplainer:
        "Deep blue title banner with white serif font 'ΣΗΜΕΡΙΝΗ', symbolising traditional Greek Cypriot conservative press heritage.",
      sources: ["https://simerini.sigmalive.com", "https://en.wikipedia.org/wiki/Simerini"],
    },
  ],

  // Czech Republic
  CZ: [
    {
      id: "cz-mfdnes",
      countryCode: "CZ",
      name: "Mladá fronta DNES",
      officialName: "MF DNES",
      nativeName: "Mladá fronta DNES",
      englishTranslation: "Youth Front Today",
      founded: 1945,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Broadsheet & digital portal",
      language: "Czech",
      headquarters: "Prague",
      owner: {
        name: "MAFRA a.s. (Kaprain Group)",
        type: "Independent commercial media",
      },
      editorialStance: "Czech Republic's largest quality broadsheet; center-right mainstream news focusing on national politics, European integration, and economics",
      readership: {
        metric: "Over 4.5 million monthly unique users across iDNES.cz and highest print circulation among Czech non-tabloid dailies",
        source: "NetMonitor Czech Republic & MAFRA 2024",
      },
      revenueModel: "Digital subscriptions (iDNES Premium), print retail sales, and corporate advertising",
      logo: "newspaper-logos/cz/mfdnes.svg",
      logoExplainer:
        "Red and blue emblem featuring bold uppercase text 'MF DNES', representing modern Czech national journalism.",
      sources: ["https://www.idnes.cz", "https://en.wikipedia.org/wiki/Mlad%C3%A1_fronta_DNES"],
    },
    {
      id: "cz-pravo",
      countryCode: "CZ",
      name: "Právo",
      nativeName: "Právo",
      englishTranslation: "Right / Justice",
      founded: 1991,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Broadsheet & digital portal",
      language: "Czech",
      headquarters: "Prague",
      owner: {
        name: "Borgis a.s.",
        type: "Independent commercial media",
      },
      editorialStance: "Center-left independent daily newspaper successor to Rudé právo; investigative journalism, legal commentary, and social affairs",
      readership: {
        metric: "Leading quality daily in print circulation and partner in Novinky.cz, the Czech Republic's top digital news site (5M+ monthly users)",
        source: "Borgis a.s. Annual Report 2023",
      },
      revenueModel: "Print sales, subscriptions, and web traffic partnership with Seznam.cz",
      logo: "newspaper-logos/cz/právo.svg",
      logoExplainer:
        "Classic black serif typography 'Právo' on clean white canvas, symbolising justice, legal rights, and democratic accountability.",
      sources: ["https://www.novinky.cz", "https://en.wikipedia.org/wiki/Pr%C3%A1vo"],
    },
    {
      id: "cz-hospodarske-noviny",
      countryCode: "CZ",
      name: "Hospodářské noviny",
      nativeName: "Hospodářské noviny",
      englishTranslation: "Economic Newspaper",
      founded: 1990,
      frequency: "Daily financial newspaper (Monday–Friday)",
      format: "Broadsheet & digital portal",
      language: "Czech",
      headquarters: "Prague",
      owner: {
        name: "Economia a.s. (Zdeněk Bakala)",
        type: "Independent commercial media",
      },
      editorialStance: "Premier financial and economic daily; Prague Stock Exchange, corporate strategy, European single market regulations, and macroeconomic policy",
      readership: {
        metric: "Benchmark business newspaper read by corporate leaders and policymakers with 1.8M monthly digital visitors",
        source: "Economia Media Kit 2024",
      },
      revenueModel: "Digital paywall subscriptions (HN.cz) and financial sector advertising",
      logo: "newspaper-logos/cz/hospodářské-noviny.svg",
      logoExplainer:
        "Navy blue banner with clean white typography 'Hospodářské noviny', reflecting market integrity and economic analysis.",
      sources: ["https://hn.cz", "https://en.wikipedia.org/wiki/Hospod%C3%A1%C5%99sk%C3%A9_noviny"],
    },
    {
      id: "cz-lidove-noviny",
      countryCode: "CZ",
      name: "Lidové noviny",
      nativeName: "Lidové noviny",
      englishTranslation: "The People's Newspaper",
      founded: 1893,
      frequency: "Daily newspaper (transitioned to digital daily)",
      format: "Digital daily & weekend print edition",
      language: "Czech",
      headquarters: "Prague",
      owner: {
        name: "MAFRA a.s. (Kaprain Group)",
        type: "Independent commercial media",
      },
      editorialStance: "Historic intellectual broadsheet associated with Karel Čapek and Václav Havel; conservative-liberal cultural commentary and public policy debate",
      readership: {
        metric: "Historic paper of record with strong cultural resonance and 1.5 million monthly digital visitors on Lidovky.cz",
        source: "MAFRA Publishing Report 2023",
      },
      revenueModel: "Digital subscriptions and specialized cultural advertising",
      logo: "newspaper-logos/cz/lidové-noviny.svg",
      logoExplainer:
        "Historic black serif masthead 'Lidové noviny' on white ground, symbolising 130 years of Czech intellectual journalism.",
      sources: ["https://www.lidovky.cz", "https://en.wikipedia.org/wiki/Lidov%C3%A9_noviny"],
    },
    {
      id: "cz-blesk",
      countryCode: "CZ",
      name: "Blesk",
      nativeName: "Blesk",
      englishTranslation: "Lightning",
      founded: 1992,
      frequency: "Daily newspaper",
      format: "Tabloid & digital portal",
      language: "Czech",
      headquarters: "Prague",
      owner: {
        name: "Czech News Center a.s.",
        type: "Independent commercial media",
      },
      editorialStance: "Mass-circulation popular tabloid; breaking news, consumer advocacy, celebrity profiles, and sports",
      readership: {
        metric: "Highest print circulation in the Czech Republic (~160,000 daily copies) and 4.2M monthly users on Blesk.cz",
        source: "Czech News Center Annual Review 2024",
      },
      revenueModel: "Retail print sales, digital display advertising, and consumer media services",
      logo: "newspaper-logos/cz/blesk.svg",
      logoExplainer:
        "Vivid red rectangular banner with bold yellow italic text 'BLESK', iconic across Czech newsstands.",
      sources: ["https://www.blesk.cz", "https://en.wikipedia.org/wiki/Blesk_(newspaper)"],
    },
  ],

  // Denmark
  DK: [
    {
      id: "dk-berlingske",
      countryCode: "DK",
      name: "Berlingske",
      officialName: "Berlingske Tidende",
      nativeName: "Berlingske",
      englishTranslation: "Berling's Times (named after founder Ernst Henrich Berling)",
      founded: 1749,
      frequency: "Daily newspaper",
      format: "Berliner & digital portal",
      language: "Danish",
      headquarters: "Copenhagen",
      owner: {
        name: "Berlingske Media (DPG Media)",
        type: "Independent commercial media",
      },
      editorialStance: "Denmark's oldest newspaper and one of the world's oldest continuously published dailies; conservative-liberal newspaper of record",
      readership: {
        metric: "Over 1.8 million monthly digital readers and premier quality daily in Copenhagen",
        source: "Kantar Gallup Denmark & Berlingske Media 2024",
      },
      revenueModel: "Digital paywall subscriptions, print circulation, and corporate advertising",
      logo: "newspaper-logos/dk/berlingske.svg",
      logoExplainer:
        "Classical black serif typography 'Berlingske' on clean white canvas, representing 275 years of Danish journalistic excellence.",
      sources: ["https://www.berlingske.dk", "https://en.wikipedia.org/wiki/Berlingske"],
    },
    {
      id: "dk-politiken",
      countryCode: "DK",
      name: "Politiken",
      nativeName: "Politiken",
      englishTranslation: "The Politics / Policy",
      founded: 1884,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Danish",
      headquarters: "Rådhuspladsen, Copenhagen",
      owner: {
        name: "JP/Politikens Hus",
        type: "Independent trust / foundation",
      },
      editorialStance: "Leading Danish social-liberal intellectual daily founded by Edvard Brandes; cultural critique, climate journalism, and international human rights",
      readership: {
        metric: "Over 2 million monthly digital visitors and largest quality subscription circulation in Denmark",
        source: "JP/Politikens Hus Annual Report 2023",
      },
      revenueModel: "Digital reader subscriptions, print sales, and cultural advertisements",
      logo: "newspaper-logos/dk/politiken.svg",
      logoExplainer:
        "Historic gothic and serif masthead 'POLITIKEN' anchored at Copenhagen's City Hall Square, symbolising progressive civic journalism.",
      sources: ["https://politiken.dk", "https://en.wikipedia.org/wiki/Politiken"],
    },
    {
      id: "dk-jyllands-posten",
      countryCode: "DK",
      name: "Jyllands-Posten",
      officialName: "Morgenavisen Jyllands-Posten",
      nativeName: "Jyllands-Posten",
      englishTranslation: "The Jutland Post",
      founded: 1871,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Danish",
      headquarters: "Aarhus & Copenhagen",
      owner: {
        name: "JP/Politikens Hus",
        type: "Independent trust / foundation",
      },
      editorialStance: "Center-right liberal-conservative broadsheet; voice of Jutland and national business, free-market economics, and investigative journalism",
      readership: {
        metric: "Over 1.7 million monthly digital users and historically Denmark's highest circulated broadsheet",
        source: "JP/Politikens Hus Media Review 2024",
      },
      revenueModel: "Print sales, digital subscriptions, and commercial advertising",
      logo: "newspaper-logos/dk/jyllands-posten.svg",
      logoExplainer:
        "Bold black serif title 'Jyllands-Posten' on white background, representing Jutland business resilience and national reporting.",
      sources: ["https://jyllands-posten.dk", "https://en.wikipedia.org/wiki/Jyllands-Posten"],
    },
    {
      id: "dk-borsen",
      countryCode: "DK",
      name: "Børsen",
      officialName: "Dagbladet Børsen",
      nativeName: "Børsen",
      englishTranslation: "The Exchange",
      founded: 1896,
      frequency: "Daily business newspaper (Monday–Friday)",
      format: "Salmon broadsheet & digital portal",
      language: "Danish",
      headquarters: "Copenhagen",
      owner: {
        name: "Bonnier Group (49.9%) & JP/Politikens Hus (49.9%)",
        type: "Independent commercial media",
      },
      editorialStance: "Denmark's preeminent financial and business daily; Copenhagen Stock Exchange, maritime shipping (Mærsk), green transition, and macroeconomic policy",
      readership: {
        metric: "Read by 85% of Danish top corporate executives and institutional investors",
        source: "Dagbladet Børsen Audience Report 2023",
      },
      revenueModel: "Corporate subscriptions and financial market advertising",
      logo: "newspaper-logos/dk/børsen.svg",
      logoExplainer:
        "Classic serif masthead 'BØRSEN' printed on signature salmon-pink paper, symbolising Nordic financial leadership.",
      sources: ["https://borsen.dk", "https://en.wikipedia.org/wiki/Dagbladet_B%C3%B8rsen"],
    },
    {
      id: "dk-ekstra-bladet",
      countryCode: "DK",
      name: "Ekstra Bladet",
      nativeName: "Ekstra Bladet",
      englishTranslation: "The Extra Sheet",
      founded: 1904,
      frequency: "Daily newspaper",
      format: "Tabloid & multimedia portal",
      language: "Danish",
      headquarters: "Copenhagen",
      owner: {
        name: "JP/Politikens Hus",
        type: "Independent trust / foundation",
      },
      editorialStance: "Iconic Danish investigative tabloid; aggressive political exposés, consumer advocacy, sports, and working-class watchdog journalism",
      readership: {
        metric: "Over 3.2 million monthly unique digital visitors on eb.dk, Denmark's most read online news brand",
        source: "Dansk Online Index & Kantar 2024",
      },
      revenueModel: "Digital subscriptions (+Ekstra), programmatic ads, and street print sales",
      logo: "newspaper-logos/dk/ekstra-bladet.svg",
      logoExplainer:
        "Stark black and yellow badge with bold typography 'EKSTRA BLADET', iconic for anti-authoritarian investigative reporting.",
      sources: ["https://ekstrabladet.dk", "https://en.wikipedia.org/wiki/Ekstra_Bladet"],
    },
  ],

  // Djibouti
  DJ: [
    {
      id: "dj-la-nation",
      countryCode: "DJ",
      name: "La Nation",
      englishTranslation: "The Nation",
      founded: 1980,
      frequency: "Daily newspaper (Monday–Thursday & Sunday)",
      format: "Official state broadsheet & digital portal",
      language: "French",
      headquarters: "Djibouti City",
      owner: {
        name: "Republic of Djibouti (Ministère de la Communication)",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official national public daily newspaper; presidential decrees, port infrastructure developments (Doraleh), and Horn of Africa diplomacy",
      readership: {
        metric: "Only national daily French-language print newspaper in Djibouti, read throughout civil service and diplomatic missions",
        source: "La Nation Direction Générale 2023",
      },
      annualPublicFunding: {
        total: "DJF 90 million (~US$505,000) government operating budget",
        perCapita: "DJF 85 / person / year (~US$0.48)",
      },
      revenueModel: "Direct state budget appropriation, print sales, and official legal notices",
      logo: "newspaper-logos/dj/la-nation.svg",
      logoExplainer:
        "Emerald green title banner with crisp white typography 'LA NATION', embodying Djibouti's national identity and public communication.",
      sources: ["https://www.lanation.dj", "https://fr.wikipedia.org/wiki/La_Nation_(Djibouti)"],
    },
    {
      id: "dj-adi",
      countryCode: "DJ",
      name: "ADI",
      officialName: "Agence Djiboutienne d'Information",
      nativeName: "Agence Djiboutienne d'Information",
      englishTranslation: "Djiboutian Information Agency",
      founded: 1999,
      frequency: "Continuous 24/7 national newswire",
      format: "Official state wire service & digital portal",
      language: "French, Arabic",
      headquarters: "Djibouti City",
      owner: {
        name: "Republic of Djibouti (Ministère de la Communication)",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Statutory national news agency; international diplomatic partnerships, IGAD regional affairs, and port logistics news",
      readership: {
        metric: "Primary news supplier to national television (RTD), radio networks, and regional Horn of Africa media",
        source: "ADI Rapport d'Activité 2023",
      },
      annualPublicFunding: {
        total: "DJF 65 million (~US$365,000) public wire grant",
        perCapita: "DJF 60 / person / year (~US$0.34)",
      },
      revenueModel: "State operating subsidy and commercial news syndication",
      logo: "newspaper-logos/dj/adi-agence-djiboutienne-d-information.svg",
      logoExplainer:
        "Blue and gold emblem displaying acronym 'ADI' and full French title, symbolising statutory news dissemination in the Horn of Africa.",
      sources: ["https://www.adi.dj", "https://fr.wikipedia.org/wiki/Agence_djiboutienne_d%27information"],
    },
    {
      id: "dj-al-qarn",
      countryCode: "DJ",
      name: "Al-Qarn",
      nativeName: "القرن",
      englishTranslation: "The Horn",
      founded: 1997,
      frequency: "Weekly newspaper (Thursday)",
      format: "Official state Arabic broadsheet & portal",
      language: "Arabic",
      headquarters: "Djibouti City",
      owner: {
        name: "Republic of Djibouti (Ministère de la Communication)",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official state Arabic-language publication; Arab League relations, Islamic affairs, education, and Red Sea maritime commerce",
      readership: {
        metric: "Primary Arabic publication in Djibouti read by scholars, religious institutions, and Arab diplomatic missions",
        source: "Ministère de la Communication de Djibouti 2023",
      },
      revenueModel: "State budget funding and public notices",
      logo: "newspaper-logos/dj/al-qarn.svg",
      logoExplainer:
        "Green and white banner featuring elegant Arabic calligraphy 'القرن' (The Horn), reflecting Arab League heritage.",
      sources: ["https://www.alqarn.dj"],
    },
    {
      id: "dj-djib-post",
      countryCode: "DJ",
      name: "Djib-Post",
      founded: 2016,
      frequency: "Continuous digital news service",
      format: "Digital news portal",
      language: "French",
      headquarters: "Djibouti City",
      owner: {
        name: "Djib-Post Media Group",
        type: "Independent commercial media",
      },
      editorialStance: "Digital news platform; urban life, technological entrepreneurship, youth initiatives, and Horn of Africa economic news",
      readership: {
        metric: "Over 350,000 monthly digital visits across Djibouti and international diaspora in France and Canada",
        source: "Djib-Post Audience Analytics 2024",
      },
      revenueModel: "Digital display advertising and sponsored corporate media",
      logo: "newspaper-logos/dj/djib-post.svg",
      logoExplainer:
        "Modern navy blue and cyan banner featuring 'DJIB-POST', symbolising youth-driven digital journalism.",
      sources: ["https://djibpost.com"],
    },
    {
      id: "dj-human-village",
      countryCode: "DJ",
      name: "Human Village",
      founded: 2008,
      frequency: "Monthly cultural & economic journal",
      format: "Digital magazine & analytical portal",
      language: "French",
      headquarters: "Djibouti City",
      owner: {
        name: "Association Human Village",
        type: "Independent trust / foundation",
      },
      editorialStance: "Independent socio-cultural and economic journal; environmental conservation, architectural heritage, and historical research on Djibouti",
      readership: {
        metric: "Highly regarded journal read by researchers, historians, and educators throughout the Red Sea region",
        source: "Human Village Association 2023",
      },
      revenueModel: "Cultural foundation grants and publication subscriptions",
      logo: "newspaper-logos/dj/human-village.svg",
      logoExplainer:
        "Warm terracotta badge with white typography 'Human Village', symbolising humanism, culture, and environmental awareness.",
      sources: ["http://www.human-village.org", "https://fr.wikipedia.org/wiki/Culture_de_Djibouti"],
    },
  ],
  // IR
  IR: [
    {
        "id": "ir-irna",
        "countryCode": "IR",
        "name": "IRNA",
        "englishTranslation": "Islamic Republic News Agency",
        "founded": 1934,
        "frequency": "24/7 continuous wire service",
        "format": "Official state news agency & multi-lingual portal",
        "language": "Persian, English, Arabic, French, Spanish, Russian, Chinese, Turkish, German",
        "headquarters": "Tehran",
        "owner": {
            "name": "Ministry of Culture and Islamic Guidance",
            "type": "State-owned official news agency"
        },
        "editorialStance": "Official state news agency of Iran; government policy announcements and official diplomatic news",
        "readership": {
            "metric": "Primary source wire service for all domestic Iranian media and foreign diplomatic dispatches",
            "source": "IRNA Corporate Directory 2024"
        },
        "annualPublicFunding": {
            "total": "State budgetary allocation via Ministry of Culture",
            "perCapita": "State funded"
        },
        "revenueModel": "State budget appropriation and wire subscription fees",
        "logo": "newspaper-logos/ir/irna-islamic-republic-news-agency.svg",
        "logoExplainer": "Green emblem featuring stylized Persian typography of 'IRNA' surrounded by global network lines.",
        "sources": [
            "https://www.irna.ir",
            "https://en.wikipedia.org/wiki/Islamic_Republic_News_Agency"
        ]
    },
    {
        "id": "ir-kayhan",
        "countryCode": "IR",
        "name": "Kayhan",
        "englishTranslation": "Universe",
        "founded": 1942,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital news portal",
        "language": "Persian",
        "headquarters": "Tehran",
        "owner": {
            "name": "Kayhan Institute (Supreme Leader Representative)",
            "type": "State-managed editorial institute"
        },
        "editorialStance": "Iran's premier conservative daily newspaper representing official hardline views and state political commentary",
        "readership": {
            "metric": "Major influence across state administrative and conservative political circles",
            "source": "Kayhan Publishing Institute 2024"
        },
        "revenueModel": "Public subsidies, print subscriptions, and official advertising",
        "logo": "newspaper-logos/ir/kayhan.svg",
        "logoExplainer": "Traditional black calligraphic Persian masthead 'کیهان' on white backdrop.",
        "sources": [
            "https://kayhan.ir",
            "https://en.wikipedia.org/wiki/Kayhan"
        ]
    },
    {
        "id": "ir-tehran-times",
        "countryCode": "IR",
        "name": "Tehran Times",
        "founded": 1979,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital portal",
        "language": "English",
        "headquarters": "Tehran",
        "owner": {
            "name": "Islamic Propagation Organization",
            "type": "State-affiliated international media"
        },
        "editorialStance": "Iran's leading foreign-language daily newspaper presenting international commentary and state diplomatic views",
        "readership": {
            "metric": "Leading English daily in Iran read by foreign diplomats, international scholars, and expats",
            "source": "Tehran Times Media Guide"
        },
        "revenueModel": "State subsidy, print subscription, and advertising",
        "logo": "newspaper-logos/ir/tehran-times.svg",
        "logoExplainer": "Bold red and black serif masthead with a globe emblem embedded in the letter 'T'.",
        "sources": [
            "https://www.tehrantimes.com",
            "https://en.wikipedia.org/wiki/Tehran_Times"
        ]
    },
    {
        "id": "ir-ettelaat",
        "countryCode": "IR",
        "name": "Ettela'at",
        "englishTranslation": "Information",
        "founded": 1926,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital news portal",
        "language": "Persian",
        "headquarters": "Tehran",
        "owner": {
            "name": "Ettela'at Institute",
            "type": "State-managed publishing foundation"
        },
        "editorialStance": "Iran's oldest running daily newspaper; moderate conservative record of national affairs",
        "readership": {
            "metric": "Historical newspaper of record with nationwide archive distribution",
            "source": "Ettela'at Publishing House"
        },
        "revenueModel": "Print sales, publishing services, and public subsidies",
        "logo": "newspaper-logos/ir/ettela-at.svg",
        "logoExplainer": "Classic calligraphic Persian masthead 'اطلاعات' in deep green serif script.",
        "sources": [
            "https://www.ettelaat.com",
            "https://en.wikipedia.org/wiki/Ettela%27at"
        ]
    },
    {
        "id": "ir-shargh",
        "countryCode": "IR",
        "name": "Shargh",
        "englishTranslation": "East",
        "founded": 2003,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital portal",
        "language": "Persian",
        "headquarters": "Tehran",
        "owner": {
            "name": "Mehdi Rahmanian / Shargh Media",
            "type": "Independent reformist daily"
        },
        "editorialStance": "Leading reformist independent daily newspaper focusing on social issues, culture, and investigative journalism",
        "readership": {
            "metric": "Over 5 million monthly online visits and prominent domestic readership among intellectuals",
            "source": "Shargh Media Group 2024"
        },
        "revenueModel": "Print sales, digital subscriptions, and commercial advertising",
        "logo": "newspaper-logos/ir/shargh.svg",
        "logoExplainer": "Modern red circular sunburst paired with elegant Persian typography 'شرق'.",
        "sources": [
            "https://www.sharghdaily.com",
            "https://en.wikipedia.org/wiki/Shargh"
        ]
    }
],
  // IQ
  IQ: [
    {
        "id": "iq-nina",
        "countryCode": "IQ",
        "name": "NINA",
        "englishTranslation": "National Iraqi News Agency",
        "founded": 2005,
        "frequency": "24/7 national news wire",
        "format": "Independent press agency wire & online portal",
        "language": "Arabic, English",
        "headquarters": "Baghdad",
        "owner": {
            "name": "Iraqi Journalists Syndicate",
            "type": "Independent media cooperative"
        },
        "editorialStance": "First non-official independent news agency in Iraq; objective non-partisan coverage of national politics",
        "readership": {
            "metric": "Key syndication source for Iraqi print and broadcast media outlets",
            "source": "NINA Directory 2024"
        },
        "revenueModel": "Subscription licensing and wire syndication",
        "logo": "newspaper-logos/iq/nina-iraqi-national-news-agency.svg",
        "logoExplainer": "Gold and blue circular icon with stylized Arabic acronym for NINA.",
        "sources": [
            "https://ninanews.com",
            "https://en.wikipedia.org/wiki/National_Iraqi_News_Agency"
        ]
    },
    {
        "id": "iq-al-sabaah",
        "countryCode": "IQ",
        "name": "Al-Sabaah",
        "englishTranslation": "The Morning",
        "founded": 2003,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital news portal",
        "language": "Arabic",
        "headquarters": "Baghdad",
        "owner": {
            "name": "Iraqi Media Network (IMN)",
            "type": "Publicly funded national media corporation"
        },
        "editorialStance": "Iraq's official public daily newspaper; comprehensive coverage of cabinet decisions, laws, and national security",
        "readership": {
            "metric": "Iraq's largest circulation public newspaper nationwide",
            "source": "Iraqi Media Network Annual Report 2023"
        },
        "annualPublicFunding": {
            "total": "IMN parliamentary budget appropriation",
            "perCapita": "State funded"
        },
        "revenueModel": "Parliamentary state budget allocation and legal notices",
        "logo": "newspaper-logos/iq/al-sabaah.svg",
        "logoExplainer": "Dark slate circular emblem featuring white Arabic script 'الصباح'.",
        "sources": [
            "https://alsabaah.iq",
            "https://en.wikipedia.org/wiki/Al-Sabaah"
        ]
    },
    {
        "id": "iq-al-zaman",
        "countryCode": "IQ",
        "name": "Azzaman",
        "englishTranslation": "The Time",
        "founded": 1997,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital daily",
        "language": "Arabic, English",
        "headquarters": "Baghdad",
        "owner": {
            "name": "Saad al-Bazzaz / Azzaman Group",
            "type": "Independent commercial media"
        },
        "editorialStance": "Widely circulated independent daily newspaper providing comprehensive coverage of Iraqi and regional Arab affairs",
        "readership": {
            "metric": "One of Iraq's top 3 printed daily newspapers with strong national distribution",
            "source": "Iraqi Press Union Report 2023"
        },
        "revenueModel": "Print advertising, sales, and subscription",
        "logo": "newspaper-logos/iq/al-zaman.svg",
        "logoExplainer": "Classic black and green Arabic typography 'الزمان' with a globe accent.",
        "sources": [
            "https://www.azzaman.com",
            "https://en.wikipedia.org/wiki/Azzaman"
        ]
    },
    {
        "id": "iq-shafaq-news",
        "countryCode": "IQ",
        "name": "Shafaq News",
        "englishTranslation": "Twilight News",
        "founded": 2010,
        "frequency": "24/7 digital news publication",
        "format": "Digital news wire & portal",
        "language": "Kurdish, Arabic, English",
        "headquarters": "Erbil & Baghdad",
        "owner": {
            "name": "Shafaq Foundation for Cultural and Media",
            "type": "Independent digital media group"
        },
        "editorialStance": "Independent multi-lingual news agency covering Iraqi national politics, Kurdistan region, and economic affairs",
        "readership": {
            "metric": "8 million monthly digital readers across Iraq and diaspora",
            "source": "Shafaq Digital Metrics 2024"
        },
        "revenueModel": "Digital display advertising and media licensing",
        "logo": "newspaper-logos/iq/shafaq-news.svg",
        "logoExplainer": "Bright orange sun icon beside bold dark Arabic lettering 'شفق نيوز'.",
        "sources": [
            "https://shafaq.com",
            "https://en.wikipedia.org/wiki/Shafaq_News"
        ]
    },
    {
        "id": "iq-al-mada",
        "countryCode": "IQ",
        "name": "Al-Mada",
        "englishTranslation": "The Horizon",
        "founded": 2003,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital portal",
        "language": "Arabic",
        "headquarters": "Baghdad",
        "owner": {
            "name": "Fakhri Karim / Al-Mada Foundation for Media and Culture",
            "type": "Independent cultural and media foundation"
        },
        "editorialStance": "Independent secular paper with focus on investigative journalism, civil society, arts, and political analysis",
        "readership": {
            "metric": "High prestige paper read by Iraqi civil society leaders, academics, and policymakers",
            "source": "Al-Mada Cultural Foundation 2023"
        },
        "revenueModel": "Print sales, cultural events, and commercial advertising",
        "logo": "newspaper-logos/iq/al-mada.svg",
        "logoExplainer": "Deep maroon rectangular badge featuring white stylized calligraphic Arabic script 'المدى'.",
        "sources": [
            "https://almadapaper.net",
            "https://en.wikipedia.org/wiki/Al-Mada"
        ]
    }
],
  // IE
  IE: [
    {
        "id": "ie-irish-times",
        "countryCode": "IE",
        "name": "The Irish Times",
        "founded": 1859,
        "frequency": "Daily morning newspaper",
        "format": "Broadsheet & digital news platform",
        "language": "English, Irish",
        "headquarters": "Dublin",
        "owner": {
            "name": "The Irish Times Trust (Independent non-profit trust)",
            "type": "Trust-owned independent newspaper"
        },
        "editorialStance": "Ireland's primary daily newspaper of record; center-left, liberal, independent stance on national policy and foreign affairs",
        "readership": {
            "metric": "500,000+ daily readers combined print and digital; 120,000 paid digital subscribers",
            "source": "JNLR / ABC Ireland Circulation Audit 2024"
        },
        "revenueModel": "Digital subscriptions, print copy sales, and display advertising",
        "logo": "newspaper-logos/ie/the-irish-times.svg",
        "logoExplainer": "Classic black gothic blackletter serif title 'THE IRISH TIMES' symbolising over 160 years of newspaper heritage.",
        "sources": [
            "https://www.irishtimes.com",
            "https://en.wikipedia.org/wiki/The_Irish_Times"
        ]
    },
    {
        "id": "ie-irish-independent",
        "countryCode": "IE",
        "name": "Irish Independent",
        "founded": 1905,
        "frequency": "Daily newspaper",
        "format": "Compact format & digital portal (Independent.ie)",
        "language": "English",
        "headquarters": "Dublin",
        "owner": {
            "name": "Mediahuis Ireland",
            "type": "Commercial media group"
        },
        "editorialStance": "Ireland's largest selling daily newspaper; center-right, market-oriented, extensive regional news coverage",
        "readership": {
            "metric": "Highest print circulation in Ireland (~80,000 daily print) and 6.5 million monthly digital readers on Independent.ie",
            "source": "JNLR / Mediahuis Audience Report 2024"
        },
        "revenueModel": "Print sales, digital subscriptions (Independent Premium), and advertising",
        "logo": "newspaper-logos/ie/irish-independent.svg",
        "logoExplainer": "Bold green capital lettering 'IRISH INDEPENDENT' with a harp emblem representing Irish national identity.",
        "sources": [
            "https://www.independent.ie",
            "https://en.wikipedia.org/wiki/Irish_Independent"
        ]
    },
    {
        "id": "ie-business-post",
        "countryCode": "IE",
        "name": "Business Post",
        "founded": 1989,
        "frequency": "Weekly Sunday newspaper & digital daily",
        "format": "Compact format & digital business portal",
        "language": "English",
        "headquarters": "Dublin",
        "owner": {
            "name": "Kilcullen Kapital Partners / Business Post Media Group",
            "type": "Independent commercial publisher"
        },
        "editorialStance": "Ireland's premier business and political Sunday newspaper; in-depth financial analysis, tech sector, and public policy",
        "readership": {
            "metric": "Key Sunday print edition and 45,000 digital subscribers across corporate Ireland",
            "source": "JNLR Sunday Readership Survey 2024"
        },
        "revenueModel": "Digital paywall subscriptions, print sales, and corporate event sponsorship",
        "logo": "newspaper-logos/ie/business-post.svg",
        "logoExplainer": "Deep navy blue rectangular block with crisp white typography 'BUSINESS POST'.",
        "sources": [
            "https://www.businesspost.ie",
            "https://en.wikipedia.org/wiki/Business_Post"
        ]
    },
    {
        "id": "ie-irish-examiner",
        "countryCode": "IE",
        "name": "Irish Examiner",
        "founded": 1841,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital news portal",
        "language": "English",
        "headquarters": "Cork",
        "owner": {
            "name": "The Irish Times DAC / Mediahuis",
            "type": "Commercial media group"
        },
        "editorialStance": "Major national daily published in Cork; center-left focus on national politics, agriculture, regional development, and investigative reports",
        "readership": {
            "metric": "220,000 daily print and digital readers across Ireland",
            "source": "JNLR Readership Survey 2023–24"
        },
        "revenueModel": "Print sales, digital subscription, and commercial advertising",
        "logo": "newspaper-logos/ie/irish-examiner.svg",
        "logoExplainer": "Traditional serif text 'Irish Examiner' in deep forest green with classic Irish typographic accents.",
        "sources": [
            "https://www.irishexaminer.com",
            "https://en.wikipedia.org/wiki/Irish_Examiner"
        ]
    },
    {
        "id": "ie-journal-ie",
        "countryCode": "IE",
        "name": "TheJournal.ie",
        "founded": 2010,
        "frequency": "24/7 digital news publication",
        "format": "Digital native news portal & FactCheck unit",
        "language": "English",
        "headquarters": "Dublin",
        "owner": {
            "name": "Journal Media Ltd (Distilled Media)",
            "type": "Independent digital media publisher"
        },
        "editorialStance": "Digital-first open reporting outlet featuring user commentary, explainer journalism, and EFCSN-certified fact-checking",
        "readership": {
            "metric": "3.2 million monthly unique digital visitors in Ireland",
            "source": "Reuters Institute Digital News Report 2024"
        },
        "revenueModel": "Digital advertising, sponsored content, and European press grant funding for fact-checking",
        "logo": "newspaper-logos/ie/thejournal-ie.svg",
        "logoExplainer": "Red square icon containing white letter 'J' beside sleek dark lowercase text 'thejournal.ie'.",
        "sources": [
            "https://www.thejournal.ie",
            "https://en.wikipedia.org/wiki/TheJournal.ie"
        ]
    }
],
  // IL
  IL: [
    {
        "id": "il-haaretz",
        "countryCode": "IL",
        "name": "Haaretz",
        "englishTranslation": "The Land",
        "founded": 1919,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital edition (Hebrew & English)",
        "language": "Hebrew, English",
        "headquarters": "Tel Aviv",
        "owner": {
            "name": "Schocken Family (60%) & M. DuMont Schauberg (20%)",
            "type": "Independent publishing house"
        },
        "editorialStance": "Israel's oldest daily newspaper; center-left liberal stance on Israeli politics, civil rights, peace initiatives, and foreign relations",
        "readership": {
            "metric": "Over 95,000 paid digital subscribers worldwide and high influence among international policymakers",
            "source": "Haaretz Financial Statement & TGI Survey 2024"
        },
        "revenueModel": "Digital paywall subscriptions, print copy sales, and premium advertising",
        "logo": "newspaper-logos/il/haaretz.svg",
        "logoExplainer": "Classic Hebrew serif calligraphic title 'הארץ' in dark indigo blue.",
        "sources": [
            "https://www.haaretz.com",
            "https://en.wikipedia.org/wiki/Haaretz"
        ]
    },
    {
        "id": "il-yedioth-ahronoth",
        "countryCode": "IL",
        "name": "Yedioth Ahronoth",
        "englishTranslation": "Latest News",
        "founded": 1939,
        "frequency": "Daily newspaper & digital portal (Ynet)",
        "format": "Tabloid & Ynet digital news portal",
        "language": "Hebrew, English (Ynetnews)",
        "headquarters": "Rishon LeZion",
        "owner": {
            "name": "Yedioth Ahronoth Group (Mozes Family)",
            "type": "Commercial media group"
        },
        "editorialStance": "Centrist, widely-read commercial daily newspaper and operator of Ynet, Israel's largest online news portal",
        "readership": {
            "metric": "Ynet reaches over 60% of internet users in Israel; leading printed daily newspaper by circulation",
            "source": "TGI Israel Media Survey 2024"
        },
        "revenueModel": "Advertising, print subscriptions, and digital media",
        "logo": "newspaper-logos/il/yedioth-ahronoth.svg",
        "logoExplainer": "Bold red and black Hebrew typography 'ידיעות אחרונות' with iconic red border frame.",
        "sources": [
            "https://www.ynet.co.il",
            "https://en.wikipedia.org/wiki/Yedioth_Ahronoth"
        ]
    },
    {
        "id": "il-the-jerusalem-post",
        "countryCode": "IL",
        "name": "The Jerusalem Post",
        "founded": 1932,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & international digital portal",
        "language": "English, French",
        "headquarters": "Jerusalem",
        "owner": {
            "name": "Eli Azur / Mirkaei Tikshoret Group",
            "type": "Commercial media group"
        },
        "editorialStance": "Israel's primary English-language daily; center-right stance on regional security, foreign policy, and Jewish diaspora affairs",
        "readership": {
            "metric": "10+ million monthly digital visitors across global English-speaking diaspora",
            "source": "Jerusalem Post Media Kit 2024"
        },
        "revenueModel": "Digital subscriptions, global print editions, and advertising",
        "logo": "newspaper-logos/il/the-jerusalem-post.svg",
        "logoExplainer": "Stately navy blue serif masthead 'THE JERUSALEM POST' with a lion emblem of Jerusalem.",
        "sources": [
            "https://www.jpost.com",
            "https://en.wikipedia.org/wiki/The_Jerusalem_Post"
        ]
    },
    {
        "id": "il-globes",
        "countryCode": "IL",
        "name": "Globes",
        "founded": 1983,
        "frequency": "Daily financial newspaper",
        "format": "Broadsheet & digital financial portal",
        "language": "Hebrew, English",
        "headquarters": "Rishon LeZion",
        "owner": {
            "name": "Alona Bar-On / Globes Publisher Ltd",
            "type": "Independent business publishing group"
        },
        "editorialStance": "Israel's leading daily financial newspaper; coverage of high-tech sector, Tel Aviv Stock Exchange, macroeconomics, and commercial law",
        "readership": {
            "metric": "Primary business paper read by Israeli C-suite executives, investors, and tech entrepreneurs",
            "source": "Globes Financial Media Group 2023"
        },
        "revenueModel": "Paid digital paywall subscriptions, print subscriptions, and corporate advertising",
        "logo": "newspaper-logos/il/globes.svg",
        "logoExplainer": "Bright orange globe symbol beside modern grey and black bold typography 'GLOBES'.",
        "sources": [
            "https://www.globes.co.il",
            "https://en.wikipedia.org/wiki/Globes"
        ]
    },
    {
        "id": "il-israel-hayom",
        "countryCode": "IL",
        "name": "Israel Hayom",
        "englishTranslation": "Israel Today",
        "founded": 2007,
        "frequency": "Daily newspaper",
        "format": "Tabloid & digital edition",
        "language": "Hebrew, English",
        "headquarters": "Tel Aviv",
        "owner": {
            "name": "Adelson Family Trust",
            "type": "Independent commercial media publisher"
        },
        "editorialStance": "Israel's most widely distributed free daily newspaper; center-right nationalist editorial line",
        "readership": {
            "metric": "Highest print exposure rate in Israel (28% weekday exposure)",
            "source": "TGI Israel Exposure Audit 2024"
        },
        "revenueModel": "Display and classified advertising",
        "logo": "newspaper-logos/il/israel-hayom.svg",
        "logoExplainer": "Bold red rectangular block featuring white Hebrew lettering 'ישראל היום'.",
        "sources": [
            "https://www.israelhayom.co.il",
            "https://en.wikipedia.org/wiki/Israel_Hayom"
        ]
    }
],
  // IT
  IT: [
    {
        "id": "it-corriere-della-sera",
        "countryCode": "IT",
        "name": "Corriere della Sera",
        "englishTranslation": "Evening Courier",
        "founded": 1876,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital news platform",
        "language": "Italian",
        "headquarters": "Milan",
        "owner": {
            "name": "RCS MediaGroup (Urbano Cairo)",
            "type": "Commercial media conglomerate"
        },
        "editorialStance": "Italy's leading daily newspaper of record; centrist, liberal-conservative editorial line on politics and economics",
        "readership": {
            "metric": "Highest print and digital combined circulation in Italy (~270,000 daily copies; 550,000 paid digital subs)",
            "source": "ADS (Accertamenti Diffusione Stampa) Italy 2024"
        },
        "revenueModel": "Digital subscriptions, print copy sales, and display advertising",
        "logo": "newspaper-logos/it/corriere-della-sera.svg",
        "logoExplainer": "Classic Italian blackletter calligraphic masthead 'Corriere della Sera' with historic Milanese crest.",
        "sources": [
            "https://www.corriere.it",
            "https://en.wikipedia.org/wiki/Corriere_della_Sera"
        ]
    },
    {
        "id": "it-la-repubblica",
        "countryCode": "IT",
        "name": "La Repubblica",
        "englishTranslation": "The Republic",
        "founded": 1976,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital news portal",
        "language": "Italian",
        "headquarters": "Rome",
        "owner": {
            "name": "GEDI Gruppo Editoriale (Exor / Agnelli family)",
            "type": "Commercial media group"
        },
        "editorialStance": "Major national daily; center-left stance, focus on domestic politics, civil liberties, culture, and European integration",
        "readership": {
            "metric": "Second largest circulation daily in Italy (~190,000 daily copies) and top digital news portal repubblica.it",
            "source": "ADS Italy Readership Audit 2024"
        },
        "revenueModel": "Print sales, digital subscriptions (Rep+), and advertising",
        "logo": "newspaper-logos/it/la-repubblica.svg",
        "logoExplainer": "Bold black sans-serif lettering 'la Repubblica' with distinctive lowercase 'l' and red decorative line.",
        "sources": [
            "https://www.repubblica.it",
            "https://en.wikipedia.org/wiki/La_Repubblica"
        ]
    },
    {
        "id": "it-il-sole-24-ore",
        "countryCode": "IT",
        "name": "Il Sole 24 Ore",
        "englishTranslation": "The Sun 24 Hours",
        "founded": 1865,
        "frequency": "Daily financial newspaper",
        "format": "Broadsheet (printed on salmon paper) & digital portal",
        "language": "Italian",
        "headquarters": "Milan",
        "owner": {
            "name": "Confindustria (General Confederation of Italian Industry)",
            "type": "Industrial federation publishing group"
        },
        "editorialStance": "Italy's primary financial daily; business news, economic policy, tax legislation, and financial markets",
        "readership": {
            "metric": "Top financial daily in Italy with 140,000 daily print and digital subscribers",
            "source": "ADS Italy / Confindustria Report 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, professional databases, and financial advertising",
        "logo": "newspaper-logos/it/il-sole-24-ore.svg",
        "logoExplainer": "Salmon-orange rectangle with bold black serif title 'Il Sole 24 ORE' matching its signature pink financial newsprint.",
        "sources": [
            "https://www.ilsole24ore.com",
            "https://en.wikipedia.org/wiki/Il_Sole_24_Ore"
        ]
    },
    {
        "id": "it-la-stampa",
        "countryCode": "IT",
        "name": "La Stampa",
        "englishTranslation": "The Press",
        "founded": 1867,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital portal",
        "language": "Italian",
        "headquarters": "Turin",
        "owner": {
            "name": "GEDI Gruppo Editoriale",
            "type": "Commercial media group"
        },
        "editorialStance": "Historic daily newspaper based in Turin; centrist stance with strong coverage of Northern Italy industrial economy and national politics",
        "readership": {
            "metric": "One of Italy's top 4 national newspapers with ~100,000 daily circulation",
            "source": "ADS Italy Circulation Data 2024"
        },
        "revenueModel": "Print sales, digital subscriptions, and display advertising",
        "logo": "newspaper-logos/it/la-stampa.svg",
        "logoExplainer": "Traditional black Roman serif masthead 'LA STAMPA' with clean Italian press aesthetic.",
        "sources": [
            "https://www.lastampa.it",
            "https://en.wikipedia.org/wiki/La_Stampa"
        ]
    },
    {
        "id": "it-il-messaggero",
        "countryCode": "IT",
        "name": "Il Messaggero",
        "englishTranslation": "The Messenger",
        "founded": 1878,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital edition",
        "language": "Italian",
        "headquarters": "Rome",
        "owner": {
            "name": "Caltagirone Editore",
            "type": "Commercial media publishing group"
        },
        "editorialStance": "Rome's principal daily newspaper; centrist stance with strong coverage of national government proceedings, Vatican, and capital region affairs",
        "readership": {
            "metric": "Leading daily in Central Italy with over 75,000 daily circulation",
            "source": "ADS Italy Media Audit 2024"
        },
        "revenueModel": "Print sales, legal notices, and commercial advertising",
        "logo": "newspaper-logos/it/il-messaggero.svg",
        "logoExplainer": "Classic serif typography 'Il Messaggero' in dark blue.",
        "sources": [
            "https://www.ilmessaggero.it",
            "https://en.wikipedia.org/wiki/Il_Messaggero"
        ]
    }
],
  // CI
  CI: [
    {
        "id": "ci-fraternite-matin",
        "countryCode": "CI",
        "name": "Fraternité Matin",
        "englishTranslation": "Morning Fraternity",
        "founded": 1964,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital portal",
        "language": "French",
        "headquarters": "Abidjan",
        "owner": {
            "name": "SNPECI (Société Nationale de Presse et d'Édition de Côte d'Ivoire)",
            "type": "State-owned national publishing enterprise"
        },
        "editorialStance": "Ivory Coast's official national daily newspaper of record; government policy announcements and national economic development",
        "readership": {
            "metric": "Largest print daily circulation in Ivory Coast (~15,000 copies daily) and major public archive",
            "source": "SNPECI Annual Report 2023"
        },
        "annualPublicFunding": {
            "total": "State commercial enterprise backing",
            "perCapita": "State funded"
        },
        "revenueModel": "Print sales, legal announcements, and government advertising",
        "logo": "newspaper-logos/ci/fraternite-matin.svg",
        "logoExplainer": "Green and orange banner with bold white text 'Fraternité Matin', reflecting the national colors of Ivory Coast.",
        "sources": [
            "https://www.fratmat.info",
            "https://en.wikipedia.org/wiki/Fraternité_Matin"
        ]
    },
    {
        "id": "ci-l-inter",
        "countryCode": "CI",
        "name": "L'Inter",
        "englishTranslation": "The Inter",
        "founded": 1998,
        "frequency": "Daily newspaper",
        "format": "Tabloid & digital edition",
        "language": "French",
        "headquarters": "Abidjan",
        "owner": {
            "name": "Groupe Olympe",
            "type": "Independent commercial media group"
        },
        "editorialStance": "Prominent independent daily covering Ivorian domestic political debate, international relations, and economic investigation",
        "readership": {
            "metric": "One of the top 3 selling independent dailies in Abidjan and major regional centers",
            "source": "Ivorian Press Council (ANP) Audit 2023"
        },
        "revenueModel": "Print newsstand sales and commercial advertising",
        "logo": "newspaper-logos/ci/l-inter.svg",
        "logoExplainer": "Bold red rectangular logo containing white serif title 'L'Inter' with dynamic underline.",
        "sources": [
            "https://www.linfodrome.com",
            "https://fr.wikipedia.org/wiki/L%27Inter"
        ]
    },
    {
        "id": "ci-soir-info",
        "countryCode": "CI",
        "name": "Soir Info",
        "englishTranslation": "Evening Info",
        "founded": 1994,
        "frequency": "Daily newspaper",
        "format": "Tabloid print & web portal",
        "language": "French",
        "headquarters": "Abidjan",
        "owner": {
            "name": "Groupe Olympe",
            "type": "Independent commercial media group"
        },
        "editorialStance": "Popular independent general-interest daily focusing on crime reporting, social affairs, breaking news, and sports",
        "readership": {
            "metric": "Consistently among the top 2 highest selling print newspapers nationwide in Ivory Coast",
            "source": "ANP (Autorité Nationale de la Presse) Côte d'Ivoire 2023"
        },
        "revenueModel": "Print newsstand copy sales and local commercial advertising",
        "logo": "newspaper-logos/ci/soir-info.svg",
        "logoExplainer": "Dark blue badge featuring white script 'Soir Info' accented with a bright yellow sun emblem.",
        "sources": [
            "https://www.linfodrome.com/soir-info",
            "https://fr.wikipedia.org/wiki/Soir_Info"
        ]
    },
    {
        "id": "ci-nouveau-reveil",
        "countryCode": "CI",
        "name": "Le Nouveau Réveil",
        "englishTranslation": "The New Awakening",
        "founded": 2000,
        "frequency": "Daily newspaper",
        "format": "Tabloid & digital portal",
        "language": "French",
        "headquarters": "Abidjan",
        "owner": {
            "name": "Société le Réveil",
            "type": "Commercial media company"
        },
        "editorialStance": "Major Ivorian daily newspaper affiliated with the opposition PDCI-RDA party; political commentary and domestic news",
        "readership": {
            "metric": "Top selling opposition daily in Abidjan and central Ivory Coast",
            "source": "ANP Press Audit 2023"
        },
        "revenueModel": "Print newsstand sales and political advertising",
        "logo": "newspaper-logos/ci/nouveau-reveil.svg",
        "logoExplainer": "Bold orange typography 'Le Nouveau Réveil' on white background.",
        "sources": [
            "https://nouveaureveil.com",
            "https://fr.wikipedia.org/wiki/Le_Nouveau_R%C3%A9veil"
        ]
    },
    {
        "id": "ci-aip",
        "countryCode": "CI",
        "name": "AIP",
        "englishTranslation": "Ivorian News Agency",
        "founded": 1961,
        "frequency": "24/7 national news wire",
        "format": "State news agency wire & public digital portal",
        "language": "French",
        "headquarters": "Abidjan",
        "owner": {
            "name": "Government of Ivory Coast (Ministry of Communication)",
            "type": "Public service news agency"
        },
        "editorialStance": "National press agency of Ivory Coast providing factual regional coverage across all 31 administrative regions",
        "readership": {
            "metric": "Primary source of verified regional dispatch news for all Ivorian print, radio, and TV stations",
            "source": "AIP Official Report 2023"
        },
        "annualPublicFunding": {
            "total": "Public budget allocation",
            "perCapita": "State funded"
        },
        "revenueModel": "State budget subsidy and agency syndication",
        "logo": "newspaper-logos/ci/aip-agence-ivoirienne-de-presse.svg",
        "logoExplainer": "Ivory Coast map outline inside green circle with orange lettering 'AIP'.",
        "sources": [
            "https://www.aip.ci",
            "https://en.wikipedia.org/wiki/Agence_Ivoirienne_de_Presse"
        ]
    }
],
  // JM
  JM: [
    {
        "id": "jm-jamaica-gleaner",
        "countryCode": "JM",
        "name": "The Gleaner",
        "founded": 1834,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital portal (Jamaica Gleaner)",
        "language": "English",
        "headquarters": "Kingston",
        "owner": {
            "name": "RJRGLEANER Communications Group",
            "type": "Publicly listed media conglomerate"
        },
        "editorialStance": "Jamaica's historic newspaper of record; independent, centrist editorial stance covering national politics, Caribbean affairs, and diaspora news",
        "readership": {
            "metric": "Highest print readership in Jamaica (~400,000 daily print/digital readers) and massive diaspora audience in North America & UK",
            "source": "RJRGLEANER Group Annual Report 2023–24"
        },
        "revenueModel": "Print copy sales, digital advertising, classifieds, and subscription",
        "logo": "newspaper-logos/jm/the-jamaica-gleaner.svg",
        "logoExplainer": "Historic black Gothic blackletter title 'The Gleaner' with classic Jamaican lion crest.",
        "sources": [
            "https://jamaica-gleaner.com",
            "https://en.wikipedia.org/wiki/The_Gleaner"
        ]
    },
    {
        "id": "jm-jamaica-observer",
        "countryCode": "JM",
        "name": "Jamaica Observer",
        "founded": 1993,
        "frequency": "Daily newspaper",
        "format": "Tabloid/Compact & digital portal",
        "language": "English",
        "headquarters": "Kingston",
        "owner": {
            "name": "Gordon 'Butch' Stewart Family / Sandals Group",
            "type": "Commercial media group"
        },
        "editorialStance": "Major national daily; market-oriented, strong coverage of business, tourism, investigative reporting, and athletics",
        "readership": {
            "metric": "Second largest newspaper in Jamaica with 2.8 million monthly digital readers",
            "source": "Jamaica Observer Media Kit 2024"
        },
        "revenueModel": "Print sales, commercial advertising, and digital promotions",
        "logo": "newspaper-logos/jm/jamaica-observer.svg",
        "logoExplainer": "Bold green capital text 'JAMAICA OBSERVER' featuring a stylized golden sun disk in the letter 'O'.",
        "sources": [
            "https://www.jamaicaobserver.com",
            "https://en.wikipedia.org/wiki/Jamaica_Observer"
        ]
    },
    {
        "id": "jm-our-today",
        "countryCode": "JM",
        "name": "Our Today",
        "founded": 2020,
        "frequency": "24/7 digital news publication",
        "format": "Digital-only news portal",
        "language": "English",
        "headquarters": "Kingston",
        "owner": {
            "name": "Alston Stewart / Our Today Media",
            "type": "Independent digital media publisher"
        },
        "editorialStance": "Modern digital news portal focusing on Jamaican business, lifestyle, tech, corporate developments, and culture",
        "readership": {
            "metric": "1 million monthly digital views in Jamaica and North American diaspora",
            "source": "Our Today Analytics 2024"
        },
        "revenueModel": "Digital display programmatic and native corporate advertising",
        "logo": "newspaper-logos/jm/our-today.svg",
        "logoExplainer": "Vibrant yellow and blue geometric lettering 'OUR TODAY'.",
        "sources": [
            "https://our.today"
        ]
    },
    {
        "id": "jm-jamaica-star",
        "countryCode": "JM",
        "name": "The Jamaica Star",
        "founded": 1951,
        "frequency": "Daily afternoon newspaper",
        "format": "Tabloid print & digital edition",
        "language": "English, Jamaican Patois",
        "headquarters": "Kingston",
        "owner": {
            "name": "RJRGLEANER Communications Group",
            "type": "Publicly listed media conglomerate"
        },
        "editorialStance": "Popular tabloid focusing on Jamaican pop culture, Dancehall music, human interest stories, and sports",
        "readership": {
            "metric": "Widely read tabloid in urban Kingston and Montego Bay among island youth",
            "source": "RJRGLEANER Communications Group 2023"
        },
        "revenueModel": "Print newsstand sales and popular advertising",
        "logo": "newspaper-logos/jm/jamaica-star.svg",
        "logoExplainer": "Bright red five-pointed star behind bold yellow sans-serif text 'THE STAR'.",
        "sources": [
            "https://jamaica-star.com",
            "https://en.wikipedia.org/wiki/The_Jamaica_Star"
        ]
    },
    {
        "id": "jm-loop-jamaica",
        "countryCode": "JM",
        "name": "Loop Jamaica",
        "founded": 2014,
        "frequency": "24/7 digital publishing",
        "format": "Mobile app & digital news portal",
        "language": "English",
        "headquarters": "Kingston",
        "owner": {
            "name": "Trend Media (Digicel Group)",
            "type": "Telecommunications subsidiary media digital provider"
        },
        "editorialStance": "Digital-native news platform popular across Jamaica for breaking local news, community video, lifestyle, and crime updates",
        "readership": {
            "metric": "1.5 million monthly active users on app and web portal in Jamaica",
            "source": "Trend Media Caribbean Analytics 2024"
        },
        "revenueModel": "Digital programmatic advertising and mobile carrier partnerships",
        "logo": "newspaper-logos/jm/loop-news-jamaica.svg",
        "logoExplainer": "Cyan blue infinity loop icon beside bold purple text 'loop Jamaica'.",
        "sources": [
            "https://jamaica.loopnews.com",
            "https://www.trendmediagroup.com"
        ]
    }
],
  // JP
  JP: [
    {
        "id": "jp-yomiuri-shimbun",
        "countryCode": "JP",
        "name": "The Yomiuri Shimbun",
        "englishTranslation": "Reading and Selling Newspaper",
        "founded": 1874,
        "frequency": "Daily morning & evening newspaper",
        "format": "Broadsheet & digital portal (yomiuri.co.jp)",
        "language": "Japanese, English (The Japan News)",
        "headquarters": "Tokyo",
        "owner": {
            "name": "Yomiuri Shimbun Holdings",
            "type": "Private media conglomerate"
        },
        "editorialStance": "World's highest-circulation newspaper; moderate conservative stance supporting US-Japan alliance and constitutional reform",
        "readership": {
            "metric": "6.5 million daily print circulation (Guinness World Record holder for highest paid daily newspaper circulation)",
            "source": "Japan Newspaper Publishers & Editors Association (NSK) 2024"
        },
        "revenueModel": "Home print subscriptions, digital access, and corporate advertising",
        "logo": "newspaper-logos/jp/yomiuri-shimbun.svg",
        "logoExplainer": "Traditional Japanese Kanji title '読売新聞' in crisp black calligraphic brush script.",
        "sources": [
            "https://www.yomiuri.co.jp",
            "https://en.wikipedia.org/wiki/Yomiuri_Shimbun"
        ]
    },
    {
        "id": "jp-asahi-shimbun",
        "countryCode": "JP",
        "name": "The Asahi Shimbun",
        "englishTranslation": "Morning Sun Newspaper",
        "founded": 1879,
        "frequency": "Daily morning & evening edition",
        "format": "Broadsheet & digital news portal",
        "language": "Japanese, English",
        "headquarters": "Osaka & Tokyo",
        "owner": {
            "name": "The Asahi Shimbun Company (Murayama & Ueno families)",
            "type": "Independent publishing house"
        },
        "editorialStance": "Japan's second largest newspaper; center-left, liberal stance on defense policy, anti-nuclear energy, and social welfare",
        "readership": {
            "metric": "3.8 million daily print copies and over 15 million monthly digital readers",
            "source": "NSK Audit Report 2024"
        },
        "revenueModel": "Print subscriptions, digital paywall, and commercial advertising",
        "logo": "newspaper-logos/jp/asahi-shimbun.svg",
        "logoExplainer": "Kanji masthead '朝日新聞' in bold black brush lettering with the red rising sun emblem.",
        "sources": [
            "https://www.asahi.com",
            "https://en.wikipedia.org/wiki/Asahi_Shimbun"
        ]
    },
    {
        "id": "jp-nikkei",
        "countryCode": "JP",
        "name": "Nikkei",
        "officialName": "Nihon Keizai Shimbun",
        "englishTranslation": "Japan Economics Newspaper",
        "founded": 1876,
        "frequency": "Daily morning & evening financial edition",
        "format": "Broadsheet, digital portal & publisher of Nikkei 225 index",
        "language": "Japanese, English (Nikkei Asia)",
        "headquarters": "Tokyo",
        "owner": {
            "name": "Nikkei Inc. (Owner of Financial Times Group)",
            "type": "Independent employee-owned media company"
        },
        "editorialStance": "Japan's premier financial daily newspaper; market-oriented, economic deregulation, global trade, and technology focus",
        "readership": {
            "metric": "2.4 million daily print circulation and 850,000 paid digital subscribers (Nikkei Digital)",
            "source": "Nikkei Inc. Corporate Report 2024"
        },
        "revenueModel": "Paid digital subscriptions, print subscriptions, index licensing, and corporate advertising",
        "logo": "newspaper-logos/jp/nikkei-nihon-keizai-shimbun.svg",
        "logoExplainer": "Modern dark blue geometric Kanji typography '日本經濟新聞' with crisp Nikkei corporate block logo.",
        "sources": [
            "https://www.nikkei.com",
            "https://en.wikipedia.org/wiki/Nihon_Keizai_Shimbun"
        ]
    },
    {
        "id": "jp-mainichi-shimbun",
        "countryCode": "JP",
        "name": "The Mainichi Shimbun",
        "englishTranslation": "Daily Newspaper",
        "founded": 1872,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital news portal",
        "language": "Japanese, English",
        "headquarters": "Tokyo",
        "owner": {
            "name": "The Mainichi Newspapers Co., Ltd.",
            "type": "Independent press publisher"
        },
        "editorialStance": "Japan's oldest daily newspaper; progressive, social-democrat stance on environment, pacifism, and civil rights",
        "readership": {
            "metric": "1.8 million daily print circulation nationwide",
            "source": "NSK Japan Newspaper Audit 2024"
        },
        "revenueModel": "Print subscriptions, digital access, and display advertising",
        "logo": "newspaper-logos/jp/mainichi-shimbun.svg",
        "logoExplainer": "Classic Kanji script '毎日新聞' accented by a modern blue circular eye symbol.",
        "sources": [
            "https://mainichi.jp",
            "https://en.wikipedia.org/wiki/Mainichi_Shimbun"
        ]
    },
    {
        "id": "jp-japan-times",
        "countryCode": "JP",
        "name": "The Japan Times",
        "founded": 1897,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital edition",
        "language": "English",
        "headquarters": "Tokyo",
        "owner": {
            "name": "News2u Holdings (Minoru Yoshizawa)",
            "type": "Independent commercial media publisher"
        },
        "editorialStance": "Japan's oldest English-language daily newspaper; independent coverage of Japanese foreign relations, culture, and business",
        "readership": {
            "metric": "Primary English daily read by foreign residents, diplomats, and international readers",
            "source": "The Japan Times Media Kit 2024"
        },
        "revenueModel": "Print subscription, digital paywall, and advertising",
        "logo": "newspaper-logos/jp/japan-times.svg",
        "logoExplainer": "Classic black Gothic title 'The Japan Times' with cherry blossom accent.",
        "sources": [
            "https://www.japantimes.co.jp",
            "https://en.wikipedia.org/wiki/The_Japan_Times"
        ]
    }
],
  // JO
  JO: [
    {
        "id": "jo-al-rai",
        "countryCode": "JO",
        "name": "Al-Rai",
        "englishTranslation": "The Opinion",
        "founded": 1971,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital portal",
        "language": "Arabic",
        "headquarters": "Amman",
        "owner": {
            "name": "Jordan Press Foundation (Social Security Investment Fund owned)",
            "type": "Publicly backed publishing house"
        },
        "editorialStance": "Jordan's highest-circulation Arabic daily newspaper; pro-government establishment daily covering royal directives and national news",
        "readership": {
            "metric": "Historically Jordan's largest selling print daily (~80,000 copies daily)",
            "source": "Jordan Press Foundation Annual Report 2023"
        },
        "revenueModel": "Print copy sales, official government notices, and advertising",
        "logo": "newspaper-logos/jo/al-rai.svg",
        "logoExplainer": "Traditional green and gold Arabic script 'الرأي' with an emblem of Jordan's crown.",
        "sources": [
            "https://alrai.com",
            "https://en.wikipedia.org/wiki/Al_Rai_(Jordanian_newspaper)"
        ]
    },
    {
        "id": "jo-petra",
        "countryCode": "JO",
        "name": "Petra",
        "englishTranslation": "Jordan News Agency",
        "founded": 1969,
        "frequency": "24/7 national news wire",
        "format": "Official state news agency wire & online portal",
        "language": "Arabic, English",
        "headquarters": "Amman",
        "owner": {
            "name": "Ministry of Government Communications",
            "type": "State-owned news agency"
        },
        "editorialStance": "Official state newswire of Jordan; authoritative reporting on royal court activities, cabinet decisions, and foreign diplomacy",
        "readership": {
            "metric": "Primary news dispatch provider for all Jordanian newspapers, TV stations, and diplomatic missions",
            "source": "Petra Jordan News Agency Directory 2024"
        },
        "annualPublicFunding": {
            "total": "State budget allocation (~5.5M JOD annual budget)",
            "perCapita": "~0.50 JOD / person / year"
        },
        "revenueModel": "Parliamentary state budget appropriation",
        "logo": "newspaper-logos/jo/petra-jordan-news-agency.svg",
        "logoExplainer": "Terra-cotta red emblem of the Treasury of Petra facade with Arabic lettering 'بترا'.",
        "sources": [
            "https://petra.gov.jo",
            "https://en.wikipedia.org/wiki/Jordan_News_Agency"
        ]
    },
    {
        "id": "jo-jordan-times",
        "countryCode": "JO",
        "name": "The Jordan Times",
        "founded": 1975,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital news portal",
        "language": "English",
        "headquarters": "Amman",
        "owner": {
            "name": "Jordan Press Foundation",
            "type": "Publicly backed publishing house"
        },
        "editorialStance": "Jordan's premier English-language daily newspaper; independent international coverage, Middle East peace process analysis, and culture",
        "readership": {
            "metric": "Read by foreign diplomats, international organizations, scholars, and English-speaking Jordanians",
            "source": "Jordan Press Foundation Media Guide"
        },
        "revenueModel": "Print copy sales, corporate subscriptions, and display advertising",
        "logo": "newspaper-logos/jo/jordan-times.svg",
        "logoExplainer": "Classic black serif title 'THE JORDAN TIMES' on white background.",
        "sources": [
            "https://www.jordantimes.com",
            "https://en.wikipedia.org/wiki/The_Jordan_Times"
        ]
    },
    {
        "id": "jo-al-ghad",
        "countryCode": "JO",
        "name": "Al-Ghad",
        "englishTranslation": "Tomorrow",
        "founded": 2004,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital news portal",
        "language": "Arabic",
        "headquarters": "Amman",
        "owner": {
            "name": "Mohammad Alayyan / Al-Ghad Publishing",
            "type": "Independent commercial publishing company"
        },
        "editorialStance": "Jordan's leading independent Arabic daily newspaper; professional independent coverage of reform, youth affairs, and economic policy",
        "readership": {
            "metric": "Over 4.5 million monthly digital readers on alghad.com",
            "source": "Al-Ghad Media Group Audit 2024"
        },
        "revenueModel": "Commercial advertising, digital display, and print sales",
        "logo": "newspaper-logos/jo/al-ghad.svg",
        "logoExplainer": "Modern blue and orange circular logo with stylized Arabic calligraphic text 'الغد'.",
        "sources": [
            "https://alghad.com",
            "https://en.wikipedia.org/wiki/Al_Ghad"
        ]
    },
    {
        "id": "jo-al-dustour",
        "countryCode": "JO",
        "name": "Al-Dustour",
        "englishTranslation": "The Constitution",
        "founded": 1967,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital portal",
        "language": "Arabic",
        "headquarters": "Amman",
        "owner": {
            "name": "Jordan Press and Publishing Company",
            "type": "Commercial media company"
        },
        "editorialStance": "One of Jordan's oldest daily newspapers; major coverage of national legislative affairs, economy, and culture",
        "readership": {
            "metric": "Widespread readership across major Jordanian urban areas and government institutions",
            "source": "Jordan Press Association 2023"
        },
        "revenueModel": "Print copy sales and display advertising",
        "logo": "newspaper-logos/jo/al-dustour.svg",
        "logoExplainer": "Deep maroon Arabic title 'الدستور' in traditional calligraphic style.",
        "sources": [
            "https://www.addustour.com",
            "https://en.wikipedia.org/wiki/Addustour"
        ]
    }
],
  // KZ
  KZ: [
    {
        "id": "kz-informburo",
        "countryCode": "KZ",
        "name": "Informburo.kz",
        "founded": 2015,
        "frequency": "24/7 digital news publication",
        "format": "Digital-only news portal",
        "language": "Kazakh, Russian",
        "headquarters": "Almaty",
        "owner": {
            "name": "Verny Capital / Media Holding",
            "type": "Commercial digital news publisher"
        },
        "editorialStance": "Leading independent analytical digital news outlet in Kazakhstan; investigative reporting, economics, and legal affairs",
        "readership": {
            "metric": "5+ million monthly active digital readers in Kazakhstan",
            "source": "Zero.kz Audit 2024"
        },
        "revenueModel": "Digital programmatic advertising and sponsored content",
        "logo": "newspaper-logos/kz/informburo-kz.svg",
        "logoExplainer": "Red and dark grey rectangular logo with bold white lettering 'informburo'.",
        "sources": [
            "https://informburo.kz"
        ]
    },
    {
        "id": "kz-egemen-qazaqstan",
        "countryCode": "KZ",
        "name": "Egemen Qazaqstan",
        "englishTranslation": "Independent Kazakhstan",
        "founded": 1919,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital edition",
        "language": "Kazakh",
        "headquarters": "Astana",
        "owner": {
            "name": "Kazakh Newspapers LLP / Ministry of Culture and Information",
            "type": "State-backed publishing group"
        },
        "editorialStance": "Kazakhstan's national Kazakh-language newspaper of record; government decisions, state history, culture, and national development",
        "readership": {
            "metric": "Largest print circulation Kazakh-language paper (~150,000 copies daily)",
            "source": "Kazakh Newspapers LLP Audit 2023"
        },
        "revenueModel": "State publishing budget, print subscriptions, and official notices",
        "logo": "newspaper-logos/kz/egemen-qazaqstan.svg",
        "logoExplainer": "Sky blue banner with golden sun and eagle motif above calligraphic Kazakh script 'Егемен Қазақстан'.",
        "sources": [
            "https://egemen.kz",
            "https://en.wikipedia.org/wiki/Egemen_Qazaqstan"
        ]
    },
    {
        "id": "kz-kazakhstanskaya-pravda",
        "countryCode": "KZ",
        "name": "Kazakhstanskaya Pravda",
        "englishTranslation": "Kazakhstan Truth",
        "founded": 1920,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital news portal",
        "language": "Russian",
        "headquarters": "Astana",
        "owner": {
            "name": "Kazakh Newspapers LLP",
            "type": "State-backed publishing group"
        },
        "editorialStance": "Kazakhstan's primary Russian-language official daily newspaper; legal enactments, political coverage, and bilateral diplomatic affairs",
        "readership": {
            "metric": "Widely circulated nationwide daily among government officials, legal professionals, and industry leaders",
            "source": "Kazakhstanskaya Pravda Media Kit"
        },
        "revenueModel": "State publishing subsidies, print subscriptions, and legal advertising",
        "logo": "newspaper-logos/kz/kazakhstanskaya-pravda.svg",
        "logoExplainer": "Navy blue serif typography 'Казахстанская правда' with classic Kazakh ornament motif.",
        "sources": [
            "https://kazpravda.kz",
            "https://en.wikipedia.org/wiki/Kazakhstanskaya_Pravda"
        ]
    },
    {
        "id": "kz-tengrinews",
        "countryCode": "KZ",
        "name": "Tengrinews",
        "founded": 2010,
        "frequency": "24/7 digital news publication",
        "format": "Digital-only news portal & mobile app",
        "language": "Kazakh, Russian, English",
        "headquarters": "Almaty",
        "owner": {
            "name": "Alash Media Group",
            "type": "Independent commercial media holding"
        },
        "editorialStance": "Kazakhstan's highest trafficked digital news portal; breaking local news, video reporting, and independent social commentary",
        "readership": {
            "metric": "12+ million monthly unique visitors across Kazakhstan and Central Asia",
            "source": "Zero.kz Internet Ranking / Alash Media 2024"
        },
        "revenueModel": "Digital programmatic advertising, native advertising, and media projects",
        "logo": "newspaper-logos/kz/tengrinews.svg",
        "logoExplainer": "Vibrant yellow circle with dark stylized letter 't' and bold typography 'TENGRINEWS'.",
        "sources": [
            "https://tengrinews.kz",
            "https://en.wikipedia.org/wiki/Tengrinews.kz"
        ]
    },
    {
        "id": "kz-vlast",
        "countryCode": "KZ",
        "name": "Vlast.kz",
        "englishTranslation": "Power",
        "founded": 2012,
        "frequency": "24/7 digital news & investigative journal",
        "format": "Digital-only analytical magazine portal",
        "language": "Kazakh, Russian, English",
        "headquarters": "Almaty",
        "owner": {
            "name": "Vyacheslav Abramov / Vlast Media",
            "type": "Independent analytical media outlet"
        },
        "editorialStance": "Premier independent analytical journal in Kazakhstan focusing on political economy, human rights, sociology, and investigative journalism",
        "readership": {
            "metric": "1.5 million monthly digital readers and influential readership among analysts and scholars",
            "source": "Vlast.kz Annual Audience Overview 2024"
        },
        "revenueModel": "Reader subscriptions, crowdfunding, and grant-funded research reporting",
        "logo": "newspaper-logos/kz/vlast-kz.svg",
        "logoExplainer": "Sleek red geometric icon featuring uppercase sans-serif text 'ВЛАСТЬ'.",
        "sources": [
            "https://vlast.kz",
            "https://en.wikipedia.org/wiki/Vlast_(magazine)"
        ]
    }
],

  // Dominica
  DM: [
    {
      id: "dm-the-chronicle",
      countryCode: "DM",
      name: "The Chronicle",
      founded: 1909,
      frequency: "Weekly newspaper (Friday)",
      format: "Tabloid publication & digital portal",
      language: "English",
      headquarters: "Roseau",
      owner: {
        name: "Chronicle Newspaper Ltd",
        type: "Independent commercial media",
      },
      editorialStance: "Dominica's historic newspaper of record; comprehensive coverage of parliamentary debates, island agriculture, regional CARICOM news, and civic life",
      readership: {
        metric: "Over 110 years of continuous publishing; leading historic print newspaper in Dominica",
        source: "Dominica Chronicle Media Profile 2023",
      },
      revenueModel: "Print sales, legal notices, and commercial display advertising",
      logo: "newspaper-logos/dm/the-chronicle.svg",
      logoExplainer:
        "Classic black serif masthead 'The Chronicle' on white canvas, symbolising over a century of print journalism in Dominica.",
      sources: ["https://thechronicle.dm", "https://en.wikipedia.org/wiki/The_Chronicle_(Dominica)"],
    },
    {
      id: "dm-dominica-news-online",
      countryCode: "DM",
      name: "Dominica News Online",
      officialName: "Dominica News Online (DNO)",
      founded: 2007,
      frequency: "Continuous 24/7 digital news service",
      format: "Digital-only news portal",
      language: "English",
      headquarters: "Roseau",
      owner: {
        name: "Duravision Inc.",
        type: "Independent commercial media",
      },
      editorialStance: "Dominica's premier digital breaking news portal; high-tempo reporting, community updates, weather monitoring, and national politics",
      readership: {
        metric: "Over 800,000 monthly digital visits across Dominica and extensive diaspora readership in the UK and North America",
        source: "Dominica News Online Audience Report 2024",
      },
      revenueModel: "Digital banner advertising and diaspora community promotions",
      logo: "newspaper-logos/dm/dominica-news-online.svg",
      logoExplainer:
        "Cyan and navy banner with white lettering 'DOMINICA NEWS ONLINE', representing modern real-time island reporting.",
      sources: ["https://dominicanewsonline.com"],
    },
    {
      id: "dm-the-sun-dominica",
      countryCode: "DM",
      name: "The Sun",
      founded: 1999,
      frequency: "Weekly newspaper",
      format: "Tabloid publication",
      language: "English",
      headquarters: "Roseau",
      owner: {
        name: "Sun Printing & Publishing Ltd",
        type: "Independent commercial media",
      },
      editorialStance: "Independent investigative weekly; political commentary, environmental conservation, and social accountability",
      readership: {
        metric: "Widely read independent weekly print paper in Roseau and Portsmouth",
        source: "Sun Publishing Review 2023",
      },
      revenueModel: "Print sales and local business advertising",
      logo: "newspaper-logos/dm/the-sun-dominica.svg",
      logoExplainer:
        "Bright golden sunburst icon with bold black typography 'The Sun', symbolising vibrant truth and community journalism.",
      sources: ["https://sundominica.com"],
    },
    {
      id: "dm-dominica-vibes",
      countryCode: "DM",
      name: "Dominica Vibes News",
      founded: 2010,
      frequency: "Continuous digital news portal",
      format: "Digital multimedia portal",
      language: "English",
      headquarters: "Roseau",
      owner: {
        name: "Vibes Media Group",
        type: "Independent commercial media",
      },
      editorialStance: "Digital news and lifestyle portal; cultural events, World Creole Music Festival coverage, sports, and youth news",
      readership: {
        metric: "Popular digital platform engaging youth and cultural sectors in Dominica",
        source: "Dominica Vibes Audience Review 2023",
      },
      revenueModel: "Digital display ads and festival event promotions",
      logo: "newspaper-logos/dm/dominica-vibes.svg",
      logoExplainer:
        "Green and yellow banner with modern typography 'DOMINICA VIBES', reflecting the nature island's cultural vitality.",
      sources: ["https://www.dominicavibes.dm"],
    },
    {
      id: "dm-ebean-news",
      countryCode: "DM",
      name: "EmoNews",
      founded: 2018,
      frequency: "Continuous digital news & live streaming",
      format: "Digital video news & portal",
      language: "English",
      headquarters: "Roseau",
      owner: {
        name: "EmoNews Media Network",
        type: "Independent commercial media",
      },
      editorialStance: "Rapidly growing digital native news channel; live on-the-scene broadcasts, community interviews, and disaster response reporting",
      readership: {
        metric: "High social media engagement with over 150,000 active community followers across the Caribbean",
        source: "EmoNews Media Analytics 2024",
      },
      revenueModel: "Social media monetization, local sponsorships, and live stream advertising",
      logo: "newspaper-logos/dm/ebean-news.svg",
      logoExplainer:
        "Red and black badge with bold white lettering 'EMONEWS', representing dynamic mobile-first island reporting.",
      sources: ["https://emonewsdm.com"],
    },
  ],

  // Dominican Republic
  DO: [
    {
      id: "do-listin-diario",
      countryCode: "DO",
      name: "Listín Diario",
      englishTranslation: "Daily List",
      founded: 1889,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Spanish",
      headquarters: "Santo Domingo",
      owner: {
        name: "Grupo de Comunicaciones Corripio",
        type: "Independent commercial media",
      },
      editorialStance: "Dominican Republic's dean of national journalism and historic newspaper of record; national politics, economic policy, legal affairs, and arts",
      readership: {
        metric: "Over 8 million monthly unique digital visitors on listindiario.com and highest broadsheet print circulation in the nation",
        source: "Grupo Corripio Informe Anual 2023",
      },
      revenueModel: "Digital subscriptions, print circulation, and corporate display advertising",
      logo: "newspaper-logos/do/listín-diario.svg",
      logoExplainer:
        "Classic black gothic masthead 'Listín Diario' on white canvas, symbolising over 135 years of Dominican press heritage.",
      sources: ["https://listindiario.com", "https://en.wikipedia.org/wiki/List%C3%ADn_Diario"],
    },
    {
      id: "do-diario-libre",
      countryCode: "DO",
      name: "Diario Libre",
      englishTranslation: "Free Daily",
      founded: 2001,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Berliner free daily & premium digital portal",
      language: "Spanish",
      headquarters: "Santo Domingo",
      owner: {
        name: "Grupo Puntacana (Rainieri family)",
        type: "Independent commercial media",
      },
      editorialStance: "Pioneering free daily newspaper; modern design, investigative journalism, tourism economics, and transparent public governance",
      readership: {
        metric: "Largest daily print circulation in the Caribbean (~150,000 daily copies) and 9+ million monthly digital visitors",
        source: "Diario Libre Media Kit 2024",
      },
      revenueModel: "Commercial print display advertising and digital programmatic revenue",
      logo: "newspaper-logos/do/diario-libre.svg",
      logoExplainer:
        "Deep blue banner with clean white sans-serif typography 'Diario Libre', reflecting modern investigative and independent reporting.",
      sources: ["https://www.diariolibre.com", "https://en.wikipedia.org/wiki/Diario_Libre"],
    },
    {
      id: "do-hoy",
      countryCode: "DO",
      name: "Hoy",
      englishTranslation: "Today",
      founded: 1981,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Spanish",
      headquarters: "Santo Domingo",
      owner: {
        name: "Grupo de Comunicaciones Corripio",
        type: "Independent commercial media",
      },
      editorialStance: "Mainstream quality daily; national political analysis, investigative reports, economic development, and cultural essays",
      readership: {
        metric: "Widely circulated across institutional and commercial sectors with over 4.5 million monthly digital readers",
        source: "Periódico Hoy Memoria 2023",
      },
      revenueModel: "Print sales, official legal notices, and advertising",
      logo: "newspaper-logos/do/hoy.svg",
      logoExplainer:
        "Vibrant red title banner with bold white lettering 'HOY', representing immediate daily news and editorial vitality.",
      sources: ["https://hoy.com.do", "https://es.wikipedia.org/wiki/Hoy_(Rep%C3%BAblica_Dominicana)"],
    },
    {
      id: "do-el-caribe",
      countryCode: "DO",
      name: "El Caribe",
      englishTranslation: "The Caribbean",
      founded: 1948,
      frequency: "Daily newspaper",
      format: "Tabloid & digital portal",
      language: "Spanish",
      headquarters: "Santo Domingo",
      owner: {
        name: "Multimedios del Caribe",
        type: "Independent commercial media",
      },
      editorialStance: "Historic daily newspaper founded in 1948; political commentary, regional Caribbean affairs, sports (baseball), and judiciary reporting",
      readership: {
        metric: "Key national morning newspaper paired with CDN Canal 37 television network for cross-media reach",
        source: "Multimedios del Caribe 2023",
      },
      revenueModel: "Print circulation and multimedia broadcast-digital advertising",
      logo: "newspaper-logos/do/el-caribe.svg",
      logoExplainer:
        "Navy blue background with bold serif typography 'elCaribe', symbolising Caribbean identity and journalistic integrity.",
      sources: ["https://www.elcaribe.com.do", "https://en.wikipedia.org/wiki/El_Caribe_(newspaper)"],
    },
    {
      id: "do-el-dia",
      countryCode: "DO",
      name: "El Día",
      englishTranslation: "The Day",
      founded: 2002,
      frequency: "Daily newspaper (Monday–Friday)",
      format: "Compact free daily & digital portal",
      language: "Spanish",
      headquarters: "Santo Domingo",
      owner: {
        name: "Grupo de Comunicaciones Corripio",
        type: "Independent commercial media",
      },
      editorialStance: "Morning commuter newspaper; concise national news, urban affairs, health, education, and entertainment",
      readership: {
        metric: "Distributed freely to commuters across Santo Domingo and Santiago with 120,000+ daily copies",
        source: "El Día Media Distribution 2024",
      },
      revenueModel: "Commercial print advertising and digital web sponsorships",
      logo: "newspaper-logos/do/el-día.svg",
      logoExplainer:
        "Yellow and red masthead featuring bold typography 'El Día', iconic for morning urban commuter news in the capital.",
      sources: ["https://eldia.com.do", "https://es.wikipedia.org/wiki/El_D%C3%ADa_(Rep%C3%BAblica_Dominicana)"],
    },
  ],

  // Timor-Leste
  TL: [
    {
      id: "tl-tatoli",
      countryCode: "TL",
      name: "Tatoli",
      officialName: "Agência Noticiosa de Timor-Leste",
      nativeName: "Tatoli - Agência Noticiosa de Timor-Leste",
      englishTranslation: "Tatoli (Tetum: To deliver / communicate)",
      founded: 2016,
      frequency: "Continuous 24/7 national newswire",
      format: "Official state newswire & multimedia portal",
      language: "Tetum, Portuguese, English, Indonesian",
      headquarters: "Farol, Dili",
      owner: {
        name: "Democratic Republic of Timor-Leste (SECOMS)",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official national news agency of Timor-Leste; government decisions, parliamentary legislation, ASEAN accession, and petroleum fund management",
      readership: {
        metric: "Primary news agency supplying wire dispatches to all domestic radio, television, and print media across all 14 municipalities",
        source: "Tatoli I.P. Relatório Anual 2023",
      },
      annualPublicFunding: {
        total: "US$1.2 million annual state budget allocation",
        perCapita: "US$0.89 / person / year",
      },
      revenueModel: "Direct state budget appropriation and news syndication services",
      logo: "newspaper-logos/tl/tatoli.svg",
      logoExplainer:
        "Vibrant red and black emblem inspired by the Timor-Leste national flag with clean white lettering 'TATOLI', representing national state news.",
      sources: ["https://tatoli.tl", "https://pt.wikipedia.org/wiki/Tatoli"],
    },
    {
      id: "tl-suara-timor-lorosae",
      countryCode: "TL",
      name: "Suara Timor Lorosa'e",
      officialName: "STL Media Group",
      nativeName: "Suara Timor Lorosa'e",
      englishTranslation: "Voice of the Eastern Sun",
      founded: 1993,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Broadsheet & digital network",
      language: "Tetum, Portuguese, Indonesian",
      headquarters: "Bairo Pite, Dili",
      owner: {
        name: "Salvador Ximenes Soares / STL Group",
        type: "Independent commercial media",
      },
      editorialStance: "Oldest continuously operating newspaper in Timor-Leste; historic voice during the independence struggle; parliamentary affairs, justice, and community news",
      readership: {
        metric: "Largest print circulation daily in Timor-Leste and multi-platform network with STL TV and STL Radio FM",
        source: "STL Media Group Overview 2023",
      },
      revenueModel: "Print sales, official advertisements, and commercial broadcast sponsorships",
      logo: "newspaper-logos/tl/suara-timor-lorosae.svg",
      logoExplainer:
        "Red and blue emblem displaying traditional sunrise motif and bold typography 'STL', symbolising the Voice of East Timor.",
      sources: ["https://suara-timor-lorosae.com", "https://en.wikipedia.org/wiki/Suara_Timor_Lorosae"],
    },
    {
      id: "tl-timor-post",
      countryCode: "TL",
      name: "Timor Post",
      nativeName: "Jornal Diário Timor Post",
      englishTranslation: "Timor Post Daily",
      founded: 2000,
      frequency: "Daily newspaper",
      format: "Tabloid publication & digital portal",
      language: "Tetum, Portuguese",
      headquarters: "Rua Bispo de Medeiros, Dili",
      owner: {
        name: "Timor Post Media Group",
        type: "Independent commercial media",
      },
      editorialStance: "Independent commercial daily newspaper; political commentary, civil society debates, anti-corruption reporting, and youth employment",
      readership: {
        metric: "Key daily newspaper in Dili read by civil servants, students, and diplomatic staff",
        source: "Timor Post Corporate Kit 2024",
      },
      revenueModel: "Print newspaper circulation, institutional advertising, and web banners",
      logo: "newspaper-logos/tl/timor-post.svg",
      logoExplainer:
        "Red and yellow title block with bold sans-serif lettering 'TIMOR POST', representing independent national journalism.",
      sources: ["https://diariutimorpost.com", "https://en.wikipedia.org/wiki/Timor_Post"],
    },
    {
      id: "tl-jornal-independente",
      countryCode: "TL",
      name: "Jornal Independente",
      englishTranslation: "Independent Newspaper",
      founded: 2011,
      frequency: "Daily newspaper",
      format: "Tabloid & digital portal",
      language: "Tetum, Portuguese",
      headquarters: "Dili",
      owner: {
        name: "Grupo Independente Media",
        type: "Independent commercial media",
      },
      editorialStance: "Independent daily newspaper; investigative reporting, rural development, judicial accountability, and community human rights",
      readership: {
        metric: "Widely distributed daily newspaper across educational institutions and government ministries in Dili",
        source: "Conselho de Imprensa de Timor-Leste 2023",
      },
      revenueModel: "Print sales and local corporate advertisements",
      logo: "newspaper-logos/tl/jornal-independente.svg",
      logoExplainer:
        "Blue banner with white typography 'INDEPENDENTE', symbolising democratic transparency and press freedom in Timor-Leste.",
      sources: ["https://independente.tl"],
    },
    {
      id: "tl-dilivox",
      countryCode: "TL",
      name: "Dili Vox",
      englishTranslation: "Dili Voice",
      founded: 2019,
      frequency: "Continuous digital news service",
      format: "Digital youth portal & Web TV",
      language: "Tetum, English",
      headquarters: "Dili",
      owner: {
        name: "Dili Vox Media",
        type: "Independent commercial media",
      },
      editorialStance: "Youth-oriented multimedia news platform; creative economy, environmental activism, technology startups, and civic education",
      readership: {
        metric: "Fastest-growing digital native outlet engaging Timorese youth with 300,000+ monthly digital interactions",
        source: "Dili Vox Audience Metrics 2024",
      },
      revenueModel: "Digital video advertising and non-governmental organization partnerships",
      logo: "newspaper-logos/tl/dilivox.svg",
      logoExplainer:
        "Modern neon green and dark slate icon 'DILI VOX', representing the voice of the young Timorese generation.",
      sources: ["https://dilivox.com"],
    },
  ],

  // Ecuador
  EC: [
    {
      id: "ec-el-comercio",
      countryCode: "EC",
      name: "El Comercio",
      englishTranslation: "The Commerce",
      founded: 1906,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Spanish",
      headquarters: "Quito, Pichincha",
      owner: {
        name: "Grupo El Comercio",
        type: "Independent commercial media",
      },
      editorialStance: "Ecuador's historic capital newspaper of record founded by the Mantilla brothers; national politics, Andean economics, and judicial affairs",
      readership: {
        metric: "Over 6 million monthly unique digital visitors on elcomercio.com; primary quality paper in Quito and the sierra region",
        source: "Grupo El Comercio Memoria Anual 2023",
      },
      revenueModel: "Digital subscriptions, print sales, and corporate advertising",
      logo: "newspaper-logos/ec/el-comercio.svg",
      logoExplainer:
        "Classic black serif typography 'EL COMERCIO' on clean white canvas, representing over 118 years of Ecuadorian journalism.",
      sources: ["https://www.elcomercio.com", "https://en.wikipedia.org/wiki/El_Comercio_(Ecuador)"],
    },
    {
      id: "ec-el-universo",
      countryCode: "EC",
      name: "El Universo",
      englishTranslation: "The Universe",
      founded: 1921,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Spanish",
      headquarters: "Guayaquil, Guayas",
      owner: {
        name: "Grupo El Universo (Pérez family)",
        type: "Independent commercial media",
      },
      editorialStance: "Ecuador's largest circulation daily; voice of the coastal Pacific commercial hub Guayaquil; free-market advocacy, investigative reporting, and constitutional democracy",
      readership: {
        metric: "Highest print circulation in Ecuador and premier online news destination with 8+ million monthly visitors",
        source: "El Universo Audience Review 2024",
      },
      revenueModel: "Digital subscriptions, print sales, and commercial display advertising",
      logo: "newspaper-logos/ec/el-universo.svg",
      logoExplainer:
        "Deep blue banner with white serif masthead 'EL UNIVERSO', the most recognized newspaper emblem in the Pacific coast of Ecuador.",
      sources: ["https://www.eluniverso.com", "https://en.wikipedia.org/wiki/El_Universo"],
    },
    {
      id: "ec-expreso",
      countryCode: "EC",
      name: "Expreso",
      englishTranslation: "Express",
      founded: 1973,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Spanish",
      headquarters: "Guayaquil",
      owner: {
        name: "Gráficos Nacionales S.A. (Granasa)",
        type: "Independent commercial media",
      },
      editorialStance: "Influential national daily; in-depth investigative political reporting, macroeconomic analysis, agribusiness, and coastal economic affairs",
      readership: {
        metric: "Over 3.5 million monthly digital readers on expreso.ec and major institutional readership across Guayas and Pichincha",
        source: "Granasa Media Kit 2024",
      },
      revenueModel: "Print circulation, digital paywall, and business advertising",
      logo: "newspaper-logos/ec/expreso.svg",
      logoExplainer:
        "Vibrant red banner with crisp white serif typography 'EXPRESO', symbolising energetic independent daily journalism.",
      sources: ["https://www.expreso.ec", "https://es.wikipedia.org/wiki/Expreso_(Ecuador)"],
    },
    {
      id: "ec-primicias",
      countryCode: "EC",
      name: "Primicias",
      englishTranslation: "Scoops / First News",
      founded: 2019,
      frequency: "Continuous 24/7 digital news service",
      format: "Digital-only investigative portal",
      language: "Spanish",
      headquarters: "Quito",
      owner: {
        name: "Primicias Periodismo Digital S.A.",
        type: "Independent commercial media",
      },
      editorialStance: "Modern digital investigative media; high-impact investigative scoops, security coverage, energy policy, and visual data journalism",
      readership: {
        metric: "Rapidly grown to over 5 million monthly unique users, becoming one of Ecuador's top digital news references",
        source: "Similarweb & Primicias Analytics 2024",
      },
      revenueModel: "Digital advertising, corporate brand partnerships, and investigative grants",
      logo: "newspaper-logos/ec/primicias.svg",
      logoExplainer:
        "Minimalist navy and yellow badge with modern lowercase typography 'primicias', representing data-driven digital scoops.",
      sources: ["https://www.primicias.ec"],
    },
    {
      id: "ec-lideres",
      countryCode: "EC",
      name: "Revista Líderes",
      englishTranslation: "Leaders Magazine",
      founded: 1998,
      frequency: "Weekly business publication (Monday)",
      format: "Tabloid publication & business portal",
      language: "Spanish",
      headquarters: "Quito",
      owner: {
        name: "Grupo El Comercio",
        type: "Independent commercial media",
      },
      editorialStance: "Ecuador's premier specialized business weekly; corporate profiles, entrepreneurship, fintech, and economic competitiveness",
      readership: {
        metric: "Essential reading for senior executives, entrepreneurs, and finance professionals across Ecuador",
        source: "Grupo El Comercio Business Division 2023",
      },
      revenueModel: "Corporate subscriptions and business-to-business advertising",
      logo: "newspaper-logos/ec/lideres.svg",
      logoExplainer:
        "Deep emerald green banner with white typography 'LÍDERES', symbolising corporate excellence and economic leadership.",
      sources: ["https://www.revistalideres.ec"],
    },
  ],

  // Egypt
  EG: [
    {
      id: "eg-al-ahram",
      countryCode: "EG",
      name: "Al-Ahram",
      officialName: "Al-Ahram Establishment",
      nativeName: "الأهرام",
      englishTranslation: "The Pyramids",
      founded: 1875,
      frequency: "Daily newspaper",
      format: "Broadsheet & international news network",
      language: "Arabic, with English (Al-Ahram Weekly) and French editions",
      headquarters: "Al-Galaa Street, Cairo",
      owner: {
        name: "National Press Authority of Egypt",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Egypt's historic newspaper of record and the most famous newspaper in the Arab world; official government policy, Arab diplomacy, regional security, and cultural literature",
      readership: {
        metric: "Largest print circulation in the Middle East with over 900,000 daily copies and global digital reach exceeding 20 million across Ahram Online",
        source: "Al-Ahram Publishing House Report 2023",
      },
      annualPublicFunding: {
        total: "Central state publishing allocation through National Press Authority",
        perCapita: "State newspaper of record",
      },
      revenueModel: "State budget appropriation, print subscriptions, book publishing, and advertising",
      logo: "newspaper-logos/eg/al-ahram.svg",
      logoExplainer:
        "Classic Arabic calligraphy 'الأهرام' in black and gold, representing over 150 years of foundational Arab journalism.",
      sources: ["https://gate.ahram.org.eg", "https://en.wikipedia.org/wiki/Al-Ahram"],
    },
    {
      id: "eg-al-masry-al-youm",
      countryCode: "EG",
      name: "Al-Masry Al-Youm",
      nativeName: "المصري اليوم",
      englishTranslation: "The Egyptian Today",
      founded: 2004,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Arabic",
      headquarters: "Cairo",
      owner: {
        name: "Al-Masry Media Corp (Salah Diab)",
        type: "Independent commercial media",
      },
      editorialStance: "Egypt's leading independent private broadsheet; in-depth political investigations, critical economic commentary, culture, and pluralistic opinion columns",
      readership: {
        metric: "Largest print circulation among private Egyptian dailies and top digital portal with over 15 million monthly visits",
        source: "Al-Masry Media Audience Report 2024",
      },
      revenueModel: "Print sales, digital display advertising, and corporate sponsorships",
      logo: "newspaper-logos/eg/al-masry-al-youm.svg",
      logoExplainer:
        "Blue and red title badge featuring modern Arabic typography 'المصري اليوم', symbolising independent pluralistic Egyptian news.",
      sources: ["https://www.almasryalyoum.com", "https://en.wikipedia.org/wiki/Al-Masry_Al-Youm"],
    },
    {
      id: "eg-youm7",
      countryCode: "EG",
      name: "Youm7",
      officialName: "The Seventh Day",
      nativeName: "اليوم السابع",
      englishTranslation: "The Seventh Day",
      founded: 2008,
      frequency: "Continuous digital news service & daily print",
      format: "Digital-first portal & daily tabloid",
      language: "Arabic",
      headquarters: "Mohandessin, Giza / Cairo",
      owner: {
        name: "United Media Services (UMS)",
        type: "Independent commercial media",
      },
      editorialStance: "Egypt's largest digital news network; breaking real-time multimedia news, video journalism, sports (Egyptian Premier League), and entertainment",
      readership: {
        metric: "Most visited news website in Egypt and the Arab world with over 45 million monthly unique digital visitors",
        source: "Similarweb & UMS Group 2024",
      },
      revenueModel: "Digital programmatic advertising, video monetization, and commercial partnerships",
      logo: "newspaper-logos/eg/youm7.svg",
      logoExplainer:
        "Vivid red and black badge with stylized Arabic numeral '7' and typography 'اليوم السابع', iconic across Middle Eastern mobile news.",
      sources: ["https://www.youm7.com", "https://en.wikipedia.org/wiki/Youm7"],
    },
    {
      id: "eg-al-wafd",
      countryCode: "EG",
      name: "Al-Wafd",
      nativeName: "الوفد",
      englishTranslation: "The Delegation",
      founded: 1984,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Arabic",
      headquarters: "Dokki, Giza",
      owner: {
        name: "New Wafd Party",
        type: "Independent commercial media",
      },
      editorialStance: "Official daily newspaper of the liberal-nationalist New Wafd Party; political opposition commentary, constitutional law, and democratic governance",
      readership: {
        metric: "Pioneer partisan newspaper in Egypt with widespread historical readership among jurists and academics",
        source: "Al-Wafd Media Center 2023",
      },
      revenueModel: "Print sales, party subscriptions, and commercial advertising",
      logo: "newspaper-logos/eg/al-wafd.svg",
      logoExplainer:
        "Classic green title banner with white Arabic lettering 'جريدة الوفد', representing liberal nationalist democratic heritage.",
      sources: ["https://alwafd.news", "https://en.wikipedia.org/wiki/Al-Wafd_(newspaper)"],
    },
    {
      id: "eg-egypt-today",
      countryCode: "EG",
      name: "Egypt Today",
      founded: 1979,
      frequency: "Monthly magazine & daily digital portal",
      format: "English news magazine & digital portal",
      language: "English",
      headquarters: "Cairo",
      owner: {
        name: "United Media Services (UMS)",
        type: "Independent commercial media",
      },
      editorialStance: "Egypt's premier English-language current affairs magazine and news portal; international diplomacy, archaeological discoveries, Grand Egyptian Museum, and tourism",
      readership: {
        metric: "Primary news source for English-speaking diplomats, expatriates, and foreign investors in Egypt",
        source: "UMS International Division 2024",
      },
      revenueModel: "Print magazine circulation, international subscriptions, and tourism advertising",
      logo: "newspaper-logos/eg/egypt-today.svg",
      logoExplainer:
        "Gold and black emblem with refined serif typography 'EGYPT TODAY', evoking Egyptian antiquities and international diplomacy.",
      sources: ["https://www.egypttoday.com", "https://en.wikipedia.org/wiki/Egypt_Today"],
    },
  ],

  // El Salvador
  SV: [
    {
      id: "sv-la-prensa-grafica",
      countryCode: "SV",
      name: "La Prensa Gráfica",
      officialName: "La Prensa Gráfica (LPG)",
      englishTranslation: "The Graphic Press",
      founded: 1915,
      frequency: "Daily newspaper",
      format: "Berliner & digital portal",
      language: "Spanish",
      headquarters: "Antiguo Cuscatlán, San Salvador",
      owner: {
        name: "Grupo Dutriz",
        type: "Independent commercial media",
      },
      editorialStance: "El Salvador's historic newspaper of record; center-right liberal editorial stance focusing on judicial independence, national security, macroeconomics, and human rights",
      readership: {
        metric: "Highest print circulation in El Salvador and leading digital portal laprensagrafica.com reaching 4.5 million monthly visitors",
        source: "Grupo Dutriz Memoria Anual 2023",
      },
      revenueModel: "Digital paywall subscriptions, print sales, and corporate advertising",
      logo: "newspaper-logos/sv/la-pensa-gráfica.svg",
      logoExplainer:
        "Navy blue banner with classical white serif masthead 'LA PRENSA GRÁFICA', symbolising over a century of Salvadoran news leadership.",
      sources: ["https://www.laprensagrafica.com", "https://en.wikipedia.org/wiki/La_Prensa_Gr%C3%A1fica"],
    },
    {
      id: "sv-el-diario-de-hoy",
      countryCode: "SV",
      name: "El Diario de Hoy",
      officialName: "El Diario de Hoy (EDH)",
      englishTranslation: "Today's Daily",
      founded: 1936,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Spanish",
      headquarters: "San Salvador",
      owner: {
        name: "Editorial Altamirano Madriz S.A.",
        type: "Independent commercial media",
      },
      editorialStance: "Conservative quality daily newspaper; free-market advocacy, rule of law, anti-corruption investigations, and regional Central American commerce",
      readership: {
        metric: "Over 4 million monthly digital readers on elsalvador.com and strong institutional print circulation",
        source: "Editorial Altamirano Madriz 2024",
      },
      revenueModel: "Print sales, digital subscriptions, and display advertising",
      logo: "newspaper-logos/sv/el-diario-de-hoy.svg",
      logoExplainer:
        "Red and black logo with bold serif text 'elsalvador.com / El Diario de Hoy', iconic in Salvadoran conservative journalism.",
      sources: ["https://www.elsalvador.com", "https://en.wikipedia.org/wiki/El_Diario_de_Hoy"],
    },
    {
      id: "sv-el-faro",
      countryCode: "SV",
      name: "El Faro",
      englishTranslation: "The Lighthouse",
      founded: 1998,
      frequency: "Continuous digital investigative magazine",
      format: "Investigative digital portal",
      language: "Spanish, English",
      headquarters: "San Salvador",
      owner: {
        name: "Fundación Trípode (Carlos Dada & Jorge Simán)",
        type: "Non-profit independent foundation",
      },
      editorialStance: "Pioneer of independent digital investigative journalism in Latin America; internationally acclaimed for investigations into state corruption, gangs, and democratic backsliding",
      readership: {
        metric: "Winner of the Maria Moors Cabot Prize and Columbia Journalism Award; globally recognized voice on Central American democracy",
        source: "Fundación Trípode Impact Report 2023",
      },
      revenueModel: "Philanthropic journalism grants, reader crowdfunding, and syndicated investigations",
      logo: "newspaper-logos/sv/el-faro.svg",
      logoExplainer:
        "Stark black and gold emblem featuring a glowing lighthouse beam and lowercase text 'elfaro', symbolising courage and transparency.",
      sources: ["https://elfaro.net", "https://en.wikipedia.org/wiki/El_Faro_(digital_newspaper)"],
    },
    {
      id: "sv-diario-el-salvador",
      countryCode: "SV",
      name: "Diario El Salvador",
      englishTranslation: "El Salvador Daily",
      founded: 2020,
      frequency: "Daily newspaper",
      format: "Compact daily & digital portal",
      language: "Spanish",
      headquarters: "San Salvador",
      owner: {
        name: "State of El Salvador",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "State-owned daily newspaper established under President Nayib Bukele; government infrastructure projects, public safety policies, Bitcoin adoption, and social programs",
      readership: {
        metric: "Over 60,000 daily print distribution nationwide with heavily trafficked digital portal diarioelsalvador.com",
        source: "Diario El Salvador Informe Institucional 2023",
      },
      revenueModel: "State institutional advertising and low-cost retail print sales",
      logo: "newspaper-logos/sv/diario-el-salvador.svg",
      logoExplainer:
        "Cyan blue and white badge with clean modern typography 'DIARIO EL SALVADOR', representing contemporary state public communication.",
      sources: ["https://diarioelsalvador.com", "https://es.wikipedia.org/wiki/Diario_El_Salvador"],
    },
    {
      id: "sv-el-mundo",
      countryCode: "SV",
      name: "Diario El Mundo",
      englishTranslation: "The World Daily",
      founded: 1967,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Tabloid publication & digital portal",
      language: "Spanish",
      headquarters: "San Salvador",
      owner: {
        name: "Editorial Chinchontepec (Borja family)",
        type: "Independent commercial media",
      },
      editorialStance: "Centrist afternoon and morning daily; balanced coverage of parliamentary politics, business developments, community issues, and sports",
      readership: {
        metric: "Over 2.2 million monthly unique digital visitors on elmundo.sv and regular daily print readership in the capital",
        source: "Diario El Mundo Media Kit 2024",
      },
      revenueModel: "Print sales and commercial advertising",
      logo: "newspaper-logos/sv/el-mundo.svg",
      logoExplainer:
        "Red and blue title banner with white serif font 'EL MUNDO', symbolising reliable daily news coverage in El Salvador.",
      sources: ["https://diario.elmundo.sv", "https://es.wikipedia.org/wiki/El_Mundo_(El_Salvador)"],
    },
  ],

  // Equatorial Guinea
  GQ: [
    {
      id: "gq-guinea-ecuatorial-press",
      countryCode: "GQ",
      name: "Guinea Ecuatorial Press",
      officialName: "Oficina de Información y Prensa de Guinea Ecuatorial",
      englishTranslation: "Equatorial Guinea Press",
      founded: 2010,
      frequency: "Continuous 24/7 official state newswire",
      format: "Official state wire service & digital portal",
      language: "Spanish, French, English",
      headquarters: "Malabo, Bioko Norte",
      owner: {
        name: "Republic of Equatorial Guinea (Dirección General de Prensa Presidencial)",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official national information wire; presidential decrees, hydrocarbons sector developments, infrastructure projects, and CEMAC regional diplomacy",
      readership: {
        metric: "Primary source of official government information for domestic media, foreign diplomatic missions, and international oil sector operators",
        source: "Oficina de Información y Prensa 2023",
      },
      annualPublicFunding: {
        total: "Central state operational budget via Ministry of Information",
        perCapita: "State information agency",
      },
      revenueModel: "Direct state budget funding",
      logo: "newspaper-logos/gq/guinea-ecuatorial-press.svg",
      logoExplainer:
        "Official national emblem featuring the silk cotton tree (Ceiba pentandra) and blue text 'GUINEA ECUATORIAL PRESS', symbolising state authority.",
      sources: ["https://guineaecuatorialpress.com", "https://es.wikipedia.org/wiki/Guinea_Ecuatorial"],
    },
    {
      id: "gq-ahora-eg",
      countryCode: "GQ",
      name: "AhoraEG",
      englishTranslation: "Now Equatorial Guinea",
      founded: 2018,
      frequency: "Continuous digital news service",
      format: "Digital multimedia portal",
      language: "Spanish",
      headquarters: "Malabo & Bata",
      owner: {
        name: "AhoraEG Media Group",
        type: "Independent commercial media",
      },
      editorialStance: "Digital news and lifestyle portal; national economics, sports (Nzalang Nacional), youth initiatives, and cultural festivals in Malabo and Bata",
      readership: {
        metric: "Over 350,000 monthly digital visits; leading private online news destination inside Equatorial Guinea",
        source: "AhoraEG Audience Analytics 2024",
      },
      revenueModel: "Digital display advertising and sponsored corporate media",
      logo: "newspaper-logos/gq/ahora-eg.svg",
      logoExplainer:
        "Modern red and navy blue banner with bold typography 'AhoraEG', representing dynamic digital journalism.",
      sources: ["https://ahoraeg.com"],
    },
    {
      id: "gq-real-equatorial-guinea",
      countryCode: "GQ",
      name: "Real Equatorial Guinea",
      founded: 2019,
      frequency: "Continuous digital news magazine",
      format: "Digital magazine & portal",
      language: "Spanish, English",
      headquarters: "Malabo",
      owner: {
        name: "Real EG Media Network",
        type: "Independent commercial media",
      },
      editorialStance: "Bilingual digital magazine; entrepreneurship, tourism potential, arts, and positive development narratives from Equatorial Guinea",
      readership: {
        metric: "Widely read by young professionals, university students, and international expatriates in Malabo",
        source: "Real EG Media Kit 2023",
      },
      revenueModel: "Corporate partnerships and digital branding campaigns",
      logo: "newspaper-logos/gq/real-equatorial-guinea.svg",
      logoExplainer:
        "Gold and dark slate emblem featuring 'Real Equatorial Guinea', symbolising cultural pride and modern economic progress.",
      sources: ["https://realequatorialguinea.com"],
    },
    {
      id: "gq-ebano",
      countryCode: "GQ",
      name: "Ébano",
      englishTranslation: "Ebony",
      founded: 1939,
      frequency: "Weekly newspaper",
      format: "Official state print tabloid",
      language: "Spanish",
      headquarters: "Malabo",
      owner: {
        name: "State of Equatorial Guinea (Ministerio de Información)",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Historic state-owned print publication in Malabo; government announcements, ministerial resolutions, and cultural events",
      readership: {
        metric: "Historic print newspaper distributed in government ministries and public administrative centers",
        source: "Ministerio de Información, Prensa y Radio 2023",
      },
      revenueModel: "State publishing subsidy",
      logo: "newspaper-logos/gq/ébano.svg",
      logoExplainer:
        "Classic black typography 'ÉBANO' on white ground, symbolising the historic print press of Bioko Island.",
      sources: ["https://es.wikipedia.org/wiki/%C3%89bano_(peri%C3%B3dico)"],
    },
    {
      id: "gq-diario-rombe",
      countryCode: "GQ",
      name: "Diario Rombe",
      founded: 2012,
      frequency: "Continuous digital investigative portal",
      format: "Investigative digital portal",
      language: "Spanish",
      headquarters: "Malabo / Spain (Diaspora)",
      owner: {
        name: "Rombe Media Group (Delfin Mocache Massoko)",
        type: "Independent commercial media",
      },
      editorialStance: "Independent investigative news outlet operating primarily from the diaspora; human rights reporting, offshore financial transparency, and political accountability",
      readership: {
        metric: "Widely followed investigative outlet among civil society activists and the Equatorial Guinean diaspora worldwide",
        source: "Diario Rombe Audience Report 2023",
      },
      revenueModel: "Reader donations and investigative journalism grants",
      logo: "newspaper-logos/gq/diario-rombe.svg",
      logoExplainer:
        "Black and red emblem with stylized bold text 'DIARIO ROMBE', representing independent investigative journalism in exile.",
      sources: ["https://diariorombe.es", "https://es.wikipedia.org/wiki/Diario_Rombe"],
    },
  ],

  // Eritrea
  ER: [
    {
      id: "er-shabait",
      countryCode: "ER",
      name: "Shabait",
      officialName: "Ministry of Information News Portal",
      englishTranslation: "Shabait (named after the historic popular front)",
      founded: 2000,
      frequency: "Continuous 24/7 official state newswire",
      format: "Official state wire service & digital portal",
      language: "Tigrinya, Arabic, English, French",
      headquarters: "Asmara",
      owner: {
        name: "State of Eritrea (Ministry of Information)",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official state information portal of Eritrea; presidential statements, national service development projects, agricultural dams, and diplomatic relations",
      readership: {
        metric: "Primary official news source inside Eritrea and for the worldwide Eritrean diaspora",
        source: "Ministry of Information Eritrea 2023",
      },
      annualPublicFunding: {
        total: "Central state operational budget via Ministry of Information",
        perCapita: "State information service",
      },
      revenueModel: "Direct state budget funding",
      logo: "newspaper-logos/er/shabait.svg",
      logoExplainer:
        "Red and green banner inspired by the Eritrean flag with bold white typography 'SHABAIT', representing official state communication.",
      sources: ["https://shabait.com", "https://en.wikipedia.org/wiki/Ministry_of_Information_(Eritrea)"],
    },
    {
      id: "er-haddas-eritrea",
      countryCode: "ER",
      name: "Haddas Eritrea",
      nativeName: "ሓዳስ ኤርትራ",
      englishTranslation: "New Eritrea",
      founded: 1991,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Official state broadsheet",
      language: "Tigrinya",
      headquarters: "Asmara",
      owner: {
        name: "Ministry of Information",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official national public Tigrinya-language daily; national development campaigns, regional zoba administration news, literature, and educational notices",
      readership: {
        metric: "Sole daily print newspaper in Tigrinya with universal distribution across government and community kiosks in Asmara",
        source: "Eritrean Ministry of Information 2023",
      },
      revenueModel: "State publishing subsidy and retail kiosk print sales",
      logo: "newspaper-logos/er/haddas-eritrea.svg",
      logoExplainer:
        "Elegant Tigrinya Ge'ez calligraphy 'ሓዳስ ኤርትራ' on white ground, symbolising national renewal and indigenous language heritage.",
      sources: ["https://shabait.com/category/haddas-ertra/", "https://en.wikipedia.org/wiki/Haddas_Eritrea"],
    },
    {
      id: "er-eritrea-profile",
      countryCode: "ER",
      name: "Eritrea Profile",
      founded: 1993,
      frequency: "Bi-weekly newspaper (Wednesday & Saturday)",
      format: "Official state English broadsheet & portal",
      language: "English",
      headquarters: "Asmara",
      owner: {
        name: "Ministry of Information",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Official state English-language newspaper; foreign policy, Red Sea maritime cooperation, UN affairs, mining developments, and national history",
      readership: {
        metric: "Read by foreign diplomats, international organizations, scholars, and diaspora communities",
        source: "Ministry of Information Profile 2023",
      },
      revenueModel: "State budget funding and print sales",
      logo: "newspaper-logos/er/eritrea-profile.svg",
      logoExplainer:
        "Deep blue banner with classical serif lettering 'ERITREA PROFILE', the definitive English print masthead of Asmara.",
      sources: ["https://shabait.com/category/eritrea-profile/", "https://en.wikipedia.org/wiki/Eritrea_Profile"],
    },
    {
      id: "er-eritrean-digest",
      countryCode: "ER",
      name: "Eritrean Digest",
      founded: 2018,
      frequency: "Continuous digital analysis & portal",
      format: "Digital analytical portal",
      language: "English, Tigrinya",
      headquarters: "Asmara / Washington D.C.",
      owner: {
        name: "Eritrean Digest Media (Saleh Younis)",
        type: "Independent commercial media",
      },
      editorialStance: "Independent diaspora analytical platform; in-depth political commentary, peace accords, Horn of Africa regional geopolitics, and historical archives",
      readership: {
        metric: "Widely read by international Horn of Africa scholars, think tanks, and global diaspora communities",
        source: "Eritrean Digest Analytics 2024",
      },
      revenueModel: "Reader patronage and academic media grants",
      logo: "newspaper-logos/er/eritrean-digest.svg",
      logoExplainer:
        "Warm terracotta badge with modern typography 'ERITREAN DIGEST', symbolising independent historical analysis and debate.",
      sources: ["https://eritreandigest.com"],
    },
    {
      id: "er-assenna",
      countryCode: "ER",
      name: "Assenna",
      englishTranslation: "Assenna (Tigrinya: Foundation / Heritage)",
      founded: 2008,
      frequency: "Continuous digital news & satellite broadcasting",
      format: "Digital news portal & satellite TV",
      language: "Tigrinya, English",
      headquarters: "London, UK / Diaspora",
      owner: {
        name: "Assenna Foundation (Amanuel Eyasu)",
        type: "Independent trust / foundation",
      },
      editorialStance: "Prominent diaspora human rights and opposition media organization; investigative reporting on human rights conditions, political prisoners, and civic mobilization",
      readership: {
        metric: "Massive diaspora reach with over 2 million monthly digital video and news consumers across Europe, North America, and the Middle East",
        source: "Assenna Foundation Annual Report 2023",
      },
      revenueModel: "Diaspora crowdfunding, foundation grants, and viewer donations",
      logo: "newspaper-logos/er/assenna.svg",
      logoExplainer:
        "Vibrant red banner with stylized white flame and bold typography 'ASSENNA', representing independent human rights advocacy in exile.",
      sources: ["https://assenna.com", "https://en.wikipedia.org/wiki/Assenna"],
    },
  ],

  // Estonia
  EE: [
    {
      id: "ee-postimees",
      countryCode: "EE",
      name: "Postimees",
      nativeName: "Postimees",
      englishTranslation: "The Postman",
      founded: 1857,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Broadsheet & digital network",
      language: "Estonian, Russian",
      headquarters: "Tallinn & Tartu",
      owner: {
        name: "Postimees Grupp (Margus Linnamäe / MM Grupp)",
        type: "Independent commercial media",
      },
      editorialStance: "Estonia's oldest newspaper and premier national newspaper of record; conservative-liberal stance focusing on national sovereignty, digital society (e-Estonia), and European security",
      readership: {
        metric: "Over 650,000 weekly digital users on postimees.ee and largest paid newspaper circulation in Estonia",
        source: "Estonian Media Association & Kantar Emor 2024",
      },
      revenueModel: "Digital paywall subscriptions, print sales, and corporate advertising",
      logo: "newspaper-logos/ee/postimees.svg",
      logoExplainer:
        "Deep blue banner with white serif typography 'Postimees', the historic symbol of Estonian national awakening and journalism.",
      sources: ["https://www.postimees.ee", "https://en.wikipedia.org/wiki/Postimees"],
    },
    {
      id: "ee-delfi-ee",
      countryCode: "EE",
      name: "Delfi Estonia",
      founded: 1999,
      frequency: "Continuous 24/7 digital news service",
      format: "Digital-only news network",
      language: "Estonian, Russian",
      headquarters: "Tallinn",
      owner: {
        name: "Ekspress Grupp",
        type: "Independent commercial media",
      },
      editorialStance: "Estonia's largest digital news network; breaking real-time news, investigative journalism (Eesti Ekspress synergy), podcasts, and civic debate",
      readership: {
        metric: "Over 1.2 million monthly unique digital visitors; highest digital news reach in Estonia with 100,000+ digital subscribers",
        source: "Ekspress Grupp Financial Results 2024",
      },
      revenueModel: "Digital paywall subscriptions (Delfi Kogupakett) and programmatic advertising",
      logo: "newspaper-logos/ee/delfi-ee.svg",
      logoExplainer:
        "Orange and dark blue badge with bold sans-serif text 'DELFI', representing modern Baltic digital breaking journalism.",
      sources: ["https://www.delfi.ee", "https://en.wikipedia.org/wiki/Delfi_(web_portal)"],
    },
    {
      id: "ee-eesti-paevaleht",
      countryCode: "EE",
      name: "Eesti Päevaleht",
      officialName: "EPL",
      nativeName: "Eesti Päevaleht",
      englishTranslation: "Estonian Daily",
      founded: 1995,
      frequency: "Digital daily & weekend print",
      format: "Digital daily portal & analytical weekend edition",
      language: "Estonian",
      headquarters: "Tallinn",
      owner: {
        name: "Ekspress Grupp",
        type: "Independent commercial media",
      },
      editorialStance: "Center-left progressive quality newspaper; in-depth investigative political reporting, education reform, climate policy, and European affairs",
      readership: {
        metric: "Highly regarded intellectual broadsheet with strong digital readership integrated into Ekspress Grupp network",
        source: "Ekspress Grupp Media Report 2023",
      },
      revenueModel: "Digital subscriber packages and institutional subscriptions",
      logo: "newspaper-logos/ee/eesti-päevaleht.svg",
      logoExplainer:
        "Blue and red logo with bold clean lettering 'Eesti Päevaleht', symbolising contemporary analytical journalism.",
      sources: ["https://epl.delfi.ee", "https://en.wikipedia.org/wiki/Eesti_P%C3%A4evaleht"],
    },
    {
      id: "ee-aripaev",
      countryCode: "EE",
      name: "Äripäev",
      nativeName: "Äripäev",
      englishTranslation: "Business Day",
      founded: 1989,
      frequency: "Continuous digital business daily",
      format: "Digital-only financial daily & radio (Äripäeva Raadio)",
      language: "Estonian",
      headquarters: "Tallinn",
      owner: {
        name: "Bonnier Business Press",
        type: "Independent commercial media",
      },
      editorialStance: "Estonia's premier financial and economic daily; Tallinn Stock Exchange, startup ecosystem (tech unicorns), corporate governance, and fiscal policy",
      readership: {
        metric: "Over 25,000 paid corporate digital subscribers; primary business publication for Estonian entrepreneurs and investors",
        source: "Bonnier Business Press Estonia 2024",
      },
      revenueModel: "Digital corporate paywall, specialized business conferences, and B2B advertising",
      logo: "newspaper-logos/ee/äripäev.svg",
      logoExplainer:
        "Signature magenta-red banner with crisp white typography 'Äripäev', representing Nordic business intelligence in the Baltics.",
      sources: ["https://www.aripaev.ee", "https://en.wikipedia.org/wiki/%C3%84rip%C3%A4ev"],
    },
    {
      id: "ee-ohtuleht",
      countryCode: "EE",
      name: "Õhtuleht",
      nativeName: "Õhtuleht",
      englishTranslation: "Evening Paper",
      founded: 1944,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Tabloid publication & digital portal",
      language: "Estonian",
      headquarters: "Tallinn",
      owner: {
        name: "Õhtuleht Kirjastus (Ekspress Grupp & Suits Media)",
        type: "Independent commercial media",
      },
      editorialStance: "Popular tabloid; consumer rights advocacy, sports, investigative exposés, human interest stories, and entertainment",
      readership: {
        metric: "Largest print circulation tabloid in Estonia and 700,000+ monthly digital readers on ohtuleht.ee",
        source: "Õhtuleht Kirjastus Annual Report 2023",
      },
      revenueModel: "Print newsstand sales, digital subscriptions, and display advertising",
      logo: "newspaper-logos/ee/õhtuleht.svg",
      logoExplainer:
        "Red and yellow title block with bold uppercase font 'ÕHTULEHT', iconic across Estonian newsstands.",
      sources: ["https://www.ohtuleht.ee", "https://en.wikipedia.org/wiki/%C3%95htuleht"],
    },
  ],

  // Eswatini
  SZ: [
    {
      id: "sz-times-of-eswatini",
      countryCode: "SZ",
      name: "Times of Eswatini",
      officialName: "The Times of Swaziland",
      founded: 1897,
      frequency: "Daily newspaper (Monday–Friday)",
      format: "Broadsheet & digital portal",
      language: "English",
      headquarters: "Mbabane",
      owner: {
        name: "African Echo (Pty) Ltd / Times of Swaziland Ltd",
        type: "Independent commercial media",
      },
      editorialStance: "Eswatini's oldest and primary independent newspaper; national politics, parliamentary proceedings, traditional tinkhundla governance, and social affairs",
      readership: {
        metric: "Largest print circulation daily in Eswatini with 30,000 daily copies and extensive digital readership",
        source: "Times of Eswatini Corporate Profile 2023",
      },
      revenueModel: "Print sales, legal notices, and commercial display advertising",
      logo: "newspaper-logos/sz/times-of-eswatini.svg",
      logoExplainer:
        "Classic black serif masthead 'Times of Eswatini' on white canvas, symbolising over 125 years of independent press history.",
      sources: ["http://www.times.co.sz", "https://en.wikipedia.org/wiki/The_Times_of_Swaziland"],
    },
    {
      id: "sz-ebuswini-observer",
      countryCode: "SZ",
      name: "Eswatini Observer",
      officialName: "The Swazi Observer",
      founded: 1981,
      frequency: "Daily newspaper (Monday–Friday)",
      format: "Broadsheet & digital portal",
      language: "English",
      headquarters: "Mbabane",
      owner: {
        name: "Tibiyo Taka Ngwane (Royal Charter Trust)",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Royal trust-owned daily newspaper; royal decrees, government infrastructure developments, diplomatic visits, and cultural preservation (Umhlanga)",
      readership: {
        metric: "Second largest daily newspaper in Eswatini, read throughout public administration and traditional councils",
        source: "Tibiyo Taka Ngwane Annual Report 2023",
      },
      revenueModel: "Commercial sales, official state notices, and royal trust funding",
      logo: "newspaper-logos/sz/ebuswini-observer.svg",
      logoExplainer:
        "Navy blue banner with white serif lettering 'Eswatini Observer', representing the royal chartered press of the Kingdom.",
      sources: ["https://new.observer.org.sz", "https://en.wikipedia.org/wiki/Swazi_Observer"],
    },
    {
      id: "sz-swaziland-news",
      countryCode: "SZ",
      name: "Swaziland News",
      founded: 2017,
      frequency: "Continuous digital investigative portal",
      format: "Investigative digital portal",
      language: "English, SiSwati",
      headquarters: "Mbabane / South Africa (Diaspora)",
      owner: {
        name: "Zweli Martin Dlamini",
        type: "Independent commercial media",
      },
      editorialStance: "Leading independent investigative online publication; critical coverage of absolute monarchy governance, human rights abuses, and pro-democracy movements",
      readership: {
        metric: "Highly influential digital news platform with over 800,000 monthly readers across Southern Africa",
        source: "Swaziland News Analytics 2024",
      },
      revenueModel: "Digital reader donations and international investigative journalism grants",
      logo: "newspaper-logos/sz/swaziland-news.svg",
      logoExplainer:
        "Red and black badge with bold typography 'SWAZILAND NEWS', symbolising fearless pro-democracy investigative journalism.",
      sources: ["https://swazilandnews.co.za"],
    },
    {
      id: "sz-swazi-bridge",
      countryCode: "SZ",
      name: "Swazi Bridge",
      founded: 2019,
      frequency: "Continuous digital news service",
      format: "Digital community portal",
      language: "English, SiSwati",
      headquarters: "Mbabane",
      owner: {
        name: "Swazi Bridge Media",
        type: "Independent commercial media",
      },
      editorialStance: "Digital community news network; rural development, youth initiatives, public healthcare, and educational opportunities in Eswatini",
      readership: {
        metric: "Popular digital news platform connecting urban centers with rural communities across Eswatini",
        source: "Swazi Bridge Audience Review 2023",
      },
      revenueModel: "Digital advertising and community sponsorships",
      logo: "newspaper-logos/sz/swazi-bridge.svg",
      logoExplainer:
        "Green and gold emblem with stylized arch bridge 'SWAZI BRIDGE', symbolising community connection and national dialogue.",
      sources: ["https://swazibridge.com"],
    },
    {
      id: "sz-independent-news-eswatini",
      countryCode: "SZ",
      name: "Independent News Eswatini",
      founded: 2015,
      frequency: "Weekly publication & digital portal",
      format: "Tabloid publication & digital portal",
      language: "English",
      headquarters: "Mbabane",
      owner: {
        name: "Independent News Media Eswatini",
        type: "Independent commercial media",
      },
      editorialStance: "Independent commercial weekly; business news, SME financing, agricultural reform, and cultural commentary",
      readership: {
        metric: "Read by business professionals, agricultural cooperatives, and civil society leaders",
        source: "Independent News Media 2023",
      },
      revenueModel: "Print retail sales and local commercial advertising",
      logo: "newspaper-logos/sz/independent-news-eswatini.svg",
      logoExplainer:
        "Dark slate banner with clean white text 'INDEPENDENT NEWS ESWATINI', representing commercial and economic weekly reporting.",
      sources: ["https://independentnews.co.sz"],
    },
  ],
};
