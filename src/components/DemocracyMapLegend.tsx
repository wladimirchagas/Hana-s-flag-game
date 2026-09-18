import {
  type DemocracyMapMode,
  getDemocracyLegendTitle,
  getDemocracyLegendItems,
} from "../lib/democracyColors";

export type DemocracyMapLegendProps = {
  mode: DemocracyMapMode;
};

export function DemocracyMapLegend({ mode }: DemocracyMapLegendProps) {
  if (!mode) return null;

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
