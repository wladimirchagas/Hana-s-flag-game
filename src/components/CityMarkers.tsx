import { memo } from "react";
import { type PlacedCity, isNational, isSubnational } from "../lib/cityRoles";

/**
 * City-overlay markers for the Learn-mode maps. The overlay shows CAPITALS ONLY:
 *
 *   ★ large salmon star → a national capital
 *   ★ small gold star   → a subdivision capital
 *   thin outer ring     → a city that is BOTH a national and a subdivision capital
 *                         (e.g. a state capital that is also the national capital)
 *
 * HARD RULE — the overlay is PURELY DECORATIVE and MUST NOT capture pointer
 * events (see CLAUDE.md "City overlay must never block selection"). Every element
 * here carries `pointer-events: none` so a marker can never sit above the
 * interactive subdivision/country layer and swallow a selection click — which
 * previously made small subdivisions fully covered by their capital marker (e.g.
 * Beijing, Shanghai) impossible to select. Names are therefore NOT revealed by
 * interacting with the marker; instead the parent map passes `activeCode` (the
 * hovered or selected territory) and the label for the matching marker is shown.
 * This keeps clicks flowing to the map while still revealing a capital's name.
 *
 * This component projects nothing itself: the parent map converts each city to
 * pixel coordinates (handling its own zoom / rotation / south-up transforms) and
 * passes finished screen positions here, so markers stay a constant pixel size
 * regardless of zoom — they are never enlarged or shrunk with the map.
 */

// National-capital stars use the game's coral/salmon accent (--coral, #ff6b6b —
// the same warm tone as the headings and mascot); subdivision-capital stars stay
// gold. The colour reinforces the size distinction (national = larger + salmon,
// subdivision = smaller + gold).
const NATIONAL_CAPITAL_FILL = "#ff6b6b"; // salmon / coral
const CAPITAL_FILL = "#f2b50a"; // gold (subdivision capitals)

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
  const R = big ? 12 : 8; // outer radius (constant px)
  const dualLevel = isNational(r) && isSubnational(r);
  const sw = big ? 1.4 : 1.1;
  const fill = big ? NATIONAL_CAPITAL_FILL : CAPITAL_FILL;

  const label = city.note ? `${city.name} · ${city.note}` : city.name;

  return (
    // HARD RULE: the whole marker group is non-interactive so it can never block
    // a selection click on the map beneath it.
    <g style={{ pointerEvents: "none" }}>
      {/* Accessible name (no tooltip needed — the marker is non-interactive). */}
      <title>{label}</title>
      {/* Dual-level ring: the city is both a national and a subdivision capital. */}
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
      <path
        d={starPath(R)}
        fill={fill}
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      {showLabel && (
        <text
          x={R * 1.4 + 2}
          y={0}
          dominantBaseline="central"
          fontSize={big ? 14 : 12}
          fontWeight={big ? 700 : 600}
          fill={labelFill}
          stroke={labelHalo}
          strokeWidth={3.4}
          paintOrder="stroke"
          strokeLinejoin="round"
        >
          {label}
        </text>
      )}
    </g>
  );
}

export const CityMarkers = memo(function CityMarkers({
  markers,
  activeCode,
  stroke,
  labelHalo,
  labelFill,
}: {
  markers: ScreenCity[];
  /** ISO code of the hovered/selected territory; that marker's name is revealed. */
  activeCode?: string | null;
  stroke: string;
  labelHalo: string;
  labelFill: string;
}) {
  return (
    // Non-interactive container — the whole overlay is decorative (see HARD RULE).
    <g style={{ pointerEvents: "none" }} aria-hidden="true">
      {markers.map(({ city, x, y }) => {
        const show = !!activeCode && city.ownerCode === activeCode;
        return (
          <g key={city.id} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
            <Marker
              city={city}
              stroke={stroke}
              showLabel={show}
              labelHalo={labelHalo}
              labelFill={labelFill}
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
        <path d={starPath(8)} fill={NATIONAL_CAPITAL_FILL} stroke={stroke} strokeWidth={1} strokeLinejoin="round" />
      </Item>
      <Item label="Subdivision capital">
        <path d={starPath(5.5)} fill={CAPITAL_FILL} stroke={stroke} strokeWidth={0.9} strokeLinejoin="round" />
      </Item>
      <Item label="Both (national & subdivision)">
        <circle r={9} fill="none" stroke={stroke} strokeWidth={0.9} strokeOpacity={0.85} />
        <path d={starPath(7)} fill={NATIONAL_CAPITAL_FILL} stroke={stroke} strokeWidth={1} strokeLinejoin="round" />
      </Item>
      <Item label="Hover or select a territory to see its capital">
        <path d={starPath(7)} fill={NATIONAL_CAPITAL_FILL} stroke={stroke} strokeWidth={1} strokeLinejoin="round" />
      </Item>
    </div>
  );
}
