import { AutoFitName } from "./AutoFitName";
import { NATIONAL_CITIES } from "../data/cities";
import { NATIONAL_CAPITAL_FLAGS } from "../data/nationalCapitalFlags";
import { normalizeForSearch } from "../lib/searchNormalize";
import { useHierarchyData, type HierarchyLeaf } from "../lib/hierarchyData";
import type { SubdivisionMeta } from "../types/subdivision";

/**
 * "Hierarchy chart" tab, table layout — the SAME nation → subdivision → capital
 * data as `SubdivisionHierarchyChart` (built by the shared `useHierarchyData`
 * hook, so the two views can never disagree about which entities exist or
 * which flag/capital each one has), rendered as a flat 3-column table instead
 * of an org chart:
 *
 *   Type | Flag | Capital city flag
 *
 * The FIRST row is always the nation itself: its own flag in column 2 and
 * its national capital(s) in column 3 (a multi-capital nation like South
 * Africa stacks all of them in that one cell) — a quick-glance summary row
 * before the per-subdivision rows below it. The "Flag" header (rather than
 * "Sub-national flag") is deliberately generic: this column holds the
 * NATION's flag on this first row and each SUBDIVISION's flag on every row
 * after it, so no single narrower label fits every row.
 *
 * One row per subdivision follows. A subdivision that ALSO hosts a national
 * capital that heads no subdivision of its own (Ottawa sits inside Ontario,
 * which keeps its own capital Toronto) gets an EXTRA row directly below it,
 * typed "National capital", so both capitals are visible without cramming
 * two cities into one cell. A capital that heads no subdivision AND could
 * not be geographically placed inside one at all falls back to its own
 * "National capital" row at the end, mirroring the chart's standalone group.
 * (These capitals are shown a second time, deliberately — the nation row is
 * a summary, these rows show which subdivision actually hosts each one.)
 *
 * A subdivision that IS the national capital itself (a city-territory whose
 * own leaf would be tautological — Kuala Lumpur, Tokyo) shows the ★ badge on
 * its own row's flag cell and leaves the capital-city cell empty, exactly as
 * the chart marks the node in place instead of duplicating it — never invent
 * a second entity to fill the cell.
 *
 * Every row is clickable exactly like the chart's nodes, driving the same
 * selection callbacks (map highlight + widget), and no flag is ever wrapped
 * in a bordered "card" — this view is deliberately flatter than the grid/tree.
 *
 * Built with CSS Grid (a `role="table"` container of `display: contents` row
 * wrappers, each contributing 3 cells straight into the shared grid tracks)
 * rather than a real `<table>`. A real `<table>` with `table-layout: fixed`
 * and flex/aspect-ratio content inside it hit a Safari/iOS layout bug
 * (reported 2026-07): rows collapsed to a single huge blank row instead of
 * ~40px each. CSS Grid sidesteps the browser's table layout algorithm
 * entirely while keeping the exact same 3-column visual result.
 */

type Row =
  | {
      kind: "sub";
      key: string;
      typeLabel: string;
      div: SubdivisionMeta;
      subFlag: string | null;
      subCapitalRole: string | null;
      capitalLeaf: HierarchyLeaf | null;
    }
  | { kind: "national-extra"; key: string; leaf: HierarchyLeaf }
  | { kind: "national-standalone"; key: string; name: string; note: string | null };

type Props = {
  divisions: SubdivisionMeta[];
  countryName: string;
  countryCode: string;
  countryFlagUrl: string | null;
  selectedCode: string | null;
  capitalActive: boolean;
  activeNationalCapital?: string | null;
  baseUrl: string;
  onSelectCountry: () => void;
  onSelectSubdivision: (code: string) => void;
  onSelectCapital: (code: string) => void;
  onSelectNationalCapital: (cap: { name: string; note: string | null; flagPath: string | null }) => void;
};

