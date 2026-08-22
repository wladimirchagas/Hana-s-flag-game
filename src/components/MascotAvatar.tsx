import { isPhotoAvatar, resolveMascotAvatar } from "../lib/avatars";

/**
 * Renders a profile avatar from its stored `avatarId` — either an uploaded
 * photo (a `data:` URL) or a colour variation of Hana's mascot. Always a
 * circular frame so photos and mascots look consistent in the bottom nav and
 * the picker.
 */
export function MascotAvatar({
  avatarId,
  size = 32,
  alt = "",
}: {
  avatarId: string;
  size?: number;
  alt?: string;
}) {
  if (isPhotoAvatar(avatarId)) {
    return (
      <img
        key={avatarId}
        className="avatar avatar--photo"
        src={avatarId}
        alt={alt}
        width={size}
        height={size}
        style={{ width: size, height: size }}
      />
    );
  }

  const { body, highlight } = resolveMascotAvatar(avatarId);
  const ink = "#1a2238";
  return (
    <svg
      className="avatar avatar--mascot"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={alt || "Mascot avatar"}
    >
      <circle cx="50" cy="50" r="46" fill={body} stroke={ink} strokeWidth="3" />
      <circle cx="50" cy="44" r="24" fill={highlight} opacity="0.3" />
      {/* Eyes */}
      <circle cx="40" cy="47" r="5" fill={ink} />
      <circle cx="60" cy="47" r="5" fill={ink} />
      <circle cx="41.5" cy="45.5" r="1.9" fill="white" />
      <circle cx="61.5" cy="45.5" r="1.9" fill="white" />
      {/* Smile */}
      <path
        d="M37 60 Q50 72 63 60"
        fill="none"
        stroke={ink}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Cheeks */}
      <circle cx="29" cy="57" r="4" fill="#ffc857" opacity="0.75" />
      <circle cx="71" cy="57" r="4" fill="#ffc857" opacity="0.75" />
      {/* Star */}
      <path
        d="M50 20 L52.5 27 L60 27 L54.5 31.5 L56.5 39 L50 35 L43.5 39 L45.5 31.5 L40 27 L47.5 27 Z"
        fill="white"
        opacity="0.7"
      />
    </svg>
  );
}
