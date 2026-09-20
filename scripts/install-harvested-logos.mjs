#!/usr/bin/env node
/**
 * Install visually-verified newspaper/agency logos into public/ + data files.
 * Only entries listed in MANIFEST are touched. Never invents images.
 *
 * Usage: node scripts/install-harvested-logos.mjs
 */
import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve, join, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

/**
 * Visually verified batch (2026-09). Each row: id, source path (repo-relative),
 * logoExplainer, licenceNote, optional kind override.
 */
const MANIFEST = [
  {
    id: "ly-lanews",
    src: "tmp/logo-harvest/ly/lanews.png",
    explainer:
      "Light-blue Arabic wordmark with a globe mark \u2014 Libya Al-Ahrar News digital masthead from its own site.",
    licence:
      "Libya Al-Ahrar News masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "mz-canal-de-mocambique",
    src: "tmp/logo-harvest/mz/canal-de-mocambique.png",
    explainer:
      "Dark-blue 'Canal' script over orange 'de Mo\u00e7ambique' \u2014 Canal de Mo\u00e7ambique newspaper masthead.",
    licence:
      "Canal de Mo\u00e7ambique masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ps-wafa",
    src: "tmp/logo-harvest/ps/wafa.png",
    explainer:
      "Stacked 'WAFA' mark with Arabic title and 'Palestinian News & Info Agency' strap \u2014 the official agency crest.",
    licence:
      "WAFA brand mark trademark bundled from the agency's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "pg-loop-png",
    src: "tmp/logo-harvest/pg/loop-png.png",
    explainer:
      "Yellow disc with black overlapping-loop play mark \u2014 Loop PNG's digital news brand emblem.",
    licence:
      "Loop PNG brand mark trademark bundled from Wikimedia Commons (File:Loops logo.png) for educational reference in Learn mode.",
  },
];

function sha256(buf) {
  return createHash("sha256").update(buf).digest("hex");
}

function patchEntry(src, id, fields) {
  // Find the object block for this id and replace noImageReason with logo fields
  const idRe = new RegExp(`"id":\\s*"${id}"`);
  const m = idRe.exec(src);
  if (!m) throw new Error(`id not found: ${id}`);
  // Walk backwards to find the opening `{` of this object (previous `{` after a `[` or `,`)
  let start = m.index;
  while (start > 0 && src[start] !== "{") start--;
  // Find matching close brace
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
  // Remove noImageReason line
  block = block.replace(/\s*"noImageReason":\s*"(?:\\.|[^"\\])*",?\n?/, "\n");
  // Insert logo fields before sources (or at end before closing)
  const insert = `      "logo": ${JSON.stringify(fields.logo)},\n      "logoExplainer": ${JSON.stringify(fields.explainer)},\n      "licenceNote": ${JSON.stringify(fields.licence)},\n`;
  if (/"sources":/.test(block)) {
    block = block.replace(/(\n\s*)"sources":/, `\n${insert}$1"sources":`);
  } else {
    block = block.replace(/\n(\s*)\}$/, `,\n${insert}$1}`);
  }
  // tidy double commas / trailing commas before }
  block = block.replace(/,(\s*),/g, ",$1").replace(/,(\s*)\}/g, "$1}");
  return src.slice(0, start) + block + src.slice(i);
}

function main() {
  let papers = readFileSync(resolve(ROOT, "src/data/nationalNewspapers.ts"), "utf8");
  let agencies = readFileSync(resolve(ROOT, "src/data/nationalNewsAgencies.ts"), "utf8");
  let installed = 0;
  for (const row of MANIFEST) {
    const abs = resolve(ROOT, row.src);
    if (!existsSync(abs)) throw new Error(`missing source ${row.src}`);
    const buf = readFileSync(abs);
    const kind =
      buf[0] === 0x89
        ? "png"
        : buf[0] === 0xff
          ? "jpg"
          : buf.toString("utf8", 0, 200).includes("<svg")
            ? "svg"
            : buf.toString("latin1", 0, 4) === "RIFF"
              ? "webp"
              : extname(row.src).slice(1).replace("jpeg", "jpg");
    const cc = row.id.slice(0, 2);
    const slug = row.id.slice(3);
    const relDir = `newspaper-logos/${cc}`;
    const destDir = resolve(ROOT, "public", relDir);
    mkdirSync(destDir, { recursive: true });
    const destName = `${slug}.${kind === "jpeg" ? "jpg" : kind}`;
    const destAbs = join(destDir, destName);
    copyFileSync(abs, destAbs);
    const logoPath = `${relDir}/${destName}`;
    const fields = { logo: logoPath, explainer: row.explainer, licence: row.licence };
    console.log(`install ${row.id} → ${logoPath} (${buf.length}b sha=${sha256(buf).slice(0, 12)})`);
    let found = false;
    if (papers.includes(`"id": "${row.id}"`)) {
      papers = patchEntry(papers, row.id, fields);
      found = true;
    }
    if (agencies.includes(`"id": "${row.id}"`)) {
      agencies = patchEntry(agencies, row.id, fields);
      found = true;
    }
    if (!found) {
      throw new Error(`id ${row.id} not in papers or agencies`);
    }
    installed++;
  }
  writeFileSync(resolve(ROOT, "src/data/nationalNewspapers.ts"), papers);
  writeFileSync(resolve(ROOT, "src/data/nationalNewsAgencies.ts"), agencies);
  console.log(`\nInstalled ${installed} logos.`);
}

main();
