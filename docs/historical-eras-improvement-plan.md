# Historical eras (Learn mode) — completeness & accuracy audit + improvement plan

**Audited 2026-07-31** against `main` @ `44f4e51`, measured with
`node scripts/historical-era-remaining.mjs` (added in this change) and verified in the
running app with Playwright.

The Learn-mode **Period** picker offers 13 historical eras plus "Today". Each historical era
loads a hand-curated GeoJSON from `aourednik/historical-basemaps`
(`public/historical-maps/world_*.geojson`); the user clicks a polity, and the panel + the
"Flags of this era" grid are filled from `POLITY_REGISTRY` / `MODERN_NAME_ALIASES` /
`ERA_OVERRIDES` in `src/lib/historicalEras.ts`.

---

## 1. Measured state

`node scripts/historical-era-remaining.mjs` — counts are polities; `(%)` is share of the
era's total mapped area. "Bare name only" = clicking it shows **no flag, no note and no
population**.

| era | polities | with flag | with note | with pop | bare name only | unnamed features |
|-----|---------:|----------:|----------:|---------:|---------------:|-----------------:|
| 2000 BC | 45 | 0 (0%) | 9 (2%) | 9 | 36 (77%) | 100 (22%) |
| 500 BC | 87 | 1 (0%) | 21 (6%) | 21 | 66 (69%) | 112 (26%) |
| 100 AD | 97 | 2 (4%) | 35 (10%) | 35 | 62 (51%) | 355 (39%) |
| 600 AD | 98 | 0 (0%) | 32 (7%) | 32 | 66 (58%) | 116 (36%) |
| 800 AD | 132 | 1 (0%) | 27 (8%) | 27 | 104 (66%) | 103 (26%) |
| 1300 | 138 | 6 (0%) | 78 (6%) | 77 | 59 (10%) | 122 (84%) |
| 1500 | 191 | 9 (2%) | 109 (31%) | 112 | 78 (44%) | 148 (25%) |
| 1700 | 592 | 40 (26%) | 69 (38%) | 67 | 509 (27%) | 191 (34%) |
| 1815 | 327 | 68 (56%) | 135 (67%) | 127 | 190 (6%) | 108 (27%) |
| 1850 | 322 | 70 (48%) | 129 (63%) | 125 | 191 (9%) | 108 (27%) |
| 1914 | 142 | 119 (80%) | 58 (47%) | 53 | 11 (2%) | 33 (8%) |
| 1945 | 183 | 149 (85%) | 66 (40%) | 60 | 13 (10%) | 42 (0%) |
| 1960 | 157 | 124 (84%) | 49 (35%) | 43 | 13 (10%) | 37 (0%) |

**Headline numbers**

- **1,376 distinct polity names** appear across the bundled eras; the registry + aliases +
  era overrides cover **516** of them. **901 (65%) have no entry at all.**
- Across all eras there are **2,511 polity slots**, of which **1,398 (56%) render as a bare
  name** — the map's dominant interaction outcome is "here is a word".
- Even in the best-covered modern eras, the **largest** polities have no facts: in 1914/1945/1960
  the United States, Brazil, Australia, India, Argentina, Sudan, Mexico, Saudi Arabia and
  (1960) China all show a flag and nothing else — no note, no population.
- **8–39% of each era's mapped area is unnamed features**: they paint in the "unknown"
  colour, and clicking them silently clears the selection.

---

## 2. Accuracy defects (fix before adding more content)

### 2.1 Anachronistic modern flags in 1914 / 1945 / 1960 — the biggest correctness problem

`eraAllowsModernFlagFallback()` lets any polity whose NAME matches a modern country borrow
**today's** flag. That fires for **99 polities in 1914, 140 in 1945, 115 in 1960**. It is
right for most Latin American republics (flags from the 1810s–20s) and wrong wherever the flag
post-dates the era. Verified examples:

| era | polity | shown | actually flew |
|-----|--------|-------|---------------|
| 1914 / 1945 / 1960 | South Africa | current flag, adopted **27 Apr 1994** | Red Ensign (1910–28), then the 1928 orange-white-blue |
| 1960 | Uganda | current flag, adopted **9 Oct 1962** | Blue Ensign with the crested-crane badge (1914 – Mar 1962) |
| 1945 | Germany (USA/UK/France/Soviet zones) | black-red-gold (**1949**) | occupied Germany had no national flag |
| 1945 | Bangladesh (1971), Namibia (1990), Israel (1948), India/Pakistan (1947), UAE (1971) | current flags | Raj / mandate / colonial flags |
| 1960 | Zimbabwe (1980), Zambia (1964), Malawi (1964), Kenya (1963), Tanzania (1964), Mozambique (1975), Guinea-Bissau (1973), Qatar (1971), Kuwait (1961), Jamaica (1962), Bahamas (1973), Guyana (1966), Suriname (1975), Belize (1981), PNG (1975), Fiji (1970), Eq. Guinea (1968), Djibouti (1977), Eritrea (1993) | current flags | colonial ensigns |
| 1914 | Mongolia, Azerbaijan, Malta, Botswana, Lesotho, Nigeria, Mozambique, Guyana, Suriname, Belize, Fiji, Samoa, Eritrea, Djibouti, Qatar, Kuwait | current flags | imperial / colonial flags |

