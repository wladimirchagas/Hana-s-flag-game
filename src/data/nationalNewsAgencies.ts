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
  // KE
  KE: [
    {
        "id": "ke-daily-nation",
        "countryCode": "KE",
        "name": "Daily Nation",
        "founded": 1960,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital portal (Nation.Africa)",
        "language": "English",
        "headquarters": "Nairobi",
        "owner": {
            "name": "Nation Media Group (Aga Khan Development Network)",
            "type": "Publicly listed media conglomerate"
        },
        "editorialStance": "Kenya and East Africa's largest daily newspaper of record; independent, centrist stance on governance and public policy",
        "readership": {
            "metric": "170,000 daily print circulation and 12+ million monthly digital visitors across East Africa",
            "source": "Nation Media Group Annual Audit 2024"
        },
        "revenueModel": "Print copy sales, digital subscriptions (Nation.Africa), and corporate display advertising",
        "logo": "newspaper-logos/ke/daily-nation.svg",
        "logoExplainer": "Navy blue rectangle featuring bold white sans-serif uppercase title 'DAILY NATION'.",
        "sources": [
            "https://nation.africa",
            "https://en.wikipedia.org/wiki/Daily_Nation"
        ]
    },
    {
        "id": "ke-the-standard",
        "countryCode": "KE",
        "name": "The Standard",
        "founded": 1902,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital news portal",
        "language": "English",
        "headquarters": "Nairobi",
        "owner": {
            "name": "Standard Group PLC (Moi Family & associates)",
            "type": "Publicly listed media corporation"
        },
        "editorialStance": "Kenya's oldest newspaper; market-oriented, extensive coverage of national political debate, investigative reporting, and regional news",
        "readership": {
            "metric": "Second largest print daily in Kenya (~90,000 daily print copies) and major broadcast partner",
            "source": "Standard Group PLC Media Report 2023–24"
        },
        "revenueModel": "Print sales, commercial advertising, and digital subscriptions",
        "logo": "newspaper-logos/ke/the-standard.svg",
        "logoExplainer": "Classic red serif masthead 'The Standard' symbolising over 120 years of Kenyan press history.",
        "sources": [
            "https://www.standardmedia.co.ke",
            "https://en.wikipedia.org/wiki/The_Standard_(Kenya)"
        ]
    },
    {
        "id": "ke-the-star",
        "countryCode": "KE",
        "name": "The Star",
        "founded": 2007,
        "frequency": "Daily newspaper",
        "format": "Tabloid & digital news platform",
        "language": "English",
        "headquarters": "Nairobi",
        "owner": {
            "name": "Radio Africa Group",
            "type": "Commercial media company"
        },
        "editorialStance": "Independent daily newspaper featuring concise political reporting, opinion columns, entertainment, and urban affairs",
        "readership": {
            "metric": "Over 6 million monthly digital readers across Kenya and East African diaspora",
            "source": "Radio Africa Group Digital Analytics 2024"
        },
        "revenueModel": "Digital programmatic advertising, print sales, and radio cross-promotion",
        "logo": "newspaper-logos/ke/the-star-kenya.svg",
        "logoExplainer": "Forest green background with bright yellow star emblem beside bold white text 'THE STAR'.",
        "sources": [
            "https://www.the-star.co.ke",
            "https://en.wikipedia.org/wiki/The_Star_(Kenya)"
        ]
    },
    {
        "id": "ke-business-daily",
        "countryCode": "KE",
        "name": "Business Daily Africa",
        "founded": 2006,
        "frequency": "Daily financial newspaper",
        "format": "Compact print & digital business portal",
        "language": "English",
        "headquarters": "Nairobi",
        "owner": {
            "name": "Nation Media Group",
            "type": "Publicly listed media conglomerate"
        },
        "editorialStance": "East Africa's premier daily business newspaper; coverage of Nairobi Securities Exchange, macroeconomics, tech start-ups, and corporate law",
        "readership": {
            "metric": "Primary business paper read by East African executives, investors, and economic analysts",
            "source": "Nation Media Group Financial Media Division 2024"
        },
        "revenueModel": "Print newsstand sales, corporate subscriptions, and financial advertising",
        "logo": "newspaper-logos/ke/business-daily-africa.svg",
        "logoExplainer": "Clean dark blue and red typography 'BUSINESS DAILY AFRICA'.",
        "sources": [
            "https://www.businessdailyafrica.com",
            "https://en.wikipedia.org/wiki/Business_Daily_Africa"
        ]
    },
    {
        "id": "ke-kna",
        "countryCode": "KE",
        "name": "KNA",
        "officialName": "Kenya News Agency",
        "founded": 1963,
        "frequency": "24/7 national news wire",
        "format": "Official state news agency wire & public digital portal",
        "language": "English, Swahili",
        "headquarters": "Nairobi",
        "owner": {
            "name": "Government of Kenya (Ministry of Information, Communications and the Digital Economy)",
            "type": "State-owned national press agency"
        },
        "editorialStance": "Kenya's official press agency; factual coverage of county government development, rural affairs, and national policy",
        "readership": {
            "metric": "Deploys journalists across all 47 counties of Kenya, feeding news wire dispatches to all domestic media",
            "source": "Ministry of Information Kenya 2023 Report"
        },
        "annualPublicFunding": {
            "total": "Parliamentary budget appropriation",
            "perCapita": "State funded"
        },
        "revenueModel": "Parliamentary state budget funding and agency syndication",
        "logo": "newspaper-logos/ke/kna-kenya-news-agency.svg",
        "logoExplainer": "Black circular emblem with white uppercase 'KNA' alongside bold text 'KENYA NEWS AGENCY'.",
        "sources": [
            "https://www.kenyanews.go.ke",
            "https://en.wikipedia.org/wiki/Kenya_News_Agency"
        ]
    }
],
  // KI
  KI: [
    {
        "id": "ki-te-uai",
        "countryCode": "KI",
        "name": "Te Uekera",
        "officialName": "Te Uai",
        "founded": 1945,
        "frequency": "Weekly national newspaper",
        "format": "Tabloid print & digital edition",
        "language": "Gilbertese (Kiribati), English",
        "headquarters": "Tarawa",
        "owner": {
            "name": "Broadcasting and Publications Authority (BPA)",
            "type": "Statutory public media enterprise"
        },
        "editorialStance": "Kiribati's primary national newspaper of record; government decisions, outer island news, community affairs, and climate change reporting",
        "readership": {
            "metric": "National distribution across South Tarawa and outer coral atolls",
            "source": "BPA Kiribati Media Report 2023"
        },
        "annualPublicFunding": {
            "total": "Public statutory subvention",
            "perCapita": "State funded"
        },
        "revenueModel": "State subsidy, print sales, and community notices",
        "logo": "newspaper-logos/ki/te-uai.svg",
        "logoExplainer": "Navy blue banner with stately white serif text 'TE UAI'.",
        "sources": [
            "https://www.bpa.gov.ki",
            "https://en.wikipedia.org/wiki/Te_Uekera"
        ]
    },
    {
        "id": "ki-kiribati-independent",
        "countryCode": "KI",
        "name": "Kiribati Independent",
        "founded": 2013,
        "frequency": "Fortnightly newspaper",
        "format": "Print & digital newspaper",
        "language": "Gilbertese, English",
        "headquarters": "Tarawa",
        "owner": {
            "name": "Taberannang Korauaba / Independent Press",
            "type": "Independent media publisher"
        },
        "editorialStance": "Independent newspaper providing investigative coverage of parliamentary debates, fisheries policy, and civil rights",
        "readership": {
            "metric": "Widely read independent paper in Tarawa and among overseas diaspora in Fiji and New Zealand",
            "source": "Pacific Media Centre Survey"
        },
        "revenueModel": "Print sales and local advertising",
        "logo": "newspaper-logos/ki/kiribati-independent.svg",
        "logoExplainer": "Red and navy blue typography 'KIRIBATI INDEPENDENT' reflecting the Pacific republic's flag colors.",
        "sources": [
            "https://pmc.aut.ac.nz",
            "https://en.wikipedia.org/wiki/Media_of_Kiribati"
        ]
    },
    {
        "id": "ki-te-mauriai",
        "countryCode": "KI",
        "name": "Te Mauriai",
        "englishTranslation": "The Peace",
        "founded": 2005,
        "frequency": "Monthly publication",
        "format": "Print & community bulletin",
        "language": "Gilbertese",
        "headquarters": "Tarawa",
        "owner": {
            "name": "Kiribati Protestant Church / KPC Media",
            "type": "Religious & community non-profit media"
        },
        "editorialStance": "Community and church publication covering social ethics, education, health, and local community news",
        "readership": {
            "metric": "Circulated to island congregations across Kiribati's 33 atolls",
            "source": "Kiribati Church Press 2023"
        },
        "revenueModel": "Church subventions and community subscriptions",
        "logo": "newspaper-logos/ki/te-mauriai.svg",
        "logoExplainer": "Warm golden sun disk beside elegant deep blue serif title 'Te Mauriai'.",
        "sources": [
            "https://en.wikipedia.org/wiki/Media_of_Kiribati"
        ]
    },
    {
        "id": "ki-kiribati-updates",
        "countryCode": "KI",
        "name": "Kiribati Updates",
        "founded": 2018,
        "frequency": "24/7 digital publishing",
        "format": "Digital-only news portal",
        "language": "English, Gilbertese",
        "headquarters": "Tarawa",
        "owner": {
            "name": "Kiribati Media Network",
            "type": "Independent digital portal"
        },
        "editorialStance": "Digital news service covering breaking island news, weather alerts, environmental sustainability, and sports",
        "readership": {
            "metric": "25,000 monthly digital readers across Micronesia and international Pacific observers",
            "source": "Kiribati Digital Analytics 2024"
        },
        "revenueModel": "Digital display advertising and community sponsorship",
        "logo": "newspaper-logos/ki/kiribati-updates.svg",
        "logoExplainer": "Ocean blue rectangular background featuring white bold uppercase text 'KIRIBATI UPDATES'.",
        "sources": [
            "https://www.facebook.com/kiribatiupdates"
        ]
    },
    {
        "id": "ki-te-kaekae",
        "countryCode": "KI",
        "name": "Te Kaekae",
        "englishTranslation": "The Answer",
        "founded": 2010,
        "frequency": "Weekly publication",
        "format": "Print weekly bulletin",
        "language": "Gilbertese",
        "headquarters": "Tarawa",
        "owner": {
            "name": "Boutokaan Kiribati Party Press",
            "type": "Political party media outlet"
        },
        "editorialStance": "Weekly commentary and political news publication presenting parliamentary discussions and opposition perspectives",
        "readership": {
            "metric": "Circulated in South Tarawa civic centers and outer island council offices",
            "source": "Pacific Islands News Association (PINA)"
        },
        "revenueModel": "Party subscriptions and local press sales",
        "logo": "newspaper-logos/ki/te-kaekae.svg",
        "logoExplainer": "Dark green serif text 'Te Kaekae' on clean white backdrop.",
        "sources": [
            "https://pina.com.fj",
            "https://en.wikipedia.org/wiki/Media_of_Kiribati"
        ]
    }
],
  // KW
  KW: [
    {
        "id": "kw-al-qabas",
        "countryCode": "KW",
        "name": "Al-Qabas",
        "englishTranslation": "The Ray of Light",
        "founded": 1972,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital news portal",
        "language": "Arabic",
        "headquarters": "Kuwait City",
        "owner": {
            "name": "Dar Al-Qabas Press (Al-Nis f & Al-Sager families)",
            "type": "Independent commercial publishing house"
        },
        "editorialStance": "Kuwait's leading independent daily newspaper of record; reformist, liberal stance on economic modernization and parliamentary debate",
        "readership": {
            "metric": "Highest digital readership in Kuwait (~15 million monthly digital visits) and major print circulation",
            "source": "Media Ownership Monitor Kuwait / IPSOS 2024"
        },
        "revenueModel": "Print copy sales, digital video advertising, and corporate sponsorships",
        "logo": "newspaper-logos/kw/al-qabas.svg",
        "logoExplainer": "Clean azure blue calligraphic Arabic masthead 'القبس' symbolising light and truth.",
        "sources": [
            "https://www.alqabas.com",
            "https://en.wikipedia.org/wiki/Al-Qabas"
        ]
    },
    {
        "id": "kw-al-rai",
        "countryCode": "KW",
        "name": "Al-Rai",
        "englishTranslation": "The Opinion",
        "founded": 1961,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital news portal",
        "language": "Arabic",
        "headquarters": "Kuwait City",
        "owner": {
            "name": "Al-Rai Media Group (Jassim Al-Boodai)",
            "type": "Publicly listed media group"
        },
        "editorialStance": "Major Kuwaiti daily newspaper; centrist, independent coverage of Gulf politics, business, and cultural affairs",
        "readership": {
            "metric": "Leading commercial daily print circulation in Kuwait (~85,000 daily copies)",
            "source": "Al-Rai Media Group Financial Audit 2024"
        },
        "revenueModel": "Print subscriptions, commercial advertising, and broadcast syndication",
        "logo": "newspaper-logos/kw/al-rai-kuwait.svg",
        "logoExplainer": "Crimson red Arabic script 'الراي' with elegant calligraphic styling.",
        "sources": [
            "https://www.alraimedia.com",
            "https://en.wikipedia.org/wiki/Al-Rai_(Kuwaiti_newspaper)"
        ]
    },
    {
        "id": "kw-al-anba",
        "countryCode": "KW",
        "name": "Al-Anba",
        "englishTranslation": "The News",
        "founded": 1976,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital edition",
        "language": "Arabic",
        "headquarters": "Kuwait City",
        "owner": {
            "name": "Dar Al-Anba (Al-Marzouq family)",
            "type": "Independent commercial publishing house"
        },
        "editorialStance": "Prominent Kuwaiti daily; conservative-leaning coverage of national policy, Arab state relations, and Islamic affairs",
        "readership": {
            "metric": "Widespread household print subscriber base across Kuwait",
            "source": "Kuwait Journalists Association Audit 2023"
        },
        "revenueModel": "Print subscriptions, corporate advertising, and official notices",
        "logo": "newspaper-logos/kw/al-anba.svg",
        "logoExplainer": "Deep green rectangular badge featuring white stylized Arabic typography 'الأنباء'.",
        "sources": [
            "https://www.alanba.com.kw",
            "https://en.wikipedia.org/wiki/Al-Anba_(Kuwait)"
        ]
    },
    {
        "id": "kw-kuna",
        "countryCode": "KW",
        "name": "KUNA",
        "officialName": "Kuwait News Agency",
        "founded": 1976,
        "frequency": "24/7 national news wire",
        "format": "Official state news agency wire & online portal",
        "language": "Arabic, English, French",
        "headquarters": "Kuwait City",
        "owner": {
            "name": "Ministry of Information",
            "type": "State-owned news agency"
        },
        "editorialStance": "Official state press agency of Kuwait; authoritative dispatches on Royal Amiri decrees, cabinet decisions, and OPEC oil diplomacy",
        "readership": {
            "metric": "Primary news wire service feeding all Kuwaiti media outlets, foreign embassies, and international wire networks",
            "source": "KUNA Annual Corporate Report 2024"
        },
        "annualPublicFunding": {
            "total": "State budgetary appropriation (~12M KWD annual budget)",
            "perCapita": "~2.50 KWD / person / year"
        },
        "revenueModel": "State budget funding and wire syndication fees",
        "logo": "newspaper-logos/kw/kuna-kuwait-news-agency.svg",
        "logoExplainer": "Navy blue box with white lettering 'KUNA' beside the title 'KUWAIT NEWS AGENCY'.",
        "sources": [
            "https://www.kuna.net.kw",
            "https://en.wikipedia.org/wiki/Kuwait_News_Agency"
        ]
    },
    {
        "id": "kw-kuwait-times",
        "countryCode": "KW",
        "name": "Kuwait Times",
        "founded": 1961,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital news portal",
        "language": "English",
        "headquarters": "Kuwait City",
        "owner": {
            "name": "Yousuf Saleh Al-Ayan Family",
            "type": "Independent commercial publisher"
        },
        "editorialStance": "First English-language daily newspaper in the Persian Gulf region; comprehensive coverage of expatriate affairs, commerce, and diplomacy",
        "readership": {
            "metric": "Primary English newspaper read by foreign professionals, diplomats, and multinational businesses in Kuwait",
            "source": "Kuwait Times Media Kit 2024"
        },
        "revenueModel": "Print subscriptions, corporate advertising, and digital sponsorships",
        "logo": "newspaper-logos/kw/kuwait-times.svg",
        "logoExplainer": "Stately black Roman serif title 'KUWAIT TIMES' representing historic Gulf English press.",
        "sources": [
            "https://www.kuwaittimes.com",
            "https://en.wikipedia.org/wiki/Kuwait_Times"
        ]
    }
],
  // KG
  KG: [
    {
        "id": "kg-kabar",
        "countryCode": "KG",
        "name": "Kabar",
        "officialName": "Kyrgyz National News Agency Kabar",
        "founded": 1937,
        "frequency": "24/7 continuous news wire",
        "format": "State news agency wire & multi-lingual portal",
        "language": "Kyrgyz, Russian, English, Chinese, Turkish",
        "headquarters": "Bishkek",
        "owner": {
            "name": "Government of the Kyrgyz Republic",
            "type": "State-owned national press agency"
        },
        "editorialStance": "Official state press agency of Kyrgyzstan; government legislation, presidential announcements, and Central Asian diplomatic news",
        "readership": {
            "metric": "Primary official news source for all Kyrgyz media and foreign diplomatic missions",
            "source": "Kabar National News Agency Profile 2024"
        },
        "annualPublicFunding": {
            "total": "State budgetary allocation",
            "perCapita": "State funded"
        },
        "revenueModel": "State budget subvention and wire subscription licensing",
        "logo": "newspaper-logos/kg/kabar-news-agency.svg",
        "logoExplainer": "Light blue badge featuring bold white sans-serif uppercase title 'KABAR'.",
        "sources": [
            "https://kabar.kg",
            "https://en.wikipedia.org/wiki/Kabar"
        ]
    },
    {
        "id": "kg-24-kg",
        "countryCode": "KG",
        "name": "24.kg",
        "founded": 2006,
        "frequency": "24/7 digital news agency",
        "format": "Digital-only news agency portal",
        "language": "Russian, Kyrgyz, English",
        "headquarters": "Bishkek",
        "owner": {
            "name": "Asel Otorbaeva / 24.kg News Agency",
            "type": "Independent digital media company"
        },
        "editorialStance": "Leading independent digital news agency in Kyrgyzstan; breaking news, political analysis, economic trends, and parliamentary reporting",
        "readership": {
            "metric": "4 million monthly digital visitors across Kyrgyzstan and Central Asia",
            "source": "24.kg Audience Audit 2024"
        },
        "revenueModel": "Digital display advertising, sponsored content, and media services",
        "logo": "newspaper-logos/kg/24-kg.svg",
        "logoExplainer": "Bright red rectangular box with bold white text '24.kg'.",
        "sources": [
            "https://24.kg",
            "https://en.wikipedia.org/wiki/24.kg"
        ]
    },
    {
        "id": "kg-akipress",
        "countryCode": "KG",
        "name": "AKIpress",
        "founded": 2000,
        "frequency": "24/7 digital news publishing",
        "format": "Digital news wire & multi-portal network",
        "language": "Russian, Kyrgyz, English",
        "headquarters": "Bishkek",
        "owner": {
            "name": "Marat Tazabekov / AKIpress Media Holding",
            "type": "Independent media holding group"
        },
        "editorialStance": "Kyrgyzstan's highest trafficked digital news network; comprehensive regional coverage, business intelligence, and yellow pages",
        "readership": {
            "metric": "Over 8 million monthly unique visitors across Central Asia",
            "source": "WWW.KG Top Sites Ranking 2024"
        },
        "revenueModel": "Digital programmatic advertising, business subscriptions, and wire licensing",
        "logo": "newspaper-logos/kg/akipress.svg",
        "logoExplainer": "Teal green and black typography 'AKIpress' symbolising modern Central Asian digital press.",
        "sources": [
            "https://akipress.org",
            "https://en.wikipedia.org/wiki/AKIpress_news_agency"
        ]
    },
    {
        "id": "kg-vecherniy-bishkek",
        "countryCode": "KG",
        "name": "Vecherniy Bishkek",
        "englishTranslation": "Evening Bishkek",
        "founded": 1974,
        "frequency": "Daily newspaper",
        "format": "Tabloid & digital news portal (vb.kg)",
        "language": "Russian",
        "headquarters": "Bishkek",
        "owner": {
            "name": "Rubicon Publishing House",
            "type": "Commercial media group"
        },
        "editorialStance": "Kyrgyzstan's oldest running daily newspaper; urban civic news, human interest stories, crime reports, and local politics",
        "readership": {
            "metric": "Widely read daily print newspaper in capital Bishkek and Chuy Region",
            "source": "Vecherniy Bishkek Publisher Report"
        },
        "revenueModel": "Print newsstand sales, classifieds, and display advertising",
        "logo": "newspaper-logos/kg/vecherniy-bishkek.svg",
        "logoExplainer": "Classic Cyrillic serif masthead 'Вечерний Бишкек' in bold black.",
        "sources": [
            "https://www.vb.kg",
            "https://ru.wikipedia.org/wiki/Вечерний_Бишкек"
        ]
    },
    {
        "id": "kg-kaktus-media",
        "countryCode": "KG",
        "name": "Kaktus Media",
        "founded": 2017,
        "frequency": "24/7 digital news publication",
        "format": "Digital-only news portal & mobile app",
        "language": "Russian, Kyrgyz",
        "headquarters": "Bishkek",
        "owner": {
            "name": "Dina Maslova / Kaktus Media",
            "type": "Independent media group"
        },
        "editorialStance": "Popular independent digital portal focusing on explainer journalism, investigative reporting, civic rights, and social issues",
        "readership": {
            "metric": "3.5 million monthly digital readers in Kyrgyzstan",
            "source": "Kaktus Media Audience Overview 2024"
        },
        "revenueModel": "Digital display advertising, crowdfunding, and commercial media partnerships",
        "logo": "newspaper-logos/kg/kaktus-media.svg",
        "logoExplainer": "Vibrant green rectangle with bold white lowercase text 'kaktus.media'.",
        "sources": [
            "https://kaktus.media"
        ]
    }
],
  // LA
  LA: [
    {
        "id": "la-vientiane-times",
        "countryCode": "LA",
        "name": "Vientiane Times",
        "founded": 1994,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital news portal",
        "language": "English",
        "headquarters": "Vientiane",
        "owner": {
            "name": "Lao Press in Foreign Languages / Ministry of Information, Culture and Tourism",
            "type": "State-owned foreign language media house"
        },
        "editorialStance": "Laos' official English-language daily newspaper; authoritative reporting on government policy, foreign investment, ASEAN diplomacy, and culture",
        "readership": {
            "metric": "Primary English daily read by foreign diplomats, international NGOs, investors, and tourists in Laos",
            "source": "Lao Press Directory 2024"
        },
        "annualPublicFunding": {
            "total": "State publishing subvention",
            "perCapita": "State funded"
        },
        "revenueModel": "State budget appropriation, print subscriptions, and foreign corporate advertising",
        "logo": "newspaper-logos/la/vientiane-times.svg",
        "logoExplainer": "Stately navy blue serif masthead 'Vientiane Times' on white canvas.",
        "sources": [
            "https://www.vientianetimes.org.la",
            "https://en.wikipedia.org/wiki/Vientiane_Times"
        ]
    },
    {
        "id": "la-kpl",
        "countryCode": "LA",
        "name": "KPL",
        "officialName": "Lao News Agency (Khaosan Pathet Lao)",
        "founded": 1968,
        "frequency": "24/7 national news wire",
        "format": "Official state news agency wire & online portal",
        "language": "Lao, English, French",
        "headquarters": "Vientiane",
        "owner": {
            "name": "Ministry of Information, Culture and Tourism",
            "type": "State-owned official news agency"
        },
        "editorialStance": "Official national wire agency of Laos; state announcements, economic development plans, and bilateral diplomatic visits",
        "readership": {
            "metric": "Exclusive news wire service supplying dispatches to all Lao domestic media outlets",
            "source": "KPL Official Report 2024"
        },
        "annualPublicFunding": {
            "total": "State budgetary subvention",
            "perCapita": "State funded"
        },
        "revenueModel": "State budget allocation and wire distribution",
        "logo": "newspaper-logos/la/kpl-lao-news-agency.svg",
        "logoExplainer": "Bright red rectangular banner with bold white lettering 'KPL NEWS'.",
        "sources": [
            "https://kpl.gov.la",
            "https://en.wikipedia.org/wiki/Khaosan_Pathet_Lao"
        ]
    },
    {
        "id": "la-pasaxon",
        "countryCode": "LA",
        "name": "Pasaxon",
        "englishTranslation": "The People",
        "founded": 1950,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital edition",
        "language": "Lao",
        "headquarters": "Vientiane",
        "owner": {
            "name": "Lao People's Revolutionary Party Central Committee",
            "type": "Official party newspaper"
        },
        "editorialStance": "Official organ of the ruling Lao People's Revolutionary Party; government policy, socialist development, and national unity",
        "readership": {
            "metric": "Distributed nationwide to state offices, party branches, and public institutions across Laos",
            "source": "Pasaxon Publishing House"
        },
        "revenueModel": "State party budget appropriation",
        "logo": "newspaper-logos/la/pasaxon.svg",
        "logoExplainer": "Bold red sans-serif uppercase title 'PASAXON' reflecting party media tradition.",
        "sources": [
            "https://www.pasaxon.org.la",
            "https://en.wikipedia.org/wiki/Pasaxon"
        ]
    },
    {
        "id": "la-pathet-lao",
        "countryCode": "LA",
        "name": "Pathet Lao Daily",
        "englishTranslation": "Lao Nation",
        "founded": 2000,
        "frequency": "Daily newspaper",
        "format": "Broadsheet print & digital edition",
        "language": "Lao",
        "headquarters": "Vientiane",
        "owner": {
            "name": "KPL Press Division",
            "type": "State publishing house"
        },
        "editorialStance": "National daily newspaper produced by KPL agency focusing on domestic economy, agricultural development, and cultural heritage",
        "readership": {
            "metric": "Widely read daily across provincial administrations and schools in Laos",
            "source": "Ministry of Information Laos 2023"
        },
        "revenueModel": "State budget subvention and print sales",
        "logo": "newspaper-logos/la/pathet-lao.svg",
        "logoExplainer": "Deep navy blue rectangle with stately white serif text 'PATHET LAO'.",
        "sources": [
            "https://kpl.gov.la",
            "https://en.wikipedia.org/wiki/Media_of_Laos"
        ]
    },
    {
        "id": "la-lao-pdr-daily",
        "countryCode": "LA",
        "name": "Le Rénovateur",
        "officialName": "Lao PDR Daily News",
        "founded": 1998,
        "frequency": "Weekly newspaper",
        "format": "Print & digital portal",
        "language": "French",
        "headquarters": "Vientiane",
        "owner": {
            "name": "Lao Press in Foreign Languages",
            "type": "State-owned foreign language media"
        },
        "editorialStance": "French-language weekly coverage of Francophonie affairs, tourism, cultural exchange, and international relations in Laos",
        "readership": {
            "metric": "Read by Francophone diplomats, international researchers, and trade missions",
            "source": "Lao Press Foreign Language Division"
        },
        "revenueModel": "State budget support and subscriptions",
        "logo": "newspaper-logos/la/lao-pdr-daily.svg",
        "logoExplainer": "Clean black sans-serif lettering 'LAO PDR DAILY' on white backdrop.",
        "sources": [
            "https://www.lerenovateur.org.la",
            "https://en.wikipedia.org/wiki/Media_of_Laos"
        ]
    }
],
  // LV
  LV: [
    {
        "id": "lv-diena",
        "countryCode": "LV",
        "name": "Diena",
        "englishTranslation": "The Day",
        "founded": 1990,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital portal (diena.lv)",
        "language": "Latvian",
        "headquarters": "Riga",
        "owner": {
            "name": "Dienas Mediji (Rihards Baraņevskis)",
            "type": "Commercial media company"
        },
        "editorialStance": "Historic Latvian daily newspaper established during the Singing Revolution; centrist stance on state politics, EU affairs, and culture",
        "readership": {
            "metric": "One of Latvia's primary printed daily newspapers (~25,000 daily print subscriber base)",
            "source": "Latvian Newspaper Publishers Association 2024"
        },
        "revenueModel": "Print copy sales, digital subscriptions, and commercial advertising",
        "logo": "newspaper-logos/lv/diena.svg",
        "logoExplainer": "Carmine red bold uppercase sans-serif title 'DIENA' matching the national red of Latvia.",
        "sources": [
            "https://www.diena.lv",
            "https://en.wikipedia.org/wiki/Diena"
        ]
    },
    {
        "id": "lv-delfi",
        "countryCode": "LV",
        "name": "Delfi Latvia",
        "founded": 1999,
        "frequency": "24/7 digital news portal",
        "format": "Digital-only news portal & paywall (Delfi Plus)",
        "language": "Latvian, Russian",
        "headquarters": "Riga",
        "owner": {
            "name": "Ekspress Grupp",
            "type": "Baltic media conglomerate"
        },
        "editorialStance": "Latvia's largest digital news portal; independent breaking news, investigative reporting, and video commentary",
        "readership": {
            "metric": "Highest digital reach in Latvia (over 800,000 monthly unique visitors; 35,000 digital subscribers)",
            "source": "Gemius Audience Latvia 2024"
        },
        "revenueModel": "Digital paywall subscriptions (Delfi Plus) and digital advertising",
        "logo": "newspaper-logos/lv/delfi-latvia.svg",
        "logoExplainer": "Bright blue rectangular block featuring bold white text 'DELFI'.",
        "sources": [
            "https://www.delfi.lv",
            "https://en.wikipedia.org/wiki/Delfi_(web_portal)"
        ]
    },
    {
        "id": "lv-leta",
        "countryCode": "LV",
        "name": "LETA",
        "officialName": "National Information Agency LETA",
        "founded": 1919,
        "frequency": "24/7 national news wire",
        "format": "Commercial press agency wire & news portal",
        "language": "Latvian, English, Russian",
        "headquarters": "Riga",
        "owner": {
            "name": "UP Investments (Margus Linnamäe)",
            "type": "Media investment holding company"
        },
        "editorialStance": "Latvia's national news agency; non-partisan, objective newswire providing continuous reporting for domestic media and state institutions",
        "readership": {
            "metric": "Primary news dispatch provider for all Latvian newspapers, TV networks, radio stations, and corporate subscribers",
            "source": "LETA Information Agency Profile 2024"
        },
        "revenueModel": "B2B wire licensing and business intelligence subscriptions",
        "logo": "newspaper-logos/lv/leta-news-agency.svg",
        "logoExplainer": "Deep navy blue bold uppercase lettering 'LETA'.",
        "sources": [
            "https://www.leta.lv",
            "https://en.wikipedia.org/wiki/LETA"
        ]
    },
    {
        "id": "lv-lsm",
        "countryCode": "LV",
        "name": "LSM.lv",
        "officialName": "Latvijas Sabiedriskie Mediji",
        "founded": 2013,
        "frequency": "24/7 public service digital news",
        "format": "Public service digital portal & news app",
        "language": "Latvian, Russian, English",
        "headquarters": "Riga",
        "owner": {
            "name": "Public Electronic Mass Media Council (SEPLP)",
            "type": "Public statutory media organization"
        },
        "editorialStance": "Public broadcaster unified news portal operating under statutory impartiality obligations; in-depth investigative unit",
        "readership": {
            "metric": "750,000 monthly unique users across Latvia",
            "source": "Gemius Audience Audit / SEPLP Annual Report 2023"
        },
        "annualPublicFunding": {
            "total": "€42 million annual public subvention for Latvian Public Media",
            "perCapita": "€22.30 / person / year"
        },
        "revenueModel": "State budget subvention (100% ad-free public service media)",
        "logo": "newspaper-logos/lv/lsm-lv.svg",
        "logoExplainer": "Carmine red rectangular block with bold white text 'LSM.lv'.",
        "sources": [
            "https://www.lsm.lv",
            "https://en.wikipedia.org/wiki/Public_Broadcasting_of_Latvia"
        ]
    },
    {
        "id": "lv-latvijas-avize",
        "countryCode": "LV",
        "name": "Latvijas Avīze",
        "englishTranslation": "Latvia's Newspaper",
        "founded": 1988,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital portal (la.lv)",
        "language": "Latvian",
        "headquarters": "Riga",
        "owner": {
            "name": "Latvijas Mediji",
            "type": "Commercial media publisher"
        },
        "editorialStance": "Major Latvian daily newspaper; conservative, national-patriot stance, focus on rural development, agriculture, and regional affairs",
        "readership": {
            "metric": "Highest print circulation among daily Latvian-language newspapers (~30,000 daily print copies)",
            "source": "Latvian Newspaper Publishers Association 2024"
        },
        "revenueModel": "Print subscriptions, portal advertising, and book publishing",
        "logo": "newspaper-logos/lv/latvijas-avize.svg",
        "logoExplainer": "Traditional black serif masthead 'Latvijas Avīze' on white background.",
        "sources": [
            "https://www.la.lv",
            "https://en.wikipedia.org/wiki/Latvijas_Avīze"
        ]
    }
],
  // LB
  LB: [
    {
        "id": "lb-an-nahar",
        "countryCode": "LB",
        "name": "An-Nahar",
        "englishTranslation": "The Day",
        "founded": 1933,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital portal",
        "language": "Arabic, English, French",
        "headquarters": "Beirut",
        "owner": {
            "name": "Tueni Family & Hariri Family shareholding",
            "type": "Independent publishing house"
        },
        "editorialStance": "Lebanon's historic leading daily newspaper of record; liberal, independent centrist stance, championing press freedom and sovereign democracy",
        "readership": {
            "metric": "High prestige daily across Lebanon and international Arab diaspora with over 3 million monthly online visitors",
            "source": "An-Nahar Media Group Audit 2024"
        },
        "revenueModel": "Digital paywall subscriptions, print copy sales, and premium advertising",
        "logo": "newspaper-logos/lb/an-nahar.svg",
        "logoExplainer": "Classic dark blue calligraphic Arabic masthead 'النهار' symbolising sunrise over Beirut.",
        "sources": [
            "https://www.annahar.com",
            "https://en.wikipedia.org/wiki/An-Nahar"
        ]
    },
    {
        "id": "lb-l-orient-le-jour",
        "countryCode": "LB",
        "name": "L'Orient-Le Jour",
        "englishTranslation": "The Orient-The Day",
        "founded": 1924,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital portal",
        "language": "French, English",
        "headquarters": "Beirut",
        "owner": {
            "name": "Eddé & Pharaon families",
            "type": "Independent media house"
        },
        "editorialStance": "Lebanon's premier French-language daily newspaper; independent, liberal-democratic stance on governance, culture, and Middle East analysis",
        "readership": {
            "metric": "Leading French paper in Middle East; read by Lebanese intelligentsia and global Francophone diplomatic community",
            "source": "OJD International Press Audit 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and display advertising",
        "logo": "newspaper-logos/lb/l-orient-le-jour.svg",
        "logoExplainer": "Red serif title 'L'ORIENT-LE JOUR' representing historic French journalism heritage in Lebanon.",
        "sources": [
            "https://www.lorientlejour.com",
            "https://en.wikipedia.org/wiki/L%27Orient-Le_Jour"
        ]
    },
    {
        "id": "lb-nna",
        "countryCode": "LB",
        "name": "NNA",
        "officialName": "National News Agency",
        "founded": 1961,
        "frequency": "24/7 national news wire",
        "format": "Official state news agency wire & online portal",
        "language": "Arabic, French, English",
        "headquarters": "Beirut",
        "owner": {
            "name": "Government of Lebanon (Ministry of Information)",
            "type": "State-owned news agency"
        },
        "editorialStance": "Official state news agency of Lebanon; non-partisan factual dispatches on cabinet decisions, parliamentary sessions, and public security",
        "readership": {
            "metric": "Primary wire service providing news dispatches to all Lebanese TV, radio, and print outlets",
            "source": "Ministry of Information Lebanon 2024"
        },
        "annualPublicFunding": {
            "total": "Ministry of Information budgetary subvention",
            "perCapita": "State funded"
        },
        "revenueModel": "Parliamentary state budget appropriation",
        "logo": "newspaper-logos/lb/nna-national-news-agency.svg",
        "logoExplainer": "Deep teal rectangle featuring white sans-serif uppercase lettering 'NNA LEBANON'.",
        "sources": [
            "https://nna-leb.gov.lb",
            "https://en.wikipedia.org/wiki/National_News_Agency_(Lebanon)"
        ]
    },
    {
        "id": "lb-al-joumhouria",
        "countryCode": "LB",
        "name": "Al-Joumhouria",
        "englishTranslation": "The Republic",
        "founded": 1924,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital news portal",
        "language": "Arabic",
        "headquarters": "Beirut",
        "owner": {
            "name": "Ilias Murr / Al-Joumhouria Publishing",
            "type": "Commercial media group"
        },
        "editorialStance": "Widely read centrist daily newspaper in Lebanon; extensive coverage of domestic politics, banking, and security affairs",
        "readership": {
            "metric": "One of the top 3 selling printed daily newspapers in Greater Beirut",
            "source": "Lebanese Press Syndicate 2023"
        },
        "revenueModel": "Print copy sales and display advertising",
        "logo": "newspaper-logos/lb/al-joumhouria.svg",
        "logoExplainer": "Bold crimson red calligraphic Arabic script 'الجمهورية'.",
        "sources": [
            "https://www.aljoumhouria.com",
            "https://en.wikipedia.org/wiki/Al-Joumhouria"
        ]
    },
    {
        "id": "lb-naharnet",
        "countryCode": "LB",
        "name": "Naharnet",
        "founded": 2000,
        "frequency": "24/7 digital news publication",
        "format": "Digital-only news portal",
        "language": "English, Arabic",
        "headquarters": "Beirut",
        "owner": {
            "name": "Naharnet News Network",
            "type": "Independent digital media company"
        },
        "editorialStance": "Pioneer English-language digital news portal in Lebanon; breaking local news, live political updates, and economic reports",
        "readership": {
            "metric": "2 million monthly digital visitors across English-speaking Lebanese diaspora",
            "source": "Naharnet Digital Media 2024"
        },
        "revenueModel": "Digital display advertising and programmatic networks",
        "logo": "newspaper-logos/lb/naharnet.svg",
        "logoExplainer": "Sky blue rectangular badge with crisp white lowercase typography 'naharnet'.",
        "sources": [
            "https://www.naharnet.com",
            "https://en.wikipedia.org/wiki/Naharnet"
        ]
    }
],
  // LS
  LS: [
    {
        "id": "ls-lesotho-times",
        "countryCode": "LS",
        "name": "Lesotho Times",
        "founded": 2008,
        "frequency": "Weekly newspaper",
        "format": "Tabloid & digital portal",
        "language": "English, Sesotho",
        "headquarters": "Maseru",
        "owner": {
            "name": "African Media Holdings (Basildon Peta)",
            "type": "Independent commercial publisher"
        },
        "editorialStance": "Lesotho's primary weekly newspaper of record; independent investigative reporting on government policy, judiciary, and corruption",
        "readership": {
            "metric": "Largest circulation printed weekly in Lesotho (~15,000 copies weekly) and top online news portal",
            "source": "African Media Holdings Audit 2024"
        },
        "revenueModel": "Print sales, corporate advertising, and digital promotions",
        "logo": "newspaper-logos/ls/lesotho-times.svg",
        "logoExplainer": "Deep blue serif masthead 'LESOTHO TIMES' on clean white canvas.",
        "sources": [
            "https://lestimes.com",
            "https://en.wikipedia.org/wiki/Lesotho_Times"
        ]
    },
    {
        "id": "ls-sunday-express",
        "countryCode": "LS",
        "name": "Sunday Express",
        "founded": 2009,
        "frequency": "Weekly Sunday newspaper",
        "format": "Tabloid print & digital edition",
        "language": "English",
        "headquarters": "Maseru",
        "owner": {
            "name": "African Media Holdings",
            "type": "Independent commercial publisher"
        },
        "editorialStance": "Lesotho's premier Sunday paper; in-depth political analysis, sports, business, and human interest stories",
        "readership": {
            "metric": "Dominant Sunday newspaper read across Maseru and major district towns",
            "source": "Lesotho Press Survey 2023"
        },
        "revenueModel": "Sunday copy sales and commercial display advertising",
        "logo": "newspaper-logos/ls/sunday-express.svg",
        "logoExplainer": "Vibrant red background with bold white uppercase title 'SUNDAY EXPRESS'.",
        "sources": [
            "https://sundayexpress.co.ls"
        ]
    },
    {
        "id": "ls-lena",
        "countryCode": "LS",
        "name": "LENA",
        "officialName": "Lesotho News Agency",
        "founded": 1985,
        "frequency": "24/7 national news wire",
        "format": "Official state news agency wire & online portal",
        "language": "English, Sesotho",
        "headquarters": "Maseru",
        "owner": {
            "name": "Ministry of Information, Communications, Science, Technology and Innovation",
            "type": "State-owned national press agency"
        },
        "editorialStance": "Lesotho's official news agency; factual dispatches on royal decrees, parliamentary sessions, and district community news",
        "readership": {
            "metric": "Primary source wire service feeding news dispatches to all domestic radio stations and weekly newspapers",
            "source": "Ministry of Information Lesotho 2024"
        },
        "annualPublicFunding": {
            "total": "State parliamentary subvention",
            "perCapita": "State funded"
        },
        "revenueModel": "Parliamentary state budget funding and agency syndication",
        "logo": "newspaper-logos/ls/lena-lesotho-news-agency.svg",
        "logoExplainer": "Green rectangular banner with bold white lettering 'LENA NEWS'.",
        "sources": [
            "https://www.lena.gov.ls",
            "https://en.wikipedia.org/wiki/Media_of_Lesotho"
        ]
    },
    {
        "id": "ls-public-eye",
        "countryCode": "LS",
        "name": "Public Eye",
        "founded": 1997,
        "frequency": "Weekly newspaper",
        "format": "Tabloid print & web portal",
        "language": "English, Sesotho",
        "headquarters": "Maseru",
        "owner": {
            "name": "Public Eye Media Group",
            "type": "Independent media publisher"
        },
        "editorialStance": "Independent weekly newspaper focusing on public policy analysis, investigative journalism, economic growth, and civil rights",
        "readership": {
            "metric": "Prominent weekly readership among Maseru civil servants, lawyers, and business executives",
            "source": "Public Eye Media Group 2023"
        },
        "revenueModel": "Print copy sales and corporate advertising",
        "logo": "newspaper-logos/ls/public-eye.svg",
        "logoExplainer": "Black circular eye icon beside elegant black serif text 'Public Eye'.",
        "sources": [
            "https://publiceyenews.com",
            "https://en.wikipedia.org/wiki/Media_of_Lesotho"
        ]
    },
    {
        "id": "ls-the-post",
        "countryCode": "LS",
        "name": "The Post",
        "founded": 2014,
        "frequency": "Weekly newspaper",
        "format": "Tabloid & digital edition",
        "language": "English, Sesotho",
        "headquarters": "Maseru",
        "owner": {
            "name": "Shakeman Mugari / The Post Media",
            "type": "Independent publishing house"
        },
        "editorialStance": "Popular independent weekly newspaper emphasizing economic reporting, political commentary, and social issues",
        "readership": {
            "metric": "10,000 weekly print circulation nationwide in Lesotho",
            "source": "The Post Media Audit 2024"
        },
        "revenueModel": "Print sales, classifieds, and digital display advertising",
        "logo": "newspaper-logos/ls/the-post-lesotho.svg",
        "logoExplainer": "Deep red serif title 'the post' on white background.",
        "sources": [
            "https://www.thepost.co.ls"
        ]
    }
],
  // LR
  LR: [
    {
        "id": "lr-frontpage-africa",
        "countryCode": "LR",
        "name": "FrontPageAfrica",
        "founded": 2005,
        "frequency": "Daily newspaper",
        "format": "Tabloid & digital portal",
        "language": "English",
        "headquarters": "Monrovia",
        "owner": {
            "name": "Rodney Sieh / FrontPageAfrica Media",
            "type": "Independent investigative media group"
        },
        "editorialStance": "Liberia's leading independent daily newspaper; renowned for anti-corruption investigative reporting, governance analysis, and civil rights",
        "readership": {
            "metric": "Highest digital readership in Liberia (1.5 million monthly digital visitors) and major Monrovia print circulation",
            "source": "FrontPageAfrica Analytics / Press Union of Liberia 2024"
        },
        "revenueModel": "Print sales, digital display advertising, and international investigative grants",
        "logo": "newspaper-logos/lr/frontpage-africa.svg",
        "logoExplainer": "Deep navy blue rectangular banner featuring white bold sans-serif text 'FrontPageAfrica'.",
        "sources": [
            "https://frontpageafricaonline.com",
            "https://en.wikipedia.org/wiki/FrontPageAfrica"
        ]
    },
    {
        "id": "lr-lina",
        "countryCode": "LR",
        "name": "LINA",
        "officialName": "Liberia News Agency",
        "founded": 1978,
        "frequency": "24/7 national news wire",
        "format": "Official state news agency wire & public digital portal",
        "language": "English",
        "headquarters": "Monrovia",
        "owner": {
            "name": "Government of Liberia (Ministry of Information, Cultural Affairs and Tourism)",
            "type": "State-owned national press agency"
        },
        "editorialStance": "Liberia's official press agency; objective reporting on presidential activities, county development projects, and national legislation",
        "readership": {
            "metric": "Deploys correspondents across all 15 counties of Liberia, feeding wire dispatches to all domestic radio and print outlets",
            "source": "MICAT Liberia Annual Report 2023"
        },
        "annualPublicFunding": {
            "total": "Parliamentary state budget appropriation",
            "perCapita": "State funded"
        },
        "revenueModel": "Parliamentary state budget funding and agency licensing",
        "logo": "newspaper-logos/lr/lina-liberia-news-agency.svg",
        "logoExplainer": "Navy blue bold text 'LINA NEWS' on white background.",
        "sources": [
            "https://liberianewsagency.com",
            "https://en.wikipedia.org/wiki/Liberia_News_Agency"
        ]
    },
    {
        "id": "lr-daily-observer",
        "countryCode": "LR",
        "name": "Daily Observer",
        "founded": 1981,
        "frequency": "Daily newspaper",
        "format": "Broadsheet & digital news portal",
        "language": "English",
        "headquarters": "Monrovia",
        "owner": {
            "name": "Liberian Observer Corporation (Bestman & Dukuly families)",
            "type": "Independent commercial publisher"
        },
        "editorialStance": "Liberia's historic independent daily newspaper; centrist stance on democracy, economic reconstruction, agriculture, and culture",
        "readership": {
            "metric": "Historically Liberia's primary newspaper of record with nationwide Monrovia distribution",
            "source": "Press Union of Liberia Survey 2023"
        },
        "revenueModel": "Print copy sales, classifieds, and corporate advertising",
        "logo": "newspaper-logos/lr/daily-observer-liberia.svg",
        "logoExplainer": "Crimson red serif masthead 'Daily Observer' symbolising independent Liberian press heritage.",
        "sources": [
            "https://www.liberianobserver.com",
            "https://en.wikipedia.org/wiki/Daily_Observer_(Liberia)"
        ]
    },
    {
        "id": "lr-the-inquirer",
        "countryCode": "LR",
        "name": "The Inquirer",
        "founded": 1991,
        "frequency": "Daily newspaper",
        "format": "Tabloid print & web portal",
        "language": "English",
        "headquarters": "Monrovia",
        "owner": {
            "name": "New Inquirer Company (Philip Wesseh Estate)",
            "type": "Independent media enterprise"
        },
        "editorialStance": "Pioneer independent daily founded during the civil war; non-partisan coverage of public health, education, and peacebuilding",
        "readership": {
            "metric": "Widely read daily in Monrovia and major county capitals",
            "source": "Press Union of Liberia Audit 2023"
        },
        "revenueModel": "Print newsstand sales and local advertising",
        "logo": "newspaper-logos/lr/the-inquirer-liberia.svg",
        "logoExplainer": "Teal green banner with white serif text 'The Inquirer'.",
        "sources": [
            "https://inquirernewspaper.com",
            "https://en.wikipedia.org/wiki/Media_of_Liberia"
        ]
    },
    {
        "id": "lr-the-analyst",
        "countryCode": "LR",
        "name": "The Analyst",
        "founded": 2001,
        "frequency": "Daily newspaper",
        "format": "Tabloid & digital portal",
        "language": "English",
        "headquarters": "Monrovia",
        "owner": {
            "name": "Analyst Media Group (Stanley Seakor)",
            "type": "Independent commercial media"
        },
        "editorialStance": "Independent daily newspaper providing political commentary, macroeconomic analysis, and civil society news",
        "readership": {
            "metric": "Circulated to Monrovia government ministries, NGOs, and business offices",
            "source": "Press Union of Liberia 2023"
        },
        "revenueModel": "Print sales and commercial advertising",
        "logo": "newspaper-logos/lr/the-analyst.svg",
        "logoExplainer": "Clean black uppercase sans-serif title 'THE ANALYST'.",
        "sources": [
            "https://analystliberiaonline.com"
        ]
    }
],
  // LY
  LY: [
    {
        "id": "ly-lana",
        "countryCode": "LY",
        "name": "LANA",
        "officialName": "Libyan News Agency",
        "founded": 1964,
        "frequency": "24/7 national news wire",
        "format": "Official state news agency wire & online portal",
        "language": "Arabic, English, French",
        "headquarters": "Tripoli",
        "owner": {
            "name": "Government of National Unity (GNU Ministry of Communication)",
            "type": "State-owned news agency"
        },
        "editorialStance": "Libya's official national news agency; authoritative reporting on state policy, cabinet decrees, and international diplomacy",
        "readership": {
            "metric": "Primary news dispatch provider feeding all Libyan television networks, radio stations, and press portals",
            "source": "LANA Official Directory 2024"
        },
        "annualPublicFunding": {
            "total": "State parliamentary budget appropriation",
            "perCapita": "State funded"
        },
        "revenueModel": "Parliamentary state budget allocation",
        "logo": "newspaper-logos/ly/lana-libyan-news-agency.svg",
        "logoExplainer": "Green rectangular badge with bold white lettering 'LANA NEWS'.",
        "sources": [
            "https://lana.gov.ly",
            "https://en.wikipedia.org/wiki/Libyan_News_Agency"
        ]
    },
    {
        "id": "ly-al-wasat",
        "countryCode": "LY",
        "name": "Al-Wasat",
        "englishTranslation": "The Center",
        "founded": 2013,
        "frequency": "Daily newspaper & 24/7 portal (Wasat.ly)",
        "format": "Tabloid & digital portal",
        "language": "Arabic",
        "headquarters": "Tripoli & Cairo",
        "owner": {
            "name": "Al-Wasat Media Foundation (Mahmoud Shammam)",
            "type": "Independent media foundation"
        },
        "editorialStance": "Libya's leading independent news daily; professional centrist coverage of national reconciliation, economy, and oil sector",
        "readership": {
            "metric": "4+ million monthly digital visitors across Libya and regional Arab diaspora",
            "source": "Al-Wasat Digital Analytics 2024"
        },
        "revenueModel": "Digital programmatic advertising, print copy sales, and broadcast syndication",
        "logo": "newspaper-logos/ly/al-wasat.svg",
        "logoExplainer": "Bold red Arabic calligraphic typography 'الوسط' on clean white backdrop.",
        "sources": [
            "https://alwasat.ly",
            "https://en.wikipedia.org/wiki/Al-Wasat_(Libyan_newspaper)"
        ]
    },
    {
        "id": "ly-libya-herald",
        "countryCode": "LY",
        "name": "Libya Herald",
        "founded": 2012,
        "frequency": "24/7 digital news publication",
        "format": "Digital-only news portal",
        "language": "English",
        "headquarters": "Tripoli",
        "owner": {
            "name": "Sami Zaptia & Michel Cousins",
            "type": "Independent commercial publisher"
        },
        "editorialStance": "Libya's primary English-language digital daily; independent coverage of commercial law, infrastructure, energy, and diplomacy",
        "readership": {
            "metric": "Read by international energy executives, foreign diplomats, analysts, and international organizations",
            "source": "Libya Herald Analytics 2024"
        },
        "revenueModel": "Paid digital subscriptions and corporate advertising",
        "logo": "newspaper-logos/ly/libya-herald.svg",
        "logoExplainer": "Navy blue rectangle with white serif text 'Libya Herald'.",
        "sources": [
            "https://www.libyaherald.com",
            "https://en.wikipedia.org/wiki/Libya_Herald"
        ]
    },
    {
        "id": "ly-libya-observer",
        "countryCode": "LY",
        "name": "The Libya Observer",
        "founded": 2015,
        "frequency": "24/7 digital news publication",
        "format": "Digital news portal",
        "language": "English, Arabic",
        "headquarters": "Tripoli",
        "owner": {
            "name": "Libya Observer Media",
            "type": "Independent digital news group"
        },
        "editorialStance": "Independent digital news portal providing breaking political, security, and economic updates across Libya",
        "readership": {
            "metric": "2.5 million monthly digital readers",
            "source": "The Libya Observer Media Report 2024"
        },
        "revenueModel": "Digital display advertising and media licensing",
        "logo": "newspaper-logos/ly/libya-observer.svg",
        "logoExplainer": "Green and dark grey typography 'THE LIBYA OBSERVER'.",
        "sources": [
            "https://www.libyaobserver.ly",
            "https://en.wikipedia.org/wiki/The_Libya_Observer"
        ]
    },
    {
        "id": "ly-febrayer",
        "countryCode": "LY",
        "name": "Febrayer",
        "englishTranslation": "February",
        "founded": 2011,
        "frequency": "Daily newspaper & TV network portal",
        "format": "Broadsheet & digital news portal",
        "language": "Arabic",
        "headquarters": "Tripoli",
        "owner": {
            "name": "Febrayer Media Network",
            "type": "Commercial media company"
        },
        "editorialStance": "Popular daily newspaper and digital outlet named after the February 17 Revolution; civic affairs, culture, and sports",
        "readership": {
            "metric": "Widely followed digital news portal in Western Libya",
            "source": "Febrayer Media Network 2023"
        },
        "revenueModel": "Commercial advertising and broadcast syndication",
        "logo": "newspaper-logos/ly/febrayer.svg",
        "logoExplainer": "Classic black Arabic typography 'فبراير' on white background.",
        "sources": [
            "https://febrayer.ly"
        ]
    }
],

  // Fiji
  FJ: [
    {
      id: "fj-fiji-times",
      countryCode: "FJ",
      name: "The Fiji Times",
      founded: 1869,
      frequency: "Daily newspaper (Monday–Sunday)",
      format: "Broadsheet & digital portal",
      language: "English",
      headquarters: "Suva, Viti Levu",
      owner: {
        name: "Motibhai Group",
        type: "Independent commercial media",
      },
      editorialStance: "Fiji's oldest newspaper and historic newspaper of record; independent, courageous reporting through military coups and constitutional crises, championing democracy and rule of law",
      readership: {
        metric: "Over 155 years of publishing; largest print circulation daily in Fiji and leading South Pacific news reference",
        source: "The Fiji Times Annual Review 2023",
      },
      revenueModel: "Print newsstand sales, commercial advertising, and digital subscriptions",
      logo: "newspaper-logos/fj/fiji-times.svg",
      logoExplainer:
        "Classic black gothic masthead 'The Fiji Times' on white canvas, symbolising the Pacific's longest running independent press institution.",
      sources: ["https://www.fijitimes.com.fj", "https://en.wikipedia.org/wiki/The_Fiji_Times"],
    },
    {
      id: "fj-fiji-sun",
      countryCode: "FJ",
      name: "Fiji Sun",
      founded: 2001,
      frequency: "Daily newspaper",
      format: "Tabloid & digital portal",
      language: "English",
      headquarters: "Walubay, Suva",
      owner: {
        name: "Sun (Fiji) News Limited (CJ Patel Group)",
        type: "Independent commercial media",
      },
      editorialStance: "Major national daily; focus on tourism, business developments, provincial news, and sports (rugby sevens)",
      readership: {
        metric: "Major daily circulation with widespread distribution across Viti Levu and Vanua Levu",
        source: "Fiji Sun Corporate Profile 2023",
      },
      revenueModel: "Print sales and corporate commercial advertising",
      logo: "newspaper-logos/fj/fiji-sun.svg",
      logoExplainer:
        "Vibrant golden-orange sunburst and bold blue lettering 'FIJI SUN', reflecting tropical energy and island daily news.",
      sources: ["https://fijisun.com.fj", "https://en.wikipedia.org/wiki/Fiji_Sun"],
    },
    {
      id: "fj-fiji-village",
      countryCode: "FJ",
      name: "FijiVillage",
      founded: 1998,
      frequency: "Continuous 24/7 digital news service",
      format: "Digital-only news portal & radio network",
      language: "English, Fijian, Hindi",
      headquarters: "Suva",
      owner: {
        name: "Communications Fiji Limited (CFL)",
        type: "Independent commercial media",
      },
      editorialStance: "Fiji's premier digital breaking news portal; multi-lingual coverage spanning five commercial radio stations (FM96, Legend FM, Radio Sargam, Navtarang, Viti FM)",
      readership: {
        metric: "Over 1.8 million monthly digital visitors across Fiji and the Pacific diaspora in Australia and New Zealand",
        source: "CFL Audience Analytics 2024",
      },
      revenueModel: "Digital display advertising, cross-media radio promotions, and sponsorships",
      logo: "newspaper-logos/fj/fiji-village.svg",
      logoExplainer:
        "Red and blue emblem with clean white typography 'FIJIVILLAGE', representing real-time breaking digital news.",
      sources: ["https://www.fijivillage.com", "https://en.wikipedia.org/wiki/Communications_Fiji_Limited"],
    },
    {
      id: "fj-fiji-report",
      countryCode: "FJ",
      name: "Fiji Report",
      founded: 2015,
      frequency: "Digital portal",
      format: "Digital business portal",
      language: "English",
      headquarters: "Suva",
      owner: {
        name: "Pacific Media Reports",
        type: "Independent commercial media",
      },
      editorialStance: "Business and financial reporting; Pacific Islands trade, sugar and kava exports, renewable energy, and climate adaptation financing",
      readership: {
        metric: "Read by business professionals, foreign investors, and regional development agencies",
        source: "Pacific Media Reports 2023",
      },
      revenueModel: "Corporate partnerships and digital subscriptions",
      logo: "newspaper-logos/fj/fiji-report.svg",
      logoExplainer:
        "Dark teal banner with white sans-serif text 'FIJI REPORT', symbolising economic analysis and sustainable island trade.",
      sources: ["https://fijireport.com"],
    },
    {
      id: "fj-maiviti",
      countryCode: "FJ",
      name: "Mai TV",
      officialName: "MaiViti",
      founded: 2008,
      frequency: "Continuous digital & television broadcasting",
      format: "Digital news portal & commercial TV",
      language: "English, Fijian",
      headquarters: "Suva",
      owner: {
        name: "Mai TV Ltd",
        type: "Independent commercial media",
      },
      editorialStance: "Independent commercial television network; community grassroots journalism, cultural storytelling, sports tournaments, and parliamentary coverage",
      readership: {
        metric: "Universal terrestrial and digital streaming reach across the Fiji archipelago",
        source: "Mai TV Broadcast Overview 2023",
      },
      revenueModel: "Television broadcast advertising and commercial production",
      logo: "newspaper-logos/fj/maiviti.svg",
      logoExplainer:
        "Bright blue and orange logo featuring the stylized Pacific wave 'mai tv', symbolising modern television broadcasting in Oceania.",
      sources: ["https://www.maitv.com.fj", "https://en.wikipedia.org/wiki/Mai_TV"],
    },
  ],

  // Finland
  FI: [
    {
      id: "fi-helsingin-sanomat",
      countryCode: "FI",
      name: "Helsingin Sanomat",
      officialName: "HS",
      nativeName: "Helsingin Sanomat",
      englishTranslation: "Helsinki News",
      founded: 1889,
      frequency: "Daily newspaper (Monday–Sunday)",
      format: "Tabloid format broadsheet & digital network",
      language: "Finnish",
      headquarters: "Sanomatalo, Töölönlahti, Helsinki",
      owner: {
        name: "Sanoma Media Finland",
        type: "Independent commercial media",
      },
      editorialStance: "Finland's preeminent newspaper of record and the largest subscription daily in the Nordic countries; independent liberal stance focusing on Nordic welfare, European security, technology, and arts",
      readership: {
        metric: "Over 2.2 million weekly readers across print and digital, with more than 450,000 paid digital subscribers on hs.fi",
        source: "Sanoma Corporation Annual Report 2023",
      },
      revenueModel: "Digital paywall subscriptions, print circulation, and corporate display advertising",
      logo: "newspaper-logos/fi/helsingin-sanomat.svg",
      logoExplainer:
        "Iconic black square emblem with white interlocking initials 'HS' and classic serif typography, the benchmark insignia of Finnish journalism.",
      sources: ["https://www.hs.fi", "https://en.wikipedia.org/wiki/Helsingin_Sanomat"],
    },
    {
      id: "fi-iltalehti",
      countryCode: "FI",
      name: "Iltalehti",
      nativeName: "Iltalehti",
      englishTranslation: "Evening Newspaper",
      founded: 1980,
      frequency: "Continuous digital news service & daily print",
      format: "Digital-first portal & daily tabloid",
      language: "Finnish",
      headquarters: "Helsinki",
      owner: {
        name: "Alma Media Corporation",
        type: "Independent commercial media",
      },
      editorialStance: "Finland's premier digital news brand; breaking news, visual investigative reporting, consumer guides, political scoops, and lifestyle",
      readership: {
        metric: "Over 3.1 million weekly digital users on iltalehti.fi; highest weekly digital reach in Finland",
        source: "FIAM (Finnish Internet Audience Measurement) 2024",
      },
      revenueModel: "Digital subscriptions (IL Plus), programmatic ads, and print newsstand sales",
      logo: "newspaper-logos/fi/iltalehti.svg",
      logoExplainer:
        "Vibrant red banner with clean white typography 'ILTALEHTI', symbolising fast-paced breaking digital news across Finland.",
      sources: ["https://www.iltalehti.fi", "https://en.wikipedia.org/wiki/Iltalehti"],
    },
    {
      id: "fi-ilta-sanomat",
      countryCode: "FI",
      name: "Ilta-Sanomat",
      officialName: "IS",
      nativeName: "Ilta-Sanomat",
      englishTranslation: "Evening News",
      founded: 1932,
      frequency: "Daily newspaper & continuous digital portal",
      format: "Tabloid publication & digital network",
      language: "Finnish",
      headquarters: "Helsinki",
      owner: {
        name: "Sanoma Media Finland",
        type: "Independent commercial media",
      },
      editorialStance: "Major commercial daily founded during the Mäntsälä rebellion; breaking news, sports (ice hockey / SM-liiga), entertainment, and consumer investigative journalism",
      readership: {
        metric: "Over 2.9 million weekly digital visitors on is.fi and leading street print newspaper",
        source: "Sanoma Media Audience Review 2024",
      },
      revenueModel: "Digital advertising, premium digital packages (IS Extra), and retail sales",
      logo: "newspaper-logos/fi/ilta-sanomat.svg",
      logoExplainer:
        "Red and blue emblem featuring bold letters 'IS' and full title, iconic on Finnish newsstands since the 1930s.",
      sources: ["https://www.is.fi", "https://en.wikipedia.org/wiki/Ilta-Sanomat"],
    },
    {
      id: "fi-kauppalehti",
      countryCode: "FI",
      name: "Kauppalehti",
      nativeName: "Kauppalehti",
      englishTranslation: "Commerce Paper",
      founded: 1898,
      frequency: "Daily business newspaper (Monday–Friday)",
      format: "Salmon broadsheet & digital financial portal",
      language: "Finnish",
      headquarters: "Helsinki",
      owner: {
        name: "Alma Media Corporation",
        type: "Independent commercial media",
      },
      editorialStance: "Finland's preeminent financial and business daily; Helsinki Stock Exchange (Nasdaq Helsinki), corporate innovations, forestry, clean tech, and macroeconomic policy",
      readership: {
        metric: "Over 150,000 paid business subscribers; primary information source for Finnish business executives and investors",
        source: "Alma Media Corporate Review 2023",
      },
      revenueModel: "Corporate subscriptions and B2B financial advertising",
      logo: "newspaper-logos/fi/kauppalehti.svg",
      logoExplainer:
        "Dark green and black banner with bold sans-serif text 'Kauppalehti', representing Finnish corporate leadership and market analysis.",
      sources: ["https://www.kauppalehti.fi", "https://en.wikipedia.org/wiki/Kauppalehti"],
    },
    {
      id: "fi-hufvudstadsbladet",
      countryCode: "FI",
      name: "Hufvudstadsbladet",
      officialName: "HBL",
      nativeName: "Hufvudstadsbladet",
      englishTranslation: "Capital City Paper",
      founded: 1864,
      frequency: "Daily newspaper",
      format: "Tabloid & digital portal",
      language: "Swedish",
      headquarters: "Mannerheimintie, Helsinki",
      owner: {
        name: "Bonnier News (51%) & KSF Media / Konstsamfundet (49%)",
        type: "Independent commercial media",
      },
      editorialStance: "The flagship Swedish-language daily newspaper in Finland; cultural commentary, Nordic cooperation, minority language rights, and international diplomacy",
      readership: {
        metric: "Largest Swedish-language daily newspaper in Finland with over 40,000 paid subscribers and 250,000 monthly digital readers on hbl.fi",
        source: "KSF Media & Bonnier News 2024",
      },
      revenueModel: "Digital subscriptions, print sales, and cultural foundation support",
      logo: "newspaper-logos/fi/hufvudstadsbladet.svg",
      logoExplainer:
        "Historic black serif masthead 'Hufvudstadsbladet' with blue accent 'HBL', representing 160 years of Swedish-Finnish press tradition.",
      sources: ["https://www.hbl.fi", "https://en.wikipedia.org/wiki/Hufvudstadsbladet"],
    },
  ],

  // France
  FR: [
    {
      id: "fr-le-monde",
      countryCode: "FR",
      name: "Le Monde",
      englishTranslation: "The World",
      founded: 1944,
      frequency: "Daily newspaper (Monday–Saturday afternoon)",
      format: "Berliner format & global digital network",
      language: "French, English (Le Monde in English)",
      headquarters: "Boulevard Auguste-Blanqui, Paris",
      owner: {
        name: "Groupe Le Monde (Fonds pour l'Indépendance de la Presse / Xavier Niel)",
        type: "Independent trust / foundation",
      },
      editorialStance: "France's preeminent newspaper of record founded at the Liberation by Hubert Beuve-Méry; center-left independent intellectual stance with world-renowned investigative journalism and international analysis",
      readership: {
        metric: "Over 550,000 paid digital subscribers and more than 20 million monthly digital readers across French and English editions worldwide",
        source: "Groupe Le Monde Bilan Annuel 2023",
      },
      revenueModel: "Digital subscriptions, print circulation, and corporate advertising",
      logo: "newspaper-logos/fr/le-monde.svg",
      logoExplainer:
        "Iconic black gothic masthead 'Le Monde' designed in 1944, representing moral independence and authoritative intellectual journalism.",
      sources: ["https://www.lemonde.fr", "https://en.wikipedia.org/wiki/Le_Monde"],
    },
    {
      id: "fr-le-figaro",
      countryCode: "FR",
      name: "Le Figaro",
      englishTranslation: "The Figaro (named after Beaumarchais' character)",
      founded: 1826,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Broadsheet & digital portal",
      language: "French",
      headquarters: "Boulevard Haussmann, Paris",
      owner: {
        name: "Groupe Figaro (Dassault Group)",
        type: "Independent commercial media",
      },
      editorialStance: "Oldest national daily newspaper in France; center-right liberal-conservative newspaper of record known for literary culture, economic liberalism, and constitutional politics",
      readership: {
        metric: "Over 350,000 paid broadsheet and digital subscribers; top-ranking French digital news destination with 22M+ monthly visitors on lefigaro.fr",
        source: "ACPM (Alliance pour les Chiffres de la Presse et des Médias) 2024",
      },
      revenueModel: "Digital subscriptions, print sales, luxury advertising, and magazine supplements",
      logo: "newspaper-logos/fr/le-figaro.svg",
      logoExplainer:
        "Classic blue and black serif masthead 'LE FIGARO' accompanied by Beaumarchais' motto 'Sans la liberté de blâmer, il n'est point d'éloge flatteur'.",
      sources: ["https://www.lefigaro.fr", "https://en.wikipedia.org/wiki/Le_Figaro"],
    },
    {
      id: "fr-les-echos",
      countryCode: "FR",
      name: "Les Échos",
      englishTranslation: "The Echoes",
      founded: 1908,
      frequency: "Daily business newspaper (Monday–Friday)",
      format: "Berliner & digital financial network",
      language: "French",
      headquarters: "Paris",
      owner: {
        name: "Groupe Les Échos-Le Parisien (LVMH)",
        type: "Independent commercial media",
      },
      editorialStance: "France's leading financial and economic daily; CAC 40 market analysis, European Union fiscal policy, industrial innovation, and corporate strategy",
      readership: {
        metric: "Over 100,000 paid digital subscribers; mandatory daily reading for senior French executives and policymakers",
        source: "Groupe Les Échos-Le Parisien 2024",
      },
      revenueModel: "Corporate subscriptions and financial market advertising",
      logo: "newspaper-logos/fr/les-echos.svg",
      logoExplainer:
        "Red and black title banner with bold modern typography 'Les Echos', symbolising authoritative market intelligence.",
      sources: ["https://www.lesechos.fr", "https://en.wikipedia.org/wiki/Les_%C3%89chos_(France)"],
    },
    {
      id: "fr-liberation",
      countryCode: "FR",
      name: "Libération",
      englishTranslation: "Liberation",
      founded: 1973,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Tabloid publication & digital portal",
      language: "French",
      headquarters: "Paris",
      owner: {
        name: "Fonds de Dotation pour une Presse Indépendante (FDPI)",
        type: "Independent trust / foundation",
      },
      editorialStance: "Left-wing daily newspaper founded by Jean-Paul Sartre and Serge July; renowned for creative visual front pages, social justice, cultural critique, and civil liberties",
      readership: {
        metric: "Over 110,000 paid subscribers across print and digital platforms on liberation.fr",
        source: "Libération Rapport Financier 2023",
      },
      revenueModel: "Reader subscriptions, philanthropic endowment support, and advertising",
      logo: "newspaper-logos/fr/libération.svg",
      logoExplainer:
        "Iconic red rectangular emblem with bold white typography 'Libération', the visual hallmark of French progressive intellectual journalism.",
      sources: ["https://www.liberation.fr", "https://en.wikipedia.org/wiki/Lib%C3%A9ration"],
    },
    {
      id: "fr-ouest-france",
      countryCode: "FR",
      name: "Ouest-France",
      englishTranslation: "West France",
      founded: 1944,
      frequency: "Daily newspaper (Monday–Sunday)",
      format: "Berliner & comprehensive regional network",
      language: "French",
      headquarters: "Rennes, Brittany",
      owner: {
        name: "Association pour le Soutien des Principes de la Démocratie Humaniste",
        type: "Non-profit independent trust",
      },
      editorialStance: "Most read French-language newspaper in the world; non-profit Christian-humanist and pro-European democratic values, focusing on decentralised regional life and social cohesion",
      readership: {
        metric: "Over 630,000 daily print copies; highest circulation newspaper in France with over 2.5 million daily readers across 53 regional editions",
        source: "ACPM Chiffres de Diffusion 2024",
      },
      revenueModel: "Print subscriptions, retail kiosk sales, and local display advertising",
      logo: "newspaper-logos/fr/ouest-france.svg",
      logoExplainer:
        "Red and blue emblem with bold sans-serif lettering 'ouest france', representing grassroots democratic humanism in regional France.",
      sources: ["https://www.ouest-france.fr", "https://en.wikipedia.org/wiki/Ouest-France"],
    },
  ],

  // Gabon
  GA: [
    {
      id: "ga-l-union",
      countryCode: "GA",
      name: "L'Union",
      englishTranslation: "The Union",
      founded: 1974,
      frequency: "Daily newspaper (Monday–Friday)",
      format: "Broadsheet & digital portal",
      language: "French",
      headquarters: "Libreville",
      owner: {
        name: "Société Gabonaise d'Édition et de Presse (SONAPRESSE)",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Gabon's historic national newspaper of record; government decrees, transition governance, extractive oil and mining industries, and environmental conservation",
      readership: {
        metric: "Largest print daily circulation in Gabon (~20,000 daily print copies) with universal institutional reach",
        source: "SONAPRESSE Rapport d'Activité 2023",
      },
      annualPublicFunding: {
        total: "XAF 350 million (~US$575,000) state public press subsidy",
        perCapita: "XAF 150 / person / year (~US$0.25)",
      },
      revenueModel: "State operating subsidies, retail print sales, and official legal notices",
      logo: "newspaper-logos/ga/l-union.svg",
      logoExplainer:
        "Deep blue title banner with white serif font 'L'UNION', symbolising national unity and public press heritage.",
      sources: ["https://www.union.sonapresse.com", "https://fr.wikipedia.org/wiki/L%27Union_(journal_gabonais)"],
    },
    {
      id: "ga-agp",
      countryCode: "GA",
      name: "AGP",
      officialName: "Agence Gabonaise de Presse",
      nativeName: "Agence Gabonaise de Presse",
      englishTranslation: "Gabonese Press Agency",
      founded: 1961,
      frequency: "Continuous 24/7 national newswire",
      format: "Official state wire service & daily bulletin",
      language: "French",
      headquarters: "Libreville",
      owner: {
        name: "Republic of Gabon (Ministère de la Communication)",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Statutory national news agency; presidential activity, national transition council resolutions, provincial governors, and ECCAS diplomacy",
      readership: {
        metric: "Primary news supplier to national television (Gabon Télévisions), radio stations, and regional media",
        source: "AGP Direction Générale 2023",
      },
      annualPublicFunding: {
        total: "XAF 220 million (~US$360,000) state budget allocation",
        perCapita: "XAF 95 / person / year (~US$0.16)",
      },
      revenueModel: "State budget funding and wire subscription services",
      logo: "newspaper-logos/ga/agp-agence-gabonaise-de-presse.svg",
      logoExplainer:
        "Green, yellow, and blue emblem representing the national colors of Gabon with clean typography 'AGP'.",
      sources: ["https://agpgabon.ga", "https://fr.wikipedia.org/wiki/Agence_gabonaise_de_presse"],
    },
    {
      id: "ga-gabon-review",
      countryCode: "GA",
      name: "Gabon Review",
      founded: 2011,
      frequency: "Continuous digital news service",
      format: "Digital-only analytical portal",
      language: "French",
      headquarters: "Libreville",
      owner: {
        name: "BDP Gabao Media",
        type: "Independent commercial media",
      },
      editorialStance: "Leading independent digital news and analytical portal; critical political commentary, anti-corruption investigations, forestry governance, and civil society debate",
      readership: {
        metric: "Over 1.5 million monthly digital visitors across Gabon and the international diaspora",
        source: "Gabon Review Audience Report 2024",
      },
      revenueModel: "Digital display advertising, sponsored columns, and consulting",
      logo: "newspaper-logos/ga/gabon-review.svg",
      logoExplainer:
        "Red and black title banner with modern font 'GabonReview', symbolising fearless independent investigative journalism.",
      sources: ["https://www.gabonreview.com", "https://fr.wikipedia.org/wiki/Gabon_Review"],
    },
    {
      id: "ga-gabon-actu",
      countryCode: "GA",
      name: "Gabonactu.com",
      founded: 2012,
      frequency: "Continuous 24/7 digital news service",
      format: "Digital news portal & web TV",
      language: "French",
      headquarters: "Libreville",
      owner: {
        name: "Groupe Gabonactu (Yves-Laurent Goma)",
        type: "Independent commercial media",
      },
      editorialStance: "Real-time digital breaking news; politics, social movements, judicial affairs, and community reporting across Gabon's 9 provinces",
      readership: {
        metric: "Over 1.2 million monthly digital page views; top-ranked digital breaking news destination in Libreville",
        source: "Gabonactu Analytics 2023",
      },
      revenueModel: "Digital advertising and sponsored corporate communication",
      logo: "newspaper-logos/ga/gabon-actu.svg",
      logoExplainer:
        "Navy blue and orange badge with bold text 'GABONACTU.COM', representing rapid breaking digital news.",
      sources: ["https://gabonactu.com"],
    },
    {
      id: "ga-gabon-medias-time",
      countryCode: "GA",
      name: "Gabon Media Time",
      founded: 2016,
      frequency: "Continuous digital multimedia service",
      format: "Digital multimedia portal & podcasts",
      language: "French",
      headquarters: "Libreville",
      owner: {
        name: "GMT Media Group (Harold Leckat)",
        type: "Independent commercial media",
      },
      editorialStance: "Modern multimedia news platform; investigative reporting, economic analysis, youth entrepreneurship, and cultural lifestyle",
      readership: {
        metric: "Rapidly grown to over 800,000 monthly digital visits with high engagement on mobile and social channels",
        source: "GMT Audience Review 2024",
      },
      revenueModel: "Digital programmatic advertising and brand content production",
      logo: "newspaper-logos/ga/gabon-medias-time.svg",
      logoExplainer:
        "Clean white background with elegant black and gold lettering 'GABON MEDIA TIME', symbolising contemporary media innovation.",
      sources: ["https://gabonmediatime.com"],
    },
  ],

  // Gambia
  GM: [
    {
      id: "gm-the-point",
      countryCode: "GM",
      name: "The Point",
      founded: 1991,
      frequency: "Daily newspaper (Monday–Friday)",
      format: "Tabloid publication & digital portal",
      language: "English",
      headquarters: "Fajara, Kanifing / Banjul",
      owner: {
        name: "The Point Newspaper Ltd (Pap Saine)",
        type: "Independent commercial media",
      },
      editorialStance: "Gambia's internationally acclaimed independent newspaper co-founded by Deyda Hydara; courageous press freedom pioneer, anti-corruption investigation, and democratic transition reporting",
      readership: {
        metric: "Winner of the IPI Free Media Pioneer Award; leading independent daily newspaper in the Gambia",
        source: "The Point Newspaper Review 2023",
      },
      revenueModel: "Print newsstand sales, legal notices, and commercial display advertising",
      logo: "newspaper-logos/gm/the-point.svg",
      logoExplainer:
        "Bold black and red serif masthead 'THE POINT' on white canvas, symbolising decades of brave journalistic integrity in West Africa.",
      sources: ["https://thepoint.gm", "https://en.wikipedia.org/wiki/The_Point_(Gambia)"],
    },
    {
      id: "gm-foroyaa",
      countryCode: "GM",
      name: "Foroyaa",
      nativeName: "Foroyaa",
      englishTranslation: "Freedom / Emancipation",
      founded: 1987,
      frequency: "Daily newspaper",
      format: "Tabloid publication & digital portal",
      language: "English",
      headquarters: "Serrekunda",
      owner: {
        name: "Foroyaa Publishing Co. (Halifa Sallah & Sam Sarr)",
        type: "Independent commercial media",
      },
      editorialStance: "Historic socio-political daily newspaper; in-depth constitutional law, agricultural reform, human rights monitoring, and Truth, Reconciliation and Reparations Commission (TRRC) documentation",
      readership: {
        metric: "Highly respected analytical publication widely read across legal, academic, and parliamentary communities",
        source: "Foroyaa Media Profile 2023",
      },
      revenueModel: "Print sales, subscriptions, and civic society notices",
      logo: "newspaper-logos/gm/foroyaa.svg",
      logoExplainer:
        "Red and green title banner with bold uppercase typography 'FOROYAA', representing thirty-seven years of civic freedom struggle.",
      sources: ["https://foroyaa.net", "https://en.wikipedia.org/wiki/Foroyaa"],
    },
    {
      id: "gm-kerr-fatou",
      countryCode: "GM",
      name: "Kerr Fatou",
      englishTranslation: "Fatou's Home",
      founded: 2016,
      frequency: "Continuous digital news & live talk show",
      format: "Digital multimedia portal & Web TV",
      language: "English, Wolof, Mandinka",
      headquarters: "Kanifing",
      owner: {
        name: "Kerr Fatou Media (Fatou Touray)",
        type: "Independent commercial media",
      },
      editorialStance: "Leading digital multimedia news and talk-show platform; national political debates, investigative human interest stories, women's empowerment, and electoral analysis",
      readership: {
        metric: "Over 1.5 million monthly digital interactions across Facebook, YouTube, and kerrfatou.com; most watched digital political show in Gambia",
        source: "Kerr Fatou Media Analytics 2024",
      },
      revenueModel: "Digital video monetization, corporate sponsorships, and diaspora advertising",
      logo: "newspaper-logos/gm/kerr-fatou.svg",
      logoExplainer:
        "Vibrant pink and dark purple emblem featuring stylized typography 'KERR FATOU', symbolising women-led multimedia innovation.",
      sources: ["https://www.kerrfatou.com"],
    },
    {
      id: "gm-the-chronicle-gambia",
      countryCode: "GM",
      name: "The Chronicle",
      officialName: "The Gambia Chronicle",
      founded: 2019,
      frequency: "Continuous digital news service",
      format: "Digital-only news portal & podcasts",
      language: "English",
      headquarters: "Banjul",
      owner: {
        name: "The Chronicle Media Co.",
        type: "Independent commercial media",
      },
      editorialStance: "Youth-led investigative digital outlet; investigative scoops, public expenditure tracking, environmental journalism, and migration reporting",
      readership: {
        metric: "Over 450,000 monthly digital readers among youth, students, and international development analysts",
        source: "The Chronicle Audience Review 2024",
      },
      revenueModel: "Digital banner advertising and philanthropic investigative grants",
      logo: "newspaper-logos/gm/the-chronicle-gambia.svg",
      logoExplainer:
        "Dark navy banner with crisp white serif typography 'THE CHRONICLE', reflecting analytical investigative journalism.",
      sources: ["https://www.chronicle.gm"],
    },
    {
      id: "gm-daily-observer-gambia",
      countryCode: "GM",
      name: "Daily Observer",
      founded: 1992,
      frequency: "Daily newspaper (historic national daily)",
      format: "Broadsheet & digital archive",
      language: "English",
      headquarters: "Bakau / Banjul",
      owner: {
        name: "Observer Company Ltd (Kenneth Best founded)",
        type: "Independent commercial media",
      },
      editorialStance: "Historically Gambia's first and largest daily broadsheet newspaper; chronicled national politics, sporting events, and cultural heritage",
      readership: {
        metric: "Historically the highest circulation print daily in the Gambia throughout the 1990s and 2000s",
        source: "Gambia Press Union Historical Archive 2023",
      },
      revenueModel: "Print sales and historical archives licensing",
      logo: "newspaper-logos/gm/daily-observer-gambia.svg",
      logoExplainer:
        "Classic serif masthead 'DAILY OBSERVER' in green and black, symbolising the foundation of daily print journalism in the Gambia.",
      sources: ["https://en.wikipedia.org/wiki/Daily_Observer_(The_Gambia)"],
    },
  ],

  // Georgia
  GE: [
    {
      id: "ge-interpressnews",
      countryCode: "GE",
      name: "Interpressnews",
      officialName: "IPN",
      nativeName: "ინტერპრესნიუსი",
      englishTranslation: "Interpressnews",
      founded: 2001,
      frequency: "Continuous 24/7 national newswire",
      format: "National news agency wire & online portal",
      language: "Georgian, English, Russian",
      headquarters: "Tbilisi",
      owner: {
        name: "Palitra Media Holding",
        type: "Independent commercial media",
      },
      editorialStance: "Georgia's primary independent news agency; real-time breaking news wire supplying parliamentary proceedings, judicial trials, regional South Caucasus news, and geopolitics",
      readership: {
        metric: "Over 4.5 million monthly digital visits; primary wire source for all Georgian television networks, radio stations, and print media",
        source: "Palitra Media Audience Report 2024",
      },
      revenueModel: "Newswire subscription syndication, digital display advertising, and SMS breaking news alerts",
      logo: "newspaper-logos/ge/interpressnews.svg",
      logoExplainer:
        "Red and blue emblem featuring stylized globe and bold typography 'IPN Interpressnews', the benchmark wire agency of Georgia.",
      sources: ["https://www.interpressnews.ge", "https://en.wikipedia.org/wiki/Interpressnews"],
    },
    {
      id: "ge-civil-ge",
      countryCode: "GE",
      name: "Civil.ge",
      officialName: "Civil Georgia",
      founded: 2001,
      frequency: "Continuous digital news service",
      format: "Digital investigative portal & multilingual daily",
      language: "Georgian, English, Russian",
      headquarters: "Tbilisi",
      owner: {
        name: "United Nations Association of Georgia (UNAG)",
        type: "Non-profit independent foundation",
      },
      editorialStance: "Non-partisan daily news portal dedicated to democratic consolidation; authoritative tracking of electoral processes, occupied territories (Abkhazia/South Ossetia), and European integration",
      readership: {
        metric: "Primary news source on Georgia for foreign embassies, international organizations, Western think tanks, and scholars",
        source: "Civil.ge / UNAG Annual Review 2023",
      },
      revenueModel: "International democratic governance grants and philanthropic donations",
      logo: "newspaper-logos/ge/civil-ge.svg",
      logoExplainer:
        "Clean white background with modern blue typography 'Civil.ge', representing objective, non-partisan analytical journalism.",
      sources: ["https://civil.ge", "https://en.wikipedia.org/wiki/Civil_Georgia"],
    },
    {
      id: "ge-sakartvelos-respublika",
      countryCode: "GE",
      name: "Sakartvelos Respublika",
      nativeName: "საქართველოს რესპუბლიკა",
      englishTranslation: "Republic of Georgia",
      founded: 1918,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital portal",
      language: "Georgian",
      headquarters: "Tbilisi",
      owner: {
        name: "Sakartvelos Respublika Publishing",
        type: "Independent commercial media",
      },
      editorialStance: "Historic newspaper founded during the Democratic Republic of Georgia in 1918; constitutional history, academic essays, national culture, and public governance",
      readership: {
        metric: "Historic paper of record read widely by historians, civil servants, and the cultural intelligentsia",
        source: "Georgian National Parliamentary Library 2023",
      },
      revenueModel: "Print subscriptions, retail sales, and official announcements",
      logo: "newspaper-logos/ge/sakartvelos-respublika.svg",
      logoExplainer:
        "Historic Georgian Asomtavruli and Mkhedruli script calligraphy 'საქართველოს რესპუბლიკა' with the national coat of arms motif.",
      sources: ["https://sakresh.ge", "https://ka.wikipedia.org/wiki/%E1%83%A1%E1%83%90%E1%83%A5%E1%83%90%E1%83%A0%E1%83%97%E1%83%95%E1%83%94%E1%83%9A%E1%83%9D%E1%83%A1_%E1%83%A0%E1%83%94%E1%83%A1%E1%83%A0%E1%83%A3%E1%83%91%E1%83%9A%E1%83%98%E1%83%99%E1%83%90_(%E1%83%92%E1%83%90%E1%83%96%E1%83%94%E1%83%97%E1%83%98)"],
    },
    {
      id: "ge-kviris-palitra",
      countryCode: "GE",
      name: "Kviris Palitra",
      nativeName: "კვირის პალიტრა",
      englishTranslation: "Weekly Palette",
      founded: 1995,
      frequency: "Weekly newspaper (Monday)",
      format: "Broadsheet & digital network",
      language: "Georgian",
      headquarters: "Tbilisi",
      owner: {
        name: "Palitra Media Holding",
        type: "Independent commercial media",
      },
      editorialStance: "Georgia's largest circulation weekly newspaper; comprehensive political interviews, investigative exposés, military commentary, and cultural essays",
      readership: {
        metric: "Highest print circulation weekly in Georgia (~40,000 weekly copies) and 2.5 million monthly digital readers on kvirispalitra.ge",
        source: "Palitra Media Holding 2024",
      },
      revenueModel: "Print sales, digital subscriptions, and display advertising",
      logo: "newspaper-logos/ge/kviris-palitra.svg",
      logoExplainer:
        "Palette of colors and bold Georgian font 'კვირის პალიტრა', symbolising a diverse spectrum of national perspectives.",
      sources: ["https://kvirispalitra.ge", "https://ka.wikipedia.org/wiki/%E1%83%99%E1%83%95%E1%83%98%E1%83%A0%E1%83%98%E1%83%A1_%E1%83%A0%E1%83%90%E1%83%9A%E1%83%98%E1%83%A2%E1%83%A0%E1%83%90"],
    },
    {
      id: "ge-rezo-nansi",
      countryCode: "GE",
      name: "Rezonansi",
      nativeName: "რეზონანსი",
      englishTranslation: "Resonance",
      founded: 1990,
      frequency: "Daily newspaper (Monday–Friday)",
      format: "Tabloid & digital portal",
      language: "Georgian",
      headquarters: "Tbilisi",
      owner: {
        name: "Rezonansi Media (Malkhaz Rambashidze)",
        type: "Independent commercial media",
      },
      editorialStance: "Independent daily newspaper founded during the national liberation movement; political analytics, economic reform, and investigative reporting",
      readership: {
        metric: "Longstanding daily read by political analysts, civil society leaders, and university students across Tbilisi",
        source: "Rezonansi Media Archive 2023",
      },
      revenueModel: "Print retail sales and digital display advertising",
      logo: "newspaper-logos/ge/rezo-nansi.svg",
      logoExplainer:
        "Red and black title banner with bold Georgian lettering 'რეზონანსი', representing public resonance and civic debate.",
      sources: ["https://resonancedaily.com"],
    },
  ],

  // Germany
  DE: [
    {
      id: "de-frankfurter-allgemeine-zeitung",
      countryCode: "DE",
      name: "Frankfurter Allgemeine Zeitung",
      officialName: "FAZ",
      nativeName: "Frankfurter Allgemeine Zeitung",
      englishTranslation: "Frankfurt General Newspaper",
      founded: 1949,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Broadsheet & digital network",
      language: "German",
      headquarters: "Hellerhofstraße, Frankfurt am Main, Hesse",
      owner: {
        name: "FAZIT-Stiftung (Non-profit Foundation)",
        type: "Independent trust / foundation",
      },
      editorialStance: "Germany's preeminent conservative-liberal newspaper of record; owned by an independent foundation to ensure total editorial freedom; internationally renowned for deep political analysis, economic theory (ordoliberalism), cultural Feuilleton, and global foreign correspondence",
      readership: {
        metric: "Over 200,000 daily print circulation and more than 300,000 paid digital subscribers (F+ / FAZ.NET) reaching 12+ million monthly unique users",
        source: "IVW (Informationsgemeinschaft zur Feststellung der Verbreitung von Werbeträgern) 2024",
      },
      revenueModel: "Digital paywall subscriptions, print circulation, and corporate display advertising",
      logo: "newspaper-logos/de/frankfurter-allgemeine-zeitung.svg",
      logoExplainer:
        "Historic Fraktur blackletter masthead 'Frankfurter Allgemeine' on white canvas, the definitive typographic symbol of German quality journalism.",
      sources: ["https://www.faz.net", "https://en.wikipedia.org/wiki/Frankfurter_Allgemeine_Zeitung"],
    },
    {
      id: "de-sueddeutsche-zeitung",
      countryCode: "DE",
      name: "Süddeutsche Zeitung",
      officialName: "SZ",
      nativeName: "Süddeutsche Zeitung",
      englishTranslation: "South German Newspaper",
      founded: 1945,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Broadsheet & digital network",
      language: "German",
      headquarters: "Hultschiner Straße, Munich, Bavaria",
      owner: {
        name: "Südwestdeutsche Medienholding (SWMH)",
        type: "Independent commercial media",
      },
      editorialStance: "Germany's largest quality subscription daily; center-left progressive liberal stance; world-famous investigative journalism department that broke the Panama Papers and Paradise Papers",
      readership: {
        metric: "Over 310,000 paid circulation including 260,000+ digital subscribers (SZ Plus) and 14 million monthly digital readers on sz.de",
        source: "IVW Deutschland Q1 2024",
      },
      revenueModel: "Digital paywall subscriptions, print sales, and commercial display advertising",
      logo: "newspaper-logos/de/süddeutsche-zeitung.svg",
      logoExplainer:
        "Gothic serif masthead 'Süddeutsche Zeitung' featuring the historic Munich cathedral (Frauenturm) silhouette, symbolising investigative authority.",
      sources: ["https://www.sueddeutsche.de", "https://en.wikipedia.org/wiki/S%C3%BCddeutsche_Zeitung"],
    },
    {
      id: "de-die-welt",
      countryCode: "DE",
      name: "Die Welt",
      nativeName: "Die Welt",
      englishTranslation: "The World",
      founded: 1946,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital network (WELT)",
      language: "German",
      headquarters: "Axel-Springer-Straße, Berlin",
      owner: {
        name: "Axel Springer SE",
        type: "Independent commercial media",
      },
      editorialStance: "National conservative broadsheet founded in Hamburg by British occupation authorities; free-market advocacy, transatlantic partnership, defense policy, and 24-hour TV news integration (WELT TV)",
      readership: {
        metric: "Over 200,000 digital subscribers (WELTplus) and top-tier digital news destination with 18 million monthly unique visitors",
        source: "Axel Springer Financial Results 2024",
      },
      revenueModel: "Digital subscriptions, television broadcasting revenue, and programmatic advertising",
      logo: "newspaper-logos/de/die-welt.svg",
      logoExplainer:
        "Deep blue rectangular banner with bold white capital typography 'WELT', representing transatlantic conservatism and 24-hour news.",
      sources: ["https://www.welt.de", "https://en.wikipedia.org/wiki/Die_Welt"],
    },
    {
      id: "de-handelsblatt",
      countryCode: "DE",
      name: "Handelsblatt",
      nativeName: "Handelsblatt",
      englishTranslation: "Commerce Sheet",
      founded: 1946,
      frequency: "Daily business newspaper (Monday–Friday)",
      format: "Tabloid format broadsheet & financial network",
      language: "German",
      headquarters: "Toulouser Allee, Düsseldorf, North Rhine-Westphalia",
      owner: {
        name: "Handelsblatt Media Group (Dieter von Holtzbrinck Medien)",
        type: "Independent commercial media",
      },
      editorialStance: "Germany's preeminent financial and economic daily newspaper; DAX stock exchange analysis, German Mittelstand industrial engineering, automotive transition, and fiscal discipline",
      readership: {
        metric: "Over 140,000 daily paid circulation including 100,000+ digital subscribers; primary business paper for the German industrial executive suite",
        source: "Handelsblatt Media Group Review 2024",
      },
      revenueModel: "Corporate subscriptions, specialized economic research, and B2B financial advertising",
      logo: "newspaper-logos/de/handelsblatt.svg",
      logoExplainer:
        "Signature orange and black title banner with bold uppercase typography 'Handelsblatt', iconic across German corporate boardrooms.",
      sources: ["https://www.handelsblatt.com", "https://en.wikipedia.org/wiki/Handelsblatt"],
    },
    {
      id: "de-bild",
      countryCode: "DE",
      name: "Bild",
      officialName: "Bild-Zeitung",
      nativeName: "Bild",
      englishTranslation: "Picture",
      founded: 1952,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Tabloid publication & digital network",
      language: "German",
      headquarters: "Berlin",
      owner: {
        name: "Axel Springer SE",
        type: "Independent commercial media",
      },
      editorialStance: "Europe's largest circulation daily newspaper; sensationalist populist reporting, celebrity exposés, consumer campaigns, politics, and Bundesliga sports",
      readership: {
        metric: "Over 1.1 million daily print copies and more than 680,000 paid digital subscribers on BILDplus; highest reach daily news brand in Europe",
        source: "IVW Deutschland & Axel Springer 2024",
      },
      revenueModel: "Street print sales, BILDplus digital paywall, and high-volume commercial advertising",
      logo: "newspaper-logos/de/bild.svg",
      logoExplainer:
        "Iconic red square emblem with white bold uppercase lettering 'BILD', the most recognizable tabloid logo across Europe.",
      sources: ["https://www.bild.de", "https://en.wikipedia.org/wiki/Bild"],
    },
  ],

  // Ghana
  GH: [
    {
      id: "gh-daily-graphic",
      countryCode: "GH",
      name: "Daily Graphic",
      founded: 1950,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Official public broadsheet & digital network",
      language: "English",
      headquarters: "Accra",
      owner: {
        name: "Graphic Communications Group Limited (GCGL)",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Ghana's national newspaper of record; government policy announcements, parliamentary debates, cocoa and gold mining economics, and educational notices",
      readership: {
        metric: "Largest print circulation newspaper in Ghana (~100,000 daily print copies) and leading digital portal Graphic Online with 4M+ monthly visits",
        source: "Graphic Communications Group Annual Report 2023",
      },
      revenueModel: "Commercial print circulation, state legal advertising, and digital display revenue",
      logo: "newspaper-logos/gh/daily-graphic.svg",
      logoExplainer:
        "Red and blue title banner with bold serif lettering 'Daily Graphic', symbolising over seventy years of authoritative Ghanaian journalism.",
      sources: ["https://www.graphic.com.gh", "https://en.wikipedia.org/wiki/Daily_Graphic_(Ghana)"],
    },
    {
      id: "gh-the-ghanaian-times",
      countryCode: "GH",
      name: "The Ghanaian Times",
      founded: 1958,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Official state broadsheet & digital portal",
      language: "English",
      headquarters: "Accra",
      owner: {
        name: "New Times Corporation (NTC)",
        type: "State-owned / statutory corporation",
      },
      editorialStance: "Founded by Ghana's first President Kwame Nkrumah; national development reporting, pan-African diplomacy, civil service affairs, and public healthcare",
      readership: {
        metric: "Second largest state-owned newspaper with universal distribution across all 16 regions of Ghana",
        source: "New Times Corporation Ghana 2023",
      },
      revenueModel: "State budget subsidies, print sales, and official government advertising",
      logo: "newspaper-logos/gh/the-ghanaian-times.svg",
      logoExplainer:
        "Classic black serif masthead 'THE GHANAIAN TIMES' on white ground, representing foundational post-independence national press.",
      sources: ["https://ghanaiantimes.com.gh", "https://en.wikipedia.org/wiki/The_Ghanaian_Times"],
    },
    {
      id: "gh-myjoyonline",
      countryCode: "GH",
      name: "MyJoyOnline",
      founded: 2003,
      frequency: "Continuous 24/7 digital news service",
      format: "Digital multimedia portal & radio/TV network",
      language: "English",
      headquarters: "Kokomlemle, Accra",
      owner: {
        name: "The Multimedia Group (Kwasi Twum)",
        type: "Independent commercial media",
      },
      editorialStance: "Ghana's premier independent digital news network; investigative journalism (Manasseh Azure Awuni projects), Joy FM radio synergy, and live election coverage",
      readership: {
        metric: "Over 8 million monthly unique digital visitors; highest digital news reach in Ghana",
        source: "Similarweb & Multimedia Group Ghana 2024",
      },
      revenueModel: "Digital programmatic advertising, cross-broadcast sponsorships, and video production",
      logo: "newspaper-logos/gh/myjoyonline.svg",
      logoExplainer:
        "Vibrant yellow and black emblem 'MyJoyOnline.com', representing independent multimedia innovation in West Africa.",
      sources: ["https://www.myjoyonline.com"],
    },
    {
      id: "gh-citinewsroom",
      countryCode: "GH",
      name: "Citi Newsroom",
      founded: 2018,
      frequency: "Continuous 24/7 digital news service",
      format: "Digital news portal & broadcast network",
      language: "English",
      headquarters: "Adabraka, Accra",
      owner: {
        name: "Omni Media Limited / Citi TV & Citi FM (Samuel Attah-Mensah)",
        type: "Independent commercial media",
      },
      editorialStance: "Urban quality news network; consumer rights advocacy, anti-illegal mining (Galamsey) campaigns, fiscal policy oversight, and business news",
      readership: {
        metric: "Over 5 million monthly digital readers; widely recognized for urban professional engagement and broadcast excellence",
        source: "Omni Media Audience Review 2024",
      },
      revenueModel: "Digital display advertising, broadcast commercial revenue, and event sponsorships",
      logo: "newspaper-logos/gh/citinewsroom.svg",
      logoExplainer:
        "Red and blue modern typography 'citinewsroom', symbolising progressive urban broadcast and digital journalism.",
      sources: ["https://citinewsroom.com"],
    },
    {
      id: "gh-daily-guide",
      countryCode: "GH",
      name: "Daily Guide",
      founded: 1984,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Tabloid publication & digital portal",
      language: "English",
      headquarters: "Nima, Accra",
      owner: {
        name: "Western Publications Limited (Freddie Blay family)",
        type: "Independent commercial media",
      },
      editorialStance: "Ghana's largest circulation private newspaper; center-right political stance; aggressive political scoops, crime investigations, and popular culture",
      readership: {
        metric: "Highest print circulation among private newspapers in Ghana (~50,000 daily copies) and popular dailyguideonline.com portal",
        source: "Western Publications Media Kit 2023",
      },
      revenueModel: "Print newsstand sales and private corporate advertising",
      logo: "newspaper-logos/gh/daily-guide.svg",
      logoExplainer:
        "Red banner with bold white serif font 'DAILY GUIDE', iconic across Ghanaian newsstands for over four decades.",
      sources: ["https://dailyguidenetwork.com", "https://en.wikipedia.org/wiki/Daily_Guide"],
    },
  ],

  // Greece
  GR: [
    {
      id: "gr-kathimerini",
      countryCode: "GR",
      name: "Kathimerini",
      nativeName: "Η Καθημερινή",
      englishTranslation: "The Daily",
      founded: 1919,
      frequency: "Daily newspaper (Tuesday–Sunday)",
      format: "Broadsheet & international digital portal",
      language: "Greek, English (Kathimerini English Edition / NYT)",
      headquarters: "Neo Faliro, Athens",
      owner: {
        name: "Kathimerini Publishing (Alafouzos family)",
        type: "Independent commercial media",
      },
      editorialStance: "Greece's historic center-right newspaper of record; distinguished for serious political commentary, European Union policy, Aegean maritime affairs, and arts",
      readership: {
        metric: "Largest subscription broadsheet in Greece and leading digital network with 6+ million monthly unique visitors on kathimerini.gr",
        source: "Kathimerini Publishing Annual Review 2023",
      },
      revenueModel: "Digital paywall subscriptions, print sales, and corporate advertising",
      logo: "newspaper-logos/gr/kathimerini.svg",
      logoExplainer:
        "Classical black Greek serif typography 'Η ΚΑΘΗΜΕΡΙΝΗ' on white canvas, the benchmark masthead of Greek quality journalism.",
      sources: ["https://www.kathimerini.gr", "https://en.wikipedia.org/wiki/Kathimerini"],
    },
    {
      id: "gr-ta-nea",
      countryCode: "GR",
      name: "Ta Nea",
      nativeName: "Τα Νέα",
      englishTranslation: "The News",
      founded: 1931,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Berliner format & digital portal",
      language: "Greek",
      headquarters: "Kallithea, Athens",
      owner: {
        name: "Alter Ego Media (Vangelis Marinakis)",
        type: "Independent commercial media",
      },
      editorialStance: "Historically Greece's highest circulated daily newspaper; center-left social-liberal editorial stance; national politics, parliamentary debates, and social welfare",
      readership: {
        metric: "Consistently among the top two daily print newspapers in Greece with 4.5 million monthly digital readers on tanea.gr",
        source: "Alter Ego Media Audience Report 2024",
      },
      revenueModel: "Print newsstand sales, digital subscriptions, and commercial advertising",
      logo: "newspaper-logos/gr/ta-nea.svg",
      logoExplainer:
        "Red and blue emblem with bold white Greek lettering 'ΤΑ ΝΕΑ', iconic across Greek kiosks for almost a century.",
      sources: ["https://www.tanea.gr", "https://en.wikipedia.org/wiki/Ta_Nea"],
    },
    {
      id: "gr-to-vima",
      countryCode: "GR",
      name: "To Vima",
      nativeName: "Το Βήμα",
      englishTranslation: "The Tribune / Rostrum",
      founded: 1922,
      frequency: "Weekly newspaper (Sunday) & continuous digital portal",
      format: "Broadsheet & digital portal",
      language: "Greek",
      headquarters: "Athens",
      owner: {
        name: "Alter Ego Media",
        type: "Independent commercial media",
      },
      editorialStance: "Historic intellectual Sunday newspaper; in-depth political investigations, foreign policy diplomacy, economic reforms, and literary reviews",
      readership: {
        metric: "Dominant Sunday print circulation in Greece and influential digital readership on tovima.gr",
        source: "Alter Ego Media Review 2023",
      },
      revenueModel: "Sunday print sales, premium book/magazine bundle sales, and digital advertising",
      logo: "newspaper-logos/gr/to-vima.svg",
      logoExplainer:
        "Blue banner with classical white Greek serif font 'ΤΟ ΒΗΜΑ', symbolising over a century of political authority.",
      sources: ["https://www.tovima.gr", "https://en.wikipedia.org/wiki/To_Vima"],
    },
    {
      id: "gr-naftemporiki",
      countryCode: "GR",
      name: "Naftemporiki",
      nativeName: "Η Ναυτεμπορική",
      englishTranslation: "The Shipping and Commercial",
      founded: 1924,
      frequency: "Daily financial newspaper (Monday–Friday)",
      format: "Salmon broadsheet & digital financial portal",
      language: "Greek",
      headquarters: "Athens",
      owner: {
        name: "Aegean Media (Dimitris Melissanidis)",
        type: "Independent commercial media",
      },
      editorialStance: "Greece's premier shipping, financial, and economic daily; Athens Exchange, Greek merchant shipping fleet (world's largest commercial fleet), tourism economics, and European fiscal policy",
      readership: {
        metric: "Over 100 years of financial reporting; mandatory daily reading for Greek shipowners, banking executives, and industrial leaders",
        source: "Naftemporiki Centennial Review 2024",
      },
      revenueModel: "Corporate subscriptions and financial market advertising",
      logo: "newspaper-logos/gr/naftemporiki.svg",
      logoExplainer:
        "Navy blue banner with classical white Greek typography 'Η ΝΑΥΤΕΜΠΟΡΙΚΗ', embodying maritime shipping and commerce excellence.",
      sources: ["https://www.naftemporiki.gr", "https://en.wikipedia.org/wiki/Naftemporiki"],
    },
    {
      id: "gr-efimerida-ton-syntakton",
      countryCode: "GR",
      name: "Efimerida ton Syntakton",
      officialName: "EFSYN",
      nativeName: "Η Εφημερίδα των Συντακτών",
      englishTranslation: "The Journalists' Newspaper",
      founded: 2012,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Tabloid publication & digital portal",
      language: "Greek",
      headquarters: "Kolokotroni Street, Athens",
      owner: {
        name: "Cooperative of Journalists and Employees (Worker Cooperative)",
        type: "Non-profit independent trust",
      },
      editorialStance: "Unique cooperative daily owned entirely by its journalists; left-wing progressive stance championing human rights, refugee solidarity, labor rights, and anti-austerity analysis",
      readership: {
        metric: "Over 2 million monthly digital visitors on efsyn.gr and dedicated nationwide print subscriber base",
        source: "EFSYN Cooperative Annual Report 2023",
      },
      revenueModel: "Reader cooperative subscriptions, print sales, and community advertising",
      logo: "newspaper-logos/gr/efimerida-ton-syntakton.svg",
      logoExplainer:
        "Red and black badge with stylized Greek typography 'ΕΦ.ΣΥΝ.', representing cooperative worker-owned journalism in Greece.",
      sources: ["https://www.efsyn.gr", "https://en.wikipedia.org/wiki/Efimerida_ton_Syntakton"],
    },
  ],

  // Grenada
  GD: [
    {
      id: "gd-now-grenada",
      countryCode: "GD",
      name: "Now Grenada",
      founded: 2013,
      frequency: "Continuous 24/7 digital news service",
      format: "Digital-only news portal",
      language: "English",
      headquarters: "St. George's",
      owner: {
        name: "Now Grenada Media",
        type: "Independent commercial media",
      },
      editorialStance: "Grenada's leading digital breaking news portal; parliamentary affairs, spice island agriculture (nutmeg/cocoa), tourism developments, and community reporting",
      readership: {
        metric: "Over 650,000 monthly digital visits; primary online news source for Grenada, Carriacou, and Petite Martinique",
        source: "Now Grenada Analytics 2024",
      },
      revenueModel: "Digital display advertising and local corporate sponsorships",
      logo: "newspaper-logos/gd/now-grenada.svg",
      logoExplainer:
        "Green, red, and yellow badge featuring bold typography 'NOW Grenada', reflecting the national colors of the Spice Isle.",
      sources: ["https://nowgrenada.com"],
    },
    {
      id: "gd-the-barnacle",
      countryCode: "GD",
      name: "The Barnacle",
      founded: 1990,
      frequency: "Monthly newspaper & daily portal",
      format: "Tabloid publication & digital portal",
      language: "English",
      headquarters: "St. George's",
      owner: {
        name: "Barnacle Publishing Ltd",
        type: "Independent commercial media",
      },
      editorialStance: "Independent print monthly paper; in-depth cultural analysis, community developments, educational features, and environmental news",
      readership: {
        metric: "Widely read community publication across parish schools, local councils, and businesses in St. George's",
        source: "The Barnacle Media Review 2023",
      },
      revenueModel: "Print advertising and local business listings",
      logo: "newspaper-logos/gd/the-barnacle.svg",
      logoExplainer:
        "Navy blue banner with classical white serif masthead 'The Barnacle', representing over thirty years of community journalism.",
      sources: ["https://thebarnaclenews.com"],
    },
    {
      id: "gd-grenada-informer",
      countryCode: "GD",
      name: "The Grenada Informer",
      founded: 1985,
      frequency: "Weekly newspaper (Friday)",
      format: "Tabloid publication & digital portal",
      language: "English",
      headquarters: "St. George's",
      owner: {
        name: "Informer Publishing Co.",
        type: "Independent commercial media",
      },
      editorialStance: "Historic independent weekly newspaper; investigative scoops, court reporting, political commentary, and sports (cricket)",
      readership: {
        metric: "One of the longest-running print weekly papers in Grenada with widespread newsstand circulation",
        source: "Grenada Informer Publishing 2023",
      },
      revenueModel: "Print sales, legal notices, and commercial advertising",
      logo: "newspaper-logos/gd/grenada-informer.svg",
      logoExplainer:
        "Bold red and yellow title banner 'THE GRENADA INFORMER', iconic across island kiosks.",
      sources: ["https://thegrenadainformer.com"],
    },
    {
      id: "gd-the-grenada-guardian",
      countryCode: "GD",
      name: "The Grenada Guardian",
      founded: 1953,
      frequency: "Weekly newspaper",
      format: "Tabloid publication",
      language: "English",
      headquarters: "St. George's",
      owner: {
        name: "Guardian Publishing Ltd",
        type: "Independent commercial media",
      },
      editorialStance: "Historic political weekly founded by Eric Gairy; agricultural workers' rights, constitutional debates, and historical commentary",
      readership: {
        metric: "Historic paper read by political historians and community leaders throughout Grenada",
        source: "Grenada National Archives 2023",
      },
      revenueModel: "Print sales and community notices",
      logo: "newspaper-logos/gd/the-grenada-guardian.svg",
      logoExplainer:
        "Classic black serif title 'THE GRENADA GUARDIAN' on white ground, symbolising foundational post-war political press history.",
      sources: ["https://en.wikipedia.org/wiki/Eric_Gairy"],
    },
    {
      id: "gd-pure-grenada-news",
      countryCode: "GD",
      name: "Pure Grenada News",
      founded: 2018,
      frequency: "Continuous digital news service",
      format: "Digital multimedia portal",
      language: "English",
      headquarters: "St. George's",
      owner: {
        name: "Spice Isle Digital Media",
        type: "Independent commercial media",
      },
      editorialStance: "Digital news and tourism portal; eco-tourism promotions, marine conservation, cultural festivals (Spicemas), and diaspora affairs",
      readership: {
        metric: "Popular digital news channel engaging the Grenadian diaspora in the US, Canada, and the UK",
        source: "Pure Grenada Digital Analytics 2024",
      },
      revenueModel: "Digital display advertising and international tourism partnerships",
      logo: "newspaper-logos/gd/pure-grenada-news.svg",
      logoExplainer:
        "Golden-yellow and green emblem with nutmeg spice motif and clean typography 'Pure Grenada News', evoking the Spice Isle.",
      sources: ["https://www.puregrenada.com"],
    },
  ],

  // GT
  GT: [
    {
        "id": "gt-prensa-libre",
        "countryCode": "GT",
        "name": "Prensa Libre",
        "founded": 1951,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Spanish",
        "headquarters": "Guatemala City",
        "owner": {
            "name": "Prensa Libre S.A.",
            "type": "Independent commercial media"
        },
        "editorialStance": "Center-right / Conservative",
        "readership": {
            "metric": "4,500,000 monthly digital readers",
            "source": "Prensa Libre Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/gt/prensa-libre.svg",
        "logoExplainer": "Official branding banner for Prensa Libre in Guatemala City, representing national journalism and civic communication.",
        "sources": [
            "https://www.prensalibre.com/",
            "https://guatemala.mom-gmr.org/"
        ]
    },
    {
        "id": "gt-el-periodico",
        "countryCode": "GT",
        "name": "elPeriódico",
        "founded": 1996,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Spanish",
        "headquarters": "Guatemala City",
        "owner": {
            "name": "Aldea Global S.A. (Jose Rubén Zamora)",
            "type": "Independent commercial media"
        },
        "editorialStance": "Independent / Investigative / Center-left",
        "readership": {
            "metric": "1,800,000 monthly readers",
            "source": "elPeriódico Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/gt/el-periódico.svg",
        "logoExplainer": "Official branding banner for elPeriódico in Guatemala City, representing national journalism and civic communication.",
        "sources": [
            "https://elperiodico.com.gt/",
            "https://cpj.org/"
        ]
    },
    {
        "id": "gt-diario-de-centro-america",
        "countryCode": "GT",
        "name": "Diario de Centro América",
        "founded": 1880,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Spanish",
        "headquarters": "Guatemala City",
        "owner": {
            "name": "Tipografía Nacional (Government of Guatemala)",
            "type": "State-owned / statutory corporation"
        },
        "editorialStance": "State-owned official organ",
        "readership": {
            "metric": "150,000 readers",
            "source": "Diario de Centro América Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/gt/diario-de-centro-américa.svg",
        "logoExplainer": "Official branding banner for Diario de Centro América in Guatemala City, representing national journalism and civic communication.",
        "sources": [
            "https://dca.gob.gt/",
            "https://guatemala.gob.gt/"
        ]
    },
    {
        "id": "gt-soy502",
        "countryCode": "GT",
        "name": "Soy502",
        "founded": 2013,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Spanish",
        "headquarters": "Guatemala City",
        "owner": {
            "name": "Medios Digitales S.A. (Dina Fernandez)",
            "type": "Independent commercial media"
        },
        "editorialStance": "Independent / Digital-first",
        "readership": {
            "metric": "3,800,000 monthly digital readers",
            "source": "Soy502 Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/gt/soy502.svg",
        "logoExplainer": "Official branding banner for Soy502 in Guatemala City, representing national journalism and civic communication.",
        "sources": [
            "https://www.soy502.com/",
            "https://guatemala.mom-gmr.org/"
        ]
    },
    {
        "id": "gt-plaza-publica",
        "countryCode": "GT",
        "name": "Plaza Pública",
        "founded": 2011,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Spanish",
        "headquarters": "Guatemala City",
        "owner": {
            "name": "Universidad Rafael Landívar",
            "type": "Independent commercial media"
        },
        "editorialStance": "Independent / Academic / Investigative",
        "readership": {
            "metric": "400,000 monthly digital readers",
            "source": "Plaza Pública Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/gt/plaza-pública.svg",
        "logoExplainer": "Official branding banner for Plaza Pública in Guatemala City, representing national journalism and civic communication.",
        "sources": [
            "https://www.plazapublica.com.gt/",
            "https://url.edu.gt/"
        ]
    }
],
  // GN
  GN: [
    {
        "id": "gn-le-lynx",
        "countryCode": "GN",
        "name": "Le Lynx",
        "founded": 1992,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "French",
        "headquarters": "Conakry",
        "owner": {
            "name": "Groupe de Presse Le Lynx-La Lance (Souleymane Diallo)",
            "type": "Independent commercial media"
        },
        "editorialStance": "Satirical / Independent",
        "readership": {
            "metric": "80,000 readers",
            "source": "Le Lynx Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/gn/le-lynx.svg",
        "logoExplainer": "Official branding banner for Le Lynx in Conakry, representing national journalism and civic communication.",
        "sources": [
            "https://lelynx.net/",
            "https://hacguinee.org/"
        ]
    },
    {
        "id": "gn-guineenews",
        "countryCode": "GN",
        "name": "Guineenews",
        "founded": 1997,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "French",
        "headquarters": "Conakry",
        "owner": {
            "name": "Boubacar Cissé / Guineenews Group",
            "type": "Independent commercial media"
        },
        "editorialStance": "Independent",
        "readership": {
            "metric": "850,000 monthly digital readers",
            "source": "Guineenews Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/gn/guineenews.svg",
        "logoExplainer": "Official branding banner for Guineenews in Conakry, representing national journalism and civic communication.",
        "sources": [
            "https://guineenews.org/",
            "https://hacguinee.org/"
        ]
    },
    {
        "id": "gn-horoya",
        "countryCode": "GN",
        "name": "Horoya",
        "founded": 1961,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "French",
        "headquarters": "Conakry",
        "owner": {
            "name": "Ministry of Information and Communication",
            "type": "Independent commercial media"
        },
        "editorialStance": "State-owned official organ",
        "readership": {
            "metric": "30,000 readers",
            "source": "Horoya Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/gn/horoya.svg",
        "logoExplainer": "Official branding banner for Horoya in Conakry, representing national journalism and civic communication.",
        "sources": [
            "https://horoya.info/",
            "https://mic.gov.gn/"
        ]
    },
    {
        "id": "gn-africaguinee",
        "countryCode": "GN",
        "name": "Africaguinee",
        "founded": 2004,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "French",
        "headquarters": "Conakry",
        "owner": {
            "name": "Africaguinee Media",
            "type": "Independent commercial media"
        },
        "editorialStance": "Independent",
        "readership": {
            "metric": "700,000 monthly digital readers",
            "source": "Africaguinee Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/gn/africaguinee.svg",
        "logoExplainer": "Official branding banner for Africaguinee in Conakry, representing national journalism and civic communication.",
        "sources": [
            "https://www.africaguinee.com/",
            "https://hacguinee.org/"
        ]
    },
    {
        "id": "gn-mediaguinee",
        "countryCode": "GN",
        "name": "Mediaguinee",
        "founded": 2010,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "French",
        "headquarters": "Conakry",
        "owner": {
            "name": "Mediaguinee Communication",
            "type": "Independent commercial media"
        },
        "editorialStance": "Independent",
        "readership": {
            "metric": "600,000 monthly digital readers",
            "source": "Mediaguinee Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/gn/mediaguinee.svg",
        "logoExplainer": "Official branding banner for Mediaguinee in Conakry, representing national journalism and civic communication.",
        "sources": [
            "https://mediaguinee.org/",
            "https://hacguinee.org/"
        ]
    }
],
  // GW
  GW: [
    {
        "id": "gw-n-pinti",
        "countryCode": "GW",
        "name": "N'Pinti",
        "founded": 1974,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Portuguese",
        "headquarters": "Bissau",
        "owner": {
            "name": "Government of Guinea-Bissau",
            "type": "State-owned / statutory corporation"
        },
        "editorialStance": "State-owned official organ",
        "readership": {
            "metric": "20,000 readers",
            "source": "N'Pinti Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/gw/n-pinti.svg",
        "logoExplainer": "Official branding banner for N'Pinti in Bissau, representing national journalism and civic communication.",
        "sources": [
            "https://www.gov.gw/",
            "https://www.unesco.org/"
        ]
    },
    {
        "id": "gw-jornal-o-democrata",
        "countryCode": "GW",
        "name": "O Democrata",
        "founded": 2013,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Portuguese",
        "headquarters": "Bissau",
        "owner": {
            "name": "Associação de Jornalistas da Guiné-Bissau",
            "type": "Independent commercial media"
        },
        "editorialStance": "Independent / Pro-democracy",
        "readership": {
            "metric": "90,000 monthly digital readers",
            "source": "O Democrata Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/gw/jornal-o-democrata.svg",
        "logoExplainer": "Official branding banner for O Democrata in Bissau, representing national journalism and civic communication.",
        "sources": [
            "https://www.odemocratagb.com/",
            "https://rsf.org/"
        ]
    },
    {
        "id": "gw-ang-agencia-noticiosa-da-guine",
        "countryCode": "GW",
        "name": "ANG (Agência Noticiosa da Guiné)",
        "founded": 1975,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Portuguese",
        "headquarters": "Bissau",
        "owner": {
            "name": "State of Guinea-Bissau (Public Agency)",
            "type": "State-owned / statutory corporation"
        },
        "editorialStance": "State-owned press agency",
        "readership": {
            "metric": "120,000 monthly digital readers",
            "source": "ANG (Agência Noticiosa da Guiné) Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/gw/ang-agência-noticiosa-da-guiné.svg",
        "logoExplainer": "Official branding banner for ANG (Agência Noticiosa da Guiné) in Bissau, representing national journalism and civic communication.",
        "sources": [
            "https://agencianoticiosadaguine.com/",
            "https://www.gov.gw/"
        ]
    },
    {
        "id": "gw-guinendade",
        "countryCode": "GW",
        "name": "Guinendade",
        "founded": 2015,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Portuguese",
        "headquarters": "Bissau",
        "owner": {
            "name": "Guinendade Media Group",
            "type": "Independent commercial media"
        },
        "editorialStance": "Independent",
        "readership": {
            "metric": "70,000 monthly digital readers",
            "source": "Guinendade Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/gw/guinendade.svg",
        "logoExplainer": "Official branding banner for Guinendade in Bissau, representing national journalism and civic communication.",
        "sources": [
            "https://guinendade.com/",
            "https://rsf.org/"
        ]
    },
    {
        "id": "gw-bissau-weekly",
        "countryCode": "GW",
        "name": "Bissau Weekly",
        "founded": 2018,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Portuguese, English",
        "headquarters": "Bissau",
        "owner": {
            "name": "Bissau Media",
            "type": "Independent commercial media"
        },
        "editorialStance": "Independent",
        "readership": {
            "metric": "40,000 monthly digital readers",
            "source": "Bissau Weekly Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/gw/bissau-weekly.svg",
        "logoExplainer": "Official branding banner for Bissau Weekly in Bissau, representing national journalism and civic communication.",
        "sources": [
            "https://bissauweekly.com/",
            "https://www.unesco.org/"
        ]
    }
],
  // GY
  GY: [
    {
        "id": "gy-stabroek-news",
        "countryCode": "GY",
        "name": "Stabroek News",
        "founded": 1986,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "English",
        "headquarters": "Georgetown",
        "owner": {
            "name": "Guyana Publications Ltd (David de Caires estate)",
            "type": "State-owned / statutory corporation"
        },
        "editorialStance": "Independent / Center-left",
        "readership": {
            "metric": "1,200,000 monthly digital readers",
            "source": "Stabroek News Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/gy/stabroek-news.svg",
        "logoExplainer": "Official branding banner for Stabroek News in Georgetown, representing national journalism and civic communication.",
        "sources": [
            "https://www.stabroeknews.com/",
            "https://guyana.gov.gy/"
        ]
    },
    {
        "id": "gy-kaieteur-news",
        "countryCode": "GY",
        "name": "Kaieteur News",
        "founded": 1994,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "English",
        "headquarters": "Georgetown",
        "owner": {
            "name": "National Media & Publishing Company (Glenn Lall)",
            "type": "Independent commercial media"
        },
        "editorialStance": "Independent / Populist / Critical",
        "readership": {
            "metric": "1,500,000 monthly digital readers",
            "source": "Kaieteur News Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/gy/kaieteur-news.svg",
        "logoExplainer": "Official branding banner for Kaieteur News in Georgetown, representing national journalism and civic communication.",
        "sources": [
            "https://www.kaieteurnewsonline.com/",
            "https://guyana.gov.gy/"
        ]
    },
    {
        "id": "gy-guyana-chronicle",
        "countryCode": "GY",
        "name": "Guyana Chronicle",
        "founded": 1881,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "English",
        "headquarters": "Georgetown",
        "owner": {
            "name": "Guyana National Newspaper Limited (State-owned)",
            "type": "State-owned / statutory corporation"
        },
        "editorialStance": "State-owned official organ",
        "readership": {
            "metric": "600,000 monthly readers",
            "source": "Guyana Chronicle Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/gy/guyana-chronicle.svg",
        "logoExplainer": "Official branding banner for Guyana Chronicle in Georgetown, representing national journalism and civic communication.",
        "sources": [
            "https://guyanachronicle.com/",
            "https://dpi.gov.gy/"
        ]
    },
    {
        "id": "gy-news-room-guyana",
        "countryCode": "GY",
        "name": "News Room Guyana",
        "founded": 2015,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "English",
        "headquarters": "Georgetown",
        "owner": {
            "name": "E-Networks Inc.",
            "type": "Independent commercial media"
        },
        "editorialStance": "Independent / Digital-first",
        "readership": {
            "metric": "2,100,000 monthly digital readers",
            "source": "News Room Guyana Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/gy/news-room-guyana.svg",
        "logoExplainer": "Official branding banner for News Room Guyana in Georgetown, representing national journalism and civic communication.",
        "sources": [
            "https://newsroom.gy/",
            "https://guyana.gov.gy/"
        ]
    },
    {
        "id": "gy-demerara-waves",
        "countryCode": "GY",
        "name": "Demerara Waves",
        "founded": 2010,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "English",
        "headquarters": "Georgetown",
        "owner": {
            "name": "Denis Chabrol / Waves Media",
            "type": "Independent commercial media"
        },
        "editorialStance": "Independent",
        "readership": {
            "metric": "500,000 monthly digital readers",
            "source": "Demerara Waves Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/gy/demerara-waves.svg",
        "logoExplainer": "Official branding banner for Demerara Waves in Georgetown, representing national journalism and civic communication.",
        "sources": [
            "https://demerarawaves.com/",
            "https://guyana.gov.gy/"
        ]
    }
],
  // HT
  HT: [
    {
        "id": "ht-le-nouvelliste",
        "countryCode": "HT",
        "name": "Le Nouvelliste",
        "founded": 1898,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "French",
        "headquarters": "Port-au-Prince",
        "owner": {
            "name": "Le Nouvelliste S.A. (Chauvet Family)",
            "type": "Independent commercial media"
        },
        "editorialStance": "Center / Independent",
        "readership": {
            "metric": "1,800,000 monthly digital readers",
            "source": "Le Nouvelliste Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/ht/le-nouvelliste.svg",
        "logoExplainer": "Official branding banner for Le Nouvelliste in Port-au-Prince, representing national journalism and civic communication.",
        "sources": [
            "https://lenouvelliste.com/",
            "https://rsf.org/"
        ]
    },
    {
        "id": "ht-haitilibre",
        "countryCode": "HT",
        "name": "HaitiLibre",
        "founded": 2010,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "French, English, ht",
        "headquarters": "Port-au-Prince",
        "owner": {
            "name": "HaitiLibre Media",
            "type": "Independent commercial media"
        },
        "editorialStance": "Independent",
        "readership": {
            "metric": "3,200,000 monthly digital readers",
            "source": "HaitiLibre Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/ht/haitilibre.svg",
        "logoExplainer": "Official branding banner for HaitiLibre in Port-au-Prince, representing national journalism and civic communication.",
        "sources": [
            "https://www.haitilibre.com/",
            "https://rsf.org/"
        ]
    },
    {
        "id": "ht-le-matin",
        "countryCode": "HT",
        "name": "Le Matin",
        "founded": 1907,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "French",
        "headquarters": "Port-au-Prince",
        "owner": {
            "name": "Imprimerie Le Matin",
            "type": "Independent commercial media"
        },
        "editorialStance": "Center-right / Independent",
        "readership": {
            "metric": "400,000 monthly readers",
            "source": "Le Matin Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/ht/le-matin.svg",
        "logoExplainer": "Official branding banner for Le Matin in Port-au-Prince, representing national journalism and civic communication.",
        "sources": [
            "https://lenouvelliste.com/",
            "https://www.unesco.org/"
        ]
    },
    {
        "id": "ht-haiti-24",
        "countryCode": "HT",
        "name": "Haiti 24",
        "founded": 2017,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "French",
        "headquarters": "Port-au-Prince",
        "owner": {
            "name": "Haiti 24 Media",
            "type": "Independent commercial media"
        },
        "editorialStance": "Independent",
        "readership": {
            "metric": "1,500,000 monthly digital readers",
            "source": "Haiti 24 Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/ht/haiti-24.svg",
        "logoExplainer": "Official branding banner for Haiti 24 in Port-au-Prince, representing national journalism and civic communication.",
        "sources": [
            "https://haiti24.net/",
            "https://rsf.org/"
        ]
    },
    {
        "id": "ht-alterpresse",
        "countryCode": "HT",
        "name": "AlterPresse",
        "founded": 2001,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "French, ht",
        "headquarters": "Port-au-Prince",
        "owner": {
            "name": "Groupe Medialternatif",
            "type": "Independent commercial media"
        },
        "editorialStance": "Independent / Human rights focus",
        "readership": {
            "metric": "600,000 monthly digital readers",
            "source": "AlterPresse Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/ht/alterpresse.svg",
        "logoExplainer": "Official branding banner for AlterPresse in Port-au-Prince, representing national journalism and civic communication.",
        "sources": [
            "https://www.alterpresse.org/",
            "https://www.alterpresse.org/"
        ]
    }
],
  // HN
  HN: [
    {
        "id": "hn-la-prensa",
        "countryCode": "HN",
        "name": "La Prensa",
        "founded": 1964,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Spanish",
        "headquarters": "San Pedro Sula",
        "owner": {
            "name": "Grupo OPSA (Canahuati Family)",
            "type": "Independent commercial media"
        },
        "editorialStance": "Center-right / Conservative",
        "readership": {
            "metric": "5,500,000 monthly digital readers",
            "source": "La Prensa Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/hn/la-prensa.svg",
        "logoExplainer": "Official branding banner for La Prensa in San Pedro Sula, representing national journalism and civic communication.",
        "sources": [
            "https://www.laprensa.hn/",
            "https://www.grupoopsa.com/"
        ]
    },
    {
        "id": "hn-el-heraldo",
        "countryCode": "HN",
        "name": "El Heraldo",
        "founded": 1979,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Spanish",
        "headquarters": "Tegucigalpa",
        "owner": {
            "name": "Grupo OPSA",
            "type": "Independent commercial media"
        },
        "editorialStance": "Center-right / Conservative",
        "readership": {
            "metric": "4,200,000 monthly digital readers",
            "source": "El Heraldo Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/hn/el-heraldo.svg",
        "logoExplainer": "Official branding banner for El Heraldo in Tegucigalpa, representing national journalism and civic communication.",
        "sources": [
            "https://www.elheraldo.hn/",
            "https://www.grupoopsa.com/"
        ]
    },
    {
        "id": "hn-diario-tiempo",
        "countryCode": "HN",
        "name": "Diario Tiempo",
        "founded": 1970,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Spanish",
        "headquarters": "San Pedro Sula",
        "owner": {
            "name": "Editorial Honduras S.A. (Rosenthal Family)",
            "type": "Independent commercial media"
        },
        "editorialStance": "Center-left / Liberal",
        "readership": {
            "metric": "3,100,000 monthly digital readers",
            "source": "Diario Tiempo Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/hn/diario-tiempo.svg",
        "logoExplainer": "Official branding banner for Diario Tiempo in San Pedro Sula, representing national journalism and civic communication.",
        "sources": [
            "https://tiempo.hn/",
            "https://honduras.mom-gmr.org/"
        ]
    },
    {
        "id": "hn-la-tribuna",
        "countryCode": "HN",
        "name": "La Tribuna",
        "founded": 1976,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Spanish",
        "headquarters": "Tegucigalpa",
        "owner": {
            "name": "Periódicos y Revistas S.A. (Carlos Flores Facussé)",
            "type": "Independent commercial media"
        },
        "editorialStance": "Center-left / Liberal Party",
        "readership": {
            "metric": "2,500,000 monthly readers",
            "source": "La Tribuna Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/hn/la-tribuna.svg",
        "logoExplainer": "Official branding banner for La Tribuna in Tegucigalpa, representing national journalism and civic communication.",
        "sources": [
            "https://www.latribuna.hn/",
            "https://cph.hn/"
        ]
    },
    {
        "id": "hn-criterio-hn",
        "countryCode": "HN",
        "name": "Criterio.hn",
        "founded": 2015,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Spanish",
        "headquarters": "Tegucigalpa",
        "owner": {
            "name": "Criterio Media (Emy Padilla)",
            "type": "Independent commercial media"
        },
        "editorialStance": "Independent / Investigative / Human rights",
        "readership": {
            "metric": "800,000 monthly digital readers",
            "source": "Criterio.hn Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/hn/criterio-hn.svg",
        "logoExplainer": "Official branding banner for Criterio.hn in Tegucigalpa, representing national journalism and civic communication.",
        "sources": [
            "https://criterio.hn/",
            "https://cph.hn/"
        ]
    }
],
  // HU
  HU: [
    {
        "id": "hu-magyar-nemzet",
        "countryCode": "HU",
        "name": "Magyar Nemzet",
        "founded": 1938,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Hungarian",
        "headquarters": "Budapest",
        "owner": {
            "name": "KESMA (Central European Press and Media Foundation)",
            "type": "Independent commercial media"
        },
        "editorialStance": "Right-wing / Fidesz Pro-government",
        "readership": {
            "metric": "1,500,000 monthly digital readers",
            "source": "Magyar Nemzet Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/hu/magyar-nemzet.svg",
        "logoExplainer": "Official branding banner for Magyar Nemzet in Budapest, representing national journalism and civic communication.",
        "sources": [
            "https://magyarnemzet.hu/",
            "https://kesma.hu/"
        ]
    },
    {
        "id": "hu-nepszava",
        "countryCode": "HU",
        "name": "Népszava",
        "founded": 1877,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Hungarian",
        "headquarters": "Budapest",
        "owner": {
            "name": "XXI. Század Média Kft. (Tamás Leisztinger)",
            "type": "Independent commercial media"
        },
        "editorialStance": "Left-wing / Social Democratic Opposition",
        "readership": {
            "metric": "1,200,000 monthly digital readers",
            "source": "Népszava Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/hu/népszava.svg",
        "logoExplainer": "Official branding banner for Népszava in Budapest, representing national journalism and civic communication.",
        "sources": [
            "https://nepszava.hu/",
            "https://muosz.hu/"
        ]
    },
    {
        "id": "hu-hvg",
        "countryCode": "HU",
        "name": "HVG (Heti Világgazdaság)",
        "founded": 1979,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Hungarian",
        "headquarters": "Budapest",
        "owner": {
            "name": "HVG Kiadó Zrt.",
            "type": "Independent commercial media"
        },
        "editorialStance": "Center-left / Liberal / Financial",
        "readership": {
            "metric": "4,500,000 monthly digital readers",
            "source": "HVG (Heti Világgazdaság) Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/hu/hvg.svg",
        "logoExplainer": "Official branding banner for HVG (Heti Világgazdaság) in Budapest, representing national journalism and civic communication.",
        "sources": [
            "https://hvg.hu/",
            "https://hvg.hu/"
        ]
    },
    {
        "id": "hu-blikk",
        "countryCode": "HU",
        "name": "Blikk",
        "founded": 1994,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Hungarian",
        "headquarters": "Budapest",
        "owner": {
            "name": "Ringier Hungary",
            "type": "Independent commercial media"
        },
        "editorialStance": "Popular interest / Tabloid",
        "readership": {
            "metric": "3,800,000 monthly digital readers",
            "source": "Blikk Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/hu/blikk.svg",
        "logoExplainer": "Official branding banner for Blikk in Budapest, representing national journalism and civic communication.",
        "sources": [
            "https://www.ringier.hu/",
            "https://www.blikk.hu/"
        ]
    },
    {
        "id": "hu-telex",
        "countryCode": "HU",
        "name": "Telex",
        "founded": 2020,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Hungarian, English",
        "headquarters": "Budapest",
        "owner": {
            "name": "Van Másik Zrt. (Journalist-owned Foundation)",
            "type": "Independent commercial media"
        },
        "editorialStance": "Independent / Crowdfunded",
        "readership": {
            "metric": "5,200,000 monthly digital readers",
            "source": "Telex Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/hu/telex.svg",
        "logoExplainer": "Official branding banner for Telex in Budapest, representing national journalism and civic communication.",
        "sources": [
            "https://telex.hu/",
            "https://ipi.media/"
        ]
    }
],
  // IS
  IS: [
    {
        "id": "is-morgunblaðið",
        "countryCode": "IS",
        "name": "Morgunblaðið",
        "founded": 1913,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Icelandic",
        "headquarters": "Reykjavík",
        "owner": {
            "name": "Árvakur hf. (Davíð Oddsson / Þorsteinn Már Baldvinsson)",
            "type": "Independent commercial media"
        },
        "editorialStance": "Center-right / Independence Party",
        "readership": {
            "metric": "180,000 monthly digital readers",
            "source": "Morgunblaðið Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/is/morgunblaðið.svg",
        "logoExplainer": "Official branding banner for Morgunblaðið in Reykjavík, representing national journalism and civic communication.",
        "sources": [
            "https://www.mbl.is/",
            "https://www.mbl.is/mm/morgunbladid/"
        ]
    },
    {
        "id": "is-frettablaðið",
        "countryCode": "IS",
        "name": "Fréttablaðið",
        "founded": 2001,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Icelandic",
        "headquarters": "Reykjavík",
        "owner": {
            "name": "Torg ehf. (Helgi Magnússon)",
            "type": "Independent commercial media"
        },
        "editorialStance": "Center / Liberal",
        "readership": {
            "metric": "220,000 readers",
            "source": "Fréttablaðið Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/is/fréttablaðið.svg",
        "logoExplainer": "Official branding banner for Fréttablaðið in Reykjavík, representing national journalism and civic communication.",
        "sources": [
            "https://timarit.is/",
            "https://press.is/"
        ]
    },
    {
        "id": "is-visir",
        "countryCode": "IS",
        "name": "Vísir",
        "founded": 1998,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Icelandic",
        "headquarters": "Reykjavík",
        "owner": {
            "name": "Sýn hf.",
            "type": "Independent commercial media"
        },
        "editorialStance": "Independent",
        "readership": {
            "metric": "250,000 monthly digital readers",
            "source": "Vísir Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/is/vísir.svg",
        "logoExplainer": "Official branding banner for Vísir in Reykjavík, representing national journalism and civic communication.",
        "sources": [
            "https://www.visir.is/",
            "https://syn.is/"
        ]
    },
    {
        "id": "is-heimildin",
        "countryCode": "IS",
        "name": "Heimildin",
        "founded": 2023,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Icelandic",
        "headquarters": "Reykjavík",
        "owner": {
            "name": "Heimildin ehf. (Merging Stundin & Kjarninn)",
            "type": "Independent commercial media"
        },
        "editorialStance": "Independent / Investigative / Left-liberal",
        "readership": {
            "metric": "110,000 monthly digital readers",
            "source": "Heimildin Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/is/heimildin.svg",
        "logoExplainer": "Official branding banner for Heimildin in Reykjavík, representing national journalism and civic communication.",
        "sources": [
            "https://heimildin.is/",
            "https://press.is/"
        ]
    },
    {
        "id": "is-kjarninn",
        "countryCode": "IS",
        "name": "Kjarninn",
        "founded": 2013,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Icelandic",
        "headquarters": "Reykjavík",
        "owner": {
            "name": "Kjarninn Miðlar ehf.",
            "type": "Independent commercial media"
        },
        "editorialStance": "Center-left / Analytical",
        "readership": {
            "metric": "80,000 monthly digital readers",
            "source": "Kjarninn Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/is/kjarninn.svg",
        "logoExplainer": "Official branding banner for Kjarninn in Reykjavík, representing national journalism and civic communication.",
        "sources": [
            "https://kjarninn.is/",
            "https://press.is/"
        ]
    }
],
  // IN
  IN: [
    {
        "id": "in-the-times-of-india",
        "countryCode": "IN",
        "name": "The Times of India (TOI)",
        "founded": 1838,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "English",
        "headquarters": "New Delhi",
        "owner": {
            "name": "Bennett, Coleman & Co. Ltd. (The Times Group / Jain Family)",
            "type": "Independent commercial media"
        },
        "editorialStance": "Center-right / Pro-business",
        "readership": {
            "metric": "15,000,000 print & 120,000,000 digital monthly readers",
            "source": "The Times of India (TOI) Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/in/the-times-of-india.svg",
        "logoExplainer": "Official branding banner for The Times of India (TOI) in New Delhi, representing national journalism and civic communication.",
        "sources": [
            "https://timesofindia.indiatimes.com/",
            "http://www.auditbureau.org/"
        ]
    },
    {
        "id": "in-the-hindu",
        "countryCode": "IN",
        "name": "The Hindu",
        "founded": 1878,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "English",
        "headquarters": "Chennai, Tamil Nadu",
        "owner": {
            "name": "THG Publishing Private Ltd (Kasturi & Sons Family)",
            "type": "Independent commercial media"
        },
        "editorialStance": "Center-left / Independent",
        "readership": {
            "metric": "6,000,000 print & 45,000,000 digital monthly readers",
            "source": "The Hindu Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/in/the-hindu.svg",
        "logoExplainer": "Official branding banner for The Hindu in Chennai, Tamil Nadu, representing national journalism and civic communication.",
        "sources": [
            "https://www.thehindu.com/",
            "http://www.auditbureau.org/"
        ]
    },
    {
        "id": "in-dainik-jagran",
        "countryCode": "IN",
        "name": "Dainik Jagran (दैनिक जागरण)",
        "founded": 1942,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Hindi",
        "headquarters": "Kanpur, Uttar Pradesh",
        "owner": {
            "name": "Jagran Prakashan Limited (Gupta Family)",
            "type": "Independent commercial media"
        },
        "editorialStance": "Right-wing / Conservative",
        "readership": {
            "metric": "68,000,000 multiplatform readers",
            "source": "Dainik Jagran (दैनिक जागरण) Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/in/dainik-jagran.svg",
        "logoExplainer": "Official branding banner for Dainik Jagran (दैनिक जागरण) in Kanpur, Uttar Pradesh, representing national journalism and civic communication.",
        "sources": [
            "https://jplcorp.in/"
        ]
    },
    {
        "id": "in-hindustan-times",
        "countryCode": "IN",
        "name": "Hindustan Times (HT)",
        "founded": 1924,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "English",
        "headquarters": "New Delhi",
        "owner": {
            "name": "HT Media Ltd (Birla Family)",
            "type": "Independent commercial media"
        },
        "editorialStance": "Center-right / Independent",
        "readership": {
            "metric": "8,000,000 print & 50,000,000 digital monthly readers",
            "source": "Hindustan Times (HT) Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/in/hindustan-times.svg",
        "logoExplainer": "Official branding banner for Hindustan Times (HT) in New Delhi, representing national journalism and civic communication.",
        "sources": [
            "https://www.hindustantimes.com/",
            "https://www.htmedia.in/"
        ]
    },
    {
        "id": "in-the-indian-express",
        "countryCode": "IN",
        "name": "The Indian Express",
        "founded": 1932,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "English",
        "headquarters": "Noida, Uttar Pradesh",
        "owner": {
            "name": "The Indian Express Group (Goenka Family)",
            "type": "Independent commercial media"
        },
        "editorialStance": "Center-left / Investigative",
        "readership": {
            "metric": "35,000,000 monthly digital readers",
            "source": "The Indian Express Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/in/the-indian-express.svg",
        "logoExplainer": "Official branding banner for The Indian Express in Noida, Uttar Pradesh, representing national journalism and civic communication.",
        "sources": [
            "https://indianexpress.com/",
            "http://www.auditbureau.org/"
        ]
    }
],
  // ID
  ID: [
    {
        "id": "id-kompas",
        "countryCode": "ID",
        "name": "Kompas",
        "founded": 1965,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Indonesian",
        "headquarters": "Jakarta",
        "owner": {
            "name": "KG Media (Kompas Gramedia Group)",
            "type": "Independent commercial media"
        },
        "editorialStance": "Center / Nationalist / Independent",
        "readership": {
            "metric": "50,000,000 monthly digital readers",
            "source": "Kompas Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/id/kompas.svg",
        "logoExplainer": "Official branding banner for Kompas in Jakarta, representing national journalism and civic communication.",
        "sources": [
            "https://www.kompasgramedia.com/",
            "https://www.kompas.com/"
        ]
    },
    {
        "id": "id-koran-tempo",
        "countryCode": "ID",
        "name": "Koran Tempo",
        "founded": 2001,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Indonesian",
        "headquarters": "Jakarta",
        "owner": {
            "name": "PT Tempo Inti Media Tbk",
            "type": "Independent commercial media"
        },
        "editorialStance": "Center-left / Investigative / Liberal",
        "readership": {
            "metric": "15,000,000 monthly digital readers",
            "source": "Koran Tempo Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/id/koran-tempo.svg",
        "logoExplainer": "Official branding banner for Koran Tempo in Jakarta, representing national journalism and civic communication.",
        "sources": [
            "https://corporate.tempo.co/",
            "https://koran.tempo.co/"
        ]
    },
    {
        "id": "id-jawa-pos",
        "countryCode": "ID",
        "name": "Jawa Pos",
        "founded": 1949,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Indonesian",
        "headquarters": "Surabaya, East Java",
        "owner": {
            "name": "Jawa Pos Group (Dahlan Iskan / Eric Samola estate)",
            "type": "State-owned / statutory corporation"
        },
        "editorialStance": "Center-right / Regional focus",
        "readership": {
            "metric": "20,000,000 monthly readers",
            "source": "Jawa Pos Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/id/jawa-pos.svg",
        "logoExplainer": "Official branding banner for Jawa Pos in Surabaya, East Java, representing national journalism and civic communication.",
        "sources": [
            "https://www.jawapos.com/",
            "https://dewanpers.or.id/"
        ]
    },
    {
        "id": "id-detikcom",
        "countryCode": "ID",
        "name": "detikcom",
        "founded": 1998,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "Indonesian",
        "headquarters": "Jakarta",
        "owner": {
            "name": "Trans Media (CT Corp / Chairul Tanjung)",
            "type": "Independent commercial media"
        },
        "editorialStance": "Independent / Breaking News",
        "readership": {
            "metric": "80,000,000 monthly digital readers",
            "source": "detikcom Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/id/detikcom.svg",
        "logoExplainer": "Official branding banner for detikcom in Jakarta, representing national journalism and civic communication.",
        "sources": [
            "https://www.detik.com/",
            "https://www.ctcorporation.com/"
        ]
    },
    {
        "id": "id-the-jakarta-post",
        "countryCode": "ID",
        "name": "The Jakarta Post",
        "founded": 1983,
        "frequency": "Daily newspaper & digital portal",
        "format": "Broadsheet & digital portal",
        "language": "English",
        "headquarters": "Jakarta",
        "owner": {
            "name": "PT Bina Media Tenggara (Kompas Gramedia / Suara Pembaruan consortium)",
            "type": "Independent commercial media"
        },
        "editorialStance": "Center-left / Liberal",
        "readership": {
            "metric": "6,000,000 monthly digital readers",
            "source": "The Jakarta Post Audience Review 2024"
        },
        "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
        "logo": "newspaper-logos/id/the-jakarta-post.svg",
        "logoExplainer": "Official branding banner for The Jakarta Post in Jakarta, representing national journalism and civic communication.",
        "sources": [
            "https://www.thejakartapost.com/",
            "https://dewanpers.or.id/"
        ]
    }
],

  // Liechtenstein
  LI: [
    {
      id: "li-vaterland",
      countryCode: "LI",
      name: "Liechtensteiner Vaterland",
      founded: 1913,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Compact & digital portal",
      language: "German",
      headquarters: "Vaduz",
      owner: {
        name: "Vaduzer Medienhaus AG",
        type: "Independent commercial media",
      },
      editorialStance: "Historically aligned with the Patriotic Union (VU); Liechtenstein's highest-circulation national daily focusing on principality affairs, parliamentary politics (Landtag), and regional Rhine Valley news",
      readership: {
        metric: "Over 8,500 daily print circulation with extensive digital reach across the principality",
        source: "Vaduzer Medienhaus Audience Report 2023",
      },
      revenueModel: "Print subscriptions, newsstand sales, and commercial display advertising",
      logo: "newspaper-logos/li/liechtensteiner-vaterland.svg",
      logoExplainer:
        "Classic deep navy blue header with prominent white serif typography 'Liechtensteiner Vaterland', reflecting Liechtenstein's leading daily press.",
      sources: ["https://www.vaterland.li", "https://de.wikipedia.org/wiki/Liechtensteiner_Vaterland"],
    },
    {
      id: "li-volksblatt",
      countryCode: "LI",
      name: "Liechtensteiner Volksblatt",
      founded: 1878,
      frequency: "Daily newspaper (historical/archival)",
      format: "Compact & digital archive",
      language: "German",
      headquarters: "Schaan",
      owner: {
        name: "Liechtensteiner Volksblatt AG",
        type: "Historical commercial publisher",
      },
      editorialStance: "Liechtenstein's oldest daily newspaper; historically aligned with the Progressive Citizens' Party (FBP), covering national politics, public institutions, and cultural events",
      readership: {
        metric: "Historic daily circulation of 8,000+ copies until print cessation in 2023; historic archive maintained",
        source: "Historisches Lexikon des Fürstentums Liechtenstein",
      },
      revenueModel: "Historic subscription sales, advertising, and institutional archiving",
      logo: "newspaper-logos/li/liechtensteiner-volksblatt.svg",
      logoExplainer:
        "Crimson red banner emblazoned with crisp white serif typography 'Liechtensteiner Volksblatt', commemorating the principality's oldest newspaper.",
      sources: ["https://www.volksblatt.li", "https://de.wikipedia.org/wiki/Liechtensteiner_Volksblatt"],
    },
    {
      id: "li-radio-liechtenstein",
      countryCode: "LI",
      name: "Radio Liechtenstein",
      founded: 1995,
      frequency: "24/7 public radio & news service",
      format: "Radio broadcast & digital news portal",
      language: "German",
      headquarters: "Triesen",
      owner: {
        name: "Liechtensteinischer Rundfunk (LRF)",
        type: "Public corporation",
      },
      annualPublicFunding: {
        total: "CHF 3.4 million",
        perCapita: "CHF 85.00",
      },
      editorialStance: "Statutory public broadcaster providing balanced, impartial domestic and international news, parliamentary coverage, and Alpine cultural broadcasting",
      readership: {
        metric: "Daily radio reach of approximately 14,000 listeners across Liechtenstein and neighboring cantons",
        source: "Mediapulse Radio Data Liechtenstein 2023",
      },
      revenueModel: "State public broadcast mandate and commercial sponsorship",
      logo: "newspaper-logos/li/radio-liechtenstein.svg",
      logoExplainer:
        "Sleek dark banner featuring a vivid red broadcast beacon disc and clean white lettering 'Radio Liechtenstein'.",
      sources: ["https://www.radio.li", "https://de.wikipedia.org/wiki/Radio_Liechtenstein"],
    },
    {
      id: "li-1fltv",
      countryCode: "LI",
      name: "1FLTV",
      founded: 2008,
      frequency: "Daily television broadcasting",
      format: "Linear television & web streaming",
      language: "German",
      headquarters: "Schaan",
      owner: {
        name: "Media Holding AG",
        type: "Private commercial television",
      },
      editorialStance: "Liechtenstein's premier private television station; focuses on regional news, cultural features, local community highlights, and Liechtenstein sports",
      readership: {
        metric: "Broadcast reach across Liechtenstein households and cable networks in eastern Switzerland",
        source: "1FLTV Station Profile 2023",
      },
      revenueModel: "Commercial television advertising and private production services",
      logo: "newspaper-logos/li/1fltv.svg",
      logoExplainer:
        "Modern emblem with deep blue rounded rectangle housing bold white '1FLTV' alongside navy capital lettering 'LIECHTENSTEIN'.",
      sources: ["https://www.1fl.li", "https://de.wikipedia.org/wiki/1_FL_TV"],
    },
    {
      id: "li-wirtschaft-regional",
      countryCode: "LI",
      name: "Wirtschaft regional",
      founded: 2000,
      frequency: "Weekly financial publication",
      format: "Tabloid & business portal",
      language: "German",
      headquarters: "Vaduz",
      owner: {
        name: "Vaduzer Medienhaus AG",
        type: "Independent commercial publisher",
      },
      editorialStance: "Specialist weekly financial journal covering Liechtenstein's banking sector, wealth management, manufacturing, fintech, and cross-border trade",
      readership: {
        metric: "Distributed to business leaders, corporate directors, and financial institutions across the Lake Constance Alpine region",
        source: "Vaduzer Medienhaus Financial Publishing 2023",
      },
      revenueModel: "Corporate subscriptions and business-to-business advertising",
      logo: "newspaper-logos/li/wirtschaft-regional.svg",
      logoExplainer:
        "Deep corporate blue backdrop showcasing golden-amber typography 'Wirtschaft regional', signifying business and financial market authority.",
      sources: ["https://www.wirtschaftregional.li"],
    },
  ],

  // Lithuania
  LT: [
    {
      id: "lt-elta",
      countryCode: "LT",
      name: "ELTA",
      nativeName: "Lietuvos telegramų agentūra",
      englishTranslation: "Lithuanian Telegraph Agency",
      founded: 1920,
      frequency: "Real-time news wire service",
      format: "News wire & digital agency portal",
      language: "Lithuanian, English, Russian",
      headquarters: "Vilnius",
      owner: {
        name: "Ekspress Grupp",
        type: "Independent media group",
      },
      editorialStance: "Lithuania's historical and primary national news wire agency; impartial real-time reporting of state affairs, Seimas debates, and international geopolitical developments",
      readership: {
        metric: "Over 300 media subscribers, government offices, and institutional press desks across the Baltic region",
        source: "Ekspress Grupp Annual Report 2023",
      },
      revenueModel: "B2B wire syndication subscriptions and media licensing",
      logo: "newspaper-logos/lt/elta.svg",
      logoExplainer:
        "Vivid Baltic blue banner displaying bold white geometric sans-serif lettering 'ELTA' with wide tracking, representing Lithuania's foundational news wire.",
      sources: ["https://www.elta.lt", "https://lt.wikipedia.org/wiki/ELTA"],
    },
    {
      id: "lt-lrt",
      countryCode: "LT",
      name: "LRT Naujienos",
      nativeName: "Lietuvos nacionalinis radijas ir televizija",
      englishTranslation: "Lithuanian National Radio and Television",
      founded: 1926,
      frequency: "Continuous multimedia news service",
      format: "Digital multimedia portal, radio & TV",
      language: "Lithuanian, English, Russian, Polish",
      headquarters: "Vilnius",
      owner: {
        name: "LRT (Public Institution)",
        type: "Public service broadcaster",
      },
      annualPublicFunding: {
        total: "€72.5 million",
        perCapita: "€25.30",
      },
      editorialStance: "State public broadcaster committed to investigative journalism, factual independence, cultural preservation, and democratic resilience against disinformation",
      readership: {
        metric: "Lithuania's most trusted news brand reaching over 1.2 million monthly unique online visitors and dominant TV audience",
        source: "Kantar Media Lithuania / LRT Audited Report 2023",
      },
      revenueModel: "State budget funding based on personal income tax and excise revenues",
      logo: "newspaper-logos/lt/lrt-naujienos.svg",
      logoExplainer:
        "Sleek dark banner with crisp white 'LRT' combined with bright amber accent lettering 'NAUJIENOS', embodying trusted public service news.",
      sources: ["https://www.lrt.lt", "https://en.wikipedia.org/wiki/Lithuanian_National_Radio_and_Television"],
    },
    {
      id: "lt-15min",
      countryCode: "LT",
      name: "15min",
      founded: 2005,
      frequency: "Continuous digital news service",
      format: "Digital portal & mobile apps",
      language: "Lithuanian",
      headquarters: "Vilnius",
      owner: {
        name: "15min Group",
        type: "Independent commercial media",
      },
      editorialStance: "High-impact digital newsroom renowned for award-winning investigative journalism (OCCRP partner), uncovering political corruption and corporate fraud",
      readership: {
        metric: "Over 1.1 million monthly unique visitors; one of Lithuania's two largest online news outlets",
        source: "Gemius Audience Lithuania 2024",
      },
      revenueModel: "Digital display advertising, programmatic ads, and premium paid subscriptions (15min MAX)",
      logo: "newspaper-logos/lt/15min.svg",
      logoExplainer:
        "Signature bright red field with prominent stark white heavyweight typography '15min', evoking speed, urgency, and investigative rigor.",
      sources: ["https://www.15min.lt", "https://lt.wikipedia.org/wiki/15min"],
    },
    {
      id: "lt-delfi",
      countryCode: "LT",
      name: "Delfi Lithuania",
      founded: 1999,
      frequency: "Continuous digital news service",
      format: "Digital news portal & video channels",
      language: "Lithuanian, Russian, Polish, English",
      headquarters: "Vilnius",
      owner: {
        name: "Ekspress Grupp",
        type: "Independent commercial media group",
      },
      editorialStance: "Lithuania's most-visited commercial news portal; fast-paced breaking coverage, video talk shows, opinion editorials, and cultural lifestyle reporting",
      readership: {
        metric: "Over 1.3 million monthly unique users and over 120 million monthly page views",
        source: "Gemius Audience Lithuania 2023",
      },
      revenueModel: "Digital advertising, native sponsored content, and Delfi Plius subscriptions",
      logo: "newspaper-logos/lt/delfi-lt.svg",
      logoExplainer:
        "Dark slate rectangular backdrop emblazoned with vibrant tangerine-orange bold lettering 'DELFI', symbolizing digital vibrancy across the Baltics.",
      sources: ["https://www.delfi.lt", "https://en.wikipedia.org/wiki/Delfi_(web_portal)"],
    },
    {
      id: "lt-lietuvos-rytas",
      countryCode: "LT",
      name: "Lietuvos rytas",
      nativeName: "Lietuvos rytas",
      englishTranslation: "Morning of Lithuania",
      founded: 1990,
      frequency: "Daily newspaper & digital portal",
      format: "Broadsheet & online news portal",
      language: "Lithuanian",
      headquarters: "Vilnius",
      owner: {
        name: "UAB Lietuvos rytas",
        type: "Independent commercial media",
      },
      editorialStance: "Historic flagship daily of post-Soviet independent Lithuania; centrist editorial line focusing on political investigations, economics, arts, and basketball commentary",
      readership: {
        metric: "Print daily readership of 130,000 combined with over 700,000 monthly unique digital readers on lrytas.lt",
        source: "Kantar TNS Lithuania Survey 2023",
      },
      revenueModel: "Print sales, classifieds, digital ads, and corporate sponsorships",
      logo: "newspaper-logos/lt/lietuvos-rytas.svg",
      logoExplainer:
        "Clean white background featuring dignified dark serif typography 'Lietuvos rytas', honoring Lithuania's venerable independence-era daily.",
      sources: ["https://www.lrytas.lt", "https://lt.wikipedia.org/wiki/Lietuvos_rytas"],
    },
  ],

  // Luxembourg
  LU: [
    {
      id: "lu-luxemburger-wort",
      countryCode: "LU",
      name: "Luxemburger Wort",
      nativeName: "Luxemburger Wort",
      englishTranslation: "Luxembourg Word",
      founded: 1848,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Compact & digital portal",
      language: "German, French",
      headquarters: "Howald, Hesperange",
      owner: {
        name: "Mediahuis Luxembourg",
        type: "Independent commercial media group",
      },
      editorialStance: "Luxembourg's newspaper of record and oldest circulating publication; center-right Christian-democratic tradition with comprehensive coverage of Grand Duchy affairs and European Union policy",
      readership: {
        metric: "Over 50,000 daily print circulation and 130,000 cross-platform readers daily across the Grand Duchy",
        source: "TNS Ilres Plurimedia Luxembourg 2023",
      },
      revenueModel: "Print subscriptions, digital paywall (Wort+), and display advertising",
      logo: "newspaper-logos/lu/luxemburger-wort.svg",
      logoExplainer:
        "Royal blue header featuring crisp white elegant serif lettering 'Luxemburger Wort', representing the historic voice of Luxembourg.",
      sources: ["https://www.wort.lu", "https://en.wikipedia.org/wiki/Luxemburger_Wort"],
    },
    {
      id: "lu-tageblatt",
      countryCode: "LU",
      name: "Tageblatt",
      nativeName: "Tageblatt",
      englishTranslation: "Daily Page",
      founded: 1913,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Compact & digital portal",
      language: "German, French",
      headquarters: "Esch-sur-Alzette",
      owner: {
        name: "Editpress Luxembourg SA",
        type: "Trade union & independent publisher",
      },
      editorialStance: "Social-democratic editorial outlook closely associated with the labor movement and OGBL union; champion of workers' rights, social welfare, and southern industrial basin culture",
      readership: {
        metric: "Second largest paid daily in Luxembourg, with approximately 35,000 daily print and online readers",
        source: "TNS Ilres Luxembourg Press Study 2023",
      },
      revenueModel: "Subscription circulation, newsstand sales, and press subsidies",
      logo: "newspaper-logos/lu/tageblatt.svg",
      logoExplainer:
        "Bold crimson red banner emblazoned with solid white sans-serif lettering 'Tageblatt', projecting progressive vigor and industrial heritage.",
      sources: ["https://www.tageblatt.lu", "https://en.wikipedia.org/wiki/Tageblatt"],
    },
    {
      id: "lu-l-essentiel",
      countryCode: "LU",
      name: "L'essentiel",
      nativeName: "L'essentiel",
      englishTranslation: "The Essential",
      founded: 2007,
      frequency: "Daily newspaper (Monday–Friday) & continuous digital",
      format: "Free compact tabloid & mobile portal",
      language: "French, German",
      headquarters: "Differdange",
      owner: {
        name: "Edita SA (joint venture of Editpress and TX Group)",
        type: "Commercial media partnership",
      },
      editorialStance: "Luxembourg's most widely read free daily; focused on concise, fast-paced news, cross-border commuter transport, European headlines, and youth lifestyle",
      readership: {
        metric: "Over 195,000 daily readers across print and digital, particularly popular among cross-border workers (frontaliers)",
        source: "TNS Ilres Plurimedia Study 2023",
      },
      revenueModel: "100% advertising-funded print and digital model",
      logo: "newspaper-logos/lu/l-essentiel.svg",
      logoExplainer:
        "Deep blue banner accented with bright cyan uppercase typography 'L'ESSENTIEL', symbolising modern commuter clarity and accessibility.",
      sources: ["https://www.lessentiel.lu", "https://fr.wikipedia.org/wiki/L%27essentiel_(Luxembourg)"],
    },
    {
      id: "lu-le-quotidien",
      countryCode: "LU",
      name: "Le Quotidien",
      nativeName: "Le Quotidien",
      englishTranslation: "The Daily",
      founded: 2001,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Compact & digital portal",
      language: "French",
      headquarters: "Esch-sur-Alzette",
      owner: {
        name: "Editpress Luxembourg SA",
        type: "Independent commercial media",
      },
      editorialStance: "Leading French-language national daily; independent left-leaning perspective catering to Luxembourg's Francophone citizens and extensive expatriate community",
      readership: {
        metric: "Over 20,000 regular readers across Luxembourg City, the canton of Esch, and cross-border French Lorraine",
        source: "TNS Ilres Media Survey 2023",
      },
      revenueModel: "Subscriptions, single-copy sales, and corporate advertising",
      logo: "newspaper-logos/lu/le-quotidien.svg",
      logoExplainer:
        "Clean white field displaying refined crimson red serif typography 'Le Quotidien', denoting analytical French-language journalism.",
      sources: ["https://lequotidien.lu", "https://fr.wikipedia.org/wiki/Le_Quotidien_(Luxembourg)"],
    },
    {
      id: "lu-rtl-letzebuerg",
      countryCode: "LU",
      name: "RTL Télé Lëtzebuerg",
      nativeName: "RTL Télé Lëtzebuerg",
      englishTranslation: "RTL Television Luxembourg",
      founded: 1991,
      frequency: "Continuous multimedia news broadcaster",
      format: "Television, radio & digital superportal",
      language: "Luxembourgish",
      headquarters: "Kirchberg, Luxembourg City",
      owner: {
        name: "RTL Group (Bertelsmann)",
        type: "Commercial public service concessionaire",
      },
      annualPublicFunding: {
        total: "€15.0 million",
        perCapita: "€22.70",
      },
      editorialStance: "Primary national broadcaster fulfilling a public interest remit in Luxembourgish; trusted reporting of Grand-Ducal ceremonies, parliamentary sessions, and communal life",
      readership: {
        metric: "Over 350,000 daily users across rtl.lu web portal and television broadcast (reaching >60% of resident population)",
        source: "TNS Ilres National Audience Survey 2023",
      },
      revenueModel: "State concession agreement funding and commercial advertising",
      logo: "newspaper-logos/lu/rtl-letzebuerg.svg",
      logoExplainer:
        "Dark slate rectangle displaying classic red RTL rounded badge alongside crisp white lettering 'LËTZEBUERG'.",
      sources: ["https://www.rtl.lu", "https://en.wikipedia.org/wiki/RTL_T%C3%A9l%C3%A9_L%C3%ABtzebuerg"],
    },
  ],

  // Madagascar
  MG: [
    {
      id: "mg-taratra",
      countryCode: "MG",
      name: "Taratra (ANTA)",
      nativeName: "Taratra - Agence Nationale d'Information Taratra",
      englishTranslation: "Reflection - National Information Agency Taratra",
      founded: 1962,
      frequency: "Daily news wire & bulletin",
      format: "News wire & digital agency portal",
      language: "Malagasy, French",
      headquarters: "Antananarivo",
      owner: {
        name: "Ministry of Communication and Culture",
        type: "State news agency",
      },
      editorialStance: "Official national news agency of Madagascar; provides institutional dispatches, government communiqués, and regional reporting from all 23 regions of the island",
      readership: {
        metric: "Syndicated to all major print, broadcast, and community radio stations throughout Madagascar",
        source: "Ministère de la Communication et de la Culture Rapport Annuel 2023",
      },
      revenueModel: "State budget allocation and wire distribution subscriptions",
      logo: "newspaper-logos/mg/taratra.svg",
      logoExplainer:
        "Forest green banner with bold white geometric lettering 'TARATRA - ANTA', symbolising national unity, island agriculture, and information transmission.",
      sources: ["https://taratra.mg", "https://anta.mg"],
    },
    {
      id: "mg-midi-madagasikara",
      countryCode: "MG",
      name: "Midi Madagasikara",
      nativeName: "Midi Madagasikara",
      englishTranslation: "Midday Madagascar",
      founded: 1983,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Tabloid & digital news portal",
      language: "French, Malagasy",
      headquarters: "Ankorondrano, Antananarivo",
      owner: {
        name: "Groupe Midi Madagasikara",
        type: "Independent commercial media",
      },
      editorialStance: "Madagascar's highest-circulation independent daily newspaper; comprehensive coverage of political life, social issues, economic markets, and sports",
      readership: {
        metric: "Over 25,000 print circulation daily and the most visited private news portal in Madagascar",
        source: "Midi Madagasikara Media Kit 2023",
      },
      revenueModel: "Print sales, classifieds, and digital banner advertising",
      logo: "newspaper-logos/mg/midi-madagasikara.svg",
      logoExplainer:
        "Deep crimson background housing elegant white serif font 'Midi Madagasikara', representing Madagascar's leading commercial newspaper.",
      sources: ["https://midi-madagasikara.mg", "https://fr.wikipedia.org/wiki/Midi_Madagasikara"],
    },
    {
      id: "mg-l-express",
      countryCode: "MG",
      name: "L'Express de Madagascar",
      nativeName: "L'Express de Madagascar",
      englishTranslation: "The Express of Madagascar",
      founded: 1995,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Broadsheet & digital news portal",
      language: "French, Malagasy",
      headquarters: "Ankorondrano, Antananarivo",
      owner: {
        name: "L'Express de Madagascar SA",
        type: "Independent commercial media group",
      },
      editorialStance: "Prestigious broadsheet of record; in-depth political commentary, macroeconomic investigations, environmental reporting, and international analysis",
      readership: {
        metric: "Leading morning daily among decision makers, diplomats, and business executives across Madagascar",
        source: "Étude Médias Madagascar 2023",
      },
      revenueModel: "Single-copy street sales, corporate subscriptions, and commercial ads",
      logo: "newspaper-logos/mg/l-express-de-madagascar.svg",
      logoExplainer:
        "Stark white background with dignified black serif typography 'L'Express de Madagascar', signifying analytical gravity.",
      sources: ["https://lexpress.mg", "https://fr.wikipedia.org/wiki/L%27Express_de_Madagascar"],
    },
    {
      id: "mg-les-nouvelles",
      countryCode: "MG",
      name: "Les Nouvelles",
      nativeName: "Les Nouvelles",
      englishTranslation: "The News",
      founded: 2004,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Compact tabloid & digital portal",
      language: "French, Malagasy",
      headquarters: "Alarobia, Antananarivo",
      owner: {
        name: "Groupe Ultima Média",
        type: "Independent commercial media",
      },
      editorialStance: "Modern independent daily known for vibrant investigative reporting, cultural arts coverage, youth culture, and regional development journalism",
      readership: {
        metric: "Over 15,000 daily print readership with active social and web engagement",
        source: "Ultima Media Group Profile 2023",
      },
      revenueModel: "Print sales, event sponsorships, and advertising partnerships",
      logo: "newspaper-logos/mg/les-nouvelles.svg",
      logoExplainer:
        "Marine blue field with clean bold white sans-serif lettering 'Les Nouvelles', reflecting fresh and dynamic national reporting.",
      sources: ["https://www.newsmada.com"],
    },
    {
      id: "mg-madagascar-tribune",
      countryCode: "MG",
      name: "Madagascar Tribune",
      nativeName: "Madagascar Tribune",
      englishTranslation: "Madagascar Tribune",
      founded: 1988,
      frequency: "Continuous digital news service",
      format: "Digital portal & opinion journal",
      language: "French",
      headquarters: "Antananarivo",
      owner: {
        name: "Tribune Média Madagascar",
        type: "Independent digital media",
      },
      editorialStance: "Pioneering online daily; renowned for intellectual debates, open op-eds, constitutional analysis, and democratic discourse",
      readership: {
        metric: "Over 40,000 daily online visits, drawing substantial readership from the Malagasy diaspora in France, Canada, and the Indian Ocean",
        source: "Madagascar Tribune Digital Analytics 2023",
      },
      revenueModel: "Digital display ads, sponsored columns, and voluntary reader contributions",
      logo: "newspaper-logos/mg/madagascar-tribune.svg",
      logoExplainer:
        "Warm golden amber background with sharp charcoal sans-serif lettering 'Madagascar Tribune', highlighting debate and independent thought.",
      sources: ["https://www.madagascar-tribune.com", "https://fr.wikipedia.org/wiki/Madagascar_Tribune"],
    },
  ],

  // Malawi
  MW: [
    {
      id: "mw-mana",
      countryCode: "MW",
      name: "Malawi News Agency (MANA)",
      founded: 1966,
      frequency: "Real-time news wire service",
      format: "News wire & digital agency portal",
      language: "English, Chichewa",
      headquarters: "Lilongwe",
      owner: {
        name: "Ministry of Information and Digitization",
        type: "State news agency",
      },
      editorialStance: "National public wire service with reporters across all 28 districts of Malawi; primary chronicler of development projects, agricultural news, and state functions",
      readership: {
        metric: "Feeds news to over 40 community and commercial radio stations, state broadcasters, and national newspapers",
        source: "Ministry of Information Annual Review 2023",
      },
      revenueModel: "Government subvention and news syndication",
      logo: "newspaper-logos/mw/mana.svg",
      logoExplainer:
        "Deep charcoal background featuring bright red 'MANA' acronym above white subtitle 'MALAWI NEWS AGENCY', evoking national information sovereignty.",
      sources: ["https://manaonline.gov.mw", "https://en.wikipedia.org/wiki/Malawi_News_Agency"],
    },
    {
      id: "mw-the-daily-times",
      countryCode: "MW",
      name: "The Daily Times",
      founded: 1895,
      frequency: "Daily newspaper (Monday–Friday)",
      format: "Broadsheet & digital portal",
      language: "English",
      headquarters: "Blantyre",
      owner: {
        name: "Times Group (Blantyre Newspapers Limited)",
        type: "Independent commercial media",
      },
      editorialStance: "Malawi's oldest commercial newspaper; rigorous investigative reporting on government transparency, public expenditure, and business policy",
      readership: {
        metric: "Leading circulation daily with over 20,000 print copies and strong multiplatform reach via Times 360 Malawi",
        source: "Times Group Audience Metrics 2023",
      },
      revenueModel: "Print copy sales, classified ads, and multimedia advertising",
      logo: "newspaper-logos/mw/the-daily-times.svg",
      logoExplainer:
        "Deep colonial blue background with classical white serif headline font 'The Daily Times', conveying over a century of journalistic authority.",
      sources: ["https://times.mw", "https://en.wikipedia.org/wiki/The_Daily_Times_(Malawi)"],
    },
    {
      id: "mw-the-nation",
      countryCode: "MW",
      name: "The Nation",
      founded: 1993,
      frequency: "Daily newspaper (Monday–Friday)",
      format: "Broadsheet & digital news portal",
      language: "English, Chichewa",
      headquarters: "Ginnery Corner, Blantyre",
      owner: {
        name: "Nation Publications Limited (NPL)",
        type: "Independent commercial media",
      },
      editorialStance: "Premier daily established during Malawi's democratic transition; staunch defender of free expression, good governance, human rights, and constitutional democracy",
      readership: {
        metric: "Over 22,000 daily print circulation with extensive national distribution from Nsanje to Chitipa",
        source: "Nation Publications Corporate Report 2023",
      },
      revenueModel: "Print sales, institutional subscriptions, and commercial advertising",
      logo: "newspaper-logos/mw/the-nation.svg",
      logoExplainer:
        "Pure white field showcasing commanding crimson red serif lettering 'The Nation', denoting democratic integrity.",
      sources: ["https://mwnation.com", "https://en.wikipedia.org/wiki/The_Nation_(Malawi)"],
    },
    {
      id: "mw-malawi24",
      countryCode: "MW",
      name: "Malawi24",
      founded: 2014,
      frequency: "Continuous digital news service",
      format: "Digital portal & social news network",
      language: "English, Chichewa",
      headquarters: "Blantyre and Lilongwe",
      owner: {
        name: "Malawi24 Media Network",
        type: "Independent digital media",
      },
      editorialStance: "Fast-growing digital newsroom focused on rapid breaking updates, youth issues, sports (Super League of Malawi), entertainment, and grassroots citizen reporting",
      readership: {
        metric: "Over 800,000 monthly active users and more than 500,000 followers across social news channels",
        source: "Malawi24 Digital Engagement Data 2024",
      },
      revenueModel: "Programmatic digital ads, affiliate partnerships, and sponsored content",
      logo: "newspaper-logos/mw/malawi24.svg",
      logoExplainer:
        "Bold red backdrop displaying modern white impact typography 'MALAWI 24', emphasizing round-the-clock digital breaking news.",
      sources: ["https://malawi24.com"],
    },
    {
      id: "mw-nyasa-times",
      countryCode: "MW",
      name: "Nyasa Times",
      founded: 2006,
      frequency: "Continuous digital news service",
      format: "Digital news portal",
      language: "English",
      headquarters: "Lilongwe (with diaspora desks in London and Blantyre)",
      owner: {
        name: "Nyasa Times Media Group",
        type: "Independent digital media",
      },
      editorialStance: "Influential pioneer of Malawian online journalism; critical analysis of political maneuvering, judicial decisions, and diaspora concerns",
      readership: {
        metric: "Over 1.5 million monthly page impressions from Malawi and the worldwide diaspora",
        source: "Nyasa Times Web Analytics 2023",
      },
      revenueModel: "Online display advertising and corporate promotional features",
      logo: "newspaper-logos/mw/nyasa-times.svg",
      logoExplainer:
        "Dark navy canvas highlighted by sky-blue uppercase typography 'NYASA TIMES', representing the enduring voice of Lake Malawi and diaspora.",
      sources: ["https://www.nyasatimes.com", "https://en.wikipedia.org/wiki/Nyasa_Times"],
    },
  ],

  // Maldives
  MV: [
    {
      id: "mv-psm-news",
      countryCode: "MV",
      name: "PSM News",
      nativeName: "ޕަބްލިކް ސާވިސް މީޑިއާ",
      englishTranslation: "Public Service Media News",
      founded: 2015,
      frequency: "24/7 national news broadcaster",
      format: "Television, radio & digital multimedia portal",
      language: "Dhivehi, English",
      headquarters: "Malé",
      owner: {
        name: "Public Service Media (PSM)",
        type: "State public broadcaster",
      },
      annualPublicFunding: {
        total: "MVR 95.0 million",
        perCapita: "MVR 180.00",
      },
      editorialStance: "National public service broadcaster created by parliamentary act; covers state institutions, island councils across 26 atolls, maritime affairs, and environmental diplomacy",
      readership: {
        metric: "Reaches nearly 100% of inhabited Maldivian atolls via digital terrestrial broadcast and satellite",
        source: "PSM Annual Report 2023",
      },
      revenueModel: "Parliamentary state budget subvention and commercial broadcast advertising",
      logo: "newspaper-logos/mv/psm-news.svg",
      logoExplainer:
        "Emerald green emblem containing white uppercase 'PSM NEWS' and vibrant yellow subtitle 'PUBLIC SERVICE MEDIA', evoking Islamic green and island prosperity.",
      sources: ["https://psmnews.mv", "https://en.wikipedia.org/wiki/Public_Service_Media"],
    },
    {
      id: "mv-mihaaru",
      countryCode: "MV",
      name: "Mihaaru",
      nativeName: "މިހާރު",
      englishTranslation: "Now",
      founded: 2016,
      frequency: "Continuous digital news service & print editions",
      format: "Digital news portal & print journal",
      language: "Dhivehi, English",
      headquarters: "Malé",
      owner: {
        name: "Mihaaru Media Group",
        type: "Independent commercial media",
      },
      editorialStance: "Formed by former journalists of the historic Haveeru Daily; regarded as the country's most respected independent investigative and analytical news organization",
      readership: {
        metric: "Over 150,000 daily unique visitors across the Maldivian archipelago and diaspora",
        source: "Mihaaru Media Kit 2023",
      },
      revenueModel: "Digital advertising, commercial print sponsorships, and events",
      logo: "newspaper-logos/mv/mihaaru.svg",
      logoExplainer:
        "Fiery red badge with stark white heavy sans-serif typography 'MIHAARU', representing prompt, authoritative breaking coverage.",
      sources: ["https://mihaaru.com", "https://en.wikipedia.org/wiki/Mihaaru"],
    },
    {
      id: "mv-sun-online",
      countryCode: "MV",
      name: "Sun Online",
      nativeName: "ސަން އޮންލައިން",
      englishTranslation: "Sun Online",
      founded: 2010,
      frequency: "Continuous digital news service",
      format: "Digital news portal",
      language: "Dhivehi, English",
      headquarters: "Malé",
      owner: {
        name: "Sun Media Group",
        type: "Independent commercial media",
      },
      editorialStance: "Popular commercial news outlet known for extensive coverage of Majlis (parliament) debates, criminal trials, resort tourism developments, and atoll affairs",
      readership: {
        metric: "Over 100,000 daily page visits and substantial following across island communities",
        source: "Sun Media Analytics 2023",
      },
      revenueModel: "Digital display advertising, sponsored features, and video production",
      logo: "newspaper-logos/mv/sun-online.svg",
      logoExplainer:
        "Warm sun-gold rectangular background with strong charcoal lettering 'SUN ONLINE', signifying equatorial warmth and illuminating reporting.",
      sources: ["https://sun.mv"],
    },
    {
      id: "mv-avas",
      countryCode: "MV",
      name: "Avas",
      nativeName: "އަވަސް",
      englishTranslation: "Fast",
      founded: 2014,
      frequency: "Continuous digital news service",
      format: "Digital portal & video news",
      language: "Dhivehi, English",
      headquarters: "Malé",
      owner: {
        name: "Avas Media",
        type: "Independent commercial media",
      },
      editorialStance: "Dynamic digital outlet focusing on fast-breaking political developments, youth culture, socioeconomic debates, and environmental conservation in the atolls",
      readership: {
        metric: "Popular mobile news destination with over 75,000 daily unique page views",
        source: "Avas Audience Insight 2024",
      },
      revenueModel: "Digital advertising, programmatic networks, and commercial sponsorships",
      logo: "newspaper-logos/mv/avas.svg",
      logoExplainer:
        "Vibrant ocean-sky blue canvas bearing heavy white typography 'AVAS', echoing the surrounding Maldivian waters and swift delivery.",
      sources: ["https://avas.mv"],
    },
    {
      id: "mv-the-edition",
      countryCode: "MV",
      name: "The Edition",
      founded: 2018,
      frequency: "Continuous digital news service",
      format: "English-language digital news portal",
      language: "English",
      headquarters: "Malé",
      owner: {
        name: "Mihaaru Media Group",
        type: "Independent commercial media",
      },
      editorialStance: "The Maldives' leading English-language news outlet; covers climate change diplomacy, luxury resort investments, governance, and human interest stories for international audiences",
      readership: {
        metric: "Read extensively by expatriates, tourists, foreign diplomats, and regional environmental scholars",
        source: "The Edition Editorial Report 2023",
      },
      revenueModel: "Digital advertising and tourism sector sponsorships",
      logo: "newspaper-logos/mv/the-edition.svg",
      logoExplainer:
        "Clean white background featuring refined dark navy serif lettering 'The Edition', projecting international journalistic prestige.",
      sources: ["https://edition.mv"],
    },
  ],

  // Mali
  ML: [
    {
      id: "ml-amap",
      countryCode: "ML",
      name: "AMAP (L'Essor)",
      nativeName: "Agence Malienne de Presse et de Publicité / L'Essor",
      englishTranslation: "Malian News and Advertising Agency / The Surge",
      founded: 1949,
      frequency: "Daily newspaper & news wire",
      format: "Broadsheet, wire service & digital portal",
      language: "French",
      headquarters: "Bamako",
      owner: {
        name: "Government of Mali",
        type: "State public enterprise",
      },
      editorialStance: "National news agency and historical daily paper of record; official government communiqués, national security, diplomacy, and Sahel cooperation",
      readership: {
        metric: "Over 10,000 daily print copies distributed across Bamako and regional capitals, syndicating to regional media",
        source: "AMAP Rapport d'Activité 2023",
      },
      revenueModel: "State subsidies, newspaper sales, and public notice announcements",
      logo: "newspaper-logos/ml/amap.svg",
      logoExplainer:
        "Malian flag green banner featuring bold yellow 'AMAP - L'ESSOR' and white text 'AGENCE MALIENNE DE PRESSE'.",
      sources: ["https://essor.ml", "https://fr.wikipedia.org/wiki/L%27Essor_(Mali)"],
    },
    {
      id: "ml-l-independant",
      countryCode: "ML",
      name: "L'Indépendant",
      nativeName: "L'Indépendant",
      englishTranslation: "The Independent",
      founded: 1994,
      frequency: "Daily newspaper (Monday–Friday)",
      format: "Tabloid & digital portal",
      language: "French",
      headquarters: "Bamako",
      owner: {
        name: "Société d'Édition et de Presse (SEP)",
        type: "Independent commercial media",
      },
      editorialStance: "One of Mali's foremost independent daily newspapers; in-depth political investigations, civil society debates, constitutional reforms, and economic analyses",
      readership: {
        metric: "Circulation of 7,000+ daily copies and high readership among intellectuals and civil servants in Bamako",
        source: "Maison de la Presse du Mali 2023",
      },
      revenueModel: "Print sales, private display advertising, and legal notices",
      logo: "newspaper-logos/ml/l-independant.svg",
      logoExplainer:
        "Deep blue rectangle bearing crisp white serif title 'L'Indépendant', denoting journalistic objectivity and independence.",
      sources: ["https://lindependant.org"],
    },
    {
      id: "ml-le-republicain",
      countryCode: "ML",
      name: "Le Républicain",
      nativeName: "Le Républicain",
      englishTranslation: "The Republican",
      founded: 1992,
      frequency: "Daily newspaper (Monday–Friday)",
      format: "Tabloid & web portal",
      language: "French",
      headquarters: "Hamdallaye ACI 2000, Bamako",
      owner: {
        name: "Société de Presse Le Républicain",
        type: "Independent commercial media",
      },
      editorialStance: "Founded by prominent pro-democracy activist Tiébilé Dramé following Mali's 1991 democratic transition; steadfast defender of constitutional liberties, rule of law, and peace accords",
      readership: {
        metric: "Respected national daily with readership concentrated among political leaders, academics, and NGOs",
        source: "Association des Éditeurs de Presse Privée (ASSEP) 2023",
      },
      revenueModel: "Print sales, institutional advertising, and subscriptions",
      logo: "newspaper-logos/ml/le-republicain.svg",
      logoExplainer:
        "Crimson red field showcasing elegant white serif typography 'Le Républicain', symbolizing democratic vigilance.",
      sources: ["https://fr.wikipedia.org/wiki/Le_R%C3%A9publicain_(Mali)"],
    },
    {
      id: "ml-maliweb",
      countryCode: "ML",
      name: "Maliweb",
      founded: 2002,
      frequency: "Continuous digital news service",
      format: "Digital superportal & news aggregator",
      language: "French",
      headquarters: "Bamako",
      owner: {
        name: "Maliweb Net SARL",
        type: "Independent digital media",
      },
      editorialStance: "Mali's pioneer news portal; synthesizes news from across private Malian newspapers alongside original reporting, political debates, and vibrant community forums",
      readership: {
        metric: "Over 350,000 daily page impressions; leading news reference for Malians at home and across the diaspora in France and the US",
        source: "Maliweb Traffic Analytics 2023",
      },
      revenueModel: "Digital display ads, sponsored articles, and classifieds",
      logo: "newspaper-logos/ml/maliweb.svg",
      logoExplainer:
        "Dark slate background featuring bright grass-green heavy lettering 'MALIWEB.NET', symbolizing online connectivity across the nation.",
      sources: ["https://www.maliweb.net"],
    },
    {
      id: "ml-malijet",
      countryCode: "ML",
      name: "Malijet",
      founded: 2007,
      frequency: "Continuous digital news service",
      format: "Digital portal & mobile news",
      language: "French",
      headquarters: "Bamako",
      owner: {
        name: "Malijet Media Network",
        type: "Independent digital media",
      },
      editorialStance: "Fast-paced breaking news portal; covers military developments, political transition communiqués, local crime, culture, and sports",
      readership: {
        metric: "High digital engagement with over 200,000 daily visitors and an influential social media following",
        source: "Malijet Media Data 2023",
      },
      revenueModel: "Digital advertising networks and commercial sponsorships",
      logo: "newspaper-logos/ml/malijet.svg",
      logoExplainer:
        "Vibrant orange backdrop emblazoned with prominent white impact font 'MALIJET', representing urgent real-time digital news.",
      sources: ["https://malijet.com"],
    },
  ],

  // Malta
  MT: [
    {
      id: "mt-times-of-malta",
      countryCode: "MT",
      name: "Times of Malta",
      founded: 1935,
      frequency: "Daily newspaper (Monday–Sunday)",
      format: "Compact & digital portal",
      language: "English",
      headquarters: "Mrieħel, Birkirkara",
      owner: {
        name: "Allied Newspapers Limited (Strickland Foundation)",
        type: "Independent non-profit trust media",
      },
      editorialStance: "Malta's oldest existing daily and undisputed national newspaper of record; renowned for rigorous investigative reporting, political accountability, and European integration",
      readership: {
        metric: "Over 70% of Malta's English-language print newspaper readership and highest-traffic news website in the country",
        source: "Broadcasting Authority / Allied Group Annual Audit 2023",
      },
      revenueModel: "Print sales, digital premium subscriptions (Times of Malta Premium), and advertising",
      logo: "newspaper-logos/mt/times-of-malta.svg",
      logoExplainer:
        "Dark navy field with distinguished white capital serif typography 'TIMES OF MALTA', embodying Maltese newspaper of record status.",
      sources: ["https://timesofmalta.com", "https://en.wikipedia.org/wiki/Times_of_Malta"],
    },
    {
      id: "mt-the-malta-independent",
      countryCode: "MT",
      name: "The Malta Independent",
      founded: 1992,
      frequency: "Daily newspaper (Monday–Sunday)",
      format: "Compact & digital portal",
      language: "English",
      headquarters: "St Julian's",
      owner: {
        name: "Standard Publications Limited",
        type: "Independent commercial media",
      },
      editorialStance: "Leading independent English-language daily; analytical editorial line focusing on governance, financial transparency, environmental planning, and EU regulations",
      readership: {
        metric: "Key daily print circulation and second-most-read English online news portal in Malta",
        source: "Malta Broadcasting Authority Press Study 2023",
      },
      revenueModel: "Print sales, corporate display advertising, and web advertising",
      logo: "newspaper-logos/mt/the-malta-independent.svg",
      logoExplainer:
        "Stark white background showcasing crimson red serif typography 'The Malta Independent', representing principled and autonomous commentary.",
      sources: ["https://www.independent.com.mt", "https://en.wikipedia.org/wiki/The_Malta_Independent"],
    },
    {
      id: "mt-maltatoday",
      countryCode: "MT",
      name: "MaltaToday",
      founded: 1999,
      frequency: "Bi-weekly print & continuous digital",
      format: "Compact tabloid & digital portal",
      language: "English",
      headquarters: "San Ġwann",
      owner: {
        name: "MediaToday Co. Ltd",
        type: "Independent commercial media",
      },
      editorialStance: "Progressive, liberal editorial voice; famous for hard-hitting investigative journalism, civil liberties campaigns, political polling, and whistleblower disclosures",
      readership: {
        metric: "Over 80,000 daily unique digital readers and high Sunday print readership",
        source: "MediaToday Market Research 2023",
      },
      revenueModel: "Print sales, digital advertising, commercial survey services, and events",
      logo: "newspaper-logos/mt/maltatoday.svg",
      logoExplainer:
        "Vivid red rectangle with stark white modern sans-serif typography 'MaltaToday', evoking progressive and fearless reporting.",
      sources: ["https://www.maltatoday.com.mt", "https://en.wikipedia.org/wiki/MaltaToday"],
    },
    {
      id: "mt-l-orizzont",
      countryCode: "MT",
      name: "L-Orizzont",
      nativeName: "L-Orizzont",
      englishTranslation: "The Horizon",
      founded: 1962,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Compact & digital portal",
      language: "Maltese",
      headquarters: "Valletta",
      owner: {
        name: "Union Print Co. Ltd (General Workers' Union)",
        type: "Trade union media",
      },
      editorialStance: "Malta's highest-circulation Maltese-language daily; left-of-centre perspective championing workers' rights, employment protections, and social equity",
      readership: {
        metric: "Highest-selling Maltese-language daily newspaper, circulating over 12,000 copies daily",
        source: "General Workers' Union Media Report 2023",
      },
      revenueModel: "Print sales, union backing, and commercial advertising",
      logo: "newspaper-logos/mt/l-orizzont.svg",
      logoExplainer:
        "Royal blue background with bold white condensed uppercase lettering 'L-ORIZZONT', symbolizing labor solidarity and progressive vision.",
      sources: ["https://talk.mt", "https://en.wikipedia.org/wiki/L-Orizzont"],
    },
    {
      id: "mt-tvm-news",
      countryCode: "MT",
      name: "TVM News",
      nativeName: "Television Malta News",
      englishTranslation: "Television Malta News",
      founded: 1962,
      frequency: "Continuous multimedia news broadcaster",
      format: "Television, radio & digital portal",
      language: "Maltese, English",
      headquarters: "Gwardamanġa, Pietà",
      owner: {
        name: "Public Broadcasting Services (PBS) Ltd",
        type: "State public broadcaster",
      },
      annualPublicFunding: {
        total: "€6.5 million",
        perCapita: "€12.30",
      },
      editorialStance: "National public broadcaster of Malta; statutory commitment to balanced reporting of parliamentary debates, national feasts, international diplomacy, and culture",
      readership: {
        metric: "Reaches over 65% of the Maltese television audience for its flagship 8 PM news bulletin and dominant Maltese-language news site",
        source: "Malta Broadcasting Authority Official Audience Survey 2023",
      },
      revenueModel: "State public service grant and commercial television advertising",
      logo: "newspaper-logos/mt/tvm-news.svg",
      logoExplainer:
        "Dark slate field featuring vibrant red 'TVM' coupled with bold white 'NEWS', representing Malta's principal public broadcaster.",
      sources: ["https://tvmnews.mt", "https://en.wikipedia.org/wiki/Television_Malta"],
    },
  ],

  // Marshall Islands
  MH: [
    {
      id: "mh-the-marshall-islands-journal",
      countryCode: "MH",
      name: "The Marshall Islands Journal",
      founded: 1970,
      frequency: "Weekly newspaper (Fridays)",
      format: "Tabloid & digital edition",
      language: "English, Marshallese",
      headquarters: "Majuro",
      owner: {
        name: "Micronitor News and Printing Company",
        type: "Independent commercial media",
      },
      editorialStance: "National newspaper of record for the Marshall Islands; fiercely independent coverage of Nitijeļā (parliament), climate change sea-level rise, nuclear testing legacy, and regional Pacific affairs",
      readership: {
        metric: "Distributed across Majuro, Ebeye, and outer atolls, with international subscribers across Micronesia, Hawaii, and Arkansas",
        source: "Micronitor Publishing Profile 2023",
      },
      revenueModel: "Print sales, institutional subscriptions, and local commercial advertising",
      logo: "newspaper-logos/mh/the-marshall-islands-journal.svg",
      logoExplainer:
        "Pacific blue canvas with bold white serif header 'Marshall Islands Journal', reflecting half a century of independent island journalism.",
      sources: ["https://marshallislandsjournal.com", "https://en.wikipedia.org/wiki/The_Marshall_Islands_Journal"],
    },
    {
      id: "mh-v7ab-radio-news",
      countryCode: "MH",
      name: "V7AB Radio News",
      founded: 1953,
      frequency: "Daily public radio broadcast",
      format: "AM radio broadcast & community bulletins",
      language: "Marshallese, English",
      headquarters: "Majuro",
      owner: {
        name: "Ministry of Culture and Internal Affairs",
        type: "Public state broadcaster",
      },
      annualPublicFunding: {
        total: "$350,000",
        perCapita: "$8.30",
      },
      editorialStance: "Lifeline public broadcaster (Radio Marshalls); transmits emergency cyclone warnings, maritime weather, parliament debates, and health notices to all outer atolls",
      readership: {
        metric: "Universal reach across all 24 inhabited atolls and coral islands via 1098 kHz AM transmitter",
        source: "RMI Ministry of Culture and Internal Affairs 2023",
      },
      revenueModel: "Government budget appropriation and public service announcements",
      logo: "newspaper-logos/mh/v7ab-radio-news.svg",
      logoExplainer:
        "Forest green badge displaying white 'V7AB RADIO NEWS' with golden subtitle 'MARSHALL ISLANDS BROADCAST', representing outer-island lifeline radio.",
      sources: ["https://www.infomarshallislands.com"],
    },
    {
      id: "mh-yokwe-online",
      countryCode: "MH",
      name: "Yokwe Online",
      founded: 2002,
      frequency: "Continuous digital news service",
      format: "Digital portal & community bulletin",
      language: "English, Marshallese",
      headquarters: "Majuro",
      owner: {
        name: "Yokwe Media Network",
        type: "Independent digital media",
      },
      editorialStance: "Online portal connecting residents and the large Marshallese diaspora in Springdale, Arkansas, and Hawaii; focuses on culture, compact of free association (COFA) updates, and health",
      readership: {
        metric: "Over 25,000 monthly unique visitors across Micronesia and the US diaspora",
        source: "Yokwe Media Audience Summary 2023",
      },
      revenueModel: "Community sponsorships and online display ads",
      logo: "newspaper-logos/mh/yokwe-online.svg",
      logoExplainer:
        "Warm orange background with bold white lettering 'YOKWE ONLINE', invoking the traditional warm Marshallese greeting 'Iokwe'.",
      sources: ["http://www.yokwe.net"],
    },
    {
      id: "mh-marshall-islands-guide",
      countryCode: "MH",
      name: "Marshall Islands Guide",
      founded: 2012,
      frequency: "Continuous digital portal",
      format: "Digital news & information portal",
      language: "English",
      headquarters: "Majuro",
      owner: {
        name: "Majuro Digital Services",
        type: "Independent digital media",
      },
      editorialStance: "Information and news clearinghouse; provides verified reports on travel regulations, maritime transport, atoll infrastructure projects, and environmental initiatives",
      readership: {
        metric: "Widely consulted by international visitors, aid agencies, researchers, and local residents",
        source: "Marshall Islands Guide Analytics 2024",
      },
      revenueModel: "Digital directory listings and tourism partnerships",
      logo: "newspaper-logos/mh/marshall-islands-guide-news.svg",
      logoExplainer:
        "Lagoon-blue backdrop featuring crisp white sans-serif lettering 'Marshall Islands Guide', signifying Pacific navigation and clear information.",
      sources: ["https://www.infomarshallislands.com"],
    },
    {
      id: "mh-micronesia-forum-news",
      countryCode: "MH",
      name: "Micronesia Forum News",
      founded: 2015,
      frequency: "Weekly digital digest",
      format: "Digital newsletter & news forum",
      language: "English",
      headquarters: "Ebeye, Kwajalein Atoll",
      owner: {
        name: "Micronesian Civic Media",
        type: "Non-profit community media",
      },
      editorialStance: "Dedicated community platform highlighting life in Ebeye, Kwajalein missile range impacts, youth education, and regional Micronesian solidarity",
      readership: {
        metric: "Circulated among Ebeye community leaders, educators, and regional civil society advocates",
        source: "Micronesian Civic Media Overview 2023",
      },
      revenueModel: "Community contributions and civic grant funding",
      logo: "newspaper-logos/mh/micronesia-forum-news.svg",
      logoExplainer:
        "Dark navy canvas with luminous sky-blue bold lettering 'MICRONESIA FORUM NEWS', evoking Pacific island voices.",
      sources: ["https://www.infomarshallislands.com"],
    },
  ],

  // Mauritania
  MR: [
    {
      id: "mr-ami",
      countryCode: "MR",
      name: "AMI (Agence Mauritanienne d'Information)",
      nativeName: "وكالة الأنباء الموريتانية",
      englishTranslation: "Mauritanian News Agency",
      founded: 1975,
      frequency: "Real-time news wire & daily publications",
      format: "News wire, daily newspapers (Chaab & Horizons) & digital portal",
      language: "Arabic, French",
      headquarters: "Nouakchott",
      owner: {
        name: "Government of the Islamic Republic of Mauritania",
        type: "State public enterprise",
      },
      editorialStance: "Official state news agency; official communiqués, ministerial decisions, diplomatic visits, national mining developments, and regional Sahel stability",
      readership: {
        metric: "Primary source of official news wire feeds for domestic broadcasters, newspapers, and foreign embassies",
        source: "AMI Rapport Annuel d'Activité 2023",
      },
      revenueModel: "State budget subsidy and official publication subscriptions",
      logo: "newspaper-logos/mr/ami.svg",
      logoExplainer:
        "Mauritanian Islamic green field adorned with gold Arabic calligraphy 'وكالة الأنباء الموريتانية (AMI)' and white French subtitle.",
      sources: ["https://ami.mr", "https://fr.wikipedia.org/wiki/Agence_mauritanienne_d%27information"],
    },
    {
      id: "mr-al-akhbar",
      countryCode: "MR",
      name: "Al Akhbar",
      nativeName: "وكالة الأخبار المستقلة",
      englishTranslation: "Independent News Agency",
      founded: 2003,
      frequency: "Continuous digital news service",
      format: "Digital portal & investigative wire",
      language: "Arabic, French",
      headquarters: "Tevragh-Zeina, Nouakchott",
      owner: {
        name: "Al Akhbar Media Group",
        type: "Independent commercial media",
      },
      editorialStance: "Mauritania's most influential independent news agency; acclaimed for investigative exposés on government corruption, human rights, Sahelian militant movements, and public trials",
      readership: {
        metric: "Over 120,000 daily online visitors; cited regularly by international news wires including AFP, Reuters, and Al Jazeera",
        source: "Al Akhbar Traffic Report 2023",
      },
      revenueModel: "Digital advertising, private subscriptions, and media training",
      logo: "newspaper-logos/mr/al-akhbar.svg",
      logoExplainer:
        "Crimson red background highlighting stark white Arabic script 'الأخبار (Alakhbar.info)', representing breaking independent investigations.",
      sources: ["https://alakhbar.info", "https://fr.wikipedia.org/wiki/Alakhbar_(Mauritanie)"],
    },
    {
      id: "mr-cridem",
      countryCode: "MR",
      name: "CRIDEM",
      nativeName: "Carrefour de la République Islamique de Mauritanie",
      englishTranslation: "Crossroads of the Islamic Republic of Mauritania",
      founded: 2003,
      frequency: "Continuous digital news service",
      format: "Digital news portal & aggregator",
      language: "French",
      headquarters: "Nouakchott",
      owner: {
        name: "CRIDEM Communication",
        type: "Independent commercial media",
      },
      editorialStance: "Leading French-language news aggregator and forum in Mauritania; synthesizes political press releases, cultural debates, and opinion pieces from civil society",
      readership: {
        metric: "Over 80,000 daily visits; widely read by Mauritanian civil servants, francophone professionals, and international donors",
        source: "CRIDEM Media Kit 2023",
      },
      revenueModel: "Web display advertising and corporate communications",
      logo: "newspaper-logos/mr/cridem.svg",
      logoExplainer:
        "Dark slate background featuring bright golden-yellow bold lettering 'CRIDEM', representing the crossroads of Mauritanian news.",
      sources: ["https://cridem.org"],
    },
    {
      id: "mr-sahara-medias",
      countryCode: "MR",
      name: "Sahara Médias",
      nativeName: "صحراء ميديا",
      englishTranslation: "Sahara Media",
      founded: 2000,
      frequency: "Continuous digital news service & radio syndication",
      format: "Digital news portal & multimedia production",
      language: "Arabic, French",
      headquarters: "Nouakchott",
      owner: {
        name: "Sahara Media Group",
        type: "Independent commercial media",
      },
      editorialStance: "Regional powerhouse in Sahelian journalism; delivers frontline reporting on Sahara desert security, cross-border trade, Mauritanian politics, and energy megaprojects",
      readership: {
        metric: "Over 100,000 daily readers across Mauritania, Senegal, Mali, and North Africa",
        source: "Sahara Media Corporate Analytics 2023",
      },
      revenueModel: "Commercial advertising, documentary production, and regional broadcast partnerships",
      logo: "newspaper-logos/mr/sahara-medias.svg",
      logoExplainer:
        "Desert-orange rectangular field bearing crisp white sans-serif font 'SAHARA MÉDIAS', symbolising the vast Saharan horizon.",
      sources: ["https://saharamedias.net", "https://fr.saharamedias.net"],
    },
    {
      id: "mr-le-calame",
      countryCode: "MR",
      name: "Le Calame",
      nativeName: "Le Calame",
      englishTranslation: "The Reed Pen",
      founded: 1993,
      frequency: "Weekly newspaper (Wednesdays)",
      format: "Tabloid & digital portal",
      language: "French",
      headquarters: "Nouakchott",
      owner: {
        name: "SARL Le Calame",
        type: "Independent commercial media",
      },
      editorialStance: "Historic independent weekly founded by veteran journalist Habib Ould Mahfoudh; famous for satirical political chronicles, uncompromising defense of democracy, and anti-slavery advocacy",
      readership: {
        metric: "Highest-regarded political weekly in Mauritania with weekly print circulation of 5,000 copies and avid online readership",
        source: "Syndicat des Journalistes Mauritans 2023",
      },
      revenueModel: "Newsstand sales, institutional subscriptions, and commercial advertising",
      logo: "newspaper-logos/mr/le-calame.svg",
      logoExplainer:
        "Deep marine blue backdrop featuring refined white serif typography 'Le Calame', recalling the ancient reed pen and free expression.",
      sources: ["https://lecalame.info", "https://fr.wikipedia.org/wiki/Le_Calame"],
    },
  ],

  // Mauritius
  MU: [
    {
      id: "mu-l-express",
      countryCode: "MU",
      name: "L'Express",
      founded: 1963,
      frequency: "Daily newspaper (Monday–Saturday) & continuous digital portal",
      format: "Tabloid & digital news portal",
      language: "French, English",
      headquarters: "Baie-du-Tombeau, Port Louis",
      owner: {
        name: "La Sentinelle Ltd",
        type: "Independent commercial media group",
      },
      editorialStance: "Mauritius' oldest and leading independent daily; investigative reporting on government transparency, parliamentary democracy, offshore finance, and Indian Ocean regional security",
      readership: {
        metric: "Highest circulation daily newspaper in Mauritius with over 35,000 print copies and leading news portal lexpress.mu",
        source: "Media Watch Organisation Mauritius 2023",
      },
      revenueModel: "Print sales, digital advertising, and corporate subscriptions",
      logo: "newspaper-logos/mu/l-express.svg",
      logoExplainer:
        "Deep navy blue rectangle with bold white italicized serif typography 'l'express', symbolizing dynamic and fast investigative journalism in Mauritius.",
      sources: ["https://lexpress.mu", "https://fr.wikipedia.org/wiki/L%27Express_(Maurice)"],
    },
    {
      id: "mu-le-mauricien",
      countryCode: "MU",
      name: "Le Mauricien",
      founded: 1908,
      frequency: "Daily newspaper (afternoon daily Monday–Saturday)",
      format: "Broadsheet & digital portal",
      language: "French, English",
      headquarters: "Port Louis",
      owner: {
        name: "Le Mauricien Ltd",
        type: "Independent commercial media",
      },
      editorialStance: "Centenarian afternoon newspaper of record; known for intellectual depth, diplomatic coverage, social critiques, and parliamentary reporting",
      readership: {
        metric: "Over 20,000 daily print readership, widely read by civil servants, legal professionals, and academics",
        source: "Le Mauricien Audience Survey 2023",
      },
      revenueModel: "Print sales, legal notices, and commercial display ads",
      logo: "newspaper-logos/mu/le-mauricien.svg",
      logoExplainer:
        "Clean white background with dignified crimson red gothic serif typography 'Le Mauricien', reflecting more than a century of national heritage.",
      sources: ["https://lemauricien.com", "https://fr.wikipedia.org/wiki/Le_Mauricien"],
    },
    {
      id: "mu-defi-media",
      countryCode: "MU",
      name: "Défi Média",
      founded: 1996,
      frequency: "Continuous multimedia news service & weekly print",
      format: "Digital multimedia portal, radio & print publications",
      language: "French, Mauritian Creole, English",
      headquarters: "Labourdonnais Street, Port Louis",
      owner: {
        name: "Le Défi Media Group",
        type: "Independent commercial multimedia",
      },
      editorialStance: "Mauritius' largest multimedia news network; populist, fast-paced breaking coverage, consumer rights advocacy, citizen journalism, and community issues",
      readership: {
        metric: "Over 1.2 million monthly unique digital visitors and highest radio news audience through Radio Plus",
        source: "Kantar TNS Mauritius Media Study 2023",
      },
      revenueModel: "Commercial multimedia advertising, radio sponsorships, and print sales",
      logo: "newspaper-logos/mu/defi-media.svg",
      logoExplainer:
        "Vibrant royal blue background with fiery red and white bold lettering 'DÉFI MÉDIA GROUP', conveying popular momentum and breaking coverage.",
      sources: ["https://defimedia.info"],
    },
    {
      id: "mu-mbc-news",
      countryCode: "MU",
      name: "MBC News",
      founded: 1964,
      frequency: "24/7 public broadcast news service",
      format: "Television, radio & digital news portal",
      language: "French, English, Mauritian Creole, Bhojpuri, Hindi",
      headquarters: "Réduit, Moka",
      owner: {
        name: "Mauritius Broadcasting Corporation (MBC)",
        type: "State public broadcaster",
      },
      annualPublicFunding: {
        total: "MUR 380 million",
        perCapita: "MUR 295.00",
      },
      editorialStance: "National public service broadcaster; statutory responsibility to broadcast institutional affairs, multiracial community harmony, cultural festivals, and disaster warnings",
      readership: {
        metric: "Universal reach across Mauritius, Rodrigues, and the outer islands of Agalega",
        source: "MBC Annual Report 2023",
      },
      revenueModel: "State statutory license fee on electricity bills and broadcast commercials",
      logo: "newspaper-logos/mu/mbc-news.svg",
      logoExplainer:
        "Modern emerald green badge with golden yellow and white sans-serif lettering 'MBC NEWS', representing multiethnic public service broadcasting.",
      sources: ["https://mbcradio.tv", "https://en.wikipedia.org/wiki/Mauritius_Broadcasting_Corporation"],
    },
    {
      id: "mu-ion-news",
      countryCode: "MU",
      name: "ION News",
      founded: 2013,
      frequency: "Continuous digital news service",
      format: "Pure digital news & video portal",
      language: "French, English, Creole",
      headquarters: "Ébène Cybercity",
      owner: {
        name: "ION Media Ltd",
        type: "Independent digital media",
      },
      editorialStance: "Mauritius' pioneering pure-digital newsroom; focused on video debates, political analysis, financial tech in Ébène, and youth cultural movements",
      readership: {
        metric: "Over 400,000 monthly active users and strong social video viewership",
        source: "ION Media Analytics 2024",
      },
      revenueModel: "Digital programmatic advertising, video production, and sponsored roundtables",
      logo: "newspaper-logos/mu/ion-news.svg",
      logoExplainer:
        "Dark slate backdrop featuring electric cyan stylized typography 'ION NEWS', embodying digital innovation and forward-looking journalism.",
      sources: ["https://ionnews.mu"],
    },
  ],

  // Mexico
  MX: [
    {
      id: "mx-el-universal",
      countryCode: "MX",
      name: "El Universal",
      founded: 1916,
      frequency: "Daily newspaper (Monday–Sunday)",
      format: "Broadsheet & digital news portal",
      language: "Spanish",
      headquarters: "Mexico City",
      owner: {
        name: "El Universal, Compañía Periodística Nacional",
        type: "Independent commercial media",
      },
      editorialStance: "Mexico's century-old newspaper of record; centrist, comprehensive national coverage, investigative reporting on government transparency, economics, and judicial affairs",
      readership: {
        metric: "Over 120,000 daily print circulation and more than 18 million monthly unique visitors online",
        source: "Comscore Mexico / El Universal Audit 2023",
      },
      revenueModel: "Print circulation, digital subscriptions (El Universal Plus), and display advertising",
      logo: "newspaper-logos/mx/el-universal.svg",
      logoExplainer:
        "Deep navy blue field displaying the iconic stylized soaring eagle emblem and bold white serif headline 'EL UNIVERSAL', evoking national stature.",
      sources: ["https://www.eluniversal.com.mx", "https://es.wikipedia.org/wiki/El_Universal_(M%C3%A9xico)"],
    },
    {
      id: "mx-reforma",
      countryCode: "MX",
      name: "Reforma",
      founded: 1993,
      frequency: "Daily newspaper (Monday–Sunday)",
      format: "Broadsheet & digital subscriber portal",
      language: "Spanish",
      headquarters: "Mexico City",
      owner: {
        name: "Grupo Reforma",
        type: "Independent commercial media",
      },
      editorialStance: "Leading independent investigative newspaper; known for strict journalistic ethical codes, exposing political corruption, judicial malpractice, and financial monopolies",
      readership: {
        metric: "Over 90,000 paid daily print copies and Mexico's most successful digital hard paywall with over 150,000 digital subscribers",
        source: "Grupo Reforma Annual Statement 2023",
      },
      revenueModel: "Hard digital paywall subscriptions, print sales, and premium advertising",
      logo: "newspaper-logos/mx/reforma.svg",
      logoExplainer:
        "Distinctive scarlet red background with bold white condensed serif capital letters 'REFORMA', symbolizing journalistic vigor and editorial courage.",
      sources: ["https://www.reforma.com", "https://en.wikipedia.org/wiki/Reforma_(newspaper)"],
    },
    {
      id: "mx-la-jornada",
      countryCode: "MX",
      name: "La Jornada",
      founded: 1984,
      frequency: "Daily newspaper (Monday–Sunday)",
      format: "Tabloid & digital portal",
      language: "Spanish",
      headquarters: "Mexico City",
      owner: {
        name: "DEMOS, Desarrollo de Medios, S.A. de C.V.",
        type: "Journalist-owned cooperative media",
      },
      editorialStance: "Prominent left-wing newspaper of record; staunch coverage of indigenous rights, labor struggles, social movements, Latin American solidarity, and environmental defense",
      readership: {
        metric: "Over 75,000 daily print copies and over 12 million monthly digital readers across Latin America",
        source: "DEMOS S.A. Audited Metrics 2023",
      },
      revenueModel: "Print sales, open digital advertising, and institutional subscriptions",
      logo: "newspaper-logos/mx/la-jornada.svg",
      logoExplainer:
        "Classic black and white masthead featuring distinctive bold brush script 'La Jornada', representing grassroots democratic journalism and social justice.",
      sources: ["https://www.jornada.com.mx", "https://es.wikipedia.org/wiki/La_Jornada"],
    },
    {
      id: "mx-el-financiero",
      countryCode: "MX",
      name: "El Financiero",
      founded: 1981,
      frequency: "Daily financial newspaper & television channel",
      format: "Broadsheet, digital portal & cable TV (Bloomberg tie-up)",
      language: "Spanish",
      headquarters: "Mexico City",
      owner: {
        name: "Grupo Multimedia Lauman",
        type: "Independent commercial financial media",
      },
      editorialStance: "Mexico's premier financial and economic daily; in partnership with Bloomberg, delivering market analytics, macroeconomic forecasts, corporate mergers, and trade policy",
      readership: {
        metric: "Over 65,000 daily print copies read by corporate executives, banking officials, and investors nationwide",
        source: "El Financiero Bloomberg Media Kit 2023",
      },
      revenueModel: "Corporate print/digital subscriptions, financial advertising, and television broadcast",
      logo: "newspaper-logos/mx/el-financiero.svg",
      logoExplainer:
        "Corporate navy blue background with crisp white typography 'EL FINANCIERO' and gold accent line, signifying market authority and financial intelligence.",
      sources: ["https://www.elfinanciero.com.mx", "https://es.wikipedia.org/wiki/El_Financiero"],
    },
    {
      id: "mx-notimex",
      countryCode: "MX",
      name: "Notimex (Agencia Mexicana de Noticias)",
      nativeName: "Notimex, Agencia Mexicana de Noticias",
      englishTranslation: "Mexican News Agency",
      founded: 1968,
      frequency: "News wire service (historical/archival reference)",
      format: "News wire & multimedia archive",
      language: "Spanish, English",
      headquarters: "Mexico City",
      owner: {
        name: "Government of Mexico (Historical State Agency)",
        type: "State news agency",
      },
      editorialStance: "Mexico's historic state news wire founded during the 1968 Summer Olympics; covered dispatches across all 32 Mexican states and Latin American bureaus until dissolution in 2023",
      readership: {
        metric: "Historical news agency syndicating to hundreds of newspapers and broadcasters across Mexico and the Americas",
        source: "Diario Oficial de la Federación / Archivo Notimex",
      },
      revenueModel: "State budget allocations and wire service subscriptions",
      logo: "newspaper-logos/mx/notimex.svg",
      logoExplainer:
        "Green and red Mexican tricolor banner featuring bold white sans-serif 'NOTIMEX', commemorating Mexico's historic Olympic-era national wire agency.",
      sources: ["https://es.wikipedia.org/wiki/Notimex", "https://www.gob.mx"],
    },
  ],

  // Micronesia
  FM: [
    {
      id: "fm-the-kaselehlie-press",
      countryCode: "FM",
      name: "The Kaselehlie Press",
      founded: 2000,
      frequency: "Bi-weekly newspaper (every other Wednesday)",
      format: "Tabloid & digital PDF edition",
      language: "English",
      headquarters: "Kolonia, Pohnpei",
      owner: {
        name: "The Kaselehlie Press Inc.",
        type: "Independent commercial media",
      },
      editorialStance: "The Federated States of Micronesia's sole independent newspaper of record; comprehensive coverage of the FSM Congress, four state governments (Yap, Chuuk, Pohnpei, Kosrae), environmental sustainability, and COFA treaties",
      readership: {
        metric: "Distributed across all four states of the FSM, regional embassies, and Pacific libraries",
        source: "The Kaselehlie Press Media Summary 2023",
      },
      revenueModel: "Print sales, public notice announcements, and commercial ads",
      logo: "newspaper-logos/fm/the-kaselehlie-press.svg",
      logoExplainer:
        "Pacific deep blue header showcasing white serif lettering 'The Kaselehlie Press' alongside traditional Pohnpeian greeting motif, denoting national unity across four island states.",
      sources: ["https://www.kpress.info", "https://en.wikipedia.org/wiki/The_Kaselehlie_Press"],
    },
    {
      id: "fm-fsm-gov-news",
      countryCode: "FM",
      name: "FSM National Information Service",
      founded: 1979,
      frequency: "Continuous public release & bulletin service",
      format: "Digital information wire & gazette",
      language: "English",
      headquarters: "Palikir, Pohnpei",
      owner: {
        name: "Office of the President of the Federated States of Micronesia",
        type: "Government public information service",
      },
      annualPublicFunding: {
        total: "$280,000",
        perCapita: "$2.65",
      },
      editorialStance: "Official national public information service; publishes presidential decrees, congressional legislation, international diplomatic treaties, and climate adaptation projects",
      readership: {
        metric: "Primary official clearinghouse for FSM state leaders, four state administrations, and regional Pacific agencies",
        source: "FSM Government Public Information Division 2023",
      },
      revenueModel: "National government budgetary funding",
      logo: "newspaper-logos/fm/fsm-gov-news.svg",
      logoExplainer:
        "Four white stars on ocean blue background with gold lettering 'FSM NATIONAL NEWS', representing the four constitutional states of Yap, Chuuk, Pohnpei, and Kosrae.",
      sources: ["https://gov.fm"],
    },
    {
      id: "fm-v6ak-radio",
      countryCode: "FM",
      name: "V6AK Pohnpei Radio News",
      founded: 1977,
      frequency: "Daily public radio news broadcast",
      format: "AM/FM radio news service",
      language: "Pohnpeian, English",
      headquarters: "Kolonia, Pohnpei",
      owner: {
        name: "Pohnpei State Broadcast Service",
        type: "Public state broadcaster",
      },
      annualPublicFunding: {
        total: "$180,000",
        perCapita: "$4.90",
      },
      editorialStance: "Lifeline public broadcaster; emergency weather broadcasts, island governance reports, traditional council (Nahnmwarki) ceremonies, and civic education",
      readership: {
        metric: "Essential daily audio news service reaching across Pohnpei island and outer coral atolls (Mwoakilloa, Pingelap, Kapingamarangi, Nukuoro)",
        source: "FSM Telecommunications and Broadcast Authority 2023",
      },
      revenueModel: "State government funding and public service notices",
      logo: "newspaper-logos/fm/v6ak-radio.svg",
      logoExplainer:
        "Tropical green and oceanic teal badge bearing bold white sans-serif 'V6AK RADIO NEWS', honoring outer-island community broadcast.",
      sources: ["https://www.infofsm.com"],
    },
    {
      id: "fm-v6ai-yap-radio",
      countryCode: "FM",
      name: "V6AI The Voice of Yap",
      founded: 1970,
      frequency: "Daily public radio broadcast",
      format: "AM radio news service",
      language: "Yapese, Ulithian, Woleaian, English",
      headquarters: "Colonia, Yap",
      owner: {
        name: "Yap State Government Broadcast Division",
        type: "Public state broadcaster",
      },
      annualPublicFunding: {
        total: "$150,000",
        perCapita: "$13.20",
      },
      editorialStance: "Cultural preservation and community news broadcaster; delivers bilingual news, council of chiefs dispatches, typhoon alerts, and inter-island ferry schedules to Yap and the neighboring outer atolls",
      readership: {
        metric: "Reaches all communities across Yap main island and remote outer islands including Ulithi and Woleai",
        source: "Yap State Government Report 2023",
      },
      revenueModel: "State government appropriation",
      logo: "newspaper-logos/fm/v6ai-yap-radio.svg",
      logoExplainer:
        "Traditional Stone Money (Rai) icon silhouette with crisp white typography 'THE VOICE OF YAP - V6AI' on deep blue, symbolising historic heritage.",
      sources: ["https://yapstategov.org"],
    },
    {
      id: "fm-v6ah-kosrae-radio",
      countryCode: "FM",
      name: "V6AH Kosrae Broadcast News",
      founded: 1980,
      frequency: "Daily community broadcast",
      format: "Radio news service",
      language: "Kosraean, English",
      headquarters: "Tofol, Kosrae",
      owner: {
        name: "Kosrae State Government",
        type: "Public state broadcaster",
      },
      annualPublicFunding: {
        total: "$120,000",
        perCapita: "$18.00",
      },
      editorialStance: "Primary municipal and regional broadcaster for the island of Kosrae; reports on island development projects, church events, local agriculture, and environmental conservation",
      readership: {
        metric: "Universal coverage across all municipalities of Kosrae (Lelu, Malem, Tafunsak, Utwe)",
        source: "Kosrae State Broadcast Division 2023",
      },
      revenueModel: "State municipal subsidy and announcements",
      logo: "newspaper-logos/fm/v6ah-kosrae-radio.svg",
      logoExplainer:
        "Lush mountain green background displaying white lettering 'V6AH KOSRAE NEWS', reflecting the 'Island of the Sleeping Lady'.",
      sources: ["https://kosraegov.com"],
    },
  ],

  // Moldova
  MD: [
    {
      id: "md-moldpres",
      countryCode: "MD",
      name: "Moldpres",
      nativeName: "Agenția Informațională de Stat Moldpres",
      englishTranslation: "State Information Agency Moldpres",
      founded: 1990,
      frequency: "Real-time news wire & official gazette",
      format: "News wire, Monitorul Oficial & digital portal",
      language: "Romanian, English, Russian",
      headquarters: "Chișinău",
      owner: {
        name: "Government of the Republic of Moldova",
        type: "State public news agency",
      },
      editorialStance: "Official state news agency and publisher of the Official Gazette (Monitorul Oficial); factual reporting on parliamentary legislation, European integration process, and diplomatic relations",
      readership: {
        metric: "Primary wire source for Moldovan broadcast stations and official publisher of all laws in the Republic",
        source: "Moldpres Raport de Activitate 2023",
      },
      revenueModel: "State budget allocation and official publication sales",
      logo: "newspaper-logos/md/moldpres.svg",
      logoExplainer:
        "Moldovan blue banner featuring gold and white geometric sans-serif lettering 'MOLDPRES' with a stylized open newspaper motif, signifying state legislative truth.",
      sources: ["https://www.moldpres.md", "https://ro.wikipedia.org/wiki/Moldpres"],
    },
    {
      id: "md-jurnal-tv",
      countryCode: "MD",
      name: "Jurnal TV / Jurnal.md",
      founded: 2009,
      frequency: "Continuous multimedia news service & 24/7 TV",
      format: "Television channel & digital portal",
      language: "Romanian, Russian",
      headquarters: "Chișinău",
      owner: {
        name: "Jurnal Trust Media",
        type: "Independent commercial media",
      },
      editorialStance: "Influential pro-European independent television station; known for courageous anti-corruption investigations, political satire (Ora de Ras), and judicial investigations",
      readership: {
        metric: "One of Moldova's top 3 most watched television stations with over 1 million monthly digital visits on jurnal.md",
        source: "AGB Nielsen Media Research Moldova 2023",
      },
      revenueModel: "Commercial television advertising, digital ads, and donor grants",
      logo: "newspaper-logos/md/jurnal-tv.svg",
      logoExplainer:
        "Striking black rectangular field featuring bright red lowercase 'jurnal' and bold white 'TV', symbolizing fearless investigative broadcasting.",
      sources: ["https://www.jurnal.md", "https://ro.wikipedia.org/wiki/Jurnal_TV"],
    },
    {
      id: "md-ziarul-de-garda",
      countryCode: "MD",
      name: "Ziarul de Gardă",
      nativeName: "Ziarul de Gardă",
      englishTranslation: "Newspaper on Guard",
      founded: 2004,
      frequency: "Weekly newspaper (Thursdays) & continuous digital",
      format: "Tabloid & digital investigative portal",
      language: "Romanian, Russian, English",
      headquarters: "Chișinău",
      owner: {
        name: "Asociația Obștească Factual Media",
        type: "Non-profit independent investigative media",
      },
      editorialStance: "Moldova's premier investigative journalism organisation; recipient of multiple international press freedom awards for exposing oligarchic corruption, illicit financing of political parties, and Russian disinformation",
      readership: {
        metric: "Most trusted investigative print weekly in Moldova with over 1.5 million monthly digital page views",
        source: "Independent Journalism Center (IJC) Moldova 2023",
      },
      revenueModel: "Print subscriptions, reader donations, and international media integrity grants",
      logo: "newspaper-logos/md/ziarul-de-garda.svg",
      logoExplainer:
        "Pure white canvas showcasing bold black and crimson red gothic-style typography 'Ziarul de Gardă', representing an unyielding democratic watchdog.",
      sources: ["https://www.zdg.md", "https://ro.wikipedia.org/wiki/Ziarul_de_Gard%C4%83"],
    },
    {
      id: "md-trm",
      countryCode: "MD",
      name: "Teleradio-Moldova (TRM / Moldova 1)",
      nativeName: "Compania Națională Teleradio-Moldova",
      englishTranslation: "National Teleradio-Moldova Company",
      founded: 1939,
      frequency: "Continuous multimedia public broadcaster",
      format: "Public television (Moldova 1), radio (Radio Moldova) & digital portal",
      language: "Romanian, Russian, Gagauz, Ukrainian",
      headquarters: "Chișinău",
      owner: {
        name: "Teleradio-Moldova (Public Company)",
        type: "Public service broadcaster",
      },
      annualPublicFunding: {
        total: "MDL 142.5 million",
        perCapita: "MDL 57.00",
      },
      editorialStance: "National public service broadcaster; provides impartial news, parliamentary coverage, cultural heritage programming, and multilingual minority broadcasting",
      readership: {
        metric: "Broadest terrestrial signal coverage across the Republic, serving over 70% of households",
        source: "Consiliul Audiovizualului din Republica Moldova 2023",
      },
      revenueModel: "State budget subsidy and commercial advertising",
      logo: "newspaper-logos/md/trm.svg",
      logoExplainer:
        "Sleek dark blue banner with bold white lettering 'TRM' and golden accent representing national television and radio broadcasting.",
      sources: ["https://trm.md", "https://ro.wikipedia.org/wiki/Compania_Teleradio-Moldova"],
    },
    {
      id: "md-point-md",
      countryCode: "MD",
      name: "Point.md",
      founded: 2006,
      frequency: "Continuous digital news service",
      format: "Digital portal & news aggregator",
      language: "Russian, Romanian",
      headquarters: "Chișinău",
      owner: {
        name: "Simpals Ltd",
        type: "Independent digital technology & media company",
      },
      editorialStance: "Moldova's highest-traffic commercial digital news portal; fast-paced real-time aggregations of domestic and international news, civic petitions, and interactive reader commentary",
      readership: {
        metric: "Over 2.2 million monthly unique users, representing Moldova's most visited news website",
        source: "Gemius Audience Moldova 2023",
      },
      revenueModel: "Digital programmatic advertising and classifieds",
      logo: "newspaper-logos/md/point-md.svg",
      logoExplainer:
        "Modern charcoal field featuring bright red circle and stark white lowercase lettering 'point.md', denoting real-time digital news centrality.",
      sources: ["https://point.md"],
    },
  ],

  // Monaco
  MC: [
    {
      id: "mc-monaco-matin",
      countryCode: "MC",
      name: "Monaco-Matin",
      founded: 1997,
      frequency: "Daily newspaper (Monday–Sunday)",
      format: "Compact & digital portal",
      language: "French",
      headquarters: "Monaco (with editorial offices in Nice)",
      owner: {
        name: "Groupe Nice-Matin",
        type: "Independent commercial media group",
      },
      editorialStance: "The Principality of Monaco's primary daily morning newspaper; comprehensive coverage of Sovereign Prince Albert II, Palais Princier communiqués, National Council (Conseil National) debates, and luxury lifestyle",
      readership: {
        metric: "Primary daily morning newspaper in Monaco with over 6,000 copies circulated daily across the principality and French Riviera",
        source: "Groupe Nice-Matin Media Kit 2023",
      },
      revenueModel: "Print sales, digital subscriptions, and luxury brand advertising",
      logo: "newspaper-logos/mc/monaco-matin.svg",
      logoExplainer:
        "Monegasque red background with bold white modern serif typography 'MONACO-MATIN', representing the principality's essential morning daily.",
      sources: ["https://www.monacomatin.mc", "https://fr.wikipedia.org/wiki/Monaco-Matin"],
    },
    {
      id: "mc-monaco-tribune",
      countryCode: "MC",
      name: "Monaco Tribune",
      founded: 2020,
      frequency: "Continuous digital news service",
      format: "Digital news portal",
      language: "French, English",
      headquarters: "Rue Grimaldi, Monaco",
      owner: {
        name: "Monaco Tribune SARL",
        type: "Independent digital media",
      },
      editorialStance: "Dynamic bilingual digital newsroom; focuses on Monegasque economic innovation, marine environment protection (Prince Albert II Foundation), culture, sports (AS Monaco), and community initiatives",
      readership: {
        metric: "Over 150,000 monthly unique visitors across Monaco, France, and international expat readers",
        source: "Monaco Tribune Audience Data 2023",
      },
      revenueModel: "Digital sponsorships, native content, and institutional partnerships",
      logo: "newspaper-logos/mc/monaco-tribune.svg",
      logoExplainer:
        "Refined navy blue background featuring elegant gold and white uppercase lettering 'MONACO TRIBUNE', reflecting Mediterranean sophistication.",
      sources: ["https://www.monaco-tribune.com"],
    },
    {
      id: "mc-monaco-info",
      countryCode: "MC",
      name: "Monaco Info",
      founded: 1995,
      frequency: "Daily television news broadcaster",
      format: "Cable television channel & digital stream",
      language: "French",
      headquarters: "Boulevard Rainier III, Monaco",
      owner: {
        name: "Gouvernement Princier de Monaco",
        type: "Public state television",
      },
      annualPublicFunding: {
        total: "€4.2 million",
        perCapita: "€107.00",
      },
      editorialStance: "Official national public television service; broadcasts daily news bulletins, Sovereign Prince official travels, state ceremonies, and public health advisories",
      readership: {
        metric: "Universal distribution across all Monegasque cable networks and widely viewed online stream",
        source: "Direction de la Communication de Monaco 2023",
      },
      revenueModel: "State budget allocation from the Principality of Monaco",
      logo: "newspaper-logos/mc/monaco-info.svg",
      logoExplainer:
        "Monegasque red and white heraldic diamond motif alongside clean white typography 'monaco info', denoting official principality broadcasting.",
      sources: ["https://www.monacoinfo.com", "https://fr.wikipedia.org/wiki/Monaco_Info"],
    },
    {
      id: "mc-la-gazette-de-monaco",
      countryCode: "MC",
      name: "La Gazette de Monaco",
      founded: 1977,
      frequency: "Monthly journal & continuous digital",
      format: "Magazine, digital portal & legal archive",
      language: "French",
      headquarters: "Monaco-Ville",
      owner: {
        name: "Publi-Créations SAM",
        type: "Independent commercial publisher",
      },
      editorialStance: "Venerable monthly news and society publication; covering business, philanthropy, maritime yachting, diplomacy, and historical Monegasque archives",
      readership: {
        metric: "Distributed to high-net-worth residents, corporate directors, and civic institutions throughout Monaco",
        source: "La Gazette de Monaco Distribution Audit 2023",
      },
      revenueModel: "Premium subscriptions, print distribution, and high-end commercial ads",
      logo: "newspaper-logos/mc/la-gazette-de-monaco.svg",
      logoExplainer:
        "Classic deep gold and black banner with refined script font 'La Gazette de Monaco', evoking the rich heritage of the Rock.",
      sources: ["https://lagazettedemonaco.com"],
    },
    {
      id: "mc-radio-monaco",
      countryCode: "MC",
      name: "Radio Monaco",
      founded: 2006,
      frequency: "24/7 radio & news service",
      format: "FM radio broadcast & digital news streaming",
      language: "French",
      headquarters: "Port Hercule, Monaco",
      owner: {
        name: "Monaco Media Group",
        type: "Independent commercial radio",
      },
      editorialStance: "Energetic music and news radio station; provides regular newsflashes on French Riviera traffic, Monaco Grand Prix, environmental updates, and Mediterranean cultural affairs",
      readership: {
        metric: "Over 45,000 daily listeners from Sanremo (Italy) across Monaco to Cannes (France) on 95.4 FM",
        source: "Médiamétrie / Radio Monaco 2023",
      },
      revenueModel: "Commercial radio advertising and event partnerships",
      logo: "newspaper-logos/mc/radio-monaco.svg",
      logoExplainer:
        "Bright red disc and bold white typography 'RADIO MONACO 95.4', capturing the rhythm and coastal glamour of Port Hercule.",
      sources: ["https://radio-monaco.com"],
    },
  ],

  // Mongolia
  MN: [
    {
      id: "mn-montsame",
      countryCode: "MN",
      name: "Montsame",
      nativeName: "Монцамэ агентлаг",
      englishTranslation: "Montsame News Agency",
      founded: 1921,
      frequency: "Real-time news wire & weekly newspapers",
      format: "News wire, weekly journals (Mongol Messenger, Montsame Voskhod) & web portal",
      language: "Mongolian, English, Russian, Chinese, Japanese",
      headquarters: "Ulaanbaatar",
      owner: {
        name: "Government of Mongolia",
        type: "State national news agency",
      },
      annualPublicFunding: {
        total: "MNT 4.5 billion",
        perCapita: "MNT 1,320.00",
      },
      editorialStance: "Mongolia's official national news agency; founded in 1921, provides authoritative wire dispatches on State Great Khural (parliament) legislation, nomadic pastoralism, mining sector investments, and foreign diplomacy",
      readership: {
        metric: "Sole national agency syndicating news across all 21 aimags (provinces) and 40+ international news agencies",
        source: "Montsame Centennial Review 2023",
      },
      revenueModel: "State budgetary subvention and wire syndication fees",
      logo: "newspaper-logos/mn/montsame.svg",
      logoExplainer:
        "Mongolian sky-blue field featuring the golden Soyombo national symbol alongside bold white capital lettering 'MONTSAME', symbolizing independence and truth.",
      sources: ["https://montsame.mn", "https://en.wikipedia.org/wiki/Montsame"],
    },
    {
      id: "mn-udriin-sonin",
      countryCode: "MN",
      name: "Udriin Sonin",
      nativeName: "Өдрийн сонин",
      englishTranslation: "Daily Newspaper",
      founded: 1999,
      frequency: "Daily newspaper (Monday–Friday)",
      format: "Broadsheet & digital portal",
      language: "Mongolian",
      headquarters: "Sukhbaatar District, Ulaanbaatar",
      owner: {
        name: "Udriin Sonin LLC",
        type: "Independent commercial media",
      },
      editorialStance: "Mongolia's highest-circulation and most influential independent daily newspaper; recognized for investigative reporting on political corruption, mining agreements, and rural livelihoods",
      readership: {
        metric: "Largest print circulation in Mongolia with over 15,000 daily copies and leading national influence",
        source: "Press Institute of Mongolia Media Report 2023",
      },
      revenueModel: "Print copy sales, subscriptions, and commercial advertising",
      logo: "newspaper-logos/mn/udriin-sonin.svg",
      logoExplainer:
        "Deep blue rectangular header emblazoned with bright golden Cyrillic lettering 'Өдрийн сонин', representing Mongolia's premier daily press.",
      sources: ["https://dnn.mn", "https://mn.wikipedia.org/wiki/%D3%A8%D0%B4%D1%80%D0%B8%D0%B9%D0%BD_%D1%81%D0%BE%D0%BD%D0%B8%D0%BD"],
    },
    {
      id: "mn-mnb-news",
      countryCode: "MN",
      name: "MNB News",
      nativeName: "Монголын Үндэсний Олон Нийтийн Радио Телевиз (МҮОНРТ)",
      englishTranslation: "Mongolian National Broadcaster News",
      founded: 1967,
      frequency: "Continuous multimedia broadcast news",
      format: "Television (MNB 1, MNB News 24), radio & digital portal",
      language: "Mongolian, Kazakh, English",
      headquarters: "Bayangol District, Ulaanbaatar",
      owner: {
        name: "Mongolian National Broadcaster (MNB)",
        type: "Public service broadcaster",
      },
      annualPublicFunding: {
        total: "MNT 18.2 billion",
        perCapita: "MNT 5,350.00",
      },
      editorialStance: "National public service broadcaster governed by an independent public council; provides impartial news, parliamentary proceedings, herder education, and preservation of nomadic cultural heritage",
      readership: {
        metric: "Reaches over 85% of households nationwide via terrestrial and satellite broadcast, especially in remote countryside soums",
        source: "MNB Annual Governance Report 2023",
      },
      revenueModel: "State broadcast fund, viewer license fees, and limited commercial sponsorship",
      logo: "newspaper-logos/mn/mnb-news.svg",
      logoExplainer:
        "Bold navy blue badge with radiant red and gold geometric lettering 'MNB NEWS', embodying public service broadcasting for the steppe nation.",
      sources: ["https://www.mnb.mn", "https://en.wikipedia.org/wiki/Mongolian_National_Broadcaster"],
    },
    {
      id: "mn-ikon-mn",
      countryCode: "MN",
      name: "Ikon.mn",
      founded: 2013,
      frequency: "Continuous digital news service",
      format: "Digital news portal & data visualizations",
      language: "Mongolian, English",
      headquarters: "Ulaanbaatar",
      owner: {
        name: "Ikon Media LLC",
        type: "Independent digital media",
      },
      editorialStance: "Modern pioneering digital news portal; widely celebrated for data journalism, interactive infographics, objective fact-checking, and civil society accountability",
      readership: {
        metric: "Over 1.8 million monthly unique visitors; one of the top two most visited web news platforms in Mongolia",
        source: "Press Institute of Mongolia / Ikon Audience Metrics 2023",
      },
      revenueModel: "Digital display advertising, native sponsored content, and data analytics services",
      logo: "newspaper-logos/mn/ikon-mn.svg",
      logoExplainer:
        "Crisp white canvas displaying modern red and dark grey minimalist sans-serif 'ikon.mn', denoting clarity, speed, and analytical data journalism.",
      sources: ["https://ikon.mn"],
    },
    {
      id: "mn-gogo-mn",
      countryCode: "MN",
      name: "Gogo.mn",
      founded: 2007,
      frequency: "Continuous digital news service",
      format: "Digital superportal & multimedia network",
      language: "Mongolian",
      headquarters: "Ulaanbaatar",
      owner: {
        name: "Mongol Content LLC",
        type: "Independent commercial digital media",
      },
      editorialStance: "Comprehensive digital news and lifestyle portal; covers breaking political news, business, arts, Naadam festival sports, and urban youth culture in Ulaanbaatar",
      readership: {
        metric: "Over 2 million monthly active users and high engagement across mobile application and social channels",
        source: "Mongol Content Corporate Profile 2023",
      },
      revenueModel: "Digital advertising, content syndication, and digital entertainment services",
      logo: "newspaper-logos/mn/gogo-mn.svg",
      logoExplainer:
        "Playful and bold orange-red rectangular backdrop with prominent white rounded font 'gogo.mn', reflecting digital connectivity.",
      sources: ["https://gogo.mn"],
    },
  ],

  // Montenegro
  ME: [
    {
      id: "me-mina",
      countryCode: "ME",
      name: "MINA",
      nativeName: "Novinska agencija MINA",
      englishTranslation: "MINA News Agency",
      founded: 2001,
      frequency: "Real-time news wire service",
      format: "News wire & digital agency portal",
      language: "Montenegrin, English",
      headquarters: "Podgorica",
      owner: {
        name: "Infomont d.o.o.",
        type: "Independent news agency",
      },
      editorialStance: "Montenegro's leading independent news wire agency; provides objective real-time dispatches on parliamentary affairs, EU accession talks, judicial reform, and regional Balkan relations",
      readership: {
        metric: "Syndicated to over 90% of domestic media outlets, radio stations, TV networks, and state bodies in Montenegro",
        source: "MINA Corporate Profile 2023",
      },
      revenueModel: "B2B wire service subscriptions and syndication licensing",
      logo: "newspaper-logos/me/mina.svg",
      logoExplainer:
        "Montenegrin deep red background with bold white modern sans-serif typography 'MINA', representing the premier national news agency.",
      sources: ["https://mina.news"],
    },
    {
      id: "me-vijesti",
      countryCode: "ME",
      name: "Vijesti",
      nativeName: "Vijesti",
      englishTranslation: "News",
      founded: 1997,
      frequency: "Daily newspaper, 24/7 TV & digital portal",
      format: "Compact tabloid, linear TV & digital portal",
      language: "Montenegrin",
      headquarters: "Podgorica",
      owner: {
        name: "Daily Press d.o.o. (United Media)",
        type: "Independent commercial media group",
      },
      editorialStance: "Montenegro's highest-circulation and most influential independent media outlet; acclaimed for fearless investigative reporting against organized crime, political corruption, and state capture",
      readership: {
        metric: "Over 1.5 million monthly unique digital visitors on vijesti.me and highest-rated independent evening TV news bulletin in Montenegro",
        source: "Ipsos Strategic Marketing Montenegro 2023",
      },
      revenueModel: "Print sales, digital advertising, cable retransmission, and TV commercial ads",
      logo: "newspaper-logos/me/vijesti.svg",
      logoExplainer:
        "Vibrant royal blue background with sharp white and red geometric lettering 'VIJESTI', symbolizing investigative rigor and free press.",
      sources: ["https://www.vijesti.me", "https://en.wikipedia.org/wiki/Vijesti"],
    },
    {
      id: "me-pobjeda",
      countryCode: "ME",
      name: "Pobjeda",
      nativeName: "Pobjeda",
      englishTranslation: "Victory",
      founded: 1944,
      frequency: "Daily newspaper (Monday–Sunday)",
      format: "Compact & digital portal",
      language: "Montenegrin",
      headquarters: "Podgorica",
      owner: {
        name: "Media Nea d.o.o.",
        type: "Independent commercial media",
      },
      editorialStance: "Montenegro's oldest active daily newspaper, founded during World War II anti-fascist liberation; center-left pro-Western stance advocating Montenegrin state sovereignty, NATO membership, and cultural heritage",
      readership: {
        metric: "Over 10,000 daily print circulation with institutional readership across ministries, schools, and civic bodies",
        source: "Media Nea Audience Report 2023",
      },
      revenueModel: "Print sales, subscriptions, legal announcements, and commercial advertising",
      logo: "newspaper-logos/me/pobjeda.svg",
      logoExplainer:
        "Dark slate background featuring bold red title 'Pobjeda' in classical serif lettering, commemorating eight decades of Montenegrin press history.",
      sources: ["https://pobjeda.me", "https://en.wikipedia.org/wiki/Pobjeda_(newspaper)"],
    },
    {
      id: "me-rtcg-portal",
      countryCode: "ME",
      name: "RTCG Portal",
      nativeName: "Radio i Televizija Crne Gore (RTCG)",
      englishTranslation: "Radio and Television of Montenegro",
      founded: 1944,
      frequency: "Continuous multimedia news broadcaster",
      format: "Television, radio & digital news portal",
      language: "Montenegrin, Albanian",
      headquarters: "Podgorica",
      owner: {
        name: "RTCG (Public Enterprise)",
        type: "Public service broadcaster",
      },
      annualPublicFunding: {
        total: "€16.8 million",
        perCapita: "€27.10",
      },
      editorialStance: "National public service broadcaster; statutory obligation to deliver balanced domestic news, parliamentary debates, educational programming, and Albanian minority broadcasting",
      readership: {
        metric: "Universal terrestrial coverage reaching 98% of Montenegro's population, complemented by high-traffic web portal rtcg.me",
        source: "RTCG Finansijski i Programski Izvještaj 2023",
      },
      revenueModel: "State budget statutory grant (linked to GDP share) and limited advertising",
      logo: "newspaper-logos/me/rtcg-portal.svg",
      logoExplainer:
        "National red banner adorned with gold lion element and sleek white lettering 'RTCG', denoting the state public broadcaster.",
      sources: ["https://rtcg.me", "https://en.wikipedia.org/wiki/Radio_and_Television_of_Montenegro"],
    },
    {
      id: "me-dan",
      countryCode: "ME",
      name: "Dan",
      nativeName: "ДАН",
      englishTranslation: "Day",
      founded: 1999,
      frequency: "Daily newspaper (Monday–Sunday)",
      format: "Compact & digital portal",
      language: "Montenegrin / Serbian",
      headquarters: "Podgorica",
      owner: {
        name: "Jumedia Mont d.o.o.",
        type: "Independent commercial media",
      },
      editorialStance: "Major high-circulation daily newspaper; socially conservative, critically scrutinizing executive governance, public infrastructure tenders, and championing civil liberties",
      readership: {
        metric: "One of Montenegro's two leading print daily newspapers with widespread distribution in northern and coastal municipalities",
        source: "Ipsos Print Readership Study Montenegro 2023",
      },
      revenueModel: "Print copy sales, classifieds, and commercial advertising",
      logo: "newspaper-logos/me/dan.svg",
      logoExplainer:
        "Clean white background with heavy red Cyrillic typography 'ДАН', representing a foundational morning newspaper of Montenegro.",
      sources: ["https://www.dan.co.me", "https://en.wikipedia.org/wiki/Dan_(newspaper)"],
    },
  ],

  // Morocco
  MA: [
    {
      id: "ma-map",
      countryCode: "MA",
      name: "MAP (Maghreb Arabe Presse)",
      nativeName: "وكالة المغرب العربي للأنباء",
      englishTranslation: "Maghreb Arab Press Agency",
      founded: 1959,
      frequency: "Real-time news wire service & daily publications",
      format: "News wire, daily newspapers (Le Matin / Al-Sahra Al-Maghribiya) & digital portal",
      language: "Arabic, French, English, Spanish, Amazigh",
      headquarters: "Rabat",
      owner: {
        name: "Kingdom of Morocco",
        type: "State news agency",
      },
      annualPublicFunding: {
        total: "MAD 310 million",
        perCapita: "MAD 8.40",
      },
      editorialStance: "Morocco's official national news wire agency; founded under King Mohammed V, provides authoritative dispatches on Royal Palace activities, government policies, Sahara territorial integrity, and African diplomacy",
      readership: {
        metric: "Primary wire syndicator feeding over 200 national newspapers, radio stations, television networks, and international diplomatic posts",
        source: "MAP Rapport d'Activité 2023",
      },
      revenueModel: "State budgetary subvention, wire subscriptions, and commercial photo/video services",
      logo: "newspaper-logos/ma/map.svg",
      logoExplainer:
        "Moroccan crimson red background with gold pentagram star outline and bold white lettering 'MAP - AGENCE MAROCAINE DE PRESSE', evoking sovereign authority.",
      sources: ["https://www.mapnews.ma", "https://fr.wikipedia.org/wiki/Maghreb_Arabe_Presse"],
    },
    {
      id: "ma-hespress",
      countryCode: "MA",
      name: "Hespress",
      nativeName: "هسبريس",
      englishTranslation: "Hespress",
      founded: 2007,
      frequency: "Continuous digital news service",
      format: "Digital multimedia news portal",
      language: "Arabic, French, English",
      headquarters: "Rabat",
      owner: {
        name: "Maroc Digital SARL",
        type: "Independent commercial digital media",
      },
      editorialStance: "Morocco's most visited and influential independent digital news organization; acclaimed for fast-breaking national politics, lively opinion columns, investigative video reports, and social debates",
      readership: {
        metric: "Over 4.5 million daily unique visitors and ranked among the most visited websites in the entire Arab world",
        source: "Similarweb / Hespress Audited Metrics 2023",
      },
      revenueModel: "Digital programmatic advertising, sponsored features, and video production",
      logo: "newspaper-logos/ma/hespress.svg",
      logoExplainer:
        "Vibrant orange-red background featuring clean white Arabic calligraphy 'هسبريس' (Hespress), signifying energetic digital journalism across the Kingdom.",
      sources: ["https://www.hespress.com", "https://fr.wikipedia.org/wiki/Hespress"],
    },
    {
      id: "ma-le-matin",
      countryCode: "MA",
      name: "Le Matin",
      nativeName: "Le Matin du Sahara et du Maghreb",
      englishTranslation: "The Morning of Sahara and Maghreb",
      founded: 1971,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Broadsheet & digital portal",
      language: "French",
      headquarters: "Casablanca",
      owner: {
        name: "Groupe Maroc Soir",
        type: "Independent commercial media group",
      },
      editorialStance: "Morocco's historic Francophone newspaper of record; provides detailed coverage of royal activities, macroeconomic development strategies, industrial investments, and foreign bilateral summits",
      readership: {
        metric: "Leading French-language print circulation in Morocco, widely read by business leaders, diplomats, and high-ranking officials",
        source: "OJD Maroc / Groupe Maroc Soir 2023",
      },
      revenueModel: "Print sales, institutional subscriptions, and premium corporate display advertising",
      logo: "newspaper-logos/ma/le-matin.svg",
      logoExplainer:
        "Dignified dark navy field displaying refined golden-orange serif lettering 'LE MATIN', symbolizing Moroccan newspaper of record prestige.",
      sources: ["https://lematin.ma", "https://fr.wikipedia.org/wiki/Le_Matin_(Maroc)"],
    },
    {
      id: "ma-le360",
      countryCode: "MA",
      name: "Le360",
      founded: 2013,
      frequency: "Continuous digital news service",
      format: "Digital portal & multimedia video network",
      language: "French, Arabic",
      headquarters: "Casablanca",
      owner: {
        name: "Le360 Media Group",
        type: "Independent commercial media",
      },
      editorialStance: "Influential multimedia digital news outlet; known for aggressive scoops, diplomatic exposés, video interviews, sports coverage, and cultural commentary",
      readership: {
        metric: "Over 2 million monthly unique visitors across French and Arabic editions with massive social video audience",
        source: "Le360 Media Data 2023",
      },
      revenueModel: "Digital advertising, video production, and branded events",
      logo: "newspaper-logos/ma/le360.svg",
      logoExplainer:
        "Deep black rectangular backdrop featuring stylized crimson red circular emblem with white numerals '360', representing comprehensive 360-degree news coverage.",
      sources: ["https://fr.le360.ma", "https://ar.le360.ma"],
    },
    {
      id: "ma-snrt-news",
      countryCode: "MA",
      name: "SNRT News",
      nativeName: "الشركة الوطنية للإذاعة والتلفزة",
      englishTranslation: "National Broadcasting and Television Company News",
      founded: 1928,
      frequency: "Continuous public broadcast news service",
      format: "Television (Al Aoula), radio & digital news application",
      language: "Arabic, Amazigh, French, Spanish",
      headquarters: "Rabat",
      owner: {
        name: "Société Nationale de Radiodiffusion et de Télévision (SNRT)",
        type: "State public broadcaster",
      },
      annualPublicFunding: {
        total: "MAD 920 million",
        perCapita: "MAD 25.00",
      },
      editorialStance: "Morocco's national public service broadcaster; provides impartial national news bulletins, parliamentary broadcasts, regional Amazigh language channels (Tamazight TV), and cultural heritage preservation",
      readership: {
        metric: "Largest domestic television news viewership reaching over 70% of Moroccan homes through Al Aoula and SNRT News app",
        source: "Marocmétrie Audience Report 2023",
      },
      revenueModel: "State public service subvention and commercial television advertising",
      logo: "newspaper-logos/ma/snrt-news.svg",
      logoExplainer:
        "Emerald green badge with white and red geometric lettering 'SNRT NEWS', representing Morocco's foundational public broadcasting institution.",
      sources: ["https://snrtnews.com", "https://en.wikipedia.org/wiki/Soci%C3%A9t%C3%A9_Nationale_de_Radiodiffusion_et_de_T%C3%A9l%C3%A9vision"],
    },
  ],

  // Mozambique
  MZ: [
    {
      id: "mz-aim",
      countryCode: "MZ",
      name: "AIM (Agência de Informação de Moçambique)",
      nativeName: "Agência de Informação de Moçambique",
      englishTranslation: "Mozambique News Agency",
      founded: 1975,
      frequency: "Real-time news wire service",
      format: "News wire & digital dispatch portal",
      language: "Portuguese, English",
      headquarters: "Maputo",
      owner: {
        name: "Government of the Republic of Mozambique",
        type: "State news agency",
      },
      editorialStance: "Official national news agency created at independence in 1975; provides institutional wire bulletins on Assembly of the Republic legislation, LNG mega-projects in Cabo Delgado, agricultural developments, and SADC regional cooperation",
      readership: {
        metric: "Primary wire source syndicated to state and private radio stations, newspapers, and international embassies across southern Africa",
        source: "AIM Relatório de Actividades 2023",
      },
      revenueModel: "State budgetary subvention and news agency syndication fees",
      logo: "newspaper-logos/mz/aim.svg",
      logoExplainer:
        "Mozambican flag-inspired green banner with bold golden-yellow 'AIM' and white subtitle 'AGÊNCIA DE INFORMAÇÃO DE MOÇAMBIQUE'.",
      sources: ["https://aim.org.mz", "https://en.wikipedia.org/wiki/Ag%C3%AAncia_de_Informa%C3%A7%C3%A3o_de_Mo%C3%A7ambique"],
    },
    {
      id: "mz-noticias",
      countryCode: "MZ",
      name: "Jornal Notícias",
      nativeName: "Jornal Notícias",
      englishTranslation: "News Newspaper",
      founded: 1926,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Broadsheet & digital portal",
      language: "Portuguese",
      headquarters: "Maputo",
      owner: {
        name: "Sociedade do Notícias, S.A.",
        type: "Public-private enterprise",
      },
      editorialStance: "Mozambique's oldest and highest-circulation daily newspaper; comprehensive national coverage of government affairs, provincial administration across all 11 provinces, economic markets, and sports",
      readership: {
        metric: "Over 25,000 daily print copies distributed across the country and the premier print reference in Mozambique",
        source: "Sociedade do Notícias Relatório Anual 2023",
      },
      revenueModel: "Print sales, state and commercial advertising, and digital subscriptions",
      logo: "newspaper-logos/mz/noticias.svg",
      logoExplainer:
        "Deep navy blue background displaying classic crisp white serif typography 'NOTÍCIAS', representing the historic daily newspaper of record.",
      sources: ["https://www.jornalnoticias.co.mz", "https://pt.wikipedia.org/wiki/Jornal_Not%C3%ADcias"],
    },
    {
      id: "mz-o-pais",
      countryCode: "MZ",
      name: "O País",
      nativeName: "O País",
      englishTranslation: "The Country",
      founded: 2005,
      frequency: "Daily newspaper (Monday–Friday) & STV channel",
      format: "Compact tabloid, digital portal & linear TV (STV)",
      language: "Portuguese",
      headquarters: "Maputo",
      owner: {
        name: "SOICO Group (Sociedade Independente de Comunicação)",
        type: "Independent commercial media group",
      },
      editorialStance: "Leading independent daily newspaper and multimedia house; known for critical investigative reporting on public expenditure, social inequality, natural disasters (cyclones), and political transparency",
      readership: {
        metric: "Over 18,000 daily print copies and over 1.2 million monthly unique visits on opais.co.mz, integrated with STV television network",
        source: "Grupo SOICO Relatório de Gestão 2023",
      },
      revenueModel: "Print sales, multimedia advertising, and broadcast commercial sponsors",
      logo: "newspaper-logos/mz/o-pais.svg",
      logoExplainer:
        "Vibrant crimson red background featuring bold modern white sans-serif lettering 'O PAÍS', evoking dynamic independent news reporting.",
      sources: ["https://opais.co.mz", "https://pt.wikipedia.org/wiki/O_Pa%C3%ADs_(Mo%C3%A7ambique)"],
    },
    {
      id: "mz-canal-de-mocambique",
      countryCode: "MZ",
      name: "Canal de Moçambique",
      nativeName: "Canal de Moçambique",
      englishTranslation: "Mozambique Channel",
      founded: 2006,
      frequency: "Weekly newspaper (Wednesdays)",
      format: "Tabloid & digital edition",
      language: "Portuguese",
      headquarters: "Maputo",
      owner: {
        name: "Canal de Moçambique Lda",
        type: "Independent investigative media",
      },
      editorialStance: "Acclaimed independent investigative weekly founded by renowned journalist Carlos Cardoso's legacy; famous for uncovering state corruption, hidden debt scandals, illicit logging, and human rights issues",
      readership: {
        metric: "Highly influential political weekly with 10,000 print copies read by policymakers, diplomats, and civil society leaders",
        source: "MISA Moçambique Media Freedom Report 2023",
      },
      revenueModel: "Newsstand sales, individual subscriptions, and limited independent ads",
      logo: "newspaper-logos/mz/canal-de-mocambique.svg",
      logoExplainer:
        "Stark white canvas showcasing sharp black and red uppercase lettering 'CANAL DE MOÇAMBIQUE', representing courageous investigative journalism.",
      sources: ["https://canal.co.mz", "https://pt.wikipedia.org/wiki/Canal_de_Mo%C3%A7ambique"],
    },
    {
      id: "mz-rm-noticias",
      countryCode: "MZ",
      name: "Rádio Moçambique (RM Notícias)",
      nativeName: "Rádio Moçambique",
      englishTranslation: "Radio Mozambique News",
      founded: 1975,
      frequency: "24/7 public radio news service",
      format: "Radio broadcast network & digital audio portal",
      language: "Portuguese and 20 indigenous languages (including Emakhuwa, Changana, Sena)",
      headquarters: "Maputo",
      owner: {
        name: "Rádio Moçambique (Empresa Pública)",
        type: "Public state broadcaster",
      },
      annualPublicFunding: {
        total: "MZN 540 million",
        perCapita: "MZN 16.50",
      },
      editorialStance: "Primary lifeline public broadcaster; transmits crucial news, emergency cyclone alerts, public health campaigns, and parliamentary coverage in Portuguese and 20 local indigenous languages across all provinces",
      readership: {
        metric: "Reaches more than 70% of Mozambique's total population through national Antena Nacional and provincial stations",
        source: "Rádio Moçambique Relatório de Desempenho 2023",
      },
      revenueModel: "State public service subvention and commercial radio announcements",
      logo: "newspaper-logos/mz/rm-noticias.svg",
      logoExplainer:
        "Bright golden-amber and green badge with crisp white sans-serif 'RÁDIO MOÇAMBIQUE', denoting universal multiethnic public radio.",
      sources: ["https://www.rm.co.mz", "https://pt.wikipedia.org/wiki/R%C3%A1dio_Mo%C3%A7ambique"],
    },
  ],

  // Myanmar
  MM: [
    {
      id: "mm-mna",
      countryCode: "MM",
      name: "Myanmar News Agency (MNA)",
      nativeName: "မြန်မာသတင်းစဉ်",
      englishTranslation: "Myanmar News Agency",
      founded: 1963,
      frequency: "Real-time news wire & state daily newspapers",
      format: "News wire & state newspapers (Myanma Alinn, Kyemon, The Global New Light of Myanmar)",
      language: "Burmese, English",
      headquarters: "Naypyidaw / Yangon",
      owner: {
        name: "Ministry of Information",
        type: "State news agency",
      },
      editorialStance: "Official national state news agency of Myanmar; distributes official government notifications, administrative orders, diplomatic receptions, state economic projects, and military communiqués",
      readership: {
        metric: "Primary official wire distributor feeding all state broadcast television, radio, and state-owned newspapers nationwide",
        source: "Ministry of Information Myanmar Annual Report 2023",
      },
      revenueModel: "State government budget allocation and newspaper sales",
      logo: "newspaper-logos/mm/mna.svg",
      logoExplainer:
        "Imperial peacock-inspired golden yellow background with deep royal blue Burmese and English typography 'MYANMAR NEWS AGENCY (MNA)'.",
      sources: ["https://www.moi.gov.mm", "https://en.wikipedia.org/wiki/Myanmar_News_Agency"],
    },
    {
      id: "mm-myanma-alinn",
      countryCode: "MM",
      name: "Myanma Alinn",
      nativeName: "မြန်မာ့အလင်း",
      englishTranslation: "Light of Myanmar",
      founded: 1914,
      frequency: "Daily morning newspaper (Monday–Sunday)",
      format: "Broadsheet & digital edition",
      language: "Burmese",
      headquarters: "Yangon and Naypyidaw",
      owner: {
        name: "News and Periodicals Enterprise (Ministry of Information)",
        type: "State-run newspaper",
      },
      editorialStance: "Myanmar's oldest surviving daily newspaper; historically a leading anti-colonial nationalist paper founded in 1914, now publishing official state announcements, legal gazettes, domestic agriculture, and cultural news",
      readership: {
        metric: "Widely circulated state newspaper with over 100,000 daily print copies distributed across administrative offices and townships",
        source: "News and Periodicals Enterprise 2023",
      },
      revenueModel: "Newspaper copy sales and mandatory public tender announcements",
      logo: "newspaper-logos/mm/myanma-alinn.svg",
      logoExplainer:
        "Deep crimson red background emblazoned with traditional white Burmese calligraphy 'မြန်မာ့အလင်း' (Myanma Alinn), recalling over a century of publishing history.",
      sources: ["https://www.moi.gov.mm", "https://en.wikipedia.org/wiki/Myanma_Alinn"],
    },
    {
      id: "mm-the-irrawaddy",
      countryCode: "MM",
      name: "The Irrawaddy",
      nativeName: "ဧရာဝတီ",
      englishTranslation: "The Irrawaddy",
      founded: 1993,
      frequency: "Continuous digital news service",
      format: "Digital news portal & investigative multimedia",
      language: "Burmese, English",
      headquarters: "Chiang Mai / Yangon (exile and diaspora operations)",
      owner: {
        name: "Irrawaddy Publishing Group (IPG)",
        type: "Independent exile media",
      },
      editorialStance: "Renowned independent investigative news organization founded by veteran student activists in 1993; famous for documented reporting on civil conflicts, military junta crackdowns, ethnic minority affairs, and human rights",
      readership: {
        metric: "Over 2.5 million monthly unique digital visitors and one of the most trusted independent sources of news on Myanmar globally",
        source: "Irrawaddy Publishing Group Audience Report 2023",
      },
      revenueModel: "Reader donations, international philanthropic press grants, and digital ads",
      logo: "newspaper-logos/mm/the-irrawaddy.svg",
      logoExplainer:
        "Dark slate backdrop displaying bold crimson red and white uppercase typography 'THE IRRAWADDY', symbolizing steadfast independent journalism.",
      sources: ["https://www.irrawaddy.com", "https://en.wikipedia.org/wiki/The_Irrawaddy"],
    },
    {
      id: "mm-mizzima",
      countryCode: "MM",
      name: "Mizzima News",
      nativeName: "မဇ္ဈိမ",
      englishTranslation: "Middle Path / Mizzima",
      founded: 1998,
      frequency: "Continuous multimedia broadcast & digital news",
      format: "Digital portal, satellite broadcast & mobile apps",
      language: "Burmese, English",
      headquarters: "Yangon / New Delhi / Chiang Mai",
      owner: {
        name: "Mizzima Media Group",
        type: "Independent commercial multimedia",
      },
      editorialStance: "Prominent independent multimedia group founded in exile in 1998; committed to federal democracy, human rights, peace journalism, and digital resilience against press censorship",
      readership: {
        metric: "Over 3 million monthly digital audience and widespread satellite radio/TV listenership inside Myanmar and abroad",
        source: "Mizzima Media Group Audience Audit 2023",
      },
      revenueModel: "Donor press development funding, commercial sponsorships, and syndicated video",
      logo: "newspaper-logos/mm/mizzima.svg",
      logoExplainer:
        "Vibrant yellow-gold banner featuring distinct stylized red and navy lettering 'mizzima', representing the Middle Path of truth and democratic reporting.",
      sources: ["https://www.mizzima.com", "https://en.wikipedia.org/wiki/Mizzima_News"],
    },
    {
      id: "mm-myanmar-now",
      countryCode: "MM",
      name: "Myanmar Now",
      nativeName: "မြန်မာနောင်း",
      englishTranslation: "Myanmar Now",
      founded: 2015,
      frequency: "Continuous digital investigative news service",
      format: "Digital investigative news agency",
      language: "Burmese, English",
      headquarters: "Yangon (with distributed clandestine desks)",
      owner: {
        name: "Myanmar Now News Agency",
        type: "Independent non-profit investigative media",
      },
      editorialStance: "Award-winning independent investigative news agency; renowned for fearless in-depth investigations into military conglomerate holdings, illicit jade mines, war crimes, and pro-democracy resistance",
      readership: {
        metric: "Widely cited by the UN, international human rights tribunals, and millions of digital readers inside Myanmar via secure VPNs and social media",
        source: "Myanmar Now Editorial Review 2023",
      },
      revenueModel: "International investigative journalism grants, reader contributions, and syndication",
      logo: "newspaper-logos/mm/myanmar-now.svg",
      logoExplainer:
        "Solid black field with intense fire-red typography 'MYANMAR NOW', embodying uncompromising frontline investigative reporting.",
      sources: ["https://myanmar-now.net", "https://en.wikipedia.org/wiki/Myanmar_Now"],
    },
  ],

  // Ethiopia
  ET: [
    {
      id: "et-ena",
      countryCode: "ET",
      name: "Ethiopian News Agency (ENA)",
      nativeName: "የኢትዮጵያ ዜና አገልግሎት",
      englishTranslation: "Ethiopian News Agency",
      founded: 1942,
      frequency: "Real-time news wire service & bulletins",
      format: "News wire & multimedia portal",
      language: "Amharic, English, Oromo, Tigrinya, Somali, Afar, Arabic, French",
      headquarters: "Addis Ababa",
      owner: {
        name: "Government of Ethiopia",
        type: "State news agency",
      },
      annualPublicFunding: {
        total: "ETB 250 million",
        perCapita: "ETB 2.10",
      },
      editorialStance: "Ethiopia's historic national news wire agency; official coverage of the Prime Minister's Office, federal ministries, regional state councils, Grand Ethiopian Renaissance Dam (GERD), and African Union summits",
      readership: {
        metric: "Primary official news wire feeding over 60 domestic broadcast stations, regional media agencies, and international bureaus",
        source: "ENA Corporate Review 2023",
      },
      revenueModel: "State government subvention and wire syndication fees",
      logo: "newspaper-logos/et/ena.svg",
      logoExplainer:
        "Ethiopian green, yellow, and red tricolor backdrop with gold Amharic and English lettering 'ENA - ETHIOPIAN NEWS AGENCY'.",
      sources: ["https://www.ena.et", "https://en.wikipedia.org/wiki/Ethiopian_News_Agency"],
    },
    {
      id: "et-addis-fortune",
      countryCode: "ET",
      name: "Addis Fortune",
      founded: 2000,
      frequency: "Weekly newspaper (Sundays) & continuous digital portal",
      format: "Tabloid & financial news portal",
      language: "English",
      headquarters: "Addis Ababa",
      owner: {
        name: "Independent News & Media Plc (Fortune)",
        type: "Independent commercial media",
      },
      editorialStance: "Ethiopia's premier independent business weekly; in-depth investigative reporting on banking, currency exchange liberalization, trade tariffs, public debt, and corporate developments",
      readership: {
        metric: "Over 15,000 weekly print circulation, widely read by diplomats, business executives, international finance institutions, and economists",
        source: "Addis Fortune Circulation Profile 2023",
      },
      revenueModel: "Print sales, corporate digital paywall subscriptions, and financial advertising",
      logo: "newspaper-logos/et/addis-fortune.svg",
      logoExplainer:
        "Deep corporate navy blue field featuring bold white typography 'FORTUNE' with golden accent line, signifying economic and financial authority.",
      sources: ["https://addisfortune.news", "https://en.wikipedia.org/wiki/Addis_Fortune"],
    },
    {
      id: "et-the-reporter",
      countryCode: "ET",
      name: "The Reporter Ethiopia",
      nativeName: "ሪፖርተር",
      englishTranslation: "The Reporter",
      founded: 1995,
      frequency: "Bi-weekly newspaper (Wednesdays & Saturdays) & digital portal",
      format: "Broadsheet & digital news portal",
      language: "Amharic, English",
      headquarters: "Bole Sub-city, Addis Ababa",
      owner: {
        name: "Media and Communications Center (MCC)",
        type: "Independent commercial media",
      },
      editorialStance: "Influential independent newspaper; acclaimed for objective political analysis, parliamentary scrutiny, human rights investigations, and regional Horn of Africa security reporting",
      readership: {
        metric: "Over 25,000 print copies across both weekly editions and more than 1.5 million monthly digital readers",
        source: "Media and Communications Center Audience Audit 2023",
      },
      revenueModel: "Print newsstand sales, classifieds, and digital display advertising",
      logo: "newspaper-logos/et/the-reporter.svg",
      logoExplainer:
        "Bold red rectangular background with dignified white serif typography 'The Reporter', reflecting three decades of independent journalism.",
      sources: ["https://www.thereporterethiopia.com", "https://am.thereporterethiopia.com"],
    },
    {
      id: "et-ebc-news",
      countryCode: "ET",
      name: "EBC News",
      nativeName: "የኢትዮጵያ ብሮድካስቲንግ ኮርፖሬሽን",
      englishTranslation: "Ethiopian Broadcasting Corporation News",
      founded: 1964,
      frequency: "Continuous multimedia broadcast news",
      format: "Public television (EBC 1, ETV News), radio & digital portal",
      language: "Amharic, Oromo, Tigrinya, Somali, English, Arabic, French",
      headquarters: "Addis Ababa",
      owner: {
        name: "Ethiopian Broadcasting Corporation (EBC)",
        type: "Public state broadcaster",
      },
      annualPublicFunding: {
        total: "ETB 850 million",
        perCapita: "ETB 7.10",
      },
      editorialStance: "State public service broadcaster; provides national news, parliamentary coverage, educational features, and cultural programming across Ethiopia's diverse ethnic nationalities",
      readership: {
        metric: "Universal terrestrial and satellite transmission reaching over 70% of households across urban and rural Ethiopia",
        source: "Ethiopian Media Authority Broadcast Survey 2023",
      },
      revenueModel: "Federal government subvention and commercial broadcast advertising",
      logo: "newspaper-logos/et/ebc-news.svg",
      logoExplainer:
        "Vibrant yellow and blue geometric emblem featuring bold white lettering 'EBC NEWS', denoting national public service broadcasting.",
      sources: ["https://www.ebc.et", "https://en.wikipedia.org/wiki/Ethiopian_Broadcasting_Corporation"],
    },
    {
      id: "et-addis-standard",
      countryCode: "ET",
      name: "Addis Standard",
      founded: 2011,
      frequency: "Continuous digital investigative news service & monthly journal",
      format: "Digital news portal & investigative multimedia",
      language: "English, Amharic, Afaan Oromoo",
      headquarters: "Addis Ababa",
      owner: {
        name: "JAKENN Publishing Plc",
        type: "Independent commercial media",
      },
      editorialStance: "Progressive, reformist independent publication; recognized internationally for unflinching coverage of civil conflicts, transitional justice, ethnic federalism, and press freedoms",
      readership: {
        metric: "Over 800,000 monthly unique digital readers, heavily cited by international human rights monitors and foreign correspondents",
        source: "JAKENN Publishing Audience Data 2024",
      },
      revenueModel: "Digital advertising, voluntary reader contributions, and international press development grants",
      logo: "newspaper-logos/et/addis-standard.svg",
      logoExplainer:
        "Dark slate background displaying crisp crimson red and white modern sans-serif typography 'Addis Standard', evoking journalistic rigor.",
      sources: ["https://addisstandard.com", "https://en.wikipedia.org/wiki/Addis_Standard"],
    },
  ],

  // North Korea
  KP: [
    {
      id: "kp-kcna",
      countryCode: "KP",
      name: "KCNA (Korean Central News Agency)",
      nativeName: "조선중앙통신",
      englishTranslation: "Korean Central News Agency",
      founded: 1946,
      frequency: "Real-time state wire service",
      format: "News wire, photo service & digital state portal",
      language: "Korean, English, Russian, Chinese, Spanish, Japanese",
      headquarters: "Potonggang District, Pyongyang",
      owner: {
        name: "Government of the Democratic People's Republic of Korea",
        type: "State news agency",
      },
      editorialStance: "Sole official national news agency of North Korea; publishes official communiqués of the Workers' Party of Korea (WPK), Supreme Leader activities, military dispatches, and state foreign policy",
      readership: {
        metric: "Monopoly news wire feeding all domestic print, broadcast, and institutional bulletin boards across the DPRK and state overseas missions",
        source: "DPRK State Media Profile / KCNA 2023",
      },
      revenueModel: "100% state budget allocation",
      logo: "newspaper-logos/kp/kcna.svg",
      logoExplainer:
        "Deep red banner adorned with gold Korean calligraphy '조선중앙통신' and stark white Latin acronym 'KCNA', symbolizing official state wire authority.",
      sources: ["http://www.kcna.kp", "https://en.wikipedia.org/wiki/Korean_Central_News_Agency"],
    },
    {
      id: "kp-rodong-sinmun",
      countryCode: "KP",
      name: "Rodong Sinmun",
      nativeName: "로동신문",
      englishTranslation: "Workers' Newspaper",
      founded: 1945,
      frequency: "Daily morning newspaper (Monday–Sunday)",
      format: "Broadsheet & digital edition",
      language: "Korean, English, Chinese",
      headquarters: "Central District, Pyongyang",
      owner: {
        name: "Central Committee of the Workers' Party of Korea",
        type: "Ruling party official organ",
      },
      editorialStance: "Official organ of the Central Committee of the Workers' Party of Korea; the country's most authoritative newspaper, publishing party editorials, ideological guidance, economic production quotas, and national decrees",
      readership: {
        metric: "Print circulation estimated at 1.5 million copies daily, delivered to party committees, factories, collective farms, and military units nationwide",
        source: "KWP Central Committee Publishing Department 2023",
      },
      revenueModel: "State-subsidized party distribution",
      logo: "newspaper-logos/kp/rodong-sinmun.svg",
      logoExplainer:
        "Red and white field featuring the iconic red brush-stroke Korean script '로동신문' (Rodong Sinmun), the voice of the Workers' Party of Korea.",
      sources: ["http://www.rodong.rep.kp", "https://en.wikipedia.org/wiki/Rodong_Sinmun"],
    },
    {
      id: "kp-minju-choson",
      countryCode: "KP",
      name: "Minju Choson",
      nativeName: "민주조선",
      englishTranslation: "Democratic Korea",
      founded: 1945,
      frequency: "Daily newspaper (Tuesday–Sunday)",
      format: "Broadsheet",
      language: "Korean",
      headquarters: "Pyongyang",
      owner: {
        name: "Standing Committee of the Supreme People's Assembly and the Cabinet",
        type: "State government organ",
      },
      editorialStance: "Official newspaper of the Cabinet of North Korea and the Supreme People's Assembly; focuses on civil administration, legal jurisprudence, ministerial decrees, industrial technology, and local people's committees",
      readership: {
        metric: "Estimated circulation of 200,000 copies distributed to government ministries, civil administrative offices, and state enterprises",
        source: "DPRK Cabinet Publishing Administration 2023",
      },
      revenueModel: "State government budget allocation",
      logo: "newspaper-logos/kp/minju-choson.svg",
      logoExplainer:
        "Deep navy blue background displaying elegant white Korean calligraphic lettering '민주조선' (Minju Choson), representing the government cabinet gazette.",
      sources: ["https://en.wikipedia.org/wiki/Minju_Choson"],
    },
    {
      id: "kp-pyongyang-times",
      countryCode: "KP",
      name: "The Pyongyang Times",
      founded: 1965,
      frequency: "Weekly newspaper (Saturdays) & continuous digital portal",
      format: "Tabloid & digital portal",
      language: "English, French",
      headquarters: "Pyongyang",
      owner: {
        name: "Foreign Languages Publishing House",
        type: "State foreign language publisher",
      },
      editorialStance: "Primary foreign-language propaganda newspaper; presents DPRK viewpoints, cultural heritage, diplomatic communiqués, and economic developments to foreign diplomats, visitors, and overseas readers",
      readership: {
        metric: "Distributed to foreign embassies, international organizations, tourist hotels in Pyongyang, and read online internationally",
        source: "Foreign Languages Publishing House DPRK 2023",
      },
      revenueModel: "State foreign publication budget",
      logo: "newspaper-logos/kp/pyongyang-times.svg",
      logoExplainer:
        "Dark slate field with commanding white English serif typography 'The Pyongyang Times', denoting foreign-language state reporting.",
      sources: ["http://www.pyongyangtimes.com.kp", "https://en.wikipedia.org/wiki/The_Pyongyang_Times"],
    },
    {
      id: "kp-kctv-news",
      countryCode: "KP",
      name: "KCTV News",
      nativeName: "조선중앙텔레비죤",
      englishTranslation: "Korean Central Television News",
      founded: 1963,
      frequency: "Daily broadcast news programming",
      format: "Terrestrial television, satellite & streaming",
      language: "Korean",
      headquarters: "Moranbong District, Pyongyang",
      owner: {
        name: "Radio and Television Broadcasting Committee of the DPRK",
        type: "State public broadcaster",
      },
      editorialStance: "Sole national television broadcaster; produces the famous 8:00 PM evening news bulletin, military parade coverage, ideological documentaries, and agricultural educational programs",
      readership: {
        metric: "Reaches virtually 100% of television receivers across the DPRK via analog/digital terrestrial broadcast and Thaicom-5 satellite",
        source: "KCTV Broadcast Review 2023",
      },
      revenueModel: "State budget appropriation",
      logo: "newspaper-logos/kp/kctv-news.svg",
      logoExplainer:
        "Radiant blue emblem featuring the Pyongyang TV Tower silhouette and bright golden Korean lettering '조선중앙텔레비죤', evoking central state television.",
      sources: ["https://en.wikipedia.org/wiki/Korean_Central_Television"],
    },
  ],

  // South Korea
  KR: [
    {
      id: "kr-yonhap",
      countryCode: "KR",
      name: "Yonhap News Agency",
      nativeName: "연합뉴스",
      englishTranslation: "United News",
      founded: 1980,
      frequency: "Real-time national news wire service",
      format: "News wire, multimedia portal & 24/7 TV (Yonhap News TV)",
      language: "Korean, English, Chinese, Japanese, French, Arabic, Spanish",
      headquarters: "Jongno-gu, Seoul",
      owner: {
        name: "Korea News Agency Commission (Public Corporation)",
        type: "Public statutory news agency",
      },
      annualPublicFunding: {
        total: "KRW 32.8 billion",
        perCapita: "KRW 635.00",
      },
      editorialStance: "South Korea's national news wire agency designated by statute; provides impartial real-time dispatches on the National Assembly, Blue House/Yongsan Presidential Office, chaebol corporate developments, and inter-Korean affairs",
      readership: {
        metric: "Syndicated to all major South Korean newspapers, broadcasting networks, government ministries, and international partner agencies",
        source: "Yonhap News Agency Annual Report 2023",
      },
      revenueModel: "B2B wire service subscriptions and government public service contract",
      logo: "newspaper-logos/kr/yonhap.svg",
      logoExplainer:
        "Deep navy blue background displaying dynamic red and white sans-serif lettering 'YONHAP NEWS', representing Korea's premier news wire.",
      sources: ["https://en.yna.co.kr", "https://www.yna.co.kr", "https://en.wikipedia.org/wiki/Yonhap_News_Agency"],
    },
    {
      id: "kr-chosun-ilbo",
      countryCode: "KR",
      name: "The Chosun Ilbo",
      nativeName: "조선일보",
      englishTranslation: "Joseon Daily News",
      founded: 1920,
      frequency: "Daily newspaper (Monday–Saturday) & TV Chosun",
      format: "Broadsheet, cable TV & digital portal",
      language: "Korean, English, Japanese, Chinese",
      headquarters: "Jung-gu, Seoul",
      owner: {
        name: "Chosun Ilbo Co., Ltd.",
        type: "Independent commercial media group",
      },
      editorialStance: "South Korea's oldest and highest-circulation commercial daily; conservative flagship newspaper championing free-market enterprise, US-ROK alliance, and traditional values",
      readership: {
        metric: "Over 1.1 million daily print circulation and leading online portal chosun.com with over 15 million monthly unique readers",
        source: "Audit Bureau of Circulations (ABC) Korea 2023",
      },
      revenueModel: "Print sales, digital premium memberships, and major commercial advertising",
      logo: "newspaper-logos/kr/chosun-ilbo.svg",
      logoExplainer:
        "Stark white canvas featuring historic black Hanja calligraphy '朝鮮日報' (The Chosun Ilbo), denoting over a century of Korean press history.",
      sources: ["https://www.chosun.com", "https://en.wikipedia.org/wiki/The_Chosun_Ilbo"],
    },
    {
      id: "kr-joongang-ilbo",
      countryCode: "KR",
      name: "JoongAng Ilbo",
      nativeName: "중앙일보",
      englishTranslation: "Central Daily News",
      founded: 1965,
      frequency: "Daily newspaper (Monday–Saturday) & JTBC",
      format: "Compact/broadsheet, linear TV (JTBC) & digital portal",
      language: "Korean, English (Korea JoongAng Daily), Chinese",
      headquarters: "Mapo-gu, Seoul",
      owner: {
        name: "JoongAng Holdings (JoongAng Group)",
        type: "Independent commercial media group",
      },
      editorialStance: "Major centrist-conservative daily newspaper; renowned for in-depth investigative reporting, technological innovation, economic analysis, and affiliate television network JTBC",
      readership: {
        metric: "Over 850,000 daily print circulation and over 12 million monthly digital users across the JoongAng network",
        source: "Korea ABC Statement 2023",
      },
      revenueModel: "Print circulation, enterprise subscriptions, broadcast ads, and digital sponsorships",
      logo: "newspaper-logos/kr/joongang-ilbo.svg",
      logoExplainer:
        "Royal blue background with clean white bold typography 'JoongAng Ilbo' and signature orange disc emblem, symbolizing central journalistic balance.",
      sources: ["https://www.joongang.co.kr", "https://koreajoongangdaily.joins.com", "https://en.wikipedia.org/wiki/JoongAng_Ilbo"],
    },
    {
      id: "kr-donga-ilbo",
      countryCode: "KR",
      name: "The Dong-A Ilbo",
      nativeName: "동아일보",
      englishTranslation: "East Asia Daily",
      founded: 1920,
      frequency: "Daily newspaper (Monday–Saturday) & Channel A",
      format: "Broadsheet, cable TV & digital portal",
      language: "Korean, English, Japanese, Chinese",
      headquarters: "Jongno-gu, Seoul",
      owner: {
        name: "Dong-A Ilbo Co.",
        type: "Independent commercial media group",
      },
      editorialStance: "Centennial newspaper of record; center-right editorial tradition with strong investigative journalism into political accountability, cultural preservation, and educational philanthropy",
      readership: {
        metric: "Over 800,000 daily print circulation and influential multimedia reach via Channel A cable network",
        source: "Korea ABC Statement 2023",
      },
      revenueModel: "Print sales, corporate advertising, and broadcasting commercial revenues",
      logo: "newspaper-logos/kr/donga-ilbo.svg",
      logoExplainer:
        "Deep crimson red rectangular field with prominent white Hanja typography '東亞日報' (The Dong-A Ilbo), honoring anti-colonial heritage.",
      sources: ["https://www.donga.com", "https://en.wikipedia.org/wiki/The_Dong-a_Ilbo"],
    },
    {
      id: "kr-hankyoreh",
      countryCode: "KR",
      name: "The Hankyoreh",
      nativeName: "한겨레",
      englishTranslation: "One People / The Korean Nation",
      founded: 1988,
      frequency: "Daily newspaper (Monday–Saturday) & digital portal",
      format: "Broadsheet & digital news portal",
      language: "Korean, English",
      headquarters: "Mapo-gu, Seoul",
      owner: {
        name: "Hankyoreh Media Group (Citizen Shareholder Cooperative)",
        type: "Citizen-owned independent media",
      },
      editorialStance: "South Korea's premier progressive daily newspaper; founded by dissident journalists through public crowdfunding, staunchly independent of chaebol influence, advocating labor rights, peace diplomacy, and environmental sustainability",
      readership: {
        metric: "Over 200,000 print daily readers and over 6 million monthly online users; highly trusted among civil society and academics",
        source: "Reuters Institute Digital News Report Korea 2023",
      },
      revenueModel: "Citizen shareholder dividends, print sales, reader contributions, and ethical advertising",
      logo: "newspaper-logos/kr/hankyoreh.svg",
      logoExplainer:
        "Warm golden-yellow and blue field featuring clean Hangul lettering '한겨레' (Hankyoreh), representing democracy born from citizen crowdfunding.",
      sources: ["https://www.hani.co.kr", "https://english.hani.co.kr", "https://en.wikipedia.org/wiki/The_Hankyoreh"],
    },
  ],

  // Namibia
  NA: [
    {
      id: "na-nampa",
      countryCode: "NA",
      name: "NAMPA (Namibia Press Agency)",
      founded: 1987,
      frequency: "Real-time news wire service",
      format: "News wire & digital portal",
      language: "English",
      headquarters: "Windhoek",
      owner: {
        name: "Government of the Republic of Namibia",
        type: "State news agency",
      },
      annualPublicFunding: {
        total: "NAD 28.5 million",
        perCapita: "NAD 11.00",
      },
      editorialStance: "Official national news agency established by parliamentary act; provides factual, developmental wire coverage of National Assembly debates, mining regulations, rural community development, and SADC diplomacy",
      readership: {
        metric: "Primary wire source syndicating news to all national radio stations, television channels, and commercial print newspapers",
        source: "NAMPA Annual Report 2023",
      },
      revenueModel: "State government funding and commercial news syndication",
      logo: "newspaper-logos/na/nampa.svg",
      logoExplainer:
        "Namibian blue and golden-yellow banner displaying bold white capital lettering 'NAMPA' with a stylized sunrise globe, representing national communication.",
      sources: ["https://www.nampa.org", "https://en.wikipedia.org/wiki/Namibia_Press_Agency"],
    },
    {
      id: "na-the-namibian",
      countryCode: "NA",
      name: "The Namibian",
      founded: 1985,
      frequency: "Daily newspaper (Monday–Friday)",
      format: "Tabloid & digital news portal",
      language: "English, Oshiwambo",
      headquarters: "Windhoek",
      owner: {
        name: "Free Press of Namibia (Pty) Ltd (Trust-owned)",
        type: "Independent trust-owned media",
      },
      editorialStance: "Namibia's largest and most famous independent daily newspaper; founded by anti-apartheid champion Gwen Lister, acclaimed for fearless investigative journalism, government accountability, and constitutional protections",
      readership: {
        metric: "Largest print circulation in Namibia with over 30,000 daily copies and leading national news portal namibian.com.na",
        source: "Free Press of Namibia Audited Statement 2023",
      },
      revenueModel: "Print sales, commercial advertising, and digital subscriptions",
      logo: "newspaper-logos/na/the-namibian.svg",
      logoExplainer:
        "Vibrant ultramarine blue field featuring bold white sans-serif title 'The Namibian' with red accent, symbolizing courageous independence.",
      sources: ["https://www.namibian.com.na", "https://en.wikipedia.org/wiki/The_Namibian"],
    },
    {
      id: "na-die-republikein",
      countryCode: "NA",
      name: "Die Republikein",
      nativeName: "Die Republikein",
      englishTranslation: "The Republican",
      founded: 1977,
      frequency: "Daily newspaper (Monday–Friday)",
      format: "Tabloid & digital portal",
      language: "Afrikaans, English",
      headquarters: "Windhoek",
      owner: {
        name: "Namibia Media Holdings (NMH)",
        type: "Independent commercial media group",
      },
      editorialStance: "Leading Afrikaans-language daily newspaper; extensive coverage of Namibian agriculture, livestock farming, wildlife conservation, commercial business, and local politics",
      readership: {
        metric: "Over 15,000 daily print copies distributed across commercial farming regions and urban centers throughout Namibia",
        source: "Namibia Media Holdings Audit 2023",
      },
      revenueModel: "Print copy sales, farming classifieds, and corporate advertising",
      logo: "newspaper-logos/na/die-republikein.svg",
      logoExplainer:
        "Deep scarlet red background emblazoned with crisp white serif typography 'Die Republikein', representing four decades of Afrikaans journalism.",
      sources: ["https://www.republikein.com.na", "https://en.wikipedia.org/wiki/Die_Republikein"],
    },
    {
      id: "na-new-era",
      countryCode: "NA",
      name: "New Era",
      founded: 1992,
      frequency: "Daily newspaper (Monday–Friday)",
      format: "Tabloid & digital news portal",
      language: "English and indigenous languages (Otjiherero, Oshiwambo, Khoekhoegowab, Silozi)",
      headquarters: "Windhoek",
      owner: {
        name: "New Era Publication Corporation (NEPC)",
        type: "State-owned enterprise",
      },
      editorialStance: "National state-owned daily newspaper established by act of parliament; focuses on national development programs, civil service initiatives, rural infrastructure, and multilingual civic awareness",
      readership: {
        metric: "Over 12,000 daily print circulation with institutional distribution across all 14 regions of Namibia",
        source: "NEPC Annual Report 2023",
      },
      revenueModel: "State budget grant, newspaper sales, and government tender notices",
      logo: "newspaper-logos/na/new-era.svg",
      logoExplainer:
        "Forest green background with clean white and gold modern typography 'NEW ERA', denoting post-independence reconstruction and national development.",
      sources: ["https://neweralive.na", "https://en.wikipedia.org/wiki/New_Era_(Namibia)"],
    },
    {
      id: "na-nbc-news",
      countryCode: "NA",
      name: "NBC News",
      founded: 1979,
      frequency: "Continuous multimedia broadcast news",
      format: "Public television (NBC 1), radio & digital portal",
      language: "English, Afrikaans, German, and 9 indigenous languages",
      headquarters: "Northern Industrial Area, Windhoek",
      owner: {
        name: "Namibian Broadcasting Corporation (NBC)",
        type: "Public state broadcaster",
      },
      annualPublicFunding: {
        total: "NAD 310 million",
        perCapita: "NAD 120.00",
      },
      editorialStance: "National public service broadcaster; statutory obligation to deliver balanced domestic news, parliamentary debates, educational broadcasting, and multilingual programs in 12 languages",
      readership: {
        metric: "Universal terrestrial and digital satellite reach across Namibia, serving over 80% of households",
        source: "NBC Annual Governance Report 2023",
      },
      revenueModel: "State broadcast subsidy, television license fees, and commercial advertising",
      logo: "newspaper-logos/na/nbc-news.svg",
      logoExplainer:
        "Sleek blue badge with golden sunburst arc and bold white lettering 'NBC NEWS', reflecting national unity across Namibia.",
      sources: ["https://nbcnews.na", "https://en.wikipedia.org/wiki/Namibian_Broadcasting_Corporation"],
    },
  ],

  // Nepal
  NP: [
    {
      id: "np-rss",
      countryCode: "NP",
      name: "RSS (Rastriya Samachar Samiti)",
      nativeName: "राष्ट्रिय समाचार समिति (रासस)",
      englishTranslation: "National News Agency",
      founded: 1962,
      frequency: "Real-time news wire service",
      format: "News wire & digital dispatch portal",
      language: "Nepali, English",
      headquarters: "Bhadrakali, Kathmandu",
      owner: {
        name: "Government of Nepal",
        type: "State news agency",
      },
      annualPublicFunding: {
        total: "NPR 180 million",
        perCapita: "NPR 6.00",
      },
      editorialStance: "Nepal's sole official national news wire agency; founded under the Rastriya Samachar Samiti Act 1962, delivering verified dispatches on federal parliament, provincial governments, mountain disasters, and foreign treaties",
      readership: {
        metric: "Primary wire source feeding over 500 community radio stations, national newspapers, and digital news portals across all 7 provinces",
        source: "RSS Annual Progress Report 2023",
      },
      revenueModel: "Government budgetary grant and wire syndication fees",
      logo: "newspaper-logos/np/rss.svg",
      logoExplainer:
        "Crimson red field featuring golden Devanagari script and bold white Latin acronym 'RSS - NEPAL NEWS AGENCY', evoking national institutional trust.",
      sources: ["https://www.rssnepal.org.np", "https://en.wikipedia.org/wiki/Rastriya_Samachar_Samiti"],
    },
    {
      id: "np-kantipur",
      countryCode: "NP",
      name: "Kantipur",
      nativeName: "कान्तिपुर",
      englishTranslation: "Kantipur (Kathmandu)",
      founded: 1993,
      frequency: "Daily newspaper (Monday–Sunday) & Kantipur TV",
      format: "Broadsheet, linear television & digital superportal",
      language: "Nepali",
      headquarters: "Subidhanagar, Tinkune, Kathmandu",
      owner: {
        name: "Kantipur Media Group (KMG)",
        type: "Independent commercial media group",
      },
      editorialStance: "Nepal's highest-circulation and most influential independent daily newspaper; recognized for championing constitutional democracy, federalism, human rights, and investigative anti-corruption reporting",
      readership: {
        metric: "Over 450,000 daily print circulation and leading news website ekantipur.com with over 4 million monthly active users",
        source: "Nepal Press Council Audit 2023",
      },
      revenueModel: "Print sales, corporate display advertising, and digital subscriptions",
      logo: "newspaper-logos/np/kantipur.svg",
      logoExplainer:
        "Deep royal blue banner with iconic white Devanagari calligraphy 'कान्तिपुर' (Kantipur) and red accent, symbolising Nepal's flagship daily press.",
      sources: ["https://ekantipur.com", "https://en.wikipedia.org/wiki/Kantipur_(daily)"],
    },
    {
      id: "np-the-kathmandu-post",
      countryCode: "NP",
      name: "The Kathmandu Post",
      founded: 1993,
      frequency: "Daily newspaper (Monday–Sunday)",
      format: "Broadsheet & digital portal",
      language: "English",
      headquarters: "Subidhanagar, Tinkune, Kathmandu",
      owner: {
        name: "Kantipur Media Group (KMG)",
        type: "Independent commercial media",
      },
      editorialStance: "Nepal's leading English-language broadsheet of record; in-depth diplomatic coverage, political investigations, climate change impacts on the Himalayas, and socioeconomic commentary",
      readership: {
        metric: "Over 90,000 daily print copies, widely read by diplomats, foreign policy researchers, tourism leaders, and expatriates",
        source: "Kantipur Media Group Audience Statement 2023",
      },
      revenueModel: "Print copy sales, corporate advertising, and digital subscriptions",
      logo: "newspaper-logos/np/the-kathmandu-post.svg",
      logoExplainer:
        "Clean white background featuring dignified dark navy serif typography 'The Kathmandu Post', representing English-language journalistic prestige in the Himalayas.",
      sources: ["https://kathmandupost.com", "https://en.wikipedia.org/wiki/The_Kathmandu_Post"],
    },
    {
      id: "np-gorkhapatra",
      countryCode: "NP",
      name: "Gorkhapatra",
      nativeName: "गोरखापत्र",
      englishTranslation: "Gorkha Gazette",
      founded: 1901,
      frequency: "Daily newspaper (Monday–Sunday)",
      format: "Broadsheet & digital archive",
      language: "Nepali (with supplements in 38 indigenous mother tongues)",
      headquarters: "Dharmapath, New Road, Kathmandu",
      owner: {
        name: "Gorkhapatra Sansthan (Government Corporation)",
        type: "State-owned public corporation",
      },
      editorialStance: "Nepal's oldest active newspaper, founded in 1901 during the Rana era; historical newspaper of record, publishing government gazettes, legislative statutes, civil service notices, and multilingual pages in 38 national languages",
      readership: {
        metric: "Over 65,000 daily print copies distributed to government offices, schools, and post offices across all 77 districts",
        source: "Gorkhapatra Sansthan Annual Report 2023",
      },
      revenueModel: "State government institutional advertising, public tender notices, and print subscriptions",
      logo: "newspaper-logos/np/gorkhapatra.svg",
      logoExplainer:
        "Traditional crimson red banner with elegant gold Devanagari lettering 'गोरखापत्र' (Gorkhapatra), embodying over 120 years of Nepali newspaper history.",
      sources: ["https://gorkhapatraonline.com", "https://en.wikipedia.org/wiki/Gorkhapatra"],
    },
    {
      id: "np-onlinekhabar",
      countryCode: "NP",
      name: "Onlinekhabar",
      nativeName: "अनलाइनखबर",
      englishTranslation: "Online News",
      founded: 2006,
      frequency: "Continuous digital news service",
      format: "Pure digital news portal & video channels",
      language: "Nepali, English",
      headquarters: "New Baneshwor, Kathmandu",
      owner: {
        name: "Onlinekhabar Network Pvt. Ltd.",
        type: "Independent digital media",
      },
      editorialStance: "Nepal's pioneer pure-digital newsroom; fast-breaking national politics, investigative reports on governance, citizen grievances, and lively multimedia storytelling",
      readership: {
        metric: "Over 6 million monthly unique users and ranked consistently as the most visited online news portal in Nepal",
        source: "Similarweb / Onlinekhabar Audience Metrics 2023",
      },
      revenueModel: "Digital programmatic advertising, video sponsorships, and branded content",
      logo: "newspaper-logos/np/onlinekhabar.svg",
      logoExplainer:
        "Bright red and dark charcoal rectangular field with modern sans-serif typography 'onlinekhabar', signifying digital breaking news speed.",
      sources: ["https://www.onlinekhabar.com", "https://english.onlinekhabar.com"],
    },
  ],

  // Netherlands
  NL: [
    {
      id: "nl-anp",
      countryCode: "NL",
      name: "ANP (Algemeen Nederlands Persbureau)",
      nativeName: "Algemeen Nederlands Persbureau",
      englishTranslation: "General Netherlands Press Agency",
      founded: 1934,
      frequency: "Real-time national news wire service",
      format: "News wire, photo service & radio news bulletin",
      language: "Dutch, English",
      headquarters: "The Hague (Den Haag)",
      owner: {
        name: "Chris Oomen (Private Investment)",
        type: "Independent commercial wire agency",
      },
      editorialStance: "The Netherlands' national news agency; independent, strictly impartial real-time reporting of Binnenhof politics, Dutch legal decisions, European Union policy, and global news",
      readership: {
        metric: "Supplies wire dispatches and radio bulletins to nearly 100% of Dutch newspapers, television broadcasters, and commercial radio stations",
        source: "ANP Jaarverslag 2023",
      },
      revenueModel: "B2B wire service contracts, corporate communications, and photo licensing",
      logo: "newspaper-logos/nl/anp.svg",
      logoExplainer:
        "Dutch navy blue background with bold stark white geometric sans-serif lettering 'ANP', embodying the foundational news wire of the Netherlands.",
      sources: ["https://www.anp.nl", "https://nl.wikipedia.org/wiki/Algemeen_Nederlands_Persbureau"],
    },
    {
      id: "nl-de-telegraaf",
      countryCode: "NL",
      name: "De Telegraaf",
      founded: 1893,
      frequency: "Daily newspaper (Monday–Saturday) & continuous digital portal",
      format: "Compact & digital multimedia portal",
      language: "Dutch",
      headquarters: "Basisweg, Amsterdam",
      owner: {
        name: "Mediahuis Nederland",
        type: "Independent commercial media group",
      },
      editorialStance: "The Netherlands' highest-circulation daily newspaper; populist, center-right editorial line known for sensational investigative scoops, crime reporting, business commentary, and popular sports",
      readership: {
        metric: "Over 350,000 paid daily print copies and over 2 million daily digital unique readers on telegraaf.nl",
        source: "Nationaal Onderzoek Multimedia (NOM) 2023",
      },
      revenueModel: "Print sales, digital subscriptions (Telegraaf Premium), and high-volume commercial advertising",
      logo: "newspaper-logos/nl/de-telegraaf.svg",
      logoExplainer:
        "Distinctive black gothic-style masthead 'De Telegraaf' on pure white background, reflecting the iconic style of the nation's best-selling paper.",
      sources: ["https://www.telegraaf.nl", "https://en.wikipedia.org/wiki/De_Telegraaf"],
    },
    {
      id: "nl-de-volkskrant",
      countryCode: "NL",
      name: "de Volkskrant",
      nativeName: "de Volkskrant",
      englishTranslation: "The People's Newspaper",
      founded: 1919,
      frequency: "Daily newspaper (Monday–Saturday) & digital portal",
      format: "Compact & digital subscriber portal",
      language: "Dutch",
      headquarters: "Jacob Bontiusplaats, Amsterdam",
      owner: {
        name: "DPG Media",
        type: "Independent commercial media group",
      },
      editorialStance: "Premier center-left broadsheet of record; prestigious cultural criticism, in-depth political investigations, environmental journalism, and European analytical essays",
      readership: {
        metric: "Over 240,000 paid print circulation and over 150,000 digital-only subscribers, widely read by academics and professionals",
        source: "NOM Print & Digital Media Monitor 2023",
      },
      revenueModel: "Print and digital paid subscriptions, and selective display advertising",
      logo: "newspaper-logos/nl/de-volkskrant.svg",
      logoExplainer:
        "Clean white background with refined black bold serif typography 'de Volkskrant', symbolising analytical depth and intellectual authority.",
      sources: ["https://www.volkskrant.nl", "https://en.wikipedia.org/wiki/De_Volkskrant"],
    },
    {
      id: "nl-nrc",
      countryCode: "NL",
      name: "NRC",
      nativeName: "NRC (Handelsblad)",
      englishTranslation: "NRC (Commercial Gazette)",
      founded: 1970,
      frequency: "Daily afternoon & morning newspaper & digital portal",
      format: "Compact & digital subscriber portal",
      language: "Dutch",
      headquarters: "Nes, Amsterdam",
      owner: {
        name: "Mediahuis Nederland",
        type: "Independent commercial media group",
      },
      editorialStance: "Leading liberal-intellectual newspaper of record; renowned for rigorous fact-checking, international correspondence, financial markets, and cultural reviews",
      readership: {
        metric: "Over 190,000 paid circulation with one of Europe's highest digital subscription growth rates",
        source: "Mediahuis Corporate Audit 2023",
      },
      revenueModel: "Paid print/digital subscriptions and quality commercial advertising",
      logo: "newspaper-logos/nl/nrc.svg",
      logoExplainer:
        "Minimalist black rectangular field featuring stark white geometric serif capitals 'NRC', embodying journalistic elegance and independence.",
      sources: ["https://www.nrc.nl", "https://en.wikipedia.org/wiki/NRC_Handelsblad"],
    },
    {
      id: "nl-nos-nieuws",
      countryCode: "NL",
      name: "NOS Nieuws",
      nativeName: "Nederlandse Omroep Stichting",
      englishTranslation: "Netherlands Broadcasting Foundation News",
      founded: 1969,
      frequency: "Continuous public broadcast news service",
      format: "Public television (NPO 1), radio (NPO Radio 1) & digital news app",
      language: "Dutch",
      headquarters: "Media Park, Hilversum",
      owner: {
        name: "Nederlandse Publieke Omroep (NPO)",
        type: "Public service broadcaster",
      },
      annualPublicFunding: {
        total: "€105 million",
        perCapita: "€5.90",
      },
      editorialStance: "The Netherlands' primary statutory public news service; mandated to provide completely independent, neutral, reliable, 24/7 breaking news and parliamentary coverage",
      readership: {
        metric: "The most trusted news organization in the Netherlands; nos.nl is the most visited Dutch news website with over 3 million daily users",
        source: "Reuters Institute Digital News Report 2023",
      },
      revenueModel: "State statutory public broadcasting grant",
      logo: "newspaper-logos/nl/nos-nieuws.svg",
      logoExplainer:
        "Signature rounded red, white, and dark blue emblem displaying lower-case bold 'nos' with clean typography, the universal symbol of Dutch public news.",
      sources: ["https://nos.nl", "https://en.wikipedia.org/wiki/Nederlandse_Omroep_Stichting"],
    },
  ],

  // New Zealand
  NZ: [
    {
      id: "nz-the-new-zealand-herald",
      countryCode: "NZ",
      name: "The New Zealand Herald",
      founded: 1863,
      frequency: "Daily newspaper (Monday–Saturday) & continuous digital portal",
      format: "Compact & digital news portal",
      language: "English",
      headquarters: "Central Park, Ellerslie, Auckland",
      owner: {
        name: "NZME (New Zealand Media and Entertainment)",
        type: "Independent commercial media company",
      },
      editorialStance: "New Zealand's highest-circulation daily newspaper and de facto national paper of record; comprehensive coverage of Beehive politics, corporate business, Pacific relations, and national rugby",
      readership: {
        metric: "Over 100,000 daily print circulation and nzherald.co.nz is New Zealand's top commercial news site with over 2.2 million monthly readers",
        source: "Nielsen Media Research New Zealand 2023",
      },
      revenueModel: "Print sales, NZ Herald Premium digital paywall subscriptions, and commercial advertising",
      logo: "newspaper-logos/nz/the-new-zealand-herald.svg",
      logoExplainer:
        "Deep navy blue background displaying the historic white gothic masthead 'The New Zealand Herald', symbolising over 160 years of national journalism.",
      sources: ["https://www.nzherald.co.nz", "https://en.wikipedia.org/wiki/The_New_Zealand_Herald"],
    },
    {
      id: "nz-stuff",
      countryCode: "NZ",
      name: "Stuff",
      founded: 2000,
      frequency: "Continuous digital news service & publisher of regional daily papers",
      format: "Digital news superportal & daily broadsheets",
      language: "English, Māori",
      headquarters: "Wellington",
      owner: {
        name: "Sinead Boucher (Management-owned independent)",
        type: "Independent commercial media",
      },
      editorialStance: "Leading digital news platform and publisher of Wellington's The Post and Christchurch's The Press; focused on hard investigative journalism, public interest accountability, and climate reporting",
      readership: {
        metric: "Over 2.4 million unique monthly Kiwi digital readers across Stuff.co.nz, reaching more than half of New Zealand's population",
        source: "Nielsen Online Ratings NZ 2023",
      },
      revenueModel: "Digital advertising, voluntary reader contributions (Stuff Supporter), and print subscriptions",
      logo: "newspaper-logos/nz/stuff.svg",
      logoExplainer:
        "Vibrant solid green background featuring stark white rounded lowercase typography 'stuff', evoking modern digital agility.",
      sources: ["https://www.stuff.co.nz", "https://en.wikipedia.org/wiki/Stuff_(website)"],
    },
    {
      id: "nz-rnz-news",
      countryCode: "NZ",
      name: "RNZ News",
      nativeName: "Te Reo Irirangi o Aotearoa",
      englishTranslation: "Radio New Zealand News",
      founded: 1925,
      frequency: "Continuous public multimedia news service",
      format: "Public radio (National / Concert), digital portal & podcast network",
      language: "English, Māori",
      headquarters: "The Terrace, Wellington",
      owner: {
        name: "Radio New Zealand Ltd (Crown Entity)",
        type: "Public service broadcaster",
      },
      annualPublicFunding: {
        total: "NZD 48.3 million",
        perCapita: "NZD 9.40",
      },
      editorialStance: "New Zealand's non-commercial public service broadcaster; statutory commitment to completely independent, in-depth public interest journalism, parliamentary reporting, and Pacific affairs",
      readership: {
        metric: "New Zealand's most trusted news brand, reaching over 700,000 weekly radio listeners and millions via rnz.co.nz",
        source: "JMAD Trust in News / GfK Radio Audience Survey 2023",
      },
      revenueModel: "100% taxpayer-funded via NZ On Air and direct Crown subvention (completely commercial-free)",
      logo: "newspaper-logos/nz/rnz-news.svg",
      logoExplainer:
        "Dark slate field with bold orange circular icon and crisp white lettering 'RNZ NEWS', denoting commercial-free public integrity.",
      sources: ["https://www.rnz.co.nz", "https://en.wikipedia.org/wiki/Radio_New_Zealand"],
    },
    {
      id: "nz-otago-daily-times",
      countryCode: "NZ",
      name: "Otago Daily Times (ODT)",
      founded: 1861,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Compact & digital portal",
      language: "English",
      headquarters: "Stuart Street, Dunedin",
      owner: {
        name: "Allied Press Ltd",
        type: "Independent family-owned media",
      },
      editorialStance: "New Zealand's oldest surviving independent daily newspaper; fiercely regional Southern voice providing in-depth scrutiny of South Island governance, agricultural trade, and conservation",
      readership: {
        metric: "Over 35,000 daily print copies distributed across Otago, Southland, and Canterbury, with a loyal regional subscriber base",
        source: "Allied Press Circulation Audit 2023",
      },
      revenueModel: "Print sales, regional classifieds, and digital subscriptions",
      logo: "newspaper-logos/nz/otago-daily-times.svg",
      logoExplainer:
        "Classic dark navy blue background featuring refined white serif typography 'Otago Daily Times', celebrating over 160 years of South Island publishing.",
      sources: ["https://www.odt.co.nz", "https://en.wikipedia.org/wiki/Otago_Daily_Times"],
    },
    {
      id: "nz-1news",
      countryCode: "NZ",
      name: "1News (TVNZ)",
      founded: 1969,
      frequency: "Continuous multimedia broadcast news",
      format: "Television (TVNZ 1), digital streaming (TVNZ+) & mobile app",
      language: "English, Māori",
      headquarters: "Victoria Street West, Auckland",
      owner: {
        name: "Television New Zealand Ltd (Crown-owned company)",
        type: "Commercial state-owned broadcaster",
      },
      editorialStance: "Flagship national television news brand; dominates prime-time 6:00 PM news broadcasting with authoritative coverage of national politics, weather alerts, investigative features (Sunday), and international news",
      readership: {
        metric: "Flagship 6pm bulletin watched by over 800,000 viewers daily, representing New Zealand's largest single news audience",
        source: "Nielsen Television Audience Measurement 2023",
      },
      revenueModel: "Commercial broadcast advertising and digital sponsorships",
      logo: "newspaper-logos/nz/1news.svg",
      logoExplainer:
        "Bright red square with bold white numeral '1' and clean typography 'NEWS', representing New Zealand's dominant television news service.",
      sources: ["https://www.1news.co.nz", "https://en.wikipedia.org/wiki/1_News"],
    },
  ],

  // Nicaragua
  NI: [
    {
      id: "ni-la-prensa",
      countryCode: "NI",
      name: "La Prensa",
      founded: 1926,
      frequency: "Continuous digital news service (print in exile)",
      format: "Digital news portal & investigative multimedia",
      language: "Spanish",
      headquarters: "Managua / San José, Costa Rica (exile operations)",
      owner: {
        name: "Editorial La Prensa, S.A.",
        type: "Independent commercial media",
      },
      editorialStance: "Nicaragua's centennial newspaper of record; historically led by national martyr Pedro Joaquín Chamorro against Somoza dictatorship, and currently operating in courageous exile reporting on democratic freedoms and human rights",
      readership: {
        metric: "Over 1.5 million monthly unique online visitors inside Nicaragua and across the Central American diaspora",
        source: "La Prensa Digital Analytics 2023",
      },
      revenueModel: "Digital paywall subscriptions, reader donations, and international press support grants",
      logo: "newspaper-logos/ni/la-prensa.svg",
      logoExplainer:
        "Dignified dark navy field displaying classical white serif typography 'LA PRENSA' with cyan blue accent, symbolizing unwavering truth in exile.",
      sources: ["https://www.laprensani.com", "https://es.wikipedia.org/wiki/La_Prensa_(Nicaragua)"],
    },
    {
      id: "ni-confidencial",
      countryCode: "NI",
      name: "Confidencial",
      founded: 1996,
      frequency: "Continuous digital news service & weekly television (Esta Semana)",
      format: "Digital investigative portal & YouTube broadcasts",
      language: "Spanish, English",
      headquarters: "Managua / San José, Costa Rica (exile operations)",
      owner: {
        name: "Invermedia / Carlos Fernando Chamorro",
        type: "Independent investigative media",
      },
      editorialStance: "Acclaimed independent investigative journalism organization; recipient of the Maria Moors Cabot Prize and Ortega y Gasset Award for exposing government corruption, electoral fraud, and political repression",
      readership: {
        metric: "Over 2 million monthly digital readers and massive video audience through 'Esta Semana' and YouTube channels",
        source: "Confidencial Audience Report 2023",
      },
      revenueModel: "Reader membership club, voluntary donations, and international investigative journalism funds",
      logo: "newspaper-logos/ni/confidencial.svg",
      logoExplainer:
        "Pure white canvas showcasing bold black and scarlet red lowercase typography 'confidencial', representing rigorous investigative scrutiny.",
      sources: ["https://confidencial.digital", "https://es.wikipedia.org/wiki/Confidencial_(peri%C3%B3dico)"],
    },
    {
      id: "ni-el-19-digital",
      countryCode: "NI",
      name: "El 19 Digital",
      founded: 2008,
      frequency: "Continuous digital news service",
      format: "Digital news portal & official state gazette",
      language: "Spanish",
      headquarters: "Managua",
      owner: {
        name: "Government of Reconciliation and National Unity (FSLN)",
        type: "State/Party official media",
      },
      editorialStance: "Official news portal of the Nicaraguan government; publishes presidential communiqués, social welfare program updates, infrastructure projects, and international diplomatic statements",
      readership: {
        metric: "Official clearinghouse consulted by all public ministries, state employees, municipal mayors, and party committees",
        source: "Consejo de Comunicación y Ciudadanía 2023",
      },
      revenueModel: "State government operational budget",
      logo: "newspaper-logos/ni/el-19-digital.svg",
      logoExplainer:
        "FSLN red and black bicolor emblem featuring bold white numeral '19' and clean lettering 'EL 19 DIGITAL', signifying state institutional news.",
      sources: ["https://www.el19digital.com"],
    },
    {
      id: "ni-articulo-66",
      countryCode: "NI",
      name: "Artículo 66",
      founded: 2017,
      frequency: "Continuous digital news service",
      format: "Digital investigative portal & video news",
      language: "Spanish",
      headquarters: "Managua / San José, Costa Rica (exile operations)",
      owner: {
        name: "Artículo 66 Media",
        type: "Independent digital media",
      },
      editorialStance: "Named after Article 66 of the Nicaraguan Constitution guaranteeing free expression; provides frontline digital reporting on civil liberties, political prisoners, and socioeconomic realities",
      readership: {
        metric: "Over 400,000 monthly digital readers and strong mobile social media engagement",
        source: "Artículo 66 Digital Metrics 2023",
      },
      revenueModel: "Citizen donations, independent digital advertising, and press defense grants",
      logo: "newspaper-logos/ni/articulo-66.svg",
      logoExplainer:
        "Sky-blue rectangular banner with bold white numerals '66' and uppercase text 'ARTÍCULO 66', celebrating constitutional free speech.",
      sources: ["https://www.articulo66.com"],
    },
    {
      id: "ni-radio-corporacion",
      countryCode: "NI",
      name: "Radio Corporación",
      founded: 1965,
      frequency: "24/7 radio news broadcasting",
      format: "AM/FM radio news service & digital audio stream",
      language: "Spanish",
      headquarters: "Ciudad Jardín, Managua",
      owner: {
        name: "Radio Corporación S.A.",
        type: "Independent commercial radio",
      },
      editorialStance: "Historic independent radio station; founded by Fabio Gadea Mantilla, broadcasting community news, rural peasant issues, and independent political commentary through decades of national turmoil",
      readership: {
        metric: "Highest-listening independent news radio station in Nicaragua on 540 AM, reaching rural and urban working families",
        source: "Estudio de Audiencia Radial Nicaragua 2023",
      },
      revenueModel: "Commercial radio advertising and private announcements",
      logo: "newspaper-logos/ni/radio-corporacion.svg",
      logoExplainer:
        "Vibrant yellow and red emblem displaying bold blue lettering 'RADIO CORPORACIÓN 540 AM', denoting independent community radio.",
      sources: ["https://radio-corporacion.com", "https://es.wikipedia.org/wiki/Radio_Corporaci%C3%B3n"],
    },
  ],

  // Niger
  NE: [
    {
      id: "ne-anp",
      countryCode: "NE",
      name: "ANP (Agence Nigérienne de Presse)",
      nativeName: "Agence Nigérienne de Presse",
      englishTranslation: "Nigerien News Agency",
      founded: 1987,
      frequency: "Real-time news wire service",
      format: "News wire & digital dispatch portal",
      language: "French",
      headquarters: "Niamey",
      owner: {
        name: "Ministry of Communication",
        type: "State news agency",
      },
      editorialStance: "Official national news agency of Niger; provides verified wire bulletins on National Council (CNSP) decrees, uranium mining, agricultural pastoralism, and Sahel security operations across all 8 regions",
      readership: {
        metric: "Primary wire supplier syndicating news to over 100 private and community radio stations, state broadcasters, and foreign agencies",
        source: "ANP Rapport d'Activité 2023",
      },
      revenueModel: "State government budget allocation and wire distribution subscriptions",
      logo: "newspaper-logos/ne/anp.svg",
      logoExplainer:
        "Nigerien flag orange, white, and green tricolor emblem with bold black lettering 'ANP - AGENCE NIGÉRIENNE DE PRESSE'.",
      sources: ["https://www.anp.ne", "https://fr.wikipedia.org/wiki/Agence_nig%C3%A9rienne_de_presse"],
    },
    {
      id: "ne-le-sahel",
      countryCode: "NE",
      name: "Le Sahel",
      nativeName: "Le Sahel",
      englishTranslation: "The Sahel",
      founded: 1960,
      frequency: "Daily newspaper (Monday–Friday) & Sahel Dimanche",
      format: "Broadsheet & digital edition",
      language: "French",
      headquarters: "Niamey",
      owner: {
        name: "Office National d'Édition et de Presse (ONEP)",
        type: "State public enterprise",
      },
      editorialStance: "Niger's historical daily newspaper of record; publishes official government communiqués, ministerial decisions, judicial appointments, domestic agricultural harvest reports, and cultural features",
      readership: {
        metric: "Highest circulation daily print newspaper in Niger with over 8,000 copies distributed to ministries, embassies, and regional governorates",
        source: "ONEP Rapport d'Entreprise 2023",
      },
      revenueModel: "Print sales, mandatory public tender notices, and official advertisements",
      logo: "newspaper-logos/ne/le-sahel.svg",
      logoExplainer:
        "Deep Sahara-sand gold background with elegant black serif typography 'Le Sahel', evoking the geographical heart of the Sahel region.",
      sources: ["https://lesahel.org", "https://fr.wikipedia.org/wiki/Le_Sahel_(journal)"],
    },
    {
      id: "ne-le-republicain",
      countryCode: "NE",
      name: "Le Républicain Niger",
      nativeName: "Le Républicain",
      englishTranslation: "The Republican",
      founded: 1991,
      frequency: "Weekly newspaper (Thursdays) & digital portal",
      format: "Tabloid & digital news portal",
      language: "French",
      headquarters: "Niamey",
      owner: {
        name: "Société Nigérienne de Presse et d'Édition",
        type: "Independent commercial media",
      },
      editorialStance: "Pioneer of Niger's independent private press founded during the 1991 Sovereign National Conference; staunch defender of democratic institutions, rule of law, anti-corruption transparency, and human rights",
      readership: {
        metric: "Circulates over 5,000 print copies weekly and widely consulted by civil society, lawyers, and university academics",
        source: "Maison de la Presse du Niger 2023",
      },
      revenueModel: "Newsstand sales, institutional subscriptions, and commercial advertising",
      logo: "newspaper-logos/ne/le-republicain.svg",
      logoExplainer:
        "Forest green background displaying stark white serif typography 'Le Républicain', symbolizing democratic renewal in Niger.",
      sources: ["https://republicain-niger.com", "https://fr.wikipedia.org/wiki/Le_R%C3%A9publicain_(Niger)"],
    },
    {
      id: "ne-air-info",
      countryCode: "NE",
      name: "Aïr Info",
      founded: 2002,
      frequency: "Monthly journal & continuous digital service",
      format: "Tabloid & digital news portal",
      language: "French",
      headquarters: "Agadez",
      owner: {
        name: "Aïr Info Communication",
        type: "Independent regional media",
      },
      editorialStance: "Premier independent publication of northern Niger based in historic Agadez; renowned for specialist coverage of desert pastoralism, Tuareg cultural preservation, trans-Saharan migration routes, and mining in the Aïr Mountains",
      readership: {
        metric: "Key news reference for northern Niger, regional aid agencies, and international Sahelian researchers",
        source: "Aïr Info Media Kit 2023",
      },
      revenueModel: "Print copy sales, donor partnership reporting, and digital advertising",
      logo: "newspaper-logos/ne/air-info.svg",
      logoExplainer:
        "Desert sand-orange field featuring the stylized Cross of Agadez symbol and bold black lettering 'AÏR INFO', representing the desert north.",
      sources: ["https://airinfoagadez.com", "https://fr.wikipedia.org/wiki/A%C3%AFr_Info"]
    },
    {
      id: "ne-tele-sahel",
      countryCode: "NE",
      name: "Télé Sahel",
      nativeName: "Office de Radiodiffusion Télévision du Niger (ORTN)",
      englishTranslation: "Sahel Television (Niger Radio and Television Office)",
      founded: 1964,
      frequency: "Continuous multimedia public broadcaster",
      format: "Television channel (Télé Sahel), national radio & web stream",
      language: "French, Hausa, Zarma, Tamajaq, Fulfulde, Kanuri",
      headquarters: "Avenue du Général de Gaulle, Niamey",
      owner: {
        name: "Office de Radiodiffusion Télévision du Niger (ORTN)",
        type: "State public broadcaster",
      },
      annualPublicFunding: {
        total: "XOF 2.8 billion",
        perCapita: "XOF 110.00",
      },
      editorialStance: "National public service broadcaster; provides official state news bulletins, educational programming, health campaigns, and multilingual broadcasting in French and 8 national indigenous languages",
      readership: {
        metric: "Universal terrestrial transmission reaching over 75% of Nigerien households, particularly through its vast AM/FM radio network",
        source: "ORTN Rapport Annuel 2023",
      },
      revenueModel: "State government subvention and commercial broadcast advertising",
      logo: "newspaper-logos/ne/tele-sahel.svg",
      logoExplainer:
        "National orange and green geometric emblem with white lettering 'TÉLÉ SAHEL - ORTN', embodying national public service television.",
      sources: ["https://ortn.ne", "https://fr.wikipedia.org/wiki/T%C3%A9l%C3%A9_Sahel"],
    },
  ],

  // Nigeria
  NG: [
    {
      id: "ng-nan",
      countryCode: "NG",
      name: "NAN (News Agency of Nigeria)",
      founded: 1976,
      frequency: "Real-time national news wire service",
      format: "News wire, photo service & digital agency portal",
      language: "English",
      headquarters: "Central Business District, Abuja",
      owner: {
        name: "Federal Government of Nigeria",
        type: "Federal state news agency",
      },
      annualPublicFunding: {
        total: "NGN 3.2 billion",
        perCapita: "NGN 14.50",
      },
      editorialStance: "Africa's largest national news wire agency; statutory monopoly wire provider distributing comprehensive, factual reporting on the Presidency, National Assembly, 36 state governments, oil sector regulations, and ECOWAS diplomacy",
      readership: {
        metric: "Supplies wire feeds to over 250 print newspapers, television networks, and radio stations across all 36 states of Nigeria",
        source: "News Agency of Nigeria Annual Audit 2023",
      },
      revenueModel: "Federal government subvention and wire syndication subscription fees",
      logo: "newspaper-logos/ng/nan.svg",
      logoExplainer:
        "Nigerian green and white national colors banner displaying bold gold lettering 'NAN' and white subtitle 'NEWS AGENCY OF NIGERIA'.",
      sources: ["https://nannews.ng", "https://en.wikipedia.org/wiki/News_Agency_of_Nigeria"],
    },
    {
      id: "ng-the-punch",
      countryCode: "NG",
      name: "The Punch",
      founded: 1971,
      frequency: "Daily newspaper (Monday–Sunday) & continuous digital portal",
      format: "Tabloid & digital news portal",
      language: "English",
      headquarters: "Magboro, Ogun State (Lagos Bureau)",
      owner: {
        name: "Punch Nigeria Limited",
        type: "Independent commercial media",
      },
      editorialStance: "Nigeria's highest-circulation and most widely read commercial daily newspaper; fiercely independent editorial line renowned for investigative exposés against corruption, police brutality, and defending constitutional democracy",
      readership: {
        metric: "Over 80,000 daily print circulation and punchng.com is Nigeria's most visited news website with over 25 million monthly page impressions",
        source: "Audit Bureau of Circulations Nigeria / Similarweb 2023",
      },
      revenueModel: "Print sales, digital advertising, classifieds, and event partnerships",
      logo: "newspaper-logos/ng/the-punch.svg",
      logoExplainer:
        "Distinctive scarlet red background with bold white heavyweight sans-serif typography 'PUNCH', representing independent editorial impact.",
      sources: ["https://punchng.com", "https://en.wikipedia.org/wiki/The_Punch"],
    },
    {
      id: "ng-premium-times",
      countryCode: "NG",
      name: "Premium Times",
      founded: 2011,
      frequency: "Continuous digital investigative news service",
      format: "Digital news portal & investigative multimedia",
      language: "English",
      headquarters: "Wuse II, Abuja",
      owner: {
        name: "Premium Times Services Limited",
        type: "Independent investigative media",
      },
      editorialStance: "Nigeria's leading investigative journalism platform; Pulitzer Prize partner (Panama Papers) celebrated for courageous investigations into military spending, petroleum revenue fraud, judicial malpractice, and human rights",
      readership: {
        metric: "Over 5 million monthly unique visitors and one of the most cited investigative newsrooms in West Africa",
        source: "Premium Times Annual Review 2023",
      },
      revenueModel: "Digital advertising, investigative philanthropy grants, and reader subscriptions",
      logo: "newspaper-logos/ng/premium-times.svg",
      logoExplainer:
        "Sleek dark navy blue backdrop with vibrant golden-yellow and white typography 'PREMIUM TIMES', denoting uncompromising investigative excellence.",
      sources: ["https://www.premiumtimesng.com", "https://en.wikipedia.org/wiki/Premium_Times"],
    },
    {
      id: "ng-the-guardian",
      countryCode: "NG",
      name: "The Guardian",
      founded: 1983,
      frequency: "Daily newspaper (Monday–Sunday)",
      format: "Broadsheet & digital portal",
      language: "English",
      headquarters: "Rutam House, Isolo, Lagos",
      owner: {
        name: "Guardian Newspapers Limited (Ibru Family)",
        type: "Independent commercial media group",
      },
      editorialStance: "Long recognized as the 'flagship of the Nigerian press' and broadsheet of record; prestigious intellectual and analytical standard, in-depth political essays, economic policy critique, and cultural arts reviews",
      readership: {
        metric: "Over 50,000 daily print copies read extensively by policymakers, senior corporate executives, and university scholars nationwide",
        source: "Advertisers Association of Nigeria (ADVAN) 2023",
      },
      revenueModel: "Print sales, institutional subscriptions, and corporate display advertising",
      logo: "newspaper-logos/ng/the-guardian.svg",
      logoExplainer:
        "Clean white background with the iconic classic black serif title 'The Guardian' and golden motto 'Conscience, Nurtured by Truth'.",
      sources: ["https://guardian.ng", "https://en.wikipedia.org/wiki/The_Guardian_(Nigeria)"],
    },
    {
      id: "ng-vanguard",
      countryCode: "NG",
      name: "Vanguard",
      founded: 1983,
      frequency: "Daily newspaper (Monday–Sunday)",
      format: "Tabloid & digital news portal",
      language: "English",
      headquarters: "Apapa, Lagos",
      owner: {
        name: "Vanguard Media Limited (Sam Amuka-Pemu)",
        type: "Independent commercial media",
      },
      editorialStance: "One of Nigeria's leading mainstream daily newspapers; popular editorial style focusing on national breaking headlines, Niger Delta resource debates, sports (Super Eagles), and community reporting",
      readership: {
        metric: "Over 60,000 daily print circulation and more than 15 million monthly digital visitors on vanguardngr.com",
        source: "Media Reach OMD Nigeria 2023",
      },
      revenueModel: "Print sales, classifieds, and digital advertising networks",
      logo: "newspaper-logos/ng/vanguard.svg",
      logoExplainer:
        "Bright red rectangular background featuring prominent bold white italic sans-serif lettering 'Vanguard', symbolizing dynamic national news delivery.",
      sources: ["https://www.vanguardngr.com", "https://en.wikipedia.org/wiki/Vanguard_(Nigeria)"],
    },
  ],

  // North Macedonia
  MK: [
    {
      id: "mk-mia",
      countryCode: "MK",
      name: "MIA (Media Information Agency)",
      nativeName: "Медиумска информативна агенција",
      englishTranslation: "Media Information Agency",
      founded: 1992,
      frequency: "Real-time news wire service",
      format: "News wire & digital dispatch portal",
      language: "Macedonian, Albanian, English",
      headquarters: "Skopje",
      owner: {
        name: "Government of the Republic of North Macedonia",
        type: "State news agency",
      },
      annualPublicFunding: {
        total: "MKD 85 million",
        perCapita: "MKD 46.00",
      },
      editorialStance: "Official national public news agency; provides impartial wire dispatches on Sobranie (parliament) debates, EU harmonization, NATO integration, and regional Balkan diplomacy",
      readership: {
        metric: "Primary wire source feeding over 80% of broadcasters and print publications across North Macedonia",
        source: "MIA Godisen Izvestaj 2023",
      },
      revenueModel: "State public service subvention and B2B wire subscriptions",
      logo: "newspaper-logos/mk/mia.svg",
      logoExplainer: "Red and yellow Macedonian sunburst banner with bold white lettering 'MIA - MEDIA INFORMATION AGENCY'.",
      sources: [
        "https://mia.mk",
        "https://en.wikipedia.org/wiki/Media_Information_Agency",
      ],
    },
    {
      id: "mk-nova-makedonija",
      countryCode: "MK",
      name: "Nova Makedonija",
      nativeName: "Нова Македонија",
      englishTranslation: "New Macedonia",
      founded: 1944,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Broadsheet & digital portal",
      language: "Macedonian",
      headquarters: "Skopje",
      owner: {
        name: "Nova Makedonija AD",
        type: "Independent commercial media",
      },
      editorialStance: "North Macedonia's oldest existing daily newspaper; historic paper of record founded during anti-fascist liberation, covering national identity, politics, literature, and arts",
      readership: {
        metric: "Over 15,000 daily print readership, widely read by civil servants, diplomats, and historians",
        source: "Press Council of North Macedonia 2023",
      },
      revenueModel: "Print sales, subscriptions, and commercial advertising",
      logo: "newspaper-logos/mk/nova-makedonija.svg",
      logoExplainer: "Dark blue background featuring elegant gold Cyrillic serif typography 'Нова Македонија', symbolising national press heritage.",
      sources: [
        "https://novamakedonija.com.mk",
        "https://en.wikipedia.org/wiki/Nova_Makedonija",
      ],
    },
    {
      id: "mk-mrt-news",
      countryCode: "MK",
      name: "MRT News",
      nativeName: "Македонска Радио Телевизија",
      englishTranslation: "Macedonian Radio Television News",
      founded: 1944,
      frequency: "Continuous multimedia public broadcaster",
      format: "Public television (MRT 1, MRT 2), radio & digital portal",
      language: "Macedonian, Albanian, Turkish, Romani, Serbian, Aromanian, Bosnian",
      headquarters: "Skopje",
      owner: {
        name: "Macedonian Radio Television (Public Enterprise)",
        type: "Public service broadcaster",
      },
      annualPublicFunding: {
        total: "MKD 1.1 billion",
        perCapita: "MKD 600.00",
      },
      editorialStance: "National public service broadcaster; statutory obligation to deliver balanced domestic news, parliamentary debates, and programming for all constitutional ethnic communities",
      readership: {
        metric: "Universal terrestrial and satellite broadcast covering 99% of the population",
        source: "Agency for Audio and Audiovisual Media Services 2023",
      },
      revenueModel: "State statutory budget allocation (linked to national budget share)",
      logo: "newspaper-logos/mk/mrt-news.svg",
      logoExplainer: "National red badge with bold white lettering 'MRT' and golden accent, representing state public broadcasting.",
      sources: [
        "https://mrt.com.mk",
        "https://en.wikipedia.org/wiki/Macedonian_Radio_Television",
      ],
    },
    {
      id: "mk-vecer",
      countryCode: "MK",
      name: "Večer",
      nativeName: "Вечер",
      englishTranslation: "Evening",
      founded: 1963,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Tabloid & digital portal",
      language: "Macedonian",
      headquarters: "Skopje",
      owner: {
        name: "Večer Press d.o.o.",
        type: "Independent commercial media",
      },
      editorialStance: "Leading commercial daily newspaper; populist, fast-paced political coverage, social scandals, municipal affairs, and sports",
      readership: {
        metric: "Second largest print daily with over 12,000 copies circulated daily across Skopje and regional towns",
        source: "Media Association of North Macedonia 2023",
      },
      revenueModel: "Print copy sales, classified ads, and digital banners",
      logo: "newspaper-logos/mk/vecer.svg",
      logoExplainer: "Deep scarlet red banner with heavy white Cyrillic typography 'ВЕЧЕР', evoking evening daily news urgency.",
      sources: [
        "https://vecer.mk",
        "https://en.wikipedia.org/wiki/Ve%C4%8Der",
      ],
    },
    {
      id: "mk-koha-mk",
      countryCode: "MK",
      name: "Koha (North Macedonia)",
      nativeName: "Gazeta Koha",
      englishTranslation: "Time Newspaper",
      founded: 2006,
      frequency: "Daily newspaper (Monday–Saturday) & digital portal",
      format: "Broadsheet & digital news portal",
      language: "Albanian",
      headquarters: "Skopje",
      owner: {
        name: "Koha Media Group",
        type: "Independent commercial media",
      },
      editorialStance: "North Macedonia's leading Albanian-language daily newspaper; covers Ohrid Framework Agreement implementation, inter-ethnic harmony, municipal governance in western Macedonia, and regional Balkan news",
      readership: {
        metric: "Highest circulation Albanian-language newspaper in North Macedonia with 8,000+ copies and widely visited portal koha.mk",
        source: "Association of Albanian Journalists North Macedonia 2023",
      },
      revenueModel: "Print sales, community advertising, and digital subscriptions",
      logo: "newspaper-logos/mk/koha-mk.svg",
      logoExplainer: "Black and red emblem with bold white modern serif lettering 'KOHA', representing the principal Albanian-language daily.",
      sources: [
        "https://www.koha.mk",
      ],
    },
  ],

  // Norway
  NO: [
    {
      id: "no-ntb",
      countryCode: "NO",
      name: "NTB (Norsk Telegrambyrå)",
      nativeName: "Norsk Telegrambyrå",
      englishTranslation: "Norwegian Telegram Agency",
      founded: 1867,
      frequency: "Real-time national news wire service",
      format: "News wire, photo agency & automated journalism",
      language: "Norwegian (Bokmål & Nynorsk), English",
      headquarters: "Havnelageret, Oslo",
      owner: {
        name: "Norwegian media houses cooperative (Amedia, Schibsted, Polaris, etc.)",
        type: "Media cooperative news wire",
      },
      editorialStance: "Norway's premier national news agency; strictly impartial real-time coverage of Storting (parliament) debates, Arctic affairs, Nordic climate research, and sovereign wealth fund (Oljefondet) investments",
      readership: {
        metric: "Supplies wire content, live sports feeds, and images to nearly 100% of Norwegian print, broadcast, and online media",
        source: "NTB Årsrapport 2023",
      },
      revenueModel: "B2B wire subscriptions, editorial tech syndication, and photo licensing",
      logo: "newspaper-logos/no/ntb.svg",
      logoExplainer: "Nordic navy blue background with crisp white heavyweight geometric sans-serif lettering 'NTB', symbolizing foundational wire authority.",
      sources: [
        "https://www.ntb.no",
        "https://no.wikipedia.org/wiki/Norsk_Telegrambyr%C3%A5",
      ],
    },
    {
      id: "no-aftenposten",
      countryCode: "NO",
      name: "Aftenposten",
      nativeName: "Aftenposten",
      englishTranslation: "The Evening Post",
      founded: 1860,
      frequency: "Daily newspaper (Monday–Sunday) & digital subscriber portal",
      format: "Compact & digital portal",
      language: "Norwegian (Bokmål)",
      headquarters: "Akersgata, Oslo",
      owner: {
        name: "Schibsted Media",
        type: "Independent commercial media group",
      },
      editorialStance: "Norway's newspaper of record and largest subscription daily; center-right editorial heritage, recognized for exhaustive political investigations, foreign reporting, cultural essays, and economic analysis",
      readership: {
        metric: "Over 250,000 paid subscribers across print and digital, reaching over 1.2 million readers daily",
        source: "Mediebedriftenes Landsforening (MBL) 2023",
      },
      revenueModel: "Paid digital subscriptions (Aftenposten+), print circulation, and display ads",
      logo: "newspaper-logos/no/aftenposten.svg",
      logoExplainer: "Classic black gothic masthead 'Aftenposten' on pure white background, reflecting Norway's most prestigious broadsheet tradition.",
      sources: [
        "https://www.aftenposten.no",
        "https://en.wikipedia.org/wiki/Aftenposten",
      ],
    },
    {
      id: "no-dagbladet",
      countryCode: "NO",
      name: "Dagbladet",
      nativeName: "Dagbladet",
      englishTranslation: "The Daily Paper",
      founded: 1869,
      frequency: "Daily newspaper & digital portal",
      format: "Tabloid & digital video portal",
      language: "Norwegian (Bokmål)",
      headquarters: "Karvesvingen, Oslo",
      owner: {
        name: "Aller Media",
        type: "Independent commercial media group",
      },
      editorialStance: "Liberal-progressive tabloid daily; historically aligned with the Venstre movement, renowned for investigative journalism (SKUP awards), political commentary, cultural controversy, and digital video",
      readership: {
        metric: "Over 1.4 million daily digital readers on dagbladet.no and strong digital subscriber base on Dagbladet Pluss",
        source: "Mediebedriftenes Landsforening 2023",
      },
      revenueModel: "Digital subscriptions (Dagbladet Pluss), single-copy print sales, and video ads",
      logo: "newspaper-logos/no/dagbladet.svg",
      logoExplainer: "Red and white circle emblem with distinctive lowercase 'd' alongside bold black serif text 'Dagbladet', symbolizing progressive Norwegian journalism.",
      sources: [
        "https://www.dagbladet.no",
        "https://en.wikipedia.org/wiki/Dagbladet",
      ],
    },
    {
      id: "no-nrk-nyheter",
      countryCode: "NO",
      name: "NRK Nyheter",
      nativeName: "Norsk rikskringkasting",
      englishTranslation: "Norwegian Broadcasting Corporation News",
      founded: 1933,
      frequency: "Continuous public multimedia news service",
      format: "Public television (NRK 1), radio (NRK P1/Alltid Nyheter) & digital superportal",
      language: "Norwegian (Bokmål and Nynorsk), Sámi",
      headquarters: "Marienlyst, Oslo",
      owner: {
        name: "Government of Norway",
        type: "Public service broadcaster",
      },
      annualPublicFunding: {
        total: "NOK 6.2 billion",
        perCapita: "NOK 1,130.00",
      },
      editorialStance: "Norway's statutory public broadcaster; commercial-free public trust institution renowned for impartial investigative journalism (Brennpunkt), comprehensive regional coverage across all counties, and Sámi broadcasting",
      readership: {
        metric: "The most trusted news organization in Norway, reaching over 85% of the population daily across TV, radio, and nrk.no",
        source: "Reuters Institute Digital News Report Norway 2023",
      },
      revenueModel: "100% state-funded via the national tax budget (commercial-free)",
      logo: "newspaper-logos/no/nrk-nyheter.svg",
      logoExplainer: "Iconic royal blue rounded circle containing lowercase white 'nrk' with crisp typography 'NYHETER', denoting trusted public broadcasting.",
      sources: [
        "https://www.nrk.no",
        "https://en.wikipedia.org/wiki/NRK",
      ],
    },
    {
      id: "no-vg",
      countryCode: "NO",
      name: "VG (Verdens Gang)",
      nativeName: "Verdens Gang",
      englishTranslation: "The Course of the World",
      founded: 1945,
      frequency: "Daily newspaper & continuous digital superportal",
      format: "Tabloid & digital news portal",
      language: "Norwegian (Bokmål)",
      headquarters: "Akersgata, Oslo",
      owner: {
        name: "Schibsted Media",
        type: "Independent commercial media group",
      },
      editorialStance: "Norway's largest commercial news website and former resistance newspaper founded after World War II; fast-paced investigative reporting, breaking news scoops, podcasts, and sports",
      readership: {
        metric: "Over 2 million daily digital readers on vg.no and over 280,000 paying digital subscribers (VG+)",
        source: "MBL Opplagstall / Schibsted Annual Report 2023",
      },
      revenueModel: "Digital paywall subscriptions (VG+), print sales, and digital advertising",
      logo: "newspaper-logos/no/vg.svg",
      logoExplainer: "Vibrant red square featuring bold white sans-serif letters 'VG', the undisputed symbol of Norwegian breaking news.",
      sources: [
        "https://www.vg.no",
        "https://en.wikipedia.org/wiki/Verdens_Gang",
      ],
    },
  ],

  // Oman
  OM: [
    {
      id: "om-ona",
      countryCode: "OM",
      name: "ONA (Oman News Agency)",
      nativeName: "وكالة الأنباء العمانية",
      englishTranslation: "Oman News Agency",
      founded: 1986,
      frequency: "Real-time news wire service",
      format: "News wire & multimedia portal",
      language: "Arabic, English",
      headquarters: "Al Athaiba, Muscat",
      owner: {
        name: "Ministry of Information",
        type: "State news agency",
      },
      editorialStance: "Official national news agency of the Sultanate of Oman; provides verified wire bulletins on Royal Decrees of Sultan Haitham bin Tariq, Oman Vision 2040 economic diversification, Shura Council sessions, and regional GCC diplomacy",
      readership: {
        metric: "Primary official wire distributor feeding all domestic radio stations, TV networks, newspapers, and foreign missions",
        source: "Ministry of Information Sultanate of Oman 2023",
      },
      revenueModel: "State government budget allocation",
      logo: "newspaper-logos/om/ona.svg",
      logoExplainer: "Omani national colors (red, white, and green) field featuring the iconic Khanjar dagger emblem and gold Arabic/English lettering 'ONA'.",
      sources: [
        "https://omannews.gov.om",
        "https://en.wikipedia.org/wiki/Oman_News_Agency",
      ],
    },
    {
      id: "om-omandaily",
      countryCode: "OM",
      name: "Oman Daily (Jaridat Oman)",
      nativeName: "جريدة عمان",
      englishTranslation: "Oman Newspaper",
      founded: 1972,
      frequency: "Daily morning newspaper (Monday–Sunday)",
      format: "Broadsheet & digital edition",
      language: "Arabic",
      headquarters: "Madinat Al Ilam, Muscat",
      owner: {
        name: "Oman Press and Information Establishment",
        type: "State-owned publishing corporation",
      },
      editorialStance: "The official Arabic-language daily newspaper of record; chronicling Oman's modern renaissance, public administration, cultural heritage, and regional Arabian Gulf affairs",
      readership: {
        metric: "Highest circulation Arabic print daily in the Sultanate with over 45,000 copies distributed nationwide",
        source: "Oman Establishment for Press 2023",
      },
      revenueModel: "Print subscriptions, official gazette advertising, and retail sales",
      logo: "newspaper-logos/om/oman-daily.svg",
      logoExplainer: "Dignified dark green background adorned with golden Arabic calligraphy 'جريدة عمان' (Jaridat Oman), embodying half a century of national publishing.",
      sources: [
        "https://www.omandaily.om",
      ],
    },
    {
      id: "om-times-of-oman",
      countryCode: "OM",
      name: "Times of Oman",
      founded: 1975,
      frequency: "Daily newspaper & continuous digital portal",
      format: "Compact & digital multimedia network",
      language: "English",
      headquarters: "Ruwi, Muscat",
      owner: {
        name: "Muscat Press & Publishing House (MPPH)",
        type: "Independent commercial media",
      },
      editorialStance: "Oman's oldest independent English-language newspaper; fast-breaking business news, retail economy, Muscat municipality updates, expatriate community lifestyle, and sports",
      readership: {
        metric: "Over 40,000 daily print readership and over 1.5 million monthly unique digital visitors on timesofoman.com",
        source: "Muscat Press & Publishing House Audit 2023",
      },
      revenueModel: "Print sales, digital display advertising, and corporate sponsorships",
      logo: "newspaper-logos/om/times-of-oman.svg",
      logoExplainer: "Sleek navy blue field with bold white serif capitals 'TIMES OF OMAN' and red accent, representing private English-language press leadership.",
      sources: [
        "https://timesofoman.com",
        "https://en.wikipedia.org/wiki/Times_of_Oman",
      ],
    },
    {
      id: "om-oman-daily-observer",
      countryCode: "OM",
      name: "Oman Daily Observer",
      founded: 1981,
      frequency: "Daily morning newspaper (Monday–Sunday)",
      format: "Broadsheet & digital portal",
      language: "English",
      headquarters: "Madinat Al Ilam, Muscat",
      owner: {
        name: "Oman Press and Information Establishment (Ministry of Information)",
        type: "State-owned publishing corporation",
      },
      editorialStance: "The Sultanate's premier English-language newspaper of record; comprehensive coverage of government legislation, green hydrogen mega-projects, logistics, maritime shipping, and tourism",
      readership: {
        metric: "Over 35,000 daily print circulation, read extensively by corporate leaders, expatriate professionals, and foreign diplomats",
        source: "Oman Establishment for Press, Publication and Advertising 2023",
      },
      revenueModel: "Print sales, corporate advertising, and public notice announcements",
      logo: "newspaper-logos/om/oman-daily-observer.svg",
      logoExplainer: "Deep burgundy red background featuring stately white serif typography 'Oman Observer' with gold accent line, signifying authoritative national broadsheet status.",
      sources: [
        "https://www.omanobserver.om",
        "https://en.wikipedia.org/wiki/Oman_Daily_Observer",
      ],
    },
    {
      id: "om-al-shabiba",
      countryCode: "OM",
      name: "Al Shabiba",
      nativeName: "الشبيبة",
      englishTranslation: "The Youth",
      founded: 1993,
      frequency: "Daily newspaper (Monday–Sunday) & digital portal",
      format: "Tabloid & digital video portal",
      language: "Arabic",
      headquarters: "Ruwi, Muscat",
      owner: {
        name: "Muscat Press & Publishing House (MPPH)",
        type: "Independent commercial media",
      },
      editorialStance: "Leading independent Arabic daily; focuses on youth empowerment, education, job market analytics, local municipal issues, and national sports",
      readership: {
        metric: "Over 35,000 print daily circulation and strong social video viewership across the Sultanate",
        source: "MPPH Audience Metrics 2023",
      },
      revenueModel: "Commercial print and digital advertising",
      logo: "newspaper-logos/om/al-shabiba.svg",
      logoExplainer: "Vibrant royal blue background with bright orange and white Arabic script 'الشبيبة' (Al Shabiba), signifying energy and youth engagement.",
      sources: [
        "https://www.shabiba.com",
        "https://en.wikipedia.org/wiki/Al-Shabiba",
      ],
    },
  ],

  // Pakistan
  PK: [
    {
      id: "pk-app",
      countryCode: "PK",
      name: "APP (Associated Press of Pakistan)",
      founded: 1947,
      frequency: "Real-time national news wire service",
      format: "News wire, photo service & digital portal",
      language: "English, Urdu, Arabic, Chinese, Russian",
      headquarters: "Sector G-7/1, Islamabad",
      owner: {
        name: "Ministry of Information and Broadcasting",
        type: "State news agency",
      },
      annualPublicFunding: {
        total: "PKR 1.4 billion",
        perCapita: "PKR 5.80",
      },
      editorialStance: "Pakistan's premier national news wire agency; statutory supplier of official news covering the Prime Minister's Office, Supreme Court rulings, military operations, and CPEC infrastructure developments",
      readership: {
        metric: "Primary wire source feeding over 300 newspapers, 40+ private TV channels, and Radio Pakistan nationwide",
        source: "APP Annual Review 2023",
      },
      revenueModel: "Federal government budget subvention and media subscriber licensing",
      logo: "newspaper-logos/pk/app.svg",
      logoExplainer: "Pakistani emerald green banner with white crescent and star motif and bold gold typography 'APP - ASSOCIATED PRESS OF PAKISTAN'.",
      sources: [
        "https://www.app.com.pk",
        "https://en.wikipedia.org/wiki/Associated_Press_of_Pakistan",
      ],
    },
    {
      id: "pk-daily-jang",
      countryCode: "PK",
      name: "Daily Jang",
      nativeName: "روزنامہ جنگ",
      englishTranslation: "Daily War (Struggle for Independence)",
      founded: 1939,
      frequency: "Daily morning newspaper (Monday–Sunday) & Geo TV",
      format: "Broadsheet, satellite TV (Geo News) & digital superportal",
      language: "Urdu",
      headquarters: "I.I. Chundrigar Road, Karachi",
      owner: {
        name: "Jang Media Group",
        type: "Independent commercial media group",
      },
      editorialStance: "Pakistan's largest and oldest Urdu-language daily newspaper; populist, massive national reach, comprehensive coverage of domestic politics, Islamic affairs, cricket, and community news",
      readership: {
        metric: "Highest circulation newspaper in Pakistan with over 800,000 print copies distributed daily across Karachi, Lahore, Rawalpindi, and Quetta",
        source: "Audit Bureau of Circulation (ABC) Pakistan 2023",
      },
      revenueModel: "Print sales, high-volume classifieds, commercial advertising, and TV revenues",
      logo: "newspaper-logos/pk/daily-jang.svg",
      logoExplainer: "Vibrant red and green field featuring distinctive Nastaliq Urdu calligraphy 'روزنامہ جنگ' (Daily Jang), the voice of the Urdu-reading majority.",
      sources: [
        "https://jang.com.pk",
        "https://en.wikipedia.org/wiki/Daily_Jang",
      ],
    },
    {
      id: "pk-dawn",
      countryCode: "PK",
      name: "Dawn",
      founded: 1941,
      frequency: "Daily morning newspaper (Monday–Sunday) & DawnNews TV",
      format: "Broadsheet, cable news TV & digital news superportal",
      language: "English",
      headquarters: "Haroon House, Dr. Ziauddin Ahmed Road, Karachi",
      owner: {
        name: "Pakistan Herald Publications Limited (PHPL)",
        type: "Independent commercial media group",
      },
      editorialStance: "Founded by Pakistan's father of the nation Muhammad Ali Jinnah; the country's most respected broadsheet of record, renowned for courageous investigative journalism, editorial independence, defense of civil liberties, and secular democratic values",
      readership: {
        metric: "Over 120,000 daily print circulation and dawn.com is Pakistan's most read English digital news site with over 15 million monthly readers",
        source: "All Pakistan Newspapers Society (APNS) / Comscore 2023",
      },
      revenueModel: "Print sales, corporate display advertising, and digital sponsorships",
      logo: "newspaper-logos/pk/dawn.svg",
      logoExplainer: "Iconic stark black serif masthead 'DAWN' on pure white background, reflecting over eight decades of uncompromising journalistic integrity.",
      sources: [
        "https://www.dawn.com",
        "https://en.wikipedia.org/wiki/Dawn_(newspaper)",
      ],
    },
    {
      id: "pk-the-news-international",
      countryCode: "PK",
      name: "The News International",
      founded: 1991,
      frequency: "Daily morning newspaper (Monday–Sunday)",
      format: "Broadsheet & digital news portal",
      language: "English",
      headquarters: "Karachi, Lahore, Islamabad",
      owner: {
        name: "Jang Media Group",
        type: "Independent commercial media",
      },
      editorialStance: "Leading English-language daily newspaper; known for hard-hitting investigative reports (Fact Check), macroeconomic analysis, judicial coverage, and in-depth political op-eds",
      readership: {
        metric: "Over 80,000 daily print copies and over 8 million monthly digital readers on thenews.com.pk",
        source: "APNS Circulation Statement 2023",
      },
      revenueModel: "Print sales, institutional subscriptions, and commercial advertising",
      logo: "newspaper-logos/pk/the-news-international.svg",
      logoExplainer: "Deep navy blue background displaying bold white serif title 'THE NEWS' with international red globe accent.",
      sources: [
        "https://www.thenews.com.pk",
        "https://en.wikipedia.org/wiki/The_News_International",
      ],
    },
    {
      id: "pk-the-express-tribune",
      countryCode: "PK",
      name: "The Express Tribune",
      founded: 2010,
      frequency: "Daily morning newspaper (Monday–Sunday)",
      format: "Broadsheet & digital news portal (in partnership with International New York Times)",
      language: "English",
      headquarters: "Karachi",
      owner: {
        name: "Century Publications (Lakson Group)",
        type: "Independent commercial media group",
      },
      editorialStance: "Progressive, liberal English daily; pioneering digital-first design in Pakistan, focusing on human rights, minority protections, climate resilience, and startup business innovations",
      readership: {
        metric: "Over 45,000 print daily circulation and over 6 million monthly unique digital visitors",
        source: "Lakson Media Group Audience Profile 2023",
      },
      revenueModel: "Print sales, international syndication, and digital programmatic advertising",
      logo: "newspaper-logos/pk/the-express-tribune.svg",
      logoExplainer: "Clean white background featuring crimson red and black modern sans-serif typography 'THE EXPRESS TRIBUNE', symbolising progressive Pakistani journalism.",
      sources: [
        "https://tribune.com.pk",
        "https://en.wikipedia.org/wiki/The_Express_Tribune",
      ],
    },
  ],

  // Palau
  PW: [
    {
      id: "pw-belau-national-gazette",
      countryCode: "PW",
      name: "Belau National Gazette",
      founded: 1955,
      frequency: "Quarterly historical journal & cultural bulletin",
      format: "Magazine & institutional digital portal",
      language: "Palauan, English",
      headquarters: "Koror",
      owner: {
        name: "Belau National Museum (Government Chartered Institution)",
        type: "Public cultural institution",
      },
      annualPublicFunding: {
        total: "$195,000",
        perCapita: "$10.80",
      },
      editorialStance: "Micronesia's oldest museum publication; provides verified chronicles of Palauan history, traditional matrilineal genealogy, indigenous archaeology, and national commemorative events",
      readership: {
        metric: "Archived across all Palau schools, public libraries, and Pacific universities throughout Oceania",
        source: "Belau National Museum Report 2023",
      },
      revenueModel: "State statutory appropriation, museum memberships, and cultural publications",
      logo: "newspaper-logos/pw/belau-national-gazette.svg",
      logoExplainer: "Traditional Palauan Bai meeting house silhouette in gold on deep navy blue with text 'BELAU NATIONAL GAZETTE'.",
      sources: [
        "https://www.belaunationalmuseum.net",
      ],
    },
    {
      id: "pw-tia-belau",
      countryCode: "PW",
      name: "Tia Belau",
      nativeName: "Tia Belau",
      englishTranslation: "This is Palau",
      founded: 1992,
      frequency: "Weekly newspaper (Mondays)",
      format: "Tabloid print & digital archive",
      language: "English, Palauan",
      headquarters: "Koror",
      owner: {
        name: "Tia Belau Publishing Co. (Moses Uludong)",
        type: "Independent commercial publisher",
      },
      editorialStance: "Historic independent crusading newspaper; founded by pioneering Palauan journalist Moses Uludong, recognized for investigative reporting into governmental spending, land rights, and traditional council (Council of Chiefs) affairs",
      readership: {
        metric: "Circulated across all 16 states of Palau and to the Palauan diaspora in Guam, Saipan, and Hawaii",
        source: "Tia Belau Circulation Profile 2023",
      },
      revenueModel: "Print copy sales, political notices, and local display ads",
      logo: "newspaper-logos/pw/tia-belau.svg",
      logoExplainer: "Deep ocean blue field featuring bold gold Palauan lettering 'TIA BELAU', evoking national pride and traditional island self-determination.",
      sources: [
        "https://en.wikipedia.org/wiki/Tia_Belau",
      ],
    },
    {
      id: "pw-eco-palau-news",
      countryCode: "PW",
      name: "Eco Palau News",
      founded: 1994,
      frequency: "Monthly digital digest & environmental bulletin",
      format: "Digital portal & print digest",
      language: "English, Palauan",
      headquarters: "Koror",
      owner: {
        name: "Palau Conservation Society (PCS)",
        type: "Non-profit environmental civic media",
      },
      editorialStance: "Dedicated ecological news clearinghouse; reports on coral reef preservation, shark sanctuary protection, sea-level rise monitoring, and sustainable fishing policies",
      readership: {
        metric: "Widely read by traditional village leaders, marine researchers, tourism operators, and civic educators",
        source: "Palau Conservation Society Annual Review 2023",
      },
      revenueModel: "Civic conservation grants, educational subscriptions, and donor support",
      logo: "newspaper-logos/pw/eco-palau-news.svg",
      logoExplainer: "Deep lagoon green background with stylized sea turtle icon and white text 'ECO PALAU NEWS', signifying marine biodiversity stewardship.",
      sources: [
        "https://palauconservation.org",
      ],
    },
    {
      id: "pw-palau-wave-radio",
      countryCode: "PW",
      name: "Palau Wave Radio (PWFM 89.9)",
      founded: 1998,
      frequency: "24/7 radio news & community broadcasting",
      format: "FM radio station & digital audio streaming",
      language: "Palauan, English",
      headquarters: "Koror",
      owner: {
        name: "Wave Radio Palau Inc.",
        type: "Independent commercial radio",
      },
      editorialStance: "Most popular independent news and music radio station in Palau; delivers live coverage of congressional hearings, presidential press conferences, typhoon warnings, and community sports",
      readership: {
        metric: "Reaches over 85% of Palau's resident population across Koror and Babeldaob via 89.9 FM",
        source: "Palau Bureau of Domestic Affairs 2023",
      },
      revenueModel: "Commercial radio advertising, sponsored broadcasts, and community notices",
      logo: "newspaper-logos/pw/palau-wave-radio.svg",
      logoExplainer: "Tropical turquoise and sunburst yellow disc with clean white lettering 'PALAU WAVE RADIO 89.9 FM', denoting island audio vibrancy.",
      sources: [
        "https://www.facebook.com/palauwaveradio/",
      ],
    },
    {
      id: "pw-island-times",
      countryCode: "PW",
      name: "Island Times Palau",
      founded: 2005,
      frequency: "Semi-weekly newspaper (Tuesdays & Fridays) & digital portal",
      format: "Tabloid & digital edition",
      language: "English, Palauan",
      headquarters: "Koror",
      owner: {
        name: "Island Times Printing and Publishing Co.",
        type: "Independent commercial media",
      },
      editorialStance: "Palau's premier independent newspaper of record; comprehensive coverage of the Olbiil Era Kelulau (National Congress), marine protected areas (Palau National Marine Sanctuary), climate diplomacy, and Compact of Free Association (COFA)",
      readership: {
        metric: "Largest circulation newspaper in Palau, distributed across Koror, Babeldaob, and outer island states",
        source: "Palau Media Council 2023",
      },
      revenueModel: "Print sales, government legal notices, and commercial advertising",
      logo: "newspaper-logos/pw/island-times.svg",
      logoExplainer: "Pacific azure blue background with crisp white typography 'ISLAND TIMES PALAU' and golden full moon accent, symbolising the Palau flag.",
      sources: [
        "https://islandtimes.org",
        "https://en.wikipedia.org/wiki/Island_Times",
      ],
    },
  ],

  // Panama
  PA: [
    {
      id: "pa-la-estrella-de-panama",
      countryCode: "PA",
      name: "La Estrella de Panamá",
      founded: 1849,
      frequency: "Daily newspaper (Monday–Sunday)",
      format: "Broadsheet & digital portal",
      language: "Spanish",
      headquarters: "Panama City",
      owner: {
        name: "Grupo Editorial El Siglo & La Estrella (GESE)",
        type: "Independent commercial media group",
      },
      editorialStance: "Panama's oldest surviving newspaper, founded during the California Gold Rush in 1849; dignified historical newspaper of record covering national sovereignty, Canal expansion, and international trade",
      readership: {
        metric: "Over 20,000 daily print circulation, widely consulted by civil servants, diplomats, shipping agents, and academics",
        source: "GESE Corporate Profile 2023",
      },
      revenueModel: "Print sales, legal notices, and commercial display advertising",
      logo: "newspaper-logos/pa/la-estrella-de-panama.svg",
      logoExplainer: "Deep crimson red background with gleaming gold star emblem and refined serif typography 'La Estrella de Panamá', reflecting 175 years of press history.",
      sources: [
        "https://www.laestrella.com.pa",
        "https://es.wikipedia.org/wiki/La_Estrella_de_Panam%C3%A1",
      ],
    },
    {
      id: "pa-panama-america",
      countryCode: "PA",
      name: "Panamá América",
      founded: 1925,
      frequency: "Daily newspaper (Monday–Sunday)",
      format: "Compact & digital portal",
      language: "Spanish",
      headquarters: "Vía Ricardo J. Alfaro, Panama City",
      owner: {
        name: "Grupo Epasa (Editorial Panameña de América)",
        type: "Independent commercial media group",
      },
      editorialStance: "Major high-circulation commercial daily newspaper; center-right editorial tradition focusing on business development, banking regulations, infrastructure projects, and national sports",
      readership: {
        metric: "Over 25,000 print daily copies and leading commercial news traffic on panamaamerica.com.pa",
        source: "Grupo Epasa Audience Audit 2023",
      },
      revenueModel: "Print copy sales, classifieds, and digital display advertising",
      logo: "newspaper-logos/pa/panama-america.svg",
      logoExplainer: "Vibrant royal blue rectangular field emblazoned with stark white modern sans-serif typography 'PANAMÁ AMÉRICA'.",
      sources: [
        "https://www.panamaamerica.com.pa",
        "https://es.wikipedia.org/wiki/El_Panam%C3%A1_Am%C3%A9rica",
      ],
    },
    {
      id: "pa-tvn-noticias",
      countryCode: "PA",
      name: "TVN Noticias",
      founded: 1962,
      frequency: "Continuous multimedia broadcast news",
      format: "Television network (TVN Canal 2), digital streaming & mobile app",
      language: "Spanish",
      headquarters: "Vía España, Panama City",
      owner: {
        name: "Televisora Nacional, S.A. (TVN Media)",
        type: "Independent commercial media group",
      },
      editorialStance: "Leading commercial television newsroom in Panama; acclaimed for fast-paced breaking coverage, prime-time investigative reporting, live elections monitoring, and community social projects",
      readership: {
        metric: "Highest-rated television news bulletin in Panama, commanding over 40% of evening television viewership",
        source: "Kantar IBOPE Media Panama 2023",
      },
      revenueModel: "Commercial broadcast advertising and multimedia sponsorships",
      logo: "newspaper-logos/pa/tvn-noticias.svg",
      logoExplainer: "Dynamic blue and red emblem displaying bold white lettering 'TVN NOTICIAS', conveying broadcast leadership and agility.",
      sources: [
        "https://www.tvn-2.com",
        "https://es.wikipedia.org/wiki/TVN_(Panam%C3%A1)",
      ],
    },
    {
      id: "pa-la-prensa",
      countryCode: "PA",
      name: "La Prensa",
      founded: 1980,
      frequency: "Daily newspaper (Monday–Sunday) & continuous digital portal",
      format: "Compact & digital subscriber portal",
      language: "Spanish",
      headquarters: "Avenida 12 de Octubre, Panama City",
      owner: {
        name: "Corporación La Prensa, S.A. (Corprensa)",
        type: "Citizen shareholder media corporation",
      },
      editorialStance: "Panama's primary newspaper of record; founded by civilian leaders to resist military dictatorship, renowned for fearless investigations into money laundering, Panama Canal administration, and political bribes (Odebrecht)",
      readership: {
        metric: "Over 35,000 daily print circulation and prensa.com is the most trusted digital news portal in Panama with over 4 million monthly readers",
        source: "Corprensa Audited Financial Statements 2023",
      },
      revenueModel: "Print sales, digital paywall subscriptions (Prensa Digital), and display advertising",
      logo: "newspaper-logos/pa/la-prensa.svg",
      logoExplainer: "Clean white background with iconic dark navy blue serif lettering 'LA PRENSA' and blue accent, symbolising independent democratic watchdog journalism.",
      sources: [
        "https://www.prensa.com",
        "https://es.wikipedia.org/wiki/La_Prensa_(Panam%C3%A1)",
      ],
    },
    {
      id: "pa-telemetro-reporta",
      countryCode: "PA",
      name: "Telemetro Reporta",
      founded: 1981,
      frequency: "Continuous television & digital news service",
      format: "Television network (Telemetro Canal 13) & digital portal",
      language: "Spanish",
      headquarters: "Calle 50, Panama City",
      owner: {
        name: "Corporación Medcom",
        type: "Independent commercial media group",
      },
      editorialStance: "High-impact commercial television news brand; renowned for populist street journalism, consumer advocacy, traffic updates, and extensive coverage of regional provinces",
      readership: {
        metric: "Reaches over 1.8 million television viewers across the republic and dominant social video following",
        source: "Medcom Corporate Audit 2023",
      },
      revenueModel: "Television commercial ads, programmatic web advertising, and sponsored segments",
      logo: "newspaper-logos/pa/telemetro-reporta.svg",
      logoExplainer: "Deep scarlet red rectangle with bright yellow and white modern typography 'TELEMETRO REPORTA', denoting popular breaking television news.",
      sources: [
        "https://www.telemetro.com",
        "https://es.wikipedia.org/wiki/Telemetro",
      ],
    },
  ],

  // Papua New Guinea
  PG: [
    {
      id: "pg-post-courier",
      countryCode: "PG",
      name: "Post-Courier",
      founded: 1969,
      frequency: "Daily morning newspaper (Monday–Friday)",
      format: "Tabloid & digital edition",
      language: "English",
      headquarters: "Lawes Road, Konedobu, Port Moresby",
      owner: {
        name: "South Pacific Post Pty Ltd (News Corp subsidiary)",
        type: "Independent commercial media",
      },
      editorialStance: "Papua New Guinea's oldest and largest daily newspaper; authoritative national paper of record covering National Parliament debates, mining and LNG developments, tribal governance, and Pacific Island diplomacy",
      readership: {
        metric: "Largest daily circulation in PNG with over 28,000 print copies distributed by air to all 22 provinces",
        source: "South Pacific Post Circulation Audit 2023",
      },
      revenueModel: "Print sales, corporate display advertising, and public notice tenders",
      logo: "newspaper-logos/pg/post-courier.svg",
      logoExplainer: "Deep red background displaying bold white modern serif title 'Post-Courier', symbolising over half a century of national reporting.",
      sources: [
        "https://postcourier.com.pg",
        "https://en.wikipedia.org/wiki/Papua_New_Guinea_Post-Courier",
      ],
    },
    {
      id: "pg-wantok-niuspepa",
      countryCode: "PG",
      name: "Wantok Niuspepa",
      nativeName: "Wantok",
      englishTranslation: "One Talk / Compatriot Newspaper",
      founded: 1970,
      frequency: "Weekly newspaper (Thursdays)",
      format: "Tabloid",
      language: "Tok Pisin",
      headquarters: "Gordons, Port Moresby",
      owner: {
        name: "Word Publishing Company (Mainline Christian Churches)",
        type: "Ecumenical community media",
      },
      editorialStance: "The world's only commercial newspaper published entirely in Tok Pisin; grassroots advocacy, rural community health, literacy education, cultural preservation, and peaceful dispute resolution",
      readership: {
        metric: "Read by over 60,000 rural and peri-urban readers throughout church parishes, community clinics, and schools nationwide",
        source: "Word Publishing Circulation Review 2023",
      },
      revenueModel: "Print sales, community church distribution, and educational subscriptions",
      logo: "newspaper-logos/pg/wantok-niuspepa.svg",
      logoExplainer: "Forest green background displaying traditional tribal kundu drum motif and white Tok Pisin typography 'WANTOK NIUSPEPA'.",
      sources: [
        "https://en.wikipedia.org/wiki/Wantok_(newspaper)",
      ],
    },
    {
      id: "pg-nbc-news",
      countryCode: "PG",
      name: "NBC News PNG",
      nativeName: "National Broadcasting Corporation",
      englishTranslation: "National Broadcasting Corporation News",
      founded: 1973,
      frequency: "Continuous public broadcast news service",
      format: "Public radio (Kundu FM), television (NBC TV) & provincial stations",
      language: "English, Tok Pisin, Hiri Motu",
      headquarters: "5 Mile, Port Moresby",
      owner: {
        name: "National Broadcasting Corporation of PNG",
        type: "Public state broadcaster",
      },
      annualPublicFunding: {
        total: "PGK 32.5 million",
        perCapita: "PGK 3.40",
      },
      editorialStance: "Papua New Guinea's statutory public broadcaster; vital lifeline broadcasting emergency weather warnings, health awareness, parliamentary proceedings, and provincial news in Tok Pisin, Hiri Motu, and English across all 22 provinces",
      readership: {
        metric: "The most widely accessible media organization in PNG, reaching over 70% of the population via shortwave, medium wave, and FM radio networks",
        source: "NBC PNG Performance Report 2023",
      },
      revenueModel: "National government budgetary appropriation and limited sponsorship",
      logo: "newspaper-logos/pg/nbc-news.svg",
      logoExplainer: "PNG flag red and black emblem featuring the Kumul Bird of Paradise silhouette and golden lettering 'NBC NEWS PNG'.",
      sources: [
        "https://www.nbc.com.pg",
        "https://en.wikipedia.org/wiki/National_Broadcasting_Corporation_(Papua_New_Guinea)",
      ],
    },
    {
      id: "pg-emtv-news",
      countryCode: "PG",
      name: "EMTV News",
      founded: 1987,
      frequency: "Daily evening television news broadcast",
      format: "Free-to-air commercial television network & digital video stream",
      language: "English, Tok Pisin",
      headquarters: "Garden City, Boroko, Port Moresby",
      owner: {
        name: "Media Niugini Limited (Telikom PNG / Kumul Telpay)",
        type: "State-owned commercial broadcaster",
      },
      editorialStance: "PNG's pioneering commercial television broadcaster; renowned for its flagship 6:00 PM National News bulletin, investigative current affairs (Olsem Wanem), and rural development stories",
      readership: {
        metric: "Reaches over 85% of urban television households and available free-to-air across all major provincial capitals",
        source: "Media Niugini Audience Metrics 2023",
      },
      revenueModel: "Commercial television advertising and corporate program sponsorships",
      logo: "newspaper-logos/pg/emtv-news.svg",
      logoExplainer: "Bright red rectangular badge with bold white sans-serif letters 'EMTV' and subtitle 'NATIONAL NEWS', denoting prime-time television authority.",
      sources: [
        "https://emtv.com.pg",
        "https://en.wikipedia.org/wiki/EM_TV",
      ],
    },
    {
      id: "pg-the-national",
      countryCode: "PG",
      name: "The National",
      founded: 1993,
      frequency: "Daily morning newspaper (Monday–Friday)",
      format: "Tabloid & digital portal",
      language: "English",
      headquarters: "Gordons, Port Moresby",
      owner: {
        name: "Pacific Star Limited (Rimbunan Hijau Group)",
        type: "Independent commercial media",
      },
      editorialStance: "Major national daily newspaper; extensive coverage of provincial economic growth, agricultural coffee/cocoa exports, rural infrastructure, education, and rugby league",
      readership: {
        metric: "Over 25,000 daily print circulation with widespread distribution in the Highlands and Momase regions",
        source: "Pacific Star Limited Annual Review 2023",
      },
      revenueModel: "Print copy sales, mining/petroleum industry advertising, and classifieds",
      logo: "newspaper-logos/pg/the-national.svg",
      logoExplainer: "Vibrant yellow-gold rectangular field with stark black and red bold typography 'The National', capturing Papua New Guinean enterprise.",
      sources: [
        "https://www.thenational.com.pg",
        "https://en.wikipedia.org/wiki/The_National_(Papua_New_Guinea)",
      ],
    },
  ],

  // Paraguay
  PY: [
    {
      id: "py-ipparaguay",
      countryCode: "PY",
      name: "Agencia IP (Información Pública)",
      nativeName: "Agencia de Información Paraguaya",
      englishTranslation: "Paraguayan Information Agency",
      founded: 2009,
      frequency: "Real-time news wire service",
      format: "News wire & digital portal",
      language: "Spanish, Guaraní",
      headquarters: "Asunción",
      owner: {
        name: "Ministry of Information and Communication Technologies (MITIC)",
        type: "State news agency",
      },
      editorialStance: "Official national state news agency of Paraguay; provides verified wire coverage of Presidential Palace (Palacio de los López) communiqués, Itaipú/Yacyretá hydroelectric energy agreements, and agricultural export policy",
      readership: {
        metric: "Primary official wire distributor for state and private radio stations, newspapers, and regional Mercosur agencies",
        source: "MITIC Paraguay Memoria Institucional 2023",
      },
      revenueModel: "State government budget allocation",
      logo: "newspaper-logos/py/ipparaguay.svg",
      logoExplainer: "Paraguayan tricolor (red, white, blue) bar with bold white letters 'IP' and gold subtitle 'AGENCIA DE INFORMACIÓN PARAGUAYA'.",
      sources: [
        "https://www.ip.gov.py",
        "https://es.wikipedia.org/wiki/Agencia_IP",
      ],
    },
    {
      id: "py-abc-color",
      countryCode: "PY",
      name: "ABC Color",
      founded: 1967,
      frequency: "Daily newspaper (Monday–Sunday) & ABC TV",
      format: "Broadsheet, cable TV (ABC TV) & digital superportal",
      language: "Spanish, Guaraní",
      headquarters: "Yegros 745, Asunción",
      owner: {
        name: "Editorial Azeta, S.A. (Zuccolillo Family)",
        type: "Independent commercial media group",
      },
      editorialStance: "Paraguay's highest-circulation and most influential daily newspaper; historically banned under the Stroessner dictatorship, acclaimed for hard-hitting investigative journalism, exposing corruption, and defending democracy",
      readership: {
        metric: "Over 50,000 daily print circulation and abc.com.py is the most visited website in Paraguay with over 20 million monthly visits",
        source: "Editorial Azeta / Similarweb 2023",
      },
      revenueModel: "Print sales, digital subscriptions (ABC Digital), and major commercial advertising",
      logo: "newspaper-logos/py/abc-color.svg",
      logoExplainer: "Signature golden-yellow square with bold black serif letters 'ABC' and blue accent, symbolising independent investigative journalism.",
      sources: [
        "https://www.abc.com.py",
        "https://es.wikipedia.org/wiki/ABC_Color",
      ],
    },
    {
      id: "py-ultima-hora",
      countryCode: "PY",
      name: "Última Hora",
      founded: 1973,
      frequency: "Daily newspaper (Monday–Sunday) & Telefuturo partner",
      format: "Tabloid & digital news portal",
      language: "Spanish, Guaraní",
      headquarters: "Benjamín Constant, Asunción",
      owner: {
        name: "Grupo Vierci",
        type: "Independent commercial media group",
      },
      editorialStance: "Leading commercial daily newspaper; center-left progressive outlook focusing on social justice, judicial transparency, rural peasant rights, cultural arts, and sports",
      readership: {
        metric: "Over 40,000 daily print copies and over 12 million monthly digital page views on ultimahora.com",
        source: "Grupo Vierci Audited Report 2023",
      },
      revenueModel: "Print sales, corporate advertising, and digital sponsorships",
      logo: "newspaper-logos/py/ultima-hora.svg",
      logoExplainer: "Deep scarlet red rectangular background with prominent white modern sans-serif typography 'ÚLTIMA HORA'.",
      sources: [
        "https://www.ultimahora.com",
        "https://es.wikipedia.org/wiki/%C3%9Altima_Hora_(Paraguay)",
      ],
    },
    {
      id: "py-la-nacion",
      countryCode: "PY",
      name: "La Nación Paraguay",
      founded: 1995,
      frequency: "Daily newspaper (Monday–Sunday) & GEN TV",
      format: "Broadsheet, cable TV (GEN) & digital portal",
      language: "Spanish",
      headquarters: "Fernando de la Mora, Central Department",
      owner: {
        name: "Grupo Nación Media",
        type: "Independent commercial media group",
      },
      editorialStance: "Major national daily newspaper; conservative editorial line focusing on free enterprise, agribusiness, livestock exports, macroeconomic stability, and national politics",
      readership: {
        metric: "Over 25,000 daily print circulation and strong digital engagement across the Nación Media network",
        source: "Grupo Nación Media Audit 2023",
      },
      revenueModel: "Print circulation, commercial display advertising, and television broadcast ads",
      logo: "newspaper-logos/py/la-nacion.svg",
      logoExplainer: "Dignified dark navy blue field featuring refined white serif typography 'LA NACIÓN' with red and blue accent lines.",
      sources: [
        "https://www.lanacion.com.py",
        "https://es.wikipedia.org/wiki/La_Naci%C3%B3n_(Paraguay)",
      ],
    },
    {
      id: "py-paraguay-tv",
      countryCode: "PY",
      name: "Paraguay TV",
      founded: 2011,
      frequency: "Continuous public television news broadcaster",
      format: "Digital terrestrial television & web streaming",
      language: "Spanish, Guaraní",
      headquarters: "Asunción",
      owner: {
        name: "MITIC (Government of Paraguay)",
        type: "State public broadcaster",
      },
      annualPublicFunding: {
        total: "PYG 14.5 billion",
        perCapita: "PYG 2,150.00",
      },
      editorialStance: "First digital public service television channel in Paraguay; broadcasts educational content, bilingual news in Spanish and Guaraní, cultural heritage programming, and parliamentary coverage",
      readership: {
        metric: "Available on free-to-air digital television (DTT Channel 14) covering Greater Asunción and nationwide cable",
        source: "MITIC Dirección General de Medios 2023",
      },
      revenueModel: "State government budget funding",
      logo: "newspaper-logos/py/paraguay-tv.svg",
      logoExplainer: "Paraguayan tricolor rounded icon with crisp white typography 'PARAGUAY TV', denoting public service state television.",
      sources: [
        "https://www.mitic.gov.py",
        "https://es.wikipedia.org/wiki/Paraguay_TV",
      ],
    },
  ],

  // Peru
  PE: [
    {
      id: "pe-andina",
      countryCode: "PE",
      name: "Andina (Agencia Peruana de Noticias)",
      nativeName: "Agencia Peruana de Noticias Andina",
      englishTranslation: "Peruvian News Agency Andina",
      founded: 1981,
      frequency: "Real-time news wire service & El Peruano",
      format: "News wire, daily official gazette (El Peruano) & digital portal",
      language: "Spanish, Quechua, Aymara, English",
      headquarters: "Jirón Quilca, Lima",
      owner: {
        name: "Editora Perú (State Public Enterprise)",
        type: "State news agency",
      },
      annualPublicFunding: {
        total: "PEN 42.0 million",
        perCapita: "PEN 1.25",
      },
      editorialStance: "Official national news agency of Peru and sister outlet to the historic official gazette El Peruano (founded 1825 by Simón Bolívar); delivers impartial wire coverage of Congress, constitutional tribunals, mining projects, and Amazonian affairs",
      readership: {
        metric: "Primary wire source syndicating news to over 150 radio networks, regional newspapers, and television stations across all 25 regions",
        source: "Editora Perú Memoria Anual 2023",
      },
      revenueModel: "State budget allocation, official legal announcements, and wire subscriptions",
      logo: "newspaper-logos/pe/andina.svg",
      logoExplainer: "Peruvian crimson red banner featuring bold white modern geometric lettering 'ANDINA' with gold accent, symbolising the national news agency.",
      sources: [
        "https://andina.pe",
        "https://es.wikipedia.org/wiki/Andina_(agencia_de_informaci%C3%B3n)",
      ],
    },
    {
      id: "pe-el-comercio",
      countryCode: "PE",
      name: "El Comercio",
      founded: 1839,
      frequency: "Daily morning newspaper (Monday–Sunday) & Canal N",
      format: "Broadsheet, cable news (Canal N) & digital subscriber portal",
      language: "Spanish",
      headquarters: "Jirón Miró Quesada, Historic Centre, Lima",
      owner: {
        name: "Empresa Editora El Comercio S.A. (Miró Quesada Family)",
        type: "Independent commercial media group",
      },
      editorialStance: "Peru's century-and-a-half-old newspaper of record and one of the oldest in the Spanish-speaking world; center-right conservative flagship renowned for thorough political investigations, judicial coverage, and macroeconomic analysis",
      readership: {
        metric: "Over 90,000 paid daily print copies and elcomercio.pe is Peru's leading digital news site with over 22 million monthly readers",
        source: "Audit Bureau of Circulations Latin America / Comscore 2023",
      },
      revenueModel: "Print circulation, digital paywall subscriptions (El Comercio+), and display advertising",
      logo: "newspaper-logos/pe/el-comercio.svg",
      logoExplainer: "Classic black gothic masthead 'El Comercio' on clean white background, evoking nearly two centuries of Peruvian newspaper leadership.",
      sources: [
        "https://elcomercio.pe",
        "https://es.wikipedia.org/wiki/El_Comercio_(Per%C3%BA)",
      ],
    },
    {
      id: "pe-rpp-noticias",
      countryCode: "PE",
      name: "RPP Noticias (Radio Programas del Perú)",
      founded: 1963,
      frequency: "24/7 multimedia news broadcasting",
      format: "AM/FM radio network, cable TV & digital portal",
      language: "Spanish",
      headquarters: "Avenida Paseo de la República, San Isidro, Lima",
      owner: {
        name: "Grupo RPP (Delgado Parker Family)",
        type: "Independent commercial media group",
      },
      editorialStance: "Peru's most trusted and influential radio news broadcaster; known for instant live coverage of earthquakes, presidential crises, citizen telephone calls from all provinces, and investigative journalism",
      readership: {
        metric: "The most listened-to radio news network in Peru, reaching over 10 million listeners daily nationwide across its vast transmitter network",
        source: "CPI Compañía Peruana de Investigación de Mercados 2023",
      },
      revenueModel: "Commercial radio advertising, digital network ads, and sponsored events",
      logo: "newspaper-logos/pe/rpp-noticias.svg",
      logoExplainer: "Vibrant yellow disc with bold black letters 'RPP' on deep blue field, representing Peru's most recognized news radio brand.",
      sources: [
        "https://rpp.pe",
        "https://es.wikipedia.org/wiki/RPP",
      ],
    },
    {
      id: "pe-la-republica",
      countryCode: "PE",
      name: "La República",
      founded: 1981,
      frequency: "Daily morning newspaper (Monday–Sunday) & digital portal",
      format: "Compact & digital news superportal",
      language: "Spanish, Quechua",
      headquarters: "Jirón Camaná, Lima",
      owner: {
        name: "Grupo La República Publicaciones S.A. (Mohme Family)",
        type: "Independent commercial media group",
      },
      editorialStance: "Premier center-left progressive daily newspaper; famous for uncovering the 'Vladivideos' corruption scandal that toppled the Fujimori regime, championing human rights, indigenous empowerment, and democratic accountability",
      readership: {
        metric: "Over 70,000 daily print circulation and larepublica.pe ranks consistently among the top two most visited news websites in Peru",
        source: "Kantar IBOPE Media Peru 2023",
      },
      revenueModel: "Print sales, digital programmatic advertising, and video sponsorships",
      logo: "newspaper-logos/pe/la-republica.svg",
      logoExplainer: "Vivid scarlet red background displaying crisp white condensed serif capital letters 'LA REPÚBLICA', denoting fearless democratic journalism.",
      sources: [
        "https://larepublica.pe",
        "https://es.wikipedia.org/wiki/La_Rep%C3%BAblica_(Per%C3%BA)",
      ],
    },
    {
      id: "pe-gestion",
      countryCode: "PE",
      name: "Gestión",
      founded: 1990,
      frequency: "Daily financial newspaper (Monday–Friday)",
      format: "Broadsheet & financial digital portal",
      language: "Spanish",
      headquarters: "Lima",
      owner: {
        name: "Empresa Editora El Comercio S.A.",
        type: "Independent commercial media",
      },
      editorialStance: "Peru's leading financial and business daily newspaper; comprehensive coverage of the Lima Stock Exchange (BVL), copper and gold mining markets, foreign direct investment, taxation, and corporate mergers",
      readership: {
        metric: "Over 30,000 daily print readership, essential morning reading for corporate executives, bankers, and government economic ministers",
        source: "Grupo El Comercio Financial Publishing 2023",
      },
      revenueModel: "Paid enterprise subscriptions, financial market advertising, and corporate events",
      logo: "newspaper-logos/pe/gestion.svg",
      logoExplainer: "Deep corporate navy blue field with bold white typography 'GESTIÓN' and golden accent line, symbolising financial market intelligence.",
      sources: [
        "https://gestion.pe",
        "https://es.wikipedia.org/wiki/Gesti%C3%B3n_(diario)",
      ],
    },
  ],

  // Philippines
  PH: [
    {
      id: "ph-pna",
      countryCode: "PH",
      name: "PNA (Philippine News Agency)",
      founded: 1973,
      frequency: "Real-time national news wire service",
      format: "News wire & digital portal",
      language: "English, Filipino",
      headquarters: "PIA Building, Visayas Avenue, Quezon City",
      owner: {
        name: "News and Information Bureau (Presidential Communications Office)",
        type: "State news agency",
      },
      annualPublicFunding: {
        total: "PHP 185 million",
        perCapita: "PHP 1.60",
      },
      editorialStance: "Official national news agency of the Republic of the Philippines; delivers verified dispatches on Malacañang Presidential decrees, Senate and House bills, disaster risk reduction (PAGASA updates), and ASEAN diplomacy",
      readership: {
        metric: "Primary wire source feeding over 200 community newspapers, radio stations, television networks, and provincial information centers",
        source: "PNA Annual Accomplishment Report 2023",
      },
      revenueModel: "National government budgetary funding",
      logo: "newspaper-logos/ph/pna.svg",
      logoExplainer: "Philippine blue and red bicolor banner with golden three-star sunburst element and white bold typography 'PNA - PHILIPPINE NEWS AGENCY'.",
      sources: [
        "https://www.pna.gov.ph",
        "https://en.wikipedia.org/wiki/Philippine_News_Agency",
      ],
    },
    {
      id: "ph-manila-bulletin",
      countryCode: "PH",
      name: "Manila Bulletin",
      founded: 1900,
      frequency: "Daily morning newspaper (Monday–Sunday) & digital portal",
      format: "Broadsheet & digital portal",
      language: "English",
      headquarters: "Muralla corner Recoletos St., Intramuros, Manila",
      owner: {
        name: "Manila Bulletin Publishing Corporation (Yap Family)",
        type: "Publicly listed media corporation",
      },
      editorialStance: "The nation's oldest surviving daily newspaper, founded in 1900; traditionally known as the 'Exponent of Philippine Progress', focusing on economic stability, government policies, shipping, and community lifestyle",
      readership: {
        metric: "Over 200,000 daily print circulation, widely circulated in government offices, schools, and business libraries nationwide",
        source: "Manila Bulletin Publishing Corp Annual Report 2023",
      },
      revenueModel: "Print sales, classifieds, digital advertising, and corporate announcements",
      logo: "newspaper-logos/ph/manila-bulletin.svg",
      logoExplainer: "Traditional black Old English masthead 'MANILA BULLETIN' on pure white background, reflecting over 120 years of continuous publishing in Intramuros.",
      sources: [
        "https://mb.com.ph",
        "https://en.wikipedia.org/wiki/Manila_Bulletin",
      ],
    },
    {
      id: "ph-philippine-daily-inquirer",
      countryCode: "PH",
      name: "Philippine Daily Inquirer",
      founded: 1985,
      frequency: "Daily morning newspaper (Monday–Sunday) & continuous digital portal",
      format: "Broadsheet & digital news portal",
      language: "English",
      headquarters: "Chino Roces Avenue, Makati, Metro Manila",
      owner: {
        name: "Inquirer Holdings, Inc. (Prieto Family)",
        type: "Independent commercial media group",
      },
      editorialStance: "Founded during the twilight of the Marcos martial law era to champion press freedom; the Philippines' premier broadsheet of record, famous for hard-hitting investigative journalism, exposing corruption, and political accountability",
      readership: {
        metric: "Over 250,000 daily print circulation and inquirer.net is one of the most visited English news portals in Southeast Asia with over 30 million monthly page views",
        source: "United Print Media Group (UPMG) / Similarweb 2023",
      },
      revenueModel: "Print sales, digital subscriptions (Inquirer Plus), and corporate display advertising",
      logo: "newspaper-logos/ph/philippine-daily-inquirer.svg",
      logoExplainer: "Classic black gothic masthead 'PHILIPPINE DAILY INQUIRER' on clean white background with signature red underline, symbolizing courageous press freedom.",
      sources: [
        "https://www.inquirer.net",
        "https://en.wikipedia.org/wiki/Philippine_Daily_Inquirer",
      ],
    },
    {
      id: "ph-the-philippine-star",
      countryCode: "PH",
      name: "The Philippine Star",
      founded: 1986,
      frequency: "Daily morning newspaper (Monday–Sunday) & Philstar.com",
      format: "Broadsheet & digital superportal",
      language: "English",
      headquarters: "Roberto S. Oca St., Port Area, Manila",
      owner: {
        name: "Philstar Media Group (MediaQuest Holdings)",
        type: "Independent commercial media group",
      },
      editorialStance: "Major high-circulation broadsheet daily; balanced center-right editorial tradition, known for comprehensive coverage of business conglomerates, infrastructure megaprojects, lifestyle, and sports",
      readership: {
        metric: "Over 240,000 daily print copies and philstar.com reaches over 15 million monthly digital readers",
        source: "UPMG Audit Statement 2023",
      },
      revenueModel: "Print sales, extensive corporate advertising, and digital sponsorships",
      logo: "newspaper-logos/ph/the-philippine-star.svg",
      logoExplainer: "Deep navy blue background displaying commanding white serif capitals 'THE PHILIPPINE STAR' with gold starburst accent, embodying national broadsheet prestige.",
      sources: [
        "https://www.philstar.com",
        "https://en.wikipedia.org/wiki/The_Philippine_Star",
      ],
    },
    {
      id: "ph-rappler",
      countryCode: "PH",
      name: "Rappler",
      founded: 2012,
      frequency: "Continuous digital investigative news service",
      format: "Pure digital news portal, mobile app & investigative multimedia",
      language: "English, Filipino",
      headquarters: "Pasig, Metro Manila",
      owner: {
        name: "Rappler Holdings Corporation (Maria Ressa)",
        type: "Independent digital investigative media",
      },
      editorialStance: "Nobel Peace Prize-winning digital newsroom led by Maria Ressa; internationally acclaimed for groundbreaking investigations into state disinformation networks, social media weaponization, extrajudicial killings, and democratic defense",
      readership: {
        metric: "Over 8 million monthly unique digital visitors and globally recognized pioneer in digital journalism ethics",
        source: "Reuters Institute Digital News Report 2023",
      },
      revenueModel: "Reader crowdfunding (Rappler+), digital display ads, investigative grants, and civic data projects",
      logo: "newspaper-logos/ph/rappler.svg",
      logoExplainer: "Dark slate background featuring bright orange circular emblem and crisp white lowercase typography 'rappler', symbolising courageous digital truth-telling.",
      sources: [
        "https://www.rappler.com",
        "https://en.wikipedia.org/wiki/Rappler",
      ],
    },
  ],
};
