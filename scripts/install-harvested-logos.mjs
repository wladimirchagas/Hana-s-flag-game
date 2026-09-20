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

/** Visually verified batch 30 — montage-scanned. */
const MANIFEST = [
  {
    id: "tn-tap",
    src: "tmp/batch30-manual/tap.jpg",
    explainer:
      "White Arabic 'وكالة تونس إفريقيا للأنباء' and French 'AGENCE TUNIS AFRIQUE PRESSE' on a blue field with a TAP monogram and globe — Tunisia's national wire.",
    licence:
      "Tap logo2.jpg from Arabic Wikipedia; brand mark trademark bundled for educational reference in Learn mode with licenceNote.",
  },
  {
    id: "sd-suna",
    src: "tmp/batch30-manual/suna.png",
    explainer:
      "Sky-blue 'SUNA' with a red triangle on a blue arc above grey English and Arabic agency names on black — Sudan's national wire.",
    licence:
      "SUNA Logo.png from Arabic Wikipedia; brand mark trademark bundled for educational reference in Learn mode with licenceNote.",
  },
  {
    id: "bj-le-matinal",
    src: "tmp/batch30-manual/le-matinal.png",
    explainer:
      "Red 'LE MATINAL' on black with vertical 'QUOTIDIEN BÉNINOIS' and slogan 'Le défi d'une génération' — Beninese daily masthead.",
    licence:
      "Le Matinal masthead trademark bundled from the publisher's official site brand assets (lematinal.bj) for educational reference in Learn mode.",
  },
  {
    id: "bj-banouto",
    src: "tmp/batch30-manual/banouto.png",
    explainer:
      "Brush-stroke red 'BANOUTO' wordmark on a black bar — Beninese digital news masthead.",
    licence:
      "Banouto masthead trademark bundled from the publisher's official site brand assets (banouto.bj/logo-bnt.png) for educational reference in Learn mode.",
  },
  {
    id: "et-the-reporter",
    src: "tmp/batch30-manual/the-reporter.jpg",
    explainer:
      "Red 'THE Reporter' serif masthead with a fountain-pen emblem and tagline 'FREE PRESS. FREE SPEECH. FREE SPIRIT.' — Ethiopian English daily.",
    licence:
      "The Reporter Ethiopia masthead trademark bundled from the publisher's official site brand assets (thereporterethiopia.com) for educational reference in Learn mode.",
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
    return src; // caller treats unchanged src as skip when both files unchanged
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
    if (papers === beforeP && agencies === beforeA) {
      // Already had a logo (skip path) — file was still copied above.
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
