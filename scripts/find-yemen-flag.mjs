#!/usr/bin/env node

/**
 * Search for Mutawakkilite Kingdom of Yemen historical flag image.
 *
 * The flag is described as: Red with white sword and 5 stars (1918-1962).
 * Sources to check:
 * 1. Wikidata P41 (flag image) for Mutawakkilite Kingdom (Q10322)
 * 2. Wikimedia Commons: Category:Flags of Yemen
 * 3. FOTW (Flags of the World): crwflags.com/fotw/flags/ye-*.html
 *
 * Expected Wikimedia Commons filenames:
 * - Flag of the Mutawakkilite Kingdom of Yemen.svg
 * - Flag of Yemen (1918-1962).svg
 * - Mutawakkilite Kingdom flag.svg
 */

import https from 'https';

/**
 * Fetch JSON from Wikipedia/Wikimedia API
 */
function fetchWikimedia(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { timeout: 10000 }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('=== Searching for Mutawakkilite Kingdom Yemen Flag ===\n');

  // Search 1: Query Wikidata for Yemen flag image
  console.log('1. Checking Wikidata for Mutawakkilite Kingdom (Q10322)...');
  const wikidataUrl = 'https://www.wikidata.org/wiki/Special:EntityData/Q10322.json';

  try {
    const data = await fetchWikimedia(wikidataUrl);
    const entity = data.entities?.Q10322;

    if (entity?.claims?.P41) {
      console.log(`   ✓ Found P41 (flag image) claim`);
      const flagClaimId = entity.claims.P41[0]?.mainsnak?.datavalue?.value?.id;
      if (flagClaimId) {
        console.log(`   Flag entity: ${flagClaimId}`);
        console.log(`   Check Commons: https://commons.wikimedia.org/wiki/File:Flag_of_the_Mutawakkilite_Kingdom_of_Yemen.svg`);
      }
    } else {
      console.log('   ⚠ No P41 claim found on Wikidata');
    }
  } catch (err) {
    console.log(`   ✗ Wikidata query failed: ${err.message}`);
  }

  console.log('\n2. Direct Wikimedia Commons search URLs:');
  const commonsCandidates = [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Flag_of_the_Mutawakkilite_Kingdom_of_Yemen.svg',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Flag_of_Yemen_%281918%E2%80%931962%29.svg',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Mutawakkilite_Kingdom_flag.svg',
    'https://commons.wikimedia.org/wiki/Special:FilePath/Yemen_flag_1918-1962.svg',
  ];

  commonsCandidates.forEach(url => console.log(`   ${url}`));

  console.log('\n3. FOTW (Flags of the World) reference:');
  console.log('   https://www.crwflags.com/fotw/flags/ye-hk.html (Hashemite Kingdom)');
  console.log('   https://www.crwflags.com/fotw/flags/ye-kmk.html (Mutawakkilite Kingdom)');

  console.log('\n4. Fallback: If Commons image unavailable:');
  console.log('   - Check Wikipedia article: https://en.wikipedia.org/wiki/Mutawakkilite_Kingdom_of_Yemen');
  console.log('   - Use infobox flag image from History section');
  console.log('   - Verify against FOTW for accuracy');

  console.log('\n=== Next Steps ===');
  console.log('1. Download verified flag SVG from Commons or Wikipedia');
  console.log('2. Save to: public/historical-flags/mutawakkilite-yemen.svg');
  console.log('3. Update historicalEras.ts:');
  console.log('   ad1920: ["Yemen", { flag: "historical-flags/mutawakkilite-yemen.svg", ... }]');
  console.log('   ad1938: ["Yemen", { flag: "historical-flags/mutawakkilite-yemen.svg", ... }]');
  console.log('   ad1945: ["Yemen", { flag: "historical-flags/mutawakkilite-yemen.svg", ... }]');
  console.log('   ad1960: ["Yemen", { flag: "historical-flags/mutawakkilite-yemen.svg", ... }]');
  console.log('4. Add flag-meaning entry to src/data/flagMeanings.ts');
  console.log('5. Run npm run flags:check to verify');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
