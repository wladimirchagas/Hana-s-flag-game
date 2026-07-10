import { useMemo } from "react";
import { subdivisionFlagUrl } from "../api/subdivisions";
import { countryCityFlags } from "../lib/cityFlags";
import { DISPUTED_TERRITORY_HIERARCHY } from "../lib/disputedSubdivisions";
import type { SubdivisionMeta } from "../types/subdivision";

/**
 * "Hierarchy chart" tab — an interactive org chart of a country's flags:
 *
 *   national flag (root)
 *     └─ each subdivision's flag (branch)
 *          └─ that subdivision's capital-city flag (leaf), when one exists
 *
 * Every flag is a real, bundled asset (national → country.flagSvg, subdivision →
 * subdivisionFlagUrl, city → the name-confirmed capital flag from
 * `countryCityFlags`); nothing is fabricated. Only subdivisions that carry a
 * flag OR a capital-city flag become branches, so every node shows real flag
 * content rather than a wall of placeholders.
 *
 * Clicking any node updates the parent selection (map highlight + widget):
 *  - root  → the country itself (clears the subdivision drill-down)
 *  - branch→ that subdivision
 *  - leaf  → that subdivision + its capital
 */
type Props = {
  divisions: SubdivisionMeta[];
  countryCode: string;
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
  countryCode,
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
    const cityByCode = new Map(
      countryCityFlags(countryCode).map((c) => [c.code, c]),
    );
    return divisions
      .filter((d) => !(d.code in DISPUTED_TERRITORY_HIERARCHY))
      .map((d) => ({
        div: d,
        subFlag: subdivisionFlagUrl(d.code),
        city: cityByCode.get(d.code) ?? null,
      }))
      // Keep the chart flag-focused: a branch must have its own flag or a city flag.
      .filter((n) => n.subFlag || n.city)
      .sort((a, b) => a.div.name.localeCompare(b.div.name, "en"));
  }, [divisions, countryCode]);

  if (nodes.length === 0) {
    return (
      <p className="flag-grid__no-match">
        No sub-national or city flags are available for {countryName} yet.
      </p>
    );
  }

  const rootActive = !selectedCode;

  return (
    <div className="hierarchy" role="tree" aria-label={`${countryName} flag hierarchy`}>
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
                  aria-label={`Select ${city.capitalName}, capital of ${div.name}`}
                >
                  <span className="hierarchy__thumb">
                    <img
                      src={`${baseUrl}${city.flagPath}`}
                      alt=""
                      loading="lazy"
                      draggable={false}
                      className="hierarchy__thumb-img"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  </span>
                  <span className="hierarchy__name">{city.capitalName}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
