/**
 * Central-bank logo quality gates — shared by harvest, download, build, and check.
 *
 * Wikidata P154 is often wrong: it may point at a headquarters photo, a street
 * sign, a banknote vignette, or a meeting photo instead of the brand mark.
 * Filenames and source URLs that look like photographs / notes / buildings must
 * never be accepted as logos (Guatemala 2026-09: building photo shipped as
 * "Bank of Guatemala" logo).
 */

/** Commons / Wikipedia filenames that are clearly not a brand mark. */
export const PHOTO_LIKE_NAME =
  /\b(reunión|reunion|reuni[oó]n|transici[oó]n|autoridades|meeting|cropped|building|sede|headquarters|fachada|edificio|photo|photograph|skylt|skyltskylt|banknote|obverse|reverse|currency\b|bill\b|note\b|plaza|street|exterior|interior|office|campus|fa[cç]ade|entrada|frontis|palacio|casa\s+central|hq\b|tower|skyscraper|aerial|panorama|staff\b|ceremony|inaugurat)/i;

/** Extra hard blocklist — exact Commons filenames known to be wrong. */
export const BAD_COMMONS_LOGO_FILES = new Set([
  // German bus operator Regionalbus Augsburg — NOT the Reserve Bank of Australia
  "Logo_RBA.svg",
  "Logo RBA.svg",
  // Building / event / note — never the bank brand
  "Autoridades de BANGUAT realizan reunión de transición 20231023 (cropped).jpg",
  "Autoridades_de_BANGUAT_realizan_reunión_de_transición_20231023_(cropped).jpg",
  "Riksbanken skylt.jpg",
  "Riksbanken_skylt.jpg",
  "Zimbabwe $25m 2008 Obverse (cropped).jpg",
  "Zimbabwe_$25m_2008_Obverse_(cropped).jpg",
]);

/** National-flag / arms collision names (not the bank brand). */
export const NON_BRAND_NAME =
  /\b(flag of|emblem of|coat of arms|seal of the united states|federal reserve note seal|emirate|national emblem|regionalbus)\b/i;

/**
 * True when a Commons / Wikipedia filename must not be treated as a logo.
 * @param {string | null | undefined} filename
 */
export function isRejectedLogoFilename(filename) {
  if (!filename || typeof filename !== "string") return false;
  const bare = filename.replace(/^File:/i, "").trim();
  if (BAD_COMMONS_LOGO_FILES.has(bare) || BAD_COMMONS_LOGO_FILES.has(bare.replace(/ /g, "_"))) {
    return true;
  }
  if (PHOTO_LIKE_NAME.test(bare)) return true;
  if (NON_BRAND_NAME.test(bare)) return true;
  return false;
}

/**
 * True when a source URL points at a photo-like / non-brand file.
 * @param {string | null | undefined} url
 */
export function isRejectedLogoSource(url) {
  if (!url || typeof url !== "string") return false;
  try {
    const u = new URL(url);
    const path = decodeURIComponent(u.pathname);
    const file = path.split("/").pop() || "";
    return isRejectedLogoFilename(file);
  } catch {
    return isRejectedLogoFilename(url);
  }
}

/**
 * Explainer prose that admits the image is a photo / note / building.
 * Negations ("not a photograph of…") are allowed — those are correct warnings.
 * @param {string | null | undefined} text
 */
export function isRejectedLogoExplainer(text) {
  if (!text || typeof text !== "string") return false;
  if (/\bnot\s+(a\s+)?(photograph|photo|banknote|building|street\s+sign)\b/i.test(text)) {
    return false;
  }
  return /\b(reunión|reunion|autoridades|obverse of a (paper )?banknote|this is the obverse|headquarters photo|street sign|skylt|photograph of the|photo of the|meeting of)\b/i.test(
    text,
  );
}
