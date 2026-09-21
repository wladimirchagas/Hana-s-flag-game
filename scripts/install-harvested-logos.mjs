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
    id: "bz-bbn",
    src: "tmp/batch72-install/bz-bbn.png",
    explainer:
      "Grey 'BBN' with teal 'BREAKING BELIZE NEWS' strap — Breaking Belize News brand mark.",
    licence:
      "Breaking Belize News brand mark from the outlet's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "bz-love-fm-news",
    src: "tmp/batch72-install/bz-love-fm-news.jpg",
    explainer:
      "Red cursive 'Love' with blue 'FM' in the e-loop — Love FM / Love News Belize brand mark.",
    licence:
      "Love FM brand mark from the outlet's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "bz-reporter",
    src: "tmp/batch72-install/bz-reporter.png",
    explainer:
      "Black torch with orange flame on a radial orange ground — The Reporter (Belize) emblem.",
    licence:
      "The Reporter brand mark from the newspaper's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "dm-dominica-vibes",
    src: "tmp/batch72-install/dm-dominica-vibes.jpg",
    explainer:
      "Green gradient 'DA VIBES' with sun arc and dominicavibes.com banner — Dominica Vibes brand mark.",
    licence:
      "Dominica Vibes brand mark from the outlet's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "fj-fijilive",
    src: "tmp/batch72-install/fj-fijilive.jpg",
    explainer:
      "White lowercase 'fijilive' on a bright blue field — FijiLive brand mark.",
    licence:
      "FijiLive brand mark from the outlet's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "kn-the-labour-spokesman",
    src: "tmp/batch72-install/kn-the-labour-spokesman.jpg",
    explainer:
      "White serif 'The Labour Spokesman' in a circle with 'EST. 1957' on maroon — Labour Spokesman masthead.",
    licence:
      "The Labour Spokesman brand mark from the newspaper's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "ml-aBamako",
    src: "tmp/batch72-install/ml-aBamako.jpg",
    explainer:
      "Yellow speech-bubble 'a' beside green 'Bamako.com' — aBamako.com brand mark.",
    licence:
      "aBamako.com brand mark from the outlet's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "ps-al-hadath",
    src: "tmp/batch72-install/ps-al-hadath.png",
    explainer:
      "Red-and-black Arabic wordmark with red accent mark — Al-Hadath masthead.",
    licence:
      "Al-Hadath brand mark from the outlet's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "ro-romania-libera",
    src: "tmp/batch72-install/ro-romania-libera.png",
    explainer:
      "Purple 'RL' initials over magenta script 'România liberă' — România Liberă brand mark.",
    licence:
      "România Liberă brand mark from the newspaper's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "sb-solomon-star",
    src: "tmp/batch72-install/sb-solomon-star.jpg",
    explainer:
      "Red five-point star between arched 'Solomon' and 'Star' — Solomon Star masthead.",
    licence:
      "Solomon Star brand mark from the newspaper's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "sb-sunday-isles",
    src: "tmp/batch72-install/sb-sunday-isles.jpg",
    explainer:
      "Camera line-art above red/black 'Sunday Isles' on yellow — Sunday Isles brand mark.",
    licence:
      "Sunday Isles brand mark from the newspaper's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "sc-the-people",
    src: "tmp/batch72-install/sc-the-people.jpg",
    explainer:
      "Red 3D block 'THE PEOPLE' with white outline — The People (Seychelles) masthead.",
    licence:
      "The People brand mark from the newspaper's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "sl-concord-times",
    src: "tmp/batch72-install/sl-concord-times.jpg",
    explainer:
      "Blue globe tile above 'CONCORD TIMES' and strap 'Excellence & Objectivity' — Concord Times masthead.",
    licence:
      "Concord Times brand mark from the newspaper's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "td-tchadinfos",
    src: "tmp/batch72-install/td-tchadinfos.jpg",
    explainer:
      "White lowercase 'Tchadinfos' letter-grid on dark blue — Tchadinfos brand mark.",
    licence:
      "Tchadinfos brand mark from the outlet's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "to-taimi-o-tonga",
    src: "tmp/batch72-install/to-taimi-o-tonga.jpg",
    explainer:
      "White serif 'Taimi' over 'TÓNGA' on a red masthead bar — Taimi 'o Tonga masthead.",
    licence:
      "Taimi 'o Tonga masthead from the newspaper's official Facebook page profile picture; trademark bundled for educational reference in Learn mode.",
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
