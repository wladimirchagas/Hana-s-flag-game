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
  fetchProfile,
  forgetDeviceProfile,
  loadActiveProfileId,
  loadDeviceProfiles,
  rememberDeviceProfile,
  saveActiveProfileId,
  type DeviceProfileRef,
  type Profile,
} from "../lib/profileStore";

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
  /** Profiles this browser has used, for the "who's playing?" picker. */
  deviceProfiles: DeviceProfileRef[];
  /** Switch to a known/loaded profile (null → play as Guest). */
  setActiveProfile: (profile: Profile | null) => void;
  /** Load a profile by its share code (cross-device retrieval). */
  activateProfileByCode: (id: string) => Promise<Profile | null>;
  /** Remember a freshly-created/loaded profile on this device. */
  rememberProfile: (profile: Profile) => void;
  /** Forget a profile on this device (does not delete the shared document). */
  forgetProfile: (id: string) => void;
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

  const rememberProfile = useCallback((profile: Profile) => {
    setDeviceProfiles(rememberDeviceProfile(toRef(profile)));
  }, []);

  const forgetProfile = useCallback((id: string) => {
    setDeviceProfiles(forgetDeviceProfile(id));
    setActiveProfileState((current) => (current?.id === id ? null : current));
  }, []);

  const value = useMemo(
    () => ({
      authStatus,
      uid,
      activeProfile,
      isGuest: activeProfile === null,
      deviceProfiles,
      setActiveProfile,
      activateProfileByCode,
      rememberProfile,
      forgetProfile,
    }),
    [
      authStatus,
      uid,
      activeProfile,
      deviceProfiles,
      setActiveProfile,
      activateProfileByCode,
      rememberProfile,
      forgetProfile,
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
