import { useLayoutEffect, useRef } from "react";

/**
 * A fixed-width card label that NEVER breaks a word across lines mid-letter (see
 * the CLAUDE.md hard rule "Card labels must never break a word mid-letter").
 *
 * The accompanying CSS keeps `overflow-wrap: normal; word-break: normal;` so a
 * word is never split between characters; a multi-word name still wraps at
 * spaces. When a SINGLE word is wider than its fixed-width card (e.g.
 * "Johannesburg" / "Liechtenstein" on a narrow phone card) we shrink just that
 * label's font a little until the whole word fits — so it is always shown
 * intact, never wrapped mid-word and never truncated.
 *
 * Shared by every card grid that can receive a long single-word place name
 * (the flag grids, the city-flags grid, the hierarchy chart). Wrap ONLY the
 * name text — keep any sub-label/tag as a sibling so it is measured separately.
 */
export function AutoFitName({
  text,
  className,
  title,
  minScale = 0.56,
}: {
  text: string;
  className: string;
  /** Tooltip; defaults to the full text. */
  title?: string;
  /** Lowest fraction of the base font size the label may shrink to. */
  minScale?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.fontSize = ""; // reset to the CSS base before measuring
    const base = parseFloat(getComputedStyle(el).fontSize);
    const min = base * minScale;
    let size = base;
    let guard = 0;
    // scrollWidth > clientWidth means a single word overflows horizontally
    // (multi-word names wrap at spaces and never trigger this).
    while (el.scrollWidth > el.clientWidth + 0.5 && size > min && guard < 24) {
      size -= 0.5;
      el.style.fontSize = `${size}px`;
      guard++;
    }
  }, [text]);
  return (
    <span ref={ref} className={className} title={title ?? text}>
      {text}
    </span>
  );
}
