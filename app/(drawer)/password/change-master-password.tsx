import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Appbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/components/button";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";

/* ---------- password strength helper ---------- */
const getPasswordStrength = (password: string) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score; // 0 - 4
};

export default function ChangeMasterPassword() {
  const [current, setCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  return (
    <SafeAreaView style={styles.container}>
      {/* ---------- Header ---------- */}
      <Appbar.Header style={styles.appbar} elevated={false}>
        <Appbar.Action
          icon="arrow-left"
          iconColor={colors.textPrimary}
          onPress={router.back}
        />
        <Appbar.Content
          title="Change master password"
          titleStyle={styles.appbarTitle}
        />
      </Appbar.Header>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.accountText}>423089, Xyz Xyz</Text>

          <Field
            label="Current master password"
            value={current}
            onChangeText={setCurrent}
          />

          <Field
            label="New master password"
            value={password}
            onChangeText={setPassword}
          />

          {/* ---------- Strength Progress ---------- */}
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${(strength / 4) * 100}%`,
                  backgroundColor:
                    strength <= 1
                      ? colors.negative
                      : strength === 2
                      ? "#f59e0b"
                      : colors.positive,
                },
              ]}
            />
          </View>

          <Field
            label="New password confirmation"
            value={confirm}
            onChangeText={setConfirm}
          />

          {/* ---------- Info ---------- */}
          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="information-outline"
              size={20}
              color={colors.textMuted}
            />
            <Text style={styles.infoText}>
              Password must be at least 8 characters and include uppercase,
              numbers and special symbols.
            </Text>
          </View>
        </ScrollView>

        {/* ---------- Footer ---------- */}
        <View style={styles.footer}>
          <Button disabled={strength < 3 || password !== confirm}>
            <Text style={styles.buttonText}>DONE</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ---------- Reusable Input ---------- */
const Field = ({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
}) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      secureTextEntry
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
      placeholderTextColor={colors.textMuted}
    />
  </View>
);

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  appbar: {
    backgroundColor: colors.background,
  },

  appbarTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "600",
  },

  content: {
    padding: spacingX._20,
  },

  accountText: {
    color: colors.textSecondary,
    marginBottom: spacingY._25,
  },

  field: {
    marginBottom: spacingY._20,
  },

  label: {
    color: colors.textSecondary,
    marginBottom: spacingY._7,
  },

  input: {
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    color: colors.textPrimary,
  },

  progressTrack: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: radius._3,
    overflow: "hidden",
    marginBottom: spacingY._25,
  },

  progressFill: {
    height: "100%",
    borderRadius: radius._3,
  },

  infoRow: {
    flexDirection: "row",
    gap: spacingX._10,
    marginTop: spacingY._10,
  },

  infoText: {
    color: colors.textMuted,
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },

  footer: {
    padding: spacingX._20,
  },

  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
