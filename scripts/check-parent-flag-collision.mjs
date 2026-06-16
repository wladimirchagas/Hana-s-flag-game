// Fails if any subdivision/territory flag is visually the SAME image as its
// parent nation's flag.
//
// WHY THIS EXISTS (hard rule — see CLAUDE.md "Nation subnational view"):
// A subdivision must NEVER display the parent nation's flag dressed up as the
// subdivision's own flag. It is misleading and — when the subdivision is also
// labelled "(unofficial flag)" / "Flag not officially recognised by …" — plainly
// wrong. This has shipped repeatedly because the bad file comes from an
// authoritative national-flag source (lipis/flag-icons serves the French
// Tricolour for `mf`; hampusborgos serves the Union Jack for `gb`/`sh`), so it
// passes every other check. A byte/text comparison does NOT catch it: the bad
// subdivision file and the parent file usually come from different sources, with
// a different viewBox and slightly different hex shades.
//
// HOW IT WORKS:
// Each flag is reduced to a perceptual difference hash built from BOTH the
// horizontal and the vertical brightness gradient of a 9x9 sample, on the
// grayscale image and on each RGB channel (8 hash bit-planes => 576 bits). Using
// both gradient directions AND the colour channels is essential: a horizontal-only
// hash collapses every horizontally-striped flag to the same value (it has no
// left-right gradient), so e.g. Dagestan (green/blue/red) would falsely "match"
// the Russian Tricolour (white/blue/red). The Hamming distance between a
// subdivision flag's hash and its parent's hash measures structural similarity,
// independent of scale, file format, or minor colour-shade differences. The hash
// keys on LAYOUT + COLOUR STRUCTURE, so two blue ensigns from the same colonial
// family (Cook Islands vs New Zealand — shared canton, different fly stars) stay
// far apart, while the same design in different shades (French Tricolour)
// collapses to ~0.
//
// TWO FLAG SETS, TWO THRESHOLDS:
//   1. LOCAL_FLAG_OVERRIDES — the hand-curated list where these bugs are repeatedly
//      introduced. Checked strictly. Known-bad flags scored GB-SH=0 and FR-MF=18;
//      the nearest legitimate flag scored 125 — so a moderate threshold catches
//      "same design, different shades" copies (like FR-MF) with huge margin.
//   2. public/flags/sub/** — bulk-imported subdivision flags. Here a legitimate
//      distinct flag (e.g. Opole PL-16, a yellow/blue bicolour) can score as low as
//      18 against its parent purely from a similar light/dark layout, which is
//      indistinguishable by Hamming distance from a different-shade national-flag
//      copy. So this set is checked only for NEAR-IDENTICAL duplicates (the real
//      bulk-import failure mode: the wrong file is the national flag verbatim,
//      scoring ~0). Confirmed duplicates (Bosnia/Nigeria flags) scored 0; the
//      nearest legitimate flag scored 18.
// Re-run scripts calibration if you change the hash or the flag sets.

import sharp from "sharp";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const FLAGS_DIR = join(projectRoot, "public", "flags");

// Maximum Hamming distance (out of 576 bits) at which two flags are judged the
// SAME image. See the calibration note above for why the two sets differ.
const OVERRIDE_THRESHOLD = 30; // curated overrides: catches FR-MF (18); clears legit (>=125)
const SUB_THRESHOLD = 12; // bulk sub/**: catches verbatim duplicates (0); clears legit (>=18)

