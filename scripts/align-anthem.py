#!/usr/bin/env python3
"""
Forced-alignment script for national anthem word-level timestamps.

Usage:
  python3 scripts/align-anthem.py <audio_file> <language_code> <country_code>

Examples:
  python3 scripts/align-anthem.py BR.ogg pt BR
  python3 scripts/align-anthem.py US.mp3 en US

Requirements:
  pip install numpy aeneas
  apt install ffmpeg espeak libespeak-dev

The script reads the anthem lyrics from src/data/nationalAnthems.ts (parsed
with regex), runs Aeneas forced alignment at word granularity, then prints the
TypeScript `words` arrays ready to paste into the data file.

For precise alignment the audio file must be the exact recording used at
runtime (i.e. the file served via wikiFile / a local download of it).
"""

import sys
import os
import re
import json
import tempfile
import subprocess

def die(msg):
    print(f"ERROR: {msg}", file=sys.stderr)
    sys.exit(1)

# ── CLI args ──────────────────────────────────────────────────────────────────
if len(sys.argv) < 4:
    die("Usage: align-anthem.py <audio_file> <language_code> <country_code>\n"
        "  e.g.: align-anthem.py BR.ogg pt BR")

audio_path, lang_code, country_code = sys.argv[1], sys.argv[2], sys.argv[3].upper()

if not os.path.exists(audio_path):
    die(f"Audio file not found: {audio_path}")

# ── Check aeneas ──────────────────────────────────────────────────────────────
try:
    from aeneas.executetask import ExecuteTask
    from aeneas.task import Task
except ImportError:
    die("aeneas not installed. Run: pip install numpy aeneas")

# ── Parse lyrics from nationalAnthems.ts ─────────────────────────────────────
ts_path = os.path.join(os.path.dirname(__file__), "..", "src", "data", "nationalAnthems.ts")
ts_path = os.path.normpath(ts_path)

if not os.path.exists(ts_path):
    die(f"Could not find nationalAnthems.ts at {ts_path}")

with open(ts_path, encoding="utf-8") as f:
    ts_src = f.read()

# Extract the block for the requested country code
block_pattern = rf'^\s+{re.escape(country_code)}:\s*\{{(.*?)^\s+\}},'
block_match = re.search(block_pattern, ts_src, re.DOTALL | re.MULTILINE)
if not block_match:
    die(f"Country code '{country_code}' not found in nationalAnthems.ts")

block = block_match.group(1)

# Extract all text: "..." lines (the original language lyrics)
line_pattern = r'\{\s*text:\s*"((?:[^"\\]|\\.)*)"\s*(?:,\s*textEn:[^,}]+)?(?:,\s*start:\s*[\d.]+)?'
lines_raw = re.findall(line_pattern, block)

if not lines_raw:
    die(f"No lyrics lines found for {country_code}")

# Unescape TypeScript string escapes
def unescape(s):
    return s.replace('\\"', '"').replace("\\'", "'").replace("\\\\", "\\")

lyrics_lines = [unescape(l) for l in lines_raw]
print(f"Found {len(lyrics_lines)} lyric lines for {country_code}", file=sys.stderr)

# ── Build word list (one word per line for Aeneas) ────────────────────────────
words_flat = []       # (line_index, word_text)
for li, line in enumerate(lyrics_lines):
    for word in line.split():
        words_flat.append((li, word))

if not words_flat:
    die("No words found in lyrics")

print(f"Total words to align: {len(words_flat)}", file=sys.stderr)

# ── Write temp plain-text file (one word per line) ────────────────────────────
with tempfile.NamedTemporaryFile(mode="w", suffix=".txt", delete=False, encoding="utf-8") as tf:
    txt_path = tf.name
    for _, word in words_flat:
        tf.write(word + "\n")

# ── Convert audio to WAV if needed (Aeneas prefers WAV) ──────────────────────
wav_path = audio_path
if not audio_path.lower().endswith(".wav"):
    wav_path = audio_path + ".tmp.wav"
    print(f"Converting audio to WAV...", file=sys.stderr)
    result = subprocess.run(
        ["ffmpeg", "-y", "-i", audio_path, "-ar", "16000", "-ac", "1", wav_path],
        capture_output=True
    )
    if result.returncode != 0:
        os.unlink(txt_path)
        die(f"ffmpeg conversion failed:\n{result.stderr.decode()}")

# ── Run Aeneas ────────────────────────────────────────────────────────────────
out_json = txt_path + ".sync.json"

task_config = (
    f"task_language={lang_code}"
    f"|is_text_file_format=plain"
    f"|os_task_file_format=json"
)

print(f"Running forced alignment (this may take 1–3 minutes)...", file=sys.stderr)

try:
    task = Task(config_string=task_config)
    task.audio_file_path_absolute = os.path.abspath(wav_path)
    task.text_file_path_absolute = os.path.abspath(txt_path)
    task.sync_map_file_path_absolute = os.path.abspath(out_json)
    ExecuteTask(task).execute()
    task.output_sync_map_file()
except Exception as e:
    die(f"Aeneas alignment failed: {e}")
finally:
    os.unlink(txt_path)
    if wav_path != audio_path and os.path.exists(wav_path):
        os.unlink(wav_path)

# ── Parse Aeneas JSON output ──────────────────────────────────────────────────
with open(out_json, encoding="utf-8") as f:
    sync = json.load(f)

os.unlink(out_json)

fragments = sync.get("fragments", [])
if len(fragments) != len(words_flat):
    print(f"WARNING: got {len(fragments)} aligned fragments for {len(words_flat)} words "
          f"— output may be incomplete", file=sys.stderr)

# ── Group results back into lines ─────────────────────────────────────────────
from collections import defaultdict
line_words = defaultdict(list)

for i, frag in enumerate(fragments):
    if i >= len(words_flat):
        break
    li, word_text = words_flat[i]
    t = round(float(frag["begin"]), 1)
    line_words[li].append((word_text, t))

# ── Emit TypeScript ───────────────────────────────────────────────────────────
print(f"\n// ── {country_code} word-level timestamps (Aeneas forced alignment) ──")
print(f"// Replace the 'words' arrays in the {country_code} entry of nationalAnthems.ts:\n")

for li, line_text in enumerate(lyrics_lines):
    pairs = line_words.get(li, [])
    if not pairs:
        print(f"      // Line {li}: {line_text[:50]} — no alignment data")
        continue
    parts = ", ".join(f'{{ w: "{w}", t: {t} }}' for w, t in pairs)
    print(f"      // {line_text[:60]}")
    print(f"      words: [{parts}],")
    print()
