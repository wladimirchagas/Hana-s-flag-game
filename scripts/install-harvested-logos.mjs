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
  // UAE newspapers
  {
    id: "ae-the-national",
    src: "tmp/logo-harvest/ae/the-national.svg",
    explainer:
      "Two-tone 'TheNational' wordmark with underline — the English-language UAE daily's digital masthead.",
    licence:
      "The National (UAE) masthead trademark bundled from Wikimedia Commons (File:Logo The National-svg.svg) for educational reference in Learn mode.",
  },
  {
    id: "ae-gulf-news",
    src: "tmp/logo-harvest/ae/gulf-news.webp",
    explainer:
      "Black circular emblem with a falcon silhouette above stacked 'GULF NEWS' capitals — the Dubai daily's brand mark from its own site.",
    licence:
      "Gulf News masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ae-al-ittihad",
    src: "tmp/logo-harvest/ae/al-ittihad.svg",
    explainer:
      "Arabic calligraphy title with an 'ALETIHAD NEWS CENTER' English strap — Al-Ittihad's official masthead from its site.",
    licence:
      "Al-Ittihad masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "ae-khaleej-times",
    src: "tmp/logo-harvest/ae/khaleej-times.svg",
    explainer:
      "Blackletter 'Khaleej Times' masthead — the Dubai English-language daily's traditional nameplate from its own site.",
    licence:
      "Khaleej Times masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  // Argentina
  {
    id: "ar-clarin",
    src: "tmp/logo-harvest/ar/clarin.svg",
    explainer:
      "Red 'Clarín' wordmark beside a circular bugle emblem — Argentina's mass-circulation daily masthead.",
    licence:
      "Clarín masthead trademark bundled from Wikimedia Commons (File:Clarín logo.svg) for educational reference in Learn mode.",
  },
  {
    id: "ar-la-nacion",
    src: "tmp/logo-manual/ar-la-nacion.svg",
    explainer:
      "Blue serif capitals 'LA NACION' — La Nación's contemporary digital wordmark.",
    licence:
      "La Nación masthead trademark bundled from Wikimedia Commons (File:Logo La Nación.svg) for educational reference in Learn mode.",
  },
  {
    id: "ar-pagina-12",
    src: "tmp/logo-harvest/ar/pagina-12.svg",
    explainer:
      "Serif 'Página|12' masthead with a vertical bar separating the numeral — the Buenos Aires daily's nameplate.",
    licence:
      "Página/12 masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  // Spain
  {
    id: "es-el-pais",
    src: "tmp/logo-harvest/es/el-pais.svg",
    explainer:
      "Serif 'EL PAÍS' with a blue triangular accent — Spain's leading daily masthead.",
    licence:
      "El País masthead trademark bundled from Wikimedia Commons (File:El País logo.svg) for educational reference in Learn mode.",
  },
  {
    id: "es-el-mundo",
    src: "tmp/logo-manual/es-el-mundo-periodico.svg",
    explainer:
      "Black 'EL MUNDO' wordmark with an oversized red capital M — the Spanish daily's distinctive masthead.",
    licence:
      "El Mundo masthead trademark bundled from Wikimedia Commons (File:Periodico El Mundo.svg) for educational reference in Learn mode.",
  },
  {
    id: "es-abc",
    src: "tmp/logo-harvest/es/abc.jpg",
    explainer:
      "Classic black serif capitals 'ABC' — the Madrid daily's historic three-letter masthead.",
    licence:
      "ABC (Spain) masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "es-la-vanguardia",
    src: "tmp/logo-manual/es-la-vanguardia.svg",
    explainer:
      "White serif 'LA VANGUARDIA' on a navy banner — Barcelona's newspaper of record masthead.",
    licence:
      "La Vanguardia masthead trademark bundled from Wikimedia Commons (File:La Vanguardia (cabecera).svg) for educational reference in Learn mode.",
  },
  // Italy
  {
    id: "it-corriere-della-sera",
    src: "tmp/logo-harvest/it/corriere-della-sera.svg",
    explainer:
      "Italic serif 'CORRIERE DELLA SERA' — Milan's historic daily masthead from its own site.",
    licence:
      "Corriere della Sera masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "it-la-repubblica",
    src: "tmp/logo-harvest/it/la-repubblica.png",
    explainer:
      "Black serif 'la Repubblica' wordmark — the Rome daily's familiar lowercase-plus-capital masthead.",
    licence:
      "la Repubblica masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "it-il-sole-24-ore",
    src: "tmp/logo-manual/it-il-sole-24-ore.svg",
    explainer:
      "'Il Sole' beside a shadowed white '24 ORE' block — Italy's financial daily masthead.",
    licence:
      "Il Sole 24 Ore masthead trademark bundled from Wikimedia Commons (File:Il Sole 24 Ore.svg) for educational reference in Learn mode.",
  },
  {
    id: "it-il-messaggero",
    src: "tmp/logo-manual/it-il-messaggero.svg",
    explainer:
      "Blackletter 'Il Messaggero' masthead — the Rome daily's traditional nameplate.",
    licence:
      "Il Messaggero masthead trademark bundled from Wikimedia Commons (File:Il Messaggero.svg) for educational reference in Learn mode.",
  },
  // Japan
  {
    id: "jp-yomiuri-shimbun",
    src: "tmp/logo-harvest/jp/yomiuri-shimbun.png",
    explainer:
      "Kanji '讀賣新聞' with a YOL Online lockup — the Yomiuri Shimbun's brand mark from its own site.",
    licence:
      "Yomiuri Shimbun masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "jp-asahi-shimbun",
    src: "tmp/logo-harvest/jp/asahi-shimbun.svg",
    explainer:
      "Mincho-style kanji '朝日新聞' wordmark — the Asahi Shimbun's classic masthead from its own site.",
    licence:
      "Asahi Shimbun masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "jp-nikkei",
    src: "tmp/logo-harvest/jp/nikkei.png",
    explainer:
      "Brush-style kanji '日本經濟新聞' masthead — the Nikkei's traditional calligraphic nameplate.",
    licence:
      "Nikkei masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "jp-japan-times",
    src: "tmp/logo-harvest/jp/japan-times.svg",
    explainer:
      "Lowercase 'the japan times' with a red dotted j — the English-language Tokyo daily's wordmark.",
    licence:
      "The Japan Times masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  // Mexico
  {
    id: "mx-el-universal",
    src: "tmp/logo-harvest/mx/el-universal.svg",
    explainer:
      "Burgundy serif 'EL UNIVERSAL' — Mexico City's historic daily masthead.",
    licence:
      "El Universal masthead trademark bundled from Wikimedia Commons (File:Logo El Universal 2021.svg) for educational reference in Learn mode.",
  },
  {
    id: "mx-reforma",
    src: "tmp/logo-manual/mx-reforma.png",
    explainer:
      "White slab-serif 'REFORMA' on a green bar — the Mexico City daily's brand masthead.",
    licence:
      "Reforma masthead trademark bundled from Wikimedia Commons (File:Logo REFORMA (México).png) for educational reference in Learn mode.",
  },
  {
    id: "mx-la-jornada",
    src: "tmp/logo-harvest/mx/la-jornada.webp",
    explainer:
      "Joined 'LaJornada' wordmark — Mexico City's left-leaning daily masthead from its own site.",
    licence:
      "La Jornada masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "mx-el-financiero",
    src: "tmp/logo-manual/mx-el-financiero.svg",
    explainer:
      "Dark-blue 'EL FINANCIERO' with a globe device — Mexico's financial daily masthead.",
    licence:
      "El Financiero masthead trademark bundled from Wikimedia Commons (File:El Financiero Logo.svg) for educational reference in Learn mode.",
  },
  // Netherlands
  {
    id: "nl-de-telegraaf",
    src: "tmp/logo-harvest/nl/de-telegraaf-alt1.svg",
    explainer:
      "Blackletter 'De Telegraaf' masthead — the Amsterdam mass-circulation daily's traditional nameplate.",
    licence:
      "De Telegraaf masthead trademark bundled from Wikimedia Commons (File:Telegraaf.svg) for educational reference in Learn mode.",
  },
  {
    id: "nl-de-volkskrant",
    src: "tmp/logo-manual/nl-de-volkskrant.svg",
    explainer:
      "Black serif 'deVolkskrant' joined wordmark — the Amsterdam quality daily's masthead.",
    licence:
      "De Volkskrant masthead trademark bundled from Wikimedia Commons (File:Volkskrant.svg) for educational reference in Learn mode.",
  },
  {
    id: "nl-nrc",
    src: "tmp/logo-manual/nl-nrc.svg",
    explainer:
      "Bold lowercase 'nrc' with a red chevron and 'handelsblad' strap — NRC's brand lockup.",
    licence:
      "NRC Handelsblad masthead trademark bundled from Wikimedia Commons (File:NRC Handelsblad logo.svg) for educational reference in Learn mode.",
  },
  // Norway
  {
    id: "no-aftenposten",
    src: "tmp/logo-manual/no-aftenposten.svg",
    explainer:
      "Blackletter 'Aftenposten' masthead — Oslo's newspaper of record nameplate.",
    licence:
      "Aftenposten masthead trademark bundled from Wikimedia Commons (File:Aftenposten logo.svg) for educational reference in Learn mode.",
  },
  {
    id: "no-dagbladet",
    src: "tmp/logo-manual/no-dagbladet.svg",
    explainer:
      "White 'Dagbladet' on a red bar — the Oslo tabloid's brand masthead.",
    licence:
      "Dagbladet masthead trademark bundled from Wikimedia Commons (File:Dagbladet logo.svg) for educational reference in Learn mode.",
  },
  {
    id: "no-vg",
    src: "tmp/logo-harvest/no/vg.png",
    explainer:
      "White 'VG' capitals on a red block — Verdens Gang's iconic two-letter brand mark.",
    licence:
      "VG masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  // New Zealand
  {
    id: "nz-the-new-zealand-herald",
    src: "tmp/logo-harvest/nz/the-new-zealand-herald.svg",
    explainer:
      "Ornate blackletter 'H' lettermark — the New Zealand Herald's historic monogram masthead.",
    licence:
      "The New Zealand Herald masthead trademark bundled from Wikimedia Commons (File:The New Zealand Herald logo.svg) for educational reference in Learn mode.",
  },
  {
    id: "nz-stuff",
    src: "tmp/logo-manual/nz-stuff.svg",
    explainer:
      "Lowercase 'stuff' wordmark with a multicolour underline — Stuff.co.nz's digital brand mark.",
    licence:
      "Stuff.co.nz masthead trademark bundled from Wikimedia Commons (File:Stuff.co.nz logo.svg) for educational reference in Learn mode.",
  },
  {
    id: "nz-otago-daily-times",
    src: "tmp/logo-harvest/nz/otago-daily-times.png",
    explainer:
      "White 'ODT' initials over '.co.nz' on a navy square — the Otago Daily Times digital brand mark.",
    licence:
      "Otago Daily Times masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  // Poland
  {
    id: "pl-wyborcza",
    src: "tmp/logo-harvest/pl/wyborcza.svg",
    explainer:
      "'wyborcza.pl' wordmark — Gazeta Wyborcza's digital masthead from its own site.",
    licence:
      "Gazeta Wyborcza masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "pl-rzeczpospolita",
    src: "tmp/logo-harvest/pl/rzeczpospolita.svg",
    explainer:
      "Polish eagle emblem beside 'RZECZPOSPOLITA' capitals — the Warsaw daily's masthead.",
    licence:
      "Rzeczpospolita masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "pl-dgp",
    src: "tmp/logo-harvest/pl/dgp.jpg",
    explainer:
      "'DZIENNIK GAZETA PRAWNA' with a blue globe device — Poland's legal/business daily masthead.",
    licence:
      "Dziennik Gazeta Prawna masthead trademark bundled from Wikimedia Commons (File:Dziennik Gazeta Prawna.jpg) for educational reference in Learn mode.",
  },
  {
    id: "pl-fakt",
    src: "tmp/logo-harvest/pl/fakt.svg",
    explainer:
      "White 'Fakt' wordmark on a red field — Poland's mass-circulation tabloid masthead.",
    licence:
      "Fakt masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  // Agencies / extras filed under agency dataset
  {
    id: "ar-telam",
    src: "tmp/logo-harvest/ar/telam.svg",
    explainer:
      "Lowercase 'télam' with signal-arc marks — Argentina's national news agency emblem.",
    licence:
      "Télam logo trademark bundled from Wikimedia Commons (File:Télam-logo-2021.svg) for educational reference in Learn mode.",
  },
  {
    id: "ar-el-cronista",
    src: "tmp/logo-harvest/ar/el-cronista.png",
    explainer:
      "Teal 'C' disc beside 'El Cronista' — Argentina's business daily brand mark from its own site.",
    licence:
      "El Cronista masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "it-la-stampa",
    src: "tmp/logo-harvest/it/la-stampa.png",
    explainer:
      "Bold slab-serif 'LA STAMPA' capitals — the Turin daily's masthead.",
    licence:
      "La Stampa masthead trademark bundled from the publisher's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "jp-mainichi-shimbun",
    src: "tmp/logo-manual/jp-mainichi.svg",
    explainer:
      "Kanji '毎日新聞' flanked by blue star and eye emblems — the Mainichi Shimbun's full brand lockup.",
    licence:
      "Mainichi Shimbun masthead trademark bundled from Wikimedia Commons (File:Mainichi Shimbun logo.svg) for educational reference in Learn mode.",
  },
  {
    id: "nl-anp",
    src: "tmp/logo-harvest/nl/anp.jpg",
    explainer:
      "White '.ANP' on a blue field — the Algemeen Nederlands Persbureau agency mark.",
    licence:
      "ANP logo trademark bundled from the agency's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "no-ntb",
    src: "tmp/logo-harvest/no/ntb.svg",
    explainer:
      "Orange geometric letterforms spelling NTB — the Norwegian News Agency brand mark.",
    licence:
      "NTB logo trademark bundled from the agency's official site brand assets for educational reference in Learn mode.",
  },
  {
    id: "es-agencia-efe",
    src: "tmp/logo-harvest/es/agencia-efe-alt1.svg",
    explainer:
      "Navy 'EFE:' wordmark — Spain's international news agency brand mark.",
    licence:
      "Agencia EFE logo trademark bundled from Wikimedia Commons (File:Logotipo Agencia EFE 2022.svg) for educational reference in Learn mode.",
  },
  {
    id: "ae-wam",
    src: "tmp/logo-harvest/ae/wam.png",
    explainer:
      "Bilingual Arabic/English 'WAM' wordmark with a dotted globe — the Emirates News Agency emblem.",
    licence:
      "WAM (Emirates News Agency) logo trademark bundled from the agency's official site brand assets for educational reference in Learn mode.",
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
    if (papers.includes(`"id": "${row.id}"`)) {
      papers = patchEntry(papers, row.id, fields);
    } else if (agencies.includes(`"id": "${row.id}"`)) {
      agencies = patchEntry(agencies, row.id, fields);
    } else {
      throw new Error(`id ${row.id} not in papers or agencies`);
    }
    installed++;
  }
  writeFileSync(resolve(ROOT, "src/data/nationalNewspapers.ts"), papers);
  writeFileSync(resolve(ROOT, "src/data/nationalNewsAgencies.ts"), agencies);
  console.log(`\nInstalled ${installed} logos.`);
}

main();
