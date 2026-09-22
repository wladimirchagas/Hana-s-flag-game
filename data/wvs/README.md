# World Values Survey (WVS) sources

Official aggregated results PDFs (and one XLSX) downloaded directly from the
[World Values Survey Data Archive](https://www.worldvaluessurvey.org/), stored so the
same questions can be compared across countries.

## Important: what “latest” means (per country)

As of the retrieval date recorded in `manifest.json`, **Wave 7 (2017–2022) is the
latest completed WVS-only wave** with published country-results PDFs. WVS-8 is
planned for 2024–2026 and does not yet publish equivalent per-country results
reports.

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
  wave7/
    country-results/                # one PDF per country (sex × age crossings)
    wave-results/                   # cross-national "Results By Country" PDF
  joint-evs-wvs-2017-2022/
    F00011082-...Results_by_Country.pdf     # cross-national frequency tables incl. France
    F00011087-...Participating_Countries.xlsx  # per-country fieldwork/sample metadata incl. France
```

## Countries in this commit

| ISO | Country | Document | WVS DOID | Sample N |
|-----|---------|----------|----------|---------------------|
| AU | Australia | Wave 7 v3.0 country results | 11903 | 1,813 (from PDF) |
| BR | Brazil | Wave 7 v3.0 country results | 11906 | 1,762 (from PDF) |
| ID | Indonesia | Wave 7 v3.0 country results | 11919 | 3,200 (from PDF) |
| MY | Malaysia | Wave 7 v3.0 country results | 11927 | 1,313 (from PDF) |
| JP | Japan | Wave 7 v3.0 country results (format twin of AU/BR/…) | 11922 | 1,353 (from PDF) |
| JP | Japan | Wave 7 eng **v4.0** (newer Japan report on the archive) | 23477 | 1,353 (from PDF) |
| NZ | New Zealand | Wave 7 v3.0 country results | 10544 | 1,057 (from PDF) |
| SG | Singapore | Wave 7 v3.0 country results | 11395 | 2,012 (from PDF) |
| — | Cross-national | Wave 7 Results By Country 2017–2022 v6.0.0 | 10763 | (all Wave 7 societies) |
| **FR** | **France** | **Wave 5 (2006) country results — WVS-only, superseded, kept for context** | **7894** | **1,001 (from PDF)** |
| — | Cross-national | **Joint EVS/WVS 2017–2022 Results by Country v5.0.0** (incl. France) | 11082 | France row: 1,880 (from PDF table) |
| **FR** | **France** | **Joint EVS/WVS 2017–2022 Participating Countries v5.0** (fieldwork metadata) | 11087 | 1,870 (from XLSX) |

France's Joint EVS/WVS entry: fielded by **EVS** (not WVS7) 2018-03-02–2018-08-16,
mode **CAPI**, language **French**. The two sample-N figures for France (1,880 in
the frequency-table PDF vs 1,870 in the participating-countries worksheet) are both
taken verbatim from their respective official files; the small discrepancy is not
reconciled or guessed at here — both numbers are recorded as-is.

Japan is the only one of the three newly fetched Wave 7 countries that also has a
**v4.0** country-results PDF on the archive; NZ and SG currently publish **v3.0**
only (same series as the AU/BR/ID/MY uploads).

## Source

- Wave 7 country index: https://www.worldvaluessurvey.org/AJDocumentation.jsp?CndWAVE=7
- Wave 7 docs: https://www.worldvaluessurvey.org/WVSDocumentationWV7.jsp
- Wave 5 country index / France entry (SAID 455): https://www.worldvaluessurvey.org/AJDocumentation.jsp?CndWAVE=5
- Joint EVS/WVS 2017–2022 dataset page: https://www.worldvaluessurvey.org/WVSEVSjoint2017.jsp
- JP / NZ / SG Wave 7 country-results PDFs, the Wave 7 wave-level Results-by-Country
  PDF, the France Wave 5 country-results PDF, and both Joint EVS/WVS 2017–2022 files
  were downloaded directly from those pages on **2026-09-22** (driven with a headless
  browser through the archive's own JS-based download flow — the same flow a person
  clicking through the site uses — since the endpoints require an active browser
  session, not a bare HTTP request).
- AU / BR / ID / MY PDFs were supplied with this task; their titles and DOIDs
  match the same WVS archive series (`F00011903`, `F00011906`, `F00011919`,
  `F00011927`).

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
wrong, a country-results PDF no longer names the expected country / sample size, or
France's coverage entries go missing.
