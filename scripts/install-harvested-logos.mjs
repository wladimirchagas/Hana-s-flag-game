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

/** Visually verified batch — montage-scanned light/dark.
 * Set `dataset: "agency"` to patch nationalNewsAgencies.ts instead of newspapers.
 */
const MANIFEST = [
  {
    id: "bi-bonesha",
    src: "tmp/batch102-install/bi-bonesha.jpg",
    explainer:
      "Circular RSF Bonesha FM emblem — orange arc, handshake before a microphone over red-yellow-green stripes, radio tower with frequency ring (96.8 / 102.4 / 87.7 MHz) — the Bonesha FM News digital brand mark.",
    licence:
      "Bonesha FM logo from the station's official site (bonesha.bi/images/logo.jpg), archived via the Wayback Machine (2013 capture); trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "ss-juba-monitor",
    src: "tmp/batch102-install/ss-juba-monitor.png",
    explainer:
      "White masthead banner with red 'JUBA' and blue 'MONITOR' outlined capitals, magenta 'QUALITY INFORMATION' strap between globe-Q marks, and red publisher line — The Juba Monitor brand mark.",
    licence:
      "The Juba Monitor masthead from the newspaper's official site (jubamonitor.com/wp-content/uploads/2016/07/front.png), archived via the Wayback Machine; trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "gt-el-periodico",
    src: "tmp/batch102-install/gt-el-periodico.png",
    explainer:
      "Black sans 'elPeriódico' wordmark with a short red bar over the first 'o' — elPeriódico (Guatemala) digital masthead.",
    licence:
      "elPeriódico masthead from the newspaper's own theme asset (elperiodico.com.gt/wp-content/themes/elperiodico/images/logoep.png), archived via the Wayback Machine; trademark bundled for educational reference in Learn mode.",
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
let papersTouched = false;
let agenciesTouched = false;

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
  const fields = {
    logo: rel,
    explainer: entry.explainer,
    licence: entry.licence,
  };
  if (entry.dataset === "agency") {
    agencies = patchEntry(agencies, entry.id, fields);
    agenciesTouched = true;
  } else {
    papers = patchEntry(papers, entry.id, fields);
    papersTouched = true;
  }
  console.log(`patched ${entry.id}${entry.dataset === "agency" ? " (agency)" : ""}`);
}

if (papersTouched) writeFileSync(resolve(ROOT, "src/data/nationalNewspapers.ts"), papers);
if (agenciesTouched) writeFileSync(resolve(ROOT, "src/data/nationalNewsAgencies.ts"), agencies);
console.log("done", MANIFEST.length);
