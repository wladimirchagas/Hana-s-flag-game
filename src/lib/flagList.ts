/**
 * Shared types + helpers for the flag-grid section under the Learn map.
 *
 * A "flag list entry" is the minimal shape we need to render a polity in
 * the grid: its stable id (country code for modern, NAME for historical),
 * display name, flag URL, and continent / subcontinent classifications
 * used by the sort + grouping toggles.
 */

export type FlagListEntry = {
  /** Stable identifier — country alpha-2 code for modern, polity NAME for historical. */
  id: string;
  /** Display name. */
  name: string;
  /** Resolved flag URL (absolute http URL or /-prefixed asset path). null when no flag. */
  flag: string | null;
  /** Top-level region — one of "Africa", "Americas", "Asia", "Europe", "Oceania", or "Other"/"Global". */
  continent: string;
  /** Detailed region (e.g., "Northern Africa", "South-Eastern Asia", "Mediterranean", "South Asia"). */
  subcontinent: string;
  /** Optional list of shape / motif tags ("cross", "stars", "stripes", …)
   *  used by the flag grid's "By shape" grouping. A flag with several
   *  notable motifs gets several tags and shows up under each category. */
  shapes?: readonly string[];
  /** Optional list of family tags ("pan-african", "pan-arab", "nordic-cross",
   *  …) used by the flag grid's "By family" grouping. */
  families?: readonly string[];
  /** Optional list of dominant-colour tags ("red", "blue", "green", …) used
   *  by the flag grid's "By colour" grouping. Multi-tag — most flags carry
   *  several. */
  colors?: readonly string[];
};

/**
 * Map a fine-grained registry / REST-Countries region label to one of the
 * five top-level continents (plus "Global" / "Other" buckets). Used by
 * the FlagGrid's "by continent" toggle so historical labels like
 * "Mesoamerica" / "Eastern Mediterranean" / "Eurasian Steppe" still
 * roll up under a recognisable Africa / Americas / Asia / Europe header.
 */
export function topLevelContinent(label: string | undefined): string {
  if (!label) return "Other";
  const l = label.toLowerCase();
  if (l === "global") return "Global";
  // Africa — straightforward; "East African coast" is the Swahili-coast bucket.
  if (l.includes("africa") || l.includes("nubia")) return "Africa";
  // Americas — North + South + Mesoamerica + Caribbean.
  if (
    l.includes("america") ||
    l.includes("mesoamerica") ||
    l.includes("caribbean")
  ) {
    return "Americas";
  }
  // Asia + the various Asia-adjacent labels we use in the historical registry.
  if (
    l.includes("asia") ||
    l.includes("middle east") ||
    l.includes("anatolia") ||
    l.includes("mesopotamia") ||
    l.includes("levant") ||
    l.includes("arabia") ||
    l.includes("eurasia") ||
    l.includes("eurasian steppe")
  ) {
    return "Asia";
  }
  // Europe + sub-region labels we use for European historical entities.
  if (
    l.includes("europe") ||
    l === "iberia" ||
    l === "italy" ||
    l.includes("mediterranean")
  ) {
    return "Europe";
  }
  if (l.includes("oceania") || l.includes("polynesia") || l.includes("micronesia") || l.includes("melanesia")) {
    return "Oceania";
  }
  return "Other";
}

/**
 * Stable ordering used for continent group headings. Other labels (and
 * the "Global" / "Other" buckets) sort to the end alphabetically.
 */
export function continentOrder(label: string): number {
  switch (label) {
    case "Africa":   return 0;
    case "Americas": return 1;
    case "Asia":     return 2;
    case "Europe":   return 3;
    case "Oceania":  return 4;
    case "Global":   return 5;
    default:         return 6;
  }
}
