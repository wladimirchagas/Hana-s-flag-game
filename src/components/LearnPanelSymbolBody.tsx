/**
 * Passport / Football / Olympics body for the Learn-mode information panel.
 *
 * Same chooser → details → back pattern as LearnPanelCategoryBody, but the
 * items are NationalFlag entries (with their sourced stats / explainers) and
 * details render through NationalFlagDetails.
 */
import type { ReactNode } from "react";
import { CountryItemChooser } from "./CountryItemChooser";
import { NationalFlagDetails } from "./NationalFlagDetails";
import {
  findNationalFlag,
  symbolsOfCategory,
} from "../lib/nationalFlags";
import type { LearnPanelSymbolSection } from "../lib/learnPanelTabs";
import type { CountryChooserItem } from "../lib/countryItemChooser";

export type SymbolPanelSection = {
  id: LearnPanelSymbolSection;
  label: string;
};

function chooserItems(
  countryCode: string,
  section: LearnPanelSymbolSection,
): readonly CountryChooserItem[] {
  return symbolsOfCategory(countryCode, section).map((f) => ({
    id: f.id,
    name: f.name,
    image: f.path ?? null,
  }));
}

function backLabel(section: LearnPanelSymbolSection, countryName: string): string {
  switch (section) {
    case "passport":
      return `All passports for ${countryName}`;
    case "footballcrest":
      return `All football associations for ${countryName}`;
    case "olympiccommittee":
      return `All Olympic committees for ${countryName}`;
  }
}

function chooserHeadingFor(
  section: LearnPanelSymbolSection,
  countryName: string,
): string {
  switch (section) {
    case "passport":
      return `Passports in ${countryName}`;
    case "footballcrest":
      return `Football associations in ${countryName}`;
    case "olympiccommittee":
      return `Olympic committees in ${countryName}`;
  }
}

function emptyNoun(section: LearnPanelSymbolSection): string {
  switch (section) {
    case "passport":
      return "passports";
    case "footballcrest":
      return "football associations";
    case "olympiccommittee":
      return "Olympic committees";
  }
}

export function LearnPanelSymbolBody({
  sections,
  activeSection,
  onSectionChange,
  countryCode,
  countryName,
  pickedId,
  onPick,
  onClearPick,
  baseUrl,
  onEnlarge,
  preamble,
}: {
  sections: readonly SymbolPanelSection[];
  activeSection: LearnPanelSymbolSection;
  onSectionChange: (id: LearnPanelSymbolSection) => void;
  countryCode: string;
  countryName: string;
  pickedId: string | null;
  onPick: (id: string) => void;
  onClearPick: () => void;
  baseUrl: string;
  onEnlarge: (url: string) => void;
  preamble?: ReactNode;
}) {
  const items = chooserItems(countryCode, activeSection);
  const effectiveId =
    pickedId ?? (items.length === 1 ? items[0].id : null);
  const active = effectiveId
    ? findNationalFlag(countryCode, effectiveId)
    : null;
  const showChooser =
    items.length === 0 || (items.length > 1 && !pickedId);
  const showDetails = active != null && !showChooser;
  const showBack = showDetails && items.length > 1;

  return (
    <div className="learn-panel-category">
      {preamble}

      {sections.length > 1 && (
        <div
          className="learn-panel-category__sections"
          role="tablist"
          aria-label="Category"
        >
          {sections.map((s) => {
            const selected = s.id === activeSection;
            const count = chooserItems(countryCode, s.id).length;
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
          ← {backLabel(activeSection, countryName)}
        </button>
      )}

      {showChooser && items.length === 0 && (
        <p className="learn-panel-tabs__empty">
          No {emptyNoun(activeSection)} sourced for {countryName} yet.
        </p>
      )}

      {showChooser && items.length > 0 && (
        <CountryItemChooser
          type="newspaper"
          countryName={countryName}
          items={items}
          heading={chooserHeadingFor(activeSection, countryName)}
          resolveImage={(raw) =>
            raw.startsWith("http") || raw.startsWith("data:") || raw.startsWith(baseUrl)
              ? raw
              : `${baseUrl}${raw.replace(/^\//, "")}`
          }
          onSelect={onPick}
        />
      )}

      {showDetails && active && (
        <NationalFlagDetails
          flag={active}
          countryCode={countryCode}
          countryName={countryName}
          baseUrl={baseUrl}
          onEnlarge={onEnlarge}
        />
      )}
    </div>
  );
}
