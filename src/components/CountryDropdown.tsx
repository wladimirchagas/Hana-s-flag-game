import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { Country } from "../api/countries";

type Props = {
  countries: Country[];
  value: Country | null;
  onChange: (country: Country | null) => void;
  disabled: boolean;
  label: string;
  /**
   * Where the desktop suggestion list opens relative to the input. Default
   * "down" (existing behaviour). Pass "up" when the dropdown lives in a
   * bottom-anchored panel (Learn page) so the list rises into view instead
   * of opening off-screen.
   */
  listPlacement?: "down" | "up";
};

const MAX_OPTIONS = 200;

/**
 * Country answer picker.
 *
 * Desktop (>= 540px): typeable combobox — type to filter, click a suggestion.
 * Mobile (< 540px): tap-tile that opens a full-screen modal with its own
 * search box and tappable list. This avoids the standard mobile bug where
 * the OS keyboard covers the suggestion list opened inline.
 *
 * Both UIs are rendered into the DOM; CSS shows the right one for the
 * current viewport so server-render / hydration is consistent.
 */
export function CountryDropdown({
  countries,
  value,
  onChange,
  disabled,
  label,
  listPlacement = "down",
}: Props) {
  const listId = useId();
  const inputId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const modalSearchRef = useRef<HTMLInputElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // --- Shared state syncing -------------------------------------------------

  useEffect(() => {
    if (disabled) {
      setOpen(false);
      setModalOpen(false);
    }
  }, [disabled]);

  const lastSyncedValueRef = useRef<Country | null>(value);
  const prevOpenRef = useRef(open);
  const prevModalOpenRef = useRef(modalOpen);

  useEffect(() => {
    const becameClosed = (prevOpenRef.current && !open) || (prevModalOpenRef.current && !modalOpen);
    const valueChanged = value !== lastSyncedValueRef.current;
    const shouldSyncValue = valueChanged && (value !== null || (!open && !modalOpen));

    if (shouldSyncValue || becameClosed) {
      lastSyncedValueRef.current = value;
      setQuery(value ? value.name : "");
    } else if (!value && !open && !modalOpen) {
      setQuery("");
    }

    prevOpenRef.current = open;
    prevModalOpenRef.current = modalOpen;
  }, [value, open, modalOpen]);

  // ALWAYS show countries in alphabetical order, no matter what order they
  // arrive in. In Quick Quiz mode the alternatives come from useGame's
  // buildAlternatives which mixes the correct answer with random distractors,
  // so we sort here as the single source of truth. localeCompare with "en"
  // gives consistent results across browsers (e.g. handles "Côte d'Ivoire"
  // correctly relative to "Croatia").
  const sortedCountries = useMemo(
    () =>
      [...countries].sort((a, b) =>
        a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
      ),
    [countries],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sortedCountries.slice(0, MAX_OPTIONS);
    return sortedCountries
      .filter((c) => c.name.toLowerCase().includes(q))
      .slice(0, MAX_OPTIONS);
  }, [sortedCountries, query]);

  // The mobile modal lists ALL countries (or filtered by its own search). On
  // mobile the list is the only browsing UI, so we don't cap aggressively.
  const filteredAll = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sortedCountries;
    return sortedCountries.filter((c) => c.name.toLowerCase().includes(q));
  }, [sortedCountries, query]);

  // Desktop: close the popover when the user clicks outside.
  useEffect(() => {
    function handleClickOutside(ev: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(ev.target as Node)
      ) {
        setOpen(false);
        if (value) setQuery(value.name);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value]);

  // Mobile modal lifecycle: lock body scroll, autofocus search, Esc to close,
  // restore focus to the tile that opened it.
  useEffect(() => {
    if (!modalOpen) return;
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => modalSearchRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocusedRef.current?.focus?.();
    };
  }, [modalOpen]);

  function selectCountry(c: Country) {
    onChange(c);
    setQuery(c.name);
    setOpen(false);
    setModalOpen(false);
  }

  function openModal() {
    if (disabled) return;
    // Open the modal with a fresh search query so the list shows everything.
    setQuery("");
    setModalOpen(true);
  }

  return (
    <div className="dropdown" ref={containerRef}>
      <label className="dropdown-label" htmlFor={inputId}>
        {label}
      </label>

      {/* === Desktop: typeable combobox (hidden on mobile via CSS) === */}
      <input
        id={inputId}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        className="dropdown-input dropdown-input--desktop"
        value={query}
        disabled={disabled}
        placeholder="Search countries…"
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(null);
          setOpen(true);
        }}
        onFocus={() => {
          if (!disabled) setOpen(true);
        }}
      />
      {open && !disabled && (
        <ul
          id={listId}
          className={`dropdown-list dropdown-list--desktop dropdown-list--${listPlacement}`}
          role="listbox"
        >
          {filtered.length === 0 ? (
            <li className="dropdown-empty">No matches</li>
          ) : (
            filtered.map((c) => (
              <li key={c.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={value?.code === c.code}
                  className="dropdown-option"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selectCountry(c)}
                >
                  {c.name}
                </button>
              </li>
            ))
          )}
        </ul>
      )}

      {/* === Mobile: tap-tile that opens a full-screen modal === */}
      <button
        type="button"
        className={`dropdown-input dropdown-tile ${
          value ? "" : "dropdown-tile--empty"
        }`}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={modalOpen}
        onClick={openModal}
      >
        <span className="dropdown-tile__text">
          {value ? value.name : "Tap to pick a country"}
        </span>
        <span className="dropdown-tile__chevron" aria-hidden="true">
          ▾
        </span>
      </button>

      {modalOpen && (
        <div
          className="dropdown-modal"
          role="dialog"
          aria-modal="true"
          aria-label={label}
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="dropdown-modal__sheet">
            <header className="dropdown-modal__header">
              <h3 className="dropdown-modal__title">Pick a country</h3>
              <button
                type="button"
                className="dropdown-modal__close"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </header>
            <div className="dropdown-modal__search">
              <input
                ref={modalSearchRef}
                type="text"
                className="dropdown-modal__input"
                placeholder="Type to filter…"
                value={query}
                inputMode="search"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <ul className="dropdown-modal__list" role="listbox">
              {filteredAll.length === 0 ? (
                <li className="dropdown-empty">No matches</li>
              ) : (
                filteredAll.map((c) => (
                  <li key={c.code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={value?.code === c.code}
                      className={`dropdown-modal__option ${
                        value?.code === c.code
                          ? "dropdown-modal__option--selected"
                          : ""
                      }`}
                      onClick={() => selectCountry(c)}
                    >
                      {c.name}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
