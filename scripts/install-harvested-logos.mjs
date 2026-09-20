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

/** Visually verified batch 48 — montage-scanned light/dark. */
const MANIFEST = [
  {
    id: "cy-haravgi",
    src: "tmp/batch48-install/cy-haravgi.png",
    explainer:
      "Black Greek ΧΑΡΑΥΓΗ with a small orange sunrise icon — Haravgi Cyprus masthead.",
    licence:
      "Haravgi trademark bundled from the publisher's official site brand assets (dialogos.com.cy/haravgi) for educational reference in Learn mode.",
  },
  {
    id: "me-rtcng-news",
    src: "tmp/batch48-install/me-rtcng-news.svg",
    explainer:
      "Red disc with a white stylised 'a' beside grey serif 'analitika' — Portal Analitika mark.",
    licence:
      "Portal Analitika trademark bundled from the publisher's official site brand assets (portalanalitika.me) for educational reference in Learn mode.",
  },
  {
    id: "ml-maliweb",
    src: "tmp/batch48-install/ml-maliweb.png",
    explainer:
      "Red-yellow-green swoosh over 'maliweb.net' inside a white circle — Maliweb site mark.",
    licence:
      "Maliweb trademark bundled from the publisher's official site brand assets (maliweb.net) for educational reference in Learn mode.",
  },
  {
    id: "pa-la-estrella-de-panama",
    src: "tmp/batch48-install/pa-la-estrella-de-panama.png",
    explainer:
      "Black serif 'LA ESTRELLA DE PANAMÁ' with a sun-over-water crest and red '177' — La Estrella de Panamá masthead.",
    licence:
      "La Estrella de Panamá trademark bundled from the publisher's official site brand assets (laestrella.com.pa) for educational reference in Learn mode.",
  },
  {
    id: "sr-de-west",
    src: "tmp/batch48-install/sr-de-west.png",
    explainer:
      "Bold black 'DE WEST' over light-blue italic 'Dagblad uit en voor Suriname' — De West masthead.",
    licence:
      "De West trademark bundled from the publisher's official site brand assets (dagbladdewest.com) for educational reference in Learn mode.",
  },
  {
    id: "sn-wal-fadjri",
    src: "tmp/batch48-install/sn-wal-fadjri.png",
    explainer:
      "Italic black 'Walf' beside red 'Quotidien' — Walf Quotidien masthead.",
    licence:
      "Walf Quotidien trademark bundled from the publisher's official Groupe Walfadjri brand assets (walf-groupe.com) for educational reference in Learn mode.",
  },
  {
    id: "tn-kapitalis",
    src: "tmp/batch48-install/tn-kapitalis.png",
    explainer:
      "Blue-and-red chevron 'K' beside 'Kapitalis' over a red bar reading \"l'actualité AUTREMENT\" — Kapitalis masthead.",
    licence:
      "Kapitalis trademark bundled from the publisher's official site brand assets (kapitalis.com) for educational reference in Learn mode.",
  },
  {
    id: "uy-busqueda",
    src: "tmp/batch48-install/uy-busqueda.svg",
    explainer:
      "Heavy black all-caps 'BÚSQUEDA' block wordmark — Búsqueda Uruguay masthead.",
    licence:
      "Búsqueda trademark bundled from the publisher's official site brand assets (busqueda.com.uy) for educational reference in Learn mode.",
  },
  {
    id: "vn-lao-dong",
    src: "tmp/batch48-install/vn-lao-dong.png",
    explainer:
      "Bold red 'LAO ĐỘNG' with a starred O in ĐỘNG — Lao Động Vietnam masthead.",
    licence:
      "Lao Động trademark bundled from the publisher's official site brand assets (laodong.vn) for educational reference in Learn mode.",
  },
  {
    id: "ly-al-wasat",
    src: "tmp/batch48-install/ly-al-wasat.png",
    explainer:
      "Blocky Arabic الوسط with blue accents and Latin 'AL WASAT' — Al-Wasat Libya masthead.",
    licence:
      "Al-Wasat trademark bundled from the publisher's official site brand assets (alwasat.ly) for educational reference in Learn mode.",
  },
  {
    id: "tn-la-presse",
    src: "tmp/batch48-install/tn-la-presse.png",
    explainer:
      "Black serif 'La Presse' with a gold quill through the P — La Presse de Tunisie masthead.",
    licence:
      "La Presse trademark bundled from the publisher's official site brand assets (lapresse.tn) for educational reference in Learn mode.",
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
