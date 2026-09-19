/**
 * Country-scoped mini-grid shown in the Learn-mode detail panel when the user
 * selects a country on the world map (or via the country dropdown) while the
 * Show dropdown is on a multi-item category (airlines, parties, newspapers…).
 *
 * Reuses the world grid's card chrome so the chooser reads as a filtered
 * slice of the same list — not a second visual language.
 */
import { Fragment } from "react";
import { AutoFitName } from "./AutoFitName";
import { GridImage } from "./GridImage";
import type {
  CountryChooserItem,
  MultiItemGridContentType,
} from "../lib/countryItemChooser";
import { chooserHeading } from "../lib/countryItemChooser";

export function CountryItemChooser({
  type,
  countryName,
  items,
  resolveImage,
  onSelect,
}: {
  type: MultiItemGridContentType;
  countryName: string;
  items: readonly CountryChooserItem[];
  resolveImage: (raw: string) => string;
  onSelect: (id: string) => void;
}) {
  const heading = chooserHeading(type, countryName);

          if (items.length === 0) {
    return (
      <div className="country-chooser">
        <h3 className="country-chooser__title">{heading}</h3>
        <p className="country-chooser__empty">
          None sourced for {countryName} yet.
        </p>
      </div>
    );
  }

  return (
    <div className="country-chooser">
      <h3 className="country-chooser__title">
        {heading}
        <span className="country-chooser__count">{items.length}</span>
      </h3>
      <p className="country-chooser__hint">Pick one to see its details.</p>
      <ul className="country-chooser__list flag-grid__list">
        {items.map((item) => {
          const url = item.image ? resolveImage(item.image) : null;
          return (
            <li key={item.id} className="flag-grid__item">
              <button
                type="button"
                className="flag-grid__card"
                onClick={() => onSelect(item.id)}
                aria-label={`Select ${item.name}`}
              >
                <span className="flag-grid__thumb">
                  {url ? (
                    <Fragment key={url}>
                      <GridImage
                        src={url}
                        alt=""
                        draggable={false}
                        className="flag-grid__thumb-img"
                        onError={(e) => {
                          const img = e.currentTarget;
                          img.hidden = true;
                          const sib = img.nextElementSibling as HTMLElement | null;
                          if (sib) sib.hidden = false;
                        }}
                      />
                      <span className="flag-grid__thumb-empty" aria-hidden="true" hidden>
                        —
                      </span>
                    </Fragment>
                  ) : (
                    <span className="flag-grid__thumb-empty" aria-hidden="true">
                      —
                    </span>
                  )}
                </span>
                <span className="flag-grid__name">
                  <AutoFitName className="flag-grid__name-text" text={item.name} />
                </span>
                {item.badges && item.badges.length > 0 && (
                  <span className="flag-grid__party-badges">
                    {item.badges.map((b) => (
                      <span
                        key={`${b.kind}-${b.label}`}
                        className={`flag-grid__party-badge flag-grid__party-badge--${b.kind}`}
                      >
                        {b.label}
                      </span>
                    ))}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
