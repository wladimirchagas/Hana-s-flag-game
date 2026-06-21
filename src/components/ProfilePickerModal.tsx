import { useRef, useState } from "react";
import { useProfile } from "../context/ProfileContext";
import { MascotAvatar } from "./MascotAvatar";
import {
  DEFAULT_AVATAR_ID,
  MASCOT_AVATARS,
  fileToAvatarDataUrl,
} from "../lib/avatars";
import { createProfile, normaliseShareCode, type Profile } from "../lib/profileStore";
import { loadStoredSelection } from "../lib/countrySelection";
import { loadLearnedCodes } from "../lib/learnedFlags";

type View = "list" | "add" | "join" | "code";

/**
 * "Who's playing?" — the Netflix-style persona picker, opened from the bottom
 * nav. Lets the user switch between profiles known on this device, create a new
 * one (name + mascot colour or uploaded photo), or bring a profile from another
 * device in by its share code.
 */
export function ProfilePickerModal({ onClose }: { onClose: () => void }) {
  const {
    deviceProfiles,
    activeProfile,
    setActiveProfile,
    activateProfileByCode,
    forgetProfile,
  } = useProfile();

  const [view, setView] = useState<View>("list");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add-profile form state
  const [name, setName] = useState("");
  const [avatarId, setAvatarId] = useState<string>(DEFAULT_AVATAR_ID);
  const fileRef = useRef<HTMLInputElement>(null);

  // Share-code view: which profile's code to reveal (opt-in, never shown
  // automatically during profile creation).
  const [codeProfile, setCodeProfile] = useState<Profile | null>(null);

  // Join-by-code state
  const [code, setCode] = useState("");

  const switchTo = async (id: string) => {
    setBusy(true);
    setError(null);
    try {
      const profile = await activateProfileByCode(id);
      if (!profile) {
        setError("That profile could not be loaded.");
        return;
      }
      onClose();
    } finally {
      setBusy(false);
    }
  };

  const playAsGuest = () => {
    setActiveProfile(null);
    onClose();
  };

  const handleUpload = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    try {
      setAvatarId(await fileToAvatarDataUrl(file));
    } catch {
      setError("Could not read that image. Try another photo.");
    }
  };

  const handleCreate = async () => {
    const displayName = name.trim();
    if (!displayName) {
      setError("Please enter a name.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      // Seed the new profile with this device's existing saved & learned flags
      // so nothing the player already has is lost when they create a profile.
      const profile = await createProfile({
        displayName,
        avatarId,
        seed: {
          selectedCodes: loadStoredSelection().codes,
          learnedCodes: loadLearnedCodes(),
        },
      });
      setActiveProfile(profile);
      onClose();
    } catch {
      setError("Couldn't create the profile. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const handleJoin = async () => {
    const id = normaliseShareCode(code);
    if (!id) {
      setError("Please enter a profile code.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const profile = await activateProfileByCode(id);
      if (!profile) {
        setError("No profile found for that code.");
        return;
      }
      onClose();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="profile-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="profile-modal">
        <header className="profile-modal__header">
          <h2 id="profile-modal-title" className="profile-modal__title">
            {view === "add"
              ? "New profile"
              : view === "join"
                ? "Add from another device"
                : view === "code"
                  ? "Share code"
                  : "Who's playing?"}
          </h2>
          <button
            type="button"
            className="profile-modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        <div className="profile-modal__body">
          {error && <p className="profile-modal__error">{error}</p>}

          {view === "list" && (
            <>
              <ul className="profile-grid">
                {deviceProfiles.map((p) => (
                  <li key={p.id} className="profile-grid__item">
                    <button
                      type="button"
                      className={
                        "profile-card" +
                        (activeProfile?.id === p.id ? " profile-card--active" : "")
                      }
                      onClick={() => switchTo(p.id)}
                      disabled={busy}
                    >
                      <MascotAvatar avatarId={p.avatarId} size={64} alt="" />
                      <span className="profile-card__name">{p.displayName}</span>
                    </button>
                    <button
                      type="button"
                      className="profile-card__forget"
                      onClick={() => forgetProfile(p.id)}
                      aria-label={`Remove ${p.displayName} from this device`}
                      title="Remove from this device"
                    >
                      ×
                    </button>
                  </li>
                ))}

                <li className="profile-grid__item">
                  <button
                    type="button"
                    className="profile-card profile-card--add"
                    onClick={() => {
                      setName("");
                      setAvatarId(DEFAULT_AVATAR_ID);
                      setError(null);
                      setView("add");
                    }}
                  >
                    <span className="profile-card__plus" aria-hidden="true">
                      +
                    </span>
                    <span className="profile-card__name">Add profile</span>
                  </button>
                </li>
              </ul>

              <div className="profile-modal__actions">
                <button
                  type="button"
                  className="profile-btn profile-btn--ghost"
                  onClick={() => {
                    setCode("");
                    setError(null);
                    setView("join");
                  }}
                >
                  Use a profile from another device
                </button>
                {activeProfile && (
                  <button
                    type="button"
                    className="profile-btn profile-btn--ghost"
                    onClick={() => {
                      setCodeProfile(activeProfile);
                      setError(null);
                      setView("code");
                    }}
                  >
                    Show share code
                  </button>
                )}
                <button
                  type="button"
                  className="profile-btn profile-btn--ghost"
                  onClick={playAsGuest}
                >
                  Play as guest
                </button>
              </div>
            </>
          )}

          {view === "add" && (
            <div className="profile-form">
              <div className="profile-form__preview">
                <MascotAvatar avatarId={avatarId} size={88} alt="Avatar preview" />
              </div>

              <label className="profile-form__label" htmlFor="profile-name">
                Name
              </label>
              <input
                id="profile-name"
                className="profile-form__input"
                type="text"
                value={name}
                maxLength={48}
                placeholder="e.g. Hana"
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />

              <p className="profile-form__label">Choose a mascot colour</p>
              <div className="avatar-picker">
                {MASCOT_AVATARS.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    className={
                      "avatar-picker__option" +
                      (avatarId === a.id ? " avatar-picker__option--selected" : "")
                    }
                    onClick={() => setAvatarId(a.id)}
                    aria-label={a.label}
                    title={a.label}
                  >
                    <MascotAvatar avatarId={a.id} size={44} alt="" />
                  </button>
                ))}
              </div>

              <div className="profile-form__upload">
                <button
                  type="button"
                  className="profile-btn profile-btn--ghost"
                  onClick={() => fileRef.current?.click()}
                >
                  📷 Upload a photo
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    void handleUpload(e.target.files?.[0]);
                    e.target.value = "";
                  }}
                />
              </div>

              <div className="profile-modal__actions">
                <button
                  type="button"
                  className="profile-btn"
                  onClick={handleCreate}
                  disabled={busy}
                >
                  {busy ? "Creating…" : "Create profile"}
                </button>
                <button
                  type="button"
                  className="profile-btn profile-btn--ghost"
                  onClick={() => {
                    setError(null);
                    setView("list");
                  }}
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {view === "join" && (
            <div className="profile-form">
              <p className="profile-form__hint">
                Enter the share code shown on your other device to load that
                profile here.
              </p>
              <label className="profile-form__label" htmlFor="profile-code">
                Profile code
              </label>
              <input
                id="profile-code"
                className="profile-form__input profile-form__input--code"
                type="text"
                value={code}
                placeholder="HANA-XXXX-XXXX-XXXX"
                onChange={(e) => setCode(e.target.value)}
                autoFocus
              />
              <div className="profile-modal__actions">
                <button
                  type="button"
                  className="profile-btn"
                  onClick={handleJoin}
                  disabled={busy}
                >
                  {busy ? "Loading…" : "Load profile"}
                </button>
                <button
                  type="button"
                  className="profile-btn profile-btn--ghost"
                  onClick={() => {
                    setError(null);
                    setView("list");
                  }}
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {view === "code" && codeProfile && (
            <div className="profile-form">
              <div className="profile-form__preview">
                <MascotAvatar avatarId={codeProfile.avatarId} size={88} alt="" />
                <span className="profile-card__name">{codeProfile.displayName}</span>
              </div>
              <p className="profile-form__hint">
                Enter this code on another device to use{" "}
                <strong>{codeProfile.displayName}</strong> there. There's no
                password — anyone with the code can open this profile, so keep it
                private.
              </p>
              <p className="profile-code-display">{codeProfile.id}</p>
              <div className="profile-modal__actions">
                <button
                  type="button"
                  className="profile-btn"
                  onClick={() => {
                    void navigator.clipboard?.writeText(codeProfile.id);
                  }}
                >
                  Copy code
                </button>
                <button
                  type="button"
                  className="profile-btn profile-btn--ghost"
                  onClick={() => {
                    setError(null);
                    setView("list");
                  }}
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
