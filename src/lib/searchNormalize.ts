/**
 * Normalise a string for accent-insensitive search matching: lowercase, strip
 * diacritics (São → sao, Curaçao → curacao), fold the handful of special
 * letters NFD doesn't decompose (ø, ł, đ, æ, œ, ß) and unify apostrophes,
 * so "sao" matches "São Paulo" and "cote d'ivoire" matches "Côte d'Ivoire".
 */
export function normalizeForSearch(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // combining diacritical marks
    .replace(/ø/g, "o") // ø
    .replace(/ł/g, "l") // ł
    .replace(/đ/g, "d") // đ
    .replace(/æ/g, "ae") // æ
    .replace(/œ/g, "oe") // œ
    .replace(/ß/g, "ss") // ß
    .replace(/[’ʻʼ`]/g, "'"); // ’ ʻ ʼ `
}
