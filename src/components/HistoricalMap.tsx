import { memo, useEffect, useMemo, useRef, useState } from "react";
import { geoEqualEarth, geoPath } from "d3-geo";
import { merge as topoMerge } from "topojson-client";
import { useTheme } from "../context/ThemeContext";
import { useZoomPan, type ZoomPanState } from "../hooks/useZoomPan";
import { flagOverlayAspectRatio } from "../lib/flagOverlayAspectRatio";
import { polityDisplayName } from "../lib/historicalEras";

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
 *
 * Performance note: the historical GeoJSON files are large (1–14 MB).
 * Path computation is expensive, so this component is memoised and its
 * centerLongitude prop intentionally excludes the rotation animation
 * offset — only the user's chosen base meridian is used. That keeps path
 * recomputation to a minimum (only on data load or explicit preset change)
 * while the modern globe spins freely next to it.
 */

type HistoricalFeature = {
  type: "Feature";
  properties: {
    NAME?: string | null;
    SUBJECTO?: string | null;
    PARTOF?: string | null;
    BORDERPRECISION?: number | null;
    /** 1 when this feature's internal boundary was DERIVED by intersecting the
     *  upstream lumped polygon with modern admin-1 lines (see
     *  scripts/tag-derived-boundaries.mjs) rather than sourced for the period. */
    DERIVED?: number | null;
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
  /** Fires once after the era's GeoJSON has loaded, with the set of feature NAMEs
   *  the file contains and a NAME → SUBJECTO map of ruling powers (only where the
   *  two differ). The names let the parent decide whether a currently-selected
   *  entity still exists in this era; the rulers drive the panel's "Ruled by" row
   *  and let a colony inherit its ruler's period-correct flag. */
  onDataLoaded?: (
    names: ReadonlySet<string>,
    rulers: ReadonlyMap<string, string>,
    derived: ReadonlySet<string>,
  ) => void;
  /** User-chosen central meridian (longitude). 0 = Atlantic / Greenwich
   *  default; 180 = Pacific; -95 = Americas; etc.
   *  NOTE: this should be the BASE meridian only (not including any
   *  rotation animation offset) so that path recomputation stays cheap. */
  centerLongitude?: number;
  /** When true, the rendered map is flipped vertically — south at the top. */
  southUp?: boolean;
  /** Optional extra controls to render below the +/-/⟲ zoom buttons,
   *  e.g. the MapViewControl picker. */
  extraControls?: React.ReactNode;
  /**
   * When provided, each polity whose name is a key in this map will have
   * its flag image (the map value — an absolute URL) rendered filling its
   * territory. Polities absent from the map are shown without a flag overlay.
   */
  flagOverlay?: ReadonlyMap<string, string> | null;
};

const WIDTH = 960;
const HEIGHT = 500;

/**
 * The coastline, drawn UNDER every era's polities.
 *
 * Borders between polities change between eras; a landmass's outline does not. The
 * era files only carry POLITIES, and large regions were genuinely unclaimed at many
 * dates — so without a base layer, land no polity covers is painted with nothing and
 * reads as open ocean. That shipped and was reported (2026-08): in 500 BC the Balkans
 * north of the Greek city-states carried no polity, so GREECE APPEARED TO BE AN
 * ISLAND. The same hole put the Indus basin, interior India, Chukotka and Novaya
 * Zemlya out to sea in other eras.
 *
 * Drawing the land from ONE basemap for ALL eras makes the invariant structural
 * rather than merely checked: the coastline is the same object every era renders on
 * top of, so it cannot vary by period however the era files change. This is the same
 * Natural Earth 50m topology WorldProgressMap draws, so the two maps can never
 * disagree about where the coast is.
 *
 * It is decorative and non-interactive — it must never intercept a click meant for a
 * polity above it (the same rule the city-marker overlay follows).
 */
const LAND_URL = `${import.meta.env.BASE_URL}countries-50m.json`;

/** The merged coastline: one MultiPolygon covering every landmass. */
type LandGeometry = { type: "MultiPolygon"; coordinates: number[][][][] };

type Palette = {
  ocean: string;
  land: string;
  selected: string;
  selectedStroke: string;
  stroke: string;
  unknown: string;
};

const LIGHT_PALETTE: Palette = {
  ocean: "#b8d4e4",
  land: "#ffd7a8",
  selected: "#4ecdc4",
  selectedStroke: "#1a2238",
  stroke: "#1a2238",
  unknown: "#e8ddc4",
};

const DARK_PALETTE: Palette = {
  ocean: "#1a2d4a",
  land: "#6b4f8c",
  selected: "#74e4dc",
  selectedStroke: "#f4ecd8",
  stroke: "#f4ecd8",
  unknown: "#3a4470",
};

export const HistoricalMap = memo(function HistoricalMap({
  geoJsonUrl,
  selectedName,
  hoveredName = null,
  onSelect,
  onHover,
  zoom: externalZoom,
  onDataLoaded,
  centerLongitude = 0,
  southUp = false,
  extraControls,
  flagOverlay = null,
}: HistoricalMapProps) {
  const { theme } = useTheme();
  const palette = theme === "dark" ? DARK_PALETTE : LIGHT_PALETTE;
  const [data, setData] = useState<FeatureCollection | null>(null);
  // Every country merged into one land geometry — merging drops the modern internal
  // borders, which must never show through beneath a historical map.
  const [land, setLand] = useState<LandGeometry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  // Always run the local hook so we obey the rules-of-hooks. When the
  // parent provides a zoom state, that one wins and the local one is
  // unused — the parent typically does this so zoom can be shared with
  // a sibling map component and survive a swap between the two.
  const localZoom = useZoomPan(WIDTH, HEIGHT);
  const zoom = externalZoom ?? localZoom;

  // Load the coastline once. It is era-independent by definition, so it is fetched
  // outside the era effect and never refetched when the era changes. A failure here
  // is not fatal: the era's polities still render, exactly as before this layer.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(LAND_URL);
        if (!res.ok) throw new Error(`Failed to load ${LAND_URL}`);
        const topo = await res.json();
        const merged = topoMerge(topo, topo.objects.countries.geometries) as LandGeometry;
        if (!cancelled) setLand(merged);
      } catch {
        if (!cancelled) setLand(null);
      }
    })();
    return () => { cancelled = true; };
  }, []);

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
    const rulers = new Map<string, string>();
    const derived = new Set<string>();
    for (const ft of data.features) {
      const n = ft.properties?.NAME;
      if (!n) continue;
      names.add(n);
      const ruler = ft.properties?.SUBJECTO;
      if (ruler && ruler !== n) rulers.set(n, ruler);
      if (ft.properties?.DERIVED === 1) derived.add(n);
    }
    onDataLoaded(names, rulers, derived);
  }, [data, onDataLoaded]);

  // Compute per-feature path strings via d3-geo's equal-earth projection
  // (same as WorldProgressMap so the two maps look like the same world).
  const { renderedFeatures, spherePath, landPath } = useMemo(() => {
    if (!data || data.features.length === 0)
      return { renderedFeatures: [], spherePath: null, landPath: null };
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
    // `h` is the pattern tile height (the ring's bbox height). The tile WIDTH is
    // derived per-flag at render time from the flag's true aspect ratio
    // (flagOverlayAspectRatio) so the tile matches the flag's proportions and
    // `preserveAspectRatio="…meet"` fills it with no letterbox gap — letting the
    // tiling cover the whole landmass, exactly like WorldProgressMap.
    type FlagPoly = { path: string; x: number; y: number; h: number };
    const features = data.features.map((f, idx) => {
      const d = pathFn(f as never);
      const name = f.properties?.NAME ?? null;
      // Decompose geometry into individual polygons so each non-contiguous
      // piece gets a flag image sized to its own bounding box.
      const flagPolys: FlagPoly[] = [];
      const geom = f.geometry as { type: string; coordinates: unknown } | null;
      if (geom) {
        const rings: unknown[] =
          geom.type === "Polygon"
            ? [geom.coordinates]
            : geom.type === "MultiPolygon"
              ? (geom.coordinates as unknown[])
              : [];
        for (const coords of rings) {
          const pf = { type: "Feature", properties: {}, geometry: { type: "Polygon", coordinates: coords } };
          const pd = pathFn(pf as never);
          if (!pd) continue;
          const b = pathFn.bounds(pf as never);
          if (b && isFinite(b[0][0]) && isFinite(b[1][0]) && b[1][0] > b[0][0] && b[1][1] > b[0][1]) {
            flagPolys.push({ path: pd, x: b[0][0], y: b[0][1], h: b[1][1] - b[0][1] });
          }
        }
      }
      return {
        idx,
        d,
        name,
        flagPolys,
        area: pathFn.area(f as never),
        derived: f.properties?.DERIVED === 1,
      };
    });
    // Paint LARGEST FIRST so a small polity that sits inside a bigger one is
    // never buried underneath it. SVG has no z-index — later siblings paint on
    // top — so file order used to decide clickability, and a handful of
    // polities were unreachable: the Bahmani Kingdom sat under Golkonda (1500),
    // Hohenzollern under Württemberg and Brunswick under Hanover (1815).
    // Sorting by projected area makes containment order and paint order agree.
    features.sort((a, b) => b.area - a.area);
    const spherePath = pathFn({ type: "Sphere" } as never) ?? null;
    const landPath = land ? (pathFn(land as never) ?? null) : null;
    return { renderedFeatures: features, spherePath, landPath };
  }, [data, centerLongitude, land]);

  // Upstream rates every feature's border accuracy 1 (roughest) to 3. For the older
  // eras it is 1 across the board — the authors telling us these lines are schematic.
  // Rendering them as crisp borders at up to 24× zoom implies a precision the data does
  // not have, so the map says so out loud.
  const bordersApproximate = useMemo(() => {
    if (!data) return false;
    let low = 0;
    let known = 0;
    for (const f of data.features) {
      const p = f.properties?.BORDERPRECISION;
      if (typeof p !== "number") continue;
      known++;
      if (p <= 1) low++;
    }
    return known > 0 && low / known > 0.5;
  }, [data]);

  // Compute the "highlight" set: every feature whose NAME matches the
  // hovered or selected name gets the highlight colour. A single empire
  // often spans many separate polygons (overseas territories, archipelagos)
  // and they all light up together.
  const highlightName = hoveredName ?? selectedName;

  return (
    <section className="map-section" aria-labelledby="map-heading">
      <h2 id="map-heading" className="map-heading">
        World map
        <span className="map-heading__hint">
          {" "}— hover or click a polity to see its name and flag
          {bordersApproximate && (
            <>
              {" · "}
              <span className="map-heading__caveat">
                borders are approximate for this date
              </span>
            </>
          )}
        </span>
      </h2>
      <div className="map-with-zoom">
      <div className="map-frame" ref={frameRef}>
        {loading && (
          <p className="hist-map__loading">Loading historical map…</p>
        )}
        {error && (
          <p className="hist-map__error">
            Couldn't load the map for this era ({error}).
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
            {/* Flag pattern tiles at SVG root — same approach as
                WorldProgressMap (see FlagDefs there). Each landmass ring is
                painted with a <pattern> whose tile is sized to the flag's TRUE
                aspect ratio, so `preserveAspectRatio="…meet"` fills the tile
                exactly and the seamless tiling covers the whole landmass with no
                letterbox gap, no distortion and no cropping. This replaces the
                old single <image preserveAspectRatio="…slice"> + clipPath, whose
                "slice" was silently ignored for bundled SVG flags that carry
                their own preserveAspectRatio — leaving country edges uncovered.
                patternUnits="userSpaceOnUse" keeps x/y in the referencing
                element's coordinate system (Safari transform/zoom/flip bug). */}
            <defs>
              {/* Land the dataset records no polity for. Hatching keeps it visibly
                  distinct from a real polity, which a flat fill did not — 17–34% of
                  the land in the older eras is unmapped, and painting it like a
                  country implied data we do not have. */}
              <pattern
                id="hm-nodata"
                width={6}
                height={6}
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <rect width={6} height={6} fill={palette.unknown} />
                <line x1={0} y1={0} x2={0} y2={6} stroke={palette.stroke} strokeWidth={0.6} strokeOpacity={0.25} />
              </pattern>
            </defs>
            {flagOverlay && (
              <defs>
                {renderedFeatures.map((f) => {
                  if (!f.name) return null;
                  if (!flagOverlay.has(f.name)) return null;
                  const flagUrl = flagOverlay.get(f.name)!;
                  const ratio = flagOverlayAspectRatio(flagUrl);
                  return f.flagPolys.map((poly, i) => {
                    const tileW = poly.h * ratio;
                    return (
                      <pattern
                        key={`hm-fp-${f.idx}-${i}`}
                        id={`hm-fp-${f.idx}-${i}`}
                        x={poly.x}
                        y={poly.y}
                        width={tileW}
                        height={poly.h}
                        patternUnits="userSpaceOnUse"
                      >
                        <image
                          href={flagUrl}
                          x={0}
                          y={0}
                          width={tileW}
                          height={poly.h}
                          preserveAspectRatio="xMidYMid meet"
                        />
                      </pattern>
                    );
                  });
                })}
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
            {spherePath && (
              <path
                d={spherePath}
                fill={palette.ocean}
                stroke={palette.stroke}
                strokeWidth={0.4}
                strokeOpacity={0.5}
                vectorEffect="non-scaling-stroke"
              />
            )}
            {/* The coastline, under every polity. Land no polity of this era covers
                stays visibly LAND (hatched "no data") instead of reading as ocean —
                without this, an unclaimed Balkans made Greece look like an island in
                500 BC. pointerEvents="none" so it can never swallow a click meant for
                a polity painted on top of it. */}
            {landPath && (
              <path
                d={landPath}
                fill="url(#hm-nodata)"
                stroke={palette.stroke}
                strokeWidth={0.4}
                strokeOpacity={0.35}
                vectorEffect="non-scaling-stroke"
                pointerEvents="none"
              />
            )}
            {renderedFeatures.map((f) => {
              if (!f.d) return null;
              const isHighlighted =
                f.name != null && f.name === highlightName;
              const fill = isHighlighted
                ? palette.selected
                : f.name
                ? palette.land
                : "url(#hm-nodata)";
              const stroke = isHighlighted
                ? palette.selectedStroke
                : palette.stroke;
              return (
                <path
                  key={f.idx}
                  d={f.d}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={isHighlighted ? 1.4 : 0.4}
                  strokeOpacity={isHighlighted ? 1 : 0.5}
                  // A derived boundary is drawn dashed so the user can see which lines
                  // are sourced for the period and which are a modern administrative
                  // stand-in (see scripts/tag-derived-boundaries.mjs).
                  strokeDasharray={f.derived ? "3 2" : undefined}
                  // Keep borders the same visual width regardless of zoom —
                  // without this they thicken as the user zooms in.
                  vectorEffect="non-scaling-stroke"
                  className="world-map__country world-map__country--selectable"
                  onClick={() => onSelect?.(f.name)}
                  onMouseEnter={() => onHover?.(f.name)}
                  onMouseLeave={() => onHover?.(null)}
                >
                  {/* Tooltip shows the corrected spelling; f.name (the raw
                      dataset NAME) remains the selection key. Unnamed land says so
                      rather than looking like a polity that failed to load. */}
                  <title>
                    {f.name
                      ? polityDisplayName(f.name)
                      : "No polity recorded here for this date"}
                  </title>
                </path>
              );
            })}
            {flagOverlay && renderedFeatures.map((f) => {
              if (!f.name || !flagOverlay.has(f.name)) return null;
              const isHighlighted = f.name === highlightName;
              // Paint each ring with its flag <pattern>; the ring path itself is
              // the clip, so the tiled flag covers the landmass exactly. When the
              // polity is highlighted we drop to 0.35 so the selection colour
              // underneath shows through (same as WorldProgressMap).
              return f.flagPolys.map((poly, i) => (
                <path
                  key={`hm-fimg-${f.idx}-${i}`}
                  d={poly.path}
                  fill={`url(#hm-fp-${f.idx}-${i})`}
                  opacity={isHighlighted ? 0.35 : 1}
                  style={{ pointerEvents: "none" }}
                />
              ));
            })}
            </g>
            </g>
          </svg>
        )}
      </div>
        <div className="world-map__zoom-controls">
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
            onClick={zoom.reset}
            disabled={!zoom.isZoomed}
            aria-label="Reset zoom"
            title="Reset zoom"
          >
            ⛶
          </button>
          {extraControls}
        </div>
      </div>
    </section>
  );
});
