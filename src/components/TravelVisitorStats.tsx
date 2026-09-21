import { annualVisitorStatsForCountry } from "../lib/tourismLogos";

/**
 * Country-level annual visitors for the Learn Travel tab.
 * Shown above the Airlines / Tourism sub-tabs — the figure is about the
 * country, not a specific airline brand or tourism-board logo.
 */
export function TravelVisitorStats({ countryCode }: { countryCode: string }) {
  const stats = annualVisitorStatsForCountry(countryCode);
  if (!stats) return null;

  return (
    <dl className="entity-summary travel-visitor-stats">
      <div className="entity-summary__row">
        <dt className="entity-summary__label">Annual visitors</dt>
        <dd className="entity-summary__value">
          {stats.kind === "visitors" ? (
            <>
              <strong>
                {stats.count.toLocaleString("en-US")} ({stats.year})
              </strong>
              <span className="learn-fs__sub-desc travel-visitor-stats__metric">
                {stats.metric}
              </span>
            </>
          ) : (
            stats.note
          )}
        </dd>
      </div>
    </dl>
  );
}
