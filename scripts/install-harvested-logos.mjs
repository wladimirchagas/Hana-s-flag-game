#!/usr/bin/env node
/**
 * Install visually-verified newspaper/agency logos into public/ + data files.
 * Only entries listed in MANIFEST are touched. Never invents images.
 *
 * Usage: node scripts/install-harvested-logos.mjs
 */
import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve, join, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

/**
 * Visually verified batch 14 (2026-09). Each row: id, source path (repo-relative),
 * logoExplainer, licenceNote, optional kind override.
 */
const MANIFEST = [
  {
    id: "ru-tass",
    src: "tmp/logo-harvest/manual/ru/tass.svg",
    explainer:
      "Navy square with white 'Tass' wordmark — the agency's 2022 Latin brand mark from Wikimedia Commons.",
    licence:
      "TASS brand mark trademark bundled from Wikimedia Commons (File:TASS Logo (Latin) 2022.svg; Public domain) for educational reference in Learn mode.",
  },
  {
    id: "ma-map",
    src: "tmp/logo-harvest/manual/ma/map.jpg",
    explainer:
      "Blue square with Arabic title, white 'MAP' and 'AGENCE MAROCAINE DE PRESSE' — Maghreb Arabe Presse crest.",
    licence:
      "MAP / Agence Marocaine de Presse brand mark trademark bundled from Wikimedia Commons (File:MAPmaroc-logo.jpg) for educational reference in Learn mode.",
  },
  {
    id: "ao-angop",
    src: "tmp/logo-harvest/manual/ao/angop.jpg",
    explainer:
      "Orange italic 'ANGOP' with grey signal swooshes over 'Agência Angola Press' — the agency wordmark.",
    licence:
      "ANGOP brand mark trademark bundled from Wikimedia Commons (File:Logo Angop.jpg) for educational reference in Learn mode.",
  },
  {
    id: "sn-aps",
    src: "tmp/logo-harvest/manual/sn/aps.png",
    explainer:
      "Globe highlighting Senegal beside bold 'APS' over 'Agence de Presse Sénégalaise' — the APS crest.",
    licence:
      "APS Sénégal brand mark trademark bundled from Wikimedia Commons (File:APS Sénégal logo.png) for educational reference in Learn mode.",
  },
  {
    id: "si-sta",
    src: "tmp/logo-harvest/manual/si/sta.jpg",
    explainer:
      "Black rounded bar with white 'sta', yellow triangle accent, and Slovenian/English agency names.",
    licence:
      "STA brand mark trademark bundled from Wikimedia Commons (File:Sta logotip.jpg) for educational reference in Learn mode.",
  },
  {
    id: "ps-maan-news",
    src: "tmp/logo-harvest/manual/ps/maan-news.jpg",
    explainer:
      "Glossy red circular badge with white Arabic 'معاً' calligraphy — Ma'an News Agency emblem.",
    licence:
      "Ma'an News Agency brand mark trademark bundled from Wikimedia Commons (File:Ma'an Logo.jpg; CC BY 3.0) for educational reference in Learn mode.",
  },
  {
    id: "bb-nation-news",
    src: "tmp/logo-harvest/bb/nation-news.png",
    explainer:
      "Magenta 'NationNews' wordmark with a star built into the 'a' — Barbados NationNews digital masthead.",
    licence:
      "NationNews Barbados masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "bw-sunday-standard",
    src: "tmp/logo-harvest/bw/sunday-standard.png",
    explainer:
      "Overlapping black and slate 'S' letters — Sunday Standard (Botswana) brand monogram from its site.",
    licence:
      "Sunday Standard brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "cu-granma",
    src: "tmp/logo-harvest/cu/granma.png",
    explainer:
      "Bold italic red 'Granma' wordmark — the Cuban Communist Party newspaper's classic masthead.",
    licence:
      "Granma masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "dj-adi",
    src: "tmp/logo-harvest/dj/adi.png",
    explainer:
      "ADI mark with globe and green/red letter tiles beside 'AGENCE DJIBOUTIENNE D'INFORMATION'.",
    licence:
      "ADI brand mark trademark bundled from the agency's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "kg-24-kg",
    src: "tmp/logo-harvest/kg/24-kg.png",
    explainer:
      "Stylised red '24' with stacked navy 'KG' — the 24.kg news portal brand mark.",
    licence:
      "24.kg brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "kg-akipress",
    src: "tmp/logo-harvest/kg/akipress.png",
    explainer:
      "Teal diagonal-bar icon beside 'AKИpress' wordmark — AKIPress news agency crest.",
    licence:
      "AKIPress brand mark trademark bundled from the agency's official site brand assets for educational reference in Learn mode.",
  },
];

