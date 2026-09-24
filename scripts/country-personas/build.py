#!/usr/bin/env python3
"""Country Personas — research build (docs/COUNTRY_PERSONAS_PLAYBOOK.md, steps 3–14).

Reads ONLY scripts/data/country-persona-inputs.json (the dated, sourced snapshot written by
scripts/build-country-persona-inputs.mjs) and writes:

  scripts/data/country-personas-model.draft.json   the draft model: transforms, standardisation
                                                    constants, domain weights, centroids,
                                                    hierarchy and every country's assignment
  scripts/data/country-personas-grand-index.json    persona-vs-world profile of every variable
  docs/country-personas/BUILD_REPORT.md             diagnostics and acceptance criteria

This is the heavy, occasional build. Nothing in src/ reads its output until the owner has
reviewed the personas (playbook step 12) and the model is frozen.

    python3 -m venv /tmp/cp && /tmp/cp/bin/pip install -r scripts/country-personas/requirements.txt
    /tmp/cp/bin/python scripts/country-personas/build.py

Imputed values exist only inside this build, to compute distances. They are never written
to any output as data.
"""
from __future__ import annotations

import hashlib
import json
import math
import sys
import warnings
from collections import Counter
from pathlib import Path

import numpy as np
import pandas as pd
from scipy.cluster.hierarchy import fcluster, linkage
from scipy.spatial.distance import squareform
from scipy.stats import skew
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.experimental import enable_iterative_imputer  # noqa: F401
from sklearn.impute import IterativeImputer
from sklearn.metrics import adjusted_rand_score, calinski_harabasz_score, silhouette_score
from sklearn.preprocessing import PowerTransformer

warnings.filterwarnings("ignore")

ROOT = Path(__file__).resolve().parents[2]
SNAPSHOT = ROOT / "scripts/data/country-persona-inputs.json"
OUT_MODEL = ROOT / "scripts/data/country-personas-model.draft.json"
OUT_GRAND_INDEX = ROOT / "scripts/data/country-personas-grand-index.json"
OUT_REPORT = ROOT / "docs/country-personas/BUILD_REPORT.md"

SEED = 20260924
M_IMPUTATIONS = 20          # playbook step 6
CONSENSUS_SUBSAMPLES = 25   # per imputation (step 9)
BOOTSTRAPS = 100            # per candidate k and for final stability
BUILD_SHARE = 0.75          # ≥ 75% of domain weight observed → part of the build
UNCLASSIFIED_SHARE = 0.50   # < 50% → "Unclassified: not enough comparable data"
MIN_TYPE = 4                # playbook E2
GROUP_K_RANGE = range(4, 9)
SPLIT_K_RANGE = (2, 3, 4)
GROUP_SIZE = (10, 45)
GROUP_JACCARD = 0.75        # every group must be at least this stable (Hennig 2007: "stable")
TYPE_JACCARD = 0.60         # a group is split into types only when every type reaches this

# ── Domains (playbook step 5, E1) ────────────────────────────────────────────
# Indicator = (snapshot variable, transform, sign). Sign aligns every indicator so that
# higher = more of the named concept. `fallback` fills a country the primary misses.
#
# Four core domains. The first build used nine (prosperity, freedom, integrity, age,
# urban/services, resources, migrants, scale, women in work): at 195 countries that gave
# about seven near-independent dimensions and NO stable partition (group bootstrap Jaccard
# 0.54-0.74, types 31% >= 0.60, weight-sensitivity ARI 0.46). Merging the domains that
# measure one latent axis (prosperity + urban/service economy = development; freedom +
# integrity = governance) and keeping the two genuinely independent axes (age structure
# relative to development; scale) gives five groups that all pass Jaccard >= 0.75. The
# dropped domains stay in the snapshot as descriptors and feature in the Grand Index.
# Evidence and alternatives tried: docs/COUNTRY_PERSONAS_LEDGER.md.
DOMAINS = [
    {"key": "development", "label": "Development", "weight": 1.0, "indicators": [
        {"var": "wb_gdppc_ppp", "transform": "log", "sign": 1, "fallback": "wb_gdppc_usd"},
        {"var": "idx_hdi", "transform": "none", "sign": 1},
        {"var": "wb_internet", "transform": "none", "sign": 1},
        {"var": "wb_urban", "transform": "none", "sign": 1},
        {"var": "wb_agriculture", "transform": "asinh", "sign": -1},
        {"var": "wb_services", "transform": "none", "sign": 1},
    ]},
    {"key": "governance", "label": "Governance", "weight": 1.0, "indicators": [
        {"var": "idx_freedomHouse", "transform": "none", "sign": 1},
        {"var": "idx_vDem", "transform": "none", "sign": 1},
        {"var": "idx_economist", "transform": "none", "sign": 1},
        {"var": "idx_rsfPress", "transform": "none", "sign": 1},
        {"var": "idx_cpi", "transform": "none", "sign": 1},
        {"var": "idx_wjpRuleOfLaw", "transform": "none", "sign": 1},
    ]},
    # Age structure correlates 0.87 with development (above the 0.81 duplication gate), so
    # the domain is its RESIDUAL on development: older or younger than countries at the same
    # level of development. That keeps the informative exceptions without counting wealth twice.
    {"key": "age_structure", "label": "Age structure relative to development", "weight": 1.0, "residualOn": "development", "indicators": [
        {"var": "wb_age_65_up", "transform": "none", "sign": 1},
        {"var": "wb_age_0_14", "transform": "none", "sign": -1},
        {"var": "wb_fertility", "transform": "log", "sign": -1},
        {"var": "wb_life_expectancy", "transform": "none", "sign": 1},
        {"var": "wb_pop_growth", "transform": "none", "sign": -1},
    ]},
    {"key": "scale", "label": "Scale and global reach", "weight": 1.0, "indicators": [
        {"var": "wb_population", "transform": "log", "sign": 1},
        {"var": "idx_softPower", "transform": "log", "sign": 1},
    ]},
]

