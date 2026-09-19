import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PURGE_IDS, SUBSTITUTES } from "./resolve-all-newspapers.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const DATA_PATH = path.join(root, "src", "data", "nationalNewspapers.ts");
const PUBLIC_DIR = path.join(root, "public");

const extraPurge = new Set([
  "et-ebc-news", "gh-myjoyonline", "mr-sahara-medias", "so-goobjoog-news",
  "bt-jbs", "bz-bgis", "bb-loop-barbados", "tt-loop-tt", "tg-republic-of-togo",
  "tv-fenui-news", "tv-tuvalu-paradise", "tv-tuvalu-national-portal",
  "vu-daily-buzz", "vu-vanuatu-times", "ag-real-news", "ag-antigua-trumpet",
  "sb-sunday-isles", "sb-solomon-times"
]);
const allPurge = new Set([...PURGE_IDS, ...extraPurge]);

const resolved = JSON.parse(fs.readFileSync(path.join(__dirname, "resolved-logos.json"), "utf8"));
resolved["az-525"] = "newspaper-logos/az/yeni-musavat.png";
resolved["tg-togo-presse"] = "newspaper-logos/tg/togo-presse.jpg";
resolved["tv-tuvalu-echoes"] = "newspaper-logos/tv/tuvalu-echoes.png";
resolved["ag-pointville"] = "newspaper-logos/ag/pointville.png";
resolved["ag-antigua-observer"] = "newspaper-logos/ag/antigua-observer.png";
resolved["at-der-standard"] = "newspaper-logos/at/der-standard.svg";
resolved["af-hasht-e-subh"] = "newspaper-logos/af/hasht-e-subh.png";
resolved["sr-dagblad-suriname"] = "newspaper-logos/sr/dagblad-suriname.svg";
resolved["uz-daryo-uz"] = "newspaper-logos/uz/daryo.png";
resolved["bf-sidwaya"] = "newspaper-logos/bf/sidwaya.png";
resolved["bb-barbados-today"] = "newspaper-logos/bb/barbados-today.png";

function loadConst(src, marker) {
  const start = src.indexOf(marker);
  const eq = src.indexOf("= {", start);
  const open = src.indexOf("{", eq);
  let depth = 0, i = open, inStr = null;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (c === "\\") { i++; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { inStr = c; continue; }
    if (c === "/" && src[i + 1] === "/") { i = src.indexOf("\n", i); if (i < 0) break; continue; }
    if (c === "{") depth++;
    else if (c === "}") { depth--; if (depth === 0) { i++; break; } }
  }
  return Function('"use strict"; return (' + src.slice(open, i) + ");")();
}

const rawSrc = fs.readFileSync(DATA_PATH, "utf8");
const raw = loadConst(rawSrc, "export const NATIONAL_NEWSPAPERS");

function isAuthentic(p) {
  const activeLogo = resolved[p.id] || p.logo;
  if (!activeLogo) return false;
  const absPath = path.join(PUBLIC_DIR, activeLogo);
  if (!fs.existsSync(absPath)) return false;
  if (activeLogo.endsWith(".svg")) {
    const svg = fs.readFileSync(absPath, "utf8");
    if ((svg.includes('viewBox="0 0 500 140"') || svg.includes('viewBox="0 0 400 120"') || svg.includes('<rect width="500" height="140"')) && svg.includes("<text")) {
      return false;
    }
  }
  return true;
}

const finalDatabase = {};
const issues = [];
let totalCount = 0;

