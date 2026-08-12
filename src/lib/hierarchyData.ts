import { useMemo } from "react";
import { subdivisionFlagUrl } from "../api/subdivisions";
import { subdivisionCapital } from "./cityRoles";
import { distinctCapitalFlagPath } from "./capitalInfo";
import { DISPUTED_TERRITORY_HIERARCHY } from "./disputedSubdivisions";
import { normalizeForSearch } from "./searchNormalize";
import { NATIONAL_CITIES } from "../data/cities";
import { NATIONAL_CAPITAL_FLAGS } from "../data/nationalCapitalFlags";
import { NATIONAL_CAPITAL_SUBDIVISION } from "../data/nationalCapitalLocations";
import { subdivisionGroupFlag, type SubdivisionGroupFlag } from "../data/subdivisionGroupFlags";
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
  // A collective flag flown for this WHOLE group of subdivisions together
  // (Malaysia's Flag of the Federal Territories), never for any one member.
  // Rendered above the group's members — as a flag on the group label in the
  // chart, and as a row directly above the group's rows in the table.
  groupFlag: SubdivisionGroupFlag | null;
};

export type StandaloneCapital = { name: string; note: string | null };

// A handful of subdivisions carry a fuller/official display name (`div.name`)
// that differs from the plain city name their OWN capital-city record uses in
// NATIONAL_CITIES/cities.ts — e.g. Argentina's AR-C is officially named
// "Autonomous City of Buenos Aires" (its ISO 3166-2 name, disambiguating it
// from AR-B "Buenos Aires Province" in flat lists like the division search
// dropdown), while its own capital city is still recorded everywhere else as
// plain "Buenos Aires" — the SAME place, just a shorter name. Every
// tautological "this subdivision IS its own capital" check below compares
// those two name sources by exact string match, so without this alias a
// rename like AR-C's would wrongly stop recognising Buenos Aires as its own
// self-capital and start treating it like a genuinely distinct, geographically
// CONTAINED city (the Ottawa/Ontario or Canberra/ACT pattern) — which it is
// not, since the "city" and the "subdivision" are the exact same polygon.
// This alias never invents a new fact, it only tells the comparison which of
// two already-sourced names for the SAME place to use.
// US-DC is renamed to "Washington, D.C." (single space) in SUBDIVISION_META
// to disambiguate it from the State of Washington (US-WA) — both otherwise
// display as the bare "Washington". Its own capital-city record in
// cities.ts, however, is sourced verbatim from Natural Earth, which carries
// "Washington,  D.C." with a double space (a recurring NE quirk also seen on
// "Ft.  Worth", "Mt.  Hagen", "St.  Paul" and "St.  Petersburg" — not a typo
// to silently "fix" in the authoritative source). The alias must match that
// exact double-spaced string so the tautology check below still recognises
// Washington, D.C. as its OWN capital rather than splitting it into a
// separate "national capital" row, same as the Buenos Aires case above.
const SUBDIVISION_SELF_NAME_ALIAS: Record<string, string> = {
  "AR-C": "Buenos Aires",
  "US-DC": "Washington,  D.C.",
};

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
        // Lumpur → Kuala Lumpur) — via SUBDIVISION_SELF_NAME_ALIAS where the
        // subdivision's own display name has been disambiguated (Buenos Aires).
        const sameName =
          capital != null &&
          normalizeForSearch(capital.name) ===
            normalizeForSearch(SUBDIVISION_SELF_NAME_ALIAS[d.code] ?? d.name);
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
      // The subdivision that geographically CONTAINS this capital, per
      // point-in-polygon (same source as case (c) below) — authoritative
      // whenever more than one subdivision shares the capital's display name
      // (Argentina's Buenos Aires Province vs. the Autonomous City; Bulgaria's
      // Sofia Province vs. Sofia city-district; Croatia's Zagreb County vs.
      // Zagreb City; Russia's Moscow Oblast vs. Moscow the federal city;
      // Ukraine's Kyiv Oblast vs. Kyiv City; Uzbekistan's Tashkent Region vs.
      // Tashkent City; Yemen's Sanaa Governorate vs. Sanaa City). Computed
      // once here so cases (b) and (c) never have to guess by array order.
      const hostCode = NATIONAL_CAPITAL_SUBDIVISION[`${countryCode}|${cap.name}`];
      const hostNode = hostCode ? byCode.get(hostCode) : undefined;
      // (a)/(b) The point-in-polygon host is authoritative whenever it names
      //     a node — checked FIRST and EXCLUSIVELY against that one node, so
      //     an unrelated same-named sibling can never steal the badge by
      //     sorting first. Two shapes, tried in order:
      //       - the host's OWN shown capital-city leaf IS this capital
      //         (Canberra ≡ ACT's leaf; Bulgaria's Sofia (Capital) BG-22's own
      //         "Sofia" leaf, never Sofia Province BG-23's identically-named
      //         seat leaf);
      //       - the host subdivision itself IS this capital, tautologically
      //         (Kuala Lumpur, Zagreb City, Kyiv City, Argentina's Buenos
      //         Aires Autonomous City — never a same-named sibling like
      //         Buenos Aires Province).
      //     Only when there's NO host record at all (rare — a capital not
      //     yet covered by NATIONAL_CAPITAL_SUBDIVISION) do we fall back to
      //     scanning every node by name, which is inherently order-dependent
      //     and the source of this whole bug class.
      let marked = false;
      if (hostNode) {
        const hostLeaf = hostNode.leaves.find(
          (l) => l.kind === "sub" && normalizeForSearch(l.name) === k,
        );
        if (hostLeaf) {
          hostLeaf.role = role;
          hostLeaf.note = cap.note ?? null;
          marked = true;
        } else if (
          normalizeForSearch(SUBDIVISION_SELF_NAME_ALIAS[hostNode.div.code] ?? hostNode.div.name) === k
        ) {
          hostNode.subCapitalRole = role;
          marked = true;
        }
      }
      if (!marked) {
        // (a) legacy fallback — a shown subdivision-capital leaf IS this
        //     capital (Cape Town ≡ Western Cape).
        for (const n of nodes) {
          const leaf = n.leaves.find((l) => l.kind === "sub" && normalizeForSearch(l.name) === k);
          if (leaf) {
            leaf.role = role;
            leaf.note = cap.note ?? null;
            marked = true;
            break;
          }
        }
      }
      if (marked) continue;
      // (b) legacy fallback — a subdivision IS this capital (a
      //     city-territory whose own leaf is tautological and suppressed).
      const cityTerritory = nodes.find((n) => normalizeForSearch(n.div.name) === k);
      if (cityTerritory) {
        cityTerritory.subCapitalRole = role;
        continue;
      }
      // (c) A capital that heads no subdivision but sits inside one (Ottawa →
      //     Ontario, Pretoria → Gauteng) — add it as an extra capital leaf under
      //     the containing subdivision, level with that subdivision's own capital.
      if (hostNode) {
        hostNode.leaves.push({
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
        groupFlag: subdivisionGroupFlag(countryCode, typeLabel),
      }))
      .sort((a, b) => {
        const ta = groupTier(a.typeLabel, a.allDisputed);
        const tb = groupTier(b.typeLabel, b.allDisputed);
        if (ta !== tb) return ta - tb;
        if (b.items.length !== a.items.length) return b.items.length - a.items.length;
        return a.typeLabel.localeCompare(b.typeLabel, "en");
      });
  }, [nodes, countryCode]);

  return { nodes, standaloneCaps, groups };
}
