/**
 * Anthem Timing Calibration Tool
 *
 * Two tabs:
 *
 * ① Wikimedia Audio Calibration (original)
 *    Visit /calibrate in a browser that can reach Wikimedia Commons.
 *    Downloads audio, runs VAD onset detection, exports start timestamps.
 *    Run after export:  node scripts/apply-calibration.mjs anthem-calibration.json
 *
 * ② YouTube Visual Calibration
 *    For YouTube-backed lyric videos where the visual text timing may differ
 *    from the audio vocal-onset offset stored in youtubeIntroOffset.
 *    Watch each video, click "First lyric shown" at the exact frame, then
 *    export.  Alternatively run the automated script on a dev machine:
 *      node scripts/sync-youtube-captions.mjs
 *    then apply:
 *      node scripts/apply-calibration.mjs anthem-yt-calibration.json
 */

import { useState, useCallback, useRef, useEffect } from "react";
import { NATIONAL_ANTHEMS } from "../data/nationalAnthems";
import { calibrateAnthemTiming, resolveWikiUrl } from "../lib/anthemCalibrate";

type Tab = "wikimedia" | "youtube";
type Status = "idle" | "running" | "done" | "error";

// ── Wikimedia tab types ────────────────────────────────────────────────────
interface WikiResult {
  code: string;
  status: "pending" | "ok" | "failed" | "skipped";
  timestamps?: number[];
  error?: string;
  audioUrl?: string;
  duration?: number;
}

// ── YouTube tab types ──────────────────────────────────────────────────────
type YTMark = "pending" | "marked" | "skipped";

interface YTEntry {
  code: string;
  youtubeId: string;
  title: string;
  currentOffset: number;          // stored youtubeIntroOffset
  measuredOffset?: number;        // what the user marked
  markStatus: YTMark;
}

