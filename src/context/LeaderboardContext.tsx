import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  addLeaderboardEntry,
  loadLeaderboard,
  type LeaderboardEntry,
  type NewLeaderboardEntry,
} from "../lib/leaderboardStorage";

type LeaderboardContextValue = {
  isOpen: boolean;
  selectedEntryId: string | null;
  entries: LeaderboardEntry[];
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
  const [entries, setEntries] = useState<LeaderboardEntry[]>(() =>
    loadLeaderboard()
  );

  const refreshEntries = useCallback(() => {
    setEntries(loadLeaderboard());
  }, []);

  const openLeaderboard = useCallback(() => {
    setIsOpen(true);
    setSelectedEntryId(null);
    setEntries(loadLeaderboard());
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

  const saveGameToLeaderboard = useCallback(
    (entry: NewLeaderboardEntry) => {
      const created = addLeaderboardEntry(entry);
      refreshEntries();
      return created;
    },
    [refreshEntries]
  );

  const value = useMemo(
    () => ({
      isOpen,
      selectedEntryId,
      entries,
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
