import { LogoExplainer } from "./LogoExplainer";
import type { NewsAgency } from "../types/newsAgency";

/**
 * Information widget for a selected national news agency.
 * Rendered in the side panel for both:
 * 1. World Map View (when "National news agencies" content type is active)
 * 2. Country Map View (when a news agency is clicked in the "National symbols" tab)
 */
export function NewsAgencyDetails({
  agency,
  baseUrl = "",
  onEnlarge,
}: {
  agency: NewsAgency;
  baseUrl?: string;
  onEnlarge: (url: string) => void;
}) {
  const logoUrl = agency.logo.startsWith("http") || agency.logo.startsWith("data:")
    ? agency.logo
    : agency.logo.startsWith(baseUrl)
      ? agency.logo
      : `${baseUrl}${agency.logo}`;

  return (
    <div className="broadcaster-details news-agency-details">
      <div className="learn-fs__flag-box">
        <div className="learn-fs__flag-head">
          <span className="entity-summary__label learn-fs__flag-label">Agency logo / emblem</span>
          <button
            type="button"
            className="learn-fs__flag"
            onClick={() => onEnlarge(logoUrl)}
            aria-label={`Enlarge ${agency.name} logo`}
          >
            <img
              key={logoUrl}
              src={logoUrl}
              alt={`${agency.name} logo`}
              className="learn-fs__flag-img"
              draggable={false}
              style={{ objectFit: "contain", maxHeight: "110px", padding: "6px" }}
            />
            <span className="learn-fs__flag-hint" aria-hidden="true">⤢ Click to enlarge</span>
          </button>
        </div>
        <LogoExplainer description={agency.logoExplainer} label="What this logo represents" />
      </div>

      <dl className="entity-summary" style={{ marginTop: "1rem" }}>
        <div className="entity-summary__row">
          <dt className="entity-summary__label">National News Agency</dt>
          <dd className="entity-summary__value">
            <strong>{agency.name}</strong>
            {agency.englishTranslation && agency.englishTranslation !== agency.name && (
              <span className="learn-fs__sub-desc" style={{ display: "block", fontSize: "0.85em", color: "var(--text-muted)" }}>
                English: {agency.englishTranslation}
              </span>
            )}
            {agency.nativeName && agency.nativeName !== agency.name && (
              <span className="learn-fs__sub-desc" style={{ display: "block", fontSize: "0.85em", color: "var(--text-muted)" }}>
                Native: {agency.nativeName}
              </span>
            )}
            {agency.officialName && agency.officialName !== agency.name && agency.officialName !== agency.nativeName && (
              <span className="learn-fs__sub-desc" style={{ display: "block", fontSize: "0.85em", color: "var(--text-muted)" }}>
                Official: {agency.officialName}
              </span>
            )}
          </dd>
        </div>

        {agency.motto && (
          <div className="entity-summary__row">
            <dt className="entity-summary__label">Motto</dt>
            <dd className="entity-summary__value">
              <em>"{agency.motto.original}"</em>
              {agency.motto.translation && (
                <span className="learn-fs__sub-desc" style={{ display: "block", fontSize: "0.85em", color: "var(--text-muted)" }}>
                  Translation: {agency.motto.translation}
                </span>
              )}
            </dd>
          </div>
        )}

        <div className="entity-summary__row">
          <dt className="entity-summary__label">Established</dt>
          <dd className="entity-summary__value">{agency.founded}</dd>
        </div>

        <div className="entity-summary__row">
          <dt className="entity-summary__label">Headquarters</dt>
          <dd className="entity-summary__value">{agency.headquarters}</dd>
        </div>

        <div className="entity-summary__row">
          <dt className="entity-summary__label">Ownership</dt>
          <dd className="entity-summary__value">
            <strong>{agency.owner.name}</strong>
            <span className="learn-fs__sub-desc" style={{ display: "block", fontSize: "0.85em", color: "var(--text-muted)" }}>
              {agency.owner.type}
            </span>
          </dd>
        </div>

        <div className="entity-summary__row">
          <dt className="entity-summary__label">Format & wire services</dt>
          <dd className="entity-summary__value">{agency.format}</dd>
        </div>

        <div className="entity-summary__row">
          <dt className="entity-summary__label">Editorial remit</dt>
          <dd className="entity-summary__value">{agency.editorialStance}</dd>
        </div>

        <div className="entity-summary__row">
          <dt className="entity-summary__label">Audience & reach</dt>
          <dd className="entity-summary__value">
            <strong>{agency.readership.metric}</strong>
            <span className="learn-fs__sub-desc" style={{ display: "block", fontSize: "0.85em", color: "var(--text-muted)" }}>
              Source: {agency.readership.source}
            </span>
          </dd>
        </div>

        {agency.annualPublicFunding && (
          <div className="entity-summary__row">
            <dt className="entity-summary__label">Public funding</dt>
            <dd className="entity-summary__value">
              <strong>{agency.annualPublicFunding.total}</strong>
              <span className="learn-fs__sub-desc" style={{ display: "block", fontSize: "0.85em", color: "var(--text-muted)" }}>
                {agency.annualPublicFunding.perCapita}
              </span>
            </dd>
          </div>
        )}

        <div className="entity-summary__row">
          <dt className="entity-summary__label">Revenue model</dt>
          <dd className="entity-summary__value">{agency.revenueModel}</dd>
        </div>

        <div className="entity-summary__row">
          <dt className="entity-summary__label">Languages</dt>
          <dd className="entity-summary__value">{agency.language}</dd>
        </div>
      </dl>
    </div>
  );
}
