import { useMemo, useState } from "react";
import { countryCityFlags } from "../lib/cityFlags";

/**
 * "City flags" tab of the sub-national drill-down grid.
 *
 * Shows every available capital-city flag for the country (see
 * `countryCityFlags` — authoritative, name-confirmed capital-flag data only).
 * Selecting a card drills into that capital's subdivision AND reveals the
 * capital, so the map highlight + the country/subdivision widget update to
 * match, exactly like picking the subdivision then tapping "View capital".
 */
type Props = {
  countryCode: string;
  countryName: string;
  /** The subdivision code whose capital is currently shown (if any). */
  selectedCode: string | null;
  /** True when the "View capital" drill-down is open for the selected code. */
  capitalActive: boolean;
  baseUrl: string;
  onSelect: (code: string) => void;
};

export function CityFlagGrid({
  countryCode,
  countryName,
  selectedCode,
  capitalActive,
  baseUrl,
  onSelect,
}: Props) {
  const entries = useMemo(() => countryCityFlags(countryCode), [countryCode]);
  const [filter, setFilter] = useState("");

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter(
      (e) =>
        e.capitalName.toLowerCase().includes(q) ||
        e.subdivisionName.toLowerCase().includes(q),
    );
  }, [entries, filter]);

  if (entries.length === 0) {
    return (
      <p className="flag-grid__no-match">
        No sourced city flags are available for {countryName} yet.
      </p>
    );
  }

  return (
    <>
      <div className="flag-grid__controls flag-grid__controls--tab">
        <div className="flag-grid__filter">
          <span className="flag-grid__filter-icon" aria-hidden="true">🔍</span>
          <input
            type="search"
            className="flag-grid__filter-input"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter city flags…"
            aria-label="Filter city flags by name"
          />
          {filter && (
            <button
              type="button"
              className="flag-grid__filter-clear"
              onClick={() => setFilter("")}
              aria-label="Clear filter"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="flag-grid__no-match">
          No city flags match “{filter.trim()}”.{" "}
          <button
            type="button"
            className="flag-grid__no-match-clear"
            onClick={() => setFilter("")}
          >
            Clear filter
          </button>
        </p>
      ) : (
        <ul className="flag-grid__list">
          {filtered.map((entry) => {
            const active = capitalActive && entry.code === selectedCode;
            return (
              <li key={entry.code} className="flag-grid__item">
                <button
                  type="button"
                  className={`flag-grid__card${active ? " flag-grid__card--active" : ""}`}
                  onClick={() => onSelect(entry.code)}
                  aria-pressed={active}
                  aria-label={`Select ${entry.capitalName}, capital of ${entry.subdivisionName}`}
                >
                  <span className="flag-grid__thumb">
                    <img
                      src={`${baseUrl}${entry.flagPath}`}
                      alt=""
                      loading="lazy"
                      draggable={false}
                      className="flag-grid__thumb-img"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  </span>
                  <span className="flag-grid__name">
                    {entry.capitalName}
                    <span className="flag-grid__city-sub">{entry.subdivisionName}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
