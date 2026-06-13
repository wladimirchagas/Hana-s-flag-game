import { UNOFFICIAL_SUBDIV_NOTES } from "./unofficialSubdivFlags";

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

  // Western Sahara — Morocco administers; SADR/Polisario Front claims sovereignty.
  // SADR is not a UN member state; the UN lists Western Sahara as a Non-Self-Governing Territory.
  "MA-EH~": "Western Sahara is listed by the United Nations as a Non-Self-Governing Territory. Morocco administers approximately 80% of the territory and considers it its 'Southern Provinces'. The Sahrawi Arab Democratic Republic (SADR), backed by the Polisario Front and recognised by around 40 countries, claims the whole territory. A UN-mandated referendum on self-determination has been repeatedly postponed since 1991. Because SADR is not a UN member state, Western Sahara is shown only under Morocco here.",

  // Northern Cyprus — Turkey administers; Cyprus and the international community do not recognise TRNC.
  "TR-NC~": "The Turkish Republic of Northern Cyprus (TRNC) was proclaimed in 1983 following Turkey's 1974 military intervention on the island. It is recognised only by Turkey; the United Nations, Cyprus, and the rest of the international community regard the territory as part of the Republic of Cyprus under illegal occupation. It is shown here under Turkey (which administers and recognises it) and under Cyprus (which holds the internationally recognised claim to the whole island).",
  "CY-NC~": "Northern Cyprus has been administered by Turkey and the self-declared Turkish Republic of Northern Cyprus (TRNC) since Turkey's 1974 military intervention. The United Nations regards the continued presence of Turkish forces as unlawful (UNSC Resolution 541). Cyprus and virtually all countries other than Turkey consider Northern Cyprus to be part of the Republic of Cyprus. It is shown here under both Turkey (which administers it) and Cyprus (which holds the internationally recognised claim).",
};

/**
 * Returns the disputed/claimed or unofficial label for a subdivision under a given parent country.
 * If the subdivision is not disputed, returns null.
 */
export function getSubdivisionDisputeLabel(
  code: string,
  typeLabel: string,
  parentCountryCode?: string
): { text: string; isUnofficial: boolean } | null {
  const disputedCodes = new Set(Object.keys(DISPUTED_SUBDIV_NOTES));

  // Codes in UNOFFICIAL_SUBDIV_NOTES but not in the disputed set always show "unofficial flag".
  if (!disputedCodes.has(code)) {
    if (code in UNOFFICIAL_SUBDIV_NOTES) {
      return { text: "unofficial flag", isUnofficial: true };
    }
    return null;
  }

  const parent = parentCountryCode?.toUpperCase();

  // Flag is unofficial when viewed under a claiming country that does not recognise the displayed flag.
  // CN claims TW (shows ROC flag), ES claims GI, AR claims FK/ML,
  // CY claims Northern Cyprus (shows TRNC flag), MA claims Western Sahara (shows Sahrawi flag).
  const isUnofficial = !!parent && ["CN", "ES", "AR", "CY", "MA"].includes(parent);

  if (isUnofficial) {
    return { text: "unofficial flag", isUnofficial: true };
  }

  // Otherwise, format label based on typeLabel
  let text = "disputed territory";
  const type = typeLabel.toLowerCase();
  if (type.includes("claimed")) {
    if (type.includes("state")) {
      text = "claimed state";
    } else {
      text = "claimed territory";
    }
  } else if (type.includes("disputed")) {
    text = "disputed territory";
  }

  return { text, isUnofficial: false };
}

