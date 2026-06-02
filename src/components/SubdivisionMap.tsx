import { memo, useEffect, useMemo, useRef, useState } from "react";
import { geoEqualEarth, geoPath, geoCentroid } from "d3-geo";
import { useTheme } from "../context/ThemeContext";
import { useZoomPan } from "../hooks/useZoomPan";
import type {
  SubdivisionFeatureCollection,
  SubdivisionGeoFeature,
} from "../types/subdivision";

const WIDTH = 960;
const HEIGHT = 500;
const PADDING = 40;

type MapPalette = {
  ocean: string;
  land: string;
  correct: string;
  wrong: string;
  stroke: string;
  selectedStroke: string;
  selectedFill: string;
};

const LIGHT_PALETTE: MapPalette = {
  ocean: "#b8d4e4",
  land: "#e8ddc4",
  correct: "#3fae5a",
  wrong: "#ff6b6b",
  stroke: "#1a2238",
  selectedStroke: "#1a2238",
  selectedFill: "#4ecdc4",
};

const DARK_PALETTE: MapPalette = {
  ocean: "#1a2d4a",
  land: "#3a4470",
  correct: "#5dd97a",
  wrong: "#ff8a8a",
  stroke: "#f4ecd8",
  selectedStroke: "#f4ecd8",
  selectedFill: "#74e4dc",
};

function getSubdivCode(feature: SubdivisionGeoFeature): string {
  return (
    feature.properties.iso_3166_2?.trim().toUpperCase() ||
    feature.properties.name ||
    ""
  );
}

type FlagPoly = { path: string; x: number; y: number; w: number; h: number };

const FlagDefsSubdiv = memo(function FlagDefsSubdiv({
  flagOverlay,
  flagPolygonsById,
  features,
}: {
  flagOverlay: ReadonlyMap<string, string>;
  flagPolygonsById: Map<string, FlagPoly[]>;
  features: SubdivisionGeoFeature[];
}) {
  return (
    <defs>
      {features.map((feat, idx) => {
        const code = getSubdivCode(feat);
        if (!code || !flagOverlay.has(code)) return null;
        const polys = flagPolygonsById.get(code);
        if (!polys) return null;
        // Sanitize the code for use as an XML ID
        const safeId = code.replace(/[^a-zA-Z0-9_-]/g, "_");
        return polys.map((_, i) => (
          <clipPath
            key={`sdcp-${idx}-${i}`}
            id={`sdm-fcp-${safeId}-${i}`}
            clipPathUnits="userSpaceOnUse"
          >
            <path d={flagPolygonsById.get(code)![i]!.path} />
          </clipPath>
        ));
      })}
    </defs>
  );
});

const FlagImagesSubdiv = memo(function FlagImagesSubdiv({
  flagOverlay,
  flagPolygonsById,
  features,
  selectedCode,
}: {
  flagOverlay: ReadonlyMap<string, string>;
  flagPolygonsById: Map<string, FlagPoly[]>;
  features: SubdivisionGeoFeature[];
  selectedCode: string | null;
}) {
  return (
    <>
      {features.map((feat, idx) => {
        const code = getSubdivCode(feat);
        if (!code) return null;
        const flagUrl = flagOverlay.get(code);
        if (!flagUrl) return null;
        const polys = flagPolygonsById.get(code);
        if (!polys) return null;
        const isSelected = code === selectedCode;
        const safeId = code.replace(/[^a-zA-Z0-9_-]/g, "_");
        return polys.map((poly, i) => (
          <image
            key={`sdimg-${idx}-${i}`}
            href={flagUrl}
            x={poly.x}
            y={poly.y}
            width={poly.w}
            height={poly.h}
            clipPath={`url(#sdm-fcp-${safeId}-${i})`}
            preserveAspectRatio="xMidYMid slice"
            opacity={isSelected ? 0.35 : 1}
            style={{ pointerEvents: "none" }}
          />
        ));
      })}
    </>
  );
});

type Popover = {
  code: string;
  name: string;
  x: number;
  y: number;
  placement: "above" | "below";
};

type Props = {
  geoData: SubdivisionFeatureCollection | null;
  loading?: boolean;
  flagOverlay?: ReadonlyMap<string, string> | null;
  selectedCode?: string | null;
  onSelect?: (code: string) => void;
  onConfirm?: () => void;
  onHover?: (code: string | null) => void;
  disabled?: boolean;
  countryResults?: Record<string, "correct" | "wrong">;
};

