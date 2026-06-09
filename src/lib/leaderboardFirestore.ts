import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "./firebase";
import type { LeaderboardEntry } from "./leaderboardStorage";
import type { Continent } from "../api/countries";

type SlimCountrySnapshot = {
  name: string;
  code: string;
  continent: Continent;
};

type RemoteLeaderboardEntry = Omit<LeaderboardEntry, "countriesPlayed"> & {
  countriesPlayed: SlimCountrySnapshot[];
};

function toRemote(entry: LeaderboardEntry): RemoteLeaderboardEntry {
  return {
    ...entry,
    countriesPlayed: entry.countriesPlayed.map(({ name, code, continent }) => ({
      name,
      code,
      continent,
    })),
  };
}

function fromRemote(remote: RemoteLeaderboardEntry): LeaderboardEntry {
  return {
    ...remote,
    gameMode: remote.gameMode === "custom" ? "hana" : remote.gameMode,
    countryResults: remote.countryResults ?? {},
    continentBreakdown: remote.continentBreakdown ?? [],
    countriesPlayed: (remote.countriesPlayed ?? []).map((c) => ({
      ...c,
      flagSvg: `https://flagcdn.com/${c.code.toLowerCase()}.svg`,
    })),
  };
}

const COLLECTION = "leaderboard";
const MAX_ENTRIES = 100;

export async function pushEntryToFirestore(entry: LeaderboardEntry): Promise<void> {
  await setDoc(doc(db, COLLECTION, entry.id), toRemote(entry));
}

export function subscribeToLeaderboard(
  onUpdate: (entries: LeaderboardEntry[]) => void,
  onError: (error: Error) => void
): Unsubscribe {
  const q = query(
    collection(db, COLLECTION),
    orderBy("score", "desc"),
    limit(MAX_ENTRIES)
  );
  return onSnapshot(
    q,
    (snapshot) => {
      onUpdate(snapshot.docs.map((d) => fromRemote(d.data() as RemoteLeaderboardEntry)));
    },
    onError
  );
}
