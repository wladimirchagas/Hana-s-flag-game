#!/usr/bin/env node
/**
 * Apply owner-directed national news-agency coverage:
 *  - remove non-wire Nauru GIO
 *  - add sole Canadian Press
 *  - add San Marino News Agency (SMNA)
 *  - add second/third national wires for multi-agency countries
 *
 * Facts are taken from the cited Wikipedia / official URLs on each entry.
 * Logos ship as noImageReason until a freely-citable emblem is sourced.
 *
 * Run: node scripts/patch-news-agency-coverage.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "..", "src", "data", "nationalNewsAgencies.ts");

const NO_LOGO =
  "No freely-citable authentic emblem confidently sourced yet from Wikimedia Commons, the agency's official site, or common brand CDNs — listed with no image rather than an invented logo.";

function agency(partial) {
  return {
    frequency: "Continuous 24/7 national newswire",
    format: "National news agency wire & multimedia service",
    revenueModel: "Wire subscription licensing and syndication",
    noImageReason: NO_LOGO,
    ...partial,
  };
}

/** New / replacement country arrays (full list for that country). */
const PATCHES = {
  // Remove NR — Government Information Office / Naoero Bulletin is not a newswire.
  NR: null,

  CA: [
    agency({
      id: "ca-canadian-press",
      countryCode: "CA",
      name: "The Canadian Press",
      officialName: "The Canadian Press / La Presse canadienne",
      founded: 1917,
      language: "English, French",
      headquarters: "Toronto, Ontario",
      owner: {
        name: "Canadian Press Enterprises Inc. (Globe and Mail, Torstar, Square Victoria Communications)",
        type: "Private national news agency (formerly member cooperative)",
      },
      ownershipKind: "private",
      editorialStance:
        "Canada's national news agency; gathers and syndicates text, photos and audio to newspapers, broadcasters and digital publishers across the country",
      readership: {
        metric: "Primary national wire serving Canadian print, broadcast and digital outlets",
        source: "The Canadian Press / Canadian Encyclopedia",
      },
      sources: [
        "https://www.thecanadianpress.com",
        "https://en.wikipedia.org/wiki/The_Canadian_Press",
        "https://thecanadianencyclopedia.ca/index.php/en/article/canadian-press",
      ],
    }),
  ],

  SM: [
    agency({
      id: "sm-smna",
      countryCode: "SM",
      name: "San Marino News Agency",
      officialName: "San Marino News Agency (SMNA)",
      founded: 2016,
      language: "Italian",
      headquarters: "San Marino",
      owner: {
        name: "San Marino News Agency",
        type: "Independent private information agency",
      },
      ownershipKind: "private",
      frequency: "Daily information agency service",
      format: "Daily information agency (agenzia di informazione quotidiana)",
      editorialStance:
        "Registered 2016 under San Marino Law 211/2014 as a daily information agency supplying news to other media outlets; covers institutions and political affairs of the Republic",
      readership: {
        metric: "Accredited daily information agency serving San Marino media and institutions",
        source: "San Marino RTV / Autorità Garante per l'Informazione registration (2016)",
      },
      sources: [
        "https://www.sanmarinortv.sm/news/comunicati-c9/san-marino-news-agency-soddisfatta-iscrizione-testate-accreditate-a161705",
      ],
    }),
  ],
};

