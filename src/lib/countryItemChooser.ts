/**
 * Learn-mode world-map multi-item Show categories: a country can have several
 * airlines / parties / newspapers / etc. Map (or country-dropdown) selection
 * must not silently pick `[0]` — it opens a country-scoped chooser instead
 * (see `CountryItemChooser`). Single-item countries skip the chooser.
 */
import {
  GRID_CONTENT_TYPE_LABELS,
  type GridContentType,
} from "./gridContentType";
import { airlinesForCountry } from "./commercialAirlines";
import { broadcastersForCountry } from "./publicBroadcasters";
import { tourismLogosForCountry } from "./tourismLogos";
import { newsAgenciesForCountry } from "./nationalNewsAgencies";
import { newspapersForCountry } from "./nationalNewspapers";
import {
  coalitionForParty,
  partiesForCountry,
  partyCardName,
  partyPowerBadges,
} from "./politicalParties";

/** Show modes where one country routinely contributes more than one grid card. */
export const MULTI_ITEM_GRID_CONTENT_TYPES = [
  "airline",
  "broadcaster",
  "tourismlogo",
  "newsagency",
  "newspaper",
  "party",
] as const satisfies readonly GridContentType[];

export type MultiItemGridContentType =
  (typeof MULTI_ITEM_GRID_CONTENT_TYPES)[number];

export function isMultiItemGridContentType(
  type: GridContentType,
): type is MultiItemGridContentType {
  return (MULTI_ITEM_GRID_CONTENT_TYPES as readonly string[]).includes(type);
}

export type CountryChooserBadge = {
  readonly label: string;
  readonly kind: string;
};

/** One card in the country-scoped chooser mini-grid. */
export type CountryChooserItem = {
  readonly id: string;
  readonly name: string;
  /** Bundled image path, or null when the entry has `noImageReason`. */
  readonly image: string | null;
  readonly badges?: readonly CountryChooserBadge[];
};

/** Every chooser card for `countryCode` in the active Show category. */
export function chooserItemsForCountry(
  type: MultiItemGridContentType,
  countryCode: string,
  countryName?: string,
): readonly CountryChooserItem[] {
  switch (type) {
    case "airline":
      return airlinesForCountry(countryCode).map((a) => ({
        id: a.id,
        name: a.name,
        image: a.logo,
      }));
    case "broadcaster":
      return broadcastersForCountry(countryCode).map((b) => ({
        id: b.id,
        name: b.name,
        image: b.logo,
      }));
    case "tourismlogo":
      return tourismLogosForCountry(countryCode).map((t) => ({
        id: t.id,
        name: t.name,
        image: t.logo ?? null,
      }));
    case "newsagency":
      return newsAgenciesForCountry(countryCode).map((n) => ({
        id: n.id,
        name: n.name,
        image: n.logo,
      }));
    case "newspaper":
      return newspapersForCountry(countryCode).map((n) => ({
        id: n.id,
        name: n.name,
        image: n.logo ?? null,
      }));
    case "party": {
      return partiesForCountry(countryCode).map((p) => {
        const coalition = coalitionForParty(p);
        const power = partyPowerBadges(p, p.country);
        const badges: CountryChooserBadge[] = [
          ...power.map((b) => ({ label: b.label, kind: b.kind })),
          ...(coalition
            ? [{ label: coalition.name, kind: "coalition" as const }]
            : []),
        ];
        return {
          id: p.id,
          name: partyCardName(p, countryName),
          image: p.logo ?? null,
          badges: badges.length > 0 ? badges : undefined,
        };
      });
    }
  }
}

/** Heading for the chooser, e.g. "Commercial airlines in Brazil". */
export function chooserHeading(
  type: MultiItemGridContentType,
  countryName: string,
): string {
  return `${GRID_CONTENT_TYPE_LABELS[type]} in ${countryName}`;
}

/** Back-link copy after an item is picked, e.g. "All political parties for Brazil". */
export function chooserBackLabel(
  type: MultiItemGridContentType,
  countryName: string,
): string {
  return `All ${GRID_CONTENT_TYPE_LABELS[type].toLowerCase()} for ${countryName}`;
}
