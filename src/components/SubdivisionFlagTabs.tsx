import { useMemo, useState } from "react";
import type { SubdivisionMeta } from "../types/subdivision";
import { SubdivisionFlagGrid } from "./SubdivisionFlagGrid";
import { CityFlagGrid } from "./CityFlagGrid";
import { NationalFlagGrid } from "./NationalFlagGrid";
import { SubdivisionHierarchyChart } from "./SubdivisionHierarchyChart";
import { SubdivisionHierarchyTable } from "./SubdivisionHierarchyTable";
import { countryCityFlagCount } from "../lib/cityFlags";
import { totalNationalFlagCount } from "../lib/specialEntities";
import type { NationalFlag } from "../data/nationalFlags";
import type { FlagMeaning } from "../data/flagMeanings";
import { DISPUTED_TERRITORY_HIERARCHY } from "../lib/disputedSubdivisions";

/**
 * Tabbed sub-national drill-down grid shown below the Learn map.
 *
 * Three views of the same country's flags:
 *  1. Sub-national divisions — the existing subdivision flag grid.
 *  2. Capital cities         — every available capital-city flag.
 *  2b. National symbols      — the country's OWN symbols: historical national flags
 *      (newest first, current one included), any additional officially recognised
 *      flags, military service flags, maritime ensigns/jacks, head-of-state
 *      standards, civil/state variants and indigenous flags. Categories a country
 *      has none of are hidden entirely.
 *  3. Hierarchy              — an interactive nation → subdivision → city org
 *     chart, with a table/chart layout toggle: the table renders the SAME
 *     entities as a flat 3-column table (type, sub-national flag, capital city
 *     flag) instead of an org chart — see `SubdivisionHierarchyTable`.
 *
 * All three drive the SAME selection callbacks, so picking a flag in any tab
 * updates the world/subdivision map highlight and the country/subdivision widget.
 *
 * The selected top-level tab and hierarchy layout are persisted to
 * localStorage so they survive switching countries or reloading the page,
 * instead of resetting to the default every time.
 */
type TabId = "sub" | "city" | "nat" | "tree";
type TreeLayout = "table" | "chart";

const TAB_STORAGE_KEY = "hana-flag-game.subdivision-flag-tab";
const LAYOUT_STORAGE_KEY = "hana-flag-game.hierarchy-layout";

function loadTab(): TabId {
  try {
    const raw = localStorage.getItem(TAB_STORAGE_KEY);
    if (raw === "sub" || raw === "city" || raw === "nat" || raw === "tree") return raw;
  } catch {
    // ignore — quota or no-storage browser
  }
  // No stored choice yet — open on the first tab, which is "National symbols"
  // wherever the country has any (the caller falls back when it has none).
  return "nat";
}

function saveTab(t: TabId): void {
  try {
    localStorage.setItem(TAB_STORAGE_KEY, t);
  } catch {
    // ignore
  }
}

function loadLayout(): TreeLayout {
  try {
    const raw = localStorage.getItem(LAYOUT_STORAGE_KEY);
    if (raw === "table" || raw === "chart") return raw;
  } catch {
    // ignore
  }
  return "table";
}

function saveLayout(l: TreeLayout): void {
  try {
    localStorage.setItem(LAYOUT_STORAGE_KEY, l);
  } catch {
    // ignore
  }
}

type Props = {
  divisions: SubdivisionMeta[];
  pluralLabel: string;
  countryName: string;
  countryCode: string;
  countryFlagUrl: string | null;
  /** Selected subdivision code (if any). */
  selectedCode: string | null;
  /** True when the "View capital" drill-down is open for the selected code. */
  capitalActive: boolean;
  /** Name of the selected standalone national capital (if any), for the chart's
   *  active highlight. */
  activeNationalCapital?: string | null;
  baseUrl: string;
  onSelectSubdivision: (code: string) => void;
  onSelectCapital: (code: string) => void;
  onSelectNationalCapital: (cap: { name: string; note: string | null; flagPath: string | null }) => void;
  onSelectCountry: () => void;
  /** id of the national flag whose widget is open (if any). */
  selectedNationalFlagId: string | null;
  onSelectNationalFlag: (flag: NationalFlag) => void;
  /** A collective subdivision-group flag (Malaysia's Federal Territories), shown
   *  in the hierarchy — opens its own widget with its sourced meaning. */
  onSelectGroupFlag: (flag: NationalFlag, meaning: FlagMeaning | null) => void;
};

