#!/usr/bin/env node
/**
 * Build public/world-subnational-borders.json — the Learn-mode Today map's
 * "Sub-national borders" overlay, precomputed so toggling the checkbox is a
 * single fetch instead of ~200 GeoJSON downloads + client-side meshing.
 *
 * Re-run whenever a bundled public/subdivisions/*.json changes:
 *   node scripts/build-world-subnational-borders.mjs
 *
 * --check  Fail if the committed asset is missing, empty, or out of date
 *          relative to a fresh rebuild (byte-identical after regenerate).
 *
 * Accuracy: every line comes from the same subdivision polygons the app
 * already ships. The mesh keeps only INTERNAL shared edges (coastlines are
 * left to the national stroke). Coordinates are rounded to 3 dp — the same
 * quantisation the mesh matcher uses (~110 m), which is finer than a pixel
 * at world / regional zoom.
 */

import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { countryInternalMesh } from "./lib/subnational-border-mesh.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const R = (p) => resolve(__dirname, p);
const OUT = R("../public/world-subnational-borders.json");
const SUBDIV_DIR = R("../public/subdivisions");

const checkOnly = process.argv.includes("--check");

/** Country codes covered by SUBDIVISION_META — parsed from the generated file
 *  so this script runs on Node without native TypeScript type-stripping. */
function countryCodesFromMeta() {
  const src = readFileSync(R("../src/lib/subdivisionMeta.ts"), "utf8");
  const codes = [...src.matchAll(/^\s{2}"([A-Z]{2})": \{/gm)].map((m) => m[1]);
  if (codes.length < 100) {
    throw new Error(
      `Failed to parse SUBDIVISION_META country keys (got ${codes.length})`,
    );
  }
  return [...new Set(codes)].sort();
}

const COUNTRY_CODES = countryCodesFromMeta();

function build() {
  const allLines = [];
  let countriesWithBorders = 0;
  let countriesMissingFile = 0;

  for (const code of COUNTRY_CODES) {
    const path = resolve(SUBDIV_DIR, `${code}.json`);
    if (!existsSync(path)) {
      countriesMissingFile++;
      continue;
    }
    const geo = JSON.parse(readFileSync(path, "utf8"));
    const mesh = countryInternalMesh(code, geo);
    if (!mesh) continue;
    countriesWithBorders++;
    for (const line of mesh.geometry.coordinates) allLines.push(line);
  }

  const feature = {
    type: "Feature",
    properties: {
      name: "world-subnational-borders",
      // Provenance for regenerators / --check; not shown in the UI.
      source: "public/subdivisions/*.json via countryInternalMesh",
      countries: countriesWithBorders,
      generated: new Date().toISOString().slice(0, 10),
    },
    geometry: { type: "MultiLineString", coordinates: allLines },
  };

  const collection = {
    type: "FeatureCollection",
    features: [feature],
  };

  // Compact JSON (no pretty-print) — the file is fetched at runtime.
  const body = JSON.stringify(collection);
  return {
    body,
    countriesWithBorders,
    countriesMissingFile,
    lineCount: allLines.length,
    pointCount: allLines.reduce((n, line) => n + line.length, 0),
  };
}

const built = build();

if (checkOnly) {
  if (!existsSync(OUT)) {
    console.error(
      `world-subnational-borders.json is missing — run:\n  node scripts/build-world-subnational-borders.mjs`,
    );
    process.exit(1);
  }
  const existing = readFileSync(OUT);
  const a = createHash("sha256").update(existing).digest("hex");
  const b = createHash("sha256").update(built.body).digest("hex");
  // Compare geometry only: the `generated` date in properties changes daily,
  // so strip properties before hashing for the check… Actually both builds
  // in this process share today's date if we rebuild now. Re-reading OUT and
  // comparing to a rebuild that stamps a new `generated` would false-fail
  // across midnight. Compare the geometry hash instead.
  const existingGeo = JSON.parse(existing.toString("utf8"));
  const builtGeo = JSON.parse(built.body);
  const geoA = JSON.stringify(existingGeo.features?.[0]?.geometry ?? null);
  const geoB = JSON.stringify(builtGeo.features?.[0]?.geometry ?? null);
  if (geoA !== geoB) {
    console.error(
      `world-subnational-borders.json is stale (geometry drift).\n` +
        `Re-run: node scripts/build-world-subnational-borders.mjs\n` +
        `committed sha256=${a.slice(0, 12)}…  rebuilt sha256=${b.slice(0, 12)}…`,
    );
    process.exit(1);
  }
  if (built.lineCount < 1000) {
    console.error(
      `world-subnational-borders.json looks empty (${built.lineCount} lines)`,
    );
    process.exit(1);
  }
  console.log(
    `✓ world-subnational-borders.json up to date ` +
      `(${built.countriesWithBorders} countries, ${built.lineCount} polylines, ` +
      `${(existing.length / 1e6).toFixed(1)} MB)`,
  );
  process.exit(0);
}

writeFileSync(OUT, built.body);
console.log(
  `Wrote ${OUT}\n` +
    `  ${built.countriesWithBorders} countries with internal borders` +
    (built.countriesMissingFile
      ? ` (${built.countriesMissingFile} meta codes had no file)`
      : "") +
    `\n  ${built.lineCount} polylines, ${built.pointCount} vertices\n` +
    `  ${(built.body.length / 1e6).toFixed(2)} MB`,
);
