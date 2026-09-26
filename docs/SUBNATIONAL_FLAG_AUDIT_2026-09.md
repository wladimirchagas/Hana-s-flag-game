# Subnational flag audit — 2026-09

Ledger for the September 2026 audit of every **state/province-level flag** (Learn-mode
subdivision cards, the sub-national flag game) and **capital-city flag** ("View capital") the app
shows. It records what was wrong, what it is now, the source that proves it, and the judgement
calls made, so a later reviewer can challenge any of them. Batches ship as separate PRs; each
section below says which batch fixed it.

## Method

Nothing was changed from memory. Every decision below rests on at least one of these sources,
fetched during the audit:

| Source | How it was used |
|---|---|
| **Wikidata** `P41` (flag image) of the item whose `P300` is the ISO 3166-2 code | One SPARQL pull for all 6,097 ISO 3166-2 items (with rank and start/end qualifiers). The app code is mapped through `scripts/data/wikidata-subdivision-code-aliases.mjs`. |
| **Wikimedia Commons** file pages | The description page of each reference file was read to catch `{{fictitious flag}}`, `{{proposed flag}}` and "own work, no source" drawings. |
| **Flags of the World** (FOTW, crwflags.com) | Country indexes and per-subdivision pages. This is the only source for whether a flag exists at all, and it says so explicitly ("There is no known flag for the province…"). |
| **Local-language Wikipedia infoboxes** (`bandera`, `Bandiera`, `image_flag`) | es/it/en/uk/ja/zh/pt articles for the subdivision itself, not its capital. |
| Official sites where cited (e.g. mk-oblrada.gov.ua for Mykolaiv) | For recent adoptions. |

Automated passes (scripts in the audit scratchpad, not shipped):

1. **Inventory**: for all 4,182 divisions in 204 countries, which file is shown and where it comes from (curated override, bundled file, runtime CDN, suppressed, none).
2. **Perceptual comparison** of every shown flag with the Wikidata reference (a mean colour distance on a 24×16 grid, plus a 576-bit dHash). Every pair beyond a small tolerance was montage-reviewed by eye: 132 pairs.
3. **Capital-city comparison**: every province flag was compared with its own capital's bundled city flag. This caught provinces that were showing their **capital city's** flag.
4. **Unbacked set**: the 235 shown flags with no Wikidata backing were montage-reviewed country by country and checked against FOTW and Wikipedia.
5. **Name/code check**: each division's app name against the Wikidata label of its ISO code. This caught mis-coded divisions (Posavina, Moscow).
6. **Recent-change scan**: Wikidata flags with start dates since 2018, plus the known 2024 US changes (Minnesota and Utah are correct).

## Batch 1 — wrong flags removed or replaced, bundling fixed

### 1. Flags that were not the subdivision's own flag — now suppressed (91 codes)

A missing flag beats a wrong one (CLAUDE.md). Every bundled file below was **deleted**, and every
code is in `SUPPRESSED_SUBDIVISION_FLAGS` with a one-line reason. The new
`check-subdivision-flags-bundled.mjs` fails the build if a suppressed code keeps a file.

