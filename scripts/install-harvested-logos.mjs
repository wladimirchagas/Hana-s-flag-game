#!/usr/bin/env node
/**
 * Install visually-verified newspaper/agency logos into public/ + data files.
 * Only entries listed in MANIFEST are touched. Never invents images.
 *
 * Uses brace-depth matching so nested owner {name,type} objects are never patched.
 */
import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

/** Visually verified batch — montage-scanned light/dark. */
const MANIFEST = [
  {
    id: "ua-lb-ua",
    src: "tmp/batch59-final/ua-lb-ua.png",
    explainer:
      "White serif 'LB' with blue '.ua' over a thin rule and Ukrainian tagline ДОРОСЛИЙ ПОГЛЯД НА СВІТ — LB.ua masthead.",
    licence:
      "LB.ua trademark bundled from the publisher's official site brand assets (lb.ua) for educational reference in Learn mode.",
  },
  {
    id: "ro-evenimentul-zilei",
    src: "tmp/batch59-final/ro-evenimentul-zilei.png",
    explainer:
      "Maroon lowercase 'evz.ro' with a globe in the domain dot and tagline CEL MAI BUN PORTAL DE STIRI — Evenimentul Zilei digital masthead.",
    licence:
      "Evenimentul Zilei / EVZ trademark bundled from the publisher's official site brand assets (evz.ro) for educational reference in Learn mode.",
  },
  {
    id: "si-vecer",
    src: "tmp/batch59-final/si-vecer.svg",
    explainer:
      "Bold black slab-serif 'VEČER' wordmark — Večer (Slovenia) masthead.",
    licence:
      "Večer trademark bundled from the publisher's official site brand assets (vecer.com) for educational reference in Learn mode.",
  },
  {
    id: "uy-el-pais-uy",
    src: "tmp/batch59-final/uy-el-pais-uy.svg",
    explainer:
      "Bold blue slab-serif 'EL PAIS' wordmark — El País (Uruguay) masthead.",
    licence:
      "El País (Uruguay) trademark from Wikimedia Commons File:El Pais Uruguay.svg, bundled for educational reference in Learn mode.",
  },
  {
    id: "ps-al-ayyam",
    src: "tmp/batch59-final/ps-al-ayyam.svg",
    explainer:
      "Geometric Arabic الأيام with a green eight-pointed star above — Al-Ayyam (Palestine) masthead.",
    licence:
      "Al-Ayyam (Palestine) masthead from Wikimedia Commons File:Al-Ayyam, Palestine (2025-07-30).svg (public domain), bundled for educational reference in Learn mode.",
  },
  {
    id: "ru-rossiyskaya-gazeta",
    src: "tmp/batch59-final/ru-rossiyskaya-gazeta.svg",
    explainer:
      "Blue double-headed eagle crest beside serif Cyrillic 'Российская Газета' — Rossiyskaya Gazeta masthead.",
    licence:
      "Rossiyskaya Gazeta trademark from Wikimedia Commons File:Ross g logo.svg, bundled for educational reference in Learn mode.",
  },
  {
    id: "ma-medias24",
    src: "tmp/batch59-final/ma-medias24.png",
    explainer:
      "White '24' numerals breaking a dark-red circle — Médias24 (Morocco) brand mark.",
    licence:
      "Médias24 trademark from Wikimedia Commons File:Medias24-logo.jpg, bundled for educational reference in Learn mode.",
  },
];

function findObjectSpan(src, id) {
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
  return [start, i];
}

function patchEntry(src, id, fields) {
  const [start, end] = findObjectSpan(src, id);
  let block = src.slice(start, end);
  if (!block.includes("noImageReason") && block.includes('"logo"')) {
    console.log(`  skip ${id} (already has logo)`);
    return src;
  }
  block = block.replace(/\s*"noImageReason":\s*"(?:\\.|[^"\\])*",?\n?/g, "\n");
  for (const k of ["logo", "sha256", "logoSourceUrl", "logoExplainer", "licenceNote"]) {
    block = block.replace(new RegExp(`\\n\\s*"${k}"\\s*:\\s*"(?:\\\\.|[^"\\\\])*"\\s*,?`, "g"), "\n");
  }
  const insert = `      "logo": ${JSON.stringify(fields.logo)},\n      "logoExplainer": ${JSON.stringify(fields.explainer)},\n      "licenceNote": ${JSON.stringify(fields.licence)},\n`;
  if (/"sources":/.test(block)) {
    block = block.replace(/(\n\s*)"sources":/, `\n${insert}$1"sources":`);
  } else {
    block = block.replace(/\n(\s*)\}$/, `,\n${insert}$1}`);
  }
  block = block.replace(/,(\s*),/g, ",$1").replace(/,(\s*)\}/g, "$1}");
  return src.slice(0, start) + block + src.slice(end);
}

if (MANIFEST.length === 0) {
  console.log("MANIFEST empty — nothing to install (hotfix mode).");
  process.exit(0);
}

let papers = readFileSync(resolve(ROOT, "src/data/nationalNewspapers.ts"), "utf8");
let agencies = readFileSync(resolve(ROOT, "src/data/nationalNewsAgencies.ts"), "utf8");

for (const entry of MANIFEST) {
  const abs = resolve(ROOT, entry.src);
  if (!existsSync(abs)) throw new Error(`missing src ${entry.src}`);
  const ext = entry.src.split(".").pop().toLowerCase();
  const [cc, ...rest] = entry.id.split("-");
  const slug = rest.join("-");
  const relPath = `newspaper-logos/${cc}/${slug}.${ext}`;
  const dest = resolve(ROOT, "public", relPath);
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(abs, dest);
  console.log(`install ${entry.id} → ${relPath}`);

  const fields = {
    logo: relPath,
    explainer: entry.explainer,
    licence: entry.licence,
  };
  if (papers.includes(`"id": "${entry.id}"`)) {
    papers = patchEntry(papers, entry.id, fields);
  } else if (agencies.includes(`"id": "${entry.id}"`)) {
    agencies = patchEntry(agencies, entry.id, fields);
  } else {
    throw new Error(`id not in papers or agencies: ${entry.id}`);
  }
}

writeFileSync(resolve(ROOT, "src/data/nationalNewspapers.ts"), papers);
writeFileSync(resolve(ROOT, "src/data/nationalNewsAgencies.ts"), agencies);
console.log("done");