function sha256(buf) {
  return createHash("sha256").update(buf).digest("hex");
}

function patchEntry(src, id, fields) {
  // Find the object block for this id and replace noImageReason with logo fields
  const idRe = new RegExp(`"id":\\s*"${id}"`);
  const m = idRe.exec(src);
  if (!m) throw new Error(`id not found: ${id}`);
  // Walk backwards to find the opening `{` of this object (previous `{` after a `[` or `,`)
  let start = m.index;
  while (start > 0 && src[start] !== "{") start--;
  // Find matching close brace
  let depth = 0,
    i = start,
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
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) {
        i++;
        break;
      }
    }
  }
  let block = src.slice(start, i);
  if (!block.includes("noImageReason") && block.includes('"logo"')) {
    console.log(`  skip ${id} (already has logo)`);
    return src;
  }
  if (!block.includes("noImageReason")) {
    throw new Error(`${id}: expected noImageReason to replace`);
  }
  // Remove noImageReason line
  block = block.replace(/\s*"noImageReason":\s*"(?:\\.|[^"\\])*",?\n?/, "\n");
  // Insert logo fields before sources (or at end before closing)
  const insert = `      "logo": ${JSON.stringify(fields.logo)},\n      "logoExplainer": ${JSON.stringify(fields.explainer)},\n      "licenceNote": ${JSON.stringify(fields.licence)},\n`;
  if (/"sources":/.test(block)) {
    block = block.replace(/(\n\s*)"sources":/, `\n${insert}$1"sources":`);
  } else {
    block = block.replace(/\n(\s*)\}$/, `,\n${insert}$1}`);
  }
  // tidy double commas / trailing commas before }
  block = block.replace(/,(\s*),/g, ",$1").replace(/,(\s*)\}/g, "$1}");
  return src.slice(0, start) + block + src.slice(i);
}

function main() {
  let papers = readFileSync(resolve(ROOT, "src/data/nationalNewspapers.ts"), "utf8");
  let agencies = readFileSync(resolve(ROOT, "src/data/nationalNewsAgencies.ts"), "utf8");
  let installed = 0;
  for (const row of MANIFEST) {
    const abs = resolve(ROOT, row.src);
    if (!existsSync(abs)) throw new Error(`missing source: ${row.src}`);
    const buf = readFileSync(abs);
    const ext = extname(row.src).toLowerCase() || ".png";
    const cc = row.id.slice(0, 2);
    const slug = row.id.slice(3);
    const relDir = `newspaper-logos/${cc}`;
    const destName = `${slug}${ext}`;
    const destRel = `${relDir}/${destName}`;
    const destAbs = resolve(ROOT, "public", destRel);
    mkdirSync(dirname(destAbs), { recursive: true });
    copyFileSync(abs, destAbs);
    const fields = {
      logo: destRel,
      explainer: row.explainer,
      licence: row.licence,
      sha256: sha256(buf),
    };
    console.log(`install ${row.id} → ${destRel} (${buf.length}b sha=${fields.sha256.slice(0, 12)}…)`);
    // Dual-patch: same id may exist in both datasets
    const beforeP = papers;
    const beforeA = agencies;
    try {
      papers = patchEntry(papers, row.id, fields);
    } catch (e) {
      if (!String(e.message).includes("not found")) throw e;
    }
    try {
      agencies = patchEntry(agencies, row.id, fields);
    } catch (e) {
      if (!String(e.message).includes("not found")) throw e;
    }
    if (papers === beforeP && agencies === beforeA) {
      throw new Error(`${row.id}: not found in newspapers or agencies`);
    }
    installed++;
  }
  writeFileSync(resolve(ROOT, "src/data/nationalNewspapers.ts"), papers);
  writeFileSync(resolve(ROOT, "src/data/nationalNewsAgencies.ts"), agencies);
  console.log(`Installed ${installed} logos.`);
}

main();
