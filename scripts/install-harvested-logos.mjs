#!/usr/bin/env node
/**
 * Install visually-verified newspaper/agency logos into public/ + data files.
 * Only entries listed in MANIFEST are touched. Never invents images.
 */
import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

/** Visually verified batch 17 — official sites, Wayback, Commons (montage-scanned). */
const MANIFEST = [
  {
    id: "tt-ttt-news",
    src: "tmp/logo-harvest/manual/tt/ttt-news-b17.png",
    explainer:
      "Red stylised 'TTT' on a white play-triangle — Trinidad and Tobago Television crest from ttt.live.",
    licence:
      "TTT brand mark trademark bundled from the broadcaster's official site brand assets (ttt.live) for educational reference in Learn mode.",
  },
  {
    id: "er-shabait",
    src: "tmp/logo-harvest/manual/er/shabait-b17-plate.png",
    explainer:
      "Gold camel seal beside 'MINISTRY OF INFORMATION / ERITREA' on a dark plate — Shabait (Eritrea MoI) masthead.",
    licence:
      "Shabait / Ministry of Information Eritrea brand mark trademark bundled from the agency's official site brand assets (shabait.com) for educational reference in Learn mode.",
  },
  {
    id: "mz-aim",
    src: "tmp/logo-harvest/manual/mz/aim-b17-plate.png",
    explainer:
      "Connected pink-red 'AIM' wordmark on white — Agência de Informação de Moçambique crest from aimnews.org.",
    licence:
      "AIM brand mark trademark bundled from the agency's official site brand assets (aimnews.org) for educational reference in Learn mode.",
  },
  {
    id: "zm-zanis",
    src: "tmp/logo-harvest/manual/zm/zanis-b17.jpg",
    explainer:
      "Circular green/orange ring around bold 'ZANIS' — Zambia News and Information Services crest.",
    licence:
      "ZANIS brand mark trademark bundled from the agency's official site brand assets (zanis.gov.zm) for educational reference in Learn mode.",
  },
  {
    id: "bd-bss",
    src: "tmp/logo-harvest/manual/bd/bss-b17.png",
    explainer:
      "Circular Bangladesh seal beside green 'BSS' and red 'NEWS' with the English portal tagline — Bangladesh Sangbad Sangstha crest.",
    licence:
      "BSS brand mark trademark bundled from the agency's official site brand assets (bssnews.net via Wayback Machine snapshot of the live logo file) for educational reference in Learn mode.",
  },
  {
    id: "ph-pna",
    src: "tmp/logo-harvest/manual/ph/pna-b17.svg",
    explainer:
      "Blue disc with white stylised 'P' mark — Philippine News Agency crest from Wikimedia Commons.",
    licence:
      "Philippine News Agency Logo.svg from Wikimedia Commons; government work / brand mark bundled for educational reference in Learn mode.",
  },
  {
    id: "bs-bis",
    src: "tmp/logo-harvest/manual/bs/bis-b17-plate.png",
    explainer:
      "Bahamas coat of arms beside 'The Government of The Bahamas' on a navy plate — the official bahamas.gov.bs header mark used by Bahamas Information Services.",
    licence:
      "Government of The Bahamas crest trademark bundled from the official government CDN brand asset on bahamas.gov.bs for educational reference in Learn mode.",
  },
  {
    id: "jm-jamaica-observer",
    src: "tmp/logo-harvest/manual/jm/jamaica-observer-b17.png",
    explainer:
      "Globe emblem beside stacked black 'JAMAICA' over red 'OBSERVER' — Jamaica Observer masthead from jamaicaobserver.com.",
    licence:
      "Jamaica Observer brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "bd-prothom-alo",
    src: "tmp/logo-harvest/manual/bd/prothom-alo-b17-plate.png",
    explainer:
      "Orange rising-sun mark over the Bengali 'প্রথম আলো' wordmark on white — Prothom Alo masthead from prothomalo.com.",
    licence:
      "Prothom Alo brand mark trademark bundled from the publisher's official site brand assets (palo-bangla.svg) for educational reference in Learn mode.",
  },
  {
    id: "do-diario-libre",
    src: "tmp/logo-harvest/manual/do/diario-libre-b17.png",
    explainer:
      "Green square with white 'Diario Libre' and a yellow news-carrier figure — Diario Libre crest from diariolibre.com.",
    licence:
      "Diario Libre brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "es-el-periodico",
    src: "tmp/logo-harvest/manual/es/el-periodico-b17.png",
    explainer:
      "White 'elPeriódico' wordmark on a solid red field — El Periódico de Catalunya masthead from elperiodico.com.",
    licence:
      "El Periódico brand mark trademark bundled from the publisher's official site brand assets (elperiodico.com) for educational reference in Learn mode.",
  },
];

function sha256(buf) {
  return createHash("sha256").update(buf).digest("hex");
}

function patchEntry(src, id, fields) {
  const idRe = new RegExp(`"id":\\s*"${id}"`);
  const m = idRe.exec(src);
  if (!m) throw new Error(`id not found: ${id}`);
  let start = m.index;
  while (start > 0 && src[start] !== "{") start--;
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
  block = block.replace(/\s*"noImageReason":\s*"(?:\\.|[^"\\])*",?\n?/, "\n");
  const insert = `      "logo": ${JSON.stringify(fields.logo)},\n      "logoExplainer": ${JSON.stringify(fields.explainer)},\n      "licenceNote": ${JSON.stringify(fields.licence)},\n`;
  if (/"sources":/.test(block)) {
    block = block.replace(/(\n\s*)"sources":/, `\n${insert}$1"sources":`);
  } else {
    block = block.replace(/\n(\s*)\}$/, `,\n${insert}$1}`);
  }
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
    const destRel = `newspaper-logos/${cc}/${slug}${ext}`;
    const destAbs = resolve(ROOT, "public", destRel);
    mkdirSync(dirname(destAbs), { recursive: true });
    copyFileSync(abs, destAbs);
    const fields = { logo: destRel, explainer: row.explainer, licence: row.licence, sha256: sha256(buf) };
    console.log(`install ${row.id} → ${destRel} (${buf.length}b)`);
    const beforeP = papers,
      beforeA = agencies;
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
    if (papers === beforeP && agencies === beforeA) throw new Error(`${row.id}: not found`);
    installed++;
  }
  writeFileSync(resolve(ROOT, "src/data/nationalNewspapers.ts"), papers);
  writeFileSync(resolve(ROOT, "src/data/nationalNewsAgencies.ts"), agencies);
  console.log(`Installed ${installed} logos.`);
}

main();
