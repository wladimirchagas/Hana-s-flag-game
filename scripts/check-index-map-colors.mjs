#!/usr/bin/env node
/**
 * Enforce the shared Learn-mode index map colour scheme.
 *
 * Every democracy / governance index map must colour its bands by sampling
 * INDEX_MAP_PALETTE via indexBandColors() — never a hand-written per-index
 * palette. Fails when:
 *   - INDEX_MAP_PALETTE / indexBandColors / INDEX_MAP_COLOR_REGISTRY are removed
 *   - a registered colour map drifts from indexBandColors(labelsBestFirst)
 *   - a DEMOCRACY_INDEX_KEYS entry has no registry row (or vice versa)
 *   - a *_MAP_COLORS object literal with hexes is reintroduced
 *   - the palette is shortened below 10 stops
 *
 * Run: node scripts/check-index-map-colors.mjs
 * Needs Node 22.18+ — imports democracyColors.ts directly.
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const COLORS_TS = resolve(__dirname, "../src/lib/democracyColors.ts");

const {
  DEMOCRACY_INDEX_KEYS,
  INDEX_MAP_COLOR_REGISTRY,
  INDEX_MAP_PALETTE,
  indexBandColors,
  indexMapPaletteSample,
} = await import("../src/lib/democracyColors.ts");

const errors = [];

if (INDEX_MAP_PALETTE.length !== 10) {
  errors.push(`INDEX_MAP_PALETTE must have exactly 10 stops (got ${INDEX_MAP_PALETTE.length})`);
}
for (const hex of INDEX_MAP_PALETTE) {
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) {
    errors.push(`INDEX_MAP_PALETTE entry is not a #rrggbb hex: ${hex}`);
  }
}

// Best stop must be a deep green; worst a deep red (spot-check the ends).
if (INDEX_MAP_PALETTE[0] !== "#004d1a") {
  errors.push(`INDEX_MAP_PALETTE[0] must stay #004d1a (best/green), got ${INDEX_MAP_PALETTE[0]}`);
}
if (INDEX_MAP_PALETTE[INDEX_MAP_PALETTE.length - 1] !== "#7f0000") {
  errors.push(
    `INDEX_MAP_PALETTE[last] must stay #7f0000 (worst/red), got ${INDEX_MAP_PALETTE[INDEX_MAP_PALETTE.length - 1]}`,
  );
}

// Sampler covers endpoints and never invents colours.
for (const n of [1, 2, 3, 4, 5, 6, 8, 10]) {
  const sample = indexMapPaletteSample(n);
  if (sample.length !== n) errors.push(`indexMapPaletteSample(${n}) length ${sample.length}`);
  if (sample[0] !== INDEX_MAP_PALETTE[0]) {
    errors.push(`indexMapPaletteSample(${n})[0] must be palette best`);
  }
  if (sample[n - 1] !== INDEX_MAP_PALETTE[INDEX_MAP_PALETTE.length - 1] && n > 1) {
    errors.push(`indexMapPaletteSample(${n})[last] must be palette worst`);
  }
  for (const c of sample) {
    if (!INDEX_MAP_PALETTE.includes(c)) {
      errors.push(`indexMapPaletteSample(${n}) invented ${c}`);
    }
  }
}

const registryKeys = new Set();
for (const entry of INDEX_MAP_COLOR_REGISTRY) {
  if (entry.key !== "decade-shared") registryKeys.add(entry.key);
  const expected = indexBandColors(entry.labelsBestFirst);
  const gotLabels = Object.keys(entry.colors).sort();
  const expLabels = Object.keys(expected).sort();
  if (gotLabels.join("\0") !== expLabels.join("\0")) {
    errors.push(
      `${entry.name}: label set ${JSON.stringify(gotLabels)} ≠ ${JSON.stringify(expLabels)}`,
    );
    continue;
  }
  for (const label of entry.labelsBestFirst) {
    if (entry.colors[label] !== expected[label]) {
      errors.push(
        `${entry.name}["${label}"] is ${entry.colors[label]}, expected ${expected[label]} from indexBandColors()`,
      );
    }
  }
}

for (const key of DEMOCRACY_INDEX_KEYS) {
  if (!registryKeys.has(key)) {
    errors.push(
      `DEMOCRACY_INDEX_KEYS has "${key}" but INDEX_MAP_COLOR_REGISTRY has no row — add one when adding an index`,
    );
  }
}
for (const key of registryKeys) {
  if (!DEMOCRACY_INDEX_KEYS.includes(key)) {
    errors.push(
      `INDEX_MAP_COLOR_REGISTRY has "${key}" which is not in DEMOCRACY_INDEX_KEYS`,
    );
  }
}

// Source discipline: helpers and registry must stay defined.
const src = readFileSync(COLORS_TS, "utf8");
for (const needle of [
  "INDEX_MAP_PALETTE",
  "indexBandColors",
  "indexMapPaletteSample",
  "INDEX_MAP_COLOR_REGISTRY",
]) {
  if (!src.includes(needle)) {
    errors.push(`democracyColors.ts no longer defines/uses ${needle}`);
  }
}

// Every export const FOO_MAP_COLORS must be assigned via indexBandColors(…
const mapAssignRe =
  /export const (\w+_MAP_COLORS)\s*=\s*([^;]+);/g;
let m;
while ((m = mapAssignRe.exec(src))) {
  const [, name, rhs] = m;
  if (!rhs.includes("indexBandColors(")) {
    errors.push(`${name} must be assigned with indexBandColors(...), got: ${rhs.trim().slice(0, 80)}`);
  }
  if (/#[0-9a-fA-F]{3,8}/.test(rhs)) {
    errors.push(`${name} RHS still contains a raw hex — move colours into INDEX_MAP_PALETTE`);
  }
}

// Hexes outside INDEX_MAP_PALETTE are forbidden — one shared scheme only.
const paletteStart = src.indexOf("export const INDEX_MAP_PALETTE");
const paletteEnd = src.indexOf("] as const;", paletteStart) + 11;
const hexesOutsidePalette = [];
const hexRe = /#[0-9a-fA-F]{6}/g;
let hx;
while ((hx = hexRe.exec(src))) {
  if (hx.index >= paletteStart && hx.index < paletteEnd) continue;
  hexesOutsidePalette.push(`${hx[0]} @${hx.index}`);
}
if (hexesOutsidePalette.length) {
  errors.push(
    `democracyColors.ts has ${hexesOutsidePalette.length} #rrggbb outside INDEX_MAP_PALETTE (first: ${hexesOutsidePalette[0]})`,
  );
}

if (errors.length) {
  console.error(`Index map colour check FAILED (${errors.length}):`);
  for (const e of errors.slice(0, 40)) console.error(" -", e);
  if (errors.length > 40) console.error(` … and ${errors.length - 40} more`);
  process.exit(1);
}

console.log(
  `Index map colour check OK — ${INDEX_MAP_COLOR_REGISTRY.length} maps sample INDEX_MAP_PALETTE (${INDEX_MAP_PALETTE.length} stops) via indexBandColors().`,
);
