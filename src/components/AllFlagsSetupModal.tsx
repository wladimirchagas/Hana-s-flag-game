import { useEffect, useRef } from "react";

export type AllFlagsMode = "all195";

export type AllFlagsSetupModalProps = {
  open: boolean;
  onClose: () => void;
  onStart: (mode: AllFlagsMode) => void;
};

type ModeOption = {
  id: AllFlagsMode;
  emoji: string;
  title: string;
  desc: string;
  ctaColor: string;
};

const MODES: ModeOption[] = [
  {
    id: "all195",
    emoji: "🌍",
    title: "All 195 Flags",
    desc: "The full set in random order. One guess per flag — no retries, no mercy.",
    ctaColor: "lime",
  },
];

export function AllFlagsSetupModal({
  open,
  onClose,
  onStart,
}: AllFlagsSetupModalProps) {
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
      className="all195-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="all195-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="all195">
        <header className="all195__header">
          <div>
            <h2 id="all195-title" className="all195__title">
              Ultimate Challenge
            </h2>
            <p className="all195__hint">Choose your hard mode.</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="all195__close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        <div className="all195__body">
          {MODES.map((mode) => (
            <button
              key={mode.id}
              type="button"
              className="all195__option"
              onClick={() => onStart(mode.id)}
            >
              <span className="all195__option-emoji" aria-hidden="true">
                {mode.emoji}
              </span>
              <span className="all195__option-text">
                <span className="all195__option-title">{mode.title}</span>
                <span className="all195__option-desc">{mode.desc}</span>
              </span>
              <span
                className={`all195__option-cta all195__option-cta--${mode.ctaColor}`}
                aria-hidden="true"
              >
                PLAY →
              </span>
            </button>
          ))}
        </div>

        <footer className="all195__footer">
          <button type="button" className="all195__cancel" onClick={onClose}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}
