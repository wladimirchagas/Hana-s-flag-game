import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { error: Error | null };

/**
 * Top-level error boundary.
 *
 * React unmounts the WHOLE tree when a render error reaches the root with no
 * boundary above it — the user is left staring at the page background with no
 * message, no reload button and nothing to report. That is precisely how the
 * Learn-mode render loop presented: "the screen goes completely blank" (2026-08).
 * The loop itself is fixed at source (see HistoricalMap's onDataLoaded), but a
 * blank page must never be the failure mode for the NEXT bug either, so this
 * boundary turns any uncaught render error into a card that says what happened
 * and offers a reload.
 *
 * It deliberately shows the error's message: when a crash only reproduces on a
 * user's own device, that text is the one piece of evidence they can screenshot.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Keep the full component stack in the console for anyone with dev tools open.
    console.error("Uncaught render error:", error, info.componentStack);
    // This boundary sits ABOVE ThemeProvider (so a crash in a provider is caught
    // too), which means the provider's effect that sets `data-theme` has been
    // torn down by the time the card renders — a dark-mode user would get a
    // white card. Re-apply the persisted choice ourselves; nothing else owns the
    // attribute once the tree below is gone.
    try {
      const stored = localStorage.getItem("flagGame.theme");
      if (stored === "dark" || stored === "light")
        document.documentElement.setAttribute("data-theme", stored);
    } catch {
      // Storage can throw in private mode; the light palette is a fine fallback.
    }
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    return (
      <div className="app app--center">
        <main className="card card--error">
          <h1>Something went wrong</h1>
          <p className="error-message">{error.message || String(error)}</p>
          <p className="hint">
            Reloading usually fixes it. If it keeps happening, a screenshot of this
            message helps us track it down.
          </p>
          <p className="game-home-link">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </p>
        </main>
      </div>
    );
  }
}
