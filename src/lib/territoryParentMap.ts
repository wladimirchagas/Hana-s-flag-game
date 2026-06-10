// Maps ISO alpha-2 territory codes to their administering UN member state.
// Used by the world map to:
//  (a) redirect clicks on territories to the parent country
//  (b) highlight all territories when their parent country is selected
type TerritoryEntry = { code: string; name: string; parent: string };

const ENTRIES: TerritoryEntry[] = [
  // Denmark
  { code: "GL", name: "Greenland",                                    parent: "DK" },
  { code: "FO", name: "Faroe Islands",                                parent: "DK" },
  // China
  { code: "HK", name: "Hong Kong",                                    parent: "CN" },
  { code: "MO", name: "Macau",                                        parent: "CN" },
  // Netherlands
  { code: "AW", name: "Aruba",                                        parent: "NL" },
  { code: "CW", name: "Curaçao",                                      parent: "NL" },
  { code: "SX", name: "Sint Maarten",                                 parent: "NL" },
  { code: "BQ", name: "Caribbean Netherlands",                        parent: "NL" },
  // United Kingdom
  { code: "AI", name: "Anguilla",                                     parent: "GB" },
  { code: "BM", name: "Bermuda",                                      parent: "GB" },
  { code: "VG", name: "British Virgin Islands",                       parent: "GB" },
  { code: "KY", name: "Cayman Islands",                               parent: "GB" },
  { code: "FK", name: "Falkland Islands",                             parent: "GB" },
  { code: "MS", name: "Montserrat",                                   parent: "GB" },
  { code: "SH", name: "Saint Helena, Ascension and Tristan da Cunha", parent: "GB" },
  { code: "TC", name: "Turks and Caicos Islands",                     parent: "GB" },
  { code: "GI", name: "Gibraltar",                                    parent: "GB" },
  { code: "PN", name: "Pitcairn Islands",                             parent: "GB" },
  { code: "IO", name: "British Indian Ocean Territory",               parent: "GB" },
  { code: "GS", name: "South Georgia and South Sandwich Islands",     parent: "GB" },
  { code: "JE", name: "Jersey",                                       parent: "GB" },
  { code: "GG", name: "Guernsey",                                     parent: "GB" },
  { code: "IM", name: "Isle of Man",                                  parent: "GB" },
  // United States
  { code: "PR", name: "Puerto Rico",                                  parent: "US" },
  { code: "MP", name: "Northern Mariana Islands",                     parent: "US" },
  { code: "VI", name: "U.S. Virgin Islands",                          parent: "US" },
  { code: "AS", name: "American Samoa",                               parent: "US" },
  { code: "GU", name: "Guam",                                         parent: "US" },
  { code: "UM", name: "U.S. Minor Outlying Islands",                  parent: "US" },
  // France
  { code: "GF", name: "French Guiana",                                parent: "FR" },
  { code: "GP", name: "Guadeloupe",                                   parent: "FR" },
  { code: "MQ", name: "Martinique",                                   parent: "FR" },
  { code: "YT", name: "Mayotte",                                      parent: "FR" },
  { code: "RE", name: "Réunion",                                      parent: "FR" },
  { code: "PF", name: "French Polynesia",                             parent: "FR" },
  { code: "NC", name: "New Caledonia",                                parent: "FR" },
  { code: "BL", name: "Saint Barthélemy",                             parent: "FR" },
  { code: "MF", name: "Saint Martin",                                 parent: "FR" },
  { code: "PM", name: "Saint Pierre and Miquelon",                    parent: "FR" },
  { code: "WF", name: "Wallis and Futuna",                            parent: "FR" },
  { code: "TF", name: "French Southern Territories",                  parent: "FR" },
  // New Zealand
  { code: "CK", name: "Cook Islands",                                 parent: "NZ" },
  { code: "NU", name: "Niue",                                         parent: "NZ" },
  { code: "TK", name: "Tokelau",                                      parent: "NZ" },
  // Finland
  { code: "AX", name: "Åland Islands",                               parent: "FI" },
  // Australia
  { code: "CC", name: "Cocos (Keeling) Islands",                      parent: "AU" },
  { code: "CX", name: "Christmas Island",                             parent: "AU" },
  { code: "NF", name: "Norfolk Island",                               parent: "AU" },
  { code: "HM", name: "Heard Island and McDonald Islands",            parent: "AU" },
  // Norway
  { code: "SJ", name: "Svalbard and Jan Mayen",                       parent: "NO" },
  { code: "BV", name: "Bouvet Island",                                parent: "NO" },
  // Western Sahara — administered by Morocco; claimed as "Southern Provinces".
  // The Sahrawi Arab Democratic Republic (SADR/Polisario Front) also claims it,
  // but SADR is not a UN member state, so WS shows only under Morocco here.
  { code: "EH", name: "Western Sahara",                               parent: "MA" },
];

