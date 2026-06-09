/**
 * Subdivision codes whose territory is contested between two or more countries.
 * A disputed subdivision appears in the flag grid of EVERY country that claims it,
 * labelled "(disputed territory)" in each.
 *
 * Values are the detail-panel note text shown when the subdivision is selected.
 *
 * Note: a subdivision can be in both this map and UNOFFICIAL_SUBDIV_NOTES (e.g.
 * GE-AB has an unofficial flag AND is a disputed territory).
 */
export const DISPUTED_SUBDIV_NOTES: Record<string, string> = {
  // Taiwan — self-governing as the Republic of China; claimed by the PRC.
  // Taiwan is not a UN member state; the PRC holds China's UN seat.
  "CN-TW": "Taiwan has been governed by the Republic of China (ROC) since 1949, when the ROC government retreated to the island following the Chinese Civil War. The People's Republic of China (PRC) claims Taiwan as a province and considers itself the sole legitimate government of China. Taiwan is not a UN member state; the PRC holds China's seat in the United Nations. The flag shown is the ROC national flag used by Taiwan's government.",

  // Abkhazia — de facto independent; Georgia claims it; Russia backs independence.
  "GE-AB": "Abkhazia has operated as a de facto independent state since the 1992–1993 war with Georgia. It is recognised as independent by only a handful of countries (Russia, Nicaragua, Venezuela, Nauru, and Syria); Georgia and most of the international community regard it as Georgian territory under occupation. It appears here under Georgia, which holds the internationally recognised claim.",

  // Crimea & Sevastopol — Ukrainian ISO codes placed under Russia in the source data.
  // Shown under both Russia (administers) and Ukraine (internationally recognised claim).
  "UA-43": "The Autonomous Republic of Crimea (ISO 3166-2: UA-43) is internationally recognised as Ukrainian territory. Russia annexed it in February–March 2014 in a move rejected by Ukraine, the United Nations General Assembly (Resolution 68/262), and most countries. It is shown here under both Russia (which administers it) and Ukraine (which holds the internationally recognised claim).",
  "UA-40": "Sevastopol (ISO 3166-2: UA-40) is internationally recognised as Ukrainian territory. Russia has administered it as a federal city since its 2014 annexation of Crimea, which is not recognised by Ukraine or the United Nations. It is shown here under both Russia (which administers it) and Ukraine (which holds the internationally recognised claim).",

  // Azad Kashmir & Gilgit-Baltistan — administered by Pakistan; claimed by India.
  // Shown under both Pakistan (administers) and India (claims, as IN-AK~ / IN-GB~).
  "PK-JK": "Azad Jammu and Kashmir is administered by Pakistan as a self-governing territory, but India claims it in full as part of its Union Territory of Jammu and Kashmir. A United Nations-mandated plebiscite on the region's final status has never been held. It is shown here under both Pakistan (which administers it) and India (which claims it).",
  "PK-GB": "Gilgit-Baltistan is administered by Pakistan but claimed by India as part of its Union Territory of Jammu and Kashmir. China also disputes a portion of the territory (the Trans-Karakoram Tract, ceded by Pakistan to China in 1963 but not recognised by India). It is shown here under both Pakistan (which administers it) and India (which claims it).",
  "IN-AK~": "Azad Jammu and Kashmir is administered by Pakistan as a self-governing territory, but India claims it in full as part of its Union Territory of Jammu and Kashmir. A United Nations-mandated plebiscite on the region's final status has never been held. It is shown here under both Pakistan (which administers it) and India (which claims it).",
  "IN-GB~": "Gilgit-Baltistan is administered by Pakistan but claimed by India as part of its Union Territory of Jammu and Kashmir. China also disputes a portion of the territory (the Trans-Karakoram Tract, ceded by Pakistan to China in 1963 but not recognised by India). It is shown here under both Pakistan (which administers it) and India (which claims it).",
};
