import { useMemo } from "react";
import { AutoFitName } from "./AutoFitName";
import { NATIONAL_FLAGS, type NationalFlag, type NationalFlagCategory } from "../data/nationalFlags";
import { flagYearLabel } from "../lib/nationalFlags";
import { ENTITY_STATUS_LABEL, specialEntitiesOf, type SpecialEntity } from "../lib/specialEntities";

/**
 * "National symbols" tab of the country drill-down grid.
 *
 * Shows every flag the country itself flies, beyond its sub-national ones —
 * grouped into sourced categories, each hidden when the country has none:
 *
 *   Official flags     the flags in force, ALWAYS led by the country's current
 *                      national flag (badged "Current national flag"), followed by
 *                      any others with official status — Bolivia's Wiphala,
 *                      Australia's Aboriginal and Torres Strait Islander flags.
 *   Historical flags   the OLDER national flags it has flown, newest first — the
 *                      current flag is NOT here (it lives in the official section and
 *                      the fact-sheet above); the label carries the years each flew.
 *                      This section reaches back BEFORE independence, so it also holds
 *                      colonial-era flags — Portugal's royal banners over Brazil, the
 *                      Union Flag over Australia. Every one of those carries a
 *                      "Under {power}" badge (`flag.sovereign`), because a colonial
 *                      flag shown bare would read as a flag of the independent country.
 *   Military flags     service flags — army, navy, air force, marine corps.
 *   Maritime flags     ensigns and jacks.
 *   Standards          head-of-state / head-of-government standards.
 *   Civil & state      where the flag the public flies differs from the state flag.
 *   Indigenous flags   officially recognised indigenous flags that are not national
 *                      flags in their own right.
 *   Coat of arms       the national arms or state emblem, each with a sourced
 *                      explanation of what its charges STAND FOR.
 *   Passports          the covers of the country's passports, ordinary and special
 *                      (diplomatic, official, service).
 *   Football crest     the crest/logo of the country's national football (soccer)
 *                      association — a copyrighted mark, so it is bundled non-free
 *                      with a recorded licenceNote, like the passport covers.
 *
 * A symbol with no freely-licensed image is LISTED ANYWAY, as a card carrying the
 * reason in place of the picture (`flag.noImageReason`). Dropping it silently is
 * what made Australia's tab show two of its three official flags and look complete
 * (owner report, 2026-08) — an invisible gap reads as no gap at all.
 *
 * SPECIAL-STATUS ENTITIES: a country with special-autonomy or disputed sub-entities
 * (China → Hong Kong, Macau, Taiwan) shows each entity's OWN national symbols as a
 * separate, labelled group beneath the country's own — its flag, emblem, historical
 * (incl. colonial) flags and passport. Each group header carries a status badge
 * ("Special Administrative Region"; "Disputed" for a contested status). See
 * `specialEntities.ts`.
 *
 * Sub-national flags are deliberately NOT here — that is the "Sub-national
 * divisions" tab.
 *
 * Selecting a card opens the flag's own widget below the country fact-sheet and
 * changes nothing on the map: these flags belong to the whole country (or entity),
 * so there is no territory for the map to highlight (owner request — "nothing should
 * be selected in the map though").
 */
const CATEGORY_HEADINGS: Record<NationalFlagCategory, string> = {
  historical: "Historical flags",
  official: "Current national flags",
  military: "Military flags",
  maritime: "Maritime flags",
  standard: "Standards",
  civilstate: "Civil & state flags",
  indigenous: "Indigenous flags",
  coatofarms: "Coat of arms",
  passport: "Passports",
  footballcrest: "Football crest",
};

/** The order the sections appear in — matches the generator's own ordering. */
const CATEGORY_ORDER: NationalFlagCategory[] = [
  // "official" first: the flags in force, headed by the one the country flies.
  "official",
  "historical",
  "military",
  "maritime",
  "standard",
  "civilstate",
  "indigenous",
  // Not flags — the country's other national symbols, after every flag section.
  "coatofarms",
  "passport",
  // The crest of the country's national football (soccer) association — a national
  // symbol in the same family as the arms and passport, so it trails them.
  "footballcrest",
];

type Group = { category: NationalFlagCategory; heading: string; items: NationalFlag[] };

/** Split a flags list into the ordered, non-empty category groups. */
function groupFlags(flags: readonly NationalFlag[]): Group[] {
  return CATEGORY_ORDER.map((category) => ({
    category,
    heading: CATEGORY_HEADINGS[category],
    items: flags.filter((f) => f.category === category),
  })).filter((g) => g.items.length > 0);
}

type Props = {
  countryCode: string;
  countryName: string;
  /** id of the flag whose widget is open (if any). */
  selectedFlagId: string | null;
  baseUrl: string;
  onSelect: (flag: NationalFlag) => void;
};

