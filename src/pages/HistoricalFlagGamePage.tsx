import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LeaveGameDialog } from "../components/LeaveGameDialog";
import { useNavigationGuard } from "../context/NavigationGuardContext";
import { useHistoricalFlagGame } from "../hooks/useHistoricalFlagGame";
import { useLeaderboard } from "../context/LeaderboardContext";
import { useProfile } from "../context/ProfileContext";
import { profileEntryFields } from "../lib/profileLeaderboard";
import { gameAudio } from "../lib/gameAudio";
import { GameClock } from "../components/GameClock";
import { ScoreBoard } from "../components/ScoreBoard";
import { ALL_COUNTRY_OPTIONS } from "../lib/countrySelection";
import {
  HISTORICAL_ASK_HINTS,
  HISTORICAL_ASK_LABELS,
  HISTORICAL_ASK_PROMPTS,
  type HistoricalAsk,
} from "../lib/historicalQuiz";
import type { NewLeaderboardEntry } from "../lib/leaderboardStorage";
import "../App.css";

const COUNTRY_NAME = new Map(ALL_COUNTRY_OPTIONS.map((c) => [c.code, c.name]));

/**
 * The two historical decks whose answer is a ruling power or a period rather
 * than a country: "Under whose rule?" and "Date the flag".
 *
 * The prompt is always a bundled, dated, sourced historical flag image. The
 * reveal always names the flag, its years and the country it flew over — a
 * colonial-era flag shown with no attribution is exactly what the
 * National-symbols rules forbid, and it is the whole point of these two decks
 * that the attribution is the answer.
 */
