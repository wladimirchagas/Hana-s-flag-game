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

/** Visually verified batch 24 — montage-scanned. */
const MANIFEST = [
  {
    id: "bg-24-chasa",
    src: "tmp/batch24-manual/bg/24-chasa.svg",
    explainer:
      "Black '24 часа' wordmark with italic Cyrillic 'часа' and a thick underline — Bulgarian daily 24 Chasa masthead.",
    licence:
      "Logo 24 Tschasa.svg from Wikimedia Commons; brand mark trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "cz-blesk",
    src: "tmp/batch24-manual/cz/blesk.svg",
    explainer:
      "White italic all-caps 'BLESK' on a solid red rectangle — Czech tabloid Blesk masthead.",
    licence:
      "Blesk Logo.svg from Wikimedia Commons; brand mark trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "cz-pravo",
    src: "tmp/batch24-manual/cz/pravo-1995.svg",
    explainer:
      "Tall condensed orange-red 'PRÁVO' wordmark — Czech daily Právo masthead (Commons vector of the design in use since the mid-1990s).",
    licence:
      "Pravo-logo ca. 1995.svg from Wikimedia Commons; brand mark trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "ee-eesti-paevaleht",
    src: "tmp/batch24-manual/ee/eesti-paevaleht.svg",
    explainer:
      "Three red dots beside black 'Eesti' and red 'Päevaleht' — Estonian daily Eesti Päevaleht masthead.",
    licence:
      "Eesti Päevaleht logo.svg from Wikimedia Commons; brand mark trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "ci-fraternite-matin",
    src: "tmp/batch24-manual/ci/fraternite-matin.png",
    explainer:
      "Green 'Fratmat' + orange '.info' wordmark with orange swooshes and the strap 'l'Actualité en continu…' — Fraternité Matin's digital masthead from fratmat.info.",
    licence:
      "Fraternité Matin masthead from the publisher's official site brand assets (fratmat.info); trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "cu-trabajadores",
    src: "tmp/batch24-manual/cu/trabajadores.png",
    explainer:
      "Black serif all-caps 'TRABAJADORES' wordmark — Cuban workers' daily newspaper masthead.",
    licence:
      "Logotipo del periódico Trabajadores.png from Wikimedia Commons; brand mark trademark bundled for educational reference in Learn mode.",
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
    const cleanExt = row.src.endsWith(".svg") ? ".svg" : row.src.endsWith(".webp") ? ".webp" : ".png";
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
