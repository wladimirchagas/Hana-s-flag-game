/**
 * ProfileContext — the active persona ("who's playing?") and the device's
 * list of known profiles.
 *
 * Phase 1 (this file) is deliberately INERT: it bootstraps anonymous Firebase
 * auth, exposes the active profile (defaulting to Guest), and manages the
 * device-local profile list — but it does NOT yet hydrate or write the saved /
 * learned flag lists from the cloud. Those still flow through localStorage
 * exactly as before, so behaviour is unchanged. Later phases will:
 *   - add the picker UI (create / switch / retrieve-by-code),
 *   - cloud-back `selectedCodes` / `learnedCodes` via `subscribeProfile`, and
 *   - attach the active `profileId` to leaderboard entries.
 *
 * Keeping the provider in place now means those phases plug in without
 * re-wiring `main.tsx` or the consuming components.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ensureAnonymousAuth } from "../lib/firebase";
import {
  deleteProfile as deleteProfileRemote,
  editProfile as editProfileRemote,
  fetchProfile,
  forgetDeviceProfile,
  loadActiveProfileId,
  loadDeviceProfiles,
  rememberDeviceProfile,
  saveActiveProfileId,
  subscribeProfile,
  subscribeToAllProfiles,
  type AvatarId,
  type DeviceProfileRef,
  type Profile,
} from "../lib/profileStore";
import { setActiveSyncProfile } from "../lib/profileSync";
import { hydrateSelectedCodes } from "../lib/countrySelection";
import { hydrateLearnedCodes } from "../lib/learnedFlags";

/** Auth/sync status for the device's anonymous identity. */
export type ProfileAuthStatus = "loading" | "ready" | "offline";

