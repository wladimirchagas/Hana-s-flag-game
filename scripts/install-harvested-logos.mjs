#!/usr/bin/env node
/**
 * Install visually-verified newspaper/agency logos into public/ + data files.
 * Only entries listed in MANIFEST are touched. Never invents images.
 */
import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

/** Visually verified batch 29 — montage-scanned. */
const MANIFEST = [
  {
    id: "bo-el-diario",
    src: "tmp/batch29-manual/el-diario.jpg",
    explainer:
      "Blue 'EL DIARIO' masthead with the Bolivian tricolour between the words and the tagline 'Decano de la Prensa Nacional' — La Paz daily.",
    licence:
      "El Diario logo.jpg from Wikimedia Commons (PD-textlogo; Newspaper logos of Bolivia); brand mark trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "do-hoy",
    src: "tmp/batch29-manual/hoy.png",
    explainer:
      "White slab-serif 'Hoy' wordmark on a cyan field — Dominican Republic daily masthead.",
    licence:
      "Hoy masthead trademark bundled from the publisher's official site brand assets (imagenes.hoy.com.do/static/img/hoy.png) for educational reference in Learn mode.",
  },
  {
    id: "bg-mediapool",
    src: "tmp/batch29-manual/mediapool-simple.svg",
    explainer:
      "White 'MEDIAPOOL' wordmark with grey '.BG' suffix and a small square mark on a black bar — Bulgarian digital news outlet.",
    licence:
      "Mediapool masthead trademark bundled from the publisher's official site brand assets (mediapool.bg/assets/images/logo-simple.svg) for educational reference in Learn mode.",
  },
  {
    id: "ge-interpressnews",
    src: "tmp/batch29-manual/interpressnews.svg",
    explainer:
      "Blue italic 'ipn' monogram with a red square tittle over Georgian 'ინტერპრესნიუსი' — Georgian news agency crest.",
    licence:
      "Interpressnews brand mark trademark bundled from the agency's official site brand assets (interpressnews.ge/static/img/logo.svg) for educational reference in Learn mode.",
  },
  {
    id: "bh-bna",
    src: "tmp/batch29-manual/bna-logo.png",
    explainer:
      "White dotted shield emblem above Arabic 'وكالة أنباء البحرين' and English 'Bahrain News Agency' on red — Bahrain's national wire.",
    licence:
      "BNA logo (Bna logo.gif) from Arabic Wikipedia; brand mark trademark bundled for educational reference in Learn mode with licenceNote.",
  },
  {
    id: "om-ona",
    src: "tmp/batch29-manual/ona.png",
    explainer:
      "Grey Arabic calligraphy with coral diacritics above coral 'Oman News Agency' — Oman's national wire wordmark.",
    licence:
      "Oman News Agency logo (شعار وكالة الأنباء العمانية.png) from Arabic Wikipedia; brand mark trademark bundled for educational reference in Learn mode with licenceNote.",
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
    const cc = row.id.slice(0, 2);
    const slug = row.id.slice(3);
    const cleanExt = row.src.endsWith(".svg")
      ? ".svg"
      : row.src.endsWith(".webp")
        ? ".webp"
        : row.src.endsWith(".jpg") || row.src.endsWith(".jpeg")
          ? ".jpg"
          : ".png";
    const destRel = `newspaper-logos/${cc}/${slug}${cleanExt}`;
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
    if (papers === beforeP && agencies === beforeA) throw new Error(`${row.id}: not found in data`);
    installed++;
  }
  writeFileSync(resolve(ROOT, "src/data/nationalNewspapers.ts"), papers);
  writeFileSync(resolve(ROOT, "src/data/nationalNewsAgencies.ts"), agencies);
  console.log(`Installed ${installed} logos.`);
}

main();
