# Political-party dataset — rolling audit & refresh (2026)

**Standing mandate, given by the repository owner on 2026-09-11:**

> Audit **and fix** the Learn-mode political-party data for **all 195 countries**, one country at a
> time, in the priority order below. **Finish a country, then ship it to production before starting
> the next one.** Do not stop to ask whether to continue. The job is done only when all 195
> countries have been audited. Keep this document updated as you go so nothing is lost.

This file is the **living record**: the queue, the per-country verdicts, and every finding with its
fix. It is written incrementally — a country is added the moment its work merges, never batched.
The method, the freshness contract and the severity model live in
[`POLITICAL_PARTY_AUDIT_PROMPT.md`](./POLITICAL_PARTY_AUDIT_PROMPT.md); this file is the ledger.

**Working rule for each country:** verify → fix `src/data/politicalParties.ts` → `npm run
flags:check` → visual check in the running app → update this file → commit → PR → squash-merge →
`npm run live:check` → next country.

---

## Baseline as measured on 2026-09-11 (commit `c631c65`, then live)

90 of 195 countries covered · 389 parties · 11 coalitions. Whole-dataset defects found in the
survey, each to be closed as its country comes up in the queue:

| # | Defect | Scale |
|---|---|---|
| B1 | Seat sums exceed the chamber total (arithmetically impossible) | `DK` 197/179, `FI` 215/200, `NO` 191/169, `ID` 609/575, `SG` 98/97, `GY` 72/65 |
| B2 | Two different `seatsTotal` values inside one country | `ID` (575 and 580) |
| B3 | Parties recorded with 0 seats, contradicting the file's own scope rule | 19 parties; `AM` and `BD` have no seated party at all |
| B4 | Chamber coverage under 60% | 22 countries, incl. single-party entries for `DE`, `FR`, `GB`, `ES`, `CA`, `PL`, `UY` |
| B5 | No logo | 69 parties, against a 23-entry grandfather allowlist |
| B6 | `inPower` true but no `inExecutive` party | 59 of 90 countries |
| B7 | Single-source concentration | 664 of ~750 citations are English Wikipedia |
| B8 | **No date field in the schema** — staleness is undetectable by construction | whole dataset |

**B8 is the structural root cause** and is deliberately being deferred until enough countries are
refreshed to know what shape the field should take (per-party `asOf`, or per-country). It is not
forgotten; it is tracked here.

---

## Progress

**Countries audited: 25 / 195 — Southeast Asia and South America complete; Phase 4 under way.**