type ProfileContextValue = {
  /** State of the device's anonymous Firebase identity. */
  authStatus: ProfileAuthStatus;
  /** Anonymous uid proving "some client" to Firestore rules, or null offline. */
  uid: string | null;
  /** The currently-selected persona, or null when playing as Guest. */
  activeProfile: Profile | null;
  /** True when no persona is selected (today's default, unchanged behaviour). */
  isGuest: boolean;
  /** Profiles this browser has used (offline fallback for the picker). */
  deviceProfiles: DeviceProfileRef[];
  /** EVERY profile, live from Firestore — profiles are public/shared. */
  allProfiles: DeviceProfileRef[];
  /**
   * Cross-device sync health, for a user-visible indicator:
   *   - "loading"  — still establishing the device identity
   *   - "synced"   — anonymous auth is up and the shared list is streaming
   *   - "offline"  — no Firebase identity (sign-in unavailable); local-only
   *   - "error"    — authed, but Firestore rejected the read (see syncError)
   */
  syncState: "loading" | "synced" | "offline" | "error";
  /** Firestore error message when syncState === "error" (else null). */
  syncError: string | null;
  /** Switch to a known/loaded profile (null → play as Guest). */
  setActiveProfile: (profile: Profile | null) => void;
  /** Load a profile by its id and make it active. */
  activateProfileByCode: (id: string) => Promise<Profile | null>;
  /** Remember a freshly-created/loaded profile on this device. */
  rememberProfile: (profile: Profile) => void;
  /** Delete a profile for everyone (shared document + local cache). */
  deleteProfile: (id: string) => void;
  /**
   * Edit a profile's display name and/or avatar (works on any known
   * profile, not just the active one — mirrors `deleteProfile`). Resolves
   * to `null` if the profile couldn't be found locally or remotely.
   */
  editProfile: (
    id: string,
    patch: { displayName?: string; avatarId?: AvatarId },
  ) => Promise<Profile | null>;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

function toRef(profile: Profile): DeviceProfileRef {
  return { id: profile.id, displayName: profile.displayName, avatarId: profile.avatarId };
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [authStatus, setAuthStatus] = useState<ProfileAuthStatus>("loading");
  const [uid, setUid] = useState<string | null>(null);
  const [activeProfile, setActiveProfileState] = useState<Profile | null>(null);
  const [deviceProfiles, setDeviceProfiles] = useState<DeviceProfileRef[]>(() =>
    loadDeviceProfiles(),
  );
  const [allProfiles, setAllProfiles] = useState<DeviceProfileRef[]>([]);
  const [syncError, setSyncError] = useState<string | null>(null);

  // Bootstrap the device's anonymous identity. Best-effort: if Firebase is
  // unconfigured or unreachable we fall back to "offline" and the app keeps
  // working from localStorage, never blocking play.
  useEffect(() => {
    let cancelled = false;
    ensureAnonymousAuth().then((resolvedUid) => {
      if (cancelled) return;
      setUid(resolvedUid);
      setAuthStatus(resolvedUid ? "ready" : "offline");
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Re-activate the last-used profile once we have an identity. Failure to
  // load (deleted profile, offline) silently falls back to Guest.
  useEffect(() => {
    if (authStatus !== "ready") return;
    const lastId = loadActiveProfileId();
    if (!lastId) return;
    let cancelled = false;
    fetchProfile(lastId)
      .then((profile) => {
        if (cancelled || !profile) return;
        setActiveProfileState(profile);
        setDeviceProfiles(rememberDeviceProfile(toRef(profile)));
      })
      .catch(() => {
        /* stay Guest */
      });
    return () => {
      cancelled = true;
    };
  }, [authStatus]);

  const setActiveProfile = useCallback((profile: Profile | null) => {
    setActiveProfileState(profile);
    saveActiveProfileId(profile?.id ?? null);
    if (profile) setDeviceProfiles(rememberDeviceProfile(toRef(profile)));
  }, []);

  const activateProfileByCode = useCallback(
    async (id: string): Promise<Profile | null> => {
      const profile = await fetchProfile(id);
      if (profile) {
        setActiveProfileState(profile);
        saveActiveProfileId(profile.id);
        setDeviceProfiles(rememberDeviceProfile(toRef(profile)));
      }
      return profile;
    },
    [],
  );

  // Subscribe to the full, shared profile list once we have an identity.
  useEffect(() => {
    if (authStatus !== "ready") return;
    return subscribeToAllProfiles(
      (profiles) => {
        setAllProfiles(profiles);
        setSyncError(null);
      },
      (err) => {
        // Authed but Firestore rejected the read (e.g. rules not deployed).
        // Surface it so the picker can show a real reason instead of an empty
        // list that looks like "nothing synced".
        setSyncError(err?.message ?? "Unknown sync error");
      },
    );
  }, [authStatus]);

  // Cross-device flag sync for the ACTIVE profile. When a profile is active we
  //   1. hydrate localStorage from its saved & learned flags (synchronously,
  //      from the data we already hold, so the device reflects the profile),
  //   2. mark it as the push target so local edits flow up to Firestore, and
  //   3. subscribe to its document so a change on another device flows down.
  // Guest (no active profile) clears the push target and leaves local data be.
  const activeProfileId = activeProfile?.id ?? null;
  useEffect(() => {
    if (!activeProfile) {
      setActiveSyncProfile(null);
      return;
    }
    hydrateSelectedCodes(activeProfile.selectedCodes);
    hydrateLearnedCodes(activeProfile.learnedCodes);
    setActiveSyncProfile(activeProfile.id);

    if (authStatus !== "ready") return;
    const id = activeProfile.id;
    return subscribeProfile(
      id,
      (remote) => {
        if (!remote) return;
        hydrateSelectedCodes(remote.selectedCodes);
        hydrateLearnedCodes(remote.learnedCodes);
        // Keep name/avatar fresh too, but only if this is still the active one.
        setActiveProfileState((cur) => (cur?.id === id ? remote : cur));
      },
      () => {
        /* offline / transient — local data stays usable */
      },
    );
    // Keyed on the id + auth so we don't resubscribe when only name/avatar change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProfileId, authStatus]);

  const rememberProfile = useCallback((profile: Profile) => {
    setDeviceProfiles(rememberDeviceProfile(toRef(profile)));
  }, []);

  const deleteProfile = useCallback((id: string) => {
    void deleteProfileRemote(id);
    setDeviceProfiles(forgetDeviceProfile(id));
    setAllProfiles((current) => current.filter((p) => p.id !== id));
    setActiveProfileState((current) => (current?.id === id ? null : current));
  }, []);

  const editProfile = useCallback(
    async (
      id: string,
      patch: { displayName?: string; avatarId?: AvatarId },
    ): Promise<Profile | null> => {
      const current = activeProfile?.id === id ? activeProfile : await fetchProfile(id);
      if (!current) return null;
      const updated = await editProfileRemote(current, patch);
      setDeviceProfiles(rememberDeviceProfile(toRef(updated)));
      setAllProfiles((list) => list.map((p) => (p.id === id ? toRef(updated) : p)));
      setActiveProfileState((curActive) => (curActive?.id === id ? updated : curActive));
      return updated;
    },
    [activeProfile],
  );

  const value = useMemo(
    () => ({
      authStatus,
      uid,
      activeProfile,
      isGuest: activeProfile === null,
      deviceProfiles,
      allProfiles,
      syncState:
        authStatus === "loading"
          ? ("loading" as const)
          : authStatus === "offline"
            ? ("offline" as const)
            : syncError
              ? ("error" as const)
              : ("synced" as const),
      syncError,
      setActiveProfile,
      activateProfileByCode,
      rememberProfile,
      deleteProfile,
      editProfile,
    }),
    [
      authStatus,
      uid,
      activeProfile,
      deviceProfiles,
      allProfiles,
      syncError,
      setActiveProfile,
      activateProfileByCode,
      rememberProfile,
      deleteProfile,
      editProfile,
    ],
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error("useProfile must be used inside <ProfileProvider>");
  }
  return ctx;
}
