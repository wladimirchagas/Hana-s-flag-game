import { useMemo } from "react";
import { subdivisionFlagUrl } from "../api/subdivisions";
import { subdivisionCapital } from "./cityRoles";
import { distinctCapitalFlagPath } from "./capitalInfo";
import { DISPUTED_TERRITORY_HIERARCHY } from "./disputedSubdivisions";
import { normalizeForSearch } from "./searchNormalize";
import { NATIONAL_CITIES } from "../data/cities";
import { NATIONAL_CAPITAL_FLAGS } from "../data/nationalCapitalFlags";
import { NATIONAL_CAPITAL_SUBDIVISION } from "../data/nationalCapitalLocations";
import type { SubdivisionMeta } from "../types/subdivision";

/**
 * Shared data model behind BOTH visualisations of a country's subdivision
 * hierarchy — the org-chart tree (`SubdivisionHierarchyChart`) and the table
 * (`SubdivisionHierarchyTable`). Extracted to a single hook so the two views
 * can never disagree about which entities exist, which capital a subdivision
 * has, or which flag is shown for it. See `SubdivisionHierarchyChart.tsx` for
 * the full explanation of the underlying capital-attribution rules (a capital
 * that IS a subdivision, that IS a subdivision's capital city, that sits
 * INSIDE a subdivision without heading it, or that heads no subdivision at
 * all).
 */

// External/dependent territory type labels — kept in sync with the flag grid's
// DEPENDENCY_TYPES so the hierarchy's type order matches the grid's "By type"
// tier order (primary subdivisions first, dependencies next, disputed last).
const DEPENDENCY_TYPES: ReadonlySet<string> = new Set([
  "Crown Dependency",
  "Overseas Territory",
  "Overseas Collectivity",
  "Sui generis collectivity",
  "Autonomous Territory",
  "Special Administrative Region",
  "Constituent Country",
  "Associated State",
  "External Territory",
  "Unincorporated Territory",
]);

function groupTier(typeLabel: string, allDisputed: boolean): number {
  if (allDisputed) return 2;
  if (DEPENDENCY_TYPES.has(typeLabel)) return 1;
  return 0;
}

/** Plural form of a singular type label for a group heading. */
export function pluralizeType(label: string): string {
  if (/s$/i.test(label)) return label;
  if (/[^aeiou]y$/i.test(label)) return label.replace(/y$/i, "ies");
  return `${label}s`;
}

// A capital city under a subdivision. `kind` decides its click target: a
// subdivision's own capital opens that subdivision's "View capital" panel; a
// national capital placed here opens the national-capital panel. `role` is set
// (coral badge) when the leaf is a national capital.
export type HierarchyLeaf = {
  key: string;
  kind: "sub" | "national";
  name: string;
  flagPath: string | null;
  role: string | null;
  note: string | null;
};

export type HierarchyNode = {
  div: SubdivisionMeta;
  subFlag: string | null;
  // Set (coral badge) when the subdivision node itself IS the national
  // capital — a city-territory whose own leaf is tautological (Kuala Lumpur,
  // Tokyo). Never a duplicate node.
  subCapitalRole: string | null;
  leaves: HierarchyLeaf[];
};

export type HierarchyGroup = {
  typeLabel: string;
  items: HierarchyNode[];
  allDisputed: boolean;
};

export type StandaloneCapital = { name: string; note: string | null };

