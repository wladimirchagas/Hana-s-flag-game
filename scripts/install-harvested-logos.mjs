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

/** Visually verified batch 52 — montage-scanned light/dark. */
const MANIFEST = [
  {
    id: "dj-human-village",
    src: "tmp/batch52-install/dj-human-village.jpg",
    sourceUrl: "http://www.human-village.org/squelettes/images/HumanVillage_840x142.jpg",
    explainer:
      "Hand-drawn house icon beside beige 'HUMAN' and dark-red brush 'Village' with ochre tagline 'l\\'information autrement' — Human Village magazine masthead.",
    licence:
      "Human Village trademark bundled from the publisher's official site brand assets (human-village.org) for educational reference in Learn mode.",
  },
  {
    id: "gn-africaguinee",
    src: "tmp/batch52-install/gn-africaguinee.png",
    sourceUrl: "https://www.africaguinee.com/app/themes/understrap/img/africa.png",
    explainer:
      "White serif 'Africaguinee.com' wordmark on green with a white Africa silhouette and red-yellow-green target over Guinea — Africaguinee masthead.",
    licence:
      "Africaguinee trademark bundled from the publisher's official site brand assets (africaguinee.com) for educational reference in Learn mode.",
  },
  {
    id: "kn-sknvibes",
    src: "tmp/batch52-install/kn-sknvibes.png",
    sourceUrl: "https://www.sknvibes.com/display/img/sknvibesnew.png",
    explainer:
      "Cream bubbly lowercase 'skn / vibes' wordmark with cyan and yellow splash flourishes on black — SKNVibes masthead.",
    licence:
      "SKNVibes trademark bundled from the publisher's official site brand assets (sknvibes.com) for educational reference in Learn mode.",
  },
  {
    id: "la-vientiane-times",
    src: "tmp/batch52-install/la-vientiane-times.jpg",
    sourceUrl: "https://www.vientianetimes.org.la/Access/VTT_banner2025.jpg",
    explainer:
      "Gold globe with dok champa over 'LAO PRESS' beside royal-blue serif 'Vientiane Times' wordmark — Vientiane Times masthead.",
    licence:
      "Vientiane Times trademark bundled from the publisher's official site brand assets (vientianetimes.org.la) for educational reference in Learn mode.",
  },
];

function sha256(buf) {
  return createHash("sha256").update(buf).digest("hex");
}

function patchEntry(filePath, id, patch) {
  let src = readFileSync(filePath, "utf8");
  const idRe = new RegExp(`("id"\\s*:\\s*"${id}"[\\s\\S]*?)(\\n\\s*\\})`);
  const m = src.match(idRe);
  if (!m) throw new Error(`entry not found: ${id} in ${filePath}`);
  let block = m[1];
  block = block.replace(/\n\s*"noImageReason"\s*:\s*"(?:\\.|[^"\\])*"\s*,?/, "\n");
  for (const k of ["logo", "sha256", "logoSourceUrl", "logoExplainer", "licenceNote"]) {
    block = block.replace(new RegExp(`\\n\\s*"${k}"\\s*:\\s*"(?:\\\\.|[^"\\\\])*"\\s*,?`), "\n");
  }
  block = block.replace(/,(\s*)$/, "$1");
  const insert = Object.entries(patch)
    .map(([k, v]) => `\n      "${k}": ${JSON.stringify(v)}`)
    .join(",");
  if (!/,\s*$/.test(block)) block = block.replace(/(\S)(\s*)$/, "$1,$2");
  const newBlock = block + insert;
  src = src.replace(idRe, newBlock + m[2]);
  writeFileSync(filePath, src);
}

const papersPath = resolve(ROOT, "src/data/nationalNewspapers.ts");
const agenciesPath = resolve(ROOT, "src/data/nationalNewsAgencies.ts");

for (const entry of MANIFEST) {
  const abs = resolve(ROOT, entry.src);
  if (!existsSync(abs)) throw new Error(`missing src ${entry.src}`);
  const buf = readFileSync(abs);
  const hash = sha256(buf);
  const ext = entry.src.split(".").pop().toLowerCase();
  const [cc, ...rest] = entry.id.split("-");
  const slug = rest.join("-");
  const relDir = `newspaper-logos/${cc}`;
  const relPath = `${relDir}/${slug}.${ext}`;
  const dest = resolve(ROOT, "public", relPath);
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(abs, dest);
  console.log(`install ${entry.id} → ${relPath} (${buf.length}b)`);

  const papersSrc = readFileSync(papersPath, "utf8");
  const agenciesSrc = readFileSync(agenciesPath, "utf8");
  const inPapers = papersSrc.includes(`"id": "${entry.id}"`);
  const inAgencies = agenciesSrc.includes(`"id": "${entry.id}"`);
  if (!inPapers && !inAgencies) throw new Error(`id not in data: ${entry.id}`);
  const target = inPapers ? papersPath : agenciesPath;
  patchEntry(target, entry.id, {
    logo: `/${relPath}`,
    sha256: hash,
    logoSourceUrl: entry.sourceUrl,
    logoExplainer: entry.explainer,
    licenceNote: entry.licence,
  });
}
console.log(`Installed ${MANIFEST.length} logos.`);
