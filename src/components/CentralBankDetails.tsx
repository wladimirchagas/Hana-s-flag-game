import { LogoExplainer } from "./LogoExplainer";
import { EnlargeableLogo } from "./EnlargeableLogo";
import type { CentralBank } from "../types/centralBank";

/**
 * Information widget for a selected national central bank.
 * Rendered in the Finance tab of the Learn panel and when the world-map
 * Show dropdown is set to "Central banks".
 *
 * Logo thumbnails must go through EnlargeableLogo (adaptive cream/dark plate)
 * — same readability treatment as airlines / parties / newspapers. A raw
 * <img> on the panel background fails for dark wordmarks (Bank of Japan,
 * owner report 2026-09).
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
            <EnlargeableLogo
              src={logoUrl}
              alt={`${bank.name} logo`}
              ariaLabel={`Enlarge ${bank.name} logo`}
              onEnlarge={onEnlarge}
              hint="⤢ Click to enlarge"
            />
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
