import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AppHeader from "@/components/back-chevron";
import Button from "@/components/button";
import MoreMenu from "@/components/custom-menu";
import ScreenWrapper from "@/components/screen-Wrapper";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
/* ================= SCREEN ================= */
export default function TradeScreen() {
  const [volume, setVolume] = useState("0.01");
  const [sl, setSl] = useState("");
  const [tp, setTp] = useState("");

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 20}
      >
        <View style={styles.topRow}>
          <AppHeader title="Trade" backTo="/(drawer)/(tabs)/trade" />

          <MoreMenu
            icon={
              <MaterialIcons name="swap-vert-circle" size={24} color="white" />
            }
            items={[{ key: "Gold" }, { key: "Silvar" }]}
          />
        </View>

        <View style={styles.container}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 140 }}
          >
            {/* HEADER */}
            <View style={styles.header}>
              <Text style={styles.symbol}>XAUEUR</Text>
              <Text style={styles.subSymbol}>Gold vs Euro</Text>
            </View>

            {/* EXECUTION */}
            <View style={styles.execution}>
              <Text style={styles.executionText}>Market Execution</Text>
            </View>

            {/* VOLUME */}
            <View style={styles.volumeRow}>
              {[-0.5, -0.1, -0.01].map((v) => (
                <AdjustBtn
                  key={v}
                  label={v}
                  onPress={() =>
                    setVolume(Math.max(0.01, parseFloat(volume) + v).toFixed(2))
                  }
                />
              ))}

              <TextInput
                value={volume}
                onChangeText={setVolume}
                keyboardType="numeric"
                style={styles.volumeInput}
              />

              {[0.01, 0.1, 0.5].map((v) => (
                <AdjustBtn
                  key={v}
                  label={`+${v}`}
                  onPress={() => setVolume((parseFloat(volume) + v).toFixed(2))}
                />
              ))}
            </View>

            {/* PRICES */}
            <View style={styles.priceRow}>
              <Text style={styles.sellPrice}>3687.51</Text>
              <Text style={styles.buyPrice}>3688.13</Text>
            </View>

            {/* SL / TP */}
            <View style={styles.slTpRow}>
              <SLTPInput
                label="SL"
                value={sl}
                onChange={setSl}
                color={colors.sell}
              />
              <SLTPInput
                label="TP"
                value={tp}
                onChange={setTp}
                color={colors.buy}
              />
            </View>

            {/* CHART */}
            <View style={styles.chart}>
              <Text style={styles.chartText}>Chart Placeholder</Text>
            </View>

            {/* WARNING */}
            <Text style={styles.warning}>
              Attention! The trade will be executed at market conditions,
              difference with requested price may be significant.
            </Text>
          </ScrollView>

          {/* BUY / SELL BAR */}
          <View style={styles.bottomBar}>
            <Button
              style={{
                ...styles.tradeBtn,
                backgroundColor: colors.sell,
              }}
              onPress={() => {
                // SELL action
              }}
            >
              <Text style={styles.tradeTitle}>SELL</Text>
              <Text style={styles.tradeSub}>BY MARKET</Text>
            </Button>

            <Button
              style={{
                ...styles.tradeBtn,
                backgroundColor: colors.buy,
              }}
              onPress={() => {
                // BUY action
              }}
            >
              <Text style={styles.tradeTitle}>BUY</Text>
              <Text style={styles.tradeSub}>BY MARKET</Text>
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

/* ================= COMPONENTS ================= */

const AdjustBtn = ({
  label,
  onPress,
}: {
  label: string | number;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress} style={styles.adjustBtn}>
    <Text style={styles.adjustText}>{label}</Text>
  </TouchableOpacity>
);

const SLTPInput = ({
  label,
  value,
  onChange,
  color,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  color: string;
}) => (
  <View style={styles.slTpBox}>
    <Text style={styles.slTpLabel}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChange}
      keyboardType="numeric"
      placeholder="-"
      placeholderTextColor={colors.textMuted}
      style={styles.slTpInput}
    />
    <View style={[styles.slTpUnderline, { backgroundColor: color }]} />
  </View>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    padding: spacingX._15,
  },
  symbol: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "700",
  },
  subSymbol: {
    color: colors.textSecondary,
    fontSize: 12,
  },

  execution: {
    alignItems: "center",
    marginVertical: spacingY._10,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    marginHorizontal: spacingX._15,
    paddingBottom: spacingY._5,
  },
  executionText: {
    color: colors.textPrimary,
    fontWeight: "600",
  },

  volumeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacingX._15,
    marginVertical: spacingY._15,
  },
  adjustBtn: {
    padding: spacingX._7,
  },
  adjustText: {
    color: colors.primary,
    fontWeight: "700",
  },
  volumeInput: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
    width: 70, // 🔑 FIXED WIDTH
    textAlign: "center",
    paddingVertical: 2,
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: spacingY._20,
  },
  sellPrice: {
    color: colors.sell,
    fontSize: 30,
    fontWeight: "800",
  },
  buyPrice: {
    color: colors.buy,
    fontSize: 30,
    fontWeight: "800",
  },

  slTpRow: {
    flexDirection: "row",
    paddingHorizontal: spacingX._15,
    gap: spacingX._15,
  },
  slTpBox: {
    flex: 1,
    alignItems: "center",
  },
  slTpLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  slTpInput: {
    color: colors.textPrimary,
    fontSize: 16,
    textAlign: "center",
    minWidth: 80,
  },
  slTpUnderline: {
    marginTop: 6,
    height: 2,
    width: "100%",
    borderRadius: 2,
  },

  chart: {
    height: 180,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius._10,
    justifyContent: "center",
    alignItems: "center",
    margin: spacingX._15,
  },
  chartText: {
    color: colors.textMuted,
  },

  warning: {
    color: colors.textMuted,
    fontSize: 11,
    textAlign: "center",
    marginHorizontal: spacingX._15,
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    padding: 10,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  tradeBtn: {
    flex: 1,
    marginHorizontal: 6,
  },
  tradeTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "800",
  },
  tradeSub: {
    color: colors.white,
    fontSize: 11,
  },
  topRow: {
    flexDirection: "row",
    paddingHorizontal: spacingX._10,
    alignItems: "center",
    height: spacingY._50,
    justifyContent: "space-between",
  },
});