/** Agencies to APPEND to an existing country list (deduped by id). */
const APPEND = {
  BD: [
    agency({
      id: "bd-unb",
      countryCode: "BD",
      name: "United News of Bangladesh",
      officialName: "United News of Bangladesh (UNB)",
      nativeName: "ইউনাইটেড নিউজ অব বাংলাদেশ",
      englishTranslation: "United News of Bangladesh",
      founded: 1988,
      language: "Bengali, English",
      headquarters: "Dhaka",
      owner: {
        name: "United News of Bangladesh",
        type: "Independent commercial media",
      },
      ownershipKind: "private",
      editorialStance:
        "Privately owned national wire service; first fully digitised private-sector wire in South Asia; AP news-exchange partner",
      readership: {
        metric: "Correspondents in all 64 districts; serves print and electronic media nationally",
        source: "UNB About / Banglapedia",
      },
      sources: [
        "https://www.unb.com.bd/about",
        "https://en.wikipedia.org/wiki/United_News_of_Bangladesh",
        "https://en.banglapedia.org/index.php?title=News_Agencies",
      ],
    }),
  ],
  BR: [
    agency({
      id: "br-agencia-estado",
      countryCode: "BR",
      name: "Agência Estado",
      founded: 1970,
      language: "Portuguese",
      headquarters: "São Paulo, São Paulo",
      owner: {
        name: "Grupo Estado",
        type: "Independent commercial media",
      },
      ownershipKind: "private",
      editorialStance:
        "Private national news agency of Grupo Estado; syndicates text, photos and real-time financial/news feeds to media and market clients",
      readership: {
        metric: "Major private Brazilian wire and Broadcast real-time information service",
        source: "Agência Estado / Grupo Estado",
      },
      sources: [
        "https://en.wikipedia.org/wiki/Ag%C3%AAncia_Estado",
        "https://pt.wikipedia.org/wiki/Ag%C3%AAncia_Estado",
        "http://www.ae.com.br/institucional/pag_historia.php",
      ],
    }),
  ],
  CN: [
    agency({
      id: "cn-xinhua",
      countryCode: "CN",
      name: "Xinhua News Agency",
      officialName: "Xinhua News Agency",
      nativeName: "新华社",
      englishTranslation: "New China News Agency",
      founded: 1931,
      language: "Chinese, English, and multiple foreign languages",
      headquarters: "Beijing",
      owner: {
        name: "State Council of the People's Republic of China",
        type: "State-owned official news agency",
      },
      ownershipKind: "state",
      editorialStance:
        "Official state news agency of the PRC; gathers and distributes domestic and international wire copy, photos and video to media clients worldwide",
      readership: {
        metric: "Primary official Chinese newswire with global bureaux",
        source: "Xinhua / Wikipedia",
      },
      sources: [
        "https://www.xinhuanet.com",
        "https://en.wikipedia.org/wiki/Xinhua_News_Agency",
      ],
    }),
    agency({
      id: "cn-cns",
      countryCode: "CN",
      name: "China News Service",
      officialName: "China News Service (CNS)",
      nativeName: "中国新闻社",
      englishTranslation: "China News Service",
      founded: 1952,
      language: "Chinese, English",
      headquarters: "Beijing",
      owner: {
        name: "United Front Work Department / state-affiliated",
        type: "State-owned national news agency",
      },
      ownershipKind: "state",
      editorialStance:
        "Second major Chinese state news agency; focuses on overseas Chinese and international audiences alongside domestic syndication",
      readership: {
        metric: "Major Chinese newswire alongside Xinhua",
        source: "China News Service / Wikipedia",
      },
      sources: [
        "https://www.chinanews.com.cn",
        "https://en.wikipedia.org/wiki/China_News_Service",
      ],
    }),
  ],
  DE: [
    agency({
      id: "de-dpa",
      countryCode: "DE",
      name: "dpa (Deutsche Presse-Agentur)",
      officialName: "Deutsche Presse-Agentur GmbH",
      founded: 1949,
      language: "German, English, Spanish, Arabic",
      headquarters: "Hamburg",
      owner: {
        name: "dpa GmbH (publisher shareholders)",
        type: "Independent commercial media",
      },
      ownershipKind: "private",
      editorialStance:
        "Germany's principal national and international news agency; independent of government, owned by media shareholders; supplies text, photos and multimedia to print, broadcast and digital clients",
      readership: {
        metric: "Largest German press agency; ~170 media shareholders; worldwide wire",
        source: "dpa.com / Wikipedia",
      },
      sources: [
        "https://www.dpa.com",
        "https://en.wikipedia.org/wiki/Deutsche_Presse-Agentur",
      ],
    }),
    agency({
      id: "de-epd",
      countryCode: "DE",
      name: "epd (Evangelischer Pressedienst)",
      officialName: "Evangelischer Pressedienst",
      founded: 1910,
      language: "German",
      headquarters: "Frankfurt am Main",
      owner: {
        name: "Gemeinschaftswerk der Evangelischen Publizistik",
        type: "Independent specialized national wire (church press)",
      },
      ownershipKind: "independent",
      frequency: "Continuous specialized national newswire",
      format: "Specialized national church and society news wire",
      editorialStance:
        "Specialized national German wire of the Protestant press service; syndicates religion, society and culture coverage to media clients",
      readership: {
        metric: "Specialized German national wire used by newspapers and broadcasters",
        source: "epd / Wikipedia",
      },
      sources: [
        "https://www.epd.de",
        "https://de.wikipedia.org/wiki/Evangelischer_Pressedienst",
      ],
    }),
    agency({
      id: "de-sid",
      countryCode: "DE",
      name: "SID (Sport-Informations-Dienst)",
      officialName: "Sport-Informations-Dienst",
      founded: 1945,
      language: "German",
      headquarters: "Cologne",
      owner: {
        name: "SID Sport-Informations-Dienst GmbH (AFP subsidiary)",
        type: "Independent specialized national sports wire",
      },
      ownershipKind: "private",
      frequency: "Continuous specialized national sports newswire",
      format: "Specialized national sports news wire",
      editorialStance:
        "Specialized national German sports wire; syndicates sports copy and photos to media clients",
      readership: {
        metric: "Principal German sports newswire for print and broadcast clients",
        source: "SID / Wikipedia",
      },
      sources: [
        "https://www.sid.de",
        "https://en.wikipedia.org/wiki/Sport-Informations-Dienst",
      ],
    }),
  ],
  IN: [
    agency({
      id: "in-pti",
      countryCode: "IN",
      name: "Press Trust of India",
      officialName: "Press Trust of India Ltd (PTI)",
      founded: 1947,
      language: "English, Hindi",
      headquarters: "New Delhi",
      owner: {
        name: "Press Trust of India (newspaper cooperative)",
        type: "National cooperative news wire agency",
      },
      ownershipKind: "cooperative",
      editorialStance:
        "India's largest news agency; not-for-profit cooperative owned by Indian newspapers; syndicates text and photos nationwide",
      readership: {
        metric: "Primary Indian national wire serving hundreds of newspapers and broadcasters",
        source: "PTI / Wikipedia",
      },
      sources: [
        "https://www.ptinews.com",
        "https://en.wikipedia.org/wiki/Press_Trust_of_India",
      ],
    }),
    agency({
      id: "in-uni",
      countryCode: "IN",
      name: "United News of India",
      officialName: "United News of India (UNI)",
      founded: 1959,
      language: "English, Hindi and Indian languages",
      headquarters: "New Delhi",
      owner: {
        name: "United News of India",
        type: "Independent commercial media",
      },
      ownershipKind: "private",
      editorialStance:
        "Major Indian national news agency; multilingual wire serving print and electronic media",
      readership: {
        metric: "Major Indian national wire alongside PTI",
        source: "UNI / Wikipedia",
      },
      sources: [
        "https://www.uniindia.com",
        "https://en.wikipedia.org/wiki/United_News_of_India",
      ],
    }),
    agency({
      id: "in-ians",
      countryCode: "IN",
      name: "Indo-Asian News Service",
      officialName: "Indo-Asian News Service (IANS)",
      founded: 1986,
      language: "English, Hindi",
      headquarters: "Noida / New Delhi",
      owner: {
        name: "Indo-Asian News Service",
        type: "Independent commercial media",
      },
      ownershipKind: "private",
      editorialStance:
        "Private Indian national and South Asian news agency; text and multimedia syndication",
      readership: {
        metric: "National Indian wire with South Asian focus",
        source: "IANS / Wikipedia",
      },
      sources: [
        "https://www.ians.in",
        "https://en.wikipedia.org/wiki/Indo-Asian_News_Service",
      ],
    }),
    agency({
      id: "in-ani",
      countryCode: "IN",
      name: "Asian News International",
      officialName: "Asian News International (ANI)",
      founded: 1971,
      language: "English, Hindi",
      headquarters: "New Delhi",
      owner: {
        name: "Asian News International",
        type: "Independent commercial media",
      },
      ownershipKind: "private",
      editorialStance:
        "Private Indian multimedia news agency; video, photo and text syndication to domestic and international clients",
      readership: {
        metric: "Major Indian multimedia newswire",
        source: "ANI / Wikipedia",
      },
      sources: [
        "https://www.aninews.in",
        "https://en.wikipedia.org/wiki/Asian_News_International",
      ],
    }),
  ],
  ID: [
    agency({
      id: "id-antara",
      countryCode: "ID",
      name: "Antara",
      officialName: "Lembaga Kantor Berita Nasional Antara",
      nativeName: "Antara",
      englishTranslation: "Antara National News Agency",
      founded: 1937,
      language: "Indonesian, English",
      headquarters: "Jakarta",
      owner: {
        name: "Government of Indonesia (Perum LKBN Antara)",
        type: "State-owned national news agency",
      },
      ownershipKind: "state",
      editorialStance:
        "Official state news agency of Indonesia; gathers and syndicates domestic and international news to media outlets",
      readership: {
        metric: "Primary Indonesian national newswire",
        source: "Antara / Wikipedia",
      },
      sources: [
        "https://www.antaranews.com",
        "https://en.wikipedia.org/wiki/Antara_(news_agency)",
      ],
    }),
    agency({
      id: "id-kbr",
      countryCode: "ID",
      name: "KBR",
      officialName: "Kantor Berita Radio (KBR)",
      founded: 1999,
      language: "Indonesian",
      headquarters: "Jakarta",
      owner: {
        name: "KBR / private multimedia",
        type: "Independent commercial media",
      },
      ownershipKind: "private",
      editorialStance:
        "Private Indonesian national radio/multimedia news agency; syndicates audio and digital news to partner stations and outlets",
      readership: {
        metric: "National private Indonesian news agency network",
        source: "KBR / Wikipedia",
      },
      sources: [
        "https://kbr.id",
        "https://en.wikipedia.org/wiki/KBR_(news_agency)",
      ],
    }),
  ],
  IR: [
    agency({
      id: "ir-fars",
      countryCode: "IR",
      name: "Fars News Agency",
      founded: 2003,
      language: "Persian, English",
      headquarters: "Tehran",
      owner: {
        name: "Fars News Agency",
        type: "Independent commercial media",
      },
      ownershipKind: "private",
      editorialStance: "Major Iranian domestic news agency; text and multimedia wire",
      readership: {
        metric: "Major Iranian national news agency",
        source: "Fars / Wikipedia",
      },
      sources: [
        "https://www.farsnews.ir",
        "https://en.wikipedia.org/wiki/Fars_News_Agency",
      ],
    }),
    agency({
      id: "ir-tasnim",
      countryCode: "IR",
      name: "Tasnim News Agency",
      founded: 2012,
      language: "Persian, English",
      headquarters: "Tehran",
      owner: {
        name: "Tasnim News Agency",
        type: "Independent commercial media",
      },
      ownershipKind: "private",
      editorialStance: "Major Iranian domestic news agency; text and multimedia wire",
      readership: {
        metric: "Major Iranian national news agency",
        source: "Tasnim / Wikipedia",
      },
      sources: [
        "https://www.tasnimnews.com",
        "https://en.wikipedia.org/wiki/Tasnim_News_Agency",
      ],
    }),
    agency({
      id: "ir-isna",
      countryCode: "IR",
      name: "ISNA",
      officialName: "Iranian Students' News Agency",
      founded: 1999,
      language: "Persian, English",
      headquarters: "Tehran",
      owner: {
        name: "Academic Center for Education, Culture and Research (ACECR)",
        type: "Independent news agency",
      },
      ownershipKind: "independent",
      editorialStance: "Iranian students' news agency; national wire serving media clients",
      readership: {
        metric: "Major Iranian national news agency",
        source: "ISNA / Wikipedia",
      },
      sources: [
        "https://www.isna.ir",
        "https://en.wikipedia.org/wiki/Iranian_Students%27_News_Agency",
      ],
    }),
    agency({
      id: "ir-mehr",
      countryCode: "IR",
      name: "Mehr News Agency",
      founded: 2003,
      language: "Persian, English",
      headquarters: "Tehran",
      owner: {
        name: "Islamic Ideology Dissemination Organization",
        type: "Independent news agency",
      },
      ownershipKind: "independent",
      editorialStance: "Major Iranian domestic news agency; text and photo wire",
      readership: {
        metric: "Major Iranian national news agency",
        source: "Mehr / Wikipedia",
      },
      sources: [
        "https://www.mehrnews.com",
        "https://en.wikipedia.org/wiki/Mehr_News_Agency",
      ],
    }),
    agency({
      id: "ir-ilna",
      countryCode: "IR",
      name: "ILNA",
      officialName: "Iranian Labour News Agency",
      founded: 2003,
      language: "Persian",
      headquarters: "Tehran",
      owner: {
        name: "Iranian Labour News Agency",
        type: "Independent news agency",
      },
      ownershipKind: "independent",
      editorialStance: "Iranian labour-focused national news agency; syndicates to media clients",
      readership: {
        metric: "Iranian national news agency",
        source: "ILNA / Wikipedia",
      },
      sources: [
        "https://www.ilna.ir",
        "https://en.wikipedia.org/wiki/Iranian_Labour_News_Agency",
      ],
    }),
  ],
  IT: [
    agency({
      id: "it-ansa",
      countryCode: "IT",
      name: "ANSA",
      officialName: "Agenzia Nazionale Stampa Associata",
      founded: 1945,
      language: "Italian, English and other languages",
      headquarters: "Rome",
      owner: {
        name: "ANSA cooperative (Italian publishers)",
        type: "Cooperative commercial national news agency",
      },
      ownershipKind: "cooperative",
      editorialStance:
        "Italy's principal national news agency; cooperative owned by Italian publishers; syndicates text, photos and video",
      readership: {
        metric: "Primary Italian national newswire",
        source: "ANSA / Wikipedia",
      },
      sources: [
        "https://www.ansa.it",
        "https://en.wikipedia.org/wiki/Agenzia_Nazionale_Stampa_Associata",
      ],
    }),
    agency({
      id: "it-agi",
      countryCode: "IT",
      name: "AGI",
      officialName: "Agenzia Giornalistica Italia",
      founded: 1950,
      language: "Italian",
      headquarters: "Rome",
      owner: {
        name: "Agenzia Giornalistica Italia",
        type: "Independent commercial media",
      },
      ownershipKind: "private",
      editorialStance: "Major Italian national news agency; text and multimedia syndication",
      readership: {
        metric: "Major Italian national wire",
        source: "AGI / Wikipedia",
      },
      sources: [
        "https://www.agi.it",
        "https://en.wikipedia.org/wiki/Agenzia_Giornalistica_Italia",
      ],
    }),
    agency({
      id: "it-adnkronos",
      countryCode: "IT",
      name: "Adnkronos",
      founded: 1963,
      language: "Italian",
      headquarters: "Rome",
      owner: {
        name: "Adnkronos Gruppo Editoriale",
        type: "Independent commercial media",
      },
      ownershipKind: "private",
      editorialStance: "Major Italian national news agency; text and multimedia syndication",
      readership: {
        metric: "Major Italian national wire",
        source: "Adnkronos / Wikipedia",
      },
      sources: [
        "https://www.adnkronos.com",
        "https://en.wikipedia.org/wiki/Adnkronos",
      ],
    }),
  ],
  JP: [
    agency({
      id: "jp-kyodo",
      countryCode: "JP",
      name: "Kyodo News",
      officialName: "Kyodo News",
      nativeName: "共同通信社",
      englishTranslation: "Kyodo News",
      founded: 1945,
      language: "Japanese, English",
      headquarters: "Tokyo",
      owner: {
        name: "Kyodo News (cooperative of Japanese newspapers)",
        type: "National cooperative news wire agency",
      },
      ownershipKind: "cooperative",
      editorialStance:
        "One of Japan's two central news agencies; nonprofit cooperative serving Japanese newspapers and broadcasters",
      readership: {
        metric: "Major Japanese national newswire",
        source: "Kyodo / Wikipedia",
      },
      sources: [
        "https://www.kyodonews.jp",
        "https://en.wikipedia.org/wiki/Kyodo_News",
      ],
    }),
    agency({
      id: "jp-jiji",
      countryCode: "JP",
      name: "Jiji Press",
      officialName: "Jiji Press Ltd.",
      nativeName: "時事通信社",
      englishTranslation: "Jiji Press",
      founded: 1945,
      language: "Japanese, English",
      headquarters: "Tokyo",
      owner: {
        name: "Jiji Press Ltd.",
        type: "Independent commercial media",
      },
      ownershipKind: "private",
      editorialStance:
        "One of Japan's two central news agencies; commercial wire serving media and corporate clients",
      readership: {
        metric: "Major Japanese national newswire",
        source: "Jiji / Wikipedia",
      },
      sources: [
        "https://www.jiji.com",
        "https://en.wikipedia.org/wiki/Jiji_Press",
      ],
    }),
  ],
  PK: [
    agency({
      id: "pk-ppi",
      countryCode: "PK",
      name: "Pakistan Press International",
      officialName: "Pakistan Press International (PPI)",
      founded: 1956,
      language: "English, Urdu",
      headquarters: "Karachi / Islamabad",
      owner: {
        name: "Pakistan Press International",
        type: "Independent commercial media",
      },
      ownershipKind: "private",
      editorialStance:
        "Private Pakistani national news agency; syndicates alongside the state APP",
      readership: {
        metric: "Major private Pakistani national wire",
        source: "PPI / Wikipedia",
      },
      sources: [
        "https://en.wikipedia.org/wiki/Pakistan_Press_International",
      ],
    }),
  ],
  RO: [
    agency({
      id: "ro-mediafax",
      countryCode: "RO",
      name: "Mediafax",
      founded: 1991,
      language: "Romanian",
      headquarters: "Bucharest",
      owner: {
        name: "Mediafax Group",
        type: "Independent commercial media",
      },
      ownershipKind: "private",
      editorialStance: "Private Romanian national news agency; text and multimedia wire",
      readership: {
        metric: "Major private Romanian national wire",
        source: "Mediafax / Wikipedia",
      },
      sources: [
        "https://www.mediafax.ro",
        "https://en.wikipedia.org/wiki/Mediafax",
      ],
    }),
    agency({
      id: "ro-rador",
      countryCode: "RO",
      name: "Rador",
      officialName: "Agenția de presă RADOR",
      founded: 1921,
      language: "Romanian",
      headquarters: "Bucharest",
      owner: {
        name: "Societatea Română de Radiodifuziune (Radio Romania)",
        type: "Public radio news agency",
      },
      ownershipKind: "public",
      editorialStance:
        "Public radio news agency of Radio Romania; syndicates monitored and original wire copy to media clients",
      readership: {
        metric: "Public Romanian national radio news agency",
        source: "Rador / Radio Romania",
      },
      sources: [
        "https://www.rador.ro",
        "https://en.wikipedia.org/wiki/Romanian_Radio_Broadcasting_Company",
      ],
    }),
  ],
  RU: [
    agency({
      id: "ru-interfax",
      countryCode: "RU",
      name: "Interfax",
      officialName: "Interfax Information Services Group",
      founded: 1989,
      language: "Russian, English",
      headquarters: "Moscow",
      owner: {
        name: "Interfax Group",
        type: "Independent commercial media",
      },
      ownershipKind: "private",
      editorialStance:
        "Major private Russian national and international news agency; text and financial wires",
      readership: {
        metric: "One of Russia's three largest national news agencies",
        source: "Interfax / Wikipedia",
      },
      sources: [
        "https://www.interfax.ru",
        "https://en.wikipedia.org/wiki/Interfax",
      ],
    }),
    agency({
      id: "ru-rossiya-segodnya",
      countryCode: "RU",
      name: "Rossiya Segodnya",
      officialName: "International News Agency Rossiya Segodnya",
      nativeName: "Россия сегодня",
      englishTranslation: "Russia Today (news agency)",
      founded: 2013,
      language: "Russian, English and multiple languages",
      headquarters: "Moscow",
      owner: {
        name: "Federal agency (Rossiya Segodnya)",
        type: "State-owned national news agency",
      },
      ownershipKind: "state",
      editorialStance:
        "State international news agency group (includes RIA Novosti brand); syndicates multimedia news",
      readership: {
        metric: "One of Russia's three largest national news agencies",
        source: "Rossiya Segodnya / Wikipedia",
      },
      sources: [
        "https://xn--c1acbl2abdlkab1og.xn--p1ai/",
        "https://en.wikipedia.org/wiki/Rossiya_Segodnya",
      ],
    }),
  ],
  KR: [
    agency({
      id: "kr-newsis",
      countryCode: "KR",
      name: "Newsis",
      officialName: "Newsis News Agency",
      nativeName: "뉴시스",
      englishTranslation: "Newsis",
      founded: 2001,
      language: "Korean",
      headquarters: "Seoul",
      owner: {
        name: "Newsis Co., Ltd.",
        type: "Independent commercial media",
      },
      ownershipKind: "private",
      editorialStance:
        "Major private South Korean news agency alongside Yonhap; syndicates text and photos to media clients",
      readership: {
        metric: "Second major South Korean national news agency",
        source: "Newsis / Wikipedia",
      },
      sources: [
        "https://www.newsis.com",
        "https://en.wikipedia.org/wiki/Newsis",
      ],
    }),
  ],
  ES: [
    agency({
      id: "es-europa-press",
      countryCode: "ES",
      name: "Europa Press",
      founded: 1953,
      language: "Spanish",
      headquarters: "Madrid",
      owner: {
        name: "Europa Press",
        type: "Independent commercial media",
      },
      ownershipKind: "private",
      editorialStance:
        "Private Spanish national news agency; syndicates text and multimedia alongside EFE",
      readership: {
        metric: "Major private Spanish national wire",
        source: "Europa Press / Wikipedia",
      },
      sources: [
        "https://www.europapress.es",
        "https://en.wikipedia.org/wiki/Europa_Press",
      ],
    }),
    agency({
      id: "es-acn",
      countryCode: "ES",
      name: "Catalan News Agency",
      officialName: "Agència Catalana de Notícies (ACN)",
      nativeName: "Agència Catalana de Notícies",
      englishTranslation: "Catalan News Agency",
      founded: 1999,
      language: "Catalan, Spanish, English",
      headquarters: "Barcelona",
      owner: {
        name: "Government of Catalonia (public corporation)",
        type: "Regional public news agency",
      },
      ownershipKind: "regional",
      editorialStance:
        "Public news agency of Catalonia; regional wire syndicating Catalan, Spanish and English copy",
      readership: {
        metric: "Principal Catalan regional newswire",
        source: "ACN / Wikipedia",
      },
      sources: [
        "https://www.acn.cat",
        "https://en.wikipedia.org/wiki/Catalan_News_Agency",
      ],
    }),
  ],
  TR: [
    agency({
      id: "tr-dha",
      countryCode: "TR",
      name: "Demirören News Agency",
      officialName: "Demirören Haber Ajansı (DHA)",
      founded: 1999,
      language: "Turkish",
      headquarters: "Istanbul",
      owner: {
        name: "Demirören Holding",
        type: "Independent commercial media",
      },
      ownershipKind: "private",
      editorialStance:
        "Major private Turkish national news agency; text, photo and video syndication",
      readership: {
        metric: "Major private Turkish national wire",
        source: "DHA / Wikipedia",
      },
      sources: [
        "https://www.dha.com.tr",
        "https://en.wikipedia.org/wiki/Demir%C3%B6ren_News_Agency",
      ],
    }),
    agency({
      id: "tr-iha",
      countryCode: "TR",
      name: "İhlas News Agency",
      officialName: "İhlas Haber Ajansı (İHA)",
      founded: 1993,
      language: "Turkish",
      headquarters: "Istanbul",
      owner: {
        name: "İhlas Holding",
        type: "Independent commercial media",
      },
      ownershipKind: "private",
      editorialStance:
        "Major private Turkish national news agency; video-led multimedia wire",
      readership: {
        metric: "Major private Turkish national wire",
        source: "İHA / Wikipedia",
      },
      sources: [
        "https://www.iha.com.tr",
        "https://en.wikipedia.org/wiki/%C4%B0hlas_News_Agency",
      ],
    }),
  ],
  UA: [
    agency({
      id: "ua-unian",
      countryCode: "UA",
      name: "UNIAN",
      officialName: "Ukrainian Independent Information Agency",
      founded: 1993,
      language: "Ukrainian, Russian, English",
      headquarters: "Kyiv",
      owner: {
        name: "1+1 Media Group",
        type: "Independent commercial media",
      },
      ownershipKind: "private",
      editorialStance:
        "Major private Ukrainian national news agency; text and multimedia syndication",
      readership: {
        metric: "Major private Ukrainian national wire",
        source: "UNIAN / Wikipedia",
      },
      sources: [
        "https://www.unian.info",
        "https://en.wikipedia.org/wiki/UNIAN",
      ],
    }),
    agency({
      id: "ua-ukrainian-news",
      countryCode: "UA",
      name: "Ukrainian News Agency",
      officialName: "Ukrainian News / Українські Новини",
      founded: 1993,
      language: "Ukrainian, Russian, English",
      headquarters: "Kyiv",
      owner: {
        name: "Ukrainian News Agency",
        type: "Independent commercial media",
      },
      ownershipKind: "private",
      editorialStance:
        "Private Ukrainian national news agency; syndicates political and business wire copy",
      readership: {
        metric: "Major Ukrainian national news agency",
        source: "Ukrainian News / Wikipedia",
      },
      sources: [
        "https://ukranews.com",
        "https://en.wikipedia.org/wiki/Ukrainian_News",
      ],
    }),
  ],
  GB: [
    agency({
      id: "gb-pa-media",
      countryCode: "GB",
      name: "PA Media",
      officialName: "PA Media (formerly Press Association)",
      founded: 1868,
      language: "English",
      headquarters: "London",
      owner: {
        name: "PA Media Group (publisher shareholders)",
        type: "Independent commercial media",
      },
      ownershipKind: "private",
      editorialStance:
        "UK national multimedia news agency; syndicates text, photos, video and data to newspapers, broadcasters and digital publishers",
      readership: {
        metric: "Primary UK domestic newswire alongside Reuters",
        source: "PA Media / Wikipedia",
      },
      sources: [
        "https://pa.media",
        "https://en.wikipedia.org/wiki/PA_Media",
      ],
    }),
  ],
  US: [
    agency({
      id: "us-upi",
      countryCode: "US",
      name: "United Press International",
      officialName: "United Press International (UPI)",
      founded: 1907,
      language: "English",
      headquarters: "Washington, D.C. / Boca Raton area operations",
      owner: {
        name: "News World Communications",
        type: "Independent commercial media",
      },
      ownershipKind: "private",
      editorialStance:
        "Historic US national and international news agency; continues as a commercial wire alongside AP",
      readership: {
        metric: "US national news agency wire",
        source: "UPI / Wikipedia",
      },
      sources: [
        "https://www.upi.com",
        "https://en.wikipedia.org/wiki/United_Press_International",
      ],
    }),
  ],
};

