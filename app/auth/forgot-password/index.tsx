import Button from "@/components/button";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { navigate } from "expo-router/build/global-state/routing";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Step = "DETAILS" | "OTP" | "PASSWORD";

export default function ForgotScreen() {
  const [step, setStep] = useState<Step>("DETAILS");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  /* -------- Handlers -------- */

  const sendOtp = () => {
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("OTP");
    }, 1000);
  };

  const verifyOtp = () => {
    if (otp)
      // dummy OTP
      setStep("PASSWORD");
  };

  const completeForgot = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Forgot Password Successful ");
      navigate("/auth/login");
    }, 1200);
  };

  /* -------- UI -------- */

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={styles.title}>Forgot Passwordt</Text>

        {/* STEP 1 */}
        {step === "DETAILS" && (
          <>
            <TextInput
              placeholder="Email Address"
              placeholderTextColor={colors.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />

            <Button loading={loading} onPress={sendOtp}>
              <Text style={styles.buttonText}>SEND OTP</Text>
            </Button>
          </>
        )}

        {/* STEP 2 */}
        {step === "OTP" && (
          <>
            <Text style={styles.helper}>Enter OTP sent to {email}</Text>

            <TextInput
              placeholder="Enter OTP"
              placeholderTextColor={colors.textMuted}
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
              style={styles.input}
            />

            <Button onPress={verifyOtp}>
              <Text style={styles.buttonText}>VERIFY OTP</Text>
            </Button>
          </>
        )}

        {/* STEP 3 */}
        {step === "PASSWORD" && (
          <>
            <TextInput
              placeholder="Create Password"
              placeholderTextColor={colors.textMuted}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
            <TextInput
              placeholder=" re-Enter Password"
              placeholderTextColor={colors.textMuted}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
            />

            <Button loading={loading} onPress={completeForgot}>
              <Text style={styles.buttonText}>Submit</Text>
            </Button>
          </>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* -------------------- Styles -------------------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    justifyContent: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: spacingY._30,
  },

  helper: {
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacingY._15,
  },

  input: {
    height: 48,
    borderRadius: radius._12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    color: colors.textPrimary,
    paddingHorizontal: spacingX._15,
    marginBottom: spacingY._20,
  },

  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
