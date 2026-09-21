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
    id: "mu-mauritius-times",
    src: "tmp/batch68-install/mu-mauritius-times.png",
    explainer:
      "White serif 'MAURITIUS' stacked over 'TIMES' on a black rectangle — Mauritius Times masthead.",
    licence:
      "Mauritius Times masthead trademark bundled from the publisher's official site brand assets (mauritiustimes.com MT-Logo.jpg) for educational reference in Learn mode.",
  },
  {
    id: "tl-timor-post",
    src: "tmp/batch68-install/tl-timor-post.png",
    explainer:
      "Navy 'Timor Post' with Timor island map inside the 'o' and Tetum tagline 'Harii Unidade, Justisa no Demokrasia' — Timor Post masthead.",
    licence:
      "Timor Post masthead trademark bundled from the publisher's official site brand assets (timorpost.com) for educational reference in Learn mode.",
  },
  {
    id: "si-necenzurirano",
    src: "tmp/batch68-install/si-necenzurirano.svg",
    explainer:
      "Blue sans-serif 'N1' wordmark — N1 Slovenija (Necenzurirano.si) masthead.",
    licence:
      "N1 masthead trademark bundled from the publisher's official site brand assets (n1info.si/static/images/n1.svg) for educational reference in Learn mode.",
  },
  {
    id: "mt-times-of-malta",
    src: "tmp/batch68-install/mt-times-of-malta.png",
    explainer:
      "Black serif 'THE TIMES' flanking a crowned shield with the George Cross — Times of Malta masthead.",
    licence:
      "Times of Malta masthead (English Wikipedia File:TimesMTheader.png, fair use) trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "bd-samakal",
    src: "tmp/batch68-install/bd-samakal.svg",
    explainer:
      "Black Bengali calligraphic 'সমকাল' (Samakal) wordmark — Daily Samakal masthead.",
    licence:
      "Daily Samakal masthead (English Wikipedia File:Daily Samakal.svg, fair use) trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "ve-ultimas-noticias",
    src: "tmp/batch68-install/ve-ultimas-noticias.png",
    explainer:
      "White italic serif 'Últimas' joined to bold sans 'Noticias' on a blue field — Últimas Noticias masthead.",
    licence:
      "Últimas Noticias masthead (English Wikipedia File:Últimas Noticias logo 2.png, fair use; credited to ultimasnoticias.com.ve) trademark bundled for educational reference in Learn mode.",
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
