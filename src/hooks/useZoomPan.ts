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
 * can't lose the map by overzooming or shrinking it into the void. Pan
 * is clamped so the viewBox always stays covered by the map — at k=1
 * pan is effectively disabled (the clamp collapses to zero).
 */
export type ZoomPanState = {
  /** Current transform string, ready for `<g transform={t}>`. */
  transform: string;
  /** Raw zoom + pan values. Use these to position overlay elements that must
   *  NOT be inside the zoom `<g>` (e.g. the country pulse indicator). */
  view: { k: number; tx: number; ty: number };
  /** Whether the user has zoomed/panned away from the initial state. */
  isZoomed: boolean;
  /** Whether further zoom-in is possible (k < MAX_K). */
  canZoomIn: boolean;
  /** Whether further zoom-out is possible (k > MIN_K). */
  canZoomOut: boolean;
  /** Zoom in by a fixed step, centred on the SVG. */
  zoomIn: () => void;
  /** Zoom out by a fixed step. */
  zoomOut: () => void;
  /** Reset to the initial 1× / origin view. */
  reset: () => void;
  /**
   * Smoothly animate the viewport so that the given SVG-viewBox coordinate
   * (svgX, svgY) is centred on screen at zoom level `targetK`.
   * Clamps to [MIN_K, MAX_K] and respects pan bounds.
   */
  zoomTo: (svgX: number, svgY: number, targetK: number) => void;
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

type View = { k: number; tx: number; ty: number };

/**
 * @param width   the SVG's viewBox width  (e.g., 960)
 * @param height  the SVG's viewBox height (e.g., 500)
 */
export function useZoomPan(width: number, height: number): ZoomPanState {
  // {k, tx, ty} kept in a single state object so every transition is
  // atomic. The previous version split them across 3 useState calls
  // and updated tx/ty as side effects inside setK's updater — which
  // double-fires under React StrictMode (dev) and ended up calling
  // setTx twice per click, causing the pan to overshoot and stick at
  // the clamp bounds.
  const [view, setView] = useState<View>({ k: 1, tx: 0, ty: 0 });
  const { k, tx, ty } = view;
  // Always-current ref — lets zoomTo read the snapshot at call time
  // without capturing stale state in its useCallback deps.
  const viewRef = useRef(view);
  viewRef.current = view;
  // Timer handle for the zoomTo animation loop (setTimeout-based so it
  // works even in background iframes where requestAnimationFrame is throttled).
  const animTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clamp the pan offsets so the user can't drag the map completely
  // off-screen. With scale `k`, the SVG content occupies the viewBox
  // rect (tx, ty, tx+W*k, ty+H*k); to keep the viewBox covered we
  // require tx ∈ [W*(1-k), 0] and ty ∈ [H*(1-k), 0]. At k=1 both
  // intervals collapse to [0, 0] — pan is disabled at initial scale.
  const clampTx = (val: number, kk: number) =>
    Math.max(width * (1 - kk), Math.min(0, val));
  const clampTy = (val: number, kk: number) =>
    Math.max(height * (1 - kk), Math.min(0, val));

  const drag = useRef<{
    active: boolean;
    /** True once we've called setPointerCapture for this gesture. We
     *  defer the capture until movement crosses the drag threshold so
     *  that a click-to-select stays a click (capturing in onPointerDown
     *  retargets the synthesized click to the SVG, breaking path
     *  onClick handlers). */
    captured: boolean;
    startX: number;
    startY: number;
    origTx: number;
    origTy: number;
    moved: boolean;
  }>({ active: false, captured: false, startX: 0, startY: 0, origTx: 0, origTy: 0, moved: false });

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
      setView((prev) => {
        const newK = Math.min(
          MAX_K,
          Math.max(MIN_K, prev.k * Math.exp(-e.deltaY * WHEEL_SENSITIVITY)),
        );
        if (newK === prev.k) return prev;
        const newTx = x - ((x - prev.tx) * newK) / prev.k;
        const newTy = y - ((y - prev.ty) * newK) / prev.k;
        return { k: newK, tx: clampTx(newTx, newK), ty: clampTy(newTy, newK) };
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [width, height],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      if (e.button !== 0) return;
      drag.current = {
        active: true,
        captured: false,
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
      const dxViewBox = ((e.clientX - d.startX) / rect.width) * width;
      const dyViewBox = ((e.clientY - d.startY) / rect.height) * height;
      if (!d.moved && Math.hypot(e.clientX - d.startX, e.clientY - d.startY) > 4) {
        d.moved = true;
        if (!d.captured) {
          try {
            svg.setPointerCapture(e.pointerId);
            d.captured = true;
          } catch {
            // ignore — some browsers won't capture if the pointer left
          }
        }
      }
      if (d.moved) {
        setView((prev) => ({
          k: prev.k,
          tx: clampTx(d.origTx + dxViewBox, prev.k),
          ty: clampTy(d.origTy + dyViewBox, prev.k),
        }));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [width, height],
  );

  const finishDrag = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    const d = drag.current;
    if (!d.active) return;
    const svg = e.currentTarget;
    if (d.captured) {
      try {
        svg.releasePointerCapture(e.pointerId);
      } catch {
        // ignore — pointer may already be released
      }
    }
    drag.current = { ...d, active: false };
    // If we dragged, swallow the click that the browser will fire next
    // on a country path INSIDE this svg — otherwise the user pans and
    // inadvertently selects a country. Listening on the SVG (not
    // window) means buttons / unrelated DOM clicks still work.
    if (d.moved) {
      const swallow = (ev: MouseEvent) => {
        ev.stopPropagation();
        ev.preventDefault();
        svg.removeEventListener("click", swallow, true);
      };
      svg.addEventListener("click", swallow, true);
    }
  }, []);

  const reset = useCallback(() => {
    setView({ k: 1, tx: 0, ty: 0 });
  }, []);

  const zoomBy = useCallback(
    (factor: number) => {
      const cx = width / 2;
      const cy = height / 2;
      setView((prev) => {
        const newK = Math.min(MAX_K, Math.max(MIN_K, prev.k * factor));
        if (newK === prev.k) return prev;
        const newTx = cx - ((cx - prev.tx) * newK) / prev.k;
        const newTy = cy - ((cy - prev.ty) * newK) / prev.k;
        return { k: newK, tx: clampTx(newTx, newK), ty: clampTy(newTy, newK) };
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [width, height],
  );

  const zoomIn = useCallback(() => zoomBy(1.6), [zoomBy]);
  const zoomOut = useCallback(() => zoomBy(1 / 1.6), [zoomBy]);

  /** Smoothly fly the viewport to centre (svgX, svgY) at zoom targetK. */
  const zoomTo = useCallback(
    (svgX: number, svgY: number, targetK: number) => {
      const clampedK = Math.min(MAX_K, Math.max(MIN_K, targetK));
      const finalTx = Math.max(
        width * (1 - clampedK),
        Math.min(0, width / 2 - svgX * clampedK),
      );
      const finalTy = Math.max(
        height * (1 - clampedK),
        Math.min(0, height / 2 - svgY * clampedK),
      );
      const start = { ...viewRef.current };
      const t0 = performance.now();
      const DURATION = 650; // ms
      const FRAME_MS = 16;  // ~60 fps

      if (animTimerRef.current !== null) {
        clearTimeout(animTimerRef.current);
        animTimerRef.current = null;
      }

      // Use setTimeout rather than requestAnimationFrame so the animation
      // runs even in background / iframe contexts where rAF is throttled.
      const tick = () => {
        const progress = Math.min(1, (performance.now() - t0) / DURATION);
        // Ease-out cubic — fast start, smooth landing.
        const ease = 1 - Math.pow(1 - progress, 3);
        setView({
          k:  start.k  + (clampedK - start.k)  * ease,
          tx: start.tx + (finalTx  - start.tx) * ease,
          ty: start.ty + (finalTy  - start.ty) * ease,
        });
        animTimerRef.current = progress < 1 ? setTimeout(tick, FRAME_MS) : null;
      };

      animTimerRef.current = setTimeout(tick, FRAME_MS);
    },
    // width/height are stable (960, 500); clamp helpers inline above.
    [width, height],
  );

  return {
    transform: `translate(${tx} ${ty}) scale(${k})`,
    view: { k, tx, ty },
    isZoomed: k !== 1 || tx !== 0 || ty !== 0,
    canZoomIn: k < MAX_K,
    canZoomOut: k > MIN_K,
    zoomIn,
    zoomOut,
    reset,
    zoomTo,
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
