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
