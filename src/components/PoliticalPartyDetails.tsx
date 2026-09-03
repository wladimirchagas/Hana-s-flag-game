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
 * flag as the party's own) followed by its full sourced fact sheet and the
 * "What this logo means" explainer (see `PoliticalPartyFacts`).
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
        ) : (
          <button
            type="button"
            className="learn-fs__flag"
            onClick={() => url && onEnlarge(url)}
            aria-label={`Enlarge ${party.shortName} logo`}
          >
            <img
              key={url ?? "no-image"}
              src={url ?? undefined}
              alt=""
              className="learn-fs__flag-img"
              draggable={false}
              onError={(e) => { e.currentTarget.closest("button")?.remove(); }}
            />
            <span className="learn-fs__flag-hint" aria-hidden="true">⤢ Click to enlarge</span>
          </button>
        )}
        <PoliticalPartyFacts party={party} />
      </div>
    </>
  );
}
