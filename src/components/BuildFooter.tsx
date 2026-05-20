/**
 * Persistent build-info footer rendered on every page.
 *
 * Shows the short git SHA + a localized timestamp of when the bundle was
 * built. Lets you (and users reporting bugs) tell at a glance whether the
 * site they're looking at has the latest commit deployed — handy after
 * pushing a fix and wondering if GitHub Pages has caught up.
 *
 * Values come from compile-time `define`d constants in vite.config.ts:
 *   __BUILD_COMMIT__  short SHA (or 'dev' when run locally with no git)
 *   __BUILD_ISO__     ISO 8601 build timestamp; reformatted client-side
 *                     into the user's local time + locale conventions.
 */
export function BuildFooter() {
  const commit = __BUILD_COMMIT__;
  const builtAt = new Date(__BUILD_ISO__);

  // Format in the visitor's local time + locale. The 'medium' style hits
  // a decent sweet spot — "May 18, 2026, 6:48:23 AM" in en-US, "18 mai
  // 2026 à 06:48:23" in fr-FR, etc.
  const localTime = builtAt.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "medium",
  });

  // Link the commit short-SHA to its GitHub diff so people can quickly
  // jump to what changed in the deploy they're seeing.
  const commitHref =
    commit && commit !== "dev"
      ? `https://github.com/wladimirchagas/Hana-s-flag-game/commit/${commit}`
      : null;

  return (
    <footer className="build-footer" role="contentinfo" aria-label="Build info">
      <span className="build-footer__label">Build</span>{" "}
      {commitHref ? (
        <a
          className="build-footer__sha"
          href={commitHref}
          target="_blank"
          rel="noreferrer noopener"
          title="View this commit on GitHub"
        >
          {commit}
        </a>
      ) : (
        <span className="build-footer__sha">{commit}</span>
      )}{" "}
      <span className="build-footer__time" title={builtAt.toISOString()}>
        · {localTime}
      </span>
      <button
        type="button"
        className="build-footer__refresh"
        onClick={() => window.location.reload()}
        title="Hard refresh to get the latest version"
        aria-label="Refresh page"
      >
        ↺
      </button>
    </footer>
  );
}
