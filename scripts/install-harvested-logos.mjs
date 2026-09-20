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

/** Visually verified batch 27 — montage-scanned. */
const MANIFEST = [
  {
    id: "hr-novi-list",
    src: "tmp/batch27-manual/novi-list.svg",
    explainer:
      "White sans all-caps 'NOVI LIST' on a solid blue bar — Croatian daily Novi list masthead.",
    licence:
      "Novi list Logo.svg from Wikimedia Commons; brand mark trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "ir-tehran-times",
    src: "tmp/batch27-manual/tehran-times.svg",
    explainer:
      "Red serif 'TEHRANTIMES' wordmark with an 'INTERNATIONAL DAILY' strap — Tehran Times masthead.",
    licence:
      "TehranTimes.svg from Wikimedia Commons; brand mark trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "ir-ettelaat",
    src: "tmp/batch27-manual/ettelaat.svg",
    explainer:
      "Orange Persian calligraphy masthead — Ettela'at newspaper wordmark.",
    licence:
      "Ettelaat.svg from Wikimedia Commons; brand mark trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "ir-hamshahri",
    src: "tmp/batch27-manual/ir-hamshahri.png",
    explainer:
      "Dark green geometric Persian calligraphy — Hamshahri newspaper masthead.",
    licence:
      "Hamshahri newspaper logo.gif from Wikimedia Commons (rasterised to PNG); brand mark trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "ch-tages-anzeiger",
    src: "tmp/batch27-manual/tages-anzeiger.svg",
    explainer:
      "Black Fraktur 'Tages Anzeiger' with a blue-and-white shield between the words — Swiss daily Tages-Anzeiger masthead.",
    licence:
      "Logo Tagesanzeiger.svg from German Wikipedia (logo / non-free local file); trademark bundled for educational reference in Learn mode with licenceNote.",
  },
  {
    id: "kw-kuna",
    src: "tmp/batch27-manual/kuna.png",
    explainer:
      "Blue circular emblem beside bilingual 'KUNA' / Arabic title and 'Kuwait News Agency' strap — KUNA wire logo.",
    licence:
      "KUNA-logo.png from English Wikipedia (fair-use / non-free); trademark bundled for educational reference in Learn mode with licenceNote.",
  },
  {
    id: "ir-irna",
    src: "tmp/batch27-manual/irna.svg",
    explainer:
      "Blue barred mark beside bold 'IRNA' with '1934' in the A — Islamic Republic News Agency logo.",
    licence:
      "Islamic Republic News Agency logo.svg from English Wikipedia (fair-use / non-free); trademark bundled for educational reference in Learn mode with licenceNote.",
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
