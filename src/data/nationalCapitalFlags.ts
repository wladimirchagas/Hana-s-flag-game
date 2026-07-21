/**
 * Curated, sourced municipal flags for NATIONAL capitals that are NOT any
 * subdivision's capital and are no subdivision themselves — so they have no
 * subdivision-keyed `CAPITAL_FLAGS` entry (e.g. Ottawa, Amsterdam, Pretoria).
 *
 * These are the ONLY national capitals the hierarchy chart renders as their own
 * standalone "National capital" node; a capital that already appears as a
 * subdivision node or a subdivision's capital leaf is MARKED in place, never
 * duplicated (see `SubdivisionHierarchyChart.tsx`).
 *
 * Keyed by `"<ISO 3166-1 alpha-2>|<normalizeForSearch(capital name)>"`. Every
 * value is a BASE-relative path to a flag bundled under
 * `public/capital-flags/national/`, sourced from Wikimedia Commons and VISUALLY
 * VERIFIED to be that city's OWN municipal flag — never the national flag, never
 * invented (same hard discipline as `CAPITAL_FLAGS`; see CLAUDE.md). A capital
 * with no distinct, sourceable municipal flag is simply absent here and renders
 * with a "—" placeholder — a missing flag always beats a wrong one.
 */
export const NATIONAL_CAPITAL_FLAGS: Record<string, string> = {
  // Each sourced from the capital city's OWN Wikidata `P41` (collision-safe) and
  // visually confirmed to be the city's municipal flag, distinct from the national
  // flag (checked by scripts/check-capital-flags.mjs). Capitals whose Wikidata
  // item has no `P41` (Juba, Nassau, Yamoussoukro, Porto-Novo, Mbabane, Naypyidaw,
  // Lobamba) are intentionally absent — a missing flag beats a wrong one.
  "NL|amsterdam": "capital-flags/national/nl-amsterdam.svg",
  "KZ|astana": "capital-flags/national/kz-astana.svg",
  "VE|caracas": "capital-flags/national/ve-caracas.svg",
  "DK|kobenhavn": "capital-flags/national/dk-copenhagen.svg",
  "CA|ottawa": "capital-flags/national/ca-ottawa.svg",
  "BZ|belmopan": "capital-flags/national/bz-belmopan.svg",
  "LR|monrovia": "capital-flags/national/lr-monrovia.svg",
  "MG|antananarivo": "capital-flags/national/mg-antananarivo.svg",
  "ZA|pretoria": "capital-flags/national/za-pretoria.svg",
};
