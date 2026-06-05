#!/usr/bin/env python3
"""
Download historical flag images from Wikimedia Commons and convert SVG → PNG.

This script maps every flag used in public/historical-flags/ to its exact
Wikimedia Commons source file, downloads the SVG, and converts it to a
320 × 192 px PNG using cairosvg.

Run locally (where Wikimedia is accessible) or via GitHub Actions:

    pip install cairosvg requests
    python3 scripts/download_historical_flags.py

Options:
    --force          Re-download files that already exist
    --only name,...  Download only the named output files (comma-separated)
    --list           List all flag mappings and exit
"""

import sys
import os
import hashlib
import urllib.request
import urllib.parse
import urllib.error
import json
import time
import tempfile
import argparse
from pathlib import Path

try:
    import cairosvg
except ImportError:
    print("cairosvg not installed. Run: pip install cairosvg", file=sys.stderr)
    sys.exit(1)

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

OUTPUT_DIR = Path(__file__).parent.parent / "public" / "historical-flags"
OUTPUT_WIDTH = 320
OUTPUT_HEIGHT = 192

# Base URLs for Wikimedia Commons
WIKIMEDIA_API = "https://commons.wikimedia.org/w/api.php"
WIKIMEDIA_UPLOAD = "https://upload.wikimedia.org/wikipedia/commons"

# ---------------------------------------------------------------------------
# Flag mappings: local filename → Wikimedia Commons file name
#
# These are the exact filenames as they appear on Wikimedia Commons
# (without the "File:" prefix). Spaces should be underscores.
# ---------------------------------------------------------------------------