THEMES = {  # for the "key features from ≥ 3 themes" rule (playbook step 11)
    "economy": ["wb_gdppc", "wb_agriculture", "wb_industry", "wb_services", "wb_trade", "wb_resource_rents",
                "wb_remittances", "wb_tourist_arrivals", "idx_imdCompetitiveness", "wb_gini"],
    "people": ["wb_population", "wb_urban", "wb_largest_city", "wb_density", "wb_land_area", "wb_age", "wb_fertility",
               "wb_life_expectancy", "wb_pop_growth", "wb_migrants", "wb_female_lfp", "wb_health_exp", "wb_tertiary"],
    "infrastructure": ["wb_internet", "wb_electricity", "wb_co2_pc"],
    "governance": ["idx_freedomHouse", "idx_vDem", "idx_economist", "idx_cpi", "idx_rsfPress", "idx_wjpRuleOfLaw",
                   "idx_perception", "pol_"],
    "wellbeing": ["idx_hdi", "idx_happiness", "idx_genderGap"],
    "security": ["idx_gpi", "idx_gti", "idx_etr", "wb_homicide", "wb_military"],
    "global ties": ["idx_softPower", "idx_gdi", "count_", "member_"],
    "sport": ["sport_"],
    "values": ["wvs_"],
    "history": ["hist_"],
}


def theme_of(var: str) -> str:
    for theme, prefixes in THEMES.items():
        if any(var.startswith(p) for p in prefixes):
            return theme
    return "other"


# ── Load ─────────────────────────────────────────────────────────────────────
snap_bytes = SNAPSHOT.read_bytes()
S = json.loads(snap_bytes)
U: list[str] = S["universe"]
NAMES: dict[str, str] = S["names"]
VARS: dict = S["variables"]


def col(var: str) -> pd.Series:
    return pd.Series({c: (S["values"][c].get(var) or {}).get("v", np.nan) for c in U}, dtype=object)


def num(var: str) -> pd.Series:
    return pd.to_numeric(col(var), errors="coerce").astype(float)


def transform(x: pd.Series, how: str) -> pd.Series:
    if how == "log":
        return np.log(x.where(x > 0))
    if how == "asinh":
        return np.arcsinh(x)
    return x


# ── Step 4: transform, align, robust-standardise ─────────────────────────────
def standardise(var: str, how: str, sign: int) -> tuple[pd.Series, dict]:
    x = transform(num(var), how)
    meta: dict = {"var": var, "transform": how, "sign": sign}
    obs = x.dropna()
    sk = float(skew(obs))
    if abs(sk) > 1:  # ONS rule: |skewness| ≤ 1 after transformation
        pt = PowerTransformer(method="yeo-johnson", standardize=False).fit(obs.values.reshape(-1, 1))
        lam = float(pt.lambdas_[0])
        x = pd.Series(pt.transform(x.values.reshape(-1, 1)).ravel(), index=x.index).where(x.notna())
        meta["yeoJohnsonLambda"] = lam
        meta["skewBefore"] = round(sk, 2)
        sk = float(skew(x.dropna()))
    med = float(x.median())
    idr = float(x.quantile(0.9) - x.quantile(0.1))
    meta.update({"median": med, "interDecileRange": idr, "skew": round(sk, 2), "coverage": int(x.notna().sum())})
    return sign * (x - med) / idr, meta


def domain_scores(domains: list[dict], drop: str | None = None) -> tuple[pd.DataFrame, list[dict]]:
    """Mean of available standardised indicators per domain; residualise where declared;
    rescale every domain to mean 0, SD 1. `drop` removes one indicator (leave-one-out)."""
    raw, metas = {}, []
    for d in domains:
        zs, ims = [], []
        for ind in d["indicators"]:
            if ind["var"] == drop:
                continue
            z, m = standardise(ind["var"], ind["transform"], ind["sign"])
            if ind.get("fallback") and ind["fallback"] != drop:
                zf, mf = standardise(ind["fallback"], ind["transform"], ind["sign"])
                filled = z.isna() & zf.notna()
                z = z.fillna(zf)
                m["fallback"] = {**mf, "usedFor": sorted(z.index[filled])}
            zs.append(z)
            ims.append(m)
        if not zs:
            continue
        raw[d["key"]] = pd.concat(zs, axis=1).mean(axis=1, skipna=True)
        metas.append({"key": d["key"], "label": d["label"], "weight": d["weight"], "indicators": ims,
                      **({"residualOn": d["residualOn"]} if d.get("residualOn") else {})})
    R = pd.DataFrame(raw)
    for m in metas:
        if m.get("residualOn") and m["residualOn"] in R:
            y, x = R[m["key"]], R[m["residualOn"]]
            ok = y.notna() & x.notna()
            b, a = np.polyfit(x[ok], y[ok], 1)
            R[m["key"]] = (y - (a + b * x)).where(ok)
            m["residual"] = {"intercept": float(a), "slope": float(b), "r": float(np.corrcoef(x[ok], y[ok])[0, 1])}
    for m in metas:
        mu, sd = float(R[m["key"]].mean()), float(R[m["key"]].std())
        R[m["key"]] = (R[m["key"]] - mu) / sd
        m["mean"], m["sd"] = mu, sd
    return R, metas


SCORES, DOMAIN_META = domain_scores(DOMAINS)
DKEYS = list(SCORES.columns)
WEIGHTS = np.array([d["weight"] for d in DOMAINS if d["key"] in DKEYS])


def unidimensionality() -> dict:
    out = {}
    for d in DOMAINS:
        if len(d["indicators"]) < 2:
            continue
        X = pd.concat([ind["sign"] * transform(num(ind["var"]), ind["transform"]) for ind in d["indicators"]], axis=1)
        R = X.corr(min_periods=40).values
        ev = np.sort(np.linalg.eigvalsh(R))[::-1]
        out[d["key"]] = {"firstComponentShare": float(ev[0] / len(d["indicators"])), "minCorrelation": float(np.nanmin(R[np.triu_indices(len(R), 1)]))}
    return out


UNIDIM = unidimensionality()
CROSS = SCORES.corr(min_periods=40)

# ── Step 6: build set, provisional, unclassified ─────────────────────────────
observed = SCORES.notna()
obs_share = (observed * WEIGHTS).sum(axis=1) / WEIGHTS.sum()
STATUS = pd.Series("built", index=U)
STATUS[obs_share < BUILD_SHARE] = "provisional"
STATUS[obs_share < UNCLASSIFIED_SHARE] = "unclassified"
BUILD = [c for c in U if STATUS[c] == "built"]
PROVISIONAL = [c for c in U if STATUS[c] == "provisional"]
UNCLASSIFIED = [c for c in U if STATUS[c] == "unclassified"]

