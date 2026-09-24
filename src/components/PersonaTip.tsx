import { useCallback, useId, useRef, type ReactNode } from "react";
import {
  PERSONA_AVERAGES_NOTE,
  PERSONA_TYPES,
  personaGroupLabel,
  personaGroupMeta,
  personaTypeLabel,
  personaTypeMeta,
  type PersonaGroup,
  type PersonaType,
} from "../lib/countryPersonas";

/**
 * Explanation tooltip for a Country Persona group or type. Hover (pointer) or focus/tap
 * (keyboard & touch) reveals it — CSS :hover / :focus-within on the anchor, no JS open state,
 * exactly like the fact-sheet membership badges — so a tap focuses the button and shows the tip
 * and tapping elsewhere dismisses it. Every tip ends with the national-averages note
 * (PERSONA_AVERAGES_NOTE): a persona describes a country's averages, never its people.
 */
export function PersonaTip({
  label,
  ariaLabel,
  title,
  line,
  portrait,
  meta,
  extra,
  className,
}: {
  /** What the trigger shows (text, or an ⓘ glyph with an ariaLabel). */
  label: ReactNode;
  ariaLabel?: string;
  title: string;
  line: string;
  portrait?: string;
  meta?: string;
  extra?: ReactNode;
  className?: string;
}) {
  const id = `persona-tip-${useId().replace(/:/g, "")}`;
  const tipRef = useRef<HTMLSpanElement>(null);
  // Layout only: once CSS has shown the tip, nudge it sideways so it never runs past the
  // viewport edge (a badge near the right of a phone screen would otherwise push the page
  // into horizontal scroll). Opening and closing stay pure CSS.
  const keepInViewport = useCallback(() => {
    requestAnimationFrame(() => {
      const el = tipRef.current;
      if (!el) return;
      el.style.transform = "";
      const r = el.getBoundingClientRect();
      if (!r.width) return;
      const gutter = 12;
      const vw = document.documentElement.clientWidth;
      let dx = 0;
      if (r.right > vw - gutter) dx = vw - gutter - r.right;
      if (r.left + dx < gutter) dx = gutter - r.left;
      if (dx) el.style.transform = `translateX(${Math.round(dx)}px)`;
    });
  }, []);
  return (
    <span
      className={`persona-tip-anchor${className ? ` ${className}` : ""}`}
      onMouseEnter={keepInViewport}
      onFocus={keepInViewport}
    >
      <button type="button" className="persona-tip-btn" aria-describedby={id} aria-label={ariaLabel}>
        {label}
      </button>
      <span id={id} ref={tipRef} role="tooltip" className="persona-tip">
        <strong className="persona-tip__title">{title}</strong>
        <span className="persona-tip__line">{line}</span>
        {portrait && <span className="persona-tip__body">{portrait}</span>}
        {meta && <span className="persona-tip__meta">{meta}</span>}
        {extra}
        <span className="persona-tip__note">{PERSONA_AVERAGES_NOTE}</span>
      </span>
    </span>
  );
}

/** Tooltip for a whole group, listing the types it contains. */
export function PersonaGroupTip({ group, label, ariaLabel, className }: {
  group: PersonaGroup;
  label: ReactNode;
  ariaLabel?: string;
  className?: string;
}) {
  const types = PERSONA_TYPES.filter((t) => t.group === group.code);
  return (
    <PersonaTip
      label={label}
      ariaLabel={ariaLabel}
      className={className}
      title={personaGroupLabel(group)}
      line={group.line}
      portrait={group.portrait}
      meta={personaGroupMeta(group)}
      extra={
        <span className="persona-tip__types">
          {types.length > 1 ? `Types: ${types.map((t) => personaTypeLabel(t)).join("; ")}` : "One type: this group has no stable subdivision."}
        </span>
      }
    />
  );
}

/** Tooltip for one type. */
export function PersonaTypeTip({ type, label, ariaLabel, className }: {
  type: PersonaType;
  label: ReactNode;
  ariaLabel?: string;
  className?: string;
}) {
  return (
    <PersonaTip
      label={label}
      ariaLabel={ariaLabel}
      className={className}
      title={personaTypeLabel(type)}
      line={type.line}
      portrait={type.portrait}
      meta={personaTypeMeta(type)}
    />
  );
}
