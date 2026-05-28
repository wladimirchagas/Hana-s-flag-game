import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

const AUDIO_EXT = /\.(ogg|oga|flac|mp3|wav|webm)$/i;
const VOCAL_HINT = /vocal|sung|voice|choral|choir|singing/i;
const INSTR_HINT = /instrumental|instr\.|orchestra only|without.?vocal/i;
const OGG_EXT = /\.(ogg|oga)$/i;
const API = "https://commons.wikimedia.org/w/api.php";

// Detect native OGG Vorbis support (absent on Safari / all iOS browsers)
const _probe = typeof Audio !== "undefined" ? new Audio() : null;
const _supportsOgg = (_probe?.canPlayType("audio/ogg; codecs=vorbis") ?? "") !== "";
const _supportsWebM = (_probe?.canPlayType("audio/webm; codecs=opus") ?? "") !== "";
const _supportsMp3 = (_probe?.canPlayType("audio/mpeg") ?? "probably") !== "";

// Formats the native <audio> element can play. OGG is excluded on Safari.
const _nativeExts = [_supportsOgg && "ogg|oga", _supportsWebM && "webm", _supportsMp3 && "mp3"]
  .filter(Boolean).join("|") || "mp3";
const NATIVE_EXT = new RegExp(`\\.(${_nativeExts})$`, "i");

