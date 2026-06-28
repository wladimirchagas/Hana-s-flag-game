// Fails if any bundled RASTER flag is a broken/blank/degraded image — i.e. a
// corrupt thumbnail or a solid-colour stub with no real flag content.
//
// WHY THIS EXISTS (see CLAUDE.md "Never trust a bulk-imported subdivision flag"):
// The bulk subdivision-flag source (amckenna41/iso3166-flags) occasionally serves
// a broken file that is a VALID image and is NOT the parent nation's flag, so it
// slips past every existing guard:
//   • the proportions check only inspects SVG viewBoxes (a raster has none);
//   • the parent-flag-collision check only fires when the file LOOKS LIKE the
//     parent flag — a blurry blob or a random solid colour does not.
// This shipped as the Mae Hong Son (TH-58) bug: the CDN served a 105×90 blurry
// thumbnail that rendered as an unrecognisable smudge in the Learn widget. The
// same audit found Zamfara (NG-ZA, a 111-byte solid-green field) and Adamawa
// (NG-AD, a near-solid-green stub).
//
// HOW IT WORKS:
// For every bundled raster flag (.png/.jpg/.jpeg/.gif under public/flags) it
// checks two objective, format-agnostic signals:
//   1. MIN DIMENSION — a real flag asset is never a tiny thumbnail. TH-58 was
//      90px on its short side; the smallest legitimate raster flag bundled is
//      150px. Threshold 120 sits with a wide margin between the two.
//   2. DETAIL VARIANCE — a real flag is never a single flat colour. Reduced to
//      16×16 grayscale (flattened on white), a flag's pixel standard deviation
//      measures how much content it carries. NG-ZA scored 0.0 and NG-AD 0.5
//      (solid colour); the lowest-detail legitimate raster flag scored 8.8.
//      Threshold 5 catches the stubs with a wide margin.
//
// SVGs are deliberately NOT checked: they have no intrinsic pixel dimensions, and
// rasterising them here is unreliable (sharp/resvg cannot render the embedded
// coats of arms in several legitimate flags — e.g. Bolivia BO-C/BO-O — which
// would then false-positive as "blank"). SVG content is vector and does not
// suffer the thumbnail-degradation failure mode this check targets.
//
// If a flag trips this check, FIX THE FLAG, never weaken the thresholds: re-source
// the real flag from an authoritative source, or (if none is accessible) delete
// the file and add the code to SUPPRESSED_SUBDIVISION_FLAGS — a blank flag is
// always wrong (see the "never invent flag content" hard rule in CLAUDE.md).

import sharp from "sharp";
import { existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const FLAGS_DIR = join(projectRoot, "public", "flags");

// Calibration (see header). Bad cases: TH-58 min-dim 90; NG-ZA std 0.0, NG-AD 0.5.
// Nearest legitimate raster flags: min-dim 150, std 8.8. Thresholds sit between.
const MIN_DIMENSION = 120; // px on the shorter side
const MIN_DETAIL_STD = 5; // 0–255 grayscale std over a 16×16 sample

/** All bundled RASTER flag files under public/flags (recursive). */
function collectRasterFlags() {
  if (!existsSync(FLAGS_DIR)) return [];
  const out = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith(".")) continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(png|jpg|jpeg|gif)$/i.test(entry.name)) {
        out.push(full.replace(projectRoot + "/", ""));
      }
    }
  };
  walk(FLAGS_DIR);
  return out.sort();
}

/** Standard deviation of a 16×16 grayscale sample (flattened on white). */
async function detailStd(path) {
  const buf = await sharp(path)
    .flatten({ background: "#ffffff" })
    .grayscale()
    .resize(16, 16, { fit: "fill" })
    .raw()
    .toBuffer();
  let sum = 0;
  for (const v of buf) sum += v;
  const mean = sum / buf.length;
  let variance = 0;
  for (const v of buf) variance += (v - mean) ** 2;
  return Math.sqrt(variance / buf.length);
}

async function main() {
  const files = collectRasterFlags();
  const errors = [];

  for (const file of files) {
    const abs = join(projectRoot, file);
    let meta;
    try {
      meta = await sharp(abs).metadata();
    } catch (err) {
      errors.push(`  ${file} — could not be read as an image (${err.message}).`);
      continue;
    }
    const minDim = Math.min(meta.width ?? 0, meta.height ?? 0);
    if (minDim < MIN_DIMENSION) {
      errors.push(
        `  ${file} — ${meta.width}×${meta.height} (${minDim}px short side, ${statSync(abs).size}B): ` +
          `too small (min ${MIN_DIMENSION}px). Looks like a degraded thumbnail, not a real flag.`,
      );
      continue; // a tiny image's detail score is meaningless; one error is enough
    }
    const std = await detailStd(abs);
    if (std < MIN_DETAIL_STD) {
      errors.push(
        `  ${file} — detail std ${std.toFixed(1)} (min ${MIN_DETAIL_STD}): ` +
          `near-blank / solid colour, no flag content.`,
      );
    }
  }

  if (errors.length > 0) {
    console.error(
      `\n✗ Flag image-quality check failed — ${errors.length} broken flag image(s):\n`,
    );
    console.error(errors.join("\n"));
    console.error(
      "\nFix the flag, never the threshold: re-source the real flag from an authoritative\n" +
        "source, or delete the file and add the code to SUPPRESSED_SUBDIVISION_FLAGS.\n",
    );
    process.exit(1);
  }

  console.log(`✓ Flag image-quality check passed (${files.length} raster flags).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
