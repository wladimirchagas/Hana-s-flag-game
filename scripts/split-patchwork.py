"""
Generic patchwork splitter for the Learn-mode historical maps.

The aourednik/historical-basemaps dataset draws several entities as single
polygons that were in fact patchworks of independent polities — Hausa
States, Mossi States, Burmese kingdoms, Aymara kingdoms, etc. This script
intersects modern admin-1 boundaries (from geoBoundaries.org) with each
lumped polygon and replaces it with one feature per historical polity.

Add a new entry to PATCHWORK_SPLITS to subdivide another lumped name.
Each split is idempotent: re-running after a successful split is harmless
because the lumped name is no longer in the GeoJSON.

The Malaya / Borneo split was earlier shipped via the separate
scripts/split-malaya.py — same pattern, kept around for reference.
"""

import json
import os
import urllib.request
from shapely.geometry import shape, mapping
from shapely.ops import unary_union


# geoBoundaries gbOpen ADM1 URLs (resolved 2026-05). The script downloads
# any missing admin file on demand into scripts/data/, so contributors don't
# have to commit the (multi-MB) source GeoJSONs into the repo.
ADMIN_URLS: dict[str, str] = {
    "scripts/data/NGA-adm1.geojson": "https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/NGA/ADM1/geoBoundaries-NGA-ADM1.geojson",
    "scripts/data/BFA-adm1.geojson": "https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/BFA/ADM1/geoBoundaries-BFA-ADM1.geojson",
    "scripts/data/MMR-adm1.geojson": "https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/MMR/ADM1/geoBoundaries-MMR-ADM1.geojson",
    "scripts/data/BOL-adm1.geojson": "https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/BOL/ADM1/geoBoundaries-BOL-ADM1.geojson",
    "scripts/data/PER-adm1.geojson": "https://github.com/wmgeolab/geoBoundaries/raw/90a1d52/releaseData/gbOpen/PER/ADM1/geoBoundaries-PER-ADM1.geojson",
}


def ensure_admin(path: str) -> None:
    """Download an admin-1 GeoJSON on demand if it's not already on disk."""
    if os.path.exists(path):
        return
    url = ADMIN_URLS.get(path)
    if not url:
        raise FileNotFoundError(f"{path} missing and no download URL configured")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    print(f"  ↓ downloading {os.path.basename(path)}")
    urllib.request.urlretrieve(url, path)


# ---------------------------------------------------------------------------
# Splits to run. Each entry:
#   era_files:  one or more GeoJSON files that contain the lumped polygon.
#   lumped:     the dataset NAME to replace.
#   admin:      path(s) to admin-1 GeoJSON whose features hold the modern
#               state/region names.
#   name_prop:  the property on each admin feature holding the state name.
#   mapping:    { modern_admin_name: (historical_polity_name, note) }
#               Multiple admin names mapped to the same historical name
#               get unioned together before intersecting the lumped polygon.
# ---------------------------------------------------------------------------

