import { useEffect, useRef } from "react";

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
};

export function LeaveGameDialog({ onConfirm, onCancel }: Props) {
  const stayRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    stayRef.current?.focus({ preventScroll: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onCancel]);

  return (
    <div
      className="leave-game-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="leave-game-title"
      onClick={onCancel}
    >
      <div
        className="leave-game-dialog__panel"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="leave-game-title" className="leave-game-dialog__title">
          Leave game?
        </h2>
        <p className="leave-game-dialog__body">
          Your progress will be lost if you leave now.
        </p>
        <div className="leave-game-dialog__actions">
          <button
            ref={stayRef}
            type="button"
            className="btn leave-game-dialog__stay"
            onClick={onCancel}
          >
            Keep playing
          </button>
          <button
            type="button"
            className="btn leave-game-dialog__leave"
            onClick={onConfirm}
          >
            Leave game
          </button>
        </div>
      </div>
    </div>
  );
}
