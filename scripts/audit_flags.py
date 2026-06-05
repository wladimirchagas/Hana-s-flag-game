#!/usr/bin/env python3
"""
Audit all historical flag assignments — generates flag-audit.html.

Usage:
    python3 scripts/audit_flags.py
    # then open flag-audit.html in a browser

Checks:
  - Every file in FLAG_MAPPINGS is present in public/historical-flags/
  - Every file in public/historical-flags/ has a FLAG_MAPPINGS entry
  - Every file in FLAG_MAPPINGS is referenced in historicalEras.ts
  - Known accuracy issues are flagged with warnings
"""

import re
import sys
from pathlib import Path

# ---------------------------------------------------------------------------
# Import FLAG_MAPPINGS from the download script
# ---------------------------------------------------------------------------
SCRIPTS_DIR = Path(__file__).parent
sys.path.insert(0, str(SCRIPTS_DIR))
from download_historical_flags import FLAG_MAPPINGS, OUTPUT_DIR

# ---------------------------------------------------------------------------
# Known accuracy warnings — things that deserve human review
# ---------------------------------------------------------------------------
WARNINGS: dict[str, str] = {
    "russian-empire.png": (
        "Uses <code>Flag_of_Russia.svg</code> — the modern flag file. The design "
        "(white-blue-red) is historically correct for the Russian Empire civil flag "
        "since Peter the Great (1699), but a dated file like "
        "<code>Flag_of_Russia_(1914-1917).svg</code> would be more explicitly historical."
    ),
    "austrian-empire.png": (
        "Uses <code>Flag_of_Austria.svg</code> — the modern flag file. The red-white-red "
        "civil ensign is historically correct since the 13th century, but the Habsburg "
        "imperial colours were black-and-yellow. A dated historical file would be clearer."
    ),
    "dutch-republic.png": (
        "Uses <code>Flag_of_the_Netherlands.svg</code> — the modern Dutch flag (red-white-blue). "
        "The Dutch Republic's original Prince's Flag was orange-white-blue (Prinsenvlag); "
        "the orange faded to red c.1630–1660. By 1700 the red-white-blue was dominant, "
        "so this is approximately correct for the 1700 era but arguably wrong for 1500–1650."
    ),
    "japan-shogunate.png": (
        "Uses <code>Hinomaru.svg</code> — the modern Japanese flag. The Hinomaru has been "
        "used since medieval times but is not distinctly 'Tokugawa'. The actual Tokugawa "
        "shogunate flag exists: <code>Flag_of_the_Tokugawa_Shogunate.svg</code> "
        "(white field with black stripes, or the Tokugawa mon)."
    ),
    "byzantine-empire.png": (
        "Uses <code>Palaiologos_dynasty_flag.svg</code> — the flag of the last Byzantine "
        "dynasty (1261–1453). Used for 'Eastern Roman Empire' (500 AD) and 'Byzantine Empire' "
        "(800–1300 AD) where different dynasties were ruling. Palaiologos is the most "
        "recognisable Byzantine symbol but is technically anachronistic for earlier periods."
    ),
    "portugal-1500.png": (
        "Filename says '1500' but the Wikimedia source is <code>Flag_of_Portugal_(1830–1910).svg</code> "
        "— the constitutional monarchy flag. Correct for the ad1850 era (1830–1910 overlap) "
        "but the filename is misleading. Portugal in 1500 flew a Quinas banner (no matching "
        "file downloaded)."
    ),
    "holy-roman-empire.png": (
        "Uses <code>Banner_of_the_Holy_Roman_Emperor_(after_1400).svg</code> — correct for "
        "the post-1400 period but used for the Holy Roman Empire entry which also appears "
        "in the ad1000/ad1300 eras (Ottonian/Salian/Hohenstaufen dynasties, pre-1400)."
    ),
    "mughal-empire.png": (
        "Uses the triangular Mughal pennant (<code>Flag_of_the_Mughal_Empire_(triangular).svg</code>). "
        "This is a battle standard rather than a territorial flag, but it is the best-documented "
        "Mughal vexillological symbol on Wikimedia."
    ),
    "roman-empire.png": (
        "Uses <code>Vexilloid_of_the_Roman_Empire.svg</code> — a reconstructed SPQR vexilloid; "
        "no actual Roman national flag survives. Used for both 'Rome' (500 BC) and 'Roman Empire' "
        "(100 AD), neither of which had a formal national flag."
    ),
    "parthian-empire.png": (
        "Uses <code>Flag_of_Parthian_Empire.svg</code> — a modern reconstruction; no contemporary "
        "Parthian flag survives."
    ),
    "qing-dynasty.png": (
        "Uses the 1889–1912 Yellow Dragon Banner. Assigned to 'Qing' and 'Manchu Empire' entries "
        "globally, but in the ad1850 era the Qing didn't yet have this flag (it was adopted in "
        "1889). The 1850 entry should ideally use a pre-1889 Qing banner, but no widely-available "
        "Wikimedia alternative exists."
    ),
}

