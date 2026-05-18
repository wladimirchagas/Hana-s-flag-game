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
    "scripts/data/IND-adm1.geojson": "https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/IND/ADM1/geoBoundaries-IND-ADM1.geojson",
    "scripts/data/MEX-adm1.geojson": "https://github.com/wmgeolab/geoBoundaries/raw/90a1d52/releaseData/gbOpen/MEX/ADM1/geoBoundaries-MEX-ADM1.geojson",
    "scripts/data/GTM-adm1.geojson": "https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/GTM/ADM1/geoBoundaries-GTM-ADM1.geojson",
    "scripts/data/HND-adm1.geojson": "https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/HND/ADM1/geoBoundaries-HND-ADM1.geojson",
    "scripts/data/BLZ-adm1.geojson": "https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/BLZ/ADM1/geoBoundaries-BLZ-ADM1.geojson",
    "scripts/data/ECU-adm1.geojson": "https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/ECU/ADM1/geoBoundaries-ECU-ADM1.geojson",
    "scripts/data/KEN-adm1.geojson": "https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/KEN/ADM1/geoBoundaries-KEN-ADM1.geojson",
    "scripts/data/TZA-adm1.geojson": "https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/TZA/ADM1/geoBoundaries-TZA-ADM1.geojson",
    "scripts/data/SOM-adm1.geojson": "https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/SOM/ADM1/geoBoundaries-SOM-ADM1.geojson",
    "scripts/data/MOZ-adm1.geojson": "https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/MOZ/ADM1/geoBoundaries-MOZ-ADM1.geojson",
    "scripts/data/IDN-adm1.geojson": "https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/IDN/ADM1/geoBoundaries-IDN-ADM1.geojson",
    "scripts/data/MYS-adm1.geojson": "https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/MYS/ADM1/geoBoundaries-MYS-ADM1.geojson",
    "scripts/data/BRN-adm1.geojson": "https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/BRN/ADM1/geoBoundaries-BRN-ADM1.geojson",
    "scripts/data/PHL-adm1.geojson": "https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/PHL/ADM1/geoBoundaries-PHL-ADM1.geojson",
    "scripts/data/PAK-adm1.geojson": "https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/PAK/ADM1/geoBoundaries-PAK-ADM1.geojson",
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
    # Indian subcontinent (500 BC – 800 AD) — the dataset uses "Hindu
    # kingdoms" / "Hindu states" as a catch-all label for whatever's
    # left after Mauryan / Kushan / Gupta empires are drawn separately.
    # Each era splits the catch-all into the historically dominant
    # polities of that period, using modern Indian states as a proxy
    # for territorial extent.
    # ===================================================================
    # NOTE: the geoBoundaries India admin-1 names carry Sanskrit-style
    # diacritics ("Bihār", "Karnātaka", "Tamil Nādu", "Rājasthān",
    # "Mahārāshtra", "Uttarākhand", "Telangāna", "Meghālaya", "Nāgāland",
    # "Jhārkhand", "Andhra Pradesh"…). Keys MUST match verbatim.
    # ===================================================================
    {
        "name": "Mahajanapadas (500 BC)",
        "era_files": ["world_bc500.geojson"],
        "lumped": "Hindu kingdoms",
        "admin": ["scripts/data/IND-adm1.geojson"],
        "name_prop": "shapeName",
        "mapping": {
            "Punjab":          ("Kuru Mahajanapada", "One of the great Vedic-age realms, north-west of the Ganges."),
            "Haryāna":         ("Kuru Mahajanapada", None),
            "Delhi":           ("Kuru Mahajanapada", None),
            "Uttar Pradesh":   ("Pancala / Kosala",  "Twin great realms of the Ganges plain — Pancala in the west, Kosala in the east around Ayodhya."),
            "Uttarākhand":     ("Pancala / Kosala",  None),
            "Rājasthān":       ("Matsya Mahajanapada", "Centred on Viratanagara in modern Rajasthan."),
            "Madhya Pradesh":  ("Avanti Mahajanapada", "Powerful central-Indian realm with capital Ujjayini."),
            "Chhattīsgarh":    ("Avanti Mahajanapada", None),
            "Gujarāt":         ("Anarta region",     "North-western coast — the Mahabharata's land of Krishna's Dwaraka."),
        },
    },
    {
        "name": "Hindu kingdoms (100 AD)",
        "era_files": ["world_100.geojson"],
        "lumped": "Hindu kingdoms",
        "admin": ["scripts/data/IND-adm1.geojson"],
        "name_prop": "shapeName",
        "mapping": {
            # North (post-Mauryan, pre-Gupta) ---------------------------------
            "Punjab":         ("Yaudheya Confederation", "Republican confederation of warriors in the north-western plains."),
            "Haryāna":        ("Yaudheya Confederation", None),
            "Uttar Pradesh":  ("Maukharis / small kingdoms", "Post-Mauryan principalities of the Ganges plain."),
            "Uttarākhand":    ("Maukharis / small kingdoms", None),
            "Rājasthān":      ("Western Satraps / Saka", "Indo-Scythian satrapies of the north-west."),
            "Gujarāt":        ("Western Satraps / Saka", None),
            "Madhya Pradesh": ("Satavahana Empire", "Deccan empire bridging north and south India."),
            "Mahārāshtra":    ("Satavahana Empire", None),
            "Andhra Pradesh": ("Satavahana Empire", None),
            "Telangāna":      ("Satavahana Empire", None),
            "Karnātaka":      ("Satavahana Empire", None),
            "West Bengal":    ("Bengal kingdoms", "Vanga and Pundra kingdoms of the Ganges delta."),
            "Odisha":         ("Kalinga", "Coastal kingdom famous for resisting Ashoka — but shown separately in dataset."),
            # South (Tamil kingdoms) ------------------------------------------
            "Tamil Nādu":     ("Chola / Pandya kingdoms", "Two of the three classical Tamil kingdoms — Chola in the centre, Pandya in the south."),
            "Kerala":         ("Chera Kingdom", "Westernmost of the three classical Tamil kingdoms."),
        },
    },
    {
        "name": "Hindu kingdoms (600 AD)",
        "era_files": ["world_600.geojson"],
        "lumped": "Hindu kingdoms",
        "admin": ["scripts/data/IND-adm1.geojson"],
        "name_prop": "shapeName",
        "mapping": {
            # North (post-Gupta successor states) -----------------------------
            "Punjab":         ("Late Gupta successors", "Petty kingdoms of the late-Gupta collapse."),
            "Haryāna":        ("Late Gupta successors", None),
            "Uttar Pradesh":  ("Maukhari Kingdom", "Centred on Kanyakubja (Kannauj); soon to fall to Harsha."),
            "Bihār":          ("Later Gupta dynasty", "Smaller successor of the imperial Guptas."),
            "Rājasthān":      ("Gurjara dynasty",     "Predecessors of the Pratiharas."),
            "Gujarāt":        ("Maitraka Kingdom",    "Western kingdom centred on Valabhi."),
            "Madhya Pradesh": ("Vakataka successors", "Local powers in the post-Vakataka Deccan."),
            "Mahārāshtra":    ("Chalukya of Vatapi",  "Powerful Deccan dynasty, soon to fight the Pallavas."),
            "Karnātaka":      ("Chalukya of Vatapi",  None),
            "Andhra Pradesh": ("Chalukya of Vatapi",  None),
            "Telangāna":      ("Chalukya of Vatapi",  None),
            "West Bengal":    ("Gauda Kingdom",       "Shashanka's kingdom of Bengal."),
            # South (Pallava / Chera) -----------------------------------------
            "Tamil Nādu":     ("Pallava Kingdom",     "Builders of Mahabalipuram; centred on Kanchipuram."),
            "Kerala":         ("Chera Kingdom",       "Continuing Tamil-era kingdom of the west coast."),
        },
    },
    {
        "name": "Hindu states (800 AD)",
        "era_files": ["world_800.geojson"],
        "lumped": "Hindu states",
        "admin": ["scripts/data/IND-adm1.geojson"],
        "name_prop": "shapeName",
        "mapping": {
            # North ----------------------------------------------------------
            "Punjab":         ("Gurjara-Pratihara",   "Northern Indian dynasty; held off Arab incursions across the Sindh."),
            "Haryāna":        ("Gurjara-Pratihara",   None),
            "Rājasthān":      ("Gurjara-Pratihara",   None),
            "Gujarāt":        ("Gurjara-Pratihara",   None),
            "Uttar Pradesh":  ("Gurjara-Pratihara",   None),
            "Madhya Pradesh": ("Gurjara-Pratihara",   None),
            "Bihār":          ("Pala Empire",         "Buddhist dynasty of Bengal and Bihar; sponsors of Nalanda."),
            "West Bengal":    ("Pala Empire",         None),
            "Jhārkhand":      ("Pala Empire",         None),
            "Odisha":         ("Eastern Ganga dynasty", "Builders of the Konark Sun Temple, in later centuries."),
            # Deccan + south -------------------------------------------------
            "Mahārāshtra":    ("Rashtrakuta Empire",  "Deccan empire of the 8th–10th centuries — the era's true superpower."),
            "Karnātaka":      ("Rashtrakuta Empire",  None),
            "Andhra Pradesh": ("Rashtrakuta Empire",  None),
            "Telangāna":      ("Rashtrakuta Empire",  None),
            "Tamil Nādu":     ("Late Pallava / early Chola", "End of Pallava power; the Cholas would soon rise to imperial heights."),
            "Kerala":         ("Chera Kingdoms",      "Smaller Chera principalities of the west coast."),
        },
    },
    # ===================================================================
    # Maya world — multiple eras of city-state patchworks. We split by
    # modern Mexican / Guatemalan / Belizean / Honduran admin-1 boundaries.
    # Same admin sources used across eras; labels change per era.
    # ===================================================================
    {
        "name": "Maya (Classic, 100 AD)",
        "era_files": ["world_100.geojson"],
        "lumped": "Maya chiefdoms and states",
        "admin": [
            "scripts/data/MEX-adm1.geojson",
            "scripts/data/GTM-adm1.geojson",
            "scripts/data/BLZ-adm1.geojson",
            "scripts/data/HND-adm1.geojson",
        ],
        "name_prop": "shapeName",
        "mapping": {
            "Chiapas":        ("Preclassic Maya (Chiapas)", "Late-Preclassic Maya cities of the western Maya world (Izapa, early Palenque)."),
            "Tabasco":        ("Preclassic Maya (Tabasco)", "Western Maya lowlands — Comalcalco area."),
            "Campeche":       ("Preclassic Maya (Calakmul region)", "Early settlements of what would become Calakmul + El Mirador."),
            "Quintana Roo":   ("Preclassic Maya (Caribbean coast)", "Eastern Maya coastal settlements."),
            "Yucatan":        ("Preclassic Maya (Yucatán)", "Earliest Yucatec Maya settlements."),
            "Petén":          ("Preclassic Maya (Petén)", "Heart of the Maya jungle — early Tikal and El Mirador region."),
            "Alta Verapaz":   ("Preclassic Maya (highland)", "Highland Maya of north Guatemala."),
            "Quiché":         ("Preclassic Maya (highland)", None),
            "Huehuetenango":  ("Preclassic Maya (highland)", None),
            "Belize":         ("Preclassic Maya (Belize)", "Early Cerros, Cuello, and Lamanai."),
            "Cayo":           ("Preclassic Maya (Belize)", None),
            "Orange Walk":    ("Preclassic Maya (Belize)", None),
            "Toledo":         ("Preclassic Maya (Belize)", None),
            "Stann Creek":    ("Preclassic Maya (Belize)", None),
            "Corozal":        ("Preclassic Maya (Belize)", None),
            "Copán":          ("Preclassic Maya (Copán region)", "Southern Maya periphery — early settlements of Copán."),
        },
    },
    {
        "name": "Maya (600 AD)",
        "era_files": ["world_600.geojson"],
        "lumped": "Maya states",
        "admin": [
            "scripts/data/MEX-adm1.geojson",
            "scripts/data/GTM-adm1.geojson",
            "scripts/data/BLZ-adm1.geojson",
            "scripts/data/HND-adm1.geojson",
        ],
        "name_prop": "shapeName",
        "mapping": {
            "Chiapas":        ("Palenque", "Classic Maya city-state famed for its temple architecture and inscriptions."),
            "Tabasco":        ("Palenque", None),
            "Campeche":       ("Calakmul", "Tikal's great rival, the 'Kingdom of the Snake'."),
            "Quintana Roo":   ("Caribbean Maya", "Coastal Maya polities along the Caribbean."),
            "Yucatan":        ("Northern Maya", "Northern lowland city-states (Dzibilchaltun, Cobá)."),
            "Petén":          ("Tikal", "Major lowland Maya city-state in modern Guatemala."),
            "Alta Verapaz":   ("Highland Maya", "Highland Maya polities of the Verapaz."),
            "Quiché":         ("Highland Maya", None),
            "Huehuetenango":  ("Highland Maya", None),
            "Belize":         ("Belize Maya city-states", "Caracol and other Belizean Maya polities."),
            "Cayo":           ("Belize Maya city-states", None),
            "Orange Walk":    ("Belize Maya city-states", None),
            "Toledo":         ("Belize Maya city-states", None),
            "Stann Creek":    ("Belize Maya city-states", None),
            "Corozal":        ("Belize Maya city-states", None),
            "Copán":          ("Copán", "Southernmost major Maya city, famous for its stelae and hieroglyphic stairway."),
        },
    },
    {
        "name": "Maya (800 AD, Terminal Classic)",
        "era_files": ["world_800.geojson"],
        "lumped": "Maya city-states",
        "admin": [
            "scripts/data/MEX-adm1.geojson",
            "scripts/data/GTM-adm1.geojson",
            "scripts/data/BLZ-adm1.geojson",
            "scripts/data/HND-adm1.geojson",
        ],
        "name_prop": "shapeName",
        "mapping": {
            "Chiapas":        ("Palenque", "Classic Maya city-state — already in decline by the late 8th c."),
            "Campeche":       ("Calakmul", "Snake kingdom; long past its peak by 800 AD."),
            "Yucatan":        ("Uxmal", "Late-Classic Puuc-style city of northern Yucatán."),
            "Quintana Roo":   ("Cobá", "Late-Classic Maya city-state of the Caribbean coast."),
            "Petén":          ("Tikal", "Lowland giant, also in decline."),
            "Alta Verapaz":   ("Highland Maya", "Pre-K'iche' highland polities."),
            "Quiché":         ("Highland Maya", None),
            "Huehuetenango":  ("Highland Maya", None),
            "Belize":         ("Caracol",  "Major Belizean Maya city-state, defeated Tikal in 562 AD."),
            "Cayo":           ("Caracol",  None),
            "Orange Walk":    ("Lamanai",  "Belize Maya city; one of the longest-occupied Maya sites."),
            "Toledo":         ("Lubaantun","Late-Classic Belizean Maya site."),
            "Stann Creek":    ("Caribbean Maya", None),
            "Corozal":        ("Cerros",   "Preclassic-Classic Belize Maya site."),
            "Copán":          ("Copán",    "Last great Classic-period king Yax Pasaj ruled here."),
        },
    },
    {
        "name": "Maya (Postclassic, 1300)",
        "era_files": ["world_1300.geojson"],
        "lumped": "Maya city-states",
        "admin": [
            "scripts/data/MEX-adm1.geojson",
            "scripts/data/GTM-adm1.geojson",
            "scripts/data/BLZ-adm1.geojson",
            "scripts/data/HND-adm1.geojson",
        ],
        "name_prop": "shapeName",
        "mapping": {
            "Chiapas":        ("Lacandon Maya", "Forest-dwelling Maya who resisted the Spanish for centuries."),
            "Tabasco":        ("Chontal Maya",  "Maritime trader Maya of the Gulf coast."),
            "Campeche":       ("Champotón",     "Postclassic Maya port-state."),
            "Yucatan":        ("Mayapán",       "Dominant Postclassic Yucatec capital, the last Maya 'state'."),
            "Quintana Roo":   ("Tulum / Cobá",  "Postclassic Yucatec city-states of the Caribbean coast."),
            "Petén":          ("Itzá",          "Last independent Maya kingdom (Nojpetén) — held out until 1697."),
            "Alta Verapaz":   ("Q'eqchi' Maya", None),
            "Quiché":         ("K'iche'",       "Highland Maya kingdom; would resist Pedro de Alvarado in 1524."),
            "Huehuetenango":  ("Mam",           "Highland Maya people of north-western Guatemala."),
            "Belize":         ("Maya city-states (Belize)", None),
            "Cayo":           ("Maya city-states (Belize)", None),
            "Orange Walk":    ("Lamanai",       "Continuously occupied through the Postclassic."),
            "Toledo":         ("Maya city-states (Belize)", None),
            "Stann Creek":    ("Maya city-states (Belize)", None),
        },
    },
    {
        "name": "Maya (Late Postclassic, 1500)",
        "era_files": ["world_1500.geojson"],
        "lumped": "Maya city-states",
        "admin": [
            "scripts/data/MEX-adm1.geojson",
            "scripts/data/GTM-adm1.geojson",
            "scripts/data/BLZ-adm1.geojson",
            "scripts/data/HND-adm1.geojson",
        ],
        "name_prop": "shapeName",
        "mapping": {
            "Chiapas":        ("Lacandon Maya", "Forest-dwelling Maya who would resist Spanish rule for centuries."),
            "Tabasco":        ("Chontal Maya",  "Gulf-coast traders; soon to meet Cortés."),
            "Campeche":       ("Champotón",     "Yucatec Maya city-state."),
            "Yucatan":        ("Mayapán successors", "After Mayapán's 1441 fall, Yucatec split into ~16 chiefdoms."),
            "Quintana Roo":   ("Ekab + Cocom", "Eastern Yucatec city-states."),
            "Petén":          ("Itzá",          "Independent Maya kingdom of Nojpetén; held out until 1697."),
            "Alta Verapaz":   ("Q'eqchi' Maya", None),
            "Quiché":         ("K'iche'",       "Conquered by Pedro de Alvarado in 1524."),
            "Huehuetenango":  ("Mam",           "Highland Maya people; allied with K'iche' against the Spanish."),
            "Belize":         ("Maya city-states (Belize)", None),
            "Cayo":           ("Maya city-states (Belize)", None),
            "Orange Walk":    ("Maya city-states (Belize)", None),
            "Toledo":         ("Maya city-states (Belize)", None),
            "Stann Creek":    ("Maya city-states (Belize)", None),
        },
    },
    # ===================================================================
    # Andean states and chiefdoms (1300) — pre-Inca Peruvian and
    # Ecuadorian polities. The Chimú Empire is drawn separately.
    # ===================================================================
    {
        "name": "Andean states and chiefdoms (1300)",
        "era_files": ["world_1300.geojson"],
        "lumped": "Andean states and chiefdoms",
        "admin": [
            "scripts/data/PER-adm1.geojson",
            "scripts/data/ECU-adm1.geojson",
        ],
        "name_prop": "shapeName",
        "mapping": {
            # Peru -----------------------------------------------------------
            "Cusco":     ("Kingdom of Cuzco", "Highland kingdom that would soon become the heart of the Inca Empire (1438+)."),
            "Apurímac":  ("Chanka",           "Highland confederation; defeated by Pachacuti Inca."),
            "Ayacucho":  ("Chanka",           None),
            "Amazonas":  ("Chachapoya",       "'Cloud forest people' of the eastern Andes."),
            "Cajamarca": ("Cajamarca Kingdom","Northern highland kingdom — soon a key Inca tributary."),
            "Huánuco":   ("Wanka",            "Central-highland Wanka confederation."),
            "Junín":     ("Wanka",            None),
            "Lima":      ("Ichma",            "Coastal kingdom around Pachacamac, the famed Andean oracle."),
            "Ica":       ("Chincha",          "Wealthy coastal kingdom famed for long-distance trade."),
            "Arequipa":  ("Coastal chiefdoms (Arequipa)", "Southern coastal polities."),
            "Ancash":    ("Highland chiefdoms (Ancash)", "Pre-Inca highland polities — heirs of Chavín and Recuay."),
            # Ecuador --------------------------------------------------------
            "Pichincha": ("Quitu / Caranqui", "Northern Andean chiefdoms of modern Ecuador."),
            "Imbabura":  ("Quitu / Caranqui", None),
            "Carchi":    ("Quitu / Caranqui", None),
            "Azuay":     ("Cañari Kingdom",   "Southern Ecuadorian kingdom of the Andes."),
            "Cañar":     ("Cañari Kingdom",   None),
            "Loja":      ("Palta",            "Southernmost Ecuadorian Andean chiefdoms."),
            "Manabí":    ("Manteño",          "Coastal Manteño culture, famed for their long-distance balsa-raft trade."),
            "Guayas":    ("Huancavilca",      "Coastal Huancavilca polities of southern Ecuador."),
            "Santa Elena": ("Huancavilca",    None),
        },
    },
    # ===================================================================
    # Greek city-states (500 BC) — three separate features (Aegean, Magna
    # Graecia in Italy, and trans-Mediterranean colonies in southern Gaul
    # / Iberia). Each polygon resolves to a different cluster of poleis;
    # one mapping handles all of them because most admin-1 keys only
    # overlap one polygon.
    # ===================================================================
    {
        "name": "Greek city-states (500 BC)",
        "era_files": ["world_bc500.geojson"],
        "lumped": "Greek city-states",
        "admin": [
            "scripts/data/GRC-adm1.geojson",
            "scripts/data/ITA-adm1.geojson",
            "scripts/data/ESP-adm1.geojson",
        ],
        "name_prop": "shapeName",
        "mapping": {
            # Aegean — modern Greek admin-1 regions. (geoBoundaries names
            # are non-standard, see scripts/data/GRC-adm1.geojson.)
            "Attica":                          ("Athens",        "Democracy + naval power; emblem of the owl of Athena."),
            "Peloponisos-W. Greece & Ionian":  ("Sparta + Corinth", "Sparta dominated the Peloponnese; Corinth held the isthmus."),
            "Thessalia-Central Greece":        ("Thebes",        "Boeotian polis; rival of both Athens and Sparta."),
            "Macedonia-Thrace":                ("Macedon + Thracian cities", "Macedon would soon absorb the rest under Philip II + Alexander."),
            "Epirus-Western Macedonia":        ("Epirote tribes", "Tribal Greek kingdoms on the Adriatic coast."),
            "Egean":                           ("Aegean islands", "Hundreds of small poleis — Naxos, Paros, Melos, Lesbos, Chios, Samos…"),
            "Crete":                           ("Cretan poleis", "Knossos, Gortyn — Doric-speaking Cretan city-states."),
            # Magna Graecia — Italian NUTS-1 regions.
            "Sud":                             ("Magna Graecia (mainland)", "Greek colonies in southern Italy — Sybaris, Croton, Taras (Tarentum), Cumae."),
            "Isole":                           ("Magna Graecia (Sicily)", "Syracuse, Akragas, Selinunte, Gela — the great Dorian colonies of Sicily."),
            # Western Mediterranean — Spanish regions for Greek colonies.
            "Cataluña/Catalunya":              ("Emporion", "Phocaean Greek colony in modern Catalonia — a key trading post."),
            "Comunitat Valenciana":            ("Greek trading colonies (Iberia)", "Hemeroskopeion and other small Phocaean outposts on the Iberian coast."),
        },
    },
    # ===================================================================
    # Swahili-coast Islamic city-states (1300 + 1500)
    # The dataset's "Islamic city-states" polygon is actually the East
    # African coast — Mogadishu / Pate / Mombasa / Kilwa / Sofala etc.
    # (NOT the post-Abbasid Middle East as the name might suggest).
    # ===================================================================
    {
        "name": "Swahili city-states (1300)",
        "era_files": ["world_1300.geojson"],
        "lumped": "Islamic city-states",
        "admin": [
            "scripts/data/SOM-adm1.geojson",
            "scripts/data/KEN-adm1.geojson",
            "scripts/data/TZA-adm1.geojson",
            "scripts/data/MOZ-adm1.geojson",
        ],
        "name_prop": "shapeName",
        "mapping": {
            # Somalia ---------------------------------------------------------
            "Banadir":       ("Mogadishu Sultanate", "Wealthiest Swahili-coast city; commanded the Indian-Ocean gold trade."),
            "Bay":           ("Somali coastal sultanates", "Patchwork of Hawiye / Ajuran emerging powers."),
            "Lower Shabelle": ("Somali coastal sultanates", None),
            "Middle Juba":   ("Somali coastal sultanates", None),
            "Lower Juba":    ("Somali coastal sultanates", None),
            "Mudug":         ("Somali coastal sultanates", None),
            "Bari":          ("Somali coastal sultanates", None),
            "Galguduud":     ("Somali coastal sultanates", None),
            # Kenya ----------------------------------------------------------
            "Lamu":          ("Pate Sultanate",       "City-state of the Lamu archipelago; Indian-Ocean trading hub."),
            "Tana River":    ("Pate Sultanate",       None),
            "Kilifi":        ("Malindi",              "Famous medieval Swahili city — visited by Zheng He's treasure fleet (1418)."),
            "Mombasa":       ("Mombasa Sultanate",    "Rival of Malindi and Kilwa; key Indian-Ocean port."),
            "Kwale":         ("Mombasa Sultanate",    None),
            # Tanzania --------------------------------------------------------
            "Tanga":         ("Northern Tanzanian Swahili cities", "Small coastal sultanates between Mombasa and Zanzibar."),
            "Pwani":         ("Bagamoyo / Kaole sultanates", "Mainland-coast Swahili settlements opposite Zanzibar."),
            "Dar es Salaam": ("Bagamoyo / Kaole sultanates", None),
            "Zanzibar Urban/West": ("Zanzibar Sultanates", "Stone Town and the Zanzibar archipelago."),
            "Zanzibar North":      ("Zanzibar Sultanates", None),
            "Zanzibar South & Central": ("Zanzibar Sultanates", None),
            "North Pemba":         ("Zanzibar Sultanates", None),
            "South Pemba":         ("Zanzibar Sultanates", None),
            "Lindi":         ("Kilwa Sultanate",      "Greatest of the Swahili sultanates — its 14th-century gold trade made it fabulously rich."),
            "Mtwara":        ("Kilwa Sultanate",      None),
            # Mozambique -----------------------------------------------------
            "Cabo Delgado":  ("Mozambique Island sultanate", "Northernmost Mozambican Swahili port."),
            "Nampula":       ("Mozambique Island sultanate", None),
            "Zambezia":      ("Sofala Sultanate",     "Gold-trade emporium serving Great Zimbabwe's mines."),
            "Sofala":        ("Sofala Sultanate",     None),
        },
    },
    {
        "name": "Swahili city-states (1500)",
        "era_files": ["world_1500.geojson"],
        "lumped": "Islamic city-states",
        "admin": [
            "scripts/data/SOM-adm1.geojson",
            "scripts/data/KEN-adm1.geojson",
            "scripts/data/TZA-adm1.geojson",
            "scripts/data/MOZ-adm1.geojson",
        ],
        "name_prop": "shapeName",
        "mapping": {
            "Banadir":       ("Mogadishu Sultanate", "Major Swahili-coast city; Portuguese fleets would soon disrupt its trade."),
            "Bay":           ("Ajuran Sultanate",    "Rising Somali power that resisted the Portuguese."),
            "Lower Shabelle": ("Ajuran Sultanate",   None),
            "Middle Juba":   ("Ajuran Sultanate",    None),
            "Lower Juba":    ("Ajuran Sultanate",    None),
            "Mudug":         ("Ajuran Sultanate",    None),
            "Lamu":          ("Pate Sultanate",      "City-state of the Lamu archipelago, still trading gold and ivory."),
            "Tana River":    ("Pate Sultanate",      None),
            "Kilifi":        ("Malindi",             "Allied with the Portuguese in 1498 — Vasco da Gama's first East-African friend."),
            "Mombasa":       ("Mombasa Sultanate",   "Rival of Malindi; sacked by the Portuguese in 1505 and 1528."),
            "Kwale":         ("Mombasa Sultanate",   None),
            "Tanga":         ("Northern Tanzanian Swahili cities", "Small coastal sultanates between Mombasa and Zanzibar."),
            "Pwani":         ("Bagamoyo / Kaole sultanates", "Mainland Swahili settlements opposite Zanzibar."),
            "Dar es Salaam": ("Bagamoyo / Kaole sultanates", None),
            "Zanzibar Urban/West": ("Zanzibar Sultanates", "Stone Town and the Zanzibar archipelago."),
            "Zanzibar North":      ("Zanzibar Sultanates", None),
            "Zanzibar South & Central": ("Zanzibar Sultanates", None),
            "North Pemba":         ("Zanzibar Sultanates", None),
            "South Pemba":         ("Zanzibar Sultanates", None),
            "Lindi":         ("Kilwa Sultanate",     "Famed for its coral-stone palaces; sacked by the Portuguese in 1505."),
            "Mtwara":        ("Kilwa Sultanate",     None),
            "Cabo Delgado":  ("Mozambique Island sultanate", "Northernmost Mozambican Swahili port — Portuguese base after 1507."),
            "Nampula":       ("Mozambique Island sultanate", None),
            "Zambezia":      ("Sofala Sultanate",    "Gold-trade emporium; the Portuguese built a factory here in 1505."),
            "Sofala":        ("Sofala Sultanate",    None),
        },
    },
    # ===================================================================
    # Malaysian Islamic states (1500) — the Muslim sultanates of
    # maritime Southeast Asia. Aceh, Malacca and a few others are drawn
    # separately by the dataset already.
    # ===================================================================
    {
        "name": "Malaysian Islamic states (1500)",
        "era_files": ["world_1500.geojson"],
        "lumped": "Malaysian Islamic states",
        "admin": [
            "scripts/data/IDN-adm1.geojson",
            "scripts/data/MYS-adm1.geojson",
            "scripts/data/BRN-adm1.geojson",
            "scripts/data/PHL-adm1.geojson",
        ],
        "name_prop": "shapeName",
        "mapping": {
            # Sumatra --------------------------------------------------------
            "North Sumatra":  ("Pasai Sultanate",     "Earliest Indonesian Muslim sultanate (founded c. 1297) — the gateway of Islam to the archipelago."),
            "West Sumatra":   ("Minangkabau realm",   "Highland matrilineal Muslim society of central Sumatra."),
            "Riau":           ("Riau-Lingga sultanates", "Strait-of-Malacca Muslim trading polities."),
            "Riau Islands":   ("Riau-Lingga sultanates", None),
            "Jambi":          ("Jambi Sultanate",     "Sumatran Malay sultanate on the Batang Hari river."),
            "South Sumatra":  ("Palembang Sultanate", "Late-Srivijaya successor; gradually Islamising in the 15th–16th c."),
            "Lampung":        ("Lampung principalities", "Patchwork of small Muslim chiefdoms in southern Sumatra."),
            "Bengkulu":       ("Bengkulu chiefdoms",  None),
            "Bangka-Belitung Islands": ("Bangka tin sultanates", None),
            # Java -----------------------------------------------------------
            "Banten":         ("Banten Sultanate",    "Rising west-Java sultanate; would soon control the Sunda Strait pepper trade."),
            "West Java":      ("Banten / Cirebon",    "West-Java Muslim sultanates — Banten and Cirebon."),
            "Jakarta Special Capital Region": ("Banten / Cirebon", None),
            "Central Java":   ("Demak Sultanate",     "First major Muslim sultanate on Java (founded c. 1475); soon to topple Majapahit."),
            "Special Region of Yogyakarta": ("Demak Sultanate", None),
            "East Java":      ("Demak Sultanate",     None),
            # Borneo / Kalimantan -------------------------------------------
            "West Kalimantan":  ("Sambas / Sukadana sultanates", "Western Kalimantan Muslim sultanates."),
            "Central Kalimantan": ("Banjar Sultanate", "Major Kalimantan Muslim sultanate centred on Banjarmasin."),
            "South Kalimantan": ("Banjar Sultanate",   None),
            "East Kalimantan":  ("Kutai Sultanate",    "East Kalimantan Muslim sultanate."),
            "North Kalimantan": ("Brunei satellites",  "Northern Kalimantan, under Brunei's expanding influence."),
            # Sulawesi -------------------------------------------------------
            "South Sulawesi":   ("Gowa-Tallo Sultanate", "Rising Bugis-Makassar twin sultanate of southern Sulawesi."),
            "Central Sulawesi": ("Sulawesi chiefdoms",   "Mostly still pre-Islamic in 1500; would Islamise in the 17th c."),
            "Southeast Sulawesi": ("Buton Sultanate",   "Small Muslim sultanate of south-east Sulawesi."),
            "West Sulawesi":    ("Mandar chiefdoms",    "Mandar coastal chiefdoms."),
            "North Sulawesi":   ("Minahasa / Gorontalo", "Northern Sulawesi chiefdoms."),
            "Gorontalo":        ("Minahasa / Gorontalo", None),
            # Maluku ---------------------------------------------------------
            "Maluku":         ("Ternate / Tidore Sultanates", "Rival Spice-Islands sultanates that controlled the world clove trade."),
            "North Maluku":   ("Ternate / Tidore Sultanates", None),
            # Lesser Sundas + Papua -----------------------------------------
            "West Nusa Tenggara": ("Bima Sultanate",   "Eastern Indonesian Muslim sultanate on Sumbawa."),
            "East Nusa Tenggara": ("Solor / Larantuka", "Mixed Muslim and Catholic chiefdoms after Portuguese arrival."),
            "Bali":           ("Hindu Bali (Gelgel)",  "Bali remained Hindu — last hold-out of pre-Islamic Java."),
            "Papua":          ("Papuan coastal chiefdoms", "Bird's-head Papua under loose Ternate / Tidore tribute."),
            "West Papua":     ("Papuan coastal chiefdoms", None),
            # Brunei + Sulu --------------------------------------------------
            "Brunei-Muara":   ("Brunei Sultanate",    "Brunei at its greatest extent — controlled much of Borneo and the Sulu Sea."),
            "Belait":         ("Brunei Sultanate",    None),
            "Temburong":      ("Brunei Sultanate",    None),
            "Tutong":         ("Brunei Sultanate",    None),
            # Philippines ----------------------------------------------------
            "ARMM":           ("Sulu Sultanate",      "Muslim sultanate of the Sulu archipelago; Brunei's southern rival."),
            "Zamboanga Peninsula": ("Sulu Sultanate", None),
            # Malaysia (mainland + Borneo) — Malacca is shown separately in
            # the dataset; only the Borneo Malaysian provinces remain
            # here for this lumped polygon.
            "Sabah":          ("Brunei Sultanate",    None),
            "Sarawak":        ("Brunei Sultanate",    None),
        },
    },
    # ===================================================================
    # Indian Muslim sultanates (1500) — the dataset draws three separate
    # "Islamic states" polygons in India: Sindh, Gujarat, and the Deccan.
    # ===================================================================
    {
        "name": "Indian Muslim sultanates (1500)",
        "era_files": ["world_1500.geojson"],
        "lumped": "Islamic states",
        "admin": [
            "scripts/data/PAK-adm1.geojson",
            "scripts/data/IND-adm1.geojson",
        ],
        "name_prop": "shapeName",
        "mapping": {
            # Sindh / Baluchistan polygon (Pakistan) --------------------------
            "Sindh":          ("Samma dynasty (Sindh Sultanate)", "Muslim Sindhi dynasty centred on Thatta; would soon fall to the Arghuns."),
            "Balochistan":    ("Baluch tribal confederations", "Tribal Baluch and Makran polities."),
            "Punjab":         ("Punjab marches (Delhi Sultanate frontier)", "Western frontier of the Lodi Delhi Sultanate."),
            # Gujarat polygon (India) ----------------------------------------
            "Gujarāt":        ("Gujarat Sultanate (Muzaffarid)", "Wealthy maritime Muslim sultanate — its capital Ahmedabad was one of India's largest cities."),
            # Deccan polygon (India) — Bahmani breakup states ---------------
            "Mahārāshtra":    ("Ahmadnagar Sultanate", "Nizam Shahi dynasty, declared independent from Bahmani in 1490."),
            "Karnātaka":      ("Bijapur Sultanate",    "Adil Shahi dynasty — would build the Gol Gumbaz and rule Karnataka for two centuries."),
            "Telangāna":      ("Bidar Sultanate",      "Barid Shahi dynasty centred on Bidar's massive fort."),
            "Andhra Pradesh": ("Golkonda Sultanate",   "Qutb Shahi dynasty famed for its diamond mines — Hyderabad's founders."),
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
        # Some lumped NAMEs appear as multiple disjoint features (e.g.,
        # "Greek city-states" — one per region — or "Hindu kingdoms" with
        # separate north/south polygons). Process every matching feature.
        indices = [
            i for i, ft in enumerate(era["features"])
            if ft["properties"].get("NAME") == split["lumped"]
        ]
        if not indices:
            print(f"  · {era_file}: no '{split['lumped']}' feature (already split?)")
            continue
        all_new_features: list[dict] = []
        for idx in indices:
            lumped_feat = era["features"][idx]
            lumped_shape = shape(lumped_feat["geometry"])
            for hist_name, geom in polity_union.items():
                inter = geom.intersection(lumped_shape)
                if inter.is_empty:
                    continue
                inter = inter.buffer(0)
                all_new_features.append({
                    "type": "Feature",
                    "properties": {
                        "NAME": hist_name,
                        "SUBJECTO": None,
                        "PARTOF": None,
                        "BORDERPRECISION": lumped_feat["properties"].get("BORDERPRECISION"),
                    },
                    "geometry": mapping(inter),
                })
        if not all_new_features:
            print(f"  ! {era_file}: no intersections — admin mapping doesn't cover this lumped area")
            continue
        # Remove every lumped feature from highest index to lowest, then
        # append the new features at the end. Order doesn't affect rendering.
        for idx in sorted(indices, reverse=True):
            era["features"].pop(idx)
        era["features"].extend(all_new_features)
        json.dump(era, open(era_path, "w"))
        named = sorted({f['properties']['NAME'] for f in all_new_features})
        print(f"  ✓ {era_file}: replaced {len(indices)}× '{split['lumped']}' with {len(all_new_features)} features ({', '.join(named)})")


if __name__ == "__main__":
    for split in PATCHWORK_SPLITS:
        run_split(split)
