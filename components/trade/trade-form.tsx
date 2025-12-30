import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  BackHandler,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Button, Surface } from "react-native-paper";

const SCREEN_HEIGHT = Dimensions.get("window").height;

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function TradeBottomSheet({ visible, onClose }: Props) {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  // 🔹 FORM STATE
  const [lot, setLot] = useState("0.01");
  const [sl, setSl] = useState("");
  const [tp, setTp] = useState("");

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : SCREEN_HEIGHT,
      duration: visible ? 280 : 250,
      useNativeDriver: true,
    }).start();
  }, [translateY, visible]);

  // Android back handling
  useEffect(() => {
    const back = BackHandler.addEventListener("hardwareBackPress", () => {
      if (visible) {
        onClose();
        return true;
      }
      return false;
    });

    return () => back.remove();
  }, [onClose, visible]);

  return (
    <Modal transparent visible={visible} animationType="none">
      {/* BACKDROP */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* BOTTOM SHEET */}
      <Animated.View
        style={[styles.sheetWrapper, { transform: [{ translateY }] }]}
      >
        <Surface style={styles.sheet} elevation={5}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.symbol}>EURUSD</Text>
            <Text style={styles.sub}>Market Execution</Text>
          </View>

          {/* LOT */}
          <InputRow label="Lot" value={lot} onChange={setLot} />

          {/* STOP LOSS */}
          <InputRow
            label="Stop Loss"
            value={sl}
            onChange={setSl}
            placeholder="---"
          />

          {/* TAKE PROFIT */}
          <InputRow
            label="Take Profit"
            value={tp}
            onChange={setTp}
            placeholder="---"
          />

          {/* ACTIONS */}
          <View style={styles.actionRow}>
            <Button
              mode="contained"
              style={[styles.actionBtn, styles.sell]}
              onPress={() => {
                console.log("SELL", { lot, sl, tp });
              }}
            >
              SELL
            </Button>

            <Button
              mode="contained"
              style={[styles.actionBtn, styles.buy]}
              onPress={() => {
                console.log("BUY", { lot, sl, tp });
              }}
            >
              BUY
            </Button>
          </View>
        </Surface>
      </Animated.View>
    </Modal>
  );
}

/* ---------- INPUT ROW ---------- */
function InputRow({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>

      <Surface style={styles.inputBox} elevation={1}>
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          keyboardType="decimal-pad"
          style={styles.input}
        />
      </Surface>
    </View>
  );
}
const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  sheetWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },

  sheet: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacingX._15,
    paddingVertical: spacingY._20,
    borderTopLeftRadius: radius._20,
    borderTopRightRadius: radius._20,
  },

  header: {
    marginBottom: spacingY._20,
  },

  symbol: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  sub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._12,
  },

  label: {
    fontSize: 13,
    color: colors.textSecondary,
  },

  inputBox: {
    width: 120,
    height: 36,
    borderRadius: radius._6,
    backgroundColor: colors.surfaceLight,
    justifyContent: "center",
    paddingHorizontal: 8,
  },

  input: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
    textAlign: "center",
    padding: 0,
  },

  actionRow: {
    flexDirection: "row",
    marginTop: spacingY._20,
  },

  actionBtn: {
    flex: 1,
  },

  sell: {
    backgroundColor: colors.sell,
    borderTopLeftRadius: radius._10,
    borderBottomLeftRadius: radius._10,
  },

  buy: {
    backgroundColor: colors.buy,
    borderTopRightRadius: radius._10,
    borderBottomRightRadius: radius._10,
  },
});
