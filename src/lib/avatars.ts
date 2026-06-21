/**
 * Avatar system for user profiles.
 *
 * An avatar is stored on the profile as a single `avatarId` string that is
 * EITHER:
 *   - a preset mascot colour token, e.g. `"mascot:teal"`, or
 *   - an uploaded photo as a `data:image/...;base64,...` URL.
 *
 * Overloading one field keeps the Firestore document and the `Profile` type
 * unchanged while supporting both kinds. `MascotAvatar` resolves the string at
 * render time.
 */

export type MascotAvatar = {
  /** Stored token, e.g. `"mascot:coral"`. */
  id: string;
  /** Human label for the picker. */
  label: string;
  /** Pin/face body colour. */
  body: string;
  /** Lighter inner-highlight colour. */
  highlight: string;
};

/**
 * Preset mascot colours — variations of Hana's map-pin mascot (default coral,
 * see `Mascot.tsx`). These are the zero-friction "generic" avatars; users who
 * want their own picture can upload a photo instead.
 */
export const MASCOT_AVATARS: readonly MascotAvatar[] = [
  { id: "mascot:coral", label: "Coral", body: "#ff6b6b", highlight: "#ff8888" },
  { id: "mascot:tangerine", label: "Tangerine", body: "#ff9f45", highlight: "#ffba6e" },
  { id: "mascot:mustard", label: "Mustard", body: "#ffc857", highlight: "#ffd97a" },
  { id: "mascot:lime", label: "Lime", body: "#8bd450", highlight: "#a9e072" },
  { id: "mascot:teal", label: "Teal", body: "#4ecdc4", highlight: "#74e4dc" },
  { id: "mascot:sky", label: "Sky", body: "#4a9ff5", highlight: "#7bbcff" },
  { id: "mascot:violet", label: "Violet", body: "#9b6bff", highlight: "#b794ff" },
  { id: "mascot:pink", label: "Pink", body: "#ff6bcb", highlight: "#ff94db" },
];

/** Token used when no avatar has been chosen yet. */
export const DEFAULT_AVATAR_ID = MASCOT_AVATARS[0]!.id;

/** True when the avatar is an uploaded photo rather than a mascot preset. */
export function isPhotoAvatar(avatarId: string): boolean {
  return avatarId.startsWith("data:");
}

/** Resolve a mascot token to its colours, falling back to the default. */
export function resolveMascotAvatar(avatarId: string): MascotAvatar {
  return (
    MASCOT_AVATARS.find((a) => a.id === avatarId) ?? MASCOT_AVATARS[0]!
  );
}

/**
 * Downscale & re-encode an uploaded image file to a small square JPEG data URL
 * suitable for storing inline on the profile document. Caps the longest edge at
 * `maxEdge` px and centre-crops to a square so the avatar always fills its
 * circular frame. Keeping the output small (~a few tens of KB) means it fits
 * comfortably inside a single Firestore document field.
 */
export async function fileToAvatarDataUrl(
  file: File,
  maxEdge = 256,
): Promise<string> {
  const bitmap = await loadImage(file);
  const srcW = "naturalWidth" in bitmap ? bitmap.naturalWidth : bitmap.width;
  const srcH = "naturalHeight" in bitmap ? bitmap.naturalHeight : bitmap.height;
  const side = Math.min(srcW, srcH);
  const sx = (srcW - side) / 2;
  const sy = (srcH - side) / 2;

  const canvas = document.createElement("canvas");
  canvas.width = maxEdge;
  canvas.height = maxEdge;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");
  ctx.drawImage(bitmap, sx, sy, side, side, 0, 0, maxEdge, maxEdge);
  if ("close" in bitmap && typeof bitmap.close === "function") bitmap.close();

  return canvas.toDataURL("image/jpeg", 0.85);
}

async function loadImage(file: File): Promise<ImageBitmap | HTMLImageElement> {
  // Prefer createImageBitmap (fast, off-thread) but fall back to an <img> when
  // it's missing (older Safari) OR rejects — some engines expose the function
  // yet fail to decode certain files ("source image could not be decoded").
  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(file);
    } catch {
      // fall through to the <img> decoder
    }
  }
  return loadViaImgElement(file);
}

function loadViaImgElement(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image"));
    };
    img.src = url;
  });
}
