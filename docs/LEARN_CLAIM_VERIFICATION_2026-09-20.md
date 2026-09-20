# Learn claim and artwork verification — 20 September 2026

**Universal verification is not complete.** This report records completed full-dataset comparisons and new image/metadata findings. It does not certify all 4,480 records, every sentence, every historical date, every boundary or all artwork as correct. Unchecked and unresolved claims remain explicitly unverified; an image decoding successfully or matching a third-party download does not establish authenticity.

This supplements [the original audit](LEARN_FACTUAL_AUDIT_2026-09-13.md) and [the continuation findings F40–F59](LEARN_FACTUAL_AUDIT_2026-09-19.md). No application data was changed. The evidence ledgers below are intended to preserve both positive verification and failures for subsequent work.

## Exact revision and new changes

Previous audited application revision: `63adaf34cbe32bc20c4362fe2636a1cd7bc5371b`. This pass also reconciles the three subsequent application commits through **`43cfd13b2194cdf57a5f32a7c910d4dd7ab04d67`**, after the earlier audit-save commits. The new delta contains **231 paths: 227 added newspaper/agency images, two added scripts, and two modified registries**. Every downloaded file matched its pinned Git blob hash. All 227 images decoded and were visually read, together with all 227 accompanying descriptions.

The registry changes affect **181 newspaper and 46 agency records**. Only `logo`, `logoExplainer`, `licenceNote`, and `noImageReason` changed. Ownership, founding dates, audience claims, frequency, category, headquarters and other factual fields were not corrected by these commits. Newspapers now have 231 images and 488 no-image records; agencies have 52 images and 136 no-image records. Thus F58's earlier count of 851 no-image claims is historical: **624 remain** in these two registries at this revision. This does not mean each retained statement about searches performed is true.

The most recent deployed UI previously inspected showed `63adaf3`. **This pass does not establish that `43cfd13` is deployed.** New findings below describe the pinned repository assets and the text the registries provide to Learn mode.

## Complete comparisons performed in this pass

| Claim group | Denominator | Result | Exact limits |
|---|---:|---|---|
| GDP and GDP per person, USD/local currency | 766 values | 758 match World Bank series values; eight unsupported fallbacks | Numeric/source agreement, not complete verification of currency presentation or economic methodology |
| Freedom House 2024 scores | 193 | 99 agree; **94 disagree** | Every bundled score checked against the stated edition |
| Freedom House 2024 status labels | 193 | 186 agree; **seven disagree** | Every bundled status checked; ranks and rank changes remain separate claims |
| Newly added media images | 227 | All exact blobs decoded and visually screened; five wrong entities and one additional conflict with current publisher branding identified | Visual screening is not primary-source certification of all remaining identities |
| New media image descriptions | 227 | Ten direct visual-description conflicts; five variant/rendering caveats recorded | No-conflict observations do not verify the prose's institutional or historical claims |
| Exact Commons artwork references in new media records | 85 | All requested; metadata recovered for 79; six unresolved | Commons records are evidence about the cited artwork, not blanket authority for official brand status |
| GICG passport image provenance | 188 | **188/188 live source hashes match the manifest** | Third-party source consistency only; official issuance series/currentness not established |

The GDP and Freedom House counts are individual field comparisons, not merely file counts or sampled countries. The media ledger identifies the extent of each individual review.

## F46 expanded — widespread mismatch with the labelled Freedom House edition (P1)

The complete comparison confirms **94/193 score mismatches**, beyond the four examples in the earlier report. `src/data/countryFacts.ts` and `scripts/data/democracyData.mjs` label these records 2024. Do not describe this as merely using an older accurate edition: many values do not match the edition actually labelled.

| Country | Bundled score | Published 2024 score |
|---|---:|---:|
| Bangladesh | 45 | 40 |
| Bhutan | 68 | 63 |
| Germany | 95 | 93 |
| India | 63 | 66 |
| Kuwait | 31 | 38 |
| Sudan | 2 | 6 |
| Syria | 5 | 1 |
| Tunisia | 44 | 51 |
| United States | 84 | 83 |

The seven incorrect status labels are:

