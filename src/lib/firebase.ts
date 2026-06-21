import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signInAnonymously, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// `getAuth` throws synchronously (e.g. auth/invalid-api-key) when Firebase
// isn't configured — which is the case in local dev and any environment
// without the VITE_FIREBASE_* vars. That must never blank-screen the app, so
// we contain it here and treat a missing `auth` as "offline / local-only".
let auth: Auth | null = null;
try {
  auth = getAuth(app);
} catch (err) {
  console.warn("Firebase Auth unavailable; profiles run local-only.", err);
}
export { auth };

/**
 * Ensure the device has a Firebase identity. Profiles (personas) are
 * passwordless and live in `profiles/{id}`, but Firestore security rules
 * still require an authenticated principal, so every device signs in
 * anonymously on first load. The anonymous `uid` is *not* the profile — it
 * only proves "some client" to the rules; the persona is selected/created
 * separately and addressed by its share code (see `profileStore`).
 *
 * Resolves with the current `uid` once auth settles, or `null` if anonymous
 * auth is unavailable (e.g. the Firebase project isn't configured in this
 * environment, or the network blocks it). Callers must treat a `null` uid as
 * "offline / local-only" and fall back to localStorage — never block play.
 */
export function ensureAnonymousAuth(): Promise<string | null> {
  if (!auth) return Promise.resolve(null);
  const authInstance = auth;
  return new Promise((resolve) => {
    let settled = false;
    const finish = (uid: string | null) => {
      if (settled) return;
      settled = true;
      resolve(uid);
    };
    const unsub = onAuthStateChanged(
      authInstance,
      (user) => {
        if (user) {
          unsub();
          finish(user.uid);
        }
      },
      () => finish(null),
    );
    if (authInstance.currentUser) {
      unsub();
      finish(authInstance.currentUser.uid);
      return;
    }
    signInAnonymously(authInstance).catch(() => {
      unsub();
      finish(null);
    });
  });
}
