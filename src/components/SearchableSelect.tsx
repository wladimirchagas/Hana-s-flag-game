import { useEffect, useId, useMemo, useRef, useState } from "react";
import { UiIcon } from "./UiIcon";
import { usePopoverBounds } from "../hooks/usePopoverBounds";
import { normalizeForSearch } from "../lib/searchNormalize";

export type SelectOption = {
  value: string;
  label: string;
  secondaryLabel?: string;
};

export type SearchableSelectProps = {
  id?: string;
  label?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  minOptionsForSearch?: number;
  disabled?: boolean;
  popoverWidth?: number;
  ariaLabel?: string;
  className?: string;
  triggerClassName?: string;
};

/**
 * Dropdown select component with type-to-search filtering.
 *
 * Rules:
 * - Dropdowns with more than 10 options (configurable via `minOptionsForSearch`,
 *   defaulting to 10) render a search input to type and filter matching results.
 * - Smaller dropdowns (<= 10 options) render cleanly without an unnecessary search box.
 * - Supports keyboard navigation (ArrowUp, ArrowDown, Enter, Escape).
 * - Bounds-checked against the viewport via `usePopoverBounds`.
 */
export function SearchableSelect({
  id: explicitId,
  label,
  value,
  options,
  onChange,
  placeholder = "Select an option…",
  searchPlaceholder = "Filter options…",
  minOptionsForSearch = 10,
  disabled = false,
  popoverWidth = 260,
  ariaLabel,
  className = "",
  triggerClassName,
}: SearchableSelectProps) {
  const generatedId = useId();
  const id = explicitId || generatedId;
  const listId = `${id}-list`;
  const searchInputId = `${id}-search`;

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const popoverStyle = usePopoverBounds(open, containerRef, popoverWidth);
  const showSearch = options.length > minOptionsForSearch;

  // Selected option
  const selectedOption = useMemo(
    () => options.find((o) => o.value === value),
    [options, value],
  );

  // Filtered options based on user query
  const filteredOptions = useMemo(() => {
    const q = normalizeForSearch(query.trim());
    if (!q) return options;
    return options.filter((o) => {
      const matchLabel = normalizeForSearch(o.label).includes(q);
      const matchSecondary = o.secondaryLabel
        ? normalizeForSearch(o.secondaryLabel).includes(q)
        : false;
      return matchLabel || matchSecondary;
    });
  }, [options, query]);

  // When dropdown opens, initialize query and highlight the selected option
  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }

    const idx = filteredOptions.findIndex((o) => o.value === value);
    setHighlightedIndex(idx >= 0 ? idx : 0);

    if (showSearch) {
      const timer = window.setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => window.clearTimeout(timer);
    }
  }, [open, value, showSearch, filteredOptions]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (!open || !listRef.current) return;
    const items = listRef.current.querySelectorAll<HTMLElement>(
      ".searchable-select__option",
    );
    if (items[highlightedIndex]) {
      items[highlightedIndex].scrollIntoView({
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [open, highlightedIndex]);

  // Dismiss on outside click or Escape
  useEffect(() => {
    if (!open) return;

    function handleMouseDown(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredOptions.length - 1,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredOptions[highlightedIndex]) {
        handleSelect(filteredOptions[highlightedIndex].value);
      }
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  const effectiveAriaLabel = ariaLabel || label || placeholder;

  return (
    <div
      className={`searchable-select ${className}`}
      ref={containerRef}
    >
      {label && (
        <span className="flag-grid__group-select-label" id={`${id}-label`}>
          {label}
        </span>
      )}

      <button
        ref={triggerRef}
        id={id}
        type="button"
        className={`${triggerClassName || "flag-grid__select"} searchable-select__trigger${
          open ? " searchable-select__trigger--open" : ""
        }`}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={label ? `${id}-label ${id}` : undefined}
        aria-label={label ? undefined : effectiveAriaLabel}
        disabled={disabled}
      >
        <span className="searchable-select__trigger-text">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
      </button>

      {open && (
        <div
          className="searchable-select__popover"
          style={popoverStyle}
          role="dialog"
          aria-label={effectiveAriaLabel}
        >
          {showSearch && (
            <div className="searchable-select__search-box">
              <span
                className="searchable-select__search-icon"
                aria-hidden="true"
              >
                <UiIcon name="search" />
              </span>
              <input
                ref={searchInputRef}
                id={searchInputId}
                type="text"
                className="searchable-select__search-input"
                placeholder={searchPlaceholder}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setHighlightedIndex(0);
                }}
                onKeyDown={handleListKeyDown}
                aria-label={`Search ${effectiveAriaLabel}`}
                autoComplete="off"
                spellCheck="false"
              />
              {query && (
                <button
                  type="button"
                  className="searchable-select__clear-btn"
                  onClick={() => {
                    setQuery("");
                    searchInputRef.current?.focus();
                  }}
                  aria-label="Clear filter"
                >
                  <UiIcon name="close" />
                </button>
              )}
            </div>
          )}

          <ul
            ref={listRef}
            id={listId}
            className="searchable-select__list"
            role="listbox"
            tabIndex={showSearch ? -1 : 0}
            onKeyDown={handleListKeyDown}
            aria-label={effectiveAriaLabel}
          >
            {filteredOptions.length === 0 ? (
              <li className="searchable-select__empty" role="presentation">
                No matching options
              </li>
            ) : (
              filteredOptions.map((opt, idx) => {
                const isSelected = opt.value === value;
                const isHighlighted = idx === highlightedIndex;
                return (
                  <li key={opt.value} role="presentation">
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      className={`searchable-select__option${
                        isSelected ? " searchable-select__option--selected" : ""
                      }${
                        isHighlighted
                          ? " searchable-select__option--highlighted"
                          : ""
                      }`}
                      onClick={() => handleSelect(opt.value)}
                      onMouseEnter={() => setHighlightedIndex(idx)}
                    >
                      <span className="searchable-select__option-label">
                        {opt.label}
                        {opt.secondaryLabel && (
                          <span className="searchable-select__option-secondary">
                            {opt.secondaryLabel}
                          </span>
                        )}
                      </span>
                      {isSelected && (
                        <span
                          className="searchable-select__check"
                          aria-hidden="true"
                        >
                          <UiIcon name="check" />
                        </span>
                      )}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
