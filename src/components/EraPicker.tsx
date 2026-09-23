import { useEffect, useMemo, useRef, useState } from "react";
import { usePopoverBounds } from "../hooks/usePopoverBounds";
import { ERAS, type Era } from "../lib/historicalEras";
import { UiIcon } from "./UiIcon";
import { normalizeForSearch } from "../lib/searchNormalize";

/**
 * Historical-period selector — a "Period: …" pill that pops a listbox of every
 * era. Extracted from LearnTopToolbar so it can live inside the map-controls
 * toolbar (above the map) rather than in its own row, saving vertical space.
 *
 * Self-contained (open/close state, outside-click + Escape dismissal), with
 * type-to-search filtering since there are >10 historical periods.
 */
export function EraPicker({
  currentEraId,
  onEraChange,
}: {
  currentEraId: Era["id"];
  onEraChange: (id: Era["id"]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuStyle = usePopoverBounds(open, ref, 280);

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    const timer = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 50);

    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const currentEra =
    ERAS.find((e) => e.id === currentEraId) ?? ERAS[ERAS.length - 1];

  const erasReversed = useMemo(() => [...ERAS].reverse(), []);

  const filteredEras = useMemo(() => {
    const q = normalizeForSearch(query.trim());
    if (!q) return erasReversed;
    return erasReversed.filter(
      (era) =>
        normalizeForSearch(era.label).includes(q) ||
        normalizeForSearch(era.caption).includes(q) ||
        (era.id === "today" && q.includes("now")),
    );
  }, [erasReversed, query]);

  return (
    <div className="learn-toolbar__historical" ref={ref}>
      <button
        type="button"
        className="learn-toolbar__era-pill learn-toolbar__era-pill--active"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="learn-toolbar__era-prefix">Period: </span>
        {currentEra.label}
        <span className="learn-toolbar__era-caption">({currentEra.caption})</span>
        <span className="learn-toolbar__caret" aria-hidden="true">
          ▾
        </span>
      </button>
      {open && (
        <div
          className="learn-toolbar__era-menu"
          style={menuStyle}
          role="dialog"
          aria-label="Choose a period"
        >
          <div className="searchable-select__search-box" style={{ margin: "0.2rem 0.2rem 0.4rem 0.2rem" }}>
            <span className="searchable-select__search-icon" aria-hidden="true">
              <UiIcon name="search" />
            </span>
            <input
              ref={searchInputRef}
              type="text"
              className="searchable-select__search-input"
              placeholder="Filter periods…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Filter historical periods"
              autoComplete="off"
              spellCheck="false"
            />
            {query && (
              <button
                type="button"
                className="searchable-select__clear-btn"
                onClick={() => {
                  setQuery("");
                  searchInputRef.current?.focus();
                }}
                aria-label="Clear filter"
              >
                <UiIcon name="close" />
              </button>
            )}
          </div>
          <ul
            className="searchable-select__list"
            role="listbox"
            aria-label="Historical periods"
            style={{ listStyle: "none", margin: 0, padding: 0 }}
          >
            {filteredEras.length === 0 ? (
              <li className="searchable-select__empty" role="presentation">
                No matching periods
              </li>
            ) : (
              filteredEras.map((era) => {
                const active = era.id === currentEraId;
                const isToday = era.id === "today";
                return (
                  <li key={era.id} role="presentation">
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      className={`learn-toolbar__era-option${
                        active ? " learn-toolbar__era-option--active" : ""
                      }${isToday ? " learn-toolbar__era-option--today" : ""}`}
                      onClick={() => {
                        onEraChange(era.id);
                        setOpen(false);
                      }}
                    >
                      <span className="learn-toolbar__era-option-period">
                        {era.label}
                        {isToday && (
                          <span
                            className="learn-toolbar__era-today-badge"
                            aria-label="current era"
                          >
                            NOW
                          </span>
                        )}
                      </span>
                      <span className="learn-toolbar__era-option-caption">
                        {era.caption}
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
