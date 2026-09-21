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
    id: "ye-al-masdar",
    src: "tmp/batch70-install/ye-al-masdar.svg",
    explainer:
      "Red Arabic 'المصدر' over grey 'ALMASDAR Online' — Al-Masdar Online masthead.",
    licence:
      "Al-Masdar Online masthead (Wikimedia Commons File:Al-Masdar Online.svg) trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "ke-taifa-leo",
    src: "tmp/batch70-install/ke-taifa-leo.jpg",
    explainer:
      "White serif 'TAIFA LEO' on red with Swahili strap 'Lugha yetu, gazeti letu' — Taifa Leo brand mark.",
    licence:
      "Taifa Leo brand mark from the newspaper's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "mm-the-irrawaddy",
    src: "tmp/batch70-install/mm-the-irrawaddy.jpg",
    explainer:
      "Red circle with yellow motifs and blue pen nib above red serif 'The Irrawaddy' — Irrawaddy magazine emblem.",
    licence:
      "The Irrawaddy brand mark from the magazine's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "mt-maltatoday",
    src: "tmp/batch70-install/mt-maltatoday.jpg",
    explainer:
      "White lowercase slab-serif 'mt' on red square — MaltaToday brand mark.",
    licence:
      "MaltaToday brand mark from the newspaper's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "mt-the-malta-independent",
    src: "tmp/batch70-install/mt-the-malta-independent.jpg",
    explainer:
      "Orange serif 'I' in a white circle on blue — The Malta Independent brand mark.",
    licence:
      "The Malta Independent brand mark from the newspaper's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "ni-el-19-digital",
    src: "tmp/batch70-install/ni-el-19-digital.jpg",
    explainer:
      "Blue script 'el' beside magenta '19' with strap 'POR MÁS VICTORIAS!' — El 19 Digital brand mark.",
    licence:
      "El 19 Digital brand mark from the outlet's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "sm-san-marino-fixing",
    src: "tmp/batch70-install/sm-san-marino-fixing.jpg",
    explainer:
      "Blue 'SAN MARINO FIXING' on yellow-striped field with chart-arrow graphic — San Marino Fixing masthead.",
    licence:
      "San Marino Fixing masthead from the newspaper's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "va-asianews",
    src: "tmp/batch70-install/va-asianews.jpg",
    explainer:
      "Orange 'AsiaNews.it' wordmark with PIME figure icon on blue — AsiaNews brand mark.",
    licence:
      "AsiaNews brand mark from the outlet's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "ws-samoa-global-news",
    src: "tmp/batch70-install/ws-samoa-global-news.png",
    explainer:
      "Circular globe with Samoa island silhouettes and 'SAMOA GLOBAL NEWS' — Samoa Global News emblem.",
    licence:
      "Samoa Global News emblem from the outlet's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "mk-sloboden-pecat",
    src: "tmp/batch70-install/mk-sloboden-pecat.jpg",
    explainer:
      "White Cyrillic 'СП.' on black — Sloboden Pečat brand initials.",
    licence:
      "Sloboden Pečat brand mark from the newspaper's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
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

for (const entry of MANIFEST) {
  const srcPath = resolve(ROOT, entry.src);
  if (!existsSync(srcPath)) throw new Error(`missing src: ${entry.src}`);
  const cc = entry.id.split("-")[0];
  const base = entry.id.replace(new RegExp(`^${cc}-`), "");
  const ext = entry.src.split(".").pop();
  const rel = `newspaper-logos/${cc}/${base}.${ext}`;
  const destDir = resolve(ROOT, "public", "newspaper-logos", cc);
  mkdirSync(destDir, { recursive: true });
  const dest = resolve(ROOT, "public", rel);
  copyFileSync(srcPath, dest);
  console.log(`copied ${rel}`);
  papers = patchEntry(papers, entry.id, {
    logo: rel,
    explainer: entry.explainer,
    licence: entry.licence,
  });
  console.log(`patched ${entry.id}`);
}

writeFileSync(resolve(ROOT, "src/data/nationalNewspapers.ts"), papers);
console.log("done", MANIFEST.length);