// Fetch the direct media URL for a Wikimedia Commons file using imageinfo.
// imageinfo works for ALL file types (audio, video, image) and is more reliable
// than videoinfo, which is specific to the TimedMediaHandler extension.
async function getFileUrl(title: string, exclude?: Set<string>): Promise<string | null> {
  const full = title.startsWith("File:") ? title : `File:${title}`;
  const url = `${API}?action=query&titles=${encodeURIComponent(full)}&prop=imageinfo&iiprop=url&format=json&origin=*`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Wikimedia API HTTP ${res.status}`);
  const data = await res.json();
  const pages = data?.query?.pages ?? {};
  const page = Object.values(pages)[0] as Record<string, unknown>;
  if (!page || "missing" in page) return null;
  const ii = (page.imageinfo as { url?: string }[] | undefined)?.[0];
  const mediaUrl = ii?.url;
  if (!mediaUrl || !AUDIO_EXT.test(mediaUrl) || exclude?.has(mediaUrl)) return null;
  return mediaUrl;
}

async function searchAudio(query: string, preferVocal = true, exclude?: Set<string>): Promise<string | null> {
  const res = await fetch(`${API}?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=12&srprop=title&format=json&origin=*`);
  if (!res.ok) throw new Error(`Wikimedia search HTTP ${res.status}`);
  const data = await res.json();
  const results: { title: string }[] = data?.query?.search ?? [];

  // Sort: natively playable > OGG (ogv.js plays it) > other, vocal-hinted first
  const native = results.filter(r => NATIVE_EXT.test(r.title));
  const oggFiles = results.filter(r => OGG_EXT.test(r.title));
  const other = results.filter(r => AUDIO_EXT.test(r.title) && !NATIVE_EXT.test(r.title) && !OGG_EXT.test(r.title));

  const sortByVocal = (arr: typeof results) => preferVocal ? [
    ...arr.filter(r => VOCAL_HINT.test(r.title)),
    ...arr.filter(r => !VOCAL_HINT.test(r.title) && !INSTR_HINT.test(r.title)),
    ...arr.filter(r => INSTR_HINT.test(r.title)),
  ] : arr;

  const ordered = [...sortByVocal(native), ...sortByVocal(oggFiles), ...other];

  for (const r of ordered.slice(0, 8)) {
    try {
      const url = await getFileUrl(r.title, exclude);
      if (url) return url;
    } catch {
      // continue to next result
    }
  }
  return null;
}

// Wrap a strategy so its errors don't abort the whole resolution chain
async function attempt<T>(fn: () => Promise<T | null>, label: string): Promise<T | null> {
  try {
    const result = await fn();
    if (result) console.debug(`[anthem] resolved via ${label}:`, result);
    else console.debug(`[anthem] ${label}: no result`);
    return result;
  } catch (e) {
    console.warn(`[anthem] ${label} failed:`, e);
    return null;
  }
}

async function resolveWikimediaUrl(anthem: AnthemData, countryName: string, exclude?: Set<string>): Promise<string> {
  console.debug("[anthem] resolving for", countryName, "wikiFile:", anthem.wikiFile);

  const direct = await attempt(() => getFileUrl(anthem.wikiFile, exclude), "direct file");
  if (direct) return direct;

  if (anthem.wikiSearch) {
    const url = await attempt(() => searchAudio(anthem.wikiSearch!, true, exclude), "wikiSearch");
    if (url) return url;
  }

  const url3v = await attempt(() => searchAudio(`national anthem ${countryName} vocal`, true, exclude), "vocal search");
  if (url3v) return url3v;

  const url4 = await attempt(() => searchAudio(`national anthem ${countryName}`, true, exclude), "anthem search");
  if (url4) return url4;

  const title = anthem.titleEn ?? anthem.title;
  const url5 = await attempt(() => searchAudio(title, true, exclude), "title search");
  if (url5) return url5;

  throw new Error("No audio found after all strategies");
}

// ── OGV.js loader ──────────────────────────────────────────────────────────
// ogv.js decodes OGG Vorbis in pure JS/WASM, enabling Safari to play OGG.
// Loaded lazily only when needed (OGG URL + Safari).

type OGVPlayerLike = {
  src: string;
  currentTime: number;
  readonly duration: number;
  play(): Promise<void>;
  pause(): void;
  addEventListener(type: string, handler: EventListener): void;
  removeEventListener(type: string, handler: EventListener): void;
};

let _ogvPromise: Promise<(new () => OGVPlayerLike) | null> | null = null;

function loadOgvPlayer(base: string): Promise<(new () => OGVPlayerLike) | null> {
  if (_ogvPromise) return _ogvPromise;
  _ogvPromise = new Promise((resolve) => {
    try {
      const script = document.createElement("script");
      script.src = `${base}ogv.js`;
      script.onload = () => {
        try {
          const w = window as unknown as Record<string, unknown>;
          if (w.OGVLoader) (w.OGVLoader as { base: string }).base = base;
          resolve(w.OGVPlayer as (new () => OGVPlayerLike));
        } catch {
          resolve(null);
        }
      };
      script.onerror = () => resolve(null);
      document.head.appendChild(script);
    } catch {
      resolve(null);
    }
  });
  return _ogvPromise;
}

// ── Component ───────────────────────────────────────────────────────────────

export function NationalAnthemPlayer({ countryCode, countryName, flagUrl, onClose }: Props) {
  const anthem: AnthemData | undefined = NATIONAL_ANTHEMS[countryCode];

  // Native <audio> element ref (used when URL is MP3/WebM)
  const audioRef = useRef<HTMLAudioElement>(null);
  // OGV player instance ref (used when URL is OGG and browser can't play it natively)
  const ogvRef = useRef<OGVPlayerLike | null>(null);
  const lyricsRef = useRef<HTMLDivElement>(null);
  const triedUrls = useRef<Set<string>>(new Set());
  const retryCount = useRef(0);

  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState(true);
  const [audioError, setAudioError] = useState<string | null>(null);
  // true while ogv.js is loading or the OGV player is initialising
  const [ogvLoading, setOgvLoading] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeLine, setActiveLine] = useState(-1);

  // Normalise lyrics timestamps to the actual recording duration.
  // Estimated start times occasionally exceed the real file length
  // (e.g. a 207s recording whose data goes to start:312).  When that
  // happens we scale every timestamp proportionally so the last line
  // still falls ~5s before the end rather than past it.
  const scaledLines = useMemo(() => {
    const lines = anthem?.lines;
    if (!lines?.length || !duration) return lines;
    const lastStart = lines[lines.length - 1].start;
    if (lastStart <= duration - 4) return lines; // fits fine — no scaling needed
    const scale = (duration - 4) / lastStart;
    return lines.map(l => ({ ...l, start: Math.round(l.start * scale * 10) / 10 }));
  }, [anthem, duration]);

  // Ref that always holds the current scaledLines so event-handler closures
  // never see a stale value after duration updates.
  const scaledLinesRef = useRef(scaledLines);
  scaledLinesRef.current = scaledLines;

  // Intro-offset: seconds by which the actual vocal onset is later than
  // scaledLines[0].start.  When > 0, we shift the active-line lookup
  // backwards by this amount so lyrics only highlight when singing begins.
  // Reset each time a new audio URL loads.
  const introOffsetRef = useRef(0);

  // Web Audio API nodes — created once, reused across plays of the same URL.
  // Stored in refs so we never double-attach to the same <audio> element.
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mediaSourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  // Determine whether we'll need ogv.js for the current URL
  const needsOgv = !!audioUrl && OGG_EXT.test(audioUrl) && !_supportsOgg;

  // ── Fetch audio URL from Wikimedia ──────────────────────────────────────
  useEffect(() => {
    triedUrls.current = new Set();
    retryCount.current = 0;
    if (!anthem) {
      setIsLoadingAudio(false);
      setAudioError("Anthem data not available for this country yet.");
      return;
    }
    let cancelled = false;
    setIsLoadingAudio(true);
    setAudioError(null);
    setAudioUrl(null);
    resolveWikimediaUrl(anthem, countryName)
      .then((url) => { if (!cancelled) { setAudioUrl(url); setIsLoadingAudio(false); } })
      .catch((e) => {
        console.error("[anthem] resolution failed:", e);
        if (!cancelled) { setAudioError("Audio not available — check back later."); setIsLoadingAudio(false); }
      });
    return () => { cancelled = true; };
  }, [anthem, countryName]);

  // ── Wire up OGV player when URL needs it ────────────────────────────────
  useEffect(() => {
    if (!audioUrl || !needsOgv) return;
    let cancelled = false;
    setOgvLoading(true);

    const base = `${import.meta.env.BASE_URL}ogv/`;
    loadOgvPlayer(base).then((OGVPlayer) => {
      if (cancelled) return;
      if (!OGVPlayer) {
        setAudioError("Playback not supported in this browser.");
        setOgvLoading(false);
        return;
      }
      const player = new OGVPlayer();
      ogvRef.current = player;

      const onTimeUpdate = () => {
        const t = player.currentTime;
        setCurrentTime(t);
        const lines = scaledLinesRef.current;
        if (!lines) return;
        const adj = t - introOffsetRef.current;
        let next = -1;
        for (let i = lines.length - 1; i >= 0; i--) {
          if (adj >= lines[i].start) { next = i; break; }
        }
        setActiveLine(next);
      };
      const onLoadedMetadata = () => {
        setDuration(player.duration);
        setOgvLoading(false);
      };
      const onEnded = () => {
        setIsPlaying(false);
        setActiveLine(-1);
        player.currentTime = 0;
        setCurrentTime(0);
      };
      const onError = () => {
        const failedUrl = player.src;
        if (failedUrl) triedUrls.current.add(failedUrl);
        if (!anthem || retryCount.current >= 3) {
          setAudioError("Playback error — the audio file could not be loaded.");
          setOgvLoading(false);
          return;
        }
        retryCount.current++;
        setOgvLoading(true);
        resolveWikimediaUrl(anthem, countryName, triedUrls.current)
          .then(url => {
            if (cancelled) return;
            player.src = url;
            setAudioUrl(url);
            setOgvLoading(false);
          })
          .catch(() => {
            if (!cancelled) {
              setAudioError("Audio not available — check back later.");
              setOgvLoading(false);
            }
          });
      };

      player.addEventListener("timeupdate", onTimeUpdate as EventListener);
      player.addEventListener("loadedmetadata", onLoadedMetadata as EventListener);
      player.addEventListener("ended", onEnded as EventListener);
      player.addEventListener("error", onError as EventListener);
      player.src = audioUrl;

      return () => {
        player.removeEventListener("timeupdate", onTimeUpdate as EventListener);
        player.removeEventListener("loadedmetadata", onLoadedMetadata as EventListener);
        player.removeEventListener("ended", onEnded as EventListener);
        player.removeEventListener("error", onError as EventListener);
        try { player.pause(); } catch { /* ignore */ }
        ogvRef.current = null;
      };
    });

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl, needsOgv]);

  // ── Vocal-onset detection via Web Audio API ─────────────────────────────
  // After audio URL loads, we connect the <audio> element to an OfflineAudio-
  // -like chain (but live) via createMediaElementSource.  A bandpass filter
  // isolates the vocal range (200–4000 Hz); we poll RMS energy every 200 ms
  // to detect the first sustained rise above a baseline, which marks the true
  // start of singing.  introOffsetRef is then set to
  //   (detectedOnsetTime − scaledLines[0].start)
  // so the active-line lookup is shifted by exactly that amount.
  useEffect(() => {
    if (needsOgv || !audioUrl) return;

    introOffsetRef.current = 0;
    const audio = audioRef.current;
    if (!audio) return;

    let ctx: AudioContext;
    try {
      ctx = new AudioContext();
      audioCtxRef.current = ctx;
    } catch {
      return;
    }

    let source: MediaElementAudioSourceNode;
    try {
      source = ctx.createMediaElementSource(audio);
      mediaSourceRef.current = source;
    } catch {
      ctx.close().catch(() => {});
      audioCtxRef.current = null;
      return;
    }

    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 200;
    hp.Q.value = 0.7;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 4000;
    lp.Q.value = 0.7;
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(hp);
    hp.connect(lp);
    lp.connect(analyser);
    analyser.connect(ctx.destination);

    const buf = new Float32Array(analyser.fftSize);
    let stopped = false;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let sampleCount = 0;
    let baselineSum = 0;
    let baseline = 0;
    let detectionDone = false;
    let sustainedStart: number | null = null;
    const BASELINE_SAMPLES = 15; // ~3 s at 200 ms/sample
    const ONSET_MULTIPLIER = 2.5;
    const SUSTAINED_SEC = 0.8;

    function startPolling() {
      if (stopped || detectionDone || intervalId) return;
      if (ctx.state === "suspended") ctx.resume().catch(() => {});
      intervalId = setInterval(() => {
        if (stopped || detectionDone) { clearInterval(intervalId!); intervalId = null; return; }
        analyser.getFloatTimeDomainData(buf);
        let sq = 0;
        for (let i = 0; i < buf.length; i++) sq += buf[i] * buf[i];
        const rms = Math.sqrt(sq / buf.length);
        const t = audio.currentTime;
        sampleCount++;
        if (sampleCount <= BASELINE_SAMPLES) {
          baselineSum += rms;
          baseline = baselineSum / sampleCount;
          return;
        }
        const threshold = Math.max(baseline * ONSET_MULTIPLIER, 5e-4);
        if (rms > threshold) {
          if (sustainedStart === null) sustainedStart = t;
          else if (t - sustainedStart >= SUSTAINED_SEC) {
            detectionDone = true;
            const firstStart = scaledLinesRef.current?.[0]?.start ?? 0;
            const offset = sustainedStart - firstStart;
            if (offset > 0.5) introOffsetRef.current = offset;
            console.debug(`[onset] onset=${sustainedStart.toFixed(2)}s offset=${introOffsetRef.current.toFixed(2)}s`);
            clearInterval(intervalId!);
            intervalId = null;
          }
        } else {
          sustainedStart = null;
        }
      }, 200);
    }

    function stopPolling() {
      if (intervalId) { clearInterval(intervalId); intervalId = null; }
    }

    audio.addEventListener("play", startPolling);
    audio.addEventListener("pause", stopPolling);
    audio.addEventListener("ended", stopPolling);

    return () => {
      stopped = true;
      stopPolling();
      audio.removeEventListener("play", startPolling);
      audio.removeEventListener("pause", stopPolling);
      audio.removeEventListener("ended", stopPolling);
      ctx.close().catch(() => {});
      audioCtxRef.current = null;
      mediaSourceRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl, needsOgv]);

  // ── Native audio event handlers ─────────────────────────────────────────
  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const t = audio.currentTime;
    setCurrentTime(t);
    const lines = scaledLinesRef.current;
    if (!lines) return;
    const adj = t - introOffsetRef.current;
    let next = -1;
    for (let i = lines.length - 1; i >= 0; i--) {
      if (adj >= lines[i].start) { next = i; break; }
    }
    setActiveLine(next);
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    setDuration(audioRef.current?.duration ?? 0);
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setActiveLine(-1);
    if (audioRef.current) audioRef.current.currentTime = 0;
    setCurrentTime(0);
  }, []);

  const handleAudioError = useCallback(() => {
    const failedUrl = audioRef.current?.src;
    if (failedUrl && failedUrl !== window.location.href) triedUrls.current.add(failedUrl);
    if (!anthem || retryCount.current >= 3) {
      setAudioError("Playback error — the audio file could not be loaded.");
      return;
    }
    retryCount.current++;
    setIsLoadingAudio(true);
    setAudioUrl(null);
    resolveWikimediaUrl(anthem, countryName, triedUrls.current)
      .then(url => { setAudioUrl(url); setIsLoadingAudio(false); })
      .catch(() => { setAudioError("Audio not available — check back later."); setIsLoadingAudio(false); });
  }, [anthem, countryName]);

  // ── Auto-scroll active lyric line into view ──────────────────────────────
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

  function getActivePlayer(): HTMLAudioElement | OGVPlayerLike | null {
    return needsOgv ? ogvRef.current : audioRef.current;
  }

  function togglePlay() {
    const player = getActivePlayer();
    if (!player) return;
    if (isPlaying) {
      player.pause();
      setIsPlaying(false);
    } else {
      player.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }

  function skip(seconds: number) {
    const player = getActivePlayer();
    if (!player) return;
    player.currentTime = Math.max(0, Math.min(duration || Infinity, player.currentTime + seconds));
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const player = getActivePlayer();
    if (!player || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    player.currentTime = fraction * duration;
  }

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const progress = duration ? (currentTime / duration) * 100 : 0;
  const playerReady = !!audioUrl && !isLoadingAudio && !audioError;
  const showLoading = isLoadingAudio || (needsOgv && ogvLoading && playerReady);

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
        {showLoading ? (
          <div className="anthem-modal__status">
            <span className="anthem-modal__spinner" aria-hidden="true" />
            Loading anthem…
          </div>
        ) : audioError ? (
          <div className="anthem-modal__status anthem-modal__status--error">{audioError}</div>
        ) : playerReady ? (
          <>
            {/* Native audio element — only used when NOT using ogv.js */}
            {!needsOgv && (
              <audio
                ref={audioRef}
                src={audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                onError={handleAudioError}
                preload="auto"
              />
            )}

            {/* Progress bar */}
            <div
              className="anthem-player__progress"
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
              {scaledLines ? (
                <>
                  {scaledLines.map((line, i) => {
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
