// Download the flags shown by the Learn-mode "National flags" tab.
//
// Every image under public/national-flags/ must come from an authoritative source —
// the same rule as every other flag in this repo ("never generate, invent or approximate
// flag SVG content"). scripts/data/national-flag-sources.json is the provenance record:
// it maps each local file to the exact Wikimedia Commons filename it was fetched from,
// with the fetch date and a sha256 of the bytes, so any bundled flag can be traced back
// and re-verified later.
//
// Entries that carry `reuse` instead of `commons` point at a file ALREADY bundled for
// another feature (the country's current flag, or an era-map flag under
// public/historical-flags/) and are skipped here — nothing is ever duplicated on disk.
//
//   node scripts/download-national-flags.mjs            → fetch anything missing
//   node scripts/download-national-flags.mjs --force    → re-fetch everything
//   node scripts/download-national-flags.mjs --check    → verify bundled bytes match the
//                                                        recorded sha256, fetch nothing
//   node scripts/download-national-flags.mjs BR AU      → limit to these countries

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const R = (p) => resolve(__dirname, p);
const MANIFEST = R("data/national-flag-sources.json");
const OUT_DIR = R("../public/national-flags");
const UA = "HanaFlagGame/1.0 (national-flags tab; https://github.com/wladimirchagas/hana-s-flag-game)";

const args = process.argv.slice(2);
const force = args.includes("--force");
const checkOnly = args.includes("--check");
const only = new Set(args.filter((a) => /^[A-Z]{2}$/.test(a)));

const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
const sha = (buf) => createHash("sha256").update(buf).digest("hex");

/** Direct upload.wikimedia.org URL for a Commons filename (md5 path sharding). */
function commonsUrl(filename) {
  const name = filename.replace(/ /g, "_");
  const md5 = createHash("md5").update(name, "utf8").digest("hex");
  return `https://upload.wikimedia.org/wikipedia/commons/${md5[0]}/${md5.slice(0, 2)}/${encodeURIComponent(name)}`;
}

/**
 * Resolve a Commons title through the API so a page MOVED since the manifest was
 * written still fetches (Commons redirects "Presidential Standard of Brazil.svg"
 * → "Flag of the President of Brazil.svg"). Returns the canonical title, or null
 * when the API is unreachable/rate-limited — in which case the caller falls back
 * to the md5 path, which is correct whenever the title has NOT moved.
 *
 * Rate limits are retried with backoff rather than treated as a miss: a 429 says
 * nothing about whether the file exists.
 */
async function resolveCommonsTitle(filename) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&format=json&redirects=1&prop=imageinfo&iiprop=url&titles=" +
    encodeURIComponent(`File:${filename}`);
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.status === 429) {
      await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
      continue;
    }
    if (!res.ok) return null;
    let json;
    try {
      json = await res.json();
    } catch {
      return null;
    }
    const pages = json?.query?.pages;
    if (!pages) return null;
    const page = Object.values(pages)[0];
    if (!page || page.missing !== undefined) return undefined; // definitively absent
    return String(page.title).replace(/^File:/, "");
  }
  return null;
}

let failed = 0;
let fetched = 0;
let verified = 0;
let reused = 0;

for (const [cc, country] of Object.entries(manifest.countries)) {
  if (only.size > 0 && !only.has(cc)) continue;

  for (const entry of country.flags) {
    if (entry.reuse) {
      // Bundled elsewhere (flags/xx.svg or historical-flags/*) — presence is
      // verified by check-national-flags.mjs, which knows both roots.
      reused++;
      continue;
    }
    if (!entry.commons || !entry.file) {
      console.error(`✗ ${cc} ${entry.id}: needs either "reuse" or both "commons" and "file".`);
      failed++;
      continue;
    }

    const dest = resolve(OUT_DIR, entry.file);
    const have = existsSync(dest);

    if (have && !force) {
      const digest = sha(readFileSync(dest));
      if (entry.sha256 && digest !== entry.sha256) {
        console.error(`✗ ${entry.file}: sha256 mismatch — bundled bytes differ from the recorded source.`);
        failed++;
      } else if (!entry.sha256) {
        console.error(`✗ ${entry.file}: bundled but the manifest records no sha256.`);
        failed++;
      } else {
        verified++;
      }
      continue;
    }
    if (checkOnly) {
      console.error(`✗ ${entry.file}: not bundled (manifest expects it from "${entry.commons}").`);
      failed++;
      continue;
    }

    // upload.wikimedia.org rate-limits bulk fetches; a 429 says nothing about
    // whether the file exists, so back off and retry rather than record a miss.
    let res = null;
    for (let attempt = 0; attempt < 5; attempt++) {
      res = await fetch(commonsUrl(entry.commons), { headers: { "User-Agent": UA } });
      if (res.status !== 429 && res.status !== 503) break;
      await new Promise((r) => setTimeout(r, 3000 * (attempt + 1)));
    }
    if (!res.ok) {
      // The title may have been renamed on Commons since the manifest was written.
      const canonical = await resolveCommonsTitle(entry.commons);
      if (canonical && canonical !== entry.commons) {
        res = await fetch(commonsUrl(canonical), { headers: { "User-Agent": UA } });
        if (res.ok) {
          console.log(`  ↪ "${entry.commons}" now redirects to "${canonical}"`);
          entry.commons = canonical;
        }
      }
    }
    if (!res.ok) {
      console.error(`✗ ${entry.file}: HTTP ${res.status} for "${entry.commons}"`);
      failed++;
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const isPng = entry.file.endsWith(".png");
    const looksSvg = buf.slice(0, 400).toString("utf8").includes("<svg");
    const looksPng = buf.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
    if (isPng ? !looksPng : !looksSvg) {
      console.error(`✗ ${entry.file}: fetched bytes are not ${isPng ? "a PNG" : "an SVG"}.`);
      failed++;
      continue;
    }
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, buf);
    entry.sha256 = sha(buf);
    entry.fetched = new Date().toISOString().slice(0, 10);
    fetched++;
    console.log(`✓ ${entry.file}  ←  ${entry.commons}`);
    await new Promise((r) => setTimeout(r, 900));
  }
}

if (fetched > 0) {
  writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
}

console.log(`\n${fetched} fetched, ${verified} verified, ${reused} reused from other features, ${failed} failed.`);
process.exit(failed > 0 ? 1 : 0);
