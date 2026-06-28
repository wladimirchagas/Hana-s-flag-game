#!/usr/bin/env node
/**
 * Trims fully-transparent margins from bundled raster flag files (PNG/JPEG)
 * under public/flags and public/historical-flags, in place.
 *
 * WHY THIS EXISTS
 * ---------------
 * Several curated raster flags were saved on a larger canvas than the flag
 * itself, leaving a transparent border around the artwork (e.g. the USSR flag
 * is the real 1:2 design centred on a 320×192 / 5:3 canvas, so 16px of
 * transparent padding sits above and below it). The Learn-mode flag overlay
 * tiles each flag into an SVG <pattern> sized to the flag's aspect ratio and
 * fills the landmass with `preserveAspectRatio="xMidYMid meet"`. When the
 * stored ratio is the PADDED canvas ratio rather than the flag's true ratio,
 * `meet` letterboxes the artwork inside its tile and the transparent padding
 * lets the land show through as an uncovered fringe along the polygon edges —
 * the "northern/southern extremities not covered" bug on the historical maps.
 *
 * Trimming the transparent border so the image edges ARE the flag edges makes
 * the file's own geometry (read by build-flag-aspect-ratios.mjs) equal to the
 * flag's TRUE aspect ratio, so the tile fills exactly and the whole landmass is
 * covered — with no distortion and no cropping. This removes empty canvas only;
 * it never alters a single flag pixel (it is the raster analogue of the
 * viewBox coordinate-rescale already permitted for SVGs), so it does not
 * violate the "never modify flag content" rule.
 *
 * Idempotent: a file with no transparent border is left byte-for-byte unchanged.
 *
 *   node scripts/trim-flag-transparency.mjs            # trim in place
 *   node scripts/trim-flag-transparency.mjs --check    # CI: fail if any file
 *                                                        # still has a border
 *
 * After trimming, re-run: node scripts/build-flag-aspect-ratios.mjs
 */

import sharp from "sharp";
import { readdir, writeFile } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const DIRS = [
  join(__dirname, "..", "public", "flags"),
  join(__dirname, "..", "public", "historical-flags"),
];

// Alpha at or below this is treated as "transparent border" when finding the
// content box. Kept low so faint anti-aliased flag edges are always preserved.
const ALPHA_THRESHOLD = 8;

async function collect(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await collect(full)));
    else if (/\.(png|jpe?g)$/i.test(e.name)) out.push(full);
  }
  return out;
}

/** Returns the content bounding box ({left,top,width,height}) of non-transparent
 *  pixels, or null if the image has no alpha or is fully opaque to its edges. */
async function contentBox(file) {
  const meta = await sharp(file).metadata();
  if (!meta.hasAlpha) return null;
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;
  let minX = w, minY = h, maxX = -1, maxY = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const a = data[(y * w + x) * c + (c - 1)];
      if (a > ALPHA_THRESHOLD) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return null; // fully transparent — leave it alone
  const box = { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
  // Already tight to the canvas → nothing to trim.
  if (box.left === 0 && box.top === 0 && box.width === w && box.height === h) return null;
  return box;
}

async function main() {
  const check = process.argv.includes("--check");
  const files = (await Promise.all(DIRS.map(collect))).flat();
  const changed = [];
  for (const file of files) {
    const box = await contentBox(file);
    if (!box) continue;
    changed.push(file);
    if (!check) {
      const buf = await sharp(file).extract(box).toBuffer();
      await writeFile(file, buf);
    }
  }
  if (check) {
    if (changed.length > 0) {
      console.error(
        `\n✗ ${changed.length} raster flag(s) still have a transparent border:\n` +
          changed.map((f) => `  ${f}`).join("\n") +
          `\n  Run: node scripts/trim-flag-transparency.mjs\n`,
      );
      process.exit(1);
    }
    console.log(`✓ No raster flag has a transparent border (${files.length} checked).`);
    return;
  }
  console.log(
    changed.length === 0
      ? `✓ Nothing to trim (${files.length} raster flags already tight).`
      : `✓ Trimmed transparent borders from ${changed.length} flag(s):\n` +
          changed.map((f) => `  ${f}`).join("\n"),
  );
}

main().catch((err) => { console.error(err); process.exit(1); });
