import { useCallback, useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { NATIONAL_ANTHEMS, type AnthemData } from "../data/nationalAnthems";
import { gameAudio } from "../lib/gameAudio";
import "./NationalAnthemPlayer.css";

interface Props {
  countryCode: string;
  countryName: string;
  flagUrl: string | null;
  onClose: () => void;
  visible: boolean;
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
  // Quality controls. setPlaybackQuality is officially deprecated (YouTube
  // ultimately auto-selects), but requesting the highest available level still
  // nudges modern embeds away from the 360p default — see HIGHEST_QUALITY rule.
  getAvailableQualityLevels?: () => string[];
  getPlaybackQuality?: () => string;
  setPlaybackQuality?: (q: string) => void;
  setPlaybackQualityRange?: (min: string, max: string) => void;
};

// ── Anthem playback: autoplay + best resolution (HARD RULE) ──────────────────
// National anthems MUST start playing automatically when the player opens, and
// MUST request the highest available resolution. Both behaviours are mandated
// by the "National anthems must autoplay at the best resolution" rule in
// CLAUDE.md — do not weaken or remove them.
//
// `setPlaybackQuality` alone is a no-op on the modern IFrame API, so we ask the
// player for the levels it actually has (ordered highest → lowest) and pin the
// top one via both setPlaybackQualityRange and setPlaybackQuality. Combined
// with the `vq` playerVar this is the most reliable best-effort available.
function forceHighestQuality(player: YTPlayerInstance): void {
  try {
    const levels = player.getAvailableQualityLevels?.() ?? [];
    const best = levels[0] ?? "highres";
    player.setPlaybackQualityRange?.(best, best);
    player.setPlaybackQuality?.(best);
  } catch (err) {
    console.warn("[anthem] failed to set quality:", err);
  }
}

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
          onApiChange?: (e: { target: YTPlayerInstance }) => void;
          onPlaybackQualityChange?: (e: { data: string; target: YTPlayerInstance }) => void;
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

// Preload the YouTube IFrame API as soon as the module is imported.
// This ensures that when the user clicks play, the script is already cached
// and the promise resolves synchronously (preserving the user gesture).
if (typeof window !== "undefined") {
  loadYTApi();
}

// ── Component ───────────────────────────────────────────────────────────────

export const NationalAnthemPlayer = forwardRef<{ play: () => void }, Props>(
  ({ countryCode, countryName, flagUrl, onClose, visible }, ref) => {
    const anthem: AnthemData | undefined = NATIONAL_ANTHEMS[countryCode];

    const visibleRef = useRef(visible);
    visibleRef.current = visible;

    const isYoutube = !!(anthem?.youtubeId);
    const [isPlaying, setIsPlaying] = useState(false);

  // Native <audio> element ref (used when URL is MP3/WebM)
  const audioRef = useRef<HTMLAudioElement>(null);
  // OGV player instance ref (used when URL is OGG and browser can't play it natively)
  const ogvRef = useRef<OGVPlayerLike | null>(null);
  // YouTube player refs
  const ytContainerRef = useRef<HTMLDivElement>(null);
  const ytPlayerRef = useRef<YTPlayerInstance | null>(null);
  const triedUrls = useRef<Set<string>>(new Set());
  const retryCount = useRef(0);
  // Ensures autoplay fires only once per player mount, not on every re-render.
  const autoPlayedRef = useRef(false);
  // Records a play() intent that arrived before the YouTube player was ready
  // (fast click after selecting a country). onReady consumes it so the user's
  // tap still results in autoplay instead of being silently dropped — keeping
  // the "anthems must autoplay" hard rule working even during the load race.
  const pendingPlayRef = useRef(false);

  useImperativeHandle(ref, () => ({
    play() {
      if (isYoutube) {
        const ytp = ytPlayerRef.current;
        if (ytp) {
          try {
            ytp.playVideo();
          } catch (e) {
            console.error("[anthem] playVideo failed:", e);
          }
        } else {
          // Player not created yet — remember the intent for onReady.
          pendingPlayRef.current = true;
        }
      } else {
        const player = getActivePlayer();
        if (player) {
          player.play().then(() => setIsPlaying(true)).catch((e) => {
            console.warn("[anthem] native play failed:", e);
          });
        }
      }
    }
  }));

  // Reset autoplay flag when visible is set to false
  useEffect(() => {
    if (!visible) {
      autoPlayedRef.current = false;
    }
  }, [visible]);

  // Pause playback when the player becomes invisible
  useEffect(() => {
    if (!visible) {
      if (isYoutube) {
        const ytp = ytPlayerRef.current;
        if (ytp && isPlaying) {
          try {
            ytp.pauseVideo();
          } catch (e) {
            // ignore
          }
        }
      } else {
        const player = getActivePlayer();
        if (player && isPlaying) {
          try {
            player.pause();
            setIsPlaying(false);
          } catch (e) {
            // ignore
          }
        }
      }
    }
  }, [visible, isYoutube, isPlaying]);

  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState(true);
  const [audioError, setAudioError] = useState<string | null>(null);
  // true while ogv.js is loading or the OGV player is initialising
  const [ogvLoading, setOgvLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Lyrics are shown as a static fact-sheet — the anthem's full text, with no
  // playback-synced highlighting. The karaoke-style line/word syncing (caption
  // fetching + vocal-onset detection) was removed because it never aligned
  // reliably across all 195 anthems. Do not reintroduce it.

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
        setCurrentTime(player.currentTime);
      };
      const onLoadedMetadata = () => {
        setDuration(player.duration);
        setOgvLoading(false);
      };
      const onEnded = () => {
        setIsPlaying(false);
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

  // ── YouTube player setup ────────────────────────────────────────────────
  useEffect(() => {
    if (!isYoutube || !anthem?.youtubeId) return;

    let cancelled = false;
    setIsLoadingAudio(true);
    setAudioError(null);

    loadYTApi().then(() => {
      if (cancelled || !ytContainerRef.current) return;

      const mountDiv = document.createElement("div");
      ytContainerRef.current.appendChild(mountDiv);

      const player = new window.YT.Player(mountDiv, {
        videoId: anthem.youtubeId!,
        width: "100%",
        height: "195",
        // `vq: hd1080` requests the highest resolution at the URL level (the
        // setPlaybackQuality API is deprecated on its own); `autoplay: 1` is the
        // first line of defence for the autoplay rule — see CLAUDE.md.
        playerVars: { rel: 0, modestbranding: 1, autoplay: 1, vq: "hd1080", start: Math.max(0, Math.floor(anthem.youtubeIntroOffset ?? 0)) },
        events: {
          onReady: (e) => {
            if (cancelled) return;
            ytPlayerRef.current = e.target;
            setDuration(e.target.getDuration());
            setIsLoadingAudio(false);
            forceHighestQuality(e.target);
            // Autoplay rule: start as soon as the player is ready if the modal
            // is visible OR a play() tap arrived before the player existed.
            if (visibleRef.current || pendingPlayRef.current) {
              pendingPlayRef.current = false;
              e.target.playVideo();
            }
          },
          onStateChange: (e) => {
            const YT_PLAYING = 1;
            if (e.data === YT_PLAYING) {
              setIsPlaying(true);
              forceHighestQuality(e.target);
            } else {
              setIsPlaying(false);
            }
          },
          onError: () => {
            if (!cancelled) setAudioError("YouTube video could not be loaded.");
          },
          // If YouTube auto-downgrades the stream, re-request the best level so
          // the anthem keeps playing at the highest resolution available.
          onPlaybackQualityChange: (e) => {
            const best = e.target.getAvailableQualityLevels?.()?.[0];
            if (best && e.data !== best) forceHighestQuality(e.target);
          },
        },
      });

      return () => {
        try { player.destroy(); } catch { /* ignore */ }
      };
    });

    return () => {
      cancelled = true;
      if (ytPlayerRef.current) { try { ytPlayerRef.current.destroy(); } catch { /* ignore */ } ytPlayerRef.current = null; }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isYoutube, anthem]);

  // ── Native audio event handlers ─────────────────────────────────────────
  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    setDuration(audioRef.current?.duration ?? 0);
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
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

  // ── Autoplay when audio is ready ────────────────────────────────────────
  // The user already expressed intent by clicking "Play" in the country panel,
  // so we start playback as soon as the audio source is ready. YouTube uses
  // its own onReady callback instead.
  useEffect(() => {
    if (!visible) return;
    const ready = (isYoutube ? !isLoadingAudio : !!audioUrl && !isLoadingAudio) && !audioError;
    if (!ready || isYoutube || autoPlayedRef.current) return;
    if (needsOgv && ogvLoading) return;
    autoPlayedRef.current = true;
    const player = needsOgv ? ogvRef.current : audioRef.current;
    player?.play().then(() => setIsPlaying(true)).catch(() => {});
  }, [isYoutube, isLoadingAudio, audioUrl, audioError, needsOgv, ogvLoading, visible]);

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
    if (!visible) return;
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, visible]);

  // Lock body scroll
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [visible]);

  const progress = duration ? (currentTime / duration) * 100 : 0;
  const playerReady = (isYoutube ? !isLoadingAudio : !!audioUrl && !isLoadingAudio) && !audioError;
  const showLoading = isLoadingAudio || (!isYoutube && needsOgv && ogvLoading && playerReady);

  // When hidden: explicitly override all four sides from .anthem-modal's
  // `inset: 0` so the element is truly off-screen (480×300 at -9999,-9999)
  // rather than spanning the viewport. On iOS Safari, `backdrop-filter` on a
  // child element is composited before the parent's `opacity: 0` is applied,
  // meaning an `inset: 0` element whose `right`/`bottom` weren't overridden
  // would blur/darken the entire visible viewport even at opacity 0.
  const modalStyle: React.CSSProperties = visible ? {} : {
    position: "fixed",
    left: "-9999px",
    top: "-9999px",
    right: "auto",
    bottom: "auto",
    width: "480px",
    height: "300px",
    overflow: "hidden",
    opacity: 0,
    pointerEvents: "none",
  };

  return (
    <div className="anthem-modal" style={modalStyle} role="dialog" aria-modal="true" aria-label={`${countryName} national anthem`}>
      {/* Only render the backdrop (which has backdrop-filter: blur) when the
          modal is actually visible. This prevents the iOS Safari compositing
          bug where backdrop-filter on a child is applied before the parent's
          opacity:0, leaking the blur/overlay onto the visible page. */}
      {visible && <div className="anthem-modal__backdrop" onClick={onClose} aria-hidden="true" />}
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

        {isYoutube && (
          <div
            ref={ytContainerRef}
            className="anthem-player__youtube"
            style={(playerReady && visible) ? {} : {
              position: "absolute",
              left: "-9999px",
              top: "-9999px",
              width: "300px",
              height: "195px",
              opacity: 0.01,
              pointerEvents: "none",
              whiteSpace: "nowrap",
              border: 0,
            }}
          />
        )}

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

            {/* Lyrics — shown as static text, no playback-synced highlighting */}
            <div className="anthem-lyrics" aria-label="Lyrics">
              {anthem?.lines?.length ? (
                anthem.lines.map((line, i) => (
                  <div
                    key={i}
                    className={`anthem-lyrics__line${line.textEn ? " anthem-lyrics__line--dual" : ""}`}
                  >
                    <span className="anthem-lyrics__original">{line.text}</span>
                    {line.textEn && (
                      <span className="anthem-lyrics__translation">{line.textEn}</span>
                    )}
                  </div>
                ))
              ) : (
                <p className="anthem-lyrics__unavailable">
                  ♪ Lyrics not available for this anthem ♪
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
});

NationalAnthemPlayer.displayName = "NationalAnthemPlayer";
