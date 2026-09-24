import {
  type DemocracyMapMode,
  getDemocracyLegendTitle,
  getDemocracyLegendItems,
  isPersonaMapMode,
  isWvsMapMode,
} from "../lib/democracyColors";
import {
  PERSONA_EDITION,
  PERSONA_GROUP_COLORS,
  PERSONA_GROUPS,
  personaGroupLabel,
} from "../lib/countryPersonas";
import { PersonaGroupTip } from "./PersonaTip";
import {
  formatWvsSelectionLabel,
  getWvsLegendStops,
  olderWvsSocietiesIn,
} from "../lib/wvsResults";

export type DemocracyMapLegendProps = {
  mode: DemocracyMapMode;
};

export function DemocracyMapLegend({ mode }: DemocracyMapLegendProps) {
  if (!mode) return null;

  if (isPersonaMapMode(mode)) {
    const title = `Country personas, ${PERSONA_EDITION}`;
    return (
      <div className="democracy-map-legend" role="region" aria-label={`${title} map legend`}>
        <span className="democracy-map-legend__title">{title}:</span>
        <ul className="democracy-map-legend__list">
          {PERSONA_GROUPS.map((g) => (
            <li key={g.code} className="democracy-map-legend__item">
              <span
                className="democracy-map-legend__swatch"
                style={{ backgroundColor: PERSONA_GROUP_COLORS[g.code] }}
                aria-hidden="true"
              />
              <PersonaGroupTip group={g} className="persona-tip-anchor--plain" label={personaGroupLabel(g)} />
            </li>
          ))}
        </ul>
        <p className="democracy-map-legend__note">
          Hover or tap a persona for what it means. Letters are labels, not ranks.
        </p>
      </div>
    );
  }

  if (isWvsMapMode(mode)) {
    const title = formatWvsSelectionLabel(mode) ?? "World Values Survey";
    const items = getWvsLegendStops(mode);
    if (items.length === 0) return null;
    const older = olderWvsSocietiesIn(mode);
    return (
      <div className="democracy-map-legend" role="region" aria-label={`${title} map legend`}>
        <span className="democracy-map-legend__title">{title}:</span>
        <ul className="democracy-map-legend__list">
          {items.map((item) => (
            <li key={item.label} className="democracy-map-legend__item">
              <span
                className="democracy-map-legend__swatch"
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              />
              <span className="democracy-map-legend__label">{item.label}</span>
            </li>
          ))}
        </ul>
        {older.length > 0 && (
          <p className="democracy-map-legend__note">
            {older.map((o) => `${o.name}: ${o.label}`).join("; ")}, not 2017–2022.
          </p>
        )}
      </div>
    );
  }

  const title = getDemocracyLegendTitle(mode);
  const items = getDemocracyLegendItems(mode);

  return (
    <div className="democracy-map-legend" role="region" aria-label={`${title} map legend`}>
      <span className="democracy-map-legend__title">{title}:</span>
      <ul className="democracy-map-legend__list">
        {items.map((item) => (
          <li key={item.label} className="democracy-map-legend__item">
            <span
              className="democracy-map-legend__swatch"
              style={{ backgroundColor: item.color }}
              aria-hidden="true"
            />
            <span className="democracy-map-legend__label">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
