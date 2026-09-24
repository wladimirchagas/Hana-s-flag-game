/**
 * Country Personas — lookups and presentation helpers shared by every surface that shows them
 * (flag-grid Group by, map colour mode, fact-sheet row, persona map).
 *
 * Data: src/data/countryPersonas.ts (generated from the frozen model — never hand-edit it).
 * Rules: CLAUDE.md "Country Personas" and docs/COUNTRY_PERSONAS_PLAYBOOK.md.
 */
import { COUNTRY_PERSONAS, PERSONAS, type CountryPersona, type Persona } from "../data/countryPersonas.ts";
import type { PersonaMapMode } from "./democracyColors";

export { PERSONA_EDITION, PERSONA_MAP } from "../data/countryPersonas.ts";

/** The single map-colour mode value for personas (see DemocracyMapMode). */
export const PERSONA_MAP_MODE: PersonaMapMode = { kind: "persona" };

/**
 * One colour per persona: 30 CATEGORICAL colours (scripts/country-personas/palette.py — greedy
 * farthest-point in CIEDE2000, mid lightness, seeded with Okabe–Ito). Personas are not ordered,
 * so they must never borrow the index green→red scale (which reads as better→worse).
 * scripts/country-personas/assign-colors.mjs chose WHICH persona gets which colour, so that
 * personas bordering each other on the world map, or neighbouring on the persona map, differ
 * clearly (smallest difference between touching personas: ΔE2000 21.3).
 */
export const PERSONA_COLORS: Readonly<Record<string, string>> = {
  "01": "#7088F8",
  "02": "#A06000",
  "03": "#009E73",
  "04": "#C02890",
  "05": "#D55E00",
  "06": "#F8A0F0",
  "07": "#B07060",
  "08": "#30D880",
  "09": "#707000",
  "10": "#9070A0",
  "11": "#F8B078",
  "12": "#789058",
  "13": "#CC79A7",
  "14": "#C8B880",
  "15": "#088890",
  "16": "#F85878",
  "17": "#0072B2",
  "18": "#E69F00",
  "19": "#56B4E9",
  "20": "#108008",
  "21": "#F89888",
  "22": "#00D0D0",
  "23": "#C078F0",
  "24": "#A89800",
  "25": "#98C038",
  "26": "#C83048",
  "27": "#C0B8F8",
  "28": "#207860",
  "29": "#8058C8",
  "30": "#A08050",
};

/** Below this assignment confidence a country is "also close to" its next persona (ledger D16). */
export const PERSONA_BORDERLINE = 0.05;

/** Shown in every persona explanation: the ecological-fallacy guard (playbook Part F). */
export const PERSONA_AVERAGES_NOTE =
  "A persona describes a country's national averages, not the people who live there.";

/** How every persona figure is chosen — the owner's rule, stated where the figures appear. */
export const PERSONA_FIGURES_NOTE = "Every member country falls within these ranges (they are not averages)";

export const PERSONA_UNCLASSIFIED_LABEL = "Not classified (not enough comparable data)";
export const PERSONA_OUTSIDE_LABEL = "Not part of the classification";

const BY_CODE = new Map(PERSONAS.map((p) => [p.code, p]));

export function countryPersona(code: string): CountryPersona | null {
  return COUNTRY_PERSONAS[code.toUpperCase()] ?? null;
}

export function personaByCode(code: string | undefined): Persona | null {
  return code ? BY_CODE.get(code) ?? null : null;
}

/** "19 · Urbanised Spanish- and Portuguese-Speaking Societies" */
export function personaLabel(p: Persona): string {
  return `${p.code} · ${p.name}`;
}

export function personaColor(code: string | undefined): string | undefined {
  return code ? PERSONA_COLORS[code] : undefined;
}

export function isBorderline(p: CountryPersona | null): boolean {
  return !!p && p.status !== "unclassified" && (p.confidence ?? 1) < PERSONA_BORDERLINE;
}

/** "10 countries · 9.6% of the world's people · e.g. Brazil, Colombia, Peru" */
export function personaMeta(p: Persona): string {
  const share = p.worldPopulationShare * 100;
  const pct = share < 0.1 ? "under 0.1" : share.toFixed(share < 10 ? 1 : 0);
  return `${p.size} countries · ${pct}% of the world's people · e.g. ${p.examples.join(", ")}`;
}

/** Map fill per country code, by persona. Unclassified and non-member codes stay unfilled. */
export function getPersonaColorOverlay(): Map<string, string> {
  const overlay = new Map<string, string>();
  for (const [code, p] of Object.entries(COUNTRY_PERSONAS)) {
    const color = personaColor(p.persona);
    if (p.status !== "unclassified" && color) overlay.set(code, color);
  }
  return overlay;
}

/** Group-by heading for a country code (grid "By country persona"). */
export function personaHeading(code: string): string {
  const p = countryPersona(code);
  if (!p) return PERSONA_OUTSIDE_LABEL;
  if (p.status === "unclassified") return PERSONA_UNCLASSIFIED_LABEL;
  const persona = personaByCode(p.persona);
  return persona ? personaLabel(persona) : PERSONA_OUTSIDE_LABEL;
}

/** Sort key for those headings: 01…30, then unclassified, then outside. (Digits, not "~":
 *  locale-aware comparison sorts punctuation BEFORE digits and letters.) */
export function personaHeadingOrder(heading: string): string {
  if (heading === PERSONA_UNCLASSIFIED_LABEL) return "1";
  if (heading === PERSONA_OUTSIDE_LABEL) return "2";
  return `0 ${heading}`;
}

/** Resolve a heading back to the persona it names (for its tooltip). */
export function personaFromHeading(heading: string): Persona | null {
  const p = personaByCode(heading.split(" · ")[0]);
  return p && heading === personaLabel(p) ? p : null;
}

export { PERSONAS };
export type { CountryPersona, Persona };
