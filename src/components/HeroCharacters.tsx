/**
 * Sprite-cropped panels from /characters.jpg (1024×577, three equal-width
 * panels, each ~341×577).
 *
 *   Panel L (both)  → background-position-x: 0%
 *   Panel M (woman) → background-position-x: 50%
 *   Panel R (boy)   → background-position-x: 100%
 *
 * The source is JPEG, so no alpha. We embrace the magical purple/blue backdrop
 * and frame each panel with the same sticker-book border + drop shadow as the
 * mode cards.
 *
 * The image lives in /public; the URL must respect Vite's BASE_URL so it
 * resolves correctly under GitHub Pages' subpath (/Hana-s-flag-game/).
 */

const charactersUrl = `${import.meta.env.BASE_URL}characters.jpg`;
const bgStyle = { backgroundImage: `url(${charactersUrl})` } as const;

export function HeroPoster() {
  return (
    <div className="kdh-panel kdh-panel--poster" aria-hidden="true">
      <div className="kdh-panel__art kdh-panel__art--both" style={bgStyle} />
    </div>
  );
}

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
