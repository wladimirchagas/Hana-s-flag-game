/**
 * Anthem timing calibration — audio analysis utilities.
 *
 * Uses OfflineAudioContext to bandpass-filter an audio buffer to the
 * vocal frequency range (200–4500 Hz), then detects speech-onset events
 * by looking for significant rises in RMS energy after periods of lower
 * energy.  The resulting onset timestamps are assigned to lyrics lines
 * in order.
 *
 * Falls back to linear interpolation when onset detection finds fewer
 * segments than there are lyrics lines (continuous orchestral texture).
 */

const VOCAL_LO = 200;   // Hz — below this is bass/percussion
const VOCAL_HI = 4500;  // Hz — above this is high harmonics / noise
const FRAME_MS = 80;    // analysis window in milliseconds
const SMOOTH_FRAMES = 5; // moving-average smoothing radius

/**
 * Bandpass-filter the audio buffer to the vocal range using an
 * OfflineAudioContext, then return the RMS energy array (one value per
 * FRAME_MS window) of the filtered mono signal.
 */
async function vocalRMS(
  audioBuffer: AudioBuffer,
  sampleRate: number,
): Promise<Float32Array> {
  const frameSize = Math.round((FRAME_MS / 1000) * sampleRate);
  const nFrames = Math.ceil(audioBuffer.length / frameSize);

  // Render through bandpass filter offline
  const offCtx = new OfflineAudioContext(1, audioBuffer.length, sampleRate);
  const src = offCtx.createBufferSource();
  src.buffer = audioBuffer;

  const hp = offCtx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = VOCAL_LO;
  hp.Q.value = 0.7;

  const lp = offCtx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = VOCAL_HI;
  lp.Q.value = 0.7;

  src.connect(hp);
  hp.connect(lp);
  lp.connect(offCtx.destination);
  src.start();

  const filtered = await offCtx.startRendering();
  const data = filtered.getChannelData(0);

  // Compute RMS per frame
  const rms = new Float32Array(nFrames);
  for (let f = 0; f < nFrames; f++) {
    const start = f * frameSize;
    const end = Math.min(start + frameSize, data.length);
    let sum = 0;
    for (let i = start; i < end; i++) sum += data[i] * data[i];
    rms[f] = Math.sqrt(sum / (end - start));
  }

  return rms;
}

/** Simple moving-average smoothing */
function smooth(arr: Float32Array, radius: number): Float32Array {
  const out = new Float32Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    let sum = 0, count = 0;
    for (let j = Math.max(0, i - radius); j <= Math.min(arr.length - 1, i + radius); j++) {
      sum += arr[j]; count++;
    }
    out[i] = sum / count;
  }
  return out;
}

/**
 * Detect speech-onset timestamps (seconds) from an RMS energy curve.
 *
 * An onset is a frame where smoothed energy rises above
 * `riseThreshold × median_energy` after at least `minSilenceMs` of
 * lower energy.
 */
function detectOnsets(
  rms: Float32Array,
  frameDurationSec: number,
  minSilenceMs = 600,
  riseThreshold = 2.0,
): number[] {
  const smoothed = smooth(rms, SMOOTH_FRAMES);

  // Median energy (robust baseline)
  const sorted = Float32Array.from(smoothed).sort();
  const median = sorted[Math.floor(sorted.length / 2)];
  const threshold = median * riseThreshold;

  const minSilenceFrames = Math.ceil(minSilenceMs / 1000 / frameDurationSec);
  const onsets: number[] = [];
  let silenceRun = minSilenceFrames; // start primed so first onset can trigger

  for (let i = 0; i < smoothed.length; i++) {
    if (smoothed[i] < threshold) {
      silenceRun++;
    } else {
      if (silenceRun >= minSilenceFrames) {
        onsets.push(i * frameDurationSec);
      }
      silenceRun = 0;
    }
  }

  return onsets;
}

/**
 * Find the first frame where energy is "substantial" (> 30% of median)
 * — used to skip silent intros.
 */
