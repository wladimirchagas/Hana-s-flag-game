import { useCallback, useRef, useState } from "react";

/**
 * Minimal SVG zoom + pan state for an Equal-Earth world map.
 *
 * - **Wheel** (incl. trackpad pinch) zooms in/out around the cursor.
 * - **Drag** pans.
 * - **Double-click** resets to the initial view.
 *
 * We deliberately don't use d3-zoom — the React renderer for our map is
 * declarative, and a one-state `{ k, tx, ty }` transform applied to the
 * outer <g> is enough. Avoids a 7-kB dependency for ~50 lines of code.
 *
 * The hook returns the transform string ready for `<g transform=…>` plus
 * event handlers to spread onto the `<svg>` element. `reset()` is exposed
 * for an explicit "Reset zoom" button.
 *
 * Zoom is clamped to a sensible range (currently 1× to 12×) so users
 * can't lose the map by overzooming or shrinking it into the void.
 */
export type ZoomPanState = {
  /** Current transform string, ready for `<g transform={t}>`. */
  transform: string;
  /** Whether the user has zoomed/panned away from the initial state. */
  isZoomed: boolean;
  /** Reset to the initial 1× / origin view. */
  reset: () => void;
  /** Spread these onto the `<svg>` to enable zoom + pan. */
  svgHandlers: {
    onWheel: (e: React.WheelEvent<SVGSVGElement>) => void;
    onPointerDown: (e: React.PointerEvent<SVGSVGElement>) => void;
    onPointerMove: (e: React.PointerEvent<SVGSVGElement>) => void;
    onPointerUp: (e: React.PointerEvent<SVGSVGElement>) => void;
    onPointerCancel: (e: React.PointerEvent<SVGSVGElement>) => void;
    onDoubleClick: () => void;
    style: React.CSSProperties;
  };
};

const MIN_K = 1;
const MAX_K = 12;
const WHEEL_SENSITIVITY = 0.0015;

/**
 * @param width   the SVG's viewBox width  (e.g., 960)
 * @param height  the SVG's viewBox height (e.g., 500)
 */
export function useZoomPan(width: number, height: number): ZoomPanState {
  const [k, setK] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const drag = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    origTx: number;
    origTy: number;
    moved: boolean;
  }>({ active: false, startX: 0, startY: 0, origTx: 0, origTy: 0, moved: false });

  /**
   * Convert a mouse event's client coordinates into the SVG's viewBox space.
   * Without this, zoom-around-cursor would feel off because the SVG is
   * scaled by CSS (`width: 100%`) and the viewBox coords don't match px.
   */
  const clientToSvg = (
    svg: SVGSVGElement,
    clientX: number,
    clientY: number,
  ): { x: number; y: number } => {
    const rect = svg.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * width,
      y: ((clientY - rect.top) / rect.height) * height,
    };
  };

  const onWheel = useCallback(
    (e: React.WheelEvent<SVGSVGElement>) => {
      e.preventDefault();
      const svg = e.currentTarget;
      const { x, y } = clientToSvg(svg, e.clientX, e.clientY);
      // Negative deltaY = scroll up = zoom in.
      const newK = Math.min(
        MAX_K,
        Math.max(MIN_K, k * Math.exp(-e.deltaY * WHEEL_SENSITIVITY)),
      );
      if (newK === k) return;
      // Anchor the zoom on the cursor: after the change, the SVG point
      // under the cursor must stay under the cursor.
      const newTx = x - ((x - tx) * newK) / k;
      const newTy = y - ((y - ty) * newK) / k;
      setK(newK);
      setTx(newTx);
      setTy(newTy);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [k, tx, ty, width, height],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      // Ignore right-click / middle-click drags.
      if (e.button !== 0) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      drag.current = {
        active: true,
        startX: e.clientX,
        startY: e.clientY,
        origTx: tx,
        origTy: ty,
        moved: false,
      };
    },
    [tx, ty],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      const d = drag.current;
      if (!d.active) return;
      const svg = e.currentTarget;
      const rect = svg.getBoundingClientRect();
      // Convert pixel delta into viewBox delta.
      const dxViewBox = ((e.clientX - d.startX) / rect.width) * width;
      const dyViewBox = ((e.clientY - d.startY) / rect.height) * height;
      // Mark as moved once we cross a small threshold so that a *click*
      // doesn't get suppressed. The country onClick handler still fires
      // through the path, but if the user clearly dragged we want to
      // prevent the click from registering.
      if (!d.moved && Math.hypot(e.clientX - d.startX, e.clientY - d.startY) > 4) {
        d.moved = true;
      }
      setTx(d.origTx + dxViewBox);
      setTy(d.origTy + dyViewBox);
    },
    [width, height],
  );

  const finishDrag = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    const d = drag.current;
    if (!d.active) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    drag.current = { ...d, active: false };
    // If we dragged, swallow the click that the browser will fire next on
    // any path under the pointer — otherwise the user pans and inadvertently
    // selects a country.
    if (d.moved) {
      const swallow = (ev: MouseEvent) => {
        ev.stopPropagation();
        ev.preventDefault();
        window.removeEventListener("click", swallow, true);
      };
      window.addEventListener("click", swallow, true);
    }
  }, []);

  const reset = useCallback(() => {
    setK(1);
    setTx(0);
    setTy(0);
  }, []);

  return {
    transform: `translate(${tx} ${ty}) scale(${k})`,
    isZoomed: k !== 1 || tx !== 0 || ty !== 0,
    reset,
    svgHandlers: {
      onWheel,
      onPointerDown,
      onPointerMove,
      onPointerUp: finishDrag,
      onPointerCancel: finishDrag,
      onDoubleClick: reset,
      style: {
        cursor: drag.current.active ? "grabbing" : "grab",
        touchAction: "none",
      },
    },
  };
}
