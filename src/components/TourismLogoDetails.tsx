import { LogoExplainer } from "./LogoExplainer";
import type { TourismLogo } from "../types/tourismLogo";

/**
 * Information widget for a selected national tourism-board logo.
 * Rendered in the side panel for both:
 * 1. World Map View (when "Tourism logos" content type is active)
 * 2. Country Map View (when a tourism logo is clicked in the "National symbols" tab)
 *
 * Shows:
 * - The logo (with click to enlarge in the lightbox), or a documented reason
 *   when no freely-licensed/citable logo could be sourced
 * - (a) Explainer of the logo's design and symbolism
 * - (b) Agency / board name (and slogan, when the country has one)
 * - (c) Year the brand was adopted
 * - (d) Comparable annual-visitors figure, with the exact metric it counts —
 *   or a note explaining why none could be sourced
 */
export function TourismLogoDetails({
  logo,
  baseUrl = "",
  onEnlarge,
}: {
  logo: TourismLogo;
  baseUrl?: string;
  onEnlarge: (url: string) => void;
}) {
  const logoUrl = logo.logo
    ? logo.logo.startsWith("http") || logo.logo.startsWith("data:")
      ? logo.logo
      : logo.logo.startsWith(baseUrl)
        ? logo.logo
        : `${baseUrl}${logo.logo}`
    : null;

  return (
    <div className="tourism-logo-details">
      <div className="learn-fs__flag-box">
        <div className="learn-fs__flag-head">
          <span className="entity-summary__label learn-fs__flag-label">Tourism logo</span>
          {logoUrl ? (
            <button
              type="button"
              className="learn-fs__flag"
              onClick={() => onEnlarge(logoUrl)}
              aria-label={`Enlarge ${logo.name} logo`}
            >
              <img
                key={logoUrl}
                src={logoUrl}
                alt={`${logo.name} logo`}
                className="learn-fs__flag-img"
                draggable={false}
                style={{ objectFit: "contain", maxHeight: "110px", padding: "6px" }}
              />
              <span className="learn-fs__flag-hint" aria-hidden="true">⤢ Click to enlarge</span>
            </button>
          ) : (
            <p className="learn-fs__no-image">
              <strong>No logo image shown.</strong> {logo.noImageReason}
            </p>
          )}
        </div>
        {logo.logoExplainer && (
          <LogoExplainer description={logo.logoExplainer} label="What this logo means" />
        )}
      </div>

      <dl className="entity-summary" style={{ marginTop: "1rem" }}>
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Board</dt>
          <dd className="entity-summary__value">
            <strong>{logo.name}</strong>
            {logo.slogan && (
              <span className="learn-fs__sub-desc" style={{ display: "block", fontSize: "0.85em", color: "var(--text-muted)" }}>
                “{logo.slogan}”
              </span>
            )}
          </dd>
        </div>
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Agency</dt>
          <dd className="entity-summary__value">{logo.agency}</dd>
        </div>
        {logo.launched != null && (
          <div className="entity-summary__row">
            <dt className="entity-summary__label">Brand launched</dt>
            <dd className="entity-summary__value">{logo.launched}</dd>
          </div>
        )}
        {logo.visitors ? (
          <div className="entity-summary__row">
            <dt className="entity-summary__label">Annual visitors</dt>
            <dd className="entity-summary__value">
              <strong>{logo.visitors.count.toLocaleString("en-US")} ({logo.visitors.year})</strong>
              <span className="learn-fs__sub-desc" style={{ display: "block", fontSize: "0.85em", color: "var(--text-muted)" }}>
                {logo.visitors.metric}
              </span>
            </dd>
          </div>
        ) : logo.visitorsNote ? (
          <div className="entity-summary__row">
            <dt className="entity-summary__label">Annual visitors</dt>
            <dd className="entity-summary__value">{logo.visitorsNote}</dd>
          </div>
        ) : null}
      </dl>
    </div>
  );
}
