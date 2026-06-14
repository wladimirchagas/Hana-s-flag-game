#!/usr/bin/env node
/**
 * Verifies that no bundled flag SVG uses a known-standardised viewBox that
 * ignores the flag's real-world aspect ratio.
 *
 * flag-icons / flagcdn.com normalise every flag to 640×480 (4:3) regardless
 * of its actual proportions.  The correct source is hampusborgos/country-flags,
 * whose SVGs encode the real ratio in the viewBox (France = "0 0 3 2",
 * UK = "0 0 60 30", Switzerland = "0 0 32 32", etc.).
 *
 * Usage:
 *   node scripts/check-flag-proportions.mjs    # exits 1 on failure
 *   npm run flags:check
 */

import { readdir, readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const FLAGS_DIR = join(__dirname, "..", "public", "flags");

// viewBox values produced by sources that standardise all flags to one size.
// If a new bad source is discovered, add its viewBox here.
const FORBIDDEN_VIEWBOXES = new Set([
  "0 0 640 480", // flag-icons / flagcdn.com — 4:3, applied to every flag
  "0 0 512 512", // some icon libraries — 1:1, applied to every flag
]);

// Unofficial regional/subdivision flags that are intentionally exempt from the
// viewBox check. These flags have NO government-defined real-world aspect ratio
// (they are local/unofficial designs), so a 4:3 source is acceptable.
// Source for all entries below: lipis/flag-icons (GitHub), kept as-is.
const EXEMPT_UNOFFICIAL_FLAGS = new Set([
  "mq.svg",  // Martinique — unofficial serpent flag; no defined ratio
  "nc.svg",  // New Caledonia — FLNKS/Kanak flag; no defined ratio
  "mf.svg",  // Saint Martin — local collectivity flag; no defined ratio
  "gp.svg",  // Guadeloupe — unofficial sun flag; no defined ratio
  "re.svg",  // Réunion — Lö Mahavéli; no defined ratio
]);

async function main() {
  const files = (await readdir(FLAGS_DIR))
    .filter((f) => f.endsWith(".svg") && !f.startsWith("."));

  const errors = [];

  for (const file of files) {
    if (EXEMPT_UNOFFICIAL_FLAGS.has(file)) continue;
    const content = await readFile(join(FLAGS_DIR, file), "utf8");
    const match = content.slice(0, 512).match(/viewBox=["']([^"']+)["']/);
    if (!match) continue;
    const viewBox = match[1].trim();
    if (FORBIDDEN_VIEWBOXES.has(viewBox)) {
      errors.push(`  ${file}: viewBox="${viewBox}"`);
    }
  }

  if (errors.length === 0) {
    console.log(`✓ All ${files.length} flag SVGs have correct real-world aspect ratios.`);
    return;
  }

  console.error(
    `\n✗ ${errors.length} flag SVG(s) use a forbidden standardised viewBox.\n\n` +
    `These were likely downloaded from flag-icons / flagcdn.com, which forces\n` +
    `every flag into 640×480 (4:3) regardless of its real-world proportions.\n\n` +
    `Offending files:\n${errors.join("\n")}\n\n` +
    `Fix: node scripts/download-flags.mjs --force --national-only\n` +
    `Source: hampusborgos/country-flags (raw.githubusercontent.com)\n`,
  );
  process.exit(1);
}

main().catch((err) => { console.error(err); process.exit(1); });