# ---------------------------------------------------------------------------
# Parse historicalEras.ts to find which flags are referenced and by whom
# ---------------------------------------------------------------------------
TS_FILE = SCRIPTS_DIR.parent / "src" / "lib" / "historicalEras.ts"

def parse_ts_references() -> dict[str, list[str]]:
    """Return {filename: [list of polity+era context strings]} from historicalEras.ts."""
    text = TS_FILE.read_text(encoding="utf-8")

    # Find current era context by scanning backwards from each flag reference
    era_pattern = re.compile(r'\["(ad\d+|today)"\s*,\s*new Map')
    flag_pattern = re.compile(r'\["([^"]+)",\s*\{[^}]*"historical-flags/([^"]+)"')

    # Build a list of (position, era) tuples
    era_positions = [(m.start(), m.group(1)) for m in era_pattern.finditer(text)]

    def era_at(pos: int) -> str:
        era = "global"
        for ep, en in era_positions:
            if ep < pos:
                era = en
            else:
                break
        return era

    refs: dict[str, list[str]] = {}
    for m in flag_pattern.finditer(text):
        polity = m.group(1)
        fname = m.group(2)
        era = era_at(m.start())
        refs.setdefault(fname, []).append(f"{polity} ({era})")

    return refs

# ---------------------------------------------------------------------------
# Build the report data
# ---------------------------------------------------------------------------
ts_refs = parse_ts_references()
png_files = set(p.name for p in OUTPUT_DIR.glob("*.png"))
mapped_files = set(FLAG_MAPPINGS.keys())

missing_from_disk   = mapped_files - png_files          # in script but not downloaded
extra_on_disk       = png_files - mapped_files          # downloaded but not in script
unreferenced_in_ts  = mapped_files - set(ts_refs.keys()) # mapped but not used in game

# ---------------------------------------------------------------------------
# Generate HTML
# ---------------------------------------------------------------------------
rows_html = []
for fname, wiki_source in sorted(FLAG_MAPPINGS.items()):
    on_disk    = fname in png_files
    in_ts      = fname in ts_refs
    warning    = WARNINGS.get(fname)

    if not on_disk:
        status_cls, status_label = "missing", "MISSING FILE"
    elif not in_ts:
        status_cls, status_label = "unused", "Not used in game"
    elif warning:
        status_cls, status_label = "warn", "Review recommended"
    else:
        status_cls, status_label = "ok", "OK"

    img_tag = (
        f'<img src="public/historical-flags/{fname}" alt="{fname}" '
        f'style="width:320px;height:192px;object-fit:contain;background:#eee">'
        if on_disk else
        f'<div class="no-img">FILE MISSING</div>'
    )

    polity_list = ""
    if fname in ts_refs:
        items = "".join(f"<li>{e}</li>" for e in ts_refs[fname])
        polity_list = f"<ul>{items}</ul>"
    else:
        polity_list = '<span class="none">— not referenced —</span>'

    warn_html = f'<p class="warning-text">⚠️ {warning}</p>' if warning else ""

    rows_html.append(f"""
  <div class="card {status_cls}">
    <div class="card-img">{img_tag}</div>
    <div class="card-body">
      <div class="status-badge {status_cls}">{status_label}</div>
      <h3>{fname}</h3>
      <p><strong>Wikimedia source:</strong><br>
         <code>{wiki_source}</code></p>
      <details>
        <summary><strong>Used by polities</strong></summary>
        {polity_list}
      </details>
      {warn_html}
    </div>
  </div>""")

# Extra files on disk not in script
for fname in sorted(extra_on_disk):
    rows_html.append(f"""
  <div class="card extra">
    <div class="card-img">
      <img src="public/historical-flags/{fname}" alt="{fname}"
           style="width:320px;height:192px;object-fit:contain;background:#eee">
    </div>
    <div class="card-body">
      <div class="status-badge extra">NOT IN SCRIPT</div>
      <h3>{fname}</h3>
      <p>This file is on disk but has no entry in FLAG_MAPPINGS in
         <code>download_historical_flags.py</code>.</p>
    </div>
  </div>""")

total = len(FLAG_MAPPINGS)
ok_count = sum(1 for f in FLAG_MAPPINGS if f in png_files and f in ts_refs and f not in WARNINGS)
warn_count = sum(1 for f in FLAG_MAPPINGS if f in WARNINGS and f in png_files and f in ts_refs)
unused_count = len(unreferenced_in_ts)
missing_count = len(missing_from_disk)
extra_count = len(extra_on_disk)