Sb = SCORES.loc[BUILD].values
imputations = [
    IterativeImputer(sample_posterior=True, max_iter=30, random_state=SEED + m).fit_transform(Sb)
    for m in range(M_IMPUTATIONS)
]
Xbar = np.mean(imputations, axis=0)
Xw = Xbar * WEIGHTS
n = len(BUILD)
rng = np.random.default_rng(SEED)


# ── Clustering primitives ────────────────────────────────────────────────────
def kmeans(X, k, n_init=50, seed=SEED, init="k-means++"):
    return KMeans(n_clusters=k, n_init=n_init if isinstance(init, str) else 1, init=init, random_state=seed).fit(X)


def centroids_of(X, labels):
    ks = sorted(set(labels))
    return np.array([X[labels == k].mean(axis=0) for k in ks]), ks


def enforce_min_size(X, labels, min_size=MIN_TYPE):
    """Merge any type below min_size into its members' nearest other type, then re-run Lloyd
    from the surviving centroids until assignments are stable (FIZZ: inspect, adjust, re-iterate)."""
    labels = np.asarray(labels).copy()
    for _ in range(50):
        sizes = Counter(labels)
        small = [k for k, s in sizes.items() if s < min_size]
        if small:
            C, ks = centroids_of(X, labels)
            keep = [i for i, k in enumerate(ks) if k not in small]
            for i in np.where(np.isin(labels, small))[0]:
                d = ((C[keep] - X[i]) ** 2).sum(axis=1)
                labels[i] = ks[keep[int(np.argmin(d))]]
        C, ks = centroids_of(X, labels)
        polished = kmeans(X, len(ks), init=C).labels_
        if not small and adjusted_rand_score(polished, labels) == 1.0:
            return polished
        labels = polished
    return labels


def jaccard_vs(labels, idx, boot_labels):
    drawn = set(idx.tolist())
    boot_sets = [set(idx[boot_labels == k].tolist()) for k in set(boot_labels)]
    out = []
    for k in sorted(set(labels)):
        cl = set(np.where(labels == k)[0].tolist()) & drawn
        out.append(max((len(cl & b) / len(cl | b)) for b in boot_sets) if cl else np.nan)
    return out


def bootstrap_jaccard(X, labels, fit, B=BOOTSTRAPS, seed=SEED):
    r = np.random.default_rng(seed)
    J = []
    for b in range(B):
        idx = r.choice(len(X), len(X), replace=True)
        J.append(jaccard_vs(labels, idx, fit(X[idx], b)))
    return np.nanmean(np.array(J, dtype=float), axis=0)


# ── Step 8: choose the number of groups (top-down, OAC-style) ────────────────
group_candidates = []
for k in GROUP_K_RANGE:
    lab = kmeans(Xw, k, n_init=500).labels_
    sizes = np.bincount(lab)
    J = bootstrap_jaccard(Xw, lab, lambda Xb, b, k=k: kmeans(Xb, k, n_init=10, seed=b).labels_)
    group_candidates.append({
        "k": k, "sizes": sorted(sizes.tolist(), reverse=True),
        "sizesOk": bool(sizes.min() >= GROUP_SIZE[0] and sizes.max() <= GROUP_SIZE[1]),
        "silhouette": float(silhouette_score(Xw, lab)), "ch": float(calinski_harabasz_score(Xw, lab)),
        "jaccard": sorted([round(float(x), 2) for x in J], reverse=True), "jaccardMin": float(np.min(J)),
    })
passing = [g for g in group_candidates if g["sizesOk"] and g["jaccardMin"] >= GROUP_JACCARD]
chosen_group = max(passing, key=lambda g: g["k"]) if passing else max(group_candidates, key=lambda g: (g["jaccardMin"], g["silhouette"]))
K_G = chosen_group["k"]

# ── Step 9: consensus across imputations × subsamples, then polish ───────────
co = np.zeros((n, n))
cs = np.zeros((n, n))
for m, Xm in enumerate(imputations):
    Xmw = Xm * WEIGHTS
    r = np.random.default_rng(SEED + 1000 + m)
    for s in range(CONSENSUS_SUBSAMPLES):
        idx = np.sort(r.choice(n, int(0.8 * n), replace=False))
        lab = kmeans(Xmw[idx], K_G, n_init=10, seed=m * 100 + s).labels_
        co[np.ix_(idx, idx)] += lab[:, None] == lab[None, :]
        cs[np.ix_(idx, idx)] += 1
CONSENSUS = np.where(cs > 0, co / np.maximum(cs, 1), 0.0)
np.fill_diagonal(CONSENSUS, 1.0)
consensus_labels = fcluster(linkage(squareform(1 - CONSENSUS, checks=False), "average"), K_G, "maxclust") - 1
reference_kmeans = kmeans(Xw, K_G, n_init=1000).labels_
GROUPS = enforce_min_size(Xw, consensus_labels, min_size=GROUP_SIZE[0])
C_G, ks = centroids_of(Xw, GROUPS)
GROUPS = np.array([ks.index(v) for v in GROUPS])
K_G = len(C_G)
group_jaccard = bootstrap_jaccard(Xw, GROUPS, lambda Xb, b: kmeans(Xb, K_G, n_init=10, seed=b).labels_, B=200)

# ── Types: split a group only where the split is itself stable ───────────────
split_candidates = {}
SPLIT_K = {}
TYPES = np.zeros(n, dtype=int)
G_OF_T, C_T, type_jaccard_list = [], [], []
for g in range(K_G):
    idx = np.where(GROUPS == g)[0]
    Xg = Xw[idx]
    cands, best = [], None
    for k in SPLIT_K_RANGE:
        if len(idx) < k * MIN_TYPE:
            break
        lab = kmeans(Xg, k, n_init=300).labels_
        if np.bincount(lab).min() < MIN_TYPE:
            cands.append({"k": k, "minSize": int(np.bincount(lab).min()), "jaccard": None})
            continue
        J = bootstrap_jaccard(Xg, lab, lambda Xb, b, k=k: kmeans(Xb, k, n_init=10, seed=b).labels_)
        cands.append({"k": k, "minSize": int(np.bincount(lab).min()), "silhouette": float(silhouette_score(Xg, lab)),
                      "jaccard": sorted([round(float(x), 2) for x in J], reverse=True)})
        if J.min() >= TYPE_JACCARD and (best is None or k > best[0]):
            best = (k, lab, J)
    split_candidates[g] = cands
    k, lab, J = best if best else (1, np.zeros(len(idx), dtype=int), np.array([float(group_jaccard[g])]))
    SPLIT_K[g] = k
    for s in range(k):
        TYPES[idx[lab == s]] = len(C_T)
        C_T.append(Xg[lab == s].mean(axis=0))
        G_OF_T.append(g)
        type_jaccard_list.append(float(J[s]))