| Class | Codes | Evidence |
|---|---|---|
| **Parent (national) flag** | AE-FU Fujairah (UAE flag) | Fujairah has flown the UAE flag since 1975; its red emirate flag is historical (FOTW ae-fu). |
| **Invented / fictitious** | ZM-01…10 (all 10 Zambian provinces) | FOTW's Zambia index (modified 2025-09-27) lists **no** provincial flags, only five city flags and two traditional ones. Wikidata has none either. |
| | SO-BK Bakool, SO-GE Gedo, SO-BR Bari, SO-SH Lower Shabelle, SO-BY Bay | FOTW documents only the Banaadir region flag (kept: it matches) and member-state flags. FOTW's own Bari (2012) and Gedo flags are different designs from ours. |
| | GH-AA Greater Accra, GH-TV Volta, GH-EP Eastern | Ghana's regions have no flags (FOTW gh.html). The GH-EP source is tagged `{{fictitious flag}}` on Commons, and the Greater Accra file is a 2022 "own work". |
| | GH-AH Ashanti | The image is the **Asante people's** traditional flag (FOTW gh_asa, Commons "flags of ethnic groups"), not the Ashanti Region's. |
| | ZA-EC, ZA-NC, ZA-NW, ZA-WC | Only **Mpumalanga** has a provincial flag (FOTW za-.html). The Commons files are 2011 user drawings, tagged `{{fictitious flag}}`. |
| | CR-SJ San José (CR) | "San José didn't adopt a flag yet… was used for short time some years ago" (FOTW cr-sj). The Commons file is tagged `{{proposed flag}}`. |
| **Coat of arms / seal / logo / text shown as a flag** | ZA-LP Limpopo, ZA-NL KwaZulu-Natal, ZA-GT Gauteng | Coats of arms on white. KZN's "local flag" is only a SAVA proposal; Gauteng's white logo flag is a government house flag, "not considered the flag of the province" (FOTW). |
| | RO-MH, RO-CT, RO-OT, RO-SV, RO-IF, RO-AG, RO-BZ, RO-BV, RO-SB, RO-B, RO-SM | Arms only. FOTW: "No information is available on flag" for each county. |
| | RO-TM Timiș, RO-HD Hunedoara | Arms-and-lettering logos; no documented flag. |
| | RO-CS Caraș-Severin | Its real flag is blue with the arms and name (FOTW); the file was the bare arms. |
| | NG-KT Katsina | The word "KATSINA" on white. en.wikipedia: *"Please do not add a flag here without a reliable source."* |
| | NG-KE Kebbi (map silhouette), NG-FC FCT ("Abuja — The Heart of Nigeria" brand), NG-EB Ebonyi (the state seal), NG-BA Bauchi, NG-KD Kaduna | No flag in FOTW, the en.wikipedia infobox or Commons "Flags of states of Nigeria". |
| | CU-14 Guantánamo | **The seal of the US Naval Base, Guantánamo Bay.** Cuban provinces have no flags (FOTW cu-.html; es.wikipedia "bandera = no"). |
| | CU-11 Holguín | The "San Isidoro de Holguín" municipal logo. |
| | DO-05 Dajabón ("Ayuntamiento Municipal" logo), DO-02 Azua (a shield), DO-31 San José de Ocoa (an emblem) | Not flags. |
| | TT-DMN Diego Martin, TT-PRT Princes Town, TT-RCM Mayaro–Rio Claro | Corporation badges/logos; the en.wikipedia infobox flag is empty. |
| | UY-MO Montevideo (black-and-white arms drawing), UY-TA Tacuarembó (logo) | No departmental flag in the es.wikipedia infobox. |
| | NI-SJ Río San Juan | A municipal "Alcaldía" logo. |
| **A capital CITY's flag standing in for the province** (Portugal-district rule) | CU-06 Cienfuegos | es.wikipedia: the province has no flag; this is the city's. |
| | ES-ZA Zamora (the city's *Seña Bermeja*), ES-V Valencia (the Valencian *senyera*), ES-TF Santa Cruz de Tenerife (Tenerife **island**'s flag) | es.wikipedia: none of the three provinces has a flag. |
| | IT-CT Catania, IT-PT Pistoia, IT-FG Foggia, IT-BG Bergamo, IT-ME Messina | Each file was the capital city's flag. The province has only a gonfalone, or no clean flag image exists (Bergamo's only image is a drawing on a pole; Messina's is a 2025 drawing with no blazon). |
| | IT-AG Agrigento, IT-MC Macerata, IT-AP Ascoli Piceno, IT-VI Vicenza | Arms-on-white images. it.wikipedia shows only a gonfalone for each province. |
| | NI-BO, NI-CA, NI-CI, NI-CO, NI-ES, NI-GR, NI-LE, NI-MD, NI-MN, NI-MS, NI-MT, NI-NS, NI-RI (all 13 Nicaraguan departments) | Nicaragua's departments have no elected government or flag. Every image was the capital municipality's flag: Managua's reads *"Ciudad de Managua"*, and Wikidata files Carazo and Chontales under **Jinotepe** and **Juigalpa**. The two autonomous regions (NI-AN, NI-AS) keep their flags. |
| **No known flag** | DO-10 Independencia, DO-09 Espaillat, DO-32 Santo Domingo | FOTW: "There is no known flag for the province of …" |
| | DO-15 Monte Cristi, DO-13 La Vega, DO-24 Sánchez Ramírez | No FOTW page, no es.wikipedia `bandera`. |

