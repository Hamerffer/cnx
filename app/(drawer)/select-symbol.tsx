import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import ScreenWrapper from "@/components/screen-Wrapper";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { scale } from "@/utils/styling";
import { router } from "expo-router";

type SymbolItem = {
  id: string;
  name: string;
  lot: string;
};

const DATA: SymbolItem[] = [
  {
    id: "1",
    name: "SILVER",
    lot: "1 Lot = 5000 Troy Oz",
  },
  {
    id: "2",
    name: "GOLD",
    lot: "1 Lot = 100 Troy Oz",
  },
];

export default function SelectedSymbolsScreen() {
  const renderItem = ({ item }: { item: SymbolItem }) => (
    <View style={styles.row}>
      <View>
        <Text style={styles.symbol}>{item.name}</Text>
        <Text style={styles.lot}>{item.lot}</Text>
      </View>

      <MaterialIcons
        name="drag-handle"
        size={scale(22)}
        color={colors.textMuted}
      />
    </View>
  );

  return (
    <ScreenWrapper style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={scale(22)}
            color={colors.textPrimary}
          />
        </Pressable>

        <Text style={styles.headerTitle}>Selected symbols</Text>

        <View style={styles.headerActions}>
          <Pressable style={styles.iconBtn}>
            <Ionicons name="add" size={scale(20)} color={colors.textPrimary} />
          </Pressable>

          <Pressable style={styles.iconBtn}>
            <Ionicons
              name="trash-outline"
              size={scale(20)}
              color={colors.textPrimary}
            />
          </Pressable>
        </View>
      </View>

      {/* LIST */}
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />
    </ScreenWrapper>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacingX._15,
    paddingVertical: spacingY._12,
  },
  headerTitle: {
    flex: 1,
    marginLeft: spacingX._15,
    fontSize: scale(16),
    fontWeight: "600",
    color: colors.textPrimary,
  },
  headerActions: {
    flexDirection: "row",
  },
  iconBtn: {
    marginLeft: spacingX._15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacingX._15,
    paddingVertical: spacingY._15,
  },
  symbol: {
    fontSize: scale(14),
    fontWeight: "600",
    color: colors.textPrimary,
  },
  lot: {
    marginTop: spacingY._5,
    fontSize: scale(11),
    color: colors.textSecondary,
  },

  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginHorizontal: spacingX._15,
  },
});
