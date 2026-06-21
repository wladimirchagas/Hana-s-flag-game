import { useState } from "react";
import { useProfile } from "../context/ProfileContext";
import { MascotAvatar } from "./MascotAvatar";
import { ProfilePickerModal } from "./ProfilePickerModal";
import { DEFAULT_AVATAR_ID } from "../lib/avatars";
import "./ProfileNav.css";

/**
 * Persistent bottom navigation bar that hosts the active profile chip.
 *
 * The profile lives here (not the already-crowded top bar). Tapping the chip
 * opens the "Who's playing?" picker so the user can switch persona, create a
 * new one, or bring one in from another device by its share code. When no
 * persona is selected the chip reads "Guest" and invites the user to pick one.
 */
export function ProfileBottomNav() {
  const { activeProfile } = useProfile();
  const [pickerOpen, setPickerOpen] = useState(false);

  const avatarId = activeProfile?.avatarId ?? DEFAULT_AVATAR_ID;
  const name = activeProfile?.displayName ?? "Guest";

  return (
    <>
      <nav className="bottom-nav" aria-label="Profile">
        <button
          type="button"
          className="profile-chip"
          onClick={() => setPickerOpen(true)}
          aria-haspopup="dialog"
        >
          <MascotAvatar avatarId={avatarId} size={30} alt="" />
          <span className="profile-chip__text">
            <span className="profile-chip__name">{name}</span>
            <span className="profile-chip__hint">
              {activeProfile ? "Switch profile" : "Choose profile"}
            </span>
          </span>
        </button>
      </nav>
      {pickerOpen && <ProfilePickerModal onClose={() => setPickerOpen(false)} />}
    </>
  );
}
