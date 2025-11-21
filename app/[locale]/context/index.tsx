"use client";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ContextValue {
  activeModalId: string | null;
  setActiveModalId: (id: string | null) => void;
  profile: {} | null;
  setProfile: (user: {}) => void;
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
}

const AppContext = createContext<ContextValue>({} as ContextValue);

function ContextProvider({ children }: PropsWithChildren) {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [profile, setProfile] = useState<{} | null>(null);

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeModalId,
        setActiveModalId,
        profile,
        setProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
export default ContextProvider;
