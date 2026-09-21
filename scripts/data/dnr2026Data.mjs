// Reuters Institute Digital News Report 2026 — trust in news overall.
// Source: per-market "Trust in news overall" on each official country page
//   https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2026/{slug}
// Report: Newman, N., Fletcher, R., Robertson, C. T., Ross Arguedas, A., &
//   Nielsen, R. K. (2026). Reuters Institute Digital News Report 2026.
//   Reuters Institute for the Study of Journalism.
// PDF: https://reutersinstitute.politics.ox.ac.uk/sites/default/files/2026-06/DNR%202026%20FINAL_2.pdf
//
// score = % agreeing "I think you can trust most news most of the time" (0–100).
// rank = competition rank among all 48 surveyed markets (ties share a rank).
// rating = 10-point score band for map / Group-by only (DNR publishes no tiers).
//
// Skipped (not UN members in this game): Hong Kong, Taiwan. Their scores are
// recorded in scripts/data/dnr-trust-2026.csv (include_in_app=no) so ranks among
// the 48 stay honest, but they are not merged into COUNTRY_FACTS.

/**
 * Map a 0–100 trust % to a map / Group-by band.
 * @param {number} score
 * @returns {string}
 */
export function dnrTrustBand(score) {
  if (score >= 90) return "90–100%";
  if (score >= 80) return "80–89%";
  if (score >= 70) return "70–79%";
  if (score >= 60) return "60–69%";
  if (score >= 50) return "50–59%";
  if (score >= 40) return "40–49%";
  if (score >= 30) return "30–39%";
  if (score >= 20) return "20–29%";
  if (score >= 10) return "10–19%";
  return "0–9%";
}

/**
 * @type {Record<string, { year: number, rating: string, rank: number, score: number }>}
 */
export const DNR_2026_DATA = {
  "AR": { "year": 2026, "rating": "20–29%", "rank": 39, "score": 26 }, // Argentina
  "AT": { "year": 2026, "rating": "30–39%", "rank": 18, "score": 39 }, // Austria
  "AU": { "year": 2026, "rating": "40–49%", "rank": 14, "score": 43 }, // Australia
  "BE": { "year": 2026, "rating": "30–39%", "rank": 18, "score": 39 }, // Belgium
  "BG": { "year": 2026, "rating": "20–29%", "rank": 45, "score": 21 }, // Bulgaria
  "BR": { "year": 2026, "rating": "30–39%", "rank": 23, "score": 36 }, // Brazil
  "CA": { "year": 2026, "rating": "30–39%", "rank": 22, "score": 37 }, // Canada
  "CH": { "year": 2026, "rating": "40–49%", "rank": 15, "score": 42 }, // Switzerland
  "CL": { "year": 2026, "rating": "30–39%", "rank": 24, "score": 34 }, // Chile
  "CO": { "year": 2026, "rating": "20–29%", "rank": 40, "score": 25 }, // Colombia
  "CZ": { "year": 2026, "rating": "30–39%", "rank": 29, "score": 31 }, // Czech Republic
  "DE": { "year": 2026, "rating": "40–49%", "rank": 12, "score": 46 }, // Germany
  "DK": { "year": 2026, "rating": "50–59%", "rank": 4, "score": 55 }, // Denmark
  "ES": { "year": 2026, "rating": "30–39%", "rank": 25, "score": 33 }, // Spain
  "FI": { "year": 2026, "rating": "60–69%", "rank": 3, "score": 63 }, // Finland
  "FR": { "year": 2026, "rating": "20–29%", "rank": 34, "score": 29 }, // France
  "GB": { "year": 2026, "rating": "30–39%", "rank": 31, "score": 30 }, // United Kingdom
  "GR": { "year": 2026, "rating": "10–19%", "rank": 47, "score": 18 }, // Greece
  "HR": { "year": 2026, "rating": "20–29%", "rank": 34, "score": 29 }, // Croatia
  "HU": { "year": 2026, "rating": "10–19%", "rank": 48, "score": 17 }, // Hungary
  "ID": { "year": 2026, "rating": "30–39%", "rank": 26, "score": 32 }, // Indonesia
  "IE": { "year": 2026, "rating": "40–49%", "rank": 15, "score": 42 }, // Ireland
  "IN": { "year": 2026, "rating": "30–39%", "rank": 18, "score": 39 }, // India
  "IT": { "year": 2026, "rating": "30–39%", "rank": 26, "score": 32 }, // Italy
  "JP": { "year": 2026, "rating": "40–49%", "rank": 17, "score": 41 }, // Japan
  "KE": { "year": 2026, "rating": "60–69%", "rank": 1, "score": 68 }, // Kenya
  "KR": { "year": 2026, "rating": "30–39%", "rank": 31, "score": 30 }, // South Korea
  "MA": { "year": 2026, "rating": "20–29%", "rank": 36, "score": 28 }, // Morocco
  "MX": { "year": 2026, "rating": "30–39%", "rank": 29, "score": 31 }, // Mexico
  "MY": { "year": 2026, "rating": "30–39%", "rank": 31, "score": 30 }, // Malaysia
  "NG": { "year": 2026, "rating": "60–69%", "rank": 1, "score": 68 }, // Nigeria
  "NL": { "year": 2026, "rating": "40–49%", "rank": 10, "score": 49 }, // Netherlands
  "NO": { "year": 2026, "rating": "50–59%", "rank": 5, "score": 53 }, // Norway
  "PE": { "year": 2026, "rating": "30–39%", "rank": 26, "score": 32 }, // Peru
  "PH": { "year": 2026, "rating": "20–29%", "rank": 36, "score": 28 }, // Philippines
  "PL": { "year": 2026, "rating": "30–39%", "rank": 18, "score": 39 }, // Poland
  "PT": { "year": 2026, "rating": "50–59%", "rank": 8, "score": 51 }, // Portugal
  "RO": { "year": 2026, "rating": "20–29%", "rank": 43, "score": 23 }, // Romania
  "RS": { "year": 2026, "rating": "20–29%", "rank": 44, "score": 22 }, // Serbia
  "SE": { "year": 2026, "rating": "50–59%", "rank": 6, "score": 52 }, // Sweden
  "SG": { "year": 2026, "rating": "40–49%", "rank": 12, "score": 46 }, // Singapore
  "SK": { "year": 2026, "rating": "10–19%", "rank": 46, "score": 19 }, // Slovakia
  "TH": { "year": 2026, "rating": "40–49%", "rank": 11, "score": 47 }, // Thailand
  "TR": { "year": 2026, "rating": "20–29%", "rank": 36, "score": 28 }, // Turkey
  "US": { "year": 2026, "rating": "20–29%", "rank": 40, "score": 25 }, // United States
  "ZA": { "year": 2026, "rating": "50–59%", "rank": 9, "score": 50 }, // South Africa
};
