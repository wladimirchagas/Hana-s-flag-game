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

/** Visually verified batch 47 — montage-scanned light/dark. */
const MANIFEST = [
  {
    id: "iq-al-mada",
    src: "tmp/batch47-install/iq-al-mada.png",
    explainer:
      "Red interlocking calligraphic emblem over black 'ALMADA PAPER' — Al-Mada (Iraq) masthead.",
    licence:
      "Al-Mada trademark bundled from the publisher's official site brand assets (almadapaper.net) for educational reference in Learn mode.",
  },
  {
    id: "md-point-md",
    src: "tmp/batch47-install/md-point-md.svg",
    explainer:
      "Bold navy 'Point' with an orange disc for the i-dot — Point.md site wordmark.",
    licence:
      "Point.md trademark bundled from the publisher's official site brand assets (point.md) for educational reference in Learn mode.",
  },
  {
    id: "mm-eleven-media",
    src: "tmp/batch47-install/mm-eleven-media.png",
    explainer:
      "White 'ELEVEN' with the first E on a red block under an orange disc — Eleven Media Myanmar mark.",
    licence:
      "Eleven Media trademark bundled from the publisher's official site brand assets (elevenmyanmar.com) for educational reference in Learn mode.",
  },
  {
    id: "mw-the-daily-times",
    src: "tmp/batch47-install/mw-the-daily-times.png",
    explainer:
      "White serif 'THE TIMES' over spaced 'GROUP' — Times Group Malawi masthead used by The Daily Times.",
    licence:
      "Times Group Malawi trademark bundled from the publisher's official site brand assets (times.mw) for educational reference in Learn mode.",
  },
  {
    id: "sa-al-riyadh",
    src: "tmp/batch47-install/sa-al-riyadh.png",
    explainer:
      "Bold outlined Arabic الرياض with a green palm-in-blue cradle emblem — Al Riyadh masthead.",
    licence:
      "Al Riyadh trademark bundled from the publisher's official site brand assets (alriyadh.com) for educational reference in Learn mode.",
  },
  {
    id: "tt-cnc3",
    src: "tmp/batch47-install/tt-cnc3.png",
    explainer:
      "White 'CNC3' over a dark-red world map inside a red disc — CNC3 Trinidad site mark.",
    licence:
      "CNC3 trademark bundled from the publisher's official site brand assets (cnc3.co.tt) for educational reference in Learn mode.",
  },
  {
    id: "ug-bukedde",
    src: "tmp/batch47-install/ug-bukedde.png",
    explainer:
      "Blue italic 'Bukedde' inside a thin red rounded frame — Bukedde masthead.",
    licence:
      "Bukedde trademark bundled from the publisher's official site brand assets (bukedde.co.ug) for educational reference in Learn mode.",
  },
  {
    id: "ug-nile-post",
    src: "tmp/batch47-install/ug-nile-post.png",
    explainer:
      "Red 'NP' over cyan 'NilePost' tile beside black 'NilePost / Accurate News Fast' — NilePost mark.",
    licence:
      "NilePost trademark bundled from the publisher's official site brand assets (nilepost.co.ug) for educational reference in Learn mode.",
  },
  {
    id: "vc-the-vincentian",
    src: "tmp/batch47-install/vc-the-vincentian.png",
    explainer:
      "Silver blackletter 'Vincentian' under 'The National Newspaper of St. Vincent and the Grenadines' with a green island map — The Vincentian masthead.",
    licence:
      "The Vincentian masthead trademark bundled from the publisher's official site brand assets (thevincentian.com) for educational reference in Learn mode.",
  },
  {
    id: "ve-el-universal",
    src: "tmp/batch47-install/ve-el-universal.svg",
    explainer:
      "Heavy black all-caps serif 'EL UNIVERSAL' — El Universal (Venezuela) masthead.",
    licence:
      "El Universal trademark bundled from the publisher's official site brand assets (eluniversal.com) for educational reference in Learn mode.",
  },
  {
    id: "ve-talcual",
    src: "tmp/batch47-install/ve-talcual.png",
    explainer:
      "White 'Tal' in a red square beside black 'Cual' with red 'claro y raspao' tagline — TalCual masthead.",
    licence:
      "TalCual trademark bundled from the publisher's official site brand assets (talcualdigital.com) for educational reference in Learn mode.",
  },
  {
    id: "zm-diggers-news",
    src: "tmp/batch47-install/zm-diggers-news.png",
    explainer:
      "Vertical red 'News' beside bold 'Diggers!' with a red exclamation and 'Ear to the ground' tagline — News Diggers mark.",
    licence:
      "News Diggers trademark bundled from the publisher's official site brand assets (diggers.news) for educational reference in Learn mode.",
  },
  {
    id: "zm-lusaka-times",
    src: "tmp/batch47-install/zm-lusaka-times.png",
    explainer:
      "White serif 'LT' inside a teal-blue circular badge — Lusaka Times site mark.",
    licence:
      "Lusaka Times trademark bundled from the publisher's official site brand assets (lusakatimes.com) for educational reference in Learn mode.",
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
