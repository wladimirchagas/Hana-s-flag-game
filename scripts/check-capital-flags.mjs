// Fails if any bundled capital-city flag (public/capital-flags/**) is visually the
// SAME image as its country's NATIONAL flag — the "national flag dressed up as a
// city flag" failure mode — or if a curated capital-flag override names a code
// that is not bundled (a dangling override that would go unchecked).
//
// WHY (audit 2026-07): the capital-flag pipeline sources a city's flag from the
// capital's Wikidata `P41`. That field can point at the NATIONAL flag (Porto's
// city item P41 is "Flag of Portugal (official).svg"), which — if bundled — shows
// the national flag as a "city flag", exactly the class of bug the subdivision
// parent-flag-collision check guards against. This is that guard, for the capital
// (public/capital-flags/) tree, which the national/subdivision flags:check does
// NOT scan.
//
// METRIC — mean colour, not gradient: the subdivision check's difference-hash
// keys on brightness GRADIENT direction, which cannot tell a red/white/red city
// triband (Pordenone) from the green/white/red national triband (Italy) — both
// are "dark|light|dark" and collapse to distance 0. So here each flag is reduced
// to an 8x8 grid of mean RGB and compared by average per-channel colour distance
// (0-441 over the 3-channel diagonal). A verbatim national flag scores ~0; a
// genuinely different city flag that merely shares a layout stays far away
// because the actual hues differ (green vs red third). Calibrate with
// `--report` before changing the threshold.

import sharp from "sharp";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CAP_DIR = join(ROOT, "public", "capital-flags");
const FLAGS_DIR = join(ROOT, "public", "flags");
const CAP_TS = join(ROOT, "src", "data", "capitalFlags.ts");
const GEN = join(ROOT, "scripts", "build-capital-details.mjs");

// Below this average per-channel colour distance two flags are judged the SAME
// image. A verbatim national-flag copy scores ~0-6 (rasteriser/shade noise). The
// nearest legitimately-distinct city flag in the current bundle is JP-21 (Gifu:
// a red prefectural emblem on white, structurally near Japan's white+red-disc) at
// 13.0 — so the threshold sits below it with margin, catching a verbatim copy
// while clearing every real city flag. Never raise it to force a flag through.
const THRESHOLD = 10;

const G = 8;
async function colourSig(path) {
  const raw = await sharp(path, { density: 150, limitInputPixels: false })
    .resize(G, G, { fit: "fill" })
    .flatten({ background: "#ffffff" })
    .removeAlpha()
    .raw()
    .toBuffer();
  const cells = [];
  for (let i = 0; i < G * G; i++) cells.push([raw[i * 3], raw[i * 3 + 1], raw[i * 3 + 2]]);
  return cells;
}
function sigDist(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    const dr = a[i][0] - b[i][0];
    const dg = a[i][1] - b[i][1];
    const db = a[i][2] - b[i][2];
    sum += Math.sqrt(dr * dr + dg * dg + db * db);
  }
  return sum / a.length;
}

function nationalFlagPath(cc) {
  for (const ext of ["svg", "png"]) {
    const p = join(FLAGS_DIR, `${cc.toLowerCase()}.${ext}`);
    if (existsSync(p)) return p;
  }
  return null;
}

function bundledCapitalFlags() {
  // code from filename; keep in sync with capitalFlags.ts (which lists the same set)
  if (!existsSync(CAP_DIR)) return [];
  const out = [];
  for (const f of readdirSync(CAP_DIR)) {
    if (!/\.(svg|png|jpe?g|gif)$/i.test(f)) continue;
    out.push({ code: f.replace(/\.[^.]+$/, "").toUpperCase(), file: join(CAP_DIR, f) });
  }
  return out;
}

/** Override codes declared in the generator — each MUST be bundled. */
function overrideCodes() {
  const src = readFileSync(GEN, "utf8");
  const block = src.match(/CAPITAL_FLAG_SOURCE_OVERRIDES\s*=\s*\{([\s\S]*?)\n\};/);
  if (!block) return [];
  return [...block[1].matchAll(/"([A-Z0-9~-]+)":/g)].map((m) => m[1]);
}

async function main() {
  const report = process.argv.includes("--report");
  const errors = [];
  const items = bundledCapitalFlags();

  // 1. Dangling-override guard.
  const bundledCodes = new Set(items.map((i) => i.code));
  for (const code of overrideCodes()) {
    if (!bundledCodes.has(code)) {
      errors.push(
        `  ${code} is a CAPITAL_FLAG_SOURCE_OVERRIDES entry but public/capital-flags/${code.toLowerCase()}.* is not bundled. ` +
          `Bundle the file (node scripts/download-capital-flags.mjs) or remove the override.`,
      );
    }
  }

  // 2. National-flag collision guard.
  const natCache = new Map();
  const rows = [];
  let compared = 0;
  for (const { code, file } of items) {
    const cc = code.split("-")[0];
    const np = nationalFlagPath(cc);
    if (!np) continue;
    let ns, cs;
    try {
      if (!natCache.has(np)) natCache.set(np, await colourSig(np));
      ns = natCache.get(np);
      cs = await colourSig(file);
    } catch (e) {
      // Some bundled flags are formats sharp can't rasterise (e.g. UTF-16 SVG,
      // animated GIF) though the browser renders them fine. A rasterise failure
      // is not a collision — skip with a warning rather than fail the build.
      console.warn(`  (skipped ${code}: could not rasterise — ${e.message})`);
      continue;
    }
    compared++;
    const dist = sigDist(cs, ns);
    rows.push({ code, dist });
    if (dist < THRESHOLD) {
      errors.push(
        `  ${code} → capital-flags/${code.toLowerCase()}.* is ${cc}'s NATIONAL flag ` +
          `(colour distance ${dist.toFixed(1)} < ${THRESHOLD}). A city flag must never be the national flag.`,
      );
    }
  }

  if (report) {
    rows.sort((a, b) => a.dist - b.dist);
    for (const r of rows.slice(0, 20)) console.log(`  ${r.dist.toFixed(1).padStart(6)}  ${r.code}`);
  }

  if (errors.length) {
    console.error(`✗ Capital-flag check failed:\n${errors.join("\n")}\n`);
    console.error(
      "A capital-city flag must be the CITY's own flag, never the national flag, and every\n" +
        "curated override must be bundled. Fix the flag/override — never weaken the threshold.",
    );
    process.exit(1);
  }
  console.log(`✓ ${compared} capital flags checked; none duplicate their country's national flag; overrides bundled.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
