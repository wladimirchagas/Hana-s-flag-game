import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCountries, type Country } from "../api/countries";
import { WorldProgressMap } from "../components/WorldProgressMap";
import { CountryDropdown } from "../components/CountryDropdown";
import { EraSlider } from "../components/EraSlider";
import {
  DEFAULT_ERA_ID,
  ERAS,
  getEra,
  type Era,
  type SpotlightGroup,
} from "../lib/historicalEras";
import "../App.css";
import "./LearnPage.css";

/**
 * Sandbox-style "Learn your flags" mode with a historical era slider.
 *
 * Each era has either:
 *   - `borders: { kind: "modern" }`  — use the modern world-atlas as-is
 *   - `borders: { kind: "spotlight", groups }` — colour modern countries
 *     into historical entities. Clicking any group member highlights all
 *     members and shows the entity's historical flag.
 *
 * Default era is always "today" — the modern world. The slider switches
 * eras instantly with a brief crossfade.
 */

// Selection model: either a modern country (Country) or a historical
// spotlight group (SpotlightGroup). Both shapes share name/flag-ish data
// but differ in what gets highlighted on the map.
type Selection =
  | { kind: "country"; country: Country }
  | { kind: "group"; group: SpotlightGroup };

function selectionName(s: Selection): string {
  return s.kind === "country" ? s.country.name : s.group.name;
}
function selectionContinent(s: Selection): string {
  return s.kind === "country" ? s.country.continent : s.group.continent;
}
function selectionFlag(s: Selection, baseUrl: string): string {
  return s.kind === "country"
    ? s.country.flagSvg
    : `${baseUrl}${s.group.flag}`;
}
function selectionNote(s: Selection): string | undefined {
  return s.kind === "group" ? s.group.note : undefined;
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

  // Reset selection / hover when the era changes — the previously selected
  // entity may not exist in the new era.
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

  // Build era-specific lookups: modernCode → group, plus the synthetic
  // country list shown in the dropdown (groups + non-grouped modern).
  const { codeToGroup, dropdownItems, codeToGroupName } = useMemo(() => {
    const codeToGroup = new Map<string, SpotlightGroup>();
    const codeToGroupName = new Map<string, string>();
    if (era.borders.kind === "spotlight") {
      for (const g of era.borders.groups) {
        for (const code of g.modernCodes) {
          codeToGroup.set(code, g);
          codeToGroupName.set(code, g.name);
        }
      }
    }
    // Dropdown items: each spotlight group appears ONCE, plus all modern
    // countries NOT covered by any group. The CountryDropdown signature
    // expects Country-shaped items, so synthesize them.
    const items: Country[] = [];
    if (era.borders.kind === "spotlight") {
      for (const g of era.borders.groups) {
        items.push({
          name: g.name,
          // Use the group's id as a fake "code" so the dropdown's value
          // comparison works. Won't collide with real ISO codes.
          code: g.id,
          flagSvg: `${baseUrl}${g.flag}`,
          // Continent is informational here; cast safely.
          continent: g.continent as Country["continent"],
        });
      }
    }
    for (const c of countries) {
      if (!codeToGroup.has(c.code)) items.push(c);
    }
    return { codeToGroup, dropdownItems: items, codeToGroupName };
  }, [era, countries, baseUrl]);

  // What the map's selectable.codes set looks like: all modern codes that
  // either belong to a group (clickable → selects the group) or are loose
  // modern countries (clickable → selects the country). Same set either way.
  const allCodes = useMemo(
    () => new Set(countries.map((c) => c.code)),
    [countries],
  );

  // Display names per modern path: if a country is in a spotlight group,
  // show the group name; otherwise show the modern country name.
  const pathNames = useMemo(() => {
    const m = new Map<string, string>();
    for (const c of countries) {
      m.set(c.code, codeToGroupName.get(c.code) ?? c.name);
    }
    return m;
  }, [countries, codeToGroupName]);

  // Build the highlight set (cyan fill) for the currently shown selection.
  // - country: just that one code
  // - group: all member codes
  const highlightCodes = useMemo(() => {
    const display = hovered ?? selected;
    if (!display) return null;
    if (display.kind === "country") return new Set([display.country.code]);
    return new Set(display.group.modernCodes);
  }, [hovered, selected]);

  // Convert a clicked map code to a Selection — group lookup wins.
  function selectByMapCode(code: string): Selection | null {
    const g = codeToGroup.get(code);
    if (g) return { kind: "group", group: g };
    const c = codeToCountry.get(code);
    if (c) return { kind: "country", country: c };
    return null;
  }

  // Dropdown change: the synthetic item's `code` is either a group id or a
  // real ISO code. Look up the right Selection shape.
  function selectByDropdownCode(item: Country | null) {
    if (!item) {
      setSelected(null);
      setHovered(null);
      return;
    }
    const g =
      era.borders.kind === "spotlight"
        ? era.borders.groups.find((x) => x.id === item.code)
        : undefined;
    if (g) {
      setSelected({ kind: "group", group: g });
    } else {
      const c = codeToCountry.get(item.code);
      if (c) setSelected({ kind: "country", country: c });
    }
    setHovered(null);
  }

  // The dropdown's `value` needs to match an item by reference; synthesize
  // the matching Country-shape from the current selection.
  const dropdownValue: Country | null = (() => {
    if (!selected) return null;
    if (selected.kind === "country") return selected.country;
    return {
      name: selected.group.name,
      code: selected.group.id,
      flagSvg: `${baseUrl}${selected.group.flag}`,
      continent: selected.group.continent as Country["continent"],
    };
  })();

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
          // selectedCode is single-code; pass the first highlighted code so
          // the map still treats hover/click history correctly even though
          // multi-highlighting is handled by highlightCodes below.
          selectedCode={
            display?.kind === "country" ? display.country.code : null
          }
          highlightCodes={highlightCodes}
          disabled={countries.length === 0}
          selectable={{
            codes: allCodes,
            names: pathNames,
            onSelect: (code) => {
              const next = selectByMapCode(code);
              if (next) {
                setSelected(next);
                setHovered(null);
              }
            },
            onHover: (code) => {
              if (!code) {
                setHovered(null);
                return;
              }
              const next = selectByMapCode(code);
              if (next) setHovered(next);
            },
          }}
        />
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
                <button
                  type="button"
                  className="learn-fs__flag"
                  onClick={() => setZoomed(true)}
                  aria-label={`Enlarge ${selectionName(display)} flag`}
                >
                  <img
                    src={selectionFlag(display, baseUrl)}
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
                  below.
                </p>
              </div>
            )}
          </div>

          <div className="learn-fs__search">
            <CountryDropdown
              countries={dropdownItems}
              value={dropdownValue}
              onChange={selectByDropdownCode}
              disabled={countries.length === 0}
              label={era.borders.kind === "spotlight" ? "Find an entity" : "Find a country"}
              listPlacement="up"
            />
          </div>
        </aside>
      </div>

      <div className="learn-fs__slider-wrap">
        <EraSlider currentId={eraId} onChange={setEraId} />
      </div>

      {zoomed && display && (
        <div
          className="flag-zoom"
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged ${selectionName(display)} flag`}
          onClick={() => setZoomed(false)}
        >
          <img
            src={selectionFlag(display, baseUrl)}
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

// (used to make linter happy if we don't reference ERAS elsewhere)
void ERAS;
