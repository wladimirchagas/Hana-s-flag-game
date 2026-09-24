# Country Personas — decision ledger

The record the playbook requires (step 15): every choice made while building Country Personas,
with the evidence behind it and the alternatives rejected, so a later reviewer can challenge it.

- **Method:** [`docs/COUNTRY_PERSONAS_PLAYBOOK.md`](COUNTRY_PERSONAS_PLAYBOOK.md).
- **Diagnostics:** [`docs/country-personas/BUILD_REPORT.md`](country-personas/BUILD_REPORT.md), auto-generated on every
  build.

Newest entries first.

---

## 2026-09-24 — UI surfaces shipped (edition 2026)

The four approved surfaces are built. Every one reads `src/data/countryPersonas.ts`, which
`scripts/build-country-personas.mjs` re-scores from the frozen model. If the re-score differs
from any frozen assignment, the build fails.

- **Flag grid, Group by:** "By country persona" (5 group headings) and "By persona type"
  (12 type headings). These modes appear on today's map only. Each heading has an ⓘ tooltip.
  Vatican City, the one unclassified state, gets its own "Not classified" heading.
- **Map colour mode:** "Country personas, 2026" sits in the index menu under its own
  "Country personas" heading, separate from the indexes.
  - Colours use the Okabe–Ito categorical palette, because personas are unordered and must not
    borrow the index green→red scale.
  - The legend says "Letters are labels, not ranks", and every legend entry carries the group
    tooltip.
  - The hover tooltip names the group and, when the group has several types, the type.
- **Fact-sheet row:** a "Country persona" row sits after Region. It shows the group badge, plus
  a type badge when the group has more than one type.
  - A country with confidence below 0.1 (D7) also says which group it borders.
  - Vatican City reads "Not classified", and its tooltip explains why.
- **Family tree:** a "See country personas map" accordion under the index chart.
  - It plots 194 countries on the first two principal components (42% and 26% of the
    variation), coloured by group.
  - Each type's centre is labelled.
  - Hovering a dot previews the country in the panel; clicking or tapping selects it.
  - Legends underneath carry every group and type tooltip.
- **Tooltips:** they open on hover and on focus or tap, using CSS `:hover` / `:focus-within`,
  like the membership badges.
  - Every tooltip ends with the averages note: a persona describes national averages, not people.
  - A small layout-only nudge keeps a tooltip inside the screen. Without it, a badge near the
    right edge of a 390px phone pushed the page into horizontal scroll (measured 469px wide
    before the fix, 390px after).

---

## 2026-09-24 — Owner approval; edition 2026 frozen

The owner reviewed `docs/country-personas/PERSONAS_DRAFT.md` and approved four points:

- **Structure:** 5 groups and 12 types, with the three failing acceptance criteria recorded (D7).
- **Names and portraits:** approved as drafted.
- **E12's name:** keep the score-based name, "Agrarian Countries, Lowest Freedom Scores". It
  describes the published index scores and names Freedom House 2026 in its line.
- **Where personas appear:** all four surfaces, each with tooltips explaining every group and
  type:
  - the flag grid's Group by;
  - the map colour mode;
  - a fact-sheet row;
  - a family-tree chart.

**Freezing.** The approved drafts were promoted to frozen files; each records the sha256 of the
draft it came from.

- `scripts/data/country-personas-model.draft.json` → `scripts/data/country-personas-model.json`
- `scripts/data/country-persona-portraits.draft.json` → `scripts/data/country-persona-portraits.json`

**What happens to the drafts.** From here on, `build.py` still writes to the `.draft.json` files.
A rebuild never touches the frozen model: a new edition needs a new owner review and promotion
(playbook step 16).

---

## 2026-09-24 — Build v1 (draft, awaiting owner review)

### D1. Inputs: a single dated snapshot, with World Bank indicators added (Phase 0)

`scripts/build-country-persona-inputs.mjs` → `scripts/data/country-persona-inputs.json`. It holds
195 countries × 123 variables, each value with its year and each variable with its source.

- **Where the data comes from.**
  - It adds 29 World Bank World Development Indicators series, keeping each country's latest
    value from 2015 onwards. The Phase-0 gap the playbook identified (C3: no age structure, no
    urbanisation) is closed: 187–194 of 195 countries are covered.
  - The Vatican is absent from the World Bank's data.
- **Three series fail as build inputs.**

  | Series | Coverage | Problem |
  |---|---|---|
  | Homicides | 151 | below the 85% coverage gate |
  | Largest-city share | 150 | below the 85% coverage gate |
  | Tourist arrivals | 180 | mostly 2020, a COVID year that is not representative |

  All three stay as descriptors.

### D2. The first design (nine domains) failed the acceptance criteria — rejected

The first build used nine domains:

