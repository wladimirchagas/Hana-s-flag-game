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
};

export function AnswerBurst({ nonce, wasCorrect, active }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active || nonce === 0 || wasCorrect === null) return;
    setVisible(true);
    const lifetime = wasCorrect ? 1600 : 1200;
    const t = window.setTimeout(() => setVisible(false), lifetime);
    return () => window.clearTimeout(t);
  }, [nonce, wasCorrect, active]);

  if (!active || !visible || wasCorrect === null) return null;

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
