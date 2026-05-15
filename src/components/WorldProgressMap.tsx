import { useEffect, useMemo, useRef, useState } from "react";
import { geoEqualEarth, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import countries from "i18n-iso-countries";
import { useTheme } from "../context/ThemeContext";

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
   * If provided, clicking a country in this set selects it and shows a confirm
   * popover next to the click. Pass a Map of code → display name so the popover
   * can show the country name. If omitted, the map is read-only (progress only).
   */
  selectable?: {
    codes: ReadonlySet<string>;
    names: ReadonlyMap<string, string>;
    onSelect: (code: string) => void;
    onConfirm: () => void;
  };
  /** When true, click handlers are disabled even if `selectable` is provided. */
  disabled?: boolean;
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
  correct: string;
  wrong: string;
  stroke: string;
  selectedStroke: string;
  selectedFill: string;
};

const LIGHT_PALETTE: MapPalette = {
  unknown: "#dbe7d6",
  land: "#e8ddc4",
  correct: "#3fae5a",
  wrong: "#ff6b6b",
  stroke: "#1a2238",
  selectedStroke: "#1a2238",
  selectedFill: "#4ecdc4",
};

const DARK_PALETTE: MapPalette = {
  unknown: "#2a3358",
  land: "#3a4470",
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
): string {
  if (!alpha2) return palette.unknown;
  const result = results[alpha2];
  if (result === "correct") return palette.correct;
  if (result === "wrong") return palette.wrong;
  return palette.land;
}

type Popover = { code: string; name: string; x: number; y: number };

export function WorldProgressMap({
  countryResults,
  selectedCode = null,
  selectable,
  disabled = false,
}: Props) {
  const { theme } = useTheme();
  const palette = theme === "dark" ? DARK_PALETTE : LIGHT_PALETTE;
  const [geographies, setGeographies] = useState<GeoFeature[]>([]);
  const [popover, setPopover] = useState<Popover | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);

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
    const projection = geoEqualEarth().fitSize([WIDTH, HEIGHT], {
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
  }, [geographies]);

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
    if (!selectable.codes.has(alpha2)) return;
    const target = e.currentTarget;
    const bbox = target.getBoundingClientRect();
    const frameRect = frameRef.current?.getBoundingClientRect();
    if (!frameRect) return;
    const x = (bbox.left + bbox.right) / 2 - frameRect.left;
    const y = bbox.top - frameRect.top;
    const name = selectable.names.get(alpha2) ?? alpha2;
    selectable.onSelect(alpha2);
    setPopover({ code: alpha2, name, x, y });
  }

  function handleConfirm() {
    if (!selectable) return;
    selectable.onConfirm();
    setPopover(null);
  }

  return (
    <section className="map-section" aria-labelledby="map-heading">
      <h2 id="map-heading" className="map-heading">
        World map
        {isInteractive && (
          <span className="map-heading__hint"> — click a country to guess</span>
        )}
      </h2>
      <div className="map-frame" ref={frameRef}>
        <svg
          className="world-map"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label="World map showing correctly and incorrectly guessed countries"
        >
          {geographies.map((geo, idx) => {
            const key = String(geo.id ?? idx);
            const path = pathById.get(String(geo.id ?? ""));
            if (!path) return null;
            const alpha2 = toIsoAlpha2(geo.id);
            const isAvailable =
              !!alpha2 && (!selectable || selectable.codes.has(alpha2));
            const isSelected = !!alpha2 && alpha2 === selectedCode;
            const clickable = isInteractive && isAvailable;
            const baseFill = getFill(alpha2, countryResults, palette);
            return (
              <path
                key={key}
                d={path}
                fill={isSelected ? palette.selectedFill : baseFill}
                stroke={isSelected ? palette.selectedStroke : palette.stroke}
                strokeWidth={isSelected ? 1.4 : 0.45}
                strokeOpacity={isSelected ? 1 : 0.55}
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
              >
                {alpha2 && selectable?.names.get(alpha2) ? (
                  <title>{selectable.names.get(alpha2)}</title>
                ) : null}
              </path>
            );
          })}
        </svg>
        {popover && isInteractive && (
          <div
            className="map-popover"
            style={{ left: `${popover.x}px`, top: `${popover.y}px` }}
            role="dialog"
            aria-label={`Confirm guess: ${popover.name}`}
          >
            <span className="map-popover__name">{popover.name}</span>
            <button
              type="button"
              className="map-popover__confirm"
              onClick={handleConfirm}
            >
              Confirm
            </button>
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
    </section>
  );
}
