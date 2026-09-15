import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, "..", "public", "airline-logos");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const BATCH_1_AIRLINES = [
  // New Zealand
  { cc: "nz", id: "air-new-zealand", file: "Air_New_Zealand_logo.svg", page: "Air New Zealand" },

  // Singapore
  { cc: "sg", id: "singapore-airlines", file: "Singapore_Airlines_Logo_2.svg", page: "Singapore Airlines" },
  { cc: "sg", id: "scoot", file: "FlyScoot_logo.svg", page: "Scoot" },

  // Thailand
  { cc: "th", id: "thai-airways", file: "Thai_Airways_logo.svg", page: "Thai Airways" },
  { cc: "th", id: "bangkok-airways", file: "Bangkok_Airways_logo.svg", page: "Bangkok Airways" },
  { cc: "th", id: "thai-airasia", file: "Thai_AirAsia_logo.svg", page: "Thai AirAsia" },

  // Vietnam
  { cc: "vn", id: "vietnam-airlines", file: "Vietnam_Airlines_logo.svg", page: "Vietnam Airlines" },
  { cc: "vn", id: "vietjet-air", file: "VietJet_Air_logo.svg", page: "VietJet Air" },
  { cc: "vn", id: "bamboo-airways", file: "Bamboo_Airways_logo.svg", page: "Bamboo Airways" },

  // Philippines
  { cc: "ph", id: "philippine-airlines", file: "Philippine_Airlines_logo.svg", page: "Philippine Airlines" },
  { cc: "ph", id: "cebu-pacific", file: "Cebu_Pacific_logo.svg", page: "Cebu Pacific" },
];

async function resolveLogoFile(page) {
  for (const domain of ["en.wikipedia.org", "commons.wikimedia.org"]) {
    try {
      const url = `https://${domain}/w/api.php?action=parse&page=${encodeURIComponent(page)}&prop=images&format=json`;
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" },
      });
      const data = await res.json();
      const images = (data.parse?.images || []).filter(img => /logo/i.test(img) && (/\.svg$/i.test(img) || /\.png$/i.test(img)));
      if (images.length > 0) return images[0];
    } catch {}
  }
  return null;
}

async function downloadFile(filename, destPath) {
  // Try commons Special:FilePath first, then en.wikipedia Special:FilePath
  for (const domain of ["commons.wikimedia.org", "en.wikipedia.org"]) {
    try {
      const url = `https://${domain}/w/index.php?title=Special:FilePath/${encodeURIComponent(filename)}`;
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" },
        redirect: "follow",
      });
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        if (buf.length > 300) {
          // Verify it's not an HTML error
          const str = buf.slice(0, 100).toString("utf8");
          if (!str.includes("Please honor our robot policy") && !str.includes("<!DOCTYPE html>")) {
            fs.mkdirSync(path.dirname(destPath), { recursive: true });
            fs.writeFileSync(destPath, buf);
            return buf.length;
          }
        }
      }
    } catch (e) {}
    await sleep(500);
  }
  return null;
}

async function main() {
  for (const a of BATCH_1_AIRLINES) {
    let file = a.file;
    const ext = path.extname(file) || ".svg";
    const destPath = path.join(PUBLIC_DIR, a.cc, `${a.id}${ext}`);

    let bytes = await downloadFile(file, destPath);
    if (!bytes && a.page) {
      console.log(`Resolving logo for ${a.page}...`);
      await sleep(500);
      file = await resolveLogoFile(a.page);
      if (file) {
        const newExt = path.extname(file) || ext;
        const newDestPath = path.join(PUBLIC_DIR, a.cc, `${a.id}${newExt}`);
        bytes = await downloadFile(file, newDestPath);
      }
    }

    if (bytes) {
      console.log(`[OK] ${a.cc}/${a.id} (${bytes} bytes) from ${file}`);
    } else {
      console.error(`[FAIL] ${a.cc}/${a.id}`);
    }
    await sleep(600);
  }
}

main();
