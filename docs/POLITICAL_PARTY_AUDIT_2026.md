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

**Countries audited: 2 / 195.**

| Country | Merged | Parties before → after | Chamber coverage | Verdict before |
|---|---|---|---|---|
| 🇦🇺 Australia | `#1313` | 3 → 9 | 142 / 150 | **STALE — S1** |
| 🇲🇾 Malaysia | `#1314` | 22 → 22 | 212 / 222 | **CURRENT on seats — S2/S3 elsewhere** |

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

---

## Queue — all 195 countries in the owner's priority order

Tick a box only when that country's fix is **merged and live**.

### Phase 1 — Australia, Malaysia, Brazil (3)

- [x] `AU` Australia — merged
- [x] `MY` Malaysia — merged
- [ ] `BR` Brazil

### Phase 2 — rest of Southeast Asia (10)

- [ ] `MM` Myanmar
- [ ] `TH` Thailand
- [ ] `VN` Vietnam
- [ ] `ID` Indonesia
- [ ] `PH` Philippines
- [ ] `SG` Singapore
- [ ] `KH` Cambodia
- [ ] `LA` Laos
- [ ] `BN` Brunei
- [ ] `TL` Timor-Leste

### Phase 3 — rest of South America (11)

- [ ] `AR` Argentina
- [ ] `CL` Chile
- [ ] `CO` Colombia
- [ ] `PE` Peru
- [ ] `VE` Venezuela
- [ ] `EC` Ecuador
- [ ] `BO` Bolivia
- [ ] `PY` Paraguay
- [ ] `UY` Uruguay
- [ ] `GY` Guyana
- [ ] `SR` Suriname

### Phase 4 — United Kingdom, United States, Canada (3)

- [ ] `GB` United Kingdom
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