This is the same class of error the repo already forbids elsewhere ("never show the parent
nation's flag for a subdivision", "never show a wrong flag"): a *plausible* flag that is
decades out of period is worse than no flag.

**Fix.** A sourced `FLAG_ADOPTED_YEAR` table (ISO alpha-2 → year of the current design, each
cited), and a gate: the modern-flag fallback resolves **only** when `adoptedYear <= eraYear`
**and** the polity was sovereign at that date. Otherwise fall back, in order, to (a) the
ruling power's era-correct flag via the dataset's own `SUBJECTO` field (§2.2), (b) a curated
period flag, (c) `noFlag`. Add `scripts/check-historical-flag-anachronism.mjs` to the
`flags:check` chain so a future era or country addition cannot reintroduce it, and record the
rule in `CLAUDE.md` alongside the other never-show-a-wrong-flag rules.

### 2.2 `SUBJECTO` / `PARTOF` are carried in every file and never used

Every feature has a `SUBJECTO` (ruling power) and `PARTOF`. Where they differ from `NAME`
they identify a dependency: **22 polities in 1700, 15 in 1815, 31 in 1914, 58 in 1945**
(e.g. `Belgian Congo → Belgium`, `Gold Coast → United Kingdom…`, `Vice-Royalty of Peru →
Spanish Habsburg`, `Tonkin → France`). Using it gives three wins at once, with **no new
sourcing**:

1. a **"Ruled by"** row in the panel (real information the app currently discards);
2. **era-correct flag inheritance** for colonies — a colony resolves to whatever its ruler
   resolves to *in that era*, so it can never be more anachronistic than the ruler;
3. an **"Group by empire"** mode for the "Flags of this era" grid.

### 2.3 Dataset typos are shown to users verbatim

The upstream NAMEs are the display strings, so users read: *Kingfom of Italy*, *Anglo-Egyption
Sudan*, *Khoiasan*, *Bantou*, *Eastern North Amercian hunter-gatherers*, *Scottland*,
*Kongldom of Hawaii*, *Cyraneica (UK Lybia)*, *Tripolitana (UK Lybia)*, *Fezzan (Frech
Lybia)*, *Quazaq Khanate*, *Dutch Guinea* (it is Dutch **Guiana**). Fix with a
`DISPLAY_NAME_FIXES` layer (dataset key → corrected label); registry keys stay verbatim so
lookups keep working.

### 2.4 Alternate spellings silently lose coverage

The same entity appears under two spellings in different files, and only one has a registry
entry, so the other renders bare. Found and **fixed in this change**: `Teotihuacàn` (600 AD)
vs `Teotihuacán` (100 AD), and `Gurjara Pratihara` vs `Gurjara-Pratihara` (both in 800 AD).
Still open, needing sourced entries rather than aliases: `Bantu`/`Bantou`,
`Khoisan`/`Khoiasan`, `Saharan pastoral nomads`/`Saharan Pastoral Nomads`.

### 2.5 Painter-order occlusion makes some polities unclickable

`HistoricalMap` renders features in file order, so a small polity fully inside a
later-drawn one is unreachable. Verified in the running app by hit-testing each polity's
centroid: **Bahmani Kingdom** is covered by Golkonda (1500); **Hohenzollern** by Württemberg
and **Brunswick** by Hanover (1815 and 1850). Fix: sort features by descending geodesic area
before painting (largest first), so no polity can be buried. ~10 features per era are affected.

### 2.6 `world_1300.geojson` contains a whole-globe polygon

Feature index 64 is an unnamed MultiPolygon with a geodesic area of **12.78 sr** — the whole
sphere is 4π ≈ 12.57 sr. It does not currently occlude (it is holed), but it makes 84% of that
era's "mapped area" meaningless and is a rendering hazard the moment paint order changes. It
should be dropped or repaired when the files are reprocessed (§4.2).

### 2.7 All flags in 1914/1945/1960 wait on a live network call

The modern-flag fallback reads the country list from `fetchCountries()`. With
`restcountries.com` unreachable (a documented, recurring case for this project), the Learn page took
a **measured 27 s** to render any flags at all; before that, 1914 showed **20 of 142** flags
instead of 119. The bundled data to render immediately already exists (`ALL_COUNTRY_OPTIONS` +
`COUNTRY_FACTS` + `public/flags/*.svg`). Seed `countries` synchronously from the bundle and
upgrade in place when the network answers — the same principle as the "country widget
information must never be reduced" hard rule, applied to the historical eras that depend on
the same list.

---

## 3. Countries / empires / polity information (the panel)

A modern country shows 8 fact rows. A historical polity shows at most **Region, peak
population and a one-line note** — and, for 56% of slots, none of those.

Additions worth making, in order of value per unit of work:

1. **Note + peak population sweep, in mapped-area order.** The tracker prints the ranking;
   the top ~300 polities by area account for the great majority of clicks. Same discipline as
   the subdivision/capital sweeps: authoritative source or omit, never invent.
2. **Existed from–to dates.** Every polity in a period map has them, none are shown. This is
   the single most educational missing field ("Abbasid Caliphate, 750–1258").
3. **"Today this land is…"** — computable, with **no new sourcing**, by intersecting the
   historical polygon with the bundled `public/countries-50m.json` modern topology. It is the
   bridge between the historical map and the flags the child already knows.
4. **Capital(s)** — the same rules as the existing capital datasets; for major polities only.
5. **Ruler / dynasty at the era date** for the marquee empires.
6. **Borders-approximate note** from the dataset's own `BORDERPRECISION` (1–3), which is
   carried in every file and unused. Saying "borders approximate for this date" is honest and
   matches the repo's sourcing ethic.
7. **Source link** — some features carry `weblnks`/`wikipedia` properties (7 in the 800 AD
   file, 1 each in 2000 BC and 1500); surface them where present.

---

## 4. Territories / map

### 4.1 Timeline coverage — 13 of 47 available eras

Upstream `aourednik/historical-basemaps` publishes **47** `world_*.geojson` files (verified
reachable from this environment); the app bundles 13. The gaps are large and they hide exactly
the transitions a flag game cares about:

- **1960 → today is a 66-year jump.** **`world_1994` is the single highest-value missing
  era**: the 15 post-Soviet states, the Yugoslav successors, the Czech/Slovak split, Eritrea
  and Namibia — dozens of flags that exist *because* of that decade.
- **800 → 1300 is a 500-year jump.** `world_900/1000/1100/1200` are available;
  `world_1279` is the Mongol Empire at maximum extent (the app's "1300 · Mongol Empire"
  is already past the peak).
- Interwar: `world_1920`, `world_1930`, `world_1938` (the eve of WWII, currently absent
  between 1914 and 1945).
- Also available and worth considering: `world_1880`/`world_1900`, `world_1600`/`world_1650`,
  `world_1400`, `world_1783` (US independence — and `us-15star.png` is already bundled),
  `world_bc323` (Alexander at his death), `world_bc1000`, `world_bc700`.

### 4.2 The map files are 2× bigger than they need to be

Coordinates are stored at ~14 decimal places (nanometre precision). The map is 960 px wide for
360°, i.e. 0.375°/px, so 4 decimals (~11 m) is still ~3,750× finer than a pixel. Rounding to
4 dp is lossless at display scale and shrinks the files by **50–55%** (measured: `world_100`
13.5 MB → 6.1 MB, `world_1300` 5.3 MB → 2.7 MB, `world_1914` 1.5 MB → 0.7 MB). Doing this pass
first is what makes §4.1 affordable; the same pass can drop the broken 1300 polygon (§2.6).

### 4.3 Map legibility

- No labels: a polity's name is only discoverable by hover/tap, so the map reads as
  undifferentiated blobs. Rendering names for the largest polities per era (with the existing
  `AutoFitName`-style discipline) would make the map self-explanatory.
- Every polity is painted the same colour — an empire, a kingdom and a hunter-gatherer range
  are visually identical. Colouring by ruler (`SUBJECTO`, §2.2) would show empires at a glance.
- The 🚩 flag overlay is nearly empty before 1700 (0–2% of area has a flag), so the feature
  silently does nothing in half the eras.
- Unnamed regions: instead of silently clearing the selection, say so — "No polity recorded
  here for this date" is honest and stops the map feeling broken.

---

## 5. Suggested sequencing

| # | Work | Why first | New sourcing? |
|---|------|-----------|---------------|
| **P0** | Paint-order fix (§2.5), display-name fixes (§2.3), alternate-spelling keys (§2.4), bundled-first country seed (§2.7) | Pure correctness, no data research, small diffs | No |
| **P1** | Flag-adoption-year gate + `SUBJECTO` inheritance + anachronism check script (§2.1, §2.2) | Stops the app showing wrong flags, and *raises* colonial-era coverage at the same time | Yes — one dated table |
| **P2** | Note + population sweep in area order (§3.1) | Turns 1,398 bare names into facts; measurable with the tracker | Yes — the bulk of the work |
| **P3** | Coordinate-precision pass, then add `1994`, `1938`, `1920`, `1900`, `1600`, `1200`, `1000`, `bc323` (§4.1, §4.2) | Payload shrinks before it grows; 1994 adds the most new flags of any single era | No (upstream data) |
| **P4** | Panel depth: dates, "today this land is", capitals, `BORDERPRECISION` note (§3) | Highest educational value once the basics are right | Partly derivable |

Progress is measured by `node scripts/historical-era-remaining.mjs`; the target for P2 is
"bare name only" under 20% of slots (from 56% today).
