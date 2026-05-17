import { ERAS, type Era } from "../lib/historicalEras";

export type EraSliderProps = {
  currentId: Era["id"];
  onChange: (id: Era["id"]) => void;
};

/**
 * Horizontal strip of pill buttons across the bottom of the map column.
 *
 * Each pill shows BOTH the period and a kid-friendly caption so users
 * understand what they're selecting:
 *
 *   ┌─────────────────┐
 *   │ 117 AD          │
 *   │ Roman peak      │
 *   └─────────────────┘
 *
 * The currently selected era's full summary sits below the slider as
 * small print.
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
              title={`${era.year || era.label} — ${era.summary}`}
              onClick={() => onChange(era.id)}
            >
              <span className="era-slider__pill-period">{era.label}</span>
              <span className="era-slider__pill-caption">{era.caption}</span>
            </button>
          );
        })}
      </div>
      <p className="era-slider__summary">
        {current.year && (
          <>
            <span className="era-slider__year">{current.year}</span>
            <span className="era-slider__sep">·</span>
          </>
        )}
        <span className="era-slider__caption">{current.summary}</span>
      </p>
    </div>
  );
}
