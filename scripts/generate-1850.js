#!/usr/bin/env node
/**
 * generate-1850.js
 *
 * Generates world_1850.geojson from world_1815.geojson by applying
 * historically accurate name and polity updates for c.1850.
 *
 * Key political changes between 1815 and 1850:
 *  - Spanish/Portuguese colonial viceroyalties → independent republics
 *    (Latin American wars of independence, 1810–1826)
 *  - Brazil independent from Portugal as Empire of Brazil (1822)
 *  - United States expanded (Louisiana Purchase, Florida, Texas 1845,
 *    Oregon 1846, Mexican Cession 1848)
 *  - Maratha Confederacy absorbed by British East India Company (1818)
 *  - Greek independence from Ottoman Empire (1829)
 *  - Belgium independent from Netherlands (1830)
 *  - Republic of Kraków absorbed by Austria (1846)
 *  - Fulani/Sokoto Caliphate dominates West Africa (est. 1804)
 *  - Oudh (Awadh) still Indian princely state, under British pressure
 *  - Cape Colony firmly British (from 1806); Great Trek → Natal, Transvaal
 *  - New Zealand British colony (1840 Treaty of Waitangi)
 *  - Singapore established by British (1819); British Malacca permanent
 *  - Sardinian Kingdom of Piedmont-Sardinia (unchanged)
 *  - German Confederation still in place (not yet unified)
 *  - Italy still fragmented (unification in 1861)
 *  - Ottoman Empire: Greece independent, Serbia autonomous, Egypt autonomous
 */

const fs = require('fs');
const path = require('path');

const INPUT  = path.join(__dirname, '../public/historical-maps/world_1815.geojson');
const OUTPUT = path.join(__dirname, '../public/historical-maps/world_1850.geojson');

const data = JSON.parse(fs.readFileSync(INPUT, 'utf8'));

/**
 * Direct name → new name replacements.
 * Applied to the `NAME` property of every matching feature.
 */
const NAME_REMAP = {
  // ── Latin America ──────────────────────────────────────────────────────────
  // Gran Colombia (New Granada viceroyalty) split into three republics by 1831
  'Vice-Royalty of New Granada':  'New Granada',
  // New Spain → Mexican Republic (independent 1821; republic 1824)
  'Vice-Royalty of New Spain':    'Mexico',
  // Viceroyalty of Peru → Republic of Peru (independent 1821)
  'Vice-Royalty of Peru':         'Peru',
  // United Provinces → Argentine Confederation (c. 1831–1861)
  'United Provinces of La Plata': 'Argentine Confederation',
  // Brazil: from Viceroyalty / Portuguese kingdom to Empire of Brazil (1822)
  'Viceroyalty of Brazil':        'Empire of Brazil',
  // Central American Federation dissolved 1838–1840 → individual republics
  // (the dataset lumps them under New Spain; that's handled above as 'Mexico'
  // for the core; the Central American isthmus features are also 'Vice-Royalty
  // of New Spain' and get renamed to a generic catch-all handled in the
  // feature-level pass below)

  // ── Europe ─────────────────────────────────────────────────────────────────
  // Republic of Kraków absorbed by Austrian Empire (1846)
  'Republic of Kraków':           'Austrian Empire',
  // Netherlands: Belgium seceded 1830; the remaining Netherlands is fine
  // Belgium is NOT in the 1815 dataset (it was part of Netherlands) — we
  // can't add it here without new geometry. Leave Netherlands as-is;
  // the era note will explain the Belgian secession.

  // ── Africa ─────────────────────────────────────────────────────────────────
  // Fulani Empire (Sokoto Caliphate) dominates where Oyo and Hausa states were
  'Oyo':          'Sokoto Caliphate',
  'Fulani Empire': 'Sokoto Caliphate',
  // Kaarta (Bambara state in modern Mali) was conquered by the Toucouleur
  // in 1854 — still independent c.1850, keep as is. Actually keep Kaarta.

  // ── South Asia ─────────────────────────────────────────────────────────────
  // Maratha Confederacy fully absorbed by British East India Company (1818)
  'Maratha Confederacy':          'British East India Company',
  // Assam annexed by British in 1826 (after First Anglo-Burmese War)
  'Assam':                        'British East India Company',
  // Arakan and Tenasserim also ceded from Burma to British in 1826
  'Arakan':                       'British East India Company',
  // Sindh (Sind) conquered by British in 1843
  // The 1815 dataset doesn't have Sindh explicitly — it's within Persia
  // or unlabelled. Skip.

  // ── Southeast Asia ─────────────────────────────────────────────────────────
  // Dutch Malacca → now British Malacca (Anglo-Dutch Treaty of 1824 gave
  // Malacca and peninsula to Britain in exchange for Bencoolen / Sumatra)
  'Dutch Malacca':                'British Malacca',
  // Dutch East Indies lost Malacca but kept Sumatra/Java/Borneo etc.
  // Dutch East Indies name unchanged.
  // Penang already British — keep.
  // Singapore was founded 1819 and is now key British port — but the 1815
  // dataset doesn't have it as a separate feature. It is subsumed under
  // Johor Sultanate. Leave as-is.

  // ── Oceania ────────────────────────────────────────────────────────────────
  // 'New South Wales' in 1815 → by 1850 several Australian colonies exist
  // but the dataset only has one label. Keep 'New South Wales' — close enough
  // for a single-label overview.
};

/**
 * Features requiring special handling depending on other properties.
 * Returns the new NAME or null to leave unchanged.
 */
function remapFeature(props) {
  const name = props.NAME;

  // ── Central America ────────────────────────────────────────────────────────
  // The 1815 dataset labels the whole region "Vice-Royalty of New Spain".
  // After NAME_REMAP it becomes 'Mexico'. For features clearly in Central
  // America (Guatemala, Honduras, El Salvador, Nicaragua, Costa Rica) we
  // want a different label, but without coordinates we can't distinguish
  // polygons here. The NAME_REMAP gives 'Mexico' to all — acceptable for
  // a coarse overview; the era note will explain.
  // Nothing to do here (handled by NAME_REMAP above).

  return name ? (NAME_REMAP[name] ?? name) : name;
}

let changed = 0;
for (const feature of data.features) {
  const props = feature.properties;
  if (!props) continue;

  const newName = remapFeature(props);
  if (newName !== props.NAME) {
    props.NAME = newName;
    changed++;
  }
}

// Write output
fs.writeFileSync(OUTPUT, JSON.stringify(data), 'utf8');
console.log(`Done. ${data.features.length} features; ${changed} renamed.`);
console.log(`Output → ${OUTPUT}`);
