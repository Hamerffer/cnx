import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  token: string | null;
  loading: boolean;
  setAuthToken: (token: string | null) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const TOKEN_KEY = "auth_token";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SecureStore.getItemAsync(TOKEN_KEY).then((stored) => {
      setToken(stored);
      setLoading(false);
    });
  }, []);

  // 🔹 Single source of truth for token
  const setAuthToken = async (newToken: string | null) => {
    if (newToken) {
      await SecureStore.setItemAsync(TOKEN_KEY, newToken);
    } else {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    }
    setToken(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, loading, setAuthToken }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
