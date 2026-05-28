#!/usr/bin/env python3
"""
Whisper-based national anthem timing calibration.

For each anthem in nationalAnthems.ts that has lyrics:
  1. Resolve the Wikimedia Commons audio URL
  2. Download the audio file
  3. Convert to 16 kHz mono WAV via ffmpeg
  4. Transcribe with openai-whisper (word-level timestamps, original language)
  5. Position-aware forced alignment: slide forward through the word list,
     matching each lyric line's anchor words to get its exact start time
  6. Write anthem-calibration.json (same format apply-calibration.mjs expects)

Requirements:
    pip install openai-whisper torch requests
    apt-get install ffmpeg   (or brew install ffmpeg)

Usage:
    # All anthems, small model (fast, decent accuracy):
    python3 scripts/whisper-calibrate.py

    # Higher accuracy (slower):
    python3 scripts/whisper-calibrate.py --model medium

    # Just a few countries to test:
    python3 scripts/whisper-calibrate.py --country BR,US,FR,DE

    # Resume an interrupted run:
    python3 scripts/whisper-calibrate.py --resume

Then apply the result:
    node scripts/apply-calibration.mjs anthem-calibration.json
"""

import argparse
import json
import os
import re
import subprocess
import sys
import tempfile
import time
import unicodedata
from pathlib import Path

# ── Third-party imports (all pre-installed in the repo environment) ──────────
try:
    import requests
except ImportError:
    sys.exit("requests not found — run: pip install requests")

try:
    import whisper
except ImportError:
    sys.exit("openai-whisper not found — run: pip install openai-whisper")

# ── Paths ────────────────────────────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).parent.resolve()
DATA_FILE   = SCRIPT_DIR.parent / "src" / "data" / "nationalAnthems.ts"
WIKI_API    = "https://commons.wikimedia.org/w/api.php"
HEADERS     = {"User-Agent": "AnthemCalibrator/1.0 (hana-flag-game; contact@example.com)"}

# ── Text normalisation ───────────────────────────────────────────────────────

def _normalize(text: str) -> str:
    """Lowercase, strip diacritics and punctuation for fuzzy matching."""
    text = unicodedata.normalize("NFD", text)
    text = "".join(c for c in text if unicodedata.category(c) != "Mn")
    text = text.lower()
    text = re.sub(r"[^\w\s]", " ", text)
    return re.sub(r"\s+", " ", text).strip()


# Common stopwords across anthem languages — skip these when picking anchor words
_STOPWORDS = {
    # English
    "the", "a", "an", "of", "and", "in", "on", "to", "is", "are", "we", "our",
    # Portuguese
    "de", "do", "da", "dos", "das", "o", "a", "os", "as", "e", "em",
    "se", "no", "na", "ao", "um", "uma",
    # French
    "le", "la", "les", "du", "des", "et", "en", "il", "un", "une",
    # Spanish
    "el", "lo", "los", "y", "en", "del", "al", "un",
    # German
    "das", "die", "der", "und", "ein", "im", "zu", "ist", "von", "dem",
    # Generic short words
    "et", "al", "di", "il", "si", "ne", "se",
}


def _anchor_words(text: str, n: int = 4) -> list[str]:
    """Return up to n significant (non-stopword) words from a lyric line."""
    words = _normalize(text).split()
    sig = [w for w in words if w not in _STOPWORDS and len(w) > 2]
    return sig[:n] if sig else words[:2]


# ── Wikimedia helpers ────────────────────────────────────────────────────────

def resolve_wiki_url(wiki_file: str, retries: int = 3) -> str | None:
    """Return the direct media URL for a Wikimedia Commons file title."""
    title = wiki_file if wiki_file.startswith("File:") else f"File:{wiki_file}"
    for attempt in range(retries):
        try:
            r = requests.get(WIKI_API, params={
                "action": "query", "titles": title,
                "prop": "imageinfo", "iiprop": "url", "format": "json",
            }, headers=HEADERS, timeout=20)
            r.raise_for_status()
            pages = r.json()["query"]["pages"]
            page  = next(iter(pages.values()))
            if "missing" in page:
                return None
            return page["imageinfo"][0]["url"]
        except Exception as exc:
            if attempt < retries - 1:
                time.sleep(2 ** attempt)
            else:
                print(f"    ⚠  resolve_wiki_url failed: {exc}")
    return None


