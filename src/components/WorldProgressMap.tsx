import { memo, useEffect, useMemo, useRef, useState } from "react";
import { geoEqualEarth, geoPath, geoCentroid } from "d3-geo";
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
    /**
     * Maps territory alpha-2 codes → administering country alpha-2 codes.
     * Territories in this map become clickable on the world map; clicking one
     * resolves to the parent country code before calling onSelect/onHover.
     * Disputed territories must be excluded by the caller.
     */
    territoryParent?: Readonly<Record<string, string>>;
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
  /** Animation rotation offset added on top of centerLongitude. Kept
   *  separate so flag-polygon computation (expensive) can depend only on
   *  the stable centerLongitude, while path rendering uses the full
   *  centerLongitude + rotationOffset on every animation frame. */
  rotationOffset?: number;
  /** When true, the rendered map is flipped vertically — south at the top. */
  southUp?: boolean;
  /** Optional extra controls to render below the +/-/⟲ zoom buttons. */
  extraControls?: React.ReactNode;
  /** When provided, each country whose alpha-2 code is a key in this map
   *  will have its flag image (the map value — an absolute URL) rendered
   *  filling its territory. Countries absent from the map show normally. */
  flagOverlay?: ReadonlyMap<string, string> | null;
};

const GEO_URL = `${import.meta.env.BASE_URL}countries-50m.json`;
const WIDTH = 960;
const HEIGHT = 500;

type FlagPoly = { path: string; x: number; y: number; w: number; h: number };

// Defined at module scope so React.memo() works — component type must be
// stable across renders. Both components depend only on overlay/polygon data
// and selection, not on rotationOffset, so they are skipped on every rotation
// frame and only re-render when the flag data or selection actually changes.

const FlagDefs = memo(function FlagDefs({
  flagOverlay,
  flagPolygonsById,
  geographies,
}: {
  flagOverlay: ReadonlyMap<string, string>;
  flagPolygonsById: Map<string, FlagPoly[]>;
  geographies: GeoFeature[];
}) {
  return (
    <defs>
      {geographies.map((geo) => {
        const alpha2 = toIsoAlpha2(geo.id);
        if (!alpha2 || !flagOverlay.has(alpha2)) return null;
        const polys = flagPolygonsById.get(alpha2);
        if (!polys) return null;
        const flagUrl = flagOverlay.get(alpha2)!;
        return polys.map((poly, i) => (
          // patternUnits="userSpaceOnUse" keeps x/y in the referencing
          // element's coordinate system — same reason clipPathUnits was set
          // above (Safari bug, rotation offsets, zoom/flip transforms).
          <pattern
            key={`fp-${alpha2}-${i}`}
            id={`wm-fp-${alpha2}-${i}`}
            x={poly.x}
            y={poly.y}
            width={poly.w}
            height={poly.h}
            patternUnits="userSpaceOnUse"
          >
            <image
              href={flagUrl}
              x={0}
              y={0}
              width={poly.w}
              height={poly.h}
              preserveAspectRatio="xMidYMid meet"
            />
          </pattern>
        ));
      })}
    </defs>
  );
});

