import { memo, useState } from "react";
import { type PlacedCity, isNational, isSubnational } from "../lib/cityRoles";

/**
 * City-overlay markers for the Learn-mode maps. The overlay shows CAPITALS ONLY:
 *
 *   ★ large gold star → a national capital
 *   ★ small gold star → a subdivision capital
 *   thin outer ring   → a city that is BOTH a national and a subdivision capital
 *                       (e.g. a state capital that is also the national capital)
 *
 * The name is hidden by default and revealed on interaction: hovering a marker
 * (desktop) shows its label transiently; clicking/tapping it pins the label so
 * it stays until tapped again. This is the "hover or click reveals the name"
 * behaviour requested by the owner.
 *
 * This component projects nothing itself: the parent map converts each city to
 * pixel coordinates (handling its own zoom / rotation / south-up transforms) and
 * passes finished screen positions here, so markers stay a constant pixel size
 * regardless of zoom — they are never enlarged or shrunk with the map.
 */

const CAPITAL_FILL = "#f2b50a"; // gold

export type ScreenCity = { city: PlacedCity; x: number; y: number };

/** 5-point star path centred at the origin, outer radius R. */
function starPath(R: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? R : R * 0.42;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push(`${(Math.cos(a) * r).toFixed(2)},${(Math.sin(a) * r).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
}

function Marker({
  city,
  stroke,
  showLabel,
  labelHalo,
  labelFill,
  onEnter,
  onLeave,
  onToggle,
}: {
  city: PlacedCity;
  stroke: string;
  showLabel: boolean;
  labelHalo: string;
  labelFill: string;
  onEnter: () => void;
  onLeave: () => void;
  onToggle: () => void;
}) {
  const r = city.roles;
  const big = isNational(r);
  const R = big ? 8 : 5.5; // outer radius (constant px)
  const dualLevel = isNational(r) && isSubnational(r);
  const sw = big ? 1.1 : 0.8;

  const label = city.note ? `${city.name} · ${city.note}` : city.name;

  return (
    <g
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onClick={(e) => {
        // Reveal the name instead of selecting the country/subdivision beneath.
        e.stopPropagation();
        onToggle();
      }}
      style={{ cursor: "pointer" }}
    >
      {/* Native tooltip + accessible name. */}
      <title>{label}</title>
      {/* Invisible, generous hit area so the marker is easy to hover/tap. */}
      <circle r={R * 1.9} fill="transparent" />
      {/* Dual-level ring: the city is both a national and a subdivision capital. */}
      {dualLevel && (
        <circle
          r={R * 1.7}
          fill="none"
          stroke={stroke}
          strokeWidth={0.9}
          strokeOpacity={0.85}
          vectorEffect="non-scaling-stroke"
          style={{ pointerEvents: "none" }}
        />
      )}
      <path
        d={starPath(R)}
        fill={CAPITAL_FILL}
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        style={{ pointerEvents: "none" }}
      />
      {showLabel && (
        <text
          x={R * 1.5 + 1}
          y={0}
          dominantBaseline="central"
          fontSize={big ? 9 : 8}
          fontWeight={big ? 600 : 500}
          fill={labelFill}
          stroke={labelHalo}
          strokeWidth={2.6}
          paintOrder="stroke"
          strokeLinejoin="round"
          style={{ pointerEvents: "none" }}
        >
          {label}
        </text>
      )}
    </g>
  );
}

export const CityMarkers = memo(function CityMarkers({
  markers,
  stroke,
  labelHalo,
  labelFill,
}: {
  markers: ScreenCity[];
  stroke: string;
  labelHalo: string;
  labelFill: string;
}) {
  // Hover shows a label transiently; click/tap pins it until toggled off.
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  return (
    <g>
      {markers.map(({ city, x, y }) => {
        const show = city.id === hoverId || city.id === pinnedId;
        return (
          <g key={city.id} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
            <Marker
              city={city}
              stroke={stroke}
              showLabel={show}
              labelHalo={labelHalo}
              labelFill={labelFill}
              onEnter={() => setHoverId(city.id)}
              onLeave={() => setHoverId((p) => (p === city.id ? null : p))}
              onToggle={() => setPinnedId((p) => (p === city.id ? null : city.id))}
            />
          </g>
        );
      })}
    </g>
  );
});

/** Compact legend explaining the capital marker glyphs. Rendered next to the map. */
export function CityLegend({ stroke }: { stroke: string }) {
  const Item = ({ children, label }: { children: React.ReactNode; label: string }) => (
    <span className="city-legend__item">
      <svg width={20} height={20} viewBox="-10 -10 20 20" className="city-legend__glyph" aria-hidden="true">
        {children}
      </svg>
      {label}
    </span>
  );
  return (
    <div className="city-legend" role="note" aria-label="City marker legend">
      <Item label="National capital">
        <path d={starPath(8)} fill={CAPITAL_FILL} stroke={stroke} strokeWidth={1} strokeLinejoin="round" />
      </Item>
      <Item label="Subdivision capital">
        <path d={starPath(5.5)} fill={CAPITAL_FILL} stroke={stroke} strokeWidth={0.9} strokeLinejoin="round" />
      </Item>
      <Item label="Both (national & subdivision)">
        <circle r={9} fill="none" stroke={stroke} strokeWidth={0.9} strokeOpacity={0.85} />
        <path d={starPath(7)} fill={CAPITAL_FILL} stroke={stroke} strokeWidth={1} strokeLinejoin="round" />
      </Item>
      <Item label="Hover or tap a marker for its name">
        <path d={starPath(7)} fill={CAPITAL_FILL} stroke={stroke} strokeWidth={1} strokeLinejoin="round" />
      </Item>
    </div>
  );
}