export function SubdivisionFlagTabs({
  divisions,
  pluralLabel,
  countryName,
  countryCode,
  countryFlagUrl,
  selectedCode,
  capitalActive,
  activeNationalCapital,
  baseUrl,
  onSelectSubdivision,
  onSelectCapital,
  onSelectNationalCapital,
  onSelectCountry,
  selectedNationalFlagId,
  onSelectNationalFlag,
  onSelectGroupFlag,
}: Props) {
  const [tab, setTabState] = useState<TabId>(loadTab);
  const [treeLayout, setTreeLayoutState] = useState<TreeLayout>(loadLayout);

  const setTab = (t: TabId) => {
    setTabState(t);
    saveTab(t);
  };
  const setTreeLayout = (l: TreeLayout) => {
    setTreeLayoutState(l);
    saveLayout(l);
  };

  const subCount = useMemo(
    () => divisions.filter((d) => !(d.code in DISPUTED_TERRITORY_HIERARCHY)).length,
    [divisions],
  );
  const cityCount = useMemo(
    () => countryCityFlagCount(countryCode),
    [countryCode],
  );
  // Includes the country's own symbols AND any special-status entities grouped
  // under it (China → Hong Kong, Macau, Taiwan), so the count matches the grid.
  const natCount = useMemo(() => totalNationalFlagCount(countryCode), [countryCode]);

  const hasDivisions = divisions.length > 0;

  // "National symbols" leads: it holds the country's own symbols — the ones a visitor
  // is most likely to have come for — so it reads before the sub-national grid.
  // The sub-national / capital-cities / hierarchy tabs all iterate the country's
  // subdivisions, so they appear only when the country HAS subdivisions; a country
  // with none (e.g. Kiribati, Monaco) still shows its National symbols tab — the
  // whole section must never vanish just because there are no divisions.
  const TABS: { id: TabId; label: string; count?: number }[] = [
    ...(natCount > 0
      ? [{ id: "nat" as const, label: "National symbols", count: natCount }]
      : []),
    ...(hasDivisions
      ? [
          { id: "sub" as const, label: "Sub-national divisions", count: subCount },
          { id: "city" as const, label: "Capital cities", count: cityCount },
          { id: "tree" as const, label: "Hierarchy" },
        ]
      : []),
  ];

  // Render nothing only when the country has no content at all — no subdivisions
  // AND no national symbols.
  if (TABS.length === 0) return null;

  // Fall the active tab back to the first available one whenever the persisted
  // choice isn't offered for this country (e.g. a stored "nat" on a country with
  // no national symbols, or a stored "sub" on a country with no subdivisions).
  const activeTab: TabId = TABS.some((t) => t.id === tab) ? tab : TABS[0].id;

  return (
    <section className="flag-grid" aria-labelledby="subdiv-grid-heading">
      <header className="flag-grid__header">
        <h2 className="flag-grid__title" id="subdiv-grid-heading">
          Flags and symbols of this country
        </h2>
      </header>

      <div className="flag-tabs" role="tablist" aria-label="Flag views">
        {TABS.map((t) => {
          const active = t.id === activeTab;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              className={`flag-tabs__tab${active ? " flag-tabs__tab--active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
              {t.count != null && (
                <span className="flag-tabs__count">{t.count}</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flag-tabs__panel" role="tabpanel">
        {activeTab === "sub" && (
          <SubdivisionFlagGrid
            embedded
            divisions={divisions}
            pluralLabel={pluralLabel}
            countryName={countryName}
            countryCode={countryCode}
            selectedCode={capitalActive ? null : selectedCode}
            onSelect={onSelectSubdivision}
            baseUrl={baseUrl}
            selectedNationalFlagId={selectedNationalFlagId}
            onSelectGroupFlag={onSelectGroupFlag}
          />
        )}
        {activeTab === "city" && (
          <CityFlagGrid
            countryCode={countryCode}
            countryName={countryName}
            selectedCode={selectedCode}
            capitalActive={capitalActive}
            activeNationalCapital={activeNationalCapital}
            baseUrl={baseUrl}
            onSelect={onSelectCapital}
            onSelectNational={onSelectNationalCapital}
          />
        )}
        {activeTab === "nat" && (
          <NationalFlagGrid
            countryCode={countryCode}
            countryName={countryName}
            selectedFlagId={selectedNationalFlagId}
            baseUrl={baseUrl}
            onSelect={onSelectNationalFlag}
          />
        )}
        {activeTab === "tree" && (
          <>
            <div className="hierarchy-layout-toggle" role="tablist" aria-label="Hierarchy chart layout">
              {(["table", "chart"] as const).map((layout) => {
                const active = layout === treeLayout;
                return (
                  <button
                    key={layout}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    className={`hierarchy-layout-toggle__btn${active ? " hierarchy-layout-toggle__btn--active" : ""}`}
                    onClick={() => setTreeLayout(layout)}
                  >
                    {layout === "table" ? "See flag hierarchy in table" : "See flag hierarchy in chart"}
                  </button>
                );
              })}
            </div>
            {treeLayout === "chart" ? (
              <SubdivisionHierarchyChart
                divisions={divisions}
                countryName={countryName}
                countryCode={countryCode}
                countryFlagUrl={countryFlagUrl}
                selectedCode={selectedCode}
                capitalActive={capitalActive}
                activeNationalCapital={activeNationalCapital}
                baseUrl={baseUrl}
                onSelectCountry={onSelectCountry}
                onSelectSubdivision={onSelectSubdivision}
                onSelectCapital={onSelectCapital}
                onSelectNationalCapital={onSelectNationalCapital}
                selectedNationalFlagId={selectedNationalFlagId}
                onSelectGroupFlag={onSelectGroupFlag}
              />
            ) : (
              <SubdivisionHierarchyTable
                divisions={divisions}
                countryName={countryName}
                countryCode={countryCode}
                countryFlagUrl={countryFlagUrl}
                selectedCode={selectedCode}
                capitalActive={capitalActive}
                activeNationalCapital={activeNationalCapital}
                baseUrl={baseUrl}
                onSelectCountry={onSelectCountry}
                onSelectSubdivision={onSelectSubdivision}
                onSelectCapital={onSelectCapital}
                onSelectNationalCapital={onSelectNationalCapital}
                selectedNationalFlagId={selectedNationalFlagId}
                onSelectGroupFlag={onSelectGroupFlag}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
