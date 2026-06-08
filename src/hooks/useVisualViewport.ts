import { useEffect, useState } from "react";

export function useVisualViewport(active: boolean) {
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (!active) {
      setStyle({});
      return;
    }

    const updateViewport = () => {
      const vv = window.visualViewport;
      const isMobile = window.matchMedia("(max-width: 540px)").matches;

      if (vv && isMobile) {
        setStyle({
          position: "fixed",
          top: `${vv.offsetTop}px`,
          left: `${vv.offsetLeft}px`,
          width: `${vv.width}px`,
          height: `${vv.height}px`,
        });
      } else {
        setStyle({});
      }
    };

    updateViewport();

    const vv = window.visualViewport;
    const handleResize = () => updateViewport();

    if (vv) {
      vv.addEventListener("resize", handleResize);
      vv.addEventListener("scroll", handleResize);
    }
    window.addEventListener("resize", handleResize);

    // Keep scroll locked to 0 when input receives focus and triggers keyboard viewport shifting
    const preventPageScroll = () => {
      if (window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener("scroll", preventPageScroll);

    return () => {
      if (vv) {
        vv.removeEventListener("resize", handleResize);
        vv.removeEventListener("scroll", handleResize);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", preventPageScroll);
    };
  }, [active]);

  return style;
}
