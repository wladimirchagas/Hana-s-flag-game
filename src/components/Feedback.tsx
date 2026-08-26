type Props = {
  phase: "guessing" | "revealed";
  current: { name: string; symbolCaption?: string } | null;
  wasCorrect: boolean | null;
};

export function Feedback({ phase, current, wasCorrect }: Props) {
  if (phase !== "revealed" || wasCorrect === null || !current) {
    return null;
  }

  // A symbol question reveals WHAT it showed as well as whose it was — the
  // sourced name, dates and (for a flag the country did not choose) its
  // attribution: "under the United Kingdom", "imposed by the Soviet Union".
  // Shown on a right answer too, because that line is the teaching.
  const caption = current.symbolCaption ? (
    <span className="feedback__caption">{current.symbolCaption}</span>
  ) : null;

  if (wasCorrect) {
    return (
      <p className="feedback feedback--correct" role="status">
        Correct! +1 point
        {caption}
      </p>
    );
  }

  return (
    <p className="feedback feedback--wrong" role="status">
      Not quite — the correct answer was <strong>{current.name}</strong>. −1 point
      {caption}
    </p>
  );
}
