import ScreenWrapper from "@/components/screen-Wrapper";

import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const trade = () => {
  return (
    <>
      <ScreenWrapper>
        <View style={styles.container}>
          <View style={styles.table}>
            {/* Balance */}
            <View style={styles.row}>
              <Text style={styles.label}>Balance</Text>
              <Text style={styles.value}>10,250.00 USD</Text>
            </View>

            {/* Equity */}
            <View style={styles.row}>
              <Text style={styles.label}>Equity</Text>
              <Text style={styles.value}>10,480.35 USD</Text>
            </View>

            {/* Margin */}
            <View style={styles.row}>
              <Text style={styles.label}>Margin</Text>
              <Text style={styles.value}>1,200.00 USD</Text>
            </View>
          </View>
        </View>
      </ScreenWrapper>
    </>
  );
};

export default trade;

const styles = StyleSheet.create({
  container: {
    padding: spacingX._5,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
    marginBottom: spacingY._12,
  },

  table: {
    backgroundColor: colors.surface,
    borderRadius: radius._10,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacingY._12,
    paddingHorizontal: spacingX._15,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },

  label: {
    fontSize: 13,
    color: colors.textSecondary,
  },

  value: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
  },
});
