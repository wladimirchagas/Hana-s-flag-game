"""
Hand-subdivide the dataset's lumped "Malaya" polygon into the actual
historical polities of the era. The dataset (aourednik/historical-basemaps)
draws all 9 Malay sultanates + Dutch Malacca + British Penang + Brunei
Sultanate's Borneo holdings under one feature called "Malaya". This script:

1. Loads modern Malaysia admin-1 boundaries (states).
2. Loads our /public era GeoJSON, finds the "Malaya" feature.
3. Intersects each modern state with the Malaya polygon, producing one
   feature per historical sultanate, named appropriately for the era.
4. For the Borneo portion (Sabah + Sarawak), merges them and labels as
   "Brunei Sultanate" (its 1815 extent).
5. Replaces the original "Malaya" feature with the split features.
6. Writes back to the same era file.

Run once per era you want subdivided. Currently scoped to 1815.
"""

import json
import sys
from shapely.geometry import shape, mapping
from shapely.ops import unary_union

MALAYSIA_GEOJSON = "scripts/data/malaysia-states.geojson"

# Era-specific mapping: modern state name -> historical polity name + era note.
# `merge` groups multiple modern states into one historical polity.
ERA_SPLITS = {
    "ad1815": {
        # Peninsula sultanates
        "Johor": ("Johor Sultanate", "Sultanate of southern peninsula and Singapore, founded 1528."),
        "Kedah": ("Kedah Sultanate", "Oldest sultanate on the peninsula (c. 1136); paid tribute to Siam."),
        "Perak": ("Perak Sultanate", "Sultanate of the silver-rich Perak River valley."),
        "Selangor": ("Selangor Sultanate", "Sultanate founded by Bugis migrants in the 18th century."),
        "Federal Territory of Kuala Lumpur": ("Selangor Sultanate", None),  # merged into Selangor
        "Federal Territory of Putrajaya": ("Selangor Sultanate", None),
        "Pahang": ("Pahang Sultanate", "Largest east-coast sultanate."),
        "Terengganu": ("Terengganu Sultanate", "East-coast sultanate famed for its songket weaving."),
        "Kelantan": ("Kelantan Sultanate", "North-east sultanate, long under Siamese influence."),
        "Negeri Sembilan": ("Negeri Sembilan", "Confederation of nine Minangkabau-descended chieftaincies."),
        "Perlis": ("Perlis", "Small northern principality, vassal of Kedah / Siam."),
        # European trading posts
        "Melaka": ("Dutch Malacca", "Former Malay sultanate; held by the Dutch 1641–1825, then ceded to Britain."),
        "Penang": ("British Penang", "Ceded to the British East India Company in 1786 — Britain's first holding on the peninsula."),
        # Borneo — both states roll up to the Brunei Sultanate's 1815 extent.
        "Sabah": ("Brunei Sultanate", "In 1815 Brunei still held northern Borneo before British / Brooke encroachment."),
        "Sarawak": ("Brunei Sultanate", None),
    },
}

def split_malaya(era_file: str, era_id: str):
    era_path = f"public/historical-maps/{era_file}"
    print(f"Loading {era_path}")
    era = json.load(open(era_path))

    # Find the Malaya feature
    malaya_idx = None
    for i, ft in enumerate(era["features"]):
        if ft["properties"].get("NAME") == "Malaya":
            malaya_idx = i
            break
    if malaya_idx is None:
        print(f"  no Malaya feature, skipping")
        return

    malaya_feat = era["features"][malaya_idx]
    malaya_shape = shape(malaya_feat["geometry"])
    print(f"  found Malaya feature, area={malaya_shape.area:.3f}")

    # Load Malaysia admin-1
    msia = json.load(open(MALAYSIA_GEOJSON))
    splits = ERA_SPLITS[era_id]

    # Group modern states by target historical polity NAME
    groups: dict[str, dict] = {}  # name -> {shapes, note}
    for ft in msia["features"]:
        state = ft["properties"].get("name")
        if state not in splits:
            continue
        hist_name, hist_note = splits[state]
        g = groups.setdefault(hist_name, {"shapes": [], "note": None})
        g["shapes"].append(shape(ft["geometry"]))
        if hist_note and not g["note"]:
            g["note"] = hist_note

    # For each group: union modern states → intersect with Malaya
    new_features: list[dict] = []
    for hist_name, g in groups.items():
        unioned = unary_union(g["shapes"])
        intersected = unioned.intersection(malaya_shape)
        if intersected.is_empty:
            print(f"  {hist_name}: empty intersection, skipping")
            continue
        # Buffer(0) cleans any tiny topology errors from the intersection.
        intersected = intersected.buffer(0)
        feature = {
            "type": "Feature",
            "properties": {
                "NAME": hist_name,
                "SUBJECTO": None,
                "PARTOF": None,
                "BORDERPRECISION": malaya_feat["properties"].get("BORDERPRECISION"),
            },
            "geometry": mapping(intersected),
        }
        new_features.append(feature)
        print(f"  {hist_name}: area={intersected.area:.3f}")

    # Replace the Malaya feature with the new constituent features
    era["features"][malaya_idx:malaya_idx + 1] = new_features
    json.dump(era, open(era_path, "w"))
    print(f"  wrote {era_path} with {len(new_features)} new features (was 1 Malaya)")

if __name__ == "__main__":
    split_malaya("world_1815.geojson", "ad1815")
