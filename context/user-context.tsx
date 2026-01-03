import React, { createContext, useContext, useEffect, useState } from "react";

import { clearUser, getUser } from "@/db/queries/user";
import { userTable } from "@/db/schema";

/* ================= TYPES ================= */
/**
 * Infer user type directly from Drizzle schema
 * This ALWAYS stays in sync with DB
 */
export type LocalUser = typeof userTable.$inferSelect;

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

  /* 🔄 LOAD USER FROM DB */
  const loadUser = async () => {
    const storedUser = await getUser(); // LocalUser | null
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
