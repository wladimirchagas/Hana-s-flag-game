import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCountries, type Country } from "../api/countries";
import { WorldProgressMap } from "../components/WorldProgressMap";
import "../App.css";
import "./LearnPage.css";

/**
 * Sandbox-style "Learn your flags" mode.
 *
 * Layout:
 *   - Top nav (← Home — global ThemeToggle and centred top toggle handled
 *     at the React root, so we only need the Home button here).
 *   - Main grid: searchable country list (left) + interactive world map
 *     (centre) + selected country detail panel with flag (right). Stacks
 *     on narrow viewports.
 *
 * Interaction:
 *   - Hover any country on the map → shows its name + flag in the detail
 *     panel as a transient preview.
 *   - Click a country on the map OR a row in the list → locks it as the
 *     selected country and highlights it on the map.
 *   - Tap the flag image → opens a full-screen viewer (SVG sources, so
 *     they scale to any size cleanly).
 *
 * The map omits the Confirm popover for this mode (selectable.onConfirm
 * is intentionally not supplied).
 */
export default function LearnPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hovered, setHovered] = useState<Country | null>(null);
  const [selected, setSelected] = useState<Country | null>(null);
  const [query, setQuery] = useState("");
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

  const filteredList = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter((c) => c.name.toLowerCase().includes(q));
  }, [countries, query]);

  // Show the hovered country in the detail panel if any (live preview), else
  // fall back to whatever the user last clicked.
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
    <div className="app learn">
      <div className="game-nav">
        <Link className="game-nav__home" to="/">
          ← Home
        </Link>
      </div>

      <main className="learn__card">
        <header className="learn__header">
          <h1 className="learn__title">Learn your flags</h1>
          <p className="learn__sub">
            No clock, no score — just hover or click any country to see its
            flag. Use the list to find tiny nations like Vatican City or
            Monaco that are hard to click on the map.
          </p>
        </header>

        <div className="learn__layout">
          <aside className="learn__finder" aria-label="Country list">
            <input
              type="text"
              className="learn__search"
              placeholder="Search 195 countries…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              inputMode="search"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <ul className="learn__list" role="listbox">
              {filteredList.length === 0 ? (
                <li className="learn__empty">No matches</li>
              ) : (
                filteredList.map((c) => {
                  const isSelected = selected?.code === c.code;
                  return (
                    <li key={c.code}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        className={`learn__item ${
                          isSelected ? "learn__item--active" : ""
                        }`}
                        onClick={() => {
                          setSelected(c);
                          setHovered(null);
                        }}
                        onMouseEnter={() => setHovered(c)}
                        onMouseLeave={() => setHovered(null)}
                      >
                        {c.name}
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </aside>

          <section className="learn__map" aria-label="World map">
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
          </section>

          <section className="learn__detail" aria-live="polite">
            {display ? (
              <>
                <h2 className="learn__detail-name">{display.name}</h2>
                <p className="learn__detail-continent">{display.continent}</p>
                <button
                  type="button"
                  className="learn__flag"
                  onClick={() => setZoomed(true)}
                  aria-label={`Enlarge ${display.name} flag`}
                >
                  <img
                    src={display.flagSvg}
                    alt=""
                    className="learn__flag-img"
                    draggable={false}
                  />
                  <span className="learn__flag-hint" aria-hidden="true">
                    ⤢ Click to enlarge
                  </span>
                </button>
              </>
            ) : (
              <div className="learn__detail-empty">
                <p>Hover or click a country on the map.</p>
                <p>Or pick one from the list on the left.</p>
              </div>
            )}
          </section>
        </div>
      </main>

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
