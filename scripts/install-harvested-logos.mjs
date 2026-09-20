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

/** Visually verified batch 37 — Pacific/Caribbean papers + AMAP agency, montage-scanned. */
const MANIFEST = [
  {
    id: "vu-daily-post",
    src: "tmp/batch37-manual/vu-daily-post.jpg",
    explainer:
      "Tam-tam drum and boar's tusk with sound waves beside teal 'DAILY' and black 'POST' — Vanuatu Daily Post masthead.",
    licence:
      "Vanuatu Daily Post masthead trademark bundled from the publisher's official site brand assets (dailypost.vu) for educational reference in Learn mode.",
  },
  {
    id: "ws-samoa-observer",
    src: "tmp/batch38-commons/Logo_of_Samoa_Observer.svg",
    explainer:
      "Blue 'SAMOA' and red 'OBSERVER' wordmark in a clean sans-serif — Samoa Observer masthead from Wikimedia Commons.",
    licence:
      "Samoa Observer masthead from Wikimedia Commons File:Logo of Samoa Observer.svg, bundled for educational reference in Learn mode.",
  },
  {
    id: "sb-solomon-times",
    src: "tmp/batch38-manual/sb-solomon-times.png",
    explainer:
      "Blackletter 'Solomon Times Online' wordmark on white — Solomon Islands digital newspaper masthead.",
    licence:
      "Solomon Times Online masthead trademark bundled from the publisher's official site brand assets (solomontimes.com) for educational reference in Learn mode.",
  },
  {
    id: "sr-de-ware-tijd",
    src: "tmp/batch38-commons/Logo_dwt_bl.png",
    explainer:
      "Dark calligraphic 'de Ware Tijd' script wordmark — Surinamese daily masthead from Wikimedia Commons.",
    licence:
      "de Ware Tijd masthead from Wikimedia Commons File:Logo dwt bl.png, bundled for educational reference in Learn mode.",
  },
  {
    id: "tt-newsday",
    src: "tmp/batch38-commons/Newsday_Trinidad_and_Tobago_logo.png",
    explainer:
      "White 'TRINIDAD and TOBAGO' over bold serif 'NEWSDAY' on black — Trinidad and Tobago Newsday masthead.",
    licence:
      "Newsday Trinidad and Tobago masthead from Wikimedia Commons File:Newsday Trinidad and Tobago logo.png, bundled for educational reference in Learn mode.",
  },
  {
    id: "ws-talamua-media",
    src: "tmp/batch38-manual/ws-talamua.jpg",
    explainer:
      "White 'TALAMUA' on charcoal over white 'ONLINE NEWS' on red — Talamua Media digital masthead.",
    licence:
      "Talamua Media masthead trademark bundled from the publisher's official site brand assets (talamua.com) for educational reference in Learn mode.",
  },
  {
    id: "ml-amap",
    src: "tmp/batch38-manual/ml-amap.webp",
    explainer:
      "Yellow/blue AMAP globe on a carved stool beside 'AGENCE MALIENNE DE PRESSE' and the Malian coat of arms.",
    licence:
      "AMAP (Agence Malienne de Presse) logo trademark bundled from the agency's official site brand assets (amap.ml) for educational reference in Learn mode.",
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
