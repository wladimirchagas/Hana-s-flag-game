import { UiIcon } from "./UiIcon";
import { usePopoverBounds } from "../hooks/usePopoverBounds";
import { useEffect, useRef, useState } from "react";
import {
  getDemocracyIndexLabel,
  getDemocracyIndexMenuGroups,
  isDemocracyIndexMode,
  isPersonaMapMode,
  isWvsMapMode,
  type DemocracyMapMode,
} from "../lib/democracyColors";
import { PERSONA_EDITION, PERSONA_MAP_MODE } from "../lib/countryPersonas";
import { formatWvsSelectionLabel } from "../lib/wvsResults";
import { WvsSelectionPicker } from "./WvsSelectionPicker";

export type DemocracyMapControlProps = {
  mode: DemocracyMapMode;
  onChange: (next: DemocracyMapMode) => void;
};

export function DemocracyMapControl({
  mode,
  onChange,
}: DemocracyMapControlProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const popoverStyle = usePopoverBounds(open, ref, 420);
  const menuGroups = getDemocracyIndexMenuGroups();

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

  const selectIndex = (next: DemocracyMapMode) => {
    onChange(next);
    setOpen(false);
  };

  const isActive = mode !== null;
  const activeLabel = isWvsMapMode(mode)
    ? formatWvsSelectionLabel(mode)
    : isPersonaMapMode(mode)
      ? `Country personas, ${PERSONA_EDITION}`
      : isDemocracyIndexMode(mode)
        ? getDemocracyIndexLabel(mode)
        : null;

  return (
    <div className="democracy-map-control" ref={ref}>
      <button
        type="button"
        className={`world-map__zoom-btn world-map__zoom-btn--layer${isActive ? " world-map__zoom-btn--active" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={
          activeLabel
            ? `Colour countries by index or survey — ${activeLabel}`
            : "Colour countries by index, ranking, or survey"
        }
        title={
          activeLabel
            ? `Colour by: ${activeLabel}`
            : "Colour countries by index, ranking, or survey"
        }
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
          aria-label="Index, ranking, and survey map view"
        >
          <p className="map-view-control__heading">Indexes & rankings</p>
          <div className="democracy-map-control__options">
            <button
              type="button"
              className={`map-view-control__preset${mode === null ? " map-view-control__preset--active" : ""}`}
              onClick={() => selectIndex(null)}
            >
              Off (Default map)
            </button>
            {/* Country Personas: categorical groups, not an index (no green→red scale). */}
            <div className="democracy-map-control__group">
              <hr className="democracy-map-control__divider" aria-hidden="true" />
              <p className="democracy-map-control__group-label">Country personas</p>
              <button
                type="button"
                className={`map-view-control__preset${isPersonaMapMode(mode) ? " map-view-control__preset--active" : ""}`}
                onClick={() => selectIndex(PERSONA_MAP_MODE)}
              >
                {`Country personas, ${PERSONA_EDITION}`}
              </button>
            </div>
            {menuGroups.map((group) => (
              <div key={group.theme.id} className="democracy-map-control__group">
                <hr className="democracy-map-control__divider" aria-hidden="true" />
                <p className="democracy-map-control__group-label">{group.theme.label}</p>
                {group.indexes.map((meta) => (
                  <button
                    key={meta.key}
                    type="button"
                    className={`map-view-control__preset${mode === meta.key ? " map-view-control__preset--active" : ""}`}
                    onClick={() => selectIndex(meta.key)}
                  >
                    {getDemocracyIndexLabel(meta.key)}
                  </button>
                ))}
              </div>
            ))}
            <div className="democracy-map-control__group">
              <hr className="democracy-map-control__divider" aria-hidden="true" />
              <WvsSelectionPicker
                value={isWvsMapMode(mode) ? mode : null}
                onChange={(sel) => {
                  if (!sel) {
                    onChange(null);
                    return;
                  }
                  // Keep the popover open so further answers can be ticked.
                  onChange({ kind: "wvs", ...sel });
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
