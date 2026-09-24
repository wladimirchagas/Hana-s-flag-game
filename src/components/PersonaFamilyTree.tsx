import { useMemo, useState } from "react";
import { COUNTRY_PERSONAS, PERSONA_FAMILY_TREE } from "../data/countryPersonas";
import {
  PERSONA_AVERAGES_NOTE,
  PERSONA_EDITION,
  PERSONA_GROUP_COLORS,
  PERSONA_GROUPS,
  PERSONA_TYPES,
  personaGroupByCode,
  personaGroupLabel,
  personaTypeByCode,
} from "../lib/countryPersonas";
import { PersonaGroupTip, PersonaTypeTip } from "./PersonaTip";

const W = 640;
const H = 400;
const PAD = { left: 44, right: 16, top: 16, bottom: 40 };

/**
 * The Country Personas "family tree" (playbook step 14): every classified country placed on the
 * two axes that explain most of the variation between the personas, coloured by group, with each
 * type's centre labelled. Hover a dot to preview the country, click or tap to select it. The
 * legends underneath explain every group and type on hover or tap (PersonaTip).
 */
export function PersonaFamilyTree({
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
  const points = PERSONA_FAMILY_TREE.countries;
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
  const [v1, v2] = PERSONA_FAMILY_TREE.explainedVariance;
  const focus = hover ?? selectedCode;
  const focusPoint = focus ? points[focus] : undefined;

  return (
    <div className="persona-tree">
      <svg
        className="persona-tree__svg"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Country personas map, edition ${PERSONA_EDITION}: countries placed by development and governance (across) and by scale and global reach (up), coloured by persona group`}
      >
        <line className="persona-tree__axis" x1={PAD.left} y1={H - PAD.bottom} x2={W - PAD.right} y2={H - PAD.bottom} />
        <line className="persona-tree__axis" x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={H - PAD.bottom} />
        <text className="persona-tree__axis-label" x={(W + PAD.left) / 2} y={H - 12} textAnchor="middle">
          Development and governance →
        </text>
        <text
          className="persona-tree__axis-label"
          x={14}
          y={(H - PAD.bottom + PAD.top) / 2}
          textAnchor="middle"
          transform={`rotate(-90 14 ${(H - PAD.bottom + PAD.top) / 2})`}
        >
          Scale and global reach →
        </text>
        {Object.entries(points).map(([code, [x, y]]) => {
          const p = COUNTRY_PERSONAS[code];
          const g = personaGroupByCode(p?.group);
          const t = personaTypeByCode(p?.type);
          const selected = code === selectedCode;
          return (
            <circle
              key={code}
              className={`persona-tree__dot${selected ? " persona-tree__dot--selected" : ""}`}
              cx={sx(x)}
              cy={sy(y)}
              r={selected ? 7 : 4.2}
              fill={g ? PERSONA_GROUP_COLORS[g.code] : "#999"}
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
              <title>{`${nameOf(code)} — ${g ? personaGroupLabel(g) : ""}${t && g && g.typeCodes.length > 1 ? ` · ${t.code} ${t.name}` : ""}`}</title>
            </circle>
          );
        })}
        {Object.entries(PERSONA_FAMILY_TREE.types).map(([code, [x, y]]) => (
          <text key={code} className="persona-tree__type-label" x={sx(x)} y={sy(y)} textAnchor="middle" dominantBaseline="middle">
            {code}
          </text>
        ))}
        {focus && focusPoint && (
          <text className="persona-tree__focus-label" x={sx(focusPoint[0])} y={sy(focusPoint[1]) - 11} textAnchor="middle">
            {nameOf(focus)}
          </text>
        )}
      </svg>

      <div className="persona-tree__legend" aria-label="Persona groups">
        {PERSONA_GROUPS.map((g) => (
          <PersonaGroupTip
            key={g.code}
            group={g}
            label={
              <>
                <span className="persona-badges__swatch" style={{ backgroundColor: PERSONA_GROUP_COLORS[g.code] }} aria-hidden="true" />
                {personaGroupLabel(g)}
              </>
            }
          />
        ))}
      </div>
      <div className="persona-tree__legend persona-tree__legend--types" aria-label="Persona types">
        {PERSONA_TYPES.map((t) => (
          <PersonaTypeTip
            key={t.code}
            type={t}
            label={
              <>
                <span className="persona-badges__swatch" style={{ backgroundColor: PERSONA_GROUP_COLORS[t.group] }} aria-hidden="true" />
                {`${t.code} ${t.name}`}
              </>
            }
          />
        ))}
      </div>
      <p className="persona-tree__caption">
        Each dot is a country, placed by its scores on four measures (development, governance, age
        structure relative to development, and scale) and drawn on the two directions that separate
        countries most ({Math.round(v1 * 100)}% and {Math.round(v2 * 100)}% of the variation). Labels mark
        the centre of each persona type. Hover or tap a persona for what it means. {PERSONA_AVERAGES_NOTE}
      </p>
    </div>
  );
}
