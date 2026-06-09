/**
 * Build src/lib/subdivisionMeta.ts from public/subdivisions/*.json files.
 * Run: node scripts/build-subdivision-meta.mjs
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

const INPUT_DIR = join(projectRoot, 'public', 'subdivisions');
const OUTPUT = join(projectRoot, 'src', 'lib', 'subdivisionMeta.ts');

// Plural overrides
function pluralize(type) {
  const t = (type || '').trim();
  if (!t) return 'Divisions';
  // Special cases
  if (t === 'Land') return 'Länder';
  if (t === 'Territory') return 'Territories';
  if (t === 'County') return 'Counties';
  if (t === 'City') return 'Cities';
  if (t === 'Dependency') return 'Dependencies';
  if (t === 'Duchy') return 'Duchies';
  if (t === 'Autonomous Community') return 'Autonomous Communities';
  if (t === 'Autonomous Region') return 'Autonomous Regions';
  if (t === 'Autonomous Republic') return 'Autonomous Republics';
  if (t === 'Federal District') return 'Federal Districts';
  if (t === 'Union Territory') return 'Union Territories';
  // Default: append s
  return t + 's';
}

const PLURAL_LABEL_OVERRIDES = {
  "AU": "States & Territories",
  "CN": "Provinces & Special Territories",
  "DK": "Regions & Autonomous Territories",
  "ES": "Autonomous Communities & Claimed Territory",
  "FI": "Provinces & Autonomous Region",
  "FR": "Departments & Overseas Territories",
  "GB": "Divisions, Crown Dependencies & Disputed Territories",
  "NL": "Provinces & Special Territories",
  "NO": "Counties & Dependencies",
  "NZ": "Regional Councils, Associated States & Territories",
  "US": "States & Territories"
};

const SUBDIVISION_TYPE_OVERRIDES = {
  "AU-X03~": "Territory", // Macquarie Island
  "AU-X04~": "Territory", // Ashmore and Cartier Islands
  "CN-X01~": "Territory", // Paracel Islands
  "NO-X01~": "Territory", // Bouvet Island
  "NZ-X01~": "Territory", // Kermadec Islands
  "NZ-X03~": "Territory", // Three Kings Islands
  "NZ-X04~": "Territory", // Antipodes Islands
  "NZ-X05~": "Territory", // Campbell Islands
  "NZ-X06~": "Territory", // Auckland Islands
  "NZ-X07~": "Territory", // Snares Islands
  "SY-X01~": "Territory"  // Western al-Samadania
};

const SUBDIVISION_NAME_OVERRIDES_NEW = {
  "RU": {
    "UA-43": "Republic of Crimea",
    "UA-40": "Sevastopol"
  }
};

const SUBDIVISION_TYPE_OVERRIDES_NEW = {
  "RU": {
    "UA-43": "Republic",
    "UA-40": "Federal City"
  },
  "UA": {
    "UA-40": "Special Status City"
  }
};

const DISPUTED_SUBDIV_CODES = new Set([
  "UA-43", "UA-40", "GB-GI", "ES-GIB~", "GB-FK", "AR-ML~", "TR-NC~", "CY-06~", "CN-TW"
]);

const TERRITORIES_TO_APPEND = {
  "DK": [
    { code: "DK-GL", name: "Greenland", typeLabel: "Autonomous Territory" },
    { code: "DK-FO", name: "Faroe Islands", typeLabel: "Autonomous Territory" }
  ],
  "CN": [
    { code: "CN-HK", name: "Hong Kong", typeLabel: "Special Administrative Region" },
    { code: "CN-MO", name: "Macau", typeLabel: "Special Administrative Region" },
    { code: "CN-TW", name: "Taiwan", typeLabel: "Disputed Territory" }
  ],
  "NL": [
    { code: "NL-AW", name: "Aruba", typeLabel: "Constituent Country" },
    { code: "NL-CW", name: "Curaçao", typeLabel: "Constituent Country" },
    { code: "NL-SX", name: "Sint Maarten", typeLabel: "Constituent Country" }
  ],
  "GB": [
    { code: "GB-JE", name: "Jersey", typeLabel: "Crown Dependency" },
    { code: "GB-GG", name: "Guernsey", typeLabel: "Crown Dependency" },
    { code: "GB-IM", name: "Isle of Man", typeLabel: "Crown Dependency" },
    { code: "GB-GI", name: "Gibraltar", typeLabel: "Disputed Territory" },
    { code: "GB-FK", name: "Falkland Islands", typeLabel: "Disputed Territory" },
    { code: "GB-IO", name: "British Indian Ocean Territory", typeLabel: "Overseas Territory" },
    { code: "GB-GS", name: "South Georgia and South Sandwich Islands", typeLabel: "Overseas Territory" },
    { code: "GB-AI", name: "Anguilla", typeLabel: "Overseas Territory" },
    { code: "GB-BM", name: "Bermuda", typeLabel: "Overseas Territory" },
    { code: "GB-VG", name: "British Virgin Islands", typeLabel: "Overseas Territory" },
    { code: "GB-KY", name: "Cayman Islands", typeLabel: "Overseas Territory" },
    { code: "GB-MS", name: "Montserrat", typeLabel: "Overseas Territory" },
    { code: "GB-SH", name: "Saint Helena", typeLabel: "Overseas Territory" },
    { code: "GB-TC", name: "Turks and Caicos Islands", typeLabel: "Overseas Territory" },
    { code: "GB-PN", name: "Pitcairn Islands", typeLabel: "Overseas Territory" }
  ],
  "US": [
    { code: "US-PR", name: "Puerto Rico", typeLabel: "Territory" },
    { code: "US-MP", name: "Northern Mariana Islands", typeLabel: "Territory" },
    { code: "US-VI", name: "U.S. Virgin Islands", typeLabel: "Territory" },
    { code: "US-AS", name: "American Samoa", typeLabel: "Territory" },
    { code: "US-GU", name: "Guam", typeLabel: "Territory" }
  ],
  "FR": [
    { code: "FR-BL", name: "Saint Barthélemy", typeLabel: "Overseas Collectivity" },
    { code: "FR-MF", name: "Saint Martin", typeLabel: "Overseas Collectivity" },
    { code: "FR-PM", name: "Saint Pierre and Miquelon", typeLabel: "Overseas Collectivity" },
    { code: "FR-WF", name: "Wallis and Futuna", typeLabel: "Overseas Collectivity" },
    { code: "FR-PF", name: "French Polynesia", typeLabel: "Overseas Collectivity" },
    { code: "FR-NC", name: "New Caledonia", typeLabel: "Overseas Collectivity" }
  ],
  "NZ": [
    { code: "NZ-CK", name: "Cook Islands", typeLabel: "Associated State" },
    { code: "NZ-NU", name: "Niue", typeLabel: "Associated State" },
    { code: "NZ-TK", name: "Tokelau", typeLabel: "Territory" }
  ],
  "FI": [
    { code: "FI-AX", name: "Åland Islands", typeLabel: "Autonomous Region" }
  ],
  "AU": [
    { code: "AU-CC", name: "Cocos (Keeling) Islands", typeLabel: "Territory" },
    { code: "AU-CX", name: "Christmas Island", typeLabel: "Territory" },
    { code: "AU-NF", name: "Norfolk Island", typeLabel: "Territory" }
  ],
  "AR": [
    { code: "AR-ML~", name: "Malvinas Islands", typeLabel: "Claimed Territory" }
  ],
  "ES": [
    { code: "ES-GIB~", name: "Gibraltar", typeLabel: "Claimed Territory" }
  ],
  "TR": [
    { code: "TR-NC~", name: "Turkish Republic of Northern Cyprus", typeLabel: "Claimed State" }
  ],
  "CY": [
    { code: "CY-06~", name: "Kyrenia", typeLabel: "District" }
  ],
  "UA": [
    { code: "UA-43", name: "Autonomous Republic of Crimea", typeLabel: "Autonomous Republic" },
    { code: "UA-40", name: "Sevastopol", typeLabel: "Special Status City" }
  ]
};

// Load flagCodes from the flag index and subdivisions override file
const flagIndexText = readFileSync(join(projectRoot, 'src', 'lib', 'subdivisionFlagIndex.ts'), 'utf8');
const flagCodes = new Set();
const matches = flagIndexText.match(/"[A-Z0-9~_-]+"/g) || [];
for (const m of matches) {
  flagCodes.add(m.slice(1, -1));
}

const apiText = readFileSync(join(projectRoot, 'src', 'api', 'subdivisions.ts'), 'utf8');
const overrideMatches = apiText.match(/"[A-Z0-9~_-]+"\s*:/g) || [];
for (const m of overrideMatches) {
  const code = m.replace(/["\s:]/g, '');
  flagCodes.add(code);
}

const files = readdirSync(INPUT_DIR).filter(f => {
  // Only include valid ISO 3166-1 alpha-2 codes (2 uppercase letters)
  const code = f.replace('.json', '');
  return f.endsWith('.json') && /^[A-Z]{2}$/.test(code);
});
console.log(`Processing ${files.length} country files...`);

const entries = [];

for (const file of files.sort()) {
  const code = file.replace('.json', '');
  const raw = readFileSync(join(INPUT_DIR, file), 'utf8');
  let fc;
  try {
    fc = JSON.parse(raw);
  } catch {
    console.warn(`Failed to parse ${file}`);
    continue;
  }

  if (!fc.features || fc.features.length === 0) continue;

  // Count type_en occurrences to find the most common type
  const typeCounts = new Map();
  for (const f of fc.features) {
    const t = f.properties?.type_en || '';
    typeCounts.set(t, (typeCounts.get(t) || 0) + 1);
  }

  // Find most common non-empty type
  let bestType = '';
  let bestCount = 0;
  for (const [t, c] of typeCounts) {
    if (t && c > bestCount) {
      bestType = t;
      bestCount = c;
    }
  }
  if (!bestType) bestType = 'Division';

  let pluralLabel = pluralize(bestType);
  if (PLURAL_LABEL_OVERRIDES[code]) {
    pluralLabel = PLURAL_LABEL_OVERRIDES[code];
  }

  // Build divisions list
  const divisions = [];
  for (const f of fc.features) {
    const p = f.properties || {};
    const divCode = p.iso_3166_2 || p.name || '';
    if (!divCode) continue;
    let name = p.name_en || p.name || divCode;
    
    // Skip nameless placeholder features
    if (name === divCode && divCode.includes('-X')) {
      continue;
    }
    
    // Skip custom-coded subdivisions (~ or -X) that do not have a flag
    if ((divCode.includes('~') || divCode.includes('-X')) && !flagCodes.has(divCode)) {
      continue;
    }
    
    let typeLabel = p.type_en || p.type || bestType;
    if (SUBDIVISION_TYPE_OVERRIDES_NEW[code]?.[divCode]) {
      typeLabel = SUBDIVISION_TYPE_OVERRIDES_NEW[code][divCode];
    } else if (SUBDIVISION_TYPE_OVERRIDES[divCode]) {
      typeLabel = SUBDIVISION_TYPE_OVERRIDES[divCode];
    }

    if (SUBDIVISION_NAME_OVERRIDES_NEW[code]?.[divCode]) {
      name = SUBDIVISION_NAME_OVERRIDES_NEW[code][divCode];
    }
    
    divisions.push({ code: divCode, name, typeLabel });
  }

  if (TERRITORIES_TO_APPEND[code]) {
    divisions.push(...TERRITORIES_TO_APPEND[code]);
  }

  if (divisions.length === 0) continue;

  entries.push({ countryCode: code, pluralLabel, divisions });
}

console.log(`Building meta for ${entries.length} countries...`);

// Generate TypeScript content
let ts = `// Auto-generated by scripts/build-subdivision-meta.mjs — DO NOT EDIT MANUALLY
// Source: Natural Earth 10m admin-1 states/provinces

export type SubdivisionMeta = {
  code: string;       // ISO 3166-2 (e.g. "US-CA") or name fallback
  name: string;
  typeLabel: string;  // "State", "Province", "Prefecture", etc.
  isDisputed?: boolean;
};

export type CountrySubdivisionMeta = {
  countryCode: string;
  pluralLabel: string; // "States", "Provinces", etc.
  divisions: SubdivisionMeta[];
};

export const SUBDIVISION_META: Record<string, CountrySubdivisionMeta> = {\n`;

for (const entry of entries) {
  const divsJson = entry.divisions
    .map(d => {
      const parts = [
        `code: ${JSON.stringify(d.code)}`,
        `name: ${JSON.stringify(d.name)}`,
        `typeLabel: ${JSON.stringify(d.typeLabel)}`
      ];
      if (DISPUTED_SUBDIV_CODES.has(d.code)) {
        parts.push(`isDisputed: true`);
      }
      return `    { ${parts.join(', ')} }`;
    })
    .join(',\n');
  ts += `  ${JSON.stringify(entry.countryCode)}: {\n`;
  ts += `    countryCode: ${JSON.stringify(entry.countryCode)},\n`;
  ts += `    pluralLabel: ${JSON.stringify(entry.pluralLabel)},\n`;
  ts += `    divisions: [\n${divsJson}\n    ],\n`;
  ts += `  },\n`;
}

ts += `};\n`;

writeFileSync(OUTPUT, ts);
console.log(`Written ${OUTPUT}`);
console.log(`Total lines: ${ts.split('\n').length}`);
