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
  "FR-GF": "This flag is used locally as a regional symbol but has no official legal status. France does not recognise regional flags; the only official national flag is the French Tricolour.",
  "FR-GP": "This flag is used locally as a regional symbol but has no official legal status. France does not recognise regional flags; the only official national flag is the French Tricolour.",
  "FR-MQ": "The blue-and-white flag with four gold serpents is a historical informal symbol. France does not recognise regional flags; the only official national flag is the French Tricolour.",
  "FR-RE": "This flag is used locally as a regional symbol but has no official legal status. France does not recognise regional flags; the only official national flag is the French Tricolour.",
  "FR-YT": "This flag is used locally as a regional symbol but has no official legal status. France does not recognise regional flags; the only official national flag is the French Tricolour.",

  // Tibet Autonomous Region — the Snow Lion Flag belongs to the government-in-exile,
  // not to the PRC-administered region.
  "CN-XZ": "The Snow Lion Flag (first adopted 1959) is the flag of the Central Tibetan Administration, the Tibetan government-in-exile based in Dharamsala, India. It is not recognised by the PRC, which administers the Tibet Autonomous Region and has designated no distinct official regional flag for it.",
};
