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
  if (t === 'External Territory') return 'External Territories';
  if (t === 'Unincorporated Territory') return 'Unincorporated Territories';
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
  "FI": "Provinces & Autonomous Territory",
  "FR": "Departments & Overseas Territories",
  "GB": "Countries, Crown Dependencies & Territories",
  "NL": "Provinces & Special Territories",
  "NO": "Counties & Dependencies",
  "NZ": "Regional Councils, Associated States & External Territories",
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
  // Countries below share ONE display name across two sibling subdivisions —
  // the national capital's own city-level unit and the surrounding
  // region/province of the same name (Natural Earth's name_en collapses both
  // to the plain place name). Besides being confusing in the flag grid, this
  // fed a real bug: the hierarchy chart/table used a name-only lookup to find
  // "the subdivision that IS the capital", and with two identically-named
  // siblings it could pick either one depending on array order — Argentina's
  // Buenos Aires Province (AR-B) wrongly got the "★ National capital" badge
  // instead of the Autonomous City (AR-C), which is Argentina's actual federal
  // capital (Const. art. 129) (reported 2026-07). `hierarchyData.ts` now
  // disambiguates via the authoritative NATIONAL_CAPITAL_SUBDIVISION
  // point-in-polygon host, but the two cards still need distinct names so a
  // user isn't looking at "Buenos Aires" / "Buenos Aires" side by side.
  // Names below are the official/ISO-3166-2 English designation for each.
  "AR": {
    "AR-B": "Buenos Aires Province" // ISO 3166-2:AR — surrounding province, not the capital
    // AR-C keeps the plain name "Buenos Aires"; its typeLabel override below
    // ("Autonomous City") is what disambiguates it — see SUBDIVISION_TYPE_OVERRIDES_NEW.
  },
  "BG": {
    "BG-22": "Sofia (Capital)" // ISO 3166-2:BG official EN name "Sofia (stolitsa)" — the capital city-district
  },
  "HR": {
    "HR-01": "Zagreb County", // ISO 3166-2:HR official EN name
    "HR-21": "Zagreb City" // ISO 3166-2:HR official EN name
  },
  "RU": {
    "UA-43": "Republic of Crimea",
    "UA-40": "Sevastopol",
    "RU-MOW": "Moscow Oblast" // the surrounding region; RU-MOS is Moscow the federal city
  },
  "UA": {
    "UA-32": "Kyiv Oblast" // the surrounding region; UA-30 is Kyiv City itself
  },
  "UZ": {
    "UZ-TO": "Tashkent Region", // the surrounding region
    "UZ-TK": "Tashkent City" // ISO 3166-2:UZ official EN name — the capital city
  },
  "YE": {
    "YE-SA": "Sanaa City" // Amanat Al-Asimah, the capital municipality; YE-SN is the surrounding governorate
  },
  "FR": {
    // Natural Earth's name_en for FR-64 is the anglicised, mis-spelled
    // "Pyrenees-Atlantics". Correct it to the official French spelling.
    "FR-64": "Pyrénées-Atlantiques"
  },
  "PA": {
    // Natural Earth mislabels PA-1: its name_en is "comarca Ngäbe-Buglé"
    // (which is actually PA-NB) while its name/geometry is Bocas del Toro.
    // PA-1 is the Province of Bocas del Toro per ISO 3166-2:PA.
    "PA-1": "Bocas del Toro"
  },
  "PG": {
    // Source name_en for PG-NSB is a truncated "of Bougainville" (from
    // "Autonomous Region of Bougainville"); its name is the former "North
    // Solomons". Use the current short name.
    "PG-NSB": "Bougainville"
  },
  "BR": {
    // Natural Earth's name_en for BR-DF is the truncated "Federal" (from
    // "Distrito Federal"). Correct it to the official Portuguese name.
    "BR-DF": "Distrito Federal"
  },
  "MY": {
    // Natural Earth gives the Malay "Melaka" for MY-04 but anglicises its
    // sibling MY-07 to "Penang" — an inconsistency. The app's convention is the
    // common English name (Penang, not Pulau Pinang), and the capital city is
    // already "Malacca" (capitalDetails/cities), so standardise the state on
    // "Malacca" too: one romanisation for the state and its capital.
    "MY-04": "Malacca"
  },
  "GR": {
    // Natural Earth's name_en is the transliterated Greek, not the established
    // English exonym: GR-E "Thessalia" → "Thessaly"; GR-B "Centre Macedonia" is
    // a mistranslation of "Κεντρική Μακεδονία" → "Central Macedonia".
    "GR-E": "Thessaly",
    "GR-B": "Central Macedonia"
  },
  "CZ": {
    // Natural Earth's name_en for CZ-PL is the truncated "Plzeň-" (from
    // "Plzeňský kraj"). Use the established English exonym for the city the
    // region is named after: Pilsen.
    "CZ-PL": "Pilsen"
  }
};