C_T = np.array(C_T)
G_OF_T = np.array(G_OF_T)
K_T = len(C_T)
TYPE_SIZES = np.bincount(TYPES)
type_jaccard = np.array(type_jaccard_list)


def pipeline(X, seed=SEED, n_init=50):
    """Re-run groups then the same per-group splits on (re-weighted) data X aligned with BUILD.
    New groups are matched to final groups by majority overlap to pick each split's k."""
    g = kmeans(X, K_G, n_init=n_init, seed=seed).labels_
    t = np.zeros(len(X), dtype=int)
    nxt = 0
    for ng in range(K_G):
        idx = np.where(g == ng)[0]
        if len(idx) == 0:
            continue
        k = SPLIT_K[Counter(GROUPS[idx]).most_common(1)[0][0]]
        sub = kmeans(X[idx], k, n_init=n_init, seed=seed).labels_ if k > 1 and len(idx) >= k else np.zeros(len(idx), dtype=int)
        t[idx] = nxt + sub
        nxt += k
    return t, g


# ── Codes: order groups (and types within groups) along the first family-tree axis ──
pca = PCA(n_components=2).fit(Xw)
flip = 1 if pca.components_[0][DKEYS.index("development")] >= 0 else -1  # development points right
axis = pca.transform(C_G)[:, 0] * flip
group_order = list(np.argsort(-axis))
GROUP_LETTER = {g: "ABCDEFGHIJ"[i] for i, g in enumerate(group_order)}
type_axis = pca.transform(C_T)[:, 0] * flip
type_order = sorted(range(K_T), key=lambda t: (group_order.index(G_OF_T[t]), -type_axis[t]))
TYPE_CODE = {t: f"{GROUP_LETTER[G_OF_T[t]]}{i + 1:02d}" for i, t in enumerate(type_order)}

# ── Step 10: confidence and second choice (hierarchical, like future scoring) ─
def nearest_two(dists):
    order = np.argsort(dists)
    return int(order[0]), (int(order[1]) if len(order) > 1 else None)


def classify(xw, weights_ok=None):
    """Nearest group centroid, then nearest type centroid inside that group. `weights_ok`
    masks unobserved domains (partial distance, rescaled by observed weight)."""
    ok = np.ones(len(xw), dtype=bool) if weights_ok is None else weights_ok
    scale = (WEIGHTS ** 2).sum() / (WEIGHTS[ok] ** 2).sum()
    dg = np.sqrt(((C_G[:, ok] - xw[ok]) ** 2).sum(axis=1) * scale)
    g, g2 = nearest_two(dg)
    members = [t for t in range(K_T) if G_OF_T[t] == g]
    dt = np.sqrt(((C_T[members][:, ok] - xw[ok]) ** 2).sum(axis=1) * scale)
    ti, t2i = nearest_two(dt)
    out = {"group": GROUP_LETTER[g], "confidence": round(float(1 - dg[g] / dg[g2]), 3), "secondGroup": GROUP_LETTER[g2],
           "type": TYPE_CODE[members[ti]]}
    if t2i is not None:
        out["typeConfidence"] = round(float(1 - dt[ti] / dt[t2i]), 3)
        out["secondType"] = TYPE_CODE[members[t2i]]
    return out, g, members[ti]


assign: dict[str, dict] = {}
mismatch = 0
for i, c in enumerate(BUILD):
    out, g, t = classify(Xw[i])
    mismatch += (g != GROUPS[i]) or (t != TYPES[i])
    mates = np.where(GROUPS == GROUPS[i])[0]
    assign[c] = {"status": "built", **out, "consensus": round(float(CONSENSUS[i, mates].mean()), 3),
                 "observedShare": round(float(obs_share[c]), 3),
                 "imputedDomains": [DKEYS[j] for j in range(len(DKEYS)) if not observed.loc[c].iloc[j]]}
for c in PROVISIONAL:
    z = SCORES.loc[c].values
    ok = ~np.isnan(z)
    out, _, _ = classify(np.where(ok, z, 0) * WEIGHTS, ok)
    assign[c] = {"status": "provisional", **out, "observedShare": round(float(obs_share[c]), 3),
                 "imputedDomains": [DKEYS[j] for j in range(len(DKEYS)) if not ok[j]]}
for c in UNCLASSIFIED:
    assign[c] = {"status": "unclassified", "observedShare": round(float(obs_share[c]), 3)}

# ── Stability, imputation agreement, sensitivity, leave-one-variable-out ─────
imp_agree = []
for Xm in imputations:
    Xmw = Xm * WEIGHTS
    imp_agree.append([classify(Xmw[i])[2] for i in range(n)])
imp_agree = np.array(imp_agree)
modal = np.array([Counter(imp_agree[:, i]).most_common(1)[0][0] for i in range(n)])
imputation_agreement = float(np.mean(modal == TYPES))

baseline_t, baseline_g = pipeline(Xw, seed=SEED, n_init=200)
method_floor = {"types": float(adjusted_rand_score(TYPES, baseline_t)), "groups": float(adjusted_rand_score(GROUPS, baseline_g))}


def rebuild_ari(X_, seed):
    t, g = pipeline(X_, seed=seed, n_init=50)
    return adjusted_rand_score(TYPES, t), adjusted_rand_score(GROUPS, g)


one_at_a_time = []
for j, key in enumerate(DKEYS):
    for f in (0.5, 1.5):
        w = WEIGHTS.copy()
        w[j] *= f
        at, ag = rebuild_ari(Xbar * w, SEED + j)
        one_at_a_time.append({"domain": key, "factor": f, "typesARI": round(at, 3), "groupsARI": round(ag, 3)})
