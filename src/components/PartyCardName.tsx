import type { PoliticalParty } from "../data/politicalParties";
import { partyCardName, partyCardNameParts } from "../lib/politicalParties";
import { AutoFitName } from "./AutoFitName";

/**
 * Grid-card title for a political party: official local name in the card's
 * normal ink, sourced English translation in grey parentheses.
 */
export function PartyCardName({
  party,
  countryName,
}: {
  party: PoliticalParty;
  countryName?: string;
}) {
  const full = partyCardName(party, countryName);
  const { native, translation } = partyCardNameParts(party);
  return (
    <AutoFitName className="flag-grid__name-text" text={full}>
      {native}
      {translation ? (
        <span className="flag-grid__name-translation"> ({translation})</span>
      ) : null}
    </AutoFitName>
  );
}
