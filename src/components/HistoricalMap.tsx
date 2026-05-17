import { useEffect, useMemo, useRef, useState } from "react";
import { geoEqualEarth, geoPath } from "d3-geo";
import { useTheme } from "../context/ThemeContext";

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
}: HistoricalMapProps) {
  const { theme } = useTheme();
  const palette = theme === "dark" ? DARK_PALETTE : LIGHT_PALETTE;
  const [data, setData] = useState<FeatureCollection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);

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

  // Compute per-feature path strings via d3-geo's equal-earth projection
  // (same as WorldProgressMap so the two maps look like the same world).
  const renderedFeatures = useMemo(() => {
    if (!data || data.features.length === 0) return [];
    const projection = geoEqualEarth().fitSize([WIDTH, HEIGHT], data);
    const pathFn = geoPath(projection);
    return data.features.map((f, idx) => {
      const d = pathFn(f as never);
      const name = f.properties?.NAME ?? null;
      return { idx, d, name };
    });
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
        </span>
      </h2>
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
          >
            {renderedFeatures.map((f) => {
              if (!f.d) return null;
              const isHighlighted =
                f.name != null && f.name === highlightName;
              const fill = isHighlighted
                ? palette.selected
                : f.name
                ? palette.land
                : palette.unknown;
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
                  className="world-map__country world-map__country--selectable"
                  onClick={() => onSelect?.(f.name)}
                  onMouseEnter={() => onHover?.(f.name)}
                  onMouseLeave={() => onHover?.(null)}
                >
                  {f.name ? <title>{f.name}</title> : null}
                </path>
              );
            })}
          </svg>
        )}
      </div>
    </section>
  );
}
