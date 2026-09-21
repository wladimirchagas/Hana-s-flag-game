/**
 * Learn-mode information panel drawer on large screens (>900px).
 *
 * The panel stays collapsed until the user selects a country/polity (or taps
 * Info after Hide). Mobile / ≤900px ignores this and always shows the stacked
 * panel.
 */
export function selectionKeyForPanel(
  selected:
    | { kind: "modern"; country: { code: string } }
    | { kind: "historical"; name: string }
    | null,
  subdivisionCountryCode: string | null,
): string | null {
  if (subdivisionCountryCode) return `sub:${subdivisionCountryCode}`;
  if (!selected) return null;
  if (selected.kind === "modern") return `modern:${selected.country.code}`;
  return `historical:${selected.name}`;
}
