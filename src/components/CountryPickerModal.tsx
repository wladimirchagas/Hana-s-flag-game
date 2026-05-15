import { useEffect, useRef, useState } from "react";
import { CountrySelector } from "./CountrySelector";
import {
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
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    setCodes(loadStoredSelection().codes);
    const t = window.setTimeout(() => closeRef.current?.focus(), 0);
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
              Pick your flags
            </h2>
            <p className="picker__hint">
              Checked countries stay at the top. Pick at least 2.
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="picker__close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>
        <div className="picker__body">
          <CountrySelector selectedCodes={codes} onToggle={handleToggle} />
        </div>
        <footer className="picker__footer">
          <button
            type="button"
            className="picker__cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="picker__play"
            disabled={!canPlay}
            title={canPlay ? undefined : "Select at least 2 countries"}
            onClick={() => onConfirm(codes)}
          >
            Play with these ({codes.length})
          </button>
        </footer>
      </div>
    </div>
  );
}
