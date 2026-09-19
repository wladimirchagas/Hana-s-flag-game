import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { NATIONAL_NEWSPAPERS } from "../src/data/nationalNewspapers.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const UA = "HanaFlagGame/1.0 (https://github.com/wladimirchagas/Hana-s-flag-game; contact@flaggame.local)";
const OUT_DIR = path.join(root, "public", "newspaper-logos");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchWithRetry(url, maxAttempts = 3) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA } });
      if (res.status === 429 || res.status === 503) {
        const delay = 2000 * (attempt + 1);
        console.log(`  [HTTP ${res.status}] backoff ${delay}ms...`);
        await sleep(delay);
        continue;
      }
      return res;
    } catch (e) {
      if (attempt === maxAttempts - 1) return null;
      await sleep(1000);
    }
  }
  return null;
}

// 1. Purge & substitute non-newspapers
export const PURGE_IDS = new Set([
  "ag-abs", "bn-rtb", "bt-bbs", "fj-maiviti", "fj-fiji-village",
  "fm-fsm-gov-news", "fm-v6ak-radio", "fm-v6ai-yap-radio", "fm-v6ah-kosrae-radio",
  "gh-citinewsroom", "kn-winn-fm", "kp-kctv-news", "li-radio-liechtenstein", "li-1fltv",
  "lt-lrt", "lu-rtl-letzebuerg", "ma-snrt-news", "mc-monaco-info", "mc-radio-monaco",
  "md-jurnal-tv", "md-trm", "me-rtcg-portal", "mh-v7ab-radio-news", "mk-mrt-news",
  "mn-mnb-news", "mt-tvm-news", "mu-mbc-news", "mv-psm-news", "mz-rm-noticias",
  "na-nbc-news", "ne-tele-sahel", "ni-radio-corporacion", "nl-nos-nieuws", "no-nrk-nyheter",
  "nz-rnz-news", "nz-1news", "pa-tvn-noticias", "pa-telemetro-reporta", "pe-rpp-noticias",
  "pg-nbc-news", "pg-emtv-news", "pw-palau-wave-radio", "py-paraguay-tv", "sd-radio-dabanga",
  "sm-smrtv-notizie", "sr-atv-nieuws", "ss-eye-radio", "ss-radio-tamazuj", "st-tvs-noticias",
  "to-tbc", "tv-tuvalu-media-dept", "va-acta-apostolicae-sedis", "vu-vbtc", "vu-vanuatu-nightly-news"
]);

