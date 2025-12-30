import AppHeader from "@/components/back-chevron";
import ScreenWrapper from "@/components/screen-Wrapper";
import { colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useAuth } from "@/context/AuthContext";
import { getSessionApi, loginApi } from "@/services/auth.service";
import { getUser, saveUser } from "@/services/db";

export default function BrokerLoginScreen() {
  const { brokerId } = useLocalSearchParams<{ brokerId: string }>();
  const { setAuthToken } = useAuth();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [savePassword, setSavePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  /* ---------- LOGIN HANDLER ---------- */
const handleLogin = async () => {
  if (!login || !password) {
    Alert.alert("Error", "Login and password are required");
    return;
  }

  try {
    setLoading(true);

    // 1️⃣ LOGIN (TOKEN ONLY)
    const loginRes: any = await loginApi({
      brokerId,
      loginId: login,
      password,
    });

    const token = loginRes.json.token;
    await setAuthToken(token);

    // 2️⃣ FETCH FULL SESSION USER
    const sessionRes: any = await getSessionApi();
    const apiUser = sessionRes.json.user;

    // 3️⃣ SAVE FULL USER TO SQLITE
    await saveUser({
      id: apiUser.id,
      name: apiUser.name,
      email: apiUser.email,
      login: apiUser.login,
      brokerId: apiUser.brokerId,

      serverId: apiUser.server?.id ?? null,
      serverName: apiUser.server?.name ?? null,

      accountTypeId: apiUser.accountType?.id ?? null,
      accountTypeName: apiUser.accountType?.name ?? null,

      balance: apiUser.balance,
      role: JSON.stringify(apiUser.role),

      updatedAt: apiUser.updatedAt,
    });

    const savedUser = await getUser();
    console.log("📦 SQLITE USER 👉", savedUser);

    router.replace("/(drawer)/(tabs)/quotes");
  } catch (err: any) {
    Alert.alert("Login Failed", err?.message || "Invalid credentials");
  } finally {
    setLoading(false);
  }
};


  return (
    <ScreenWrapper>
      <AppHeader title="Login" />

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* ---------- Broker Title ---------- */}
        <Text style={styles.title}>F Trade Markets Ltd.</Text>

        {/* ---------- Account Actions ---------- */}
        <View style={styles.actionBox}>
          <TouchableOpacity
            style={styles.actionRow}
            activeOpacity={0.7}
            onPress={() =>
              router.push({
                pathname: "/broker/register",
                params: { brokerId },
              })
            }
          >
            <MaterialCommunityIcons
              name="school-outline"
              size={26}
              color={colors.textMuted}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.actionTitle}>Open a demo account</Text>
              <Text style={styles.actionSubtitle}>
                To learn trading and test strategies
              </Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={22}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        </View>

        {/* ---------- Login Section ---------- */}
        <Text style={styles.sectionTitle}>Login to an existing account</Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Login"
            placeholderTextColor={colors.textMuted}
            value={login}
            onChangeText={setLogin}
            style={styles.input}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor={colors.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>

        {/* Save Password */}
        <TouchableOpacity
          style={styles.saveRow}
          onPress={() => setSavePassword(!savePassword)}
        >
          <Text style={styles.saveText}>Save password</Text>
          <View
            style={[
              styles.checkbox,
              { backgroundColor: savePassword ? colors.primary : "#fff" },
            ]}
          >
            {savePassword && (
              <MaterialCommunityIcons name="check" size={16} color="#fff" />
            )}
          </View>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.loginButton, loading && { opacity: 0.6 }]}
          disabled={loading}
          onPress={handleLogin}
        >
          <Text style={styles.loginText}>
            {loading ? "LOGGING IN..." : "LOGIN"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 24,
  },

  actionBox: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 24,
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },

  actionTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "500",
  },

  actionSubtitle: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 12,
  },

  inputContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },

  input: {
    height: 45,
    color: colors.textPrimary,
    fontSize: 14,
  },

  saveRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  saveText: {
    color: colors.textPrimary,
    fontSize: 14,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.divider,
    justifyContent: "center",
    alignItems: "center",
  },

  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },

  loginText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