def download_audio(url: str, dest: Path, retries: int = 3) -> bool:
    """Download an audio file to *dest*."""
    for attempt in range(retries):
        try:
            r = requests.get(url, headers=HEADERS, timeout=120, stream=True)
            r.raise_for_status()
            with open(dest, "wb") as fh:
                for chunk in r.iter_content(chunk_size=65536):
                    fh.write(chunk)
            return True
        except Exception as exc:
            if attempt < retries - 1:
                time.sleep(2 ** attempt)
            else:
                print(f"    ⚠  download failed: {exc}")
    return False


def convert_to_wav(src: Path, dst: Path) -> bool:
    """Convert *src* to 16 kHz mono WAV at *dst* using ffmpeg."""
    try:
        proc = subprocess.run(
            ["ffmpeg", "-y", "-i", str(src),
             "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", str(dst)],
            capture_output=True, timeout=180,
        )
        return proc.returncode == 0
    except Exception as exc:
        print(f"    ⚠  ffmpeg conversion failed: {exc}")
        return False


# ── nationalAnthems.ts parser ────────────────────────────────────────────────

def parse_anthems(ts_path: Path) -> dict:
    """
    Parse src/data/nationalAnthems.ts and return:
        {code: {wikiFile, language, lines: [{text, start}]}}
    Only countries that already have a lines[] array are included.
    """
    source = ts_path.read_text(encoding="utf-8")
    result = {}

    # Each top-level entry looks like:   XX: { ... }
    # We use a simple brace-depth scan to extract each block.
    entry_re = re.compile(r"\n  ([A-Z]{2}): \{")
    for m in entry_re.finditer(source):
        code  = m.group(1)
        start = m.start() + 1          # position of "  XX: {"
        depth = 0
        end   = start
        for i, ch in enumerate(source[start:], start):
            if ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    end = i + 1
                    break
        block = source[start:end]

        wf = re.search(r'wikiFile:\s*["\']([^"\']+)["\']', block)
        if not wf:
            continue
        wiki_file = wf.group(1)

        lang_m = re.search(r'language:\s*["\']([^"\']+)["\']', block)
        language = lang_m.group(1) if lang_m else None

        # Find lines: [ ... ]
        lines_m = re.search(r'lines:\s*\[', block)
        if not lines_m:
            continue

        ls = lines_m.end()
        depth2 = 1
        le = ls
        for i, ch in enumerate(block[ls:], ls):
            if ch == "[":
                depth2 += 1
            elif ch == "]":
                depth2 -= 1
                if depth2 == 0:
                    le = i
                    break
        lines_block = block[ls:le]

        line_re = re.compile(
            r'\{\s*text:\s*"((?:[^"\\]|\\.)*)"\s*(?:,.*?)?start:\s*([\d.]+)',
            re.DOTALL,
        )
        lines = [
            {"text": lm.group(1), "start": float(lm.group(2))}
            for lm in line_re.finditer(lines_block)
        ]
        if lines:
            result[code] = {"wikiFile": wiki_file, "language": language, "lines": lines}

    return result


# ── Forced alignment ─────────────────────────────────────────────────────────

def _word_similarity(a: str, b: str) -> float:
    """Simple similarity score in [0,1] between two normalised word strings."""
    if a == b:
        return 1.0
    if len(a) < 2 or len(b) < 2:
        return 0.0
    if a in b or b in a:
        return 0.8
    # Character overlap (Jaccard on bigrams)
    def bigrams(s):
        return set(s[i:i+2] for i in range(len(s)-1))
    ba, bb = bigrams(a), bigrams(b)
    if not ba or not bb:
        return 0.0
    return len(ba & bb) / len(ba | bb)


