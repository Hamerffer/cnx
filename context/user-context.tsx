import React, { createContext, useContext, useEffect, useState } from "react";

import { clearUser, getUser, LocalUser } from "@/services/db";

/* ================= TYPES ================= */
type UserContextType = {
  user: LocalUser | null;
  refreshUser: () => Promise<void>;
  clearUserContext: () => Promise<void>;
};

/* ================= CONTEXT ================= */
const UserContext = createContext<UserContextType | null>(null);

/* ================= PROVIDER ================= */
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LocalUser | null>(null);

  /* 🔄 LOAD USER FROM SQLITE ON APP START */
  const loadUser = async () => {
    const storedUser = await getUser();
    setUser(storedUser);
  };

  /* 🧹 CLEAR USER (LOGOUT) */
  const clearUserContext = async () => {
    await clearUser();
    setUser(null);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        refreshUser: loadUser,
        clearUserContext,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

/* ================= HOOK ================= */
export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return ctx;
};
