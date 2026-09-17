import type { TourismLogo } from "../types/tourismLogo";

/**
 * National tourism-board logos for Learn mode.
 *
 * Shown both in the world-map grid's "Show" dropdown (one card per country) and
 * as a "Tourism" section in each country's National symbols tab, following the
 * same pattern as Commercial airlines / Public broadcasters (see
 * `src/lib/tourismLogos.ts`, `FlagGrid.tsx`, `NationalFlagGrid.tsx`).
 *
 * Every entry's logo is the OFFICIAL national tourism-board / destination-
 * marketing logo — the mark the country's own tourism promotion body uses, not
 * a generic government seal or an unrelated brand. Where no authoritative image
 * could be sourced after an exhaustive search, the entry carries `noImageReason`
 * instead of a fabricated logo (never invented — same discipline as every other
 * flag/logo/crest in this repo).
 *
 * `visitors` is the one comparable data point requested across every country: the
 * most recent authoritative annual visitor figure, always paired with its exact
 * `metric` so two entries are never implied to be more comparable than they
 * really are (a country's "international tourist arrivals" total is not the same
 * measurement as, say, a single museum's visitor count). Where no authoritative
 * figure could be sourced, `visitorsNote` documents the gap honestly instead of
 * approximating one.
 *
 * Coverage is a growing set — see CLAUDE.md's football-crest/political-party
 * sweeps for the discipline this collection follows: source properly, never pad.
 */
