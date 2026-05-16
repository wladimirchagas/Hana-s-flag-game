import { useEffect, useRef, useState } from "react";
import {
  DIFFICULTY_CONFIG,
  codesForDifficulty,
  type Difficulty,
} from "../lib/flagDifficulty";

export type QuickQuizConfig = {
  flagCount: number;
  difficulty: Difficulty;
};

export type QuickQuizSetupModalProps = {
  open: boolean;
  onClose: () => void;
  onStart: (config: QuickQuizConfig) => void;
};

const COUNT_OPTIONS: readonly number[] = [10, 20, 30];
const DIFFICULTY_OPTIONS: readonly Difficulty[] = ["easy", "moderate", "hard"];

export function QuickQuizSetupModal({
  open,
  onClose,
  onStart,
}: QuickQuizSetupModalProps) {
  const [count, setCount] = useState<number>(20);
  const [difficulty, setDifficulty] = useState<Difficulty>("moderate");
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

  const bucketSize = codesForDifficulty(difficulty).length;
  const effectiveCount = Math.min(count, bucketSize);
  const cfg = DIFFICULTY_CONFIG[difficulty];

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
              Pick how many flags you want, and how hard you want it.
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
            <legend className="qquiz__legend">How many flags?</legend>
            <div className="qquiz__choices">
              {COUNT_OPTIONS.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`qquiz__chip ${
                    n === count ? "qquiz__chip--active" : ""
                  }`}
                  onClick={() => setCount(n)}
                  aria-pressed={n === count}
                >
                  {n}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="qquiz__group">
            <legend className="qquiz__legend">How hard?</legend>
            <div className="qquiz__choices qquiz__choices--difficulty">
              {DIFFICULTY_OPTIONS.map((d) => {
                const dcfg = DIFFICULTY_CONFIG[d];
                return (
                  <button
                    key={d}
                    type="button"
                    className={`qquiz__diff qquiz__diff--${d} ${
                      d === difficulty ? "qquiz__diff--active" : ""
                    }`}
                    onClick={() => setDifficulty(d)}
                    aria-pressed={d === difficulty}
                  >
                    <span className="qquiz__diff-label">{dcfg.label}</span>
                    <span className="qquiz__diff-tagline">{dcfg.tagline}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {effectiveCount < count && (
            <p className="qquiz__warning">
              Only {bucketSize} flags are classified as {cfg.label.toLowerCase()};
              the game will use all {bucketSize}.
            </p>
          )}
        </div>

        <footer className="qquiz__footer">
          <button
            type="button"
            className="qquiz__cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="qquiz__play"
            onClick={() => onStart({ flagCount: effectiveCount, difficulty })}
          >
            Play {effectiveCount} {cfg.label} flag{effectiveCount === 1 ? "" : "s"}
          </button>
        </footer>
      </div>
    </div>
  );
}
