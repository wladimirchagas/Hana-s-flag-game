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
      launched: 2005,
      visitors: {
        count: 6621000,
        year: 2024,
        metric:
          "International tourist arrivals, consolidated Embratur / Ministry of Tourism / Federal Police data",
      },
      logo: "/tourism-logos/br/marca-brasil.png",
      logoExplainer:
        "Designed by Kiko Farkas in 2005 as Brazil's official \"nation brand\" for international tourism promotion, the mark arranges the green and yellow of the Brazilian flag into a stylised compass rose, read as Brazil offering natural beauty and culture \"in every direction\". Embratur set it aside for a 2019 rebrand (\"Visit and Love Us\") before officially relaunching Marca Brasil in February 2023 alongside a renewed focus on environmental sustainability in the country's international image.",
      sources: [
        "https://embratur.com.br/2023/02/14/brasil-reafirma-compromisso-com-sustentabilidade-com-retomada-de-logomarca-internacional/",
        "https://commons.wikimedia.org/wiki/File:Logo-Embratur-2023-Cinza-1024x157.png",
        "https://www.gov.br/secom/en/latest-news/2024/12/brazil-welcomed-6-6-million-international-tourists-in-2024-its-best-historical-mark",
        "https://www.itij.com/latest/news/brazil-records-record-tourist-numbers",
        "https://embratur.com.br/2023/07/24/spetacular-sustainable-embratur-assume-brasil-com-s-em-campanha-nos-eua/",
      ],
      licenceNote:
        "Bundled from the greyscale 2023 press file Embratur itself published (embratur.com.br), catalogued on Wikimedia Commons as public domain in the United States; Brazilian government works are not automatically public domain in Brazil, so this remains reproduced here for educational identification of Brazil's official tourism brand rather than as a claim of unrestricted reuse.",
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
