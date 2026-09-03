import { IDEOLOGY_POSITION_LABELS, type PoliticalParty } from "../data/politicalParties";
import { coalitionForParty, coalitionPartners } from "../lib/politicalParties";
import { FlagMeaning } from "./FlagMeaning";

/**
 * The Learn-mode "Political parties" detail widget — rendered in the SAME
 * main flag-image panel a coat of arms / passport / football crest swaps
 * into (see LearnPage's `panelParty`), below the party's logo.
 *
 * Every fact here comes straight off the sourced `PoliticalParty` record in
 * `src/data/politicalParties.ts` — a field that record leaves absent (because
 * no authoritative source gives it) is simply omitted here too, never guessed.
 */
export function PoliticalPartyFacts({ party }: { party: PoliticalParty }) {
  const coalition = coalitionForParty(party);
  const partners = coalitionPartners(party);
  const pct = party.seatsTotal > 0 ? (party.seats / party.seatsTotal) * 100 : null;
  const pctLabel = pct == null ? null : pct >= 10 ? Math.round(pct) : Math.round(pct * 10) / 10;

  const nameWithTranslation = (name: string, nameEn?: string) =>
    nameEn && nameEn !== name ? `${name} (${nameEn})` : name;

  return (
    <>
      <dl className="entity-summary">
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Official name</dt>
          <dd className="entity-summary__value">{nameWithTranslation(party.name, party.nameEn)}</dd>
        </div>
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Ideology</dt>
          <dd className="entity-summary__value">
            {party.ideology.length > 0 ? party.ideology.join(", ") : IDEOLOGY_POSITION_LABELS[party.ideologyPosition]}
          </dd>
        </div>
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Political position</dt>
          <dd className="entity-summary__value">
            {party.positionRaw || IDEOLOGY_POSITION_LABELS[party.ideologyPosition]}
          </dd>
        </div>
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Founded</dt>
          <dd className="entity-summary__value">{party.founded}</dd>
        </div>
        {party.previousNames && party.previousNames.length > 0 && (
          <div className="entity-summary__row">
            <dt className="entity-summary__label">
              Previous name{party.previousNames.length > 1 ? "s" : ""}
            </dt>
            <dd className="entity-summary__value">
              {party.previousNames.map((n, i) => (
                <span key={`${n.name}-${i}`}>
                  {i > 0 && "; "}
                  {nameWithTranslation(n.name, n.nameEn)}
                  {n.years ? ` (${n.years})` : ""}
                </span>
              ))}
            </dd>
          </div>
        )}
        {coalition && (
          <div className="entity-summary__row">
            <dt className="entity-summary__label">Coalition</dt>
            <dd className="entity-summary__value">{nameWithTranslation(coalition.name, coalition.nameEn)}</dd>
          </div>
        )}
        {coalition?.note && (
          <div className="entity-summary__row">
            <dt className="entity-summary__label">Coalition status</dt>
            <dd className="entity-summary__value">{coalition.note}</dd>
          </div>
        )}
        {partners.length > 0 && (
          <div className="entity-summary__row">
            <dt className="entity-summary__label">Coalition parties</dt>
            <dd className="entity-summary__value">
              {partners.map((p, i) => (
                <span key={p.id}>
                  {i > 0 && "; "}
                  {p.shortName ? `${p.shortName} — ` : ""}
                  {nameWithTranslation(p.name, p.nameEn)}
                </span>
              ))}
            </dd>
          </div>
        )}
        {party.leader && (
          <div className="entity-summary__row">
            <dt className="entity-summary__label">{party.leaderTitle || "Leader"}</dt>
            <dd className="entity-summary__value">{party.leader}</dd>
          </div>
        )}
        {party.inPower && party.timeInPower && (
          <div className="entity-summary__row">
            <dt className="entity-summary__label">Time in power</dt>
            <dd className="entity-summary__value">{party.timeInPower}</dd>
          </div>
        )}
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Seats</dt>
          <dd className="entity-summary__value">
            {party.seats} / {party.seatsTotal}
            {pctLabel != null ? ` (${pctLabel}%)` : ""} in the {party.chamberName}
          </dd>
        </div>
      </dl>
      <FlagMeaning
        code={party.id}
        meanings={party.logoMeaning ? { [party.id]: party.logoMeaning } : {}}
        label="What this logo means"
      />
    </>
  );
}