// Minimal YouTube IFrame types
declare global {
  interface Window {
    YT: {
      Player: new (el: HTMLElement | string, opts: Record<string, unknown>) => {
        playVideo(): void;
        pauseVideo(): void;
        getCurrentTime(): number;
        destroy(): void;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let _ytReady: Promise<void> | null = null;
function ensureYTApi(): Promise<void> {
  if (_ytReady) return _ytReady;
  _ytReady = new Promise(resolve => {
    if ((window.YT as unknown as { Player?: unknown })?.Player) { resolve(); return; }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { if (prev) prev(); resolve(); };
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(s);
  });
  return _ytReady;
}

// ── Root component ─────────────────────────────────────────────────────────
export default function CalibratePage() {
  const [tab, setTab] = useState<Tab>("youtube");

  return (
    <div style={{ padding: "24px", maxWidth: 960, margin: "0 auto", fontFamily: "monospace" }}>
      <h1 style={{ fontSize: 22, marginBottom: 4 }}>Anthem Timing Calibration</h1>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {(["youtube", "wikimedia"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "6px 18px",
              background: tab === t ? "#333" : "#ddd",
              color: tab === t ? "#fff" : "#333",
              border: "none",
              borderRadius: 20,
              cursor: "pointer",
              fontFamily: "monospace",
              fontSize: 13,
            }}
          >
            {t === "youtube" ? "▶ YouTube Visual" : "♪ Wikimedia Audio"}
          </button>
        ))}
      </div>

      {tab === "youtube" ? <YouTubeCalibration /> : <WikimediaCalibration />}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// YouTube Visual Calibration
// ═══════════════════════════════════════════════════════════════════════════

function YouTubeCalibration() {
  const allEntries: YTEntry[] = Object.entries(NATIONAL_ANTHEMS)
    .filter(([, a]) => !!a.youtubeId)
    .map(([code, a]) => ({
      code,
      youtubeId: a.youtubeId!,
      title: a.title,
      currentOffset: a.youtubeIntroOffset ?? 0,
      markStatus: "pending" as YTMark,
    }));

  const [entries, setEntries] = useState<YTEntry[]>(allEntries);
  const [selectedCode, setSelectedCode] = useState<string>(allEntries[0]?.code ?? "");
  const [filter, setFilter] = useState<"all" | "pending" | "marked" | "skipped">("all");

  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<ReturnType<typeof window.YT.Player> | null>(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [liveTime, setLiveTime] = useState<number | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const selected = entries.find(e => e.code === selectedCode);

  // Build / swap the YouTube player whenever selectedCode changes
  useEffect(() => {
    if (!playerContainerRef.current || !selected) return;
    setPlayerReady(false);
    setLiveTime(null);
    if (pollRef.current) clearInterval(pollRef.current);

    let cancelled = false;
    if (playerRef.current) { try { playerRef.current.destroy(); } catch { /**/ } playerRef.current = null; }

    const mountDiv = document.createElement("div");
    playerContainerRef.current.innerHTML = "";
    playerContainerRef.current.appendChild(mountDiv);

    ensureYTApi().then(() => {
      if (cancelled) return;
      playerRef.current = new window.YT.Player(mountDiv, {
        videoId: selected.youtubeId,
        width: "100%",
        height: "280",
        playerVars: { rel: 0, modestbranding: 1, autoplay: 0, cc_load_policy: 1 },
        events: {
          onReady: () => {
            if (cancelled) return;
            setPlayerReady(true);
            pollRef.current = setInterval(() => {
              try { setLiveTime(playerRef.current?.getCurrentTime() ?? null); } catch { /**/ }
            }, 250);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
      if (playerRef.current) { try { playerRef.current.destroy(); } catch { /**/ } playerRef.current = null; }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCode]);

  function markNow() {
    const t = liveTime;
    if (t === null) return;
    setEntries(es =>
      es.map(e => e.code === selectedCode
        ? { ...e, measuredOffset: Math.round(t * 100) / 100, markStatus: "marked" }
        : e,
      ),
    );
  }

  function skipEntry() {
    setEntries(es =>
      es.map(e => e.code === selectedCode ? { ...e, markStatus: "skipped" } : e),
    );
    advanceToNext();
  }

  function advanceToNext() {
    const visible = filteredEntries();
    const idx = visible.findIndex(e => e.code === selectedCode);
    const next = visible[idx + 1] ?? visible[0];
    if (next) setSelectedCode(next.code);
  }

  function filteredEntries() {
    return entries.filter(e =>
      filter === "all" || e.markStatus === filter,
    );
  }

  function exportJSON() {
    const out: Record<string, { introOffset: number }> = {};
    for (const e of entries) {
      if (e.markStatus === "marked" && e.measuredOffset !== undefined) {
        out[e.code] = { introOffset: e.measuredOffset };
      }
    }
    const blob = new Blob([JSON.stringify(out, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "anthem-yt-calibration.json"; a.click();
    URL.revokeObjectURL(url);
  }

  const markedCount = entries.filter(e => e.markStatus === "marked").length;
  const pendingCount = entries.filter(e => e.markStatus === "pending").length;
  const visible = filteredEntries();

  return (
    <div>
      <p style={{ color: "#555", fontFamily: "sans-serif", fontSize: 13, marginBottom: 16 }}>
        Play each YouTube lyric video. At the exact frame where the <strong>first lyric line</strong> appears,
        click <em>First lyric shown</em>. The current video time is recorded as the new{" "}
        <code>youtubeIntroOffset</code>.<br />
        Or run the automated script on a machine with internet access:<br />
        <code style={{ background: "#f5f5f5", padding: "2px 6px", borderRadius: 4 }}>
          node scripts/sync-youtube-captions.mjs
        </code>
      </p>

      {/* Stats + export */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
        <span style={{ fontFamily: "sans-serif", fontSize: 13, alignSelf: "center" }}>
          {markedCount} marked · {pendingCount} pending
        </span>
        {markedCount > 0 && (
          <button onClick={exportJSON} style={btnStyle("green")}>
            ↓ Export JSON ({markedCount})
          </button>
        )}
      </div>

      {/* Filter chips */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {(["all", "pending", "marked", "skipped"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} style={chipBtn(filter === f)}>
            {f === "all" ? `All (${entries.length})` : `${f} (${entries.filter(e => e.markStatus === f).length})`}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        {/* List pane */}
        <div style={{ width: 200, flexShrink: 0 }}>
          <div style={{ maxHeight: 480, overflowY: "auto", border: "1px solid #ccc", borderRadius: 6 }}>
            {visible.map(e => (
              <button
                key={e.code}
                onClick={() => setSelectedCode(e.code)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "6px 10px",
                  background: e.code === selectedCode ? "#2196f3" : "transparent",
                  color: e.code === selectedCode ? "#fff" : "#333",
                  border: "none",
                  borderBottom: "1px solid #eee",
                  cursor: "pointer",
                  fontFamily: "monospace",
                  fontSize: 12,
                }}
              >
                <span style={{ marginRight: 6 }}>
                  {e.markStatus === "marked" ? "✅" : e.markStatus === "skipped" ? "⏭" : "⏳"}
                </span>
                <strong>{e.code}</strong>
                {e.markStatus === "marked" && e.measuredOffset !== undefined && (
                  <span style={{ color: e.code === selectedCode ? "#cff" : "#888", marginLeft: 4 }}>
                    {e.measuredOffset}s
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Player pane */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {selected && (
            <>
              <div style={{ marginBottom: 8, fontFamily: "sans-serif" }}>
                <strong>{selected.code}</strong> — {selected.title}
                <span style={{ color: "#888", marginLeft: 8, fontSize: 12 }}>
                  stored offset: {selected.currentOffset}s
                </span>
              </div>

              <div
                ref={playerContainerRef}
                style={{ width: "100%", borderRadius: 8, overflow: "hidden", border: "2px solid #ccc", background: "#000" }}
              />

              <div style={{ marginTop: 12, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <span style={{
                  fontFamily: "monospace",
                  fontSize: 16,
                  background: "#f5f5f5",
                  padding: "4px 12px",
                  borderRadius: 6,
                  minWidth: 80,
                  textAlign: "center",
                }}>
                  {liveTime !== null ? `${liveTime.toFixed(2)}s` : "—"}
                </span>

                <button
                  onClick={markNow}
                  disabled={!playerReady || liveTime === null}
                  style={btnStyle("blue")}
                >
                  ⏱ First lyric shown
                </button>

                <button onClick={skipEntry} style={btnStyle("orange")}>
                  ⏭ Skip
                </button>

                <button onClick={advanceToNext} style={btnStyle("gray")}>
                  → Next
                </button>

                {selected.markStatus === "marked" && selected.measuredOffset !== undefined && (
                  <span style={{ color: "#2e7d32", fontFamily: "sans-serif", fontSize: 13 }}>
                    ✅ Marked at {selected.measuredOffset}s
                    {" "}(Δ {(selected.measuredOffset - selected.currentOffset).toFixed(2)}s from stored)
                  </span>
                )}
              </div>

              {markedCount > 0 && (
                <div style={{ marginTop: 16, padding: 12, background: "#e8f5e9", borderRadius: 8, fontFamily: "sans-serif", fontSize: 12 }}>
                  When done, click <em>Export JSON</em>, then run:<br />
                  <code style={{ display: "block", marginTop: 4, background: "#f5f5f5", padding: "4px 8px", borderRadius: 4 }}>
                    node scripts/apply-calibration.mjs anthem-yt-calibration.json
                  </code>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Wikimedia Audio Calibration (original)
// ═══════════════════════════════════════════════════════════════════════════

function WikimediaCalibration() {
  const [results, setResults] = useState<Record<string, WikiResult>>(() => {
    const init: Record<string, WikiResult> = {};
    for (const code of Object.keys(NATIONAL_ANTHEMS)) {
      init[code] = { code, status: "pending" };
    }
    return init;
  });
  const [pageStatus, setPageStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState({ done: 0, total: 0, current: "" });
  const [filter, setFilter] = useState<"all" | "ok" | "failed" | "skipped">("all");

  const updateResult = useCallback((code: string, patch: Partial<WikiResult>) => {
    setResults(r => ({ ...r, [code]: { ...r[code], ...patch } }));
  }, []);

  async function runCalibration(codes?: string[]) {
    const toProcess = (codes ?? Object.keys(NATIONAL_ANTHEMS)).filter(
      code => NATIONAL_ANTHEMS[code]?.lines && NATIONAL_ANTHEMS[code].lines!.length > 0,
    );
    setProgress({ done: 0, total: toProcess.length, current: "" });
    setPageStatus("running");

    for (const code of toProcess) {
      const anthem = NATIONAL_ANTHEMS[code];
      setProgress(p => ({ ...p, current: code }));
      updateResult(code, { status: "pending" });

      try {
        if (!anthem.wikiFile) {
          updateResult(code, { status: "skipped", error: "YouTube source — use YouTube Visual tab" });
          setProgress(p => ({ ...p, done: p.done + 1 }));
          continue;
        }
        const audioUrl = await resolveWikiUrl(anthem.wikiFile);
        if (!audioUrl) {
          updateResult(code, { status: "skipped", error: "URL not resolved" });
          setProgress(p => ({ ...p, done: p.done + 1 }));
          continue;
        }
        updateResult(code, { audioUrl });

        const resp = await fetch(audioUrl);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const arrayBuffer = await resp.arrayBuffer();

        const ctx = new AudioContext();
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
        const duration = audioBuffer.duration;
        ctx.close();

        const numLines = anthem.lines!.length;
        const timestamps = await calibrateAnthemTiming(audioBuffer, numLines);

        updateResult(code, { status: "ok", timestamps, duration });
      } catch (e) {
        updateResult(code, {
          status: "failed",
          error: e instanceof Error ? e.message : String(e),
        });
      }

      setProgress(p => ({ ...p, done: p.done + 1 }));
    }

    setPageStatus("done");
  }

  function exportJSON() {
    const out: Record<string, number[]> = {};
    for (const [code, r] of Object.entries(results)) {
      if (r.status === "ok" && r.timestamps) out[code] = r.timestamps;
    }
    const blob = new Blob([JSON.stringify(out, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "anthem-calibration.json"; a.click();
    URL.revokeObjectURL(url);
  }

  function retryFailed() {
    const failed = Object.values(results).filter(r => r.status === "failed").map(r => r.code);
    runCalibration(failed);
  }

  const counts = Object.values(results).reduce(
    (acc, r) => { acc[r.status]++; return acc; },
    { pending: 0, ok: 0, failed: 0, skipped: 0 } as Record<string, number>,
  );

  const visible = Object.values(results).filter(
    r => filter === "all" || r.status === filter,
  );

  return (
    <div>
      <p style={{ color: "#666", fontFamily: "sans-serif", fontSize: 13, marginBottom: 20 }}>
        Downloads each anthem from Wikimedia, analyses audio with a vocal-range bandpass
        filter + speech-onset detector, and exports calibrated start timestamps.
        Run in a browser with access to Wikimedia Commons.<br />
        <strong>YouTube-backed anthems are skipped</strong> — use the YouTube Visual tab for those.
      </p>

      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <button
          onClick={() => runCalibration()}
          disabled={pageStatus === "running"}
          style={btnStyle("blue")}
        >
          {pageStatus === "running" ? "⏳ Calibrating…" : "▶ Start Calibration"}
        </button>
        {counts.failed > 0 && pageStatus !== "running" && (
          <button onClick={retryFailed} style={btnStyle("orange")}>↺ Retry {counts.failed} failed</button>
        )}
        {counts.ok > 0 && (
          <button onClick={exportJSON} style={btnStyle("green")}>↓ Export JSON ({counts.ok})</button>
        )}
      </div>

      {pageStatus === "running" && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ background: "#e0e0e0", borderRadius: 6, height: 10, overflow: "hidden" }}>
            <div style={{ background: "#2196f3", height: "100%", width: `${(progress.done / progress.total) * 100}%`, transition: "width 0.3s" }} />
          </div>
          <div style={{ fontSize: 12, marginTop: 4, color: "#555" }}>
            {progress.done}/{progress.total} — <strong>{progress.current}</strong>
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {(["all", "ok", "failed", "skipped"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} style={chipBtn(filter === f)}>
            {f === "all" ? "All" : f === "ok" ? "✅ OK" : f === "failed" ? "❌ Failed" : "⏭ Skipped"}
            {" "}{f === "all" ? Object.keys(results).length : counts[f]}
          </button>
        ))}
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={th}>Code</th><th style={th}>Anthem</th><th style={th}>Status</th>
            <th style={th}>Lines</th><th style={th}>Duration</th><th style={th}>First→Last</th><th style={th}>Error</th>
          </tr>
        </thead>
        <tbody>
          {visible.map(r => {
            const anthem = NATIONAL_ANTHEMS[r.code];
            const first = r.timestamps?.[0];
            const last = r.timestamps?.[r.timestamps!.length - 1];
            return (
              <tr key={r.code} style={{ borderBottom: "1px solid #eee" }}>
                <td style={td}><strong>{r.code}</strong></td>
                <td style={td}>{anthem?.title ?? "—"}</td>
                <td style={td}>{r.status === "pending" ? "⏳" : r.status === "ok" ? "✅" : r.status === "failed" ? "❌" : "⏭"}</td>
                <td style={td}>{anthem?.lines?.length ?? 0}</td>
                <td style={td}>{r.duration ? `${r.duration.toFixed(1)}s` : "—"}</td>
                <td style={td}>{first !== undefined && last !== undefined ? `${first}s → ${last}s` : "—"}</td>
                <td style={{ ...td, color: "#c00", fontSize: 11 }}>{r.error ?? ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {pageStatus === "done" && (
        <div style={{ marginTop: 20, padding: 16, background: "#e8f5e9", borderRadius: 8, fontFamily: "sans-serif" }}>
          <strong>Done!</strong> {counts.ok} calibrated. Export JSON then run:
          <pre style={{ marginTop: 8, background: "#f5f5f5", padding: 10, borderRadius: 6, fontSize: 12 }}>
            node scripts/apply-calibration.mjs anthem-calibration.json
          </pre>
        </div>
      )}
    </div>
  );
}

// ── Shared styles ──────────────────────────────────────────────────────────
const btnStyle = (color: "blue" | "green" | "orange" | "gray") => ({
  padding: "7px 14px",
  background: color === "blue" ? "#2196f3" : color === "green" ? "#4caf50" : color === "orange" ? "#ff9800" : "#9e9e9e",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: 13,
  fontFamily: "monospace",
});

const chipBtn = (active: boolean): React.CSSProperties => ({
  padding: "4px 12px",
  borderRadius: 20,
  border: "none",
  cursor: "pointer",
  fontSize: 13,
  background: active ? "#333" : "#eee",
  color: active ? "#fff" : "#333",
  fontFamily: "monospace",
});

const th: React.CSSProperties = { textAlign: "left", padding: "6px 8px", fontWeight: "bold", borderBottom: "2px solid #ddd" };
const td: React.CSSProperties = { padding: "5px 8px", verticalAlign: "top" };
