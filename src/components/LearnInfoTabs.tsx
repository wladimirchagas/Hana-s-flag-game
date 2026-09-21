/**
 * Tab strip for the Learn-mode country information panel.
 * Reuses the visual language of `.flag-tabs` (subdivision drill-in) so the
 * panel reads as the same family of navigation, not a second control system.
 */
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
  /** Defaults to every panel tab; subdivision drill-in passes Overview + Indices. */
  tabs?: readonly LearnPanelTabId[];
}) {
  return (
    <div className="flag-tabs learn-panel-tabs" role="tablist" aria-label="Country information">
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
  );
}
