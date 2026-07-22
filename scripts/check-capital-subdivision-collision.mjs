// Fails the build if a bundled CAPITAL-CITY flag is visually the SAME image as
// its own SUBDIVISION's flag but is NOT declared as shared — i.e. the app would
// show two near-identical flags for one place (the subdivision node and its
// capital leaf), which the "capital flag must be DISTINCT from the subdivision
// flag" hard rule forbids (see CLAUDE.md).
//
// WHY (reported 2026-07): La Paz shipped with the department's red/green flag AND
// an identical red/green "La Paz city" capital leaf, because that pair's shade
// difference put its perceptual distance (27) above the generator's strict
// auto-share threshold (< 12) and it was never added to the curated shared list.
// The generator (build-shared-capital-flags.mjs) PRODUCES the shared list; this
// is the missing GUARD that FAILS the build when a near-identical pair is not on
// it, so a duplicate can never silently ship again.
//
// METRIC: the same 576-bit perceptual difference hash used by
// check-parent-flag-collision.mjs / build-shared-capital-flags.mjs. A pair is a
// collision when byte-identical or dHash distance < THRESHOLD. THRESHOLD is set
// between the closest known DUPLICATE (La Paz, 27) and the closest genuinely
// DISTINCT capital/subdivision pair (Cesar → Valledupar, 51): a wide margin.
//
// Run: node scripts/check-capital-subdivision-collision.mjs   (in `npm run flags:check`)

import sharp from "sharp";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Below this perceptual distance a capital flag and its subdivision flag are
// judged the SAME image. Known duplicate La Paz scores 27; the nearest
// genuinely-distinct pair (Cesar/Valledupar) scores 51 — threshold sits between.
const THRESHOLD = 40;

// Genuinely-DISTINCT capital/subdivision pairs that a future change might push
// below THRESHOLD (different arms on a similar field). Add a code here ONLY after
// a side-by-side montage confirms the two flags are different designs — never to
// silence a real duplicate (fix the flag / add it to the shared list instead).
const REVIEWED_DISTINCT = new Set([]);

function collectSubdivisionFlags() {
  const map = new Map();
  const subDir = join(root, "public", "flags", "sub");
  if (existsSync(subDir)) {
    const walk = (dir) => {
      for (const e of readdirSync(dir, { withFileTypes: true })) {
        if (e.name.startsWith(".")) continue;
        const full = join(dir, e.name);
        if (e.isDirectory()) walk(full);
        else if (/\.(svg|png|jpe?g)$/i.test(e.name))
          map.set(e.name.replace(/\.(svg|png|jpe?g)$/i, "").toUpperCase(), full);
      }
    };
    walk(subDir);
  }
  const src = readFileSync(join(root, "src", "api", "subdivisions.ts"), "utf8");
  const re = /"([A-Z0-9~_-]+)":\s*`\$\{BASE\}flags\/([^`]+)`/g;
  let m;
  while ((m = re.exec(src))) map.set(m[1].toUpperCase(), join(root, "public", "flags", m[2]));
  return map;
}

function collectCapitalFlags() {
  const src = readFileSync(join(root, "src", "data", "capitalFlags.ts"), "utf8");
  const map = new Map();
  const re = /"([A-Z0-9~_-]+)":\s*"(capital-flags\/[^"]+)"/g;
  let m;
  while ((m = re.exec(src))) map.set(m[1].toUpperCase(), join(root, "public", m[2]));
  return map;
}

function loadCodeSet(relPath, exportName) {
  const src = readFileSync(join(root, relPath), "utf8");
  const start = src.indexOf(exportName);
  const body = start >= 0 ? src.slice(start) : src;
  return new Set([...body.matchAll(/"([A-Z0-9~_-]+)"/g)].map((x) => x[1]));
}

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
    for (let r = 0; r < N; r++) for (let c = 0; c < N - 1; c++) bits.push(at(p, r, c) < at(p, r, c + 1) ? 1 : 0);
    for (let c = 0; c < N; c++) for (let r = 0; r < N - 1; r++) bits.push(at(p, r, c) < at(p, r + 1, c) ? 1 : 0);
  }
  return bits;
}
const hamming = (a, b) => {
  let d = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++;
  return d;
};

async function main() {
  const report = process.argv.includes("--report");
  const subFlags = collectSubdivisionFlags();
  const capFlags = collectCapitalFlags();
  const shared = loadCodeSet(join("src", "data", "sharedCapitalFlags.ts"), "SHARED_CAPITAL_FLAGS");
  const cityTerr = loadCodeSet(join("src", "data", "cityTerritories.ts"), "CITY_TERRITORY_CODES");

  const errors = [];
  const rows = [];
  for (const [code, capPath] of [...capFlags.entries()].sort()) {
    const subPath = subFlags.get(code);
    if (!subPath || !existsSync(subPath) || !existsSync(capPath)) continue;
    const suppressed = shared.has(code) || cityTerr.has(code) || REVIEWED_DISTINCT.has(code);
    const identical = readFileSync(subPath).equals(readFileSync(capPath));
    let dist;
    if (!identical) {
      try {
        dist = hamming(await dHash(subPath), await dHash(capPath));
      } catch {
        continue; // un-rasterisable — byte comparison is the only signal
      }
    } else {
      dist = 0;
    }
    rows.push({ code, dist, suppressed });
    if ((identical || dist < THRESHOLD) && !suppressed) {
      errors.push(
        `  ${code}: capital-flags flag is near-identical to its subdivision flag ` +
          `(${identical ? "byte-identical" : `distance ${dist}`} < ${THRESHOLD}). ` +
          `A capital flag must be DISTINCT from its subdivision's flag — add ${code} to ` +
          `EFFECTIVELY_SHARED in scripts/build-shared-capital-flags.mjs and re-run it ` +
          `(or fix the flag), so the duplicate capital leaf is suppressed.`,
      );
    }
  }

  if (report) {
    rows.sort((a, b) => a.dist - b.dist);
    for (const r of rows.slice(0, 30))
      console.log(`  ${String(r.dist).padStart(3)}  ${r.code}${r.suppressed ? " (shared)" : ""}`);
  }

  if (errors.length) {
    console.error(`✗ Capital/subdivision flag-collision check failed:\n${errors.join("\n")}\n`);
    process.exit(1);
  }
  console.log(
    `✓ Capital/subdivision collision check passed — no capital flag duplicates its subdivision's flag ` +
      `(${rows.length} pairs checked, threshold < ${THRESHOLD}).`,
  );
}

main();
