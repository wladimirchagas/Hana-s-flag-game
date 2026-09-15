import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, "..", "public", "airline-logos");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const BATCH_3_AIRLINES = [
  // China
  { cc: "cn", id: "air-china", file: "Air_China_Logo.svg", page: "Air China" },
  { cc: "cn", id: "china-eastern", file: "China_Eastern_Airlines_logo_2014.svg", page: "China Eastern Airlines" },
  { cc: "cn", id: "china-southern", file: "China_Southern_Airlines_logo.svg", page: "China Southern Airlines" },

  // Taiwan
  { cc: "tw", id: "china-airlines", file: "China_Airlines_logo.svg", page: "China Airlines" },
  { cc: "tw", id: "eva-air", file: "EVA_Air_logo.svg", page: "EVA Air" },

  // South Korea
  { cc: "kr", id: "korean-air", file: "Korean_Air_logo.svg", page: "Korean Air" },
  { cc: "kr", id: "asiana-airlines", file: "Asiana_Airlines_Logo.svg", page: "Asiana Airlines" },

  // North Korea
  { cc: "kp", id: "air-koryo", file: "Air_Koryo_logo.svg", page: "Air Koryo" },

  // Mongolia
  { cc: "mn", id: "miat-mongolian", file: "MIAT_Mongolian_Airlines_logo.svg", page: "MIAT Mongolian Airlines" },
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
  for (const domain of ["commons.wikimedia.org", "en.wikipedia.org"]) {
    try {
      const url = `https://${domain}/w/index.php?title=Special:FilePath/${encodeURIComponent(filename)}`;
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" },
        redirect: "follow",
      });
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        if (buf.length > 200) {
          const str = buf.slice(0, 100).toString("utf8");
          if (!str.includes("Please honor our robot policy") && !str.includes("<!DOCTYPE html>")) {
            fs.mkdirSync(path.dirname(destPath), { recursive: true });
            fs.writeFileSync(destPath, buf);
            return { length: buf.length, path: destPath };
          }
        }
      }
    } catch (e) {}
    await sleep(500);
  }
  return null;
}

async function main() {
  for (const a of BATCH_3_AIRLINES) {
    let file = a.file;
    const ext = path.extname(file) || ".svg";
    const destPath = path.join(PUBLIC_DIR, a.cc, `${a.id}${ext}`);

    let res = await downloadFile(file, destPath);
    if (!res && a.page) {
      console.log(`Resolving logo for ${a.page}...`);
      await sleep(500);
      file = await resolveLogoFile(a.page);
      if (file) {
        const newExt = path.extname(file) || ext;
        const newDestPath = path.join(PUBLIC_DIR, a.cc, `${a.id}${newExt}`);
        res = await downloadFile(file, newDestPath);
      }
    }

    if (res) {
      console.log(`[OK] ${a.cc}/${a.id} (${res.length} bytes) from ${file}`);
    } else {
      console.error(`[FAIL] ${a.cc}/${a.id}`);
    }
    await sleep(600);
  }
}

main();
