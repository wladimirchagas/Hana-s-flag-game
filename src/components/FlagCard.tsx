import { useEffect, useState } from "react";
import type { Country } from "../api/countries";

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

  return (
    <>
      <button
        type="button"
        className="flag-card flag-card--content"
        onClick={() => setZoomed(true)}
        aria-label="Enlarge flag"
      >
        <img
          key={country.flagSvg}
          src={country.flagSvg}
          alt=""
          className="flag-image"
          draggable={false}
          onError={(e) => {
            const img = e.currentTarget
            if (FLAGCDN_EXCLUDED.has(country.code)) return
            const png = `https://flagcdn.com/${country.code.toLowerCase()}.png`
            if (img.src !== png) img.src = png
          }}
        />
        <span className="flag-card__zoom-hint" aria-hidden="true">⤢ Click to enlarge</span>
      </button>
      {zoomed && (
        <div
          className="flag-zoom"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged flag"
          onClick={() => setZoomed(false)}
        >
          <img
            key={country.flagSvg}
            src={country.flagSvg}
            alt=""
            className="flag-zoom__img"
            draggable={false}
            onError={(e) => {
              const img = e.currentTarget
              const png = `https://flagcdn.com/${country.code.toLowerCase()}.png`
              if (img.src !== png) img.src = png
            }}
          />
          <button
            type="button"
            className="flag-zoom__close"
            onClick={(e) => {
              e.stopPropagation();
              setZoomed(false);
            }}
            aria-label="Close enlarged flag"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
