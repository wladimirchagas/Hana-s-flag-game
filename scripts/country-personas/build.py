#!/usr/bin/env python3
"""Country Personas v2 — research build (docs/COUNTRY_PERSONAS_PLAYBOOK.md; decisions in
docs/COUNTRY_PERSONAS_LEDGER.md).

Reads ONLY scripts/data/country-persona-inputs.json (the dated, sourced snapshot written by
scripts/build-country-persona-inputs.mjs) and writes:

  scripts/data/country-personas-model.draft.json   the draft model: indicators and their
                                                    standardisation constants, pillar/domain
                                                    weights, the tolerance rule, every persona's
                                                    members and every country's assignment
  scripts/data/country-personas-profile.json       every persona's MEDIAN and member RANGE on
                                                    every variable, and whether that variable
                                                    may be claimed in its description
  docs/country-personas/BUILD_REPORT.md             diagnostics

The owner's brief for v2 (2026-09-24):
  • ONE level of personas — at most 30, at least 10 (no groups/types);
  • greater use of the indices and the World Values Survey attitudes, with culture and heritage
    (religion, official languages, regional organisations) blended in;
  • STRICT BOUNDARIES: a member must sit within 1 world standard deviation of its persona's
    median, and no description may quote an average that does not describe its members.

How this build meets that brief:
  • Similarity = four pillars — facts, index scores, attitudes, heritage — starting from equal
    weights split equally over each pillar's domains, then CALIBRATED so that no single domain
    accounts for more than 1/15 of what separates countries (owner: religion must be "one of many
    variables"; measured before calibration, religion drove 15% and country size 16%). Missing values are never imputed: two countries are compared
    on the indicators BOTH have (a partial, Gower-style distance), so the ~107 states the World
    Values Survey has not covered are compared on the other three pillars only.
  • Boundaries: every member must lie within TAU (= 1 world SD) of its persona's median on each
    CORE dimension — development, demography, governance and values. Religion is deliberately NOT
    a core dimension (owner, 2026-09-24: "one of many variables … don't over-index on it"); it is
    one of 15 similarity domains. The partition is found by iterated local search that minimises
    (members outside the tolerance) first and within-persona distance second, with every persona
    at least MIN_SIZE countries. A member still outside after the search is recorded as an
    EXCEPTION on the dimension it misses, never hidden.
  • Descriptions: profile.json reports medians and member ranges, never means, and marks a
    variable claimable only when EVERY observed member sits within 1 world SD of the persona
    median on it (and it is distinctive). The portraits may state only claimable figures.

    python3 -m venv /tmp/cp && /tmp/cp/bin/pip install -r scripts/country-personas/requirements.txt
    /tmp/cp/bin/python scripts/country-personas/build.py
"""
from __future__ import annotations

import hashlib
import json
import math
import os
import warnings
from collections import Counter
from multiprocessing import Pool
from pathlib import Path

import numpy as np
import pandas as pd
from scipy.cluster.hierarchy import fcluster, leaves_list, linkage, optimal_leaf_ordering
from scipy.spatial.distance import squareform
from scipy.stats import skew
from sklearn.metrics import adjusted_rand_score, silhouette_score
from sklearn.preprocessing import PowerTransformer

warnings.filterwarnings("ignore")

ROOT = Path(__file__).resolve().parents[2]
SNAPSHOT = ROOT / "scripts/data/country-persona-inputs.json"
OUT_MODEL = ROOT / "scripts/data/country-personas-model.draft.json"
OUT_PROFILE = ROOT / "scripts/data/country-personas-profile.json"
OUT_REPORT = ROOT / "docs/country-personas/BUILD_REPORT.md"

SEED = 20260924
TAU = 1.0                  # owner: "no more than 1 standard deviation from the median"
MIN_SIZE = 3               # a persona of one or two countries describes a country, not a persona
K_RANGE = range(10, 31)    # owner: one level; 30 is a ceiling, 10 a floor
if os.environ.get("K_ONLY"):
    K_RANGE = [int(k) for k in os.environ["K_ONLY"].split(",")]
LAMBDA = 20.0              # cost of one member outside the tolerance, in distance units
SEARCH_ROUNDS = 15         # iterated-local-search kicks per start
STAB_RUNS_PER_K = 12       # quick stability ensemble for every K in the sweep
PERTURBATIONS = 40         # full stability ensemble for the chosen K
STABLE_MEDIAN = 0.60       # Hennig (2007): mean Jaccard 0.6–0.75 = a real pattern; ≥ 0.75 stable
DISSOLVED = 0.50           # ≤ 0.5 = the cluster dissolves under perturbation
CLAIM_MIN_Z = 0.5          # a claim must also be distinctive: ≥ 0.5 world SD from the world median
UNCLASSIFIED_SHARE = 0.5   # < 50% of the similarity weight observed → "not enough comparable data"
PROVISIONAL_SHARE = 0.6    # < 60% → placed, but provisional
WORKERS = max(1, min(4, os.cpu_count() or 1))
SMOKE = bool(os.environ.get("SMOKE"))    # tiny settings to test the pipeline end to end
if SMOKE:
    SEARCH_ROUNDS, STAB_RUNS_PER_K, PERTURBATIONS = 1, 3, 3

