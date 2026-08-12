import { FlagMeaning } from "./FlagMeaning";
import { NATIONAL_FLAG_MEANINGS, NATIONAL_INDEPENDENCE, type NationalFlag } from "../data/nationalFlags";
import type { FlagMeaning as FlagMeaningData } from "../data/flagMeanings";
import { flagYearLabel, meaningLabel, symbolNoun } from "../lib/nationalFlags";

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
 *
 * The country's CURRENT flag (`flag.primary`) never reaches this component — the
 * fact-sheet panel above is already showing that exact image with its own
 * explainer, and repeating it below would put the same flag on screen twice.
 * `LearnPage` therefore scrolls to that panel instead of opening this one.
 */
export function NationalFlagDetails({
  flag,
  countryCode,
  countryName,
  baseUrl,
  onEnlarge,
  meanings,
}: {
  flag: NationalFlag;
  countryCode: string;
  countryName: string;
  baseUrl: string;
  onEnlarge: (url: string) => void;
  /**
   * Which curated meaning set to look `flag.id` up in. Defaults to
   * `NATIONAL_FLAG_MEANINGS` for every national symbol; a subdivision-group flag
   * (Malaysia's Federal Territories) whose sourced meaning lives outside that map
   * passes a one-entry override so its explainer still renders.
   */
  meanings?: Record<string, FlagMeaningData>;
}) {
  const url = flag.path ? `${baseUrl}${flag.path}` : null;
  const years = flagYearLabel(flag);
  // A pre-independence flag is spelled out, not merely badged: which power held the
  // territory, and the fact that this is NOT a flag of the independent country. The
  // year comes from the sourced NATIONAL_INDEPENDENCE record, never from the prose.
  const independence = NATIONAL_INDEPENDENCE[countryCode];
  // "Flag" is wrong for a coat of arms or a passport — every label that names the
  // item takes its noun from the category.
  const noun = symbolNoun(flag.category);
  return (
    <>
      <dl className="entity-summary">
        <div className="entity-summary__row">
          <dt className="entity-summary__label">{noun}</dt>
          <dd className="entity-summary__value">{flag.name}</dd>
        </div>
        {years && (
          <div className="entity-summary__row">
            <dt className="entity-summary__label">In use</dt>
            <dd className="entity-summary__value">{years}</dd>
          </div>
        )}
        {flag.sovereign && (
          <div className="entity-summary__row">
            <dt className="entity-summary__label">Under</dt>
            <dd className="entity-summary__value">{flag.sovereign}</dd>
          </div>
        )}
        {flag.priorPolity && (
          <div className="entity-summary__row">
            <dt className="entity-summary__label">Flown by</dt>
            <dd className="entity-summary__value">{flag.priorPolity}</dd>
          </div>
        )}
        {flag.occupier && (
          <div className="entity-summary__row">
            <dt className="entity-summary__label">Imposed by</dt>
            <dd className="entity-summary__value">{flag.occupier}</dd>
          </div>
        )}
      </dl>
      {flag.sovereign && (
        <p className="learn-fs__pre-independence">
          {/* "ruled by X", never "under X rule": the sovereign reads as a name
              ("Portugal") or with an article ("the United Kingdom", "the British
              East India Company"), and only this form is grammatical for both. */}
          <strong>Before independence.</strong> {countryName} was ruled by {flag.sovereign} when
          this flag flew
          {independence ? `, and became independent in ${independence.year}` : ""} — so this is
          not a flag of the independent country.
        </p>
      )}
      {flag.occupier && (
        // The mirror of the pre-independence caption. The wording never says the
        // occupier "ruled" the country: {countryName} was ALREADY independent when
        // this flag was imposed, which is precisely why "sovereign" is refused here
        // and why saying so is the whole point of showing the flag at all.
        <p className="learn-fs__pre-independence">
          <strong>Imposed during an occupation.</strong> {countryName} was already independent
          {independence ? ` (since ${independence.year})` : ""} when {flag.occupier} imposed this
          flag — so it is not a flag {countryName} chose, and the country's own flag was banned
          while this one flew.
        </p>
      )}
      {flag.priorPolity && (
        // Neither the modern country's flag nor a ruling power's: an earlier polity
        // on the same ground, answering to nobody. Saying so is what keeps it from
        // reading as a flag of the country as it is today.
        <p className="learn-fs__pre-independence">
          <strong>An earlier polity.</strong> This was the flag of {flag.priorPolity}, on the
          territory that is now {countryName}
          {independence ? `, before ${countryName} existed in its present form in ${independence.year}` : ""} —
          not a flag of the modern country, and not the flag of any ruling power.
        </p>
      )}
      <div className="learn-fs__flag-box">
        {flag.noImageReason ? (
          // Listed without a picture rather than dropped — the reason IS the content
          // here, so the user learns the symbol exists and why it cannot be shown.
          <p className="learn-fs__no-image">
            <strong>No image shown.</strong> {flag.noImageReason}
          </p>
        ) : (
          <button
            type="button"
            className="learn-fs__flag"
            onClick={() => url && onEnlarge(url)}
            aria-label={`Enlarge ${flag.name}`}
          >
            <img
              src={url ?? undefined}
              alt=""
              className="learn-fs__flag-img"
              draggable={false}
              onError={(e) => { e.currentTarget.closest("button")?.remove(); }}
            />
            <span className="learn-fs__flag-hint" aria-hidden="true">⤢ Click to enlarge</span>
          </button>
        )}
        <p className="learn-fs__flag-design">{flag.design}</p>
        <FlagMeaning
          code={flag.id}
          meanings={meanings ?? NATIONAL_FLAG_MEANINGS}
          label={meaningLabel(flag.category)}
        />
      </div>
    </>
  );
}
