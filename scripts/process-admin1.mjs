/**
 * Process Natural Earth admin-1 GeoJSON into per-country files.
 * Run: node scripts/process-admin1.mjs
 *
 * Reads from /tmp/ne_admin1.geojson (50m) or /tmp/ne_admin1_10m.geojson (10m)
 * Downloads: https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_1_states_provinces.geojson
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { dedupeFeatures } from './dedupe-subdivision-codes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

// Prefer 10m (more countries) over 50m
const INPUT = existsSync('/tmp/ne_admin1_10m.geojson')
  ? '/tmp/ne_admin1_10m.geojson'
  : '/tmp/ne_admin1.geojson';
const OUTPUT_DIR = join(projectRoot, 'public', 'subdivisions');

mkdirSync(OUTPUT_DIR, { recursive: true });

console.log(`Reading Natural Earth admin-1 data from ${INPUT}...`);
const raw = readFileSync(INPUT, 'utf8');
const data = JSON.parse(raw);

console.log(`Total features: ${data.features.length}`);

// Group by iso_a2
const byCountry = new Map();

for (const feature of data.features) {
  const props = feature.properties ?? {};
  const iso2 = props.iso_a2;

  // Skip features with no valid ISO 3166-1 alpha-2 code
  if (!iso2 || iso2 === '-99' || iso2 === '' || iso2.length !== 2) continue;

  const key = iso2.toUpperCase();
  if (!byCountry.has(key)) byCountry.set(key, []);

  // Keep only essential properties to reduce file size
  const minProps = {};
  if (props.name)        minProps.name        = props.name;
  if (props.name_en)     minProps.name_en     = props.name_en;
  if (props.iso_3166_2)  minProps.iso_3166_2  = props.iso_3166_2.toUpperCase().trim();
  if (props.type_en)     minProps.type_en     = props.type_en;
  if (props.type)        minProps.type        = props.type;

  byCountry.get(key).push({
    type: 'Feature',
    properties: minProps,
    geometry: feature.geometry,
  });
}

console.log(`Countries found: ${byCountry.size}`);

let written = 0;
for (const [code, features] of byCountry) {
  // Resolve Natural Earth's shared-iso_3166_2 collisions so every selectable
  // subdivision has a unique code (see dedupe-subdivision-codes.mjs).
  dedupeFeatures(code, features);
  const fc = {
    type: 'FeatureCollection',
    features,
  };
  const outPath = join(OUTPUT_DIR, `${code}.json`);
  writeFileSync(outPath, JSON.stringify(fc));
  written++;
}

console.log(`Written ${written} country files to ${OUTPUT_DIR}`);