# ── Pillars, domains, indicators ─────────────────────────────────────────────
# (variable, transform, sign). Sign aligns an indicator so that higher = more of the named
# concept. Derived variables (tourism per person, Hellinger religion shares) are built below.
PILLARS = {
    "facts": {"label": "Measured facts", "domains": {
        "development": ("Development", [("wb_gdppc_ppp", "log", 1), ("idx_hdi", "none", 1), ("wb_internet", "none", 1), ("wb_life_expectancy", "none", 1)]),
        "demography": ("Demography", [("wb_fertility", "log", 1), ("wb_age_0_14", "none", 1), ("wb_age_65_up", "none", -1), ("wb_pop_growth", "none", 1)]),
        "economy": ("Economic structure", [("wb_agriculture", "asinh", 1), ("wb_industry", "none", 1), ("wb_resource_rents", "asinh", 1), ("wb_trade", "log", 1), ("wb_remittances", "asinh", 1), ("tourism_per_person", "log", 1)]),
        "society": ("Society", [("wb_urban", "none", 1), ("wb_migrants", "log", 1), ("wb_female_lfp", "none", 1), ("wb_homicide", "log1p", 1)]),
        "scale": ("Size", [("wb_population", "log", 1)]),
    }},
    "indices": {"label": "Index scores", "domains": {
        "democracy": ("Democracy and freedom", [("idx_freedomHouse", "none", 1), ("idx_vDem", "none", 1), ("idx_economist", "none", 1), ("idx_rsfPress", "none", 1)]),
        "integrity": ("Clean government and rule of law", [("idx_cpi", "none", 1), ("idx_wjpRuleOfLaw", "none", 1)]),
        "peace": ("Peace and security", [("idx_gpi", "none", -1), ("idx_gti", "none", -1), ("idx_etr", "none", -1)]),
        "wellbeing": ("Happiness and gender equality", [("idx_happiness", "none", 1), ("idx_genderGap", "none", 1)]),
        "standing": ("Global reputation", [("idx_softPower", "log", 1)]),
    }},
    "attitudes": {"label": "Attitudes (World Values Survey)", "domains": {
        "secular": ("Traditional to secular-rational values", [("wvs_god_importance", "none", -1), ("wvs_abortion_justifiable", "none", 1), ("wvs_very_proud", "none", -1), ("wvs_respect_authority_good", "none", -1), ("wvs_autonomy", "none", 1)]),
        "selfexpression": ("Survival to self-expression values", [("wvs_happy", "none", 1), ("wvs_trust", "log", 1), ("wvs_homosexuality_justifiable", "none", 1), ("wvs_petition_signed", "log", 1), ("wvs_postmaterialist_first", "log", 1)]),
    }},
    "heritage": {"label": "Culture and heritage", "domains": {
        "religion": ("Religious make-up", [(f"{r}_hellinger", "none", 1) for r in ("rel_christian", "rel_muslim", "rel_unaffiliated", "rel_buddhist", "rel_hindu", "rel_jewish", "rel_other")]),
        "language": ("Official languages", [(f"lang_{l}", "none", 1) for l in ("english", "french", "arabic", "spanish", "portuguese", "russian", "german")]),
        "region": ("Regional organisations", [(f"member_{m}", "none", 1) for m in (
            "european_union", "african_union", "asean", "mercosur", "arab_league", "caricom", "ecowas", "sadc",
            "pacific_islands_forum", "organization_of_american_states", "gulf_cooperation_council",
            "eurasian_economic_union", "andean_community", "pacific_alliance", "usmca", "commonwealth_of_nations")]),
    }},
}
UNSCALED_DOMAINS = {"religion", "language", "region"}   # already on a common scale (shares / 0–1)
FALLBACK = {"wb_gdppc_ppp": "wb_gdppc_usd"}

# CORE dimensions carry the hard 1-SD boundary: the headline axes of the facts, index-score and
# attitude pillars. Heritage (religion, language, regional organisations) shapes similarity but
# never the boundary. Each core dimension is re-standardised to median 0, world SD 1.
CORE = [
    ("development", "Development", ("mean", ["development"], 2)),
    ("demography", "Demography (fertility, age structure, population growth)", ("mean", ["demography"], 2)),
    ("governance", "Governance (democracy, clean government, rule of law)", ("mean_of_domains", ["democracy", "integrity"], 1)),
    ("values", "Values (secular-rational and self-expression)", ("mean_of_domains_all", ["secular", "selfexpression"], 3)),
]

# ── Load ─────────────────────────────────────────────────────────────────────
snap_bytes = SNAPSHOT.read_bytes()
S = json.loads(snap_bytes)
U: list[str] = S["universe"]
NAMES: dict[str, str] = S["names"]
VARS: dict = S["variables"]
N0 = len(U)


def num(var: str) -> pd.Series:
    return pd.to_numeric(pd.Series({c: (S["values"][c].get(var) or {}).get("v", np.nan) for c in U}, dtype=object), errors="coerce").astype(float)


RAW: dict[str, pd.Series] = {}


def raw(var: str) -> pd.Series:
    if var not in RAW:
        if var == "tourism_per_person":
            RAW[var] = num("wb_tourist_arrivals") / num("wb_population")
        elif var.endswith("_hellinger"):
            RAW[var] = np.sqrt(num(var[: -len("_hellinger")]).clip(lower=0) / 100.0)
        else:
            RAW[var] = num(var)
    return RAW[var]


def transform(x: pd.Series, how: str) -> pd.Series:
    if how == "log":
        return np.log(x.where(x > 0))
    if how == "log1p":
        return np.log1p(x.clip(lower=0))
    if how == "asinh":
        return np.arcsinh(x)
    return x


def standardise(var: str, how: str, sign: int, scaled: bool) -> tuple[pd.Series, dict]:
    """Transform; tame |skew| > 1 with Yeo-Johnson; centre on the median and divide by the world
    SD (the owner's unit of tolerance); clip at ±4 SD so one extreme cannot dominate."""
    x = transform(raw(var), how)
    meta: dict = {"var": var, "transform": how, "sign": sign}
    if var in FALLBACK:
        fb = transform(raw(FALLBACK[var]), how)
        # rescale the fallback onto the primary's scale over the countries that have both
        both = x.notna() & fb.notna()
        a, b = np.polyfit(fb[both], x[both], 1)
        fill = x.isna() & fb.notna()
        x = x.where(~fill, a * fb + b)
        meta["fallback"] = {"var": FALLBACK[var], "slope": float(a), "intercept": float(b), "usedFor": sorted(x.index[fill])}
    if not scaled:
        meta["coverage"] = int(x.notna().sum())
        return (sign * x), meta
    obs = x.dropna()
    sk = float(skew(obs))
    if abs(sk) > 1:
        pt = PowerTransformer(method="yeo-johnson", standardize=False).fit(obs.values.reshape(-1, 1))
        meta["yeoJohnsonLambda"] = float(pt.lambdas_[0])
        meta["skewBefore"] = round(sk, 2)
        x = pd.Series(pt.transform(x.values.reshape(-1, 1)).ravel(), index=x.index).where(x.notna())
        sk = float(skew(x.dropna()))
    med, sd = float(x.median()), float(x.std())
    meta.update({"median": med, "sd": sd, "skew": round(sk, 2), "coverage": int(x.notna().sum())})
    return (sign * (x - med) / sd).clip(-4, 4), meta


Z: dict[str, pd.Series] = {}          # "domain:var" → standardised series
DOMAIN_OF: dict[str, str] = {}
PILLAR_OF: dict[str, str] = {}
INDICATOR_META: dict[str, list[dict]] = {}
for p, pdef in PILLARS.items():
    for d, (dlabel, inds) in pdef["domains"].items():
        PILLAR_OF[d] = p
        INDICATOR_META[d] = []
        for var, how, sign in inds:
            z, meta = standardise(var, how, sign, d not in UNSCALED_DOMAINS)
            Z[f"{d}:{var}"] = z
            DOMAIN_OF[f"{d}:{var}"] = d
            INDICATOR_META[d].append(meta)
ZF = pd.DataFrame(Z, index=U)
DOMAINS = [d for p in PILLARS for d in PILLARS[p]["domains"]]
W_DOMAIN = {d: (1.0 / len(PILLARS)) / len(PILLARS[PILLAR_OF[d]]["domains"]) for d in DOMAINS}

