import { useEffect, useState } from "react";

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

export function GameClock({ startedAt, endedAt, meanAnswerMs }: Props) {
  const [, setTick] = useState(0);

  useEffect(() => {
    if (startedAt == null || endedAt != null) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 250);
    return () => window.clearInterval(id);
  }, [startedAt, endedAt]);

  if (startedAt == null) {
    return null;
  }

  const elapsedMs =
    endedAt != null ? endedAt - startedAt : Date.now() - startedAt;

  return (
    <div className="game-clock" role="timer" aria-live="polite">
      <div className="game-clock__elapsed">
        <span className="game-clock__label">Elapsed</span>
        <span className="game-clock__value">{formatElapsed(elapsedMs)}</span>
      </div>
      <div className="game-clock__avg">
        <span className="game-clock__label">Avg. per answer</span>
        <span className="game-clock__value game-clock__value--secondary">
          {meanAnswerMs != null
            ? `${(meanAnswerMs / 1000).toFixed(1)} s`
            : "—"}
        </span>
      </div>
    </div>
  );
}
