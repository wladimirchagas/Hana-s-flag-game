import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { fetchCountries, type Country } from "../api/countries";
import { WorldProgressMap } from "../components/WorldProgressMap";
import { HistoricalMap } from "../components/HistoricalMap";
import { LearnTopToolbar } from "../components/LearnTopToolbar";
import { CountryDropdown } from "../components/CountryDropdown";
import { SITE_TOPBAR_LEFT_SLOT_ID } from "../components/Topbar";
import { SubdivisionMap } from "../components/SubdivisionMap";
import { useZoomPan } from "../hooks/useZoomPan";
import { MapViewControl } from "../components/MapViewControl";
import {
  loadMapView,
  saveMapView,
  type MapViewSettings,
} from "../lib/mapView";
import { FlagGrid } from "../components/FlagGrid";
import { SubdivisionFlagGrid } from "../components/SubdivisionFlagGrid";
import { topLevelContinent, type FlagListEntry } from "../lib/flagList";
import { FLAG_SHAPES } from "../lib/flagShapes";
import { FLAG_FAMILIES } from "../lib/flagFamilies";
import { FLAG_COLORS } from "../lib/flagColors";
import { FLAG_SIMILARITIES } from "../lib/flagSimilarity";
import { getDriveSide } from "../lib/flagDriveSide";
import { FLAG_ASPECT_RATIOS } from "../lib/flagAspectRatio";
import { EntitySummary } from "../components/EntitySummary";
import { NationalAnthemPlayer } from "../components/NationalAnthemPlayer";
import {
  loadStoredSelection,
  saveStoredSelection,
} from "../lib/countrySelection";
import {
  DEFAULT_ERA_ID,
  eraAllowsModernFlagFallback,
  getEra,
  polityInfo,
  polityModernName,
  type Era,
} from "../lib/historicalEras";
import { fetchSubdivisionGeo, subdivisionFlagUrl } from "../api/subdivisions";
import { SUBDIVISION_META } from "../lib/subdivisionMeta";
import { NSGT_CODES } from "../lib/nsgtTerritories";
import { TERRITORY_PARENT, TERRITORY_NAME, PARENT_TERRITORIES } from "../lib/territoryParentMap";
import type { SubdivisionFeatureCollection, SubdivisionMeta } from "../types/subdivision";
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
  const [showFlagMap, setShowFlagMap] = useState(false);

  // Suppresses the exit-subdivision effect for one cycle when navigating
  // between subdivision countries via the dropdown.
  const suppressSubdivisionExitRef = useRef(false);

  // Sub-national divisions mode
  const [subdivisionMode, setSubdivisionMode] = useState(false);
  const [subdivisionGeo, setSubdivisionGeo] = useState<SubdivisionFeatureCollection | null>(null);
  const [subdivisionLoading, setSubdivisionLoading] = useState(false);
  const [selectedSubdivision, setSelectedSubdivision] = useState<SubdivisionMeta | null>(null);
  // Country whose subdivisions are currently shown — stored separately so the
  // panel doesn't depend on `display` remaining set after entering subdivision mode.
  const [subdivisionCountry, setSubdivisionCountry] = useState<{ code: string; name: string; flagSvg: string } | null>(null);
  // Set of NAME values present in the current era's historical GeoJSON.
  // Populated by HistoricalMap's onDataLoaded callback. Used by the
  // cross-era selection-validation effect below to keep a selection alive
  // when the same entity also appears in the new era (and to clear it
  // when it doesn't).
  const [availableHistoricalNames, setAvailableHistoricalNames] = useState<ReadonlySet<string>>(new Set());
  const [zoomedFlagUrl, setZoomedFlagUrl] = useState<string | null>(null);
  const [flagLoadFailed, setFlagLoadFailed] = useState(false);
  // Captured at "Play" click time so the modal stays open even if the
  // hovered-country display clears while the user moves the mouse.
  const [anthemTarget, setAnthemTarget] = useState<{
    code: string;
    name: string;
    flagUrl: string | null;
  } | null>(null);

  // Codes currently in the user's Hana's Game list (persisted to
  // localStorage). Initialised from storage so the in-panel toggle below
  // the highlighted flag reflects whatever the picker modal would show.
  const [hanaCodes, setHanaCodes] = useState<string[]>(
    () => loadStoredSelection().codes,
  );

  const toggleHanaForCode = useCallback((code: string) => {
    setHanaCodes((prev) => {
      const next = prev.includes(code)
        ? prev.filter((c) => c !== code)
        : [code, ...prev];
      saveStoredSelection({ codes: next });
      return next;
    });
  }, []);

  // Debounce hover-clearing so the panel doesn't vanish when the user
  // moves the mouse from a map country toward the side panel.
  const hoverClearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Globe rotation — shared across both map back-ends so switching eras
  // doesn't stop the spin or lose the pause state.
  const [rotationOffset, setRotationOffset] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const isRotatingRef = useRef(false);
  isRotatingRef.current = isRotating;
  const southUpForRotRef = useRef(mapView.southUp);
  southUpForRotRef.current = mapView.southUp;
  const rotationAccumRef = useRef(0);
  // Track whether we're in the modern era inside the rAF loop. Historical
  // maps don't use the rotation offset at all, so we must not call
  // setRotationOffset during historical eras — it would force LearnPage to
  // re-render at 15fps and bypass HistoricalMap's memo, re-rendering
  // hundreds of SVG paths on every frame and blocking all user interaction.
  const isModernEraRef = useRef(isModernEra);
  isModernEraRef.current = isModernEra;

  const toggleRotation = useCallback(() => {
    setIsRotating((prev) => !prev);
  }, []);
  const toggleFlagMap = useCallback(() => {
    setShowFlagMap((prev) => !prev);
  }, []);

  // Exit subdivision mode when a different country is selected — unless the
  // dropdown is navigating between subdivision countries (suppress ref set).
  useEffect(() => {
    if (suppressSubdivisionExitRef.current) {
      suppressSubdivisionExitRef.current = false;
      return;
    }
    setSubdivisionMode(false);
    setSubdivisionGeo(null);
    setSelectedSubdivision(null);
    setSubdivisionCountry(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.kind === "modern" ? selected.country.code : null]);
  useEffect(() => {
    saveMapView(mapView);
  }, [mapView]);

  // Scroll to the very top of the page when the user first lands here.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Reset accumulated rotation when the user picks a new view-centre preset
  // so the map snaps immediately to the chosen meridian.
  useEffect(() => {
    rotationAccumRef.current = 0;
    setRotationOffset(0);
  }, [mapView.centerLongitude]);

  // rAF rotation loop — runs for the lifetime of the page so the globe
  // keeps spinning across era switches (both map back-ends receive the
  // computed effectiveLongitude as their centerLongitude prop).
  useEffect(() => {
    const DEGREES_PER_SEC = 6;
    const MIN_MS_BETWEEN_RENDERS = 67; // ~15 fps cap
    let lastTime = performance.now();
    let lastRenderTime = performance.now();
    let rafId: number;
    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      if (isRotatingRef.current) {
        const dir = southUpForRotRef.current ? -1 : 1;
        rotationAccumRef.current =
          (rotationAccumRef.current + dir * DEGREES_PER_SEC * dt) % 360;
        // Only push state (and thus trigger a re-render) for the modern era.
        // Historical maps ignore the rotation offset entirely, so updating
        // state for them would cause 15fps re-renders of HistoricalMap with
        // no visual benefit — and those re-renders block click events.
        if (isModernEraRef.current && now - lastRenderTime >= MIN_MS_BETWEEN_RENDERS) {
          lastRenderTime = now;
          setRotationOffset(rotationAccumRef.current);
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

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
    setAnthemTarget(null);
  }, [eraId]);

  // Lock body scroll while the fullscreen flag viewer is open + close on Esc.
  useEffect(() => {
    if (!zoomedFlagUrl) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomedFlagUrl(null);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [zoomedFlagUrl]);

  const codeToCountry = useMemo(
    () => new Map(countries.map((c) => [c.code, c])),
    [countries],
  );
  const codes = useMemo(
    () => new Set([
      ...countries.map((c) => c.code),
      ...Object.keys(TERRITORY_PARENT),
    ]),
    [countries],
  );
  const names = useMemo(
    () => new Map([
      ...countries.map((c) => [c.code, c.name] as [string, string]),
      ...Object.entries(TERRITORY_NAME),
    ]),
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

  // Territories of the currently-displayed country — used to co-highlight
  // their geometries on the world map alongside the parent country.
  const territoryHighlightCodes = useMemo(() => {
    if (!display || display.kind !== "modern") return null;
    const territories = PARENT_TERRITORIES[display.country.code];
    return territories?.length ? new Set(territories) : null;
  }, [display]);

  function exitSubdivisionMode() {
    setSubdivisionMode(false);
    setSubdivisionGeo(null);
    setSelectedSubdivision(null);
    setSubdivisionCountry(null);
  }

  const handleEnterSubdivisionMode = useCallback(async () => {
    if (!display || display.kind !== "modern") return;
    const { code, name, flagSvg } = display.country;
    setSubdivisionMode(true);
    setSubdivisionLoading(true);
    setSelectedSubdivision(null);
    setSubdivisionCountry({ code, name, flagSvg });
    const geo = await fetchSubdivisionGeo(code);
    setSubdivisionGeo(geo);
    setSubdivisionLoading(false);
  }, [display]);

  // Navigate to the subdivision view for a specific country. Suppresses the
  // exit-subdivision effect so the panel updates to the new country while
  // staying in subdivision mode.
  const enterSubdivisionModeForCountry = useCallback(async (country: Country) => {
    const { code, name, flagSvg } = country;
    suppressSubdivisionExitRef.current = true;
    setSelected({ kind: "modern", country });
    setHovered(null);
    setSubdivisionLoading(true);
    setSelectedSubdivision(null);
    setSubdivisionCountry({ code, name, flagSvg });
    const geo = await fetchSubdivisionGeo(code);
    setSubdivisionGeo(geo);
    setSubdivisionLoading(false);
  }, []);

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

  // Compute the flag list for the current era. For Today this is just
  // the modern country list with REST Countries’ subregion. For
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
        shapes: FLAG_SHAPES[c.code],
        families: FLAG_FAMILIES[c.code],
        colors: FLAG_COLORS[c.code],
        similarities: FLAG_SIMILARITIES[c.code],
        driveSide: getDriveSide(c.code),
        aspectRatio: FLAG_ASPECT_RATIOS[c.code],
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
    // the helper itself — it’s intentionally re-created each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModernEra, countries, availableHistoricalNames, eraId, countryByName]);

  // Convert a flag URL to a form suitable for SVG <image> map overlay.
  // flagcdn.com serves /{code}.svg files whose embedded preserveAspectRatio
  // can prevent "slice" scaling in some browsers. Switching those to the w1280
  // PNG variant guarantees reliable full-territory coverage.  Non-flagcdn URLs
  // (Wikimedia SVGs, local PNGs) are returned unchanged.
  const toMapFlagUrl = (url: string): string => {
    const m = url.match(/^https?:\/\/flagcdn\.com\/([a-z]{2})\.svg$/);
    // w320 is plenty for a ~960px-wide map; w1280 was ~16× heavier with no
    // visible benefit and significantly increased per-frame paint cost.
    return m ? `https://flagcdn.com/w320/${m[1]}.png` : url;
  };

  // Flag overlay for the modern era: maps alpha-2 code → flag PNG URL.
  // Uses the same country.flagSvg source as the detail panel so flag
  // versions are always in sync (e.g. the current Afghan flag shows on
  // both the map and the widget).
  const modernFlagOverlay = useMemo(() => {
    if (!isModernEra || !showFlagMap) return null;
    const m = new Map<string, string>();
    for (const c of countries) {
      m.set(c.code, toMapFlagUrl(c.flagSvg));
    }
    return m;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModernEra, showFlagMap, countries]);

  // Flag overlay for historical eras: maps polity NAME → absolute flag URL.
  // Built from the same flagEntries used by FlagGrid so the URL resolution
  // (relative /historical-flags/ paths vs absolute flagcdn URLs) is consistent.
  const historicalFlagOverlay = useMemo(() => {
    if (isModernEra || !showFlagMap) return null;
    const m = new Map<string, string>();
    for (const entry of flagEntries) {
      if (!entry.flag) continue;
      const raw =
        /^https?:\/\//.test(entry.flag) || entry.flag.startsWith("data:")
          ? entry.flag
          : `${baseUrl}${entry.flag}`;
      m.set(entry.id, toMapFlagUrl(raw));
    }
    return m;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModernEra, showFlagMap, flagEntries, baseUrl]);


  // Stable callbacks for HistoricalMap — memoised so React.memo() on that
  // component is not bypassed when unrelated state (selected, hovered, …)
  // changes. The deps match what selectionFromPolityName reads from closure.
  const handleHistoricalSelect = useCallback(
    (name: string | null) => {
      setSelected(selectionFromPolityName(name));
      setHovered(null);
    },
    // selectionFromPolityName closes over eraId + countryByName only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [eraId, countryByName],
  );
  const handleHistoricalHover = useCallback(
    (name: string | null) => {
      setHovered(selectionFromPolityName(name));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [eraId, countryByName],
  );

  // Rotation + view-centre controls shared by both WorldProgressMap and
  // HistoricalMap so the buttons are always present regardless of era.
  // Memoised so that HistoricalMap’s React.memo() wrapper is not bypassed
  // by a new JSX reference on every rotation-driven render.
  const mapExtraControls = useMemo(
    () => (
      <>
        <hr className="world-map__zoom-divider" />
        <button
          type="button"
          className="world-map__zoom-btn"
          onClick={toggleRotation}
          aria-label={isRotating ? "Pause rotation" : "Resume rotation"}
          title={isRotating ? "Pause rotation" : "Resume rotation"}
        >
          {isRotating ? "⏸" : "▶"}
        </button>
        <MapViewControl view={mapView} onChange={setMapView} />
        <hr className="world-map__zoom-divider" />
        <button
          type="button"
          className={`world-map__zoom-btn${showFlagMap ? " world-map__zoom-btn--active" : ""}`}
          onClick={toggleFlagMap}
          aria-label={showFlagMap ? "Hide flags on map" : "Show flags on map"}
          title={showFlagMap ? "Hide flags on map" : "Show flags on map"}
        >
          🚩
        </button>
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isRotating, mapView, toggleRotation, showFlagMap, toggleFlagMap],
  );

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
  // Reset load-failed state whenever the displayed entity changes
  const prevFlagUrlRef = useRef<string | null>(null);
  if (prevFlagUrlRef.current !== flagUrl) {
    prevFlagUrlRef.current = flagUrl;
    // Sync reset without triggering an extra render cycle
    if (flagLoadFailed) setFlagLoadFailed(false);
  }
  const flagPngFallback =
    display?.kind === "modern"
      ? `https://flagcdn.com/${display.country.code.toLowerCase()}.png`
      : null

  // Stable id for the currently-displayed entity — used by FlagGrid to
  // highlight the matching tile.
  const selectedId =
    display?.kind === "modern"
      ? display.country.code
      : display?.kind === "historical"
        ? display.name
        : null;

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
    // Scroll to the absolute top so the user sees the map from the very start.
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Resolver passed to FlagGrid so it can render both absolute http(s)
  // flagcdn URLs and relative /historical-flags/*.png paths.
  function resolveFlag(raw: string): string {
    if (/^https?:\/\//.test(raw) || raw.startsWith("data:")) return raw;
    return `${baseUrl}${raw}`;
  }

  return (
    <div className="learn-page">
      {subdivisionMode && (() => {
        const slot = document.getElementById(SITE_TOPBAR_LEFT_SLOT_ID);
        if (!slot) return null;
        return createPortal(
          <button type="button" className="site-topbar__back" onClick={exitSubdivisionMode}>
            ← World map
          </button>,
          slot,
        );
      })()}
      {/* Top toolbar: era selector (Today / Historical periods) + the
          country search. */}
      <LearnTopToolbar
        currentEraId={eraId}
        onEraChange={setEraId}
        isModernEra={isModernEra}
        hideEraPicker={subdivisionMode}
        search={
          isModernEra && !subdivisionMode
            ? {
                countries,
                value: display?.kind === "modern" ? display.country : null,
                onChange: (c) => {
                  if (c) setSelected({ kind: "modern", country: c });
                  setHovered(null);
                },
                disabled: countries.length === 0,
              }
            : null
        }
      />
    <div className="learn-fs">
      <div className="learn-fs__map" aria-label="World map">
        {isModernEra && subdivisionMode ? (
          <SubdivisionMap
            geoData={subdivisionGeo}
            loading={subdivisionLoading}
            selectedCode={selectedSubdivision?.code ?? null}
            onSelect={(code) => {
              const countryMeta = subdivisionCountry ? SUBDIVISION_META[subdivisionCountry.code] : null;
              const meta = countryMeta?.divisions.find((d) => d.code === code);
              if (meta) setSelectedSubdivision(meta);
            }}
            onHover={undefined}
            disabled={false}
            countryResults={{}}
          />
        ) : isModernEra ? (
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
                const resolved = TERRITORY_PARENT[code] ?? code;
                const c = codeToCountry.get(resolved);
                if (c) {
                  if (hoverClearTimer.current) {
                    clearTimeout(hoverClearTimer.current);
                    hoverClearTimer.current = null;
                  }
                  setSelected({ kind: "modern", country: c });
                  setHovered(null);
                }
              },
              onHover: (code) => {
                if (!code) {
                  // Debounce: give the mouse 200ms to reach the side panel
                  // before clearing the hover display.
                  hoverClearTimer.current = setTimeout(() => {
                    setHovered(null);
                    hoverClearTimer.current = null;
                  }, 200);
                  return;
                }
                if (hoverClearTimer.current) {
                  clearTimeout(hoverClearTimer.current);
                  hoverClearTimer.current = null;
                }
                const resolved = TERRITORY_PARENT[code] ?? code;
                const c = codeToCountry.get(resolved);
                if (c) setHovered({ kind: "modern", country: c });
              },
            }}
            highlightCodes={territoryHighlightCodes}
            zoom={sharedZoom}
            centerLongitude={mapView.centerLongitude}
            rotationOffset={rotationOffset}
            southUp={mapView.southUp}
            extraControls={mapExtraControls}
            flagOverlay={modernFlagOverlay}
          />
        ) : (
          <HistoricalMap
            geoJsonUrl={`${baseUrl}${era.dataUrl}`}
            selectedName={
              display?.kind === "historical" ? display.name : null
            }
            hoveredName={hovered?.kind === "historical" ? hovered.name : null}
            onSelect={handleHistoricalSelect}
            onHover={handleHistoricalHover}
            zoom={sharedZoom}
            centerLongitude={mapView.centerLongitude}
            southUp={mapView.southUp}
            extraControls={mapExtraControls}
            onDataLoaded={setAvailableHistoricalNames}
            flagOverlay={historicalFlagOverlay}
          />
        )}
      </div>

      <div className="learn-fs__panel-wrap">
        <aside className="learn-fs__panel" aria-live="polite">
          <div className="learn-fs__detail">
            {subdivisionMode && subdivisionCountry && (
              <CountryDropdown
                countries={countries as Country[]}
                value={codeToCountry.get(subdivisionCountry.code) ?? null}
                onChange={(c) => { if (c) enterSubdivisionModeForCountry(c); }}
                disabled={countries.length === 0}
                label="Find a country's subdivisions"
                listPlacement="down"
              />
            )}
            {display ? (
              <>
                <p className="learn-fs__continent">
                  {selectionContinent(display)}
                </p>
                <h2 className="learn-fs__name">{selectionName(display)}</h2>
                {display.kind === "modern" ? (
                  <>
                    <EntitySummary kind="modern" country={display.country} />
                    <div className="learn-fs__anthem-row">
                      <span className="learn-fs__anthem-label">National Anthem</span>
                      <button
                        type="button"
                        className="learn-fs__anthem-btn"
                        onClick={() => setAnthemTarget({
                          code: display.country.code,
                          name: display.country.name,
                          flagUrl: selectionFlag(display, baseUrl),
                        })}
                        aria-label={`Play national anthem of ${display.country.name}`}
                      >
                        ▶ Play
                      </button>
                    </div>
                  </>
                ) : (
                  <EntitySummary
                    kind="historical"
                    region={display.continent}
                    note={display.note}
                    population={display.population}
                  />
                )}
                {flagUrl && !flagLoadFailed ? (
                  <button
                    type="button"
                    className="learn-fs__flag"
                    onClick={() => setZoomedFlagUrl(flagUrl)}
                    aria-label={`Enlarge ${selectionName(display)} flag`}
                  >
                    <img
                      src={flagUrl}
                      alt=""
                      className="learn-fs__flag-img"
                      draggable={false}
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (flagPngFallback && img.src !== flagPngFallback) {
                          img.src = flagPngFallback;
                        } else {
                          setFlagLoadFailed(true);
                        }
                      }}
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
                {display.kind === "modern" && (() => {
                  const code = display.country.code;
                  const inList = hanaCodes.includes(code);
                  return (
                    <div
                      className={`learn-fs__hana-row${inList ? " learn-fs__hana-row--added" : ""}`}
                    >
                      <span className="learn-fs__hana-label">Hana&rsquo;s Game</span>
                      <button
                        type="button"
                        className={`learn-fs__hana-btn${inList ? " learn-fs__hana-btn--added" : ""}`}
                        onClick={() => toggleHanaForCode(code)}
                        aria-pressed={inList}
                        title={
                          inList
                            ? `Remove ${display.country.name} from your list`
                            : `Add ${display.country.name} to your list`
                        }
                      >
                        {inList ? "✓ In my list" : "+ Add to my list"}
                      </button>
                    </div>
                  );
                })()}
                {display.kind === "modern" && isModernEra && (
                  <div className="learn-fs__subdiv-row">
                    {subdivisionMode ? (
                      <>
                        {selectedSubdivision && (() => {
                          const sdUrl = subdivisionFlagUrl(selectedSubdivision.code);
                          const isNsgt = NSGT_CODES.has(selectedSubdivision.code);
                          return (
                            <div className="learn-fs__subdiv-info">
                              <p className="learn-fs__subdiv-type">{selectedSubdivision.typeLabel}</p>
                              <p className="learn-fs__subdiv-name">{selectedSubdivision.name}</p>
                              {isNsgt && (
                                <p className="learn-fs__nsgt-note" title="Listed on the UN Non-Self-Governing Territories agenda (C-24)">
                                  🌐 UN Non-Self-Governing Territory
                                </p>
                              )}
                              {sdUrl && (
                                <button
                                  type="button"
                                  className="learn-fs__flag"
                                  onClick={() => setZoomedFlagUrl(sdUrl)}
                                  aria-label={`Enlarge ${selectedSubdivision.name} flag`}
                                >
                                  <img
                                    src={sdUrl}
                                    alt=""
                                    className="learn-fs__flag-img"
                                    draggable={false}
                                    onError={(e) => { e.currentTarget.closest("button")?.remove(); }}
                                  />
                                  <span className="learn-fs__flag-hint" aria-hidden="true">⤢ Click to enlarge</span>
                                </button>
                              )}
                            </div>
                          );
                        })()}
                      </>
                    ) : (
                      <button
                        type="button"
                        className="learn-fs__subdiv-btn"
                        onClick={handleEnterSubdivisionMode}
                      >
                        View sub-national divisions
                      </button>
                    )}
                  </div>
                )}
              </>
            ) : subdivisionMode && subdivisionCountry ? (() => {
              const countryObj = countries.find(c => c.code === subdivisionCountry.code);
              const inList = hanaCodes.includes(subdivisionCountry.code);
              return (
                <>
                  {countryObj && (
                    <p className="learn-fs__continent">{countryObj.continent}</p>
                  )}
                  <h2 className="learn-fs__name">{subdivisionCountry.name}</h2>
                  {countryObj && <EntitySummary kind="modern" country={countryObj} />}
                  {countryObj && (
                    <div className="learn-fs__anthem-row">
                      <span className="learn-fs__anthem-label">National Anthem</span>
                      <button
                        type="button"
                        className="learn-fs__anthem-btn"
                        onClick={() => setAnthemTarget({
                          code: subdivisionCountry.code,
                          name: subdivisionCountry.name,
                          flagUrl: subdivisionCountry.flagSvg || null,
                        })}
                        aria-label={`Play national anthem of ${subdivisionCountry.name}`}
                      >
                        ▶ Play
                      </button>
                    </div>
                  )}
                  {subdivisionCountry.flagSvg && (
                    <button
                      type="button"
                      className="learn-fs__flag"
                      onClick={() => setZoomedFlagUrl(subdivisionCountry.flagSvg)}
                      aria-label={`Enlarge ${subdivisionCountry.name} flag`}
                    >
                      <img
                        src={subdivisionCountry.flagSvg}
                        alt=""
                        className="learn-fs__flag-img"
                        draggable={false}
                        onError={(e) => {
                          const img = e.currentTarget;
                          const png = `https://flagcdn.com/${subdivisionCountry.code.toLowerCase()}.png`;
                          if (img.src !== png) img.src = png;
                          else img.closest("button")?.remove();
                        }}
                      />
                      <span className="learn-fs__flag-hint" aria-hidden="true">⤢ Click to enlarge</span>
                    </button>
                  )}
                  {countryObj && (
                    <div className={`learn-fs__hana-row${inList ? " learn-fs__hana-row--added" : ""}`}>
                      <span className="learn-fs__hana-label">Hana&rsquo;s Game</span>
                      <button
                        type="button"
                        className={`learn-fs__hana-btn${inList ? " learn-fs__hana-btn--added" : ""}`}
                        onClick={() => toggleHanaForCode(subdivisionCountry.code)}
                        aria-pressed={inList}
                        title={inList ? `Remove ${subdivisionCountry.name} from your list` : `Add ${subdivisionCountry.name} to your list`}
                      >
                        {inList ? "✓ In my list" : "+ Add to my list"}
                      </button>
                    </div>
                  )}
                  <div className="learn-fs__subdiv-row">
                    {selectedSubdivision && (() => {
                      const sdUrl = subdivisionFlagUrl(selectedSubdivision.code);
                      const isNsgt = NSGT_CODES.has(selectedSubdivision.code);
                      return (
                        <div className="learn-fs__subdiv-info">
                          <p className="learn-fs__subdiv-type">{selectedSubdivision.typeLabel}</p>
                          <p className="learn-fs__subdiv-name">{selectedSubdivision.name}</p>
                          {isNsgt && (
                            <p className="learn-fs__nsgt-note" title="Listed on the UN Non-Self-Governing Territories agenda (C-24)">
                              🌐 UN Non-Self-Governing Territory
                            </p>
                          )}
                          {sdUrl && (
                            <button
                              type="button"
                              className="learn-fs__flag"
                              onClick={() => setZoomedFlagUrl(sdUrl)}
                              aria-label={`Enlarge ${selectedSubdivision.name} flag`}
                            >
                              <img
                                src={sdUrl}
                                alt=""
                                className="learn-fs__flag-img"
                                draggable={false}
                                onError={(e) => { e.currentTarget.closest("button")?.remove(); }}
                              />
                              <span className="learn-fs__flag-hint" aria-hidden="true">⤢ Click to enlarge</span>
                            </button>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </>
              );
            })() : (
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

        </aside>
      </div>

      {anthemTarget && (
        <NationalAnthemPlayer
          countryCode={anthemTarget.code}
          countryName={anthemTarget.name}
          flagUrl={anthemTarget.flagUrl}
          onClose={() => setAnthemTarget(null)}
        />
      )}

      {zoomedFlagUrl && (
        <div
          className="flag-zoom"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged flag"
          onClick={() => setZoomedFlagUrl(null)}
        >
          <img
            src={zoomedFlagUrl}
            alt=""
            className="flag-zoom__img"
            draggable={false}
          />
          <button
            type="button"
            className="flag-zoom__close"
            onClick={(e) => {
              e.stopPropagation();
              setZoomedFlagUrl(null);
            }}
            aria-label="Close enlarged flag"
          >
            ×
          </button>
        </div>
      )}
    </div>
      {subdivisionMode && subdivisionCountry ? (() => {
        const meta = SUBDIVISION_META[subdivisionCountry.code];
        return (
          <SubdivisionFlagGrid
            divisions={meta?.divisions ?? []}
            pluralLabel={meta?.pluralLabel ?? "Divisions"}
            countryName={subdivisionCountry.name}
            selectedCode={selectedSubdivision?.code ?? null}
            onSelect={(code: string) => {
              const div = meta?.divisions.find((d) => d.code === code);
              if (div) {
                setSelectedSubdivision(div);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          />
        );
      })() : (
        <FlagGrid
          entries={flagEntries}
          selectedId={selectedId}
          onSelect={handleGridSelect}
          resolveFlag={resolveFlag}
          isModernEra={isModernEra}
        />
      )}
    </div>
  );
}