dir_r = np.random.default_rng(SEED + 7)
dirichlet, dirichlet_tight = [], []
for b in range(200):
    w = len(WEIGHTS) * dir_r.dirichlet(np.full(len(WEIGHTS), 10.0)) * WEIGHTS   # per-weight CV ≈ 27%
    dirichlet.append(rebuild_ari(Xbar * w, SEED + 500 + b))
    w = len(WEIGHTS) * dir_r.dirichlet(np.full(len(WEIGHTS), 40.0)) * WEIGHTS   # per-weight CV ≈ 14%
    dirichlet_tight.append(rebuild_ari(Xbar * w, SEED + 900 + b))
dirichlet, dirichlet_tight = np.array(dirichlet), np.array(dirichlet_tight)

lovo = []
for d in DOMAINS:
    for ind in d["indicators"]:
        Sx, _ = domain_scores(DOMAINS, drop=ind["var"])
        keys = list(Sx.columns)
        wx = np.array([dd["weight"] for dd in DOMAINS if dd["key"] in keys])
        Xl = IterativeImputer(max_iter=30, random_state=SEED).fit_transform(Sx.loc[BUILD].values)
        t_, g_ = pipeline(Xl * wx, seed=SEED, n_init=50)
        lovo.append({"dropped": ind["var"], "domainRemoved": d["key"] not in keys,
                     "typesARI": round(adjusted_rand_score(TYPES, t_), 3), "groupsARI": round(adjusted_rand_score(GROUPS, g_), 3)})

# ── Step 11: Grand Index ─────────────────────────────────────────────────────
ASSIGNED = [c for c in U if assign[c]["status"] != "unclassified"]
group_of = {c: assign[c]["group"] for c in ASSIGNED}
type_of = {c: assign[c]["type"] for c in ASSIGNED}
CORE_VARS = {ind["var"] for d in DOMAINS for ind in d["indicators"]} | {"wb_gdppc_usd"}


def analysis_scale(x: pd.Series) -> tuple[pd.Series, str]:
    o = x.dropna()
    if len(o) > 5 and o.min() >= 0 and skew(o) > 2:
        return np.arcsinh(x), "asinh"
    return x, "raw"


def profile(members: list[str], reference: list[str]) -> list[dict]:
    rows = []
    for var, meta in VARS.items():
        kind = meta.get("kind")
        if kind in ("numeric", "binary"):
            x = num(var)
            xs, scale = analysis_scale(x)
            ref = xs[reference].dropna()
            mem_raw = x[members].dropna()
            mem = xs[members].dropna()
            if len(ref) < 20 or ref.std() == 0 or len(mem) == 0:
                continue
            ref_raw = x[reference].dropna()
            row = {"var": var, "label": meta.get("label", var), "theme": theme_of(var), "kind": kind, "scale": scale,
                   "n": int(len(mem)), "share": round(len(mem) / len(members), 2),
                   "mean": float(mem_raw.mean()), "referenceMean": float(ref_raw.mean()),
                   "z": round(float((mem.mean() - ref.mean()) / ref.std()), 3)}
            if ref_raw.min() >= 0 and ref_raw.mean() > 0:
                row["index"] = round(float(100 * mem_raw.mean() / ref_raw.mean()))
            rows.append(row)
        elif kind == "category":
            x = col(var)
            ref = x[reference].dropna()
            mem = x[members].dropna()
            if len(ref) < 20 or len(mem) == 0:
                continue
            for level, p_ref in ref.value_counts(normalize=True).items():
                p = float((mem == level).mean())
                sd = math.sqrt(p_ref * (1 - p_ref))
                rows.append({"var": f"{var}={level}", "label": f"{meta.get('label', var)}: {level}", "theme": theme_of(var),
                             "kind": "category", "role": meta.get("role"), "n": int(len(mem)), "share": round(len(mem) / len(members), 2),
                             "mean": round(p, 3), "referenceMean": round(float(p_ref), 3),
                             "index": round(100 * p / p_ref) if p_ref > 0 else None,
                             "z": round((p - p_ref) / sd, 3) if sd > 0 else 0.0})
    return rows


def geographic_memberships() -> set[str]:
    """An organisation whose members are ≥ 80% from one continent is a geographic label (the
    EU, the African Union, CARICOM, the Gulf Cooperation Council…). Featuring it would bring
    geography back into the portraits, which the playbook forbids; it stays in the profile."""
    out, cont = set(), col("geo_continent")
    for var, meta in VARS.items():
        if not var.startswith("member_"):
            continue
        members = [c for c in U if num(var)[c] == 1]
        shares = Counter(cont[members].dropna()).values()
        if members and max(shares) / len(members) >= 0.8:
            out.add(var)
    return out


GEOGRAPHIC_MEMBERSHIPS = geographic_memberships()


def key_features(rows, size, k=6):
    """Top six by |z|, observed for ≥ 60% of members (and ≥ 3 of them), drawn from ≥ 3 themes.
    Never featured (profiled only): benchmarks (continent, region, income group), rating labels,
    geographic memberships, and counts of the app's own listings (count_*), which measure our
    catalogue as much as the country."""
    need = max(3, math.ceil(0.6 * size))
    cand = [r for r in rows if r["n"] >= need and r.get("role") != "benchmark"
            and not r["var"].startswith(("geo_", "wb_region", "wb_income_group", "count_")) and "_rating" not in r["var"]
            and r["var"] not in GEOGRAPHIC_MEMBERSHIPS]
    cand.sort(key=lambda r: -abs(r["z"]))
    picked, themes = [], []
    for r in cand:  # the best row from each of the three strongest themes first
        if r["theme"] not in themes and len(themes) < 3:
            picked.append(r)
            themes.append(r["theme"])
    for r in cand:
        if len(picked) >= k:
            break
        if r not in picked:
            picked.append(r)
    return sorted(picked, key=lambda r: -abs(r["z"]))[:k]


def typical(members_idx, C):
    d = ((Xw[members_idx] - C) ** 2).sum(axis=1)
    return [BUILD[i] for i in np.array(members_idx)[np.argsort(d)][:5]]


