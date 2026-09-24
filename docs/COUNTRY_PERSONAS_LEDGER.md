# Country Personas — decision ledger

The record the playbook requires (step 15): every choice made while building Country Personas,
with the evidence behind it and the alternatives rejected, so a later reviewer can challenge it.

- **Method:** [`docs/COUNTRY_PERSONAS_PLAYBOOK.md`](COUNTRY_PERSONAS_PLAYBOOK.md).
- **Diagnostics:** [`docs/country-personas/BUILD_REPORT.md`](country-personas/BUILD_REPORT.md), auto-generated on every
  build.

Newest entries first.

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
  Only two countries in the whole build set have any imputed domain.
- **Imputation doesn't move it.** Every one of the 20 imputations gives the same modal type
  (imputation agreement 100%).
- **It matches an established category.** "Small states" is used by the World Bank and the
  Commonwealth.

### D6. Known limits, carried to the owner review

- **Reweighting sensitivity at ±27% fails the playbook's 0.70 target.** At ±14% the groups
  hold (ARI about 0.8). Borders between groups depend on how much weight each axis gets, as
  expected for a continuum. Per-country confidence and a second-choice group are stored for
  exactly this reason.
- **The structure is coarser than the playbook planned:** 5 groups and about 13 types, not
  6–8 and 18–24. This is the evidence-based answer, not a shortcut. The playbook's targets
  were written before the data was measured.
- **Names and pen portraits are not written.** They follow the Grand Index and the owner's
  review (step 12). Nothing in `src/` reads this build yet.
