import { FlagMeaning } from "./FlagMeaning";
import { NATIONAL_FLAG_MEANINGS, type NationalFlag } from "../data/nationalFlags";
import { flagYearLabel } from "../lib/nationalFlags";

/**
 * The widget for a flag picked in the "National flags" tab — the second card
 * below the country fact-sheet, exactly where a selected sub-national flag's
 * widget appears (owner request: "the current national flag remains at the top,
 * then the selected flag is shown in a second widget below").
 *
 * It shows the flag itself, its own NAME, the years it was flown, what the image
 * is, and the sourced "What this flag means" disclosure — the SAME progressive-
 * disclosure component the national, sub-national and capital-city flags use, fed
 * from `NATIONAL_FLAG_MEANINGS` via its `meanings` prop, so a flag with no sourced
 * symbolism simply shows no disclosure rather than an invented one.
 *
 * Nothing here touches the map: these flags belong to the whole country, so there
 * is no territory to highlight.
 */
export function NationalFlagDetails({
  flag,
  baseUrl,
  onEnlarge,
}: {
  flag: NationalFlag;
  baseUrl: string;
  onEnlarge: (url: string) => void;
}) {
  const url = `${baseUrl}${flag.path}`;
  const years = flagYearLabel(flag);
  return (
    <>
      <dl className="entity-summary">
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Flag</dt>
          <dd className="entity-summary__value">{flag.name}</dd>
        </div>
        {years && (
          <div className="entity-summary__row">
            <dt className="entity-summary__label">In use</dt>
            <dd className="entity-summary__value">{years}</dd>
          </div>
        )}
      </dl>
      <div className="learn-fs__flag-box">
        <button
          type="button"
          className="learn-fs__flag"
          onClick={() => onEnlarge(url)}
          aria-label={`Enlarge ${flag.name}`}
        >
          <img
            src={url}
            alt=""
            className="learn-fs__flag-img"
            draggable={false}
            onError={(e) => { e.currentTarget.closest("button")?.remove(); }}
          />
          <span className="learn-fs__flag-hint" aria-hidden="true">⤢ Click to enlarge</span>
        </button>
        <p className="learn-fs__flag-design">{flag.design}</p>
        <FlagMeaning code={flag.id} meanings={NATIONAL_FLAG_MEANINGS} />
      </div>
    </>
  );
}