function firstActiveFrame(rms: Float32Array, frameDurationSec: number): number {
  const sorted = Float32Array.from(rms).sort();
  const median = sorted[Math.floor(sorted.length / 2)];
  const actThresh = median * 0.3;
  for (let i = 0; i < rms.length; i++) {
    if (rms[i] > actThresh) return i * frameDurationSec;
  }
  return 0;
}

/**
 * Given an AudioBuffer and the number of lyric lines, return an array
 * of `numLines` start-timestamps (in seconds).
 *
 * Strategy:
 *  1. Bandpass-filter to vocal range and compute RMS.
 *  2. Run onset detection with progressively relaxed thresholds until
 *     we get at least `numLines` onsets.
 *  3. If we have exactly `numLines` onsets, use them directly.
 *  4. If we have more, pick the `numLines` that are most evenly spaced
 *     (greedy first-fit from the detected set).
 *  5. If we still can't reach `numLines`, fill gaps by linear
 *     interpolation between neighbouring onsets.
 */
export async function calibrateAnthemTiming(
  audioBuffer: AudioBuffer,
  numLines: number,
): Promise<number[]> {
  if (numLines === 0) return [];

  const sr = audioBuffer.sampleRate;
  const frameDur = FRAME_MS / 1000;
  const duration = audioBuffer.duration;

  const rms = await vocalRMS(audioBuffer, sr);

  // Try progressively lower thresholds to get enough onsets
  let onsets: number[] = [];
  for (const thresh of [2.5, 2.0, 1.6, 1.3, 1.1]) {
    onsets = detectOnsets(rms, frameDur, 500, thresh);
    if (onsets.length >= numLines) break;
  }

  // If onset count matches, we're done
  if (onsets.length === numLines) return onsets.map(s => Math.round(s * 10) / 10);

  // Too many onsets: pick the best subset
  if (onsets.length > numLines) {
    // Greedy: keep onsets that maintain at least minGap spacing,
    // preferring those nearest to expected equal-spaced positions
    const firstActive = firstActiveFrame(rms, frameDur);
    const lastActive = duration - 2;
    const ideal = Array.from({ length: numLines }, (_, i) =>
      firstActive + (i / (numLines - 1 || 1)) * (lastActive - firstActive),
    );
    const picked: number[] = [];
    let prevTime = -999;
    const minGap = (duration - firstActive) / (numLines * 2);
    for (const target of ideal) {
      // Find the onset closest to `target` that's far enough from `prevTime`
      const candidates = onsets.filter(t => t - prevTime >= minGap);
      if (!candidates.length) continue;
      const best = candidates.reduce((a, b) =>
        Math.abs(a - target) < Math.abs(b - target) ? a : b,
      );
      picked.push(best);
      prevTime = best;
    }
    if (picked.length === numLines) return picked.map(s => Math.round(s * 10) / 10);
  }

  // Fallback: interpolate between what we have or use linear spacing
  const base = onsets.length > 0 ? onsets : [firstActiveFrame(rms, frameDur)];
  const result: number[] = [];
  const firstActive = base[0];
  const spacing = (duration - 3 - firstActive) / (numLines - 1 || 1);

  for (let i = 0; i < numLines; i++) {
    if (i < base.length) {
      result.push(base[i]);
    } else {
      const prev = result[i - 1] ?? firstActive;
      result.push(prev + spacing);
    }
  }

  return result.map(s => Math.round(Math.min(s, duration - 2) * 10) / 10);
}

/**
 * Resolve the direct Wikimedia media URL for a given file title.
 * Runs inside the browser (uses `fetch` with CORS origin=*).
 */
export async function resolveWikiUrl(wikiFile: string): Promise<string | null> {
  const title = wikiFile.startsWith("File:") ? wikiFile : `File:${wikiFile}`;
  const url =
    `https://commons.wikimedia.org/w/api.php` +
    `?action=query&titles=${encodeURIComponent(title)}` +
    `&prop=imageinfo&iiprop=url&format=json&origin=*`;

  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const pages = data?.query?.pages ?? {};
  const page = Object.values(pages)[0] as Record<string, unknown>;
  if (!page || "missing" in page) return null;
  const ii = (page.imageinfo as { url?: string }[] | undefined)?.[0];
  return ii?.url ?? null;
}
