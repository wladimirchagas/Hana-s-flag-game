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

/** Visually verified batch 31 — montage-scanned. */
const MANIFEST = [
  {
    id: "ga-gabon-medias-time",
    src: "tmp/batch31-manual/gabon-medias-time.png",
    explainer:
      "Teal 'GMT' monogram with a clock face in the G above 'GABON MEDIA TIME' on black — Gabonese digital news masthead.",
    licence:
      "Gabon Media Time masthead trademark bundled from the publisher's official site brand assets (gabonmediatime.com) for educational reference in Learn mode.",
  },
  {
    id: "ao-angonoticias",
    src: "tmp/batch31-manual/angonoticias.jpg",
    explainer:
      "White slab-serif 'ANGO / NOTÍCIAS' on an orange square — Angolan digital news masthead.",
    licence:
      "AngoNotícias masthead trademark bundled from the publisher's official site brand assets (angonoticias.com) for educational reference in Learn mode.",
  },
  {
    id: "na-die-republikein",
    src: "tmp/batch31-manual/republikein.png",
    explainer:
      "White 'Republikein' wordmark with Afrikaans tagline 'Jou land. Jou mense. Jou nuus.' on black — Namibian Afrikaans daily masthead.",
    licence:
      "Die Republikein masthead trademark bundled from the publisher's official site brand assets (republikein.com.na) for educational reference in Learn mode.",
  },
  {
    id: "so-hiiraan-online",
    src: "tmp/batch31-manual/hiiraan-light.jpg",
    explainer:
      "Green palm-tree shield beside dark green 'HIIRAAN ONLINE' — Somali digital news masthead.",
    licence:
      "Hiiraan Online masthead trademark bundled from the publisher's official site brand assets (hiiraan.com) for educational reference in Learn mode.",
  },
  {
    id: "so-caasimada",
    src: "tmp/batch31-manual/caasimada.webp",
    explainer:
      "White swirling 'C' mark beside 'Caasimada ONLINE' with a star — Somali digital news masthead.",
    licence:
      "Caasimada Online masthead trademark bundled from the publisher's official site brand assets (caasimada.net) for educational reference in Learn mode.",
  },
  {
    id: "sz-swaziland-news",
    src: "tmp/batch31-manual/swaziland-news.png",
    explainer:
      "Red-outlined 'SWAZILAND' with a red feather and solid red 'NEWS' on black — Eswatini digital news masthead.",
    licence:
      "Swaziland News masthead trademark bundled from the publisher's official site brand assets (swazilandnews.co.za) for educational reference in Learn mode.",
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
