import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGame } from "../hooks/useGame";
import { useLeaderboard } from "../context/LeaderboardContext";
import { buildLeaderboardEntryFromGame } from "../lib/buildLeaderboardEntryFromGame";
import { FlagCard } from "../components/FlagCard";
import { CountryDropdown } from "../components/CountryDropdown";
import { ScoreBoard } from "../components/ScoreBoard";
import { Feedback } from "../components/Feedback";
import { WorldProgressMap } from "../components/WorldProgressMap";
import { GameClock } from "../components/GameClock";
import { GameResultsFlags } from "../components/GameResultsFlags";
import { ThemeToggle } from "../components/ThemeToggle";
import { AnswerBurst } from "../components/AnswerBurst";
import { GameFinishCelebration } from "../components/GameFinishCelebration";
import "../App.css";

export default function FlagGamePage() {
  const location = useLocation();
  const navState = location.state as { codes?: string[] } | null;
  const filterCodes =
    Array.isArray(navState?.codes) && navState!.codes!.length > 0
      ? navState!.codes!
      : null;
  const isCustomGame = filterCodes !== null;
  const game = useGame({ filterCodes, allowRetry: isCustomGame });
  const { saveGameToLeaderboard, openLeaderboard } = useLeaderboard();
  const [playerName, setPlayerName] = useState("");
  const [saveHint, setSaveHint] = useState<"idle" | "saved" | "need-name">(
    "idle"
  );

  // Show the big finish celebration overlay when the game ends, until the
  // player dismisses it. Reset if the player somehow ends up back in the
  // guessing phase (defensive — current code paths don't do that).
  const [celebrationDismissed, setCelebrationDismissed] = useState(false);
  useEffect(() => {
    if (game.phase !== "finished") setCelebrationDismissed(false);
  }, [game.phase]);

  // Build the code→name map and the set of clickable codes once whenever
  // game.countries changes (after the API fetch, or after Custom-Game filter).
  const countryCodes = useMemo(
    () => new Set(game.countries.map((c) => c.code)),
    [game.countries],
  );
  const countryNames = useMemo(
    () => new Map(game.countries.map((c) => [c.code, c.name])),
    [game.countries],
  );
  const codeToCountry = useMemo(
    () => new Map(game.countries.map((c) => [c.code, c])),
    [game.countries],
  );

  if (game.phase === "error") {
    return (
      <div className="app app--center">
        <ScoreBoard
          score={game.score}
          correctCount={game.correctCount}
          wrongCount={game.wrongCount}
          totalAnswered={game.totalAnswered}
          totalFlags={game.totalFlags}
          continentBreakdown={game.continentBreakdown}
        />
        <main className="card card--error">
          <h1>Guess the Flag</h1>
          <p className="error-message">{game.error ?? "Something went wrong."}</p>
          <p className="hint">Check your connection and refresh the page.</p>
          <p className="game-home-link">
            <Link to="/">← Back to home</Link>
          </p>
        </main>
      </div>
    );
  }

  const isRevealed = game.phase === "revealed";
  const isFinished = game.phase === "finished";
  const playedAllFlags =
    isFinished && game.totalAnswered >= game.totalFlags;
  const feedbackPhase: "guessing" | "revealed" =
    game.phase === "guessing" ? "guessing" : "revealed";
  const primaryDisabled =
    game.phase === "loading" ||
    game.phase === "finished" ||
    (game.phase === "guessing" && !game.selected);

  const elapsedMs =
    game.gameStartedAtMs != null && game.gameEndedAtMs != null
      ? game.gameEndedAtMs - game.gameStartedAtMs
      : null;

  return (
    <div className="app">
      {isFinished && !celebrationDismissed && (
        <GameFinishCelebration
          score={game.score}
          correctCount={game.correctCount}
          wrongCount={game.wrongCount}
          totalAnswered={game.totalAnswered}
          totalFlags={game.totalFlags}
          playedAllFlags={playedAllFlags}
          elapsedMs={elapsedMs}
          onContinue={() => setCelebrationDismissed(true)}
        />
      )}
      <AnswerBurst
        nonce={game.attemptNonce}
        wasCorrect={game.wasCorrect}
        active={isCustomGame}
      />
      <GameClock
        startedAt={game.gameStartedAtMs}
        endedAt={game.gameEndedAtMs}
        meanAnswerMs={game.meanAnswerMs}
      />
      <div className="game-nav">
        <Link className="game-nav__home" to="/">
          ← Home
        </Link>
        <ThemeToggle />
      </div>
      <main className="card">
        <header className="card-header">
          <h1>Guess the Flag {isCustomGame && <span className="card-header__chip">Custom</span>}</h1>
          <p className="tagline">
            {isFinished
              ? playedAllFlags
                ? "All flags played. Game complete."
                : "Game ended early."
              : isCustomGame
              ? game.retryAttempts > 0
                ? `Try again — keep going until you get it right!`
                : "Pick the country, then confirm. You can keep trying until you nail it."
              : "Pick the country, then confirm your answer."}
          </p>
        </header>

        <FlagCard country={game.current} phase={game.phase} />

        <CountryDropdown
          countries={game.countries}
          value={game.selected}
          onChange={game.setSelected}
          disabled={isRevealed || isFinished || game.phase === "loading"}
          label="Your answer"
        />

        {!isFinished && (
          <div className="actions">
            {!isRevealed ? (
              <button
                type="button"
                className="btn btn-primary"
                disabled={primaryDisabled}
                onClick={game.confirm}
              >
                Confirm
              </button>
            ) : null}
          </div>
        )}

        {game.phase !== "loading" && (
          <Feedback
            phase={feedbackPhase}
            current={game.current}
            wasCorrect={game.wasCorrect}
          />
        )}

        <WorldProgressMap
          countryResults={game.countryResults}
          selectedCode={game.selected?.code ?? null}
          disabled={game.phase !== "guessing"}
          selectable={{
            codes: countryCodes,
            names: countryNames,
            onSelect: (code) => {
              const country = codeToCountry.get(code);
              if (country) game.setSelected(country);
            },
            onConfirm: game.confirm,
          }}
        />

        <ScoreBoard
          score={game.score}
          correctCount={game.correctCount}
          wrongCount={game.wrongCount}
          totalAnswered={game.totalAnswered}
          totalFlags={game.totalFlags}
          continentBreakdown={game.continentBreakdown}
        />

        {isFinished && (
          <GameResultsFlags
            countries={game.countries}
            countryResults={game.countryResults}
          />
        )}

        {isFinished && (
          <div className="game-complete">
            <p className="game-complete__title">Game over</p>
            <p className="game-complete__text">
              {playedAllFlags
                ? `You answered all ${game.totalFlags} flags in this run.`
                : `You ended the game after ${game.totalAnswered} of ${game.totalFlags} flags.`}
            </p>
          </div>
        )}

        {isFinished && (
          <div className="post-game-leaderboard">
            <p className="post-game-leaderboard__prompt">
              Enter your name to save this run to the leaderboard (stored on this
              device).
            </p>
            <div className="post-game-leaderboard__row">
              <label className="visually-hidden" htmlFor="leaderboard-name">
                Your name
              </label>
              <input
                id="leaderboard-name"
                type="text"
                className="post-game-leaderboard__input"
                placeholder="Your name"
                maxLength={48}
                value={playerName}
                autoComplete="nickname"
                onChange={(e) => {
                  setPlayerName(e.target.value);
                  setSaveHint("idle");
                }}
              />
              <button
                type="button"
                className="btn btn-primary post-game-leaderboard__save"
                disabled={!playerName.trim()}
                onClick={() => {
                  if (!playerName.trim()) {
                    setSaveHint("need-name");
                    return;
                  }
                  saveGameToLeaderboard(
                    buildLeaderboardEntryFromGame(game, playerName)
                  );
                  setSaveHint("saved");
                }}
              >
                Save to leaderboard
              </button>
            </div>
            {saveHint === "saved" && (
              <p className="post-game-leaderboard__feedback" role="status">
                Saved. Open the leaderboard to see your run in the list.
              </p>
            )}
            {saveHint === "need-name" && (
              <p className="post-game-leaderboard__feedback post-game-leaderboard__feedback--warn">
                Please enter a name before saving.
              </p>
            )}
            <div className="post-game-leaderboard__actions">
              <button
                type="button"
                className="btn btn-leaderboard"
                onClick={openLeaderboard}
              >
                Leaderboard
              </button>
            </div>
          </div>
        )}

        {!isFinished && game.phase !== "loading" && (
          <div className="end-game">
            <button
              type="button"
              className="btn btn-end-game"
              onClick={game.endGameEarly}
            >
              End game
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
