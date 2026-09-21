/**
 * Tab strip for the Learn-mode country information panel.
 * Single-line horizontal scroll with a trailing "…" when more tabs sit
 * off-screen to the right (and a leading "…" when scrolled away from the start).
 */
import { useCallback, useEffect, useRef, useState } from "react";
import {
  LEARN_PANEL_TAB_IDS,
  LEARN_PANEL_TAB_LABELS,
  type LearnPanelTabId,
} from "../lib/learnPanelTabs";

export function LearnInfoTabs({
  active,
  onChange,
  tabs = LEARN_PANEL_TAB_IDS,
}: {
  active: LearnPanelTabId;
  onChange: (tab: LearnPanelTabId) => void;
  /** Defaults to every panel tab; subdivision drill-in passes a smaller set. */
  tabs?: readonly LearnPanelTabId[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [moreStart, setMoreStart] = useState(false);
  const [moreEnd, setMoreEnd] = useState(false);

  const updateOverflow = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const epsilon = 2;
    setMoreStart(scrollLeft > epsilon);
    setMoreEnd(scrollLeft + clientWidth < scrollWidth - epsilon);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateOverflow();
    el.addEventListener("scroll", updateOverflow, { passive: true });
    const ro = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(updateOverflow)
      : null;
    ro?.observe(el);
    return () => {
      el.removeEventListener("scroll", updateOverflow);
      ro?.disconnect();
    };
  }, [updateOverflow, tabs]);

  // Keep the active tab visible when it changes (e.g. Show-dropdown sync).
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const activeBtn = el.querySelector<HTMLElement>(
      '[role="tab"][aria-selected="true"]',
    );
    activeBtn?.scrollIntoView({
      inline: "nearest",
      block: "nearest",
      behavior: "smooth",
    });
    // Re-measure after the scroll settles.
    const t = window.setTimeout(updateOverflow, 320);
    return () => window.clearTimeout(t);
  }, [active, updateOverflow]);

  return (
    <div
      className={`learn-panel-tabs-wrap${moreStart ? " learn-panel-tabs-wrap--more-start" : ""}${
        moreEnd ? " learn-panel-tabs-wrap--more-end" : ""
      }`}
    >
      {moreStart && (
        <span className="learn-panel-tabs__more learn-panel-tabs__more--start" aria-hidden="true">
          …
        </span>
      )}
      <div
        ref={scrollerRef}
        className="flag-tabs learn-panel-tabs"
        role="tablist"
        aria-label="Country information"
      >
        {tabs.map((id) => {
          const selected = id === active;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={selected}
              className={`flag-tabs__tab${selected ? " flag-tabs__tab--active" : ""}`}
              onClick={() => onChange(id)}
            >
              {LEARN_PANEL_TAB_LABELS[id]}
            </button>
          );
        })}
      </div>
      {moreEnd && (
        <span className="learn-panel-tabs__more learn-panel-tabs__more--end" aria-hidden="true">
          …
        </span>
      )}
    </div>
  );
}
