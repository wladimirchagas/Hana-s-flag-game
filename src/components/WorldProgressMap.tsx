import { useEffect, useMemo, useRef, useState } from "react";
import { geoEqualEarth, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import countries from "i18n-iso-countries";
import { useTheme } from "../context/ThemeContext";
import { ALL_COUNTRY_OPTIONS } from "../lib/countrySelection";
import { useZoomPan, type ZoomPanState } from "../hooks/useZoomPan";

// Countries whose land area is ≤ Denmark (~43,094 km²).  These get the
// pulsing indicator when selected so they're easy to locate on the map.
const SMALL_NATION_CODES = new Set([
  // Micro-states / city-states
  "VA", "MC", "NR", "TV", "SM", "LI", "MH", "KN", "MT", "MV",
  "GD", "VC", "BB", "AG", "SC", "PW", "AD",
  // Small island & coastal nations
  "LC", "DM", "FM", "SG", "TO", "KI", "BH", "ST", "KM", "MU",
  "WS", "CV", "TT", "BN", "CY", "LB", "JM", "GM", "QA", "VU",
  "BS", "ME", "TL", "SZ", "KW", "FJ",
  // Small mainland nations
  "SI", "IL", "SV", "BZ", "DJ", "MK", "RW", "HT", "BI", "GQ",
  "AL", "SB", "AM", "LS", "BE", "MD", "GW", "BT", "CH", "NL", "DK",
]);

// Geographic [longitude, latitude] for nations too small to appear in the
// 110m world-atlas dataset.  Injected into centroidByAlpha2 at render time
// so the pulse indicator still shows even with no rendered polygon.
const MICRO_STATE_COORDS: Record<string, [number, number]> = {
  VA: [ 12.45,  41.90], // Vatican City
  MC: [  7.40,  43.73], // Monaco
  SM: [ 12.45,  43.93], // San Marino
  LI: [  9.55,  47.17], // Liechtenstein
  AD: [  1.60,  42.55], // Andorra
  MT: [ 14.37,  35.94], // Malta
  NR: [166.93,  -0.52], // Nauru
  TV: [179.19,  -8.52], // Tuvalu (Funafuti)
  MH: [171.18,   7.13], // Marshall Islands
  KI: [172.98,   1.33], // Kiribati (Tarawa)
  FM: [158.19,   6.92], // Micronesia
  PW: [134.58,   7.52], // Palau
  TO: [-175.20, -21.18], // Tonga
  WS: [-172.10, -13.76], // Samoa
  KN: [-62.78,  17.35], // Saint Kitts and Nevis
  AG: [-61.80,  17.06], // Antigua and Barbuda
  DM: [-61.37,  15.41], // Dominica
  LC: [-60.98,  13.91], // Saint Lucia
  VC: [-61.29,  12.98], // Saint Vincent and the Grenadines
  BB: [-59.54,  13.19], // Barbados
  GD: [-61.68,  12.11], // Grenada
  MV: [ 73.22,   3.20], // Maldives
  SC: [ 55.49,  -4.68], // Seychelles
  KM: [ 43.87, -11.88], // Comoros
  MU: [ 57.55, -20.27], // Mauritius
  ST: [  6.73,   0.34], // São Tomé and Príncipe
  CV: [-23.61,  14.93], // Cape Verde
};

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
  /** When true, each country's flag fills its territory on the map. */
  showFlagOverlay?: boolean;
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
  showFlagOverlay = false,
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

  const { pathById, spherePath, centroidByAlpha2, boundsById } = useMemo(() => {
    const empty = {
      pathById: new Map<string, string>(),
      spherePath: null,
      centroidByAlpha2: new Map<string, [number, number]>(),
      boundsById: new Map<string, { x: number; y: number; w: number; h: number }>(),
    };
    if (geographies.length === 0) return empty;
    // Fit to the sphere (not just the countries) so the sphere outline
    // exactly fills the viewBox — fitting to countries leaves the sphere
    // slightly wider than the viewBox, causing SVG clipping at the edges.
    const projection = geoEqualEarth()
      .rotate([-centerLongitude, 0])
      .fitSize([WIDTH, HEIGHT], { type: "Sphere" } as never);
    const mapPath = geoPath(projection);
    const paths = new Map<string, string>();
    const centroidByAlpha2 = new Map<string, [number, number]>();
    const boundsById = new Map<string, { x: number; y: number; w: number; h: number }>();

    for (const geo of geographies) {
      const path = mapPath(geo as never);
      if (path) paths.set(String(geo.id ?? ""), path);

      const alpha2 = toIsoAlpha2(geo.id);
      if (alpha2) {
        // Centroid in SVG viewBox coordinates (after projection).
        const c = mapPath.centroid(geo as never);
        if (c && isFinite(c[0]) && isFinite(c[1])) {
          centroidByAlpha2.set(alpha2, [c[0], c[1]]);
        }
        // Bounding box for flag overlay images.
        const b = mapPath.bounds(geo as never);
        if (b && isFinite(b[0][0]) && isFinite(b[1][0])) {
          const [x0, y0] = b[0];
          const [x1, y1] = b[1];
          if (x1 > x0 && y1 > y0) {
            boundsById.set(alpha2, { x: x0, y: y0, w: x1 - x0, h: y1 - y0 });
          }
        }
      }
    }

    // Inject fallback centroids for micro-states absent from the 110m dataset.
    for (const [code, lonLat] of Object.entries(MICRO_STATE_COORDS)) {
      if (!centroidByAlpha2.has(code)) {
        const pt = projection(lonLat as [number, number]);
        if (pt && isFinite(pt[0]) && isFinite(pt[1])) {
          centroidByAlpha2.set(code, [pt[0], pt[1]]);
        }
      }
    }

    const spherePath = mapPath({ type: "Sphere" } as never) ?? null;
    return { pathById: paths, spherePath, centroidByAlpha2, boundsById };
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

  // Pulsing ring indicator — shown for micro-nations that are hard to
  // spot at the default zoom level.  Rendered OUTSIDE the zoom <g> so
  // the ring's visual size is constant regardless of zoom, but positioned
  // using the live zoom transform so it tracks the country on screen.
  const selCentroid = selectedCode ? centroidByAlpha2.get(selectedCode) : null;
  // Show pulse for all countries with area ≤ Denmark (~43,094 km²).
  const showPulse = !!(selCentroid && selectedCode && SMALL_NATION_CODES.has(selectedCode));
  const { k: zk, tx: ztx, ty: zty } = zoom.view;
  const pulseX = selCentroid
    ? selCentroid[0] * zk + ztx
    : 0;
  const pulseY = selCentroid
    ? (southUp ? HEIGHT - selCentroid[1] : selCentroid[1]) * zk + zty
    : 0;
  // Clip to a generous margin around the viewBox so the ring never
  // renders in dead space when the user has panned the country off-screen.
  const PULSE_MARGIN = 30;
  const pulseVisible =
    showPulse &&
    pulseX > -PULSE_MARGIN && pulseX < WIDTH  + PULSE_MARGIN &&
    pulseY > -PULSE_MARGIN && pulseY < HEIGHT + PULSE_MARGIN;

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
          {spherePath && (
            <path
              d={spherePath}
              fill="none"
              stroke={palette.stroke}
              strokeWidth={0.45}
              strokeOpacity={0.55}
              vectorEffect="non-scaling-stroke"
            />
          )}
          {showFlagOverlay && (
            <defs>
              {geographies.map((geo) => {
                const alpha2 = toIsoAlpha2(geo.id);
                const path = pathById.get(String(geo.id ?? ""));
                if (!alpha2 || !path) return null;
                return (
                  <clipPath key={`fcp-${alpha2}`} id={`wm-fcp-${alpha2}`}>
                    <path d={path} />
                  </clipPath>
                );
              })}
            </defs>
          )}
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
          {showFlagOverlay && geographies.map((geo) => {
            const alpha2 = toIsoAlpha2(geo.id);
            if (!alpha2) return null;
            const b = boundsById.get(alpha2);
            if (!b) return null;
            const isSelected =
              alpha2 === selectedCode || !!highlightCodes?.has(alpha2);
            return (
              <image
                key={`fimg-${alpha2}`}
                href={`https://flagcdn.com/w320/${alpha2.toLowerCase()}.svg`}
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                clipPath={`url(#wm-fcp-${alpha2})`}
                preserveAspectRatio="xMidYMid slice"
                opacity={isSelected ? 0.35 : 1}
                style={{ pointerEvents: "none" }}
              />
            );
          })}
          </g>
          </g>
          {/* Pulse indicator — outside the zoom group so its pixel size
              stays constant, but positioned using the zoom transform. */}
          {pulseVisible && (
            <g
              transform={`translate(${pulseX.toFixed(1)} ${pulseY.toFixed(1)})`}
              aria-hidden="true"
            >
              <circle r={7} className="map-country-pulse__ring" />
              <circle r={7} className="map-country-pulse__ring map-country-pulse__ring--2" />
              <circle r={3.5} className="map-country-pulse__dot" />
            </g>
          )}
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
