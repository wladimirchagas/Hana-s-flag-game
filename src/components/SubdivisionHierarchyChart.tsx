import { useMemo } from "react";
import { subdivisionFlagUrl } from "../api/subdivisions";
import { subdivisionCapital } from "../lib/cityRoles";
import { distinctCapitalFlagPath } from "../lib/capitalInfo";
import { DISPUTED_TERRITORY_HIERARCHY } from "../lib/disputedSubdivisions";
import { normalizeForSearch } from "../lib/searchNormalize";
import { NATIONAL_CITIES } from "../data/cities";
import type { SubdivisionMeta } from "../types/subdivision";

/**
 * "Hierarchy chart" tab — an interactive org chart of a country's structure:
 *
 *   nation (root)
 *     ├─ National capital(s) — the nation's own capital city/cities
 *     └─ each subdivision TYPE (States, Federal Territory, Autonomous Region, …)
 *          └─ every subdivision of that type
 *               └─ that subdivision's capital city, when one is known
 *
 * The national capital(s) hang off the root as a dedicated "National capital"
 * group, sourced from NATIONAL_CITIES exactly like the map overlay's national
 * ★ (`subdivisionCityMarkers` always adds them) — so the nation's capital is
 * ALWAYS represented, even the cases the per-subdivision leaves miss: a
 * city-territory whose leaf is suppressed as tautological (Kuala Lumpur,
 * Putrajaya), a capital that is no subdivision's capital (Belize → Belmopan),
 * and the secondary seat of a multi-capital nation. A national capital that IS
 * also a subdivision's capital is HOISTED here (shown once, under the nation —
 * its primary role) and not repeated as that subdivision's own city leaf,
 * mirroring the map's single dual-role marker.
 *
 * The subdivisions are grouped by their `typeLabel`, and each type appears as its
 * own label node laddering up to the national flag, with its subdivision flags
 * laddering up to it (mirroring the "By type" grouping of the flag grid, incl. its
 * tier order: primary subdivisions, then dependent/external territories, then
 * disputed).
 *
 * The chart shows the FULL administrative tree, not just the flagged parts: every
 * subdivision appears, and every subdivision with a known capital gets a city
 * leaf — whether or not a flag exists for it. Where a flag IS bundled it renders
 * (national → country.flagSvg, subdivision → subdivisionFlagUrl, city → the
 * name-confirmed capital flag), and where none exists a neutral "—" placeholder
 * is shown. Nothing is fabricated: the capital NAME comes from the same
 * authoritative source as the map ★ (`subdivisionCapital`), and a subdivision no
 * source has a capital for simply gets no leaf.
 *
 * Clicking any flag node updates the parent selection (map highlight + widget):
 *  - root  → the country itself (clears the subdivision drill-down)
 *  - branch→ that subdivision
 *  - leaf  → that subdivision + its capital
 * The type labels are structural, not selectable entities, so they are not
 * interactive.
 */

// External/dependent territory type labels — kept in sync with the flag grid's
// DEPENDENCY_TYPES so the hierarchy's type order matches the grid's "By type"
// tier order (primary subdivisions first, dependencies next, disputed last).
const DEPENDENCY_TYPES: ReadonlySet<string> = new Set([
  "Crown Dependency",
  "Overseas Territory",
  "Overseas Collectivity",
  "Sui generis collectivity",
  "Autonomous Territory",
  "Special Administrative Region",
  "Constituent Country",
  "Associated State",
  "External Territory",
  "Unincorporated Territory",
]);

function groupTier(typeLabel: string, allDisputed: boolean): number {
  if (allDisputed) return 2;
  if (DEPENDENCY_TYPES.has(typeLabel)) return 1;
  return 0;
}

/** Plural form of a singular type label for the group heading. */
function pluralizeType(label: string): string {
  if (/s$/i.test(label)) return label;
  if (/[^aeiou]y$/i.test(label)) return label.replace(/y$/i, "ies");
  return `${label}s`;
}

type Props = {
  divisions: SubdivisionMeta[];
  countryName: string;
  /** ISO 3166-1 alpha-2 of the country — used to source its national capital(s). */
  countryCode: string;
  countryFlagUrl: string | null;
  /** Selected subdivision code (if any). */
  selectedCode: string | null;
  /** True when the "View capital" drill-down is open for the selected code. */
  capitalActive: boolean;
  baseUrl: string;
  onSelectCountry: () => void;
  onSelectSubdivision: (code: string) => void;
  onSelectCapital: (code: string) => void;
};