function loadConst(src, marker) {
  const start = src.indexOf(marker);
  if (start < 0) throw new Error(`Could not locate ${marker}`);
  const eq = src.indexOf("= {", start);
  const open = src.indexOf("{", eq);
  let depth = 0,
    i = open,
    inStr = null;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (c === "\\") {
        i++;
        continue;
      }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      inStr = c;
      continue;
    }
    if (c === "/" && src[i + 1] === "/") {
      i = src.indexOf("\n", i);
      if (i < 0) break;
      continue;
    }
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) {
        i++;
        break;
      }
    }
  }
  const literal = src.slice(open, i);
  return { data: Function(`"use strict"; return (${literal});`)(), open, end: i };
}

function serialize(agencies) {
  const keys = Object.keys(agencies).sort((a, b) => a.localeCompare(b));
  const lines = ["{"];
  for (const key of keys) {
    const list = agencies[key];
    lines.push(`  "${key}": [`);
    for (let i = 0; i < list.length; i++) {
      const a = list[i];
      lines.push("    {");
      for (const [k, v] of Object.entries(a)) {
        lines.push(`      "${k}": ${JSON.stringify(v, null, 0).replace(/\n/g, "")},`);
      }
      // trim trailing comma on last field — keep simple JSON-compatible trailing commas (TS allows)
      const last = lines[lines.length - 1];
      lines[lines.length - 1] = last; // keep trailing commas (prettier/TS OK)
      lines.push(i < list.length - 1 ? "    }," : "    }");
    }
    lines.push(key === keys[keys.length - 1] ? "  ]" : "  ],");
  }
  lines.push("}");
  return lines.join("\n");
}