export const TOURISM_LOGOS: Record<string, readonly TourismLogo[]> = {
  JP: [
    {
      id: "jp-jnto",
      countryCode: "JP",
      name: "Japan National Tourism Organization",
      slogan: "Japan. Endless Discovery.",
      agency: "Japan National Tourism Organization (JNTO), an independent administrative agency",
      launched: 2010,
      visitors: {
        count: 36900000,
        year: 2024,
        metric:
          "International visitor arrivals, calendar year (Japan National Tourism Organization) — a record high, 5 million more than the pre-pandemic 2019 record",
      },
      logo: "/tourism-logos/jp/jnto.svg",
      logoExplainer:
        "JNTO's mark pairs the organisation's name with a red arc beneath it — the agency describes the arc as symbolising a sunrise, echoing both Japan's own \"Land of the Rising Sun\" identity and JNTO's own stated mission of developing inbound tourism.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:JNTO_logo.svg",
        "https://www.jnto.go.jp/en/about-us/brand.html",
        "https://en.wikipedia.org/wiki/Japan_National_Tourism_Organization",
        "https://www.nippon.com/en/japan-data/h02262/",
      ],
      licenceNote:
        "Freely licensed on Wikimedia Commons as a public-domain text logo (\"consists only of simple geometric shapes or text\"); carries a trademark notice for commercial use.",
    },
  ],
  SG: [
    {
      id: "sg-passion-made-possible",
      countryCode: "SG",
      name: "Singapore — \"Passion Made Possible\"",
      slogan: "Passion Made Possible",
      agency:
        "Singapore Tourism Board (STB), jointly with the Singapore Economic Development Board (EDB)",
      launched: 2017,
      visitors: {
        count: 16500000,
        year: 2024,
        metric:
          "International visitor arrivals excluding Malaysian arrivals by land, calendar year (Singapore Tourism Board)",
      },
      logo: "/tourism-logos/sg/passion-made-possible.png",
      logoExplainer:
        "\"Passion Made Possible\", launched 24 August 2017, replaced the earlier \"YourSingapore\" campaign as Singapore's unified destination brand, used by STB and EDB together across tourism and trade promotion. The mark's red \"SG\" roundel plays on the idea of an official trademark or stamp, tying into the brand's framing of Singapore as a nation of innovators and makers.",
      sources: [
        "https://en.wikipedia.org/wiki/Passion_Made_Possible",
        "https://commons.wikimedia.org/wiki/File:PassionMadePossible.png",
        "https://www.marketing-interactive.com/passion-made-possible-stb-and-edb-launch-new-brand-identity-for-singapore",
      ],
      licenceNote:
        "Freely licensed on Wikimedia Commons as a public-domain text/geometric-shape logo.",
    },
  ],
  ES: [
    {
      id: "es-sol-de-miro",
      countryCode: "ES",
      name: "Spain — the Sol de Miró",
      agency: "Turespaña (Instituto de Turismo de España), under the Ministry of Industry, Trade and Tourism",
      launched: 1983,
      visitors: {
        count: 93800000,
        year: 2024,
        metric:
          "International tourist arrivals, calendar year (INE, Instituto Nacional de Estadística — FRONTUR) — an all-time record",
      },
      logo: "/tourism-logos/es/sol-de-miro.png",
      logoExplainer:
        "Commissioned in 1983 from the painter Joan Miró, the \"Sol de Miró\" (Miró's Sun) was the first time a work of fine art was used as a country's tourism logo. Miró, in poor health, assembled it from elements of his own earlier work — the lettering from his 1982 FIFA World Cup poster and the sun-and-star motif from a 1968 poster for the Fondation Maeght — and refused payment or royalties for it. He described the black as symbolising strength and character, yellow the sun's light and joy, red passion, and green the country's landscapes.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Sol_de_Mir%C3%B3_(vectorizado).svg",
        "https://www.spain.info/en/40-anniversary/",
        "https://www.ttgmedia.com/features/sponsored-features/meet-the-spanish-icon-celebrating-its-40th-anniversary-43570",
        "https://www.ine.es/dyngs/Prensa/en/FRONTUR1224.htm",
      ],
      licenceNote:
        "Freely licensed on Wikimedia Commons as a public-domain simple-shapes logo; carries a trademark notice for commercial use. Bundled here as a raster export (via Wikimedia's own thumbnail renderer) after the original SVG could not be downloaded directly within this session's rate limits.",
    },
  ],
  TH: [
    {
      id: "th-amazing-thailand",
      countryCode: "TH",
      name: "Tourism Authority of Thailand — \"Amazing Thailand\"",
      slogan: "Amazing Thailand",
      agency: "Tourism Authority of Thailand (TAT), a state enterprise established 1979",
      launched: 1998,
      visitors: {
        count: 35320000,
        year: 2024,
        metric: "International visitor arrivals, calendar year (Tourism Authority of Thailand)",
      },
      logo: "/tourism-logos/th/tat-emblem.png",
      logoExplainer:
        "TAT's circular emblem depicts a stylised skyline of Bangkok's Wat Arun (Temple of Dawn) and a royal barge beneath an arc reading \"TAT\" in Thai script, ringed by \"Tourism Authority of Thailand\" in English — the agency's own visual identity, carried on the \"Amazing Thailand\" campaign it has run continuously (with several refreshed taglines) since the slogan was coined in response to the 1997 Asian financial crisis.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Emblem_of_Tourism_Authority_of_Thailand.svg",
        "https://en.wikipedia.org/wiki/Amazing_Thailand",
        "https://en.wikipedia.org/wiki/Tourism_Authority_of_Thailand",
        "https://www.tatnews.org/2024/12/thailand-welcomes-over-35-million-visitors-in-2024-a-milestone-paving-the-way-for-2025/",
      ],
      licenceNote:
        "Freely licensed on Wikimedia Commons under the Thai copyright exemption for government logos and emblems. Bundled here as a raster export (via Wikimedia's own thumbnail renderer) after the original SVG could not be downloaded directly within this session's rate limits.",
    },
  ],
  GE: [
    {
      id: "ge-gnta",
      countryCode: "GE",
      name: "Georgian National Tourism Administration",
      agency:
        "Georgian National Tourism Administration (GNTA), a legal entity of public law under the Ministry of Economy and Sustainable Development",
      launched: 2019,
      visitors: {
        count: 5090000,
        year: 2024,
        metric:
          "International visitors, calendar year (Georgian National Tourism Administration) — on par with the pre-pandemic 2019 level",
      },
      logo: "/tourism-logos/ge/gnta.png",
      logoExplainer:
        "GNTA's 2019 destination-brand mark pairs the country's name with a stylised red flower/starburst motif, used across the administration's international marketing to present Georgia as a single, unified travel destination distinct from its regions.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:GNTA_logo_2019_v3.svg",
        "https://en.wikipedia.org/wiki/Tourism_in_Georgia_(country)",
        "https://civil.ge/archives/717769",
      ],
      licenceNote:
        "Freely licensed on Wikimedia Commons as a public-domain simple-shapes logo. Bundled here as a raster export (via Wikimedia's own thumbnail renderer) after the original SVG could not be downloaded directly within this session's rate limits.",
    },
  ],
  IN: [
    {
      id: "in-incredible-india",
      countryCode: "IN",
      name: "Incredible India",
      slogan: "Incredible India",
      agency: "Ministry of Tourism, Government of India",
      launched: 2002,
      visitors: {
        count: 9950000,
        year: 2024,
        metric:
          "Foreign Tourist Arrivals (FTA), calendar year (Ministry of Tourism, Government of India)",
      },
      logo: "/tourism-logos/in/incredible-india.png",
      logoExplainer:
        "Launched in 2002 and conceptualised under Amitabh Kant (then Joint Secretary for Tourism), \"Incredible India\" is one of the longest-running national tourism campaigns in the world. Its wordmark famously reshapes the exclamation mark into the dot of the \"I\" in \"India\", rendered as a small red circle.",
      sources: [
        "https://en.wikipedia.org/wiki/Incredible_India",
        "https://commons.wikimedia.org/wiki/File:Incredible_India_Logo.svg",
        "https://www.data.tourism.gov.in/mrd/Uploads/tourism_data/India%20Tourism%20Data%20Compendium%202024.pdf",
      ],
      licenceNote:
        "Freely licensed on Wikimedia Commons as a public-domain text logo, dedicated under CC0. Bundled here as a raster export (via Wikimedia's own thumbnail renderer) after the original SVG could not be downloaded directly within this session's rate limits.",
    },
  ],
  CH: [
    {
      id: "ch-switzerland-tourism",
      countryCode: "CH",
      name: "Switzerland Tourism",
      agency: "Schweiz Tourismus / Suisse Tourisme / Switzerland Tourism, Switzerland's national tourism-marketing organisation",
      visitors: {
        count: 11818000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Switzerland)",
      },
      logo: "/tourism-logos/ch/switzerland-tourism.png",
      logoExplainer:
        "Switzerland Tourism's wordmark integrates the Swiss flag's white cross on a red square directly into the word \"Switzerland\", in place of the letter \"t\" — a direct, literal pairing of the national flag with the organisation's own name.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Switzerland_Tourism_Logo.svg",
        "https://de.wikipedia.org/wiki/Datei:Switzerland_Tourism_Logo.svg",
      ],
      licenceNote:
        "Freely licensed on Wikimedia Commons as a public-domain simple-shapes logo; carries a trademark notice for commercial use. Bundled here as a raster export (via Wikimedia's own thumbnail renderer) after the original SVG could not be downloaded directly within this session's rate limits.",
    },
  ],
  NP: [
    {
      id: "np-nepal-tourism-board",
      countryCode: "NP",
      name: "Nepal Tourism Board",
      agency: "Nepal Tourism Board (NTB), operator of the welcomenepal.com brand",
      visitors: {
        count: 1147000,
        year: 2024,
        metric:
          "International tourist arrivals, calendar year (Nepal Tourism Board) — 96% of the pre-pandemic 2019 level, up 13.1% on 2023",
      },
      logo: "/tourism-logos/np/ntb.svg",
      logoExplainer:
        "The Nepal Tourism Board's own visual identity, used across its \"Welcome Nepal\" consumer-facing marketing, is the mark the Board itself publishes for public download on its trade portal.",
      sources: [
        "https://en.wikipedia.org/wiki/File:Nepal_Tourism_Board_logo.svg",
        "https://en.wikipedia.org/wiki/Nepal_Tourism_Board",
        "https://risingnepaldaily.com/news/54769",
      ],
      licenceNote:
        "Public domain — the logo \"only consists of typefaces, individual words, slogans, or simple geometric shapes\" per its file page, hosted locally on English Wikipedia (welcomenepal.com is the source); carries trademark restrictions for commercial use.",
    },
  ],
  FI: [
    {
      id: "fi-visit-finland",
      countryCode: "FI",
      name: "Visit Finland",
      agency: "Visit Finland, part of Business Finland",
      visitors: {
        count: 896000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Finland)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Logos of Finland, Category:Tourism in Finland) and the English Wikipedia article for \"Tourism in Finland\" — no freely-licensed Visit Finland logo file could be found; the one Commons file returned by search (\"Visit-suomi-2009-05-by-RalfR-061.jpg\") is a photograph of a physical sign, not the brand mark itself.",
      sources: [
        "https://www.visitfinland.com/en/",
        "https://en.wikipedia.org/wiki/Tourism_in_Finland",
      ],
    },
  ],
  GT: [
    {
      id: "gt-asombrosa-e-imparable",
      countryCode: "GT",
      name: "Guatemala — \"Asombrosa e Imparable\"",
      slogan: "Asombrosa e Imparable (Amazing and Unstoppable)",
      agency: "Instituto Guatemalteco de Turismo (INGUAT)",
      launched: 2022,
      visitors: {
        count: 594000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Guatemala)",
      },
      noImageReason:
        "Guatemala's tourism brand changed in 2022 from the long-running \"Guatemala, Corazón del Mundo Maya\" (\"Heart of the Mayan World\") to \"Guatemala, Asombrosa e Imparable\" under President Alejandro Giammattei's government. Searched Wikimedia Commons and the English Wikipedia article for \"Tourism in Guatemala\" — no freely-licensed logo for either brand could be found on Commons or Wikipedia.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Guatemala",
        "https://concriterio.gt/no-somos-mas-corazon-del-mundo-maya-hay-nueva-marca-y-costo-q6-8-millones/",
      ],
    },
  ],
  JM: [
    {
      id: "jm-jamaica-tourist-board",
      countryCode: "JM",
      name: "Jamaica Tourist Board",
      agency: "Jamaica Tourist Board (JTB)",
      visitors: {
        count: 1329700,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Jamaica)",
      },
      noImageReason:
        "Jamaica's tourism campaigns have changed slogan several times (\"Once You Go, You Know\" from 2003, replaced in 2013) without a single enduring destination brand mark. Searched Wikimedia Commons and jtbonline.org — no freely-licensed Jamaica Tourist Board logo could be found on Commons or Wikipedia.",
      sources: [
        "https://www.jtbonline.org/jtb/",
        "https://www.travelweekly.com/Caribbean-Travel/Jamaica-ditches-longtime-slogan",
      ],
    },
  ],
  GH: [
    {
      id: "gh-ghana-tourism-authority",
      countryCode: "GH",
      name: "Ghana Tourism Authority",
      agency: "Ghana Tourism Authority, under the Ministry of Tourism, Culture and Creative Arts",
      visitors: {
        count: 897000,
        year: 2015,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Ghana)",
      },
      noImageReason:
        "Ghana's own bundled Wikimedia Commons file (\"Ministry of Tourism, Ghana (Ghana Tourist Board) logo.jpg\") is the Ministry's institutional seal, not a consumer destination brand — the same category error the Brazil/Embratur entry in this dataset was corrected away from. Ghana's consumer-facing promotion has used the \"#SeeGhana\" hashtag and the globally reported \"Year of Return, Ghana 2019\" diaspora-tourism campaign, but no freely-licensed logo distinct from the Ministry's institutional seal could be found for either on Wikimedia Commons or Wikipedia.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Ministry_of_Tourism,_Ghana_(Ghana_Tourist_Board)_logo.jpg",
        "https://en.wikipedia.org/wiki/Year_of_Return,_Ghana_2019",
        "https://en.wikipedia.org/wiki/Tourism_in_Ghana",
      ],
    },
  ],
  NZ: [
    {
      id: "nz-100-pure-new-zealand",
      countryCode: "NZ",
      name: "100% Pure New Zealand",
      slogan: "100% Pure New Zealand",
      agency: "Tourism New Zealand",
      launched: 1999,
      visitors: {
        count: 996000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for New Zealand)",
      },
      noImageReason:
        "\"100% Pure New Zealand\", launched in 1999, is one of the world's longest-running destination-marketing campaigns — its mark stylises \"100% PURE\" above \"NEW ZEALAND\" with the percentage sign's crossbar formed from the shape of the New Zealand islands — but searching Wikimedia Commons and the English Wikipedia articles for \"Tourism New Zealand\" and \"Tourism in New Zealand\" found no freely-licensed copy of the logo.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_New_Zealand",
        "https://www.tourismnewzealand.com/news-and-activity/tourism-new-zealands-100-pure-new-zealand-campaign-celebrates-25-years/",
      ],
    },
  ],
  DK: [
    {
      id: "dk-visitdenmark-heart",
      countryCode: "DK",
      name: "VisitDenmark — the Danish Heart",
      agency: "VisitDenmark, Denmark's official tourism organisation",
      launched: 1968,
      visitors: {
        count: 15595000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Denmark)",
      },
      noImageReason:
        "The \"Danish Heart\" — a red-and-white heart mark developed in 1968 for the (then) Danish Tourist Board and used as VisitDenmark's own graphic symbol since 1978 — is a well-documented, distinctive consumer mark, but searching Wikimedia Commons (Category:Logos of Denmark, Category:SVG logos of Denmark, Category:Symbols of Denmark) and the English Wikipedia article for VisitDenmark found no freely-licensed copy of it.",
      sources: [
        "https://en.wikipedia.org/wiki/VisitDenmark",
        "https://www.toolbox.visitdenmark.com/logo",
      ],
    },
  ],
  DO: [
    {
      id: "do-go-dominican-republic",
      countryCode: "DO",
      name: "Go Dominican Republic",
      agency:
        "Ministerio de Turismo (MITUR), the Dominican Republic's Ministry of Tourism, operator of the godominicanrepublic.com consumer brand",
      visitors: {
        count: 2748000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for the Dominican Republic)",
      },
      noImageReason:
        "Searched Wikimedia Commons, the English Wikipedia article for \"Tourism in the Dominican Republic\", and general web search — no freely-licensed \"Go Dominican Republic\" logo file could be found on Commons or Wikipedia.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_the_Dominican_Republic"],
    },
  ],
  EG: [
    {
      id: "eg-experience-egypt",
      countryCode: "EG",
      name: "Experience Egypt",
      agency: "Ministry of Tourism and Antiquities, Egypt",
      visitors: {
        count: 13026000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Egypt)",
      },
      noImageReason:
        "The Ministry of Tourism and Antiquities' own bundled Wikimedia Commons file (\"Ministry of Tourism and Antiquities logo.png\") is categorised on Commons as one of Egypt's government/coats-of-arms seals — an institutional mark, not the consumer destination brand — the same category error the Brazil/Embratur entry in this dataset was corrected away from. Egypt's actual consumer-facing tourism promotion runs under \"Experience Egypt\" (experienceegypt.eg), but no freely-licensed image for that specific campaign brand, distinct from the Ministry's institutional seal, could be found on Wikimedia Commons or Wikipedia.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Ministry_of_Tourism_and_Antiquities_logo.png",
        "https://en.wikipedia.org/wiki/Ministry_of_Tourism_and_Antiquities_(Egypt)",
        "https://www.experienceegypt.eg/en",
      ],
    },
  ],
  CA: [
    {
      id: "ca-destination-canada",
      countryCode: "CA",
      name: "Destination Canada",
      slogan: "For Glowing Hearts",
      agency:
        "Destination Canada (formerly the Canadian Tourism Commission), a Crown corporation wholly owned by the Government of Canada",
      launched: 2019,
      visitors: {
        count: 32430000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Canada)",
      },
      noImageReason:
        "Destination Canada's current consumer brand — a wordmark forming the word \"Canada\" into the shape of a heart, under the tagline \"For Glowing Hearts\", replacing the 2006–2019 \"Keep Exploring\" brand — is well documented, but searching Wikimedia Commons and the (stub) English Wikipedia article for Destination Canada found no freely-licensed copy of the logo; the agency's own brand-asset pages (brand.destinationcanada.com) are not a Commons/Wikipedia source.",
      sources: [
        "https://en.wikipedia.org/wiki/Destination_Canada",
        "https://www.creativebloq.com/news/destination-canada-logo",
        "https://www.theglobeandmail.com/business/article-canada-revamps-its-tourism-brand-to-project-an-inclusive-image/",
      ],
    },
  ],
  CL: [
    {
      id: "cl-chile-nature-that-transforms",
      countryCode: "CL",
      name: "Chile — \"Nature That Transforms You\"",
      slogan: "Nature That Transforms You",
      agency:
        "Servicio Nacional de Turismo (SERNATUR), Chile's National Tourism Service, under the Ministry of Economy — country-image promotion is handled separately by the Fundación Imagen de Chile (\"Marca Chile\")",
      visitors: {
        count: 5431000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Chile)",
      },
      noImageReason:
        "SERNATUR's own bundled Wikimedia Commons file (\"Sernatur.png\") is described on its own file page as the agency's INSTITUTIONAL emblem, not a consumer destination-marketing mark — the same category error the Brazil/Embratur entry in this dataset was corrected away from. Chile's actual consumer-facing tourism campaigns run under taglines like \"Chile es tuyo\" (2013) and \"Chile, Nature That Transforms You\" (current), promoted separately through the Fundación Imagen de Chile's \"Marca Chile\" country-branding programme — but no freely-licensed image distinct from SERNATUR's institutional emblem could be found for either campaign on Wikimedia Commons or Wikipedia.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Sernatur.png",
        "https://en.wikipedia.org/wiki/Tourism_in_Chile",
        "https://www.amchamchile.cl/en/2013/10/turismo-vender-el-chile-real",
      ],
    },
  ],
  CO: [
    {
      id: "co-the-answer-is-colombia",
      countryCode: "CO",
      name: "Colombia — \"The Answer Is Colombia\"",
      slogan: "The Answer Is Colombia",
      agency:
        "ProColombia, under the Ministry of Commerce, Industry and Tourism (the country-brand campaign launched in 2012, replacing the earlier \"Colombia is Passion\")",
      launched: 2012,
      visitors: {
        count: 1396000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Colombia)",
      },
      noImageReason:
        "\"The Answer Is Colombia\" (2012) — whose mark uses a toucan/parrot motif referencing the country's biodiversity — is well documented, but searching Wikimedia Commons and the English Wikipedia article for \"Tourism in Colombia\" found no freely-licensed copy of the logo.",
      sources: [
        "https://skift.com/2012/09/12/colombia-launches-new-brand-identity-focusing-on-its-megadiversity/",
        "https://en.wikipedia.org/wiki/Tourism_in_Colombia",
        "https://colombia.co/en/faq-colombia-country-brand",
      ],
    },
  ],
  CR: [
    {
      id: "cr-pura-vida",
      countryCode: "CR",
      name: "Costa Rica — \"Pura Vida\"",
      slogan: "Pura Vida (Essential Costa Rica)",
      agency: "Instituto Costarricense de Turismo (ICT), founded 1955",
      visitors: {
        count: 1146500,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Costa Rica)",
      },
      noImageReason:
        "\"Pura Vida\" (\"pure life\") is Costa Rica's long-running tourism identity, used by the ICT under campaign names including \"Essential Costa Rica\" and \"No Artificial Ingredients\" — but searching Wikimedia Commons, the English Wikipedia articles for \"Pura Vida\" and \"Tourism in Costa Rica\", and the ICT's own site (ict.go.cr) found no freely-licensed copy of the current logo.",
      sources: [
        "https://en.wikipedia.org/wiki/Pura_Vida",
        "https://www.ict.go.cr/en/institutional-services/country-brand.html",
        "https://www.visitcostarica.com/press/press-releases/general-travel/livin-la-vida-pura",
      ],
    },
  ],
  HR: [
    {
      id: "hr-full-of-life",
      countryCode: "HR",
      name: "Croatia — \"Full of Life\"",
      slogan: "Full of Life",
      agency: "Croatian National Tourist Board (Hrvatska turistička zajednica, HTZ)",
      visitors: {
        count: 21608000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Croatia)",
      },
      noImageReason:
        "\"Croatia, Full of Life\" (a hand-painted brushstroke wordmark, developed by a BBDO agency consortium) replaced the earlier \"The Mediterranean As It Once Was\" slogan — but searching Wikimedia Commons and the Croatian Wikidata item found no freely-licensed copy of the logo on Commons or Wikipedia; copies found on commercial clip-art sites carry no verifiable licence.",
      sources: [
        "https://www.hina.hr/news/8593016",
        "https://total-croatia-news.com/news/travel/croatia-full-of-life/",
        "https://www.wikidata.org/wiki/Q224",
      ],
    },
  ],
  CZ: [
    {
      id: "cz-visitczechia",
      countryCode: "CZ",
      name: "VisitCzechia",
      agency: "CzechTourism (agency of the Ministry of Regional Development)",
      launched: 2013,
      visitors: {
        count: 37202000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Czechia)",
      },
      noImageReason:
        "CzechTourism's current \"VisitCzechia\" wordmark (relaunched from the 2013 \"#CzechTourism\" identity by the Prague studio Marvil after the country's short-form name changed to Czechia) is documented on the agency's own site, but searching Wikimedia Commons (Category:Tourism in the Czech Republic) and the English Wikipedia article for \"Tourism in the Czech Republic\" found no freely-licensed copy of the logo.",
      sources: [
        "https://logos.fandom.com/wiki/Czech_Republic_(tourism)",
        "https://www.visitczechia.com/en-us/about-us",
        "https://en.wikipedia.org/wiki/Tourism_in_the_Czech_Republic",
      ],
    },
  ],
  BA: [
    {
      id: "ba-heart-shaped-land",
      countryCode: "BA",
      name: "Bosnia and Herzegovina — \"The Heart-Shaped Land\"",
      slogan: "The Heart-Shaped Land",
      agency:
        "Tourism promotion in Bosnia and Herzegovina is split between entity-level bodies (the Tourist Board of the Federation of Bosnia and Herzegovina and the Tourist Organisation of Republika Srpska) rather than a single national board",
      visitors: {
        count: 197000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Bosnia and Herzegovina)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Logos of Bosnia and Herzegovina), the English Wikipedia article for \"Tourism in Bosnia and Herzegovina\", and general web search — the country's own roughly heart-shaped outline gives rise to the widely-used \"Heart-Shaped Land\" tourism slogan, but no single national tourism-board logo could be found: the country's tourism promotion is constitutionally split between the two entities' own tourist boards rather than unified under one national brand mark.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Bosnia_and_Herzegovina",
        "https://emerging-europe.com/the-heart-shaped-land/",
      ],
    },
  ],
  BB: [
    {
      id: "bb-visit-barbados",
      countryCode: "BB",
      name: "Visit Barbados",
      agency: "Barbados Tourism Marketing Inc.",
      visitors: {
        count: 966000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Barbados)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Logos of Barbados, which holds the Barbados National Trust's logo but not a tourism-board one), the visitbarbados.org site, and general web search — no freely-licensed \"Visit Barbados\" logo file could be found on Commons or Wikipedia.",
      sources: [
        "https://www.visitbarbados.org/",
        "https://commons.wikimedia.org/wiki/Category:Logos_of_Barbados",
      ],
    },
  ],
  BE: [
    {
      id: "be-visitflanders",
      countryCode: "BE",
      name: "VISITFLANDERS",
      agency:
        "Belgium has no single national tourism board — tourism promotion is a competence of its three regions, each with its own body and brand: VISITFLANDERS (Flanders), Wallonie Belgique Tourisme / Visit Wallonia (Wallonia), and visit.brussels (Brussels-Capital Region)",
      visitors: {
        count: 2584000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Belgium)",
      },
      noImageReason:
        "Searched Wikimedia Commons, the English Wikipedia article for \"Tourism in Belgium\", and each region's own site (visitflanders.com, visitwallonia.be, visit.brussels) — no freely-licensed logo file for any of the three regional tourism boards could be found on Commons or Wikipedia. Belgium's tourism branding is federated (like the UK's four home-nation football associations), so a single \"Belgium\" mark would misrepresent how the country actually promotes itself.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Belgium",
        "https://www.visitflanders.com/en",
        "https://www.visit.brussels/en/press/branding",
      ],
    },
  ],
  BH: [
    {
      id: "bh-visit-bahrain",
      countryCode: "BH",
      name: "Bahrain Tourism and Exhibitions Authority",
      agency:
        "Bahrain Tourism and Exhibitions Authority (BTEA), established by Royal Decree 76/2015, operator of the \"Visit Bahrain\" brand",
      launched: 2015,
      visitors: {
        count: 1909000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Bahrain)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Tourism in Bahrain), the English Wikipedia article for \"Tourism in Bahrain\", and the BTEA's own bahrain.com / portal.btea.bh sites — no freely-licensed BTEA / Visit Bahrain logo file could be found on Commons or Wikipedia.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Bahrain",
        "https://portal.btea.bh/MainP/AboutUs",
      ],
    },
  ],
  BI: [
    {
      id: "bi-tourism-office",
      countryCode: "BI",
      name: "Office National du Tourisme (Burundi)",
      agency: "Office National du Tourisme, Burundi's national tourism authority",
      visitors: {
        count: 299000,
        year: 2017,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Burundi)",
      },
      noImageReason:
        "Searched Wikimedia Commons, the English Wikipedia article for \"Tourism in Burundi\", and general web search — no distinct tourism-board logo or destination-marketing brand mark could be found; Burundi's tourism promotion has no documented consumer-facing brand comparable to Malaysia's or Indonesia's.",
      sources: ["https://en.wikipedia.org/wiki/Tourism_in_Burundi"],
    },
  ],
  BJ: [
    {
      id: "bj-un-monde-de-splendeurs",
      countryCode: "BJ",
      name: "Benin — \"A World of Splendors\"",
      slogan: "A World of Splendors",
      agency: "Bénin Tourisme, under the Ministry of Tourism, Culture and Arts",
      visitors: {
        count: 337000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Benin)",
      },
      noImageReason:
        "Benin unveiled a new country-brand visual identity, \"Bénin, un Monde de Splendeurs\" (\"Benin, a World of Splendors\"), drawing on the Amazones, Bio Guéra, Gèlèdè and Egungun motifs — but the logo is only published on the government's own benin.bj site, and no freely-licensed copy could be found on Wikimedia Commons or Wikipedia after searching both.",
      sources: [
        "https://benin.bj/en/sectors/tourism",
        "https://jumelages-partenariats.com/en/actualites.php?n=23522&art=Benin_unveils_the_visual_identity_of_its_country_brand%3A_%22Benin%2C_a_World_of_Splendors%22.",
        "https://en.wikipedia.org/wiki/Tourism_in_Benin",
      ],
    },
  ],
  BN: [
    {
      id: "bn-brunei-tourism",
      countryCode: "BN",
      name: "Brunei Tourism",
      agency:
        "Brunei Tourism, under the Ministry of Primary Resources and Tourism",
      visitors: {
        count: 1071000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Brunei)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Tourism in Brunei), the English Wikipedia article for \"Tourism in Brunei\", and the bruneitourism.com site — no freely-licensed Brunei Tourism logo file could be found on Commons or Wikipedia.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Brunei",
        "https://www.bruneitourism.com/",
      ],
    },
  ],
  BT: [
    {
      id: "bt-bhutan-believe",
      countryCode: "BT",
      name: "Bhutan — \"Believe\"",
      slogan: "Believe",
      agency: "Tourism Council of Bhutan",
      launched: 2022,
      visitors: {
        count: 29800,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Bhutan; a pandemic-year figure — Bhutan's tourism reopened in September 2022 under the current brand)",
      },
      noImageReason:
        "The Tourism Council of Bhutan launched the country's current national brand, \"Bhutan: Believe\", on 22 September 2022 (replacing the earlier \"Happiness Is a Place\" brand, which paired a blue-poppy motif with its tagline). Searched Wikimedia Commons and the English Wikipedia article for \"Tourism in Bhutan\" — no freely-licensed logo for either brand could be found on Commons or Wikipedia.",
      sources: [
        "https://www.dailybhutan.com/article/bhutan-has-a-new-brand-and-tagline-bhutan-believe",
        "https://www.fastcompany.com/90801783/heres-why-bhutan-just-gave-itself-a-new-brand",
        "https://en.wikipedia.org/wiki/Tourism_in_Bhutan",
      ],
    },
  ],
  BO: [
    {
      id: "bo-corazon-del-sur",
      countryCode: "BO",
      name: "Bolivia — \"Corazón del Sur\"",
      slogan: "Corazón del Sur (Heart of the South)",
      agency:
        "Viceministerio de Turismo, under Bolivia's Ministry of Culture, Decolonisation and Depatriarchalisation",
      launched: 2017,
      visitors: {
        count: 323300,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Bolivia)",
      },
      noImageReason:
        "Bolivia's current official country brand, \"Bolivia Corazón del Sur\" (\"Bolivia, Heart of the South\"), was established by Supreme Decree in 2017, replacing the earlier \"Bolivia te espera\" (\"Bolivia awaits you\") tourism logo used from 2010. Searched Wikimedia Commons and the English Wikipedia article for \"Tourism in Bolivia\" — no freely-licensed logo for either brand could be found on Commons or Wikipedia; copies of the older \"Bolivia te espera\" mark exist only on commercial logo-aggregator sites with no verifiable licence.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Bolivia",
        "https://www.rigobertoparedes.com/en/country-brand-registration/",
      ],
    },
  ],
  AU: [
    {
      id: "au-tourism-australia",
      countryCode: "AU",
      name: "Tourism Australia",
      slogan: "Come and Say G'day",
      agency:
        "Tourism Australia — the Australian Government's tourism-marketing statutory authority, established under the Tourism Australia Act 2004",
      launched: 2012,
      visitors: {
        count: 7630000,
        year: 2024,
        metric:
          "International short-term visitor arrivals, calendar year (Australian Bureau of Statistics, Overseas Arrivals and Departures)",
      },
      logo: "/tourism-logos/au/tourism-australia.svg",
      logoExplainer:
        "Interbrand redesigned Tourism Australia's kangaroo brandmark in 2012, replacing the organisation's earlier 2004 logo. The leaping kangaroo was redrawn as a single simplified silhouette with a new relationship to a rising sun behind it, rendered in a multi-coloured palette of blues, greens, reds and oranges chosen to represent Australia's coastlines and rainforests as well as its outback 'red centre' — broadening the brand beyond the desert imagery the earlier mark leaned on.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_Australia",
        "https://www.designweek.co.uk/issues/may-2012/interbrand-creates-new-identity-for-tourism-australia/",
        "https://www.abs.gov.au/statistics/industry/tourism-and-transport/overseas-arrivals-and-departures-australia",
        "https://www.tourism.australia.com/en/news-and-events/news/global-campaign-to-invite-the-world-to-come-and-say-gday-media-release.html",
      ],
      licenceNote:
        "Non-free trademark logo, bundled from the file used under fair use on English Wikipedia (there sourced from tourism.australia.com) and reproduced here for educational identification only — the same non-free bundling discipline already applied to passport covers and football crests in this repo.",
    },
  ],
  MY: [
    {
      id: "my-tourism-malaysia",
      countryCode: "MY",
      name: "Tourism Malaysia",
      slogan: "Malaysia, Truly Asia",
      agency:
        "Tourism Malaysia (Malaysia Tourism Promotion Board), under the Ministry of Tourism, Arts and Culture",
      launched: 1999,
      visitors: {
        count: 25016698,
        year: 2024,
        metric:
          "International tourist arrivals (Tourism Malaysia, \"Malaysia Tourism Statistics in Brief 2024\")",
      },
      logo: "/tourism-logos/my/tourism-malaysia.svg",
      logoExplainer:
        "A red hibiscus — bunga raya, Malaysia's national flower — sits at the centre of the mark beside the \"Malaysia\" wordmark and the \"Truly Asia\" tagline the board has used since 1999. As the national flower, the hibiscus's five petals are commonly read as representing the five principles of the Rukun Negara (the national philosophy), extending that civic symbolism into the tourism brand.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Malaysia_Truly_Asia_logo.svg",
        "https://en.wikipedia.org/wiki/Tourism_Malaysia",
        "https://data.tourism.gov.my/frontend/pdf/New_Final_Malaysia%20Tourism%20Statistics%20in%20Brief%202024.pdf",
      ],
      licenceNote:
        "Public domain: the mark consists of simple geometric shapes and text below the threshold of copyright originality (per its Wikimedia Commons file page), sourced from the official tourism.gov.my website. It remains a protected trademark of Tourism Malaysia in commerce.",
    },
  ],
  BR: [
    {
      id: "br-marca-brasil",
      countryCode: "BR",
      name: "Marca Brasil",
      slogan: "It's Spectacular. It's Brasil",
      agency: "Embratur (Instituto Brasileiro de Turismo), together with ApexBrasil",
      visitors: {
        count: 6621000,
        year: 2024,
        metric:
          "International tourist arrivals, consolidated Embratur / Ministry of Tourism / Federal Police data",
      },
      noImageReason:
        "Marca Brasil is the consumer-facing destination brand Brazil promotes to tourists — a flag-coloured compass rose designed by Kiko Farkas in 2005 for the Plano Aquarela and relaunched by Embratur in February 2023 — but no freely-licensed copy of that specific mark could be found. Searched: Wikimedia Commons (Category:Logos of Brazil, Category:Logos of governments and government agencies of Brazil, Category:SVG logos of Brazil — none matches), the English and Portuguese Wikipedia articles for Embratur and \"Marca Brasil\" (the Portuguese article under that exact title is a name collision with an unrelated sports magazine, not the tourism brand), and the official marca.visitbrasil.com / antigo.visitbrasil.com brand pages, which document the brand but sit behind a Cloudflare bot challenge that returns HTTP 403 to every path on the domain (including a bare favicon request), so no image bytes could be retrieved from them by an automated fetch. Embratur's OWN separate institutional/corporate mark (a green-gold-blue diamond plus wordmark, unrelated in design to Marca Brasil) is freely hosted on Commons, but bundling it here would misrepresent it as the consumer tourism brand it is not — the same distinction this repo's rules draw between a federation's corporate logo and the crest a team actually wears.",
      sources: [
        "https://pt.wikipedia.org/wiki/Instituto_Brasileiro_de_Turismo",
        "https://embratur.com.br/2023/02/14/brasil-reafirma-compromisso-com-sustentabilidade-com-retomada-de-logomarca-internacional/",
        "https://www.printmag.com/branding-identity-design/kiko-farkas-talks-about-his-curvaceous-marca-brasil/",
        "https://www.gov.br/secom/en/latest-news/2024/12/brazil-welcomed-6-6-million-international-tourists-in-2024-its-best-historical-mark",
        "https://www.itij.com/latest/news/brazil-records-record-tourist-numbers",
        "https://embratur.com.br/2023/07/24/spetacular-sustainable-embratur-assume-brasil-com-s-em-campanha-nos-eua/",
        "https://marca.visitbrasil.com",
      ],
    },
  ],
  ID: [
    {
      id: "id-wonderful-indonesia",
      countryCode: "ID",
      name: "Wonderful Indonesia",
      agency:
        "Ministry of Tourism and Creative Economy of Indonesia (Kementerian Pariwisata dan Ekonomi Kreatif)",
      launched: 2011,
      visitors: {
        count: 13900000,
        year: 2024,
        metric:
          "International visitor arrivals, calendar year (BPS-Statistics Indonesia)",
      },
      logo: "/tourism-logos/id/wonderful-indonesia.png",
      logoExplainer:
        "\"Wonderful Indonesia\" was inaugurated on 1 January 2011 as the country's unified destination brand, replacing several earlier, less consistent slogans (including \"Visit Indonesia\"). The wordmark pairs the country's name with the tagline in a rounded, colourful sans-serif treatment intended to read as approachable and diverse — echoing the ministry's own framing of Indonesia's appeal as spanning nature, culture and modern city life across its many islands.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Logo_Wonderful_Indonesia.png",
        "https://en.wikipedia.org/wiki/Wonderful_Indonesia",
        "https://www.bps.go.id/en/pressrelease/2025/02/03/2407/the-international-visitor-arrivals-in-december-2024-were-1-24-million--whichincreased-by-8-72-percent-year-on-year--y-on-y--.html",
      ],
      licenceNote:
        "Public domain in Indonesia — published and distributed by the Government of the Republic of Indonesia under Article 43 of Law 28 of 2014 on copyrights, which exempts government publications from copyright restriction (per the file's Wikimedia Commons licence tag).",
    },
  ],
  IT: [
    {
      id: "it-enit",
      countryCode: "IT",
      name: "ENIT — Italian National Tourist Board",
      agency:
        "ENIT S.p.A. (Agenzia Nazionale del Turismo / Italian Government Tourist Board), under the Ministry of Tourism",
      visitors: {
        count: 89000000,
        year: 2024,
        metric:
          "International (non-resident) tourist arrivals at accommodation establishments, calendar year (ISTAT, Istituto Nazionale di Statistica)",
      },
      logo: "/tourism-logos/it/enit.png",
      logoExplainer:
        "ENIT — Agenzia Nazionale del Turismo (the Italian Government Tourist Board, founded 1919) is Italy's dedicated tourism-promotion body, distinct from the Ministry of Tourism itself; its logo is the visitor-facing \"ENIT\" wordmark used across the agency's international offices and campaign materials.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:ENIT_logo.png",
        "https://en.wikipedia.org/wiki/ENIT",
        "https://www.istat.it/en/press-release/tourist-flows-fourth-quarter-2024/",
      ],
      licenceNote:
        "Freely licensed on Wikimedia Commons under a CC0 1.0 Universal Public Domain Dedication (uploaded by the agency itself, dated 1 November 2010).",
    },
  ],
  AF: [
    {
      id: "af-tourism-directorate",
      countryCode: "AF",
      name: "Tourism Directorate, Ministry of Information and Culture",
      agency:
        "Tourism Directorate, Ministry of Information and Culture (Afghanistan's national tourism authority; the earlier Afghan Tourist Organization, founded 1958, is now defunct)",
      visitorsNote:
        "No comprehensive, authoritative recent international-arrivals count for Afghanistan could be sourced. The World Bank's tourism indicator (ST.INT.ARVL) carries no recent figure for Afghanistan, and no other authoritative statistical body publishes a current count; media coverage of Afghan tourism is limited to isolated visitor-number claims from the Tourism Directorate that are not independently verifiable.",
      noImageReason:
        "Searched Wikimedia Commons, the English Wikipedia articles for \"Tourism in Afghanistan\" and the Ministry of Information and Culture, and the Ministry's own website (moic.gov.af) and the Tourism Directorate's coverage — no distinct tourism-board logo or destination-marketing brand mark (comparable to Malaysia's or Indonesia's) is documented or freely licensed anywhere found. Afghanistan's tourism promotion is handled directly by a Ministry directorate rather than a separate branded body.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Afghanistan",
        "https://moic.gov.af/en/official-establishment-tourism-directorate-0",
      ],
    },
  ],
  AD: [
    {
      id: "ad-andorra-turisme",
      countryCode: "AD",
      name: "Andorra Turisme",
      agency:
        "Andorra Turisme SAU, the public tourism-promotion company established 21 September 2007, operator of the Visit Andorra brand",
      launched: 2007,
      visitorsNote:
        "No dated, authoritative Andorra-specific arrivals figure distinct from cross-border day-trip traffic could be sourced within this search; Andorra's own tourism statistics largely track overnight stays and skier-days rather than a single comparable \"international arrivals\" total.",
      noImageReason:
        "Searched Wikimedia Commons, the English Wikipedia articles for \"Tourism in Andorra\" and Andorra Turisme, and the official visitandorra.com site — no freely-licensed Visit Andorra / Andorra Turisme logo file could be found on Commons or Wikipedia; the brand's own site does not offer a citable public-domain or Creative-Commons asset.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Andorra",
        "https://visitandorra.com/en/about-us/",
      ],
    },
  ],
  AL: [
    {
      id: "al-go-your-own-way",
      countryCode: "AL",
      name: "Albania — \"Go Your Own Way\"",
      slogan: "Go Your Own Way",
      agency:
        "National Tourism Agency of Albania (Agjencia Kombëtare e Turizmit), under the Ministry of Tourism and Environment",
      launched: 2014,
      visitors: {
        count: 2658000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Albania; more recent Albanian government figures report substantially higher post-pandemic totals but were not found in a form citable to a single authoritative dated release)",
      },
      noImageReason:
        "Searched Wikimedia Commons, the English Wikipedia articles for \"Tourism in Albania\" and \"Go Your Own Way (Albania)\", and general web search for the campaign's own logo mark — the \"Go Your Own Way\" slogan (developed by StrawberryFrog and APCO Worldwide, launched 2014) is well documented, but no freely-licensed logo/wordmark image distinct from the slogan text could be found on Commons or Wikipedia.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Albania",
        "https://www.tiranatimes.com/albania-go-your-own-way-to-lead-new-global-ad-campaign_116662/",
      ],
    },
  ],
  AR: [
    {
      id: "ar-visit-argentina",
      countryCode: "AR",
      name: "Visit Argentina",
      agency:
        "INPROTUR (Instituto Nacional de Promoción Turística), a public-private body established under Argentina's National Tourism Law 25,997 (2004)",
      visitors: {
        count: 10930000,
        year: 2024,
        metric:
          "International visitors (tourists + day-trippers), calendar year (INDEC, Instituto Nacional de Estadística y Censos)",
      },
      noImageReason:
        "Searched Wikimedia Commons, the Spanish Wikipedia article for INPROTUR (whose infobox carries no logo image), and general web search for the \"Visit Argentina\" wordmark — no freely-licensed logo file for INPROTUR or its Visit Argentina brand could be found on Commons or Wikipedia.",
      sources: [
        "https://es.wikipedia.org/wiki/Instituto_Nacional_de_Promoci%C3%B3n_Tur%C3%ADstica",
        "https://www.argentina.travel/en/institutional",
      ],
    },
  ],
  AT: [
    {
      id: "at-austrian-national-tourist-office",
      countryCode: "AT",
      name: "Austrian National Tourist Office",
      agency:
        "Österreich Werbung (Austrian National Tourist Office / ANTO), Austria's national tourism-marketing organisation",
      visitors: {
        count: 46710000,
        year: 2024,
        metric:
          "Arrivals at Austrian accommodation establishments, calendar year (Statistik Austria) — Austria's own published measure of visitor arrivals; not broken out here into a separate international-only figure",
      },
      noImageReason:
        "Searched Wikimedia Commons (including Category:Tourism in Austria), the Wikidata item for the Austrian National Tourist Office, and general web search — no freely-licensed ANTO / Österreich Werbung logo file could be found on Commons or Wikipedia.",
      sources: [
        "https://www.wikidata.org/wiki/Q298700",
        "https://b2b.austria.info/us/about-us-1/the-austrian-national-tourist-office/",
        "https://www.theinternational.at/austria-is-the-worlds-13th-most-visited-country-in-2024/",
      ],
    },
  ],
  AZ: [
    {
      id: "az-land-of-fire",
      countryCode: "AZ",
      name: "Azerbaijan — \"Land of Fire\"",
      slogan: "Land of Fire",
      agency:
        "Azerbaijan Tourism Board, under the Ministry of Culture and Tourism",
      visitors: {
        count: 796000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Azerbaijan)",
      },
      noImageReason:
        "Searched Wikimedia Commons, the English Wikipedia articles for \"Tourism in Azerbaijan\" and \"Land of Fire\", and general web search — the \"Land of Fire\" campaign mark (designed by Parwin Shukurzade) is documented but no freely-licensed copy of the logo could be found on Commons or Wikipedia; the copies found on commercial logo-aggregator sites carry no verifiable licence.",
      sources: [
        "https://en.wikipedia.org/wiki/Tourism_in_Azerbaijan",
        "https://en.wikipedia.org/wiki/Land_of_Fire",
      ],
    },
  ],
  BG: [
    {
      id: "bg-discovery-to-share",
      countryCode: "BG",
      name: "Bulgaria — \"A Discovery to Share\"",
      slogan: "A Discovery to Share",
      agency:
        "Ministry of Tourism of Bulgaria (Bulgaria Travel brand)",
      launched: 2013,
      visitors: {
        count: 4973000,
        year: 2020,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Bulgaria)",
      },
      noImageReason:
        "Searched Wikimedia Commons (Category:Tourism in Bulgaria, Category:Bulgarian Tourist Union), the Bulgarian Ministry of Tourism's own \"Official logo of Bulgaria\" archive page, and general web search — the \"A Discovery to Share\" brand (unveiled 2013) is documented, but no freely-licensed copy of its logo could be found on Commons or Wikipedia.",
      sources: [
        "https://sofiaglobe.com/2013/01/17/new-brand-bulgaria-tourism-promotional-logo-and-slogans-unveiled/",
        "https://www.tourism.government.bg/sites/trsm.gateway.bg/archive/en/themes/official-logo-of-bulgaria-274-308.html",
      ],
    },
  ],
  BD: [
    {
      id: "bd-bangladesh-tourism-board",
      countryCode: "BD",
      name: "Bangladesh Tourism Board",
      agency:
        "Bangladesh Tourism Board, a statutory body established 2010 under the Ministry of Civil Aviation and Tourism",
      launched: 2010,
      visitors: {
        count: 323000,
        year: 2019,
        metric:
          "International tourist arrivals, calendar year (World Bank, World Development Indicators — the most recent figure the World Bank's dataset carries for Bangladesh)",
      },
      noImageReason:
        "Searched Wikimedia Commons and the English Wikipedia article for the Bangladesh Tourism Board (whose infobox carries no logo image) — no freely-licensed logo for the Board's own consumer-facing brand could be found. Its predecessor body, the Bangladesh Parjatan Corporation, does have a bundled Commons logo, but that is a separate, older state-owned tourism CORPORATION (it operates hotels/motels under the Parjatan name) rather than the Board's own destination-marketing mark, so it is not used here — the same distinction this repo draws between a federation's corporate logo and a team's own crest.",
      sources: [
        "https://en.wikipedia.org/wiki/Bangladesh_Tourism_Board",
        "https://www.wikidata.org/wiki/Q28225452",
      ],
    },
  ],
  AE: [
    {
      id: "ae-visit-uae",
      countryCode: "AE",
      name: "Visit UAE",
      agency:
        "Ministry of Economy and Tourism, United Arab Emirates",
      launched: 2026,
      visitorsNote:
        "The UAE has no single published federal international-arrivals total for a full year: tourism statistics are reported separately by emirate (Dubai alone recorded 18.72 million international overnight visitors in 2024, per the Dubai Department of Economy and Tourism), and no consolidated seven-emirate figure could be sourced.",
      noImageReason:
        "\"Visit UAE\" was unveiled by the Ministry of Economy and Tourism at Arabian Travel Market on 16 September 2026 as the country's first unified national tourism brand at the federal level, replacing separate emirate-level identities (Visit Dubai, Abu Dhabi's Abu Moments, Visit Sharjah, and others). It is too newly launched for any freely-licensed logo image to exist on Wikimedia Commons or elsewhere yet; this entry will be updated once an authoritative image becomes available.",
      sources: [
        "https://gulfnews.com/business/tourism/uae-launches-visit-uae-brand-to-unite-seven-emirates-under-one-tourism-identity-1.500676742",
        "https://www.gccbusinessnews.com/uae-launches-visit-uae-uae-grand-tour/",
        "https://www.dubaidet.gov.ae/en/research-and-insights/annual-visitor-report-2024",
      ],
    },
  ],
  NR: [
    {
      id: "nr-nauru-tourism-corporation",
      countryCode: "NR",
      name: "Nauru Tourism Corporation",
      agency:
        "Nauru Tourism Corporation, a statutory corporation established under the Nauru Tourism Corporation Act 2019",
      launched: 2019,
      visitorsNote:
        "No comprehensive or recent international tourist-arrival statistics are published for Nauru. The most recent sourced figure found is a 2008 Australian outbound-travel survey recording 478 Australian visitors to Nauru that year (Pacific Islands Trade & Investment Commission, cited via Wikipedia's \"Tourism in Nauru\"); Nauru is widely reported in travel media as one of the world's least-visited countries, but no authoritative up-to-date arrivals count could be sourced to cite here.",
      noImageReason:
        "Searched Wikimedia Commons, Wikipedia (\"Tourism in Nauru\", \"Nauru Tourism Corporation\"), the Corporation's official Facebook and X/Twitter accounts, and general web search for an official Nauru Tourism Corporation logo or emblem. No freely-licensed or otherwise citable official logo image could be found — only the Corporation's name, its founding legislation and a social-media presence with no confirmed distinct brand mark are documented online.",
      sources: [
        "https://faolex.fao.org/docs/pdf/nau188240.pdf",
        "https://en.wikipedia.org/wiki/Tourism_in_Nauru",
        "https://x.com/nauru_tourismco",
      ],
    },
  ],
  VA: [
    {
      id: "va-vatican-museums",
      countryCode: "VA",
      name: "Vatican Museums",
      agency: "Governorate of Vatican City State — Musei Vaticani (Vatican Museums)",
      visitors: {
        count: 6800000,
        year: 2024,
        metric:
          "Vatican Museums annual visitors — not directly comparable to other entries' international-arrivals figures, since Vatican City has no border crossing or arrivals count of its own",
      },
      logo: "/tourism-logos/va/vatican-museums.svg",
      logoExplainer:
        "The Holy See has no dedicated national tourism-promotion board of the kind other states maintain; its principal visitor-facing institution is the Vatican Museums, the Governorate of Vatican City State body that receives the millions of pilgrims and tourists who visit each year. The mark shown is the Vatican Museums' own coat of arms — original artwork by Fabio Mochi — used as the institution's visual identity on signage and publications.",
      sources: [
        "https://commons.wikimedia.org/wiki/File:Musei_vaticani_Coat_of_Arms.svg",
        "https://en.wikipedia.org/wiki/Vatican_Museums",
        "https://dioceseofraleigh.org/news/nearly-7-million-visitors-vatican-museums-numbers-climb-back-pre-pandemic-times",
      ],
      licenceNote:
        "Freely licensed on Wikimedia Commons under CC BY 4.0 (vector conversion by Commons user Kaidor of original artwork by Fabio Mochi); reproduced here with attribution.",
    },
  ],
};
