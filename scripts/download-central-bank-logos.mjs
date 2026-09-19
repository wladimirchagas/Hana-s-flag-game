#!/usr/bin/env node
/**
 * Downloader and integrity verifier for Central Bank logos in Learn mode.
 *
 * Downloads official logos from Wikimedia Commons and Wikipedia with:
 * - Proper rate-limiting (to respect API limits)
 * - Image magic-byte sniffing (guaranteeing no HTML error pages are saved as SVG)
 * - Local storage in `public/central-bank-logos/{cc}/{id}.svg`
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, "..", "public", "central-bank-logos");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const CENTRAL_BANK_FILES = [
  { cc: "au", id: "rba", file: "Reserve_Bank_of_Australia_logo.svg", page: "Reserve Bank of Australia" },
  { cc: "br", id: "bcb", file: "Logotipo_do_Banco_Central_do_Brasil.svg", page: "Central Bank of Brazil" },
  { cc: "us", id: "fed", file: "Seal_of_the_United_States_Federal_Reserve_System.svg", page: "Federal Reserve" },
  { cc: "gb", id: "boe", file: "Bank_of_England_logo.svg", page: "Bank of England" },
  { cc: "de", id: "bundesbank", file: "Deutsche_Bundesbank_logo.svg", page: "Deutsche Bundesbank" },
  { cc: "fr", id: "bdf", file: "Banque_de_France_logo.svg", page: "Bank of France" },
  { cc: "it", id: "bdi", file: "Banca_d'Italia_logo.svg", page: "Bank of Italy" },
  { cc: "es", id: "bde", file: "Banco_de_España_logo.svg", page: "Bank of Spain" },
  { cc: "nl", id: "dnb", file: "De_Nederlandsche_Bank_logo.svg", page: "De Nederlandsche Bank" },
  { cc: "jp", id: "boj", file: "Bank_of_Japan_logo.svg", page: "Bank of Japan" },
  { cc: "ca", id: "boc", file: "Bank_of_Canada_logo.svg", page: "Bank of Canada" },
  { cc: "cn", id: "pboc", file: "People's_Bank_of_China_logo.svg", page: "People's Bank of China" },
  { cc: "ch", id: "snb", file: "Swiss_National_Bank_logo.svg", page: "Swiss National Bank" },
  { cc: "in", id: "rbi", file: "Reserve_Bank_of_India_logo.svg", page: "Reserve Bank of India" },
  { cc: "mx", id: "banxico", file: "Banco_de_México_logo.svg", page: "Bank of Mexico" },
  { cc: "za", id: "sarb", file: "South_African_Reserve_Bank_logo.svg", page: "South African Reserve Bank" },
  { cc: "nz", id: "rbnz", file: "Reserve_Bank_of_New_Zealand_logo.svg", page: "Reserve Bank of New Zealand" },
  { cc: "sg", id: "mas", file: "Monetary_Authority_of_Singapore_logo.svg", page: "Monetary Authority of Singapore" },
  { cc: "kr", id: "bok", file: "Bank_of_Korea_logo.svg", page: "Bank of Korea" },
  { cc: "id", id: "bi", file: "Bank_Indonesia_logo.svg", page: "Bank Indonesia" },
  { cc: "no", id: "norges-bank", file: "Norges_Bank_logo.svg", page: "Norges Bank" },
  { cc: "se", id: "riksbank", file: "Sveriges_Riksbank_logo.svg", page: "Sveriges Riksbank" },
  { cc: "dk", id: "nationalbank", file: "Danmarks_Nationalbank_logo.svg", page: "Danmarks Nationalbank" },
  { cc: "pl", id: "nbp", file: "Narodowy_Bank_Polski_logo.svg", page: "National Bank of Poland" },
  { cc: "tr", id: "tcmb", file: "Central_Bank_of_the_Republic_of_Turkey_logo.svg", page: "Central Bank of the Republic of Turkey" },
  { cc: "sa", id: "sama", file: "Saudi_Central_Bank_logo.svg", page: "Saudi Central Bank" },
  { cc: "ar", id: "bcra", file: "Banco_Central_de_la_República_Argentina_logo.svg", page: "Central Bank of Argentina" },
  { cc: "cl", id: "bcch", file: "Banco_Central_de_Chile_logo.svg", page: "Central Bank of Chile" },
  { cc: "co", id: "banrep", file: "Banco_de_la_República_(Colombia)_logo.svg", page: "Bank of the Republic (Colombia)" },
  { cc: "eg", id: "cbe", file: "Central_Bank_of_Egypt_logo.svg", page: "Central Bank of Egypt" },
  { cc: "ng", id: "cbn", file: "Central_Bank_of_Nigeria_logo.svg", page: "Central Bank of Nigeria" },
  { cc: "ke", id: "cbk", file: "Central_Bank_of_Kenya_logo.svg", page: "Central Bank of Kenya" },
  { cc: "th", id: "bot", file: "Bank_of_Thailand_logo.svg", page: "Bank of Thailand" },
  { cc: "ph", id: "bsp", file: "Bangko_Sentral_ng_Pilipinas_logo.svg", page: "Bangko Sentral ng Pilipinas" },
  { cc: "my", id: "bnm", file: "Bank_Negara_Malaysia_logo.svg", page: "Bank Negara Malaysia" },
  { cc: "vn", id: "sbv", file: "Emblem_of_the_State_Bank_of_Vietnam.svg", page: "State Bank of Vietnam" },
  { cc: "pk", id: "sbp", file: "State_Bank_of_Pakistan_logo.svg", page: "State Bank of Pakistan" },
  { cc: "bd", id: "bb", file: "Bangladesh_Bank_logo.svg", page: "Bangladesh Bank" },
  { cc: "il", id: "boi", file: "Bank_of_Israel_logo.svg", page: "Bank of Israel" },
  { cc: "ae", id: "cbuae", file: "Central_Bank_of_the_United_Arab_Emirates_logo.svg", page: "Central Bank of the United Arab Emirates" },
  { cc: "pe", id: "bcrp", file: "Banco_Central_de_Reserva_del_Perú_logo.svg", page: "Central Reserve Bank of Peru" },
  { cc: "cz", id: "cnb", file: "Czech_National_Bank_logo.svg", page: "Czech National Bank" },
  { cc: "hu", id: "mnb", file: "Magyar_Nemzeti_Bank_logo.svg", page: "Hungarian National Bank" },
  { cc: "is", id: "cbi", file: "Central_Bank_of_Iceland_logo.svg", page: "Central Bank of Iceland" },
  { cc: "at", id: "oenb", file: "Oesterreichische_Nationalbank_logo.svg", page: "Oesterreichische Nationalbank" },
  { cc: "be", id: "nbb", file: "National_Bank_of_Belgium_logo.svg", page: "National Bank of Belgium" },
  { cc: "pt", id: "bdp", file: "Banco_de_Portugal_logo.svg", page: "Banco de Portugal" },
  { cc: "gr", id: "bog", file: "Bank_of_Greece_logo.svg", page: "Bank of Greece" },
  { cc: "ie", id: "cbi", file: "Central_Bank_of_Ireland_logo.svg", page: "Central Bank of Ireland" },
  { cc: "fi", id: "bof", file: "Bank_of_Finland_logo.svg", page: "Bank of Finland" },
];

/** Sniff whether buffer contains valid image bytes */
export function sniffImage(buf) {
  if (buf.length >= 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return "png";
  }
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return "jpeg";
  }
  if (buf.length >= 12 && buf.subarray(0, 4).toString("latin1") === "RIFF" && buf.subarray(8, 12).toString("latin1") === "WEBP") {
    return "webp";
  }
  const head = buf.subarray(0, 4096).toString("utf8").replace(/^\uFEFF/, "").trimStart();
  const lower = head.toLowerCase();
  if (lower.startsWith("<!doctype html") || lower.startsWith("<html")) return "html";
  const stripped = lower.replace(/^<\?xml[^>]*\?>\s*/, "").replace(/^(<!--[\s\S]*?-->|<!doctype svg[^>]*>|\s)+/, "");
  if (stripped.startsWith("<svg") || lower.includes("<svg")) return "svg";
  return null;
}

