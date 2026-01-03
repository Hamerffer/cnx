import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import AppHeader from "@/components/back-chevron";
import Button from "@/components/button";
import ScreenWrapper from "@/components/screen-Wrapper";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { changePasswordApi } from "@/services/auth.service";

/* ---------- Password strength ---------- */
const getPasswordStrength = (password: string) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

export default function ChangeMasterPassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /* ---------- Field Errors ---------- */
  const [currentError, setCurrentError] = useState("");
  const [newError, setNewError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const strength = useMemo(
    () => getPasswordStrength(newPassword),
    [newPassword]
  );

  /* ---------- Mutation ---------- */
  const { mutate, isPending } = useMutation({
    mutationFn: changePasswordApi,

    onSuccess: () => {
      Alert.alert("Success", "Password changed successfully");
    },

    onError: (err: any) => {
      const message = err?.message || "Failed to change password";

      setCurrentError("");
      setNewError("");
      setConfirmError("");

      if (message.toLowerCase().includes("current")) {
        setCurrentError(message);
      } else if (message.toLowerCase().includes("match")) {
        setConfirmError(message);
      } else if (message.toLowerCase().includes("password")) {
        setNewError(message);
      } else {
        Alert.alert("Error", message);
      }
    },
  });

  /* ---------- Submit ---------- */
  const handleSubmit = () => {
    setCurrentError("");
    setNewError("");
    setConfirmError("");

    if (!currentPassword) {
      setCurrentError("Current password is required");
      return;
    }

    if (newPassword.length < 8) {
      setNewError("Password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setConfirmError("Passwords do not match");
      return;
    }

    mutate({
      currentPassword,
      newPassword,
      confirmPassword,
    });
  };

  return (
    <ScreenWrapper>
      <AppHeader title="Change Master Password" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.accountText}>423089, Xyz Xyz</Text>

          <Field
            label="Current master password"
            value={currentPassword}
            onChangeText={(t) => {
              setCurrentPassword(t);
              setCurrentError("");
            }}
            error={currentError}
          />

          <Field
            label="New master password"
            value={newPassword}
            onChangeText={(t) => {
              setNewPassword(t);
              setNewError("");
            }}
            error={newError}
          />

          {/* Strength bar */}
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
            label="Confirm new password"
            value={confirmPassword}
            onChangeText={(t) => {
              setConfirmPassword(t);
              setConfirmError("");
            }}
            error={confirmError}
          />

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

        <View style={styles.footer}>
          <Button disabled={isPending} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {isPending ? "UPDATING..." : "DONE"}
            </Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

/* ---------- Reusable Field ---------- */
const Field = ({
  label,
  value,
  onChangeText,
  error,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  error?: string;
}) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>

    <TextInput
      secureTextEntry
      value={value}
      onChangeText={onChangeText}
      style={[styles.input, error && { borderBottomColor: colors.negative }]}
    />

    {!!error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
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
  errorText: {
    color: colors.negative,
    fontSize: 12,
    marginTop: 4,
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
