import { useEffect, useMemo, useRef, useState } from "react";
import type { Country } from "../api/countries";
import { WorldProgressMap } from "./WorldProgressMap";
import { isLearned } from "../lib/learnedFlags";
import { gameAudio } from "../lib/gameAudio";

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
  const [zoomed, setZoomed] = useState(false);
  // Track zoom in a ref so the Esc handler — bound once at mount — can
  // route the key to the right action (close zoom first, then modal).
  const zoomedRef = useRef(zoomed);
  zoomedRef.current = zoomed;

  // Play the unlock sparkle sound when the modal first appears.
  useEffect(() => {
    gameAudio.playUnlock();
  }, []);

  const highlightCodes = useMemo(
    () => new Set([country.code]),
    [country.code],
  );
  // The daily flag is the same for every player on a given calendar
  // date, so it can land on a code the player has already unlocked on a
  // previous day. We still show the modal (same flag for everyone is
  // the whole point) but adapt the framing so it doesn't look like the
  // app is trying to give them something they already have.
  const alreadyLearned = useMemo(() => isLearned(country.code), [country.code]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (zoomedRef.current) {
        // Close the fullscreen flag first; leave the unlock modal up.
        setZoomed(false);
      } else {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // `preventScroll` keeps the modal's overflow:auto container at the
    // top so the eyebrow + country name remain visible. Without it the
    // browser scrolls the focused button into view, parking the panel
    // at the bottom and hiding the title.
    const t = window.setTimeout(
      () => learnedBtnRef.current?.focus({ preventScroll: true }),
      50,
    );
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
        <p className="flag-unlock__eyebrow">
          Today&rsquo;s flag
          {alreadyLearned ? " · already in your list ⭐" : ""}
        </p>
        <h2 id="flag-unlock__title" className="flag-unlock__title">
          {country.name}
        </h2>
        <button
          type="button"
          className="flag-unlock__flag-wrap"
          onClick={() => setZoomed(true)}
          aria-label={`Enlarge ${country.name} flag`}
        >
          <img
            key={country.flagSvg}
            src={country.flagSvg}
            alt={`Flag of ${country.name}`}
            className="flag-unlock__flag"
            draggable={false}
          />
          <span className="flag-unlock__flag-hint" aria-hidden="true">
            ⤢ Click to enlarge
          </span>
        </button>
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
            onClick={alreadyLearned ? onClose : onLearned}
          >
            {alreadyLearned ? "Cool, got it! ✨" : "I’ve learned it! ✨"}
          </button>
          {!alreadyLearned && (
            <button
              type="button"
              className="flag-unlock__skip"
              onClick={onClose}
            >
              Maybe later
            </button>
          )}
        </div>
      </div>

      {/* Fullscreen flag view — same .flag-zoom pattern used by FlagCard
          and Learn-mode. Click the backdrop or press Esc to dismiss. */}
      {zoomed && (
        <div
          className="flag-zoom"
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged ${country.name} flag`}
          onClick={() => setZoomed(false)}
        >
          <img
            key={country.flagSvg}
            src={country.flagSvg}
            alt={`Flag of ${country.name}`}
            className="flag-zoom__img"
            draggable={false}
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
    </div>
  );
}
