// UN Non-Self-Governing Territories — hardcoded per the official UN list
// Source: https://www.un.org/dppa/decolonization/en/nsgt (last updated 9 May 2024)
//
// RULE: NSGT territories must NOT appear as a subnational division of any
// parent country — EXCEPT where sovereignty is disputed between multiple UN
// member states, in which case the territory appears under every claimant
// with that claimant's own name and flag.
//
// Disputed territories currently covered:
//   Falkland Islands (Malvinas) — UK (GB-FK) and Argentina (AR-ML~)
//   Gibraltar — UK (GB-GI) and Spain (ES-GIB~)
//
// Do not modify this list without verifying against the current UN NSGT list.
export const NSGT_CODES = new Set([
  // United Kingdom — Atlantic & Caribbean
  "GB-AI",   // Anguilla
  "GB-BM",   // Bermuda
  "GB-VG",   // British Virgin Islands
  "GB-KY",   // Cayman Islands
  "GB-FK",   // Falkland Islands (Malvinas) — disputed with Argentina
  "GB-MS",   // Montserrat
  "GB-SH",   // Saint Helena, Ascension and Tristan da Cunha
  "GB-TC",   // Turks and Caicos Islands
  // United Kingdom — Europe
  "GB-GI",   // Gibraltar — disputed with Spain
  // United Kingdom — Pacific
  "GB-PN",   // Pitcairn
  // United States
  "US-VI",   // United States Virgin Islands
  "US-AS",   // American Samoa
  "US-GU",   // Guam
  // France
  "FR-PF",   // French Polynesia
  "FR-NC",   // New Caledonia
  // New Zealand
  "NZ-TK",   // Tokelau
  // Disputed claimant entries (same territories, different country/name)
  "AR-ML~",  // Islas Malvinas — Argentina's claim to Falkland Islands
  "ES-GIB~", // Gibraltar — Spain's claim
]);
