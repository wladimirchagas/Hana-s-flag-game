import { CAPITAL_DETAILS, type CapitalDetail } from "../data/capitalDetails";
import { CAPITAL_FLAGS } from "../data/capitalFlags";

/**
 * Capital-city detail lookups for the Learn-mode "View capital" drill-down.
 *
 * Both the population (CAPITAL_DETAILS) and the flag (CAPITAL_FLAGS) are keyed by
 * ISO 3166-2 subdivision code and were sourced from the SAME Wikidata capital
 * (P36) — but the capital NAME the panel displays comes from src/lib/cityRoles.ts
 * `subdivisionCapital()` (Natural-Earth-first), which can occasionally romanise a
 * name differently (e.g. "Kyiv"/"Kiev", a "-shi" city suffix). So before showing a
 * population or flag we confirm the Wikidata capital name matches the displayed
 * one — never a figure or flag for a different city. This mirrors the hard rule
 * that the "Capital" row and the map ★ can never disagree.
 */

const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip diacritics
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");

/**
 * True when the Wikidata capital name for `code` refers to the same city as the
 * displayed capital name. Bidirectional prefix match on the normalised strings
 * so administrative suffixes ("-shi", "City") and accent-only differences still
 * match, while unrelated same-prefix names ("York"/"New York") do not (a prefix
 * test, not a substring one).
 */
function sameCity(detailName: string, displayedName: string): boolean {
  const a = norm(detailName);
  const b = norm(displayedName);
  if (!a || !b) return false;
  return a === b || a.startsWith(b) || b.startsWith(a);
}

/**
 * The Wikidata-sourced detail (name + dated population) for a subdivision's
 * capital, but ONLY when it belongs to the capital the panel is displaying.
 * Returns null otherwise (no entry, or a name mismatch).
 */
export function capitalDetail(code: string, displayedName: string): CapitalDetail | null {
  const d = CAPITAL_DETAILS[code];
  if (!d || !sameCity(d.name, displayedName)) return null;
  return d;
}

/**
 * BASE-relative path to the bundled capital-city flag for `code`, or null when
 * there is none or the flag can't be confirmed to belong to the displayed
 * capital. The caller prefixes `import.meta.env.BASE_URL`.
 */
export function capitalFlagPath(code: string, displayedName: string): string | null {
  const f = CAPITAL_FLAGS[code];
  if (!f) return null;
  const d = CAPITAL_DETAILS[code];
  // The flag came from the same Wikidata capital as CAPITAL_DETAILS[code]; if we
  // can't confirm that capital matches the displayed one, don't show it.
  if (!d || !sameCity(d.name, displayedName)) return null;
  return f;
}
