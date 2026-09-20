import { UiIcon } from "./UiIcon";
import { usePopoverBounds } from "../hooks/usePopoverBounds";
import { useEffect, useRef, useState } from "react";
import type { DemocracyMapMode } from "../lib/democracyColors";

export type DemocracyMapControlProps = {
  mode: DemocracyMapMode;
  onChange: (next: DemocracyMapMode) => void;
};

export function DemocracyMapControl({ mode, onChange }: DemocracyMapControlProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const popoverStyle = usePopoverBounds(open, ref, 256);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const selectMode = (next: DemocracyMapMode) => {
    onChange(next);
    setOpen(false);
  };

  const isActive = mode !== null;

  return (
    <div className="democracy-map-control" ref={ref}>
      <button
        type="button"
        className={`world-map__zoom-btn world-map__zoom-btn--layer${isActive ? " world-map__zoom-btn--active" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Colour countries by Democracy Index"
        title="Colour countries by Democracy Index"
      >
        <span className="world-map__zoom-icon" aria-hidden="true">
          <UiIcon name="democracy" />
        </span>
      </button>

      {open && (
        <div
          className="map-view-control__popover democracy-map-control__popover"
          style={popoverStyle}
          role="dialog"
          aria-label="Democracy Index map view"
        >
          <p className="map-view-control__heading">Democracy Index</p>
          <div className="democracy-map-control__options">
            <button
              type="button"
              className={`map-view-control__preset${mode === null ? " map-view-control__preset--active" : ""}`}
              onClick={() => selectMode(null)}
            >
              Off (Default map)
            </button>
            <button
              type="button"
              className={`map-view-control__preset${mode === "freedom-house" ? " map-view-control__preset--active" : ""}`}
              onClick={() => selectMode("freedom-house")}
            >
              Freedom House rating
            </button>
            <button
              type="button"
              className={`map-view-control__preset${mode === "v-dem" ? " map-view-control__preset--active" : ""}`}
              onClick={() => selectMode("v-dem")}
            >
              V-Dem regime type
            </button>
            <button
              type="button"
              className={`map-view-control__preset${mode === "economist" ? " map-view-control__preset--active" : ""}`}
              onClick={() => selectMode("economist")}
            >
              The Economist Index
            </button>
            <button
              type="button"
              className={`map-view-control__preset${mode === "cpi" ? " map-view-control__preset--active" : ""}`}
              onClick={() => selectMode("cpi")}
            >
              Corruption Perceptions Index
            </button>
            <button
              type="button"
              className={`map-view-control__preset${mode === "perception" ? " map-view-control__preset--active" : ""}`}
              onClick={() => selectMode("perception")}
            >
              Democracy Perception Index
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
