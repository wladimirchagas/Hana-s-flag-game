# World Values Survey (WVS) sources

Official aggregated results PDFs (and one XLSX) downloaded directly from the
[World Values Survey Data Archive](https://www.worldvaluessurvey.org/), stored so the
same questions can be compared across countries.

## Important: what “latest” means (per country)

As of the retrieval date recorded in `manifest.json`, **Wave 7 (2017–2022) is the
latest completed WVS-only wave** with published country-results PDFs. WVS-8 is
planned for 2024–2026 and does not yet publish equivalent per-country results
reports.

**Coverage of Wave 7:** the archive lists **66 societies**. **64** have a published
country-results PDF (65 files, because Japan also has an English **v4.0** report).
**India 2023** and **Uzbekistan 2022** are Wave 7 societies but have **no**
country-results PDF on the archive yet — they are recorded in
`scripts/data/wvs-wave7-inventory.json` with `doid: null` and are not fabricated.

**“Latest” is not the same wave number for every country.** France never fielded a
WVS Wave 6 or Wave 7 survey — confirmed by checking the WVS Data Archive's own
per-wave country index (`AJDocumentation.jsp?CndWAVE=1` through `=9`), which lists
France only under Wave 1, Wave 2 (both legacy European Values Study re-hosts,
1981–1984 / 1990–1994) and **Wave 5 (fielded 2006)**. The most recent France data
anywhere on worldvaluessurvey.org is the officially co-published **Joint EVS/WVS
2017–2022 dataset** (World Values Survey Association + European Values Study),
whose France component was fielded **2018-03-02 to 2018-08-16** as part of the EVS
2017 round. So for France, "the latest equivalent WVS survey results" means the
`joint-evs-wvs-2017-2022/` files below, not the Wave 5 (2006) file — the Wave 5 file
is kept as the most recent **WVS-only** per-country report for historical context.

Nothing here is fabricated or transcribed from memory — every file is either a
direct WVS Data Archive download (verified by title/sample-N text extraction) or a
user-provided copy that matches the archive DOID/title (AU/BR/ID/MY).

## Layout

```
data/wvs/
  README.md
  manifest.json                     # provenance + sha256 + audit fields
  wave5/
    country-results/                # France 2006 (sex × age crossings)
  wave6/
    country-results/                # South Africa 2013 (sex × age crossings)
  ivs/
    F00011424-Common_EVS_WVS_Dictionary_IVS.xlsx  # official cross-wave variable dictionary
  wave7/
    country-results/                # one PDF per Wave 7 society (sex × age)
    wave-results/                   # cross-national "Results By Country" PDF
  joint-evs-wvs-2017-2022/
    F00011082-...Results_by_Country.pdf     # cross-national frequency tables incl. France
    F00011087-...Participating_Countries.xlsx  # per-country fieldwork/sample metadata incl. France
```

Inventory (authoritative list of societies + DOIDs, including the two without PDFs):
`scripts/data/wvs-wave7-inventory.json`.

## Wave 7 country-results (complete published set)

All **65** published Wave 7 country-results PDFs are under
`wave7/country-results/`. Provenance, sha256, sample N (from the PDF's TOTAL `(N)`
column), and first-page audit excerpt live in `manifest.json`. Re-download /
re-audit with:

```bash
node scripts/download-wvs-country-results.mjs   # Chromium session → AJDownload.jsp
node scripts/ingest-wvs-country-results.mjs     # audit + merge into manifest.json
node scripts/check-wvs-sources.mjs
```

| Region (approx.) | Societies with PDF |
|------------------|--------------------|
| Africa | EG, ET, KE, LY, MA, NG, TN, ZW |
| Americas | AR, BO, BR, CA, CL, CO, EC, GT, MX, NI, PE, PR, US, UY, VE |
| Asia / Pacific | AU, BD, CN, HK, ID, JP (+ eng v4), KR, KG, KZ, MM, MN, MO, MV, MY, NZ, PH, PK, SG, TH, TJ, TW, VN |
| Europe | AD, AM, CY, CZ, DE, GB (Great Britain), GB-NIR, GR, NL, RO, RS, RU, SK, UA |
| Middle East | IQ, IR, JO, LB, TR |

**Not yet published as country-results PDFs:** IN (India 2023), UZ (Uzbekistan 2022).

**France** is not a Wave 7 WVS society — see Wave 5 + Joint EVS/WVS below.

## France (Wave 5 + Joint EVS/WVS)

| ISO | Country | Document | WVS DOID | Sample N |
|-----|---------|----------|----------|----------|
| FR | France | Wave 5 (2006) country results — WVS-only, superseded, kept for context | 7894 | 1,001 (from PDF) |
| — | Cross-national | Joint EVS/WVS 2017–2022 Results by Country v5.0.0 (incl. France) | 11082 | France row: 1,880 (from PDF table) |
| FR | France | Joint EVS/WVS 2017–2022 Participating Countries v5.0 (fieldwork metadata) | 11087 | 1,870 (from XLSX) |

France's Joint EVS/WVS entry: fielded by **EVS** (not WVS7) 2018-03-02–2018-08-16,
mode **CAPI**, language **French**. The two sample-N figures for France (1,880 in
the frequency-table PDF vs 1,870 in the participating-countries worksheet) are both
taken verbatim from their respective official files; the small discrepancy is not
reconciled or guessed at here — both numbers are recorded as-is.

## Other EVS-only European countries (Joint EVS/WVS)

France is not the only country the Joint PDF above covers without a WVS Wave 7
survey. **26 European countries** fielded only the EVS 2017 round and are merged
from `joint-evs-wvs-2017-2022/F00011082-…Results_by_Country.pdf` by
`scripts/build-wvs-results.mjs` (`mergeJointEvs`): Albania, Austria, Azerbaijan,
Belarus, Bosnia and Herzegovina, Bulgaria, Croatia, Denmark, Estonia, Finland,
France, Georgia, Hungary, Iceland, Italy, Latvia, Lithuania, Montenegro, North
Macedonia, Norway, Poland, Portugal, Slovenia, Spain, Sweden, Switzerland.

A Joint table is paired with a Wave 7 question **only when its figures for every
Wave 7 society it shares (60+ of them) reproduce that question exactly** under one
column order: as-is, "Not mentioned / Mentioned" swapped, or a reversed scale. The
Joint figures for WVS societies are the Wave 7 figures, so this check proves both
the pairing and the column alignment before any EVS value is copied. 143 tables
qualify, about 140 of the 307 Wave 7 questions per country. Questions the EVS did
not ask, or asked differently (e.g. yes/no memberships vs WVS's
active/inactive/none), are left empty and never approximated. Fieldwork year per
country comes from the PDF's own "Year survey" table.

Countries that fielded **both** surveys (Armenia, Czechia, Germany, Great Britain,
the Netherlands, Romania, Russia, Serbia, Slovakia, Ukraine) keep their Wave 7
figures.

## South Africa (Wave 6, 2013)

South Africa fielded neither WVS Wave 7 nor the EVS 2017 round. Its most recent
WVS survey is **Wave 6, fielded 18 Aug – 6 Oct 2013** (N = 3,531; archive SAID
2208). Its official country report,
`wave6/country-results/F00007746-WV6_Results_South-Africa_2013_v20180912.pdf`, is
merged by `scripts/build-wvs-results.mjs` (`mergeWave6Countries`):

- **Pairing** — each Wave 6 variable (V4, V5, …) is paired with a Wave 7 question
  (Q1, Q2, …) only where the official **Common EVS/WVS Dictionary** names both
  (`ivs/F00011424-Common_EVS_WVS_Dictionary_IVS.xlsx`, extracted into
  `scripts/data/wvs-wave6-wave7-crosswalk.json` by
  `scripts/build-wvs-wave-crosswalk.mjs`). Nothing is paired by wording.
- **Answer alignment** — every Wave 6 answer row must land on one Wave 7 answer by
  label. Clean Wave 7 labels are read from the Wave 7 country reports (US, then
  AU, NZ, CA, GB), trusted only where that report's TOTAL column reproduces the
  country's Wave 7 values exactly. The handful of answers the two waves word
  differently are listed in `WAVE6_LABEL_EQUIVALENTS`, each checked against the
  South African Wave 6 questionnaire (DOID 2766). A question whose scale changed
  between waves (e.g. 4-point vs 5-point health, 3-point vs 5-point agreement) is
  left empty, never forced. 190 questions qualify.
- **Dated everywhere** — these figures are older than every other country's, so
  the country widget, map legend, question picker and chart tooltip all say
  "2013 survey (Wave 6)".

## Also stored

| Document | DOID | Notes |
|----------|------|-------|
| Wave 7 Results By Country 2017–2022 v6.0.0 | 10763 | Cross-national wave PDF (all Wave 7 societies) |

## Source

- Wave 7 country index: https://www.worldvaluessurvey.org/AJDocumentation.jsp?CndWAVE=7
- Wave 7 docs: https://www.worldvaluessurvey.org/WVSDocumentationWV7.jsp
- Wave 5 country index / France entry (SAID 455): https://www.worldvaluessurvey.org/AJDocumentation.jsp?CndWAVE=5
- Joint EVS/WVS 2017–2022 dataset page: https://www.worldvaluessurvey.org/WVSEVSjoint2017.jsp
- Wave 7 country-results PDFs and the wave-level Results-by-Country PDF were
  downloaded from the archive on **2026-09-22** with a Chromium session posting to
  `AJDownload.jsp` (bare `curl` against that endpoint returns a 1-byte empty body).
- AU / BR / ID / MY PDFs were originally user-supplied; their titles and DOIDs
  match the same WVS archive series.

## Citation

Wave 5 / Wave 7 (WVS-only):

> Haerpfer, C., Inglehart, R., Moreno, A., Welzel, C., Kizilova, K.,
> Diez-Medrano, J., Lagos, M., Norris, P., Ponarin, E. & Puranen B. et al.
> (eds.). World Values Survey Wave 5 / Wave 7 documentation / country results.
> World Values Survey Association / JD Systems Data Archive.
> See https://www.worldvaluessurvey.org/WVSDocumentationWV7.jsp

Joint EVS/WVS 2017–2022 dataset (France's entry):

> EVS/WVS (2022). European Values Study and World Values Survey: Joint EVS/WVS
> 2017-2022 Dataset (Joint EVS/WVS). JD Systems Institute & WVSA. Dataset
> Version 5.0.0, doi:10.14281/18241.26
> See https://www.worldvaluessurvey.org/WVSEVSjoint2017.jsp

## Conditions of use (summary)

WVS/EVS documentation is provided for **non-profit** use with **proper citation**.
**Microdata** (SPSS / Stata / CSV / R / SAS) must **not** be redistributed. This
folder stores only **aggregated** country / wave results PDF reports (percentages
by sex and age, or by country) and the Joint EVS/WVS participating-countries XLSX
(fieldwork metadata, not respondent-level data) — never respondent-level datasets.

## Verification

```bash
node scripts/check-wvs-sources.mjs
```

Fails if any listed file is missing, the sha256 drifts, the PDF/XLSX header is
wrong, a country-results PDF no longer names the expected country / sample size,
France's coverage entries go missing, or any Wave 7 inventory DOID with a published
PDF is absent from the manifest.