function FlagCell({
  flagPath,
  name,
  badge,
  active,
  onClick,
  ariaLabel,
}: {
  /** Fully-resolved image src (baseUrl already prefixed where needed), or null
   *  when no flag is bundled. */
  flagPath: string | null;
  name: string;
  badge: string | null;
  active: boolean;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      className={`hierarchy-table__cell${active ? " hierarchy-table__cell--active" : ""}`}
      onClick={onClick}
      aria-pressed={active}
      aria-label={ariaLabel}
    >
      <span className="hierarchy-table__thumb">
        {flagPath ? (
          <img
            src={flagPath}
            alt=""
            loading="lazy"
            draggable={false}
            className="hierarchy-table__thumb-img"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        ) : (
          <span className="flag-grid__thumb-empty" aria-hidden="true">—</span>
        )}
      </span>
      <span className="hierarchy-table__text">
        <AutoFitName className="hierarchy-table__name" text={name} />
        {/* Always-rendered, fixed-height slot — reserved whether or not a
            badge is present, so every cell (and therefore every row) ends up
            the exact same height regardless of content. */}
        <span className="hierarchy-table__badge-slot">
          {badge && (
            <AutoFitName className="hierarchy__tier hierarchy__tier--capital hierarchy-table__badge" text={`★ ${badge}`} />
          )}
        </span>
      </span>
    </button>
  );
}

