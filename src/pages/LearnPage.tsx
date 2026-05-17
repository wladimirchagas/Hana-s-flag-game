import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCountries, type Country } from "../api/countries";
import { WorldProgressMap } from "../components/WorldProgressMap";
import { HistoricalMap } from "../components/HistoricalMap";
import { CountryDropdown } from "../components/CountryDropdown";
import { EraSlider } from "../components/EraSlider";
import {
  DEFAULT_ERA_ID,
  getEra,
  polityInfo,
  polityModernName,
  type Era,
} from "../lib/historicalEras";
import "../App.css";
import "./LearnPage.css";

/**
 * Learn-mode sandbox with a historical era slider.
 *
 * Two map back-ends:
 *  - WorldProgressMap (modern world-atlas) is rendered when era === "today".
 *  - HistoricalMap (hand-curated GeoJSON per era from
 *    aourednik/historical-basemaps) is rendered for every other era.
 *
 * Selection model differs slightly:
 *  - Modern: a Country object (ISO alpha-2 code, modern flag URL).
 *  - Historical: a polity name string plus lookup in POLITY_REGISTRY for
 *    flag / continent / note.
 *
 * Default era is always "today" so first-time visitors see the current
 * world. Switching eras resets the current selection.
 */

type ModernSelection = { kind: "modern"; country: Country };
type HistoricalSelection = {
  kind: "historical";
  name: string;
  flag?: string;
  continent?: string;
  note?: string;
};
type Selection = ModernSelection | HistoricalSelection;

