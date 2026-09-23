import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { MapDataTooltip } from "../lib/mapDataTooltip";

/**
 * Hover / tap tooltip for a data-coloured world map (indexes, WVS). Lives in
 * its own component so following the cursor never re-renders the map's ~250
 * country paths: the map drives it through the imperative handle, position
 * updates are written straight to the element's style, and only a change of
 * country re-renders this small layer.
 *
 * It is purely informational and carries `pointer-events: none` (in CSS), so it
 * can never swallow the hover or the tap meant for the country underneath.
 */
export type MapDataTooltipHandle = {
  /** Show the tooltip for `code` at (x, y) px relative to the map frame. */
  show: (code: string, name: string, x: number, y: number) => void;
  /** Move the visible tooltip without changing its content. */
  move: (x: number, y: number) => void;
  hide: () => void;
};

type Props = {
  getData: (code: string) => MapDataTooltip | null;
};

type Content = { code: string; name: string };

const OFFSET = 14;

export const MapDataTooltipLayer = forwardRef<MapDataTooltipHandle, Props>(
  function MapDataTooltipLayer({ getData }, ref) {
    const [content, setContent] = useState<Content | null>(null);
    const elRef = useRef<HTMLDivElement>(null);
    const posRef = useRef({ x: 0, y: 0 });

    // Place the box beside the pointer, flipping to the left / above in the
    // right / bottom half of the frame so it stays inside the map.
    const place = () => {
      const el = elRef.current;
      if (!el) return;
      const frame = el.parentElement;
      const w = frame?.clientWidth ?? 0;
      const h = frame?.clientHeight ?? 0;
      const { x, y } = posRef.current;
      const flipX = x > w / 2;
      const flipY = y > h / 2;
      el.style.left = `${x + (flipX ? -OFFSET : OFFSET)}px`;
      el.style.top = `${y + (flipY ? -OFFSET : OFFSET)}px`;
      el.style.translate = `${flipX ? "-100%" : "0"} ${flipY ? "-100%" : "0"}`;
    };

    useImperativeHandle(ref, () => ({
      show(code, name, x, y) {
        posRef.current = { x, y };
        setContent((prev) =>
          prev && prev.code === code && prev.name === name ? prev : { code, name },
        );
        place();
      },
      move(x, y) {
        posRef.current = { x, y };
        place();
      },
      hide() {
        setContent(null);
      },
    }));

    // The element mounts on the first show — position it before paint.
    useLayoutEffect(place, [content]);

    if (!content) return null;
    const data = getData(content.code);
    if (!data) return null;

    return (
      <div ref={elRef} className="map-data-tooltip" role="tooltip">
        <span className="map-data-tooltip__name">{content.name}</span>
        <span className="map-data-tooltip__measure">{data.measure}</span>
        {data.value == null && data.category == null ? (
          <span className="map-data-tooltip__empty">No data for this country</span>
        ) : (
          <span className="map-data-tooltip__row">
            {data.color && (
              <span
                className="map-data-tooltip__swatch"
                style={{ backgroundColor: data.color }}
                aria-hidden="true"
              />
            )}
            {data.category != null && (
              <span className="map-data-tooltip__category">{data.category}</span>
            )}
            {data.category != null && data.value != null && (
              <span aria-hidden="true">·</span>
            )}
            {data.value != null && (
              <span className="map-data-tooltip__value">{data.value}</span>
            )}
          </span>
        )}
        {data.year != null && (
          <span className="map-data-tooltip__year">Data from {data.year}</span>
        )}
      </div>
    );
  },
);
