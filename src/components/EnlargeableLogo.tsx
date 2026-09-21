import type { CSSProperties, ReactNode, SyntheticEvent } from "react";
import { applyLogoBackdropTone } from "../lib/logoBackdrop";
import { UiIcon } from "./UiIcon";

/**
 * Detail-panel logo thumbnail: neutral adaptive plate + click-to-enlarge.
 * Shared by newspaper / agency / airline / broadcaster / tourism / party
 * widgets so they cannot drift on the logo-readability treatment.
 */
export function EnlargeableLogo({
  src,
  alt,
  ariaLabel,
  onEnlarge,
  hint = (
    <>
      <UiIcon name="expand" /> Click to enlarge
    </>
  ),
  imgStyle,
  onImgError,
}: {
  src: string;
  alt: string;
  ariaLabel: string;
  onEnlarge: (url: string) => void;
  hint?: ReactNode;
  imgStyle?: CSSProperties;
  onImgError?: (e: SyntheticEvent<HTMLImageElement>) => void;
}) {
  return (
    <button
      type="button"
      className="learn-fs__flag learn-fs__flag--logo"
      data-logo-surface=""
      onClick={() => onEnlarge(src)}
      aria-label={ariaLabel}
    >
      <img
        key={src}
        src={src}
        alt={alt}
        className="learn-fs__flag-img"
        draggable={false}
        style={imgStyle ?? { objectFit: "contain", maxHeight: "110px", padding: "6px" }}
        onLoad={(e) => applyLogoBackdropTone(e.currentTarget)}
        onError={onImgError}
      />
      <span className="learn-fs__flag-hint" aria-hidden="true">
        {hint}
      </span>
    </button>
  );
}