export function HistoricalFlagGamePage({
  ask,
  questionCount,
}: {
  ask: HistoricalAsk;
  questionCount: number;
}) {
  const game = useHistoricalFlagGame(ask, questionCount);
  const { saveGameToLeaderboard, openLeaderboard } = useLeaderboard();
  const { activeProfile } = useProfile();
  const [playerName, setPlayerName] = useState("");
  const [saveHint, setSaveHint] = useState<"idle" | "saved" | "need-name">("idle");
  const [celebrationDismissed, setCelebrationDismissed] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const gameMode = `historical-${ask}`;

  useEffect(() => {
    if (activeProfile && !playerName) setPlayerName(activeProfile.displayName);
  }, [activeProfile, playerName]);

  const gameIsActive = game.phase === "guessing" || game.phase === "revealed";
  const { setGuard } = useNavigationGuard();
  const [pendingNavigate, setPendingNavigate] = useState<(() => void) | null>(null);
  const guardFn = useCallback((proceed: () => void) => {
    setPendingNavigate(() => proceed);
  }, []);

  useEffect(() => {
    if (gameIsActive) setGuard(guardFn);
    else setGuard(null);
    return () => setGuard(null);
  }, [gameIsActive, setGuard, guardFn]);

  useEffect(() => {
    if (!gameIsActive) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [gameIsActive]);

  useEffect(() => {
    if (game.attemptNonce === 0 || game.wasCorrect === null) return;
    if (game.wasCorrect) gameAudio.playCorrect();
    else gameAudio.playWrong();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.attemptNonce]);

  const prevPhaseRef = useRef(game.phase);
  useEffect(() => {
    if (game.phase === "finished" && prevPhaseRef.current !== "finished") {
      gameAudio.playGameComplete();
    }
    prevPhaseRef.current = game.phase;
  }, [game.phase]);

  useEffect(() => {
    if (zoomed) {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setZoomed(false);
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [zoomed]);

  const saveRun = useCallback(
    (name: string) => {
      const elapsedMs =
        game.gameStartedAtMs != null && game.gameEndedAtMs != null
          ? Math.max(0, game.gameEndedAtMs - game.gameStartedAtMs)
          : 0;
      const entry: NewLeaderboardEntry = {
        playerName: name.trim().slice(0, 48),
        score: game.score,
        correctCount: game.correctCount,
        wrongCount: game.wrongCount,
        totalAnswered: game.totalAnswered,
        totalFlags: game.totalQuestions,
        elapsedMs,
        meanAnswerMs: game.meanAnswerMs,
        // This deck is keyed by flag entry, not by country, so there is no
        // per-country result map to publish — the board shows score and time.
        countryResults: {},
        countriesPlayed: [],
        continentBreakdown: [],
        gameMode,
        ...profileEntryFields(activeProfile),
      };
      saveGameToLeaderboard(entry);
      setPlayerName(name.trim().slice(0, 48));
      setSaveHint("saved");
    },
    [game, activeProfile, saveGameToLeaderboard, gameMode],
  );

  const handleSave = () => {
    if (!playerName.trim()) {
      setSaveHint("need-name");
      return;
    }
    saveRun(playerName);
  };

  const autoSavedRef = useRef(false);
  useEffect(() => {
    if (game.phase !== "finished") {
      autoSavedRef.current = false;
      return;
    }
    if (autoSavedRef.current || !activeProfile) return;
    autoSavedRef.current = true;
    saveRun(activeProfile.displayName);
  }, [game.phase, activeProfile, saveRun]);

  const leaderboardFilter = useMemo(
    () => ({
      gameMode,
      totalFlags: game.totalQuestions,
      label: `${HISTORICAL_ASK_LABELS[ask]} · ${game.totalQuestions} flags`,
    }),
    [gameMode, ask, game.totalQuestions],
  );

  if (game.phase === "error") {
    return (
      <div className="app app--center">
        <main className="card card--error">
          <h1>{HISTORICAL_ASK_LABELS[ask]}</h1>
          <p className="error-message">{game.error ?? "Something went wrong."}</p>
          <p className="game-home-link">
            <Link to="/">← Back to home</Link>
          </p>
        </main>
      </div>
    );
  }

  const isFinished = game.phase === "finished";
  const isRevealed = game.phase === "revealed";
  const isGuessing = game.phase === "guessing";
  const current = game.current;
  const imgSrc = current ? `${import.meta.env.BASE_URL}${current.path}` : null;
  const overCountry = current ? COUNTRY_NAME.get(current.countryCode) : undefined;

  return (
    <div className="app">
      {pendingNavigate && (
        <LeaveGameDialog
          onConfirm={() => {
            pendingNavigate();
            setPendingNavigate(null);
          }}
          onCancel={() => setPendingNavigate(null)}
        />
      )}
      <GameClock
        startedAt={game.gameStartedAtMs}
        endedAt={game.gameEndedAtMs}
        meanAnswerMs={game.meanAnswerMs}
        totalAnswered={game.totalAnswered}
        totalFlags={game.totalQuestions}
      />

      <main className="card">
        <header className="card-header">
          <h1>
            {HISTORICAL_ASK_LABELS[ask]}{" "}
            <span className="card-header__chip">Flag Master</span>
          </h1>
          <p className="tagline">
            {isFinished
              ? `Game complete — ${game.totalAnswered} of ${game.totalQuestions} flags.`
              : HISTORICAL_ASK_PROMPTS[ask]}
          </p>
        </header>

        {game.phase === "loading" && (
          <div className="flag-card flag-card--placeholder" aria-busy="true">
            <div className="flag-skeleton" />
          </div>
        )}

        {!isFinished && imgSrc && (
          <button
            type="button"
            className="flag-card flag-card--content"
            onClick={() => setZoomed(true)}
            aria-label="Enlarge flag"
          >
            <img
              key={imgSrc}
              src={imgSrc}
              alt=""
              className="flag-image"
              draggable={false}
            />
            <span className="flag-card__zoom-hint" aria-hidden="true">
              ⤢ Click to enlarge
            </span>
          </button>
        )}

        {zoomed && imgSrc && (
          <div
            className="flag-zoom"
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged flag"
            onClick={() => setZoomed(false)}
          >
            <img key={imgSrc} src={imgSrc} alt="" className="flag-zoom__img" draggable={false} />
            <button
              type="button"
              className="flag-zoom__close"
              onClick={(e) => {
                e.stopPropagation();
                setZoomed(false);
              }}
              aria-label="Close enlarged flag"
            >
              ×
            </button>
          </div>
        )}

        {!isFinished && current && (
          <div className="answer-row answer-row--buttons">
            <div
              className="answer-options answer-options--size-lg"
              role="radiogroup"
              aria-label="Your answer"
            >
              <p className="answer-options__label">Your answer</p>
              <ul className="answer-options__grid">
                {game.options.map((opt) => {
                  const active = game.selected === opt;
                  return (
                    <li key={opt} className="answer-options__item">
                      <button
                        type="button"
                        role="radio"
                        aria-checked={active}
                        disabled={isRevealed}
                        className={`answer-options__btn${
                          active ? " answer-options__btn--active" : ""
                        }`}
                        onClick={() => game.setSelected(opt)}
                      >
                        <span className="answer-options__name">{opt}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
            {!isRevealed && (
              <button
                type="button"
                className="btn btn-primary answer-row__confirm"
                disabled={!game.selected || !isGuessing}
                onClick={game.confirm}
              >
                Confirm
              </button>
            )}
          </div>
        )}

        {(isRevealed || isFinished) && current && game.wasCorrect !== null && (
          <div
            className={`subdiv-game__feedback subdiv-game__feedback--${
              game.wasCorrect ? "correct" : "wrong"
            }`}
          >
            {game.wasCorrect
              ? `Correct! ${current.answer}`
              : `Not quite — the answer was ${current.answer}`}
            <span className="feedback__caption">
              {current.caption}
              {overCountry ? ` · flown over ${overCountry}` : ""}
            </span>
          </div>
        )}

        <ScoreBoard
          score={game.score}
          correctCount={game.correctCount}
          wrongCount={game.wrongCount}
          totalAnswered={game.totalAnswered}
          totalFlags={game.totalQuestions}
          continentBreakdown={[]}
        />

        {isFinished && !celebrationDismissed && (
          <div className="game-complete">
            <p className="game-complete__title">Game over!</p>
            <p className="game-complete__text">
              You placed {game.correctCount} of {game.totalQuestions} flags correctly.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setCelebrationDismissed(true)}
            >
              Continue
            </button>
          </div>
        )}

        {isFinished && celebrationDismissed && (
          <div className="post-game-leaderboard">
            {saveHint === "saved" ? (
              <>
                <p className="post-game-leaderboard__feedback" role="status">
                  ✓ Saved to the leaderboard as <strong>{playerName}</strong>.
                </p>
                <div className="post-game-leaderboard__actions">
                  <button
                    type="button"
                    className="btn btn-leaderboard"
                    onClick={() => openLeaderboard(leaderboardFilter)}
                  >
                    View leaderboard
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="post-game-leaderboard__prompt">
                  Enter your name to save this run to the leaderboard.
                </p>
                <div className="post-game-leaderboard__row">
                  <label className="visually-hidden" htmlFor="historical-leaderboard-name">
                    Your name
                  </label>
                  <input
                    id="historical-leaderboard-name"
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
                    onClick={handleSave}
                  >
                    Save to leaderboard
                  </button>
                </div>
                {saveHint === "need-name" && (
                  <p className="post-game-leaderboard__feedback post-game-leaderboard__feedback--warn">
                    Please enter a name before saving.
                  </p>
                )}
              </>
            )}
          </div>
        )}

        {isFinished && (
          <section className="historical-results">
            <h3 className="results-flags__column-title">Every flag in this run</h3>
            <ul className="historical-results__list">
              {game.deck.map((q) => {
                const outcome = game.results[q.id];
                const src = `${import.meta.env.BASE_URL}${q.path}`;
                return (
                  <li
                    key={q.id}
                    className={`historical-results__item${
                      outcome ? ` historical-results__item--${outcome}` : ""
                    }`}
                  >
                    <img
                      key={src}
                      src={src}
                      alt=""
                      className="historical-results__flag"
                      draggable={false}
                    />
                    <div className="historical-results__text">
                      <b>{q.answer}</b>
                      <small>
                        {q.caption}
                        {COUNTRY_NAME.get(q.countryCode)
                          ? ` · ${COUNTRY_NAME.get(q.countryCode)}`
                          : ""}
                      </small>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {!isFinished && game.phase !== "loading" && (
          <div className="end-game">
            <button type="button" className="btn btn-end-game" onClick={game.endGameEarly}>
              End game
            </button>
          </div>
        )}

        {!isFinished && (
          <p className="tagline historical-hint">{HISTORICAL_ASK_HINTS[ask]}</p>
        )}
      </main>
    </div>
  );
}
