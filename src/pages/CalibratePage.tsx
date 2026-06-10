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
  lines: string[];                // lyric line texts, in order
  lineMarks: number[];            // absolute video time (s) of each marked line
  markStatus: YTMark;
}

// Marks survive page reloads — calibrating 195 anthems takes multiple sessions.
const LINE_MARKS_STORAGE_KEY = "anthem-yt-line-marks-v1";

function loadStoredMarks(): Record<string, number[]> {
  try {
    return JSON.parse(localStorage.getItem(LINE_MARKS_STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function saveStoredMarks(marks: Record<string, number[]>) {
  try {
    localStorage.setItem(LINE_MARKS_STORAGE_KEY, JSON.stringify(marks));
  } catch { /* storage full or blocked — marks stay in memory */ }
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
  const [entries, setEntries] = useState<YTEntry[]>(() => {
    const stored = loadStoredMarks();
    return Object.entries(NATIONAL_ANTHEMS)
      .filter(([, a]) => !!a.youtubeId)
      .map(([code, a]) => {
        const lines = a.lines?.map(l => l.text) ?? [];
        const lineMarks = stored[code] ?? [];
        return {
          code,
          youtubeId: a.youtubeId!,
          title: a.title,
          currentOffset: a.youtubeIntroOffset ?? 0,
          lines,
          lineMarks,
          markStatus: (lines.length > 0 && lineMarks.length >= lines.length
            ? "marked"
            : "pending") as YTMark,
        };
      });
  });
  const [selectedCode, setSelectedCode] = useState<string>(
    () => Object.keys(NATIONAL_ANTHEMS).find(c => !!NATIONAL_ANTHEMS[c].youtubeId) ?? "",
  );
  const [filter, setFilter] = useState<"all" | "pending" | "marked" | "skipped">("all");

  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<InstanceType<typeof window.YT.Player> | null>(null);
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

  function persist(updated: YTEntry[]) {
    const stored: Record<string, number[]> = {};
    for (const e of updated) {
      if (e.lineMarks.length) stored[e.code] = e.lineMarks;
    }
    saveStoredMarks(stored);
  }

  function markNow() {
    const t = liveTime;
    if (t === null) return;
    setEntries(es => {
      const updated = es.map(e => {
        if (e.code !== selectedCode) return e;
        if (e.lineMarks.length >= e.lines.length) return e; // all lines done
        const lineMarks = [...e.lineMarks, Math.round(t * 100) / 100];
        return {
          ...e,
          lineMarks,
          markStatus: (lineMarks.length >= e.lines.length ? "marked" : "pending") as YTMark,
        };
      });
      persist(updated);
      return updated;
    });
  }

  function undoLastMark() {
    setEntries(es => {
      const updated = es.map(e => {
        if (e.code !== selectedCode || !e.lineMarks.length) return e;
        return { ...e, lineMarks: e.lineMarks.slice(0, -1), markStatus: "pending" as YTMark };
      });
      persist(updated);
      return updated;
    });
  }

  function resetMarks() {
    setEntries(es => {
      const updated = es.map(e =>
        e.code === selectedCode ? { ...e, lineMarks: [], markStatus: "pending" as YTMark } : e,
      );
      persist(updated);
      return updated;
    });
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

  function buildCalibrationJSON(): string {
    const out: Record<string, { introOffset: number; starts?: number[] }> = {};
    for (const e of entries) {
      if (!e.lineMarks.length) continue;
      const intro = e.lineMarks[0];
      const entry: { introOffset: number; starts?: number[] } = { introOffset: intro };
      // Per-line starts only when every line was marked — apply-calibration
      // rejects mismatched counts, but introOffset alone is still useful.
      if (e.lineMarks.length === e.lines.length) {
        entry.starts = e.lineMarks.map(t => Math.max(0, Math.round((t - intro) * 10) / 10));
      }
      out[e.code] = entry;
    }
    return JSON.stringify(out, null, 2);
  }

  function exportJSON() {
    const blob = new Blob([buildCalibrationJSON()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "anthem-yt-calibration.json"; a.click();
    URL.revokeObjectURL(url);
  }

  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  function copyJSON() {
    navigator.clipboard.writeText(buildCalibrationJSON()).then(
      () => { setCopyState("copied"); setTimeout(() => setCopyState("idle"), 2000); },
      () => { setCopyState("failed"); setTimeout(() => setCopyState("idle"), 2000); },
    );
  }

  const markedCount = entries.filter(e => e.markStatus === "marked").length;
  const pendingCount = entries.filter(e => e.markStatus === "pending").length;
  const visible = filteredEntries();

  return (
    <div>
      <p style={{ color: "#555", fontFamily: "sans-serif", fontSize: 13, marginBottom: 16 }}>
        Play the video. Each time the video shows the <strong>next lyric line</strong>, tap{" "}
        <em>Mark line</em> — the exact video time is recorded for that line. Mark every line,
        then move to the next anthem. Marks are saved in this browser automatically.<br />
        When done, tap <em>Copy JSON</em> and paste the result into the chat (or commit it with{" "}
        <code style={{ background: "#f5f5f5", padding: "2px 6px", borderRadius: 4 }}>
          node scripts/apply-calibration.mjs anthem-yt-calibration.json
        </code>
        ).
      </p>

      {/* Stats + export */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
        <span style={{ fontFamily: "sans-serif", fontSize: 13, alignSelf: "center" }}>
          {markedCount} marked · {pendingCount} pending
        </span>
        {entries.some(e => e.lineMarks.length > 0) && (
          <>
            <button onClick={copyJSON} style={btnStyle("green")}>
              {copyState === "copied" ? "✓ Copied!" : copyState === "failed" ? "✗ Copy failed" : "⧉ Copy JSON"}
            </button>
            <button onClick={exportJSON} style={btnStyle("green")}>
              ↓ Download JSON
            </button>
          </>
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
                {e.lineMarks.length > 0 && (
                  <span style={{ color: e.code === selectedCode ? "#cff" : "#888", marginLeft: 4 }}>
                    {e.lineMarks.length}/{e.lines.length}
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
                  disabled={!playerReady || liveTime === null || selected.lineMarks.length >= selected.lines.length}
                  style={{ ...btnStyle("blue"), fontSize: 15, padding: "12px 20px" }}
                >
                  {selected.lineMarks.length >= selected.lines.length
                    ? "✅ All lines marked"
                    : `⏱ Mark line ${selected.lineMarks.length + 1}/${selected.lines.length}`}
                </button>

                <button onClick={undoLastMark} disabled={!selected.lineMarks.length} style={btnStyle("orange")}>
                  ↩ Undo
                </button>

                <button onClick={resetMarks} disabled={!selected.lineMarks.length} style={btnStyle("gray")}>
                  ✕ Reset
                </button>

                <button onClick={skipEntry} style={btnStyle("orange")}>
                  ⏭ Skip
                </button>

                <button onClick={advanceToNext} style={btnStyle("gray")}>
                  → Next
                </button>
              </div>

              {/* Line checklist — next line to mark is highlighted */}
              <div style={{ marginTop: 12, border: "1px solid #ddd", borderRadius: 8, overflow: "hidden" }}>
                {selected.lines.map((text, i) => {
                  const isMarked = i < selected.lineMarks.length;
                  const isNext = i === selected.lineMarks.length;
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "center",
                        padding: "6px 12px",
                        fontFamily: "sans-serif",
                        fontSize: 13,
                        background: isNext ? "#fff8e1" : isMarked ? "#f1f8e9" : "#fff",
                        borderBottom: "1px solid #eee",
                        fontWeight: isNext ? 700 : 400,
                      }}
                    >
                      <span style={{ width: 24, textAlign: "center" }}>
                        {isMarked ? "✅" : isNext ? "👉" : `${i + 1}`}
                      </span>
                      <span style={{ flex: 1 }}>{text}</span>
                      {isMarked && (
                        <span style={{ fontFamily: "monospace", color: "#555", fontSize: 12 }}>
                          {selected.lineMarks[i].toFixed(2)}s
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {entries.some(e => e.lineMarks.length > 0) && (
                <div style={{ marginTop: 16, padding: 12, background: "#e8f5e9", borderRadius: 8, fontFamily: "sans-serif", fontSize: 12 }}>
                  When done, tap <em>Copy JSON</em> at the top and paste the result into the chat —
                  or download it and run:<br />
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
