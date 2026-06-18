#!/usr/bin/env node
// Generate "people of this country" images with Google Imagen 4 (Gemini API).
//
// Usage:
//   GEMINI_API_KEY=... node scripts/build-people-images.mjs            # all pilot codes
//   GEMINI_API_KEY=... node scripts/build-people-images.mjs --code BR  # one country
//   ... --force                                                        # overwrite existing
//
// The key is read from GEMINI_API_KEY or GOOGLE_API_KEY and is NEVER written to
// disk. Output is an optimized WebP at public/people/{code}.webp PLUS the exact
// prompt at public/people/{code}.prompt.txt (committed, for provenance).
//
// IMPORTANT — human review gate: this script only PRODUCES image files. A human
// must visually review each one before adding its code to PEOPLE_IMAGE_CODES in
// src/data/peopleImages.ts. A file on disk is never shown until it's in that
// manifest. See CLAUDE.md ("never trust a bulk-imported asset as correct").

import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { COMPOSITION, PILOT_CODES, buildPrompt } from "./people/composition.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "../public/people");

const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const MODEL = process.env.IMAGEN_MODEL || "imagen-4.0-generate-001";
const ENDPOINT = (model) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:predict`;

// Final displayed dimensions: a landscape group photo for the fullscreen
// lightbox. Imagen returns 4:3; we keep that and cap the long edge for size.
const MAX_WIDTH = 1536;
const WEBP_QUALITY = 80;

function parseArgs(argv) {
  const args = { codes: null, force: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--force") args.force = true;
    else if (a === "--code") args.codes = [argv[++i]?.toUpperCase()];
    else if (a.startsWith("--code=")) args.codes = [a.slice(7).toUpperCase()];
  }
  return args;
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function generate(code) {
  const prompt = buildPrompt(code);
  const body = {
    instances: [{ prompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: "4:3",
      // allow_all permits children, required for the age-diversity brief.
      // Falls back automatically below if the project/region disallows it.
      personGeneration: "allow_all",
    },
  };

  let res = await fetch(ENDPOINT(MODEL), {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": API_KEY },
    body: JSON.stringify(body),
  });

  // Retry once with allow_adult if allow_all is rejected by policy.
  if (!res.ok) {
    const text = await res.text();
    if (/personGeneration|allow_all/i.test(text)) {
      body.parameters.personGeneration = "allow_adult";
      res = await fetch(ENDPOINT(MODEL), {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": API_KEY },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${await res.text()}`);
      }
    } else {
      throw new Error(`HTTP ${res.status}: ${text}`);
    }
  }

  const json = await res.json();
  const pred = json?.predictions?.[0];
  const b64 = pred?.bytesBase64Encoded || pred?.image?.imageBytes;
  if (!b64) {
    // Content filter or empty response: surface it, don't write a bad file.
    throw new Error(
      `no image returned (likely content filter). Response: ${JSON.stringify(json).slice(0, 400)}`,
    );
  }
  return { bytes: Buffer.from(b64, "base64"), prompt };
}

async function main() {
  if (!API_KEY) {
    console.error(
      "✗ No API key. Set GEMINI_API_KEY (or GOOGLE_API_KEY) and re-run. Nothing generated.",
    );
    process.exit(1);
  }

  const { codes, force } = parseArgs(process.argv);
  const targets = codes ?? PILOT_CODES;
  await mkdir(OUT_DIR, { recursive: true });

  let ok = 0;
  const failures = [];
  for (const code of targets) {
    if (!COMPOSITION[code]) {
      failures.push([code, "no documented composition"]);
      console.warn(`- ${code}: skipped (no documented composition)`);
      continue;
    }
    const webpPath = resolve(OUT_DIR, `${code.toLowerCase()}.webp`);
    if (!force && (await exists(webpPath))) {
      console.log(`= ${code}: exists, skipping (use --force to overwrite)`);
      continue;
    }
    try {
      console.log(`… ${code}: generating (${MODEL})`);
      const { bytes, prompt } = await generate(code);
      const webp = await sharp(bytes)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toBuffer();
      await writeFile(webpPath, webp);
      await writeFile(
        resolve(OUT_DIR, `${code.toLowerCase()}.prompt.txt`),
        prompt + "\n",
      );
      console.log(`✓ ${code}: wrote ${webpPath} (${(webp.length / 1024).toFixed(0)} KB)`);
      ok++;
    } catch (err) {
      failures.push([code, err.message]);
      console.error(`✗ ${code}: ${err.message}`);
    }
  }

  console.log(`\nDone: ${ok} generated, ${failures.length} failed.`);
  if (failures.length) {
    console.log("Failures:");
    for (const [code, msg] of failures) console.log(`  ${code}: ${msg}`);
  }
  console.log(
    "\nNext: visually review each public/people/*.webp, then add reviewed codes\n" +
      "to PEOPLE_IMAGE_CODES in src/data/peopleImages.ts so the button appears.",
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
