import { memo } from "react";
import {
  type PlacedCity,
  isCapital,
  isLargest,
  isNational,
  isSubnational,
} from "../lib/cityRoles";

/**
 * City-overlay markers for the Learn-mode maps.
 *
 * Iconography (cartographic convention) — distinguishes the four roles, and
 * composes them when a city holds several at once (e.g. London is the UK's
 * national capital + largest city AND England's capital + largest city):
 *
 *   ★ star            → a capital
 *   ● filled circle   → a largest city
 *   ★ with inner dot  → both capital and largest city
 *   larger + outlined → national role  (smaller → subnational role)
 *   thin outer ring   → holds BOTH a national and a subnational role
 *
 * This component is purely presentational: the parent map projects each city to
 * pixel coordinates (handling its own zoom / rotation / south-up transforms) and
 * passes the finished screen positions here, so markers stay a constant pixel
 * size regardless of zoom — they are never enlarged or shrunk with the map.
 */

const CAPITAL_FILL = "#f2b50a"; // gold
const LARGEST_FILL = "#2f7ff0"; // blue

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
}: {
  city: PlacedCity;
  stroke: string;
  showLabel: boolean;
  labelHalo: string;
  labelFill: string;
}) {
  const r = city.roles;
  const big = isNational(r);
  const R = big ? 8 : 5.5; // outer radius (constant px)
  const cap = isCapital(r);
  const large = isLargest(r);
  const dualLevel = isNational(r) && isSubnational(r);
  const sw = big ? 1.1 : 0.8;

  const label = city.note ? `${city.name} · ${city.note}` : city.name;

  return (
    <g style={{ pointerEvents: "none" }}>
      {/* Dual-level ring: city holds both a national and a subnational role. */}
      {dualLevel && (
        <circle
          r={R * 1.7}
          fill="none"
          stroke={stroke}
          strokeWidth={0.9}
          strokeOpacity={0.85}
          vectorEffect="non-scaling-stroke"
        />
      )}
      {cap ? (
        // Capital → star. If also largest, a blue inner dot is added below.
        <path
          d={starPath(R)}
          fill={CAPITAL_FILL}
          stroke={stroke}
          strokeWidth={sw}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ) : (
        // Largest only → filled circle.
        <circle
          r={R * 0.66}
          fill={LARGEST_FILL}
          stroke={stroke}
          strokeWidth={sw}
          vectorEffect="non-scaling-stroke"
        />
      )}
      {cap && large && (
        <circle r={R * 0.34} fill={LARGEST_FILL} stroke={stroke} strokeWidth={0.5} vectorEffect="non-scaling-stroke" />
      )}
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
  showLabels,
  stroke,
  labelHalo,
  labelFill,
}: {
  markers: ScreenCity[];
  showLabels: boolean;
  stroke: string;
  labelHalo: string;
  labelFill: string;
}) {
  return (
    <g aria-hidden="true">
      {markers.map(({ city, x, y }) => (
        <g key={city.id} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
          <Marker
            city={city}
            stroke={stroke}
            showLabel={showLabels}
            labelHalo={labelHalo}
            labelFill={labelFill}
          />
        </g>
      ))}
    </g>
  );
});

/** Compact legend explaining the marker glyphs. Rendered next to the map. */
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
      <Item label="Capital">
        <path d={starPath(7)} fill={CAPITAL_FILL} stroke={stroke} strokeWidth={1} strokeLinejoin="round" />
      </Item>
      <Item label="Largest city">
        <circle r={5} fill={LARGEST_FILL} stroke={stroke} strokeWidth={1} />
      </Item>
      <Item label="Capital & largest">
        <path d={starPath(7)} fill={CAPITAL_FILL} stroke={stroke} strokeWidth={1} strokeLinejoin="round" />
        <circle r={2.4} fill={LARGEST_FILL} stroke={stroke} strokeWidth={0.5} />
      </Item>
      <Item label="National (large) vs subdivision (small)">
        <path d={starPath(7)} fill={CAPITAL_FILL} stroke={stroke} strokeWidth={1} strokeLinejoin="round" transform="translate(-3 0)" />
        <path d={starPath(4.5)} fill={CAPITAL_FILL} stroke={stroke} strokeWidth={0.8} strokeLinejoin="round" transform="translate(6 2)" />
      </Item>
      <Item label="Both levels (ring)">
        <circle r={9} fill="none" stroke={stroke} strokeWidth={0.9} strokeOpacity={0.85} />
        <path d={starPath(7)} fill={CAPITAL_FILL} stroke={stroke} strokeWidth={1} strokeLinejoin="round" />
      </Item>
    </div>
  );
}
