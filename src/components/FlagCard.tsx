import { useEffect, useState } from "react";
import type { Country } from "../api/countries";
import { QUIZ_SYMBOL_NOUNS } from "../lib/quizSymbols";

// Codes where flagcdn.com serves a politically incorrect flag.
// These must never fall back to flagcdn — show broken image instead.
const FLAGCDN_EXCLUDED = new Set(["AF"]);

type Props = {
  country: Country | null;
  phase: "loading" | "error" | "guessing" | "revealed" | "finished";
};

export function FlagCard({ country, phase }: Props) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [zoomed]);

  if (phase === "loading" || !country) {
    return (
      <div className="flag-card flag-card--placeholder" aria-busy="true">
        <div className="flag-skeleton" />
      </div>
    );
  }

  const pack = country.symbolPack ?? "flag";
  const noun = QUIZ_SYMBOL_NOUNS[pack];
  const revealed = phase === "revealed" || phase === "finished";

  // The text pack shows a sourced explainer instead of a picture. Its citation
  // names the country ("Coat of arms of Andorra"), so the source is withheld
  // until the answer is revealed — then it is shown, because a clue nobody can
  // check is not the kind of question this repo asks.
  if (country.symbolClue) {
    return (
      <div className="flag-card flag-card--clue">
        <p className="flag-card__clue-text">{country.symbolClue.text}</p>
        {revealed && (
          <p className="flag-card__clue-source">
            Source:{" "}
            <a
              href={country.symbolClue.sourceUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              {country.symbolClue.sourceTitle}
            </a>
          </p>
        )}
      </div>
    );
  }

  // A symbol image is a bundled local file — there is no CDN to fall back to,
  // and reaching for flagcdn would serve the country's FLAG in place of its
  // coat of arms, which is exactly the wrong-image class of bug this repo guards.
  const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (pack !== "flag") return;
    const img = e.currentTarget;
    if (FLAGCDN_EXCLUDED.has(country.code)) return;
    const png = `https://flagcdn.com/${country.code.toLowerCase()}.png`;
    if (img.src !== png) img.src = png;
  };

  return (
    <>
      <button
        type="button"
        className="flag-card flag-card--content"
        onClick={() => setZoomed(true)}
        aria-label={`Enlarge ${noun}`}
      >
        <img
          key={country.flagSvg}
          src={country.flagSvg}
          alt=""
          className="flag-image"
          draggable={false}
          onError={onImgError}
        />
        <span className="flag-card__zoom-hint" aria-hidden="true">⤢ Click to enlarge</span>
      </button>
      {zoomed && (
        <div
          className="flag-zoom"
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged ${noun}`}
          onClick={() => setZoomed(false)}
        >
          <img
            key={country.flagSvg}
            src={country.flagSvg}
            alt=""
            className="flag-zoom__img"
            draggable={false}
            onError={onImgError}
          />
          <button
            type="button"
            className="flag-zoom__close"
            onClick={(e) => {
              e.stopPropagation();
              setZoomed(false);
            }}
            aria-label={`Close enlarged ${noun}`}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
