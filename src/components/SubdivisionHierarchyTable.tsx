import { AutoFitName } from "./AutoFitName";
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
 *   National flag | Sub-national flag | Capital city flag
 *
 * Column 1 (the nation's own flag) is shown ONCE, not once per row — it's a
 * single grid cell explicitly spanned across every data row (`gridRow`,
 * computed below) and made `position: sticky` so it stays in view while the
 * subdivision rows in columns 2/3 scroll past underneath it. Clicking it
 * clears the drill-down (selects the country), same as the old standalone
 * "whole country" button it replaces.
 *
 * Column 2 shows each subdivision's flag + name, with a colour-coded badge
 * for its administrative TYPE ("State", "Federal District", …) underneath the
 * name — the same colour every time that exact type label appears, via
 * `typeBadgeColor()`.
 *
 * Column 3 shows each capital's flag + name, with a colour-coded badge for
 * WHAT KIND of capital it is: "National capital" (coral, matching the ★
 * badge used everywhere else in the app for the national seat) when this
 * capital is also the country's, else "{Type} capital" in the SAME colour as
 * that type's badge in column 2 (e.g. every "State capital" badge matches
 * every "State" badge). A subdivision that IS the national capital itself (a
 * city-territory whose own leaf would otherwise be tautological — Kuala
 * Lumpur, Tokyo) still gets a capital-city cell: it self-references its own
 * flag/name, badged "National capital", so the designation is never lost.
 *
 * One row per subdivision. A subdivision that ALSO hosts a national capital
 * that heads no subdivision of its own (Ottawa sits inside Ontario, which
 * keeps its own capital Toronto) gets an EXTRA row directly below it (no
 * subdivision in column 2) so both capitals are visible without cramming two
 * cities into one cell. A capital that heads no subdivision AND could not be
 * geographically placed inside one at all falls back to its own row at the
 * end, mirroring the chart's standalone group.
 *
 * Every row is clickable exactly like the chart's nodes, driving the same
 * selection callbacks (map highlight + widget), and no flag is ever wrapped
 * in a bordered "card" — this view is deliberately flatter than the grid/tree.
 *
 * Built with CSS Grid (a `role="table"` container; every cell gets an
 * EXPLICIT `gridRow`/`gridColumn` computed here, rather than relying on
 * auto-placement, so the spanning sticky flag cell can never end up
 * mis-aligned with the row it's supposed to cover) rather than a real
 * `<table>`. A real `<table>` with `table-layout: fixed` and flex/aspect-
 * ratio content inside it hit a Safari/iOS layout bug (reported 2026-07):
 * rows collapsed to a single huge blank row instead of ~40px each. CSS Grid
 * sidesteps the browser's table layout algorithm entirely.
 */

// A small curated palette (see src/index.css) for subdivision-type badges.
// --coral is reserved for "National capital" everywhere in the app; --sky
// doubles as this table's row active-state background, so it's excluded here
// to avoid a same-colour badge disappearing against an active row.
const TYPE_COLOR_PALETTE = ["var(--lime)", "var(--azure)", "var(--mustard)", "var(--violet)", "var(--pink)"];

// Hand-picked colours for the most common primary-subdivision type labels
// (matches the owner's own examples — green for states, blue for federal
// districts); anything not listed falls back to a deterministic hash so the
// SAME type label always gets the SAME colour without needing to enumerate
// every possible label used across ~195 countries.
const TYPE_COLOR_OVERRIDES: Record<string, string> = {
  "State": "var(--lime)",
  "Federal District": "var(--azure)",
  "Province": "var(--violet)",
  "Region": "var(--mustard)",
  "Federal Territory": "var(--pink)",
};

const NATIONAL_CAPITAL_COLOR = "var(--coral)";

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function typeBadgeColor(typeLabel: string): string {
  return TYPE_COLOR_OVERRIDES[typeLabel] ?? TYPE_COLOR_PALETTE[hashString(typeLabel) % TYPE_COLOR_PALETTE.length];
}

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
  badgeColor,
  active,
  onClick,
  ariaLabel,
  gridColumn,
  gridRow,
}: {
  /** Fully-resolved image src (baseUrl already prefixed where needed), or null
   *  when no flag is bundled. */
  flagPath: string | null;
  name: string;
  /** Final display text (e.g. "State", "State capital", "★ National
   *  capital") — the caller decides wording/star, this just renders it. */
  badge: string | null;
  badgeColor: string;
  active: boolean;
  onClick: () => void;
  ariaLabel: string;
  gridColumn: number;
  gridRow: number;
}) {
  return (
    <button
      type="button"
      className="hierarchy-table__cell"
      style={{ gridColumn, gridRow }}
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
            <span className="hierarchy-table__badge" style={{ background: badgeColor }}>
              <AutoFitName className="hierarchy-table__badge-text" text={badge} title={badge} minScale={0.7} />
            </span>
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
  // Grid row 1 is the header; data rows start at 2. Every cell below gets
  // this EXACT explicit line number so the spanning sticky flag column can
  // never drift out of alignment with the rows it covers.
  const firstDataRow = 2;
  const lastDataRow = firstDataRow + rows.length; // exclusive end line

  return (
    <div className="hierarchy-table-wrap">
      <div className="hierarchy-table" role="table" aria-label={`${countryName} hierarchy table`}>
        <div className="hierarchy-table__row" role="row">
          <div className="hierarchy-table__th" role="columnheader" style={{ gridColumn: 1, gridRow: 1 }}>National flag</div>
          <div className="hierarchy-table__th" role="columnheader" style={{ gridColumn: 2, gridRow: 1 }}>Sub-national flag</div>
          <div className="hierarchy-table__th" role="columnheader" style={{ gridColumn: 3, gridRow: 1 }}>Capital city flag</div>
        </div>

        {/* The nation's own flag — ONE cell, spanning every data row, sticky
            so it stays in view as columns 2/3 scroll underneath it. */}
        <button
          type="button"
          className="hierarchy-table__cell hierarchy-table__cell--sticky"
          style={{ gridColumn: 1, gridRow: `${firstDataRow} / ${lastDataRow}` }}
          onClick={onSelectCountry}
          aria-pressed={rootActive}
          aria-label={`Select ${countryName}`}
          role="cell"
          aria-rowspan={rows.length}
        >
          <span className="hierarchy-table__thumb hierarchy-table__thumb--sticky">
            {countryFlagUrl ? (
              <img src={countryFlagUrl} alt="" loading="lazy" draggable={false} className="hierarchy-table__thumb-img" />
            ) : (
              <span className="flag-grid__thumb-empty" aria-hidden="true">—</span>
            )}
          </span>
          <AutoFitName className="hierarchy-table__name" text={countryName} />
        </button>

        {rows.map((row, i) => {
          const gridRow = firstDataRow + i;
          if (row.kind === "sub") {
            const { div, subFlag, subCapitalRole, capitalLeaf, typeLabel } = row;
            const subActive = !capitalActive && div.code === selectedCode;
            const typeColor = typeBadgeColor(typeLabel);
            // The subdivision IS the national capital (tautological — Kuala
            // Lumpur, Tokyo, Buenos Aires): no distinct capital-city entity
            // exists, but the national-capital designation must still show
            // SOMEWHERE, so column 3 self-references this same subdivision's
            // name. It must NOT also re-render the subdivision's flag image —
            // that flag is already shown once in column 2, and repeating it
            // in column 3 is exactly the flag-duplication the "a capital-city
            // flag must never duplicate its own subdivision's flag" rule
            // forbids (this shipped for Buenos Aires: the Autonomous City's
            // eagle-crest flag was rendered a second time in the capital-city
            // column). Brasília's row already gets this right — its shown
            // capital-city leaf has its flag suppressed to null via
            // SHARED_CAPITAL_FLAGS — so the self-capital fallback here must
            // render the same way: name and badge only, no flag.
            const selfCapital = !capitalLeaf && subCapitalRole
              ? { flagPath: null as string | null, name: div.name, badge: `★ ${subCapitalRole}` }
              : null;
            const capitalBadge = capitalLeaf?.role
              ? `★ ${capitalLeaf.role}`
              : capitalLeaf
                ? `${typeLabel} capital`
                : null;
            return (
              <div className="hierarchy-table__row" role="row" key={row.key}>
                <FlagCell
                  flagPath={subFlag}
                  name={div.name}
                  badge={typeLabel}
                  badgeColor={typeColor}
                  active={subActive}
                  onClick={() => onSelectSubdivision(div.code)}
                  ariaLabel={
                    subCapitalRole
                      ? `Select ${div.name} — national capital of ${countryName}`
                      : `Select ${div.name}`
                  }
                  gridColumn={2}
                  gridRow={gridRow}
                />
                {capitalLeaf ? (
                  <FlagCell
                    flagPath={capitalLeaf.flagPath ? `${baseUrl}${capitalLeaf.flagPath}` : null}
                    name={capitalLeaf.name}
                    badge={capitalBadge}
                    badgeColor={capitalLeaf.role ? NATIONAL_CAPITAL_COLOR : typeColor}
                    active={capitalActive && div.code === selectedCode}
                    onClick={() => onSelectCapital(div.code)}
                    ariaLabel={
                      capitalLeaf.role
                        ? `Select ${capitalLeaf.name}, capital of ${div.name} and national capital of ${countryName}`
                        : `Select ${capitalLeaf.name}, capital of ${div.name}`
                    }
                    gridColumn={3}
                    gridRow={gridRow}
                  />
                ) : selfCapital ? (
                  <FlagCell
                    flagPath={selfCapital.flagPath}
                    name={selfCapital.name}
                    badge={selfCapital.badge}
                    badgeColor={NATIONAL_CAPITAL_COLOR}
                    active={capitalActive && div.code === selectedCode}
                    onClick={() => onSelectSubdivision(div.code)}
                    ariaLabel={`Select ${div.name} — national capital of ${countryName}`}
                    gridColumn={3}
                    gridRow={gridRow}
                  />
                ) : (
                  <div className="hierarchy-table__cellwrap" role="cell" style={{ gridColumn: 3, gridRow }}>
                    <span className="hierarchy-table__empty" aria-hidden="true">—</span>
                  </div>
                )}
              </div>
            );
          }
          if (row.kind === "national-extra") {
            const { leaf } = row;
            return (
              <div className="hierarchy-table__row" role="row" key={row.key}>
                <div className="hierarchy-table__cellwrap" role="cell" style={{ gridColumn: 2, gridRow }}>
                  <span className="hierarchy-table__empty" aria-hidden="true">—</span>
                </div>
                <FlagCell
                  flagPath={leaf.flagPath ? `${baseUrl}${leaf.flagPath}` : null}
                  name={leaf.name}
                  badge={`★ ${leaf.role ?? "National capital"}`}
                  badgeColor={NATIONAL_CAPITAL_COLOR}
                  active={activeNationalCapital === leaf.name}
                  onClick={() =>
                    onSelectNationalCapital({ name: leaf.name, note: leaf.note, flagPath: leaf.flagPath })
                  }
                  ariaLabel={`Select ${leaf.name}, national capital of ${countryName}`}
                  gridColumn={3}
                  gridRow={gridRow}
                />
              </div>
            );
          }
          // national-standalone
          const flagPath =
            NATIONAL_CAPITAL_FLAGS[`${countryCode}|${normalizeForSearch(row.name)}`] ?? null;
          return (
            <div className="hierarchy-table__row" role="row" key={row.key}>
              <div className="hierarchy-table__cellwrap" role="cell" style={{ gridColumn: 2, gridRow }}>
                <span className="hierarchy-table__empty" aria-hidden="true">—</span>
              </div>
              <FlagCell
                flagPath={flagPath ? `${baseUrl}${flagPath}` : null}
                name={row.name}
                badge={`★ ${row.note ?? "National capital"}`}
                badgeColor={NATIONAL_CAPITAL_COLOR}
                active={activeNationalCapital === row.name}
                onClick={() => onSelectNationalCapital({ name: row.name, note: row.note, flagPath })}
                ariaLabel={`Select ${row.name}, national capital of ${countryName}`}
                gridColumn={3}
                gridRow={gridRow}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
