import { useId, useState } from "react";

/**
 * Progressive-disclosure "What this logo means" panel for broadcaster and
 * airline logos — reusable explainer component similar to FlagMeaning but
 * designed for simple string descriptions without myths/sources sections.
 *
 * The copy is displayed behind a toggle button and collapsed by default.
 * When expanded it shows the sourced description of the logo's design.
 *
 * `label` describes what the disclosure explains — defaults to "What this logo means".
 */
export function LogoExplainer({
  description,
  label = "What this logo means",
}: {
  description: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="flag-meaning">
      <button
        type="button"
        className="flag-meaning__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flag-meaning__toggle-icon" aria-hidden="true">ⓘ</span>
        <span className="flag-meaning__toggle-label">{label}</span>
        <span className="flag-meaning__toggle-chev" aria-hidden="true">
          {open ? "▾" : "▸"}
        </span>
      </button>

      {open && (
        <div className="flag-meaning__panel" id={panelId}>
          <p className="flag-meaning__desc">{description}</p>
        </div>
      )}
    </div>
  );
}
