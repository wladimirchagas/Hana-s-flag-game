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

  // Abkhazia — de facto independent state unrecognised by Georgia and most of the world.
  // The CDN shows the Republic of Abkhazia flag, not a Georgia-recognised regional symbol.
  "GE-AB": "The flag shown is that of the self-declared Republic of Abkhazia, which has operated as a de facto independent state since the 1992–1993 war with Georgia. Abkhazia is recognised by only a handful of states (Russia, Nicaragua, Venezuela, Nauru, and Syria); Georgia and most of the international community regard it as Georgian territory under Russian occupation.",

  // Crimea and Sevastopol — internationally recognised as Ukrainian territory (ISO codes UA-43/UA-40)
  // but administered by Russia since its 2014 annexation, which is not recognised by the UN.
  "UA-43": "The Autonomous Republic of Crimea (ISO 3166-2: UA-43) is internationally recognised as Ukrainian territory. Russia annexed Crimea in February–March 2014 in a move rejected by Ukraine, the United Nations General Assembly (Resolution 68/262), and most countries. The flag shown is the regional flag used by the Crimean administration.",
  "UA-40": "Sevastopol (ISO 3166-2: UA-40) is internationally recognised as Ukrainian territory. Russia has administered it as a federal city since its 2014 annexation of Crimea, which is not recognised by Ukraine or the United Nations. The flag shown is the city flag used by the local administration.",
};
