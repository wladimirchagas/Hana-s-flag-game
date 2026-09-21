import { useMemo, useRef, useState } from "react";
import type { Country } from "../api/countries";
import {
  DEMOCRACY_INDEX_KEYS,
  type DemocracyIndexKey,
  democracyChartPoints,
  formatDemocracyAxisValue,
  getDemocracyAxisBands,
  getDemocracyAxisDomain,
  getDemocracyIndexLabel,
} from "../lib/democracyColors";
import { GridImage } from "./GridImage";

export type DemocracyIndexChartProps = {
  countries: readonly Country[];
  xKey: DemocracyIndexKey;
  yKey: DemocracyIndexKey;
  onXKeyChange: (key: DemocracyIndexKey) => void;
  onYKeyChange: (key: DemocracyIndexKey) => void;
  /** Selected country code (map / dropdown / grid) — blinks on the chart. */
  selectedCode: string | null;
  /** Transient hover from the chart; parent mirrors map hover. */
  hoveredCode: string | null;
  onSelect: (code: string) => void;
  onHover: (code: string | null) => void;
};

const PAD = { top: 16, right: 18, bottom: 64, left: 52 };
const VIEW_W = 960;
const VIEW_H = 500;

function scaleLinear(
  value: number,
  domain: { min: number; max: number },
  range: { min: number; max: number },
): number {
  const t = (value - domain.min) / (domain.max - domain.min || 1);
  return range.min + t * (range.max - range.min);
}

function formatTick(key: DemocracyIndexKey, value: number): string {
  if (key === "v-dem" || key === "hdi" || key === "gender-gap" || key === "gpi") return value.toFixed(1);
  if (key === "economist") return value.toFixed(0);
  if (key === "perception") return value > 0 ? `+${value}` : `${value}`;
  return `${Math.round(value)}`;
}

