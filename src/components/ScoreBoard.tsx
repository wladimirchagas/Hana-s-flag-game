import type { Continent } from "../api/countries";

type Props = {
  score: number;
  correctCount: number;
  wrongCount: number;
  totalAnswered: number;
  totalFlags: number;
  continentBreakdown: Array<{
    continent: Continent;
    countriesInContinent: number;
    correct: number;
    wrong: number;
    total: number;
    correctPct: number;
    wrongPct: number;
  }>;
};

function asPercent(part: number, total: number): string {
  if (total <= 0) return "0%";
  return `${Math.round((part / total) * 100)}%`;
}

function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function ScoreBoard({
  score,
  correctCount,
  wrongCount,
  totalAnswered,
  totalFlags,
  continentBreakdown,
}: Props) {
  return (
    <div className="score-board" role="status" aria-live="polite">
      <div className="score-board-overall">
        <span className="score-board-label">Score</span>
        <span className="score-board-value">{score}</span>
      </div>

      <div className="score-board-totals" aria-label="Overall score totals">
        <p className="score-board-stat score-board-stat--correct">
          Correct: {correctCount} ({asPercent(correctCount, totalAnswered)})
        </p>
        <p className="score-board-stat score-board-stat--wrong">
          Wrong: {wrongCount} ({asPercent(wrongCount, totalAnswered)})
        </p>
        <p className="score-board-stat">
          Answered: {totalAnswered}/{totalFlags}
        </p>
      </div>

      {continentBreakdown.length > 0 && (
        <div className="score-board-continent" aria-label="Continent breakdown">
          <p className="score-board-continent-title">By continent (UN)</p>
          {continentBreakdown.map((item) => (
            <p key={item.continent} className="score-board-continent-row">
              <span className="score-board-continent-name">
                {item.continent} ({item.countriesInContinent})
              </span>{" "}
              <span className="score-board-continent-correct">
                Right {item.correct} ({formatPercent(item.correctPct)})
              </span>{" "}
              <span className="score-board-continent-wrong">
                Wrong {item.wrong} ({formatPercent(item.wrongPct)})
              </span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
