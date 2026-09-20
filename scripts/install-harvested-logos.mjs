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

/** Visually verified batch 46 — montage-scanned light/dark. */
const MANIFEST = [
  {
    id: "bz-san-pedro-sun",
    src: "tmp/batch46-install/bz-san-pedro-sun.png",
    explainer:
      "Orange rising sun over a teal open-book glyph above black serif 'The San Pedro Sun' — San Pedro Sun masthead.",
    licence:
      "The San Pedro Sun masthead trademark bundled from the publisher's official site brand assets (sanpedrosun.com) for educational reference in Learn mode.",
  },
  {
    id: "jo-al-rai",
    src: "tmp/batch46-install/jo-al-rai.svg",
    explainer:
      "Black Arabic الرأي wordmark over a light-blue silhouette map of Jordan — Al-Rai masthead.",
    licence:
      "Al-Rai masthead trademark bundled from the publisher's official site brand assets (alrai.com) for educational reference in Learn mode.",
  },
  {
    id: "gh-citinewsroom",
    src: "tmp/batch46-install/gh-citinewsroom.png",
    explainer:
      "Magenta striped 'CNR' over solid 'CITI NEWSROOM' — Citi Newsroom Ghana site mark.",
    licence:
      "Citi Newsroom trademark bundled from the publisher's official site brand assets (citinewsroom.com) for educational reference in Learn mode.",
  },
  {
    id: "ma-le360",
    src: "tmp/batch46-install/ma-le360.svg",
    explainer:
      "Outlined orange 'le' beside solid orange '360' — le360 Morocco wordmark.",
    licence:
      "le360 trademark bundled from the publisher's official site brand assets (le360.ma) for educational reference in Learn mode.",
  },
  {
    id: "np-kantipur",
    src: "tmp/batch46-install/np-kantipur.svg",
    explainer:
      "Black Devanagari कान्तिपुर beside a pagoda silhouette — Kantipur daily masthead.",
    licence:
      "Kantipur trademark bundled from the publisher's official site brand assets (ekantipur.com) for educational reference in Learn mode.",
  },
  {
    id: "pa-panama-america",
    src: "tmp/batch46-install/pa-panama-america.png",
    explainer:
      "Blue serif 'Panamá América' with a thin gold underline — Panamá América masthead.",
    licence:
      "Panamá América masthead trademark bundled from the publisher's official site brand assets (panamaamerica.com.pa) for educational reference in Learn mode.",
  },
  {
    id: "uy-montevideo-portal",
    src: "tmp/batch46-install/uy-montevideo-portal.svg",
    explainer:
      "White arched 'm' mark beside stacked 'Montevideo' / 'Portal' — Montevideo Portal wordmark.",
    licence:
      "Montevideo Portal trademark bundled from the publisher's official site brand assets (montevideo.com.uy) for educational reference in Learn mode.",
  },
  {
    id: "uz-kun-uz",
    src: "tmp/batch46-install/uz-kun-uz.svg",
    explainer:
      "Bold blue 'KUN.' beside a blue disc with white 'UZ' — Kun.uz site mark.",
    licence:
      "Kun.uz trademark bundled from the publisher's official site brand assets (kun.uz) for educational reference in Learn mode.",
  },
  {
    id: "pe-peru-21",
    src: "tmp/batch46-install/pe-peru-21.png",
    explainer:
      "White serif 'Perú' beside bold yellow '21' — Perú21 masthead.",
    licence:
      "Perú21 trademark bundled from the publisher's official site brand assets (peru21.pe) for educational reference in Learn mode.",
  },
  {
    id: "om-omandaily",
    src: "tmp/batch46-install/om-omandaily.png",
    explainer:
      "Black Arabic عمان wordmark over a light-blue silhouette map of Oman — Oman Daily (Jaridat Oman) masthead.",
    licence:
      "Oman Daily trademark bundled from the publisher's official site brand assets (omandaily.om) for educational reference in Learn mode.",
  },
  {
    id: "za-sunday-times",
    src: "tmp/batch46-install/za-sunday-times.svg",
    explainer:
      "Blackletter 'Sunday Times' gothic wordmark — South Africa Sunday Times masthead.",
    licence:
      "Sunday Times (South Africa) trademark bundled from the publisher's official TimesLIVE brand assets (sundaytimes.timeslive.co.za) for educational reference in Learn mode.",
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