| Country | Merged | Parties before → after | Chamber coverage | Verdict before |
|---|---|---|---|---|
| 🇦🇺 Australia | `#1313` | 3 → 9 | 142 / 150 | **STALE — S1** |
| 🇲🇾 Malaysia | `#1314` | 22 → 22 | 212 / 222 | **CURRENT on seats — S2/S3 elsewhere** |
| 🇧🇷 Brazil | `#1315` | 12 → 22 | **513 / 513** | **WRONG — S1, worst so far** |
| 🇲🇲 Myanmar | `#1317` | not covered (decision recorded) | — | **OUT OF SCOPE, documented** |
| 🇹🇭 Thailand | `#1317` | 20 → 20 | 497 / 500 | **NEARLY CURRENT — S2/S3** |
| 🇻🇳 Vietnam | `#1318` | 1 → 1 | 482 / 500 | **WRONG — S1 (deceased leader)** |
| 🇮🇩 Indonesia | `#1319` | 8 → 8 | **580 / 580** | **WRONG — S1 (wrong company's logo)** |
| 🇵🇭 Philippines | `#1320` | 13 → 16 | 261 / 318 | **STALE — S2/S3** |
| 🇸🇬 Singapore | `#1321` | 2 → 2 | 98 / 108 | **IMPOSSIBLE TOTAL — S1** |
| 🇰🇭 Cambodia | `#1322` | 2 → 2 | 125 / 125 | **WRONG — S1 (unidentified logo, wrong leader)** |
| 🇱🇦 Laos | `#1323` | 1 → 1 | 169 / 175 | **STALE — a whole parliament behind** |
| 🇧🇳 Brunei | `#1324` | **3 → 0 (removed)** | n/a | **FABRICATED REPRESENTATION — S1** |
| 🇹🇱 Timor-Leste | `#1325` | 5 → 5 | 65 / 65 | **WRONG — S1 (an audio file as a logo)** |
| 🇦🇷 Argentina | `#1326` | 19 → 19 | 257 / 257 | **NEARLY CURRENT — one rename missed** |
| 🇨🇱 Chile | `#1327` | 7 → 14 | 151 / 155 | **WRONG — a whole parliament and government** |
| 🇨🇴 Colombia | `#1328` | 5 → 13 | 158 / 183 | **WRONG — the largest party was absent** |
| 🇵🇪 Peru | `#1329` | 6 → 6 | **130 / 130** | **WRONG — a legislature that no longer exists** |
| 🇻🇪 Venezuela | `#1330` | **1 → 20** | 277 / 285 | **WRONG — one party credited with every seat** |
| 🇪🇨 Ecuador | `#1331` | 4 → 6 | 133 / 151 | **WRONG — a fictitious party with 17 seats** |
| 🇧🇴 Bolivia | `#1332` | 3 → 6 | 129 / 130 | **WRONG — two invented parties, no government** |
| 🇵🇾 Paraguay | `#1333` | 3 → 7 | 77 / 80 | **WRONG — a chamber size that never existed** |
| 🇺🇾 Uruguay | `#1334` | 1 → 6 | **99 / 99** | **WRONG — a fabricated logo explainer** |
| 🇬🇾 Guyana | `#1335` | 3 → 3 | 64 / 65 | **IMPOSSIBLE TOTAL — 72 seats in a 65-seat chamber** |
| 🇸🇷 Suriname | `#1336` | 2 → 6 | 50 / 51 | **WRONG — a defunct 1987 coalition marked as governing** |
| 🇬🇧 United Kingdom | `#1337` | **1 → 15** | 637 / 650 | **WRONG — a former prime minister, no opposition at all** |

---

## Findings

### 🇦🇺 Australia — audited 2026-09-11

Production was showing the **2022 parliament**, three elections' worth of leadership out of date,
with a seat count that was wrong even for 2022.

Verified against the [48th Parliament of Australia](https://en.wikipedia.org/wiki/48th_Parliament_of_Australia)
(party summary and the full membership-changes table) and
[Members of the Australian House of Representatives, 2025–2028](https://en.wikipedia.org/wiki/Members_of_the_Australian_House_of_Representatives,_2025%E2%80%932028)
(current party standings, as of 25 June 2026 — the most recent change on record), plus each party's
own article. `aph.gov.au` returns HTTP 403 to automated fetches, so the parliamentary record was
reached through its Wikipedia mirrors rather than directly; noted as a sourcing limit, not a gap.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-001 | **S1** | `AU-LNP.leader` | Peter Dutton | — (entry replaced) | Dutton lost his own seat of Dickson at the 3 May 2025 election and ceased to be Liberal leader |
| PP-002 | **S1** | `AU-GRN.leader` | Adam Bandt | Larissa Waters | Bandt lost Melbourne in 2025; Waters is Greens leader |
| PP-003 | **S1** | `AU-LNP` identity | "Liberal/National Coalition" modelled as a single **party**, founded 1931 | Split into `AU-LIB` (Liberal, 17), `AU-NAT` (Nationals, 8) and `AU-LNP` (Liberal National Party of Queensland, 16), joined by a new `AU-COALITION` record | The Coalition is an alliance, not a party; 1931 is neither the Liberal Party's founding (1944) nor the Coalition's |
| PP-004 | **S1** | `AU-LNP.logoSourceUrl` | `File:Liberal_National_Coalition.svg` | `File:LNP_Regular.svg` | The bundled bytes (sha `1ce1c62a…`) are the **Queensland LNP** logo — verified by rendering it. Production was captioning a real party's logo as a coalition's |
| PP-005 | **S2** | `seats` / `seatsTotal` | ALP 67, LNP 58, GRN 4 of **151** | 94 / 17 / 16 / 8 / 2 / 2 / 1 / 1 / 1 of **150** | The House was reduced to 150 seats at the 2025 election. ALP 67 was wrong even for the 2022 parliament (77) |
| PP-006 | **S3** | coverage | 3 parties, 129 seats | 9 parties, 142 seats | The 8 remaining seats are independents, correctly not modelled as a party |
| PP-007 | **S3** | missing parties | — | One Nation (2), Community Strong Australia (2), Centre Alliance (1), KAP (1) added | Six bundled logos were sitting unused in `public/party-logos/au/` while the data referenced only three |
| PP-008 | **S3** | `inExecutive` | absent | `AU-ALP: true` | Second Albanese ministry, formed 13 May 2025 |
| PP-009 | **S6** | `founded`, `ideology`, `positionRaw` | ALP ideology included "Progressivism"; Greens "Social democracy"; positions loosely worded | Re-copied verbatim from each party's current infobox | e.g. Greens are "Left-wing", not "Left" |

**Judgement calls, recorded so they can be challenged.**

1. **Liberal 17 / LNP 16 / Nationals 8**, not the party-room figures the parties' own infoboxes
   give (Liberal 27, Nationals 14). The infobox numbers distribute the 16 Queensland LNP MPs into
   the two federal party rooms, so using them would double-count the LNP and push the country's
   seat sum over 150 — exactly defect B1. The disaggregated standings are cited on each entry.
2. **KAP carries `ideologyPosition: "right"` with no `positionRaw`.** English Wikipedia leaves
   KAP's position field deliberately blank by talk-page consensus, so there is no raw string to
   quote; the bucket is cited to The Conversation's survey of Australia's minor right-wing parties
   rather than assigned by us.
3. **Centre Alliance and Community Strong Australia carry no `leader`.** Neither designates one —
   Centre Alliance's sole MP calls herself "a party of one". An absent leader is the honest record.
4. **The Coalition record notes its own discontinuity**: the agreement lapsed on 22 January 2026
   and was re-formed on 8 February 2026. Shown as a coalition of three parties with the note
   attached, rather than flattened into one.

**Visual verification:** the Political parties tab renders all 9 cards grouped by ideology, every
logo painted (`img.complete && naturalWidth > 0` asserted for all nine), ALP badged *In-power*, and
the three Coalition members badged *Liberal–National Coalition*. No console errors.

### 🇲🇾 Malaysia — audited 2026-09-11

The best-kept country in the dataset so far, and the first evidence that the survey's whole-dataset
defects are not uniform: **every one of Malaysia's 22 seat figures already matched the chamber
exactly.** The failures here were relational rather than numeric.

Verified against the [Dewan Rakyat](https://en.wikipedia.org/wiki/Dewan_Rakyat) infobox's political
groups (dated 10 August 2026 — Government 150, Opposition 69, vacant 3, of 222), the
[Anwar Ibrahim cabinet](https://en.wikipedia.org/wiki/Anwar_Ibrahim_cabinet) member-parties table
(ministers per party after the 17 December 2025 reshuffle), and all 22 parties' own infoboxes.

Reconciliation of the chamber against the dataset, party by party:
PH 76 (DAP 40, PKR 28, AMANAH 8) · BN 30 (UMNO 26, MCA 2, MIC 1, PBRS 1) · GPS 23 (PBB 14, PRS 5,
PDP 2, SUPP 2) · GRS 7 (direct 4, UPKO 2, PBS 1) · WARISAN 3 · KDM 2 · STAR 1 · PBM 1 ·
PN 49 (PAS 43, WAWASAN 6) · BERSATU 19 · MUDA 1. Every figure matched. The 10-seat gap to 222 is
7 independents and 3 vacancies — correctly not modelled as parties.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-010 | **S2** | `MY-BERSATU.coalitionId` | `MY-PN` | *(removed)* | Bersatu is no longer counted inside Perikatan Nasional: PN's own affiliate list marks it **"disputed"**, and the Dewan Rakyat counts its 19 seats as a bloc of their own, outside PN's 49. `MY-PN`'s members are now PAS + WAWASAN, with the dispute recorded in the coalition's `note` |
| PP-011 | **S3** | `inExecutive` | absent on all 22 | `true` on the 9 parties holding full cabinet portfolios — PKR (9 ministers), UMNO (7), DAP (5), PBB (3), AMANAH (2), PBRS, PDP, PRS, GRS (1 each) | The cabinet's own member-parties table. This is the first country-level fix for defect **B6** |
| PP-012 | **S6** | `MY-GRS.ideologyPosition` | `other` (no `positionRaw`) | `centre`, `positionRaw: "Centre to centre-right"` | GRS's infobox does carry a sourced position; `other` was a placeholder, not a genuine absence |
| PP-013 | — | seat citations | party articles only | every entry now also cites the Dewan Rakyat's dated composition | Closes the circular-citation risk: seats are cited to the chamber, not to the party describing itself |

**Confirmed correct, and therefore left alone:** all 22 leaders (DAP's leader is its
Secretary-General Anthony Loke, not the National Chairman — checked against the infobox's own title
fields); the 18 `inPower` flags; every `founded` year; and the `previousNames` chains, including
WAWASAN's rename from Parti Cinta Malaysia on 13 June 2026 and PBM's from Sarawak Workers Party.

**Judgement calls.**

1. **`inExecutive` means a full cabinet portfolio, not a deputy ministry.** SUPP, PBS and WARISAN
   hold deputy ministries only and are recorded `inPower: true, inExecutive: false`. MCA and MIC sit
   in the government with no portfolio at all. This reading is applied consistently from here on.
2. **GRS is modelled as a party with 4 seats** even though it is also a coalition, because the
   Dewan Rakyat itself counts 4 "GRS direct member" MPs who belong to no component party. The
   `MY-GRS` coalition record and the `MY-GRS` party entry therefore coexist by design.
3. **Bersatu is left with no coalition rather than being forced into PN.** Where a membership is
   genuinely contested, recording no coalition and explaining why beats asserting either side.

**Visual verification:** 22 cards, 21 logos asserted painted, PBM correctly rendering its "No free
image" card, In-power and coalition badges correct, GRS now grouped under Centre. No console errors.

### 🇧🇷 Brazil — audited 2026-09-11

The worst country found so far. **Ten of the twelve seat figures were wrong, ten parties were
missing — including PL, the largest party in the Chamber with 98 seats — and five parties carried
the wrong leader, one of them a deputy who belongs to a different party.**

**A better source, and why it matters.** English Wikipedia's Chamber-of-Deputies infobox lists party
figures that sum to **515 of 513** — an impossible total, so it cannot be used as the seat authority.
The Câmara dos Deputados publishes its own bench as open data
([`/api/v2/deputados`](https://dadosabertos.camara.leg.br/api/v2/deputados)); it returns all 513
sitting deputies, and the party tally sums to exactly 513. Every seat figure here now comes from
that official source. Government/opposition status comes from the
[Second cabinet of Lula da Silva](https://en.wikipedia.org/wiki/Second_cabinet_of_Lula_da_Silva)
(its supporting-parties table and the cabinet's own party key), and identity facts from each party's
own article.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-014 | **S3** | coverage | 12 parties, 364 / 513 | **22 parties, 513 / 513** | Missing: **PL 98**, PSB 17, PDT 9, NOVO 5, Avante 5, Solidariedade 4, REDE 3, PRD 3, DC 1, MISSÃO 1. Nine of their logos were already bundled and unreferenced; DC's was sourced and bundled in this change |
| PP-015 | **S1** | `seats` | 10 of 12 wrong | corrected | e.g. PODEMOS 11 → **27**, PSDB 33 → **18**, CIDADANIA 9 → **2**, UNIÃO 58 → **52**, PSD 43 → **48**, PP 41 → **46**, PCdoB 6 → **11** |
| PP-016 | **S1** | `leader` | PV led by **Sâmia Bomfim** — a PSOL deputy, not PV's president | José Luiz Penna | PV's own infobox |
| PP-017 | **S1** | `leader` | PSOL **Edmilson Rodrigues**; PODEMOS **Ciro Gomes**; PSDB **Bruno Araújo**; Cidadania **Roberto Freire** | Paula Coradi; Renata Abreu; Aécio Neves; Comte Bittencourt | each party's infobox |
| PP-018 | **S1** | `founded` | PSD **1945** | **2011** | 1945 is the *defunct* PSD of the Vargas era — a different party entirely |
| PP-019 | **S2** | `founded` | PP 1965; PODEMOS 2015; Republicanos 1989; Cidadania 1988 | 1995; 1995; 2003; 1992 | party infoboxes |
| PP-020 | **S1** | `ideologyPosition`, `ideology` | PODEMOS recorded as **left-wing / social democracy / environmentalism** | **centre-right**, economic liberalism, anti-corruption | Podemos is a centre-right party; the entry described a different party altogether |
| PP-021 | **S2** | `ideologyPosition` | PSD, MDB, PSDB all `centre` | all `centre-right`, each with its source's own `positionRaw` | infobox positions ("Centre to centre-right") |
| PP-022 | **S3** | `inPower` / `inExecutive` | only PT in power; `inExecutive` false everywhere | **14 in power, 11 holding ministries** | the cabinet's party key: PT 19 ministries, PSB 6, PDT/MDB/PSD/UNIÃO 3 each, PSOL 2, Republicanos/PCdoB/REDE/PP 1 each. PV, Avante and Solidariedade are coalition members without portfolios |
| PP-023 | **S1** | coalition identity | `BR-FE` named **"Frente Ampla"** (a different organisation) with a URL to match | **Federação Brasil da Esperança** / Brazil of Hope | The PT–PCdoB–PV federation registered in 2022 |
| PP-024 | **S4** | coalition URLs | `BR-UP` cited `…/wiki/Unionão_Progressista` — a malformed title that 404s; `BR-AF` cited `…/wiki/Sempre_Frente` | both re-pointed at the live articles | Link-integrity pass |
| PP-025 | **S3** | missing coalitions | 3 federations | **5** — added `BR-PSOLREDE` (PSOL + REDE) and `BR-RS` (Solidariedade + PRD) | Both are federations the Chamber counts as single blocs |
| PP-026 | **S4** | `logoSourceUrl` | recorded by hand; `BR-PSD` cited the **Brazilian Democratic Movement** article | every logo re-pointed at the Commons file whose **SHA-1 matches the bundled bytes exactly** | All 21 bundled logos were matched to Commons by content hash, not by trusting the recorded URL. This is now the standard provenance method for the sweep |

**Judgement calls.**

1. **`inPower` is the union of the cabinet's "government parties" and the parties actually holding
   ministries.** Brazil's coalition politics puts PSD, MDB, Republicanos, UNIÃO, PP and PDT in the
   cabinet while the Chamber classifies them as *Independent*; recording them as out of power would
   contradict their ministers. The Chamber's own classification is cited alongside so a reader can
   see both.
2. **REDE's `ideologyPosition` is `other`.** Its infobox gives two opposite axes ("Social:
   left-wing; Fiscal: right-wing") and no single bucket. `other` exists for exactly this.
3. **MISSÃO carries no leader.** Its infobox names none.
4. **Cidadania's exit from the PSDB federation is kept as a coalition note** — confirmed: its
   national directory voted in 2025 to end the federation in 2026, the earliest Brazilian electoral
   law allows.

**Visual verification:** 22 cards grouped by ideology, all 22 logos asserted painted after scrolling
the full grid, executive/legislative badges and all five federation labels correct. (The console
shows `ERR_CONNECTION_RESET` for `restcountries.com`, which is blocked in this environment and
unrelated to party data — the bundled-fallback rule covers it.)

### 🇲🇲 Myanmar — audited 2026-09-11 · **deliberately out of scope**

Myanmar is absent from the dataset, and after auditing it the absence is **correct** — but it was
undocumented, which is the failure mode this repo calls out elsewhere ("an omission the user cannot
see makes an incomplete set look complete"). It is now recorded.

The junta held elections in three phases from 28 December 2025 to 25 January 2026, the first since
the 2021 coup. The dataset's scope rule admits only competitive multi-party systems, and this
process does not qualify on its own published record: the 2023 electoral law barred convicted
persons including Aung San Suu Kyi and Win Myint from standing, the main opposition party was
dissolved, and the vote is described by the sources as intended to legitimise continued military
rule. Beyond scope, the arithmetic is not sourceable either — declared Pyithu Hluttaw results
account for 258 elected seats across 11 parties, constituencies were cancelled for conflict, and a
quarter of the chamber is appointed by the military rather than elected, so no defensible
seats/seatsTotal pair exists.

**Decision: leave Myanmar uncovered.** Revisit if a competitively-elected chamber is seated and its
composition is published. A wrong chamber would be worse than an absent one.

### 🇹🇭 Thailand — audited 2026-09-11

Thailand was the first country found already refreshed past its most recent election — the data
reflects the **27th House elected 8 February 2026**, not the 2023 parliament. The defects were a
single wrong seat count, two missing micro-parties, a misused field, and the usual missing
`inExecutive`.

Verified against the [House of Representatives](https://en.wikipedia.org/wiki/House_of_Representatives_(Thailand))
political groups (Government 292, Opposition 207, 1 vacant, of 500) and the
[Second Anutin cabinet](https://en.wikipedia.org/wiki/Second_Anutin_cabinet).

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-027 | **S2** | `TH-BJT.seats` | 192 | **191** | The chamber's own group list. Bhumjaithai leads a 292-seat government under Anutin Charnvirakul |
| PP-028 | **S1** | `TH-TST.leader` | the string *"Vacant (Sudarat Keyuraphan resigned as party leader on 12 February 2026, saying \"there is no place for idealists\" in current Thai politics)"* | *(omitted)* | The field is a person's name and is rendered as one — a 130-character sentence was being displayed to users as a leader. The resignation is now recorded in a cited source title instead. **Class defect: check every country for prose smuggled into `leader`.** |
| PP-029 | **S3** | `inExecutive` | absent on all 20 | `true` on the **12** covered parties holding ministries | The cabinet lists thirteen member parties; the thirteenth (New Dimension) is not in the dataset — see below |
| PP-030 | **S3** | coverage | 20 parties, 497 / 500 | unchanged, gap documented | Two seated parties are **knowingly absent**: **New Dimension** (1 seat, in the cabinet) and **Thai Sub Thawee** (1 seat) |

**Why two seated parties were left out — and the structural finding behind it.**
Neither has an article in English or Thai Wikipedia; the 2026 election article gives only their names
and lead candidates (Preecha Khaikaew; Melda Ketwichit). `check-political-parties.mjs` requires a
plausible `founded` year on every entry, and no source gives one for either party. Inventing a year
to satisfy the gate is exactly what the sourcing rule forbids, so they are omitted and the gap is
recorded here rather than hidden.

* **New finding — S5 (structural).** A mandatory `founded` makes a genuinely-new micro-party
  *unrepresentable*, even when its existence and seat count are beyond doubt from the chamber's own
  record. Candidate fix: allow `founded` to be omitted when a `foundedUnknownReason` documents the
  search, exactly as `noImageReason` does for logos. Deferred with **B8** until enough countries are
  done to size it; both are tracked here so neither is lost.

**Visual verification:** 20 cards, all 16 bundled logos asserted painted, the four "No free image"
cards correct, in-power badges correct.

### 🇻🇳 Vietnam — audited 2026-09-11

One party, one seat figure, and it was **right** — 482 of 500, the balance being 18 independents,
matching the National Assembly elected 15 March 2026 exactly. The failure was the person.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-031 | **S1** | `VN-CPV.leader` | **Nguyễn Phú Trọng** | **Tô Lâm** | Nguyễn Phú Trọng **died in July 2024**. The app was naming a dead man as Vietnam's current leader — the single most damaging kind of staleness in this dataset, and invisible to every structural check |
| PP-032 | **S3** | `inExecutive` | absent | `true` | The CPV is the sole governing party; its General Secretary heads the state |
| PP-033 | **S4** | `logoSourceUrl` | `en.wikipedia.org/…/File:Communist_Party_of_Vietnam.svg`, with a non-free `licenceNote` | the Commons file whose **SHA-1 matches the bundled bytes**: `File:Communist_Party_of_Vietnam_flag_logo.svg`; `licenceNote` dropped as it is Commons-hosted | Content-hash provenance, as established in Brazil |
| PP-034 | — | `ideology` | "Marxism-Leninism" (hyphen) | "Marxism–Leninism" (en dash, as the source writes it) | quoted verbatim per the sourcing rule |

**Method note.** The SHA-1 provenance check is now run for **every** country, not just where a logo
looks wrong. Two countries in, it has caught two mis-recorded source URLs out of 22 logos checked —
a hand-recorded URL is simply not reliable evidence of what the bundled bytes are.

### 🇮🇩 Indonesia — audited 2026-09-11

Closes dataset defects **B1** (seats summing above the chamber) and **B2** (two `seatsTotal` values
in one country) — and turned up the worst *image* defect of the sweep so far.

> **`pan.svg`, shipped as the logo of Indonesia's National Mandate Party (PAN), was the logo of
> "pans & COMPANY" — a restaurant chain.** The SHA-1 provenance check matched the bundled bytes to
> Commons `File:Logo_pans_&_company.png`; rendering it confirmed a yellow box reading *pans &
> COMPANY*. It had been live in production. This is precisely the name-collision failure the repo's
> flag rules exist to prevent ("Misiones", "adidas for Vietnam"), reproduced in the party data.

Verified against the [House of Representatives](https://en.wikipedia.org/wiki/People%27s_Representative_Council)
and its seat template (`Template:DPR RI`), which gives all eight parties and sums to exactly 580.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-035 | **S1** | `ID-PAN.logo` | **the "pans & COMPANY" restaurant logo** | `pan.png`, the 2024 PAN logo (Commons, public domain) — the correct file was already bundled and unreferenced | SHA-1 provenance + visual render |
| PP-036 | **S1** | `seats` | PDI-P 128, Golkar 97, Gerindra 112, PKB 58 — **summing to 609 of a stated 575** | 110 / 102 / 86 / 68, summing to **580 of 580** | `Template:DPR RI`, which the chamber infobox itself uses |
| PP-037 | **S1** | `seatsTotal` | **575 for four parties, 580 for the other four** | 580 throughout | The DPR has had 580 seats since the 2024 election; 575 was the 2019–2024 chamber |
| PP-038 | **S1** | `chamberName` | **"People's Consultative Assembly"** for four parties | "People's Representative Council (DPR)" throughout | The MPR is the *bicameral assembly*; the lower house is the DPR. Four parties named the wrong institution |
| PP-039 | **S1** | `leader` | Golkar **Airlangga Hartarto**; PKS **Ahmad Syaikhu** | **Bahlil Lahadalia**; **Sohibul Iman** | party infoboxes |
| PP-040 | **S2** | `logo` | NasDem's **superseded** logo (Commons `Partai_Nasdem_Old.svg`); Golkar and PKB on files with no traceable provenance and a non-free note | current Commons files: `Logo_Utama_Partai_NasDem.png`, `Logo_Golkar.svg`, `Logo_PKB_2024.png`, all public domain | infobox `logo` fields + Commons licence metadata |
| PP-041 | **S3** | `inPower` / `inExecutive` | NasDem in power, PKS out, `inExecutive` absent | the five **KIM** government parties (Golkar, Gerindra, PKB, PAN, Demokrat) are in power and in the executive | The chamber's own three-way split: Government (KIM), confidence-and-supply (KIM+: NasDem, PKS), check-and-balance (PDI-P) |

**Judgement call — NasDem and PKS.** The chamber classifies them as *confidence and supply*, which
is support without joining the government, so both are recorded out of power. No per-minister source
listing cabinet portfolios by party could be reached (neither the English nor the Indonesian cabinet
article carries a machine-readable party column), so if either holds a portfolio it is not reflected
here. **That limit is recorded rather than papered over** — revisit when a minister-by-party source
is available.

**Housekeeping:** five superseded or wrong logo files were deleted (`pan.svg`, `nasdem.svg`,
`nasdem.png`, `golkar.png`, `pkb.png`).

**Visual verification:** 8 cards, all 8 logos asserted painted and montage-checked side by side —
PAN now shows the party's blue sunburst, not a restaurant.

### 🇵🇭 Philippines — audited 2026-09-11

Verified against the [House of Representatives](https://en.wikipedia.org/wiki/House_of_Representatives_of_the_Philippines)
political groups for the 20th Congress (elected 12 May 2025): Majority 287, Minority 27, Independent
4, of 318 — 254 district seats plus 64 party-list seats.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-042 | **S2** | `seats` | Lakas 77, NUP 55 | **76**, **56** | Both parties sit across the majority and minority blocs; summing the chamber's own per-bloc figures gives 75+1 and 54+2 |
| PP-043 | **S3** | coverage | 13 parties | **16** — added One Cebu (1), LDP (1) and UNA (1) with fair-use logos sourced and bundled | Chamber group list |
| PP-044 | **S3** | `inExecutive` | absent | `true` on **PFP** only | The Philippines is presidential and Ferdinand Marcos Jr. leads PFP; no source lists cabinet portfolios by party, so the flag is confined to the President's own party |
| — | ✓ | party-list seats | Akbayan 3, Tingog 3, 4Ps 2, Ako Bicol 2 | unchanged — **all four verified correct** | The 2025 party-list election's elected-representatives table |

**Documented coverage gaps — two parties that cannot be added, and 54 party-list seats.**

* **Centrist Democratic Party (1 seat)** and **Partido Navoteño (1 seat)** sit in the majority bloc
  and are *not* in the dataset, because neither has a logo file anywhere: CDP's infobox `logo` field
  contains the literal string `200px` (a broken parameter) and Navoteño's article has no logo at
  all. The political-party rule requires every new entry to carry a bundled logo, and
  `noImageReason` is reserved for entries predating 2026-09-08, so **the gate makes these parties
  unrepresentable.** This is the same structural wall Thailand hit on `founded` — see **S5** below.
* **54 of the 64 party-list seats** belong to sectoral organisations the dataset does not model
  (ACT-CIS, CIBAC, SAGIP, Kabataan, TUCP, Senior Citizens, 1-Rider and roughly forty more, most with
  a single seat). Four are modelled and correct. This is a recorded, deliberate gap for a later
  pass, not an oversight — it is why Philippine coverage reads 261/318 rather than ~315/318.

* **S5 (structural), second instance.** Two different mandatory fields have now blocked real, seated
  parties from being recorded: `founded` in Thailand and `logo` here. The gate is protecting quality
  in general while producing *invisible* incompleteness in particular. Candidate fix, to be proposed
  once more countries are done: extend the `noImageReason` pattern to any mandatory field —
  a sourced, human-written reason for the gap, visible in the UI, beats an absent party.

**Visual verification:** 16 cards, 15 logos asserted painted (the sixteenth is a documented
no-image entry), the three new logos montage-checked before bundling.

### 🇸🇬 Singapore — audited 2026-09-11

Closes another instance of dataset defect **B1**: PAP 86 + WP 12 = 98 seats in a chamber the entry
said had **97**.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-045 | **S1** | `seatsTotal` | 97 | **108** | 97 is the number of *elected constituency* seats. Parliament's actual membership is 108: PAP 86, WP 12 (including Non-Constituency MPs), 9 Nominated MPs and 1 vacancy. Using the elected-seat figure as the denominator while counting NCMPs in the numerator is what made the sum impossible |
| PP-046 | **S3** | `inExecutive` | absent | `true` on PAP | Second Lawrence Wong Cabinet |

Both seat figures, both leaders (Lawrence Wong; Pritam Singh) and both logos' provenance were
checked and are correct.

### 🇰🇭 Cambodia — audited 2026-09-11

Seats were right (CPP 120, FUNCINPEC 5, of 125). Everything else about the CPP entry was not.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-047 | **S1** | `KH-CPP.logo` | **a magenta oval reading "CPP"** — Commons `File:Cpp 2.png`, which Commons itself files under **"Unidentified logos"** and "Self-published work" | the party's own emblem (the devata scattering flowers, wreathed in rice ears) as used by its article | SHA-1 provenance, then the Commons category, then a render. Second wrong-logo find of the sweep after Indonesia's restaurant chain |
| PP-048 | **S1** | `KH-CPP.leader` | **Hun Manet**, titled "Prime Minister" | **Hun Sen**, President | Hun Manet is Prime Minister and a party vice-president; the CPP's president is Hun Sen. The field is the *party* leader |
| PP-049 | **S2** | file type | `cpp.svg` and `funcinpec.svg` were **PNG bytes with an `.svg` extension** | renamed `.png` | `file(1)` on the bundled bytes. Browsers sniff content so they rendered, but the extension was false |
| PP-050 | **S3** | `inExecutive` | absent | `true` on CPP | Cabinet of Hun Manet |

**Method note — two wrong logos in ten countries.** Both were found by the SHA-1 provenance check
followed by actually *looking* at the image, and neither was detectable from the recorded metadata.
A Commons match is necessary but not sufficient: `Cpp 2.png` is a real Commons file, freely
licensed, and still the wrong picture. **Rendering every logo is now part of the per-country loop.**

### 🇱🇦 Laos — audited 2026-09-11

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-051 | **S2** | `seats`, `seatsTotal` | 158 / 164 — the assembly elected in 2021 | **169 / 175** | A new National Assembly was elected **22 February 2026**: LPRP 169 and 6 independents, all within the Lao Front for National Development |
| PP-052 | **S3** | `inExecutive` | absent | `true` | The LPRP is the sole governing party; Thongloun Sisoulith is both its General Secretary and President of Laos |
| PP-053 | **S2** | file type + `logoSourceUrl` | `lprp.svg` was **PNG bytes with an `.svg` extension**, cited to `File:Emblem_of_the_Lao_People's_Revolutionary_Party.svg` — a different file | renamed `lprp.png`, cited to `File:LPRP_logo_red.png`, the Commons file whose SHA-1 matches | Third country where the recorded logo URL did not describe the bundled bytes |

Leader (Thongloun Sisoulith) and founding year (22 March 1955) were checked and are correct; the
logo was rendered and is the party's red hammer-and-sickle.

**Pattern worth naming: the `.svg`-extension-on-PNG-bytes defect has now appeared in Cambodia (2
files) and Laos (1).** It is invisible in the browser because content sniffing rescues it, and
invisible to the gate because the check only verifies the sha256. Worth a mechanical sweep across
all bundled party logos in a later structural PR — added to the deferred list with **B8** and the
mandatory-field wall.

### 🇧🇳 Brunei — audited 2026-09-11 · **country removed**

The only country so far whose entry had to be **deleted rather than corrected**, because what it
asserted was not true of Brunei at all.

The dataset carried three parties — PDNB credited with **1 seat**, PNDB and PNS with 0 — in a
36-seat chamber. Brunei's [Legislative Council](https://en.wikipedia.org/wiki/Legislative_Council_of_Brunei)
has **34 members, every one of them ex-officio (14) or appointed and non-partisan (20)**. No party
holds a seat, and none can: Brunei is an absolute monarchy and, as the National Development Party's
own article states, **no legislative election has been held in Brunei since 1962.**

| ID | Sev | Finding |
|---|---|---|
| PP-054 | **S1** | A party was credited with a seat in a legislature that has **no elected members and no party representation whatsoever**. This is not a stale figure — it describes a parliamentary system Brunei does not have |
| PP-055 | **S1** | `seatsTotal` 36 against an actual membership of 34 |
| PP-056 | **S2** | Two of the three entries held 0 seats, already contradicting the file's own scope rule ("only parties currently holding at least one seat") |

**Decision: remove Brunei from `POLITICAL_PARTIES` and delete its three bundled logos.** The file's
scope rule admits only competitive multi-party systems; Brunei is an absolute monarchy with an
appointed legislature. Keeping the entry would assert representation that does not exist, which is
worse than the country being absent — the same reasoning that keeps **Myanmar** out.

**Verified in the running app:** Brunei's page renders normally and the Political parties tab is
simply **not offered** (tabs: National symbols, Sub-national divisions, Capital cities, Hierarchy),
with no console errors. A country with no party data degrades cleanly by design.

**This closes 3 of the 19 zero-seat entries in defect B3.** The remaining 16 are checked as their
countries come up.

### 🇹🇱 Timor-Leste — audited 2026-09-11 · **Southeast Asia complete**

Every seat figure was already correct (CNRT 31, FRETILIN 19, PD 6, KHUNTO 5, PLP 4 = 65), as were
the government/opposition flags. **Three of the five logos were the wrong image, including one that
was not an image at all.**

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-057 | **S1** | `TL-FRETILIN.logo` | **an Ogg Vorbis audio file** — a Voice of America clip of someone *pronouncing* the word "Fretilin", renamed `fretilin.svg` | the party's emblem (fist and star, *Frente Revolucionária do Timor-Leste Independente*) | `file(1)` reported `Ogg data, Vorbis audio, stereo, 44100 Hz`. It was live, rendering as a broken image |
| PP-058 | **S1** | `TL-CNRT.logo` | **"CNRT — CONTROL DEL TRANSPORTE"**, a Spanish transport-control company | the National Congress for Timorese Reconstruction's own emblem | Acronym collision, rendered and confirmed |
| PP-059 | **S1** | `TL-PD.logo` | **a yellow handheld games console** (a Playdate) | the Partido Democrático's blue roundel | "PD" collision, rendered and confirmed |
| PP-060 | **S2** | `TL-FRETILIN.leader` | Francisco Guterres (Lú-Olo), as President | **Mari Alkatiri, Secretary-General** | FRETILIN's infobox now records its presidency as `TBD`; the Secretary-General is the sourced office-holder, so the entry names the office that actually exists |
| PP-061 | **S2** | file types | `cnrt.svg` was PNG bytes; `plp.svg` replaced by the party's own file | all extensions now match their bytes | Same `.svg`-on-not-SVG defect as Cambodia and Laos |

**Five wrong logos in thirteen countries — and every one was an acronym or name collision.**
pans & COMPANY for PAN, an unidentified magenta mark for the CPP, a transport firm for CNRT, a
games console for PD, and an audio clip for FRETILIN. This is the **Misiones bug** the repo's flag
rules were written for, reproduced wholesale in the party data. It is also why the loop now ends
with rendering every logo: four of the five passed a Commons or Wikipedia lookup, and three of them
were freely licensed. **Provenance proves where bytes came from; only looking proves what they are.**

### 🇦🇷 Argentina — audited 2026-09-11

The strongest country yet on numbers: **all nineteen blocs reconciled exactly** against the Chamber
of Deputies after the 26 October 2025 legislative election — LLA 95, FP 93, United Provinces 18,
PRO 12, Innovación Federal 7, UCR 6, FIT-U 4, three 3-seat blocs, four 2-seat blocs and five
1-seat blocs, summing to 257 of 257. All seven bundled logos matched Commons or Wikipedia by SHA-1
and rendered correctly.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-062 | **S2** | `AR-UXP.name` | **Unión por la Patria** | **Fuerza Patria** / Homeland Force, with the old name preserved in `previousNames` (2023–2025) | The coalition was renamed in 2025. Argentina's main opposition bloc — 93 seats — was carrying a superseded name |
| PP-063 | **S3** | `inExecutive` | absent | `true` on LLA only | Javier Milei's party; the chamber separates Government (95) from Allies (24), so PRO, UCR, MID and the small provincial blocs stay out of power |

**Unresolved, flagged rather than guessed.** The chamber now lists a 3-seat bloc as **"País
Federal"** where the dataset has **"Coherencia"** (also 3 seats, led by Marcela Pagano, formed
August 2025 by four ex-libertarians). They may be the same bloc renamed, or two different ones.
Neither English nor Spanish Wikipedia search resolved it within this pass, so **the entry is left
unchanged and the discrepancy recorded here** — changing a name on a guess is what the sourcing
rule forbids. Recheck when a source lists the bloc's membership.

**Note on modelling:** Argentina's entries are legislative *blocs*, not registered parties. That was
an existing choice and it matches how the chamber itself reports composition; it is noted so a later
reviewer knows it is deliberate.

### 🇨🇱 Chile — audited 2026-09-11

The entry described **a parliament and a government that no longer exist.** It held seven parties
and 132 of 155 seats with Gabriel Boric's Frente Amplio governing; the **16 November 2025 general
election** produced a new chamber and a new, right-wing government.

Verified against the [Chamber of Deputies](https://en.wikipedia.org/wiki/Chamber_of_Deputies_of_Chile):
Government 67 (Republicans 31, UDI 18, the RN group 16, 2 independents), supported by 8 (PNL),
independents 15 (PDG), opposition 65 — 155 in total.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-064 | **S1** | whole country | 7 parties, 132 / 155, Frente Amplio in government | **14 parties, 151 / 155**, Republicans/UDI/RN/Evópoli/Demócratas in government | Every seat figure superseded by the 2025 election |
| PP-065 | **S1** | `CL-PRCH.logo` | **the Republican Party's logo**, filed as the **Radical Party's** | each party's own emblem; the Republican logo now sits on the new `CL-REP` entry where it belongs | SHA-1 matched `Republican_Party_of_Chile_logo.svg`. Opposite ends of Chilean politics |
| PP-066 | **S1** | `CL-UDI.logo` | **the FRENCH UDI's logo** — *"udi · union des démocrates et indépendants"* | Chile's own Unión Demócrata Independiente logo | SHA-1 matched Commons `UDI_logo.svg` (France). The correct Chilean file **was already bundled** as `udi.png` |
| PP-067 | **S2** | `seats` | UDI 26, RN 18, PDC 16, PPD 12, PS 8, FA 49, PR 3 | 18, 13, 8, 10, 11, 18, 1 | Chamber composition |
| PP-068 | **S3** | coverage | — | added Republicans 31, PDG 15, Communists 12, PNL 8, Liberals 3, Evópoli 2, Demócratas 1 | Seven parties absent entirely, including the **largest party in the chamber** |
| PP-069 | **S2** | junk files | three stray `*.svg.sha256` text files in `public/` | deleted | Not images; they were being shipped to users' browsers as part of the static site |

**Documented gap.** **FREVS** (Social Green Regionalist Federation, 2 seats) is **not added**: it has
no logo on English *or* Spanish Wikipedia, and the gate requires one on every new entry. This is the
**third** time a mandatory field has blocked a real seated party — `founded` in Thailand, `logo` in
the Philippines, `logo` here — and the reason Chile reads 151/155 rather than 153/155 (the other
2 seats are independents).

**Seven wrong logos in fifteen countries, every one a name collision.** Chile contributed two of the
starkest: a party's opponents' logo, and a French party's logo. Both were caught the same way —
SHA-1 provenance, then rendering the image and looking at it.

### 🇨🇴 Colombia — audited 2026-09-12

The dataset held **five parties covering 102 of a stated 188 seats**, with leaders attached to the
wrong parties. Colombia elected a new Chamber on **8 March 2026** and a new President took office in
August, so nothing in the entry survived.

**English Wikipedia could not be used, and that is itself a finding.** Its Chamber-of-Representatives
infobox lists blocs totalling 85 + 69 + 44 = 198, whose member parties sum to **202**, against a
stated **183 members** — internally inconsistent three ways over. The **Spanish** article
([`Cámara de Representantes de Colombia`](https://es.wikipedia.org/wiki/C%C3%A1mara_de_Representantes_de_Colombia))
reconciles exactly: Government 118 + Independents 11 + Opposition 44 + special seats 9 + 1 = **183**.
Every seat figure here comes from it. That is the second country (after Brazil) where the English
chamber article was arithmetically impossible and a better source had to be found — **checking that
the composition sums to the chamber size is now a standing step in the loop.**

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-064 | **S1** | coverage | 5 parties, 102 / **188** | **13 parties, 158 / 183** | The Chamber has 183 members. Added Pacto Histórico (43 — the largest party, absent), Partido de la U (13), Alianza Verde (7), ASI (2), Creemos (2), Nuevo Liberalismo (2), Salvación Nacional (1), MIRA (1), MAIS (1) |
| PP-065 | **S1** | `seats` | every one wrong | CD 30, PLC 24, PCC 20, CR 12 … | The old figures were from the 2022 chamber |
| PP-066 | **S1** | `leader` | Liberal led by **Ernesto Macías** (a Centro Democrático senator); Conservative led by **Carlos Fernando Galán** (Bogotá's mayor, of New Liberalism) | César Gaviria; Nadia Blel | Two leaders were not merely stale but attached to the *wrong party* |
| PP-067 | **S2** | `ideologyPosition` | Cambio Radical `centre`; Centro Democrático "Right-wing" | `centre-right`; "Right-wing to far-right" | party infoboxes |
| PP-068 | **S3** | `inPower` | absent on all | `true` on the **8 government-bloc parties** | The Spanish chamber article's own Gobierno grouping |
| PP-069 | **S4** | logo hygiene | three stray `.sha256` files and four unreferenced duplicate logos in `public/party-logos/co/` | removed | `conservador.png` and `pcc.png` were byte-identical |

**`inExecutive` is `false` for every Colombian party, and that is a sourced statement, not a gap.**
President **Abelardo de la Espriella** (in office since 2026) leads **Defensores de la Patria**,
founded 2024 — a party that holds **no seats in the Chamber at all**. So no seated party is the
President's. Whether any coalition party holds ministries could not be sourced (no cabinet article
with a party column was reachable), and that limit is recorded here rather than guessed at.

**Documented gaps — 25 of the 183 seats are deliberately not modelled.**

* **18 are not party seats**: the 16 **CITREP** transitional peace-constituency seats (11 counted
  with the government, 5 special), the **Consejo Comunitario El Naranjo** (a community council), and
  one **Raizal** representative. Modelling these as parties would misdescribe them.
* **7 belong to four parties that could not be completed**: **Partido Demócrata Colombiano** (3) —
  no founding year in any reachable source; **Colombia Renaciente** (2), **La Fuerza** (1) and
  **Movimiento Unidad en Minga por Colombia** (1) — no logo file on Commons or either Wikipedia.
  Same mandatory-field wall as Thailand and the Philippines; recorded, not hidden.

All 13 bundled logos were SHA-1 matched to Commons or English Wikipedia and montage-verified.

### 🇵🇪 Peru — audited 2026-09-12

Peru's parties were the right six, but the entry described **a legislature that no longer exists**.

At the 12–13 April 2026 general election Peru returned to a **bicameral** Congress after thirty
years: a 60-member Senate and a **130-member Chamber of Deputies**. The dataset still named the old
unicameral "Congress of the Republic" and carried a seat split that matches neither house.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-070 | **S1** | `chamberName` | "Congress of the Republic" | **"Chamber of Deputies"** | The Congress has been bicameral since the 2026 election; the Congress article's own header reads "Unicameral (1995–2026)" |
| PP-071 | **S1** | `seats` | FP 24, JP 9, RP 15, PBG 22, OBRAS 16, AN 14 — summing to 100 of 130 | **FP 41, JP 32, PBG 18, RP 15, OBRAS 14, AN 10 — exactly 130 of 130** | The Chamber's own composition |
| PP-072 | **S1** | `leader` | Juntos por el Perú led by "Raúl Alfredo de la Pue…" | **Roberto Sánchez** | party infobox |
| PP-073 | **S3** | `leader` | PBG, OBRAS and AN had none | Jorge Nieto; Ricardo Belmont; Luis López-Chau Pastor | party infoboxes |
| PP-074 | **S3** | `inPower` / `inExecutive` | false on every party | `true` on **Popular Force** | **Keiko Fujimori**, Popular Force's leader, is President of Peru. Popular Renewal is recorded as *supported by* the government, so it stays out of power — the same reading applied in Indonesia |

All six logos were SHA-1 matched to Commons and montage-verified. Seats now reconcile exactly, which
closes Peru's contribution to defect **B4** (chamber coverage below 60% — it was 77%).

### 🇻🇪 Venezuela — audited 2026-09-12

Venezuela was the **single most wrong country** the sweep has reached. The dataset held **one party**
— PSUV — credited with **277 of 277** seats: a chamber size that was retired at the 2025 election, a
seat count that asserted a one-party legislature, and a logo that had been written off as
unsourceable when the party's own 2024 mark sits on Commons in the public domain.

The National Assembly's **VI Legislature** was installed on 5 January 2026 with **285** seats. Nine
parties of the governing **Gran Polo Patriótico Simón Bolívar** hold 253 of them (PSUV itself holds
**219**, not all of them); three are indigenous seats; and **eleven** further parties sit in three
opposition parliamentary groups.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-075 | **S1** | `seats` / `seatsTotal` | PSUV **277 of 277** — a legislature with no other party in it | **PSUV 219 of 285**, 20 parties totalling **277 of 285** | The Assembly's own VI-Legislature composition. 277 was the 2020–2025 chamber size; the 2025 election returned 285 |
| PP-076 | **S1** | coverage | 1 party | **20 parties** | Nineteen seated parties were absent, including the whole of the governing alliance beyond PSUV and every opposition party |
| PP-077 | **S1** | `leader` | Diosdado Cabello, **"Party Chairman"** | **Delcy Rodríguez**, "Party leader" | Cabello is PSUV's **secretary**, never its chairman. Nicolás Maduro remains the formally elected party president but has been in United States custody since January 2026; the party's own infobox now names Rodríguez as its leader |
| PP-078 | **S1** | `inExecutive` context | "Diosdado Cabello … in executive power" | PSUV holds the presidency through **Delcy Rodríguez, interim president since 2026** | Maduro was captured during the United States intervention in Venezuela; Rodríguez, his vice-president since 2018, is the first woman to perform the duties of the presidency |
| PP-079 | **S1** | `founded` | **1997** | **2007** | 1997 is the founding year of the *Fifth Republic Movement*, one of PSUV's merger predecessors. PSUV itself dates from 2007 (es.wikipedia gives 14 March 2008 for its registration — the discrepancy is recorded here, not resolved by guessing) |
| PP-080 | **S2** | `noImageReason` | "no freely-licensed vectorized logo available" | **`party-logos/ve/psuv.svg`** | `PSUV 2024 logo.svg` is on Commons in the **public domain**. The reason was wrong, and PSUV has now been removed from `GRANDFATHERED_PARTIES_WITH_NO_IMAGE` |
| PP-081 | **S3** | `chamberName` | "National Assembly (disputed)" | **"National Assembly"** | `chamberName` names the chamber; the recognition dispute belongs in the sources, where it now is (the English article's "partial recognition" note is cited) |
| PP-082 | **S3** | coalitions | none | **`VE-GPPSB`** (9 seated members) and **`VE-AD-ALLIANCE`** (7) | The governing Chavista alliance and the opposition Democratic Alliance |

**A judgement call, recorded.** Acción Democrática, Primero Justicia and Copei hold their seats
through the **ad hoc boards imposed by the Supreme Tribunal of Justice**, not through the leaderships
those parties themselves recognise. The dataset shows each party's own leadership (AD: Isabel Carmona
de Serra, the *dirección en resistencia*) and states the ad-hoc split in that party's sources and in
the `VE-AD-ALLIANCE` coalition note. Suppressing either fact would take a side.

**Documented gaps — 8 of the 285 seats are deliberately not modelled.**

* **3 are indigenous seats**, elected nationally by indigenous communities and not held by a party.
* **5 belong to Vamos Vamos Cojedes**, a regional party registered on 11 April 2025. No logo file
  exists on Commons, on either Wikipedia, or anywhere freely licensable (the party's presence is
  social-media only), and the gate forbids a new no-image entry. Recorded, not hidden — the same
  mandatory-field wall as Thailand, the Philippines and Colombia.

All 20 bundled logos were resolved on Commons, downloaded, checked that their bytes match their
extension, and **montage-verified**. That pass mattered: UNICA's Commons file is named
`GqRp6FJXgAA6TRL.jpg` — a raw social-media filename of exactly the shape that produced seven wrong
logos earlier in this sweep — and rendering it confirmed it really is the Unión y Cambio mark.

---

### 🇪🇨 Ecuador — audited 2026-09-12

Ecuador's entry described the **2021–2023 Assembly**: 137 seats, when the chamber has had **151**
since the 2023 snap election. Every seat figure, every founding year, and one entire party were
wrong.

The fifth legislative period was elected on 9 February 2025: **Government 78** (ADN 66, PSP 1, two
provincial movements, 9 independents), **Opposition 61** (RC 59, RETO 1, one provincial), **unaligned
12** (Pachakutik 3, PSC 3, 6 independents) — 151 exactly.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-083 | **S1** | `seatsTotal` | **137** | **151** | 137 was the 2021–2023 Assembly. The chamber has 151 members |
| PP-084 | **S1** | existence | **`EC-UDCPP` "Unión Demócrata Cristiana", 17 seats** | **removed** | The article redirects to **Democracia Popular**, founded 1977 — a party that holds **no seats at all** in this Assembly. The entry also gave it the wrong founding year (1978) and the Social Christian Party's English name |
| PP-085 | **S1** | `seats` | ADN 35, RC 27, PK 15 | **ADN 66, RC 59, PK 3** | Pachakutik was over-credited five-fold; ADN and RC both roughly doubled |
| PP-086 | **S1** | `founded` | ADN **2012**, RC **2006**, PK **1996** | **2021, 2010, 1995** | Each party's own infobox. ADN did not exist in 2012 — it was founded 20 November 2021 and legalised in May 2024 |
| PP-087 | **S2** | coverage | 4 parties (one fictitious) | **6 parties, 133 of 151** | Added **PSC** (3), **PSP** (1) and **RETO** (1); PSC is the party the removed UDCPP entry had been half-describing |
| PP-088 | **S2** | `leader` | Pachakutik and UDCPP had none; RC led by Andrés Arauz | **Marlon Vargas**; RC led by **Gabriela Rivadeneira** | party infoboxes |
| PP-089 | **S2** | `logo` | RC carried an older mark | **`Logo-rc5-actual-a-color.png`** (the current RC5 logo) | Commons |
| PP-090 | **S3** | `ideology` | ADN "Conservatism, Social democracy"; RC "Left-wing, Socialism, Progressivism" | re-copied verbatim from each infobox | "Left-wing" is a *position*, not an ideology; ADN's own article gives right-wing populism, personalism, neoliberalism |
| PP-091 | **S3** | `inPower` | ADN only | ADN **and PSP** | The Assembly's own *Oficialismo* grouping counts PSP with the government |

**Documented gap — 18 of the 151 seats are deliberately not modelled**: **15 independents** and
**3 provincial-movement** seats, none of which is a national party.

All six logos were downloaded from Commons, byte-checked against their extension, and
montage-verified (each carries its CNE ballot list number — ADN 7, Pachakutik 18, PSC 6, PSP 3,
RC 5, RETO 33 — which is a useful confirmation that each is the electoral mark, not a corporate one).
All four of Ecuador's entries have left `GRANDFATHERED_PARTIES_WITH_NO_IMAGE`.

---

### 🇧🇴 Bolivia — audited 2026-09-12

Bolivia's three entries were **garbled rather than merely stale**: two of them named a party that
does not exist under that name, and attached to it the leader of a *different* party.

The Chamber of Deputies elected on 17 August 2025 seats seven groups across 130 members: **PDC 49**
(government), **Alianza Libre 39**, **Unidad 26**, **Alianza Popular 8**, **APB Súmate 5** (ally),
**MAS-IPSP 2**, **Bia Yuqui 1**. Rodrigo Paz of the PDC has been president since 8 November 2025.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-092 | **S1** | existence | **"Arcistas por Bolivia" (16 seats), led by Luis Fernando Camacho**; **"Unidad Movil" (8), led by Oscar Ortiz** | removed; replaced by the groups that actually sit | Neither name appears in the Chamber. Camacho leads **Creemos**, not an "Arcistas" party; "Unidad Movil" is not a Bolivian party at all — the bloc is **Bloque de Unidad** |
| PP-093 | **S1** | coverage | 3 parties, 26 of 130 | **6 parties, 129 of 130** | Five of the seven seated groups were absent, including **PDC**, the party of the President, with 49 seats |
| PP-094 | **S1** | `inPower` / `inExecutive` | **false on every party** — Bolivia had no governing party at all | **PDC** in power and in the executive; **APB Súmate** in power as its ally | Rodrigo Paz (PDC) took office 8 November 2025 |
| PP-095 | **S1** | `chamberName` | "Plurinational Legislative Assembly" | **"Chamber of Deputies"** | The Assembly is the whole bicameral body (130 + 36); 130 is the lower house alone |
| PP-096 | **S2** | `seats` | MAS 2 | 2 — **the one figure that was right** | MAS-IPSP collapsed from governing party to two seats at the 2025 election |
| PP-097 | **S3** | `founded` | "Arcistas" 2017, "Unidad Movil" 2018 | n/a — entries removed | Both were inventions of the removed entries |

**Documented gap — 1 of the 130 seats is deliberately not modelled.** **Bia Yuqui** (Consejo Indígena
Yuqui Bia Recuate) holds one special indigenous-constituency seat, and no reachable source gives it a
founding year, which the schema requires. Recorded, not hidden — the same mandatory-field wall as
Thailand, the Philippines, Chile, Colombia and Venezuela.

All six logos were downloaded from Commons (all public domain), byte-checked against their extension,
and montage-verified.

---

### 🇵🇾 Paraguay — audited 2026-09-12

Paraguay's entry had the **wrong chamber size**, and every seat figure was scaled to it. The Chamber
of Deputies has **80** members, not 128 — 128 is not the size of either Paraguayan house (the Senate
has 45), so the figure appears to have been invented rather than taken from a superseded chamber.

The Chamber elected on 30 April 2023 sits **ANR 48** (government), **PLRA 22**, **Yo Creo 3**, 3
independents, and one seat each for **PCN**, **PEN**, **PPQ** and **PPS**.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-098 | **S1** | `seatsTotal` | **128** | **80** | The Chamber has 80 deputies; the Senate has 45. 128 matches neither, nor their sum |
| PP-099 | **S1** | `seats` | ANR 51, PLRA 38 | **ANR 48, PLRA 22** | The Chamber's own composition, corroborated by both parties' English infoboxes |
| PP-100 | **S1** | existence | **"Hagamos" (26 seats), founded 2018** | **removed** | No party of that name sits in the Chamber. The 26 seats were spread across five parties that were absent |
| PP-101 | **S1** | `founded` | PLRA **1873** | **1887** | The PLRA dates from 10 July 1887; the ANR from 11 September 1887, eight weeks later — the dataset had the ANR's year right and the PLRA's wrong by fourteen years |
| PP-102 | **S2** | coverage | 3 parties (one fictitious), 115 of a wrong 128 | **7 parties, 77 of 80** | Added Yo Creo (3), PCN, PEN, PPQ and PPS (1 each) |
| PP-103 | **S2** | `noImageReason` | all three entries claimed no freely-licensed logo exists | **all seven now carry one** | Every one is on Commons; the ANR's and PLRA's are SVGs in the public domain |
| PP-104 | **S3** | `leader` | PLRA and "Hagamos" had none | **Alcides Riveros**, plus a leader for each new party | party infoboxes |

**Documented gap — 3 of the 80 seats are independents**, not a party.

All seven logos were downloaded from Commons, byte-checked against their extension, and
montage-verified. Paraguay's three entries have left `GRANDFATHERED_PARTIES_WITH_NO_IMAGE`.

---

### 🇺🇾 Uruguay — audited 2026-09-12

Uruguay had **one party**, and the most interesting defect in the sweep so far: a **fabricated
logo explainer**.

`UY-FA` carried a `logoMeaning` asserting that the Frente Amplio's emblem "features a red and white
color scheme", that "the red represents the socialist and social democratic values of the alliance,
while white symbolizes peace and democratic governance" — cited to the party's English Wikipedia
article, which says nothing of the kind. **The image is not red and white.** It is the Frente Amplio
flag: red, blue and white bands with a yellow FA monogram. So the text was not merely unsourced
(which the flag-meaning hard rule already forbids) — it described a picture that is not there, with
a citation that does not support it. Removed rather than rewritten: no source documents the emblem's
symbolism.

The Chamber of Representatives elected on 27 October 2024 seats **FA 48** (government) against an
opposition of 51: the **Coalición Republicana** 47 (Partido Nacional 29, Partido Colorado 17,
Partido Independiente 1), **Identidad Soberana** 2 and **Cabildo Abierto** 2.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-105 | **S1** | `logoMeaning` | fabricated symbolism, wrong about the image itself, cited to an article that does not contain it | **removed** | The flag-meaning hard rule: never fabricate, always cite. The emblem is red/blue/white with a yellow FA monogram |
| PP-106 | **S1** | `seatsTotal` | **130** | **99** | 130 is not a Uruguayan number at all — the Chamber has 99 representatives and the Senate 30 |
| PP-107 | **S1** | `chamberName` | "Chamber of Deputies" | **"Chamber of Representatives"** | Uruguay's lower house is the Cámara de Representantes |
| PP-108 | **S1** | `leader` | **Yamandú Orsi** | **Fernando Pereira** | Orsi is *President of Uruguay*; the Frente Amplio's own president is Pereira. The party's head of state was being shown as its party leader |
| PP-109 | **S1** | coverage | 1 party, 48 of a wrong 130 | **6 parties, 99 of 99 — exact** | Five of the six seated parties were absent, including the 29-seat Partido Nacional |
| PP-110 | **S2** | `timeInPower` | "2025-present" | a sentence naming the date and the event | The field is prose elsewhere in the dataset; a bare year range reads as a data artefact |
| PP-111 | **S3** | logo path | `party-logos/**UY**/…` | `party-logos/**uy**/…` | The only upper-case logo directory in the repository |
| PP-112 | **S3** | coalitions | none | **`UY-CR`** (Coalición Republicana, 3 members, 47 seats) | The Chamber's own grouping |

**Two non-free logos, declared.** Identidad Soberana's and Cabildo Abierto's emblems have no
freely-licensed file on Commons; both are bundled from the SVGs English Wikipedia hosts under a
fair-use rationale, each carrying a `licenceNote` stating the copyright position — the same
owner-directed position taken for the non-free football crests and passport covers. Note that
Spanish Wikipedia's Identidad Soberana infobox uses **a cropped photograph of the party's candidate**
in the logo slot; using it would have put a man's face on the card as a party emblem, which is
exactly the class of wrong-image bug the montage pass exists to catch.

All six logos were byte-checked against their extension and montage-verified. Uruguay's seats now
reconcile **exactly** — 99 of 99.

---

### 🇬🇾 Guyana — audited 2026-09-12

Guyana's three parties summed to **72 seats in a 65-seat chamber** — an arithmetically impossible
total sitting in production, and the third country in this sweep whose numbers could have been
falsified without leaving the dataset (after Singapore's 98-of-108 and Brazil's 515-of-513).

The 13th Parliament was elected on 1 September 2025: **PPP/C 36** (government), **WIN 16**,
**PNCR–APNU 12**, **Forward Guyana Movement 1**.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-113 | **S1** | `seats` | PPP/C 43 + APNU 25 + AFC 4 = **72 of 65** | **PPP/C 36, WIN 16, PNCR 12 = 64 of 65** | The Assembly's own composition. The old figures were the 2020 Parliament's, and even then did not sum |
| PP-114 | **S1** | existence | **AFC** (Alliance For Change), 4 seats | **removed** | The AFC contested 2025 separately from APNU and won **no seats** |
| PP-115 | **S1** | existence | **APNU** as a party, 25 seats | replaced by **PNCR** (12) | APNU is a coalition, not a party; the 12 seats are the PNCR's, which the Assembly lists as "PNCR–APNU" |
| PP-116 | **S1** | coverage | **WIN** absent | **16 seats — the official opposition** | WIN was founded on 23 June 2025 and became the second-largest party in the chamber ten weeks later. Its leader, Azruddin Mohamed, is Leader of the Opposition |
| PP-117 | **S2** | `noImageReason` | all three claimed no freely-licensed logo exists | **all three now carry one** | Two are non-free (declared); the PNCR's is a CC BY-SA file on Commons |
| PP-118 | **S3** | `previousNames` | none | PPP (1950–1991); PNC (1957–1997) and PNC/R (1997–2001) | each party's own abbreviation history |

**Two non-free logos, declared.** The PPP/C's and WIN's emblems exist only as fair-use files on
English Wikipedia; both carry a `licenceNote` stating the copyright position, as for the non-free
football crests and passport covers.

**One judgement call, recorded.** The PNCR has no logo at all — its own Wikipedia infobox carries a
`flag` and an empty `logo` field — so the bundled image is the **party's flag** (red/black/green with
a palm tree in a white disc), which is the emblem the party itself uses. That is the party's own
symbol, not a national or coalition flag, so it is not the parent-flag-collision case; it is recorded
here so a later reviewer can see it was a decision rather than an accident.

**Documented gap — 1 of the 65 seats.** The **Forward Guyana Movement** has no article on any
Wikipedia, no logo file, and no sourceable founding year. Recorded, not hidden.

All three logos were byte-checked against their extension and montage-verified. Guyana's three
entries have left `GRANDFATHERED_PARTIES_WITH_NO_IMAGE`.

---

### 🇸🇷 Suriname — audited 2026-09-12

Suriname had **two entries, both wrong about who governs**. `SR-NF` — "Nieuw Front voor Democratie",
marked as **in power** with 20 seats — is a coalition that contested the elections of 1987 to 2005
and has not existed as a parliamentary force for two decades. Meanwhile the VHP, which really did
govern from 2020 to 2025, was marked **out** of power with the wrong seat count.

The 8th National Assembly was elected on 25 May 2025: **NDP 18**, **VHP 17**, **ABOP 6**, **NPS 6**,
**PL 2**, **BEP 1**, **A20 1**. Jennifer Geerlings-Simons (NDP) was inaugurated president on
16 July 2025, so the VHP moved to opposition.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-119 | **S1** | existence | **`SR-NF` "Nieuw Front voor Democratie", 20 seats, in power** | **removed** | A 1987 electoral coalition, not a party, and not a force in the Assembly since 2005 |
| PP-120 | **S1** | `inPower` | NF in power; VHP out | **NDP, ABOP, NPS, PL and BEP in power; VHP in opposition** | The Assembly's own Government/Opposition grouping |
| PP-121 | **S1** | coverage | 2 parties, 34 of 51 | **6 parties, 50 of 51** | Five of the seven seated parties were absent, including the governing **NDP** |
| PP-122 | **S2** | `seats` | VHP 14 | **17** | The VHP is the whole of the opposition |
| PP-123 | **S2** | `founded` | VHP **1961** | **1949** | The VHP dates from January 1949 |
| PP-124 | **S2** | `noImageReason` | both entries claimed no freely-licensed logo exists | **all six now carry one** | Two are on Commons in the public domain; three are non-free (declared) |
| PP-125 | **S3** | `leader` | neither entry had one | **four of the six do** | party infoboxes. The VHP's own infobox gives its chairman as "TBD", so it correctly has none |

**Three non-free logos, declared.** The VHP's, NPS's and BEP's emblems exist only as fair-use files on
English Wikipedia; each carries a `licenceNote` stating the copyright position.

**Documented gap — 1 of the 51 seats.** **Alternatief 2020** has no logo file on Commons or either
Wikipedia; its article's infobox `logo` field is empty. Recorded, not hidden.

All six logos were byte-checked against their extension and montage-verified. Suriname's two entries
have left `GRANDFATHERED_PARTIES_WITH_NO_IMAGE` — **which empties that list of every South American
entry.**

---

## Phase 3 complete — South America, all 11 countries

Every South American country has now been audited, fixed, merged and confirmed live. What the
continent looked like before this sweep:

* **Two countries carried arithmetically impossible seat totals** (Guyana 72 of 65; and Colombia's
  English-Wikipedia source was inconsistent three ways over).
* **Five countries contained entries for parties that do not exist** — Ecuador's "Unión Demócrata
  Cristiana" with 17 seats, Bolivia's "Arcistas por Bolivia" and "Unidad Movil", Paraguay's
  "Hagamos", Suriname's "Nieuw Front", Guyana's "APNU" as a party.
* **Three countries showed the wrong government or none at all** — Bolivia had no governing party
  while the PDC held the presidency; Suriname marked a defunct 1987 coalition as in power; Venezuela
  credited one party with every seat in the legislature.
* **Two countries had a chamber size that matches no real chamber** — Paraguay's 128, Uruguay's 130.
* **One carried a fabricated logo explainer** — Uruguay's, which described colours the image does
  not have.
* **Seven wrong logos were found and replaced across the continent**, every one a name or acronym
  collision, including the French UDI's logo on Chile's UDI and the Republican Party's on the
  Radicals.

Coverage went from 61 parties to 128; six of the eleven countries now reconcile exactly against
their chamber.

---

## Phase 4 — United Kingdom, United States, Canada

### 🇬🇧 United Kingdom — audited 2026-09-12

The UK had **one party**: Labour, with 412 seats, led by **Keir Starmer**, who has not been prime
minister since **20 July 2026**. Fourteen other parties sit in the Commons and none of them was in
the dataset — including the Official Opposition.

The 59th Parliament's current standing: **Labour 403** (government), **Conservative 118** (Official
Opposition), **Liberal Democrats 71**, **Reform UK 8**, **SNP 8**, **DUP 5**, **Green 5**,
**Independent Alliance 4**, **Plaid Cymru 4**, **SDLP 2**, **Your Party 2**, **Alliance 1**,
**Restore Britain 1**, **TUV 1**, **UUP 1**, 7 independents, the Speaker, **Sinn Féin 7**
(abstentionist) and 1 vacancy.

| ID | Sev | Field | Was | Now | Evidence |
|---|---|---|---|---|---|
| PP-126 | **S1** | `leader` | **Keir Starmer** | **Andy Burnham** | Burnham has led Labour and been prime minister since 20 July 2026 |
| PP-127 | **S1** | coverage | **1 party** | **15 parties, 637 of 650** | The Conservative Party — the Official Opposition, with 118 seats — was not in the dataset at all, nor were the Liberal Democrats' 71 |
| PP-128 | **S2** | `seats` | Labour **412** | **403** | 412 was the 2024 election night figure; by-elections, defections and suspensions have moved it |
| PP-129 | **S3** | `timeInPower` | absent detail | a sentence naming both the election and the change of prime minister | Labour has governed continuously since 4 July 2024 under two leaders |

**Three parties in this chamber did not exist when the dataset's Labour entry was written**, which is
a good measure of how far behind it had fallen: **Your Party** (founded 24 July 2025, 2 MPs),
**Restore Britain** (a pressure group from 30 June 2025, a registered party from 13 February 2026,
1 MP), and the Liberal Democrats' and SDLP's own articles have been refounded under 2025 titles.

**Sinn Féin is included, with its abstention stated.** Its seven MPs are elected but do not take
their seats; leaving the party out would misrepresent seven Northern Irish constituencies as
unrepresented, and including it silently would misrepresent the Commons arithmetic. The party's
source line says so explicitly.

**Documented gap — 13 of the 650 seats**: 7 independents, the 4-MP **Independent Alliance** (a
parliamentary grouping of independents rather than a registered party), the **Speaker** (who sits
apart from party), and **1 vacancy**.

**Eleven non-free logos, declared.** Only four UK party logos (Reform UK, SDLP, Your Party, Alliance)
are on Commons. The rest are English Wikipedia local files: eight under a fair-use rationale and
three (Conservative, SNP, UUP) held as public domain because the marks fall below the UK threshold of
originality. Each carries a `licenceNote` saying which of the two it is — the notes are not
interchangeable, and writing "fair use" over a public-domain file would be as wrong as the reverse.

All fifteen logos were montage-verified.

---

## Queue — all 195 countries in the owner's priority order

Tick a box only when that country's fix is **merged and live**.

### Phase 1 — Australia, Malaysia, Brazil (3)

- [x] `AU` Australia — merged
- [x] `MY` Malaysia — merged
- [x] `BR` Brazil — merged

### Phase 2 — rest of Southeast Asia (10)

- [x] `MM` Myanmar — audited, deliberately out of scope
- [x] `TH` Thailand — merged
- [x] `VN` Vietnam — merged
- [x] `ID` Indonesia — merged
- [x] `PH` Philippines — merged
- [x] `SG` Singapore — merged
- [x] `KH` Cambodia — merged
- [x] `LA` Laos — merged
- [x] `BN` Brunei — audited, removed as out of scope
- [x] `TL` Timor-Leste — merged

### Phase 3 — rest of South America (11)

- [x] `AR` Argentina — merged
- [x] `CL` Chile — merged
- [x] `CO` Colombia — merged
- [x] `PE` Peru — merged
- [x] `VE` Venezuela — merged
- [x] `EC` Ecuador — merged
- [x] `BO` Bolivia — merged
- [x] `PY` Paraguay — merged
- [x] `UY` Uruguay — merged
- [x] `GY` Guyana — merged
- [x] `SR` Suriname — merged

### Phase 4 — United Kingdom, United States, Canada (3)

- [x] `GB` United Kingdom — merged
- [ ] `US` United States
- [ ] `CA` Canada

### Phase 5 — Europe (45)

- [ ] `IE` Ireland
- [ ] `FR` France
- [ ] `DE` Germany
- [ ] `ES` Spain
- [ ] `PT` Portugal
- [ ] `IT` Italy
- [ ] `NL` Netherlands
- [ ] `BE` Belgium
- [ ] `LU` Luxembourg
- [ ] `CH` Switzerland
- [ ] `AT` Austria
- [ ] `PL` Poland
- [ ] `CZ` Czechia
- [ ] `SK` Slovakia
- [ ] `HU` Hungary
- [ ] `RO` Romania
- [ ] `BG` Bulgaria
- [ ] `GR` Greece
- [ ] `HR` Croatia
- [ ] `SI` Slovenia
- [ ] `RS` Serbia
- [ ] `BA` Bosnia and Herzegovina
- [ ] `ME` Montenegro
- [ ] `MK` North Macedonia
- [ ] `AL` Albania
- [ ] `TR` Türkiye
- [ ] `UA` Ukraine
- [ ] `BY` Belarus
- [ ] `MD` Moldova
- [ ] `RU` Russia
- [ ] `LT` Lithuania
- [ ] `LV` Latvia
- [ ] `EE` Estonia
- [ ] `FI` Finland
- [ ] `SE` Sweden
- [ ] `NO` Norway
- [ ] `DK` Denmark
- [ ] `IS` Iceland
- [ ] `CY` Cyprus
- [ ] `MT` Malta
- [ ] `LI` Liechtenstein
- [ ] `MC` Monaco
- [ ] `SM` San Marino
- [ ] `AD` Andorra
- [ ] `VA` Vatican City

### Phase 6 — rest of the world (123)

- [ ] `AF` Afghanistan
- [ ] `DZ` Algeria
- [ ] `AO` Angola
- [ ] `AG` Antigua and Barbuda
- [ ] `AM` Armenia
- [ ] `AZ` Azerbaijan
- [ ] `BS` Bahamas
- [ ] `BH` Bahrain
- [ ] `BD` Bangladesh
- [ ] `BB` Barbados
- [ ] `BZ` Belize
- [ ] `BJ` Benin
- [ ] `BT` Bhutan
- [ ] `BW` Botswana
- [ ] `BF` Burkina Faso
- [ ] `BI` Burundi
- [ ] `CV` Cabo Verde
- [ ] `CM` Cameroon
- [ ] `CF` Central African Republic
- [ ] `TD` Chad
- [ ] `CN` China
- [ ] `KM` Comoros
- [ ] `CG` Congo
- [ ] `CD` Congo (DRC)
- [ ] `CR` Costa Rica
- [ ] `CI` Côte d’Ivoire
- [ ] `CU` Cuba
- [ ] `DJ` Djibouti
- [ ] `DM` Dominica
- [ ] `DO` Dominican Republic
- [ ] `EG` Egypt
- [ ] `SV` El Salvador
- [ ] `GQ` Equatorial Guinea
- [ ] `ER` Eritrea
- [ ] `SZ` Eswatini
- [ ] `ET` Ethiopia
- [ ] `FJ` Fiji
- [ ] `GA` Gabon
- [ ] `GM` Gambia
- [ ] `GE` Georgia
- [ ] `GH` Ghana
- [ ] `GD` Grenada
- [ ] `GT` Guatemala
- [ ] `GN` Guinea
- [ ] `GW` Guinea-Bissau
- [ ] `HT` Haiti
- [ ] `HN` Honduras
- [ ] `IN` India
- [ ] `IR` Iran
- [ ] `IQ` Iraq
- [ ] `IL` Israel
- [ ] `JM` Jamaica
- [ ] `JP` Japan
- [ ] `JO` Jordan
- [ ] `KZ` Kazakhstan
- [ ] `KE` Kenya
- [ ] `KI` Kiribati
- [ ] `KP` North Korea
- [ ] `KR` South Korea
- [ ] `KW` Kuwait
- [ ] `KG` Kyrgyzstan
- [ ] `LB` Lebanon
- [ ] `LS` Lesotho
- [ ] `LR` Liberia
- [ ] `LY` Libya
- [ ] `MG` Madagascar
- [ ] `MW` Malawi
- [ ] `MV` Maldives
- [ ] `ML` Mali
- [ ] `MH` Marshall Islands
- [ ] `MR` Mauritania
- [ ] `MU` Mauritius
- [ ] `MX` Mexico
- [ ] `FM` Micronesia
- [ ] `MN` Mongolia
- [ ] `MA` Morocco
- [ ] `MZ` Mozambique
- [ ] `NA` Namibia
- [ ] `NR` Naoero
- [ ] `NP` Nepal
- [ ] `NZ` New Zealand
- [ ] `NI` Nicaragua
- [ ] `NE` Niger
- [ ] `NG` Nigeria
- [ ] `OM` Oman
- [ ] `PK` Pakistan
- [ ] `PW` Palau
- [ ] `PA` Panama
- [ ] `PG` Papua New Guinea
- [ ] `QA` Qatar
- [ ] `RW` Rwanda
- [ ] `KN` Saint Kitts and Nevis
- [ ] `LC` Saint Lucia
- [ ] `VC` Saint Vincent and the Grenadines
- [ ] `WS` Samoa
- [ ] `ST` São Tomé and Príncipe
- [ ] `SA` Saudi Arabia
- [ ] `SN` Senegal
- [ ] `SC` Seychelles
- [ ] `SL` Sierra Leone
- [ ] `SB` Solomon Islands
- [ ] `SO` Somalia
- [ ] `ZA` South Africa
- [ ] `SS` South Sudan
- [ ] `LK` Sri Lanka
- [ ] `SD` Sudan
- [ ] `SY` Syria
- [ ] `TJ` Tajikistan
- [ ] `TZ` Tanzania
- [ ] `TG` Togo
- [ ] `TO` Tonga
- [ ] `TT` Trinidad and Tobago
- [ ] `TN` Tunisia
- [ ] `TM` Turkmenistan
- [ ] `TV` Tuvalu
- [ ] `UG` Uganda
- [ ] `AE` United Arab Emirates
- [ ] `UZ` Uzbekistan
- [ ] `VU` Vanuatu
- [ ] `YE` Yemen
- [ ] `ZM` Zambia
- [ ] `ZW` Zimbabwe
- [ ] `PS` Palestine

