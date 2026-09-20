#!/usr/bin/env node
/**
 * Install visually-verified logos for newly added national news agencies.
 * Only MANIFEST entries are touched. Never invents images.
 *
 * Rejected after montage scan (kept as noImageReason):
 *   - sm-smna: harvested asset is San Marino RTV, not SMNA
 *   - ua-ukrainian-news: site 403 / no freely-citable emblem found
 */
import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const L = (name, detail) =>
  `${name} brand mark trademark bundled from ${detail} for educational reference in Learn mode.`;

/** Visually verified — montage-scanned 2026-09-20. */
const MANIFEST = [
  {
    id: "bd-unb",
    src: "tmp/logo-harvest/bd/unb.png",
    explainer:
      "Red field with bold white 'UNB' above a black bar reading 'UNITED NEWS OF BANGLADESH' — United News of Bangladesh masthead.",
    licence: L("United News of Bangladesh", "the agency's official site brand assets (unb.com.bd)"),
  },
  {
    id: "br-agencia-estado",
    src: "tmp/logo-harvest/br/agencia-estado.png",
    explainer:
      "Agência Estado wordmark / emblem as published on Wikimedia Commons — Brazilian national wire brand mark.",
    licence: L("Agência Estado", "Wikimedia Commons (File:Logo Agência Estado.png)"),
  },
  {
    id: "ca-canadian-press",
    src: "tmp/logo-harvest/ca/canadian-press.svg",
    explainer:
      "The Canadian Press wordmark from thecanadianpress.com — national Canadian newswire brand.",
    licence: L("The Canadian Press", "the agency's official site brand assets (thecanadianpress.com)"),
  },
  {
    id: "cn-xinhua",
    src: "tmp/logo-harvest/cn/xinhua.png",
    explainer:
      "Xinhua News Agency site masthead mark from news.cn — China's state national news agency brand.",
    licence: L("Xinhua News Agency", "the agency's official site brand assets (news.cn / xinhuanet.com)"),
  },
  {
    id: "cn-cns",
    src: "tmp/logo-harvest/manual/cn-cns.png",
    explainer:
      "Red italic 'Ecns.cn' with flame flourish and grey 中新网 — China News Service English portal brand mark.",
    licence: L("China News Service / ECNS", "the agency's English portal brand assets (ecns.cn / chinanews.com.cn)"),
  },
  {
    id: "de-dpa",
    src: "tmp/logo-harvest/de/dpa.png",
    explainer: "dpa Deutsche Presse-Agentur brand mark from the agency's official site.",
    licence: L("dpa", "the agency's official site brand assets (dpa.com)"),
  },
  {
    id: "de-epd",
    src: "tmp/logo-harvest/de/epd.svg",
    explainer: "epd Evangelischer Pressedienst wordmark from the Protestant press service site.",
    licence: L("epd", "the agency's official site brand assets"),
  },
  {
    id: "de-sid",
    src: "tmp/logo-harvest/de/sid.png",
    explainer: "SID Sport-Informations-Dienst brand mark from the German sports wire site.",
    licence: L("SID", "the agency's official site brand assets"),
  },
  {
    id: "es-europa-press",
    src: "tmp/logo-harvest/es/europa-press.svg",
    explainer: "Europa Press wordmark from the Spanish national wire's official site.",
    licence: L("Europa Press", "the agency's official site brand assets"),
  },
  {
    id: "es-acn",
    src: "tmp/logo-harvest/manual/es-acn.svg",
    explainer:
      "Burgundy 'ACN' wordmark — Agència Catalana de Notícies / Catalan News Agency brand from Wikimedia Commons.",
    licence: L("Agència Catalana de Notícies", "Wikimedia Commons (Catalan News Agency logo.svg)"),
  },
  {
    id: "gb-pa-media",
    src: "tmp/logo-harvest/gb/pa-media.svg",
    explainer: "PA Media wordmark from the UK national wire's official brand assets.",
    licence: L("PA Media", "the agency's official site brand assets"),
  },
  {
    id: "id-antara",
    src: "tmp/logo-harvest/id/antara.webp",
    explainer: "Antara brand mark from Indonesia's national news agency site.",
    licence: L("Antara", "the agency's official site brand assets (antaranews.com)"),
  },
  {
    id: "id-kbr",
    src: "tmp/logo-harvest/id/kbr.svg",
    explainer: "KBR (Kantor Berita Radio) logo from Wikimedia Commons.",
    licence: L("KBR", "Wikimedia Commons (File:KBR Logo.svg)"),
  },
  {
    id: "in-pti",
    src: "tmp/logo-harvest/in/pti.jpg",
    explainer: "Press Trust of India brand mark from the agency's official site metadata.",
    licence: L("Press Trust of India", "the agency's official site brand assets (ptinews.com)"),
  },
  {
    id: "in-uni",
    src: "tmp/logo-harvest/in/uni.svg",
    explainer: "United News of India wordmark from the agency's official site.",
    licence: L("United News of India", "the agency's official site brand assets"),
  },
  {
    id: "in-ians",
    src: "tmp/logo-harvest/manual/in-ians.png",
    explainer:
      "Sky-blue italic 'IANS' beside green script 'live' — Indo-Asian News Service digital brand mark.",
    licence: L("Indo-Asian News Service", "the agency's official brand assets (ianslive.in / ians.in)"),
  },
  {
    id: "in-ani",
    src: "tmp/logo-harvest/in/ani.svg",
    explainer: "Asian News International logo from Wikimedia Commons.",
    licence: L("Asian News International", "Wikimedia Commons (File:Logo Asian News International.svg)"),
  },
  {
    id: "ir-fars",
    src: "tmp/logo-harvest/ir/fars-alt2.jpg",
    explainer:
      "Blue Persian 'فارس' with blue/yellow overlapping diamonds, 'FARSNEWS.ir' and orange slogan — Fars News Agency brand.",
    licence: L("Fars News Agency", "Wikimedia Commons (File:Fars News Agency New Logo.jpg) / farsnews.ir"),
  },
  {
    id: "ir-tasnim",
    src: "tmp/logo-harvest/ir/tasnim.jpg",
    explainer:
      "Red field with white Persian 'Tasnim' calligraphy, globe and English 'Tasnim News Agency' — Tasnim brand mark.",
    licence: L("Tasnim News Agency", "Wikimedia Commons (File:Tasnim News Agency logo.jpg)"),
  },
  {
    id: "ir-isna",
    src: "tmp/logo-harvest/ir/isna.jpg",
    explainer: "ISNA (Iranian Students' News Agency) logo from Wikimedia Commons.",
    licence: L("ISNA", "Wikimedia Commons (File:ISNA logo.jpg)"),
  },
  {
    id: "ir-mehr",
    src: "tmp/logo-harvest/ir/mehr.svg",
    explainer: "Mehr News Agency wordmark from the agency's official site.",
    licence: L("Mehr News Agency", "the agency's official site brand assets"),
  },
  {
    id: "ir-ilna",
    src: "tmp/logo-harvest/ir/ilna.webp",
    explainer: "ILNA (Iranian Labour News Agency) brand mark from the agency's official site.",
    licence: L("ILNA", "the agency's official site brand assets"),
  },
  {
    id: "it-ansa",
    src: "tmp/logo-harvest/it/ansa.png",
    explainer: "White serif 'ANSA.it' on black — Agenzia Nazionale Stampa Associata web brand mark.",
    licence: L("ANSA", "the agency's official site brand assets (ansa.it)"),
  },
  {
    id: "it-agi",
    src: "tmp/logo-harvest/it/agi.png",
    explainer: "AGI (Agenzia Giornalistica Italia) logo 2020 from Wikimedia Commons.",
    licence: L("AGI", "Wikimedia Commons (File:AGI logo 2020.png)"),
  },
  {
    id: "it-adnkronos",
    src: "tmp/logo-harvest/it/adnkronos.svg",
    explainer: "Adnkronos wordmark from Wikimedia Commons.",
    licence: L("Adnkronos", "Wikimedia Commons (File:Adnkronos Logo.svg)"),
  },
  {
    id: "jp-kyodo",
    src: "tmp/logo-harvest/jp/kyodo.png",
    explainer:
      "Maroon circle with bite cutout beside italic grey 'KYODO' on black — Kyodo News brand mark.",
    licence: L("Kyodo News", "the agency's official site brand assets"),
  },
  {
    id: "jp-jiji",
    src: "tmp/logo-harvest/manual/jp-jiji.svg",
    explainer: "Jiji Press logo from Wikimedia Commons — Japanese national wire brand mark.",
    licence: L("Jiji Press", "Wikimedia Commons (File:Jiji Press logo.svg)"),
  },
  {
    id: "kr-newsis",
    src: "tmp/logo-harvest/kr/newsis.png",
    explainer: "Newsis brand mark from the South Korean news agency's official site.",
    licence: L("Newsis", "the agency's official site brand assets"),
  },
  {
    id: "pk-ppi",
    src: "tmp/logo-harvest/manual2/pk-ppi.png",
    explainer:
      "White serif 'PPI' on navy-striped field framed by navy bars — Pakistan Press International brand mark.",
    licence: L("Pakistan Press International", "the agency's published brand mark (PPI)"),
  },
  {
    id: "ro-mediafax",
    src: "tmp/logo-harvest/ro/mediafax.png",
    explainer: "Mediafax brand mark from the Romanian national wire's official site.",
    licence: L("Mediafax", "the agency's official site brand assets"),
  },
  {
    id: "ro-rador",
    src: "tmp/logo-harvest/ro/rador.jpg",
    explainer: "RADOR (Radio România news agency) brand mark from the agency's official site.",
    licence: L("RADOR", "the agency's official site brand assets"),
  },
  {
    id: "ru-interfax",
    src: "tmp/logo-harvest/ru/interfax.png",
    explainer: "Interfax brand mark from the Russian national wire's official site.",
    licence: L("Interfax", "the agency's official site brand assets"),
  },
  {
    id: "ru-rossiya-segodnya",
    src: "tmp/logo-harvest/manual2/rs-logo-rs-rus.svg",
    explainer:
      "Navy Cyrillic 'Россия сегодня' wordmark with red accent — Rossiya Segodnya official brand SVG.",
    licence: L("Rossiya Segodnya", "the agency's official site brand assets (rossiyasegodnya.com)"),
  },
  {
    id: "tr-dha",
    src: "tmp/logo-harvest/tr/dha.png",
    explainer: "DHA (Demirören Haber Ajansı) brand mark from the agency's official site.",
    licence: L("DHA", "the agency's official site brand assets"),
  },
  {
    id: "tr-iha",
    src: "tmp/logo-harvest/tr/iha.svg",
    explainer: "İHA (İhlas Haber Ajansı) wordmark from the agency's official site.",
    licence: L("İHA", "the agency's official site brand assets"),
  },
  {
    id: "ua-unian",
    src: "tmp/logo-harvest/manual2/unian-schema.png",
    explainer:
      "Compressed charcoal 'UNIAN' wordmark with mic/broadcast mark over the I — Ukrainian Independent Information Agency brand.",
    licence: L("UNIAN", "the agency's official site schema brand asset (unian.info)"),
  },
  {
    id: "us-upi",
    src: "tmp/logo-harvest/manual/us-upi.svg",
    explainer: "United Press International wordmark SVG — UPI national wire brand mark.",
    licence: L("United Press International", "the agency's published brand mark / Wikimedia-sourced UPI logo"),
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
    // Insert logo fields before sources even without noImageReason
    const insert = `      "logo": ${JSON.stringify(fields.logo)},\n      "logoExplainer": ${JSON.stringify(fields.explainer)},\n      "licenceNote": ${JSON.stringify(fields.licence)},\n`;
    if (/"sources":/.test(block)) {
      block = block.replace(/(\n\s*)"sources":/, `\n${insert}$1"sources":`);
    } else {
      block = block.replace(/\n(\s*)\}$/, `,\n${insert}$1}`);
    }
    return src.slice(0, start) + block + src.slice(i);
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

function strengthenNoImage(src, id, reason) {
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
  if (block.includes('"logo"')) return src;
  const line = `      "noImageReason": ${JSON.stringify(reason)},\n`;
  if (/"noImageReason":/.test(block)) {
    block = block.replace(/\s*"noImageReason":\s*"(?:\\.|[^"\\])*",?\n?/, "\n" + line);
  } else if (/"sources":/.test(block)) {
    block = block.replace(/(\n\s*)"sources":/, `\n${line}$1"sources":`);
  } else {
    block = block.replace(/\n(\s*)\}$/, `,\n${line}$1}`);
  }
  return src.slice(0, start) + block + src.slice(i);
}

