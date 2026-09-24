import { useMemo, useState } from "react";
import { COUNTRY_PERSONAS } from "../data/countryPersonas";
import {
  PERSONA_AVERAGES_NOTE,
  PERSONA_EDITION,
  PERSONA_MAP,
  PERSONAS,
  personaByCode,
  personaColor,
  personaLabel,
} from "../lib/countryPersonas";
import { PersonaInfoTip, PersonaSwatch } from "./PersonaTip";

const W = 640;
const H = 420;
const PAD = { left: 44, right: 16, top: 16, bottom: 40 };

/**
 * The Country Personas map: every classified country placed so that similar countries sit close
 * together (classical multidimensional scaling of the persona similarity), coloured by persona,
 * with each persona's centre labelled by its number. Hover a dot to preview the country, click or
 * tap to select it; the selected or hovered country's persona stays bright while the rest fade.
 * The legend underneath explains every persona on hover or tap (PersonaInfoTip).
 */
export function PersonaMapChart({
  nameOf,
  selectedCode,
  onSelect,
  onHover,
}: {
  nameOf: (code: string) => string;
  selectedCode: string | null;
  onSelect: (code: string) => void;
  onHover: (code: string | null) => void;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const [legendFocus, setLegendFocus] = useState<string | null>(null);
  const points = PERSONA_MAP.countries;
  const { sx, sy } = useMemo(() => {
    const xs = Object.values(points).map((p) => p[0]);
    const ys = Object.values(points).map((p) => p[1]);
    const [x0, x1] = [Math.min(...xs), Math.max(...xs)];
    const [y0, y1] = [Math.min(...ys), Math.max(...ys)];
    return {
      sx: (x: number) => PAD.left + ((x - x0) / (x1 - x0)) * (W - PAD.left - PAD.right),
      sy: (y: number) => H - PAD.bottom - ((y - y0) / (y1 - y0)) * (H - PAD.top - PAD.bottom),
    };
  }, [points]);
  const [v1, v2] = PERSONA_MAP.explainedVariance;
  const [axisX, axisY] = PERSONA_MAP.axes;
  const focus = hover ?? selectedCode;
  const focusPoint = focus ? points[focus] : undefined;
  const focusPersona = legendFocus ?? (focus ? COUNTRY_PERSONAS[focus]?.persona : undefined) ?? null;

  return (
    <div className="persona-map">
      <svg
        className="persona-map__svg"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Country personas map, edition ${PERSONA_EDITION}: countries placed so that similar countries sit close together, coloured by persona. Across: ${axisX} Up: ${axisY}`}
      >
        <line className="persona-map__axis" x1={PAD.left} y1={H - PAD.bottom} x2={W - PAD.right} y2={H - PAD.bottom} />
        <line className="persona-map__axis" x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={H - PAD.bottom} />
        <text className="persona-map__axis-label" x={(W + PAD.left) / 2} y={H - 12} textAnchor="middle">
          {axisX}
        </text>
        <text
          className="persona-map__axis-label"
          x={14}
          y={(H - PAD.bottom + PAD.top) / 2}
          textAnchor="middle"
          transform={`rotate(-90 14 ${(H - PAD.bottom + PAD.top) / 2})`}
        >
          {axisY}
        </text>
        {Object.entries(points).map(([code, [x, y]]) => {
          const p = COUNTRY_PERSONAS[code];
          const persona = personaByCode(p?.persona);
          const selected = code === selectedCode;
          const faded = focusPersona !== null && p?.persona !== focusPersona;
          return (
            <circle
              key={code}
              className={`persona-map__dot${selected ? " persona-map__dot--selected" : ""}${faded ? " persona-map__dot--faded" : ""}`}
              cx={sx(x)}
              cy={sy(y)}
              r={selected ? 7 : 4.2}
              fill={personaColor(persona?.code) ?? "#999"}
              onMouseEnter={() => {
                setHover(code);
                onHover(code);
              }}
              onMouseLeave={() => {
                setHover(null);
                onHover(null);
              }}
              onClick={() => onSelect(code)}
            >
              <title>{`${nameOf(code)} — ${persona ? personaLabel(persona) : ""}`}</title>
            </circle>
          );
        })}
        {Object.entries(PERSONA_MAP.personas).map(([code, [x, y]]) => (
          <text
            key={code}
            className={`persona-map__persona-label${focusPersona !== null && code !== focusPersona ? " persona-map__persona-label--faded" : ""}`}
            x={sx(x)}
            y={sy(y)}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {code}
          </text>
        ))}
        {focus && focusPoint && (
          <text className="persona-map__focus-label" x={sx(focusPoint[0])} y={sy(focusPoint[1]) - 11} textAnchor="middle">
            {nameOf(focus)}
          </text>
        )}
      </svg>

      <ul className="persona-map__legend" aria-label="Personas">
        {PERSONAS.map((p) => (
          <li
            key={p.code}
            className="persona-map__legend-item"
            onMouseEnter={() => setLegendFocus(p.code)}
            onMouseLeave={() => setLegendFocus(null)}
            onFocus={() => setLegendFocus(p.code)}
            onBlur={() => setLegendFocus(null)}
          >
            <PersonaInfoTip
              persona={p}
              label={
                <>
                  <PersonaSwatch color={personaColor(p.code)} />
                  {personaLabel(p)}
                </>
              }
            />
          </li>
        ))}
      </ul>
      <p className="persona-map__caption">
        Each dot is a country, placed so that countries with similar data sit close together. The two
        directions shown separate countries most ({Math.round(v1 * 100)}% and {Math.round(v2 * 100)}% of
        the variation between personas); numbers mark the centre of each persona. Hover or tap a persona
        for what it means. {PERSONA_AVERAGES_NOTE}
      </p>
    </div>
  );
}
