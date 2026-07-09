import { useEffect, useRef, useState } from "react";

/**
 * Keeps the Learn map-controls toolbar on a single line.
 *
 * On wide screens the wrapper is `display: contents`, so its children lay out
 * inline in the toolbar exactly as if this component weren't here. On narrow
 * screens (CSS breakpoint) the children collapse into a popover behind a ☰
 * button, so the toolbar never wraps to a second row. The switch is pure CSS —
 * the children are rendered once — see `.toolbar-overflow*` in LearnPage.css.
 */
export function ToolbarOverflow({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="toolbar-overflow" ref={ref}>
      <button
        type="button"
        className="toolbar-overflow__toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label="More map controls"
        aria-expanded={open}
        title="More controls"
      >
        ⋮
      </button>
      <div
        className={`toolbar-overflow__items${open ? " toolbar-overflow__items--open" : ""}`}
        // Close the popover after choosing a control on mobile (the inline
        // desktop layout ignores this — clicks there don't open a popover).
        onClick={() => setOpen(false)}
      >
        {children}
      </div>
    </div>
  );
}