/** territory alpha-2 → administering country alpha-2 */
export const TERRITORY_PARENT: Record<string, string> =
  Object.fromEntries(ENTRIES.map((e) => [e.code, e.parent]));

/** territory alpha-2 → display name */
export const TERRITORY_NAME: Record<string, string> =
  Object.fromEntries(ENTRIES.map((e) => [e.code, e.name]));

/** administering country alpha-2 → list of territory alpha-2 codes */
export const PARENT_TERRITORIES: Record<string, string[]> = {};
for (const { code, parent } of ENTRIES) {
  (PARENT_TERRITORIES[parent] ??= []).push(code);
}

/**
 * GeoJSON sources to merge into a country's subdivision map.
 * Each entry maps the territory ISO alpha-2 code (the *.json file in /subdivisions/)
 * to the subdivision code used in SUBDIVISION_META for that parent country.
 * All features loaded from the territory GeoJSON are rewritten to use subdivCode
 * so clicks on those features resolve to the correct subdivision meta entry.
 *
 * Only territories that actually appear in SUBDIVISION_META are listed here.
 * Territories excluded from the meta (e.g. NSGTs without a disputed-claim exception)
 * are intentionally omitted.
 */
export const TERRITORY_GEO_FOR_PARENT: Record<
  string,
  Array<{ geoCode: string; subdivCode: string }>
> = {
  DK: [
    { geoCode: "GL", subdivCode: "DK-GL" },
    { geoCode: "FO", subdivCode: "DK-FO" },
  ],
  CN: [
    { geoCode: "HK", subdivCode: "CN-HK" },
    { geoCode: "MO", subdivCode: "CN-MO" },
    { geoCode: "TW", subdivCode: "CN-TW" },
  ],
  NL: [
    { geoCode: "AW", subdivCode: "NL-AW" },
    { geoCode: "CW", subdivCode: "NL-CW" },
    { geoCode: "SX", subdivCode: "NL-SX" },
  ],
  GB: [
    { geoCode: "JE", subdivCode: "GB-JE" },
    { geoCode: "GG", subdivCode: "GB-GG" },
    { geoCode: "IM", subdivCode: "GB-IM" },
    { geoCode: "GI", subdivCode: "GB-GI" },
    { geoCode: "FK", subdivCode: "GB-FK" },
    { geoCode: "IO", subdivCode: "GB-IO" },
    { geoCode: "GS", subdivCode: "GB-GS" },
    { geoCode: "AI", subdivCode: "GB-AI" },
    { geoCode: "BM", subdivCode: "GB-BM" },
    { geoCode: "VG", subdivCode: "GB-VG" },
    { geoCode: "KY", subdivCode: "GB-KY" },
    { geoCode: "MS", subdivCode: "GB-MS" },
    { geoCode: "SH", subdivCode: "GB-SH" },
    { geoCode: "TC", subdivCode: "GB-TC" },
    { geoCode: "PN", subdivCode: "GB-PN" },
  ],
  US: [
    { geoCode: "PR", subdivCode: "US-PR" },
    { geoCode: "MP", subdivCode: "US-MP" },
    { geoCode: "VI", subdivCode: "US-VI" },
    { geoCode: "AS", subdivCode: "US-AS" },
    { geoCode: "GU", subdivCode: "US-GU" },
  ],
  FR: [
    { geoCode: "BL", subdivCode: "FR-BL" },
    { geoCode: "MF", subdivCode: "FR-MF" },
    { geoCode: "PM", subdivCode: "FR-PM" },
    { geoCode: "WF", subdivCode: "FR-WF" },
    { geoCode: "PF", subdivCode: "FR-PF" },
    { geoCode: "NC", subdivCode: "FR-NC" },
  ],
  NZ: [
    { geoCode: "CK", subdivCode: "NZ-CK" },
    { geoCode: "NU", subdivCode: "NZ-NU" },
    { geoCode: "TK", subdivCode: "NZ-TK" },
  ],
  FI: [{ geoCode: "AX", subdivCode: "FI-AX" }],
  AU: [
    { geoCode: "CC", subdivCode: "AU-CC" },
    { geoCode: "CX", subdivCode: "AU-CX" },
    { geoCode: "NF", subdivCode: "AU-NF" },
  ],
  // Disputed territory claimants — same GeoJSON, different subdivision codes
  AR: [{ geoCode: "FK", subdivCode: "AR-ML~" }],
  ES: [{ geoCode: "GI", subdivCode: "ES-GIB~" }],
  // Crimea & Sevastopol — shown under Russia (administers) and Ukraine (internationally recognised claim)
  RU: [
    { geoCode: "UA-43", subdivCode: "UA-43" },
    { geoCode: "UA-40", subdivCode: "UA-40" },
  ],
  UA: [
    { geoCode: "UA-43", subdivCode: "UA-43" },
    { geoCode: "UA-40", subdivCode: "UA-40" },
  ],
  // Azad Kashmir & Gilgit-Baltistan — shown under Pakistan (administers) and India (claims)
  PK: [
    { geoCode: "PK-JK", subdivCode: "PK-JK" },
    { geoCode: "PK-GB", subdivCode: "PK-GB" },
  ],
  IN: [
    { geoCode: "PK-JK", subdivCode: "IN-AK~" },
    { geoCode: "PK-GB", subdivCode: "IN-GB~" },
  ],
  // Northern Cyprus — Turkey administers; Cyprus claims the whole island.
  // geoCode "XN" is a non-standard internal code (Northern Cyprus has no ISO 3166-1 code).
  TR: [{ geoCode: "XN", subdivCode: "TR-NC~" }],
  CY: [{ geoCode: "XN", subdivCode: "CY-NC~" }],
  // Western Sahara — Morocco administers and claims as "Southern Provinces".
  // SADR is not a UN member, so shown only under Morocco.
  MA: [{ geoCode: "EH", subdivCode: "MA-EH~" }],
};

