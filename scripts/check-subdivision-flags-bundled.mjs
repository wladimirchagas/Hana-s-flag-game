#!/usr/bin/env node
// Fails the build unless every subdivision flag the game can show is a real,
// correctly-typed image file BUNDLED in this repository — and nothing else.
//
// WHY THIS EXISTS (2026-09 subnational flag audit, docs/SUBNATIONAL_FLAG_AUDIT_2026-09.md):
//   • ~350 subdivision flags were served at RUNTIME from the jsDelivr CDN
//     (amckenna41/iso3166-flags) even though 348 of those exact files were
//     already bundled under public/flags/sub/. src/lib/subdivisionFlagIndex.ts
//     simply didn't list them as local. jsDelivr answers 403/404 intermittently,
//     so those cards went blank for users — US states such as Massachusetts and
//     Delaware, the provinces of Rome and Lucca, and more. It also meant a whole
//     class of shown images sat outside the local review loop. The index now has
//     no CDN fallback at all: a code resolves to a bundled file or to no flag.
//   • Suppressing a wrong flag must actually remove it: a suppressed code that
//     keeps a bundled file is one refactor away from showing the wrong image
//     again (the Posavina-shows-Republika-Srpska and Guantánamo-shows-the-US-
//     Naval-Base-seal class of bug).
//   • A file whose bytes are not the image type its extension claims (LV-102.png
//     was a WebP; a saved HTML error page named .svg is the party-logo failure
//     mode) is a latent broken image.
//
// Checks (all local, no network):
//   1. subdivisionFlagIndex.ts and subdivisions.ts reference no http(s)/CDN URL.
//   2. Every code in FLAG_CODES has its bundled file at
//      public/flags/sub/<CC>/<CODE>.<ext> (ext from NON_SVG_EXT, default svg).
//   3. Every file under public/flags/sub/ is either indexed (FLAG_CODES with the
//      same extension) or the target of a curated LOCAL_FLAG_OVERRIDES entry —
//      no orphans that nothing renders and nothing reviews.
//   4. No SUPPRESSED_SUBDIVISION_FLAGS code is still indexed or still has a
//      bundled file, and no suppressed code is also a curated override.
//   5. Every bundled subdivision flag's bytes match its extension (PNG/JPEG/GIF
//      magic numbers; an .svg must contain an <svg> root and must not be HTML).
//
// Never weaken this check to make a flag pass: bundle the file, fix the index,
// or delete the file and suppress the code.
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SUB = join(root, "public", "flags", "sub");
const indexSrc = readFileSync(join(root, "src", "lib", "subdivisionFlagIndex.ts"), "utf8");
const apiSrc = readFileSync(join(root, "src", "api", "subdivisions.ts"), "utf8");
const errors = [];

const block = (src, marker, close) => {
  const s = src.indexOf(marker);
  if (s < 0) return null;
  return src.slice(s, src.indexOf(close, s));
};
const stripComments = (s) => s.replace(/\/\/.*$/gm, "");

