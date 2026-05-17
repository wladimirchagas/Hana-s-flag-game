import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCountries, type Country } from "../api/countries";
import { WorldProgressMap } from "../components/WorldProgressMap";
import { CountryDropdown } from "../components/CountryDropdown";
import "../App.css";
import "./LearnPage.css";

/**
 * Sandbox-style "Learn your flags" mode.
 *
 * Layout (full-screen):
 *   - World map fills the viewport edge-to-edge (no card chrome).
 *   - Floating panel anchored to the bottom-left of the viewport contains:
 *       • the selected (or hovered) country's flag and name
 *       • a country search dropdown at the bottom, opening upward
 *   - Top bar (Home button + global theme toggle) sits over the map.
 *
 * Interaction:
 *   - Hover any country on the map → live preview in the floating panel.
 *   - Click a country (map OR dropdown) → locks selection.
 *   - Tap the flag image → opens the fullscreen flag viewer (SVG scales).
 *   - Tiny nations (Vatican, Monaco, San Marino, Andorra, Liechtenstein,
 *     etc.) are reachable via the dropdown's search, since their map
 *     paths are too small to click reliably.
 *
 * The map omits the Confirm popover (selectable.onConfirm not supplied).
 */
export default function LearnPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hovered, setHovered] = useState<Country | null>(null);
  const [selected, setSelected] = useState<Country | null>(null);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await fetchCountries();
        if (cancelled) return;
        setCountries(list);
      } catch (e) {
        if (!cancelled) {
          setLoadError(e instanceof Error ? e.message : "Unknown error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Lock body scroll while the fullscreen flag viewer is open + close on Esc.
  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [zoomed]);

  const codeToCountry = useMemo(
    () => new Map(countries.map((c) => [c.code, c])),
    [countries],
  );
  const codes = useMemo(
    () => new Set(countries.map((c) => c.code)),
    [countries],
  );
  const names = useMemo(
    () => new Map(countries.map((c) => [c.code, c.name])),
    [countries],
  );

  // Hovered country wins (live preview); selected is the fallback "locked"
  // state. So moving the mouse over a different country temporarily shows it,
  // and leaving the map reverts to the last-clicked country.
  const display = hovered ?? selected;

  if (loadError) {
    return (
      <div className="app app--center">
        <main className="card card--error">
          <h1>Couldn’t load countries</h1>
          <p className="error-message">{loadError}</p>
          <p className="hint">Check your connection and refresh the page.</p>
          <p className="game-home-link">
            <Link to="/">← Back to home</Link>
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="learn-fs">
      <div className="game-nav">
        <Link className="game-nav__home" to="/">
          ← Home
        </Link>
      </div>

      <div className="learn-fs__map" aria-label="World map">
        <WorldProgressMap
          countryResults={{}}
          selectedCode={display?.code ?? null}
          disabled={countries.length === 0}
          selectable={{
            codes,
            names,
            onSelect: (code) => {
              const c = codeToCountry.get(code);
              if (c) {
                setSelected(c);
                setHovered(null);
              }
            },
            onHover: (code) => {
              if (!code) {
                setHovered(null);
                return;
              }
              const c = codeToCountry.get(code);
              if (c) setHovered(c);
            },
          }}
        />
      </div>

      <aside className="learn-fs__panel" aria-live="polite">
        {/* Detail section — top of panel */}
        <div className="learn-fs__detail">
          {display ? (
            <>
              <p className="learn-fs__continent">{display.continent}</p>
              <h2 className="learn-fs__name">{display.name}</h2>
              <button
                type="button"
                className="learn-fs__flag"
                onClick={() => setZoomed(true)}
                aria-label={`Enlarge ${display.name} flag`}
              >
                <img
                  src={display.flagSvg}
                  alt=""
                  className="learn-fs__flag-img"
                  draggable={false}
                />
                <span className="learn-fs__flag-hint" aria-hidden="true">
                  ⤢ Click to enlarge
                </span>
              </button>
            </>
          ) : (
            <div className="learn-fs__empty">
              <p className="learn-fs__empty-title">Learn your flags</p>
              <p className="learn-fs__empty-sub">
                Hover or click any country on the map — or use the search
                below to find tiny nations like Vatican City.
              </p>
            </div>
          )}
        </div>

        {/* Search section — bottom of panel; dropdown opens upward so the
            list rises into view instead of pushing off the bottom edge. */}
        <div className="learn-fs__search">
          <CountryDropdown
            countries={countries}
            value={selected}
            onChange={(c) => {
              setSelected(c);
              setHovered(null);
            }}
            disabled={countries.length === 0}
            label="Find a country"
            listPlacement="up"
          />
        </div>
      </aside>

      {zoomed && display && (
        <div
          className="flag-zoom"
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged ${display.name} flag`}
          onClick={() => setZoomed(false)}
        >
          <img
            src={display.flagSvg}
            alt=""
            className="flag-zoom__img"
            draggable={false}
          />
          <button
            type="button"
            className="flag-zoom__close"
            onClick={(e) => {
              e.stopPropagation();
              setZoomed(false);
            }}
            aria-label="Close enlarged flag"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
