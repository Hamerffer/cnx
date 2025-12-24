import AppHeader from "@/components/back-chevron";
import ScreenWrapper from "@/components/screen-Wrapper";
import { colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
export default function BrokerLoginScreen() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [server, setServer] = useState("trade");
  const [savePassword, setSavePassword] = useState(true);

  return (
    <ScreenWrapper>
      
      <AppHeader title="Login" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* ---------- Broker Title ---------- */}
        <Text style={styles.title}>F Trade Markets Ltd.</Text>

        {/* ---------- Account Actions ---------- */}
        <View style={styles.actionBox}>
          {/* Demo Account */}
          <TouchableOpacity
            style={styles.actionRow}
            activeOpacity={0.7}
            onPress={() => router.push("/broker/register")}
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

          <View style={styles.divider} />

          {/* Real Account */}
          <TouchableOpacity style={styles.actionRow} activeOpacity={0.7}>
            <MaterialCommunityIcons
              name="trending-up"
              size={26}
              color={colors.primary}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.actionTitle}>Open a real account</Text>
              <Text style={styles.actionSubtitle}>
                Identification required for live trading
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

        {/* Login Input */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Login"
            placeholderTextColor={colors.textMuted}
            value={login}
            onChangeText={setLogin}
            style={styles.input}
          />
        </View>

        {/* Password Input */}
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

        {/* Server Dropdown */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.serverLabel}>Server</Text>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.dropdownBox}
            data={[
              { label: "Trade", value: "trade" },
              { label: "Demo", value: "demo" },
              { label: "Live", value: "live" },
            ]}
            labelField="label"
            valueField="value"
            value={server}
            onChange={(item) => setServer(item.value)}
            placeholder="Select server"
            placeholderStyle={{ color: colors.textMuted }}
            selectedTextStyle={{ color: colors.textPrimary }}
            renderRightIcon={() => (
              <MaterialCommunityIcons
                name="chevron-down"
                size={20}
                color={colors.textMuted}
              />
            )}
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

        {/* Forgot Password */}
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

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

  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginHorizontal: 14,
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

  dropdownContainer: {
    marginBottom: 16,
  },

  serverLabel: {
    color: colors.textMuted,
    marginBottom: 6,
  },

  dropdown: {
    height: 45,
    borderWidth: 1,
    borderColor: colors.divider,
    borderRadius: 8,
    paddingHorizontal: 10,
  },

  dropdownBox: {
    borderRadius: 8,
  },

  saveRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
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

  forgot: {
    color: colors.primary,
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "500",
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