- prosperity and connectivity;
- political freedom;
- institutional integrity;
- age structure relative to prosperity;
- urban and service-based economy;
- natural-resource dependence;
- international migrants;
- scale and global reach;
- women in the workforce.

It produced 6 groups and 16 types.

**Results against the playbook's acceptance criteria (E3):**

| Criterion | Result |
|---|---|
| Group bootstrap Jaccard | 0.54–0.74 (target ≥ 0.75) |
| Types with Jaccard ≥ 0.60 | 31% (target ≥ 80%) |
| Weight sensitivity (Dirichlet), groups ARI | 0.46 (target ≥ 0.70) |
| Leave-one-variable-out, groups ARI | down to 0.44 (target ≥ 0.80) |
| Group sizes | 8–51 (target 10–45) |
| Average silhouette | 0.22 (groups), 0.17 (types) |

The comparison baseline was high: plain k-means against the final model agreed at ARI 0.94 for
groups. So the instability is real, not an artifact of the measurement method.

**Diagnosis.** Several domains were almost uncorrelated with every other domain:

- age structure, once residualised on prosperity (|r| ≤ 0.25 with the rest);
- women in the workforce (≤ 0.27);
- scale (≤ 0.26).

With about seven near-independent dimensions for 195 countries, the data is a continuous cloud.
Any 16-way partition of it is partly arbitrary: small reweightings move many borders. This is
the playbook's own warning from the pilot (C2.5), made worse by adding dimensions.

### D3. Seven alternative designs were compared on the same stability measures

Measures: mean bootstrap Jaccard (50 resamples), median ARI under reweighting (Dirichlet, weight
CV ≈ 27%), and silhouette, for k = 4–12 groups.

| Design | Best k | Min Jaccard | Groups ≥ 0.75 | Reweighting ARI | Silhouette |
|---|---|---|---|---|---|
| Nine domains (baseline) | 6 | 0.57 | 2 of 6 | 0.67 | 0.24 |
| Eight (drop women in work) | 5 | 0.62 | 3 of 5 | 0.73 | 0.24 |
| Seven (merge freedom + integrity; drop women in work) | 5 | 0.65 | 3 of 5 | 0.63 | 0.24 |
| Six (also merge prosperity + urban/services) | 5 | 0.61 | 3 of 5 | 0.61 | 0.23 |
| Five (as six, drop migrants) | 5 | 0.70 | 4 of 5 | 0.55 | 0.26 |
| **Four: development, governance, age structure, scale** | **5** | **0.79** | **5 of 5** | 0.59 (0.84 at weight CV ≈ 14%) | **0.29** |
| Five without scale | 6 | 0.62 | 3 of 6 | 0.54 | 0.25 |

**No design gave stable types at 10–27 clusters.** At country level the data supports about five
stable groups, not the 6–8 groups and 18–24 types the playbook targeted (E2).

### D4. Chosen: four core domains, top-down

| Domain | Indicators | Why |
|---|---|---|
| Development | log GDP per capita (PPP, current-US$ fallback), HDI, % internet users, % urban, agriculture share of GDP (−), services share of GDP (+) | Prosperity and urban/service economy correlate 0.80: one latent axis, the Mosaic Global "affluence" and "urban↔rural" axes combined |
| Governance | Freedom House, V-Dem, Economist, RSF, CPI, WJP | Freedom and integrity correlate 0.79: one axis |
| Age structure relative to development | % aged 65+, % aged 0–14 (−), fertility (−), life expectancy, population growth (−), taken as a residual on development | Raw age structure correlates 0.87 with development (above the 0.81 gate). The residual keeps the real exceptions, such as wealthy but young Gulf states and middle-income but old Eastern Europe |
| Scale and global reach | log population, log Soft Power | An independent axis, and the one that separates small states |

Weights are 1 for all four. Scale at 0.5 was tested, as the playbook asks (E1). It made things
worse: the minimum group Jaccard fell to 0.62, two groups fell below 0.75, and Liechtenstein and
Monaco-type states split away from the other small states. So scale stays at weight 1.

**Dropped from the build, kept as descriptors:**

- natural-resource dependence;
- international migrants;
- women in the workforce.

They appear in the Grand Index key features. For example, the Gulf states' very high migrant
share is still reported; it just does not define the group.

**Hierarchy is top-down** (the ONS/OAC method), not Mosaic's bottom-up. Bottom-up types were
never stable, so they cannot be the foundation. Groups come first. A group is split into 2–4
types only when every resulting type reaches a within-group bootstrap Jaccard ≥ 0.60 with at
least 4 members, otherwise it stays a single type. This is the clustergram-style per-group
splitting that the 2021 OAC used.

