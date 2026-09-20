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
    id: "ad-el-periodic",
    src: "tmp/logo-harvest/ad/el-periodic.png",
    explainer:
      "White 'el Peri\u00f2dic' wordmark with three slanted bars \u2014 Andorra's Catalan daily masthead from its own site.",
    licence:
      "El Peri\u00f2dic d'Andorra masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "af-pajhwok",
    src: "tmp/logo-harvest/af/pajhwok.png",
    explainer:
      "White 'PAJHWOK AFGHAN NEWS' wordmark with calligraphic mark and 'Reflecting the Truth' strap \u2014 the agency's official masthead.",
    licence:
      "Pajhwok Afghan News masthead trademark bundled from the agency's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "am-hetq",
    src: "tmp/logo-harvest/am/hetq.png",
    explainer:
      "Grey 'HETQ' wordmark beside a concentric-oval investigative mark \u2014 Armenia's investigative outlet masthead.",
    licence:
      "Hetq masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "cz-hospodarske-noviny",
    src: "tmp/logo-harvest/cz/hospodarske-noviny.svg",
    explainer:
      "White small-caps serif 'HOSPOD\u00c1\u0158SK\u00c9 NOVINY' wordmark \u2014 the Czech business daily's masthead.",
    licence:
      "Hospod\u00e1\u0159sk\u00e9 noviny masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ec-expreso",
    src: "tmp/logo-harvest/ec/expreso.png",
    explainer:
      "Blue lowercase 'expreso' wordmark with a thin red underline \u2014 Ecuador's Expreso daily masthead.",
    licence:
      "Expreso (Ecuador) masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "cv-expressodasilhas",
    src: "tmp/logo-harvest/cv/expressodasilhas.png",
    explainer:
      "White conjoined 'iE' mark \u2014 Expresso das Ilhas (Cape Verde) brand emblem from its own site.",
    licence:
      "Expresso das Ilhas masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "gq-guineaecuatorialpress",
    src: "tmp/logo-harvest/gq/guineaecuatorialpress.png",
    explainer:
      "Equatorial Guinea coat of arms beside 'GUINEA ECUATORIAL' government press portal wordmark.",
    licence:
      "Guinea Ecuatorial Press portal mark bundled from the official government press site brand assets for educational reference in Learn mode.",
  },
  {
    id: "hn-la-tribuna",
    src: "tmp/logo-harvest/hn/la-tribuna.jpg",
    explainer:
      "Blackletter 'LA TRIBUNA' nameplate with 'Decano de la Prensa Nacional' strap \u2014 Honduras daily masthead.",
    licence:
      "La Tribuna (Honduras) masthead trademark bundled from Wikimedia Commons (File:Logo La Tribuna.jpg) for educational reference in Learn mode.",
  },
  {
    id: "ht-le-nouvelliste",
    src: "tmp/logo-harvest/ht/le-nouvelliste.svg",
    explainer:
      "White blackletter 'Le Nouvelliste' masthead \u2014 Haiti's historic daily nameplate from its own site.",
    licence:
      "Le Nouvelliste masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "iq-rudaw",
    src: "tmp/logo-harvest/iq/rudaw.svg",
    explainer:
      "White sunburst mark beside bold 'R\u00dbDAW' wordmark \u2014 Kurdistan's Rudaw Media Network brand.",
    licence:
      "Rudaw masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "iq-shafaq-news",
    src: "tmp/logo-harvest/iq/shafaq-news.png",
    explainer:
      "White Arabic title with 'NEWS' and red accent bars \u2014 Shafaq News masthead from its own site.",
    licence:
      "Shafaq News masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "kh-koh-santepheap",
    src: "tmp/logo-harvest/kh/koh-santepheap.svg",
    explainer:
      "White Khmer-script masthead for Koh Santepheap Daily from its own site.",
    licence:
      "Koh Santepheap masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "km-comores-infos",
    src: "tmp/logo-harvest/km/comores-infos.png",
    explainer:
      "Serif 'Comores-infos' wordmark with four coloured dots \u2014 Comorian news portal masthead.",
    licence:
      "Comores-Infos masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "km-habari-za-comores",
    src: "tmp/logo-harvest/km/habari-za-comores.png",
    explainer:
      "Serif 'HABARI ZA COMORES' wordmark with red/blue swoosh \u2014 Comorian news portal masthead.",
    licence:
      "Habari Za Comores masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "km-al-watwan",
    src: "tmp/logo-harvest/km/al-watwan.png",
    explainer:
      "Green italic 'Al-watwan' wordmark \u2014 Comoros national daily masthead from Wikimedia Commons.",
    licence:
      "Al-Watwan masthead trademark bundled from Wikimedia Commons (File:Al-Watwan Logo.png) for educational reference in Learn mode.",
  },
  {
    id: "kn-ziz-online",
    src: "tmp/logo-harvest/kn/ziz-online.jpg",
    explainer:
      "Yellow outlined block capitals 'ZIZ' \u2014 Saint Kitts and Nevis broadcaster news brand mark.",
    licence:
      "ZIZ Online brand mark trademark bundled from the broadcaster's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "kw-al-anba",
    src: "tmp/logo-harvest/kw/al-anba.png",
    explainer:
      "White Arabic calligraphic masthead for Kuwait's Al-Anba daily from its own site.",
    licence:
      "Al-Anba masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "kw-al-rai",
    src: "tmp/logo-harvest/kw/al-rai.svg",
    explainer:
      "White Arabic calligraphic masthead for Kuwait's Al-Rai daily from its own site.",
    licence:
      "Al-Rai (Kuwait) masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "kz-azattyq",
    src: "tmp/logo-harvest/kz/azattyq.png",
    explainer:
      "Orange RFE/RL torch with blue Cyrillic '\u0410\u0437\u0430\u0442\u0442\u044b\u049b \u0420\u0430\u0434\u0438\u043e\u0441\u044b' \u2014 Azattyq's official brand mark.",
    licence:
      "Azattyq (RFE/RL) brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "la-kpl",
    src: "tmp/logo-harvest/la/kpl.png",
    explainer:
      "Circular KPL Lao News Agency emblem with Lao wordmark \u2014 the state news agency crest.",
    licence:
      "KPL Lao News Agency crest trademark bundled from the agency's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "lc-the-voice",
    src: "tmp/logo-harvest/lc/the-voice.png",
    explainer:
      "'VP Digital' badge beside outlined 'THE VOICE' wordmark \u2014 St Lucia Voice newspaper digital masthead.",
    licence:
      "The Voice (St Lucia) masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "lk-virakesari",
    src: "tmp/logo-harvest/lk/virakesari.jpg",
    explainer:
      "Tamil/English 'VIRAKESARI ONLINE' anniversary masthead with trophies \u2014 Sri Lanka Tamil daily brand.",
    licence:
      "Virakesari masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "lr-daily-observer",
    src: "tmp/logo-harvest/lr/daily-observer.png",
    explainer:
      "Black serif 'Daily OBSERVER' nameplate with rule lines \u2014 Liberia's Daily Observer masthead.",
    licence:
      "Daily Observer masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "lr-frontpage-africa",
    src: "tmp/logo-harvest/lr/frontpage-africa.png",
    explainer:
      "Orange Africa map with 'FPA' and 'FRONT PAGE AFRICA' wordmark \u2014 Liberian daily brand mark.",
    licence:
      "FrontPageAfrica masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "lr-the-analyst",
    src: "tmp/logo-harvest/lr/the-analyst.webp",
    explainer:
      "Blue banner 'The ANALYST' with anniversary seal \u2014 Liberia's The Analyst masthead.",
    licence:
      "The Analyst masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ls-public-eye",
    src: "tmp/logo-harvest/ls/public-eye.png",
    explainer:
      "Blue 'Public Eye' wordmark with eye-dot on the i \u2014 Lesotho weekly masthead.",
    licence:
      "Public Eye masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "lt-lrt-news",
    src: "tmp/logo-harvest/lt/lrt-news.jpg",
    explainer:
      "Dark blue 'LRT | .lt' wordmark \u2014 Lithuanian public broadcaster news portal brand.",
    licence:
      "LRT.lt brand mark trademark bundled from the broadcaster's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "lt-lrytas",
    src: "tmp/logo-harvest/lt/lrytas.jpg",
    explainer:
      "White 'lrytas.lt' serif wordmark on a red rounded rectangle \u2014 Lietuvos rytas digital brand.",
    licence:
      "Lrytas.lt masthead trademark bundled from Wikimedia Commons (File:Lrytas.lt logotipas.jpg) for educational reference in Learn mode.",
  },
  {
    id: "lv-latvijas-avize",
    src: "tmp/logo-harvest/lv/latvijas-avize.svg",
    explainer:
      "White 'LA.LV' wordmark \u2014 Latvijas Av\u012bze digital masthead from its own site.",
    licence:
      "Latvijas Av\u012bze (LA.LV) masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "lv-tvnet",
    src: "tmp/logo-harvest/lv/tvnet.png",
    explainer:
      "Blue/orange 'TVNET' wordmark with star mark \u2014 Latvia's Tvnet.lv news portal brand.",
    licence:
      "Tvnet.lv brand mark trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
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
