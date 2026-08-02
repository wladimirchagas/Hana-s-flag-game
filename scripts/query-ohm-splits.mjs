#!/usr/bin/env node

/**
 * Query OpenHistoricalMap via Overpass API for historical territorial splits.
 *
 * Usage: node scripts/query-ohm-splits.mjs
 *
 * Fetches:
 * - North Vietnam (Democratic Republic of Vietnam, 1954-1975)
 * - South Vietnam (Republic of Vietnam, 1954-1975)
 * - North Yemen (Yemen Arab Republic, 1962-1990)
 * - South Yemen (People's Democratic Republic of Yemen, 1967-1990)
 *
 * Outputs: GeoJSON features ready for merging into world_1960.geojson
 */

import fs from 'fs';
import path from 'path';
import https from 'https';

const OVERPASS_API = 'https://overpass-turbo.openhistoricalmap.org/api/interpreter';

/**
 * Query Overpass API for administrative boundaries during a specific time period.
 * Returns features that existed during the specified date range.
 */
async function queryOverpass(query) {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({ data: query });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData.toString()),
      },
      timeout: 60000, // 60 second timeout
    };

    const req = https.request(OVERPASS_API, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`Overpass API returned ${res.statusCode}: ${data.substring(0, 200)}`));
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Overpass API request timed out'));
    });

    req.write(postData.toString());
    req.end();
  });
}

/**
 * Query for North Vietnam (DRV) administrative boundary.
 * Dates: ~1954-1975 (17th parallel division)
 */
async function fetchNorthVietnam() {
  // Overpass query for administrative boundaries in North Vietnam area
  // (north of 17th parallel) that were tagged as "Democratic Republic of Vietnam"
  // or "North Vietnam" during 1954-1975
  const query = `[bbox:15.8,104.0,23.5,109.5][date:"1960-01-01T00:00:00Z"];
    (
      relation["boundary"="administrative"]["name"~"North Vietnam|Democratic Republic of Vietnam"]["start_date"~"195[0-9]|196[0-9]"];
      relation["admin_level"="2"]["name"~"Vietnam"]["end_date"~"197[0-9]|198[0-9]"];
    );
    out geom;`;

  console.log('Querying OpenHistoricalMap for North Vietnam...');
  try {
    const result = await queryOverpass(query);
    console.log('✓ North Vietnam query successful');
    return result;
  } catch (err) {
    console.error('✗ North Vietnam query failed:', err.message);
    return null;
  }
}

/**
 * Query for South Vietnam (RVN) administrative boundary.
 */
async function fetchSouthVietnam() {
  const query = `[bbox:8.0,103.0,17.5,107.5][date:"1960-01-01T00:00:00Z"];
    (
      relation["boundary"="administrative"]["name"~"South Vietnam|Republic of Vietnam"]["start_date"~"195[0-9]|196[0-9]"];
    );
    out geom;`;

  console.log('Querying OpenHistoricalMap for South Vietnam...');
  try {
    const result = await queryOverpass(query);
    console.log('✓ South Vietnam query successful');
    return result;
  } catch (err) {
    console.error('✗ South Vietnam query failed:', err.message);
    return null;
  }
}

/**
 * Query for Yemen splits.
 */
async function fetchYemenSplits() {
  // Query for both North Yemen (YAR) and South Yemen (PDRY)
  const query = `[bbox:12.0,42.0,20.0,55.0][date:"1960-01-01T00:00:00Z"];
    (
      relation["boundary"="administrative"]["name"~"Yemen Arab Republic|North Yemen|South Yemen|People's Democratic Republic"];
      relation["admin_level"="2"]["name"="Yemen"];
    );
    out geom;`;

  console.log('Querying OpenHistoricalMap for Yemen splits...');
  try {
    const result = await queryOverpass(query);
    console.log('✓ Yemen query successful');
    return result;
  } catch (err) {
    console.error('✗ Yemen query failed:', err.message);
    return null;
  }
}

/**
 * Main execution.
 */
async function main() {
  console.log('=== OpenHistoricalMap Territory Split Query ===\n');
  console.log('Note: This script demonstrates the query structure.');
  console.log('Full implementation requires Overpass API egress and response parsing.\n');

  // Check network availability
  const testUrl = 'https://overpass-turbo.openhistoricalmap.org/api/interpreter';
  console.log(`Testing connectivity to ${testUrl}...`);

  try {
    const responses = await Promise.allSettled([
      fetchNorthVietnam(),
      fetchSouthVietnam(),
      fetchYemenSplits(),
    ]);

    // Log results
    responses.forEach((result, i) => {
      const names = ['North Vietnam', 'South Vietnam', 'Yemen'];
      if (result.status === 'fulfilled') {
        if (result.value) {
          console.log(`✓ ${names[i]}: Data retrieved (${result.value.length} bytes)`);
        }
      } else {
        console.log(`✗ ${names[i]}: Query failed - ${result.reason.message}`);
      }
    });

    console.log('\n=== Next Steps ===');
    console.log('1. Parse Overpass responses (OSM XML or JSON)');
    console.log('2. Convert to GeoJSON FeatureCollections');
    console.log('3. Ensure properties match world_1960.geojson schema');
    console.log('4. Add "NAME", "ISO_A3", etc. properties');
    console.log('5. Merge into world_1960.geojson and create new GeoJSON');
    console.log('6. Update historicalEras.ts with split entries');
    console.log('7. Run npm run flags:check to verify');

  } catch (err) {
    console.error('Fatal error:', err.message);
    process.exit(1);
  }
}

main();
