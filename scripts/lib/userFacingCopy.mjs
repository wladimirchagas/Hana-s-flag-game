/**
 * Shared detectors for technical / agent-diagnostic leakage in strings that
 * Learn-mode renders to the user (noImageReason and siblings).
 *
 * Research evidence belongs in sources[], licenceNote, comments, or a
 * non-rendered researchNote — never in copy that NationalFlagDetails,
 * CentralBankDetails, PoliticalPartyDetails, etc. paint on screen.
 */

/** @typedef {{ id: string, label: string, re: RegExp }} LeakPattern */

/** @type {LeakPattern[]} */
export const USER_FACING_LEAK_PATTERNS = [
  {
    id: "wikidata_qid",
    label: "Wikidata Q-id (e.g. Q1506724)",
    re: /\bQ\d{2,}\b/,
  },
  {
    id: "wikidata_property",
    label: "Wikidata property code (e.g. P154, P17)",
    re: /\bP\d{2,}\b/,
  },
  {
    id: "raw_url",
    label: "raw http(s) URL inside gap copy (link from Website / sources instead)",
    re: /https?:\/\//i,
  },
  {
    id: "agent_pass_jargon",
    label: 'agent jargon ("this pass" / "after this pass")',
    re: /\b(?:after )?this pass\b/i,
  },
  {
    id: "bundled_jargon",
    label: 'pipeline jargon ("bundled" — say "shown" / "available in the app")',
    re: /\bbundled\b/i,
  },
  {
    id: "freely_citable_jargon",
    label: 'pipeline jargon ("freely citable" / "freely-citable")',
    re: /\bfreely[\s-]?citable\b/i,
  },
  {
    id: "wikidata_item_qid",
    label: '"Wikidata item Q…" diagnostic phrasing',
    re: /\bwikidata item\s+Q\d+/i,
  },
];

/**
 * @param {string} text
 * @returns {{ id: string, label: string, match: string }[]}
 */
export function findUserFacingLeaks(text) {
  if (typeof text !== "string" || !text) return [];
  const hits = [];
  for (const p of USER_FACING_LEAK_PATTERNS) {
    const m = text.match(p.re);
    if (m) hits.push({ id: p.id, label: p.label, match: m[0] });
  }
  return hits;
}

/** Field names whose string values are rendered (or may be rendered) in Learn UI. */
export const USER_FACING_GAP_FIELDS = new Set([
  "noImageReason",
  // Future-proof: any *Reason shown beside a missing image.
  "noFlagReason",
]);
