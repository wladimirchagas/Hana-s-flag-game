// Fails if two subdivisions in DIFFERENT countries that share the same name
// have suspiciously similar bundled flags — the signature of a data-source
// mixup, not a real flag.
//
// WHY THIS EXISTS:
// Paraguay's Misiones Department (PY-8) shipped for months with a generic
// red/navy/white horizontal-band placeholder, because the bulk-imported flag
// data source (amckenna41/iso3166-flags) appears to have confused it with
// Argentina's Misiones Province (AR-N) — a real flag that is *also*
// red/blue/white horizontal bands, just a different country's subdivision
// that happens to share the English name "Misiones". A same-name collision
// across countries is not on its own wrong (many places share a name by
// coincidence — "Northern", "Santa Cruz", "Córdoba" all appear in this
// dataset under multiple unrelated countries), but a same-name collision
// PLUS a near-identical flag is exactly the fingerprint of this bug, because
// no two unrelated countries' subdivisions coincidentally use the *same*
// design — see the calibration note below.
//
// HOW IT WORKS:
// Reuses the same 576-bit perceptual difference hash as
// check-parent-flag-collision.mjs (grayscale + R/G/B planes, horizontal AND
// vertical gradients on a 9x9 sample). For every subdivision name that is
// shared by two or more countries in SUBDIVISION_META, every cross-country
// pair that both have a bundled local flag is compared. Only bundled local
// flags (LOCAL_FLAG_OVERRIDES + public/flags/sub/**) can be checked here —
// CDN-only flags are not fetched over the network by this script.
//
// CALIBRATION:
// The known-bad case (PY-8's old placeholder vs. AR-N) scored 87. Every
// genuine same-name-different-country pair currently in the bundled flag
// set scores >= 171 (the closest: Colombia/Ecuador's "Bolívar" at 171).
// NAME_COLLISION_THRESHOLD sits at the midpoint, 130, leaving a wide margin
// on both sides. Re-run the calibration (see git history of this file) if
// you change the hash or add many more bundled flags.

import sharp from "sharp";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const FLAGS_DIR = join(projectRoot, "public", "flags");

const NAME_COLLISION_THRESHOLD = 130; // catches the PY-8/AR-N bug (87); clears every legitimate case (>=171)

/** Parse the local-file entries of LOCAL_FLAG_OVERRIDES (code -> public/flags/PATH). */
function parseOverrides() {
  const src = readFileSync(join(projectRoot, "src", "api", "subdivisions.ts"), "utf8");
  const re = /"([A-Z0-9~_-]+)":\s*`\$\{BASE\}flags\/([^`]+)`/g;
  const out = {};
  let m;
  while ((m = re.exec(src))) out[m[1]] = join("public", "flags", m[2]);
  return out;
}

/** All bundled subdivision flag files under public/flags/sub/ (code derived from filename). */
function collectSubFlags() {
  const subDir = join(FLAGS_DIR, "sub");
  const out = {};
  if (!existsSync(subDir)) return out;
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith(".")) continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(svg|png|jpg|jpeg)$/i.test(entry.name)) {
        const code = entry.name.replace(/\.(svg|png|jpg|jpeg)$/i, "");
        out[code] = full.replace(projectRoot + "/", "");
      }
    }
  };
  walk(subDir);
  return out;
}

/** Parse {country, code, name} entries out of the generated SUBDIVISION_META. */
function parseSubdivisionMeta() {
  const src = readFileSync(join(projectRoot, "src", "lib", "subdivisionMeta.ts"), "utf8");
  const countryRe = /^\s*"([A-Z]{2})":\s*\{/;
  const divRe = /\{\s*code:\s*"([^"]+)",\s*name:\s*"((?:[^"\\]|\\.)*)"/;
  const entries = [];
  let country = null;
  for (const line of src.split("\n")) {
    const cm = line.match(countryRe);
    if (cm) {
      country = cm[1];
      continue;
    }
    const dm = line.match(divRe);
    if (dm && country) entries.push({ country, code: dm[1], name: dm[2] });
  }
  return entries;
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

async function main() {
  const allFlags = { ...collectSubFlags(), ...parseOverrides() }; // overrides win, matching subdivisionFlagUrl()
  const entries = parseSubdivisionMeta();

  const byName = new Map();
  for (const e of entries) {
    const key = e.name.trim().toLowerCase();
    if (!byName.has(key)) byName.set(key, []);
    byName.get(key).push(e);
  }

  const pairs = [];
  for (const [name, list] of byName) {
    const withFlags = list.filter((e) => allFlags[e.code]);
    for (let i = 0; i < withFlags.length; i++) {
      for (let j = i + 1; j < withFlags.length; j++) {
        if (withFlags[i].country === withFlags[j].country) continue; // same-country, different code: not a cross-country collision
        if (withFlags[i].code === withFlags[j].code) continue; // e.g. US-PR listed under both "US" and "PR"
        pairs.push([withFlags[i], withFlags[j], name]);
      }
    }
  }

  const errors = [];
  let compared = 0;
  console.log(`Checking ${pairs.length} cross-country same-name subdivision pair(s) with bundled flags:`);
  for (const [a, b, name] of pairs) {
    let ha, hb;
    try {
      [ha, hb] = await Promise.all([dHash(allFlags[a.code]), dHash(allFlags[b.code])]);
    } catch (e) {
      errors.push(`  "${name}": ${a.code} vs ${b.code} — could not rasterise: ${e.message}`);
      continue;
    }
    compared++;
    const dist = hamming(ha, hb);
    const flag = dist < NAME_COLLISION_THRESHOLD ? "  ✗" : dist < NAME_COLLISION_THRESHOLD * 1.5 ? "  ⚠" : "   ";
    console.log(`${flag} "${name}": ${a.code} vs ${b.code} — distance ${dist} (threshold ${NAME_COLLISION_THRESHOLD})`);
    if (dist < NAME_COLLISION_THRESHOLD) {
      errors.push(
        `  "${name}": ${a.code} and ${b.code} share a name across different countries AND their bundled ` +
          `flags are nearly identical (distance ${dist} < ${NAME_COLLISION_THRESHOLD}). This is the exact ` +
          `signature of a data-source mixup (see PY-8/AR-N, 2026-06). Verify each flag independently against ` +
          `an authoritative source for ITS OWN country — do not assume a bulk-imported flag is correct just ` +
          `because it passes the parent-flag-collision check.`,
      );
    }
  }

  if (errors.length > 0) {
    console.error(
      `✗ Suspicious same-name subdivision flag collision(s):\n${errors.join("\n")}\n\n` +
        `A bundled subdivision flag must be independently verified, never assumed correct merely because it ` +
        `differs from its own parent's flag. Fix: re-source the flag(s) above from an authoritative source for ` +
        `that specific country's subdivision.`,
    );
    process.exit(1);
  }

  console.log(`✓ ${compared} cross-country same-name pair(s) checked; no suspicious flag duplicates found.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
