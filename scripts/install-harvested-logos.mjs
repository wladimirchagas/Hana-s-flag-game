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

/** Visually verified batch 45 — montage-scanned light/dark. */
const MANIFEST = [
  {
    id: "kn-skn-observer",
    src: "tmp/batch45-install/kn-skn-observer.png",
    explainer:
      "Black 'St KITTS & NEVIS' with two stars beside bold red 'OBSERVER', underlined by green and yellow bars — St. Kitts-Nevis Observer masthead.",
    licence:
      "The St. Kitts-Nevis Observer masthead trademark bundled from the publisher's official site brand assets (thestkittsnevisobserver.com) for educational reference in Learn mode.",
  },
  {
    id: "ua-ukrainian-news",
    src: "tmp/batch45-install/ua-ukrainian-news.png",
    explainer:
      "Cyan connected lowercase 'un' monogram with an orange dot over the n — Ukrainian News Agency (Українські Новини) brand mark.",
    licence:
      "Ukrainian News Agency trademark bundled from the agency's official site brand assets (ukranews.com) for educational reference in Learn mode.",
  },
  {
    id: "gy-news-room-guyana",
    src: "tmp/batch45-install/gy-news-room-guyana.png",
    explainer:
      "White stacked 'NEWS' / 'ROOM' inside a thin white frame on a navy square — News Room Guyana site mark.",
    licence:
      "News Room Guyana trademark bundled from the publisher's official site brand assets (newsroom.gy) for educational reference in Learn mode.",
  },
  {
    id: "ly-libya-observer",
    src: "tmp/batch45-install/ly-libya-observer.png",
    explainer:
      "Grey serif 'THE LIBYA' over 'OBSERVER' with the O drawn as a red bullseye/eye mark — The Libya Observer masthead.",
    licence:
      "The Libya Observer masthead trademark bundled from the publisher's official site brand assets (libyaobserver.ly) for educational reference in Learn mode.",
  },
  {
    id: "tn-mosaique-info",
    src: "tmp/batch45-install/tn-mosaique-info.png",
    explainer:
      "Red italic 'fm' beside bold Arabic موزاييك with a tapering red swoosh — Mosaique FM / Mosaique Info wordmark.",
    licence:
      "Mosaique FM trademark bundled from the publisher's official site brand assets (mosaiquefm.net) for educational reference in Learn mode.",
  },
  {
    id: "me-cdm",
    src: "tmp/batch45-install/me-cdm.svg",
    explainer:
      "White boxed 'C|D|M' letter marks in three square cells — Cafe del Montenegro (CdM) site wordmark.",
    licence:
      "CdM (Cafe del Montenegro) trademark bundled from the publisher's official site brand assets (cdm.me) for educational reference in Learn mode.",
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
  if (block.includes("noImageReason")) {
    block = block.replace(/\s*"noImageReason":\s*"(?:\\.|[^"\\])*",?\n?/, "\n");
  }
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
