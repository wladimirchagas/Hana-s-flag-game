#!/usr/bin/env node
/**
 * Install visually-verified newspaper/agency logos into public/ + data files.
 * Only entries listed in MANIFEST are touched. Never invents images.
 */
import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

/** Visually verified batch 43 — official-site mastheads via Playwright, montage-scanned. */
const MANIFEST = [
  {
    id: "am-civilnet",
    src: "tmp/batch43-install/am-civilnet.svg",
    explainer:
      "Red sans all-caps 'CIVILNET' with a red square containing a diagonal negative-space N — CivilNet Armenia masthead.",
    licence:
      "CivilNet logo trademark bundled from the publisher's official site brand assets (civilnet.am/logos/CivilnetLarge.svg) for educational reference in Learn mode.",
  },
  {
    id: "ag-antigua-observer",
    src: "tmp/batch43-install/ag-antigua-observer.png",
    explainer:
      "Antigua Observer wordmark from the publisher's Newsco site header — ObserverByNewscoLogo brand asset.",
    licence:
      "Antigua Observer masthead trademark bundled from the publisher's official site brand assets (antiguaobserver.com) for educational reference in Learn mode.",
  },
  {
    id: "bz-amandala",
    src: "tmp/batch43-install/bz-amandala.png",
    explainer:
      "Black serif 'AMANDALA' with satellite-dish figure and newspaper stack flanking the wordmark and tagline \"Belize's Leading Newspaper\".",
    licence:
      "Amandala masthead trademark bundled from the publisher's official site brand assets (amandala.com.bz) for educational reference in Learn mode.",
  },
  {
    id: "gy-guyana-chronicle",
    src: "tmp/batch43-install/gy-guyana-chronicle.png",
    explainer:
      "Red serif 'CHRONICLE' under black 'GUYANA' with hoatzin-flanked shield emblem and 'The Nation's Paper' tagline.",
    licence:
      "Guyana Chronicle masthead trademark bundled from the publisher's official site brand assets (guyanachronicle.com) for educational reference in Learn mode.",
  },
  {
    id: "jo-ammon",
    src: "tmp/batch43-install/jo-ammon.png",
    explainer:
      "Gold calligraphic 'Ammon' with a winged Pegasus on the final n and tagline 'Voice of the Silent Majority'.",
    licence:
      "Ammon News masthead trademark bundled from the publisher's official site brand assets (en.ammonnews.net) for educational reference in Learn mode.",
  },
  {
    id: "me-mina",
    src: "tmp/batch43-install/me-mina.png",
    explainer:
      "Black italic 'mina.' wordmark beside a red-and-gold '20 godina od obnove nezavisnosti' commemorative panel — MINA Montenegro agency mark.",
    licence:
      "MINA News Agency logo trademark bundled from the agency's official site brand assets (mina.news) for educational reference in Learn mode.",
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
    const cc = row.id.slice(0, 2);
    const slug = row.id.slice(3);
    const cleanExt = row.src.endsWith(".svg")
      ? ".svg"
      : row.src.endsWith(".webp")
        ? ".webp"
        : row.src.endsWith(".jpg") || row.src.endsWith(".jpeg")
          ? ".jpg"
          : ".png";
    const destRel = `newspaper-logos/${cc}/${slug}${cleanExt}`;
    const destAbs = resolve(ROOT, "public", destRel);
    mkdirSync(dirname(destAbs), { recursive: true });
    copyFileSync(abs, destAbs);
    const fields = { logo: destRel, explainer: row.explainer, licence: row.licence, sha256: sha256(buf) };
    console.log(`install ${row.id} → ${destRel} (${buf.length}b)`);
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
    if (papers === beforeP && agencies === beforeA) {
      console.log(`  ${row.id}: data unchanged (already had logo)`);
      continue;
    }
    installed++;
  }
  writeFileSync(resolve(ROOT, "src/data/nationalNewspapers.ts"), papers);
  writeFileSync(resolve(ROOT, "src/data/nationalNewsAgencies.ts"), agencies);
  console.log(`Installed ${installed} logos.`);
}

main();
