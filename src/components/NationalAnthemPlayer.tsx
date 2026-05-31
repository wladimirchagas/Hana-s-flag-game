import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NATIONAL_ANTHEMS, type AnthemData } from "../data/nationalAnthems";
import { detectVocalOnset } from "../lib/anthemCalibrate";
import { gameAudio } from "../lib/gameAudio";
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

// Wikimedia API calls without an explicit timeout can hang indefinitely on a
// stalled CDN, which previously left the player stuck on "Loading anthem…"
// with no error path. 8s per call lets one slow lookup fail fast so the next
// fallback strategy in `resolveWikimediaUrl` can take a turn.
const FETCH_TIMEOUT_MS = 8000;
async function fetchWithTimeout(input: string, timeoutMs = FETCH_TIMEOUT_MS): Promise<Response> {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(input, { signal: ctrl.signal });
  } finally {
    clearTimeout(id);
  }
}

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
  const res = await fetchWithTimeout(url);
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
  const res = await fetchWithTimeout(`${API}?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&srlimit=12&srprop=title&format=json&origin=*`);
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

  const direct = anthem.wikiFile
    ? await attempt(() => getFileUrl(anthem.wikiFile!, exclude), "direct file")
    : null;
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

// ── YouTube IFrame API ───────────────────────────────────────────────────────
type YTPlayerInstance = {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  getPlayerState(): number;
  destroy(): void;
};