export function SubdivisionHierarchyChart({
  divisions,
  countryName,
  countryCode,
  countryFlagUrl,
  selectedCode,
  capitalActive,
  baseUrl,
  onSelectCountry,
  onSelectSubdivision,
  onSelectCapital,
}: Props) {
  const { nodes, nationalCapitalLeaves } = useMemo(() => {
    const visibleDivs = divisions.filter(
      (d) => !(d.code in DISPUTED_TERRITORY_HIERARCHY),
    );

    // National capital(s) for this country, from the SAME source as the map ★
    // (NATIONAL_CITIES). Map each (by normalised name) to the subdivision it is
    // the capital of, so its leaf can drive the SAME "View capital" panel + flag
    // as that subdivision. A national capital that is no subdivision's capital
    // (e.g. Belize's Belmopan) has no owning code and renders as a name-only leaf.
    const nationalCaps = NATIONAL_CITIES[countryCode]?.capitals ?? [];
    const owningCodeByCapName = new Map<string, string>();
    for (const d of visibleDivs) {
      const cap = subdivisionCapital(d.code);
      if (!cap) continue;
      const k = normalizeForSearch(cap.name);
      if (!owningCodeByCapName.has(k)) owningCodeByCapName.set(k, d.code);
    }
    const nationalCapNames = new Set(
      nationalCaps.map((c) => normalizeForSearch(c.name)),
    );

    const nodes = visibleDivs
      .map((d) => {
        const capital = subdivisionCapital(d.code);
        // The capital's DISTINCT flag (null when it merely duplicates the
        // subdivision's own flag — a city-territory like Canberra ≡ ACT, or a
        // shared coat-of-arms like Brasília ≡ Distrito Federal). Single source of
        // truth shared with the capital panel and the City-flags grid.
        const distinctFlag = capital
          ? distinctCapitalFlagPath(d.code, capital.name)
          : null;
        // Same name as its subdivision (São Paulo state → São Paulo city; Kuala
        // Lumpur → Kuala Lumpur).
        const sameName =
          capital != null &&
          normalizeForSearch(capital.name) === normalizeForSearch(d.name);
        // Hoist a capital that is ALSO the national capital up to the dedicated
        // "National capital" node under the root, so it shows once (its primary
        // role) and is never duplicated under its own subdivision.
        const isNationalCapital =
          capital != null &&
          nationalCapNames.has(normalizeForSearch(capital.name));
        // Show the capital as a leaf when it has a DISTINCT flag (São Paulo city's
        // red-cross flag), OR it is a distinctly-named place (Canberra, Brasília,
        // Victoria) — even without a flag, shown with a "—" placeholder rather
        // than repeating the subdivision's flag. Suppress it only when it is
        // tautological AND has no distinct flag: the subdivision IS that one city
        // (Kuala Lumpur, Putrajaya, Foggia, Zürich); or when it has been hoisted
        // to the national-capital group above.
        const showCity =
          capital != null &&
          !isNationalCapital &&
          (distinctFlag != null || !sameName);
        return {
          div: d,
          subFlag: subdivisionFlagUrl(d.code),
          city: showCity ? { name: capital!.name, flagPath: distinctFlag } : null,
        };
      })
      .sort((a, b) => a.div.name.localeCompare(b.div.name, "en"));

    const nationalCapitalLeaves = nationalCaps.map((cap) => {
      const code = owningCodeByCapName.get(normalizeForSearch(cap.name)) ?? null;
      return {
        name: cap.name,
        // Sourced role note for a multi-capital nation (e.g. "Constitutional
        // capital" / "Administrative capital"), shown as the node's tier label.
        note: cap.note ?? null,
        code,
        flagPath: code ? distinctCapitalFlagPath(code, cap.name) : null,
      };
    });

    return { nodes, nationalCapitalLeaves };
  }, [divisions, countryCode]);

  // Group the subdivisions by type, ordered by the same tier rule as the grid.
  const groups = useMemo(() => {
    const byType = new Map<string, typeof nodes>();
    for (const n of nodes) {
      const arr = byType.get(n.div.typeLabel) ?? [];
      arr.push(n);
      byType.set(n.div.typeLabel, arr);
    }
    return [...byType.entries()]
      .map(([typeLabel, items]) => ({
        typeLabel,
        items,
        allDisputed: items.every((i) => i.div.isDisputed),
      }))
      .sort((a, b) => {
        const ta = groupTier(a.typeLabel, a.allDisputed);
        const tb = groupTier(b.typeLabel, b.allDisputed);
        if (ta !== tb) return ta - tb;
        if (b.items.length !== a.items.length) return b.items.length - a.items.length;
        return a.typeLabel.localeCompare(b.typeLabel, "en");
      });
  }, [nodes]);

  if (nodes.length === 0) {
    return (
      <p className="flag-grid__no-match">
        No sub-national divisions are available for {countryName} yet.
      </p>
    );
  }

  const rootActive = !selectedCode;

  return (
    <div className="hierarchy" role="tree" aria-label={`${countryName} flag hierarchy`}>
      <div className="hierarchy__inner">
        <div className="hierarchy__root">
          <button
            type="button"
            className={`hierarchy__node hierarchy__node--national${rootActive ? " hierarchy__node--active" : ""}`}
            onClick={onSelectCountry}
            aria-pressed={rootActive}
            aria-label={`Select ${countryName}`}
          >
            <span className="hierarchy__thumb">
              {countryFlagUrl ? (
                <img
                  src={countryFlagUrl}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  className="hierarchy__thumb-img"
                />
              ) : (
                <span className="flag-grid__thumb-empty" aria-hidden="true">—</span>
              )}
            </span>
            <span className="hierarchy__name" title={countryName}>{countryName}</span>
            <span className="hierarchy__tier">Nation</span>
          </button>
        </div>

        <div className="hierarchy__branches">
          {nationalCapitalLeaves.length > 0 && (
            <div className="hierarchy__group" role="group" aria-label="National capital">
              <div className="hierarchy__group-label">
                <span className="hierarchy__group-type">National capital</span>
                {nationalCapitalLeaves.length > 1 && (
                  <span className="hierarchy__group-count">{nationalCapitalLeaves.length}</span>
                )}
              </div>

              <div className="hierarchy__subrow">
                {nationalCapitalLeaves.map((cap) => {
                  const active = capitalActive && cap.code != null && cap.code === selectedCode;
                  const thumb = (
                    <span className="hierarchy__thumb">
                      {cap.flagPath ? (
                        <img
                          src={`${baseUrl}${cap.flagPath}`}
                          alt=""
                          loading="lazy"
                          draggable={false}
                          className="hierarchy__thumb-img"
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                      ) : (
                        <span className="flag-grid__thumb-empty" aria-hidden="true">—</span>
                      )}
                    </span>
                  );
                  const body = (
                    <>
                      {thumb}
                      <span className="hierarchy__name" title={cap.name}>{cap.name}</span>
                      {cap.note && <span className="hierarchy__tier">{cap.note}</span>}
                    </>
                  );
                  return (
                    <div key={cap.name} className="hierarchy__col">
                      {cap.code != null ? (
                        // Selectable: its "View capital" panel is that of the
                        // subdivision the national capital heads.
                        <button
                          type="button"
                          className={`hierarchy__node hierarchy__node--capital${active ? " hierarchy__node--active" : ""}`}
                          onClick={() => onSelectCapital(cap.code!)}
                          aria-pressed={active}
                          aria-label={`Select ${cap.name}, national capital of ${countryName}`}
                        >
                          {body}
                        </button>
                      ) : (
                        // Not any subdivision's capital (e.g. Belmopan): shown as a
                        // non-interactive informational leaf — its name is all that
                        // is sourced without a subdivision-keyed capital record.
                        <div
                          className="hierarchy__node hierarchy__node--capital hierarchy__node--static"
                          aria-label={`${cap.name}, national capital of ${countryName}`}
                        >
                          {body}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {groups.map((g) => (
            <div key={g.typeLabel} className="hierarchy__group" role="group" aria-label={pluralizeType(g.typeLabel)}>
              <div className="hierarchy__group-label">
                <span className="hierarchy__group-type">{pluralizeType(g.typeLabel)}</span>
                <span className="hierarchy__group-count">{g.items.length}</span>
              </div>

              <div className="hierarchy__subrow">
                {g.items.map(({ div, subFlag, city }) => {
                  const subActive = !capitalActive && div.code === selectedCode;
                  const cityActive = capitalActive && div.code === selectedCode;
                  return (
                    <div key={div.code} className="hierarchy__col">
                      <button
                        type="button"
                        className={`hierarchy__node${subActive ? " hierarchy__node--active" : ""}`}
                        onClick={() => onSelectSubdivision(div.code)}
                        aria-pressed={subActive}
                        aria-label={`Select ${div.name}`}
                      >
                        <span className="hierarchy__thumb">
                          {subFlag ? (
                            <img
                              src={subFlag}
                              alt=""
                              loading="lazy"
                              draggable={false}
                              className="hierarchy__thumb-img"
                              onError={(e) => { e.currentTarget.style.display = "none"; }}
                            />
                          ) : (
                            <span className="flag-grid__thumb-empty" aria-hidden="true">—</span>
                          )}
                        </span>
                        <span className="hierarchy__name" title={div.name}>{div.name}</span>
                      </button>

                      {city && (
                        <button
                          type="button"
                          className={`hierarchy__node hierarchy__node--city${cityActive ? " hierarchy__node--active" : ""}`}
                          onClick={() => onSelectCapital(div.code)}
                          aria-pressed={cityActive}
                          aria-label={`Select ${city.name}, capital of ${div.name}`}
                        >
                          <span className="hierarchy__thumb">
                            {city.flagPath ? (
                              <img
                                src={`${baseUrl}${city.flagPath}`}
                                alt=""
                                loading="lazy"
                                draggable={false}
                                className="hierarchy__thumb-img"
                                onError={(e) => { e.currentTarget.style.display = "none"; }}
                              />
                            ) : (
                              <span className="flag-grid__thumb-empty" aria-hidden="true">—</span>
                            )}
                          </span>
                          <span className="hierarchy__name" title={city.name}>{city.name}</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
