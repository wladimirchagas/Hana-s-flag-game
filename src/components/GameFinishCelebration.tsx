import { useEffect, useRef } from "react";
import { HeroCutIn } from "./HeroCharacters";

const EMOJIS = ["🎉", "⭐", "✨", "🌟", "🎊", "🥳", "🎈", "🏆"] as const;

function formatElapsed(ms: number | null): string {
  if (ms == null) return "—";
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export type GameFinishCelebrationProps = {
  score: number;
  correctCount: number;
  wrongCount: number;
  totalAnswered: number;
  totalFlags: number;
  playedAllFlags: boolean;
  elapsedMs: number | null;
  onContinue: () => void;
};

export function GameFinishCelebration({
  score,
  correctCount,
  totalAnswered,
  totalFlags,
  playedAllFlags,
  elapsedMs,
  onContinue,
}: GameFinishCelebrationProps) {
  const continueRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") onContinue();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => continueRef.current?.focus(), 50);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
    };
  }, [onContinue]);

  const accuracy =
    totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  return (
    <div
      className="finish"
      role="dialog"
      aria-modal="true"
      aria-labelledby="finish-title"
    >
      <div className="finish__confetti" aria-hidden="true">
        {Array.from({ length: 48 }).map((_, i) => (
          <span
            key={i}
            className="finish__confetti-piece"
            style={{
              ["--x" as string]: `${(i * 13) % 100}%`,
              ["--delay" as string]: `${(i * 70) % 2200}ms`,
              ["--duration" as string]: `${3 + (i % 5) * 0.4}s`,
              ["--size" as string]: `${1.2 + ((i * 7) % 5) * 0.3}rem`,
            }}
          >
            {EMOJIS[i % EMOJIS.length]}
          </span>
        ))}
      </div>

      <div className="finish__row">
        <HeroCutIn variant="woman" side="left" />

        <div className="finish__panel">
          <h2 id="finish-title" className="finish__title">
            <span className="finish__title-em finish__title-em--a">YOU</span>{" "}
            <span className="finish__title-em finish__title-em--b">DID</span>{" "}
            <span className="finish__title-em finish__title-em--c">IT!</span>
          </h2>
          <p className="finish__subtitle">
            {playedAllFlags
              ? `You played every flag — all ${totalFlags} of them! 🌍`
              : `Great run — ${totalAnswered} of ${totalFlags} flags!`}
          </p>

          <div className="finish__stats">
            <div className="finish__stat finish__stat--score">
              <span className="finish__stat-label">Final score</span>
              <span className="finish__stat-value">{score}</span>
            </div>
            <div className="finish__stat">
              <span className="finish__stat-label">Correct</span>
              <span className="finish__stat-value">{correctCount}</span>
            </div>
            <div className="finish__stat">
              <span className="finish__stat-label">Accuracy</span>
              <span className="finish__stat-value">{accuracy}%</span>
            </div>
            <div className="finish__stat">
              <span className="finish__stat-label">Time</span>
              <span className="finish__stat-value">
                {formatElapsed(elapsedMs)}
              </span>
            </div>
          </div>

          <button
            ref={continueRef}
            type="button"
            className="finish__continue"
            onClick={onContinue}
          >
            See your results →
          </button>
        </div>

        <HeroCutIn variant="boy" side="right" />
      </div>
    </div>
  );
}