declare global {
  interface Window {
    YT: {
      Player: new (element: HTMLElement | string, options: {
        videoId: string;
        width?: number | string;
        height?: number | string;
        playerVars?: Record<string, string | number>;
        events?: {
          onReady?: (e: { target: YTPlayerInstance }) => void;
          onStateChange?: (e: { data: number; target: YTPlayerInstance }) => void;
          onError?: (e: { data: number }) => void;
        };
      }) => YTPlayerInstance;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let _ytApiPromise: Promise<void> | null = null;
function loadYTApi(): Promise<void> {
  if (_ytApiPromise) return _ytApiPromise;
  _ytApiPromise = new Promise((resolve) => {
    if (typeof window !== "undefined" && (window.YT as unknown as { Player?: unknown })?.Player) {
      resolve();
      return;
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (prev) prev();
      resolve();
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(script);
  });
  return _ytApiPromise;
}

// ── Component ───────────────────────────────────────────────────────────────

export function NationalAnthemPlayer({ countryCode, countryName, flagUrl, onClose }: Props) {
  const anthem: AnthemData | undefined = NATIONAL_ANTHEMS[countryCode];

  // Native <audio> element ref (used when URL is MP3/WebM)
  const audioRef = useRef<HTMLAudioElement>(null);
  // OGV player instance ref (used when URL is OGG and browser can't play it natively)
  const ogvRef = useRef<OGVPlayerLike | null>(null);
  // YouTube player refs
  const ytContainerRef = useRef<HTMLDivElement>(null);
  const ytPlayerRef = useRef<YTPlayerInstance | null>(null);
  const ytPollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lyricsRef = useRef<HTMLDivElement>(null);
  const triedUrls = useRef<Set<string>>(new Set());
  const retryCount = useRef(0);

  const isYoutube = !!(anthem?.youtubeId);

  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState(true);
  const [audioError, setAudioError] = useState<string | null>(null);
  // true while ogv.js is loading or the OGV player is initialising
  const [ogvLoading, setOgvLoading] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeLine, setActiveLine] = useState(-1);
  const [activeWordIdx, setActiveWordIdx] = useState(-1);

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
    return lines.map(l => ({
      ...l,
      start: Math.round(l.start * scale * 10) / 10,
      words: l.words?.map(w => ({ ...w, t: Math.round(w.t * scale * 10) / 10 })),
    }));
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

  // Determine whether we'll need ogv.js for the current URL
  const needsOgv = !!audioUrl && OGG_EXT.test(audioUrl) && !_supportsOgg;

  // ── Fetch audio URL from Wikimedia ──────────────────────────────────────
  useEffect(() => {
    // YouTube-backed anthems bypass Wikimedia entirely
    if (isYoutube) return;
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
  }, [anthem, countryName, isYoutube]);

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
        let lineIdx = -1;
        for (let i = lines.length - 1; i >= 0; i--) {
          if (adj >= lines[i].start) { lineIdx = i; break; }
        }
        setActiveLine(lineIdx);
        if (lineIdx >= 0) {
          const words = lines[lineIdx].words;
          if (words?.length) {
            let wi = -1;
            for (let i = words.length - 1; i >= 0; i--) {
              if (adj >= words[i].t) { wi = i; break; }
            }
            setActiveWordIdx(wi);
          } else {
            setActiveWordIdx(-1);
          }
        } else {
          setActiveWordIdx(-1);
        }
      };
      const onLoadedMetadata = () => {
        setDuration(player.duration);
        setOgvLoading(false);
      };
      const onEnded = () => {
        setIsPlaying(false);
        setActiveLine(-1);
        setActiveWordIdx(-1);
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

  // ── Offline vocal-onset detection ───────────────────────────────────────
  // Fetch the audio, decode it with OfflineAudioContext, bandpass-filter to
  // the vocal range (200–4000 Hz), compute per-frame RMS, and find the first
  // sustained onset above the median-based threshold — the same algorithm
  // used by the calibration tool.  This is far more accurate than sampling a
  // live stream because the global median gives a proper noise floor even when
  // there is a loud orchestral intro.
  //
  // The fetch re-uses the browser's HTTP cache (the <audio> element will have
  // already downloaded the file), so in practice this causes no extra network
  // traffic.  introOffsetRef = detectedOnset − scaledLines[0].start.
  //
  // Skipped for YouTube-backed anthems: `youtubeIntroOffset` is used instead.
  useEffect(() => {
    if (!audioUrl || isYoutube) return;
    introOffsetRef.current = 0;
    let cancelled = false;

    (async () => {
      try {
        const resp = await fetch(audioUrl, { cache: "force-cache" });
        if (cancelled || !resp.ok) return;
        const arrayBuf = await resp.arrayBuffer();
        if (cancelled) return;

        // Decode in a temporary AudioContext (OfflineAudioContext needs length
        // up-front; we use a regular one just to decode the file).
        const tmpCtx = new AudioContext();
        let audioBuffer: AudioBuffer;
        try {
          audioBuffer = await tmpCtx.decodeAudioData(arrayBuf);
        } finally {
          tmpCtx.close().catch(() => {});
        }
        if (cancelled) return;

        const onset = await detectVocalOnset(audioBuffer);
        if (cancelled) return;

        // scaledLinesRef is always current; by the time decode+VAD finishes
        // (several seconds), loadedmetadata will have fired and duration will
        // be set, so scaledLines will already be proportionally scaled.
        const firstStart = scaledLinesRef.current?.[0]?.start ?? 0;
        const offset = onset - firstStart;
        // Only apply if meaningful (> 0.5s) and not absurdly large (> 90s).
        // A bad detection returning a very late onset would otherwise push
        // adj negative for the entire first half of the recording, making
        // all lyrics invisible.
        if (offset > 0.5 && offset < 90) {
          introOffsetRef.current = offset;
        }
        console.debug(`[onset] onset=${onset.toFixed(2)}s firstStart=${firstStart.toFixed(2)}s offset=${introOffsetRef.current.toFixed(2)}s`);
      } catch (e) {
        console.warn("[onset] offline analysis failed:", e);
        // introOffsetRef stays 0 — lyrics play at stored timestamps
      }
    })();

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl]);

  // ── YouTube player setup ────────────────────────────────────────────────
  useEffect(() => {
    if (!isYoutube || !anthem?.youtubeId) return;

    let cancelled = false;
    setIsLoadingAudio(true);
    setAudioError(null);

    // Apply the manually specified intro offset so vocal-relative line
    // timestamps stay accurate (same mechanism as offline VAD, but static).
    introOffsetRef.current = anthem.youtubeIntroOffset ?? 0;

    loadYTApi().then(() => {
      if (cancelled || !ytContainerRef.current) return;

      const mountDiv = document.createElement("div");
      ytContainerRef.current.appendChild(mountDiv);

      const player = new window.YT.Player(mountDiv, {
        videoId: anthem.youtubeId!,
        width: "100%",
        height: "195",
        playerVars: { rel: 0, modestbranding: 1 },
        events: {
          onReady: (e) => {
            if (cancelled) return;
            ytPlayerRef.current = e.target;
            setDuration(e.target.getDuration());
            setIsLoadingAudio(false);
          },
          onStateChange: (e) => {
            const YT_PLAYING = 1;
            const YT_ENDED = 0;
            if (e.data === YT_PLAYING) {
              setIsPlaying(true);
              if (ytPollRef.current) clearInterval(ytPollRef.current);
              ytPollRef.current = setInterval(() => {
                const p = ytPlayerRef.current;
                if (!p) return;
                const t = p.getCurrentTime();
                setCurrentTime(t);
                const lines = scaledLinesRef.current;
                if (!lines) return;
                const adj = t - introOffsetRef.current;
                let li = -1;
                for (let i = lines.length - 1; i >= 0; i--) {
                  if (adj >= lines[i].start) { li = i; break; }
                }
                setActiveLine(li);
                if (li >= 0) {
                  const words = lines[li].words;
                  if (words?.length) {
                    let wi = -1;
                    for (let i = words.length - 1; i >= 0; i--) {
                      if (adj >= words[i].t) { wi = i; break; }
                    }
                    setActiveWordIdx(wi);
                  } else {
                    setActiveWordIdx(-1);
                  }
                } else {
                  setActiveWordIdx(-1);
                }
              }, 200);
            } else {
              setIsPlaying(false);
              if (ytPollRef.current) { clearInterval(ytPollRef.current); ytPollRef.current = null; }
              if (e.data === YT_ENDED) {
                setActiveLine(-1);
                setActiveWordIdx(-1);
                setCurrentTime(0);
              }
            }
          },
          onError: () => {
            if (!cancelled) setAudioError("YouTube video could not be loaded.");
          },
        },
      });

      return () => {
        try { player.destroy(); } catch { /* ignore */ }
      };
    });

    return () => {
      cancelled = true;
      if (ytPollRef.current) { clearInterval(ytPollRef.current); ytPollRef.current = null; }
      if (ytPlayerRef.current) { try { ytPlayerRef.current.destroy(); } catch { /* ignore */ } ytPlayerRef.current = null; }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isYoutube, anthem]);

  // ── Native audio event handlers ─────────────────────────────────────────
  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const t = audio.currentTime;
    setCurrentTime(t);
    const lines = scaledLinesRef.current;
    if (!lines) return;
    const adj = t - introOffsetRef.current;
    let lineIdx = -1;
    for (let i = lines.length - 1; i >= 0; i--) {
      if (adj >= lines[i].start) { lineIdx = i; break; }
    }
    setActiveLine(lineIdx);
    if (lineIdx >= 0) {
      const words = lines[lineIdx].words;
      if (words?.length) {
        let wi = -1;
        for (let i = words.length - 1; i >= 0; i--) {
          if (adj >= words[i].t) { wi = i; break; }
        }
        setActiveWordIdx(wi);
      } else {
        setActiveWordIdx(-1);
      }
    } else {
      setActiveWordIdx(-1);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    setDuration(audioRef.current?.duration ?? 0);
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setActiveLine(-1);
    setActiveWordIdx(-1);
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

  // ── Background music: pause while anthem plays, resume when it stops ──────
  useEffect(() => {
    if (isPlaying) {
      gameAudio.pauseBackgroundMusic();
    } else {
      gameAudio.resumeBackgroundMusic();
    }
    return () => {
      // Always resume when the player is closed.
      gameAudio.resumeBackgroundMusic();
    };
  }, [isPlaying]);

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
    if (isYoutube) {
      const ytp = ytPlayerRef.current;
      if (!ytp) return;
      if (isPlaying) ytp.pauseVideo(); else ytp.playVideo();
      return;
    }
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
    if (isYoutube) {
      const ytp = ytPlayerRef.current;
      if (!ytp) return;
      ytp.seekTo(Math.max(0, Math.min(duration || Infinity, ytp.getCurrentTime() + seconds)), true);
      return;
    }
    const player = getActivePlayer();
    if (!player) return;
    player.currentTime = Math.max(0, Math.min(duration || Infinity, player.currentTime + seconds));
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    if (isYoutube) {
      const ytp = ytPlayerRef.current;
      if (!ytp || !duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      ytp.seekTo(fraction * duration, true);
      return;
    }
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
  const playerReady = (isYoutube ? !isLoadingAudio : !!audioUrl && !isLoadingAudio) && !audioError;
  const showLoading = isLoadingAudio || (!isYoutube && needsOgv && ogvLoading && playerReady);

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
            {/* YouTube player — shown instead of native audio when youtubeId is set */}
            {isYoutube && (
              <div ref={ytContainerRef} className="anthem-player__youtube" />
            )}

            {/* Native audio element — only used when NOT using ogv.js or YouTube */}
            {!isYoutube && !needsOgv && (
              <audio
                ref={audioRef}
                src={audioUrl!}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                onError={handleAudioError}
                preload="auto"
              />
            )}

            {/* Progress bar — hidden for YouTube (native controls handle seeking) */}
            {!isYoutube && <div
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
            </div>}

            {/* Time labels — hidden for YouTube */}
            {!isYoutube && <div className="anthem-player__time">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>}

            {/* Controls — hidden for YouTube (native controls handle play/pause) */}
            {!isYoutube && <div className="anthem-player__controls">
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
            </div>}

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
                        <span className="anthem-lyrics__original">
                          {line.words ? (
                            line.words.map((word, wi) => {
                              const wState = i === activeLine
                                ? wi === activeWordIdx ? "active" : wi < activeWordIdx ? "past" : "future"
                                : state === "past" ? "past" : "future";
                              return (
                                <span key={wi} className={`anthem-word anthem-word--${wState}`}>
                                  {word.w}{wi < line.words!.length - 1 ? " " : ""}
                                </span>
                              );
                            })
                          ) : line.text}
                        </span>
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
