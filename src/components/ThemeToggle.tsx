import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={`theme-toggle ${isDark ? "theme-toggle--dark" : "theme-toggle--light"}`}
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__icon theme-toggle__icon--sun">☀️</span>
        <span className="theme-toggle__icon theme-toggle__icon--moon">🌙</span>
        <span className="theme-toggle__thumb">
          <span className="theme-toggle__face" aria-hidden="true">
            {isDark ? "🌙" : "☀️"}
          </span>
        </span>
      </span>
    </button>
  );
}
