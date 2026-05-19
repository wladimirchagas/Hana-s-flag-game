import type { Country } from "../api/countries";

/**
 * Multiple-choice answer panel for game modes whose per-question option
 * pool is small enough that ALL choices can fit on screen. When the
 * caller passes ≤ MAX_BUTTON_OPTIONS countries we render them as
 * clickable buttons in a grid; the existing CountryDropdown is used as
 * a fallback for larger pools.
 *
 * Button size scales with the count: fewer options → bigger buttons.
 * The grid uses CSS `auto-fit` + a min column-width that shrinks with
 * the count, so on wide screens the buttons end up in 2-4 rows of
 * comfortably-sized targets without overflowing.
 *
 * Clicking a button only selects the country — confirming the answer
 * stays in the Confirm button (or map confirm popover) so the
 * existing wrong-guess / retry flow is unchanged.
 */
export type AnswerOptionsProps = {
  countries: readonly Country[];
  value: Country | null;
  onChange: (c: Country | null) => void;
  disabled: boolean;
  label: string;
};

export const MAX_BUTTON_OPTIONS = 15;

export function shouldUseButtons(count: number): boolean {
  return count > 0 && count <= MAX_BUTTON_OPTIONS;
}

export function AnswerOptions({
  countries,
  value,
  onChange,
  disabled,
  label,
}: AnswerOptionsProps) {
  const n = countries.length;
  // Map count → CSS class. Smaller buckets get larger min column widths
  // and bigger padding via the matching --size modifier.
  const sizeClass =
    n <= 3
      ? "answer-options--size-xl"
      : n <= 6
      ? "answer-options--size-lg"
      : n <= 9
      ? "answer-options--size-md"
      : "answer-options--size-sm";

  return (
    <div
      className={`answer-options ${sizeClass}`}
      role="radiogroup"
      aria-label={label}
    >
      <p className="answer-options__label">{label}</p>
      <ul className="answer-options__grid">
        {countries.map((c) => {
          const active = value?.code === c.code;
          return (
            <li key={c.code} className="answer-options__item">
              <button
                type="button"
                role="radio"
                aria-checked={active}
                disabled={disabled}
                className={`answer-options__btn${
                  active ? " answer-options__btn--active" : ""
                }`}
                onClick={() => onChange(c)}
              >
                {c.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
