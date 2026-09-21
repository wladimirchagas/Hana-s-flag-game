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
    id: "bb-loop-barbados",
    src: "tmp/batch73-install/bb-loop-barbados.jpg",
    explainer:
      "Teal brush-stroke ring with a red splash — Loop News Barbados brand mark.",
    licence:
      "Loop News Barbados brand mark from the outlet's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "cg-le-patriote",
    src: "tmp/batch73-install/cg-le-patriote.jpg",
    explainer:
      "Orange house outline beside white 'Le Patriote' and yellow 'CONGOLAIS' on navy — Le Patriote brand mark.",
    licence:
      "Le Patriote brand mark from the newspaper's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "ec-gk",
    src: "tmp/batch73-install/ec-gk.jpg",
    explainer:
      "White bold 'GK' on blue — GK (Ecuador) brand initials.",
    licence:
      "GK brand mark from the outlet's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "mc-observateur-monaco",
    src: "tmp/batch73-install/mc-observateur-monaco.jpg",
    explainer:
      "Red 'L'OBSERVATEUR DE' over black 'MONACO' — L'Observateur de Monaco masthead.",
    licence:
      "L'Observateur de Monaco masthead from the newspaper's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "mt-l-orizzont",
    src: "tmp/batch73-install/mt-l-orizzont.jpg",
    explainer:
      "Red lowercase 'l-orizzont' wordmark — L-Orizzont masthead.",
    licence:
      "L-Orizzont brand mark from the newspaper's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "td-n-djamena-hebdo",
    src: "tmp/batch73-install/td-n-djamena-hebdo.jpg",
    explainer:
      "Blue 'N'DJAMÉNA HEBDO' over a '30 ANS' anniversary crest with quill — N'Djaména Hebdo masthead.",
    licence:
      "N'Djaména Hebdo brand mark from the newspaper's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "tt-loop-tt",
    src: "tmp/batch73-install/tt-loop-tt.png",
    explainer:
      "Lowercase 'loop' wordmark fading purple-to-magenta — Loop News Trinidad and Tobago brand mark.",
    licence:
      "Loop News Trinidad and Tobago brand mark from the outlet's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
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