def align_lyrics(
    lyrics_lines: list[dict],
    words: list[dict],           # [{word, start, end}, ...]
    min_anchor_score: float = 1.5,
) -> list[float]:
    """
    Position-aware forced alignment of lyric lines to Whisper word timestamps.

    For each line we pick up to 4 significant anchor words and search forward
    through the word list (never backward — anthems are sequential).  We score
    each candidate window by how many anchor words match (with fuzzy scoring)
    and pick the best position.

    Any line that can't be aligned is filled by linear interpolation between
    its neighbours.
    """
    if not words:
        return [line["start"] for line in lyrics_lines]   # fall back to stored data

    norm_words = [(_normalize(w["word"]), w["start"]) for w in words]
    n          = len(norm_words)
    timestamps: list[float | None] = []
    search_idx = 0    # never look before this position

    for line in lyrics_lines:
        anchors = _anchor_words(line["text"])

        best_ts    = None
        best_score = -1.0
        best_end   = search_idx

        # Limit the search window so one bad line doesn't poison everything
        # after it.  Look at most 60 s of audio ahead of the last matched time.
        last_ts = timestamps[-1] if timestamps and timestamps[-1] is not None else 0.0
        search_limit = next(
            (i for i in range(search_idx, n) if norm_words[i][1] > last_ts + 60),
            n,
        )

        for i in range(search_idx, search_limit):
            score      = 0.0
            matched_ts = None
            j          = i

            for anchor in anchors:
                best_w_score = 0.0
                best_w_idx   = -1
                # Look ahead up to 8 words for each anchor
                for k in range(j, min(j + 8, n)):
                    ws = _word_similarity(anchor, norm_words[k][0])
                    if ws > best_w_score:
                        best_w_score = ws
                        best_w_idx   = k
                if best_w_score >= 0.6:
                    if matched_ts is None:
                        matched_ts = norm_words[best_w_idx][1]
                    score += best_w_score
                    j = best_w_idx + 1
                else:
                    break   # gap too large — stop scoring this window

            if score > best_score and matched_ts is not None:
                best_score = score
                best_ts    = matched_ts
                best_end   = i + 1
                if score >= len(anchors) * 0.9:
                    break   # excellent match — stop early

        if best_ts is not None and best_score >= min_anchor_score:
            timestamps.append(round(best_ts, 1))
            search_idx = best_end
        else:
            timestamps.append(None)   # will be interpolated

    # Interpolate / extrapolate missing timestamps
    total = len(timestamps)
    for i, t in enumerate(timestamps):
        if t is not None:
            continue
        prev_ts = next((timestamps[j] for j in range(i - 1, -1, -1)
                        if timestamps[j] is not None), 0.0)
        next_idx = next((j for j in range(i + 1, total)
                         if timestamps[j] is not None), None)
        if next_idx is not None:
            prev_idx = next((j for j in range(i - 1, -1, -1)
                             if timestamps[j] is not None), None)
            if prev_idx is not None:
                gap_time = timestamps[next_idx] - timestamps[prev_idx]
                gap_idx  = next_idx - prev_idx
                timestamps[i] = round(
                    timestamps[prev_idx] + gap_time * (i - prev_idx) / gap_idx, 1
                )
            else:
                # Before first matched line — space evenly
                spacing = timestamps[next_idx] / (next_idx + 1) if next_idx else 3.0
                timestamps[i] = round(max(0.0, timestamps[next_idx] - spacing * (next_idx - i)), 1)
        else:
            timestamps[i] = round(prev_ts + 5.0, 1)

    return [t for t in timestamps]   # all non-None now


# ── Per-anthem pipeline ──────────────────────────────────────────────────────

def calibrate_anthem(
    code: str,
    data: dict,
    model,
    tmpdir: Path,
    verbose: bool = False,
) -> list[float] | None:
    """Download → convert → transcribe → align for one anthem."""
    wiki_file = data["wikiFile"]
    lines     = data["lines"]
    language  = data.get("language")   # hint to Whisper

    # 1. Resolve URL
    url = resolve_wiki_url(wiki_file)
    if not url:
        print(f"  ✗ URL not resolved")
        return None
    filename = url.split("?")[0].rsplit("/", 1)[-1]
    print(f"  ↓ {filename}")

    # 2. Download
    ext        = Path(url.split("?")[0]).suffix.lower() or ".ogg"
    audio_path = tmpdir / f"{code}{ext}"
    if not download_audio(url, audio_path):
        return None

    # 3. Convert to 16 kHz mono WAV
    wav_path = tmpdir / f"{code}.wav"
    if not convert_to_wav(audio_path, wav_path):
        return None
    audio_path.unlink(missing_ok=True)

    # 4. Transcribe
    print(f"  🎙  Transcribing ({language or 'auto'})…", end="", flush=True)
    t0 = time.time()
    try:
        result = model.transcribe(
            str(wav_path),
            word_timestamps=True,
            task="transcribe",
            language=language,        # None → auto-detect
            verbose=False,
        )
    except Exception as exc:
        print(f"\n  ✗ Transcription error: {exc}")
        return None
    finally:
        wav_path.unlink(missing_ok=True)

    elapsed = time.time() - t0
    print(f" {elapsed:.0f}s")

    # Flatten segment words
    words: list[dict] = []
    for seg in result.get("segments", []):
        for w in seg.get("words", []):
            if isinstance(w, dict) and "start" in w:
                words.append({"word": w["word"], "start": w["start"], "end": w["end"]})

    if not words:
        print(f"  ✗ No word timestamps returned by Whisper")
        return None

    if verbose:
        print(f"  ℹ  {len(words)} words, duration ~{words[-1]['end']:.0f}s")
        for w in words[:10]:
            print(f"       {w['start']:.2f}s  {w['word']!r}")

    # 5. Forced alignment
    timestamps = align_lyrics(lines, words)
    if len(timestamps) != len(lines):
        print(f"  ✗ Alignment length mismatch ({len(timestamps)} vs {len(lines)} lines)")
        return None

    print(f"  ✓ {len(timestamps)} lines: {timestamps[0]}s → {timestamps[-1]}s")
    return timestamps


