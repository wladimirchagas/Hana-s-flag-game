/**
 * Overview-tab identity image: national flag and coat of arms as pills.
 * The leading image on Overview is always one of these two — passports,
 * crests and Olympic logos live on Travel / Sports instead.
 */
import { FlagMeaning } from "./FlagMeaning";
import { UiIcon } from "./UiIcon";
import {
  nationalSymbolEntry,
} from "../lib/nationalSymbolImages";
import {
  meaningLabel,
  symbolNoun,
} from "../lib/nationalFlags";
import { NATIONAL_FLAG_MEANINGS } from "../data/nationalFlags";
import type { Country } from "../api/countries";

export type OverviewIdentityKind = "flag" | "coatofarms";

export function OverviewIdentity({
  country,
  active,
  onChange,
  flagUrl,
  flagPngFallback,
  baseUrl,
  onEnlarge,
  onFlagError,
}: {
  country: Country;
  active: OverviewIdentityKind;
  onChange: (kind: OverviewIdentityKind) => void;
  flagUrl: string | null;
  flagPngFallback: string | null;
  baseUrl: string;
  onEnlarge: (url: string) => void;
  onFlagError: () => void;
}) {
  const arms = nationalSymbolEntry(country.code, "coatofarms");
  const showArmsPill = arms != null;
  const showingArms = active === "coatofarms" && arms != null;
  const armsUrl =
    showingArms && arms.path
      ? arms.path.startsWith("http") ||
        arms.path.startsWith("data:") ||
        arms.path.startsWith(baseUrl)
        ? arms.path
        : `${baseUrl}${arms.path.replace(/^\//, "")}`
      : null;
  const imageUrl = showingArms ? armsUrl : flagUrl;
  const label = showingArms
    ? symbolNoun("coatofarms")
    : "Flag";

  return (
    <div className="overview-identity">
      {showArmsPill && (
        <div
          className="learn-panel-category__sections overview-identity__pills"
          role="tablist"
          aria-label="National symbols"
        >
          <button
            type="button"
            role="tab"
            aria-selected={!showingArms}
            className={`learn-panel-category__section${
              !showingArms ? " learn-panel-category__section--active" : ""
            }`}
            onClick={() => onChange("flag")}
          >
            Flag
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={showingArms}
            className={`learn-panel-category__section${
              showingArms ? " learn-panel-category__section--active" : ""
            }`}
            onClick={() => onChange("coatofarms")}
          >
            Coat of arms
          </button>
        </div>
      )}

      <div className="learn-fs__flag-box">
        <div className="learn-fs__flag-head">
          <span className="entity-summary__label learn-fs__flag-label">
            {label}
          </span>
          {showingArms && arms?.noImageReason ? (
            <p className="learn-fs__no-image">
              <strong>No image shown.</strong> {arms.noImageReason}
            </p>
          ) : imageUrl ? (
            <button
              type="button"
              className="learn-fs__flag"
              onClick={() => onEnlarge(imageUrl)}
              aria-label={`Enlarge ${showingArms && arms ? arms.name : `${country.name} flag`}`}
            >
              <img
                key={imageUrl}
                src={imageUrl}
                alt=""
                className="learn-fs__flag-img"
                draggable={false}
                onError={(e) => {
                  if (showingArms) {
                    onFlagError();
                    return;
                  }
                  const img = e.currentTarget;
                  if (flagPngFallback && img.src !== flagPngFallback) {
                    img.src = flagPngFallback;
                  } else {
                    onFlagError();
                  }
                }}
              />
              <span className="learn-fs__flag-hint" aria-hidden="true">
                <UiIcon name="expand" /> Click to enlarge
              </span>
            </button>
          ) : null}
        </div>
        {showingArms && arms ? (
          <>
            <p className="learn-fs__flag-design">{arms.design}</p>
            <FlagMeaning
              code={arms.id}
              meanings={NATIONAL_FLAG_MEANINGS}
              label={meaningLabel("coatofarms")}
            />
          </>
        ) : (
          <FlagMeaning code={country.code} />
        )}
      </div>
    </div>
  );
}
