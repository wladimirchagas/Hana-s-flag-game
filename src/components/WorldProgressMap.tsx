import { useEffect, useMemo, useState } from "react";
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
};

const LIGHT_PALETTE: MapPalette = {
  unknown: "#dbe7d6",
  land: "#e8ddc4",
  correct: "#3fae5a",
  wrong: "#ff6b6b",
  stroke: "#1a2238",
};

const DARK_PALETTE: MapPalette = {
  unknown: "#2a3358",
  land: "#3a4470",
  correct: "#5dd97a",
  wrong: "#ff8a8a",
  stroke: "#f4ecd8",
};

function getFill(
  geoId: string | number | undefined,
  results: Record<string, CountryResult>,
  palette: MapPalette,
): string {
  const alpha2 = toIsoAlpha2(geoId);
  if (!alpha2) return palette.unknown;
  const result = results[alpha2];
  if (result === "correct") return palette.correct;
  if (result === "wrong") return palette.wrong;
  return palette.land;
}

export function WorldProgressMap({ countryResults }: Props) {
  const { theme } = useTheme();
  const palette = theme === "dark" ? DARK_PALETTE : LIGHT_PALETTE;
  const [geographies, setGeographies] = useState<GeoFeature[]>([]);

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

  return (
    <section className="map-section" aria-labelledby="map-heading">
      <h2 id="map-heading" className="map-heading">
        World progress map
      </h2>
      <div className="map-frame">
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
            return (
              <path
                key={key}
                d={path}
                fill={getFill(geo.id, countryResults, palette)}
                stroke={palette.stroke}
                strokeWidth={0.45}
                strokeOpacity={0.55}
              />
            );
          })}
        </svg>
      </div>
    </section>
  );
}
