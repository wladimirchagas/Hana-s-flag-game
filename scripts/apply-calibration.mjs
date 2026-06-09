#!/usr/bin/env node
/**
 * apply-calibration.mjs
 *
 * Patches src/data/nationalAnthems.ts with timing data produced by either:
 *   • The /calibrate browser tool (Wikimedia audio → VAD-measured line starts)
 *   • scripts/sync-youtube-captions.mjs (YouTube caption → visual timing)
 *
 * Usage:
 *   node scripts/apply-calibration.mjs anthem-calibration.json
 *
 * Input formats accepted
 * ──────────────────────
 * Legacy (line starts only — produced by /calibrate page):
 *   { "BR": [5.2, 14.0, 22.8, …], "US": [3.4, 11.0, …], … }
 *
 * Extended (line starts + YouTube intro offset — produced by sync-youtube-captions.mjs):
 *   {
 *     "AU": { "introOffset": 5.2, "starts": [0.0, 6.8, 12.5, …] },
 *     "US": { "introOffset": 8.1, "starts": [0.0, 7.0, …] },
 *     …
 *   }
 *
 * Mixed files (some entries old-format, some new-format) are also accepted.
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

const rawCalibration = JSON.parse(readFileSync(calibrationFile, "utf8"));
let source = readFileSync(dataPath, "utf8");

// Normalise to a unified shape: { timestamps: number[], introOffset?: number }
function normalise(entry) {
  if (Array.isArray(entry)) {
    return { timestamps: entry, introOffset: undefined };
  }
  if (entry && typeof entry === "object") {
    return {
      timestamps: Array.isArray(entry.starts) ? entry.starts : [],
      introOffset: typeof entry.introOffset === "number" ? entry.introOffset : undefined,
    };
  }
  return { timestamps: [], introOffset: undefined };
}

let patchedCount = 0;
let skippedCount = 0;

for (const [code, rawEntry] of Object.entries(rawCalibration)) {
  const { timestamps, introOffset } = normalise(rawEntry);

  if (!timestamps.length && introOffset === undefined) {
    console.warn(`⚠  ${code}: no data — skipping`);
    skippedCount++;
    continue;
  }

  // ── Locate the entry block ──────────────────────────────────────────────
  const entryPattern = new RegExp(
    `(  ${code}: \\{[\\s\\S]*?lines:\\s*\\[)([\\s\\S]*?)(\\])`,
    "m",
  );
  const match = source.match(entryPattern);

  if (!match) {
    console.warn(`⚠  ${code}: could not locate entry or lines[] — skipping`);
    skippedCount++;
    continue;
  }

  let patched = false;

  // ── Patch line start times ──────────────────────────────────────────────
  if (timestamps.length) {
    const linesBlock = match[2];
    const existingStarts = [...linesBlock.matchAll(/start:\s*[\d.]+/g)];

    if (existingStarts.length !== timestamps.length) {
      console.warn(
        `⚠  ${code}: data has ${existingStarts.length} lines but calibration has ` +
        `${timestamps.length} timestamps — skipping line starts`,
      );
    } else {
      let idx = 0;
      const patchedBlock = linesBlock.replace(/start:\s*[\d.]+/g, () => {
        return `start: ${timestamps[idx++]}`;
      });
      source = source.replace(entryPattern, `$1${patchedBlock}$3`);
      patched = true;
    }
  }

  // ── Patch youtubeIntroOffset ────────────────────────────────────────────
  if (introOffset !== undefined) {
    // Find the entry preamble (before "lines:") and update or insert the field.
    // Matches: youtubeIntroOffset: <number>, (with optional trailing comma/space)
    const offsetPattern = new RegExp(
      `(  ${code}: \\{[\\s\\S]*?)(youtubeIntroOffset:\\s*[-\\d.]+)`,
      "m",
    );

    if (offsetPattern.test(source)) {
      source = source.replace(
        offsetPattern,
        `$1youtubeIntroOffset: ${introOffset}`,
      );
      patched = true;
    } else {
      // Field doesn't exist yet — insert after youtubeId line
      const insertPattern = new RegExp(
        `(  ${code}: \\{[\\s\\S]*?youtubeId:\\s*"[^"]*")`,
        "m",
      );
      if (insertPattern.test(source)) {
        source = source.replace(
          insertPattern,
          `$1, youtubeIntroOffset: ${introOffset}`,
        );
        patched = true;
      } else {
        console.warn(`⚠  ${code}: could not find youtubeId to insert introOffset — skipping offset`);
      }
    }
  }

  if (patched) {
    const parts = [];
    if (timestamps.length) parts.push(`${timestamps.length} line starts (${timestamps[0]}s → ${timestamps[timestamps.length - 1]}s)`);
    if (introOffset !== undefined) parts.push(`introOffset=${introOffset}s`);
    console.log(`✅ ${code}: patched ${parts.join(", ")}`);
    patchedCount++;
  } else {
    skippedCount++;
  }
}

writeFileSync(dataPath, source, "utf8");
console.log(
  `\nDone. Patched ${patchedCount} anthems, skipped ${skippedCount}.\n` +
  `Run: npx tsc --noEmit  to verify, then commit.`,
);
