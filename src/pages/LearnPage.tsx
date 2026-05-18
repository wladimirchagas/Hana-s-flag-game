import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCountries, type Country } from "../api/countries";
import { WorldProgressMap } from "../components/WorldProgressMap";
import { HistoricalMap } from "../components/HistoricalMap";
import { CountryDropdown } from "../components/CountryDropdown";
import { EraSlider } from "../components/EraSlider";
import { useZoomPan } from "../hooks/useZoomPan";
import { MapViewControl } from "../components/MapViewControl";
import {
  loadMapView,
  saveMapView,
  type MapViewSettings,
} from "../lib/mapView";
import { FlagGrid } from "../components/FlagGrid";
import { topLevelContinent, type FlagListEntry } from "../lib/flagList";
import { EntitySummary } from "../components/EntitySummary";
import {
  DEFAULT_ERA_ID,
  eraAllowsModernFlagFallback,
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
  /** Scholarly population estimate at the polity's peak. Optional. */
  population?: number;
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
// (The pre-EntitySummary single-line `selectionSummary` helper used to live
// here; the panel now renders a structured <EntitySummary /> component
// for both modern + historical entities.)

export default function LearnPage() {
  const [eraId, setEraId] = useState<Era["id"]>(DEFAULT_ERA_ID);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hovered, setHovered] = useState<Selection | null>(null);
  const [selected, setSelected] = useState<Selection | null>(null);
  // Set of NAME values present in the current era's historical GeoJSON.
  // Populated by HistoricalMap's onDataLoaded callback. Used by the
  // cross-era selection-validation effect below to keep a selection alive
  // when the same entity also appears in the new era (and to clear it
  // when it doesn't).
  const [availableHistoricalNames, setAvailableHistoricalNames] = useState<ReadonlySet<string>>(new Set());
  const [zoomed, setZoomed] = useState(false);

  const baseUrl = import.meta.env.BASE_URL;
  const era = useMemo(() => getEra(eraId), [eraId]);
  const isModernEra = !era.dataUrl;

  // Shared zoom state for both map back-ends — keeps the user's zoom
  // intact when they switch eras (including Today ↔ historical, which
  // swaps the underlying component). Reset only happens when the user
  // clicks the ⟲ button.
  const sharedZoom = useZoomPan(960, 500);

  // Map view settings (centre longitude + south-up). Persisted to
  // localStorage so the user's preferred orientation survives reloads.
  const [mapView, setMapView] = useState<MapViewSettings>(() => loadMapView());
  useEffect(() => {
    saveMapView(mapView);
  }, [mapView]);

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

  // On era change: reset hover (always stale) and the per-era available-name
  // set (so the validation effect below waits until the new era's data has
  // actually loaded before deciding whether to keep or drop the selection).
  // We DO NOT clear the selection here — that's done conditionally further
  // down once we know whether the same entity exists in the new era.
  useEffect(() => {
    setHovered(null);
    setAvailableHistoricalNames(new Set());
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

  // Selection takes priority over hover. Once the user has clicked a
  // country / polity, the panel sticks to it — hovering other entities
  // doesn't override the panel content. Hover still shows a preview when
  // *nothing* is selected (initial state). The map's selected highlight
  // also follows this (drawn from `display`), giving the user a clear
  // "this is my selection" signal.
  const display = selected ?? hovered;

  // Build a polity → Selection helper for historical eras. The HistoricalMap
  // emits a NAME string when the user clicks/hovers a polity; we wrap that
  // into a HistoricalSelection enriched with registry info — and, where
  // historically defensible, fall back to a modern country flag.
  function selectionFromPolityName(name: string | null): Selection | null {
    if (!name) return null;
    const info = polityInfo(name, eraId);
    const allowFallback = eraAllowsModernFlagFallback(eraId);

    // Resolve a flag URL with up to four layers of fallback:
    //   1. Curated historical-flag image from the registry          (always)
    //   2. Registry-declared `modernName` → flagcdn                 (always)
    //   3. Alias table (MODERN_NAME_ALIASES) → flagcdn              (always)
    //   4. Direct case-insensitive match of NAME against a modern
    //      country — ONLY enabled for 1914+ eras, because for pre-1900
    //      eras most countries had wildly different flags than today.
    let flag: string | undefined = info.flag;
    let continent: string | undefined = info.continent;
    // Explicit "show no flag" override — used for ancient entities whose
    // NAME happens to match a modern country (Egypt 2000 BC, Armenia 100
    // AD) and for occupied / between-states polities where no national
    // flag applies. Skips the modern-flag fallback entirely.
    if (!flag && !info.noFlag) {
      const modernName =
        polityModernName(name, eraId) ?? // covers era-overrides + registry.modernName + aliases
        (allowFallback && countryByName.has(name.toLowerCase()) ? name : null);
      if (modernName) {
        // If the resolved modernName ALSO has a registry entry with a
        // curated flag, prefer that — this is how the Spanish viceroyalties
        // pick up the 1785 Spanish flag instead of the modern flagcdn one.
        const aliasInfo = polityInfo(modernName, eraId);
        if (aliasInfo.flag) {
          flag = aliasInfo.flag;
          if (!continent) continent = aliasInfo.continent;
        } else {
          const country = countryByName.get(modernName.toLowerCase());
          if (country) {
            flag = country.flagSvg;
            if (!continent) continent = country.continent;
          }
        }
      }
    }

    return {
      kind: "historical",
      name,
      flag,
      continent,
      note: info.note,
      population: info.population,
    };
  }

  // Cross-era selection persistence. Runs after the new era's data
  // arrives. The selection survives an era switch when the same entity
  // (by name) still exists in the new era; otherwise it clears.
  //
  // Modern ↔ historical conversions are also handled: switching from
  // Today to 1914 with "Brazil" selected converts the modern Country
  // into a historical Selection; switching back converts it back to
  // the modern Country if there's a name match.
  useEffect(() => {
    if (isModernEra) {
      // Today era: any historical-form selection should resolve to a
      // modern country if the name matches one of the 195 UN members.
      setSelected((curr) => {
        if (!curr || curr.kind === "modern") return curr ?? null;
        const match = countries.find(
          (c) => c.name.toLowerCase() === curr.name.toLowerCase(),
        );
        return match ? { kind: "modern", country: match } : null;
      });
      return;
    }
    // Historical era — wait until the new GeoJSON has actually loaded
    // (availableHistoricalNames repopulates) before we decide.
    if (availableHistoricalNames.size === 0) return;
    setSelected((curr) => {
      if (!curr) return null;
      const targetName =
        curr.kind === "modern" ? curr.country.name : curr.name;
      if (availableHistoricalNames.has(targetName)) {
        // Re-derive — era overrides (flag / note / population) may differ
        // between eras, so we always rebuild from the current era's view.
        return selectionFromPolityName(targetName);
      }
      return null;
    });
    // selectionFromPolityName is recreated each render and reads era-aware
    // state from closure; intentional that we don't add it to deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eraId, isModernEra, availableHistoricalNames, countries]);

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

  // Stable id for the currently-displayed entity — used by FlagGrid to
  // highlight the matching tile.
  const selectedId =
    display?.kind === "modern"
      ? display.country.code
      : display?.kind === "historical"
        ? display.name
        : null;

  // Compute the flag list for the current era. For Today this is just
  // the modern country list with REST Countries' subregion. For
  // historical eras we walk each feature NAME loaded by HistoricalMap
  // and run it through selectionFromPolityName so the entry reflects
  // any era-specific overrides (Brazil 1815 → UKPBA flag, etc.).
  const flagEntries: FlagListEntry[] = useMemo(() => {
    if (isModernEra) {
      return countries.map((c) => ({
        id: c.code,
        name: c.name,
        flag: c.flagSvg,
        continent: c.continent,
        subcontinent: c.subregion ?? c.continent,
      }));
    }
    const out: FlagListEntry[] = [];
    for (const name of availableHistoricalNames) {
      const sel = selectionFromPolityName(name);
      if (!sel || sel.kind !== "historical") continue;
      out.push({
        id: name,
        name,
        flag: sel.flag ?? null,
        continent: topLevelContinent(sel.continent),
        subcontinent: sel.continent ?? "Other",
      });
    }
    return out;
    // selectionFromPolityName closes over countryByName + eraId, both of
    // which we track explicitly. Disable lint exhaustive-deps just for
    // the helper itself — it's intentionally re-created each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModernEra, countries, availableHistoricalNames, eraId, countryByName]);

  // Ref to the top of the page (.learn-fs) — clicked flag tiles scroll
  // back here so the user lands on the map with their selection
  // highlighted.
  const learnRootRef = useRef<HTMLDivElement | null>(null);
  // (No auto-scroll into the flag grid from map / search selections.
  // Only an explicit click on a flag tile moves the viewport — back up
  // to the map — handled by `handleGridSelect` below via `learnRootRef`.
  // The grid's own selection highlight still updates silently for
  // either selection source.)

  function handleGridSelect(id: string) {
    if (isModernEra) {
      const c = codeToCountry.get(id);
      if (!c) return;
      setSelected({ kind: "modern", country: c });
      setHovered(null);
    } else {
      const sel = selectionFromPolityName(id);
      if (!sel) return;
      setSelected(sel);
      setHovered(null);
    }
    // Bring the map back into view.
    learnRootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleZoomFlag(entry: FlagListEntry) {
    // Pick the entity (without auto-scrolling) so the flag-zoom modal
    // reads the right flagUrl, then open the modal.
    if (isModernEra) {
      const c = codeToCountry.get(entry.id);
      if (!c) return;
      setSelected({ kind: "modern", country: c });
      setHovered(null);
    } else {
      const sel = selectionFromPolityName(entry.id);
      if (!sel) return;
      setSelected(sel);
      setHovered(null);
    }
    setZoomed(true);
  }

  // Resolver passed to FlagGrid so it can render both absolute http(s)
  // flagcdn URLs and relative /historical-flags/*.png paths.
  function resolveFlag(raw: string): string {
    if (/^https?:\/\//.test(raw) || raw.startsWith("data:")) return raw;
    return `${baseUrl}${raw}`;
  }

  return (
    <div className="learn-page">
    <div className="learn-fs" ref={learnRootRef}>
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
                  // No auto-scroll on map clicks — the user is looking at
                  // the map, so we keep them there. The matching tile in
                  // the flag grid still updates via the `--active` class,
                  // visible the moment they scroll down themselves.
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
            zoom={sharedZoom}
            centerLongitude={mapView.centerLongitude}
            southUp={mapView.southUp}
            extraControls={
              <MapViewControl view={mapView} onChange={setMapView} />
            }
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
              // Same as WorldProgressMap above — map clicks should not
              // yank the user away from the map. Flag-grid highlight
              // still updates silently for when they scroll down.
            }}
            onHover={(name) => {
              const next = selectionFromPolityName(name);
              setHovered(next);
            }}
            zoom={sharedZoom}
            centerLongitude={mapView.centerLongitude}
            southUp={mapView.southUp}
            extraControls={
              <MapViewControl view={mapView} onChange={setMapView} />
            }
            onDataLoaded={setAvailableHistoricalNames}
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
                {display.kind === "modern" ? (
                  <EntitySummary kind="modern" country={display.country} />
                ) : (
                  <EntitySummary
                    kind="historical"
                    region={display.continent}
                    note={display.note}
                    population={display.population}
                  />
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
                  // No auto-scroll from the search dropdown either — only
                  // an explicit flag-tile click should move the viewport.
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
      <FlagGrid
        entries={flagEntries}
        selectedId={selectedId}
        onSelect={handleGridSelect}
        onZoomFlag={handleZoomFlag}
        resolveFlag={resolveFlag}
      />
    </div>
  );
}
