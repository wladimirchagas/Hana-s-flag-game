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

/** Visually verified batch 39 — Caribbean + Mozambique mastheads, montage-scanned. */
const MANIFEST = [
  {
    id: "vc-stvincent-times",
    src: "tmp/batch40-manual/vc-stvincent-times.webp",
    explainer:
      "Blue/yellow/green 'TS' monogram beside black serif 'St. Vincent TIMES' — St Vincent Times masthead.",
    licence:
      "St Vincent Times masthead trademark bundled from the publisher's official site brand assets (stvincenttimes.com) for educational reference in Learn mode.",
  },
  {
    id: "mz-noticias",
    src: "tmp/batch40-manual/mz-noticias.png",
    explainer:
      "Red rounded block with white 'n' cutout beside red lowercase 'oticias' — Jornal Notícias masthead.",
    licence:
      "Jornal Notícias masthead trademark bundled from the publisher's official site brand assets (noticias.co.mz) for educational reference in Learn mode.",
  },
  {
    id: "mz-o-pais",
    src: "tmp/batch40-manual/mz-o-pais.jpg",
    explainer:
      "Heavy slab-serif 'OPais' with an orange bar on the i and a green-white-red triangle on the s.",
    licence:
      "O País (Mozambique) masthead trademark bundled from the publisher's official site brand assets (opais.co.mz) for educational reference in Learn mode.",
  },
  {
    id: "mz-voz",
    src: "tmp/batch40-manual/mz-verdade.jpg",
    explainer:
      "Red '@Verdade' with an oversized V over a black bar reading 'A verdade em cada palavra'.",
    licence:
      "@Verdade masthead trademark bundled from the publisher's official site brand assets (verdade.co.mz) for educational reference in Learn mode.",
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
