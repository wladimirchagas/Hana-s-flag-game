import { useEffect, useMemo, useRef } from "react";
import type { Country } from "../api/countries";
import { WorldProgressMap } from "./WorldProgressMap";

export type FlagUnlockModalProps = {
  country: Country;
  /** Called when the user confirms they've learned the flag. */
  onLearned: () => void;
  /** Called when the user dismisses the modal without confirming. */
  onClose: () => void;
};

/**
 * Streak-reward modal shown when the player cashes in three consecutive
 * 100%-perfect Hana's Game runs. Presents the freshly-unlocked flag at
 * poster size, names the country, and highlights its location on the
 * world map so the player learns the flag *and* where it sits in the
 * world. Clicking "I've learned it!" wires the code into the saved
 * Hana's Game selection (handled by the parent) so it appears in the
 * next run.
 */
export function FlagUnlockModal({
  country,
  onLearned,
  onClose,
}: FlagUnlockModalProps) {
  const learnedBtnRef = useRef<HTMLButtonElement>(null);

  const highlightCodes = useMemo(
    () => new Set([country.code]),
    [country.code],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => learnedBtnRef.current?.focus(), 50);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [onClose]);

  return (
    <div
      className="flag-unlock"
      role="dialog"
      aria-modal="true"
      aria-labelledby="flag-unlock-title"
    >
      <div className="flag-unlock__panel">
        <button
          type="button"
          className="flag-unlock__close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <p className="flag-unlock__eyebrow">A new flag for your collection</p>
        <h2 id="flag-unlock__title" className="flag-unlock__title">
          {country.name}
        </h2>
        <div className="flag-unlock__flag-wrap">
          <img
            src={country.flagSvg}
            alt={`Flag of ${country.name}`}
            className="flag-unlock__flag"
            draggable={false}
          />
        </div>
        <div className="flag-unlock__map" aria-label={`Location of ${country.name} on the world map`}>
          <WorldProgressMap
            countryResults={{}}
            selectedCode={country.code}
            highlightCodes={highlightCodes}
            disabled
          />
        </div>
        <p className="flag-unlock__caption">
          {country.continent}
          {country.capital ? ` · Capital: ${country.capital}` : ""}
        </p>
        <div className="flag-unlock__actions">
          <button
            ref={learnedBtnRef}
            type="button"
            className="flag-unlock__learned"
            onClick={onLearned}
          >
            I&rsquo;ve learned it! ✨
          </button>
          <button
            type="button"
            className="flag-unlock__skip"
            onClick={onClose}
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
