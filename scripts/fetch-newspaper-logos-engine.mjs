import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
export const UA = "HanaFlagGame/1.0 (https://github.com/wladimirchagas/Hana-s-flag-game; contact@flaggame.local)";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function fetchWithRetry(url, maxAttempts = 3) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA } });
      if (res.status === 429 || res.status === 503) {
        const delay = 1500 * (attempt + 1);
        console.log(`  [429/503] rate limited, waiting ${delay}ms...`);
        await sleep(delay);
        continue;
      }
      return res;
    } catch (e) {
      if (attempt === maxAttempts - 1) throw e;
      await sleep(1000);
    }
  }
  return fetch(url, { headers: { "User-Agent": UA } });
}

export async function searchCommonsLogo(query) {
  try {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=5&format=json`;
    const res = await fetchWithRetry(url);
    if (!res.ok) return null;
    const d = await res.json();
    const results = d.query?.search || [];
    for (const r of results) {
      const title = r.title;
      if (/\.(svg|png|jpg|jpeg|webp)$/i.test(title) && /logo|masthead|wordmark/i.test(title)) {
        return title.replace(/^File:/, "");
      }
    }
    return null;
  } catch {
    return null;
  }
}

export async function getInfoboxLogo(pageTitle) {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(pageTitle)}&prop=wikitext|images&section=0&format=json`;
    const res = await fetchWithRetry(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.parse) return null;

    const wt = data.parse.wikitext?.["*"] || "";
    // Look for logo or masthead in infobox
    const m = wt.match(/\|\s*(?:logo|masthead|image|wordmark)\s*=\s*([^|\n]+)/i);
    if (m) {
      let raw = m[1].trim();
      raw = raw.replace(/^\[\[\s*(?:File|Image):/i, "").replace(/[|\]].*$/, "").trim();
      if (/\.(svg|png|jpg|jpeg|webp)$/i.test(raw)) {
        return raw;
      }
    }
    // Fallback: check images in the page parse
    const imgs = (data.parse.images || []).filter(
      (img) => /logo|masthead|wordmark/i.test(img) && !/commons-logo|wikiquote|disambig/i.test(img) && (/\.svg$/i.test(img) || /\.png$/i.test(img))
    );
    return imgs[0] || null;
  } catch {
    return null;
  }
}

export async function resolveImageUrls(filenames) {
  if (filenames.length === 0) return {};
  const titles = filenames.map((f) => (f.startsWith("File:") ? f : `File:${f}`));
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles.join("|"))}&prop=imageinfo&iiprop=url|size|mime&format=json`;
  const res = await fetchWithRetry(url);
  if (!res.ok) return {};
  const data = await res.json();
  const out = {};
  for (const page of Object.values(data.query?.pages || {})) {
    if (page.imageinfo?.[0]?.url) {
      const cleanTitle = page.title.replace(/^File:/, "").replace(/ /g, "_");
      out[cleanTitle] = {
        url: page.imageinfo[0].url.replace(/\?.*$/, ""),
        size: page.imageinfo[0].size,
        mime: page.imageinfo[0].mime,
        originalTitle: page.title.replace(/^File:/, "")
      };
    }
  }
  return out;
}

export async function downloadFile(url, destPath) {
  const dir = path.dirname(destPath);
  fs.mkdirSync(dir, { recursive: true });
  const res = await fetchWithRetry(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(destPath, buf);
  return buf;
}
