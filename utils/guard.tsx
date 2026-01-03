import { useAuth } from "@/context/AuthContext";
import { Redirect, Slot, usePathname } from "expo-router";
import React from "react";
export function Guard() {
  const { token, loading } = useAuth();
  const pathname = usePathname();

  if (loading) return null;

  const isAuthRoute = pathname.startsWith("/broker");
  const isProtectedRoute = pathname.startsWith("/(drawer)");

  if (!token && isProtectedRoute) {
    return <Redirect href="/broker" />;
  }

  if (token && isAuthRoute) {
    return <Redirect href="/(drawer)/(tabs)/quotes" />;
  }

  return <Slot />;
}
