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

/** Visually verified batch 49 — montage-scanned light/dark. */
const MANIFEST = [
  {
    id: "lt-15min",
    src: "tmp/batch49-install/lt-15min.svg",
    explainer:
      "Green rounded square with white '15', black 'min', and a green clock-face mark — 15min Lithuania masthead.",
    licence:
      "15min trademark from Wikimedia Commons File:15 min.svg (PD-textlogo) for educational reference in Learn mode.",
  },
  {
    id: "md-ziarul-de-garda",
    src: "tmp/batch49-install/md-ziarul-de-garda.svg",
    explainer:
      "Black serif 'zdg' under italic 'spune adevărul' with 'ZIARUL de GARDĂ' below — Ziarul de Gardă masthead.",
    licence:
      "Ziarul de Gardă trademark bundled from the publisher's official site brand assets (zdg.md) for educational reference in Learn mode.",
  },
  {
    id: "pa-la-prensa",
    src: "tmp/batch49-install/pa-la-prensa.svg",
    explainer:
      "Bold black 'La Prensa' with a solid red underline — La Prensa Panamá masthead.",
    licence:
      "La Prensa trademark bundled from the publisher's official Corprensa brand assets (prensa.com / multimedia.corprensa.com) for educational reference in Learn mode.",
  },
  {
    id: "gm-standard",
    src: "tmp/batch49-install/gm-standard.svg",
    explainer:
      "Blackletter gothic 'The Standard' wordmark — The Standard Newspaper (Gambia) masthead.",
    licence:
      "The Standard trademark bundled from the publisher's official site brand assets (standard.gm/wp-content/uploads/2020/04/StandardLogo.svg); white fill recolored to near-black for legibility on light Learn-mode cards — letterforms unchanged.",
  },
  {
    id: "er-assenna",
    src: "tmp/batch49-install/er-assenna.png",
    explainer:
      "Grey TV icon with orange bunny-ear antennas and bold orange 'ATV' beside 'Asena Eritrean Satellite Television' — Assenna / Asena TV mark.",
    licence:
      "Assenna / Asena TV trademark bundled from the publisher's official site brand assets (asenatv.com) for educational reference in Learn mode.",
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
  if (block.includes("noImageReason")) {
    block = block.replace(/\s*"noImageReason":\s*"(?:\\.|[^"\\])*",?\n?/, "\n");
  }
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
    if (papers === beforeP && agencies === beforeA) {
      console.log(`  ${row.id}: data unchanged (already had logo)`);
      continue;
    }
    installed++;
  }
  writeFileSync(resolve(ROOT, "src/data/nationalNewspapers.ts"), papers);
  writeFileSync(resolve(ROOT, "src/data/nationalNewsAgencies.ts"), agencies);
  console.log(`Installed ${installed} logos.`);
}

main();
