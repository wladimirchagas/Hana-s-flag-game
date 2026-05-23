import { useEffect, useRef, useState } from "react";

export type QuickQuizConfig = { flagCount: number };

export type QuickQuizSetupModalProps = {
  open: boolean;
  onClose: () => void;
  onStart: (config: QuickQuizConfig) => void;
};

const COUNT_OPTIONS: readonly number[] = [5, 10, 20, 30];

export function QuickQuizSetupModal({
  open,
  onClose,
  onStart,
}: QuickQuizSetupModalProps) {
  const [count, setCount] = useState<number>(20);

  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
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

  return (
    <div
      className="qquiz-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="qquiz-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="qquiz">
        <header className="qquiz__header">
          <div>
            <h2 id="qquiz-title" className="qquiz__title">
              Quick Quiz
            </h2>
            <p className="qquiz__hint">
              How many flags do you want to play? You'll get the same number of answer choices.
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="qquiz__close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        <div className="qquiz__body">
          <fieldset className="qquiz__group">
            <legend className="qquiz__legend">Number of flags</legend>
            <div className="qquiz__choices">
              {COUNT_OPTIONS.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`qquiz__chip ${n === count ? "qquiz__chip--active" : ""}`}
                  onClick={() => setCount(n)}
                  aria-pressed={n === count}
                >
                  {n}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <footer className="qquiz__footer">
          <button type="button" className="qquiz__cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="qquiz__play"
            onClick={() => onStart({ flagCount: count })}
          >
            Play {count} flag{count === 1 ? "" : "s"}
          </button>
        </footer>
      </div>
    </div>
  );
}
