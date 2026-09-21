import { FlagMeaning } from "./FlagMeaning";
import { EnlargeableLogo } from "./EnlargeableLogo";
import type { PoliticalParty } from "../data/politicalParties";
import { PoliticalPartyFacts } from "./PoliticalPartyFacts";

/**
 * The widget for a party picked in the "Political parties" tab — the same
 * slot below the country fact-sheet a selected national-symbol/sub-national
 * flag opens (see `NationalFlagDetails`), so picking a party never disagrees
 * with how every other symbol in this drill-down is inspected.
 *
 * Shows the party's own logo (or an honest "no logo image" note — never the
 * country's flag standing in for it, which would misattribute the country's
 * flag as the party's own) followed by the "What this logo means" explainer
 * (relocated immediately below the logo image) and its full sourced fact sheet.
 *
 * Nothing here touches the map: a party belongs to the whole country, so
 * there is no territory to highlight (same reasoning as every other
 * national-symbol widget).
 */
export function PoliticalPartyDetails({
  party,
  baseUrl,
  onEnlarge,
}: {
  party: PoliticalParty;
  baseUrl: string;
  onEnlarge: (url: string) => void;
}) {
  const url = party.logo ? `${baseUrl}${party.logo}` : null;
  return (
    <>
      <div className="learn-fs__flag-box">
        {party.noImageReason ? (
          <p className="learn-fs__no-image">
            <strong>No logo image shown.</strong> {party.noImageReason}
          </p>
        ) : url ? (
          <EnlargeableLogo
            src={url}
            alt=""
            ariaLabel={`Enlarge ${party.name} logo`}
            onEnlarge={onEnlarge}
            onImgError={(e) => { e.currentTarget.closest("button")?.remove(); }}
          />
        ) : null}
        <FlagMeaning
          code={party.id}
          meanings={party.logoMeaning ? { [party.id]: party.logoMeaning } : {}}
          label="What this logo means"
        />
        <PoliticalPartyFacts party={party} />
      </div>
    </>
  );
}
