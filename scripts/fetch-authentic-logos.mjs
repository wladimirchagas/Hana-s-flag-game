import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const UA = "HanaFlagGame/1.0 (https://github.com/wladimirchagas/Hana-s-flag-game; contact@flaggame.local)";
const PUBLIC_DIR = path.join(root, "public");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchWithRetry(url, maxAttempts = 3) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA } });
      if (res.status === 429 || res.status === 503) {
        const delay = 1500 * (attempt + 1);
        console.log(`  [HTTP ${res.status}] waiting ${delay}ms...`);
        await sleep(delay);
        continue;
      }
      return res;
    } catch (e) {
      if (attempt === maxAttempts - 1) return null;
      await sleep(1000);
    }
  }
  return null;
}

function sniffImageKind(buf) {
  if (buf.length >= 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return "png";
  }
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return "jpeg";
  }
  if (buf.length >= 12 && buf.subarray(0, 4).toString("latin1") === "RIFF" && buf.subarray(8, 12).toString("latin1") === "WEBP") {
    return "webp";
  }
  const head = buf.subarray(0, 4096).toString("utf8").replace(/^\uFEFF/, "").trimStart().toLowerCase();
  if (head.startsWith("<svg") || head.includes("<svg")) return "svg";
  return null;
}

function isSyntheticSvg(filePath) {
  if (!fs.existsSync(filePath)) return false;
  if (!filePath.endsWith(".svg")) return false;
  const svg = fs.readFileSync(filePath, "utf8");
  return (svg.includes('viewBox="0 0 500 140"') || svg.includes('viewBox="0 0 400 120"') || svg.includes('<rect width="500" height="140"')) && svg.includes("<text");
}

async function resolveWikimediaUrl(filename) {
  const titles = filename.startsWith("File:") ? filename : `File:${filename}`;
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(titles)}&prop=imageinfo&iiprop=url|size|mime&format=json`;
  const res = await fetchWithRetry(url);
  if (!res?.ok) return null;
  const d = await res.json();
  const page = Object.values(d.query?.pages || {})[0];
  if (page?.imageinfo?.[0]?.url) {
    return {
      url: page.imageinfo[0].url.replace(/\?.*$/, ""),
      size: page.imageinfo[0].size,
      mime: page.imageinfo[0].mime,
    };
  }
  return null;
}

async function searchCommons(name) {
  const clean = name.replace(/\s*\([^)]*\)/g, "").trim();
  const queries = [`"${clean}" logo`, `${clean} logo`, `"${clean}" masthead`, `${clean} newspaper`];
  for (const q of queries) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&srnamespace=6&srlimit=5&format=json`;
    const res = await fetchWithRetry(url);
    if (!res?.ok) continue;
    const d = await res.json();
    for (const item of d.query?.search || []) {
      const title = item.title.replace(/^File:/, "");
      if (/\.(svg|png|jpg|jpeg|webp)$/i.test(title) && /logo|masthead|wordmark/i.test(title) && !/commons-logo|disambig|question_book/i.test(title)) {
        return title;
      }
    }
  }
  return null;
}

async function queryWikidataLogo(wikiTitle) {
  const url1 = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(wikiTitle)}&redirects=1&prop=pageprops&format=json`;
  const res1 = await fetchWithRetry(url1);
  if (!res1?.ok) return null;
  const d1 = await res1.json();
  const page = Object.values(d1.query?.pages || {})[0];
  const qid = page?.pageprops?.wikibase_item;
  if (!qid) return null;

  const url2 = `https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=${qid}&property=P154&format=json`;
  const res2 = await fetchWithRetry(url2);
  if (!res2?.ok) return null;
  const d2 = await res2.json();
  const claim = d2.claims?.P154?.[0];
  const val = claim?.mainsnak?.datavalue?.value;
  return typeof val === "string" ? val : null;
}

async function downloadFile(url, destPath) {
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  const res = await fetchWithRetry(url);
  if (!res?.ok) throw new Error(`HTTP ${res?.status || "failed"}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(destPath, buf);
  return buf;
}

