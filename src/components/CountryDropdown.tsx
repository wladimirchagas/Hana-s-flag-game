import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { Country } from "../api/countries";

type Props = {
  countries: Country[];
  value: Country | null;
  onChange: (country: Country | null) => void;
  disabled: boolean;
  label: string;
};

const MAX_OPTIONS = 200;

export function CountryDropdown({
  countries,
  value,
  onChange,
  disabled,
  label,
}: Props) {
  const listId = useId();
  const inputId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  useEffect(() => {
    if (value) {
      setQuery(value.name);
    } else if (!open) {
      setQuery("");
    }
  }, [value, open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries.slice(0, MAX_OPTIONS);
    return countries
      .filter((c) => c.name.toLowerCase().includes(q))
      .slice(0, MAX_OPTIONS);
  }, [countries, query]);

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

  function selectCountry(c: Country) {
    onChange(c);
    setQuery(c.name);
    setOpen(false);
  }

  return (
    <div className="dropdown" ref={containerRef}>
      <label className="dropdown-label" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        className="dropdown-input"
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
        <ul id={listId} className="dropdown-list" role="listbox">
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
    </div>
  );
}
