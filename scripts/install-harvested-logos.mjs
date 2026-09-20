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

/** Visually verified batch 16 — official-site logos via browser UA. */
const MANIFEST = [
  {
    id: "af-bakhtar",
    src: "tmp/logo-harvest/manual/af/bakhtar-b16.png",
    explainer:
      "Red winged emblem beside light 'BAKHTAR NEWS AGENCY' wordmark on a dark plate — Bakhtar's site masthead.",
    licence:
      "Bakhtar News Agency brand mark trademark bundled from the agency's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "bi-abp",
    src: "tmp/logo-harvest/manual/bi/abp-b16.png",
    explainer:
      "Circular map-and-tower seal with red 'Agence Burundaise de Presse' and outlined 'ABP' — Burundi ABP crest.",
    licence:
      "Agence Burundaise de Presse brand mark trademark bundled from the agency's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "kh-akp",
    src: "tmp/logo-harvest/manual/kh/akp-b16.png",
    explainer:
      "Circular Angkor Wat and guardian-lion emblem with bold 'AKP' — Agence Kampuchea Presse crest.",
    licence:
      "AKP brand mark trademark bundled from the agency's official site brand assets (akp.gov.kh) for educational reference in Learn mode.",
  },
  {
    id: "cv-inforpress",
    src: "tmp/logo-harvest/manual/cv/inforpress-b16.svg",
    explainer:
      "Blue stacked 'infor/press' wordmark beside a red squared globe — Cape Verde Inforpress crest.",
    licence:
      "Inforpress brand mark trademark bundled from the agency's official site brand assets (inforpress.cv/logo.svg) for educational reference in Learn mode.",
  },
  {
    id: "cg-aci",
    src: "tmp/logo-harvest/manual/cg/aci-b16.png",
    explainer:
      "Red circled 'A' beside 'AGENCE CONGOLAISE D'INFORMATION' and the agency motto — ACI crest.",
    licence:
      "ACI brand mark trademark bundled from the agency's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "gq-guinea-ecuatorial-press",
    src: "tmp/logo-harvest/manual/gq/guinea-ecuatorial-press-b16.png",
    explainer:
      "Equatorial Guinea coat of arms (silk-cotton tree, six stars, 'UNIDAD PAZ JUSTICIA') — the state press site's main mark.",
    licence:
      "Guinea Ecuatorial Press brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "kg-kabar",
    src: "tmp/logo-harvest/manual/kg/kabar-b16.svg",
    explainer:
      "Bold navy 'KABAR' wordmark — Kyrgyz National News Agency Kabar crest from its site.",
    licence:
      "Kabar brand mark trademark bundled from the agency's official site brand assets (kabar.kg) for educational reference in Learn mode.",
  },
  {
    id: "lv-lsm",
    src: "tmp/logo-harvest/manual/lv/lsm-b16b.svg",
    explainer:
      "Black 'LSM' bar beside 'Latvijas Sabiedriskais medijs' — Latvian Public Media crest.",
    licence:
      "LSM brand mark trademark bundled from the publisher's official site brand assets (lsm.lv) for educational reference in Learn mode.",
  },
  {
    id: "tg-atop",
    src: "tmp/logo-harvest/manual/tg/atop-b16.svg",
    explainer:
      "Green 'atop' wordmark with lined globe 'o' and red accent dot over 'Agence Togolaise de Presse'.",
    licence:
      "ATOP brand mark trademark bundled from the agency's official site brand assets (atop.tg) for educational reference in Learn mode.",
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
    const destRel = `newspaper-logos/${cc}/${slug}${ext}`;
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
    if (papers === beforeP && agencies === beforeA) throw new Error(`${row.id}: not found`);
    installed++;
  }
  writeFileSync(resolve(ROOT, "src/data/nationalNewspapers.ts"), papers);
  writeFileSync(resolve(ROOT, "src/data/nationalNewsAgencies.ts"), agencies);
  console.log(`Installed ${installed} logos.`);
}

main();
