import { useEffect, useRef, useState } from "react";
import { ERAS, type Era } from "../lib/historicalEras";

/**
 * Historical-period selector — a "Period: …" pill that pops a listbox of every
 * era. Extracted from LearnTopToolbar so it can live inside the map-controls
 * toolbar (above the map) rather than in its own row, saving vertical space.
 *
 * Self-contained (open/close state, outside-click + Escape dismissal), so it can
 * be dropped anywhere as one of the map's extra controls.
 */
export function EraPicker({
  currentEraId,
  onEraChange,
}: {
  currentEraId: Era["id"];
  onEraChange: (id: Era["id"]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const currentEra =
    ERAS.find((e) => e.id === currentEraId) ?? ERAS[ERAS.length - 1];

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
        <ul
          className="learn-toolbar__era-menu"
          role="listbox"
          aria-label="Choose a period"
        >
          {[...ERAS].reverse().map((era) => {
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
          })}
        </ul>
      )}
    </div>
  );
}
