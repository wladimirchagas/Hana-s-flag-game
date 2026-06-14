import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LeaveGameDialog } from "../components/LeaveGameDialog";
import { useNavigationGuard } from "../context/NavigationGuardContext";
import { useDisputedTerritoriesGame } from "../hooks/useDisputedTerritoriesGame";
import { useLeaderboard } from "../context/LeaderboardContext";
import { SubdivisionResultsFlags } from "../components/SubdivisionResultsFlags";
import { subdivisionFlagUrl } from "../api/subdivisions";
import { gameAudio } from "../lib/gameAudio";
import { AnswerBurst } from "../components/AnswerBurst";
import { GameClock } from "../components/GameClock";
import { ScoreBoard } from "../components/ScoreBoard";
import { SubdivisionDropdown } from "../components/SubdivisionDropdown";
import type { NewLeaderboardEntry } from "../lib/leaderboardStorage";
import "../App.css";

const GAME_MODE = "disputed-territories";

/** Inline flag card — same UX as SubnationalGamePage. */
function DisputedFlagCard({
  flagUrl,
  typeLabel,
}: {
  flagUrl: string;
  typeLabel: string;
}) {
  const [zoomed, setZoomed] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [zoomed]);

  useEffect(() => {
    setImgError(false);
  }, [flagUrl]);

  if (imgError) {
    return (
      <div className="flag-card flag-card--placeholder">
        <p style={{ color: "var(--ink-soft)", fontStyle: "italic", fontSize: "0.9rem" }}>
          Flag image unavailable
        </p>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        className="flag-card flag-card--content"
        onClick={() => setZoomed(true)}
        aria-label={`Enlarge ${typeLabel} flag`}
      >
        <img
          src={flagUrl}
          alt=""
          className="flag-image"
          draggable={false}
          onError={() => setImgError(true)}
        />
        <span className="flag-card__zoom-hint" aria-hidden="true">⤢ Click to enlarge</span>
      </button>
      {zoomed && (
        <div
          className="flag-zoom"
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged ${typeLabel} flag`}
          onClick={() => setZoomed(false)}
        >
          <img src={flagUrl} alt="" className="flag-zoom__img" draggable={false} />
          <button
            type="button"
            className="flag-zoom__close"
            onClick={(e) => { e.stopPropagation(); setZoomed(false); }}
            aria-label="Close enlarged flag"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}

export function DisputedTerritoriesGamePage() {
  const game = useDisputedTerritoriesGame();
  const { saveGameToLeaderboard, openLeaderboard } = useLeaderboard();
  const [playerName, setPlayerName] = useState("");
  const [saveHint, setSaveHint] = useState<"idle" | "saved" | "need-name">("idle");
  const [celebrationDismissed, setCelebrationDismissed] = useState(false);

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
    if (game.phase !== "finished") {
      setCelebrationDismissed(false);
      setSaveHint("idle");
      setPlayerName("");
    }
  }, [game.phase]);

  const currentCode = game.current?.code;
  useEffect(() => {
    if (currentCode) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentCode]);

  function handleSave() {
    if (!playerName.trim()) {
      setSaveHint("need-name");
      return;
    }
    const elapsedMs =
      game.gameStartedAtMs != null && game.gameEndedAtMs != null
        ? Math.max(0, game.gameEndedAtMs - game.gameStartedAtMs)
        : 0;
    const entry: NewLeaderboardEntry = {
      playerName: playerName.trim().slice(0, 48),
      score: game.score,
      correctCount: game.correctCount,
      wrongCount: game.wrongCount,
      totalAnswered: game.totalAnswered,
      totalFlags: game.totalDivisions,
      elapsedMs,
      meanAnswerMs: game.meanAnswerMs,
      countryResults: { ...game.divisionResults },
      countriesPlayed: [],
      continentBreakdown: [],
      gameMode: GAME_MODE,
    };
    saveGameToLeaderboard(entry);
    setSaveHint("saved");
  }

  const leaderboardFilter = useMemo(() => ({
    gameMode: GAME_MODE,
    totalFlags: game.totalDivisions,
    label: `Disputed & Claimed Territories · ${game.totalDivisions} flags`,
  }), [game.totalDivisions]);

  if (game.phase === "error") {
    return (
      <div className="app app--center">
        <main className="card card--error">
          <h1>Disputed &amp; Claimed Territories</h1>
          <p className="error-message">{game.error ?? "Something went wrong."}</p>
          <p className="game-home-link">
            <Link to="/">← Back to home</Link>
          </p>
        </main>
      </div>
    );
  }

  const isFinished = game.phase === "finished";
  const isGuessing = game.phase === "guessing";
  const isRevealed = game.phase === "revealed";

  const currentFlagUrl = game.current ? subdivisionFlagUrl(game.current.code) : null;

  return (
    <div className="app">
      {pendingNavigate && (
        <LeaveGameDialog
          onConfirm={() => { pendingNavigate(); setPendingNavigate(null); }}
          onCancel={() => setPendingNavigate(null)}
        />
      )}
      <AnswerBurst
        nonce={game.attemptNonce}
        wasCorrect={game.wasCorrect}
        active={!isFinished}
      />
      <GameClock
        startedAt={game.gameStartedAtMs}
        endedAt={game.gameEndedAtMs}
        meanAnswerMs={game.meanAnswerMs}
        totalAnswered={game.totalAnswered}
        totalFlags={game.totalDivisions}
      />

      <main className="card">
        <header className="card-header">
          <h1>
            Disputed &amp; Claimed Territories{" "}
            <span className="card-header__chip">Flag Master</span>
          </h1>
          <p className="tagline">
            {isFinished
              ? `Game complete — ${game.totalAnswered} of ${game.totalDivisions} territories.`
              : `Identify all ${game.totalDivisions} disputed & claimed territory flags · one guess each.`}
          </p>
        </header>

        {!isFinished && game.phase !== "loading" && game.current && currentFlagUrl && (
          <DisputedFlagCard
            flagUrl={currentFlagUrl}
            typeLabel={game.current.typeLabel}
          />
        )}
        {game.phase === "loading" && (
          <div className="flag-card flag-card--placeholder" aria-busy="true">
            <div className="flag-skeleton" />
          </div>
        )}

        {!isFinished && (
          <div className="answer-row">
            <SubdivisionDropdown
              divisions={game.divisions}
              value={game.selected}
              onChange={game.setSelected}
              disabled={isRevealed || game.phase === "loading"}
              label="Your answer"
            />
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

        {(isRevealed || isFinished) && game.current && game.wasCorrect !== null && (
          <div className={`subdiv-game__feedback subdiv-game__feedback--${game.wasCorrect ? "correct" : "wrong"}`}>
            {game.wasCorrect
              ? `Correct! ${game.current.name}`
              : `Wrong — it was ${game.current.name}`}
          </div>
        )}

        <ScoreBoard
          score={game.score}
          correctCount={game.correctCount}
          wrongCount={game.wrongCount}
          totalAnswered={game.totalAnswered}
          totalFlags={game.totalDivisions}
          continentBreakdown={[]}
        />

        {isFinished && !celebrationDismissed && (
          <div className="game-complete">
            <p className="game-complete__title">Game over!</p>
            <p className="game-complete__text">
              You identified {game.correctCount} of {game.totalDivisions} disputed &amp; claimed territory flags.
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
                  <label className="visually-hidden" htmlFor="disputed-leaderboard-name">
                    Your name
                  </label>
                  <input
                    id="disputed-leaderboard-name"
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
                <div className="post-game-leaderboard__actions">
                  <button
                    type="button"
                    className="btn btn-leaderboard"
                    onClick={() => openLeaderboard(leaderboardFilter)}
                  >
                    Leaderboard
                  </button>
                </div>
              </>
            )}
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

        {isFinished && (
          <SubdivisionResultsFlags
            divisions={game.divisions}
            divisionResults={game.divisionResults}
            countryCode=""
          />
        )}
      </main>
    </div>
  );
}
