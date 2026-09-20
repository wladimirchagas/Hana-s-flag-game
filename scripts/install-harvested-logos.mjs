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
    id: "mg-midi-madagasikara",
    src: "tmp/batch54-final/mg-midi-madagasikara.jpg",
    explainer:
      "Bold lowercase 'midi' in brick-red and 'madagasikara' in black with tagline 'Premier Quotidien National d’Information de Madagascar' — Midi Madagasikara masthead.",
    licence:
      "Midi Madagasikara trademark bundled from the publisher's official site brand assets (midi-madagasikara.mg) for educational reference in Learn mode.",
  },
  {
    id: "mc-monaco-hebdo",
    src: "tmp/batch54-final/mc-monaco-hebdo.svg",
    explainer:
      "Black slab-serif 'MONACO' with smaller outlined red 'HEBDO' nested at the lower right — Monaco Hebdo masthead.",
    licence:
      "Monaco Hebdo trademark bundled from the publisher's official site brand assets (monaco-hebdo.com) for educational reference in Learn mode.",
  },
  {
    id: "mn-ikon-mn",
    src: "tmp/batch54-final/mn-ikon-mn.png",
    explainer:
      "Four-colour square frame mark beside bold dark 'ikon™' wordmark — Ikon.mn masthead.",
    licence:
      "Ikon.mn trademark bundled from the publisher's official site brand assets (ikon.mn) for educational reference in Learn mode.",
  },
  {
    id: "bi-net-press",
    src: "tmp/batch54-final/bi-net-press.png",
    explainer:
      "Black brush-script 'rugamba.Net Press' wordmark — Net Press (Agence Burundaise d'Information) masthead.",
    licence:
      "Net Press trademark bundled from the agency's official site brand assets (netpress.bi / netpress.online) for educational reference in Learn mode.",
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
    throw new Error(`id not in data: ${entry.id}`);
  }
}

writeFileSync(resolve(ROOT, "src/data/nationalNewspapers.ts"), papers);
writeFileSync(resolve(ROOT, "src/data/nationalNewsAgencies.ts"), agencies);
console.log(`Installed ${MANIFEST.length} logos.`);
