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
  playerName: string;
  onPlayerNameChange: (name: string) => void;
  saveHint: "idle" | "saved" | "need-name";
  onSave: () => void;
  onContinue: () => void;
  /**
   * Invoked when the player accepts the daily learn-a-new-flag offer.
   * When provided, the celebration shows the offer CTA. The parent gates
   * presence to "first Hana's Game completion of today" — see
   * `shouldOfferDailyUnlock` in lib/learnedFlags.
   */
  onUnlockFlag?: () => void;
  /**
   * Hana's Game only: when provided, the celebration shows a "Play again"
   * button that restarts the run with the same flag pool. Other game modes
   * (Quick Quiz, Flag Master, group games) leave this undefined.
   */
  onPlayAgain?: () => void;
};

export function GameFinishCelebration({
  score,
  correctCount,
  totalAnswered,
  totalFlags,
  playedAllFlags,
  elapsedMs,
  playerName,
  onPlayerNameChange,
  saveHint,
  onSave,
  onContinue,
  onUnlockFlag,
  onPlayAgain,
}: GameFinishCelebrationProps) {
  const canUnlock = typeof onUnlockFlag === "function";
  const saveRef = useRef<HTMLButtonElement>(null);
  const onContinueRef = useRef(onContinue);
  useEffect(() => {
    onContinueRef.current = onContinue;
  }, [onContinue]);

  // Mount-only: lock body scroll, focus the Save button once, and bind the
  // Escape-to-dismiss listener. Splitting this from any prop dependency keeps
  // the setTimeout from re-firing on every parent render — otherwise typing
  // in the name input below would steal focus 50ms after each keystroke and
  // (on mobile) cause the next character to replace the field instead of
  // appending to it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onContinueRef.current();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => saveRef.current?.focus(), 50);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
    };
  }, []);

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

          {canUnlock && (
            <div className="finish__unlock">
              <p className="finish__unlock-blurb">
                Nice work finishing today&rsquo;s game! 🌟 You&rsquo;ve
                earned today&rsquo;s flag unlock — want to learn a brand new
                one?
              </p>
              <button
                type="button"
                className="finish__unlock-btn"
                onClick={onUnlockFlag}
              >
                Ready to learn a new flag? 🌍
              </button>
            </div>
          )}

          {saveHint === "saved" ? (
            <div className="finish__save-actions">
              <p className="finish__save-feedback finish__save-feedback--ok">
                ✓ Saved to leaderboard!
              </p>
              <button
                type="button"
                className="finish__continue"
                onClick={onContinue}
              >
                See your results →
              </button>
              {onPlayAgain && (
                <button
                  type="button"
                  className="finish__play-again"
                  onClick={onPlayAgain}
                >
                  Play again 🔄
                </button>
              )}
            </div>
          ) : (
            <div className="finish__save-actions">
              <div className="finish__save-form">
                <label className="visually-hidden" htmlFor="finish-player-name">
                  Your name
                </label>
                <input
                  id="finish-player-name"
                  type="text"
                  className="finish__name-input"
                  placeholder="Your name"
                  maxLength={48}
                  value={playerName}
                  autoComplete="nickname"
                  onChange={(e) => onPlayerNameChange(e.target.value)}
                />
                <button
                  ref={saveRef}
                  type="button"
                  className="finish__continue"
                  onClick={onSave}
                >
                  Save to leaderboard 🏆
                </button>
              </div>
              {saveHint === "need-name" && (
                <p className="finish__save-feedback finish__save-feedback--warn">
                  Enter your name first!
                </p>
              )}
              <button
                type="button"
                className="finish__skip"
                onClick={onContinue}
              >
                See results first →
              </button>
              {onPlayAgain && (
                <button
                  type="button"
                  className="finish__play-again"
                  onClick={onPlayAgain}
                >
                  Play again 🔄
                </button>
              )}
            </div>
          )}
        </div>

        <HeroCutIn variant="boy" side="right" />
      </div>
    </div>
  );
}
