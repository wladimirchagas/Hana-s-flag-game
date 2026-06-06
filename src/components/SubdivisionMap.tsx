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

  // Hide popover when selectedCode changes to a different location or is cleared
  useEffect(() => {
    setPopover(prev => (prev && prev.code !== selectedCode) ? null : prev);
  }, [selectedCode]);

  // Reset zoom whenever the view switches to a different territory (or back to
  // the main country). This ensures stale zoom/pan from a previous territory
  // doesn't carry over when the projection re-fits to a new area.
  const prevIsTerritoryRef = useRef(false);
  const prevSelectedCodeRef = useRef<string | null>(null);
  useEffect(() => {
    if (!geoData) return;
    const isTerritory = !!selectedCode && geoData.features.some(
      (f) => f.properties._isTerritory && getSubdivCode(f) === selectedCode,
    );
    const wasTerritory = prevIsTerritoryRef.current;
    const prevCode = prevSelectedCodeRef.current;
    prevIsTerritoryRef.current = isTerritory;
    prevSelectedCodeRef.current = selectedCode ?? null;
    // Reset on territory↔main switch OR when moving between two different territories
    if (isTerritory !== wasTerritory || (isTerritory && selectedCode !== prevCode)) {
      zoom.reset();
    }
  // zoom.reset is stable; geoData changes only on country switch
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCode, geoData]);

  // Compute projection + paths fitted to the feature collection.
  // The projection is fitted to:
  //   - The selected territory's features when a territory subdivision is active
  //     (so the territory fills the viewport instead of appearing as a tiny dot)
  //   - Otherwise, the main-country features only (territory features — tagged with
  //     _isTerritory — are excluded from fitExtent so distant territories like the
  //     Falklands don't force a near-global zoom-out for the UK view)
  const { pathByIdx, flagPolygonsById, centroidByCode, smallSubdivCodes } = useMemo(() => {
    const empty = {
      pathByIdx: new Map<number, string>(),
      flagPolygonsById: new Map<string, FlagPoly[]>(),
      centroidByCode: new Map<string, [number, number]>(),
      smallSubdivCodes: new Set<string>(),
    };
    if (!geoData || geoData.features.length === 0) return empty;

    // If the selected code belongs to a territory feature, fit the projection
    // to only that territory's features so it fills the viewport.
    const selectedTerritoryFeatures = selectedCode
      ? geoData.features.filter(
          (f) => f.properties._isTerritory && getSubdivCode(f) === selectedCode,
        )
      : [];
    const mainFeatures = geoData.features.filter((f) => !f.properties._isTerritory);

    const fitFeatures =
      selectedTerritoryFeatures.length > 0
        ? selectedTerritoryFeatures
        : mainFeatures.length > 0
          ? mainFeatures
          : geoData.features;

    const projection = geoEqualEarth().fitExtent(
      [
        [PADDING, PADDING],
        [WIDTH - PADDING, HEIGHT - PADDING],
      ],
      { type: "FeatureCollection", features: fitFeatures } as never,
    );
    const mapPath = geoPath(projection);

    // Paths for each feature
    const pathByIdx = new Map<number, string>();
    for (let i = 0; i < geoData.features.length; i++) {
      const p = mapPath(geoData.features[i] as never);
      if (p) pathByIdx.set(i, p);
    }

    // Centroids and small-feature detection
    // Features with a bounding box area below this threshold (SVG square units)
    // are considered too small to see and get the pulsing indicator.
    const SMALL_AREA_THRESHOLD = 200;
    const centroidByCode = new Map<string, [number, number]>();
    const smallSubdivCodes = new Set<string>();
    for (let i = 0; i < geoData.features.length; i++) {
      const feat = geoData.features[i];
      const code = getSubdivCode(feat);
      if (!code) continue;
      const geoC = geoCentroid(feat as never);
      const svgC = projection(geoC);
      if (svgC && isFinite(svgC[0]) && isFinite(svgC[1])) {
        centroidByCode.set(code, [svgC[0], svgC[1]]);
      }
      if (!pathByIdx.has(i)) {
        // Feature produced no renderable path — definitely too small to see
        smallSubdivCodes.add(code);
      } else {
        const b = mapPath.bounds(feat as never);
        if (b && isFinite(b[0][0]) && isFinite(b[1][0])) {
          const area = (b[1][0] - b[0][0]) * (b[1][1] - b[0][1]);
          if (area < SMALL_AREA_THRESHOLD) smallSubdivCodes.add(code);
        }
      }
    }

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
          if (bw / bh > 8 && bh < 20) continue;
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

    return { pathByIdx, flagPolygonsById, centroidByCode, smallSubdivCodes };
  // selectedCode drives which features are used for fitExtent (territory vs main)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoData, flagOverlay, selectedCode]);

  // Determine which features to show:
  //  - Territory selected: only that territory's features (avoids enormous
  //    main-country paths dominating the territory-focused projection)
  //  - Otherwise: only main-country features (territory features stay hidden
  //    until explicitly selected, since their projection-space positions are
  //    far off the main-country viewport)
  const selectedTerritoryCode =
    selectedCode &&
    geoData?.features.some(
      (f) => f.properties._isTerritory && getSubdivCode(f) === selectedCode,
    )
      ? selectedCode
      : null;

  function isFeatureVisible(feat: { properties: { _isTerritory?: boolean } }): boolean {
    if (selectedTerritoryCode) {
      return getSubdivCode(feat as SubdivisionGeoFeature) === selectedTerritoryCode;
    }
    return !feat.properties._isTerritory;
  }

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

  // Pulsing ring indicator — shown for subdivisions that are too small to
  // spot at the default zoom level. Rendered outside the zoom <g> so the
  // ring's visual size stays constant regardless of zoom level, but
  // positioned via the live zoom transform so it tracks the territory.
  const selCentroid = selectedCode ? centroidByCode.get(selectedCode) : null;
  const showPulse = !!(selCentroid && selectedCode && smallSubdivCodes.has(selectedCode));
  const { k: zk, tx: ztx, ty: zty } = zoom.view;
  const pulseX = selCentroid ? selCentroid[0] * zk + ztx : 0;
  const pulseY = selCentroid ? selCentroid[1] * zk + zty : 0;
  const PULSE_MARGIN = 30;
  const pulseVisible =
    showPulse &&
    pulseX > -PULSE_MARGIN && pulseX < WIDTH  + PULSE_MARGIN &&
    pulseY > -PULSE_MARGIN && pulseY < HEIGHT + PULSE_MARGIN;

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
                features={geoData.features.filter(isFeatureVisible)}
              />
            )}

            {/* Static ocean background — using a rect instead of the projected
                sphere path avoids the "globe arc cut off" artifact that appears
                when the projection is scaled to fit a single country. */}
            <rect x={0} y={0} width={WIDTH} height={HEIGHT} fill={palette.ocean} />

            <g transform={zoom.transform}>

              {/* Subdivision feature paths */}
              {geoData.features.map((feat, idx) => {
                if (!isFeatureVisible(feat)) return null;
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
                  features={geoData.features.filter(isFeatureVisible)}
                  selectedCode={selectedCode}
                />
              )}
            </g>

            {/* Pulsing ring — outside the zoom group so its pixel size is
                constant; positioned via zoom-transformed centroid coords. */}
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
