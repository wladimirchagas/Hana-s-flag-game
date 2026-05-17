import { ERAS, type Era } from "../lib/historicalEras";

export type EraSliderProps = {
  currentId: Era["id"];
  onChange: (id: Era["id"]) => void;
};

/**
 * Horizontal strip of pill buttons across the bottom of the map column.
 * One pill per era, oldest → newest, with the currently selected era
 * highlighted. The era's summary is shown underneath as small print so
 * kids see one-line context about what they're looking at.
 *
 * Pre-1886 eras carry an `approximate: true` flag — the slider surfaces
 * a small footnote on those so the educational approximation is honest.
 */
export function EraSlider({ currentId, onChange }: EraSliderProps) {
  const current = ERAS.find((e) => e.id === currentId) ?? ERAS[ERAS.length - 1]!;

  return (
    <div className="era-slider" aria-label="Choose a historical era">
      <div className="era-slider__pills" role="radiogroup">
        {ERAS.map((era) => {
          const isActive = era.id === currentId;
          return (
            <button
              key={era.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              className={`era-slider__pill ${
                isActive ? "era-slider__pill--active" : ""
              }`}
              title={`${era.year ?? era.label} — ${era.summary}`}
              onClick={() => onChange(era.id)}
            >
              {era.label}
            </button>
          );
        })}
      </div>
      <p className="era-slider__summary">
        <span className="era-slider__year">
          {current.year ?? current.label}
        </span>
        <span className="era-slider__sep">·</span>
        <span className="era-slider__caption">{current.summary}</span>
      </p>
      {current.approximate && (
        <p className="era-slider__footnote">
          Borders are simplified for learning — modern outlines used to
          approximate historical territory.
        </p>
      )}
    </div>
  );
}