# ── Main ─────────────────────────────────────────────────────────────────────

def main() -> None:
    p = argparse.ArgumentParser(
        description="Calibrate anthem lyrics timing with Whisper word timestamps.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    p.add_argument("--model",   default="small",
                   choices=["tiny", "base", "small", "medium", "large", "large-v2", "large-v3"],
                   help="Whisper model (default: small; use medium/large for best accuracy)")
    p.add_argument("--country", default="",
                   help="Comma-separated ISO codes to process, e.g. BR,US,FR")
    p.add_argument("--output",  default="anthem-calibration.json",
                   help="Output path for calibration JSON (default: anthem-calibration.json)")
    p.add_argument("--resume",  action="store_true",
                   help="Skip countries already present in --output")
    p.add_argument("--verbose", action="store_true",
                   help="Print first 10 transcribed words per anthem")
    args = p.parse_args()

    # Load partial result if resuming
    calibration: dict[str, list[float]] = {}
    if args.resume and Path(args.output).exists():
        calibration = json.loads(Path(args.output).read_text())
        print(f"Resuming: {len(calibration)} countries already calibrated.")

    # Parse anthem data
    print(f"Parsing {DATA_FILE.name}…")
    anthems = parse_anthems(DATA_FILE)
    print(f"  Found {len(anthems)} countries with lyrics.")

    # Filter
    if args.country:
        wanted  = {c.strip().upper() for c in args.country.split(",")}
        anthems = {k: v for k, v in anthems.items() if k in wanted}
        print(f"  Filtering to: {sorted(anthems)}")

    if args.resume:
        anthems = {k: v for k, v in anthems.items() if k not in calibration}
        print(f"  {len(anthems)} remaining after resume filter.")

    if not anthems:
        print("Nothing to do.")
        return

    # Load model once
    print(f"\nLoading Whisper '{args.model}' model…")
    model = whisper.load_model(args.model)
    print("  Model ready.\n")

    total   = len(anthems)
    success = 0
    failed  = []

    with tempfile.TemporaryDirectory() as tmpdir:
        tmp = Path(tmpdir)

        for idx, (code, data) in enumerate(anthems.items(), 1):
            print(f"{'─' * 54}")
            print(f"[{idx:3d}/{total}] {code}  ({data['wikiFile']})")

            try:
                ts = calibrate_anthem(code, data, model, tmp, verbose=args.verbose)
                if ts and len(ts) == len(data["lines"]):
                    calibration[code] = ts
                    success += 1
                    # Persist after every anthem so a crash loses at most one
                    Path(args.output).write_text(json.dumps(calibration, indent=2))
                else:
                    failed.append(code)
            except KeyboardInterrupt:
                print("\nInterrupted — saving progress…")
                Path(args.output).write_text(json.dumps(calibration, indent=2))
                sys.exit(0)
            except Exception as exc:
                print(f"  ✗ Unexpected error: {exc}")
                failed.append(code)

    print(f"\n{'═' * 54}")
    print(f"Calibrated: {success}/{total}   Failed: {len(failed)}")
    if failed:
        print(f"Failed codes: {', '.join(failed)}")
    print(f"\nOutput written to: {args.output}")
    print(f"Apply with:  node scripts/apply-calibration.mjs {args.output}")


if __name__ == "__main__":
    main()