async function getFileDownloadUrl(filename) {
  const domains = ["commons.wikimedia.org", "en.wikipedia.org", "pt.wikipedia.org", "de.wikipedia.org", "fr.wikipedia.org", "es.wikipedia.org"];
  for (const domain of domains) {
    try {
      const url = `https://${domain}/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;
      const res = await fetch(url, {
        headers: { "User-Agent": "HanaFlagGame/1.0 (https://github.com/wladimirchagas/Hana-s-flag-game; contact@hana.app)" },
      });
      if (!res.ok) continue;
      const data = await res.json();
      const page = Object.values(data.query?.pages || {})[0];
      if (page?.imageinfo?.[0]?.url) {
        return page.imageinfo[0].url.replace(/\?.*$/, "");
      }
    } catch {}
    await sleep(200);
  }
  return null;
}

async function resolveFromWikipedia(page) {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(page)}&prop=images&format=json`;
    const res = await fetch(url, {
      headers: { "User-Agent": "HanaFlagGame/1.0 (https://github.com/wladimirchagas/Hana-s-flag-game; contact@hana.app)" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const imgs = (data.parse?.images || []).filter(img => /logo|emblem|seal/i.test(img) && (/\.svg$/i.test(img) || /\.png$/i.test(img)));
    return imgs[0] || null;
  } catch {
    return null;
  }
}

function downloadFile(url, destPath) {
  const cmd = `curl -s -f -L -A "HanaFlagGame/1.0 (educational)" -o "${destPath}" "${url}"`;
  execSync(cmd, { stdio: "pipe" });
}

async function main() {
  console.log(`Checking and downloading central bank logos...`);
  let successCount = 0;
  let failCount = 0;

  for (const cb of CENTRAL_BANK_FILES) {
    const dir = path.join(PUBLIC_DIR, cb.cc);
    fs.mkdirSync(dir, { recursive: true });
    const ext = path.extname(cb.file || "") || ".svg";
    const dest = path.join(dir, `${cb.id}${ext}`);

    if (fs.existsSync(dest) && fs.statSync(dest).size > 200) {
      const buf = fs.readFileSync(dest);
      const kind = sniffImage(buf);
      if (kind === "svg" || kind === "png") {
        console.log(`[EXISTS] ${cb.cc}/${cb.id}${ext} (${buf.length} bytes, ${kind})`);
        successCount++;
        continue;
      }
    }

    console.log(`Resolving ${cb.cc}/${cb.id} (${cb.file})...`);
    let dlUrl = await getFileDownloadUrl(cb.file);
    if (!dlUrl && cb.page) {
      await sleep(600);
      const altFile = await resolveFromWikipedia(cb.page);
      if (altFile) {
        console.log(`  Found alt file from page ${cb.page}: ${altFile}`);
        dlUrl = await getFileDownloadUrl(altFile);
      }
    }

    if (dlUrl) {
      try {
        downloadFile(dlUrl, dest);
        const buf = fs.readFileSync(dest);
        const kind = sniffImage(buf);
        if (kind === "svg" || kind === "png" || kind === "webp") {
          console.log(`  [OK] Saved ${cb.cc}/${cb.id}${ext} (${buf.length} bytes, ${kind})`);
          successCount++;
        } else {
          console.error(`  [ERROR] Downloaded non-image (${kind}) for ${cb.cc}/${cb.id}`);
          fs.unlinkSync(dest);
          failCount++;
        }
      } catch (err) {
        console.error(`  [FAIL] Could not curl ${cb.cc}/${cb.id}: ${err.message}`);
        failCount++;
      }
    } else {
      console.warn(`  [NOT FOUND] No URL resolved for ${cb.cc}/${cb.id}`);
      failCount++;
    }

    await sleep(600);
  }

  console.log(`\nFinished: ${successCount} verified logos, ${failCount} failed.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(console.error);
}
