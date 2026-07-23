import { useMemo, useState } from "react";
import type { SubdivisionMeta } from "../types/subdivision";
import { SubdivisionFlagGrid } from "./SubdivisionFlagGrid";
import { CityFlagGrid } from "./CityFlagGrid";
import { SubdivisionHierarchyChart } from "./SubdivisionHierarchyChart";
import { SubdivisionHierarchyTable } from "./SubdivisionHierarchyTable";
import { countryCityFlagCount } from "../lib/cityFlags";
import { DISPUTED_TERRITORY_HIERARCHY } from "../lib/disputedSubdivisions";

/**
 * Tabbed sub-national drill-down grid shown below the Learn map.
 *
 * Three views of the same country's flags:
 *  1. Sub-national flags — the existing subdivision flag grid.
 *  2. City flags        — every available capital-city flag.
 *  3. Hierarchy chart   — an interactive nation → subdivision → city org chart,
 *     with a "Chart" / "Table" layout toggle: the table renders the SAME
 *     entities as a flat 3-column table (type, sub-national flag, capital city
 *     flag) instead of an org chart — see `SubdivisionHierarchyTable`.
 *
 * All three drive the SAME selection callbacks, so picking a flag in any tab
 * updates the world/subdivision map highlight and the country/subdivision widget.
 */
type TabId = "sub" | "city" | "tree";
type TreeLayout = "chart" | "table";

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
}: Props) {
  const [tab, setTab] = useState<TabId>("sub");
  const [treeLayout, setTreeLayout] = useState<TreeLayout>("chart");

  const subCount = useMemo(
    () => divisions.filter((d) => !(d.code in DISPUTED_TERRITORY_HIERARCHY)).length,
    [divisions],
  );
  const cityCount = useMemo(
    () => countryCityFlagCount(countryCode),
    [countryCode],
  );

  const TABS: { id: TabId; label: string; count?: number }[] = [
    { id: "sub", label: "Sub-national flags", count: subCount },
    { id: "city", label: "City flags", count: cityCount },
    { id: "tree", label: "Hierarchy chart" },
  ];

  if (divisions.length === 0) return null;

  return (
    <section className="flag-grid" aria-labelledby="subdiv-grid-heading">
      <header className="flag-grid__header">
        <h2 className="flag-grid__title" id="subdiv-grid-heading">
          {countryName} — {pluralLabel}
        </h2>
      </header>

      <div className="flag-tabs" role="tablist" aria-label="Flag views">
        {TABS.map((t) => {
          const active = t.id === tab;
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
        {tab === "sub" && (
          <SubdivisionFlagGrid
            embedded
            divisions={divisions}
            pluralLabel={pluralLabel}
            countryName={countryName}
            countryCode={countryCode}
            selectedCode={capitalActive ? null : selectedCode}
            onSelect={onSelectSubdivision}
          />
        )}
        {tab === "city" && (
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
        {tab === "tree" && (
          <>
            <div className="hierarchy-layout-toggle" role="tablist" aria-label="Hierarchy chart layout">
              {(["chart", "table"] as const).map((layout) => {
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
                    {layout === "chart" ? "Chart" : "Table"}
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
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
