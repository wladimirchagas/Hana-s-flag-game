import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, "..", "public", "airline-logos");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const BATCH_4_AIRLINES = [
  // Argentina
  { cc: "ar", id: "aerolineas-argentinas", file: "Aerolíneas_Argentinas_logo.svg", page: "Aerolíneas Argentinas" },
  { cc: "ar", id: "flybondi", file: "Flybondi_logo.svg", page: "Flybondi" },

  // Colombia
  { cc: "co", id: "avianca", file: "Avianca_2023.svg", page: "Avianca" },
  { cc: "co", id: "clic-air", file: "Clic_Air_logo.svg", page: "Clic Air" },

  // Chile
  { cc: "cl", id: "latam-chile", file: "LATAM_Airlines_logo.svg", page: "LATAM Chile" },
  { cc: "cl", id: "sky-airline", file: "Sky_Airline_logo.svg", page: "Sky Airline" },

  // Bolivia
  { cc: "bo", id: "boliviana-de-aviacion", file: "Boliviana_de_Aviación_logo.svg", page: "Boliviana de Aviación" },

  // Peru
  { cc: "pe", id: "latam-peru", file: "LATAM_Airlines_logo.svg", page: "LATAM Perú" },
  { cc: "pe", id: "star-peru", file: "Star_Perú_logo.svg", page: "Star Perú" },
];

async function resolveLogoFile(page) {
  for (const domain of ["en.wikipedia.org", "commons.wikimedia.org", "es.wikipedia.org"]) {
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
  for (const domain of ["commons.wikimedia.org", "en.wikipedia.org", "es.wikipedia.org"]) {
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
  for (const a of BATCH_4_AIRLINES) {
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
