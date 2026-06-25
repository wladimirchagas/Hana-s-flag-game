import { useRef, useState } from "react";
import { useProfile } from "../context/ProfileContext";
import { MascotAvatar } from "./MascotAvatar";
import {
  DEFAULT_AVATAR_ID,
  MASCOT_AVATARS,
  fileToAvatarDataUrl,
} from "../lib/avatars";
import { createProfile, type DeviceProfileRef } from "../lib/profileStore";
import { loadStoredSelection } from "../lib/countrySelection";
import { loadLearnedCodes } from "../lib/learnedFlags";
import { blurActiveElementThenRun } from "../lib/dismissKeyboard";

type View = "list" | "add" | "edit" | "confirmDelete";

/**
 * "Who's playing?" — the persona picker, opened from the bottom nav.
 *
 * Profiles are PUBLIC/SHARED: the list shows every profile that exists, on any
 * device, with no password or code. Anyone can pick any profile (the accepted
 * trade-off of a passwordless, kiosk-style model). Users can also create a new
 * profile or delete one — deletion is guarded by a confirmation screen because
 * it removes the profile for everyone.
 */
export function ProfilePickerModal({ onClose }: { onClose: () => void }) {
  const {
    allProfiles,
    deviceProfiles,
    activeProfile,
    syncState,
    syncError,
    setActiveProfile,
    activateProfileByCode,
    deleteProfile,
    editProfile,
  } = useProfile();

  // Prefer the live, shared list; fall back to this device's cached list when
  // offline so the picker is never empty for profiles created here.
  const profiles = allProfiles.length > 0 ? allProfiles : deviceProfiles;

  const [view, setView] = useState<View>("list");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add/edit form state (shared between the two views — only one is ever active).
  const [name, setName] = useState("");
  const [avatarId, setAvatarId] = useState<string>(DEFAULT_AVATAR_ID);
  const fileRef = useRef<HTMLInputElement>(null);

  // Which profile is being edited, when view === "edit".
  const [editingId, setEditingId] = useState<string | null>(null);

  // Delete-confirmation state: which profile is pending deletion.
  const [pendingDelete, setPendingDelete] = useState<DeviceProfileRef | null>(null);

  // The "add"/"edit" forms keep a text input focused. Closing the modal (or
  // navigating away from those views) must blur that input BEFORE it unmounts
  // — see src/lib/dismissKeyboard.ts for why. Every path that calls onClose()
  // or leaves the add/edit view must go through one of these two helpers
  // instead of calling onClose()/setView() directly.
  const closeAndBlur = () => blurActiveElementThenRun(onClose);

  const switchTo = async (id: string) => {
    setBusy(true);
    setError(null);
    try {
      const profile = await activateProfileByCode(id);
      if (!profile) {
        setError("That profile could not be loaded.");
        return;
      }
      closeAndBlur();
    } finally {
      setBusy(false);
    }
  };

  const playAsGuest = () => {
    setActiveProfile(null);
    closeAndBlur();
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
      closeAndBlur();
    } catch {
      setError("Couldn't create the profile. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    deleteProfile(pendingDelete.id);
    setPendingDelete(null);
    setView("list");
  };

  const openEdit = (p: DeviceProfileRef) => {
    setEditingId(p.id);
    setName(p.displayName);
    setAvatarId(p.avatarId || DEFAULT_AVATAR_ID);
    setError(null);
    setView("edit");
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    const displayName = name.trim();
    if (!displayName) {
      setError("Please enter a name.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const updated = await editProfile(editingId, { displayName, avatarId });
      if (!updated) {
        setError("Couldn't save changes. Please try again.");
        return;
      }
      blurActiveElementThenRun(() => {
        setEditingId(null);
        setView("list");
      });
    } catch {
      setError("Couldn't save changes. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  // Shared by the "add" and "edit" forms — name field, mascot picker, and
  // photo upload are identical in both; only the surrounding title/submit
  // button differ.
  const avatarFormFields = (
    <>
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
    </>
  );

  return (
    <div
      className="profile-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAndBlur();
      }}
    >
      <div className="profile-modal">
        <header className="profile-modal__header">
          <h2 id="profile-modal-title" className="profile-modal__title">
            {view === "add"
              ? "New profile"
              : view === "edit"
                ? "Edit profile"
                : view === "confirmDelete"
                  ? "Delete profile?"
                  : "Who's playing?"}
          </h2>
          <button
            type="button"
            className="profile-modal__close"
            onClick={closeAndBlur}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        <div className="profile-modal__body">
          {error && <p className="profile-modal__error">{error}</p>}

          {view === "list" && (
            <>
              <p className={"profile-sync profile-sync--" + syncState}>
                {syncState === "loading" && "Connecting…"}
                {syncState === "synced" && "☁️ Synced across devices"}
                {syncState === "offline" &&
                  "⚠️ Not connected — sign-in unavailable, so profiles stay on this device only."}
                {syncState === "error" &&
                  `⚠️ Sync error — profiles won't cross devices. (${syncError})`}
              </p>
              <ul className="profile-grid">
                {profiles.map((p) => (
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
                      className="profile-card__edit"
                      onClick={() => openEdit(p)}
                      aria-label={`Edit ${p.displayName}`}
                      title="Edit profile"
                    >
                      ✏️
                    </button>
                    <button
                      type="button"
                      className="profile-card__delete"
                      onClick={() => {
                        setPendingDelete(p);
                        setError(null);
                        setView("confirmDelete");
                      }}
                      aria-label={`Delete ${p.displayName}`}
                      title="Delete profile"
                    >
                      🗑
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
                  onClick={playAsGuest}
                >
                  Play as guest
                </button>
              </div>
            </>
          )}

          {view === "add" && (
            <div className="profile-form">
              {avatarFormFields}

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
                  onClick={() =>
                    blurActiveElementThenRun(() => {
                      setError(null);
                      setView("list");
                    })
                  }
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {view === "edit" && (
            <div className="profile-form">
              {avatarFormFields}

              <div className="profile-modal__actions">
                <button
                  type="button"
                  className="profile-btn"
                  onClick={handleSaveEdit}
                  disabled={busy}
                >
                  {busy ? "Saving…" : "Save changes"}
                </button>
                <button
                  type="button"
                  className="profile-btn profile-btn--ghost"
                  onClick={() =>
                    blurActiveElementThenRun(() => {
                      setEditingId(null);
                      setError(null);
                      setView("list");
                    })
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {view === "confirmDelete" && pendingDelete && (
            <div className="profile-form">
              <div className="profile-form__preview">
                <MascotAvatar avatarId={pendingDelete.avatarId} size={88} alt="" />
                <span className="profile-card__name">{pendingDelete.displayName}</span>
              </div>
              <p className="profile-form__hint">
                Delete <strong>{pendingDelete.displayName}</strong>? This removes
                the profile for everyone, on every device, along with its saved
                and learned flags. This can't be undone.
              </p>
              <div className="profile-modal__actions">
                <button
                  type="button"
                  className="profile-btn profile-btn--danger"
                  onClick={confirmDelete}
                >
                  Delete profile
                </button>
                <button
                  type="button"
                  className="profile-btn profile-btn--ghost"
                  onClick={() => {
                    setPendingDelete(null);
                    setView("list");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
