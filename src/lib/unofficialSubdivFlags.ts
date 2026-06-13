/**
 * Subdivision codes whose displayed flag is not the official flag of the
 * governing authority.  Used in two places:
 *   1. SubdivisionFlagGrid — appends "(unofficial flag)" to the name label.
 *   2. LearnPage — shows a contextual note in the subdivision detail panel.
 *
 * Values are the detail-panel note text (one sentence per note).
 */
export const UNOFFICIAL_SUBDIV_NOTES: Record<string, string> = {
  // French overseas departments — locally-used regional symbols with no
  // official legal status.  France's only official flag is the Tricolour.
  // Only departments where an unofficial regional flag image is actually shown
  // are listed here; others display the French Tricolour (the official flag).
  "FR-GF": "This flag is used locally as a regional symbol but has no official legal status. France does not recognise regional flags; the only official national flag is the French Tricolour.",
  "FR-MQ": "The blue-and-white flag with four gold serpents is a historical informal symbol. France does not recognise regional flags; the only official national flag is the French Tricolour.",

  // Tibet Autonomous Region — the Snow Lion Flag belongs to the government-in-exile,
  // not to the PRC-administered region.
  "CN-XZ": "The Snow Lion Flag (first adopted 1959) is the flag of the Central Tibetan Administration, the Tibetan government-in-exile based in Dharamsala, India. It is not recognised by the PRC, which administers the Tibet Autonomous Region and has designated no distinct official regional flag for it.",

  // Abkhazia — the CDN shows the Republic of Abkhazia flag, not a Georgia-recognised regional symbol.
  // (Abkhazia is also a disputed territory — see DISPUTED_SUBDIV_NOTES in disputedSubdivisions.ts.)
  "GE-AB": "The flag shown is that of the self-declared Republic of Abkhazia, not a flag recognised by Georgia (the ISO-administering state). Georgia has no separately designated flag for the region; it regards the Georgian national flag as the only official symbol.",

  // Northern Cyprus under Cyprus — the TRNC flag is shown but is not recognised by Cyprus or the UN.
  // (Also a disputed territory — see DISPUTED_SUBDIV_NOTES in disputedSubdivisions.ts.)
  "CY-NC~": "The flag shown is that of the self-declared Turkish Republic of Northern Cyprus (TRNC). Cyprus and virtually all countries other than Turkey do not recognise the TRNC or its flag; Cyprus regards Northern Cyprus as part of its own sovereign territory.",

  // Western Sahara under Morocco — the Sahrawi flag is shown but Morocco does not recognise it.
  // (Also a disputed territory — see DISPUTED_SUBDIV_NOTES in disputedSubdivisions.ts.)
  "MA-EH~": "The flag shown is that of the Sahrawi Arab Democratic Republic (SADR), which claims sovereignty over Western Sahara. Morocco, which administers the territory as its 'Southern Provinces', does not recognise the SADR or its flag.",
};
