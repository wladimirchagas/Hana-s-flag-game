import { useEffect, useRef, useState } from "react";
import { CountrySelector } from "./CountrySelector";
import {
  ALL_COUNTRY_OPTIONS,
  loadStoredSelection,
  saveStoredSelection,
} from "../lib/countrySelection";

export type CountryPickerModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (codes: string[]) => void;
};

export function CountryPickerModal({
  open,
  onClose,
  onConfirm,
}: CountryPickerModalProps) {
  const [codes, setCodes] = useState<string[]>(() => loadStoredSelection().codes);
  const [showSettings, setShowSettings] = useState(false);
  const playRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    setCodes(loadStoredSelection().codes);
    setShowSettings(false);
    const t = window.setTimeout(() => playRef.current?.focus(), 0);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
      previouslyFocusedRef.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleToggle = (code: string) => {
    setCodes((prev) => {
      const next = prev.includes(code)
        ? prev.filter((c) => c !== code)
        : [code, ...prev];
      saveStoredSelection({ codes: next });
      return next;
    });
  };

  const canPlay = codes.length >= 2;

  return (
    <div
      className="picker-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="picker-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="picker">
        <header className="picker__header">
          <div>
            <h2 id="picker-title" className="picker__title">
              Hana&rsquo;s Game
            </h2>
            <p className="picker__hint">
              {showSettings
                ? "Checked countries stay at the top. Pick at least 2."
                : `Playing with ${codes.length} of ${ALL_COUNTRY_OPTIONS.length} countries.`}
            </p>
          </div>
          <div className="picker__header-actions">
            <button
              type="button"
              className={`picker__settings ${showSettings ? "picker__settings--active" : ""}`}
              onClick={() => setShowSettings((s) => !s)}
              aria-label={showSettings ? "Hide country list" : "Edit country list"}
              aria-pressed={showSettings}
              aria-expanded={showSettings}
              aria-controls="picker-country-list"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
            <button
              type="button"
              className="picker__close"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </header>
        {showSettings && (
          <div className="picker__body" id="picker-country-list">
            <CountrySelector selectedCodes={codes} onToggle={handleToggle} />
          </div>
        )}
        <footer className="picker__footer">
          <button
            type="button"
            className="picker__cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            ref={playRef}
            type="button"
            className="picker__play"
            disabled={!canPlay}
            title={canPlay ? undefined : "Select at least 2 countries"}
            onClick={() => onConfirm(codes)}
          >
            Start game
          </button>
        </footer>
      </div>
    </div>
  );
}