export function NationalFlagGrid({
  countryCode,
  countryName,
  selectedFlagId,
  baseUrl,
  onSelect,
}: Props) {
  const countryGroups = useMemo(
    () => groupFlags(NATIONAL_FLAGS[countryCode] ?? []),
    [countryCode],
  );
  const entitySections = useMemo(
    () =>
      specialEntitiesOf(countryCode)
        .map((entity) => ({ entity, groups: groupFlags(NATIONAL_FLAGS[entity.code] ?? []) }))
        .filter((s) => s.groups.length > 0),
    [countryCode],
  );

  if (countryGroups.length === 0 && entitySections.length === 0) {
    return (
      <p className="flag-grid__no-match">
        No sourced national flags are available for {countryName} yet.
      </p>
    );
  }

  const hasEntities = entitySections.length > 0;

  return (
    <div className="flag-grid__entities">
      {/* The country's own symbols. When it has special-status entities beneath it,
          a header names it so its symbols read as a peer of the entity groups. */}
      {hasEntities && countryGroups.length > 0 && (
        <h3 className="flag-grid__entity-header">
          <span className="flag-grid__entity-name">{countryName}</span>
        </h3>
      )}
      <FlagGroups
        groups={countryGroups}
        selectedFlagId={selectedFlagId}
        baseUrl={baseUrl}
        onSelect={onSelect}
      />

      {entitySections.map(({ entity, groups }) => (
        <section key={entity.code} className="flag-grid__entity">
          <EntityHeader entity={entity} />
          <FlagGroups
            groups={groups}
            selectedFlagId={selectedFlagId}
            baseUrl={baseUrl}
            onSelect={onSelect}
          />
        </section>
      ))}
    </div>
  );
}

function EntityHeader({ entity }: { entity: SpecialEntity }) {
  const isDisputed = entity.status === "disputed" || entity.disputed === true;
  return (
    <h3 className="flag-grid__entity-header">
      <span className="flag-grid__entity-name">{entity.name}</span>
      {entity.status !== "disputed" && (
        <span className="flag-grid__entity-badge">
          {ENTITY_STATUS_LABEL[entity.status]}
        </span>
      )}
      {isDisputed && (
        <span className="flag-grid__entity-badge flag-grid__entity-badge--disputed">
          Disputed
        </span>
      )}
    </h3>
  );
}

function FlagGroups({
  groups,
  selectedFlagId,
  baseUrl,
  onSelect,
}: {
  groups: Group[];
  selectedFlagId: string | null;
  baseUrl: string;
  onSelect: (flag: NationalFlag) => void;
}) {
  return (
    <div className="flag-grid__groups">
      {groups.map((group) => (
        <div key={group.category} className="flag-grid__group">
          <h4 className="flag-grid__group-heading">
            <span className="flag-grid__group-name">{group.heading}</span>
            <span className="flag-grid__group-count">({group.items.length})</span>
          </h4>
          <ul className="flag-grid__list">
            {group.items.map((flag) => {
              const active = flag.id === selectedFlagId;
              const years = flagYearLabel(flag);
              return (
                <li key={flag.id} className="flag-grid__item">
                  <button
                    type="button"
                    className={`flag-grid__card${active ? " flag-grid__card--active" : ""}`}
                    onClick={() => onSelect(flag)}
                    aria-pressed={active}
                    aria-label={
                      flag.primary
                        ? `${flag.name} — the current national flag, shown in the panel above`
                        : flag.noImageReason
                        ? `Show ${flag.name} — no freely-licensed image is available`
                        : flag.sovereign
                          ? `Show ${flag.name} — flown under ${flag.sovereign}, before independence`
                          : flag.priorPolity
                            ? `Show ${flag.name} — flown by ${flag.priorPolity}, an earlier polity`
                            : flag.occupier
                              ? `Show ${flag.name} — imposed by ${flag.occupier} during the occupation`
                              : `Show ${flag.name}`
                    }
                  >
                    <span className="flag-grid__thumb">
                      {flag.path ? (
                        <img
                          src={`${baseUrl}${flag.path}`}
                          alt=""
                          loading="lazy"
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
                      <AutoFitName className="flag-grid__name-text" text={flag.name} />
                      {years && <span className="flag-grid__flag-sub">{years}</span>}
                      {flag.primary && (
                        <span className="flag-grid__primary-badge">
                          Current national flag
                        </span>
                      )}
                      {flag.sovereign && (
                        <span className="flag-grid__sovereign-badge">
                          Under {flag.sovereign}
                        </span>
                      )}
                      {flag.priorPolity && (
                        <span className="flag-grid__sovereign-badge">
                          {flag.priorPolity}
                        </span>
                      )}
                      {flag.occupier && (
                        // Deliberately NOT "Under X": the occupied country's own
                        // position is that the occupying power never held
                        // sovereignty, and the badge must not assert otherwise.
                        <span className="flag-grid__sovereign-badge">
                          Imposed by {flag.occupier}
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