PATCHWORK_SPLITS = [
    # ===================================================================
    # Hausa States — the seven "Hausa Bakwai" city-states of the Sahel.
    # Modern Nigerian states roughly contain each historic capital, so
    # we use them as a proxy for the medieval emirates' rough territories.
    # ===================================================================
    {
        "name": "Hausa States",
        "era_files": ["world_1500.geojson", "world_1700.geojson"],
        "lumped": "Hausa States",
        "admin": ["scripts/data/NGA-adm1.geojson"],
        "name_prop": "shapeName",
        "mapping": {
            "Kano":    ("Kano",    "Largest and richest Hausa city-state; major trans-Saharan trade hub."),
            "Katsina": ("Katsina", "Northern Hausa state; great Islamic learning centre."),
            "Jigawa":  ("Biram",   "Founder-state of the Hausa Bakwai by tradition; centred on Hadejia."),
            "Kaduna":  ("Zazzau",  "Southernmost Hausa state — Zaria; ruled by the famed Queen Amina in the 16th c."),
            "Sokoto":  ("Gobir",   "Northern Hausa state; later resisted the Sokoto Caliphate's jihad."),
            "Zamfara": ("Gobir",   None),
            "Kebbi":   ("Kebbi",   "Banza Bakwai (\"bastard seven\") Hausa state — Kebbi Sultanate."),
        },
    },
    # ===================================================================
    # Mossi States — the four Mossi kingdoms of the Volta basin.
    # Burkina Faso's modern regions split along similar lines.
    # ===================================================================
    {
        "name": "Mossi States",
        "era_files": ["world_1500.geojson", "world_1700.geojson", "world_1815.geojson"],
        "lumped": "Mossi States",
        "admin": ["scripts/data/BFA-adm1.geojson"],
        "name_prop": "shapeName",
        "mapping": {
            "Centre":           ("Kingdom of Wagadugu",      "The most prominent Mossi kingdom; its capital became modern Ouagadougou."),
            "Plateau-Central":  ("Kingdom of Wagadugu",      None),
            "Centre-Sud":       ("Kingdom of Wagadugu",      None),
            "Centre-Ouest":     ("Kingdom of Wagadugu",      None),
            "Nord":             ("Kingdom of Yatenga",       "Northern Mossi kingdom centred on Ouahigouya."),
            "Centre-Nord":      ("Kingdom of Yatenga",       None),
            "Sahel":            ("Kingdom of Yatenga",       None),
            "Centre-Est":       ("Kingdom of Tenkodogo",     "Considered the oldest Mossi kingdom by tradition."),
            "Est":              ("Kingdom of Fada N'Gourma", "Easternmost Mossi kingdom."),
            "Boucle du Mouhoun": ("Kingdom of Wagadugu",     None),
        },
    },
    # ===================================================================
    # Burmese kingdoms (1500) — fragmented post-Ava Burma.
    # Modern Myanmar's regions and states roughly preserve the divides.
    # ===================================================================
    {
        "name": "Burmese kingdoms",
        "era_files": ["world_1500.geojson"],
        "lumped": "Burmese kingdoms",
        "admin": ["scripts/data/MMR-adm1.geojson"],
        "name_prop": "shapeName",
        "mapping": {
            "Sagaing":      ("Ava",                "Upper-Burmese kingdom on the Irrawaddy; capital of the post-Pagan north."),
            "Mandalay":     ("Ava",                None),
            "Magway":       ("Ava",                None),
            "Bago":         ("Pegu (Hanthawaddy)", "Mon kingdom of southern Burma; rivals of Ava."),
            "Yangon":       ("Pegu (Hanthawaddy)", None),
            "Mon":          ("Pegu (Hanthawaddy)", None),
            "Ayeyarwady":   ("Pegu (Hanthawaddy)", None),
            "Rakhine":      ("Mrauk U",            "Coastal Arakanese kingdom on the Bay of Bengal."),
            "Chin":         ("Mrauk U",            None),
            "Shan":         ("Shan principalities", "Patchwork of Tai/Shan principalities in the eastern hills."),
            "Kachin":       ("Shan principalities", None),
            "Kayah":        ("Shan principalities", None),
            "Kayin":        ("Shan principalities", None),
        },
    },
    # ===================================================================
    # Aymara kingdoms (1300) — Lake Titicaca altiplano polities, pre-Inca.
    # Spans the modern Bolivia / Peru / Chile border. Two admin files
    # union together to cover the kingdom's actual extent.
    # ===================================================================
    {
        "name": "Aymara kingdoms",
        "era_files": ["world_1300.geojson"],
        "lumped": "Aymara kingdoms",
        "admin": ["scripts/data/BOL-adm1.geojson", "scripts/data/PER-adm1.geojson"],
        "name_prop": "shapeName",
        "mapping": {
            # Bolivia
            "La Paz":     ("Lupaca",   "Western lake-shore kingdom; later allies of the Inca."),
            "Oruro":      ("Carangas", "Western altiplano kingdom of the Carangas people."),
            "Potosí":     ("Pacajes",  "Southern Aymara kingdom of the altiplano."),
            "Cochabamba": ("Charcas",  "South-eastern Aymara kingdom of the Charcas confederation."),
            "Chuquisaca": ("Charcas",  None),
            # Peru
            "Puno":       ("Colla",    "Northern lake-shore kingdom; resisted Inca expansion."),
        },
    },
]


def run_split(split: dict) -> None:
    print(f"\n=== {split['name']} ===")
    # Build the unioned per-historical-polity geometries from the admin files.
    polity_shapes: dict[str, list] = {}
    polity_notes: dict[str, str | None] = {}
    for admin_path in split["admin"]:
        ensure_admin(admin_path)
        admin = json.load(open(admin_path))
        for ft in admin["features"]:
            state = ft["properties"].get(split["name_prop"])
            if state not in split["mapping"]:
                continue
            hist_name, hist_note = split["mapping"][state]
            polity_shapes.setdefault(hist_name, []).append(shape(ft["geometry"]))
            if hist_note and not polity_notes.get(hist_name):
                polity_notes[hist_name] = hist_note

    polity_union = {n: unary_union(s) for n, s in polity_shapes.items()}

    for era_file in split["era_files"]:
        era_path = f"public/historical-maps/{era_file}"
        if not os.path.exists(era_path):
            print(f"  ! {era_path} missing, skipping")
            continue
        era = json.load(open(era_path))
        idx = None
        for i, ft in enumerate(era["features"]):
            if ft["properties"].get("NAME") == split["lumped"]:
                idx = i
                break
        if idx is None:
            print(f"  · {era_file}: no '{split['lumped']}' feature (already split?)")
            continue
        lumped_feat = era["features"][idx]
        lumped_shape = shape(lumped_feat["geometry"])
        new_features: list[dict] = []
        for hist_name, geom in polity_union.items():
            inter = geom.intersection(lumped_shape)
            if inter.is_empty:
                continue
            inter = inter.buffer(0)
            new_features.append({
                "type": "Feature",
                "properties": {
                    "NAME": hist_name,
                    "SUBJECTO": None,
                    "PARTOF": None,
                    "BORDERPRECISION": lumped_feat["properties"].get("BORDERPRECISION"),
                },
                "geometry": mapping(inter),
            })
        if not new_features:
            print(f"  ! {era_file}: no intersections — admin mapping doesn't cover this lumped area")
            continue
        era["features"][idx:idx + 1] = new_features
        json.dump(era, open(era_path, "w"))
        print(f"  ✓ {era_file}: replaced '{split['lumped']}' with {len(new_features)} features ({', '.join(sorted({f['properties']['NAME'] for f in new_features}))})")


if __name__ == "__main__":
    for split in PATCHWORK_SPLITS:
        run_split(split)
