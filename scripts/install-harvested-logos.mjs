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
    id: "sz-swazi-bridge",
    src: "tmp/batch65-final/sz-swazi-bridge.jpg",
    explainer:
      "Bold black 'THE BRIDGE' with ladder-cut B, blue-yellow-red vertical bar, and red tagline 'Impartial | Credible | Fearless' — Swazi Bridge masthead.",
    licence:
      "Swazi Bridge / The Bridge trademark bundled from the publisher's official site brand assets (swazibridge.com) for educational reference in Learn mode.",
  },
  {
    id: "tg-ici-lome",
    src: "tmp/batch65-final/tg-ici-lome.png",
    explainer:
      "Cartoon child mascot beside blue 'iciLome.com' and cursive tagline 'Le portail togolais par excellence!' — Ici Lomé masthead.",
    licence:
      "Ici Lomé trademark bundled from the publisher's official site brand assets (icilome.com) for educational reference in Learn mode.",
  },
  {
    id: "tg-togo-matin",
    src: "tmp/batch65-final/tg-togo-matin.png",
    explainer:
      "Sky-blue lowercase 'tm' ligature beside uppercase 'TOGOMATIN' wordmark — Togo Matin masthead.",
    licence:
      "Togo Matin trademark bundled from the publisher's official site brand assets (togomatin.tg) for educational reference in Learn mode.",
  },
  {
    id: "tj-jumhuriyat",
    src: "tmp/batch65-final/tj-jumhuriyat.png",
    explainer:
      "Blue Cyrillic 'ҶУМҲУРИЯТ' between Tajik flag and state emblem, with official-publication subtitle — Jumhuriyat masthead.",
    licence:
      "Jumhuriyat trademark bundled from the publisher's official site brand assets (jumhuriyat.tj) for educational reference in Learn mode.",
  },
  {
    id: "tl-jornal-independente",
    src: "tmp/batch65-final/tl-jornal-independente.jpg",
    explainer:
      "Black serif 'INDEPENDENTE' with eye icon and Tetum tagline 'Imi Nia Lian. Imi Nia Liberdade' — Jornal Independente masthead.",
    licence:
      "Jornal Independente trademark bundled from the publisher's official site brand assets (independente.tl) for educational reference in Learn mode.",
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
