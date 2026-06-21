/**
 * Profile (persona) store — Netflix-style passwordless profiles.
 *
 * A *profile* is a lightweight persona, NOT an authenticated account. It
 * carries a display name, an avatar, and the user's cross-device data (saved
 * flags + learned flags). A profile is brought onto a new device by entering
 * its **share code** — there is no password and no email.
 *
 * Security model (capability / bearer): the share code IS the Firestore
 * document id, and it is generated from `crypto.getRandomValues` with enough
 * entropy that it cannot be guessed or enumerated. Whoever holds the code can
 * load the profile — that is the inherent, accepted trade-off of "no password"
 * (an optional PIN may be layered on later). Because of this, the code must
 * never be logged, embedded in analytics, or shown anywhere except to the
 * profile's owner.
 *
 * This module owns:
 *   - the **device-local** list of profiles this browser has used (so the
 *     picker can show "who's playing" without a network round-trip), and
 *   - the **Firestore** CRUD for the shared `profiles/{id}` documents.
 *
 * It does NOT decide *when* to sync the active profile's flag lists — that is
 * `ProfileContext`'s job (later phases). Keeping the storage primitives here
 * mirrors how `countrySelection.ts` / `learnedFlags.ts` already work.
 */

import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "./firebase";

/** Preset avatar identifier. The UI (later phase) maps this to artwork. */
export type AvatarId = string;

/** The portable, cross-device payload a profile carries. */
export type ProfileData = {
  /** Saved-flag selection — mirrors localStorage `flagGame.selectedCountryOrder`. */
  selectedCodes: string[];
  /** Unlocked/learned flags — mirrors localStorage `flagGame.learnedCountryCodes`. */
  learnedCodes: string[];
};

/** A full profile document as stored in Firestore (`profiles/{id}`). */
export type Profile = ProfileData & {
  /** Share code = Firestore document id (unguessable; treat as a secret). */
  id: string;
  displayName: string;
  avatarId: AvatarId;
  createdAt: number;
  updatedAt: number;
};

/**
 * The slim reference this device remembers for the profile picker. Avatar +
 * name are cached locally so the picker renders instantly and offline; the
 * authoritative data still lives in Firestore.
 */
export type DeviceProfileRef = {
  id: string;
  displayName: string;
  avatarId: AvatarId;
};

const DEVICE_PROFILES_KEY = "flagGame.profiles";
const ACTIVE_PROFILE_KEY = "flagGame.activeProfileId";
const COLLECTION = "profiles";

/**
 * Share-code alphabet — Crockford-style, no ambiguous glyphs (no I/L/O/0/1/U)
 * so a code can be read aloud or typed without confusion.
 */
const CODE_ALPHABET = "23456789ABCDEFGHJKMNPQRSTVWXYZ";

/**
 * Generate an unguessable share code, e.g. `HANA-7K2P-9QXR-4M8T`. Three
 * 4-char groups from a 30-symbol alphabet ≈ 59 bits of entropy — far beyond
 * brute-force/enumeration over a network. The `HANA-` prefix is branding only
 * and is part of the document id.
 */
export function generateShareCode(): string {
  const groups: string[] = [];
  for (let g = 0; g < 3; g += 1) {
    const bytes = new Uint8Array(4);
    crypto.getRandomValues(bytes);
    let group = "";
    for (const b of bytes) group += CODE_ALPHABET[b % CODE_ALPHABET.length];
    groups.push(group);
  }
  return `HANA-${groups.join("-")}`;
}

/** Normalise a user-typed code for lookup (uppercase, ensure HANA- prefix). */
export function normaliseShareCode(input: string): string {
  const trimmed = input.trim().toUpperCase().replace(/\s+/g, "");
  if (!trimmed) return "";
  return trimmed.startsWith("HANA-") ? trimmed : `HANA-${trimmed}`;
}

// ---------------------------------------------------------------------------
// Device-local profile list (the "who's playing?" picker source)
// ---------------------------------------------------------------------------

export function loadDeviceProfiles(): DeviceProfileRef[] {
  try {
    const raw = localStorage.getItem(DEVICE_PROFILES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (p): p is DeviceProfileRef =>
        !!p &&
        typeof p === "object" &&
        typeof (p as DeviceProfileRef).id === "string" &&
        typeof (p as DeviceProfileRef).displayName === "string",
    );
  } catch {
    return [];
  }
}

