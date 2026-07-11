import { useMemo } from "react";
import { subdivisionFlagUrl } from "../api/subdivisions";
import { subdivisionCapital } from "../lib/cityRoles";
import { capitalFlagPath } from "../lib/capitalInfo";
import { DISPUTED_TERRITORY_HIERARCHY } from "../lib/disputedSubdivisions";
import type { SubdivisionMeta } from "../types/subdivision";

/**
 * "Hierarchy chart" tab — an interactive org chart of a country's structure:
 *
 *   nation (root)
 *     └─ each subdivision TYPE (States, Federal Territory, Autonomous Region, …)
 *          └─ every subdivision of that type
 *               └─ that subdivision's capital city, when one is known
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
  countryFlagUrl,
  selectedCode,
  capitalActive,
  baseUrl,
  onSelectCountry,
  onSelectSubdivision,
  onSelectCapital,
}: Props) {
  const nodes = useMemo(() => {
    return divisions
      .filter((d) => !(d.code in DISPUTED_TERRITORY_HIERARCHY))
      .map((d) => {
        const capital = subdivisionCapital(d.code);
        return {
          div: d,
          subFlag: subdivisionFlagUrl(d.code),
          // Every subdivision with a known capital gets a city leaf; the flag is
          // shown when one is bundled, otherwise a placeholder.
          city: capital
            ? { name: capital.name, flagPath: capitalFlagPath(d.code, capital.name) }
            : null,
        };
      })
      .sort((a, b) => a.div.name.localeCompare(b.div.name, "en"));
  }, [divisions]);

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
