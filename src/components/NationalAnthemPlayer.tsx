import { useCallback, useEffect, useRef, useState } from "react";
import { NATIONAL_ANTHEMS, type AnthemData } from "../data/nationalAnthems";
import "./NationalAnthemPlayer.css";

interface Props {
  countryCode: string;
  countryName: string;
  flagUrl: string | null;
  onClose: () => void;
}

function formatTime(s: number): string {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

const AUDIO_EXT = /\.(ogg|oga|flac|mp3|wav)$/i;
const PLAYABLE_EXT = /\.(ogg|oga|mp3)$/i;
const API = "https://commons.wikimedia.org/w/api.php";

async function getFileUrl(title: string): Promise<string | null> {
  const full = title.startsWith("File:") ? title : `File:${title}`;
  const res = await fetch(`${API}?action=query&titles=${encodeURIComponent(full)}&prop=imageinfo&iiprop=url&format=json&origin=*`);
  const data = await res.json();
  const pages = data?.query?.pages ?? {};
  const page = Object.values(pages)[0] as Record<string, unknown>;
  if (!page || "missing" in page) return null;
  const url: string | undefined = (page.imageinfo as { url: string }[])?.[0]?.url;
  if (!url) return null;
  // Only return URLs in browser-playable formats; skip FLAC/WAV
  return PLAYABLE_EXT.test(url) ? url : null;
}

async function searchAudio(query: string): Promise<string | null> {
  const res = await fetch(`${API}?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=10&srprop=title&format=json&origin=*`);
  const data = await res.json();
  const results: { title: string }[] = data?.query?.search ?? [];
  // Prefer results with a playable audio extension in the title
  const ordered = [
    ...results.filter(r => PLAYABLE_EXT.test(r.title)),
    ...results.filter(r => AUDIO_EXT.test(r.title) && !PLAYABLE_EXT.test(r.title)),
    ...results.filter(r => !AUDIO_EXT.test(r.title)),
  ];
  for (const r of ordered.slice(0, 8)) {
    const url = await getFileUrl(r.title);
    if (url) return url;
  }
  return null;
}

async function resolveWikimediaUrl(anthem: AnthemData, countryName: string): Promise<string> {
  // 1. Exact file title
  const direct = await getFileUrl(anthem.wikiFile);
  if (direct) return direct;

  // 2. Explicit wikiSearch override
  if (anthem.wikiSearch) {
    const url = await searchAudio(anthem.wikiSearch);
    if (url) return url;
  }

  // 3. "national anthem [country]" — most reliable generic query
  const url3 = await searchAudio(`national anthem ${countryName}`);
  if (url3) return url3;

  // 4. English anthem title
  const title = anthem.titleEn ?? anthem.title;
  const url4 = await searchAudio(title);
  if (url4) return url4;

  throw new Error("No audio found");
}

export function NationalAnthemPlayer({ countryCode, countryName, flagUrl, onClose }: Props) {
  const anthem: AnthemData | undefined = NATIONAL_ANTHEMS[countryCode];

  const audioRef = useRef<HTMLAudioElement>(null);
  const lyricsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState(true);
  const [audioError, setAudioError] = useState<string | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeLine, setActiveLine] = useState(-1);

  // Fetch audio URL from Wikimedia Commons
  useEffect(() => {
    if (!anthem) {
      setIsLoadingAudio(false);
      setAudioError("Anthem data not available for this country yet.");
      return;
    }
    let cancelled = false;
    setIsLoadingAudio(true);
    setAudioError(null);
    resolveWikimediaUrl(anthem, countryName)
      .then((url) => { if (!cancelled) { setAudioUrl(url); setIsLoadingAudio(false); } })
      .catch(() => { if (!cancelled) { setAudioError("Audio not available — check back later."); setIsLoadingAudio(false); } });
    return () => { cancelled = true; };
  }, [anthem, countryName]);

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const t = audio.currentTime;
    setCurrentTime(t);
    if (!anthem?.lines) return;
    let next = -1;
    for (let i = anthem.lines.length - 1; i >= 0; i--) {
      if (t >= anthem.lines[i].start) { next = i; break; }
    }
    setActiveLine(next);
  }, [anthem]);

  const handleLoadedMetadata = useCallback(() => {
    setDuration(audioRef.current?.duration ?? 0);
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setActiveLine(-1);
    if (audioRef.current) audioRef.current.currentTime = 0;
    setCurrentTime(0);
  }, []);

  // Auto-scroll active lyric line into view (centred)
  useEffect(() => {
    if (activeLine < 0 || !lyricsRef.current) return;
    const container = lyricsRef.current;
    const lineEl = container.querySelector<HTMLElement>(`[data-line="${activeLine}"]`);
    if (!lineEl) return;
    const cRect = container.getBoundingClientRect();
    const lRect = lineEl.getBoundingClientRect();
    container.scrollTo({
      top: container.scrollTop + (lRect.top - cRect.top) - cRect.height / 2 + lRect.height / 2,
      behavior: "smooth",
    });
  }, [activeLine]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }

  function skip(seconds: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(duration || Infinity, audio.currentTime + seconds));
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = fraction * duration;
  }

  // Close on Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="anthem-modal" role="dialog" aria-modal="true" aria-label={`${countryName} national anthem`}>
      <div className="anthem-modal__backdrop" onClick={onClose} aria-hidden="true" />
      <div className="anthem-modal__card">
        <button className="anthem-modal__close" onClick={onClose} aria-label="Close anthem player">×</button>

        {/* Header */}
        <div className="anthem-modal__header">
          {flagUrl && (
            <img src={flagUrl} alt={`${countryName} flag`} className="anthem-modal__flag" draggable={false} />
          )}
          <div className="anthem-modal__meta">
            <p className="anthem-modal__country">{countryName}</p>
            {anthem ? (
              <>
                <p className="anthem-modal__title">{anthem.title}</p>
                {anthem.titleEn && anthem.titleEn !== anthem.title && (
                  <p className="anthem-modal__title-en">"{anthem.titleEn}"</p>
                )}
              </>
            ) : (
              <p className="anthem-modal__title">National Anthem</p>
            )}
          </div>
        </div>

        {/* Player body */}
        {isLoadingAudio ? (
          <div className="anthem-modal__status">
            <span className="anthem-modal__spinner" aria-hidden="true" />
            Loading anthem…
          </div>
        ) : audioError ? (
          <div className="anthem-modal__status anthem-modal__status--error">{audioError}</div>
        ) : audioUrl ? (
          <>
            {/* Hidden audio element */}
            <audio
              ref={audioRef}
              src={audioUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
              onError={() => setAudioError("Playback error — the audio file could not be loaded.")}
              preload="auto"
            />

            {/* Progress bar */}
            <div
              className="anthem-player__progress"
              ref={progressRef}
              onClick={handleSeek}
              role="slider"
              aria-label="Seek"
              aria-valuenow={Math.round(currentTime)}
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") skip(5);
                if (e.key === "ArrowLeft") skip(-5);
              }}
            >
              <div className="anthem-player__progress-fill" style={{ width: `${progress}%` }} />
              <div className="anthem-player__progress-thumb" style={{ left: `${progress}%` }} />
            </div>

            {/* Time labels */}
            <div className="anthem-player__time">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            {/* Controls */}
            <div className="anthem-player__controls">
              <button
                className="anthem-player__btn anthem-player__btn--skip"
                onClick={() => skip(-15)}
                aria-label="Back 15 seconds"
                title="Back 15s"
              >
                <span className="anthem-player__skip-icon">↺</span>
                <span className="anthem-player__skip-label">15</span>
              </button>

              <button
                className="anthem-player__btn anthem-player__btn--play"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <span className="anthem-player__pause-icon">⏸</span>
                ) : (
                  <span className="anthem-player__play-icon">▶</span>
                )}
              </button>

              <button
                className="anthem-player__btn anthem-player__btn--skip"
                onClick={() => skip(15)}
                aria-label="Forward 15 seconds"
                title="Forward 15s"
              >
                <span className="anthem-player__skip-label">15</span>
                <span className="anthem-player__skip-icon">↻</span>
              </button>
            </div>

            {/* Lyrics */}
            <div className="anthem-lyrics" ref={lyricsRef} aria-label="Lyrics">
              {anthem?.lines ? (
                <>
                  {anthem.lines.map((line, i) => {
                    const state =
                      i === activeLine ? "active" :
                      i < activeLine ? "past" : "future";
                    const hasDualLang = !!line.textEn;
                    return (
                      <div
                        key={i}
                        data-line={i}
                        className={`anthem-lyrics__line anthem-lyrics__line--${state}${hasDualLang ? " anthem-lyrics__line--dual" : ""}`}
                      >
                        <span className="anthem-lyrics__original">{line.text}</span>
                        {hasDualLang && (
                          <span className="anthem-lyrics__translation">{line.textEn}</span>
                        )}
                      </div>
                    );
                  })}
                </>
              ) : (
                <p className="anthem-lyrics__unavailable">
                  ♪ Lyrics sync coming soon for this anthem ♪
                </p>
              )}
              {anthem?.instrumental && (
                <p className="anthem-lyrics__note">This anthem is officially instrumental.</p>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
