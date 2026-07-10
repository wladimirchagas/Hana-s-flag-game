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
 *     └─ every subdivision (branch)
 *          └─ that subdivision's capital city (leaf), when one is known
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
 * Clicking any node updates the parent selection (map highlight + widget):
 *  - root  → the country itself (clears the subdivision drill-down)
 *  - branch→ that subdivision
 *  - leaf  → that subdivision + its capital
 */
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
          <span className="hierarchy__name">{countryName}</span>
          <span className="hierarchy__tier">Nation</span>
        </button>
      </div>

      <div className="hierarchy__branches">
        {nodes.map(({ div, subFlag, city }) => {
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
                <span className="hierarchy__name">{div.name}</span>
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
                  <span className="hierarchy__name">{city.name}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}