export function SubdivisionHierarchyTable({
  divisions,
  countryName,
  countryCode,
  countryFlagUrl,
  selectedCode,
  capitalActive,
  activeNationalCapital,
  baseUrl,
  onSelectCountry,
  onSelectSubdivision,
  onSelectCapital,
  onSelectNationalCapital,
}: Props) {
  const { nodes, standaloneCaps, groups } = useHierarchyData(divisions, countryCode);

  if (nodes.length === 0) {
    return (
      <p className="flag-grid__no-match">
        No sub-national divisions are available for {countryName} yet.
      </p>
    );
  }

  const rows: Row[] = [];
  for (const g of groups) {
    for (const node of g.items) {
      const capitalLeaf = node.leaves.find((l) => l.kind === "sub") ?? null;
      rows.push({
        kind: "sub",
        key: `sub:${node.div.code}`,
        typeLabel: g.typeLabel,
        div: node.div,
        subFlag: node.subFlag,
        subCapitalRole: node.subCapitalRole,
        capitalLeaf,
      });
      for (const leaf of node.leaves) {
        if (leaf.kind !== "national") continue;
        rows.push({ kind: "national-extra", key: leaf.key, leaf });
      }
    }
  }
  for (const cap of standaloneCaps) {
    rows.push({ kind: "national-standalone", key: `standalone:${cap.name}`, name: cap.name, note: cap.note });
  }

  const rootActive = !selectedCode;
  // The nation's own capital(s) — the full authoritative list (NOT the
  // hook's `standaloneCaps`, which only holds the ones left over after
  // subdivision/leaf placement). A multi-capital nation (South Africa,
  // Bolivia, …) shows every seat stacked in this one summary cell.
  const nationalCaps = NATIONAL_CITIES[countryCode]?.capitals ?? [];

  return (
    <div className="hierarchy-table-wrap">
      <div className="hierarchy-table" role="table" aria-label={`${countryName} hierarchy table`}>
        <div className="hierarchy-table__row" role="row">
          <div className="hierarchy-table__th" role="columnheader">Type</div>
          <div className="hierarchy-table__th" role="columnheader">Flag</div>
          <div className="hierarchy-table__th" role="columnheader">Capital city flag</div>
        </div>
        <div className="hierarchy-table__row" role="row">
          <div className="hierarchy-table__type" role="cell">Nation</div>
          <div className="hierarchy-table__cellwrap" role="cell">
            <FlagCell
              flagPath={countryFlagUrl}
              name={countryName}
              badge={null}
              active={rootActive}
              onClick={onSelectCountry}
              ariaLabel={`Select ${countryName}`}
            />
          </div>
          <div className="hierarchy-table__cellwrap" role="cell">
            {nationalCaps.length > 0 ? (
              <div className="hierarchy-table__capital-stack">
                {nationalCaps.map((cap) => {
                  const capFlagPath =
                    NATIONAL_CAPITAL_FLAGS[`${countryCode}|${normalizeForSearch(cap.name)}`] ?? null;
                  return (
                    <FlagCell
                      key={cap.name}
                      flagPath={capFlagPath ? `${baseUrl}${capFlagPath}` : null}
                      name={cap.name}
                      badge={cap.note ?? "National capital"}
                      active={activeNationalCapital === cap.name}
                      onClick={() =>
                        onSelectNationalCapital({ name: cap.name, note: cap.note ?? null, flagPath: capFlagPath })
                      }
                      ariaLabel={`Select ${cap.name}, national capital of ${countryName}`}
                    />
                  );
                })}
              </div>
            ) : (
              <span className="hierarchy-table__empty" aria-hidden="true">—</span>
            )}
          </div>
        </div>
        {rows.map((row) => {
          if (row.kind === "sub") {
            const { div, subFlag, subCapitalRole, capitalLeaf, typeLabel } = row;
            const subActive = !capitalActive && div.code === selectedCode;
            return (
              <div className="hierarchy-table__row" role="row" key={row.key}>
                <div className="hierarchy-table__type" role="cell">{typeLabel}</div>
                <div className="hierarchy-table__cellwrap" role="cell">
                  <FlagCell
                    flagPath={subFlag}
                    name={div.name}
                    badge={subCapitalRole}
                    active={subActive}
                    onClick={() => onSelectSubdivision(div.code)}
                    ariaLabel={
                      subCapitalRole
                        ? `Select ${div.name} — national capital of ${countryName}`
                        : `Select ${div.name}`
                    }
                  />
                </div>
                <div className="hierarchy-table__cellwrap" role="cell">
                  {capitalLeaf ? (
                    <FlagCell
                      flagPath={capitalLeaf.flagPath ? `${baseUrl}${capitalLeaf.flagPath}` : null}
                      name={capitalLeaf.name}
                      badge={capitalLeaf.role}
                      active={capitalActive && div.code === selectedCode}
                      onClick={() => onSelectCapital(div.code)}
                      ariaLabel={
                        capitalLeaf.role
                          ? `Select ${capitalLeaf.name}, capital of ${div.name} and national capital of ${countryName}`
                          : `Select ${capitalLeaf.name}, capital of ${div.name}`
                      }
                    />
                  ) : (
                    <span className="hierarchy-table__empty" aria-hidden="true">—</span>
                  )}
                </div>
              </div>
            );
          }
          if (row.kind === "national-extra") {
            const { leaf } = row;
            return (
              <div className="hierarchy-table__row" role="row" key={row.key}>
                <div className="hierarchy-table__type" role="cell">National capital</div>
                <div className="hierarchy-table__cellwrap" role="cell">
                  <span className="hierarchy-table__empty" aria-hidden="true">—</span>
                </div>
                <div className="hierarchy-table__cellwrap" role="cell">
                  <FlagCell
                    flagPath={leaf.flagPath ? `${baseUrl}${leaf.flagPath}` : null}
                    name={leaf.name}
                    badge={leaf.role}
                    active={activeNationalCapital === leaf.name}
                    onClick={() =>
                      onSelectNationalCapital({ name: leaf.name, note: leaf.note, flagPath: leaf.flagPath })
                    }
                    ariaLabel={`Select ${leaf.name}, national capital of ${countryName}`}
                  />
                </div>
              </div>
            );
          }
          // national-standalone
          const flagPath =
            NATIONAL_CAPITAL_FLAGS[`${countryCode}|${normalizeForSearch(row.name)}`] ?? null;
          return (
            <div className="hierarchy-table__row" role="row" key={row.key}>
              <div className="hierarchy-table__type" role="cell">National capital</div>
              <div className="hierarchy-table__cellwrap" role="cell">
                <span className="hierarchy-table__empty" aria-hidden="true">—</span>
              </div>
              <div className="hierarchy-table__cellwrap" role="cell">
                <FlagCell
                  flagPath={flagPath ? `${baseUrl}${flagPath}` : null}
                  name={row.name}
                  badge={row.note ?? "National capital"}
                  active={activeNationalCapital === row.name}
                  onClick={() => onSelectNationalCapital({ name: row.name, note: row.note, flagPath })}
                  ariaLabel={`Select ${row.name}, national capital of ${countryName}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
