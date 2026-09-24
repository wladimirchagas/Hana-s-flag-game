/**
 * Country Personas — lookups and presentation helpers shared by every surface that shows them
 * (flag-grid Group by, map colour mode, fact-sheet row, family-tree chart).
 *
 * Data: src/data/countryPersonas.ts (generated from the owner-approved frozen model — never
 * hand-edit it). Rules: CLAUDE.md "Country Personas" and docs/COUNTRY_PERSONAS_PLAYBOOK.md.
 */
import {
  COUNTRY_PERSONAS,
  PERSONA_GROUPS,
  PERSONA_TYPES,
  type CountryPersona,
  type PersonaGroup,
  type PersonaType,
} from "../data/countryPersonas";
import type { PersonaMapMode } from "./democracyColors";

export { PERSONA_EDITION } from "../data/countryPersonas";

/** The single map-colour mode value for personas (see DemocracyMapMode). */
export const PERSONA_MAP_MODE: PersonaMapMode = { kind: "persona" };

/**
 * Group colours: Okabe–Ito, a colour-blind-safe CATEGORICAL palette. Personas are not ordered,
 * so they must never borrow the index green→red scale (which reads as better→worse), and every
 * colour shown together must stay distinct — the same guarantee as the hierarchy type badges.
 */
export const PERSONA_GROUP_COLORS: Readonly<Record<string, string>> = {
  A: "#0072B2",
  B: "#CC79A7",
  C: "#E69F00",
  D: "#009E73",
  E: "#56B4E9",
};

/** Below this assignment confidence a country "sits between" two groups (ledger D7). */
export const PERSONA_BORDERLINE = 0.1;

/** Shown in every persona explanation: the ecological-fallacy guard (playbook Part F). */
export const PERSONA_AVERAGES_NOTE =
  "A persona describes a country's national averages, not the people who live there.";

export const PERSONA_UNCLASSIFIED_LABEL = "Not classified (not enough comparable data)";
export const PERSONA_OUTSIDE_LABEL = "Not part of the classification";

const GROUP_BY_CODE = new Map(PERSONA_GROUPS.map((g) => [g.code, g]));
const TYPE_BY_CODE = new Map(PERSONA_TYPES.map((t) => [t.code, t]));

export function countryPersona(code: string): CountryPersona | null {
  return COUNTRY_PERSONAS[code.toUpperCase()] ?? null;
}

export function personaGroupByCode(code: string | undefined): PersonaGroup | null {
  return code ? GROUP_BY_CODE.get(code) ?? null : null;
}

export function personaTypeByCode(code: string | undefined): PersonaType | null {
  return code ? TYPE_BY_CODE.get(code) ?? null : null;
}

export function personaGroupLabel(g: PersonaGroup): string {
  return `${g.code} · ${g.name}`;
}

export function personaTypeLabel(t: PersonaType): string {
  return `${t.code} · ${t.name}`;
}

export function isBorderline(p: CountryPersona | null): boolean {
  return !!p && p.status !== "unclassified" && (p.confidence ?? 1) < PERSONA_BORDERLINE;
}

/** "40 countries · 16.9% of the world's people · e.g. Austria, Chile, New Zealand" */
export function personaGroupMeta(g: PersonaGroup): string {
  const share = g.worldPopulationShare * 100;
  const pct = share < 1 ? share.toFixed(1) : share.toFixed(share < 10 ? 1 : 0);
  return `${g.size} countries · ${pct}% of the world's people · e.g. ${g.examples.join(", ")}`;
}

export function personaTypeMeta(t: PersonaType): string {
  const g = personaGroupByCode(t.group);
  return `${t.size} countries · part of ${g ? personaGroupLabel(g) : t.group} · e.g. ${t.examples.join(", ")}`;
}

/** Map fill per country code, by persona group. Unclassified and non-member codes stay unfilled. */
export function getPersonaColorOverlay(): Map<string, string> {
  const overlay = new Map<string, string>();
  for (const [code, p] of Object.entries(COUNTRY_PERSONAS)) {
    if (p.status !== "unclassified" && p.group && PERSONA_GROUP_COLORS[p.group]) {
      overlay.set(code, PERSONA_GROUP_COLORS[p.group]);
    }
  }
  return overlay;
}

/** Group-by heading for a country code (grid "By country persona" / "By persona type"). */
export function personaHeading(code: string, level: "group" | "type"): string {
  const p = countryPersona(code);
  if (!p) return PERSONA_OUTSIDE_LABEL;
  if (p.status === "unclassified") return PERSONA_UNCLASSIFIED_LABEL;
  if (level === "group") {
    const g = personaGroupByCode(p.group);
    return g ? personaGroupLabel(g) : PERSONA_OUTSIDE_LABEL;
  }
  const t = personaTypeByCode(p.type);
  return t ? personaTypeLabel(t) : PERSONA_OUTSIDE_LABEL;
}

/** Sort order for those headings: A…E (or A01…E12), then unclassified, then outside. */
export function personaHeadingOrder(heading: string): string {
  if (heading === PERSONA_UNCLASSIFIED_LABEL) return "~1";
  if (heading === PERSONA_OUTSIDE_LABEL) return "~2";
  return heading;
}

/** Resolve a heading back to the persona it names (for its tooltip). */
export function personaFromHeading(heading: string): { group: PersonaGroup } | { type: PersonaType } | null {
  const code = heading.split(" · ")[0];
  const t = personaTypeByCode(code);
  if (t && heading === personaTypeLabel(t)) return { type: t };
  const g = personaGroupByCode(code);
  if (g && heading === personaGroupLabel(g)) return { group: g };
  return null;
}

export { PERSONA_GROUPS, PERSONA_TYPES };
export type { CountryPersona, PersonaGroup, PersonaType };
