import { LogoExplainer } from "./LogoExplainer";
import type { CommercialAirline } from "../types/airline";

/**
 * Information widget for a selected commercial airline.
 * Rendered in the side panel for both:
 * 1. World Map View (when "Commercial airlines" content type is active)
 * 2. Country Map View (when an airline is clicked in the "National symbols" tab)
 *
 * Shows:
 * - Airline logo (with click to enlarge in the lightbox)
 * - (a) Explainer of the logo
 * - (b) Airline name (with IATA code in parenthesis)
 * - (c) Foundation year
 * - (d) Alliance membership
 * - (e) Main hub/location
 * - (f) Fleet composition
 */
export function AirlineDetails({
  airline,
  baseUrl = "",
  onEnlarge,
}: {
  airline: CommercialAirline;
  baseUrl?: string;
  onEnlarge: (url: string) => void;
}) {
  const logoUrl = airline.logo.startsWith("http") || airline.logo.startsWith("data:")
    ? airline.logo
    : airline.logo.startsWith(baseUrl)
      ? airline.logo
      : `${baseUrl}${airline.logo}`;

  return (
    <div className="airline-details">
      <div className="learn-fs__flag-box">
        <div className="learn-fs__flag-head">
          <span className="entity-summary__label learn-fs__flag-label">Airline logo</span>
          <button
            type="button"
            className="learn-fs__flag"
            onClick={() => onEnlarge(logoUrl)}
            aria-label={`Enlarge ${airline.name} logo`}
          >
            <img
              key={logoUrl}
              src={logoUrl}
              alt={`${airline.name} logo`}
              className="learn-fs__flag-img"
              draggable={false}
              style={{ objectFit: "contain", maxHeight: "110px", padding: "6px" }}
            />
            <span className="learn-fs__flag-hint" aria-hidden="true">⤢ Click to enlarge</span>
          </button>
        </div>
        <LogoExplainer description={airline.logoExplainer} label="What this logo means" />
      </div>

      <dl className="entity-summary" style={{ marginTop: "1rem" }}>
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Airline</dt>
          <dd className="entity-summary__value">
            <strong>{airline.name} ({airline.iata})</strong>
          </dd>
        </div>
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Founded</dt>
          <dd className="entity-summary__value">{airline.founded}</dd>
        </div>
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Alliance</dt>
          <dd className="entity-summary__value">{airline.alliance}</dd>
        </div>
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Main hub{airline.hubs.length > 1 ? "s" : ""}</dt>
          <dd className="entity-summary__value">{airline.hubs.join(", ")}</dd>
        </div>
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Fleet composition</dt>
          <dd className="entity-summary__value">{airline.fleet.summary}</dd>
        </div>
      </dl>
    </div>
  );
}
