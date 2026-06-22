import { isPhotoAvatar } from "./avatars";

/**
 * The leaderboard fields contributed by the active profile, shared by every
 * game page so a run is attributed consistently. Only a mascot token is
 * denormalised onto the (public) leaderboard — uploaded photos are never
 * published there. Returns an empty object for Guests so nothing extra is
 * written (and no `undefined` reaches Firestore).
 */
export function profileEntryFields(
  profile?: { id?: string; avatarId?: string } | null,
): { profileId?: string; profileAvatarId?: string } {
  if (!profile?.id) return {};
  const avatar =
    profile.avatarId && !isPhotoAvatar(profile.avatarId) ? profile.avatarId : undefined;
  return { profileId: profile.id, ...(avatar ? { profileAvatarId: avatar } : {}) };
}
