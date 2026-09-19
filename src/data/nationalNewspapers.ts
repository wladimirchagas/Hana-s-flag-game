import type { Newspaper } from "../types/newspaper";

/**
 * Curated and sourced dataset of top national newspapers for Learn mode.
 */

export const NATIONAL_NEWSPAPERS: Record<string, readonly Newspaper[]> = {
  "AD": [
    {
      "id": "ad-diari-d-andorra",
      "countryCode": "AD",
      "name": "Diari d'Andorra",
      "englishTranslation": "Andorra Daily",
      "founded": 1991,
      "frequency": "Daily (Monday–Sunday)",
      "format": "Tabloid & digital portal",
      "language": "Catalan",
      "headquarters": "Andorra la Vella",
      "owner": {
        "name": "Premsa Andorrana SA",
        "type": "Independent commercial media"
      },
      "editorialStance": "Leading principal daily newspaper of Andorra; local politics, tourism, economy, and Pyrenean affairs",
      "readership": {
        "metric": "Highest-readership daily newspaper in Andorra (~18,000 daily print & digital readers)",
        "source": "Premsa Andorrana Annual Report 2023"
      },
      "revenueModel": "Print retail sales, digital advertising, and commercial announcements",
      "logo": "newspaper-logos/ad/diari-d-andorra.png",
      "logoExplainer": "Navy blue serif title block with yellow accent line, representing the principal newspaper of the Principality of Andorra.",
      "sources": [
        "https://www.diariandorra.ad",
        "https://en.wikipedia.org/wiki/Diari_d%27Andorra"
      ]
    },
    {
      "id": "ad-el-periodic",
      "countryCode": "AD",
      "name": "El Periòdic d'Andorra",
      "englishTranslation": "The Andorra Periodical",
      "founded": 1997,
      "frequency": "Daily newspaper",
      "format": "Tabloid & digital portal",
      "language": "Catalan",
      "headquarters": "Escaldes-Engordany",
      "owner": {
        "name": "Grup Clariana / Prensa Ibérica",
        "type": "Independent commercial media"
      },
      "editorialStance": "Commercial daily newspaper; local news, business, sports, and regional Pyrenean reporting",
      "readership": {
        "metric": "Major daily reach across the 7 parishes of Andorra",
        "source": "El Periòdic Media Kit 2024"
      },
      "revenueModel": "Print circulation and commercial advertising",
      "logo": "newspaper-logos/ad/el-periodic.png",
      "logoExplainer": "Red and navy typography logo reflecting dynamic local news coverage across the Principality.",
      "sources": [
        "https://www.elperiodic.ad",
        "https://en.wikipedia.org/wiki/El_Peri%C3%B2dic_d%27Andorra"
      ]
    },
    {
      "id": "ad-altaveu",
      "countryCode": "AD",
      "name": "Altaveu",
      "englishTranslation": "Loudspeaker / Voice",
      "founded": 2017,
      "frequency": "Continuous digital news",
      "format": "Digital portal & mobile news app",
      "language": "Catalan",
      "headquarters": "Andorra la Vella",
      "owner": {
        "name": "Altaveu Digital SL",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent digital news portal; investigative reporting, social affairs, and community news",
      "readership": {
        "metric": "Over 350,000 monthly page views in the Principality of Andorra",
        "source": "Altaveu Digital Audience Review 2024"
      },
      "revenueModel": "Digital display advertising and local commercial partnerships",
      "logo": "newspaper-logos/ad/altaveu.svg",
      "logoExplainer": "Purple modern sans-serif lowercase typography symbolising fresh independent digital journalism.",
      "sources": [
        "https://www.altaveu.com"
      ]
    },
    {
      "id": "ad-bondia",
      "countryCode": "AD",
      "name": "BonDia",
      "englishTranslation": "Good Day",
      "founded": 2006,
      "frequency": "Daily publication",
      "format": "Free print daily & digital portal",
      "language": "Catalan",
      "headquarters": "Andorra la Vella",
      "owner": {
        "name": "La Veu del Poble SL",
        "type": "Independent commercial media"
      },
      "editorialStance": "Free daily community newspaper; accessible local news, event listings, and lifestyle",
      "readership": {
        "metric": "Widely distributed free daily newspaper across Andorran retail and transport nodes",
        "source": "BonDia Media Kit 2024"
      },
      "revenueModel": "Commercial advertising and sponsored features",
      "logo": "newspaper-logos/ad/bondia.png",
      "logoExplainer": "Sunny orange logo with white script typography, representing friendly morning news delivery.",
      "sources": [
        "https://www.bondia.ad"
      ]
    }
  ],
  "AE": [
    {
      "id": "ae-the-national",
      "countryCode": "AE",
      "name": "The National",
      "founded": 2008,
      "frequency": "Daily morning newspaper & continuous digital service",
      "format": "Broadsheet newspaper & multimedia portal (thenationalnews.com)",
      "language": "English",
      "headquarters": "twofour54, Media Zone Authority, Abu Dhabi",
      "owner": {
        "name": "International Media Investments (IMI)",
        "type": "Private commercial media investment group"
      },
      "editorialStance": "Premier English-language newspaper of record in the UAE and Middle East, founded in 2008 by Martin Newland; renowned for analytical coverage of Gulf geopolitics, OPEC energy markets, sovereign wealth investments (ADIA, Mubadala), arts, and global affairs",
      "readership": {
        "metric": "Over 10 million monthly unique digital visitors worldwide and approximately 40,000 daily print copies distributed across the Emirates and GCC",
        "source": "IMI Annual Performance Review / BPA Worldwide"
      },
      "revenueModel": "Commercial print advertising, corporate sponsorships, and digital programmatic ads",
      "logo": "newspaper-logos/ae/the-national.svg",
      "logoExplainer": "Dark slate background featuring refined white serif typography 'The National', gold divider rule, and golden Middle East perspective subtitle.",
      "sources": [
        "https://www.thenationalnews.com",
        "https://en.wikipedia.org/wiki/The_National_(Abu_Dhabi)"
      ]
    },
    {
      "id": "ae-gulf-news",
      "countryCode": "AE",
      "name": "Gulf News",
      "founded": 1978,
      "frequency": "Daily morning newspaper & 24/7 web edition",
      "format": "Berliner newspaper & news portal (gulfnews.com)",
      "language": "English",
      "headquarters": "Al Nisr Publishing LLC, Sheikh Zayed Road, Dubai",
      "owner": {
        "name": "Al Nisr Publishing LLC",
        "type": "Private commercial publishing company"
      },
      "editorialStance": "Highest-circulation English-language daily newspaper in the UAE, founded in 1978; provides extensive coverage of Dubai economic development, real estate, labor regulations, aviation (Emirates Airline), Indian subcontinent and Arab diaspora affairs",
      "readership": {
        "metric": "Audited circulation of approximately 85,000 copies daily and more than 12 million monthly unique digital readers",
        "source": "BPA Worldwide Circulation Audit / Gulf News Media Pack"
      },
      "revenueModel": "Print newsstand sales, corporate display advertising, classified notices, and digital subscriptions",
      "logo": "newspaper-logos/ae/gulf-news.png",
      "logoExplainer": "Clean white field with navy blue circular roundel containing 'GN', heavy navy sans-serif 'GULF NEWS', and red tagline.",
      "sources": [
        "https://gulfnews.com",
        "https://en.wikipedia.org/wiki/Gulf_News"
      ]
    },
    {
      "id": "ae-al-ittihad",
      "countryCode": "AE",
      "name": "Al Ittihad",
      "nativeName": "جريدة الاتحاد",
      "englishTranslation": "The Union",
      "founded": 1969,
      "frequency": "Daily morning newspaper",
      "format": "Broadsheet newspaper & digital edition (alittihad.ae)",
      "language": "Arabic",
      "headquarters": "Al Saada Street, Abu Dhabi",
      "owner": {
        "name": "Abu Dhabi Media Network (ADMN / Government of Abu Dhabi)",
        "type": "State-owned multimedia enterprise"
      },
      "editorialStance": "Historic first daily newspaper founded in the United Arab Emirates, published in 1969 prior to the federation's independence; serves as the leading Arabic-language newspaper of record, reporting on presidential affairs, GCC diplomacy, and national heritage",
      "readership": {
        "metric": "Over 60,000 print copies daily distributed across all seven emirates and more than 3 million monthly web readers",
        "source": "Abu Dhabi Media Audience Research"
      },
      "revenueModel": "Government notices, corporate commercial advertising, and newsstand distribution",
      "logo": "newspaper-logos/ae/al-ittihad.jpg",
      "logoExplainer": "Deep navy field with magnificent white Arabic calligraphy 'صحيفة الاتحاد', emerald green divider bar, and gold founding year 1969 subtitle.",
      "sources": [
        "https://www.alittihad.ae",
        "https://en.wikipedia.org/wiki/Al_Ittihad_(Emirati_newspaper)"
      ]
    },
    {
      "id": "ae-khaleej-times",
      "countryCode": "AE",
      "name": "Khaleej Times",
      "nativeName": "Khaleej Times",
      "englishTranslation": "Gulf Times",
      "founded": 1978,
      "frequency": "Daily morning newspaper",
      "format": "Broadsheet newspaper & web portal (khaleejtimes.com)",
      "language": "English",
      "headquarters": "Galadari Printing and Publishing, Al Quoz, Dubai",
      "owner": {
        "name": "Galadari Brothers Group (Government of Dubai holds minority stake)",
        "type": "Commercial media publishing enterprise"
      },
      "editorialStance": "First English-language daily newspaper established in the UAE, launched in 1978; widely read among expatriate professionals, business executives, and diplomats, known for breaking crime reports, financial analysis, tech trends, and South Asian regional coverage",
      "readership": {
        "metric": "Print circulation of approximately 65,000 daily copies and over 14 million monthly unique visitors online",
        "source": "BPA Worldwide / Khaleej Times Media Kit"
      },
      "revenueModel": "Print advertising, classified notices, digital banner advertising, and sponsored events",
      "logo": "newspaper-logos/ae/khaleej-times.png",
      "logoExplainer": "White field with bold crimson red impact title 'KHALEEJ TIMES', horizontal black rule, and dark grey heritage subtitle.",
      "sources": [
        "https://www.khaleejtimes.com",
        "https://en.wikipedia.org/wiki/Khaleej_Times"
      ]
    }
  ],
  "AF": [
    {
      "id": "af-tolonews",
      "countryCode": "AF",
      "name": "TOLOnews",
      "founded": 2010,
      "frequency": "Continuous 24/7 news reporting",
      "format": "24-hour news network & digital portal",
      "language": "Dari, Pashto, English",
      "headquarters": "Kabul",
      "owner": {
        "name": "Moby Media Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Commercial news network; continuous breaking news, current affairs, and political interviews",
      "readership": {
        "metric": "Over 5 million regular TV viewers and digital followers nationwide",
        "source": "Moby Media Group Impact Review 2023"
      },
      "revenueModel": "Commercial advertising, digital display ads, and international content syndication",
      "logo": "newspaper-logos/af/tolonews.svg",
      "logoExplainer": "Bold geometric red arrow logo symbolising forward motion, breaking news, and 24-hour broadcast coverage across Afghanistan.",
      "sources": [
        "https://tolonews.com",
        "https://en.wikipedia.org/wiki/TOLOnews"
      ]
    },
    {
      "id": "af-hasht-e-subh",
      "countryCode": "AF",
      "name": "Hasht-e Subh",
      "englishTranslation": "8am Daily",
      "founded": 2007,
      "frequency": "Daily publication",
      "format": "Print daily & digital portal",
      "language": "Dari, English",
      "headquarters": "Kabul",
      "owner": {
        "name": "8am Media Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent reformist newspaper; civil rights, investigative reporting, and public policy",
      "readership": {
        "metric": "Prominent daily print distribution and widely read digital edition across the diaspora",
        "source": "Hasht-e Subh Publishing House"
      },
      "revenueModel": "Print sales, digital subscriptions, and commercial advertising",
      "logo": "newspaper-logos/af/hasht-e-subh.png",
      "logoExplainer": "Emerald green emblem with the Arabic numeral 8 ('۸') representing dawn, truth, and morning journalism.",
      "sources": [
        "https://8am.media",
        "https://en.wikipedia.org/wiki/Hasht-e_Subh"
      ]
    }
  ],
  "AG": [
    {
      "id": "ag-antigua-observer",
      "countryCode": "AG",
      "name": "Antigua Observer",
      "founded": 1993,
      "frequency": "Daily digital publication",
      "format": "Daily morning broadsheet & digital portal (antiguaobserver.com)",
      "language": "English",
      "headquarters": "St. John's",
      "owner": {
        "name": "News Media Ltd",
        "type": "Independent commercial media"
      },
      "editorialStance": "Premier independent daily newspaper of Antigua and Barbuda, founded by Samuel Derrick; national politics, Barbuda council news, and West Indies cricket",
      "readership": {
        "metric": "Primary news source in Antigua and Barbuda with over 200,000 monthly digital visits",
        "source": "Observer Media Group Impact Review 2023"
      },
      "revenueModel": "Digital display advertising, commercial radio ads, and sponsored features",
      "logo": "newspaper-logos/ag/antigua-observer.png",
      "logoExplainer": "Distinctive circular emblem and golden sunburst icon of the Antigua Observer, symbolising island vigilance and press freedom.",
      "sources": [
        "https://antiguaobserver.com",
        "https://en.wikipedia.org/wiki/Antigua_Observer"
      ]
    },
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
      "logoExplainer": "Bold black and red modern logo 'Pointe Xpress', representing the daily digital and print newspaper in St. John's.",
      "sources": [
        "https://pointville.ag"
      ]
    }
  ],
  "AL": [
    {
      "id": "al-gazeta-shqiptare",
      "countryCode": "AL",
      "name": "Gazeta Shqiptare",
      "englishTranslation": "Albanian Newspaper",
      "founded": 1927,
      "frequency": "Daily newspaper",
      "format": "Print daily & digital portal",
      "language": "Albanian",
      "headquarters": "Tirana",
      "owner": {
        "name": "Focus Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic daily newspaper; public affairs, culture, and social reporting",
      "readership": {
        "metric": "Established readership among intellectuals, public servants, and civil society",
        "source": "Albanian Media Institute Review 2023"
      },
      "revenueModel": "Print retail sales and commercial display advertising",
      "logo": "newspaper-logos/al/gazeta-shqiptare.svg",
      "logoExplainer": "Classic black serif typography with a red accent line representing historic Albanian print journalism.",
      "sources": [
        "https://www.balkanweb.com",
        "https://en.wikipedia.org/wiki/Gazeta_Shqiptare"
      ]
    },
    {
      "id": "al-koha-jone",
      "countryCode": "AL",
      "name": "Koha Jonë",
      "englishTranslation": "Our Time",
      "founded": 1991,
      "frequency": "Daily newspaper",
      "format": "Tabloid & digital portal",
      "language": "Albanian",
      "headquarters": "Tirana",
      "owner": {
        "name": "Nikoll Lesi Media",
        "type": "Independent commercial media"
      },
      "editorialStance": "Pioneer post-communist independent daily; political commentary and breaking news",
      "readership": {
        "metric": "Historic pioneer of independent media in post-1990 Albania",
        "source": "Albanian Media Institute"
      },
      "revenueModel": "Print sales and advertising",
      "logo": "newspaper-logos/al/koha-jone.svg",
      "logoExplainer": "Vibrant red block typography symbolizing post-1990 free press and energetic daily reporting.",
      "sources": [
        "https://www.kohajone.com",
        "https://en.wikipedia.org/wiki/Koha_Jon%C3%AB"
      ]
    },
    {
      "id": "al-shekulli",
      "countryCode": "AL",
      "name": "Shekulli",
      "englishTranslation": "The Century",
      "founded": 1997,
      "frequency": "Daily publication",
      "format": "Compact daily & digital portal",
      "language": "Albanian",
      "headquarters": "Tirana",
      "owner": {
        "name": "SPEKTER Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Center-left commercial daily; investigative reporting and political analysis",
      "readership": {
        "metric": "National reach in print and online across urban hubs",
        "source": "Media Ownership Monitor Albania"
      },
      "revenueModel": "Print sales and digital advertising",
      "logo": "newspaper-logos/al/shekulli.svg",
      "logoExplainer": "Sky blue serif title typography representing 21st-century modern Albanian press.",
      "sources": [
        "https://shekulli.com.al",
        "https://en.wikipedia.org/wiki/Shekulli"
      ]
    }
  ],
  "AM": [
    {
      "id": "am-hetq",
      "countryCode": "AM",
      "name": "Hetq",
      "englishTranslation": "Trace",
      "founded": 2001,
      "frequency": "Continuous online publishing",
      "format": "Investigative e-journal & multimedia portal",
      "language": "Armenian, English",
      "headquarters": "Yerevan",
      "owner": {
        "name": "Investigative Journalists NGO",
        "type": "Independent trust / foundation"
      },
      "editorialStance": "Independent non-profit investigative journalism; anti-corruption, environment, and human rights (GIJN member)",
      "readership": {
        "metric": "Premier investigative journalism outlet in Armenia, widely cited by international media",
        "source": "Global Investigative Journalism Network (GIJN)"
      },
      "revenueModel": "Philanthropic grants, non-profit foundations, and reader donations",
      "logo": "newspaper-logos/am/hetq.svg",
      "logoExplainer": "Forest green badge with white Armenian typography 'ՀԵՏՔ', representing independent investigative integrity.",
      "sources": [
        "https://hetq.am",
        "https://en.wikipedia.org/wiki/Hetq"
      ]
    }
  ],
  "AO": [
    {
      "id": "ao-jornal-de-angola",
      "countryCode": "AO",
      "name": "Jornal de Angola",
      "englishTranslation": "Angola Newspaper",
      "founded": 1923,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "Portuguese",
      "headquarters": "Luanda",
      "owner": {
        "name": "Edições Novembro EP",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "National public daily newspaper; official state notices, public policy, and national affairs",
      "readership": {
        "metric": "Largest print circulation daily in Angola (~40,000 daily print copies nationwide)",
        "source": "Edições Novembro EP Annual Report 2023"
      },
      "revenueModel": "State subsidy, print retail sales, and official government advertising",
      "logo": "newspaper-logos/ao/jornal-de-angola.png",
      "logoExplainer": "Classic red serif title typography on white, representing the historic national daily paper of Angola.",
      "sources": [
        "https://www.jornaldeangola.ao",
        "https://en.wikipedia.org/wiki/Jornal_de_Angola"
      ]
    },
    {
      "id": "ao-o-pais",
      "countryCode": "AO",
      "name": "O País",
      "englishTranslation": "The Country",
      "founded": 2008,
      "frequency": "Weekly newspaper",
      "format": "Tabloid & digital portal",
      "language": "Portuguese",
      "headquarters": "Luanda",
      "owner": {
        "name": "Grupo Media Nova",
        "type": "Independent commercial media"
      },
      "editorialStance": "Commercial weekly newspaper; business, political commentary, and social issues",
      "readership": {
        "metric": "Leading commercial weekly publication in Luanda and major provincial capitals",
        "source": "Media Nova Group Review 2023"
      },
      "revenueModel": "Print sales and commercial advertising",
      "logo": "newspaper-logos/ao/o-pais.jpg",
      "logoExplainer": "Bold crimson block typography 'O PAÍS' symbolising dynamic commercial reporting.",
      "sources": [
        "https://opais.ao",
        "https://pt.wikipedia.org/wiki/O_Pa%C3%ADs_(Angola)"
      ]
    },
    {
      "id": "ao-novo-jornal",
      "countryCode": "AO",
      "name": "Novo Jornal",
      "englishTranslation": "New Newspaper",
      "founded": 2008,
      "frequency": "Weekly newspaper",
      "format": "Tabloid & digital portal",
      "language": "Portuguese",
      "headquarters": "Luanda",
      "owner": {
        "name": "ZAP Media / Nova Vaga",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent commercial weekly; investigative journalism and political analysis",
      "readership": {
        "metric": "Highly influential among urban professionals and civil society in Angola",
        "source": "Novo Jornal Media Kit 2024"
      },
      "revenueModel": "Print sales and digital display advertising",
      "logo": "newspaper-logos/ao/novo-jornal.png",
      "logoExplainer": "Cyan blue title logo representing modern independent print journalism in Angola.",
      "sources": [
        "https://novojornal.co.ao",
        "https://pt.wikipedia.org/wiki/Novo_Jornal"
      ]
    }
  ],
  "AR": [
    {
      "id": "ar-clarin",
      "countryCode": "AR",
      "name": "Clarín",
      "founded": 1945,
      "frequency": "Daily (Monday–Sunday)",
      "format": "Tabloid & digital portal",
      "language": "Spanish",
      "headquarters": "Buenos Aires",
      "owner": {
        "name": "Grupo Clarín S.A.",
        "type": "Commercial conglomerate"
      },
      "editorialStance": "Center-right commercial daily; largest circulation daily newspaper in Argentina",
      "readership": {
        "metric": "Over 7.5 million monthly digital subscribers and readers; highest print circulation in South America",
        "source": "Instituto Verificador de Circulaciones (IVC) Argentina 2023"
      },
      "revenueModel": "Digital subscriptions, print sales, display advertising, and media syndication",
      "logo": "newspaper-logos/ar/clarin.svg",
      "logoExplainer": "Iconic red serif title logo 'Clarín', recognized across Latin America as Argentina's flagship daily.",
      "sources": [
        "https://www.clarin.com",
        "https://en.wikipedia.org/wiki/Clar%C3%ADn_(Argentine_newspaper)"
      ]
    },
    {
      "id": "ar-la-nacion",
      "countryCode": "AR",
      "name": "La Nación",
      "englishTranslation": "The Nation",
      "founded": 1870,
      "frequency": "Daily (Monday–Sunday)",
      "format": "Broadsheet & digital portal",
      "language": "Spanish",
      "headquarters": "Buenos Aires",
      "owner": {
        "name": "SA La Nación",
        "type": "Independent commercial media"
      },
      "editorialStance": "Conservative quality daily; founded by former President Bartolomé Mitre; business, politics, and culture",
      "readership": {
        "metric": "Historic paper of record in Argentina; over 5 million monthly digital readers",
        "source": "IVC Argentina / Comscore 2023"
      },
      "revenueModel": "Digital paywall subscriptions, print sales, and corporate advertising",
      "logo": "newspaper-logos/ar/la-nacion.svg",
      "logoExplainer": "Classic black serif title logo 'LA NACION', symbolizing 150+ years of Argentine journalism.",
      "sources": [
        "https://www.lanacion.com.ar",
        "https://en.wikipedia.org/wiki/La_Naci%C3%B3n"
      ]
    },
    {
      "id": "ar-pagina-12",
      "countryCode": "AR",
      "name": "Página/12",
      "englishTranslation": "Page 12",
      "founded": 1987,
      "frequency": "Daily (Monday–Sunday)",
      "format": "Compact & digital portal",
      "language": "Spanish",
      "headquarters": "Buenos Aires",
      "owner": {
        "name": "Grupo Octubre",
        "type": "Independent commercial media"
      },
      "editorialStance": "Center-left progressive daily; human rights, investigative journalism, and labor affairs",
      "readership": {
        "metric": "Leading progressive newspaper in Argentina with strong academic and union readership",
        "source": "IVC Argentina 2023"
      },
      "revenueModel": "Print sales, digital subscriptions, and institutional advertising",
      "logo": "newspaper-logos/ar/pagina-12.svg",
      "logoExplainer": "Modern blue and white title logo 'Página/12', representing post-dictatorship progressive press freedom.",
      "sources": [
        "https://www.pagina12.com.ar",
        "https://en.wikipedia.org/wiki/P%C3%A1gina/12"
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
      "logoExplainer": "Emerald green title logo representing financial journalism and economic markets.",
      "sources": [
        "https://www.cronista.com",
        "https://es.wikipedia.org/wiki/El_Cronista_(n%C3%BAmero_comercial)"
      ]
    }
  ],
  "AT": [
    {
      "id": "at-kronen-zeitung",
      "countryCode": "AT",
      "name": "Kronen Zeitung",
      "englishTranslation": "Crown Newspaper",
      "founded": 1900,
      "frequency": "Daily (Monday–Sunday)",
      "format": "Tabloid & digital portal",
      "language": "German",
      "headquarters": "Vienna",
      "owner": {
        "name": "Dichand Family & Funke Mediengruppe",
        "type": "Independent commercial media"
      },
      "editorialStance": "Populist commercial daily; highest circulation newspaper in Austria per capita",
      "readership": {
        "metric": "Over 2.1 million daily readers (~25% of Austria's population); highest per-capita print reach in Europe",
        "source": "Media-Analyse Austria 2023/2024"
      },
      "revenueModel": "Print retail sales, digital subscriptions, and commercial advertising",
      "logo": "newspaper-logos/at/kronen-zeitung.svg",
      "logoExplainer": "Red banner featuring traditional Fraktur script typography 'Kronen Zeitung', iconic across Austrian print history.",
      "sources": [
        "https://www.krone.at",
        "https://en.wikipedia.org/wiki/Kronen_Zeitung"
      ]
    },
    {
      "id": "at-die-presse",
      "countryCode": "AT",
      "name": "Die Presse",
      "englishTranslation": "The Press",
      "founded": 1848,
      "frequency": "Daily (Monday–Sunday)",
      "format": "Broadsheet & digital portal",
      "language": "German",
      "headquarters": "Vienna",
      "owner": {
        "name": "Styria Media Group AG",
        "type": "Independent commercial media"
      },
      "editorialStance": "Bourgeois-liberal quality daily newspaper; founded during the 1848 revolutions; economics and law",
      "readership": {
        "metric": "Over 350,000 daily readers; leading paper of record for Austria's business and legal sectors",
        "source": "Media-Analyse Austria 2023/2024"
      },
      "revenueModel": "Digital paywall subscriptions, print sales, and corporate advertising",
      "logo": "newspaper-logos/at/die-presse.svg",
      "logoExplainer": "Classic serif title logo 'Die Presse' with subtitle 'SEIT 1848 UNABHÄNGIG', reflecting 175+ years of liberal press tradition.",
      "sources": [
        "https://www.diepresse.com",
        "https://en.wikipedia.org/wiki/Die_Presse"
      ]
    },
    {
      "id": "at-kurier",
      "countryCode": "AT",
      "name": "Kurier",
      "englishTranslation": "Courier",
      "founded": 1954,
      "frequency": "Daily (Monday–Sunday)",
      "format": "Tabloid/Compact & digital portal",
      "language": "German",
      "headquarters": "Vienna",
      "owner": {
        "name": "Funke Mediengruppe & Raiffeisen Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Centrist commercial daily; major national reporting, investigative journalism, and domestic news",
      "readership": {
        "metric": "Over 480,000 daily print & digital readers across Austria",
        "source": "Media-Analyse Austria 2023/2024"
      },
      "revenueModel": "Print newsstand sales, digital subscriptions, and commercial advertising",
      "logo": "newspaper-logos/at/kurier.svg",
      "logoExplainer": "Bold blue sans-serif title logo 'KURIER', symbolizing modern Austrian mainstream daily journalism.",
      "sources": [
        "https://kurier.at",
        "https://en.wikipedia.org/wiki/Kurier"
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
      "logoExplainer": "Salmon-pink rectangular logo with bold sans-serif text 'DER STANDARD', matching the newspaper's signature pink print pages.",
      "sources": [
        "https://www.derstandard.at",
        "https://en.wikipedia.org/wiki/Der_Standard"
      ]
    }
  ],
  "AU": [
    {
      "id": "au-smh",
      "countryCode": "AU",
      "name": "The Sydney Morning Herald",
      "officialName": "The Sydney Morning Herald",
      "founded": 1831,
      "frequency": "Daily compact edition (Monday–Sunday)",
      "format": "Compact print & digital news portal (smh.com.au)",
      "language": "English",
      "headquarters": "Sydney, New South Wales",
      "owner": {
        "name": "Nine Entertainment",
        "type": "Publicly traded commercial media company"
      },
      "editorialStance": "Centrist quality journalism; comprehensive federal politics, international analysis, culture, business, and investigative reporting",
      "readership": {
        "metric": "Over 7.5 million monthly cross-platform readers nationwide",
        "source": "Roy Morgan / Total News Readership 2024"
      },
      "revenueModel": "Digital subscriptions, print copy sales, and commercial advertising",
      "logo": "newspaper-logos/au/sydney-morning-herald.svg",
      "logoExplainer": "Historic masthead featuring classical serif typography and the traditional heraldic Australian coat of arms emblem.",
      "sources": [
        "https://www.smh.com.au",
        "https://en.wikipedia.org/wiki/The_Sydney_Morning_Herald"
      ]
    },
    {
      "id": "au-the-australian",
      "countryCode": "AU",
      "name": "The Australian",
      "officialName": "The Australian",
      "founded": 1964,
      "frequency": "Daily national broadsheet (Monday–Saturday)",
      "format": "National broadsheet & digital news portal (theaustralian.com.au)",
      "language": "English",
      "headquarters": "Sydney, New South Wales",
      "owner": {
        "name": "News Corp Australia",
        "type": "Commercial media conglomerate"
      },
      "editorialStance": "Center-right national broadsheet; national affairs, economics, federal politics, and public policy debate",
      "readership": {
        "metric": "Over 4.2 million monthly cross-platform readers nationwide",
        "source": "Roy Morgan / Total News Readership 2024"
      },
      "revenueModel": "Digital subscriptions, print sales, and national advertising",
      "logo": "newspaper-logos/au/the-australian.svg",
      "logoExplainer": "Clean modern uppercase masthead in deep navy blue symbolising national authority and broadsheet heritage.",
      "sources": [
        "https://www.theaustralian.com.au",
        "https://en.wikipedia.org/wiki/The_Australian"
      ]
    },
    {
      "id": "au-the-age",
      "countryCode": "AU",
      "name": "The Age",
      "officialName": "The Age",
      "founded": 1854,
      "frequency": "Daily compact edition (Monday–Sunday)",
      "format": "Compact print & digital news portal (theage.com.au)",
      "language": "English",
      "headquarters": "Melbourne, Victoria",
      "owner": {
        "name": "Nine Entertainment",
        "type": "Publicly traded commercial media company"
      },
      "editorialStance": "Progressive-leaning quality broadsheet; Victorian and federal politics, culture, social affairs, and investigative reporting",
      "readership": {
        "metric": "Over 4.8 million monthly cross-platform readers nationwide",
        "source": "Roy Morgan / Total News Readership 2024"
      },
      "revenueModel": "Print sales, digital subscriptions, and display advertising",
      "logo": "newspaper-logos/au/the-age.svg",
      "logoExplainer": "Traditional Gothic blackletter masthead with royal arms motif, representing Melbourne's oldest continuous newspaper title.",
      "sources": [
        "https://www.theage.com.au",
        "https://en.wikipedia.org/wiki/The_Age"
      ]
    },
    {
      "id": "au-afr",
      "countryCode": "AU",
      "name": "The Australian Financial Review",
      "officialName": "The Australian Financial Review",
      "founded": 1951,
      "frequency": "Daily business broadsheet (Monday–Friday) & Weekend AFR",
      "format": "Compact financial print & premium digital portal (afr.com)",
      "language": "English",
      "headquarters": "Sydney, New South Wales",
      "owner": {
        "name": "Nine Entertainment",
        "type": "Publicly traded commercial media company"
      },
      "editorialStance": "Pro-market economic commentary, corporate finance, market intelligence, fiscal policy, and institutional analysis",
      "readership": {
        "metric": "Over 3.6 million monthly business, executive, and financial readers",
        "source": "Roy Morgan / Total News Readership 2024"
      },
      "revenueModel": "Premium digital subscriptions, print sales, and corporate advertising",
      "logo": "newspaper-logos/au/australian-financial-review.svg",
      "logoExplainer": "Distinctive blue and red serif masthead with the iconic AFR acronym embodying Australian financial journalism.",
      "sources": [
        "https://www.afr.com",
        "https://en.wikipedia.org/wiki/The_Australian_Financial_Review"
      ]
    },
    {
      "id": "au-herald-sun",
      "countryCode": "AU",
      "name": "Herald Sun",
      "officialName": "Herald Sun",
      "founded": 1990,
      "frequency": "Daily morning tabloid (Monday–Sunday)",
      "format": "Tabloid print & digital portal (heraldsun.com.au)",
      "language": "English",
      "headquarters": "Melbourne, Victoria",
      "owner": {
        "name": "News Corp Australia",
        "type": "Commercial media conglomerate"
      },
      "editorialStance": "Populist centre-right tabloid; breaking news, Victorian politics, sports coverage, and community advocacy",
      "readership": {
        "metric": "Highest-circulation daily print newspaper in Australia, over 4 million monthly cross-platform readers",
        "source": "Roy Morgan / Total News Readership 2024"
      },
      "revenueModel": "Print newsstand sales, digital subscriptions, and classified advertising",
      "logo": "newspaper-logos/au/herald-sun.svg",
      "logoExplainer": "Bold red and black block masthead reflecting Victoria's mass-circulation morning daily tabloid.",
      "sources": [
        "https://www.heraldsun.com.au",
        "https://en.wikipedia.org/wiki/Herald_Sun"
      ]
    }
  ],
  "AZ": [
    {
      "id": "az-yeni-musavat",
      "countryCode": "AZ",
      "name": "Yeni Müsavat",
      "englishTranslation": "Newspaper 525",
      "founded": 1989,
      "frequency": "Daily morning broadsheet",
      "format": "Broadsheet & digital portal (musavat.com)",
      "language": "Azerbaijani",
      "headquarters": "Baku",
      "owner": {
        "name": "Yeni Müsavat Media Group",
        "type": "Independent commercial publisher"
      },
      "editorialStance": "Leading independent Azerbaijani daily newspaper of record; political analysis, Karabakh reconstruction, and Caspian energy",
      "readership": {
        "metric": "Premier print daily circulation in Azerbaijan (~15,000 daily copies) and over 2 million monthly digital unique visits",
        "source": "Yeni Müsavat Media Report 2023"
      },
      "revenueModel": "Print newsstand sales, digital advertising, and corporate subscriptions",
      "logo": "newspaper-logos/az/yeni-musavat.png",
      "logoExplainer": "Stylized dark blue and cyan italic wordmark 'Yeni Müsavat' with distinctive national flame motif accent.",
      "sources": [
        "https://musavat.com",
        "https://en.wikipedia.org/wiki/Yeni_M%C3%BCsavat"
      ]
    }
  ],
  "BA": [
    {
      "id": "ba-oslobodjenje",
      "countryCode": "BA",
      "name": "Oslobođenje",
      "englishTranslation": "Liberation",
      "founded": 1943,
      "frequency": "Daily (Monday–Sunday)",
      "format": "Broadsheet & digital portal",
      "language": "Bosnian",
      "headquarters": "Sarajevo",
      "owner": {
        "name": "Oslobođenje d.o.o. (MIMS Group)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic anti-fascist daily newspaper; secular, multi-ethnic, quality journalism; Sakharov Prize laureate 1993",
      "readership": {
        "metric": "Historic paper of record; widely respected across Bosnia and South-Eastern Europe",
        "source": "Oslobođenje Publishing House 2023"
      },
      "revenueModel": "Print sales, display advertising, and digital subscriptions",
      "logo": "newspaper-logos/ba/oslobodjenje.svg",
      "logoExplainer": "Classic red serif title logo 'Oslobođenje', symbolising historic wartime free press courage.",
      "sources": [
        "https://www.oslobodjenje.ba",
        "https://en.wikipedia.org/wiki/Oslobo%C4%91enje"
      ]
    },
    {
      "id": "ba-dnevni-avaz",
      "countryCode": "BA",
      "name": "Dnevni avaz",
      "englishTranslation": "Daily Voice",
      "founded": 1995,
      "frequency": "Daily (Monday–Sunday)",
      "format": "Tabloid & digital portal",
      "language": "Bosnian",
      "headquarters": "Sarajevo",
      "owner": {
        "name": "Avaz-roto press",
        "type": "Independent commercial media"
      },
      "editorialStance": "Highest circulation daily newspaper in Bosnia and Herzegovina; breaking news, politics, and populism",
      "readership": {
        "metric": "Highest print circulation daily in Bosnia and Herzegovina (~30,000 daily print, 4M monthly web visitors)",
        "source": "ABC Central & Eastern Europe 2023"
      },
      "revenueModel": "Print sales, digital display advertising, and commercial classifieds",
      "logo": "newspaper-logos/ba/dnevni-avaz.png",
      "logoExplainer": "Slate black logo block with bright blue and white text 'DNEVNI AVAZ', iconic in Bosnian daily print.",
      "sources": [
        "https://avaz.ba",
        "https://en.wikipedia.org/wiki/Dnevni_avaz"
      ]
    }
  ],
  "BB": [
    {
      "id": "bb-barbados-today",
      "countryCode": "BB",
      "name": "Barbados Today",
      "founded": 2010,
      "frequency": "Daily digital publication",
      "format": "Digital multimedia portal & e-paper",
      "language": "English",
      "headquarters": "Lodge Hill, St. Michael",
      "owner": {
        "name": "Barbados Today Inc",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent digital newspaper; multimedia news reporting, video interviews, and current affairs",
      "readership": {
        "metric": "Over 500,000 monthly digital visits across mobile and web platforms",
        "source": "Barbados Today Media Review 2024"
      },
      "revenueModel": "Digital display advertising, video pre-rolls, and corporate sponsorships",
      "logo": "newspaper-logos/bb/barbados-today.png",
      "logoExplainer": "Cyan blue title banner with white and yellow text 'BARBADOS TODAY', representing modern digital island news.",
      "sources": [
        "https://barbadostoday.bb"
      ]
    },
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
      "logo": "newspaper-logos/bb/nation-news.png",
      "logoExplainer": "Bold red title typography 'NATION NEWS' on white, representing Barbados's primary daily newspaper.",
      "sources": [
        "https://www.nationnews.com",
        "https://en.wikipedia.org/wiki/The_Nation_(Barbados)"
      ]
    }
  ],
  "BD": [
    {
      "id": "bd-prothom-alo",
      "countryCode": "BD",
      "name": "Prothom Alo",
      "englishTranslation": "First Light",
      "founded": 1998,
      "frequency": "Daily (Monday–Sunday)",
      "format": "Broadsheet & digital portal",
      "language": "Bengali",
      "headquarters": "Dhaka",
      "owner": {
        "name": "Transcom Group (Mediastar Ltd)",
        "type": "Commercial conglomerate"
      },
      "editorialStance": "Independent Bengali quality daily; largest newspaper in Bangladesh; investigative journalism and culture",
      "readership": {
        "metric": "Highest print circulation and online reach in Bangladesh (~500,000 daily print, 15M monthly web visitors)",
        "source": "Department of Film and Publications (DFP) Bangladesh 2023"
      },
      "revenueModel": "Print sales, digital display advertising, and e-paper subscriptions",
      "logo": "newspaper-logos/bd/prothom-alo.jpg",
      "logoExplainer": "Red Bengali script title logo 'প্রথম আলো', symbolising morning enlightenment and national news leadership.",
      "sources": [
        "https://www.prothomalo.com",
        "https://en.wikipedia.org/wiki/Prothom_Alo"
      ]
    },
    {
      "id": "bd-ittefaq",
      "countryCode": "BD",
      "name": "The Daily Ittefaq",
      "englishTranslation": "Unity",
      "founded": 1953,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "Bengali",
      "headquarters": "Dhaka",
      "owner": {
        "name": "Ittefaq Group of Publications",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic Bengali daily newspaper; played a pivotal role in the 1971 Bangladesh Liberation Movement",
      "readership": {
        "metric": "Oldest continuously published Bengali daily newspaper in Bangladesh",
        "source": "DFP Bangladesh 2023"
      },
      "revenueModel": "Print circulation and commercial advertising",
      "logo": "newspaper-logos/bd/ittefaq.svg",
      "logoExplainer": "Emerald green title block with white Bengali calligraphy 'ইত্তেফাক', reflecting liberation era journalism heritage.",
      "sources": [
        "https://www.ittefaq.com.bd",
        "https://en.wikipedia.org/wiki/The_Daily_Ittefaq"
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
      "logoExplainer": "Deep blue serif title font 'The Daily Star', recognized worldwide as Bangladesh's primary English newspaper.",
      "sources": [
        "https://www.thedailystar.net",
        "https://en.wikipedia.org/wiki/The_Daily_Star_(Bangladesh)"
      ]
    }
  ],
  "BE": [
    {
      "id": "be-le-soir",
      "countryCode": "BE",
      "name": "Le Soir",
      "englishTranslation": "The Evening",
      "founded": 1887,
      "frequency": "Daily (Monday–Saturday)",
      "format": "Broadsheet & digital portal",
      "language": "French",
      "headquarters": "Brussels",
      "owner": {
        "name": "Groupe Rossel",
        "type": "Commercial conglomerate"
      },
      "editorialStance": "Independent quality francophone daily; progressive-liberal stance, Belgian federal politics, and European affairs",
      "readership": {
        "metric": "Leading francophone newspaper in Belgium (~60,000 daily print, 2.5M monthly digital visitors)",
        "source": "CIM (Centre d'Information sur les Média) Belgium 2023"
      },
      "revenueModel": "Digital paywall subscriptions, print sales, and commercial advertising",
      "logo": "newspaper-logos/be/le-soir.svg",
      "logoExplainer": "Classic serif title logo 'LE SOIR' on white, representing Belgian francophone press leadership.",
      "sources": [
        "https://www.lesoir.be",
        "https://en.wikipedia.org/wiki/Le_Soir"
      ]
    },
    {
      "id": "be-hln",
      "countryCode": "BE",
      "name": "Het Laatste Nieuws",
      "englishTranslation": "The Latest News (HLN)",
      "founded": 1888,
      "frequency": "Daily (Monday–Sunday)",
      "format": "Tabloid & digital portal",
      "language": "Dutch",
      "headquarters": "Antwerp",
      "owner": {
        "name": "DPG Media",
        "type": "Commercial conglomerate"
      },
      "editorialStance": "Popular commercial Flemish daily; highest circulation newspaper in Belgium; breaking news, regional news, and sports",
      "readership": {
        "metric": "Highest total reach in Belgium (~240,000 daily print copies, 2M daily digital visitors on HLN.be)",
        "source": "CIM Belgium 2023/2024"
      },
      "revenueModel": "Print retail sales, digital display advertising, and subscriptions",
      "logo": "newspaper-logos/be/hln.png",
      "logoExplainer": "Vibrant red title logo with white text 'HLN', iconic across Flanders as the highest-circulation news brand.",
      "sources": [
        "https://www.hln.be",
        "https://en.wikipedia.org/wiki/Het_Laatste_Nieuws"
      ]
    },
    {
      "id": "be-la-libre",
      "countryCode": "BE",
      "name": "La Libre Belgique",
      "englishTranslation": "Free Belgium",
      "founded": 1884,
      "frequency": "Daily (Monday–Sunday)",
      "format": "Broadsheet & digital portal",
      "language": "French",
      "headquarters": "Brussels",
      "owner": {
        "name": "IPM Group",
        "type": "Commercial conglomerate"
      },
      "editorialStance": "Center-right Christian-democrat quality paper; historic resistance press heritage; politics, economics, and international news",
      "readership": {
        "metric": "Over 40,000 daily print copies and 1.2M monthly digital readers in Wallonia and Brussels",
        "source": "CIM Belgium 2023"
      },
      "revenueModel": "Digital paywall subscriptions and print sales",
      "logo": "newspaper-logos/be/la-libre.svg",
      "logoExplainer": "Classic serif title logo 'La Libre Belgique' with gold accent, symbolising 140+ years of Belgian francophone journalism.",
      "sources": [
        "https://www.lalibre.be",
        "https://en.wikipedia.org/wiki/La_Libre_Belgique"
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
      "logo": "newspaper-logos/be/de-standaard.png",
      "logoExplainer": "Royal blue title banner with bold white text 'DE STANDAARD', symbolising quality Flemish journalism.",
      "sources": [
        "https://www.standaard.be",
        "https://en.wikipedia.org/wiki/De_Standaard"
      ]
    }
  ],
  "BF": [
    {
      "id": "bf-sidwaya",
      "countryCode": "BF",
      "name": "Sidwaya",
      "englishTranslation": "The Truth Has Come",
      "founded": 1984,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "French",
      "headquarters": "Ouagadougou",
      "owner": {
        "name": "Éditions Sidwaya",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official national public daily newspaper; state affairs, public policy, and national unity",
      "readership": {
        "metric": "Largest print circulation daily in Burkina Faso (~8,000 daily print copies)",
        "source": "Éditions Sidwaya Annual Report 2023"
      },
      "revenueModel": "State subsidy, print sales, and official government advertising",
      "logo": "newspaper-logos/bf/sidwaya.png",
      "logoExplainer": "Red title banner with gold text 'SIDWAYA', representing Burkina Faso's official public daily newspaper.",
      "sources": [
        "https://www.sidwaya.info",
        "https://fr.wikipedia.org/wiki/Sidwaya"
      ]
    },
    {
      "id": "bf-le-pays",
      "countryCode": "BF",
      "name": "Le Pays",
      "englishTranslation": "The Country",
      "founded": 1991,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "French",
      "headquarters": "Ouagadougou",
      "owner": {
        "name": "Editions Le Pays",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent commercial daily newspaper; investigative stories, political analysis, and social news",
      "readership": {
        "metric": "Major daily circulation in Ouagadougou and Bobo-Dioulasso",
        "source": "Le Pays Media Kit 2024"
      },
      "revenueModel": "Print newsstand sales and private advertising",
      "logo": "newspaper-logos/bf/le-pays.svg",
      "logoExplainer": "Dark blue title banner 'LE PAYS' in bold white block typography.",
      "sources": [
        "https://lepays.bf",
        "https://fr.wikipedia.org/wiki/Le_Pays_(Burkina_Faso)"
      ]
    },
    {
      "id": "bf-levenement",
      "countryCode": "BF",
      "name": "L'Événement",
      "englishTranslation": "The Event",
      "founded": 2001,
      "frequency": "Bi-monthly publication",
      "format": "Investigative e-journal & print",
      "language": "French",
      "headquarters": "Ouagadougou",
      "owner": {
        "name": "Événement Media",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent investigative journal; anti-corruption, governance, and human rights focus",
      "readership": {
        "metric": "Leading investigative bi-monthly publication in Burkina Faso",
        "source": "L'Événement Archive"
      },
      "revenueModel": "Print sales and digital subscriptions",
      "logo": "newspaper-logos/bf/levenement.png",
      "logoExplainer": "Dark slate badge with sky blue font 'L'ÉVÉNEMENT', representing investigative journalism.",
      "sources": [
        "https://www.evenement-bf.net"
      ]
    }
  ],
  "BG": [
    {
      "id": "bg-24-chasa",
      "countryCode": "BG",
      "name": "24 Chasa",
      "englishTranslation": "24 Hours",
      "founded": 1991,
      "frequency": "Daily newspaper",
      "format": "Tabloid & digital portal",
      "language": "Bulgarian",
      "headquarters": "Sofia",
      "owner": {
        "name": "Media Group Bulgaria",
        "type": "Independent commercial media"
      },
      "editorialStance": "Popular commercial daily newspaper; national politics, crime, social affairs, and opinion",
      "readership": {
        "metric": "Highest print circulation commercial daily in Bulgaria (~35,000 daily print copies)",
        "source": "Media Group Bulgaria Review 2023"
      },
      "revenueModel": "Print sales, display advertising, and digital subscriptions",
      "logo": "newspaper-logos/bg/24-chasa.svg",
      "logoExplainer": "Crimson rectangular title banner with bold white text '24 ЧАСА', iconic in Bulgarian print press.",
      "sources": [
        "https://www.24chasa.bg",
        "https://en.wikipedia.org/wiki/24_Chasa"
      ]
    },
    {
      "id": "bg-trud",
      "countryCode": "BG",
      "name": "Trud",
      "englishTranslation": "Labor",
      "founded": 1936,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "Bulgarian",
      "headquarters": "Sofia",
      "owner": {
        "name": "Trud Media",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic daily newspaper; conservative-nationalist stance, domestic politics, and culture",
      "readership": {
        "metric": "One of Bulgaria's oldest continuously published daily newspapers",
        "source": "Trud Media Kit 2023"
      },
      "revenueModel": "Print sales and commercial display advertising",
      "logo": "newspaper-logos/bg/trud.png",
      "logoExplainer": "Classic black serif Cyrillic title font 'ТРУД' on white canvas.",
      "sources": [
        "https://trud.bg",
        "https://en.wikipedia.org/wiki/Trud_(Bulgarian_newspaper)"
      ]
    },
    {
      "id": "bg-dnevnik",
      "countryCode": "BG",
      "name": "Dnevnik",
      "englishTranslation": "Daily Journal",
      "founded": 2001,
      "frequency": "Continuous digital news",
      "format": "Digital quality portal & e-journal",
      "language": "Bulgarian",
      "headquarters": "Sofia",
      "owner": {
        "name": "Economedia AD",
        "type": "Independent commercial media"
      },
      "editorialStance": "Pro-European liberal quality news portal; investigative reporting, rule of law, and EU affairs",
      "readership": {
        "metric": "Leading quality online daily in Bulgaria (over 2 million monthly digital visitors)",
        "source": "Gemius Bulgaria 2024"
      },
      "revenueModel": "Digital subscriptions, display advertising, and e-paper subscriptions",
      "logo": "newspaper-logos/bg/dnevnik.png",
      "logoExplainer": "Dark slate badge with sky blue text 'ДНЕВНИК', symbolising modern European digital journalism.",
      "sources": [
        "https://www.dnevnik.bg",
        "https://en.wikipedia.org/wiki/Dnevnik_(Bulgarian_newspaper)"
      ]
    },
    {
      "id": "bg-capital",
      "countryCode": "BG",
      "name": "Capital",
      "founded": 1993,
      "frequency": "Weekly (Friday)",
      "format": "Broadsheet & digital business portal",
      "language": "Bulgarian",
      "headquarters": "Sofia",
      "owner": {
        "name": "Economedia AD",
        "type": "Independent commercial media"
      },
      "editorialStance": "Premier financial and economic weekly in Bulgaria; corporate business, markets, and policy analysis",
      "readership": {
        "metric": "Leading weekly paper read by Bulgarian business executives, economists, and legal sector",
        "source": "Economedia AD Review 2023"
      },
      "revenueModel": "Corporate paywall subscriptions, print sales, and financial advertising",
      "logo": "newspaper-logos/bg/capital.svg",
      "logoExplainer": "Forest green title banner 'CAPITAL' in bold serif typography, symbolising economic press leadership.",
      "sources": [
        "https://www.capital.bg",
        "https://en.wikipedia.org/wiki/Capital_(Bulgarian_newspaper)"
      ]
    }
  ],
  "BH": [
    {
      "id": "bh-al-ayam",
      "countryCode": "BH",
      "name": "Al Ayam",
      "englishTranslation": "The Days",
      "founded": 1989,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "Arabic",
      "headquarters": "Manama",
      "owner": {
        "name": "Al Ayam Publishing",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent commercial Arabic daily; reformist stance, public affairs, and cultural news",
      "readership": {
        "metric": "One of Bahrain's highest circulation Arabic dailies (~35,000 daily print & digital copies)",
        "source": "Al Ayam Publishing Review 2023"
      },
      "revenueModel": "Print sales, subscriptions, and commercial advertising",
      "logo": "newspaper-logos/bh/al-ayam.svg",
      "logoExplainer": "Sky blue title banner with white Arabic calligraphic typography 'الأيام'.",
      "sources": [
        "https://www.alayam.com",
        "https://en.wikipedia.org/wiki/Al_Ayam_(Bahrain)"
      ]
    },
    {
      "id": "bh-akhbar-al-khaleej",
      "countryCode": "BH",
      "name": "Akhbar Al Khaleej",
      "englishTranslation": "Gulf News",
      "founded": 1976,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "Arabic",
      "headquarters": "Manama",
      "owner": {
        "name": "Al Hilal Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic Arabic daily newspaper; pro-government, regional Arab affairs, and community news",
      "readership": {
        "metric": "First daily newspaper published in Bahrain (est. 1976); established readership base",
        "source": "Al Hilal Publishing"
      },
      "revenueModel": "Print circulation and commercial advertising",
      "logo": "newspaper-logos/bh/akhbar-al-khaleej.png",
      "logoExplainer": "Deep red title block with Arabic calligraphy 'أخبار الخليج', symbolizing historic Gulf journalism.",
      "sources": [
        "https://www.akhbar-alkhaleej.com",
        "https://en.wikipedia.org/wiki/Akhbar_Al_Khaleej"
      ]
    },
    {
      "id": "bh-daily-tribune",
      "countryCode": "BH",
      "name": "The Daily Tribune",
      "officialName": "DT News / The Daily Tribune",
      "founded": 1997,
      "frequency": "Daily newspaper",
      "format": "Tabloid & digital portal",
      "language": "English",
      "headquarters": "Manama",
      "owner": {
        "name": "VAR Media",
        "type": "Independent commercial media"
      },
      "editorialStance": "English-language daily newspaper; local news, expatriate community, business, and sports",
      "readership": {
        "metric": "Leading English daily read by expatriate professionals and diplomatic sector in Bahrain",
        "source": "The Daily Tribune Media Kit 2024"
      },
      "revenueModel": "Print sales, digital display ads, and corporate sponsorships",
      "logo": "newspaper-logos/bh/daily-tribune.svg",
      "logoExplainer": "Slate blue title banner with white serif text 'THE DAILY TRIBUNE' and red subtitle.",
      "sources": [
        "https://www.newsofbahrain.com",
        "https://en.wikipedia.org/wiki/The_Daily_Tribune_(Bahrain)"
      ]
    }
  ],
  "BI": [
    {
      "id": "bi-jimbere",
      "countryCode": "BI",
      "name": "Jimbere",
      "englishTranslation": "Move Forward",
      "founded": 2015,
      "frequency": "Monthly magazine & digital portal",
      "format": "Print magazine & digital portal",
      "language": "French, Kirundi",
      "headquarters": "Bujumbura",
      "owner": {
        "name": "Jimbere Media",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent youth magazine; culture, entrepreneurship, gender equality, and social issues",
      "readership": {
        "metric": "Popular youth and cultural publication across Burundi",
        "source": "Jimbere Media Kit 2024"
      },
      "revenueModel": "Print sales and corporate sponsorships",
      "logo": "newspaper-logos/bi/jimbere.png",
      "logoExplainer": "Purple modern title font 'JIMBERE', representing youth empowerment and social progress.",
      "sources": [
        "https://www.jimbere-mag.org"
      ]
    }
  ],
  "BJ": [
    {
      "id": "bj-la-nation",
      "countryCode": "BJ",
      "name": "La Nation",
      "englishTranslation": "The Nation",
      "founded": 1990,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "French",
      "headquarters": "Cotonou",
      "owner": {
        "name": "Office National d'Imprimerie et de Presse (ONIP)",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official national public daily newspaper; public policy, legislative notices, and state affairs",
      "readership": {
        "metric": "Largest print circulation daily in Benin (~10,000 daily print copies)",
        "source": "ONIP Benin Annual Report 2023"
      },
      "revenueModel": "State subsidy, print sales, and official government advertising",
      "logo": "newspaper-logos/bj/la-nation.webp",
      "logoExplainer": "Green serif title typography 'LA NATION' on white, symbolising the official public daily of Benin.",
      "sources": [
        "https://lanation.bj",
        "https://fr.wikipedia.org/wiki/La_Nation_(B%C3%A9nin)"
      ]
    },
    {
      "id": "bj-fraternite",
      "countryCode": "BJ",
      "name": "Fraternité",
      "englishTranslation": "Fraternity",
      "founded": 1999,
      "frequency": "Daily newspaper",
      "format": "Tabloid & digital portal",
      "language": "French",
      "headquarters": "Cotonou",
      "owner": {
        "name": "Fraternité Media",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent daily paper; public policy debates, social affairs, and cultural coverage",
      "readership": {
        "metric": "Established daily print circulation in Beninese urban centers",
        "source": "Fraternité Media Kit"
      },
      "revenueModel": "Print sales and local advertising",
      "logo": "newspaper-logos/bj/fraternite.png",
      "logoExplainer": "Crimson title logo 'Fraternité', representing democratic dialogue and community press.",
      "sources": [
        "https://www.fraternitebj.info"
      ]
    },
    {
      "id": "bj-la-nouvelle-tribune",
      "countryCode": "BJ",
      "name": "La Nouvelle Tribune",
      "englishTranslation": "The New Tribune",
      "founded": 2001,
      "frequency": "Daily publication",
      "format": "Print daily & digital portal",
      "language": "French",
      "headquarters": "Cotonou",
      "owner": {
        "name": "Nouvelle Tribune Media",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent critical daily; political commentary, anti-corruption stories, and civil rights",
      "readership": {
        "metric": "Influential among Beninese political commentators, legal professionals, and academics",
        "source": "La Nouvelle Tribune Archive"
      },
      "revenueModel": "Print sales and digital display advertising",
      "logo": "newspaper-logos/bj/la-nouvelle-tribune.svg",
      "logoExplainer": "Dark slate banner with sky blue text 'LA NOUVELLE TRIBUNE', symbolising critical political commentary.",
      "sources": [
        "https://lanouvelletribune.info",
        "https://fr.wikipedia.org/wiki/La_Nouvelle_Tribune_(B%C3%A9nin)"
      ]
    }
  ],
  "BN": [
    {
      "id": "bn-borneo-bulletin",
      "countryCode": "BN",
      "name": "Borneo Bulletin",
      "founded": 1953,
      "frequency": "Daily (Monday–Sunday)",
      "format": "Broadsheet & digital portal",
      "language": "English",
      "headquarters": "Bandar Seri Begawan",
      "owner": {
        "name": "QAF Media Group",
        "type": "Commercial conglomerate"
      },
      "editorialStance": "Leading national English-language daily in Brunei; royal announcements, Southeast Asian diplomacy, and local news",
      "readership": {
        "metric": "Primary English newspaper read across the Sultanate of Brunei (~20,000 daily print copies)",
        "source": "QAF Media Group Review 2023"
      },
      "revenueModel": "Print sales, display advertising, and commercial subscriptions",
      "logo": "newspaper-logos/bn/borneo-bulletin.jpg",
      "logoExplainer": "Deep blue title banner with white serif font 'Borneo Bulletin', symbolising 70+ years of Bruneian print press history.",
      "sources": [
        "https://borneobulletin.com.bn",
        "https://en.wikipedia.org/wiki/Borneo_Bulletin"
      ]
    },
    {
      "id": "bn-media-permata",
      "countryCode": "BN",
      "name": "Media Permata",
      "englishTranslation": "Jewel Media",
      "founded": 1995,
      "frequency": "Daily (Monday–Saturday)",
      "format": "Broadsheet & digital portal",
      "language": "Malay",
      "headquarters": "Bandar Seri Begawan",
      "owner": {
        "name": "QAF Media Group",
        "type": "Commercial conglomerate"
      },
      "editorialStance": "Main Malay-language daily newspaper in Brunei; Malay Islamic Monarchy (MIB) values, local events, and community news",
      "readership": {
        "metric": "Highest-readership Malay language daily in the Sultanate",
        "source": "Media Permata Annual Review 2023"
      },
      "revenueModel": "Print sales and local commercial advertising",
      "logo": "newspaper-logos/bn/media-permata.jpg",
      "logoExplainer": "Red title banner with gold text 'Media Permata', representing Malay-language print news leadership.",
      "sources": [
        "https://mediapermata.com.bn",
        "https://en.wikipedia.org/wiki/Media_Permata"
      ]
    },
    {
      "id": "bn-the-scoop",
      "countryCode": "BN",
      "name": "The Scoop",
      "founded": 2017,
      "frequency": "Continuous digital news",
      "format": "Digital news portal & video outlet",
      "language": "English",
      "headquarters": "Bandar Seri Begawan",
      "owner": {
        "name": "Scoop Media",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent digital news portal; youth culture, environment, business, and modern Bruneian society",
      "readership": {
        "metric": "Popular digital news platform among young Bruneians (over 200,000 monthly digital views)",
        "source": "The Scoop Media Review 2024"
      },
      "revenueModel": "Digital display ads, sponsored content, and video production",
      "logo": "newspaper-logos/bn/the-scoop.svg",
      "logoExplainer": "Purple modern typography logo 'The Scoop', representing modern digital journalism in Brunei.",
      "sources": [
        "https://thescoop.co"
      ]
    }
  ],
  "BO": [
    {
      "id": "bo-el-deber",
      "countryCode": "BO",
      "name": "El Deber",
      "englishTranslation": "The Duty",
      "founded": 1953,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "Spanish",
      "headquarters": "Santa Cruz de la Sierra",
      "owner": {
        "name": "Grupo Multimedios EL DEBER",
        "type": "Independent commercial media"
      },
      "editorialStance": "Leading commercial daily in eastern Bolivia; business, agriculture, and regional autonomy focus",
      "readership": {
        "metric": "Highest print circulation and digital reach in Bolivia (~45,000 daily print copies)",
        "source": "El Deber Media Kit 2023"
      },
      "revenueModel": "Print sales, display advertising, and digital subscriptions",
      "logo": "newspaper-logos/bo/el-deber.png",
      "logoExplainer": "Crimson title block with white serif font 'EL DEBER', iconic in Santa Cruz regional press.",
      "sources": [
        "https://eldeber.com.bo",
        "https://en.wikipedia.org/wiki/El_Deber"
      ]
    },
    {
      "id": "bo-los-tiempos",
      "countryCode": "BO",
      "name": "Los Tiempos",
      "englishTranslation": "The Times",
      "founded": 1943,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "Spanish",
      "headquarters": "Cochabamba",
      "owner": {
        "name": "Editorial Canelas SA",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent quality daily; regional news, politics, and social reporting in central Bolivia",
      "readership": {
        "metric": "Leading quality daily in Cochabamba and central valley region of Bolivia",
        "source": "Los Tiempos Archive 2023"
      },
      "revenueModel": "Print circulation and commercial advertising",
      "logo": "newspaper-logos/bo/los-tiempos.png",
      "logoExplainer": "Deep blue title banner with classic white serif typography 'LOS TIEMPOS'.",
      "sources": [
        "https://www.lostiempos.com",
        "https://en.wikipedia.org/wiki/Los_Tiempos"
      ]
    },
    {
      "id": "bo-la-razon",
      "countryCode": "BO",
      "name": "La Razón",
      "englishTranslation": "The Reason",
      "founded": 1990,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "Spanish",
      "headquarters": "La Paz",
      "owner": {
        "name": "La Razón Comunicaciones",
        "type": "Independent commercial media"
      },
      "editorialStance": "Commercial quality daily; national politics, economics, and Andean regional affairs",
      "readership": {
        "metric": "Primary daily paper read by government officials and diplomatic sector in La Paz",
        "source": "La Razón Media Kit 2024"
      },
      "revenueModel": "Print sales, corporate display ads, and subscriptions",
      "logo": "newspaper-logos/bo/la-razon.svg",
      "logoExplainer": "Classic black serif title 'LA RAZON' on white canvas, symbolising national press presence.",
      "sources": [
        "https://www.la-razon.com",
        "https://en.wikipedia.org/wiki/La_Raz%C3%B3n_(Bolivia)"
      ]
    },
    {
      "id": "bo-opinion",
      "countryCode": "BO",
      "name": "Opinión",
      "englishTranslation": "Opinion",
      "founded": 1985,
      "frequency": "Daily newspaper",
      "format": "Tabloid & digital portal",
      "language": "Spanish",
      "headquarters": "Cochabamba",
      "owner": {
        "name": "Coboce Editora",
        "type": "Independent commercial media"
      },
      "editorialStance": "Cooperative commercial paper; community issues, sports, and regional developments",
      "readership": {
        "metric": "Established daily print circulation across central Bolivia",
        "source": "Opinión Publishing 2023"
      },
      "revenueModel": "Print newsstand sales and local advertising",
      "logo": "newspaper-logos/bo/opinion.png",
      "logoExplainer": "Sky blue title logo 'OPINIÓN' in bold sans-serif lettering.",
      "sources": [
        "https://www.opinion.com.bo",
        "https://es.wikipedia.org/wiki/Opini%C3%B3n_(peri%C3%B3dico_boliviano)"
      ]
    }
  ],
  "BR": [
    {
      "id": "br-folha-de-spaulo",
      "countryCode": "BR",
      "name": "Folha de S.Paulo",
      "officialName": "Folha de S.Paulo",
      "founded": 1921,
      "frequency": "Daily broadsheet (Monday–Sunday)",
      "format": "Broadsheet print & digital news portal (folha.uol.com.br)",
      "language": "Portuguese",
      "headquarters": "São Paulo",
      "owner": {
        "name": "Grupo Folha",
        "type": "Commercial media conglomerate"
      },
      "editorialStance": "Pluralist, liberal-democratic quality newspaper; comprehensive national politics, investigative journalism, and plural editorial columns",
      "readership": {
        "metric": "Over 360,000 paid print and digital subscribers, 30+ million monthly digital unique visitors",
        "source": "Instituto Verificador de Comunicação (IVC) 2024"
      },
      "revenueModel": "Digital paywall subscriptions, print sales, and digital display advertising",
      "logo": "newspaper-logos/br/folha-de-s-paulo.svg",
      "logoExplainer": "Iconic clean modernist red and black masthead representing Brazil's leading circulation daily.",
      "sources": [
        "https://www.folha.uol.com.br",
        "https://en.wikipedia.org/wiki/Folha_de_S.Paulo"
      ]
    },
    {
      "id": "br-o-globo",
      "countryCode": "BR",
      "name": "O Globo",
      "officialName": "O Globo",
      "founded": 1925,
      "frequency": "Daily broadsheet (Monday–Sunday)",
      "format": "Broadsheet print & digital news portal (oglobo.globo.com)",
      "language": "Portuguese",
      "headquarters": "Rio de Janeiro",
      "owner": {
        "name": "Grupo Globo",
        "type": "Commercial media conglomerate"
      },
      "editorialStance": "Centrist quality broadsheet; national affairs, Rio de Janeiro coverage, economics, culture, and federal institutions",
      "readership": {
        "metric": "Over 370,000 paid subscribers and 35+ million monthly digital unique visitors",
        "source": "Instituto Verificador de Comunicação (IVC) 2024"
      },
      "revenueModel": "Digital subscriptions (Globo), print circulation, and multimedia advertising",
      "logo": "newspaper-logos/br/o-globo.svg",
      "logoExplainer": "Classic deep blue serif masthead synonymous with Brazil's largest communications and news organisation.",
      "sources": [
        "https://oglobo.globo.com",
        "https://en.wikipedia.org/wiki/O_Globo"
      ]
    },
    {
      "id": "br-estadao",
      "countryCode": "BR",
      "name": "O Estado de S. Paulo",
      "officialName": "O Estado de S. Paulo",
      "founded": 1875,
      "frequency": "Daily broadsheet (Monday–Sunday)",
      "format": "Broadsheet print & digital news portal (estadao.com.br)",
      "language": "Portuguese",
      "headquarters": "São Paulo",
      "owner": {
        "name": "Grupo Estado",
        "type": "Commercial media group"
      },
      "editorialStance": "Conservative-liberal broadsheet; Brazil's paper of record historically, known for in-depth institutional and macroeconomic analysis",
      "readership": {
        "metric": "Over 240,000 paid subscribers and 20+ million monthly digital visitors",
        "source": "Instituto Verificador de Comunicação (IVC) 2024"
      },
      "revenueModel": "Digital subscriptions, print subscriptions, and corporate advertising",
      "logo": "newspaper-logos/br/estadao.svg",
      "logoExplainer": "Historic serif masthead with the iconic mounted herald trumpeter emblem symbolising the dissemination of truth.",
      "sources": [
        "https://www.estadao.com.br",
        "https://en.wikipedia.org/wiki/O_Estado_de_S._Paulo"
      ]
    },
    {
      "id": "br-valor-economico",
      "countryCode": "BR",
      "name": "Valor Econômico",
      "officialName": "Valor Econômico",
      "founded": 2000,
      "frequency": "Daily financial newspaper (Monday–Friday)",
      "format": "Berliner print & premium financial portal (valor.globo.com)",
      "language": "Portuguese",
      "headquarters": "São Paulo",
      "owner": {
        "name": "Grupo Globo",
        "type": "Commercial media conglomerate"
      },
      "editorialStance": "Premier Brazilian business and economic daily; financial markets, fiscal regulation, commodities, and corporate strategy",
      "readership": {
        "metric": "Over 120,000 paid digital and print subscribers across Brazil's executive and financial sector",
        "source": "Instituto Verificador de Comunicação (IVC) 2024"
      },
      "revenueModel": "Premium subscriptions, print subscriptions, and B2B corporate advertising",
      "logo": "newspaper-logos/br/valor-economico.svg",
      "logoExplainer": "Distinctive salmon-pink branded masthead with elegant serif typography reflecting international financial broadsheet tradition.",
      "sources": [
        "https://valor.globo.com",
        "https://en.wikipedia.org/wiki/Valor_Econ%C3%B4mico"
      ]
    },
    {
      "id": "br-zero-hora",
      "countryCode": "BR",
      "name": "Zero Hora",
      "officialName": "Zero Hora",
      "founded": 1964,
      "frequency": "Daily broadsheet (Monday–Sunday)",
      "format": "Broadsheet print & digital news portal (gauchazh.clicrbs.com.br)",
      "language": "Portuguese",
      "headquarters": "Porto Alegre, Rio Grande do Sul",
      "owner": {
        "name": "Grupo RBS",
        "type": "Regional commercial media group"
      },
      "editorialStance": "Major regional quality daily covering southern Brazil, regional agribusiness, national politics, and culture",
      "readership": {
        "metric": "Over 180,000 paid subscribers and leading digital readership in southern Brazil",
        "source": "Instituto Verificador de Comunicação (IVC) 2024"
      },
      "revenueModel": "Subscriptions, print sales, and regional advertising",
      "logo": "newspaper-logos/br/zero-hora.svg",
      "logoExplainer": "Bold sans-serif initials 'ZH' in red, representing Rio Grande do Sul's flagship daily.",
      "sources": [
        "https://gauchazh.clicrbs.com.br",
        "https://en.wikipedia.org/wiki/Zero_Hora"
      ]
    }
  ],
  "BS": [
    {
      "id": "bs-nassau-guardian",
      "countryCode": "BS",
      "name": "The Nassau Guardian",
      "founded": 1844,
      "frequency": "Daily (Monday–Saturday)",
      "format": "Broadsheet & digital portal",
      "language": "English",
      "headquarters": "Nassau",
      "owner": {
        "name": "Perry Media Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Commercial quality daily; oldest continuously published newspaper in The Bahamas",
      "readership": {
        "metric": "Leading national print and online daily in The Bahamas (~15,000 daily print, 300K monthly web views)",
        "source": "The Nassau Guardian Media Review 2023"
      },
      "revenueModel": "Print retail sales, digital subscriptions, and commercial advertising",
      "logo": "newspaper-logos/bs/nassau-guardian.webp",
      "logoExplainer": "Teal blue rectangular banner with white serif title typography 'The Nassau Guardian', representing Bahamian print history.",
      "sources": [
        "https://thenassauguardian.com",
        "https://en.wikipedia.org/wiki/The_Nassau_Guardian"
      ]
    },
    {
      "id": "bs-tribune",
      "countryCode": "BS",
      "name": "The Tribune",
      "founded": 1903,
      "frequency": "Daily (Monday–Saturday)",
      "format": "Broadsheet & digital portal",
      "language": "English",
      "headquarters": "Nassau",
      "owner": {
        "name": "Dupuch Family",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent commercial daily; crusading journalism, political commentary, and local reporting",
      "readership": {
        "metric": "Historic paper of record founded by Sir Etienne Dupuch; widespread island distribution",
        "source": "The Tribune Media Kit 2023"
      },
      "revenueModel": "Print newsstand sales and advertising",
      "logo": "newspaper-logos/bs/tribune.svg",
      "logoExplainer": "Classic black serif title font on white canvas, reflecting 120+ years of independent Bahamian journalism.",
      "sources": [
        "https://www.tribune242.com",
        "https://en.wikipedia.org/wiki/The_Tribune_(Bahamas)"
      ]
    },
    {
      "id": "bs-punch",
      "countryCode": "BS",
      "name": "The Punch",
      "founded": 1990,
      "frequency": "Bi-weekly publication",
      "format": "Tabloid print & digital",
      "language": "English",
      "headquarters": "Nassau",
      "owner": {
        "name": "The Punch Ltd",
        "type": "Independent commercial media"
      },
      "editorialStance": "Sensational tabloid newspaper; political gossip, investigative scoops, and crime reporting",
      "readership": {
        "metric": "Highest single-issue print sales in The Bahamas (~25,000 copies per edition)",
        "source": "The Punch Publishing Group"
      },
      "revenueModel": "Newsstand retail sales and local advertising",
      "logo": "newspaper-logos/bs/punch.svg",
      "logoExplainer": "Bold red title banner with yellow typography 'THE PUNCH', representing energetic tabloid reporting.",
      "sources": [
        "https://en.wikipedia.org/wiki/The_Punch_(Bahamas)"
      ]
    }
  ],
  "BT": [
    {
      "id": "bt-kuensel",
      "countryCode": "BT",
      "name": "Kuensel",
      "officialName": "Kuensel Corporation Ltd",
      "founded": 1967,
      "frequency": "Daily (Monday–Saturday in English & Dzongkha)",
      "format": "Broadsheet & digital portal",
      "language": "English, Dzongkha",
      "headquarters": "Thimphu",
      "owner": {
        "name": "Kuensel Corporation (Public-private shareholding)",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "National public daily newspaper; Gross National Happiness (GNH) policies, royal affairs, and Himalayan development",
      "readership": {
        "metric": "National paper of record in Bhutan (~12,000 daily print copies, widely read online)",
        "source": "Kuensel Corporation Annual Report 2023"
      },
      "revenueModel": "Print sales, official government advertising, and commercial subscriptions",
      "logo": "newspaper-logos/bt/kuensel.png",
      "logoExplainer": "Orange title banner featuring Dzongkha script 'ཀུན་གསལ།' and gold lettering 'KUENSEL', symbolising Himalayan enlightenment.",
      "sources": [
        "https://kuenselonline.com",
        "https://en.wikipedia.org/wiki/Kuensel"
      ]
    },
    {
      "id": "bt-the-bhutanese",
      "countryCode": "BT",
      "name": "The Bhutanese",
      "founded": 2012,
      "frequency": "Bi-weekly publication (Wednesday & Saturday)",
      "format": "Tabloid & digital portal",
      "language": "English",
      "headquarters": "Thimphu",
      "owner": {
        "name": "Tenzing Lamsang / The Bhutanese Newspaper Ltd",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent commercial paper; investigative journalism, anti-corruption, governance, and environmental issues",
      "readership": {
        "metric": "Leading independent private newspaper in Bhutan with strong digital reach across Thimphu",
        "source": "The Bhutanese Media Kit 2024"
      },
      "revenueModel": "Print retail sales and digital display advertising",
      "logo": "newspaper-logos/bt/the-bhutanese.png",
      "logoExplainer": "Dark navy title logo with gold text 'The Bhutanese', representing independent investigative reporting.",
      "sources": [
        "https://thebhutanese.bt",
        "https://en.wikipedia.org/wiki/The_Bhutanese"
      ]
    },
    {
      "id": "bt-business-bhutan",
      "countryCode": "BT",
      "name": "Business Bhutan",
      "founded": 2009,
      "frequency": "Weekly publication (Saturday)",
      "format": "Tabloid & digital portal",
      "language": "English, Dzongkha",
      "headquarters": "Thimphu",
      "owner": {
        "name": "Business Bhutan Media",
        "type": "Independent commercial media"
      },
      "editorialStance": "Financial and business weekly; Himalayan economy, trade, banking, and private sector growth",
      "readership": {
        "metric": "Only financial newspaper in Bhutan read by business leaders and policymakers",
        "source": "Business Bhutan Review 2023"
      },
      "revenueModel": "Print subscriptions and corporate advertising",
      "logo": "newspaper-logos/bt/business-bhutan.png",
      "logoExplainer": "Forest green title logo 'Business Bhutan', representing economic and financial journalism.",
      "sources": [
        "https://businessbhutan.bt"
      ]
    }
  ],
  "BW": [
    {
      "id": "bw-mmegi",
      "countryCode": "BW",
      "name": "Mmegi",
      "englishTranslation": "The Reporter",
      "founded": 1984,
      "frequency": "Daily (Monday–Friday)",
      "format": "Broadsheet & digital portal",
      "language": "English, Setswana",
      "headquarters": "Gaborone",
      "owner": {
        "name": "Dikgang Publishing Company",
        "type": "Independent commercial media"
      },
      "editorialStance": "Leading independent daily newspaper in Botswana; investigative journalism, politics, and economics",
      "readership": {
        "metric": "Highest print circulation independent paper in Botswana (~25,000 daily print, 1M monthly digital views)",
        "source": "Dikgang Publishing Review 2023"
      },
      "revenueModel": "Print newsstand sales, display advertising, and digital subscriptions",
      "logo": "newspaper-logos/bw/mmegi.png",
      "logoExplainer": "Classic black serif title logo 'Mmegi', representing independent print journalism in Botswana.",
      "sources": [
        "https://www.mmegi.bw",
        "https://en.wikipedia.org/wiki/Mmegi"
      ]
    },
    {
      "id": "bw-the-voice",
      "countryCode": "BW",
      "name": "The Voice",
      "founded": 1993,
      "frequency": "Weekly (Friday)",
      "format": "Tabloid & digital portal",
      "language": "English",
      "headquarters": "Francistown / Gaborone",
      "owner": {
        "name": "The Voice Newspaper Ltd",
        "type": "Independent commercial media"
      },
      "editorialStance": "Popular commercial weekly newspaper; human interest, crime, sports, and entertainment focus",
      "readership": {
        "metric": "Widely read weekly tabloid newspaper nationwide in Botswana",
        "source": "The Voice Media Kit 2023"
      },
      "revenueModel": "Print retail sales and local commercial advertising",
      "logo": "newspaper-logos/bw/the-voice.svg",
      "logoExplainer": "Red title banner with bold white text 'THE VOICE', symbolising energetic tabloid reporting.",
      "sources": [
        "https://news.thevoicebw.com",
        "https://en.wikipedia.org/wiki/The_Voice_(Botswana)"
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
      "logo": "newspaper-logos/bw/sunday-standard.png",
      "logoExplainer": "Dark slate title block with white serif typography 'Sunday Standard'.",
      "sources": [
        "https://www.sundaystandard.info"
      ]
    }
  ],
  "BY": [
    {
      "id": "by-zvyazda",
      "countryCode": "BY",
      "name": "Zvyazda",
      "englishTranslation": "The Star",
      "founded": 1917,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "Belarusian",
      "headquarters": "Minsk",
      "owner": {
        "name": "Publishing House Zvyazda",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official state Belarusian-language daily; focus on Belarusian language culture, literature, and regional news",
      "readership": {
        "metric": "Only state daily newspaper published entirely in the Belarusian language (~20,000 daily print copies)",
        "source": "Ministry of Information of Belarus"
      },
      "revenueModel": "State subsidy and print subscription sales",
      "logo": "newspaper-logos/by/zvyazda.svg",
      "logoExplainer": "Forest green title banner with white Cyrillic calligraphic script 'ЗВЯЗДА', symbolising historic Belarusian print press.",
      "sources": [
        "https://zviazda.by",
        "https://en.wikipedia.org/wiki/Zvyazda"
      ]
    },
    {
      "id": "by-nasha-niva",
      "countryCode": "BY",
      "name": "Nasha Niva",
      "englishTranslation": "Our Field",
      "founded": 1906,
      "frequency": "Continuous digital news",
      "format": "Digital e-journal & multimedia portal",
      "language": "Belarusian",
      "headquarters": "Minsk (operating in diaspora)",
      "owner": {
        "name": "Nasha Niva LLC",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic independent Belarusian publication; national revival, human rights, and critical news",
      "readership": {
        "metric": "Pioneer of Belarusian cultural press; widely read online despite state censorship",
        "source": "Belarusian Association of Journalists (BAJ)"
      },
      "revenueModel": "Reader donations, grant funding, and digital advertising",
      "logo": "newspaper-logos/by/nasha-niva.jpg",
      "logoExplainer": "Classic white banner with red script typography 'Наша Ніва', representing 115+ years of Belarusian cultural journalism.",
      "sources": [
        "https://nashaniva.com",
        "https://en.wikipedia.org/wiki/Nasha_Niva"
      ]
    }
  ],
  "BZ": [
    {
      "id": "bz-amandala",
      "countryCode": "BZ",
      "name": "Amandala",
      "founded": 1969,
      "frequency": "Bi-weekly print publication (Tuesday & Friday)",
      "format": "Tabloid print & digital portal",
      "language": "English",
      "headquarters": "Belize City",
      "owner": {
        "name": "Kremandala Ltd",
        "type": "Independent commercial media"
      },
      "editorialStance": "Leading independent newspaper in Belize; Garifuna, Creole, and grassroots community advocacy; anti-colonial heritage",
      "readership": {
        "metric": "Highest print circulation newspaper in Belize (~10,000 copies per edition nationwide)",
        "source": "Amandala Publishing Review 2023"
      },
      "revenueModel": "Print retail sales and local commercial advertising",
      "logo": "newspaper-logos/bz/amandala.jpg",
      "logoExplainer": "Forest green title banner with bold white text 'AMANDALA', representing Belize's leading independent print voice.",
      "sources": [
        "https://amandala.com.bz",
        "https://en.wikipedia.org/wiki/Amandala"
      ]
    },
    {
      "id": "bz-reporter",
      "countryCode": "BZ",
      "name": "The Reporter",
      "founded": 1967,
      "frequency": "Weekly (Friday)",
      "format": "Tabloid & digital portal",
      "language": "English",
      "headquarters": "Belize City",
      "owner": {
        "name": "The Reporter Newspaper Ltd",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent commercial weekly; moderate stance, business news, legal affairs, and environmental issues",
      "readership": {
        "metric": "Second-largest print circulation weekly in Belize",
        "source": "The Reporter Media Kit 2023"
      },
      "revenueModel": "Print newsstand sales and commercial advertising",
      "logo": "newspaper-logos/bz/reporter.jpg",
      "logoExplainer": "Classic blue serif title 'The Reporter' on white canvas, symbolizing established weekly journalism in Belize.",
      "sources": [
        "https://www.reporter.bz",
        "https://en.wikipedia.org/wiki/The_Reporter_(Belize)"
      ]
    },
    {
      "id": "bz-san-pedro-sun",
      "countryCode": "BZ",
      "name": "The San Pedro Sun",
      "founded": 1991,
      "frequency": "Weekly print & continuous digital",
      "format": "Community newspaper & digital portal",
      "language": "English",
      "headquarters": "San Pedro, Ambergris Caye",
      "owner": {
        "name": "San Pedro Sun Ltd",
        "type": "Independent commercial media"
      },
      "editorialStance": "Island community newspaper; marine conservation, tourism industry, and local island governance",
      "readership": {
        "metric": "Primary news outlet for Ambergris Caye and Caye Caulker in northern Belize",
        "source": "The San Pedro Sun Media Kit 2024"
      },
      "revenueModel": "Tourism business advertising and print sales",
      "logo": "newspaper-logos/bz/san-pedro-sun.jpg",
      "logoExplainer": "Sky blue banner with golden sun emblem, symbolising Ambergris Caye island community reporting.",
      "sources": [
        "https://www.sanpedrosun.com"
      ]
    }
  ],
  "CA": [
    {
      "id": "ca-the-globe-and-mail",
      "countryCode": "CA",
      "name": "The Globe and Mail",
      "founded": 1844,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Broadsheet & digital portal",
      "language": "English",
      "headquarters": "Toronto, Ontario",
      "owner": {
        "name": "The Woodbridge Company (Thomson family)",
        "type": "Independent commercial media"
      },
      "editorialStance": "National newspaper of record; center-right liberal-conservative editorial stance focusing on finance, politics, and investigative national reporting",
      "readership": {
        "metric": "Over 6.2 million weekly multiplatform readers across Canada",
        "source": "News Media Canada & Vividata 2024"
      },
      "revenueModel": "Digital subscriptions, print sales, and corporate advertising",
      "logo": "newspaper-logos/ca/the-globe-and-mail.svg",
      "logoExplainer": "White banner featuring the iconic serif typography 'The Globe and Mail' in black, representing Canada's historic newspaper of record.",
      "sources": [
        "https://www.theglobeandmail.com",
        "https://en.wikipedia.org/wiki/The_Globe_and_Mail"
      ]
    },
    {
      "id": "ca-le-devoir",
      "countryCode": "CA",
      "name": "Le Devoir",
      "englishTranslation": "The Duty",
      "founded": 1910,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Compact broadsheet & digital portal",
      "language": "French",
      "headquarters": "Montreal, Quebec",
      "owner": {
        "name": "Le Devoir Trust",
        "type": "Non-profit independent trust"
      },
      "editorialStance": "Independent Quebec intellectual daily founded by Henri Bourassa; focus on culture, Quebec politics, and civic debate",
      "readership": {
        "metric": "Benchmark French-language quality daily reaching over 1.8 million monthly digital visitors",
        "source": "Le Devoir Trust Annual Report 2023"
      },
      "revenueModel": "Reader subscriptions, philanthropic donations, and targeted advertising",
      "logo": "newspaper-logos/ca/le-devoir.svg",
      "logoExplainer": "Minimalist white background with crisp black serif masthead 'LE DEVOIR', representing intellectual independence and journalistic duty.",
      "sources": [
        "https://www.ledevoir.com",
        "https://en.wikipedia.org/wiki/Le_Devoir"
      ]
    },
    {
      "id": "ca-national-post",
      "countryCode": "CA",
      "name": "National Post",
      "founded": 1998,
      "frequency": "Daily newspaper (Tuesday–Saturday)",
      "format": "Broadsheet & digital portal",
      "language": "English",
      "headquarters": "Toronto, Ontario",
      "owner": {
        "name": "Postmedia Network",
        "type": "Independent commercial media"
      },
      "editorialStance": "Conservative national broadsheet founded by Conrad Black; free-market advocacy, federal politics, and financial market analysis",
      "readership": {
        "metric": "Over 4.5 million weekly readers across print and digital Postmedia networks",
        "source": "Postmedia Network Annual Report 2023"
      },
      "revenueModel": "Print advertising, digital paywall, and sponsored content",
      "logo": "newspaper-logos/ca/national-post.svg",
      "logoExplainer": "Modern black uppercase sans-serif title 'NATIONAL POST' on white ground, reflecting contemporary business and national political journalism.",
      "sources": [
        "https://nationalpost.com",
        "https://en.wikipedia.org/wiki/National_Post"
      ]
    },
    {
      "id": "ca-la-presse",
      "countryCode": "CA",
      "name": "La Presse",
      "englishTranslation": "The Press",
      "founded": 1884,
      "frequency": "Continuous digital daily edition",
      "format": "Digital-only news tablet app & portal",
      "language": "French",
      "headquarters": "Montreal, Quebec",
      "owner": {
        "name": "Fiducie La Presse",
        "type": "Non-profit independent trust"
      },
      "editorialStance": "Independent progressive francophone media; pioneer in digital-first journalism and comprehensive national coverage",
      "readership": {
        "metric": "Over 4 million monthly active digital readers on mobile, tablet, and web platforms",
        "source": "Fiducie La Presse Financial Report 2023"
      },
      "revenueModel": "Philanthropic donations, government journalism tax credits, and digital advertising",
      "logo": "newspaper-logos/ca/la-presse.svg",
      "logoExplainer": "Red rectangular emblem featuring clean white sans-serif letters 'LA PRESSE', symbolising modern Quebec digital news leadership.",
      "sources": [
        "https://www.lapresse.ca",
        "https://en.wikipedia.org/wiki/La_Presse_(Canadian_newspaper)"
      ]
    },
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
      "logo": "newspaper-logos/ca/the-toronto-star.svg",
      "logoExplainer": "Deep blue banner featuring white serif typography 'TORONTO STAR', symbolizing progressive civic and investigative reporting.",
      "sources": [
        "https://www.thestar.com",
        "https://en.wikipedia.org/wiki/Toronto_Star"
      ]
    }
  ],
  "CD": [
    {
      "id": "cd-le-potentiel",
      "countryCode": "CD",
      "name": "Le Potentiel",
      "englishTranslation": "The Potential",
      "founded": 1982,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Tabloid & digital portal",
      "language": "French",
      "headquarters": "Kinshasa",
      "owner": {
        "name": "Modeste Mutinga Mutuishayi / Groupe Le Potentiel",
        "type": "Independent commercial media"
      },
      "editorialStance": "DRC's benchmark independent daily newspaper; recognized for in-depth economic analysis, governance monitoring, and constitutional reform debate",
      "readership": {
        "metric": "Most influential intellectual daily in Kinshasa and Lubumbashi with 1.2 million monthly web readers on lepotentiel.cd",
        "source": "Groupe Le Potentiel Profile 2023"
      },
      "revenueModel": "Print sales, institutional advertising, and online sponsorships",
      "logo": "newspaper-logos/cd/le-potentiel.svg",
      "logoExplainer": "Deep blue banner with white serif font 'Le Potentiel', representing decades of independent investigative journalism in Central Africa.",
      "sources": [
        "https://lepotentiel.cd",
        "https://fr.wikipedia.org/wiki/Le_Potentiel"
      ]
    },
    {
      "id": "cd-actualite-cd",
      "countryCode": "CD",
      "name": "ACTUALITE.CD",
      "founded": 2016,
      "frequency": "Continuous 24/7 digital news service",
      "format": "Digital multimedia portal & podcasts",
      "language": "French",
      "headquarters": "Kinshasa",
      "owner": {
        "name": "Next Corp (Patient Ligodi)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Leading independent digital news portal in the DRC; high-tempo breaking news, eastern DRC security coverage, electoral tracking, and podcast journalism",
      "readership": {
        "metric": "Over 3.5 million monthly pageviews; premier digital news reference for Congolese youth and civil society",
        "source": "Actualite.cd Audience Review 2024"
      },
      "revenueModel": "Digital display advertising, international donor media grants, and syndicated reporting",
      "logo": "newspaper-logos/cd/actualite-cd.svg",
      "logoExplainer": "Dark charcoal banner with bold white text 'ACTUALITE.CD' and vivid red dot, symbolising real-time breaking news.",
      "sources": [
        "https://actualite.cd"
      ]
    },
    {
      "id": "cd-l-avenir",
      "countryCode": "CD",
      "name": "L'Avenir",
      "englishTranslation": "The Future",
      "founded": 1996,
      "frequency": "Daily newspaper",
      "format": "Tabloid & digital portal",
      "language": "French",
      "headquarters": "Kinshasa",
      "owner": {
        "name": "Groupe L'Avenir (Pius Muabilu)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Major Kinshasa commercial daily; national politics, parliamentary debates, infrastructure modernization, and cultural commentary",
      "readership": {
        "metric": "Prominent daily circulation in Kinshasa and central provinces with active digital platform groupelavenir.cd",
        "source": "Groupe L'Avenir Media Review 2023"
      },
      "revenueModel": "Print newspaper sales and commercial advertising",
      "logo": "newspaper-logos/cd/l-avenir.svg",
      "logoExplainer": "White banner featuring blue and red font 'L'AVENIR', representing optimistic national development and daily news.",
      "sources": [
        "https://groupelavenir.cd",
        "https://fr.wikipedia.org/wiki/L%27Avenir_(journal_congolais)"
      ]
    },
    {
      "id": "cd-la-prosperite",
      "countryCode": "CD",
      "name": "La Prospérité",
      "englishTranslation": "The Prosperity",
      "founded": 1999,
      "frequency": "Daily newspaper (Monday–Friday)",
      "format": "Tabloid publication & digital portal",
      "language": "French",
      "headquarters": "Kinshasa",
      "owner": {
        "name": "Marcel Ngoyi Ngoyi / Éditions La Prospérité",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent commercial daily newspaper; detailed parliamentary reporting, judicial proceedings, and public policy debate",
      "readership": {
        "metric": "Widely read by legal practitioners, parliamentarians, and civil servants in Kinshasa",
        "source": "CSAC RDC Media Registry 2023"
      },
      "revenueModel": "Print sales and official legal publication notices",
      "logo": "newspaper-logos/cd/la-prospérité.svg",
      "logoExplainer": "Emerald green title banner with bold white typography 'La Prospérité', reflecting economic growth and national progress.",
      "sources": [
        "https://laprosperite.online"
      ]
    }
  ],
  "CF": [
    {
      "id": "cf-le-democrate",
      "countryCode": "CF",
      "name": "Le Démocrate",
      "englishTranslation": "The Democrat",
      "founded": 1992,
      "frequency": "Daily newspaper",
      "format": "Tabloid & digital portal",
      "language": "French",
      "headquarters": "Bangui",
      "owner": {
        "name": "Société Le Démocrate (Ferdinand Samba)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic independent daily paper; democratic governance, civil society advocacy, and political reporting in Bangui",
      "readership": {
        "metric": "One of the longest-running private daily newspapers in Bangui",
        "source": "Union des Journalistes de Centrafrique 2023"
      },
      "revenueModel": "Street print sales and private advertising",
      "logo": "newspaper-logos/cf/le-démocrate.svg",
      "logoExplainer": "White banner with bold black masthead 'LE DÉMOCRATE', symbolising democratic transition and independent press history in CAR.",
      "sources": [
        "https://www.le-democrate.com",
        "https://fr.wikipedia.org/wiki/M%C3%A9dias_en_R%C3%A9publique_centrafricaine"
      ]
    },
    {
      "id": "cf-corbeau-news-centrafrique",
      "countryCode": "CF",
      "name": "Corbeau News Centrafrique",
      "founded": 2014,
      "frequency": "Continuous digital news portal",
      "format": "Digital investigative news portal",
      "language": "French, Sango",
      "headquarters": "Bangui",
      "owner": {
        "name": "CNC Media Network (Gisèle Moloma)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent digital investigative portal; security reporting, armed group movements, and political accountability",
      "readership": {
        "metric": "Over 850,000 monthly digital visitors across Central African Republic and international diaspora",
        "source": "Corbeau News Analytics 2024"
      },
      "revenueModel": "Digital web advertising and private reader donations",
      "logo": "newspaper-logos/cf/corbeau-news-centrafrique.svg",
      "logoExplainer": "Dark charcoal banner with bold white text 'CNC' and 'Corbeau News Centrafrique', symbolising independent investigative news.",
      "sources": [
        "https://corbeaunews-centrafrique.org"
      ]
    },
    {
      "id": "cf-l-expansion",
      "countryCode": "CF",
      "name": "L'Expansion",
      "englishTranslation": "The Expansion",
      "founded": 1996,
      "frequency": "Weekly newspaper",
      "format": "Tabloid publication",
      "language": "French",
      "headquarters": "Bangui",
      "owner": {
        "name": "Éditions L'Expansion Centrafrique",
        "type": "Independent commercial media"
      },
      "editorialStance": "Weekly independent publication; macroeconomic developments, agricultural reform, and Central African trade",
      "readership": {
        "metric": "Read by business professionals, development agencies, and civil servants in Bangui",
        "source": "Ministère de la Communication RCA 2023"
      },
      "revenueModel": "Print sales and corporate sponsorships",
      "logo": "newspaper-logos/cf/l-expansion.svg",
      "logoExplainer": "Clean white masthead with blue serif title 'L'EXPANSION', representing economic focus and development journalism.",
      "sources": [
        "https://fr.wikipedia.org/wiki/M%C3%A9dias_en_R%C3%A9publique_centrafricaine"
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
      "logo": "newspaper-logos/cf/le-potentiel-centrafricain.svg",
      "logoExplainer": "White banner with prominent green and black lettering 'Le Potentiel Centrafricain', representing national reconstruction.",
      "sources": [
        "https://lepotentielcentrafricain.com",
        "https://fr.wikipedia.org/wiki/M%C3%A9dias_en_R%C3%A9publique_centrafricaine"
      ]
    }
  ],
  "CG": [
    {
      "id": "cg-les-depeches-de-brazzaville",
      "countryCode": "CG",
      "name": "Les Dépêches de Brazzaville",
      "englishTranslation": "Brazzaville Dispatches",
      "founded": 1998,
      "frequency": "Daily newspaper (Monday–Friday)",
      "format": "Berliner & international portal",
      "language": "French",
      "headquarters": "Brazzaville",
      "owner": {
        "name": "Agence d'Information d'Afrique Centrale (ADIAC)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Leading national daily newspaper; Central African geopolitics, cultural festivals, public infrastructure, and pan-African diplomacy",
      "readership": {
        "metric": "Largest print daily circulation in the Republic of the Congo with 15,000 daily print copies",
        "source": "ADIAC Corporate Review 2023"
      },
      "revenueModel": "Print sales, cultural sponsorships, and institutional subscriptions",
      "logo": "newspaper-logos/cg/les-dépêches-de-brazzaville.svg",
      "logoExplainer": "Black background with white serif title 'Les Dépêches de Brazzaville', the most prominent daily masthead in the Congo Basin.",
      "sources": [
        "https://www.lesdepechesdebrazzaville.fr",
        "https://fr.wikipedia.org/wiki/Les_D%C3%A9p%C3%AAches_de_Brazzaville"
      ]
    },
    {
      "id": "cg-le-patriote",
      "countryCode": "CG",
      "name": "Le Patriote",
      "englishTranslation": "The Patriot",
      "founded": 2000,
      "frequency": "Weekly newspaper",
      "format": "Tabloid publication",
      "language": "French",
      "headquarters": "Brazzaville",
      "owner": {
        "name": "Groupe Le Patriote",
        "type": "Independent commercial media"
      },
      "editorialStance": "Weekly independent newspaper; national political debates, regional economic corridors, and social development",
      "readership": {
        "metric": "Popular weekly print edition in administrative centers of Brazzaville and Pointe-Noire",
        "source": "Conseil Supérieur de la Liberté de Communication 2023"
      },
      "revenueModel": "Print retail sales and local advertising",
      "logo": "newspaper-logos/cg/le-patriote.svg",
      "logoExplainer": "Red title banner with bold white lettering 'LE PATRIOTE', representing national civic engagement and public debate.",
      "sources": [
        "https://fr.wikipedia.org/wiki/M%C3%A9dias_en_R%C3%A9publique_du_Congo"
      ]
    },
    {
      "id": "cg-vox-congo",
      "countryCode": "CG",
      "name": "Vox Congo",
      "founded": 2017,
      "frequency": "Continuous digital multimedia service",
      "format": "Digital multimedia portal & Web TV",
      "language": "French",
      "headquarters": "Brazzaville",
      "owner": {
        "name": "Vox Médias Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Modern multimedia and digital TV platform; youth culture, sports, technological entrepreneurship, and urban lifestyle",
      "readership": {
        "metric": "Leading digital native video and news platform in Brazzaville with 500,000+ monthly engagements",
        "source": "Vox Congo Audience Review 2024"
      },
      "revenueModel": "Digital video advertising and sponsored corporate media",
      "logo": "newspaper-logos/cg/vox-congo.svg",
      "logoExplainer": "White banner with vibrant red and black logo 'VOX', representing modern digital television and youth-oriented journalism.",
      "sources": [
        "https://www.vox.cg"
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
      "logo": "newspaper-logos/cg/la-semaine-africaine.svg",
      "logoExplainer": "White banner with bold green and black lettering 'La Semaine Africaine', symbolising historic moral and civic journalism.",
      "sources": [
        "https://lasemaineafricaine.info",
        "https://fr.wikipedia.org/wiki/La_Semaine_africaine"
      ]
    }
  ],
  "CH": [
    {
      "id": "ch-nzz",
      "countryCode": "CH",
      "name": "Neue Zürcher Zeitung (NZZ)",
      "nativeName": "Neue Zürcher Zeitung",
      "englishTranslation": "New Zurich Newspaper",
      "founded": 1780,
      "frequency": "Daily (Monday to Saturday) newspaper & continuous digital service",
      "format": "Broadsheet newspaper & online platform (nzz.ch)",
      "language": "German",
      "headquarters": "Falkenstrasse 11, Zürich",
      "owner": {
        "name": "Aktiengesellschaft für die Neue Zürcher Zeitung",
        "type": "Independent publicly held media company"
      },
      "editorialStance": "Switzerland's historic daily newspaper of record and one of the world's most respected German-language publications, founded in 1780 by Salomon Gessner; maintains a liberal-conservative, free-market editorial stance, world-renowned for thorough international reporting and foreign affairs analysis",
      "readership": {
        "metric": "Over 220,000 paid subscribers across Switzerland, Germany, and Austria, with over 3.5 million monthly digital visitors",
        "source": "WEMF AG für Werbemedienforschung / NZZ Jahresbericht 2023"
      },
      "revenueModel": "Paid digital subscriptions, print subscriptions, and high-end advertising",
      "logo": "newspaper-logos/ch/nzz.svg",
      "logoExplainer": "Pristine white field with historic dark navy serif typography 'Neue Zürcher Zeitung', a crisp dividing line, and Swiss quality press subtitle.",
      "sources": [
        "https://www.nzz.ch",
        "https://en.wikipedia.org/wiki/Neue_Z%C3%BCrcher_Zeitung"
      ]
    },
    {
      "id": "ch-le-temps",
      "countryCode": "CH",
      "name": "Le Temps",
      "nativeName": "Le Temps",
      "englishTranslation": "The Times",
      "founded": 1998,
      "frequency": "Daily (Monday to Saturday) newspaper",
      "format": "Broadsheet newspaper & digital portal (letemps.ch)",
      "language": "French",
      "headquarters": "Chemin de Couvaloup 10, Lausanne / Geneva",
      "owner": {
        "name": "Fondation Aventinus",
        "type": "Non-profit foundation for public interest journalism"
      },
      "editorialStance": "French-speaking Switzerland's daily newspaper of record (Romandie), established in 1998 from the merger of Gazette de Lausanne and Journal de Genève; offers in-depth coverage of Swiss federal politics, international Geneva institutions, diplomacy, science, and cultural life",
      "readership": {
        "metric": "Over 40,000 paid subscribers and more than 1.8 million monthly unique visits across Romandie and France",
        "source": "WEMF / Fondation Aventinus Annual Report 2023"
      },
      "revenueModel": "Digital paywall subscriptions, print subscriptions, foundation endowment, and advertising",
      "logo": "newspaper-logos/ch/le-temps.svg",
      "logoExplainer": "Clean white field with prominent navy serif typography 'LE TEMPS', an elegant rule bar, and gray Swiss reference daily subtitle.",
      "sources": [
        "https://www.letemps.ch",
        "https://en.wikipedia.org/wiki/Le_Temps"
      ]
    },
    {
      "id": "ch-tages-anzeiger",
      "countryCode": "CH",
      "name": "Tages-Anzeiger",
      "nativeName": "Tages-Anzeiger",
      "englishTranslation": "Daily Indicator / Daily Gazette",
      "founded": 1893,
      "frequency": "Daily (Monday to Saturday) newspaper",
      "format": "Tabloid newspaper & news platform (tagesanzeiger.ch)",
      "language": "German",
      "headquarters": "Werdstrasse 21, Zürich",
      "owner": {
        "name": "TX Group (formerly Tamedia)",
        "type": "Publicly listed media group"
      },
      "editorialStance": "One of Switzerland's most widely circulated national daily newspapers, founded in 1893 by Wilhelm Girardet; known for strong regional and national news coverage, independent investigative reporting, federal politics in Bern, and cultural commentary",
      "readership": {
        "metric": "Over 140,000 paid subscribers (print and digital) and more than 2.8 million monthly digital readers",
        "source": "WEMF Circulation Bulletin / TX Group Financial Report 2023"
      },
      "revenueModel": "Paid digital subscriptions, daily print deliveries, and commercial display advertising",
      "logo": "newspaper-logos/ch/tages-anzeiger.jpg",
      "logoExplainer": "White background with deep blue serif lettering 'Tages-Anzeiger' and bold crimson red subtitle 'DIE GROSSE SCHWEIZER TAGESZEITUNG'.",
      "sources": [
        "https://www.tagesanzeiger.ch",
        "https://en.wikipedia.org/wiki/Tages-Anzeiger"
      ]
    },
    {
      "id": "ch-corriere-del-ticino",
      "countryCode": "CH",
      "name": "Corriere del Ticino",
      "nativeName": "Corriere del Ticino",
      "englishTranslation": "Courier of Ticino",
      "founded": 1891,
      "frequency": "Daily (Monday to Saturday) newspaper",
      "format": "Broadsheet newspaper & digital portal (cdt.ch)",
      "language": "Italian",
      "headquarters": "Via San Gottardo 4, Muzzano, Ticino",
      "owner": {
        "name": "Gruppo Corriere del Ticino (Fondazione Corriere del Ticino)",
        "type": "Private media trust"
      },
      "editorialStance": "Leading Italian-language daily newspaper in Switzerland, founded in 1891 by Agostino Soldati; serves as the preeminent voice of Italian Switzerland (Ticino and southern Grisons), covering cantonal governance, Swiss-Italian cross-border relations, federal affairs, and culture",
      "readership": {
        "metric": "Print circulation of approximately 28,000 copies daily and more than 600,000 monthly digital visits",
        "source": "WEMF / Gruppo CdT Readership Data"
      },
      "revenueModel": "Print subscriptions, digital paywall, and cantonal commercial advertising",
      "logo": "newspaper-logos/ch/corriere-del-ticino.svg",
      "logoExplainer": "Deep navy field featuring refined white serif typography 'CORRIERE DEL TICINO', underlined by an antique gold divider rule and founding year 1891 subtitle.",
      "sources": [
        "https://www.cdt.ch",
        "https://en.wikipedia.org/wiki/Corriere_del_Ticino"
      ]
    }
  ],
  "CI": [
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
    }
  ],
  "CL": [
    {
      "id": "cl-el-mercurio",
      "countryCode": "CL",
      "name": "El Mercurio",
      "englishTranslation": "The Mercury",
      "founded": 1900,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "Spanish",
      "headquarters": "Santiago",
      "owner": {
        "name": "Empresa El Mercurio S.A.P. (Edwards family)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Chile's historic conservative newspaper of record; business, legal affairs, national politics, and international diplomacy",
      "readership": {
        "metric": "Leading national newspaper of record with over 120,000 daily print circulation and Emol.com digital portal reaching 8M+ monthly readers",
        "source": "El Mercurio SAP Memoria Anual 2023"
      },
      "revenueModel": "Print sales, digital subscriptions, and display advertising",
      "logo": "newspaper-logos/cl/el-mercurio.svg",
      "logoExplainer": "White banner displaying the classic black gothic and serif masthead 'EL MERCURIO', representing Chile's oldest major news institution.",
      "sources": [
        "https://www.elmercurio.com",
        "https://en.wikipedia.org/wiki/El_Mercurio"
      ]
    },
    {
      "id": "cl-la-tercera",
      "countryCode": "CL",
      "name": "La Tercera",
      "englishTranslation": "The Third",
      "founded": 1950,
      "frequency": "Daily newspaper & continuous digital portal",
      "format": "Berliner & digital portal",
      "language": "Spanish",
      "headquarters": "Santiago",
      "owner": {
        "name": "Copesa (Consorcio Periodístico de Chile S.A.)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Center-right mainstream daily; national political analysis, investigative reports (La Tercera PM), and business coverage (Pulso)",
      "readership": {
        "metric": "Over 6.5 million monthly unique digital visitors across latercera.com and Pulso",
        "source": "Copesa Audience Report 2024"
      },
      "revenueModel": "Digital paywall subscriptions, print sales, and programmatic advertising",
      "logo": "newspaper-logos/cl/la-tercera.svg",
      "logoExplainer": "Vibrant red banner with bold white lowercase typography 'la tercera', reflecting modern investigative and dynamic daily reporting.",
      "sources": [
        "https://www.latercera.com",
        "https://en.wikipedia.org/wiki/La_Tercera"
      ]
    },
    {
      "id": "cl-diario-financiero",
      "countryCode": "CL",
      "name": "Diario Financiero",
      "englishTranslation": "Financial Daily",
      "founded": 1988,
      "frequency": "Daily business newspaper (Monday–Friday)",
      "format": "Salmon broadsheet & digital portal",
      "language": "Spanish",
      "headquarters": "Santiago",
      "owner": {
        "name": "Grupo Claro",
        "type": "Independent commercial media"
      },
      "editorialStance": "Specialized financial and economic daily; Santiago Stock Exchange, mining industries, retail markets, and regulatory affairs",
      "readership": {
        "metric": "Primary business daily in Chile read by corporate executives and financial institutions (2.5M monthly visits)",
        "source": "Diario Financiero Media Kit 2024"
      },
      "revenueModel": "Corporate subscriptions and financial sector advertising",
      "logo": "newspaper-logos/cl/diario-financiero.svg",
      "logoExplainer": "White banner with distinctive navy blue lettering 'DF DIARIO FINANCIERO', symbolising market analysis and corporate integrity.",
      "sources": [
        "https://www.df.cl",
        "https://es.wikipedia.org/wiki/Diario_Financiero"
      ]
    },
    {
      "id": "cl-las-ultimas-noticias",
      "countryCode": "CL",
      "name": "Las Últimas Noticias",
      "englishTranslation": "The Latest News",
      "founded": 1902,
      "frequency": "Daily newspaper",
      "format": "Tabloid & digital portal",
      "language": "Spanish",
      "headquarters": "Santiago",
      "owner": {
        "name": "Empresa El Mercurio S.A.P.",
        "type": "Independent commercial media"
      },
      "editorialStance": "Mass-circulation popular daily; sports, technology trends, popular culture, and human interest stories",
      "readership": {
        "metric": "Highest print retail circulation among popular tabloids in Chile with 100,000+ daily copies",
        "source": "LUN Media Metrics 2023"
      },
      "revenueModel": "Retail print sales and retail commercial advertising",
      "logo": "newspaper-logos/cl/las-últimas-noticias.svg",
      "logoExplainer": "Royal blue background with bright yellow and white typography 'LUN Las Últimas Noticias', iconic across Chilean newsstands.",
      "sources": [
        "https://www.lun.com",
        "https://en.wikipedia.org/wiki/Las_%C3%9Altimas_Noticias"
      ]
    },
    {
      "id": "cl-the-clinic",
      "countryCode": "CL",
      "name": "The Clinic",
      "founded": 1998,
      "frequency": "Weekly publication & digital portal",
      "format": "Satirical journal & digital portal",
      "language": "Spanish",
      "headquarters": "Santiago",
      "owner": {
        "name": "Ediciones The Clinic (Patricio Fernández)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Left-leaning satirical and political investigative publication founded during Pinochet's London arrest; anti-establishment critique",
      "readership": {
        "metric": "Cult political publication reaching 1.2 million monthly readers across cultural and academic sectors",
        "source": "The Clinic Audience Review 2023"
      },
      "revenueModel": "Print sales, digital display advertising, and reader memberships",
      "logo": "newspaper-logos/cl/the-clinic.svg",
      "logoExplainer": "Dark black banner with bold white text 'THE CLINIC', symbolising sharp political satire and counter-cultural investigative journalism.",
      "sources": [
        "https://www.theclinic.cl",
        "https://en.wikipedia.org/wiki/The_Clinic_(newspaper)"
      ]
    }
  ],
  "CM": [
    {
      "id": "cm-le-jour",
      "countryCode": "CM",
      "name": "Le Jour",
      "englishTranslation": "The Day",
      "founded": 2007,
      "frequency": "Daily newspaper",
      "format": "Tabloid & digital portal",
      "language": "French",
      "headquarters": "Yaoundé",
      "owner": {
        "name": "Haman Mana / Groupe Le Jour",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent commercial daily newspaper; investigative stories, political commentary, and social issues",
      "readership": {
        "metric": "Leading independent francophone daily in Yaoundé and Douala",
        "source": "Groupe Le Jour Review 2023"
      },
      "revenueModel": "Print sales and commercial display advertising",
      "logo": "newspaper-logos/cm/le-jour.svg",
      "logoExplainer": "Red title banner with bold white font 'LE JOUR', representing modern independent daily reporting.",
      "sources": [
        "https://www.lejour.cm",
        "https://fr.wikipedia.org/wiki/Le_Jour_(Cameroun)"
      ]
    },
    {
      "id": "cm-mutations",
      "countryCode": "CM",
      "name": "Mutations",
      "founded": 1996,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "French",
      "headquarters": "Yaoundé",
      "owner": {
        "name": "South Media Corporation",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent quality daily newspaper; political analysis, economic reports, and governance focus",
      "readership": {
        "metric": "Respected daily paper read by intellectuals, civil servants, and business sector",
        "source": "South Media Corporation 2023"
      },
      "revenueModel": "Print sales and commercial advertising",
      "logo": "newspaper-logos/cm/mutations.jpg",
      "logoExplainer": "Royal blue title font 'MUTATIONS' in bold serif typography.",
      "sources": [
        "https://www.mutations-online.com",
        "https://fr.wikipedia.org/wiki/Mutations_(journal)"
      ]
    },
    {
      "id": "cm-guardian-post",
      "countryCode": "CM",
      "name": "The Guardian Post",
      "founded": 2001,
      "frequency": "Daily (Monday–Friday)",
      "format": "Tabloid & digital portal",
      "language": "English",
      "headquarters": "Yaoundé / Bamenda",
      "owner": {
        "name": "Christian Cardinal Tumi Media / Guardian Post Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Leading English-language daily in Cameroon; focus on Anglophone regions, human rights, and national politics",
      "readership": {
        "metric": "Only daily English-language newspaper in Cameroon (~12,000 daily print copies)",
        "source": "The Guardian Post Media Kit 2024"
      },
      "revenueModel": "Print newsstand sales and commercial advertising",
      "logo": "newspaper-logos/cm/guardian-post.jpg",
      "logoExplainer": "Dark slate banner with white text 'The Guardian Post' and red subtitle.",
      "sources": [
        "https://theguardianpostcameroon.com"
      ]
    },
    {
      "id": "cm-le-messager",
      "countryCode": "CM",
      "name": "Le Messager",
      "englishTranslation": "The Messenger",
      "founded": 1979,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "French",
      "headquarters": "Douala",
      "owner": {
        "name": "Pius Njawé Foundation / Free Media Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic pioneer of independent press freedom in Cameroon; founded by legendary journalist Pius Njawé",
      "readership": {
        "metric": "Pioneer independent paper established during single-party rule in 1979",
        "source": "Free Media Group Archive"
      },
      "revenueModel": "Print sales and local advertising",
      "logo": "newspaper-logos/cm/le-messager.svg",
      "logoExplainer": "Classic black serif title 'Le Messager' on white canvas, symbolising historic press freedom in Cameroon.",
      "sources": [
        "https://www.lemessager.cm",
        "https://en.wikipedia.org/wiki/Le_Messager_(Cameroon)"
      ]
    }
  ],
  "CN": [
    {
      "id": "cn-people-s-daily",
      "countryCode": "CN",
      "name": "People's Daily",
      "officialName": "People's Daily (Renmin Ribao)",
      "nativeName": "人民日报",
      "englishTranslation": "People's Daily",
      "founded": 1948,
      "frequency": "Daily newspaper",
      "format": "Official state broadsheet & digital network",
      "language": "Chinese (Simplified), with foreign language editions",
      "headquarters": "Chaoyang District, Beijing",
      "owner": {
        "name": "Central Committee of the Chinese Communist Party",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official newspaper of the Central Committee of the CCP; authoritative voice on national policies, ideological guidelines, and central government affairs",
      "readership": {
        "metric": "Largest print circulation in China with 3.2 million daily copies and global online reach exceeding 100 million across People.cn",
        "source": "People's Daily Annual Report 2023"
      },
      "revenueModel": "State institutional subscriptions, official public notices, and digital media advertising",
      "logo": "newspaper-logos/cn/people-s-daily.svg",
      "logoExplainer": "Crimson red banner featuring golden-yellow calligraphic characters '人民日报' written by Mao Zedong, the defining insignia of China's principal state paper.",
      "sources": [
        "http://en.people.cn",
        "https://en.wikipedia.org/wiki/People%27s_Daily"
      ]
    },
    {
      "id": "cn-huanqiu-shibao",
      "countryCode": "CN",
      "name": "Global Times",
      "officialName": "Huanqiu Shibao",
      "nativeName": "环球时报",
      "englishTranslation": "Global Times",
      "founded": 1993,
      "frequency": "Daily newspaper (Chinese & English editions)",
      "format": "Tabloid & international digital portal",
      "language": "Chinese, English",
      "headquarters": "Beijing",
      "owner": {
        "name": "People's Daily Press",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Nationalist international affairs daily affiliated with People's Daily; vocal coverage of foreign relations, geopolitics, and sovereignty",
      "readership": {
        "metric": "Over 1.5 million daily print circulation in Chinese plus extensive international web traffic on GlobalTimes.cn",
        "source": "Global Times Audience Report 2023"
      },
      "revenueModel": "Print sales, corporate advertising, and digital subscriptions",
      "logo": "newspaper-logos/cn/huanqiu-shibao.svg",
      "logoExplainer": "Burgundy red banner with white typography 'GLOBAL TIMES' and Chinese characters '环球时报', symbolising forthright geopolitical reporting.",
      "sources": [
        "https://www.globaltimes.cn",
        "https://en.wikipedia.org/wiki/Global_Times"
      ]
    },
    {
      "id": "cn-nanfang-ribao",
      "countryCode": "CN",
      "name": "Nanfang Daily",
      "officialName": "Southern Daily",
      "nativeName": "南方日报",
      "englishTranslation": "Southern Daily",
      "founded": 1949,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital multimedia network",
      "language": "Chinese",
      "headquarters": "Guangzhou, Guangdong",
      "owner": {
        "name": "Nanfang Media Group",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official newspaper of the Guangdong Provincial Committee of the CCP; flagship of Nanfang Media Group covering the Greater Bay Area economy",
      "readership": {
        "metric": "Leading regional provincial broadsheet with 950,000+ daily copies across Guangdong, Hong Kong, and Macau",
        "source": "Nanfang Media Group Annual Review 2023"
      },
      "revenueModel": "Provincial institutional subscriptions and regional commercial advertising",
      "logo": "newspaper-logos/cn/nanfang-ribao.svg",
      "logoExplainer": "White banner displaying red calligraphic characters '南方日报', representing the dynamic Greater Bay Area and Guangdong journalism.",
      "sources": [
        "https://www.nanfangdaily.com.cn",
        "https://en.wikipedia.org/wiki/Nanfang_Daily"
      ]
    },
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
      "logo": "newspaper-logos/cn/china-daily.svg",
      "logoExplainer": "Navy blue banner displaying the refined white serif masthead 'CHINA DAILY', representing China's primary international English voice.",
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
      "logo": "newspaper-logos/cn/reference-news.svg",
      "logoExplainer": "White canvas with black calligraphic Chinese characters '参考消息' penned by Lu Xun, symbolising curated international news insights.",
      "sources": [
        "http://www.cankaoxiaoxi.com",
        "https://en.wikipedia.org/wiki/Reference_News"
      ]
    }
  ],
  "CO": [
    {
      "id": "co-el-tiempo",
      "countryCode": "CO",
      "name": "El Tiempo",
      "englishTranslation": "The Time",
      "founded": 1911,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "Spanish",
      "headquarters": "Bogotá",
      "owner": {
        "name": "Grupo Aval (Luis Carlos Sarmiento Angulo)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic centrist newspaper of record in Colombia; national politics, economic policy, peace process analysis, and cultural reporting",
      "readership": {
        "metric": "Largest print circulation in Colombia and premier digital portal reaching over 14 million monthly unique visitors",
        "source": "Casa Editorial El Tiempo Media Profile 2024"
      },
      "revenueModel": "Digital subscriptions, print sales, and cross-media advertising",
      "logo": "newspaper-logos/co/el-tiempo.svg",
      "logoExplainer": "Navy blue title banner with white serif masthead 'EL TIEMPO', representing Colombia's preeminent historic daily newspaper.",
      "sources": [
        "https://www.eltiempo.com",
        "https://en.wikipedia.org/wiki/El_Tiempo_(Colombia)"
      ]
    },
    {
      "id": "co-el-espectador",
      "countryCode": "CO",
      "name": "El Espectador",
      "englishTranslation": "The Spectator",
      "founded": 1887,
      "frequency": "Daily digital portal & weekly Sunday print edition",
      "format": "Tabloid & digital portal",
      "language": "Spanish",
      "headquarters": "Bogotá",
      "owner": {
        "name": "Valorem S.A. (Santo Domingo family)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Colombia's oldest newspaper; historic progressive liberal stance known for legendary courageous investigative journalism against drug cartels and corruption",
      "readership": {
        "metric": "Revered quality investigative outlet with over 9 million monthly digital visitors on elespectador.com",
        "source": "Valorem Annual Report 2023"
      },
      "revenueModel": "Digital subscriber paywall, print sales, and civic journalism grants",
      "logo": "newspaper-logos/co/el-espectador.svg",
      "logoExplainer": "White banner displaying the iconic black gothic masthead 'El Espectador', symbolising heroic defence of press freedom in Colombia.",
      "sources": [
        "https://www.elespectador.com",
        "https://en.wikipedia.org/wiki/El_Espectador_(newspaper)"
      ]
    },
    {
      "id": "co-el-colombiano",
      "countryCode": "CO",
      "name": "El Colombiano",
      "englishTranslation": "The Colombian",
      "founded": 1912,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "Spanish",
      "headquarters": "Medellín, Antioquia",
      "owner": {
        "name": "Grupo Gilinski",
        "type": "Independent commercial media"
      },
      "editorialStance": "Conservative regional broadsheet; principal voice of Antioquia and western Colombia focusing on business, industry, and regional politics",
      "readership": {
        "metric": "Dominant daily newspaper in Medellín and the coffee-growing axis with 3.5 million monthly digital readers",
        "source": "El Colombiano Media Kit 2024"
      },
      "revenueModel": "Print subscriptions, digital access plans, and regional advertising",
      "logo": "newspaper-logos/co/el-colombiano.svg",
      "logoExplainer": "Red banner with clean white serif font 'EL COLOMBIANO', representing century-old journalistic tradition in Antioquia.",
      "sources": [
        "https://www.elcolombiano.com",
        "https://en.wikipedia.org/wiki/El_Colombiano"
      ]
    },
    {
      "id": "co-portafolio",
      "countryCode": "CO",
      "name": "Portafolio",
      "englishTranslation": "Portfolio",
      "founded": 1993,
      "frequency": "Daily financial newspaper (Monday–Friday)",
      "format": "Compact tabloid & financial portal",
      "language": "Spanish",
      "headquarters": "Bogotá",
      "owner": {
        "name": "Casa Editorial El Tiempo",
        "type": "Independent commercial media"
      },
      "editorialStance": "Premier financial and economic daily; Bogota stock market, macroeconomic indicators, foreign investment, and corporate mergers",
      "readership": {
        "metric": "Leading specialized financial daily read across Colombian corporate boardrooms and government ministries",
        "source": "Portafolio Corporate Profile 2023"
      },
      "revenueModel": "Financial corporate subscriptions and business-to-business advertising",
      "logo": "newspaper-logos/co/portafolio.svg",
      "logoExplainer": "Dark slate badge with clean white title 'PORTAFOLIO', symbolising authoritative financial analysis and business intelligence.",
      "sources": [
        "https://www.portafolio.co",
        "https://es.wikipedia.org/wiki/Portafolio_(peri%C3%B3dico)"
      ]
    },
    {
      "id": "co-la-republica",
      "countryCode": "CO",
      "name": "La República",
      "englishTranslation": "The Republic",
      "founded": 1954,
      "frequency": "Daily financial newspaper (Monday–Saturday)",
      "format": "Salmon broadsheet & digital portal",
      "language": "Spanish",
      "headquarters": "Bogotá",
      "owner": {
        "name": "Editorial La República / Grupo Ardila Lülle",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic specialized business and economic newspaper founded by former President Mariano Ospina Pérez; economic policy and market reporting",
      "readership": {
        "metric": "Over 2.8 million monthly digital visitors and widespread institutional print circulation",
        "source": "Grupo Ardila Lülle Media Review 2023"
      },
      "revenueModel": "Corporate subscriptions and commercial banking advertising",
      "logo": "newspaper-logos/co/la-república.svg",
      "logoExplainer": "White banner displaying red and black serif lettering 'La República', representing Colombia's first dedicated economic daily.",
      "sources": [
        "https://www.larepublica.co",
        "https://es.wikipedia.org/wiki/La_Rep%C3%BAblica_(Colombia)"
      ]
    }
  ],
  "CR": [
    {
      "id": "cr-la-nacion",
      "countryCode": "CR",
      "name": "La Nación",
      "englishTranslation": "The Nation",
      "founded": 1946,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Tabloid & digital portal",
      "language": "Spanish",
      "headquarters": "San José",
      "owner": {
        "name": "Grupo Nación S.A.",
        "type": "Independent commercial media"
      },
      "editorialStance": "Costa Rica's historic newspaper of record; center-right liberal-conservative editorial stance focusing on governance, politics, and investigative reporting",
      "readership": {
        "metric": "Over 2.5 million monthly digital readers and Costa Rica's highest circulated print daily",
        "source": "Grupo Nación Memoria Anual 2023"
      },
      "revenueModel": "Digital paywall subscriptions, print sales, and corporate advertising",
      "logo": "newspaper-logos/cr/la-nación.svg",
      "logoExplainer": "Classic black serif masthead 'La Nación' on white canvas, symbolising democratic governance and public interest reporting in Costa Rica.",
      "sources": [
        "https://www.nacion.com",
        "https://en.wikipedia.org/wiki/La_Naci%C3%B3n_(San_Jos%C3%A9)"
      ]
    },
    {
      "id": "cr-la-republica",
      "countryCode": "CR",
      "name": "La República",
      "englishTranslation": "The Republic",
      "founded": 1950,
      "frequency": "Daily business newspaper (Monday–Friday)",
      "format": "Tabloid & digital portal",
      "language": "Spanish",
      "headquarters": "San José",
      "owner": {
        "name": "Republicare Media Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Business, finance, and investment daily; focus on foreign direct investment, free trade zones, and macroeconomic policy",
      "readership": {
        "metric": "Leading specialized financial daily read across business chambers and executive suites in Costa Rica",
        "source": "La República Media Profile 2024"
      },
      "revenueModel": "Corporate subscriptions and financial sector advertising",
      "logo": "newspaper-logos/cr/la-república.svg",
      "logoExplainer": "Vibrant red banner with crisp white serif typography 'LA REPÚBLICA', representing business intelligence and commerce.",
      "sources": [
        "https://www.larepublica.net",
        "https://es.wikipedia.org/wiki/La_Rep%C3%BAblica_(Costa_Rica)"
      ]
    },
    {
      "id": "cr-diario-extra",
      "countryCode": "CR",
      "name": "Diario Extra",
      "englishTranslation": "Extra Daily",
      "founded": 1978,
      "frequency": "Daily newspaper",
      "format": "Tabloid & digital portal",
      "language": "Spanish",
      "headquarters": "San José",
      "owner": {
        "name": "Grupo Extra / Transcomer Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Popular tabloid; crime reporting, labour union advocacy, sports, and working-class social issues",
      "readership": {
        "metric": "Historically Costa Rica's largest street-sale newspaper with 80,000+ daily copies",
        "source": "Diario Extra Media Kit 2023"
      },
      "revenueModel": "Retail print sales and classified advertising",
      "logo": "newspaper-logos/cr/diario-extra.svg",
      "logoExplainer": "Red and yellow title block with bold sans-serif lettering 'DIARIO EXTRA', iconic across Costa Rican kiosks.",
      "sources": [
        "https://www.diarioextra.com",
        "https://es.wikipedia.org/wiki/Diario_Extra_(Costa_Rica)"
      ]
    },
    {
      "id": "cr-crhoy",
      "countryCode": "CR",
      "name": "CRHoy",
      "founded": 2012,
      "frequency": "Continuous 24/7 digital news service",
      "format": "Digital-only news portal",
      "language": "Spanish",
      "headquarters": "San José",
      "owner": {
        "name": "Leonel Baruch / CRHoy Media",
        "type": "Independent commercial media"
      },
      "editorialStance": "Leading digital investigative portal; high-tempo breaking news, investigative exposés, and political accountability",
      "readership": {
        "metric": "Over 5.5 million monthly unique digital visitors; highest digital news traffic in Costa Rica",
        "source": "Similarweb & CRHoy Media Review 2024"
      },
      "revenueModel": "Digital programmatic advertising and sponsored content",
      "logo": "newspaper-logos/cr/crhoy.svg",
      "logoExplainer": "Bold blue and orange typography 'crhoy.com' representing rapid breaking digital journalism in Central America.",
      "sources": [
        "https://www.crhoy.com",
        "https://es.wikipedia.org/wiki/CRHoy"
      ]
    }
  ],
  "CU": [
    {
      "id": "cu-juventud-rebelde",
      "countryCode": "CU",
      "name": "Juventud Rebelde",
      "englishTranslation": "Rebel Youth",
      "founded": 1965,
      "frequency": "Daily newspaper (Tuesday–Sunday)",
      "format": "Tabloid & digital portal",
      "language": "Spanish",
      "headquarters": "Havana",
      "owner": {
        "name": "Union of Young Communists (UJC)",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official newspaper of the Cuban youth organization; cultural development, youth sports, science, and university affairs",
      "readership": {
        "metric": "Second largest print circulation in Cuba with 250,000 daily copies and popular Sunday magazine edition",
        "source": "Editora Juventud Rebelde 2023"
      },
      "revenueModel": "State youth media subsidies and retail print distribution",
      "logo": "newspaper-logos/cu/juventud-rebelde.svg",
      "logoExplainer": "Blue and red badge with bold sans-serif text 'JUVENTUD REBELDE', symbolising revolutionary youth energy and education.",
      "sources": [
        "https://www.juventudrebelde.cu",
        "https://en.wikipedia.org/wiki/Juventud_Rebelde"
      ]
    },
    {
      "id": "cu-trabajadores",
      "countryCode": "CU",
      "name": "Trabajadores",
      "englishTranslation": "Workers",
      "founded": 1970,
      "frequency": "Weekly newspaper (Monday)",
      "format": "Tabloid publication & digital portal",
      "language": "Spanish",
      "headquarters": "Havana",
      "owner": {
        "name": "Central de Trabajadores de Cuba (CTC)",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official organ of the Cuban Trade Union Confederation; labour legislation, worker productivity, industrial management, and cooperative agriculture",
      "readership": {
        "metric": "Distributed across all state enterprises, cooperative farms, and industrial unions nationwide",
        "source": "CTC Departamento de Prensa 2023"
      },
      "revenueModel": "Trade union dues and state publishing subsidy",
      "logo": "newspaper-logos/cu/trabajadores.svg",
      "logoExplainer": "Red and black title banner with bold uppercase typography 'TRABAJADORES', representing trade union solidarity.",
      "sources": [
        "https://www.trabajadores.cu",
        "https://es.wikipedia.org/wiki/Trabajadores_(peri%C3%B3dico)"
      ]
    },
    {
      "id": "cu-cubadebate",
      "countryCode": "CU",
      "name": "Cubadebate",
      "founded": 2003,
      "frequency": "Continuous digital news service",
      "format": "Digital multimedia portal",
      "language": "Spanish, English, French, Portuguese",
      "headquarters": "Havana",
      "owner": {
        "name": "Circle of Anti-Terrorist Journalists of Cuba",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Premier digital news and ideological debate portal; in-depth political essays, international sanctions analysis, and digital fact-checking",
      "readership": {
        "metric": "Most visited Cuban domestic website with over 3 million monthly web sessions",
        "source": "Cubadebate Métricas Digitales 2024"
      },
      "revenueModel": "State digital communication grant allocation",
      "logo": "newspaper-logos/cu/cubadebate.svg",
      "logoExplainer": "Red speech bubble emblem with clean white typography 'cubadebate', symbolising ideological discussion and digital news.",
      "sources": [
        "http://www.cubadebate.cu",
        "https://en.wikipedia.org/wiki/Cubadebate"
      ]
    },
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
      "logo": "newspaper-logos/cu/granma.svg",
      "logoExplainer": "Red banner with bold white lettering 'Granma' and stylized silhouette of the revolutionary yacht, the historic emblem of Cuban state journalism.",
      "sources": [
        "https://www.granma.cu",
        "https://en.wikipedia.org/wiki/Granma_(newspaper)"
      ]
    }
  ],
  "CV": [
    {
      "id": "cv-a-semana",
      "countryCode": "CV",
      "name": "A Semana",
      "englishTranslation": "The Week",
      "founded": 1991,
      "frequency": "Weekly newspaper & digital daily",
      "format": "Tabloid & digital portal",
      "language": "Portuguese",
      "headquarters": "Praia",
      "owner": {
        "name": "Publi-Press Lda",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic independent weekly newspaper; investigative reporting, political analysis, and democratic accountability",
      "readership": {
        "metric": "Leading independent weekly publication in Cape Verde with widespread diaspora readership in Portugal and the US",
        "source": "A Semana Online Profile 2023"
      },
      "revenueModel": "Print sales and digital display advertising",
      "logo": "newspaper-logos/cv/a-semana.svg",
      "logoExplainer": "White canvas displaying bold black masthead 'A SEMANA', symbolising thirty years of independent democratic journalism.",
      "sources": [
        "https://asemana.publ.cv",
        "https://pt.wikipedia.org/wiki/A_Semana"
      ]
    },
    {
      "id": "cv-expressodasilhas",
      "countryCode": "CV",
      "name": "Expresso das Ilhas",
      "englishTranslation": "Islands Express",
      "founded": 2001,
      "frequency": "Weekly newspaper & daily web portal",
      "format": "Tabloid & digital portal",
      "language": "Portuguese",
      "headquarters": "Praia & Mindelo",
      "owner": {
        "name": "Silves & Faria / Grupo Lena",
        "type": "Independent commercial media"
      },
      "editorialStance": "Center-liberal economic and political weekly; focus on archipelago development, business, and cultural heritage",
      "readership": {
        "metric": "Widely read weekly newspaper across São Vicente and Santiago islands",
        "source": "Expresso das Ilhas Editorial Review 2023"
      },
      "revenueModel": "Commercial advertising and newspaper circulation",
      "logo": "newspaper-logos/cv/expressodasilhas.svg",
      "logoExplainer": "Navy blue background with gold-yellow lettering 'Expresso das Ilhas', highlighting maritime connectivity and national reporting.",
      "sources": [
        "https://expressodasilhas.cv",
        "https://pt.wikipedia.org/wiki/Expresso_das_Ilhas"
      ]
    },
    {
      "id": "cv-jornal-i",
      "countryCode": "CV",
      "name": "Jornal i",
      "founded": 2010,
      "frequency": "Weekly newspaper",
      "format": "Tabloid & digital portal",
      "language": "Portuguese",
      "headquarters": "Praia",
      "owner": {
        "name": "Iniciativa Media Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent commercial paper; urban lifestyle, youth culture, culture, and social development in Cape Verde",
      "readership": {
        "metric": "Popular urban weekly paper read across youth and commercial sectors in Praia",
        "source": "Jornal i Archive 2023"
      },
      "revenueModel": "Print sales and local corporate advertising",
      "logo": "newspaper-logos/cv/jornal-i.svg",
      "logoExplainer": "Red title banner featuring crisp white letter 'i' and modern typography, symbolising innovative urban press.",
      "sources": [
        "https://www.facebook.com/jornalicv",
        "https://pt.wikipedia.org/wiki/Cabo_Verde#Comunica%C3%A7%C3%A3o_social"
      ]
    },
    {
      "id": "cv-santiago-magazine",
      "countryCode": "CV",
      "name": "Santiago Magazine",
      "founded": 2017,
      "frequency": "Continuous digital news portal",
      "format": "Digital news portal",
      "language": "Portuguese",
      "headquarters": "Praia, Santiago Island",
      "owner": {
        "name": "Santiago Magazine Lda",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent digital investigative journalism; in-depth political scandals, justice investigations, and governance oversight",
      "readership": {
        "metric": "Leading digital investigative daily portal in Cape Verde with 600,000+ monthly visits",
        "source": "Santiago Magazine Analytics 2024"
      },
      "revenueModel": "Digital banner advertising and sponsored opinion columns",
      "logo": "newspaper-logos/cv/santiago-magazine.svg",
      "logoExplainer": "Dark slate badge with clean white uppercase title 'SANTIAGO MAGAZINE', representing fearless modern digital investigative journalism.",
      "sources": [
        "https://santiagomagazine.cv"
      ]
    }
  ],
  "CY": [
    {
      "id": "cy-cyprus-mail",
      "countryCode": "CY",
      "name": "Cyprus Mail",
      "founded": 1945,
      "frequency": "Daily newspaper & digital portal",
      "format": "Broadsheet & English digital daily",
      "language": "English",
      "headquarters": "Nicosia",
      "owner": {
        "name": "CM Cyprus Mail Ltd",
        "type": "Independent commercial media"
      },
      "editorialStance": "Cyprus's oldest daily newspaper; authoritative English-language daily covering peace negotiations, EU diplomacy, energy, and business",
      "readership": {
        "metric": "Primary news source for English-speaking diplomats, expatriates, and international business leaders in Cyprus",
        "source": "Cyprus Mail Circulation Review 2023"
      },
      "revenueModel": "Digital subscriptions, print sales, and corporate advertising",
      "logo": "newspaper-logos/cy/cyprus-mail.svg",
      "logoExplainer": "Navy blue banner with classical white serif typography 'Cyprus Mail', representing eighty years of authoritative journalism.",
      "sources": [
        "https://cyprus-mail.com",
        "https://en.wikipedia.org/wiki/Cyprus_Mail"
      ]
    },
    {
      "id": "cy-o-phileleftheros",
      "countryCode": "CY",
      "name": "O Phileleftheros",
      "officialName": "O Fileleftheros",
      "nativeName": "Ο Φιλελεύθερος",
      "englishTranslation": "The Liberal",
      "founded": 1955,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital network",
      "language": "Greek",
      "headquarters": "Nicosia",
      "owner": {
        "name": "Phileleftheros Public Company Ltd",
        "type": "Independent commercial media"
      },
      "editorialStance": "Cyprus's largest circulation newspaper of record; center-right stance focusing on the Cyprus problem, Hellenic affairs, and economic governance",
      "readership": {
        "metric": "Largest print circulation in Cyprus and leading web portal philnews.com reaching 3.5 million monthly unique visitors",
        "source": "Phileleftheros Group Annual Review 2023"
      },
      "revenueModel": "Print sales, corporate display advertising, and digital subscriptions",
      "logo": "newspaper-logos/cy/o-phileleftheros.svg",
      "logoExplainer": "Blue banner with classic white Greek typography 'Ο ΦΙΛΕΛΕΥΘΕΡΟΣ', the defining masthead of Cypriot print journalism.",
      "sources": [
        "https://www.philenews.com",
        "https://en.wikipedia.org/wiki/Phileleftheros"
      ]
    },
    {
      "id": "cy-politis",
      "countryCode": "CY",
      "name": "Politis",
      "nativeName": "Πολίτης",
      "englishTranslation": "Citizen",
      "founded": 1999,
      "frequency": "Daily newspaper",
      "format": "Compact tabloid & digital portal",
      "language": "Greek",
      "headquarters": "Nicosia",
      "owner": {
        "name": "Politis Media Group (Yiannis Papadopoulos)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent progressive liberal newspaper; strong proponent of Cypriot reunification, anti-corruption investigations, and social reforms",
      "readership": {
        "metric": "Second largest Greek-language daily newspaper and highly influential digital portal politis.com.cy",
        "source": "Politis Media Review 2024"
      },
      "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
      "logo": "newspaper-logos/cy/politis.svg",
      "logoExplainer": "Red and black logo with modern Greek sans-serif lettering 'ΠΟΛΙΤΗΣ', symbolising democratic citizenship and progressive civic debate.",
      "sources": [
        "https://politis.com.cy",
        "https://en.wikipedia.org/wiki/Politis_(Cyprus)"
      ]
    },
    {
      "id": "cy-haravgi",
      "countryCode": "CY",
      "name": "Haravgi",
      "nativeName": "Χαραυγή",
      "englishTranslation": "Dawn",
      "founded": 1956,
      "frequency": "Daily newspaper",
      "format": "Tabloid publication & digital portal",
      "language": "Greek",
      "headquarters": "Nicosia",
      "owner": {
        "name": "Tilegrafos Media (AKEL affiliated)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Left-wing daily newspaper affiliated with the Progressive Party of Working People (AKEL); trade union rights, social welfare, and bi-communal peace",
      "readership": {
        "metric": "Dedicated nationwide readership across trade unions, cooperative movements, and left-wing civic organizations",
        "source": "Haravgi Publishing Data 2023"
      },
      "revenueModel": "Print sales, party subscriptions, and institutional advertisements",
      "logo": "newspaper-logos/cy/haravgi.svg",
      "logoExplainer": "Red title banner featuring golden sunrise symbol and white Greek lettering 'ΧΑΡΑΥΓΗ', representing a new socialist dawn.",
      "sources": [
        "https://dialogos.com.cy/haravgi",
        "https://en.wikipedia.org/wiki/Haravgi"
      ]
    },
    {
      "id": "cy-simerini",
      "countryCode": "CY",
      "name": "Simerini",
      "nativeName": "Σημερινή",
      "englishTranslation": "Today",
      "founded": 1976,
      "frequency": "Weekly newspaper (Sunday) & daily portal",
      "format": "Broadsheet & digital portal",
      "language": "Greek",
      "headquarters": "Nicosia",
      "owner": {
        "name": "Zeus Group / Dias Publishing",
        "type": "Independent commercial media"
      },
      "editorialStance": "Right-wing nationalist publication; defense of the Republic of Cyprus, Orthodox Christian cultural heritage, and sovereignty critique",
      "readership": {
        "metric": "Prominent Sunday print edition and active digital readership on sigmalive.com network",
        "source": "Dias Publishing Group 2023"
      },
      "revenueModel": "Print retail sales and network television-digital advertising",
      "logo": "newspaper-logos/cy/simerini.svg",
      "logoExplainer": "Deep blue title banner with white serif font 'ΣΗΜΕΡΙΝΗ', symbolising traditional Greek Cypriot conservative press heritage.",
      "sources": [
        "https://simerini.sigmalive.com",
        "https://en.wikipedia.org/wiki/Simerini"
      ]
    }
  ],
  "CZ": [
    {
      "id": "cz-mfdnes",
      "countryCode": "CZ",
      "name": "Mladá fronta DNES",
      "officialName": "MF DNES",
      "nativeName": "Mladá fronta DNES",
      "englishTranslation": "Youth Front Today",
      "founded": 1945,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Broadsheet & digital portal",
      "language": "Czech",
      "headquarters": "Prague",
      "owner": {
        "name": "MAFRA a.s. (Kaprain Group)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Czech Republic's largest quality broadsheet; center-right mainstream news focusing on national politics, European integration, and economics",
      "readership": {
        "metric": "Over 4.5 million monthly unique users across iDNES.cz and highest print circulation among Czech non-tabloid dailies",
        "source": "NetMonitor Czech Republic & MAFRA 2024"
      },
      "revenueModel": "Digital subscriptions (iDNES Premium), print retail sales, and corporate advertising",
      "logo": "newspaper-logos/cz/mfdnes.svg",
      "logoExplainer": "Red and blue emblem featuring bold uppercase text 'MF DNES', representing modern Czech national journalism.",
      "sources": [
        "https://www.idnes.cz",
        "https://en.wikipedia.org/wiki/Mlad%C3%A1_fronta_DNES"
      ]
    },
    {
      "id": "cz-pravo",
      "countryCode": "CZ",
      "name": "Právo",
      "nativeName": "Právo",
      "englishTranslation": "Right / Justice",
      "founded": 1991,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Broadsheet & digital portal",
      "language": "Czech",
      "headquarters": "Prague",
      "owner": {
        "name": "Borgis a.s.",
        "type": "Independent commercial media"
      },
      "editorialStance": "Center-left independent daily newspaper successor to Rudé právo; investigative journalism, legal commentary, and social affairs",
      "readership": {
        "metric": "Leading quality daily in print circulation and partner in Novinky.cz, the Czech Republic's top digital news site (5M+ monthly users)",
        "source": "Borgis a.s. Annual Report 2023"
      },
      "revenueModel": "Print sales, subscriptions, and web traffic partnership with Seznam.cz",
      "logo": "newspaper-logos/cz/právo.svg",
      "logoExplainer": "Classic black serif typography 'Právo' on clean white canvas, symbolising justice, legal rights, and democratic accountability.",
      "sources": [
        "https://www.novinky.cz",
        "https://en.wikipedia.org/wiki/Pr%C3%A1vo"
      ]
    },
    {
      "id": "cz-hospodarske-noviny",
      "countryCode": "CZ",
      "name": "Hospodářské noviny",
      "nativeName": "Hospodářské noviny",
      "englishTranslation": "Economic Newspaper",
      "founded": 1990,
      "frequency": "Daily financial newspaper (Monday–Friday)",
      "format": "Broadsheet & digital portal",
      "language": "Czech",
      "headquarters": "Prague",
      "owner": {
        "name": "Economia a.s. (Zdeněk Bakala)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Premier financial and economic daily; Prague Stock Exchange, corporate strategy, European single market regulations, and macroeconomic policy",
      "readership": {
        "metric": "Benchmark business newspaper read by corporate leaders and policymakers with 1.8M monthly digital visitors",
        "source": "Economia Media Kit 2024"
      },
      "revenueModel": "Digital paywall subscriptions (HN.cz) and financial sector advertising",
      "logo": "newspaper-logos/cz/hospodářské-noviny.svg",
      "logoExplainer": "Navy blue banner with clean white typography 'Hospodářské noviny', reflecting market integrity and economic analysis.",
      "sources": [
        "https://hn.cz",
        "https://en.wikipedia.org/wiki/Hospod%C3%A1%C5%99sk%C3%A9_noviny"
      ]
    },
    {
      "id": "cz-lidove-noviny",
      "countryCode": "CZ",
      "name": "Lidové noviny",
      "nativeName": "Lidové noviny",
      "englishTranslation": "The People's Newspaper",
      "founded": 1893,
      "frequency": "Daily newspaper (transitioned to digital daily)",
      "format": "Digital daily & weekend print edition",
      "language": "Czech",
      "headquarters": "Prague",
      "owner": {
        "name": "MAFRA a.s. (Kaprain Group)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic intellectual broadsheet associated with Karel Čapek and Václav Havel; conservative-liberal cultural commentary and public policy debate",
      "readership": {
        "metric": "Historic paper of record with strong cultural resonance and 1.5 million monthly digital visitors on Lidovky.cz",
        "source": "MAFRA Publishing Report 2023"
      },
      "revenueModel": "Digital subscriptions and specialized cultural advertising",
      "logo": "newspaper-logos/cz/lidové-noviny.svg",
      "logoExplainer": "Historic black serif masthead 'Lidové noviny' on white ground, symbolising 130 years of Czech intellectual journalism.",
      "sources": [
        "https://www.lidovky.cz",
        "https://en.wikipedia.org/wiki/Lidov%C3%A9_noviny"
      ]
    },
    {
      "id": "cz-blesk",
      "countryCode": "CZ",
      "name": "Blesk",
      "nativeName": "Blesk",
      "englishTranslation": "Lightning",
      "founded": 1992,
      "frequency": "Daily newspaper",
      "format": "Tabloid & digital portal",
      "language": "Czech",
      "headquarters": "Prague",
      "owner": {
        "name": "Czech News Center a.s.",
        "type": "Independent commercial media"
      },
      "editorialStance": "Mass-circulation popular tabloid; breaking news, consumer advocacy, celebrity profiles, and sports",
      "readership": {
        "metric": "Highest print circulation in the Czech Republic (~160,000 daily copies) and 4.2M monthly users on Blesk.cz",
        "source": "Czech News Center Annual Review 2024"
      },
      "revenueModel": "Retail print sales, digital display advertising, and consumer media services",
      "logo": "newspaper-logos/cz/blesk.svg",
      "logoExplainer": "Vivid red rectangular banner with bold yellow italic text 'BLESK', iconic across Czech newsstands.",
      "sources": [
        "https://www.blesk.cz",
        "https://en.wikipedia.org/wiki/Blesk_(newspaper)"
      ]
    }
  ],
  "DE": [
    {
      "id": "de-frankfurter-allgemeine-zeitung",
      "countryCode": "DE",
      "name": "Frankfurter Allgemeine Zeitung",
      "officialName": "FAZ",
      "nativeName": "Frankfurter Allgemeine Zeitung",
      "englishTranslation": "Frankfurt General Newspaper",
      "founded": 1949,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Broadsheet & digital network",
      "language": "German",
      "headquarters": "Hellerhofstraße, Frankfurt am Main, Hesse",
      "owner": {
        "name": "FAZIT-Stiftung (Non-profit Foundation)",
        "type": "Independent trust / foundation"
      },
      "editorialStance": "Germany's preeminent conservative-liberal newspaper of record; owned by an independent foundation to ensure total editorial freedom; internationally renowned for deep political analysis, economic theory (ordoliberalism), cultural Feuilleton, and global foreign correspondence",
      "readership": {
        "metric": "Over 200,000 daily print circulation and more than 300,000 paid digital subscribers (F+ / FAZ.NET) reaching 12+ million monthly unique users",
        "source": "IVW (Informationsgemeinschaft zur Feststellung der Verbreitung von Werbeträgern) 2024"
      },
      "revenueModel": "Digital paywall subscriptions, print circulation, and corporate display advertising",
      "logo": "newspaper-logos/de/frankfurter-allgemeine-zeitung.svg",
      "logoExplainer": "Historic Fraktur blackletter masthead 'Frankfurter Allgemeine' on white canvas, the definitive typographic symbol of German quality journalism.",
      "sources": [
        "https://www.faz.net",
        "https://en.wikipedia.org/wiki/Frankfurter_Allgemeine_Zeitung"
      ]
    },
    {
      "id": "de-sueddeutsche-zeitung",
      "countryCode": "DE",
      "name": "Süddeutsche Zeitung",
      "officialName": "SZ",
      "nativeName": "Süddeutsche Zeitung",
      "englishTranslation": "South German Newspaper",
      "founded": 1945,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Broadsheet & digital network",
      "language": "German",
      "headquarters": "Hultschiner Straße, Munich, Bavaria",
      "owner": {
        "name": "Südwestdeutsche Medienholding (SWMH)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Germany's largest quality subscription daily; center-left progressive liberal stance; world-famous investigative journalism department that broke the Panama Papers and Paradise Papers",
      "readership": {
        "metric": "Over 310,000 paid circulation including 260,000+ digital subscribers (SZ Plus) and 14 million monthly digital readers on sz.de",
        "source": "IVW Deutschland Q1 2024"
      },
      "revenueModel": "Digital paywall subscriptions, print sales, and commercial display advertising",
      "logo": "newspaper-logos/de/süddeutsche-zeitung.svg",
      "logoExplainer": "Gothic serif masthead 'Süddeutsche Zeitung' featuring the historic Munich cathedral (Frauenturm) silhouette, symbolising investigative authority.",
      "sources": [
        "https://www.sueddeutsche.de",
        "https://en.wikipedia.org/wiki/S%C3%BCddeutsche_Zeitung"
      ]
    },
    {
      "id": "de-die-welt",
      "countryCode": "DE",
      "name": "Die Welt",
      "nativeName": "Die Welt",
      "englishTranslation": "The World",
      "founded": 1946,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital network (WELT)",
      "language": "German",
      "headquarters": "Axel-Springer-Straße, Berlin",
      "owner": {
        "name": "Axel Springer SE",
        "type": "Independent commercial media"
      },
      "editorialStance": "National conservative broadsheet founded in Hamburg by British occupation authorities; free-market advocacy, transatlantic partnership, defense policy, and 24-hour TV news integration (WELT TV)",
      "readership": {
        "metric": "Over 200,000 digital subscribers (WELTplus) and top-tier digital news destination with 18 million monthly unique visitors",
        "source": "Axel Springer Financial Results 2024"
      },
      "revenueModel": "Digital subscriptions, television broadcasting revenue, and programmatic advertising",
      "logo": "newspaper-logos/de/die-welt.svg",
      "logoExplainer": "Deep blue rectangular banner with bold white capital typography 'WELT', representing transatlantic conservatism and 24-hour news.",
      "sources": [
        "https://www.welt.de",
        "https://en.wikipedia.org/wiki/Die_Welt"
      ]
    },
    {
      "id": "de-handelsblatt",
      "countryCode": "DE",
      "name": "Handelsblatt",
      "nativeName": "Handelsblatt",
      "englishTranslation": "Commerce Sheet",
      "founded": 1946,
      "frequency": "Daily business newspaper (Monday–Friday)",
      "format": "Tabloid format broadsheet & financial network",
      "language": "German",
      "headquarters": "Toulouser Allee, Düsseldorf, North Rhine-Westphalia",
      "owner": {
        "name": "Handelsblatt Media Group (Dieter von Holtzbrinck Medien)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Germany's preeminent financial and economic daily newspaper; DAX stock exchange analysis, German Mittelstand industrial engineering, automotive transition, and fiscal discipline",
      "readership": {
        "metric": "Over 140,000 daily paid circulation including 100,000+ digital subscribers; primary business paper for the German industrial executive suite",
        "source": "Handelsblatt Media Group Review 2024"
      },
      "revenueModel": "Corporate subscriptions, specialized economic research, and B2B financial advertising",
      "logo": "newspaper-logos/de/handelsblatt.svg",
      "logoExplainer": "Signature orange and black title banner with bold uppercase typography 'Handelsblatt', iconic across German corporate boardrooms.",
      "sources": [
        "https://www.handelsblatt.com",
        "https://en.wikipedia.org/wiki/Handelsblatt"
      ]
    },
    {
      "id": "de-bild",
      "countryCode": "DE",
      "name": "Bild",
      "officialName": "Bild-Zeitung",
      "nativeName": "Bild",
      "englishTranslation": "Picture",
      "founded": 1952,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Tabloid publication & digital network",
      "language": "German",
      "headquarters": "Berlin",
      "owner": {
        "name": "Axel Springer SE",
        "type": "Independent commercial media"
      },
      "editorialStance": "Europe's largest circulation daily newspaper; sensationalist populist reporting, celebrity exposés, consumer campaigns, politics, and Bundesliga sports",
      "readership": {
        "metric": "Over 1.1 million daily print copies and more than 680,000 paid digital subscribers on BILDplus; highest reach daily news brand in Europe",
        "source": "IVW Deutschland & Axel Springer 2024"
      },
      "revenueModel": "Street print sales, BILDplus digital paywall, and high-volume commercial advertising",
      "logo": "newspaper-logos/de/bild.svg",
      "logoExplainer": "Iconic red square emblem with white bold uppercase lettering 'BILD', the most recognizable tabloid logo across Europe.",
      "sources": [
        "https://www.bild.de",
        "https://en.wikipedia.org/wiki/Bild"
      ]
    }
  ],
  "DJ": [
    {
      "id": "dj-la-nation",
      "countryCode": "DJ",
      "name": "La Nation",
      "englishTranslation": "The Nation",
      "founded": 1980,
      "frequency": "Daily newspaper (Monday–Thursday & Sunday)",
      "format": "Official state broadsheet & digital portal",
      "language": "French",
      "headquarters": "Djibouti City",
      "owner": {
        "name": "Republic of Djibouti (Ministère de la Communication)",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official national public daily newspaper; presidential decrees, port infrastructure developments (Doraleh), and Horn of Africa diplomacy",
      "readership": {
        "metric": "Only national daily French-language print newspaper in Djibouti, read throughout civil service and diplomatic missions",
        "source": "La Nation Direction Générale 2023"
      },
      "annualPublicFunding": {
        "total": "DJF 90 million (~US$505,000) government operating budget",
        "perCapita": "DJF 85 / person / year (~US$0.48)"
      },
      "revenueModel": "Direct state budget appropriation, print sales, and official legal notices",
      "logo": "newspaper-logos/dj/la-nation.svg",
      "logoExplainer": "Emerald green title banner with crisp white typography 'LA NATION', embodying Djibouti's national identity and public communication.",
      "sources": [
        "https://www.lanation.dj",
        "https://fr.wikipedia.org/wiki/La_Nation_(Djibouti)"
      ]
    },
    {
      "id": "dj-al-qarn",
      "countryCode": "DJ",
      "name": "Al-Qarn",
      "nativeName": "القرن",
      "englishTranslation": "The Horn",
      "founded": 1997,
      "frequency": "Weekly newspaper (Thursday)",
      "format": "Official state Arabic broadsheet & portal",
      "language": "Arabic",
      "headquarters": "Djibouti City",
      "owner": {
        "name": "Republic of Djibouti (Ministère de la Communication)",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official state Arabic-language publication; Arab League relations, Islamic affairs, education, and Red Sea maritime commerce",
      "readership": {
        "metric": "Primary Arabic publication in Djibouti read by scholars, religious institutions, and Arab diplomatic missions",
        "source": "Ministère de la Communication de Djibouti 2023"
      },
      "revenueModel": "State budget funding and public notices",
      "logo": "newspaper-logos/dj/al-qarn.svg",
      "logoExplainer": "Green and white banner featuring elegant Arabic calligraphy 'القرن' (The Horn), reflecting Arab League heritage.",
      "sources": [
        "https://www.alqarn.dj"
      ]
    },
    {
      "id": "dj-djib-post",
      "countryCode": "DJ",
      "name": "Djib-Post",
      "founded": 2016,
      "frequency": "Continuous digital news service",
      "format": "Digital news portal",
      "language": "French",
      "headquarters": "Djibouti City",
      "owner": {
        "name": "Djib-Post Media Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Digital news platform; urban life, technological entrepreneurship, youth initiatives, and Horn of Africa economic news",
      "readership": {
        "metric": "Over 350,000 monthly digital visits across Djibouti and international diaspora in France and Canada",
        "source": "Djib-Post Audience Analytics 2024"
      },
      "revenueModel": "Digital display advertising and sponsored corporate media",
      "logo": "newspaper-logos/dj/djib-post.svg",
      "logoExplainer": "Modern navy blue and cyan banner featuring 'DJIB-POST', symbolising youth-driven digital journalism.",
      "sources": [
        "https://djibpost.com"
      ]
    },
    {
      "id": "dj-human-village",
      "countryCode": "DJ",
      "name": "Human Village",
      "founded": 2008,
      "frequency": "Monthly cultural & economic journal",
      "format": "Digital magazine & analytical portal",
      "language": "French",
      "headquarters": "Djibouti City",
      "owner": {
        "name": "Association Human Village",
        "type": "Independent trust / foundation"
      },
      "editorialStance": "Independent socio-cultural and economic journal; environmental conservation, architectural heritage, and historical research on Djibouti",
      "readership": {
        "metric": "Highly regarded journal read by researchers, historians, and educators throughout the Red Sea region",
        "source": "Human Village Association 2023"
      },
      "revenueModel": "Cultural foundation grants and publication subscriptions",
      "logo": "newspaper-logos/dj/human-village.svg",
      "logoExplainer": "Warm terracotta badge with white typography 'Human Village', symbolising humanism, culture, and environmental awareness.",
      "sources": [
        "http://www.human-village.org",
        "https://fr.wikipedia.org/wiki/Culture_de_Djibouti"
      ]
    }
  ],
  "DK": [
    {
      "id": "dk-berlingske",
      "countryCode": "DK",
      "name": "Berlingske",
      "officialName": "Berlingske Tidende",
      "nativeName": "Berlingske",
      "englishTranslation": "Berling's Times (named after founder Ernst Henrich Berling)",
      "founded": 1749,
      "frequency": "Daily newspaper",
      "format": "Berliner & digital portal",
      "language": "Danish",
      "headquarters": "Copenhagen",
      "owner": {
        "name": "Berlingske Media (DPG Media)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Denmark's oldest newspaper and one of the world's oldest continuously published dailies; conservative-liberal newspaper of record",
      "readership": {
        "metric": "Over 1.8 million monthly digital readers and premier quality daily in Copenhagen",
        "source": "Kantar Gallup Denmark & Berlingske Media 2024"
      },
      "revenueModel": "Digital paywall subscriptions, print circulation, and corporate advertising",
      "logo": "newspaper-logos/dk/berlingske.svg",
      "logoExplainer": "Classical black serif typography 'Berlingske' on clean white canvas, representing 275 years of Danish journalistic excellence.",
      "sources": [
        "https://www.berlingske.dk",
        "https://en.wikipedia.org/wiki/Berlingske"
      ]
    },
    {
      "id": "dk-politiken",
      "countryCode": "DK",
      "name": "Politiken",
      "nativeName": "Politiken",
      "englishTranslation": "The Politics / Policy",
      "founded": 1884,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "Danish",
      "headquarters": "Rådhuspladsen, Copenhagen",
      "owner": {
        "name": "JP/Politikens Hus",
        "type": "Independent trust / foundation"
      },
      "editorialStance": "Leading Danish social-liberal intellectual daily founded by Edvard Brandes; cultural critique, climate journalism, and international human rights",
      "readership": {
        "metric": "Over 2 million monthly digital visitors and largest quality subscription circulation in Denmark",
        "source": "JP/Politikens Hus Annual Report 2023"
      },
      "revenueModel": "Digital reader subscriptions, print sales, and cultural advertisements",
      "logo": "newspaper-logos/dk/politiken.svg",
      "logoExplainer": "Historic gothic and serif masthead 'POLITIKEN' anchored at Copenhagen's City Hall Square, symbolising progressive civic journalism.",
      "sources": [
        "https://politiken.dk",
        "https://en.wikipedia.org/wiki/Politiken"
      ]
    },
    {
      "id": "dk-jyllands-posten",
      "countryCode": "DK",
      "name": "Jyllands-Posten",
      "officialName": "Morgenavisen Jyllands-Posten",
      "nativeName": "Jyllands-Posten",
      "englishTranslation": "The Jutland Post",
      "founded": 1871,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "Danish",
      "headquarters": "Aarhus & Copenhagen",
      "owner": {
        "name": "JP/Politikens Hus",
        "type": "Independent trust / foundation"
      },
      "editorialStance": "Center-right liberal-conservative broadsheet; voice of Jutland and national business, free-market economics, and investigative journalism",
      "readership": {
        "metric": "Over 1.7 million monthly digital users and historically Denmark's highest circulated broadsheet",
        "source": "JP/Politikens Hus Media Review 2024"
      },
      "revenueModel": "Print sales, digital subscriptions, and commercial advertising",
      "logo": "newspaper-logos/dk/jyllands-posten.svg",
      "logoExplainer": "Bold black serif title 'Jyllands-Posten' on white background, representing Jutland business resilience and national reporting.",
      "sources": [
        "https://jyllands-posten.dk",
        "https://en.wikipedia.org/wiki/Jyllands-Posten"
      ]
    },
    {
      "id": "dk-borsen",
      "countryCode": "DK",
      "name": "Børsen",
      "officialName": "Dagbladet Børsen",
      "nativeName": "Børsen",
      "englishTranslation": "The Exchange",
      "founded": 1896,
      "frequency": "Daily business newspaper (Monday–Friday)",
      "format": "Salmon broadsheet & digital portal",
      "language": "Danish",
      "headquarters": "Copenhagen",
      "owner": {
        "name": "Bonnier Group (49.9%) & JP/Politikens Hus (49.9%)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Denmark's preeminent financial and business daily; Copenhagen Stock Exchange, maritime shipping (Mærsk), green transition, and macroeconomic policy",
      "readership": {
        "metric": "Read by 85% of Danish top corporate executives and institutional investors",
        "source": "Dagbladet Børsen Audience Report 2023"
      },
      "revenueModel": "Corporate subscriptions and financial market advertising",
      "logo": "newspaper-logos/dk/børsen.svg",
      "logoExplainer": "Classic serif masthead 'BØRSEN' printed on signature salmon-pink paper, symbolising Nordic financial leadership.",
      "sources": [
        "https://borsen.dk",
        "https://en.wikipedia.org/wiki/Dagbladet_B%C3%B8rsen"
      ]
    },
    {
      "id": "dk-ekstra-bladet",
      "countryCode": "DK",
      "name": "Ekstra Bladet",
      "nativeName": "Ekstra Bladet",
      "englishTranslation": "The Extra Sheet",
      "founded": 1904,
      "frequency": "Daily newspaper",
      "format": "Tabloid & multimedia portal",
      "language": "Danish",
      "headquarters": "Copenhagen",
      "owner": {
        "name": "JP/Politikens Hus",
        "type": "Independent trust / foundation"
      },
      "editorialStance": "Iconic Danish investigative tabloid; aggressive political exposés, consumer advocacy, sports, and working-class watchdog journalism",
      "readership": {
        "metric": "Over 3.2 million monthly unique digital visitors on eb.dk, Denmark's most read online news brand",
        "source": "Dansk Online Index & Kantar 2024"
      },
      "revenueModel": "Digital subscriptions (+Ekstra), programmatic ads, and street print sales",
      "logo": "newspaper-logos/dk/ekstra-bladet.svg",
      "logoExplainer": "Stark black and yellow badge with bold typography 'EKSTRA BLADET', iconic for anti-authoritarian investigative reporting.",
      "sources": [
        "https://ekstrabladet.dk",
        "https://en.wikipedia.org/wiki/Ekstra_Bladet"
      ]
    }
  ],
  "DM": [
    {
      "id": "dm-the-chronicle",
      "countryCode": "DM",
      "name": "The Chronicle",
      "founded": 1909,
      "frequency": "Weekly newspaper (Friday)",
      "format": "Tabloid publication & digital portal",
      "language": "English",
      "headquarters": "Roseau",
      "owner": {
        "name": "Chronicle Newspaper Ltd",
        "type": "Independent commercial media"
      },
      "editorialStance": "Dominica's historic newspaper of record; comprehensive coverage of parliamentary debates, island agriculture, regional CARICOM news, and civic life",
      "readership": {
        "metric": "Over 110 years of continuous publishing; leading historic print newspaper in Dominica",
        "source": "Dominica Chronicle Media Profile 2023"
      },
      "revenueModel": "Print sales, legal notices, and commercial display advertising",
      "logo": "newspaper-logos/dm/the-chronicle.svg",
      "logoExplainer": "Classic black serif masthead 'The Chronicle' on white canvas, symbolising over a century of print journalism in Dominica.",
      "sources": [
        "https://thechronicle.dm",
        "https://en.wikipedia.org/wiki/The_Chronicle_(Dominica)"
      ]
    },
    {
      "id": "dm-dominica-news-online",
      "countryCode": "DM",
      "name": "Dominica News Online",
      "officialName": "Dominica News Online (DNO)",
      "founded": 2007,
      "frequency": "Continuous 24/7 digital news service",
      "format": "Digital-only news portal",
      "language": "English",
      "headquarters": "Roseau",
      "owner": {
        "name": "Duravision Inc.",
        "type": "Independent commercial media"
      },
      "editorialStance": "Dominica's premier digital breaking news portal; high-tempo reporting, community updates, weather monitoring, and national politics",
      "readership": {
        "metric": "Over 800,000 monthly digital visits across Dominica and extensive diaspora readership in the UK and North America",
        "source": "Dominica News Online Audience Report 2024"
      },
      "revenueModel": "Digital banner advertising and diaspora community promotions",
      "logo": "newspaper-logos/dm/dominica-news-online.svg",
      "logoExplainer": "Cyan and navy banner with white lettering 'DOMINICA NEWS ONLINE', representing modern real-time island reporting.",
      "sources": [
        "https://dominicanewsonline.com"
      ]
    },
    {
      "id": "dm-the-sun-dominica",
      "countryCode": "DM",
      "name": "The Sun",
      "founded": 1999,
      "frequency": "Weekly newspaper",
      "format": "Tabloid publication",
      "language": "English",
      "headquarters": "Roseau",
      "owner": {
        "name": "Sun Printing & Publishing Ltd",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent investigative weekly; political commentary, environmental conservation, and social accountability",
      "readership": {
        "metric": "Widely read independent weekly print paper in Roseau and Portsmouth",
        "source": "Sun Publishing Review 2023"
      },
      "revenueModel": "Print sales and local business advertising",
      "logo": "newspaper-logos/dm/the-sun-dominica.svg",
      "logoExplainer": "Bright golden sunburst icon with bold black typography 'The Sun', symbolising vibrant truth and community journalism.",
      "sources": [
        "https://sundominica.com"
      ]
    },
    {
      "id": "dm-dominica-vibes",
      "countryCode": "DM",
      "name": "Dominica Vibes News",
      "founded": 2010,
      "frequency": "Continuous digital news portal",
      "format": "Digital multimedia portal",
      "language": "English",
      "headquarters": "Roseau",
      "owner": {
        "name": "Vibes Media Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Digital news and lifestyle portal; cultural events, World Creole Music Festival coverage, sports, and youth news",
      "readership": {
        "metric": "Popular digital platform engaging youth and cultural sectors in Dominica",
        "source": "Dominica Vibes Audience Review 2023"
      },
      "revenueModel": "Digital display ads and festival event promotions",
      "logo": "newspaper-logos/dm/dominica-vibes.svg",
      "logoExplainer": "Green and yellow banner with modern typography 'DOMINICA VIBES', reflecting the nature island's cultural vitality.",
      "sources": [
        "https://www.dominicavibes.dm"
      ]
    },
    {
      "id": "dm-ebean-news",
      "countryCode": "DM",
      "name": "EmoNews",
      "founded": 2018,
      "frequency": "Continuous digital news & live streaming",
      "format": "Digital video news & portal",
      "language": "English",
      "headquarters": "Roseau",
      "owner": {
        "name": "EmoNews Media Network",
        "type": "Independent commercial media"
      },
      "editorialStance": "Rapidly growing digital native news channel; live on-the-scene broadcasts, community interviews, and disaster response reporting",
      "readership": {
        "metric": "High social media engagement with over 150,000 active community followers across the Caribbean",
        "source": "EmoNews Media Analytics 2024"
      },
      "revenueModel": "Social media monetization, local sponsorships, and live stream advertising",
      "logo": "newspaper-logos/dm/ebean-news.svg",
      "logoExplainer": "Red and black badge with bold white lettering 'EMONEWS', representing dynamic mobile-first island reporting.",
      "sources": [
        "https://emonewsdm.com"
      ]
    }
  ],
  "DO": [
    {
      "id": "do-listin-diario",
      "countryCode": "DO",
      "name": "Listín Diario",
      "englishTranslation": "Daily List",
      "founded": 1889,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "Spanish",
      "headquarters": "Santo Domingo",
      "owner": {
        "name": "Grupo de Comunicaciones Corripio",
        "type": "Independent commercial media"
      },
      "editorialStance": "Dominican Republic's dean of national journalism and historic newspaper of record; national politics, economic policy, legal affairs, and arts",
      "readership": {
        "metric": "Over 8 million monthly unique digital visitors on listindiario.com and highest broadsheet print circulation in the nation",
        "source": "Grupo Corripio Informe Anual 2023"
      },
      "revenueModel": "Digital subscriptions, print circulation, and corporate display advertising",
      "logo": "newspaper-logos/do/listín-diario.svg",
      "logoExplainer": "Classic black gothic masthead 'Listín Diario' on white canvas, symbolising over 135 years of Dominican press heritage.",
      "sources": [
        "https://listindiario.com",
        "https://en.wikipedia.org/wiki/List%C3%ADn_Diario"
      ]
    },
    {
      "id": "do-diario-libre",
      "countryCode": "DO",
      "name": "Diario Libre",
      "englishTranslation": "Free Daily",
      "founded": 2001,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Berliner free daily & premium digital portal",
      "language": "Spanish",
      "headquarters": "Santo Domingo",
      "owner": {
        "name": "Grupo Puntacana (Rainieri family)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Pioneering free daily newspaper; modern design, investigative journalism, tourism economics, and transparent public governance",
      "readership": {
        "metric": "Largest daily print circulation in the Caribbean (~150,000 daily copies) and 9+ million monthly digital visitors",
        "source": "Diario Libre Media Kit 2024"
      },
      "revenueModel": "Commercial print display advertising and digital programmatic revenue",
      "logo": "newspaper-logos/do/diario-libre.svg",
      "logoExplainer": "Deep blue banner with clean white sans-serif typography 'Diario Libre', reflecting modern investigative and independent reporting.",
      "sources": [
        "https://www.diariolibre.com",
        "https://en.wikipedia.org/wiki/Diario_Libre"
      ]
    },
    {
      "id": "do-hoy",
      "countryCode": "DO",
      "name": "Hoy",
      "englishTranslation": "Today",
      "founded": 1981,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "Spanish",
      "headquarters": "Santo Domingo",
      "owner": {
        "name": "Grupo de Comunicaciones Corripio",
        "type": "Independent commercial media"
      },
      "editorialStance": "Mainstream quality daily; national political analysis, investigative reports, economic development, and cultural essays",
      "readership": {
        "metric": "Widely circulated across institutional and commercial sectors with over 4.5 million monthly digital readers",
        "source": "Periódico Hoy Memoria 2023"
      },
      "revenueModel": "Print sales, official legal notices, and advertising",
      "logo": "newspaper-logos/do/hoy.svg",
      "logoExplainer": "Vibrant red title banner with bold white lettering 'HOY', representing immediate daily news and editorial vitality.",
      "sources": [
        "https://hoy.com.do",
        "https://es.wikipedia.org/wiki/Hoy_(Rep%C3%BAblica_Dominicana)"
      ]
    },
    {
      "id": "do-el-caribe",
      "countryCode": "DO",
      "name": "El Caribe",
      "englishTranslation": "The Caribbean",
      "founded": 1948,
      "frequency": "Daily newspaper",
      "format": "Tabloid & digital portal",
      "language": "Spanish",
      "headquarters": "Santo Domingo",
      "owner": {
        "name": "Multimedios del Caribe",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic daily newspaper founded in 1948; political commentary, regional Caribbean affairs, sports (baseball), and judiciary reporting",
      "readership": {
        "metric": "Key national morning newspaper paired with CDN Canal 37 television network for cross-media reach",
        "source": "Multimedios del Caribe 2023"
      },
      "revenueModel": "Print circulation and multimedia broadcast-digital advertising",
      "logo": "newspaper-logos/do/el-caribe.svg",
      "logoExplainer": "Navy blue background with bold serif typography 'elCaribe', symbolising Caribbean identity and journalistic integrity.",
      "sources": [
        "https://www.elcaribe.com.do",
        "https://en.wikipedia.org/wiki/El_Caribe_(newspaper)"
      ]
    },
    {
      "id": "do-el-dia",
      "countryCode": "DO",
      "name": "El Día",
      "englishTranslation": "The Day",
      "founded": 2002,
      "frequency": "Daily newspaper (Monday–Friday)",
      "format": "Compact free daily & digital portal",
      "language": "Spanish",
      "headquarters": "Santo Domingo",
      "owner": {
        "name": "Grupo de Comunicaciones Corripio",
        "type": "Independent commercial media"
      },
      "editorialStance": "Morning commuter newspaper; concise national news, urban affairs, health, education, and entertainment",
      "readership": {
        "metric": "Distributed freely to commuters across Santo Domingo and Santiago with 120,000+ daily copies",
        "source": "El Día Media Distribution 2024"
      },
      "revenueModel": "Commercial print advertising and digital web sponsorships",
      "logo": "newspaper-logos/do/el-día.svg",
      "logoExplainer": "Yellow and red masthead featuring bold typography 'El Día', iconic for morning urban commuter news in the capital.",
      "sources": [
        "https://eldia.com.do",
        "https://es.wikipedia.org/wiki/El_D%C3%ADa_(Rep%C3%BAblica_Dominicana)"
      ]
    }
  ],
  "DZ": [
    {
      "id": "dz-el-watan",
      "countryCode": "DZ",
      "name": "El Watan",
      "englishTranslation": "The Homeland",
      "founded": 1990,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "French",
      "headquarters": "Algiers",
      "owner": {
        "name": "SPA El Watan",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent francophone daily; secular, investigative, and critical news coverage",
      "readership": {
        "metric": "Leading francophone quality daily in Algeria (~80,000 daily print, 3M monthly digital visitors)",
        "source": "Reuters Institute Digital News Report 2023"
      },
      "revenueModel": "Print sales, commercial advertising, and digital subscriptions",
      "logo": "newspaper-logos/dz/el-watan.png",
      "logoExplainer": "Classic serif masthead in dark charcoal, representing prestigious independent francophone journalism.",
      "sources": [
        "https://elwatan-dz.com",
        "https://en.wikipedia.org/wiki/El_Watan"
      ]
    },
    {
      "id": "dz-echorouk",
      "countryCode": "DZ",
      "name": "Echorouk El Yaoumi",
      "englishTranslation": "The Daily Sunrise",
      "founded": 1991,
      "frequency": "Daily publication",
      "format": "Tabloid & digital portal",
      "language": "Arabic",
      "headquarters": "Algiers",
      "owner": {
        "name": "Echorouk Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Popular conservative Arabic daily; breaking news, sports, and populist commentary",
      "readership": {
        "metric": "Over 4 million monthly online visitors across mobile and web platforms",
        "source": "Echorouk Media Kit 2024"
      },
      "revenueModel": "Print sales, digital advertising, and TV cross-promotion",
      "logo": "newspaper-logos/dz/echorouk.png",
      "logoExplainer": "Bright orange sun emblem next to bold Arabic typography, representing morning news and high-volume readership.",
      "sources": [
        "https://www.echoroukonline.com",
        "https://en.wikipedia.org/wiki/Echorouk_El_Yaoumi"
      ]
    },
    {
      "id": "dz-liberte",
      "countryCode": "DZ",
      "name": "Liberté",
      "englishTranslation": "Liberty",
      "founded": 1992,
      "frequency": "Daily publication (historic)",
      "format": "Print daily & digital portal",
      "language": "French",
      "headquarters": "Algiers",
      "owner": {
        "name": "SAEC Liberté",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent secular francophone paper; democracy, human rights, and economic reform",
      "readership": {
        "metric": "Historic pillar of independent Algerian press during the 1990s and 2000s",
        "source": "Algerian Press Archive"
      },
      "revenueModel": "Print sales and private sector advertising",
      "logo": "newspaper-logos/dz/liberte.jpg",
      "logoExplainer": "Royal blue sans-serif title logo representing secular democratic ideals and free press principles.",
      "sources": [
        "https://www.liberte-algerie.com",
        "https://en.wikipedia.org/wiki/Libert%C3%A9_(Algerian_newspaper)"
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
      "logo": "newspaper-logos/dz/el-khabar.jpg",
      "logoExplainer": "Bold Arabic calligraphic masthead in white on a deep crimson background, symbolizing national Arab-language reporting.",
      "sources": [
        "https://www.elkhabar.com",
        "https://en.wikipedia.org/wiki/El_Khabar"
      ]
    }
  ],
  "EC": [
    {
      "id": "ec-el-comercio",
      "countryCode": "EC",
      "name": "El Comercio",
      "englishTranslation": "The Commerce",
      "founded": 1906,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "Spanish",
      "headquarters": "Quito, Pichincha",
      "owner": {
        "name": "Grupo El Comercio",
        "type": "Independent commercial media"
      },
      "editorialStance": "Ecuador's historic capital newspaper of record founded by the Mantilla brothers; national politics, Andean economics, and judicial affairs",
      "readership": {
        "metric": "Over 6 million monthly unique digital visitors on elcomercio.com; primary quality paper in Quito and the sierra region",
        "source": "Grupo El Comercio Memoria Anual 2023"
      },
      "revenueModel": "Digital subscriptions, print sales, and corporate advertising",
      "logo": "newspaper-logos/ec/el-comercio.svg",
      "logoExplainer": "Classic black serif typography 'EL COMERCIO' on clean white canvas, representing over 118 years of Ecuadorian journalism.",
      "sources": [
        "https://www.elcomercio.com",
        "https://en.wikipedia.org/wiki/El_Comercio_(Ecuador)"
      ]
    },
    {
      "id": "ec-el-universo",
      "countryCode": "EC",
      "name": "El Universo",
      "englishTranslation": "The Universe",
      "founded": 1921,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "Spanish",
      "headquarters": "Guayaquil, Guayas",
      "owner": {
        "name": "Grupo El Universo (Pérez family)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Ecuador's largest circulation daily; voice of the coastal Pacific commercial hub Guayaquil; free-market advocacy, investigative reporting, and constitutional democracy",
      "readership": {
        "metric": "Highest print circulation in Ecuador and premier online news destination with 8+ million monthly visitors",
        "source": "El Universo Audience Review 2024"
      },
      "revenueModel": "Digital subscriptions, print sales, and commercial display advertising",
      "logo": "newspaper-logos/ec/el-universo.svg",
      "logoExplainer": "Deep blue banner with white serif masthead 'EL UNIVERSO', the most recognized newspaper emblem in the Pacific coast of Ecuador.",
      "sources": [
        "https://www.eluniverso.com",
        "https://en.wikipedia.org/wiki/El_Universo"
      ]
    },
    {
      "id": "ec-expreso",
      "countryCode": "EC",
      "name": "Expreso",
      "englishTranslation": "Express",
      "founded": 1973,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "Spanish",
      "headquarters": "Guayaquil",
      "owner": {
        "name": "Gráficos Nacionales S.A. (Granasa)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Influential national daily; in-depth investigative political reporting, macroeconomic analysis, agribusiness, and coastal economic affairs",
      "readership": {
        "metric": "Over 3.5 million monthly digital readers on expreso.ec and major institutional readership across Guayas and Pichincha",
        "source": "Granasa Media Kit 2024"
      },
      "revenueModel": "Print circulation, digital paywall, and business advertising",
      "logo": "newspaper-logos/ec/expreso.svg",
      "logoExplainer": "Vibrant red banner with crisp white serif typography 'EXPRESO', symbolising energetic independent daily journalism.",
      "sources": [
        "https://www.expreso.ec",
        "https://es.wikipedia.org/wiki/Expreso_(Ecuador)"
      ]
    },
    {
      "id": "ec-primicias",
      "countryCode": "EC",
      "name": "Primicias",
      "englishTranslation": "Scoops / First News",
      "founded": 2019,
      "frequency": "Continuous 24/7 digital news service",
      "format": "Digital-only investigative portal",
      "language": "Spanish",
      "headquarters": "Quito",
      "owner": {
        "name": "Primicias Periodismo Digital S.A.",
        "type": "Independent commercial media"
      },
      "editorialStance": "Modern digital investigative media; high-impact investigative scoops, security coverage, energy policy, and visual data journalism",
      "readership": {
        "metric": "Rapidly grown to over 5 million monthly unique users, becoming one of Ecuador's top digital news references",
        "source": "Similarweb & Primicias Analytics 2024"
      },
      "revenueModel": "Digital advertising, corporate brand partnerships, and investigative grants",
      "logo": "newspaper-logos/ec/primicias.svg",
      "logoExplainer": "Minimalist navy and yellow badge with modern lowercase typography 'primicias', representing data-driven digital scoops.",
      "sources": [
        "https://www.primicias.ec"
      ]
    },
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
      "logo": "newspaper-logos/ec/lideres.svg",
      "logoExplainer": "Deep emerald green banner with white typography 'LÍDERES', symbolising corporate excellence and economic leadership.",
      "sources": [
        "https://www.revistalideres.ec"
      ]
    }
  ],
  "EE": [
    {
      "id": "ee-postimees",
      "countryCode": "EE",
      "name": "Postimees",
      "nativeName": "Postimees",
      "englishTranslation": "The Postman",
      "founded": 1857,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Broadsheet & digital network",
      "language": "Estonian, Russian",
      "headquarters": "Tallinn & Tartu",
      "owner": {
        "name": "Postimees Grupp (Margus Linnamäe / MM Grupp)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Estonia's oldest newspaper and premier national newspaper of record; conservative-liberal stance focusing on national sovereignty, digital society (e-Estonia), and European security",
      "readership": {
        "metric": "Over 650,000 weekly digital users on postimees.ee and largest paid newspaper circulation in Estonia",
        "source": "Estonian Media Association & Kantar Emor 2024"
      },
      "revenueModel": "Digital paywall subscriptions, print sales, and corporate advertising",
      "logo": "newspaper-logos/ee/postimees.svg",
      "logoExplainer": "Deep blue banner with white serif typography 'Postimees', the historic symbol of Estonian national awakening and journalism.",
      "sources": [
        "https://www.postimees.ee",
        "https://en.wikipedia.org/wiki/Postimees"
      ]
    },
    {
      "id": "ee-delfi-ee",
      "countryCode": "EE",
      "name": "Delfi Estonia",
      "founded": 1999,
      "frequency": "Continuous 24/7 digital news service",
      "format": "Digital-only news network",
      "language": "Estonian, Russian",
      "headquarters": "Tallinn",
      "owner": {
        "name": "Ekspress Grupp",
        "type": "Independent commercial media"
      },
      "editorialStance": "Estonia's largest digital news network; breaking real-time news, investigative journalism (Eesti Ekspress synergy), podcasts, and civic debate",
      "readership": {
        "metric": "Over 1.2 million monthly unique digital visitors; highest digital news reach in Estonia with 100,000+ digital subscribers",
        "source": "Ekspress Grupp Financial Results 2024"
      },
      "revenueModel": "Digital paywall subscriptions (Delfi Kogupakett) and programmatic advertising",
      "logo": "newspaper-logos/ee/delfi-ee.svg",
      "logoExplainer": "Orange and dark blue badge with bold sans-serif text 'DELFI', representing modern Baltic digital breaking journalism.",
      "sources": [
        "https://www.delfi.ee",
        "https://en.wikipedia.org/wiki/Delfi_(web_portal)"
      ]
    },
    {
      "id": "ee-eesti-paevaleht",
      "countryCode": "EE",
      "name": "Eesti Päevaleht",
      "officialName": "EPL",
      "nativeName": "Eesti Päevaleht",
      "englishTranslation": "Estonian Daily",
      "founded": 1995,
      "frequency": "Digital daily & weekend print",
      "format": "Digital daily portal & analytical weekend edition",
      "language": "Estonian",
      "headquarters": "Tallinn",
      "owner": {
        "name": "Ekspress Grupp",
        "type": "Independent commercial media"
      },
      "editorialStance": "Center-left progressive quality newspaper; in-depth investigative political reporting, education reform, climate policy, and European affairs",
      "readership": {
        "metric": "Highly regarded intellectual broadsheet with strong digital readership integrated into Ekspress Grupp network",
        "source": "Ekspress Grupp Media Report 2023"
      },
      "revenueModel": "Digital subscriber packages and institutional subscriptions",
      "logo": "newspaper-logos/ee/eesti-päevaleht.svg",
      "logoExplainer": "Blue and red logo with bold clean lettering 'Eesti Päevaleht', symbolising contemporary analytical journalism.",
      "sources": [
        "https://epl.delfi.ee",
        "https://en.wikipedia.org/wiki/Eesti_P%C3%A4evaleht"
      ]
    },
    {
      "id": "ee-aripaev",
      "countryCode": "EE",
      "name": "Äripäev",
      "nativeName": "Äripäev",
      "englishTranslation": "Business Day",
      "founded": 1989,
      "frequency": "Continuous digital business daily",
      "format": "Digital-only financial daily",
      "language": "Estonian",
      "headquarters": "Tallinn",
      "owner": {
        "name": "Bonnier Business Press",
        "type": "Independent commercial media"
      },
      "editorialStance": "Estonia's premier financial and economic daily; Tallinn Stock Exchange, startup ecosystem (tech unicorns), corporate governance, and fiscal policy",
      "readership": {
        "metric": "Over 25,000 paid corporate digital subscribers; primary business publication for Estonian entrepreneurs and investors",
        "source": "Bonnier Business Press Estonia 2024"
      },
      "revenueModel": "Digital corporate paywall, specialized business conferences, and B2B advertising",
      "logo": "newspaper-logos/ee/äripäev.svg",
      "logoExplainer": "Signature magenta-red banner with crisp white typography 'Äripäev', representing Nordic business intelligence in the Baltics.",
      "sources": [
        "https://www.aripaev.ee",
        "https://en.wikipedia.org/wiki/%C3%84rip%C3%A4ev"
      ]
    },
    {
      "id": "ee-ohtuleht",
      "countryCode": "EE",
      "name": "Õhtuleht",
      "nativeName": "Õhtuleht",
      "englishTranslation": "Evening Paper",
      "founded": 1944,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Tabloid publication & digital portal",
      "language": "Estonian",
      "headquarters": "Tallinn",
      "owner": {
        "name": "Õhtuleht Kirjastus (Ekspress Grupp & Suits Media)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Popular tabloid; consumer rights advocacy, sports, investigative exposés, human interest stories, and entertainment",
      "readership": {
        "metric": "Largest print circulation tabloid in Estonia and 700,000+ monthly digital readers on ohtuleht.ee",
        "source": "Õhtuleht Kirjastus Annual Report 2023"
      },
      "revenueModel": "Print newsstand sales, digital subscriptions, and display advertising",
      "logo": "newspaper-logos/ee/õhtuleht.svg",
      "logoExplainer": "Red and yellow title block with bold uppercase font 'ÕHTULEHT', iconic across Estonian newsstands.",
      "sources": [
        "https://www.ohtuleht.ee",
        "https://en.wikipedia.org/wiki/%C3%95htuleht"
      ]
    }
  ],
  "EG": [
    {
      "id": "eg-al-masry-al-youm",
      "countryCode": "EG",
      "name": "Al-Masry Al-Youm",
      "nativeName": "المصري اليوم",
      "englishTranslation": "The Egyptian Today",
      "founded": 2004,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "Arabic",
      "headquarters": "Cairo",
      "owner": {
        "name": "Al-Masry Media Corp (Salah Diab)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Egypt's leading independent private broadsheet; in-depth political investigations, critical economic commentary, culture, and pluralistic opinion columns",
      "readership": {
        "metric": "Largest print circulation among private Egyptian dailies and top digital portal with over 15 million monthly visits",
        "source": "Al-Masry Media Audience Report 2024"
      },
      "revenueModel": "Print sales, digital display advertising, and corporate sponsorships",
      "logo": "newspaper-logos/eg/al-masry-al-youm.svg",
      "logoExplainer": "Blue and red title badge featuring modern Arabic typography 'المصري اليوم', symbolising independent pluralistic Egyptian news.",
      "sources": [
        "https://www.almasryalyoum.com",
        "https://en.wikipedia.org/wiki/Al-Masry_Al-Youm"
      ]
    },
    {
      "id": "eg-youm7",
      "countryCode": "EG",
      "name": "Youm7",
      "officialName": "The Seventh Day",
      "nativeName": "اليوم السابع",
      "englishTranslation": "The Seventh Day",
      "founded": 2008,
      "frequency": "Continuous digital news service & daily print",
      "format": "Digital-first portal & daily tabloid",
      "language": "Arabic",
      "headquarters": "Mohandessin, Giza / Cairo",
      "owner": {
        "name": "United Media Services (UMS)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Egypt's largest digital news network; breaking real-time multimedia news, video journalism, sports (Egyptian Premier League), and entertainment",
      "readership": {
        "metric": "Most visited news website in Egypt and the Arab world with over 45 million monthly unique digital visitors",
        "source": "Similarweb & UMS Group 2024"
      },
      "revenueModel": "Digital programmatic advertising, video monetization, and commercial partnerships",
      "logo": "newspaper-logos/eg/youm7.svg",
      "logoExplainer": "Vivid red and black badge with stylized Arabic numeral '7' and typography 'اليوم السابع', iconic across Middle Eastern mobile news.",
      "sources": [
        "https://www.youm7.com",
        "https://en.wikipedia.org/wiki/Youm7"
      ]
    },
    {
      "id": "eg-al-wafd",
      "countryCode": "EG",
      "name": "Al-Wafd",
      "nativeName": "الوفد",
      "englishTranslation": "The Delegation",
      "founded": 1984,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "Arabic",
      "headquarters": "Dokki, Giza",
      "owner": {
        "name": "New Wafd Party",
        "type": "Independent commercial media"
      },
      "editorialStance": "Official daily newspaper of the liberal-nationalist New Wafd Party; political opposition commentary, constitutional law, and democratic governance",
      "readership": {
        "metric": "Pioneer partisan newspaper in Egypt with widespread historical readership among jurists and academics",
        "source": "Al-Wafd Media Center 2023"
      },
      "revenueModel": "Print sales, party subscriptions, and commercial advertising",
      "logo": "newspaper-logos/eg/al-wafd.svg",
      "logoExplainer": "Classic green title banner with white Arabic lettering 'جريدة الوفد', representing liberal nationalist democratic heritage.",
      "sources": [
        "https://alwafd.news",
        "https://en.wikipedia.org/wiki/Al-Wafd_(newspaper)"
      ]
    },
    {
      "id": "eg-egypt-today",
      "countryCode": "EG",
      "name": "Egypt Today",
      "founded": 1979,
      "frequency": "Monthly magazine & daily digital portal",
      "format": "English news magazine & digital portal",
      "language": "English",
      "headquarters": "Cairo",
      "owner": {
        "name": "United Media Services (UMS)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Egypt's premier English-language current affairs magazine and news portal; international diplomacy, archaeological discoveries, Grand Egyptian Museum, and tourism",
      "readership": {
        "metric": "Primary news source for English-speaking diplomats, expatriates, and foreign investors in Egypt",
        "source": "UMS International Division 2024"
      },
      "revenueModel": "Print magazine circulation, international subscriptions, and tourism advertising",
      "logo": "newspaper-logos/eg/egypt-today.svg",
      "logoExplainer": "Gold and black emblem with refined serif typography 'EGYPT TODAY', evoking Egyptian antiquities and international diplomacy.",
      "sources": [
        "https://www.egypttoday.com",
        "https://en.wikipedia.org/wiki/Egypt_Today"
      ]
    },
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
      "logo": "newspaper-logos/eg/al-ahram.svg",
      "logoExplainer": "Classic Arabic calligraphy 'الأهرام' in black and gold, representing over 150 years of foundational Arab journalism.",
      "sources": [
        "https://gate.ahram.org.eg",
        "https://en.wikipedia.org/wiki/Al-Ahram"
      ]
    }
  ],
  "ER": [
    {
      "id": "er-haddas-eritrea",
      "countryCode": "ER",
      "name": "Haddas Eritrea",
      "nativeName": "ሓዳስ ኤርትራ",
      "englishTranslation": "New Eritrea",
      "founded": 1991,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Official state broadsheet",
      "language": "Tigrinya",
      "headquarters": "Asmara",
      "owner": {
        "name": "Ministry of Information",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official national public Tigrinya-language daily; national development campaigns, regional zoba administration news, literature, and educational notices",
      "readership": {
        "metric": "Sole daily print newspaper in Tigrinya with universal distribution across government and community kiosks in Asmara",
        "source": "Eritrean Ministry of Information 2023"
      },
      "revenueModel": "State publishing subsidy and retail kiosk print sales",
      "logo": "newspaper-logos/er/haddas-eritrea.svg",
      "logoExplainer": "Elegant Tigrinya Ge'ez calligraphy 'ሓዳስ ኤርትራ' on white ground, symbolising national renewal and indigenous language heritage.",
      "sources": [
        "https://shabait.com/category/haddas-ertra/",
        "https://en.wikipedia.org/wiki/Haddas_Eritrea"
      ]
    },
    {
      "id": "er-eritrea-profile",
      "countryCode": "ER",
      "name": "Eritrea Profile",
      "founded": 1993,
      "frequency": "Bi-weekly newspaper (Wednesday & Saturday)",
      "format": "Official state English broadsheet & portal",
      "language": "English",
      "headquarters": "Asmara",
      "owner": {
        "name": "Ministry of Information",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official state English-language newspaper; foreign policy, Red Sea maritime cooperation, UN affairs, mining developments, and national history",
      "readership": {
        "metric": "Read by foreign diplomats, international organizations, scholars, and diaspora communities",
        "source": "Ministry of Information Profile 2023"
      },
      "revenueModel": "State budget funding and print sales",
      "logo": "newspaper-logos/er/eritrea-profile.svg",
      "logoExplainer": "Deep blue banner with classical serif lettering 'ERITREA PROFILE', the definitive English print masthead of Asmara.",
      "sources": [
        "https://shabait.com/category/eritrea-profile/",
        "https://en.wikipedia.org/wiki/Eritrea_Profile"
      ]
    },
    {
      "id": "er-eritrean-digest",
      "countryCode": "ER",
      "name": "Eritrean Digest",
      "founded": 2018,
      "frequency": "Continuous digital analysis & portal",
      "format": "Digital analytical portal",
      "language": "English, Tigrinya",
      "headquarters": "Asmara / Washington D.C.",
      "owner": {
        "name": "Eritrean Digest Media (Saleh Younis)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent diaspora analytical platform; in-depth political commentary, peace accords, Horn of Africa regional geopolitics, and historical archives",
      "readership": {
        "metric": "Widely read by international Horn of Africa scholars, think tanks, and global diaspora communities",
        "source": "Eritrean Digest Analytics 2024"
      },
      "revenueModel": "Reader patronage and academic media grants",
      "logo": "newspaper-logos/er/eritrean-digest.svg",
      "logoExplainer": "Warm terracotta badge with modern typography 'ERITREAN DIGEST', symbolising independent historical analysis and debate.",
      "sources": [
        "https://eritreandigest.com"
      ]
    }
  ],
  "ES": [
    {
      "id": "es-el-pais",
      "countryCode": "ES",
      "name": "El País",
      "nativeName": "El País",
      "englishTranslation": "The Country",
      "founded": 1976,
      "frequency": "Daily morning newspaper & continuous digital edition",
      "format": "Berliner / compact print newspaper & digital portal (elpais.com)",
      "language": "Spanish, Catalan (Quadern), English",
      "headquarters": "Calle de Miguel Yuste 40, Madrid",
      "owner": {
        "name": "Grupo PRISA (Promotora de Informaciones, S.A.)",
        "type": "Publicly traded media corporation"
      },
      "editorialStance": "Spain's newspaper of record and the most widely circulated Spanish-language news publication worldwide; founded during Spain's transition to democracy in 1976, maintaining a center-left, pro-European, and socially progressive editorial perspective with global correspondents across Latin America",
      "readership": {
        "metric": "Over 350,000 paid digital subscribers and more than 18 million unique monthly digital readers across Spain and the Americas",
        "source": "Oficina de Justificación de la Difusión (OJD) / PRISA Annual Report 2023"
      },
      "revenueModel": "Paid digital subscriptions, print sales, corporate advertising, and events",
      "logo": "newspaper-logos/es/el-pais.svg",
      "logoExplainer": "Timeless white masthead with heavy black serif capitals 'EL PAÍS', an underline bar, and the historic subtitle 'EL PERIÓDICO GLOBAL'.",
      "sources": [
        "https://elpais.com",
        "https://en.wikipedia.org/wiki/El_Pa%C3%ADs"
      ]
    },
    {
      "id": "es-el-mundo",
      "countryCode": "ES",
      "name": "El Mundo",
      "nativeName": "El Mundo del Siglo Veintiuno",
      "englishTranslation": "The World of the Twenty-First Century",
      "founded": 1989,
      "frequency": "Daily morning newspaper",
      "format": "Tabloid newspaper & digital news portal (elmundo.es)",
      "language": "Spanish",
      "headquarters": "Avenida de San Luis 25, Madrid",
      "owner": {
        "name": "Unidad Editorial (subsidiary of RCS MediaGroup)",
        "type": "Commercial media group"
      },
      "editorialStance": "Major Spanish national daily newspaper, founded in 1989 by Pedro J. Ramírez; recognized for high-profile investigative journalism, breaking key political scandals, and maintaining a center-right, liberal-conservative, and constitutionalist editorial stance",
      "readership": {
        "metric": "Over 140,000 paid digital subscribers (El Mundo Premium) and over 15 million monthly unique online visitors",
        "source": "GfK DAM / OJD Interactiva / Unidad Editorial 2023"
      },
      "revenueModel": "Digital subscriptions, newsstand sales, and commercial brand advertising",
      "logo": "newspaper-logos/es/el-mundo.svg",
      "logoExplainer": "White field with vibrant cerulean globe emblem, dark navy ultra-bold sans-serif lettering 'EL MUNDO', and blue morning daily subtitle.",
      "sources": [
        "https://www.elmundo.es",
        "https://en.wikipedia.org/wiki/El_Mundo_(Spain)"
      ]
    },
    {
      "id": "es-abc",
      "countryCode": "ES",
      "name": "ABC",
      "nativeName": "ABC",
      "englishTranslation": "ABC",
      "founded": 1903,
      "frequency": "Daily morning newspaper",
      "format": "Compact stapled tabloid newspaper & digital portal (abc.es)",
      "language": "Spanish",
      "headquarters": "Calle de Josefa Valcárcel 40, Madrid",
      "owner": {
        "name": "Vocento",
        "type": "Publicly listed media group"
      },
      "editorialStance": "One of Spain's oldest and most traditional daily newspapers, founded in 1903 by Torcuato Luca de Tena; known for its distinctive stapled magazine-like format, conservative and monarchist philosophy, strong cultural sections, and defense of the Spanish constitutional order",
      "readership": {
        "metric": "Over 100,000 paid digital subscribers and approximately 40,000 daily print copies distributed across Spain",
        "source": "OJD / Vocento Resultados Anuales 2023"
      },
      "revenueModel": "Digital paywall subscriptions, print sales, and print and digital display advertising",
      "logo": "newspaper-logos/es/abc.svg",
      "logoExplainer": "Deep black background featuring the iconic grand Bodoni serif lettering 'ABC' in white, separated by a gold line from Madrid heritage text.",
      "sources": [
        "https://www.abc.es",
        "https://en.wikipedia.org/wiki/ABC_(Spanish_newspaper)"
      ]
    },
    {
      "id": "es-la-vanguardia",
      "countryCode": "ES",
      "name": "La Vanguardia",
      "nativeName": "La Vanguardia",
      "englishTranslation": "The Vanguard",
      "founded": 1881,
      "frequency": "Daily morning newspaper",
      "format": "Compact newspaper & online portal (lavanguardia.com)",
      "language": "Spanish, Catalan",
      "headquarters": "Avenida Diagonal 477, Barcelona, Catalonia",
      "owner": {
        "name": "Grupo Godó (Compañía del Conde de Godó, S.L.)",
        "type": "Private family media group"
      },
      "editorialStance": "Leading Catalonia-based Spanish national daily newspaper of record, founded in 1881; maintains a centrist, moderate Catalanist, liberal-constitutional editorial outlook with extensive international reporting, culture, and business coverage",
      "readership": {
        "metric": "Over 130,000 digital subscribers and more than 16 million monthly unique visitors across Spain",
        "source": "GfK DAM / OJD Interactiva 2023"
      },
      "revenueModel": "Digital subscriptions, daily print distribution, and premium brand advertising",
      "logo": "newspaper-logos/es/la-vanguardia.svg",
      "logoExplainer": "Deep navy rectangular banner with elegant white serif capitals 'LA VANGUARDIA', underlined by a warm gold rule and historic 1881 foundation mark.",
      "sources": [
        "https://www.lavanguardia.com",
        "https://en.wikipedia.org/wiki/La_Vanguardia"
      ]
    }
  ],
  "ET": [
    {
      "id": "et-addis-fortune",
      "countryCode": "ET",
      "name": "Addis Fortune",
      "founded": 2000,
      "frequency": "Weekly newspaper (Sundays) & continuous digital portal",
      "format": "Tabloid & financial news portal",
      "language": "English",
      "headquarters": "Addis Ababa",
      "owner": {
        "name": "Independent News & Media Plc (Fortune)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Ethiopia's premier independent business weekly; in-depth investigative reporting on banking, currency exchange liberalization, trade tariffs, public debt, and corporate developments",
      "readership": {
        "metric": "Over 15,000 weekly print circulation, widely read by diplomats, business executives, international finance institutions, and economists",
        "source": "Addis Fortune Circulation Profile 2023"
      },
      "revenueModel": "Print sales, corporate digital paywall subscriptions, and financial advertising",
      "logo": "newspaper-logos/et/addis-fortune.svg",
      "logoExplainer": "Deep corporate navy blue field featuring bold white typography 'FORTUNE' with golden accent line, signifying economic and financial authority.",
      "sources": [
        "https://addisfortune.news",
        "https://en.wikipedia.org/wiki/Addis_Fortune"
      ]
    },
    {
      "id": "et-the-reporter",
      "countryCode": "ET",
      "name": "The Reporter Ethiopia",
      "nativeName": "ሪፖርተር",
      "englishTranslation": "The Reporter",
      "founded": 1995,
      "frequency": "Bi-weekly newspaper (Wednesdays & Saturdays) & digital portal",
      "format": "Broadsheet & digital news portal",
      "language": "Amharic, English",
      "headquarters": "Bole Sub-city, Addis Ababa",
      "owner": {
        "name": "Media and Communications Center (MCC)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Influential independent newspaper; acclaimed for objective political analysis, parliamentary scrutiny, human rights investigations, and regional Horn of Africa security reporting",
      "readership": {
        "metric": "Over 25,000 print copies across both weekly editions and more than 1.5 million monthly digital readers",
        "source": "Media and Communications Center Audience Audit 2023"
      },
      "revenueModel": "Print newsstand sales, classifieds, and digital display advertising",
      "logo": "newspaper-logos/et/the-reporter.svg",
      "logoExplainer": "Bold red rectangular background with dignified white serif typography 'The Reporter', reflecting three decades of independent journalism.",
      "sources": [
        "https://www.thereporterethiopia.com",
        "https://am.thereporterethiopia.com"
      ]
    }
  ],
  "FI": [
    {
      "id": "fi-helsingin-sanomat",
      "countryCode": "FI",
      "name": "Helsingin Sanomat",
      "officialName": "HS",
      "nativeName": "Helsingin Sanomat",
      "englishTranslation": "Helsinki News",
      "founded": 1889,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Tabloid format broadsheet & digital network",
      "language": "Finnish",
      "headquarters": "Sanomatalo, Töölönlahti, Helsinki",
      "owner": {
        "name": "Sanoma Media Finland",
        "type": "Independent commercial media"
      },
      "editorialStance": "Finland's preeminent newspaper of record and the largest subscription daily in the Nordic countries; independent liberal stance focusing on Nordic welfare, European security, technology, and arts",
      "readership": {
        "metric": "Over 2.2 million weekly readers across print and digital, with more than 450,000 paid digital subscribers on hs.fi",
        "source": "Sanoma Corporation Annual Report 2023"
      },
      "revenueModel": "Digital paywall subscriptions, print circulation, and corporate display advertising",
      "logo": "newspaper-logos/fi/helsingin-sanomat.svg",
      "logoExplainer": "Iconic black square emblem with white interlocking initials 'HS' and classic serif typography, the benchmark insignia of Finnish journalism.",
      "sources": [
        "https://www.hs.fi",
        "https://en.wikipedia.org/wiki/Helsingin_Sanomat"
      ]
    },
    {
      "id": "fi-iltalehti",
      "countryCode": "FI",
      "name": "Iltalehti",
      "nativeName": "Iltalehti",
      "englishTranslation": "Evening Newspaper",
      "founded": 1980,
      "frequency": "Continuous digital news service & daily print",
      "format": "Digital-first portal & daily tabloid",
      "language": "Finnish",
      "headquarters": "Helsinki",
      "owner": {
        "name": "Alma Media Corporation",
        "type": "Independent commercial media"
      },
      "editorialStance": "Finland's premier digital news brand; breaking news, visual investigative reporting, consumer guides, political scoops, and lifestyle",
      "readership": {
        "metric": "Over 3.1 million weekly digital users on iltalehti.fi; highest weekly digital reach in Finland",
        "source": "FIAM (Finnish Internet Audience Measurement) 2024"
      },
      "revenueModel": "Digital subscriptions (IL Plus), programmatic ads, and print newsstand sales",
      "logo": "newspaper-logos/fi/iltalehti.svg",
      "logoExplainer": "Vibrant red banner with clean white typography 'ILTALEHTI', symbolising fast-paced breaking digital news across Finland.",
      "sources": [
        "https://www.iltalehti.fi",
        "https://en.wikipedia.org/wiki/Iltalehti"
      ]
    },
    {
      "id": "fi-ilta-sanomat",
      "countryCode": "FI",
      "name": "Ilta-Sanomat",
      "officialName": "IS",
      "nativeName": "Ilta-Sanomat",
      "englishTranslation": "Evening News",
      "founded": 1932,
      "frequency": "Daily newspaper & continuous digital portal",
      "format": "Tabloid publication & digital network",
      "language": "Finnish",
      "headquarters": "Helsinki",
      "owner": {
        "name": "Sanoma Media Finland",
        "type": "Independent commercial media"
      },
      "editorialStance": "Major commercial daily founded during the Mäntsälä rebellion; breaking news, sports (ice hockey / SM-liiga), entertainment, and consumer investigative journalism",
      "readership": {
        "metric": "Over 2.9 million weekly digital visitors on is.fi and leading street print newspaper",
        "source": "Sanoma Media Audience Review 2024"
      },
      "revenueModel": "Digital advertising, premium digital packages (IS Extra), and retail sales",
      "logo": "newspaper-logos/fi/ilta-sanomat.svg",
      "logoExplainer": "Red and blue emblem featuring bold letters 'IS' and full title, iconic on Finnish newsstands since the 1930s.",
      "sources": [
        "https://www.is.fi",
        "https://en.wikipedia.org/wiki/Ilta-Sanomat"
      ]
    },
    {
      "id": "fi-kauppalehti",
      "countryCode": "FI",
      "name": "Kauppalehti",
      "nativeName": "Kauppalehti",
      "englishTranslation": "Commerce Paper",
      "founded": 1898,
      "frequency": "Daily business newspaper (Monday–Friday)",
      "format": "Salmon broadsheet & digital financial portal",
      "language": "Finnish",
      "headquarters": "Helsinki",
      "owner": {
        "name": "Alma Media Corporation",
        "type": "Independent commercial media"
      },
      "editorialStance": "Finland's preeminent financial and business daily; Helsinki Stock Exchange (Nasdaq Helsinki), corporate innovations, forestry, clean tech, and macroeconomic policy",
      "readership": {
        "metric": "Over 150,000 paid business subscribers; primary information source for Finnish business executives and investors",
        "source": "Alma Media Corporate Review 2023"
      },
      "revenueModel": "Corporate subscriptions and B2B financial advertising",
      "logo": "newspaper-logos/fi/kauppalehti.svg",
      "logoExplainer": "Dark green and black banner with bold sans-serif text 'Kauppalehti', representing Finnish corporate leadership and market analysis.",
      "sources": [
        "https://www.kauppalehti.fi",
        "https://en.wikipedia.org/wiki/Kauppalehti"
      ]
    },
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
      "logoExplainer": "Historic black serif masthead 'Hufvudstadsbladet' with blue accent 'HBL', representing 160 years of Swedish-Finnish press tradition.",
      "sources": [
        "https://www.hbl.fi",
        "https://en.wikipedia.org/wiki/Hufvudstadsbladet"
      ]
    }
  ],
  "FJ": [
    {
      "id": "fj-fiji-times",
      "countryCode": "FJ",
      "name": "The Fiji Times",
      "founded": 1869,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Broadsheet & digital portal",
      "language": "English",
      "headquarters": "Suva, Viti Levu",
      "owner": {
        "name": "Motibhai Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Fiji's oldest newspaper and historic newspaper of record; independent, courageous reporting through military coups and constitutional crises, championing democracy and rule of law",
      "readership": {
        "metric": "Over 155 years of publishing; largest print circulation daily in Fiji and leading South Pacific news reference",
        "source": "The Fiji Times Annual Review 2023"
      },
      "revenueModel": "Print newsstand sales, commercial advertising, and digital subscriptions",
      "logo": "newspaper-logos/fj/fiji-times.svg",
      "logoExplainer": "Classic black gothic masthead 'The Fiji Times' on white canvas, symbolising the Pacific's longest running independent press institution.",
      "sources": [
        "https://www.fijitimes.com.fj",
        "https://en.wikipedia.org/wiki/The_Fiji_Times"
      ]
    },
    {
      "id": "fj-fiji-sun",
      "countryCode": "FJ",
      "name": "Fiji Sun",
      "founded": 2001,
      "frequency": "Daily newspaper",
      "format": "Tabloid & digital portal",
      "language": "English",
      "headquarters": "Walubay, Suva",
      "owner": {
        "name": "Sun (Fiji) News Limited (CJ Patel Group)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Major national daily; focus on tourism, business developments, provincial news, and sports (rugby sevens)",
      "readership": {
        "metric": "Major daily circulation with widespread distribution across Viti Levu and Vanua Levu",
        "source": "Fiji Sun Corporate Profile 2023"
      },
      "revenueModel": "Print sales and corporate commercial advertising",
      "logo": "newspaper-logos/fj/fiji-sun.svg",
      "logoExplainer": "Vibrant golden-orange sunburst and bold blue lettering 'FIJI SUN', reflecting tropical energy and island daily news.",
      "sources": [
        "https://fijisun.com.fj",
        "https://en.wikipedia.org/wiki/Fiji_Sun"
      ]
    },
    {
      "id": "fj-fiji-report",
      "countryCode": "FJ",
      "name": "Fiji Report",
      "founded": 2015,
      "frequency": "Digital portal",
      "format": "Digital business portal",
      "language": "English",
      "headquarters": "Suva",
      "owner": {
        "name": "Pacific Media Reports",
        "type": "Independent commercial media"
      },
      "editorialStance": "Business and financial reporting; Pacific Islands trade, sugar and kava exports, renewable energy, and climate adaptation financing",
      "readership": {
        "metric": "Read by business professionals, foreign investors, and regional development agencies",
        "source": "Pacific Media Reports 2023"
      },
      "revenueModel": "Corporate partnerships and digital subscriptions",
      "logo": "newspaper-logos/fj/fiji-report.svg",
      "logoExplainer": "Dark teal banner with white sans-serif text 'FIJI REPORT', symbolising economic analysis and sustainable island trade.",
      "sources": [
        "https://fijireport.com"
      ]
    }
  ],
  "FM": [
    {
      "id": "fm-the-kaselehlie-press",
      "countryCode": "FM",
      "name": "The Kaselehlie Press",
      "founded": 2000,
      "frequency": "Bi-weekly newspaper (every other Wednesday)",
      "format": "Tabloid & digital PDF edition",
      "language": "English",
      "headquarters": "Kolonia, Pohnpei",
      "owner": {
        "name": "The Kaselehlie Press Inc.",
        "type": "Independent commercial media"
      },
      "editorialStance": "The Federated States of Micronesia's sole independent newspaper of record; comprehensive coverage of the FSM Congress, four state governments (Yap, Chuuk, Pohnpei, Kosrae), environmental sustainability, and COFA treaties",
      "readership": {
        "metric": "Distributed across all four states of the FSM, regional embassies, and Pacific libraries",
        "source": "The Kaselehlie Press Media Summary 2023"
      },
      "revenueModel": "Print sales, public notice announcements, and commercial ads",
      "logo": "newspaper-logos/fm/the-kaselehlie-press.svg",
      "logoExplainer": "Pacific deep blue header showcasing white serif lettering 'The Kaselehlie Press' alongside traditional Pohnpeian greeting motif, denoting national unity across four island states.",
      "sources": [
        "https://www.kpress.info",
        "https://en.wikipedia.org/wiki/The_Kaselehlie_Press"
      ]
    }
  ],
  "FR": [
    {
      "id": "fr-le-monde",
      "countryCode": "FR",
      "name": "Le Monde",
      "englishTranslation": "The World",
      "founded": 1944,
      "frequency": "Daily newspaper (Monday–Saturday afternoon)",
      "format": "Berliner format & global digital network",
      "language": "French, English (Le Monde in English)",
      "headquarters": "Boulevard Auguste-Blanqui, Paris",
      "owner": {
        "name": "Groupe Le Monde (Fonds pour l'Indépendance de la Presse / Xavier Niel)",
        "type": "Independent trust / foundation"
      },
      "editorialStance": "France's preeminent newspaper of record founded at the Liberation by Hubert Beuve-Méry; center-left independent intellectual stance with world-renowned investigative journalism and international analysis",
      "readership": {
        "metric": "Over 550,000 paid digital subscribers and more than 20 million monthly digital readers across French and English editions worldwide",
        "source": "Groupe Le Monde Bilan Annuel 2023"
      },
      "revenueModel": "Digital subscriptions, print circulation, and corporate advertising",
      "logo": "newspaper-logos/fr/le-monde.svg",
      "logoExplainer": "Iconic black gothic masthead 'Le Monde' designed in 1944, representing moral independence and authoritative intellectual journalism.",
      "sources": [
        "https://www.lemonde.fr",
        "https://en.wikipedia.org/wiki/Le_Monde"
      ]
    },
    {
      "id": "fr-le-figaro",
      "countryCode": "FR",
      "name": "Le Figaro",
      "englishTranslation": "The Figaro (named after Beaumarchais' character)",
      "founded": 1826,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Broadsheet & digital portal",
      "language": "French",
      "headquarters": "Boulevard Haussmann, Paris",
      "owner": {
        "name": "Groupe Figaro (Dassault Group)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Oldest national daily newspaper in France; center-right liberal-conservative newspaper of record known for literary culture, economic liberalism, and constitutional politics",
      "readership": {
        "metric": "Over 350,000 paid broadsheet and digital subscribers; top-ranking French digital news destination with 22M+ monthly visitors on lefigaro.fr",
        "source": "ACPM (Alliance pour les Chiffres de la Presse et des Médias) 2024"
      },
      "revenueModel": "Digital subscriptions, print sales, luxury advertising, and magazine supplements",
      "logo": "newspaper-logos/fr/le-figaro.svg",
      "logoExplainer": "Classic blue and black serif masthead 'LE FIGARO' accompanied by Beaumarchais' motto 'Sans la liberté de blâmer, il n'est point d'éloge flatteur'.",
      "sources": [
        "https://www.lefigaro.fr",
        "https://en.wikipedia.org/wiki/Le_Figaro"
      ]
    },
    {
      "id": "fr-les-echos",
      "countryCode": "FR",
      "name": "Les Échos",
      "englishTranslation": "The Echoes",
      "founded": 1908,
      "frequency": "Daily business newspaper (Monday–Friday)",
      "format": "Berliner & digital financial network",
      "language": "French",
      "headquarters": "Paris",
      "owner": {
        "name": "Groupe Les Échos-Le Parisien (LVMH)",
        "type": "Independent commercial media"
      },
      "editorialStance": "France's leading financial and economic daily; CAC 40 market analysis, European Union fiscal policy, industrial innovation, and corporate strategy",
      "readership": {
        "metric": "Over 100,000 paid digital subscribers; mandatory daily reading for senior French executives and policymakers",
        "source": "Groupe Les Échos-Le Parisien 2024"
      },
      "revenueModel": "Corporate subscriptions and financial market advertising",
      "logo": "newspaper-logos/fr/les-echos.svg",
      "logoExplainer": "Red and black title banner with bold modern typography 'Les Echos', symbolising authoritative market intelligence.",
      "sources": [
        "https://www.lesechos.fr",
        "https://en.wikipedia.org/wiki/Les_%C3%89chos_(France)"
      ]
    },
    {
      "id": "fr-liberation",
      "countryCode": "FR",
      "name": "Libération",
      "englishTranslation": "Liberation",
      "founded": 1973,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Tabloid publication & digital portal",
      "language": "French",
      "headquarters": "Paris",
      "owner": {
        "name": "Fonds de Dotation pour une Presse Indépendante (FDPI)",
        "type": "Independent trust / foundation"
      },
      "editorialStance": "Left-wing daily newspaper founded by Jean-Paul Sartre and Serge July; renowned for creative visual front pages, social justice, cultural critique, and civil liberties",
      "readership": {
        "metric": "Over 110,000 paid subscribers across print and digital platforms on liberation.fr",
        "source": "Libération Rapport Financier 2023"
      },
      "revenueModel": "Reader subscriptions, philanthropic endowment support, and advertising",
      "logo": "newspaper-logos/fr/libération.svg",
      "logoExplainer": "Iconic red rectangular emblem with bold white typography 'Libération', the visual hallmark of French progressive intellectual journalism.",
      "sources": [
        "https://www.liberation.fr",
        "https://en.wikipedia.org/wiki/Lib%C3%A9ration"
      ]
    },
    {
      "id": "fr-ouest-france",
      "countryCode": "FR",
      "name": "Ouest-France",
      "englishTranslation": "West France",
      "founded": 1944,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Berliner & comprehensive regional network",
      "language": "French",
      "headquarters": "Rennes, Brittany",
      "owner": {
        "name": "Association pour le Soutien des Principes de la Démocratie Humaniste",
        "type": "Non-profit independent trust"
      },
      "editorialStance": "Most read French-language newspaper in the world; non-profit Christian-humanist and pro-European democratic values, focusing on decentralised regional life and social cohesion",
      "readership": {
        "metric": "Over 630,000 daily print copies; highest circulation newspaper in France with over 2.5 million daily readers across 53 regional editions",
        "source": "ACPM Chiffres de Diffusion 2024"
      },
      "revenueModel": "Print subscriptions, retail kiosk sales, and local display advertising",
      "logo": "newspaper-logos/fr/ouest-france.svg",
      "logoExplainer": "Red and blue emblem with bold sans-serif lettering 'ouest france', representing grassroots democratic humanism in regional France.",
      "sources": [
        "https://www.ouest-france.fr",
        "https://en.wikipedia.org/wiki/Ouest-France"
      ]
    }
  ],
  "GA": [
    {
      "id": "ga-l-union",
      "countryCode": "GA",
      "name": "L'Union",
      "englishTranslation": "The Union",
      "founded": 1974,
      "frequency": "Daily newspaper (Monday–Friday)",
      "format": "Broadsheet & digital portal",
      "language": "French",
      "headquarters": "Libreville",
      "owner": {
        "name": "Société Gabonaise d'Édition et de Presse (SONAPRESSE)",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Gabon's historic national newspaper of record; government decrees, transition governance, extractive oil and mining industries, and environmental conservation",
      "readership": {
        "metric": "Largest print daily circulation in Gabon (~20,000 daily print copies) with universal institutional reach",
        "source": "SONAPRESSE Rapport d'Activité 2023"
      },
      "annualPublicFunding": {
        "total": "XAF 350 million (~US$575,000) state public press subsidy",
        "perCapita": "XAF 150 / person / year (~US$0.25)"
      },
      "revenueModel": "State operating subsidies, retail print sales, and official legal notices",
      "logo": "newspaper-logos/ga/l-union.svg",
      "logoExplainer": "Deep blue title banner with white serif font 'L'UNION', symbolising national unity and public press heritage.",
      "sources": [
        "https://www.union.sonapresse.com",
        "https://fr.wikipedia.org/wiki/L%27Union_(journal_gabonais)"
      ]
    },
    {
      "id": "ga-gabon-review",
      "countryCode": "GA",
      "name": "Gabon Review",
      "founded": 2011,
      "frequency": "Continuous digital news service",
      "format": "Digital-only analytical portal",
      "language": "French",
      "headquarters": "Libreville",
      "owner": {
        "name": "BDP Gabao Media",
        "type": "Independent commercial media"
      },
      "editorialStance": "Leading independent digital news and analytical portal; critical political commentary, anti-corruption investigations, forestry governance, and civil society debate",
      "readership": {
        "metric": "Over 1.5 million monthly digital visitors across Gabon and the international diaspora",
        "source": "Gabon Review Audience Report 2024"
      },
      "revenueModel": "Digital display advertising, sponsored columns, and consulting",
      "logo": "newspaper-logos/ga/gabon-review.svg",
      "logoExplainer": "Red and black title banner with modern font 'GabonReview', symbolising fearless independent investigative journalism.",
      "sources": [
        "https://www.gabonreview.com",
        "https://fr.wikipedia.org/wiki/Gabon_Review"
      ]
    },
    {
      "id": "ga-gabon-actu",
      "countryCode": "GA",
      "name": "Gabonactu.com",
      "founded": 2012,
      "frequency": "Continuous 24/7 digital news service",
      "format": "Digital news portal & web TV",
      "language": "French",
      "headquarters": "Libreville",
      "owner": {
        "name": "Groupe Gabonactu (Yves-Laurent Goma)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Real-time digital breaking news; politics, social movements, judicial affairs, and community reporting across Gabon's 9 provinces",
      "readership": {
        "metric": "Over 1.2 million monthly digital page views; top-ranked digital breaking news destination in Libreville",
        "source": "Gabonactu Analytics 2023"
      },
      "revenueModel": "Digital advertising and sponsored corporate communication",
      "logo": "newspaper-logos/ga/gabon-actu.svg",
      "logoExplainer": "Navy blue and orange badge with bold text 'GABONACTU.COM', representing rapid breaking digital news.",
      "sources": [
        "https://gabonactu.com"
      ]
    },
    {
      "id": "ga-gabon-medias-time",
      "countryCode": "GA",
      "name": "Gabon Media Time",
      "founded": 2016,
      "frequency": "Continuous digital multimedia service",
      "format": "Digital multimedia portal & podcasts",
      "language": "French",
      "headquarters": "Libreville",
      "owner": {
        "name": "GMT Media Group (Harold Leckat)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Modern multimedia news platform; investigative reporting, economic analysis, youth entrepreneurship, and cultural lifestyle",
      "readership": {
        "metric": "Rapidly grown to over 800,000 monthly digital visits with high engagement on mobile and social channels",
        "source": "GMT Audience Review 2024"
      },
      "revenueModel": "Digital programmatic advertising and brand content production",
      "logo": "newspaper-logos/ga/gabon-medias-time.svg",
      "logoExplainer": "Clean white background with elegant black and gold lettering 'GABON MEDIA TIME', symbolising contemporary media innovation.",
      "sources": [
        "https://gabonmediatime.com"
      ]
    }
  ],
  "GB": [
    {
      "id": "gb-the-times",
      "countryCode": "GB",
      "name": "The Times",
      "founded": 1785,
      "frequency": "Daily (Monday to Saturday) newspaper & continuous digital service",
      "format": "Compact print newspaper & online digital edition (thetimes.com)",
      "language": "English",
      "headquarters": "1 London Bridge Street, London",
      "owner": {
        "name": "Times Media (News UK / News Corp)",
        "type": "Commercial multinational media conglomerate"
      },
      "editorialStance": "Britain's historic newspaper of record and the originator of the 'Times' name used worldwide; founded in 1785 by John Walter (originally as The Daily Universal Register); maintains a center-right, establishment, and liberal-conservative editorial stance, famous for parliamentary coverage, international diplomacy, law reports, and authoritative obituaries",
      "readership": {
        "metric": "Over 550,000 digital-only subscribers and approximately 300,000 print circulation daily",
        "source": "Audit Bureau of Circulations (ABC UK) / News Corp Financial Report 2023"
      },
      "revenueModel": "Hard digital paywall subscriptions, print subscriptions, and premium brand advertising",
      "logo": "newspaper-logos/gb/the-times.svg",
      "logoExplainer": "Classic white field with authoritative black Times New Roman typography 'THE TIMES', a divider rule, and heritage 1785 subtitle.",
      "sources": [
        "https://www.thetimes.com",
        "https://en.wikipedia.org/wiki/The_Times"
      ]
    },
    {
      "id": "gb-the-guardian",
      "countryCode": "GB",
      "name": "The Guardian",
      "founded": 1821,
      "frequency": "Daily morning newspaper & 24/7 global digital edition",
      "format": "Tabloid newspaper & free open-access digital news platform (theguardian.com)",
      "language": "English",
      "headquarters": "Kings Place, 90 York Way, London",
      "owner": {
        "name": "Guardian Media Group (owned by the Scott Trust Limited)",
        "type": "Independent trust-governed media organisation"
      },
      "editorialStance": "Internationally renowned progressive British daily newspaper, founded in 1821 in Manchester following the Peterloo Massacre; owned by the Scott Trust to guarantee permanent editorial independence without proprietor interference; celebrated for Pulitzer Prize-winning investigative journalism, environmental reporting, and civil liberties coverage",
      "readership": {
        "metric": "Over 1.2 million recurring global digital supporters/subscribers and over 80 million unique monthly online visitors worldwide",
        "source": "Guardian Media Group Annual Report 2023 / Comscore"
      },
      "revenueModel": "Voluntary reader donations/memberships, digital subscriptions, print sales, and philanthropic foundation grants",
      "logo": "newspaper-logos/gb/the-guardian.svg",
      "logoExplainer": "Signature dark navy blue field with elegant white serif masthead 'The Guardian' and bright yellow Scott Trust subtitle.",
      "sources": [
        "https://www.theguardian.com",
        "https://en.wikipedia.org/wiki/The_Guardian"
      ]
    },
    {
      "id": "gb-the-telegraph",
      "countryCode": "GB",
      "name": "The Daily Telegraph",
      "founded": 1855,
      "frequency": "Daily morning newspaper",
      "format": "Broadsheet newspaper & digital news platform (telegraph.co.uk)",
      "language": "English",
      "headquarters": "111 Buckingham Palace Road, London",
      "owner": {
        "name": "Telegraph Media Group (Barclay Family / RedBird IMI transition)",
        "type": "Commercial media group"
      },
      "editorialStance": "Leading British conservative broadsheet daily newspaper of record, founded in 1855; known for deep political reporting on Westminster and the Conservative Party, defense analysis, royal reporting, business developments in the City of London, and obituaries",
      "readership": {
        "metric": "Over 1 million paying subscribers across print and digital editions",
        "source": "Telegraph Media Group Audited Accounts / ABC UK"
      },
      "revenueModel": "Digital paywall subscriptions, print home deliveries, and high-end advertising",
      "logo": "newspaper-logos/gb/the-telegraph.svg",
      "logoExplainer": "Charcoal black field with historic Old English gothic masthead 'The Daily Telegraph', a cyan divider rule, and London 1855 subtitle.",
      "sources": [
        "https://www.telegraph.co.uk",
        "https://en.wikipedia.org/wiki/The_Daily_Telegraph"
      ]
    },
    {
      "id": "gb-financial-times",
      "countryCode": "GB",
      "name": "Financial Times (FT)",
      "founded": 1888,
      "frequency": "Daily (Monday to Saturday) newspaper & continuous digital service",
      "format": "Broadsheet newspaper (salmon pink paper) & digital portal (ft.com)",
      "language": "English",
      "headquarters": "Bracken House, 1 Friday Street, London",
      "owner": {
        "name": "Nikkei Inc.",
        "type": "Global commercial financial publishing corporation"
      },
      "editorialStance": "World's leading international business, finance, and macroeconomic daily newspaper of record, printed on iconic salmon-pink paper since 1893; provides authoritative global coverage of central banking, capital markets, mergers, European economic policy, and international trade",
      "readership": {
        "metric": "Over 1.4 million paying readers, including over 1.2 million digital-only subscribers across finance, corporate suites, and governments worldwide",
        "source": "Nikkei Inc. / Financial Times Annual Review 2023"
      },
      "revenueModel": "Premium digital enterprise and individual subscriptions, print sales, and financial advertising",
      "logo": "newspaper-logos/gb/financial-times.svg",
      "logoExplainer": "Signature salmon-pink background with dark teal square tile bearing serif 'FT', crisp black serif capitals 'FINANCIAL TIMES', and teal subtitle.",
      "sources": [
        "https://www.ft.com",
        "https://en.wikipedia.org/wiki/Financial_Times"
      ]
    }
  ],
  "GD": [
    {
      "id": "gd-now-grenada",
      "countryCode": "GD",
      "name": "Now Grenada",
      "founded": 2013,
      "frequency": "Continuous 24/7 digital news service",
      "format": "Digital-only news portal",
      "language": "English",
      "headquarters": "St. George's",
      "owner": {
        "name": "Now Grenada Media",
        "type": "Independent commercial media"
      },
      "editorialStance": "Grenada's leading digital breaking news portal; parliamentary affairs, spice island agriculture (nutmeg/cocoa), tourism developments, and community reporting",
      "readership": {
        "metric": "Over 650,000 monthly digital visits; primary online news source for Grenada, Carriacou, and Petite Martinique",
        "source": "Now Grenada Analytics 2024"
      },
      "revenueModel": "Digital display advertising and local corporate sponsorships",
      "logo": "newspaper-logos/gd/now-grenada.svg",
      "logoExplainer": "Green, red, and yellow badge featuring bold typography 'NOW Grenada', reflecting the national colors of the Spice Isle.",
      "sources": [
        "https://nowgrenada.com"
      ]
    },
    {
      "id": "gd-the-barnacle",
      "countryCode": "GD",
      "name": "The Barnacle",
      "founded": 1990,
      "frequency": "Monthly newspaper & daily portal",
      "format": "Tabloid publication & digital portal",
      "language": "English",
      "headquarters": "St. George's",
      "owner": {
        "name": "Barnacle Publishing Ltd",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent print monthly paper; in-depth cultural analysis, community developments, educational features, and environmental news",
      "readership": {
        "metric": "Widely read community publication across parish schools, local councils, and businesses in St. George's",
        "source": "The Barnacle Media Review 2023"
      },
      "revenueModel": "Print advertising and local business listings",
      "logo": "newspaper-logos/gd/the-barnacle.svg",
      "logoExplainer": "Navy blue banner with classical white serif masthead 'The Barnacle', representing over thirty years of community journalism.",
      "sources": [
        "https://thebarnaclenews.com"
      ]
    },
    {
      "id": "gd-grenada-informer",
      "countryCode": "GD",
      "name": "The Grenada Informer",
      "founded": 1985,
      "frequency": "Weekly newspaper (Friday)",
      "format": "Tabloid publication & digital portal",
      "language": "English",
      "headquarters": "St. George's",
      "owner": {
        "name": "Informer Publishing Co.",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic independent weekly newspaper; investigative scoops, court reporting, political commentary, and sports (cricket)",
      "readership": {
        "metric": "One of the longest-running print weekly papers in Grenada with widespread newsstand circulation",
        "source": "Grenada Informer Publishing 2023"
      },
      "revenueModel": "Print sales, legal notices, and commercial advertising",
      "logo": "newspaper-logos/gd/grenada-informer.svg",
      "logoExplainer": "Bold red and yellow title banner 'THE GRENADA INFORMER', iconic across island kiosks.",
      "sources": [
        "https://thegrenadainformer.com"
      ]
    },
    {
      "id": "gd-the-grenada-guardian",
      "countryCode": "GD",
      "name": "The Grenada Guardian",
      "founded": 1953,
      "frequency": "Weekly newspaper",
      "format": "Tabloid publication",
      "language": "English",
      "headquarters": "St. George's",
      "owner": {
        "name": "Guardian Publishing Ltd",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic political weekly founded by Eric Gairy; agricultural workers' rights, constitutional debates, and historical commentary",
      "readership": {
        "metric": "Historic paper read by political historians and community leaders throughout Grenada",
        "source": "Grenada National Archives 2023"
      },
      "revenueModel": "Print sales and community notices",
      "logo": "newspaper-logos/gd/the-grenada-guardian.svg",
      "logoExplainer": "Classic black serif title 'THE GRENADA GUARDIAN' on white ground, symbolising foundational post-war political press history.",
      "sources": [
        "https://en.wikipedia.org/wiki/Eric_Gairy"
      ]
    },
    {
      "id": "gd-pure-grenada-news",
      "countryCode": "GD",
      "name": "Pure Grenada News",
      "founded": 2018,
      "frequency": "Continuous digital news service",
      "format": "Digital multimedia portal",
      "language": "English",
      "headquarters": "St. George's",
      "owner": {
        "name": "Spice Isle Digital Media",
        "type": "Independent commercial media"
      },
      "editorialStance": "Digital news and tourism portal; eco-tourism promotions, marine conservation, cultural festivals (Spicemas), and diaspora affairs",
      "readership": {
        "metric": "Popular digital news channel engaging the Grenadian diaspora in the US, Canada, and the UK",
        "source": "Pure Grenada Digital Analytics 2024"
      },
      "revenueModel": "Digital display advertising and international tourism partnerships",
      "logo": "newspaper-logos/gd/pure-grenada-news.svg",
      "logoExplainer": "Golden-yellow and green emblem with nutmeg spice motif and clean typography 'Pure Grenada News', evoking the Spice Isle.",
      "sources": [
        "https://www.puregrenada.com"
      ]
    }
  ],
  "GE": [
    {
      "id": "ge-civil-ge",
      "countryCode": "GE",
      "name": "Civil.ge",
      "officialName": "Civil Georgia",
      "founded": 2001,
      "frequency": "Continuous digital news service",
      "format": "Digital investigative portal & multilingual daily",
      "language": "Georgian, English, Russian",
      "headquarters": "Tbilisi",
      "owner": {
        "name": "United Nations Association of Georgia (UNAG)",
        "type": "Non-profit independent foundation"
      },
      "editorialStance": "Non-partisan daily news portal dedicated to democratic consolidation; authoritative tracking of electoral processes, occupied territories (Abkhazia/South Ossetia), and European integration",
      "readership": {
        "metric": "Primary news source on Georgia for foreign embassies, international organizations, Western think tanks, and scholars",
        "source": "Civil.ge / UNAG Annual Review 2023"
      },
      "revenueModel": "International democratic governance grants and philanthropic donations",
      "logo": "newspaper-logos/ge/civil-ge.svg",
      "logoExplainer": "Clean white background with modern blue typography 'Civil.ge', representing objective, non-partisan analytical journalism.",
      "sources": [
        "https://civil.ge",
        "https://en.wikipedia.org/wiki/Civil_Georgia"
      ]
    },
    {
      "id": "ge-sakartvelos-respublika",
      "countryCode": "GE",
      "name": "Sakartvelos Respublika",
      "nativeName": "საქართველოს რესპუბლიკა",
      "englishTranslation": "Republic of Georgia",
      "founded": 1918,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "Georgian",
      "headquarters": "Tbilisi",
      "owner": {
        "name": "Sakartvelos Respublika Publishing",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic newspaper founded during the Democratic Republic of Georgia in 1918; constitutional history, academic essays, national culture, and public governance",
      "readership": {
        "metric": "Historic paper of record read widely by historians, civil servants, and the cultural intelligentsia",
        "source": "Georgian National Parliamentary Library 2023"
      },
      "revenueModel": "Print subscriptions, retail sales, and official announcements",
      "logo": "newspaper-logos/ge/sakartvelos-respublika.svg",
      "logoExplainer": "Historic Georgian Asomtavruli and Mkhedruli script calligraphy 'საქართველოს რესპუბლიკა' with the national coat of arms motif.",
      "sources": [
        "https://sakresh.ge",
        "https://ka.wikipedia.org/wiki/%E1%83%A1%E1%83%90%E1%83%A5%E1%83%90%E1%83%A0%E1%83%97%E1%83%95%E1%83%94%E1%83%9A%E1%83%9D%E1%83%A1_%E1%83%A0%E1%83%94%E1%83%A1%E1%83%A0%E1%83%A3%E1%83%91%E1%83%9A%E1%83%98%E1%83%99%E1%83%90_(%E1%83%92%E1%83%90%E1%83%96%E1%83%94%E1%83%97%E1%83%98)"
      ]
    },
    {
      "id": "ge-kviris-palitra",
      "countryCode": "GE",
      "name": "Kviris Palitra",
      "nativeName": "კვირის პალიტრა",
      "englishTranslation": "Weekly Palette",
      "founded": 1995,
      "frequency": "Weekly newspaper (Monday)",
      "format": "Broadsheet & digital network",
      "language": "Georgian",
      "headquarters": "Tbilisi",
      "owner": {
        "name": "Palitra Media Holding",
        "type": "Independent commercial media"
      },
      "editorialStance": "Georgia's largest circulation weekly newspaper; comprehensive political interviews, investigative exposés, military commentary, and cultural essays",
      "readership": {
        "metric": "Highest print circulation weekly in Georgia (~40,000 weekly copies) and 2.5 million monthly digital readers on kvirispalitra.ge",
        "source": "Palitra Media Holding 2024"
      },
      "revenueModel": "Print sales, digital subscriptions, and display advertising",
      "logo": "newspaper-logos/ge/kviris-palitra.svg",
      "logoExplainer": "Palette of colors and bold Georgian font 'კვირის პალიტრა', symbolising a diverse spectrum of national perspectives.",
      "sources": [
        "https://kvirispalitra.ge",
        "https://ka.wikipedia.org/wiki/%E1%83%99%E1%83%95%E1%83%98%E1%83%A0%E1%83%98%E1%83%A1_%E1%83%A0%E1%83%90%E1%83%9A%E1%83%98%E1%83%A2%E1%83%A0%E1%83%90"
      ]
    },
    {
      "id": "ge-rezo-nansi",
      "countryCode": "GE",
      "name": "Rezonansi",
      "nativeName": "რეზონანსი",
      "englishTranslation": "Resonance",
      "founded": 1990,
      "frequency": "Daily newspaper (Monday–Friday)",
      "format": "Tabloid & digital portal",
      "language": "Georgian",
      "headquarters": "Tbilisi",
      "owner": {
        "name": "Rezonansi Media (Malkhaz Rambashidze)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent daily newspaper founded during the national liberation movement; political analytics, economic reform, and investigative reporting",
      "readership": {
        "metric": "Longstanding daily read by political analysts, civil society leaders, and university students across Tbilisi",
        "source": "Rezonansi Media Archive 2023"
      },
      "revenueModel": "Print retail sales and digital display advertising",
      "logo": "newspaper-logos/ge/rezo-nansi.svg",
      "logoExplainer": "Red and black title banner with bold Georgian lettering 'რეზონანსი', representing public resonance and civic debate.",
      "sources": [
        "https://resonancedaily.com"
      ]
    }
  ],
  "GH": [
    {
      "id": "gh-daily-graphic",
      "countryCode": "GH",
      "name": "Daily Graphic",
      "founded": 1950,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Official public broadsheet & digital network",
      "language": "English",
      "headquarters": "Accra",
      "owner": {
        "name": "Graphic Communications Group Limited (GCGL)",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Ghana's national newspaper of record; government policy announcements, parliamentary debates, cocoa and gold mining economics, and educational notices",
      "readership": {
        "metric": "Largest print circulation newspaper in Ghana (~100,000 daily print copies) and leading digital portal Graphic Online with 4M+ monthly visits",
        "source": "Graphic Communications Group Annual Report 2023"
      },
      "revenueModel": "Commercial print circulation, state legal advertising, and digital display revenue",
      "logo": "newspaper-logos/gh/daily-graphic.svg",
      "logoExplainer": "Red and blue title banner with bold serif lettering 'Daily Graphic', symbolising over seventy years of authoritative Ghanaian journalism.",
      "sources": [
        "https://www.graphic.com.gh",
        "https://en.wikipedia.org/wiki/Daily_Graphic_(Ghana)"
      ]
    },
    {
      "id": "gh-the-ghanaian-times",
      "countryCode": "GH",
      "name": "The Ghanaian Times",
      "founded": 1958,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Official state broadsheet & digital portal",
      "language": "English",
      "headquarters": "Accra",
      "owner": {
        "name": "New Times Corporation (NTC)",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Founded by Ghana's first President Kwame Nkrumah; national development reporting, pan-African diplomacy, civil service affairs, and public healthcare",
      "readership": {
        "metric": "Second largest state-owned newspaper with universal distribution across all 16 regions of Ghana",
        "source": "New Times Corporation Ghana 2023"
      },
      "revenueModel": "State budget subsidies, print sales, and official government advertising",
      "logo": "newspaper-logos/gh/the-ghanaian-times.svg",
      "logoExplainer": "Classic black serif masthead 'THE GHANAIAN TIMES' on white ground, representing foundational post-independence national press.",
      "sources": [
        "https://ghanaiantimes.com.gh",
        "https://en.wikipedia.org/wiki/The_Ghanaian_Times"
      ]
    },
    {
      "id": "gh-daily-guide",
      "countryCode": "GH",
      "name": "Daily Guide",
      "founded": 1984,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Tabloid publication & digital portal",
      "language": "English",
      "headquarters": "Nima, Accra",
      "owner": {
        "name": "Western Publications Limited (Freddie Blay family)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Ghana's largest circulation private newspaper; center-right political stance; aggressive political scoops, crime investigations, and popular culture",
      "readership": {
        "metric": "Highest print circulation among private newspapers in Ghana (~50,000 daily copies) and popular dailyguideonline.com portal",
        "source": "Western Publications Media Kit 2023"
      },
      "revenueModel": "Print newsstand sales and private corporate advertising",
      "logo": "newspaper-logos/gh/daily-guide.svg",
      "logoExplainer": "Red banner with bold white serif font 'DAILY GUIDE', iconic across Ghanaian newsstands for over four decades.",
      "sources": [
        "https://dailyguidenetwork.com",
        "https://en.wikipedia.org/wiki/Daily_Guide"
      ]
    }
  ],
  "GM": [
    {
      "id": "gm-the-point",
      "countryCode": "GM",
      "name": "The Point",
      "founded": 1991,
      "frequency": "Daily newspaper (Monday–Friday)",
      "format": "Tabloid publication & digital portal",
      "language": "English",
      "headquarters": "Fajara, Kanifing / Banjul",
      "owner": {
        "name": "The Point Newspaper Ltd (Pap Saine)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Gambia's internationally acclaimed independent newspaper co-founded by Deyda Hydara; courageous press freedom pioneer, anti-corruption investigation, and democratic transition reporting",
      "readership": {
        "metric": "Winner of the IPI Free Media Pioneer Award; leading independent daily newspaper in the Gambia",
        "source": "The Point Newspaper Review 2023"
      },
      "revenueModel": "Print newsstand sales, legal notices, and commercial display advertising",
      "logo": "newspaper-logos/gm/the-point.svg",
      "logoExplainer": "Bold black and red serif masthead 'THE POINT' on white canvas, symbolising decades of brave journalistic integrity in West Africa.",
      "sources": [
        "https://thepoint.gm",
        "https://en.wikipedia.org/wiki/The_Point_(Gambia)"
      ]
    },
    {
      "id": "gm-foroyaa",
      "countryCode": "GM",
      "name": "Foroyaa",
      "nativeName": "Foroyaa",
      "englishTranslation": "Freedom / Emancipation",
      "founded": 1987,
      "frequency": "Daily newspaper",
      "format": "Tabloid publication & digital portal",
      "language": "English",
      "headquarters": "Serrekunda",
      "owner": {
        "name": "Foroyaa Publishing Co. (Halifa Sallah & Sam Sarr)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic socio-political daily newspaper; in-depth constitutional law, agricultural reform, human rights monitoring, and Truth, Reconciliation and Reparations Commission (TRRC) documentation",
      "readership": {
        "metric": "Highly respected analytical publication widely read across legal, academic, and parliamentary communities",
        "source": "Foroyaa Media Profile 2023"
      },
      "revenueModel": "Print sales, subscriptions, and civic society notices",
      "logo": "newspaper-logos/gm/foroyaa.svg",
      "logoExplainer": "Red and green title banner with bold uppercase typography 'FOROYAA', representing thirty-seven years of civic freedom struggle.",
      "sources": [
        "https://foroyaa.net",
        "https://en.wikipedia.org/wiki/Foroyaa"
      ]
    },
    {
      "id": "gm-kerr-fatou",
      "countryCode": "GM",
      "name": "Kerr Fatou",
      "englishTranslation": "Fatou's Home",
      "founded": 2016,
      "frequency": "Continuous digital news & live talk show",
      "format": "Digital multimedia portal & Web TV",
      "language": "English, Wolof, Mandinka",
      "headquarters": "Kanifing",
      "owner": {
        "name": "Kerr Fatou Media (Fatou Touray)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Leading digital multimedia news and talk-show platform; national political debates, investigative human interest stories, women's empowerment, and electoral analysis",
      "readership": {
        "metric": "Over 1.5 million monthly digital interactions across Facebook, YouTube, and kerrfatou.com; most watched digital political show in Gambia",
        "source": "Kerr Fatou Media Analytics 2024"
      },
      "revenueModel": "Digital video monetization, corporate sponsorships, and diaspora advertising",
      "logo": "newspaper-logos/gm/kerr-fatou.svg",
      "logoExplainer": "Vibrant pink and dark purple emblem featuring stylized typography 'KERR FATOU', symbolising women-led multimedia innovation.",
      "sources": [
        "https://www.kerrfatou.com"
      ]
    },
    {
      "id": "gm-the-chronicle-gambia",
      "countryCode": "GM",
      "name": "The Chronicle",
      "officialName": "The Gambia Chronicle",
      "founded": 2019,
      "frequency": "Continuous digital news service",
      "format": "Digital-only news portal & podcasts",
      "language": "English",
      "headquarters": "Banjul",
      "owner": {
        "name": "The Chronicle Media Co.",
        "type": "Independent commercial media"
      },
      "editorialStance": "Youth-led investigative digital outlet; investigative scoops, public expenditure tracking, environmental journalism, and migration reporting",
      "readership": {
        "metric": "Over 450,000 monthly digital readers among youth, students, and international development analysts",
        "source": "The Chronicle Audience Review 2024"
      },
      "revenueModel": "Digital banner advertising and philanthropic investigative grants",
      "logo": "newspaper-logos/gm/the-chronicle-gambia.svg",
      "logoExplainer": "Dark navy banner with crisp white serif typography 'THE CHRONICLE', reflecting analytical investigative journalism.",
      "sources": [
        "https://www.chronicle.gm"
      ]
    },
    {
      "id": "gm-daily-observer-gambia",
      "countryCode": "GM",
      "name": "Daily Observer",
      "founded": 1992,
      "frequency": "Daily newspaper (historic national daily)",
      "format": "Broadsheet & digital archive",
      "language": "English",
      "headquarters": "Bakau / Banjul",
      "owner": {
        "name": "Observer Company Ltd (Kenneth Best founded)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historically Gambia's first and largest daily broadsheet newspaper; chronicled national politics, sporting events, and cultural heritage",
      "readership": {
        "metric": "Historically the highest circulation print daily in the Gambia throughout the 1990s and 2000s",
        "source": "Gambia Press Union Historical Archive 2023"
      },
      "revenueModel": "Print sales and historical archives licensing",
      "logo": "newspaper-logos/gm/daily-observer-gambia.svg",
      "logoExplainer": "Classic serif masthead 'DAILY OBSERVER' in green and black, symbolising the foundation of daily print journalism in the Gambia.",
      "sources": [
        "https://en.wikipedia.org/wiki/Daily_Observer_(The_Gambia)"
      ]
    }
  ],
  "GN": [
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
  "GQ": [
    {
      "id": "gq-ahora-eg",
      "countryCode": "GQ",
      "name": "AhoraEG",
      "englishTranslation": "Now Equatorial Guinea",
      "founded": 2018,
      "frequency": "Continuous digital news service",
      "format": "Digital multimedia portal",
      "language": "Spanish",
      "headquarters": "Malabo & Bata",
      "owner": {
        "name": "AhoraEG Media Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Digital news and lifestyle portal; national economics, sports (Nzalang Nacional), youth initiatives, and cultural festivals in Malabo and Bata",
      "readership": {
        "metric": "Over 350,000 monthly digital visits; leading private online news destination inside Equatorial Guinea",
        "source": "AhoraEG Audience Analytics 2024"
      },
      "revenueModel": "Digital display advertising and sponsored corporate media",
      "logo": "newspaper-logos/gq/ahora-eg.svg",
      "logoExplainer": "Modern red and navy blue banner with bold typography 'AhoraEG', representing dynamic digital journalism.",
      "sources": [
        "https://ahoraeg.com"
      ]
    },
    {
      "id": "gq-real-equatorial-guinea",
      "countryCode": "GQ",
      "name": "Real Equatorial Guinea",
      "founded": 2019,
      "frequency": "Continuous digital news magazine",
      "format": "Digital magazine & portal",
      "language": "Spanish, English",
      "headquarters": "Malabo",
      "owner": {
        "name": "Real EG Media Network",
        "type": "Independent commercial media"
      },
      "editorialStance": "Bilingual digital magazine; entrepreneurship, tourism potential, arts, and positive development narratives from Equatorial Guinea",
      "readership": {
        "metric": "Widely read by young professionals, university students, and international expatriates in Malabo",
        "source": "Real EG Media Kit 2023"
      },
      "revenueModel": "Corporate partnerships and digital branding campaigns",
      "logo": "newspaper-logos/gq/real-equatorial-guinea.svg",
      "logoExplainer": "Gold and dark slate emblem featuring 'Real Equatorial Guinea', symbolising cultural pride and modern economic progress.",
      "sources": [
        "https://realequatorialguinea.com"
      ]
    },
    {
      "id": "gq-ebano",
      "countryCode": "GQ",
      "name": "Ébano",
      "englishTranslation": "Ebony",
      "founded": 1939,
      "frequency": "Weekly newspaper",
      "format": "Official state print tabloid",
      "language": "Spanish",
      "headquarters": "Malabo",
      "owner": {
        "name": "State of Equatorial Guinea (Ministerio de Información)",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Historic state-owned print publication in Malabo; government announcements, ministerial resolutions, and cultural events",
      "readership": {
        "metric": "Historic print newspaper distributed in government ministries and public administrative centers",
        "source": "Ministerio de Información, Prensa y Radio 2023"
      },
      "revenueModel": "State publishing subsidy",
      "logo": "newspaper-logos/gq/ébano.svg",
      "logoExplainer": "Classic black typography 'ÉBANO' on white ground, symbolising the historic print press of Bioko Island.",
      "sources": [
        "https://es.wikipedia.org/wiki/%C3%89bano_(peri%C3%B3dico)"
      ]
    },
    {
      "id": "gq-diario-rombe",
      "countryCode": "GQ",
      "name": "Diario Rombe",
      "founded": 2012,
      "frequency": "Continuous digital investigative portal",
      "format": "Investigative digital portal",
      "language": "Spanish",
      "headquarters": "Malabo / Spain (Diaspora)",
      "owner": {
        "name": "Rombe Media Group (Delfin Mocache Massoko)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent investigative news outlet operating primarily from the diaspora; human rights reporting, offshore financial transparency, and political accountability",
      "readership": {
        "metric": "Widely followed investigative outlet among civil society activists and the Equatorial Guinean diaspora worldwide",
        "source": "Diario Rombe Audience Report 2023"
      },
      "revenueModel": "Reader donations and investigative journalism grants",
      "logo": "newspaper-logos/gq/diario-rombe.svg",
      "logoExplainer": "Black and red emblem with stylized bold text 'DIARIO ROMBE', representing independent investigative journalism in exile.",
      "sources": [
        "https://diariorombe.es",
        "https://es.wikipedia.org/wiki/Diario_Rombe"
      ]
    }
  ],
  "GR": [
    {
      "id": "gr-kathimerini",
      "countryCode": "GR",
      "name": "Kathimerini",
      "nativeName": "Η Καθημερινή",
      "englishTranslation": "The Daily",
      "founded": 1919,
      "frequency": "Daily newspaper (Tuesday–Sunday)",
      "format": "Broadsheet & international digital portal",
      "language": "Greek, English (Kathimerini English Edition / NYT)",
      "headquarters": "Neo Faliro, Athens",
      "owner": {
        "name": "Kathimerini Publishing (Alafouzos family)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Greece's historic center-right newspaper of record; distinguished for serious political commentary, European Union policy, Aegean maritime affairs, and arts",
      "readership": {
        "metric": "Largest subscription broadsheet in Greece and leading digital network with 6+ million monthly unique visitors on kathimerini.gr",
        "source": "Kathimerini Publishing Annual Review 2023"
      },
      "revenueModel": "Digital paywall subscriptions, print sales, and corporate advertising",
      "logo": "newspaper-logos/gr/kathimerini.svg",
      "logoExplainer": "Classical black Greek serif typography 'Η ΚΑΘΗΜΕΡΙΝΗ' on white canvas, the benchmark masthead of Greek quality journalism.",
      "sources": [
        "https://www.kathimerini.gr",
        "https://en.wikipedia.org/wiki/Kathimerini"
      ]
    },
    {
      "id": "gr-ta-nea",
      "countryCode": "GR",
      "name": "Ta Nea",
      "nativeName": "Τα Νέα",
      "englishTranslation": "The News",
      "founded": 1931,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Berliner format & digital portal",
      "language": "Greek",
      "headquarters": "Kallithea, Athens",
      "owner": {
        "name": "Alter Ego Media (Vangelis Marinakis)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historically Greece's highest circulated daily newspaper; center-left social-liberal editorial stance; national politics, parliamentary debates, and social welfare",
      "readership": {
        "metric": "Consistently among the top two daily print newspapers in Greece with 4.5 million monthly digital readers on tanea.gr",
        "source": "Alter Ego Media Audience Report 2024"
      },
      "revenueModel": "Print newsstand sales, digital subscriptions, and commercial advertising",
      "logo": "newspaper-logos/gr/ta-nea.svg",
      "logoExplainer": "Red and blue emblem with bold white Greek lettering 'ΤΑ ΝΕΑ', iconic across Greek kiosks for almost a century.",
      "sources": [
        "https://www.tanea.gr",
        "https://en.wikipedia.org/wiki/Ta_Nea"
      ]
    },
    {
      "id": "gr-to-vima",
      "countryCode": "GR",
      "name": "To Vima",
      "nativeName": "Το Βήμα",
      "englishTranslation": "The Tribune / Rostrum",
      "founded": 1922,
      "frequency": "Weekly newspaper (Sunday) & continuous digital portal",
      "format": "Broadsheet & digital portal",
      "language": "Greek",
      "headquarters": "Athens",
      "owner": {
        "name": "Alter Ego Media",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic intellectual Sunday newspaper; in-depth political investigations, foreign policy diplomacy, economic reforms, and literary reviews",
      "readership": {
        "metric": "Dominant Sunday print circulation in Greece and influential digital readership on tovima.gr",
        "source": "Alter Ego Media Review 2023"
      },
      "revenueModel": "Sunday print sales, premium book/magazine bundle sales, and digital advertising",
      "logo": "newspaper-logos/gr/to-vima.svg",
      "logoExplainer": "Blue banner with classical white Greek serif font 'ΤΟ ΒΗΜΑ', symbolising over a century of political authority.",
      "sources": [
        "https://www.tovima.gr",
        "https://en.wikipedia.org/wiki/To_Vima"
      ]
    },
    {
      "id": "gr-naftemporiki",
      "countryCode": "GR",
      "name": "Naftemporiki",
      "nativeName": "Η Ναυτεμπορική",
      "englishTranslation": "The Shipping and Commercial",
      "founded": 1924,
      "frequency": "Daily financial newspaper (Monday–Friday)",
      "format": "Salmon broadsheet & digital financial portal",
      "language": "Greek",
      "headquarters": "Athens",
      "owner": {
        "name": "Aegean Media (Dimitris Melissanidis)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Greece's premier shipping, financial, and economic daily; Athens Exchange, Greek merchant shipping fleet (world's largest commercial fleet), tourism economics, and European fiscal policy",
      "readership": {
        "metric": "Over 100 years of financial reporting; mandatory daily reading for Greek shipowners, banking executives, and industrial leaders",
        "source": "Naftemporiki Centennial Review 2024"
      },
      "revenueModel": "Corporate subscriptions and financial market advertising",
      "logo": "newspaper-logos/gr/naftemporiki.svg",
      "logoExplainer": "Navy blue banner with classical white Greek typography 'Η ΝΑΥΤΕΜΠΟΡΙΚΗ', embodying maritime shipping and commerce excellence.",
      "sources": [
        "https://www.naftemporiki.gr",
        "https://en.wikipedia.org/wiki/Naftemporiki"
      ]
    },
    {
      "id": "gr-efimerida-ton-syntakton",
      "countryCode": "GR",
      "name": "Efimerida ton Syntakton",
      "officialName": "EFSYN",
      "nativeName": "Η Εφημερίδα των Συντακτών",
      "englishTranslation": "The Journalists' Newspaper",
      "founded": 2012,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Tabloid publication & digital portal",
      "language": "Greek",
      "headquarters": "Kolokotroni Street, Athens",
      "owner": {
        "name": "Cooperative of Journalists and Employees (Worker Cooperative)",
        "type": "Non-profit independent trust"
      },
      "editorialStance": "Unique cooperative daily owned entirely by its journalists; left-wing progressive stance championing human rights, refugee solidarity, labor rights, and anti-austerity analysis",
      "readership": {
        "metric": "Over 2 million monthly digital visitors on efsyn.gr and dedicated nationwide print subscriber base",
        "source": "EFSYN Cooperative Annual Report 2023"
      },
      "revenueModel": "Reader cooperative subscriptions, print sales, and community advertising",
      "logo": "newspaper-logos/gr/efimerida-ton-syntakton.svg",
      "logoExplainer": "Red and black badge with stylized Greek typography 'ΕΦ.ΣΥΝ.', representing cooperative worker-owned journalism in Greece.",
      "sources": [
        "https://www.efsyn.gr",
        "https://en.wikipedia.org/wiki/Efimerida_ton_Syntakton"
      ]
    }
  ],
  "GT": [
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
  "GW": [
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
  "GY": [
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
    },
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
    }
  ],
  "HN": [
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
  "HR": [
    {
      "id": "hr-vecernji-list",
      "countryCode": "HR",
      "name": "Večernji list",
      "englishTranslation": "Evening Paper",
      "founded": 1959,
      "frequency": "Daily newspaper",
      "format": "Compact daily & digital portal",
      "language": "Croatian",
      "headquarters": "Zagreb",
      "owner": {
        "name": "Styria Media Group AG",
        "type": "Independent commercial media"
      },
      "editorialStance": "Center-right mainstream daily newspaper of record; national political commentary, European Union affairs, and cultural reviews",
      "readership": {
        "metric": "Over 2.2 million monthly unique digital visitors on vecernji.hr and leading print circulation in Zagreb",
        "source": "Styria Media Group Croatia 2023"
      },
      "revenueModel": "Digital subscriptions, print sales, and commercial advertising",
      "logo": "newspaper-logos/hr/večernji-list.svg",
      "logoExplainer": "Red and black logo with stylized bold text 'Večernji list', an iconic masthead across Croatia for over sixty years.",
      "sources": [
        "https://www.vecernji.hr",
        "https://en.wikipedia.org/wiki/Ve%C4%8Dernji_list"
      ]
    },
    {
      "id": "hr-jutarnji-list",
      "countryCode": "HR",
      "name": "Jutarnji list",
      "englishTranslation": "Morning Paper",
      "founded": 1998,
      "frequency": "Daily newspaper",
      "format": "Berliner & digital portal",
      "language": "Croatian",
      "headquarters": "Zagreb",
      "owner": {
        "name": "Hanza Media",
        "type": "Independent commercial media"
      },
      "editorialStance": "Center-left liberal daily; investigative journalism, political reform, business analysis, and arts coverage",
      "readership": {
        "metric": "Over 2.4 million monthly unique digital visitors on jutarnji.hr; flagship publication of Hanza Media",
        "source": "Hanza Media Audience Report 2024"
      },
      "revenueModel": "Digital paywall subscriptions, print sales, and display advertising",
      "logo": "newspaper-logos/hr/jutarnji-list.svg",
      "logoExplainer": "Deep blue banner with modern bold white serif lettering 'JutarnjiLIST', symbolising contemporary liberal journalism.",
      "sources": [
        "https://www.jutarnji.hr",
        "https://en.wikipedia.org/wiki/Jutarnji_list"
      ]
    },
    {
      "id": "hr-24sata",
      "countryCode": "HR",
      "name": "24sata",
      "englishTranslation": "24 Hours",
      "founded": 2005,
      "frequency": "Daily newspaper",
      "format": "Tabloid & multimedia portal",
      "language": "Croatian",
      "headquarters": "Zagreb",
      "owner": {
        "name": "Styria Media Group AG",
        "type": "Independent commercial media"
      },
      "editorialStance": "Popular tabloid; breaking news, visual reporting, social exposés, sports, and entertainment",
      "readership": {
        "metric": "Highest daily print circulation in Croatia and premier digital news website with 2.8M+ monthly unique users",
        "source": "Styria Media Croatia Audience Review 2024"
      },
      "revenueModel": "Retail print sales, programmatic digital advertising, and native video production",
      "logo": "newspaper-logos/hr/24sata.svg",
      "logoExplainer": "Orange rectangular badge featuring white numeral '24' and text 'sata', representing 24-hour fast-paced multimedia news.",
      "sources": [
        "https://www.24sata.hr",
        "https://en.wikipedia.org/wiki/24sata_(Croatia)"
      ]
    },
    {
      "id": "hr-slobodna-dalmacija",
      "countryCode": "HR",
      "name": "Slobodna Dalmacija",
      "englishTranslation": "Free Dalmatia",
      "founded": 1943,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & regional portal",
      "language": "Croatian",
      "headquarters": "Split, Dalmatia",
      "owner": {
        "name": "Hanza Media",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic regional daily newspaper founded as an anti-fascist partisan paper; voice of Dalmatia, maritime commerce, and Adriatic tourism",
      "readership": {
        "metric": "Leading daily newspaper in southern Croatia and the Adriatic coast with 1.8M monthly readers",
        "source": "Hanza Media Regional Division 2023"
      },
      "revenueModel": "Print circulation and regional corporate advertising",
      "logo": "newspaper-logos/hr/slobodna-dalmacija.svg",
      "logoExplainer": "Classic blue and white title banner with serif typography 'SLOBODNA DALMACIJA', evoking the Adriatic sea and Mediterranean tradition.",
      "sources": [
        "https://slobodnadalmacija.hr",
        "https://en.wikipedia.org/wiki/Slobodna_Dalmacija"
      ]
    },
    {
      "id": "hr-novi-list",
      "countryCode": "HR",
      "name": "Novi list",
      "englishTranslation": "New Paper",
      "founded": 1900,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & regional portal",
      "language": "Croatian",
      "headquarters": "Rijeka, Kvarner",
      "owner": {
        "name": "Media Solutions",
        "type": "Independent commercial media"
      },
      "editorialStance": "Centrist quality daily; primary voice of Rijeka, Istria, and Kvarner Bay focusing on local governance and industry",
      "readership": {
        "metric": "Oldest active daily newspaper in Croatia, dominating regional readership in western Croatia",
        "source": "Novi List Nakladnik 2023"
      },
      "revenueModel": "Print sales, subscriptions, and display advertising",
      "logo": "newspaper-logos/hr/novi-list.svg",
      "logoExplainer": "Red and black uppercase masthead 'NOVI LIST' on white ground, symbolising century-old civic journalism in Rijeka.",
      "sources": [
        "https://www.novilist.hr",
        "https://en.wikipedia.org/wiki/Novi_list"
      ]
    }
  ],
  "HT": [
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
  "HU": [
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
  "ID": [
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
  "IE": [
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
    }
  ],
  "IL": [
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
  "IN": [
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
    }
  ],
  "IQ": [
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
  "IR": [
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
  "IS": [
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
  "IT": [
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
    }
  ],
  "JM": [
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
    }
  ],
  "JO": [
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
  "JP": [
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
    }
  ],
  "KE": [
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
    }
  ],
  "KG": [
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
  "KH": [
    {
      "id": "kh-rasmei-kampuchea",
      "countryCode": "KH",
      "name": "Rasmei Kampuchea Daily",
      "englishTranslation": "Light of Cambodia Daily",
      "founded": 1993,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "Khmer",
      "headquarters": "Phnom Penh",
      "owner": {
        "name": "Rasmei Kampuchea Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Leading Khmer-language commercial daily newspaper; domestic politics, sports, crime, and culture",
      "readership": {
        "metric": "Highest print circulation Khmer daily newspaper in Cambodia (~18,000 daily print copies)",
        "source": "Rasmei Kampuchea Publishing Review 2023"
      },
      "revenueModel": "Print retail sales and commercial display advertising",
      "logo": "newspaper-logos/kh/rasmei-kampuchea.png",
      "logoExplainer": "Red title banner featuring traditional Khmer script 'រស្មីកម្ពុជា' and yellow subtitle.",
      "sources": [
        "https://www.rasmeinews.com",
        "https://en.wikipedia.org/wiki/Rasmei_Kampuchea_Daily"
      ]
    },
    {
      "id": "kh-phnom-penh-post",
      "countryCode": "KH",
      "name": "The Phnom Penh Post",
      "founded": 1992,
      "frequency": "Daily (Monday–Friday)",
      "format": "Broadsheet & digital portal",
      "language": "English, Khmer",
      "headquarters": "Phnom Penh",
      "owner": {
        "name": "Post Media Co. Ltd",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic English-language daily newspaper in Cambodia; business, foreign affairs, and national news",
      "readership": {
        "metric": "Oldest English newspaper in Cambodia (est. 1992); widely read by business leaders and diplomatic sector",
        "source": "Post Media Review 2023"
      },
      "revenueModel": "Print newsstand sales, display advertising, and digital subscriptions",
      "logo": "newspaper-logos/kh/phnom-penh-post.png",
      "logoExplainer": "Classic black serif title font 'The Phnom Penh Post' on white canvas.",
      "sources": [
        "https://www.phnompenhpost.com",
        "https://en.wikipedia.org/wiki/The_Phnom_Penh_Post"
      ]
    },
    {
      "id": "kh-khmer-times",
      "countryCode": "KH",
      "name": "Khmer Times",
      "founded": 2014,
      "frequency": "Daily (Monday–Friday)",
      "format": "Broadsheet & digital portal",
      "language": "English",
      "headquarters": "Phnom Penh",
      "owner": {
        "name": "Virtus Media Pte Ltd",
        "type": "Independent commercial media"
      },
      "editorialStance": "Commercial English daily newspaper; business development, ASEAN affairs, and local news",
      "readership": {
        "metric": "Major daily reach among expatriates, business sector, and international community in Phnom Penh",
        "source": "Khmer Times Media Kit 2024"
      },
      "revenueModel": "Print sales, commercial display ads, and digital partnerships",
      "logo": "newspaper-logos/kh/khmer-times.png",
      "logoExplainer": "Dark slate logo banner with bright blue text 'KHMER TIMES'.",
      "sources": [
        "https://www.khmertimeskh.com",
        "https://en.wikipedia.org/wiki/Khmer_Times"
      ]
    },
    {
      "id": "kh-koh-santepheap",
      "countryCode": "KH",
      "name": "Koh Santepheap Daily",
      "englishTranslation": "Island of Peace Daily",
      "founded": 1967,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "Khmer",
      "headquarters": "Phnom Penh",
      "owner": {
        "name": "Koh Santepheap Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic popular Khmer daily paper; breaking crime, local news, and community stories",
      "readership": {
        "metric": "One of Cambodia's oldest and most popular Khmer-language newspapers",
        "source": "Koh Santepheap Media Kit 2023"
      },
      "revenueModel": "Print sales and local commercial advertising",
      "logo": "newspaper-logos/kh/koh-santepheap.jpg",
      "logoExplainer": "Forest green banner featuring traditional Khmer script 'កោះសន្តិភាព'.",
      "sources": [
        "https://kohsantepheapdaily.com.kh",
        "https://en.wikipedia.org/wiki/Koh_Santepheap_Daily"
      ]
    }
  ],
  "KI": [
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
  "KM": [
    {
      "id": "km-al-watwan",
      "countryCode": "KM",
      "name": "Al-Watwan",
      "nativeName": "Al-Watwan",
      "englishTranslation": "The Homeland",
      "founded": 1985,
      "frequency": "Daily newspaper (Monday–Friday)",
      "format": "Official state daily broadsheet & digital portal",
      "language": "French, Arabic",
      "headquarters": "Moroni, Grande Comore",
      "owner": {
        "name": "Union of the Comoros (Ministère des Télécommunications)",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Official national public daily newspaper; presidential decrees, inter-island development, parliamentary affairs, and Indian Ocean diplomacy",
      "readership": {
        "metric": "Only national daily print newspaper in the Comoros, distributed across Grande Comore, Anjouan, and Mohéli",
        "source": "Al-Watwan Presse d'État Rapport 2023"
      },
      "annualPublicFunding": {
        "total": "KMF 85 million (~US$185,000) national operating allocation",
        "perCapita": "KMF 95 / person / year (~US$0.21)"
      },
      "revenueModel": "State operating subsidy, print sales, and official legal notices",
      "logo": "newspaper-logos/km/al-watwan.svg",
      "logoExplainer": "Green title banner with white serif font 'AL-WATWAN', embodying the national color of Comoros and state press heritage.",
      "sources": [
        "https://alwatwan.net",
        "https://fr.wikipedia.org/wiki/Al-Watwan"
      ]
    },
    {
      "id": "km-la-gazette-des-comores",
      "countryCode": "KM",
      "name": "La Gazette des Comores",
      "englishTranslation": "The Comoros Gazette",
      "founded": 1999,
      "frequency": "Daily newspaper",
      "format": "Tabloid & digital portal",
      "language": "French",
      "headquarters": "Moroni",
      "owner": {
        "name": "Housseine Saïd / Groupe La Gazette",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent commercial daily; political debates, social issues, regional economy, and human rights coverage in Comoros",
      "readership": {
        "metric": "Leading independent print and digital daily in Moroni with widespread readership across the islands",
        "source": "Groupe La Gazette Media Review 2023"
      },
      "revenueModel": "Print sales and local business advertising",
      "logo": "newspaper-logos/km/la-gazette-des-comores.svg",
      "logoExplainer": "White canvas displaying bold black font 'La Gazette des Comores', representing independent civic journalism.",
      "sources": [
        "https://lagazettedescomores.com"
      ]
    },
    {
      "id": "km-habari-za-comores",
      "countryCode": "KM",
      "name": "Habari Za Comores",
      "nativeName": "Habari Za Comores",
      "englishTranslation": "News of Comoros",
      "founded": 2010,
      "frequency": "Continuous digital news portal",
      "format": "Digital news portal",
      "language": "French, Comorian (Shikomori)",
      "headquarters": "Moroni",
      "owner": {
        "name": "Habari Media Network",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent digital news outlet; community news, cultural preservation, diaspora connections, and civic affairs",
      "readership": {
        "metric": "Over 450,000 monthly digital visitors across Comoros, Mayotte, and the French diaspora",
        "source": "Habari Za Comores Analytics 2024"
      },
      "revenueModel": "Digital banner advertising and diaspora promotions",
      "logo": "newspaper-logos/km/habari-za-comores.svg",
      "logoExplainer": "White banner with bold green and navy typography 'HABARI ZA COMORES', symbolising community news and archipelago culture.",
      "sources": [
        "https://habarizacomores.com"
      ]
    },
    {
      "id": "km-comores-infos",
      "countryCode": "KM",
      "name": "Comores-Infos",
      "englishTranslation": "Comoros News",
      "founded": 2012,
      "frequency": "Continuous digital news service",
      "format": "Digital multimedia portal",
      "language": "French",
      "headquarters": "Moroni",
      "owner": {
        "name": "Comores Infos Médias",
        "type": "Independent commercial media"
      },
      "editorialStance": "Digital news and multimedia portal; breaking national news, sports, youth initiatives, and social commentary",
      "readership": {
        "metric": "High engagement on mobile and social networks across the island archipelago",
        "source": "Comores Infos Digital Review 2023"
      },
      "revenueModel": "Digital display ads and multimedia sponsorships",
      "logo": "newspaper-logos/km/comores-infos.svg",
      "logoExplainer": "Red title banner with modern white typography 'COMORES INFOS', symbolising dynamic digital breaking news.",
      "sources": [
        "https://www.comoresinfos.net"
      ]
    },
    {
      "id": "km-mwali-info",
      "countryCode": "KM",
      "name": "Mwali Info",
      "englishTranslation": "Mohéli News",
      "founded": 2014,
      "frequency": "Digital portal",
      "format": "Regional digital news service",
      "language": "French, Shikomori",
      "headquarters": "Fomboni, Mohéli",
      "owner": {
        "name": "Collectif des Journalistes de Mohéli",
        "type": "Independent commercial media"
      },
      "editorialStance": "Regional media voice of Mohéli Island; biosphere reserve conservation, local governance, and island agricultural affairs",
      "readership": {
        "metric": "Primary news portal dedicated to Mohéli island affairs and ecological tourism",
        "source": "Mohéli Media Collective 2023"
      },
      "revenueModel": "Community sponsorships and tourism advertising",
      "logo": "newspaper-logos/km/mwali-info.svg",
      "logoExplainer": "Yellow title block with bold blue font 'MWALI INFO', reflecting the vibrant biodiversity and island heritage of Mohéli.",
      "sources": [
        "https://fr.wikipedia.org/wiki/Moh%C3%A9li"
      ]
    }
  ],
  "KN": [
    {
      "id": "kn-skn-observer",
      "countryCode": "KN",
      "name": "The St. Kitts-Nevis Observer",
      "nativeName": "The St. Kitts-Nevis Observer",
      "englishTranslation": "The St. Kitts-Nevis Observer",
      "founded": 1994,
      "frequency": "Weekly newspaper (Friday)",
      "format": "Tabloid & digital news portal (thestkittsnevisobserver.com)",
      "language": "English",
      "headquarters": "Charlestown, Nevis & Basseterre, St. Kitts",
      "owner": {
        "name": "Observer Publications Ltd",
        "type": "Independent commercial publisher"
      },
      "editorialStance": "The Federation's largest circulation printed weekly newspaper; providing balanced coverage bridging both islands (Saint Kitts and Nevis) with investigative reporting, local court reports, sports, and regional OECS news",
      "readership": {
        "metric": "Over 7,000 print copies weekly and over 400,000 monthly page views online, reaching locals and the worldwide Kittitian/Nevisian diaspora",
        "source": "The Observer Media Kit 2023"
      },
      "revenueModel": "Print sales, classified advertising, and digital banner placements",
      "logo": "newspaper-logos/kn/skn-observer.svg",
      "logoExplainer": "Deep navy blue rectangular card displaying white serif title 'The St. Kitts-Nevis' accented by bold golden serif wordmark 'OBSERVER'.",
      "sources": [
        "https://www.thestkittsnevisobserver.com",
        "https://en.wikipedia.org/wiki/Saint_Kitts_and_Nevis"
      ]
    },
    {
      "id": "kn-the-labour-spokesman",
      "countryCode": "KN",
      "name": "The Labour Spokesman",
      "nativeName": "The Labour Spokesman",
      "englishTranslation": "The Labour Spokesman",
      "founded": 1957,
      "frequency": "Bi-weekly newspaper (Wednesday & Friday)",
      "format": "Tabloid & digital portal",
      "language": "English",
      "headquarters": "Masses House, Church Street, Basseterre",
      "owner": {
        "name": "St. Kitts-Nevis Trades and Labour Union / Labour Party",
        "type": "Trade union & political publisher"
      },
      "editorialStance": "Historic printed newspaper founded in 1957; the official organ of the St. Kitts-Nevis Trades and Labour Union; known for strong advocacy of worker rights, social justice, labor policies, and Caribbean progressive political thought",
      "readership": {
        "metric": "Circulated to over 4,000 weekly readers across Saint Kitts and Nevis",
        "source": "SKNT&LU Annual Report 2023"
      },
      "revenueModel": "Print sales, union dues, and classified advertisements",
      "logo": "newspaper-logos/kn/the-labour-spokesman.svg",
      "logoExplainer": "Bold scarlet red background displaying classical white serif lettering 'The Labour Spokesman' and heritage tagline 'EST. 1957'.",
      "sources": [
        "https://www.facebook.com/LabourSpokesman",
        "https://en.wikipedia.org/wiki/Saint_Kitts_and_Nevis"
      ]
    },
    {
      "id": "kn-sknvibes",
      "countryCode": "KN",
      "name": "SKNVibes",
      "nativeName": "SKNVibes",
      "englishTranslation": "SKNVibes",
      "founded": 2002,
      "frequency": "Continuous digital breaking news and multimedia portal",
      "format": "Digital news portal & mobile app (sknvibes.com)",
      "language": "English",
      "headquarters": "Basseterre, Saint Kitts",
      "owner": {
        "name": "SKNVibes Inc.",
        "type": "Independent digital media company"
      },
      "editorialStance": "Leading online news and entertainment network in Saint Kitts and Nevis; focuses on fast breaking news, crime updates, live election results, community announcements, and Caribbean cultural carnivals (Sugar Mas)",
      "readership": {
        "metric": "Over 800,000 monthly digital visits, serving as a primary daily homepage for residents and overseas Kittitian/Nevisian communities",
        "source": "SKNVibes Traffic Metrics 2023"
      },
      "revenueModel": "Digital banner advertising, classifieds, and event ticketing",
      "logo": "newspaper-logos/kn/sknvibes.svg",
      "logoExplainer": "Dark charcoal background featuring modern sans-serif typography 'SKN' in white with 'Vibes' in yellow and green subtitle.",
      "sources": [
        "https://www.sknvibes.com",
        "https://en.wikipedia.org/wiki/Saint_Kitts_and_Nevis"
      ]
    }
  ],
  "KP": [
    {
      "id": "kp-rodong-sinmun",
      "countryCode": "KP",
      "name": "Rodong Sinmun",
      "nativeName": "로동신문",
      "englishTranslation": "Workers' Newspaper",
      "founded": 1945,
      "frequency": "Daily morning newspaper (Monday–Sunday)",
      "format": "Broadsheet & digital edition",
      "language": "Korean, English, Chinese",
      "headquarters": "Central District, Pyongyang",
      "owner": {
        "name": "Central Committee of the Workers' Party of Korea",
        "type": "Ruling party official organ"
      },
      "editorialStance": "Official organ of the Central Committee of the Workers' Party of Korea; the country's most authoritative newspaper, publishing party editorials, ideological guidance, economic production quotas, and national decrees",
      "readership": {
        "metric": "Print circulation estimated at 1.5 million copies daily, delivered to party committees, factories, collective farms, and military units nationwide",
        "source": "KWP Central Committee Publishing Department 2023"
      },
      "revenueModel": "State-subsidized party distribution",
      "logo": "newspaper-logos/kp/rodong-sinmun.svg",
      "logoExplainer": "Red and white field featuring the iconic red brush-stroke Korean script '로동신문' (Rodong Sinmun), the voice of the Workers' Party of Korea.",
      "sources": [
        "http://www.rodong.rep.kp",
        "https://en.wikipedia.org/wiki/Rodong_Sinmun"
      ]
    },
    {
      "id": "kp-minju-choson",
      "countryCode": "KP",
      "name": "Minju Choson",
      "nativeName": "민주조선",
      "englishTranslation": "Democratic Korea",
      "founded": 1945,
      "frequency": "Daily newspaper (Tuesday–Sunday)",
      "format": "Broadsheet",
      "language": "Korean",
      "headquarters": "Pyongyang",
      "owner": {
        "name": "Standing Committee of the Supreme People's Assembly and the Cabinet",
        "type": "State government organ"
      },
      "editorialStance": "Official newspaper of the Cabinet of North Korea and the Supreme People's Assembly; focuses on civil administration, legal jurisprudence, ministerial decrees, industrial technology, and local people's committees",
      "readership": {
        "metric": "Estimated circulation of 200,000 copies distributed to government ministries, civil administrative offices, and state enterprises",
        "source": "DPRK Cabinet Publishing Administration 2023"
      },
      "revenueModel": "State government budget allocation",
      "logo": "newspaper-logos/kp/minju-choson.svg",
      "logoExplainer": "Deep navy blue background displaying elegant white Korean calligraphic lettering '민주조선' (Minju Choson), representing the government cabinet gazette.",
      "sources": [
        "https://en.wikipedia.org/wiki/Minju_Choson"
      ]
    },
    {
      "id": "kp-pyongyang-times",
      "countryCode": "KP",
      "name": "The Pyongyang Times",
      "founded": 1965,
      "frequency": "Weekly newspaper (Saturdays) & continuous digital portal",
      "format": "Tabloid & digital portal",
      "language": "English, French",
      "headquarters": "Pyongyang",
      "owner": {
        "name": "Foreign Languages Publishing House",
        "type": "State foreign language publisher"
      },
      "editorialStance": "Primary foreign-language propaganda newspaper; presents DPRK viewpoints, cultural heritage, diplomatic communiqués, and economic developments to foreign diplomats, visitors, and overseas readers",
      "readership": {
        "metric": "Distributed to foreign embassies, international organizations, tourist hotels in Pyongyang, and read online internationally",
        "source": "Foreign Languages Publishing House DPRK 2023"
      },
      "revenueModel": "State foreign publication budget",
      "logo": "newspaper-logos/kp/pyongyang-times.svg",
      "logoExplainer": "Dark slate field with commanding white English serif typography 'The Pyongyang Times', denoting foreign-language state reporting.",
      "sources": [
        "http://www.pyongyangtimes.com.kp",
        "https://en.wikipedia.org/wiki/The_Pyongyang_Times"
      ]
    }
  ],
  "KR": [
    {
      "id": "kr-chosun-ilbo",
      "countryCode": "KR",
      "name": "The Chosun Ilbo",
      "nativeName": "조선일보",
      "englishTranslation": "Joseon Daily News",
      "founded": 1920,
      "frequency": "Daily newspaper (Monday–Saturday) & TV Chosun",
      "format": "Broadsheet, cable TV & digital portal",
      "language": "Korean, English, Japanese, Chinese",
      "headquarters": "Jung-gu, Seoul",
      "owner": {
        "name": "Chosun Ilbo Co., Ltd.",
        "type": "Independent commercial media group"
      },
      "editorialStance": "South Korea's oldest and highest-circulation commercial daily; conservative flagship newspaper championing free-market enterprise, US-ROK alliance, and traditional values",
      "readership": {
        "metric": "Over 1.1 million daily print circulation and leading online portal chosun.com with over 15 million monthly unique readers",
        "source": "Audit Bureau of Circulations (ABC) Korea 2023"
      },
      "revenueModel": "Print sales, digital premium memberships, and major commercial advertising",
      "logo": "newspaper-logos/kr/chosun-ilbo.svg",
      "logoExplainer": "Stark white canvas featuring historic black Hanja calligraphy '朝鮮日報' (The Chosun Ilbo), denoting over a century of Korean press history.",
      "sources": [
        "https://www.chosun.com",
        "https://en.wikipedia.org/wiki/The_Chosun_Ilbo"
      ]
    },
    {
      "id": "kr-joongang-ilbo",
      "countryCode": "KR",
      "name": "JoongAng Ilbo",
      "nativeName": "중앙일보",
      "englishTranslation": "Central Daily News",
      "founded": 1965,
      "frequency": "Daily newspaper (Monday–Saturday) & JTBC",
      "format": "Compact/broadsheet & digital portal (joongang.co.kr)",
      "language": "Korean, English (Korea JoongAng Daily), Chinese",
      "headquarters": "Mapo-gu, Seoul",
      "owner": {
        "name": "JoongAng Holdings (JoongAng Group)",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Major national daily broadsheet; conservative-leaning, investigative journalism, economic policy, and inter-Korean affairs",
      "readership": {
        "metric": "Over 850,000 daily print circulation and over 12 million monthly digital users across the JoongAng network",
        "source": "Korea ABC Statement 2023"
      },
      "revenueModel": "Print circulation, enterprise subscriptions, broadcast ads, and digital sponsorships",
      "logo": "newspaper-logos/kr/joongang-ilbo.svg",
      "logoExplainer": "Royal blue background with clean white bold typography 'JoongAng Ilbo' and signature orange disc emblem, symbolizing central journalistic balance.",
      "sources": [
        "https://www.joongang.co.kr",
        "https://koreajoongangdaily.joins.com",
        "https://en.wikipedia.org/wiki/JoongAng_Ilbo"
      ]
    },
    {
      "id": "kr-donga-ilbo",
      "countryCode": "KR",
      "name": "The Dong-A Ilbo",
      "nativeName": "동아일보",
      "englishTranslation": "East Asia Daily",
      "founded": 1920,
      "frequency": "Daily newspaper (Monday–Saturday) & Channel A",
      "format": "Broadsheet, cable TV & digital portal",
      "language": "Korean, English, Japanese, Chinese",
      "headquarters": "Jongno-gu, Seoul",
      "owner": {
        "name": "Dong-A Ilbo Co.",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Centennial newspaper of record; center-right editorial tradition with strong investigative journalism into political accountability, cultural preservation, and educational philanthropy",
      "readership": {
        "metric": "Over 800,000 daily print circulation and influential multimedia reach via Channel A cable network",
        "source": "Korea ABC Statement 2023"
      },
      "revenueModel": "Print sales, corporate advertising, and broadcasting commercial revenues",
      "logo": "newspaper-logos/kr/donga-ilbo.svg",
      "logoExplainer": "Deep crimson red rectangular field with prominent white Hanja typography '東亞日報' (The Dong-A Ilbo), honoring anti-colonial heritage.",
      "sources": [
        "https://www.donga.com",
        "https://en.wikipedia.org/wiki/The_Dong-a_Ilbo"
      ]
    },
    {
      "id": "kr-hankyoreh",
      "countryCode": "KR",
      "name": "The Hankyoreh",
      "nativeName": "한겨레",
      "englishTranslation": "One People / The Korean Nation",
      "founded": 1988,
      "frequency": "Daily newspaper (Monday–Saturday) & digital portal",
      "format": "Broadsheet & digital news portal",
      "language": "Korean, English",
      "headquarters": "Mapo-gu, Seoul",
      "owner": {
        "name": "Hankyoreh Media Group (Citizen Shareholder Cooperative)",
        "type": "Citizen-owned independent media"
      },
      "editorialStance": "South Korea's premier progressive daily newspaper; founded by dissident journalists through public crowdfunding, staunchly independent of chaebol influence, advocating labor rights, peace diplomacy, and environmental sustainability",
      "readership": {
        "metric": "Over 200,000 print daily readers and over 6 million monthly online users; highly trusted among civil society and academics",
        "source": "Reuters Institute Digital News Report Korea 2023"
      },
      "revenueModel": "Citizen shareholder dividends, print sales, reader contributions, and ethical advertising",
      "logo": "newspaper-logos/kr/hankyoreh.svg",
      "logoExplainer": "Warm golden-yellow and blue field featuring clean Hangul lettering '한겨레' (Hankyoreh), representing democracy born from citizen crowdfunding.",
      "sources": [
        "https://www.hani.co.kr",
        "https://english.hani.co.kr",
        "https://en.wikipedia.org/wiki/The_Hankyoreh"
      ]
    }
  ],
  "KW": [
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
  "KZ": [
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
    }
  ],
  "LA": [
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
  "LB": [
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
  "LC": [
    {
      "id": "lc-st-lucia-times",
      "countryCode": "LC",
      "name": "St. Lucia Times",
      "nativeName": "St. Lucia Times",
      "englishTranslation": "St. Lucia Times",
      "founded": 2014,
      "frequency": "Continuous 24/7 digital news service",
      "format": "Digital news portal & mobile app (stluciatimes.com)",
      "language": "English",
      "headquarters": "Castries",
      "owner": {
        "name": "St. Lucia Times Media",
        "type": "Independent digital media enterprise"
      },
      "editorialStance": "Saint Lucia's leading digital daily news service; delivering fast-breaking coverage of island news, police bulletins, political press briefings, regional Caribbean events, and citizen commentary",
      "readership": {
        "metric": "Over 1.8 million monthly page views, ranking among the most visited digital news platforms in the Eastern Caribbean",
        "source": "St. Lucia Times Analytics 2023"
      },
      "revenueModel": "Digital programmatic advertising and sponsored campaigns",
      "logo": "newspaper-logos/lc/st-lucia-times.svg",
      "logoExplainer": "Dark navy card featuring refined white serif typography 'St. Lucia Times' underscored with bright cyan accent line.",
      "sources": [
        "https://stluciatimes.com",
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
      "logo": "newspaper-logos/lc/the-voice.svg",
      "logoExplainer": "Classic dark slate card with distinguished white serif masthead 'THE VOICE' and golden subtitle 'The Newspaper of Saint Lucia Since 1885'.",
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
      "logo": "newspaper-logos/lc/the-star.svg",
      "logoExplainer": "Vibrant crimson red background featuring bold white uppercase serif title 'THE STAR' accented with golden yellow 'SAINT LUCIA'.",
      "sources": [
        "https://stluciastar.com",
        "https://en.wikipedia.org/wiki/Saint_Lucia"
      ]
    }
  ],
  "LI": [
    {
      "id": "li-vaterland",
      "countryCode": "LI",
      "name": "Liechtensteiner Vaterland",
      "founded": 1913,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Compact & digital portal",
      "language": "German",
      "headquarters": "Vaduz",
      "owner": {
        "name": "Vaduzer Medienhaus AG",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historically aligned with the Patriotic Union (VU); Liechtenstein's highest-circulation national daily focusing on principality affairs, parliamentary politics (Landtag), and regional Rhine Valley news",
      "readership": {
        "metric": "Over 8,500 daily print circulation with extensive digital reach across the principality",
        "source": "Vaduzer Medienhaus Audience Report 2023"
      },
      "revenueModel": "Print subscriptions, newsstand sales, and commercial display advertising",
      "logo": "newspaper-logos/li/liechtensteiner-vaterland.svg",
      "logoExplainer": "Classic deep navy blue header with prominent white serif typography 'Liechtensteiner Vaterland', reflecting Liechtenstein's leading daily press.",
      "sources": [
        "https://www.vaterland.li",
        "https://de.wikipedia.org/wiki/Liechtensteiner_Vaterland"
      ]
    },
    {
      "id": "li-volksblatt",
      "countryCode": "LI",
      "name": "Liechtensteiner Volksblatt",
      "founded": 1878,
      "frequency": "Daily newspaper (historical/archival)",
      "format": "Compact & digital archive",
      "language": "German",
      "headquarters": "Schaan",
      "owner": {
        "name": "Liechtensteiner Volksblatt AG",
        "type": "Historical commercial publisher"
      },
      "editorialStance": "Liechtenstein's oldest daily newspaper; historically aligned with the Progressive Citizens' Party (FBP), covering national politics, public institutions, and cultural events",
      "readership": {
        "metric": "Historic daily circulation of 8,000+ copies until print cessation in 2023; historic archive maintained",
        "source": "Historisches Lexikon des Fürstentums Liechtenstein"
      },
      "revenueModel": "Historic subscription sales, advertising, and institutional archiving",
      "logo": "newspaper-logos/li/liechtensteiner-volksblatt.svg",
      "logoExplainer": "Crimson red banner emblazoned with crisp white serif typography 'Liechtensteiner Volksblatt', commemorating the principality's oldest newspaper.",
      "sources": [
        "https://www.volksblatt.li",
        "https://de.wikipedia.org/wiki/Liechtensteiner_Volksblatt"
      ]
    },
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
      "logoExplainer": "Deep corporate blue backdrop showcasing golden-amber typography 'Wirtschaft regional', signifying business and financial market authority.",
      "sources": [
        "https://www.wirtschaftregional.li"
      ]
    }
  ],
  "LK": [
    {
      "id": "lk-daily-mirror",
      "countryCode": "LK",
      "name": "Daily Mirror",
      "founded": 1996,
      "frequency": "Daily (Monday to Saturday) print & continuous web edition",
      "format": "Broadsheet newspaper & digital news portal (dailymirror.lk)",
      "language": "English",
      "headquarters": "No. 8, Hunupitiya Cross Road, Colombo 02",
      "owner": {
        "name": "Wijeya Newspapers Ltd",
        "type": "Private media publishing group"
      },
      "editorialStance": "Sri Lanka's highest-circulation independent English-language daily newspaper; offers incisive political reporting on Parliament, economic coverage of debt restructuring and Central Bank policy, hard-hitting cartoons, and legal affairs",
      "readership": {
        "metric": "Over 45,000 print circulation daily and more than 2.5 million monthly unique digital visitors across Sri Lanka and overseas",
        "source": "Wijeya Newspapers Media Pack / Lanka Market Research Bureau (LMRB)"
      },
      "revenueModel": "Print newsstand sales, corporate commercial display advertising, and digital ads",
      "logo": "newspaper-logos/lk/daily-mirror.png",
      "logoExplainer": "Vibrant crimson red background with bold white typography 'Daily Mirror' and light pink national subtitle.",
      "sources": [
        "https://www.dailymirror.lk",
        "https://en.wikipedia.org/wiki/Daily_Mirror_(Sri_Lanka)"
      ]
    },
    {
      "id": "lk-daily-news",
      "countryCode": "LK",
      "name": "Daily News",
      "founded": 1918,
      "frequency": "Daily (Monday to Saturday)",
      "format": "Broadsheet newspaper & digital edition (dailynews.lk)",
      "language": "English",
      "headquarters": "Lake House, D.R. Wijewardene Mawatha, Colombo 10",
      "owner": {
        "name": "Associated Newspapers of Ceylon Limited (ANCL / Lake House)",
        "type": "State-controlled publishing corporation"
      },
      "annualPublicFunding": {
        "total": "LKR 450 million",
        "perCapita": "LKR 20.40"
      },
      "editorialStance": "Sri Lanka's oldest surviving English-language national daily, founded by press pioneer D. R. Wijewardene in 1918; serves as the flagship English publication of Lake House, providing authoritative coverage of state policies, diplomatic relations, and national development",
      "readership": {
        "metric": "Over 35,000 daily print distribution with strong readership in government departments, diplomatic missions, and corporate libraries",
        "source": "ANCL Lake House Annual Report"
      },
      "revenueModel": "Government notices, corporate print advertising, and newsstand distribution",
      "logo": "newspaper-logos/lk/daily-news.png",
      "logoExplainer": "Deep navy field featuring classic serif masthead 'Daily News' in white, underlined by gold 'LAKE HOUSE • ESTABLISHED 1918' lettering.",
      "sources": [
        "https://www.dailynews.lk",
        "https://en.wikipedia.org/wiki/Daily_News_(Sri_Lanka)"
      ]
    },
    {
      "id": "lk-lankadeepa",
      "countryCode": "LK",
      "name": "Lankadeepa",
      "nativeName": "ලංකාදීප (Lankadeepa)",
      "englishTranslation": "Island of Lanka",
      "founded": 1991,
      "frequency": "Daily print & 24/7 web edition",
      "format": "Broadsheet newspaper & online portal (lankadeepa.lk)",
      "language": "Sinhala",
      "headquarters": "Hunupitiya Cross Road, Colombo 02",
      "owner": {
        "name": "Wijeya Newspapers Ltd",
        "type": "Private publishing company"
      },
      "editorialStance": "Sri Lanka's premier Sinhala-language morning daily newspaper; renowned for comprehensive national reporting, provincial correspondence across all 9 provinces, cultural commentary, and agricultural and rural economy features",
      "readership": {
        "metric": "Circulation exceeding 120,000 daily (over 250,000 for the Sunday edition, Irida Lankadeepa), making it the most read Sinhala paper in the country",
        "source": "LMRB National Readership Survey / Wijeya Media"
      },
      "revenueModel": "Mass print circulation sales, nationwide commercial ads, and classifieds",
      "logo": "newspaper-logos/lk/lankadeepa.jpg",
      "logoExplainer": "Clean white field with deep maroon square emblem containing white 'LD', bold maroon 'LANKADEEPA' title, and Sinhala script subtitle.",
      "sources": [
        "https://www.lankadeepa.lk",
        "https://en.wikipedia.org/wiki/Lankadeepa_(newspaper)"
      ]
    },
    {
      "id": "lk-virakesari",
      "countryCode": "LK",
      "name": "Virakesari",
      "nativeName": "வீரகேசரி (Virakesari)",
      "englishTranslation": "Victorious Lion",
      "founded": 1930,
      "frequency": "Daily print & digital newspaper",
      "format": "Broadsheet newspaper & web portal (virakesari.lk)",
      "language": "Tamil",
      "headquarters": "Grandpass Road, Colombo 14",
      "owner": {
        "name": "Express Newspapers (Ceylon) Ltd",
        "type": "Private publishing company"
      },
      "editorialStance": "Oldest and most widely circulated Tamil-language daily newspaper in Sri Lanka, founded in 1930; provides essential coverage of Tamil community affairs across the Northern, Eastern, and Central plantation provinces, human rights, cultural preservation, and national politics",
      "readership": {
        "metric": "Over 50,000 daily print circulation (and over 100,000 for the Sunday edition) distributed across Sri Lanka and among the overseas Tamil diaspora",
        "source": "Express Newspapers Audit / LMRB"
      },
      "revenueModel": "Print sales, community classified notices, and commercial advertising",
      "logo": "newspaper-logos/lk/virakesari.png",
      "logoExplainer": "White field with historic deep crimson serif lettering 'VIRAKESARI', supported by Tamil script subtitle and founding year 1930.",
      "sources": [
        "https://www.virakesari.lk",
        "https://en.wikipedia.org/wiki/Virakesari"
      ]
    }
  ],
  "LR": [
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
  "LS": [
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
  "LT": [
    {
      "id": "lt-15min",
      "countryCode": "LT",
      "name": "15min",
      "founded": 2005,
      "frequency": "Continuous digital news service",
      "format": "Digital portal & mobile apps",
      "language": "Lithuanian",
      "headquarters": "Vilnius",
      "owner": {
        "name": "15min Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "High-impact digital newsroom renowned for award-winning investigative journalism (OCCRP partner), uncovering political corruption and corporate fraud",
      "readership": {
        "metric": "Over 1.1 million monthly unique visitors; one of Lithuania's two largest online news outlets",
        "source": "Gemius Audience Lithuania 2024"
      },
      "revenueModel": "Digital display advertising, programmatic ads, and premium paid subscriptions (15min MAX)",
      "logo": "newspaper-logos/lt/15min.svg",
      "logoExplainer": "Signature bright red field with prominent stark white heavyweight typography '15min', evoking speed, urgency, and investigative rigor.",
      "sources": [
        "https://www.15min.lt",
        "https://lt.wikipedia.org/wiki/15min"
      ]
    },
    {
      "id": "lt-delfi",
      "countryCode": "LT",
      "name": "Delfi Lithuania",
      "founded": 1999,
      "frequency": "Continuous digital news service",
      "format": "Digital news portal & video channels",
      "language": "Lithuanian, Russian, Polish, English",
      "headquarters": "Vilnius",
      "owner": {
        "name": "Ekspress Grupp",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Lithuania's most-visited commercial news portal; fast-paced breaking coverage, video talk shows, opinion editorials, and cultural lifestyle reporting",
      "readership": {
        "metric": "Over 1.3 million monthly unique users and over 120 million monthly page views",
        "source": "Gemius Audience Lithuania 2023"
      },
      "revenueModel": "Digital advertising, native sponsored content, and Delfi Plius subscriptions",
      "logo": "newspaper-logos/lt/delfi-lt.svg",
      "logoExplainer": "Dark slate rectangular backdrop emblazoned with vibrant tangerine-orange bold lettering 'DELFI', symbolizing digital vibrancy across the Baltics.",
      "sources": [
        "https://www.delfi.lt",
        "https://en.wikipedia.org/wiki/Delfi_(web_portal)"
      ]
    },
    {
      "id": "lt-lietuvos-rytas",
      "countryCode": "LT",
      "name": "Lietuvos rytas",
      "nativeName": "Lietuvos rytas",
      "englishTranslation": "Morning of Lithuania",
      "founded": 1990,
      "frequency": "Daily newspaper & digital portal",
      "format": "Broadsheet & online news portal",
      "language": "Lithuanian",
      "headquarters": "Vilnius",
      "owner": {
        "name": "UAB Lietuvos rytas",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic flagship daily of post-Soviet independent Lithuania; centrist editorial line focusing on political investigations, economics, arts, and basketball commentary",
      "readership": {
        "metric": "Print daily readership of 130,000 combined with over 700,000 monthly unique digital readers on lrytas.lt",
        "source": "Kantar TNS Lithuania Survey 2023"
      },
      "revenueModel": "Print sales, classifieds, digital ads, and corporate sponsorships",
      "logo": "newspaper-logos/lt/lietuvos-rytas.svg",
      "logoExplainer": "Clean white background featuring dignified dark serif typography 'Lietuvos rytas', honoring Lithuania's venerable independence-era daily.",
      "sources": [
        "https://www.lrytas.lt",
        "https://lt.wikipedia.org/wiki/Lietuvos_rytas"
      ]
    }
  ],
  "LU": [
    {
      "id": "lu-luxemburger-wort",
      "countryCode": "LU",
      "name": "Luxemburger Wort",
      "nativeName": "Luxemburger Wort",
      "englishTranslation": "Luxembourg Word",
      "founded": 1848,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Compact & digital portal",
      "language": "German, French",
      "headquarters": "Howald, Hesperange",
      "owner": {
        "name": "Mediahuis Luxembourg",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Luxembourg's newspaper of record and oldest circulating publication; center-right Christian-democratic tradition with comprehensive coverage of Grand Duchy affairs and European Union policy",
      "readership": {
        "metric": "Over 50,000 daily print circulation and 130,000 cross-platform readers daily across the Grand Duchy",
        "source": "TNS Ilres Plurimedia Luxembourg 2023"
      },
      "revenueModel": "Print subscriptions, digital paywall (Wort+), and display advertising",
      "logo": "newspaper-logos/lu/luxemburger-wort.svg",
      "logoExplainer": "Royal blue header featuring crisp white elegant serif lettering 'Luxemburger Wort', representing the historic voice of Luxembourg.",
      "sources": [
        "https://www.wort.lu",
        "https://en.wikipedia.org/wiki/Luxemburger_Wort"
      ]
    },
    {
      "id": "lu-tageblatt",
      "countryCode": "LU",
      "name": "Tageblatt",
      "nativeName": "Tageblatt",
      "englishTranslation": "Daily Page",
      "founded": 1913,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Compact & digital portal",
      "language": "German, French",
      "headquarters": "Esch-sur-Alzette",
      "owner": {
        "name": "Editpress Luxembourg SA",
        "type": "Trade union & independent publisher"
      },
      "editorialStance": "Social-democratic editorial outlook closely associated with the labor movement and OGBL union; champion of workers' rights, social welfare, and southern industrial basin culture",
      "readership": {
        "metric": "Second largest paid daily in Luxembourg, with approximately 35,000 daily print and online readers",
        "source": "TNS Ilres Luxembourg Press Study 2023"
      },
      "revenueModel": "Subscription circulation, newsstand sales, and press subsidies",
      "logo": "newspaper-logos/lu/tageblatt.svg",
      "logoExplainer": "Bold crimson red banner emblazoned with solid white sans-serif lettering 'Tageblatt', projecting progressive vigor and industrial heritage.",
      "sources": [
        "https://www.tageblatt.lu",
        "https://en.wikipedia.org/wiki/Tageblatt"
      ]
    },
    {
      "id": "lu-l-essentiel",
      "countryCode": "LU",
      "name": "L'essentiel",
      "nativeName": "L'essentiel",
      "englishTranslation": "The Essential",
      "founded": 2007,
      "frequency": "Daily newspaper (Monday–Friday) & continuous digital",
      "format": "Free compact tabloid & mobile portal",
      "language": "French, German",
      "headquarters": "Differdange",
      "owner": {
        "name": "Edita SA (joint venture of Editpress and TX Group)",
        "type": "Commercial media partnership"
      },
      "editorialStance": "Luxembourg's most widely read free daily; focused on concise, fast-paced news, cross-border commuter transport, European headlines, and youth lifestyle",
      "readership": {
        "metric": "Over 195,000 daily readers across print and digital, particularly popular among cross-border workers (frontaliers)",
        "source": "TNS Ilres Plurimedia Study 2023"
      },
      "revenueModel": "100% advertising-funded print and digital model",
      "logo": "newspaper-logos/lu/l-essentiel.svg",
      "logoExplainer": "Deep blue banner accented with bright cyan uppercase typography 'L'ESSENTIEL', symbolising modern commuter clarity and accessibility.",
      "sources": [
        "https://www.lessentiel.lu",
        "https://fr.wikipedia.org/wiki/L%27essentiel_(Luxembourg)"
      ]
    },
    {
      "id": "lu-le-quotidien",
      "countryCode": "LU",
      "name": "Le Quotidien",
      "nativeName": "Le Quotidien",
      "englishTranslation": "The Daily",
      "founded": 2001,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Compact & digital portal",
      "language": "French",
      "headquarters": "Esch-sur-Alzette",
      "owner": {
        "name": "Editpress Luxembourg SA",
        "type": "Independent commercial media"
      },
      "editorialStance": "Leading French-language national daily; independent left-leaning perspective catering to Luxembourg's Francophone citizens and extensive expatriate community",
      "readership": {
        "metric": "Over 20,000 regular readers across Luxembourg City, the canton of Esch, and cross-border French Lorraine",
        "source": "TNS Ilres Media Survey 2023"
      },
      "revenueModel": "Subscriptions, single-copy sales, and corporate advertising",
      "logo": "newspaper-logos/lu/le-quotidien.svg",
      "logoExplainer": "Clean white field displaying refined crimson red serif typography 'Le Quotidien', denoting analytical French-language journalism.",
      "sources": [
        "https://lequotidien.lu",
        "https://fr.wikipedia.org/wiki/Le_Quotidien_(Luxembourg)"
      ]
    }
  ],
  "LV": [
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
  "LY": [
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
  "MA": [
    {
      "id": "ma-hespress",
      "countryCode": "MA",
      "name": "Hespress",
      "nativeName": "هسبريس",
      "englishTranslation": "Hespress",
      "founded": 2007,
      "frequency": "Continuous digital news service",
      "format": "Digital multimedia news portal",
      "language": "Arabic, French, English",
      "headquarters": "Rabat",
      "owner": {
        "name": "Maroc Digital SARL",
        "type": "Independent commercial digital media"
      },
      "editorialStance": "Morocco's most visited and influential independent digital news organization; acclaimed for fast-breaking national politics, lively opinion columns, investigative video reports, and social debates",
      "readership": {
        "metric": "Over 4.5 million daily unique visitors and ranked among the most visited websites in the entire Arab world",
        "source": "Similarweb / Hespress Audited Metrics 2023"
      },
      "revenueModel": "Digital programmatic advertising, sponsored features, and video production",
      "logo": "newspaper-logos/ma/hespress.svg",
      "logoExplainer": "Vibrant orange-red background featuring clean white Arabic calligraphy 'هسبريس' (Hespress), signifying energetic digital journalism across the Kingdom.",
      "sources": [
        "https://www.hespress.com",
        "https://fr.wikipedia.org/wiki/Hespress"
      ]
    },
    {
      "id": "ma-le-matin",
      "countryCode": "MA",
      "name": "Le Matin",
      "nativeName": "Le Matin du Sahara et du Maghreb",
      "englishTranslation": "The Morning of Sahara and Maghreb",
      "founded": 1971,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Broadsheet & digital portal",
      "language": "French",
      "headquarters": "Casablanca",
      "owner": {
        "name": "Groupe Maroc Soir",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Morocco's historic Francophone newspaper of record; provides detailed coverage of royal activities, macroeconomic development strategies, industrial investments, and foreign bilateral summits",
      "readership": {
        "metric": "Leading French-language print circulation in Morocco, widely read by business leaders, diplomats, and high-ranking officials",
        "source": "OJD Maroc / Groupe Maroc Soir 2023"
      },
      "revenueModel": "Print sales, institutional subscriptions, and premium corporate display advertising",
      "logo": "newspaper-logos/ma/le-matin.svg",
      "logoExplainer": "Dignified dark navy field displaying refined golden-orange serif lettering 'LE MATIN', symbolizing Moroccan newspaper of record prestige.",
      "sources": [
        "https://lematin.ma",
        "https://fr.wikipedia.org/wiki/Le_Matin_(Maroc)"
      ]
    },
    {
      "id": "ma-le360",
      "countryCode": "MA",
      "name": "Le360",
      "founded": 2013,
      "frequency": "Continuous digital news service",
      "format": "Digital portal & multimedia video network",
      "language": "French, Arabic",
      "headquarters": "Casablanca",
      "owner": {
        "name": "Le360 Media Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Influential multimedia digital news outlet; known for aggressive scoops, diplomatic exposés, video interviews, sports coverage, and cultural commentary",
      "readership": {
        "metric": "Over 2 million monthly unique visitors across French and Arabic editions with massive social video audience",
        "source": "Le360 Media Data 2023"
      },
      "revenueModel": "Digital advertising, video production, and branded events",
      "logo": "newspaper-logos/ma/le360.svg",
      "logoExplainer": "Deep black rectangular backdrop featuring stylized crimson red circular emblem with white numerals '360', representing comprehensive 360-degree news coverage.",
      "sources": [
        "https://fr.le360.ma",
        "https://ar.le360.ma"
      ]
    }
  ],
  "MC": [
    {
      "id": "mc-monaco-matin",
      "countryCode": "MC",
      "name": "Monaco-Matin",
      "founded": 1997,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Compact & digital portal",
      "language": "French",
      "headquarters": "Monaco (with editorial offices in Nice)",
      "owner": {
        "name": "Groupe Nice-Matin",
        "type": "Independent commercial media group"
      },
      "editorialStance": "The Principality of Monaco's primary daily morning newspaper; comprehensive coverage of Sovereign Prince Albert II, Palais Princier communiqués, National Council (Conseil National) debates, and luxury lifestyle",
      "readership": {
        "metric": "Primary daily morning newspaper in Monaco with over 6,000 copies circulated daily across the principality and French Riviera",
        "source": "Groupe Nice-Matin Media Kit 2023"
      },
      "revenueModel": "Print sales, digital subscriptions, and luxury brand advertising",
      "logo": "newspaper-logos/mc/monaco-matin.svg",
      "logoExplainer": "Monegasque red background with bold white modern serif typography 'MONACO-MATIN', representing the principality's essential morning daily.",
      "sources": [
        "https://www.monacomatin.mc",
        "https://fr.wikipedia.org/wiki/Monaco-Matin"
      ]
    },
    {
      "id": "mc-monaco-tribune",
      "countryCode": "MC",
      "name": "Monaco Tribune",
      "founded": 2020,
      "frequency": "Continuous digital news service",
      "format": "Digital news portal",
      "language": "French, English",
      "headquarters": "Rue Grimaldi, Monaco",
      "owner": {
        "name": "Monaco Tribune SARL",
        "type": "Independent digital media"
      },
      "editorialStance": "Dynamic bilingual digital newsroom; focuses on Monegasque economic innovation, marine environment protection (Prince Albert II Foundation), culture, sports (AS Monaco), and community initiatives",
      "readership": {
        "metric": "Over 150,000 monthly unique visitors across Monaco, France, and international expat readers",
        "source": "Monaco Tribune Audience Data 2023"
      },
      "revenueModel": "Digital sponsorships, native content, and institutional partnerships",
      "logo": "newspaper-logos/mc/monaco-tribune.svg",
      "logoExplainer": "Refined navy blue background featuring elegant gold and white uppercase lettering 'MONACO TRIBUNE', reflecting Mediterranean sophistication.",
      "sources": [
        "https://www.monaco-tribune.com"
      ]
    },
    {
      "id": "mc-la-gazette-de-monaco",
      "countryCode": "MC",
      "name": "La Gazette de Monaco",
      "founded": 1977,
      "frequency": "Monthly journal & continuous digital",
      "format": "Magazine, digital portal & legal archive",
      "language": "French",
      "headquarters": "Monaco-Ville",
      "owner": {
        "name": "Publi-Créations SAM",
        "type": "Independent commercial publisher"
      },
      "editorialStance": "Venerable monthly news and society publication; covering business, philanthropy, maritime yachting, diplomacy, and historical Monegasque archives",
      "readership": {
        "metric": "Distributed to high-net-worth residents, corporate directors, and civic institutions throughout Monaco",
        "source": "La Gazette de Monaco Distribution Audit 2023"
      },
      "revenueModel": "Premium subscriptions, print distribution, and high-end commercial ads",
      "logo": "newspaper-logos/mc/la-gazette-de-monaco.svg",
      "logoExplainer": "Classic deep gold and black banner with refined script font 'La Gazette de Monaco', evoking the rich heritage of the Rock.",
      "sources": [
        "https://lagazettedemonaco.com"
      ]
    }
  ],
  "MD": [
    {
      "id": "md-ziarul-de-garda",
      "countryCode": "MD",
      "name": "Ziarul de Gardă",
      "nativeName": "Ziarul de Gardă",
      "englishTranslation": "Newspaper on Guard",
      "founded": 2004,
      "frequency": "Weekly newspaper (Thursdays) & continuous digital",
      "format": "Tabloid & digital investigative portal",
      "language": "Romanian, Russian, English",
      "headquarters": "Chișinău",
      "owner": {
        "name": "Asociația Obștească Factual Media",
        "type": "Non-profit independent investigative media"
      },
      "editorialStance": "Moldova's premier investigative journalism organisation; recipient of multiple international press freedom awards for exposing oligarchic corruption, illicit financing of political parties, and Russian disinformation",
      "readership": {
        "metric": "Most trusted investigative print weekly in Moldova with over 1.5 million monthly digital page views",
        "source": "Independent Journalism Center (IJC) Moldova 2023"
      },
      "revenueModel": "Print subscriptions, reader donations, and international media integrity grants",
      "logo": "newspaper-logos/md/ziarul-de-garda.svg",
      "logoExplainer": "Pure white canvas showcasing bold black and crimson red gothic-style typography 'Ziarul de Gardă', representing an unyielding democratic watchdog.",
      "sources": [
        "https://www.zdg.md",
        "https://ro.wikipedia.org/wiki/Ziarul_de_Gard%C4%83"
      ]
    },
    {
      "id": "md-point-md",
      "countryCode": "MD",
      "name": "Point.md",
      "founded": 2006,
      "frequency": "Continuous digital news service",
      "format": "Digital portal & news aggregator",
      "language": "Russian, Romanian",
      "headquarters": "Chișinău",
      "owner": {
        "name": "Simpals Ltd",
        "type": "Independent digital technology & media company"
      },
      "editorialStance": "Moldova's highest-traffic commercial digital news portal; fast-paced real-time aggregations of domestic and international news, civic petitions, and interactive reader commentary",
      "readership": {
        "metric": "Over 2.2 million monthly unique users, representing Moldova's most visited news website",
        "source": "Gemius Audience Moldova 2023"
      },
      "revenueModel": "Digital programmatic advertising and classifieds",
      "logo": "newspaper-logos/md/point-md.svg",
      "logoExplainer": "Modern charcoal field featuring bright red circle and stark white lowercase lettering 'point.md', denoting real-time digital news centrality.",
      "sources": [
        "https://point.md"
      ]
    }
  ],
  "ME": [
    {
      "id": "me-vijesti",
      "countryCode": "ME",
      "name": "Vijesti",
      "nativeName": "Vijesti",
      "englishTranslation": "News",
      "founded": 1997,
      "frequency": "Daily newspaper, 24/7 TV & digital portal",
      "format": "Compact tabloid, linear TV & digital portal",
      "language": "Montenegrin",
      "headquarters": "Podgorica",
      "owner": {
        "name": "Daily Press d.o.o. (United Media)",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Montenegro's highest-circulation and most influential independent media outlet; acclaimed for fearless investigative reporting against organized crime, political corruption, and state capture",
      "readership": {
        "metric": "Over 1.5 million monthly unique digital visitors on vijesti.me and highest-rated independent evening TV news bulletin in Montenegro",
        "source": "Ipsos Strategic Marketing Montenegro 2023"
      },
      "revenueModel": "Print sales, digital advertising, cable retransmission, and TV commercial ads",
      "logo": "newspaper-logos/me/vijesti.svg",
      "logoExplainer": "Vibrant royal blue background with sharp white and red geometric lettering 'VIJESTI', symbolizing investigative rigor and free press.",
      "sources": [
        "https://www.vijesti.me",
        "https://en.wikipedia.org/wiki/Vijesti"
      ]
    },
    {
      "id": "me-pobjeda",
      "countryCode": "ME",
      "name": "Pobjeda",
      "nativeName": "Pobjeda",
      "englishTranslation": "Victory",
      "founded": 1944,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Compact & digital portal",
      "language": "Montenegrin",
      "headquarters": "Podgorica",
      "owner": {
        "name": "Media Nea d.o.o.",
        "type": "Independent commercial media"
      },
      "editorialStance": "Montenegro's oldest active daily newspaper, founded during World War II anti-fascist liberation; center-left pro-Western stance advocating Montenegrin state sovereignty, NATO membership, and cultural heritage",
      "readership": {
        "metric": "Over 10,000 daily print circulation with institutional readership across ministries, schools, and civic bodies",
        "source": "Media Nea Audience Report 2023"
      },
      "revenueModel": "Print sales, subscriptions, legal announcements, and commercial advertising",
      "logo": "newspaper-logos/me/pobjeda.svg",
      "logoExplainer": "Dark slate background featuring bold red title 'Pobjeda' in classical serif lettering, commemorating eight decades of Montenegrin press history.",
      "sources": [
        "https://pobjeda.me",
        "https://en.wikipedia.org/wiki/Pobjeda_(newspaper)"
      ]
    },
    {
      "id": "me-dan",
      "countryCode": "ME",
      "name": "Dan",
      "nativeName": "ДАН",
      "englishTranslation": "Day",
      "founded": 1999,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Compact & digital portal",
      "language": "Montenegrin / Serbian",
      "headquarters": "Podgorica",
      "owner": {
        "name": "Jumedia Mont d.o.o.",
        "type": "Independent commercial media"
      },
      "editorialStance": "Major high-circulation daily newspaper; socially conservative, critically scrutinizing executive governance, public infrastructure tenders, and championing civil liberties",
      "readership": {
        "metric": "One of Montenegro's two leading print daily newspapers with widespread distribution in northern and coastal municipalities",
        "source": "Ipsos Print Readership Study Montenegro 2023"
      },
      "revenueModel": "Print copy sales, classifieds, and commercial advertising",
      "logo": "newspaper-logos/me/dan.svg",
      "logoExplainer": "Clean white background with heavy red Cyrillic typography 'ДАН', representing a foundational morning newspaper of Montenegro.",
      "sources": [
        "https://www.dan.co.me",
        "https://en.wikipedia.org/wiki/Dan_(newspaper)"
      ]
    }
  ],
  "MG": [
    {
      "id": "mg-midi-madagasikara",
      "countryCode": "MG",
      "name": "Midi Madagasikara",
      "nativeName": "Midi Madagasikara",
      "englishTranslation": "Midday Madagascar",
      "founded": 1983,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Tabloid & digital news portal",
      "language": "French, Malagasy",
      "headquarters": "Ankorondrano, Antananarivo",
      "owner": {
        "name": "Groupe Midi Madagasikara",
        "type": "Independent commercial media"
      },
      "editorialStance": "Madagascar's highest-circulation independent daily newspaper; comprehensive coverage of political life, social issues, economic markets, and sports",
      "readership": {
        "metric": "Over 25,000 print circulation daily and the most visited private news portal in Madagascar",
        "source": "Midi Madagasikara Media Kit 2023"
      },
      "revenueModel": "Print sales, classifieds, and digital banner advertising",
      "logo": "newspaper-logos/mg/midi-madagasikara.svg",
      "logoExplainer": "Deep crimson background housing elegant white serif font 'Midi Madagasikara', representing Madagascar's leading commercial newspaper.",
      "sources": [
        "https://midi-madagasikara.mg",
        "https://fr.wikipedia.org/wiki/Midi_Madagasikara"
      ]
    },
    {
      "id": "mg-l-express",
      "countryCode": "MG",
      "name": "L'Express de Madagascar",
      "nativeName": "L'Express de Madagascar",
      "englishTranslation": "The Express of Madagascar",
      "founded": 1995,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Broadsheet & digital news portal",
      "language": "French, Malagasy",
      "headquarters": "Ankorondrano, Antananarivo",
      "owner": {
        "name": "L'Express de Madagascar SA",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Prestigious broadsheet of record; in-depth political commentary, macroeconomic investigations, environmental reporting, and international analysis",
      "readership": {
        "metric": "Leading morning daily among decision makers, diplomats, and business executives across Madagascar",
        "source": "Étude Médias Madagascar 2023"
      },
      "revenueModel": "Single-copy street sales, corporate subscriptions, and commercial ads",
      "logo": "newspaper-logos/mg/l-express-de-madagascar.svg",
      "logoExplainer": "Stark white background with dignified black serif typography 'L'Express de Madagascar', signifying analytical gravity.",
      "sources": [
        "https://lexpress.mg",
        "https://fr.wikipedia.org/wiki/L%27Express_de_Madagascar"
      ]
    },
    {
      "id": "mg-les-nouvelles",
      "countryCode": "MG",
      "name": "Les Nouvelles",
      "nativeName": "Les Nouvelles",
      "englishTranslation": "The News",
      "founded": 2004,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Compact tabloid & digital portal",
      "language": "French, Malagasy",
      "headquarters": "Alarobia, Antananarivo",
      "owner": {
        "name": "Groupe Ultima Média",
        "type": "Independent commercial media"
      },
      "editorialStance": "Modern independent daily known for vibrant investigative reporting, cultural arts coverage, youth culture, and regional development journalism",
      "readership": {
        "metric": "Over 15,000 daily print readership with active social and web engagement",
        "source": "Ultima Media Group Profile 2023"
      },
      "revenueModel": "Print sales, event sponsorships, and advertising partnerships",
      "logo": "newspaper-logos/mg/les-nouvelles.svg",
      "logoExplainer": "Marine blue field with clean bold white sans-serif lettering 'Les Nouvelles', reflecting fresh and dynamic national reporting.",
      "sources": [
        "https://www.newsmada.com"
      ]
    },
    {
      "id": "mg-madagascar-tribune",
      "countryCode": "MG",
      "name": "Madagascar Tribune",
      "nativeName": "Madagascar Tribune",
      "englishTranslation": "Madagascar Tribune",
      "founded": 1988,
      "frequency": "Continuous digital news service",
      "format": "Digital portal & opinion journal",
      "language": "French",
      "headquarters": "Antananarivo",
      "owner": {
        "name": "Tribune Média Madagascar",
        "type": "Independent digital media"
      },
      "editorialStance": "Pioneering online daily; renowned for intellectual debates, open op-eds, constitutional analysis, and democratic discourse",
      "readership": {
        "metric": "Over 40,000 daily online visits, drawing substantial readership from the Malagasy diaspora in France, Canada, and the Indian Ocean",
        "source": "Madagascar Tribune Digital Analytics 2023"
      },
      "revenueModel": "Digital display ads, sponsored columns, and voluntary reader contributions",
      "logo": "newspaper-logos/mg/madagascar-tribune.svg",
      "logoExplainer": "Warm golden amber background with sharp charcoal sans-serif lettering 'Madagascar Tribune', highlighting debate and independent thought.",
      "sources": [
        "https://www.madagascar-tribune.com",
        "https://fr.wikipedia.org/wiki/Madagascar_Tribune"
      ]
    }
  ],
  "MH": [
    {
      "id": "mh-the-marshall-islands-journal",
      "countryCode": "MH",
      "name": "The Marshall Islands Journal",
      "founded": 1970,
      "frequency": "Weekly newspaper (Fridays)",
      "format": "Tabloid & digital edition",
      "language": "English, Marshallese",
      "headquarters": "Majuro",
      "owner": {
        "name": "Micronitor News and Printing Company",
        "type": "Independent commercial media"
      },
      "editorialStance": "National newspaper of record for the Marshall Islands; fiercely independent coverage of Nitijeļā (parliament), climate change sea-level rise, nuclear testing legacy, and regional Pacific affairs",
      "readership": {
        "metric": "Distributed across Majuro, Ebeye, and outer atolls, with international subscribers across Micronesia, Hawaii, and Arkansas",
        "source": "Micronitor Publishing Profile 2023"
      },
      "revenueModel": "Print sales, institutional subscriptions, and local commercial advertising",
      "logo": "newspaper-logos/mh/the-marshall-islands-journal.svg",
      "logoExplainer": "Pacific blue canvas with bold white serif header 'Marshall Islands Journal', reflecting half a century of independent island journalism.",
      "sources": [
        "https://marshallislandsjournal.com",
        "https://en.wikipedia.org/wiki/The_Marshall_Islands_Journal"
      ]
    },
    {
      "id": "mh-yokwe-online",
      "countryCode": "MH",
      "name": "Yokwe Online",
      "founded": 2002,
      "frequency": "Continuous digital news service",
      "format": "Digital portal & community bulletin",
      "language": "English, Marshallese",
      "headquarters": "Majuro",
      "owner": {
        "name": "Yokwe Media Network",
        "type": "Independent digital media"
      },
      "editorialStance": "Online portal connecting residents and the large Marshallese diaspora in Springdale, Arkansas, and Hawaii; focuses on culture, compact of free association (COFA) updates, and health",
      "readership": {
        "metric": "Over 25,000 monthly unique visitors across Micronesia and the US diaspora",
        "source": "Yokwe Media Audience Summary 2023"
      },
      "revenueModel": "Community sponsorships and online display ads",
      "logo": "newspaper-logos/mh/yokwe-online.svg",
      "logoExplainer": "Warm orange background with bold white lettering 'YOKWE ONLINE', invoking the traditional warm Marshallese greeting 'Iokwe'.",
      "sources": [
        "http://www.yokwe.net"
      ]
    },
    {
      "id": "mh-marshall-islands-guide",
      "countryCode": "MH",
      "name": "Marshall Islands Guide",
      "founded": 2012,
      "frequency": "Continuous digital portal",
      "format": "Digital news & information portal",
      "language": "English",
      "headquarters": "Majuro",
      "owner": {
        "name": "Majuro Digital Services",
        "type": "Independent digital media"
      },
      "editorialStance": "Information and news clearinghouse; provides verified reports on travel regulations, maritime transport, atoll infrastructure projects, and environmental initiatives",
      "readership": {
        "metric": "Widely consulted by international visitors, aid agencies, researchers, and local residents",
        "source": "Marshall Islands Guide Analytics 2024"
      },
      "revenueModel": "Digital directory listings and tourism partnerships",
      "logo": "newspaper-logos/mh/marshall-islands-guide-news.svg",
      "logoExplainer": "Lagoon-blue backdrop featuring crisp white sans-serif lettering 'Marshall Islands Guide', signifying Pacific navigation and clear information.",
      "sources": [
        "https://www.infomarshallislands.com"
      ]
    },
    {
      "id": "mh-micronesia-forum-news",
      "countryCode": "MH",
      "name": "Micronesia Forum News",
      "founded": 2015,
      "frequency": "Weekly digital digest",
      "format": "Digital newsletter & news forum",
      "language": "English",
      "headquarters": "Ebeye, Kwajalein Atoll",
      "owner": {
        "name": "Micronesian Civic Media",
        "type": "Non-profit community media"
      },
      "editorialStance": "Dedicated community platform highlighting life in Ebeye, Kwajalein missile range impacts, youth education, and regional Micronesian solidarity",
      "readership": {
        "metric": "Circulated among Ebeye community leaders, educators, and regional civil society advocates",
        "source": "Micronesian Civic Media Overview 2023"
      },
      "revenueModel": "Community contributions and civic grant funding",
      "logo": "newspaper-logos/mh/micronesia-forum-news.svg",
      "logoExplainer": "Dark navy canvas with luminous sky-blue bold lettering 'MICRONESIA FORUM NEWS', evoking Pacific island voices.",
      "sources": [
        "https://www.infomarshallislands.com"
      ]
    },
    {
      "id": "mh-marshall-islands-journal",
      "countryCode": "MH",
      "name": "The Marshall Islands Journal",
      "founded": 1970,
      "frequency": "Weekly newspaper (Fridays)",
      "format": "Tabloid print & digital subscriber portal (marshallislandsjournal.com)",
      "language": "English and Marshallese",
      "headquarters": "Uliga, Majuro Atoll",
      "owner": {
        "name": "Micronitor News and Printing Company",
        "type": "Independent commercial publisher"
      },
      "editorialStance": "National weekly newspaper of record of the Republic of the Marshall Islands, founded by Joe Murphy; fearless independent reporting on Nitijeļā parliament, nuclear compensation claims, climate advocacy, and outer-island life",
      "readership": {
        "metric": "Audited weekly distribution of approximately 3,500 copies across Majuro and Ebeye, plus global Pacific research subscribers",
        "source": "Micronitor Publishing Report"
      },
      "revenueModel": "Retail newspaper sales, corporate sponsorships, government public notices, and shipping ads",
      "logo": "newspaper-logos/mh/marshall-islands-journal.jpg",
      "logoExplainer": "Bilingual island emblem featuring a traditional Marshallese navigational stick chart and classic bold serif headline typography.",
      "sources": [
        "https://marshallislandsjournal.com",
        "https://en.wikipedia.org/wiki/The_Marshall_Islands_Journal"
      ]
    }
  ],
  "MK": [
    {
      "id": "mk-nova-makedonija",
      "countryCode": "MK",
      "name": "Nova Makedonija",
      "nativeName": "Нова Македонија",
      "englishTranslation": "New Macedonia",
      "founded": 1944,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Broadsheet & digital portal",
      "language": "Macedonian",
      "headquarters": "Skopje",
      "owner": {
        "name": "Nova Makedonija AD",
        "type": "Independent commercial media"
      },
      "editorialStance": "North Macedonia's oldest existing daily newspaper; historic paper of record founded during anti-fascist liberation, covering national identity, politics, literature, and arts",
      "readership": {
        "metric": "Over 15,000 daily print readership, widely read by civil servants, diplomats, and historians",
        "source": "Press Council of North Macedonia 2023"
      },
      "revenueModel": "Print sales, subscriptions, and commercial advertising",
      "logo": "newspaper-logos/mk/nova-makedonija.svg",
      "logoExplainer": "Dark blue background featuring elegant gold Cyrillic serif typography 'Нова Македонија', symbolising national press heritage.",
      "sources": [
        "https://novamakedonija.com.mk",
        "https://en.wikipedia.org/wiki/Nova_Makedonija"
      ]
    },
    {
      "id": "mk-vecer",
      "countryCode": "MK",
      "name": "Večer",
      "nativeName": "Вечер",
      "englishTranslation": "Evening",
      "founded": 1963,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Tabloid & digital portal",
      "language": "Macedonian",
      "headquarters": "Skopje",
      "owner": {
        "name": "Večer Press d.o.o.",
        "type": "Independent commercial media"
      },
      "editorialStance": "Leading commercial daily newspaper; populist, fast-paced political coverage, social scandals, municipal affairs, and sports",
      "readership": {
        "metric": "Second largest print daily with over 12,000 copies circulated daily across Skopje and regional towns",
        "source": "Media Association of North Macedonia 2023"
      },
      "revenueModel": "Print copy sales, classified ads, and digital banners",
      "logo": "newspaper-logos/mk/vecer.svg",
      "logoExplainer": "Deep scarlet red banner with heavy white Cyrillic typography 'ВЕЧЕР', evoking evening daily news urgency.",
      "sources": [
        "https://vecer.mk",
        "https://en.wikipedia.org/wiki/Ve%C4%8Der"
      ]
    },
    {
      "id": "mk-koha-mk",
      "countryCode": "MK",
      "name": "Koha (North Macedonia)",
      "nativeName": "Gazeta Koha",
      "englishTranslation": "Time Newspaper",
      "founded": 2006,
      "frequency": "Daily newspaper (Monday–Saturday) & digital portal",
      "format": "Broadsheet & digital news portal",
      "language": "Albanian",
      "headquarters": "Skopje",
      "owner": {
        "name": "Koha Media Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "North Macedonia's leading Albanian-language daily newspaper; covers Ohrid Framework Agreement implementation, inter-ethnic harmony, municipal governance in western Macedonia, and regional Balkan news",
      "readership": {
        "metric": "Highest circulation Albanian-language newspaper in North Macedonia with 8,000+ copies and widely visited portal koha.mk",
        "source": "Association of Albanian Journalists North Macedonia 2023"
      },
      "revenueModel": "Print sales, community advertising, and digital subscriptions",
      "logo": "newspaper-logos/mk/koha-mk.svg",
      "logoExplainer": "Black and red emblem with bold white modern serif lettering 'KOHA', representing the principal Albanian-language daily.",
      "sources": [
        "https://www.koha.mk"
      ]
    }
  ],
  "ML": [
    {
      "id": "ml-l-independant",
      "countryCode": "ML",
      "name": "L'Indépendant",
      "nativeName": "L'Indépendant",
      "englishTranslation": "The Independent",
      "founded": 1994,
      "frequency": "Daily newspaper (Monday–Friday)",
      "format": "Tabloid & digital portal",
      "language": "French",
      "headquarters": "Bamako",
      "owner": {
        "name": "Société d'Édition et de Presse (SEP)",
        "type": "Independent commercial media"
      },
      "editorialStance": "One of Mali's foremost independent daily newspapers; in-depth political investigations, civil society debates, constitutional reforms, and economic analyses",
      "readership": {
        "metric": "Circulation of 7,000+ daily copies and high readership among intellectuals and civil servants in Bamako",
        "source": "Maison de la Presse du Mali 2023"
      },
      "revenueModel": "Print sales, private display advertising, and legal notices",
      "logo": "newspaper-logos/ml/l-independant.svg",
      "logoExplainer": "Deep blue rectangle bearing crisp white serif title 'L'Indépendant', denoting journalistic objectivity and independence.",
      "sources": [
        "https://lindependant.org"
      ]
    },
    {
      "id": "ml-maliweb",
      "countryCode": "ML",
      "name": "Maliweb",
      "founded": 2002,
      "frequency": "Continuous digital news service",
      "format": "Digital superportal & news aggregator",
      "language": "French",
      "headquarters": "Bamako",
      "owner": {
        "name": "Maliweb Net SARL",
        "type": "Independent digital media"
      },
      "editorialStance": "Mali's pioneer news portal; synthesizes news from across private Malian newspapers alongside original reporting, political debates, and vibrant community forums",
      "readership": {
        "metric": "Over 350,000 daily page impressions; leading news reference for Malians at home and across the diaspora in France and the US",
        "source": "Maliweb Traffic Analytics 2023"
      },
      "revenueModel": "Digital display ads, sponsored articles, and classifieds",
      "logo": "newspaper-logos/ml/maliweb.svg",
      "logoExplainer": "Dark slate background featuring bright grass-green heavy lettering 'MALIWEB.NET', symbolizing online connectivity across the nation.",
      "sources": [
        "https://www.maliweb.net"
      ]
    },
    {
      "id": "ml-malijet",
      "countryCode": "ML",
      "name": "Malijet",
      "founded": 2007,
      "frequency": "Continuous digital news service",
      "format": "Digital portal & mobile news",
      "language": "French",
      "headquarters": "Bamako",
      "owner": {
        "name": "Malijet Media Network",
        "type": "Independent digital media"
      },
      "editorialStance": "Fast-paced breaking news portal; covers military developments, political transition communiqués, local crime, culture, and sports",
      "readership": {
        "metric": "High digital engagement with over 200,000 daily visitors and an influential social media following",
        "source": "Malijet Media Data 2023"
      },
      "revenueModel": "Digital advertising networks and commercial sponsorships",
      "logo": "newspaper-logos/ml/malijet.svg",
      "logoExplainer": "Vibrant orange backdrop emblazoned with prominent white impact font 'MALIJET', representing urgent real-time digital news.",
      "sources": [
        "https://malijet.com"
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
      "logo": "newspaper-logos/ml/le-republicain.svg",
      "logoExplainer": "Crimson red field showcasing elegant white serif typography 'Le Républicain', symbolizing democratic vigilance.",
      "sources": [
        "https://fr.wikipedia.org/wiki/Le_R%C3%A9publicain_(Mali)"
      ]
    }
  ],
  "MM": [
    {
      "id": "mm-myanma-alinn",
      "countryCode": "MM",
      "name": "Myanma Alinn",
      "nativeName": "မြန်မာ့အလင်း",
      "englishTranslation": "Light of Myanmar",
      "founded": 1914,
      "frequency": "Daily morning newspaper (Monday–Sunday)",
      "format": "Broadsheet & digital edition",
      "language": "Burmese",
      "headquarters": "Yangon and Naypyidaw",
      "owner": {
        "name": "News and Periodicals Enterprise (Ministry of Information)",
        "type": "State-run newspaper"
      },
      "editorialStance": "Myanmar's oldest surviving daily newspaper; historically a leading anti-colonial nationalist paper founded in 1914, now publishing official state announcements, legal gazettes, domestic agriculture, and cultural news",
      "readership": {
        "metric": "Widely circulated state newspaper with over 100,000 daily print copies distributed across administrative offices and townships",
        "source": "News and Periodicals Enterprise 2023"
      },
      "revenueModel": "Newspaper copy sales and mandatory public tender announcements",
      "logo": "newspaper-logos/mm/myanma-alinn.svg",
      "logoExplainer": "Deep crimson red background emblazoned with traditional white Burmese calligraphy 'မြန်မာ့အလင်း' (Myanma Alinn), recalling over a century of publishing history.",
      "sources": [
        "https://www.moi.gov.mm",
        "https://en.wikipedia.org/wiki/Myanma_Alinn"
      ]
    },
    {
      "id": "mm-the-irrawaddy",
      "countryCode": "MM",
      "name": "The Irrawaddy",
      "nativeName": "ဧရာဝတီ",
      "englishTranslation": "The Irrawaddy",
      "founded": 1993,
      "frequency": "Continuous digital news service",
      "format": "Digital news portal & investigative multimedia",
      "language": "Burmese, English",
      "headquarters": "Chiang Mai / Yangon (exile and diaspora operations)",
      "owner": {
        "name": "Irrawaddy Publishing Group (IPG)",
        "type": "Independent exile media"
      },
      "editorialStance": "Renowned independent investigative news organization founded by veteran student activists in 1993; famous for documented reporting on civil conflicts, military junta crackdowns, ethnic minority affairs, and human rights",
      "readership": {
        "metric": "Over 2.5 million monthly unique digital visitors and one of the most trusted independent sources of news on Myanmar globally",
        "source": "Irrawaddy Publishing Group Audience Report 2023"
      },
      "revenueModel": "Reader donations, international philanthropic press grants, and digital ads",
      "logo": "newspaper-logos/mm/the-irrawaddy.svg",
      "logoExplainer": "Dark slate backdrop displaying bold crimson red and white uppercase typography 'THE IRRAWADDY', symbolizing steadfast independent journalism.",
      "sources": [
        "https://www.irrawaddy.com",
        "https://en.wikipedia.org/wiki/The_Irrawaddy"
      ]
    },
    {
      "id": "mm-mizzima",
      "countryCode": "MM",
      "name": "Mizzima News",
      "nativeName": "မဇ္ဈိမ",
      "englishTranslation": "Middle Path / Mizzima",
      "founded": 1998,
      "frequency": "Continuous multimedia broadcast & digital news",
      "format": "Digital portal, satellite broadcast & mobile apps",
      "language": "Burmese, English",
      "headquarters": "Yangon / New Delhi / Chiang Mai",
      "owner": {
        "name": "Mizzima Media Group",
        "type": "Independent commercial multimedia"
      },
      "editorialStance": "Prominent independent multimedia group founded in exile in 1998; committed to federal democracy, human rights, peace journalism, and digital resilience against press censorship",
      "readership": {
        "metric": "Over 3 million monthly digital audience and widespread satellite radio/TV listenership inside Myanmar and abroad",
        "source": "Mizzima Media Group Audience Audit 2023"
      },
      "revenueModel": "Donor press development funding, commercial sponsorships, and syndicated video",
      "logo": "newspaper-logos/mm/mizzima.svg",
      "logoExplainer": "Vibrant yellow-gold banner featuring distinct stylized red and navy lettering 'mizzima', representing the Middle Path of truth and democratic reporting.",
      "sources": [
        "https://www.mizzima.com",
        "https://en.wikipedia.org/wiki/Mizzima_News"
      ]
    }
  ],
  "MN": [
    {
      "id": "mn-udriin-sonin",
      "countryCode": "MN",
      "name": "Udriin Sonin",
      "nativeName": "Өдрийн сонин",
      "englishTranslation": "Daily Newspaper",
      "founded": 1999,
      "frequency": "Daily newspaper (Monday–Friday)",
      "format": "Broadsheet & digital portal",
      "language": "Mongolian",
      "headquarters": "Sukhbaatar District, Ulaanbaatar",
      "owner": {
        "name": "Udriin Sonin LLC",
        "type": "Independent commercial media"
      },
      "editorialStance": "Mongolia's highest-circulation and most influential independent daily newspaper; recognized for investigative reporting on political corruption, mining agreements, and rural livelihoods",
      "readership": {
        "metric": "Largest print circulation in Mongolia with over 15,000 daily copies and leading national influence",
        "source": "Press Institute of Mongolia Media Report 2023"
      },
      "revenueModel": "Print copy sales, subscriptions, and commercial advertising",
      "logo": "newspaper-logos/mn/udriin-sonin.svg",
      "logoExplainer": "Deep blue rectangular header emblazoned with bright golden Cyrillic lettering 'Өдрийн сонин', representing Mongolia's premier daily press.",
      "sources": [
        "https://dnn.mn",
        "https://mn.wikipedia.org/wiki/%D3%A8%D0%B4%D1%80%D0%B8%D0%B9%D0%BD_%D1%81%D0%BE%D0%BD%D0%B8%D0%BD"
      ]
    },
    {
      "id": "mn-ikon-mn",
      "countryCode": "MN",
      "name": "Ikon.mn",
      "founded": 2013,
      "frequency": "Continuous digital news service",
      "format": "Digital news portal & data visualizations",
      "language": "Mongolian, English",
      "headquarters": "Ulaanbaatar",
      "owner": {
        "name": "Ikon Media LLC",
        "type": "Independent digital media"
      },
      "editorialStance": "Modern pioneering digital news portal; widely celebrated for data journalism, interactive infographics, objective fact-checking, and civil society accountability",
      "readership": {
        "metric": "Over 1.8 million monthly unique visitors; one of the top two most visited web news platforms in Mongolia",
        "source": "Press Institute of Mongolia / Ikon Audience Metrics 2023"
      },
      "revenueModel": "Digital display advertising, native sponsored content, and data analytics services",
      "logo": "newspaper-logos/mn/ikon-mn.svg",
      "logoExplainer": "Crisp white canvas displaying modern red and dark grey minimalist sans-serif 'ikon.mn', denoting clarity, speed, and analytical data journalism.",
      "sources": [
        "https://ikon.mn"
      ]
    },
    {
      "id": "mn-gogo-mn",
      "countryCode": "MN",
      "name": "Gogo.mn",
      "founded": 2007,
      "frequency": "Continuous digital news service",
      "format": "Digital superportal & multimedia network",
      "language": "Mongolian",
      "headquarters": "Ulaanbaatar",
      "owner": {
        "name": "Mongol Content LLC",
        "type": "Independent commercial digital media"
      },
      "editorialStance": "Comprehensive digital news and lifestyle portal; covers breaking political news, business, arts, Naadam festival sports, and urban youth culture in Ulaanbaatar",
      "readership": {
        "metric": "Over 2 million monthly active users and high engagement across mobile application and social channels",
        "source": "Mongol Content Corporate Profile 2023"
      },
      "revenueModel": "Digital advertising, content syndication, and digital entertainment services",
      "logo": "newspaper-logos/mn/gogo-mn.svg",
      "logoExplainer": "Playful and bold orange-red rectangular backdrop with prominent white rounded font 'gogo.mn', reflecting digital connectivity.",
      "sources": [
        "https://gogo.mn"
      ]
    }
  ],
  "MR": [
    {
      "id": "mr-cridem",
      "countryCode": "MR",
      "name": "CRIDEM",
      "nativeName": "Carrefour de la République Islamique de Mauritanie",
      "englishTranslation": "Crossroads of the Islamic Republic of Mauritania",
      "founded": 2003,
      "frequency": "Continuous digital news service",
      "format": "Digital news portal & aggregator",
      "language": "French",
      "headquarters": "Nouakchott",
      "owner": {
        "name": "CRIDEM Communication",
        "type": "Independent commercial media"
      },
      "editorialStance": "Leading French-language news aggregator and forum in Mauritania; synthesizes political press releases, cultural debates, and opinion pieces from civil society",
      "readership": {
        "metric": "Over 80,000 daily visits; widely read by Mauritanian civil servants, francophone professionals, and international donors",
        "source": "CRIDEM Media Kit 2023"
      },
      "revenueModel": "Web display advertising and corporate communications",
      "logo": "newspaper-logos/mr/cridem.svg",
      "logoExplainer": "Dark slate background featuring bright golden-yellow bold lettering 'CRIDEM', representing the crossroads of Mauritanian news.",
      "sources": [
        "https://cridem.org"
      ]
    },
    {
      "id": "mr-le-calame",
      "countryCode": "MR",
      "name": "Le Calame",
      "nativeName": "Le Calame",
      "englishTranslation": "The Reed Pen",
      "founded": 1993,
      "frequency": "Weekly newspaper (Wednesdays)",
      "format": "Tabloid & digital portal",
      "language": "French",
      "headquarters": "Nouakchott",
      "owner": {
        "name": "SARL Le Calame",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic independent weekly founded by veteran journalist Habib Ould Mahfoudh; famous for satirical political chronicles, uncompromising defense of democracy, and anti-slavery advocacy",
      "readership": {
        "metric": "Highest-regarded political weekly in Mauritania with weekly print circulation of 5,000 copies and avid online readership",
        "source": "Syndicat des Journalistes Mauritans 2023"
      },
      "revenueModel": "Newsstand sales, institutional subscriptions, and commercial advertising",
      "logo": "newspaper-logos/mr/le-calame.svg",
      "logoExplainer": "Deep marine blue backdrop featuring refined white serif typography 'Le Calame', recalling the ancient reed pen and free expression.",
      "sources": [
        "https://lecalame.info",
        "https://fr.wikipedia.org/wiki/Le_Calame"
      ]
    }
  ],
  "MT": [
    {
      "id": "mt-times-of-malta",
      "countryCode": "MT",
      "name": "Times of Malta",
      "founded": 1935,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Compact & digital portal",
      "language": "English",
      "headquarters": "Mrieħel, Birkirkara",
      "owner": {
        "name": "Allied Newspapers Limited (Strickland Foundation)",
        "type": "Independent non-profit trust media"
      },
      "editorialStance": "Malta's oldest existing daily and undisputed national newspaper of record; renowned for rigorous investigative reporting, political accountability, and European integration",
      "readership": {
        "metric": "Over 70% of Malta's English-language print newspaper readership and highest-traffic news website in the country",
        "source": "Broadcasting Authority / Allied Group Annual Audit 2023"
      },
      "revenueModel": "Print sales, digital premium subscriptions (Times of Malta Premium), and advertising",
      "logo": "newspaper-logos/mt/times-of-malta.svg",
      "logoExplainer": "Dark navy field with distinguished white capital serif typography 'TIMES OF MALTA', embodying Maltese newspaper of record status.",
      "sources": [
        "https://timesofmalta.com",
        "https://en.wikipedia.org/wiki/Times_of_Malta"
      ]
    },
    {
      "id": "mt-the-malta-independent",
      "countryCode": "MT",
      "name": "The Malta Independent",
      "founded": 1992,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Compact & digital portal",
      "language": "English",
      "headquarters": "St Julian's",
      "owner": {
        "name": "Standard Publications Limited",
        "type": "Independent commercial media"
      },
      "editorialStance": "Leading independent English-language daily; analytical editorial line focusing on governance, financial transparency, environmental planning, and EU regulations",
      "readership": {
        "metric": "Key daily print circulation and second-most-read English online news portal in Malta",
        "source": "Malta Broadcasting Authority Press Study 2023"
      },
      "revenueModel": "Print sales, corporate display advertising, and web advertising",
      "logo": "newspaper-logos/mt/the-malta-independent.svg",
      "logoExplainer": "Stark white background showcasing crimson red serif typography 'The Malta Independent', representing principled and autonomous commentary.",
      "sources": [
        "https://www.independent.com.mt",
        "https://en.wikipedia.org/wiki/The_Malta_Independent"
      ]
    },
    {
      "id": "mt-maltatoday",
      "countryCode": "MT",
      "name": "MaltaToday",
      "founded": 1999,
      "frequency": "Bi-weekly print & continuous digital",
      "format": "Compact tabloid & digital portal",
      "language": "English",
      "headquarters": "San Ġwann",
      "owner": {
        "name": "MediaToday Co. Ltd",
        "type": "Independent commercial media"
      },
      "editorialStance": "Progressive, liberal editorial voice; famous for hard-hitting investigative journalism, civil liberties campaigns, political polling, and whistleblower disclosures",
      "readership": {
        "metric": "Over 80,000 daily unique digital readers and high Sunday print readership",
        "source": "MediaToday Market Research 2023"
      },
      "revenueModel": "Print sales, digital advertising, commercial survey services, and events",
      "logo": "newspaper-logos/mt/maltatoday.svg",
      "logoExplainer": "Vivid red rectangle with stark white modern sans-serif typography 'MaltaToday', evoking progressive and fearless reporting.",
      "sources": [
        "https://www.maltatoday.com.mt",
        "https://en.wikipedia.org/wiki/MaltaToday"
      ]
    },
    {
      "id": "mt-l-orizzont",
      "countryCode": "MT",
      "name": "L-Orizzont",
      "nativeName": "L-Orizzont",
      "englishTranslation": "The Horizon",
      "founded": 1962,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Compact & digital portal",
      "language": "Maltese",
      "headquarters": "Valletta",
      "owner": {
        "name": "Union Print Co. Ltd (General Workers' Union)",
        "type": "Trade union media"
      },
      "editorialStance": "Malta's highest-circulation Maltese-language daily; left-of-centre perspective championing workers' rights, employment protections, and social equity",
      "readership": {
        "metric": "Highest-selling Maltese-language daily newspaper, circulating over 12,000 copies daily",
        "source": "General Workers' Union Media Report 2023"
      },
      "revenueModel": "Print sales, union backing, and commercial advertising",
      "logo": "newspaper-logos/mt/l-orizzont.svg",
      "logoExplainer": "Royal blue background with bold white condensed uppercase lettering 'L-ORIZZONT', symbolizing labor solidarity and progressive vision.",
      "sources": [
        "https://talk.mt",
        "https://en.wikipedia.org/wiki/L-Orizzont"
      ]
    }
  ],
  "MU": [
    {
      "id": "mu-l-express",
      "countryCode": "MU",
      "name": "L'Express",
      "founded": 1963,
      "frequency": "Daily newspaper (Monday–Saturday) & continuous digital portal",
      "format": "Tabloid & digital news portal",
      "language": "French, English",
      "headquarters": "Baie-du-Tombeau, Port Louis",
      "owner": {
        "name": "La Sentinelle Ltd",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Mauritius' oldest and leading independent daily; investigative reporting on government transparency, parliamentary democracy, offshore finance, and Indian Ocean regional security",
      "readership": {
        "metric": "Highest circulation daily newspaper in Mauritius with over 35,000 print copies and leading news portal lexpress.mu",
        "source": "Media Watch Organisation Mauritius 2023"
      },
      "revenueModel": "Print sales, digital advertising, and corporate subscriptions",
      "logo": "newspaper-logos/mu/l-express.svg",
      "logoExplainer": "Deep navy blue rectangle with bold white italicized serif typography 'l'express', symbolizing dynamic and fast investigative journalism in Mauritius.",
      "sources": [
        "https://lexpress.mu",
        "https://fr.wikipedia.org/wiki/L%27Express_(Maurice)"
      ]
    },
    {
      "id": "mu-le-mauricien",
      "countryCode": "MU",
      "name": "Le Mauricien",
      "founded": 1908,
      "frequency": "Daily newspaper (afternoon daily Monday–Saturday)",
      "format": "Broadsheet & digital portal",
      "language": "French, English",
      "headquarters": "Port Louis",
      "owner": {
        "name": "Le Mauricien Ltd",
        "type": "Independent commercial media"
      },
      "editorialStance": "Centenarian afternoon newspaper of record; known for intellectual depth, diplomatic coverage, social critiques, and parliamentary reporting",
      "readership": {
        "metric": "Over 20,000 daily print readership, widely read by civil servants, legal professionals, and academics",
        "source": "Le Mauricien Audience Survey 2023"
      },
      "revenueModel": "Print sales, legal notices, and commercial display ads",
      "logo": "newspaper-logos/mu/le-mauricien.svg",
      "logoExplainer": "Clean white background with dignified crimson red gothic serif typography 'Le Mauricien', reflecting more than a century of national heritage.",
      "sources": [
        "https://lemauricien.com",
        "https://fr.wikipedia.org/wiki/Le_Mauricien"
      ]
    },
    {
      "id": "mu-defi-media",
      "countryCode": "MU",
      "name": "Défi Média",
      "founded": 1996,
      "frequency": "Continuous multimedia news service & weekly print",
      "format": "Digital multimedia portal, radio & print publications",
      "language": "French, Mauritian Creole, English",
      "headquarters": "Labourdonnais Street, Port Louis",
      "owner": {
        "name": "Le Défi Media Group",
        "type": "Independent commercial multimedia"
      },
      "editorialStance": "Mauritius' largest multimedia news network; populist, fast-paced breaking coverage, consumer rights advocacy, citizen journalism, and community issues",
      "readership": {
        "metric": "Over 1.2 million monthly unique digital visitors and highest radio news audience through Radio Plus",
        "source": "Kantar TNS Mauritius Media Study 2023"
      },
      "revenueModel": "Commercial multimedia advertising, radio sponsorships, and print sales",
      "logo": "newspaper-logos/mu/defi-media.svg",
      "logoExplainer": "Vibrant royal blue background with fiery red and white bold lettering 'DÉFI MÉDIA GROUP', conveying popular momentum and breaking coverage.",
      "sources": [
        "https://defimedia.info"
      ]
    },
    {
      "id": "mu-ion-news",
      "countryCode": "MU",
      "name": "ION News",
      "founded": 2013,
      "frequency": "Continuous digital news service",
      "format": "Pure digital news & video portal",
      "language": "French, English, Creole",
      "headquarters": "Ébène Cybercity",
      "owner": {
        "name": "ION Media Ltd",
        "type": "Independent digital media"
      },
      "editorialStance": "Mauritius' pioneering pure-digital newsroom; focused on video debates, political analysis, financial tech in Ébène, and youth cultural movements",
      "readership": {
        "metric": "Over 400,000 monthly active users and strong social video viewership",
        "source": "ION Media Analytics 2024"
      },
      "revenueModel": "Digital programmatic advertising, video production, and sponsored roundtables",
      "logo": "newspaper-logos/mu/ion-news.svg",
      "logoExplainer": "Dark slate backdrop featuring electric cyan stylized typography 'ION NEWS', embodying digital innovation and forward-looking journalism.",
      "sources": [
        "https://ionnews.mu"
      ]
    }
  ],
  "MV": [
    {
      "id": "mv-mihaaru",
      "countryCode": "MV",
      "name": "Mihaaru",
      "nativeName": "މިހާރު",
      "englishTranslation": "Now",
      "founded": 2016,
      "frequency": "Continuous digital news service & print editions",
      "format": "Digital news portal & print journal",
      "language": "Dhivehi, English",
      "headquarters": "Malé",
      "owner": {
        "name": "Mihaaru Media Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Formed by former journalists of the historic Haveeru Daily; regarded as the country's most respected independent investigative and analytical news organization",
      "readership": {
        "metric": "Over 150,000 daily unique visitors across the Maldivian archipelago and diaspora",
        "source": "Mihaaru Media Kit 2023"
      },
      "revenueModel": "Digital advertising, commercial print sponsorships, and events",
      "logo": "newspaper-logos/mv/mihaaru.svg",
      "logoExplainer": "Fiery red badge with stark white heavy sans-serif typography 'MIHAARU', representing prompt, authoritative breaking coverage.",
      "sources": [
        "https://mihaaru.com",
        "https://en.wikipedia.org/wiki/Mihaaru"
      ]
    },
    {
      "id": "mv-sun-online",
      "countryCode": "MV",
      "name": "Sun Online",
      "nativeName": "ސަން އޮންލައިން",
      "englishTranslation": "Sun Online",
      "founded": 2010,
      "frequency": "Continuous digital news service",
      "format": "Digital news portal",
      "language": "Dhivehi, English",
      "headquarters": "Malé",
      "owner": {
        "name": "Sun Media Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Popular commercial news outlet known for extensive coverage of Majlis (parliament) debates, criminal trials, resort tourism developments, and atoll affairs",
      "readership": {
        "metric": "Over 100,000 daily page visits and substantial following across island communities",
        "source": "Sun Media Analytics 2023"
      },
      "revenueModel": "Digital display advertising, sponsored features, and video production",
      "logo": "newspaper-logos/mv/sun-online.svg",
      "logoExplainer": "Warm sun-gold rectangular background with strong charcoal lettering 'SUN ONLINE', signifying equatorial warmth and illuminating reporting.",
      "sources": [
        "https://sun.mv"
      ]
    },
    {
      "id": "mv-avas",
      "countryCode": "MV",
      "name": "Avas",
      "nativeName": "އަވަސް",
      "englishTranslation": "Fast",
      "founded": 2014,
      "frequency": "Continuous digital news service",
      "format": "Digital portal & video news",
      "language": "Dhivehi, English",
      "headquarters": "Malé",
      "owner": {
        "name": "Avas Media",
        "type": "Independent commercial media"
      },
      "editorialStance": "Dynamic digital outlet focusing on fast-breaking political developments, youth culture, socioeconomic debates, and environmental conservation in the atolls",
      "readership": {
        "metric": "Popular mobile news destination with over 75,000 daily unique page views",
        "source": "Avas Audience Insight 2024"
      },
      "revenueModel": "Digital advertising, programmatic networks, and commercial sponsorships",
      "logo": "newspaper-logos/mv/avas.svg",
      "logoExplainer": "Vibrant ocean-sky blue canvas bearing heavy white typography 'AVAS', echoing the surrounding Maldivian waters and swift delivery.",
      "sources": [
        "https://avas.mv"
      ]
    },
    {
      "id": "mv-the-edition",
      "countryCode": "MV",
      "name": "The Edition",
      "founded": 2018,
      "frequency": "Continuous digital news service",
      "format": "English-language digital news portal",
      "language": "English",
      "headquarters": "Malé",
      "owner": {
        "name": "Mihaaru Media Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "The Maldives' leading English-language news outlet; covers climate change diplomacy, luxury resort investments, governance, and human interest stories for international audiences",
      "readership": {
        "metric": "Read extensively by expatriates, tourists, foreign diplomats, and regional environmental scholars",
        "source": "The Edition Editorial Report 2023"
      },
      "revenueModel": "Digital advertising and tourism sector sponsorships",
      "logo": "newspaper-logos/mv/the-edition.svg",
      "logoExplainer": "Clean white background featuring refined dark navy serif lettering 'The Edition', projecting international journalistic prestige.",
      "sources": [
        "https://edition.mv"
      ]
    }
  ],
  "MW": [
    {
      "id": "mw-the-daily-times",
      "countryCode": "MW",
      "name": "The Daily Times",
      "founded": 1895,
      "frequency": "Daily newspaper (Monday–Friday)",
      "format": "Broadsheet & digital portal",
      "language": "English",
      "headquarters": "Blantyre",
      "owner": {
        "name": "Times Group (Blantyre Newspapers Limited)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Malawi's oldest commercial newspaper; rigorous investigative reporting on government transparency, public expenditure, and business policy",
      "readership": {
        "metric": "Leading circulation daily with over 20,000 print copies and strong multiplatform reach via Times 360 Malawi",
        "source": "Times Group Audience Metrics 2023"
      },
      "revenueModel": "Print copy sales, classified ads, and multimedia advertising",
      "logo": "newspaper-logos/mw/the-daily-times.svg",
      "logoExplainer": "Deep colonial blue background with classical white serif headline font 'The Daily Times', conveying over a century of journalistic authority.",
      "sources": [
        "https://times.mw",
        "https://en.wikipedia.org/wiki/The_Daily_Times_(Malawi)"
      ]
    },
    {
      "id": "mw-the-nation",
      "countryCode": "MW",
      "name": "The Nation",
      "founded": 1993,
      "frequency": "Daily newspaper (Monday–Friday)",
      "format": "Broadsheet & digital news portal",
      "language": "English, Chichewa",
      "headquarters": "Ginnery Corner, Blantyre",
      "owner": {
        "name": "Nation Publications Limited (NPL)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Premier daily established during Malawi's democratic transition; staunch defender of free expression, good governance, human rights, and constitutional democracy",
      "readership": {
        "metric": "Over 22,000 daily print circulation with extensive national distribution from Nsanje to Chitipa",
        "source": "Nation Publications Corporate Report 2023"
      },
      "revenueModel": "Print sales, institutional subscriptions, and commercial advertising",
      "logo": "newspaper-logos/mw/the-nation.svg",
      "logoExplainer": "Pure white field showcasing commanding crimson red serif lettering 'The Nation', denoting democratic integrity.",
      "sources": [
        "https://mwnation.com",
        "https://en.wikipedia.org/wiki/The_Nation_(Malawi)"
      ]
    },
    {
      "id": "mw-malawi24",
      "countryCode": "MW",
      "name": "Malawi24",
      "founded": 2014,
      "frequency": "Continuous digital news service",
      "format": "Digital portal & social news network",
      "language": "English, Chichewa",
      "headquarters": "Blantyre and Lilongwe",
      "owner": {
        "name": "Malawi24 Media Network",
        "type": "Independent digital media"
      },
      "editorialStance": "Fast-growing digital newsroom focused on rapid breaking updates, youth issues, sports (Super League of Malawi), entertainment, and grassroots citizen reporting",
      "readership": {
        "metric": "Over 800,000 monthly active users and more than 500,000 followers across social news channels",
        "source": "Malawi24 Digital Engagement Data 2024"
      },
      "revenueModel": "Programmatic digital ads, affiliate partnerships, and sponsored content",
      "logo": "newspaper-logos/mw/malawi24.svg",
      "logoExplainer": "Bold red backdrop displaying modern white impact typography 'MALAWI 24', emphasizing round-the-clock digital breaking news.",
      "sources": [
        "https://malawi24.com"
      ]
    },
    {
      "id": "mw-nyasa-times",
      "countryCode": "MW",
      "name": "Nyasa Times",
      "founded": 2006,
      "frequency": "Continuous digital news service",
      "format": "Digital news portal",
      "language": "English",
      "headquarters": "Lilongwe (with diaspora desks in London and Blantyre)",
      "owner": {
        "name": "Nyasa Times Media Group",
        "type": "Independent digital media"
      },
      "editorialStance": "Influential pioneer of Malawian online journalism; critical analysis of political maneuvering, judicial decisions, and diaspora concerns",
      "readership": {
        "metric": "Over 1.5 million monthly page impressions from Malawi and the worldwide diaspora",
        "source": "Nyasa Times Web Analytics 2023"
      },
      "revenueModel": "Online display advertising and corporate promotional features",
      "logo": "newspaper-logos/mw/nyasa-times.svg",
      "logoExplainer": "Dark navy canvas highlighted by sky-blue uppercase typography 'NYASA TIMES', representing the enduring voice of Lake Malawi and diaspora.",
      "sources": [
        "https://www.nyasatimes.com",
        "https://en.wikipedia.org/wiki/Nyasa_Times"
      ]
    }
  ],
  "MX": [
    {
      "id": "mx-el-universal",
      "countryCode": "MX",
      "name": "El Universal",
      "founded": 1916,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Broadsheet & digital news portal",
      "language": "Spanish",
      "headquarters": "Mexico City",
      "owner": {
        "name": "El Universal, Compañía Periodística Nacional",
        "type": "Independent commercial media"
      },
      "editorialStance": "Mexico's century-old newspaper of record; centrist, comprehensive national coverage, investigative reporting on government transparency, economics, and judicial affairs",
      "readership": {
        "metric": "Over 120,000 daily print circulation and more than 18 million monthly unique visitors online",
        "source": "Comscore Mexico / El Universal Audit 2023"
      },
      "revenueModel": "Print circulation, digital subscriptions (El Universal Plus), and display advertising",
      "logo": "newspaper-logos/mx/el-universal.svg",
      "logoExplainer": "Deep navy blue field displaying the iconic stylized soaring eagle emblem and bold white serif headline 'EL UNIVERSAL', evoking national stature.",
      "sources": [
        "https://www.eluniversal.com.mx",
        "https://es.wikipedia.org/wiki/El_Universal_(M%C3%A9xico)"
      ]
    },
    {
      "id": "mx-reforma",
      "countryCode": "MX",
      "name": "Reforma",
      "founded": 1993,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Broadsheet & digital subscriber portal",
      "language": "Spanish",
      "headquarters": "Mexico City",
      "owner": {
        "name": "Grupo Reforma",
        "type": "Independent commercial media"
      },
      "editorialStance": "Leading independent investigative newspaper; known for strict journalistic ethical codes, exposing political corruption, judicial malpractice, and financial monopolies",
      "readership": {
        "metric": "Over 90,000 paid daily print copies and Mexico's most successful digital hard paywall with over 150,000 digital subscribers",
        "source": "Grupo Reforma Annual Statement 2023"
      },
      "revenueModel": "Hard digital paywall subscriptions, print sales, and premium advertising",
      "logo": "newspaper-logos/mx/reforma.svg",
      "logoExplainer": "Distinctive scarlet red background with bold white condensed serif capital letters 'REFORMA', symbolizing journalistic vigor and editorial courage.",
      "sources": [
        "https://www.reforma.com",
        "https://en.wikipedia.org/wiki/Reforma_(newspaper)"
      ]
    },
    {
      "id": "mx-la-jornada",
      "countryCode": "MX",
      "name": "La Jornada",
      "founded": 1984,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Tabloid & digital portal",
      "language": "Spanish",
      "headquarters": "Mexico City",
      "owner": {
        "name": "DEMOS, Desarrollo de Medios, S.A. de C.V.",
        "type": "Journalist-owned cooperative media"
      },
      "editorialStance": "Prominent left-wing newspaper of record; staunch coverage of indigenous rights, labor struggles, social movements, Latin American solidarity, and environmental defense",
      "readership": {
        "metric": "Over 75,000 daily print copies and over 12 million monthly digital readers across Latin America",
        "source": "DEMOS S.A. Audited Metrics 2023"
      },
      "revenueModel": "Print sales, open digital advertising, and institutional subscriptions",
      "logo": "newspaper-logos/mx/la-jornada.svg",
      "logoExplainer": "Classic black and white masthead featuring distinctive bold brush script 'La Jornada', representing grassroots democratic journalism and social justice.",
      "sources": [
        "https://www.jornada.com.mx",
        "https://es.wikipedia.org/wiki/La_Jornada"
      ]
    },
    {
      "id": "mx-el-financiero",
      "countryCode": "MX",
      "name": "El Financiero",
      "founded": 1981,
      "frequency": "Daily financial newspaper & television channel",
      "format": "Broadsheet, digital portal",
      "language": "Spanish",
      "headquarters": "Mexico City",
      "owner": {
        "name": "Grupo Multimedia Lauman",
        "type": "Independent commercial financial media"
      },
      "editorialStance": "Mexico's premier financial and economic daily; in partnership with Bloomberg, delivering market analytics, macroeconomic forecasts, corporate mergers, and trade policy",
      "readership": {
        "metric": "Over 65,000 daily print copies read by corporate executives, banking officials, and investors nationwide",
        "source": "El Financiero Bloomberg Media Kit 2023"
      },
      "revenueModel": "Corporate print/digital subscriptions, financial advertising, and television broadcast",
      "logo": "newspaper-logos/mx/el-financiero.svg",
      "logoExplainer": "Corporate navy blue background with crisp white typography 'EL FINANCIERO' and gold accent line, signifying market authority and financial intelligence.",
      "sources": [
        "https://www.elfinanciero.com.mx",
        "https://es.wikipedia.org/wiki/El_Financiero"
      ]
    }
  ],
  "MY": [
    {
      "id": "my-the-star",
      "countryCode": "MY",
      "name": "The Star",
      "officialName": "The Star",
      "founded": 1971,
      "frequency": "Daily tabloid & digital edition (Monday–Sunday)",
      "format": "Tabloid print & digital portal (thestar.com.my)",
      "language": "English",
      "headquarters": "Petaling Jaya, Selangor",
      "owner": {
        "name": "Star Media Group Berhad",
        "type": "Publicly traded media corporation"
      },
      "editorialStance": "Mainstream centrist national coverage, business reporting, community issues, and educational supplements",
      "readership": {
        "metric": "Malaysia's most widely read English daily, reaching over 5 million digital unique visitors monthly",
        "source": "Audit Bureau of Circulations (ABC) Malaysia & Comscore 2024"
      },
      "revenueModel": "Print sales, digital newsstand subscriptions, and digital advertising",
      "logo": "newspaper-logos/my/the-star.png",
      "logoExplainer": "Classic red uppercase masthead with distinctive five-pointed star emblem inside the letter 'S'.",
      "sources": [
        "https://www.thestar.com.my",
        "https://en.wikipedia.org/wiki/The_Star_(Malaysia)"
      ]
    },
    {
      "id": "my-new-straits-times",
      "countryCode": "MY",
      "name": "New Straits Times",
      "officialName": "New Straits Times",
      "founded": 1845,
      "frequency": "Daily compact edition (Monday–Sunday)",
      "format": "Compact print & digital news portal (nst.com.my)",
      "language": "English",
      "headquarters": "Kuala Lumpur",
      "owner": {
        "name": "Media Prima Berhad",
        "type": "Commercial media conglomerate"
      },
      "editorialStance": "Historic national paper of record; national policy, ASEAN diplomacy, business news, and institutional reporting",
      "readership": {
        "metric": "Over 3.5 million monthly digital readers across web and mobile platforms",
        "source": "Media Prima Group Annual Report 2023"
      },
      "revenueModel": "Print copy sales, digital subscriptions, and display advertising",
      "logo": "newspaper-logos/my/new-straits-times.png",
      "logoExplainer": "Refined dark serif masthead representing Malaysia's oldest surviving English-language newspaper brand.",
      "sources": [
        "https://www.nst.com.my",
        "https://en.wikipedia.org/wiki/New_Straits_Times"
      ]
    },
    {
      "id": "my-berita-harian",
      "countryCode": "MY",
      "name": "Berita Harian",
      "officialName": "Berita Harian",
      "englishTranslation": "Daily News",
      "founded": 1957,
      "frequency": "Daily compact newspaper (Monday–Sunday)",
      "format": "Compact print & digital news portal (bharian.com.my)",
      "language": "Malay",
      "headquarters": "Kuala Lumpur",
      "owner": {
        "name": "Media Prima Berhad",
        "type": "Commercial media conglomerate"
      },
      "editorialStance": "Leading mainstream Malay-language daily; national politics, cultural affairs, education, and community perspectives",
      "readership": {
        "metric": "Over 4.5 million monthly digital and print readers nationwide",
        "source": "Media Prima Group Annual Report 2023"
      },
      "revenueModel": "Print sales, mobile digital subscriptions, and commercial advertising",
      "logo": "newspaper-logos/my/berita-harian.png",
      "logoExplainer": "Bold red and black modern masthead with the stylized BH logo emblem in red oval.",
      "sources": [
        "https://www.bharian.com.my",
        "https://en.wikipedia.org/wiki/Berita_Harian_(Malaysia)"
      ]
    },
    {
      "id": "my-sin-chew-daily",
      "countryCode": "MY",
      "name": "Sin Chew Daily",
      "officialName": "Sin Chew Daily",
      "nativeName": "星洲日報",
      "englishTranslation": "Singapore / Straits Daily",
      "founded": 1929,
      "frequency": "Daily broadsheet (Monday–Sunday)",
      "format": "Broadsheet print & digital news portal (sinchew.com.my)",
      "language": "Chinese",
      "headquarters": "Petaling Jaya, Selangor",
      "owner": {
        "name": "Media Chinese International Limited",
        "type": "Dual-listed public media group"
      },
      "editorialStance": "Independent Chinese-language newspaper of record; national political debate, Chinese community affairs, education, and international news",
      "readership": {
        "metric": "Over 280,000 daily print circulation and 6+ million monthly digital visitors; largest Chinese daily outside Greater China",
        "source": "Audit Bureau of Circulations (ABC) Malaysia 2024"
      },
      "revenueModel": "Print copy sales, digital paywall, and community classifieds",
      "logo": "newspaper-logos/my/sin-chew-daily.png",
      "logoExplainer": "Traditional Chinese calligraphy masthead ('星洲日報') meaning 'Singapore/Straits Daily' in red and black ink.",
      "sources": [
        "https://www.sinchew.com.my",
        "https://en.wikipedia.org/wiki/Sin_Chew_Daily"
      ]
    },
    {
      "id": "my-harian-metro",
      "countryCode": "MY",
      "name": "Harian Metro",
      "officialName": "Harian Metro",
      "englishTranslation": "Metro Daily",
      "founded": 1991,
      "frequency": "Daily afternoon tabloid (Monday–Sunday)",
      "format": "Tabloid print & high-traffic digital portal (hmetro.com.my)",
      "language": "Malay",
      "headquarters": "Kuala Lumpur",
      "owner": {
        "name": "Media Prima Berhad",
        "type": "Commercial media conglomerate"
      },
      "editorialStance": "Popular mass-market Malay tabloid; breaking local news, crime, human interest, sports, and viral stories",
      "readership": {
        "metric": "Over 5 million monthly unique digital visitors, making it one of Malaysia's highest-traffic news websites",
        "source": "Comscore / Media Prima 2024"
      },
      "revenueModel": "Mass print distribution, mobile apps, and programmatic digital advertising",
      "logo": "newspaper-logos/my/harian-metro.png",
      "logoExplainer": "Vibrant yellow and red typography with the signature 'HM' badge representing fast-paced urban daily journalism.",
      "sources": [
        "https://www.hmetro.com.my",
        "https://en.wikipedia.org/wiki/Harian_Metro"
      ]
    }
  ],
  "MZ": [
    {
      "id": "mz-noticias",
      "countryCode": "MZ",
      "name": "Jornal Notícias",
      "nativeName": "Jornal Notícias",
      "englishTranslation": "News Newspaper",
      "founded": 1926,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Broadsheet & digital portal",
      "language": "Portuguese",
      "headquarters": "Maputo",
      "owner": {
        "name": "Sociedade do Notícias, S.A.",
        "type": "Public-private enterprise"
      },
      "editorialStance": "Mozambique's oldest and highest-circulation daily newspaper; comprehensive national coverage of government affairs, provincial administration across all 11 provinces, economic markets, and sports",
      "readership": {
        "metric": "Over 25,000 daily print copies distributed across the country and the premier print reference in Mozambique",
        "source": "Sociedade do Notícias Relatório Anual 2023"
      },
      "revenueModel": "Print sales, state and commercial advertising, and digital subscriptions",
      "logo": "newspaper-logos/mz/noticias.svg",
      "logoExplainer": "Deep navy blue background displaying classic crisp white serif typography 'NOTÍCIAS', representing the historic daily newspaper of record.",
      "sources": [
        "https://www.jornalnoticias.co.mz",
        "https://pt.wikipedia.org/wiki/Jornal_Not%C3%ADcias"
      ]
    },
    {
      "id": "mz-o-pais",
      "countryCode": "MZ",
      "name": "O País",
      "nativeName": "O País",
      "englishTranslation": "The Country",
      "founded": 2005,
      "frequency": "Daily newspaper (Monday–Friday) & STV channel",
      "format": "Compact tabloid, digital portal & linear TV (STV)",
      "language": "Portuguese",
      "headquarters": "Maputo",
      "owner": {
        "name": "SOICO Group (Sociedade Independente de Comunicação)",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Leading independent daily newspaper and multimedia house; known for critical investigative reporting on public expenditure, social inequality, natural disasters (cyclones), and political transparency",
      "readership": {
        "metric": "Over 18,000 daily print copies and over 1.2 million monthly unique visits on opais.co.mz, integrated with STV television network",
        "source": "Grupo SOICO Relatório de Gestão 2023"
      },
      "revenueModel": "Print sales, multimedia advertising, and broadcast commercial sponsors",
      "logo": "newspaper-logos/mz/o-pais.svg",
      "logoExplainer": "Vibrant crimson red background featuring bold modern white sans-serif lettering 'O PAÍS', evoking dynamic independent news reporting.",
      "sources": [
        "https://opais.co.mz",
        "https://pt.wikipedia.org/wiki/O_Pa%C3%ADs_(Mo%C3%A7ambique)"
      ]
    },
    {
      "id": "mz-canal-de-mocambique",
      "countryCode": "MZ",
      "name": "Canal de Moçambique",
      "nativeName": "Canal de Moçambique",
      "englishTranslation": "Mozambique Channel",
      "founded": 2006,
      "frequency": "Weekly newspaper (Wednesdays)",
      "format": "Tabloid & digital edition",
      "language": "Portuguese",
      "headquarters": "Maputo",
      "owner": {
        "name": "Canal de Moçambique Lda",
        "type": "Independent investigative media"
      },
      "editorialStance": "Acclaimed independent investigative weekly founded by renowned journalist Carlos Cardoso's legacy; famous for uncovering state corruption, hidden debt scandals, illicit logging, and human rights issues",
      "readership": {
        "metric": "Highly influential political weekly with 10,000 print copies read by policymakers, diplomats, and civil society leaders",
        "source": "MISA Moçambique Media Freedom Report 2023"
      },
      "revenueModel": "Newsstand sales, individual subscriptions, and limited independent ads",
      "logo": "newspaper-logos/mz/canal-de-mocambique.svg",
      "logoExplainer": "Stark white canvas showcasing sharp black and red uppercase lettering 'CANAL DE MOÇAMBIQUE', representing courageous investigative journalism.",
      "sources": [
        "https://canal.co.mz",
        "https://pt.wikipedia.org/wiki/Canal_de_Mo%C3%A7ambique"
      ]
    }
  ],
  "NA": [
    {
      "id": "na-die-republikein",
      "countryCode": "NA",
      "name": "Die Republikein",
      "nativeName": "Die Republikein",
      "englishTranslation": "The Republican",
      "founded": 1977,
      "frequency": "Daily newspaper (Monday–Friday)",
      "format": "Tabloid & digital portal",
      "language": "Afrikaans, English",
      "headquarters": "Windhoek",
      "owner": {
        "name": "Namibia Media Holdings (NMH)",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Leading Afrikaans-language daily newspaper; extensive coverage of Namibian agriculture, livestock farming, wildlife conservation, commercial business, and local politics",
      "readership": {
        "metric": "Over 15,000 daily print copies distributed across commercial farming regions and urban centers throughout Namibia",
        "source": "Namibia Media Holdings Audit 2023"
      },
      "revenueModel": "Print copy sales, farming classifieds, and corporate advertising",
      "logo": "newspaper-logos/na/die-republikein.svg",
      "logoExplainer": "Deep scarlet red background emblazoned with crisp white serif typography 'Die Republikein', representing four decades of Afrikaans journalism.",
      "sources": [
        "https://www.republikein.com.na",
        "https://en.wikipedia.org/wiki/Die_Republikein"
      ]
    },
    {
      "id": "na-new-era",
      "countryCode": "NA",
      "name": "New Era",
      "founded": 1992,
      "frequency": "Daily newspaper (Monday–Friday)",
      "format": "Tabloid & digital news portal",
      "language": "English and indigenous languages (Otjiherero, Oshiwambo, Khoekhoegowab, Silozi)",
      "headquarters": "Windhoek",
      "owner": {
        "name": "New Era Publication Corporation (NEPC)",
        "type": "State-owned enterprise"
      },
      "editorialStance": "National state-owned daily newspaper established by act of parliament; focuses on national development programs, civil service initiatives, rural infrastructure, and multilingual civic awareness",
      "readership": {
        "metric": "Over 12,000 daily print circulation with institutional distribution across all 14 regions of Namibia",
        "source": "NEPC Annual Report 2023"
      },
      "revenueModel": "State budget grant, newspaper sales, and government tender notices",
      "logo": "newspaper-logos/na/new-era.svg",
      "logoExplainer": "Forest green background with clean white and gold modern typography 'NEW ERA', denoting post-independence reconstruction and national development.",
      "sources": [
        "https://neweralive.na",
        "https://en.wikipedia.org/wiki/New_Era_(Namibia)"
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
      "logo": "newspaper-logos/na/the-namibian.svg",
      "logoExplainer": "Vibrant ultramarine blue field featuring bold white sans-serif title 'The Namibian' with red accent, symbolizing courageous independence.",
      "sources": [
        "https://www.namibian.com.na",
        "https://en.wikipedia.org/wiki/The_Namibian"
      ]
    }
  ],
  "NE": [
    {
      "id": "ne-le-sahel",
      "countryCode": "NE",
      "name": "Le Sahel",
      "nativeName": "Le Sahel",
      "englishTranslation": "The Sahel",
      "founded": 1960,
      "frequency": "Daily newspaper (Monday–Friday) & Sahel Dimanche",
      "format": "Broadsheet & digital edition",
      "language": "French",
      "headquarters": "Niamey",
      "owner": {
        "name": "Office National d'Édition et de Presse (ONEP)",
        "type": "State public enterprise"
      },
      "editorialStance": "Niger's historical daily newspaper of record; publishes official government communiqués, ministerial decisions, judicial appointments, domestic agricultural harvest reports, and cultural features",
      "readership": {
        "metric": "Highest circulation daily print newspaper in Niger with over 8,000 copies distributed to ministries, embassies, and regional governorates",
        "source": "ONEP Rapport d'Entreprise 2023"
      },
      "revenueModel": "Print sales, mandatory public tender notices, and official advertisements",
      "logo": "newspaper-logos/ne/le-sahel.svg",
      "logoExplainer": "Deep Sahara-sand gold background with elegant black serif typography 'Le Sahel', evoking the geographical heart of the Sahel region.",
      "sources": [
        "https://lesahel.org",
        "https://fr.wikipedia.org/wiki/Le_Sahel_(journal)"
      ]
    },
    {
      "id": "ne-air-info",
      "countryCode": "NE",
      "name": "Aïr Info",
      "founded": 2002,
      "frequency": "Monthly journal & continuous digital service",
      "format": "Tabloid & digital news portal",
      "language": "French",
      "headquarters": "Agadez",
      "owner": {
        "name": "Aïr Info Communication",
        "type": "Independent regional media"
      },
      "editorialStance": "Premier independent publication of northern Niger based in historic Agadez; renowned for specialist coverage of desert pastoralism, Tuareg cultural preservation, trans-Saharan migration routes, and mining in the Aïr Mountains",
      "readership": {
        "metric": "Key news reference for northern Niger, regional aid agencies, and international Sahelian researchers",
        "source": "Aïr Info Media Kit 2023"
      },
      "revenueModel": "Print copy sales, donor partnership reporting, and digital advertising",
      "logo": "newspaper-logos/ne/air-info.svg",
      "logoExplainer": "Desert sand-orange field featuring the stylized Cross of Agadez symbol and bold black lettering 'AÏR INFO', representing the desert north.",
      "sources": [
        "https://airinfoagadez.com",
        "https://fr.wikipedia.org/wiki/A%C3%AFr_Info"
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
      "logo": "newspaper-logos/ne/le-republicain.svg",
      "logoExplainer": "Forest green background displaying stark white serif typography 'Le Républicain', symbolizing democratic renewal in Niger.",
      "sources": [
        "https://republicain-niger.com",
        "https://fr.wikipedia.org/wiki/Le_R%C3%A9publicain_(Niger)"
      ]
    }
  ],
  "NG": [
    {
      "id": "ng-the-punch",
      "countryCode": "NG",
      "name": "The Punch",
      "founded": 1971,
      "frequency": "Daily newspaper (Monday–Sunday) & continuous digital portal",
      "format": "Tabloid & digital news portal",
      "language": "English",
      "headquarters": "Magboro, Ogun State (Lagos Bureau)",
      "owner": {
        "name": "Punch Nigeria Limited",
        "type": "Independent commercial media"
      },
      "editorialStance": "Nigeria's highest-circulation and most widely read commercial daily newspaper; fiercely independent editorial line renowned for investigative exposés against corruption, police brutality, and defending constitutional democracy",
      "readership": {
        "metric": "Over 80,000 daily print circulation and punchng.com is Nigeria's most visited news website with over 25 million monthly page impressions",
        "source": "Audit Bureau of Circulations Nigeria / Similarweb 2023"
      },
      "revenueModel": "Print sales, digital advertising, classifieds, and event partnerships",
      "logo": "newspaper-logos/ng/the-punch.svg",
      "logoExplainer": "Distinctive scarlet red background with bold white heavyweight sans-serif typography 'PUNCH', representing independent editorial impact.",
      "sources": [
        "https://punchng.com",
        "https://en.wikipedia.org/wiki/The_Punch"
      ]
    },
    {
      "id": "ng-premium-times",
      "countryCode": "NG",
      "name": "Premium Times",
      "founded": 2011,
      "frequency": "Continuous digital investigative news service",
      "format": "Digital news portal & investigative multimedia",
      "language": "English",
      "headquarters": "Wuse II, Abuja",
      "owner": {
        "name": "Premium Times Services Limited",
        "type": "Independent investigative media"
      },
      "editorialStance": "Nigeria's leading investigative journalism platform; Pulitzer Prize partner (Panama Papers) celebrated for courageous investigations into military spending, petroleum revenue fraud, judicial malpractice, and human rights",
      "readership": {
        "metric": "Over 5 million monthly unique visitors and one of the most cited investigative newsrooms in West Africa",
        "source": "Premium Times Annual Review 2023"
      },
      "revenueModel": "Digital advertising, investigative philanthropy grants, and reader subscriptions",
      "logo": "newspaper-logos/ng/premium-times.svg",
      "logoExplainer": "Sleek dark navy blue backdrop with vibrant golden-yellow and white typography 'PREMIUM TIMES', denoting uncompromising investigative excellence.",
      "sources": [
        "https://www.premiumtimesng.com",
        "https://en.wikipedia.org/wiki/Premium_Times"
      ]
    },
    {
      "id": "ng-the-guardian",
      "countryCode": "NG",
      "name": "The Guardian",
      "founded": 1983,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Broadsheet & digital portal",
      "language": "English",
      "headquarters": "Rutam House, Isolo, Lagos",
      "owner": {
        "name": "Guardian Newspapers Limited (Ibru Family)",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Long recognized as the 'flagship of the Nigerian press' and broadsheet of record; prestigious intellectual and analytical standard, in-depth political essays, economic policy critique, and cultural arts reviews",
      "readership": {
        "metric": "Over 50,000 daily print copies read extensively by policymakers, senior corporate executives, and university scholars nationwide",
        "source": "Advertisers Association of Nigeria (ADVAN) 2023"
      },
      "revenueModel": "Print sales, institutional subscriptions, and corporate display advertising",
      "logo": "newspaper-logos/ng/the-guardian.svg",
      "logoExplainer": "Clean white background with the iconic classic black serif title 'The Guardian' and golden motto 'Conscience, Nurtured by Truth'.",
      "sources": [
        "https://guardian.ng",
        "https://en.wikipedia.org/wiki/The_Guardian_(Nigeria)"
      ]
    },
    {
      "id": "ng-vanguard",
      "countryCode": "NG",
      "name": "Vanguard",
      "founded": 1983,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Tabloid & digital news portal",
      "language": "English",
      "headquarters": "Apapa, Lagos",
      "owner": {
        "name": "Vanguard Media Limited (Sam Amuka-Pemu)",
        "type": "Independent commercial media"
      },
      "editorialStance": "One of Nigeria's leading mainstream daily newspapers; popular editorial style focusing on national breaking headlines, Niger Delta resource debates, sports (Super Eagles), and community reporting",
      "readership": {
        "metric": "Over 60,000 daily print circulation and more than 15 million monthly digital visitors on vanguardngr.com",
        "source": "Media Reach OMD Nigeria 2023"
      },
      "revenueModel": "Print sales, classifieds, and digital advertising networks",
      "logo": "newspaper-logos/ng/vanguard.svg",
      "logoExplainer": "Bright red rectangular background featuring prominent bold white italic sans-serif lettering 'Vanguard', symbolizing dynamic national news delivery.",
      "sources": [
        "https://www.vanguardngr.com",
        "https://en.wikipedia.org/wiki/Vanguard_(Nigeria)"
      ]
    }
  ],
  "NI": [
    {
      "id": "ni-la-prensa",
      "countryCode": "NI",
      "name": "La Prensa",
      "founded": 1926,
      "frequency": "Continuous digital news service (print in exile)",
      "format": "Digital news portal & investigative multimedia",
      "language": "Spanish",
      "headquarters": "Managua / San José, Costa Rica (exile operations)",
      "owner": {
        "name": "Editorial La Prensa, S.A.",
        "type": "Independent commercial media"
      },
      "editorialStance": "Nicaragua's centennial newspaper of record; historically led by national martyr Pedro Joaquín Chamorro against Somoza dictatorship, and currently operating in courageous exile reporting on democratic freedoms and human rights",
      "readership": {
        "metric": "Over 1.5 million monthly unique online visitors inside Nicaragua and across the Central American diaspora",
        "source": "La Prensa Digital Analytics 2023"
      },
      "revenueModel": "Digital paywall subscriptions, reader donations, and international press support grants",
      "logo": "newspaper-logos/ni/la-prensa.svg",
      "logoExplainer": "Dignified dark navy field displaying classical white serif typography 'LA PRENSA' with cyan blue accent, symbolizing unwavering truth in exile.",
      "sources": [
        "https://www.laprensani.com",
        "https://es.wikipedia.org/wiki/La_Prensa_(Nicaragua)"
      ]
    },
    {
      "id": "ni-confidencial",
      "countryCode": "NI",
      "name": "Confidencial",
      "founded": 1996,
      "frequency": "Continuous digital news service & weekly television (Esta Semana)",
      "format": "Digital investigative portal & YouTube broadcasts",
      "language": "Spanish, English",
      "headquarters": "Managua / San José, Costa Rica (exile operations)",
      "owner": {
        "name": "Invermedia / Carlos Fernando Chamorro",
        "type": "Independent investigative media"
      },
      "editorialStance": "Acclaimed independent investigative journalism organization; recipient of the Maria Moors Cabot Prize and Ortega y Gasset Award for exposing government corruption, electoral fraud, and political repression",
      "readership": {
        "metric": "Over 2 million monthly digital readers and massive video audience through 'Esta Semana' and YouTube channels",
        "source": "Confidencial Audience Report 2023"
      },
      "revenueModel": "Reader membership club, voluntary donations, and international investigative journalism funds",
      "logo": "newspaper-logos/ni/confidencial.svg",
      "logoExplainer": "Pure white canvas showcasing bold black and scarlet red lowercase typography 'confidencial', representing rigorous investigative scrutiny.",
      "sources": [
        "https://confidencial.digital",
        "https://es.wikipedia.org/wiki/Confidencial_(peri%C3%B3dico)"
      ]
    },
    {
      "id": "ni-el-19-digital",
      "countryCode": "NI",
      "name": "El 19 Digital",
      "founded": 2008,
      "frequency": "Continuous digital news service",
      "format": "Digital news portal & official state gazette",
      "language": "Spanish",
      "headquarters": "Managua",
      "owner": {
        "name": "Government of Reconciliation and National Unity (FSLN)",
        "type": "State/Party official media"
      },
      "editorialStance": "Official news portal of the Nicaraguan government; publishes presidential communiqués, social welfare program updates, infrastructure projects, and international diplomatic statements",
      "readership": {
        "metric": "Official clearinghouse consulted by all public ministries, state employees, municipal mayors, and party committees",
        "source": "Consejo de Comunicación y Ciudadanía 2023"
      },
      "revenueModel": "State government operational budget",
      "logo": "newspaper-logos/ni/el-19-digital.svg",
      "logoExplainer": "FSLN red and black bicolor emblem featuring bold white numeral '19' and clean lettering 'EL 19 DIGITAL', signifying state institutional news.",
      "sources": [
        "https://www.el19digital.com"
      ]
    },
    {
      "id": "ni-articulo-66",
      "countryCode": "NI",
      "name": "Artículo 66",
      "founded": 2017,
      "frequency": "Continuous digital news service",
      "format": "Digital investigative portal & video news",
      "language": "Spanish",
      "headquarters": "Managua / San José, Costa Rica (exile operations)",
      "owner": {
        "name": "Artículo 66 Media",
        "type": "Independent digital media"
      },
      "editorialStance": "Named after Article 66 of the Nicaraguan Constitution guaranteeing free expression; provides frontline digital reporting on civil liberties, political prisoners, and socioeconomic realities",
      "readership": {
        "metric": "Over 400,000 monthly digital readers and strong mobile social media engagement",
        "source": "Artículo 66 Digital Metrics 2023"
      },
      "revenueModel": "Citizen donations, independent digital advertising, and press defense grants",
      "logo": "newspaper-logos/ni/articulo-66.svg",
      "logoExplainer": "Sky-blue rectangular banner with bold white numerals '66' and uppercase text 'ARTÍCULO 66', celebrating constitutional free speech.",
      "sources": [
        "https://www.articulo66.com"
      ]
    }
  ],
  "NL": [
    {
      "id": "nl-de-telegraaf",
      "countryCode": "NL",
      "name": "De Telegraaf",
      "founded": 1893,
      "frequency": "Daily newspaper (Monday–Saturday) & continuous digital portal",
      "format": "Compact & digital multimedia portal",
      "language": "Dutch",
      "headquarters": "Basisweg, Amsterdam",
      "owner": {
        "name": "Mediahuis Nederland",
        "type": "Independent commercial media group"
      },
      "editorialStance": "The Netherlands' highest-circulation daily newspaper; populist, center-right editorial line known for sensational investigative scoops, crime reporting, business commentary, and popular sports",
      "readership": {
        "metric": "Over 350,000 paid daily print copies and over 2 million daily digital unique readers on telegraaf.nl",
        "source": "Nationaal Onderzoek Multimedia (NOM) 2023"
      },
      "revenueModel": "Print sales, digital subscriptions (Telegraaf Premium), and high-volume commercial advertising",
      "logo": "newspaper-logos/nl/de-telegraaf.svg",
      "logoExplainer": "Distinctive black gothic-style masthead 'De Telegraaf' on pure white background, reflecting the iconic style of the nation's best-selling paper.",
      "sources": [
        "https://www.telegraaf.nl",
        "https://en.wikipedia.org/wiki/De_Telegraaf"
      ]
    },
    {
      "id": "nl-de-volkskrant",
      "countryCode": "NL",
      "name": "de Volkskrant",
      "nativeName": "de Volkskrant",
      "englishTranslation": "The People's Newspaper",
      "founded": 1919,
      "frequency": "Daily newspaper (Monday–Saturday) & digital portal",
      "format": "Compact & digital subscriber portal",
      "language": "Dutch",
      "headquarters": "Jacob Bontiusplaats, Amsterdam",
      "owner": {
        "name": "DPG Media",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Premier center-left broadsheet of record; prestigious cultural criticism, in-depth political investigations, environmental journalism, and European analytical essays",
      "readership": {
        "metric": "Over 240,000 paid print circulation and over 150,000 digital-only subscribers, widely read by academics and professionals",
        "source": "NOM Print & Digital Media Monitor 2023"
      },
      "revenueModel": "Print and digital paid subscriptions, and selective display advertising",
      "logo": "newspaper-logos/nl/de-volkskrant.svg",
      "logoExplainer": "Clean white background with refined black bold serif typography 'de Volkskrant', symbolising analytical depth and intellectual authority.",
      "sources": [
        "https://www.volkskrant.nl",
        "https://en.wikipedia.org/wiki/De_Volkskrant"
      ]
    },
    {
      "id": "nl-nrc",
      "countryCode": "NL",
      "name": "NRC",
      "nativeName": "NRC (Handelsblad)",
      "englishTranslation": "NRC (Commercial Gazette)",
      "founded": 1970,
      "frequency": "Daily afternoon & morning newspaper & digital portal",
      "format": "Compact & digital subscriber portal",
      "language": "Dutch",
      "headquarters": "Nes, Amsterdam",
      "owner": {
        "name": "Mediahuis Nederland",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Leading liberal-intellectual newspaper of record; renowned for rigorous fact-checking, international correspondence, financial markets, and cultural reviews",
      "readership": {
        "metric": "Over 190,000 paid circulation with one of Europe's highest digital subscription growth rates",
        "source": "Mediahuis Corporate Audit 2023"
      },
      "revenueModel": "Paid print/digital subscriptions and quality commercial advertising",
      "logo": "newspaper-logos/nl/nrc.svg",
      "logoExplainer": "Minimalist black rectangular field featuring stark white geometric serif capitals 'NRC', embodying journalistic elegance and independence.",
      "sources": [
        "https://www.nrc.nl",
        "https://en.wikipedia.org/wiki/NRC_Handelsblad"
      ]
    }
  ],
  "NO": [
    {
      "id": "no-aftenposten",
      "countryCode": "NO",
      "name": "Aftenposten",
      "nativeName": "Aftenposten",
      "englishTranslation": "The Evening Post",
      "founded": 1860,
      "frequency": "Daily newspaper (Monday–Sunday) & digital subscriber portal",
      "format": "Compact & digital portal",
      "language": "Norwegian (Bokmål)",
      "headquarters": "Akersgata, Oslo",
      "owner": {
        "name": "Schibsted Media",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Norway's newspaper of record and largest subscription daily; center-right editorial heritage, recognized for exhaustive political investigations, foreign reporting, cultural essays, and economic analysis",
      "readership": {
        "metric": "Over 250,000 paid subscribers across print and digital, reaching over 1.2 million readers daily",
        "source": "Mediebedriftenes Landsforening (MBL) 2023"
      },
      "revenueModel": "Paid digital subscriptions (Aftenposten+), print circulation, and display ads",
      "logo": "newspaper-logos/no/aftenposten.svg",
      "logoExplainer": "Classic black gothic masthead 'Aftenposten' on pure white background, reflecting Norway's most prestigious broadsheet tradition.",
      "sources": [
        "https://www.aftenposten.no",
        "https://en.wikipedia.org/wiki/Aftenposten"
      ]
    },
    {
      "id": "no-dagbladet",
      "countryCode": "NO",
      "name": "Dagbladet",
      "nativeName": "Dagbladet",
      "englishTranslation": "The Daily Paper",
      "founded": 1869,
      "frequency": "Daily newspaper & digital portal",
      "format": "Tabloid & digital video portal",
      "language": "Norwegian (Bokmål)",
      "headquarters": "Karvesvingen, Oslo",
      "owner": {
        "name": "Aller Media",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Liberal-progressive tabloid daily; historically aligned with the Venstre movement, renowned for investigative journalism (SKUP awards), political commentary, cultural controversy, and digital video",
      "readership": {
        "metric": "Over 1.4 million daily digital readers on dagbladet.no and strong digital subscriber base on Dagbladet Pluss",
        "source": "Mediebedriftenes Landsforening 2023"
      },
      "revenueModel": "Digital subscriptions (Dagbladet Pluss), single-copy print sales, and video ads",
      "logo": "newspaper-logos/no/dagbladet.svg",
      "logoExplainer": "Red and white circle emblem with distinctive lowercase 'd' alongside bold black serif text 'Dagbladet', symbolizing progressive Norwegian journalism.",
      "sources": [
        "https://www.dagbladet.no",
        "https://en.wikipedia.org/wiki/Dagbladet"
      ]
    },
    {
      "id": "no-vg",
      "countryCode": "NO",
      "name": "VG (Verdens Gang)",
      "nativeName": "Verdens Gang",
      "englishTranslation": "The Course of the World",
      "founded": 1945,
      "frequency": "Daily newspaper & continuous digital superportal",
      "format": "Tabloid & digital news portal",
      "language": "Norwegian (Bokmål)",
      "headquarters": "Akersgata, Oslo",
      "owner": {
        "name": "Schibsted Media",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Norway's largest commercial news website and former resistance newspaper founded after World War II; fast-paced investigative reporting, breaking news scoops, podcasts, and sports",
      "readership": {
        "metric": "Over 2 million daily digital readers on vg.no and over 280,000 paying digital subscribers (VG+)",
        "source": "MBL Opplagstall / Schibsted Annual Report 2023"
      },
      "revenueModel": "Digital paywall subscriptions (VG+), print sales, and digital advertising",
      "logo": "newspaper-logos/no/vg.svg",
      "logoExplainer": "Vibrant red square featuring bold white sans-serif letters 'VG', the undisputed symbol of Norwegian breaking news.",
      "sources": [
        "https://www.vg.no",
        "https://en.wikipedia.org/wiki/Verdens_Gang"
      ]
    }
  ],
  "NP": [
    {
      "id": "np-kantipur",
      "countryCode": "NP",
      "name": "Kantipur",
      "nativeName": "कान्तिपुर",
      "englishTranslation": "Kantipur (Kathmandu)",
      "founded": 1993,
      "frequency": "Daily newspaper (Monday–Sunday) & Kantipur TV",
      "format": "Broadsheet & digital superportal",
      "language": "Nepali",
      "headquarters": "Subidhanagar, Tinkune, Kathmandu",
      "owner": {
        "name": "Kantipur Media Group (KMG)",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Nepal's highest-circulation and most influential independent daily newspaper; recognized for championing constitutional democracy, federalism, human rights, and investigative anti-corruption reporting",
      "readership": {
        "metric": "Over 450,000 daily print circulation and leading news website ekantipur.com with over 4 million monthly active users",
        "source": "Nepal Press Council Audit 2023"
      },
      "revenueModel": "Print sales, corporate display advertising, and digital subscriptions",
      "logo": "newspaper-logos/np/kantipur.svg",
      "logoExplainer": "Deep royal blue banner with iconic white Devanagari calligraphy 'कान्तिपुर' (Kantipur) and red accent, symbolising Nepal's flagship daily press.",
      "sources": [
        "https://ekantipur.com",
        "https://en.wikipedia.org/wiki/Kantipur_(daily)"
      ]
    },
    {
      "id": "np-the-kathmandu-post",
      "countryCode": "NP",
      "name": "The Kathmandu Post",
      "founded": 1993,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Broadsheet & digital portal",
      "language": "English",
      "headquarters": "Subidhanagar, Tinkune, Kathmandu",
      "owner": {
        "name": "Kantipur Media Group (KMG)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Nepal's leading English-language broadsheet of record; in-depth diplomatic coverage, political investigations, climate change impacts on the Himalayas, and socioeconomic commentary",
      "readership": {
        "metric": "Over 90,000 daily print copies, widely read by diplomats, foreign policy researchers, tourism leaders, and expatriates",
        "source": "Kantipur Media Group Audience Statement 2023"
      },
      "revenueModel": "Print copy sales, corporate advertising, and digital subscriptions",
      "logo": "newspaper-logos/np/the-kathmandu-post.svg",
      "logoExplainer": "Clean white background featuring dignified dark navy serif typography 'The Kathmandu Post', representing English-language journalistic prestige in the Himalayas.",
      "sources": [
        "https://kathmandupost.com",
        "https://en.wikipedia.org/wiki/The_Kathmandu_Post"
      ]
    },
    {
      "id": "np-gorkhapatra",
      "countryCode": "NP",
      "name": "Gorkhapatra",
      "nativeName": "गोरखापत्र",
      "englishTranslation": "Gorkha Gazette",
      "founded": 1901,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Broadsheet & digital archive",
      "language": "Nepali (with supplements in 38 indigenous mother tongues)",
      "headquarters": "Dharmapath, New Road, Kathmandu",
      "owner": {
        "name": "Gorkhapatra Sansthan (Government Corporation)",
        "type": "State-owned public corporation"
      },
      "editorialStance": "Nepal's oldest active newspaper, founded in 1901 during the Rana era; historical newspaper of record, publishing government gazettes, legislative statutes, civil service notices, and multilingual pages in 38 national languages",
      "readership": {
        "metric": "Over 65,000 daily print copies distributed to government offices, schools, and post offices across all 77 districts",
        "source": "Gorkhapatra Sansthan Annual Report 2023"
      },
      "revenueModel": "State government institutional advertising, public tender notices, and print subscriptions",
      "logo": "newspaper-logos/np/gorkhapatra.svg",
      "logoExplainer": "Traditional crimson red banner with elegant gold Devanagari lettering 'गोरखापत्र' (Gorkhapatra), embodying over 120 years of Nepali newspaper history.",
      "sources": [
        "https://gorkhapatraonline.com",
        "https://en.wikipedia.org/wiki/Gorkhapatra"
      ]
    }
  ],
  "NR": [
    {
      "id": "nr-naoero-gazette",
      "countryCode": "NR",
      "name": "Naoero Gazette",
      "officialName": "Republic of Nauru Government Gazette",
      "englishTranslation": "Nauru Gazette",
      "founded": 1968,
      "frequency": "Weekly & extraordinary statutory editions",
      "format": "Official gazette & government record bulletin",
      "language": "English, Nauruan",
      "headquarters": "Yaren District",
      "owner": {
        "name": "Republic of Nauru",
        "type": "Government department / official state publisher"
      },
      "editorialStance": "Official public record; ministerial appointments, statutory notices, parliamentary enactments, and government regulations",
      "readership": {
        "metric": "Circulated throughout government ministries, courts, state corporations, and public libraries nationwide",
        "source": "Government Information Office of Nauru"
      },
      "revenueModel": "Fully public-funded state gazette",
      "logo": "newspaper-logos/nr/naoero-gazette.svg",
      "logoExplainer": "Official masthead displaying the national coat of arms of Nauru with traditional frigatebird and coconut palm crest.",
      "sources": [
        "https://www.naurugov.nr",
        "https://en.wikipedia.org/wiki/Nauru"
      ]
    },
    {
      "id": "nr-mwinen-ko",
      "countryCode": "NR",
      "name": "Mwinen Ko",
      "officialName": "Mwinen Ko Community Newsletter",
      "englishTranslation": "Let's Talk About It",
      "founded": 2010,
      "frequency": "Monthly community newspaper",
      "format": "Community print newsletter & digital PDF bulletin",
      "language": "Nauruan, English",
      "headquarters": "Aiwo / Yaren",
      "owner": {
        "name": "Nauru Community Media Association",
        "type": "Civic community non-profit"
      },
      "editorialStance": "Local community affairs, district sports, environmental awareness, phosphate rehabilitation, and youth stories",
      "readership": {
        "metric": "Read by households across all 14 districts of Nauru (population ~12,000)",
        "source": "Nauru Community Media Archive"
      },
      "revenueModel": "Community grants and local public announcements",
      "logo": "newspaper-logos/nr/mwinen-ko.svg",
      "logoExplainer": "Emerald green masthead featuring the 12-pointed Nauruan star, meaning 'Let's Talk About It' in the Nauruan language.",
      "sources": [
        "https://www.naurugov.nr",
        "https://en.wikipedia.org/wiki/Nauru"
      ]
    },
    {
      "id": "nr-nauru-chronicle",
      "countryCode": "NR",
      "name": "The Nauru Chronicle",
      "officialName": "The Nauru Chronicle",
      "founded": 2005,
      "frequency": "Fortnightly independent bulletin",
      "format": "Independent newsprint & digital bulletin",
      "language": "English, Nauruan",
      "headquarters": "Yaren District",
      "owner": {
        "name": "Pacific Voices Publishing",
        "type": "Independent civic publisher"
      },
      "editorialStance": "Civic discourse, Pacific regional affairs, environmental policy, and independent commentary",
      "readership": {
        "metric": "Distributed across Nauru and among the Pacific island diaspora in Australia and Fiji",
        "source": "Pacific Islands News Association (PINA)"
      },
      "revenueModel": "Community contributions and local sponsor notices",
      "logo": "newspaper-logos/nr/nauru-chronicle.svg",
      "logoExplainer": "Dignified classical serif headline with clean horizontal rules representing independent Pacific journalism.",
      "sources": [
        "https://www.pina.com.fj",
        "https://en.wikipedia.org/wiki/Media_of_Nauru"
      ]
    },
    {
      "id": "nr-central-star-news",
      "countryCode": "NR",
      "name": "Central Star News",
      "officialName": "Central Star News Bulletin",
      "founded": 2015,
      "frequency": "Fortnightly community bulletin",
      "format": "Community newsletter & social news bulletin",
      "language": "English, Nauruan",
      "headquarters": "Aiwo District",
      "owner": {
        "name": "Aiwo & Buada Community Council",
        "type": "District community council"
      },
      "editorialStance": "Local district news, civic events, school achievements, and sports leagues",
      "readership": {
        "metric": "Reaches community members in western and central districts of the island",
        "source": "Local Council Records"
      },
      "revenueModel": "Local council funding and community contributions",
      "logo": "newspaper-logos/nr/central-star-news.svg",
      "logoExplainer": "Deep blue and gold emblem with the 12-pointed Nauru star symbolising island unity and community news.",
      "sources": [
        "https://www.naurugov.nr",
        "https://en.wikipedia.org/wiki/Districts_of_Nauru"
      ]
    }
  ],
  "NZ": [
    {
      "id": "nz-the-new-zealand-herald",
      "countryCode": "NZ",
      "name": "The New Zealand Herald",
      "founded": 1863,
      "frequency": "Daily newspaper (Monday–Saturday) & continuous digital portal",
      "format": "Compact & digital news portal",
      "language": "English",
      "headquarters": "Central Park, Ellerslie, Auckland",
      "owner": {
        "name": "NZME (New Zealand Media and Entertainment)",
        "type": "Independent commercial media company"
      },
      "editorialStance": "New Zealand's highest-circulation daily newspaper and de facto national paper of record; comprehensive coverage of Beehive politics, corporate business, Pacific relations, and national rugby",
      "readership": {
        "metric": "Over 100,000 daily print circulation and nzherald.co.nz is New Zealand's top commercial news site with over 2.2 million monthly readers",
        "source": "Nielsen Media Research New Zealand 2023"
      },
      "revenueModel": "Print sales, NZ Herald Premium digital paywall subscriptions, and commercial advertising",
      "logo": "newspaper-logos/nz/the-new-zealand-herald.svg",
      "logoExplainer": "Deep navy blue background displaying the historic white gothic masthead 'The New Zealand Herald', symbolising over 160 years of national journalism.",
      "sources": [
        "https://www.nzherald.co.nz",
        "https://en.wikipedia.org/wiki/The_New_Zealand_Herald"
      ]
    },
    {
      "id": "nz-stuff",
      "countryCode": "NZ",
      "name": "Stuff",
      "founded": 2000,
      "frequency": "Continuous digital news service & publisher of regional daily papers",
      "format": "Digital news superportal & daily broadsheets",
      "language": "English, Māori",
      "headquarters": "Wellington",
      "owner": {
        "name": "Sinead Boucher (Management-owned independent)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Leading digital news platform and publisher of Wellington's The Post and Christchurch's The Press; focused on hard investigative journalism, public interest accountability, and climate reporting",
      "readership": {
        "metric": "Over 2.4 million unique monthly Kiwi digital readers across Stuff.co.nz, reaching more than half of New Zealand's population",
        "source": "Nielsen Online Ratings NZ 2023"
      },
      "revenueModel": "Digital advertising, voluntary reader contributions (Stuff Supporter), and print subscriptions",
      "logo": "newspaper-logos/nz/stuff.svg",
      "logoExplainer": "Vibrant solid green background featuring stark white rounded lowercase typography 'stuff', evoking modern digital agility.",
      "sources": [
        "https://www.stuff.co.nz",
        "https://en.wikipedia.org/wiki/Stuff_(website)"
      ]
    },
    {
      "id": "nz-otago-daily-times",
      "countryCode": "NZ",
      "name": "Otago Daily Times (ODT)",
      "founded": 1861,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Compact & digital portal",
      "language": "English",
      "headquarters": "Stuart Street, Dunedin",
      "owner": {
        "name": "Allied Press Ltd",
        "type": "Independent family-owned media"
      },
      "editorialStance": "New Zealand's oldest surviving independent daily newspaper; fiercely regional Southern voice providing in-depth scrutiny of South Island governance, agricultural trade, and conservation",
      "readership": {
        "metric": "Over 35,000 daily print copies distributed across Otago, Southland, and Canterbury, with a loyal regional subscriber base",
        "source": "Allied Press Circulation Audit 2023"
      },
      "revenueModel": "Print sales, regional classifieds, and digital subscriptions",
      "logo": "newspaper-logos/nz/otago-daily-times.svg",
      "logoExplainer": "Classic dark navy blue background featuring refined white serif typography 'Otago Daily Times', celebrating over 160 years of South Island publishing.",
      "sources": [
        "https://www.odt.co.nz",
        "https://en.wikipedia.org/wiki/Otago_Daily_Times"
      ]
    },
    {
      "id": "nz-nz-herald",
      "countryCode": "NZ",
      "name": "The New Zealand Herald",
      "founded": 1863,
      "frequency": "Daily morning broadsheet (Monday–Saturday)",
      "format": "Compact daily format & digital network (nzherald.co.nz)",
      "language": "English",
      "headquarters": "Auckland",
      "owner": {
        "name": "New Zealand Media and Entertainment (NZME)",
        "type": "Publicly traded media corporation"
      },
      "editorialStance": "New Zealand's national newspaper of record and highest-circulation daily; comprehensive coverage of Parliament in Wellington, Auckland business, All Blacks rugby, and South Pacific geopolitical affairs",
      "readership": {
        "metric": "Average daily print readership of 460,000 and over 2 million monthly digital unique users",
        "source": "Nielsen Media Research New Zealand"
      },
      "revenueModel": "Print circulation, NZ Herald Premium digital paywall, and commercial advertising",
      "logo": "newspaper-logos/nz/nz-herald.webp",
      "logoExplainer": "Classic black serif masthead featuring the distinctive New Zealand coat of arms and bold gothic-inspired lettering.",
      "sources": [
        "https://www.nzherald.co.nz",
        "https://en.wikipedia.org/wiki/The_New_Zealand_Herald"
      ]
    }
  ],
  "OM": [
    {
      "id": "om-omandaily",
      "countryCode": "OM",
      "name": "Oman Daily (Jaridat Oman)",
      "nativeName": "جريدة عمان",
      "englishTranslation": "Oman Newspaper",
      "founded": 1972,
      "frequency": "Daily morning newspaper (Monday–Sunday)",
      "format": "Broadsheet & digital edition",
      "language": "Arabic",
      "headquarters": "Madinat Al Ilam, Muscat",
      "owner": {
        "name": "Oman Press and Information Establishment",
        "type": "State-owned publishing corporation"
      },
      "editorialStance": "The official Arabic-language daily newspaper of record; chronicling Oman's modern renaissance, public administration, cultural heritage, and regional Arabian Gulf affairs",
      "readership": {
        "metric": "Highest circulation Arabic print daily in the Sultanate with over 45,000 copies distributed nationwide",
        "source": "Oman Establishment for Press 2023"
      },
      "revenueModel": "Print subscriptions, official gazette advertising, and retail sales",
      "logo": "newspaper-logos/om/oman-daily.svg",
      "logoExplainer": "Dignified dark green background adorned with golden Arabic calligraphy 'جريدة عمان' (Jaridat Oman), embodying half a century of national publishing.",
      "sources": [
        "https://www.omandaily.om"
      ]
    },
    {
      "id": "om-times-of-oman",
      "countryCode": "OM",
      "name": "Times of Oman",
      "founded": 1975,
      "frequency": "Daily newspaper & continuous digital portal",
      "format": "Compact & digital multimedia network",
      "language": "English",
      "headquarters": "Ruwi, Muscat",
      "owner": {
        "name": "Muscat Press & Publishing House (MPPH)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Oman's oldest independent English-language newspaper; fast-breaking business news, retail economy, Muscat municipality updates, expatriate community lifestyle, and sports",
      "readership": {
        "metric": "Over 40,000 daily print readership and over 1.5 million monthly unique digital visitors on timesofoman.com",
        "source": "Muscat Press & Publishing House Audit 2023"
      },
      "revenueModel": "Print sales, digital display advertising, and corporate sponsorships",
      "logo": "newspaper-logos/om/times-of-oman.svg",
      "logoExplainer": "Sleek navy blue field with bold white serif capitals 'TIMES OF OMAN' and red accent, representing private English-language press leadership.",
      "sources": [
        "https://timesofoman.com",
        "https://en.wikipedia.org/wiki/Times_of_Oman"
      ]
    },
    {
      "id": "om-oman-daily-observer",
      "countryCode": "OM",
      "name": "Oman Daily Observer",
      "founded": 1981,
      "frequency": "Daily morning newspaper (Monday–Sunday)",
      "format": "Broadsheet & digital portal",
      "language": "English",
      "headquarters": "Madinat Al Ilam, Muscat",
      "owner": {
        "name": "Oman Press and Information Establishment (Ministry of Information)",
        "type": "State-owned publishing corporation"
      },
      "editorialStance": "The Sultanate's premier English-language newspaper of record; comprehensive coverage of government legislation, green hydrogen mega-projects, logistics, maritime shipping, and tourism",
      "readership": {
        "metric": "Over 35,000 daily print circulation, read extensively by corporate leaders, expatriate professionals, and foreign diplomats",
        "source": "Oman Establishment for Press, Publication and Advertising 2023"
      },
      "revenueModel": "Print sales, corporate advertising, and public notice announcements",
      "logo": "newspaper-logos/om/oman-daily-observer.svg",
      "logoExplainer": "Deep burgundy red background featuring stately white serif typography 'Oman Observer' with gold accent line, signifying authoritative national broadsheet status.",
      "sources": [
        "https://www.omanobserver.om",
        "https://en.wikipedia.org/wiki/Oman_Daily_Observer"
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
      "logoExplainer": "Vibrant royal blue background with bright orange and white Arabic script 'الشبيبة' (Al Shabiba), signifying energy and youth engagement.",
      "sources": [
        "https://www.shabiba.com",
        "https://en.wikipedia.org/wiki/Al-Shabiba"
      ]
    }
  ],
  "PA": [
    {
      "id": "pa-la-estrella-de-panama",
      "countryCode": "PA",
      "name": "La Estrella de Panamá",
      "founded": 1849,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Broadsheet & digital portal",
      "language": "Spanish",
      "headquarters": "Panama City",
      "owner": {
        "name": "Grupo Editorial El Siglo & La Estrella (GESE)",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Panama's oldest surviving newspaper, founded during the California Gold Rush in 1849; dignified historical newspaper of record covering national sovereignty, Canal expansion, and international trade",
      "readership": {
        "metric": "Over 20,000 daily print circulation, widely consulted by civil servants, diplomats, shipping agents, and academics",
        "source": "GESE Corporate Profile 2023"
      },
      "revenueModel": "Print sales, legal notices, and commercial display advertising",
      "logo": "newspaper-logos/pa/la-estrella-de-panama.svg",
      "logoExplainer": "Deep crimson red background with gleaming gold star emblem and refined serif typography 'La Estrella de Panamá', reflecting 175 years of press history.",
      "sources": [
        "https://www.laestrella.com.pa",
        "https://es.wikipedia.org/wiki/La_Estrella_de_Panam%C3%A1"
      ]
    },
    {
      "id": "pa-panama-america",
      "countryCode": "PA",
      "name": "Panamá América",
      "founded": 1925,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Compact & digital portal",
      "language": "Spanish",
      "headquarters": "Vía Ricardo J. Alfaro, Panama City",
      "owner": {
        "name": "Grupo Epasa (Editorial Panameña de América)",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Major high-circulation commercial daily newspaper; center-right editorial tradition focusing on business development, banking regulations, infrastructure projects, and national sports",
      "readership": {
        "metric": "Over 25,000 print daily copies and leading commercial news traffic on panamaamerica.com.pa",
        "source": "Grupo Epasa Audience Audit 2023"
      },
      "revenueModel": "Print copy sales, classifieds, and digital display advertising",
      "logo": "newspaper-logos/pa/panama-america.svg",
      "logoExplainer": "Vibrant royal blue rectangular field emblazoned with stark white modern sans-serif typography 'PANAMÁ AMÉRICA'.",
      "sources": [
        "https://www.panamaamerica.com.pa",
        "https://es.wikipedia.org/wiki/El_Panam%C3%A1_Am%C3%A9rica"
      ]
    },
    {
      "id": "pa-la-prensa",
      "countryCode": "PA",
      "name": "La Prensa",
      "founded": 1980,
      "frequency": "Daily newspaper (Monday–Sunday) & continuous digital portal",
      "format": "Compact & digital subscriber portal",
      "language": "Spanish",
      "headquarters": "Avenida 12 de Octubre, Panama City",
      "owner": {
        "name": "Corporación La Prensa, S.A. (Corprensa)",
        "type": "Citizen shareholder media corporation"
      },
      "editorialStance": "Panama's primary newspaper of record; founded by civilian leaders to resist military dictatorship, renowned for fearless investigations into money laundering, Panama Canal administration, and political bribes (Odebrecht)",
      "readership": {
        "metric": "Over 35,000 daily print circulation and prensa.com is the most trusted digital news portal in Panama with over 4 million monthly readers",
        "source": "Corprensa Audited Financial Statements 2023"
      },
      "revenueModel": "Print sales, digital paywall subscriptions (Prensa Digital), and display advertising",
      "logo": "newspaper-logos/pa/la-prensa.svg",
      "logoExplainer": "Clean white background with iconic dark navy blue serif lettering 'LA PRENSA' and blue accent, symbolising independent democratic watchdog journalism.",
      "sources": [
        "https://www.prensa.com",
        "https://es.wikipedia.org/wiki/La_Prensa_(Panam%C3%A1)"
      ]
    }
  ],
  "PE": [
    {
      "id": "pe-el-comercio",
      "countryCode": "PE",
      "name": "El Comercio",
      "founded": 1839,
      "frequency": "Daily morning newspaper (Monday–Sunday) & Canal N",
      "format": "Broadsheet, cable news (Canal N) & digital subscriber portal",
      "language": "Spanish",
      "headquarters": "Jirón Miró Quesada, Historic Centre, Lima",
      "owner": {
        "name": "Empresa Editora El Comercio S.A. (Miró Quesada Family)",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Peru's century-and-a-half-old newspaper of record and one of the oldest in the Spanish-speaking world; center-right conservative flagship renowned for thorough political investigations, judicial coverage, and macroeconomic analysis",
      "readership": {
        "metric": "Over 90,000 paid daily print copies and elcomercio.pe is Peru's leading digital news site with over 22 million monthly readers",
        "source": "Audit Bureau of Circulations Latin America / Comscore 2023"
      },
      "revenueModel": "Print circulation, digital paywall subscriptions (El Comercio+), and display advertising",
      "logo": "newspaper-logos/pe/el-comercio.svg",
      "logoExplainer": "Classic black gothic masthead 'El Comercio' on clean white background, evoking nearly two centuries of Peruvian newspaper leadership.",
      "sources": [
        "https://elcomercio.pe",
        "https://es.wikipedia.org/wiki/El_Comercio_(Per%C3%BA)"
      ]
    },
    {
      "id": "pe-la-republica",
      "countryCode": "PE",
      "name": "La República",
      "founded": 1981,
      "frequency": "Daily morning newspaper (Monday–Sunday) & digital portal",
      "format": "Compact & digital news superportal",
      "language": "Spanish, Quechua",
      "headquarters": "Jirón Camaná, Lima",
      "owner": {
        "name": "Grupo La República Publicaciones S.A. (Mohme Family)",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Premier center-left progressive daily newspaper; famous for uncovering the 'Vladivideos' corruption scandal that toppled the Fujimori regime, championing human rights, indigenous empowerment, and democratic accountability",
      "readership": {
        "metric": "Over 70,000 daily print circulation and larepublica.pe ranks consistently among the top two most visited news websites in Peru",
        "source": "Kantar IBOPE Media Peru 2023"
      },
      "revenueModel": "Print sales, digital programmatic advertising, and video sponsorships",
      "logo": "newspaper-logos/pe/la-republica.svg",
      "logoExplainer": "Vivid scarlet red background displaying crisp white condensed serif capital letters 'LA REPÚBLICA', denoting fearless democratic journalism.",
      "sources": [
        "https://larepublica.pe",
        "https://es.wikipedia.org/wiki/La_Rep%C3%BAblica_(Per%C3%BA)"
      ]
    },
    {
      "id": "pe-gestion",
      "countryCode": "PE",
      "name": "Gestión",
      "founded": 1990,
      "frequency": "Daily financial newspaper (Monday–Friday)",
      "format": "Broadsheet & financial digital portal",
      "language": "Spanish",
      "headquarters": "Lima",
      "owner": {
        "name": "Empresa Editora El Comercio S.A.",
        "type": "Independent commercial media"
      },
      "editorialStance": "Peru's leading financial and business daily newspaper; comprehensive coverage of the Lima Stock Exchange (BVL), copper and gold mining markets, foreign direct investment, taxation, and corporate mergers",
      "readership": {
        "metric": "Over 30,000 daily print readership, essential morning reading for corporate executives, bankers, and government economic ministers",
        "source": "Grupo El Comercio Financial Publishing 2023"
      },
      "revenueModel": "Paid enterprise subscriptions, financial market advertising, and corporate events",
      "logo": "newspaper-logos/pe/gestion.svg",
      "logoExplainer": "Deep corporate navy blue field with bold white typography 'GESTIÓN' and golden accent line, symbolising financial market intelligence.",
      "sources": [
        "https://gestion.pe",
        "https://es.wikipedia.org/wiki/Gesti%C3%B3n_(diario)"
      ]
    }
  ],
  "PG": [
    {
      "id": "pg-post-courier",
      "countryCode": "PG",
      "name": "Post-Courier",
      "founded": 1969,
      "frequency": "Daily morning newspaper (Monday–Friday)",
      "format": "Tabloid & digital edition",
      "language": "English",
      "headquarters": "Lawes Road, Konedobu, Port Moresby",
      "owner": {
        "name": "South Pacific Post Pty Ltd (News Corp subsidiary)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Papua New Guinea's oldest and largest daily newspaper; authoritative national paper of record covering National Parliament debates, mining and LNG developments, tribal governance, and Pacific Island diplomacy",
      "readership": {
        "metric": "Largest daily circulation in PNG with over 28,000 print copies distributed by air to all 22 provinces",
        "source": "South Pacific Post Circulation Audit 2023"
      },
      "revenueModel": "Print sales, corporate display advertising, and public notice tenders",
      "logo": "newspaper-logos/pg/post-courier.svg",
      "logoExplainer": "Deep red background displaying bold white modern serif title 'Post-Courier', symbolising over half a century of national reporting.",
      "sources": [
        "https://postcourier.com.pg",
        "https://en.wikipedia.org/wiki/Papua_New_Guinea_Post-Courier"
      ]
    },
    {
      "id": "pg-wantok-niuspepa",
      "countryCode": "PG",
      "name": "Wantok Niuspepa",
      "nativeName": "Wantok",
      "englishTranslation": "One Talk / Compatriot Newspaper",
      "founded": 1970,
      "frequency": "Weekly newspaper (Thursdays)",
      "format": "Tabloid",
      "language": "Tok Pisin",
      "headquarters": "Gordons, Port Moresby",
      "owner": {
        "name": "Word Publishing Company (Mainline Christian Churches)",
        "type": "Ecumenical community media"
      },
      "editorialStance": "The world's only commercial newspaper published entirely in Tok Pisin; grassroots advocacy, rural community health, literacy education, cultural preservation, and peaceful dispute resolution",
      "readership": {
        "metric": "Read by over 60,000 rural and peri-urban readers throughout church parishes, community clinics, and schools nationwide",
        "source": "Word Publishing Circulation Review 2023"
      },
      "revenueModel": "Print sales, community church distribution, and educational subscriptions",
      "logo": "newspaper-logos/pg/wantok-niuspepa.svg",
      "logoExplainer": "Forest green background displaying traditional tribal kundu drum motif and white Tok Pisin typography 'WANTOK NIUSPEPA'.",
      "sources": [
        "https://en.wikipedia.org/wiki/Wantok_(newspaper)"
      ]
    },
    {
      "id": "pg-the-national",
      "countryCode": "PG",
      "name": "The National",
      "founded": 1993,
      "frequency": "Daily morning newspaper (Monday–Friday)",
      "format": "Tabloid & digital portal",
      "language": "English",
      "headquarters": "Gordons, Port Moresby",
      "owner": {
        "name": "Pacific Star Limited (Rimbunan Hijau Group)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Major national daily newspaper; extensive coverage of provincial economic growth, agricultural coffee/cocoa exports, rural infrastructure, education, and rugby league",
      "readership": {
        "metric": "Over 25,000 daily print circulation with widespread distribution in the Highlands and Momase regions",
        "source": "Pacific Star Limited Annual Review 2023"
      },
      "revenueModel": "Print copy sales, mining/petroleum industry advertising, and classifieds",
      "logo": "newspaper-logos/pg/the-national.svg",
      "logoExplainer": "Vibrant yellow-gold rectangular field with stark black and red bold typography 'The National', capturing Papua New Guinean enterprise.",
      "sources": [
        "https://www.thenational.com.pg",
        "https://en.wikipedia.org/wiki/The_National_(Papua_New_Guinea)"
      ]
    }
  ],
  "PH": [
    {
      "id": "ph-manila-bulletin",
      "countryCode": "PH",
      "name": "Manila Bulletin",
      "founded": 1900,
      "frequency": "Daily morning newspaper (Monday–Sunday) & digital portal",
      "format": "Broadsheet & digital portal",
      "language": "English",
      "headquarters": "Muralla corner Recoletos St., Intramuros, Manila",
      "owner": {
        "name": "Manila Bulletin Publishing Corporation (Yap Family)",
        "type": "Publicly listed media corporation"
      },
      "editorialStance": "The nation's oldest surviving daily newspaper, founded in 1900; traditionally known as the 'Exponent of Philippine Progress', focusing on economic stability, government policies, shipping, and community lifestyle",
      "readership": {
        "metric": "Over 200,000 daily print circulation, widely circulated in government offices, schools, and business libraries nationwide",
        "source": "Manila Bulletin Publishing Corp Annual Report 2023"
      },
      "revenueModel": "Print sales, classifieds, digital advertising, and corporate announcements",
      "logo": "newspaper-logos/ph/manila-bulletin.svg",
      "logoExplainer": "Traditional black Old English masthead 'MANILA BULLETIN' on pure white background, reflecting over 120 years of continuous publishing in Intramuros.",
      "sources": [
        "https://mb.com.ph",
        "https://en.wikipedia.org/wiki/Manila_Bulletin"
      ]
    },
    {
      "id": "ph-philippine-daily-inquirer",
      "countryCode": "PH",
      "name": "Philippine Daily Inquirer",
      "founded": 1985,
      "frequency": "Daily morning newspaper (Monday–Sunday) & continuous digital portal",
      "format": "Broadsheet & digital news portal",
      "language": "English",
      "headquarters": "Chino Roces Avenue, Makati, Metro Manila",
      "owner": {
        "name": "Inquirer Holdings, Inc. (Prieto Family)",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Founded during the twilight of the Marcos martial law era to champion press freedom; the Philippines' premier broadsheet of record, famous for hard-hitting investigative journalism, exposing corruption, and political accountability",
      "readership": {
        "metric": "Over 250,000 daily print circulation and inquirer.net is one of the most visited English news portals in Southeast Asia with over 30 million monthly page views",
        "source": "United Print Media Group (UPMG) / Similarweb 2023"
      },
      "revenueModel": "Print sales, digital subscriptions (Inquirer Plus), and corporate display advertising",
      "logo": "newspaper-logos/ph/philippine-daily-inquirer.svg",
      "logoExplainer": "Classic black gothic masthead 'PHILIPPINE DAILY INQUIRER' on clean white background with signature red underline, symbolizing courageous press freedom.",
      "sources": [
        "https://www.inquirer.net",
        "https://en.wikipedia.org/wiki/Philippine_Daily_Inquirer"
      ]
    },
    {
      "id": "ph-rappler",
      "countryCode": "PH",
      "name": "Rappler",
      "founded": 2012,
      "frequency": "Continuous digital investigative news service",
      "format": "Pure digital news portal, mobile app & investigative multimedia",
      "language": "English, Filipino",
      "headquarters": "Pasig, Metro Manila",
      "owner": {
        "name": "Rappler Holdings Corporation (Maria Ressa)",
        "type": "Independent digital investigative media"
      },
      "editorialStance": "Nobel Peace Prize-winning digital newsroom led by Maria Ressa; internationally acclaimed for groundbreaking investigations into state disinformation networks, social media weaponization, extrajudicial killings, and democratic defense",
      "readership": {
        "metric": "Over 8 million monthly unique digital visitors and globally recognized pioneer in digital journalism ethics",
        "source": "Reuters Institute Digital News Report 2023"
      },
      "revenueModel": "Reader crowdfunding (Rappler+), digital display ads, investigative grants, and civic data projects",
      "logo": "newspaper-logos/ph/rappler.svg",
      "logoExplainer": "Dark slate background featuring bright orange circular emblem and crisp white lowercase typography 'rappler', symbolising courageous digital truth-telling.",
      "sources": [
        "https://www.rappler.com",
        "https://en.wikipedia.org/wiki/Rappler"
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
      "logoExplainer": "Deep navy blue background displaying commanding white serif capitals 'THE PHILIPPINE STAR' with gold starburst accent, embodying national broadsheet prestige.",
      "sources": [
        "https://www.philstar.com",
        "https://en.wikipedia.org/wiki/The_Philippine_Star"
      ]
    }
  ],
  "PK": [
    {
      "id": "pk-daily-jang",
      "countryCode": "PK",
      "name": "Daily Jang",
      "nativeName": "روزنامہ جنگ",
      "englishTranslation": "Daily War (Struggle for Independence)",
      "founded": 1939,
      "frequency": "Daily morning newspaper (Monday–Sunday) & Geo TV",
      "format": "Broadsheet, satellite TV (Geo News) & digital superportal",
      "language": "Urdu",
      "headquarters": "I.I. Chundrigar Road, Karachi",
      "owner": {
        "name": "Jang Media Group",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Pakistan's largest and oldest Urdu-language daily newspaper; populist, massive national reach, comprehensive coverage of domestic politics, Islamic affairs, cricket, and community news",
      "readership": {
        "metric": "Highest circulation newspaper in Pakistan with over 800,000 print copies distributed daily across Karachi, Lahore, Rawalpindi, and Quetta",
        "source": "Audit Bureau of Circulation (ABC) Pakistan 2023"
      },
      "revenueModel": "Print sales, high-volume classifieds, commercial advertising, and TV revenues",
      "logo": "newspaper-logos/pk/daily-jang.svg",
      "logoExplainer": "Vibrant red and green field featuring distinctive Nastaliq Urdu calligraphy 'روزنامہ جنگ' (Daily Jang), the voice of the Urdu-reading majority.",
      "sources": [
        "https://jang.com.pk",
        "https://en.wikipedia.org/wiki/Daily_Jang"
      ]
    },
    {
      "id": "pk-dawn",
      "countryCode": "PK",
      "name": "Dawn",
      "founded": 1941,
      "frequency": "Daily morning newspaper (Monday–Sunday) & DawnNews TV",
      "format": "Broadsheet, cable news TV & digital news superportal",
      "language": "English",
      "headquarters": "Haroon House, Dr. Ziauddin Ahmed Road, Karachi",
      "owner": {
        "name": "Pakistan Herald Publications Limited (PHPL)",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Founded by Pakistan's father of the nation Muhammad Ali Jinnah; the country's most respected broadsheet of record, renowned for courageous investigative journalism, editorial independence, defense of civil liberties, and secular democratic values",
      "readership": {
        "metric": "Over 120,000 daily print circulation and dawn.com is Pakistan's most read English digital news site with over 15 million monthly readers",
        "source": "All Pakistan Newspapers Society (APNS) / Comscore 2023"
      },
      "revenueModel": "Print sales, corporate display advertising, and digital sponsorships",
      "logo": "newspaper-logos/pk/dawn.svg",
      "logoExplainer": "Iconic stark black serif masthead 'DAWN' on pure white background, reflecting over eight decades of uncompromising journalistic integrity.",
      "sources": [
        "https://www.dawn.com",
        "https://en.wikipedia.org/wiki/Dawn_(newspaper)"
      ]
    },
    {
      "id": "pk-the-news-international",
      "countryCode": "PK",
      "name": "The News International",
      "founded": 1991,
      "frequency": "Daily morning newspaper (Monday–Sunday)",
      "format": "Broadsheet & digital news portal",
      "language": "English",
      "headquarters": "Karachi, Lahore, Islamabad",
      "owner": {
        "name": "Jang Media Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Leading English-language daily newspaper; known for hard-hitting investigative reports (Fact Check), macroeconomic analysis, judicial coverage, and in-depth political op-eds",
      "readership": {
        "metric": "Over 80,000 daily print copies and over 8 million monthly digital readers on thenews.com.pk",
        "source": "APNS Circulation Statement 2023"
      },
      "revenueModel": "Print sales, institutional subscriptions, and commercial advertising",
      "logo": "newspaper-logos/pk/the-news-international.svg",
      "logoExplainer": "Deep navy blue background displaying bold white serif title 'THE NEWS' with international red globe accent.",
      "sources": [
        "https://www.thenews.com.pk",
        "https://en.wikipedia.org/wiki/The_News_International"
      ]
    },
    {
      "id": "pk-the-express-tribune",
      "countryCode": "PK",
      "name": "The Express Tribune",
      "founded": 2010,
      "frequency": "Daily morning newspaper (Monday–Sunday)",
      "format": "Broadsheet & digital news portal (in partnership with International New York Times)",
      "language": "English",
      "headquarters": "Karachi",
      "owner": {
        "name": "Century Publications (Lakson Group)",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Progressive, liberal English daily; pioneering digital-first design in Pakistan, focusing on human rights, minority protections, climate resilience, and startup business innovations",
      "readership": {
        "metric": "Over 45,000 print daily circulation and over 6 million monthly unique digital visitors",
        "source": "Lakson Media Group Audience Profile 2023"
      },
      "revenueModel": "Print sales, international syndication, and digital programmatic advertising",
      "logo": "newspaper-logos/pk/the-express-tribune.svg",
      "logoExplainer": "Clean white background featuring crimson red and black modern sans-serif typography 'THE EXPRESS TRIBUNE', symbolising progressive Pakistani journalism.",
      "sources": [
        "https://tribune.com.pk",
        "https://en.wikipedia.org/wiki/The_Express_Tribune"
      ]
    }
  ],
  "PL": [
    {
      "id": "pl-wyborcza",
      "countryCode": "PL",
      "name": "Gazeta Wyborcza",
      "nativeName": "Gazeta Wyborcza",
      "englishTranslation": "Electoral Newspaper",
      "founded": 1989,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Broadsheet & digital news portal (Wyborcza.pl)",
      "language": "Polish",
      "headquarters": "ul. Czerska 8/10, Warsaw",
      "owner": {
        "name": "Agora S.A. (independent public media conglomerate)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic daily newspaper founded in 1989 as the independent voice of the Solidarity movement led by Lech Wałęsa and Adam Michnik; renowned for investigative journalism, defense of constitutional civil liberties, pro-European integration, and judicial independence",
      "readership": {
        "metric": "Over 300,000 digital digital subscribers and over 50,000 daily print readership, making it one of the leading digital subscription newspapers in Central Europe",
        "source": "Polskie Badania Czytelnictwa & Agora Q4 2023 Report"
      },
      "revenueModel": "Digital paywall subscriptions, print sales, and advertising",
      "logo": "newspaper-logos/pl/wyborcza.svg",
      "logoExplainer": "Clean modern black lowercase serif wordmark 'wyborcza' paired with a red dot accent and bold red '.pl' digital domain mark.",
      "sources": [
        "https://wyborcza.pl",
        "https://en.wikipedia.org/wiki/Gazeta_Wyborcza"
      ]
    },
    {
      "id": "pl-rzeczpospolita",
      "countryCode": "PL",
      "name": "Rzeczpospolita",
      "nativeName": "Rzeczpospolita",
      "englishTranslation": "Republic / Commonwealth",
      "founded": 1920,
      "frequency": "Daily economic and political broadsheet (Monday–Saturday)",
      "format": "Broadsheet & digital news portal (rp.pl)",
      "language": "Polish",
      "headquarters": "ul. Prosta 51, Warsaw",
      "owner": {
        "name": "Gremi Media S.A. (Pluralis B.V. consortium)",
        "type": "Independent media enterprise"
      },
      "editorialStance": "Poland's foremost center-right, legal, business and political daily newspaper of record; highly regarded among entrepreneurs, lawyers, economists, and diplomats for in-depth tax and legal analyses and unbiased political commentary",
      "readership": {
        "metric": "Over 120,000 daily multiplatform business and legal readers, with over 35,000 active digital paid business subscribers",
        "source": "Polskie Badania Czytelnictwa 2023"
      },
      "revenueModel": "Corporate subscriptions, print sales, and high-tier display advertising",
      "logo": "newspaper-logos/pl/rzeczpospolita.svg",
      "logoExplainer": "Deep navy blue rectangular field featuring regal white serif capitals 'RZECZPOSPOLITA' underlined by an elegant golden accent rule.",
      "sources": [
        "https://www.rp.pl",
        "https://en.wikipedia.org/wiki/Rzeczpospolita_(newspaper)"
      ]
    },
    {
      "id": "pl-dgp",
      "countryCode": "PL",
      "name": "Dziennik Gazeta Prawna (DGP)",
      "nativeName": "Dziennik Gazeta Prawna",
      "englishTranslation": "Legal Daily Newspaper",
      "founded": 2009,
      "frequency": "Daily business and legal newspaper (Monday–Friday)",
      "format": "Berliner format & digital news portal (gazetaprawna.pl)",
      "language": "Polish",
      "headquarters": "ul. Okopowa 58/72, Warsaw",
      "owner": {
        "name": "Infor PL S.A.",
        "type": "Commercial legal & financial publisher"
      },
      "editorialStance": "Poland's leading daily newspaper dedicated to business taxation, labor law, accounting, public procurement, and economic regulation; essential reading for Polish CFOs, accountants, and public administrative bodies",
      "readership": {
        "metric": "Over 35,000 daily print and digital corporate subscriptions nationwide with 4 million monthly visits on gazetaprawna.pl",
        "source": "Infor PL 2023 Annual Report"
      },
      "revenueModel": "Professional corporate subscriptions and advertising",
      "logo": "newspaper-logos/pl/dgp.svg",
      "logoExplainer": "Carmine red rectangular emblem featuring bold white acronym 'DGP' above crisp subtitle 'DZIENNIK GAZETA PRAWNA'.",
      "sources": [
        "https://www.gazetaprawna.pl",
        "https://en.wikipedia.org/wiki/Dziennik_Gazeta_Prawna"
      ]
    },
    {
      "id": "pl-fakt",
      "countryCode": "PL",
      "name": "Fakt",
      "nativeName": "Fakt Gazeta Codzienna",
      "englishTranslation": "Fact Daily Newspaper",
      "founded": 2003,
      "frequency": "Daily national tabloid newspaper (Monday–Saturday)",
      "format": "Tabloid & digital news portal (fakt.pl)",
      "language": "Polish",
      "headquarters": "ul. Domaniewska 49, Warsaw",
      "owner": {
        "name": "Ringier Axel Springer Polska",
        "type": "Commercial joint-venture publishing company"
      },
      "editorialStance": "Poland's largest circulation daily tabloid newspaper; focuses on popular consumer advocacy, social welfare, domestic politics, celebrity news, and sensational headlines in an accessible, dynamic tabloid format",
      "readership": {
        "metric": "Over 120,000 daily print copies sold and more than 10 million monthly active unique users on fakt.pl",
        "source": "Polskie Badania Czytelnictwa 2023"
      },
      "revenueModel": "High-volume retail print sales and programmatic digital advertising",
      "logo": "newspaper-logos/pl/fakt.svg",
      "logoExplainer": "High-impact crimson red field with prominent bold italicized white block typography 'FAKT'.",
      "sources": [
        "https://www.fakt.pl",
        "https://en.wikipedia.org/wiki/Fakt"
      ]
    }
  ],
  "PS": [
    {
      "id": "ps-al-ayyam",
      "countryCode": "PS",
      "name": "Al-Ayyam",
      "nativeName": "صحيفة الأيام",
      "englishTranslation": "The Days",
      "founded": 1995,
      "frequency": "Daily morning newspaper",
      "format": "Broadsheet newspaper & digital edition (al-ayyam.ps)",
      "language": "Arabic",
      "headquarters": "Al-Ayyam Building, Al-Masyoun, Ramallah, West Bank",
      "owner": {
        "name": "Al-Ayyam Publishing and Press Corporation (Akram Haniyya)",
        "type": "Independent commercial publishing enterprise"
      },
      "editorialStance": "Leading Palestinian independent daily newspaper of record, founded in Ramallah in 1995 by writer and political analyst Akram Haniyya; celebrated for comprehensive political commentary, parliamentary debates, legal analysis, and cultural essays",
      "readership": {
        "metric": "Print circulation of approximately 30,000 copies daily throughout Ramallah, Nablus, Bethlehem, and Hebron, and over 1.5 million monthly digital readers",
        "source": "Palestinian Journalists Syndicate (PJS) Survey"
      },
      "revenueModel": "Print newsstand sales, corporate commercial advertising, and digital subscriptions",
      "logo": "newspaper-logos/ps/al-ayyam.svg",
      "logoExplainer": "White field with green rectangular frame, emerald green Arabic calligraphy 'الأيام • AL-AYYAM', and crimson red national daily subtitle.",
      "sources": [
        "https://www.al-ayyam.ps",
        "https://en.wikipedia.org/wiki/Al-Ayyam_(Palestine)"
      ]
    },
    {
      "id": "ps-al-quds",
      "countryCode": "PS",
      "name": "Al-Quds",
      "nativeName": "صحيفة القدس",
      "englishTranslation": "Jerusalem Daily Newspaper",
      "founded": 1951,
      "frequency": "Daily morning newspaper",
      "format": "Broadsheet newspaper & web portal (alquds.com)",
      "language": "Arabic, English",
      "headquarters": "Abu Dis / East Jerusalem",
      "owner": {
        "name": "Al-Quds Press and Publishing Company (Abu Zuluf Family)",
        "type": "Independent family-owned newspaper publishing enterprise"
      },
      "editorialStance": "Oldest and most widely read Palestinian daily newspaper, established in Jerusalem in 1951 through the merger of Al-Difaa and Al-Jihad by Mahmoud Abu Zuluf; provides essential coverage of Jerusalem municipal affairs, religious holy sites (Al-Aqsa), peace diplomacy, and business",
      "readership": {
        "metric": "Circulation of over 45,000 copies daily across East Jerusalem, the West Bank, and the Palestinian diaspora in Jordan and the Gulf",
        "source": "PJS Audit / Al-Quds Commercial Kit"
      },
      "revenueModel": "Newsstand retail sales, commercial display advertisements, and classifieds",
      "logo": "newspaper-logos/ps/al-quds.jpg",
      "logoExplainer": "Solid dark charcoal field with ornate white Arabic calligraphy 'صحيفة القدس', golden divider line, and gold Jerusalem 1951 subtitle.",
      "sources": [
        "https://www.alquds.com",
        "https://en.wikipedia.org/wiki/Al-Quds_(newspaper)"
      ]
    }
  ],
  "PT": [
    {
      "id": "pt-publico",
      "countryCode": "PT",
      "name": "Público",
      "nativeName": "Público",
      "englishTranslation": "Public",
      "founded": 1990,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Berliner & digital news portal (publico.pt)",
      "language": "Portuguese",
      "headquarters": "Edifício Diogo Cão, Doca de Alcântara, Lisbon",
      "owner": {
        "name": "Sonaecom (Sonae Group)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Portugal's premier newspaper of reference; center-left, liberal, pro-European stance renowned for in-depth investigative reporting, culture, scientific coverage, and opinion pieces by leading Portuguese intellectuals",
      "readership": {
        "metric": "Over 50,000 digital subscribers and over 20,000 print circulation with more than 4 million monthly digital unique visitors",
        "source": "APCT & Reuters Institute Digital News Report 2024"
      },
      "revenueModel": "Digital subscriptions, newsstand sales, and premium advertising",
      "logo": "newspaper-logos/pt/publico.svg",
      "logoExplainer": "Dark graphite background with warm orange square badge enclosing a white serif 'P' beside bold white title 'PÚBLICO'.",
      "sources": [
        "https://www.publico.pt",
        "https://en.wikipedia.org/wiki/P%C3%BAblico_(Portugal)"
      ]
    },
    {
      "id": "pt-diario-de-noticias",
      "countryCode": "PT",
      "name": "Diário de Notícias (DN)",
      "nativeName": "Diário de Notícias",
      "englishTranslation": "Daily News",
      "founded": 1864,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Compact broadsheet & digital news portal (dn.pt)",
      "language": "Portuguese",
      "headquarters": "Torres de Lisboa, Lisbon",
      "owner": {
        "name": "Global Media Group / Notícias Ilimitadas",
        "type": "Independent commercial publisher"
      },
      "editorialStance": "Historic daily newspaper founded in 1864 by Eduardo Coelho; Portugal's longest-running continuous daily; respected for comprehensive political coverage of the Assembly of the Republic, diplomacy, and European affairs",
      "readership": {
        "metric": "Over 15,000 daily print and digital circulation with over 3 million monthly online readers",
        "source": "APCT Portugal 2023"
      },
      "revenueModel": "Circulation sales, digital subscriptions, and display advertising",
      "logo": "newspaper-logos/pt/diario-de-noticias.svg",
      "logoExplainer": "Classic marine blue rectangular frame displaying refined white serif capitals 'DIÁRIO DE NOTÍCIAS' with heritage date 'Desde 1864'.",
      "sources": [
        "https://www.dn.pt",
        "https://en.wikipedia.org/wiki/Di%C3%A1rio_de_Not%C3%ADcias_(Portugal)"
      ]
    },
    {
      "id": "pt-jornal-de-noticias",
      "countryCode": "PT",
      "name": "Jornal de Notícias (JN)",
      "nativeName": "Jornal de Notícias",
      "englishTranslation": "Journal of News",
      "founded": 1888,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Compact & digital news portal (jn.pt)",
      "language": "Portuguese",
      "headquarters": "Rua de Gonçalo Cristóvão, Porto",
      "owner": {
        "name": "Global Media Group / Notícias Ilimitadas",
        "type": "Independent commercial publisher"
      },
      "editorialStance": "Portugal's leading national daily newspaper published from Porto; strong focus on northern and regional Portugal, public safety, social issues, sports (FC Porto, Benfica, Sporting), and accessible national reporting",
      "readership": {
        "metric": "Over 35,000 daily print circulation, ranking among Portugal's most read daily newspapers",
        "source": "APCT Portugal 2023"
      },
      "revenueModel": "Print sales, digital subscriptions, and advertising",
      "logo": "newspaper-logos/pt/jornal-de-noticias.svg",
      "logoExplainer": "Bright crimson red field displaying bold white acronym 'JN' above clean uppercase title 'JORNAL DE NOTÍCIAS'.",
      "sources": [
        "https://www.jn.pt",
        "https://en.wikipedia.org/wiki/Jornal_de_Not%C3%ADcias"
      ]
    },
    {
      "id": "pt-correio-da-manha",
      "countryCode": "PT",
      "name": "Correio da Manhã (CM)",
      "nativeName": "Correio da Manhã",
      "englishTranslation": "Morning Mail",
      "founded": 1979,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Compact tabloid & digital portal (cmjornal.pt)",
      "language": "Portuguese",
      "headquarters": "Rua Luciana Stegagno Picchio, Lisbon",
      "owner": {
        "name": "Medialivre (formerly Cofina Media)",
        "type": "Commercial media group"
      },
      "editorialStance": "Portugal's highest circulation daily newspaper; popular sensationalist and populist editorial stance focusing on breaking crime reports, judicial investigations, celebrity gossip, and sports",
      "readership": {
        "metric": "Over 55,000 daily print circulation, maintaining the number one print sales position in Portugal for over two decades",
        "source": "APCT 2023 & Medialivre Corporate Report"
      },
      "revenueModel": "High retail print sales and multimedia advertising",
      "logo": "newspaper-logos/pt/correio-da-manha.svg",
      "logoExplainer": "Vibrant scarlet red rectangular banner with white square icon enclosing red 'CM' initials and bold stacked white typography.",
      "sources": [
        "https://www.cmjornal.pt",
        "https://en.wikipedia.org/wiki/Correio_da_Manh%C3%A3"
      ]
    }
  ],
  "PW": [
    {
      "id": "pw-belau-national-gazette",
      "countryCode": "PW",
      "name": "Belau National Gazette",
      "founded": 1955,
      "frequency": "Quarterly historical journal & cultural bulletin",
      "format": "Magazine & institutional digital portal",
      "language": "Palauan, English",
      "headquarters": "Koror",
      "owner": {
        "name": "Belau National Museum (Government Chartered Institution)",
        "type": "Public cultural institution"
      },
      "annualPublicFunding": {
        "total": "$195,000",
        "perCapita": "$10.80"
      },
      "editorialStance": "Micronesia's oldest museum publication; provides verified chronicles of Palauan history, traditional matrilineal genealogy, indigenous archaeology, and national commemorative events",
      "readership": {
        "metric": "Archived across all Palau schools, public libraries, and Pacific universities throughout Oceania",
        "source": "Belau National Museum Report 2023"
      },
      "revenueModel": "State statutory appropriation, museum memberships, and cultural publications",
      "logo": "newspaper-logos/pw/belau-national-gazette.svg",
      "logoExplainer": "Traditional Palauan Bai meeting house silhouette in gold on deep navy blue with text 'BELAU NATIONAL GAZETTE'.",
      "sources": [
        "https://www.belaunationalmuseum.net"
      ]
    },
    {
      "id": "pw-tia-belau",
      "countryCode": "PW",
      "name": "Tia Belau",
      "nativeName": "Tia Belau",
      "englishTranslation": "This is Palau",
      "founded": 1992,
      "frequency": "Weekly newspaper (Mondays)",
      "format": "Tabloid print & digital archive",
      "language": "English, Palauan",
      "headquarters": "Koror",
      "owner": {
        "name": "Tia Belau Publishing Co. (Moses Uludong)",
        "type": "Independent commercial publisher"
      },
      "editorialStance": "Historic independent crusading newspaper; founded by pioneering Palauan journalist Moses Uludong, recognized for investigative reporting into governmental spending, land rights, and traditional council (Council of Chiefs) affairs",
      "readership": {
        "metric": "Circulated across all 16 states of Palau and to the Palauan diaspora in Guam, Saipan, and Hawaii",
        "source": "Tia Belau Circulation Profile 2023"
      },
      "revenueModel": "Print copy sales, political notices, and local display ads",
      "logo": "newspaper-logos/pw/tia-belau.svg",
      "logoExplainer": "Deep ocean blue field featuring bold gold Palauan lettering 'TIA BELAU', evoking national pride and traditional island self-determination.",
      "sources": [
        "https://en.wikipedia.org/wiki/Tia_Belau"
      ]
    },
    {
      "id": "pw-eco-palau-news",
      "countryCode": "PW",
      "name": "Eco Palau News",
      "founded": 1994,
      "frequency": "Monthly digital digest & environmental bulletin",
      "format": "Digital portal & print digest",
      "language": "English, Palauan",
      "headquarters": "Koror",
      "owner": {
        "name": "Palau Conservation Society (PCS)",
        "type": "Non-profit environmental civic media"
      },
      "editorialStance": "Dedicated ecological news clearinghouse; reports on coral reef preservation, shark sanctuary protection, sea-level rise monitoring, and sustainable fishing policies",
      "readership": {
        "metric": "Widely read by traditional village leaders, marine researchers, tourism operators, and civic educators",
        "source": "Palau Conservation Society Annual Review 2023"
      },
      "revenueModel": "Civic conservation grants, educational subscriptions, and donor support",
      "logo": "newspaper-logos/pw/eco-palau-news.svg",
      "logoExplainer": "Deep lagoon green background with stylized sea turtle icon and white text 'ECO PALAU NEWS', signifying marine biodiversity stewardship.",
      "sources": [
        "https://palauconservation.org"
      ]
    },
    {
      "id": "pw-island-times",
      "countryCode": "PW",
      "name": "Island Times Palau",
      "founded": 2005,
      "frequency": "Semi-weekly newspaper (Tuesdays & Fridays) & digital portal",
      "format": "Tabloid & digital edition",
      "language": "English, Palauan",
      "headquarters": "Koror",
      "owner": {
        "name": "Island Times Printing and Publishing Co.",
        "type": "Independent commercial media"
      },
      "editorialStance": "Palau's premier independent newspaper of record; comprehensive coverage of the Olbiil Era Kelulau (National Congress), marine protected areas (Palau National Marine Sanctuary), climate diplomacy, and Compact of Free Association (COFA)",
      "readership": {
        "metric": "Largest circulation newspaper in Palau, distributed across Koror, Babeldaob, and outer island states",
        "source": "Palau Media Council 2023"
      },
      "revenueModel": "Print sales, government legal notices, and commercial advertising",
      "logo": "newspaper-logos/pw/island-times.svg",
      "logoExplainer": "Pacific azure blue background with crisp white typography 'ISLAND TIMES PALAU' and golden full moon accent, symbolising the Palau flag.",
      "sources": [
        "https://islandtimes.org",
        "https://en.wikipedia.org/wiki/Island_Times"
      ]
    }
  ],
  "PY": [
    {
      "id": "py-abc-color",
      "countryCode": "PY",
      "name": "ABC Color",
      "founded": 1967,
      "frequency": "Daily newspaper (Monday–Sunday) & ABC TV",
      "format": "Broadsheet, cable TV (ABC TV) & digital superportal",
      "language": "Spanish, Guaraní",
      "headquarters": "Yegros 745, Asunción",
      "owner": {
        "name": "Editorial Azeta, S.A. (Zuccolillo Family)",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Paraguay's highest-circulation and most influential daily newspaper; historically banned under the Stroessner dictatorship, acclaimed for hard-hitting investigative journalism, exposing corruption, and defending democracy",
      "readership": {
        "metric": "Over 50,000 daily print circulation and abc.com.py is the most visited website in Paraguay with over 20 million monthly visits",
        "source": "Editorial Azeta / Similarweb 2023"
      },
      "revenueModel": "Print sales, digital subscriptions (ABC Digital), and major commercial advertising",
      "logo": "newspaper-logos/py/abc-color.svg",
      "logoExplainer": "Signature golden-yellow square with bold black serif letters 'ABC' and blue accent, symbolising independent investigative journalism.",
      "sources": [
        "https://www.abc.com.py",
        "https://es.wikipedia.org/wiki/ABC_Color"
      ]
    },
    {
      "id": "py-ultima-hora",
      "countryCode": "PY",
      "name": "Última Hora",
      "founded": 1973,
      "frequency": "Daily newspaper (Monday–Sunday) & Telefuturo partner",
      "format": "Tabloid & digital news portal",
      "language": "Spanish, Guaraní",
      "headquarters": "Benjamín Constant, Asunción",
      "owner": {
        "name": "Grupo Vierci",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Leading commercial daily newspaper; center-left progressive outlook focusing on social justice, judicial transparency, rural peasant rights, cultural arts, and sports",
      "readership": {
        "metric": "Over 40,000 daily print copies and over 12 million monthly digital page views on ultimahora.com",
        "source": "Grupo Vierci Audited Report 2023"
      },
      "revenueModel": "Print sales, corporate advertising, and digital sponsorships",
      "logo": "newspaper-logos/py/ultima-hora.svg",
      "logoExplainer": "Deep scarlet red rectangular background with prominent white modern sans-serif typography 'ÚLTIMA HORA'.",
      "sources": [
        "https://www.ultimahora.com",
        "https://es.wikipedia.org/wiki/%C3%9Altima_Hora_(Paraguay)"
      ]
    },
    {
      "id": "py-la-nacion",
      "countryCode": "PY",
      "name": "La Nación Paraguay",
      "founded": 1995,
      "frequency": "Daily newspaper (Monday–Sunday) & GEN TV",
      "format": "Broadsheet, cable TV (GEN) & digital portal",
      "language": "Spanish",
      "headquarters": "Fernando de la Mora, Central Department",
      "owner": {
        "name": "Grupo Nación Media",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Major national daily newspaper; conservative editorial line focusing on free enterprise, agribusiness, livestock exports, macroeconomic stability, and national politics",
      "readership": {
        "metric": "Over 25,000 daily print circulation and strong digital engagement across the Nación Media network",
        "source": "Grupo Nación Media Audit 2023"
      },
      "revenueModel": "Print circulation, commercial display advertising, and television broadcast ads",
      "logo": "newspaper-logos/py/la-nacion.svg",
      "logoExplainer": "Dignified dark navy blue field featuring refined white serif typography 'LA NACIÓN' with red and blue accent lines.",
      "sources": [
        "https://www.lanacion.com.py",
        "https://es.wikipedia.org/wiki/La_Naci%C3%B3n_(Paraguay)"
      ]
    }
  ],
  "QA": [
    {
      "id": "qa-al-raya",
      "countryCode": "QA",
      "name": "Al Raya",
      "nativeName": "جريدة الراية",
      "englishTranslation": "The Banner",
      "founded": 1979,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Broadsheet & digital news portal (raya.com)",
      "language": "Arabic",
      "headquarters": "D-Ring Road, Doha",
      "owner": {
        "name": "Gulf Publishing and Printing Company",
        "type": "Independent commercial publisher"
      },
      "editorialStance": "Qatar's premier Arabic-language daily broadsheet; authoritative coverage of domestic Qatari development, Shura Council decisions, sports tournaments, and Arab regional affairs",
      "readership": {
        "metric": "Over 25,000 daily print circulation with more than 1.5 million monthly digital page views",
        "source": "Gulf Publishing and Printing Co. 2023"
      },
      "revenueModel": "Print sales, government legal notices, and commercial advertising",
      "logo": "newspaper-logos/qa/al-raya.svg",
      "logoExplainer": "Qatari maroon banner featuring elegant white Arabic script 'الراية' and clean Latin subtitle 'AL RAYA'.",
      "sources": [
        "https://www.raya.com",
        "https://en.wikipedia.org/wiki/Al_Raya_(newspaper)"
      ]
    },
    {
      "id": "qa-al-sharq",
      "countryCode": "QA",
      "name": "Al Sharq",
      "nativeName": "جريدة الشرق",
      "englishTranslation": "The Orient",
      "founded": 1987,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Broadsheet & digital news portal (al-sharq.com)",
      "language": "Arabic",
      "headquarters": "D-Ring Road, Doha",
      "owner": {
        "name": "Dar Al Sharq Printing, Publishing and Distribution",
        "type": "Commercial media group"
      },
      "editorialStance": "Major Qatari daily broadsheet focusing on economic development, banking and Islamic finance, sovereign wealth fund (QIA) investments, and cultural commentary",
      "readership": {
        "metric": "Over 30,000 daily print distribution and over 2 million monthly digital visits",
        "source": "Dar Al Sharq Group Media Kit 2023"
      },
      "revenueModel": "Corporate advertising, subscriptions, and government public notices",
      "logo": "newspaper-logos/qa/al-sharq.svg",
      "logoExplainer": "Deep green field with flowing white Arabic calligraphic masthead 'الشرق' and crisp English subtitle 'AL SHARQ'.",
      "sources": [
        "https://al-sharq.com",
        "https://en.wikipedia.org/wiki/Al_Sharq_(newspaper)"
      ]
    },
    {
      "id": "qa-gulf-times",
      "countryCode": "QA",
      "name": "Gulf Times",
      "nativeName": "Gulf Times",
      "englishTranslation": "Gulf Times",
      "founded": 1978,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Broadsheet & digital portal (gulf-times.com)",
      "language": "English",
      "headquarters": "C-Ring Road, Doha",
      "owner": {
        "name": "Gulf Publishing and Printing Company",
        "type": "Commercial media enterprise"
      },
      "editorialStance": "Qatar's first English-language daily newspaper; serving Qatar's vast expatriate professional community, diplomatic corps, and multinational corporations with comprehensive national, regional, and international news",
      "readership": {
        "metric": "Over 35,000 daily print readership, holding the leading position among English-language newspapers in Qatar",
        "source": "Gulf Publishing & Printing 2023"
      },
      "revenueModel": "Commercial advertising, retail print sales, and corporate subscriptions",
      "logo": "newspaper-logos/qa/gulf-times.svg",
      "logoExplainer": "Deep navy field featuring regal white serif capitals 'GULF TIMES' accented with golden subtitle 'QATAR’S TOP ENGLISH DAILY'.",
      "sources": [
        "https://www.gulf-times.com",
        "https://en.wikipedia.org/wiki/Gulf_Times"
      ]
    }
  ],
  "RO": [
    {
      "id": "ro-adevarul",
      "countryCode": "RO",
      "name": "Adevărul",
      "nativeName": "Adevărul",
      "englishTranslation": "The Truth",
      "founded": 1888,
      "frequency": "Daily newspaper (Monday–Friday) & continuous portal",
      "format": "Berliner & digital news portal (adevarul.ro)",
      "language": "Romanian",
      "headquarters": "Strada Fabrica de Glucoză 21, Bucharest",
      "owner": {
        "name": "Adevărul Holding (Cristian Burci)",
        "type": "Independent commercial media"
      },
      "editorialStance": "One of Romania's oldest continuous daily newspapers; center-right, pro-European stance with extensive political analyses, cultural commentary, and investigative reports on public corruption and judicial reform",
      "readership": {
        "metric": "Over 12,000 daily print circulation with more than 8 million monthly unique digital visitors on adevarul.ro",
        "source": "BRAT (Biroul Român de Audit Transmedia) 2023"
      },
      "revenueModel": "Digital advertising, print subscriptions, and retail sales",
      "logo": "newspaper-logos/ro/adevarul.svg",
      "logoExplainer": "Clean white field with prominent black serif typography 'adevarul' accented with a red dot and bold red '.ro'.",
      "sources": [
        "https://adevarul.ro",
        "https://en.wikipedia.org/wiki/Adev%C4%83rul"
      ]
    },
    {
      "id": "ro-evenimentul-zilei",
      "countryCode": "RO",
      "name": "Evenimentul Zilei (EVZ)",
      "nativeName": "Evenimentul Zilei",
      "englishTranslation": "Event of the Day",
      "founded": 1992,
      "frequency": "Daily newspaper & digital news portal (evz.ro)",
      "format": "Compact tabloid & digital portal",
      "language": "Romanian",
      "headquarters": "Bulevardul Dimitrie Pompeiu, Bucharest",
      "owner": {
        "name": "Editura Evenimentul și Capital (Dan Andronic)",
        "type": "Independent commercial publisher"
      },
      "editorialStance": "Pioneering post-communist daily founded in 1992 by Ion Cristoiu; known for bold investigative reporting, exposing political scandals, and providing lively commentary on domestic Romanian politics",
      "readership": {
        "metric": "Over 4 million monthly active readers across digital and print properties",
        "source": "SATI (Studiul de Audiență și Trafic Internet) 2023"
      },
      "revenueModel": "Digital advertising and multimedia content licensing",
      "logo": "newspaper-logos/ro/evenimentul-zilei.svg",
      "logoExplainer": "Bold red rectangular field with prominent white block lettering 'EVENIMENTUL ZILEI (EVZ)'.",
      "sources": [
        "https://evz.ro",
        "https://en.wikipedia.org/wiki/Evenimentul_Zilei"
      ]
    },
    {
      "id": "ro-romania-libera",
      "countryCode": "RO",
      "name": "România Liberă",
      "nativeName": "România Liberă",
      "englishTranslation": "Free Romania",
      "founded": 1877,
      "frequency": "Daily newspaper (Monday–Friday)",
      "format": "Broadsheet & digital news portal (romanialibera.ro)",
      "language": "Romanian",
      "headquarters": "Strada Nerva Traian, Bucharest",
      "owner": {
        "name": "Medien Holding",
        "type": "Commercial publisher"
      },
      "editorialStance": "Historic daily newspaper founded during the Romanian War of Independence in 1877; played a pivotal role in the 1989 Romanian Revolution as an anti-totalitarian voice; committed to democratic rule of law and conservative values",
      "readership": {
        "metric": "Over 10,000 daily print distribution and over 1.5 million monthly digital readers",
        "source": "BRAT Romania 2023"
      },
      "revenueModel": "Print sales, corporate subscriptions, and display advertising",
      "logo": "newspaper-logos/ro/romania-libera.svg",
      "logoExplainer": "Deep navy field featuring refined white serif capitals 'ROMÂNIA LIBERĂ' with gold historical inscription 'Fondat 1877'.",
      "sources": [
        "https://romanialibera.ro",
        "https://en.wikipedia.org/wiki/Rom%C3%A2nia_Liber%C4%83"
      ]
    },
    {
      "id": "ro-ziarul-financiar",
      "countryCode": "RO",
      "name": "Ziarul Financiar (ZF)",
      "nativeName": "Ziarul Financiar",
      "englishTranslation": "Financial Newspaper",
      "founded": 1998,
      "frequency": "Daily business and financial newspaper (Monday–Friday)",
      "format": "Berliner & digital portal (zf.ro)",
      "language": "Romanian",
      "headquarters": "Piața Presei Libere 1, Bucharest",
      "owner": {
        "name": "Mediafax Group",
        "type": "Independent business publisher"
      },
      "editorialStance": "Romania's premier economic and financial daily broadsheet; the definitive source for Bucharest Stock Exchange (BVB) trends, corporate mergers, macroeconomic forecasts, and banking news",
      "readership": {
        "metric": "Over 20,000 daily print and corporate digital subscribers, with over 3 million monthly page views on zf.ro",
        "source": "BRAT & Mediafax Group 2023"
      },
      "revenueModel": "Corporate premium paywalls, print subscriptions, and financial advertising",
      "logo": "newspaper-logos/ro/ziarul-financiar.svg",
      "logoExplainer": "Warm orange-ochre banner displaying bold white monogram 'ZF' alongside clean uppercase subtitle 'ZIARUL FINANCIAR'.",
      "sources": [
        "https://www.zf.ro",
        "https://en.wikipedia.org/wiki/Ziarul_Financiar"
      ]
    }
  ],
  "RS": [
    {
      "id": "rs-politika",
      "countryCode": "RS",
      "name": "Politika",
      "nativeName": "Политика",
      "englishTranslation": "Politics",
      "founded": 1904,
      "frequency": "Daily morning broadsheet newspaper (Monday–Sunday)",
      "format": "Broadsheet & digital news portal (politika.rs)",
      "language": "Serbian",
      "headquarters": "Makedonska 29, Belgrade",
      "owner": {
        "name": "Politika Novine i Magazini (State of Serbia / Media 026)",
        "type": "Public-private daily newspaper of record"
      },
      "editorialStance": "The oldest continuous daily broadsheet newspaper in Serbia and the Balkans, founded in 1904 by Vladislav Ribnikar; highly prestigious newspaper of record revered for sophisticated cultural essays, political commentary, and international diplomacy",
      "readership": {
        "metric": "Over 45,000 daily print circulation with more than 6 million monthly digital unique readers on politika.rs",
        "source": "ABC Srbija & Politika NM 2023"
      },
      "revenueModel": "Retail print sales, digital advertising, and official public announcements",
      "logo": "newspaper-logos/rs/politika.svg",
      "logoExplainer": "Dark navy card displaying refined white serif Cyrillic capitals 'ПОЛИТИКА' and historic date 'Основана 1904. године — Београд'.",
      "sources": [
        "https://www.politika.rs",
        "https://en.wikipedia.org/wiki/Politika"
      ]
    },
    {
      "id": "rs-vecernje-novosti",
      "countryCode": "RS",
      "name": "Večernje Novosti",
      "nativeName": "Вечерње новости",
      "englishTranslation": "Evening News",
      "founded": 1953,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Compact & digital news portal (novosti.rs)",
      "language": "Serbian",
      "headquarters": "Trg Nikole Pašića 7, Belgrade",
      "owner": {
        "name": "Novosti a.d. (Media 026)",
        "type": "Commercial newspaper publishing house"
      },
      "editorialStance": "Major daily evening newspaper founded during the Trieste crisis in 1953; popular patriotic editorial stance focusing on breaking news, domestic politics, Kosovo and Metohija regional coverage, culture, and sports",
      "readership": {
        "metric": "Over 65,000 daily print circulation, consistently ranking among Serbia's highest circulation print dailies",
        "source": "ABC Srbija 2023"
      },
      "revenueModel": "Print sales, classifieds, and digital banner advertising",
      "logo": "newspaper-logos/rs/vecernje-novosti.svg",
      "logoExplainer": "Dark field with red square icon containing white Cyrillic 'Н' beside bold title 'ВЕЧЕРЊЕ НОВОСТИ'.",
      "sources": [
        "https://www.novosti.rs",
        "https://en.wikipedia.org/wiki/Ve%C4%8Dernje_novosti"
      ]
    },
    {
      "id": "rs-danas",
      "countryCode": "RS",
      "name": "Danas",
      "nativeName": "Дневни лист Данас",
      "englishTranslation": "Daily Newspaper Today",
      "founded": 1997,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Berliner & digital portal (danas.rs)",
      "language": "Serbian",
      "headquarters": "Alekse Nenadovića 19-21, Belgrade",
      "owner": {
        "name": "United Media (United Group)",
        "type": "Independent commercial media group"
      },
      "editorialStance": "Leading independent liberal daily newspaper in Serbia, founded in 1997 by independent journalists resisting state censorship; champion of European integration, civic democracy, judicial independence, and investigative reporting",
      "readership": {
        "metric": "Over 20,000 daily print circulation with more than 8 million monthly unique visitors on danas.rs",
        "source": "Gemius Audience Serbia 2023"
      },
      "revenueModel": "Reader digital membership club, print sales, and digital advertising",
      "logo": "newspaper-logos/rs/danas.svg",
      "logoExplainer": "Clean white rectangular field displaying prominent black serif wordmark 'Danas' accented with a red dot and '.rs'.",
      "sources": [
        "https://www.danas.rs",
        "https://en.wikipedia.org/wiki/Danas_(newspaper)"
      ]
    },
    {
      "id": "rs-blic",
      "countryCode": "RS",
      "name": "Blic",
      "nativeName": "Блиц",
      "englishTranslation": "Flash / Glance",
      "founded": 1996,
      "frequency": "Daily tabloid newspaper (Monday–Sunday)",
      "format": "Compact tabloid & digital news portal (blic.rs)",
      "language": "Serbian",
      "headquarters": "Kosovska 10, Belgrade",
      "owner": {
        "name": "Ringier Serbia (Ringier AG)",
        "type": "International publishing corporation"
      },
      "editorialStance": "Serbia's highest circulation daily newspaper and most visited news portal; dynamic reporting spanning political exclusives, society, entertainment, economy, and European sports",
      "readership": {
        "metric": "Over 50,000 daily print circulation and more than 15 million monthly unique users across blic.rs digital properties",
        "source": "Gemius Audience Serbia & Ringier 2023"
      },
      "revenueModel": "High-volume retail print sales and programmatic digital advertising",
      "logo": "newspaper-logos/rs/blic.svg",
      "logoExplainer": "Vibrant scarlet red background with bold italicized white block typography 'BLIC'.",
      "sources": [
        "https://www.blic.rs",
        "https://en.wikipedia.org/wiki/Blic"
      ]
    }
  ],
  "RU": [
    {
      "id": "ru-kommersant",
      "countryCode": "RU",
      "name": "Kommersant",
      "nativeName": "Газета «Коммерсантъ»",
      "englishTranslation": "The Businessman",
      "founded": 1989,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Broadsheet & digital news portal (kommersant.ru)",
      "language": "Russian",
      "headquarters": "Presnenskaya Embankment 10, Moscow",
      "owner": {
        "name": "Kommersant Publishing House (Alisher Usmanov)",
        "type": "Commercial business publisher"
      },
      "editorialStance": "Russia's leading business, financial and political daily broadsheet; widely respected among entrepreneurs, financiers, and state corporate executives for reliable corporate reporting and legal analysis",
      "readership": {
        "metric": "Over 60,000 daily print circulation and more than 20 million monthly unique digital visitors on kommersant.ru",
        "source": "Mediascope Russia 2023"
      },
      "revenueModel": "Print sales, digital subscriptions, and financial advertising",
      "logo": "newspaper-logos/ru/kommersant.svg",
      "logoExplainer": "Dark graphite field with distinguished white pre-revolutionary Cyrillic masthead 'Коммерсантъ' retaining the historic hard sign 'ъ'.",
      "sources": [
        "https://www.kommersant.ru",
        "https://en.wikipedia.org/wiki/Kommersant"
      ]
    },
    {
      "id": "ru-rossiyskaya-gazeta",
      "countryCode": "RU",
      "name": "Rossiyskaya Gazeta",
      "nativeName": "Российская газета",
      "englishTranslation": "Russian Gazette",
      "founded": 1990,
      "frequency": "Daily government newspaper of record (Monday–Friday)",
      "format": "Broadsheet & digital portal (rg.ru)",
      "language": "Russian",
      "headquarters": "Pravdy Street 24, Moscow",
      "owner": {
        "name": "Government of the Russian Federation",
        "type": "Official state newspaper of record"
      },
      "annualPublicFunding": {
        "total": "RUB 5.2 billion",
        "perCapita": "RUB 36.20"
      },
      "editorialStance": "Official daily newspaper of the Government of the Russian Federation; the mandatory official publisher where federal laws, presidential decrees, and cabinet directives must appear in print to enter into legal force",
      "readership": {
        "metric": "Over 140,000 daily print circulation with more than 25 million monthly unique digital visitors on rg.ru",
        "source": "Mediascope & RG Corporate 2023"
      },
      "revenueModel": "State budget funding, official legal notices, and commercial advertising",
      "logo": "newspaper-logos/ru/rossiyskaya-gazeta.svg",
      "logoExplainer": "Imperial blue field featuring refined white serif Cyrillic capitals 'РОССИЙСКАЯ ГАЗЕТА' underscored with a red banner.",
      "sources": [
        "https://rg.ru",
        "https://en.wikipedia.org/wiki/Rossiyskaya_Gazeta"
      ]
    },
    {
      "id": "ru-izvestia",
      "countryCode": "RU",
      "name": "Izvestia",
      "nativeName": "Газета «Известия»",
      "englishTranslation": "News / Deliverances",
      "founded": 1917,
      "frequency": "Daily newspaper (Monday–Friday)",
      "format": "Broadsheet & multimedia digital portal (iz.ru)",
      "language": "Russian",
      "headquarters": "Partiyniy Lane 1, Moscow",
      "owner": {
        "name": "National Media Group (NMG)",
        "type": "Commercial media group"
      },
      "editorialStance": "Historic daily newspaper founded during the February Revolution in Petrograd in 1917; major general-interest national broadsheet covering domestic social issues, defense, culture, and foreign diplomacy",
      "readership": {
        "metric": "Over 100,000 daily print circulation with more than 30 million monthly unique users across the iz.ru multimedia network",
        "source": "Mediascope Russia 2023"
      },
      "revenueModel": "Retail print sales, television integration, and online advertising",
      "logo": "newspaper-logos/ru/izvestia.svg",
      "logoExplainer": "Deep crimson red rectangular field showcasing bold white classical serif Cyrillic lettering 'ИЗВЕСТИЯ'.",
      "sources": [
        "https://iz.ru",
        "https://en.wikipedia.org/wiki/Izvestia"
      ]
    }
  ],
  "RW": [
    {
      "id": "rw-the-new-times",
      "countryCode": "RW",
      "name": "The New Times",
      "nativeName": "The New Times",
      "englishTranslation": "The New Times",
      "founded": 1995,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Broadsheet & digital news portal (newtimes.co.rw)",
      "language": "English",
      "headquarters": "Kigali City Tower, Kigali",
      "owner": {
        "name": "The New Times Publications SARL",
        "type": "Commercial publishing company"
      },
      "editorialStance": "Rwanda's leading English-language daily newspaper of record; comprehensive coverage of government policies, Vision 2050 initiatives, ICT tech sector investments, tourism (volcanoes gorilla conservation), and EAC diplomacy",
      "readership": {
        "metric": "Over 15,000 daily print copies distributed to government, embassies, hotels, and business centers, with over 1.5 million monthly digital readers",
        "source": "The New Times Media Kit 2023"
      },
      "revenueModel": "Print advertising, retail sales, and corporate subscriptions",
      "logo": "newspaper-logos/rw/the-new-times.svg",
      "logoExplainer": "Deep navy field featuring elegant white serif masthead 'The New Times' with Rwandan sky blue subtitle 'RWANDA’S LEADING DAILY'.",
      "sources": [
        "https://www.newtimes.co.rw",
        "https://en.wikipedia.org/wiki/The_New_Times_(Rwanda)"
      ]
    },
    {
      "id": "rw-imvaho-nshya",
      "countryCode": "RW",
      "name": "Imvaho Nshya",
      "nativeName": "Imvaho Nshya",
      "englishTranslation": "New Reality",
      "founded": 1960,
      "frequency": "Tri-weekly national newspaper (Monday, Wednesday, Friday)",
      "format": "Tabloid & digital portal",
      "language": "Kinyarwanda",
      "headquarters": "Kigali",
      "owner": {
        "name": "Imvaho Nshya Public Enterprise (RBA partner)",
        "type": "State-supported newspaper"
      },
      "annualPublicFunding": {
        "total": "RWF 350 million",
        "perCapita": "RWF 26.50"
      },
      "editorialStance": "Rwanda's oldest continuous newspaper, published in the national language Kinyarwanda; focuses on grassroots community empowerment, rural agriculture programs, district governance, and cultural heritage",
      "readership": {
        "metric": "Over 20,000 print distribution reaching schools, cooperatives, and district offices in all 30 districts of Rwanda",
        "source": "Rwanda Governance Board Media Barometer 2023"
      },
      "revenueModel": "State budget subsidy, public announcements, and retail print sales",
      "logo": "newspaper-logos/rw/imvaho-nshya.svg",
      "logoExplainer": "Forest green background with distinguished white serif title 'IMVAHO NSHYA' accented by golden yellow Kinyarwanda subtitle.",
      "sources": [
        "https://imvahonshya.co.rw",
        "https://en.wikipedia.org/wiki/Media_of_Rwanda"
      ]
    },
    {
      "id": "rw-igihe",
      "countryCode": "RW",
      "name": "Igihe",
      "nativeName": "Igihe",
      "englishTranslation": "Time / Era",
      "founded": 2009,
      "frequency": "Continuous 24/7 digital news service",
      "format": "Digital news portal & multimedia broadcasting (igihe.com)",
      "language": "Kinyarwanda, English, French, Kirundi",
      "headquarters": "KN 3 Rd, Kigali",
      "owner": {
        "name": "IGIHE Ltd (Meilleur Murindabigwi)",
        "type": "Independent digital media enterprise"
      },
      "editorialStance": "Rwanda's most visited independent digital news portal; popular breaking news coverage spanning politics, sports, diaspora communities, youth entrepreneurship, and African entertainment",
      "readership": {
        "metric": "Over 6 million monthly active visitors worldwide, making it the highest-traffic news portal based in Rwanda",
        "source": "SimilarWeb & Igihe Media Analytics 2023"
      },
      "revenueModel": "Digital display advertising, sponsored content, and video production",
      "logo": "newspaper-logos/rw/igihe.svg",
      "logoExplainer": "Crisp white rectangular field with blue bordered enclosure displaying bold blue lettering 'IGIHE' with red dot accent and '.com'.",
      "sources": [
        "https://en.igihe.com",
        "https://en.wikipedia.org/wiki/Media_of_Rwanda"
      ]
    }
  ],
  "SA": [
    {
      "id": "sa-asharq-al-awsat",
      "countryCode": "SA",
      "name": "Asharq Al-Awsat",
      "nativeName": "صحيفة الشرق الأوسط",
      "englishTranslation": "The Middle East",
      "founded": 1978,
      "frequency": "Daily international newspaper (Monday–Sunday)",
      "format": "Broadsheet & digital news network (aawsat.com)",
      "language": "Arabic, English",
      "headquarters": "Riyadh & London",
      "owner": {
        "name": "Saudi Research and Media Group (SRMG)",
        "type": "Commercial media conglomerate"
      },
      "editorialStance": "The premier pan-Arab international daily newspaper of record, famously printed simultaneously in 14 cities across four continents on green paper; influential voice covering Middle Eastern geopolitics, Arab diplomacy, energy, and Islamic thought",
      "readership": {
        "metric": "Over 180,000 global daily print circulation and more than 25 million monthly unique visitors across its global digital network",
        "source": "SRMG Annual Report 2023"
      },
      "revenueModel": "High-tier corporate advertising, print circulation sales, and digital subscriptions",
      "logo": "newspaper-logos/sa/asharq-al-awsat.svg",
      "logoExplainer": "Dark slate field showcasing elegant white Arabic calligraphy 'الشرق الأوسط' accented with vivid green Latin subtitle 'ASHARQ AL-AWSAT'.",
      "sources": [
        "https://aawsat.com",
        "https://en.wikipedia.org/wiki/Asharq_Al-Awsat"
      ]
    },
    {
      "id": "sa-arab-news",
      "countryCode": "SA",
      "name": "Arab News",
      "nativeName": "عرب نيوز",
      "englishTranslation": "Arab News",
      "founded": 1975,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Broadsheet & digital portal (arabnews.com)",
      "language": "English, French, Japanese, Urdu",
      "headquarters": "Riyadh",
      "owner": {
        "name": "Saudi Research and Media Group (SRMG)",
        "type": "Commercial international media group"
      },
      "editorialStance": "Saudi Arabia's premier English-language daily newspaper, founded in 1975 by Hisham and Mohammed Hafiz; widely respected international voice articulating Gulf perspectives to global policymakers, diplomats, and business leaders",
      "readership": {
        "metric": "Over 50,000 daily print readership and over 12 million monthly unique digital visitors worldwide across regional editions",
        "source": "SRMG Media Kit 2023"
      },
      "revenueModel": "Display advertising, sponsored content, and print sales",
      "logo": "newspaper-logos/sa/arab-news.svg",
      "logoExplainer": "Saudi green field with distinguished white serif title 'ARAB NEWS' and subtitle 'THE VOICE OF A CHANGING REGION'.",
      "sources": [
        "https://www.arabnews.com",
        "https://en.wikipedia.org/wiki/Arab_News"
      ]
    },
    {
      "id": "sa-al-riyadh",
      "countryCode": "SA",
      "name": "Al Riyadh",
      "nativeName": "جريدة الرياض",
      "englishTranslation": "Riyadh Newspaper",
      "founded": 1965,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Broadsheet & digital news portal (alriyadh.com)",
      "language": "Arabic",
      "headquarters": "Al-Sahafa District, Riyadh",
      "owner": {
        "name": "Al Yamamah Press Establishment",
        "type": "Commercial press establishment"
      },
      "editorialStance": "One of Saudi Arabia's leading daily broadsheet newspapers of record; influential domestic political editorial line providing exhaustive coverage of Saudi ministerial programs, economic diversification, Riyadh urban developments, and cultural commentary",
      "readership": {
        "metric": "Over 120,000 daily print circulation with more than 8 million monthly unique visits on alriyadh.com",
        "source": "Al Yamamah Press Establishment 2023"
      },
      "revenueModel": "Print subscriptions, government notices, and display advertising",
      "logo": "newspaper-logos/sa/al-riyadh.svg",
      "logoExplainer": "Deep green field featuring flowing classical Arabic calligraphic title 'الرياض' and crisp English subtitle 'AL RIYADH'.",
      "sources": [
        "https://www.alriyadh.com",
        "https://en.wikipedia.org/wiki/Al_Riyadh_(newspaper)"
      ]
    },
    {
      "id": "sa-okaz",
      "countryCode": "SA",
      "name": "Okaz",
      "nativeName": "صحيفة عكاظ",
      "englishTranslation": "Okaz Newspaper",
      "founded": 1960,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Broadsheet & digital portal (okaz.com.sa)",
      "language": "Arabic",
      "headquarters": "Jeddah",
      "owner": {
        "name": "Okaz Organization for Press and Publication",
        "type": "Commercial publishing company"
      },
      "editorialStance": "Major national daily broadsheet newspaper published in Jeddah; historically named after the famous pre-Islamic cultural fair Souq Okaz; strong reporting on western Saudi Arabia (Hejaz, Mecca, Medina), social reforms, consumer rights, and commercial shipping",
      "readership": {
        "metric": "Over 100,000 daily print circulation with more than 10 million monthly digital visits",
        "source": "Okaz Organization Media Kit 2023"
      },
      "revenueModel": "Commercial advertising, retail print sales, and digital sponsorships",
      "logo": "newspaper-logos/sa/okaz.svg",
      "logoExplainer": "Crimson red banner with bold classical Arabic calligraphy 'عكاظ' and white block typography 'OKAZ'.",
      "sources": [
        "https://www.okaz.com.sa",
        "https://en.wikipedia.org/wiki/Okaz"
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
      "logo": "newspaper-logos/sb/solomon-star.jpg",
      "logoExplainer": "Deep navy field featuring a gold five-pointed star representing the island provinces, with classic white serif masthead typography and bright blue Pacific subtitle.",
      "sources": [
        "https://www.solomonstarnews.com",
        "https://en.wikipedia.org/wiki/Solomon_Star"
      ]
    }
  ],
  "SC": [
    {
      "id": "sc-seychelles-nation",
      "countryCode": "SC",
      "name": "Seychelles Nation",
      "nativeName": "Seychelles Nation",
      "englishTranslation": "Seychelles Nation",
      "founded": 1976,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Broadsheet & digital news portal (nation.sc)",
      "language": "English, French, Seychellois Creole (Seselwa)",
      "headquarters": "Grand Court Building, Castor Road, Victoria, Mahé",
      "owner": {
        "name": "National Information Services Agency (NISA)",
        "type": "Public corporate publisher"
      },
      "annualPublicFunding": {
        "total": "SCR 8.2 million",
        "perCapita": "SCR 82.00"
      },
      "editorialStance": "The official national daily newspaper of record of Seychelles, published continuously since independence in 1976; comprehensive trilingual coverage of government appointments, legal acts, fisheries, vanilla and tourism industries, and community events",
      "readership": {
        "metric": "Over 5,000 daily print circulation, distributed to government offices, schools, hotels, and households across Mahé, Praslin, and La Digue",
        "source": "NISA Annual Financial Report 2023"
      },
      "revenueModel": "State institutional funding, retail print sales, and official gazette notices",
      "logo": "newspaper-logos/sc/seychelles-nation.svg",
      "logoExplainer": "Deep navy field featuring elegant white serif masthead 'Seychelles NATION' underscored with green subtitle.",
      "sources": [
        "https://www.nation.sc",
        "https://en.wikipedia.org/wiki/Seychelles_Nation"
      ]
    },
    {
      "id": "sc-today-in-seychelles",
      "countryCode": "SC",
      "name": "Today in Seychelles",
      "nativeName": "Today in Seychelles",
      "englishTranslation": "Today in Seychelles",
      "founded": 2011,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Tabloid & digital portal (todayinseychelles.com)",
      "language": "English, French, Seychellois Creole",
      "headquarters": "Le Chantier, Victoria, Mahé",
      "owner": {
        "name": "Today Publishers Ltd",
        "type": "Independent commercial publisher"
      },
      "editorialStance": "Seychelles's leading independent daily newspaper; acclaimed for balanced political reporting, investigative journalism into state procurement, consumer advocacy, and environmental reporting",
      "readership": {
        "metric": "Over 4,500 daily print circulation and more than 150,000 monthly digital readers worldwide",
        "source": "Today Publishers Media Kit 2023"
      },
      "revenueModel": "Print circulation sales and corporate advertising",
      "logo": "newspaper-logos/sc/today-in-seychelles.svg",
      "logoExplainer": "Crimson red rectangular field with bold white modern sans-serif typography 'TODAY IN SEYCHELLES'.",
      "sources": [
        "https://www.facebook.com/todayinsey",
        "https://en.wikipedia.org/wiki/Media_of_Seychelles"
      ]
    },
    {
      "id": "sc-the-people",
      "countryCode": "SC",
      "name": "The People",
      "nativeName": "The People",
      "englishTranslation": "The People",
      "founded": 1964,
      "frequency": "Weekly newspaper (Friday)",
      "format": "Tabloid & digital portal",
      "language": "English, French, Seychellois Creole",
      "headquarters": "Maison du Peuple, Victoria, Mahé",
      "owner": {
        "name": "United Seychelles Party (US)",
        "type": "Political party publishing organ"
      },
      "editorialStance": "Historic weekly newspaper founded in 1964 by France-Albert René during the anti-colonial liberation struggle; organ of the United Seychelles party; focuses on social democratic policies, public health, workers' rights, and welfare",
      "readership": {
        "metric": "Circulated to over 3,000 weekly readers across the inner islands of Seychelles",
        "source": "United Seychelles Publications 2023"
      },
      "revenueModel": "Print sales, party subscriptions, and classified advertising",
      "logo": "newspaper-logos/sc/the-people.svg",
      "logoExplainer": "Dark slate background displaying distinguished white serif lettering 'The People' with golden subtitle.",
      "sources": [
        "https://unitedseychelles.com",
        "https://en.wikipedia.org/wiki/Media_of_Seychelles"
      ]
    },
    {
      "id": "sc-le-seychellois",
      "countryCode": "SC",
      "name": "Le Seychellois",
      "nativeName": "Le Seychellois",
      "englishTranslation": "The Seychellois",
      "founded": 1932,
      "frequency": "Weekly cultural and historical publication",
      "format": "Broadsheet & archival journal",
      "language": "French, English",
      "headquarters": "Victoria, Mahé",
      "owner": {
        "name": "Seychelles Historical & Cultural Society",
        "type": "Independent cultural publishing body"
      },
      "editorialStance": "Seychelles's historic pioneer newspaper, first published in 1932; dedicated to preserving national cultural heritage, Franco-Seychellois literature, creole folklore, and historical commentary",
      "readership": {
        "metric": "Over 1,500 readers among academic, cultural, and educational institutions across Seychelles",
        "source": "Seychelles Heritage Foundation 2023"
      },
      "revenueModel": "Cultural grant funding and subscription sales",
      "logo": "newspaper-logos/sc/le-seychellois.svg",
      "logoExplainer": "Forest green background showcasing classic white serif typography 'Le Seychellois' and French historical subtitle.",
      "sources": [
        "https://www.nation.sc",
        "https://en.wikipedia.org/wiki/Media_of_Seychelles"
      ]
    }
  ],
  "SD": [
    {
      "id": "sd-sudan-tribune",
      "countryCode": "SD",
      "name": "Sudan Tribune",
      "founded": 2003,
      "frequency": "Real-time 24/7 digital news service",
      "format": "Digital news portal & archive (sudantribune.com)",
      "language": "English, French",
      "headquarters": "Editorial newsroom serving Sudan & Paris bureau",
      "owner": {
        "name": "Sudan Tribune Association",
        "type": "Independent non-profit media organization"
      },
      "editorialStance": "Leading independent digital newspaper dedicated to Sudan and South Sudan; renowned globally for comprehensive coverage of peace negotiations, military engagements, human rights reports, humanitarian relief efforts, and regional diplomacy",
      "readership": {
        "metric": "Over 1.5 million monthly pageviews from researchers, diplomats, policymakers, and citizens inside and outside Sudan",
        "source": "Sudan Tribune Analytics Overview"
      },
      "revenueModel": "Digital programmatic advertising and independent foundation grants",
      "logo": "newspaper-logos/sd/sudan-tribune.png",
      "logoExplainer": "White background with a dark charcoal badge bearing red 'ST' monogram, classic serif 'Sudan Tribune' typography, and gray tagline.",
      "sources": [
        "https://sudantribune.com",
        "https://en.wikipedia.org/wiki/Sudan_Tribune"
      ]
    }
  ],
  "SE": [
    {
      "id": "se-dagens-nyheter",
      "countryCode": "SE",
      "name": "Dagens Nyheter (DN)",
      "nativeName": "Dagens Nyheter",
      "englishTranslation": "News of the Day",
      "founded": 1864,
      "frequency": "Daily morning newspaper & continuous digital coverage",
      "format": "Tabloid print newspaper & digital portal (dn.se)",
      "language": "Swedish",
      "headquarters": "Gjörwellsgatan 30, Stockholm",
      "owner": {
        "name": "Bonnier News (Bonnier Group)",
        "type": "Private media conglomerate"
      },
      "editorialStance": "Sweden's leading morning national daily newspaper of record, founded in 1864 by Rudolf Wall; independent liberal in editorial philosophy, known for world-class investigative journalism, cultural criticism, and thorough coverage of the Riksdag, European politics, and Nordic economic affairs",
      "readership": {
        "metric": "Over 360,000 paid subscribers (print and digital) and more than 4 million unique weekly readers across Sweden",
        "source": "Kantar Sifo Media Audit / Bonnier News Annual Report 2023"
      },
      "revenueModel": "Paid digital subscriptions, print subscriptions, and premium brand advertising",
      "logo": "newspaper-logos/se/dagens-nyheter.svg",
      "logoExplainer": "Classic white field with authoritative dark charcoal serif masthead 'DAGENS NYHETER.', a horizontal rule, and clean Swedish subtitle.",
      "sources": [
        "https://www.dn.se",
        "https://en.wikipedia.org/wiki/Dagens_Nyheter"
      ]
    },
    {
      "id": "se-svenska-dagbladet",
      "countryCode": "SE",
      "name": "Svenska Dagbladet (SvD)",
      "nativeName": "Svenska Dagbladet",
      "englishTranslation": "Swedish Daily Paper",
      "founded": 1884,
      "frequency": "Daily morning newspaper",
      "format": "Tabloid print newspaper & digital portal (svd.se)",
      "language": "Swedish",
      "headquarters": "Kungsbron 1, Stockholm",
      "owner": {
        "name": "Schibsted Media",
        "type": "Nordic public media group"
      },
      "editorialStance": "Major Swedish national morning daily newspaper, founded in 1884; independently moderate/conservative in editorial outlook, acclaimed for its Näringsliv business and financial section, cultural essays, and political analysis",
      "readership": {
        "metric": "Over 210,000 paid subscribers (print and digital) and over 2.5 million weekly readers",
        "source": "Kantar Sifo / Schibsted Annual Report 2023"
      },
      "revenueModel": "Digital subscriptions, print delivery subscriptions, and commercial advertising",
      "logo": "newspaper-logos/se/svenska-dagbladet.svg",
      "logoExplainer": "Navy blue field with elegant white serif lettering 'SVENSKA DAGBLADET', separated by a gold divider bar from golden-yellow subtitle.",
      "sources": [
        "https://www.svd.se",
        "https://en.wikipedia.org/wiki/Svenska_Dagbladet"
      ]
    },
    {
      "id": "se-aftonbladet",
      "countryCode": "SE",
      "name": "Aftonbladet",
      "nativeName": "Aftonbladet",
      "englishTranslation": "The Evening Paper",
      "founded": 1830,
      "frequency": "Daily evening newspaper & continuous digital portal",
      "format": "Tabloid newspaper & digital platform (aftonbladet.se)",
      "language": "Swedish",
      "headquarters": "Västra Järnvägsgatan 21, Stockholm",
      "owner": {
        "name": "Schibsted Media (91%) & Swedish Trade Union Confederation (LO, 9%)",
        "type": "Commercial media group with trade union partnership"
      },
      "editorialStance": "Sweden's largest news website and historic evening daily, founded in 1830 by Lars Johan Hierta; independent social democratic in editorial stance, pioneering digital journalism with vast coverage of breaking news, sports, entertainment, and social debate",
      "readership": {
        "metric": "Over 3.5 million daily online readers and over 260,000 paid subscribers to Aftonbladet Plus",
        "source": "Kantar Sifo Web Audit / Schibsted 2023"
      },
      "revenueModel": "Digital subscription service (Plus), digital advertising, and retail tabloid newsstand sales",
      "logo": "newspaper-logos/se/aftonbladet.svg",
      "logoExplainer": "Iconic Swedish yellow field with massive black sans-serif typography 'AFTONBLADET' and clean dark gray heritage subtitle.",
      "sources": [
        "https://www.aftonbladet.se",
        "https://en.wikipedia.org/wiki/Aftonbladet"
      ]
    },
    {
      "id": "se-expressen",
      "countryCode": "SE",
      "name": "Expressen",
      "nativeName": "Expressen",
      "englishTranslation": "The Express",
      "founded": 1944,
      "frequency": "Daily evening newspaper & digital portal",
      "format": "Tabloid newspaper & news website (expressen.se)",
      "language": "Swedish",
      "headquarters": "Gjörwellsgatan 30, Stockholm",
      "owner": {
        "name": "Bonnier News (Bonnier Group)",
        "type": "Private media corporation"
      },
      "editorialStance": "Major Swedish national evening tabloid newspaper, founded in 1944 by Ivar Harrie; liberal in political stance, renowned for breaking news, undercover investigations, political debates, and cultural exposés",
      "readership": {
        "metric": "Over 2.8 million daily digital readers and more than 150,000 paid Expressen Premium subscribers",
        "source": "Kantar Sifo / Bonnier News"
      },
      "revenueModel": "Digital subscriptions (Premium), digital programmatic advertising, and single-copy newsstand sales",
      "logo": "newspaper-logos/se/expressen.svg",
      "logoExplainer": "Royal blue background with a red circle enclosing a white Swedish wasp/star motif, bold white 'EXPRESSEN' title, and light blue subtitle.",
      "sources": [
        "https://www.expressen.se",
        "https://en.wikipedia.org/wiki/Expressen"
      ]
    }
  ],
  "SG": [
    {
      "id": "sg-the-straits-times",
      "countryCode": "SG",
      "name": "The Straits Times",
      "nativeName": "The Straits Times",
      "englishTranslation": "The Straits Times",
      "founded": 1845,
      "frequency": "Daily broadsheet newspaper (Monday–Sunday)",
      "format": "Broadsheet & comprehensive digital portal (straitstimes.com)",
      "language": "English",
      "headquarters": "1000 Toa Payoh North, Singapore",
      "owner": {
        "name": "SPH Media Trust (non-profit public-interest media company limited by guarantee)",
        "type": "Public-interest trust newspaper of record"
      },
      "annualPublicFunding": {
        "total": "SGD 180 million (SPH Media Trust government funding grant)",
        "perCapita": "SGD 30.50"
      },
      "editorialStance": "Singapore's English-language newspaper of record, established in 1845; widely respected flagship national daily providing authoritative coverage of Parliament of Singapore debates, Prime Minister's Office policy, MAS monetary guidelines, and ASEAN diplomacy",
      "readership": {
        "metric": "Over 400,000 daily print and digital subscribers, reaching more than 1.5 million daily readers across print and digital platforms",
        "source": "SPH Media Trust Annual Report 2023"
      },
      "revenueModel": "Government public-interest trust funding, print and digital subscriptions, and commercial advertising",
      "logo": "newspaper-logos/sg/the-straits-times.svg",
      "logoExplainer": "Deep navy field featuring distinguished classical serif typography 'THE STRAITS TIMES' with gold heritage inscription 'SINGAPORE SINCE 1845'.",
      "sources": [
        "https://www.straitstimes.com",
        "https://en.wikipedia.org/wiki/The_Straits_Times"
      ]
    },
    {
      "id": "sg-lianhe-zaobao",
      "countryCode": "SG",
      "name": "Lianhe Zaobao",
      "nativeName": "联合早报",
      "englishTranslation": "United Morning Paper",
      "founded": 1923,
      "frequency": "Daily broadsheet newspaper (Monday–Sunday)",
      "format": "Broadsheet & digital news portal (zaobao.com.sg)",
      "language": "Chinese (Simplified)",
      "headquarters": "1000 Toa Payoh North, Singapore",
      "owner": {
        "name": "SPH Media Trust",
        "type": "Public-interest trust newspaper of record"
      },
      "editorialStance": "The premier Chinese-language broadsheet newspaper of Singapore, formed from the historic merger of Nanyang Siang Pau (1923) and Sin Chew Jit Poh (1929); widely recognized globally as an authoritative and neutral observer of Greater China relations, ASEAN affairs, and Singaporean society",
      "readership": {
        "metric": "Over 150,000 daily print and digital subscribers, with over 10 million monthly digital unique visitors worldwide including high readership in Mainland China and Hong Kong",
        "source": "SPH Media Trust 2023"
      },
      "revenueModel": "Government trust grant support, subscriptions, and commercial advertising",
      "logo": "newspaper-logos/sg/lianhe-zaobao.svg",
      "logoExplainer": "Singapore red field featuring bold white Chinese characters '联合早报' and Latin subtitle 'LIANHE ZAOBAO'.",
      "sources": [
        "https://www.zaobao.com.sg",
        "https://en.wikipedia.org/wiki/Lianhe_Zaobao"
      ]
    },
    {
      "id": "sg-berita-harian-sg",
      "countryCode": "SG",
      "name": "Berita Harian (Singapore)",
      "nativeName": "Berita Harian",
      "englishTranslation": "Daily News",
      "founded": 1957,
      "frequency": "Daily broadsheet newspaper (Monday–Sunday)",
      "format": "Broadsheet & digital news portal (beritaharian.sg)",
      "language": "Malay",
      "headquarters": "1000 Toa Payoh North, Singapore",
      "owner": {
        "name": "SPH Media Trust",
        "type": "Public-interest trust publisher"
      },
      "editorialStance": "Singapore's sole Malay-language daily newspaper, founded in 1957; the essential voice for Singapore's Malay/Muslim community covering Islamic religious council (MUIS) affairs, educational achievements, bilingualism, and regional Malay Archipelago culture",
      "readership": {
        "metric": "Over 35,000 daily print and digital readers across Singapore",
        "source": "SPH Media Trust 2023"
      },
      "revenueModel": "Public trust grant funding, retail sales, and advertising",
      "logo": "newspaper-logos/sg/berita-harian-sg.svg",
      "logoExplainer": "Deep marine blue rectangular banner with dignified white serif typography 'BERITA HARIAN' and red subtitle 'SINGAPURA'.",
      "sources": [
        "https://www.beritaharian.sg",
        "https://en.wikipedia.org/wiki/Berita_Harian_(Singapore)"
      ]
    },
    {
      "id": "sg-today-sg",
      "countryCode": "SG",
      "name": "Today",
      "nativeName": "TODAY",
      "englishTranslation": "Today",
      "founded": 2000,
      "frequency": "Continuous 24/7 digital daily newspaper",
      "format": "Digital news portal & mobile news service (todayonline.com)",
      "language": "English",
      "headquarters": "Mediacorp Campus, 1 Stars Avenue, Singapore",
      "owner": {
        "name": "Mediacorp",
        "type": "State-owned digital news publisher"
      },
      "editorialStance": "Pioneering digital daily news portal focusing on young professionals, public policy debates, housing (HDB affordability), mental health, workplace culture, and youth perspectives in Singapore",
      "readership": {
        "metric": "Over 3 million unique monthly digital readers across web and social video platforms",
        "source": "Mediacorp Digital Reach 2023"
      },
      "revenueModel": "Digital display advertising, video sponsorships, and public service grants",
      "logo": "newspaper-logos/sg/today-sg.svg",
      "logoExplainer": "Vibrant scarlet red background with impactful white sans-serif uppercase block typography 'TODAY'.",
      "sources": [
        "https://www.todayonline.com",
        "https://en.wikipedia.org/wiki/Today_(Singapore_newspaper)"
      ]
    }
  ],
  "SI": [
    {
      "id": "si-delo",
      "countryCode": "SI",
      "name": "Delo",
      "nativeName": "Časopis Delo",
      "englishTranslation": "Work / Labor",
      "founded": 1959,
      "frequency": "Daily broadsheet newspaper (Monday–Saturday)",
      "format": "Berliner & digital news portal (delo.si)",
      "language": "Slovene",
      "headquarters": "Dunajska cesta 5, Ljubljana",
      "owner": {
        "name": "FMR d.o.o. / Delo d.o.o.",
        "type": "Independent commercial publisher"
      },
      "editorialStance": "Slovenia's foremost national daily broadsheet newspaper of record, founded in 1959; renowned for rigorous political reporting, investigative journalism, intellectual opinion columns, cultural criticism, and in-depth European analysis",
      "readership": {
        "metric": "Over 25,000 daily print circulation and over 30,000 digital subscribers, with more than 1.8 million monthly digital readers on delo.si",
        "source": "Delo d.o.o. Poslovno poročilo 2023"
      },
      "revenueModel": "Digital paywall subscriptions, print circulation sales, and premium advertising",
      "logo": "newspaper-logos/si/delo.svg",
      "logoExplainer": "Deep navy field featuring distinguished classical white serif masthead 'Delo'.",
      "sources": [
        "https://www.delo.si",
        "https://en.wikipedia.org/wiki/Delo_(newspaper)"
      ]
    },
    {
      "id": "si-dnevnik-si",
      "countryCode": "SI",
      "name": "Dnevnik (Slovenia)",
      "nativeName": "Dnevnik",
      "englishTranslation": "The Daily",
      "founded": 1951,
      "frequency": "Daily broadsheet newspaper (Monday–Saturday)",
      "format": "Berliner & digital news portal (dnevnik.si)",
      "language": "Slovene",
      "headquarters": "Kopitarjeva ulica 2, Ljubljana",
      "owner": {
        "name": "Dnevnik d.d.",
        "type": "Independent commercial publisher"
      },
      "editorialStance": "Prominent daily newspaper established in 1951; center-left editorial stance recognized for incisive political commentary, social equity advocacy, municipal governance in Ljubljana, and cultural reviews",
      "readership": {
        "metric": "Over 18,000 daily print circulation and over 1.2 million monthly unique digital visitors on dnevnik.si",
        "source": "Slovenska oglaševalska zbornica (SOZ) 2023"
      },
      "revenueModel": "Print sales, digital subscriptions, and display advertising",
      "logo": "newspaper-logos/si/dnevnik-si.svg",
      "logoExplainer": "Vibrant scarlet red background featuring bold white classical serif capitals 'DNEVNIK'.",
      "sources": [
        "https://www.dnevnik.si",
        "https://en.wikipedia.org/wiki/Dnevnik_(Slovenia)"
      ]
    },
    {
      "id": "si-vecer",
      "countryCode": "SI",
      "name": "Večer",
      "nativeName": "Časnik Večer",
      "englishTranslation": "Evening Newspaper",
      "founded": 1945,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Compact & digital news portal (vecer.com)",
      "language": "Slovene",
      "headquarters": "Ulica slovenske osamosvojitve 2, Maribor",
      "owner": {
        "name": "Časnik Večer d.o.o. (Salomon d.o.o.)",
        "type": "Commercial newspaper publishing company"
      },
      "editorialStance": "Major daily newspaper published in Maribor; the leading voice of north-eastern Slovenia (Styria and Carinthia); focuses on regional industrial development, social welfare, regional cross-border ties with Austria, and local culture",
      "readership": {
        "metric": "Over 15,000 daily print circulation, serving as the dominant print daily in north-eastern Slovenia",
        "source": "SOZ Slovenia 2023"
      },
      "revenueModel": "Print sales, local corporate advertising, and digital subscriptions",
      "logo": "newspaper-logos/si/vecer.svg",
      "logoExplainer": "Dark charcoal field with bold white serif capitals 'VEČER'.",
      "sources": [
        "https://vecer.com",
        "https://en.wikipedia.org/wiki/Ve%C4%8Der"
      ]
    },
    {
      "id": "si-finance",
      "countryCode": "SI",
      "name": "Finance (Časnik Finance)",
      "nativeName": "Časnik Finance",
      "englishTranslation": "Finance Newspaper",
      "founded": 1992,
      "frequency": "Daily business and financial newspaper (Monday–Friday)",
      "format": "Berliner & digital business portal (finance.si)",
      "language": "Slovene",
      "headquarters": "Bleiweisova cesta 30, Ljubljana",
      "owner": {
        "name": "Časnik Finance d.o.o. (Bonnier Business Press)",
        "type": "International business publishing group"
      },
      "editorialStance": "Slovenia's premier economic and business daily newspaper; part of the Scandinavian Bonnier Group; the definitive national authority on the Ljubljana Stock Exchange (LJSE), corporate finance, taxes, real estate, and EU recovery funds",
      "readership": {
        "metric": "Over 14,000 daily corporate print and digital subscribers, with high executive penetration across Slovenian enterprises",
        "source": "Bonnier Business Press Annual Report 2023"
      },
      "revenueModel": "High-value corporate digital subscriptions and business advertising",
      "logo": "newspaper-logos/si/finance.svg",
      "logoExplainer": "Deep pine green field with modern white typography 'FINANCE' and golden subtitle 'ČASNIK ZA GOSPODARSTVO'.",
      "sources": [
        "https://www.finance.si",
        "https://en.wikipedia.org/wiki/Finance_(newspaper)"
      ]
    }
  ],
  "SK": [
    {
      "id": "sk-sme",
      "countryCode": "SK",
      "name": "SME",
      "nativeName": "Denník SME",
      "englishTranslation": "We Are Daily",
      "founded": 1993,
      "frequency": "Daily newspaper (Monday–Friday)",
      "format": "Berliner & digital news portal (sme.sk)",
      "language": "Slovak",
      "headquarters": "Lazaretská 12, Bratislava",
      "owner": {
        "name": "Petit Press a.s. (Pluralis B.V. consortium)",
        "type": "Independent commercial publisher"
      },
      "editorialStance": "Slovakia's foremost independent daily broadsheet newspaper of record; founded in 1993 by journalists defending press freedom; renowned for fearless investigative journalism, defense of constitutional democracy, and pro-European orientation",
      "readership": {
        "metric": "Over 55,000 digital subscribers and over 18,000 print circulation, with more than 2.5 million monthly unique digital visitors on sme.sk",
        "source": "Petit Press & Audit Bureau of Circulations (ABC SR) 2023"
      },
      "revenueModel": "Digital paywalls, retail print sales, and display advertising",
      "logo": "newspaper-logos/sk/sme.svg",
      "logoExplainer": "High-visibility scarlet red field featuring bold white serif block typography 'SME'.",
      "sources": [
        "https://www.sme.sk",
        "https://en.wikipedia.org/wiki/SME_(newspaper)"
      ]
    },
    {
      "id": "sk-dennik-n",
      "countryCode": "SK",
      "name": "Denník N",
      "nativeName": "Denník N",
      "englishTranslation": "Daily N (Independent Daily)",
      "founded": 2015,
      "frequency": "Daily newspaper (Monday–Friday) & digital portal",
      "format": "Berliner & digital subscriber platform (dennikn.sk)",
      "language": "Slovak",
      "headquarters": "Karpatská 18, Bratislava",
      "owner": {
        "name": "N Press s.r.o. (Founding journalists & Eset founders)",
        "type": "Subscriber-owned independent media"
      },
      "editorialStance": "Groundbreaking independent, subscriber-funded investigative daily founded by former SME editors in 2015; recognized across Europe as a pioneer in digital journalism, exposing corruption, judicial misconduct, and authoritarian threats",
      "readership": {
        "metric": "Over 70,000 active paid digital subscribers, representing one of the highest per-capita digital subscription rates in Europe",
        "source": "N Press Výročná správa 2023"
      },
      "revenueModel": "Pure reader-funded subscription model (90%+ subscription revenue)",
      "logo": "newspaper-logos/sk/dennik-n.svg",
      "logoExplainer": "Dark charcoal field with red square icon enclosing white 'N' beside bold white sans-serif title 'DENNÍK N'.",
      "sources": [
        "https://dennikn.sk",
        "https://en.wikipedia.org/wiki/Denn%C3%ADk_N"
      ]
    },
    {
      "id": "sk-pravda-sk",
      "countryCode": "SK",
      "name": "Pravda (Slovakia)",
      "nativeName": "Denník Pravda",
      "englishTranslation": "Truth Daily",
      "founded": 1920,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Compact broadsheet & digital news portal (pravda.sk)",
      "language": "Slovak",
      "headquarters": "Kalendárová 8, Bratislava",
      "owner": {
        "name": "OUR MEDIA SR a.s. (SYNOT Group)",
        "type": "Commercial media publisher"
      },
      "editorialStance": "Historic daily newspaper founded in 1920; Slovakia's longest-running continuous daily; center-left editorial perspective covering social security, pensions, domestic politics, regional culture, and international affairs",
      "readership": {
        "metric": "Over 22,000 daily print circulation with more than 2 million monthly digital visitors on pravda.sk",
        "source": "ABC SR & IAB Slovakia 2023"
      },
      "revenueModel": "Print circulation sales and programmatic digital advertising",
      "logo": "newspaper-logos/sk/pravda-sk.svg",
      "logoExplainer": "Clean white field with prominent red serif title 'Pravda' alongside blue dot and '.sk' domain mark.",
      "sources": [
        "https://www.pravda.sk",
        "https://en.wikipedia.org/wiki/Pravda_(Slovakia)"
      ]
    },
    {
      "id": "sk-hospodarske-noviny",
      "countryCode": "SK",
      "name": "Hospodárske noviny (HN)",
      "nativeName": "Hospodárske noviny",
      "englishTranslation": "Economic News",
      "founded": 1993,
      "frequency": "Daily financial and economic newspaper (Monday–Friday)",
      "format": "Berliner & digital portal (hnonline.sk)",
      "language": "Slovak",
      "headquarters": "Krasovského 14, Bratislava",
      "owner": {
        "name": "MAFRA Slovakia a.s. (Kaprain Group)",
        "type": "Commercial business publisher"
      },
      "editorialStance": "Slovakia's premier economic and business daily broadsheet; the definitive source for corporate mergers, automotive manufacturing trends, macroeconomic policy, real estate, and tax regulation",
      "readership": {
        "metric": "Over 12,000 daily corporate print circulation and over 1.2 million monthly unique users on hnonline.sk",
        "source": "ABC SR & MAFRA Slovakia 2023"
      },
      "revenueModel": "Corporate subscriptions, print sales, and business-to-business advertising",
      "logo": "newspaper-logos/sk/hospodarske-noviny.svg",
      "logoExplainer": "Deep navy field featuring refined white serif typography 'HOSPODÁRSKE NOVINY' and blue 'HN ONLINE'.",
      "sources": [
        "https://hnonline.sk",
        "https://en.wikipedia.org/wiki/Hospod%C3%A1rske_noviny"
      ]
    }
  ],
  "SL": [
    {
      "id": "sl-awoko",
      "countryCode": "SL",
      "name": "Awoko",
      "nativeName": "Awoko Newspaper",
      "englishTranslation": "Early Morning Rooster Crow (Awoko)",
      "founded": 1998,
      "frequency": "Daily newspaper (Monday–Friday)",
      "format": "Broadsheet & digital news portal (awokonewspaper.sl)",
      "language": "English",
      "headquarters": "Campbell Street, Freetown",
      "owner": {
        "name": "Awoko Publications (Kelvin Lewis)",
        "type": "Independent commercial publisher"
      },
      "editorialStance": "Sierra Leone's leading independent daily newspaper; celebrated for high journalistic standards, objective coverage of national elections, public financial transparency, education reforms, and local court reporting",
      "readership": {
        "metric": "Over 8,000 daily print circulation with over 250,000 monthly digital visits, serving as a trusted primary news source in Freetown and the diaspora",
        "source": "Sierra Leone Association of Journalists (SLAJ) 2023"
      },
      "revenueModel": "Print sales, commercial display advertising, and corporate sponsorships",
      "logo": "newspaper-logos/sl/awoko.svg",
      "logoExplainer": "Deep navy field featuring distinguished white serif title 'AWOKO' accented by vibrant green subtitle 'SIERRA LEONE DAILY NEWSPAPER'.",
      "sources": [
        "https://awokonewspaper.sl",
        "https://en.wikipedia.org/wiki/Awoko_(newspaper)"
      ]
    },
    {
      "id": "sl-concord-times",
      "countryCode": "SL",
      "name": "Concord Times",
      "nativeName": "Concord Times",
      "englishTranslation": "Concord Times",
      "founded": 1993,
      "frequency": "Daily newspaper (Monday–Friday)",
      "format": "Tabloid & digital portal (slconcordtimes.com)",
      "language": "English",
      "headquarters": "Pademba Road, Freetown",
      "owner": {
        "name": "Concord Times Communications Ltd",
        "type": "Independent commercial publisher"
      },
      "editorialStance": "Prominent independent daily newspaper established in 1993; recognized for fearless reporting during Sierra Leone's democratic transitions, extensive coverage of anti-corruption commissions, and community development",
      "readership": {
        "metric": "Over 6,500 daily print distribution across Freetown, Bo, Kenema, and Makeni",
        "source": "Concord Times Communications 2023"
      },
      "revenueModel": "Retail print sales and institutional public notices",
      "logo": "newspaper-logos/sl/concord-times.svg",
      "logoExplainer": "Dark blue card with bold white serif capitals 'CONCORD TIMES' and bright blue subtitle.",
      "sources": [
        "https://slconcordtimes.com",
        "https://en.wikipedia.org/wiki/Concord_Times"
      ]
    },
    {
      "id": "sl-sl-telegraph",
      "countryCode": "SL",
      "name": "Sierra Leone Telegraph",
      "nativeName": "The Sierra Leone Telegraph",
      "englishTranslation": "The Sierra Leone Telegraph",
      "founded": 2010,
      "frequency": "Continuous digital news journal and analysis portal",
      "format": "Digital news portal (thesierraleonetelegraph.com)",
      "language": "English",
      "headquarters": "Freetown & London",
      "owner": {
        "name": "Abdul Rashid Thomas",
        "type": "Independent digital news enterprise"
      },
      "editorialStance": "Influential digital investigative news portal providing critical commentary on governance, human rights, economic macro-stability, currency (Leone) inflation, and foreign aid effectiveness",
      "readership": {
        "metric": "Over 600,000 monthly digital visitors, widely cited by international policy institutes and Sierra Leonean diaspora communities",
        "source": "The Sierra Leone Telegraph Analytics 2023"
      },
      "revenueModel": "Digital display advertising, reader donations, and syndicated analyses",
      "logo": "newspaper-logos/sl/sl-telegraph.svg",
      "logoExplainer": "Charcoal black rectangular card with white serif masthead 'Sierra Leone Telegraph' and bright green subtitle.",
      "sources": [
        "https://www.thesierraleonetelegraph.com",
        "https://en.wikipedia.org/wiki/Media_of_Sierra_Leone"
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
      "logo": "newspaper-logos/sl/standard-times.svg",
      "logoExplainer": "Crimson red background featuring bold white serif typography 'STANDARD TIMES' with clean white subtitle.",
      "sources": [
        "https://www.standardtimespress.org",
        "https://en.wikipedia.org/wiki/Standard_Times_(Sierra_Leone)"
      ]
    }
  ],
  "SM": [
    {
      "id": "sm-informazione",
      "countryCode": "SM",
      "name": "L'Informazione di San Marino",
      "nativeName": "L'Informazione di San Marino",
      "englishTranslation": "The Information of San Marino",
      "founded": 2000,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Tabloid & digital portal",
      "language": "Italian",
      "headquarters": "Rovereta, Serravalle, San Marino",
      "owner": {
        "name": "Gruppo Editoriale Sammarinese",
        "type": "Independent commercial publisher"
      },
      "editorialStance": "Leading independent daily newspaper in San Marino; recognized for thorough investigative journalism, parliamentary political reports, judicial inquiries into banking and finance (Cassa di Risparmio), and civic accountability",
      "readership": {
        "metric": "Over 2,500 daily print copies sold throughout newsstands in the nine Castelli (municipalities) of San Marino",
        "source": "Consulta per l'Informazione San Marino 2023"
      },
      "revenueModel": "Newsstand retail print sales and commercial display advertising",
      "logo": "newspaper-logos/sm/informazione.svg",
      "logoExplainer": "Navy blue rectangular frame featuring refined white serif typography 'L'INFORMAZIONE' accented with light blue subtitle.",
      "sources": [
        "https://www.libertas.sm",
        "https://en.wikipedia.org/wiki/San_Marino"
      ]
    },
    {
      "id": "sm-la-serenissima",
      "countryCode": "SM",
      "name": "La Serenissima",
      "nativeName": "La Serenissima - Il Giornale dei Sammarinesi",
      "englishTranslation": "The Most Serene - The Newspaper of Sammarinese",
      "founded": 1996,
      "frequency": "Daily morning newspaper (Monday–Saturday)",
      "format": "Tabloid & digital news portal",
      "language": "Italian",
      "headquarters": "Dogana, Serravalle, San Marino",
      "owner": {
        "name": "Asset Media / Edizioni Sammarinesi",
        "type": "Independent newspaper publisher"
      },
      "editorialStance": "Popular daily newspaper focused on domestic politics, trade and commerce, municipal council (Giunta di Castello) decisions, sports (San Marino national football league), and community culture",
      "readership": {
        "metric": "Over 2,000 daily print distribution across all Castelli of the Republic",
        "source": "Registro delle Pubblicazioni Sammarinesi 2023"
      },
      "revenueModel": "Print sales and local corporate advertisements",
      "logo": "newspaper-logos/sm/la-serenissima.svg",
      "logoExplainer": "Crisp white rectangular field bordered in Sammarinese blue with elegant serif masthead 'LA SERENISSIMA'.",
      "sources": [
        "https://www.libertas.sm",
        "https://en.wikipedia.org/wiki/San_Marino"
      ]
    },
    {
      "id": "sm-tribuna-sammarinese",
      "countryCode": "SM",
      "name": "Tribuna Sammarinese",
      "nativeName": "La Tribuna Sammarinese",
      "englishTranslation": "The Sammarinese Tribune",
      "founded": 1995,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Tabloid & digital portal",
      "language": "Italian",
      "headquarters": "Borgo Maggiore, San Marino",
      "owner": {
        "name": "Editoriale La Tribuna",
        "type": "Independent commercial publisher"
      },
      "editorialStance": "Established daily publication covering legislative assembly debates, economic relations with Italy and the European Union, tax treaty negotiations, and local trade union developments",
      "readership": {
        "metric": "Over 1,800 daily print readers across the Republic and surrounding Montefeltro region",
        "source": "Consulta per l'Informazione San Marino 2023"
      },
      "revenueModel": "Retail newspaper sales and business advertising",
      "logo": "newspaper-logos/sm/tribuna-sammarinese.svg",
      "logoExplainer": "Navy blue background displaying dignified white serif title 'TRIBUNA' highlighted with golden subtitle 'SAMMARINESE'.",
      "sources": [
        "https://www.libertas.sm",
        "https://en.wikipedia.org/wiki/San_Marino"
      ]
    },
    {
      "id": "sm-san-marino-fixing",
      "countryCode": "SM",
      "name": "San Marino Fixing",
      "nativeName": "San Marino Fixing - Giornale Economico e Finanziario",
      "englishTranslation": "San Marino Fixing - Economic and Financial Newspaper",
      "founded": 1993,
      "frequency": "Weekly financial and economic newspaper (Friday)",
      "format": "Tabloid & digital business portal (sanmarinofixing.com)",
      "language": "Italian",
      "headquarters": "Via Gino Giacomini 39, City of San Marino",
      "owner": {
        "name": "ANIS (Associazione Nazionale Industria San Marino)",
        "type": "Industrial & business confederation publisher"
      },
      "editorialStance": "The official economic and financial weekly journal of San Marino's National Industry Association (ANIS); primary reference for macroeconomic data, banking sector reforms, corporate tax legislation, manufacturing, and international trade treaties",
      "readership": {
        "metric": "Over 3,500 weekly print and corporate digital executive readers across banking institutions, manufacturing firms, and public ministries",
        "source": "ANIS Relazione Annuale 2023"
      },
      "revenueModel": "Corporate subscriptions and business-to-business financial advertising",
      "logo": "newspaper-logos/sm/san-marino-fixing.svg",
      "logoExplainer": "Dark charcoal card with bright red square icon showing bold white 'F' beside crisp white lettering 'FIXING'.",
      "sources": [
        "https://www.sanmarinofixing.com",
        "https://en.wikipedia.org/wiki/San_Marino"
      ]
    }
  ],
  "SN": [
    {
      "id": "sn-le-soleil",
      "countryCode": "SN",
      "name": "Le Soleil",
      "nativeName": "Le Soleil",
      "englishTranslation": "The Sun",
      "founded": 1970,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Broadsheet & digital news portal (lesoleil.sn)",
      "language": "French",
      "headquarters": "Route du Service Géographique, Hann, Dakar",
      "owner": {
        "name": "Société Sénégalaise de Presse et de Publications (SSPP Le Soleil - State majority)",
        "type": "Public daily newspaper of record"
      },
      "annualPublicFunding": {
        "total": "XOF 600 million",
        "perCapita": "XOF 35.30"
      },
      "editorialStance": "Senegal's historic daily newspaper of record, founded in 1970 under President Léopold Sédar Senghor; authoritative coverage of government decrees, judicial decisions, economic infrastructure (TER rail, Port of Dakar), and national cultural festivals",
      "readership": {
        "metric": "Over 25,000 daily print circulation with over 1.8 million monthly digital readers on lesoleil.sn",
        "source": "SSPP Le Soleil Rapport Financier 2023"
      },
      "revenueModel": "State subvention, retail print sales, and legal public notices",
      "logo": "newspaper-logos/sn/le-soleil.svg",
      "logoExplainer": "Deep navy field featuring radiant yellow circular sun icon alongside white serif title 'Le Soleil'.",
      "sources": [
        "https://lesoleil.sn",
        "https://en.wikipedia.org/wiki/Le_Soleil_(Senegal)"
      ]
    },
    {
      "id": "sn-lobservateur",
      "countryCode": "SN",
      "name": "L'Observateur",
      "nativeName": "L'Observateur",
      "englishTranslation": "The Observer",
      "founded": 2003,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Compact tabloid & digital portal",
      "language": "French",
      "headquarters": "Almadies, Dakar",
      "owner": {
        "name": "Groupe Futurs Médias (GFM - Youssou N'Dour)",
        "type": "Commercial multimedia conglomerate"
      },
      "editorialStance": "Senegal's largest circulation independent daily newspaper; recognized for dynamic investigative journalism, political investigations, social justice advocacy, labor issues, and sports (Senegalese wrestling - Laamb)",
      "readership": {
        "metric": "Over 60,000 daily print circulation, maintaining the number one print newspaper sales rank in Senegal for over a decade",
        "source": "Groupe Futurs Médias Audit 2023"
      },
      "revenueModel": "High-volume retail print sales and commercial advertising",
      "logo": "newspaper-logos/sn/lobservateur.svg",
      "logoExplainer": "Dark slate field with red square badge displaying white 'L'Obs' beside bold serif typography 'L'OBSERVATEUR'.",
      "sources": [
        "https://gfm.sn",
        "https://en.wikipedia.org/wiki/Media_of_Senegal"
      ]
    },
    {
      "id": "sn-sud-quotidien",
      "countryCode": "SN",
      "name": "Sud Quotidien",
      "nativeName": "Sud Quotidien",
      "englishTranslation": "South Daily",
      "founded": 1993,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Broadsheet & digital portal (sudquotidien.sn)",
      "language": "French",
      "headquarters": "Immeuble Fahd, Dakar",
      "owner": {
        "name": "Sud Communication (Babacar Touré / Consortium)",
        "type": "Independent media group"
      },
      "editorialStance": "Pioneering private independent daily broadsheet founded in 1993; celebrated for intellectual independence, in-depth political analyses, defense of democratic rule of law, and pan-African unity",
      "readership": {
        "metric": "Over 20,000 daily print circulation and over 1.2 million monthly digital readers",
        "source": "Sud Communication Review 2023"
      },
      "revenueModel": "Print sales, corporate subscriptions, and display advertising",
      "logo": "newspaper-logos/sn/sud-quotidien.svg",
      "logoExplainer": "Warm orange-ochre banner displaying bold white sans-serif title 'SUD QUOTIDIEN' with clean white subtitle.",
      "sources": [
        "https://www.sudquotidien.sn",
        "https://en.wikipedia.org/wiki/Media_of_Senegal"
      ]
    },
    {
      "id": "sn-wal-fadjri",
      "countryCode": "SN",
      "name": "Wal Fadjri",
      "nativeName": "Wal Fadjri - L'Aurore",
      "englishTranslation": "The Dawn",
      "founded": 1984,
      "frequency": "Daily newspaper (Monday–Friday)",
      "format": "Tabloid & multimedia news network (walf-groupe.com)",
      "language": "French",
      "headquarters": "Front de Terre, Dakar",
      "owner": {
        "name": "Groupe Wal Fadjri (Niasse family)",
        "type": "Independent multimedia group"
      },
      "editorialStance": "Historic independent daily founded in 1984 by pioneering journalist Sidy Lamine Niasse; renowned for fearless independent criticism of political power, defense of civic freedoms, and social commentary",
      "readership": {
        "metric": "Over 25,000 daily print circulation with widespread radio and television news syndication nationwide",
        "source": "Groupe Wal Fadjri 2023"
      },
      "revenueModel": "Print sales, broadcast sponsorships, and advertising",
      "logo": "newspaper-logos/sn/wal-fadjri.svg",
      "logoExplainer": "Deep forest green field with classic white serif masthead 'Wal Fadjri' and radiant yellow subtitle 'L'AURORE — DAKAR'.",
      "sources": [
        "https://www.walf-groupe.com",
        "https://en.wikipedia.org/wiki/Wal_Fadjri"
      ]
    }
  ],
  "SO": [
    {
      "id": "so-hiiraan-online",
      "countryCode": "SO",
      "name": "Hiiraan Online",
      "nativeName": "Hiiraan Online",
      "englishTranslation": "Hiiraan Online",
      "founded": 1999,
      "frequency": "Real-time 24/7 digital news",
      "format": "Online news portal & aggregator (hiiraan.com)",
      "language": "Somali, English",
      "headquarters": "Mogadishu (with editorial bureaus in Ottawa and Minneapolis)",
      "owner": {
        "name": "Hiiraan Online Inc.",
        "type": "Independent digital media corporation"
      },
      "editorialStance": "Pioneering Somali web news publication founded in 1999; widely revered as an indispensable digital bridge connecting Somalis across Mogadishu, Hargeisa, Garowe, Kismayo, and global diaspora communities worldwide",
      "readership": {
        "metric": "Over 1.8 million monthly unique visitors across Somalia and the global Somali diaspora",
        "source": "Hiiraan Online Traffic Overview / Alexa Internet Archive"
      },
      "revenueModel": "Digital programmatic advertising, diaspora remittances service notices, and sponsored content",
      "logo": "newspaper-logos/so/hiiraan-online.jpg",
      "logoExplainer": "Clean white field with royal blue rounded badge featuring white monogram 'HOL', bold blue title, and amber-orange Horn of Africa tagline.",
      "sources": [
        "https://www.hiiraan.com",
        "https://en.wikipedia.org/wiki/Hiiraan_Online"
      ]
    }
  ],
  "SR": [
    {
      "id": "sr-de-ware-tijd",
      "countryCode": "SR",
      "name": "De Ware Tijd",
      "nativeName": "De Ware Tijd",
      "englishTranslation": "The True Times",
      "founded": 1957,
      "frequency": "Daily (Monday to Saturday) morning newspaper",
      "format": "Broadsheet newspaper & digital edition (dwtonline.com)",
      "language": "Dutch",
      "headquarters": "Malebatrumstraat 11, Paramaribo",
      "owner": {
        "name": "DWT Media Groep (De Ware Tijd N.V.)",
        "type": "Private publishing company"
      },
      "editorialStance": "Suriname's largest and most influential daily newspaper of record, founded in 1957; provides extensive coverage of the National Assembly (De Nationale Assemblée), bauxite and offshore oil industries, judicial proceedings, and community news across all 10 districts",
      "readership": {
        "metric": "Print circulation of approximately 20,000 copies daily and over 800,000 monthly digital visits across Suriname, the Netherlands, and the Caribbean",
        "source": "DWT Media Groep / Surinaamse Journalisten Kring (SJK)"
      },
      "revenueModel": "Print newsstand sales, corporate commercial advertising, and family classified notices",
      "logo": "newspaper-logos/sr/de-ware-tijd.png",
      "logoExplainer": "Deep navy field featuring elegant white Times serif typography 'De Ware Tijd' and bright golden-yellow founding year subtitle.",
      "sources": [
        "https://dwtonline.com",
        "https://en.wikipedia.org/wiki/De_Ware_Tijd"
      ]
    },
    {
      "id": "sr-de-west",
      "countryCode": "SR",
      "name": "De West",
      "nativeName": "De West",
      "englishTranslation": "The West",
      "founded": 1892,
      "frequency": "Daily (Monday to Friday) afternoon newspaper",
      "format": "Broadsheet newspaper & news portal (dagbladdewest.com)",
      "language": "Dutch",
      "headquarters": "Dr. J.C. de Mirandastraat 2-4, Paramaribo",
      "owner": {
        "name": "Drukkerij De West N.V.",
        "type": "Independent family-owned media enterprise"
      },
      "editorialStance": "Suriname's oldest operating newspaper, published continuously since 1892; maintains a respected, independent, and civic-minded voice offering analysis of national economic policy, rule of law, and historic archival commentary",
      "readership": {
        "metric": "Circulation of approximately 8,000 daily copies and an established readership among business executives and civil servants",
        "source": "SJK Media Directory / De West"
      },
      "revenueModel": "Afternoon retail print sales, classified announcements, and commercial ads",
      "logo": "newspaper-logos/sr/de-west.png",
      "logoExplainer": "White field framed by a fine black line with bold black serif title 'DE WEST' and crimson heritage subtitle 'SEDERT 1892'.",
      "sources": [
        "https://dagbladdewest.com",
        "https://en.wikipedia.org/wiki/De_West"
      ]
    },
    {
      "id": "sr-dagblad-suriname",
      "countryCode": "SR",
      "name": "Dagblad Suriname",
      "nativeName": "Dagblad Suriname",
      "englishTranslation": "Daily Newspaper Suriname",
      "founded": 2002,
      "frequency": "Daily (Monday to Saturday) newspaper",
      "format": "Tabloid newspaper & digital website (dbsuriname.com)",
      "language": "Dutch",
      "headquarters": "Dr. Sophie Redmondstraat 216, Paramaribo",
      "owner": {
        "name": "Fash-Sur Multimedia N.V.",
        "type": "Commercial media publishing group"
      },
      "editorialStance": "Popular daily newspaper catering to broad public readership; offers lively coverage of parliamentary debates, district community news, consumer advocacy, crime reports, and sports",
      "readership": {
        "metric": "Print circulation of approximately 12,000 copies daily and over 500,000 monthly digital visits",
        "source": "Fash-Sur Multimedia Commercial Data"
      },
      "revenueModel": "Print sales, classified advertising, and digital ad banners",
      "logo": "newspaper-logos/sr/dagblad-suriname.svg",
      "logoExplainer": "Forest green background with heavy white and golden-yellow typography 'DAGBLAD SURINAME' and mint green subtitle.",
      "sources": [
        "https://www.dbsuriname.com",
        "https://en.wikipedia.org/wiki/Media_of_Suriname"
      ]
    }
  ],
  "SS": [
    {
      "id": "ss-sudan-tribune-ss",
      "countryCode": "SS",
      "name": "Sudan Tribune - South Sudan Desk",
      "founded": 2003,
      "frequency": "Real-time 24/7 online coverage",
      "format": "Online news portal & investigative repository (sudantribune.com)",
      "language": "English, French",
      "headquarters": "Juba (regional bureau) & Paris",
      "owner": {
        "name": "Sudan Tribune Association",
        "type": "Independent non-profit media association"
      },
      "editorialStance": "Preeminent regional news platform dedicating a comprehensive permanent editorial desk to South Sudan; provides rigorous documentation of peace talks, military movements, humanitarian logistics, and oil infrastructure disputes",
      "readership": {
        "metric": "Over 1.2 million monthly pageviews across Sudan, South Sudan, East Africa, and international research organizations",
        "source": "Sudan Tribune Readership Metrics"
      },
      "revenueModel": "Digital banner advertising and philanthropic foundation grants",
      "logo": "newspaper-logos/ss/sudan-tribune-ss.png",
      "logoExplainer": "Charcoal dark background with crimson square tile bearing white 'ST' monogram, elegant serif 'Sudan Tribune' masthead, and red subtitle.",
      "sources": [
        "https://sudantribune.com",
        "https://en.wikipedia.org/wiki/Sudan_Tribune"
      ]
    }
  ],
  "ST": [
    {
      "id": "st-tela-non",
      "countryCode": "ST",
      "name": "Téla Nón",
      "nativeName": "Jornal Téla Nón",
      "englishTranslation": "Our Land Newspaper",
      "founded": 2008,
      "frequency": "Continuous daily digital news service",
      "format": "Digital news portal (telanon.info)",
      "language": "Portuguese",
      "headquarters": "São Tomé",
      "owner": {
        "name": "Téla Nón Comunicações (Alexis Pontes)",
        "type": "Independent digital media publisher"
      },
      "editorialStance": "Leading independent online daily newspaper in São Tomé and Príncipe, named 'Téla Nón' ('Our Land' in the indigenous Forro Creole); celebrated for investigative journalism, promoting political transparency, and environmental protection",
      "readership": {
        "metric": "Over 350,000 monthly digital page views, widely read domestically and among the diaspora in Portugal, Angola, and France",
        "source": "Téla Nón Web Analytics 2023"
      },
      "revenueModel": "Online banner advertising and voluntary community reader contributions",
      "logo": "newspaper-logos/st/tela-non.svg",
      "logoExplainer": "Deep navy blue card featuring warm golden yellow serif masthead 'TÉLA NÓN' with white subtitle 'DIÁRIO DIGITAL DE STP'.",
      "sources": [
        "https://www.telanon.info",
        "https://en.wikipedia.org/wiki/Media_of_S%C3%A3o_Tom%C3%A9_and_Pr%C3%ADncipe"
      ]
    },
    {
      "id": "st-noticias-stp",
      "countryCode": "ST",
      "name": "Notícias STP",
      "nativeName": "Notícias de São Tomé e Príncipe",
      "englishTranslation": "News of São Tomé and Príncipe",
      "founded": 2015,
      "frequency": "Continuous digital news service",
      "format": "Digital news portal & mobile news network",
      "language": "Portuguese",
      "headquarters": "São Tomé",
      "owner": {
        "name": "STP Media Digital",
        "type": "Independent online publisher"
      },
      "editorialStance": "Contemporary online news platform dedicated to fast-breaking headlines, sports (national football championships), arts, ecotourism (Príncipe UNESCO biosphere reserve), and youth affairs",
      "readership": {
        "metric": "Over 200,000 monthly digital visitors across web and social media channels",
        "source": "STP Media Analytics 2023"
      },
      "revenueModel": "Digital advertising networks and commercial partnerships",
      "logo": "newspaper-logos/st/noticias-stp.svg",
      "logoExplainer": "Dark teal green field with bold white sans-serif typography 'NOTÍCIAS STP' and golden yellow secondary title.",
      "sources": [
        "https://noticias.st",
        "https://en.wikipedia.org/wiki/Media_of_S%C3%A3o_Tom%C3%A9_and_Pr%C3%ADncipe"
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
      "logo": "newspaper-logos/st/jornal-transparencia.svg",
      "logoExplainer": "Dark slate background displaying refined white serif title 'JORNAL TRANSPARÊNCIA' accented with green subtitle.",
      "sources": [
        "https://transparenciastep.com",
        "https://en.wikipedia.org/wiki/Media_of_S%C3%A3o_Tom%C3%A9_and_Pr%C3%ADncipe"
      ]
    }
  ],
  "SV": [
    {
      "id": "sv-la-prensa-grafica",
      "countryCode": "SV",
      "name": "La Prensa Gráfica",
      "officialName": "La Prensa Gráfica (LPG)",
      "englishTranslation": "The Graphic Press",
      "founded": 1915,
      "frequency": "Daily newspaper",
      "format": "Berliner & digital portal",
      "language": "Spanish",
      "headquarters": "Antiguo Cuscatlán, San Salvador",
      "owner": {
        "name": "Grupo Dutriz",
        "type": "Independent commercial media"
      },
      "editorialStance": "El Salvador's historic newspaper of record; center-right liberal editorial stance focusing on judicial independence, national security, macroeconomics, and human rights",
      "readership": {
        "metric": "Highest print circulation in El Salvador and leading digital portal laprensagrafica.com reaching 4.5 million monthly visitors",
        "source": "Grupo Dutriz Memoria Anual 2023"
      },
      "revenueModel": "Digital paywall subscriptions, print sales, and corporate advertising",
      "logo": "newspaper-logos/sv/la-pensa-gráfica.svg",
      "logoExplainer": "Navy blue banner with classical white serif masthead 'LA PRENSA GRÁFICA', symbolising over a century of Salvadoran news leadership.",
      "sources": [
        "https://www.laprensagrafica.com",
        "https://en.wikipedia.org/wiki/La_Prensa_Gr%C3%A1fica"
      ]
    },
    {
      "id": "sv-el-diario-de-hoy",
      "countryCode": "SV",
      "name": "El Diario de Hoy",
      "officialName": "El Diario de Hoy (EDH)",
      "englishTranslation": "Today's Daily",
      "founded": 1936,
      "frequency": "Daily newspaper",
      "format": "Broadsheet & digital portal",
      "language": "Spanish",
      "headquarters": "San Salvador",
      "owner": {
        "name": "Editorial Altamirano Madriz S.A.",
        "type": "Independent commercial media"
      },
      "editorialStance": "Conservative quality daily newspaper; free-market advocacy, rule of law, anti-corruption investigations, and regional Central American commerce",
      "readership": {
        "metric": "Over 4 million monthly digital readers on elsalvador.com and strong institutional print circulation",
        "source": "Editorial Altamirano Madriz 2024"
      },
      "revenueModel": "Print sales, digital subscriptions, and display advertising",
      "logo": "newspaper-logos/sv/el-diario-de-hoy.svg",
      "logoExplainer": "Red and black logo with bold serif text 'elsalvador.com / El Diario de Hoy', iconic in Salvadoran conservative journalism.",
      "sources": [
        "https://www.elsalvador.com",
        "https://en.wikipedia.org/wiki/El_Diario_de_Hoy"
      ]
    },
    {
      "id": "sv-el-faro",
      "countryCode": "SV",
      "name": "El Faro",
      "englishTranslation": "The Lighthouse",
      "founded": 1998,
      "frequency": "Continuous digital investigative magazine",
      "format": "Investigative digital portal",
      "language": "Spanish, English",
      "headquarters": "San Salvador",
      "owner": {
        "name": "Fundación Trípode (Carlos Dada & Jorge Simán)",
        "type": "Non-profit independent foundation"
      },
      "editorialStance": "Pioneer of independent digital investigative journalism in Latin America; internationally acclaimed for investigations into state corruption, gangs, and democratic backsliding",
      "readership": {
        "metric": "Winner of the Maria Moors Cabot Prize and Columbia Journalism Award; globally recognized voice on Central American democracy",
        "source": "Fundación Trípode Impact Report 2023"
      },
      "revenueModel": "Philanthropic journalism grants, reader crowdfunding, and syndicated investigations",
      "logo": "newspaper-logos/sv/el-faro.svg",
      "logoExplainer": "Stark black and gold emblem featuring a glowing lighthouse beam and lowercase text 'elfaro', symbolising courage and transparency.",
      "sources": [
        "https://elfaro.net",
        "https://en.wikipedia.org/wiki/El_Faro_(digital_newspaper)"
      ]
    },
    {
      "id": "sv-diario-el-salvador",
      "countryCode": "SV",
      "name": "Diario El Salvador",
      "englishTranslation": "El Salvador Daily",
      "founded": 2020,
      "frequency": "Daily newspaper",
      "format": "Compact daily & digital portal",
      "language": "Spanish",
      "headquarters": "San Salvador",
      "owner": {
        "name": "State of El Salvador",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "State-owned daily newspaper established under President Nayib Bukele; government infrastructure projects, public safety policies, Bitcoin adoption, and social programs",
      "readership": {
        "metric": "Over 60,000 daily print distribution nationwide with heavily trafficked digital portal diarioelsalvador.com",
        "source": "Diario El Salvador Informe Institucional 2023"
      },
      "revenueModel": "State institutional advertising and low-cost retail print sales",
      "logo": "newspaper-logos/sv/diario-el-salvador.svg",
      "logoExplainer": "Cyan blue and white badge with clean modern typography 'DIARIO EL SALVADOR', representing contemporary state public communication.",
      "sources": [
        "https://diarioelsalvador.com",
        "https://es.wikipedia.org/wiki/Diario_El_Salvador"
      ]
    },
    {
      "id": "sv-el-mundo",
      "countryCode": "SV",
      "name": "Diario El Mundo",
      "englishTranslation": "The World Daily",
      "founded": 1967,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Tabloid publication & digital portal",
      "language": "Spanish",
      "headquarters": "San Salvador",
      "owner": {
        "name": "Editorial Chinchontepec (Borja family)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Centrist afternoon and morning daily; balanced coverage of parliamentary politics, business developments, community issues, and sports",
      "readership": {
        "metric": "Over 2.2 million monthly unique digital visitors on elmundo.sv and regular daily print readership in the capital",
        "source": "Diario El Mundo Media Kit 2024"
      },
      "revenueModel": "Print sales and commercial advertising",
      "logo": "newspaper-logos/sv/el-mundo.svg",
      "logoExplainer": "Red and blue title banner with white serif font 'EL MUNDO', symbolising reliable daily news coverage in El Salvador.",
      "sources": [
        "https://diario.elmundo.sv",
        "https://es.wikipedia.org/wiki/El_Mundo_(El_Salvador)"
      ]
    }
  ],
  "SY": [
    {
      "id": "sy-al-watan",
      "countryCode": "SY",
      "name": "Al-Watan",
      "nativeName": "صحيفة الوطن",
      "englishTranslation": "The Homeland",
      "founded": 2006,
      "frequency": "Daily print & digital newspaper",
      "format": "Broadsheet newspaper & web portal (alwatan.sy)",
      "language": "Arabic",
      "headquarters": "Damascus Free Zone, Damascus",
      "owner": {
        "name": "Al-Watan Publishing Company",
        "type": "Private publishing enterprise"
      },
      "editorialStance": "Prominent private daily newspaper published in Damascus since 2006; offers detailed reporting on domestic Syrian politics, commercial reconstruction, Arab League diplomacy, and cultural life",
      "readership": {
        "metric": "Print circulation of approximately 25,000 copies daily and over 600,000 monthly digital visits across the Levant",
        "source": "Arab Media Forum / Al-Watan Media Profile"
      },
      "revenueModel": "Newsstand retail sales, commercial advertising, and corporate announcements",
      "logo": "newspaper-logos/sy/al-watan.png",
      "logoExplainer": "White field framed by a crimson border, bearing red traditional Arabic calligraphy 'الوطن • AL-WATAN' and gray national daily subtitle.",
      "sources": [
        "https://alwatan.sy",
        "https://en.wikipedia.org/wiki/Al-Watan_(Syria)"
      ]
    },
    {
      "id": "sy-tishreen",
      "countryCode": "SY",
      "name": "Tishreen",
      "nativeName": "صحيفة تشرين",
      "englishTranslation": "October (Tishreen) Daily",
      "founded": 1975,
      "frequency": "Daily morning newspaper",
      "format": "Broadsheet newspaper & online edition (tishreen.news.sy)",
      "language": "Arabic",
      "headquarters": "Al-Mazzeh Western Highway, Damascus",
      "owner": {
        "name": "Al-Wahda Foundation for Press and Publishing (Government of Syria)",
        "type": "State-owned publishing house"
      },
      "editorialStance": "Historic state-owned daily morning newspaper, established in 1975 to commemorate the October 1973 War; covers public policy, industrial development, social welfare programs, agriculture in the Euphrates basin, and sports",
      "readership": {
        "metric": "Circulation of approximately 35,000 daily copies across Damascus, Aleppo, Homs, and Latakia, with distribution to government offices",
        "source": "Al-Wahda Press Foundation Annual Review"
      },
      "revenueModel": "State budget funding, government notices, and commercial display ads",
      "logo": "newspaper-logos/sy/tishreen.jpeg",
      "logoExplainer": "Deep navy field with elegant white Arabic lettering 'تشرين • TISHREEN', gold divider rule, and golden Damascus foundation subtitle.",
      "sources": [
        "https://tishreen.news.sy",
        "https://en.wikipedia.org/wiki/Tishreen_(newspaper)"
      ]
    },
    {
      "id": "sy-enab-baladi",
      "countryCode": "SY",
      "name": "Enab Baladi",
      "nativeName": "عنب بلدي (Enab Baladi)",
      "englishTranslation": "Grapes of My Homeland",
      "founded": 2011,
      "frequency": "Weekly print digest & real-time continuous digital service",
      "format": "Tabloid print newspaper & investigative portal (enabbaladi.net)",
      "language": "Arabic, English",
      "headquarters": "Founded in Darayya; editorial desks in Istanbul and Amman",
      "owner": {
        "name": "Enab Baladi Media Network",
        "type": "Independent non-profit media organization"
      },
      "editorialStance": "Celebrated independent Syrian news organization, founded by citizen journalists in Darayya in 2011; internationally acclaimed for rigorous independent fact-checking, documenting civilian life, tracking displacement, and promoting transitional justice",
      "readership": {
        "metric": "Over 2.2 million monthly unique visitors across Syria and the global Syrian diaspora",
        "source": "Enab Baladi Annual Transparency Report / WAN-IFRA"
      },
      "revenueModel": "International media support grants, reader donations, and philanthropic contributions",
      "logo": "newspaper-logos/sy/enab-baladi.svg",
      "logoExplainer": "White field with purple circular grape emblem, dark violet Arabic calligraphy 'عنب بلدي', and bold modern sans-serif wordmark 'ENAB BALADI'.",
      "sources": [
        "https://www.enabbaladi.net",
        "https://en.wikipedia.org/wiki/Enab_Baladi"
      ]
    }
  ],
  "SZ": [
    {
      "id": "sz-times-of-eswatini",
      "countryCode": "SZ",
      "name": "Times of Eswatini",
      "officialName": "The Times of Swaziland",
      "founded": 1897,
      "frequency": "Daily newspaper (Monday–Friday)",
      "format": "Broadsheet & digital portal",
      "language": "English",
      "headquarters": "Mbabane",
      "owner": {
        "name": "African Echo (Pty) Ltd / Times of Swaziland Ltd",
        "type": "Independent commercial media"
      },
      "editorialStance": "Eswatini's oldest and primary independent newspaper; national politics, parliamentary proceedings, traditional tinkhundla governance, and social affairs",
      "readership": {
        "metric": "Largest print circulation daily in Eswatini with 30,000 daily copies and extensive digital readership",
        "source": "Times of Eswatini Corporate Profile 2023"
      },
      "revenueModel": "Print sales, legal notices, and commercial display advertising",
      "logo": "newspaper-logos/sz/times-of-eswatini.svg",
      "logoExplainer": "Classic black serif masthead 'Times of Eswatini' on white canvas, symbolising over 125 years of independent press history.",
      "sources": [
        "http://www.times.co.sz",
        "https://en.wikipedia.org/wiki/The_Times_of_Swaziland"
      ]
    },
    {
      "id": "sz-ebuswini-observer",
      "countryCode": "SZ",
      "name": "Eswatini Observer",
      "officialName": "The Swazi Observer",
      "founded": 1981,
      "frequency": "Daily newspaper (Monday–Friday)",
      "format": "Broadsheet & digital portal",
      "language": "English",
      "headquarters": "Mbabane",
      "owner": {
        "name": "Tibiyo Taka Ngwane (Royal Charter Trust)",
        "type": "State-owned / statutory corporation"
      },
      "editorialStance": "Royal trust-owned daily newspaper; royal decrees, government infrastructure developments, diplomatic visits, and cultural preservation (Umhlanga)",
      "readership": {
        "metric": "Second largest daily newspaper in Eswatini, read throughout public administration and traditional councils",
        "source": "Tibiyo Taka Ngwane Annual Report 2023"
      },
      "revenueModel": "Commercial sales, official state notices, and royal trust funding",
      "logo": "newspaper-logos/sz/ebuswini-observer.svg",
      "logoExplainer": "Navy blue banner with white serif lettering 'Eswatini Observer', representing the royal chartered press of the Kingdom.",
      "sources": [
        "https://new.observer.org.sz",
        "https://en.wikipedia.org/wiki/Swazi_Observer"
      ]
    },
    {
      "id": "sz-swaziland-news",
      "countryCode": "SZ",
      "name": "Swaziland News",
      "founded": 2017,
      "frequency": "Continuous digital investigative portal",
      "format": "Investigative digital portal",
      "language": "English, SiSwati",
      "headquarters": "Mbabane / South Africa (Diaspora)",
      "owner": {
        "name": "Zweli Martin Dlamini",
        "type": "Independent commercial media"
      },
      "editorialStance": "Leading independent investigative online publication; critical coverage of absolute monarchy governance, human rights abuses, and pro-democracy movements",
      "readership": {
        "metric": "Highly influential digital news platform with over 800,000 monthly readers across Southern Africa",
        "source": "Swaziland News Analytics 2024"
      },
      "revenueModel": "Digital reader donations and international investigative journalism grants",
      "logo": "newspaper-logos/sz/swaziland-news.svg",
      "logoExplainer": "Red and black badge with bold typography 'SWAZILAND NEWS', symbolising fearless pro-democracy investigative journalism.",
      "sources": [
        "https://swazilandnews.co.za"
      ]
    },
    {
      "id": "sz-swazi-bridge",
      "countryCode": "SZ",
      "name": "Swazi Bridge",
      "founded": 2019,
      "frequency": "Continuous digital news service",
      "format": "Digital community portal",
      "language": "English, SiSwati",
      "headquarters": "Mbabane",
      "owner": {
        "name": "Swazi Bridge Media",
        "type": "Independent commercial media"
      },
      "editorialStance": "Digital community news network; rural development, youth initiatives, public healthcare, and educational opportunities in Eswatini",
      "readership": {
        "metric": "Popular digital news platform connecting urban centers with rural communities across Eswatini",
        "source": "Swazi Bridge Audience Review 2023"
      },
      "revenueModel": "Digital advertising and community sponsorships",
      "logo": "newspaper-logos/sz/swazi-bridge.svg",
      "logoExplainer": "Green and gold emblem with stylized arch bridge 'SWAZI BRIDGE', symbolising community connection and national dialogue.",
      "sources": [
        "https://swazibridge.com"
      ]
    },
    {
      "id": "sz-independent-news-eswatini",
      "countryCode": "SZ",
      "name": "Independent News Eswatini",
      "founded": 2015,
      "frequency": "Weekly publication & digital portal",
      "format": "Tabloid publication & digital portal",
      "language": "English",
      "headquarters": "Mbabane",
      "owner": {
        "name": "Independent News Media Eswatini",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent commercial weekly; business news, SME financing, agricultural reform, and cultural commentary",
      "readership": {
        "metric": "Read by business professionals, agricultural cooperatives, and civil society leaders",
        "source": "Independent News Media 2023"
      },
      "revenueModel": "Print retail sales and local commercial advertising",
      "logo": "newspaper-logos/sz/independent-news-eswatini.svg",
      "logoExplainer": "Dark slate banner with clean white text 'INDEPENDENT NEWS ESWATINI', representing commercial and economic weekly reporting.",
      "sources": [
        "https://independentnews.co.sz"
      ]
    }
  ],
  "TD": [
    {
      "id": "td-tchadinfos",
      "countryCode": "TD",
      "name": "Tchadinfos",
      "founded": 2012,
      "frequency": "Continuous 24/7 digital news service",
      "format": "Digital multimedia portal & web TV",
      "language": "French, Arabic",
      "headquarters": "N'Djamena",
      "owner": {
        "name": "Mamadou Djimtebaye / Tchadinfos Media Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Leading independent digital multimedia network in Chad; breaking national news, politics, and youth entrepreneurship",
      "readership": {
        "metric": "Over 2.2 million monthly page views; premier online news destination in Chad",
        "source": "Tchadinfos Audience Review 2024"
      },
      "revenueModel": "Digital advertising, video production, and corporate media partnerships",
      "logo": "newspaper-logos/td/tchadinfos.svg",
      "logoExplainer": "Teal green title banner with bold white lettering 'tchadinfos', symbolising modern Chadian digital news innovation.",
      "sources": [
        "https://tchadinfos.com",
        "https://fr.wikipedia.org/wiki/Tchadinfos.com"
      ]
    },
    {
      "id": "td-alwihda-info",
      "countryCode": "TD",
      "name": "Alwihda Info",
      "nativeName": "الوحدة انفو",
      "englishTranslation": "Unity Info",
      "founded": 1994,
      "frequency": "Continuous digital newswire",
      "format": "Digital news portal & web daily",
      "language": "French, Arabic",
      "headquarters": "N'Djamena",
      "owner": {
        "name": "Djamil Ahmat / Alwihda Media Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent news portal; Sahelian regional security, political transitions, and human rights advocacy",
      "readership": {
        "metric": "Widely read across the Lake Chad Basin, CEMAC region, and diaspora with 1.5M monthly visits",
        "source": "Alwihda Info Analytics 2023"
      },
      "revenueModel": "Online banner advertising and media consulting",
      "logo": "newspaper-logos/td/alwihda-info.svg",
      "logoExplainer": "White banner featuring red and black font 'ALWIHDA INFO', representing national unity and comprehensive Sahel coverage.",
      "sources": [
        "https://www.alwihdainfo.com",
        "https://fr.wikipedia.org/wiki/Alwihda_Info"
      ]
    },
    {
      "id": "td-journal-le-pays",
      "countryCode": "TD",
      "name": "Le Pays",
      "englishTranslation": "The Country",
      "founded": 2011,
      "frequency": "Weekly newspaper & daily web portal",
      "format": "Tabloid & digital portal",
      "language": "French",
      "headquarters": "N'Djamena",
      "owner": {
        "name": "Madjiasra Nako / Le Pays Médias",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent investigative weekly; political governance, social inequalities, and environmental reporting in Chad",
      "readership": {
        "metric": "Leading investigative print weekly newspaper in N'Djamena",
        "source": "Union des Journalistes Tchadiens 2023"
      },
      "revenueModel": "Print retail sales and private advertisements",
      "logo": "newspaper-logos/td/journal-le-pays.svg",
      "logoExplainer": "Emerald green badge with white typography 'LE PAYS', reflecting agricultural resilience and independent public oversight.",
      "sources": [
        "https://lepaystchad.com"
      ]
    },
    {
      "id": "td-le-progres",
      "countryCode": "TD",
      "name": "Le Progrès",
      "englishTranslation": "The Progress",
      "founded": 1993,
      "frequency": "Daily newspaper",
      "format": "Tabloid daily paper",
      "language": "French",
      "headquarters": "N'Djamena",
      "owner": {
        "name": "Éditions Le Progrès (Abderahmane Koulamallah)",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic private daily newspaper in Chad; national political developments, civil service news, and civic commentary",
      "readership": {
        "metric": "Pioneer private daily publication in Chad with wide institutional circulation in the capital",
        "source": "Haute Autorité des Médias et de l'Audiovisuel (HAMA) 2023"
      },
      "revenueModel": "Print sales and official notices",
      "logo": "newspaper-logos/td/le-progrès.svg",
      "logoExplainer": "Deep navy blue masthead with white serif font 'LE PROGRÈS', symbolising historic democratic press evolution in Chad.",
      "sources": [
        "https://fr.wikipedia.org/wiki/Le_Progr%C3%A8s_(Tchad)"
      ]
    },
    {
      "id": "td-n-djamena-hebdo",
      "countryCode": "TD",
      "name": "N'Djaména Hebdo",
      "englishTranslation": "N'Djamena Weekly",
      "founded": 1989,
      "frequency": "Weekly newspaper",
      "format": "Tabloid publication",
      "language": "French",
      "headquarters": "N'Djamena",
      "owner": {
        "name": "Yaldet Bégoto Oulatar",
        "type": "Independent commercial media"
      },
      "editorialStance": "Historic pioneer of independent print journalism in Chad; courageous press freedom advocate and democratic commentary",
      "readership": {
        "metric": "Longest continuously operating independent weekly paper in Chad since 1989",
        "source": "Reporters Without Borders & HAMA Chad 2023"
      },
      "revenueModel": "Print retail sales and classified advertisements",
      "logo": "newspaper-logos/td/n-djamena-hebdo.svg",
      "logoExplainer": "White canvas displaying bold black masthead 'N'DJAMÉNA HEBDO', representing thirty-five years of independent Chadian press.",
      "sources": [
        "https://fr.wikipedia.org/wiki/N%27Djam%C3%A9na_Hebdo"
      ]
    }
  ],
  "TG": [
    {
      "id": "tg-togo-presse",
      "countryCode": "TG",
      "name": "Togo Presse",
      "nativeName": "Togo Presse",
      "englishTranslation": "Togo Press",
      "founded": 1962,
      "frequency": "Daily (Monday to Friday) morning newspaper",
      "format": "Broadsheet newspaper & digital portal (togopresse.tg)",
      "language": "French, Éwé, Kabyè",
      "headquarters": "Société d'Édition et de Presse (EDITOGO), Boulevard du 13 Janvier, Lomé",
      "owner": {
        "name": "Société d'Édition et de Presse (EDITOGO / Government of Togo)",
        "type": "State-owned publishing corporation"
      },
      "annualPublicFunding": {
        "total": "XOF 450 million",
        "perCapita": "XOF 52.00"
      },
      "editorialStance": "Togo's official national daily newspaper of record, published by EDITOGO since 1962; provides official coverage of presidential decrees, National Assembly debates, maritime port developments at the Autonomous Port of Lomé, and national culture",
      "readership": {
        "metric": "Circulation of 10,000 copies daily distributed throughout Lomé and the five administrative regions of Togo",
        "source": "EDITOGO Rapport d'Activité / Ministère de la Communication"
      },
      "revenueModel": "Official state announcements, legal notices, and newsstand sales",
      "logo": "newspaper-logos/tg/togo-presse.jpg",
      "logoExplainer": "Classic green and red emblem with bold serif title 'Togo-Presse', published continuously in Lomé since 1962 as the national daily newspaper of record.",
      "sources": [
        "https://togopresse.tg",
        "https://en.wikipedia.org/wiki/Media_of_Togo"
      ]
    }
  ],
  "TH": [
    {
      "id": "th-bangkok-post",
      "countryCode": "TH",
      "name": "Bangkok Post",
      "founded": 1946,
      "frequency": "Daily morning newspaper & continuous digital service",
      "format": "Broadsheet newspaper & digital news portal (bangkokpost.com)",
      "language": "English",
      "headquarters": "Bangkok Post Building, 136 Sunthorn Kosa Road, Khlong Toei, Bangkok",
      "owner": {
        "name": "Bangkok Post Public Company Limited (Chirathivat Family)",
        "type": "Publicly traded media corporation"
      },
      "editorialStance": "Thailand's oldest and most prestigious English-language newspaper of record, founded in 1946 by Alexander MacDonald and Prasit Lulitanond; renowned for authoritative coverage of royal affairs, ASEAN geopolitics, macroeconomic policy by the Bank of Thailand, and national business",
      "readership": {
        "metric": "Over 65,000 daily print readers and more than 4.5 million monthly unique digital visitors across Thailand, Southeast Asia, and globally",
        "source": "Bangkok Post Plc Annual Report 2023"
      },
      "revenueModel": "Digital paywall subscriptions, print circulation, and corporate display advertising",
      "logo": "newspaper-logos/th/bangkok-post.svg",
      "logoExplainer": "Navy blue background with elegant white serif lettering 'Bangkok Post', underlined by a warm gold dividing rule and founding year 1946 mark.",
      "sources": [
        "https://www.bangkokpost.com",
        "https://en.wikipedia.org/wiki/Bangkok_Post"
      ]
    },
    {
      "id": "th-thairath",
      "countryCode": "TH",
      "name": "Thai Rath",
      "nativeName": "ไทยรัฐ (Thai Rath)",
      "englishTranslation": "Thai State / State of Thailand",
      "founded": 1962,
      "frequency": "Daily morning newspaper & 24/7 multimedia portal",
      "format": "Broadsheet newspaper, TV station & news portal (thairath.co.th)",
      "language": "Thai",
      "headquarters": "1 Vibhavadi Rangsit Road, Chatuchak, Bangkok",
      "owner": {
        "name": "Thairath Group (Vacharaphol Family)",
        "type": "Private multimedia publishing conglomerate"
      },
      "editorialStance": "Thailand's highest-circulation and most influential mass-market daily newspaper, founded in 1962 by Kamphol Vacharaphol; known for sensational headlines, comprehensive regional crime and community reporting, populist political commentary, and extensive sports coverage",
      "readership": {
        "metric": "Print circulation estimated at over 600,000 copies daily and more than 15 million monthly digital visitors across Thairath Online and TV",
        "source": "Thairath Media Kit / Thailand Media Rating Association"
      },
      "revenueModel": "Mass print sales, nationwide commercial advertising, and digital video sponsorships",
      "logo": "newspaper-logos/th/thairath.jpg",
      "logoExplainer": "Signature emerald green field with white square badge bearing bold green 'TR', heavy impact typography 'THAIRATH', and yellow Thai script subtitle.",
      "sources": [
        "https://www.thairath.co.th",
        "https://en.wikipedia.org/wiki/Thai_Rath"
      ]
    },
    {
      "id": "th-matichon",
      "countryCode": "TH",
      "name": "Matichon",
      "nativeName": "มติชน (Matichon)",
      "englishTranslation": "Public Opinion",
      "founded": 1978,
      "frequency": "Daily morning newspaper",
      "format": "Broadsheet newspaper & digital portal (matichon.co.th)",
      "language": "Thai",
      "headquarters": "12 Thetsaban Narueman Road, Lat Yao, Chatuchak, Bangkok",
      "owner": {
        "name": "Matichon Public Company Limited",
        "type": "Publicly listed media corporation"
      },
      "editorialStance": "Thailand's premier intellectual and political daily newspaper of record, founded in 1978 by Khanchai Boonparn; maintains a progressive, pro-democracy, and analytical editorial stance, renowned for deep coverage of constitutional reforms, history, culture, and academic commentary",
      "readership": {
        "metric": "Circulation of over 100,000 daily copies and over 8 million monthly unique visitors across Matichon Online",
        "source": "Matichon Plc Annual Report 2023"
      },
      "revenueModel": "Print sales, book publishing, digital advertising, and policy conferences",
      "logo": "newspaper-logos/th/matichon.svg",
      "logoExplainer": "Clean white field with cerulean blue square containing Thai initials 'มช', dark blue sans-serif typography 'MATICHON', and bilingual subtitle.",
      "sources": [
        "https://www.matichon.co.th",
        "https://en.wikipedia.org/wiki/Matichon"
      ]
    },
    {
      "id": "th-daily-news",
      "countryCode": "TH",
      "name": "Daily News (Thailand)",
      "nativeName": "เดลินิวส์ (Daily News)",
      "englishTranslation": "Daily News",
      "founded": 1964,
      "frequency": "Daily morning newspaper",
      "format": "Broadsheet newspaper & online portal (dailynews.co.th)",
      "language": "Thai",
      "headquarters": "1/4 Vibhavadi Rangsit Road, Talat Bang Khen, Lak Si, Bangkok",
      "owner": {
        "name": "Si Pya Company Limited (Hetrakul Family)",
        "type": "Private publishing enterprise"
      },
      "editorialStance": "One of Thailand's oldest and second most-read mass daily newspapers, established in 1964 by Saeng Hetrakul; focuses on civic investigations, breaking crime reports, consumer rights advocacy, entertainment, and lotteries",
      "readership": {
        "metric": "Print circulation of approximately 450,000 copies daily distributed to all 77 provinces of Thailand",
        "source": "Thailand Newspaper Association Audit"
      },
      "revenueModel": "High-volume print retail sales and national consumer advertising",
      "logo": "newspaper-logos/th/daily-news.png",
      "logoExplainer": "Signature bright magenta-pink field with bold white impact typography 'DAILY NEWS' and light pink Thai script subtitle.",
      "sources": [
        "https://www.dailynews.co.th",
        "https://en.wikipedia.org/wiki/Daily_News_(Thailand)"
      ]
    }
  ],
  "TJ": [
    {
      "id": "tj-jumhuriyat",
      "countryCode": "TJ",
      "name": "Jumhuriyat",
      "nativeName": "Рӯзномаи «Ҷумҳурият»",
      "englishTranslation": "The Republic Newspaper",
      "founded": 1925,
      "frequency": "Three times weekly national newspaper",
      "format": "Broadsheet newspaper & digital edition (jumhuriyat.tj)",
      "language": "Tajik",
      "headquarters": "Saadi Sherozi Avenue 16, Dushanbe",
      "owner": {
        "name": "President of the Republic of Tajikistan and Government of Tajikistan",
        "type": "Official governmental newspaper of record"
      },
      "annualPublicFunding": {
        "total": "TJS 4.8 million",
        "perCapita": "TJS 0.48"
      },
      "editorialStance": "Oldest continuously published Tajik-language newspaper, founded in 1925 (originally as Idi Tojik); serves as the official gazette and newspaper of record of the Executive Office of the President, publishing state laws, economic programs, and historical essays",
      "readership": {
        "metric": "Circulation of over 30,000 copies per issue, distributed to all civil service bodies, schools, and regional jamoats",
        "source": "Ministry of Culture of the Republic of Tajikistan Press Register"
      },
      "revenueModel": "State budget funding, institutional mandatory subscriptions, and legal announcements",
      "logo": "newspaper-logos/tj/jumhuriyat.svg",
      "logoExplainer": "National emerald green field with classic white serif Cyrillic lettering 'ҶУМҲУРИЯТ', underlined by a golden divider bar and state gazette subtitle.",
      "sources": [
        "https://jumhuriyat.tj",
        "https://tg.wikipedia.org/wiki/%D2%B6%D1%83%D0%BC%D2%B cordance"
      ]
    }
  ],
  "TL": [
    {
      "id": "tl-suara-timor-lorosae",
      "countryCode": "TL",
      "name": "Suara Timor Lorosa'e",
      "officialName": "STL Media Group",
      "nativeName": "Suara Timor Lorosa'e",
      "englishTranslation": "Voice of the Eastern Sun",
      "founded": 1993,
      "frequency": "Daily newspaper (Monday–Saturday)",
      "format": "Broadsheet & digital network",
      "language": "Tetum, Portuguese, Indonesian",
      "headquarters": "Bairo Pite, Dili",
      "owner": {
        "name": "Salvador Ximenes Soares / STL Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Oldest continuously operating newspaper in Timor-Leste; historic voice during the independence struggle; parliamentary affairs, justice, and community news",
      "readership": {
        "metric": "Largest print circulation daily in Timor-Leste and multi-platform network with STL TV and STL Radio FM",
        "source": "STL Media Group Overview 2023"
      },
      "revenueModel": "Print sales, official advertisements, and commercial broadcast sponsorships",
      "logo": "newspaper-logos/tl/suara-timor-lorosae.svg",
      "logoExplainer": "Red and blue emblem displaying traditional sunrise motif and bold typography 'STL', symbolising the Voice of East Timor.",
      "sources": [
        "https://suara-timor-lorosae.com",
        "https://en.wikipedia.org/wiki/Suara_Timor_Lorosae"
      ]
    },
    {
      "id": "tl-timor-post",
      "countryCode": "TL",
      "name": "Timor Post",
      "nativeName": "Jornal Diário Timor Post",
      "englishTranslation": "Timor Post Daily",
      "founded": 2000,
      "frequency": "Daily newspaper",
      "format": "Tabloid publication & digital portal",
      "language": "Tetum, Portuguese",
      "headquarters": "Rua Bispo de Medeiros, Dili",
      "owner": {
        "name": "Timor Post Media Group",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent commercial daily newspaper; political commentary, civil society debates, anti-corruption reporting, and youth employment",
      "readership": {
        "metric": "Key daily newspaper in Dili read by civil servants, students, and diplomatic staff",
        "source": "Timor Post Corporate Kit 2024"
      },
      "revenueModel": "Print newspaper circulation, institutional advertising, and web banners",
      "logo": "newspaper-logos/tl/timor-post.svg",
      "logoExplainer": "Red and yellow title block with bold sans-serif lettering 'TIMOR POST', representing independent national journalism.",
      "sources": [
        "https://diariutimorpost.com",
        "https://en.wikipedia.org/wiki/Timor_Post"
      ]
    },
    {
      "id": "tl-jornal-independente",
      "countryCode": "TL",
      "name": "Jornal Independente",
      "englishTranslation": "Independent Newspaper",
      "founded": 2011,
      "frequency": "Daily newspaper",
      "format": "Tabloid & digital portal",
      "language": "Tetum, Portuguese",
      "headquarters": "Dili",
      "owner": {
        "name": "Grupo Independente Media",
        "type": "Independent commercial media"
      },
      "editorialStance": "Independent daily newspaper; investigative reporting, rural development, judicial accountability, and community human rights",
      "readership": {
        "metric": "Widely distributed daily newspaper across educational institutions and government ministries in Dili",
        "source": "Conselho de Imprensa de Timor-Leste 2023"
      },
      "revenueModel": "Print sales and local corporate advertisements",
      "logo": "newspaper-logos/tl/jornal-independente.svg",
      "logoExplainer": "Blue banner with white typography 'INDEPENDENTE', symbolising democratic transparency and press freedom in Timor-Leste.",
      "sources": [
        "https://independente.tl"
      ]
    },
    {
      "id": "tl-dilivox",
      "countryCode": "TL",
      "name": "Dili Vox",
      "englishTranslation": "Dili Voice",
      "founded": 2019,
      "frequency": "Continuous digital news service",
      "format": "Digital youth portal & Web TV",
      "language": "Tetum, English",
      "headquarters": "Dili",
      "owner": {
        "name": "Dili Vox Media",
        "type": "Independent commercial media"
      },
      "editorialStance": "Youth-oriented multimedia news platform; creative economy, environmental activism, technology startups, and civic education",
      "readership": {
        "metric": "Fastest-growing digital native outlet engaging Timorese youth with 300,000+ monthly digital interactions",
        "source": "Dili Vox Audience Metrics 2024"
      },
      "revenueModel": "Digital video advertising and non-governmental organization partnerships",
      "logo": "newspaper-logos/tl/dilivox.svg",
      "logoExplainer": "Modern neon green and dark slate icon 'DILI VOX', representing the voice of the young Timorese generation.",
      "sources": [
        "https://dilivox.com"
      ]
    }
  ],
  "TM": [
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
      "logoExplainer": "Clean white field with dark green Cyrillic serif lettering 'НЕЙТРАЛЬНЫЙ ТУРКМЕНИСТАН', gold divider line, and foundation year 1924 mark.",
      "sources": [
        "https://metbugat.gov.tm",
        "https://en.wikipedia.org/wiki/Neytralny_Turkmenistan"
      ]
    }
  ],
  "TN": [
    {
      "id": "tn-assabah",
      "countryCode": "TN",
      "name": "Assabah",
      "nativeName": "صحيفة الصباح",
      "englishTranslation": "The Morning",
      "founded": 1951,
      "frequency": "Daily morning newspaper",
      "format": "Broadsheet newspaper & digital portal (assabah.com.tn)",
      "language": "Arabic",
      "headquarters": "Rue de la Monnaie, Tunis",
      "owner": {
        "name": "Dar Assabah",
        "type": "Independent commercial publishing house"
      },
      "editorialStance": "Tunisia's oldest surviving independent Arabic daily newspaper, founded in 1951 by Habib Cheikhrouhou during the independence movement; celebrated for fearless political investigative pieces, trade union (UGTT) affairs, and social debate",
      "readership": {
        "metric": "Circulation of over 35,000 copies daily and more than 1 million monthly digital visits",
        "source": "Syndicat National des Journalistes Tunisiens (SNJT)"
      },
      "revenueModel": "Print newsstand sales, commercial advertising, and digital subscriptions",
      "logo": "newspaper-logos/tn/assabah.jpg",
      "logoExplainer": "White framed rectangle with brilliant red Arabic calligraphy 'الصباح • ASSABAH' and charcoal gray heritage subtitle.",
      "sources": [
        "https://www.assabah.com.tn",
        "https://en.wikipedia.org/wiki/Assabah_(newspaper)"
      ]
    }
  ],
  "TO": [
    {
      "id": "to-matangi-tonga",
      "countryCode": "TO",
      "name": "Matangi Tonga",
      "nativeName": "Matangi Tonga Online",
      "englishTranslation": "Winds of Tonga",
      "founded": 1986,
      "frequency": "Real-time 24/7 digital news service & quarterly magazine",
      "format": "Digital news portal & magazine (matangitonga.to)",
      "language": "English, Tongan",
      "headquarters": "Vava'u Press Ltd, Nuku'alofa, Tongatapu",
      "owner": {
        "name": "Vava'u Press Ltd (Pesi Fonua & Mary Fonua)",
        "type": "Independent private publishing house"
      },
      "editorialStance": "Tonga's premier independent newspaper of record, founded in 1986 by pioneering journalist Pesi Fonua; internationally revered for courageous, independent coverage of constitutional monarchy reforms, Supreme Court decisions, volcanic eruptions (Hunga Tonga), and Pacific climate resilience",
      "readership": {
        "metric": "Over 350,000 monthly pageviews, serving as the definitive primary news source for resident Tongans and the worldwide diaspora in New Zealand, Australia, and the US",
        "source": "Vava'u Press Readership Audit / Pacific Islands News Association (PINA)"
      },
      "revenueModel": "Digital display advertising, quarterly print subscriptions, and photo syndication",
      "logo": "newspaper-logos/to/matangi-tonga.svg",
      "logoExplainer": "Deep royal blue field with a crimson red circle displaying the national white cross, elegant white serif typography 'Matangi Tonga', and light blue subtitle.",
      "sources": [
        "https://matangitonga.to",
        "https://en.wikipedia.org/wiki/Matangi_Tonga"
      ]
    }
  ],
  "TR": [
    {
      "id": "tr-hurriyet",
      "countryCode": "TR",
      "name": "Hürriyet",
      "nativeName": "Hürriyet",
      "englishTranslation": "Liberty",
      "founded": 1948,
      "frequency": "Daily morning newspaper & 24/7 web edition",
      "format": "Broadsheet newspaper & news portal (hurriyet.com.tr)",
      "language": "Turkish, English (Hürriyet Daily News)",
      "headquarters": "Demirören Medya Center, 100. Yıl Mahallesi, Bağcılar, Istanbul",
      "owner": {
        "name": "Demirören Group",
        "type": "Commercial media conglomerate"
      },
      "editorialStance": "One of Turkey's most historically influential mainstream daily newspapers of record, founded in 1948 by Sedat Simavi; delivers extensive coverage of domestic politics, international diplomacy, business, economy, culture, and sports",
      "readership": {
        "metric": "Over 180,000 daily print copies and more than 25 million monthly unique digital visitors across its online editions",
        "source": "BİK (Basın İlan Kurumu) Circulation Audit / Gemius"
      },
      "revenueModel": "Print retail sales, commercial display advertising, and digital ad revenue",
      "logo": "newspaper-logos/tr/hurriyet.svg",
      "logoExplainer": "Clean white field with massive red impact typography 'HÜRRİYET' and black subtitle 'TÜRKİYE'NİN AÇILIŞ KAPISI • EST. 1948'.",
      "sources": [
        "https://www.hurriyet.com.tr",
        "https://en.wikipedia.org/wiki/H%C3%BCrriyet"
      ]
    },
    {
      "id": "tr-cumhuriyet",
      "countryCode": "TR",
      "name": "Cumhuriyet",
      "nativeName": "Cumhuriyet",
      "englishTranslation": "The Republic",
      "founded": 1924,
      "frequency": "Daily morning newspaper",
      "format": "Broadsheet newspaper & digital edition (cumhuriyet.com.tr)",
      "language": "Turkish",
      "headquarters": "Prof. Nurettin Mazhar Öktel Sokak No: 2, Şişli, Istanbul",
      "owner": {
        "name": "Cumhuriyet Foundation (Cumhuriyet Vakfı)",
        "type": "Independent non-profit publishing foundation"
      },
      "editorialStance": "Historic center-left secular daily newspaper, established in 1924 upon the directive of Atatürk by Yunus Nadi; acclaimed for rigorous investigative journalism, staunch defense of secular republicanism, rule of law, and civil liberties",
      "readership": {
        "metric": "Circulation of approximately 45,000 copies daily and more than 6 million monthly online readers",
        "source": "Cumhuriyet Vakfı Annual Report / BİK"
      },
      "revenueModel": "Print subscriptions, digital paywall, reader donations, and classifieds",
      "logo": "newspaper-logos/tr/cumhuriyet.svg",
      "logoExplainer": "White field with historic red serif masthead 'Cumhuriyet', underlined by a horizontal black rule and founding year 1924 subtitle.",
      "sources": [
        "https://www.cumhuriyet.com.tr",
        "https://en.wikipedia.org/wiki/Cumhuriyet"
      ]
    },
    {
      "id": "tr-sabah",
      "countryCode": "TR",
      "name": "Sabah",
      "nativeName": "Sabah",
      "englishTranslation": "Morning",
      "founded": 1985,
      "frequency": "Daily morning newspaper",
      "format": "Broadsheet newspaper & news portal (sabah.com.tr)",
      "language": "Turkish, English (Daily Sabah)",
      "headquarters": "Turkuvaz Medya Merkezi, Güzeltepe Mahallesi, Eyüpsultan, Istanbul",
      "owner": {
        "name": "Turkuvaz Media Group (Kalyon Group)",
        "type": "Commercial media publishing conglomerate"
      },
      "editorialStance": "Major national daily morning newspaper, founded in 1985 by Dinç Bilgin; maintains a conservative, pro-government editorial viewpoint, known for widespread coverage of infrastructure megaprojects, economy, football, and popular lifestyle",
      "readership": {
        "metric": "Print circulation exceeding 200,000 copies daily and over 20 million monthly digital visits",
        "source": "BİK Circulation Bulletin / Turkuvaz Media"
      },
      "revenueModel": "Commercial print display advertising, government public notices, and newsstand sales",
      "logo": "newspaper-logos/tr/sabah.png",
      "logoExplainer": "Vibrant crimson red background with large white impact typography 'SABAH' and light pink national readership tagline.",
      "sources": [
        "https://www.sabah.com.tr",
        "https://en.wikipedia.org/wiki/Sabah_(newspaper)"
      ]
    },
    {
      "id": "tr-sozcu",
      "countryCode": "TR",
      "name": "Sözcü",
      "nativeName": "Sözcü",
      "englishTranslation": "Spokesperson",
      "founded": 2007,
      "frequency": "Daily morning newspaper & digital portal",
      "format": "Broadsheet newspaper, TV station & portal (sozcu.com.tr)",
      "language": "Turkish",
      "headquarters": "Halkalı Merkez Mahallesi, Basın Ekspres Yolu, Küçükçekmece, Istanbul",
      "owner": {
        "name": "Estetik Yayıncılık A.Ş. (Burak Akbay)",
        "type": "Independent private media publishing company"
      },
      "editorialStance": "Turkey's highest-circulation Kemalist, secularist, and opposition daily newspaper, founded in 2007; known for outspoken criticism of the ruling coalition, investigative corruption reports, economic hardships coverage, and defense of the secular republic",
      "readership": {
        "metric": "Circulation of over 220,000 copies daily, frequently ranking as the top-selling newspaper at Turkish newsstands, plus over 22 million monthly digital visits",
        "source": "BİK Official Circulation Report / Gemius Analytics"
      },
      "revenueModel": "Print single-copy newsstand sales, digital advertising, and Sözcü TV broadcasting revenue",
      "logo": "newspaper-logos/tr/sozcu.png",
      "logoExplainer": "Dark charcoal black field with vibrant red sans-serif lettering 'SÖZCÜ', a crisp white divider bar, and white civic slogan subtitle.",
      "sources": [
        "https://www.sozcu.com.tr",
        "https://en.wikipedia.org/wiki/S%C3%B6zc%C3%BC"
      ]
    }
  ],
  "TT": [
    {
      "id": "tt-trinidad-express",
      "countryCode": "TT",
      "name": "Trinidad and Tobago Express",
      "founded": 1967,
      "frequency": "Daily morning newspaper & 24/7 web edition",
      "format": "Broadsheet newspaper & news portal (trinidadexpress.com)",
      "language": "English",
      "headquarters": "35-37 Independence Square, Port of Spain",
      "owner": {
        "name": "Caribbean Communications Network (CCN / One Caribbean Media)",
        "type": "Publicly traded media conglomerate"
      },
      "editorialStance": "Trinidad and Tobago's leading daily newspaper, founded in 1967 by journalists following a strike at the Guardian; renowned for fearless investigative journalism, daily political columns, deep coverage of Parliament at the Red House, energy sector developments, and Carnival arts",
      "readership": {
        "metric": "Print circulation of approximately 65,000 copies daily (and over 100,000 for the Sunday Express) with over 3 million monthly web pageviews",
        "source": "Market Facts & Opinions (MFO) Media Survey / One Caribbean Media Annual Report 2023"
      },
      "revenueModel": "Print newsstand sales, corporate advertising, classifieds, and digital ads",
      "logo": "newspaper-logos/tt/trinidad-express.jpg",
      "logoExplainer": "White background with heavy crimson red typography 'EXPRESS', solid black 'TRINIDAD', and charcoal national newspaper subtitle.",
      "sources": [
        "https://trinidadexpress.com",
        "https://en.wikipedia.org/wiki/Trinidad_and_Tobago_Express"
      ]
    },
    {
      "id": "tt-newsday",
      "countryCode": "TT",
      "name": "Trinidad and Tobago Newsday",
      "founded": 1993,
      "frequency": "Daily morning newspaper",
      "format": "Compact tabloid newspaper & web edition (newsday.co.tt)",
      "language": "English",
      "headquarters": "17 Pembroke Street, Port of Spain",
      "owner": {
        "name": "Daily News Limited",
        "type": "Independent commercial publishing company"
      },
      "editorialStance": "Major national daily morning newspaper founded in 1993 by Therese Mills; recognized for sharp community reporting, judicial court coverage, educational features, parliamentary debates, and Caribbean business analysis",
      "readership": {
        "metric": "Circulation of over 50,000 copies daily across Trinidad and Tobago, widely read by commuter and working-class audiences",
        "source": "MFO Media Survey Trinidad & Tobago"
      },
      "revenueModel": "Print sales, commercial display advertisements, and digital banners",
      "logo": "newspaper-logos/tt/newsday.jpg",
      "logoExplainer": "Vibrant royal blue background with heavy white sans-serif masthead 'NEWSDAY' and golden yellow national slogan bar.",
      "sources": [
        "https://newsday.co.tt",
        "https://en.wikipedia.org/wiki/Trinidad_and_Tobago_Newsday"
      ]
    },
    {
      "id": "tt-guardian",
      "countryCode": "TT",
      "name": "Trinidad and Tobago Guardian",
      "founded": 1917,
      "frequency": "Daily morning newspaper",
      "format": "Broadsheet newspaper & digital portal (guardian.co.tt)",
      "language": "English",
      "headquarters": "22-24 St. Vincent Street, Port of Spain",
      "owner": {
        "name": "Guardian Media Limited (ANSA McAL Group)",
        "type": "Publicly listed multimedia company"
      },
      "editorialStance": "Trinidad and Tobago's oldest daily newspaper of record, founded in 1917; delivers comprehensive business and financial reporting, constitutional commentary, national energy infrastructure analyses, and cultural criticism",
      "readership": {
        "metric": "Over 40,000 print copies daily and more than 2 million monthly digital visits",
        "source": "Guardian Media Limited Annual Report 2023"
      },
      "revenueModel": "Commercial print ads, newsstand sales, and cross-media broadcast syndication",
      "logo": "newspaper-logos/tt/guardian.jpg",
      "logoExplainer": "Classic dark charcoal black background with historic Old English serif masthead 'Trinidad Guardian', gold divider bar, and heritage subtitle.",
      "sources": [
        "https://www.guardian.co.tt",
        "https://en.wikipedia.org/wiki/Trinidad_and_Tobago_Guardian"
      ]
    }
  ],
  "TV": [
    {
      "id": "tv-tuvalu-echoes",
      "countryCode": "TV",
      "name": "Tuvalu Echoes",
      "nativeName": "Sikuleo o Tuvalu",
      "englishTranslation": "Voice / Echoes of Tuvalu",
      "founded": 1983,
      "frequency": "Fortnightly national newspaper",
      "format": "Print newspaper & government gazette",
      "language": "Tuvaluan, English",
      "headquarters": "Funafuti",
      "owner": {
        "name": "Tuvalu Media Department",
        "type": "Government-published national newspaper"
      },
      "editorialStance": "Tuvalu's historic national print newspaper, published by the government since 1983; chronicles parliamentary acts of the Parliament of Tuvalu (Palamene o Tuvalu), outer-island community council (Falekaupule) meetings, climate adaptation projects, and international ocean conferences",
      "readership": {
        "metric": "Distributed to all island councils, schools, maneapas (meeting halls), and overseas diplomatic missions in Suva and New York",
        "source": "Tuvalu Media Review / UNESCO Pacific"
      },
      "revenueModel": "Government publishing subsidy and retail sales",
      "logo": "newspaper-logos/tv/tuvalu-echoes.png",
      "logoExplainer": "National coat of arms of Tuvalu featuring the Maneapa meeting house and eight shells, representing the islands and state information organ.",
      "sources": [
        "https://en.wikipedia.org/wiki/Tuvalu_Echoes",
        "https://www.unesco.org/en/countries/tv"
      ]
    }
  ],
  "TZ": [
    {
      "id": "tz-daily-news",
      "countryCode": "TZ",
      "name": "Daily News",
      "founded": 1930,
      "frequency": "Daily morning newspaper",
      "format": "Broadsheet newspaper & digital news portal (dailynews.co.tz)",
      "language": "English",
      "headquarters": "Nelson Mandela Road, Tabata Relini, Dar es Salaam",
      "owner": {
        "name": "Tanzania Standard Newspapers Limited (TSN / Government of Tanzania)",
        "type": "State-owned publishing corporation"
      },
      "annualPublicFunding": {
        "total": "TZS 4.2 billion",
        "perCapita": "TZS 65.00"
      },
      "editorialStance": "Tanzania's oldest and largest English-language daily newspaper, established in 1930; serves as the national newspaper of record, reporting on the National Assembly (Bunge la Tanzania), bilateral EAC and SADC trade, mining and infrastructure developments, and wildlife conservation",
      "readership": {
        "metric": "Print circulation of approximately 40,000 copies daily and more than 1.5 million monthly digital pageviews",
        "source": "TSN Annual Report / Tanzania Audit Bureau of Circulations"
      },
      "revenueModel": "State institutional notices, commercial display advertising, and newsstand sales",
      "logo": "newspaper-logos/tz/daily-news.png",
      "logoExplainer": "Deep navy field with classic white Times serif title 'Daily News', underlined by an authoritative yellow divider and gold heritage subtitle.",
      "sources": [
        "https://dailynews.co.tz",
        "https://en.wikipedia.org/wiki/Daily_News_(Tanzania)"
      ]
    },
    {
      "id": "tz-the-citizen",
      "countryCode": "TZ",
      "name": "The Citizen",
      "founded": 2004,
      "frequency": "Daily morning newspaper & continuous digital coverage",
      "format": "Broadsheet newspaper & news portal (thecitizen.co.tz)",
      "language": "English",
      "headquarters": "Plot 34/35, Mandela Road, Tabata, Dar es Salaam",
      "owner": {
        "name": "Mwananchi Communications Ltd (Nation Media Group)",
        "type": "Publicly listed regional media conglomerate"
      },
      "editorialStance": "Leading independent English-language daily newspaper in Tanzania, founded in 2004; acclaimed for authoritative coverage of macroeconomics, Dar es Salaam port logistics, constitutional debates, private enterprise, and Pan-African trade",
      "readership": {
        "metric": "Circulation of over 25,000 daily copies and over 2 million monthly digital readers across East Africa",
        "source": "Nation Media Group Annual Report 2023 / GeoPoll Media Ratings"
      },
      "revenueModel": "Corporate subscriptions, commercial print advertising, and digital subscriptions",
      "logo": "newspaper-logos/tz/the-citizen.svg",
      "logoExplainer": "Clean white field with bold navy sans-serif lettering 'THE CITIZEN' and striking crimson red subtitle bar.",
      "sources": [
        "https://www.thecitizen.co.tz",
        "https://en.wikipedia.org/wiki/The_Citizen_(Tanzania)"
      ]
    }
  ],
  "UA": [
    {
      "id": "ua-kyiv-post",
      "countryCode": "UA",
      "name": "Kyiv Post",
      "founded": 1995,
      "frequency": "Daily digital edition & weekly print publication",
      "format": "Compact print newspaper & digital portal (kyivpost.com)",
      "language": "English, Ukrainian, Arabic, French",
      "headquarters": "Yaroslaviv Val Street 14A, Kyiv",
      "owner": {
        "name": "KADORR Group (Adnan Kivan)",
        "type": "Commercial media enterprise"
      },
      "editorialStance": "Ukraine's oldest English-language newspaper, founded in 1995 by Jed Sunden; serves as an essential diplomatic and business chronicle of Ukraine, providing coverage of national politics, bilateral defense agreements, and foreign investment",
      "readership": {
        "metric": "Over 2 million monthly digital readers worldwide across government ministries, think tanks, embassies, and academic centers",
        "source": "Kyiv Post Audience Data"
      },
      "revenueModel": "Digital subscriptions, corporate advertising, and event conferences",
      "logo": "newspaper-logos/ua/kyiv-post.jpg",
      "logoExplainer": "Charcoal black field with bold white serif typography 'Kyiv Post', a Ukrainian blue divider bar, and golden-yellow foundation 1995 subtitle.",
      "sources": [
        "https://www.kyivpost.com",
        "https://en.wikipedia.org/wiki/Kyiv_Post"
      ]
    },
    {
      "id": "ua-kyiv-independent",
      "countryCode": "UA",
      "name": "The Kyiv Independent",
      "founded": 2021,
      "frequency": "24/7 continuous digital journalism & multimedia desks",
      "format": "Digital newspaper & investigative portal (kyivindependent.com)",
      "language": "English",
      "headquarters": "Kyiv",
      "owner": {
        "name": "Kyiv Independent Media LLC (Journalist Staff Cooperative)",
        "type": "Independent journalist-owned media company"
      },
      "editorialStance": "Acclaimed English-language independent media organization founded in November 2021 by the former editorial staff of the Kyiv Post; gained global prominence for fearless on-the-ground war correspondence, documenting war crimes, and tracking international military aid",
      "readership": {
        "metric": "Over 8 million monthly unique web visitors and more than 2 million global social media followers",
        "source": "The Kyiv Independent Transparency Report 2023"
      },
      "revenueModel": "Reader community memberships, international journalistic grants, and editorial newsletters",
      "logo": "newspaper-logos/ua/kyiv-independent.svg",
      "logoExplainer": "Pure black background featuring a yellow circular badge with bold black 'K', heavy white sans-serif 'THE KYIV', and vibrant yellow 'INDEPENDENT'.",
      "sources": [
        "https://kyivindependent.com",
        "https://en.wikipedia.org/wiki/The_Kyiv_Independent"
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
      "logo": "newspaper-logos/ua/ukrainska-pravda.svg",
      "logoExplainer": "White field with red square tile bearing white Cyrillic initials 'УП', classic black serif masthead 'Українська правда', and red investigative subtitle.",
      "sources": [
        "https://www.pravda.com.ua",
        "https://en.wikipedia.org/wiki/Ukrainska_Pravda"
      ]
    }
  ],
  "UG": [
    {
      "id": "ug-new-vision",
      "countryCode": "UG",
      "name": "New Vision",
      "founded": 1986,
      "frequency": "Daily morning newspaper & continuous digital service",
      "format": "Broadsheet newspaper & news portal (newvision.co.ug)",
      "language": "English",
      "headquarters": "Plot 19/21, 1st Street, Industrial Area, Kampala",
      "owner": {
        "name": "Vision Group (New Vision Printing & Publishing Company Ltd / 53% Government of Uganda)",
        "type": "Publicly traded media corporation with state majority stake"
      },
      "annualPublicFunding": {
        "total": "UGX 6.5 billion",
        "perCapita": "UGX 140"
      },
      "editorialStance": "Uganda's leading national daily newspaper of record, established in 1986 by an Act of Parliament; provides comprehensive coverage of the Parliament of Uganda, government policies, East African Community (EAC) integration, infrastructure projects, and agriculture",
      "readership": {
        "metric": "Print circulation of approximately 35,000 copies daily and more than 6 million monthly unique digital visitors",
        "source": "Vision Group Annual Report 2023 / Audit Bureau of Circulations"
      },
      "revenueModel": "Commercial print advertising, digital subscriptions, government notices, and retail sales",
      "logo": "newspaper-logos/ug/new-vision.svg",
      "logoExplainer": "Signature crimson red field with bold white typography 'NEW VISION' and warm yellow Vision Group subtitle.",
      "sources": [
        "https://www.newvision.co.ug",
        "https://en.wikipedia.org/wiki/New_Vision_(newspaper)"
      ]
    },
    {
      "id": "ug-daily-monitor",
      "countryCode": "UG",
      "name": "Daily Monitor",
      "founded": 1992,
      "frequency": "Daily morning newspaper",
      "format": "Broadsheet newspaper & digital edition (monitor.co.ug)",
      "language": "English",
      "headquarters": "Plot 29-35, 8th Street, Industrial Area, Namuwongo, Kampala",
      "owner": {
        "name": "Monitor Publications Limited (Nation Media Group)",
        "type": "Commercial independent media conglomerate"
      },
      "editorialStance": "Uganda's premier independent daily newspaper, founded in 1992 by veteran journalists including Wafula Oguttu and Charles Onyango-Obbo; internationally recognized for independent investigative reporting, holding power accountable, tracking public expenditure, and promoting democratic debate",
      "readership": {
        "metric": "Circulation of over 25,000 daily copies and over 4.5 million monthly unique digital visitors across East Africa",
        "source": "Nation Media Group Annual Report 2023 / GeoPoll Uganda"
      },
      "revenueModel": "Single-copy retail sales, corporate advertising, and digital sponsorships",
      "logo": "newspaper-logos/ug/daily-monitor.svg",
      "logoExplainer": "White field with bold navy sans-serif lettering 'Daily Monitor', a crimson red divider line, and charcoal slogan bar.",
      "sources": [
        "https://www.monitor.co.ug",
        "https://en.wikipedia.org/wiki/Daily_Monitor"
      ]
    },
    {
      "id": "ug-the-observer",
      "countryCode": "UG",
      "name": "The Observer (Uganda)",
      "founded": 2004,
      "frequency": "Three times weekly (Monday, Wednesday, Friday)",
      "format": "Tabloid newspaper & digital portal (observer.ug)",
      "language": "English",
      "headquarters": "Tagore Crescent, Kamwokya, Kampala",
      "owner": {
        "name": "Observer Media Ltd (Journalist Staff Cooperative)",
        "type": "Independent journalist-owned media cooperative"
      },
      "editorialStance": "Respected independent Ugandan newspaper, established in 2004 by breaking-away journalists from the Monitor; focuses on in-depth political dossiers, investigative exposés, parliamentary committees, educational reform, and arts and culture",
      "readership": {
        "metric": "Print circulation of 12,000 copies per issue and over 1 million monthly digital pageviews",
        "source": "Uganda Journalists Association (UJA) Audit"
      },
      "revenueModel": "Print sales, corporate display ads, and online banner advertising",
      "logo": "newspaper-logos/ug/the-observer.svg",
      "logoExplainer": "Dark charcoal background featuring an eye roundel emblem with gold iris, classic white serif 'The Observer' title, and yellow subtitle.",
      "sources": [
        "https://observer.ug",
        "https://en.wikipedia.org/wiki/The_Observer_(Uganda)"
      ]
    }
  ],
  "US": [
    {
      "id": "us-nyt",
      "countryCode": "US",
      "name": "The New York Times (NYT)",
      "founded": 1851,
      "frequency": "Daily morning newspaper & continuous global digital journalism",
      "format": "Broadsheet newspaper & digital subscription ecosystem (nytimes.com)",
      "language": "English, Spanish, Chinese",
      "headquarters": "620 Eighth Avenue, Manhattan, New York City, New York",
      "owner": {
        "name": "The New York Times Company (Ochs-Sulzberger Family Trust)",
        "type": "Publicly traded media corporation with family voting control"
      },
      "editorialStance": "America's premier national newspaper of record, founded in 1851 by Henry Jarvis Raymond and George Jones; holder of 137 Pulitzer Prizes (more than any other news organization); offers world-leading investigative journalism, cultural criticism, foreign correspondence, and deep national political reporting",
      "readership": {
        "metric": "Over 10.5 million total paying subscribers across digital and print platforms, with over 100 million monthly unique digital visitors",
        "source": "The New York Times Company Q4 2023 Earnings Report / SEC Filings"
      },
      "revenueModel": "Paid digital subscriptions (bundle, news, cooking, games, audio), print subscriptions, and premium brand advertising",
      "logo": "newspaper-logos/us/nyt.svg",
      "logoExplainer": "Classic white field with the historic blackletter masthead 'The New York Times', horizontal divider rule, and iconic slogan 'ALL THE NEWS THAT'S FIT TO PRINT'.",
      "sources": [
        "https://www.nytimes.com",
        "https://en.wikipedia.org/wiki/The_New_York_Times"
      ]
    },
    {
      "id": "us-washington-post",
      "countryCode": "US",
      "name": "The Washington Post",
      "founded": 1877,
      "frequency": "Daily morning newspaper",
      "format": "Broadsheet newspaper & digital news portal (washingtonpost.com)",
      "language": "English",
      "headquarters": "One Franklin Square, 1301 K Street NW, Washington, D.C.",
      "owner": {
        "name": "Nash Holdings LLC (Jeff Bezos)",
        "type": "Private holding company"
      },
      "editorialStance": "Leading American daily newspaper of record based in the nation's capital, founded in 1877; legendary for investigative reporting that broke the Watergate scandal under Bob Woodward and Carl Bernstein; delivers unparalleled reporting on the White House, Congress, the Pentagon, and federal courts",
      "readership": {
        "metric": "Over 2.5 million digital subscribers and approximately 150,000 daily print circulation, with over 60 million monthly digital readers",
        "source": "Alliance for Audited Media (AAM) / The Washington Post Press Office"
      },
      "revenueModel": "Digital paywall subscriptions, print deliveries, and digital corporate advertising",
      "logo": "newspaper-logos/us/washington-post.svg",
      "logoExplainer": "Midnight black background with grand white gothic masthead 'The Washington Post', white dividing line, and silver italic motto 'Democracy Dies in Darkness'.",
      "sources": [
        "https://www.washingtonpost.com",
        "https://en.wikipedia.org/wiki/The_Washington_Post"
      ]
    },
    {
      "id": "us-wsj",
      "countryCode": "US",
      "name": "The Wall Street Journal (WSJ)",
      "founded": 1889,
      "frequency": "Daily (Monday to Saturday) newspaper",
      "format": "Broadsheet newspaper & digital subscription service (wsj.com)",
      "language": "English, Japanese, Chinese",
      "headquarters": "1211 Avenue of the Americas, Manhattan, New York City, New York",
      "owner": {
        "name": "Dow Jones & Company (News Corp)",
        "type": "Commercial multinational media publishing corporation"
      },
      "editorialStance": "America's premier business, financial, and economic daily newspaper of record, founded in 1889 by Charles Dow, Edward Jones, and Charles Bergstresser; holder of 39 Pulitzer Prizes; delivers authoritative news on corporate finance, Federal Reserve policy, capital markets, international trade, and conservative editorial page commentary",
      "readership": {
        "metric": "Over 4 million total paying subscribers, including more than 3.5 million digital-only subscribers, making it one of the largest paid circulation newspapers in the US",
        "source": "News Corp Fiscal Year 2023 Earnings / AAM"
      },
      "revenueModel": "Digital subscriptions, print delivery subscriptions, and high-value corporate financial advertising",
      "logo": "newspaper-logos/us/wsj.svg",
      "logoExplainer": "Clean white field with traditional black serif capitals 'THE WALL STREET JOURNAL.', horizontal divider line, and Dow Jones business subtitle.",
      "sources": [
        "https://www.wsj.com",
        "https://en.wikipedia.org/wiki/The_Wall_Street_Journal"
      ]
    },
    {
      "id": "us-usa-today",
      "countryCode": "US",
      "name": "USA Today",
      "founded": 1982,
      "frequency": "Daily (Monday to Friday) morning newspaper",
      "format": "Broadsheet newspaper & digital news portal (usatoday.com)",
      "language": "English",
      "headquarters": "7950 Jones Branch Drive, McLean, Virginia",
      "owner": {
        "name": "Gannett Co., Inc.",
        "type": "Publicly traded national media corporation"
      },
      "editorialStance": "Leading American national daily newspaper, founded in 1982 by Al Neuharth; pioneered full-color printing, concise infographics, and accessible nationwide reporting covering news, money, sports, and entertainment across all 50 states",
      "readership": {
        "metric": "Over 150,000 print copies daily and more than 75 million monthly unique visitors across USA TODAY Network digital platforms",
        "source": "Gannett Co., Inc. Annual Report 2023 / Comscore"
      },
      "revenueModel": "Print newsstand sales, hotel distribution agreements, digital paywall subscriptions, and programmatic digital advertising",
      "logo": "newspaper-logos/us/usa-today.jpeg",
      "logoExplainer": "Vibrant USA Today cyan blue field with iconic white circular badge, bold white Futura typography 'USA TODAY', and white Gannett subtitle.",
      "sources": [
        "https://www.usatoday.com",
        "https://en.wikipedia.org/wiki/USA_Today"
      ]
    }
  ],
  "UY": [
    {
      "id": "uy-el-pais-uy",
      "countryCode": "UY",
      "name": "El País (Uruguay)",
      "nativeName": "El País",
      "englishTranslation": "The Country",
      "founded": 1918,
      "frequency": "Daily morning newspaper & 24/7 web edition",
      "format": "Broadsheet newspaper & online portal (elpais.com.uy)",
      "language": "Spanish",
      "headquarters": "Zelmar Michelini 1287, Montevideo",
      "owner": {
        "name": "El País S.A. (Scheck and Beltrán Families)",
        "type": "Private commercial publishing company"
      },
      "editorialStance": "Uruguay's most historically influential and widely circulated daily newspaper of record, founded in 1918 by Leonel Aguirre, Eduardo Rodríguez Larreta, and Washington Beltrán; maintains a center-right, independent National Party (Blanco) aligned philosophy with comprehensive political and cultural reporting",
      "readership": {
        "metric": "Circulation of over 35,000 copies daily and more than 3.5 million monthly unique digital visitors across Uruguay and the Southern Cone",
        "source": "Instituto Verificador de Circulaciones (IVC) / El País Media Pack"
      },
      "revenueModel": "Print sales, digital subscriptions, and commercial advertising",
      "logo": "newspaper-logos/uy/el-pais-uy.svg",
      "logoExplainer": "Uruguayan royal blue field with golden Sol de Mayo circular emblem, bold white serif 'EL PAÍS' lettering, and golden foundation 1918 subtitle.",
      "sources": [
        "https://www.elpais.com.uy",
        "https://en.wikipedia.org/wiki/El_Pa%C3%ADs_(Uruguay)"
      ]
    },
    {
      "id": "uy-el-observador",
      "countryCode": "UY",
      "name": "El Observador",
      "nativeName": "El Observador",
      "englishTranslation": "The Observer",
      "founded": 1991,
      "frequency": "Daily digital publication & weekly print digest",
      "format": "Digital news portal & print weekly (elobservador.com.uy)",
      "language": "Spanish",
      "headquarters": "Cuareim 1447, Montevideo",
      "owner": {
        "name": "Grupo América (Gerardo Werthein and Gabriel Hochbaum)",
        "type": "Commercial media investment group"
      },
      "editorialStance": "Major Uruguayan independent news organization, founded in 1991 by Ricardo Peirano; recognized for modern investigative journalism, macroeconomic and agro-industrial analysis, and breaking political reporting",
      "readership": {
        "metric": "Over 2.8 million monthly digital readers and over 40,000 paid digital subscribers (Member)",
        "source": "El Observador Public Metrics / Comscore Uruguay"
      },
      "revenueModel": "Digital subscriptions, corporate brand advertising, and digital sponsorships",
      "logo": "newspaper-logos/uy/el-observador.svg",
      "logoExplainer": "White field with an orange square badge enclosing an eye roundel, heavy navy sans-serif 'EL OBSERVADOR', and orange Montevideo subtitle.",
      "sources": [
        "https://www.elobservador.com.uy",
        "https://en.wikipedia.org/wiki/El_Observador_(Uruguay)"
      ]
    },
    {
      "id": "uy-la-diaria",
      "countryCode": "UY",
      "name": "La Diaria",
      "nativeName": "la diaria",
      "englishTranslation": "The Daily",
      "founded": 2006,
      "frequency": "Daily (Monday to Friday) newspaper",
      "format": "Compact newspaper & online news platform (ladiaria.com.uy)",
      "language": "Spanish",
      "headquarters": "Treinta y Tres 1479, Ciudad Vieja, Montevideo",
      "owner": {
        "name": "Cooperativa La Diaria (worker-owned media cooperative)",
        "type": "Worker-owned journalistic cooperative"
      },
      "editorialStance": "Pioneering worker-owned cooperative daily newspaper, founded in 2006; center-left, socially progressive, and independent, famous for rigorous investigative journalism into state security files, social movements, environmental policy, and feminist debates",
      "readership": {
        "metric": "Over 20,000 paying subscriber-members (community model), ranking among the highest subscriber-supported cooperative papers in Latin America",
        "source": "La Diaria Balance Social Cooperativo 2023"
      },
      "revenueModel": "Direct reader cooperative subscriptions and cultural event partnerships",
      "logo": "newspaper-logos/uy/la-diaria.svg",
      "logoExplainer": "Deep teal field with graceful white serif typography 'la diaria', an orange horizontal rule, and bright tangerine cooperative subtitle.",
      "sources": [
        "https://ladiaria.com.uy",
        "https://en.wikipedia.org/wiki/La_Diaria"
      ]
    },
    {
      "id": "uy-busqueda",
      "countryCode": "UY",
      "name": "Búsqueda",
      "nativeName": "Búsqueda",
      "englishTranslation": "Search / Quest",
      "founded": 1972,
      "frequency": "Weekly (Thursday) investigative news magazine",
      "format": "Tabloid investigative newspaper (busqueda.com.uy)",
      "language": "Spanish",
      "headquarters": "Avenida 18 de Julio 1222, Montevideo",
      "owner": {
        "name": "Editorial Melian S.A.",
        "type": "Independent publishing house"
      },
      "editorialStance": "Uruguay's premier investigative political weekly newspaper, established in 1972; widely regarded as an indispensable publication for government ministers, senators, economists, and legal scholars, famous for breaking major political and banking scandals",
      "readership": {
        "metric": "Circulation of approximately 16,000 weekly copies and over 800,000 monthly digital visits",
        "source": "IVC Uruguay / Búsqueda Media Kit"
      },
      "revenueModel": "Single-issue print sales, annual corporate subscriptions, and financial advertising",
      "logo": "newspaper-logos/uy/busqueda.svg",
      "logoExplainer": "Solid black field with fine gold border, prominent white Bodoni serif typography 'BÚSQUEDA', and gold national investigative weekly subtitle.",
      "sources": [
        "https://www.busqueda.com.uy",
        "https://en.wikipedia.org/wiki/B%C3%BAsqueda_(newspaper)"
      ]
    }
  ],
  "UZ": [
    {
      "id": "uz-daryo-uz",
      "countryCode": "UZ",
      "name": "Daryo.uz",
      "nativeName": "Daryo.uz",
      "englishTranslation": "River Uzbekistan",
      "founded": 2013,
      "frequency": "24/7 continuous internet publication",
      "format": "Digital news portal & mobile application (daryo.uz)",
      "language": "Uzbek, Russian, English",
      "headquarters": "Matbuotchilar Street 32, Tashkent",
      "owner": {
        "name": "Simple Networking Solutions LLC",
        "type": "Commercial digital news company"
      },
      "editorialStance": "Popular digital news platform in Uzbekistan, launched in 2013; provides breaking political developments, economic analytics, cultural profiles, international news, and sports",
      "readership": {
        "metric": "Over 5 million monthly unique visitors and one of the highest daily mobile app engagement rates in the country",
        "source": "Daryo Analytics / Google Play Store"
      },
      "revenueModel": "Digital advertising, mobile app promotional placements, and corporate partnerships",
      "logo": "newspaper-logos/uz/daryo.png",
      "logoExplainer": "Clean white background with blue rounded emblem displaying white river wave motif, blue bold 'Daryo.uz' typography, and slate gray subtitle.",
      "sources": [
        "https://daryo.uz",
        "https://en.wikipedia.org/wiki/Media_of_Uzbekistan"
      ]
    }
  ],
  "VA": [
    {
      "id": "va-losservatore-romano",
      "countryCode": "VA",
      "name": "L'Osservatore Romano",
      "officialName": "L'Osservatore Romano",
      "englishTranslation": "The Roman Observer",
      "founded": 1861,
      "frequency": "Daily (Italian) and weekly international editions in six languages",
      "format": "Broadsheet print & digital news portal (osservatoreromano.va)",
      "language": "Italian, English, French, Spanish, Portuguese, German, Polish",
      "headquarters": "Vatican City",
      "owner": {
        "name": "Dicastery for Communication (Holy See)",
        "type": "Official Catholic Church governance entity"
      },
      "editorialStance": "Historic daily newspaper of the Holy See; papal teachings, speeches, diplomatic relations, and Catholic theological reflection",
      "readership": {
        "metric": "Circulated globally across 130+ nations to dioceses, diplomatic missions, and academic institutions worldwide",
        "source": "Dicastery for Communication Holy See Annual Report 2023"
      },
      "revenueModel": "Holy See operational budget, subscriptions, and international book sales",
      "logo": "newspaper-logos/va/osservatore-romano.png",
      "logoExplainer": "Historic Latin banner featuring the papal coat of arms and crossed keys of Saint Peter with the motto 'Unicuique suum' and 'Non praevalebunt'.",
      "sources": [
        "https://www.osservatoreromano.va",
        "https://en.wikipedia.org/wiki/L%27Osservatore_Romano"
      ]
    },
    {
      "id": "va-donne-chiesa-mondo",
      "countryCode": "VA",
      "name": "Donne Chiesa Mondo",
      "officialName": "Donne Chiesa Mondo",
      "englishTranslation": "Women Church World",
      "founded": 2012,
      "frequency": "Monthly cultural review",
      "format": "Monthly magazine insert & digital edition",
      "language": "Italian, Spanish, French, English",
      "headquarters": "Vatican City",
      "owner": {
        "name": "L'Osservatore Romano / Dicastery for Communication",
        "type": "Official Catholic Church media"
      },
      "editorialStance": "Women's roles in the Catholic Church, biblical theology, female leadership in religious and secular society, and cultural dialogue",
      "readership": {
        "metric": "Distributed internationally as a monthly insert in L'Osservatore Romano in multiple languages",
        "source": "L'Osservatore Romano Editorial Board"
      },
      "revenueModel": "Holy See communication funding and periodical subscriptions",
      "logo": "newspaper-logos/va/donne-chiesa-mondo.svg",
      "logoExplainer": "Deep magenta masthead with Didot serif typography and the subtitle 'Mensile dell'Osservatore Romano'.",
      "sources": [
        "https://www.osservatoreromano.va/it/donne-chiesa-mondo.html",
        "https://en.wikipedia.org/wiki/L%27Osservatore_Romano"
      ]
    }
  ],
  "VC": [
    {
      "id": "vc-searchlight",
      "countryCode": "VC",
      "name": "Searchlight",
      "nativeName": "Searchlight",
      "englishTranslation": "Searchlight",
      "founded": 1995,
      "frequency": "Bi-weekly newspaper (Tuesday & Friday)",
      "format": "Tabloid & digital news portal (searchlight.vc)",
      "language": "English",
      "headquarters": "Lower Kingstown Park, Kingstown",
      "owner": {
        "name": "Interactive Media Ltd (Norma Keizer / Clare Keizer)",
        "type": "Independent commercial publisher"
      },
      "editorialStance": "The premier independent newspaper of Saint Vincent and the Grenadines; acclaimed for journalistic integrity, in-depth investigative reports, parliamentary analysis, community affairs, and literary contributions",
      "readership": {
        "metric": "Over 7,500 print copies twice weekly and over 600,000 monthly digital readers worldwide",
        "source": "Interactive Media Ltd 2023"
      },
      "revenueModel": "Print sales, commercial advertising, and digital subscriptions",
      "logo": "newspaper-logos/vc/searchlight.svg",
      "logoExplainer": "Vibrant orange rectangular banner featuring bold modern white sans-serif wordmark 'SEARCHLIGHT' with clean subtitle.",
      "sources": [
        "https://searchlight.vc",
        "https://en.wikipedia.org/wiki/Saint_Vincent_and_the_Grenadines"
      ]
    },
    {
      "id": "vc-the-vincentian",
      "countryCode": "VC",
      "name": "The Vincentian",
      "nativeName": "The Vincentian",
      "englishTranslation": "The Vincentian",
      "founded": 1907,
      "frequency": "Weekly national newspaper (Friday)",
      "format": "Broadsheet & digital news portal (thevincentian.com)",
      "language": "English",
      "headquarters": "Bedford Street, Kingstown",
      "owner": {
        "name": "The Vincentian Publishing Co. Ltd",
        "type": "Independent commercial newspaper"
      },
      "editorialStance": "Historic newspaper of record for Saint Vincent and the Grenadines; established in 1907; over a century of continuous publication covering national political life, agriculture (bananas and arrowroot), court cases, and Grenadines heritage",
      "readership": {
        "metric": "Over 6,000 weekly print circulation, maintaining deep institutional trust across the nation",
        "source": "The Vincentian Publishing Co. 2023"
      },
      "revenueModel": "Print sales, public notices, and corporate advertising",
      "logo": "newspaper-logos/vc/the-vincentian.svg",
      "logoExplainer": "Deep navy field featuring distinguished classical white serif typography 'The Vincentian' and golden date 'Established 1907'.",
      "sources": [
        "https://thevincentian.com",
        "https://en.wikipedia.org/wiki/Saint_Vincent_and_the_Grenadines"
      ]
    },
    {
      "id": "vc-news784",
      "countryCode": "VC",
      "name": "News784",
      "nativeName": "News784",
      "englishTranslation": "News 784",
      "founded": 2016,
      "frequency": "Continuous 24/7 digital news service",
      "format": "Digital news portal (news784.com)",
      "language": "English",
      "headquarters": "Kingstown",
      "owner": {
        "name": "News784 Media Group",
        "type": "Independent digital news publisher"
      },
      "editorialStance": "Popular digital news platform named after the country's international telephone area code (784); provides real-time breaking headlines, police reports, national development projects, and cultural stories",
      "readership": {
        "metric": "Over 500,000 monthly visits, with high engagement among the Vincentian diaspora in North America and the UK",
        "source": "News784 Web Metrics 2023"
      },
      "revenueModel": "Online display advertising and sponsored content",
      "logo": "newspaper-logos/vc/news784.svg",
      "logoExplainer": "Marine blue card with modern sans-serif white word 'NEWS' paired with golden yellow area code '784'.",
      "sources": [
        "https://news784.com",
        "https://en.wikipedia.org/wiki/Saint_Vincent_and_the_Grenadines"
      ]
    },
    {
      "id": "vc-iwitness-news",
      "countryCode": "VC",
      "name": "iWitness News",
      "nativeName": "iWitness News",
      "englishTranslation": "iWitness News",
      "founded": 2009,
      "frequency": "Continuous digital investigative news service",
      "format": "Digital news portal & video journalism (iwnsvg.com)",
      "language": "English",
      "headquarters": "Kingstown",
      "owner": {
        "name": "Kenton X. Chance",
        "type": "Independent investigative journalism outlet"
      },
      "editorialStance": "Award-winning independent investigative news outlet founded by renowned journalist Kenton Chance; highly acclaimed for fearless investigative reporting on governmental accountability, natural disasters, court reporting, and human rights",
      "readership": {
        "metric": "Over 850,000 monthly unique page views, widely regarded as the most authoritative investigative news platform in SVG",
        "source": "iWitness News Analytics 2023"
      },
      "revenueModel": "Digital subscriptions, reader donations, and ethical local advertising",
      "logo": "newspaper-logos/vc/iwitness-news.svg",
      "logoExplainer": "Sleek dark charcoal field featuring crimson circle with white italic 'i' beside bold white title 'iWitness' and red 'NEWS SVG'.",
      "sources": [
        "https://www.iwnsvg.com",
        "https://en.wikipedia.org/wiki/Saint_Vincent_and_the_Grenadines"
      ]
    }
  ],
  "VE": [
    {
      "id": "ve-el-universal",
      "countryCode": "VE",
      "name": "El Universal",
      "nativeName": "El Universal",
      "englishTranslation": "The Universal",
      "founded": 1909,
      "frequency": "Daily morning newspaper & continuous digital portal",
      "format": "Broadsheet newspaper & online edition (eluniversal.com)",
      "language": "Spanish",
      "headquarters": "Avenida Urdaneta, Esquina de Ánimas, Caracas",
      "owner": {
        "name": "Epalisticia S.L. / Private Media Consortium",
        "type": "Commercial media publishing company"
      },
      "editorialStance": "One of Venezuela's oldest and most prestigious daily newspapers of record, founded in 1909 by poet Andrés Mata; historically conservative and business-oriented, covering National Assembly legislation, PDVSA oil output, economic policies, culture, and sports",
      "readership": {
        "metric": "Over 4 million monthly digital readers across Venezuela and the worldwide Venezuelan diaspora",
        "source": "El Universal Media Kit / Comscore Venezuela"
      },
      "revenueModel": "Digital subscriptions, programmatic advertising, and commercial classifieds",
      "logo": "newspaper-logos/ve/el-universal.svg",
      "logoExplainer": "White field with dark blue globe emblem, classic navy serif typography 'EL UNIVERSAL', and dark gray 1909 foundation subtitle.",
      "sources": [
        "https://www.eluniversal.com",
        "https://en.wikipedia.org/wiki/El_Universal_(Caracas)"
      ]
    },
    {
      "id": "ve-el-nacional",
      "countryCode": "VE",
      "name": "El Nacional",
      "nativeName": "El Nacional",
      "englishTranslation": "The National",
      "founded": 1943,
      "frequency": "Real-time 24/7 digital news service",
      "format": "Digital news portal & web edition (elnacional.com)",
      "language": "Spanish",
      "headquarters": "Los Cortijos de Lourdes, Caracas (editorial desks in Caracas and Madrid)",
      "owner": {
        "name": "Grupo Editorial El Nacional (Miguel Henrique Otero)",
        "type": "Independent publishing house"
      },
      "editorialStance": "Historic Venezuelan daily newspaper, founded in 1943 by celebrated author Miguel Otero Silva; renowned for intellectual rigor, investigative reporting into corruption, defense of democratic freedoms, and prominent cultural essays",
      "readership": {
        "metric": "Over 6 million monthly unique digital visitors worldwide, serving as a primary independent news source for the Venezuelan diaspora",
        "source": "El Nacional Audience Analytics / WAN-IFRA"
      },
      "revenueModel": "Digital subscriptions, programmatic advertising, and independent donor support",
      "logo": "newspaper-logos/ve/el-nacional.svg",
      "logoExplainer": "Deep navy field with historic white serif typography 'EL NACIONAL', crimson divider line, and red founding year 1943 subtitle.",
      "sources": [
        "https://www.elnacional.com",
        "https://en.wikipedia.org/wiki/El_Nacional_(Venezuela)"
      ]
    },
    {
      "id": "ve-ultimas-noticias",
      "countryCode": "VE",
      "name": "Últimas Noticias",
      "nativeName": "Últimas Noticias",
      "englishTranslation": "Latest News",
      "founded": 1941,
      "frequency": "Daily morning newspaper",
      "format": "Tabloid newspaper & web portal (ultimasnoticias.com.ve)",
      "language": "Spanish",
      "headquarters": "Avenida Rómulo Gallegos, La Urbina, Caracas",
      "owner": {
        "name": "Grupo Últimas Noticias (subsidiary of Latam Media Holding)",
        "type": "Commercial media group"
      },
      "editorialStance": "Venezuela's highest-circulation daily morning newspaper, founded in 1941 by prominent journalists including Miguel Ángel Capriles; maintains a popular, working-class editorial focus with extensive coverage of community social programs, public transport, crime, and baseball",
      "readership": {
        "metric": "Historically circulated over 150,000 copies daily; currently reaches over 5 million monthly web readers",
        "source": "Grupo Últimas Noticias Commercial Dossier"
      },
      "revenueModel": "Mass print sales, commercial display advertising, and digital banners",
      "logo": "newspaper-logos/ve/ultimas-noticias.png",
      "logoExplainer": "Vibrant crimson red background with large white impact typography 'ÚLTIMAS NOTICIAS' and warm yellow Caracas 1941 tagline.",
      "sources": [
        "https://ultimasnoticias.com.ve",
        "https://en.wikipedia.org/wiki/%C3%9Altimas_Noticias"
      ]
    }
  ],
  "VN": [
    {
      "id": "vn-tuoi-tre",
      "countryCode": "VN",
      "name": "Tuổi Trẻ",
      "nativeName": "Báo Tuổi Trẻ",
      "englishTranslation": "Youth Newspaper",
      "founded": 1975,
      "frequency": "Daily morning newspaper & continuous digital portal",
      "format": "Broadsheet newspaper & digital platform (tuoitre.vn)",
      "language": "Vietnamese, English (Tuoi Tre News)",
      "headquarters": "60A Hoàng Văn Thụ, Phường 9, Phú Nhuận, Ho Chi Minh City",
      "owner": {
        "name": "Ho Chi Minh Communist Youth Union of Ho Chi Minh City",
        "type": "Mass organization media publisher"
      },
      "editorialStance": "One of Vietnam's highest-circulation and most influential daily newspapers, founded in Ho Chi Minh City in 1975; renowned for hard-hitting investigative journalism, anti-corruption reports, consumer rights advocacy, and coverage of youth culture and education",
      "readership": {
        "metric": "Print circulation of approximately 300,000 copies daily and more than 18 million monthly unique visitors online",
        "source": "Tuổi Trẻ Media Pack / Vietnam Internet Network Information Center (VNNIC)"
      },
      "revenueModel": "Print newsstand sales, corporate commercial advertising, and digital advertisements",
      "logo": "newspaper-logos/vn/tuoi-tre.svg",
      "logoExplainer": "White field with red circular roundel bearing white 'T', prominent red Impact masthead 'TUỔI TRẺ', and royal blue youth daily subtitle.",
      "sources": [
        "https://tuoitre.vn",
        "https://en.wikipedia.org/wiki/Tu%E1%BB%95i_Tr%E1%BA%BB"
      ]
    },
    {
      "id": "vn-thanh-nien",
      "countryCode": "VN",
      "name": "Thanh Niên",
      "nativeName": "Báo Thanh Niên",
      "englishTranslation": "Young People / Youth",
      "founded": 1986,
      "frequency": "Daily morning newspaper",
      "format": "Broadsheet newspaper & online edition (thanhnien.vn)",
      "language": "Vietnamese, English",
      "headquarters": "268-270 Nguyễn Đình Chiểu, Phường Võ Thị Sáu, Quận 3, Ho Chi Minh City",
      "owner": {
        "name": "Vietnam United Youth League",
        "type": "Socio-political youth organization publisher"
      },
      "editorialStance": "Major national daily morning newspaper, established in 1986 at the inception of the Đổi Mới economic reforms; acclaimed for investigative exposés on environmental issues, legal affairs, macroeconomic modernization, and sports",
      "readership": {
        "metric": "Print circulation of approximately 250,000 copies daily and over 15 million monthly digital readers",
        "source": "Thanh Niên Advertising Kit / VNNIC"
      },
      "revenueModel": "Print sales, commercial display advertisements, and digital programmatic ads",
      "logo": "newspaper-logos/vn/thanh-nien.svg",
      "logoExplainer": "Deep royal blue field with heavy white sans-serif typography 'THANH NIÊN' and bright yellow youth league subtitle.",
      "sources": [
        "https://thanhnien.vn",
        "https://en.wikipedia.org/wiki/Thanh_Ni%C3%AAn"
      ]
    },
    {
      "id": "vn-nhan-dan",
      "countryCode": "VN",
      "name": "Nhân Dân",
      "nativeName": "Báo Nhân Dân",
      "englishTranslation": "The People",
      "founded": 1951,
      "frequency": "Daily morning newspaper of record",
      "format": "Broadsheet newspaper & digital portal (nhandan.vn)",
      "language": "Vietnamese, English, Chinese, French, Russian, Spanish",
      "headquarters": "71 Hàng Trống, Hoàn Kiếm, Hanoi",
      "owner": {
        "name": "Central Committee of the Communist Party of Vietnam",
        "type": "Official party newspaper of record"
      },
      "annualPublicFunding": {
        "total": "VND 420 billion",
        "perCapita": "VND 4,200"
      },
      "editorialStance": "Official central organ and newspaper of record of the Communist Party of Vietnam, founded in 1951 during the First Indochina War; publishes ideological directives, National Assembly enactments, resolutions of the Politburo, and national economic plans",
      "readership": {
        "metric": "Print circulation of 200,000 copies daily, distributed to all party branches, government ministries, schools, and armed forces units across Vietnam",
        "source": "Báo Nhân Dân Annual Audit"
      },
      "revenueModel": "State institutional appropriations, mandatory public sector subscriptions, and official announcements",
      "logo": "newspaper-logos/vn/nhan-dan.svg",
      "logoExplainer": "National red background with golden five-pointed star, refined white Times serif 'Nhân Dân' title, and yellow central organ subtitle.",
      "sources": [
        "https://nhandan.vn",
        "https://en.wikipedia.org/wiki/Nh%C3%A2n_D%C3%A2n"
      ]
    },
    {
      "id": "vn-vnexpress",
      "countryCode": "VN",
      "name": "VnExpress",
      "founded": 2001,
      "frequency": "Continuous 24/7 digital news publication",
      "format": "Digital-only online newspaper (vnexpress.net)",
      "language": "Vietnamese, English (VnExpress International)",
      "headquarters": "FPT Tower, 10 Phạm Văn Bạch, Cầu Giấy, Hanoi",
      "owner": {
        "name": "FPT Online (subsidiary of FPT Corporation)",
        "type": "Commercial digital technology and media enterprise"
      },
      "editorialStance": "Vietnam's most widely read digital-only news publication, established in 2001 by FPT Corporation; renowned for fast-breaking national and international news, technology trends, business innovations, personal finance, and lifestyle",
      "readership": {
        "metric": "Over 40 million monthly unique visitors and more than 1.5 billion monthly pageviews, ranking as the most popular digital news medium in Vietnam",
        "source": "Google Analytics / Similarweb Vietnam / VNNIC"
      },
      "revenueModel": "Digital display advertising, sponsored native articles, and video content sponsorships",
      "logo": "newspaper-logos/vn/vnexpress.svg",
      "logoExplainer": "White background with ruby red circular badge bearing a white play arrow, bold crimson 'VnExpress' wordmark, and grey readership subtitle.",
      "sources": [
        "https://vnexpress.net",
        "https://en.wikipedia.org/wiki/VnExpress"
      ]
    }
  ],
  "VU": [
    {
      "id": "vu-daily-post",
      "countryCode": "VU",
      "name": "Vanuatu Daily Post",
      "founded": 1993,
      "frequency": "Daily (Tuesday to Saturday) morning newspaper",
      "format": "Tabloid print newspaper & digital portal (dailypost.vu)",
      "language": "English, Bislama",
      "headquarters": "Trading Post House, Kumul Highway, Port Vila, Efate",
      "owner": {
        "name": "Trading Post Limited (Marc Neil-Jones & Dan McGarry)",
        "type": "Independent commercial media company"
      },
      "editorialStance": "Vanuatu's sole independent daily newspaper, founded in 1993; internationally acclaimed for fearless investigative journalism into governance, political corruption, foreign passport schemes, customary land disputes, and cyclone reconstruction across all 83 islands",
      "readership": {
        "metric": "Print circulation of approximately 6,000 copies daily and more than 200,000 monthly digital visits",
        "source": "Media Association of Vanuatu (MAV) / Daily Post Media Kit"
      },
      "revenueModel": "Newsstand retail sales, commercial display ads, and classified notices",
      "logo": "newspaper-logos/vu/daily-post.jpg",
      "logoExplainer": "White field with red star emblem, black serif typography 'Vanuatu Daily Post', a red dividing rule, and green Port Vila daily subtitle.",
      "sources": [
        "https://www.dailypost.vu",
        "https://en.wikipedia.org/wiki/Vanuatu_Daily_Post"
      ]
    }
  ],
  "WS": [
    {
      "id": "ws-savali",
      "countryCode": "WS",
      "name": "Savali",
      "nativeName": "Savali",
      "englishTranslation": "Courier / Messenger",
      "founded": 1905,
      "frequency": "Weekly official government newspaper and gazette",
      "format": "Broadsheet & digital gazette (savalinews.com)",
      "language": "Samoan, English",
      "headquarters": "Government Building, Matagialalua, Apia",
      "owner": {
        "name": "Government of Samoa (Ministry of the Prime Minister and Cabinet)",
        "type": "Official state newspaper & gazette"
      },
      "annualPublicFunding": {
        "total": "WST 1.2 million",
        "perCapita": "WST 5.75"
      },
      "editorialStance": "Samoa's historic official national government publication, established in 1905; publishes official parliamentary proceedings (Fono), Head of State proclamations (O le Ao o le Malo), village fa'amatai council rulings, and national development programs in both Samoan and English",
      "readership": {
        "metric": "Over 5,000 weekly print copies distributed to village pulenu'u (mayors), government ministries, schools, and churches across Upolu and Savai'i",
        "source": "Ministry of Prime Minister & Cabinet Samoa 2023"
      },
      "revenueModel": "State government budget subsidy and official government notices",
      "logo": "newspaper-logos/ws/savali.svg",
      "logoExplainer": "Regal Pacific royal blue card with proud white serif capitals 'SAVALI' accented with red subtitle 'GOVERNMENT OF SAMOA GAZETTE'.",
      "sources": [
        "https://savalinews.com",
        "https://en.wikipedia.org/wiki/Savali"
      ]
    },
    {
      "id": "ws-samoa-observer",
      "countryCode": "WS",
      "name": "Samoa Observer",
      "nativeName": "Samoa Observer",
      "englishTranslation": "Samoa Observer",
      "founded": 1978,
      "frequency": "Daily newspaper (Monday–Sunday)",
      "format": "Broadsheet & digital portal (samoaobserver.ws)",
      "language": "English, Samoan",
      "headquarters": "Beach Road, Apia",
      "owner": {
        "name": "Samoa Observer Co. Ltd (Savea Sano Malifa & Misa Vicky Lepou)",
        "type": "Independent commercial publisher"
      },
      "editorialStance": "Samoa's leading independent daily newspaper; internationally renowned for upholding press freedom across the Pacific (recipient of Commonwealth Press Union and World Press Freedom awards); fearless coverage of political transparency, environmental stewardship, and Pacific regional diplomacy",
      "readership": {
        "metric": "Over 8,000 daily print circulation with more than 1.5 million monthly digital page views, read globally by the Samoan diaspora",
        "source": "Samoa Observer Media Profile 2023"
      },
      "revenueModel": "Print newsstand sales, digital subscriptions, and display advertising",
      "logo": "newspaper-logos/ws/samoa-observer.svg",
      "logoExplainer": "Deep oceanic blue field featuring refined white serif capitals 'SAMOA OBSERVER' underscored with red tagline 'SAMOA’S ONLY INDEPENDENT DAILY'.",
      "sources": [
        "https://www.samoaobserver.ws",
        "https://en.wikipedia.org/wiki/Samoa_Observer"
      ]
    },
    {
      "id": "ws-talamua-media",
      "countryCode": "WS",
      "name": "Talamua Media",
      "nativeName": "Talamua Media & Publications",
      "englishTranslation": "First Harvest News",
      "founded": 1995,
      "frequency": "Continuous digital news service & monthly periodical",
      "format": "Digital news portal & magazine (talamua.com)",
      "language": "Samoan, English",
      "headquarters": "Apia",
      "owner": {
        "name": "Talamua Media (Apulu Lance Polu)",
        "type": "Independent news media organisation"
      },
      "editorialStance": "Pioneering Samoan news service founded in 1995 by veteran journalist Apulu Lance Polu; committed to rigorous investigative reporting, environmental changes across the Pacific, customary land tenure rights, and cultural preservation",
      "readership": {
        "metric": "Over 450,000 monthly digital visitors, serving local communities and overseas Samoan families in New Zealand, Australia, and the US",
        "source": "Talamua Media Analytics 2023"
      },
      "revenueModel": "Digital advertising, media consulting, and subscriptions",
      "logo": "newspaper-logos/ws/talamua-media.svg",
      "logoExplainer": "Polynesian emerald green banner displaying bold white block wordmark 'TALAMUA' with golden yellow subtitle.",
      "sources": [
        "https://talamua.com",
        "https://en.wikipedia.org/wiki/Media_of_Samoa"
      ]
    },
    {
      "id": "ws-samoa-global-news",
      "countryCode": "WS",
      "name": "Samoa Global News",
      "nativeName": "Samoa Global News",
      "englishTranslation": "Samoa Global News",
      "founded": 2018,
      "frequency": "Continuous 24/7 digital news service",
      "format": "Digital news portal & video network (samoaglobalnews.com)",
      "language": "English, Samoan",
      "headquarters": "Lotopa, Apia",
      "owner": {
        "name": "Samoa Global News Ltd (Sulamanaia Fetaomi Tapu-Tuiloma)",
        "type": "Independent digital news enterprise"
      },
      "editorialStance": "Fast-growing independent digital digital news publication; specializes in breaking news, live parliamentary updates, supreme court hearings, rugby championships (Manu Samoa), and community achievements",
      "readership": {
        "metric": "Over 700,000 monthly digital readers with one of the most active social media news followings in the South Pacific",
        "source": "Samoa Global News Web Traffic 2023"
      },
      "revenueModel": "Digital advertising, live stream sponsorships, and corporate partnerships",
      "logo": "newspaper-logos/ws/samoa-global-news.svg",
      "logoExplainer": "Pacific marine blue card with crisp white sans-serif masthead 'SAMOA GLOBAL NEWS' underscored with crimson subtitle.",
      "sources": [
        "https://samoaglobalnews.com",
        "https://en.wikipedia.org/wiki/Media_of_Samoa"
      ]
    },
    {
      "id": "ws-newsline-samoa",
      "countryCode": "WS",
      "name": "Newsline Samoa",
      "nativeName": "Newsline Samoa",
      "englishTranslation": "Newsline Samoa",
      "founded": 1995,
      "frequency": "Bi-weekly newspaper (Sunday & Wednesday)",
      "format": "Compact tabloid & digital portal",
      "language": "English, Samoan",
      "headquarters": "Saleufi, Apia",
      "owner": {
        "name": "Newsline Media Ltd",
        "type": "Commercial newspaper publisher"
      },
      "editorialStance": "Established bi-weekly independent newspaper; provides accessible coverage of local municipal issues, commercial business developments, education, and village council affairs",
      "readership": {
        "metric": "Over 4,000 print copies per issue distributed throughout Apia and suburban villages",
        "source": "Newsline Media Profile 2023"
      },
      "revenueModel": "Retail print sales and classified advertising",
      "logo": "newspaper-logos/ws/newsline-samoa.svg",
      "logoExplainer": "Dark graphite card displaying refined white serif masthead 'Newsline Samoa' and bright cyan subtitle.",
      "sources": [
        "https://www.facebook.com/newslinesamoa",
        "https://en.wikipedia.org/wiki/Media_of_Samoa"
      ]
    }
  ],
  "YE": [
    {
      "id": "ye-al-ayyam",
      "countryCode": "YE",
      "name": "Al-Ayyam",
      "nativeName": "صحيفة الأيام",
      "englishTranslation": "The Days",
      "founded": 1958,
      "frequency": "Daily morning newspaper",
      "format": "Broadsheet newspaper & digital portal (alayyam.info)",
      "language": "Arabic",
      "headquarters": "Queen Arwa Road, Crater, Aden",
      "owner": {
        "name": "Al-Ayyam Foundation for Press and Publishing (Bashraheel Family)",
        "type": "Independent family-owned media publishing company"
      },
      "editorialStance": "Yemen's oldest independent daily newspaper, founded in Aden in 1958 by Muhammad Ali Bashraheel; celebrated for fearless reporting on Southern Yemeni regional autonomy, port logistics in the Gulf of Aden, civil liberties, and community culture",
      "readership": {
        "metric": "Over 40,000 daily print copies distributed across Aden, Hadramawt, and southern governorates, alongside over 1.2 million monthly web readers",
        "source": "YPS Audit / Al-Ayyam Media Profile"
      },
      "revenueModel": "Print newsstand sales, corporate commercial advertising, and digital ads",
      "logo": "newspaper-logos/ye/al-ayyam.png",
      "logoExplainer": "Deep royal blue field with majestic white Arabic calligraphy 'صحيفة الأيام', red divider rule, and light pink Aden heritage subtitle.",
      "sources": [
        "https://www.alayyam.info",
        "https://en.wikipedia.org/wiki/Al-Ayyam_(Yemen)"
      ]
    },
    {
      "id": "ye-al-masdar",
      "countryCode": "YE",
      "name": "Al-Masdar Online",
      "nativeName": "المصدر أونلاين",
      "englishTranslation": "The Source Online",
      "founded": 2006,
      "frequency": "Continuous 24/7 digital news service",
      "format": "Digital news portal & former daily print paper (almasdaronline.com)",
      "language": "Arabic, English",
      "headquarters": "Sana'a / Aden",
      "owner": {
        "name": "Al-Masdar Media Corporation (Samir Jubran)",
        "type": "Independent commercial news organization"
      },
      "editorialStance": "Prominent independent Yemeni news publication, founded in 2006 by journalist Samir Jubran; internationally recognized for brave investigative reporting into corruption, armed conflict tracking, political dialogue, and humanitarian relief efforts",
      "readership": {
        "metric": "Over 2 million monthly digital pageviews across Yemen and the Yemeni diaspora in Saudi Arabia, Egypt, and the West",
        "source": "Google Analytics / Al-Masdar Press Briefing"
      },
      "revenueModel": "Digital banner advertising, research syndication, and reader contributions",
      "logo": "newspaper-logos/ye/al-masdar.svg",
      "logoExplainer": "White background with orange circle bearing white 'M', vibrant burnt orange Arabic title 'المصدر أونلاين', and dark slate grey subtitle.",
      "sources": [
        "https://almasdaronline.com",
        "https://en.wikipedia.org/wiki/Al-Masdar_(Yemen)"
      ]
    }
  ],
  "ZA": [
    {
      "id": "za-mail-and-guardian",
      "countryCode": "ZA",
      "name": "Mail & Guardian",
      "founded": 1985,
      "frequency": "Weekly print edition & continuous online journalism",
      "format": "Broadsheet newspaper & digital investigative platform (mg.co.za)",
      "language": "English",
      "headquarters": "26 Jorissen Street, Braamfontein, Johannesburg, Gauteng",
      "owner": {
        "name": "Media Development Investment Fund (MDIF) & M&G Staff",
        "type": "Independent non-profit media investment / trust"
      },
      "editorialStance": "Renowned South African investigative weekly newspaper, founded during the state of emergency in 1985 as the Weekly Mail; acclaimed for groundbreaking investigative exposés on state capture, corruption, environmental crises, and social justice across Southern Africa",
      "readership": {
        "metric": "Paid weekly print circulation of approximately 25,000 copies and over 2 million monthly unique online visitors",
        "source": "Audit Bureau of Circulations of South Africa (ABC SA) / M&G Annual"
      },
      "revenueModel": "Print sales, digital subscriptions, donor grant funding, and advertising",
      "logo": "newspaper-logos/za/mail-and-guardian.png",
      "logoExplainer": "Signature bold red rectangular field with white square box containing the iconic serif 'M&G' monogram and white masthead lettering.",
      "sources": [
        "https://mg.co.za",
        "https://en.wikipedia.org/wiki/Mail_%26_Guardian"
      ]
    },
    {
      "id": "za-sunday-times",
      "countryCode": "ZA",
      "name": "Sunday Times",
      "founded": 1906,
      "frequency": "Weekly (Sunday)",
      "format": "Broadsheet newspaper & digital edition on TimesLIVE (timeslive.co.za)",
      "language": "English",
      "headquarters": "Hill on Empire, 16 Empire Road, Parktown, Johannesburg",
      "owner": {
        "name": "Arena Holdings (Pty) Ltd",
        "type": "Private media company"
      },
      "editorialStance": "South Africa's largest-circulation Sunday newspaper, founded in 1906; famous for hard-hitting investigative exposés by its Insight investigative team, deep political analysis of the ANC and opposition parties, business reporting, and cultural commentary",
      "readership": {
        "metric": "Print circulation of over 120,000 copies weekly with estimated readership exceeding 1.8 million readers per Sunday",
        "source": "ABC South Africa Q4 2023 / Publisher Research Council"
      },
      "revenueModel": "Single-copy retail sales, home delivery subscriptions, and high-volume commercial print advertising",
      "logo": "newspaper-logos/za/sunday-times.png",
      "logoExplainer": "Dramatic dark charcoal field with historic Old English blackletter typography 'Sunday Times', underlined with an antique gold divider bar.",
      "sources": [
        "https://www.timeslive.co.za/sunday-times",
        "https://en.wikipedia.org/wiki/Sunday_Times_(South_Africa)"
      ]
    },
    {
      "id": "za-business-day",
      "countryCode": "ZA",
      "name": "Business Day",
      "founded": 1985,
      "frequency": "Daily (Monday to Friday)",
      "format": "Broadsheet financial newspaper & digital portal (businesslive.co.za)",
      "language": "English",
      "headquarters": "16 Empire Road, Parktown, Johannesburg",
      "owner": {
        "name": "Arena Holdings (Pty) Ltd",
        "type": "Commercial business publisher"
      },
      "editorialStance": "South Africa's premier national business, financial, and political daily newspaper; delivers authoritative analysis of the Johannesburg Stock Exchange (JSE), macroeconomic monetary policy by the South African Reserve Bank, fiscal budgets, and international markets",
      "readership": {
        "metric": "Over 20,000 daily executive print circulation and 1.2 million monthly views across BusinessLIVE digital platforms",
        "source": "ABC South Africa / BusinessLIVE Media Pack"
      },
      "revenueModel": "Corporate subscriptions, financial notices, market ads, and premium digital paywall",
      "logo": "newspaper-logos/za/business-day.png",
      "logoExplainer": "Clean white field with navy corporate block 'BD' monogram, deep blue serif masthead 'Business Day', and warm gold subtitle.",
      "sources": [
        "https://www.businesslive.co.za/bd",
        "https://en.wikipedia.org/wiki/Business_Day_(South_Africa)"
      ]
    },
    {
      "id": "za-news24",
      "countryCode": "ZA",
      "name": "News24",
      "founded": 1998,
      "frequency": "Continuous 24/7 digital news coverage",
      "format": "Digital news portal & mobile app (news24.com)",
      "language": "English, Afrikaans (via Netwerk24)",
      "headquarters": "Naspers Centre, 40 Heerengracht, Cape Town, Western Cape",
      "owner": {
        "name": "Media24 (a subsidiary of Naspers)",
        "type": "Public media conglomerate"
      },
      "editorialStance": "South Africa's most visited digital news destination and premier online newsroom; offers fast-breaking news, comprehensive political reporting, investigative projects by News24 Investigations, and financial analysis",
      "readership": {
        "metric": "Over 13 million unique monthly visitors and more than 100,000 paid digital subscribers to News24+",
        "source": "Narrative Audience Measurement / Media24 Annual Report 2023"
      },
      "revenueModel": "Digital subscription memberships (News24+), programmatic video ads, and sponsored brand studio content",
      "logo": "newspaper-logos/za/news24.svg",
      "logoExplainer": "Navy blue field with modern bold white lowercase 'news' and vibrant orange '24' badge, accompanied by a bright orange beacon dot.",
      "sources": [
        "https://www.news24.com",
        "https://en.wikipedia.org/wiki/News24"
      ]
    },
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
      "logo": "newspaper-logos/za/the-star.jpg",
      "logoExplainer": "Crisp white field displaying a crimson 5-pointed star emblem, historic black serif masthead 'The Star', and clean gray heritage subtitle.",
      "sources": [
        "https://www.iol.co.za/the-star",
        "https://en.wikipedia.org/wiki/The_Star_(South_Africa)"
      ]
    }
  ],
  "ZM": [
    {
      "id": "zm-zambia-daily-mail",
      "countryCode": "ZM",
      "name": "Zambia Daily Mail",
      "founded": 1960,
      "frequency": "Daily morning newspaper",
      "format": "Broadsheet newspaper & online edition (daily-mail.co.zm)",
      "language": "English",
      "headquarters": "Longolongo Road, Light Industrial Area, Lusaka",
      "owner": {
        "name": "Zambia Daily Mail Limited (Government of Zambia)",
        "type": "State-owned publishing corporation"
      },
      "annualPublicFunding": {
        "total": "ZMW 18 million",
        "perCapita": "ZMW 0.90"
      },
      "editorialStance": "Major state-owned daily morning newspaper, established in 1960 (originally as the African Mail); serves as the official national voice covering ministerial policies, civic employment notices, economic development loans, agriculture, and sports",
      "readership": {
        "metric": "Circulation of over 30,000 copies daily distributed to all ten provinces of Zambia",
        "source": "Zambia Daily Mail Ltd Annual Report"
      },
      "revenueModel": "State public notices, corporate commercial advertising, and daily retail sales",
      "logo": "newspaper-logos/zm/zambia-daily-mail.jpg",
      "logoExplainer": "Deep navy field with bold white typography 'Zambia Daily Mail', an orange divider bar, and light blue motto 'WITHOUT FEAR OR FAVOUR'.",
      "sources": [
        "https://www.daily-mail.co.zm",
        "https://en.wikipedia.org/wiki/Zambia_Daily_Mail"
      ]
    }
  ],
  "ZW": [
    {
      "id": "zw-the-herald",
      "countryCode": "ZW",
      "name": "The Herald",
      "founded": 1891,
      "frequency": "Daily morning newspaper",
      "format": "Broadsheet newspaper & digital news portal (herald.co.zw)",
      "language": "English",
      "headquarters": "Herald House, Corner George Silundika Avenue & Sam Nujoma Street, Harare",
      "owner": {
        "name": "Zimbabwe Newspapers (1980) Limited (Zimpapers / majority state-owned)",
        "type": "Publicly listed media corporation with state majority holding"
      },
      "annualPublicFunding": {
        "total": "ZWL 4.5 billion",
        "perCapita": "ZWL 280"
      },
      "editorialStance": "Zimbabwe's oldest and largest daily newspaper of record, published in Harare continuously since 1891 (originally as The Mashonaland Herald and Zambesian Times); covers parliamentary debates, presidential policy decrees, agricultural seasons, mining investments, and regional SADC diplomacy",
      "readership": {
        "metric": "Print circulation of approximately 45,000 copies daily and more than 4 million monthly digital visitors",
        "source": "Zimbabwe All Media Products Survey (ZAMPS) / Zimpapers Annual Report 2023"
      },
      "revenueModel": "Commercial print advertising, government public notices, and retail newsstand distribution",
      "logo": "newspaper-logos/zw/the-herald.jpg",
      "logoExplainer": "White field featuring a red Zimbabwe chevron star, classic dark green Times serif 'The Herald', a red rule line, and charcoal heritage subtitle.",
      "sources": [
        "https://www.herald.co.zw",
        "https://en.wikipedia.org/wiki/The_Herald_(Zimbabwe)"
      ]
    },
    {
      "id": "zw-newsday",
      "countryCode": "ZW",
      "name": "NewsDay",
      "founded": 2010,
      "frequency": "Daily morning newspaper & 24/7 online portal",
      "format": "Broadsheet newspaper & digital platform (newsday.co.zw)",
      "language": "English",
      "headquarters": "AMH House, Corner Strand & Bessemer Roads, Graniteside, Harare",
      "owner": {
        "name": "Alpha Media Holdings (AMH / Trevor Ncube)",
        "type": "Independent commercial multimedia company"
      },
      "editorialStance": "Zimbabwe's leading independent daily morning newspaper, established in 2010 by media entrepreneur Trevor Ncube; acclaimed for critical political reporting, investigative exposés into public finances, human rights monitoring, and lively civic debate",
      "readership": {
        "metric": "Circulation of over 30,000 copies daily and more than 3 million monthly unique online visitors",
        "source": "ZAMPS Audit / AMH Commercial Profile"
      },
      "revenueModel": "Single-copy retail sales, corporate display advertisements, and digital subscriptions",
      "logo": "newspaper-logos/zw/newsday.png",
      "logoExplainer": "Deep navy field with bold white Impact typography 'NEWSDAY' and golden yellow tagline 'EVERYDAY NEWS FOR EVERYDAY PEOPLE'.",
      "sources": [
        "https://www.newsday.co.zw",
        "https://en.wikipedia.org/wiki/NewsDay_(Zimbabwe)"
      ]
    },
    {
      "id": "zw-the-chronicle",
      "countryCode": "ZW",
      "name": "The Chronicle",
      "founded": 1894,
      "frequency": "Daily morning newspaper",
      "format": "Broadsheet newspaper & online edition (chronicle.co.zw)",
      "language": "English, Ndebele",
      "headquarters": "Chronicle House, 9th Avenue & George Silundika Street, Bulawayo",
      "owner": {
        "name": "Zimbabwe Newspapers (1980) Limited (Zimpapers)",
        "type": "State-controlled publishing group"
      },
      "editorialStance": "Historic daily newspaper serving Bulawayo and the Matabeleland and Midlands provinces, established in 1894; provides extensive coverage of regional industry, railway transport, drought relief, livestock farming, and cultural heritage",
      "readership": {
        "metric": "Circulation of approximately 25,000 copies daily throughout southern and western Zimbabwe",
        "source": "ZAMPS / Zimpapers Bulawayo Branch Review"
      },
      "revenueModel": "Government notices, local commercial ads, and print sales",
      "logo": "newspaper-logos/zw/the-chronicle.png",
      "logoExplainer": "Classic white field with historic Old English blackletter masthead 'The Chronicle', dark green rule line, and Bulawayo heritage subtitle.",
      "sources": [
        "https://www.chronicle.co.zw",
        "https://en.wikipedia.org/wiki/The_Chronicle_(Zimbabwe)"
      ]
    },
    {
      "id": "zw-the-zimbabwe-independent",
      "countryCode": "ZW",
      "name": "The Zimbabwe Independent",
      "founded": 1996,
      "frequency": "Weekly (Friday) financial and investigative newspaper",
      "format": "Broadsheet newspaper & digital edition (theindependent.co.zw)",
      "language": "English",
      "headquarters": "AMH House, Graniteside, Harare",
      "owner": {
        "name": "Alpha Media Holdings (AMH)",
        "type": "Independent publishing house"
      },
      "editorialStance": "Premier investigative business, financial, and political weekly newspaper in Zimbabwe, founded in 1996 by Trevor Ncube and Clive Murphy; acclaimed for authoritative analysis of the Zimbabwe Stock Exchange, monetary policies, banking audits, and governance",
      "readership": {
        "metric": "Circulation of 18,000 copies weekly, widely regarded as essential reading for corporate executives, bankers, and foreign diplomats",
        "source": "ZAMPS / AMH Corporate Pack"
      },
      "revenueModel": "Paid weekly subscriptions, corporate financial notices, and print advertising",
      "logo": "newspaper-logos/zw/the-zimbabwe-independent.png",
      "logoExplainer": "Dark charcoal field with crimson square tile bearing white serif 'ZI', white 'THE ZIMBABWE', and warm gold 'INDEPENDENT' lettering.",
      "sources": [
        "https://www.theindependent.co.zw",
        "https://en.wikipedia.org/wiki/Zimbabwe_Independent"
      ]
    },
    {
      "id": "zw-new-zimbabwe",
      "countryCode": "ZW",
      "name": "New Zimbabwe",
      "founded": 2003,
      "frequency": "Continuous 24/7 digital news service",
      "format": "Digital news portal (newzimbabwe.com)",
      "language": "English",
      "headquarters": "Harare (editorial desks in Harare and London)",
      "owner": {
        "name": "New Zimbabwe Media Ltd (Jeff Madzingo)",
        "type": "Independent digital media company"
      },
      "editorialStance": "Pioneering independent online newspaper founded in 2003; provides fast breaking news, coverage of opposition politics, civil society rallies, judicial cases, sports, and diaspora developments",
      "readership": {
        "metric": "Over 2.5 million monthly unique visitors across Zimbabwe, the UK, South Africa, and North America",
        "source": "New Zimbabwe Web Analytics / Similarweb"
      },
      "revenueModel": "Digital display advertising, sponsored content, and diaspora services promotion",
      "logo": "newspaper-logos/zw/new-zimbabwe.png",
      "logoExplainer": "White field with green circular badge enclosing gold Zimbabwe star, bold green 'NEW', red 'ZIMBABWE', and charcoal online subtitle.",
      "sources": [
        "https://www.newzimbabwe.com",
        "https://en.wikipedia.org/wiki/NewZimbabwe.com"
      ]
    }
  ]
};
