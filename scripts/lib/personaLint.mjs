// Country Personas — the ONE copy lint for persona names, lines and descriptions. The owner-review
// tool (scripts/country-personas/review.mjs), the generator and the check all use it, so a word
// that is banned in review can never slip through at build time.

// Names and one-line descriptions: no value judgements, no places, no religions or ethnicities.
export const BANNED = ["poor", "developing", "developed", "third world", "backward", "failed", "failing", "rogue", "elite",
  "primitive", "civilised", "civilized", "corrupt", "dictatorship", "fragile", "western", "eastern", "northern",
  "southern", "christian", "muslim", "islamic", "catholic", "hindu", "buddhist", "jewish", "arab", "african", "asian",
  "european", "latin", "anglo", "slavic", "nordic", "gulf", "caribbean", "pacific", "island", "tribal", "emerging"];
export const RELIGION_WORDS = ["christian", "christians", "muslim", "muslims", "hindu", "hindus", "buddhist", "buddhists",
  "jewish", "jews"];
const REGIONS = ["africa", "asia", "europe", "america", "americas", "oceania", "middle east", "balkan", "balkans", "sahel",
  "maghreb", "levant", "scandinavia", "latin america", "west indies"];
// English names the app's own country list does not use (it says "Naoero", "Türkiye", "Côte d’Ivoire" …)
const ALT_NAMES = ["nauru", "turkey", "ivory coast", "burma", "swaziland", "czech republic", "east timor", "cape verde",
  "holland", "britain", "great britain", "england", "scotland", "wales", "korea", "vatican", "persia", "siam", "zaire"];

const escape = (w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const has = (text, word) => new RegExp(`\\b${escape(word)}\\b`, "i").test(text);

/**
 * Lint one persona's copy.
 *   names     — English country names (the snapshot's), for the place check
 *   template  — the description as written, with tokens
 */
export function lintCopy(code, name, line, template, names = []) {
  const errs = [];
  const places = [...REGIONS, ...ALT_NAMES, ...names.map((n) => n.toLowerCase())];
  for (const w of BANNED) if (has(`${name} ${line}`, w)) errs.push(`${code}: banned term "${w}" in its name or line`);
  for (const w of places) if (has(`${name} ${line}`, w)) errs.push(`${code}: place name "${w}" in its name or line`);
  const prose = template.replace(/\{[^}]+\}/g, "");
  for (const w of BANNED.filter((b) => !RELIGION_WORDS.includes(b))) if (has(prose, w)) errs.push(`${code}: banned term "${w}" in its description`);
  for (const w of places) if (has(prose, w)) errs.push(`${code}: place name "${w}" in its description`);
  // a religion may be named in a description only in a sentence that quotes its Pew share
  for (const sentence of template.split(/(?<=[.!?])\s+/)) {
    if (RELIGION_WORDS.some((w) => has(sentence.replace(/\{[^}]+\}/g, ""), w)) && !/\{(range|between|median|min|max):rel_/.test(sentence)) {
      errs.push(`${code}: a religion is named without its sourced share ("${sentence.slice(0, 60)}…")`);
    }
  }
  const all = `${name} ${line} ${prose}`;
  if (/\b[A-Z]{2}\b/.test(all)) errs.push(`${code}: ISO-code-looking token "${all.match(/\b[A-Z]{2}\b/)[0]}"`);
  // index names never say "Global" (CLAUDE.md "Index labels"; check-index-labels.mjs)
  const global = `${all} ${template}`.match(/\bGlobal(?: [A-Z][a-z]+)+ Index\b/);
  if (global) errs.push(`${code}: "${global[0]}" — index names drop "Global" (say "${global[0].replace(/^Global /, "")}")`);
  if (name.split(/\s+/).length > 6) errs.push(`${code}: name longer than 6 words`);
  return errs;
}

// World Bank income groups, as the snapshot spells them.
const L = "Low income";
const LM = "Lower middle income";
const UM = "Upper middle income";
const H = "High income";
// Most specific phrase first; each match is removed before the next is tried, so "middle- and
// high-income" is not also read as "high-income".
const INCOME_PHRASES = [
  [/\bmiddle- and high-income\b/gi, [LM, UM, H]],
  [/\blow- and lower-middle-income\b/gi, [L, LM]],
  [/\bupper-middle-income\b/gi, [UM]],
  [/\blower-middle-income\b/gi, [LM]],
  [/\bmiddle-income\b/gi, [LM, UM]],
  [/\bhigh-income\b/gi, [H]],
  [/\b(very low|lowest|low)-income\b/gi, [L]],
  [/\b(very )?wealthy\b|\bprosperous\b|\baffluent\b|(?<!resource-)\brich\b/gi, [H]],
];

/**
 * An income-class word ("high-income", "middle-income", "wealthy" …) is a claim about EVERY member:
 * it must hold for each one under the World Bank classification in the snapshot. "lower-income" is
 * refused outright — it is not a World Bank group and cannot be checked.
 *   levels — each member's World Bank income group
 */
export function incomeClaimErrors(code, text, levels) {
  const errs = [];
  let rest = text.replace(/\{[^}]+\}/g, "");
  if (/\blower-income\b/i.test(rest)) errs.push(`${code}: "lower-income" is not a World Bank income group — say which group, or give the figures`);
  for (const [re, allowed] of INCOME_PHRASES) {
    const hits = rest.match(re);
    if (!hits) continue;
    const off = levels.filter((l) => !allowed.includes(l));
    if (off.length) errs.push(`${code}: "${hits[0]}" does not hold for every member (World Bank groups: ${[...new Set(levels)].join(", ")})`);
    rest = rest.replace(re, " ");
  }
  return errs;
}
