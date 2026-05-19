import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SITE_TOPBAR_SLOT_ID } from "./Topbar";

type Props = {
  startedAt: number | null;
  /** When set, elapsed time is frozen at (endedAt - startedAt). */
  endedAt: number | null;
  meanAnswerMs: number | null;
};

function formatElapsed(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Renders the game timer into the site-wide sticky topbar via a React
 * portal. The portal target (#site-topbar-slot) is provided by Topbar;
 * if the topbar hasn't mounted yet, we render nothing and try again on
 * the next render. The previous floating top-right widget was removed
 * because it overlapped the new sticky topbar.
 *
 * The render is intentionally compact — Elapsed and Avg. side by side
 * on a single row so the clock fits next to the topbar's home link +
 * theme toggle without crowding them.
 */
export function GameClock({ startedAt, endedAt, meanAnswerMs }: Props) {
  const [, setTick] = useState(0);
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setSlot(document.getElementById(SITE_TOPBAR_SLOT_ID));
  }, []);

  useEffect(() => {
    if (startedAt == null || endedAt != null) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 250);
    return () => window.clearInterval(id);
  }, [startedAt, endedAt]);

  if (startedAt == null || !slot) {
    return null;
  }

  const elapsedMs =
    endedAt != null ? endedAt - startedAt : Date.now() - startedAt;

  const content = (
    <div className="game-clock" role="timer" aria-live="polite">
      <div className="game-clock__elapsed">
        <span className="game-clock__label">Elapsed</span>
        <span className="game-clock__value">{formatElapsed(elapsedMs)}</span>
      </div>
      <div className="game-clock__avg">
        <span className="game-clock__label">Avg / answer</span>
        <span className="game-clock__value game-clock__value--secondary">
          {meanAnswerMs != null
            ? `${(meanAnswerMs / 1000).toFixed(1)} s`
            : "—"}
        </span>
      </div>
    </div>
  );

  return createPortal(content, slot);
}