The explainers that described these images were removed from `flagMeanings.ts`: 18 entries
(ZA-EC/NC/NW/WC/LP, RO-CT, ES-V, IT-CT/PT/FG/AG/MC/AP/VI/BG/ME, AE-FU and NI-MT), plus the
Republika Srpska explainer, BA-SRP, removed with Posavina's fix (§4). The panel renders the
explainer even when no flag is shown, so each would otherwise have described a missing flag.

**Kept with a label.** ZA-FS Free State shows its coat of arms on white, marked *"Flag not
officially recognised by South Africa"*. FOTW za-fs (Bruce Berry, 2 Jan 2022) records that exactly
that flag is flown at the provincial legislature and at public events.

### 2. Wrong images replaced with the subdivision's real flag (10 codes)

Several of these had an explainer that already described the **correct** flag while the image
was wrong. The previous meaning sweep had read the right sources, but nobody replaced the file.

| Code | Was | Now (Wikimedia Commons) |
|---|---|---|
| CH-AR Appenzell Ausserrhoden | The **shield** of the coat of arms (0.82:1) | The square cantonal flag, `Flag of Canton of Appenzell Ausserrhoden.svg` |
| AU-WA Western Australia | A Blue Ensign with a **St Edward's Crown above the swan badge**, which is not the state flag | `Flag of Western Australia.svg`: the 1953 state flag, with no crown |
| UA-48 Mykolaiv Oblast | The 2001 flag (mitre on crossed crosiers) | The **2026** flag adopted by oblast council decision No. 5 of 16 April 2026 (mk-oblrada.gov.ua), `Flag of Mykolaiv Oblast (2026).svg` |
| JP-12 Chiba | Field in dark indigo `#1a15a3` | 空色 sky blue as set by the 1963 prefectural notice No. 328-2, `Flag of Chiba Prefecture.svg` |
| IT-CO Como | The **city**'s red flag with a white cross | The provincial flag, `Provincia di Como-Bandiera.svg` |
| IT-AN Ancona | The **city**'s red flag with a gold cross | The provincial flag, `Provincia di Ancona-Bandiera.svg` |
| IT-LC Lecco | The **city**'s arms on blue | The provincial flag, `Provincia di Lecco-Bandiera.svg` |
| ES-A Alicante | The **city** arms (A-L-L-A) | The provincial flag, `Alicante (provincia).svg` |
| ES-TO Toledo | The **city**'s crimson flag with the imperial eagle | The Diputación's green flag, `Bandera de la provincia de Toledo.svg` |
| PH-ILI Iloilo | The bare seal (a square image) | The provincial flag (the seal on white, 2:1), `Flag of the Province of Iloilo.svg` |

Large or viewBox-less SVGs were bundled as Wikimedia's own 1280 px PNG renders. Sources are recorded
in `public/flags/sources.json`.

**Checked and deliberately not changed:** IT-PC Piacenza. The province's own flag *is* red with a
white square (`Flag of the province of Piacenza.svg`), the same symbol as the city's. Wikidata's
`P41` points at a blue "(Variant)" file.

### 3. Bundling: no more runtime CDN (≈350 flags)

`src/lib/subdivisionFlagIndex.ts` listed only part of the bundled files as local. The rest,
**356 flags** were fetched at runtime from a CDN. They included 31 US states plus the Northern
Mariana Islands (California, New York, Massachusetts…), 59 Italian provinces (Rome, Lucca…), 42
Thai provinces, 36 Spanish provinces, 31 Hungarian counties, 23 Mexican states and 18 Russian
regions. The CDN was
`cdn.jsdelivr.net/gh/amckenna41/iso3166-flags`. During this audit jsDelivr answered **403/404 for
46 of them** in one pass, which leaves those cards blank for users. **348 of the 356 files were
already in the repo** (347 byte-identical). The index now lists every bundled file and has **no CDN
fallback**, and the 8 files that were missing were bundled (NI-MN was then suppressed). The new
`scripts/check-subdivision-flags-bundled.mjs` (in `flags:check` and the `flag-integrity` CI job)
fails the build if:

