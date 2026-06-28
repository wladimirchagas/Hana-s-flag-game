#!/usr/bin/env node
/**
 * Generates src/data/flagOverlayAspectRatios.ts — a map of every bundled flag file's
 * real-world aspect ratio (width / height), keyed by its path relative to
 * public/flags (e.g. "au.svg", "sub/MY/MY-13.svg", "mf.png") and, for the
 * curated historical-era flags under public/historical-flags, keyed with a
 * "historical-flags/" prefix (e.g. "historical-flags/roman-empire.png").
 *
 * WHY THIS EXISTS
 * ---------------
 * The Learn-mode flag overlay (WorldProgressMap / SubdivisionMap /
 * HistoricalMap) fills each landmass by tiling its flag into an SVG <pattern>
 * and painting the polygon with it. Each pattern tile must be sized to the
 * flag's TRUE aspect ratio so that `preserveAspectRatio="xMidYMid meet"` fills
 * the tile exactly (no letterbox) and the seamless tiling covers the whole
 * landmass. When the tile was hard-coded to 3:2, every flag that is NOT 3:2
 * (2:1 flags like Australia, Canada, the UK, and Malaysia's state flags; 1:1
 * flags like Switzerland; the 5:3 historical-era flags) got letterboxed inside
 * its tile, leaving the top/bottom (or side) edges of the landmass uncovered —
 * the "portion of some landmasses not covered" bug.
 *
 * Ratios come straight from each file's authoritative geometry (SVG viewBox,
 * PNG IHDR, JPEG SOF) — this script never invents proportions, exactly like
 * the other flag scripts. Re-run after adding/changing any bundled flag:
 *
 *   node scripts/build-flag-aspect-ratios.mjs           # write the data file
 *   node scripts/build-flag-aspect-ratios.mjs --check   # CI: fail if stale
 *
 * Only ratios that differ from the 3:2 default are emitted; the consumer
 * (src/lib/flagOverlayAspectRatio.ts) falls back to 1.5 for anything absent — so a
 * 3:2 flag added without regenerating still renders correctly, and CDN-only /
 * remote (historical) flags that this script cannot read simply keep the
 * default.
 */

import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const FLAGS_DIR = join(__dirname, "..", "public", "flags");
// Curated historical-era flags (Roman Empire, USSR, Qing dynasty, …) used by
// HistoricalMap's flag overlay. Keyed with a "historical-flags/" prefix so they
// never collide with national/subdivision flag keys.
const HISTORICAL_FLAGS_DIR = join(__dirname, "..", "public", "historical-flags");
const OUT_FILE = join(__dirname, "..", "src", "data", "flagOverlayAspectRatios.ts");

// The default the consumer assumes for any flag absent from the map. 3:2 is by
// far the most common real-world flag ratio, so omitting those keeps the data
// file (and the JS bundle) small.
const DEFAULT_RATIO = 1.5;
// Only emit a ratio that is meaningfully different from the default.
const EPSILON = 0.01;

