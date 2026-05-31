/**
 * Anthem Timing Calibration Tool
 *
 * Visit /calibrate in a browser that can reach Wikimedia Commons.
 * The page silently downloads each anthem's audio, runs the VAD-based
 * onset detector, and accumulates calibrated start timestamps.
 *
 * When done, click "Export JSON" to download anthem-calibration.json,
 * then run:
 *
 *   node scripts/apply-calibration.mjs anthem-calibration.json
 *
 * to patch nationalAnthems.ts with the measured timestamps.
 */

import { useState, useCallback } from "react";
import { NATIONAL_ANTHEMS } from "../data/nationalAnthems";
import { calibrateAnthemTiming, resolveWikiUrl } from "../lib/anthemCalibrate";

type Status = "idle" | "running" | "done" | "error";

interface CountryResult {
  code: string;
  status: "pending" | "ok" | "failed" | "skipped";
  timestamps?: number[];
  error?: string;
  audioUrl?: string;
  duration?: number;
}

export default function CalibratePage() {
  const [results, setResults] = useState<Record<string, CountryResult>>(() => {
    const init: Record<string, CountryResult> = {};
    for (const code of Object.keys(NATIONAL_ANTHEMS)) {
      init[code] = { code, status: "pending" };
    }
    return init;
  });
  const [pageStatus, setPageStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState({ done: 0, total: 0, current: "" });
  const [filter, setFilter] = useState<"all" | "ok" | "failed" | "skipped">("all");

  const updateResult = useCallback((code: string, patch: Partial<CountryResult>) => {
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
        // 1. Resolve audio URL (YouTube-backed anthems are skipped — no wikiFile)
        if (!anthem.wikiFile) {
          updateResult(code, { status: "skipped", error: "YouTube source — calibration N/A" });
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

        // 2. Fetch audio
        const resp = await fetch(audioUrl);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const arrayBuffer = await resp.arrayBuffer();

        // 3. Decode
        const ctx = new AudioContext();
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
        const duration = audioBuffer.duration;
        ctx.close();

        // 4. Detect timing
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
    a.href = url;
    a.download = "anthem-calibration.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function retryFailed() {
    const failed = Object.values(results)
      .filter(r => r.status === "failed")
      .map(r => r.code);
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
    <div style={{ padding: "24px", maxWidth: 900, margin: "0 auto", fontFamily: "monospace" }}>
      <h1 style={{ fontSize: 22, marginBottom: 8 }}>Anthem Timing Calibration</h1>
      <p style={{ color: "#666", marginBottom: 20, fontFamily: "sans-serif", fontSize: 14 }}>
        Downloads each anthem from Wikimedia, analyses the audio with a vocal-range bandpass
        filter + speech-onset detector, and exports calibrated start timestamps.
        Run this in a browser with access to Wikimedia Commons (not a restricted server).
      </p>

      {/* Controls */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <button
          onClick={() => runCalibration()}
          disabled={pageStatus === "running"}
          style={btnStyle("blue")}
        >
          {pageStatus === "running" ? "⏳ Calibrating…" : "▶ Start Calibration"}
        </button>
        {counts.failed > 0 && pageStatus !== "running" && (
          <button onClick={retryFailed} style={btnStyle("orange")}>
            ↺ Retry {counts.failed} failed
          </button>
        )}
        {counts.ok > 0 && (
          <button onClick={exportJSON} style={btnStyle("green")}>
            ↓ Export JSON ({counts.ok} countries)
          </button>
        )}
      </div>

      {/* Progress bar */}
      {pageStatus === "running" && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ background: "#e0e0e0", borderRadius: 6, height: 10, overflow: "hidden" }}>
            <div
              style={{
                background: "#2196f3",
                height: "100%",
                width: `${(progress.done / progress.total) * 100}%`,
                transition: "width 0.3s",
              }}
            />
          </div>
          <div style={{ fontSize: 12, marginTop: 4, color: "#555" }}>
            {progress.done}/{progress.total} — processing{" "}
            <strong>{progress.current}</strong>
          </div>
        </div>
      )}

      {/* Summary chips */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {(["all", "ok", "failed", "skipped"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              ...chipStyle,
              background: filter === f ? "#333" : "#eee",
              color: filter === f ? "#fff" : "#333",
            }}
          >
            {f === "all" ? "All" : f === "ok" ? "✅ OK" : f === "failed" ? "❌ Failed" : "⏭ Skipped"}
            {" "}{f === "all" ? Object.keys(results).length : counts[f]}
          </button>
        ))}
      </div>

      {/* Results table */}
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={th}>Code</th>
            <th style={th}>Anthem</th>
            <th style={th}>Status</th>
            <th style={th}>Lines</th>
            <th style={th}>Duration</th>
            <th style={th}>First→Last start</th>
            <th style={th}>Error</th>
          </tr>
        </thead>
        <tbody>
          {visible.map(r => {
            const anthem = NATIONAL_ANTHEMS[r.code];
            const numLines = anthem?.lines?.length ?? 0;
            const first = r.timestamps?.[0];
            const last = r.timestamps?.[r.timestamps.length - 1];
            return (
              <tr key={r.code} style={{ borderBottom: "1px solid #eee" }}>
                <td style={td}><strong>{r.code}</strong></td>
                <td style={td}>{anthem?.title ?? "—"}</td>
                <td style={td}>
                  {r.status === "pending" ? "⏳" :
                   r.status === "ok" ? "✅" :
                   r.status === "failed" ? "❌" : "⏭"}
                </td>
                <td style={td}>{numLines}</td>
                <td style={td}>{r.duration ? `${r.duration.toFixed(1)}s` : "—"}</td>
                <td style={td}>
                  {first !== undefined && last !== undefined
                    ? `${first}s → ${last}s`
                    : "—"}
                </td>
                <td style={{ ...td, color: "#c00", fontSize: 11 }}>{r.error ?? ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {pageStatus === "done" && (
        <div style={{ marginTop: 20, padding: 16, background: "#e8f5e9", borderRadius: 8, fontFamily: "sans-serif" }}>
          <strong>Calibration complete!</strong> {counts.ok} anthems calibrated.
          Click <em>Export JSON</em> above, then run:
          <pre style={{ marginTop: 8, background: "#f5f5f5", padding: 10, borderRadius: 6, fontSize: 12 }}>
            node scripts/apply-calibration.mjs anthem-calibration.json
          </pre>
          to patch <code>src/data/nationalAnthems.ts</code> and commit the result.
        </div>
      )}
    </div>
  );
}

const btnStyle = (color: "blue" | "green" | "orange") => ({
  padding: "8px 16px",
  background: color === "blue" ? "#2196f3" : color === "green" ? "#4caf50" : "#ff9800",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: 14,
});

const chipStyle: React.CSSProperties = {
  padding: "4px 12px",
  borderRadius: 20,
  border: "none",
  cursor: "pointer",
  fontSize: 13,
};

const th: React.CSSProperties = {
  textAlign: "left",
  padding: "6px 8px",
  fontWeight: "bold",
  borderBottom: "2px solid #ddd",
};

const td: React.CSSProperties = {
  padding: "5px 8px",
  verticalAlign: "top",
};
