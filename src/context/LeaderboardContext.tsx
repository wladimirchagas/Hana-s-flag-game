import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  pushEntryToFirestore,
  subscribeToLeaderboard,
} from "../lib/leaderboardFirestore";
import { sortEntries } from "../lib/leaderboardStorage";
import type { LeaderboardEntry, NewLeaderboardEntry } from "../lib/leaderboardStorage";

export type SyncStatus = "loading" | "ready" | "error";

type LeaderboardContextValue = {
  isOpen: boolean;
  selectedEntryId: string | null;
  entries: LeaderboardEntry[];
  syncStatus: SyncStatus;
  openLeaderboard: () => void;
  closeLeaderboard: () => void;
  selectEntry: (id: string | null) => void;
  goBackInLeaderboard: () => void;
  saveGameToLeaderboard: (entry: NewLeaderboardEntry) => LeaderboardEntry;
  refreshEntries: () => void;
};

const LeaderboardContext = createContext<LeaderboardContextValue | null>(null);

export function LeaderboardProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("loading");

  useEffect(() => {
    return subscribeToLeaderboard(
      (remote) => {
        setEntries(remote.slice().sort(sortEntries));
        setSyncStatus("ready");
      },
      () => setSyncStatus("error")
    );
  }, []);

  const openLeaderboard = useCallback(() => {
    setIsOpen(true);
    setSelectedEntryId(null);
  }, []);

  const closeLeaderboard = useCallback(() => {
    setIsOpen(false);
    setSelectedEntryId(null);
  }, []);

  const selectEntry = useCallback((id: string | null) => {
    setSelectedEntryId(id);
  }, []);

  const goBackInLeaderboard = useCallback(() => {
    setSelectedEntryId(null);
  }, []);

  const refreshEntries = useCallback(() => {
    // no-op: real-time subscription keeps entries current
  }, []);

  const saveGameToLeaderboard = useCallback(
    (entry: NewLeaderboardEntry): LeaderboardEntry => {
      const id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
      const full: LeaderboardEntry = { ...entry, id, createdAt: Date.now() };
      pushEntryToFirestore(full).catch(console.error);
      return full;
    },
    []
  );

  const value = useMemo(
    () => ({
      isOpen,
      selectedEntryId,
      entries,
      syncStatus,
      openLeaderboard,
      closeLeaderboard,
      selectEntry,
      goBackInLeaderboard,
      saveGameToLeaderboard,
      refreshEntries,
    }),
    [
      isOpen,
      selectedEntryId,
      entries,
      syncStatus,
      openLeaderboard,
      closeLeaderboard,
      selectEntry,
      goBackInLeaderboard,
      saveGameToLeaderboard,
      refreshEntries,
    ]
  );

  return (
    <LeaderboardContext.Provider value={value}>
      {children}
    </LeaderboardContext.Provider>
  );
}

export function useLeaderboard(): LeaderboardContextValue {
  const ctx = useContext(LeaderboardContext);
  if (!ctx) {
    throw new Error("useLeaderboard must be used within LeaderboardProvider");
  }
  return ctx;
}
