import { useMemo, useState } from "react";
import { AutoFitName } from "./AutoFitName";
import { GridImage } from "./GridImage";
import {
  IDEOLOGY_POSITION_LABELS,
  IDEOLOGY_POSITION_ORDER,
  type PoliticalParty,
} from "../data/politicalParties";
import {
  partiesForCountry,
  coalitionForParty,
  partyPowerBadges,
} from "../lib/politicalParties";

type SortMode = "ideology" | "coalition" | "alpha";

const SORT_MODE_LABELS: Record<SortMode, string> = {
  ideology: "By ideology",
  coalition: "By coalition",
  alpha: "A–Z",
};

type Group = { key: string; heading: string; items: PoliticalParty[] };

function groupParties(
  parties: readonly PoliticalParty[],
  sortMode: SortMode,
): Group[] {
  if (sortMode === "alpha") {
    const buckets = new Map<string, PoliticalParty[]>();
    for (const p of parties) {
      const name = p.shortName || p.name;
      const first = (name[0] ?? "").toUpperCase();
      const key = /[A-Z]/.test(first) ? first : "#";
      const arr = buckets.get(key) ?? [];
      arr.push(p);
      buckets.set(key, arr);
    }

    const list = [...buckets.entries()].sort(([a], [b]) => {
      if (a === "#" && b !== "#") return 1;
      if (b === "#" && a !== "#") return -1;
      return a.localeCompare(b, "en");
    });

    return list.map(([letter, items]) => ({
      key: letter,
      heading: letter,
      items: items.sort((a, b) => a.shortName.localeCompare(b.shortName)),
    }));
  }

  if (sortMode === "coalition") {
    const coalitionMap = new Map<string, { name: string; nameEn?: string; items: PoliticalParty[] }>();
    const unaligned: PoliticalParty[] = [];

    for (const p of parties) {
      const coalition = coalitionForParty(p);
      if (coalition) {
        if (!coalitionMap.has(coalition.id)) {
          coalitionMap.set(coalition.id, {
            name: coalition.name,
            nameEn: coalition.nameEn,
            items: [],
          });
        }
        coalitionMap.get(coalition.id)!.items.push(p);
      } else {
        unaligned.push(p);
      }
    }

    const groups: Group[] = Array.from(coalitionMap.entries())
      .sort(([, a], [, b]) => {
        // Larger coalition first, then alphabetical
        const diff = b.items.length - a.items.length;
        if (diff !== 0) return diff;
        return a.name.localeCompare(b.name, "en");
      })
      .map(([id, g]) => {
        const heading = g.nameEn && g.nameEn !== g.name ? `${g.name} (${g.nameEn})` : g.name;
        return {
          key: id,
          heading,
          items: g.items,
        };
      });

    if (unaligned.length > 0) {
      groups.push({
        key: "unaligned",
        heading: coalitionMap.size > 0 ? "Non-coalition / Independent" : "All parties",
        items: unaligned,
      });
    }

    return groups;
  }

  // Default: Ideology progressive → conservative
  return IDEOLOGY_POSITION_ORDER.map((position) => ({
    key: position,
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
  const [sortMode, setSortMode] = useState<SortMode>("ideology");
  const allParties = useMemo(() => partiesForCountry(countryCode), [countryCode]);
  const groups = useMemo(
    () => groupParties(allParties, sortMode),
    [allParties, sortMode],
  );

  if (groups.length === 0) {
    return (
      <p className="flag-grid__no-match">
        No sourced political parties are available for {countryName} yet.
      </p>
    );
  }

  return (
    <div className="flag-grid__party-wrapper">
      <div className="flag-grid__controls flag-grid__controls--tab">
        <label className="flag-grid__group-select">
          <span className="flag-grid__group-select-label">Group by:</span>
          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as SortMode)}
            className="flag-grid__select"
          >
            {(Object.keys(SORT_MODE_LABELS) as SortMode[]).map((m) => (
              <option key={m} value={m}>
                {SORT_MODE_LABELS[m]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flag-grid__groups">
        {groups.map((group) => (
          <div key={group.key} className="flag-grid__group">
            <h4 className="flag-grid__group-heading">
              <span className="flag-grid__group-name">{group.heading}</span>
              <span className="flag-grid__group-count">({group.items.length})</span>
            </h4>
            <ul className="flag-grid__list">
              {group.items.map((party) => {
                const active = party.id === selectedPartyId;
                const badges = partyPowerBadges(party, countryCode);
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
                        {(badges.length > 0 || coalition) && (
                          <span className="flag-grid__party-badges">
                            {badges.map((b, i) => (
                              <span
                                key={`${b.kind}-${i}`}
                                className={`flag-grid__party-badge flag-grid__party-badge--${b.kind}`}
                              >
                                {b.label}
                              </span>
                            ))}
                            {coalition && sortMode !== "coalition" && (
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
    </div>
  );
}