FLAG_MAPPINGS: dict[str, str] = {
    # =========================================================================
    # Flags that were previously wrong / placeholder — HIGH PRIORITY
    # =========================================================================

    # Empire of Brazil (1822–1853): green flag with imperial coat of arms
    # Source: https://commons.wikimedia.org/wiki/File:Flag_of_Brazil_(1822–1853).svg
    "empire-of-brazil.png": "Flag_of_Brazil_(1822–1853).svg",

    # Qing dynasty / Manchu Empire: the Yellow Dragon Banner (adopted 1889)
    # Used for 1850/1914 eras (Qing; in 1914 the dataset keeps "Manchu Empire"
    # even though the ROC replaced it — but the yellow dragon is most iconic).
    # Source: https://commons.wikimedia.org/wiki/File:Flag_of_the_Qing_dynasty_(1889).svg
    "qing-dynasty.png": "Flag_of_the_Qing_dynasty_(1889).svg",

    # =========================================================================
    # Flags used in 1500–1815 eras
    # =========================================================================

    # France Bourbon: white royal standard with fleur-de-lis (used pre-1830)
    "france-bourbon.png": "Pavillon_royal_de_France.svg",

    # Spain Cross of Burgundy (Habsburg Spain, used 1506–1701)
    "spain-burgundy.png": "Flag_of_Cross_of_Burgundy.svg",

    # Spain 1785 flag: red-yellow-red tricolour adopted by Charles III
    "spain-1785.png": "Flag_of_Spain_(1785-1873,_1875-1931).svg",

    # Ottoman Empire: red with white crescent and star (adopted 1844)
    "ottoman-empire.png": "Flag_of_the_Ottoman_Empire_(1844-1922).svg",

    # Russian Empire: white-blue-red tricolour
    "russian-empire.png": "Flag_of_Russia.svg",

    # Austrian Empire: black-and-yellow Habsburg colours (1804–1867)
    "austrian-empire.png": "Civil_Ensign_of_Austria_(1869–1918).svg",

    # Rattanakosin Siam: red field with white elephant (pre-1917)
    "siam.png": "Flag_of_Thailand_(until_1855).svg",

    # Portuguese UKPBA flag: United Kingdom of Portugal, Brazil and Algarves
    "ukpba.png": "Flag_of_the_United_Kingdom_of_Portugal,_Brazil_and_the_Algarves.svg",

    # =========================================================================
    # 19th–20th century flags
    # =========================================================================

    # Austria-Hungary: dual monarchy flag (1869–1918)
    "austria-hungary.png": "Flag_of_Austria-Hungary_(1869-1918).svg",

    # German Empire (Kaiserreich): black-white-red tricolour
    "german-empire.png": "Flag_of_the_German_Empire.svg",

    # USSR: red flag with hammer, sickle and star
    "ussr.png": "Flag_of_the_Soviet_Union.svg",

    # Yugoslavia (SFRY): red-white-blue with central red star
    "yugoslavia.png": "Flag_of_SFR_Yugoslavia.svg",

    # Czechoslovakia: white-red-blue with blue triangle
    "czechoslovakia.png": "Flag_of_Czechoslovakia.svg",

    # Zaire: green with yellow arm-and-torch (Mobutu era, 1971–1997)
    "zaire.png": "Flag_of_Zaire.svg",

    # Republic of China (ROC): blue-sky/white-sun on red (adopted 1928; used 1928–present)
    "roc.png": "Flag_of_the_Republic_of_China.svg",

    # Republic of China Five-Colored Flag (1912–1928): the flag the ROC actually
    # used from its founding in 1912 until the Nationalists standardised the
    # blue-sky flag in 1928.  Five equal horizontal bands: red, yellow, blue,
    # white, black — representing the Han, Manchu, Mongol, Hui, and Tibetan peoples.
    "roc-1912.png": "Flag_of_the_Republic_of_China_(1912–1928).svg",

    # Egypt Khedivate / Kingdom: red with white crescent and 3 stars
    "egypt-khedive.png": "Flag_of_Egypt_(1882-1952).svg",

    # Abyssinia / Ethiopia (1897–1936): green-yellow-red with Lion of Judah
    "abyssinia.png": "Flag_of_Ethiopia_(1897-1936).svg",

    # United States 15-star flag (1795–1818): the Star-Spangled Banner
    "us-15star.png": "Flag_of_the_United_States_(1795-1818).svg",

    # Union of Burma (1948–1974): red with blue canton and 6 stars
    "burma-1948.png": "Flag_of_Burma_(1948-1974).svg",

    # Dominion of Ceylon (1948–1972): lion with bo-leaves, saffron and green
    "ceylon.png": "Flag_of_Ceylon_(1948–1972).svg",

    # =========================================================================
    # Roman / ancient era
    # =========================================================================

    # Roman Empire: SPQR vexillum (no surviving flag; this is a reconstructed
    # vexillum used as a conventional symbol)
    "roman-empire.png": "Vexillum_of_the_Roman_Empire.svg",

    # Parthian Empire: Arsacid dynasty standard
    "parthian-empire.png": "Flag_of_Arsacid_Empire.svg",

    # =========================================================================
    # British Penang (BEIC): East India Company ensign
    # =========================================================================

    "penang.png": "British_East_India_Company_Flag_(1801).svg",

    # =========================================================================
    # Brunei Sultanate (pre-1906): plain yellow flag
    # =========================================================================

    "brunei-1815.png": "Flag_of_Brunei_(before_1906).svg",

    # =========================================================================
    # Malay sultanate flags (used for 1815/1850 eras)
    # These flags are the modern Malaysian state flags, which directly descend
    # from the historical sultanate standards.
    # =========================================================================

    "johor.png":          "Flag_of_Johor.svg",
    "kedah.png":          "Flag_of_Kedah.svg",
    "kelantan.png":       "Flag_of_Kelantan.svg",
    "negeri-sembilan.png":"Flag_of_Negeri_Sembilan.svg",
    "pahang.png":         "Flag_of_Pahang.svg",
    "perak.png":          "Flag_of_Perak.svg",
    "perlis.png":         "Flag_of_Perlis.svg",
    "selangor.png":       "Flag_of_Selangor.svg",
    "terengganu.png":     "Flag_of_Terengganu.svg",

    # =========================================================================
    # NEW flags to add for better era coverage (1300–1700)
    # =========================================================================

    # England (1500/1700 era): Cross of St George — the national flag before
    # the Act of Union 1707 created the Union Jack
    "england-stgeorge.png": "Flag_of_England.svg",

    # Portugal (medieval / early-modern era): the Quinas banner
    # The traditional five shields design dates back to the 12th century
    "portugal-1500.png": "Flag_of_Portugal_(1830).svg",

    # Dutch Republic (1700 era): Prince's Flag / Dutch tricolour
    "dutch-republic.png": "Flag_of_the_Netherlands.svg",

    # Holy Roman Empire: imperial double-headed eagle banner
    "holy-roman-empire.png": "Banner_of_the_Holy_Roman_Emperor_(after_1400).svg",

    # Republic of Venice (Most Serene Republic): gold/red with Lion of St Mark
    "venice.png": "Flag_of_Most_Serene_Republic_of_Venice.svg",

    # Polish-Lithuanian Commonwealth (1569–1795)
    "poland-lithuania.png": "Flag_of_Polish-Lithuanian_Commonwealth.svg",

    # Ayutthaya Kingdom (Thai kingdom, 1351–1767): different from Rattanakosin
    "ayutthaya.png": "Flag_of_Thailand_(Ayutthaya_period).svg",

    # Shogunate Japan (1300/1500 era): used various Ashikaga/Sengoku banners
    # Best approximation: the Hinomaru (used since medieval era)
    "japan-shogunate.png": "Hinomaru.svg",

    # Denmark (medieval): Dannebrog is one of the world's oldest flags
    # (already using modernName: Denmark for most eras — this entry allows
    #  showing the Dannebrog explicitly for pre-modern eras if needed)
    # Skipped — already covered via MODERN_NAME_ALIASES["Denmark-Norway"]

    # Mughal Empire: the red/green crescent-and-star standard
    "mughal-empire.png": "Flag_of_the_Mughal_Empire.svg",

    # Byzantine Empire (Eastern Roman): purple/gold imperial labarum
    "byzantine-empire.png": "Palaiologos_dynasty_flag.svg",

    # Mali Empire: no official flag survives — skipped
    # Songhai Empire: no official flag survives — skipped

    # Caliphates (Abbasid, Umayyad): no surviving official flags — skipped

    # Sweden (pre-1814): the Swedish cross flag is essentially unchanged since
    # the 16th century — covered via modernName: Sweden

    # Swiss Confederation: the white-cross-on-red has been in use since the
    # 14th century — covered via modernName: Switzerland
}

