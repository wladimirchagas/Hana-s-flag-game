// Generates src/data/sharedCapitalFlags.ts — the subdivision codes whose bundled
// CAPITAL-CITY flag is visually the SAME image as the subdivision's OWN flag
// (e.g. Kuala Lumpur: the federal territory and the city share one flag, and the
// two bundled files are byte-identical).
//
// WHY: the Flag Master sub-national game can quiz both a division's flag and its
// capital's flag in one mixed deck. Asking the SAME image twice — once expecting
// the division's name and once expecting the city's — is unfair, so mixed decks
// ask a shared flag only once (as the division question). This list is how the
// game and the setup-modal count agree on which flags are shared; both read it
// via `getPlayableSubdivisions.ts` helpers so they can never drift.
//
// HOW: byte-identical files are shared; otherwise the same 576-bit perceptual
// difference hash used by scripts/check-parent-flag-collision.mjs is compared at
// the strict near-identical-duplicate threshold (< 12) calibrated there.
//
// Re-run: node scripts/build-shared-capital-flags.mjs
// (pure local file comparison — no network needed).

import sharp from "sharp";
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

// Same near-identical-duplicate threshold as the bulk sub/** set in
// check-parent-flag-collision.mjs (verbatim copies score ~0; the nearest
// legitimately-different pair there scored 18).
const SHARED_THRESHOLD = 12;

// Curated additions: pairs that are the SAME flag but whose two bundled/CDN
// files render far enough apart — different source, crop, or colour shade — to
// exceed the strict auto threshold, so a purely perceptual pass misses them.
// Each was confirmed by eye (side-by-side montage audit, 2026-07): the
// subdivision's flag and its capital's flag are one and the same design (e.g.
// the Distrito Federal's golden-arrow cross shared with Brasília; a province
// that flies its capital city's coat of arms). Treated as shared so the game
// accepts either answer and never asks the player to tell two renderings of one
// flag apart. NOT included: genuinely different province-seal-vs-city-seal pairs
// (all Philippine provinces, Baja California, La Union…), which stay distinct.
const EFFECTIVELY_SHARED = new Map([
  ["BR-DF", "Distrito Federal ≡ Brasília (golden-arrow cross); shade/crop differ"],
  ["IT-ME", "Messina province ≡ city (red field, yellow Scandinavian cross)"],
  ["CH-SZ", "Schwyz canton ≡ town (red field, white canton cross)"],
  ["ES-OR", "Ourense province ≡ city (blue field, arms + star border)"],
  ["MX-ZAC", "Zacatecas state ≡ city (coat of arms on white)"],
  ["CU-06", "Villa Clara ≡ capital (blue/white/red swallowtail + arms)"],
  ["HN-OC", "Ocotepeque dept ≡ capital (red/white/green triband)"],
  ["PE-HUV", "Huancavelica dept ≡ city (light-blue field + arms)"],
  ["PE-HUC", "Huánuco dept ≡ city (white/green diagonal)"],
  ["EC-G", "Guayas ≡ Guayaquil (pale blue/white bands, three stars)"],
  ["PW-212", "Koror state ≡ capital (red/blue starburst + emblem)"],
  ["MM-04", "Mandalay Region ≡ capital (blue field + regional seal)"],
  ["MM-06", "Bago Region ≡ capital (green/yellow/red + gear seal)"],
  ["LV-056", "Līvāni municipality ≡ town (light-blue field + emblem)"],
  ["ME-08", "Herceg Novi ≡ town (ornate blue cross emblem)"],
  ["ME-14", "Pljevlja ≡ town (blue field + shield)"],
  ["CR-A", "Alajuela province ≡ city (arms + wreath on white)"],
  ["CR-C", "Cartago province ≡ city (red-over-blue bicolour)"],
  ["NI-AN", "Nicaragua dept ≡ capital (shared departmental banner)"],
  ["NI-SJ", "Nicaragua dept ≡ capital (white field + small seal)"],
  ["NI-MT", "Nicaragua dept ≡ capital (blue/white/green + seal)"],
  ["NI-GR", "Granada dept ≡ city (yellow/red + seal)"],
  ["NI-CO", "Nicaragua dept ≡ capital (green field + emblem)"],
  ["NI-NS", "Nicaragua dept ≡ capital (white field + round seal)"],
  ["SV-UN", "La Unión dept ≡ capital (yellow/red + emblem)"],
  // Second audit pass (2026-07, band 100–175) — the first pass cut off at
  // distance < 100 and missed same-flag pairs sitting just above it.
  // (The ACT/Canberra pair surfaced here too, but Canberra has no distinct flag
  //  of its own — the ACT flag serves both — so the ACT is treated as a single
  //  city-territory in cityTerritories.ts rather than a shared division+capital.)
  ["IT-LC", "Lecco province ≡ city (blue field + arms)"],
  ["IT-FG", "Foggia province ≡ city (red/blue + arms + wreath)"],
  ["VE-T", "Táchira ≡ capital (white triangle + star)"],
  ["EG-PTS", "Port Said governorate ≡ city (red field + anchor & wreath)"],
  ["NI-MS", "Masaya dept ≡ capital (green/white/green + seal)"],
  ["HN-FM", "Francisco Morazán ≡ Tegucigalpa (navy/gold + arms)"],
  ["EC-E", "Esmeraldas province ≡ capital (green/white bicolour)"],
  ["EC-T", "Tungurahua ≡ Ambato (red/green field)"],
]);

