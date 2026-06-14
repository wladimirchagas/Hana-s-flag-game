/**
 * Download unofficial/local subdivision flags from Wikimedia Commons and store them
 * locally in public/flags/ or public/flags/sub/{CC}/.
 *
 * Run once network egress to upload.wikimedia.org is available:
 *   node scripts/download-unofficial-flags.mjs
 *
 * After running, update LOCAL_FLAG_OVERRIDES in src/api/subdivisions.ts to use
 * the local ${BASE}flags/... paths instead of the https:// Wikimedia URLs.
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const WIKIMEDIA = 'https://upload.wikimedia.org/wikipedia/commons';

const FLAGS = [
  {
    url: `${WIKIMEDIA}/d/d0/Ulster_Banner.svg`,
    dest: 'public/flags/sub/GB/GB-NIR.svg',
    localOverride: '"GB-NIR": `${BASE}flags/sub/GB/GB-NIR.svg`',
    note: 'Ulster Banner — unofficial flag of Northern Ireland',
  },
  {
    url: `${WIKIMEDIA}/4/4d/Flag_of_Somaliland.svg`,
    dest: 'public/flags/so-sl.svg',
    localOverride: '"SO-SL~": `${BASE}flags/so-sl.svg`',
    note: 'Somaliland flag (unofficial — shown under Somalia)',
  },
  {
    url: `${WIKIMEDIA}/0/04/Flag_of_Guadeloupe_%28local%29.svg`,
    dest: 'public/flags/gp.svg',
    localOverride: '"FR-GP": `${BASE}flags/gp.svg`',
    note: 'Guadeloupe local/unofficial flag',
  },
  {
    url: `${WIKIMEDIA}/c/c3/Flag_of_R%C3%A9union_%28L%C3%B6_Mahav%C3%A9li%29.svg`,
    dest: 'public/flags/re.svg',
    localOverride: '"FR-RE": `${BASE}flags/re.svg`',
    note: 'Réunion Lö Mahavéli flag (unofficial)',
  },
  {
    url: `${WIKIMEDIA}/4/4a/Flag_of_Mayotte_%28local%29.svg`,
    dest: 'public/flags/yt-local.svg',
    localOverride: '"FR-YT": `${BASE}flags/yt-local.svg`',
    note: 'Mayotte local/unofficial flag (yt.svg is the French Tricolour — wrong)',
  },
  {
    url: `${WIKIMEDIA}/b/b4/Flag_of_Saint_Barth%C3%A9lemy_(local).svg`,
    dest: 'public/flags/bl.svg',
    localOverride: '"FR-BL": `${BASE}flags/bl.svg`',
    note: 'Saint Barthélemy local/unofficial flag',
  },
  {
    url: `${WIKIMEDIA}/7/74/Flag_of_Saint-Pierre_and_Miquelon.svg`,
    dest: 'public/flags/pm.svg',
    localOverride: '"FR-PM": `${BASE}flags/pm.svg`',
    note: 'Saint Pierre and Miquelon semi-official flag',
  },
  {
    url: `${WIKIMEDIA}/d/d2/Flag_of_Wallis_and_Futuna.svg`,
    dest: 'public/flags/wf.svg',
    localOverride: '"FR-WF": `${BASE}flags/wf.svg`',
    note: 'Wallis and Futuna local/unofficial flag',
  },
];

// Forbidden standardised viewBoxes that fail the flag integrity check.
// Unofficial flags with no real-world proportions are exempt; add their
// basenames to EXEMPT below and document in check-flag-proportions.mjs.
const FORBIDDEN_VIEWBOXES = new Set(['0 0 640 480', '0 0 512 512']);

async function download(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'HanaFlagGame/1.0 (flag download script)' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

function extractViewBox(svg) {
  const m = svg.match(/viewBox="([^"]+)"/);
  return m ? m[1] : null;
}

let ok = 0;
let warn = 0;

for (const { url, dest, localOverride, note } of FLAGS) {
  process.stdout.write(`  ${dest} ... `);
  try {
    const svg = await download(url);
    const vb = extractViewBox(svg);
    const destPath = join(ROOT, dest);
    mkdirSync(dirname(destPath), { recursive: true });
    writeFileSync(destPath, svg, 'utf8');

    if (vb && FORBIDDEN_VIEWBOXES.has(vb)) {
      console.log(`⚠  written (viewBox="${vb}" — add basename to EXEMPT_UNOFFICIAL_FLAGS in check-flag-proportions.mjs)`);
      warn++;
    } else {
      console.log(`✓  viewBox="${vb ?? '?'}"`);
      ok++;
    }
    console.log(`     → Update LOCAL_FLAG_OVERRIDES: ${localOverride}`);
    console.log(`     → Note: ${note}`);
  } catch (e) {
    console.log(`✗  FAILED: ${e.message}`);
    warn++;
  }
}

console.log('');
console.log(`Done: ${ok} downloaded, ${warn} warnings.`);
console.log('');
console.log('Next steps:');
console.log('1. Update LOCAL_FLAG_OVERRIDES in src/api/subdivisions.ts (see → lines above)');
console.log('2. For any ⚠ files: add basename to EXEMPT_UNOFFICIAL_FLAGS in scripts/check-flag-proportions.mjs');
console.log('3. Run: npm run flags:check');
console.log('4. Run: npm run dev — visually verify every affected flag in the browser');