function selectionName(s: Selection): string {
  return s.kind === "modern" ? s.country.name : s.name;
}
function selectionContinent(s: Selection): string {
  return s.kind === "modern" ? s.country.continent : s.continent ?? "Historical";
}
function selectionFlag(s: Selection, baseUrl: string): string | null {
  if (s.kind === "modern") return s.country.flagSvg;
  if (!s.flag) return null;
  // Historical selections may carry either a relative asset path (curated
  // historical flag PNG in /public) or an absolute URL (modern flagcdn flag,
  // used when we fall back to a modern country's flag for a historical name).
  if (/^https?:\/\//.test(s.flag) || s.flag.startsWith("data:")) return s.flag;
  return `${baseUrl}${s.flag}`;
}
function selectionNote(s: Selection): string | undefined {
  return s.kind === "historical" ? s.note : undefined;
}

export default function LearnPage() {
  const [eraId, setEraId] = useState<Era["id"]>(DEFAULT_ERA_ID);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hovered, setHovered] = useState<Selection | null>(null);
  const [selected, setSelected] = useState<Selection | null>(null);
  const [zoomed, setZoomed] = useState(false);

  const baseUrl = import.meta.env.BASE_URL;
  const era = useMemo(() => getEra(eraId), [eraId]);
  const isModernEra = !era.dataUrl;

  // Modern countries are loaded once on mount (used for the "Today" era).
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

  // Reset selection/hover when the era changes — entities don't carry over.
  useEffect(() => {
    setSelected(null);
    setHovered(null);
  }, [eraId]);

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

  // Case-insensitive name→Country lookup, used to resolve historical polity
  // NAMEs to a modern flag (via `modernName` in the registry or the
  // MODERN_NAME_ALIASES table). Lets us cover hundreds of post-1815
  // polities — colonies, German principalities, modern country names —
  // without hand-curating a flag image for each one.
  const countryByName = useMemo(() => {
    const m = new Map<string, Country>();
    for (const c of countries) m.set(c.name.toLowerCase(), c);
    return m;
  }, [countries]);

  const display = hovered ?? selected;

  // Build a polity → Selection helper for historical eras. The HistoricalMap
  // emits a NAME string when the user clicks/hovers a polity; we wrap that
  // into a HistoricalSelection enriched with registry info — and fall back
  // to a modern country flag when the polity has a sensible modern analogue.
  function selectionFromPolityName(name: string | null): Selection | null {
    if (!name) return null;
    const info = polityInfo(name);

    // Resolve a flag URL with three layers of fallback:
    //   1. Curated historical-flag image from the registry
    //   2. Registry-declared `modernName` → flagcdn
    //   3. Alias table (MODERN_NAME_ALIASES) → flagcdn
    //   4. Direct case-insensitive match of NAME against a modern country
    //      (handles "Brazil", "France", "United States", etc. in 1914+)
    let flag: string | undefined = info.flag;
    let continent: string | undefined = info.continent;
    if (!flag) {
      const modernName =
        polityModernName(name) ?? // covers registry.modernName + aliases
        (countryByName.has(name.toLowerCase()) ? name : null);
      if (modernName) {
        const country = countryByName.get(modernName.toLowerCase());
        if (country) {
          flag = country.flagSvg;
          if (!continent) continent = country.continent;
        }
      }
    }

    return {
      kind: "historical",
      name,
      flag,
      continent,
      note: info.note,
    };
  }

  if (loadError && isModernEra) {
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

  const flagUrl = display ? selectionFlag(display, baseUrl) : null;

  return (
    <div className="learn-fs">
      <div className="game-nav">
        <Link className="game-nav__home" to="/">
          ← Home
        </Link>
      </div>

      <div className="learn-fs__map" aria-label="World map">
        {isModernEra ? (
          <WorldProgressMap
            countryResults={{}}
            selectedCode={
              display?.kind === "modern" ? display.country.code : null
            }
            disabled={countries.length === 0}
            selectable={{
              codes,
              names,
              onSelect: (code) => {
                const c = codeToCountry.get(code);
                if (c) {
                  setSelected({ kind: "modern", country: c });
                  setHovered(null);
                }
              },
              onHover: (code) => {
                if (!code) {
                  setHovered(null);
                  return;
                }
                const c = codeToCountry.get(code);
                if (c) setHovered({ kind: "modern", country: c });
              },
            }}
          />
        ) : (
          <HistoricalMap
            geoJsonUrl={`${baseUrl}${era.dataUrl}`}
            selectedName={
              display?.kind === "historical" ? display.name : null
            }
            hoveredName={hovered?.kind === "historical" ? hovered.name : null}
            onSelect={(name) => {
              const next = selectionFromPolityName(name);
              setSelected(next);
              setHovered(null);
            }}
            onHover={(name) => {
              const next = selectionFromPolityName(name);
              setHovered(next);
            }}
          />
        )}
      </div>

      <div className="learn-fs__panel-wrap">
        <aside className="learn-fs__panel" aria-live="polite">
          <div className="learn-fs__detail">
            {display ? (
              <>
                <p className="learn-fs__continent">
                  {selectionContinent(display)}
                </p>
                <h2 className="learn-fs__name">{selectionName(display)}</h2>
                {selectionNote(display) && (
                  <p className="learn-fs__note">{selectionNote(display)}</p>
                )}
                {flagUrl ? (
                  <button
                    type="button"
                    className="learn-fs__flag"
                    onClick={() => setZoomed(true)}
                    aria-label={`Enlarge ${selectionName(display)} flag`}
                  >
                    <img
                      src={flagUrl}
                      alt=""
                      className="learn-fs__flag-img"
                      draggable={false}
                    />
                    <span className="learn-fs__flag-hint" aria-hidden="true">
                      ⤢ Click to enlarge
                    </span>
                  </button>
                ) : (
                  <p className="learn-fs__no-flag">
                    No flag image — this polity predates modern flag design
                    or none survives.
                  </p>
                )}
              </>
            ) : (
              <div className="learn-fs__empty">
                <p className="learn-fs__empty-title">Learn your flags</p>
                <p className="learn-fs__empty-sub">
                  {isModernEra
                    ? "Hover or click any country on the map — or use the search."
                    : "Hover or click any polity on the map to see its name and flag."}
                </p>
              </div>
            )}
          </div>

          {/* The search is most useful in modern mode (with 195 known
              countries). For historical eras the polities are easier to
              discover by clicking — we hide the dropdown then. */}
          {isModernEra && (
            <div className="learn-fs__search">
              <CountryDropdown
                countries={countries}
                value={display?.kind === "modern" ? display.country : null}
                onChange={(c) => {
                  if (c) setSelected({ kind: "modern", country: c });
                  setHovered(null);
                }}
                disabled={countries.length === 0}
                label="Find a country"
                listPlacement="up"
              />
            </div>
          )}
        </aside>
      </div>

      <div className="learn-fs__slider-wrap">
        <EraSlider currentId={eraId} onChange={setEraId} />
      </div>

      {zoomed && flagUrl && (
        <div
          className="flag-zoom"
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged ${selectionName(display!)} flag`}
          onClick={() => setZoomed(false)}
        >
          <img
            src={flagUrl}
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
