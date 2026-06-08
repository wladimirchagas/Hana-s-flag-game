import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { SubdivisionMeta } from "../types/subdivision";

type Props = {
  divisions: SubdivisionMeta[];
  value: SubdivisionMeta | null;
  onChange: (division: SubdivisionMeta | null) => void;
  disabled: boolean;
  label: string;
};

const MAX_OPTIONS = 200;

export function SubdivisionDropdown({
  divisions,
  value,
  onChange,
  disabled,
  label,
}: Props) {
  const listId = useId();
  const inputId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const modalSearchRef = useRef<HTMLInputElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (disabled) {
      setOpen(false);
      setModalOpen(false);
    }
  }, [disabled]);

  const lastSyncedValueRef = useRef<SubdivisionMeta | null>(value);
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

  const sortedDivisions = useMemo(
    () =>
      [...divisions].sort((a, b) =>
        a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
      ),
    [divisions],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sortedDivisions.slice(0, MAX_OPTIONS);
    return sortedDivisions
      .filter((d) => d.name.toLowerCase().includes(q))
      .slice(0, MAX_OPTIONS);
  }, [sortedDivisions, query]);

  const filteredAll = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sortedDivisions;
    return sortedDivisions.filter((d) => d.name.toLowerCase().includes(q));
  }, [sortedDivisions, query]);

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

  function selectDivision(d: SubdivisionMeta) {
    onChange(d);
    setQuery(d.name);
    setOpen(false);
    setModalOpen(false);
  }

  function openModal() {
    if (disabled) return;
    setQuery("");
    setModalOpen(true);
  }

  return (
    <div className="dropdown" ref={containerRef}>
      <label className="dropdown-label" htmlFor={inputId}>
        {label}
      </label>

      {/* === Desktop: typeable combobox === */}
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
        placeholder="Search…"
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
          className="dropdown-list dropdown-list--desktop dropdown-list--down"
          role="listbox"
        >
          {filtered.length === 0 ? (
            <li className="dropdown-empty">No matches</li>
          ) : (
            filtered.map((d) => (
              <li key={d.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={value?.code === d.code}
                  className="dropdown-option"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selectDivision(d)}
                >
                  {d.name}
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
          {value ? value.name : "Tap to pick an answer"}
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
              <h3 className="dropdown-modal__title">Pick an answer</h3>
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
                filteredAll.map((d) => (
                  <li key={d.code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={value?.code === d.code}
                      className={`dropdown-modal__option ${
                        value?.code === d.code
                          ? "dropdown-modal__option--selected"
                          : ""
                      }`}
                      onClick={() => selectDivision(d)}
                    >
                      {d.name}
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