export function SubdivisionMap({
  geoData,
  loading = false,
  flagOverlay = null,
  selectedCode = null,
  onSelect,
  onConfirm,
  onHover,
  disabled = false,
  countryResults = {},
}: Props) {
  const { theme } = useTheme();
  const palette = theme === "dark" ? DARK_PALETTE : LIGHT_PALETTE;
  const [popover, setPopover] = useState<Popover | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const zoom = useZoomPan(WIDTH, HEIGHT);

  const isInteractive = !!onSelect && !disabled;

  // Hide popover when disabled
  useEffect(() => {
    if (disabled) setPopover(null);
  }, [disabled]);

  // Hide popover when selectedCode is cleared
  useEffect(() => {
    if (!selectedCode) setPopover(null);
  }, [selectedCode]);

  // Compute projection + paths fitted to the feature collection
  const { pathByIdx, spherePath, flagPolygonsById } = useMemo(() => {
    const empty = {
      pathByIdx: new Map<number, string>(),
      spherePath: null as string | null,
      flagPolygonsById: new Map<string, FlagPoly[]>(),
    };
    if (!geoData || geoData.features.length === 0) return empty;

    const projection = geoEqualEarth().fitExtent(
      [
        [PADDING, PADDING],
        [WIDTH - PADDING, HEIGHT - PADDING],
      ],
      { type: "FeatureCollection", features: geoData.features } as never,
    );
    const mapPath = geoPath(projection);

    // Paths for each feature
    const pathByIdx = new Map<number, string>();
    for (let i = 0; i < geoData.features.length; i++) {
      const p = mapPath(geoData.features[i] as never);
      if (p) pathByIdx.set(i, p);
    }

    const spherePath = mapPath({ type: "Sphere" } as never) ?? null;

    // Flag polygon data for clip-path overlay
    const flagPolygonsById = new Map<string, FlagPoly[]>();
    if (flagOverlay) {
      for (const feat of geoData.features) {
        const code = getSubdivCode(feat);
        if (!code || !flagOverlay.has(code)) continue;
        const geom = feat.geometry as {
          type: string;
          coordinates: unknown;
        } | null;
        if (!geom) continue;
        const rings: unknown[] =
          geom.type === "Polygon"
            ? [geom.coordinates]
            : geom.type === "MultiPolygon"
              ? (geom.coordinates as unknown[])
              : [];
        const polys: FlagPoly[] = [];
        for (const coords of rings) {
          const pf = {
            type: "Feature",
            properties: {},
            geometry: { type: "Polygon", coordinates: coords },
          };
          const pd = mapPath(pf as never);
          if (!pd) continue;
          const b = mapPath.bounds(pf as never);
          if (!b || !isFinite(b[0][0]) || !isFinite(b[1][0])) continue;
          const bw = b[1][0] - b[0][0];
          const bh = b[1][1] - b[0][1];
          if (bw <= 0 || bh <= 0) continue;
          if (bw / bh > 8) continue;
          const geoC = geoCentroid(pf as never);
          const svgC = projection(geoC);
          if (!svgC || !isFinite(svgC[0]) || !isFinite(svgC[1])) continue;
          const imgH = Math.max(bh, 20);
          const imgW = imgH * 1.5;
          polys.push({
            path: pd,
            x: svgC[0] - imgW / 2,
            y: svgC[1] - imgH / 2,
            w: imgW,
            h: imgH,
          });
        }
        if (polys.length > 0) {
          const existing = flagPolygonsById.get(code);
          flagPolygonsById.set(code, existing ? [...existing, ...polys] : polys);
        }
      }
    }

    return { pathByIdx, spherePath, flagPolygonsById };
    // Intentionally not include flagOverlay in deps — we recompute paths only when geo changes.
    // Flag overlay polygons are computed here too but we'll recompute on flagOverlay change via
    // the flagPolygonsById useMemo below. Split for performance.
  }, [geoData, flagOverlay]);

  function getFill(code: string): string {
    if (code === selectedCode) return palette.selectedFill;
    const result = countryResults[code];
    if (result === "correct") return palette.correct;
    if (result === "wrong") return palette.wrong;
    return palette.land;
  }

  function handlePathClick(
    e: React.MouseEvent<SVGPathElement>,
    code: string,
    name: string,
  ) {
    if (!isInteractive) return;
    const frameRect = frameRef.current?.getBoundingClientRect();
    if (!frameRect) return;

    const clickX = e.clientX - frameRect.left;
    const clickY = e.clientY - frameRect.top;

    const HALF_W = 130;
    const POP_H = 64;
    const MARGIN = 8;

    const x = Math.max(
      HALF_W + MARGIN,
      Math.min(frameRect.width - HALF_W - MARGIN, clickX),
    );
    const placeAbove = clickY >= POP_H + MARGIN * 2;
    const y = placeAbove ? clickY - MARGIN : clickY + MARGIN;
    const placement: "above" | "below" = placeAbove ? "above" : "below";

    onSelect?.(code);
    setPopover({ code, name, x, y, placement });
  }

  function handleConfirm() {
    if (!onConfirm) return;
    onConfirm();
    setPopover(null);
  }

  if (loading) {
    return (
      <section className="map-section subdiv-map-section" aria-label="Subdivision map">
        <div className="map-frame" style={{ minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "var(--ink-soft)", fontStyle: "italic" }}>Loading subdivisions…</p>
        </div>
      </section>
    );
  }

  if (!geoData || geoData.features.length === 0) {
    return (
      <section className="map-section subdiv-map-section" aria-label="Subdivision map">
        <div className="map-frame" style={{ minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "var(--ink-soft)", fontStyle: "italic" }}>No sub-national data available for this country.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="map-section subdiv-map-section" aria-label="Subdivision map">
      <div className="map-with-zoom">
        <div className="map-frame" ref={frameRef}>
          <svg
            className="world-map"
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            role="img"
            aria-label="Subdivision map"
            onPointerDown={zoom.svgHandlers.onPointerDown}
            onPointerMove={zoom.svgHandlers.onPointerMove}
            onPointerUp={zoom.svgHandlers.onPointerUp}
            onPointerCancel={zoom.svgHandlers.onPointerCancel}
            style={{
              cursor: zoom.isZoomed ? "grab" : "default",
              touchAction: zoom.isZoomed ? "none" : "auto",
            }}
          >
            {/* Flag clip paths must be at SVG root — outside transforms */}
            {flagOverlay && geoData && (
              <FlagDefsSubdiv
                flagOverlay={flagOverlay}
                flagPolygonsById={flagPolygonsById}
                features={geoData.features}
              />
            )}

            <g transform={zoom.transform}>
              {/* Ocean background */}
              {spherePath && (
                <path
                  d={spherePath}
                  fill={palette.ocean}
                  stroke={palette.stroke}
                  strokeWidth={0.45}
                  strokeOpacity={0.55}
                  vectorEffect="non-scaling-stroke"
                />
              )}

              {/* Subdivision feature paths */}
              {geoData.features.map((feat, idx) => {
                const path = pathByIdx.get(idx);
                if (!path) return null;
                const code = getSubdivCode(feat);
                const name =
                  feat.properties.name_en || feat.properties.name || code;
                const isSelected = code === selectedCode;
                const fill = getFill(code);
                return (
                  <path
                    key={`sd-${idx}`}
                    d={path}
                    fill={fill}
                    stroke={isSelected ? palette.selectedStroke : palette.stroke}
                    strokeWidth={isSelected ? 1.4 : 0.6}
                    strokeOpacity={isSelected ? 1 : 0.7}
                    strokeDasharray={isSelected ? undefined : "4 3"}
                    vectorEffect="non-scaling-stroke"
                    className={
                      isInteractive && code
                        ? "world-map__country world-map__country--selectable"
                        : "world-map__country"
                    }
                    onClick={
                      isInteractive && code
                        ? (e) => handlePathClick(e, code, name)
                        : undefined
                    }
                    onMouseEnter={
                      isInteractive && code && onHover
                        ? () => onHover(code)
                        : undefined
                    }
                    onMouseLeave={
                      isInteractive && onHover
                        ? () => onHover(null)
                        : undefined
                    }
                  >
                    {name ? <title>{name}</title> : null}
                  </path>
                );
              })}

              {/* Flag overlay images */}
              {flagOverlay && geoData && (
                <FlagImagesSubdiv
                  flagOverlay={flagOverlay}
                  flagPolygonsById={flagPolygonsById}
                  features={geoData.features}
                  selectedCode={selectedCode}
                />
              )}
            </g>
          </svg>

          {popover && isInteractive && (
            <div
              className={`map-popover map-popover--confirm map-popover--${popover.placement}`}
              style={{ left: `${popover.x}px`, top: `${popover.y}px` }}
              role="dialog"
              aria-label={`Confirm: ${popover.name}`}
            >
              <span className="map-popover__name">{popover.name}</span>
              {onConfirm ? (
                <button
                  type="button"
                  className="map-popover__confirm"
                  onClick={handleConfirm}
                >
                  Confirm
                </button>
              ) : null}
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
        </div>
      </div>
    </section>
  );
}