**Scoring is hierarchical nearest-centroid:** nearest group centroid, then the nearest type
centroid inside that group. The build checks that this rule reproduces every built country's
assignment exactly, so the Node scorer that ships later can apply the frozen model and get the
same answer.

### D5. The "small states" group is real, not a missing-data artefact

The pilot (playbook C2.7) produced a microstate cluster whose members had, on average, 41% of
their inputs imputed. It was an artefact. The same-looking group in this build is different:

- **It is earned from observed data.** Population and Soft Power are observed for every member.
  No built country has any domain imputed: within-domain averaging covers every item-level gap.
  Only the Vatican lacks whole domains; it observes a single domain and is **Unclassified**.
- **Imputation doesn't move it.** Every one of the 20 imputations gives the same modal type
  (imputation agreement 100%).
- **It matches an established category.** "Small states" is used by the World Bank and the
  Commonwealth.

### D6. Key features exclude geography-in-disguise and the app's own catalogue counts

The first profiles featured "Member of CARICOM" and "Member of the African Union" (geography
under another name) and "Public broadcasters listed" (a count of the app's own curation, not a
fact about the country). The playbook bars geography from key features and treats curation
counts as descriptors only.

- **The rule.** An organisation is a *geographic label* when at least 80% of its members are on
  one continent. That is measured from `countryBlocks.ts`, not decided by hand. `count_*`
  variables are never featured.
- **What it removes.** It excludes the EU, ASEAN, Mercosur, the Gulf Cooperation Council, the
  African Union, CARICOM and NATO.
- **What it keeps.** Cross-continental clubs stay eligible: the OECD, OPEC, BRICS, the G20 and
  the Commonwealth.
- **Nothing is lost.** Every excluded row stays in the full Grand Index profile.

### D7. Results of the chosen design (build v1)

- **Who is placed.** 194 countries are built, none is provisional, and 1 is unclassified (the
  Vatican).
- **Structure.** 5 groups hold 35–42 countries each. The 12 types break down as:

  | Group | Types | How the split was decided |
  |---|---|---|
  | A | 4 | split was stable |
  | B | 3 | split was stable |
  | C | 2 | split was stable |
  | D | 1 | no stable split, so it stays whole |
  | E | 2 | split was stable |

| Criterion (playbook E3) | Result |
|---|---|
| Group sizes 10–45 | PASS (35–42) |
| Type size ≥ 4 | PASS (min 6) |
| Every group Jaccard ≥ 0.75 | PASS (0.76–0.87) |
| Types Jaccard ≥ 0.60 | PASS (100%; min 0.64) |
| Imputation agreement ≥ 90% | PASS (100%) |
| Scoring reproduces every assignment | PASS (0 mismatches) |
| Consensus vs direct k-means ARI ≥ 0.60 | PASS (0.91) |
| Reweighting ARI ≥ 0.70 at weight CV ≈ 27% | **FAIL (0.60)**; 0.83 at CV ≈ 14% |
| Leave-one-variable-out ARI ≥ 0.80 | **FAIL (min 0.73: % urban; 0.76: population)** |
| Beats the permutation null on ≥ 90% of trailers | **FAIL (84% of 49)** |
| Silhouette (not gated) | groups 0.29, types 0.18 |

**The three failures, read honestly:**

- **Validation.** On the variables held out of the build, persona groups explain more variance
  than either continent or World Bank income group: median η² 0.30 for the groups, 0.21 for
  continent, 0.17 for income group. The 8 trailers they do not beat the null on are largely
  unrelated to national character:
  - newspapers listed;
  - population density;
  - military spending;
  - the terrorism index;
  - the happiness share from the World Values Survey;
  - the effective number of parties;
  - the diplomacy index, with 64 countries;
  - women in the workforce.
- **Leave-one-variable-out.** It misses narrowly, and on the two variables that carry the most
  weight within their domains.
- **Reweighting.** See D8.

**Agreement with existing typologies (ARI)** is moderate, which is the intended outcome: the
personas are neither the map nor income bands redrawn.

| Typology | ARI |
|---|---|
| Continent | 0.19 |
| Sub-region | 0.12 |
| World Bank income group | 0.26 |
| Freedom House status | 0.25 |

### D8. Known limits, carried to the owner review

- **Reweighting sensitivity at ±27% fails the playbook's 0.70 target.** At ±14% the groups
  hold (ARI about 0.8). Borders between groups depend on how much weight each axis gets, as
  expected for a continuum. Per-country confidence and a second-choice group are stored for
  exactly this reason.
- **The structure is coarser than the playbook planned:** 5 groups and about 13 types, not
  6–8 and 18–24. This is the evidence-based answer, not a shortcut. The playbook's targets
  were written before the data was measured.
- **Names and pen portraits are not written.** They follow the Grand Index and the owner's
  review (step 12). Nothing in `src/` reads this build yet.