// 1. no remote URLs
for (const [name, src] of [["src/lib/subdivisionFlagIndex.ts", indexSrc]]) {
  const code = stripComments(src);
  if (/https?:\/\//.test(code) || /jsdelivr/i.test(code)) {
    errors.push(`${name} references a remote URL — subdivision flags must be served from the bundle only.`);
  }
}
const overrideVals = [...apiSrc.matchAll(/"([A-Z0-9~_-]+)":\s*[`"']([^`"']+)[`"']/g)];
for (const [, key, val] of overrideVals) {
  if (/^https?:\/\//.test(val)) errors.push(`src/api/subdivisions.ts: ${key} points at a remote URL (${val}).`);
}

// Parse index
const flagBlock = block(indexSrc, "const FLAG_CODES = new Set<string>([", "]);");
const extBlock = block(indexSrc, "const NON_SVG_EXT", "};");
if (!flagBlock || !extBlock) {
  console.error("✗ Could not find FLAG_CODES / NON_SVG_EXT in src/lib/subdivisionFlagIndex.ts");
  process.exit(1);
}
const FLAG = new Set([...stripComments(flagBlock).matchAll(/"([^"]+)"/g)].map((m) => m[1]));
const EXT = Object.fromEntries([...stripComments(extBlock).matchAll(/"([^"]+)":\s*"([a-z]+)"/g)].map((m) => [m[1], m[2]]));
for (const k of Object.keys(EXT)) if (!FLAG.has(k)) errors.push(`NON_SVG_EXT lists ${k}, which is not in FLAG_CODES.`);

const supBlock = block(apiSrc, "SUPPRESSED_SUBDIVISION_FLAGS: ReadonlySet<string> = new Set([", "]);");
const SUPPRESSED = new Set([...stripComments(supBlock ?? "").matchAll(/"([^"]+)"/g)].map((m) => m[1]));
const OVERRIDES = new Map(
  [...apiSrc.matchAll(/"([A-Z0-9~_-]+)":\s*`\$\{BASE\}flags\/([^`]+)`/g)].map((m) => [m[1], m[2]]),
);

// 2. every indexed code is bundled
const expectedPath = (code) => join(SUB, code.split("-")[0], `${code}.${EXT[code] ?? "svg"}`);
for (const code of FLAG) {
  if (!existsSync(expectedPath(code))) {
    errors.push(`${code} is in FLAG_CODES but ${relative(root, expectedPath(code))} is not bundled.`);
  }
}

// 3. no orphan files
const overrideTargets = new Set([...OVERRIDES.values()].map((p) => join(root, "public", "flags", p)));
const files = [];
const walk = (dir) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else files.push(full);
  }
};
if (existsSync(SUB)) walk(SUB);
for (const f of files) {
  const m = f.match(/\/([^/]+)\.([a-z]+)$/i);
  const code = m?.[1];
  const ext = m?.[2]?.toLowerCase();
  const indexed = code && FLAG.has(code) && (EXT[code] ?? "svg") === ext;
  if (!indexed && !overrideTargets.has(f)) {
    errors.push(`${relative(root, f)} is bundled but neither indexed in FLAG_CODES nor a LOCAL_FLAG_OVERRIDES target — index it or delete it.`);
  }
}

// 4. suppression means gone
for (const code of SUPPRESSED) {
  if (FLAG.has(code)) errors.push(`${code} is suppressed but still listed in FLAG_CODES — remove it (and its file).`);
  if (OVERRIDES.has(code)) errors.push(`${code} is suppressed but still has a LOCAL_FLAG_OVERRIDES entry.`);
  const dir = join(SUB, code.split("-")[0]);
  if (existsSync(dir)) {
    for (const f of readdirSync(dir)) {
      if (f.replace(/\.[a-z]+$/i, "") === code) {
        errors.push(`${code} is suppressed but public/flags/sub/${code.split("-")[0]}/${f} is still bundled — delete it.`);
      }
    }
  }
}

// 5. bytes match extension
const kindOf = (buf) => {
  if (buf.length > 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return "png";
  if (buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpeg";
  if (buf.subarray(0, 4).toString("latin1") === "GIF8") return "gif";
  if (buf.subarray(0, 4).toString("latin1") === "RIFF" && buf.subarray(8, 12).toString("latin1") === "WEBP") return "webp";
  const head = buf.subarray(0, 8192).toString("utf8").replace(/^﻿/, "");
  if (/<!doctype html|<html[\s>]/i.test(head)) return "html";
  if (/<svg[\s>]/i.test(head)) return "svg";
  return "unknown";
};
const checkFile = (f) => {
  if (!existsSync(f) || !statSync(f).isFile()) return;
  const ext = f.split(".").pop().toLowerCase();
  const want = ext === "jpg" ? "jpeg" : ext;
  const got = kindOf(readFileSync(f));
  if (got !== want) errors.push(`${relative(root, f)}: bytes are ${got.toUpperCase()}, but the extension says ${ext.toUpperCase()}.`);
};
for (const f of files) checkFile(f);
for (const f of overrideTargets) checkFile(f);

if (errors.length) {
  console.error(`✗ Subdivision flag bundling check failed (${errors.length}):\n  ${errors.join("\n  ")}`);
  console.error(
    "\nEvery subdivision flag must be a correctly-typed file bundled under public/flags/sub/ and listed in\n" +
      "src/lib/subdivisionFlagIndex.ts (or a curated LOCAL_FLAG_OVERRIDES target); a suppressed code must have\n" +
      "no file. See CLAUDE.md (\"All flag files must be bundled\") and docs/SUBNATIONAL_FLAG_AUDIT_2026-09.md.",
  );
  process.exit(1);
}
console.log(
  `✓ Subdivision flag bundling check passed — ${FLAG.size} indexed flags all bundled, ${files.length} files all ` +
    `referenced and correctly typed, ${SUPPRESSED.size} suppressed codes have no file, no remote URLs.`,
);