// RULE #2 — MAP CLICK BEHAVIOUR (hard-coded):
//
// • NON-DISPUTED territories (e.g. Greenland GL, Puerto Rico PR):
//   Clicking them on the world map REDIRECTS to the administering UN-member
//   state (e.g. GL → Denmark DK). They are never independent destinations.
//
// • DISPUTED territories (e.g. Crimea UA-43, Falklands FK, Taiwan TW):
//   Clicking them on the world map does NOTHING — no redirect, no popup.
//   Disputed territories are only visible inside the subdivision section
//   of each claiming UN-member state, labelled "(disputed territory)".
//   Silently redirecting a disputed territory click to one claimant over
//   another would imply a political position the game must not take.
//
// HOW IT IS ENFORCED:
//   DISPUTED_TERRITORY_CODES is auto-derived: any geoCode that appears
//   under TWO OR MORE entries in TERRITORY_GEO_FOR_PARENT is disputed.
//   UNDISPUTED_TERRITORY_PARENT excludes all disputed codes.
//   The map component (WorldProgressMap) receives ONLY
//   UNDISPUTED_TERRITORY_PARENT, so disputed polygons are never clickable.
//   DO NOT pass the full TERRITORY_PARENT to the map — it would break this.

// Territory alpha-2 codes contested by multiple UN member states.
// Derived from TERRITORY_GEO_FOR_PARENT: any geoCode appearing under two or
// more administering states is disputed and must not be clickable on the world
// map (clicking it would silently pick one claimant over the other).
const _disputedCount = new Map<string, number>();
for (const mappings of Object.values(TERRITORY_GEO_FOR_PARENT)) {
  for (const { geoCode } of mappings) {
    _disputedCount.set(geoCode, (_disputedCount.get(geoCode) ?? 0) + 1);
  }
}
export const DISPUTED_TERRITORY_CODES: ReadonlySet<string> = new Set(
  [..._disputedCount].filter(([, n]) => n > 1).map(([code]) => code),
);

/**
 * territory alpha-2 → parent alpha-2, EXCLUDING all disputed territories.
 *
 * ALWAYS pass this (not TERRITORY_PARENT) to the world map component.
 * Disputed territories must not be clickable on the world map — see Rule #2
 * comment above. Using the full TERRITORY_PARENT would silently redirect
 * disputed-territory clicks to one claimant, implying a political position.
 */
export const UNDISPUTED_TERRITORY_PARENT: Record<string, string> =
  Object.fromEntries(
    Object.entries(TERRITORY_PARENT).filter(
      ([code]) => !DISPUTED_TERRITORY_CODES.has(code),
    ),
  );
