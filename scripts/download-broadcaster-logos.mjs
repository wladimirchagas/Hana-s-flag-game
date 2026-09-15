import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, "..", "public", "broadcaster-logos");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const BROADCASTERS = [
  // Australia
  { cc: "au", id: "abc", file: "Australian_Broadcasting_Corporation_logo_(1974-).svg", page: "Australian Broadcasting Corporation" },
  { cc: "au", id: "sbs", file: "SBS_Australia_Logo_(2019).svg", page: "Special Broadcasting Service" },

  // Malaysia
  { cc: "my", id: "rtm", file: "Radio_Televisyen_Malaysia_logo_2021.svg", page: "Radio Televisyen Malaysia" },
  { cc: "my", id: "bernama", file: "Pertubuhan_Berita_Nasional_Malaysia_logo.svg", page: "Bernama" },

  // Brazil
  { cc: "br", id: "ebc", file: "TV_Brasil_logo_2023.svg", page: "TV Brasil" },
  { cc: "br", id: "cultura", file: "TV_Cultura_logo.svg", page: "TV Cultura" },

  // United States
  { cc: "us", id: "pbs", file: "PBS_logo_2019.svg", page: "PBS" },
  { cc: "us", id: "npr", file: "NPR_logo.svg", page: "NPR" },

  // United Kingdom
  { cc: "gb", id: "bbc", file: "BBC_logo_2021.svg", page: "BBC" },
  { cc: "gb", id: "channel4", file: "Channel_4_logo_2015.svg", page: "Channel 4" },

  // Canada
  { cc: "ca", id: "cbc", file: "Canadian_Broadcasting_Corporation_logo.svg", page: "CBC/Radio-Canada" },

  // New Zealand
  { cc: "nz", id: "rnz", file: "RNZ_logo.svg", page: "Radio New Zealand" },
  { cc: "nz", id: "whakaata-maori", file: "Maori_Television_logo.svg", page: "Whakaata Māori" },

  // France
  { cc: "fr", id: "france-televisions", file: "France_Télévisions_logo_2018.svg", page: "France Télévisions" },
  { cc: "fr", id: "radio-france", file: "Radio_France_logo_2017.svg", page: "Radio France" },
  { cc: "fr", id: "arte", file: "Arte_logo_2017.svg", page: "Arte" },
];

async function resolveLogoFile(page) {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(page)}&prop=images&format=json`;
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" },
    });
    const data = await res.json();
    const images = (data.parse?.images || []).filter(img => /logo/i.test(img) && (/\.svg$/i.test(img) || /\.png$/i.test(img)));
    return images[0] || null;
  } catch (err) {
    return null;
  }
}

async function getFileDownloadUrl(filename) {
  for (const domain of ["commons.wikimedia.org", "en.wikipedia.org", "fr.wikipedia.org", "pt.wikipedia.org", "ms.wikipedia.org"]) {
    try {
      const url = `https://${domain}/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" },
      });
      const data = await res.json();
      const page = Object.values(data.query?.pages || {})[0];
      if (page?.imageinfo?.[0]?.url) {
        return page.imageinfo[0].url.replace(/\?.*$/, "");
      }
    } catch {}
  }
  return null;
}

function downloadWithCurl(url, destPath) {
  const cmd = `curl -s -f -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" -o "${destPath}" "${url}"`;
  execSync(cmd, { stdio: "pipe" });
}

async function main() {
  for (const b of BROADCASTERS) {
    const dir = path.join(PUBLIC_DIR, b.cc);
    fs.mkdirSync(dir, { recursive: true });
    const ext = path.extname(b.file || "") || ".svg";
    const dest = path.join(dir, `${b.id}${ext}`);

    if (fs.existsSync(dest) && fs.statSync(dest).size > 500) {
      console.log(`[EXISTS] ${b.cc}/${b.id}`);
      continue;
    }

    console.log(`Searching logo for ${b.id} (${b.file})...`);
    let dlUrl = b.file ? await getFileDownloadUrl(b.file) : null;
    if (!dlUrl && b.page) {
      await sleep(500);
      const altFile = await resolveLogoFile(b.page);
      if (altFile) {
        console.log(`Found alt file for ${b.id}: ${altFile}`);
        dlUrl = await getFileDownloadUrl(altFile);
      }
    }

    if (dlUrl) {
      console.log(`Downloading ${b.id} from ${dlUrl}...`);
      try {
        downloadWithCurl(dlUrl, dest);
        console.log(`[SUCCESS] Saved ${dest} (${fs.statSync(dest).size} bytes)`);
      } catch (err) {
        console.error(`[FAIL] Could not download ${b.id}:`, err.message);
      }
    } else {
      console.warn(`[NOT FOUND] Logo URL for ${b.id}`);
    }
    await sleep(400);
  }
}

main().catch(console.error);
