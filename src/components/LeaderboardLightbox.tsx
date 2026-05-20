import { useEffect } from "react";
import { useLeaderboard } from "../context/LeaderboardContext";
import { ScoreBoard } from "./ScoreBoard";
import { WorldProgressMap } from "./WorldProgressMap";
import { GameResultsFlags } from "./GameResultsFlags";
import type { LeaderboardEntry } from "../lib/leaderboardStorage";
import "../App.css";

function formatLeaderboardDate(ts: number): string {
  return new Date(ts).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatElapsed(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${m}:${String(s).padStart(2, "0")}`;
}

function EntryDetail({ entry }: { entry: LeaderboardEntry }) {
  const playedAll = entry.totalAnswered >= entry.totalFlags;
  const countries = entry.countriesPlayed;

  return (
    <div className="leaderboard-lightbox__detail">
      <div className="leaderboard-lightbox__detail-meta">
        <p className="leaderboard-lightbox__detail-name">{entry.playerName}</p>
        <p className="leaderboard-lightbox__detail-sub">
          {formatLeaderboardDate(entry.createdAt)}
          {" · "}
          Time {formatElapsed(entry.elapsedMs)}
          {entry.meanAnswerMs != null && (
            <>
              {" · "}
              Avg {(entry.meanAnswerMs / 1000).toFixed(1)}s per answer
            </>
          )}
        </p>
        <p className="leaderboard-lightbox__detail-sub">
          {playedAll
            ? `Completed all ${entry.totalFlags} flags.`
            : `Stopped after ${entry.totalAnswered} of ${entry.totalFlags} flags.`}
        </p>
      </div>

      <ScoreBoard
        score={entry.score}
        correctCount={entry.correctCount}
        wrongCount={entry.wrongCount}
        totalAnswered={entry.totalAnswered}
        totalFlags={entry.totalFlags}
        continentBreakdown={entry.continentBreakdown}
      />

      <WorldProgressMap countryResults={entry.countryResults} />

      <GameResultsFlags
        countries={countries}
        countryResults={entry.countryResults}
      />
    </div>
  );
}

export function LeaderboardLightbox() {
  const {
    isOpen,
    selectedEntryId,
    entries,
    syncStatus,
    closeLeaderboard,
    selectEntry,
    goBackInLeaderboard,
  } = useLeaderboard();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLeaderboard();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeLeaderboard]);

  if (!isOpen) return null;

  const selected =
    selectedEntryId != null
      ? entries.find((e) => e.id === selectedEntryId)
      : undefined;

  return (
    <div
      className="leaderboard-lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby="leaderboard-lightbox-title"
    >
      <button
        type="button"
        className="leaderboard-lightbox__backdrop"
        aria-label="Close leaderboard"
        onClick={closeLeaderboard}
      />
      <div className="leaderboard-lightbox__panel">
        <div className="leaderboard-lightbox__header">
          {selected ? (
            <button
              type="button"
              className="leaderboard-lightbox__back"
              onClick={goBackInLeaderboard}
            >
              ← Back to list
            </button>
          ) : (
            <span className="leaderboard-lightbox__header-spacer" />
          )}
          <h2 id="leaderboard-lightbox-title" className="leaderboard-lightbox__title">
            {selected ? "Run details" : "Leaderboard"}
          </h2>
          <button
            type="button"
            className="leaderboard-lightbox__close"
            onClick={closeLeaderboard}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="leaderboard-lightbox__body">
          {syncStatus === "loading" ? (
            <p className="leaderboard-lightbox__empty">Loading leaderboard…</p>
          ) : syncStatus === "error" ? (
            <p className="leaderboard-lightbox__empty">
              Could not load leaderboard. Check your connection and try again.
            </p>
          ) : selectedEntryId != null && selected === undefined ? (
            <p className="leaderboard-lightbox__empty">
              This result is no longer available.{" "}
              <button
                type="button"
                className="leaderboard-lightbox__back"
                onClick={goBackInLeaderboard}
              >
                Back to list
              </button>
            </p>
          ) : selected ? (
            <EntryDetail entry={selected} />
          ) : entries.length === 0 ? (
            <p className="leaderboard-lightbox__empty">
              No saved games yet. Finish a run and add your name to see results
              here.
            </p>
          ) : (
            <ul className="leaderboard-lightbox__list">
              {entries.map((entry, index) => (
                <li key={entry.id}>
                  <button
                    type="button"
                    className="leaderboard-lightbox__row"
                    onClick={() => selectEntry(entry.id)}
                  >
                    <span className="leaderboard-lightbox__rank">{index + 1}</span>
                    <span className="leaderboard-lightbox__row-main">
                      <span className="leaderboard-lightbox__row-name">
                        {entry.playerName}
                      </span>
                      <span className="leaderboard-lightbox__row-meta">
                        {formatLeaderboardDate(entry.createdAt)} ·{" "}
                        {entry.totalAnswered}/{entry.totalFlags} flags ·{" "}
                        {formatElapsed(entry.elapsedMs)}
                      </span>
                    </span>
                    <span className="leaderboard-lightbox__row-score">
                      {entry.score} pts
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
