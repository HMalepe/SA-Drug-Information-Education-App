"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type WebUserMode = "patient" | "student" | "pharmacist" | "doctor";

const STORAGE_KEY = "materia.userMode";
const MODES: WebUserMode[] = ["patient", "student", "pharmacist", "doctor"];

function parseMode(raw: string | null | undefined): WebUserMode {
  if (!raw) return "pharmacist";
  const v = raw.trim().toLowerCase();
  return (MODES as string[]).includes(v) ? (v as WebUserMode) : "pharmacist";
}

interface ModeContextValue {
  mode: WebUserMode;
  setMode: (mode: WebUserMode) => void;
  ready: boolean;
}

const ModeContext = createContext<ModeContextValue>({
  mode: "pharmacist",
  setMode: () => undefined,
  ready: false,
});

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<WebUserMode>("pharmacist");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setModeState(parseMode(window.localStorage.getItem(STORAGE_KEY)));
    setReady(true);
  }, []);

  const setMode = useCallback((next: WebUserMode) => {
    setModeState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return <ModeContext.Provider value={{ mode, setMode, ready }}>{children}</ModeContext.Provider>;
}

export function useUserMode() {
  return useContext(ModeContext);
}

export function ModeToggle() {
  const { mode, setMode } = useUserMode();

  return (
    <div
      className="mode-toggle"
      role="group"
      aria-label="Audience mode"
      title="Build Spec §5.7 — same molecule, different depth"
    >
      {MODES.map((m) => (
        <button
          key={m}
          type="button"
          className={`mode-chip${mode === m ? " active" : ""}`}
          aria-pressed={mode === m}
          onClick={() => setMode(m)}
        >
          {m}
        </button>
      ))}
    </div>
  );
}

export { STORAGE_KEY as MODE_STORAGE_KEY, MODES as WEB_USER_MODES };
