import { useEffect, useId, useMemo, useRef, useState } from "react";
import { geoEqualEarth, geoPath } from "d3-geo";
import { useTheme } from "../context/ThemeContext";
import { useZoomPan, type ZoomPanState } from "../hooks/useZoomPan";

/**
 * Renders an era-specific historical world map.
 *
 * Unlike WorldProgressMap (which always uses the modern world-atlas
 * TopoJSON), this component loads a GeoJSON FeatureCollection from the
 * hand-curated aourednik/historical-basemaps dataset. Each feature is an
 * actual historical polity with its borders as they were at the chosen
 * date — Roman Empire including Roman Britain, Mongol Empire as one
 * contiguous shape, etc.
 *
 * Selection is keyed by the feature's `NAME` property (not ISO codes).
 * Hovering a polity reports its name; clicking it selects it. Multiple
 * polygons that share a NAME (e.g., an empire with detached territories)
 * all highlight together when any one is selected.
 */

type HistoricalFeature = {
  type: "Feature";
  properties: {
    NAME?: string | null;
    SUBJECTO?: string | null;
    PARTOF?: string | null;
    BORDERPRECISION?: number | null;
  };
  geometry: unknown;
};

type FeatureCollection = {
  type: "FeatureCollection";
  features: HistoricalFeature[];
};

export type HistoricalMapProps = {
  /** URL of the era's GeoJSON file (relative to BASE_URL). */
  geoJsonUrl: string;
  /** Currently selected polity name (null = nothing selected). */
  selectedName: string | null;
  /** Optional hovered polity name for transient highlight. */
  hoveredName?: string | null;
  /** Click handler — fires with the polity's NAME (or null if unnamed). */
  onSelect?: (name: string | null) => void;
  /** Hover handler — fires with name on enter, null on leave. */
  onHover?: (name: string | null) => void;
  /** Optional externally-managed zoom state. When provided, lets the
   *  parent persist zoom across era switches (the parent owns the hook).
   *  When omitted, the component manages its own zoom state. */
  zoom?: ZoomPanState;
  /** Fires once after the era's GeoJSON has loaded, with the set of
   *  feature NAMEs the file contains. Used by the parent to decide
   *  whether a currently-selected entity still exists in this era. */
  onDataLoaded?: (names: ReadonlySet<string>) => void;
  /** User-chosen central meridian (longitude). 0 = Atlantic / Greenwich
   *  default; 180 = Pacific; -95 = Americas; etc. */
  centerLongitude?: number;
  /** Accumulated rotation offset from the globe-spin animation, in degrees.
   *  Applied as an SVG translate so path strings don't need to be recomputed
   *  on every animation tick — only centerLongitude changes trigger a reprojection. */
  rotationOffset?: number;
  /** When true, the rendered map is flipped vertically — south at the top. */
  southUp?: boolean;
  /** Optional extra controls to render below the +/-/⟲ zoom buttons,
   *  e.g. the MapViewControl picker. */
  extraControls?: React.ReactNode;
};

const WIDTH = 960;
const HEIGHT = 500;

type Palette = {
  land: string;
  selected: string;
  selectedStroke: string;
  stroke: string;
  unknown: string;
};

const LIGHT_PALETTE: Palette = {
  land: "#ffd7a8",
  selected: "#4ecdc4",
  selectedStroke: "#1a2238",
  stroke: "#1a2238",
  unknown: "#e8ddc4",
};

const DARK_PALETTE: Palette = {
  land: "#6b4f8c",
  selected: "#74e4dc",
  selectedStroke: "#f4ecd8",
  stroke: "#f4ecd8",
  unknown: "#3a4470",
};

