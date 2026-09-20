#!/usr/bin/env node
/**
 * Install visually-verified newspaper/agency logos into public/ + data files.
 * Only entries listed in MANIFEST are touched. Never invents images.
 */
import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

/** Visually verified batch 18 — Commons / en.wikipedia fair-use / official sites. */
const MANIFEST = [
  {
    id: "be-het-nieuwsblad",
    src: "tmp/logo-harvest/manual/be/het-nieuwsblad-b18.png",
    explainer:
      "White 'Het Nieuwsblad' serif wordmark on a solid blue bar — the Belgian daily's masthead.",
    licence:
      "Het Nieuwsblad Logo.png from Wikimedia Commons; brand mark trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "gb-the-scotsman",
    src: "tmp/logo-harvest/manual/gb/the-scotsman-b18-plate.png",
    explainer:
      "Black thistle crest above 'THE SCOTSMAN' caps on a white plate — The Scotsman masthead.",
    licence:
      "The Scotsman logo.svg from English Wikipedia (fair-use brand mark) bundled for educational reference in Learn mode.",
  },
  {
    id: "ie-irish-independent",
    src: "tmp/logo-harvest/manual/ie/irish-independent-b18.svg",
    explainer:
      "Dark green 'Irish Independent' serif wordmark with a harp mark — Irish Independent masthead.",
    licence:
      "Irish Independent Logo.svg from English Wikipedia (fair-use brand mark) bundled for educational reference in Learn mode.",
  },
  {
    id: "ke-daily-nation",
    src: "tmp/logo-harvest/manual/ke/daily-nation-b18.jpg",
    explainer:
      "Black 'NATION' caps on a solid orange bar — Daily Nation / Nation Media Group masthead.",
    licence:
      "Nationlogo.jpg from Wikimedia Commons; brand mark trademark bundled for educational reference in Learn mode.",
  },
  {
    id: "pk-app",
    src: "tmp/logo-harvest/manual/pk/app-b18-plate.png",
    explainer:
      "Dotted globe over gradient 'APP' beside 'DIGITAL' and 'Associated Press of Pakistan' — APP crest.",
    licence:
      "Associated Press of Pakistan Logo.png from English Wikipedia (fair-use brand mark) bundled for educational reference in Learn mode.",
  },
  {
    id: "id-koran-tempo",
    src: "tmp/logo-harvest/manual/id/koran-tempo-b18.svg",
    explainer:
      "Bold red serif 'TEMPO' wordmark — Koran Tempo / Tempo masthead from tempo.co.",
    licence:
      "TEMPO brand mark trademark bundled from the publisher's official site brand assets (tempo.co) for educational reference in Learn mode.",
  },
  {
    id: "lc-gis-saint-lucia",
    src: "tmp/logo-harvest/manual/lc/gis-b18.png",
    explainer:
      "Saint Lucia coat of arms (parrots, Tudor rose, fleur-de-lis, torch crest) — the Government Information Service mark on govt.lc.",
    licence:
      "Coat of arms of Saint Lucia trademark bundled from the official government site brand asset (govt.lc) for educational reference in Learn mode.",
  },
];

function sha256(buf) {
  return createHash("sha256").update(buf).digest("hex");
}

function patchEntry(src, id, fields) {
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
  let block = src.slice(start, i);
  if (!block.includes("noImageReason") && block.includes('"logo"')) {
    console.log(`  skip ${id} (already has logo)`);
    return src;
  }
  if (!block.includes("noImageReason")) {
    throw new Error(`${id}: expected noImageReason to replace`);
  }
  block = block.replace(/\s*"noImageReason":\s*"(?:\\.|[^"\\])*",?\n?/, "\n");
  const insert = `      "logo": ${JSON.stringify(fields.logo)},\n      "logoExplainer": ${JSON.stringify(fields.explainer)},\n      "licenceNote": ${JSON.stringify(fields.licence)},\n`;
  if (/"sources":/.test(block)) {
    block = block.replace(/(\n\s*)"sources":/, `\n${insert}$1"sources":`);
  } else {
    block = block.replace(/\n(\s*)\}$/, `,\n${insert}$1}`);
  }
  block = block.replace(/,(\s*),/g, ",$1").replace(/,(\s*)\}/g, "$1}");
  return src.slice(0, start) + block + src.slice(i);
}

function main() {
  let papers = readFileSync(resolve(ROOT, "src/data/nationalNewspapers.ts"), "utf8");
  let agencies = readFileSync(resolve(ROOT, "src/data/nationalNewsAgencies.ts"), "utf8");
  let installed = 0;
  for (const row of MANIFEST) {
    const abs = resolve(ROOT, row.src);
    if (!existsSync(abs)) throw new Error(`missing source: ${row.src}`);
    const buf = readFileSync(abs);
    const ext = extname(row.src).toLowerCase() || ".png";
    const cc = row.id.slice(0, 2);
    const slug = row.id.slice(3);
    // plate files still use png dest
    const destExt = ext.includes("plate") ? ".png" : ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".svg" || ext === ".webp" ? ext : ".png";
    const destRel = `newspaper-logos/${cc}/${slug}${destExt === ".jpeg" ? ".jpg" : destExt}`;
    // Fix: plate.png files have .png ext after strip - handle *-plate.png
    const cleanExt = row.src.endsWith("-plate.png") ? ".png" : destExt === ".jpeg" ? ".jpg" : destExt;
    const destRel2 = `newspaper-logos/${cc}/${slug}${cleanExt}`;
    const destAbs = resolve(ROOT, "public", destRel2);
    mkdirSync(dirname(destAbs), { recursive: true });
    copyFileSync(abs, destAbs);
    const fields = { logo: destRel2, explainer: row.explainer, licence: row.licence, sha256: sha256(buf) };
    console.log(`install ${row.id} → ${destRel2} (${buf.length}b)`);
    const beforeP = papers,
      beforeA = agencies;
    try {
      papers = patchEntry(papers, row.id, fields);
    } catch (e) {
      if (!String(e.message).includes("not found")) throw e;
    }
    try {
      agencies = patchEntry(agencies, row.id, fields);
    } catch (e) {
      if (!String(e.message).includes("not found")) throw e;
    }
    if (papers === beforeP && agencies === beforeA) throw new Error(`${row.id}: not found`);
    installed++;
  }
  writeFileSync(resolve(ROOT, "src/data/nationalNewspapers.ts"), papers);
  writeFileSync(resolve(ROOT, "src/data/nationalNewsAgencies.ts"), agencies);
  console.log(`Installed ${installed} logos.`);
}

main();