export function saveDeviceProfiles(refs: readonly DeviceProfileRef[]): void {
  try {
    localStorage.setItem(DEVICE_PROFILES_KEY, JSON.stringify([...refs]));
  } catch {
    // ignore quota / privacy-mode errors
  }
}

/** Add or update a profile reference on this device (newest first, de-duped). */
export function rememberDeviceProfile(ref: DeviceProfileRef): DeviceProfileRef[] {
  const rest = loadDeviceProfiles().filter((p) => p.id !== ref.id);
  const next = [ref, ...rest];
  saveDeviceProfiles(next);
  return next;
}

/** Forget a profile on this device (does NOT delete the shared document). */
export function forgetDeviceProfile(id: string): DeviceProfileRef[] {
  const next = loadDeviceProfiles().filter((p) => p.id !== id);
  saveDeviceProfiles(next);
  if (loadActiveProfileId() === id) saveActiveProfileId(null);
  return next;
}

export function loadActiveProfileId(): string | null {
  try {
    return localStorage.getItem(ACTIVE_PROFILE_KEY);
  } catch {
    return null;
  }
}

export function saveActiveProfileId(id: string | null): void {
  try {
    if (id) localStorage.setItem(ACTIVE_PROFILE_KEY, id);
    else localStorage.removeItem(ACTIVE_PROFILE_KEY);
  } catch {
    // ignore
  }
}

// ---------------------------------------------------------------------------
// Firestore CRUD for the shared `profiles/{id}` documents
// ---------------------------------------------------------------------------

type RemoteProfile = Omit<Profile, "id">;

function fromRemote(id: string, data: RemoteProfile): Profile {
  return {
    id,
    displayName: data.displayName ?? "",
    avatarId: data.avatarId ?? "",
    selectedCodes: Array.isArray(data.selectedCodes) ? data.selectedCodes : [],
    learnedCodes: Array.isArray(data.learnedCodes) ? data.learnedCodes : [],
    createdAt: typeof data.createdAt === "number" ? data.createdAt : 0,
    updatedAt: typeof data.updatedAt === "number" ? data.updatedAt : 0,
  };
}

/**
 * Create a brand-new profile document. The caller supplies the chosen name,
 * avatar, and the initial flag data to seed it with (used to migrate this
 * device's existing localStorage selection into the new profile so nothing is
 * lost). Returns the full profile including its freshly-minted share code.
 */
export async function createProfile(input: {
  displayName: string;
  avatarId: AvatarId;
  seed?: Partial<ProfileData>;
}): Promise<Profile> {
  const id = generateShareCode();
  const now = Date.now();
  const profile: Profile = {
    id,
    displayName: input.displayName.trim().slice(0, 48),
    avatarId: input.avatarId,
    selectedCodes: input.seed?.selectedCodes ?? [],
    learnedCodes: input.seed?.learnedCodes ?? [],
    createdAt: now,
    updatedAt: now,
  };
  const { id: _omit, ...remote } = profile;
  void _omit;
  await setDoc(doc(db, COLLECTION, id), { ...remote, updatedAt: serverTimestamp() });
  return profile;
}

/** Fetch a profile by its share code. Returns `null` if no such profile. */
export async function fetchProfile(id: string): Promise<Profile | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return fromRemote(id, snap.data() as RemoteProfile);
}

/** Live-subscribe to a profile so edits on another device update this one. */
export function subscribeProfile(
  id: string,
  onUpdate: (profile: Profile | null) => void,
  onError: (error: Error) => void,
): Unsubscribe {
  return onSnapshot(
    doc(db, COLLECTION, id),
    (snap) =>
      onUpdate(snap.exists() ? fromRemote(id, snap.data() as RemoteProfile) : null),
    onError,
  );
}

/** Patch a profile's flag data and/or display fields. */
export async function updateProfile(
  id: string,
  patch: Partial<Omit<Profile, "id" | "createdAt">>,
): Promise<void> {
  await updateDoc(doc(db, COLLECTION, id), {
    ...patch,
    updatedAt: serverTimestamp(),
  });
}