/** Parse the local-file entries of LOCAL_FLAG_OVERRIDES (code -> public/flags/PATH). */
function parseOverrides() {
  const src = readFileSync(join(projectRoot, "src", "api", "subdivisions.ts"), "utf8");
  const re = /"([A-Z0-9~_-]+)":\s*`\$\{BASE\}flags\/([^`]+)`/g;
  const out = [];
  let m;
  while ((m = re.exec(src))) out.push({ code: m[1], file: join("public", "flags", m[2]) });
  return out;
}

/** All bundled subdivision flag files under public/flags/sub/ (code derived from filename). */
function collectSubFlags() {
  const subDir = join(FLAGS_DIR, "sub");
  if (!existsSync(subDir)) return [];
  const out = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith(".")) continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(svg|png|jpg|jpeg)$/i.test(entry.name)) {
        const code = entry.name.replace(/\.(svg|png|jpg|jpeg)$/i, "");
        out.push({ code, file: full.replace(projectRoot + "/", "") });
      }
    }
  };
  walk(subDir);
  return out;
}

/** Difference hash: grayscale + R + G + B planes, horizontal AND vertical gradient
 *  on a 9x9 sample (4 planes x 2 directions x 72 bits = 576 bits). */
const N = 9;
async function dHash(path) {
  const opts = { density: 150, limitInputPixels: false };
  const base = sharp(path, opts).resize(N, N, { fit: "fill" }).flatten({ background: "#ffffff" });
  const gray = await base.clone().grayscale().raw().toBuffer();
  const rgb = await base.clone().removeAlpha().raw().toBuffer();

  const planes = [Array.from(gray)];
  for (let c = 0; c < 3; c++) {
    const p = [];
    for (let i = 0; i < rgb.length; i += 3) p.push(rgb[i + c]);
    planes.push(p);
  }
  const at = (p, r, c) => p[r * N + c];
  const bits = [];
  for (const p of planes) {
    // horizontal gradient: each cell vs the one to its right
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N - 1; c++) bits.push(at(p, r, c) < at(p, r, c + 1) ? 1 : 0);
    }
    // vertical gradient: each cell vs the one below it
    for (let c = 0; c < N; c++) {
      for (let r = 0; r < N - 1; r++) bits.push(at(p, r, c) < at(p, r + 1, c) ? 1 : 0);
    }
  }
  return bits;
}

function hamming(a, b) {
  let d = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++;
  return d;
}

function parentFlagPath(code) {
  const cc = code.split("-")[0].toLowerCase();
  for (const ext of ["svg", "png"]) {
    const p = join(FLAGS_DIR, `${cc}.${ext}`);
    if (existsSync(p)) return p;
  }
  return null;
}

async function checkSet(items, threshold, errors) {
  let compared = 0;
  for (const { code, file } of items) {
    const subPath = join(projectRoot, file);
    const parentPath = parentFlagPath(code);
    if (!parentPath || !existsSync(subPath)) continue; // missing files covered elsewhere
    // Skip a file that IS its own parent (e.g. a national-level code).
    if (parentPath === subPath) continue;
    let subHash, parentHash;
    try {
      [subHash, parentHash] = await Promise.all([dHash(subPath), dHash(parentPath)]);
    } catch (e) {
      errors.push(`  ${code} (${file}): could not rasterise — ${e.message}`);
      continue;
    }
    compared++;
    const dist = hamming(subHash, parentHash);
    if (dist < threshold) {
      errors.push(
        `  ${code} → ${file} is the parent nation's flag ` +
          `(${parentPath.split("/").pop()}); perceptual distance ${dist} < ${threshold}.`,
      );
    }
  }
  return compared;
}

async function main() {
  const errors = [];
  let compared = 0;
  compared += await checkSet(parseOverrides(), OVERRIDE_THRESHOLD, errors);
  compared += await checkSet(collectSubFlags(), SUB_THRESHOLD, errors);

  if (errors.length > 0) {
    console.error(
      `✗ Subdivision flag(s) identical to the parent nation's flag:\n${errors.join("\n")}\n\n` +
        `A subdivision must NEVER show its parent nation's flag (see CLAUDE.md).\n` +
        `Fix: bundle the subdivision's OWN flag from an authoritative source, or — if no\n` +
        `accessible source exists — remove the LOCAL_FLAG_OVERRIDES entry and add the code\n` +
        `to SUPPRESSED_SUBDIVISION_FLAGS so NO flag is shown. A missing flag beats the wrong one.`,
    );
    process.exit(1);
  }

  console.log(`✓ ${compared} subdivision flags checked; none duplicate their parent nation's flag.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
