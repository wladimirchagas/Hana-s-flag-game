type Props = {
  phase: "guessing" | "revealed";
  current: { name: string } | null;
  wasCorrect: boolean | null;
};

export function Feedback({ phase, current, wasCorrect }: Props) {
  if (phase !== "revealed" || wasCorrect === null || !current) {
    return null;
  }

  if (wasCorrect) {
    return (
      <p className="feedback feedback--correct" role="status">
        Correct! +1 point
      </p>
    );
  }

  return (
    <p className="feedback feedback--wrong" role="status">
      Wrong — it was <strong>{current.name}</strong>. −1 point
    </p>
  );
}
