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
    id: "sm-informazione",
    src: "tmp/batch61-final/sm-informazione.png",
    explainer:
      "Red arched-bridge mark with a blue disc above lowercase black 'libertas' and tagline INFORMAZIONE PER PASSIONE — Libertas / L'Informazione di San Marino masthead.",
    licence:
      "Libertas trademark bundled from the publisher's official site brand assets (libertas.sm) for educational reference in Learn mode.",
  },
  {
    id: "tg-togo-presse",
    src: "tmp/batch61-final/tg-togo-presse.jpg",
    explainer:
      "White blackletter 'Togo-Presse' on a red field with cyan border and tagline GRAND QUOTIDIEN NATIONAL D'INFORMATION — Togo-Presse masthead.",
    licence:
      "Togo-Presse trademark bundled from the publisher's official site brand assets (togopresse.tg) for educational reference in Learn mode.",
  },
  {
    id: "ye-al-thawra",
    src: "tmp/batch61-final/ye-al-thawra.png",
    explainer:
      "Arabic الثورة with a red torch/rose and English ALTHAWRAH — Al-Thawra (Yemen) masthead.",
    licence:
      "Al-Thawra trademark bundled from the publisher's official site brand assets (althawrah.ye) for educational reference in Learn mode.",
  },
  {
    id: "tm-turkmenportal",
    src: "tmp/batch61-final/tm-turkmenportal.svg",
    explainer:
      "Red circle with white TP monogram beside uppercase TURKMENPORTAL — Turkmenportal masthead.",
    licence:
      "Turkmenportal trademark bundled from the publisher's official site brand assets (turkmenportal.com) for educational reference in Learn mode.",
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