- an indexed code has no file;
- a bundled file is unreferenced;
- a suppressed code keeps a file;
- a file's bytes don't match its extension;
- any remote URL appears.

The check also found:
- **PT-01…PT-07** (city gonfalons "Cidade de Beja", "Cidade de Coimbra"…) were still bundled and
  indexed. The earlier Portugal ruling said they had been deleted; they now are.
- **LV-102.png** was a WebP file with a `.png` name. It was converted to a real PNG, with pixels
  unchanged.

### 4. Mis-coded subdivisions (the whole data chain was wrong, not just the flag)

| Division | Problem | Fix |
|---|---|---|
| **Posavina Canton** (Bosnia and Herzegovina) | Natural Earth gives the canton **Republika Srpska's ISO code BA-SRP**. The Croat-majority Federation canton therefore showed: the **Republika Srpska flag**; its explainer; "Република Српска" as local name; RS's population, **1,228,423** (the canton has ~43,000); **Sarajevo** as capital (seat: Orašje); and Sarajevo's city flag. A previous sweep had noticed the mismatch in `capital-meaning-omitted.txt` but left it. | `public/subdivisions/BA.json` drops the code. The canton is now keyed by name like its nine sibling cantons. All BA-SRP rows were removed (population, capital, endonyms, capital flag, explainer). |
| **Moscow / Moscow Oblast** | Natural Earth **swapped** RU-MOW and RU-MOS. A meta name override hid it by renaming. So the **city** card showed the oblast's population (8.59 M), "Московская" as local name and **Krasnogorsk** as its capital; the **oblast** card showed the city's 13.27 M. | Codes swapped back in `RU.json`, override corrected. `cities.ts`, `nationalCapitalLocations.ts` and meta were regenerated. Krasnogorsk was added as the oblast's capital marker (a Wikidata fallback, applied surgically; a full regeneration of that file drags in unrelated drift). |
| **Spain's 43 provinces** | Natural Earth tags every province with its community's type, so all 50 cards said "Autonomous Community". | Typed "Province" (ISO 3166-2:ES). The 7 single-province communities and the 2 autonomous cities keep their labels. |

### 5. Knock-on fixes

- `sharedCapitalFlags.ts` was regenerated. A capital flag had been hidden as a "duplicate" of the
  city flag the province was wrongly showing (Como, Ancona, Catania, Bergamo, Messina, Cienfuegos,
  Holguín, the Nicaraguan capitals…). Those city flags now show in "View capital", where they
  belong. The generator no longer folds in a curated pair whose subdivision flag is suppressed or
  gone. **SV-AH** (Ahuachapán ≡ its capital) had silently gone stale (distance 24, not 8), so it is
  now curated.
- `subdiv-remaining.mjs` now counts curated `LOCAL_FLAG_OVERRIDES` too. This surfaced **35
  displayed flags with no explainer**: Jersey, Guernsey, Gibraltar, the Faroes, Åland, Cook
  Islands and others. See the follow-ups below.

## Batch 2 — Malaysia (owner priority, 2026-09-26)

Every flag the app shows for Malaysia was checked: the 13 state and 3 federal-territory flags, all
capital-city flags, and every explainer against its cited source.

**State and territory flags — all correct.** All 16 match Wikidata `P41` and the Commons originals
side by side, and the 14 existing explainers match their cited articles, including the adoption
dates: Negeri Sembilan 1895, Pahang 1903, Perak 1879, Malacca 16 July 1957, and Sabah and Sarawak
1988.