const src = readFileSync(DATA_PATH, "utf8");
const headerEnd = src.indexOf("export const NATIONAL_NEWS_AGENCIES");
const header = src.slice(0, headerEnd);
const { data, end } = loadConst(src, "export const NATIONAL_NEWS_AGENCIES");
const footer = src.slice(end).replace(/^\s*;?\s*/, "");

for (const [cc, list] of Object.entries(PATCHES)) {
  if (list === null) delete data[cc];
  else data[cc] = list;
}

for (const [cc, list] of Object.entries(APPEND)) {
  const existing = data[cc] ? [...data[cc]] : [];
  const ids = new Set(existing.map((a) => a.id));
  for (const a of list) {
    if (!ids.has(a.id)) {
      existing.push(a);
      ids.add(a.id);
    }
  }
  data[cc] = existing;
}

// Tag ownershipKind on existing entries that lack it (derived at runtime anyway,
 // but pin multi-agency list primaries where owner.type is clear).
const PIN_KIND = {
  "az-azertac": "state",
  "az-trend": "private",
  "az-apa": "private",
  "az-report": "private",
  "bd-bss": "state",
  "br-agencia-brasil": "state",
  "gb-reuters": "private",
  "us-ap": "cooperative",
  "ir-irna": "state",
  "pk-app": "state",
  "ps-wafa": "state",
  "ps-maan-news": "independent",
  "ro-agerpres": "public",
  "ru-tass": "state",
  "kr-yonhap": "public",
  "es-agencia-efe": "state",
  "tr-anadolu-agency": "state",
  "ua-ukrinform": "state",
  "ua-interfax-ukraine": "private",
};

for (const list of Object.values(data)) {
  for (const a of list) {
    if (!a.ownershipKind && PIN_KIND[a.id]) a.ownershipKind = PIN_KIND[a.id];
  }
}

const out =
  header +
  "export const NATIONAL_NEWS_AGENCIES: Record<string, readonly NewsAgency[]> = " +
  serialize(data) +
  ";\n" +
  footer.replace(/^\n*/, "\n");

writeFileSync(DATA_PATH, out);
const total = Object.values(data).reduce((n, l) => n + l.length, 0);
console.log(`Wrote ${Object.keys(data).length} countries / ${total} agencies → ${DATA_PATH}`);