| Country | Bundled | Published 2024 |
|---|---|---|
| Bhutan | Free | Partly Free |
| Jordan | Partly Free | Not Free |
| Kuwait | Not Free | Partly Free |
| Niger | Not Free | Partly Free |
| Senegal | Free | Partly Free |
| Thailand | Not Free | Partly Free |
| Tanzania | Not Free | Partly Free |

Source method: 185 individual 2024 report headers were read directly, Belgium and Bolivia were resolved from the primary pages' search extracts, and six remaining scores/statuses were established from the explicitly labelled previous-year figures in their 2025 reports: Austria, Bosnia and Herzegovina, Burundi, Benin, Bahamas and Central African Republic. The evidence URL and method are preserved per row. This is not substituting 2025's current score for 2024's score.

Examples: [Bhutan 2024](https://freedomhouse.org/country/bhutan/freedom-world/2024), [Kuwait 2024](https://freedomhouse.org/country/kuwait/freedom-world/2024), [US 2024](https://freedomhouse.org/country/united-states/freedom-world/2024), [Bahamas 2025 with previous-year figure](https://freedomhouse.org/country/bahamas/freedom-world/2025).

**Required change:** regenerate score, status and edition together from a reproducible publisher dataset. Identify app-derived rankings as such, document the country universe and tie rule, and calculate rank changes from two real editions. All bundled Freedom House `rankChange` values are zero; their factual validity has not been established. Re-ranking this same 193-country set by the verified scores using competition ranking would change 147 bundled rank numbers; that is an audit calculation, not an official Freedom House ranking.

## F47 expanded — all GDP values compared, provenance/freshness still defective (P1)

All 766 numeric fields were compared with the primary World Bank API's `NY.GDP.MKTP.CD`, `NY.GDP.MKTP.CN`, `NY.GDP.PCAP.CD`, and `NY.GDP.PCAP.CN` series for 2021–2025. The downloaded response metadata reported `lastupdated: 2026-07-13`. Comparison tolerance was 0.011 to accommodate the bundle's two-decimal rounding.

**758 match**: 750 observations from 2024, four from 2023 and four from 2022. Among matching values, **724 have a newer 2025 observation available** in the retrieved series. Old-but-accurate observations must not be called fabricated; omission of their year and an unsupported implication of currentness are the relevant defects.

The eight unmatched values are the USD GDP and USD GDP-per-person fallbacks for Eritrea (2.1 billion / 600), North Korea (24.5 billion / 960), South Sudan (7 billion / 590), and Yemen (21 billion / 650). The retrieved primary series does not substantiate them in 2021–2025. This establishes unsupported fallbacks, **not proof that the numbers were invented or can never be supported by another source**.

Source example: [World Bank GDP series](https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD?format=json&date=2021:2025&per_page=20000). Each ledger row includes its indicator, country-specific API URL, matching year(s), latest available year/value and source update date.

**Required change:** retain source, observation year, series identifier, currency/unit, retrieval date and estimate/revision status alongside every value. Unsupported fallbacks should be omitted or explicitly labelled with their actual independent source and year. Do not equate a metadata fetch date with the observation year.

## F60 — new logo backfills still substitute other countries' publications (P1)

| Registry ID and file | Actual identity evidenced by its cited artwork | Evidence |
|---|---|---|
| `bg-trud`, `public/newspaper-logos/bg/trud.png` | Soviet trade-union newspaper Trud; not Sofia's Trud | [Exact cited file](https://commons.wikimedia.org/wiki/File:LogoTrud.svg) identifies the Soviet publication. [Bulgarian publisher artwork](https://trud.bg/frontend/images/logo-2023.svg) was downloaded and visually compared. |
| `hu-blikk`, `public/newspaper-logos/hu/blikk.svg` | Norwegian Blikk magazine; not the Hungarian tabloid | [Exact cited file](https://commons.wikimedia.org/wiki/File:Blikk_logo.svg) points to blikk.no. Both publishers' official logos were downloaded and viewed: [Norway](https://www.blikk.no/view-resources/dachser2/public/blikk/blikk_logo-black.svg) and [Hungary](https://www.blikk.hu/). |
| `mx-el-universal`, `public/newspaper-logos/mx/el-universal.svg` | El Universal of Cartagena, Colombia; not Mexico City's newspaper | [Exact cited file](https://commons.wikimedia.org/wiki/File:Logo_El_Universal_2021.svg) explicitly identifies Cartagena and supplies the [Colombian publisher's artwork](https://portales.eluniversal.com.co/externos/logo-eu-rediseno-2021.svg), which was downloaded and visually compared. |
| `tn-assabah`, `public/newspaper-logos/tn/assabah.jpg` | Moroccan Assabah; not the Tunisian publication | [Exact cited file](https://commons.wikimedia.org/wiki/File:Assabah-logo.jpg) names assabah.ma as source and identifies Moroccan usage. [The publisher](https://assabah.ma/) describes itself as a Moroccan daily. |
| `pe-la-republica`, `public/newspaper-logos/pe/la-republica.jpg` | Colombian La República; not the Lima daily | [Exact cited file](https://commons.wikimedia.org/wiki/File:La_República_logo.jpg) identifies [Q735264, the Colombian newspaper](https://www.wikidata.org/wiki/Q735264). The bundled red speech-bubble LR artwork is the cited image. This identity determination uses the artwork's explicit metadata; current official-brand status is a separate question. |

Additional conflict: `es-el-mundo` uses an oversized red M. The [Spanish publisher's current homepage](https://www.elmundo.es/) supplies a different inline masthead, with a blue globe between EL and MUNDO; it was extracted and visually compared. The [cited Commons file](https://commons.wikimedia.org/wiki/File:Periodico_El_Mundo.svg) is categorised under Medellín. Treat the Spanish assignment as unsupported/conflicting with current publisher branding; do not assert the exact alternate publication without further primary evidence.

These results contradict the latest commits' broad assurance of visually verified, collision-guarded mastheads. Exact title matching is insufficient where different entities share a name. Replace or temporarily omit the affected artwork. Bind source selection to **entity identity, country and official domain**, then verify the actual selected image and its variant.

## F61 — new explanatory metadata contradicts bundled pixels (P2)

All 227 new explainers were read alongside the images. The following are direct, reproducible discrepancies; they do not require speculation about historical brand adoption:

| ID | Description says | Bundled image shows |
|---|---|---|
| `in-dainik-jagran` | Devanagari masthead | Latin `Jagran` below a sun |
| `kr-donga-ilbo` | Hangul | Hanja `東亞日報` |
| `kr-joongang-ilbo` | Hangul | Latin `The JoongAng` |
| `jp-japan-times` | Red dotted j | Monochrome wordmark |
| `nz-1news` | Red wordmark | Red circular 1 and black news |
| `it-il-sole-24-ore` | White 24 ORE block | Black lettering with grey shadow |
| `ph-rappler` | Wordmark | Orange R emblem without the name |
| `ua-ukrainska-pravda` | Full wordmark | УП monogram |
| `se-dagens-nyheter` | Full masthead | DN. monogram |
| `sk-hospodarske-noviny` | Full masthead | HN ONLINE.SK lockup |

The monogram cases may still depict the correct organisation; their error is the explanation of the selected variant. Correct `logoExplainer` against the exact bytes used, rather than a remembered or different logo.

Also record actual variants: Página/12 carries a commemorative strap; La Jornada carries a 40-year anniversary device; Nhân Dân uses a Russian-edition lockup; El Observador includes a follow-us callout. These are not automatically fabricated images, but the metadata omits what was selected. Lithuania's Delfi SVG uses CSS animation; its overlapped static rasterisation must **not** be reported as a proven browser defect without a browser check.

## F62 — artwork provenance is not sufficiently preserved or identity-checked (P1)

Of the 227 backfills, 85 cite a specific Commons filename in `licenceNote`; the other 142 generically claim publisher-site brand assets. The cited Commons pages were all requested and source metadata obtained for 79. Six remained unresolved: Dnevnik, Ilta-Sanomat, Al-Joumhouria, Nhân Dân, Notimex and Hufvudstadsbladet. A retrieval failure does not establish a nonexistent source.

The new installer reads temporary harvest files, writes image/explainer/licence text, and prints a shortened hash. The harvester writes its detailed report under `tmp/logo-harvest/harvest-report.json`; that report is not among these committed additions. A generic publisher homepage or educational-use statement does not preserve the exact downloaded asset, author, modification history or declared licence.

Several cited Commons files have explicit Creative Commons terms, while `licenceNote` records only a generic trademark/educational-reference sentence. Preserve the actual file-page licence, author and applicable attribution separately from trademark status. This is a metadata finding, not a legal determination that every use is unauthorised.

**Required change:** commit a provenance manifest with exact source page, exact asset URL, stable entity ID, publisher country/domain, source revision, original/bundled hashes, transformations, licence/author, variant, applicable period, and specific verification results. Neither complexity thresholds nor a human-sounding verification sentence should qualify an asset as authentic. The four earlier publisher/agency consistency checks did not test these identity claims.

## F63 — Japan tourism record is accurate rounding but not the latest annual total (P2)

Japan's 36.9 million for 2024 is a reasonable rounding of the definitive **36,870,148** count. However, JNTO's Japanese-language annual table already gives **42,683,301 for 2025** and identifies 1964–2025 figures as definitive. The 2019 comparison baseline is 31,882,049. The problem is freshness under the dataset's latest-annual contract, not fabrication of the rounded 2024 number.

Primary source: [JNTO annual table](https://www.jnto.go.jp/statistics/data/_files/20260819_1615-8.pdf), reached from the [Japanese statistics index](https://www.jnto.go.jp/statistics/data/visitors-statistics/). The PDF was downloaded, rendered and visually read. Store the tourism measure precisely: visitor arrivals are not interchangeable with unique tourists, overnight stays or domestic trips.

## Passport evidence: origin verified, official series still unresolved

The source manifest identifies 188 passport images as drawn cover renderings obtained from GICG. Each live source image was fetched and SHA-256 compared: **all 188 match the recorded manifest hashes** after retrying 17 timed-out requests. No changed source bytes were found. This does not independently validate GICG's depiction or the official passport series. It also does not prove the corresponding repository bytes match the manifest unless that separate check has been performed; this ledger specifically tests manifest-to-source consistency.

Do not collapse first-issued date, last-issued date and expiry/validity into a single current/historical label. [PRADO's Irish ordinary-passport record IRL-AO-06001](https://www.consilium.europa.eu/prado/en/IRL-AO-06001/index.html) gives first issue on **26 June 2026** and identifies a burgundy cover. Japan's [Ministry of Foreign Affairs](https://www.mofa.go.jp/mofaj/toko/passport/pagew_000001_01253.html) explains issuance of its 2025 passport from **24 March 2025** and continued validity of earlier passports until expiry. These establish the need for series-level metadata; they do not establish that every older cover is invalid or that the bundled Irish image depicts the new series.

F02's Japanese cover-symbol error and F14's missing version/period information remain open. No passport has been newly certified as a current official design solely because its source hash matches.

## Evidence files and remaining work

- [GDP claim ledger](audit/GDP_CLAIM_VERIFICATION_2026-09-20.json): all 766 values, source URLs and outcomes.
- [Freedom House claim ledger](audit/FREEDOM_HOUSE_CLAIM_VERIFICATION_2026-09-20.json): all 193 scores/statuses, source methods and separate rank status.
- [Media image ledger](audit/MEDIA_IMAGE_VERIFICATION_2026-09-20.json): all 227 new assets, hashes, exact review scope, source-page observations and individual findings.
- [Passport origin ledger](audit/PASSPORT_ORIGIN_VERIFICATION_2026-09-20.json): all 188 source-hash comparisons and explicit limits.
- [Revision delta](audit/REVISION_43CFD13_DELTA_2026-09-20.json): all 231 changed paths and pinned blob identifiers.

Still **not universally verified**: all prose and metadata in the seven registries; official identity/currentness for the remaining images; each flag's legal adoption and symbolic interpretation; all arms blazons; passport variants; party leadership/seats/ideology and logos; airline/broadcaster ownership and brands; all population estimates and methods; V-Dem/EIU values; complete tourism/media claims; every historical territorial assignment and polygon boundary. The earlier structural map checks and visual samples cannot be relabelled as claim-level verification. Prior findings F01–F59 remain applicable except where a specific closure was recorded.

For completion, every factual field and distinct prose assertion needs its own verdict with evidence and an applicable date; every image needs both file provenance and identity/variant verification. An unresolved claim is an audit outcome, but it must not be counted as a verified claim. **This report therefore leaves the universal-verification request open.**
