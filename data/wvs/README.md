# World Values Survey (WVS) sources

Official **Wave 7 (2017–2022)** aggregated results PDFs from the
[World Values Survey Data Archive](https://www.worldvaluessurvey.org/WVSDocumentationWV7.jsp),
stored so the same questions can be compared across countries.

## Important: what “latest” means

As of the retrieval date recorded in `manifest.json`, **Wave 7 is the latest
completed WVS wave** with published country-results PDFs. WVS-8 is planned for
2024–2026 and does not yet publish equivalent per-country results reports.
Nothing here is fabricated or transcribed from memory — only archive files (or
user-provided copies that match the archive DOID/title for AU/BR/ID/MY).

## Layout

```
data/wvs/
  README.md
  manifest.json                  # provenance + sha256 + audit fields
  wave7/
    country-results/             # one PDF per country (sex × age crossings)
    wave-results/                # cross-national “Results By Country” PDF
```

## Countries in this commit

| ISO | Country | Document | WVS DOID | Sample N (from PDF) |
|-----|---------|----------|----------|---------------------|
| AU | Australia | Wave 7 v3.0 country results | 11903 | 1,813 |
| BR | Brazil | Wave 7 v3.0 country results | 11906 | 1,762 |
| ID | Indonesia | Wave 7 v3.0 country results | 11919 | 3,200 |
| MY | Malaysia | Wave 7 v3.0 country results | 11927 | 1,313 |
| JP | Japan | Wave 7 v3.0 country results (format twin of AU/BR/…) | 11922 | 1,353 |
| JP | Japan | Wave 7 eng **v4.0** (newer Japan report on the archive) | 23477 | 1,353 |
| NZ | New Zealand | Wave 7 v3.0 country results | 10544 | 1,057 |
| SG | Singapore | Wave 7 v3.0 country results | 11395 | 2,012 |
| — | Cross-national | Results By Country 2017–2022 v6.0.0 | 10763 | (all Wave 7 societies) |

Japan is the only one of the three newly fetched countries that also has a
**v4.0** country-results PDF on the archive; NZ and SG currently publish **v3.0**
only (same series as the AU/BR/ID/MY uploads).

## Source

- Country index: https://www.worldvaluessurvey.org/AJDocumentation.jsp?CndWAVE=7
- Wave docs: https://www.worldvaluessurvey.org/WVSDocumentationWV7.jsp
- JP / NZ / SG country-results PDFs and the wave-level Results-by-Country PDF
  were downloaded from those pages on **2026-09-22**.
- AU / BR / ID / MY PDFs were supplied with this task; their titles and DOIDs
  match the same WVS archive series (`F00011903`, `F00011906`, `F00011919`,
  `F00011927`).

## Citation

Haerpfer, C., Inglehart, R., Moreno, A., Welzel, C., Kizilova, K.,
Diez-Medrano, J., Lagos, M., Norris, P., Ponarin, E. & Puranen B. et al.
(eds.). World Values Survey Wave 7 documentation / country results.
World Values Survey Association / JD Systems Data Archive.
See https://www.worldvaluessurvey.org/WVSDocumentationWV7.jsp

## Conditions of use (summary)

WVS documentation is provided for **non-profit** use with **proper citation**.
**Microdata** (SPSS / Stata / CSV) must **not** be redistributed. This folder
stores only **aggregated** country / wave results PDF reports (percentages by
sex and age), not respondent-level datasets.

## Verification

```bash
node scripts/check-wvs-sources.mjs
```

Fails if any listed PDF is missing, the sha256 drifts, the PDF header is wrong,
or a country-results PDF no longer names the expected country / sample size.