# ── Data sufficiency (on the NOMINAL equal-pillar weights: a country the World Values Survey has
#    not covered still has three of four pillars, 75%, and is placed) ─────────
dom_observed = pd.DataFrame({d: ZF[[c for c in ZF.columns if DOMAIN_OF[c] == d]].notna().any(axis=1) for d in DOMAINS})
obs_share = sum(dom_observed[d].astype(float) * W_DOMAIN[d] for d in DOMAINS)
STATUS = pd.Series("built", index=U)
STATUS[obs_share < PROVISIONAL_SHARE] = "provisional"
STATUS[obs_share < UNCLASSIFIED_SHARE] = "unclassified"
PLACED = [c for c in U if STATUS[c] != "unclassified"]
N = len(PLACED)
IDX = {c: i for i, c in enumerate(PLACED)}


# ── Distances (partial over observed indicators, per domain) ─────────────────
def domain_d2(d: str, Zm: pd.DataFrame, cols: list[str] | None = None) -> np.ndarray:
    cols = cols if cols is not None else [c for c in Zm.columns if DOMAIN_OF[c] == d]
    X = Zm.loc[PLACED, cols].to_numpy(float)
    M = ~np.isnan(X)
    X0 = np.nan_to_num(X)
    num_ = np.zeros((N, N))
    cnt = np.zeros((N, N))
    for k in range(X.shape[1]):
        m = M[:, k].astype(float)
        x = X0[:, k]
        mm = m[:, None] * m[None, :]
        num_ += (x[:, None] - x[None, :]) ** 2 * mm
        cnt += mm
    with np.errstate(invalid="ignore", divide="ignore"):
        D2 = num_ / cnt
    D2[cnt == 0] = np.nan
    return D2


def normalise(D2: np.ndarray) -> tuple[np.ndarray, float]:
    off = D2[~np.eye(len(D2), dtype=bool)]
    scale = float(np.nanmean(off))
    return D2 / scale, scale


DD: dict[str, np.ndarray] = {}
DOMAIN_SCALE: dict[str, float] = {}
for d in DOMAINS:
    DD[d], DOMAIN_SCALE[d] = normalise(domain_d2(d, ZF))


def combine(DD_: dict[str, np.ndarray], weights: dict[str, float]) -> np.ndarray:
    num_ = np.zeros((N, N))
    den = np.zeros((N, N))
    for d, D2 in DD_.items():
        w = weights.get(d, 0.0)
        if w <= 0:
            continue
        ok = ~np.isnan(D2)
        num_ += np.where(ok, w * D2, 0.0)
        den += np.where(ok, w, 0.0)
    with np.errstate(invalid="ignore", divide="ignore"):
        D = np.sqrt(num_ / den)
    np.fill_diagonal(D, 0.0)
    return np.nan_to_num(D, nan=float(np.nanmax(D)))


IU = np.triu_indices(N, 1)


def influence_shares(weights: dict[str, float]) -> dict[str, float]:
    """Each domain's share of the total leave-one-out influence: 1 − corr(full distance, distance
    without that domain), normalised to sum to 1 (partition-free)."""
    D = combine(DD, weights)
    raw_ = {}
    for drop in DOMAINS:
        Dm = combine(DD, {d: (0.0 if d == drop else v) for d, v in weights.items()})
        raw_[drop] = 1 - float(np.corrcoef(D[IU], Dm[IU])[0, 1])
    tot = sum(raw_.values())
    return {d: v / tot for d, v in raw_.items()}


def calibrate(weights: dict[str, float], cap: float, iters: int = 60) -> tuple[dict[str, float], dict[str, float], int]:
    """Damp any domain whose influence share exceeds the cap, renormalise, repeat. Domains below
    the cap are never boosted directly; they gain only through renormalisation."""
    w = dict(weights)
    for it in range(iters):
        sh = influence_shares(w)
        if max(sh.values()) <= cap * 1.05:
            return w, sh, it
        for d in w:
            if sh[d] > cap:
                w[d] *= (cap / sh[d]) ** 0.7
        t = sum(w.values())
        w = {d: v / t for d, v in w.items()}
    return w, influence_shares(w), iters


INFLUENCE_CAP = 1.0 / len(DOMAINS)
INFLUENCE_NOMINAL = influence_shares(W_DOMAIN)
W, INFLUENCE_CALIBRATED, CAL_ITERS = calibrate(W_DOMAIN, INFLUENCE_CAP)
D_BASE = combine(DD, W)


# ── Core dimensions (the hard boundary) ──────────────────────────────────────
def std_med_sd(s: pd.Series) -> tuple[pd.Series, float, float]:
    med, sd = float(s.median()), float(s.std())
    return (s - med) / sd, med, sd


def domain_mean(d: str, min_obs: int) -> pd.Series:
    cols = [c for c in ZF.columns if DOMAIN_OF[c] == d]
    return ZF[cols].mean(axis=1).where(ZF[cols].notna().sum(axis=1) >= min_obs)


CORE_META: list[dict] = []
core_cols = {}
for key, label, (kind, src, min_obs) in CORE:
    parts = []
    if kind == "mean":
        s = domain_mean(src[0], min_obs)
    elif kind in ("mean_of_domains", "mean_of_domains_all"):
        cols = []
        for d in src:
            zd, pm, ps = std_med_sd(domain_mean(d, 1 if kind == "mean_of_domains" else min_obs))
            cols.append(zd)
            parts.append({"domain": d, "median": pm, "sd": ps})
        s = pd.concat(cols, axis=1).mean(axis=1, skipna=(kind == "mean_of_domains"))
    else:
        s = num(src)
    z, med, sd = std_med_sd(s)
    core_cols[key] = z
    CORE_META.append({"key": key, "label": label, "kind": kind, "from": src, "minObserved": min_obs,
                      "parts": parts, "median": med, "sd": sd, "coverage": int(s.notna().sum())})
CORE_DF = pd.DataFrame(core_cols, index=U)
CORE_KEYS = list(CORE_DF.columns)
CM = CORE_DF.loc[PLACED].to_numpy(float)


