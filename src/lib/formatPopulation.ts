/**
 * Single source of truth for how a population figure is abbreviated in the
 * Learn widget, so national and subnational fact-rows read identically:
 *   1_234        → "1,234"
 *   45_000       → "~45 k"
 *   9_600_000    → "~9.6 M"
 *   47_000_000   → "~47 M"
 * (< 10 M keeps one decimal; ≥ 10 M rounds to a whole number of millions.)
 */
export function formatPopulationShort(n: number): string {
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    const rounded = m >= 10 ? Math.round(m) : Math.round(m * 10) / 10;
    return `~${rounded} M`;
  }
  if (n >= 1_000) return `~${Math.round(n / 1_000)} k`;
  return n.toLocaleString();
}
