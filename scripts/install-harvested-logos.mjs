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
    id: "uz-uza",
    src: "tmp/logo-harvest/uz/uza.svg",
    explainer:
      "Official masthead/brand mark for UzA, sourced from the publisher's official site and visually verified.",
    licence:
      "UzA brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "af-khaama",
    src: "tmp/logo-harvest/af/khaama.png",
    explainer:
      "Official masthead/brand mark for Khaama Press, sourced from Wikimedia Commons and visually verified.",
    licence:
      "Khaama Press brand mark trademark bundled from Wikimedia Commons (File:Khaama-Press-Logo.png) for educational reference in Learn mode.",
  },
  {
    id: "al-atsh",
    src: "tmp/logo-harvest/al/atsh.svg",
    explainer:
      "Official masthead/brand mark for Albanian Telegraphic Agency, sourced from Wikimedia Commons and visually verified.",
    licence:
      "Albanian Telegraphic Agency brand mark trademark bundled from Wikimedia Commons (File:Agjencia Telegrafike Shqiptare.svg) for educational reference in Learn mode.",
  },
  {
    id: "dz-aps",
    src: "tmp/logo-harvest/dz/aps.png",
    explainer:
      "Official masthead/brand mark for Alg\u00e9rie Presse Service, sourced from the publisher's official site and visually verified.",
    licence:
      "Alg\u00e9rie Presse Service brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ad-ana",
    src: "tmp/logo-harvest/ad/ana.png",
    explainer:
      "Official masthead/brand mark for Ag\u00e8ncia de Not\u00edcies Andorrana, sourced from the publisher's official site and visually verified.",
    licence:
      "Ag\u00e8ncia de Not\u00edcies Andorrana brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ag-pointville",
    src: "tmp/logo-harvest/ag/pointville.png",
    explainer:
      "Official masthead/brand mark for Point Express Newspaper, sourced from the publisher's official site and visually verified.",
    licence:
      "Point Express Newspaper brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "am-armenpress",
    src: "tmp/logo-harvest/am/armenpress.svg",
    explainer:
      "Official masthead/brand mark for Armenpress, sourced from Wikimedia Commons and visually verified.",
    licence:
      "Armenpress brand mark trademark bundled from Wikimedia Commons (File:Armenpress 2 logo.svg) for educational reference in Learn mode.",
  },
  {
    id: "am-hayastani-hanrapetutyun",
    src: "tmp/logo-harvest/am/hayastani-hanrapetutyun.png",
    explainer:
      "Official masthead/brand mark for Hayastani Hanrapetutyun, sourced from the publisher's official site and visually verified.",
    licence:
      "Hayastani Hanrapetutyun brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "az-apa",
    src: "tmp/logo-harvest/az/apa.svg",
    explainer:
      "Official masthead/brand mark for APA, sourced from the publisher's official site and visually verified.",
    licence:
      "APA brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "az-trend",
    src: "tmp/logo-harvest/az/trend.png",
    explainer:
      "Official masthead/brand mark for Trend News Agency, sourced from the publisher's official site and visually verified.",
    licence:
      "Trend News Agency brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "az-report",
    src: "tmp/logo-harvest/az/report.png",
    explainer:
      "Official masthead/brand mark for Report News Agency, sourced from the publisher's official site and visually verified.",
    licence:
      "Report News Agency brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "by-belta",
    src: "tmp/logo-harvest/by/belta-alt1.svg",
    explainer:
      "Official masthead/brand mark for BelTA, sourced from Wikimedia Commons and visually verified.",
    licence:
      "BelTA brand mark trademark bundled from Wikimedia Commons (File:BonBelta.svg) for educational reference in Learn mode.",
  },
  {
    id: "by-belapan",
    src: "tmp/logo-harvest/by/belapan.svg",
    explainer:
      "Official masthead/brand mark for BelaPAN, sourced from the publisher's official site and visually verified.",
    licence:
      "BelaPAN brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "bo-abi",
    src: "tmp/logo-harvest/bo/abi.png",
    explainer:
      "Official masthead/brand mark for ABI, sourced from the publisher's official site and visually verified.",
    licence:
      "ABI brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ba-fena",
    src: "tmp/logo-harvest/ba/fena.png",
    explainer:
      "Official masthead/brand mark for FENA, sourced from the publisher's official site and visually verified.",
    licence:
      "FENA brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ba-srna",
    src: "tmp/logo-harvest/ba/srna.svg",
    explainer:
      "Official masthead/brand mark for SRNA, sourced from the publisher's official site and visually verified.",
    licence:
      "SRNA brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "bw-bopa",
    src: "tmp/logo-harvest/bw/bopa.svg",
    explainer:
      "Official masthead/brand mark for BOPA, sourced from Wikimedia Commons and visually verified.",
    licence:
      "BOPA brand mark trademark bundled from Wikimedia Commons (File:BOPA logo.svg) for educational reference in Learn mode.",
  },
  {
    id: "bf-aib",
    src: "tmp/logo-harvest/bf/aib.png",
    explainer:
      "Official masthead/brand mark for Agence d'Information du Burkina, sourced from the publisher's official site and visually verified.",
    licence:
      "Agence d'Information du Burkina brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "cf-le-potentiel-centrafricain",
    src: "tmp/logo-harvest/cf/le-potentiel-centrafricain.png",
    explainer:
      "Official masthead/brand mark for Le Potentiel Centrafricain, sourced from the publisher's official site and visually verified.",
    licence:
      "Le Potentiel Centrafricain brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "cg-la-semaine-africaine",
    src: "tmp/logo-harvest/cg/la-semaine-africaine.jpg",
    explainer:
      "Official masthead/brand mark for La Semaine Africaine, sourced from the publisher's official site and visually verified.",
    licence:
      "La Semaine Africaine brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "cr-elfaro-cr",
    src: "tmp/logo-harvest/cr/elfaro-cr.svg",
    explainer:
      "Official masthead/brand mark for El Faro Costa Rica, sourced from the publisher's official site and visually verified.",
    licence:
      "El Faro Costa Rica brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "cu-prensa-latina",
    src: "tmp/logo-harvest/cu/prensa-latina.png",
    explainer:
      "Official masthead/brand mark for Prensa Latina, sourced from Wikimedia Commons and visually verified.",
    licence:
      "Prensa Latina brand mark trademark bundled from Wikimedia Commons (File:LOGO PRENSA LATINA.png) for educational reference in Learn mode.",
  },
  {
    id: "iq-nina",
    src: "tmp/logo-harvest/iq/nina.png",
    explainer:
      "Official masthead/brand mark for NINA, sourced from the publisher's official site and visually verified.",
    licence:
      "NINA brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ci-aip",
    src: "tmp/logo-harvest/ci/aip.png",
    explainer:
      "Official masthead/brand mark for AIP, sourced from Wikimedia Commons and visually verified.",
    licence:
      "AIP brand mark trademark bundled from Wikimedia Commons (File:AIP Logo.png) for educational reference in Learn mode.",
  },
  {
    id: "kz-egemen-qazaqstan",
    src: "tmp/logo-harvest/kz/egemen-qazaqstan.jpg",
    explainer:
      "Official masthead/brand mark for Egemen Qazaqstan, sourced from Wikimedia Commons and visually verified.",
    licence:
      "Egemen Qazaqstan brand mark trademark bundled from Wikimedia Commons (File:Logo Egemen Qazaqstan.jpg) for educational reference in Learn mode.",
  },
  {
    id: "kz-kazakhstanskaya-pravda",
    src: "tmp/logo-harvest/kz/kazakhstanskaya-pravda.png",
    explainer:
      "Official masthead/brand mark for Kazakhstanskaya Pravda, sourced from the publisher's official site and visually verified.",
    licence:
      "Kazakhstanskaya Pravda brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ec-lideres",
    src: "tmp/logo-harvest/ec/lideres.png",
    explainer:
      "Official masthead/brand mark for Revista L\u00edderes, sourced from the publisher's official site and visually verified.",
    licence:
      "Revista L\u00edderes brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ls-lena",
    src: "tmp/logo-harvest/ls/lena.jpg",
    explainer:
      "Official masthead/brand mark for LENA, sourced from the publisher's official site and visually verified.",
    licence:
      "LENA brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ly-lana",
    src: "tmp/logo-harvest/ly/lana.png",
    explainer:
      "Official masthead/brand mark for LANA, sourced from the publisher's official site and visually verified.",
    licence:
      "LANA brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ga-agp",
    src: "tmp/logo-harvest/ga/agp.png",
    explainer:
      "Official masthead/brand mark for AGP, sourced from the publisher's official site and visually verified.",
    licence:
      "AGP brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "li-wirtschaft-regional",
    src: "tmp/logo-harvest/li/wirtschaft-regional.svg",
    explainer:
      "Official masthead/brand mark for Wirtschaft regional, sourced from the publisher's official site and visually verified.",
    licence:
      "Wirtschaft regional brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "mr-ami",
    src: "tmp/logo-harvest/mr/ami.png",
    explainer:
      "Official masthead/brand mark for AMI (Agence Mauritanienne d'Information), sourced from the publisher's official site and visually verified.",
    licence:
      "AMI (Agence Mauritanienne d'Information) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "md-moldpres",
    src: "tmp/logo-harvest/md/moldpres.png",
    explainer:
      "Official masthead/brand mark for Moldpres, sourced from the publisher's official site and visually verified.",
    licence:
      "Moldpres brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "mm-myanmar-now",
    src: "tmp/logo-harvest/mm/myanmar-now.png",
    explainer:
      "Official masthead/brand mark for Myanmar Now, sourced from Wikimedia Commons and visually verified.",
    licence:
      "Myanmar Now brand mark trademark bundled from Wikimedia Commons (File:Myanmar Now Logo.png) for educational reference in Learn mode.",
  },
  {
    id: "na-nampa",
    src: "tmp/logo-harvest/na/nampa.png",
    explainer:
      "Official masthead/brand mark for NAMPA (Namibia Press Agency), sourced from the publisher's official site and visually verified.",
    licence:
      "NAMPA (Namibia Press Agency) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ne-anp",
    src: "tmp/logo-harvest/ne/anp.png",
    explainer:
      "Official masthead/brand mark for ANP (Agence Nig\u00e9rienne de Presse), sourced from the publisher's official site and visually verified.",
    licence:
      "ANP (Agence Nig\u00e9rienne de Presse) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "mk-mia",
    src: "tmp/logo-harvest/mk/mia.png",
    explainer:
      "Official masthead/brand mark for MIA (Media Information Agency), sourced from the publisher's official site and visually verified.",
    licence:
      "MIA (Media Information Agency) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "py-ipparaguay",
    src: "tmp/logo-harvest/py/ipparaguay.png",
    explainer:
      "Official masthead/brand mark for Agencia IP (Informaci\u00f3n P\u00fablica), sourced from the publisher's official site and visually verified.",
    licence:
      "Agencia IP (Informaci\u00f3n P\u00fablica) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "rw-rna",
    src: "tmp/logo-harvest/rw/rna.png",
    explainer:
      "Official masthead/brand mark for Rwanda News Agency (RNA), sourced from the publisher's official site and visually verified.",
    licence:
      "Rwanda News Agency (RNA) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "kn-sknis",
    src: "tmp/logo-harvest/kn/sknis.png",
    explainer:
      "Official masthead/brand mark for SKNIS (St. Kitts and Nevis Information Service), sourced from the publisher's official site and visually verified.",
    licence:
      "SKNIS (St. Kitts and Nevis Information Service) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "lc-the-star",
    src: "tmp/logo-harvest/lc/the-star.png",
    explainer:
      "Official masthead/brand mark for The Star, sourced from the publisher's official site and visually verified.",
    licence:
      "The Star brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "st-stp-press",
    src: "tmp/logo-harvest/st/stp-press.jpg",
    explainer:
      "Official masthead/brand mark for STP-Press, sourced from the publisher's official site and visually verified.",
    licence:
      "STP-Press brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "sc-sna",
    src: "tmp/logo-harvest/sc/sna.png",
    explainer:
      "Official masthead/brand mark for SNA (Seychelles News Agency), sourced from Wikimedia Commons and visually verified.",
    licence:
      "SNA (Seychelles News Agency) brand mark trademark bundled from Wikimedia Commons (File:Seychelles News Agency logo.png) for educational reference in Learn mode.",
  },
  {
    id: "sl-slena",
    src: "tmp/logo-harvest/sl/slena.png",
    explainer:
      "Official masthead/brand mark for SLENA (Sierra Leone News Agency), sourced from the publisher's official site and visually verified.",
    licence:
      "SLENA (Sierra Leone News Agency) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "so-sonna",
    src: "tmp/logo-harvest/so/sonna.png",
    explainer:
      "Official masthead/brand mark for SONNA (Somali National News Agency), sourced from the publisher's official site and visually verified.",
    licence:
      "SONNA (Somali National News Agency) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "sy-sana",
    src: "tmp/logo-harvest/sy/sana.svg",
    explainer:
      "Official masthead/brand mark for SANA (Syrian Arab News Agency), sourced from the publisher's official site and visually verified.",
    licence:
      "SANA (Syrian Arab News Agency) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "tj-khovar",
    src: "tmp/logo-harvest/tj/khovar.png",
    explainer:
      "Official masthead/brand mark for Khovar (NIAT Khovar), sourced from the publisher's official site and visually verified.",
    licence:
      "Khovar (NIAT Khovar) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "tm-tdh",
    src: "tmp/logo-harvest/tm/tdh.png",
    explainer:
      "Official masthead/brand mark for TDH (State News Agency of Turkmenistan), sourced from the publisher's official site and visually verified.",
    licence:
      "TDH (State News Agency of Turkmenistan) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "tm-neytralny-turkmenistan",
    src: "tmp/logo-harvest/tm/neytralny-turkmenistan.png",
    explainer:
      "Official masthead/brand mark for Neytralny Turkmenistan, sourced from the publisher's official site and visually verified.",
    licence:
      "Neytralny Turkmenistan brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ve-efecto-cocuyo",
    src: "tmp/logo-harvest/ve/efecto-cocuyo.jpg",
    explainer:
      "Official masthead/brand mark for Efecto Cocuyo, sourced from the publisher's official site and visually verified.",
    licence:
      "Efecto Cocuyo brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ve-avn",
    src: "tmp/logo-harvest/ve/avn.png",
    explainer:
      "Official masthead/brand mark for AVN (Agencia Venezolana de Noticias), sourced from the publisher's official site and visually verified.",
    licence:
      "AVN (Agencia Venezolana de Noticias) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ye-saba",
    src: "tmp/logo-harvest/ye/saba.png",
    explainer:
      "Official masthead/brand mark for SABA (Yemen News Agency), sourced from the publisher's official site and visually verified.",
    licence:
      "SABA (Yemen News Agency) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
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
