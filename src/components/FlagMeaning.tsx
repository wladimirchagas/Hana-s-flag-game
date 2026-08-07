import { useId, useState } from "react";
import { FLAG_MEANINGS, type FlagMeaning as FlagMeaningData } from "../data/flagMeanings";

/**
 * Progressive-disclosure "What this flag means" panel, shown below the flag
 * image in the Learn-mode widget for national, subnational AND city (capital)
 * flags.
 *
 * The copy can be long, so it is collapsed by default behind a toggle button.
 * When expanded it shows the sourced factual description, an explicit
 * "Myth vs fact" block for any widely-believed-but-false claims, and the
 * authoritative source links.
 *
 * `meanings` selects which curated dataset to look the code up in — it defaults
 * to `FLAG_MEANINGS` (national + subnational, keyed by ISO code) and is passed
 * `CITY_FLAG_MEANINGS` by the capital-city widget so the city-flag explainer
 * gets the IDENTICAL look, spacing and behaviour. Data + sourcing rules live in
 * `src/data/flagMeanings.ts` / `src/data/cityFlagMeanings.ts` and CLAUDE.md
 * ("Flag-meaning explanations must be sourced and must separate myth from
 * fact"). This component renders nothing when the code has no entry, so each
 * curated set can grow incrementally.
 */
export function FlagMeaning({
  code,
  meanings = FLAG_MEANINGS,
  label = "What this flag means",
}: {
  code: string | null | undefined;
  meanings?: Record<string, FlagMeaningData>;
  /**
   * What the disclosure calls the thing it explains. Defaults to "flag" because
   * every original caller shows one; the national-symbols tab passes "coat of arms"
   * or "passport" so a label never calls something a flag that is not one.
   */
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const meaning = code ? meanings[code] : undefined;
  if (!meaning) return null;

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
          <p className="flag-meaning__desc">{meaning.description}</p>

          {meaning.myths && meaning.myths.length > 0 && (
            <div className="flag-meaning__myths">
              <p className="flag-meaning__myths-heading">Myth vs fact</p>
              {meaning.myths.map((m, i) => (
                <div className="flag-meaning__myth" key={i}>
                  <p className="flag-meaning__myth-claim">
                    <span className="flag-meaning__myth-tag">Myth</span>
                    {m.claim}
                  </p>
                  <p className="flag-meaning__myth-reality">
                    <span className="flag-meaning__fact-tag">Fact</span>
                    {m.reality}
                  </p>
                </div>
              ))}
            </div>
          )}

          <p className="flag-meaning__sources">
            <span className="flag-meaning__sources-label">Sources:</span>{" "}
            {meaning.sources.map((s, i) => (
              <span key={s.url}>
                {i > 0 && "; "}
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flag-meaning__source-link"
                >
                  {s.title}
                </a>
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}
