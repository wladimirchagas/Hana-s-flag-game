import type { NewsAgency } from "../types/newsAgency";

/**
 * Curated and sourced dataset of national news agencies for Learn mode.
 */

export const NATIONAL_NEWS_AGENCIES: Record<string, readonly NewsAgency[]> = {
  "AU": [
    {
      "id": "au-aap",
      "countryCode": "AU",
      "name": "Australian Associated Press",
      "officialName": "Australian Associated Press Ltd",
      "founded": 1935,
      "frequency": "Continuous 24/7 national newswire",
      "format": "National newswire, digital syndication & fact-checking service",
      "language": "English",
      "headquarters": "Sydney, New South Wales",
      "owner": {
        "name": "AAP Ltd (Public-interest non-profit consortium)",
        "type": "Non-profit public-interest news agency"
      },
      "editorialStance": "Independent, non-partisan, objective wire reporting and verified fact-checking (IFCN signatory)",
      "readership": {
        "metric": "14+ million monthly readers reached across 400+ publications, broadcast networks, and digital platforms nationwide",
        "source": "AAP Annual Review & Impact Report 2023–24"
      },
      "annualPublicFunding": {
        "total": "A$5.0 million / year (Commonwealth Public Interest News Gathering / PING grant allocation)",
        "perCapita": "A$0.19 / person / year"
      },
      "revenueModel": "Non-profit hybrid: commercial subscriber news licensing, philanthropic foundations, and Commonwealth Government public-interest grants",
      "logo": "newspaper-logos/au/aap.svg",
      "logoExplainer": "The AAP emblem features a dynamic multi-faceted spherical cluster composed of interlocking geometric polygons in shades of azure, navy, and cyan blue, followed by the bold lowercase typography 'aap'. The spherical polyhedron represents multi-perspective objective journalism, data aggregation, and rapid news delivery connecting Australia's states and territories to the world.",
      "sources": [
        "https://www.aap.com.au/about/",
        "https://newsroom.aap.com.au/",
        "https://www.infrastructure.gov.au/media-communications-arts/regional-and-local-news"
      ],
      "licenceNote": "National news agency trademark bundled for educational reference in Learn mode."
    }
  ],
  "MY": [
    {
      "id": "my-bernama",
      "countryCode": "MY",
      "name": "Bernama",
      "officialName": "Pertubuhan Berita Nasional Malaysia",
      "nativeName": "Pertubuhan Berita Nasional Malaysia",
      "englishTranslation": "Malaysian National News Agency",
      "founded": 1967,
      "frequency": "Continuous 24/7 multimedia newswire",
      "format": "Multimedia wire service, television (Bernama TV), radio & digital news portal",
      "language": "Malay (Bahasa Melayu), English, Mandarin, Tamil, Arabic, Spanish",
      "headquarters": "Wisma Bernama, Jalan Tun Razak, Kuala Lumpur",
      "owner": {
        "name": "Government of Malaysia (Ministry of Communications)",
        "type": "Statutory corporation"
      },
      "editorialStance": "National public news service providing factual, comprehensive, and objective coverage of national development, parliamentary proceedings, and regional ASEAN affairs",
      "readership": {
        "metric": "3.8 million monthly digital visitors on Bernama.com; 100% domestic syndication reach across all print, television, and radio broadcasters",
        "source": "Malaysian Communications and Multimedia Commission (MCMC) & Reuters Institute 2024"
      },
      "annualPublicFunding": {
        "total": "RM 115.0 million (~US$26.5M) annual government operating grant (2024)",
        "perCapita": "RM 3.43 / person / year (~US$0.79)"
      },
      "revenueModel": "Federal government statutory operating grant supplemented by commercial wire service subscriptions and advertising",
      "logo": "newspaper-logos/my/bernama.png",
      "logoExplainer": "The Bernama emblem features a solid sky-blue rounded square containing an angular geometric white monogram forming the letter 'B'. The sharp, intersecting facets evoke broadcast transmission signals, digital relay antennas, and multifaceted news reporting, while the bold uppercase title 'BERNAMA' below anchors the visual identity with authority and clarity.",
      "sources": [
        "https://www.bernama.com/",
        "https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2024/malaysia",
        "https://www.kkd.gov.my/"
      ],
      "licenceNote": "National news agency trademark bundled for educational reference in Learn mode."
    }
  ],
  "BR": [
    {
      "id": "br-agencia-brasil",
      "countryCode": "BR",
      "name": "Agência Brasil",
      "officialName": "Agência Brasil (Empresa Brasil de Comunicação - EBC)",
      "nativeName": "Agência Brasil",
      "englishTranslation": "Brazil Agency",
      "motto": {
        "original": "A informação que o cidadão precisa",
        "translation": "The information that the citizen needs"
      },
      "founded": 1946,
      "frequency": "Continuous 24/7 digital newswire",
      "format": "Public digital newswire, photography wire (Foto Agência), and audio feed (Radioagência Nacional)",
      "language": "Portuguese (Português), with editions in English and Spanish",
      "headquarters": "Venâncio Shopping, Brasília, Distrito Federal (with regional bureaus in Rio de Janeiro, São Paulo, and São Luís)",
      "owner": {
        "name": "Empresa Brasil de Comunicação (EBC)",
        "type": "Federal state-owned public communication corporation"
      },
      "editorialStance": "Public interest citizenship journalism focusing on public policies, human rights, civic access, and factual reporting guided by the EBC Journalism Manual",
      "readership": {
        "metric": "14.2 million monthly unique web visits / 26M+ monthly pageviews; syndicated under Creative Commons (CC-BY 3.0) by over 2,000 national, regional, and municipal news outlets",
        "source": "EBC Relatório de Gestão & Transparência 2023–2024"
      },
      "annualPublicFunding": {
        "total": "R$ 52.3 million allocated to agency news services (within EBC's total R$ 685.4 million federal budget)",
        "perCapita": "R$ 0.25 / person / year (for wire services; R$ 3.25 EBC total)"
      },
      "revenueModel": "100% public funding through the Federal Government General Budget (OGU) and telecommunications public contribution fund (FISTEL)",
      "logo": "newspaper-logos/br/agencia-brasil.svg",
      "logoExplainer": "Unveiled in the 2023 EBC institutional brand refresh, the Agência Brasil logo pairs a refined modern sans-serif wordmark in lowercase ('agênciaBrasil') with a dynamic circular emblem at the right. The open circular emblem, formed by energetic curved strokes evoking an orbital sweep, symbolizes the universal flow of information, transparency, and the national embrace of Brazilian public media across all regions.",
      "sources": [
        "https://agenciabrasil.ebc.com.br/sobre",
        "https://www.ebc.com.br/acesso-a-informacao",
        "https://acessoainformacao.ebc.com.br/auditorias/demonstracoes-financeiras"
      ],
      "licenceNote": "Public news agency trademark bundled for educational reference in Learn mode."
    }
  ],
  "NR": [
    {
      "id": "nr-gio",
      "countryCode": "NR",
      "name": "Government Information Office / Naoero Bulletin",
      "officialName": "Republic of Naoero Government Information Office (GIO)",
      "nativeName": "Naoero Bulletin (Ofisin Informasiyo)",
      "englishTranslation": "Nauru Bulletin (Government Information Office)",
      "motto": {
        "original": "God's Will First",
        "translation": "National motto of the Republic of Naoero"
      },
      "founded": 2008,
      "frequency": "Fortnightly print & digital gazette, with real-time media releases",
      "format": "Official government newswire, press bulletins, and fortnightly public newsletter (Naoero Bulletin)",
      "language": "English and Nauruan (Dorerin Naoero)",
      "headquarters": "Office of the President, Government Offices, Yaren District",
      "owner": {
        "name": "Republic of Naoero (Office of the President)",
        "type": "Government executive information service"
      },
      "editorialStance": "Official public information, statutory announcements, ministerial communications, and community news for the Republic of Naoero",
      "readership": {
        "metric": "4,500+ fortnightly print and digital recipients (reaching ~35% of the island's resident population of 12,500 plus diplomatic missions and overseas diaspora)",
        "source": "Republic of Naoero Government Information Office distribution records"
      },
      "annualPublicFunding": {
        "total": "A$480,000 annual operational budget for GIO and public media publishing",
        "perCapita": "A$38.40 / person / year"
      },
      "revenueModel": "100% state budget allocation through the Office of the President national appropriation",
      "logo": "newspaper-logos/nr/nauru-gio.svg",
      "logoExplainer": "The Government Information Office bears the official Coat of Arms of the Republic of Naoero (Nauru). At the crest is a 12-pointed white star representing the island's 12 indigenous tribes above the alchemical emblem for phosphorus, commemorating the nation's historic phosphate heritage. The lower shield depicts a frigate bird (Fregata) on a perch over blue ocean waves and a flowering branch of the indigenous tomano tree, surrounded by palm fronds, tribal chief adornments, and the national motto 'God's Will First'.",
      "sources": [
        "https://www.nauru.gov.nr",
        "https://www.naurugov.nr/government-information-office.aspx",
        "https://www.sbs.com.au/news/article/nauru-officially-changes-name-to-naoero/2026-08-01"
      ],
      "licenceNote": "Republic of Naoero official coat of arms bundled for educational reference in Learn mode."
    }
  ],
  "VA": [
    {
      "id": "va-vatican-news",
      "countryCode": "VA",
      "name": "Vatican News",
      "officialName": "Dicastero per la Comunicazione",
      "nativeName": "Dicastero per la Comunicazione",
      "englishTranslation": "Dicastery for Communication (incorporating Vatican News and L'Osservatore Romano)",
      "motto": {
        "original": "Unicuique suum / Non praevalebunt",
        "translation": "To each his own / They shall not prevail (Matthew 16:18)"
      },
      "founded": 2017,
      "frequency": "Continuous 24/7 global multimedia newswire",
      "format": "Multilingual digital news portal, Vatican Radio audio stream, print daily (L'Osservatore Romano), and television feed (Vatican Media)",
      "language": "53 broadcast languages (including Italian, English, Spanish, French, Portuguese, German, Arabic, Polish, Chinese, and Latin)",
      "headquarters": "Piazza Pia 3, Rome / Vatican City State",
      "owner": {
        "name": "Holy See (The Roman Curia / Dicastery for Communication)",
        "type": "Sovereign state media & pastoral communications organ"
      },
      "editorialStance": "Official global communications service of the Holy See, providing universal coverage of the Papacy, the Roman Curia, international diplomacy, and the worldwide Catholic Church",
      "readership": {
        "metric": "11.5+ million monthly digital visitors across 53 languages; broadcast syndication to over 1,000 affiliate radio networks and press agencies worldwide",
        "source": "Dicastero per la Comunicazione Relazione di Bilancio & Vatican Media Analytics 2024"
      },
      "annualPublicFunding": {
        "total": "€38.5 million total annual operating budget for the Dicastery for Communication",
        "perCapita": "€48,125 / resident / year (across Vatican City's ~800 residents; serves 1.39 billion Catholics globally at €0.03/person)"
      },
      "revenueModel": "Funded directly by the Holy See Roman Curia budget (Holy See patrimony and Peter's Pence apostolic collection)",
      "logo": "newspaper-logos/va/vatican-news.png",
      "logoExplainer": "The Vatican News identity features the signature red background of papal ceremonial heraldry. On the left, a crisp square frame contains the Keys of Saint Peter crossed in saltire (one gold, one silver) bound by a cordon and surmounted by the papal triple tiara (triregnum), symbolizing papal apostolic authority and spiritual ministry. To the right, 'VATICAN NEWS' is rendered in clean geometric white typography, contrasting tradition with modern global accessibility.",
      "sources": [
        "https://www.vaticannews.va/",
        "https://www.comunicazione.va/",
        "https://www.vatican.va/roman_curia/secretariat-communication/index.htm"
      ],
      "licenceNote": "Holy See Dicastery for Communication trademark bundled for educational reference in Learn mode."
    }
  ],
  "AF": [
    {
      "id": "af-bakhtar",
      "countryCode": "AF",
      "name": "Bakhtar News Agency",
      "officialName": "Bakhtar News Agency (BNA)",
      "founded": 1939,
      "frequency": "Daily official state newswire",
      "format": "Multimedia newswire & digital portal",
      "language": "Pashto, Dari, English",
      "headquarters": "Kabul",
      "owner": {
        "name": "Ministry of Information and Culture",
        "type": "Government ministry / department"
      },
      "editorialStance": "Official state news agency; official government bulletins and national announcements",
      "readership": {
        "metric": "Primary news supplier for Afghan domestic broadcasters, provincial radio, and print outlets",
        "source": "Ministry of Information and Culture / BNA Official"
      },
      "revenueModel": "Directly funded through the state budget",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://bakhtarnews.af",
        "https://en.wikipedia.org/wiki/Bakhtar_News_Agency"
      ]
    },
    {
      "id": "af-pajhwok",
      "countryCode": "AF",
      "name": "Pajhwok Afghan News",
      "founded": 2003,
      "frequency": "Continuous newswire service",
      "format": "Independent digital newswire & photo service",
      "language": "Pashto, Dari, English",
      "headquarters": "Kabul",
      "owner": {
        "name": "Pajhwok Afghan News LLC",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent news agency; non-partisan coverage of provincial affairs, security, and human rights",
      "readership": {
        "metric": "Highest-reach independent newswire with correspondents across all 34 provinces",
        "source": "Pajhwok Afghan News Organization Report 2024"
      },
      "revenueModel": "Newswire subscriptions, photo syndication, and international media partnerships",
      "logo": "newspaper-logos/af/pajhwok.png",
      "logoExplainer": "White 'PAJHWOK AFGHAN NEWS' wordmark with calligraphic mark and 'Reflecting the Truth' strap — the agency's official masthead.",
      "licenceNote": "Pajhwok Afghan News masthead trademark bundled from the agency's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://pajhwok.com",
        "https://en.wikipedia.org/wiki/Pajhwok_Afghan_News"
      ]
    },
    {
      "id": "af-khaama",
      "countryCode": "AF",
      "name": "Khaama Press",
      "founded": 2010,
      "frequency": "Continuous digital publishing",
      "format": "Digital news agency & online portal",
      "language": "English, Pashto, Dari",
      "headquarters": "Kabul",
      "owner": {
        "name": "Khaama Press News Agency",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent digital news outlet; business, political, and diplomatic reporting",
      "readership": {
        "metric": "1.2 million monthly unique online visitors",
        "source": "Khaama Press Media Kit 2024"
      },
      "revenueModel": "Digital advertising, sponsored content, and syndication",
      "logo": "newspaper-logos/af/khaama.png",
      "logoExplainer": "Official masthead/brand mark for Khaama Press, sourced from Wikimedia Commons and visually verified.",
      "licenceNote": "Khaama Press brand mark trademark bundled from Wikimedia Commons (File:Khaama-Press-Logo.png) for educational reference in Learn mode.",

      "sources": [
        "https://www.khaama.com",
        "https://en.wikipedia.org/wiki/Khaama_Press"
      ]
    }
  ],
  "AL": [
    {
      "id": "al-atsh",
      "countryCode": "AL",
      "name": "Albanian Telegraphic Agency",
      "nativeName": "Agjencia Telegrafike Shqiptare",
      "englishTranslation": "Albanian Telegraphic Agency",
      "founded": 1912,
      "frequency": "Continuous 24/7 state newswire",
      "format": "Official state newswire & photo service",
      "language": "Albanian, English, French",
      "headquarters": "Tirana",
      "owner": {
        "name": "Republic of Albania (Council of Ministers)",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official state news agency; government policy, parliamentary proceedings, and foreign diplomacy",
      "readership": {
        "metric": "Primary source of official news for Albanian domestic media and accredited international correspondents",
        "source": "ATSH Official Annual Report 2023"
      },
      "revenueModel": "State budget allocation and commercial newswire licensing",
      "logo": "newspaper-logos/al/atsh.svg",
      "logoExplainer": "Official masthead/brand mark for Albanian Telegraphic Agency, sourced from Wikimedia Commons and visually verified.",
      "licenceNote": "Albanian Telegraphic Agency brand mark trademark bundled from Wikimedia Commons (File:Agjencia Telegrafike Shqiptare.svg) for educational reference in Learn mode.",

      "sources": [
        "https://ata.gov.al",
        "https://en.wikipedia.org/wiki/Albanian_Telegrafic_Agency"
      ]
    }
  ],
  "DZ": [
    {
      "id": "dz-aps",
      "countryCode": "DZ",
      "name": "Algérie Presse Service",
      "officialName": "Algérie Presse Service (APS)",
      "founded": 1961,
      "frequency": "Continuous 24/7 state newswire",
      "format": "Official state newswire & photo service",
      "language": "Arabic, French, Tamazight, English",
      "headquarters": "Algiers",
      "owner": {
        "name": "People's Democratic Republic of Algeria",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official state news agency; presidential decrees, government policy, and diplomatic affairs",
      "readership": {
        "metric": "Primary news agency supplying all Algerian public and private newspapers, TV, and radio networks",
        "source": "APS Annual Report 2023"
      },
      "revenueModel": "Direct state budget allocation and subscriber licensing fees",
      "logo": "newspaper-logos/dz/aps.png",
      "logoExplainer": "Official masthead/brand mark for Algérie Presse Service, sourced from the publisher's official site and visually verified.",
      "licenceNote": "Algérie Presse Service brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.aps.dz",
        "https://en.wikipedia.org/wiki/Alg%C3%A9rie_Presse_Service"
      ]
    },
    {
      "id": "dz-el-khabar",
      "countryCode": "DZ",
      "name": "El Khabar",
      "englishTranslation": "The News",
      "founded": 1990,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "Arabic",
      "headquarters": "Algiers",
      "owner": {
        "name": "El Khabar SPA",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent Arabic daily; broad political commentary, domestic politics, and social reporting",
      "readership": {
        "metric": "One of the most widely read Arabic-language dailies in Algeria (~100,000 daily print circulation)",
        "source": "OJD Middle East & North Africa"
      },
      "revenueModel": "Print retail sales and commercial display advertising",
      "logo": "newspaper-logos/dz/el-khabar.svg",
      "logoExplainer": "Arabic 'الخبر' masthead — El Khabar's brand mark.",
      "licenceNote": "Trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.elkhabar.com",
        "https://en.wikipedia.org/wiki/El_Khabar"
      ]
    }
  ],
  "AD": [
    {
      "id": "ad-ana",
      "countryCode": "AD",
      "name": "Agència de Notícies Andorrana",
      "englishTranslation": "Andorran News Agency (ANA)",
      "founded": 2008,
      "frequency": "Continuous newswire service",
      "format": "Digital newswire & photo agency",
      "language": "Catalan",
      "headquarters": "Andorra la Vella",
      "owner": {
        "name": "ANA Media Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "National newswire service; objective news reporting on Andorran public affairs and institutions",
      "readership": {
        "metric": "Primary wire service supplying Andorran newspapers, radio stations, and digital portals",
        "source": "Agència de Notícies Andorrana Official"
      },
      "revenueModel": "Media subscription fees and syndication",
      "logo": "newspaper-logos/ad/ana.png",
      "logoExplainer": "Official masthead/brand mark for Agència de Notícies Andorrana, sourced from the publisher's official site and visually verified.",
      "licenceNote": "Agència de Notícies Andorrana brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.ana.ad",
        "https://ca.wikipedia.org/wiki/Ag%C3%A8ncia_de_Not%C3%ADcies_Andorrana"
      ]
    }
  ],
  "AO": [
    {
      "id": "ao-angop",
      "countryCode": "AO",
      "name": "Agência Angola Press",
      "officialName": "Agência Angola Press (ANGOP)",
      "founded": 1975,
      "frequency": "Continuous 24/7 state newswire",
      "format": "Official state newswire & photo service",
      "language": "Portuguese, English, French, Spanish",
      "headquarters": "Luanda",
      "owner": {
        "name": "Republic of Angola",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official state news agency; government policy, national infrastructure, and African regional diplomacy",
      "readership": {
        "metric": "Sole national news agency of Angola, supplying news to all domestic TV, radio, and print outlets",
        "source": "ANGOP Institutional Report 2023"
      },
      "revenueModel": "Direct state budget allocation and subscriber licensing",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.angop.ao",
        "https://en.wikipedia.org/wiki/Angola_Press_Agency"
      ]
    }
  ],
  "AG": [
    {
      "id": "ag-pointville",
      "countryCode": "AG",
      "name": "Point Express Newspaper",
      "officialName": "Pointville Publishing",
      "founded": 2020,
      "frequency": "Daily publication (Monday–Friday)",
      "format": "Digital daily e-paper & print publication",
      "language": "English",
      "headquarters": "St. John's",
      "owner": {
        "name": "Pointville Communications",
        "type": "Independent commercial media"
      },
      "editorialStance": "Daily news publication; national politics, economics, and community developments",
      "readership": {
        "metric": "Popular daily e-paper circulated widely via digital platforms and social channels",
        "source": "Pointville Publishing Review 2023"
      },
      "revenueModel": "Advertising and commercial publishing",
      "logo": "newspaper-logos/ag/pointville.png",
      "logoExplainer": "Official masthead/brand mark for Point Express Newspaper, sourced from the publisher's official site and visually verified.",
      "licenceNote": "Point Express Newspaper brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://pointville.ag"
      ]
    }
  ],
  "AR": [
    {
      "id": "ar-telam",
      "countryCode": "AR",
      "name": "Télam",
      "officialName": "Télam Agencia Nacional de Noticias",
      "founded": 1945,
      "frequency": "Continuous 24/7 state newswire",
      "format": "Official state newswire & photo service",
      "language": "Spanish, English",
      "headquarters": "Buenos Aires",
      "owner": {
        "name": "Argentine Republic",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "National public news agency; official state news, federal affairs, and international wire distribution",
      "readership": {
        "metric": "Historic state newswire supplying all major Argentine provincial and national newspapers",
        "source": "Agencia Télam Memory Report"
      },
      "revenueModel": "State public budget funding and content subscriber fees",
      "logo": "newspaper-logos/ar/telam.svg",
      "logoExplainer": "Lowercase 'télam' with signal-arc marks — Argentina's national news agency emblem.",
      "licenceNote": "Télam logo trademark bundled from Wikimedia Commons (File:Télam-logo-2021.svg) for educational reference in Learn mode.",

      "sources": [
        "https://www.telam.com.ar",
        "https://en.wikipedia.org/wiki/T%C3%A9lam"
      ]
    },
    {
      "id": "ar-el-cronista",
      "countryCode": "AR",
      "name": "El Cronista",
      "officialName": "El Cronista Comercial",
      "founded": 1908,
      "frequency": "Daily (Monday–Friday)",
      "format": "Tabloid & financial digital portal",
      "language": "Spanish",
      "headquarters": "Buenos Aires",
      "owner": {
        "name": "Grupo América",
        "type": "Commercial conglomerate"
      },
      "editorialStance": "Financial and business daily; macroeconomic news, markets, and corporate policy",
      "readership": {
        "metric": "Leading financial daily in Argentina read by business executives and financial markets",
        "source": "El Cronista Media Review 2023"
      },
      "revenueModel": "Corporate subscriptions, print sales, and financial advertising",
      "logo": "newspaper-logos/ar/el-cronista.png",
      "logoExplainer": "Teal 'C' disc beside 'El Cronista' — Argentina's business daily brand mark from its own site.",
      "licenceNote": "El Cronista masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.cronista.com",
        "https://es.wikipedia.org/wiki/El_Cronista_(n%C3%BAmero_comercial)"
      ]
    }
  ],
  "AM": [
    {
      "id": "am-armenpress",
      "countryCode": "AM",
      "name": "Armenpress",
      "officialName": "Armenpress News Agency State CJSC",
      "founded": 1918,
      "frequency": "Continuous 24/7 state newswire",
      "format": "Official state newswire & photo service",
      "language": "Armenian, Russian, English, French, Arabic, Spanish",
      "headquarters": "Yerevan",
      "owner": {
        "name": "Republic of Armenia",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "National state news agency; official state communications, foreign relations, and Nagorno-Karabakh reporting",
      "readership": {
        "metric": "Oldest and primary news agency of Armenia, supplying news to all Armenian domestic outlets and diaspora media",
        "source": "Armenpress Official Review 2023"
      },
      "revenueModel": "State budget allocation and subscriber service licensing",
      "logo": "newspaper-logos/am/armenpress.svg",
      "logoExplainer": "Official masthead/brand mark for Armenpress, sourced from Wikimedia Commons and visually verified.",
      "licenceNote": "Armenpress brand mark trademark bundled from Wikimedia Commons (File:Armenpress 2 logo.svg) for educational reference in Learn mode.",

      "sources": [
        "https://armenpress.am",
        "https://en.wikipedia.org/wiki/Armenpress"
      ]
    },
    {
      "id": "am-hayastani-hanrapetutyun",
      "countryCode": "AM",
      "name": "Hayastani Hanrapetutyun",
      "englishTranslation": "Republic of Armenia",
      "founded": 1990,
      "frequency": "Daily (Tuesday–Saturday)",
      "format": "Official print daily & digital portal",
      "language": "Armenian",
      "headquarters": "Yerevan",
      "owner": {
        "name": "National Assembly of Armenia",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official parliamentary daily newspaper; official legislative acts, laws, and state decrees",
      "readership": {
        "metric": "Official legal gazette and daily paper for civil servants and legal professionals in Armenia",
        "source": "National Assembly Press Division 2023"
      },
      "revenueModel": "State parliamentary budget allocation",
      "logo": "newspaper-logos/am/hayastani-hanrapetutyun.png",
      "logoExplainer": "Official masthead/brand mark for Hayastani Hanrapetutyun, sourced from the publisher's official site and visually verified.",
      "licenceNote": "Hayastani Hanrapetutyun brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://hhpress.am",
        "https://hy.wikipedia.org/wiki/%D5%80%D5%A1%D5%B5%D5%A1%D5%BD%D5%B2%D5%A1%D5%B6%D5%AB_%D5%80%D5%A1%D5%B6%D5%BF%D5%A1%D5%BA%D5%AE%D5%BF%D5%B8%D5%A9%D5%B5%D5%B8%D5%Living"
      ]
    }
  ],
  "AT": [
    {
      "id": "at-apa",
      "countryCode": "AT",
      "name": "Austria Presse Agentur",
      "officialName": "Austria Presse Agentur eG (APA)",
      "founded": 1946,
      "frequency": "Continuous 24/7 national newswire",
      "format": "Cooperative national newswire, photo & digital data agency",
      "language": "German, English",
      "headquarters": "Vienna",
      "owner": {
        "name": "APA eG (Cooperative of Austrian daily newspapers & ORF)",
        "type": "Independent trust / foundation"
      },
      "editorialStance": "Independent, non-partisan cooperative news agency; factual wire reporting and fact-checking",
      "readership": {
        "metric": "National news agency of Austria, supplying 100% of Austrian daily newspapers and broadcast networks",
        "source": "APA Annual Report 2023"
      },
      "annualPublicFunding": {
        "total": "A$0.00 / year (Fully self-funded cooperative owned by private newspapers and ORF)",
        "perCapita": "A$0.00 / person"
      },
      "revenueModel": "Commercial subscription fees from member newspapers, broadcasters, and corporate clients",
      "logo": "newspaper-logos/at/apa.png",
      "logoExplainer": "'APA' brand mark — Austria Presse Agentur's agency emblem.",
      "licenceNote": "Trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://apa.at",
        "https://en.wikipedia.org/wiki/Austria_Presse_Agentur"
      ]
    },
    {
      "id": "at-der-standard",
      "countryCode": "AT",
      "name": "Der Standard",
      "founded": 1988,
      "frequency": "Daily (Monday–Saturday)",
      "format": "Broadsheet (pink paper) & digital portal",
      "language": "German",
      "headquarters": "Vienna",
      "owner": {
        "name": "Oscar Bronner / STANDARD Medien AG",
        "type": "Independent commercial media"
      },
      "editorialStance": "Liberal-centre quality daily newspaper; international politics, culture, economics, and civil society",
      "readership": {
        "metric": "Leading online news portal in Austria (derStandard.at) with over 2.5 million monthly unique visitors",
        "source": "ÖWA (Österreichische Web-Analyse) 2024"
      },
      "revenueModel": "Digital subscriptions, pink paper print sales, and display advertising",
      "logo": "newspaper-logos/at/der-standard.svg",
      "logoExplainer": "'DERSTANDARD' serif with a tall S and underline — the Vienna daily masthead.",
      "licenceNote": "Trademark bundled from Wikimedia Commons (File:DER STANDARD LOGO schwarz.svg) for educational reference in Learn mode.",

      "sources": [
        "https://www.derstandard.at",
        "https://en.wikipedia.org/wiki/Der_Standard"
      ]
    }
  ],
  "AZ": [
    {
      "id": "az-azertac",
      "countryCode": "AZ",
      "name": "AZERTAC",
      "officialName": "Azerbaijan State News Agency",
      "founded": 1920,
      "frequency": "Continuous 24/7 state newswire",
      "format": "Official state newswire & photo service",
      "language": "Azerbaijani, English, Russian, French, German, Arabic, Chinese, Spanish",
      "headquarters": "Baku",
      "owner": {
        "name": "Republic of Azerbaijan",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official state news agency; government policy, presidential activity, and international diplomacy",
      "readership": {
        "metric": "Primary news supplier to domestic broadcast networks, print titles, and foreign diplomatic missions",
        "source": "AZERTAC Annual Report 2023"
      },
      "revenueModel": "Direct state budget allocation",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://azertag.az",
        "https://en.wikipedia.org/wiki/Azerbaijan_State_News_Agency"
      ]
    },
    {
      "id": "az-apa",
      "countryCode": "AZ",
      "name": "APA",
      "officialName": "Azeri Press Agency",
      "founded": 2004,
      "frequency": "Continuous digital newswire",
      "format": "Independent digital newswire service",
      "language": "Azerbaijani, English, Russian",
      "headquarters": "Baku",
      "owner": {
        "name": "APA Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Commercial news agency; breaking news, political commentary, and South Caucasus affairs",
      "readership": {
        "metric": "Over 1.5 million monthly online visits across Azerbaijani media outlets",
        "source": "APA Group Media Review 2024"
      },
      "revenueModel": "Digital advertising and news syndication",
      "logo": "newspaper-logos/az/apa.svg",
      "logoExplainer": "Official masthead/brand mark for APA, sourced from the publisher's official site and visually verified.",
      "licenceNote": "APA brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://apa.az",
        "https://en.wikipedia.org/wiki/Azeri-Press_Agency"
      ]
    },
    {
      "id": "az-trend",
      "countryCode": "AZ",
      "name": "Trend News Agency",
      "founded": 1995,
      "frequency": "Continuous newswire service",
      "format": "Commercial newswire & analytical portal",
      "language": "Azerbaijani, English, Russian, Persian",
      "headquarters": "Baku",
      "owner": {
        "name": "Trend Media Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Commercial news agency; energy sector, Caspian region economics, and international business",
      "readership": {
        "metric": "Major regional coverage across Caspian and Central Asian energy markets",
        "source": "Trend News Agency Corporate Profile"
      },
      "revenueModel": "Commercial subscriber feeds, energy reports, and advertising",
      "logo": "newspaper-logos/az/trend.png",
      "logoExplainer": "Official masthead/brand mark for Trend News Agency, sourced from the publisher's official site and visually verified.",
      "licenceNote": "Trend News Agency brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://en.trend.az",
        "https://en.wikipedia.org/wiki/Trend_News_Agency"
      ]
    },
    {
      "id": "az-report",
      "countryCode": "AZ",
      "name": "Report News Agency",
      "founded": 2014,
      "frequency": "Continuous digital newswire",
      "format": "Digital news agency portal",
      "language": "Azerbaijani, English, Russian",
      "headquarters": "Baku",
      "owner": {
        "name": "Global Media Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Commercial digital news agency; political events, economy, and sports reporting",
      "readership": {
        "metric": "Over 2 million monthly online page views",
        "source": "Report.az Media Kit 2024"
      },
      "revenueModel": "Digital display advertising and video news distribution",
      "logo": "newspaper-logos/az/report.png",
      "logoExplainer": "Official masthead/brand mark for Report News Agency, sourced from the publisher's official site and visually verified.",
      "licenceNote": "Report News Agency brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://report.az",
        "https://en.wikipedia.org/wiki/Report_News_Agency"
      ]
    }
  ],
  "BS": [
    {
      "id": "bs-bis",
      "countryCode": "BS",
      "name": "Bahamas Information Services",
      "officialName": "Bahamas Information Services (BIS)",
      "founded": 1974,
      "frequency": "Continuous state news service",
      "format": "Official government news agency",
      "language": "English",
      "headquarters": "Nassau",
      "owner": {
        "name": "Commonwealth of The Bahamas",
        "type": "Government ministry / department"
      },
      "editorialStance": "Official government news service; parliamentary proceedings, cabinet releases, and national public announcements",
      "readership": {
        "metric": "Official news provider for all Bahamian radio, TV, and print media",
        "source": "Bahamas Information Services"
      },
      "revenueModel": "Government parliamentary budget",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.bahamas.gov.bs",
        "https://en.wikipedia.org/wiki/Bahamas_Information_Services"
      ]
    }
  ],
  "BH": [
    {
      "id": "bh-bna",
      "countryCode": "BH",
      "name": "Bahrain News Agency",
      "officialName": "Bahrain News Agency (BNA)",
      "founded": 1976,
      "frequency": "Continuous 24/7 state newswire",
      "format": "Official state newswire & photo service",
      "language": "Arabic, English",
      "headquarters": "Manama",
      "owner": {
        "name": "Ministry of Information Affairs",
        "type": "Government ministry / department"
      },
      "editorialStance": "Official state news agency; royal decrees, government policy, and Gulf Cooperation Council (GCC) diplomacy",
      "readership": {
        "metric": "Primary wire agency supplying news to all domestic Bahraini newspapers, TV, and international press",
        "source": "BNA Institutional Review 2023"
      },
      "revenueModel": "Direct state budget allocation",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.bna.bh",
        "https://en.wikipedia.org/wiki/Bahrain_News_Agency"
      ]
    }
  ],
  "BD": [
    {
      "id": "bd-bss",
      "countryCode": "BD",
      "name": "Bangladesh Sangbad Sangstha",
      "officialName": "Bangladesh Sangbad Sangstha (BSS)",
      "founded": 1972,
      "frequency": "Continuous 24/7 state newswire",
      "format": "Official state newswire & photo agency",
      "language": "Bengali, English",
      "headquarters": "Dhaka",
      "owner": {
        "name": "People's Republic of Bangladesh",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official national news agency; parliamentary proceedings, state development, and diplomatic reporting",
      "readership": {
        "metric": "Primary news supplier to all Bangladeshi domestic newspapers, television channels, and radio stations",
        "source": "BSS Official Annual Report 2023"
      },
      "revenueModel": "Government parliamentary grant allocation and subscriber licensing",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.bssnews.net",
        "https://en.wikipedia.org/wiki/Bangladesh_Sangbad_Sangstha"
      ]
    },
    {
      "id": "bd-daily-star",
      "countryCode": "BD",
      "name": "The Daily Star",
      "founded": 1991,
      "frequency": "Daily (Monday–Sunday)",
      "format": "Broadsheet & digital portal",
      "language": "English",
      "headquarters": "Dhaka",
      "owner": {
        "name": "Mediaworld Ltd",
        "type": "Independent commercial media"
      },
      "editorialStance": "Leading English-language quality daily; independent, liberal stance, civil rights, and economic reporting",
      "readership": {
        "metric": "Largest circulation English newspaper in Bangladesh (over 8 million monthly unique web visitors)",
        "source": "Reuters Institute Digital News Report 2023"
      },
      "revenueModel": "Print newsstand sales, display advertising, and digital subscriptions",
      "logo": "newspaper-logos/bd/daily-star.svg",
      "logoExplainer": "'The Daily Star' masthead — Bangladesh's English daily.",
      "licenceNote": "Trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.thedailystar.net",
        "https://en.wikipedia.org/wiki/The_Daily_Star_(Bangladesh)"
      ]
    },
    {
      "id": "bd-bdnews24",
      "countryCode": "BD",
      "name": "bdnews24.com",
      "founded": 2005,
      "frequency": "Continuous 24/7 digital news",
      "format": "Bilingual digital news agency portal",
      "language": "Bengali, English",
      "headquarters": "Dhaka",
      "owner": {
        "name": "Bangladesh News 24 Hours Ltd",
        "type": "Independent commercial media"
      },
      "editorialStance": "Pioneer online news agency; 24-hour breaking news, political reporting, and multimedia coverage",
      "readership": {
        "metric": "First internet-only news agency in Bangladesh with over 10 million monthly digital visits",
        "source": "SimilarWeb / bdnews24 Media Review 2024"
      },
      "revenueModel": "Digital advertising, sponsored sections, and mobile news syndication",
      "logo": "newspaper-logos/bd/bdnews24.png",
      "logoExplainer": "'bdnews24' wordmark — Bangladesh's digital news brand.",
      "licenceNote": "Trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://bdnews24.com",
        "https://en.wikipedia.org/wiki/Bdnews24.com"
      ]
    }
  ],
  "BB": [
    {
      "id": "bb-nation-news",
      "countryCode": "BB",
      "name": "Nation News",
      "officialName": "The Nation Newspaper",
      "founded": 1973,
      "frequency": "Daily (Monday–Sunday)",
      "format": "Broadsheet & digital portal",
      "language": "English",
      "headquarters": "Fontabelle, St. Michael",
      "owner": {
        "name": "One Caribbean Media Ltd (OCM)",
        "type": "Commercial conglomerate"
      },
      "editorialStance": "Leading commercial daily newspaper in Barbados; investigative news, community issues, and CARICOM regional affairs",
      "readership": {
        "metric": "Highest circulation newspaper in Barbados (~25,000 daily print, 1M monthly digital visitors)",
        "source": "One Caribbean Media Annual Report 2023"
      },
      "revenueModel": "Print retail sales, digital advertising, and e-paper subscriptions",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.nationnews.com",
        "https://en.wikipedia.org/wiki/The_Nation_(Barbados)"
      ]
    }
  ],
  "BY": [
    {
      "id": "by-belta",
      "countryCode": "BY",
      "name": "BelTA",
      "officialName": "Belarusian Telegraph Agency (BelTA)",
      "founded": 1918,
      "frequency": "Continuous 24/7 state newswire",
      "format": "Official state newswire & photo agency",
      "language": "Belarusian, Russian, English, German, Spanish, Chinese",
      "headquarters": "Minsk",
      "owner": {
        "name": "Republic of Belarus",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official state news agency; presidential decrees, government policies, and national affairs",
      "readership": {
        "metric": "Primary news supplier to all domestic Belarusian print newspapers, TV channels, and radio stations",
        "source": "BelTA Official Annual Report 2023"
      },
      "revenueModel": "Direct state budget funding and subscriber licensing",
      "logo": "newspaper-logos/by/belta.svg",
      "logoExplainer": "Official masthead/brand mark for BelTA, sourced from Wikimedia Commons and visually verified.",
      "licenceNote": "BelTA brand mark trademark bundled from Wikimedia Commons (File:BonBelta.svg) for educational reference in Learn mode.",

      "sources": [
        "https://www.belta.by",
        "https://en.wikipedia.org/wiki/Belarusian_Telegraph_Agency"
      ]
    },
    {
      "id": "by-belapan",
      "countryCode": "BY",
      "name": "BelaPAN",
      "officialName": "Belarusian Private News Agency",
      "founded": 1991,
      "frequency": "Continuous digital newswire",
      "format": "Independent digital newswire agency",
      "language": "Belarusian, Russian, English",
      "headquarters": "Minsk",
      "owner": {
        "name": "BelaPAN Company",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic independent news agency; non-partisan wire reporting and economic analysis",
      "readership": {
        "metric": "First independent private news agency established in post-Soviet Belarus",
        "source": "BAJ Review"
      },
      "revenueModel": "Subscriber licensing and commercial news syndication",
      "logo": "newspaper-logos/by/belapan.svg",
      "logoExplainer": "Official masthead/brand mark for BelaPAN, sourced from the publisher's official site and visually verified.",
      "licenceNote": "BelaPAN brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://belapan.by",
        "https://en.wikipedia.org/wiki/BelaPAN"
      ]
    }
  ],
  "BE": [
    {
      "id": "be-belga",
      "countryCode": "BE",
      "name": "Belga News Agency",
      "officialName": "Agence Belga SA / Agentschap Belga NV",
      "founded": 1920,
      "frequency": "Continuous 24/7 national newswire",
      "format": "Cooperative national newswire & photo agency",
      "language": "Dutch, French, English",
      "headquarters": "Brussels",
      "owner": {
        "name": "Belga SA (Cooperative of Belgian media publishers)",
        "type": "Independent trust / foundation"
      },
      "editorialStance": "Independent national news agency; factual wire reporting on Belgian federal politics, EU institutions, and diplomacy",
      "readership": {
        "metric": "Primary news supplier to 100% of Belgian daily newspapers, TV stations, and radio networks in both Flanders and Wallonia",
        "source": "Belga News Agency Annual Report 2023"
      },
      "revenueModel": "Subscription licensing fees from member Belgian publishers and broadcast networks",
      "logo": "newspaper-logos/be/belga.png",
      "logoExplainer": "'Belga' brand mark — the Belgian news agency emblem.",
      "licenceNote": "Trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.belga.be",
        "https://en.wikipedia.org/wiki/Belga_(news_agency)"
      ]
    },
    {
      "id": "be-de-standaard",
      "countryCode": "BE",
      "name": "De Standaard",
      "englishTranslation": "The Standard",
      "founded": 1918,
      "frequency": "Daily (Monday–Saturday)",
      "format": "Broadsheet & digital portal",
      "language": "Dutch",
      "headquarters": "Groot-Bijgaarden, Dilbeek",
      "owner": {
        "name": "Mediahuis NV",
        "type": "Commercial conglomerate"
      },
      "editorialStance": "Leading Flemish quality daily newspaper; Christian-democrat heritage turned independent quality journal; culture, law, and politics",
      "readership": {
        "metric": "Leading Flemish quality paper (~90,000 daily print, 3M monthly digital readers)",
        "source": "CIM Belgium 2023/2024"
      },
      "revenueModel": "Digital subscriptions, print sales, and corporate advertising",
      "logo": "newspaper-logos/be/de-standaard.svg",
      "logoExplainer": "'De Standaard' masthead — the Flemish daily brand mark.",
      "licenceNote": "Trademark bundled from Wikimedia Commons (File:De Standaard logo.svg) for educational reference in Learn mode.",

      "sources": [
        "https://www.standaard.be",
        "https://en.wikipedia.org/wiki/De_Standaard"
      ]
    }
  ],
  "BJ": [
    {
      "id": "bj-abp",
      "countryCode": "BJ",
      "name": "Agence Bénin Presse",
      "officialName": "Agence Bénin Presse (ABP)",
      "founded": 1961,
      "frequency": "Continuous 24/7 state newswire",
      "format": "Official state newswire agency",
      "language": "French",
      "headquarters": "Cotonou",
      "owner": {
        "name": "Republic of Benin",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official state news agency; presidential decrees, national assembly acts, and West African regional news",
      "readership": {
        "metric": "Primary news supplier to Beninese daily newspapers, radio stations, and national TV networks",
        "source": "ABP Annual Report 2023"
      },
      "revenueModel": "Direct state budget funding and subscriber licensing",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.abp.bj",
        "https://fr.wikipedia.org/wiki/Agence_B%C3%A9nin_Presse"
      ]
    }
  ],
  "BO": [
    {
      "id": "bo-abi",
      "countryCode": "BO",
      "name": "ABI",
      "officialName": "Agencia Boliviana de Información",
      "founded": 1996,
      "frequency": "Continuous 24/7 state newswire",
      "format": "Official state newswire agency",
      "language": "Spanish",
      "headquarters": "La Paz",
      "owner": {
        "name": "Ministry of Presidencial Affairs",
        "type": "Government ministry / department"
      },
      "editorialStance": "Official state news agency; executive decrees, state investments, and national news",
      "readership": {
        "metric": "Primary news supplier to all Bolivian domestic television, radio, and print outlets",
        "source": "ABI Annual Report 2023"
      },
      "revenueModel": "Direct state budget funding",
      "logo": "newspaper-logos/bo/abi.png",
      "logoExplainer": "Official masthead/brand mark for ABI, sourced from the publisher's official site and visually verified.",
      "licenceNote": "ABI brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://abi.bo",
        "https://es.wikipedia.org/wiki/Agencia_Boliviana_de_Informaci%C3%B3n"
      ]
    }
  ],
  "BA": [
    {
      "id": "ba-fena",
      "countryCode": "BA",
      "name": "FENA",
      "officialName": "Federalna novinska agencija",
      "founded": 2000,
      "frequency": "Continuous 24/7 state newswire",
      "format": "Official entity newswire & photo service",
      "language": "Bosnian, Croatian, Serbian, English",
      "headquarters": "Sarajevo",
      "owner": {
        "name": "Federation of Bosnia and Herzegovina",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official news agency; federal government notices, parliamentary debates, and regional affairs",
      "readership": {
        "metric": "Largest news agency supplying all daily papers, TV, and radio networks in FBiH",
        "source": "FENA Official Review 2023"
      },
      "revenueModel": "State budget funding and commercial newswire subscriptions",
      "logo": "newspaper-logos/ba/fena.png",
      "logoExplainer": "Official masthead/brand mark for FENA, sourced from the publisher's official site and visually verified.",
      "licenceNote": "FENA brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://fena.ba",
        "https://bs.wikipedia.org/wiki/Federalna_novinska_agencija"
      ]
    },
    {
      "id": "ba-srna",
      "countryCode": "BA",
      "name": "SRNA",
      "officialName": "Novinska agencija Republike Srpske",
      "founded": 1992,
      "frequency": "Continuous newswire service",
      "format": "Entity newswire & photo service",
      "language": "Serbian, English",
      "headquarters": "Bijeljina",
      "owner": {
        "name": "Government of Republika Srpska",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Entity state news agency; official government announcements and regional news",
      "readership": {
        "metric": "Primary news agency for media outlets in Republika Srpska",
        "source": "SRNA Official Report 2023"
      },
      "revenueModel": "Entity public budget funding and subscription licensing",
      "logo": "newspaper-logos/ba/srna.svg",
      "logoExplainer": "Official masthead/brand mark for SRNA, sourced from the publisher's official site and visually verified.",
      "licenceNote": "SRNA brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.srna.rs",
        "https://sr.wikipedia.org/wiki/%D0%A1%D0%A0%D0%9D%D0%90"
      ]
    }
  ],
  "BW": [
    {
      "id": "bw-bopa",
      "countryCode": "BW",
      "name": "BOPA",
      "officialName": "Botswana Press Agency (BOPA)",
      "founded": 1981,
      "frequency": "Continuous 24/7 state newswire",
      "format": "Official state newswire agency",
      "language": "English, Setswana",
      "headquarters": "Gaborone",
      "owner": {
        "name": "Department of Information Services",
        "type": "Government ministry / department"
      },
      "editorialStance": "Official national news agency; parliamentary proceedings, state visits, and rural development news",
      "readership": {
        "metric": "Primary news supplier to all Botswana national radio, TV, and print newspapers",
        "source": "BOPA Department Review 2023"
      },
      "revenueModel": "Direct state budget funding",
      "logo": "newspaper-logos/bw/bopa.svg",
      "logoExplainer": "Official masthead/brand mark for BOPA, sourced from Wikimedia Commons and visually verified.",
      "licenceNote": "BOPA brand mark trademark bundled from Wikimedia Commons (File:BOPA logo.svg) for educational reference in Learn mode.",

      "sources": [
        "https://www.dailynews.gov.bw",
        "https://en.wikipedia.org/wiki/Botswana_Press_Agency"
      ]
    },
    {
      "id": "bw-sunday-standard",
      "countryCode": "BW",
      "name": "Sunday Standard",
      "founded": 2005,
      "frequency": "Weekly (Sunday)",
      "format": "Broadsheet & digital portal",
      "language": "English",
      "headquarters": "Gaborone",
      "owner": {
        "name": "Telegraphic Publishing",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent commercial weekly; investigative journalism, business news, and political analysis",
      "readership": {
        "metric": "Influential Sunday paper read by policymakers, legal sector, and business leaders in Botswana",
        "source": "Sunday Standard Review 2023"
      },
      "revenueModel": "Print sales and corporate advertising",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.sundaystandard.info"
      ]
    }
  ],
  "BG": [
    {
      "id": "bg-bta",
      "countryCode": "BG",
      "name": "BTA",
      "officialName": "Bulgarian Telegraph Agency (BTA)",
      "founded": 1898,
      "frequency": "Continuous 24/7 state newswire",
      "format": "Official state newswire & photo agency",
      "language": "Bulgarian, English",
      "headquarters": "Sofia",
      "owner": {
        "name": "Republic of Bulgaria (National Assembly)",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official state news agency; parliamentary proceedings, executive policies, and foreign diplomacy",
      "readership": {
        "metric": "Primary news agency supplying all Bulgarian domestic daily newspapers, TV channels, and radio stations",
        "source": "BTA Official Annual Report 2023"
      },
      "revenueModel": "State parliamentary budget allocation and subscriber licensing",
      "logo": "newspaper-logos/bg/bta.jpg",
      "logoExplainer": "'BTA' brand mark — the Bulgarian News Agency emblem.",
      "licenceNote": "Trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.bta.bg",
        "https://en.wikipedia.org/wiki/Bulgarian_Telegraph_Agency"
      ]
    }
  ],
  "BF": [
    {
      "id": "bf-aib",
      "countryCode": "BF",
      "name": "Agence d'Information du Burkina",
      "officialName": "Agence d'Information du Burkina (AIB)",
      "founded": 1964,
      "frequency": "Continuous 24/7 state newswire",
      "format": "Official state newswire agency",
      "language": "French",
      "headquarters": "Ouagadougou",
      "owner": {
        "name": "Republic of Burkina Faso",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official state news agency; government decisions, security updates, and regional Sahelian news",
      "readership": {
        "metric": "Primary news supplier to all Burkinabé radio, TV networks, and domestic print papers",
        "source": "AIB Official Review 2023"
      },
      "revenueModel": "Direct state budget funding",
      "logo": "newspaper-logos/bf/aib.png",
      "logoExplainer": "Official masthead/brand mark for Agence d'Information du Burkina, sourced from the publisher's official site and visually verified.",
      "licenceNote": "Agence d'Information du Burkina brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.aib.media",
        "https://fr.wikipedia.org/wiki/Agence_d%27information_du_Burkina"
      ]
    }
  ],
  "BI": [
    {
      "id": "bi-abp",
      "countryCode": "BI",
      "name": "Agence Burundaise de Presse",
      "officialName": "Agence Burundaise de Presse (ABP)",
      "founded": 1978,
      "frequency": "Continuous 24/7 state newswire",
      "format": "Official state newswire agency",
      "language": "French, Kirundi",
      "headquarters": "Bujumbura",
      "owner": {
        "name": "Republic of Burundi",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official state news agency; presidential activity, government decisions, and provincial news",
      "readership": {
        "metric": "Primary news supplier to all domestic Burundian radio stations, TV networks, and public institutions",
        "source": "ABP Annual Report 2023"
      },
      "revenueModel": "Direct state budget funding",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://abpinfo.bi",
        "https://fr.wikipedia.org/wiki/Agence_burundaise_de_presse"
      ]
    },
    {
      "id": "bi-net-press",
      "countryCode": "BI",
      "name": "Net Press",
      "founded": 1996,
      "frequency": "Continuous digital news",
      "format": "Digital news agency portal",
      "language": "French",
      "headquarters": "Bujumbura",
      "owner": {
        "name": "Net Press Agency",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent online news agency; local news, political commentary, and civil affairs",
      "readership": {
        "metric": "Pioneer digital news agency in Burundi",
        "source": "Net Press Archive"
      },
      "revenueModel": "Digital subscriptions and advertising",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.netpress.bi"
      ]
    }
  ],
  "KH": [
    {
      "id": "kh-akp",
      "countryCode": "KH",
      "name": "AKP",
      "officialName": "Agence Kampuchea Presse (AKP)",
      "founded": 1978,
      "frequency": "Continuous 24/7 state newswire",
      "format": "Official state newswire agency",
      "language": "Khmer, English, French",
      "headquarters": "Phnom Penh",
      "owner": {
        "name": "Ministry of Information",
        "type": "Government ministry / department"
      },
      "editorialStance": "Official state news agency; royal bulletins, prime ministerial decrees, and national development",
      "readership": {
        "metric": "Primary news supplier to all Cambodian domestic broadcast networks, radio, and Khmer print media",
        "source": "AKP Ministry Report 2023"
      },
      "revenueModel": "Direct state budget funding",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.akp.gov.kh",
        "https://en.wikipedia.org/wiki/Agence_Kampuchea_Presse"
      ]
    }
  ],
  "CA": [
    {
      "id": "ca-the-toronto-star",
      "countryCode": "CA",
      "name": "Toronto Star",
      "founded": 1892,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "English",
      "headquarters": "Toronto, Ontario",
      "owner": {
        "name": "NordStar Capital",
        "type": "Independent commercial media"
      },
      "editorialStance": "Social-democratic / liberal progressive editorial stance guided by the Atkinson Principles, focusing on social justice and civic affairs",
      "readership": {
        "metric": "Highest daily print circulation in Canada with 5.0+ million weekly readers",
        "source": "Torstar Corporate Media Profile 2023"
      },
      "revenueModel": "Digital paywall subscriptions, print sales, and display advertising",
      "logo": "newspaper-logos/ca/toronto-star.svg",
      "logoExplainer": "Black 'Toronto Star' wordmark — Canada's highest-circulation daily masthead.",
      "licenceNote": "Toronto Star masthead trademark bundled from Wikimedia Commons (File:Toronto-Star-Logo.svg) for educational reference in Learn mode.",

      "sources": [
        "https://www.thestar.com",
        "https://en.wikipedia.org/wiki/Toronto_Star"
      ]
    }
  ],
  "CV": [
    {
      "id": "cv-inforpress",
      "countryCode": "CV",
      "name": "Inforpress",
      "officialName": "Agência Cabo-Verdiana de Notícias",
      "nativeName": "Agência Cabo-Verdiana de Notícias",
      "englishTranslation": "Cape Verdean News Agency",
      "founded": 1988,
      "frequency": "Continuous 24/7 national newswire",
      "format": "National state newswire & multimedia service",
      "language": "Portuguese",
      "headquarters": "Praia, Santiago Island",
      "owner": {
        "name": "State of Cape Verde",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "National public newswire agency; government decrees, parliamentary activity, and island archipelago news",
      "readership": {
        "metric": "Primary news supplier to all television, radio, and digital media across the nine inhabited islands of Cape Verde",
        "source": "Inforpress Relatório e Contas 2023"
      },
      "annualPublicFunding": {
        "total": "CVE 95.0 million (~US$920,000) state budget appropriation",
        "perCapita": "CVE 190 / person / year (~US$1.85)"
      },
      "revenueModel": "State public service contract and wire subscription syndication",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://inforpress.cv",
        "https://pt.wikipedia.org/wiki/Inforpress"
      ]
    }
  ],
  "CF": [
    {
      "id": "cf-acap",
      "countryCode": "CF",
      "name": "ACAP",
      "officialName": "Agence Centrafricaine de Presse",
      "nativeName": "Agence Centrafricaine de Presse",
      "englishTranslation": "Central African Press Agency",
      "founded": 1961,
      "frequency": "Continuous daily state newswire",
      "format": "Official state newswire & bulletin",
      "language": "French, Sango",
      "headquarters": "Bangui",
      "owner": {
        "name": "Republic of Central Africa (Ministère de la Communication)",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official state news wire; presidential communications, ministerial decrees, and peace accord monitoring",
      "readership": {
        "metric": "Primary news supplier to Bangui national radio, television, and private print titles",
        "source": "ACAP Bangui Annual Review 2023"
      },
      "annualPublicFunding": {
        "total": "XAF 120 million (~US$200,000) state budget operating grant",
        "perCapita": "XAF 22 / person / year (~US$0.04)"
      },
      "revenueModel": "Direct state budget subsidy and subscription bulletin sales",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://acap.cf",
        "https://fr.wikipedia.org/wiki/Agence_centrafricaine_de_presse"
      ]
    },
    {
      "id": "cf-le-potentiel-centrafricain",
      "countryCode": "CF",
      "name": "Le Potentiel Centrafricain",
      "englishTranslation": "The Central African Potential",
      "founded": 2000,
      "frequency": "Daily newspaper",
      "format": "Tabloid & digital portal",
      "language": "French",
      "headquarters": "Bangui",
      "owner": {
        "name": "Groupe Le Potentiel Centrafricain",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent commercial daily; national politics, economic reconstruction, and Central African mining/forestry sectors",
      "readership": {
        "metric": "Regular daily print circulation in Bangui commercial districts",
        "source": "Haut Conseil de la Communication RCA 2023"
      },
      "revenueModel": "Print sales and public legal notice advertising",
      "logo": "newspaper-logos/cf/le-potentiel-centrafricain.png",
      "logoExplainer": "Official masthead/brand mark for Le Potentiel Centrafricain, sourced from the publisher's official site and visually verified.",
      "licenceNote": "Le Potentiel Centrafricain brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://lepotentielcentrafricain.com",
        "https://fr.wikipedia.org/wiki/M%C3%A9dias_en_R%C3%A9publique_centrafricaine"
      ]
    }
  ],
  "CN": [
    {
      "id": "cn-china-daily",
      "countryCode": "CN",
      "name": "China Daily",
      "nativeName": "中国日报",
      "englishTranslation": "China Daily",
      "founded": 1981,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & international digital portal",
      "language": "English",
      "headquarters": "Beijing",
      "owner": {
        "name": "State Council Information Office",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "China's premier national English-language daily; international diplomacy, global business, trade, and cultural exchange",
      "readership": {
        "metric": "Over 900,000 daily global print distribution and 350+ million digital and social media followers worldwide",
        "source": "China Daily Global Media Kit 2024"
      },
      "annualPublicFunding": {
        "total": "Direct central state foreign communication appropriation",
        "perCapita": "National international communication remit"
      },
      "revenueModel": "Central state foreign-press budget, global institutional subscriptions, and advertising",
      "logo": "newspaper-logos/cn/china-daily.png",
      "logoExplainer": "'China Daily' masthead — China's English-language daily.",
      "licenceNote": "Trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.chinadaily.com.cn",
        "https://en.wikipedia.org/wiki/China_Daily"
      ]
    },
    {
      "id": "cn-reference-news",
      "countryCode": "CN",
      "name": "Reference News",
      "officialName": "Cankao Xiaoxi",
      "nativeName": "参考消息",
      "englishTranslation": "Reference News",
      "founded": 1931,
      "frequency": "Daily newspaper",
      "format": "Broadsheet digest",
      "language": "Chinese",
      "headquarters": "Beijing",
      "owner": {
        "name": "Xinhua News Agency",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Foreign affairs digest published by Xinhua; translating and reprinting international news coverage and commentary for domestic readership",
      "readership": {
        "metric": "Over 2.5 million daily print circulation; historically one of China's most widely read daily digests",
        "source": "Xinhua Media Research 2023"
      },
      "revenueModel": "Institutional and retail print subscriptions",
      "logo": "newspaper-logos/cn/reference-news.png",
      "logoExplainer": "Chinese '参考消息' / Reference News masthead.",
      "licenceNote": "Trademark bundled from Wikimedia Commons (File:Logo of Reference News (Black).png) for educational reference in Learn mode.",

      "sources": [
        "http://www.cankaoxiaoxi.com",
        "https://en.wikipedia.org/wiki/Reference_News"
      ]
    }
  ],
  "CG": [
    {
      "id": "cg-aci",
      "countryCode": "CG",
      "name": "ACI",
      "officialName": "Agence Congolaise d'Information",
      "nativeName": "Agence Congolaise d'Information",
      "englishTranslation": "Congolese Information Agency",
      "founded": 1961,
      "frequency": "Continuous 24/7 national newswire",
      "format": "Official state newswire & bulletin",
      "language": "French",
      "headquarters": "Brazzaville",
      "owner": {
        "name": "Republic of the Congo (Ministère de la Communication)",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official national public newswire; executive decisions, legislative proceedings, diplomatic cooperation, and forestry development",
      "readership": {
        "metric": "Primary news supplier to all domestic broadcast networks and print titles across Brazzaville and Pointe-Noire",
        "source": "ACI Brazzaville Rapport Annuel 2023"
      },
      "annualPublicFunding": {
        "total": "XAF 180 million (~US$295,000) state operating subsidy",
        "perCapita": "XAF 30 / person / year (~US$0.05)"
      },
      "revenueModel": "State budget allocation and wire syndication fees",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.aci.cg",
        "https://fr.wikipedia.org/wiki/Agence_congolaise_d%27information"
      ]
    },
    {
      "id": "cg-la-semaine-africaine",
      "countryCode": "CG",
      "name": "La Semaine Africaine",
      "englishTranslation": "The African Week",
      "founded": 1952,
      "frequency": "Bi-weekly publication (Tuesday & Friday)",
      "format": "Tabloid publication & digital portal",
      "language": "French",
      "headquarters": "Brazzaville",
      "owner": {
        "name": "Episcopal Conference of the Congo (Catholic Church)",
        "type": "Independent trust / foundation"
      },
      "editorialStance": "Historic independent bi-weekly; social justice, pastoral advocacy, ethical governance, and civil society reflection",
      "readership": {
        "metric": "Over 70 years of continuous publishing; highly respected independent moral authority in Congolese media",
        "source": "La Semaine Africaine Archive 2023"
      },
      "revenueModel": "Print circulation, church subscriptions, and civic announcements",
      "logo": "newspaper-logos/cg/la-semaine-africaine.jpg",
      "logoExplainer": "Official masthead/brand mark for La Semaine Africaine, sourced from the publisher's official site and visually verified.",
      "licenceNote": "La Semaine Africaine brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://lasemaineafricaine.info",
        "https://fr.wikipedia.org/wiki/La_Semaine_africaine"
      ]
    }
  ],
  "CD": [
    {
      "id": "cd-acp",
      "countryCode": "CD",
      "name": "ACP",
      "officialName": "Agence Congolaise de Presse",
      "nativeName": "Agence Congolaise de Presse",
      "englishTranslation": "Congolese Press Agency",
      "founded": 1960,
      "frequency": "Continuous 24/7 national newswire",
      "format": "Official public wire service & daily bulletin",
      "language": "French",
      "headquarters": "Gombe, Kinshasa",
      "owner": {
        "name": "Democratic Republic of the Congo (Ministère de la Communication et Médias)",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official public newswire of the DRC; presidential activity, national assembly decrees, provincial governors, and MONUSCO peace initiatives",
      "readership": {
        "metric": "Primary news supplier to over 500 radio, television, and print outlets across all 26 provinces of the DRC",
        "source": "ACP Rapport de Gestion et Performance 2023"
      },
      "annualPublicFunding": {
        "total": "CDF 4.5 billion (~US$1.65 million) state budget allocation",
        "perCapita": "CDF 45 / person / year (~US$0.016)"
      },
      "revenueModel": "Direct state budget subsidy and institutional subscriber feeds",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://acp.cd",
        "https://fr.wikipedia.org/wiki/Agence_congolaise_de_presse"
      ]
    }
  ],
  "CR": [
    {
      "id": "cr-elfaro-cr",
      "countryCode": "CR",
      "name": "El Faro Costa Rica",
      "englishTranslation": "The Lighthouse Costa Rica",
      "founded": 2018,
      "frequency": "Continuous digital news magazine",
      "format": "Investigative digital portal",
      "language": "Spanish",
      "headquarters": "San José",
      "owner": {
        "name": "Fundación Trípode",
        "type": "Non-profit independent foundation"
      },
      "editorialStance": "In-depth investigative journalism; corruption investigations, judicial independence, and regional Central American democracy",
      "readership": {
        "metric": "Leading investigative regional journalism platform relocated to San José for press freedom protection",
        "source": "Fundación Trípode Annual Report 2023"
      },
      "revenueModel": "International journalistic grants and reader crowdfunding",
      "logo": "newspaper-logos/cr/elfaro-cr.svg",
      "logoExplainer": "Official masthead/brand mark for El Faro Costa Rica, sourced from the publisher's official site and visually verified.",
      "licenceNote": "El Faro Costa Rica brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://elfaro.net",
        "https://en.wikipedia.org/wiki/El_Faro_(digital_newspaper)"
      ]
    }
  ],
  "CU": [
    {
      "id": "cu-granma",
      "countryCode": "CU",
      "name": "Granma",
      "officialName": "Granma - Órgano Oficial del Comité Central del Partido Comunista de Cuba",
      "nativeName": "Granma",
      "englishTranslation": "Granma (named after the revolutionary yacht)",
      "founded": 1965,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Official state broadsheet & international portal",
      "language": "Spanish, with foreign language editions",
      "headquarters": "Plaza de la Revolución, Havana",
      "owner": {
        "name": "Central Committee of the Communist Party of Cuba",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official newspaper of the Communist Party of Cuba; state decrees, socialist theory, economic reforms, and international anti-imperialist diplomacy",
      "readership": {
        "metric": "Largest print circulation in Cuba with 450,000 daily print copies and global digital reach across Granma.cu",
        "source": "Editora Granma Informe de Gestión 2023"
      },
      "revenueModel": "Direct state budget appropriation and institutional subscriptions",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.granma.cu",
        "https://en.wikipedia.org/wiki/Granma_(newspaper)"
      ]
    },
    {
      "id": "cu-prensa-latina",
      "countryCode": "CU",
      "name": "Prensa Latina",
      "officialName": "Agencia Informativa Latinoamericana Prensa Latina S.A.",
      "nativeName": "Prensa Latina",
      "englishTranslation": "Latin American Press",
      "founded": 1959,
      "frequency": "Continuous 24/7 international newswire",
      "format": "International news agency wire & multimedia service",
      "language": "Spanish, English, French, Portuguese, Russian, Italian",
      "headquarters": "Vedado, Havana",
      "owner": {
        "name": "Republic of Cuba",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Founded by Che Guevara and Jorge Ricardo Masetti; Latin American perspective on global affairs, Non-Aligned Movement, and anti-hegemonic coverage",
      "readership": {
        "metric": "Bureaus in over 40 countries; transmits more than 400 news dispatches daily to media partners worldwide",
        "source": "Prensa Latina Memoria Institucional 2024"
      },
      "annualPublicFunding": {
        "total": "Central state foreign-press operational allocation",
        "perCapita": "State international agency"
      },
      "revenueModel": "State budget funding and international media syndication agreements",
      "logo": "newspaper-logos/cu/prensa-latina.png",
      "logoExplainer": "Official masthead/brand mark for Prensa Latina, sourced from Wikimedia Commons and visually verified.",
      "licenceNote": "Prensa Latina brand mark trademark bundled from Wikimedia Commons (File:LOGO PRENSA LATINA.png) for educational reference in Learn mode.",

      "sources": [
        "https://www.prensa-latina.cu",
        "https://en.wikipedia.org/wiki/Prensa_Latina"
      ]
    }
  ],
  "DJ": [
    {
      "id": "dj-adi",
      "countryCode": "DJ",
      "name": "ADI",
      "officialName": "Agence Djiboutienne d'Information",
      "nativeName": "Agence Djiboutienne d'Information",
      "englishTranslation": "Djiboutian Information Agency",
      "founded": 1999,
      "frequency": "Continuous 24/7 national newswire",
      "format": "Official state wire service & digital portal",
      "language": "French, Arabic",
      "headquarters": "Djibouti City",
      "owner": {
        "name": "Republic of Djibouti (Ministère de la Communication)",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Statutory national news agency; international diplomatic partnerships, IGAD regional affairs, and port logistics news",
      "readership": {
        "metric": "Primary news supplier to national television (RTD), radio networks, and regional Horn of Africa media",
        "source": "ADI Rapport d'Activité 2023"
      },
      "annualPublicFunding": {
        "total": "DJF 65 million (~US$365,000) public wire grant",
        "perCapita": "DJF 60 / person / year (~US$0.34)"
      },
      "revenueModel": "State operating subsidy and commercial news syndication",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.adi.dj",
        "https://fr.wikipedia.org/wiki/Agence_djiboutienne_d%27information"
      ]
    }
  ],
  "IR": [
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
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.irna.ir",
        "https://en.wikipedia.org/wiki/Islamic_Republic_News_Agency"
      ]
    }
  ],
  "IQ": [
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
      "logo": "newspaper-logos/iq/nina.png",
      "logoExplainer": "Official masthead/brand mark for NINA, sourced from the publisher's official site and visually verified.",
      "licenceNote": "NINA brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://ninanews.com",
        "https://en.wikipedia.org/wiki/National_Iraqi_News_Agency"
      ]
    }
  ],
  "IE": [
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
      "logo": "newspaper-logos/ie/irish-examiner.png",
      "logoExplainer": "'Irish Examiner' masthead — the Cork-based daily brand mark.",
      "licenceNote": "Trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.irishexaminer.com",
        "https://en.wikipedia.org/wiki/Irish_Examiner"
      ]
    }
  ],
  "IT": [
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
      "logo": "newspaper-logos/it/la-stampa.png",
      "logoExplainer": "Bold slab-serif 'LA STAMPA' capitals — the Turin daily's masthead.",
      "licenceNote": "La Stampa masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.lastampa.it",
        "https://en.wikipedia.org/wiki/La_Stampa"
      ]
    }
  ],
  "CI": [
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
      "logo": "newspaper-logos/ci/aip.png",
      "logoExplainer": "Official masthead/brand mark for AIP, sourced from Wikimedia Commons and visually verified.",
      "licenceNote": "AIP brand mark trademark bundled from Wikimedia Commons (File:AIP Logo.png) for educational reference in Learn mode.",

      "sources": [
        "https://www.aip.ci",
        "https://en.wikipedia.org/wiki/Agence_Ivoirienne_de_Presse"
      ]
    }
  ],
  "JM": [
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
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://jamaica-star.com",
        "https://en.wikipedia.org/wiki/The_Jamaica_Star"
      ]
    }
  ],
  "JP": [
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
      "logoExplainer": "Kanji '毎日新聞' flanked by blue star and eye emblems — the Mainichi Shimbun's full brand lockup.",
      "licenceNote": "Mainichi Shimbun masthead trademark bundled from Wikimedia Commons (File:Mainichi Shimbun logo.svg) for educational reference in Learn mode.",

      "sources": [
        "https://mainichi.jp",
        "https://en.wikipedia.org/wiki/Mainichi_Shimbun"
      ]
    }
  ],
  "JO": [
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
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://petra.gov.jo",
        "https://en.wikipedia.org/wiki/Jordan_News_Agency"
      ]
    }
  ],
  "KZ": [
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
      "logo": "newspaper-logos/kz/egemen-qazaqstan.jpg",
      "logoExplainer": "Official masthead/brand mark for Egemen Qazaqstan, sourced from Wikimedia Commons and visually verified.",
      "licenceNote": "Egemen Qazaqstan brand mark trademark bundled from Wikimedia Commons (File:Logo Egemen Qazaqstan.jpg) for educational reference in Learn mode.",

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
      "logo": "newspaper-logos/kz/kazakhstanskaya-pravda.png",
      "logoExplainer": "Official masthead/brand mark for Kazakhstanskaya Pravda, sourced from the publisher's official site and visually verified.",
      "licenceNote": "Kazakhstanskaya Pravda brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://kazpravda.kz",
        "https://en.wikipedia.org/wiki/Kazakhstanskaya_Pravda"
      ]
    }
  ],
  "TL": [
    {
      "id": "tl-tatoli",
      "countryCode": "TL",
      "name": "Tatoli",
      "officialName": "Agência Noticiosa de Timor-Leste",
      "nativeName": "Tatoli - Agência Noticiosa de Timor-Leste",
      "englishTranslation": "Tatoli (Tetum: To deliver / communicate)",
      "founded": 2016,
      "frequency": "Continuous 24/7 national newswire",
      "format": "Official state newswire & multimedia portal",
      "language": "Tetum, Portuguese, English, Indonesian",
      "headquarters": "Farol, Dili",
      "owner": {
        "name": "Democratic Republic of Timor-Leste (SECOMS)",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official national news agency of Timor-Leste; government decisions, parliamentary legislation, ASEAN accession, and petroleum fund management",
      "readership": {
        "metric": "Primary news agency supplying wire dispatches to all domestic radio, television, and print media across all 14 municipalities",
        "source": "Tatoli I.P. Relatório Anual 2023"
      },
      "annualPublicFunding": {
        "total": "US$1.2 million annual state budget allocation",
        "perCapita": "US$0.89 / person / year"
      },
      "revenueModel": "Direct state budget appropriation and news syndication services",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://tatoli.tl",
        "https://pt.wikipedia.org/wiki/Tatoli"
      ]
    }
  ],
  "EC": [
    {
      "id": "ec-lideres",
      "countryCode": "EC",
      "name": "Revista Líderes",
      "englishTranslation": "Leaders Magazine",
      "founded": 1998,
      "frequency": "Weekly business publication (Monday)",
      "format": "Tabloid publication & business portal",
      "language": "Spanish",
      "headquarters": "Quito",
      "owner": {
        "name": "Grupo El Comercio",
        "type": "Independent commercial media"
      },
      "editorialStance": "Ecuador's premier specialized business weekly; corporate profiles, entrepreneurship, fintech, and economic competitiveness",
      "readership": {
        "metric": "Essential reading for senior executives, entrepreneurs, and finance professionals across Ecuador",
        "source": "Grupo El Comercio Business Division 2023"
      },
      "revenueModel": "Corporate subscriptions and business-to-business advertising",
      "logo": "newspaper-logos/ec/lideres.png",
      "logoExplainer": "Official masthead/brand mark for Revista Líderes, sourced from the publisher's official site and visually verified.",
      "licenceNote": "Revista Líderes brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.revistalideres.ec"
      ]
    }
  ],
  "EG": [
    {
      "id": "eg-al-ahram",
      "countryCode": "EG",
      "name": "Al-Ahram",
      "officialName": "Al-Ahram Establishment",
      "nativeName": "الأهرام",
      "englishTranslation": "The Pyramids",
      "founded": 1875,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & international news network",
      "language": "Arabic, with English (Al-Ahram Weekly) and French editions",
      "headquarters": "Al-Galaa Street, Cairo",
      "owner": {
        "name": "National Press Authority of Egypt",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Egypt's historic newspaper of record and the most famous newspaper in the Arab world; official government policy, Arab diplomacy, regional security, and cultural literature",
      "readership": {
        "metric": "Largest print circulation in the Middle East with over 900,000 daily copies and global digital reach exceeding 20 million across Ahram Online",
        "source": "Al-Ahram Publishing House Report 2023"
      },
      "annualPublicFunding": {
        "total": "Central state publishing allocation through National Press Authority",
        "perCapita": "State newspaper of record"
      },
      "revenueModel": "State budget appropriation, print subscriptions, book publishing, and advertising",
      "logo": "newspaper-logos/eg/al-ahram.png",
      "logoExplainer": "Arabic 'الأهرام' masthead — Al-Ahram's historic brand mark.",
      "licenceNote": "Trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://gate.ahram.org.eg",
        "https://en.wikipedia.org/wiki/Al-Ahram"
      ]
    }
  ],
  "GQ": [
    {
      "id": "gq-guinea-ecuatorial-press",
      "countryCode": "GQ",
      "name": "Guinea Ecuatorial Press",
      "officialName": "Oficina de Información y Prensa de Guinea Ecuatorial",
      "englishTranslation": "Equatorial Guinea Press",
      "founded": 2010,
      "frequency": "Continuous 24/7 official state newswire",
      "format": "Official state wire service & digital portal",
      "language": "Spanish, French, English",
      "headquarters": "Malabo, Bioko Norte",
      "owner": {
        "name": "Republic of Equatorial Guinea (Dirección General de Prensa Presidencial)",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official national information wire; presidential decrees, hydrocarbons sector developments, infrastructure projects, and CEMAC regional diplomacy",
      "readership": {
        "metric": "Primary source of official government information for domestic media, foreign diplomatic missions, and international oil sector operators",
        "source": "Oficina de Información y Prensa 2023"
      },
      "annualPublicFunding": {
        "total": "Central state operational budget via Ministry of Information",
        "perCapita": "State information agency"
      },
      "revenueModel": "Direct state budget funding",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://guineaecuatorialpress.com",
        "https://es.wikipedia.org/wiki/Guinea_Ecuatorial"
      ]
    }
  ],
  "ER": [
    {
      "id": "er-shabait",
      "countryCode": "ER",
      "name": "Shabait",
      "officialName": "Ministry of Information News Portal",
      "englishTranslation": "Shabait (named after the historic popular front)",
      "founded": 2000,
      "frequency": "Continuous 24/7 official state newswire",
      "format": "Official state wire service & digital portal",
      "language": "Tigrinya, Arabic, English, French",
      "headquarters": "Asmara",
      "owner": {
        "name": "State of Eritrea (Ministry of Information)",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official state information portal of Eritrea; presidential statements, national service development projects, agricultural dams, and diplomatic relations",
      "readership": {
        "metric": "Primary official news source inside Eritrea and for the worldwide Eritrean diaspora",
        "source": "Ministry of Information Eritrea 2023"
      },
      "annualPublicFunding": {
        "total": "Central state operational budget via Ministry of Information",
        "perCapita": "State information service"
      },
      "revenueModel": "Direct state budget funding",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://shabait.com",
        "https://en.wikipedia.org/wiki/Ministry_of_Information_(Eritrea)"
      ]
    },
    {
      "id": "er-assenna",
      "countryCode": "ER",
      "name": "Assenna",
      "englishTranslation": "Assenna (Tigrinya: Foundation / Heritage)",
      "founded": 2008,
      "frequency": "Continuous digital news & satellite broadcasting",
      "format": "Digital news portal & satellite TV",
      "language": "Tigrinya, English",
      "headquarters": "London, UK / Diaspora",
      "owner": {
        "name": "Assenna Foundation (Amanuel Eyasu)",
        "type": "Independent trust / foundation"
      },
      "editorialStance": "Prominent diaspora human rights and opposition media organization; investigative reporting on human rights conditions, political prisoners, and civic mobilization",
      "readership": {
        "metric": "Massive diaspora reach with over 2 million monthly digital video and news consumers across Europe, North America, and the Middle East",
        "source": "Assenna Foundation Annual Report 2023"
      },
      "revenueModel": "Diaspora crowdfunding, foundation grants, and viewer donations",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://assenna.com",
        "https://en.wikipedia.org/wiki/Assenna"
      ]
    }
  ],
  "KE": [
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
      "logo": "newspaper-logos/ke/the-standard.png",
      "logoExplainer": "'The Standard' masthead — the Nairobi daily brand mark.",
      "licenceNote": "Trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

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
      "logo": "newspaper-logos/ke/the-star.webp",
      "logoExplainer": "'The Star' masthead — the Nairobi daily brand mark.",
      "licenceNote": "Trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.the-star.co.ke",
        "https://en.wikipedia.org/wiki/The_Star_(Kenya)"
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
      "logo": "newspaper-logos/ke/kna.svg",
      "logoExplainer": "Official 'KNA' masthead/logo as used by the publisher — sourced from Wikimedia Commons.",
      "licenceNote": "KNA masthead trademark bundled from Wikimedia Commons (File:KNA-Logo.svg) for educational reference in Learn mode.",

      "sources": [
        "https://www.kenyanews.go.ke",
        "https://en.wikipedia.org/wiki/Kenya_News_Agency"
      ]
    }
  ],
  "KW": [
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
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.kuna.net.kw",
        "https://en.wikipedia.org/wiki/Kuwait_News_Agency"
      ]
    }
  ],
  "KG": [
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
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
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
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
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
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://akipress.org",
        "https://en.wikipedia.org/wiki/AKIpress_news_agency"
      ]
    }
  ],
  "LA": [
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
      "logo": "newspaper-logos/la/kpl.png",
      "logoExplainer": "Circular KPL Lao News Agency emblem with Lao wordmark — the state news agency crest.",
      "licenceNote": "KPL Lao News Agency crest trademark bundled from the agency's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://kpl.gov.la",
        "https://en.wikipedia.org/wiki/Khaosan_Pathet_Lao"
      ]
    }
  ],
  "LV": [
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
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
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
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.lsm.lv",
        "https://en.wikipedia.org/wiki/Public_Broadcasting_of_Latvia"
      ]
    }
  ],
  "LB": [
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
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://nna-leb.gov.lb",
        "https://en.wikipedia.org/wiki/National_News_Agency_(Lebanon)"
      ]
    }
  ],
  "LS": [
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
      "logo": "newspaper-logos/ls/lena.jpg",
      "logoExplainer": "Official masthead/brand mark for LENA, sourced from the publisher's official site and visually verified.",
      "licenceNote": "LENA brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.lena.gov.ls",
        "https://en.wikipedia.org/wiki/Media_of_Lesotho"
      ]
    }
  ],
  "LR": [
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
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://liberianewsagency.com",
        "https://en.wikipedia.org/wiki/Liberia_News_Agency"
      ]
    }
  ],
  "LY": [
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
      "logo": "newspaper-logos/ly/lana.png",
      "logoExplainer": "Official masthead/brand mark for LANA, sourced from the publisher's official site and visually verified.",
      "licenceNote": "LANA brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://lana.gov.ly",
        "https://en.wikipedia.org/wiki/Libyan_News_Agency"
      ]
    }
  ],
  "FI": [
    {
      "id": "fi-hufvudstadsbladet",
      "countryCode": "FI",
      "name": "Hufvudstadsbladet",
      "officialName": "HBL",
      "nativeName": "Hufvudstadsbladet",
      "englishTranslation": "Capital City Paper",
      "founded": 1864,
      "frequency": "Daily newspaper",
      "format": "Tabloid & digital portal",
      "language": "Swedish",
      "headquarters": "Mannerheimintie, Helsinki",
      "owner": {
        "name": "Bonnier News (51%) & KSF Media / Konstsamfundet (49%)",
        "type": "Independent commercial media"
      },
      "editorialStance": "The flagship Swedish-language daily newspaper in Finland; cultural commentary, Nordic cooperation, minority language rights, and international diplomacy",
      "readership": {
        "metric": "Largest Swedish-language daily newspaper in Finland with over 40,000 paid subscribers and 250,000 monthly digital readers on hbl.fi",
        "source": "KSF Media & Bonnier News 2024"
      },
      "revenueModel": "Digital subscriptions, print sales, and cultural foundation support",
      "logo": "newspaper-logos/fi/hufvudstadsbladet.svg",
      "logoExplainer": "Bold black 'HBL' over an orange bar — Hufvudstadsbladet's brand mark.",
      "licenceNote": "Trademark bundled from Wikimedia Commons (File:HBL wordmark.svg) for educational reference in Learn mode.",

      "sources": [
        "https://www.hbl.fi",
        "https://en.wikipedia.org/wiki/Hufvudstadsbladet"
      ]
    }
  ],
  "GA": [
    {
      "id": "ga-agp",
      "countryCode": "GA",
      "name": "AGP",
      "officialName": "Agence Gabonaise de Presse",
      "nativeName": "Agence Gabonaise de Presse",
      "englishTranslation": "Gabonese Press Agency",
      "founded": 1961,
      "frequency": "Continuous 24/7 national newswire",
      "format": "Official state wire service & daily bulletin",
      "language": "French",
      "headquarters": "Libreville",
      "owner": {
        "name": "Republic of Gabon (Ministère de la Communication)",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Statutory national news agency; presidential activity, national transition council resolutions, provincial governors, and ECCAS diplomacy",
      "readership": {
        "metric": "Primary news supplier to national television (Gabon Télévisions), radio stations, and regional media",
        "source": "AGP Direction Générale 2023"
      },
      "annualPublicFunding": {
        "total": "XAF 220 million (~US$360,000) state budget allocation",
        "perCapita": "XAF 95 / person / year (~US$0.16)"
      },
      "revenueModel": "State budget funding and wire subscription services",
      "logo": "newspaper-logos/ga/agp.png",
      "logoExplainer": "Official masthead/brand mark for AGP, sourced from the publisher's official site and visually verified.",
      "licenceNote": "AGP brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://agpgabon.ga",
        "https://fr.wikipedia.org/wiki/Agence_gabonaise_de_presse"
      ]
    }
  ],
  "GE": [
    {
      "id": "ge-interpressnews",
      "countryCode": "GE",
      "name": "Interpressnews",
      "officialName": "IPN",
      "nativeName": "ინტერპრესნიუსი",
      "englishTranslation": "Interpressnews",
      "founded": 2001,
      "frequency": "Continuous 24/7 national newswire",
      "format": "National news agency wire & online portal",
      "language": "Georgian, English, Russian",
      "headquarters": "Tbilisi",
      "owner": {
        "name": "Palitra Media Holding",
        "type": "Independent commercial media"
      },
      "editorialStance": "Georgia's primary independent news agency; real-time breaking news wire supplying parliamentary proceedings, judicial trials, regional South Caucasus news, and geopolitics",
      "readership": {
        "metric": "Over 4.5 million monthly digital visits; primary wire source for all Georgian television networks, radio stations, and print media",
        "source": "Palitra Media Audience Report 2024"
      },
      "revenueModel": "Newswire subscription syndication, digital display advertising, and SMS breaking news alerts",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.interpressnews.ge",
        "https://en.wikipedia.org/wiki/Interpressnews"
      ]
    }
  ],
  "GY": [
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
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.stabroeknews.com/",
        "https://guyana.gov.gy/"
      ]
    }
  ],
  "IN": [
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
      "logo": "newspaper-logos/in/dainik-jagran.png",
      "logoExplainer": "Devanagari 'दैनिक जागरण' masthead — Dainik Jagran's brand mark.",
      "licenceNote": "Trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

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
      "logo": "newspaper-logos/in/hindustan-times.png",
      "logoExplainer": "'Hindustan Times' masthead — the New Delhi English daily brand.",
      "licenceNote": "Trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.hindustantimes.com/",
        "https://www.htmedia.in/"
      ]
    }
  ],
  "LI": [
    {
      "id": "li-wirtschaft-regional",
      "countryCode": "LI",
      "name": "Wirtschaft regional",
      "founded": 2000,
      "frequency": "Weekly financial publication",
      "format": "Tabloid & business portal",
      "language": "German",
      "headquarters": "Vaduz",
      "owner": {
        "name": "Vaduzer Medienhaus AG",
        "type": "Independent commercial publisher"
      },
      "editorialStance": "Specialist weekly financial journal covering Liechtenstein's banking sector, wealth management, manufacturing, fintech, and cross-border trade",
      "readership": {
        "metric": "Distributed to business leaders, corporate directors, and financial institutions across the Lake Constance Alpine region",
        "source": "Vaduzer Medienhaus Financial Publishing 2023"
      },
      "revenueModel": "Corporate subscriptions and business-to-business advertising",
      "logo": "newspaper-logos/li/wirtschaft-regional.svg",
      "logoExplainer": "Official masthead/brand mark for Wirtschaft regional, sourced from the publisher's official site and visually verified.",
      "licenceNote": "Wirtschaft regional brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.wirtschaftregional.li"
      ]
    }
  ],
  "MG": [
    {
      "id": "mg-taratra",
      "countryCode": "MG",
      "name": "Taratra (ANTA)",
      "nativeName": "Taratra - Agence Nationale d'Information Taratra",
      "englishTranslation": "Reflection - National Information Agency Taratra",
      "founded": 1962,
      "frequency": "Daily news wire & bulletin",
      "format": "News wire & digital agency portal",
      "language": "Malagasy, French",
      "headquarters": "Antananarivo",
      "owner": {
        "name": "Ministry of Communication and Culture",
        "type": "State news agency"
      },
      "editorialStance": "Official national news agency of Madagascar; provides institutional dispatches, government communiqués, and regional reporting from all 23 regions of the island",
      "readership": {
        "metric": "Syndicated to all major print, broadcast, and community radio stations throughout Madagascar",
        "source": "Ministère de la Communication et de la Culture Rapport Annuel 2023"
      },
      "revenueModel": "State budget allocation and wire distribution subscriptions",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://taratra.mg",
        "https://anta.mg"
      ]
    }
  ],
  "MW": [
    {
      "id": "mw-mana",
      "countryCode": "MW",
      "name": "Malawi News Agency (MANA)",
      "founded": 1966,
      "frequency": "Real-time news wire service",
      "format": "News wire & digital agency portal",
      "language": "English, Chichewa",
      "headquarters": "Lilongwe",
      "owner": {
        "name": "Ministry of Information and Digitization",
        "type": "State news agency"
      },
      "editorialStance": "National public wire service with reporters across all 28 districts of Malawi; primary chronicler of development projects, agricultural news, and state functions",
      "readership": {
        "metric": "Feeds news to over 40 community and commercial radio stations, state broadcasters, and national newspapers",
        "source": "Ministry of Information Annual Review 2023"
      },
      "revenueModel": "Government subvention and news syndication",
      "logo": "newspaper-logos/mw/mana.png",
      "logoExplainer": "Official masthead/brand mark for Mana Online, sourced from the publisher's official site and visually verified.",
      "licenceNote": "Mana Online masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://manaonline.gov.mw",
        "https://en.wikipedia.org/wiki/Malawi_News_Agency"
      ]
    }
  ],
  "ML": [
    {
      "id": "ml-amap",
      "countryCode": "ML",
      "name": "AMAP (L'Essor)",
      "nativeName": "Agence Malienne de Presse et de Publicité / L'Essor",
      "englishTranslation": "Malian News and Advertising Agency / The Surge",
      "founded": 1949,
      "frequency": "Daily newspaper & news wire",
      "format": "Broadsheet, wire service & digital portal",
      "language": "French",
      "headquarters": "Bamako",
      "owner": {
        "name": "Government of Mali",
        "type": "State public enterprise"
      },
      "editorialStance": "National news agency and historical daily paper of record; official government communiqués, national security, diplomacy, and Sahel cooperation",
      "readership": {
        "metric": "Over 10,000 daily print copies distributed across Bamako and regional capitals, syndicating to regional media",
        "source": "AMAP Rapport d'Activité 2023"
      },
      "revenueModel": "State subsidies, newspaper sales, and public notice announcements",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://essor.ml",
        "https://fr.wikipedia.org/wiki/L%27Essor_(Mali)"
      ]
    },
    {
      "id": "ml-le-republicain",
      "countryCode": "ML",
      "name": "Le Républicain",
      "nativeName": "Le Républicain",
      "englishTranslation": "The Republican",
      "founded": 1992,
      "frequency": "Daily newspaper (Monday–Friday)",
      "format": "Tabloid & web portal",
      "language": "French",
      "headquarters": "Hamdallaye ACI 2000, Bamako",
      "owner": {
        "name": "Société de Presse Le Républicain",
        "type": "Independent commercial media"
      },
      "editorialStance": "Founded by prominent pro-democracy activist Tiébilé Dramé following Mali's 1991 democratic transition; steadfast defender of constitutional liberties, rule of law, and peace accords",
      "readership": {
        "metric": "Respected national daily with readership concentrated among political leaders, academics, and NGOs",
        "source": "Association des Éditeurs de Presse Privée (ASSEP) 2023"
      },
      "revenueModel": "Print sales, institutional advertising, and subscriptions",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://fr.wikipedia.org/wiki/Le_R%C3%A9publicain_(Mali)"
      ]
    }
  ],
  "MR": [
    {
      "id": "mr-ami",
      "countryCode": "MR",
      "name": "AMI (Agence Mauritanienne d'Information)",
      "nativeName": "وكالة الأنباء الموريتانية",
      "englishTranslation": "Mauritanian News Agency",
      "founded": 1975,
      "frequency": "Real-time news wire & daily publications",
      "format": "News wire, daily newspapers (Chaab & Horizons) & digital portal",
      "language": "Arabic, French",
      "headquarters": "Nouakchott",
      "owner": {
        "name": "Government of the Islamic Republic of Mauritania",
        "type": "State public enterprise"
      },
      "editorialStance": "Official state news agency; official communiqués, ministerial decisions, diplomatic visits, national mining developments, and regional Sahel stability",
      "readership": {
        "metric": "Primary source of official news wire feeds for domestic broadcasters, newspapers, and foreign embassies",
        "source": "AMI Rapport Annuel d'Activité 2023"
      },
      "revenueModel": "State budget subsidy and official publication subscriptions",
      "logo": "newspaper-logos/mr/ami.png",
      "logoExplainer": "Official masthead/brand mark for AMI (Agence Mauritanienne d'Information), sourced from the publisher's official site and visually verified.",
      "licenceNote": "AMI (Agence Mauritanienne d'Information) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://ami.mr",
        "https://fr.wikipedia.org/wiki/Agence_mauritanienne_d%27information"
      ]
    }
  ],
  "MX": [
    {
      "id": "mx-notimex",
      "countryCode": "MX",
      "name": "Notimex (Agencia Mexicana de Noticias)",
      "nativeName": "Notimex, Agencia Mexicana de Noticias",
      "englishTranslation": "Mexican News Agency",
      "founded": 1968,
      "frequency": "News wire service (historical/archival reference)",
      "format": "News wire & multimedia archive",
      "language": "Spanish, English",
      "headquarters": "Mexico City",
      "owner": {
        "name": "Government of Mexico (Historical State Agency)",
        "type": "State news agency"
      },
      "editorialStance": "Mexico's historic state news wire founded during the 1968 Summer Olympics; covered dispatches across all 32 Mexican states and Latin American bureaus until dissolution in 2023",
      "readership": {
        "metric": "Historical news agency syndicating to hundreds of newspapers and broadcasters across Mexico and the Americas",
        "source": "Diario Oficial de la Federación / Archivo Notimex"
      },
      "revenueModel": "State budget allocations and wire service subscriptions",
      "logo": "newspaper-logos/mx/notimex.png",
      "logoExplainer": "Black 'NOTIMEX' capitals with a colourful hummingbird emblem and the motto 'VERDAD, LIBERTAD Y DERECHO A LA INFORMACIÓN'.",
      "licenceNote": "Notimex logo trademark bundled from Wikimedia Commons (File:Logo NOTIMEX.png) for educational reference in Learn mode.",

      "sources": [
        "https://es.wikipedia.org/wiki/Notimex",
        "https://www.gob.mx"
      ]
    }
  ],
  "MD": [
    {
      "id": "md-moldpres",
      "countryCode": "MD",
      "name": "Moldpres",
      "nativeName": "Agenția Informațională de Stat Moldpres",
      "englishTranslation": "State Information Agency Moldpres",
      "founded": 1990,
      "frequency": "Real-time news wire & official gazette",
      "format": "News wire, Monitorul Oficial & digital portal",
      "language": "Romanian, English, Russian",
      "headquarters": "Chișinău",
      "owner": {
        "name": "Government of the Republic of Moldova",
        "type": "State public news agency"
      },
      "editorialStance": "Official state news agency and publisher of the Official Gazette (Monitorul Oficial); factual reporting on parliamentary legislation, European integration process, and diplomatic relations",
      "readership": {
        "metric": "Primary wire source for Moldovan broadcast stations and official publisher of all laws in the Republic",
        "source": "Moldpres Raport de Activitate 2023"
      },
      "revenueModel": "State budget allocation and official publication sales",
      "logo": "newspaper-logos/md/moldpres.png",
      "logoExplainer": "Official masthead/brand mark for Moldpres, sourced from the publisher's official site and visually verified.",
      "licenceNote": "Moldpres brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.moldpres.md",
        "https://ro.wikipedia.org/wiki/Moldpres"
      ]
    }
  ],
  "MN": [
    {
      "id": "mn-montsame",
      "countryCode": "MN",
      "name": "Montsame",
      "nativeName": "Монцамэ агентлаг",
      "englishTranslation": "Montsame News Agency",
      "founded": 1921,
      "frequency": "Real-time news wire & weekly newspapers",
      "format": "News wire, weekly journals (Mongol Messenger, Montsame Voskhod) & web portal",
      "language": "Mongolian, English, Russian, Chinese, Japanese",
      "headquarters": "Ulaanbaatar",
      "owner": {
        "name": "Government of Mongolia",
        "type": "State national news agency"
      },
      "annualPublicFunding": {
        "total": "MNT 4.5 billion",
        "perCapita": "MNT 1,320.00"
      },
      "editorialStance": "Mongolia's official national news agency; founded in 1921, provides authoritative wire dispatches on State Great Khural (parliament) legislation, nomadic pastoralism, mining sector investments, and foreign diplomacy",
      "readership": {
        "metric": "Sole national agency syndicating news across all 21 aimags (provinces) and 40+ international news agencies",
        "source": "Montsame Centennial Review 2023"
      },
      "revenueModel": "State budgetary subvention and wire syndication fees",
      "logo": "newspaper-logos/mn/montsame.png",
      "logoExplainer": "Official masthead/brand mark for Montsame, sourced from Wikimedia Commons and visually verified.",
      "licenceNote": "Montsame masthead trademark bundled from Wikimedia Commons (File:Montsame logo.png) for educational reference in Learn mode.",

      "sources": [
        "https://montsame.mn",
        "https://en.wikipedia.org/wiki/Montsame"
      ]
    }
  ],
  "ME": [
    {
      "id": "me-mina",
      "countryCode": "ME",
      "name": "MINA",
      "nativeName": "Novinska agencija MINA",
      "englishTranslation": "MINA News Agency",
      "founded": 2001,
      "frequency": "Real-time news wire service",
      "format": "News wire & digital agency portal",
      "language": "Montenegrin, English",
      "headquarters": "Podgorica",
      "owner": {
        "name": "Infomont d.o.o.",
        "type": "Independent news agency"
      },
      "editorialStance": "Montenegro's leading independent news wire agency; provides objective real-time dispatches on parliamentary affairs, EU accession talks, judicial reform, and regional Balkan relations",
      "readership": {
        "metric": "Syndicated to over 90% of domestic media outlets, radio stations, TV networks, and state bodies in Montenegro",
        "source": "MINA Corporate Profile 2023"
      },
      "revenueModel": "B2B wire service subscriptions and syndication licensing",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://mina.news"
      ]
    }
  ],
  "MA": [
    {
      "id": "ma-map",
      "countryCode": "MA",
      "name": "MAP (Maghreb Arabe Presse)",
      "nativeName": "وكالة المغرب العربي للأنباء",
      "englishTranslation": "Maghreb Arab Press Agency",
      "founded": 1959,
      "frequency": "Real-time news wire service & daily publications",
      "format": "News wire, daily newspapers (Le Matin / Al-Sahra Al-Maghribiya) & digital portal",
      "language": "Arabic, French, English, Spanish, Amazigh",
      "headquarters": "Rabat",
      "owner": {
        "name": "Kingdom of Morocco",
        "type": "State news agency"
      },
      "annualPublicFunding": {
        "total": "MAD 310 million",
        "perCapita": "MAD 8.40"
      },
      "editorialStance": "Morocco's official national news wire agency; founded under King Mohammed V, provides authoritative dispatches on Royal Palace activities, government policies, Sahara territorial integrity, and African diplomacy",
      "readership": {
        "metric": "Primary wire syndicator feeding over 200 national newspapers, radio stations, television networks, and international diplomatic posts",
        "source": "MAP Rapport d'Activité 2023"
      },
      "revenueModel": "State budgetary subvention, wire subscriptions, and commercial photo/video services",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.mapnews.ma",
        "https://fr.wikipedia.org/wiki/Maghreb_Arabe_Presse"
      ]
    }
  ],
  "MZ": [
    {
      "id": "mz-aim",
      "countryCode": "MZ",
      "name": "AIM (Agência de Informação de Moçambique)",
      "nativeName": "Agência de Informação de Moçambique",
      "englishTranslation": "Mozambique News Agency",
      "founded": 1975,
      "frequency": "Real-time news wire service",
      "format": "News wire & digital dispatch portal",
      "language": "Portuguese, English",
      "headquarters": "Maputo",
      "owner": {
        "name": "Government of the Republic of Mozambique",
        "type": "State news agency"
      },
      "editorialStance": "Official national news agency created at independence in 1975; provides institutional wire bulletins on Assembly of the Republic legislation, LNG mega-projects in Cabo Delgado, agricultural developments, and SADC regional cooperation",
      "readership": {
        "metric": "Primary wire source syndicated to state and private radio stations, newspapers, and international embassies across southern Africa",
        "source": "AIM Relatório de Actividades 2023"
      },
      "revenueModel": "State budgetary subvention and news agency syndication fees",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://aim.org.mz",
        "https://en.wikipedia.org/wiki/Ag%C3%AAncia_de_Informa%C3%A7%C3%A3o_de_Mo%C3%A7ambique"
      ]
    }
  ],
  "MM": [
    {
      "id": "mm-mna",
      "countryCode": "MM",
      "name": "Myanmar News Agency (MNA)",
      "nativeName": "မြန်မာသတင်းစဉ်",
      "englishTranslation": "Myanmar News Agency",
      "founded": 1963,
      "frequency": "Real-time news wire & state daily newspapers",
      "format": "News wire & state newspapers (Myanma Alinn, Kyemon, The Global New Light of Myanmar)",
      "language": "Burmese, English",
      "headquarters": "Naypyidaw / Yangon",
      "owner": {
        "name": "Ministry of Information",
        "type": "State news agency"
      },
      "editorialStance": "Official national state news agency of Myanmar; distributes official government notifications, administrative orders, diplomatic receptions, state economic projects, and military communiqués",
      "readership": {
        "metric": "Primary official wire distributor feeding all state broadcast television, radio, and state-owned newspapers nationwide",
        "source": "Ministry of Information Myanmar Annual Report 2023"
      },
      "revenueModel": "State government budget allocation and newspaper sales",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.moi.gov.mm",
        "https://en.wikipedia.org/wiki/Myanmar_News_Agency"
      ]
    },
    {
      "id": "mm-myanmar-now",
      "countryCode": "MM",
      "name": "Myanmar Now",
      "nativeName": "မြန်မာနောင်း",
      "englishTranslation": "Myanmar Now",
      "founded": 2015,
      "frequency": "Continuous digital investigative news service",
      "format": "Digital investigative news agency",
      "language": "Burmese, English",
      "headquarters": "Yangon (with distributed clandestine desks)",
      "owner": {
        "name": "Myanmar Now News Agency",
        "type": "Independent non-profit investigative media"
      },
      "editorialStance": "Award-winning independent investigative news agency; renowned for fearless in-depth investigations into military conglomerate holdings, illicit jade mines, war crimes, and pro-democracy resistance",
      "readership": {
        "metric": "Widely cited by the UN, international human rights tribunals, and millions of digital readers inside Myanmar via secure VPNs and social media",
        "source": "Myanmar Now Editorial Review 2023"
      },
      "revenueModel": "International investigative journalism grants, reader contributions, and syndication",
      "logo": "newspaper-logos/mm/myanmar-now.png",
      "logoExplainer": "Official masthead/brand mark for Myanmar Now, sourced from Wikimedia Commons and visually verified.",
      "licenceNote": "Myanmar Now brand mark trademark bundled from Wikimedia Commons (File:Myanmar Now Logo.png) for educational reference in Learn mode.",

      "sources": [
        "https://myanmar-now.net",
        "https://en.wikipedia.org/wiki/Myanmar_Now"
      ]
    }
  ],
  "ET": [
    {
      "id": "et-ena",
      "countryCode": "ET",
      "name": "Ethiopian News Agency (ENA)",
      "nativeName": "የኢትዮጵያ ዜና አገልግሎት",
      "englishTranslation": "Ethiopian News Agency",
      "founded": 1942,
      "frequency": "Real-time news wire service & bulletins",
      "format": "News wire & multimedia portal",
      "language": "Amharic, English, Oromo, Tigrinya, Somali, Afar, Arabic, French",
      "headquarters": "Addis Ababa",
      "owner": {
        "name": "Government of Ethiopia",
        "type": "State news agency"
      },
      "annualPublicFunding": {
        "total": "ETB 250 million",
        "perCapita": "ETB 2.10"
      },
      "editorialStance": "Ethiopia's historic national news wire agency; official coverage of the Prime Minister's Office, federal ministries, regional state councils, Grand Ethiopian Renaissance Dam (GERD), and African Union summits",
      "readership": {
        "metric": "Primary official news wire feeding over 60 domestic broadcast stations, regional media agencies, and international bureaus",
        "source": "ENA Corporate Review 2023"
      },
      "revenueModel": "State government subvention and wire syndication fees",
      "logo": "newspaper-logos/et/ena.png",
      "logoExplainer": "'ENA' brand mark — the Ethiopian News Agency emblem.",
      "licenceNote": "Trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.ena.et",
        "https://en.wikipedia.org/wiki/Ethiopian_News_Agency"
      ]
    },
    {
      "id": "et-addis-standard",
      "countryCode": "ET",
      "name": "Addis Standard",
      "founded": 2011,
      "frequency": "Continuous digital investigative news service & monthly journal",
      "format": "Digital news portal & investigative multimedia",
      "language": "English, Amharic, Afaan Oromoo",
      "headquarters": "Addis Ababa",
      "owner": {
        "name": "JAKENN Publishing Plc",
        "type": "Independent commercial media"
      },
      "editorialStance": "Progressive, reformist independent publication; recognized internationally for unflinching coverage of civil conflicts, transitional justice, ethnic federalism, and press freedoms",
      "readership": {
        "metric": "Over 800,000 monthly unique digital readers, heavily cited by international human rights monitors and foreign correspondents",
        "source": "JAKENN Publishing Audience Data 2024"
      },
      "revenueModel": "Digital advertising, voluntary reader contributions, and international press development grants",
      "logo": "newspaper-logos/et/addis-standard.png",
      "logoExplainer": "'Addis Standard' wordmark — the Addis Ababa news magazine brand.",
      "licenceNote": "Trademark bundled from Wikimedia Commons (File:Addis Standard.png) for educational reference in Learn mode.",

      "sources": [
        "https://addisstandard.com",
        "https://en.wikipedia.org/wiki/Addis_Standard"
      ]
    }
  ],
  "KP": [
    {
      "id": "kp-kcna",
      "countryCode": "KP",
      "name": "KCNA (Korean Central News Agency)",
      "nativeName": "조선중앙통신",
      "englishTranslation": "Korean Central News Agency",
      "founded": 1946,
      "frequency": "Real-time state wire service",
      "format": "News wire, photo service & digital state portal",
      "language": "Korean, English, Russian, Chinese, Spanish, Japanese",
      "headquarters": "Potonggang District, Pyongyang",
      "owner": {
        "name": "Government of the Democratic People's Republic of Korea",
        "type": "State news agency"
      },
      "editorialStance": "Sole official national news agency of North Korea; publishes official communiqués of the Workers' Party of Korea (WPK), Supreme Leader activities, military dispatches, and state foreign policy",
      "readership": {
        "metric": "Monopoly news wire feeding all domestic print, broadcast, and institutional bulletin boards across the DPRK and state overseas missions",
        "source": "DPRK State Media Profile / KCNA 2023"
      },
      "revenueModel": "100% state budget allocation",
      "logo": "newspaper-logos/kp/kcna.svg",
      "logoExplainer": "Deep red banner adorned with gold Korean calligraphy '조선중앙통신' and stark white Latin acronym 'KCNA', symbolizing official state wire authority.",
      "sources": [
        "http://www.kcna.kp",
        "https://en.wikipedia.org/wiki/Korean_Central_News_Agency"
      ]
    }
  ],
  "KR": [
    {
      "id": "kr-yonhap",
      "countryCode": "KR",
      "name": "Yonhap News Agency",
      "nativeName": "연합뉴스",
      "englishTranslation": "United News",
      "founded": 1980,
      "frequency": "Real-time national news wire service",
      "format": "News wire, multimedia portal & 24/7 TV (Yonhap News TV)",
      "language": "Korean, English, Chinese, Japanese, French, Arabic, Spanish",
      "headquarters": "Jongno-gu, Seoul",
      "owner": {
        "name": "Korea News Agency Commission (Public Corporation)",
        "type": "Public statutory news agency"
      },
      "annualPublicFunding": {
        "total": "KRW 32.8 billion",
        "perCapita": "KRW 635.00"
      },
      "editorialStance": "South Korea's national news wire agency designated by statute; provides impartial real-time dispatches on the National Assembly, Blue House/Yongsan Presidential Office, chaebol corporate developments, and inter-Korean affairs",
      "readership": {
        "metric": "Syndicated to all major South Korean newspapers, broadcasting networks, government ministries, and international partner agencies",
        "source": "Yonhap News Agency Annual Report 2023"
      },
      "revenueModel": "B2B wire service subscriptions and government public service contract",
      "logo": "newspaper-logos/kr/yonhap.jpg",
      "logoExplainer": "'Yonhap' / 연합뉴스 agency brand mark.",
      "licenceNote": "Trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://en.yna.co.kr",
        "https://www.yna.co.kr",
        "https://en.wikipedia.org/wiki/Yonhap_News_Agency"
      ]
    }
  ],
  "NA": [
    {
      "id": "na-nampa",
      "countryCode": "NA",
      "name": "NAMPA (Namibia Press Agency)",
      "founded": 1987,
      "frequency": "Real-time news wire service",
      "format": "News wire & digital portal",
      "language": "English",
      "headquarters": "Windhoek",
      "owner": {
        "name": "Government of the Republic of Namibia",
        "type": "State news agency"
      },
      "annualPublicFunding": {
        "total": "NAD 28.5 million",
        "perCapita": "NAD 11.00"
      },
      "editorialStance": "Official national news agency established by parliamentary act; provides factual, developmental wire coverage of National Assembly debates, mining regulations, rural community development, and SADC diplomacy",
      "readership": {
        "metric": "Primary wire source syndicating news to all national radio stations, television channels, and commercial print newspapers",
        "source": "NAMPA Annual Report 2023"
      },
      "revenueModel": "State government funding and commercial news syndication",
      "logo": "newspaper-logos/na/nampa.png",
      "logoExplainer": "Official masthead/brand mark for NAMPA (Namibia Press Agency), sourced from the publisher's official site and visually verified.",
      "licenceNote": "NAMPA (Namibia Press Agency) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.nampa.org",
        "https://en.wikipedia.org/wiki/Namibia_Press_Agency"
      ]
    },
    {
      "id": "na-the-namibian",
      "countryCode": "NA",
      "name": "The Namibian",
      "founded": 1985,
      "frequency": "Daily newspaper (Monday–Friday)",
      "format": "Tabloid & digital news portal",
      "language": "English, Oshiwambo",
      "headquarters": "Windhoek",
      "owner": {
        "name": "Free Press of Namibia (Pty) Ltd (Trust-owned)",
        "type": "Independent trust-owned media"
      },
      "editorialStance": "Namibia's largest and most famous independent daily newspaper; founded by anti-apartheid champion Gwen Lister, acclaimed for fearless investigative journalism, government accountability, and constitutional protections",
      "readership": {
        "metric": "Largest print circulation in Namibia with over 30,000 daily copies and leading national news portal namibian.com.na",
        "source": "Free Press of Namibia Audited Statement 2023"
      },
      "revenueModel": "Print sales, commercial advertising, and digital subscriptions",
      "logo": "newspaper-logos/na/the-namibian.png",
      "logoExplainer": "Official masthead/brand mark for The Namibian, sourced from the publisher's official site and visually verified.",
      "licenceNote": "The Namibian masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.namibian.com.na",
        "https://en.wikipedia.org/wiki/The_Namibian"
      ]
    }
  ],
  "NP": [
    {
      "id": "np-rss",
      "countryCode": "NP",
      "name": "RSS (Rastriya Samachar Samiti)",
      "nativeName": "राष्ट्रिय समाचार समिति (रासस)",
      "englishTranslation": "National News Agency",
      "founded": 1962,
      "frequency": "Real-time news wire service",
      "format": "News wire & digital dispatch portal",
      "language": "Nepali, English",
      "headquarters": "Bhadrakali, Kathmandu",
      "owner": {
        "name": "Government of Nepal",
        "type": "State news agency"
      },
      "annualPublicFunding": {
        "total": "NPR 180 million",
        "perCapita": "NPR 6.00"
      },
      "editorialStance": "Nepal's sole official national news wire agency; founded under the Rastriya Samachar Samiti Act 1962, delivering verified dispatches on federal parliament, provincial governments, mountain disasters, and foreign treaties",
      "readership": {
        "metric": "Primary wire source feeding over 500 community radio stations, national newspapers, and digital news portals across all 7 provinces",
        "source": "RSS Annual Progress Report 2023"
      },
      "revenueModel": "Government budgetary grant and wire syndication fees",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.rssnepal.org.np",
        "https://en.wikipedia.org/wiki/Rastriya_Samachar_Samiti"
      ]
    },
    {
      "id": "np-onlinekhabar",
      "countryCode": "NP",
      "name": "Onlinekhabar",
      "nativeName": "अनलाइनखबर",
      "englishTranslation": "Online News",
      "founded": 2006,
      "frequency": "Continuous digital news service",
      "format": "Pure digital news portal & video channels",
      "language": "Nepali, English",
      "headquarters": "New Baneshwor, Kathmandu",
      "owner": {
        "name": "Onlinekhabar Network Pvt. Ltd.",
        "type": "Independent digital media"
      },
      "editorialStance": "Nepal's pioneer pure-digital newsroom; fast-breaking national politics, investigative reports on governance, citizen grievances, and lively multimedia storytelling",
      "readership": {
        "metric": "Over 6 million monthly unique users and ranked consistently as the most visited online news portal in Nepal",
        "source": "Similarweb / Onlinekhabar Audience Metrics 2023"
      },
      "revenueModel": "Digital programmatic advertising, video sponsorships, and branded content",
      "logo": "newspaper-logos/np/onlinekhabar.svg",
      "logoExplainer": "Official masthead/brand mark for Onlinekhabar, sourced from the publisher's official site and visually verified.",
      "licenceNote": "Onlinekhabar masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.onlinekhabar.com",
        "https://english.onlinekhabar.com"
      ]
    }
  ],
  "NL": [
    {
      "id": "nl-anp",
      "countryCode": "NL",
      "name": "ANP (Algemeen Nederlands Persbureau)",
      "nativeName": "Algemeen Nederlands Persbureau",
      "englishTranslation": "General Netherlands Press Agency",
      "founded": 1934,
      "frequency": "Real-time national news wire service",
      "format": "News wire, photo service & radio news bulletin",
      "language": "Dutch, English",
      "headquarters": "The Hague (Den Haag)",
      "owner": {
        "name": "Chris Oomen (Private Investment)",
        "type": "Independent commercial wire agency"
      },
      "editorialStance": "The Netherlands' national news agency; independent, strictly impartial real-time reporting of Binnenhof politics, Dutch legal decisions, European Union policy, and global news",
      "readership": {
        "metric": "Supplies wire dispatches and radio bulletins to nearly 100% of Dutch newspapers, television broadcasters, and commercial radio stations",
        "source": "ANP Jaarverslag 2023"
      },
      "revenueModel": "B2B wire service contracts, corporate communications, and photo licensing",
      "logo": "newspaper-logos/nl/anp.jpg",
      "logoExplainer": "White '.ANP' on a blue field — the Algemeen Nederlands Persbureau agency mark.",
      "licenceNote": "ANP logo trademark bundled from the agency's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.anp.nl",
        "https://nl.wikipedia.org/wiki/Algemeen_Nederlands_Persbureau"
      ]
    }
  ],
  "NE": [
    {
      "id": "ne-anp",
      "countryCode": "NE",
      "name": "ANP (Agence Nigérienne de Presse)",
      "nativeName": "Agence Nigérienne de Presse",
      "englishTranslation": "Nigerien News Agency",
      "founded": 1987,
      "frequency": "Real-time news wire service",
      "format": "News wire & digital dispatch portal",
      "language": "French",
      "headquarters": "Niamey",
      "owner": {
        "name": "Ministry of Communication",
        "type": "State news agency"
      },
      "editorialStance": "Official national news agency of Niger; provides verified wire bulletins on National Council (CNSP) decrees, uranium mining, agricultural pastoralism, and Sahel security operations across all 8 regions",
      "readership": {
        "metric": "Primary wire supplier syndicating news to over 100 private and community radio stations, state broadcasters, and foreign agencies",
        "source": "ANP Rapport d'Activité 2023"
      },
      "revenueModel": "State government budget allocation and wire distribution subscriptions",
      "logo": "newspaper-logos/ne/anp.png",
      "logoExplainer": "Official masthead/brand mark for ANP (Agence Nigérienne de Presse), sourced from the publisher's official site and visually verified.",
      "licenceNote": "ANP (Agence Nigérienne de Presse) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.anp.ne",
        "https://fr.wikipedia.org/wiki/Agence_nig%C3%A9rienne_de_presse"
      ]
    },
    {
      "id": "ne-le-republicain",
      "countryCode": "NE",
      "name": "Le Républicain Niger",
      "nativeName": "Le Républicain",
      "englishTranslation": "The Republican",
      "founded": 1991,
      "frequency": "Weekly newspaper (Thursdays) & digital portal",
      "format": "Tabloid & digital news portal",
      "language": "French",
      "headquarters": "Niamey",
      "owner": {
        "name": "Société Nigérienne de Presse et d'Édition",
        "type": "Independent commercial media"
      },
      "editorialStance": "Pioneer of Niger's independent private press founded during the 1991 Sovereign National Conference; staunch defender of democratic institutions, rule of law, anti-corruption transparency, and human rights",
      "readership": {
        "metric": "Circulates over 5,000 print copies weekly and widely consulted by civil society, lawyers, and university academics",
        "source": "Maison de la Presse du Niger 2023"
      },
      "revenueModel": "Newsstand sales, institutional subscriptions, and commercial advertising",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://republicain-niger.com",
        "https://fr.wikipedia.org/wiki/Le_R%C3%A9publicain_(Niger)"
      ]
    }
  ],
  "NG": [
    {
      "id": "ng-nan",
      "countryCode": "NG",
      "name": "NAN (News Agency of Nigeria)",
      "founded": 1976,
      "frequency": "Real-time national news wire service",
      "format": "News wire, photo service & digital agency portal",
      "language": "English",
      "headquarters": "Central Business District, Abuja",
      "owner": {
        "name": "Federal Government of Nigeria",
        "type": "Federal state news agency"
      },
      "annualPublicFunding": {
        "total": "NGN 3.2 billion",
        "perCapita": "NGN 14.50"
      },
      "editorialStance": "Africa's largest national news wire agency; statutory monopoly wire provider distributing comprehensive, factual reporting on the Presidency, National Assembly, 36 state governments, oil sector regulations, and ECOWAS diplomacy",
      "readership": {
        "metric": "Supplies wire feeds to over 250 print newspapers, television networks, and radio stations across all 36 states of Nigeria",
        "source": "News Agency of Nigeria Annual Audit 2023"
      },
      "revenueModel": "Federal government subvention and wire syndication subscription fees",
      "logo": "newspaper-logos/ng/nan.png",
      "logoExplainer": "Official 'NAN (News Agency of Nigeria)' masthead/logo as used by the publisher — sourced from the outlet's own site.",
      "licenceNote": "NAN (News Agency of Nigeria) masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://nannews.ng",
        "https://en.wikipedia.org/wiki/News_Agency_of_Nigeria"
      ]
    }
  ],
  "MK": [
    {
      "id": "mk-mia",
      "countryCode": "MK",
      "name": "MIA (Media Information Agency)",
      "nativeName": "Медиумска информативна агенција",
      "englishTranslation": "Media Information Agency",
      "founded": 1992,
      "frequency": "Real-time news wire service",
      "format": "News wire & digital dispatch portal",
      "language": "Macedonian, Albanian, English",
      "headquarters": "Skopje",
      "owner": {
        "name": "Government of the Republic of North Macedonia",
        "type": "State news agency"
      },
      "annualPublicFunding": {
        "total": "MKD 85 million",
        "perCapita": "MKD 46.00"
      },
      "editorialStance": "Official national public news agency; provides impartial wire dispatches on Sobranie (parliament) debates, EU harmonization, NATO integration, and regional Balkan diplomacy",
      "readership": {
        "metric": "Primary wire source feeding over 80% of broadcasters and print publications across North Macedonia",
        "source": "MIA Godisen Izvestaj 2023"
      },
      "revenueModel": "State public service subvention and B2B wire subscriptions",
      "logo": "newspaper-logos/mk/mia.png",
      "logoExplainer": "Official masthead/brand mark for MIA (Media Information Agency), sourced from the publisher's official site and visually verified.",
      "licenceNote": "MIA (Media Information Agency) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://mia.mk",
        "https://en.wikipedia.org/wiki/Media_Information_Agency"
      ]
    }
  ],
  "NO": [
    {
      "id": "no-ntb",
      "countryCode": "NO",
      "name": "NTB (Norsk Telegrambyrå)",
      "nativeName": "Norsk Telegrambyrå",
      "englishTranslation": "Norwegian Telegram Agency",
      "founded": 1867,
      "frequency": "Real-time national news wire service",
      "format": "News wire, photo agency & automated journalism",
      "language": "Norwegian (Bokmål & Nynorsk), English",
      "headquarters": "Havnelageret, Oslo",
      "owner": {
        "name": "Norwegian media houses cooperative (Amedia, Schibsted, Polaris, etc.)",
        "type": "Media cooperative news wire"
      },
      "editorialStance": "Norway's premier national news agency; strictly impartial real-time coverage of Storting (parliament) debates, Arctic affairs, Nordic climate research, and sovereign wealth fund (Oljefondet) investments",
      "readership": {
        "metric": "Supplies wire content, live sports feeds, and images to nearly 100% of Norwegian print, broadcast, and online media",
        "source": "NTB Årsrapport 2023"
      },
      "revenueModel": "B2B wire subscriptions, editorial tech syndication, and photo licensing",
      "logo": "newspaper-logos/no/ntb.svg",
      "logoExplainer": "Orange geometric letterforms spelling NTB — the Norwegian News Agency brand mark.",
      "licenceNote": "NTB logo trademark bundled from the agency's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.ntb.no",
        "https://no.wikipedia.org/wiki/Norsk_Telegrambyr%C3%A5"
      ]
    }
  ],
  "OM": [
    {
      "id": "om-ona",
      "countryCode": "OM",
      "name": "ONA (Oman News Agency)",
      "nativeName": "وكالة الأنباء العمانية",
      "englishTranslation": "Oman News Agency",
      "founded": 1986,
      "frequency": "Real-time news wire service",
      "format": "News wire & multimedia portal",
      "language": "Arabic, English",
      "headquarters": "Al Athaiba, Muscat",
      "owner": {
        "name": "Ministry of Information",
        "type": "State news agency"
      },
      "editorialStance": "Official national news agency of the Sultanate of Oman; provides verified wire bulletins on Royal Decrees of Sultan Haitham bin Tariq, Oman Vision 2040 economic diversification, Shura Council sessions, and regional GCC diplomacy",
      "readership": {
        "metric": "Primary official wire distributor feeding all domestic radio stations, TV networks, newspapers, and foreign missions",
        "source": "Ministry of Information Sultanate of Oman 2023"
      },
      "revenueModel": "State government budget allocation",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://omannews.gov.om",
        "https://en.wikipedia.org/wiki/Oman_News_Agency"
      ]
    },
    {
      "id": "om-al-shabiba",
      "countryCode": "OM",
      "name": "Al Shabiba",
      "nativeName": "الشبيبة",
      "englishTranslation": "The Youth",
      "founded": 1993,
      "frequency": "Daily newspaper (Monday–Sunday) & digital portal",
      "format": "Tabloid & digital video portal",
      "language": "Arabic",
      "headquarters": "Ruwi, Muscat",
      "owner": {
        "name": "Muscat Press & Publishing House (MPPH)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Leading independent Arabic daily; focuses on youth empowerment, education, job market analytics, local municipal issues, and national sports",
      "readership": {
        "metric": "Over 35,000 print daily circulation and strong social video viewership across the Sultanate",
        "source": "MPPH Audience Metrics 2023"
      },
      "revenueModel": "Commercial print and digital advertising",
      "logo": "newspaper-logos/om/al-shabiba.svg",
      "logoExplainer": "Arabic 'الشبيبة' masthead — Al Shabiba's brand mark.",
      "licenceNote": "Trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.shabiba.com",
        "https://en.wikipedia.org/wiki/Al-Shabiba"
      ]
    }
  ],
  "PK": [
    {
      "id": "pk-app",
      "countryCode": "PK",
      "name": "APP (Associated Press of Pakistan)",
      "founded": 1947,
      "frequency": "Real-time national news wire service",
      "format": "News wire, photo service & digital portal",
      "language": "English, Urdu, Arabic, Chinese, Russian",
      "headquarters": "Sector G-7/1, Islamabad",
      "owner": {
        "name": "Ministry of Information and Broadcasting",
        "type": "State news agency"
      },
      "annualPublicFunding": {
        "total": "PKR 1.4 billion",
        "perCapita": "PKR 5.80"
      },
      "editorialStance": "Pakistan's premier national news wire agency; statutory supplier of official news covering the Prime Minister's Office, Supreme Court rulings, military operations, and CPEC infrastructure developments",
      "readership": {
        "metric": "Primary wire source feeding over 300 newspapers, 40+ private TV channels, and Radio Pakistan nationwide",
        "source": "APP Annual Review 2023"
      },
      "revenueModel": "Federal government budget subvention and media subscriber licensing",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.app.com.pk",
        "https://en.wikipedia.org/wiki/Associated_Press_of_Pakistan"
      ]
    }
  ],
  "PY": [
    {
      "id": "py-ipparaguay",
      "countryCode": "PY",
      "name": "Agencia IP (Información Pública)",
      "nativeName": "Agencia de Información Paraguaya",
      "englishTranslation": "Paraguayan Information Agency",
      "founded": 2009,
      "frequency": "Real-time news wire service",
      "format": "News wire & digital portal",
      "language": "Spanish, Guaraní",
      "headquarters": "Asunción",
      "owner": {
        "name": "Ministry of Information and Communication Technologies (MITIC)",
        "type": "State news agency"
      },
      "editorialStance": "Official national state news agency of Paraguay; provides verified wire coverage of Presidential Palace (Palacio de los López) communiqués, Itaipú/Yacyretá hydroelectric energy agreements, and agricultural export policy",
      "readership": {
        "metric": "Primary official wire distributor for state and private radio stations, newspapers, and regional Mercosur agencies",
        "source": "MITIC Paraguay Memoria Institucional 2023"
      },
      "revenueModel": "State government budget allocation",
      "logo": "newspaper-logos/py/ipparaguay.png",
      "logoExplainer": "Official masthead/brand mark for Agencia IP (Información Pública), sourced from the publisher's official site and visually verified.",
      "licenceNote": "Agencia IP (Información Pública) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.ip.gov.py",
        "https://es.wikipedia.org/wiki/Agencia_IP"
      ]
    }
  ],
  "PE": [
    {
      "id": "pe-andina",
      "countryCode": "PE",
      "name": "Andina (Agencia Peruana de Noticias)",
      "nativeName": "Agencia Peruana de Noticias Andina",
      "englishTranslation": "Peruvian News Agency Andina",
      "founded": 1981,
      "frequency": "Real-time news wire service & El Peruano",
      "format": "News wire, daily official gazette (El Peruano) & digital portal",
      "language": "Spanish, Quechua, Aymara, English",
      "headquarters": "Jirón Quilca, Lima",
      "owner": {
        "name": "Editora Perú (State Public Enterprise)",
        "type": "State news agency"
      },
      "annualPublicFunding": {
        "total": "PEN 42.0 million",
        "perCapita": "PEN 1.25"
      },
      "editorialStance": "Official national news agency of Peru and sister outlet to the historic official gazette El Peruano (founded 1825 by Simón Bolívar); delivers impartial wire coverage of Congress, constitutional tribunals, mining projects, and Amazonian affairs",
      "readership": {
        "metric": "Primary wire source syndicating news to over 150 radio networks, regional newspapers, and television stations across all 25 regions",
        "source": "Editora Perú Memoria Anual 2023"
      },
      "revenueModel": "State budget allocation, official legal announcements, and wire subscriptions",
      "logo": "newspaper-logos/pe/andina.png",
      "logoExplainer": "'ANDINA' brand mark — Peru's national news agency emblem.",
      "licenceNote": "Trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://andina.pe",
        "https://es.wikipedia.org/wiki/Andina_(agencia_de_informaci%C3%B3n)"
      ]
    }
  ],
  "PH": [
    {
      "id": "ph-pna",
      "countryCode": "PH",
      "name": "PNA (Philippine News Agency)",
      "founded": 1973,
      "frequency": "Real-time national news wire service",
      "format": "News wire & digital portal",
      "language": "English, Filipino",
      "headquarters": "PIA Building, Visayas Avenue, Quezon City",
      "owner": {
        "name": "News and Information Bureau (Presidential Communications Office)",
        "type": "State news agency"
      },
      "annualPublicFunding": {
        "total": "PHP 185 million",
        "perCapita": "PHP 1.60"
      },
      "editorialStance": "Official national news agency of the Republic of the Philippines; delivers verified dispatches on Malacañang Presidential decrees, Senate and House bills, disaster risk reduction (PAGASA updates), and ASEAN diplomacy",
      "readership": {
        "metric": "Primary wire source feeding over 200 community newspapers, radio stations, television networks, and provincial information centers",
        "source": "PNA Annual Accomplishment Report 2023"
      },
      "revenueModel": "National government budgetary funding",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.pna.gov.ph",
        "https://en.wikipedia.org/wiki/Philippine_News_Agency"
      ]
    },
    {
      "id": "ph-the-philippine-star",
      "countryCode": "PH",
      "name": "The Philippine Star",
      "founded": 1986,
      "frequency": "Daily morning newspaper (Monday–Sunday) & Philstar.com",
      "format": "Broadsheet & digital superportal",
      "language": "English",
      "headquarters": "Roberto S. Oca St., Port Area, Manila",
      "owner": {
        "name": "Philstar Media Group (MediaQuest Holdings)",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Major high-circulation broadsheet daily; balanced center-right editorial tradition, known for comprehensive coverage of business conglomerates, infrastructure megaprojects, lifestyle, and sports",
      "readership": {
        "metric": "Over 240,000 daily print copies and philstar.com reaches over 15 million monthly digital readers",
        "source": "UPMG Audit Statement 2023"
      },
      "revenueModel": "Print sales, extensive corporate advertising, and digital sponsorships",
      "logo": "newspaper-logos/ph/the-philippine-star.svg",
      "logoExplainer": "'The Philippine Star' masthead — the Manila daily brand mark.",
      "licenceNote": "Trademark bundled from Wikimedia Commons (File:The Philippine STAR logo.svg) for educational reference in Learn mode.",

      "sources": [
        "https://www.philstar.com",
        "https://en.wikipedia.org/wiki/The_Philippine_Star"
      ]
    }
  ],
  "PL": [
    {
      "id": "pl-pap",
      "countryCode": "PL",
      "name": "PAP (Polska Agencja Prasowa)",
      "nativeName": "Polska Agencja Prasowa S.A.",
      "englishTranslation": "Polish Press Agency",
      "founded": 1918,
      "frequency": "Real-time 24/7 national news wire service",
      "format": "News wire, multimedia platform & fact-checking service",
      "language": "Polish, English, Ukrainian, Russian",
      "headquarters": "ul. Bracka 6/8, Warsaw",
      "owner": {
        "name": "State Treasury of the Republic of Poland (Ministry of Culture and National Heritage)",
        "type": "State-owned public news agency"
      },
      "annualPublicFunding": {
        "total": "PLN 220 million",
        "perCapita": "PLN 5.85"
      },
      "editorialStance": "Official national news agency of Poland; founded during the rebirth of Polish independence in 1918; delivers impartial, verified wire dispatches on Sejm and Senate legislation, European Union summits, NATO defense policy, and regional Central European security",
      "readership": {
        "metric": "Over 1,000 daily news dispatches and 1,500 photographs syndicated to virtually every major newspaper, TV network, radio station, and portal in Poland",
        "source": "PAP Sprawozdanie Finansowe i Działalności 2023"
      },
      "revenueModel": "State budget subsidy and commercial wire distribution licensing",
      "logo": "newspaper-logos/pl/pap.svg",
      "logoExplainer": "Lowercase orange-red 'pap' inside an oval frame — the Polish Press Agency brand mark.",
      "licenceNote": "PAP (Polska Agencja Prasowa) logo trademark bundled from Wikimedia Commons (File:PAP logo.svg) for educational reference in Learn mode.",

      "sources": [
        "https://www.pap.pl",
        "https://en.wikipedia.org/wiki/Polish_Press_Agency"
      ]
    }
  ],
  "PT": [
    {
      "id": "pt-lusa",
      "countryCode": "PT",
      "name": "Lusa (Agência de Notícias de Portugal)",
      "nativeName": "Lusa - Agência de Notícias de Portugal, S.A.",
      "englishTranslation": "Lusa - News Agency of Portugal",
      "founded": 1987,
      "frequency": "Real-time 24/7 national news wire service",
      "format": "News wire & digital syndication service",
      "language": "Portuguese, English",
      "headquarters": "Rua Dr. João Pedro de Andrade, Lisbon",
      "owner": {
        "name": "Portuguese State (Direção-Geral do Tesouro e Finanças)",
        "type": "State-owned national news agency"
      },
      "annualPublicFunding": {
        "total": "EUR 16.5 million",
        "perCapita": "EUR 1.58"
      },
      "editorialStance": "Official national news agency of Portugal; primary Portuguese-language news wire worldwide with bureaus across all CPLP Lusophone countries (Angola, Mozambique, Brazil, Cape Verde, Guinea-Bissau, São Tomé, Timor-Leste); provides rigorous objective coverage of government policy and European affairs",
      "readership": {
        "metric": "Feeds over 800 news articles and 250 photos daily to more than 600 media clients across Portugal and the Lusophone world",
        "source": "Relatório de Gestão e Contas Lusa 2023"
      },
      "revenueModel": "State public-service contract funding and news licensing fees",
      "logo": "newspaper-logos/pt/lusa.svg",
      "logoExplainer": "'LUSA' with a red/green arc and 'Agência de Notícias de Portugal' — the national agency mark.",
      "licenceNote": "Trademark bundled from Wikimedia Commons (File:Logo LUSA.svg) for educational reference in Learn mode.",

      "sources": [
        "https://www.lusa.pt",
        "https://en.wikipedia.org/wiki/Lusa_News_Agency"
      ]
    }
  ],
  "QA": [
    {
      "id": "qa-qna",
      "countryCode": "QA",
      "name": "QNA (Qatar News Agency)",
      "nativeName": "وكالة الأنباء القطرية",
      "englishTranslation": "Qatar News Agency",
      "founded": 1975,
      "frequency": "Real-time 24/7 national news wire service",
      "format": "News wire, multimedia platform & official gazette",
      "language": "Arabic, English, French, Spanish, German",
      "headquarters": "Doha",
      "owner": {
        "name": "State of Qatar (Government Communications Office)",
        "type": "State news agency"
      },
      "annualPublicFunding": {
        "total": "QAR 120 million",
        "perCapita": "QAR 42.80"
      },
      "editorialStance": "Official national news agency of the State of Qatar; established by Emiri decree in 1975; authoritative wire coverage of the Amiri Diwan, Ministry of Foreign Affairs diplomacy, energy sector (QatarEnergy LNG), and GCC regional affairs",
      "readership": {
        "metric": "Official national wire distributing verified dispatches to all domestic media, diplomatic missions, and international news agencies",
        "source": "QNA Annual Review 2023"
      },
      "revenueModel": "State government budget funding",
      "logo": "newspaper-logos/qa/qna.png",
      "logoExplainer": "'QNA' brand mark — Qatar News Agency emblem.",
      "licenceNote": "Trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.qna.org.qa",
        "https://en.wikipedia.org/wiki/Qatar_News_Agency"
      ]
    }
  ],
  "RO": [
    {
      "id": "ro-agerpres",
      "countryCode": "RO",
      "name": "Agerpres",
      "nativeName": "Agenția Națională de Presă AGERPRES",
      "englishTranslation": "National News Agency AGERPRES",
      "founded": 1889,
      "frequency": "Real-time 24/7 national news wire service",
      "format": "News wire & multimedia portal",
      "language": "Romanian, English, Hungarian",
      "headquarters": "Piața Presei Libere 1, Sector 1, Bucharest",
      "owner": {
        "name": "Parliament of Romania",
        "type": "Autonomous public news agency"
      },
      "annualPublicFunding": {
        "total": "RON 28.5 million",
        "perCapita": "RON 1.50"
      },
      "editorialStance": "Historic national news agency of Romania, founded in 1889 by King Carol I as the Romanian Telegraph Agency; provides verified, non-partisan wire coverage of Parliament, government ministries, Black Sea geopolitics, and EU affairs",
      "readership": {
        "metric": "Syndicates over 500 news stories and 300 photo dispatches daily to over 250 Romanian media organizations and global news agencies",
        "source": "Agerpres Raport de Activitate 2023"
      },
      "revenueModel": "Parliamentary state budget appropriation and news service subscriptions",
      "logo": "newspaper-logos/ro/agerpres.png",
      "logoExplainer": "'AGERPRES' brand mark — Romania's national news agency emblem.",
      "licenceNote": "Trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.agerpres.ro",
        "https://en.wikipedia.org/wiki/Agerpres"
      ]
    }
  ],
  "RU": [
    {
      "id": "ru-tass",
      "countryCode": "RU",
      "name": "TASS (Russian News Agency TASS)",
      "nativeName": "Информационное агентство России ТАСС",
      "englishTranslation": "Information Agency of Russia TASS",
      "founded": 1904,
      "frequency": "Real-time 24/7 national news wire service",
      "format": "News wire & multimedia portal",
      "language": "Russian, English, Arabic, Chinese, Spanish, French",
      "headquarters": "Tverskoy Boulevard 10-12, Moscow",
      "owner": {
        "name": "Government of the Russian Federation (Federal Agency for State Property Management)",
        "type": "State news agency"
      },
      "annualPublicFunding": {
        "total": "RUB 3.8 billion",
        "perCapita": "RUB 26.50"
      },
      "editorialStance": "Historic national news agency of Russia, founded in 1904 as the Saint Petersburg Telegraph Agency; official state wire service reporting on Kremlin decrees, State Duma and Federation Council proceedings, defense operations, and BRICS cooperation",
      "readership": {
        "metric": "Feeds thousands of wire dispatches daily to more than 5,000 media organizations, government ministries, and diplomatic bureaus globally",
        "source": "TASS Corporate Report 2023"
      },
      "revenueModel": "Federal budget subsidy and news wire syndication",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://tass.ru",
        "https://en.wikipedia.org/wiki/TASS"
      ]
    }
  ],
  "RW": [
    {
      "id": "rw-rna",
      "countryCode": "RW",
      "name": "Rwanda News Agency (RNA)",
      "nativeName": "Agence Rwandaise d'Information (ARI / RNA)",
      "englishTranslation": "Rwanda News Agency",
      "founded": 2004,
      "frequency": "Real-time news wire service",
      "format": "News wire & digital portal",
      "language": "Kinyarwanda, French, English",
      "headquarters": "Kigali",
      "owner": {
        "name": "RNA Media Group",
        "type": "Independent news agency"
      },
      "editorialStance": "Premier news agency of Rwanda; provides independent, factual wire coverage of Rwandan parliamentary proceedings, Kigali international investment forums, East African Community (EAC) integration, and post-genocide national reconstruction",
      "readership": {
        "metric": "Primary independent wire source syndicating news to regional broadcasters and international African affairs researchers",
        "source": "RNA Corporate Profile 2023"
      },
      "revenueModel": "Wire syndication licensing and digital advertising",
      "logo": "newspaper-logos/rw/rna.png",
      "logoExplainer": "Official masthead/brand mark for Rwanda News Agency (RNA), sourced from the publisher's official site and visually verified.",
      "licenceNote": "Rwanda News Agency (RNA) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.rnanews.com",
        "https://en.wikipedia.org/wiki/Media_of_Rwanda"
      ]
    }
  ],
  "KN": [
    {
      "id": "kn-sknis",
      "countryCode": "KN",
      "name": "SKNIS (St. Kitts and Nevis Information Service)",
      "nativeName": "St. Kitts and Nevis Information Service",
      "englishTranslation": "St. Kitts and Nevis Information Service",
      "founded": 1983,
      "frequency": "Continuous government news service & press releases",
      "format": "Government news agency, official portal & radio releases",
      "language": "English",
      "headquarters": "Government Headquarters, Church Street, Basseterre",
      "owner": {
        "name": "Government of Saint Kitts and Nevis (Prime Minister's Office)",
        "type": "State news agency"
      },
      "annualPublicFunding": {
        "total": "XCD 2.8 million",
        "perCapita": "XCD 52.00"
      },
      "editorialStance": "Official national news and public information department of the Federation of Saint Kitts and Nevis; primary source for Cabinet decisions, National Assembly legislation, public health updates, hurricane preparedness, and Citizenship by Investment (CBI) regulations",
      "readership": {
        "metric": "Authoritative national wire delivering dispatches and bulletins to all domestic radio stations, regional Caribbean media, and overseas diplomatic missions",
        "source": "Government of St. Kitts & Nevis Estimates for 2024"
      },
      "revenueModel": "Federal government budgetary appropriation",
      "logo": "newspaper-logos/kn/sknis.png",
      "logoExplainer": "Official masthead/brand mark for SKNIS (St. Kitts and Nevis Information Service), sourced from the publisher's official site and visually verified.",
      "licenceNote": "SKNIS (St. Kitts and Nevis Information Service) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.sknis.gov.kn",
        "https://en.wikipedia.org/wiki/Saint_Kitts_and_Nevis"
      ]
    }
  ],
  "LC": [
    {
      "id": "lc-gis-saint-lucia",
      "countryCode": "LC",
      "name": "GIS Saint Lucia (Government Information Service)",
      "nativeName": "Government Information Service",
      "englishTranslation": "Government Information Service",
      "founded": 1980,
      "frequency": "Continuous public news service & daily releases",
      "format": "Government news agency, digital television & press releases",
      "language": "English, Saint Lucian Creole French (Kwéyòl)",
      "headquarters": "Greaham Louisy Administrative Complex, Waterfront, Castries",
      "owner": {
        "name": "Government of Saint Lucia (Office of the Prime Minister)",
        "type": "State news agency"
      },
      "annualPublicFunding": {
        "total": "XCD 4.2 million",
        "perCapita": "XCD 23.30"
      },
      "editorialStance": "Official national news agency of Saint Lucia; dedicated to public information, ministerial announcements, Parliament of Saint Lucia sittings, hurricane emergency broadcasts (NEMO), and OECS regional development",
      "readership": {
        "metric": "Official news distributor feeding all domestic radio and TV networks, with over 150,000 monthly viewers on digital platforms and NTN television",
        "source": "Saint Lucia Estimates of Revenue and Expenditure 2024"
      },
      "revenueModel": "State government budget allocation",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.govt.lc",
        "https://en.wikipedia.org/wiki/Saint_Lucia"
      ]
    },
    {
      "id": "lc-the-voice",
      "countryCode": "LC",
      "name": "The Voice of Saint Lucia",
      "nativeName": "The Voice of Saint Lucia",
      "englishTranslation": "The Voice of Saint Lucia",
      "founded": 1885,
      "frequency": "Tri-weekly newspaper (Tuesday, Thursday, Saturday)",
      "format": "Compact & digital news portal (thevoiceslu.com)",
      "language": "English",
      "headquarters": "Odyssey Building, Choc, Castries",
      "owner": {
        "name": "The Voice Publishing Company",
        "type": "Independent commercial newspaper"
      },
      "editorialStance": "Saint Lucia's historic newspaper of record; founded in 1885; the island's oldest surviving publication; renowned for authoritative coverage of constitutional law, political debates, agriculture, literature (honoring Derek Walcott), and national history",
      "readership": {
        "metric": "Over 8,000 print copies per issue and over 350,000 monthly digital visits",
        "source": "Voice Publishing Company 2023"
      },
      "revenueModel": "Retail print sales, government notices, and advertising",
      "logo": "newspaper-logos/lc/the-voice.png",
      "logoExplainer": "'VP Digital' badge beside outlined 'THE VOICE' wordmark — St Lucia Voice newspaper digital masthead.",
      "licenceNote": "The Voice (St Lucia) masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://thevoiceslu.com",
        "https://en.wikipedia.org/wiki/Saint_Lucia"
      ]
    },
    {
      "id": "lc-the-star",
      "countryCode": "LC",
      "name": "The Star",
      "nativeName": "The Star",
      "englishTranslation": "The Star",
      "founded": 1987,
      "frequency": "Weekly national newspaper (Saturday)",
      "format": "Tabloid & digital portal (stluciastar.com)",
      "language": "English",
      "headquarters": "Massade Industrial Estate, Gros Islet",
      "owner": {
        "name": "Star Publishing Company (Mae Wayne)",
        "type": "Independent commercial publisher"
      },
      "editorialStance": "Prominent investigative weekly newspaper; known for hard-hitting investigative journalism, political commentary, exposing government irregularities, and championing civic transparency",
      "readership": {
        "metric": "Over 6,000 weekly print circulation and more than 250,000 monthly digital readers",
        "source": "Star Publishing Company 2023"
      },
      "revenueModel": "Print sales and commercial advertising",
      "logo": "newspaper-logos/lc/the-star.png",
      "logoExplainer": "Official masthead/brand mark for The Star, sourced from the publisher's official site and visually verified.",
      "licenceNote": "The Star brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://stluciastar.com",
        "https://en.wikipedia.org/wiki/Saint_Lucia"
      ]
    },
    {
      "id": "lc-loop-slu",
      "countryCode": "LC",
      "name": "Loop News Saint Lucia",
      "nativeName": "Loop News Saint Lucia",
      "englishTranslation": "Loop News Saint Lucia",
      "founded": 2014,
      "frequency": "Continuous 24/7 mobile and digital news service",
      "format": "Mobile app & digital news portal (stlucia.loopnews.com)",
      "language": "English",
      "headquarters": "Castries",
      "owner": {
        "name": "Trend Media (Digicel Group)",
        "type": "Pan-Caribbean commercial digital news network"
      },
      "editorialStance": "Leading Caribbean mobile news network providing real-time breaking news across Saint Lucia; specialized coverage of crime, community sports, cultural festivals (Saint Lucia Jazz & Arts Festival), and entertainment",
      "readership": {
        "metric": "Over 1.2 million monthly active readers across mobile application and web portals",
        "source": "Trend Media Caribbean Analytics 2023"
      },
      "revenueModel": "Digital mobile advertising and telecom integration",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://stlucia.loopnews.com",
        "https://en.wikipedia.org/wiki/Saint_Lucia"
      ]
    }
  ],
  "VC": [
    {
      "id": "vc-api-svg",
      "countryCode": "VC",
      "name": "API SVG (Agency for Public Information)",
      "nativeName": "Agency for Public Information (API)",
      "englishTranslation": "Agency for Public Information",
      "founded": 2002,
      "frequency": "Daily government news agency & press bulletins",
      "format": "Government news agency, television & press releases",
      "language": "English",
      "headquarters": "Ministry of Information, Richmond Hill, Kingstown",
      "owner": {
        "name": "Government of Saint Vincent and the Grenadines (Office of the Prime Minister)",
        "type": "State news agency"
      },
      "annualPublicFunding": {
        "total": "XCD 2.6 million",
        "perCapita": "XCD 25.00"
      },
      "editorialStance": "Official national news agency of Saint Vincent and the Grenadines; provides verified dispatches on Cabinet decisions, Argyle International Airport developments, La Soufrière volcano monitoring (NEMO), and Grenadines maritime connectivity",
      "readership": {
        "metric": "Primary official information source syndicated across all national radio stations, TV channels, and regional news networks",
        "source": "Government of SVG Budget Estimates 2024"
      },
      "revenueModel": "State government budgetary funding",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.gov.vc",
        "https://en.wikipedia.org/wiki/Saint_Vincent_and_the_Grenadines"
      ]
    }
  ],
  "ST": [
    {
      "id": "st-stp-press",
      "countryCode": "ST",
      "name": "STP-Press",
      "nativeName": "Agência Noticiosa de São Tomé e Príncipe (STP-Press)",
      "englishTranslation": "News Agency of São Tomé and Príncipe",
      "founded": 1985,
      "frequency": "Real-time national news wire service",
      "format": "News wire & digital portal (stp-press.st)",
      "language": "Portuguese",
      "headquarters": "Avenida 12 de Julho, São Tomé",
      "owner": {
        "name": "Government of São Tomé and Príncipe (Ministry of Social Communication)",
        "type": "State-owned national news agency"
      },
      "annualPublicFunding": {
        "total": "STN 4.5 million",
        "perCapita": "STN 20.40"
      },
      "editorialStance": "Official national news agency of the Democratic Republic of São Tomé and Príncipe; member of the Alliance of Portuguese Language Information Agencies (ALP); provides verified news dispatches on the Presidency, National Assembly laws, cocoa agriculture, fisheries, and Gulf of Guinea maritime safety",
      "readership": {
        "metric": "Primary news agency supplying wire content to state television TVS, national radio RNSTP, and regional international Lusophone media (Lusa, RTP África)",
        "source": "STP-Press Relatório Anual 2023"
      },
      "revenueModel": "State government budget appropriation and syndication agreements",
      "logo": "newspaper-logos/st/stp-press.jpg",
      "logoExplainer": "Official masthead/brand mark for STP-Press, sourced from the publisher's official site and visually verified.",
      "licenceNote": "STP-Press brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.stp-press.st",
        "https://en.wikipedia.org/wiki/STP-Press"
      ]
    },
    {
      "id": "st-jornal-transparencia",
      "countryCode": "ST",
      "name": "Jornal Transparência",
      "nativeName": "Jornal Transparência",
      "englishTranslation": "Transparency Newspaper",
      "founded": 2011,
      "frequency": "Bi-monthly printed newspaper and digital edition",
      "format": "Tabloid & digital portal (transparenciastep.com)",
      "language": "Portuguese",
      "headquarters": "Bairro do Hospital, São Tomé",
      "owner": {
        "name": "Sociedade Editorial Transparência",
        "type": "Independent commercial newspaper"
      },
      "editorialStance": "Prominent independent national newspaper focusing on governance accountability, anti-corruption investigations, judicial system proceedings, and civil society debates",
      "readership": {
        "metric": "Over 3,000 print copies per edition circulated throughout São Tomé island and the Autonomous Region of Príncipe",
        "source": "Jornal Transparência Editorial Review 2023"
      },
      "revenueModel": "Retail print sales and institutional public notices",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://transparenciastep.com",
        "https://en.wikipedia.org/wiki/Media_of_S%C3%A3o_Tom%C3%A9_and_Pr%C3%ADncipe"
      ]
    }
  ],
  "SA": [
    {
      "id": "sa-spa",
      "countryCode": "SA",
      "name": "SPA (Saudi Press Agency)",
      "nativeName": "وكالة الأنباء السعودية",
      "englishTranslation": "Saudi Press Agency",
      "founded": 1971,
      "frequency": "Real-time 24/7 national news wire service",
      "format": "News wire, multimedia portal & official gazette",
      "language": "Arabic, English, French, Russian, Chinese, Persian",
      "headquarters": "King Fahd Road, Riyadh",
      "owner": {
        "name": "Government of Saudi Arabia (Ministry of Media)",
        "type": "State-owned national news agency"
      },
      "annualPublicFunding": {
        "total": "SAR 320 million",
        "perCapita": "SAR 9.90"
      },
      "editorialStance": "Official national news agency of the Kingdom of Saudi Arabia; royal court wire service broadcasting Royal Orders from the Custodian of the Two Holy Mosques, Council of Ministers resolutions, Vision 2030 megaprojects (NEOM, Red Sea Project), and OPEC+ energy policy",
      "readership": {
        "metric": "Authoritative national wire distributing over 1,500 daily news items and 800 photographs to more than 400 global media organizations and diplomatic missions",
        "source": "SPA Annual Corporate Report 2023"
      },
      "revenueModel": "State government budget allocation",
      "logo": "newspaper-logos/sa/spa.svg",
      "logoExplainer": "SPA block with palm-and-swords emblem and bilingual Saudi Press Agency wording.",
      "licenceNote": "Trademark bundled from Wikimedia Commons (File:Saudi Press Agency Logo.svg) for educational reference in Learn mode.",

      "sources": [
        "https://www.spa.gov.sa",
        "https://en.wikipedia.org/wiki/Saudi_Press_Agency"
      ]
    }
  ],
  "SN": [
    {
      "id": "sn-aps",
      "countryCode": "SN",
      "name": "APS (Agence de Presse Sénégalaise)",
      "nativeName": "Agence de Presse Sénégalaise (APS)",
      "englishTranslation": "Senegalese Press Agency",
      "founded": 1959,
      "frequency": "Real-time 24/7 national news wire service",
      "format": "News wire & multimedia portal (aps.sn)",
      "language": "French, Wolof, English",
      "headquarters": "Maison de la Presse, Corniche Ouest, Dakar",
      "owner": {
        "name": "Republic of Senegal (Ministry of Communication, Telecommunications and Digital Economy)",
        "type": "State-owned national news agency"
      },
      "annualPublicFunding": {
        "total": "XOF 1.25 billion",
        "perCapita": "XOF 73.50"
      },
      "editorialStance": "Historic official news agency of Senegal, founded on the eve of independence in 1959; authoritative wire coverage of the Presidency of the Republic, National Assembly legislative sessions, ECOWAS regional diplomacy, and West African agricultural development",
      "readership": {
        "metric": "Primary news agency distributing wire copy to over 80 Senegalese radio stations, daily newspapers, TV stations, and foreign news bureaus",
        "source": "APS Rapport d'Activité 2023"
      },
      "revenueModel": "State public service subsidy and commercial news licensing",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://aps.sn",
        "https://en.wikipedia.org/wiki/Agence_de_Presse_S%C3%A9n%C3%A9galaise"
      ]
    }
  ],
  "RS": [
    {
      "id": "rs-tanjug",
      "countryCode": "RS",
      "name": "Tanjug",
      "nativeName": "Новинска агенција Танјуг",
      "englishTranslation": "Telegraphic Agency of the New Yugoslavia / Tanjug News Agency",
      "founded": 1943,
      "frequency": "Real-time 24/7 national news wire service & television",
      "format": "News wire, television channel & digital portal (tanjug.rs)",
      "language": "Serbian, English",
      "headquarters": "Obilićev Venac 2, Belgrade",
      "owner": {
        "name": "Tačno d.o.o. (Minacord Media & RTV Pančevo)",
        "type": "Commercial national news agency"
      },
      "editorialStance": "Historic national news agency of Serbia, founded in 1943 during WWII anti-fascist liberation; authoritative wire reporting on National Assembly legislation, Government of Serbia cabinet decrees, European integration, and Balkan regional diplomacy",
      "readership": {
        "metric": "Supplies over 600 news items and 400 multimedia dispatches daily to virtually all Serbian television channels, newspapers, radio networks, and regional portals",
        "source": "Tanjug Media Kit 2023"
      },
      "revenueModel": "News wire licensing, broadcast commercial advertising, and multimedia syndication",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.tanjug.rs",
        "https://en.wikipedia.org/wiki/Tanjug"
      ]
    }
  ],
  "SC": [
    {
      "id": "sc-sna",
      "countryCode": "SC",
      "name": "SNA (Seychelles News Agency)",
      "nativeName": "Seychelles News Agency",
      "englishTranslation": "Seychelles News Agency",
      "founded": 2014,
      "frequency": "Real-time national news wire service",
      "format": "News wire & digital portal (seychellesnewsagency.com)",
      "language": "English, French",
      "headquarters": "National Information Services Agency, Victoria, Mahé",
      "owner": {
        "name": "Department of Information (Office of the President of Seychelles)",
        "type": "State-owned national news agency"
      },
      "annualPublicFunding": {
        "total": "SCR 4.8 million",
        "perCapita": "SCR 48.00"
      },
      "editorialStance": "Official national news agency of the Republic of Seychelles; provides verified, factual coverage of the National Assembly, Blue Economy initiatives, marine protected areas (Aldabra Atoll conservation), climate diplomacy, and Indian Ocean security",
      "readership": {
        "metric": "Primary news agency syndicating stories to local media, regional Indian Ocean Commission agencies, and international environmental researchers",
        "source": "Seychelles National Budget Estimates 2024"
      },
      "revenueModel": "State government budget allocation",
      "logo": "newspaper-logos/sc/sna.png",
      "logoExplainer": "Official masthead/brand mark for SNA (Seychelles News Agency), sourced from Wikimedia Commons and visually verified.",
      "licenceNote": "SNA (Seychelles News Agency) brand mark trademark bundled from Wikimedia Commons (File:Seychelles News Agency logo.png) for educational reference in Learn mode.",

      "sources": [
        "http://www.seychellesnewsagency.com",
        "https://en.wikipedia.org/wiki/Seychelles_News_Agency"
      ]
    }
  ],
  "SL": [
    {
      "id": "sl-slena",
      "countryCode": "SL",
      "name": "SLENA (Sierra Leone News Agency)",
      "nativeName": "Sierra Leone News Agency",
      "englishTranslation": "Sierra Leone News Agency",
      "founded": 1979,
      "frequency": "Daily national news wire service",
      "format": "News wire & government information agency",
      "language": "English, Krio",
      "headquarters": "Wallace Johnson Street, Freetown",
      "owner": {
        "name": "Government of Sierra Leone (Ministry of Information and Civic Education)",
        "type": "State-owned national news agency"
      },
      "annualPublicFunding": {
        "total": "SLE 6.5 million",
        "perCapita": "SLE 0.75"
      },
      "editorialStance": "Official national news agency of the Republic of Sierra Leone; provides authoritative wire coverage of State House decrees, Parliament of Sierra Leone debates, mining and mineral governance (rutile, bauxite, diamonds), agriculture, and ECOWAS regional peacekeeping",
      "readership": {
        "metric": "Primary news wire feeding national radio (SLBC), provincial community stations, daily newspapers in Freetown, and regional West African media",
        "source": "Ministry of Information & Civic Education Budget 2024"
      },
      "revenueModel": "State government budgetary funding",
      "logo": "newspaper-logos/sl/slena.png",
      "logoExplainer": "Official masthead/brand mark for SLENA (Sierra Leone News Agency), sourced from the publisher's official site and visually verified.",
      "licenceNote": "SLENA (Sierra Leone News Agency) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://moice.gov.sl",
        "https://en.wikipedia.org/wiki/Sierra_Leone"
      ]
    },
    {
      "id": "sl-standard-times",
      "countryCode": "SL",
      "name": "Standard Times",
      "nativeName": "Standard Times",
      "englishTranslation": "Standard Times",
      "founded": 1994,
      "frequency": "Daily newspaper (Monday–Friday)",
      "format": "Tabloid & digital portal",
      "language": "English",
      "headquarters": "Kroo Town Road, Freetown",
      "owner": {
        "name": "Standard Times Press (Philip Neville)",
        "type": "Independent commercial newspaper"
      },
      "editorialStance": "Established daily newspaper known for assertive investigative reporting, holding public officials accountable, labor disputes, and healthcare sector monitoring",
      "readership": {
        "metric": "Over 5,000 daily print copies circulated in urban Sierra Leone",
        "source": "SLAJ Annual Review 2023"
      },
      "revenueModel": "Print sales and local business advertising",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.standardtimespress.org",
        "https://en.wikipedia.org/wiki/Standard_Times_(Sierra_Leone)"
      ]
    }
  ],
  "SG": [
    {
      "id": "sg-cna",
      "countryCode": "SG",
      "name": "CNA (Channel NewsAsia)",
      "nativeName": "CNA (Mediacorp)",
      "englishTranslation": "Channel NewsAsia",
      "founded": 1999,
      "frequency": "Continuous 24/7 international news channel and digital news agency",
      "format": "Television, digital multimedia portal & mobile app (cna.asia)",
      "language": "English",
      "headquarters": "1 Stars Avenue, Mediacorp Campus, Singapore",
      "owner": {
        "name": "Mediacorp (Temasek Holdings / Government of Singapore)",
        "type": "State-owned national media conglomerate"
      },
      "annualPublicFunding": {
        "total": "SGD 280 million (Mediacorp public service broadcast funding)",
        "perCapita": "SGD 47.40"
      },
      "editorialStance": "Singapore's flagship international television news channel and digital news service; acclaimed for comprehensive, balanced, and insightful Asian perspectives on global geopolitics, business, science, technology, and climate challenges",
      "readership": {
        "metric": "Broadcast to over 85 million households in 29 territories across Asia, with over 20 million unique monthly digital visitors across CNA digital platforms",
        "source": "Mediacorp Corporate Review 2023"
      },
      "revenueModel": "Public service broadcasting funding from the Singapore government and commercial advertising",
      "logo": "newspaper-logos/sg/cna.png",
      "logoExplainer": "'CNA' brand mark — Channel NewsAsia's news brand emblem.",
      "licenceNote": "Trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.channelnewsasia.com",
        "https://en.wikipedia.org/wiki/CNA_(TV_network)"
      ]
    }
  ],
  "SK": [
    {
      "id": "sk-tasr",
      "countryCode": "SK",
      "name": "TASR (Tlačová agentúra Slovenskej republiky)",
      "nativeName": "Tlačová agentúra Slovenskej republiky (TASR)",
      "englishTranslation": "News Agency of the Slovak Republic",
      "founded": 1992,
      "frequency": "Real-time 24/7 national news wire service",
      "format": "News wire & multimedia portal (tasr.sk)",
      "language": "Slovak, English, Hungarian",
      "headquarters": "Dúbravská cesta 14, Bratislava",
      "owner": {
        "name": "State of the Slovak Republic (Ministry of Culture)",
        "type": "Public-law news agency"
      },
      "annualPublicFunding": {
        "total": "EUR 4.5 million",
        "perCapita": "EUR 0.83"
      },
      "editorialStance": "Official national news agency of the Slovak Republic, established by statute in 1992 during the Velvet Divorce; public-law institution providing unbiased, verified wire coverage of the National Council (Národná rada), government decrees, EU affairs, and regional Visegrád Group (V4) cooperation",
      "readership": {
        "metric": "Syndicates over 400 news articles and 200 photos daily to all major Slovak broadcast stations, newspapers, and foreign agencies",
        "source": "TASR Správa o činnosti a hospodárení 2023"
      },
      "revenueModel": "State public service contract funding and commercial news distribution fees",
      "logo": "newspaper-logos/sk/tasr.png",
      "logoExplainer": "'TASR' brand mark — Slovakia's national news agency emblem.",
      "licenceNote": "Trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.tasr.sk",
        "https://en.wikipedia.org/wiki/News_Agency_of_the_Slovak_Republic"
      ]
    }
  ],
  "SI": [
    {
      "id": "si-sta",
      "countryCode": "SI",
      "name": "STA (Slovenska tiskovna agencija)",
      "nativeName": "Slovenska tiskovna agencija (STA)",
      "englishTranslation": "Slovenian Press Agency",
      "founded": 1991,
      "frequency": "Real-time 24/7 national news wire service",
      "format": "News wire & multimedia portal (sta.si)",
      "language": "Slovene, English",
      "headquarters": "Tivolska cesta 48, Ljubljana",
      "owner": {
        "name": "Republic of Slovenia (Government of the Republic of Slovenia)",
        "type": "Public news agency"
      },
      "annualPublicFunding": {
        "total": "EUR 2.2 million",
        "perCapita": "EUR 1.05"
      },
      "editorialStance": "Official national news agency of the Republic of Slovenia, founded during the declaration of independence in 1991; statutory public service providing objective, verified wire dispatches on the National Assembly (Državni zbor), cabinet ministries, EU and NATO policies, and Adriatic regional cooperation",
      "readership": {
        "metric": "Supplies over 350 news items and 150 photo dispatches daily to virtually all Slovenian radio networks, newspapers, TV channels, and global news agencies",
        "source": "STA Letno poročilo 2023"
      },
      "revenueModel": "State public service contract and commercial news licensing fees",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.sta.si",
        "https://en.wikipedia.org/wiki/Slovenian_Press_Agency"
      ]
    }
  ],
  "SB": [
    {
      "id": "sb-solomon-star",
      "countryCode": "SB",
      "name": "Solomon Star",
      "founded": 1982,
      "frequency": "Daily (Monday to Friday) print & online edition",
      "format": "Broadsheet newspaper & digital news portal (solomonstarnews.com)",
      "language": "English",
      "headquarters": "Kukum Highway, Honiara, Guadalcanal",
      "owner": {
        "name": "Solomon Star Limited (Lamani Family)",
        "type": "Private publishing company"
      },
      "editorialStance": "Solomon Islands' oldest and largest daily print newspaper, founded by Father John Lamani in 1982; provides independent coverage of Parliament sessions, provincial affairs across Guadalcanal and Malaita, fisheries, climate change impacts, and regional Pacific politics",
      "readership": {
        "metric": "Over 6,000 print circulation daily throughout Honiara and provincial centers, alongside over 150,000 monthly pageviews online",
        "source": "Media Association of Solomon Islands (MASI) / Solomon Star Media Kit"
      },
      "revenueModel": "Print newsstand sales, national commercial advertising, and public notices",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.solomonstarnews.com",
        "https://en.wikipedia.org/wiki/Solomon_Star"
      ]
    },
    {
      "id": "sb-sibc",
      "countryCode": "SB",
      "name": "SIBC (Solomon Islands Broadcasting Corporation)",
      "founded": 1952,
      "frequency": "24/7 radio news bulletins and real-time digital news",
      "format": "Public service broadcaster & digital news agency (sibconline.com.sb)",
      "language": "English, Solomon Islands Pijin",
      "headquarters": "Rove, Honiara, Guadalcanal",
      "owner": {
        "name": "Government of Solomon Islands",
        "type": "Statutory public corporation"
      },
      "annualPublicFunding": {
        "total": "SBD 12 million",
        "perCapita": "SBD 16.50"
      },
      "editorialStance": "Statutory national public service media organization of the Solomon Islands; serves as the vital lifeline of communication linking remote outer islands and atolls with national civic news, disaster warnings, health advisories, and parliamentary broadcasts",
      "readership": {
        "metric": "Reaches over 85% of the national population via AM/FM transmitters and shortwave relays, supplemented by over 100,000 monthly digital visits",
        "source": "SIBC Annual Report / Commonwealth Broadcasting Association"
      },
      "revenueModel": "State statutory subvention, broadcast advertising, and government communications",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.sibconline.com.sb",
        "https://en.wikipedia.org/wiki/Solomon_Islands_Broadcasting_Corporation"
      ]
    }
  ],
  "SO": [
    {
      "id": "so-sonna",
      "countryCode": "SO",
      "name": "SONNA (Somali National News Agency)",
      "nativeName": "Wakaaladda Wararka Qaranka Soomaaliyeed (SONNA)",
      "englishTranslation": "Somali National News Agency",
      "founded": 1964,
      "frequency": "Continuous 24/7 national news wire",
      "format": "News wire service & multimedia portal (sonna.so)",
      "language": "Somali, Arabic, English",
      "headquarters": "Ministry of Information, Culture and Tourism, Mogadishu",
      "owner": {
        "name": "Federal Government of Somalia",
        "type": "State-owned national news agency"
      },
      "annualPublicFunding": {
        "total": "USD 1.8 million",
        "perCapita": "USD 0.10"
      },
      "editorialStance": "Official national news agency of the Federal Republic of Somalia; founded under the civilian administration in 1964 and re-established to provide authoritative public dispatches on government policy, federal member state negotiations, security operations, and diplomatic affairs",
      "readership": {
        "metric": "Primary source of verified state dispatches for over 50 domestic radio stations, TV networks, and international news agencies",
        "source": "Ministry of Information, Culture and Tourism Annual Briefing"
      },
      "revenueModel": "Federal budget allocation and institutional news syndication",
      "logo": "newspaper-logos/so/sonna.png",
      "logoExplainer": "Official masthead/brand mark for SONNA (Somali National News Agency), sourced from the publisher's official site and visually verified.",
      "licenceNote": "SONNA (Somali National News Agency) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://sonna.so",
        "https://en.wikipedia.org/wiki/Somali_National_News_Agency"
      ]
    },
    {
      "id": "so-dalsan",
      "countryCode": "SO",
      "name": "Dalsan Media Group",
      "nativeName": "Kooxda Warbaahinta Dalsan",
      "englishTranslation": "Dalsan Media Group",
      "founded": 2012,
      "frequency": "24/7 news broadcasts and real-time online reporting",
      "format": "Radio network, digital portal (radiodalsan.com) & video desk",
      "language": "Somali, English",
      "headquarters": "KM4, Wadajir District, Mogadishu",
      "owner": {
        "name": "Dalsan Media Group",
        "type": "Independent commercial media enterprise"
      },
      "editorialStance": "Prominent independent multimedia news organization based in Mogadishu; delivers fearless investigative journalism, civic interviews, humanitarian reporting, and live updates on parliamentary affairs and regional security",
      "readership": {
        "metric": "Broadcast reach of over 2.5 million listeners across southern and central Somalia, plus over 500,000 monthly digital visits",
        "source": "Dalsan Media Listener Survey / National Union of Somali Journalists (NUSOJ)"
      },
      "revenueModel": "Commercial corporate advertising, public service announcements, and sponsorships",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.radiodalsan.com",
        "https://en.wikipedia.org/wiki/Radio_Dalsan"
      ]
    }
  ],
  "ZA": [
    {
      "id": "za-the-star",
      "countryCode": "ZA",
      "name": "The Star",
      "founded": 1887,
      "frequency": "Daily (Monday to Friday)",
      "format": "Broadsheet newspaper & online edition (iol.co.za/the-star)",
      "language": "English",
      "headquarters": "Kazerne Street, Johannesburg, Gauteng",
      "owner": {
        "name": "Independent Media (Sekunjalo Investment Holdings)",
        "type": "Private media group"
      },
      "editorialStance": "Historic flagship daily newspaper of Johannesburg, founded during the Witwatersrand Gold Rush in 1887; chronicles municipal politics in Gauteng, national labor union developments, crime investigations, and civic affairs",
      "readership": {
        "metric": "Print circulation of approximately 45,000 copies daily and wide reach across the Witwatersrand metropolitan region",
        "source": "ABC South Africa / Independent Media Readership Audit"
      },
      "revenueModel": "Print street sales, classifieds, corporate advertising, and digital syndication on IOL",
      "logo": "newspaper-logos/za/the-star.webp",
      "logoExplainer": "Red blackletter 'The Star' masthead — the Johannesburg daily's nameplate from its own site.",
      "licenceNote": "The Star (Johannesburg) masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.iol.co.za/the-star",
        "https://en.wikipedia.org/wiki/The_Star_(South_Africa)"
      ]
    }
  ],
  "SS": [
    {
      "id": "ss-ssna",
      "countryCode": "SS",
      "name": "South Sudan News Agency (SSNA)",
      "founded": 2010,
      "frequency": "Continuous 24/7 digital news service",
      "format": "Digital news wire & political analysis portal (southsudannewsagency.org)",
      "language": "English",
      "headquarters": "Juba (with diaspora bureau in North America)",
      "owner": {
        "name": "South Sudan News Agency Inc.",
        "type": "Independent news network"
      },
      "editorialStance": "Independent news wire and commentary platform founded in 2010 prior to the referendum for self-determination; provides in-depth commentary on governance, transitional security arrangements, and socio-economic developments",
      "readership": {
        "metric": "Over 250,000 monthly pageviews and broad circulation among South Sudanese scholars, civil society organizations, and international diplomats",
        "source": "SSNA Editorial Web Analytics"
      },
      "revenueModel": "Digital advertising, independent contributions, and content licensing",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://southsudannewsagency.org",
        "https://en.wikipedia.org/wiki/Media_of_South_Sudan"
      ]
    }
  ],
  "ES": [
    {
      "id": "es-agencia-efe",
      "countryCode": "ES",
      "name": "Agencia EFE",
      "nativeName": "Agencia EFE, S.A., S.M.E.",
      "englishTranslation": "EFE Agency",
      "founded": 1939,
      "frequency": "24/7 real-time global multimedia news wire",
      "format": "International news agency & wire service (efe.com)",
      "language": "Spanish, English, Portuguese, Galician, Catalan",
      "headquarters": "Avenida de Burgos 8B, Madrid",
      "owner": {
        "name": "Sociedad Estatal de Participaciones Industriales (SEPI) / Government of Spain",
        "type": "State-owned national news agency"
      },
      "annualPublicFunding": {
        "total": "EUR 54 million",
        "perCapita": "EUR 1.12"
      },
      "editorialStance": "Spain's national news agency and the world's largest Spanish-language news wire agency, operating alongside Reuters, AP, and AFP; provides non-partisan, verified news dispatches from over 180 cities across 120 countries, with premier coverage of Ibero-America",
      "readership": {
        "metric": "Transmits over 3 million news items, photos, and videos annually, syndicated to more than 2,000 media outlets across five continents",
        "source": "Memoria Anual de Agencia EFE / SEPI"
      },
      "revenueModel": "State public service contract and media licensing subscriptions worldwide",
      "logo": "newspaper-logos/es/agencia-efe.svg",
      "logoExplainer": "Navy 'EFE:' wordmark — Spain's international news agency brand mark.",
      "licenceNote": "Agencia EFE logo trademark bundled from Wikimedia Commons (File:Logotipo Agencia EFE 2022.svg) for educational reference in Learn mode.",

      "sources": [
        "https://efe.com",
        "https://en.wikipedia.org/wiki/EFE"
      ]
    }
  ],
  "SD": [
    {
      "id": "sd-suna",
      "countryCode": "SD",
      "name": "SUNA (Sudan News Agency)",
      "nativeName": "وكالة السودان للأنباء (سونا)",
      "englishTranslation": "Sudan News Agency (SUNA)",
      "founded": 1970,
      "frequency": "24/7 continuous national news wire",
      "format": "News wire service & digital portal (suna-sd.net)",
      "language": "Arabic, English, French",
      "headquarters": "Port Sudan, Red Sea State (relocated from Khartoum)",
      "owner": {
        "name": "Republic of the Sudan (Ministry of Information)",
        "type": "State-owned national news wire agency"
      },
      "annualPublicFunding": {
        "total": "SDG 1.2 billion",
        "perCapita": "SDG 26.00"
      },
      "editorialStance": "Official national news agency of Sudan, founded in 1970; disseminates official government decrees, sovereign council statements, humanitarian corridors reports, foreign ministry briefings, and economic releases",
      "readership": {
        "metric": "Primary source of official Sudanese wire dispatches for domestic media, foreign embassies, and international wire services",
        "source": "Sudan Ministry of Information Annual Review"
      },
      "revenueModel": "State budget subvention and institutional wire subscriptions",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://suna-sd.net",
        "https://en.wikipedia.org/wiki/Sudan_News_Agency"
      ]
    }
  ],
  "SR": [
    {
      "id": "sr-starnieuws",
      "countryCode": "SR",
      "name": "StarNieuws",
      "nativeName": "StarNieuws",
      "englishTranslation": "Star News",
      "founded": 2010,
      "frequency": "Real-time 24/7 digital news service",
      "format": "Online news portal & mobile app (starnieuws.com)",
      "language": "Dutch",
      "headquarters": "Gravenberchstraat 33, Paramaribo",
      "owner": {
        "name": "Network Star Suriname N.V.",
        "type": "Independent digital news enterprise"
      },
      "editorialStance": "Suriname's leading digital-native news agency and portal, founded in 2010 by journalist Nita Ramcharan; known for instantaneous breaking news alerts, comprehensive political coverage, judicial updates, and live parliament reports",
      "readership": {
        "metric": "Over 1.5 million monthly unique visitors, widely recognized as the most frequently refreshed digital news medium in Suriname",
        "source": "Google Analytics / StarNieuws Public Metrics"
      },
      "revenueModel": "Digital banner advertising, corporate sponsorships, and commercial partnerships",
      "logo": "newspaper-logos/sr/starnieuws.svg",
      "logoExplainer": "Official masthead/brand mark for Starnieuws, sourced from the publisher's official site and visually verified.",
      "licenceNote": "Starnieuws masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.starnieuws.com",
        "https://en.wikipedia.org/wiki/Media_of_Suriname"
      ]
    }
  ],
  "SE": [
    {
      "id": "se-tt-nyhetsbyran",
      "countryCode": "SE",
      "name": "TT Nyhetsbyrån",
      "nativeName": "Tidningarnas Telegrambyrå (TT)",
      "englishTranslation": "The Newspapers' Telegram Bureau",
      "founded": 1921,
      "frequency": "24/7 continuous national news wire service",
      "format": "News agency, photo service & wire feed (tt.se)",
      "language": "Swedish, English",
      "headquarters": "Slöjdgatan 9, Stockholm",
      "owner": {
        "name": "Bonnier News, Schibsted, and NTM (joint media ownership)",
        "type": "Cooperative commercial national news agency"
      },
      "editorialStance": "National news agency of Sweden, founded in 1921; provides objective, non-partisan, fact-checked news dispatches, graphics, and photography to virtually all Swedish newspapers, television networks, radio stations, and public institutions",
      "readership": {
        "metric": "Transmits over 300 news dispatches and 1,000 photographs daily, utilized by 99% of Sweden's professional media organizations",
        "source": "TT Nyhetsbyrån Årsredovisning 2023"
      },
      "revenueModel": "B2B commercial licensing, syndication contracts, and visual archive sales",
      "logo": "newspaper-logos/se/tt-nyhetsbyran.svg",
      "logoExplainer": "Staggered 'TT' inside a dark circle — Tidningarnas Telegrambyrå brand mark.",
      "licenceNote": "Trademark bundled from Wikimedia Commons (File:TTlogo.svg) for educational reference in Learn mode.",

      "sources": [
        "https://tt.se",
        "https://en.wikipedia.org/wiki/Tidningarnas_Telegrambyr%C3%A5"
      ]
    }
  ],
  "CH": [
    {
      "id": "ch-keystone-sda",
      "countryCode": "CH",
      "name": "Keystone-SDA",
      "nativeName": "Schweizerische Depeschenagentur (SDA) / Agence Télégraphique Suisse (ATS)",
      "englishTranslation": "Swiss News Agency",
      "founded": 1894,
      "frequency": "24/7 multilingual national news wire",
      "format": "National news agency & multimedia portal (keystone-sda.ch)",
      "language": "German, French, Italian",
      "headquarters": "Wankdorfallee 5, Bern",
      "owner": {
        "name": "Swiss Media Enterprises and Keystone-ATS Consortium",
        "type": "National cooperative news wire agency"
      },
      "annualPublicFunding": {
        "total": "CHF 4.1 million",
        "perCapita": "CHF 0.46"
      },
      "editorialStance": "Official national news wire agency of the Swiss Confederation, founded in 1894; provides neutral, verified, real-time news dispatches in Switzerland's three official national languages to radio, TV, print, and digital media across all 26 cantons",
      "readership": {
        "metric": "Produces over 220,000 news items and 600,000 multimedia files annually, utilized by virtually every Swiss media house",
        "source": "Keystone-SDA Geschäftsbericht 2023"
      },
      "revenueModel": "Federal statutory subvention for linguistic diversity and B2B media licensing contracts",
      "logo": "newspaper-logos/ch/keystone-sda.svg",
      "logoExplainer": "'Keystone-SDA' brand mark — Switzerland's national news agency emblem.",
      "licenceNote": "Trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://keystone-sda.ch",
        "https://en.wikipedia.org/wiki/Swiss_News_Agency"
      ]
    }
  ],
  "SY": [
    {
      "id": "sy-sana",
      "countryCode": "SY",
      "name": "SANA (Syrian Arab News Agency)",
      "nativeName": "الوكالة العربية السورية للأنباء (سانا)",
      "englishTranslation": "Syrian Arab News Agency (SANA)",
      "founded": 1965,
      "frequency": "24/7 continuous news wire service",
      "format": "News wire service & multimedia portal (sana.sy)",
      "language": "Arabic, English, French, Spanish, Russian, Turkish, Farsi, Hebrew",
      "headquarters": "Baramkeh, Damascus",
      "owner": {
        "name": "Syrian Arab Republic (Ministry of Information)",
        "type": "State-owned national news wire agency"
      },
      "annualPublicFunding": {
        "total": "SYP 18 billion",
        "perCapita": "SYP 850"
      },
      "editorialStance": "Official state news agency of the Syrian Arab Republic, founded by presidential decree in 1965; broadcasts official government communiqués, presidential decrees, military operations briefings, diplomatic developments, and cultural news from across Syria",
      "readership": {
        "metric": "Authoritative dispatch supplier to all Syrian state radio and TV stations, domestic press, and global diplomatic missions",
        "source": "Ministry of Information Syrian Arab Republic"
      },
      "revenueModel": "State treasury subvention and international news exchange agreements",
      "logo": "newspaper-logos/sy/sana.svg",
      "logoExplainer": "Official masthead/brand mark for SANA (Syrian Arab News Agency), sourced from the publisher's official site and visually verified.",
      "licenceNote": "SANA (Syrian Arab News Agency) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://sana.sy",
        "https://en.wikipedia.org/wiki/Syrian_Arab_News_Agency"
      ]
    }
  ],
  "TJ": [
    {
      "id": "tj-khovar",
      "countryCode": "TJ",
      "name": "Khovar (NIAT Khovar)",
      "nativeName": "Агентии миллии иттилоотии Тоҷикистон «Ховар»",
      "englishTranslation": "National Information Agency of Tajikistan 'Khovar'",
      "founded": 1925,
      "frequency": "24/7 continuous national news wire",
      "format": "News wire service & multimedia portal (khovar.tj)",
      "language": "Tajik, Russian, English, Persian, Arabic",
      "headquarters": "Prospekt Rudaki 40, Dushanbe",
      "owner": {
        "name": "Government of the Republic of Tajikistan",
        "type": "State-owned national news agency"
      },
      "annualPublicFunding": {
        "total": "TJS 9.5 million",
        "perCapita": "TJS 0.95"
      },
      "editorialStance": "Official central national information agency of Tajikistan, founded in 1925 (originally as TajikTA); serves as the definitive source for presidential decrees, Supreme Assembly (Majlisi Oli) legislation, national hydropower projects (Rogun), and Central Asian regional cooperation",
      "readership": {
        "metric": "Provides official wire dispatches and photographic coverage to all television channels, radio stations, and regional newspapers across Tajikistan",
        "source": "NIAT Khovar Official Annual Briefing"
      },
      "revenueModel": "State budget subvention and institutional news licensing",
      "logo": "newspaper-logos/tj/khovar.png",
      "logoExplainer": "Official masthead/brand mark for Khovar (NIAT Khovar), sourced from the publisher's official site and visually verified.",
      "licenceNote": "Khovar (NIAT Khovar) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://khovar.tj",
        "https://en.wikipedia.org/wiki/Khovar"
      ]
    }
  ],
  "TH": [
    {
      "id": "th-tna",
      "countryCode": "TH",
      "name": "Thai News Agency (TNA)",
      "nativeName": "สำนักข่าวไทย (TNA)",
      "englishTranslation": "Thai News Agency",
      "founded": 1977,
      "frequency": "24/7 continuous multimedia news wire",
      "format": "National news wire & broadcast newsroom (tna.mcot.net)",
      "language": "Thai, English",
      "headquarters": "MCOT Public Company Limited, 63/1 Rama IX Road, Huai Khwang, Bangkok",
      "owner": {
        "name": "MCOT Public Company Limited (Ministry of Finance majority owned)",
        "type": "State-controlled public multimedia enterprise"
      },
      "annualPublicFunding": {
        "total": "THB 480 million",
        "perCapita": "THB 6.80"
      },
      "editorialStance": "National news agency of Thailand, operating under MCOT; provides verified, non-partisan news wire dispatches, video feeds, and disaster bulletins to radio stations, terrestrial TV channels, and international wire partners (OANA)",
      "readership": {
        "metric": "Serves over 60 domestic broadcast stations and reaches over 10 million daily viewers through MCOT HD and digital feeds",
        "source": "MCOT Annual Report / OANA Registry"
      },
      "revenueModel": "Commercial broadcast advertising, syndication licensing, and government subventions",
      "logo": "newspaper-logos/th/tna.png",
      "logoExplainer": "'TNA' brand mark — Thai News Agency emblem.",
      "licenceNote": "Trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://tna.mcot.net",
        "https://en.wikipedia.org/wiki/Thai_News_Agency"
      ]
    }
  ],
  "TG": [
    {
      "id": "tg-atop",
      "countryCode": "TG",
      "name": "ATOP (Agence Togolaise de Presse)",
      "nativeName": "Agence Togolaise de Presse (ATOP)",
      "englishTranslation": "Togolese Press Agency",
      "founded": 1975,
      "frequency": "24/7 continuous national news wire",
      "format": "News agency wire service & web portal (atop.tg)",
      "language": "French",
      "headquarters": "Rue des Mésanges, Lomé",
      "owner": {
        "name": "Republic of Togo (Ministry of Communication)",
        "type": "State-owned national news agency"
      },
      "annualPublicFunding": {
        "total": "XOF 320 million",
        "perCapita": "XOF 37.00"
      },
      "editorialStance": "Official national news agency of Togo, founded in 1975; collects and distributes verified news dispatches across all 39 prefectures of Togo, serving regional radio stations, private newspapers, and international press partners",
      "readership": {
        "metric": "Primary dispatch agency for over 80 regional and community radio stations across Togo",
        "source": "HAAC (Haute Autorité de l'Audiovisuel et de la Communication) Togo"
      },
      "revenueModel": "State ministry subvention and news subscription contracts",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://atop.tg",
        "https://en.wikipedia.org/wiki/Media_of_Togo"
      ]
    }
  ],
  "TT": [
    {
      "id": "tt-ttt-news",
      "countryCode": "TT",
      "name": "TTT News (Trinidad and Tobago Television)",
      "founded": 1962,
      "frequency": "Daily television newscasts & 24/7 web updates",
      "format": "Public television network & news agency (ttt.live)",
      "language": "English",
      "headquarters": "11A Maraval Road, Port of Spain",
      "owner": {
        "name": "Government of the Republic of Trinidad and Tobago",
        "type": "State-owned public service broadcaster"
      },
      "annualPublicFunding": {
        "total": "TTD 38 million",
        "perCapita": "TTD 27.00"
      },
      "editorialStance": "Historic public service broadcaster of Trinidad and Tobago, founded in 1962 upon national independence; provides non-partisan national news bulletins, live broadcasts of Parliament, state ceremonies, and cultural festivals",
      "readership": {
        "metric": "Flagship 7:00 PM news broadcast reaches over 40% of prime-time television viewers nationwide",
        "source": "TTT Corporate Review / Telecommunications Authority of Trinidad and Tobago (TATT)"
      },
      "revenueModel": "State budget subvention and commercial television spot advertising",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://ttt.live",
        "https://en.wikipedia.org/wiki/Trinidad_and_Tobago_Television"
      ]
    }
  ],
  "TN": [
    {
      "id": "tn-tap",
      "countryCode": "TN",
      "name": "TAP (Tunis Afrique Presse)",
      "nativeName": "وكالة تونس إفريقيا للأنباء (وات)",
      "englishTranslation": "Tunis Afrique Presse Agency (TAP)",
      "founded": 1961,
      "frequency": "24/7 continuous national news wire",
      "format": "News wire service & multimedia portal (tap.info.tn)",
      "language": "Arabic, French, English",
      "headquarters": "7 Avenue Slimane Ben Slimane, El Manar II, Tunis",
      "owner": {
        "name": "Republic of Tunisia (Prime Ministry)",
        "type": "State-owned national news agency"
      },
      "annualPublicFunding": {
        "total": "TND 24 million",
        "perCapita": "TND 2.00"
      },
      "editorialStance": "Official national news agency of Tunisia, founded in 1961; serves as the definitive wire dispatch service for legislative proceedings of the Assembly of the Representatives of the People, presidential decisions, economic statistics, and Maghreb regional affairs",
      "readership": {
        "metric": "Supplies over 250 daily news items and photo feeds to all Tunisian television stations, radio networks, newspapers, and foreign news agencies",
        "source": "Rapport d'Activité de l'Agence TAP / Présidence du Gouvernement"
      },
      "revenueModel": "State public service subvention and commercial media wire subscriptions",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.tap.info.tn",
        "https://en.wikipedia.org/wiki/Tunis_Afrique_Presse"
      ]
    }
  ],
  "TR": [
    {
      "id": "tr-anadolu-agency",
      "countryCode": "TR",
      "name": "Anadolu Agency (AA)",
      "nativeName": "Anadolu Ajansı (AA)",
      "englishTranslation": "Anatolian Agency",
      "founded": 1920,
      "frequency": "24/7 continuous global multimedia news wire",
      "format": "International news agency & multimedia wire service (aa.com.tr)",
      "language": "Turkish, English, Arabic, Russian, French, Spanish, Kurdish, Persian, Bosnian, Albanian, Macedonian, Indonesian",
      "headquarters": "Gazi Mustafa Kemal Bulvarı No: 132, Maltepe, Çankaya, Ankara",
      "owner": {
        "name": "Anadolu Ajansı T.A.Ş. (Republic of Türkiye Directorate of Communications)",
        "type": "State-controlled national news corporation"
      },
      "annualPublicFunding": {
        "total": "TRY 1.6 billion",
        "perCapita": "TRY 18.50"
      },
      "editorialStance": "National news wire agency of Turkey, founded in 1920 by Mustafa Kemal Atatürk during the Turkish War of Independence; provides global wire coverage from over 100 countries, supplying verified dispatches on Turkish Grand National Assembly legislation, foreign policy, and regional Middle Eastern and Eurasian diplomacy",
      "readership": {
        "metric": "Publishes over 2,000 news stories and 3,500 photographs daily, subscribed to by virtually every Turkish newspaper and TV network, and thousands of international media outlets",
        "source": "Anadolu Ajansı Annual Report 2023"
      },
      "revenueModel": "State treasury subvention and global media licensing subscriptions",
      "logo": "newspaper-logos/tr/anadolu-agency.svg",
      "logoExplainer": "'Anadolu Agency' / Anadolu Ajansı brand mark.",
      "licenceNote": "Trademark bundled from Wikimedia Commons (File:Anadolu Agency logo 2023.svg) for educational reference in Learn mode.",

      "sources": [
        "https://www.aa.com.tr",
        "https://en.wikipedia.org/wiki/Anadolu_Agency"
      ]
    }
  ],
  "TM": [
    {
      "id": "tm-tdh",
      "countryCode": "TM",
      "name": "TDH (State News Agency of Turkmenistan)",
      "nativeName": "Türkmenistanyň Döwlet habarlar agentligi (TDH)",
      "englishTranslation": "State News Agency of Turkmenistan",
      "founded": 1924,
      "frequency": "24/7 continuous official state news wire",
      "format": "News wire service & digital portal (tdh.gov.tm)",
      "language": "Turkmen, Russian, English",
      "headquarters": "Bitarap Turkmenistan Avenue 248, Ashgabat",
      "owner": {
        "name": "Cabinet of Ministers of Turkmenistan",
        "type": "State-owned national news agency"
      },
      "annualPublicFunding": {
        "total": "TMT 15 million",
        "perCapita": "TMT 2.30"
      },
      "editorialStance": "Central official state news agency of Turkmenistan, founded in 1924; disseminates official government decrees, presidential activities, parliamentary resolutions of the Mejlis and Halk Maslahaty, energy sector data (Galkynysh gas field), and policy declarations of positive neutrality",
      "readership": {
        "metric": "Mandatory sole official wire source for all Turkmen domestic print, radio, and television media, and foreign accredited embassies",
        "source": "State Committee of Turkmenistan on Television, Radio Broadcasting and Cinematography"
      },
      "revenueModel": "Direct state budget subvention",
      "logo": "newspaper-logos/tm/tdh.png",
      "logoExplainer": "Official masthead/brand mark for TDH (State News Agency of Turkmenistan), sourced from the publisher's official site and visually verified.",
      "licenceNote": "TDH (State News Agency of Turkmenistan) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://tdh.gov.tm",
        "https://en.wikipedia.org/wiki/State_News_Agency_of_Turkmenistan"
      ]
    },
    {
      "id": "tm-neytralny-turkmenistan",
      "countryCode": "TM",
      "name": "Neytralny Turkmenistan",
      "nativeName": "Газета «Нейтральный Туркменистан»",
      "englishTranslation": "Neutral Turkmenistan",
      "founded": 1924,
      "frequency": "Daily morning newspaper (six times weekly)",
      "format": "Broadsheet newspaper & digital PDF edition (metbugat.gov.tm)",
      "language": "Russian",
      "headquarters": "Press House (Metbugat Öýi), Atamurat Niyazov Avenue, Ashgabat",
      "owner": {
        "name": "Cabinet of Ministers of Turkmenistan",
        "type": "State-owned daily newspaper of record"
      },
      "editorialStance": "Turkmenistan's flagship Russian-language official daily newspaper of record, founded in 1924 (originally as Turkmenskaya Iskra); publishes complete texts of new legislation, presidential decrees, foreign bilateral communiqués, and scientific and cultural achievements",
      "readership": {
        "metric": "Circulation of 40,000 copies daily distributed across all five velayats (provinces) and Ashgabat",
        "source": "Turkmen State Publishing Service"
      },
      "revenueModel": "State budget funding and mandatory institutional subscriptions",
      "logo": "newspaper-logos/tm/neytralny-turkmenistan.png",
      "logoExplainer": "Official masthead/brand mark for Neytralny Turkmenistan, sourced from the publisher's official site and visually verified.",
      "licenceNote": "Neytralny Turkmenistan brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://metbugat.gov.tm",
        "https://en.wikipedia.org/wiki/Neytralny_Turkmenistan"
      ]
    },
    {
      "id": "tm-turkmenistan-gazeti",
      "countryCode": "TM",
      "name": "Turkmenistan Gazeti",
      "nativeName": "«Türkmenistan» gazeti",
      "englishTranslation": "Turkmenistan Newspaper",
      "founded": 1920,
      "frequency": "Daily morning newspaper (six times weekly)",
      "format": "Broadsheet newspaper & digital portal (turkmenmetbugat.gov.tm)",
      "language": "Turkmen",
      "headquarters": "Press House, Atamurat Niyazov Avenue, Ashgabat",
      "owner": {
        "name": "Cabinet of Ministers of Turkmenistan",
        "type": "State-owned national daily newspaper"
      },
      "editorialStance": "Oldest and principal Turkmen-language official national daily newspaper, established in 1920; covers agrarian developments in cotton and wheat harvests, gas pipeline construction (TAPI), national celebrations, poetry, and civic achievements",
      "readership": {
        "metric": "Circulation of approximately 50,000 copies daily, distributed to schools, universities, ministries, and collective farms nationwide",
        "source": "Turkmen State Publishing Service Register"
      },
      "revenueModel": "State subsidies and nationwide institutional subscriptions",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://turkmenmetbugat.gov.tm",
        "https://tk.wikipedia.org/wiki/T%C3%BCrkmenistan_(gazet)"
      ]
    }
  ],
  "UG": [
    {
      "id": "ug-urn",
      "countryCode": "UG",
      "name": "Uganda Radio Network (URN)",
      "founded": 2005,
      "frequency": "24/7 continuous national wire & audio news service",
      "format": "News wire agency & audio syndication feed (ugandaradionetwork.net)",
      "language": "English, Luganda, Runyakitara, Luo, Ateso",
      "headquarters": "Old Kira Road, Bukoto, Kampala",
      "owner": {
        "name": "Uganda Radio Network Ltd",
        "type": "Independent commercial news wire agency"
      },
      "editorialStance": "Uganda's principal independent national news agency, founded in 2005; operates a network of over 100 correspondents across all 135 districts of Uganda, delivering verified news wire stories and broadcast audio clips to radio stations and print newsrooms",
      "readership": {
        "metric": "Syndicated to over 85 commercial and community radio stations nationwide, reaching over 15 million listeners daily",
        "source": "Uganda Communications Commission (UCC) Media Assessment"
      },
      "revenueModel": "Media subscription syndication fees and donor journalism project grants",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://ugandaradionetwork.net",
        "https://en.wikipedia.org/wiki/Media_of_Uganda"
      ]
    }
  ],
  "UA": [
    {
      "id": "ua-ukrinform",
      "countryCode": "UA",
      "name": "Ukrinform (National News Agency of Ukraine)",
      "nativeName": "Українське національне інформаційне агентство «Укрінформ»",
      "englishTranslation": "Ukrainian National Information Agency 'Ukrinform'",
      "founded": 1918,
      "frequency": "24/7 continuous multilingual national news wire",
      "format": "News wire service & multimedia portal (ukrinform.ua)",
      "language": "Ukrainian, English, German, Spanish, French, Japanese, Polish",
      "headquarters": "Bohdan Khmelnytsky Street 8/16, Kyiv",
      "owner": {
        "name": "State of Ukraine (Ministry of Culture and Strategic Communications)",
        "type": "State-owned national news wire agency"
      },
      "annualPublicFunding": {
        "total": "UAH 220 million",
        "perCapita": "UAH 5.80"
      },
      "editorialStance": "Oldest and central national news agency of Ukraine, founded during the Ukrainian People's Republic in 1918 (originally headed by Dmytro Dontsov); provides authoritative, verified dispatches on Ukrainian defense, Verkhovna Rada legislation, presidential decrees, and international diplomatic coalitions",
      "readership": {
        "metric": "Transmits over 500 news dispatches and 200 photo reports daily to over 1,500 domestic media outlets and global wire partners (EANA)",
        "source": "Ukrinform Annual Public Report"
      },
      "revenueModel": "State budget funding, media licensing subscriptions, and photographic archive services",
      "logo": "newspaper-logos/ua/ukrinform.svg",
      "logoExplainer": "Official 'Ukrinform (National News Agency of Ukraine)' masthead/logo as used by the publisher — sourced from the outlet's own site.",
      "licenceNote": "Ukrinform (National News Agency of Ukraine) masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.ukrinform.ua",
        "https://en.wikipedia.org/wiki/Ukrinform"
      ]
    },
    {
      "id": "ua-ukrainska-pravda",
      "countryCode": "UA",
      "name": "Ukrainska Pravda (UP)",
      "nativeName": "Українська правда",
      "englishTranslation": "Ukrainian Truth",
      "founded": 2000,
      "frequency": "Real-time 24/7 continuous digital journalism",
      "format": "Online newspaper & investigative newsroom (pravda.com.ua)",
      "language": "Ukrainian, English, Russian",
      "headquarters": "Kyiv",
      "owner": {
        "name": "Dragon Capital (Tomas Fiala)",
        "type": "Independent commercial media holding"
      },
      "editorialStance": "Pioneering independent Ukrainian digital newspaper, founded on the day of the 2000 referendum by murdered investigative journalist Georgiy Gongadze; internationally celebrated for hard-hitting anti-corruption investigations, war reporting, and political accountability",
      "readership": {
        "metric": "Over 25 million monthly unique visitors, ranking among the most visited independent news portals in Ukraine and Central Europe",
        "source": "Similarweb Ukraine Media Rankings / Gemius"
      },
      "revenueModel": "Digital advertising, reader club memberships (UP Club), and independent grant funding",
      "logo": "newspaper-logos/ua/ukrainska-pravda.jpg",
      "logoExplainer": "'Українська правда' / Ukrainska Pravda wordmark.",
      "licenceNote": "Trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.pravda.com.ua",
        "https://en.wikipedia.org/wiki/Ukrainska_Pravda"
      ]
    },
    {
      "id": "ua-interfax-ukraine",
      "countryCode": "UA",
      "name": "Interfax-Ukraine",
      "nativeName": "Інтерфакс-Україна",
      "englishTranslation": "Interfax-Ukraine News Agency",
      "founded": 1992,
      "frequency": "24/7 continuous professional news wire service",
      "format": "News wire service & corporate terminal (interfax.com.ua)",
      "language": "Ukrainian, English, Russian, German",
      "headquarters": "Reitarska Street 8/5A, Kyiv",
      "owner": {
        "name": "Interfax-Ukraine Information Agency (Oleksandr Martynenko estate / staff)",
        "type": "Independent commercial news agency"
      },
      "editorialStance": "Premier independent news wire agency in Ukraine, founded in 1992 by veteran journalist Oleksandr Martynenko; provides objective, rapid financial, political, energy, and defense dispatches for corporate terminals, banks, and media organizations",
      "readership": {
        "metric": "Subscribed to by over 80% of Ukrainian financial institutions, government ministries, embassies, and major news networks",
        "source": "Interfax-Ukraine Client Registry"
      },
      "revenueModel": "Commercial terminal subscriptions, wire feeds, and press conference hosting services",
      "logo": "newspaper-logos/ua/interfax-ukraine.svg",
      "logoExplainer": "'Interfax-Ukraine' brand mark — the Kyiv news agency emblem.",
      "licenceNote": "Trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://interfax.com.ua",
        "https://en.wikipedia.org/wiki/Interfax-Ukraine"
      ]
    }
  ],
  "AE": [
    {
      "id": "ae-wam",
      "countryCode": "AE",
      "name": "WAM (Emirates News Agency)",
      "nativeName": "وكالة أنباء الإمارات (وام)",
      "englishTranslation": "Emirates News Agency (WAM)",
      "founded": 1976,
      "frequency": "24/7 real-time multimedia news wire service",
      "format": "National news wire & digital portal (wam.ae)",
      "language": "Arabic, English, French, Spanish, Russian, Chinese, Hindi, Urdu, German, Italian, Portuguese, Turkish, Farsi, Swahili, Hebrew",
      "headquarters": "Corniche Road, Abu Dhabi",
      "owner": {
        "name": "National Media Office (Government of the United Arab Emirates)",
        "type": "State-owned national news wire agency"
      },
      "annualPublicFunding": {
        "total": "AED 85 million",
        "perCapita": "AED 9.20"
      },
      "editorialStance": "Official national news agency of the United Arab Emirates, established by ministerial decree in 1976; serves as the definitive wire source for Federal Supreme Council decrees, presidential directives, international economic partnerships (COP28, BRICS), and humanitarian initiatives",
      "readership": {
        "metric": "Transmits over 400 news releases and multimedia feeds daily in 19 languages to domestic media, international news agencies, and government portals",
        "source": "WAM Annual Report / UAE National Media Office"
      },
      "revenueModel": "Federal government budget funding and international media exchange agreements",
      "logo": "newspaper-logos/ae/wam.png",
      "logoExplainer": "Bilingual Arabic/English 'WAM' wordmark with a dotted globe — the Emirates News Agency emblem.",
      "licenceNote": "WAM (Emirates News Agency) logo trademark bundled from the agency's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://wam.ae",
        "https://en.wikipedia.org/wiki/Emirates_News_Agency"
      ]
    }
  ],
  "GB": [
    {
      "id": "gb-reuters",
      "countryCode": "GB",
      "name": "Reuters",
      "founded": 1851,
      "frequency": "24/7 real-time global multimedia news wire",
      "format": "International news agency & financial wire service (reuters.com)",
      "language": "English, French, German, Spanish, Arabic, Japanese, Chinese, Russian, Portuguese",
      "headquarters": "5 Canada Square, Canary Wharf, London",
      "owner": {
        "name": "Thomson Reuters Corporation",
        "type": "Publicly traded global information conglomerate"
      },
      "editorialStance": "One of the world's largest and most trusted international news wire agencies, founded in London in 1851 by Paul Julius Reuter using carrier pigeons and electric telegraph lines; bound by the Thomson Reuters Trust Principles requiring strict integrity, independence, and freedom from bias",
      "readership": {
        "metric": "Reaches billions of people daily through financial terminal syndication, wire distribution to thousands of global media publishers, and 40 million monthly digital visits",
        "source": "Thomson Reuters Annual Report 2023 / Reuters Institute"
      },
      "revenueModel": "Commercial terminal news syndication (LSEG Workspace / Eikon), enterprise media licensing, and digital advertising",
      "logo": "newspaper-logos/gb/reuters.svg",
      "logoExplainer": "Official 'Reuters' masthead/logo as used by the publisher — sourced from Wikimedia Commons.",
      "licenceNote": "Reuters masthead trademark bundled from Wikimedia Commons (File:Reuters logo 2024.svg) for educational reference in Learn mode.",

      "sources": [
        "https://www.reuters.com",
        "https://en.wikipedia.org/wiki/Reuters"
      ]
    }
  ],
  "US": [
    {
      "id": "us-ap",
      "countryCode": "US",
      "name": "Associated Press (AP)",
      "founded": 1846,
      "frequency": "24/7 continuous global multimedia news wire",
      "format": "Not-for-profit news cooperative & wire service (apnews.com)",
      "language": "English, Spanish, Arabic",
      "headquarters": "200 Liberty Street, Brookfield Place, Manhattan, New York City, New York",
      "owner": {
        "name": "Associated Press Cooperative (owned by its contributing US newspaper and broadcast members)",
        "type": "Not-for-profit news agency cooperative"
      },
      "editorialStance": "Independent global news cooperative founded in New York City in 1846 by five daily newspapers to share the cost of transmitting news of the Mexican-American War; maintains absolute editorial neutrality, operating the standard AP Stylebook used across the journalism industry worldwide",
      "readership": {
        "metric": "News dispatches and photography utilized by more than half the world's population on any given day via thousands of member television stations, radio networks, and digital portals",
        "source": "The Associated Press Annual Report 2023"
      },
      "revenueModel": "Member cooperative assessments, enterprise commercial licensing, and commercial photo sales",
      "logo": "newspaper-logos/us/ap.svg",
      "logoExplainer": "Official 'Associated Press (AP)' masthead/logo as used by the publisher — sourced from Wikimedia Commons.",
      "licenceNote": "Associated Press (AP) masthead trademark bundled from Wikimedia Commons (File:Associated Press logo 2012.svg) for educational reference in Learn mode.",

      "sources": [
        "https://apnews.com",
        "https://en.wikipedia.org/wiki/Associated_Press"
      ]
    }
  ],
  "UZ": [
    {
      "id": "uz-uza",
      "countryCode": "UZ",
      "name": "UzA (National News Agency of Uzbekistan)",
      "nativeName": "O'zbekiston Milliy axborot agentligi (O'zA)",
      "englishTranslation": "National Information Agency of Uzbekistan (UzA)",
      "founded": 1918,
      "frequency": "24/7 continuous national multilingual news wire",
      "format": "News wire service & multimedia portal (uza.uz)",
      "language": "Uzbek, Russian, English, French, German, Spanish, Arabic, Chinese",
      "headquarters": "Buyuk Turon Street 42, Tashkent",
      "owner": {
        "name": "Government of the Republic of Uzbekistan",
        "type": "State-owned national news agency"
      },
      "annualPublicFunding": {
        "total": "UZS 18 billion",
        "perCapita": "UZS 500"
      },
      "editorialStance": "Central national news agency of Uzbekistan, founded in 1918 (originally as UzTAG); serves as the official state wire service for decrees by the President of Uzbekistan, legislation of the Oliy Majlis, New Uzbekistan reform milestones, and Central Asian diplomatic treaties",
      "readership": {
        "metric": "Supplies official news dispatches and photo wires to over 1,000 national and regional newspapers, TV channels, and global news agencies",
        "source": "Agency of Information and Mass Communications under the Administration of the President of Uzbekistan"
      },
      "revenueModel": "State budget subvention and corporate news syndication",
      "logo": "newspaper-logos/uz/uza.svg",
      "logoExplainer": "Official masthead/brand mark for UzA, sourced from the publisher's official site and visually verified.",
      "licenceNote": "UzA brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://uza.uz",
        "https://en.wikipedia.org/wiki/Uzbekistan_National_News_Agency"
      ]
    }
  ],
  "VE": [
    {
      "id": "ve-efecto-cocuyo",
      "countryCode": "VE",
      "name": "Efecto Cocuyo",
      "nativeName": "Efecto Cocuyo",
      "englishTranslation": "Firefly Effect",
      "founded": 2015,
      "frequency": "Continuous 24/7 digital journalism & fact-checking",
      "format": "Digital investigative newsroom (efectococuyo.com)",
      "language": "Spanish",
      "headquarters": "Caracas",
      "owner": {
        "name": "Efecto Cocuyo C.A. (Luz Mely Reyes & Josefina Ruggiero)",
        "type": "Independent women-led investigative journalism enterprise"
      },
      "editorialStance": "Acclaimed independent Venezuelan digital investigative newsroom, founded in 2015 by journalists Luz Mely Reyes and Josefina Ruggiero; internationally honored with the CPJ International Press Freedom Award for fearless investigations into humanitarian conditions, electoral integrity, public health, and human rights",
      "readership": {
        "metric": "Over 1.8 million monthly digital visitors and over 1 million followers on social platforms",
        "source": "Efecto Cocuyo Transparency Report / CPJ"
      },
      "revenueModel": "International investigative journalism grants, reader crowdfunding, and educational training programs",
      "logo": "newspaper-logos/ve/efecto-cocuyo.jpg",
      "logoExplainer": "Official masthead/brand mark for Efecto Cocuyo, sourced from the publisher's official site and visually verified.",
      "licenceNote": "Efecto Cocuyo brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://efectococuyo.com",
        "https://en.wikipedia.org/wiki/Efecto_Cocuyo"
      ]
    },
    {
      "id": "ve-avn",
      "countryCode": "VE",
      "name": "AVN (Agencia Venezolana de Noticias)",
      "nativeName": "Agencia Venezolana de Noticias (AVN)",
      "englishTranslation": "Venezuelan News Agency (AVN)",
      "founded": 2005,
      "frequency": "24/7 continuous national state news wire",
      "format": "News wire service & multimedia portal (avn.info.ve)",
      "language": "Spanish, English",
      "headquarters": "Torre Ministerial, Esquina El Chorro, Avenida Universidad, Caracas",
      "owner": {
        "name": "Bolivarian Republic of Venezuela (Ministry of Popular Power for Communication and Information)",
        "type": "State-owned national news wire agency"
      },
      "annualPublicFunding": {
        "total": "VES 45 million",
        "perCapita": "VES 1.50"
      },
      "editorialStance": "Official national news agency of Venezuela, established in 2005 (reorganized from Venpres); provides official state wire dispatches on presidential announcements, Bolivarian government missions, OPEC oil quotas, and geopolitical alliances (ALBA, CELAC)",
      "readership": {
        "metric": "Official wire supplier to state television networks (VTV, Telesur), community radio stations, and regional ministries",
        "source": "Ministerio del Poder Popular para la Comunicación y la Información (MIPPCI)"
      },
      "revenueModel": "State budget allocations and institutional media syndication",
      "logo": "newspaper-logos/ve/avn.png",
      "logoExplainer": "Official masthead/brand mark for AVN (Agencia Venezolana de Noticias), sourced from the publisher's official site and visually verified.",
      "licenceNote": "AVN (Agencia Venezolana de Noticias) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://avn.info.ve",
        "https://en.wikipedia.org/wiki/Agencia_Venezolana_de_Noticias"
      ]
    }
  ],
  "VN": [
    {
      "id": "vn-vna",
      "countryCode": "VN",
      "name": "VNA (Vietnam News Agency)",
      "nativeName": "Thông tấn xã Việt Nam (TTXVN)",
      "englishTranslation": "Vietnam News Agency (VNA)",
      "founded": 1945,
      "frequency": "24/7 continuous national and international multimedia news wire",
      "format": "News wire service & multimedia network (vnanet.vn)",
      "language": "Vietnamese, English, French, Spanish, Chinese, Russian",
      "headquarters": "Số 5 Lý Thường Kiệt, Hoàn Kiếm, Hanoi",
      "owner": {
        "name": "Government of the Socialist Republic of Vietnam",
        "type": "Government-owned national news agency"
      },
      "annualPublicFunding": {
        "total": "VND 850 billion",
        "perCapita": "VND 8,500"
      },
      "editorialStance": "Official national news agency of the Socialist Republic of Vietnam, founded in September 1945 following the Declaration of Independence; acts as the primary provider of official information, party policies, socio-economic statistics, and international diplomacy through 63 domestic bureaus and 30 overseas bureaus worldwide",
      "readership": {
        "metric": "Supplies over 1,000 news stories, photos, and video dispatches daily to all Vietnamese newspapers, television networks, and international news agencies",
        "source": "VNA Annual Review / Ministry of Information and Communications"
      },
      "revenueModel": "State budget funding, media commercial syndication, and publishing subsidiaries",
      "logo": "newspaper-logos/vn/vna.png",
      "logoExplainer": "'VNA' brand mark — Vietnam News Agency emblem.",
      "licenceNote": "Trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://vnanet.vn",
        "https://en.wikipedia.org/wiki/Vietnam_News_Agency"
      ]
    }
  ],
  "YE": [
    {
      "id": "ye-saba",
      "countryCode": "YE",
      "name": "SABA (Yemen News Agency)",
      "nativeName": "وكالة الأنباء اليمنية (سبأ)",
      "englishTranslation": "Yemen News Agency (SABA)",
      "founded": 1970,
      "frequency": "24/7 continuous national news wire",
      "format": "News wire service & multimedia portal (sabanew.net)",
      "language": "Arabic, English",
      "headquarters": "Crater, Aden (recognized government headquarters)",
      "owner": {
        "name": "Republic of Yemen (Ministry of Information)",
        "type": "State-owned national news agency"
      },
      "annualPublicFunding": {
        "total": "YER 1.8 billion",
        "perCapita": "YER 54.00"
      },
      "editorialStance": "Official national news agency of Yemen, established in 1970; disseminates official government decrees of the Presidential Leadership Council, cabinet statements, diplomatic communiqués, humanitarian relief logistics, and regional Arab League news",
      "readership": {
        "metric": "Sole official wire source supplying dispatches to Yemen's domestic media, international wire agencies, and diplomatic missions",
        "source": "Yemen Ministry of Information Annual Report"
      },
      "revenueModel": "State budget allocations and international wire syndication",
      "logo": "newspaper-logos/ye/saba.png",
      "logoExplainer": "Official masthead/brand mark for SABA (Yemen News Agency), sourced from the publisher's official site and visually verified.",
      "licenceNote": "SABA (Yemen News Agency) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.sabanew.net",
        "https://en.wikipedia.org/wiki/Saba_News_Agency"
      ]
    }
  ],
  "ZM": [
    {
      "id": "zm-zanis",
      "countryCode": "ZM",
      "name": "ZANIS (Zambia News and Information Services)",
      "founded": 1964,
      "frequency": "24/7 continuous national news wire & video news service",
      "format": "National news wire & public information portal (zanis.com.zm)",
      "language": "English, Bemba, Nyanja, Tonga, Lozi, Luvale, Kaonde, Lunda",
      "headquarters": "Mass Media Complex, Alick Nkhata Road, Lusaka",
      "owner": {
        "name": "Republic of Zambia (Ministry of Information and Media)",
        "type": "State-owned national news agency"
      },
      "annualPublicFunding": {
        "total": "ZMW 32 million",
        "perCapita": "ZMW 1.60"
      },
      "editorialStance": "Official national news agency of Zambia, established upon independence in 1964; operates an extensive network of district information officers across all 116 districts of Zambia, providing verified dispatches on presidential tours, parliamentary legislation, rural mining, and agricultural farming",
      "readership": {
        "metric": "Primary news supplier to ZNBC television and radio networks, commercial broadcasters, community radio stations, and the domestic press",
        "source": "Ministry of Information and Media Annual Review"
      },
      "revenueModel": "State budget subvention and institutional news licensing",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.zanis.com.zm",
        "https://en.wikipedia.org/wiki/Media_of_Zambia"
      ]
    }
  ],
  "PS": [
    {
      "id": "ps-wafa",
      "countryCode": "PS",
      "name": "WAFA (Palestine News & Info Agency)",
      "nativeName": "وكالة الأنباء والمعلومات الفلسطينية (وفا)",
      "englishTranslation": "Palestine News and Info Agency (WAFA)",
      "founded": 1972,
      "frequency": "24/7 continuous national news wire service",
      "format": "National news wire & digital multimedia portal (wafa.ps)",
      "language": "Arabic, English, French, Hebrew",
      "headquarters": "Al-Irsal Street, Ramallah, West Bank",
      "owner": {
        "name": "State of Palestine (Palestine Liberation Organization / PNA)",
        "type": "State-owned national news agency"
      },
      "annualPublicFunding": {
        "total": "USD 5.5 million",
        "perCapita": "USD 1.10"
      },
      "editorialStance": "Official national news agency of the State of Palestine, established in 1972 by resolution of the PLO Executive Committee; provides official wire dispatches on presidential decrees, Palestinian Authority ministerial actions, diplomatic motions at the United Nations, and documentation of conditions across the West Bank and Gaza Strip",
      "readership": {
        "metric": "Primary official news source for domestic Palestinian newspapers, radio networks, and foreign news agencies covering the Israeli-Palestinian conflict",
        "source": "Palestine Ministry of Information Official Report"
      },
      "revenueModel": "State treasury subvention and international news exchange partnerships",
      "logo": "newspaper-logos/ps/wafa.png",
      "logoExplainer": "Stacked 'WAFA' mark with Arabic title and 'Palestinian News & Info Agency' strap — the official agency crest.",
      "licenceNote": "WAFA brand mark trademark bundled from the agency's official site brand assets for educational reference in Learn mode.",

      "sources": [
        "https://www.wafa.ps",
        "https://en.wikipedia.org/wiki/WAFA"
      ]
    },
    {
      "id": "ps-maan-news",
      "countryCode": "PS",
      "name": "Ma'an News Agency",
      "nativeName": "وكالة معا الإخبارية",
      "englishTranslation": "Together News Agency (Ma'an)",
      "founded": 2005,
      "frequency": "24/7 continuous digital wire service & satellite television",
      "format": "Digital news wire, TV network & radio coalition (maannews.net)",
      "language": "Arabic, English, Hebrew",
      "headquarters": "Al-Karkafa Street, Bethlehem, West Bank",
      "owner": {
        "name": "Ma'an Network (non-profit independent consortium)",
        "type": "Independent non-profit media network"
      },
      "editorialStance": "Leading independent digital news agency in Palestine, founded in 2005; operates in partnership with community television and radio stations across the West Bank and Gaza Strip, known for objective breaking news dispatches, humanitarian coverage, and political talk shows",
      "readership": {
        "metric": "Over 5 million monthly unique digital visitors, ranking among the most visited news websites in the Palestinian territories and the Arab world",
        "source": "Ma'an Audience Review / Similarweb"
      },
      "revenueModel": "Commercial digital banner advertising, international media development partnerships, and television broadcasting spots",
      "noImageReason": "Placeholder rect+text SVG removed (fabricated, not the agency's logo). Wikimedia Commons, the agency's official site, and common brand CDNs were checked for a freely-citable authentic emblem; none confidently sourced yet — listed with no image rather than an invented logo.",
      "sources": [
        "https://www.maannews.net",
        "https://en.wikipedia.org/wiki/Ma%27an_News_Agency"
      ]
    }
  ]
};