const FlagImages = memo(function FlagImages({
  flagOverlay,
  flagPolygonsById,
  geographies,
  selectedCode,
  highlightCodes,
}: {
  flagOverlay: ReadonlyMap<string, string>;
  flagPolygonsById: Map<string, FlagPoly[]>;
  geographies: GeoFeature[];
  selectedCode: string | null;
  highlightCodes: ReadonlySet<string> | null;
}) {
  return (
    <>
      {geographies.map((geo) => {
        const alpha2 = toIsoAlpha2(geo.id);
        if (!alpha2 || !flagOverlay.has(alpha2)) return null;
        const polys = flagPolygonsById.get(alpha2);
        if (!polys) return null;
        const isSelected =
          alpha2 === selectedCode || !!highlightCodes?.has(alpha2);
        return polys.map((poly, i) => (
          <path
            key={`fp-${alpha2}-${i}`}
            d={poly.path}
            fill={`url(#wm-fp-${alpha2}-${i})`}
            opacity={isSelected ? 0.35 : 1}
            style={{ pointerEvents: "none" }}
          />
        ));
      })}
    </>
  );
});

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
  ocean: string;
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
  ocean: "#b8d4e4",
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
  ocean: "#1a2d4a",
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
  rotationOffset = 0,
  southUp = false,
  extraControls,
  flagOverlay = null,
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

        // Extract Crimea from Russia (id=643 / "RU")
        const russiaFeature = fc.features.find((f) => {
          const alpha2 = toIsoAlpha2(f.id);
          return alpha2 === "RU";
        });

        if (russiaFeature && russiaFeature.geometry && (russiaFeature.geometry as any).type === "MultiPolygon") {
          const coords = (russiaFeature.geometry as any).coordinates as number[][][][];
          const filteredCoords: number[][][][] = [];
          let crimeaCoords: number[][][] | null = null;
          
          for (const poly of coords) {
            let sumLon = 0;
            let sumLat = 0;
            const pts = poly[0];
            if (pts && pts.length > 0) {
              for (let i = 0; i < pts.length; i++) {
                sumLon += pts[i][0];
                sumLat += pts[i][1];
              }
              const cLon = sumLon / pts.length;
              const cLat = sumLat / pts.length;
              
              if (cLon >= 32.0 && cLon <= 37.0 && cLat >= 44.0 && cLat <= 46.5) {
                crimeaCoords = poly;
                continue;
              }
            }
            filteredCoords.push(poly);
          }
          
          if (crimeaCoords) {
            (russiaFeature.geometry as any).coordinates = filteredCoords;

            // Create a new separate feature for Crimea
            const crimeaFeature: GeoFeature = {
              type: "Feature",
              id: "DISPUTED_CRIMEA",
              properties: { name: "Crimea (Disputed/Claimed)" },
              geometry: {
                type: "Polygon",
                coordinates: crimeaCoords
              }
            };
            fc.features.push(crimeaFeature);
          }
        }

        // NOTE: Morocco's polygon in this topology extends south to ~21.4°N,
        // encompassing Western Sahara territory. The separate Western Sahara
        // polygon (EH, feature 732) renders at z-index 104 — one position
        // AFTER Morocco (103) — so EH's palette.land fill correctly paints
        // on top of Morocco's selected-fill (teal) in the WS area. Western
        // Sahara is therefore never highlighted when Morocco is selected.
        // EH is also absent from TERRITORY_PARENT so it is never in
        // highlightCodes. No polygon clipping of Morocco is required.

        if (!cancelled) setGeographies(fc.features);
      } catch {
        if (!cancelled) setGeographies([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Cold path — only reruns when geography data or center meridian changes.
  // rotationOffset is intentionally excluded: the three-copy translate approach
  // handles globe rotation in O(1) without reprojecting paths on every frame.
  const { pathByIdx, centroidByAlpha2, spherePath, pxPerDegree } = useMemo(() => {
    const empty = {
      pathByIdx: new Map<number, string>(),
      centroidByAlpha2: new Map<string, [number, number]>(),
      spherePath: null as string | null,
      pxPerDegree: WIDTH / 360,
    };
    if (geographies.length === 0) return empty;
    const projection = geoEqualEarth()
      .rotate([-centerLongitude, 0])
      .fitSize([WIDTH, HEIGHT], { type: "Sphere" } as never);
    const mapPath = geoPath(projection);

    const pathByIdx = new Map<number, string>();
    for (let i = 0; i < geographies.length; i++) {
      const path = mapPath(geographies[i] as never);
      if (path) pathByIdx.set(i, path);
    }

    const centroidByAlpha2 = new Map<string, [number, number]>();
    for (const geo of geographies) {
      const alpha2 = toIsoAlpha2(geo.id);
      if (alpha2) {
        const c = mapPath.centroid(geo as never);
        if (c && isFinite(c[0]) && isFinite(c[1])) {
          centroidByAlpha2.set(alpha2, [c[0], c[1]]);
        }
      }
    }
    for (const [code, lonLat] of Object.entries(MICRO_STATE_COORDS)) {
      if (!centroidByAlpha2.has(code)) {
        const pt = projection(lonLat as [number, number]);
        if (pt && isFinite(pt[0]) && isFinite(pt[1])) {
          centroidByAlpha2.set(code, [pt[0], pt[1]]);
        }
      }
    }

    const spherePath = mapPath({ type: "Sphere" } as never) ?? null;

    // Equal Earth is exactly linear in longitude at the equator; project two
    // equatorial points 1° apart to get the exact pixel/degree scale factor.
    const p0 = projection([centerLongitude, 0]);
    const p1 = projection([centerLongitude + 1, 0]);
    const pxPerDegree = p0 && p1 ? p1[0] - p0[0] : WIDTH / 360;

    return { pathByIdx, centroidByAlpha2, spherePath, pxPerDegree };
  }, [geographies, centerLongitude]);

  // O(1) hot path — no memo, no reprojection. Three copies of the country
  // paths (at -WIDTH, 0, +WIDTH) are all translated together by this amount,
  // creating seamless globe rotation without any per-frame geoPath calls.
  const flagTranslateX = rotationOffset !== 0 ? -(rotationOffset * pxPerDegree) : 0;

  // Cold path — only reruns when geography data or center meridian changes.
  // Uses geoCentroid for robust image positioning immune to sphere-cap distortion.
  const flagPolygonsById = useMemo(() => {
    const result = new Map<string, FlagPoly[]>();
    if (geographies.length === 0) return result;
    const projection = geoEqualEarth()
      .rotate([-centerLongitude, 0])
      .fitSize([WIDTH, HEIGHT], { type: "Sphere" } as never);
    const mapPath = geoPath(projection);

    for (const geo of geographies) {
      const alpha2 = toIsoAlpha2(geo.id);
      if (!alpha2) continue;
      const geom = geo.geometry as { type: string; coordinates: unknown } | null;
      if (!geom) continue;
      const rings: unknown[] =
        geom.type === "Polygon"
          ? [geom.coordinates]
          : geom.type === "MultiPolygon"
            ? (geom.coordinates as unknown[])
            : [];
      const polys: FlagPoly[] = [];
      for (const coords of rings) {
        const pf = { type: "Feature", properties: {}, geometry: { type: "Polygon", coordinates: coords } };
        const pd = mapPath(pf as never);
        if (!pd) continue;
        const b = mapPath.bounds(pf as never);
        if (!b || !isFinite(b[0][0]) || !isFinite(b[1][0])) continue;
        const bw = b[1][0] - b[0][0];
        const bh = b[1][1] - b[0][1];
        if (bw <= 0 || bh <= 0) continue;
        // Antimeridian-crossing tiny rings get a D3 sphere-cap closure
        // segment that is very wide but very short (bh < 2px in practice).
        // Russia's mainland has bw/bh ≈ 8.19, so guard on bh < 20 to avoid
        // falsely filtering large countries that are just wide and flat.
        if (bw / bh > 8 && bh < 20) continue;
        const geoC = geoCentroid(pf as never);
        const svgC = projection(geoC);
        if (!svgC || !isFinite(svgC[0]) || !isFinite(svgC[1])) continue;
        const imgH = Math.max(bh, 20);
        const imgW = imgH * 1.5;
        // Anchor at bbox top-left so the pattern tile aligns with the country's
        // top/bottom edges — all flag stripes are visible via tiling.
        polys.push({ path: pd, x: b[0][0], y: b[0][1], w: imgW, h: imgH });
      }
      if (polys.length > 0) {
        const existing = result.get(alpha2);
        result.set(alpha2, existing ? [...existing, ...polys] : polys);
      }
    }
    return result;
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

    // Territories resolve to their administering parent country before any
    // pool check, name lookup, or onSelect call.
    const resolvedCode = selectable.territoryParent?.[alpha2] ?? alpha2;
    const isInPool = selectable.codes.has(resolvedCode);
    const name =
      selectable.names.get(resolvedCode) ??
      ALL_UN_NAMES.get(resolvedCode) ??
      resolvedCode;

    if (isInPool) {
      selectable.onSelect(resolvedCode);
      // Skip the popover entirely when no onConfirm is supplied — used by
      // the Learn-mode sandbox where clicks just select, no confirm.
      if (selectable.onConfirm) {
        setPopover({ code: resolvedCode, name, x, y, kind: "confirm", placement });
      }
    } else {
      // Country is rendered on the map but isn't part of this game's pool
      // (typical in Custom Game). Tell the user instead of silently failing.
      setPopover({ code: resolvedCode, name, x, y, kind: "info", placement });
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
  // Centroids are from the base (non-rotated) projection. Add flagTranslateX
  // then wrap to [0, WIDTH] to pick the copy currently in the visible sphere.
  const basePulseX = selCentroid ? selCentroid[0] + flagTranslateX : 0;
  const wrappedPulseX =
    basePulseX < 0 ? basePulseX + WIDTH : basePulseX >= WIDTH ? basePulseX - WIDTH : basePulseX;
  const pulseX = wrappedPulseX * zk + ztx;
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
          {/* Flag clip paths live at SVG root — outside all transforms.
              Safari has a bug where it applies parent group transforms to
              <defs> content (clipPath / pattern) when <defs> is nested
              inside a transformed <g>. Placing <defs> here avoids that.
              clipPathUnits="userSpaceOnUse" means the clip coordinates are
              interpreted in the referencing element's coordinate system, so
              the paths align correctly even when the map is zoomed or
              flipped south-up. */}
          {flagOverlay && (
            <FlagDefs
              flagOverlay={flagOverlay}
              flagPolygonsById={flagPolygonsById}
              geographies={geographies}
            />
          )}
          <g transform={zoom.transform}>
          {/* South-up flip happens inside the zoom group so flipping +
              zooming compose correctly. See HistoricalMap for details. */}
          <g
            transform={southUp ? `translate(0 ${HEIGHT}) scale(1 -1)` : undefined}
          >
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
          {/* Three-copy rotation group — translates all country paths and
              flag images together by flagTranslateX (O(1) per frame).
              Three copies at -WIDTH, 0, +WIDTH ensure the sphere is always
              fully covered regardless of rotation offset.
              will-change promotes this group to a GPU compositing layer so
              only the transform changes, not the painted content. */}
          <g
            transform={
              flagTranslateX !== 0
                ? `translate(${flagTranslateX.toFixed(2)} 0)`
                : undefined
            }
            style={{ willChange: "transform" }}
          >
            {([-WIDTH, 0, WIDTH] as const).map((offset) => (
              <g
                key={offset}
                transform={offset !== 0 ? `translate(${offset} 0)` : undefined}
              >
                {geographies.map((geo, idx) => {
                  const key = String(geo.id ?? idx) + "-" + idx;
                  const path = pathByIdx.get(idx);
                  if (!path) return null;
                  const alpha2 = toIsoAlpha2(geo.id);
                  const isInPool =
                    !!alpha2 && !!selectable && selectable.codes.has(alpha2);
                  const isUnMember = !!alpha2 && ALL_UN_NAMES.has(alpha2);
                  // A territory with an entry in selectable.territoryParent is
                  // also clickable — it resolves to the parent country on click.
                  const isClickableTerritory =
                    !!alpha2 && !!selectable?.territoryParent?.[alpha2];
                  const clickable =
                    isInteractive && (isUnMember || isClickableTerritory);
                  const isSelected =
                    !!alpha2 &&
                    (alpha2 === selectedCode || !!highlightCodes?.has(alpha2));
                  const baseFill = getFill(alpha2, countryResults, palette, isInPool);
                  const tooltip =
                    alpha2
                      ? selectable?.names.get(alpha2) ??
                        ALL_UN_NAMES.get(alpha2) ??
                        null
                      : (geo.properties?.name as string || null);
                  return (
                    <path
                      key={key}
                      d={path}
                      fill={isSelected ? palette.selectedFill : baseFill}
                      stroke={isSelected ? palette.selectedStroke : palette.stroke}
                      strokeWidth={isSelected ? 1.4 : 0.45}
                      strokeOpacity={isSelected ? 1 : 0.55}
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
                          ? () => {
                              const resolved =
                                selectable!.territoryParent?.[alpha2!] ?? alpha2!;
                              selectable!.onHover!(resolved);
                            }
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
                {flagOverlay && (
                  <FlagImages
                    flagOverlay={flagOverlay}
                    flagPolygonsById={flagPolygonsById}
                    geographies={geographies}
                    selectedCode={selectedCode}
                    highlightCodes={highlightCodes}
                  />
                )}
              </g>
            ))}
          </g>
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
