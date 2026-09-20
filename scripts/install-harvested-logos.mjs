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
 * Visually verified batch 15 (2026-09). Browser-UA site assets + Wikimedia.
 */
const MANIFEST = [
  {
    id: "bj-abp",
    src: "tmp/logo-harvest/manual/bj/abp-b15.jpg",
    explainer:
      "Green 'ABP' wordmark beside a Benin-coloured dotted globe over 'AGENCE BENIN PRESSE' — Agence Bénin Presse crest.",
    licence:
      "Agence Bénin Presse brand mark trademark bundled from Wikimedia Commons (File:Logo de l'Agence Bénin Presse.jpg) for educational reference in Learn mode.",
  },
  {
    id: "rs-tanjug",
    src: "tmp/logo-harvest/manual/rs/tanjug-b15.png",
    explainer:
      "Navy plate with white 'Tanjug' wordmark: rounded 'T' badge and red square accent — Tanjug header brand from its site.",
    licence:
      "Tanjug brand mark trademark bundled from the agency's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "az-azertac",
    src: "tmp/logo-harvest/manual/az/azertac-b15.svg",
    explainer:
      "Navy 'AZƏRTAC' wordmark beside an eight-point star emblem with speech-bubble motifs — Azerbaijan State News Agency crest.",
    licence:
      "AzərTAc brand mark trademark bundled from the agency's official site brand assets (azertag.az/resources/images/logo.svg) for educational reference in Learn mode.",
  },
  {
    id: "jo-petra",
    src: "tmp/logo-harvest/manual/jo/petra-b15.png",
    explainer:
      "Crowned Jordan-flag 'J' with globe and 'Petra' / Arabic titles over 'Jordan News Agency' — Petra's official crest.",
    licence:
      "Jordan News Agency (Petra) brand mark trademark bundled from the agency's official site brand assets (petra.gov.jo/images/logo.png) for educational reference in Learn mode.",
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
    console.log(`install ${row.id} → ${destRel} (${buf.length}b)`);
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
