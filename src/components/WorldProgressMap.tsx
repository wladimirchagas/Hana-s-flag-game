import { useEffect, useMemo, useRef, useState } from "react";
import { geoEqualEarth, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import countries from "i18n-iso-countries";
import { useTheme } from "../context/ThemeContext";
import { ALL_COUNTRY_OPTIONS } from "../lib/countrySelection";
import { useZoomPan, type ZoomPanState } from "../hooks/useZoomPan";

// Full UN-member name lookup, used so clicks on non-pool (out-of-this-game)
// countries can still display a friendly "Not in this game" popover with the
// real country name.
const ALL_UN_NAMES: ReadonlyMap<string, string> = new Map(
  ALL_COUNTRY_OPTIONS.map((c) => [c.code, c.name] as const),
);

type CountryResult = "correct" | "wrong";

type GeoFeature = {
  type: "Feature";
  id?: string | number;
  properties?: Record<string, unknown>;
  geometry: unknown;
};

type FeatureCollection = {
  type: "FeatureCollection";
  features: GeoFeature[];
};

type WorldTopo = {
  type: "Topology";
  objects: {
    countries: unknown;
  };
};

type Props = {
  countryResults: Record<string, CountryResult>;
  /** Currently selected (but not-yet-confirmed) country code. Drawn highlighted. */
  selectedCode?: string | null;
  /**
   * Optional set of codes to draw with the "selected" highlight regardless of
   * selectedCode. Used by Learn-mode spotlight grouping: clicking any one
   * Soviet republic highlights all 15 by passing the full member set here.
   */
  highlightCodes?: ReadonlySet<string> | null;
  /**
   * If provided, clicking a country in this set selects it and shows a confirm
   * popover next to the click. Pass a Map of code → display name so the popover
   * can show the country name. If omitted, the map is read-only (progress only).
   */
  selectable?: {
    codes: ReadonlySet<string>;
    names: ReadonlyMap<string, string>;
    onSelect: (code: string) => void;
    /**
     * When provided, clicks show a Confirm popover anchored at the click. When
     * omitted, clicks just call onSelect — used by the Learn-mode sandbox
     * where there's no "confirm a guess" action.
     */
    onConfirm?: () => void;
    /**
     * Optional hover callback for live preview (e.g. Learn mode highlighting
     * the country name without a click). Called with the country's alpha-2
     * code on enter and `null` on leave.
     */
    onHover?: (code: string | null) => void;
  };
  /** When true, click handlers are disabled even if `selectable` is provided. */
  disabled?: boolean;
  /** Optional externally-managed zoom state. When provided, lets the
   *  parent persist zoom across map swaps (e.g., Today ↔ historical map).
   *  When omitted, the component manages its own zoom state. */
  zoom?: ZoomPanState;
  /** User-chosen central meridian (longitude). 0 = Atlantic / Greenwich
   *  default; 180 = Pacific; -95 = Americas; etc. */
  centerLongitude?: number;
  /** When true, the rendered map is flipped vertically — south at the top. */
  southUp?: boolean;
  /** Optional extra controls to render below the +/-/⟲ zoom buttons. */
  extraControls?: React.ReactNode;
};

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const WIDTH = 960;
const HEIGHT = 500;

function toIsoAlpha2(id: string | number | undefined): string | null {
  if (id === undefined || id === null) return null;
  const numeric = String(id).replace(/\D/g, "");
  if (!numeric) return null;
  const padded = numeric.padStart(3, "0");
  const alpha2 =
    countries.numericToAlpha2(padded) ?? countries.numericToAlpha2(numeric);
  return alpha2 ? alpha2.toUpperCase() : null;
}

type MapPalette = {
  unknown: string;
  land: string;
  poolLand: string;
  correct: string;
  wrong: string;
  stroke: string;
  selectedStroke: string;
  selectedFill: string;
};

const LIGHT_PALETTE: MapPalette = {
  unknown: "#dbe7d6",
  land: "#e8ddc4",
  // Distinctive tint for countries that are part of the game pool but haven't
  // been guessed yet — so users in Custom Game can see at a glance which
  // countries are clickable for the current flag.
  poolLand: "#ffd7a8",
  correct: "#3fae5a",
  wrong: "#ff6b6b",
  stroke: "#1a2238",
  selectedStroke: "#1a2238",
  selectedFill: "#4ecdc4",
};

const DARK_PALETTE: MapPalette = {
  unknown: "#2a3358",
  land: "#3a4470",
  poolLand: "#6b4f8c",
  correct: "#5dd97a",
  wrong: "#ff8a8a",
  stroke: "#f4ecd8",
  selectedStroke: "#f4ecd8",
  selectedFill: "#74e4dc",
};

function getFill(
  alpha2: string | null,
  results: Record<string, CountryResult>,
  palette: MapPalette,
  isInPool: boolean,
): string {
  if (!alpha2) return palette.unknown;
  const result = results[alpha2];
  if (result === "correct") return palette.correct;
  if (result === "wrong") return palette.wrong;
  return isInPool ? palette.poolLand : palette.land;
}

type Popover = {
  code: string;
  name: string;
  /** Pixel coordinates relative to the map-frame container. */
  x: number;
  y: number;
  /** "confirm" shows the Confirm button (country is in the active pool).
   *  "info" shows just a "Not in this game" message (country is a UN member
   *  but isn't part of the current game's pool). */
  kind: "confirm" | "info";
  /** Whether the popover renders above or below the anchor point. We flip
   *  to "below" when there isn't room above so the popover never gets
   *  clipped at the top of the frame. */
  placement: "above" | "below";
};

export function WorldProgressMap({
  countryResults,
  selectedCode = null,
  highlightCodes = null,
  selectable,
  disabled = false,
  zoom: externalZoom,
  centerLongitude = 0,
  southUp = false,
  extraControls,
}: Props) {
  const { theme } = useTheme();
  const palette = theme === "dark" ? DARK_PALETTE : LIGHT_PALETTE;
  const [geographies, setGeographies] = useState<GeoFeature[]>([]);
  const [popover, setPopover] = useState<Popover | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  // See HistoricalMap for the same pattern — local hook always runs, but
  // the caller can pass a `zoom` to share state with a sibling map.
  const localZoom = useZoomPan(WIDTH, HEIGHT);
  const zoom = externalZoom ?? localZoom;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(GEO_URL);
        if (!res.ok) throw new Error("Failed to load world map");
        const topo = (await res.json()) as WorldTopo;
        const fc = feature(topo, topo.objects.countries) as FeatureCollection;
        if (!cancelled) setGeographies(fc.features);
      } catch {
        if (!cancelled) setGeographies([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const pathById = useMemo(() => {
    if (geographies.length === 0) return new Map<string, string>();
    // Centre on the user-chosen meridian. South-up is handled in SVG
    // (transform on outer <g>) — keeps the projection's antimeridian
    // splitting logic untouched.
    const projection = geoEqualEarth()
      .rotate([-centerLongitude, 0])
      .fitSize([WIDTH, HEIGHT], {
        type: "FeatureCollection",
        features: geographies,
      } as FeatureCollection);
    const mapPath = geoPath(projection);
    const paths = new Map<string, string>();
    for (const geo of geographies) {
      const path = mapPath(geo as never);
      if (!path) continue;
      paths.set(String(geo.id ?? ""), path);
    }
    return paths;
  }, [geographies, centerLongitude]);

  // Hide the popover when the parent clears the selection (e.g., new round
  // starts after a correct answer, or wrong-in-Custom clears the dropdown).
  useEffect(() => {
    if (!selectedCode) setPopover(null);
  }, [selectedCode]);

  // Also hide while the map is disabled (e.g. during the "revealed" phase).
  useEffect(() => {
    if (disabled) setPopover(null);
  }, [disabled]);

  const isInteractive = !!selectable && !disabled;

  function handlePathClick(e: React.MouseEvent<SVGPathElement>, alpha2: string) {
    if (!isInteractive || !selectable) return;
    const frameRect = frameRef.current?.getBoundingClientRect();
    if (!frameRect) return;

    // Anchor on the CLICK POINT instead of the path's bbox centre. The bbox
    // approach breaks for antimeridian-spanning countries (Russia, Fiji, US)
    // whose bbox spans nearly the entire map width with the geometric centre
    // landing in the middle of an ocean. The click point is always inside
    // the country the user actually pointed at.
    const clickX = e.clientX - frameRect.left;
    const clickY = e.clientY - frameRect.top;

    // Reserve enough room for the popover so it never clips off the frame
    // (these are upper-bound estimates of the rendered size).
    const HALF_W = 130;
    const HEIGHT = 64;
    const MARGIN = 8;

    // Clamp the horizontal anchor so the popover stays inside the frame.
    const x = Math.max(
      HALF_W + MARGIN,
      Math.min(frameRect.width - HALF_W - MARGIN, clickX),
    );

    // Prefer placing the popover above the click; flip to below when the
    // click is too close to the top edge of the frame.
    const placeAbove = clickY >= HEIGHT + MARGIN * 2;
    const y = placeAbove ? clickY - MARGIN : clickY + MARGIN;
    const placement: "above" | "below" = placeAbove ? "above" : "below";

    const isInPool = selectable.codes.has(alpha2);
    const name =
      selectable.names.get(alpha2) ?? ALL_UN_NAMES.get(alpha2) ?? alpha2;

    if (isInPool) {
      selectable.onSelect(alpha2);
      // Skip the popover entirely when no onConfirm is supplied — used by
      // the Learn-mode sandbox where clicks just select, no confirm.
      if (selectable.onConfirm) {
        setPopover({ code: alpha2, name, x, y, kind: "confirm", placement });
      }
    } else {
      // Country is rendered on the map but isn't part of this game's pool
      // (typical in Custom Game). Tell the user instead of silently failing.
      setPopover({ code: alpha2, name, x, y, kind: "info", placement });
    }
  }

  function handleConfirm() {
    if (!selectable?.onConfirm) return;
    selectable.onConfirm();
    setPopover(null);
  }

  // "Guess" wording only fits modes that expect a confirm; Learn mode passes
  // no onConfirm so we adjust the hint to talk about exploration instead.
  const interactiveHint = selectable?.onConfirm
    ? "— click a highlighted country to guess"
    : "— hover or click a country to see its flag";

  return (
    <section className="map-section" aria-labelledby="map-heading">
      <h2 id="map-heading" className="map-heading">
        World map
        {isInteractive && (
          <span className="map-heading__hint"> {interactiveHint}</span>
        )}
      </h2>
      <div className="map-with-zoom">
      <div className="map-frame" ref={frameRef}>
        <svg
          className="world-map"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label="World map showing correctly and incorrectly guessed countries"
          // Drag-to-pan is enabled (only effective when zoomed in — at
          // k=1 the pan clamp collapses to zero). Wheel-zoom and
          // double-click-reset stay off so the user can still
          // page-scroll over the map.
          onPointerDown={zoom.svgHandlers.onPointerDown}
          onPointerMove={zoom.svgHandlers.onPointerMove}
          onPointerUp={zoom.svgHandlers.onPointerUp}
          onPointerCancel={zoom.svgHandlers.onPointerCancel}
          style={{
            cursor: zoom.isZoomed ? "grab" : "default",
            touchAction: zoom.isZoomed ? "none" : "auto",
          }}
        >
          <g transform={zoom.transform}>
          {/* South-up flip happens inside the zoom group so flipping +
              zooming compose correctly. See HistoricalMap for details. */}
          <g
            transform={southUp ? `translate(0 ${HEIGHT}) scale(1 -1)` : undefined}
          >
          {geographies.map((geo, idx) => {
            const key = String(geo.id ?? idx);
            const path = pathById.get(String(geo.id ?? ""));
            if (!path) return null;
            const alpha2 = toIsoAlpha2(geo.id);
            const isInPool =
              !!alpha2 && !!selectable && selectable.codes.has(alpha2);
            // Every UN-member country is clickable (in interactive mode). Pool
            // members open the Confirm popover; non-pool members open the
            // informational "Not in this game" popover instead of silently
            // doing nothing.
            const isUnMember = !!alpha2 && ALL_UN_NAMES.has(alpha2);
            const clickable = isInteractive && isUnMember;
            const isSelected =
              !!alpha2 &&
              (alpha2 === selectedCode || !!highlightCodes?.has(alpha2));
            const baseFill = getFill(
              alpha2,
              countryResults,
              palette,
              isInPool,
            );
            const tooltip =
              alpha2
                ? selectable?.names.get(alpha2) ??
                  ALL_UN_NAMES.get(alpha2) ??
                  null
                : null;
            return (
              <path
                key={key}
                d={path}
                fill={isSelected ? palette.selectedFill : baseFill}
                stroke={isSelected ? palette.selectedStroke : palette.stroke}
                strokeWidth={isSelected ? 1.4 : 0.45}
                strokeOpacity={isSelected ? 1 : 0.55}
                // Keep borders the same visual width regardless of zoom —
                // without this they thicken as the user zooms in.
                vectorEffect="non-scaling-stroke"
                className={
                  clickable
                    ? "world-map__country world-map__country--selectable"
                    : "world-map__country"
                }
                onClick={
                  clickable && alpha2
                    ? (e) => handlePathClick(e, alpha2)
                    : undefined
                }
                onMouseEnter={
                  clickable && alpha2 && selectable?.onHover
                    ? () => selectable.onHover!(alpha2)
                    : undefined
                }
                onMouseLeave={
                  clickable && selectable?.onHover
                    ? () => selectable.onHover!(null)
                    : undefined
                }
              >
                {tooltip ? <title>{tooltip}</title> : null}
              </path>
            );
          })}
          </g>
          </g>
        </svg>
        {popover && isInteractive && (
          <div
            className={`map-popover map-popover--${popover.kind} map-popover--${popover.placement}`}
            style={{ left: `${popover.x}px`, top: `${popover.y}px` }}
            role="dialog"
            aria-label={
              popover.kind === "confirm"
                ? `Confirm guess: ${popover.name}`
                : `${popover.name}: not part of this game`
            }
          >
            <span className="map-popover__name">{popover.name}</span>
            {popover.kind === "confirm" ? (
              <button
                type="button"
                className="map-popover__confirm"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            ) : (
              <span className="map-popover__hint">Not in this game</span>
            )}
            <button
              type="button"
              className="map-popover__close"
              onClick={() => setPopover(null)}
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        )}
      </div>
        <div className="world-map__zoom-controls">
          <button
            type="button"
            className="world-map__zoom-btn"
            onClick={zoom.zoomIn}
            disabled={!zoom.canZoomIn}
            aria-label="Zoom in"
            title="Zoom in"
          >
            +
          </button>
          <button
            type="button"
            className="world-map__zoom-btn"
            onClick={zoom.zoomOut}
            disabled={!zoom.canZoomOut}
            aria-label="Zoom out"
            title="Zoom out"
          >
            −
          </button>
          <button
            type="button"
            className="world-map__zoom-btn"
            onClick={zoom.reset}
            disabled={!zoom.isZoomed}
            aria-label="Reset zoom"
            title="Reset zoom"
          >
            ⟲
          </button>
          {extraControls}
        </div>
      </div>
    </section>
  );
}