pop = num("wb_population")
continent = col("geo_continent")
grand = {"groups": {}, "types": {}}
for g in range(K_G):
    L = GROUP_LETTER[g]
    members = [c for c in ASSIGNED if group_of[c] == L]
    rows = profile(members, ASSIGNED)
    cont = Counter(continent[members].dropna())
    p = np.array(list(cont.values()), dtype=float) / sum(cont.values())
    grand["groups"][L] = {
        "members": members, "size": len(members),
        "worldPopulationShare": round(float(pop[members].sum() / pop[ASSIGNED].sum()), 4),
        "continents": dict(cont.most_common()),
        "continentEntropy": round(float(-(p * np.log(p)).sum() / math.log(max(len(continent.dropna().unique()), 2))), 3),
        "typicalMembers": typical(np.where(GROUPS == g)[0], C_G[g]),
        "keyFeatures": key_features(rows, len(members)), "profile": rows,
    }
for t in range(K_T):
    code = TYPE_CODE[t]
    members = [c for c in ASSIGNED if type_of[c] == code]
    parent = [c for c in ASSIGNED if group_of[c] == code[0]]
    rows_w = profile(members, ASSIGNED)
    rows_p = profile(members, parent)
    grand["types"][code] = {
        "group": code[0], "members": members, "size": len(members),
        "worldPopulationShare": round(float(pop[members].sum() / pop[ASSIGNED].sum()), 4),
        "continents": dict(Counter(continent[members].dropna()).most_common()),
        "typicalMembers": typical(np.where(TYPES == t)[0], C_T[t]),
        "keyFeaturesVsWorld": key_features(rows_w, len(members)),
        "keyFeaturesVsGroup": key_features(rows_p, len(members)),
        "profile": rows_w,
    }

# ── Step 13: validation ──────────────────────────────────────────────────────
def eta2(values: pd.Series, labels: pd.Series) -> float:
    """Share of a variable's variance explained by a partition (one-way ANOVA effect size)."""
    ok = values.notna() & labels.notna()
    v = values[ok].to_numpy(dtype=float)
    if len(v) < 20 or v.var() == 0:
        return float("nan")
    codes, _ = pd.factorize(labels[ok])
    counts = np.bincount(codes)
    means = np.bincount(codes, weights=v) / counts
    return float((counts * (means - v.mean()) ** 2).sum() / ((v - v.mean()) ** 2).sum())


groups_s = pd.Series(group_of).reindex(U)
types_s = pd.Series(type_of).reindex(U)
benchmarks = {"continent": col("geo_continent"), "sub-region": col("geo_subregion"), "World Bank region": col("wb_region"),
              "World Bank income group": col("wb_income_group"), "Freedom House status": col("idx_freedomHouse_rating")}
trailers = [v for v, m in VARS.items() if m.get("kind") in ("numeric",) and v not in CORE_VARS
            and not v.startswith("geo_") and m.get("coverage", 0) >= 60]
perm_r = np.random.default_rng(SEED + 99)
validation = []
for v in trailers:
    xs, _ = analysis_scale(num(v))
    e_g = eta2(xs, groups_s)
    if math.isnan(e_g):
        continue
    ok = xs.notna() & groups_s.notna()
    lab = groups_s[ok].values
    null = [eta2(xs[ok], pd.Series(perm_r.permutation(lab), index=xs[ok].index)) for _ in range(1000)]
    row = {"var": v, "label": VARS[v].get("label", v), "n": int(ok.sum()), "groups": e_g, "types": eta2(xs, types_s),
           "p": float((np.sum(np.array(null) >= e_g) + 1) / 1001)}
    for name, b in benchmarks.items():
        row[name] = eta2(xs, b)
    validation.append(row)
agreement = {name: {"groupsARI": float(adjusted_rand_score(groups_s[b.notna() & groups_s.notna()], b[b.notna() & groups_s.notna()])),
                    "typesARI": float(adjusted_rand_score(types_s[b.notna() & types_s.notna()], b[b.notna() & types_s.notna()]))}
             for name, b in benchmarks.items()}

# ── Family tree (step 14) ────────────────────────────────────────────────────
coords = pca.transform(Xw) * np.array([flip, 1])
family_tree = {
    "explainedVariance": [round(float(v), 3) for v in pca.explained_variance_ratio_],
    "loadings": {k: [round(float(pca.components_[0][j] * flip), 3), round(float(pca.components_[1][j]), 3)] for j, k in enumerate(DKEYS)},
    "countries": {c: [round(float(x), 3) for x in coords[i]] for i, c in enumerate(BUILD)},
    "types": {TYPE_CODE[t]: [round(float(x), 3) for x in (pca.transform(C_T[[t]])[0] * np.array([flip, 1]))] for t in range(K_T)},
}

# ── Acceptance criteria (playbook E3) ────────────────────────────────────────
group_sizes = Counter(assign[c]["group"] for c in ASSIGNED)
type_sizes = Counter(assign[c]["type"] for c in ASSIGNED)
lovo_min = min(r["groupsARI"] for r in lovo)
criteria = [
    ("Every one of the 195 has a type, or is provisional or unclassified", len(assign) == len(U), f"{len(assign)} / {len(U)}"),
    ("Group size 10–45 countries", all(GROUP_SIZE[0] <= s <= GROUP_SIZE[1] for s in group_sizes.values()), f"{min(group_sizes.values())}–{max(group_sizes.values())}"),
    ("Type size ≥ 4 countries (built set)", int(TYPE_SIZES.min()) >= MIN_TYPE, f"min {int(TYPE_SIZES.min())}"),
    ("Every group bootstrap Jaccard ≥ 0.75", bool(np.all(group_jaccard >= 0.75)), ", ".join(f"{x:.2f}" for x in sorted(group_jaccard, reverse=True))),
    ("≥ 80% of types Jaccard ≥ 0.60, none ≤ 0.50 (within-group bootstrap)", bool(np.mean(type_jaccard >= 0.6) >= 0.8 and np.min(type_jaccard) > 0.5), f"{np.mean(type_jaccard >= 0.6):.0%} ≥ 0.60; min {np.min(type_jaccard):.2f}"),
    ("Modal type across the 20 imputations = final type for ≥ 90%", imputation_agreement >= 0.9, f"{imputation_agreement:.1%}"),
    ("Weight sensitivity: median group ARI ≥ 0.70 (Dirichlet, weight CV ≈ 27%)", float(np.median(dirichlet[:, 1])) >= 0.7, f"median {np.median(dirichlet[:, 1]):.2f}, types {np.median(dirichlet[:, 0]):.2f}; at CV ≈ 14%: {np.median(dirichlet_tight[:, 1]):.2f} / {np.median(dirichlet_tight[:, 0]):.2f}"),
    ("Hierarchical nearest-centroid scoring reproduces every built assignment", mismatch == 0, f"{mismatch} mismatches"),
    ("Leave-one-variable-out group ARI ≥ 0.80 for every variable", lovo_min >= 0.8, f"min {lovo_min:.2f}"),
    ("Consensus groups vs direct 1,000-restart k-means ARI ≥ 0.60", adjusted_rand_score(GROUPS, reference_kmeans) >= 0.6, f"{adjusted_rand_score(GROUPS, reference_kmeans):.2f}"),
    ("Beats the permutation null (p < 0.01) on ≥ 90% of trailers", float(np.mean([r["p"] < 0.01 for r in validation])) >= 0.9, f"{np.mean([r['p'] < 0.01 for r in validation]):.0%} of {len(validation)}"),
    ("Average silhouette (reported, not gated)", None, f"groups {silhouette_score(Xw, GROUPS):.3f}; types {silhouette_score(Xw, TYPES):.3f}"),
]

