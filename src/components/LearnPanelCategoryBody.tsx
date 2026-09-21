/**
 * Shared Media / Travel / Politics body for the Learn-mode information panel.
 *
 * Each category hosts a country-scoped chooser (pick one → details → back),
 * so the panel no longer depends on the world-map Show dropdown to browse
 * newspapers, agencies, broadcasters, airlines, tourism logos or parties.
 */
import { CountryItemChooser } from "./CountryItemChooser";
import { AirlineDetails } from "./AirlineDetails";
import { BroadcasterDetails } from "./BroadcasterDetails";
import { TourismLogoDetails } from "./TourismLogoDetails";
import { NewsAgencyDetails } from "./NewsAgencyDetails";
import { NewspaperDetails } from "./NewspaperDetails";
import { PoliticalPartyDetails } from "./PoliticalPartyDetails";
import {
  chooserBackLabel,
  chooserItemsForCountry,
  type MultiItemGridContentType,
} from "../lib/countryItemChooser";
import type { CommercialAirline } from "../types/airline";
import type { PublicBroadcaster } from "../types/broadcaster";
import type { TourismLogo } from "../types/tourismLogo";
import type { NewsAgency } from "../types/newsAgency";
import type { Newspaper } from "../types/newspaper";
import type { PoliticalParty } from "../data/politicalParties";
import { airlineById } from "../lib/commercialAirlines";
import { broadcasterById } from "../lib/publicBroadcasters";
import { tourismLogoById } from "../lib/tourismLogos";
import { newsAgencyById } from "../lib/nationalNewsAgencies";
import { newspaperById } from "../lib/nationalNewspapers";
import { partyById } from "../lib/politicalParties";

export type PanelCategorySection = {
  id: MultiItemGridContentType;
  label: string;
};

function resolveActiveItem(
  type: MultiItemGridContentType,
  countryCode: string,
  pickedId: string | null,
):
  | { kind: "airline"; item: CommercialAirline }
  | { kind: "broadcaster"; item: PublicBroadcaster }
  | { kind: "tourismlogo"; item: TourismLogo }
  | { kind: "newsagency"; item: NewsAgency }
  | { kind: "newspaper"; item: Newspaper }
  | { kind: "party"; item: PoliticalParty }
  | null {
  const items = chooserItemsForCountry(type, countryCode);
  const effectiveId =
    pickedId ?? (items.length === 1 ? items[0].id : null);
  if (!effectiveId) return null;

  switch (type) {
    case "airline": {
      const item = airlineById(effectiveId);
      return item && item.countryCode === countryCode
        ? { kind: "airline", item }
        : null;
    }
    case "broadcaster": {
      const item = broadcasterById(effectiveId);
      return item && item.countryCode === countryCode
        ? { kind: "broadcaster", item }
        : null;
    }
    case "tourismlogo": {
      const item = tourismLogoById(effectiveId);
      return item && item.countryCode === countryCode
        ? { kind: "tourismlogo", item }
        : null;
    }
    case "newsagency": {
      const item = newsAgencyById(effectiveId);
      return item && item.countryCode === countryCode
        ? { kind: "newsagency", item }
        : null;
    }
    case "newspaper": {
      const item = newspaperById(effectiveId);
      return item && item.countryCode === countryCode
        ? { kind: "newspaper", item }
        : null;
    }
    case "party": {
      const item = partyById(effectiveId);
      return item && item.country === countryCode
        ? { kind: "party", item }
        : null;
    }
  }
}

export function LearnPanelCategoryBody({
  sections,
  activeSection,
  onSectionChange,
  countryCode,
  countryName,
  pickedId,
  onPick,
  onClearPick,
  resolveImage,
  baseUrl,
  onEnlarge,
}: {
  sections: readonly PanelCategorySection[];
  activeSection: MultiItemGridContentType;
  onSectionChange: (id: MultiItemGridContentType) => void;
  countryCode: string;
  countryName: string;
  pickedId: string | null;
  onPick: (id: string) => void;
  onClearPick: () => void;
  resolveImage: (raw: string) => string;
  baseUrl: string;
  onEnlarge: (url: string) => void;
}) {
  const items = chooserItemsForCountry(activeSection, countryCode, countryName);
  const active = resolveActiveItem(activeSection, countryCode, pickedId);
  // Chooser when the country has 0 items (empty state) or several and none
  // picked yet. A lone item skips the chooser and opens its details directly.
  const showChooser =
    items.length === 0 || (items.length > 1 && !pickedId);
  const showDetails = active != null && !showChooser;
  const showBack = showDetails && items.length > 1;

  return (
    <div className="learn-panel-category">
      {sections.length > 1 && (
        <div
          className="learn-panel-category__sections"
          role="tablist"
          aria-label="Category"
        >
          {sections.map((s) => {
            const selected = s.id === activeSection;
            const count = chooserItemsForCountry(s.id, countryCode).length;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={selected}
                className={`learn-panel-category__section${
                  selected ? " learn-panel-category__section--active" : ""
                }`}
                onClick={() => onSectionChange(s.id)}
              >
                {s.label}
                <span className="flag-tabs__count">{count}</span>
              </button>
            );
          })}
        </div>
      )}

      {showBack && (
        <button
          type="button"
          className="country-chooser__back"
          onClick={onClearPick}
        >
          ← {chooserBackLabel(activeSection, countryName)}
        </button>
      )}

      {showChooser && (
        <CountryItemChooser
          type={activeSection}
          countryName={countryName}
          items={items}
          resolveImage={resolveImage}
          onSelect={onPick}
        />
      )}

      {showDetails && active?.kind === "airline" && (
        <AirlineDetails
          airline={active.item}
          baseUrl={baseUrl}
          onEnlarge={onEnlarge}
        />
      )}
      {showDetails && active?.kind === "broadcaster" && (
        <BroadcasterDetails
          broadcaster={active.item}
          baseUrl={baseUrl}
          onEnlarge={onEnlarge}
        />
      )}
      {showDetails && active?.kind === "tourismlogo" && (
        <TourismLogoDetails
          logo={active.item}
          baseUrl={baseUrl}
          onEnlarge={onEnlarge}
        />
      )}
      {showDetails && active?.kind === "newsagency" && (
        <NewsAgencyDetails
          agency={active.item}
          baseUrl={baseUrl}
          onEnlarge={onEnlarge}
        />
      )}
      {showDetails && active?.kind === "newspaper" && (
        <NewspaperDetails
          newspaper={active.item}
          baseUrl={baseUrl}
          onEnlarge={onEnlarge}
        />
      )}
      {showDetails && active?.kind === "party" && (
        <PoliticalPartyDetails
          party={active.item}
          baseUrl={baseUrl}
          onEnlarge={onEnlarge}
        />
      )}
    </div>
  );
}
