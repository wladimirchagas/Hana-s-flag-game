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

/** Visually verified batch 34 — agency logos, montage-scanned. */
const MANIFEST = [
  {
    id: "cn-xinhua",
    src: "tmp/logo-harvest/cn/xinhua.png",
    explainer:
      "Blue stacked 'NEWS' beside white Chinese '新华网' with an orange swoosh and xinhuanet.com — Xinhua online portal mark.",
    licence:
      "Xinhua News Agency / Xinhuanet emblem trademark bundled from the agency's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "de-dpa",
    src: "tmp/logo-harvest/de/dpa.png",
    explainer:
      "Lowercase charcoal 'dpa' beside three bright green dots — Deutsche Presse-Agentur wordmark.",
    licence:
      "dpa (Deutsche Presse-Agentur) trademark bundled from the agency's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "in-pti",
    src: "tmp/logo-harvest/in/pti.jpg",
    explainer:
      "Red halftone-dot capital 'PTI' on white — Press Trust of India agency mark.",
    licence:
      "Press Trust of India trademark bundled from the agency's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "it-ansa",
    src: "tmp/logo-harvest/it/ansa.png",
    explainer:
      "Bold slab-serif 'ANSA' with smaller 'it' suffix — Agenzia Nazionale Stampa Associata wordmark.",
    licence:
      "ANSA trademark bundled from the agency's official site brand assets (ansa.it) for educational reference in Learn mode.",
  },
  {
    id: "it-agi",
    src: "tmp/logo-harvest/it/agi.png",
    explainer:
      "Bold 'AGI' with a yellow chevron above stacked 'AGENZIA ITALIA' — Agenzia Giornalistica Italia wordmark.",
    licence:
      "AGI trademark bundled from Wikimedia Commons (AGI logo 2020) for educational reference in Learn mode.",
  },
  {
    id: "jp-kyodo",
    src: "tmp/logo-harvest/jp/kyodo.png",
    explainer:
      "White 'KYODO' inside a red crescent disc beside dark 'KYODO NEWS' — Kyodo News agency mark.",
    licence:
      "Kyodo News trademark bundled from the agency's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ro-mediafax",
    src: "tmp/logo-harvest/ro/mediafax.png",
    explainer:
      "Red 'MEDIAFAX' with grey '35' and tagline 'DE ANI DE JURNALISM INDEPENDENT' — Romanian agency anniversary lockup.",
    licence:
      "Mediafax trademark bundled from the agency's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ru-interfax",
    src: "tmp/logo-harvest/ru/interfax.png",
    explainer:
      "Teal Cyrillic 'интерфакс' with a stylised integral-like 'ф' — Interfax agency wordmark.",
    licence:
      "Interfax trademark bundled from the agency's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "tr-dha",
    src: "tmp/logo-harvest/tr/dha.png",
    explainer:
      "Red stylised 'DHA' with an open-base D and crossbar-less A — Demirören News Agency wordmark.",
    licence:
      "DHA (Demirören News Agency) trademark bundled from the agency's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ua-unian",
    src: "tmp/logo-harvest/ua/unian.svg",
    explainer:
      "White geometric Cyrillic 'УНІАН' with a striped microphone capsule over the І — UNIAN agency wordmark.",
    licence:
      "UNIAN trademark bundled from the agency's official site brand assets for educational reference in Learn mode.",
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
