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
    id: "td-journal-le-pays",
    src: "tmp/batch67-install/td-journal-le-pays.png",
    explainer:
      "White italic 'LE PAYS' on blue with yellow Chad map and slogan bar 'Raconter le Tchad au Monde…' — Le Pays masthead.",
    licence:
      "Le Pays (Chad) masthead trademark bundled from the publisher's official site brand assets (lepaystchad.com) for educational reference in Learn mode.",
  },
  {
    id: "mn-news-mn",
    src: "tmp/batch67-install/mn-news-mn.png",
    explainer:
      "Red circle with black serif 'N' beside red 'news' and navy '.mn' — News.mn masthead.",
    licence:
      "News.mn masthead trademark bundled from the publisher's official site brand assets (news.mn) for educational reference in Learn mode.",
  },
  {
    id: "rw-imvaho-nshya",
    src: "tmp/batch67-install/rw-imvaho-nshya.svg",
    explainer:
      "Green sans-serif 'Imvaho Nshya' with Kinyarwanda tagline 'Soma Usobanukirwe Buri Munsi' — Imvaho Nshya masthead.",
    licence:
      "Imvaho Nshya masthead trademark bundled from the publisher's official site brand assets (imvahonshya.co.rw) for educational reference in Learn mode.",
  },
  {
    id: "vu-vbct",
    src: "tmp/batch67-install/vu-vbct.webp",
    explainer:
      "Gold 'VBTC' with equaliser bars and Bislama tagline 'blong yumi evriwan' — VBTC News masthead.",
    licence:
      "VBTC masthead trademark bundled from the publisher's official site brand assets (vbtc.vu) for educational reference in Learn mode.",
  },
  {
    id: "va-ncregister",
    src: "tmp/batch67-install/va-ncregister.svg",
    explainer:
      "Serif 'NATIONAL CATHOLIC' over large 'REGISTER' with papal tiara and crossed-keys crest — National Catholic Register masthead.",
    licence:
      "National Catholic Register masthead trademark bundled from the publisher's official site brand assets (ncregister.com) for educational reference in Learn mode.",
  },
  {
    id: "cn-nanfang-ribao",
    src: "tmp/batch67-install/cn-nanfang-ribao.png",
    explainer:
      "Red calligraphic '南方日报' (Nanfang Daily) wordmark — Nanfang Daily masthead.",
    licence:
      "Nanfang Daily masthead trademark bundled from the publisher's official epaper brand assets (epaper.southcn.com) for educational reference in Learn mode.",
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
