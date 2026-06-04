import { useEffect, useState } from "react";
import { HeroCutIn } from "./HeroCharacters";

const RIGHT_MESSAGES = ["Yes!", "Awesome!", "Nailed it!", "Brilliant!", "Spot on!"];
const WRONG_MESSAGES = ["Try again!", "Almost!", "Keep going!", "So close!", "You got this!"];

const RIGHT_EMOJIS = ["🎉", "⭐", "✨", "🌟", "🎊", "🥳"];
const WRONG_EMOJIS = ["🤔", "💭", "🧐", "💪"];

function pick<T>(arr: readonly T[], seed: number): T {
  return arr[seed % arr.length]!;
}

type Props = {
  /** Increments on every confirm; used as a React key to retrigger animation. */
  nonce: number;
  wasCorrect: boolean | null;
  /** Only animate when retry mode is active (Custom Game). */
  active: boolean;
  /**
   * When provided and wasCorrect is false, show the correct flag + name
   * instead of a generic "Try again!" message (Quick Quiz / Flag Master).
   * Omit or pass null to keep the encouragement message (Hana's Game).
   */
  correctCountry?: { name: string; flagSvg: string } | null;
};

export function AnswerBurst({ nonce, wasCorrect, active, correctCountry }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active || nonce === 0 || wasCorrect === null) return;
    setVisible(true);
    // Long enough for a 7-year-old to read the message comfortably.
    const lifetime = wasCorrect ? 3200 : 2800;
    const t = window.setTimeout(() => setVisible(false), lifetime);
    return () => window.clearTimeout(t);
  }, [nonce, wasCorrect, active]);

  if (!active || !visible || wasCorrect === null) return null;

  // Quick Quiz / Flag Master: reveal the correct flag + name on a wrong guess.
  if (!wasCorrect && correctCountry != null) {
    return (
      <div
        key={nonce}
        className="burst burst--reveal"
        role="status"
        aria-live="polite"
      >
        <div className="burst__panel">
          <div className="burst__reveal-badge">✗ Wrong</div>
          <p className="burst__reveal-label">The answer was…</p>
          <img
            className="burst__reveal-flag"
            src={correctCountry.flagSvg}
            alt={`Flag of ${correctCountry.name}`}
          />
          <p className="burst__reveal-name">{correctCountry.name}</p>
        </div>
        <HeroCutIn variant="boy" side="right" />
      </div>
    );
  }

  const variant = wasCorrect ? "right" : "wrong";
  const message = pick(
    wasCorrect ? RIGHT_MESSAGES : WRONG_MESSAGES,
    nonce,
  );
  const emojis = wasCorrect ? RIGHT_EMOJIS : WRONG_EMOJIS;

  return (
    <div
      key={nonce}
      className={`burst burst--${variant}`}
      role="status"
      aria-live="polite"
    >
      {/* Right answer: both characters frame the celebration.
          Wrong answer: only the boy peeks in (lighter, more encouraging pose). */}
      {wasCorrect && <HeroCutIn variant="woman" side="left" />}
      <div className="burst__panel">
        <span className="burst__emoji burst__emoji--main" aria-hidden="true">
          {wasCorrect ? "🎉" : "🤔"}
        </span>
        <span className="burst__text">{message}</span>
      </div>
      <HeroCutIn variant="boy" side="right" />
      {wasCorrect && (
        <div className="burst__confetti" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="burst__confetti-piece"
              style={{
                ["--i" as string]: i,
                ["--x" as string]: `${(i * 73) % 100 - 50}%`,
                ["--delay" as string]: `${(i % 5) * 60}ms`,
                ["--emoji" as string]: `"${emojis[i % emojis.length]}"`,
              }}
            >
              {emojis[i % emojis.length]}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