# ---------------------------------------------------------------------------
# Helper functions
# ---------------------------------------------------------------------------

def get_wikimedia_direct_url(filename: str) -> str:
    """Build the direct upload URL for a Wikimedia Commons file using MD5 hash."""
    name = filename.replace(" ", "_")
    md5 = hashlib.md5(name.encode("utf-8")).hexdigest()
    encoded = urllib.parse.quote(name, safe="")
    return f"{WIKIMEDIA_UPLOAD}/{md5[0]}/{md5[0:2]}/{encoded}"


def get_wikimedia_url_via_api(filename: str) -> str | None:
    """Use the Wikimedia Commons API to get the direct file URL."""
    params = {
        "action": "query",
        "titles": f"File:{filename}",
        "prop": "imageinfo",
        "iiprop": "url",
        "format": "json",
    }
    url = WIKIMEDIA_API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": "HistoricalFlagsBot/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            data = json.load(r)
            pages = data.get("query", {}).get("pages", {})
            for page in pages.values():
                imageinfo = page.get("imageinfo", [])
                if imageinfo:
                    return imageinfo[0].get("url")
    except Exception as e:
        print(f"  API lookup failed for {filename}: {e}", file=sys.stderr)
    return None


def download_svg(url: str) -> bytes | None:
    """Download a file from a URL, returning its bytes or None on failure."""
    req = urllib.request.Request(url, headers={
        "User-Agent": "HistoricalFlagsBot/1.0",
        "Accept": "*/*",
    })
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.read()
    except urllib.error.HTTPError as e:
        print(f"  HTTP {e.code}: {url}", file=sys.stderr)
    except Exception as e:
        print(f"  Error: {e}: {url}", file=sys.stderr)
    return None


def svg_to_png(svg_bytes: bytes, output_path: Path) -> bool:
    """Convert SVG bytes to PNG at the configured dimensions."""
    try:
        cairosvg.svg2png(
            bytestring=svg_bytes,
            write_to=str(output_path),
            output_width=OUTPUT_WIDTH,
            output_height=OUTPUT_HEIGHT,
        )
        return True
    except Exception as e:
        print(f"  SVG→PNG conversion failed: {e}", file=sys.stderr)
        return False


def process_flag(output_name: str, wikimedia_name: str, force: bool) -> bool:
    """Download one flag and convert it to PNG. Returns True on success."""
    output_path = OUTPUT_DIR / output_name
    if output_path.exists() and not force:
        print(f"  SKIP  {output_name} (exists; use --force to re-download)")
        return True

    print(f"  GET   {output_name}  ←  {wikimedia_name}")

    # Try the Wikimedia Commons API first (gives the canonical URL)
    svg_url = get_wikimedia_url_via_api(wikimedia_name)
    if not svg_url:
        # Fall back to computing the hash-based URL directly
        svg_url = get_wikimedia_direct_url(wikimedia_name)
        print(f"        (API failed, trying direct: {svg_url})")

    svg_bytes = download_svg(svg_url)
    if not svg_bytes:
        print(f"  FAIL  {output_name}: could not download SVG", file=sys.stderr)
        return False

    if not svg_bytes.lstrip().startswith(b"<"):
        print(f"  FAIL  {output_name}: response doesn't look like SVG", file=sys.stderr)
        return False

    if not svg_to_png(svg_bytes, output_path):
        return False

    size = output_path.stat().st_size
    print(f"  OK    {output_name} ({size:,} bytes)")
    return True


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--force", action="store_true",
                        help="Re-download files that already exist")
    parser.add_argument("--only", metavar="NAME,...",
                        help="Download only these output files (comma-separated)")
    parser.add_argument("--list", action="store_true",
                        help="List all flag mappings and exit")
    args = parser.parse_args()

    if args.list:
        print(f"{'Output file':<35}  {'Wikimedia Commons source'}")
        print("-" * 80)
        for out, wiki in sorted(FLAG_MAPPINGS.items()):
            print(f"{out:<35}  {wiki}")
        return 0

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    if args.only:
        requested = set(n.strip() for n in args.only.split(","))
        mappings = {k: v for k, v in FLAG_MAPPINGS.items() if k in requested}
        missing = requested - set(mappings.keys())
        if missing:
            print(f"Unknown flag names: {', '.join(sorted(missing))}", file=sys.stderr)
            return 1
    else:
        mappings = FLAG_MAPPINGS

    print(f"Downloading {len(mappings)} flag(s) to {OUTPUT_DIR}/")
    print()

    ok = fail = skip = 0
    for output_name, wikimedia_name in sorted(mappings.items()):
        result = process_flag(output_name, wikimedia_name, args.force)
        if result:
            ok += 1
        else:
            fail += 1
        # Be a good citizen — don't hammer Wikimedia
        time.sleep(0.5)

    print()
    print(f"Done: {ok} succeeded, {fail} failed, {skip} skipped")
    return 0 if fail == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
