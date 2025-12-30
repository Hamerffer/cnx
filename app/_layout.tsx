import { colors } from "@/constants/theme";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { TradeProvider } from "@/context/trade-context";
import { UserProvider } from "@/context/user-context";
import "@/global.css";
import { queryClient } from "@/services/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Redirect, Slot, usePathname } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";

function Guard() {
  const { token, loading } = useAuth();
  const pathname = usePathname();

  if (loading) return null;

  const isAuthRoute = pathname.startsWith("/broker"); // login/register
  const isProtectedRoute = pathname.startsWith("/(drawer)");

  if (!token && isProtectedRoute) {
    return <Redirect href="/broker" />;
  }

  if (token && isAuthRoute) {
    return <Redirect href="/(drawer)/(tabs)/quotes" />;
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      {" "}
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <AuthProvider>
            <UserProvider>
              <TradeProvider>
                <Guard />
              </TradeProvider>
            </UserProvider>
          </AuthProvider>
        </PaperProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