html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Historical Flags Audit — Hana's Flag Game</title>
<style>
  body {{ font-family: system-ui, sans-serif; margin: 0; padding: 1rem 2rem; background: #f5f5f5; }}
  h1 {{ color: #333; }}
  .summary {{ display:flex; gap:1rem; flex-wrap:wrap; margin-bottom:2rem; }}
  .stat {{ background:#fff; border-radius:8px; padding:.75rem 1.25rem; border-left:4px solid; }}
  .stat.ok    {{ border-color:#22c55e; }}
  .stat.warn  {{ border-color:#f59e0b; }}
  .stat.miss  {{ border-color:#ef4444; }}
  .stat.extra {{ border-color:#8b5cf6; }}
  .stat .n {{ font-size:2rem; font-weight:700; }}
  .grid {{ display:grid; grid-template-columns:repeat(auto-fill,minmax(360px,1fr)); gap:1.5rem; }}
  .card {{ background:#fff; border-radius:10px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,.12); border-top:4px solid; }}
  .card.ok    {{ border-color:#22c55e; }}
  .card.warn  {{ border-color:#f59e0b; }}
  .card.missing{{ border-color:#ef4444; }}
  .card.unused {{ border-color:#94a3b8; }}
  .card.extra {{ border-color:#8b5cf6; }}
  .card-img {{ text-align:center; background:#e5e7eb; padding:.5rem; }}
  .no-img {{ width:320px;height:192px;display:flex;align-items:center;justify-content:center;
             background:#fee2e2;color:#ef4444;font-weight:700;margin:auto; }}
  .card-body {{ padding:1rem; }}
  h3 {{ margin:.25rem 0 .5rem; font-family:monospace; font-size:.95rem; word-break:break-all; }}
  code {{ background:#f1f5f9; padding:.1em .3em; border-radius:3px; font-size:.85rem; word-break:break-all; }}
  ul {{ margin:.25rem 0; padding-left:1.25rem; font-size:.85rem; }}
  details summary {{ cursor:pointer; font-size:.9rem; }}
  .status-badge {{ display:inline-block; padding:.2em .6em; border-radius:4px;
                   font-size:.75rem; font-weight:700; text-transform:uppercase; margin-bottom:.4rem; }}
  .status-badge.ok      {{ background:#dcfce7; color:#15803d; }}
  .status-badge.warn    {{ background:#fef3c7; color:#b45309; }}
  .status-badge.missing {{ background:#fee2e2; color:#b91c1c; }}
  .status-badge.unused  {{ background:#f1f5f9; color:#64748b; }}
  .status-badge.extra   {{ background:#ede9fe; color:#7c3aed; }}
  .warning-text {{ font-size:.82rem; color:#92400e; background:#fffbeb;
                   border:1px solid #fde68a; border-radius:6px; padding:.5rem .75rem; margin-top:.5rem; }}
  .none {{ color:#94a3b8; font-style:italic; font-size:.85rem; }}
  .filters {{ margin-bottom:1rem; display:flex; gap:.5rem; flex-wrap:wrap; }}
  .filters button {{ padding:.4rem .8rem; border:1px solid #d1d5db; border-radius:6px;
                     background:#fff; cursor:pointer; font-size:.85rem; }}
  .filters button.active {{ background:#1e40af; color:#fff; border-color:#1e40af; }}
</style>
</head>
<body>
<h1>🏳️ Historical Flags Audit</h1>
<p>Generated from <code>scripts/download_historical_flags.py</code> +
   <code>src/lib/historicalEras.ts</code> · {total} flags total</p>

<div class="summary">
  <div class="stat ok">  <div class="n">{ok_count}</div>   OK</div>
  <div class="stat warn"> <div class="n">{warn_count}</div>  Review recommended</div>
  <div class="stat miss"> <div class="n">{missing_count}</div> Missing from disk</div>
  <div class="stat extra"><div class="n">{unused_count}</div> Unused in game</div>
  <div class="stat extra"><div class="n">{extra_count}</div>  On disk, not in script</div>
</div>

<div class="filters">
  <button class="active" onclick="filter('all',this)">All ({total})</button>
  <button onclick="filter('ok',this)">✅ OK ({ok_count})</button>
  <button onclick="filter('warn',this)">⚠️ Review ({warn_count})</button>
  <button onclick="filter('missing',this)">❌ Missing ({missing_count})</button>
  <button onclick="filter('unused',this)">💤 Unused ({unused_count})</button>
</div>

<div class="grid" id="grid">
{''.join(rows_html)}
</div>

<script>
function filter(cls, btn) {{
  document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.card').forEach(c => {{
    c.style.display = (cls === 'all' || c.classList.contains(cls)) ? '' : 'none';
  }});
}}
</script>
</body>
</html>
"""

out = Path("flag-audit.html")
out.write_text(html, encoding="utf-8")
print(f"Written: {out.resolve()}")
print(f"  {ok_count} OK, {warn_count} warnings, {missing_count} missing, "
      f"{unused_count} unused in game, {extra_count} extra on disk")