const SUBDIVISION_TYPE_OVERRIDES_NEW = {
  "RU": {
    "UA-43": "Republic",
    "UA-40": "Federal City"
  },
  "UA": {
    "UA-40": "Special Status City"
  },
  "AR": {
    // AR-C is the Autonomous City of Buenos Aires (Ciudad Autónoma de Buenos
    // Aires) — Argentina's federal capital under Const. art. 129, a city-level
    // entity with province-equivalent status, distinct from AR-B (Buenos
    // Aires Province, an ordinary province). Natural Earth's type_en wrongly
    // tags BOTH "Federal District" (only AR-C is any kind of federal seat;
    // AR-B is a plain province). ISO 3166-2:AR category for AR-C is "city";
    // "Autonomous City" is the same typeLabel already used for Spain's Ceuta
    // and Melilla (ES-CE/ES-ML).
    "AR-B": "Province",
    "AR-C": "Autonomous City"
  },
  "UZ": {
    // Natural Earth tags UZ-TK (Tashkent City, ISO 3166-2:UZ category "city")
    // as "Region" — same as its sibling UZ-TO (Tashkent Region, the
    // surrounding oblast). Tashkent City is administered separately as an
    // independent city, not a wiloyat.
    "UZ-TK": "City"
  },
  "YE": {
    // YE-SA is Amanat Al-Asimah ("Capital Municipality"), ISO 3166-2:YE
    // category "municipality" — a distinct capital-city unit, not one of
    // Yemen's ordinary governorates (YE-SN, the surrounding Sanaa Governorate).
    "YE-SA": "Municipality"
  }
};

const DISPUTED_SUBDIV_CODES = new Set([
  "UA-43", "UA-40", "GB-GI", "ES-GIB~", "GB-FK", "AR-ML~", "TR-NC~", "CY-06~", "CN-TW"
]);

// Features whose iso_3166_2 code belongs to a larger entity they are physically part of.
// Natural Earth gives these their own polygons, but they are NOT distinct administrative
// subdivisions and must not appear as separate entries in the flag grid.
// Format: "CODE|feature name" to be maximally specific.
const SUBDIVISION_FEATURE_EXCLUDE = new Set([
  "AU-NSW|Lord Howe Island", // Island dependency of NSW; governed under NSW law, not Commonwealth law
]);