**Two missing explainers added.** Labuan and Putrajaya had been logged as unsourceable. The log
cited FOTW pages `my-labuan` and `my-putrajaya`, which are guessed filenames that 404. FOTW's Malaysia
index (`my_index.html`) links the real pages, `my-labua.html` and `my-pj.html`.
- Labuan: the colour and emblem symbolism is from the Malay Wikipedia article
  [Identiti, Bendera dan jata Labuan](https://ms.wikipedia.org/wiki/Identiti,_Bendera_dan_jata_Labuan).
  The adoption year is left out: sources disagree (1984 on ms.wikipedia, 31 August 1992 on
  en.wikipedia).
- Putrajaya: the flag was adopted 1 February 2001, and the national arms mark the territory as the
  federal administrative centre ([Identiti Putrajaya](https://ms.wikipedia.org/wiki/Identiti_Putrajaya)).
  Colour meanings circulate for this flag, but their primary source is the Information Department
  booklet *Mari Kenali Bendera Negeri-Negeri di Malaysia*. `dbook.penerangan.gov.my` could not be
  reached, so they are not used.

**Capital-city flags — two showed a different entity's flag.**

| Capital | Was | Evidence | Now |
|---|---|---|---|
| **Seremban** (MY-05) | `Flag of Sungei Ujong.svg` — the flag of **Sungai Ujong**, one of the nine traditional chiefdoms (*luak*) of Negeri Sembilan | FOTW [my-n-su](https://www.crwflags.com/fotw/flags/my-n-su.html) ("quartered black, yellow, white and green") vs [my-05-se](https://www.crwflags.com/fotw/flags/my-05-se.html) | The **Seremban City Council** flag: yellow–black–red with the council emblem, city since 1 Jan 2020. en.wikipedia `Flag of Seremban.png` (PD-Malaysia), identical to FOTW's image. New explainer from the council's own [logo page](https://www.mbs.gov.my/ms/mbs/profil/logo) |
| **Kuala Terengganu** (MY-11) | `Flag of Kuala Terengganu, Terengganu.svg` — the **district** flag (yellow with the state flag in the canton) | The Commons file page says "a district in Terengganu", and FOTW [my-ter-m](https://www.crwflags.com/fotw/flags/my-ter-m.html) lists it among the district flags. It gives the Kuala Terengganu City Council (MBKT) flag separately | **No flag**. MBKT's flag has no free file on Commons or en.wikipedia; its explainer is removed |

Both rejections are recorded with their evidence in the new `scripts/data/capital-flag-rejected.json`.
`build-capital-details.mjs` drops these entries on every regen, and `backfill-capital-flags.mjs` never
proposes them. `check-capital-flags.mjs` fails the build if either is back in the manifest. A
wrong-entity flag can therefore not return through the Wikidata pass, an override or a preserved
manifest entry.

**Explainers corrected.**
- Kota Kinabalu (MY-12) had given its flag the colour meanings of Sabah's **1963 state flag**, which
  no source ties to the city flag. It now says only what FOTW documents: Mount Kinabalu was chosen to
  represent Sabah's capital, and the flag was first raised at midnight on 1 February 2000, when the
  city was proclaimed.
- Putrajaya's capital-city entry had given the flag the colour meanings of the 2006 combined
  **Federal Territories flag**, a different flag. It is now aligned with the subdivision entry. The
  capital widget hides this flag anyway, because it duplicates the territory's.

**Omission logs cleaned.** Seremban's entry had described the chiefdom flag as the "MBS council
flag". Shah Alam's was stale: its flag and explainer have displayed since the Klang/Shah Alam fix.

**Gaps that stay open, with reasons.**
- No free file exists for the city-council flags of Kota Bharu, Kuantan (city since 21 Feb 2021),
  Kangar, Kuching (Kuching North City Hall and Kuching South City Council are separate councils) or
  Kuala Terengganu. FOTW documents all of them except Kota Bharu. Commons holds only the Kota Bharu
  **district** flag, an unsourced 2015 "own work", which is not used.
- The population of Labuan's capital, Victoria, is still a 2000 estimate. DOSM publishes no
  newer figure for the town, only for the whole territory (95,120 in the 2020 census).

## Follow-ups (later batches)

### Gaps — real flags the app shows blank

These have an official flag documented by Wikidata `P41` and the local-language Wikipedia, but show
nothing. Mostly this is an ISO-code mismatch between the flag data and the app's codes.

| Country | Divisions | Notes |
|---|---|---|
| Poland | all 16 voivodeships | Flags keyed PL-02…PL-32, app uses PL-DS…PL-ZP |
| Czechia | all 14 regions | CZ-10… vs CZ-PR… |
| Estonia | 11 of 15 counties | ISO renumbered in 2022 |
| Slovakia | Bratislava, Banská Bystrica | |
| Switzerland | Aargau, Appenzell Innerrhoden | |
| South Korea | Seoul, Busan (2023 flag) | |
| Liechtenstein | Balzers, Eschen, Gamprin | |
| Netherlands | Limburg | |
| Saint Helena, Ascension and Tristan da Cunha | all 3 | |
| Comoros | Anjouan, Mohéli, Grande Comore | |
| Russia | Moscow, Moscow Oblast, Oryol | Codes now correct |
| Norway | the 7 counties re-established in 2024 | Østfold, Akershus, Buskerud, Vestfold, Telemark, Troms, Finnmark |
| Malta | 10 local councils | |
| Guatemala | 22 departments | |
| North Macedonia | ~80 municipalities | |
| Italy | Aosta Valley (the region *is* the province), South Tyrol, ~12 provinces | Only where a real *bandiera* exists |
| Moldova | Gagauzia, Chișinău, Bălți, raions | Needs per-raion verification |

Each needs a sourced explainer or a documented omission (CLAUDE.md).

### Explainers
The 35 curated-override flags listed in §5.

### Judgement areas to settle
- **French departments.** No department has an official flag. The app shows a mix of council logo
  flags and heraldic flags, some of them Commons proposals (`Proposed flag of Doubs.svg`, FR-65 is
  `{{fictitious flag}}`). This needs a policy decision before any change.
- **Mexican states.** Most use the arms on white de facto; only a few are official. Colima's Commons
  file is `{{fictitious flag}}`. Consider an "unofficial" label rather than removal.
- **Paraguay.** PY-12 Ñeembucú and PY-16 Alto Paraguay have two different designs across sources
  (ours vs es.wikipedia), and FOTW has no image. PY-1 Concepción lacks the arms that FOTW's flag
  carries.
- **El Salvador and Honduras** departments whose flag equals the capital's (FOTW says Comayagua's
  department uses its capital's flag). Review them against the Nicaragua and Portugal rule.
- **GE-AB Abkhazia** shows the Republic of Abkhazia flag labelled unofficial, as CLAUDE.md
  specifies. Georgia's own Autonomous Republic of Abkhazia flag (Georgian cross canton) exists and
  could be mentioned in the note.

### Structural data found in passing (not flag images)
- **Iran**: IR-14/22/23 carry shifted ISO codes, so "Hormozgan" is keyed as Tehran.
- **Guyana**: GY-ES is mis-coded.
- **Latvia**: divisions are pre-2021 municipalities, and many old codes are named "Valmiera".
- **Vietnam**: provinces were merged in June 2025.
- **Indonesia**: six provinces created in 2022 are missing.
- **Norway**: counties changed in 2024.
- **Nepal**: the zones were dissolved in 2015.
- **Kenya**: pre-2013 provinces.
- **Luxembourg**: districts were abolished in 2015.
- **Ethiopia**: SNNPR split in 2023.
- **Sardinia**: provinces restructured in 2016–2025.
- **Bosnia**: the ten cantons could carry their ISO codes BA-01…BA-10.
- **Deep links**: `?sub=` uppercases its value, so name-keyed divisions such as Posavina cannot be
  deep-linked.

### Capital-city flags
Batch 1 fixed only the knock-on effects above. A systematic comparison of `capitalFlags.ts` with
each capital's own Wikidata `P41` is a separate batch. Malaysia (batch 2) showed what to look for:
a capital given its **district's** flag (Kuala Terengganu) or a **traditional chiefdom's** flag
(Seremban). Commons file pages that say "district" are the first thing to sweep for.