async function main() {
  const needsLogo = JSON.parse(fs.readFileSync(path.join(__dirname, "needs-logo.json"), "utf8"));
  console.log(`Processing ${needsLogo.length} items needing authentic logos...`);

  const results = {};
  let resolvedCount = 0;
  let skippedCount = 0;

  for (let idx = 0; idx < needsLogo.length; idx++) {
    const item = needsLogo[idx];
    const cc = item.cc.toLowerCase();
    const slug = item.id.replace(new RegExp(`^${cc}-`), "");
    const baseDir = path.join(PUBLIC_DIR, "newspaper-logos", cc);

    // 1. Check if a non-synthetic raster or vector file already exists on disk
    const existingCandidates = [
      path.join(baseDir, `${slug}.svg`),
      path.join(baseDir, `${slug}.png`),
      path.join(baseDir, `${slug}.jpg`),
      path.join(baseDir, `${slug}.jpeg`),
      path.join(baseDir, `${slug}.webp`),
    ];

    let foundLocal = null;
    for (const cand of existingCandidates) {
      if (fs.existsSync(cand)) {
        if (cand.endsWith(".svg") && isSyntheticSvg(cand)) continue;
        const buf = fs.readFileSync(cand);
        const kind = sniffImageKind(buf);
        if (kind) {
          foundLocal = path.relative(PUBLIC_DIR, cand);
          break;
        }
      }
    }

    if (foundLocal) {
      console.log(`[${idx + 1}/${needsLogo.length}] LOCAL FOUND: ${item.id} -> ${foundLocal}`);
      results[item.id] = foundLocal;
      resolvedCount++;
      continue;
    }

    // 2. Extract Wikipedia article title
    const wikiUrl = item.sources?.find((s) => s.includes("wikipedia.org/wiki/"));
    let wikiTitle = null;
    if (wikiUrl) {
      try {
        const u = new URL(wikiUrl);
        wikiTitle = decodeURIComponent(u.pathname.replace(/^\/wiki\//, ""));
      } catch {}
    }

    let targetFile = null;

    // Try infobox logo or images from Wikipedia
    if (wikiTitle) {
      const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(wikiTitle)}&redirects=1&prop=images|revisions&rvprop=content&rvsection=0&format=json`;
      const res = await fetchWithRetry(url);
      if (res?.ok) {
        const d = await res.json();
        const page = Object.values(d.query?.pages || {})[0];
        if (page && page.missing === undefined) {
          const wt = page.revisions?.[0]?.["*"] || "";
          const m = wt.match(/\|\s*(?:logo|masthead|image|wordmark)\s*=\s*([^|\n]+)/i);
          if (m) {
            let raw = m[1].trim();
            raw = raw.replace(/^\[\[\s*(?:File|Image):/i, "").replace(/[|\]].*$/, "").trim();
            if (/\.(svg|png|jpg|jpeg|webp)$/i.test(raw) && !/commons-logo|flag/i.test(raw)) {
              targetFile = raw;
            }
          }
          if (!targetFile && page.images) {
            const cand = page.images.find((img) =>
              /logo|masthead|wordmark/i.test(img.title) &&
              !/commons-logo|wikiquote|disambig|blue_pencil|ambox|question_book/i.test(img.title) &&
              (/\.svg$/i.test(img.title) || /\.png$/i.test(img.title))
            );
            if (cand) targetFile = cand.title.replace(/^File:/, "");
          }
        }
      }
    }

    // Try Wikidata P154
    if (!targetFile && wikiTitle) {
      const p154 = await queryWikidataLogo(wikiTitle);
      if (p154 && /\.(svg|png|jpg|jpeg|webp)$/i.test(p154)) {
        targetFile = p154;
      }
    }

    // Try Wikimedia Commons search
    if (!targetFile) {
      const searchRes = await searchCommons(item.name);
      if (searchRes) targetFile = searchRes;
    }

    if (targetFile) {
      const info = await resolveWikimediaUrl(targetFile);
      if (info?.url) {
        const ext = path.extname(targetFile).toLowerCase() || (info.mime === "image/svg+xml" ? ".svg" : ".png");
        const relPath = `newspaper-logos/${cc}/${slug}${ext}`;
        const destPath = path.join(PUBLIC_DIR, relPath);

        try {
          const buf = await downloadFile(info.url, destPath);
          const kind = sniffImageKind(buf);
          if (kind) {
            results[item.id] = relPath;
            resolvedCount++;
            console.log(`[${idx + 1}/${needsLogo.length}] ✓ DOWNLOADED: ${item.id} -> ${relPath} (${buf.length} bytes)`);
          } else {
            console.log(`[${idx + 1}/${needsLogo.length}] ✖ CORRUPTED: ${item.id}`);
          }
        } catch (err) {
          console.log(`[${idx + 1}/${needsLogo.length}] ✖ FAILED: ${item.id} (${err.message})`);
        }
      } else {
        console.log(`[${idx + 1}/${needsLogo.length}] ✖ NO URL for ${targetFile}`);
      }
    } else {
      console.log(`[${idx + 1}/${needsLogo.length}] ✖ UNRESOLVED: ${item.id} (${item.name})`);
      skippedCount++;
    }

    await sleep(200);
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Total needing logo: ${needsLogo.length}`);
  console.log(`Resolved: ${resolvedCount}`);
  console.log(`Unresolved / skipped: ${skippedCount}`);

  fs.writeFileSync(path.join(__dirname, "resolved-logos.json"), JSON.stringify(results, null, 2));
  console.log("Saved scripts/resolved-logos.json");
}

main().catch(console.error);