// Primary (tier-0) subdivisions that genuinely exist under the country's own law
// but are ABSENT from the Natural Earth admin-1 topology (the geometry source).
// Natural Earth's admin-1 dataset is stale: it never added several subdivisions
// created/redrawn in the 2010s–2020s, so they were silently dropped from the flag
// grid and the Sub-national flags game even though their flags are bundled in
// public/flags/sub/<CC>/. Unlike TERRITORIES_TO_APPEND (external/dependent
// tier-1 territories), these are core administrative divisions and use a
// primary typeLabel so they group with their siblings (tier 0).
//
// Each entry is verified against ISO 3166-2 and the country's own territorial
// law (see inline source notes), per the "subdivision research" hard rule in
// CLAUDE.md. Their flags are bundled and pass scripts/check-parent-flag-collision.mjs.
// They have no polygon in the per-country GeoJSON, so they appear in the flag
// grid / game but their landmass is not separately drawn on the subdivision map
// (it remains part of the parent division it was split from) until Natural Earth
// ships geometry for them.
const PRIMARY_SUBDIVISIONS_TO_APPEND = {
  "PA": [
    // Created 2014 by Law 119 from the eastern part of Panamá Province.
    { code: "PA-10", name: "Panamá Oeste", typeLabel: "Province" },
    // Comarca created 2020 by Law 156 from parts of Bocas del Toro province.
    { code: "PA-NT", name: "Naso Tjër Di", typeLabel: "Indigenous Territory" }
  ],
  "ET": [
    // Sidama Region — established 2020 after the 2019 referendum, split from the
    // former Southern Nations, Nationalities and Peoples' Region.
    { code: "ET-SI", name: "Sidama", typeLabel: "Administrative State" }
  ],
  "MM": [
    // Nay Pyi Taw Union Territory — created 2010 as the seat of government,
    // administered directly by the Union (President), not a state/region.
    { code: "MM-18", name: "Nay Pyi Taw", typeLabel: "Union Territory" }
  ],
  "PG": [
    // Hela and Jiwaka provinces — created 2012, split from Southern Highlands
    // and Western Highlands respectively.
    { code: "PG-HLA", name: "Hela", typeLabel: "Province" },
    { code: "PG-JWK", name: "Jiwaka", typeLabel: "Province" }
  ],
  "SD": [
    // West Kordofan State — re-established 2013 from parts of North and
    // South Kordofan.
    { code: "SD-GK", name: "West Kordofan", typeLabel: "State" }
  ]
};

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
    { code: "US-PR", name: "Puerto Rico", typeLabel: "Unincorporated Territory" },
    { code: "US-MP", name: "Northern Mariana Islands", typeLabel: "Unincorporated Territory" },
    { code: "US-VI", name: "U.S. Virgin Islands", typeLabel: "Unincorporated Territory" },
    { code: "US-AS", name: "American Samoa", typeLabel: "Unincorporated Territory" },
    { code: "US-GU", name: "Guam", typeLabel: "Unincorporated Territory" }
  ],
  "FR": [
    { code: "FR-BL", name: "Saint Barthélemy", typeLabel: "Overseas Collectivity" },
    { code: "FR-MF", name: "Saint Martin", typeLabel: "Overseas Collectivity" },
    { code: "FR-PM", name: "Saint Pierre and Miquelon", typeLabel: "Overseas Collectivity" },
    { code: "FR-WF", name: "Wallis and Futuna", typeLabel: "Overseas Collectivity" },
    { code: "FR-PF", name: "French Polynesia", typeLabel: "Overseas Collectivity" },
    // New Caledonia is a sui generis collectivity, a unique status distinct from
    // the standard Overseas Collectivities. Defined by Title XIII of the French
    // Constitution (Arts. 76–77) following the 1998 Nouméa Accord.
    { code: "FR-NC", name: "New Caledonia", typeLabel: "Sui generis collectivity" }
  ],
  "NZ": [
    { code: "NZ-CK", name: "Cook Islands", typeLabel: "Associated State" },
    { code: "NZ-NU", name: "Niue", typeLabel: "Associated State" },
    { code: "NZ-TK", name: "Tokelau", typeLabel: "External Territory" }
  ],
  "FI": [
    { code: "FI-AX", name: "Åland Islands", typeLabel: "Autonomous Territory" }
  ],
  "AU": [
    { code: "AU-CC", name: "Cocos (Keeling) Islands", typeLabel: "External Territory" },
    { code: "AU-CX", name: "Christmas Island", typeLabel: "External Territory" },
    { code: "AU-NF", name: "Norfolk Island", typeLabel: "External Territory" }
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
    // Northern Cyprus — the TRNC, recognised only by Türkiye; the Republic of
    // Cyprus claims it. The merged geometry (XN.json) is the WHOLE of Northern
    // Cyprus, so it must be one disputed-territory card (CY-NC~), not mislabelled
    // as the single "Kyrenia" district (CY-06~) it used to carry.
    { code: "CY-NC~", name: "Northern Cyprus", typeLabel: "Disputed Territory" }
  ],
  "MA": [
    // Western Sahara — Morocco administers and claims most of it as its "Southern
    // Provinces"; the SADR/Polisario dispute it. Shown as a single disputed
    // territory under Morocco (geometry merged from EH.json as MA-EH~).
    { code: "MA-EH~", name: "Western Sahara", typeLabel: "Disputed Territory" }
  ],
  "RS": [
    // Kosovo — declared independence 2008; Serbia claims it as its Autonomous
    // Province of Kosovo and Metohija. Shown as a single disputed territory under
    // Serbia (its own internal municipalities are dissolved away at render time),
    // not a UN member. typeLabel "Disputed Territory" per the CLAUDE.md rule.
    { code: "RS-KM~", name: "Kosovo", typeLabel: "Disputed Territory" }
  ],
  "SO": [
    // Somaliland — declared independence from Somalia in 1991; unrecognised by any
    // UN member. Somalia claims it. Shown as a single disputed territory under
    // Somalia (geometry merged from XS.json as SO-SL~), so it is a proper card with
    // its own flag ("not officially recognised by Somalia") and capital (Hargeisa).
    { code: "SO-SL~", name: "Somaliland", typeLabel: "Disputed Territory" }
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
  // Multiple polygons can legitimately share a code after dedupe-subdivision-codes.mjs
  // (Pattern A "same place" merges and Pattern B "absorb sub-units" groups keep the
  // shared code so every polygon highlights together on the map, but must appear as a
  // SINGLE card in the flag grid). Collapse those to one division per code.
  const seenCodes = new Set();
  for (const f of fc.features) {
    const p = f.properties || {};
    const divCode = p.iso_3166_2 || p.name || '';
    if (!divCode) continue;
    let name = p.name_en || p.name || divCode;
    
    // Custom PLACEHOLDER island codes are `-X` + DIGITS (e.g. CN-X01~, AU-X03~,
    // AI-X00). Legitimate ISO 3166-2 codes that merely START with X are `-X` + a
    // LETTER (Xinjiang CN-XJ, Xorazm UZ-XO, Laos LA-XA/XI/XE, Azerbaijan AZ-XAC…)
    // and MUST NOT be treated as placeholders — matching them on the old
    // `includes('-X')` silently dropped those real subdivisions from the meta,
    // making them unselectable on the map (see CLAUDE.md hard rule below).
    const isPlaceholderXCode = /-X\d/.test(divCode);

    // Skip nameless placeholder features
    if (name === divCode && isPlaceholderXCode) {
      continue;
    }

    // Skip custom-coded subdivisions (~ or placeholder -X#) that do not have a flag
    if ((divCode.includes('~') || isPlaceholderXCode) && !flagCodes.has(divCode)) {
      continue;
    }

    // Skip features that share a code with a larger entity they are part of
    if (SUBDIVISION_FEATURE_EXCLUDE.has(`${divCode}|${name}`)) {
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

    // One card per code — see seenCodes note above.
    if (seenCodes.has(divCode)) continue;
    seenCodes.add(divCode);

    divisions.push({ code: divCode, name, typeLabel });
  }

  if (PRIMARY_SUBDIVISIONS_TO_APPEND[code]) {
    // Only append entries not already present from the geometry source, so a
    // future Natural Earth update that adds them does not create duplicates.
    const existing = new Set(divisions.map(d => d.code));
    for (const d of PRIMARY_SUBDIVISIONS_TO_APPEND[code]) {
      if (!existing.has(d.code)) divisions.push(d);
    }
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