export function DemocracyIndexChart({
  countries,
  xKey,
  yKey,
  onXKeyChange,
  onYKeyChange,
  selectedCode,
  hoveredCode,
  onSelect,
  onHover,
}: DemocracyIndexChartProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    code: string;
    name: string;
    xLabel: string;
    yLabel: string;
    left: number;
    top: number;
    below: boolean;
  } | null>(null);

  const byCode = useMemo(() => {
    const m = new Map<string, Country>();
    for (const c of countries) m.set(c.code, c);
    return m;
  }, [countries]);

  const xDomain = useMemo(() => getDemocracyAxisDomain(xKey), [xKey]);
  const yDomain = useMemo(() => getDemocracyAxisDomain(yKey), [yKey]);
  const xBands = useMemo(() => getDemocracyAxisBands(xKey), [xKey]);
  const yBands = useMemo(() => getDemocracyAxisBands(yKey), [yKey]);

  const plot = {
    x0: PAD.left,
    x1: VIEW_W - PAD.right,
    y0: PAD.top,
    y1: VIEW_H - PAD.bottom,
  };

  const points = useMemo(() => {
    return democracyChartPoints(xKey, yKey)
      .map((p) => {
        const country = byCode.get(p.code);
        if (!country) return null;
        const cx = scaleLinear(p.x, xDomain, { min: plot.x0, max: plot.x1 });
        const cy = scaleLinear(p.y, yDomain, { min: plot.y1, max: plot.y0 });
        return { ...p, country, cx, cy };
      })
      .filter((p): p is NonNullable<typeof p> => p != null);
  }, [xKey, yKey, byCode, xDomain, yDomain, plot.x0, plot.x1, plot.y0, plot.y1]);

  const xTicks = useMemo(() => {
    const n = 5;
    return Array.from({ length: n + 1 }, (_, i) => {
      const v = xDomain.min + ((xDomain.max - xDomain.min) * i) / n;
      return {
        value: v,
        x: scaleLinear(v, xDomain, { min: plot.x0, max: plot.x1 }),
      };
    });
  }, [xDomain, plot.x0, plot.x1]);

  const yTicks = useMemo(() => {
    const n = 5;
    return Array.from({ length: n + 1 }, (_, i) => {
      const v = yDomain.min + ((yDomain.max - yDomain.min) * i) / n;
      return {
        value: v,
        y: scaleLinear(v, yDomain, { min: plot.y1, max: plot.y0 }),
      };
    });
  }, [yDomain, plot.x0, plot.x1, plot.y0, plot.y1]);

  const activeCode = hoveredCode ?? selectedCode;

  const showTipFor = (code: string, cx: number, cy: number) => {
    const pt = points.find((p) => p.code === code);
    const country = byCode.get(code);
    if (!pt || !country || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const left = (cx / VIEW_W) * rect.width;
    const top = (cy / VIEW_H) * rect.height;
    setTooltip({
      code,
      name: country.name,
      xLabel: formatDemocracyAxisValue(xKey, pt.xIndex),
      yLabel: formatDemocracyAxisValue(yKey, pt.yIndex),
      left,
      top,
      // Top-third markers flip the tip below so it stays legible.
      below: cy < VIEW_H * 0.28,
    });
  };

  const clearTip = () => setTooltip(null);

  return (
    <section
      className="democracy-index-chart"
      aria-label="Democracy index chart"
    >
      <div className="democracy-index-chart__axes">
        <label className="democracy-index-chart__axis-pick">
          <span className="democracy-index-chart__axis-pick-label">X axis</span>
          <select
            className="democracy-index-chart__select"
            value={xKey}
            onChange={(e) => onXKeyChange(e.target.value as DemocracyIndexKey)}
            aria-label="Chart X axis index"
          >
            {DEMOCRACY_INDEX_KEYS.map((key) => (
              <option key={key} value={key}>
                {getDemocracyIndexLabel(key)}
              </option>
            ))}
          </select>
        </label>
        <label className="democracy-index-chart__axis-pick">
          <span className="democracy-index-chart__axis-pick-label">Y axis</span>
          <select
            className="democracy-index-chart__select"
            value={yKey}
            onChange={(e) => onYKeyChange(e.target.value as DemocracyIndexKey)}
            aria-label="Chart Y axis index"
          >
            {DEMOCRACY_INDEX_KEYS.map((key) => (
              <option key={key} value={key}>
                {getDemocracyIndexLabel(key)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="democracy-index-chart__frame" ref={frameRef}>
        <svg
          className="democracy-index-chart__svg"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`${getDemocracyIndexLabel(yKey)} versus ${getDemocracyIndexLabel(xKey)}`}
        >
          {/* Plot background */}
          <rect
            x={plot.x0}
            y={plot.y0}
            width={plot.x1 - plot.x0}
            height={plot.y1 - plot.y0}
            className="democracy-index-chart__plot-bg"
          />

          {/* Soft classification bands (X) */}
          {xBands.map((band, i) => {
            const x0 = scaleLinear(band.min, xDomain, { min: plot.x0, max: plot.x1 });
            const x1 = scaleLinear(band.max, xDomain, { min: plot.x0, max: plot.x1 });
            return (
              <rect
                key={`xb-${band.label}`}
                x={x0}
                y={plot.y0}
                width={Math.max(0, x1 - x0)}
                height={plot.y1 - plot.y0}
                className={
                  i % 2 === 0
                    ? "democracy-index-chart__band democracy-index-chart__band--even"
                    : "democracy-index-chart__band democracy-index-chart__band--odd"
                }
              />
            );
          })}

          {/* Soft classification bands (Y) — drawn as horizontal strips */}
          {yBands.map((band, i) => {
            const yHi = scaleLinear(band.max, yDomain, { min: plot.y1, max: plot.y0 });
            const yLo = scaleLinear(band.min, yDomain, { min: plot.y1, max: plot.y0 });
            return (
              <rect
                key={`yb-${band.label}`}
                x={plot.x0}
                y={yHi}
                width={plot.x1 - plot.x0}
                height={Math.max(0, yLo - yHi)}
                className={
                  i % 2 === 0
                    ? "democracy-index-chart__band-y democracy-index-chart__band-y--even"
                    : "democracy-index-chart__band-y democracy-index-chart__band-y--odd"
                }
              />
            );
          })}

          {/* Grid + numeric ticks */}
          {xTicks.map((t) => (
            <g key={`xt-${t.value}`}>
              <line
                x1={t.x}
                y1={plot.y0}
                x2={t.x}
                y2={plot.y1}
                className="democracy-index-chart__grid"
              />
              <text
                x={t.x}
                y={plot.y1 + 14}
                textAnchor="middle"
                className="democracy-index-chart__tick"
              >
                {formatTick(xKey, t.value)}
              </text>
            </g>
          ))}
          {yTicks.map((t) => (
            <g key={`yt-${t.value}`}>
              <line
                x1={plot.x0}
                y1={t.y}
                x2={plot.x1}
                y2={t.y}
                className="democracy-index-chart__grid"
              />
              <text
                x={plot.x0 - 8}
                y={t.y + 4}
                textAnchor="end"
                className="democracy-index-chart__tick"
              >
                {formatTick(yKey, t.value)}
              </text>
            </g>
          ))}

          {/* Classification labels along X — skip bands too narrow for text. */}
          {xBands.map((band) => {
            const x0 = scaleLinear(band.min, xDomain, { min: plot.x0, max: plot.x1 });
            const x1 = scaleLinear(band.max, xDomain, { min: plot.x0, max: plot.x1 });
            if (x1 - x0 < 36) return null;
            const x = (x0 + x1) / 2;
            return (
              <text
                key={`xl-${band.label}`}
                x={x}
                y={plot.y1 + 36}
                textAnchor="middle"
                className="democracy-index-chart__band-label"
              >
                {band.label}
              </text>
            );
          })}

          {/* Classification labels along Y — horizontal, inside the plot,
              only when the band is tall enough that the label fits. */}
          {yBands.map((band) => {
            const yHi = scaleLinear(band.max, yDomain, { min: plot.y1, max: plot.y0 });
            const yLo = scaleLinear(band.min, yDomain, { min: plot.y1, max: plot.y0 });
            const bandH = yLo - yHi;
            if (bandH < 22) return null;
            const y = (yHi + yLo) / 2;
            return (
              <text
                key={`yl-${band.label}`}
                x={plot.x0 + 8}
                y={y + 4}
                textAnchor="start"
                className="democracy-index-chart__band-label democracy-index-chart__band-label--y"
              >
                {band.label}
              </text>
            );
          })}

          {/* Axes */}
          <line
            x1={plot.x0}
            y1={plot.y1}
            x2={plot.x1}
            y2={plot.y1}
            className="democracy-index-chart__axis"
          />
          <line
            x1={plot.x0}
            y1={plot.y0}
            x2={plot.x0}
            y2={plot.y1}
            className="democracy-index-chart__axis"
          />
        </svg>

        {/* Flag markers — HTML so real flag images paint at correct aspect */}
        <div className="democracy-index-chart__markers" aria-hidden={false}>
          {points.map((p) => {
            const isSelected = selectedCode === p.code;
            const isActive = activeCode === p.code;
            return (
              <button
                key={p.code}
                type="button"
                className={
                  "democracy-index-chart__marker" +
                  (isSelected ? " democracy-index-chart__marker--selected" : "") +
                  (isActive ? " democracy-index-chart__marker--active" : "")
                }
                style={{
                  left: `${(p.cx / VIEW_W) * 100}%`,
                  top: `${(p.cy / VIEW_H) * 100}%`,
                  zIndex: isActive || isSelected ? 3 : 1,
                }}
                aria-label={`${p.country.name}: X ${formatDemocracyAxisValue(xKey, p.xIndex)}, Y ${formatDemocracyAxisValue(yKey, p.yIndex)}`}
                aria-pressed={isSelected}
                onClick={() => onSelect(p.code)}
                onMouseEnter={() => {
                  onHover(p.code);
                  showTipFor(p.code, p.cx, p.cy);
                }}
                onMouseLeave={() => {
                  onHover(null);
                  clearTip();
                }}
                onFocus={() => {
                  onHover(p.code);
                  showTipFor(p.code, p.cx, p.cy);
                }}
                onBlur={() => {
                  onHover(null);
                  clearTip();
                }}
              >
                {isSelected && (
                  <span className="democracy-index-chart__pulse" aria-hidden="true">
                    <span className="democracy-index-chart__pulse-ring" />
                    <span className="democracy-index-chart__pulse-ring democracy-index-chart__pulse-ring--2" />
                  </span>
                )}
                <span className="democracy-index-chart__flag">
                  <GridImage
                    key={p.country.flagSvg}
                    src={p.country.flagSvg}
                    alt=""
                    className="democracy-index-chart__flag-img"
                  />
                </span>
              </button>
            );
          })}
        </div>

        {tooltip && (
          <div
            className={
              "democracy-index-chart__tooltip" +
              (tooltip.below ? " democracy-index-chart__tooltip--below" : "")
            }
            style={{
              left: tooltip.left,
              top: tooltip.top,
            }}
            role="tooltip"
          >
            <strong className="democracy-index-chart__tooltip-name">{tooltip.name}</strong>
            <span className="democracy-index-chart__tooltip-row">
              <span className="democracy-index-chart__tooltip-axis">X</span>
              {getDemocracyIndexLabel(xKey)}: {tooltip.xLabel}
            </span>
            <span className="democracy-index-chart__tooltip-row">
              <span className="democracy-index-chart__tooltip-axis">Y</span>
              {getDemocracyIndexLabel(yKey)}: {tooltip.yLabel}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
