import { colors } from "@/constants/theme";
import { router } from "expo-router";
import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  symbol: string; // e.g. "GBPUSD"
  description?: string; // optional
};

export default function QuoteModal({
  visible,
  onClose,
  symbol,
  description,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* OVERLAY */}
      <Pressable style={styles.overlay} onPress={onClose} />

      {/* BOTTOM SHEET */}
      <View style={styles.sheet}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {symbol}
            {description ? `: ${description}` : ""}
          </Text>
        </View>

        {/* OPTIONS */}
        <Option title="New Order" onPress={() => console.log("New Order")} />
        <Option
          title="Chart"
          onPress={() =>
            router.push({
              pathname: "/(drawer)/(tabs)/charts",
              params: { s: symbol },
            })
          }
        />
        <Option
          title="Properties"
          onPress={() => router.push("/(drawer)/(tabs)/properties")}
        />

        <Option title="Depth Of Market" disabled />
        <Option
          title="Market Statistics"
          onPress={() => console.log("Market Statistics")}
        />
        <Option
          title="Simple view mode"
          onPress={() => console.log("Simple view")}
        />
      </View>
    </Modal>
  );
}

/* ================= OPTION ITEM ================= */

const Option = ({
  title,
  onPress,
  disabled = false,
}: {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}) => (
  <TouchableOpacity disabled={disabled} onPress={onPress} style={styles.option}>
    <Text style={[styles.optionText, disabled && styles.disabledText]}>
      {title}
    </Text>
  </TouchableOpacity>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    // backgroundColor: "rgba(0,0,0,0.6)",
  },

  sheet: {
    backgroundColor: colors.surface,
    paddingBottom: 20,
  },

  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  headerText: {
    color: colors.textMuted,
    fontSize: 13,
  },

  option: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },

  optionText: {
    color: colors.white,
    fontSize: 16,
  },

  disabledText: {
    color: colors.textMuted,
    opacity: 0.5,
  },
});
