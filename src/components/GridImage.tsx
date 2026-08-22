/**
 * The one `<img>` every grid, chart and table thumbnail in the app renders.
 *
 * WHY THIS EXISTS — native `loading="lazy"` cannot be trusted in WebKit.
 *
 * Reported twice by the owner on an iPad, two days apart, with the same root
 * cause wearing two different disguises:
 *
 *   1. Switching the Learn grid's "Show" dropdown from Football associations
 *      back to National flags left the CRESTS on screen under the flag heading.
 *      WebKit had not re-run the deferred load when the live element's `src`
 *      changed, so it went on painting the picture already in the element.
 *   2. After that was fixed by keying each image to its `src` (so a changed
 *      image mounts a fresh element), the Passports view showed NOTHING at all:
 *      every tile an empty box, no image, no "—" placeholder, no `error` event.
 *      An image that occupies its box, paints nothing and never errors is one
 *      whose request was never made — WebKit had deferred the load of 195
 *      freshly-inserted lazy images and never started any of them.
 *
 * Both are the same defect: WebKit's native lazy loader mis-handles images
 * whose loads are set up dynamically (inserted in a batch, or re-pointed) while
 * the page is scrolled. It is long-standing and widely reported, and the known
 * workaround is the one taken here — do not hand WebKit a `loading="lazy"`
 * attribute at all; defer the load ourselves.
 *
 * So this component keeps the bandwidth win of lazy loading while making the
 * load DETERMINISTIC: it holds `src` back until an IntersectionObserver says
 * the tile is within `ROOT_MARGIN` of the viewport, then sets it. An observer
 * always delivers an initial callback for its target, which is precisely the
 * step WebKit's native implementation gets wrong; and where
 * IntersectionObserver does not exist at all, the image loads immediately — a
 * visible image always beats a clever one.
 */
import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";

/**
 * How far outside the viewport a thumbnail starts loading. Generous on purpose:
 * scrolling a long grid must never reveal an empty tile, which is the whole
 * user-visible difference between "lazy" and "broken".
 */
const ROOT_MARGIN = "800px";

type GridImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "loading"> & {
  /** The image URL. Required — a thumbnail with no image renders a placeholder
   *  instead of this component, never an `<img>` with an empty src. */
  src: string;
};

export function GridImage({ src, ...imgProps }: GridImageProps) {
  const [load, setLoad] = useState(
    () => typeof IntersectionObserver === "undefined",
  );
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (load) return;
    const img = ref.current;
    if (!img) return;
    // Observe the WRAPPER, not the image: an <img> with no src has no layout
    // box, and a zero-area target never reports isIntersecting.
    const target = img.parentElement ?? img;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: ROOT_MARGIN },
    );
    io.observe(target);
    return () => io.disconnect();
  }, [load]);

  // Keyed by the src actually applied, so a changed image is a NEW element —
  // never a live one re-pointed, which is what leaves a stale picture (and the
  // imperative onError state) behind. See CLAUDE.md, "A swappable image must be
  // a NEW element".
  return (
    <img
      key={load ? src : undefined}
      ref={ref}
      src={load ? src : undefined}
      {...imgProps}
    />
  );
}
