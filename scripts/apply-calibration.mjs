#!/usr/bin/env node
/**
 * apply-calibration.mjs
 *
 * Patches src/data/nationalAnthems.ts with measured start timestamps
 * exported by the /calibrate page.
 *
 * Usage:
 *   node scripts/apply-calibration.mjs anthem-calibration.json
 *
 * The JSON file maps ISO-3166 alpha-2 codes to arrays of start times:
 *   { "BR": [5.2, 14.0, 22.8, ...], "US": [3.4, 11.0, ...], ... }
 *
 * Each array must have exactly the same length as the corresponding
 * anthem's lines[] array — the calibration page guarantees this.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));
const dataPath = resolve(__dir, "../src/data/nationalAnthems.ts");

const calibrationFile = process.argv[2];
if (!calibrationFile) {
  console.error("Usage: node scripts/apply-calibration.mjs <anthem-calibration.json>");
  process.exit(1);
}

const calibration = JSON.parse(readFileSync(calibrationFile, "utf8"));
let source = readFileSync(dataPath, "utf8");

let patchedCount = 0;
let skippedCount = 0;

for (const [code, timestamps] of Object.entries(calibration)) {
  if (!Array.isArray(timestamps) || timestamps.length === 0) {
    console.warn(`⚠  ${code}: empty timestamps array — skipping`);
    skippedCount++;
    continue;
  }

  // Find the anthem entry block for this code.
  // We match the opening of the entry and then find each `start:` value
  // within the lines[] array, replacing them in order.
  //
  // We identify the lines[] array by finding the first `lines: [` after the
  // code's opening brace, and replace `start:` values up to the matching `]`.

  // Locate the entry: "  XX: {" pattern
  const entryPattern = new RegExp(`(  ${code}: \\{[\\s\\S]*?lines:\\s*\\[)([\\s\\S]*?)(\\])`, "m");
  const match = source.match(entryPattern);

  if (!match) {
    console.warn(`⚠  ${code}: could not locate entry or lines[] in file — skipping`);
    skippedCount++;
    continue;
  }

  const linesBlock = match[2];

  // Count existing start: values in this block
  const existingStarts = [...linesBlock.matchAll(/start:\s*[\d.]+/g)];

  if (existingStarts.length !== timestamps.length) {
    console.warn(
      `⚠  ${code}: data has ${existingStarts.length} lines but calibration has ` +
      `${timestamps.length} timestamps — skipping to avoid mismatch`,
    );
    skippedCount++;
    continue;
  }

  // Replace each start value in order
  let idx = 0;
  const patchedBlock = linesBlock.replace(/start:\s*[\d.]+/g, () => {
    const newVal = timestamps[idx++];
    return `start: ${newVal}`;
  });

  source = source.replace(
    entryPattern,
    `$1${patchedBlock}$3`,
  );

  console.log(
    `✅ ${code}: patched ${timestamps.length} timestamps` +
    ` (${timestamps[0]}s → ${timestamps[timestamps.length - 1]}s)`,
  );
  patchedCount++;
}

writeFileSync(dataPath, source, "utf8");
console.log(
  `\nDone. Patched ${patchedCount} anthems, skipped ${skippedCount}.\n` +
  `Run: npx tsc --noEmit  to verify, then commit.`,
);
