import React, { useMemo, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import AppHeader from "@/components/back-chevron";
import { colors } from "@/constants/theme";

/* -------------------- Dummy Broker Data -------------------- */
const BROKERS = [
  { id: "1", name: "FXRK Markets Ltd.", subtitle: "FXRKMarkets" },
  { id: "2", name: "Park Money Limited", subtitle: "ParkMoney" },
  { id: "3", name: "Alpha Trade Corp", subtitle: "AlphaTrade" },
];

export default function BrokerSearchScreen() {
  const [query, setQuery] = useState("");

  const filteredBrokers = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return BROKERS.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.subtitle.toLowerCase().includes(q)
    );
  }, [query]);

  const renderItem = ({ item }: { item: (typeof BROKERS)[0] }) => (
    <TouchableOpacity
      style={styles.row}
      activeOpacity={0.7}
      onPress={() => router.push("/broker/broker-login-screen")}
    >
      {/* Logo */}
      <View style={styles.logoBox}>
        <Text style={styles.logoText}>{item.name.charAt(0)}</Text>
      </View>

      {/* Info */}
      <View style={styles.brokerInfo}>
        <Text style={styles.brokerName}>{item.name}</Text>
        <Text style={styles.brokerSubtitle}>{item.subtitle}</Text>
      </View>

      <Text style={styles.infoIcon}>ℹ️</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Brokers" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
      >
        {/* ---------- Search ---------- */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Find broker"
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={setQuery}
          />

          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ---------- Content ---------- */}
        {query.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>
              Use search to find a company
            </Text>
            <Text style={styles.emptyDescription}>
              The application may feature brokerage companies which may not be
              regulated in your country. Exercise caution before opening an
              account.
            </Text>
          </View>
        ) : filteredBrokers.length === 0 ? (
          <Text style={styles.noResult}>No brokers found</Text>
        ) : (
          <FlatList
            data={filteredBrokers}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.divider} />}
            keyboardShouldPersistTaps="handled"
          />
        )}

        {/* ---------- Bottom CTA ---------- */}
        <TouchableOpacity style={styles.bottomButton} activeOpacity={0.8}>
          <Text style={styles.bottomButtonText}>
            CAN’T FIND YOUR BROKER?
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* -------------------- Styles -------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
  },

  /* Search */
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginVertical: 16,
  },

  searchInput: {
    flex: 1,
    height: 42,
    color: colors.textPrimary,
  },

  clearIcon: {
    color: colors.textMuted,
    fontSize: 16,
  },

  /* List Row */
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },

  logoBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: colors.surfaceLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  logoText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },

  brokerInfo: {
    flex: 1,
  },

  brokerName: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: "500",
  },

  brokerSubtitle: {
    fontSize: 13,
    color: colors.primary,
    marginTop: 2,
  },

  infoIcon: {
    fontSize: 18,
    color: colors.textMuted,
  },

  divider: {
    height: 1,
    backgroundColor: colors.divider,
  },

  /* Empty */
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  emptyTitle: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 8,
  },

  emptyDescription: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 18,
  },

  noResult: {
    textAlign: "center",
    color: colors.textMuted,
    marginTop: 20,
  },

  /* Bottom Button */
  bottomButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 16,
  },

  bottomButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