/** Recursively collect flag image files under a directory. */
async function collectFlags(dir, rel = "") {
  const entries = await readdir(dir, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const full = join(dir, entry.name);
    const relPath = rel ? `${rel}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      results.push(...(await collectFlags(full, relPath)));
    } else if (/\.(svg|png|jpe?g)$/i.test(entry.name)) {
      results.push({ full, relPath });
    }
  }
  return results;
}

/** width/height from an SVG viewBox (or width/height attrs as a fallback). */
function svgRatio(content) {
  const head = content.slice(0, 2048);
  const vb = head.match(/viewBox=["']\s*([-\d.eE]+)\s+([-\d.eE]+)\s+([-\d.eE]+)\s+([-\d.eE]+)\s*["']/);
  if (vb) {
    const w = parseFloat(vb[3]);
    const h = parseFloat(vb[4]);
    if (w > 0 && h > 0) return w / h;
  }
  const wm = head.match(/\bwidth=["']\s*([\d.]+)/);
  const hm = head.match(/\bheight=["']\s*([\d.]+)/);
  if (wm && hm) {
    const w = parseFloat(wm[1]);
    const h = parseFloat(hm[1]);
    if (w > 0 && h > 0) return w / h;
  }
  return null;
}

/** width/height from a PNG IHDR chunk. */
function pngRatio(buf) {
  // 8-byte signature, then IHDR length(4)+type(4), then width(4)+height(4) BE.
  if (buf.length < 24) return null;
  if (buf.toString("ascii", 12, 16) !== "IHDR") return null;
  const w = buf.readUInt32BE(16);
  const h = buf.readUInt32BE(20);
  return w > 0 && h > 0 ? w / h : null;
}

/** width/height from a JPEG SOF marker. */
function jpegRatio(buf) {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let off = 2;
  while (off + 9 < buf.length) {
    if (buf[off] !== 0xff) { off++; continue; }
    const marker = buf[off + 1];
    // SOF0..SOF15 carry the frame dimensions, except the non-SOF markers
    // C4 (DHT), C8 (JPG) and CC (DAC).
    const isSof =
      marker >= 0xc0 && marker <= 0xcf &&
      marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    const segLen = buf.readUInt16BE(off + 2);
    if (isSof) {
      const h = buf.readUInt16BE(off + 5);
      const w = buf.readUInt16BE(off + 7);
      return w > 0 && h > 0 ? w / h : null;
    }
    off += 2 + segLen;
  }
  return null;
}

async function buildMap() {
  // National/territory/subdivision flags keep their bare path key ("au.svg",
  // "sub/MY/MY-13.svg"); historical-era flags get a "historical-flags/" prefix.
  const files = [
    ...(await collectFlags(FLAGS_DIR)),
    ...(await collectFlags(HISTORICAL_FLAGS_DIR)).map((f) => ({
      ...f,
      relPath: `historical-flags/${f.relPath}`,
    })),
  ];
  const map = {};
  const skipped = [];
  for (const { full, relPath } of files) {
    let ratio = null;
    if (/\.svg$/i.test(relPath)) {
      ratio = svgRatio(await readFile(full, "utf8"));
    } else if (/\.png$/i.test(relPath)) {
      ratio = pngRatio(await readFile(full));
    } else if (/\.jpe?g$/i.test(relPath)) {
      ratio = jpegRatio(await readFile(full));
    }
    if (ratio == null || !isFinite(ratio)) {
      skipped.push(relPath);
      continue;
    }
    if (Math.abs(ratio - DEFAULT_RATIO) > EPSILON) {
      map[relPath] = Math.round(ratio * 10000) / 10000;
    }
  }
  return { map, total: files.length, skipped };
}

function renderFile(map) {
  const keys = Object.keys(map).sort();
  const lines = keys.map((k) => `  ${JSON.stringify(k)}: ${map[k]},`);
  return (
    `// AUTO-GENERATED by scripts/build-flag-aspect-ratios.mjs — do not edit by hand.\n` +
    `//\n` +
    `// Maps each bundled flag file to its real-world aspect ratio (width /\n` +
    `// height), read from the file's own viewBox / pixel dimensions. Keys are\n` +
    `// the path relative to public/flags ("au.svg", "sub/MY/MY-13.svg"), plus a\n` +
    `// "historical-flags/" prefix for the curated historical-era flags. Only\n` +
    `// ratios that differ from the 3:2 default are listed; see\n` +
    `// src/lib/flagOverlayAspectRatio.ts for the lookup + default.\n` +
    `//\n` +
    `// The flag overlay uses these to size each <pattern> tile to the flag's\n` +
    `// true proportions so the tile fully covers the landmass (no letterbox\n` +
    `// gaps) without distorting or cropping the flag. Regenerate after any flag\n` +
    `// change: node scripts/build-flag-aspect-ratios.mjs\n` +
    `\n` +
    `export const FLAG_OVERLAY_ASPECT_RATIOS: Readonly<Record<string, number>> = {\n` +
    `${lines.join("\n")}\n` +
    `};\n`
  );
}

async function main() {
  const check = process.argv.includes("--check");
  const { map, total, skipped } = await buildMap();
  const expected = renderFile(map);

  if (check) {
    let current = "";
    try {
      current = await readFile(OUT_FILE, "utf8");
    } catch {
      /* missing file → treated as stale below */
    }
    if (current !== expected) {
      console.error(
        `\n✗ src/data/flagOverlayAspectRatios.ts is out of date.\n` +
        `  Run: node scripts/build-flag-aspect-ratios.mjs\n`,
      );
      process.exit(1);
    }
    console.log(
      `✓ flagAspectRatios.ts is up to date ` +
      `(${Object.keys(map).length} non-default of ${total} flags).`,
    );
    return;
  }

  await writeFile(OUT_FILE, expected, "utf8");
  console.log(
    `✓ Wrote ${Object.keys(map).length} non-default flag ratios ` +
    `(of ${total} flags) to src/data/flagOverlayAspectRatios.ts.`,
  );
  if (skipped.length > 0) {
    console.warn(
      `  ⚠ Could not read dimensions for ${skipped.length} file(s): ` +
      `${skipped.slice(0, 10).join(", ")}${skipped.length > 10 ? "…" : ""}`,
    );
  }
}

main().catch((err) => { console.error(err); process.exit(1); });
