export function popoverBounds(
  anchor: { left: number; right: number; top: number; bottom: number },
  viewport: { left: number; top: number; width: number; height: number },
  preferredWidth: number,
) {
  const gap = 8;
  const width = Math.min(preferredWidth, Math.max(0, viewport.width - gap * 2));
  const left = Math.max(viewport.left + gap,
    Math.min(anchor.left, viewport.left + viewport.width - width - gap));
  const lower = viewport.top + viewport.height - gap;
  const upper = viewport.top + gap;
  const below = Math.max(0, lower - Math.max(upper, anchor.bottom + gap));
  const above = Math.max(0, Math.min(lower, anchor.top - gap) - upper);
  const upwards = below < 160 && above > below;
  const maxHeight = Math.min(480, upwards ? above : below);
  const top = upwards
    ? Math.min(lower, anchor.top - gap) - maxHeight
    : Math.max(upper, Math.min(lower, anchor.bottom + gap));
  return { left, top, width, maxHeight };
}