# ── Write outputs ────────────────────────────────────────────────────────────
model = {
    "status": "DRAFT — not reviewed; nothing in src/ reads this file",
    "builtBy": "scripts/country-personas/build.py",
    "snapshot": {"file": "scripts/data/country-persona-inputs.json", "sha256": hashlib.sha256(snap_bytes).hexdigest(), "generated": S["generated"]},
    "seed": SEED,
    "rules": {"buildShare": BUILD_SHARE, "unclassifiedShare": UNCLASSIFIED_SHARE, "minTypeSize": MIN_TYPE,
              "groupJaccard": GROUP_JACCARD, "typeJaccard": TYPE_JACCARD, "scoring": "nearest group centroid, then nearest type centroid within that group; partial distance over observed domains",
              "imputations": M_IMPUTATIONS, "consensusSubsamples": CONSENSUS_SUBSAMPLES},
    "domains": DOMAIN_META,
    "structure": {"groups": K_G, "types": K_T,
                  "groupCentroidsWeighted": {GROUP_LETTER[g]: [round(float(x), 5) for x in C_G[g]] for g in range(K_G)},
                  "typeCentroidsWeighted": {TYPE_CODE[t]: [round(float(x), 5) for x in C_T[t]] for t in range(K_T)},
                  "typeGroup": {TYPE_CODE[t]: GROUP_LETTER[G_OF_T[t]] for t in range(K_T)}},
    "assignments": {c: assign[c] for c in U},
    "familyTree": family_tree,
}
OUT_MODEL.write_text(json.dumps(model, indent=1, ensure_ascii=False) + "\n")
OUT_GRAND_INDEX.write_text(json.dumps(grand, indent=1, ensure_ascii=False) + "\n")

# ── Report ───────────────────────────────────────────────────────────────────
N = lambda codes: ", ".join(NAMES[c] for c in codes)  # noqa: E731
lines = [
    "# Country Personas — research build report (DRAFT)",
    "",
    "Auto-generated by `scripts/country-personas/build.py` — do not edit by hand. Draft for owner review:",
    "names and pen portraits are not written yet, and nothing in the app uses this build.",
    "",
    f"Snapshot `{model['snapshot']['file']}` (generated {S['generated']}, sha256 `{model['snapshot']['sha256'][:12]}…`), seed {SEED}.",
    "",
    "## Acceptance criteria (playbook E3)",
    "",
    "| Criterion | Result | Value |",
    "|---|---|---|",
    *[f"| {name} | {'—' if ok is None else ('PASS' if ok else '**FAIL**')} | {val} |" for name, ok, val in criteria],
    "",
    "## Domains",
    "",
    "| Domain | Indicators | Coverage | First-component share | Weight |",
    "|---|---|---|---|---|",
]
for m in DOMAIN_META:
    inds = "; ".join(f"{VARS[i['var']]['label']} ({'+' if i['sign'] > 0 else '−'}{', ' + i['transform'] if i['transform'] != 'none' else ''}{', Yeo-Johnson' if 'yeoJohnsonLambda' in i else ''})" for i in m["indicators"])
    u = UNIDIM.get(m["key"], {}).get("firstComponentShare")
    lines.append(f"| {m['label']}{' (residual on development, r = %.2f)' % m['residual']['r'] if m.get('residual') else ''} | {inds} | {int(SCORES[m['key']].notna().sum())} | {'—' if u is None else f'{u:.2f}'} | {m['weight']} |")
high = [(a, b, CROSS.loc[a, b]) for i, a in enumerate(DKEYS) for b in DKEYS[i + 1:] if abs(CROSS.loc[a, b]) >= 0.81]
lines += ["", f"Cross-domain correlations at or above the 0.81 duplication gate: {', '.join(f'{a}–{b} {r:.2f}' for a, b, r in high) if high else 'none'}.",
          "", "Domain score correlations:", "", "| | " + " | ".join(DKEYS) + " |", "|---|" + "---|" * len(DKEYS)]
lines += [f"| {a} | " + " | ".join(f"{CROSS.loc[a, b]:.2f}" for b in DKEYS) + " |" for a in DKEYS]
lines += ["", "## Who is built, provisional, unclassified", "",
          f"- **Built** ({len(BUILD)}): ≥ {BUILD_SHARE:.0%} of domain weight observed.",
          f"- **Provisional** ({len(PROVISIONAL)}): scored against the frozen centroids by partial distance: {N(PROVISIONAL) or 'none'}.",
          f"- **Unclassified** ({len(UNCLASSIFIED)}): {N(UNCLASSIFIED) or 'none'}.",
          "", "## Choosing the number of groups (top-down)", "", "| k | sizes | silhouette | bootstrap Jaccard | sizes 10–45 |", "|---|---|---|---|---|"]
