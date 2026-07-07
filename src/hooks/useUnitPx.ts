import { useCallback, useRef, useState } from "react";

/**
 * Measures the number of on-screen pixels per SVG user unit for a map whose SVG
 * has a `0 0 {viewBoxWidth} …` viewBox and fills the referenced element's width.
 *
 * The Learn maps draw at a fixed 960-unit-wide viewBox but are scaled by the
 * browser to whatever width they occupy (narrow on a phone, wide on desktop), so
 * anything sized in user units shrinks on small screens. Callers use this ratio
 * to counter-scale elements that must stay a CONSTANT on-screen size — e.g. the
 * capital-name label in `CityMarkers`, which was unreadably small on phones when
 * sized in raw user units.
 *
 * Returns `[unitPx, setFrame]`. Attach `setFrame` as the `ref` of the element
 * whose width tracks the SVG. It is a CALLBACK ref (not a ref object) on purpose:
 * some maps render a loading/empty state before the real map, so the measured
 * element only appears on a later render — a callback ref fires exactly when the
 * element mounts (and again on unmount), which a plain ref + mount-only effect
 * would miss, leaving unitPx stuck at its default.
 */
export function useUnitPx(
  viewBoxWidth: number,
): [number, (el: HTMLElement | null) => void] {
  const [unitPx, setUnitPx] = useState(1);
  const roRef = useRef<ResizeObserver | null>(null);

  const setFrame = useCallback(
    (el: HTMLElement | null) => {
      roRef.current?.disconnect();
      roRef.current = null;
      if (!el) return;
      const update = () => {
        const w = el.clientWidth;
        if (w > 0) setUnitPx(w / viewBoxWidth);
      };
      update();
      const ro = new ResizeObserver(update);
      ro.observe(el);
      roRef.current = ro;
    },
    [viewBoxWidth],
  );

  return [unitPx, setFrame];
}
