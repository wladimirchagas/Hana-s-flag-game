import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Hero character artwork is split across three sprite-sheet images in /public,
 * each with a different grid layout. We define each individual cell as a
 * "scene" with grid metadata, then rotate through them in a carousel.
 *
 *   characters.jpg          — 3×1 grid (original; Panel L is the only scene)
 *   characters-scenes-1.jpg — 2×2 grid (4 blue-tiger scenes)
 *   characters-scenes-2.jpg — 3×3 grid (9 varied action scenes)
 *
 * Total scene pool: 14.
 *
 * The burst overlay (HeroCutIn) still uses the original characters.jpg's
 * Panel M (woman) and Panel R (boy) — they are the only clean single-
 * character portraits, which is what the left/right cut-in layout needs.
 */

type Scene = {
  file: string;
  cols: number;
  rows: number;
  col: number;
  row: number;
  /** CSS aspect-ratio value for one cell of this grid (width / height). */
  aspect: string;
};

const SCENES: readonly Scene[] = [
  // Original characters.jpg, Panel L (both characters on platform).
  // Each cell is 341×577 → 0.59 aspect.
  { file: "characters.jpg", cols: 3, rows: 1, col: 0, row: 0, aspect: "341 / 577" },

  // characters-scenes-1.jpg (768×1024, 2×2) — each cell 384×512 → 0.75.
  ...Array.from({ length: 4 }, (_, i) => ({
    file: "characters-scenes-1.jpg",
    cols: 2,
    rows: 2,
    col: i % 2,
    row: Math.floor(i / 2),
    aspect: "3 / 4",
  })),

  // characters-scenes-2.jpg (768×1024, 3×3) — each cell 256×341 → 0.75.
  ...Array.from({ length: 9 }, (_, i) => ({
    file: "characters-scenes-2.jpg",
    cols: 3,
    rows: 3,
    col: i % 3,
    row: Math.floor(i / 3),
    aspect: "3 / 4",
  })),
];

function spriteStyle(scene: Scene): React.CSSProperties {
  const url = `${import.meta.env.BASE_URL}${scene.file}`;
  const posX = scene.cols > 1 ? `${(scene.col / (scene.cols - 1)) * 100}%` : "0%";
  const posY = scene.rows > 1 ? `${(scene.row / (scene.rows - 1)) * 100}%` : "0%";
  return {
    backgroundImage: `url(${url})`,
    backgroundSize: `${scene.cols * 100}% ${scene.rows * 100}%`,
    backgroundPosition: `${posX} ${posY}`,
  };
}

const AUTO_ROTATE_MS = 5000;

/**
 * Rotating scene poster. Auto-advances every 5s. Provides ←/→ arrows so the
 * user can flip through manually; using them resets the auto-rotate timer.
 * Pauses on hover/focus, and respects prefers-reduced-motion.
 */
export function HeroCarousel({ className = "" }: { className?: string }) {
  // Start at a random scene each mount so different visits open on different art.
  const [index, setIndex] = useState<number>(() =>
    Math.floor(Math.random() * SCENES.length),
  );
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const advance = useCallback((delta: number) => {
    setIndex((i) => (i + delta + SCENES.length) % SCENES.length);
  }, []);

  // Pause auto-rotate for users who prefer reduced motion.
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (paused || reducedMotion) return;
    timerRef.current = window.setInterval(() => advance(1), AUTO_ROTATE_MS);
    return () => {
      if (timerRef.current != null) window.clearInterval(timerRef.current);
    };
  }, [paused, advance, index, reducedMotion]);

  // Resets the auto-rotate timer by toggling pause state briefly. Used by the
  // manual arrows so a user who clicks ← isn't immediately advanced by the
  // background timer.
  const restartTimer = useCallback(() => {
    if (timerRef.current != null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const onPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    restartTimer();
    advance(-1);
  };
  const onNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    restartTimer();
    advance(1);
  };

  const scene = SCENES[index]!;

  return (
    <div
      className={`kdh-panel kdh-panel--poster ${className}`}
      style={{ aspectRatio: scene.aspect }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Use `key` so React mounts a fresh element on scene change; its CSS
          animation re-fires, fading the new scene in. */}
      <div
        key={index}
        className="kdh-panel__art kdh-panel__art--fade"
        style={spriteStyle(scene)}
        aria-hidden="true"
      />
      <button
        type="button"
        className="kdh-panel__nav kdh-panel__nav--prev"
        onClick={onPrev}
        aria-label="Previous scene"
      >
        ‹
      </button>
      <button
        type="button"
        className="kdh-panel__nav kdh-panel__nav--next"
        onClick={onNext}
        aria-label="Next scene"
      >
        ›
      </button>
      <div className="kdh-panel__dots" aria-hidden="true">
        {SCENES.map((_, i) => (
          <span
            key={i}
            className={`kdh-panel__dot ${
              i === index ? "kdh-panel__dot--active" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// --- Burst cut-ins still use the original characters.jpg M/R portraits ---

const charactersUrl = `${import.meta.env.BASE_URL}characters.jpg`;
const bgStyle = { backgroundImage: `url(${charactersUrl})` } as const;

export function HeroCutIn({
  variant,
  side,
}: {
  variant: "woman" | "boy";
  side: "left" | "right";
}) {
  return (
    <div
      className={`kdh-panel kdh-panel--cutin kdh-panel--${side}`}
      aria-hidden="true"
    >
      <div className={`kdh-panel__art kdh-panel__art--${variant}`} style={bgStyle} />
    </div>
  );
}