lines += [f"| {g['k']} | {g['sizes']} | {g['silhouette']:.3f} | {g['jaccard']} | {'yes' if g['sizesOk'] else 'no'} |" for g in group_candidates]
lines += ["", f"Chosen: **{K_G} groups** ({'the largest k where every group reaches Jaccard ≥ ' + str(GROUP_JACCARD) + ' within the size rule' if passing else 'no k met the rule; best available'}). "
          f"Consensus groups vs a direct 1,000-restart k-means: ARI {adjusted_rand_score(GROUPS, reference_kmeans):.2f}.",
          "", "## Splitting groups into types (only where the split is stable)", "",
          f"A group is split into k = 2–4 types only when every type reaches a within-group bootstrap Jaccard ≥ {TYPE_JACCARD} with ≥ {MIN_TYPE} members; the largest such k wins.", "",
          "| Group | candidates (k: min size, Jaccard) | chosen k |", "|---|---|---|"]
lines += [f"| {GROUP_LETTER[g]} | " + "; ".join(f"k={c['k']}: {c['minSize']}, {c['jaccard'] if c['jaccard'] is not None else 'type below min size'}" for c in split_candidates[g]) + f" | {SPLIT_K[g]} |" for g in group_order]
lines += ["", "## Structure (codes only — names come after review)", ""]
for g in group_order:
    L = GROUP_LETTER[g]
    gi = grand["groups"][L]
    lines += [f"### Group {L} — {gi['size']} countries, {gi['worldPopulationShare']:.1%} of world population",
              "", f"Continents: {', '.join(f'{k} {v}' for k, v in gi['continents'].items())} (entropy {gi['continentEntropy']:.2f}). Typical: {N(gi['typicalMembers'])}.",
              "", "Key features vs world: " + "; ".join(f"{r['label']} (z {r['z']:+.2f}{', index ' + str(r['index']) if r.get('index') is not None and r['kind'] != 'category' else ''})" for r in gi["keyFeatures"]) + ".", ""]
    for t in type_order:
        if G_OF_T[t] != g:
            continue
        code = TYPE_CODE[t]
        ti = grand["types"][code]
        prov = [c for c in ti["members"] if assign[c]["status"] == "provisional"]
        low = [c for c in ti["members"] if assign[c].get("confidence", 1) < 0.1]
        lines += [f"- **{code}** ({ti['size']}): {N(ti['members'])}"
                  + (f" — provisional: {N(prov)}" if prov else "") + (f" — borderline between groups (confidence < 0.1): {N(low)}" if low else ""),
                  "  - vs group: " + "; ".join(f"{r['label']} (z {r['z']:+.2f})" for r in ti["keyFeaturesVsGroup"][:4])]
    lines.append("")
lines += ["## Stability", "",
          f"- Type bootstrap Jaccard (within its group, 100 resamples): {', '.join(f'{TYPE_CODE[t]} {type_jaccard[t]:.2f}' for t in type_order)}.",
          f"- Group bootstrap Jaccard (200 resamples): {', '.join(f'{GROUP_LETTER[g]} {group_jaccard[g]:.2f}' for g in group_order)}.",
          f"- Imputation agreement (modal type over {M_IMPUTATIONS} imputations = final): {imputation_agreement:.1%}.",
          f"- Method floor (plain k-means re-run vs final consensus model): types ARI {method_floor['types']:.2f}, groups ARI {method_floor['groups']:.2f}. "
          "Sensitivity ARIs below are measured against the final model, so they cannot exceed this floor by much.",
          "", "## Weight sensitivity", "",
          f"Dirichlet, 200 draws centred on the defaults. Weight CV ≈ 27%: groups ARI median {np.median(dirichlet[:, 1]):.2f} (5th pct {np.percentile(dirichlet[:, 1], 5):.2f}), "
          f"types {np.median(dirichlet[:, 0]):.2f}. Weight CV ≈ 14%: groups {np.median(dirichlet_tight[:, 1]):.2f} (5th pct {np.percentile(dirichlet_tight[:, 1], 5):.2f}), types {np.median(dirichlet_tight[:, 0]):.2f}.", "", "| Domain | ×0.5 groups / types | ×1.5 groups / types |", "|---|---|---|"]
for key in DKEYS:
    lo = next(r for r in one_at_a_time if r["domain"] == key and r["factor"] == 0.5)
    hi = next(r for r in one_at_a_time if r["domain"] == key and r["factor"] == 1.5)
    lines.append(f"| {key} | {lo['groupsARI']:.2f} / {lo['typesARI']:.2f} | {hi['groupsARI']:.2f} / {hi['typesARI']:.2f} |")
lines += ["", "## Leave one variable out", "", "| Dropped | domain removed | groups ARI | types ARI |", "|---|---|---|---|"]
lines += [f"| {VARS[r['dropped']]['label']} | {'yes' if r['domainRemoved'] else ''} | {r['groupsARI']:.2f} | {r['typesARI']:.2f} |" for r in lovo]
med = lambda k: float(np.nanmedian([r[k] for r in validation]))  # noqa: E731
lines += ["", "## Validation — discrimination on variables not used to build (η²)", "",
          f"{len(validation)} trailer variables. Median η²: groups {med('groups'):.2f}, types {med('types'):.2f}, "
          + ", ".join(f"{k} {med(k):.2f}" for k in benchmarks) + ".",
          "", "| Variable | n | groups | types | income group | continent | p (groups) |", "|---|---|---|---|---|---|---|"]
lines += [f"| {r['label']} | {r['n']} | {r['groups']:.2f} | {r['types']:.2f} | {r['World Bank income group']:.2f} | {r['continent']:.2f} | {r['p']:.3f} |"
          for r in sorted(validation, key=lambda r: -r["groups"])]
lines += ["", "## Agreement with existing typologies (ARI)", "", "| Typology | groups | types |", "|---|---|---|"]
lines += [f"| {k} | {v['groupsARI']:.2f} | {v['typesARI']:.2f} |" for k, v in agreement.items()]
lines += ["", "## Family tree axes", "",
          f"Explained variance: {family_tree['explainedVariance']}. Loadings (axis 1, axis 2): "
          + "; ".join(f"{k} {v}" for k, v in family_tree["loadings"].items()) + "."]
OUT_REPORT.parent.mkdir(parents=True, exist_ok=True)
OUT_REPORT.write_text("\n".join(lines) + "\n")

print(f"built {len(BUILD)}, provisional {len(PROVISIONAL)}, unclassified {len(UNCLASSIFIED)}; {K_G} groups, {K_T} types")
for name, ok, val in criteria:
    print(f"  {'—' if ok is None else ('PASS' if ok else 'FAIL')}  {name}: {val}")