export function useHierarchyData(
  divisions: SubdivisionMeta[],
  countryCode: string,
): { nodes: HierarchyNode[]; standaloneCaps: StandaloneCapital[]; groups: HierarchyGroup[] } {
  const { nodes, standaloneCaps } = useMemo(() => {
    const visibleDivs = divisions.filter(
      (d) => !(d.code in DISPUTED_TERRITORY_HIERARCHY),
    );

    const nodes: HierarchyNode[] = visibleDivs
      .map((d) => {
        const capital = subdivisionCapital(d.code);
        // The capital's DISTINCT flag (null when it merely duplicates the
        // subdivision's own flag — a city-territory like Canberra ≡ ACT, or a
        // shared coat-of-arms like Brasília ≡ Distrito Federal). Single source of
        // truth shared with the capital panel and the City-flags grid.
        const distinctFlag = capital
          ? distinctCapitalFlagPath(d.code, capital.name)
          : null;
        // Same name as its subdivision (São Paulo state → São Paulo city; Kuala
        // Lumpur → Kuala Lumpur).
        const sameName =
          capital != null &&
          normalizeForSearch(capital.name) === normalizeForSearch(d.name);
        // Show the subdivision's own capital as a leaf when it has a DISTINCT flag
        // (São Paulo city's red-cross flag), OR it is a distinctly-named place
        // (Canberra, Brasília, Victoria). Suppress it only when tautological AND
        // flagless: the subdivision IS that one city (Kuala Lumpur, Foggia, Zürich).
        const showCity = capital != null && (distinctFlag != null || !sameName);
        const leaves: HierarchyLeaf[] = [];
        if (showCity) {
          leaves.push({
            key: `sub:${d.code}`,
            kind: "sub",
            name: capital!.name,
            flagPath: distinctFlag,
            role: null,
            note: null,
          });
        }
        return {
          div: d,
          subFlag: subdivisionFlagUrl(d.code),
          subCapitalRole: null as string | null,
          leaves,
        };
      })
      .sort((a, b) => a.div.name.localeCompare(b.div.name, "en"));

    const byCode = new Map(nodes.map((n) => [n.div.code, n]));

    // Attribute each national capital to the entity that ALREADY represents it,
    // else to the subdivision that geographically CONTAINS it (as an extra leaf),
    // and only if neither applies does it fall back to a standalone node.
    const nationalCaps = NATIONAL_CITIES[countryCode]?.capitals ?? [];
    const standaloneCaps: StandaloneCapital[] = [];
    for (const cap of nationalCaps) {
      const k = normalizeForSearch(cap.name);
      // Sourced role note for a multi-capital nation (e.g. "Constitutional
      // capital"); a single capital just reads "National capital".
      const role = cap.note ?? "National capital";
      // (a) A shown subdivision-capital leaf IS this capital (Canberra ≡ ACT,
      //     Cape Town ≡ Western Cape) — mark that leaf in place.
      let marked = false;
      for (const n of nodes) {
        const leaf = n.leaves.find((l) => l.kind === "sub" && normalizeForSearch(l.name) === k);
        if (leaf) {
          leaf.role = role;
          leaf.note = cap.note ?? null;
          marked = true;
          break;
        }
      }
      if (marked) continue;
      // (b) A subdivision IS this capital — a city-territory whose own leaf is
      //     tautological and suppressed (Kuala Lumpur, Putrajaya, Tokyo).
      const cityTerritory = nodes.find((n) => normalizeForSearch(n.div.name) === k);
      if (cityTerritory) {
        cityTerritory.subCapitalRole = role;
        continue;
      }
      // (c) A capital that heads no subdivision but sits inside one (Ottawa →
      //     Ontario, Pretoria → Gauteng) — add it as an extra capital leaf under
      //     the containing subdivision, level with that subdivision's own capital.
      const host = byCode.get(NATIONAL_CAPITAL_SUBDIVISION[`${countryCode}|${cap.name}`] ?? "");
      if (host) {
        host.leaves.push({
          key: `nat:${cap.name}`,
          kind: "national",
          name: cap.name,
          flagPath: NATIONAL_CAPITAL_FLAGS[`${countryCode}|${k}`] ?? null,
          role,
          note: cap.note ?? null,
        });
        continue;
      }
      // (d) Could not place it inside any subdivision — a standalone fallback.
      standaloneCaps.push({ name: cap.name, note: cap.note ?? null });
    }

    return { nodes, standaloneCaps };
  }, [divisions, countryCode]);

  // Group the subdivisions by type, ordered by the same tier rule as the grid.
  const groups = useMemo(() => {
    const byType = new Map<string, HierarchyNode[]>();
    for (const n of nodes) {
      const arr = byType.get(n.div.typeLabel) ?? [];
      arr.push(n);
      byType.set(n.div.typeLabel, arr);
    }
    return [...byType.entries()]
      .map(([typeLabel, items]) => ({
        typeLabel,
        items,
        allDisputed: items.every((i) => i.div.isDisputed),
      }))
      .sort((a, b) => {
        const ta = groupTier(a.typeLabel, a.allDisputed);
        const tb = groupTier(b.typeLabel, b.allDisputed);
        if (ta !== tb) return ta - tb;
        if (b.items.length !== a.items.length) return b.items.length - a.items.length;
        return a.typeLabel.localeCompare(b.typeLabel, "en");
      });
  }, [nodes]);

  return { nodes, standaloneCaps, groups };
}
