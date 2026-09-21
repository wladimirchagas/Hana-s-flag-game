import { LogoExplainer } from "./LogoExplainer";
import type { CentralBank } from "../types/centralBank";

/**
 * Information widget for a selected national central bank.
 * Rendered in the Finance tab of the Learn panel and when the world-map
 * Show dropdown is set to "Central banks".
 */
export function CentralBankDetails({
  bank,
  baseUrl = "",
  onEnlarge,
}: {
  bank: CentralBank;
  baseUrl?: string;
  onEnlarge: (url: string) => void;
}) {
  const logoUrl = bank.logo
    ? bank.logo.startsWith("http") || bank.logo.startsWith("data:")
      ? bank.logo
      : bank.logo.startsWith(baseUrl)
        ? bank.logo
        : `${baseUrl}${bank.logo.replace(/^\//, "")}`
    : null;

  return (
    <div className="central-bank-details">
      <div className="learn-fs__flag-box">
        <div className="learn-fs__flag-head">
          <span className="entity-summary__label learn-fs__flag-label">Central bank logo</span>
          {logoUrl ? (
            <button
              type="button"
              className="learn-fs__flag"
              onClick={() => onEnlarge(logoUrl)}
              aria-label={`Enlarge ${bank.name} logo`}
            >
              <img
                key={logoUrl}
                src={logoUrl}
                alt={`${bank.name} logo`}
                className="learn-fs__flag-img"
                draggable={false}
                style={{ objectFit: "contain", maxHeight: "110px", padding: "6px" }}
              />
              <span className="learn-fs__flag-hint" aria-hidden="true">⤢ Click to enlarge</span>
            </button>
          ) : (
            <p className="learn-fs__no-image">
              <strong>No logo image shown.</strong> {bank.noImageReason}
            </p>
          )}
        </div>
        {bank.logoExplainer && (
          <LogoExplainer description={bank.logoExplainer} label="What this logo means" />
        )}
      </div>

      <dl className="entity-summary" style={{ marginTop: "1rem" }}>
        <div className="entity-summary__row">
          <dt className="entity-summary__label">Central bank</dt>
          <dd className="entity-summary__value">
            <strong>{bank.name}</strong>
            {bank.shortName ? ` (${bank.shortName})` : null}
          </dd>
        </div>
        {bank.founded != null && (
          <div className="entity-summary__row">
            <dt className="entity-summary__label">Founded</dt>
            <dd className="entity-summary__value">{bank.founded}</dd>
          </div>
        )}
        {bank.headquarters && (
          <div className="entity-summary__row">
            <dt className="entity-summary__label">Headquarters</dt>
            <dd className="entity-summary__value">{bank.headquarters}</dd>
          </div>
        )}
        {bank.currencyUnion && (
          <div className="entity-summary__row">
            <dt className="entity-summary__label">Currency union</dt>
            <dd className="entity-summary__value">{bank.currencyUnion}</dd>
          </div>
        )}
        {bank.website && (
          <div className="entity-summary__row">
            <dt className="entity-summary__label">Website</dt>
            <dd className="entity-summary__value">
              <a href={bank.website} target="_blank" rel="noopener noreferrer">
                {bank.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </a>
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