/** code -> bundled subdivision-flag path (bulk sub/** files + curated overrides). */
function collectSubdivisionFlags() {
  const map = new Map();
  const subDir = join(projectRoot, "public", "flags", "sub");
  if (existsSync(subDir)) {
    const walk = (dir) => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.name.startsWith(".")) continue;
        const full = join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (/\.(svg|png|jpg|jpeg)$/i.test(entry.name)) {
          map.set(entry.name.replace(/\.(svg|png|jpg|jpeg)$/i, "").toUpperCase(), full);
        }
      }
    };
    walk(subDir);
  }
  const src = readFileSync(join(projectRoot, "src", "api", "subdivisions.ts"), "utf8");
  const re = /"([A-Z0-9~_-]+)":\s*`\$\{BASE\}flags\/([^`]+)`/g;
  let m;
  while ((m = re.exec(src))) {
    map.set(m[1].toUpperCase(), join(projectRoot, "public", "flags", m[2]));
  }
  return map;
}

/** code -> bundled capital-flag path (from the generated CAPITAL_FLAGS map). */
function collectCapitalFlags() {
  const src = readFileSync(join(projectRoot, "src", "data", "capitalFlags.ts"), "utf8");
  const map = new Map();
  const re = /"([A-Z0-9~_-]+)":\s*"(capital-flags\/[^"]+)"/g;
  let m;
  while ((m = re.exec(src))) map.set(m[1].toUpperCase(), join(projectRoot, "public", m[2]));
  return map;
}

// 576-bit difference hash — identical to check-parent-flag-collision.mjs.
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
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N - 1; c++) bits.push(at(p, r, c) < at(p, r, c + 1) ? 1 : 0);
    }
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

const subFlags = collectSubdivisionFlags();
const capFlags = collectCapitalFlags();

const shared = [];
let compared = 0;
for (const [code, capPath] of [...capFlags.entries()].sort()) {
  const subPath = subFlags.get(code);
  if (!subPath || !existsSync(subPath) || !existsSync(capPath)) continue;
  compared++;
  const a = readFileSync(subPath);
  const b = readFileSync(capPath);
  if (a.equals(b)) {
    shared.push({ code, why: "byte-identical" });
    continue;
  }
  try {
    const d = hamming(await dHash(subPath), await dHash(capPath));
    if (d < SHARED_THRESHOLD) shared.push({ code, why: `perceptual distance ${d}` });
  } catch {
    // Un-rasterisable file (e.g. an exotic SVG sharp can't decode): byte
    // comparison above is the only signal we have — never guess similarity.
  }
}

// Fold in the curated audited pairs the perceptual pass can't reach, skipping
// any the pass already caught.
const autoCodes = new Set(shared.map((s) => s.code));
for (const [code, why] of EFFECTIVELY_SHARED) {
  if (!autoCodes.has(code)) shared.push({ code, why: `curated (audit): ${why}` });
}
shared.sort((a, b) => a.code.localeCompare(b.code));

const lines = shared.map(({ code, why }) => `  "${code}", // ${why}`).join("\n");
const out = `// Auto-generated by scripts/build-shared-capital-flags.mjs — DO NOT EDIT MANUALLY
// Subdivision codes whose bundled capital-city flag is visually the SAME image
// as the subdivision's own flag (byte-identical, or perceptual difference-hash
// distance < ${SHARED_THRESHOLD} — the near-identical-duplicate threshold calibrated in
// scripts/check-parent-flag-collision.mjs), PLUS a curated set of pairs that are
// the same flag from two sources but render too far apart for the perceptual
// pass to catch (confirmed by a side-by-side montage audit — see
// EFFECTIVELY_SHARED in the generator). A mixed division+capital game deck asks
// such a flag only once. Re-run: node scripts/build-shared-capital-flags.mjs

/** Codes whose capital flag duplicates the subdivision flag. */
export const SHARED_CAPITAL_FLAGS: ReadonlySet<string> = new Set([
${lines}
]);
`;
writeFileSync(join(projectRoot, "src", "data", "sharedCapitalFlags.ts"), out);
console.log(`✓ shared-capital-flags: compared ${compared} pairs, ${shared.length} shared.`);
for (const { code, why } of shared) console.log(`  ${code} (${why})`);
