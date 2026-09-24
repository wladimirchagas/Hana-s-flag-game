"""Country Personas pilot diagnostics (research material for docs/COUNTRY_PERSONAS_PLAYBOOK.md, Appendix A).

This is a feasibility probe, NOT the classification. It measures coverage, missingness,
redundancy, dimensionality and how strong/stable any cluster structure is, so the playbook's
design choices rest on this repo's actual data. Its cluster memberships must never be shipped.

    node docs/country-personas/pilot-export.mjs /tmp/country-personas-pilot.csv
    python3 -m venv /tmp/cm && /tmp/cm/bin/pip install numpy scipy pandas scikit-learn
    /tmp/cm/bin/python docs/country-personas/pilot-diagnostics.py /tmp/country-personas-pilot.csv
"""
import sys
import warnings

import numpy as np
import pandas as pd
from scipy.cluster.hierarchy import fcluster, linkage
from scipy.stats import mannwhitneyu
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.experimental import enable_iterative_imputer  # noqa: F401
from sklearn.impute import IterativeImputer
from sklearn.metrics import adjusted_rand_score, silhouette_score
from sklearn.preprocessing import StandardScaler

warnings.filterwarnings("ignore")

# keep_default_na=False: Namibia's ISO code "NA" is otherwise read as a missing value.
df = pd.read_csv(sys.argv[1], keep_default_na=False, na_values=[""]).set_index("code")
num = df.drop(columns=["continent"])

print("== Coverage (of", len(df), "countries)")
print(num.notna().sum().sort_values(ascending=False).to_string())

print("\n== Is missingness related to size? (median population where present vs missing)")
for c in num.columns:
    m = num[c].isna()
    if 5 <= m.sum() <= len(m) - 5 and c != "lnPop":
        a, b = num.loc[~m, "lnPop"].dropna(), num.loc[m, "lnPop"].dropna()
        print(f"  {c:22s} missing={m.sum():3d}  present={np.exp(a.median())/1e6:6.1f}M  "
              f"missing={np.exp(b.median())/1e6:6.2f}M  Mann-Whitney p={mannwhitneyu(a, b).pvalue:.1e}")

gov = ["i_freedomHouse", "i_vDem", "i_economist", "i_cpi", "i_rsfPress", "i_wjpRuleOfLaw",
       "i_hdi", "lnGdpPc", "i_happiness", "i_gpi", "i_genderGap"]
print("\n== Spearman correlations (pairwise complete)")
print(num[gov].corr(method="spearman", min_periods=40).round(2).to_string())

df["lnMedals"] = np.log1p(df.summerMedals)
df["lnAirlines"] = np.log1p(df.nAirlines)
core = ["lnGdpPc", "lnPop", "i_hdi", "i_freedomHouse", "i_vDem", "i_economist", "i_cpi", "i_rsfPress",
        "i_wjpRuleOfLaw", "i_gpi", "i_gti", "i_etr", "i_genderGap", "i_happiness", "i_softPower",
        "lnVisitors", "lnMedals", "wcMen", "nBlocks", "lnAirlines"]
X = df[core]
imputed_share = X.isna().mean(axis=1)
print(f"\n== Pilot core: {len(core)} variables; complete cases {X.dropna().shape[0]} of {len(X)}")
print("imputed share: >=30%:", int((imputed_share >= .3).sum()), " >=50%:", int((imputed_share >= .5).sum()))
print("most imputed:", imputed_share.sort_values(ascending=False).head(10).round(2).to_dict())

Xi = pd.DataFrame(IterativeImputer(max_iter=25, random_state=0).fit_transform(X), index=X.index, columns=core)
Z = StandardScaler().fit_transform(Xi)
pca = PCA().fit(Z)
print("\n== PCA eigenvalues:", np.round(pca.explained_variance_[:6], 2))
print("cumulative variance:", np.round(np.cumsum(pca.explained_variance_ratio_)[:6], 3))
print(pd.DataFrame(pca.components_[:3].T, index=core, columns=["PC1", "PC2", "PC3"]).round(2).to_string())
S = pca.transform(Z)[:, : int((pca.explained_variance_ > 1).sum())]

print("\n== Cluster strength, k = 3..12 (silhouette: >0.5 reasonable, 0.26-0.5 weak, <=0.25 none)")
L = linkage(S, "ward")
for k in range(3, 13):
    ward = fcluster(L, k, "maxclust")
    km = KMeans(k, n_init=200, random_state=0).fit(S).labels_
    print(f"k={k:2d}  silhouette ward={silhouette_score(S, ward):.3f} k-means={silhouette_score(S, km):.3f}  "
          f"ARI(ward, k-means)={adjusted_rand_score(ward, km):.2f}  sizes={sorted(np.bincount(km).tolist(), reverse=True)}")

print("\n== Bootstrap stability (Hennig 2007 Jaccard: >=0.75 stable, <=0.5 dissolved)")
rng = np.random.default_rng(0)
for k in (6, 8, 10):
    base = KMeans(k, n_init=100, random_state=0).fit(S).labels_
    clusters = [set(np.where(base == c)[0]) for c in range(k)]
    J = np.full((100, k), np.nan)
    for b in range(100):
        idx = rng.choice(len(S), len(S), replace=True)
        drawn = set(idx)
        lab = KMeans(k, n_init=20, random_state=b).fit(S[idx]).labels_
        boot = [set(idx[lab == c]) for c in range(k)]
        for c, cl in enumerate(clusters):
            cl_in = cl & drawn
            if cl_in:
                J[b, c] = max(len(cl_in & x) / len(cl_in | x) for x in boot)
    print(f"k={k:2d}  mean Jaccard per cluster: {np.round(np.sort(np.nanmean(J, 0))[::-1], 2)}")

km8 = KMeans(8, n_init=200, random_state=0).fit(S).labels_
small = set(df.index[df.lnPop < np.log(1e6)])
print("\n== k=8 pilot: size, share of members under 1M people, mean imputed share")
for c in range(8):
    members = set(Xi.index[km8 == c])
    print(f"  cluster {c}: n={len(members):2d}  <1M={len(members & small) / len(members):.2f}  "
          f"imputed={imputed_share[km8 == c].mean():.2f}")

# Domain-balanced variant (Farr & Webber 2001: x' = k (x - mean) / sd, weights balanced by domain).
domains = {
    "prosperity": ["lnGdpPc", "i_hdi", "i_happiness"],
    "freedom": ["i_freedomHouse", "i_vDem", "i_economist", "i_rsfPress"],
    "integrity": ["i_cpi", "i_wjpRuleOfLaw"],
    "security": ["i_gpi", "i_gti", "i_etr"],
    "gender": ["i_genderGap"],
    "scale_reach": ["lnPop", "i_softPower", "lnVisitors", "lnAirlines"],
    "sport": ["lnMedals", "wcMen"],
    "alliances": ["nBlocks"],
}
W = pd.DataFrame(Z, index=Xi.index, columns=core)
for vs in domains.values():
    for v in vs:
        W[v] = W[v] / np.sqrt(len(vs))
kmw = KMeans(8, n_init=200, random_state=0).fit(W.values).labels_
print(f"\n== Domain-balanced k=8: silhouette={silhouette_score(W.values, kmw):.3f}  "
      f"ARI vs unweighted k=8={adjusted_rand_score(kmw, km8):.2f}")