export function HistoricalMap({
  geoJsonUrl,
  selectedName,
  hoveredName = null,
  onSelect,
  onHover,
  zoom: externalZoom,
  onDataLoaded,
  centerLongitude = 0,
  rotationOffset = 0,
  southUp = false,
  extraControls,
}: HistoricalMapProps) {
  const { theme } = useTheme();
  const palette = theme === "dark" ? DARK_PALETTE : LIGHT_PALETTE;
  const clipId = useId();
  const [data, setData] = useState<FeatureCollection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  // Always run the local hook so we obey the rules-of-hooks. When the
  // parent provides a zoom state, that one wins and the local one is
  // unused — the parent typically does this so zoom can be shared with
  // a sibling map component and survive a swap between the two.
  const localZoom = useZoomPan(WIDTH, HEIGHT);
  const zoom = externalZoom ?? localZoom;

  // Load the era's GeoJSON whenever the URL changes.
  useEffect(() => {
    let cancelled = false;
    setData(null);
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const res = await fetch(geoJsonUrl);
        if (!res.ok) throw new Error(`Failed to load ${geoJsonUrl}`);
        const json = (await res.json()) as FeatureCollection;
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Unknown error");
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [geoJsonUrl]);

  // Notify the parent whenever new data lands, with the set of feature
  // NAMEs in this era. Lets the parent decide if a currently-selected
  // entity still exists in the new era (used by LearnPage to keep the
  // selection alive across era switches).
  useEffect(() => {
    if (!data || !onDataLoaded) return;
    const names = new Set<string>();
    for (const ft of data.features) {
      const n = ft.properties?.NAME;
      if (n) names.add(n);
    }
    onDataLoaded(names);
  }, [data, onDataLoaded]);

  // Compute per-feature path strings via d3-geo's equal-earth projection
  // (same as WorldProgressMap so the two maps look like the same world).
  //
  // IMPORTANT: rotationOffset is intentionally NOT in the deps array. Paths
  // are computed at the user's chosen centerLongitude (base meridian), which
  // changes rarely. The rotation animation is applied as a cheap SVG translate
  // below so this expensive computation doesn't run on every animation tick.
  const { renderedFeatures, spherePath, pixelsPerDegree } = useMemo(() => {
    if (!data || data.features.length === 0) {
      return { renderedFeatures: [], spherePath: null, pixelsPerDegree: WIDTH / 360 };
    }
    // Centre the projection on the user-chosen meridian. d3-geo's rotate
    // is [lambda, phi, gamma]; we only touch lambda. South-up is handled
    // separately as an SVG transform so the projection's geometry stays
    // canonical (less risk of fitSize / antimeridian-splitting bugs).
    // Fit to the sphere so the sphere outline exactly fills the viewBox —
    // fitting to the data geometry leaves the sphere wider than the viewBox,
    // causing SVG clipping at the left/right edges.
    const projection = geoEqualEarth()
      .rotate([-centerLongitude, 0])
      .fitSize([WIDTH, HEIGHT], { type: "Sphere" } as never);
    const pathFn = geoPath(projection);
    const features = data.features.map((f, idx) => {
      const d = pathFn(f as never);
      const name = f.properties?.NAME ?? null;
      return { idx, d, name };
    });
    const spherePath = pathFn({ type: "Sphere" } as never) ?? null;

    // Pixels per degree at the equator — used to convert rotationOffset into
    // an SVG translateX. Equal-earth is linear in longitude at φ=0, so this
    // is exact there and a good approximation at other latitudes.
    const p0 = projection([centerLongitude, 0]);
    const p1 = projection([centerLongitude + 1, 0]);
    const pxPerDeg =
      p0 && p1 && Math.abs(p1[0] - p0[0]) > 0
        ? Math.abs(p1[0] - p0[0])
        : WIDTH / 360;

    return { renderedFeatures: features, spherePath, pixelsPerDegree: pxPerDeg };
  }, [data, centerLongitude]);

  // Compute the "highlight" set: every feature whose NAME matches the
  // hovered or selected name gets the highlight colour. A single empire
  // often spans many separate polygons (overseas territories, archipelagos)
  // and they all light up together.
  const highlightName = hoveredName ?? selectedName;

  // Rotation applied as a horizontal SVG translate so path strings stay
  // cached at centerLongitude and don’t need recomputing on each tick.
  // Three copies of the features group (shifted by ±totalWidth) ensure
  // continuous coverage across the antimeridian as the globe spins.
  const totalWidth = pixelsPerDegree * 360;
  const rotationTx = -(rotationOffset * pixelsPerDegree);
  const featureCopyOffsets = [-totalWidth, 0, totalWidth] as const;

  function renderFeaturePaths(copyOffset: number) {
    return renderedFeatures.map((f) => {
      if (!f.d) return null;
      const isHighlighted = f.name != null && f.name === highlightName;
      const fill = isHighlighted
        ? palette.selected
        : f.name
        ? palette.land
        : palette.unknown;
      const stroke = isHighlighted ? palette.selectedStroke : palette.stroke;
      return (
        <path
          key={`${copyOffset}-${f.idx}`}
          d={f.d}
          fill={fill}
          stroke={stroke}
          strokeWidth={isHighlighted ? 1.4 : 0.4}
          strokeOpacity={isHighlighted ? 1 : 0.5}
          vectorEffect="non-scaling-stroke"
          className="world-map__country world-map__country--selectable"
          onClick={() => onSelect?.(f.name)}
          onMouseEnter={() => onHover?.(f.name)}
          onMouseLeave={() => onHover?.(null)}
        >
          {f.name ? <title>{f.name}</title> : null}
        </path>
      );
    });
  }

  return (
    <section className="map-section" aria-labelledby="map-heading">
      <h2 id="map-heading" className="map-heading">
        World map
        <span className="map-heading__hint">
          {" "}— hover or click a polity to see its name and flag
        </span>
      </h2>
      <div className="map-with-zoom">
      <div className="map-frame" ref={frameRef}>
        {loading && (
          <p className="hist-map__loading">Loading historical map…</p>
        )}
        {error && (
          <p className="hist-map__error">
            Couldn’t load the map for this era ({error}).
          </p>
        )}
        {!loading && !error && (
          <svg
            className="world-map"
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            role="img"
            aria-label="Historical world map for the selected era"
            // Drag-to-pan is enabled (effective only once zoomed in).
            // Wheel-zoom and double-click-reset stay off so the user
            // can still page-scroll over the map.
            onPointerDown={zoom.svgHandlers.onPointerDown}
            onPointerMove={zoom.svgHandlers.onPointerMove}
            onPointerUp={zoom.svgHandlers.onPointerUp}
            onPointerCancel={zoom.svgHandlers.onPointerCancel}
            style={{
              cursor: zoom.isZoomed ? "grab" : "default",
              touchAction: zoom.isZoomed ? "none" : "auto",
            }}
          >
            {spherePath && (
              <defs>
                <clipPath id={clipId}>
                  <path d={spherePath} />
                </clipPath>
              </defs>
            )}
            <g transform={zoom.transform}>
            {/* South-up wrapper: SVG transforms compose left-to-right, so
                `translate(0 H) scale(1 -1)` applied INSIDE zoom flips the
                geometry vertically (south at top) while keeping it
                inside the viewBox and preserving the zoom anchor. */}
            <g
              transform={southUp ? `translate(0 ${HEIGHT}) scale(1 -1)` : undefined}
            >
            {/* Sphere outline drawn once, outside the rotation group */}
            {spherePath && (
              <path
                d={spherePath}
                fill="none"
                stroke={palette.stroke}
                strokeWidth={0.4}
                strokeOpacity={0.5}
                vectorEffect="non-scaling-stroke"
              />
            )}
            {/* Three shifted copies of the feature paths so the map wraps
                seamlessly as the globe rotates past the antimeridian.
                The sphere clipPath hides anything outside the oval boundary. */}
            <g clipPath={spherePath ? `url(#${clipId})` : undefined}>
              {featureCopyOffsets.map((offset) => (
                <g
                  key={offset}
                  transform={`translate(${rotationTx + offset}, 0)`}
                >
                  {renderFeaturePaths(offset)}
                </g>
              ))}
            </g>
            </g>
            </g>
          </svg>
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