function main() {
  let agencies = readFileSync(resolve(ROOT, "src/data/nationalNewsAgencies.ts"), "utf8");
  let installed = 0;
  for (const row of MANIFEST) {
    const abs = resolve(ROOT, row.src);
    if (!existsSync(abs)) throw new Error(`missing source: ${row.src}`);
    const buf = readFileSync(abs);
    if (buf.length < 200) throw new Error(`suspiciously small: ${row.src} (${buf.length}b)`);
    // HTML sniff — reject saved error pages, not SVG <!DOCTYPE svg …>
    const head = buf.slice(0, 200).toString("utf8").toLowerCase();
    if (head.includes("<html") || /<!doctype\s+html/.test(head)) {
      throw new Error(`HTML error page: ${row.src}`);
    }
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
    const fields = {
      logo: destRel,
      explainer: row.explainer,
      licence: row.licence,
      sha256: sha256(buf),
    };
    console.log(`install ${row.id} → ${destRel} (${buf.length}b sha=${fields.sha256.slice(0, 12)})`);
    const before = agencies;
    agencies = patchEntry(agencies, row.id, fields);
    if (agencies === before) {
      console.log(`  ${row.id}: data unchanged`);
      continue;
    }
    installed++;
  }

  // Honest gaps after exhausted search
  agencies = strengthenNoImage(
    agencies,
    "sm-smna",
    "Wikimedia Commons (no SMNA emblem), San Marino RTV article (only RTV logos), agency registration notice (no brand mark), official SMNA site not found — harvested RTV mark rejected as wrong organisation; listed with no image rather than an invented or misattributed logo.",
  );
  agencies = strengthenNoImage(
    agencies,
    "ua-ukrainian-news",
    "Wikimedia Commons (no file), ukranews.com (HTTP 403 from this environment), Wayback Machine (503), Wikipedia (no page image), Clearbit (unreachable) — no freely-citable authentic emblem confidently sourced; listed with no image rather than an invented logo.",
  );

  writeFileSync(resolve(ROOT, "src/data/nationalNewsAgencies.ts"), agencies);
  console.log(`Installed ${installed} agency logos; strengthened noImageReason for sm-smna + ua-ukrainian-news.`);
}

main();
