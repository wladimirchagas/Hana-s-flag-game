import type { PublicBroadcaster } from "../types/broadcaster";

/**
 * Information widget for a selected public service broadcaster.
 * Rendered in the side panel for both:
 * 1. World Map View (when "Public broadcasters" content type is active)
 * 2. Country Map View (when a broadcaster is clicked in the "National symbols" tab)
 *
 * Shows:
 * - Broadcaster logo (with click to enlarge in the lightbox)
 * - (a) Explainer of the logo
 * - (b) Broadcaster name & official legal name
 * - (c) Establishing year
 * - (d) Primary funding model
 * - (e) Headquarters location
 * - (f) Total annual public funding and per capita
 * - (g) Average daily market share
 * - (h) News brand trust score
 * - (i) Local content programming quota
 * - (j) Total full-time staff headcount
 */
export function BroadcasterDetails({
  broadcaster,
  baseUrl = "",
  onEnlarge,
}: {
  broadcaster: PublicBroadcaster;
  baseUrl?: string;
  onEnlarge: (url: string) => void;
}) {
  const logoUrl = broadcaster.logo.startsWith("http") || broadcaster.logo.startsWith("data:")
    ? broadcaster.logo
    : broadcaster.logo.startsWith(baseUrl)
      ? broadcaster.logo
      : `${baseUrl}${broadcaster.logo}`;

  return (
    <div className="broadcaster-details">
      <div className="learn-fs__flag-box">
        <div className="learn-fs__flag-head">
          <span className="entity-summary__label learn-fs__flag-label">Broadcaster logo</span>
          <button
            type="button"
            className="learn-fs__flag"
            onClick={() => onEnlarge(logoUrl)}
            aria-label={`Enlarge ${broadcaster.name} logo`}
          >
            <img
              key={logoUrl}
              src={logoUrl}
              alt={`${broadcaster.name} logo`}
              className="learn-fs__flag-img"
              draggable={false}
              style={{ objectFit: "contain", maxHeight: "110px", padding: "6px" }}
            />
            <span className="learn-fs__flag-hint" aria-hidden="true">⤢ Click to enlarge</span>
          </button>
        </div>
        <p className="learn-fs__flag-design" style={{ marginTop: "0.75rem" }}>
          {broadcaster.logoExplainer}
        </p>
      </div>

      <dl className="entity-summary" style={{ marginTop: "1rem" }}>
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Broadcaster</dt>
          <dd className="entity-summary__value">
            <strong>{broadcaster.name}</strong>
            {broadcaster.officialName && broadcaster.officialName !== broadcaster.name && (
              <span className="learn-fs__sub-desc" style={{ display: "block", fontSize: "0.85em", color: "var(--text-muted)" }}>
                {broadcaster.officialName}
              </span>
            )}
          </dd>
        </div>

        <div className="entity-summary__row">
          <dt className="entity-summary__label">Established</dt>
          <dd className="entity-summary__value">{broadcaster.founded}</dd>
        </div>

        <div className="entity-summary__row">
          <dt className="entity-summary__label">Primary funding</dt>
          <dd className="entity-summary__value">{broadcaster.primaryFunding}</dd>
        </div>

        <div className="entity-summary__row">
          <dt className="entity-summary__label">Headquarters</dt>
          <dd className="entity-summary__value">{broadcaster.headquarters}</dd>
        </div>

        <div className="entity-summary__row">
          <dt className="entity-summary__label">Public funding</dt>
          <dd className="entity-summary__value">
            <strong>{broadcaster.annualPublicFunding.total}</strong>
            <span className="learn-fs__sub-desc" style={{ display: "block", fontSize: "0.85em", color: "var(--text-muted)" }}>
              {broadcaster.annualPublicFunding.perCapita}
            </span>
          </dd>
        </div>

        <div className="entity-summary__row">
          <dt className="entity-summary__label">Daily market share</dt>
          <dd className="entity-summary__value">{broadcaster.dailyMarketShare}</dd>
        </div>

        <div className="entity-summary__row">
          <dt className="entity-summary__label">Brand trust score</dt>
          <dd className="entity-summary__value">
            <strong>{broadcaster.brandTrustScore.score}</strong>
            <span className="learn-fs__sub-desc" style={{ display: "block", fontSize: "0.85em", color: "var(--text-muted)" }}>
              {broadcaster.brandTrustScore.source}
            </span>
          </dd>
        </div>

        <div className="entity-summary__row">
          <dt className="entity-summary__label">Local content quota</dt>
          <dd className="entity-summary__value">{broadcaster.localContentQuota}</dd>
        </div>

        <div className="entity-summary__row">
          <dt className="entity-summary__label">Staff headcount</dt>
          <dd className="entity-summary__value">{broadcaster.staffHeadcount}</dd>
        </div>
      </dl>
    </div>
  );
}
