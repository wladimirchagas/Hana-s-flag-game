import { COUNTRY_PERSONAS } from "../data/countryPersonas";
import {
  PERSONA_AVERAGES_NOTE,
  PERSONA_EDITION,
  PERSONA_GROUP_COLORS,
  isBorderline,
  personaGroupByCode,
  personaGroupLabel,
  personaTypeByCode,
  personaTypeLabel,
} from "../lib/countryPersonas";
import { PersonaGroupTip, PersonaTip, PersonaTypeTip } from "./PersonaTip";

/**
 * The fact-sheet "Country persona" row value: the country's persona group and type, each a
 * badge whose tooltip (hover or tap) explains that cluster. A borderline country says which
 * group it sits closest to after its own; an unclassified one says why it has no persona.
 */
export function PersonaBadge({ code, countryName }: { code: string; countryName: string }) {
  const p = COUNTRY_PERSONAS[code];
  if (!p) return null;
  if (p.status === "unclassified") {
    return (
      <PersonaTip
        className="persona-tip-anchor--plain"
        label="Not classified"
        title={`Country Personas ${PERSONA_EDITION}: not classified`}
        line={`There is not enough comparable national data for ${countryName} to place it among the personas.`}
      />
    );
  }
  const group = personaGroupByCode(p.group);
  const type = personaTypeByCode(p.type);
  if (!group || !type) return null;
  const second = isBorderline(p) ? personaGroupByCode(p.secondGroup) : null;
  return (
    <span className="persona-badges">
      <PersonaGroupTip
        group={group}
        label={
          <>
            <span className="persona-badges__swatch" style={{ backgroundColor: PERSONA_GROUP_COLORS[group.code] }} aria-hidden="true" />
            {personaGroupLabel(group)}
          </>
        }
      />
      {type.code !== group.code && group.typeCodes.length > 1 && (
        <PersonaTypeTip type={type} label={personaTypeLabel(type)} />
      )}
      {second && (
        <span className="persona-badges__note">
          Sits between {group.code} and {second.code}: close to the border with {personaGroupLabel(second)}.
        </span>
      )}
      {p.status === "provisional" && (
        <span className="persona-badges__note">
          Provisional: placed using the data available, which covers fewer measures than for most countries.
        </span>
      )}
      <span className="visually-hidden">{PERSONA_AVERAGES_NOTE}</span>
    </span>
  );
}
