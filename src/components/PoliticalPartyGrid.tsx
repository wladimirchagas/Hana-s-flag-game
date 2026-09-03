import { useMemo } from "react";
import { AutoFitName } from "./AutoFitName";
import { GridImage } from "./GridImage";
import {
  IDEOLOGY_POSITION_LABELS,
  IDEOLOGY_POSITION_ORDER,
  type PoliticalParty,
} from "../data/politicalParties";
import { partiesForCountry, coalitionForParty } from "../lib/politicalParties";

/**
 * "Political parties" tab of the country drill-down grid.
 *
 * Shows every party currently holding a seat in the country's national
 * lower/unicameral chamber — see the sourcing/scope discipline documented at
 * the top of `src/data/politicalParties.ts`. Coverage is an incrementally
 * growing curated sweep (same philosophy as the National-symbols tab): a
 * country with no covered parties simply shows nothing here, never an
 * invented roster.
 *
 * Parties are grouped by ideological position, ordered progressive →
 * conservative (owner request) — the same left-to-right convention a
 * political spectrum chart uses. Each card badges "In power" when the party
 * is currently part of the governing coalition/cabinet, and names its
 * national coalition/federation when it belongs to one.
 *
 * Selecting a card opens the party's own widget below the country fact-sheet
 * (`PoliticalPartyDetails`) and changes nothing on the map: a party belongs
 * to the whole country, so there is no territory to highlight — the same
 * reasoning the National-symbols tab already uses.
 */
type Group = { position: string; heading: string; items: PoliticalParty[] };

function groupParties(parties: readonly PoliticalParty[]): Group[] {
  return IDEOLOGY_POSITION_ORDER.map((position) => ({
    position,
    heading: IDEOLOGY_POSITION_LABELS[position],
    items: parties.filter((p) => p.ideologyPosition === position),
  })).filter((g) => g.items.length > 0);
}

type Props = {
  countryCode: string;
  countryName: string;
  /** id of the party whose widget is open (if any). */
  selectedPartyId: string | null;
  baseUrl: string;
  onSelect: (party: PoliticalParty) => void;
};

export function PoliticalPartyGrid({
  countryCode,
  countryName,
  selectedPartyId,
  baseUrl,
  onSelect,
}: Props) {
  const groups = useMemo(
    () => groupParties(partiesForCountry(countryCode)),
    [countryCode],
  );

  if (groups.length === 0) {
    return (
      <p className="flag-grid__no-match">
        No sourced political parties are available for {countryName} yet.
      </p>
    );
  }

  return (
    <div className="flag-grid__groups">
      {groups.map((group) => (
        <div key={group.position} className="flag-grid__group">
          <h4 className="flag-grid__group-heading">
            <span className="flag-grid__group-name">{group.heading}</span>
            <span className="flag-grid__group-count">({group.items.length})</span>
          </h4>
          <ul className="flag-grid__list">
            {group.items.map((party) => {
              const active = party.id === selectedPartyId;
              const coalition = coalitionForParty(party);
              return (
                <li key={party.id} className="flag-grid__item">
                  <button
                    type="button"
                    className={`flag-grid__card${active ? " flag-grid__card--active" : ""}`}
                    onClick={() => onSelect(party)}
                    aria-pressed={active}
                    aria-label={
                      party.noImageReason
                        ? `Show ${party.name} — no logo image is available`
                        : `Show ${party.name}`
                    }
                  >
                    <span className="flag-grid__thumb">
                      {party.logo ? (
                        <GridImage
                          src={`${baseUrl}${party.logo}`}
                          alt=""
                          draggable={false}
                          className="flag-grid__thumb-img"
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                      ) : (
                        <span className="flag-grid__no-image" aria-hidden="true">
                          No free image
                        </span>
                      )}
                    </span>
                    <span className="flag-grid__name">
                      <AutoFitName className="flag-grid__name-text" text={party.shortName} />
                      {(party.inPower || coalition) && (
                        <span className="flag-grid__party-badges">
                          {party.inPower && (
                            <span className="flag-grid__party-badge flag-grid__party-badge--power">
                              In power
                            </span>
                          )}
                          {coalition && (
                            <span className="flag-grid__party-badge flag-grid__party-badge--coalition">
                              {coalition.name}
                            </span>
                          )}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
