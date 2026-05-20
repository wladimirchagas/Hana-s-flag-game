import { useEffect, useRef, useState } from "react";
import { ERAS, type Era } from "../lib/historicalEras";
import { CountryDropdown } from "./CountryDropdown";
import type { Country } from "../api/countries";

/**
 * Top-of-page toolbar for the Learn map.
 *
 * Two controls on one row:
 *   1. Era selector — a "Today" pill and a "Historical periods" pill.
 *      Selecting the latter pops a dropdown listing every historical
 *      era so the user picks the year they want. The current selection
 *      is reflected in the pill's label ("Historical periods · 1914").
 *   2. Country search — the same CountryDropdown that used to live
 *      inside the right-hand panel; promoted up here so it's accessible
 *      without scrolling.
 *
 * The search column is rendered as an empty placeholder on historical
 * eras (the dropdown only makes sense for the modern 195-country set).
 */
export type LearnTopToolbarProps = {
  currentEraId: Era["id"];
  onEraChange: (id: Era["id"]) => void;
  /** Whether the era selector is on "Today" (modern era). */
  isModernEra: boolean;
  /** Search props — null in historical eras to hide the search. */
  search: {
    countries: readonly Country[];
    value: Country | null;
    onChange: (c: Country | null) => void;
    disabled: boolean;
  } | null;
};

export function LearnTopToolbar({
  currentEraId,
  onEraChange,
  search,
}: LearnTopToolbarProps) {
  const [historicalOpen, setHistoricalOpen] = useState(false);
  const historicalRef = useRef<HTMLDivElement>(null);

  // Close the historical-eras submenu on outside click / Escape, so it
  // behaves like a real dropdown rather than a sticky modal.
  useEffect(() => {
    if (!historicalOpen) return;
    function onDocClick(e: MouseEvent) {
      if (!historicalRef.current) return;
      if (!historicalRef.current.contains(e.target as Node)) {
        setHistoricalOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setHistoricalOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [historicalOpen]);

  const currentEra = ERAS.find((e) => e.id === currentEraId) ?? ERAS[ERAS.length - 1];

  return (
    <div className="learn-toolbar">
      <div className="learn-toolbar__eras">
        <div className="learn-toolbar__historical" ref={historicalRef}>
          <button
            type="button"
            className="learn-toolbar__era-pill learn-toolbar__era-pill--active"
            aria-haspopup="listbox"
            aria-expanded={historicalOpen}
            onClick={() => setHistoricalOpen((v) => !v)}
          >
            Period: {currentEra.label}
            <span className="learn-toolbar__era-caption">
              ({currentEra.caption})
            </span>
            <span className="learn-toolbar__caret" aria-hidden="true">
              ▾
            </span>
          </button>
          {historicalOpen && (
            <ul
              className="learn-toolbar__era-menu"
              role="listbox"
              aria-label="Choose a period"
            >
              {[...ERAS].reverse().map((era) => {
                const active = era.id === currentEraId;
                return (
                  <li key={era.id} role="presentation">
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      className={`learn-toolbar__era-option${
                        active ? " learn-toolbar__era-option--active" : ""
                      }`}
                      onClick={() => {
                        onEraChange(era.id);
                        setHistoricalOpen(false);
                      }}
                    >
                      <span className="learn-toolbar__era-option-period">
                        {era.label}
                      </span>
                      <span className="learn-toolbar__era-option-caption">
                        {era.caption}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="learn-toolbar__search">
        {search ? (
          <CountryDropdown
            countries={search.countries as Country[]}
            value={search.value}
            onChange={search.onChange}
            disabled={search.disabled}
            label="Find a country"
            listPlacement="down"
          />
        ) : (
          <p className="learn-toolbar__search-hint">
            Click any polity on the map to explore this era.
          </p>
        )}
      </div>
    </div>
  );
}
