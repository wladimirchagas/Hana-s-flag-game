/**
 * Fix subdivision code collisions in public/subdivisions/*.json.
 *
 * WHY THIS EXISTS
 * ----------------
 * Natural Earth's admin-1 dataset tags multiple distinct polygons with the SAME
 * `iso_3166_2` value in a number of countries. Because BOTH the flag grid
 * (`SubdivisionFlagGrid`, via `subdivisionMeta.ts`) and the subdivision map
 * (`SubdivisionMap`, via `getSubdivCode`) key selection/highlighting off that
 * code, a shared code makes selecting ONE division light up EVERY sibling that
 * shares the code — in the grid and on the map. (Reported for Madagascar, whose
 * 22 modern regions were all stuffed into the 6 abolished province codes.)
 *
 * This script rewrites the per-country GeoJSON so every selectable subdivision
 * resolves to a UNIQUE code, while preserving the codes (and therefore the
 * bundled flags) of real subdivisions. It is the single source of truth for both
 * consumers — the build-subdivision-meta.mjs grid data AND the runtime map both
 * read these same files — so they can never drift.
 *
 * Three collision patterns are handled (see the project investigation notes):
 *
 *   A. SAME PLACE, redundant polygons (one distinct name in the group, e.g. a
 *      "County" + "City" feature both named "Cork", or two "Uruzgan" polygons).
 *      -> MERGE: keep the shared code on every polygon and normalise their
 *         display name/type to the primary feature's, so build-meta collapses
 *         them to a single card. The map still highlights all polygons together
 *         (correct — they are one place). Any bundled flag is preserved.
 *
 *   B. PRIMARY SUBDIVISION + absorbed sub-units (exactly one feature has the
 *      country's primary type and the others are city/municipality-type units
 *      mis-tagged with the province code, e.g. a Philippine province + its
 *      Highly-Urbanised Cities, or Metro Manila's 17 cities under PH-MNL).
 *      -> ABSORB: the owner keeps the code (and its flag); the sub-units keep the
 *         same code too (so their landmass renders as part of the owner, exactly
 *         like Lord Howe Island -> AU-NSW) and are collapsed into the owner's
 *         single card. No invented city-level entries (respects the
 *         "subdivision research" rule).
 *
 *   C. CO-EQUAL distinct subdivisions sharing a stale/aggregate code (no single
 *      owner — e.g. Madagascar's regions all "Autonomous Province", Bosnia's 9
 *      cantons all "Canton", Tehran + Alborz both "Province"). None of these
 *      carry a flag on the shared code.
 *      -> SPLIT: clear `iso_3166_2` so each polygon falls back to its own
 *         geographic `name` as a unique code, and surface that granular name
 *         (Natural Earth's stale `name_en` is the old parent name).
 *
 * A small CURATED map handles groups where the automatic owner pick would be
 * wrong (the flag belongs to a non-primary-typed feature) or where two
 * distinctly-named polygons are actually one place.
 *
 * This is a metadata-only correction — geometry is never touched, and no flag
 * content is invented. Run: node scripts/dedupe-subdivision-codes.mjs
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const INPUT_DIR = join(projectRoot, 'public', 'subdivisions');

// Groups that must be MERGED to a single card even though their polygons carry
// distinct names — because they are really one place, and/or the bundled flag
// must stay on this exact code. Keyed by country then by the shared code.
const CURATED_MERGE = {
  // Port Louis: "Port Louis city" + "Port Louis" are the same place; MU-PL flag.
  MU: { 'MU-PL': { name: 'Port Louis', type: 'City' } },
  // Rēzekne: the republican city (LV-REZ, has flag) plus a polygon Natural Earth
  // mis-tagged with the city code instead of the surrounding municipality.
  LV: { 'LV-REZ': { name: 'Rēzekne', type: 'Republican City' } },
  // Transnistria: two polygons ("Stîngă Nistrului" = left bank of the Dniester).
  MD: { 'MD-SN': { name: 'Transnistria', type: 'District' } },
  // County Tipperary: the former North/South Tipperary counties, unified in 2014.
  IE: { 'IE-TA': { name: 'Tipperary', type: 'County' } },
};

// Display name/type override for Pattern-B absorb groups where the auto-picked
// owner's own name is not the right label for the merged card.
const CURATED_ABSORB = {
  // PH-MNL's lone "Province"-typed feature is mis-typed Mandaluyong; the code is
  // really the National Capital Region (Metro Manila).
  PH: { 'PH-MNL': { name: 'Metro Manila', type: 'Region' } },
};

function normName(s) {
  return (s || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

// build-subdivision-meta.mjs resolves a feature's code as `iso_3166_2 || name`
// (process-admin1 already upper-cases/trims iso). Match that exactly so the
// grid and the map agree.
function resolvedCode(p) {
  return (p.iso_3166_2 || '').trim() || p.name || '';
}

/**
 * Resolve code collisions for one country's feature list, in place.
 * Returns a short list of human-readable change descriptions.
 */