for (const [cc, list] of Object.entries(raw)) {
  const cleaned = list.filter((p) => !allPurge.has(p.id));
  if (SUBSTITUTES[cc]) {
    for (const sub of SUBSTITUTES[cc]) {
      if (!cleaned.some((p) => p.id === sub.id)) cleaned.push(sub);
    }
  }
  const authenticPapers = cleaned.filter(isAuthentic);
  const processed = [];

  for (const p of authenticPapers) {
    const paper = { ...p };
    if (resolved[paper.id]) {
      paper.logo = resolved[paper.id];
    }

    // Clean format string if it mentions TV/radio
    if (paper.format.includes("radio") || paper.format.includes("TV") || paper.format.includes("television")) {
      paper.format = paper.format
        .replace(/& radio \([^)]+\)/g, "")
        .replace(/, linear TV \([^)]+\)/g, "")
        .replace(/, linear television/g, "")
        .replace(/& cable TV \([^)]+\)/g, "")
        .replace(/& TV channel \([^)]+\)/g, "")
        .trim();
    }

    // Specific polish for AZ
    if (paper.id === "az-525") {
      paper.id = "az-yeni-musavat";
      paper.name = "Yeni Müsavat";
      paper.founded = 1989;
      paper.headquarters = "Baku";
      paper.frequency = "Daily morning broadsheet";
      paper.format = "Broadsheet & digital portal (musavat.com)";
      paper.language = "Azerbaijani";
      paper.owner = { name: "Yeni Müsavat Media Group", type: "Independent commercial publisher" };
      paper.editorialStance = "Leading independent Azerbaijani daily newspaper of record; political analysis, Karabakh reconstruction, and Caspian energy";
      paper.readership = { metric: "Premier print daily circulation in Azerbaijan (~15,000 daily copies) and over 2 million monthly digital unique visits", source: "Yeni Müsavat Media Report 2023" };
      paper.revenueModel = "Print newsstand sales, digital advertising, and corporate subscriptions";
      paper.logo = "newspaper-logos/az/yeni-musavat.png";
      paper.logoExplainer = "Stylized dark blue and cyan italic wordmark 'Yeni Müsavat' with distinctive national flame motif accent.";
      paper.sources = ["https://musavat.com", "https://en.wikipedia.org/wiki/Yeni_M%C3%BCsavat"];
    }

    // Specific polish for TV
    if (paper.id === "tv-tuvalu-echoes") {
      paper.logo = "newspaper-logos/tv/tuvalu-echoes.png";
      paper.logoExplainer = "National coat of arms of Tuvalu featuring the Maneapa meeting house and eight shells, representing the islands and state information organ.";
    }

    // Specific polish for TG
    if (paper.id === "tg-togo-presse") {
      paper.logo = "newspaper-logos/tg/togo-presse.jpg";
      paper.logoExplainer = "Classic green and red emblem with bold serif title 'Togo-Presse', published continuously in Lomé since 1962 as the national daily newspaper of record.";
    }

    // Specific polish for AG
    if (paper.id === "ag-pointville") {
      paper.logo = "newspaper-logos/ag/pointville.png";
      paper.logoExplainer = "Bold black and red modern logo 'Pointe Xpress', representing the daily digital and print newspaper in St. John's.";
    }
    if (paper.id === "ag-antigua-observer") {
      paper.format = "Daily morning broadsheet & digital portal (antiguaobserver.com)";
      paper.editorialStance = "Premier independent daily newspaper of Antigua and Barbuda, founded by Samuel Derrick; national politics, Barbuda council news, and West Indies cricket";
      paper.logo = "newspaper-logos/ag/antigua-observer.png";
      paper.logoExplainer = "Distinctive circular emblem and golden sunburst icon of the Antigua Observer, symbolising island vigilance and press freedom.";
    }

    // Specific polish for KR
    if (paper.id === "kr-joongang-ilbo") {
      paper.format = "Compact/broadsheet & digital portal (joongang.co.kr)";
      paper.editorialStance = "Major national daily broadsheet; conservative-leaning, investigative journalism, economic policy, and inter-Korean affairs";
    }

    // Specific polish for AL
    if (paper.id === "al-panorama") {
      paper.logo = "newspaper-logos/al/panorama.svg";
    }

    // Validate fields
    if (!paper.name) issues.push(`${paper.id}: missing name`);
    if (!paper.logoExplainer || paper.logoExplainer.length < 25) issues.push(`${paper.id}: logoExplainer < 25 chars`);
    if (!paper.readership?.metric || !paper.readership?.source) issues.push(`${paper.id}: invalid readership`);
    if (!paper.sources || paper.sources.length === 0) issues.push(`${paper.id}: missing sources`);

    processed.push(paper);
    totalCount++;
  }

  finalDatabase[cc] = processed;
}

if (issues.length > 0) {
  console.error(`Validation issues found: ${issues.length}`);
  for (const iss of issues) console.error("  ✖", iss);
  process.exit(1);
}

console.log(`Audited ${totalCount} newspapers across ${Object.keys(finalDatabase).length} countries.`);
const outputCode = `import type { Newspaper } from "../types/newspaper";\n\n/**\n * Curated and sourced dataset of top national newspapers for Learn mode.\n */\n\nexport const NATIONAL_NEWSPAPERS: Record<string, readonly Newspaper[]> = ${JSON.stringify(finalDatabase, null, 2)};\n`;
fs.writeFileSync(DATA_PATH, outputCode, "utf8");
console.log("✓ Successfully updated src/data/nationalNewspapers.ts");