# ── Partition search ─────────────────────────────────────────────────────────
def fast_median(X: np.ndarray) -> np.ndarray:
    """Column medians ignoring NaN (small arrays; ~10× faster than np.nanmedian)."""
    nan = np.isnan(X)
    Sx = np.sort(np.where(nan, np.inf, X), axis=0)
    n = (~nan).sum(axis=0)
    cols = np.arange(X.shape[1])
    lo = Sx[np.maximum((n - 1) // 2, 0), cols]
    hi = Sx[np.maximum(n // 2, 0), cols]
    med = (lo + hi) / 2
    med[n == 0] = np.nan
    return med


def outside(C: np.ndarray, members: list[int]) -> np.ndarray:
    """Boolean (len(members) × dims): member outside TAU of the persona median on that dim."""
    sub = C[members]
    if len(members) < 2:
        return np.zeros_like(sub, dtype=bool)
    dev = np.abs(sub - fast_median(sub))
    return np.nan_to_num(dev, nan=0.0) > TAU + 1e-9


class Partition:
    def __init__(self, D, C, K, labels):
        self.D, self.C, self.K = D, C, K
        self.lab = np.asarray(labels).copy()
        self.members = [list(np.where(self.lab == k)[0]) for k in range(K)]
        self.J = [self.obj(m) for m in self.members]

    def obj(self, m):
        if not m:
            return 1e12
        blk = self.D[np.ix_(m, m)]
        return LAMBDA * float(outside(self.C, m).any(axis=1).sum()) + float(blk.sum(axis=1).min())

    def violators(self):
        return int(sum(outside(self.C, m).any(axis=1).sum() for m in self.members))

    def cost(self):
        return float(sum(self.D[np.ix_(m, m)].sum(axis=1).min() for m in self.members))

    def move(self, i, dest):
        src = self.lab[i]
        if src == dest or len(self.members[src]) <= MIN_SIZE:
            return None
        ms = [x for x in self.members[src] if x != i]
        md = self.members[dest] + [i]
        js, jd = self.obj(ms), self.obj(md)
        return (js + jd) - (self.J[src] + self.J[dest]), (src, dest, ms, md, js, jd)

    def swap(self, i, j):
        a, b = self.lab[i], self.lab[j]
        if a == b:
            return None
        ma = [x for x in self.members[a] if x != i] + [j]
        mb = [x for x in self.members[b] if x != j] + [i]
        ja, jb = self.obj(ma), self.obj(mb)
        return (ja + jb) - (self.J[a] + self.J[b]), (a, b, ma, mb, ja, jb)

    def apply(self, spec):
        a, b, ma, mb, ja, jb = spec
        self.members[a], self.members[b] = ma, mb
        self.J[a], self.J[b] = ja, jb
        for x in ma:
            self.lab[x] = a
        for x in mb:
            self.lab[x] = b


def local_search(P: Partition, rng, near=8, sweeps=40):
    order = np.argsort(P.D, axis=1)
    for _ in range(sweeps):
        improved = False
        for i in rng.permutation(len(P.lab)):
            nn = order[i, 1: near * 3]
            dests = list(dict.fromkeys(int(P.lab[j]) for j in nn if P.lab[j] != P.lab[i]))[:near]
            best = None
            for dst in dests:
                r = P.move(i, dst)
                if r and r[0] < -1e-9 and (best is None or r[0] < best[0]):
                    best = r
            if best:
                P.apply(best[1])
                improved = True
                continue
            for j in nn[: near * 2]:
                r = P.swap(i, int(j))
                if r and r[0] < -1e-9:
                    P.apply(r[1])
                    improved = True
                    break
        if not improved:
            break
    return P


def fix_sizes(D, lab, K):
    """Turn any labelling into exactly K clusters of ≥ MIN_SIZE (merge small ones into their
    nearest cluster; split the largest by average linkage until there are K)."""
    lab = np.unique(np.asarray(lab), return_inverse=True)[1]
    while True:
        ks, cnt = np.unique(lab, return_counts=True)
        small = [k for k, n in zip(ks, cnt) if n < MIN_SIZE]
        if not small or len(ks) == 1:
            break
        k = small[0]
        m = np.where(lab == k)[0]
        others = [o for o in ks if o != k]
        lab[m] = min(others, key=lambda o: D[np.ix_(m, np.where(lab == o)[0])].mean())
        lab = np.unique(lab, return_inverse=True)[1]
    while lab.max() + 1 < K:
        ks, cnt = np.unique(lab, return_counts=True)
        big = ks[np.argmax(cnt)]
        m = np.where(lab == big)[0]
        sub = fcluster(linkage(squareform(D[np.ix_(m, m)], checks=False), "average"), 2, "maxclust")
        if min(np.bincount(sub)[1:]) < MIN_SIZE:
            sub = np.where(np.arange(len(m)) < len(m) // 2, 1, 2)
        lab[m[sub == 2]] = lab.max() + 1
    while lab.max() + 1 > K:  # merge the closest pair
        ks = np.unique(lab)
        best = None
        for a in ks:
            for b in ks:
                if a < b:
                    dab = D[np.ix_(np.where(lab == a)[0], np.where(lab == b)[0])].mean()
                    if best is None or dab < best[0]:
                        best = (dab, a, b)
        lab[lab == best[2]] = best[1]
        lab = np.unique(lab, return_inverse=True)[1]
    return lab


def pam_init(D, K, rng):
    """k-medoids++ seeding then Voronoi iteration on D."""
    med = [int(rng.integers(len(D)))]
    for _ in range(1, K):
        dmin = D[:, med].min(axis=1)
        med.append(int(rng.choice(len(D), p=dmin ** 2 / (dmin ** 2).sum())))
    for _ in range(30):
        lab = np.argmin(D[:, med], axis=1)
        new = []
        for k in range(K):
            m = np.where(lab == k)[0]
            new.append(int(m[np.argmin(D[np.ix_(m, m)].sum(axis=1))]) if len(m) else med[k])
        if new == med:
            break
        med = new
    return np.argmin(D[:, med], axis=1)


def search(D, C, K, seed, starts=("average", "ward", "pam", "pam")):
    rng = np.random.default_rng(seed)
    best = None
    for s_i, how in enumerate(starts):
        if how in ("average", "ward", "complete"):
            lab0 = fcluster(linkage(squareform(D, checks=False), how), K, "maxclust")
        else:
            lab0 = pam_init(D, K, rng)
        P = Partition(D, C, K, fix_sizes(D, lab0, K))
        local_search(P, rng)
        bl, bj = P.lab.copy(), sum(P.J)
        for _ in range(SEARCH_ROUNDS):
            Q = Partition(D, C, K, bl)
            for i in rng.choice(len(D), max(3, len(D) // 16), replace=False):
                j = int(rng.choice(np.argsort(D[i])[1:10]))
                r = Q.move(int(i), int(Q.lab[j]))
                if r:
                    Q.apply(r[1])
            local_search(Q, rng)
            if sum(Q.J) < bj - 1e-9:
                bl, bj = Q.lab.copy(), sum(Q.J)
        P = Partition(D, C, K, bl)
        key = (P.violators(), P.cost())
        if best is None or key < best[0]:
            best = (key, bl, how)
    return best


def run_k(K):
    (viol, cost), lab, how = search(D_BASE, CM, K, SEED + K, starts=("average", "pam", "pam"))
    sil = float(silhouette_score(D_BASE, lab, metric="precomputed"))
    return {"k": K, "violators": viol, "cost": cost, "silhouette": sil, "labels": lab.tolist(), "start": how,
            "sizes": sorted(np.bincount(lab).tolist(), reverse=True)}


# ── Stability ensemble (for the chosen K) ────────────────────────────────────
def perturbed_distance(kind: str, i: int) -> np.ndarray:
    rng = np.random.default_rng(SEED + 7000 + 97 * i + {"weights": 1, "drop-domain": 2, "indicators": 3}[kind] * 1000)
    if kind == "weights":        # every calibrated domain weight × a Dirichlet factor (CV ≈ 18%)
        f = rng.dirichlet(np.full(len(DOMAINS), 30.0)) * len(DOMAINS)
        return combine(DD, {d: W[d] * f[k] for k, d in enumerate(DOMAINS)})
    if kind == "drop-domain":    # leave one domain out
        drop = DOMAINS[i % len(DOMAINS)]
        return combine(DD, {d: (0.0 if d == drop else v) for d, v in W.items()})
    # "indicators": resample each domain's indicators with replacement
    DDb = {}
    for d in DOMAINS:
        cols = [c for c in ZF.columns if DOMAIN_OF[c] == d]
        pick = [cols[j] for j in rng.integers(len(cols), size=len(cols))]
        Zb = ZF[pick].copy()
        Zb.columns = [f"{c}#{j}" for j, c in enumerate(pick)]
        for c in Zb.columns:
            DOMAIN_OF[c] = d
        DDb[d] = normalise(domain_d2(d, Zb, list(Zb.columns)))[0]
    return combine(DDb, W)


def run_perturbation(args):
    kind, i, K = args
    Dp = perturbed_distance(kind, i)
    global SEARCH_ROUNDS
    SEARCH_ROUNDS = 1 if SMOKE else 6
    (viol, cost), lab, _ = search(Dp, CM, K, SEED + 500 + i, starts=("average", "pam"))
    return {"kind": kind, "i": i, "K": K, "labels": lab.tolist(), "violators": viol}


def perturbation_jobs(K: int, n: int) -> list[tuple]:
    """A balanced ensemble: re-weighted domains, one domain left out (rotating over all 15 across
    the K sweep), indicators resampled."""
    jobs = []
    for j in range(n):
        kind = ("weights", "drop-domain", "indicators")[j % 3]
        i = (3 * (j // 3) + K) % len(DOMAINS) if kind == "drop-domain" else j // 3 + 100 * K
        jobs.append((kind, i, K))
    return jobs


def domain_separation(lab: np.ndarray) -> dict[str, float]:
    """How strongly each domain separates the personas: 1 − (mean within-persona squared distance
    ÷ mean over all pairs), on the pairs that domain observes."""
    same = lab[:, None] == lab[None, :]
    off = ~np.eye(N, dtype=bool)
    out = {}
    for d in DOMAINS:
        D2 = DD[d]
        ok = ~np.isnan(D2) & off
        out[d] = round(float(1 - np.nanmean(D2[ok & same]) / np.nanmean(D2[ok])), 4)
    return out


def best_match_jaccard(base: np.ndarray, other: np.ndarray) -> list[float]:
    out = []
    for k in range(base.max() + 1):
        a = set(np.where(base == k)[0])
        out.append(max(len(a & set(np.where(other == o)[0])) / len(a | set(np.where(other == o)[0])) for o in range(other.max() + 1)))
    return out


# ── Profiles: medians, member ranges and what may be claimed ─────────────────
def analysis_scale(x: pd.Series) -> tuple[pd.Series, str]:
    """asinh for a heavily right-skewed non-negative variable (decided over the placed countries,
    exactly as the app generator decides it), raw otherwise."""
    o = x[PLACED].dropna()
    if len(o) > 5 and o.min() >= 0 and skew(o) > 1.5:
        return np.arcsinh(x), "asinh"
    return x, "raw"


def profile_persona(members: list[str], size: int) -> dict:
    out = {}
    for var, meta in VARS.items():
        kind = meta.get("kind")
        if kind == "numeric":
            x = num(var)
            world = x[PLACED].dropna()
            if len(world) < 20 or world.std() == 0:
                continue
            xs, scale = analysis_scale(x)
            sd = float(xs[PLACED].std())
            mem = x[members].dropna()
            if len(mem) == 0:
                continue
            ms = xs[mem.index]
            med_s = float(ms.median())
            homogeneous = bool((np.abs(ms - med_s) <= TAU * sd + 1e-12).all())
            z = (med_s - float(xs[PLACED].median())) / sd
            enough = len(mem) == size or len(mem) >= 3
            # quotable: every observed member within TAU world SD of the median, so a figure quoted
            # for the persona (its median and member range) describes each member.
            # claimable: quotable AND distinctive — eligible to be a key feature.
            out[var] = {"n": int(len(mem)), "median": float(mem.median()), "min": float(mem.min()), "max": float(mem.max()),
                        "z": round(float(z), 3), "scale": scale, "homogeneous": homogeneous,
                        "quotable": bool(homogeneous and enough),
                        "claimable": bool(homogeneous and enough and abs(z) >= CLAIM_MIN_Z)}
        elif kind == "binary":
            x = num(var)
            mem = x[members].dropna()
            if len(mem) == 0:
                continue
            share, wshare = float(mem.mean()), float(x[PLACED].dropna().mean())
            out[var] = {"n": int(len(mem)), "share": round(share, 3), "worldShare": round(wshare, 3),
                        "quotable": bool(len(mem) == size and share in (0.0, 1.0)),
                        "claimable": bool(len(mem) == size and share in (0.0, 1.0) and abs(share - wshare) >= 0.5)}
        elif kind == "category":
            xc = pd.Series({c: (S["values"][c].get(var) or {}).get("v") for c in members}).dropna()
            if len(xc) == 0:
                continue
            counts = Counter(xc)
            level, cnt = counts.most_common(1)[0]
            out[var] = {"n": int(len(xc)), "levels": dict(counts), "allShare": level if cnt == len(xc) else None,
                        "quotable": bool(cnt == len(xc) == size),
                        "claimable": bool(cnt == len(xc) == size and meta.get("role") != "benchmark")}
    # core dimensions (standardised units)
    for k in CORE_KEYS:
        v = CORE_DF.loc[members, k].dropna()
        if len(v):
            out[f"core:{k}"] = {"n": int(len(v)), "median": float(v.median()), "min": float(v.min()), "max": float(v.max()),
                                "z": round(float(v.median()), 3), "scale": "world SD", "homogeneous": bool((np.abs(v - v.median()) <= TAU + 1e-9).all()),
                                "claimable": False}
    return out


# ── Family map: classical MDS of the persona distance ────────────────────────
def classical_mds(D: np.ndarray, dims: int = 2):
    n = len(D)
    J = np.eye(n) - np.ones((n, n)) / n
    B = -0.5 * J @ (D ** 2) @ J
    vals, vecs = np.linalg.eigh(B)
    order = np.argsort(vals)[::-1]
    vals, vecs = vals[order], vecs[:, order]
    pos = vals[vals > 0]
    coords = vecs[:, :dims] * np.sqrt(np.maximum(vals[:dims], 0))
    return coords, (vals[:dims] / pos.sum()).tolist()


if __name__ == "__main__":
    import sys

    print(f"placed {N} of {N0}; provisional {int((STATUS == 'provisional').sum())}; unclassified {[NAMES[c] for c in U if STATUS[c] == 'unclassified']}", flush=True)
    sweep_file = Path(__file__).with_name(".sweep.json")
    if os.environ.get("REUSE_SWEEP") and sweep_file.exists():
        SWEEP = json.loads(sweep_file.read_text())
    else:
        with Pool(WORKERS) as pool:
            SWEEP = pool.map(run_k, list(K_RANGE))
        sweep_file.write_text(json.dumps(SWEEP))
    for r in SWEEP:
        print(f"K={r['k']}: violators={r['violators']} cost={r['cost']:.1f} silhouette={r['silhouette']:.3f} start={r['start']} sizes={r['sizes']}", flush=True)
    if os.environ.get("SWEEP_ONLY"):
        sys.exit(0)

    # ── Stability of every K (quick ensemble) ────────────────────────────────
    stab_file = Path(__file__).with_name(".stability.json")
    if os.environ.get("REUSE_SWEEP") and stab_file.exists():
        STAB = {int(k): v for k, v in json.loads(stab_file.read_text()).items()}
    else:
        jobs = [job for r in SWEEP for job in perturbation_jobs(r["k"], STAB_RUNS_PER_K)]
        with Pool(WORKERS) as pool:
            quick = pool.map(run_perturbation, jobs)
        STAB = {}
        for r in SWEEP:
            base = np.array(r["labels"])
            J = np.array([best_match_jaccard(base, np.array(q["labels"])) for q in quick if q["K"] == r["k"]]).mean(axis=0)
            STAB[r["k"]] = {"median": float(np.median(J)), "min": float(J.min()), "perPersona": J.round(3).tolist()}
        stab_file.write_text(json.dumps(STAB))
    for r in SWEEP:
        r["stabilityMedian"] = round(STAB[r["k"]]["median"], 3)
        r["stabilityMin"] = round(STAB[r["k"]]["min"], 3)
        print(f"K={r['k']}: stability median {r['stabilityMedian']:.2f}, min {r['stabilityMin']:.2f}", flush=True)

    # ── Choose K ─────────────────────────────────────────────────────────────
    # Fixed before looking at the results: the MOST GRANULAR K (owner: "more granular is better",
    # at most 30, at least 10) that (1) has no member outside the tolerance and (2) is reproducible
    # — median persona Jaccard ≥ STABLE_MEDIAN and no persona dissolving (≤ DISSOLVED) under
    # perturbation. If no K qualifies, the most reproducible K among those with the fewest
    # members outside the tolerance.
    fewest = min(r["violators"] for r in SWEEP)
    ok = [r for r in SWEEP if r["violators"] == fewest]
    qualifying = [r for r in ok if r["stabilityMedian"] >= STABLE_MEDIAN and r["stabilityMin"] > DISSOLVED]
    CHOSEN = max(qualifying, key=lambda r: r["k"]) if qualifying else max(ok, key=lambda r: (r["stabilityMedian"], r["k"]))
    K_RULE = "most granular reproducible K" if qualifying else "no K met the reproducibility bar; most reproducible K chosen"
    K = CHOSEN["k"]
    LAB = np.array(CHOSEN["labels"])
    print(f"chosen K={K} ({K_RULE}; violators {CHOSEN['violators']}, silhouette {CHOSEN['silhouette']:.3f})", flush=True)

    INFLUENCE = {d: round(v, 4) for d, v in INFLUENCE_CALIBRATED.items()}
    SEPARATION = domain_separation(LAB)
    print("separation of the chosen personas:", {d: SEPARATION[d] for d in DOMAINS}, flush=True)

    # ── Full stability ensemble for the chosen K ─────────────────────────────
    n_w, n_d = (1, 1) if SMOKE else (12, len(DOMAINS))
    jobs = [("weights", i, K) for i in range(n_w)] + [("drop-domain", i, K) for i in range(n_d)] + \
           [("indicators", i, K) for i in range(max(1, PERTURBATIONS - n_w - n_d))]
    runs_file = Path(__file__).with_name(".runs.json")
    if os.environ.get("REUSE_SWEEP") and runs_file.exists() and json.loads(runs_file.read_text()).get("K") == K:
        RUNS = json.loads(runs_file.read_text())["runs"]
    else:
        with Pool(WORKERS) as pool:
            RUNS = pool.map(run_perturbation, jobs)
        runs_file.write_text(json.dumps({"K": K, "runs": RUNS}))
    JAC = np.array([best_match_jaccard(LAB, np.array(r["labels"])) for r in RUNS])
    ARI = [adjusted_rand_score(LAB, r["labels"]) for r in RUNS]
    co = np.zeros((N, N))
    for r in RUNS:
        l = np.array(r["labels"])
        co += l[:, None] == l[None, :]
    co /= len(RUNS)
    print(f"stability: median persona Jaccard {np.median(JAC.mean(axis=0)):.2f}; median ARI {np.median(ARI):.2f}", flush=True)

    # ── Codes: order personas so that neighbours in the code order are similar ─
    groups = [np.where(LAB == k)[0] for k in range(K)]
    PD = np.array([[D_BASE[np.ix_(a, b)].mean() for b in groups] for a in groups])
    Zp = optimal_leaf_ordering(linkage(squareform(PD, checks=False), "average"), squareform(PD, checks=False))
    order = list(leaves_list(Zp))
    dev_med = [float(np.nanmedian(CM[g, CORE_KEYS.index("development")])) for g in groups]
    if dev_med[order[0]] < dev_med[order[-1]]:
        order = order[::-1]                      # start from the most developed end
    CODES = [chr(ord("A") + i) for i in range(K)] if K <= 26 else [f"{i + 1:02d}" for i in range(K)]
    CODE_OF = {k: CODES[order.index(k)] for k in range(K)}

    # ── Assignments ──────────────────────────────────────────────────────────
    mean_to = np.array([[D_BASE[i, [j for j in g if j != i]].mean() if len([j for j in g if j != i]) else np.inf for g in groups] for i in range(N)])
    assignments = {}
    for c in U:
        if STATUS[c] == "unclassified":
            assignments[c] = {"status": "unclassified", "observedShare": round(float(obs_share[c]), 3)}
            continue
        i = IDX[c]
        k = int(LAB[i])
        others = [(mean_to[i, q], q) for q in range(K) if q != k]
        d2, q2 = min(others)
        g = list(groups[k])
        out = outside(CM, g)[g.index(i)]
        assignments[c] = {
            "status": str(STATUS[c]), "persona": CODE_OF[k], "secondPersona": CODE_OF[q2],
            "confidence": round(max(0.0, 1 - mean_to[i, k] / d2), 3),
            "stability": round(float(np.mean([co[i, j] for j in g if j != i])), 3),
            "exceptions": [CORE_KEYS[t] for t in np.where(out)[0]],
            "observedShare": round(float(obs_share[c]), 3),
            "surveyed": bool(pd.notna(CORE_DF.loc[c, "values"])),
            "core": {kk: (None if pd.isna(CORE_DF.loc[c, kk]) else round(float(CORE_DF.loc[c, kk]), 6)) for kk in CORE_KEYS},
        }

    # ── Profiles ─────────────────────────────────────────────────────────────
    personas, profiles = [], {}
    for k in order:
        code = CODE_OF[k]
        g = list(groups[k])
        mem = [PLACED[i] for i in g]
        med_i = g[int(np.argmin(D_BASE[np.ix_(g, g)].sum(axis=1)))]
        prof = profile_persona(mem, len(mem))
        profiles[code] = prof
        centrality = D_BASE[np.ix_(g, g)].sum(axis=1)
        typical = [PLACED[g[j]] for j in np.argsort(centrality)[:3]]
        personas.append({
            "code": code, "size": len(mem), "members": sorted(mem, key=lambda c: NAMES[c]), "medoid": PLACED[med_i],
            "typical": typical,
            "coreMedians": {kk: round(float(np.nanmedian(CM[g, t])), 3) for t, kk in enumerate(CORE_KEYS)},
            "stability": round(float(JAC[:, k].mean()), 3),
            "surveyed": int(sum(assignments[c].get("surveyed", False) for c in mem)),
            "claimable": sorted(v for v, r in prof.items() if r.get("claimable")),
        })
    WORLD = {}
    for var, meta in VARS.items():
        if meta.get("kind") == "numeric":
            x = num(var)[PLACED]
            if x.notna().sum() >= 20 and x.std() > 0:
                xs, scale = analysis_scale(num(var))
                WORLD[var] = {"median": float(x.median()), "sd": float(xs[PLACED].std()), "scale": scale, "n": int(x.notna().sum())}

    # ── Homogeneity: the owner's complaint, measured, v2 against v1 ──────────
    def homogeneity(partition: dict[str, list[str]]) -> float:
        rates = []
        for mem in partition.values():
            p = profile_persona(mem, len(mem))
            num_rows = [r for v, r in p.items() if not v.startswith("core:") and "homogeneous" in r and r["n"] >= 2]
            rates.append(np.mean([r["homogeneous"] for r in num_rows]))
        return float(np.mean(rates))
    V1 = json.loads((ROOT / "scripts/data/country-personas-model.json").read_text())
    v1_types: dict[str, list[str]] = {}
    for c, a in V1["assignments"].items():
        if a.get("type"):
            v1_types.setdefault(a["type"], []).append(c)
    V2_PART = {p["code"]: p["members"] for p in personas}
    HOMO = {"v1Types": homogeneity(v1_types), "v2": homogeneity(V2_PART)}
    print(f"share of measured variables on which a persona's members ALL sit within 1 SD of its median: v1 types {HOMO['v1Types']:.0%}, v2 {HOMO['v2']:.0%}", flush=True)

    # ── Family map ───────────────────────────────────────────────────────────
    XY, EXPL = classical_mds(D_BASE)
    corr = {kk: [float(pd.Series(XY[:, a]).corr(pd.Series(CM[:, t]))) for a in range(2)] for t, kk in enumerate(CORE_KEYS)}
    if corr["development"][0] < 0:
        XY[:, 0] *= -1
        corr = {kk: [-v[0], v[1]] for kk, v in corr.items()}
    ax2 = max(corr, key=lambda kk: abs(corr[kk][1]))
    if corr[ax2][1] < 0:
        XY[:, 1] *= -1
        corr = {kk: [v[0], -v[1]] for kk, v in corr.items()}
    family_map = {
        "method": "classical multidimensional scaling of the persona distance",
        "explainedVariance": [round(float(v), 3) for v in EXPL],
        "axisCorrelations": {kk: [round(v[0], 3), round(v[1], 3)] for kk, v in corr.items()},
        "countries": {PLACED[i]: [round(float(XY[i, 0]), 4), round(float(XY[i, 1]), 4)] for i in range(N)},
        "personas": {CODE_OF[k]: [round(float(np.median(XY[groups[k], 0])), 4), round(float(np.median(XY[groups[k], 1])), 4)] for k in range(K)},
    }

    # ── Validation benchmarks ────────────────────────────────────────────────
    def cat(var):
        return pd.Series({c: (S["values"][c].get(var) or {}).get("v") for c in PLACED})
    lab_codes = pd.Series({c: assignments[c]["persona"] for c in PLACED})
    bench = {}
    for var in ("geo_continent", "geo_subregion", "wb_income_group", "wb_region"):
        x = cat(var).dropna()
        bench[var] = round(float(adjusted_rand_score(x.values, lab_codes[x.index].values)), 3)
    v1_groups = pd.Series({c: a.get("group") for c, a in V1["assignments"].items()}).dropna()
    common = [c for c in PLACED if c in v1_groups.index]
    bench["v1Groups"] = round(float(adjusted_rand_score(v1_groups[common].values, lab_codes[common].values)), 3)

    # ── Write ────────────────────────────────────────────────────────────────
    model = {
        "status": "DRAFT — not reviewed; nothing in src/ reads this file",
        "version": 2,
        "builtBy": "scripts/country-personas/build.py",
        "snapshot": {"file": "scripts/data/country-persona-inputs.json", "sha256": hashlib.sha256(snap_bytes).hexdigest(), "generated": S["generated"]},
        "seed": SEED,
        "rules": {"tau": TAU, "minSize": MIN_SIZE, "kRange": [min(K_RANGE), max(K_RANGE)], "lambda": LAMBDA,
                  "claimMinZ": CLAIM_MIN_Z, "unclassifiedShare": UNCLASSIFIED_SHARE, "provisionalShare": PROVISIONAL_SHARE,
                  "distance": "four pillars (facts, index scores, attitudes, heritage); domain weights start equal by pillar and are calibrated so no domain exceeds 1/15 of the leave-one-out influence; per domain the mean squared difference over the indicators both countries have, divided by that domain's mean over all pairs; no imputation",
                  "boundary": f"every member within {TAU} world SD of its persona's median on each core dimension (members observed on that dimension); personas of at least {MIN_SIZE}",
                  "claims": f"a variable may be claimed only if every observed member lies within {TAU} world SD of the persona median (on the variable's analysis scale) and the median is at least {CLAIM_MIN_Z} SD from the world median"},
        "weighting": {"start": "equal pillars, equal domains within a pillar", "influenceCap": INFLUENCE_CAP, "calibrationIterations": CAL_ITERS,
                      "influenceShareNominal": {d: round(v, 4) for d, v in INFLUENCE_NOMINAL.items()},
                      "influenceShareCalibrated": {d: round(v, 4) for d, v in INFLUENCE_CALIBRATED.items()}},
        "pillars": [{"key": p, "label": PILLARS[p]["label"], "nominalWeight": 1.0 / len(PILLARS), "weight": round(sum(W[d] for d in PILLARS[p]["domains"]), 6),
                     "domains": [{"key": d, "label": PILLARS[p]["domains"][d][0], "nominalWeight": W_DOMAIN[d], "weight": W[d], "meanPairSquaredDistance": DOMAIN_SCALE[d],
                                  "indicators": INDICATOR_META[d]} for d in PILLARS[p]["domains"]]} for p in PILLARS],
        "core": CORE_META,
        "sweep": [{k: r[k] for k in ("k", "violators", "cost", "silhouette", "stabilityMedian", "stabilityMin", "sizes", "start")} for r in SWEEP],
        "kRule": K_RULE,
        "chosenK": K,
        "personas": personas,
        "assignments": assignments,
        "familyMap": family_map,
        "validation": {"stability": {"runs": len(RUNS), "kinds": dict(Counter(r["kind"] for r in RUNS)),
                                     "medianPersonaJaccard": round(float(np.median(JAC.mean(axis=0))), 3),
                                     "personaJaccard": {CODE_OF[k]: round(float(JAC[:, k].mean()), 3) for k in range(K)},
                                     "medianARI": round(float(np.median(ARI)), 3)},
                       "homogeneity": HOMO, "benchmarksARI": bench,
                       "domainInfluence": INFLUENCE, "domainSeparation": SEPARATION,
                       "silhouette": round(CHOSEN["silhouette"], 4), "violators": CHOSEN["violators"]},
    }
    OUT_MODEL.write_text(json.dumps(model, indent=1, ensure_ascii=False) + "\n")
    OUT_PROFILE.write_text(json.dumps({"world": WORLD, "personas": profiles}, indent=1, ensure_ascii=False) + "\n")
    print(f"wrote {OUT_MODEL.relative_to(ROOT)} and {OUT_PROFILE.relative_to(ROOT)}", flush=True)

    # ── Report ───────────────────────────────────────────────────────────────
    def fmt_members(p):
        return ", ".join(NAMES[c] for c in p["members"])
    L = ["# Country Personas v2 — research build report", "",
         f"_Generated by `scripts/country-personas/build.py` from snapshot `{S['generated']}` (sha256 `{model['snapshot']['sha256'][:12]}…`). "
         "DRAFT: nothing in `src/` reads this build until the owner approves the personas._", "",
         "## Brief (owner, 2026-09-24)", "",
         "- One level of 20–30 personas.",
         "- Greater use of the indices and World Values Survey attitudes; culture and heritage blended in.",
         f"- Strict boundaries: every member within {TAU} world standard deviation of its persona's median.", "",
         "## Data", "",
         f"- {N0} states; {N} placed, {int((STATUS == 'provisional').sum())} of them provisional (under {PROVISIONAL_SHARE:.0%} of the similarity weight observed); "
         f"unclassified: {', '.join(NAMES[c] for c in U if STATUS[c] == 'unclassified') or 'none'}.",
         f"- Surveyed by the World Values Survey (attitudes observed): {int(CORE_DF.loc[PLACED, 'values'].notna().sum())} of {N}. Attitudes are never estimated for the others.", "",
         "## Similarity: four pillars", ""]
    for p in model["pillars"]:
        L.append(f"- **{p['label']}** ({p['weight']:.0%} after calibration): " + "; ".join(f"{d['label']} ({len(d['indicators'])} indicator{'s' if len(d['indicators']) > 1 else ''}, {d['weight']:.1%})" for d in p["domains"]))
    L += ["", "## Core dimensions (hard boundary: every member within 1 world SD of its persona median)", "",
          "Religion is not a core dimension (owner, 2026-09-24). It is one of 15 similarity domains.", ""]
    for c in CORE_META:
        L.append(f"- {c['label']} — {c['coverage']} states observed")
    L += ["", "## Number of personas", "", "| K | members outside tolerance | stability (median / min persona Jaccard) | silhouette | within-persona distance | sizes |", "|---:|---:|---:|---:|---:|---|"]
    for r in SWEEP:
        L.append(f"| {r['k']}{' **(chosen)**' if r['k'] == K else ''} | {r['violators']} | {r['stabilityMedian']:.2f} / {r['stabilityMin']:.2f} | {r['silhouette']:.3f} | {r['cost']:.1f} | {', '.join(map(str, r['sizes']))} |")
    L += ["", f"Rule (fixed in advance): the most granular K with no member outside the tolerance whose personas are reproducible — median persona Jaccard ≥ {STABLE_MEDIAN} and none ≤ {DISSOLVED}. Outcome: {K_RULE}.", "",
          "## Influence of each domain", "",
          f"Weights start equal by pillar and are calibrated ({CAL_ITERS} iterations) so that no domain accounts for more than 1/{len(DOMAINS)} "
          f"({INFLUENCE_CAP:.1%}) of the total leave-one-out influence on the similarity.", "",
          "| domain | pillar | nominal weight | calibrated weight | influence share before | influence share after | separation of the personas |", "|---|---|---:|---:|---:|---:|---:|"]
    for d in DOMAINS:
        L.append(f"| {PILLARS[PILLAR_OF[d]]['domains'][d][0]} | {PILLARS[PILLAR_OF[d]]['label']} | {W_DOMAIN[d]:.1%} | {W[d]:.1%} | {INFLUENCE_NOMINAL[d]:.1%} | {INFLUENCE[d]:.1%} | {SEPARATION[d]:.3f} |")
    L += ["",
          "## Stability", "",
          f"{len(RUNS)} rebuilds under perturbation ({', '.join(f'{v} × {k}' for k, v in Counter(r['kind'] for r in RUNS).items())}): "
          f"median persona Jaccard **{np.median(JAC.mean(axis=0)):.2f}**, median ARI **{np.median(ARI):.2f}**.", "",
          "## Homogeneity — the owner's complaint, measured", "",
          f"Share of measured variables on which **every** member of a persona sits within 1 world SD of the persona's median: "
          f"v1 types **{HOMO['v1Types']:.0%}** → v2 personas **{HOMO['v2']:.0%}**.", "",
          "## Benchmarks (ARI; 0 = unrelated, 1 = identical)", ""]
    for k2, v in bench.items():
        L.append(f"- {k2}: {v}")
    L += ["", "## Personas", ""]
    for p in personas:
        L.append(f"### {p['code']} — {p['size']} countries (stability {p['stability']:.2f}; surveyed {p['surveyed']})")
        L.append("")
        L.append(fmt_members(p))
        L.append("")
        prof = profiles[p["code"]]
        feats = sorted(((v, r) for v, r in prof.items() if r.get("claimable") and "z" in r), key=lambda t: -abs(t[1]["z"]))[:8]
        for v, r in feats:
            L.append(f"- {VARS.get(v, {}).get('label', v)}: median {r['median']:.3g} (range {r['min']:.3g}–{r['max']:.3g}; {r['z']:+.2f} SD)")
        ex = [c for c in p["members"] if assignments[c]["exceptions"]]
        if ex:
            L.append(f"- Exceptions: " + "; ".join(f"{NAMES[c]} ({', '.join(assignments[c]['exceptions'])})" for c in ex))
        L.append("")
    OUT_REPORT.parent.mkdir(parents=True, exist_ok=True)
    OUT_REPORT.write_text("\n".join(L) + "\n")
    print(f"wrote {OUT_REPORT.relative_to(ROOT)}", flush=True)