export function dedupeFeatures(countryCode, features) {
  const changes = [];

  // Country's primary (most common, non-empty) subdivision type.
  const typeCounts = new Map();
  for (const f of features) {
    const t = f.properties?.type_en || '';
    if (t) typeCounts.set(t, (typeCounts.get(t) || 0) + 1);
  }
  let primaryType = '';
  let best = 0;
  for (const [t, c] of typeCounts) {
    if (c > best) {
      best = c;
      primaryType = t;
    }
  }

  // Group by resolved code.
  const groups = new Map();
  for (const f of features) {
    const code = resolvedCode(f.properties || {});
    if (!groups.has(code)) groups.set(code, []);
    groups.get(code).push(f);
  }

  for (const [code, grp] of groups) {
    if (grp.length < 2) continue;

    const curated = CURATED_MERGE[countryCode]?.[code];
    const distinctNames = new Set(grp.map((f) => normName(f.properties.name)));
    const primaryFeats = grp.filter((f) => f.properties.type_en === primaryType);

    if (curated) {
      // Curated merge: collapse to one card on the existing code, keeping flag.
      for (const f of grp) {
        f.properties.name = curated.name;
        f.properties.name_en = curated.name;
        if (curated.type) f.properties.type_en = curated.type;
      }
      changes.push(`MERGE(curated) ${code} -> "${curated.name}" (${grp.length} polygons)`);
    } else if (distinctNames.size === 1) {
      // Pattern A — same place. Normalise to the primary-typed feature's
      // name/type (prefer e.g. the County over the City) so the survivor card
      // is the proper subdivision and keeps the shared code (and any flag).
      const owner = primaryFeats[0] ?? grp[0];
      const name = owner.properties.name;
      const type = owner.properties.type_en || grp[0].properties.type_en;
      for (const f of grp) {
        f.properties.name = name;
        f.properties.name_en = name;
        if (type) f.properties.type_en = type;
      }
      changes.push(`MERGE(same) ${code} -> "${name}" (${grp.length} polygons)`);
    } else if (primaryFeats.length === 1) {
      // Pattern B — primary subdivision + absorbed sub-units. Owner keeps the
      // code (+flag); sub-units keep it too so their landmass renders as part of
      // the owner (Lord Howe -> AU-NSW behaviour). Collapsed to one card.
      const absorb = CURATED_ABSORB[countryCode]?.[code];
      const owner = primaryFeats[0];
      const name = absorb?.name ?? owner.properties.name;
      const type = absorb?.type ?? owner.properties.type_en;
      for (const f of grp) {
        f.properties.name = name;
        f.properties.name_en = name;
        if (type) f.properties.type_en = type;
      }
      changes.push(`ABSORB ${code} -> "${name}" (+${grp.length - 1} sub-units)`);
    } else {
      // Pattern C — co-equal distinct subdivisions sharing a stale code. Clear
      // the shared iso so each polygon falls back to its own unique geographic
      // name, and surface that name (the stale name_en is the old parent name).
      for (const f of grp) {
        delete f.properties.iso_3166_2;
        f.properties.name_en = f.properties.name;
      }
      changes.push(
        `SPLIT ${code} -> ${grp.map((f) => `"${f.properties.name}"`).join(', ')}`,
      );
    }
  }

  // Safety net: after splitting, make sure no two genuinely-distinct
  // subdivisions ended up sharing a resolved code by coincidence.
  const seen = new Map();
  for (const f of features) {
    const code = resolvedCode(f.properties || {});
    const name = normName(f.properties.name);
    if (!seen.has(code)) {
      seen.set(code, name);
    } else if (seen.get(code) !== name) {
      changes.push(`WARN unresolved collision on ${code}: "${seen.get(code)}" vs "${name}"`);
    }
  }

  return changes;
}

// Run standalone: fix every committed per-country file in place.
function main() {
  const files = readdirSync(INPUT_DIR).filter(
    (f) => f.endsWith('.json') && /^[A-Z]{2}\.json$/.test(f),
  );
  let touched = 0;
  for (const file of files.sort()) {
    const cc = file.replace('.json', '');
    const path = join(INPUT_DIR, file);
    const fc = JSON.parse(readFileSync(path, 'utf8'));
    if (!fc.features?.length) continue;
    const changes = dedupeFeatures(cc, fc.features);
    if (changes.length === 0) continue;
    writeFileSync(path, JSON.stringify(fc));
    touched++;
    console.log(`\n${cc}:`);
    for (const c of changes) console.log(`  ${c}`);
  }
  console.log(`\nDone. Rewrote ${touched} country file(s).`);
  console.log('Now run: node scripts/build-subdivision-meta.mjs');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
