/**
 * Single source of truth for how a population figure is written in the Learn
 * widget, so national and subnational fact-rows read identically. Spelled-out
 * "million" (rather than "M") because it's easier for users to understand:
 *   9_600_000    → "9.6 million"
 *   47_327_407   → "47.3 million"
 *   145_000_000  → "145 million"
 *   87_486       → "87,486"
 * (≥ 100 M rounds to a whole number of millions, ≥ 10 M keeps one decimal,
 * 1–10 M keeps two; below a million the exact grouped number is shown.)
 */
export function formatPopulation(n: number): string {
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    const rounded =
      m >= 100 ? Math.round(m) : m >= 10 ? Math.round(m * 10) / 10 : Math.round(m * 100) / 100;
    return `${rounded} million`;
  }
  return n.toLocaleString("en-US");
}
