import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type GuardFn = (proceed: () => void) => void;

type NavigationGuardContextValue = {
  setGuard: (fn: GuardFn | null) => void;
  /** Call before any in-app navigation. Returns true if navigation was intercepted. */
  triggerGuard: (proceed: () => void) => boolean;
};

const NavigationGuardContext = createContext<NavigationGuardContextValue | null>(null);

export function NavigationGuardProvider({ children }: { children: ReactNode }) {
  const [, setVersion] = useState(0);
  const guardRef = useRef<GuardFn | null>(null);

  const setGuard = useCallback((fn: GuardFn | null) => {
    guardRef.current = fn;
    setVersion((v) => v + 1);
  }, []);

  const triggerGuard = useCallback((proceed: () => void): boolean => {
    if (guardRef.current) {
      guardRef.current(proceed);
      return true;
    }
    return false;
  }, []);

  const value = useMemo(() => ({ setGuard, triggerGuard }), [setGuard, triggerGuard]);

  return (
    <NavigationGuardContext.Provider value={value}>
      {children}
    </NavigationGuardContext.Provider>
  );
}

export function useNavigationGuard(): NavigationGuardContextValue {
  const ctx = useContext(NavigationGuardContext);
  if (!ctx) throw new Error("useNavigationGuard must be used inside NavigationGuardProvider");
  return ctx;
}
