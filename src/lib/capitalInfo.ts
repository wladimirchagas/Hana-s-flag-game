import { CAPITAL_DETAILS, type CapitalDetail } from "../data/capitalDetails";
import { CAPITAL_FLAGS } from "../data/capitalFlags";
import { CITY_TERRITORY_CODES } from "../data/cityTerritories";
import { SHARED_CAPITAL_FLAGS } from "../data/sharedCapitalFlags";

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

/**
 * True when a capital's flag is the SAME image as its subdivision's OWN flag, so
 * the capital has NO distinct flag of its own — either a city-territory whose one
 * flag serves both (Canberra ≡ ACT, Kuala Lumpur, Washington DC), or a region and
 * its capital that share a coat-of-arms flag (Brasília ≡ Distrito Federal, Zürich
 * city ≡ canton). This is the SINGLE definition every surface consults so they
 * can never disagree about whether a capital flag is worth showing.
 */
export function capitalFlagDuplicatesSubdivision(code: string): boolean {
  return CITY_TERRITORY_CODES.has(code) || SHARED_CAPITAL_FLAGS.has(code);
}

/**
 * BASE-relative path to a capital's DISTINCT flag — its own municipal flag — or
 * null when the capital has none (no bundled flag, a name mismatch, OR the flag
 * merely duplicates the subdivision's flag per `capitalFlagDuplicatesSubdivision`).
 *
 * This is the ONE helper every capital-flag surface must use so the treatment is
 * holistic, never punctual: the Learn "View capital" panel (`CapitalDetails`), the
 * hierarchy chart, and the "City flags" grid all show a capital flag ONLY when
 * this returns a path, exactly as the Flag Master game quizzes distinct-flag
 * capitals only. A capital whose flag duplicates its subdivision is shown WITHOUT
 * a flag (its subdivision already carries that image), matching the chart's "—".
 */
export function distinctCapitalFlagPath(code: string, displayedName: string): string | null {
  if (capitalFlagDuplicatesSubdivision(code)) return null;
  return capitalFlagPath(code, displayedName);
}

/**
 * Full src for the bundled capital-city flag, for the Flag Master game. No
 * displayed-name cross-check is needed there: the game's capital NAME comes
 * from the same CAPITAL_DETAILS entry the flag was sourced with, so the two
 * can never disagree.
 */
export function capitalFlagSrc(code: string): string | null {
  const f = CAPITAL_FLAGS[code];
  return f ? `${import.meta.env.BASE_URL}${f}` : null;
}
