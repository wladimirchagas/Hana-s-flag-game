import { LogoExplainer } from "./LogoExplainer";
import type { Newspaper } from "../types/newspaper";

/**
 * Information widget for a selected national newspaper.
 * Rendered in the side panel for both:
 * 1. World Map View (when "Top newspapers" content type is active)
 * 2. Country Map View (when a newspaper is clicked in the "National symbols" tab)
 */
export function NewspaperDetails({
  newspaper,
  baseUrl = "",
  onEnlarge,
}: {
  newspaper: Newspaper;
  baseUrl?: string;
  onEnlarge: (url: string) => void;
}) {
  const logoUrl = newspaper.logo
    ? newspaper.logo.startsWith("http") || newspaper.logo.startsWith("data:")
      ? newspaper.logo
      : newspaper.logo.startsWith(baseUrl)
        ? newspaper.logo
        : `${baseUrl}${newspaper.logo}`
    : null;

  return (
    <div className="broadcaster-details newspaper-details">
      <div className="learn-fs__flag-box">
        <div className="learn-fs__flag-head">
          <span className="entity-summary__label learn-fs__flag-label">Newspaper masthead / logo</span>
          {logoUrl ? (
            <button
              type="button"
              className="learn-fs__flag"
              onClick={() => onEnlarge(logoUrl)}
              aria-label={`Enlarge ${newspaper.name} logo`}
            >
              <img
                key={logoUrl}
                src={logoUrl}
                alt={`${newspaper.name} masthead`}
                className="learn-fs__flag-img"
                draggable={false}
                style={{ objectFit: "contain", maxHeight: "110px", padding: "6px" }}
              />
              <span className="learn-fs__flag-hint" aria-hidden="true">⤢ Click to enlarge</span>
            </button>
          ) : (
            <div className="learn-fs__flag learn-fs__flag--empty" aria-label="No free masthead image">
              <span className="flag-grid__thumb-empty" aria-hidden="true">—</span>
              <p className="learn-fs__sub-desc" style={{ margin: "0.5rem 0 0", fontSize: "0.85em" }}>
                {newspaper.noImageReason ?? "No freely-citable masthead is bundled for this newspaper."}
              </p>
            </div>
          )}
        </div>
        {newspaper.logoExplainer && (
          <LogoExplainer description={newspaper.logoExplainer} label="What this masthead represents" />
        )}
      </div>

      <dl className="entity-summary" style={{ marginTop: "1rem" }}>
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Newspaper</dt>
          <dd className="entity-summary__value">
            <strong>{newspaper.name}</strong>
            {newspaper.englishTranslation && newspaper.englishTranslation !== newspaper.name && (
              <span className="learn-fs__sub-desc" style={{ display: "block", fontSize: "0.85em", color: "var(--text-muted)" }}>
                English: {newspaper.englishTranslation}
              </span>
            )}
            {newspaper.nativeName && newspaper.nativeName !== newspaper.name && (
              <span className="learn-fs__sub-desc" style={{ display: "block", fontSize: "0.85em", color: "var(--text-muted)" }}>
                Native: {newspaper.nativeName}
              </span>
            )}
            {newspaper.officialName && newspaper.officialName !== newspaper.name && newspaper.officialName !== newspaper.nativeName && (
              <span className="learn-fs__sub-desc" style={{ display: "block", fontSize: "0.85em", color: "var(--text-muted)" }}>
                Official: {newspaper.officialName}
              </span>
            )}
          </dd>
        </div>
        {newspaper.motto && (
          <div className="entity-summary__row">
            <dt className="entity-summary__label">Motto</dt>
            <dd className="entity-summary__value">
              <em>"{newspaper.motto.original}"</em>
              {newspaper.motto.translation && (
                <span className="learn-fs__sub-desc" style={{ display: "block", fontSize: "0.85em", color: "var(--text-muted)" }}>
                  ({newspaper.motto.translation})
                </span>
              )}
            </dd>
          </div>
        )}
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Founded</dt>
          <dd className="entity-summary__value">{newspaper.founded}</dd>
        </div>
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Format</dt>
          <dd className="entity-summary__value">{newspaper.format}</dd>
        </div>
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Frequency</dt>
          <dd className="entity-summary__value">{newspaper.frequency}</dd>
        </div>
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Language</dt>
          <dd className="entity-summary__value">{newspaper.language}</dd>
        </div>
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Headquarters</dt>
          <dd className="entity-summary__value">{newspaper.headquarters}</dd>
        </div>
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Owner</dt>
          <dd className="entity-summary__value">
            {newspaper.owner.name} ({newspaper.owner.type})
          </dd>
        </div>
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Editorial Remit</dt>
          <dd className="entity-summary__value">{newspaper.editorialStance}</dd>
        </div>
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Readership & Reach</dt>
          <dd className="entity-summary__value">
            {newspaper.readership.metric}
            <span className="learn-fs__sub-desc" style={{ display: "block", fontSize: "0.85em", color: "var(--text-muted)" }}>
              Source: {newspaper.readership.source}
            </span>
          </dd>
        </div>
        {newspaper.annualPublicFunding && (
          <div className="entity-summary__row">
            <dt className="entity-summary__label">Public Funding</dt>
            <dd className="entity-summary__value">
              {newspaper.annualPublicFunding.total} ({newspaper.annualPublicFunding.perCapita})
            </dd>
          </div>
        )}
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Revenue Model</dt>
          <dd className="entity-summary__value">{newspaper.revenueModel}</dd>
        </div>
        {newspaper.sources && newspaper.sources.length > 0 && (
          <div className="entity-summary__row">
            <dt className="entity-summary__label">Citations</dt>
            <dd className="entity-summary__value">
              <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.9em" }}>
                {newspaper.sources.map((src, i) => (
                  <li key={i}>
                    <a href={src} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
                      {src}
                    </a>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
