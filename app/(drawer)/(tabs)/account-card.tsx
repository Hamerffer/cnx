import ScreenWrapper from "@/components/screen-Wrapper";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { showAlert } from "@/utils/show-alert";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  name?: string;
  company?: string;
  accountNo?: string;
  server?: string;
  balance?: string;
  isDemo?: boolean;
};

const AccountCard = ({
  name = "Xyz Xyz",
  company = "Arakkal Markets Limited",
  accountNo = "423089",
  server = "ArakkalMarkets-Server",
  balance = "100 000.00",
  isDemo = true,
}: Props) => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Demo Ribbon */}
        {isDemo && (
          <View style={styles.ribbon}>
            <Text style={styles.ribbonText}>Demo</Text>
          </View>
        )}

        {/* Logo */}
        <View style={styles.logoWrap}>
          <Image
            source={require("@/assets/images/mt5.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Account Name */}

        <Text style={styles.name}>{name}</Text>

        {/* Broker Name */}
        <TouchableOpacity onPress={() => router.push("/broker/broker-info")}>
          <Text style={styles.company}>{company}</Text>
        </TouchableOpacity>
        {/* Account + Server */}
        <Text style={styles.server}>
          {accountNo} — {server}
        </Text>
        <Text style={styles.access}>Access point</Text>

        {/* Balance */}
        <Text style={styles.balance}>{balance} USD</Text>

        {/* Footer Icons */}
        <View style={styles.footer}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="view-grid-outline"
              size={22}
              color={colors.textPrimary}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={EnableNotifications}>
            <MaterialCommunityIcons
              name="bell-outline"
              size={22}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default AccountCard;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius._20,
    paddingVertical: spacingY._20,
    paddingHorizontal: spacingX._20,
    marginTop: spacingY._35,
  },

  ribbon: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: colors.positive,
    paddingHorizontal: spacingX._12,
    paddingVertical: spacingY._5,
    borderTopRightRadius: radius._20,
    borderBottomLeftRadius: radius._20,
  },
  ribbonText: {
    color: colors.black,
    fontSize: 12,
    fontWeight: "600",
  },

  logoWrap: {
    alignItems: "center",
    marginBottom: spacingY._10,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: radius._10,
  },

  name: {
    textAlign: "center",
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  company: {
    textAlign: "center",
    color: colors.primary,
    fontSize: 14,
    marginTop: spacingY._5,
  },

  server: {
    textAlign: "center",
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: spacingY._10,
  },
  access: {
    textAlign: "center",
    color: colors.textMuted,
    fontSize: 12,
    marginTop: spacingY._5,
  },

  balance: {
    textAlign: "center",
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: "700",
    marginVertical: spacingY._20,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacingY._10,
  },
});

const EnableNotifications = () => {
  showAlert({
    title: "Trade Notifications",
    message:
      "Receive notification about the trading operation performed on this account",
    confirmText: "Enable",
    cancelText: "Cancel",
    onConfirm: () => {
      Alert.alert("Notifications Enabled");
    },
  });
};