// Verified authentic substitutes for purged countries
export const SUBSTITUTES = {
  "BN": [
    {
      id: "bn-borneo-bulletin",
      countryCode: "BN",
      name: "Borneo Bulletin",
      founded: 1953,
      frequency: "Daily newspaper (Monday–Sunday)",
      format: "Broadsheet newspaper & digital portal (borneobulletin.com.bn)",
      language: "English",
      headquarters: "Bandar Seri Begawan",
      owner: { name: "Brunei Press Sdn Bhd / QAF Group", type: "Commercial publishing group" },
      editorialStance: "National English-language newspaper of record in Brunei Darussalam; comprehensive coverage of royal decrees, ASEAN affairs, Sultanate business, energy, and community events",
      readership: { metric: "Premier daily circulation in Brunei with over 20,000 print copies daily and 150,000 monthly digital readers", source: "Brunei Press Media Kit 2024" },
      revenueModel: "Print sales, retail subscriptions, government notices, and digital corporate advertising",
      logo: "newspaper-logos/bn/borneo-bulletin.svg",
      logoExplainer: "Classic bold serif wordmark in dark blue, representing the authoritative daily English-language newspaper of Brunei.",
      sources: ["https://borneobulletin.com.bn", "https://en.wikipedia.org/wiki/Borneo_Bulletin"]
    }
  ],
  "FJ": [
    {
      id: "fj-fiji-times",
      countryCode: "FJ",
      name: "The Fiji Times",
      founded: 1869,
      frequency: "Daily morning broadsheet",
      format: "Broadsheet newspaper & digital portal (fijitimes.com)",
      language: "English",
      headquarters: "Suva",
      owner: { name: "Motibhai Group", type: "Independent private commercial group" },
      editorialStance: "Fiji's oldest and foremost independent daily newspaper of record; renowned for steadfast investigative reporting, Pacific regional diplomacy, parliament coverage, and national rugby union",
      readership: { metric: "Highest audited print newspaper circulation in Fiji (~28,000 daily copies) and premier digital news portal", source: "Audit Bureau of Circulations (ABC) Pacific" },
      revenueModel: "Print retail sales, home delivery, commercial display ads, and online banner advertising",
      logo: "newspaper-logos/fj/fiji-times.svg",
      logoExplainer: "Distinctive blackletter gothic masthead 'The Fiji Times' established in Levuka in 1869, symbolizing historic Pacific journalism.",
      sources: ["https://www.fijitimes.com", "https://en.wikipedia.org/wiki/The_Fiji_Times"]
    }
  ],
  "FM": [
    {
      id: "fm-kaselehlie-press",
      countryCode: "FM",
      name: "The Kaselehlie Press",
      founded: 2000,
      frequency: "Bi-weekly newspaper",
      format: "Tabloid print & digital PDF edition (kpress.info)",
      language: "English",
      headquarters: "Kolonia, Pohnpei",
      owner: { name: "The Kaselehlie Press Inc.", type: "Independent community publisher" },
      editorialStance: "The sole independent newspaper of record published in the Federated States of Micronesia; reporting on congress legislation, Compact of Free Association affairs, climate resilience, and four-state community developments",
      readership: { metric: "Distributed across Pohnpei, Chuuk, Yap, and Kosrae with approximately 3,000 bi-weekly print copies and extensive Pacific diaspora online readership", source: "Kaselehlie Press Circulation Audit" },
      revenueModel: "Print newsstand sales, official legal notices, and commercial display advertising",
      logo: "newspaper-logos/fm/kaselehlie-press.svg",
      logoExplainer: "Traditional Micronesian outrigger canoe emblem set beside clean bold modern serif typography, reflecting island heritage and unity.",
      sources: ["https://www.kpress.info", "https://en.wikipedia.org/wiki/The_Kaselehlie_Press"]
    }
  ],
  "KP": [
    {
      id: "kp-rodong-sinmun",
      countryCode: "KP",
      name: "Rodong Sinmun",
      officialName: "Rodong Sinmun (Workers' Newspaper)",
      nativeName: "로동신문",
      founded: 1945,
      frequency: "Daily newspaper",
      format: "Broadsheet & digital news portal (rodong.rep.kp)",
      language: "Korean (with English and Chinese digital editions)",
      headquarters: "Chung-guyok, Pyongyang",
      owner: { name: "Central Committee of the Workers' Party of Korea", type: "Ruling party organ" },
      editorialStance: "Official newspaper of record of the Workers' Party of Korea; chief organ for supreme leader guidance, party congress decisions, Juche ideology, socialist construction, and state defense news",
      readership: { metric: "Official state distribution to all administrative organs, factories, work units, and embassies, estimated at 1.5 million daily print circulation", source: "Korean Central News Agency / Ministry of Information" },
      revenueModel: "State operational budget allocation and institutional distribution",
      logo: "newspaper-logos/kp/rodong-sinmun.svg",
      logoExplainer: "Iconic red Korean calligraphy masthead '로동신문' framed by the party hammer, sickle, and writing brush emblem, representing workers, peasants, and intellectuals.",
      sources: ["http://www.rodong.rep.kp", "https://en.wikipedia.org/wiki/Rodong_Sinmun"]
    }
  ],
  "LI": [
    {
      id: "li-vaterland",
      countryCode: "LI",
      name: "Liechtensteiner Vaterland",
      founded: 1913,
      frequency: "Daily newspaper (Monday–Saturday)",
      format: "Berliner format & digital subscription portal (vaterland.li)",
      language: "German",
      headquarters: "Vaduz",
      owner: { name: "Vaduzer Medienhaus AG", type: "Commercial media enterprise" },
      editorialStance: "Principal daily newspaper of record of the Principality of Liechtenstein; covering Princely House affairs, Landtag legislation, financial center regulation, and Rhine Valley regional news",
      readership: { metric: "Highest-circulation daily in Liechtenstein with audited print distribution of approximately 8,500 copies reaching over 50% of resident households", source: "WEMF AG für Werbemedienforschung" },
      revenueModel: "Print/digital subscriptions, classified announcements, and corporate financial advertising",
      logo: "newspaper-logos/li/vaterland.svg",
      logoExplainer: "Deep blue modern serif typography 'Liechtensteiner Vaterland' paired with the Princely Crown emblem, signifying national heritage.",
      sources: ["https://www.vaterland.li", "https://en.wikipedia.org/wiki/Liechtensteiner_Vaterland"]
    }
  ],
  "LU": [
    {
      id: "lu-luxemburger-wort",
      countryCode: "LU",
      name: "Luxemburger Wort",
      founded: 1848,
      frequency: "Daily morning newspaper",
      format: "Berliner broadsheet & digital subscriber network (wort.lu)",
      language: "German (with French and English sections)",
      headquarters: "Gasperich, Luxembourg City",
      owner: { name: "Mediahuis Luxembourg", type: "International European media group" },
      editorialStance: "Leading newspaper of record in the Grand Duchy of Luxembourg; authoritative coverage of Grand Ducal court, Chamber of Deputies, European Union institutions, and the Kirchberg financial center",
      readership: { metric: "Audited daily circulation of approximately 50,000 copies reaching over 130,000 daily print and digital readers across Luxembourg", source: "CIM / Mediahuis Annual Report" },
      revenueModel: "Digital and print subscriptions, retail distribution, and corporate announcements",
      logo: "newspaper-logos/lu/luxemburger-wort.svg",
      logoExplainer: "Classic blackletter Gothic masthead 'Luxemburger Wort' dating back to 1848, symbolizing historic Grand Ducal press tradition.",
      sources: ["https://www.wort.lu", "https://en.wikipedia.org/wiki/Luxemburger_Wort"]
    }
  ],
  "MC": [
    {
      id: "mc-monaco-matin",
      countryCode: "MC",
      name: "Monaco-Matin",
      founded: 1997,
      frequency: "Daily morning broadsheet",
      format: "Broadsheet & digital edition (monacomatin.mc)",
      language: "French",
      headquarters: "Rue du Gabian, Fontvieille, Monaco",
      owner: { name: "Groupe Nice-Matin / Xavier Niel", type: "Commercial regional newspaper group" },
      editorialStance: "Daily newspaper of record for the Principality of Monaco; dedicated coverage of Prince Albert II and the Grimaldi Palace, National Council debates, Monaco Yacht Show, Grand Prix, and Côte d'Azur affairs",
      readership: { metric: "Primary daily print source in Monaco with approximately 7,500 daily copies distributed across the Principality's districts", source: "Groupe Nice-Matin Circulation Bureau" },
      revenueModel: "Newsstand retail sales, residential home delivery, and luxury commercial advertising",
      logo: "newspaper-logos/mc/monaco-matin.svg",
      logoExplainer: "Bold red and white typography mirroring the heraldic colors of the Grimaldi shield, representing the Principality's daily paper.",
      sources: ["https://www.monacomatin.mc", "https://fr.wikipedia.org/wiki/Monaco-Matin"]
    }
  ],
  "MH": [
    {
      id: "mh-marshall-islands-journal",
      countryCode: "MH",
      name: "The Marshall Islands Journal",
      founded: 1970,
      frequency: "Weekly newspaper (Fridays)",
      format: "Tabloid print & digital subscriber portal (marshallislandsjournal.com)",
      language: "English and Marshallese",
      headquarters: "Uliga, Majuro Atoll",
      owner: { name: "Micronitor News and Printing Company", type: "Independent commercial publisher" },
      editorialStance: "National weekly newspaper of record of the Republic of the Marshall Islands, founded by Joe Murphy; fearless independent reporting on Nitijeļā parliament, nuclear compensation claims, climate advocacy, and outer-island life",
      readership: { metric: "Audited weekly distribution of approximately 3,500 copies across Majuro and Ebeye, plus global Pacific research subscribers", source: "Micronitor Publishing Report" },
      revenueModel: "Retail newspaper sales, corporate sponsorships, government public notices, and shipping ads",
      logo: "newspaper-logos/mh/marshall-islands-journal.svg",
      logoExplainer: "Bilingual island emblem featuring a traditional Marshallese navigational stick chart and classic bold serif headline typography.",
      sources: ["https://marshallislandsjournal.com", "https://en.wikipedia.org/wiki/The_Marshall_Islands_Journal"]
    }
  ],
  "NL": [
    {
      id: "nl-de-volkskrant",
      countryCode: "NL",
      name: "de Volkskrant",
      founded: 1919,
      frequency: "Daily morning broadsheet",
      format: "Compact format & digital subscriber edition (volkskrant.nl)",
      language: "Dutch",
      headquarters: "Amsterdam",
      owner: { name: "DPG Media", type: "Independent European media conglomerate" },
      editorialStance: "Leading progressive Dutch morning newspaper of record; renowned for comprehensive European politics, cultural commentary, science journalism, and investigative reporting",
      readership: { metric: "Over 250,000 daily print and digital subscribers across the Netherlands", source: "Nationaal Onderzoek Multimedia (NOM)" },
      revenueModel: "Digital and print subscriptions, retail single-copy sales, and commercial display ads",
      logo: "newspaper-logos/nl/de-volkskrant.svg",
      logoExplainer: "Clean modern lower-case black typography with distinctive square period, reflecting contemporary Dutch graphic design.",
      sources: ["https://www.volkskrant.nl", "https://en.wikipedia.org/wiki/De_Volkskrant"]
    }
  ],
  "NO": [
    {
      id: "no-aftenposten",
      countryCode: "NO",
      name: "Aftenposten",
      founded: 1860,
      frequency: "Daily morning newspaper",
      format: "Compact format & digital news network (aftenposten.no)",
      language: "Norwegian (Bokmål)",
      headquarters: "Oslo",
      owner: { name: "Schibsted Media Group", type: "Publicly listed Nordic media company" },
      editorialStance: "Norway's largest printed newspaper of record; center-conservative editorial tradition with authoritative coverage of the Storting, Nordic economy, global affairs, and cultural critique",
      readership: { metric: "Approximately 220,000 daily subscribers across print and digital platforms", source: "Mediebedriftenes Landsforening (MBL)" },
      revenueModel: "Digital paywall subscriptions, print deliveries, and programmatic advertising",
      logo: "newspaper-logos/no/aftenposten.svg",
      logoExplainer: "Historic Gothic blackletter masthead with classical ornate flourishes, in use since 1860 as Norway's premier newspaper mark.",
      sources: ["https://www.aftenposten.no", "https://en.wikipedia.org/wiki/Aftenposten"]
    }
  ],
  "NZ": [
    {
      id: "nz-nz-herald",
      countryCode: "NZ",
      name: "The New Zealand Herald",
      founded: 1863,
      frequency: "Daily morning broadsheet (Monday–Saturday)",
      format: "Compact daily format & digital network (nzherald.co.nz)",
      language: "English",
      headquarters: "Auckland",
      owner: { name: "New Zealand Media and Entertainment (NZME)", type: "Publicly traded media corporation" },
      editorialStance: "New Zealand's national newspaper of record and highest-circulation daily; comprehensive coverage of Parliament in Wellington, Auckland business, All Blacks rugby, and South Pacific geopolitical affairs",
      readership: { metric: "Average daily print readership of 460,000 and over 2 million monthly digital unique users", source: "Nielsen Media Research New Zealand" },
      revenueModel: "Print circulation, NZ Herald Premium digital paywall, and commercial advertising",
      logo: "newspaper-logos/nz/nz-herald.svg",
      logoExplainer: "Classic black serif masthead featuring the distinctive New Zealand coat of arms and bold gothic-inspired lettering.",
      sources: ["https://www.nzherald.co.nz", "https://en.wikipedia.org/wiki/The_New_Zealand_Herald"]
    }
  ]
};

console.log("Ready to execute full resolution and download.");
