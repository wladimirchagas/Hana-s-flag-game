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
    id: "ao-o-pais",
    src: "tmp/batch71-install/ao-o-pais.png",
    explainer:
      "Black spaced serif 'O PAÍS' — O País (Angola) masthead wordmark.",
    licence:
      "O País brand mark from the newspaper's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "bb-barbados-advocate",
    src: "tmp/batch71-install/bb-barbados-advocate.jpg",
    explainer:
      "White capital 'A' on a blue circle — The Barbados Advocate brand mark.",
    licence:
      "The Barbados Advocate brand mark from the newspaper's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "eg-al-wafd",
    src: "tmp/batch71-install/eg-al-wafd.jpg",
    explainer:
      "Green Arabic calligraphy with crescent-plus emblem and green strap — Al-Wafd masthead.",
    licence:
      "Al-Wafd brand mark from the newspaper's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "ht-le-matin",
    src: "tmp/batch71-install/ht-le-matin.png",
    explainer:
      "Blue serif 'Le Matin' with red dotted i and script 'Haiti' in a red frame — Le Matin masthead.",
    licence:
      "Le Matin (Haiti) brand mark from the newspaper's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "iq-al-zaman",
    src: "tmp/batch71-install/iq-al-zaman.jpg",
    explainer:
      "Orange-gradient Arabic title with quill icon over 'AZZAMAN.COM' — Azzaman masthead.",
    licence:
      "Azzaman brand mark from the newspaper's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "jm-loop-jamaica",
    src: "tmp/batch71-install/jm-loop-jamaica.png",
    explainer:
      "Lowercase 'loop' wordmark fading blue-to-burgundy — Loop News Jamaica brand mark.",
    licence:
      "Loop News Jamaica brand mark from the outlet's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "lc-loop",
    src: "tmp/batch71-install/lc-loop.png",
    explainer:
      "Lowercase 'loop' wordmark fading blue-to-burgundy — Loop St Lucia brand mark.",
    licence:
      "Loop St Lucia brand mark from the outlet's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "to-loop-tonga",
    src: "tmp/batch71-install/to-loop-tonga.jpg",
    explainer:
      "Red rounded tile with stylised 'Loop' wordmark — Loop Tonga brand mark.",
    licence:
      "Loop Tonga brand mark from the outlet's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "zm-times-of-zambia",
    src: "tmp/batch71-install/zm-times-of-zambia.png",
    explainer:
      "Red serif 'TIMES OF ZAMBIA' over italic strap 'Your paper for all times' — Times of Zambia masthead.",
    licence:
      "Times of Zambia brand mark from the newspaper's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "zw-newsday",
    src: "tmp/batch71-install/zw-newsday.jpg",
    explainer:
      "Maroon 'NEWSDAY' on yellow with 'OFFICIAL ACCOUNT' bar — NewsDay Zimbabwe brand mark.",
    licence:
      "NewsDay brand mark from the newspaper's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
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
