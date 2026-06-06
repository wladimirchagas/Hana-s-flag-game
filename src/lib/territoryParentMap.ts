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
