import { COUNTRY_PERSONAS } from "../data/countryPersonas";
import {
  PERSONA_AVERAGES_NOTE,
  PERSONA_EDITION,
  isBorderline,
  personaByCode,
  personaColor,
  personaLabel,
} from "../lib/countryPersonas";
import { PersonaInfoTip, PersonaSwatch, PersonaTip } from "./PersonaTip";

/**
 * The fact-sheet "Country persona" row value: the country's persona as a badge whose tooltip
 * (hover or tap) explains it. A country close to the border with another persona says which;
 * an unclassified one says why it has no persona.
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
  const persona = personaByCode(p.persona);
  if (!persona) return null;
  const second = isBorderline(p) ? personaByCode(p.secondPersona) : null;
  return (
    <span className="persona-badges">
      <PersonaInfoTip
        persona={persona}
        label={
          <>
            <PersonaSwatch color={personaColor(persona.code)} />
            {personaLabel(persona)}
          </>
        }
      />
      {second && (
        <span className="persona-badges__note">
          Also close to{" "}
          <PersonaInfoTip
            persona={second}
            className="persona-tip-anchor--plain"
            label={personaLabel(second)}
          />
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
