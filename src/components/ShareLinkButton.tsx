import { useEffect, useRef, useState } from "react";

/**
 * Copies the current page URL to the clipboard so the user can share the
 * exact view they're looking at (a game mode, or a country/era in Learn).
 * The address bar already reflects the view — this just makes sharing a
 * one-click action and discoverable.
 */
export function ShareLinkButton() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const handleClick = async () => {
    const url = window.location.href;
    try {
      // Prefer the native share sheet on mobile; fall back to clipboard.
      if (navigator.share) {
        await navigator.share({ url });
        return;
      }
      await navigator.clipboard.writeText(url);
    } catch {
      // User dismissed the share sheet, or clipboard is unavailable
      // (e.g. non-secure context). Fall back to a manual prompt.
      if (!navigator.share) window.prompt("Copy this link:", url);
      return;
    }
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      className="site-topbar__share"
      onClick={handleClick}
      aria-label="Share a link to this page"
      title="Share a link to this page"
    >
      {copied ? "✓ Copied" : "🔗 Share"}
    </button>
  );
}
