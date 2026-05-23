import { useEffect, useMemo, useState } from "react";
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

const SLUG_TO_LABEL: Record<string, string> = {
  "all-195": "All flags",
  custom: "Custom",
  "quiz-easy": "Easy",
  "quiz-moderate": "Moderate",
  "quiz-hard": "Hard",
};

const SLUG_ORDER = ["all-195", "quiz-easy", "quiz-moderate", "quiz-hard", "custom"];

function gameModeLabel(slug: string): string {
  if (SLUG_TO_LABEL[slug]) return SLUG_TO_LABEL[slug];
  if (slug.startsWith("group-hardcore-")) return "Hardcore";
  if (slug.startsWith("group-")) {
    const raw = slug.replace(/^group-/, "").replace(/-/g, " ");
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  }
  return slug;
}

function sortedModes(modes: string[]): string[] {
  return [...modes].sort((a, b) => {
    const ai = SLUG_ORDER.indexOf(a);
    const bi = SLUG_ORDER.indexOf(b);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return gameModeLabel(a).localeCompare(gameModeLabel(b));
  });
}

export function LeaderboardLightbox() {
  const {
    isOpen,
    selectedEntryId,
    filteredEntries,
    activeFilter,
    syncStatus,
    closeLeaderboard,
    selectEntry,
    goBackInLeaderboard,
  } = useLeaderboard();
  const entries = filteredEntries;

  const [selectedModes, setSelectedModes] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLeaderboard();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeLeaderboard]);

  // Reset filter when modal closes
  useEffect(() => {
    if (!isOpen) setSelectedModes(new Set());
  }, [isOpen]);

  const availableModes = useMemo(() => {
    const modes = new Set<string>();
    for (const e of entries) {
      if (e.gameMode) modes.add(e.gameMode);
    }
    return sortedModes([...modes]);
  }, [entries]);

  const displayEntries = useMemo(() => {
    if (selectedModes.size === 0) return entries;
    return entries.filter((e) => e.gameMode && selectedModes.has(e.gameMode));
  }, [entries, selectedModes]);

  function toggleMode(mode: string) {
    setSelectedModes((prev) => {
      const next = new Set(prev);
      if (next.has(mode)) next.delete(mode);
      else next.add(mode);
      return next;
    });
  }

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
            {selected
              ? "Run details"
              : activeFilter
              ? activeFilter.label
              : "Leaderboard"}
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
              {activeFilter
                ? `No saved runs for this mode yet. Be the first!`
                : `No saved games yet. Finish a run and add your name to see results here.`}
            </p>
          ) : (
            <>
              {availableModes.length > 0 && (
                <div className="leaderboard-lightbox__filter">
                  <button
                    type="button"
                    className={`leaderboard-lightbox__filter-chip${selectedModes.size === 0 ? " leaderboard-lightbox__filter-chip--active" : ""}`}
                    onClick={() => setSelectedModes(new Set())}
                  >
                    All
                  </button>
                  {availableModes.map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      className={`leaderboard-lightbox__filter-chip${selectedModes.has(mode) ? " leaderboard-lightbox__filter-chip--active" : ""}`}
                      onClick={() => toggleMode(mode)}
                    >
                      {gameModeLabel(mode)}
                    </button>
                  ))}
                </div>
              )}
              {displayEntries.length === 0 ? (
                <p className="leaderboard-lightbox__empty">
                  No entries for the selected mode{selectedModes.size > 1 ? "s" : ""}.
                </p>
              ) : (
                <ul className="leaderboard-lightbox__list">
                  {displayEntries.map((entry, index) => (
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
                            {entry.gameMode && (
                              <span className="leaderboard-lightbox__mode-tag">
                                {gameModeLabel(entry.gameMode)}
                              </span>
                            )}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
